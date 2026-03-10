<template>
  <div class="amortization-calculator">
    <!-- Header -->
    <h1 class="main-title">Amortization Calculator</h1>
    <p class="description">
      The Amortization Calculator helps you understand how your loan payments are applied over time. By entering the loan amount, interest rate, and loan term, you can generate a detailed amortization schedule that shows how each payment is divided between principal and interest. The calculator also allows you to explore the impact of additional payments, helping you see how paying extra can reduce your loan balance faster and lower the total interest paid over the life of the loan.
    </p>

    <!-- Calculator Form - 附件1样式 -->
    <div class="calculator-form">
      <h2>Amortization Calculator</h2>

      <!-- Loan Amount -->
      <div class="form-row">
        <label>Loan amount</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input
              type="number"
              v-model.number="form.loanAmount"
              @input="calculate"
              min="0"
              step="1000"
              placeholder="200,000"
            />
          </div>
        </div>
      </div>

      <!-- Loan Term - Years and Months -->
      <div class="form-row loan-term-row">
        <label>Loan term</label>
        <div class="term-inputs">
          <div class="input-with-symbol term-year">
            <input
              type="number"
              v-model.number="form.years"
              @input="calculate"
              min="0"
              max="50"
              step="1"
              placeholder="15"
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

      <!-- Interest Rate -->
      <div class="form-row">
        <label>Interest rate</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <input
              type="number"
              step="0.125"
              v-model.number="form.interestRate"
              @input="calculate"
              min="0"
              max="30"
              placeholder="6"
            />
            <span class="percent-symbol">%</span>
          </div>
        </div>
      </div>

      <!-- Optional Extra Payments -->
      <div class="form-row checkbox-row">
        <label class="checkbox-label">
          <input
            type="checkbox"
            v-model="form.includeExtraPayments"
            @change="calculate"
          />
          <span>Optional: make extra payments</span>
        </label>
      </div>

      <!-- Extra Payment Amount (shown when checkbox is checked) -->
      <div class="form-row" v-if="form.includeExtraPayments">
        <label>Extra payment amount</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input
              type="number"
              v-model.number="form.extraPayment"
              @input="calculate"
              min="0"
              step="50"
              placeholder="100"
            />
          </div>
        </div>
        <span class="field-hint">Additional monthly payment toward principal</span>
      </div>

      <div class="form-actions">
        <button @click="calculate">Calculate</button>
        <button class="clear" @click="clearForm">Clear</button>
      </div>
    </div>

    <!-- Results Section - 附件2样式 -->
    <div class="results-section" v-if="results.calculated">
      <h2>Results</h2>

      <!-- Summary Cards - 附件2风格 -->
      <div class="summary-cards">
        <div class="summary-card main-card">
          <div class="card-row">
            <span class="card-label">Principal & Interest</span>
            <span class="card-value highlight">${{ formatMoney(results.monthlyPayment) }}</span>
          </div>
        </div>

        <div class="summary-card-grid">
          <div class="summary-card mini">
            <div class="card-row">
              <span class="card-label">Total of {{ results.totalPayments }} monthly payments</span>
              <span class="card-value">${{ formatMoney(results.totalPaymentsAmount) }}</span>
            </div>
          </div>
          <div class="summary-card mini">
            <div class="card-row">
              <span class="card-label">Total interest</span>
              <span class="card-value">${{ formatMoney(results.totalInterest) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Amortization Schedule Tabs - 附件3样式 -->
      <div class="amortization-section">
        <h3>Amortization schedule</h3>

        <div class="schedule-tabs">
          <button
            class="tab-btn"
            :class="{ active: scheduleView === 'annual' }"
            @click="scheduleView = 'annual'"
          >
            Annual Schedule
          </button>
          <button
            class="tab-btn"
            :class="{ active: scheduleView === 'monthly' }"
            @click="scheduleView = 'monthly'"
          >
            Monthly Schedule
          </button>
        </div>

        <!-- Annual Schedule Table -->
        <div v-if="scheduleView === 'annual'" class="schedule-table-wrapper">
          <div class="schedule-table">
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Interest</th>
                  <th>Principal</th>
                  <th>Ending Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in results.annualSchedule" :key="index">
                  <td>{{ row.year }}</td>
                  <td>${{ formatMoney(row.interest) }}</td>
                  <td>${{ formatMoney(row.principal) }}</td>
                  <td>${{ formatMoney(row.endingBalance) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Monthly Schedule Table - 移动端优化，默认显示前24个月 -->
        <div v-if="scheduleView === 'monthly'" class="schedule-table-wrapper">
          <div class="schedule-table">
            <table>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Interest</th>
                  <th>Principal</th>
                  <th>Ending Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in displayedMonthlySchedule" :key="index">
                  <td>{{ row.month }}</td>
                  <td>${{ formatMoney(row.interest) }}</td>
                  <td>${{ formatMoney(row.principal) }}</td>
                  <td>${{ formatMoney(row.endingBalance) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="results.monthlySchedule.length > 24" class="show-more">
            <button @click="showAllMonthly = !showAllMonthly" class="show-more-btn">
              {{ showAllMonthly ? 'Show Less' : 'Show All ' + results.monthlySchedule.length + ' Months' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Tools -->
    <div class="related-tools">
      <span class="related-label">Related:</span>
      <a href="#">Mortgage Payoff Calculator</a> <span class="sep">|</span>
      <a href="#">Mortgage Payoff Calculator</a>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h2>Amortization Information – FAQ</h2>

      <div class="faq-item">
        <h3>What is Amortization?</h3>
        <p>There are two general definitions of amortization. The first is the systematic repayment of a loan over time. The second is used in the context of business accounting and is the act of spreading the cost of an expensive and long-lived item over many periods. The two are explained in more detail in the sections below.</p>
      </div>

      <div class="faq-item">
        <h3>Paying Off a Loan Over Time</h3>
        <p>When a borrower takes out a mortgage, car loan, or personal loan, they usually make monthly payments to the lender; these are some of the most common uses of amortization. A part of the payment covers the interest due on the loan, and the remainder of the payment goes toward reducing the principal amount owed. Interest is computed on the current amount owed and thus will become progressively smaller as the principal decreases. It is possible to see this in action on the amortization table.</p>
        <p>Credit cards, on the other hand, are generally not amortized. They are an example of revolving debt, where the outstanding balance can be carried month-to-month, and the amount repaid each month can be varied. Please use our Credit Card Calculator for more information or to do calculations involving credit cards, or our Credit Cards Payoff Calculator to schedule a financially feasible way to pay off multiple credit cards. Examples of other loans that aren't amortized include interest-only loans and balloon loans. The former includes an interest-only period of payment, and the latter has a large principal payment at loan maturity.</p>
      </div>

      <div class="faq-item">
        <h3>What is an Amortization Schedule?</h3>
        <p>An amortization schedule (sometimes called an amortization table) is a table detailing each periodic payment on an amortizing loan. Each calculation done by the calculator will also come with an annual and monthly amortization schedule above. Each repayment for an amortized loan will contain both an interest payment and payment towards the principal balance, which varies for each pay period. An amortization schedule helps indicate the specific amount that will be paid towards each, along with the interest and principal paid to date, and the remaining principal balance after each pay period.</p>
        <p>Basic amortization schedules do not account for extra payments, but this doesn't mean that borrowers can't pay extra towards their loans. Also, amortization schedules generally do not consider fees. Generally, amortization schedules only work for fixed-rate loans and not adjustable-rate mortgages, variable rate loans, or lines of credit.</p>
      </div>

      <div class="faq-item">
        <h3>Spreading Costs in Business Accounting</h3>
        <p>Certain businesses sometimes purchase expensive items that are used for long periods of time that are classified as investments. Items that are commonly amortized for the purpose of spreading costs include machinery, buildings, and equipment. From an accounting perspective, a sudden purchase of an expensive factory during a quarterly period can skew the financials, so its value is amortized over the expected life of the factory instead. Although it can technically be considered amortizing, this is usually referred to as the depreciation expense of an asset amortized over its expected lifetime. For more information about or to do calculations involving depreciation, please visit the Depreciation Calculator.</p>
      </div>

      <div class="faq-item">
        <h3>Amortization of Intangible Assets</h3>
        <p>Amortization as a way of spreading business costs in accounting generally refers to intangible assets like a patent or copyright. Under Section 197 of U.S. law, the value of these assets can be deducted month-to-month or year-to-year. Just like with any other amortization, payment schedules can be forecasted by a calculated amortization schedule. The following are intangible assets that are often amortized:</p>
        <ol>
          <li>Goodwill, which is the reputation of a business regarded as a quantifiable asset</li>
          <li>Going-concern value, which is the value of a business as an ongoing entity</li>
          <li>The workforce in place (current employees, including their experience, education, and training)</li>
          <li>Business books and records, operating systems, or any other information base, including lists or other information concerning current or prospective customers</li>
          <li>Patents, copyrights, formulas, processes, designs, patterns, know-hows, formats, or similar items</li>
          <li>Customer-based intangibles, including customer bases and relationships with customers</li>
          <li>Supplier-based intangibles, including the value of future purchases due to existing relationships with vendors</li>
          <li>Licenses, permits, or other rights granted by governmental units or agencies (including issuances and renewals)</li>
          <li>Covenants not to compete or non-compete agreements entered relating to acquisitions of interests in trades or businesses</li>
          <li>Franchises, trademarks, or trade names</li>
          <li>Contracts for the use of or term interests in any items on this list</li>
        </ol>
        <p>Some intangible assets, with goodwill being the most common example, that have indefinite useful lives or are "self-created" may not be legally amortized for tax purposes.</p>
        <p>According to the IRS under Section 197, some assets are not considered intangibles, including interest in businesses, contracts, land, most computer software, intangible assets not acquired in connection with the acquiring of a business or trade, interest in an existing lease or sublease of a tangible property or existing debt, rights to service residential mortgages (unless it was acquired in connection with the acquisition of a trade or business), or certain transaction costs incurred by parties in which any part of a gain or loss is not recognized.</p>
      </div>

      <div class="faq-item">
        <h3>Amortizing Startup Costs</h3>
        <p>In the U.S., business startup costs, defined as costs incurred to investigate the potential of creating or acquiring an active business and costs to create an active business, can only be amortized under certain conditions. They must be expenses that are deducted as business expenses if incurred by an existing active business and must be incurred before the active business begins. Examples of these costs include consulting fees, financial analysis of potential acquisitions, advertising expenditures, and payments to employees, all of which must be incurred before the business is deemed active. According to IRS guidelines, initial startup costs must be amortized.</p>
      </div>
    </div>

     <!-- Calculator CTA -->
    <section class="section calculator-cta">
    <a href="/what-is-an-amortization-schedule-blog" class="calculator-btn">
    More What Is an Amortization Schedule blog →
    </a>
    </section>
    
  </div>
</template>

<script>
export default {
  name: 'AmortizationCalculator',
  data() {
    return {
      scheduleView: 'annual',
      showAllMonthly: false,
      form: {
        loanAmount: 200000,
        years: 15,
        months: 0,
        interestRate: 6,
        includeExtraPayments: false,
        extraPayment: 0
      },
      results: {
        calculated: false,
        monthlyPayment: 0,
        totalPayments: 0,
        totalPaymentsAmount: 0,
        totalInterest: 0,
        annualSchedule: [],
        monthlySchedule: []
      }
    };
  },
  computed: {
    // 总月份数
    totalMonths() {
      return (this.form.years || 0) * 12 + (this.form.months || 0);
    },

    // 显示的月度计划（移动端优化）
    displayedMonthlySchedule() {
      if (this.showAllMonthly) {
        return this.results.monthlySchedule;
      }
      // 默认只显示前24个月，避免移动端性能问题
      return this.results.monthlySchedule.slice(0, 24);
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
      desc.content = 'Use our Amortization Calculator to generate a detailed loan payment schedule. See how each payment is split between principal and interest and learn how extra payments can shorten your loan term and reduce total interest.'
      
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
      const loanAmount = this.form.loanAmount || 0;
      const annualRate = (this.form.interestRate || 0) / 100;
      const totalMonths = this.totalMonths;
      const extraPayment = this.form.includeExtraPayments ? (this.form.extraPayment || 0) : 0;

      if (loanAmount <= 0 || totalMonths <= 0) {
        this.results.calculated = false;
        return;
      }

      // 月利率
      const monthlyRate = annualRate / 12;

      // 计算标准月供
      let monthlyPayment = 0;
      if (monthlyRate === 0) {
        monthlyPayment = loanAmount / totalMonths;
      } else {
        const factor = Math.pow(1 + monthlyRate, totalMonths);
        monthlyPayment = loanAmount * monthlyRate * factor / (factor - 1);
      }

      // 加上额外付款
      const effectivePayment = monthlyPayment + extraPayment;

      // 生成月度计划
      const monthlySchedule = [];
      let balance = loanAmount;
      let totalInterest = 0;
      let month = 1;

      while (balance > 0.01 && month <= totalMonths * 2) { // 防止无限循环
        const interest = balance * monthlyRate;
        let principal = effectivePayment - interest;

        // 确保最后一期不会超额
        if (principal > balance) {
          principal = balance;
        }

        balance -= principal;
        totalInterest += interest;

        monthlySchedule.push({
          month: month,
          interest: interest,
          principal: principal,
          endingBalance: Math.max(0, balance)
        });

        if (balance <= 0.01) break;
        month++;
      }

      // 计算实际总付款和总期数
      const actualTotalPayments = monthlySchedule.length;
      const actualTotalPaid = monthlySchedule.reduce((sum, row) => sum + row.interest + row.principal, 0);
      const actualTotalInterest = monthlySchedule.reduce((sum, row) => sum + row.interest, 0);

      // 生成年度计划
      const annualSchedule = [];
      for (let year = 1; year <= Math.ceil(actualTotalPayments / 12); year++) {
        const yearRows = monthlySchedule.filter(row => 
          row.month > (year - 1) * 12 && row.month <= year * 12
        );

        if (yearRows.length === 0) continue;

        const yearInterest = yearRows.reduce((sum, row) => sum + row.interest, 0);
        const yearPrincipal = yearRows.reduce((sum, row) => sum + row.principal, 0);
        const endingBalance = yearRows[yearRows.length - 1].endingBalance;

        annualSchedule.push({
          year: year,
          interest: yearInterest,
          principal: yearPrincipal,
          endingBalance: endingBalance
        });
      }

      this.results = {
        calculated: true,
        monthlyPayment: monthlyPayment,
        totalPayments: actualTotalPayments,
        totalPaymentsAmount: actualTotalPaid,
        totalInterest: actualTotalInterest,
        annualSchedule: annualSchedule,
        monthlySchedule: monthlySchedule
      };
    },

    clearForm() {
      this.form = {
        loanAmount: 200000,
        years: 15,
        months: 0,
        interestRate: 6,
        includeExtraPayments: false,
        extraPayment: 0
      };
      this.showAllMonthly = false;
      this.calculate();
    },

    formatMoney(value) {
      if (value === undefined || value === null || isNaN(value)) return '0.00';
      return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
  mounted() {
document.title = 'Amortization Calculator – Loan Payment Schedule & Interest Breakdown'
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
.amortization-calculator {
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
  .amortization-calculator {
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
    width: 160px;
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

/* 移除number输入框的上下箭头 */
.input-with-symbol input[type="number"]::-webkit-inner-spin-button,
.input-with-symbol input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-with-symbol input[type="number"] {
  -moz-appearance: textfield;
}

/* Loan term 特殊样式 */
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

.checkbox-row {
  margin-top: 4px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 500;
  color: #1a3349;
  font-size: 0.95rem;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.field-hint {
  font-size: 0.85rem;
  color: #64748b;
  font-style: italic;
  margin-top: 4px;
}

@media (min-width: 641px) {
  .field-hint {
    margin-top: 0;
    margin-left: 8px;
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
  padding: 24px;
  border: 1px solid #dde7f0;
  margin-bottom: 32px;
}

.results-section h2 {
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 20px;
  color: #0b2b44;
}

@media (max-width: 480px) {
  .results-section h2 {
    font-size: 1.5rem;
  }
}

.summary-cards {
  margin-bottom: 28px;
}

.summary-card.main-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid #d9e2ef;
  margin-bottom: 16px;
}

.summary-card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 480px) {
  .summary-card-grid {
    grid-template-columns: 1fr;
  }
}

.summary-card.mini {
  background: white;
  border-radius: 16px;
  padding: 16px;
  border: 1px solid #d9e2ef;
}

.card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.card-label {
  color: #4b5f73;
  font-size: 0.95rem;
}

.card-value {
  font-weight: 600;
  color: #0b2b44;
  font-size: 1.1rem;
}

.card-value.highlight {
  color: #1f3a5f;
  font-size: 1.3rem;
}

.amortization-section {
  background: white;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid #d9e2ef;
}

.amortization-section h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #1e3a5f;
}

.schedule-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  border-bottom: 2px solid #d4e2f0;
  padding-bottom: 12px;
}

.tab-btn {
  background: none;
  border: none;
  padding: 8px 20px;
  font-size: 1rem;
  font-weight: 500;
  color: #4b5f73;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.2s;
  flex: 1;
  max-width: 180px;
}

.tab-btn.active {
  background: #1f3a5f;
  color: white;
}

.schedule-table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 0 -4px;
  padding: 0 4px;
}

.schedule-table {
  min-width: 500px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
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

.show-more {
  margin-top: 16px;
  text-align: center;
}

.show-more-btn {
  background: white;
  border: 1px solid #1f3a5f;
  color: #1f3a5f;
  padding: 8px 16px;
  font-size: 0.9rem;
  border-radius: 30px;
  cursor: pointer;
  width: auto;
  display: inline-block;
}

.show-more-btn:hover {
  background: #f0f5fa;
}

.related-tools {
  margin: 32px 0 28px;
  padding: 18px 0;
  border-top: 2px solid #dde3ea;
  border-bottom: 2px solid #dde3ea;
  font-size: 1.1rem;
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

.faq-item ol {
  margin: 12px 0;
  padding-left: 24px;
}

.faq-item li {
  margin-bottom: 6px;
  line-height: 1.5;
  color: #2c405c;
  font-size: 0.95rem;
}

@media (max-width: 480px) {
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
