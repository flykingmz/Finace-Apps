<template>
  <div class="pension-calculator">
    <!-- 广告区域（默认隐藏） -->
    <div class="ads-container" style="display: none;">
      <!-- Google Ads 占位符 -->
      <div class="google-ads">Google Ads Here</div>
    </div>

    <div>
      <a href="/dashboard" class="link-content">Home</a>
    </div>

    <!-- 标题层 -->
    <div class="header-section">
      <h1>Pension Calculator</h1>
      <p class="subtitle">Use our Pension Calculator to estimate your retirement pension income based on your salary, years of service, and expected retirement age. Calculate monthly pension payouts, forecast total retirement benefits, and understand how your pension supports long-term financial security. This tool helps you plan retirement income with clear and accurate projections.</p>
    </div>

    <!-- 中间层：计算器区域 -->
    <div class="main-content">
      <!-- 计算器选择器 -->
      <div class="calculator-selector">
        <button 
          @click="activeCalculator = 'lumpSum'" 
          :class="{ active: activeCalculator === 'lumpSum' }"
        >
          Lump Sum vs Monthly
        </button>
        <button 
          @click="activeCalculator = 'singleJoint'" 
          :class="{ active: activeCalculator === 'singleJoint' }"
        >
          Single vs Joint
        </button>
        <button 
          @click="activeCalculator = 'workLonger'" 
          :class="{ active: activeCalculator === 'workLonger' }"
        >
          Work Longer
        </button>
      </div>

      <!-- 计算器1: Lump sum payout or monthly pension income -->
      <div v-if="activeCalculator === 'lumpSum'" class="calculator-section">
        <div class="calculator-description">
          <h2>Lump sum payout or monthly pension income?</h2>
          <p>There are mainly two options regarding how to receive income from a pension plan: either take it out as a lump sum payment or have it distributed in a stream of periodic payments until the retiree passes away (or in some cases, until both the retiree and their spouse passes away).</p>
        </div>

        <!-- 输入表单 -->
        <div class="input-section" :class="{ 'with-result': lumpSumResult }">
          <div class="form-group">
            <label for="retirementAge1">Your retirement age</label>
            <input 
              type="number" 
              id="retirementAge1" 
              v-model.number="lumpSumInputs.retirementAge"
              min="50"
              max="80"
            >
          </div>

          <div class="option-section">
            <h3>Option 1: lump sum payment</h3>
            <div class="form-group">
              <label for="lumpSumAmount">Lump sum payment amount</label>
              <div class="input-with-unit">
                <span class="unit">$</span>
                <input 
                  type="number" 
                  id="lumpSumAmount" 
                  v-model.number="lumpSumInputs.lumpSumAmount"
                  min="0"
                  step="1000"
                >
              </div>
            </div>
            <div class="form-group">
              <label for="investmentReturn1">Your investment return</label>
              <div class="input-with-unit">
                <input 
                  type="number" 
                  id="investmentReturn1" 
                  v-model.number="lumpSumInputs.investmentReturn"
                  min="0"
                  max="20"
                  step="0.1"
                >
                <span class="unit">% per year</span>
              </div>
            </div>
          </div>

          <div class="option-section">
            <h3>Option 2: monthly pension payment</h3>
            <div class="form-group">
              <label for="monthlyPension">Monthly pension income</label>
              <div class="input-with-unit">
                <span class="unit">$</span>
                <input 
                  type="number" 
                  id="monthlyPension" 
                  v-model.number="lumpSumInputs.monthlyPension"
                  min="0"
                  step="100"
                >
                <span class="unit">per month</span>
              </div>
            </div>
            <div class="form-group">
              <label for="colaAdjustment1">Cost-of-living adjustment<span class="superscript">1</span></label>
              <div class="input-with-unit">
                <input 
                  type="number" 
                  id="colaAdjustment1" 
                  v-model.number="lumpSumInputs.colaAdjustment"
                  min="0"
                  max="10"
                  step="0.1"
                >
                <span class="unit">% per year</span>
              </div>
            </div>
          </div>

          <div class="button-group">
            <button class="calculate-btn" @click="calculateLumpSum">Calculate</button>
            <button class="clear-btn" @click="clearLumpSum">Clear</button>
          </div>
        </div>

        <!-- 结果展示 -->
        <div v-if="lumpSumResult" class="result-section">
          <div class="result-content">
            <h3>Result</h3>
            <p v-if="lumpSumResult.betterOption === 'monthly'">
              With the investment return of {{ lumpSumInputs.investmentReturn }}% per year, if you can live up to <strong>age {{ lumpSumResult.breakEvenAge }} or older</strong>, it is better to take monthly pension income. Otherwise, it is better to take the lump sum payout.
            </p>
            <p v-else>
              With the investment return of {{ lumpSumInputs.investmentReturn }}% per year, it is better to take the lump sum payout regardless of life expectancy.
            </p>

            <h4>Equivalent present value of the options</h4>
            <div class="chart-container">
              <div class="chart-legend">
                <div class="legend-item">
                  <span class="legend-color lump-sum"></span>
                  <span>Lump sum payout</span>
                </div>
                <div class="legend-item">
                  <span class="legend-color monthly-pension"></span>
                  <span>Monthly pension income</span>
                </div>
              </div>
              
              <div class="chart">
                <div class="chart-bars">
                  <div 
                    v-for="(value, age) in lumpSumResult.chartData" 
                    :key="age"
                    class="bar-group"
                  >
                    <div 
                      class="bar lump-sum-bar"
                      :style="{ height: value.lumpSum * 100 / lumpSumResult.maxValue + '%' }"
                      :title="'Age ' + age + ': $' + formatCurrency(value.lumpSum)"
                    ></div>
                    <div 
                      class="bar monthly-bar"
                      :style="{ height: value.monthly * 100 / lumpSumResult.maxValue + '%' }"
                      :title="'Age ' + age + ': $' + formatCurrency(value.monthly)"
                    ></div>
                  </div>
                </div>
                <div class="chart-axis">
                  <div class="axis-label" v-for="age in [70, 80, 90, 100, 110, 120]" :key="age">
                    {{ age }}
                  </div>
                </div>
                <div class="chart-title">Life expectancy (age)</div>
              </div>
              
              <div class="chart-y-axis">
                <div v-for="val in [0, 500, 1000, 1500, 2000]" :key="val">
                  ${{ val }}K
                </div>
              </div>
            </div>

            <p class="note">
              * Please note that the calculation above assumes that the lump sum payment rollover (transfer) to tax deferred investment account such as IRA etc. without being taxed upfront. If the lump sum payment is taxable, you can use the after-tax amount in calculation.
            </p>
          </div>
        </div>
      </div>

      <!-- 计算器2: Single-life or joint-and-survivor pension payout -->
      <div v-if="activeCalculator === 'singleJoint'" class="calculator-section">
        <div class="calculator-description">
          <h2>Single-life or joint-and-survivor pension payout?</h2>
          <p>A single-life pension means the employer will pay their employee's pension until their death. This payment option offers a higher payment per month but will not continue paying benefits to a spouse who outlives the retiree. In contrast, a joint-and-survivor pension payout pays a lower amount per month, but when the retiree dies, the surviving spouse will continue receiving benefits for the remainder of their life.</p>
        </div>

        <div class="input-section" :class="{ 'with-result': singleJointResult }">
          <div class="form-row">
            <div class="form-group">
              <label for="retirementAge2">Your retirement age</label>
              <input 
                type="number" 
                id="retirementAge2" 
                v-model.number="singleJointInputs.retirementAge"
                min="50"
                max="80"
              >
            </div>
            <div class="form-group">
              <label for="lifeExpectancy">Your life expectancy</label>
              <input 
                type="number" 
                id="lifeExpectancy" 
                v-model.number="singleJointInputs.lifeExpectancy"
                min="60"
                max="120"
              >
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="spouseAge">Spouse's age when you retire</label>
              <input 
                type="number" 
                id="spouseAge" 
                v-model.number="singleJointInputs.spouseAge"
                min="40"
                max="100"
              >
            </div>
            <div class="form-group">
              <label for="spouseLifeExpectancy">Spouse's life expectancy</label>
              <input 
                type="number" 
                id="spouseLifeExpectancy" 
                v-model.number="singleJointInputs.spouseLifeExpectancy"
                min="60"
                max="120"
              >
            </div>
          </div>

          <div class="option-section">
            <h3>Pension Options</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="singleLifePension">Single life pension</label>
                <div class="input-with-unit">
                  <span class="unit">$</span>
                  <input 
                    type="number" 
                    id="singleLifePension" 
                    v-model.number="singleJointInputs.singleLifePension"
                    min="0"
                    step="100"
                  >
                  <span class="unit">per month</span>
                </div>
              </div>
              <div class="form-group">
                <label for="jointSurvivorPension">Joint survivor pension</label>
                <div class="input-with-unit">
                  <span class="unit">$</span>
                  <input 
                    type="number" 
                    id="jointSurvivorPension" 
                    v-model.number="singleJointInputs.jointSurvivorPension"
                    min="0"
                    step="100"
                  >
                  <span class="unit">per month</span>
                </div>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="investmentReturn2">Your investment return</label>
              <div class="input-with-unit">
                <input 
                  type="number" 
                  id="investmentReturn2" 
                  v-model.number="singleJointInputs.investmentReturn"
                  min="0"
                  max="20"
                  step="0.1"
                >
                <span class="unit">% per year</span>
              </div>
            </div>
            <div class="form-group">
              <label for="colaAdjustment2">Cost-of-living adjustment<span class="superscript">1</span></label>
              <div class="input-with-unit">
                <input 
                  type="number" 
                  id="colaAdjustment2" 
                  v-model.number="singleJointInputs.colaAdjustment"
                  min="0"
                  max="10"
                  step="0.1"
                >
                <span class="unit">% per year</span>
              </div>
            </div>
          </div>

          <div class="button-group">
            <button class="calculate-btn" @click="calculateSingleJoint">Calculate</button>
            <button class="clear-btn" @click="clearSingleJoint">Clear</button>
          </div>
        </div>

        <!-- 结果展示 -->
        <div v-if="singleJointResult" class="result-section">
          <div class="result-content">
            <h3>Result</h3>
            <div class="result-details">
              <p>Dying at age {{ singleJointInputs.retirementAge }} requires a lump sum of <strong>${{ formatCurrency(singleJointResult.lumpSumRequired) }}</strong> to replace your survivor pension benefit.</p>
              
              <div class="comparison-section">
                <h4>From term life insurance perspective:</h4>
                <p>If you can find a term life insurance with monthly premium of <strong>${{ singleJointResult.insuranceMonthlyPremium.toFixed(2) }}</strong> or lower for <strong>${{ formatCurrency(singleJointResult.lumpSumRequired) }}</strong> and <strong>20 years</strong>, it is better to take the single life pension payout option and purchase the term life insurance. This combination will provide the same or better coverage than the joint and survivor pension payout option.</p>
              </div>

              <div class="comparison-section">
                <h4>From investment perspective:</h4>
                <p><strong>It is better to take the single life pension payout option.</strong> If you take the single life pension payout option, you can invest the payment difference of <strong>${{ singleJointInputs.singleLifePension }} - ${{ singleJointInputs.jointSurvivorPension }} = ${{ singleJointInputs.singleLifePension - singleJointInputs.jointSurvivorPension }}</strong>. At the end of age {{ singleJointInputs.lifeExpectancy }} (your life expectancy, your spouse age {{ singleJointResult.spouseAgeAtDeath }}), the investment accumulation of the payment difference would reach <strong>${{ formatCurrency(singleJointResult.investmentAccumulation) }}</strong>, yet the value of the remaining survivor pension payout until your spouse reach {{ singleJointInputs.spouseLifeExpectancy }} is <strong>${{ formatCurrency(singleJointResult.remainingPensionValue) }}</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 计算器3: Should you work longer for a better pension -->
      <div v-if="activeCalculator === 'workLonger'" class="calculator-section">
        <div class="calculator-description">
          <h2>Should you work longer for a better pension?</h2>
          <p>It is possible for some people to postpone retirement for several years for more pension income later. Use this calculation to see which option is preferred.</p>
        </div>

        <div class="input-section" :class="{ 'with-result': workLongerResult }">
          <div class="option-section">
            <h3>Pension option 1</h3>
            <div class="form-group">
              <label for="retirementAge60">Retirement age</label>
              <input 
                type="number" 
                id="retirementAge60" 
                v-model.number="workLongerInputs.retirementAge1"
                min="50"
                max="80"
              >
            </div>
            <div class="form-group">
              <label for="monthlyPension60">Monthly pension income</label>
              <div class="input-with-unit">
                <span class="unit">$</span>
                <input 
                  type="number" 
                  id="monthlyPension60" 
                  v-model.number="workLongerInputs.monthlyPension1"
                  min="0"
                  step="100"
                >
                <span class="unit">per month</span>
              </div>
            </div>
          </div>

          <div class="option-section">
            <h3>Pension option 2 (work longer)</h3>
            <div class="form-group">
              <label for="retirementAge65">Retirement age</label>
              <input 
                type="number" 
                id="retirementAge65" 
                v-model.number="workLongerInputs.retirementAge2"
                min="50"
                max="80"
              >
            </div>
            <div class="form-group">
              <label for="monthlyPension65">Monthly pension income</label>
              <div class="input-with-unit">
                <span class="unit">$</span>
                <input 
                  type="number" 
                  id="monthlyPension65" 
                  v-model.number="workLongerInputs.monthlyPension2"
                  min="0"
                  step="100"
                >
                <span class="unit">per month</span>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="investmentReturn3">Your investment return</label>
              <div class="input-with-unit">
                <input 
                  type="number" 
                  id="investmentReturn3" 
                  v-model.number="workLongerInputs.investmentReturn"
                  min="0"
                  max="20"
                  step="0.1"
                >
                <span class="unit">% per year</span>
              </div>
            </div>
            <div class="form-group">
              <label for="colaAdjustment3">Cost-of-living adjustment<span class="superscript">1</span></label>
              <div class="input-with-unit">
                <input 
                  type="number" 
                  id="colaAdjustment3" 
                  v-model.number="workLongerInputs.colaAdjustment"
                  min="0"
                  max="10"
                  step="0.1"
                >
                <span class="unit">% per year</span>
              </div>
            </div>
          </div>

          <div class="button-group">
            <button class="calculate-btn" @click="calculateWorkLonger">Calculate</button>
            <button class="clear-btn" @click="clearWorkLonger">Clear</button>
          </div>
        </div>

        <!-- 结果展示 -->
        <div v-if="workLongerResult" class="result-section">
          <div class="result-content">
            <h3>Result</h3>
            <p>
              Financially, if you think you can live to <strong>{{ workLongerResult.breakEvenAge }} or older</strong>, it is better to retire at age {{ workLongerInputs.retirementAge2 }}. Otherwise, it is better to retire at age {{ workLongerInputs.retirementAge1 }}.
            </p>

            <h4>Equivalent present value of the pension options</h4>
            <div class="chart-container">
              <div class="chart-legend">
                <div class="legend-item">
                  <span class="legend-color retire-early"></span>
                  <span>If retire at age {{ workLongerInputs.retirementAge1 }}</span>
                </div>
                <div class="legend-item">
                  <span class="legend-color retire-later"></span>
                  <span>If retire at age {{ workLongerInputs.retirementAge2 }}</span>
                </div>
              </div>
              
              <div class="chart">
                <div class="chart-bars">
                  <div 
                    v-for="(value, age) in workLongerResult.chartData" 
                    :key="age"
                    class="bar-group"
                  >
                    <div 
                      class="bar retire-early-bar"
                      :style="{ height: value.early * 100 / workLongerResult.maxValue + '%' }"
                      :title="'Age ' + age + ': $' + formatCurrency(value.early)"
                    ></div>
                    <div 
                      class="bar retire-later-bar"
                      :style="{ height: value.later * 100 / workLongerResult.maxValue + '%' }"
                      :title="'Age ' + age + ': $' + formatCurrency(value.later)"
                    ></div>
                  </div>
                </div>
                <div class="chart-axis">
                  <div class="axis-label" v-for="age in [70, 75, 80, 85, 90, 95, 100]" :key="age">
                    {{ age }}
                  </div>
                </div>
                <div class="chart-title">Life expectancy (age)</div>
              </div>
              
              <div class="chart-y-axis">
                <div v-for="val in [0, 250, 500, 750, 1000, 1250]" :key="val">
                  ${{ val }}K
                </div>
              </div>
            </div>

            <p class="note">
              * Please note that this calculator only compare the financial value of the two pension options. It does not include the salary income. If you think you still need the salary income and retire earlier is better financially, you can take the pension from your current job and find another job with equivalent or higher income.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ部分 -->
    <div class="faq-section">
      <h2>Pensions</h2>
      <div class="faq-content">
        <p>
          Traditionally, employee pensions are funds that employers contribute to as a benefit for their employees. Upon retirement, money can be drawn from a pension pot or sold to an insurance company to be distributed as periodic payments until death (a life annuity). Please visit our Annuity Calculator or Annuity Payout Calculator for more information or to do calculations involving annuities. In the U.S., the main advantage of a pension as a vehicle of saving for retirement lies in the fact that pensions provide preferential tax benefits for money placed into them as well as any subsequent earnings on investment. In many modern instances, the term "pension" is used interchangeably with the term "retirement plan" rather than as a form of it.
        </p>
        
        <h3>Defined-Benefit Plan</h3>
        <p>
          When people throw around the term "pension plan," the Defined-Benefit (DB) plan is typically what they are referring to. In this type of pension plan, employers guarantee their employees a defined amount, or benefit, upon retirement, regardless of the performance of the investments involved, and with certain tax advantages. This can vary from plan to plan, but while employers are the main contributors of the DB plans, employees may also be able to contribute. The DB plans in the U.S. do not have contribution limits.
        </p>
        <p>
          As a result, employers become fully responsible for these future payments to their employees; even if the company goes under, or is bought out by another company, or goes through any major overhaul, employees still have legal rights to their share of the DB plans. With that said, it is possible that these legal rights won't mean much if a company goes through a string of particularly bad financial hardships.
        </p>
        <p>
          Retirement income is usually determined by several variables pertaining to each individual employee, and some of the most important are their age, earnings history, and years of service. This also differs from company to company.
        </p>
        <p>
          Generally speaking, the longer an employee works for a company or the higher their salary, the higher their projected benefits in retirement.
        </p>
        <p>
          Social Security is the most common DB plan in the U.S. Most American workers are qualified for collecting Social Security benefits after retirement. However, Social Security is only designed to replace an estimated 40% of a worker's income in retirement, which means that depending entirely on Social Security in retirement is likely not viable. For more information or to do calculations concerning Social Security, please visit the <a href="https://www.ssa.gov" target="_blank">Social Security Calculator</a>.
        </p>
        <p>
          The three calculators above are mainly designed for the Defined-Benefit Plan.
        </p>
        
        <h3>Defined-Contribution Plan</h3>
        <p>
          A defined-contribution (DC) pension plan is a retirement plan in which employers contribute to employees’ individual, tax-advantaged accounts—most commonly through matching a percentage of employee income, though contributions may also be based on years of service. Retirement benefits depend on the total contributions made by both employers and employees and on investment performance over time, meaning payouts are not guaranteed and can fluctuate with market conditions, unlike defined-benefit plans. DC plans offer participants significant control and flexibility, allowing them to choose how their funds are invested and to carry their accounts with them when changing jobs, often through rollovers. Today, DC plans are the most common retirement plans in the U.S., especially in the private sector, and are typically referred to by specific program names such as 401(k)s, IRAs, and Roth IRAs rather than by the term “DC plan.”
        </p>

        <h3>The Fall of Defined-Benefit Plans and the Rise of Defined-Contribution Plans</h3>
        <p>
          In the U.S., defined-benefit (DB) pension plans have declined significantly and are now far less common than defined-contribution (DC) plans, with most remaining DB plans concentrated in the public sector. Their popularity has fallen due to several risks and drawbacks, including reliance on unpredictable factors such as employee turnover, company financial stability, and long-term economic conditions. While insurance exists through the Pension Benefit Guaranty Corporation, its protection is limited, and employees may receive reduced or no benefits if a plan fails. DB plans also typically require long tenures to maximize benefits, are vulnerable to being frozen, and involve higher administrative costs, making them less attractive in today’s more mobile workforce and uncertain economic environment.
        </p>

        <h3>Lump Sum vs. Monthly Benefit Payout</h3>
        <p>
          Most defined-benefit (DB) pension plans allow retirees to choose between a one-time lump sum payment or ongoing monthly benefit payments, with the lump sum representing the present value of future pension income. Monthly payments provide the advantage of stable, often lifetime-guaranteed income that is not affected by market volatility and reduces the risk of overspending. In contrast, the lump sum option offers greater flexibility, allowing individuals to spend, save, invest, or roll the funds into an IRA to preserve tax deferral and pass remaining assets to heirs. Lump sums may be more suitable for those who value flexibility, want estate-planning options, or have shorter life expectancies, while monthly benefits favor those seeking predictable, lifelong income security.
        </p>

        <h3>Single-Life or Joint-and-Survivor Plans?</h3>
        <p>
          At retirement, pensions typically offer two main distribution options: single-life plans and joint-and-survivor plans. Single-life plans pay the highest monthly benefit but stop payments upon the retiree’s death, potentially leaving a surviving spouse without income, though some versions include a limited guarantee period. Joint-and-survivor plans, by contrast, continue paying benefits until both the retiree and spouse have passed away, providing greater financial security for a partner but at the cost of lower monthly payments. These plans include a predefined survivor benefit ratio that determines how much the surviving spouse receives after the first death. Ultimately, the choice involves balancing higher income versus long-term security for dependents.
        </p>

        <h4>1. Cost-of-Living Adjustment</h4>
        <p>
        Because inflation erodes purchasing power over time, cost-of-living adjustments (COLAs) are used to help retirement benefits keep pace with rising prices. Although COLAs are most commonly associated with U.S. Social Security, they can also apply to private pension plans, where payouts may be gradually increased to reflect inflation. In practice, however, most private pensions do not include COLAs, as only well-funded plans can typically afford them, while underfunded plans usually cannot. As a result, COLA assumptions are often optional in pension calculations and can be customized—or set to zero if no adjustment is expected.
        </p>
      </div>
    </div>

    <!-- Footer层 -->
    <div class="footer-section">
      <div class="footer-content">
        <div class="footer-column">
          <h4>Tool Statement</h4>
          <p>This calculator is provided for educational purposes only. The results should not be considered as financial advice. Please consult with a qualified financial advisor before making any retirement decisions.</p>
        </div>
        <div class="footer-column">
          <h4>Data Statement</h4>
          <p>All calculations are performed locally in your browser. No personal data is collected, stored, or transmitted to any servers.</p>
        </div>
        <div class="footer-column">
          <h4>Contact & Feedback</h4>
          <p>If you have questions or feedback about this calculator, please contact us at: flykingmz@gmail.com</p>
        </div>
      </div>
      <div class="footer-copyright">
        <p>&copy; 2026. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PensionCalculator',
  mounted() {
    document.title = 'Pension Calculator – Estimate Your Retirement Pension Income'
    // 2. 设置关键meta标签（Google最关注的）
    this.setGoogleMetaTags()
  },
  data() {
    return {
      activeCalculator: 'lumpSum',
      
      // 计算器1的数据
      lumpSumInputs: {
        retirementAge: 65,
        lumpSumAmount: 800000,
        investmentReturn: 5,
        monthlyPension: 5000,
        colaAdjustment: 3.5
      },
      lumpSumResult: null,
      
      // 计算器2的数据
      singleJointInputs: {
        retirementAge: 65,
        lifeExpectancy: 77,
        spouseAge: 62,
        spouseLifeExpectancy: 82,
        singleLifePension: 5000,
        jointSurvivorPension: 3000,
        investmentReturn: 5,
        colaAdjustment: 3.5
      },
      singleJointResult: null,
      
      // 计算器3的数据
      workLongerInputs: {
        retirementAge1: 60,
        monthlyPension1: 2500,
        retirementAge2: 65,
        monthlyPension2: 3800,
        investmentReturn: 5,
        colaAdjustment: 3.5
      },
      workLongerResult: null
    };
  },
  methods: {
    setGoogleMetaTags() {
      // 确保description存在且内容正确
      let desc = document.querySelector('meta[name="description"]')
      if (!desc) {
        desc = document.createElement('meta')
        desc.name = 'description'
        document.head.appendChild(desc)
      }
      desc.content = 'Use our free Pension Calculator to estimate your retirement pension income, monthly payouts, and total benefits. Plan your retirement and forecast future income easily.'
      
      // 确保robots标签存在（告诉Google索引此页）
      let robots = document.querySelector('meta[name="robots"]')
      if (!robots) {
        robots = document.createElement('meta')
        robots.name = 'robots'
        document.head.appendChild(robots)
      }
      robots.content = 'index, follow'
      
      // 添加Google专用的nositelinkssearchbox（可选）
      let google = document.querySelector('meta[name="google"]')
      if (!google) {
        google = document.createElement('meta')
        google.name = 'google'
        document.head.appendChild(google)
      }
      google.content = 'nositelinkssearchbox'
      
      // 添加canonical链接（防止重复内容）
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = window.location.href
      
      console.log('Google meta tags set')
    },
    formatCurrency(value) {
      if (value >= 1000000) {
        return (value / 1000000).toFixed(2) + 'M';
      } else if (value >= 1000) {
        return (value / 1000).toFixed(0) + 'K';
      }
      return Math.round(value).toLocaleString();
    },
    
    calculateLumpSum() {
      const { retirementAge, lumpSumAmount, investmentReturn, monthlyPension, colaAdjustment } = this.lumpSumInputs;
      
      // 计算盈亏平衡点
      let breakEvenAge = retirementAge;
      let lumpSumValue = lumpSumAmount;
      let monthlyValue = 0;
      
      // 计算未来价值
      for (let age = retirementAge; age <= 120; age++) {
        const yearsFromRetirement = age - retirementAge;
        
        // 一次性付款的未来价值
        lumpSumValue = lumpSumAmount * Math.pow(1 + investmentReturn / 100, yearsFromRetirement);
        
        // 每月付款的未来价值（考虑通胀调整）
        let monthlyFutureValue = 0;
        for (let year = 0; year < yearsFromRetirement; year++) {
          const monthlyPayment = monthlyPension * 12 * Math.pow(1 + colaAdjustment / 100, year);
          const yearsRemaining = yearsFromRetirement - year;
          monthlyFutureValue += monthlyPayment * Math.pow(1 + investmentReturn / 100, yearsRemaining - 0.5);
        }
        
        monthlyValue = monthlyFutureValue;
        
        if (monthlyValue > lumpSumValue) {
          breakEvenAge = age;
          break;
        }
      }
      
      // 生成图表数据
      const chartData = {};
      const ages = [70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120];
      let maxValue = 0;
      
      ages.forEach(age => {
        if (age >= retirementAge) {
          const yearsFromRetirement = age - retirementAge;
          const lumpSumVal = lumpSumAmount * Math.pow(1 + investmentReturn / 100, yearsFromRetirement);
          
          let monthlyFutureValue = 0;
          for (let year = 0; year < yearsFromRetirement; year++) {
            const monthlyPayment = monthlyPension * 12 * Math.pow(1 + colaAdjustment / 100, year);
            const yearsRemaining = yearsFromRetirement - year;
            monthlyFutureValue += monthlyPayment * Math.pow(1 + investmentReturn / 100, yearsRemaining - 0.5);
          }
          
          chartData[age] = {
            lumpSum: lumpSumVal,
            monthly: monthlyFutureValue
          };
          
          maxValue = Math.max(maxValue, lumpSumVal, monthlyFutureValue);
        }
      });
      
      this.lumpSumResult = {
        betterOption: breakEvenAge <= 100 ? 'monthly' : 'lumpSum',
        breakEvenAge,
        chartData,
        maxValue
      };
    },
    
    calculateSingleJoint() {
      const {
        retirementAge,
        lifeExpectancy,
        spouseAge,
        spouseLifeExpectancy,
        singleLifePension,
        jointSurvivorPension,
        investmentReturn,
        colaAdjustment
      } = this.singleJointInputs;
      
      // 计算所需的年金现值（简化计算）
      const paymentDifference = singleLifePension - jointSurvivorPension;
      const spouseYearsAfterDeath = spouseLifeExpectancy - (spouseAge + (lifeExpectancy - retirementAge));
      
      // 计算所需的整笔金额（简化计算）
      let requiredLumpSum = 0;
      for (let year = 0; year < spouseYearsAfterDeath; year++) {
        const annualPayment = jointSurvivorPension * 12 * Math.pow(1 + colaAdjustment / 100, year);
        requiredLumpSum += annualPayment / Math.pow(1 + investmentReturn / 100, year + 0.5);
      }
      
      // 计算投资积累
      let investmentAccumulation = 0;
      const investmentYears = lifeExpectancy - retirementAge;
      
      for (let year = 0; year < investmentYears; year++) {
        const annualDifference = paymentDifference * 12 * Math.pow(1 + colaAdjustment / 100, year);
        const yearsRemaining = investmentYears - year;
        investmentAccumulation += annualDifference * Math.pow(1 + investmentReturn / 100, yearsRemaining - 0.5);
      }
      
      // 计算剩余年金价值
      let remainingPensionValue = 0;
      for (let year = 0; year < spouseYearsAfterDeath; year++) {
        const annualPayment = jointSurvivorPension * 12 * Math.pow(1 + colaAdjustment / 100, investmentYears + year);
        remainingPensionValue += annualPayment / Math.pow(1 + investmentReturn / 100, year + 0.5);
      }
      
      // 假设20年期寿险的月保费（简化计算）
      const insuranceMonthlyPremium = requiredLumpSum * 0.0005; // 简化的保费率
      
      this.singleJointResult = {
        lumpSumRequired: Math.round(requiredLumpSum),
        investmentAccumulation: Math.round(investmentAccumulation),
        remainingPensionValue: Math.round(remainingPensionValue),
        insuranceMonthlyPremium: Math.round(insuranceMonthlyPremium * 100) / 100,
        spouseAgeAtDeath: spouseAge + (lifeExpectancy - retirementAge)
      };
    },
    
    calculateWorkLonger() {
      const {
        retirementAge1,
        monthlyPension1,
        retirementAge2,
        monthlyPension2,
        investmentReturn,
        colaAdjustment
      } = this.workLongerInputs;
      
      // 计算盈亏平衡年龄
      let breakEvenAge = retirementAge2;
      
      // 生成图表数据
      const chartData = {};
      const ages = [retirementAge2, 70, 75, 80, 85, 90, 95, 100, 105];
      let maxValue = 0;
      
      ages.forEach(age => {
        if (age >= retirementAge2) {
          // 选项1的价值
          let value1 = 0;
          const years1 = age - retirementAge1;
          if (years1 > 0) {
            for (let year = 0; year < years1; year++) {
              const annualPayment = monthlyPension1 * 12 * Math.pow(1 + colaAdjustment / 100, year);
              const yearsRemaining = years1 - year;
              value1 += annualPayment * Math.pow(1 + investmentReturn / 100, yearsRemaining - 0.5);
            }
          }
          
          // 选项2的价值
          let value2 = 0;
          const years2 = age - retirementAge2;
          if (years2 > 0) {
            for (let year = 0; year < years2; year++) {
              const annualPayment = monthlyPension2 * 12 * Math.pow(1 + colaAdjustment / 100, year);
              const yearsRemaining = years2 - year;
              value2 += annualPayment * Math.pow(1 + investmentReturn / 100, yearsRemaining - 0.5);
            }
          }
          
          chartData[age] = {
            early: value1,
            later: value2
          };
          
          maxValue = Math.max(maxValue, value1, value2);
          
          // 找到盈亏平衡点
          if (value2 > value1 && breakEvenAge === retirementAge2) {
            breakEvenAge = age;
          }
        }
      });
      
      this.workLongerResult = {
        breakEvenAge,
        chartData,
        maxValue
      };
    },
    
    clearLumpSum() {
      this.lumpSumResult = null;
    },
    
    clearSingleJoint() {
      this.singleJointResult = null;
    },
    
    clearWorkLonger() {
      this.workLongerResult = null;
    }
  }
};
</script>

