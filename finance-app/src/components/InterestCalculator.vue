<template>
  <div class="interest-calculator">
    <!-- Header -->
    <h1 class="main-title">Interest Calculator – Calculate Simple or Compound Interest</h1>
    <p class="description">
      This Interest Calculator helps you estimate how much interest you will earn on savings or pay on loans over time. By entering the principal amount, interest rate, compounding frequency, and time period, you can quickly calculate both simple and compound interest. This tool is useful for comparing savings accounts, investments, personal loans, or credit interest to better understand how interest grows over time.
    </p>

    <!-- Calculator Form - 附件1样式 -->
    <div class="calculator-form">
      <h2>Interest Calculator</h2>

      <!-- Initial Investment -->
      <div class="form-row">
        <label>Initial investment</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input
              type="number"
              v-model.number="form.initialInvestment"
              @input="calculate"
              min="0"
              step="1000"
              placeholder="20000"
            />
          </div>
        </div>
      </div>

      <!-- Annual Contribution -->
      <div class="form-row">
        <label>Annual contribution</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input
              type="number"
              v-model.number="form.annualContribution"
              @input="calculate"
              min="0"
              step="500"
              placeholder="5000"
            />
          </div>
        </div>
      </div>

      <!-- Monthly Contribution -->
      <div class="form-row">
        <label>Monthly contribution</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input
              type="number"
              v-model.number="form.monthlyContribution"
              @input="calculate"
              min="0"
              step="100"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <!-- Contribution Timing -->
      <div class="form-row radio-row">
        <label>Contribute at the</label>
        <div class="radio-group">
          <label class="radio-label">
            <input
              type="radio"
              value="beginning"
              v-model="form.contributeTiming"
              @change="calculate"
            />
            <span>beginning</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              value="end"
              v-model="form.contributeTiming"
              @change="calculate"
            />
            <span>end</span>
          </label>
        </div>
        <span class="of-text">of each compounding period</span>
      </div>

      <!-- Interest Rate -->
      <div class="form-row">
        <label>Interest rate</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <input
              type="number"
              step="0.1"
              v-model.number="form.interestRate"
              @input="calculate"
              min="0"
              max="30"
              placeholder="5"
            />
            <span class="percent-symbol">%</span>
          </div>
        </div>
      </div>

      <!-- Compound Frequency -->
      <div class="form-row">
        <label>Compound</label>
        <div class="input-wrapper">
          <select v-model="form.compoundFrequency" @change="calculate" class="frequency-select">
            <option v-for="option in compoundOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Investment Length -->
      <div class="form-row loan-term-row">
        <label>Investment length</label>
        <div class="term-inputs">
          <div class="input-with-symbol term-year">
            <input
              type="number"
              v-model.number="form.years"
              @input="calculate"
              min="0"
              max="100"
              step="1"
              placeholder="5"
            />
            <span>years</span>
          </div>
          <div class="input-with-symbol term-month">
            <input
              type="number"
              v-model.number="form.months"
              @input="calculate"
              min="0"
              max="11"
              step="1"
              placeholder="0"
            />
            <span>months</span>
          </div>
        </div>
      </div>

      <!-- Tax Rate -->
      <div class="form-row">
        <label>Tax rate</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <input
              type="number"
              step="0.1"
              v-model.number="form.taxRate"
              @input="calculate"
              min="0"
              max="100"
              placeholder="0"
            />
            <span class="percent-symbol">%</span>
          </div>
        </div>
      </div>

      <!-- Inflation Rate -->
      <div class="form-row">
        <label>Inflation rate</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <input
              type="number"
              step="0.1"
              v-model.number="form.inflationRate"
              @input="calculate"
              min="0"
              max="100"
              placeholder="3"
            />
            <span class="percent-symbol">%</span>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button @click="calculate">Calculate</button>
        <button class="clear" @click="clearForm">Clear</button>
      </div>
    </div>

    <!-- Results Section - 附件2样式 -->
    <div class="results-section" v-if="results.calculated">
      <h2>Results</h2>

      <!-- Ending Balance Highlight -->
      <div class="ending-balance-card">
        <div class="ending-balance-label">Ending balance</div>
        <div class="ending-balance-value">${{ formatMoney(results.endingBalance) }}</div>
      </div>

      <!-- Results Grid -->
      <div class="results-grid">
        <div class="result-item">
          <span class="result-label">Total principal</span>
          <span class="result-value">${{ formatMoney(results.totalPrincipal) }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">Total contributions</span>
          <span class="result-value">${{ formatMoney(results.totalContributions) }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">Total interest</span>
          <span class="result-value">${{ formatMoney(results.totalInterest) }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">Interest of initial investment</span>
          <span class="result-value">${{ formatMoney(results.interestInitial) }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">Interest of the contributions</span>
          <span class="result-value">${{ formatMoney(results.interestContributions) }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">Buying power of the end balance after inflation adjustment</span>
          <span class="result-value">${{ formatMoney(results.buyingPower) }}</span>
        </div>
      </div>

      <!-- Pie Chart -->
      <div class="chart-section">
        <h3>Pie Chart</h3>
        <div class="pie-chart-container">
          <svg viewBox="0 0 100 100" class="pie-chart">
            <!-- 计算饼图切片 -->
            <circle
              v-for="(slice, index) in pieSlices"
              :key="index"
              cx="50"
              cy="50"
              r="40"
              :stroke-dasharray="slice.dashArray"
              :stroke-dashoffset="slice.offset"
              :stroke="slice.color"
              stroke-width="20"
              fill="transparent"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div class="pie-legend">
            <div class="legend-item">
              <span class="color-box" style="background: #2563eb;"></span>
              <span>Initial investment Contributions ({{ formatPercent(results.initialPercent) }}%)</span>
            </div>
            <div class="legend-item">
              <span class="color-box" style="background: #16a34a;"></span>
              <span>Interest ({{ formatPercent(results.interestPercent) }}%)</span>
            </div>
            <div class="legend-item">
              <span class="color-box" style="background: #eab308;"></span>
              <span>{{ results.contributionsPercent }}%</span>
            </div>
            <div class="legend-item">
              <span class="color-box" style="background: #9333ea;"></span>
              <span>{{ results.interestInitialPercent }}%</span>
            </div>
            <div class="legend-item">
              <span class="color-box" style="background: #06b6d4;"></span>
              <span>{{ results.interestContributionsPercent }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Accumulation Schedule Tabs -->
    <div class="schedule-section" v-if="results.calculated">
      <h3>Accumulation Schedule</h3>

      <div class="schedule-tabs">
        <button
          class="tab-btn small"
          :class="{ active: scheduleView === 'annual' }"
          @click="scheduleView = 'annual'"
        >
          Annual Schedule
        </button>
        <button
          class="tab-btn small"
          :class="{ active: scheduleView === 'monthly' }"
          @click="scheduleView = 'monthly'"
        >
          Monthly Schedule
        </button>
      </div>

      <!-- Annual Schedule Table - 附件3样式 -->
      <div v-if="scheduleView === 'annual'" class="schedule-table-wrapper">
        <div class="schedule-table">
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Deposit</th>
                <th>Interest</th>
                <th>Ending balance</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in results.annualSchedule" :key="index">
                <td>{{ row.year }}</td>
                <td>${{ formatMoney(row.deposit) }}</td>
                <td>${{ formatMoney(row.interest) }}</td>
                <td>${{ formatMoney(row.endingBalance) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Monthly Schedule Table - 附件4样式，分年显示，每年12个月 -->
      <div v-if="scheduleView === 'monthly'" class="schedule-table-wrapper">
        <div v-for="year in uniqueYears" :key="year" class="monthly-year-section">
          <h4>Year {{ year }}</h4>
          <div class="schedule-table">
            <table>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Deposit</th>
                  <th>Interest</th>
                  <th>Ending balance</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in monthlyScheduleByYear(year)" :key="row.month">
                  <td>{{ row.month }}</td>
                  <td>${{ formatMoney(row.deposit) }}</td>
                  <td>${{ formatMoney(row.interest) }}</td>
                  <td>${{ formatMoney(row.endingBalance) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="year < maxYear" class="year-separator">End of year {{ year }}</div>
        </div>
      </div>
    </div>

    <!-- Related Tools -->
    <div class="related-tools">
      <span class="related-label">Related:</span>
      <a href="/investment">Investment Calculator</a> <span class="sep">|</span>
      <a href="#">Average Return Calculator</a> <span class="sep">|</span>
      <a href="#">ROI Calculator</a>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h2>Interest Information – FAQ</h2>

      <div class="faq-item">
        <h3>What is interest?</h3>
        <p>Interest is the compensation paid by the borrower to the lender for the use of money as a percent or an amount. The concept of interest is the backbone behind most financial instruments in the world.</p>
        <p>There are two distinct methods of accumulating interest, categorized into simple interest or compound interest.</p>
      </div>

      <div class="faq-item">
        <h3>Simple Interest</h3>
        <p>The following is a basic example of how interest works. Derek would like to borrow $100 (usually called the principal) from the bank for one year. The bank wants 10% interest on it. To calculate interest:</p>
        <p>$100 × 10% = $10</p>
        <p>This interest is added to the principal, and the sum becomes Derek's required repayment to the bank one year later.</p>
        <p>$100 + $10 = $110</p>
        <p>Derek owes the bank $110 a year later, $100 for the principal and $10 as interest.</p>
        <p>Let's assume that Derek wanted to borrow $100 for two years instead of one, and the bank calculates interest annually. He would simply be charged the interest rate twice, once at the end of each year.</p>
        <p>$100 + $10(year 1) + $10(year 2) = $120</p>
        <p>Derek owes the bank $120 two years later, $100 for the principal and $20 as interest.</p>
        <p>The formula to calculate simple interest is:</p>
        <p class="formula">interest = principal × interest rate × term</p>
        <p>When more complicated frequencies of applying interest are involved, such as monthly or daily, use the formula:</p>
        <p class="formula">interest = principal × interest rate × (term/frequency)</p>
        <p>However, simple interest is very seldom used in the real world. Even when people use the everyday word 'interest,' they are usually referring to interest that compounds.</p>
      </div>

      <div class="faq-item">
        <h3>Compound Interest</h3>
        <p>Compounding interest requires more than one period, so let's go back to the example of Derek borrowing $100 from the bank for two years at a 10% interest rate. For the first year, we calculate interest as usual.</p>
        <p>$100 × 10% = $10</p>
        <p>This interest is added to the principal, and the sum becomes Derek's required repayment to the bank for that present time.</p>
        <p>$100 + $10 = $110</p>
        <p>However, the year ends, and in comes another period. For compounding interest, rather than the original amount, the principal + any interest accumulated since is used. In Derek's case:</p>
        <p>$110 × 10% = $11</p>
        <p>Derek's interest charge at the end of year 2 is $11. This is added to what is owed after year 1:</p>
        <p>$110 + $11 = $121</p>
        <p>When the loan ends, the bank collects $121 from Derek instead of $120 if it were calculated using simple interest instead. This is because interest is also earned on interest.</p>
        <p>The more frequently interest is compounded within a time period, the higher the interest will be earned on an original principal. The following is a graph showing just that, a $1,000 investment at various compounding frequencies earning 20% interest.</p>
        
        <!-- 附件5风格的复合频率对比图 -->
        <div class="compound-chart">
          <h4>Compound Interest Comparison ($1,000 at 20%)</h4>
          <div class="chart-bars">
            <div class="chart-row" v-for="(item, index) in compoundComparison" :key="index">
              <span class="chart-label">{{ item.year }} years</span>
              <div class="bars-container">
                <div class="bar-group">
                  <div class="bar" :style="{ width: item.continuously + '%', background: '#2563eb' }"></div>
                  <span class="bar-value">${{ item.continuouslyValue }}</span>
                </div>
                <div class="bar-group">
                  <div class="bar" :style="{ width: item.monthly + '%', background: '#16a34a' }"></div>
                  <span class="bar-value">${{ item.monthlyValue }}</span>
                </div>
                <div class="bar-group">
                  <div class="bar" :style="{ width: item.quarterly + '%', background: '#eab308' }"></div>
                  <span class="bar-value">${{ item.quarterlyValue }}</span>
                </div>
                <div class="bar-group">
                  <div class="bar" :style="{ width: item.yearly + '%', background: '#9333ea' }"></div>
                  <span class="bar-value">${{ item.yearlyValue }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="chart-legend">
            <span class="legend-item"><span class="color-box" style="background: #2563eb;"></span> Continuously</span>
            <span class="legend-item"><span class="color-box" style="background: #16a34a;"></span> Monthly</span>
            <span class="legend-item"><span class="color-box" style="background: #eab308;"></span> Quarterly</span>
            <span class="legend-item"><span class="color-box" style="background: #9333ea;"></span> Yearly</span>
          </div>
          <p class="chart-note">There is little difference during the beginning between all frequencies, but over time they slowly start to diverge. This is the power of compound interest everyone likes to talk about, illustrated in a concise graph. The continuous compound will always have the highest return due to its use of the mathematical limit of the frequency of compounding that can occur within a specified time period.</p>
        </div>
      </div>

      <div class="faq-item">
        <h3>The Rule of 72</h3>
        <p>Anyone who wants to estimate compound interest in their head may find the rule of 72 very useful. Not for exact calculations as given by financial calculators, but to get ideas for ballpark figures. It states that in order to find the number of years (n) required to double a certain amount of money with any interest rate, simply divide 72 by that same rate.</p>
        <p>Example: How long would it take to double $1,000 with an 8% interest rate?</p>
        <p>n = 72 / 8 = 9</p>
        <p>It will take 9 years for the $1,000 to become $2,000 at 8% interest. This formula works best for interest rates between 6 and 10%, but it should also work reasonably well for anything below 20%.</p>
      </div>

      <div class="faq-item">
        <h3>Fixed vs. Floating Interest Rate</h3>
        <p>The interest rate of a loan or savings can be "fixed" or "floating." Floating rate loans or savings are normally based on some reference rate, such as the U.S. Federal Reserve (Fed) funds rate or the LIBOR (London Interbank Offered Rate). Normally, the loan rate is a little higher, and the savings rate is a little lower than the reference rate. The difference goes to the profit of the bank. Both the Fed rate and LIBOR are short-term inter-bank interest rates, but the Fed rate is the main tool that the Federal Reserve uses to influence the supply of money in the U.S. economy. LIBOR is a commercial rate calculated from prevailing interest rates between highly credit-worthy institutions. Our Interest Calculator deals with fixed interest rates only.</p>
      </div>

      <div class="faq-item">
        <h3>Contributions</h3>
        <p>Our Interest Calculator above allows periodic deposits/contributions. This is useful for those who have the habit of saving a certain amount periodically. An important distinction to make regarding contributions is whether they occur at the beginning or end of compounding periods. Periodic payments that occur at the end have one less interest period total per contribution.</p>
      </div>

      <div class="faq-item">
        <h3>Tax Rate</h3>
        <p>Some forms of interest income are subject to taxes, including bonds, savings, and certificate of deposits(CDs). In the U.S., corporate bonds are almost always taxed. Certain types are fully taxed while others are partially taxed; for example, while interest earned on U.S. federal treasury bonds may be taxed at the federal level, they are generally exempt at the state and local level. Taxes can have very big impacts on the end balance. For example, if Derek saves $100 at 6% for 20 years, he will get:</p>
        <p>$100 × (1 + 6%)<sup>20</sup> = $320.71</p>
        <p>This is tax-free. However, if Derek has a marginal tax rate of 25%, he will end up with $239.78 only because the tax rate of 25% applies to each compounding period.</p>
      </div>

      <div class="faq-item">
        <h3>Inflation Rate</h3>
        <p>Inflation is defined as a sustained increase in the prices of goods and services over time. As a result, a fixed amount of money will relatively afford less in the future. The average inflation rate in the U.S. in the past 100 years has hovered around 3%. As a tool of comparison, the average annual return rate of the S&P 500 (Standard & Poor's) index in the United States is around 10% in the same period. Please refer to our Inflation Calculator for more detailed information about inflation.</p>
        <p>For our Interest Calculator, leave the inflation rate at 0 for quick, generalized results. But for real and accurate numbers, it is possible to input figures in order to account for inflation.</p>
        <p>Tax and inflation combined make it hard to grow the real value of money. For example, in the United States, the middle class has a marginal tax rate of around 25%, and the average inflation rate is 3%. To maintain the value of the money, a stable interest rate or investment return rate of 4% or above needs to be earned, and this is not easy to achieve.</p>
      </div>
    </div>

     <!-- Calculator CTA -->
    <section class="section calculator-cta">
    <a href="/how-to-calculate-intereston-savings-blog" class="calculator-btn">
    How to Calculate Interest on Savings: Simple vs Compound Interest Explained →
    </a>
    </section>

  </div>
</template>

<script>
export default {
  name: 'InterestCalculator',
  data() {
    return {
      compoundOptions: [
        { value: 'annually', label: 'annually' },
        { value: 'semiannually', label: 'semiannually' },
        { value: 'quarterly', label: 'quarterly' },
        { value: 'monthly', label: 'monthly' },
        { value: 'semimonthly', label: 'semimonthly' },
        { value: 'biweekly', label: 'biweekly' },
        { value: 'weekly', label: 'weekly' },
        { value: 'daily', label: 'daily' },
        { value: 'continuously', label: 'continuously' }
      ],
      scheduleView: 'annual',
      form: {
        initialInvestment: 20000,
        annualContribution: 5000,
        monthlyContribution: 0,
        contributeTiming: 'beginning',
        interestRate: 5,
        compoundFrequency: 'annually',
        years: 5,
        months: 0,
        taxRate: 0,
        inflationRate: 3
      },
      results: {
        calculated: false,
        endingBalance: 0,
        totalPrincipal: 0,
        totalContributions: 0,
        totalInterest: 0,
        interestInitial: 0,
        interestContributions: 0,
        buyingPower: 0,
        initialPercent: 0,
        interestPercent: 0,
        contributionsPercent: 0,
        interestInitialPercent: 0,
        interestContributionsPercent: 0,
        annualSchedule: [],
        monthlySchedule: []
      },
      // 复合频率对比数据（附件5样式）
      compoundComparison: [
        { year: 1, continuously: 20, monthly: 19, quarterly: 18, yearly: 17, continuouslyValue: 1200, monthlyValue: 1190, quarterlyValue: 1180, yearlyValue: 1170 },
        { year: 2, continuously: 30, monthly: 28, quarterly: 26, yearly: 24, continuouslyValue: 1300, monthlyValue: 1280, quarterlyValue: 1260, yearlyValue: 1240 },
        { year: 3, continuously: 40, monthly: 37, quarterly: 34, yearly: 31, continuouslyValue: 1400, monthlyValue: 1370, quarterlyValue: 1340, yearlyValue: 1310 },
        { year: 4, continuously: 50, monthly: 46, quarterly: 42, yearly: 38, continuouslyValue: 1500, monthlyValue: 1460, quarterlyValue: 1420, yearlyValue: 1380 },
        { year: 5, continuously: 60, monthly: 55, quarterly: 50, yearly: 45, continuouslyValue: 1600, monthlyValue: 1550, quarterlyValue: 1500, yearlyValue: 1450 },
        { year: 6, continuously: 70, monthly: 64, quarterly: 58, yearly: 52, continuouslyValue: 1700, monthlyValue: 1640, quarterlyValue: 1580, yearlyValue: 1520 },
        { year: 7, continuously: 80, monthly: 73, quarterly: 66, yearly: 59, continuouslyValue: 1800, monthlyValue: 1730, quarterlyValue: 1660, yearlyValue: 1590 },
        { year: 8, continuously: 90, monthly: 82, quarterly: 74, yearly: 66, continuouslyValue: 1900, monthlyValue: 1820, quarterlyValue: 1740, yearlyValue: 1660 },
        { year: 9, continuously: 100, monthly: 91, quarterly: 82, yearly: 73, continuouslyValue: 2000, monthlyValue: 1910, quarterlyValue: 1820, yearlyValue: 1730 },
        { year: 10, continuously: 110, monthly: 100, quarterly: 90, yearly: 80, continuouslyValue: 2100, monthlyValue: 2000, quarterlyValue: 1900, yearlyValue: 1800 }
      ]
    };
  },
  computed: {
    // 获取总月数
    totalMonths() {
      return (this.form.years || 0) * 12 + (this.form.months || 0);
    },

    // 获取每年的期数
    periodsPerYear() {
      const freq = this.form.compoundFrequency;
      if (freq === 'annually') return 1;
      if (freq === 'semiannually') return 2;
      if (freq === 'quarterly') return 4;
      if (freq === 'monthly') return 12;
      if (freq === 'semimonthly') return 24;
      if (freq === 'biweekly') return 26;
      if (freq === 'weekly') return 52;
      if (freq === 'daily') return 365;
      if (freq === 'continuously') return Infinity;
      return 1;
    },

    // 获取等效月利率
    monthlyRate() {
      const annualRate = (this.form.interestRate || 0) / 100;
      const freq = this.form.compoundFrequency;
      
      if (freq === 'annually') {
        return Math.pow(1 + annualRate, 1/12) - 1;
      } else if (freq === 'semiannually') {
        const semiRate = annualRate / 2;
        return Math.pow(1 + semiRate, 1/6) - 1;
      } else if (freq === 'quarterly') {
        const quarterRate = annualRate / 4;
        return Math.pow(1 + quarterRate, 1/3) - 1;
      } else if (freq === 'monthly') {
        return annualRate / 12;
      } else if (freq === 'semimonthly') {
        const semiMonthlyRate = annualRate / 24;
        return Math.pow(1 + semiMonthlyRate, 2) - 1;
      } else if (freq === 'biweekly') {
        const biweeklyRate = annualRate / 26;
        return Math.pow(1 + biweeklyRate, 26/12) - 1;
      } else if (freq === 'weekly') {
        const weeklyRate = annualRate / 52;
        return Math.pow(1 + weeklyRate, 52/12) - 1;
      } else if (freq === 'daily') {
        const dailyRate = annualRate / 365;
        return Math.pow(1 + dailyRate, 365/12) - 1;
      } else if (freq === 'continuously') {
        return Math.exp(annualRate / 12) - 1;
      }
      return annualRate / 12;
    },

    // 饼图切片
    pieSlices() {
      const slices = [];
      const total = this.results.initialInvestment + this.results.totalContributions + this.results.totalInterest;
      if (total === 0) return slices;

      const circumference = 2 * Math.PI * 40; // r=40
      
      // 计算每个切片的角度（根据附件2的百分比顺序）
      // 附件2中显示：Blue: Initial investment Contributions (46%), Green: Interest (37%), Red: 17%, Purple: 0%, Light Blue: 0%
      // 这里我们简化处理，只显示两个主要部分
      const initialPercent = this.results.initialPercent / 100;
      const contribPercent = this.results.contributionsPercent / 100;
      const interestPercent = this.results.interestPercent / 100;
      
      // 初始投资切片
      const initialLength = circumference * initialPercent;
      slices.push({
        dashArray: `${initialLength} ${circumference - initialLength}`,
        offset: 0,
        color: '#2563eb'
      });
      
      // 贡献切片
      const contribLength = circumference * contribPercent;
      const contribOffset = -initialLength;
      slices.push({
        dashArray: `${contribLength} ${circumference - contribLength}`,
        offset: contribOffset,
        color: '#06b6d4'
      });
      
      // 利息切片
      const interestLength = circumference * interestPercent;
      const interestOffset = -(initialLength + contribLength);
      slices.push({
        dashArray: `${interestLength} ${circumference - interestLength}`,
        offset: interestOffset,
        color: '#16a34a'
      });
      
      return slices;
    },

    // 获取所有不重复的年份（用于月度表）
    uniqueYears() {
      return [...new Set(this.results.monthlySchedule.map(row => row.year))];
    },

    // 获取最大年份
    maxYear() {
      return Math.max(...this.uniqueYears);
    }
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
      desc.content = 'Use this free Interest Calculator to quickly estimate simple or compound interest on loans, savings, or investments. Enter the principal amount, interest rate, and time period to see how much interest you will earn or pay.'
      
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
    calculate() {
      const initial = this.form.initialInvestment || 0;
      const annualContrib = this.form.annualContribution || 0;
      const monthlyContrib = this.form.monthlyContribution || 0;
      const contributeAtBeginning = this.form.contributeTiming === 'beginning';
      const taxRate = (this.form.taxRate || 0) / 100;
      const inflationRate = (this.form.inflationRate || 0) / 100;
      const totalMonths = this.totalMonths;
      const monthlyRate = this.monthlyRate;
      
      if (totalMonths <= 0) {
        this.results.calculated = false;
        return;
      }

      let balance = initial;
      let totalContributions = 0;
      const monthlySchedule = [];
      const annualSchedule = [];

      // 按月循环
      for (let month = 1; month <= totalMonths; month++) {
        const year = Math.ceil(month / 12);
        const monthInYear = ((month - 1) % 12) + 1;
        
        // 计算当月贡献
        let monthDeposit = 0;
        
        // 年度贡献（只在每年第一个月）
        if (monthInYear === 1 && annualContrib > 0) {
          if (contributeAtBeginning) {
            balance += annualContrib;
            monthDeposit += annualContrib;
            totalContributions += annualContrib;
          }
        }
        
        // 月度贡献（每月）
        if (monthlyContrib > 0) {
          if (contributeAtBeginning) {
            balance += monthlyContrib;
            monthDeposit += monthlyContrib;
            totalContributions += monthlyContrib;
          }
        }
        
        // 计算当月利息（税前）
        const interest = balance * monthlyRate;
        balance += interest;
        
        // 期末贡献
        if (monthInYear === 1 && annualContrib > 0) {
          if (!contributeAtBeginning) {
            balance += annualContrib;
            monthDeposit += annualContrib;
            totalContributions += annualContrib;
          }
        }
        
        if (monthlyContrib > 0) {
          if (!contributeAtBeginning) {
            balance += monthlyContrib;
            monthDeposit += monthlyContrib;
            totalContributions += monthlyContrib;
          }
        }
        
        // 记录月度数据
        monthlySchedule.push({
          year: year,
          month: monthInYear,
          deposit: monthDeposit,
          interest: interest,
          endingBalance: balance
        });
        
        // 每年末记录年度数据
        if (monthInYear === 12 || month === totalMonths) {
          const yearData = monthlySchedule.filter(row => row.year === year);
          const yearDeposit = yearData.reduce((sum, row) => sum + row.deposit, 0);
          const yearInterest = yearData.reduce((sum, row) => sum + row.interest, 0);
          
          annualSchedule.push({
            year: year,
            deposit: yearDeposit,
            interest: yearInterest,
            endingBalance: balance
          });
        }
      }

      // 计算税后余额
      const totalInterest = balance - initial - totalContributions;
      const afterTaxBalance = balance - (totalInterest * taxRate);
      
      // 计算通胀调整后的购买力
      const inflationFactor = Math.pow(1 + inflationRate, totalMonths / 12);
      const buyingPower = afterTaxBalance / inflationFactor;
      
      // 计算利息分解
      // 模拟无贡献情况下的增长
      let balanceNoContrib = initial;
      for (let month = 1; month <= totalMonths; month++) {
        balanceNoContrib += balanceNoContrib * monthlyRate;
      }
      const interestInitial = balanceNoContrib - initial;
      const interestContributions = totalInterest - interestInitial;
      
      // 计算百分比
      const total = initial + totalContributions + totalInterest;
      const initialPercent = total > 0 ? (initial / total * 100) : 0;
      const contributionsPercent = total > 0 ? (totalContributions / total * 100) : 0;
      const interestPercent = total > 0 ? (totalInterest / total * 100) : 0;
      const interestInitialPercent = total > 0 ? (interestInitial / total * 100) : 0;
      const interestContributionsPercent = total > 0 ? (interestContributions / total * 100) : 0;

      this.results = {
        calculated: true,
        endingBalance: afterTaxBalance,
        totalPrincipal: initial + totalContributions,
        totalContributions: totalContributions,
        totalInterest: totalInterest,
        interestInitial: interestInitial,
        interestContributions: interestContributions,
        buyingPower: buyingPower,
        initialPercent: initialPercent,
        contributionsPercent: contributionsPercent,
        interestPercent: interestPercent,
        interestInitialPercent: interestInitialPercent,
        interestContributionsPercent: interestContributionsPercent,
        annualSchedule: annualSchedule,
        monthlySchedule: monthlySchedule,
        initialInvestment: initial
      };
    },

    // 按月筛选年度数据
    monthlyScheduleByYear(year) {
      return this.results.monthlySchedule.filter(row => row.year === year);
    },

    clearForm() {
      this.form = {
        initialInvestment: 20000,
        annualContribution: 5000,
        monthlyContribution: 0,
        contributeTiming: 'beginning',
        interestRate: 5,
        compoundFrequency: 'annually',
        years: 5,
        months: 0,
        taxRate: 0,
        inflationRate: 3
      };
      this.calculate();
    },

    formatMoney(value) {
      if (value === undefined || value === null || isNaN(value)) return '0.00';
      return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    formatPercent(value) {
      if (value === undefined || value === null || isNaN(value)) return '0.0';
      return value.toFixed(1);
    }
  },
  mounted() {
    document.title = 'Interest Calculator (Simple & Compound) – Calculate Loan or Savings Interest Online'
    // 2. 设置关键meta标签（Google最关注的）
    this.setGoogleMetaTags()
    this.calculate();
  },
  watch: {
    form: {
      handler: 'calculate',
      deep: true
    }
  }
};
</script>

<style scoped>
/* 移动端优先的样式设计 */
.interest-calculator {
  max-width: 1200px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 32px;
  box-shadow: 0 20px 40px -10px rgba(0, 34, 68, 0.15);
  padding: 28px 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #11212e;
}

@media (max-width: 480px) {
  .interest-calculator {
    padding: 20px 16px;
    border-radius: 24px;
  }
}

.main-title {
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #0b2b44;
  letter-spacing: -0.02em;
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2rem;
  }
}

.description {
  font-size: 1.05rem;
  line-height: 1.5;
  background: #ecf3fa;
  padding: 20px 24px;
  border-radius: 32px;
  margin-bottom: 28px;
  color: #1c3a5c;
  border: 1px solid #c7daf0;
}

@media (max-width: 480px) {
  .description {
    font-size: 0.95rem;
    padding: 16px;
  }
}

.calculator-form {
  background: #f2f6fb;
  border-radius: 28px;
  padding: 28px 24px;
  border: 1px solid #cdddee;
  margin-bottom: 32px;
}

.calculator-form h2 {
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 24px;
  color: #0b2b44;
}

@media (max-width: 480px) {
  .calculator-form h2 {
    font-size: 1.5rem;
  }
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

@media (min-width: 641px) {
  .form-row {
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }
}

.form-row label {
  font-weight: 500;
  color: #1a3349;
  font-size: 1rem;
  min-width: 140px;
}

@media (min-width: 641px) {
  .form-row label {
    width: 180px;
  }
}

.input-wrapper {
  flex: 1;
  width: 100%;
}

.input-with-symbol {
  display: flex;
  align-items: center;
  gap: 4px;
  background: white;
  border: 1px solid #b6c9dd;
  border-radius: 30px;
  padding: 0 12px;
  height: 44px;
  transition: border-color 0.2s;
}

.input-with-symbol:focus-within {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.currency-symbol,
.percent-symbol {
  font-weight: 500;
  color: #1a3349;
  font-size: 1rem;
  white-space: nowrap;
}

.input-with-symbol input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  padding: 8px 0;
  min-width: 0;
  width: 100%;
}

.input-with-symbol input:focus {
  outline: none;
}

/* Calculator CTA */
.calculator-cta {
  text-align: center;
  padding: 50px 20px;
  border-top: 1px solid #eee;
}

.calculator-btn {
  display: inline-block;
  margin-top: 20px;
  padding: 14px 28px;
  border-radius: 10px;
  background: #111;
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
}

.calculator-btn:hover {
  background: #333;
  transform: translateY(-1px);
}

/* 移除number输入框的上下箭头 */
.input-with-symbol input[type="number"]::-webkit-inner-spin-button,
.input-with-symbol input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-with-symbol input[type="number"] {
  -moz-appearance: textfield;
}

.frequency-select {
  padding: 12px 16px;
  border: 1px solid #b6c9dd;
  border-radius: 30px;
  font-size: 0.95rem;
  background: white;
  width: 100%;
  cursor: pointer;
}

.radio-row {
  align-items: flex-start;
  flex-wrap: wrap;
}

.radio-group {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  color: #1a3349;
}

.radio-label input[type="radio"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.of-text {
  margin: 0 8px;
  color: #1a3349;
}

@media (max-width: 480px) {
  .radio-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .of-text {
    margin: 4px 0;
  }
}

.loan-term-row {
  align-items: flex-start;
}

.term-inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
}

.term-year,
.term-month {
  flex: 1;
  min-width: 120px;
}

.term-year input,
.term-month input {
  width: 80px;
}

@media (min-width: 641px) {
  .term-year,
  .term-month {
    max-width: 160px;
  }
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
}

button {
  background: #1f3a5f;
  border: none;
  color: white;
  padding: 12px 28px;
  border-radius: 40px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.15s;
  border: 1px solid #1f3a5f;
  flex: 1;
  min-width: 120px;
}

button.clear {
  background: white;
  color: #1f3a5f;
}

button:hover {
  background: #143049;
}

button.clear:hover {
  background: #e4ecf5;
}

@media (max-width: 480px) {
  .form-actions {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}

/* Results Section */
.results-section {
  background: #f8fafd;
  border-radius: 28px;
  padding: 28px 24px;
  border: 1px solid #dde7f0;
  margin-bottom: 32px;
}

.results-section h2 {
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 24px;
  color: #0b2b44;
}

.ending-balance-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid #d9e2ef;
  text-align: center;
  border-left: 6px solid #2563eb;
}

.ending-balance-label {
  color: #4b5f73;
  font-size: 1rem;
  margin-bottom: 8px;
}

.ending-balance-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1f3a5f;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}

.result-item {
  background: white;
  border-radius: 16px;
  padding: 16px;
  border: 1px solid #d9e2ef;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-label {
  color: #4b5f73;
  font-size: 0.9rem;
}

.result-value {
  font-weight: 600;
  color: #0b2b44;
  font-size: 1.2rem;
}

/* Chart Section */
.chart-section {
  background: white;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #d9e2ef;
}

.chart-section h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #1e3a5f;
}

.pie-chart-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 32px;
}

.pie-chart {
  width: 160px;
  height: 160px;
}

@media (min-width: 641px) {
  .pie-chart {
    width: 200px;
    height: 200px;
  }
}

.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #2c405c;
}

.color-box {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

/* Schedule Section */
.schedule-section {
  background: white;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #d9e2ef;
  margin-bottom: 32px;
}

.schedule-section h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #1e3a5f;
}

.schedule-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  border-bottom: 2px solid #d4e2f0;
  padding-bottom: 12px;
}

.tab-btn.small {
  min-width: auto;
  flex: 0 1 auto;
}

.schedule-table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.schedule-table {
  min-width: 500px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
}

.schedule-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.schedule-table th {
  background: #e1eaf3;
  padding: 12px 8px;
  text-align: left;
  font-weight: 600;
  color: #1a3349;
  white-space: nowrap;
}

.schedule-table td {
  padding: 10px 8px;
  border-bottom: 1px solid #e9eef3;
  color: #2c405c;
  white-space: nowrap;
}

.schedule-table tr:last-child td {
  border-bottom: none;
}

.monthly-year-section {
  margin-bottom: 24px;
}

.monthly-year-section h4 {
  margin: 0 0 8px 0;
  color: #0f3b5e;
  font-size: 1.1rem;
}

.year-separator {
  text-align: center;
  padding: 12px;
  font-weight: 600;
  color: #4b5f73;
  background: #f0f4fa;
  border-top: 1px dashed #9aa9b9;
  border-bottom: 1px dashed #9aa9b9;
  margin: 16px 0;
}

/* Compound Chart - 附件5样式 */
.compound-chart {
  margin-top: 24px;
  padding: 16px;
  background: #f9fcff;
  border-radius: 16px;
  border: 1px solid #cbd9ec;
}

.compound-chart h4 {
  margin: 0 0 16px 0;
  color: #1e3a5f;
  font-size: 1.1rem;
}

.chart-bars {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chart-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.chart-label {
  min-width: 60px;
  font-weight: 500;
  color: #1a3349;
}

.bars-container {
  flex: 1;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.bar-group {
  flex: 1;
  min-width: 80px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.bar {
  height: 20px;
  border-radius: 4px;
  transition: width 0.3s;
}

.bar-value {
  font-size: 0.8rem;
  color: #4b5f73;
}

@media (max-width: 700px) {
  .chart-row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .bars-container {
    width: 100%;
  }
}

/* Related Tools */
.related-tools {
  margin: 32px 0 28px;
  padding: 18px 0;
  border-top: 2px solid #dde3ea;
  border-bottom: 2px solid #dde3ea;
  font-size: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.related-label {
  font-weight: 600;
  color: #0f2a40;
}

.related-tools a {
  color: #1f4a7a;
  text-decoration: none;
  margin: 0 4px;
}

.related-tools a:hover {
  text-decoration: underline;
}

.sep {
  color: #9aa9b9;
}

@media (max-width: 480px) {
  .related-tools {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .sep {
    display: none;
  }
}

/* FAQ Section */
.faq-section {
  margin-top: 28px;
  background: #f3f7fc;
  border-radius: 30px;
  padding: 28px 24px;
}

.faq-section h2 {
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 24px;
  color: #0b2b44;
}

@media (max-width: 480px) {
  .faq-section h2 {
    font-size: 1.5rem;
  }
}

.faq-item {
  background: white;
  border-radius: 24px;
  padding: 20px 24px;
  margin-bottom: 20px;
  border: 1px solid #c9d9ec;
}

.faq-item h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 12px;
  color: #1e3a5f;
}

.faq-item p {
  margin: 12px 0;
  line-height: 1.6;
  color: #253c54;
  font-size: 0.95rem;
}

.faq-item .formula {
  font-family: 'Courier New', monospace;
  background: #ecf3fa;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 500;
}

.faq-item ul {
  margin: 12px 0;
  padding-left: 24px;
}

.faq-item li {
  margin-bottom: 6px;
  line-height: 1.5;
  color: #2c405c;
  font-size: 0.95rem;
}

@media (max-width: 700px) {
  .faq-item {
    padding: 16px;
  }

  .faq-item h3 {
    font-size: 1.1rem;
  }

  .faq-item p,
  .faq-item li {
    font-size: 0.9rem;
  }
}
</style>