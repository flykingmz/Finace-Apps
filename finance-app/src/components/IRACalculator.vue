<template>
  <div class="ira-calculator">
    <!-- Header -->
    <h1 class="main-title">IRA Calculator</h1>
    <p class="description">
      The IRA calculator can be used to evaluate and compare Traditional IRAs, SEP IRAs, SIMPLE IRAs, Roth IRAs, and regular taxable savings. 
      For comparison purposes, Roth IRA and regular taxable savings will be converted to after-tax values. 
      To calculate Roth IRA with after-tax inputs, please use our <a href="/roth-ira">Roth IRA Calculator</a>. 
      This calculator is mainly intended for use by U.S. residents.
    </p>

    <!-- Calculator Form -->
    <div class="calculator-form">
      <h2>IRA Calculator</h2>

      <!-- Current balance -->
      <div class="form-row">
        <label>
          Current balance
          <span class="tooltip-icon" @mouseenter="showTooltip('balance')" @mouseleave="hideTooltip('balance')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#1a3349"/>
            </svg>
          </span>
        </label>
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

      <!-- Annual before tax contribution -->
      <div class="form-row">
        <label>
          Annual before tax contribution?
          <span class="tooltip-icon" @mouseenter="showTooltip('contribution')" @mouseleave="hideTooltip('contribution')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#1a3349"/>
            </svg>
          </span>
        </label>
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
            />
          </div>
        </div>
      </div>

      <!-- Expected rate of return -->
      <div class="form-row">
        <label>
          Expected rate of return?
          <span class="tooltip-icon" @mouseenter="showTooltip('return')" @mouseleave="hideTooltip('return')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#1a3349"/>
            </svg>
          </span>
        </label>
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

      <!-- Current age -->
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

      <!-- Retirement age -->
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

      <!-- Current marginal tax rate -->
      <div class="form-row">
        <label>
          Current marginal tax rate?
          <span class="tooltip-icon" @mouseenter="showTooltip('currentTax')" @mouseleave="hideTooltip('currentTax')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#1a3349"/>
            </svg>
          </span>
        </label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <input
              type="number"
              step="0.1"
              v-model.number="form.currentTaxRate"
              @input="calculate"
              min="0"
              max="50"
              placeholder="25"
            />
            <span class="percent-symbol">%</span>
          </div>
        </div>
      </div>

      <!-- Expected tax rate in retirement -->
      <div class="form-row">
        <label>
          Expected tax rate in retirement?
          <span class="tooltip-icon" @mouseenter="showTooltip('retirementTax')" @mouseleave="hideTooltip('retirementTax')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#1a3349"/>
            </svg>
          </span>
        </label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <input
              type="number"
              step="0.1"
              v-model.number="form.retirementTaxRate"
              @input="calculate"
              min="0"
              max="50"
              placeholder="15"
            />
            <span class="percent-symbol">%</span>
          </div>
        </div>
      </div>

      <!-- Tooltips -->
      <div v-if="activeTooltip === 'balance'" class="tooltip-popup balance-tooltip">
        The current amount already saved in your retirement account
      </div>
      <div v-if="activeTooltip === 'contribution'" class="tooltip-popup contribution-tooltip">
        The amount you plan to contribute each year before taxes
      </div>
      <div v-if="activeTooltip === 'return'" class="tooltip-popup return-tooltip">
        Expected average annual investment return on your retirement savings
      </div>
      <div v-if="activeTooltip === 'currentTax'" class="tooltip-popup current-tax-tooltip">
        Your current marginal tax rate (the tax rate on your next dollar of income)
      </div>
      <div v-if="activeTooltip === 'retirementTax'" class="tooltip-popup retirement-tax-tooltip">
        Your expected marginal tax rate during retirement
      </div>

      <div class="form-actions">
        <button @click="calculate">Calculate</button>
        <button class="clear" @click="clearForm">Clear</button>
      </div>
    </div>

    <!-- Results Section -->
    <div class="results-section" v-if="results.calculated">
      <h2>Result</h2>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Traditional, SIMPLE, or SEP IRA</th>
              <th>Roth IRA</th>
              <th>Regular Taxable Savings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Balance at age {{ form.retirementAge }}</td>
              <td>${{ formatMoney(results.traditionalBalance) }}</td>
              <td>${{ formatMoney(results.rothBalance) }}</td>
              <td>${{ formatMoney(results.taxableBalance) }}</td>
            </tr>
            <tr class="highlight-row">
              <td><strong>Balance at age {{ form.retirementAge }} (after tax)</strong></td>
              <td><strong>${{ formatMoney(results.traditionalAfterTax) }}</strong></td>
              <td><strong>${{ formatMoney(results.rothBalance) }}</strong></td>
              <td><strong>${{ formatMoney(results.taxableBalance) }}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="summary-message">
        <p>
          A Traditional, SIMPLE, or SEP IRA account can accumulate <strong>${{ formatMoney(results.traditionalAdvantage) }} more</strong> 
          after-tax balance than a Roth IRA account at age {{ form.retirementAge }}. 
          A Roth IRA account can accumulate <strong>${{ formatMoney(results.rothAdvantage) }} more</strong> 
          than a regular taxable savings account.
        </p>
      </div>
    </div>

    <!-- Balance Accumulation Graph -->
    <div class="graph-section" v-if="results.calculated">
      <h3>Balance Accumulation Graph</h3>
      <div class="chart-container">
        <canvas ref="balanceChart" id="balanceChart"></canvas>
      </div>
      <div class="chart-legend">
        <span class="legend-item"><span class="color-box" style="background: #2563eb;"></span> Traditional/SIMPLE/SEP IRA (before tax)</span>
        <span class="legend-item"><span class="color-box" style="background: #60a5fa;"></span> Traditional/SIMPLE/SEP IRA (after tax)</span>
        <span class="legend-item"><span class="color-box" style="background: #16a34a;"></span> Roth IRA (after tax)</span>
        <span class="legend-item"><span class="color-box" style="background: #eab308;"></span> Regular taxable savings (after tax)</span>
        <span class="legend-item"><span class="color-box" style="background: #9333ea;"></span> Principal</span>
      </div>
      <div class="chart-axis">
        <span>X-axis: Age</span>
        <span>Y-axis: Amount (in $)</span>
      </div>
    </div>

    <!-- Annual Schedule -->
    <div class="schedule-section" v-if="results.calculated">
      <h3>Annual Schedule</h3>
      
      <div class="schedule-table-wrapper">
        <div class="schedule-table">
          <table>
            <thead>
              <tr>
                <th rowspan="2">Age</th>
                <th colspan="2">Traditional/SIMPLE/SEP IRA (Before Tax)</th>
                <th colspan="2">Traditional, SIMPLE, or SEP IRA (After Tax)</th>
                <th colspan="2">Roth IRA (After Tax)</th>
                <th colspan="2">Regular Taxable Savings (After Tax)</th>
              </tr>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Start</th>
                <th>End</th>
                <th>Start</th>
                <th>End</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in results.annualSchedule" :key="row.age">
                <td>{{ row.age }}</td>
                <td>${{ formatMoney(row.traditionalStart) }}</td>
                <td>${{ formatMoney(row.traditionalEnd) }}</td>
                <td>${{ formatMoney(row.traditionalAfterTaxStart) }}</td>
                <td>${{ formatMoney(row.traditionalAfterTaxEnd) }}</td>
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
      <a href="/roth-ira">Roth IRA Calculator</a> <span class="sep">|</span>
      <a href="/annuity">Annuity Calculator</a>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h2>IRA Information – FAQ</h2>

      <div class="faq-item">
        <h3>What is an IRA?</h3>
        <p>In the United States, an IRA (individual retirement account) is a type of retirement plan with taxation benefits defined by IRS Publication 590. It is a government tax break to incentivize people to invest money for retirement.</p>
      </div>

      <div class="faq-item">
        <h3>What are the different types of IRAs?</h3>
        <p>Among the different IRAs, the most common are traditional IRAs and Roth IRAs. The contributions to a Roth IRA are not tax-deductible, but the withdrawals after retirement are tax-free. Conversely, the contributions to a traditional IRA are tax-deductible but are taxed on withdrawals after retirement. For most people, their expected income after retirement will be lower than that during working years. Therefore their expected marginal tax rates after retirement will likely be lower. As a result, they may find that traditional IRAs are more financially beneficial simply because taxation occurs in retirement and not during prime working years. Both accumulate more wealth than regular taxable savings or investments due to the presence of tax shields. SEP (Simplified Employee Pensions) IRAs are popular with self-employed contractors with a handful of employees, and SIMPLE IRAs are designed for small businesses with less than 100 employees.</p>
      </div>

      <div class="faq-item">
        <h3>What is a Traditional IRA?</h3>
        <p>As the most common IRA in use, traditional IRAs are qualified retirement plans that have tax shields in place for funds set aside for retirement. They are ideal for people who want to reduce a tax bill while at the same time saving for retirement. Taxation only occurs when withdrawing before or in retirement. However, early withdrawals will be penalized, except in qualified cases. The contributions made are tax-deductible for most people as long as several requirements, dependent on tax-filing status and gross income, are met. After age 59 ½, withdrawals from traditional IRAs are penalty-free. Traditional IRA withdrawals are not required until after age 73 when it becomes mandatory to take the required minimum distribution (RMD). Most people are eligible for traditional IRAs.</p>
      </div>

      <div class="faq-item">
        <h3>What is a Roth IRA?</h3>
        <p>These are often initiated and managed by individuals with contributions coming from after-tax income or assets. Investment income is tax-free, and withdrawals are tax-free. After turning age 59 ½, withdrawals from Roth IRAs are penalty-free. However, Roth IRA withdrawals are not mandatory during the owner's lifetime. Without distribution, Roth IRAs can grow tax-free throughout the owner's entire lifetime. For more detailed information and to do calculations involving Roth IRAs, please visit the Roth IRA Calculator.</p>
      </div>

      <div class="faq-item">
        <h3>What is a SEP IRA?</h3>
        <p>Simplified Employee Pension (SEP) IRAs, which are initiated by employers, allow employers to make contributions to the IRA accounts of their employees. SEP IRAs are mostly used by small businesses or self-employed individuals, so they are designed to be easier to set up than other IRAs. They function similarly to traditional IRAs in tax treatment, balance accumulation, and distribution. Employers may deduct contributions as business expenses. Contribution limits for these are different from the more popular IRAs above; for 2026, the limit is the lesser of 25% of gross income, or $72,000. This is almost ten times the amount of the more popular traditional or Roth IRAs. All proceeds are immediately 100% vested. There is no catch-up contribution for account holders age 50 or older. All qualified employees must receive the same benefits under their SEP IRAs.</p>
      </div>

      <div class="faq-item">
        <h3>What is a SIMPLE IRA?</h3>
        <p>Savings Incentive Match Plan for Employee (SIMPLE) IRAs are mainly designed for small businesses with 100 or fewer employees, as the administrative costs associated with a SIMPLE IRA are much lower than those required by a 401(k). Also, employers may deduct contributions as business expenses. For this retirement plan, employers must choose between two matching options for their employees. The first is a match of employee's contributions up to 3% of their compensation. The second is a fixed rate of 2% of every employee's compensation, regardless of whether they participate. In both cases, annual contribution limits are $17,000 (additional $4,000 for employees over 50 and $5,250 for those aged 60 to 63) or 100% of compensation for 2026. This means that employees can contribute 100% of their income into a SIMPLE IRA. However, if an employee participates in other employer-sponsored plans, the combined total of all contributions cannot exceed $24,500 if the employee is under age 50; $32,500 if the employee is between ages 50 and 59 or age 64 or older; or $35,750 if the employee is between ages 60 and 63. It is important to note that the early withdrawal penalty is 25% for SIMPLE IRAs, which is much higher than the 10% of traditional or Roth IRAs. SIMPLE IRAs can only be cashed out without penalty after two years.</p>
      </div>

      <div class="faq-item">
        <h3>What are IRA rollovers?</h3>
        <p>Existing qualified retirement plans, such as 401(K)s, 403(B)s, SIMPLE IRAs, or SEP IRAs, can be "rolled over," or consolidated, into a traditional IRA. Many other plans, including 457 plans or inherited employer-sponsored plans (for designated beneficiaries), can also be rolled over. There are no taxes due when rolling over company plans directly into IRAs. However, remember to report all rollovers on tax returns, even when no taxes are due. Two IRS forms are involved here: the 1099R to report distributions received from employer's plans and 5498 to report rollover contributions to the IRA. In most cases, the variety of choices a person can make regarding their investments remain about the same after rollovers into new IRAs. Rollovers and contributions can be combined into the same IRA, but traditional IRA and Roth IRA funds must be kept in separate accounts. Rolling over an IRA is not the only option available. Some may choose to leave accumulated assets in their former employer's plan, even after leaving to work at a different company (plans that require certain minimum amounts will not allow this). Others may move their assets into their new employer's plan. It is also possible to cash out retirement plans, though this usually results in early withdrawal penalties and taxes. Early withdrawals from IRAs or 401(k)s are both subject to a 10% penalty along with standard income taxes.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'IRACalculator',
  data() {
    return {
      form: {
        currentBalance: 30000,
        annualContribution: 7500,
        returnRate: 6,
        currentAge: 30,
        retirementAge: 65,
        currentTaxRate: 25,
        retirementTaxRate: 15
      },
      activeTooltip: null,
      results: {
        calculated: false,
        traditionalBalance: 0,
        rothBalance: 0,
        taxableBalance: 0,
        traditionalAfterTax: 0,
        traditionalAdvantage: 0,
        rothAdvantage: 0,
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
      desc.content = 'Use our IRA calculator to estimate Roth and Traditional IRA growth, annual contributions, and retirement savings. Calculate future value, tax advantages, and long-term returns to plan your retirement strategy.'
      
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
      const years = this.form.retirementAge - this.form.currentAge;
      if (years <= 0) {
        this.results.calculated = false;
        return;
      }

      const rate = this.form.returnRate / 100;
      const currentTax = this.form.currentTaxRate / 100;
      const retirementTax = this.form.retirementTaxRate / 100;
      const annualContrib = this.form.annualContribution || 0;
      const startingBalance = this.form.currentBalance || 0;

      // Traditional IRA (before tax)
      let traditionalBalance = startingBalance;
      // Roth IRA (after tax - contributions are after tax, growth tax-free)
      let rothBalance = startingBalance * (1 - currentTax);
      // Regular taxable savings (after tax - contributions after tax, growth taxed annually)
      let taxableBalance = startingBalance * (1 - currentTax);
      
      const annualSchedule = [];

      for (let year = 1; year <= years; year++) {
        const age = this.form.currentAge + year;
        
        // Record start values
        const traditionalStart = traditionalBalance;
        const rothStart = rothBalance;
        const taxableStart = taxableBalance;
        const traditionalAfterTaxStart = traditionalBalance * (1 - retirementTax);
        
        // Traditional IRA growth (pre-tax)
        traditionalBalance += traditionalBalance * rate;
        traditionalBalance += annualContrib;
        
        // Roth IRA growth (after-tax contributions)
        rothBalance += rothBalance * rate;
        const afterTaxContribution = annualContrib * (1 - currentTax);
        rothBalance += afterTaxContribution;
        
        // Taxable savings growth (after-tax, taxed annually on gains)
        taxableBalance += taxableBalance * rate;
        taxableBalance += afterTaxContribution;
        // Tax on gains (simplified: tax on annual growth)
        const annualGain = taxableBalance * rate;
        taxableBalance -= annualGain * currentTax;
        
        // Calculate after-tax values
        const traditionalAfterTaxEnd = traditionalBalance * (1 - retirementTax);
        const rothEnd = rothBalance;
        const taxableEnd = taxableBalance;
        
        annualSchedule.push({
          age: age,
          traditionalStart: traditionalStart,
          traditionalEnd: traditionalBalance,
          traditionalAfterTaxStart: traditionalAfterTaxStart,
          traditionalAfterTaxEnd: traditionalAfterTaxEnd,
          rothStart: rothStart,
          rothEnd: rothEnd,
          taxableStart: taxableStart,
          taxableEnd: taxableEnd
        });
      }
      
      const traditionalAfterTax = traditionalBalance * (1 - retirementTax);
      const rothAfterTax = rothBalance;
      const taxableAfterTax = taxableBalance;
      
      const traditionalAdvantage = traditionalAfterTax - rothAfterTax;
      const rothAdvantage = rothAfterTax - taxableAfterTax;
      
      this.results = {
        calculated: true,
        traditionalBalance: traditionalBalance,
        rothBalance: rothBalance,
        taxableBalance: taxableBalance,
        traditionalAfterTax: traditionalAfterTax,
        traditionalAdvantage: traditionalAdvantage,
        rothAdvantage: rothAdvantage,
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

      const canvas = this.$refs.balanceChart;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const schedule = this.results.annualSchedule;
      if (!schedule || schedule.length === 0) return;

      const ages = schedule.map(row => row.age);
      const traditionalBeforeTax = schedule.map(row => row.traditionalEnd);
      const traditionalAfterTax = schedule.map(row => row.traditionalAfterTaxEnd);
      const roth = schedule.map(row => row.rothEnd);
      const taxable = schedule.map(row => row.taxableEnd);
      
      // Calculate principal (cumulative contributions)
      const years = schedule.length;
      const annualContrib = this.form.annualContribution || 0;
      const currentTax = this.form.currentTaxRate / 100;
      const startingBalance = this.form.currentBalance || 0;
      const principal = [];
      let cumulativePrincipal = startingBalance;
      for (let i = 0; i < years; i++) {
        cumulativePrincipal += annualContrib;
        principal.push(cumulativePrincipal);
      }

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ages,
          datasets: [
            {
              label: 'Traditional/SIMPLE/SEP IRA (before tax)',
              data: traditionalBeforeTax,
              borderColor: '#2563eb',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.1
            },
            {
              label: 'Traditional/SIMPLE/SEP IRA (after tax)',
              data: traditionalAfterTax,
              borderColor: '#60a5fa',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.1
            },
            {
              label: 'Roth IRA (after tax)',
              data: roth,
              borderColor: '#16a34a',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.1
            },
            {
              label: 'Regular taxable savings (after tax)',
              data: taxable,
              borderColor: '#eab308',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.1
            },
            {
              label: 'Principal',
              data: principal,
              borderColor: '#9333ea',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.1,
              borderDash: [5, 5]
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
                text: 'Amount ($)'
              },
              ticks: {
                callback: (value) => {
                  if (value >= 1000000) return '$' + (value / 1000000).toFixed(1) + 'M';
                  if (value >= 1000) return '$' + (value / 1000).toFixed(0) + 'K';
                  return '$' + value;
                }
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

    showTooltip(tooltipId) {
      this.activeTooltip = tooltipId;
    },

    hideTooltip() {
      this.activeTooltip = null;
    },

    clearForm() {
      this.form = {
        currentBalance: 30000,
        annualContribution: 7500,
        returnRate: 6,
        currentAge: 30,
        retirementAge: 65,
        currentTaxRate: 25,
        retirementTaxRate: 15
      };
      this.calculate();
    },

    formatMoney(value) {
      if (value === undefined || value === null || isNaN(value)) return '0';
      return Math.round(value).toLocaleString('en-US');
    }
  },
  mounted() {
    document.title = 'IRA Calculator – Estimate Roth & Traditional IRA Growth, Contributions & Retirement Savings'
    // 2. 设置关键meta标签（Google最关注的）
    this.setGoogleMetaTags()
    this.calculate();
  },
  watch: {
  form: {
    handler: 'calculate',
    deep: true
  },
  results: {
    handler(newVal) {
      if (newVal.calculated) {
        this.$nextTick(() => {
          this.updateChart();
        });
      }
    },
    deep: true
  }
}
};
</script>

<style scoped>
/* 移动端优先的样式设计 */
.ira-calculator {
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
  .ira-calculator {
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
  font-size: 1rem;
  line-height: 1.5;
  background: #ecf3fa;
  padding: 16px 20px;
  border-radius: 24px;
  margin-bottom: 28px;
  color: #1c3a5c;
  border: 1px solid #c7daf0;
}

.description a {
  color: #1f4a7a;
  text-decoration: underline;
}

.calculator-form {
  background: #f2f6fb;
  border-radius: 28px;
  padding: 28px 24px;
  border: 1px solid #cdddee;
  margin-bottom: 32px;
  position: relative;
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
  min-width: 160px;
  display: flex;
  align-items: center;
  gap: 6px;
}

@media (min-width: 641px) {
  .form-row label {
    width: 200px;
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

.tooltip-icon {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.tooltip-icon svg {
  fill: #6b7f96;
  transition: fill 0.2s;
}

.tooltip-icon:hover svg {
  fill: #1f3a5f;
}

.tooltip-popup {
  position: absolute;
  background: #1f3a5f;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  z-index: 100;
  max-width: 250px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  white-space: normal;
}

.balance-tooltip { top: 150px; left: 20px; }
.contribution-tooltip { top: 230px; left: 20px; }
.return-tooltip { top: 310px; left: 20px; }
.current-tax-tooltip { top: 470px; left: 20px; }
.retirement-tax-tooltip { top: 550px; left: 20px; }

@media (min-width: 641px) {
  .balance-tooltip { top: 150px; left: 220px; }
  .contribution-tooltip { top: 230px; left: 220px; }
  .return-tooltip { top: 310px; left: 220px; }
  .current-tax-tooltip { top: 470px; left: 220px; }
  .retirement-tax-tooltip { top: 550px; left: 220px; }
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
  min-width: 600px;
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

.comparison-table .highlight-row td {
  background: #ecf3fa;
  font-weight: 600;
}

.summary-message {
  background: white;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #d9e2ef;
  border-left: 6px solid #2563eb;
  font-size: 1rem;
  line-height: 1.6;
}

.summary-message strong {
  color: #1f3a5f;
}

/* Graph Section */
.graph-section {
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 32px;
  border: 1px solid #d9e2ef;
}

.graph-section h3 {
  font-size: 1.3rem;
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
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-bottom: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #2c405c;
}

.color-box {
  width: 16px;
  height: 12px;
  border-radius: 3px;
}

.chart-axis {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #6b7f96;
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
  min-width: 900px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.schedule-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.schedule-table th {
  background: #e1eaf3;
  padding: 10px 6px;
  text-align: left;
  font-weight: 600;
  color: #1a3349;
  white-space: nowrap;
  border-bottom: 2px solid #cbd5e1;
}

.schedule-table td {
  padding: 8px 6px;
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
</style>