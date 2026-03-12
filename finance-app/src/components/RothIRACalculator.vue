<template>
  <div class="roth-ira-calculator">
    <!-- Header -->
    <h1 class="main-title">Roth IRA Growth Calculator</h1>
    <p class="description">
      This Roth IRA Calculator helps you estimate the future value of your Roth IRA retirement savings based on your annual contributions, investment returns, and time horizon. Because Roth IRA withdrawals in retirement are generally tax-free, understanding how your contributions grow over time can help you plan a more effective retirement strategy. Use this calculator to project how much your Roth IRA could be worth by the time you retire.
    </p>

    <!-- Calculator Form - 附件1样式 -->
    <div class="calculator-form">
      <h2>Roth IRA Calculator</h2>

      <!-- Current Balance -->
      <div class="form-row">
        <label>Current balance</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input
              type="number"
              v-model.number="form.currentBalance"
              @input="calculate"
              min="0"
              step="1000"
              placeholder="30000"
            />
          </div>
        </div>
      </div>

      <!-- Annual Contribution -->
      <div class="form-row">
        <label>Annual contribution?</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input
              type="number"
              v-model.number="form.annualContribution"
              @input="calculate"
              min="0"
              step="500"
              placeholder="7500"
              :disabled="form.maximizeContributions"
            />
          </div>
        </div>
      </div>

      <!-- Maximize Contributions? -->
      <div class="form-row radio-row">
        <label>Maximize contributions?</label>
        <div class="radio-group">
          <label class="radio-label">
            <input
              type="radio"
              value="yes"
              v-model="form.maximizeOption"
              @change="toggleMaximize"
            />
            <span>Yes</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              value="no"
              v-model="form.maximizeOption"
              @change="toggleMaximize"
            />
            <span>No</span>
          </label>
        </div>
      </div>

      <!-- Expected Rate of Return -->
      <div class="form-row">
        <label>Expected rate of return?</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <input
              type="number"
              step="0.1"
              v-model.number="form.returnRate"
              @input="calculate"
              min="0"
              max="30"
              placeholder="6"
            />
            <span class="percent-symbol">%</span>
          </div>
        </div>
      </div>

      <!-- Current Age -->
      <div class="form-row">
        <label>Current age</label>
        <div class="input-wrapper">
          <input
            type="number"
            v-model.number="form.currentAge"
            @input="calculate"
            min="0"
            max="100"
            step="1"
            placeholder="30"
          />
        </div>
      </div>

      <!-- Retirement Age -->
      <div class="form-row">
        <label>Retirement age</label>
        <div class="input-wrapper">
          <input
            type="number"
            v-model.number="form.retirementAge"
            @input="calculate"
            min="0"
            max="100"
            step="1"
            placeholder="65"
          />
        </div>
      </div>

      <!-- Marginal Tax Rate -->
      <div class="form-row">
        <label>Marginal tax rate?</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <input
              type="number"
              step="0.1"
              v-model.number="form.taxRate"
              @input="calculate"
              min="0"
              max="50"
              placeholder="25"
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
      <h2>Result</h2>

      <!-- Comparison Table -->
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Roth IRA</th>
              <th>Taxable account</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Balance at age {{ form.retirementAge }}</td>
              <td>${{ formatMoney(results.rothBalance) }}</td>
              <td>${{ formatMoney(results.taxableBalance) }}</td>
            </tr>
            <tr>
              <td>Total principal</td>
              <td>${{ formatMoney(results.totalPrincipal) }}</td>
              <td>${{ formatMoney(results.totalPrincipal) }}</td>
            </tr>
            <tr>
              <td>Total interest</td>
              <td>${{ formatMoney(results.rothInterest) }}</td>
              <td>${{ formatMoney(results.taxableInterest) }}</td>
            </tr>
            <tr class="total-tax">
              <td>Total tax</td>
              <td>${{ formatMoney(0) }}</td>
              <td>${{ formatMoney(results.totalTax) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Summary Message -->
      <div class="summary-message">
        <p>
          According to provided information, the Roth IRA account can accumulate 
          <strong>${{ formatMoney(results.difference) }} more</strong> than a regular 
          taxable account by age {{ form.retirementAge }}.
        </p>
      </div>

      <!-- Balance Accumulation Graph - 附件4样式 -->
      <div class="graph-section">
        <h3>Balance Accumulation Graph</h3>
        <div class="chart-container">
          <canvas ref="balanceChart" id="balanceChart" width="800" height="400"></canvas>
        </div>
        <div class="chart-legend">
          <span class="legend-item"><span class="color-box" style="background: #2563eb;"></span> Roth IRA</span>
          <span class="legend-item"><span class="color-box" style="background: #16a34a;"></span> Taxable account</span>
          <span class="legend-item"><span class="color-box" style="background: #eab308;"></span> Principal</span>
        </div>
        <div class="chart-axis">
          <span class="x-axis-label">X-axis: Age</span>
          <span class="y-axis-label">Y-axis: Amount (in $1M)</span>
        </div>
      </div>
    </div>

    <!-- Annual Schedule Section - 附件3样式 -->
    <div class="schedule-section" v-if="results.calculated">
      <h3>Annual Schedule</h3>
      
      <div class="schedule-table-wrapper">
        <div class="schedule-table">
          <table>
            <thead>
              <tr>
                <th rowspan="2">Age</th>
                <th colspan="2">Principal</th>
                <th colspan="2">Roth IRA</th>
                <th colspan="2">Taxable account</th>
              </tr>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Start</th>
                <th>End</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in results.annualSchedule" :key="index">
                <td>{{ row.age }}</td>
                <td>${{ formatMoney(row.principalStart) }}</td>
                <td>${{ formatMoney(row.principalEnd) }}</td>
                <td>${{ formatMoney(row.rothStart) }}</td>
                <td>${{ formatMoney(row.rothEnd) }}</td>
                <td>${{ formatMoney(row.taxableStart) }}</td>
                <td>${{ formatMoney(row.taxableEnd) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Related Tools -->
    <div class="related-tools">
      <span class="related-label">Related:</span>
      <a href="/retirement">Retirement Calculator</a> <span class="sep">|</span>
      <a href="/investment">Investment Calculator</a> <span class="sep">|</span>
      <a href="/annuity-payout">Annuity Payout Calculator</a>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h2>Roth IRA Information – FAQ</h2>

      <div class="faq-item">
        <h3>What is a Roth IRA?</h3>
        <p>A Roth IRA is a type of Individual Retirement Arrangement (IRA) that provides tax-free growth and tax-free income in retirement. The major difference between Roth IRAs and traditional IRAs is that contributions to the former are not tax-deductible, and contributions (not earnings) may be withdrawn tax-free at any time without penalty. Roth IRA was first introduced and established by the Taxpayer Relief Act of 1997 and is named after Senator William Roth.</p>
        <p>Roth IRA accounts can be opened at many different institutions, from the largest, most well-known financial companies, to online-only investment companies and financial service firms. The IRS regulates all of these institutions, and all of them must meet certain requirements, but each can still have its own differentiating perks.</p>
      </div>

      <div class="faq-item">
        <h3>What are the contribution rules for a Roth IRA?</h3>
        <p>• Made using after-tax dollars.</p>
        <p>• Not tax-deductible. However, there is a tax credit, the Saver's Tax Credit, on IRS Form 8880 that can be claimed for up to 50% on the first $2,000 in contributions.</p>
        <p>• Contributions can be withdrawn tax-free at any time without penalty. However, earnings withdrawn may be subject to tax and/or penalty if withdrawn before the account holder is 59½ years old or if the account is less than five years old.</p>
        <p>• People with incomes above certain thresholds cannot qualify to make Roth IRA contributions. For the 2026 tax year, the threshold is anything above an adjusted gross income of $168,000 (up from $165,000 in 2025) for those filing as single or head-of-household. For those who are married and filing jointly, the amount is increased to an adjusted gross income of $252,000 (up from $246,000 in 2025). Furthermore, to qualify to make Roth IRA contributions, filers must have earned income (i.e. wages, tips, bonuses, self-employment income) in the year contributions are made.</p>
        <p>• The contribution limit in 2026 for those aged 49 and below is $7,500. For those aged 50 and above, the limit is $8,600.</p>
        <p>• Contributions for a given tax year can be made to a Roth IRA up until taxes are filed in April of the next year.</p>
      </div>

      <div class="faq-item">
        <h3>What are the distribution rules for a Roth IRA?</h3>
        <p>• Direct contributions can be withdrawn tax-free and penalty-free anytime.</p>
        <p>• Concerning Roth IRAs five years or older, tax-free and penalty-free withdrawal on earnings can occur after the age of 59 ½.</p>
        <p>• Withdrawals on earnings from Roth IRAs that are less than five years old are subject to both taxes and penalties. However, given a number of situations (listed below), it is possible to avoid a penalty, but not the taxes, on accounts less than five years old as long as any one (or more) of the conditions below is met. For accounts older than five years old, these same conditions apply and result in a tax only if none of the conditions are met, or neither a tax nor a penalty if any one of the conditions is met.</p>
        <p>The account holder is 59 ½ or older.</p>
        <p>The account holder becomes disabled.</p>
        <p>The money is being used:</p>
        <p>  - for a first-time home purchase up to a $10,000 lifetime maximum.</p>
        <p>  - to pay for qualified education expenses.</p>
        <p>  - to pay the beneficiary after the death of the account holder.</p>
        <p>  - to pay for unreimbursed medical expenses or health insurance during unemployment.</p>
        <p>• There is no required minimum distribution (RMD) for Roth IRAs (unlike those required for traditional IRAs or 401(k)s). Roth IRAs are the only tax-sheltered retirement plans that do not impose RMDs.</p>
      </div>

      <div class="faq-item">
        <h3>What are the pros of a Roth IRA?</h3>
        <p><strong>Free withdrawals on contributions</strong> – Common retirement plans such as 401(k)s and traditional IRAs do not allow tax-free or penalty-free withdrawals until retirement, which for many, is usually decades in the future. However, because contributions to Roth IRAs are made using after-tax dollars, the contributions (but not the earnings) can be withdrawn at any time tax-free and penalty-free.</p>
        <p><strong>Liquidity</strong> – account holders can use their Roth IRA accounts as a source of emergency funds. Because withdrawals on contributions are tax-free and penalty-free, money can be withdrawn at will. However, if an account holder decides to withdraw their contribution after the annual contribution limit has been met, they cannot re-contribute that same amount within the same tax year. Under these circumstances, any contributed amount would be treated as a regular investment in addition to, rather than as part of the Roth IRA.</p>
        <p><strong>Tax-Free Retirement Income</strong> – Distributions or withdrawals during retirement are not taxed because the taxes were already paid upfront.</p>
        <p><strong>Many investment options</strong> – Roth IRAs are available from most large financial institutions. Most, if not all, investment options are only limited by what is offered through each financial institution.</p>
        <p><strong>Not reported on FAFSA</strong> – For parents, an advantage of the Roth IRA is that the funds are not subject to reporting on the Free Application for Federal Student Aid, or FAFSA. This is highly beneficial because it does not reduce the federal aid that their children can receive for higher education. In addition, contributions can be withdrawn later to pay for qualified education expenses without it being counted as a reportable asset on the FAFSA form.</p>
        <p><strong>Heir-friendly</strong> – Because contributions are already taxed, when an heir inherits a Roth IRA, required distributions will not be taxed. Surviving spouses receive the same benefit, but they are not required to take distributions immediately. Also, because there are no taxes owed on Roth IRA contributions, setting aside as much as possible in a Roth IRA can help reduce the size of a taxable estate, leaving more money for heirs.</p>
        <p><strong>Tax diversification in retirement</strong> – Retirees are required to pay taxes on distributions from retirement plans such as a 401(k) or traditional IRA, as well as for Social Security. Retirees can strategize just how much they take from these taxable income sources. Roth IRA distributions can also be used in cases where the use of other income sources would bump a person into a higher tax bracket (because they don't count as taxable income).</p>
      </div>

      <div class="faq-item">
        <h3>What are the cons of a Roth IRA?</h3>
        <p><strong>Taxes are paid upfront</strong> – Contributions are made with after-tax dollars.</p>
        <p><strong>Low contribution limit</strong> – The annual IRA contribution limit for the 2026 tax year is $7,500 for those under the age of 50 or $8,600 for those 50 and older. In comparison, the 401(k) contribution limit is $24,500 a year.</p>
        <p><strong>Income limit</strong> – The income limit disqualifies high income earners from participating in Roth IRAs. As mentioned before, the limits are adjusted gross incomes of $168,000 for individuals or $252,000 for married couples filing jointly in 2026. Anyone with earnings above these figures cannot contribute to Roth IRA accounts. It is possible, though not simple, for these individuals to contribute to a traditional IRA and then convert it to a Roth IRA.</p>
        <p><strong>Does not reduce taxable income</strong> – Because only after-tax dollars go into Roth IRAs, there is no initial taxes reduction on taxable income. However, low- and middle-income taxpayers can use the Saver's Credit for tax savings between 10% and 50% of the first $2,000 contributed to a Roth IRA. This tax credit is non-refundable.</p>
        <p><strong>Minimum holding period</strong> – Tax-free withdrawals on earnings in retirement cannot be made unless funds in the account have been held for at least five years, though this only applies to people who start Roth IRAs near retirement. The point at which this period begins is largely dependent on whether the distributions are qualified or non-qualified. For qualified distributions, this period begins the first day of the first year in which the Roth IRA was funded. For non-qualified distributions, there are separate five-year periods for each Roth IRA conversion. Each begins the first day of the year in which the conversion is made.</p>
        <p><strong>Charitable donations</strong> – Account holders that plan on leaving their assets to charitable organizations would benefit less if most of their funds were placed in a Roth IRA. Because charities are tax-sheltered entities, contributions with after-tax dollars will be lower than contributions from tax-deferred retirement plans such as traditional IRAs or 401(k)s.</p>
      </div>

      <div class="faq-item">
        <h3>How can I convert a traditional IRA into a Roth IRA?</h3>
        <p>The IRS allows people to convert a traditional IRA into a Roth IRA, which a person may want to do under certain circumstances.</p>
        <p>• People who can't directly contribute to a Roth IRA due to the income limits can move funds they have in a Traditional IRA into a Roth IRA, regardless of income.</p>
        <p>• Traditional IRA account holders can roll as much money as they want from an existing traditional IRA into a Roth IRA, ignoring the yearly contribution limits.</p>
        <p>• Similar to choosing between a tax-deferred or tax-sheltered account, if there is reason to believe that income tax will increase in the future, converting a traditional IRA to a Roth IRA will relieve the payment of high future taxes.</p>
        <p>• While traditional IRAs have required minimum distributions starting at 73 years old or later when they officially retire, Roth IRAs don't. Therefore, a person who expects to live longer may want to convert their existing traditional IRA into a Roth IRA in order to start distributions at a later age.</p>
        <p>This is sometimes referred to as a "backdoor Roth IRA." Fortunately, there are no income limits regarding conversions. There are three different ways to go about a conversion. The following are some conversion methods:</p>
        <p><strong>Method 1 – Same trustees</strong> – The easiest method will be to make a transfer from a traditional to a Roth IRA within the same financial institution that holds the funds.</p>
        <p><strong>Method 2 – Different trustees</strong> – There are many reasons why using the same financial institution may not be ideal, such as the availability of different mutual funds, perks of different financial institutions (unrelated to federal Roth IRA rules and regulations), better customer service, or more intuitive software. In most cases, the receiving institution handles the details of the transfer, as they are required to request the funds from the current institution, which sends a check. If the traditional IRA account consists of individual stocks that the account holder doesn't want to sell, the current institution will send stock certificates to the new one, which will then credit assets to the IRA account.</p>
        <p><strong>Method 3 – 60-day rollover</strong> – Another method is to do a 60-day rollover, which directly delivers the funds inside a traditional IRA by check, then rolls it into a Roth IRA account. However, this course of action has to be completed within 60 days of the traditional IRA distribution. If not, the amount of the distribution, minus any non-deductible contributions, will be taxable in the year received. On top of that, the IRS will assess a 10% early distribution tax penalty, and the conversion will ultimately not take place. The IRS may waive the 60-day requirement if the failure to meet the time limit is due to events such as casualty, disaster, or anything beyond reasonable control.</p>
      </div>

      <div class="faq-item">
        <h3>What should I consider before converting a traditional IRA to a Roth IRA?</h3>
        <p>• Make sure there are sufficient funds outside of an IRA to pay income tax on the conversion. Using any IRA money instead to pay taxes will result in a loss of tax-free gains.</p>
        <p>• Make sure there is sufficient income from non-retirement account sources to support the desired lifestyle in retirement.</p>
        <p>• Generally, the younger a person is, the more they have to benefit from the tax-free growth in retirement plans. However, if contributing near or in retirement, make sure that funds have enough time to grow to offset the initial payment of taxes. Keep in mind that the account must mature at least five years to avoid taxation on earnings.</p>
        <p>• Paying the income tax on a conversion with money from the sale of appreciated assets can result in having to pay a capital gains tax.</p>
        <p>• Required Minimum Distributions, or RMDs, cannot be converted into Roth IRA funds.</p>
        <p>• The IRS limits rollovers to once per year per IRA account.</p>
      </div>

      <div class="faq-item">
        <h3>What is the difference between a Roth IRA and a traditional IRA?</h3>
        <p>The major difference between Roth IRAs and traditional IRAs is that contributions to Roth IRAs are not tax-deductible, and contributions may be withdrawn tax-free at any time without penalty. Traditional IRA contributions may be tax-deductible, but withdrawals in retirement are taxed as ordinary income. Additionally, Roth IRAs have no required minimum distributions (RMDs), while traditional IRAs do.</p>
      </div>

      <div class="faq-item">
        <h3>Can I contribute to both a Roth IRA and a traditional IRA?</h3>
        <p>Yes, you can contribute to both a Roth IRA and a traditional IRA, but your total contributions across all IRAs cannot exceed the annual limit ($7,500 for those under 50, $8,600 for those 50 and older in 2026).</p>
      </div>

      <div class="faq-item">
        <h3>What is the Saver's Credit?</h3>
        <p>The Saver's Tax Credit, on IRS Form 8880, can be claimed for up to 50% on the first $2,000 in contributions to a Roth IRA. This tax credit is non-refundable and is available to low- and middle-income taxpayers.</p>
      </div>
    </div>

     <!-- Calculator CTA -->
    <section class="section calculator-cta">
    <a href="/roth-ira-calculator-estimate-your-tax-free-retirement-growth-blog" class="calculator-btn">
    Estimate Your Tax-Free Retirement Growth (2026 Complete Guide) →
    </a>
    </section>

  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'RothIRACalculator',
  data() {
    return {
      form: {
        currentBalance: 30000,
        annualContribution: 7500,
        maximizeOption: 'no',
        maximizeContributions: false,
        returnRate: 6,
        currentAge: 30,
        retirementAge: 65,
        taxRate: 25
      },
      results: {
        calculated: false,
        rothBalance: 0,
        taxableBalance: 0,
        totalPrincipal: 0,
        rothInterest: 0,
        taxableInterest: 0,
        totalTax: 0,
        difference: 0,
        annualSchedule: []
      },
      chart: null
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
      desc.content = 'Use this Roth IRA Calculator to estimate how much your Roth IRA contributions could grow over time. Enter your annual contribution, expected investment return, and years to retirement to calculate the future value of your tax-free retirement savings.'
      
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
    toggleMaximize() {
      this.form.maximizeContributions = this.form.maximizeOption === 'yes';
      if (this.form.maximizeContributions) {
        // 根据年龄设置最大贡献额
        const age = this.form.currentAge;
        this.form.annualContribution = age < 50 ? 7500 : 8600;
      }
      this.calculate();
    },

    calculate() {
      const years = this.form.retirementAge - this.form.currentAge;
      if (years <= 0) {
        this.results.calculated = false;
        return;
      }

      const rate = this.form.returnRate / 100;
      const taxRate = this.form.taxRate / 100;
      const annualContrib = this.form.annualContribution || 0;
      const startingBalance = this.form.currentBalance || 0;

      let rothBalance = startingBalance;
      let taxableBalance = startingBalance;
      let principalBalance = startingBalance;
      let totalPrincipal = startingBalance;

      const annualSchedule = [];

      for (let year = 1; year <= years; year++) {
        const age = this.form.currentAge + year;
        
        // 记录期初余额
        const rothStart = rothBalance;
        const taxableStart = taxableBalance;
        const principalStart = principalBalance;

        // 计算当年增长
        rothBalance += rothBalance * rate;
        taxableBalance += taxableBalance * rate;
        
        // 计算当年利息（用于税后计算）
        const taxableInterest = taxableBalance * rate;
        
        // 应用资本利得税（简化模型：每年对收益征税）
        taxableBalance -= taxableInterest * taxRate;
        
        // 添加贡献（发生在期末）
        rothBalance += annualContrib;
        taxableBalance += annualContrib;
        principalBalance += annualContrib;
        totalPrincipal += annualContrib;

        // 记录期末余额
        annualSchedule.push({
          age: age,
          principalStart: principalStart,
          principalEnd: principalBalance,
          rothStart: rothStart,
          rothEnd: rothBalance,
          taxableStart: taxableStart,
          taxableEnd: taxableBalance
        });
      }

      const rothInterest = rothBalance - totalPrincipal;
      const taxableInterest = taxableBalance - totalPrincipal;
      const totalTax = totalPrincipal > 0 ? (taxableBalance * taxRate) : 0;

      this.results = {
        calculated: true,
        rothBalance: rothBalance,
        taxableBalance: taxableBalance,
        totalPrincipal: totalPrincipal,
        rothInterest: rothInterest,
        taxableInterest: taxableInterest,
        totalTax: totalTax,
        difference: rothBalance - taxableBalance,
        annualSchedule: annualSchedule
      };

      this.$nextTick(() => {
        this.updateChart();
      });
    },

    updateChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = this.$refs.balanceChart?.getContext('2d');
      if (!ctx) return;

      const ages = this.results.annualSchedule.map(row => row.age);
      const rothData = this.results.annualSchedule.map(row => row.rothEnd / 1000000); // 转换为百万单位
      const taxableData = this.results.annualSchedule.map(row => row.taxableEnd / 1000000);
      const principalData = this.results.annualSchedule.map(row => row.principalEnd / 1000000);

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ages,
          datasets: [
            {
              label: 'Roth IRA',
              data: rothData,
              borderColor: '#2563eb',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.1
            },
            {
              label: 'Taxable account',
              data: taxableData,
              borderColor: '#16a34a',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.1
            },
            {
              label: 'Principal',
              data: principalData,
              borderColor: '#eab308',
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
                text: 'Amount (in $1M)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Age'
              }
            }
          }
        }
      });
    },

    clearForm() {
      this.form = {
        currentBalance: 30000,
        annualContribution: 7500,
        maximizeOption: 'no',
        maximizeContributions: false,
        returnRate: 6,
        currentAge: 30,
        retirementAge: 65,
        taxRate: 25
      };
      this.calculate();
    },

    formatMoney(value) {
      if (value === undefined || value === null || isNaN(value)) return '0';
      return Math.round(value).toLocaleString('en-US');
    }
  },
  mounted() {
    document.title = 'Roth IRA Calculator – Estimate Roth IRA Growth and Retirement Savings'
    // 2. 设置关键meta标签（Google最关注的）
    this.setGoogleMetaTags()
    // 安装 Chart.js
    if (typeof window !== 'undefined') {
      import('chart.js').then((ChartModule) => {
        const Chart = ChartModule.Chart;
        Chart.register(...ChartModule.registerables);
      });
    }
    this.calculate();
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
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
.roth-ira-calculator {
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
  .roth-ira-calculator {
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

.input-with-symbol input:disabled {
  background: #f0f0f0;
  color: #666;
  cursor: not-allowed;
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

.comparison-table {
  overflow-x: auto;
  margin-bottom: 24px;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
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

.comparison-table .total-tax td {
  background: #ecf3fa;
  font-weight: 600;
}

.summary-message {
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 28px;
  border: 1px solid #d9e2ef;
  border-left: 6px solid #2563eb;
  font-size: 1.1rem;
}

.summary-message strong {
  color: #1f3a5f;
  font-size: 1.2rem;
}

/* Graph Section */
.graph-section {
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 28px;
  border: 1px solid #d9e2ef;
}

.graph-section h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #1e3a5f;
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
  gap: 32px;
  margin-bottom: 16px;
  flex-wrap: wrap;
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

.chart-axis {
  display: flex;
  justify-content: space-between;
  color: #4b5f73;
  font-size: 0.9rem;
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

.schedule-table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.schedule-table {
  min-width: 800px;
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

.schedule-table tr:last-child td {
  border-bottom: none;
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
</style>