<template>
  <div class="mortgage-payoff-calculator">
    <!-- Header -->
    <h1 class="main-title">Mortgage Payoff Calculator</h1>
    <p class="description">
      The Mortgage Payoff Calculator helps you estimate how quickly you can pay off your mortgage and how much interest you can save by making extra payments. Enter your loan balance, interest rate, monthly payment, and additional payment amount to calculate your new payoff date.This tool is ideal for homeowners looking to pay off their mortgage early, reduce total interest costs, and explore different repayment strategies. Compare scenarios with and without extra payments to see how small changes can significantly impact your long-term savings.
    </p>

    <!-- Calculator Form - 附件1样式 -->
    <div class="calculator-form">
      <h2>Mortgage Payoff Calculator</h2>

      <!-- Original Loan Amount -->
      <div class="form-row">
        <label>Original loan amount</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input
              type="number"
              v-model.number="form.originalLoanAmount"
              @input="calculate"
              min="0"
              step="1000"
              placeholder="400000"
            />
          </div>
        </div>
      </div>

      <!-- Original Loan Term -->
      <div class="form-row">
        <label>Original loan term</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <input
              type="number"
              v-model.number="form.originalLoanTerm"
              @input="calculate"
              min="1"
              max="50"
              step="1"
              placeholder="30"
            />
            <span>years</span>
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

      <!-- Remaining Term -->
      <div class="form-row loan-term-row">
        <label>Remaining term</label>
        <div class="term-inputs">
          <div class="input-with-symbol term-year">
            <input
              type="number"
              v-model.number="form.remainingYears"
              @input="calculate"
              min="0"
              max="50"
              step="1"
              placeholder="20"
            />
            <span>years</span>
          </div>
          <div class="input-with-symbol term-month">
            <input
              type="number"
              v-model.number="form.remainingMonths"
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

      <!-- Repayment Options -->
      <div class="form-row radio-row">
        <label>Repayment options:</label>
        <div class="radio-group vertical">
          <label class="radio-label">
            <input
              type="radio"
              value="payback"
              v-model="form.repaymentOption"
              @change="calculate"
            />
            <span>Payback altogether</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              value="extra"
              v-model="form.repaymentOption"
              @change="calculate"
            />
            <span>Repayment with extra payments</span>
          </label>
        </div>
      </div>

      <!-- Extra Payment Details (shown when extra payments selected) -->
      <div v-if="form.repaymentOption === 'extra'" class="extra-payments-section">
        <div class="form-row">
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input
              type="number"
              v-model.number="form.extraPerMonth"
              @input="calculate"
              min="0"
              step="50"
              placeholder="500"
            />
          </div>
          <span>per month</span>
        </div>
        <div class="form-row">
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input
              type="number"
              v-model.number="form.extraPerYear"
              @input="calculate"
              min="0"
              step="100"
              placeholder="0"
            />
          </div>
          <span>per year</span>
        </div>
        <div class="form-row">
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input
              type="number"
              v-model.number="form.extraOneTime"
              @input="calculate"
              min="0"
              step="100"
              placeholder="0"
            />
          </div>
          <span>one time</span>
        </div>
      </div>

      <!-- Additional Repayment Options -->
      <div class="form-row radio-row">
        <label></label>
        <div class="radio-group vertical">
          <label class="radio-label">
            <input
              type="checkbox"
              v-model="form.biweeklyRepayment"
              @change="calculate"
            />
            <span>Biweekly repayment</span>
          </label>
          <label class="radio-label">
            <input
              type="checkbox"
              v-model="form.normalRepayment"
              @change="calculate"
            />
            <span>Normal repayment</span>
          </label>
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

      <!-- Payoff Summary -->
      <div class="payoff-summary">
        <h3>Payoff in {{ results.payoffYears }} years and {{ results.payoffMonths }} months</h3>
        <p class="summary-text">
          The remaining balance is <strong>${{ formatMoney(results.remainingBalance) }}</strong>. 
          By paying extra <strong>${{ formatMoney(results.totalExtraPerMonth) }} per month</strong> starting now, 
          the loan will be paid off in <strong>{{ results.payoffYears }} years and {{ results.payoffMonths }} months</strong>. 
          It is <strong>{{ results.timeSavingsYears }} years and {{ results.timeSavingsMonths }} months earlier</strong>. 
          This results in savings of <strong>${{ formatMoney(results.interestSavings) }}</strong> in interest.
        </p>
      </div>

      <!-- Savings Cards -->
      <div class="savings-cards">
        <div class="savings-card interest">
          <h4>Interest savings</h4>
          <div class="savings-value">${{ formatMoney(results.interestSavings) }}</div>
          <div class="savings-detail">
            <div>Original: ${{ formatMoney(results.originalTotalInterest) }}</div>
            <div>With payoff: ${{ formatMoney(results.newTotalInterest) }}</div>
            <div>Pay {{ results.interestSavingsPercent.toFixed(0) }}% less on interest</div>
          </div>
        </div>
        <div class="savings-card time">
          <h4>Time savings</h4>
          <div class="savings-value">{{ results.timeSavingsYears }} years and {{ results.timeSavingsMonths }} months</div>
          <div class="savings-detail">
            <div>Original: {{ results.originalRemainingYears }} yrs, {{ results.originalRemainingMonths }} mos</div>
            <div>With payoff: {{ results.payoffYears }} yrs, {{ results.payoffMonths }} mos</div>
            <div>Payoff {{ results.timeSavingsPercent.toFixed(0) }}% faster</div>
          </div>
        </div>
      </div>

      <!-- Comparison Table -->
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Original</th>
              <th>With payoff</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Monthly pay</td>
              <td>${{ formatMoney(results.originalMonthlyPayment) }}</td>
              <td>${{ formatMoney(results.newMonthlyPayment) }}</td>
            </tr>
            <tr>
              <td>Total payments</td>
              <td>${{ formatMoney(results.originalTotalPayments) }}</td>
              <td>${{ formatMoney(results.newTotalPayments) }}</td>
            </tr>
            <tr>
              <td>Total interest</td>
              <td>${{ formatMoney(results.originalTotalInterest) }}</td>
              <td>${{ formatMoney(results.newTotalInterest) }}</td>
            </tr>
            <tr>
              <td>Remaining payments</td>
              <td>${{ formatMoney(results.originalRemainingPayments) }}</td>
              <td>${{ formatMoney(results.newRemainingPayments) }}</td>
            </tr>
            <tr>
              <td>Remaining interest</td>
              <td>${{ formatMoney(results.originalRemainingInterest) }}</td>
              <td>${{ formatMoney(results.newRemainingInterest) }}</td>
            </tr>
            <tr>
              <td>Payoff in</td>
              <td>{{ results.originalRemainingYears }} yrs, {{ results.originalRemainingMonths }} mos</td>
              <td>{{ results.payoffYears }} yrs, {{ results.payoffMonths }} mos</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Monthly Amortization Schedule - 附件3样式 -->
    <div class="schedule-section" v-if="results.calculated">
      <h3>Monthly Amortization Schedule</h3>
      
      <div class="schedule-table-wrapper">
        <div class="schedule-table">
          <table>
            <thead>
              <tr>
                <th rowspan="2"></th>
                <th colspan="3">Original (without payoff)</th>
                <th colspan="3">With payoff</th>
              </tr>
              <tr>
                <th>Interest</th>
                <th>Principal</th>
                <th>End balance</th>
                <th>Interest</th>
                <th>Principal</th>
                <th>End balance</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(month, index) in displayedMonthlySchedule" :key="index">
                <tr>
                  <td>{{ month.month }}</td>
                  <td>${{ formatMoney(month.originalInterest) }}</td>
                  <td>${{ formatMoney(month.originalPrincipal) }}</td>
                  <td>${{ formatMoney(month.originalBalance) }}</td>
                  <td>${{ formatMoney(month.newInterest) }}</td>
                  <td>${{ formatMoney(month.newPrincipal) }}</td>
                  <td>${{ formatMoney(month.newBalance) }}</td>
                </tr>
                <tr v-if="month.isYearEnd" class="year-end-row">
                  <td colspan="7" class="year-end-label">Year #{{ month.year }} end</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div v-if="results.monthlySchedule.length > 24" class="show-more">
          <button @click="showAllMonthly = !showAllMonthly" class="show-more-btn">
            {{ showAllMonthly ? 'Show Less' : 'Show All ' + results.monthlySchedule.length + ' Months' }}
          </button>
        </div>
      </div>

      <!-- Comparison Chart - 附件4样式 -->
      <div class="chart-section">
        <h4>Loan Balance & Interest Comparison</h4>
        <div class="chart-container">
          <canvas ref="comparisonChart" id="comparisonChart"></canvas>
        </div>
        <div class="chart-legend">
          <span class="legend-item"><span class="color-box" style="background: #2563eb;"></span> Old Balance</span>
          <span class="legend-item"><span class="color-box" style="background: #16a34a;"></span> Old Interest</span>
          <span class="legend-item"><span class="color-box" style="background: #eab308;"></span> New Balance</span>
          <span class="legend-item"><span class="color-box" style="background: #9333ea;"></span> New Interest</span>
        </div>
      </div>
    </div>

    <!-- Related Tools -->
    <div class="related-tools">
      <span class="related-label">Related:</span>
      <a href="/mortgage">Mortgage Calculator</a>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h2>Mortgage Payoff Information – FAQ</h2>

      <div class="faq-item">
        <h3>What is the Mortgage Payoff Calculator?</h3>
        <p>The Mortgage Payoff Calculator above helps evaluate the different mortgage payoff options, including making one-time or periodic extra payments, biweekly repayments, or paying off the mortgage in full. It calculates the remaining time to pay off, the difference in payoff time, and interest savings for different payoff options.</p>
      </div>

      <div class="faq-item">
        <h3>What is principal and interest of a mortgage?</h3>
        <p>A typical loan repayment consists of two parts, the principal and the interest. The principal is the amount borrowed, while the interest is the lender's charge to borrow the money. This interest charge is typically a percentage of the outstanding principal. A typical amortization schedule of a mortgage loan will contain both interest and principal.</p>
        <p>Each payment will cover the interest first, with the remaining portion allocated to the principal. Since the outstanding balance on the total principal requires higher interest charges, a more significant part of the payment will go toward interest at first. However, as the outstanding principal declines, interest costs will subsequently fall. Thus, with each successive payment, the portion allocated to interest falls while the amount of principal paid rises.</p>
        <p>The Mortgage Payoff Calculator and the accompanying Amortization Table illustrate this precisely. Once the user inputs the required information, the Mortgage Payoff Calculator will calculate the pertinent data.</p>
      </div>

      <div class="faq-item">
        <h3>What are extra payments and how do they help?</h3>
        <p>Extra payments are additional payments in addition to the scheduled mortgage payments. Borrowers can make these payments on a one-time basis or over a specified period, such as monthly or annually.</p>
        <p>Extra payments can possibly lower overall interest costs dramatically. For example, a one-time additional payment of $1,000 towards a $200,000, 30-year loan at 5% interest can pay off the loan four months earlier, saving $3,420 in interest. For the same $200,000, 30-year, 5% interest loan, extra monthly payments of $6 will pay off the loan four payments earlier, saving $2,796 in interest.</p>
      </div>

      <div class="faq-item">
        <h3>How do biweekly payments work?</h3>
        <p>Another strategy for paying off the mortgage earlier involves biweekly payments. This entails paying half of the regular mortgage payment every two weeks. With 52 weeks in a year, this approach results in 26 half payments. Thus, borrowers make the equivalent of 13 full monthly payments at year's end, or one extra month of payments every year. The biweekly payments option is suitable for those that receive a paycheck every two weeks. In such cases, borrowers can allocate a certain amount from each paycheck for the mortgage repayment.</p>
      </div>

      <div class="faq-item">
        <h3>What about refinancing to a shorter term?</h3>
        <p>Another option involves refinancing, or taking out a new mortgage to pay off an old loan. For example, a borrower holds a mortgage at a 5% interest rate with $200,000 and 20 years remaining. If this borrower can refinance to a new 20-year loan with the same principal at a 4% interest rate, the monthly payment will drop $107.95 from $1,319.91 to $1,211.96 per month. The total savings in interest will come out to $25,908.20 over the lifetime of the loan.</p>
        <p>Borrowers can refinance to a shorter or longer term. Shorter-term loans often include lower interest rates. However, they will usually need to pay closing costs and fees to refinance. Borrowers should run a compressive evaluation to decide if refinancing is financially beneficial. To evaluate refinancing options, visit our Refinance Calculator.</p>
      </div>

      <div class="faq-item">
        <h3>What are prepayment penalties?</h3>
        <p>Some lenders may charge a prepayment penalty if the borrower pays the loan off early. From a lender's perspective, mortgages are profitable investments that bring years of income, and the last thing they want to see is their money-making machines compromised.</p>
        <p>Lenders use numerous methods to calculate prepayment penalties. Possible penalties include charging 80% of the interest the lender would collect over the next six months. A lender may also add on a percentage of the outstanding balance. These penalties can amount to massive fees, especially during the early stages of a mortgage.</p>
        <p>However, prepayment penalties have become less common. If the lender includes these possible fees in a mortgage document, they usually become void after a certain period, such as after the fifth year. Borrowers should read the fine print or ask the lender to gain a clear understanding of how prepayment penalties apply to their loan. FHA loans, VA loans, or any loans insured by federally chartered credit unions prohibit prepayment penalties.</p>
      </div>

      <div class="faq-item">
        <h3>What are opportunity costs to consider?</h3>
        <p>Borrowers that want to pay off their mortgage earlier should consider the opportunity costs, or the benefits they could have enjoyed if they had chosen an alternative. Financial opportunity costs exist for every dollar spent for a specific purpose.</p>
        <p>The home mortgage is a type of loan with a relatively low interest rate, and many see mortgage prepayments as the equivalent of low-risk, low-reward investment. For this reason, borrowers should consider paying off high-interest obligations such as credit cards or smaller debts such as student or auto loans before supplementing a mortgage with extra payments.</p>
        <p>Additionally, other investments can produce returns exceeding the rate of mortgage interest. Nobody can predict the market's future direction, but some of these alternative investments may result in higher returns than the savings that would come from paying off a mortgage. In the long run, it would make more financial sense for an individual to have placed a certain amount of money into a portfolio of stocks that earned 10% one year as opposed to their existing mortgage at a 4% interest rate. Corporate bonds, physical gold, and many other investments are options that mortgage holders might consider instead of extra payments.</p>
        <p>Additionally, since most borrowers also need to save for retirement, they should also consider contributing to tax-advantaged accounts such as an IRA, a Roth IRA, or a 401k before making extra mortgage payments. This way, they not only may enjoy higher returns but also benefit from significant tax savings.</p>
      </div>

      <div class="faq-item">
        <h3>Can you provide some real-world examples?</h3>
        <p><strong>Example 1:</strong> Christine wanted the sense of happiness that comes with outright ownership of a beautiful home. After confirming she would not face prepayment penalties, she decided to supplement her mortgage with extra payments to speed up the payoff. One day, Christine had lunch with a friend who works as a financial advisor. Her friend explained that she could eliminate more interest charges by paying the existing high-interest debt on her three credit cards. Some of the cards charged rates as high as 20%, while the mortgage only charged a 5% interest rate. These payments ate up an unnecessarily large amount of her income. By paying off these high-interest debts first, Christine reduces her interest costs more quickly.</p>
        <p><strong>Example 2:</strong> Bob holds no debt except the mortgage on his family's home. Student loans, car loans, and credit card loans are all a thing of the past. With his discretionary income, he cannot decide whether to make supplemental payments towards his mortgage or invest in the stock market. Over time, the market has generated higher returns than the 4% interest rate tied to his mortgage. Bob could also choose to put more away into his emergency fund, which is nearly empty. One crucial detail his financial advisor mentioned is that Bob's company has been laying off employees recently. His manager even warned Bob that he might be next in line. In this situation, Bob should build an emergency fund before investing in the market or making supplemental mortgage payments.</p>
        <p><strong>Example 3:</strong> Charles carries no debt other than the mortgage on his house. He has a steady job where he has maxed out his tax-advantaged accounts, built a healthy six-month emergency fund, and saved extra cash. Charles is a few years away from retirement. Therefore, he does not want to make relatively riskier investments, such as purchasing individual stocks. In this situation, Charles's financial advisor recommends paying off his mortgage earlier to save on mortgage interest. This way, he can begin his retirement with a fully paid-off home.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'MortgagePayoffCalculator',
  data() {
    return {
      showAllMonthly: false,
      form: {
        originalLoanAmount: 400000,
        originalLoanTerm: 30,
        interestRate: 6,
        remainingYears: 20,
        remainingMonths: 0,
        repaymentOption: 'extra',
        extraPerMonth: 500,
        extraPerYear: 0,
        extraOneTime: 0,
        biweeklyRepayment: false,
        normalRepayment: false
      },
      results: {
        calculated: false,
        remainingBalance: 0,
        originalMonthlyPayment: 0,
        newMonthlyPayment: 0,
        originalTotalPayments: 0,
        newTotalPayments: 0,
        originalTotalInterest: 0,
        newTotalInterest: 0,
        originalRemainingPayments: 0,
        newRemainingPayments: 0,
        originalRemainingInterest: 0,
        newRemainingInterest: 0,
        originalRemainingYears: 0,
        originalRemainingMonths: 0,
        payoffYears: 0,
        payoffMonths: 0,
        timeSavingsYears: 0,
        timeSavingsMonths: 0,
        interestSavings: 0,
        interestSavingsPercent: 0,
        timeSavingsPercent: 0,
        totalExtraPerMonth: 0,
        monthlySchedule: []
      },
      chart: null
    };
  },
  computed: {
    totalMonths() {
      return (this.form.remainingYears || 0) * 12 + (this.form.remainingMonths || 0);
    },
    displayedMonthlySchedule() {
      if (this.showAllMonthly) {
        return this.results.monthlySchedule;
      }
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
      desc.content = 'Use this Mortgage Payoff Calculator to see how extra payments can reduce your loan term and save interest. Calculate early mortgage payoff, compare scenarios, and estimate how quickly you can become debt-free.'
      
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
      const originalAmount = this.form.originalLoanAmount || 0;
      const originalTerm = this.form.originalLoanTerm || 1;
      const annualRate = (this.form.interestRate || 0) / 100;
      const remainingYears = this.form.remainingYears || 0;
      const remainingMonths = this.form.remainingMonths || 0;
      const remainingTotalMonths = remainingYears * 12 + remainingMonths;
      
      // 计算原始月供（基于整个贷款期限）
      const monthlyRate = annualRate / 12;
      const originalTotalMonths = originalTerm * 12;
      
      let originalMonthlyPayment = 0;
      if (monthlyRate === 0) {
        originalMonthlyPayment = originalAmount / originalTotalMonths;
      } else {
        const factor = Math.pow(1 + monthlyRate, originalTotalMonths);
        originalMonthlyPayment = originalAmount * monthlyRate * factor / (factor - 1);
      }
      
      // 计算剩余本金
      let remainingBalance = originalAmount;
      for (let month = 1; month <= originalTotalMonths - remainingTotalMonths; month++) {
        const interest = remainingBalance * monthlyRate;
        const principal = originalMonthlyPayment - interest;
        remainingBalance -= principal;
      }
      
      // 计算额外付款
      const extraPerMonth = this.form.repaymentOption === 'extra' ? (this.form.extraPerMonth || 0) : 0;
      const extraPerYear = this.form.repaymentOption === 'extra' ? (this.form.extraPerYear || 0) : 0;
      const extraOneTime = this.form.repaymentOption === 'extra' ? (this.form.extraOneTime || 0) : 0;
      
      // 计算新月供
      const newMonthlyPayment = originalMonthlyPayment + extraPerMonth;
      
      // 模拟两种还款方式
      const monthlySchedule = [];
      let originalBalance = remainingBalance;
      let newBalance = remainingBalance;
      let month = 1;
      let payoffMonth = 0;
      
      while (originalBalance > 0.01 || newBalance > 0.01) {
        const year = Math.ceil(month / 12);
        const monthInYear = ((month - 1) % 12) + 1;
        
        // 原始还款
        let originalInterest = 0;
        let originalPrincipal = 0;
        if (originalBalance > 0.01) {
          originalInterest = originalBalance * monthlyRate;
          originalPrincipal = Math.min(originalMonthlyPayment - originalInterest, originalBalance);
          originalBalance -= originalPrincipal;
        }
        
        // 新还款（带额外付款）
        let newInterest = 0;
        let newPrincipal = 0;
        if (newBalance > 0.01) {
          newInterest = newBalance * monthlyRate;
          let payment = newMonthlyPayment;
          
          // 添加年度额外付款（每年第一个月）
          if (monthInYear === 1 && extraPerYear > 0 && newBalance > 0.01) {
            payment += extraPerYear;
          }
          
          newPrincipal = Math.min(payment - newInterest, newBalance);
          newBalance -= newPrincipal;
          
          // 记录还清月份
          if (newBalance <= 0.01 && payoffMonth === 0) {
            payoffMonth = month;
          }
        }
        
        monthlySchedule.push({
          month: month,
          year: year,
          monthInYear: monthInYear,
          isYearEnd: monthInYear === 12,
          originalInterest: originalInterest,
          originalPrincipal: originalPrincipal,
          originalBalance: Math.max(0, originalBalance),
          newInterest: newInterest,
          newPrincipal: newPrincipal,
          newBalance: Math.max(0, newBalance)
        });
        
        month++;
        if (originalBalance <= 0.01 && newBalance <= 0.01) break;
        if (month > 600) break; // 防止无限循环
      }
      
      // 计算汇总数据
      const originalTotalPayments = originalMonthlyPayment * remainingTotalMonths;
      const originalTotalInterest = originalTotalPayments - remainingBalance;
      
      const newTotalPayments = monthlySchedule
        .filter(m => m.newPrincipal > 0)
        .reduce((sum, m) => sum + m.newPrincipal + m.newInterest, 0);
      const newTotalInterest = monthlySchedule
        .filter(m => m.newInterest > 0)
        .reduce((sum, m) => sum + m.newInterest, 0);
      
      const originalRemainingPayments = originalBalance > 0 ? originalTotalPayments : 0;
      const originalRemainingInterest = originalBalance > 0 ? originalTotalInterest : 0;
      
      const newRemainingPayments = newBalance > 0 ? newTotalPayments : 0;
      const newRemainingInterest = newBalance > 0 ? newTotalInterest : 0;
      
      const payoffYears = Math.floor(payoffMonth / 12);
      const payoffMonths = payoffMonth % 12;
      
      const timeSavingsMonths = remainingTotalMonths - payoffMonth;
      const timeSavingsYears = Math.floor(timeSavingsMonths / 12);
      const timeSavingsRemainderMonths = timeSavingsMonths % 12;
      
      const interestSavings = originalTotalInterest - newTotalInterest;
      const interestSavingsPercent = originalTotalInterest > 0 ? 
        (interestSavings / originalTotalInterest * 100) : 0;
      
      const timeSavingsPercent = remainingTotalMonths > 0 ? 
        (timeSavingsMonths / remainingTotalMonths * 100) : 0;
      
      this.results = {
        calculated: true,
        remainingBalance: remainingBalance,
        originalMonthlyPayment: originalMonthlyPayment,
        newMonthlyPayment: newMonthlyPayment,
        originalTotalPayments: originalTotalPayments,
        newTotalPayments: newTotalPayments,
        originalTotalInterest: originalTotalInterest,
        newTotalInterest: newTotalInterest,
        originalRemainingPayments: originalRemainingPayments,
        newRemainingPayments: newRemainingPayments,
        originalRemainingInterest: originalRemainingInterest,
        newRemainingInterest: newRemainingInterest,
        originalRemainingYears: remainingYears,
        originalRemainingMonths: remainingMonths,
        payoffYears: payoffYears,
        payoffMonths: payoffMonths,
        timeSavingsYears: timeSavingsYears,
        timeSavingsMonths: timeSavingsRemainderMonths,
        interestSavings: interestSavings,
        interestSavingsPercent: interestSavingsPercent,
        timeSavingsPercent: timeSavingsPercent,
        totalExtraPerMonth: extraPerMonth,
        monthlySchedule: monthlySchedule
      };
      
      this.$nextTick(() => {
        this.updateChart();
      });
    },

    updateChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      const canvas = this.$refs.comparisonChart;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 准备图表数据（每5年采样一次）
      const schedule = this.results.monthlySchedule;
      const dataPoints = [];
      
      for (let year = 5; year <= 30; year += 5) {
        const monthIndex = year * 12 - 1;
        if (monthIndex < schedule.length) {
          dataPoints.push({
            year: year,
            oldBalance: schedule[monthIndex].originalBalance,
            oldInterest: this.results.originalTotalInterest * (year / this.results.originalRemainingYears),
            newBalance: schedule[monthIndex].newBalance,
            newInterest: this.results.newTotalInterest * (year / this.results.payoffYears)
          });
        }
      }

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dataPoints.map(d => d.year + 'yr'),
          datasets: [
            {
              label: 'Old Balance',
              data: dataPoints.map(d => d.oldBalance / 1000),
              borderColor: '#2563eb',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.1
            },
            {
              label: 'Old Interest',
              data: dataPoints.map(d => d.oldInterest / 1000),
              borderColor: '#16a34a',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.1
            },
            {
              label: 'New Balance',
              data: dataPoints.map(d => d.newBalance / 1000),
              borderColor: '#eab308',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.1
            },
            {
              label: 'New Interest',
              data: dataPoints.map(d => d.newInterest / 1000),
              borderColor: '#9333ea',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount ($K)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Year'
              }
            }
          }
        }
      });
    },

    clearForm() {
      this.form = {
        originalLoanAmount: 400000,
        originalLoanTerm: 30,
        interestRate: 6,
        remainingYears: 20,
        remainingMonths: 0,
        repaymentOption: 'extra',
        extraPerMonth: 500,
        extraPerYear: 0,
        extraOneTime: 0,
        biweeklyRepayment: false,
        normalRepayment: false
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
    document.title = 'Mortgage Payoff Calculator – Calculate Early Payoff Savings with Extra Payments';
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
.mortgage-payoff-calculator {
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
  .mortgage-payoff-calculator {
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

.radio-row {
  align-items: flex-start;
  flex-wrap: wrap;
}

.radio-group.vertical {
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 0.95rem;
  color: #1a3349;
}

.radio-label input[type="radio"],
.radio-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.extra-payments-section {
  margin: 16px 0 16px 60px;
  padding: 16px;
  background: #e8f0fe;
  border-radius: 16px;
  border: 1px solid #c9d9ec;
}

@media (max-width: 480px) {
  .extra-payments-section {
    margin-left: 0;
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

.payoff-summary {
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 28px;
  border: 1px solid #d9e2ef;
}

.payoff-summary h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: #1f3a5f;
  margin: 0 0 16px 0;
}

.summary-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #1a2e44;
}

.summary-text strong {
  color: #1f3a5f;
}

.savings-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 28px;
}

@media (max-width: 700px) {
  .savings-cards {
    grid-template-columns: 1fr;
  }
}

.savings-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #d9e2ef;
}

.savings-card.interest {
  border-left: 6px solid #16a34a;
}

.savings-card.time {
  border-left: 6px solid #2563eb;
}

.savings-card h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #1e3a5f;
}

.savings-value {
  font-size: 2rem;
  font-weight: 700;
  color: #0b2b44;
  margin-bottom: 12px;
}

.savings-detail {
  font-size: 0.95rem;
  color: #4b5f73;
  line-height: 1.6;
}

.comparison-table {
  overflow-x: auto;
  margin-bottom: 20px;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  min-width: 500px;
}

.comparison-table th {
  background: #e1eaf3;
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: #1a3349;
}

.comparison-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e9eef3;
  color: #2c405c;
}

