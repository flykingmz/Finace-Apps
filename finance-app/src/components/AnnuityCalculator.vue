<template>
  <div class="annuity-calculator-app">
    <!-- Header -->
    <h1 class="main-title">Annuity Calculator</h1>
    <p class="description">
      Use this calculator to project the growth of an annuity based on your initial deposit, regular contributions,
      expected return, and time horizon. Results show the accumulation schedule monthly or annually.
    </p>

    <!-- Calculator Form - 完全按照附件1样式 -->
    <div class="calculator-form">
      <h2>Annuity Calculator</h2>
      
      <div class="form-row">
        <label>Initial deposit</label>
        <div class="input-with-symbol">
          <span class="currency-symbol">$</span>
          <input type="number" v-model.number="form.initialDeposit" @input="calculate" />
        </div>
      </div>

      <div class="form-row">
        <label>Annual contribution amount</label>
        <div class="input-with-symbol">
          <span class="currency-symbol">$</span>
          <input type="number" v-model.number="form.annualContribution" @input="calculate" />
        </div>
      </div>

      <div class="form-row">
        <label>Annual increase of contribution</label>
        <div class="input-with-symbol">
          <input type="number" step="0.1" v-model.number="form.contributionIncrease" @input="calculate" />
          <span class="percent-symbol">%</span>
        </div>
      </div>

      <div class="form-row">
        <label>Annual return</label>
        <div class="input-with-symbol">
          <input type="number" step="0.1" v-model.number="form.annualReturn" @input="calculate" />
          <span class="percent-symbol">%</span>
        </div>
      </div>

      <div class="form-row">
        <label>Number of years</label>
        <input type="number" v-model.number="form.years" @input="calculate" />
      </div>

      <div class="form-actions">
        <button @click="calculate">Calculate</button>
        <button class="clear" @click="clearForm">Clear</button>
      </div>
    </div>

    <!-- Results Section - 完全按照附件2样式 -->
    <div class="results-section" v-if="results.length > 0">
      <h2>Accumulation Schedule</h2>
      
      <!-- Tab buttons for Annual/Monthly view -->
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

      <!-- Summary numbers -->
      <div class="summary-numbers">
        <div class="summary-item">
          <span class="summary-label">Starting amount:</span>
          <span class="summary-value">${{ formatNumber(form.initialDeposit) }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Total contributions:</span>
          <span class="summary-value">${{ formatNumber(totalContributions) }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Total interest earned:</span>
          <span class="summary-value">${{ formatNumber(totalInterest) }}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Ending balance:</span>
          <span class="summary-value ending-balance">${{ formatNumber(endingBalance) }}</span>
        </div>
      </div>

      <!-- Table for Annual Schedule -->
      <div v-if="scheduleView === 'annual'" class="schedule-table">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Addition</th>
              <th>Return</th>
              <th>Ending balance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in annualSchedule" :key="index">
              <td>{{ row.year }}</td>
              <td>${{ formatNumber(row.addition) }}</td>
              <td>${{ formatNumber(row.returnAmt) }}</td>
              <td>${{ formatNumber(row.endingBalance) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Table for Monthly Schedule -->
      <div v-if="scheduleView === 'monthly'" class="schedule-table">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Month</th>
              <th>Addition</th>
              <th>Return</th>
              <th>Ending balance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in monthlySchedule" :key="index">
              <td>{{ row.year }}</td>
              <td>{{ row.month }}</td>
              <td>${{ formatNumber(row.addition) }}</td>
              <td>${{ formatNumber(row.returnAmt) }}</td>
              <td>${{ formatNumber(row.endingBalance) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Note about rounding -->
      <p class="table-note">* Values are rounded to nearest dollar. Actual results may vary.</p>
    </div>

    <!-- Related Tools -->
    <div class="related-tools">
      <span class="related-label">Related:</span>
      <a href="/retirement">Retirement Calculator</a> <span class="sep">|</span>
      <a href="#">Annuity Payout Calculator</a>
    </div>

    <!-- FAQ Section - 全部展开，不需要点击 -->
    <div class="faq-section">
      <h2>Annuity Information – FAQ</h2>
      
      <div class="faq-item">
        <h3>What is an annuity?</h3>
        <p>In the U.S., an annuity is a contract for a fixed sum of money usually paid by an insurance company to an investor in a stream of cash flows over a period of time, typically as a means of saving for retirement. In many cases, this sum is paid annually over the duration of the investor's life. The investor, or annuity owner, is usually the policyholder and is often also the annuitant (the beneficiary (or beneficiaries) of the annuity whose life expectancy and age are used to determine the terms of the annuity). The owner controls incidents of ownership in the annuity, has the right to the cash surrender value, and can also assign the policy and make withdrawals. Insurance companies that offer annuities pay a specific amount over a predetermined period of time either as an immediate annuity (beginning immediately) or as a deferred annuity (after an accumulation phase). Earnings in annuities grow and compound, tax-deferred, which means that the payment of taxes is reserved for a future time.</p>
      </div>

      <div class="faq-item">
        <h3>Why do people use annuities?</h3>
        <p>Most people use annuities as supplemental investments in combination with other investments such as IRAs, 401(k)s, or other pension plans. Many people find that as they get older, investment options with tax shields approach or reach their contribution limits. As a result, conservative investment options can be sparse, and buying an annuity can be a viable alternative. Annuities can also be helpful for those seeking to diversify their retirement portfolios. The majority of annuity investments are made by investors looking to ensure that they are provided for later in life. In general, annuities make sense for some, but not all. It is important for each individual to evaluate their specific situations or consult professionals.</p>
      </div>

      <div class="faq-item">
        <h3>What are the pros and cons of annuities?</h3>
        <p><strong>Pros:</strong> For deferred annuities, similar to 401(k)s or traditional IRAs, there are tax benefits associated with building capital by deferring the payment of taxes. Unlike other retirement plans, there is no limit to the amount that can be invested in an annuity. Certain annuities can provide guaranteed, predictable income with minimum risk, which can make them attractive to highly conservative investors. For example, a retiree who is more concerned about outliving their assets than receiving the highest returns possible may find annuities appealing. Annuities can be used as a regulated stream of income, which can make it easier for a person to manage their assets in a way that ensures that those assets last for the duration of their lifetime. For instance, a heavy spender who suddenly receives a large inheritance can use an annuity to reduce the risk of overspending and depleting their assets.</p>
        <p><strong>Cons:</strong> Certain annuity features such as surrender charges implemented by insurance companies, or early withdrawal penalties implemented by the IRS, reduce liquidity. Annuities are not liquid financial assets unless the investor is willing to pay a hefty surrender charge. Investors who are prone to moving money around may want to avoid annuities for this reason. Also, once annuitization begins, marking the transition from contribution to distribution, the action generally can't be reversed. Annuities tend to have complicated tax and withdrawal rules. Each annuity product can have many different rules laid out in their respective contracts, and it is up to each investor to make sure they are operating accordingly and within legal bounds. Annuities also have relatively high fees, with some commissions as high as 10%. If there is no commission fee visible on a statement, it may not mean that there is no commission involved in the sale of an annuity; the fee may be hidden in the annuity's operating costs. On top of that, many annuities (mostly of the variable variety) charge annual fees. Annuities normally have low returns. A study of fixed indexed annuities found that their average annualized return rate was 3.27%, which is less than the frequently cited 7% historical return rate of the stock market. This figure generally falls within the ballpark of bond interest rates because insurance companies typically invest up to 70% of their capital in fixed income forms such as corporate bonds. Annuities may not have the higher return rates associated with equities, as observed here, but there is less volatility and risk involved. They sit in a middle category that is below equities but above treasury bills and savings accounts, which generates conservative return rates just above inflation.</p>
      </div>

      <div class="faq-item">
        <h3>What is the difference between fixed, variable, and indexed annuities?</h3>
        <p><strong>Fixed Annuities:</strong> Fixed annuities pay out a guaranteed amount after a certain date, and a return rate is largely dependent on market interest rates at the time the annuity contract is signed. In theory, high interest rate environments allow for higher rate fixed annuities (annuity investors make more money). However, the value of existing, already issued fixed-rate annuities is not impacted by changes in interest rates. Most do not have cost-of-living adjustments (COLA), and as a result, their real purchasing power may decline with time. Unless insurance companies go bankrupt, fixed annuities promise the return of principal. As a result, they are commonly used by retirees to guarantee themselves a steady income for the rest of their lives. They also tend to be useful for more conservative investors or people who want a way to control their spending through regulated, steady cash flows.</p>
        <p><strong>Variable Annuities:</strong> Unlike fixed annuities, variable annuities pay out a fluctuating amount based on the investment performance of assets (usually mutual funds) in an annuity. This type of annuity allows the most flexibility in terms of where investments can go, such as large-cap stocks, foreign stocks, bonds, and money market instruments. As a result, this type of annuity requires that an investor spend some time managing these investments. It is important to note that variable annuities do not guarantee the return of principal. Because the funds are invested in assets that fluctuate in value, it is possible for the total value of assets in a variable annuity to be lower than the principal. Investors who cannot take on this risk are probably better off with a fixed annuity. Keep in mind that variable annuities have some of the highest fees in the financial industry.</p>
        <p><strong>Indexed Annuities:</strong> An indexed annuity, sometimes called an equity-indexed annuity, combines aspects of both fixed and variable annuities, though they are defined as a fixed annuity by legal statute. They pay out a guaranteed minimum such as a fixed annuity does, but a portion of it is also tied to the performance of the investments within, which is similar to a variable annuity. Unlike variable annuities, which allow the investor to pick and choose investments or asset allocations, indexed annuities are generally only offered as part of major financial indices such as the Standard and Poor's 500 (S&P 500). If an index of an indexed annuity doesn't receive enough positive growth, the annuity investor will receive a guaranteed minimum interest return at the bare minimum. The crediting formulas of indexed annuities generally have some type of limiting factor that is intended to cause interest earnings to be based only on a portion of the change in whatever index it is tied to. In other words, while the index of an index annuity may have a 15% return during a year, the indexed annuity may only payout 10% of returns that year to its investor because of a cap placed on gains. Clearly, there is a tradeoff between added guarantees and receiving 100% of market gains (most variable annuities receive 100%).</p>
      </div>

      <div class="faq-item">
        <h3>What is the difference between immediate and deferred annuities?</h3>
        <p><strong>Immediate Annuities:</strong> An immediate annuity involves an upfront premium that is paid out from the principal fairly early, anywhere from as early as the next month to no later than a year after the initial premium is received. This means that, for the most part, immediate annuities will not have accumulation phases. An immediate annuity primarily serves as a great way to guarantee a fixed stream of predictable income for retirement. Immediate annuities are most popular among people who are already retired, are retiring in the near future, want to receive a steady payout for life, or who like the idea of guaranteed predictability.</p>
        <p><strong>Deferred Annuities:</strong> A deferred annuity is one that is built over time with tax shields. Usually, deposits are made over many years (though deposits can be made as a lump sum) until a specific date at which the total is taken over by the annuity issuer, probably an insurance company, and an income stream is provided. The advantage of a deferred annuity, as compared to an immediate annuity, is that taxes on built capital are deferred. This allows earnings to grow tax-free. However, after annuitization (when it is converted from a deferred annuity to an income stream), earnings become taxable. Investors will need to wait until at least age 59 ½ or older before they can start the payout phase. Otherwise, there will be a 10% early withdrawal penalty enforced by the IRS. Deferred annuities are common among people who want to save for retirement relatively early, are content with not receiving funds until age 59 ½ or older, want to earn tax-deferred interest, or want to save more than the limits imposed by their IRAs or 401(k)s.</p>
      </div>

      <div class="faq-item">
        <h3>What does it mean to surrender an annuity?</h3>
        <p>Canceling an annuity contract is called surrendering an annuity. Most insurance companies charge a surrender fee if canceled within the first 5 to 9 years of ownership. In general, the shorter an annuity is owned, the higher the surrender fee. As an example, if an annuity contract has an eight-year surrender period, it's quite possible to have to pay eight percent of the value of the investment if it is surrendered within the first year. The second year would be seven percent, and so on. Surrender fee schedules will most likely start on the initial date of the contract and not on subsequent deposits to the same annuity, though some calculate it based on each premium payment during the surrender period. When surrendering annuities, other penalties may also be applied, such as a 10% IRS penalty. Although an annuity is a contract that generally does not allow for a lot of flexibility, in most cases, they come with a free-look provision that allows new holders to terminate their policies without paying surrender charges. This is usually allowable within the first 10 to 30 days of signing the contract.</p>
      </div>

      <div class="faq-item">
        <h3>What fees are associated with annuities?</h3>
        <p>Like most financial products, annuities have certain associated fees. These fees are sometimes called basis points. The number of basis points reflects a percentage of the investment. For instance, 100 basis points would be 1% of an investment, while 115 basis points would be 1.15%. Different annuities have different fees, but most of the fees below pertain specifically to variable annuities, which generally have more fees due to their more complex nature.</p>
        <ul>
          <li><strong>Surrender Charges:</strong> This only applies when canceling or "surrendering" an annuity. In most cases, it only applies to the beginning 5 to 9 years of the life of an annuity, but some plans may be subject to a surrender charge for as long as 15 to 20 years. For some policies, the surrender charge may decline over the years. It is possible to find annuities that don't have surrender charges, but these likely require higher annual expenses. Surrender charges can also be called contingent deferred sales charges or back-end sales load.</li>
          <li><strong>Administrative Charges:</strong> These are used to cover the cost of mailings and ongoing service. It can range anywhere from 0.10% to 0.30% of the policy value per year.</li>
          <li><strong>Commissions:</strong> Annuities are generally sold by insurance brokers who charge a fee of anywhere from 1% for the most basic annuity to as much as 10% for complex annuities indexed to the stock market. In general, the simpler the annuity structure or the shorter the surrender charge period, the lower the commission. For example, a variable annuity with a 10-year surrender charge period will pay a higher commission than one with a 5-year surrender charge, which results in a higher commission fee for the investor. In general, commissions for variable annuities average around 4% to 7%, while immediate annuities average from 1% to 3%.</li>
          <li><strong>Investment Management Fees:</strong> Similar to management fees paid to portfolio managers of mutual funds and ETFs, variable annuity investments also require fees to pay portfolio managers.</li>
          <li><strong>Mortality and Expense Fee:</strong> This is a fee the insurance company charges for providing lifetime income and a death benefit during the accumulation phase. This fee usually ranges from 0.40% to 1.75% a year. In general, a person purchasing an annuity at a younger age will benefit from reduced mortality fees.</li>
          <li><strong>Rider Charges:</strong> An annuity rider is an amendment to an annuity contract that has the effect of either expanding or restricting the policy's benefits or excluding certain conditions from coverage. A popular example is an income rider; in the case of dramatic drops in the value of mutual fund investments in an annuity, an income rider prevents it from falling below a guaranteed amount. Another common rider is an annual increase rider that increases payment each year by a predetermined percent, usually 1% to 5%, in order to keep pace with inflation. Other examples include a long-term care rider that covers nursing home costs or a legacy through a guaranteed death benefit. While riders are entirely optional add-ons that add specific features to annuities, they are not free, and each will tack on additional fees to an annuity. While rider charges were initially created for variable annuities, they can also be purchased today for fixed or indexed annuities.</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>Can I roll over my 401(k) or IRA into an annuity?</h3>
        <p>It is possible to roll over qualified retirement plans like 401(k)s and IRAs into annuities tax-free. After all, these retirement savings accounts do have the primary purpose of providing income in retirement. Annuities can help dictate how retirees live in accordance with their funds or at least make their future income streams more predictable through fixed annuities. As a result, annuities can act as a sort of insurance for guaranteed income in retirement. The resulting annuities are classified as "qualified annuities," which means they are funded with pretax money. Several things to keep in mind: While transfers aren't taxable, they must still be reported on tax returns for that year. Only one IRA rollover to another account can be completed within any one-year period. When rolling into an annuity, remember to complete the transaction within 60 days. Any amount not rolled over is taxable as ordinary income. For more information about or to do calculations involving retirement, IRAs, or 401(k)s, please visit the Retirement Calculator, Roth IRA Calculator, IRA Calculator, or 401K Calculator.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnnuityCalculator',
  data() {
    return {
      // 表单数据 - 初始值与附件图片一致
      form: {
        initialDeposit: 10000,
        annualContribution: 2000,
        contributionIncrease: 5,
        annualReturn: 7,
        years: 10
      },
      // 视图选择: annual 或 monthly
      scheduleView: 'annual',
      // 计算结果数据
      results: [],
      totalContributions: 0,
      totalInterest: 0,
      endingBalance: 0
    };
  },
  computed: {
    // 年度时间表 (每年一行)
    annualSchedule() {
      return this.results;
    },
    
    // 月度时间表 (每年12行)
    monthlySchedule() {
      const monthly = [];
      
      if (!this.results.length) return monthly;
      
      // 基于年度数据生成月度明细
      let balance = this.form.initialDeposit;
      const monthlyReturn = Math.pow(1 + this.form.annualReturn / 100, 1/12) - 1;
      
      for (let year = 1; year <= this.form.years; year++) {
        // 计算当年度的年化贡献金额
        const annualContrib = this.form.annualContribution * 
          Math.pow(1 + this.form.contributionIncrease / 100, year - 1);
        
        // 月度贡献 (假设每月均匀投入)
        const monthlyContrib = annualContrib / 12;
        
        for (let month = 1; month <= 12; month++) {
          // 月度贡献
          balance += monthlyContrib;
          
          // 月度回报
          const returnAmt = balance * monthlyReturn;
          balance += returnAmt;
          
          monthly.push({
            year: year,
            month: month,
            addition: Math.round(monthlyContrib),
            returnAmt: Math.round(returnAmt),
            endingBalance: Math.round(balance)
          });
        }
      }
      
      return monthly;
    }
  },
  methods: {
    // 主要计算逻辑
    calculate() {
      // 确保数值有效
      const initial = Number(this.form.initialDeposit) || 0;
      const annualBase = Number(this.form.annualContribution) || 0;
      const increaseRate = (Number(this.form.contributionIncrease) || 0) / 100;
      const returnRate = (Number(this.form.annualReturn) || 0) / 100;
      const years = Number(this.form.years) || 1;
      
      let balance = initial;
      let totalAdditions = 0;
      let totalInterestEarned = 0;
      
      const schedule = [];
      
      for (let year = 1; year <= years; year++) {
        // 计算当年度的贡献金额 (考虑年度递增)
        const annualContrib = annualBase * Math.pow(1 + increaseRate, year - 1);
        
        // 假设贡献在年初一次性投入
        balance += annualContrib;
        totalAdditions += annualContrib;
        
        // 计算年度回报
        const yearReturn = balance * returnRate;
        balance += yearReturn;
        totalInterestEarned += yearReturn;
        
        schedule.push({
          year: year,
          addition: Math.round(annualContrib),
          returnAmt: Math.round(yearReturn),
          endingBalance: Math.round(balance)
        });
      }
      
      this.results = schedule;
      this.totalContributions = Math.round(totalAdditions);
      this.totalInterest = Math.round(totalInterestEarned);
      this.endingBalance = Math.round(balance);
    },
    
    // 清除表单并重新计算
    clearForm() {
      this.form = {
        initialDeposit: 10000,
        annualContribution: 2000,
        contributionIncrease: 5,
        annualReturn: 7,
        years: 10
      };
      this.calculate();
    },
    
    // 格式化数字显示 (带千位分隔符)
    formatNumber(value) {
      if (value === undefined || value === null) return '0';
      return Math.round(value).toLocaleString('en-US');
    }
  },
  mounted() {
    // 初始化计算
    this.calculate();
  },
  watch: {
    // 监听所有表单字段变化，自动重新计算
    'form.initialDeposit': 'calculate',
    'form.annualContribution': 'calculate',
    'form.contributionIncrease': 'calculate',
    'form.annualReturn': 'calculate',
    'form.years': 'calculate'
  }
};
</script>

<style scoped>
.annuity-calculator-app {
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

/* Calculator Form - 附件1样式 */
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

.form-row {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.form-row label {
  width: 240px;
  font-weight: 500;
  color: #1a3349;
  font-size: 1.05rem;
}

.input-with-symbol {
  display: flex;
  align-items: center;
  gap: 4px;
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

.form-row input {
  padding: 12px 16px;
  border: 1px solid #b6c9dd;
  border-radius: 30px;
  font-size: 1rem;
  width: 180px;
  background: white;
  transition: border-color 0.2s;
}

.form-row input:focus {
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

/* Results Section - 附件2样式 */
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

.schedule-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.tab-btn {
  background: white;
  border: 1px solid #cbd5e1;
  color: #334e6e;
  padding: 10px 28px;
  border-radius: 40px;
  font-size: 1rem;
}

.tab-btn.active {
  background: #1f3a5f;
  color: white;
  border-color: #1f3a5f;
}

.summary-numbers {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  background: white;
  border-radius: 24px;
  padding: 20px 28px;
  margin-bottom: 28px;
  border: 1px solid #d9e2ef;
}

.summary-item {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.summary-label {
  font-weight: 500;
  color: #4b5f73;
}

.summary-value {
  font-size: 1.2rem;
  font-weight: 600;
  color: #0b2b44;
}

.summary-value.ending-balance {
  color: #16a34a;
  font-size: 1.3rem;
}

.schedule-table {
  background: white;
  border-radius: 20px;
  overflow-x: auto;
  border: 1px solid #dde3ea;
}

.schedule-table table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.schedule-table th {
  background: #e1eaf3;
  padding: 14px 16px;
  text-align: left;
  font-weight: 600;
  color: #1a3349;
  font-size: 0.95rem;
}

.schedule-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e9eef3;
  color: #2c405c;
}

.schedule-table tr:last-child td {
  border-bottom: none;
}

.schedule-table tr:hover td {
  background: #f6faff;
}

.table-note {
  margin-top: 16px;
  font-size: 0.9rem;
  color: #64748b;
  font-style: italic;
}

/* Related Tools */
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

/* FAQ Section - 全部展开 */
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

/* Responsive adjustments */
@media (max-width: 700px) {
  .annuity-calculator-app {
    padding: 20px;
  }
  
  .form-row label {
    width: 100%;
  }
  
  .summary-numbers {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
