<template>
  <div class="marriage-tax-calculator">
    <!-- Header -->
    <h1 class="main-title">Marriage Tax Calculator</h1>
    <p class="description">
      Use this Marriage Tax Calculator to estimate whether you may experience a marriage tax penalty or bonus. Compare filing jointly versus filing separately and see how changes in income, tax brackets, and deductions can affect your total tax liability. This tool helps individuals and couples understand how marriage impacts their taxes and make informed financial decisions.
    </p>

    <!-- Calculator Form - 附件1样式 -->
    <div class="calculator-form">
      <h2>Marriage Tax Calculator</h2>
      
      <!-- Spouse 1 Income -->
      <div class="form-row">
        <label>Spouse 1 annual income</label>
        <div class="input-with-symbol">
          <span class="currency-symbol">$</span>
          <input 
            type="number" 
            v-model.number="form.spouse1Income" 
            @input="calculate"
            min="0"
            step="1000"
          />
        </div>
      </div>

      <!-- Spouse 2 Income -->
      <div class="form-row">
        <label>Spouse 2 annual income</label>
        <div class="input-with-symbol">
          <span class="currency-symbol">$</span>
          <input 
            type="number" 
            v-model.number="form.spouse2Income" 
            @input="calculate"
            min="0"
            step="1000"
          />
        </div>
      </div>

      <!-- Filing Status (for reference) -->
      <div class="form-row">
        <label>Filing status (married)</label>
        <div class="filing-status-display">
          <span class="status-badge">Married Filing Jointly</span>
        </div>
      </div>

      <!-- Standard Deduction Option -->
      <div class="form-row checkbox-row">
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            v-model="form.useStandardDeduction" 
            @change="calculate"
          />
          <span>Use standard deduction</span>
        </label>
      </div>

      <!-- Itemized Deductions (if not using standard) -->
      <div class="form-row" v-if="!form.useStandardDeduction">
        <label>Itemized deductions</label>
        <div class="input-with-symbol">
          <span class="currency-symbol">$</span>
          <input 
            type="number" 
            v-model.number="form.itemizedDeductions" 
            @input="calculate"
            min="0"
            step="1000"
          />
        </div>
      </div>

      <!-- State Tax Rate -->
      <div class="form-row">
        <label>State tax rate (estimated)</label>
        <div class="input-with-symbol">
          <input 
            type="number" 
            step="0.1" 
            v-model.number="form.stateTaxRate" 
            @input="calculate"
            min="0"
            max="13.3"
          />
          <span class="percent-symbol">%</span>
        </div>
      </div>

      <!-- Tax Year -->
      <div class="form-row">
        <label>Tax year</label>
        <select v-model="form.taxYear" @change="calculate" class="year-select">
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>

      <div class="form-actions">
        <button @click="calculate">Calculate</button>
        <button class="clear" @click="clearForm">Clear</button>
      </div>
    </div>

    <!-- Results Section - 附件2样式 -->
    <div class="results-section" v-if="results.calculated">
      <h2>Results</h2>
      
      <!-- Summary Cards -->
      <div class="summary-cards">
        <!-- Single Filers Combined Card -->
        <div class="summary-card" :class="{ 'better': results.singleTax < results.marriedTax }">
          <h3>Single Filers (Combined)</h3>
          <div class="card-row">
            <span>Total tax as singles</span>
            <span class="card-value">${{ formatNumber(results.singleTax) }}</span>
          </div>
          <div class="card-row">
            <span>Effective tax rate</span>
            <span class="card-value">{{ results.singleRate }}%</span>
          </div>
          <div class="card-row">
            <span>After-tax income</span>
            <span class="card-value">${{ formatNumber(results.singleAfterTax) }}</span>
          </div>
        </div>

        <!-- Married Filing Jointly Card -->
        <div class="summary-card" :class="{ 'better': results.marriedTax < results.singleTax }">
          <h3>Married Filing Jointly</h3>
          <div class="card-row">
            <span>Total tax as married</span>
            <span class="card-value">${{ formatNumber(results.marriedTax) }}</span>
          </div>
          <div class="card-row">
            <span>Effective tax rate</span>
            <span class="card-value">{{ results.marriedRate }}%</span>
          </div>
          <div class="card-row">
            <span>After-tax income</span>
            <span class="card-value">${{ formatNumber(results.marriedAfterTax) }}</span>
          </div>
        </div>
      </div>

      <!-- Marriage Bonus/Penalty Card -->
      <div class="penalty-card" :class="results.difference > 0 ? 'penalty' : 'bonus'">
        <h3>{{ results.difference > 0 ? 'Marriage Penalty' : 'Marriage Bonus' }}</h3>
        <div class="penalty-amount">
          {{ results.difference > 0 ? '+' : '' }}${{ formatNumber(Math.abs(results.difference)) }}
        </div>
        <p class="penalty-description">
          {{ results.difference > 0 
            ? 'You pay more as a married couple than as two singles.' 
            : 'You save money by filing jointly as a married couple.' 
          }}
        </p>
      </div>

      <!-- Detailed Breakdown -->
      <div class="breakdown-section">
        <h3>Tax Breakdown</h3>
        <table class="breakdown-table">
          <thead>
            <tr>
              <th></th>
              <th>Single Filer 1</th>
              <th>Single Filer 2</th>
              <th>Married Joint</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gross Income</td>
              <td>${{ formatNumber(form.spouse1Income) }}</td>
              <td>${{ formatNumber(form.spouse2Income) }}</td>
              <td>${{ formatNumber(form.spouse1Income + form.spouse2Income) }}</td>
            </tr>
            <tr>
              <td>Standard Deduction</td>
              <td>${{ formatNumber(getStandardDeduction('single')) }}</td>
              <td>${{ formatNumber(getStandardDeduction('single')) }}</td>
              <td>${{ formatNumber(getStandardDeduction('married')) }}</td>
            </tr>
            <tr>
              <td>Taxable Income</td>
              <td>${{ formatNumber(results.singleTaxable1) }}</td>
              <td>${{ formatNumber(results.singleTaxable2) }}</td>
              <td>${{ formatNumber(results.marriedTaxable) }}</td>
            </tr>
            <tr>
              <td>Federal Tax</td>
              <td>${{ formatNumber(results.singleFederal1) }}</td>
              <td>${{ formatNumber(results.singleFederal2) }}</td>
              <td>${{ formatNumber(results.marriedFederal) }}</td>
            </tr>
            <tr>
              <td>State Tax</td>
              <td>${{ formatNumber(results.singleState1) }}</td>
              <td>${{ formatNumber(results.singleState2) }}</td>
              <td>${{ formatNumber(results.marriedState) }}</td>
            </tr>
            <tr class="total-row">
              <td>Total Tax</td>
              <td colspan="2">${{ formatNumber(results.singleTax) }}</td>
              <td>${{ formatNumber(results.marriedTax) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Related Tools -->
    <div class="related-tools">
      <span class="related-label">Related:</span>
      <a href="#">Income Tax Calculator</a> <span class="sep">|</span>
      <a href="#">Take-Home-Paycheck Calculator</a>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h2>Marriage Tax Information – FAQ</h2>
      
      <div class="faq-item">
        <h3>How does marriage affect taxes?</h3>
        <p>Tax laws generally become more complicated after marriage, but marriage can present some opportunities to save additional money (compared to being single), particularly for those in single-income marriages or marriages in which there is a large difference between the income of the spouses. Depending on the specific situation of the couple, dual-income married couples can experience the opposite effect, paying more in taxes than they would as single, otherwise equivalent, individuals, or as a couple with only a single income.</p>
      </div>

      <div class="faq-item">
        <h3>What are the benefits of filing jointly as married spouses?</h3>
        <p>Spouses usually choose to file their taxes jointly once married. The following are examples of some benefits that come with filing jointly:</p>
        <ul>
          <li><strong>Access to tax benefits:</strong> Single filers miss out on certain tax benefits (earned income credit, education tax credits, student tax deduction for student loan interest, tuition and fees deduction, credit for the elderly and disabled, etc.). Those who fall under the married-filing-jointly category have access to these deductions, which can result in substantial tax savings.</li>
          <li><strong>Lower tax bracket:</strong> Filing jointly is usually better when the income disparity between spouses is high because this usually results in being placed into a lower tax bracket.</li>
          <li><strong>Spousal IRA:</strong> Contributors must have earned income in order to contribute to IRAs, but filing jointly allows for a spousal IRA, which authorizes a non-working or stay-at-home spouse to contribute to retirement even though they didn't earn income during the year.</li>
          <li><strong>Estate tax protection:</strong> Marriage can help wealthy spouses protect their assets should they die. Federal tax law allows assets to be transferred to a widow or widower without being subject to the federal estate tax.</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>What is married filing separately?</h3>
        <p>Although married couples typically choose to file their tax returns jointly, some may choose to file them separately. However, because this can be financially beneficial in only very rare cases, married couples usually opt to file jointly. The calculator does not show results for this filing option.</p>
      </div>

      <div class="faq-item">
        <h3>What is the marriage penalty?</h3>
        <p>In some situations, married couples end up paying more in taxes than single, otherwise equivalent, individuals. This is referred to as the marriage penalty in the United States. This penalty can be significant if both individuals in the marriage have very high incomes since filing jointly can result in being subject to a higher tax bracket than the equivalent, combined income of two single people. Furthermore, having a lower joint income does not necessarily shield a couple from marriage penalties. As a result of their combined incomes being subject to additional restrictions, it is possible for two married individuals with lower incomes to be disqualified from receiving tax credits they would otherwise receive. There are other conditions under which marriage results in a tax penalty. However, situations can and often do change, and while marriage may result in short-term tax penalties, it can potentially have long-term tax benefits. While there are exceptions and multiple factors are involved, generally speaking, married couples with a sole source of income benefit from filing jointly, while dual-income couples may suffer marriage penalties.</p>
      </div>

      <div class="faq-item">
        <h3>How is the marriage bonus/penalty calculated?</h3>
        <p>The calculator compares your total tax liability as a married couple filing jointly versus the combined tax liability if you both filed as single individuals. If the married tax is lower, you receive a marriage bonus. If the married tax is higher, you face a marriage penalty. The calculation takes into account federal income tax brackets, standard deductions, and estimated state tax.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarriageTaxCalculator',
  data() {
    return {
      form: {
        spouse1Income: 75000,
        spouse2Income: 45000,
        useStandardDeduction: true,
        itemizedDeductions: 20000,
        stateTaxRate: 5.0,
        taxYear: 2026
      },
      results: {
        calculated: false,
        singleTax: 0,
        marriedTax: 0,
        singleRate: 0,
        marriedRate: 0,
        singleAfterTax: 0,
        marriedAfterTax: 0,
        difference: 0,
        singleTaxable1: 0,
        singleTaxable2: 0,
        marriedTaxable: 0,
        singleFederal1: 0,
        singleFederal2: 0,
        marriedFederal: 0,
        singleState1: 0,
        singleState2: 0,
        marriedState: 0
      }
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
      desc.content = 'Estimate your marriage tax penalty or bonus by comparing filing jointly vs separately. See how marriage affects your taxes, income, and total tax liability.'
      
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
      // Get standard deductions for the selected year
      const stdSingle = this.getStandardDeduction('single');
      const stdMarried = this.getStandardDeduction('married');
      
      // Calculate deductions
      const deduction1 = this.form.useStandardDeduction ? stdSingle : this.form.itemizedDeductions;
      const deduction2 = this.form.useStandardDeduction ? stdSingle : this.form.itemizedDeductions;
      const deductionMarried = this.form.useStandardDeduction ? stdMarried : this.form.itemizedDeductions;
      
      // Calculate taxable incomes
      const taxable1 = Math.max(0, this.form.spouse1Income - deduction1);
      const taxable2 = Math.max(0, this.form.spouse2Income - deduction2);
      const taxableMarried = Math.max(0, (this.form.spouse1Income + this.form.spouse2Income) - deductionMarried);
      
      // Calculate federal tax
      const brackets = this.getTaxBrackets();
      
      const federal1 = this.calculateFederalTax(taxable1, 'single', brackets);
      const federal2 = this.calculateFederalTax(taxable2, 'single', brackets);
      const federalMarried = this.calculateFederalTax(taxableMarried, 'married', brackets);
      
      // Calculate state tax (simplified flat rate)
      const stateRate = this.form.stateTaxRate / 100;
      const state1 = taxable1 * stateRate;
      const state2 = taxable2 * stateRate;
      const stateMarried = taxableMarried * stateRate;
      
      // Total taxes
      const singleTotal = federal1 + federal2 + state1 + state2;
      const marriedTotal = federalMarried + stateMarried;
      
      // After-tax incomes
      const totalIncome = this.form.spouse1Income + this.form.spouse2Income;
      const singleAfterTax = totalIncome - singleTotal;
      const marriedAfterTax = totalIncome - marriedTotal;
      
      // Effective tax rates
      const singleRate = totalIncome > 0 ? (singleTotal / totalIncome * 100).toFixed(1) : 0;
      const marriedRate = totalIncome > 0 ? (marriedTotal / totalIncome * 100).toFixed(1) : 0;
      
      this.results = {
        calculated: true,
        singleTax: Math.round(singleTotal),
        marriedTax: Math.round(marriedTotal),
        singleRate: singleRate,
        marriedRate: marriedRate,
        singleAfterTax: Math.round(singleAfterTax),
        marriedAfterTax: Math.round(marriedAfterTax),
        difference: Math.round(marriedTotal - singleTotal),
        singleTaxable1: Math.round(taxable1),
        singleTaxable2: Math.round(taxable2),
        marriedTaxable: Math.round(taxableMarried),
        singleFederal1: Math.round(federal1),
        singleFederal2: Math.round(federal2),
        marriedFederal: Math.round(federalMarried),
        singleState1: Math.round(state1),
        singleState2: Math.round(state2),
        marriedState: Math.round(stateMarried)
      };
    },
    
    getStandardDeduction(filingStatus) {
      // Standard deductions by tax year
      const deductions = {
        2026: { single: 15000, married: 30000 },
        2025: { single: 14600, married: 29200 },
        2024: { single: 13850, married: 27700 }
      };
      return deductions[this.form.taxYear]?.[filingStatus] || deductions[2026][filingStatus];
    },
    
    getTaxBrackets() {
      // Tax brackets by year and filing status (simplified)
      return {
        2026: {
          single: [
            { rate: 0.10, upTo: 11600 },
            { rate: 0.12, upTo: 47150 },
            { rate: 0.22, upTo: 100525 },
            { rate: 0.24, upTo: 191950 },
            { rate: 0.32, upTo: 243725 },
            { rate: 0.35, upTo: 609350 },
            { rate: 0.37, upTo: Infinity }
          ],
          married: [
            { rate: 0.10, upTo: 23200 },
            { rate: 0.12, upTo: 94300 },
            { rate: 0.22, upTo: 201050 },
            { rate: 0.24, upTo: 383900 },
            { rate: 0.32, upTo: 487450 },
            { rate: 0.35, upTo: 731200 },
            { rate: 0.37, upTo: Infinity }
          ]
        },
        2025: {
          single: [
            { rate: 0.10, upTo: 11000 },
            { rate: 0.12, upTo: 44725 },
            { rate: 0.22, upTo: 95375 },
            { rate: 0.24, upTo: 182100 },
            { rate: 0.32, upTo: 231250 },
            { rate: 0.35, upTo: 578125 },
            { rate: 0.37, upTo: Infinity }
          ],
          married: [
            { rate: 0.10, upTo: 22000 },
            { rate: 0.12, upTo: 89450 },
            { rate: 0.22, upTo: 190750 },
            { rate: 0.24, upTo: 364200 },
            { rate: 0.32, upTo: 462500 },
            { rate: 0.35, upTo: 693750 },
            { rate: 0.37, upTo: Infinity }
          ]
        },
        2024: {
          single: [
            { rate: 0.10, upTo: 11000 },
            { rate: 0.12, upTo: 44725 },
            { rate: 0.22, upTo: 95375 },
            { rate: 0.24, upTo: 182100 },
            { rate: 0.32, upTo: 231250 },
            { rate: 0.35, upTo: 578125 },
            { rate: 0.37, upTo: Infinity }
          ],
          married: [
            { rate: 0.10, upTo: 22000 },
            { rate: 0.12, upTo: 89450 },
            { rate: 0.22, upTo: 190750 },
            { rate: 0.24, upTo: 364200 },
            { rate: 0.32, upTo: 462500 },
            { rate: 0.35, upTo: 693750 },
            { rate: 0.37, upTo: Infinity }
          ]
        }
      };
    },
    
    calculateFederalTax(taxableIncome, filingStatus, brackets) {
      if (taxableIncome <= 0) return 0;
      
      const yearBrackets = brackets[this.form.taxYear]?.[filingStatus] || brackets[2026][filingStatus];
      let tax = 0;
      let remainingIncome = taxableIncome;
      let previousLimit = 0;
      
      for (const bracket of yearBrackets) {
        if (remainingIncome <= 0) break;
        
        const taxableInBracket = Math.min(remainingIncome, bracket.upTo - previousLimit);
        tax += taxableInBracket * bracket.rate;
        remainingIncome -= taxableInBracket;
        previousLimit = bracket.upTo;
      }
      
      return tax;
    },
    
    clearForm() {
      this.form = {
        spouse1Income: 75000,
        spouse2Income: 45000,
        useStandardDeduction: true,
        itemizedDeductions: 20000,
        stateTaxRate: 5.0,
        taxYear: 2026
      };
      this.calculate();
    },
    
    formatNumber(value) {
      if (value === undefined || value === null) return '0';
      return Math.round(value).toLocaleString('en-US');
    }
  },
  mounted() {
    document.title = 'Marriage Tax Calculator – Estimate Marriage Tax Penalty or Bonus';
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
.marriage-tax-calculator {
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

/* Calculator Form */
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
  width: 200px;
  font-weight: 500;
  color: #1a3349;
  font-size: 1.05rem;
}

.checkbox-row {
  align-items: flex-start;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 500;
  color: #1a3349;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.filing-status-display {
  flex: 1;
}

.status-badge {
  background: #d4e2f0;
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 0.95rem;
  color: #1a3349;
  font-weight: 500;
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

.year-select {
  padding: 10px 16px;
  border: 1px solid #b6c9dd;
  border-radius: 30px;
  font-size: 1rem;
  background: white;
  min-width: 120px;
}

.form-row input[type="number"],
.year-select {
  padding: 12px 16px;
  border: 1px solid #b6c9dd;
  border-radius: 30px;
  font-size: 1rem;
  width: 200px;
  background: white;
  transition: border-color 0.2s;
}

.form-row input[type="number"]:focus,
.year-select:focus {
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

/* Results Section */
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
  margin-bottom: 24px;
  color: #0b2b44;
}

.summary-cards {
  display: flex;
  gap: 24px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.summary-card {
  flex: 1;
  min-width: 280px;
  background: white;
  border-radius: 24px;
  padding: 24px;
  border: 1px solid #d9e2ef;
  transition: transform 0.2s;
}

.summary-card.better {
  border: 2px solid #16a34a;
  background: #f0fdf4;
}

.summary-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #1e3a5f;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 12px;
}

.card-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.card-value {
  font-weight: 600;
  color: #0b2b44;
}

.penalty-card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 28px;
  text-align: center;
  border: 1px solid #d9e2ef;
}

.penalty-card.penalty {
  border-left: 6px solid #dc2626;
}

.penalty-card.bonus {
  border-left: 6px solid #16a34a;
}

.penalty-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #1e3a5f;
}

.penalty-amount {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.penalty-card.penalty .penalty-amount {
  color: #dc2626;
}

.penalty-card.bonus .penalty-amount {
  color: #16a34a;
}

.penalty-description {
  font-size: 1.1rem;
  color: #4b5f73;
}

.breakdown-section {
  background: white;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #d9e2ef;
}

.breakdown-section h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #1e3a5f;
}

.breakdown-table {
  width: 100%;
  border-collapse: collapse;
}

.breakdown-table th {
  text-align: left;
  padding: 12px 16px;
  background: #e1eaf3;
  font-weight: 600;
  color: #1a3349;
}

.breakdown-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e9eef3;
  color: #2c405c;
}

.breakdown-table .total-row {
  font-weight: 600;
  background: #ecf3fa;
}

.breakdown-table .total-row td {
  border-top: 2px solid #cbd5e1;
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

/* FAQ Section */
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

/* Responsive */
@media (max-width: 700px) {
  .marriage-tax-calculator {
    padding: 20px;
  }
  
  .form-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .form-row label {
    width: 100%;
  }
  
  .input-with-symbol {
    max-width: 100%;
    width: 100%;
  }
  
  .form-row input[type="number"],
  .year-select {
    width: 100%;
  }
  
  .summary-cards {
    flex-direction: column;
  }
  
  .breakdown-table {
    font-size: 0.9rem;
  }
  
  .breakdown-table td,
  .breakdown-table th {
    padding: 8px;
  }
}
</style>