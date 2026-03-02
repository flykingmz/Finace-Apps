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

      <!-- Salary + Business Income -->
      <div class="form-row">
        <label>Salary + Business Income</label>
        <div class="input-group">
          <span class="currency-symbol">$</span>
          <input type="number" v-model.number="form.spouse1.salary" @input="calculate" min="0" step="1000" />
        </div>
        <div class="input-group">
          <span class="currency-symbol">$</span>
          <input type="number" v-model.number="form.spouse2.salary" @input="calculate" min="0" step="1000" />
        </div>
      </div>

      <!-- Interest + Dividends Income -->
      <div class="form-row">
        <label>Interest + Dividends Income</label>
        <div class="input-group">
          <span class="currency-symbol">$</span>
          <input type="number" v-model.number="form.spouse1.interest" @input="calculate" min="0" step="100" />
        </div>
        <div class="input-group">
          <span class="currency-symbol">$</span>
          <input type="number" v-model.number="form.spouse2.interest" @input="calculate" min="0" step="100" />
        </div>
      </div>

      <!-- Rental, Royalty, Passive Income -->
      <div class="form-row">
        <label>Rental, Royalty, Passive Income</label>
        <div class="input-group">
          <span class="currency-symbol">$</span>
          <input type="number" v-model.number="form.spouse1.rental" @input="calculate" min="0" step="100" />
        </div>
        <div class="input-group">
          <span class="currency-symbol">$</span>
          <input type="number" v-model.number="form.spouse2.rental" @input="calculate" min="0" step="100" />
        </div>
      </div>

      <!-- Short Term Capital Gain -->
      <div class="form-row">
        <label>Short Term Capital Gain</label>
        <div class="input-group">
          <span class="currency-symbol">$</span>
          <input type="number" v-model.number="form.spouse1.shortTermGain" @input="calculate" min="0" step="100" />
        </div>
        <div class="input-group">
          <span class="currency-symbol">$</span>
          <input type="number" v-model.number="form.spouse2.shortTermGain" @input="calculate" min="0" step="100" />
        </div>
      </div>

      <!-- Long Term Capital Gain -->
      <div class="form-row">
        <label>Long Term Capital Gain</label>
        <div class="input-group">
          <span class="currency-symbol">$</span>
          <input type="number" v-model.number="form.spouse1.longTermGain" @input="calculate" min="0" step="100" />
        </div>
        <div class="input-group">
          <span class="currency-symbol">$</span>
          <input type="number" v-model.number="form.spouse2.longTermGain" @input="calculate" min="0" step="100" />
        </div>
      </div>

      <!-- Qualified Dividends -->
      <div class="form-row">
        <label>Qualified Dividends</label>
        <div class="input-group">
          <span class="currency-symbol">$</span>
          <input type="number" v-model.number="form.spouse1.qualifiedDividends" @input="calculate" min="0" step="100" />
        </div>
        <div class="input-group">
          <span class="currency-symbol">$</span>
          <input type="number" v-model.number="form.spouse2.qualifiedDividends" @input="calculate" min="0" step="100" />
        </div>
      </div>

      <!-- 401K, IRA... Savings -->
      <div class="form-row">
        <label>401K, IRA... Savings</label>
        <div class="input-group">
          <span class="currency-symbol">$</span>
          <input type="number" v-model.number="form.spouse1.retirementSavings" @input="calculate" min="0" step="500" />
        </div>
        <div class="input-group">
          <span class="currency-symbol">$</span>
          <input type="number" v-model.number="form.spouse2.retirementSavings" @input="calculate" min="0" step="500" />
        </div>
      </div>

      <!-- File Status (Before Marriage) -->
      <div class="form-row">
        <label>File Status (Before Marriage)</label>
        <div class="status-display">Single</div>
        <div class="status-displace"></div>
      </div>

      <!-- No. of Dependents -->
      <div class="form-row">
        <label>No. of Dependents</label>
        <div class="input-group">
          <input type="number" v-model.number="form.dependents" @input="calculate" min="0" max="10" step="1" />
        </div>
        <div class="input-group"></div>
      </div>

      <!-- Deductions Section -->
      <div class="deductions-section">
        <label>Deductions:</label>
        <div class="deductions-grid">
          <div class="deduction-item">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.deductions.mortgageInterest" @change="calculate" />
              <span>Mortgage Interest</span>
            </label>
            <div class="input-with-symbol" v-if="form.deductions.mortgageInterest">
              <span class="currency-symbol">$</span>
              <input type="number" v-model.number="form.deductionAmounts.mortgageInterest" @input="calculate" min="0" step="500" />
            </div>
          </div>

          <div class="deduction-item">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.deductions.charitableDonations" @change="calculate" />
              <span>Charitable Donations</span>
            </label>
            <div class="input-with-symbol" v-if="form.deductions.charitableDonations">
              <span class="currency-symbol">$</span>
              <input type="number" v-model.number="form.deductionAmounts.charitableDonations" @input="calculate" min="0" step="100" />
            </div>
          </div>

          <div class="deduction-item">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.deductions.studentLoanInterest" @change="calculate" />
              <span>Student Loan Interest, $2,500 Max</span>
            </label>
            <div class="input-with-symbol" v-if="form.deductions.studentLoanInterest">
              <span class="currency-symbol">$</span>
              <input type="number" v-model.number="form.deductionAmounts.studentLoanInterest" @input="calculate" min="0" max="2500" step="100" />
            </div>
          </div>

          <div class="deduction-item">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.deductions.childCareExpenses" @change="calculate" />
              <span>Child Care Expenses, $3,000 Max</span>
            </label>
            <div class="input-with-symbol" v-if="form.deductions.childCareExpenses">
              <span class="currency-symbol">$</span>
              <input type="number" v-model.number="form.deductionAmounts.childCareExpenses" @input="calculate" min="0" max="3000" step="100" />
            </div>
          </div>

          <div class="deduction-item">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.deductions.educationTuition" @change="calculate" />
              <span>Education Tuition, $4,000 Max</span>
            </label>
            <div class="input-with-symbol" v-if="form.deductions.educationTuition">
              <span class="currency-symbol">$</span>
              <input type="number" v-model.number="form.deductionAmounts.educationTuition" @input="calculate" min="0" max="4000" step="100" />
            </div>
          </div>
        </div>
      </div>

      <!-- Use Standard Deduction? -->
      <div class="form-row radio-row">
        <label>Use Standard Deduction?</label>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" value="yes" v-model="form.useStandardDeduction" @change="calculate" />
            <span>yes</span>
          </label>
          <label class="radio-label">
            <input type="radio" value="no" v-model="form.useStandardDeduction" @change="calculate" />
            <span>no</span>
          </label>
        </div>
      </div>

      <!-- State + City Tax Rate -->
      <div class="form-row">
        <label>State + City Tax Rate</label>
        <div class="input-with-symbol">
          <input type="number" step="0.1" v-model.number="form.stateTaxRate" @input="calculate" min="0" max="13.3" />
          <span class="percent-symbol">%</span>
        </div>
      </div>

      <!-- Self-Employed -->
      <div class="form-row radio-row">
        <label>Self-Employed</label>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" value="yes" v-model="form.selfEmployed" @change="calculate" />
            <span>yes</span>
          </label>
          <label class="radio-label">
            <input type="radio" value="no" v-model="form.selfEmployed" @change="calculate" />
            <span>no</span>
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
      <h2>Results:</h2>

      <div class="penalty-message" :class="results.difference > 0 ? 'penalty' : 'bonus'">
        <p v-if="results.difference > 0">
          Unfortunately, you will pay <strong>~ ${{ formatNumber(Math.abs(results.difference)) }} more</strong> federal income tax if married.
        </p>
        <p v-else>
          Congratulations! You will save <strong>~ ${{ formatNumber(Math.abs(results.difference)) }}</strong> federal income tax if married.
        </p>
      </div>

      <table class="results-table">
        <thead>
          <tr>
            <th></th>
            <th colspan="2">If Not Married</th>
            <th>Combined</th>
            <th>If Married</th>
          </tr>
          <tr>
            <th></th>
            <th>Spouse 1</th>
            <th>Spouse 2</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>All Income</td>
            <td>${{ formatNumber(results.spouse1.income) }}</td>
            <td>${{ formatNumber(results.spouse2.income) }}</td>
            <td>${{ formatNumber(results.combined.income) }}</td>
            <td>${{ formatNumber(results.married.income) }}</td>
          </tr>
          <tr>
            <td>Federal Income Tax</td>
            <td>${{ formatNumber(results.spouse1.federalTax) }}</td>
            <td>${{ formatNumber(results.spouse2.federalTax) }}</td>
            <td>${{ formatNumber(results.combined.federalTax) }}</td>
            <td>${{ formatNumber(results.married.federalTax) }}</td>
          </tr>
          <tr>
            <td>Marginal Tax Rate</td>
            <td>{{ results.spouse1.marginalRate }}%</td>
            <td>{{ results.spouse2.marginalRate }}%</td>
            <td></td>
            <td>{{ results.married.marginalRate }}%</td>
          </tr>
          <tr>
            <td>Social Security Tax</td>
            <td>${{ formatNumber(results.spouse1.socialSecurityTax) }}</td>
            <td>${{ formatNumber(results.spouse2.socialSecurityTax) }}</td>
            <td>${{ formatNumber(results.combined.socialSecurityTax) }}</td>
            <td>${{ formatNumber(results.married.socialSecurityTax) }}</td>
          </tr>
          <tr>
            <td>Medicare Tax</td>
            <td>${{ formatNumber(results.spouse1.medicareTax) }}</td>
            <td>${{ formatNumber(results.spouse2.medicareTax) }}</td>
            <td>${{ formatNumber(results.combined.medicareTax) }}</td>
            <td>${{ formatNumber(results.married.medicareTax) }}</td>
          </tr>
          <tr>
            <td>State + City Income Tax</td>
            <td>${{ formatNumber(results.spouse1.stateTax) }}</td>
            <td>${{ formatNumber(results.spouse2.stateTax) }}</td>
            <td>${{ formatNumber(results.combined.stateTax) }}</td>
            <td>${{ formatNumber(results.married.stateTax) }}</td>
          </tr>
          <tr>
            <td>401K, IRA...</td>
            <td>${{ formatNumber(results.spouse1.retirementSavings) }}</td>
            <td>${{ formatNumber(results.spouse2.retirementSavings) }}</td>
            <td>${{ formatNumber(results.combined.retirementSavings) }}</td>
            <td>${{ formatNumber(results.married.retirementSavings) }}</td>
          </tr>
          <tr class="total-row">
            <td>Final Take Home</td>
            <td>${{ formatNumber(results.spouse1.takeHome) }}</td>
            <td>${{ formatNumber(results.spouse2.takeHome) }}</td>
            <td>${{ formatNumber(results.combined.takeHome) }}</td>
            <td>${{ formatNumber(results.married.takeHome) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Related Tools -->
    <div class="related-tools">
      <span class="related-label">Related:</span>
      <a href="/paycheck">Paycheck Calculator</a> <span class="sep">|</span>
      <a href="/take-home-paycheck-calculator">Take-Home-Paycheck Calculator</a>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarriageTaxCalculator',
  data() {
    return {
      form: {
        spouse1: {
          salary: 65000,
          interest: 0,
          rental: 0,
          shortTermGain: 0,
          longTermGain: 0,
          qualifiedDividends: 0,
          retirementSavings: 10000
        },
        spouse2: {
          salary: 45000,
          interest: 0,
          rental: 0,
          shortTermGain: 0,
          longTermGain: 0,
          qualifiedDividends: 0,
          retirementSavings: 6000
        },
        dependents: 0,
        deductions: {
          mortgageInterest: false,
          charitableDonations: false,
          studentLoanInterest: false,
          childCareExpenses: false,
          educationTuition: false
        },
        deductionAmounts: {
          mortgageInterest: 0,
          charitableDonations: 0,
          studentLoanInterest: 0,
          childCareExpenses: 0,
          educationTuition: 0
        },
        useStandardDeduction: 'yes',
        stateTaxRate: 5,
        selfEmployed: 'no'
      },
      results: {
        calculated: false,
        difference: 0,
        spouse1: {},
        spouse2: {},
        combined: {},
        married: {}
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
      // Calculate total income for each spouse
      const income1 = this.form.spouse1.salary + 
                      this.form.spouse1.interest + 
                      this.form.spouse1.rental + 
                      this.form.spouse1.shortTermGain +
                      this.form.spouse1.longTermGain +
                      this.form.spouse1.qualifiedDividends;
      
      const income2 = this.form.spouse2.salary + 
                      this.form.spouse2.interest + 
                      this.form.spouse2.rental + 
                      this.form.spouse2.shortTermGain +
                      this.form.spouse2.longTermGain +
                      this.form.spouse2.qualifiedDividends;
      
      const totalIncome = income1 + income2;

      // Calculate deductions
      const standardDeductionSingle = 13850; // 2024 standard deduction
      const standardDeductionMarried = 27700;

      let itemizedDeductions1 = 0;
      let itemizedDeductions2 = 0;
      let itemizedDeductionsMarried = 0;

      if (this.form.useStandardDeduction === 'no') {
        // Calculate itemized deductions for each spouse
        if (this.form.deductions.mortgageInterest) {
          const amount = this.form.deductionAmounts.mortgageInterest || 0;
          itemizedDeductions1 += amount / 2;
          itemizedDeductions2 += amount / 2;
          itemizedDeductionsMarried += amount;
        }
        if (this.form.deductions.charitableDonations) {
          const amount = this.form.deductionAmounts.charitableDonations || 0;
          itemizedDeductions1 += amount / 2;
          itemizedDeductions2 += amount / 2;
          itemizedDeductionsMarried += amount;
        }
        if (this.form.deductions.studentLoanInterest) {
          const amount = Math.min(this.form.deductionAmounts.studentLoanInterest || 0, 2500);
          itemizedDeductions1 += amount / 2;
          itemizedDeductions2 += amount / 2;
          itemizedDeductionsMarried += amount;
        }
        if (this.form.deductions.childCareExpenses) {
          const amount = Math.min(this.form.deductionAmounts.childCareExpenses || 0, 3000);
          itemizedDeductions1 += amount / 2;
          itemizedDeductions2 += amount / 2;
          itemizedDeductionsMarried += amount;
        }
        if (this.form.deductions.educationTuition) {
          const amount = Math.min(this.form.deductionAmounts.educationTuition || 0, 4000);
          itemizedDeductions1 += amount / 2;
          itemizedDeductions2 += amount / 2;
          itemizedDeductionsMarried += amount;
        }
      }

      // Use the larger of standard or itemized deductions
      const deduction1 = this.form.useStandardDeduction === 'yes' ? standardDeductionSingle : Math.max(standardDeductionSingle, itemizedDeductions1);
      const deduction2 = this.form.useStandardDeduction === 'yes' ? standardDeductionSingle : Math.max(standardDeductionSingle, itemizedDeductions2);
      const deductionMarried = this.form.useStandardDeduction === 'yes' ? standardDeductionMarried : Math.max(standardDeductionMarried, itemizedDeductionsMarried);

      // Calculate taxable income (after retirement savings and deductions)
      const taxable1 = Math.max(0, income1 - this.form.spouse1.retirementSavings - deduction1);
      const taxable2 = Math.max(0, income2 - this.form.spouse2.retirementSavings - deduction2);
      const taxableMarried = Math.max(0, totalIncome - this.form.spouse1.retirementSavings - this.form.spouse2.retirementSavings - deductionMarried);

      // Federal income tax brackets (2024 simplified)
      const brackets = {
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
      };

      // Calculate federal tax
      const federalTax1 = this.calculateFederalTax(taxable1, brackets.single);
      const federalTax2 = this.calculateFederalTax(taxable2, brackets.single);
      const federalTaxMarried = this.calculateFederalTax(taxableMarried, brackets.married);

      // Calculate marginal tax rates
      const marginalRate1 = this.getMarginalRate(taxable1, brackets.single);
      const marginalRate2 = this.getMarginalRate(taxable2, brackets.single);
      const marginalRateMarried = this.getMarginalRate(taxableMarried, brackets.married);

      // Social Security tax (6.2% up to wage base limit)
      const wageBaseLimit = 168600;
      const socialSecurityRate = 0.062;
      
      const ssTax1 = Math.min(income1, wageBaseLimit) * socialSecurityRate;
      const ssTax2 = Math.min(income2, wageBaseLimit) * socialSecurityRate;
      const ssTaxMarried = Math.min(income1, wageBaseLimit) * socialSecurityRate + 
                           Math.min(income2, wageBaseLimit) * socialSecurityRate;

      // Medicare tax (1.45%)
      const medicareRate = 0.0145;
      const medicareTax1 = income1 * medicareRate;
      const medicareTax2 = income2 * medicareRate;
      const medicareTaxMarried = totalIncome * medicareRate;

      // Additional Medicare tax for high earners (simplified)
      if (this.form.selfEmployed === 'yes') {
        // Self-employed pay both employee and employer portions (2.9% total)
        // Not implementing the full self-employed calculation for simplicity
      }

      // State tax
      const stateRate = this.form.stateTaxRate / 100;
      const stateTax1 = income1 * stateRate;
      const stateTax2 = income2 * stateRate;
      const stateTaxMarried = totalIncome * stateRate;

      // Calculate take home pay
      const takeHome1 = income1 - federalTax1 - ssTax1 - medicareTax1 - stateTax1 - this.form.spouse1.retirementSavings;
      const takeHome2 = income2 - federalTax2 - ssTax2 - medicareTax2 - stateTax2 - this.form.spouse2.retirementSavings;
      const takeHomeMarried = totalIncome - federalTaxMarried - ssTaxMarried - medicareTaxMarried - stateTaxMarried - 
                              this.form.spouse1.retirementSavings - this.form.spouse2.retirementSavings;

      const combinedFederal = federalTax1 + federalTax2;
      const combinedSS = ssTax1 + ssTax2;
      const combinedMedicare = medicareTax1 + medicareTax2;
      const combinedState = stateTax1 + stateTax2;
      const combinedTakeHome = takeHome1 + takeHome2;

      this.results = {
        calculated: true,
        difference: federalTaxMarried - combinedFederal,
        spouse1: {
          income: income1,
          federalTax: federalTax1,
          marginalRate: marginalRate1,
          socialSecurityTax: ssTax1,
          medicareTax: medicareTax1,
          stateTax: stateTax1,
          retirementSavings: this.form.spouse1.retirementSavings,
          takeHome: takeHome1
        },
        spouse2: {
          income: income2,
          federalTax: federalTax2,
          marginalRate: marginalRate2,
          socialSecurityTax: ssTax2,
          medicareTax: medicareTax2,
          stateTax: stateTax2,
          retirementSavings: this.form.spouse2.retirementSavings,
          takeHome: takeHome2
        },
        combined: {
          income: totalIncome,
          federalTax: combinedFederal,
          socialSecurityTax: combinedSS,
          medicareTax: combinedMedicare,
          stateTax: combinedState,
          retirementSavings: this.form.spouse1.retirementSavings + this.form.spouse2.retirementSavings,
          takeHome: combinedTakeHome
        },
        married: {
          income: totalIncome,
          federalTax: federalTaxMarried,
          marginalRate: marginalRateMarried,
          socialSecurityTax: ssTaxMarried,
          medicareTax: medicareTaxMarried,
          stateTax: stateTaxMarried,
          retirementSavings: this.form.spouse1.retirementSavings + this.form.spouse2.retirementSavings,
          takeHome: takeHomeMarried
        }
      };
    },

    calculateFederalTax(taxableIncome, brackets) {
      if (taxableIncome <= 0) return 0;
      
      let tax = 0;
      let remainingIncome = taxableIncome;
      let previousLimit = 0;
      
      for (const bracket of brackets) {
        if (remainingIncome <= 0) break;
        
        const taxableInBracket = Math.min(remainingIncome, bracket.upTo - previousLimit);
        tax += taxableInBracket * bracket.rate;
        remainingIncome -= taxableInBracket;
        previousLimit = bracket.upTo;
      }
      
      return tax;
    },

    getMarginalRate(taxableIncome, brackets) {
      if (taxableIncome <= 0) return 0;
      
      for (const bracket of brackets) {
        if (taxableIncome <= bracket.upTo) {
          return bracket.rate * 100;
        }
      }
      return brackets[brackets.length - 1].rate * 100;
    },

    clearForm() {
      this.form = {
        spouse1: {
          salary: 65000,
          interest: 0,
          rental: 0,
          shortTermGain: 0,
          longTermGain: 0,
          qualifiedDividends: 0,
          retirementSavings: 10000
        },
        spouse2: {
          salary: 45000,
          interest: 0,
          rental: 0,
          shortTermGain: 0,
          longTermGain: 0,
          qualifiedDividends: 0,
          retirementSavings: 6000
        },
        dependents: 0,
        deductions: {
          mortgageInterest: false,
          charitableDonations: false,
          studentLoanInterest: false,
          childCareExpenses: false,
          educationTuition: false
        },
        deductionAmounts: {
          mortgageInterest: 0,
          charitableDonations: 0,
          studentLoanInterest: 0,
          childCareExpenses: 0,
          educationTuition: 0
        },
        useStandardDeduction: 'yes',
        stateTaxRate: 5,
        selfEmployed: 'no'
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
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.form-row label {
  width: 220px;
  font-weight: 500;
  color: #1a3349;
  font-size: 1rem;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 150px;
}

.input-group .currency-symbol {
  font-weight: 500;
  color: #1a3349;
}

.status-display {
  flex: 1;
  padding: 8px 0;
  font-weight: 500;
  color: #1f4a7a;
}

.status-displace {
  flex: 1;
}

.input-group input,
.input-with-symbol input {
  padding: 8px 12px;
  border: 1px solid #b6c9dd;
  border-radius: 30px;
  font-size: 0.95rem;
  width: 140px;
  background: white;
}

.radio-row {
  align-items: flex-start;
}

.radio-group {
  display: flex;
  gap: 20px;
  flex: 1;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.radio-label input[type="radio"] {
  width: auto;
  margin: 0;
}

.deductions-section {
  margin: 20px 0;
  padding: 16px;
  background: #e8f0fe;
  border-radius: 20px;
}

.deductions-section label {
  font-weight: 600;
  color: #1a3349;
  display: block;
  margin-bottom: 12px;
}

.deductions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.deduction-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: normal;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin: 0;
}

.input-with-symbol {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 24px;
}

.input-with-symbol input {
  width: 120px;
  padding: 6px 10px;
}

.percent-symbol {
  font-weight: 500;
  color: #1a3349;
}

.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

button {
  background: #1f3a5f;
  border: none;
  color: white;
  padding: 12px 32px;
  border-radius: 40px;
  font-size: 1rem;
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

.penalty-message {
  background: white;
  border-radius: 16px;
  padding: 16px 24px;
  margin-bottom: 24px;
  font-size: 1.2rem;
}

.penalty-message.penalty {
  border-left: 6px solid #dc2626;
}

.penalty-message.bonus {
  border-left: 6px solid #16a34a;
}

.penalty-message strong {
  font-size: 1.4rem;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.results-table th {
  background: #e1eaf3;
  padding: 14px 12px;
  text-align: left;
  font-weight: 600;
  color: #1a3349;
}

.results-table td {
  padding: 12px;
  border-bottom: 1px solid #e9eef3;
  color: #2c405c;
}

.results-table .total-row {
  font-weight: 600;
  background: #ecf3fa;
}

.results-table .total-row td {
  border-top: 2px solid #cbd5e1;
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
  .form-row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .form-row label {
    width: 100%;
  }
  
  .input-group {
    width: 100%;
  }
  
  .input-group input {
    width: 100%;
  }
  
  .results-table {
    font-size: 0.9rem;
  }
  
  .results-table th,
  .results-table td {
    padding: 8px 6px;
  }
}
</style>