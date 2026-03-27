<template>
  <div class="affordability-calculator">
    <!-- 头部介绍 -->
    <div class="hero">
      <h1>House Affordability Calculator: How Much House Can You Afford?</h1>
      <p>Use our house affordability calculator to find out how much home you can afford based on your income, monthly expenses, debt, and mortgage rate. Estimate your maximum home price, monthly payment, and required down payment instantly. Whether you're a first-time home buyer or planning your next move, this tool helps you understand your true budget and make smarter financial decisions.</p>
    </div>

    <!-- 计算器区域 -->
    <div class="calculator-section">
      <div class="form-card">
        <!-- Annual household income -->
        <div class="form-group">
          <label>
            <span class="label-text">Annual household income</span>
            <span class="info-tip" @click="toggleTip('income')">ⓘ</span>
          </label>
          <div class="input-wrapper">
            <span class="currency">$</span>
            <input 
              type="number" 
              v-model.number="inputs.income" 
              step="1000" 
              min="0"
              placeholder="e.g., 120000"
            />
          </div>
          <div v-if="activeTip === 'income'" class="tip-content">
            Total gross annual income before taxes, including salary, wages, bonuses, self-employment, investments, and any other regular income sources for all household members.
          </div>
        </div>

        <!-- Mortgage loan term -->
        <div class="form-group">
          <label>Mortgage loan term</label>
          <select v-model.number="inputs.loanTerm">
            <option :value="30">30 years</option>
            <option :value="15">15 years</option>
            <option :value="10">10 years</option>
          </select>
        </div>

        <!-- Interest rate -->
        <div class="form-group">
          <label>Interest rate</label>
          <div class="input-wrapper">
            <input 
              type="number" 
              v-model.number="inputs.interestRate" 
              step="0.125" 
              min="0"
              placeholder="6.505"
            />
            <span class="percent">%</span>
          </div>
        </div>

        <!-- Monthly debt payback -->
        <div class="form-group">
          <label>
            <span class="label-text">Monthly debt payback</span>
            <span class="info-tip" @click="toggleTip('debt')">ⓘ</span>
          </label>
          <div class="input-wrapper">
            <span class="currency">$</span>
            <input 
              type="number" 
              v-model.number="inputs.monthlyDebt" 
              step="50" 
              min="0"
              placeholder="e.g., 0"
            />
          </div>
          <div v-if="activeTip === 'debt'" class="tip-content">
            Recurring monthly debt obligations: car loans, student loans, credit card minimum payments, personal loans, alimony, child support, etc. Do not include current housing expenses.
          </div>
        </div>

        <!-- Down payment -->
        <div class="form-group">
          <label>Down payment</label>
          <div class="down-payment-group">
            <div class="down-option">
              <input type="radio" id="downPercent" value="percent" v-model="downType" />
              <label for="downPercent" class="radio-label">
                <input 
                  type="number" 
                  v-model.number="inputs.downPercent" 
                  step="1" 
                  min="0" 
                  max="100"
                  :disabled="downType !== 'percent'"
                />
                <span>%</span>
              </label>
            </div>
            <div class="down-option">
              <input type="radio" id="downFixed" value="fixed" v-model="downType" />
              <label for="downFixed" class="radio-label">
                <span class="currency-sm">$</span>
                <input 
                  type="number" 
                  v-model.number="inputs.downFixed" 
                  step="5000" 
                  min="0"
                  :disabled="downType !== 'fixed'"
                />
              </label>
            </div>
          </div>
        </div>

        <!-- Property tax -->
        <div class="form-group">
          <label>Property tax</label>
          <div class="input-wrapper">
            <input 
              type="number" 
              v-model.number="inputs.propertyTax" 
              step="0.1" 
              min="0"
              placeholder="1.5"
            />
            <span class="percent">% per year</span>
          </div>
        </div>

        <!-- HOA or co-op fee -->
        <div class="form-group">
          <label>HOA or co-op fee</label>
          <div class="input-wrapper">
            <input 
              type="number" 
              v-model.number="inputs.hoa" 
              step="0.1" 
              min="0"
              placeholder="0"
            />
            <span class="percent">% per year</span>
          </div>
        </div>

        <!-- Insurance -->
        <div class="form-group">
          <label>Insurance</label>
          <div class="input-wrapper">
            <input 
              type="number" 
              v-model.number="inputs.insurance" 
              step="0.1" 
              min="0"
              placeholder="0.5"
            />
            <span class="percent">% per year</span>
          </div>
        </div>

        <!-- DTI ratio selector -->
        <div class="form-group">
          <label>Debt-to-income (DTI) ratio</label>
          <select v-model="dtiPreset">
            <option value="conventional">Conventional loan (28/36 rule)</option>
            <option value="fha">FHA loan (31/43 rule)</option>
            <option value="va">VA loan (41% back-end)</option>
            <option value="custom">Custom ratios</option>
          </select>
        </div>

        <!-- Custom DTI sliders (visible when custom selected) -->
        <div v-if="dtiPreset === 'custom'" class="custom-dti">
          <div class="form-group">
            <label>Front-end DTI (housing only): {{ customFrontEnd }}%</label>
            <input type="range" v-model.number="customFrontEnd" min="10" max="50" step="5" />
          </div>
          <div class="form-group">
            <label>Back-end DTI (total debt): {{ customBackEnd }}%</label>
            <input type="range" v-model.number="customBackEnd" min="10" max="50" step="5" />
          </div>
        </div>

        <!-- Action buttons -->
        <div class="action-buttons">
          <button class="btn-primary" @click="calculate">Calculate</button>
          <button class="btn-secondary" @click="resetForm">Clear</button>
        </div>

        <!-- Latest mortgage rates -->
        <div class="mortgage-rates">
          <span>Latest Mortgage Rates:</span>
          <span>30 Years: <strong>{{ latestRates.thirty }}%</strong></span>
          <span>15 Years: <strong>{{ latestRates.fifteen }}%</strong></span>
          <span>10 Years: <strong>{{ latestRates.ten }}%</strong></span>
          <a :href="ratesLink" target="_blank" rel="noopener noreferrer">See your local rates →</a>
        </div>
      </div>
    </div>

    <!-- 计算结果区域 -->
    <div class="results-section" v-if="results.affordablePrice > 0">
      <div class="result-card">
        <h2>Your Affordability Summary</h2>
        <p class="affordability-message">
          You can afford a house up to <strong>${{ formatNumber(results.affordablePrice) }}</strong> 
          according to the {{ dtiLabel }} rule, within which ${{ formatNumber(results.loanAmount) }} 
          is the loan and ${{ formatNumber(results.downPayment) }} is the down payment.
          <span v-if="dtiPreset === 'conventional'">Most conventional loan lenders use the 28/36 rule.</span>
        </p>

        <div class="result-grid">
          <div class="result-item">
            <span class="result-label">You can borrow</span>
            <span class="result-value">${{ formatNumber(results.loanAmount) }}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Total price of the house</span>
            <span class="result-value">${{ formatNumber(results.affordablePrice) }}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Down payment</span>
            <span class="result-value">${{ formatNumber(results.downPayment) }}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Estimated closing cost (one time, assume 3%)</span>
            <span class="result-value">${{ formatNumber(results.closingCost) }}</span>
          </div>
          <div class="result-item">
            <span class="result-label">Front-end debt-to-income (DTI) ratio</span>
            <span class="result-value">{{ results.frontEndRatio }}%</span>
          </div>
          <div class="result-item">
            <span class="result-label">Back-end debt-to-income (DTI) ratio</span>
            <span class="result-value">{{ results.backEndRatio }}%</span>
          </div>
          <div class="result-item highlight">
            <span class="result-label">Total one-time payment at closing</span>
            <span class="result-value">${{ formatNumber(results.totalClosingCost) }}</span>
          </div>
        </div>

        <div class="monthly-breakdown">
          <h3>Monthly Housing Cost Breakdown</h3>
          <div class="result-grid">
            <div class="result-item">
              <span class="result-label">Monthly mortgage payment</span>
              <span class="result-value">${{ formatNumber(results.monthlyMortgage) }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">Annual property tax</span>
              <span class="result-value">${{ formatNumber(results.annualTax) }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">Annual HOA or co-op fee</span>
              <span class="result-value">${{ formatNumber(results.annualHOA) }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">Annual insurance cost</span>
              <span class="result-value">${{ formatNumber(results.annualInsurance) }}</span>
            </div>
            <div class="result-item">
              <span class="result-label">Estimated annual maintenance cost (repair, utility etc., assume 1.5%)</span>
              <span class="result-value">${{ formatNumber(results.annualMaintenance) }}</span>
            </div>
            <div class="result-item highlight">
              <span class="result-label">Total monthly cost on the house</span>
              <span class="result-value">${{ formatNumber(results.totalMonthlyCost) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related links -->
    <div class="related-links">
      <a href="/mortgage">Mortgage Calculator</a> |
      <a href="/mortgage-payoff">Mortgage Payoff Calculator</a> |
      <a href="/">Fixed House affordability Calculator</a>
    </div>

    <!-- FAQ Section - fully expanded -->
    <div class="faq-section">
      <h2>House Affordability Calculator - Frequently Asked Questions</h2>
      
      <div class="faq-item">
        <h3>What are front-end and back-end ratios, and why do lenders use them?</h3>
        <p>In the U.S., conventional, FHA, and other mortgage lenders like to use two ratios, called the front-end and back-end ratios, to determine how much money they are willing to loan. They are basic debt-to-income ratios (DTI), albeit slightly different and explained below. For more information about or to do calculations involving debt-to-income ratios, please visit the Debt-to-Income (DTI) Ratio Calculator.</p>
        <p>Because they are used by lenders to assess the risk of lending to each home-buyer, home-buyers can strive to lower their DTI in order to not only be able to qualify for a mortgage, but for a favorable one. The lower the DTI, the more likely a home-buyer is to get a good deal.</p>
      </div>

      <div class="faq-item">
        <h3>How is the Front-End Ratio calculated?</h3>
        <p>The front-end debt ratio is also known as the mortgage-to-income ratio and is computed by dividing total monthly housing costs by monthly gross income.</p>
        <p>Front-end debt ratio = (monthly housing costs / monthly gross income) × 100%</p>
        <p>For our calculator, only conventional and FHA loans utilize the front-end debt ratio. The monthly housing costs not only include interest and principal of the loan, but other costs associated with housing like insurance, property taxes, and HOA/Co-Op Fee.</p>
      </div>

      <div class="faq-item">
        <h3>How is the Back-End Ratio calculated?</h3>
        <p>The back-end debt ratio includes everything in the front-end ratio dealing with housing costs, along with any accrued recurring monthly debt like car loans, student loans, and credit cards.</p>
        <p>Back-end debt ratio = (monthly housing costs + all other recurring monthly debt) / monthly gross income × 100%</p>
        <p>This ratio is known as the debt-to-income ratio and is used for all the calculations of this calculator.</p>
      </div>

      <div class="faq-item">
        <h3>What is the 28/36 Rule for Conventional Loans?</h3>
        <p>In the U.S., a conventional loan is a mortgage that is not insured by the federal government directly and generally refers to a mortgage loan that follows the guidelines of government-sponsored enterprises (GSE's) like Fannie Mae or Freddie Mac. Conventional loans may be either conforming or non-conforming. Conforming loans are bought by housing agencies such as Freddie Mac and Fannie Mae and follow their terms and conditions. Non-conforming loans are any loans not bought by these housing agencies that don't follow the terms and conditions laid out by these agencies, but are generally still considered conventional loans.</p>
        <p>The 28/36 Rule is a commonly accepted guideline used in the U.S. and Canada to determine each household's risk for conventional loans. It states that a household should spend no more than 28% of its gross monthly income on the front-end debt and no more than 36% of its gross monthly income on the back-end debt. The 28/36 Rule is a qualification requirement for conforming conventional loans.</p>
        <p>While it has been adopted as one of the most widely-used methods of determining the risk associated with a borrower, as Shiller documents in his critically-acclaimed book Irrational Exuberance, the 28/36 Rule is often dismissed by lenders under heavy stress in competitive lending markets. Because it is so leniently enforced, certain lenders can sometimes lend to risky borrowers who may not actually qualify based on the 28/36 Rule.</p>
      </div>

      <div class="faq-item">
        <h3>What are FHA Loans and their DTI requirements?</h3>
        <p>Please visit our FHA Loan Calculator to get more in-depth information regarding FHA loans, or to calculate estimated monthly payments on FHA loans.</p>
        <p>An FHA loan is a mortgage insured by the Federal Housing Administration. Borrowers must pay for mortgage insurance in order to protect lenders from losses in instances of defaults on loans. The insurance allows lenders to offer FHA loans at lower interest rates than usual with more flexible requirements, such as lower down payment as a percentage of the purchase price.</p>
        <p>To be approved for FHA loans, the ratio of front-end to back-end ratio of applicants needs to be better than 31/43. In other words, monthly housing costs should not exceed 31%, and all secured and non-secured monthly recurring debts should not exceed 43% of monthly gross income. FHA loans also require 1.75% upfront premiums.</p>
        <p>FHA loans have more lax debt-to-income controls than conventional loans; they allow borrowers to have 3% more front-end debt and 7% more back-end debt. The reason that FHA loans can be offered to riskier clients is the required upfront payment of mortgage insurance premiums.</p>
      </div>

      <div class="faq-item">
        <h3>What are VA Loans and their DTI guidelines?</h3>
        <p>Please visit our VA Mortgage Calculator to get more in-depth information regarding VA loans, or to calculate estimated monthly payments on VA mortgages.</p>
        <p>A VA loan is a mortgage loan granted to veterans, service members on active duty, members of the national guard, reservists, or surviving spouses, and is guaranteed by the U.S. Department of Veterans Affairs (VA).</p>
        <p>To be approved for a VA loan, the back-end ratio of the applicant needs to be better than 41%. In other words, the sum of monthly housing costs and all recurring secured and non-secured debts should not exceed 41% of gross monthly income. VA loans generally do not consider front-end ratios of applicants but require funding fees.</p>
      </div>

      <div class="faq-item">
        <h3>How do Custom Debt-to-Income Ratios work?</h3>
        <p>The calculator also allows the user to select from debt-to-income ratios between 10% to 50% in increments of 5%. If coupled with down payments less than 20%, 0.5% of PMI insurance will automatically be added to monthly housing costs because they are assumed to be calculations for conventional loans. There are no options above 50% because that is the point at which DTI exceeds risk thresholds for nearly all mortgage lenders.</p>
        <p>In general, home-buyers should use lower percentages for more conservative estimates and higher percentages for more risky estimates. A 20% DTI is easier to pay off during stressful financial periods compared to, say, a 45% DTI. Home-buyers who are unsure of which option to use can try the Conventional Loan option, which uses the 28/36 Rule.</p>
      </div>

      <div class="faq-item">
        <h3>What can I do if I cannot afford the house I want?</h3>
        <p>If you cannot immediately afford the house you want, below are some steps that can be taken to increase house affordability, albeit with time and due diligence.</p>
        <p>* Reduce debt in other areas—This may include anything from choosing a less expensive car to paying off student loans. In essence, lowering the standard of living in other areas can make it more possible to afford a particularly sought-after house.</p>
        <p>* Increase credit score—A better credit score can help buyers find a loan with a better interest rate. A lower interest rate helps the buyer's purchasing power.</p>
        <p>* Bigger down payment—Paying more upfront accomplishes two things. One, it directly increases the amount the buyer can afford. Two, a big down payment helps the buyer find a better interest rate and therefore increases the buyer's purchasing power.</p>
        <p>* Save more—When desired DTI ratios aren't met, mortgage lenders may look at the amount of savings of each borrower as a compensating factor.</p>
        <p>* Higher income—Although increasing income is easier said than done, it can culminate in the most drastic change in a borrower's ability to purchase a certain home. A large increase in salary immediately has a large impact on DTI ratios. Acquiring a higher income usually involves different combinations of achieving higher education, improving skills, networking, constant job searching, and typically lots of hard work.</p>
        <p>Working towards achieving one or more of these will increase a household's success rate in qualifying for the purchase of a home in accordance with lenders' standards of qualifications. If these prove to be difficult, home-buyers can maybe consider less expensive homes. Some people find better luck moving to different cities. If not, there are various housing assistance programs at the local level, though these are geared more towards low-income households. Renting is a viable alternative to owning a home, and it may be helpful to rent for the time being in order to set up a better buying situation in the future. For more information about or to do calculations involving rent, please visit the Rent Calculator.</p>
      </div>
    </div>
    <section class="section calculator-cta">
      <a href="/100k-salary-how-much-house-can-you-afford-blog" class="calculator-btn">
      $100K Salary: How Much House Can You Afford? (Calculator + Examples) →
      </a>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HouseAffordabilityCalculator',
  data() {
    return {
      // Form inputs
      inputs: {
        income: 120000,
        loanTerm: 30,
        interestRate: 6.505,
        monthlyDebt: 0,
        downPercent: 20,
        downFixed: 0,
        propertyTax: 1.5,
        hoa: 0,
        insurance: 0.5
      },
      downType: 'percent',
      activeTip: null,
      dtiPreset: 'conventional',
      customFrontEnd: 28,
      customBackEnd: 36,
      // Results
      results: {
        affordablePrice: 0,
        loanAmount: 0,
        downPayment: 0,
        closingCost: 0,
        totalClosingCost: 0,
        frontEndRatio: 0,
        backEndRatio: 0,
        monthlyMortgage: 0,
        annualTax: 0,
        annualHOA: 0,
        annualInsurance: 0,
        annualMaintenance: 0,
        totalMonthlyCost: 0
      },
      latestRates: {
        thirty: 6.505,
        fifteen: 5.677,
        ten: 5.565
      },
      ratesLink: 'https://www.veteransunited.com/lp/va-mortgage-rates/'
    }
  },
  computed: {
    dtiLabel() {
      if (this.dtiPreset === 'conventional') return '28/36'
      if (this.dtiPreset === 'fha') return '31/43'
      if (this.dtiPreset === 'va') return 'VA 41% back-end'
      return `${this.customFrontEnd}/${this.customBackEnd}`
    }
  },
  mounted() {
     document.title = 'House Affordability Calculator 2026 – How Much House Can I Afford Based on Income & Mortgage Rates'
    // 2. 设置关键meta标签（Google最关注的）
    this.setGoogleMetaTags()
    this.calculate()
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
      desc.content = 'Use our house affordability calculator to estimate how much home you can afford based on your income, debt, down payment, and mortgage rates. Quickly calculate your budget, monthly payments, and home price range with accurate and easy-to-use tools.'
      
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
    toggleTip(tip) {
      this.activeTip = this.activeTip === tip ? null : tip
    },
    formatNumber(num) {
      return Math.round(num).toLocaleString()
    },
    getEffectiveDownPayment(housePrice) {
      if (this.downType === 'percent') {
        return (housePrice * this.inputs.downPercent) / 100
      } else {
        return this.inputs.downFixed
      }
    },
    calculateMonthlyPayment(loanAmount, annualRate, years) {
      const monthlyRate = annualRate / 100 / 12
      const months = years * 12
      if (monthlyRate === 0) return loanAmount / months
      return loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
    },
    getFrontEndLimit() {
      if (this.dtiPreset === 'conventional') return 28
      if (this.dtiPreset === 'fha') return 31
      if (this.dtiPreset === 'custom') return this.customFrontEnd
      return 100 // VA no front limit
    },
    getBackEndLimit() {
      if (this.dtiPreset === 'conventional') return 36
      if (this.dtiPreset === 'fha') return 43
      if (this.dtiPreset === 'va') return 41
      if (this.dtiPreset === 'custom') return this.customBackEnd
      return 41
    },
    calculate() {
      const monthlyGross = this.inputs.income / 12
      const frontLimit = this.getFrontEndLimit()
      const backLimit = this.getBackEndLimit()

      let maxByBack = 0
      
      // Find max house price based on front-end ratio
      let maxByFront = 0
      let low = 0, high = 2000000
      for (let iter = 0; iter < 60; iter++) {
        const testPrice = (low + high) / 2
        const downPaymentAmount = this.getEffectiveDownPayment(testPrice)
        const loanAmount = Math.max(0, testPrice - downPaymentAmount)
        if (loanAmount <= 0) {
          low = testPrice
          continue
        }
        const monthlyMortgage = this.calculateMonthlyPayment(loanAmount, this.inputs.interestRate, this.inputs.loanTerm)
        const annualTaxAmount = testPrice * this.inputs.propertyTax / 100
        const annualHOA = testPrice * this.inputs.hoa / 100
        const annualInsurance = testPrice * this.inputs.insurance / 100
        const monthlyHousingCost = monthlyMortgage + annualTaxAmount/12 + annualHOA/12 + annualInsurance/12
        
        const frontRatio = (monthlyHousingCost / monthlyGross) * 100
        if (frontRatio <= frontLimit) {
          low = testPrice
        } else {
          high = testPrice
        }
      }
      maxByFront = low
      
      // Back-end search
      low = 0, high = 2000000
      for (let iter = 0; iter < 60; iter++) {
        const testPrice = (low + high) / 2
        const downPaymentAmount = this.getEffectiveDownPayment(testPrice)
        const loanAmount = Math.max(0, testPrice - downPaymentAmount)
        if (loanAmount <= 0) {
          low = testPrice
          continue
        }
        const monthlyMortgage = this.calculateMonthlyPayment(loanAmount, this.inputs.interestRate, this.inputs.loanTerm)
        const annualTaxAmount = testPrice * this.inputs.propertyTax / 100
        const annualHOA = testPrice * this.inputs.hoa / 100
        const annualInsurance = testPrice * this.inputs.insurance / 100
        const monthlyHousingCost = monthlyMortgage + annualTaxAmount/12 + annualHOA/12 + annualInsurance/12
        const totalMonthlyDebt = monthlyHousingCost + this.inputs.monthlyDebt
        const backRatio = (totalMonthlyDebt / monthlyGross) * 100
        
        if (backRatio <= backLimit) {
          low = testPrice
        } else {
          high = testPrice
        }
      }
      maxByBack = low
      
      const affordablePrice = Math.min(maxByFront, maxByBack)
      const downPayment = this.getEffectiveDownPayment(affordablePrice)
      const loanAmount = Math.max(0, affordablePrice - downPayment)
      const closingCost = affordablePrice * 0.03
      const totalClosingCost = downPayment + closingCost
      
      const monthlyMortgage = this.calculateMonthlyPayment(loanAmount, this.inputs.interestRate, this.inputs.loanTerm)
      const annualTax = affordablePrice * this.inputs.propertyTax / 100
      const annualHOA = affordablePrice * this.inputs.hoa / 100
      const annualInsurance = affordablePrice * this.inputs.insurance / 100
      const annualMaintenance = affordablePrice * 0.015
      const monthlyHousing = monthlyMortgage + annualTax/12 + annualHOA/12 + annualInsurance/12
      const totalMonthlyCost = monthlyHousing + annualMaintenance/12
      
      const frontEndRatio = (monthlyHousing / monthlyGross) * 100
      const backEndRatio = ((monthlyHousing + this.inputs.monthlyDebt) / monthlyGross) * 100
      
      this.results.affordablePrice = affordablePrice
      this.results.loanAmount = loanAmount
      this.results.downPayment = downPayment
      this.results.closingCost = closingCost
      this.results.totalClosingCost = totalClosingCost
      this.results.frontEndRatio = Math.round(frontEndRatio)
      this.results.backEndRatio = Math.round(backEndRatio)
      this.results.monthlyMortgage = monthlyMortgage
      this.results.annualTax = annualTax
      this.results.annualHOA = annualHOA
      this.results.annualInsurance = annualInsurance
      this.results.annualMaintenance = annualMaintenance
      this.results.totalMonthlyCost = totalMonthlyCost
    },
    resetForm() {
      this.inputs.income = 120000
      this.inputs.loanTerm = 30
      this.inputs.interestRate = 6.505
      this.inputs.monthlyDebt = 0
      this.inputs.downPercent = 20
      this.inputs.downFixed = 0
      this.inputs.propertyTax = 1.5
      this.inputs.hoa = 0
      this.inputs.insurance = 0.5
      this.downType = 'percent'
      this.dtiPreset = 'conventional'
      this.customFrontEnd = 28
      this.customBackEnd = 36
      this.calculate()
    }
  }
}
</script>

<style scoped>
.affordability-calculator {
  max-width: 900px;
  margin: 0 auto;
  padding: 16px;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  background: #f8fafc;
}

.hero h1 {
  font-size: 1.8rem;
  margin-bottom: 12px;
  color: #0f172a;
}
.hero p {
  color: #334155;
  margin-bottom: 24px;
  line-height: 1.5;
}

.form-card, .result-card {
  background: white;
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1e293b;
}
.info-tip {
  cursor: pointer;
  background: #e2e8f0;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}
.tip-content {
  background: #f1f5f9;
  padding: 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  margin-top: 8px;
  color: #334155;
}
.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: white;
}
.input-wrapper input, .down-option input {
  width: 100%;
  padding: 12px;
  border: none;
  outline: none;
  font-size: 1rem;
  border-radius: 12px;
}
.currency, .percent {
  padding: 0 12px;
  color: #475569;
}
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: white;
  font-size: 1rem;
}
.down-payment-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.down-option {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f1f5f9;
  padding: 8px 12px;
  border-radius: 12px;
}
.radio-label {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.radio-label input {
  width: 100px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
}
.custom-dti {
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px solid #e2e8f0;
}
.action-buttons {
  display: flex;
  gap: 12px;
  margin: 24px 0 16px;
}
.btn-primary, .btn-secondary {
  flex: 1;
  padding: 12px;
  border-radius: 40px;
  font-weight: bold;
  cursor: pointer;
  border: none;
}
.btn-primary {
  background: #1e40af;
  color: white;
}
.btn-secondary {
  background: #e2e8f0;
  color: #1e293b;
}
.mortgage-rates {
  background: #f1f5f9;
  padding: 12px;
  border-radius: 16px;
  font-size: 0.9rem;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}
.mortgage-rates a {
  color: #1e40af;
  text-decoration: none;
}
.affordability-message {
  background: #e6f0ff;
  padding: 16px;
  border-radius: 16px;
  margin: 16px 0;
}
.result-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
}
.result-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e2e8f0;
  padding: 10px 0;
}
.result-item.highlight {
  font-weight: bold;
  background: #fef9c3;
  padding: 12px;
  border-radius: 12px;
  grid-column: span 2;
}
.monthly-breakdown h3 {
  margin: 20px 0 12px;
}
.related-links {
  text-align: center;
  margin: 24px 0;
  padding: 16px;
  background: white;
  border-radius: 20px;
  gap: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.related-links a {
  color: #1e40af;
  text-decoration: none;
  margin: 0 4px;
}
.faq-section {
  background: white;
  border-radius: 24px;
  padding: 20px;
  margin-top: 24px;
}
.faq-item {
  margin-bottom: 28px;
}
.faq-item h3 {
  font-size: 1.2rem;
  margin-bottom: 12px;
  color: #0f172a;
}
.faq-item p {
  margin-bottom: 10px;
  line-height: 1.5;
  color: #334155;
}
@media (max-width: 640px) {
  .result-grid {
    grid-template-columns: 1fr;
  }
  .result-item.highlight {
    grid-column: span 1;
  }
  .down-payment-group {
    flex-direction: column;
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