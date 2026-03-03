<template>
  <div class="annuity-payout-calculator">
    <!-- Header -->
    <h1 class="main-title">Annuity Payout Calculator</h1>
    <p class="description">
      This Annuity Payout Calculator helps you estimate the payout amount of an annuity over a fixed period or determine how long your annuity can last based on a fixed withdrawal amount. By adjusting interest rates, payout frequency, and principal balance, you can compare different income scenarios and better plan your retirement strategy.
    </p>

    <!-- Calculator Form - 附件1和2样式 -->
    <div class="calculator-form">
      <h2>Annuity Payout Calculator</h2>
      
      <!-- Tabs for Fixed Length / Fixed Payment -->
      <div class="calculator-tabs">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'fixedLength' }"
          @click="activeTab = 'fixedLength'"
        >
          Fixed length
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'fixedPayment' }"
          @click="activeTab = 'fixedPayment'"
        >
          Fixed payment
        </button>
      </div>

      <!-- Fixed Length Tab - 附件1样式 -->
      <div v-if="activeTab === 'fixedLength'" class="tab-content">
        <div class="form-row">
          <label>Starting principal</label>
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input 
              type="number" 
              v-model.number="form.fixedLength.principal" 
              @input="calculate"
              min="0"
              step="1000"
            />
          </div>
        </div>

        <div class="form-row">
          <label>Interest/return rate</label>
          <div class="input-with-symbol">
            <input 
              type="number" 
              step="0.1" 
              v-model.number="form.fixedLength.interestRate" 
              @input="calculate"
              min="0"
              max="30"
            />
            <span class="percent-symbol">%</span>
          </div>
        </div>

        <div class="form-row">
          <label>Years to payout</label>
          <div class="input-with-symbol">
            <input 
              type="number" 
              v-model.number="form.fixedLength.years" 
              @input="calculate"
              min="1"
              max="50"
              step="1"
            />
            <span>years</span>
          </div>
        </div>

        <div class="form-row">
          <label>Payout frequency</label>
          <div class="frequency-display">Monthly</div>
        </div>
      </div>

      <!-- Fixed Payment Tab - 附件2样式 -->
      <div v-if="activeTab === 'fixedPayment'" class="tab-content">
        <div class="form-row">
          <label>Starting principal</label>
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input 
              type="number" 
              v-model.number="form.fixedPayment.principal" 
              @input="calculate"
              min="0"
              step="1000"
            />
          </div>
        </div>

        <div class="form-row">
          <label>Interest/return rate</label>
          <div class="input-with-symbol">
            <input 
              type="number" 
              step="0.1" 
              v-model.number="form.fixedPayment.interestRate" 
              @input="calculate"
              min="0"
              max="30"
            />
            <span class="percent-symbol">%</span>
          </div>
        </div>

        <div class="form-row">
          <label>Payout amount</label>
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input 
              type="number" 
              v-model.number="form.fixedPayment.payoutAmount" 
              @input="calculate"
              min="1"
              step="100"
            />
          </div>
        </div>

        <div class="form-row">
          <label>Payout frequency</label>
          <div class="frequency-display">Monthly</div>
        </div>
      </div>

      <div class="form-actions">
        <button @click="calculate">Calculate</button>
        <button class="clear" @click="clearForm">Clear</button>
      </div>
    </div>

    <!-- Results Section - 附件3样式 -->
    <div class="results-section" v-if="results.calculated">
      <h2>Result</h2>

      <!-- Monthly Payout Message -->
      <div class="result-message" v-if="activeTab === 'fixedLength'">
        <p>You can withdraw <strong>${{ formatMoney(results.monthlyPayment) }}</strong> monthly.</p>
      </div>
      <div class="result-message" v-else>
        <p>Your annuity will last approximately <strong>{{ results.payoutYears }} years</strong> ({{ results.totalPayments }} payments).</p>
      </div>

      <!-- Summary Cards -->
      <div class="summary-cards">
        <div class="summary-card">
          <div class="card-row">
            <span>Total of {{ results.totalPayments }} payments:</span>
            <span class="card-value">${{ formatMoney(results.totalPayout) }}</span>
          </div>
          <div class="card-row">
            <span>Total interest/return:</span>
            <span class="card-value">${{ formatMoney(results.totalInterest) }}</span>
          </div>
        </div>
      </div>

      <!-- Chart Placeholder (simplified representation) -->
      <div class="chart-container">
        <h3>Chart:</h3>
        <div class="chart">
          <div class="y-axis">
            <div>$500K</div>
            <div>$400K</div>
            <div>$300K</div>
            <div>$200K</div>
            <div>$100K</div>
            <div>$0</div>
          </div>
          <div class="chart-bars">
            <div class="bar-container" v-for="(year, index) in chartYears" :key="index">
              <div class="bar balance-bar" :style="{ height: getBarHeight(year.balance) + '%' }" :title="'Balance: $' + formatMoney(year.balance)"></div>
              <div class="bar interest-bar" :style="{ height: getBarHeight(year.interest) + '%' }" :title="'Interest: $' + formatMoney(year.interest)"></div>
            </div>
          </div>
          <div class="x-axis">
            <div v-for="(year, index) in chartYears" :key="index">{{ year.label }}</div>
          </div>
        </div>
        <div class="chart-legend">
          <span class="legend-item"><span class="color-box balance-color"></span> Balance</span>
          <span class="legend-item"><span class="color-box interest-color"></span> Interest/return</span>
        </div>
      </div>

      <!-- Annuity Balances Table - 附件4样式 -->
      <div class="balances-section">
        <h3>Annuity Balances</h3>
        <table class="balances-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Beginning balance</th>
              <th>Interest/return</th>
              <th>Ending balance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in results.balances" :key="index">
              <td>{{ row.year }}</td>
              <td>${{ formatMoney(row.beginningBalance) }}</td>
              <td>${{ formatMoney(row.interest) }}</td>
              <td>${{ formatMoney(row.endingBalance) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Related Tools -->
    <div class="related-tools">
      <span class="related-label">Related:</span>
      <a href="/retirement">Retirement Calculator</a> <span class="sep">|</span>
      <a href="/annuity">Annuity Calculator</a>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h2>Annuity Information – FAQ</h2>

      <div class="faq-item">
        <h3>What is the difference between qualified and non-qualified annuities?</h3>
        <p><strong>Qualified:</strong> In the U.S., a tax-qualified annuity is one used for qualified, tax-advantaged retirement plans such as an IRA or 401(k). Less common qualified retirement plans include defined benefit pension plans, 403(b)s (similar to 401(k)s), Keogh Plans, Thrift Savings Plans (TSPs), and Simplified Employee Pensions (SEPs). Contributions to qualified annuities are generally paid with pretax money, including any investments purchased for use in a qualified retirement plan, and are not included in taxable income for the year in which they are paid. This means that contributions during a tax year can be deductible, lowering taxable income. However, the eventual distributions during a future tax year are subject to ordinary income taxes. When used as a form of retirement savings, these annuities are entitled to the tax benefits and penalties of their respective plans. However, the rules of the annuity plan still govern all matters and may override certain rules. With that said, features that are unique to annuities such as guaranteed death benefits (benefits that must be paid out to beneficiaries regardless of factors such as down markets and decreases in account value) may still be included.</p>
        <p><strong>Non-Qualified:</strong> These annuities are purchased with after-tax dollars. In other words, the only portion of a non-qualified annuity policy that is eligible for taxation is the earnings, which are taxed as ordinary income. A big distinction to make is that, unlike qualified annuities, non-qualified annuities are not subject to minimum distribution rules after the age of 72. There is no limit on the amount of non-qualified money that can be placed into an annuity or the number of annuities that can be purchased.</p>
      </div>

      <div class="faq-item">
        <h3>What are the rules for early withdrawals from an annuity?</h3>
        <p>Withdrawals from an annuity before the age of 59 ½ will result in a 10% early withdrawal penalty on top of regular income tax. For all types of annuities, earnings are not taxable until the money is withdrawn. Because withdrawals are taxed on a "last in, first out" (LIFO) basis for a non-qualified annuity purchased after Aug. 13, 1982, earnings are paid out before principal. With that said, however, there are exceptions. Most annuity contracts allow the withdrawal of a portion of the account value each year without incurring a surrender charge. Other annuity contracts may allow the withdrawal of the gains (not principal) from an annuity without penalty. Also, as retirement accounts, annuities allow early withdrawals without penalty under certain situations. For example, the annuitants become disabled, suffer a major medical emergency, or are diagnosed with a terminal illness. In addition, some contracts offer benefits for using penalty-free withdrawals to pay for long-term care expenses.</p>
      </div>

      <div class="faq-item">
        <h3>What are the phases of an annuity?</h3>
        <p>There are several phases in the life of an annuity: the accumulation, annuitization, and payout phases.</p>
        <p><strong>Accumulation Phase:</strong> The accumulation phase is the first stage during which an annuity builds up cash value utilizing gathered funds. It always comes first and begins after an initial investment is made. There are several ways this can be accomplished; the most common method is to transfer funds, usually by check or bank transfer. Funds can come in the form of one lump sum or a series of payments, and there is precise reasoning for both methods. A lump sum is more commonly chosen by investors close to or already in retirement in order to start the annuitization and payout phase as quickly as possible. This allows them to start receiving distributions that are usually guaranteed for life right away. Also called "immediate annuities" because their distribution, or payout, of income is almost immediate, they have very short accumulation phases as a result. On the other hand, a series of payments might be more beneficial for younger investors who want to grow wealth over time in order to have future income in retirement. As an aside, even after the accumulation phase of an annuity ends, it does not stop increasing in value (given good economic conditions). Assets will continue to be invested well into all three phases, regardless of whether the annuity is fixed, indexed, or variable. By following annuity rules, earnings will accumulate on a tax-deferred basis until withdrawals are ready to be made.</p>
        <p><strong>Annuitization Phase:</strong> The annuitization phase is more of a single, immediate event rather than a phase, acting as a separation between the accumulation and payout phases. It represents the point at which the insurance company stops receiving payments from the investor in preparation to return the accumulated assets as periodic payments to the annuitant (who was the investor). In other words, the annuity is "annuitized." In the case of a variable annuity, annuitization also represents the point at which all accumulated units purchased in the contract are converted into annuity units for payout. The decision to annuitize is final, and once made, it is not possible to request a different form of payout or access the principal.</p>
        <p><strong>Payout Phase:</strong> Sometimes referred to as the distribution phase, this is the final phase of an annuity, which can be calculated by this Annuity Payout Calculator. This is the phase in which the insurance company distributes payments to the investor. The length of the phase can vary widely, depending on various factors such as the payout amount and the total value accrued during the accumulation phase. Whether buying an immediate annuity or converting a deferred annuity into income payments, the options are essentially the same. Payments can be distributed over a specific period of time: monthly, quarterly, semiannually, or annually. It is important to note that regardless of which option is chosen, once applied, the choice is irrevocable. In non-qualified annuities (annuities that aren't used to fund tax-advantaged retirement plans), a portion of each payment is considered either earnings or principal. The latter will be tax-free, while the former is subject to the same taxes as ordinary income. The earnings are considered withdrawn first and are therefore subject to taxation. All withdrawals are fully taxable until the account value reaches the principal invested.</p>
      </div>

      <div class="faq-item">
        <h3>What is a 1035 Exchange?</h3>
        <p>A 1035 Exchange, taken from the Internal Revenue Code section of the same number, is an IRS provision in the tax code that allows policyholders to transfer funds from a life insurance plan, endowment, or annuity to a new policy without it being treated as a sale. As such, the payment of tax is not required. This is beneficial to policyholders for several reasons: Economic conditions continually change over time and can potentially adversely affect each individual and their long-term contracts. General improvements in the health and life expectancy of the entire population can lower insurance costs. Policyholders who feel they no longer need coverage may benefit from moving life insurance cash into annuities. Converting a life insurance policy into an income annuity will surrender the death benefit, but premium payments will no longer be required, and income will be secured for a specified number of years. In these scenarios, a 1035 Exchange allows policyholders to get out of sticky situations by replacing outdated contracts with new contracts that have improved benefits, higher death benefits, lower fees, and/or alternate investment options. Only the following transfers are considered tax-free by the IRS: Exchanging one annuity contract with another annuity contract or an annuity with long-term care benefits; Exchanging one life insurance contract with another life insurance contract, endowment contract, or annuity contract; Exchanging one endowment policy for an identical endowment policy that does not delay the date upon which payments will begin, or an annuity contract. Anything else, such as exchanging an annuity contract for a life insurance policy, is not valid as a 1035 Exchange and will be considered by the IRS as a taxable event. In addition, for a 1035 exchange to take place, the owner, the insured, and the annuitant must be the same people listed on the old contract.</p>
      </div>

      <div class="faq-item">
        <h3>What is a partial 1035 Exchange of an annuity?</h3>
        <p>Unlike a 1035 Exchange, which concerns the transfer of entire annuity contracts, annuity owners have the opportunity to exchange a portion of their annuity contract for another annuity contract tax-free. The basis is divided pro-rata, not income-out-first. For instance, if half the value of the annuity is exchanged for a second annuity, the new annuity will take half the cost basis. As an example, an annuity owner has a $50,000 non-qualified deferred annuity with a $40,000 basis. If they require a $10,000 distribution, it would be taxed at the full amount of $10,000. However, if they take $25,000 instead and exchange it for a second annuity, each contract will then have $25,000 with a $20,000 basis. With this rule, a $10,000 distribution from either contract will result in only $5,000 in taxable income. In order to qualify, distributions must not be taken from either contract within 180 days of the exchange. The IRS may treat a distribution during this window as being part of the original transaction resulting in the full amount of income of both contracts being taxable, as opposed to only taxing income from the contract that distributed the funds. While partial exchanges are allowed by the IRS, many insurance companies do not provide this service. 1035 Exchanges (including partial 1035 exchanges) involve a complex set of tax rules and regulations. It can be helpful to work with a professional.</p>
      </div>

      <div class="faq-item">
        <h3>What payout options are available for annuities?</h3>
        <p>There are several options for choosing how annuity payouts occur, and not all annuities offer every payout option. The Annuity Payout Calculator only calculates fixed payment or fixed length, two of the most common options. Both are represented by tabs on the calculator.</p>
        <p><strong>Lump-Sum:</strong> The lump-sum payment option allows annuitants to withdraw the entire account value of an annuity in a single withdrawal. This can be useful in many cases where the entire value of the account is desired immediately. A penalty will not be incurred as long as this is done after the age of 59 ½. However, income taxes may apply to the year of withdrawal. This makes it financially undesirable from a tax minimization standpoint.</p>
        <p><strong>Fixed Length:</strong> A fixed-length payout option, also known as fixed-period or period certain payout, allows annuitants to select a specific time period over which the annuity payments are guaranteed to last. For example, an annuitant aged 60 who selects a 10-year period certain payout will be guaranteed payments until around age 70. Fixed length payouts are usually paid in monthly installments over a chosen time period, such as 10, 15, or 20 years. It is very possible to choose too short or too long a fixed length for an annuity. If the main annuitant dies with funds left, any remaining amount will be passed to their heirs. This payout option is not affected by how long the main annuitant lives.</p>
        <p><strong>Fixed Payment Amount:</strong> A fixed payment amount payout option allows annuitants to select the amount they will receive in each monthly payment. These payments will continue until the annuity's balance is depleted. As the calculator shows, the duration of the payments depends on the amount chosen and the annuity's accumulated value at the time of annuitization. The fixed payment amount option shares the same risk as the fixed-length payout option; it is possible to choose too small or too large a fixed monthly payment amount, resulting in the retiree either outliving the annuity or dying with money remaining in the account. It is up to each individual to consider their situation to determine which option to choose, as there are different risks associated with all of them.</p>
        <p><strong>Life Only:</strong> For this option, the insurance company makes payments to the annuitant for as long as they live. Calculated life expectancy will determine the payment amount. The longer the life expectancy, the smaller the payment amount. A drawback to this option is that it is not possible to choose the payment amount, and there is no guarantee that the annuitant will receive the total value of their annuity. If they die within the first or second year, all the remaining funds in the annuity are lost. However, if the annuitant happens to live longer than the registered life expectancy, there is a possibility they receive more than the accumulated value of their annuity.</p>
        <p><strong>Joint and Survivor:</strong> This option ensures that retirement income provided by an annuity will continue for a spouse in the case of the death of the main annuitant. Payments are calculated and based on the life expectancy of the main annuitant and their spouse. Due to this, payments under this option will generally be lower than the life-only option. Payments will cease upon the death of the second annuitant. Another version of this payout is called the joint life with last survivor annuity, which can cover more than two people, such as the main annuitant, their spouse, and a dependent child.</p>
        <p><strong>Life with Period Certain:</strong> This option combines features of the fixed length and life-only options. It guarantees an income for life but also allows the annuitant to select a specific time period during which the annuity pays a designated beneficiary, such as 10 years, even in the case of death before the guaranteed period ends. If the annuitant dies after the period certain, no payments are made to the beneficiary.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnnuityPayoutCalculator',
  data() {
    return {
      activeTab: 'fixedLength', // 'fixedLength' or 'fixedPayment'
      form: {
        fixedLength: {
          principal: 500000,
          interestRate: 6,
          years: 10
        },
        fixedPayment: {
          principal: 500000,
          interestRate: 6,
          payoutAmount: 5000
        }
      },
      results: {
        calculated: false,
        monthlyPayment: 0,
        payoutYears: 0,
        totalPayments: 0,
        totalPayout: 0,
        totalInterest: 0,
        balances: []
      }
    };
  },
  computed: {
    chartYears() {
      const years = [];
      const balances = this.results.balances || [];
      
      for (let i = 0; i < balances.length; i++) {
        if (i % 2 === 0 || i === balances.length - 1) {
          years.push({
            label: i === 0 ? '0' : (i / 2).toString(),
            balance: balances[i].beginningBalance,
            interest: balances[i].interest
          });
        }
      }
      
      // Ensure we have at least 5 points for the chart
      if (years.length < 5 && balances.length > 0) {
        const step = Math.floor(balances.length / 5);
        for (let i = 0; i < 5; i++) {
          const index = Math.min(i * step, balances.length - 1);
          years.push({
            label: index.toString(),
            balance: balances[index].beginningBalance,
            interest: balances[index].interest
          });
        }
      }
      
      return years.slice(0, 6); // Max 6 points for clarity
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
      desc.content = 'Estimate your annuity payout amount for a fixed period or calculate how long your annuity can last with a fixed withdrawal. Plan retirement income with confidence.'
      
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
      if (this.activeTab === 'fixedLength') {
        this.calculateFixedLength();
      } else {
        this.calculateFixedPayment();
      }
    },

    calculateFixedLength() {
      const principal = this.form.fixedLength.principal;
      const annualRate = this.form.fixedLength.interestRate / 100;
      const years = this.form.fixedLength.years;
      
      // Monthly rate
      const monthlyRate = annualRate / 12;
      const totalMonths = years * 12;
      
      // Calculate monthly payment using annuity formula
      // PMT = PV * r * (1 + r)^n / ((1 + r)^n - 1)
      let monthlyPayment = 0;
      
      if (monthlyRate === 0) {
        monthlyPayment = principal / totalMonths;
      } else {
        const factor = Math.pow(1 + monthlyRate, totalMonths);
        monthlyPayment = principal * monthlyRate * factor / (factor - 1);
      }
      
      // Calculate amortization schedule
      const balances = [];
      let balance = principal;
      let totalInterest = 0;
      
      for (let year = 1; year <= years; year++) {
        let beginningBalance = balance;
        let yearInterest = 0;
        
        for (let month = 1; month <= 12; month++) {
          const interest = balance * monthlyRate;
          yearInterest += interest;
          totalInterest += interest;
          
          balance = balance + interest - monthlyPayment;
        }
        
        balances.push({
          year,
          beginningBalance,
          interest: yearInterest,
          endingBalance: Math.max(0, balance)
        });
      }
      
      const totalPayout = monthlyPayment * totalMonths;
      
      this.results = {
        calculated: true,
        monthlyPayment,
        payoutYears: years,
        totalPayments: totalMonths,
        totalPayout,
        totalInterest,
        balances
      };
    },

    calculateFixedPayment() {
      const principal = this.form.fixedPayment.principal;
      const annualRate = this.form.fixedPayment.interestRate / 100;
      const monthlyPayment = this.form.fixedPayment.payoutAmount;
      
      // Monthly rate
      const monthlyRate = annualRate / 12;
      
      // Calculate how many months the annuity will last
      // n = -log(1 - PV * r / PMT) / log(1 + r)
      let totalMonths = 0;
      
      if (monthlyRate === 0) {
        totalMonths = Math.floor(principal / monthlyPayment);
      } else {
        if (monthlyPayment <= principal * monthlyRate) {
          // Payment is less than interest, annuity will never deplete
          totalMonths = Infinity;
        } else {
          totalMonths = Math.floor(
            -Math.log(1 - principal * monthlyRate / monthlyPayment) / 
            Math.log(1 + monthlyRate)
          );
        }
      }
      
      if (!isFinite(totalMonths)) {
        // Handle case where annuity never depletes
        this.results = {
          calculated: true,
          monthlyPayment,
          payoutYears: Infinity,
          totalPayments: Infinity,
          totalPayout: Infinity,
          totalInterest: Infinity,
          balances: []
        };
        return;
      }
      
      const years = Math.ceil(totalMonths / 12);
      
      // Calculate amortization schedule
      const balances = [];
      let balance = principal;
      let totalInterest = 0;
      let monthsRemaining = totalMonths;
      
      for (let year = 1; year <= years; year++) {
        if (balance <= 0) break;
        
        let beginningBalance = balance;
        let yearInterest = 0;
        const monthsInYear = Math.min(12, monthsRemaining);
        
        for (let month = 1; month <= monthsInYear; month++) {
          const interest = balance * monthlyRate;
          yearInterest += interest;
          totalInterest += interest;
          
          balance = balance + interest - monthlyPayment;
          if (balance < 0) balance = 0;
        }
        
        balances.push({
          year,
          beginningBalance,
          interest: yearInterest,
          endingBalance: balance
        });
        
        monthsRemaining -= monthsInYear;
      }
      
      const totalPayout = monthlyPayment * totalMonths;
      
      this.results = {
        calculated: true,
        monthlyPayment,
        payoutYears: totalMonths / 12,
        totalPayments: totalMonths,
        totalPayout,
        totalInterest,
        balances
      };
    },

    clearForm() {
      this.form = {
        fixedLength: {
          principal: 500000,
          interestRate: 6,
          years: 10
        },
        fixedPayment: {
          principal: 500000,
          interestRate: 6,
          payoutAmount: 5000
        }
      };
      this.calculate();
    },

    formatMoney(value) {
      if (value === undefined || value === null || !isFinite(value)) return '0.00';
      return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    getBarHeight(value) {
      const maxBalance = Math.max(...this.results.balances.map(b => b.beginningBalance));
      if (maxBalance === 0) return 0;
      return (value / maxBalance) * 80; // Scale to 80% max height
    }
  },
  mounted() {
    document.title = 'Annuity Payout Calculator – Estimate Annuity Income or Payout Duration'
    // 2. 设置关键meta标签（Google最关注的）
    this.setGoogleMetaTags()
    this.calculate();
  },
  watch: {
    activeTab: {
      handler: 'calculate'
    },
    'form.fixedLength': {
      handler: 'calculate',
      deep: true
    },
    'form.fixedPayment': {
      handler: 'calculate',
      deep: true
    }
  }
};
</script>

<style scoped>
.annuity-payout-calculator {
  max-width: 1200px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 32px;
  box-shadow: 0 20px 40px -10px rgba(0, 34, 68, 0.15);
  padding: 32px 36px;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  color: #11212e;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #0b2b44;
  letter-spacing: -0.02em;
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

.calculator-form {
  background: #f2f6fb;
  border-radius: 28px;
  padding: 32px;
  border: 1px solid #cdddee;
  margin-bottom: 32px;
}

.calculator-form h2 {
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 28px;
  color: #0b2b44;
}

.calculator-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  border-bottom: 2px solid #d4e2f0;
  padding-bottom: 12px;
}

.tab-btn {
  background: none;
  border: none;
  padding: 10px 28px;
  font-size: 1.1rem;
  font-weight: 500;
  color: #4b5f73;
  border-radius: 40px;
  cursor: pointer;
  transition: 0.2s;
}

.tab-btn.active {
  background: #1f3a5f;
  color: white;
}

.tab-content {
  padding: 8px 0;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.form-row label {
  width: 180px;
  font-weight: 500;
  color: #1a3349;
  font-size: 1.05rem;
}

.input-with-symbol {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  max-width: 250px;
}

.currency-symbol {
  font-weight: 500;
  color: #1a3349;
  font-size: 1.1rem;
  margin-right: 4px;
}

.percent-symbol {
  font-weight: 500;
  color: #1a3349;
  font-size: 1.1rem;
  margin-left: 4px;
}

.frequency-display {
  padding: 8px 16px;
  background: white;
  border: 1px solid #b6c9dd;
  border-radius: 30px;
  font-size: 1rem;
  color: #1a3349;
  min-width: 120px;
}

.form-row input[type="number"] {
  padding: 12px 16px;
  border: 1px solid #b6c9dd;
  border-radius: 30px;
  font-size: 1rem;
  width: 160px;
  background: white;
  transition: border-color 0.2s;
}

.form-row input[type="number"]:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 32px;
}

button {
  background: #1f3a5f;
  border: none;
  color: white;
  padding: 14px 38px;
  border-radius: 40px;
  font-size: 1.05rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.15s;
  border: 1px solid #1f3a5f;
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

.results-section {
  background: #f8fafd;
  border-radius: 28px;
  padding: 28px;
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

.result-message {
  background: white;
  border-radius: 20px;
  padding: 20px 24px;
  margin-bottom: 24px;
  font-size: 1.2rem;
  border-left: 6px solid #2563eb;
}

.result-message strong {
  font-size: 1.8rem;
  color: #1f3a5f;
}

.summary-cards {
  margin-bottom: 28px;
}

.summary-card {
  background: white;
  border-radius: 20px;
  padding: 20px 24px;
  border: 1px solid #d9e2ef;
  max-width: 400px;
}

.card-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 1.1rem;
}

.card-value {
  font-weight: 600;
  color: #0b2b44;
}

.chart-container {
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 28px;
  border: 1px solid #d9e2ef;
}

.chart-container h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #1e3a5f;
}

.chart {
  display: flex;
  gap: 20px;
  height: 300px;
  margin-bottom: 16px;
}

.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
  padding-right: 12px;
  border-right: 2px solid #cbd5e1;
  font-size: 0.9rem;
  color: #4b5f73;
  min-width: 60px;
}

.chart-bars {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 16px;
}

.bar-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  gap: 4px;
  position: relative;
}

.bar {
  width: 100%;
  transition: height 0.3s ease;
  border-radius: 6px 6px 0 0;
}

.balance-bar {
  background: #2563eb;
  height: 0;
  opacity: 0.8;
}

.interest-bar {
  background: #16a34a;
  height: 0;
  opacity: 0.6;
}

.x-axis {
  display: flex;
  justify-content: space-around;
  margin-top: 12px;
  padding-left: 80px;
  font-size: 0.9rem;
  color: #4b5f73;
}

.chart-legend {
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-top: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #2c405c;
}

.color-box {
  width: 20px;
  height: 12px;
  border-radius: 4px;
}

.balance-color {
  background: #2563eb;
}

.interest-color {
  background: #16a34a;
}

.balances-section {
  background: white;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #d9e2ef;
}

.balances-section h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #1e3a5f;
}