<style scoped>
.pension-calculator {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  color: #333;
}

/* 广告区域 */
.ads-container {
  padding: 10px;
  background-color: #f5f5f5;
  text-align: center;
  margin-bottom: 20px;
}

.google-ads {
  padding: 20px;
  background-color: #e0e0e0;
  color: #666;
}

/* 标题层 */
.header-section {
  background-color: #2c3e50;
  color: white;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center; /* 添加居中属性 */
}

.header-section h1 {
  margin: 0;
  font-size: 2.5rem;
}

.subtitle {
  margin-top: 0.5rem;
  opacity: 0.9;
  font-size: 1.1rem;
  max-width: 800px; /* 限制副标题最大宽度 */
  margin-left: auto; /* 与margin-right配合实现居中 */
  margin-right: auto; /* 与margin-left配合实现居中 */
}

/* 计算器选择器 */
.calculator-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.calculator-selector button {
  padding: 12px 24px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.calculator-selector button:hover {
  background-color: #e9ecef;
}

.calculator-selector button.active {
  background-color: #3498db;
  color: white;
  border-color: #2980b9;
}

/* 计算器区域 */
.calculator-section {
  margin-bottom: 3rem;
}

.calculator-description {
  margin-bottom: 2rem;
}

.calculator-description h2 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.calculator-description p {
  color: #555;
  line-height: 1.6;
}

/* 输入区域 */
.input-section {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  margin-bottom: 2rem;
}

.input-section.with-result {
  margin-top: 2rem;
}

.option-section {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.option-section:last-child {
  border-bottom: none;
}

.option-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 1rem;
}

.form-group {
  flex: 1;
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #495057;
}

.input-with-unit {
  display: flex;
  align-items: center;
  gap: 5px;
}

.input-with-unit .unit {
  color: #6c757d;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.superscript {
  vertical-align: super;
  font-size: 0.7em;
}

/* 按钮组 */
.button-group {
  display: flex;
  gap: 10px;
  margin-top: 1rem;
}

.calculate-btn {
  padding: 12px 30px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.calculate-btn:hover {
  background-color: #218838;
}

.clear-btn {
  padding: 12px 30px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.clear-btn:hover {
  background-color: #5a6268;
}

/* 结果区域 */
.result-section {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #dee2e6;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.result-content h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.result-content h4 {
  color: #34495e;
  margin: 1.5rem 0 1rem 0;
}

.result-content p {
  line-height: 1.6;
  margin-bottom: 1rem;
}

.result-details {
  margin-top: 1.5rem;
}

.comparison-section {
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.comparison-section h4 {
  margin-top: 0;
}

/* 图表样式 */
.chart-container {
  display: flex;
  gap: 20px;
  margin: 2rem 0;
  align-items: flex-end;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 200px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 3px;
}

.lump-sum {
  background-color: #3498db;
}

.monthly-pension {
  background-color: #2ecc71;
}

.retire-early {
  background-color: #e74c3c;
}

.retire-later {
  background-color: #9b59b6;
}

.chart {
  flex: 1;
  position: relative;
  height: 300px;
}

.chart-bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 250px;
  border-bottom: 1px solid #ddd;
  position: relative;
}

.bar-group {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 100%;
  width: 30px;
}

.bar {
  width: 12px;
  border-radius: 3px 3px 0 0;
  transition: opacity 0.3s ease;
}

.bar:hover {
  opacity: 0.8;
}

.lump-sum-bar {
  background-color: #3498db;
}

.monthly-bar {
  background-color: #2ecc71;
}

.retire-early-bar {
  background-color: #e74c3c;
}

.retire-later-bar {
  background-color: #9b59b6;
}

.chart-axis {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.axis-label {
  color: #666;
  font-size: 0.9rem;
}

.chart-title {
  text-align: center;
  margin-top: 10px;
  color: #666;
  font-weight: 600;
}

.chart-y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 250px;
  color: #666;
  font-size: 0.9rem;
  text-align: right;
  min-width: 60px;
}

.note {
  font-size: 0.9rem;
  color: #6c757d;
  font-style: italic;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

/* FAQ区域 */
.faq-section {
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.faq-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.faq-section h3 {
  color: #34495e;
  margin: 1.5rem 0 1rem 0;
}

.faq-content {
  line-height: 1.7;
}

.faq-content p {
  margin-bottom: 1rem;
}

.faq-content a {
  color: #3498db;
  text-decoration: none;
}

.faq-content a:hover {
  text-decoration: underline;
}

/* Footer区域 */
.footer-section {
  background-color: #2c3e50;
  color: white;
  padding: 2rem;
  border-radius: 8px;
}

.footer-content {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.footer-column {
  flex: 1;
  min-width: 250px;
}

.footer-column h4 {
  margin-bottom: 1rem;
  color: #ecf0f1;
}

.footer-column p {
  font-size: 0.9rem;
  line-height: 1.5;
  opacity: 0.9;
}

.footer-copyright {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #34495e;
  font-size: 0.9rem;
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .calculator-selector {
    flex-direction: column;
  }
  
  .calculator-selector button {
    width: 100%;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .chart-container {
    flex-direction: column;
  }
  
  .chart-y-axis {
    flex-direction: row;
    height: auto;
    width: 100%;
    justify-content: space-around;
    margin-top: 10px;
  }
  
  .chart {
    width: 100%;
  }
  
  .footer-content {
    flex-direction: column;
  }
  
  .input-section,
  .result-section,
  .faq-section,
  .footer-section {
    padding: 1rem;
  }
  
  .header-section {
    padding: 1.5rem;
  }
  
  .header-section h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .bar-group {
    width: 20px;
  }
  
  .bar {
    width: 8px;
  }
  
  .calculator-selector button {
    padding: 10px;
    font-size: 0.9rem;
  }
  
  .calculate-btn,
  .clear-btn {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}
</style>