.comparison-table tr:last-child td {
  border-bottom: none;
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

.schedule-section h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #1e3a5f;
}

.schedule-table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 28px;
}

.schedule-table {
  min-width: 900px;
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
  border-bottom: 2px solid #cbd5e1;
}

.schedule-table td {
  padding: 10px 8px;
  border-bottom: 1px solid #e9eef3;
  color: #2c405c;
  white-space: nowrap;
}

.schedule-table .year-end-row td {
  background: #f0f4fa;
  border-bottom: 2px dashed #9aa9b9;
  text-align: center;
  font-weight: 600;
  color: #4b5f73;
  padding: 8px;
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

/* Chart Section */
.chart-section {
  margin-top: 28px;
}

.chart-container {
  width: 100%;
  height: 400px;
  position: relative;
  margin-bottom: 20px;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #2c405c;
}

.color-box {
  width: 20px;
  height: 12px;
  border-radius: 4px;
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

@media (max-width: 480px) {
  .related-tools {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
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
  margin: 8px 0;
  line-height: 1.6;
  color: #253c54;
  font-size: 0.95rem;
}

@media (max-width: 700px) {
  .faq-item {
    padding: 16px;
  }

  .faq-item h3 {
    font-size: 1.1rem;
  }

  .faq-item p {
    font-size: 0.9rem;
  }
}
</style>