.balances-table {
  width: 100%;
  border-collapse: collapse;
}

.balances-table th {
  background: #e1eaf3;
  padding: 14px 16px;
  text-align: left;
  font-weight: 600;
  color: #1a3349;
  font-size: 0.95rem;
}

.balances-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e9eef3;
  color: #2c405c;
}

.balances-table tr:last-child td {
  border-bottom: none;
}

.related-tools {
  margin: 32px 0 28px;
  padding: 18px 0;
  border-top: 2px solid #dde3ea;
  border-bottom: 2px solid #dde3ea;
  font-size: 1.1rem;
}

.related-label {
  font-weight: 600;
  margin-right: 18px;
  color: #0f2a40;
}

.related-tools a {
  color: #1f4a7a;
  text-decoration: none;
  margin: 0 6px;
}

.related-tools a:hover {
  text-decoration: underline;
}

.sep {
  color: #9aa9b9;
}

.faq-section {
  margin-top: 28px;
  background: #f3f7fc;
  border-radius: 30px;
  padding: 32px;
}

.faq-section h2 {
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 28px;
  color: #0b2b44;
}

.faq-item {
  background: white;
  border-radius: 24px;
  padding: 24px 28px;
  margin-bottom: 20px;
  border: 1px solid #c9d9ec;
}

.faq-item h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 16px;
  color: #1e3a5f;
}

.faq-item p {
  margin: 12px 0;
  line-height: 1.6;
  color: #253c54;
}

.faq-item ul {
  margin: 12px 0;
  padding-left: 24px;
}

.faq-item li {
  margin-bottom: 8px;
  line-height: 1.5;
  color: #2c405c;
}

@media (max-width: 800px) {
  .annuity-payout-calculator {
    padding: 20px;
  }
  
  .form-row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .form-row label {
    width: 100%;
  }
  
  .input-with-symbol {
    max-width: 100%;
    width: 100%;
  }
  
  .form-row input[type="number"] {
    width: 100%;
  }
  
  .chart {
    flex-direction: column;
    height: auto;
  }
  
  .y-axis {
    flex-direction: row;
    border-right: none;
    border-bottom: 2px solid #cbd5e1;
    padding-bottom: 8px;
    margin-bottom: 8px;
  }
  
  .x-axis {
    padding-left: 0;
  }
  
  .balances-table {
    font-size: 0.9rem;
  }
  
  .balances-table th,
  .balances-table td {
    padding: 8px;
  }
}
</style>