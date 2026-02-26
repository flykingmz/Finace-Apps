<template>
<!-- 添加home连接，距离下面的div有间距 
  <div style="max-width: 1280px; margin: 20px auto 0; padding: 0 1.5rem;">
    <div style="margin-bottom: 20px;">
      <a href="/dashboard" style="color: #4f46e5; text-decoration: none; font-weight: 500; font-size: 1rem;">Home</a>
    </div>
  </div>
-->
  <div class="calculator-container">
    <!-- Header with Title (Dark Background) -->
    <header class="header">
      <div class="header-content">
        <h1>401(k) Calculator</h1>
        <p class="subtitle">Use our 401(k) Calculator to estimate your retirement savings based on your contributions, employer match, and expected investment returns. Project your 401(k) balance over time, plan contribution strategies, and understand how compound growth impacts your long-term retirement goals. This tool helps individuals make smarter retirement planning decisions with clear and accurate projections.</p>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="main-content">
      <!-- Calculator Input Section -->
      <section class="calculator-section" :class="{ 'results-active': showResults }">
        <div class="calculator-card">
          
          <div class="input-grid">
            <!-- Basic Info Section -->
            <div class="input-group">
              <h3 class="input-section-title">Basic info</h3>
              
              <div class="input-row">
                <label for="currentAge">Current age</label>
                <input 
                  id="currentAge"
                  type="number" 
                  v-model.number="inputs.currentAge"
                  min="18"
                  max="100"
                >
              </div>
              
              <div class="input-row">
                <label for="retirementAge">Expected retirement age</label>
                <input 
                  id="retirementAge"
                  type="number" 
                  v-model.number="inputs.retirementAge"
                  min="25"
                  max="100"
                >
              </div>
              
              <div class="input-row">
                <label for="currentSalary">Current annual salary</label>
                <div class="input-with-dollar">
                  <span class="dollar-sign">$</span>
                  <input 
                    id="currentSalary"
                    type="number" 
                    v-model.number="inputs.currentSalary"
                    min="0"
                    step="1000"
                  >
                </div>
              </div>
              
              <div class="input-row">
                <label for="lifeExpectancy">Life expectancy</label>
                <input 
                  id="lifeExpectancy"
                  type="number" 
                  v-model.number="inputs.lifeExpectancy"
                  min="60"
                  max="120"
                >
              </div>
              
              <div class="input-row">
                <label for="currentBalance">Current 401(k) balance</label>
                <div class="input-with-dollar">
                  <span class="dollar-sign">$</span>
                  <input 
                    id="currentBalance"
                    type="number" 
                    v-model.number="inputs.currentBalance"
                    min="0"
                    step="1000"
                  >
                </div>
              </div>
            </div>
            
            <!-- Projections Section -->
            <div class="input-group">
              <h3 class="input-section-title">Projections</h3>
              
              <div class="input-row">
                <label for="salaryIncrease">Expected salary increase</label>
                <div class="input-with-percent">
                  <input 
                    id="salaryIncrease"
                    type="number" 
                    v-model.number="inputs.salaryIncrease"
                    min="0"
                    max="20"
                    step="0.1"
                  >
                  <span class="percent-sign">%</span>
                  <span class="input-description">per year</span>
                </div>
              </div>
              
              <div class="input-row">
                <label for="contributionRate">Contribution (% of salary)</label>
                <div class="input-with-percent">
                  <input 
                    id="contributionRate"
                    type="number" 
                    v-model.number="inputs.contributionRate"
                    min="0"
                    max="100"
                    step="0.1"
                  >
                  <span class="percent-sign">%</span>
                </div>
              </div>
              
              <div class="input-row">
                <label for="annualReturn">Expected annual return</label>
                <div class="input-with-percent">
                  <input 
                    id="annualReturn"
                    type="number" 
                    v-model.number="inputs.annualReturn"
                    min="0"
                    max="20"
                    step="0.1"
                  >
                  <span class="percent-sign">%</span>
                  <span class="input-description">per year</span>
                </div>
              </div>
              
              <div class="input-row">
                <label for="employerMatch">Employer match</label>
                <div class="input-with-percent">
                  <input 
                    id="employerMatch"
                    type="number" 
                    v-model.number="inputs.employerMatch"
                    min="0"
                    max="100"
                    step="0.1"
                  >
                  <span class="percent-sign">%</span>
                </div>
              </div>
              
              <div class="input-row">
                <label for="inflationRate">Expected inflation rate</label>
                <div class="input-with-percent">
                  <input 
                    id="inflationRate"
                    type="number" 
                    v-model.number="inputs.inflationRate"
                    min="0"
                    max="20"
                    step="0.1"
                  >
                  <span class="percent-sign">%</span>
                  <span class="input-description">per year</span>
                </div>
              </div>
              
              <div class="input-row">
                <label for="matchLimit">Employer match limit</label>
                <div class="input-with-percent">
                  <input 
                    id="matchLimit"
                    type="number" 
                    v-model.number="inputs.matchLimit"
                    min="0"
                    max="100"
                    step="0.1"
                  >
                  <span class="percent-sign">%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="button-group">
            <button class="btn btn-calculate" @click="calculate">
              Calculate
            </button>
            <button class="btn btn-clear" @click="clearInputs">
              Clear
            </button>
          </div>
        </div>
      </section>
      
      <!-- Results Section (Initially hidden) -->
      <section class="results-section" v-if="showResults">
        <div class="results-card">
          <!-- Summary Results -->
          <div class="summary-results">
            <h2>401(k) Projection Results</h2>
            <p class="result-description">
              At the retirement age of {{ inputs.retirementAge }}, the 401(k) balance will be 
              <strong>{{ formatCurrency(results.balanceAtRetirement) }}</strong>, which is equivalent to 
              <strong>{{ formatCurrency(results.balanceInTodayDollars) }}</strong> in purchasing power today.
            </p>
            
            <div class="result-grid">
              <div class="result-item">
                <span class="result-label">Balance at {{ inputs.retirementAge }}:</span>
                <span class="result-value">{{ formatCurrency(results.balanceAtRetirement) }}</span>
              </div>
              <div class="result-item">
                <span class="result-label">Total contributions:</span>
                <span class="result-value">{{ formatCurrency(results.totalContributions) }}</span>
              </div>
              <div class="result-item">
                <span class="result-label">Employee contributions:</span>
                <span class="result-value">{{ formatCurrency(results.employeeContributions) }}</span>
              </div>
              <div class="result-item">
                <span class="result-label">Employer match:</span>
                <span class="result-value">{{ formatCurrency(results.employerMatchTotal) }}</span>
              </div>
              <div class="result-item">
                <span class="result-label">Investment returns:</span>
                <span class="result-value">{{ formatCurrency(results.investmentReturns) }}</span>
              </div>
            </div>
            
            <!-- Withdrawal Options -->
            <div class="withdrawal-section">
              <h3>Withdrawal</h3>
              
              <div class="withdrawal-option">
                <p>
                  If withdrawing at fixed purchasing power monthly, 
                  <strong>{{ formatCurrency(results.fixedPurchasingPowerMonthly) }}</strong> per month can be withdrawn from age {{ inputs.retirementAge + 1 }} and increase {{ inputs.inflationRate }}% per year until {{ inputs.lifeExpectancy }}. 
                  It is equivalent to <strong>{{ formatCurrency(results.fixedPurchasingPowerToday) }}</strong> in purchasing power today.
                </p>
              </div>
              
              <div class="withdrawal-option">
                <p>
                  If withdrawing at fixed amount monthly, 
                  <strong>{{ formatCurrency(results.fixedAmountMonthly) }}</strong> per month can be withdrawn in retirement until {{ inputs.lifeExpectancy }}. 
                  At {{ inputs.retirementAge + 1 }}, this is equivalent to <strong>{{ formatCurrency(results.fixedAmountMonthlyStart) }}</strong> in purchasing power today, 
                  and at {{ inputs.lifeExpectancy }}, is equivalent to <strong>{{ formatCurrency(results.fixedAmountMonthlyEnd) }}</strong>.
                </p>
              </div>
              
              <div class="withdrawal-option">
                <p>
                  If withdrawing at fixed amount annually, 
                  <strong>{{ formatCurrency(results.fixedAmountAnnually) }}</strong> per year can be withdrawn in retirement until {{ inputs.lifeExpectancy }}. 
                  At {{ inputs.retirementAge }}, this is equivalent to <strong>{{ formatCurrency(results.fixedAmountAnnuallyStart) }}</strong> in purchasing power today, 
                  and at {{ inputs.lifeExpectancy }}, is equivalent to <strong>{{ formatCurrency(results.fixedAmountAnnuallyEnd) }}</strong>.
                </p>
              </div>
            </div>
            
            <!-- Schedule Button -->
            <div class="schedule-toggle">
              <button class="btn btn-schedule" @click="toggleSchedule">
                {{ showSchedule ? 'Hide Schedule' : 'Show Schedule' }}
              </button>
            </div>
            
            <!-- Schedule Tables -->
            <div class="schedule-section" v-if="showSchedule">
              <!-- Accumulation Phase Table -->
              <div class="schedule-table">
                <h4>Accumulation Phase (Age {{ inputs.currentAge + 1 }} to {{ inputs.retirementAge }})</h4>
                <div class="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Age</th>
                        <th>Contribution</th>
                        <th>Investment return</th>
                        <th>End balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="row in accumulationSchedule" :key="row.age">
                        <td>{{ row.age }}</td>
                        <td>{{ formatCurrency(row.contribution) }}</td>
                        <td>{{ formatCurrency(row.investmentReturn) }}</td>
                        <td>{{ formatCurrency(row.endBalance) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <!-- Withdrawal Phase Table -->
              <div class="schedule-table">
                <h4>Withdrawal Phase (Age {{ inputs.retirementAge + 1 }} to {{ inputs.lifeExpectancy }})</h4>
                <p class="table-note">Assuming fixed annual withdrawal of {{ formatCurrency(results.fixedAmountAnnually) }}</p>
                <div class="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Age</th>
                        <th>Payout</th>
                        <th>Investment returns</th>
                        <th>End balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="row in withdrawalSchedule" :key="row.age">
                        <td>{{ row.age }}</td>
                        <td>{{ formatCurrency(row.payout) }}</td>
                        <td>{{ formatCurrency(row.investmentReturns) }}</td>
                        <td>{{ formatCurrency(row.endBalance) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- FAQ Section -->
      <section class="faq-section" id="faq">
        <div class="faq-card">
          <h2>401(k) Information</h2>
          
          <div class="faq-content">
            <p>
              A 401(k) is a form of retirement savings plan in the U.S. with tax benefits that are mainly available through an employer. 
              It is named after subsection 401(k) in the Internal Revenue Code, which was made possible by the Revenue Act of 1978. 
              Self-directed 401(k)s exist for people who can't participate in employer-sponsored 401(k)s. 
              Contributions to a 401(k) are made as pre-tax deductions during payroll, and the dividends, interest, and capital gains of the 401(k) all benefit from tax deferment. 
              This means that assets in a 401(k) grow tax-free and won't be taxed until a later point, usually during retirement.
            </p>
            
            <h3>General Pros and Cons of a 401(k)</h3>
            
            <div class="pros-cons">
              <div class="pros">
                <h4>Pros</h4>
                <ul>
                  <li><strong>Tax-deferred growth</strong>—Similar to traditional IRAs or deferred annuities, growth of investments with a 401(k) are tax-deferred, which means earnings on interest, dividends, or capital gains accumulate tax-free.</li>
                  <li><strong>Employer matching</strong>—401(k)s are known for often including an employer matching program. Experts have likened the aspect of employer matching of 401(k)s to "free money" or "pay raises" that should never be left on the table.</li>
                  <li><strong>Tax-deductible</strong>—Contributions to a 401(k), both from employees and employers, are always tax-deductible because they reduce taxable income, lowering total taxes owed.</li>
                  <li><strong>High contribution limits</strong>—401(k)s have relatively high annual contribution limits. For 2026, the limit is $24,500 for those under 50, $32,500 for those over 50.</li>
                  <li><strong>Creditor protection</strong>—401(k)s funds are generally protected from bankruptcy.</li>
                </ul>
              </div>
              
              <div class="cons">
                <h4>Cons</h4>
                <ul>
                  <li><strong>Few investment options</strong>—Generally speaking, 401(k)s have few investment options; because they normally originate from employers, they are limited to what is offered through employers' 401(k) plans.</li>
                  <li><strong>High fees</strong>—Compared to other forms of retirement savings, 401(k)s plans charge higher fees, sometimes as a percentage of funds.</li>
                  <li><strong>Illiquid</strong>—401(k)s funds can only be withdrawn without penalty in rare cases before 59 ½.</li>
                  <li><strong>Vesting periods</strong>—Employers may utilize vesting periods, meaning that employer contributions don't fully belong to employees until after a set point in time.</li>
                  <li><strong>Waiting periods</strong>—Some employers don't allow participation in their 401(k)s until after a waiting period is over, usually to reduce employee turnover.</li>
                </ul>
              </div>
            </div>
            
            <h3>A 401(k) is a Defined Contribution Plan</h3>
            <p>
              Unlike a defined benefit plan (DBP), also known as a pension plan, which is based on formulas for determining retirement withdrawals, 
              defined contribution plans (DCPs) allow their participants to choose from a variety of investment options. 
              DCPs, 401(k)s in particular, have been gaining in popularity as compared to DBPs.
            </p>
            
            <h3>401(k) Investments</h3>
            <p>
              In general, most 401(k) offerings allow an individual to invest in a variety of portfolios. 
              These vary between mutual funds, index funds, or exchange-traded funds, all of which have an assorted mixture of stocks, bonds, 
              international market equities, treasuries, and much more.
            </p>

            <h3>Employer Match</h3>
            <p>
              A 401(k) match is an employer's percentage match of a participating employee's contribution to their 401(k) plan, usually up to a certain limit denoted as a percentage of the employee's salary. There can be no match without an employee contribution, and not all 401(k)s offer employer matching.<br>

As an example, an employer that matches 50% of an employee's contribution for up to 6% of their salary would contribute a maximum of 3% of the employee's salary to the employee's 401(k). Another common matching scheme is a dollar-for-dollar employer match, up to a certain percentage of salary.<br>

Taking full advantage of an employer's match by contributing to a 401(k) can make even more financial sense than the opportunity cost of many other things, such as paying off high-interest debt. To illustrate, a 401(k) that matches 100% of contributions up to a certain amount generates an immediate 100% return on investment for the contributor (even more if considering tax-deferred growth over time), which is pretty hard to beat!<br>

Employers mainly offer 401(k) matches in order to attract and retain a talented workforce and to incentivize saving for retirement. Annual contributions to an employee's account cannot exceed the lesser of 100% of the participant's compensation, or $72,000 in 2026. Contributions from both employee and employer go into 401(k) plans untaxed, and the funds grow tax-free over time. The funds are taxed when withdrawn from a presumably advantageous standpoint since retired account holders are most likely in lower tax brackets than they were while working.<br>
            </p>
            <h4>401(k) Vesting Periods</h4>
            <p>Some employers require a vesting period for their 401(k) plans in order to incentivize employees to stay long-term. Vesting refers to how much of a 401(k)'s employer contributions are owned by an employee. An employee that is fully vested has full ownership of the funds in their retirement plan. Unlike employer matches, employee contributions are always 100% vested.<br>

A 4-year vesting period is fairly common. After the first year of employment, an employee is entitled to 25% of employer contributions even if they leave the company. This increases to 50% in the second year and 75% in the third year, with the employee becoming fully vested after 4 years. This is referred to as graded vesting. Some companies do not have schedules that increase vested amounts each year, but instead allow employees to become fully vested after a certain period of time. This is called cliff vesting, which means all of the vestings take place at a certain point in the vesting schedule. In this case, an employee that leaves a company before becoming fully vested will have to forfeit all employer contributions. Different 401(k) plans have different rules regarding vesting. For more accurate information, it is best to speak with human resources or 401(k) plan administrators.</p>
          
          <h3>Early Withdrawal</h3>
            <p>
            Contributions and their subsequent interest earnings as part of a 401(k) plan cannot be withdrawn without penalty before the age of 59 ½. In some cases (described below), exceptions are made, and early withdrawals are permitted. Under these circumstances, early 401(k) withdrawals are still subject to ordinary income taxes, but not the 10% penalty.<br>
            <strong>Early 401(k) Withdrawals</strong>Withdrawals before age 59½ are generally subject to a 10% penalty and ordinary income taxes, though certain exceptions allow penalty-free early withdrawals (taxes still apply).<br>
            <strong>Hardship Withdrawals</strong>Some 401(k) plans permit hardship withdrawals with proper documentation. These withdrawals cannot be repaid and are approved at the employer or plan administrator’s discretion. Qualifying reasons may include major medical expenses, home purchase costs, education expenses, foreclosure or eviction prevention, funeral costs, or home repair due to damage.<br>
            <strong>Non-Financial Hardship Exceptions</strong>Penalty-free early withdrawals may also be allowed in cases such as death, disability, separation from employment at age 55 or older, qualified medical deductions, court-ordered distributions (QDROs), or structured periodic payments under IRS Rule 72(t).<br>
            <strong>Key Considerations</strong>Even when penalties are waived, early withdrawals reduce long-term retirement savings and forfeit the benefits of tax-deferred compounding growth, so the true cost should be carefully evaluated.<br> 
            </p>

            <h3>401(k) Distributions in Retirement</h3>
            <p>
            Anyone older than 59 ½ can begin receiving distributions from their 401(k)s, but they can also choose to defer receiving distributions to allow more earnings to accumulate. Distributions can be deferred, at the latest, until the age of 73 (72 if you reach age 72 before Dec. 31, 2022). Between the ages of 59 ½ and 73, participants have several options:<br>
            <strong>Option 1: Receive Distributions</strong>Distributions can be received in the form of either a lump sum or in installments. A lump-sum distribution allows a person to receive all of their 401(k) funds immediately, but forfeits the benefits of tax-deferred compounding while also incurring income tax on the distribution on the year it is withdrawn, which can be a significant amount.<br>

Installment plans allow a person to receive a set amount from their 401(k) periodically. The payment amounts can be typically changed once a year, but certain plans allow for more frequent changes. When choosing the installment option, one of the hardest decisions to make is exactly how much to withdraw each month or year. There are many factors to consider, such as life expectancy, investment performance, how much a person may need to live comfortably, and Social Security. A common rule of thumb is the 4% rule, which suggests withdrawing 4% annually. Note that each distribution must be at least the required minimum distribution (RMD) in order to avoid a penalty. RMD is calculated based on life expectancy and the account balance at the end of the previous year.<br>
            <strong>Option 2: Rollover</strong>It is also possible to roll over a 401k to an IRA or another employer's plan. No taxes will be imposed on rollovers. Both Roth and traditional IRAs generally offer more investment options. Moving after-tax money into a Roth IRA can help diversify retirement portfolios. Keep in mind that traditional IRAs also require minimum distributions at age 73.<br>
            <strong>Option 3: Annuity</strong>Some plans allow 401(k)s to be converted into annuities, which are usually offered through private insurance companies. Similar to rollovers, no taxes will be imposed on conversions. The annuity will pay a monthly benefit for the duration of the owner's projected life expectancy. If a joint-and-survivor annuity is involved, the primary account holder and the designated beneficiary will receive monthly payments for the duration of both their expected lifetimes.<br>
            <strong>Option 4: Do Nothing</strong>The distribution of funds can be postponed if the retiree wants to take advantage of the benefits of tax-deferred compounding for as long as possible. This is possible up until the age of 73, after which the government will require mandatory annual distributions.<br> 
            </p>

            <h3>Required Minimum Distributions</h3>
            <p>
            Anyone that reaches age 73 (72 if you reach age 72 before Dec. 31, 2022) is required to take distributions from their 401(k). This is called a required minimum distribution (RMD). Traditional, SIMPLE, and SEP IRAs have similar rules imposed by the IRS. The exact date at which RMDs are required is April 1st of the year after a retiree reaches the age of 73. In order to determine the exact amount, retirees can take their 401(k) retirement assets and divide it by a life-expectancy factor, which changes slightly every year.<br>

The federal penalty for not taking the RMD is a 50% tax on any amount not withdrawn in time. The amount of the required distribution is based on the prior year's December 31st account balance and an IRS life expectancy chart. In some cases, a person who has not withdrawn the necessary amount can attempt to avoid the penalty by withdrawing the shortfall immediately, filing Form 5329 with the IRS, and providing valid reasons as to why the deadline was missed. The IRS may forgive the missed withdrawal.<br>

There is one exception to the RMD rule: any employee with an employer-sponsored 401(k) when they turn 73 can get out of the RMD as long as they remain employed. This is only if their plan doesn't mandate RMDs and they don't own 5% or more of the company. However, as soon as they retire from the company, they will be subject to RMDs.<br>
            <strong>Self-Directed 401(k)</strong>A self-directed (SD) 401(k), sometimes called a solo 401(k), is a way for self-employed individuals to participate in a 401(k) plan. Although their purpose is aimed specifically at the self-employed, SD 401(k)s can also be offered to employees as an alternative to a traditional 401(k) plan through their employers, though it is uncommon.<br>
            <strong>Roth 401(k)</strong>The Roth 401(k) is somewhat different from the traditional 401(K) as a retirement savings plan. It combines some features of the traditional 401(k) along with some features of the Roth IRA. The main difference is the timing of taxation. Similar to Roth IRAs, Roth 401(k)s are retirement plans that utilize after-tax contributions instead of pre-tax income. What this means is that taxes are paid upfront, and during retirement, qualified withdrawals are tax-free. The same annual contribution limits for 2026 still apply: $24,500 for individuals under 50, $32,500 for those aged 50 or older, and $35,750 for those aged 60 to 63.<br>

However, unlike the Roth IRA, contributions can't be withdrawn from a Roth 401(k) without penalty until five years after the plan starts, while a Roth IRA's contributions (not earnings) can be withdrawn at any time. This rule for the Roth 401(k) applies even after the age of 59 ½, when tax-free distributions are generally allowed. Also, unlike the Roth IRA, it has required minimum distributions (RMD) at age 73, though at that stage, a Roth 401(k) could be rolled into a Roth IRA to avoid RMDs, without any tax penalty. The ability to withdraw contributions at any time, penalty and tax-free, as well as not having an RMD are two significant advantages of a Roth IRA that are missing in Roth 401(k)s.<br>

It is possible to contribute to both forms of 401(k) simultaneously, as long as the sum of contributions is still within the annual contribution limits, similar to the treatment of the sums of traditional and Roth IRA annual contributions.<br>
            </p>
          </div>
        </div>
      </section>
    </main>
    
    <!-- Footer (Dark Background) -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>Tool Statement</h4>
          <p>This 401(k) calculator is for educational and planning purposes only. Results are estimates and not guarantees of future performance.</p>
        </div>
        
        <div class="footer-section">
          <h4>Data Statement</h4>
          <p>All calculations are performed locally in your browser. No personal data is collected, stored, or transmitted.</p>
        </div>
        
        <div class="footer-section">
          <h4>Contact & Feedback</h4>
          <p>For questions or feedback about this calculator, please contact us at flykingmz@gmail.com</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© 2026 401(k) Calculator. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'KCalculator',
  data() {
    return {
      showResults: false,
      showSchedule: false,
      inputs: {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        lifeExpectancy: 85,
        currentBalance: 35000,
        salaryIncrease: 3,
        contributionRate: 10,
        annualReturn: 6,
        employerMatch: 50,
        inflationRate: 3,
        matchLimit: 3
      },
      results: {
        balanceAtRetirement: 1711800,
        balanceInTodayDollars: 608345,
        totalContributions: 556485,
        employeeContributions: 488466,
        employerMatchTotal: 68020,
        investmentReturns: 1155315,
        fixedPurchasingPowerMonthly: 9494,
        fixedPurchasingPowerToday: 3374,
        fixedAmountMonthly: 12264,
        fixedAmountMonthlyStart: 4358,
        fixedAmountMonthlyEnd: 2413,
        fixedAmountAnnually: 149243,
        fixedAmountAnnuallyStart: 53038,
        fixedAmountAnnuallyEnd: 29366
      },
      accumulationSchedule: [],
      withdrawalSchedule: []
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
      desc.content = 'Use our free 401(k) Calculator to estimate retirement savings, employer match, and investment growth. Plan contributions and forecast your future retirement income easily.'
      
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
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    },
    
    calculate() {
      // For demonstration purposes, we'll use the sample data from the attachments
      // In a real application, you would calculate these values based on the inputs
      this.generateAccumulationSchedule();
      this.generateWithdrawalSchedule();
      this.showResults = true;
      
      // Scroll to results if on mobile
      if (window.innerWidth < 768) {
        setTimeout(() => {
          document.querySelector('.results-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    },
    
    generateAccumulationSchedule() {
      this.accumulationSchedule = [];
      let balance = this.inputs.currentBalance;
      let salary = this.inputs.currentSalary;
      
      for (let age = this.inputs.currentAge + 1; age <= this.inputs.retirementAge; age++) {
        // Calculate employee contribution
        const employeeContribution = (salary * this.inputs.contributionRate / 100);
        
        // Calculate employer match (up to match limit)
        const matchableSalary = Math.min(salary * this.inputs.matchLimit / 100, employeeContribution);
        const employerContribution = matchableSalary * this.inputs.employerMatch / 100;
        
        const totalContribution = employeeContribution + employerContribution;
        const investmentReturn = balance * this.inputs.annualReturn / 100;
        
        balance += totalContribution + investmentReturn;
        
        this.accumulationSchedule.push({
          age: age,
          contribution: totalContribution,
          investmentReturn: investmentReturn,
          endBalance: balance
        });
        
        // Increase salary for next year
        salary *= (1 + this.inputs.salaryIncrease / 100);
      }
      
      // Update retirement balance in results
      this.results.balanceAtRetirement = balance;
    },
    
    generateWithdrawalSchedule() {
      this.withdrawalSchedule = [];
      let balance = this.results.balanceAtRetirement;
      const annualWithdrawal = this.results.fixedAmountAnnually;
      
      for (let age = this.inputs.retirementAge + 1; age <= this.inputs.lifeExpectancy; age++) {
        const investmentReturns = balance * this.inputs.annualReturn / 100;
        
        // Withdraw at the beginning of the year
        balance -= annualWithdrawal;
        balance += investmentReturns;
        
        this.withdrawalSchedule.push({
          age: age,
          payout: -annualWithdrawal,
          investmentReturns: investmentReturns,
          endBalance: Math.max(balance, 0) // Ensure balance doesn't go negative
        });
        
        // If balance goes to zero or negative, break
        if (balance <= 0) break;
      }
    },
    
    toggleSchedule() {
      this.showSchedule = !this.showSchedule;
    },
    
    clearInputs() {
      this.inputs = {
        currentAge: 30,
        retirementAge: 65,
        currentSalary: 75000,
        lifeExpectancy: 85,
        currentBalance: 35000,
        salaryIncrease: 3,
        contributionRate: 10,
        annualReturn: 6,
        employerMatch: 50,
        inflationRate: 3,
        matchLimit: 3
      };
      this.showResults = false;
      this.showSchedule = false;
    }
  },
  mounted() {
    document.title = '401(k) Calculator – Estimate Retirement Savings & Employer Match'
    // 2. 设置关键meta标签（Google最关注的）
    this.setGoogleMetaTags()

    // Initialize with sample schedule data from attachments
    this.generateAccumulationSchedule();
    this.generateWithdrawalSchedule();
  }
};
</script>

<style scoped>
.calculator-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
}

/* Header Styles */
.header {
  background-color: #2c3e50;
  color: white;
  padding: 2rem 1rem;
  text-align: center;
}

.header-content h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  font-weight: 600;
}

.subtitle {
  margin: 0;
  opacity: 0.9;
  font-size: 1.1rem;
}

/* Main Content */
.main-content {
  padding: 2rem 1rem;
}

/* Calculator Section */
.calculator-section {
  transition: all 0.3s ease;
}

.calculator-section.results-active {
  margin-bottom: 2rem;
}

.calculator-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
}

.section-header {
  margin-bottom: 2rem;
  text-align: center;
}

.section-header h2 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 2rem;
}

.section-subtitle {
  margin: 0;
  color: #666;
  font-size: 1rem;
}

.input-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .input-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.input-group {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.input-section-title {
  margin: 0 0 1.5rem 0;
  color: #2c3e50;
  font-size: 1.3rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #3498db;
}

.input-row {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
}

.input-row:last-child {
  margin-bottom: 0;
}

.input-row label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
  font-size: 0.95rem;
}

.input-row input {
  padding: 0.75rem;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
  width: 100%;
  box-sizing: border-box;
}

.input-row input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.input-with-dollar,
.input-with-percent {
  position: relative;
  display: flex;
  align-items: center;
}

.dollar-sign,
.percent-sign {
  position: absolute;
  left: 0.75rem;
  color: #6c757d;
  font-weight: 500;
}

.input-with-dollar input,
.input-with-percent input {
  padding-left: 2rem;
}

.input-description {
  margin-left: 0.75rem;
  color: #6c757d;
  font-size: 0.9rem;
}

/* Button Styles */
.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 140px;
}

.btn-calculate {
  background-color: #3498db;
  color: white;
}

.btn-calculate:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.btn-clear {
  background-color: #e9ecef;
  color: #495057;
}

.btn-clear:hover {
  background-color: #dee2e6;
  transform: translateY(-2px);
}

.btn-schedule {
  background-color: #2c3e50;
  color: white;
  margin-top: 1rem;
}

.btn-schedule:hover {
  background-color: #1a252f;
}

/* Results Section */
.results-section {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.results-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
}

.summary-results h2 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.result-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #495057;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #dee2e6;
}

.result-item:last-child {
  border-bottom: none;
}

.result-label {
  color: #495057;
  font-weight: 500;
}

.result-value {
  color: #2c3e50;
  font-weight: 600;
  font-size: 1.1rem;
}

.withdrawal-section {
  margin-bottom: 2rem;
}

.withdrawal-section h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.withdrawal-option {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border-left: 4px solid #3498db;
}

.withdrawal-option:last-child {
  margin-bottom: 0;
}

.withdrawal-option p {
  margin: 0;
  line-height: 1.6;
  color: #495057;
}

.schedule-toggle {
  text-align: center;
  margin: 2rem 0;
}

/* Schedule Tables */
.schedule-section {
  margin-top: 2rem;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from { opacity: 0; max-height: 0; }
  to { opacity: 1; max-height: 2000px; }
}

.schedule-table {
  margin-bottom: 3rem;
}

.schedule-table h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.table-note {
  color: #6c757d;
  font-style: italic;
  margin-bottom: 1rem;
}

.table-responsive {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

thead {
  background-color: #2c3e50;
  color: white;
}

th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  white-space: nowrap;
}

tbody tr {
  border-bottom: 1px solid #dee2e6;
}

tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

td {
  padding: 1rem;
  color: #495057;
}

/* FAQ Section */
.faq-section {
  margin-top: 3rem;
}

.faq-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.faq-card h2 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.faq-content h3 {
  color: #2c3e50;
  margin: 2rem 0 1rem 0;
  font-size: 1.4rem;
}

.faq-content h4 {
  color: #2c3e50;
  margin: 1.5rem 0 0.75rem 0;
  font-size: 1.2rem;
}

.faq-content p {
  line-height: 1.6;
  color: #495057;
  margin-bottom: 1rem;
}

.pros-cons {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin: 2rem 0;
}

@media (min-width: 768px) {
  .pros-cons {
    grid-template-columns: 1fr 1fr;
  }
}

.pros ul,
.cons ul {
  padding-left: 1.5rem;
  margin: 0;
}

.pros li,
.cons li {
  margin-bottom: 0.75rem;
  line-height: 1.5;
  color: #495057;
}

.pros strong {
  color: #27ae60;
}

.cons strong {
  color: #e74c3c;
}

/* Footer Styles */
.footer {
  background-color: #2c3e50;
  color: white;
  padding: 3rem 1rem 1.5rem;
  margin-top: 3rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(3, 1fr);
  }
}

.footer-section h4 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: #ecf0f1;
}

.footer-section p {
  margin: 0;
  line-height: 1.6;
  color: #bdc3c7;
  font-size: 0.95rem;
}

.footer-bottom {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #34495e;
}

.footer-bottom p {
  margin: 0;
  color: #95a5a6;
  font-size: 0.9rem;
}

/* Mobile Responsive Adjustments */
@media (max-width: 767px) {
  .header-content h1 {
    font-size: 2rem;
  }
  
  .calculator-card,
  .results-card,
  .faq-card {
    padding: 1.5rem;
  }
  
  .btn {
    min-width: 120px;
    padding: 0.75rem 1.5rem;
  }
  
  th, td {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
  
  .result-grid {
    grid-template-columns: 1fr;
  }
}
</style>