<template>
  <div class="fixed-affordability-calculator">
    <!-- 计算器介绍 -->
    <div class="hero">
      <h1>Fixed House Affordability Calculator</h1>
      <p>Estimate your home affordability with this house affordability calculator based on monthly income, housing expenses, debt-to-income ratio, and mortgage payment capacity. Ideal for users searching how much house I can afford, home loan affordability calculator, mortgage budget planner, and monthly mortgage payment estimation.</p>
    </div>

    <!-- 计算器区域 -->
    <div class="calculator-section">
      <div class="form-card">
        <!-- Budget for house -->
        <div class="form-group">
          <label>
            <span class="label-text">Budget for house</span>
            <span class="info-tip" @click="toggleTip('budget')">ⓘ</span>
          </label>
          <div class="input-wrapper">
            <span class="currency">$</span>
            <input 
              type="number" 
              v-model.number="inputs.monthlyBudget" 
              step="100" 
              min="0"
              placeholder="e.g., 3500"
              @input="calculate"
            />
            <span class="suffix">per month</span>
          </div>
          <div v-if="activeTip === 'budget'" class="tip-content">
            The maximum amount you're comfortable spending on housing each month. This includes mortgage payment, property taxes, insurance, HOA fees, and maintenance costs. Setting a realistic budget helps you find a home that fits your financial situation.
          </div>
        </div>

        <!-- Mortgage loan term -->
        <div class="form-group">
          <label>Mortgage loan term</label>
          <select v-model.number="inputs.loanTerm" @change="calculate">
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
              placeholder="6.62"
              @input="calculate"
            />
            <span class="percent">%</span>
          </div>
        </div>

        <!-- Down payment -->
        <div class="form-group">
          <label>Down payment</label>
          <div class="input-wrapper">
            <input 
              type="number" 
              v-model.number="inputs.downPercent" 
              step="1" 
              min="0" 
              max="100"
              @input="calculate"
            />
            <span class="percent">%</span>
          </div>
        </div>

        <!-- Include the tax and fees below into the budget -->
        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="includeTaxAndFees" @change="calculate" />
            <span>Include the tax and fees below into the budget</span>
          </label>
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
              @input="calculate"
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
              @input="calculate"
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
              @input="calculate"
            />
            <span class="percent">% per year</span>
          </div>
        </div>

        <!-- Maintenance cost -->
        <div class="form-group">
          <label>Maintenance cost (repair, utility etc.)</label>
          <div class="input-wrapper">
            <input 
              type="number" 
              v-model.number="inputs.maintenance" 
              step="0.1" 
              min="0"
              placeholder="1.5"
              @input="calculate"
            />
            <span class="percent">% per year</span>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="action-buttons">
          <button class="btn-primary" @click="calculate">Calculate</button>
          <button class="btn-secondary" @click="resetForm">Clear</button>
        </div>
      </div>
    </div>

    <!-- 计算结果区域 -->
    <div class="results-section" v-if="results.affordablePrice > 0">
      <div class="result-card">
        <p class="affordability-message">
          You can afford a house up to <strong>${{ formatNumber(results.affordablePrice) }}</strong>, within which ${{ formatNumber(results.loanAmount) }} is the loan and ${{ formatNumber(results.downPayment) }} is the down payment.
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
            <span class="result-label">Estimated closing cost (one-time, assume 3%)</span>
            <span class="result-value">${{ formatNumber(results.closingCost) }}</span>
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
              <span class="result-label">Annual maintenance cost</span>
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
      <a href="/house-affordability-calculator">House affordability Calculator</a>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h2>Fixed House Affordability Calculator - Frequently Asked Questions</h2>
      
      <div class="faq-item">
        <h3>1. How much house can I afford with my income?</h3>
        <p>Your home affordability depends mainly on your gross monthly income, existing debts, interest rate, and down payment. Most lenders follow the guideline that total monthly housing costs should stay within 28% to 35% of your gross income. However, your actual affordability may be higher or lower depending on your credit score, loan type, and local property taxes. Using a calculator helps you estimate a realistic price range before house hunting.</p>
      </div>

      <div class="faq-item">
        <h3>2. What is included in monthly housing costs?</h3>
        <p>Monthly housing costs are more than just your mortgage payment. They typically include principal and interest on your loan, property taxes, homeowner's insurance, and sometimes HOA fees if you live in a managed community. In some areas, mortgage insurance (PMI) may also apply if your down payment is below 20%. All of these combined determine your true monthly housing burden.</p>
      </div>

      <div class="faq-item">
        <h3>3. How does a House Affordability Calculator work?</h3>
        <p>A House Affordability Calculator estimates the maximum home price you can afford based on your monthly budget and financial inputs. It takes into account your income, debts, interest rate, loan term, and down payment to calculate a realistic home price range. The tool reverses the mortgage formula to show what home price fits comfortably within your monthly payment capacity.</p>
      </div>

      <div class="faq-item">
        <h3>4. How much mortgage can I qualify for?</h3>
        <p>Mortgage qualification depends on several lender criteria including your debt-to-income (DTI) ratio, credit score, income stability, employment history, and available down payment. Most lenders prefer a DTI below 43%, although some programs allow higher ratios. Even if you can technically qualify for a loan, it's important to ensure the monthly payment is still comfortable within your personal budget.</p>
      </div>

      <div class="faq-item">
        <h3>5. What is a good down payment for a house?</h3>
        <p>A typical down payment ranges between 5% and 20% of the home price. A 20% down payment is often ideal because it helps you avoid private mortgage insurance (PMI) and reduces monthly payments. However, many first-time buyers choose lower down payments to enter the housing market sooner, especially with FHA or conventional loan programs.</p>
      </div>

      <div class="faq-item">
        <h3>6. How does interest rate affect home affordability?</h3>
        <p>Interest rates have a major impact on how much home you can afford. Even a small increase in interest rate can significantly raise your monthly mortgage payment, which reduces the total loan amount you qualify for. Conversely, lower interest rates increase affordability and allow you to purchase a higher-priced home within the same monthly budget.</p>
      </div>

      <div class="faq-item">
        <h3>7. Can I afford a house with student loans or debt?</h3>
        <p>Yes, you can still buy a house even if you have student loans or other debts, but it will affect your borrowing capacity. Lenders calculate your debt-to-income ratio by including all monthly debt obligations such as student loans, car loans, and credit cards. Higher debt levels reduce the amount you can safely allocate to a mortgage payment.</p>
      </div>

      <div class="faq-item">
        <h3>8. What salary do I need to buy a house?</h3>
        <p>The required salary varies based on home price, interest rates, and location. A general guideline is that your income should support a home where total monthly housing costs remain around 30% of your gross income. In high-cost areas, you may need a significantly higher income, while lower-cost regions require less. Using an affordability calculator gives a more precise estimate based on current market conditions.</p>
      </div>

      <div class="faq-item">
        <h3>9. Should I include taxes and insurance in affordability calculations?</h3>
        <p>Yes, property taxes and homeowners insurance should always be included when calculating affordability. These costs can vary widely depending on location and property type, and they can add hundreds of dollars to your monthly payment. Ignoring them may lead to overestimating your budget and choosing a home that feels unaffordable after purchase.</p>
      </div>

      <div class="faq-item">
        <h3>10. Is it better to rent or buy based on affordability?</h3>
        <p>Whether renting or buying is better depends on your financial situation, location, and long-term plans. If your estimated mortgage payment is close to or lower than rent and you plan to stay in the home for several years, buying can be more cost-effective. However, if you expect to move frequently or lack savings for a down payment, renting may provide more financial flexibility.</p>
      </div>
    </div>

     <!-- Calculator CTA -->
<section class="section calculator-cta">
    <a href="/how-much-house-can-you-really-afford-with-a-fixed-mortgage-blog" class="calculator-btn">
    How Much House Can You Really Afford with a Fixed Mortgage? (Complete Guide + Calculator Strategy) →
    </a>
</section>
  </div>
</template>

<script>
export default {
  name: 'FixedHouseAffordabilityCalculator',
  data() {
    return {
      // Form inputs
      inputs: {
        monthlyBudget: 3500,
        loanTerm: 30,
        interestRate: 6.62,
        downPercent: 20,
        propertyTax: 1.5,
        hoa: 0,
        insurance: 0.5,
        maintenance: 1.5
      },
      includeTaxAndFees: true,
      activeTip: null,
      // Results
      results: {
        affordablePrice: 0,
        loanAmount: 0,
        downPayment: 0,
        closingCost: 0,
        totalClosingCost: 0,
        monthlyMortgage: 0,
        annualTax: 0,
        annualHOA: 0,
        annualInsurance: 0,
        annualMaintenance: 0,
        totalMonthlyCost: 0
      }
    }
  },
  mounted() {
    document.title = 'Fixed House Affordability Calculator – How Much House Can I Afford? Mortgage & Home Budget Estimator'
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
      desc.content = 'Find out how much house you can afford with our House Affordability Calculator. Estimate mortgage payments, monthly housing costs, income-based home budget, down payment impact, interest rates, and loan affordability in seconds. Perfect for first-time home buyers and mortgage planning.'
      
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
    calculateMonthlyPayment(loanAmount, annualRate, years) {
      const monthlyRate = annualRate / 100 / 12
      const months = years * 12
      if (monthlyRate === 0) return loanAmount / months
      return loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
    },
    calculate() {
      const monthlyBudget = this.inputs.monthlyBudget
      
      // 二分查找可负担的房屋价格
      let low = 0
      let high = 2000000
      
      for (let iter = 0; iter < 80; iter++) {
        const testPrice = (low + high) / 2
        const downPaymentAmount = (testPrice * this.inputs.downPercent) / 100
        const loanAmount = Math.max(0, testPrice - downPaymentAmount)
        
        if (loanAmount <= 0) {
          low = testPrice
          continue
        }
        
        // 计算月供
        const monthlyMortgage = this.calculateMonthlyPayment(loanAmount, this.inputs.interestRate, this.inputs.loanTerm)
        
        // 计算年度费用
        const annualTax = testPrice * this.inputs.propertyTax / 100
        const annualHOA = testPrice * this.inputs.hoa / 100
        const annualInsurance = testPrice * this.inputs.insurance / 100
        const annualMaintenance = testPrice * this.inputs.maintenance / 100
        
        // 计算月度总成本
        let totalMonthlyCost = monthlyMortgage
        
        if (this.includeTaxAndFees) {
          totalMonthlyCost += annualTax / 12
          totalMonthlyCost += annualHOA / 12
          totalMonthlyCost += annualInsurance / 12
          totalMonthlyCost += annualMaintenance / 12
        }
        
        if (totalMonthlyCost <= monthlyBudget) {
          low = testPrice
        } else {
          high = testPrice
        }
      }
      
      const affordablePrice = low
      const downPayment = (affordablePrice * this.inputs.downPercent) / 100
      const loanAmount = Math.max(0, affordablePrice - downPayment)
      const closingCost = affordablePrice * 0.03
      const totalClosingCost = downPayment + closingCost
      
      const monthlyMortgage = this.calculateMonthlyPayment(loanAmount, this.inputs.interestRate, this.inputs.loanTerm)
      const annualTax = affordablePrice * this.inputs.propertyTax / 100
      const annualHOA = affordablePrice * this.inputs.hoa / 100
      const annualInsurance = affordablePrice * this.inputs.insurance / 100
      const annualMaintenance = affordablePrice * this.inputs.maintenance / 100
      
      let totalMonthlyCost = monthlyMortgage
      if (this.includeTaxAndFees) {
        totalMonthlyCost += annualTax / 12
        totalMonthlyCost += annualHOA / 12
        totalMonthlyCost += annualInsurance / 12
        totalMonthlyCost += annualMaintenance / 12
      }
      
      this.results.affordablePrice = affordablePrice
      this.results.loanAmount = loanAmount
      this.results.downPayment = downPayment
      this.results.closingCost = closingCost
      this.results.totalClosingCost = totalClosingCost
      this.results.monthlyMortgage = monthlyMortgage
      this.results.annualTax = annualTax
      this.results.annualHOA = annualHOA
      this.results.annualInsurance = annualInsurance
      this.results.annualMaintenance = annualMaintenance
      this.results.totalMonthlyCost = totalMonthlyCost
    },
    resetForm() {
      this.inputs.monthlyBudget = 3500
      this.inputs.loanTerm = 30
      this.inputs.interestRate = 6.62
      this.inputs.downPercent = 20
      this.inputs.propertyTax = 1.5
      this.inputs.hoa = 0
      this.inputs.insurance = 0.5
      this.inputs.maintenance = 1.5
      this.includeTaxAndFees = true
      this.calculate()
    }
  }
}
</script>

<style scoped>
.fixed-affordability-calculator {
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
.input-wrapper input {
  width: 100%;
  padding: 12px;
  border: none;
  outline: none;
  font-size: 1rem;
  border-radius: 12px;
}
.currency, .percent, .suffix {
  padding: 0 12px;
  color: #475569;
  white-space: nowrap;
}
.suffix {
  font-size: 0.85rem;
}
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: white;
  font-size: 1rem;
}
.checkbox-group {
  margin-top: 8px;
}
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: normal;
}
.checkbox-label input {
  width: 18px;
  height: 18px;
  cursor: pointer;
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
  font-size: 1rem;
}
.btn-primary {
  background: #1e40af;
  color: white;
}
.btn-primary:hover {
  background: #1e3a8a;
}
.btn-secondary {
  background: #e2e8f0;
  color: #1e293b;
}
.btn-secondary:hover {
  background: #cbd5e1;
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
.result-label {
  color: #475569;
}
.result-value {
  font-weight: 600;
  color: #0f172a;
}
.monthly-breakdown h3 {
  margin: 20px 0 12px;
  font-size: 1.2rem;
  color: #0f172a;
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
.related-links a:hover {
  text-decoration: underline;
}
.faq-section {
  background: white;
  border-radius: 24px;
  padding: 20px;
  margin-top: 24px;
}
.faq-section h2 {
  font-size: 1.5rem;
  margin-bottom: 24px;
  color: #0f172a;
}
.faq-item {
  margin-bottom: 28px;
}
.faq-item h3 {
  font-size: 1.1rem;
  margin-bottom: 12px;
  color: #1e293b;
}
.faq-item p {
  margin-bottom: 10px;
  line-height: 1.5;
  color: #334155;
}

/* 移动端优化 */
@media (max-width: 640px) {
  .fixed-affordability-calculator {
    padding: 12px;
  }
  
  .hero h1 {
    font-size: 1.5rem;
  }
  
  .form-card, .result-card {
    padding: 16px;
  }
  
  .result-grid {
    grid-template-columns: 1fr;
  }
  
  .result-item.highlight {
    grid-column: span 1;
  }
  
  .input-wrapper {
    flex-wrap: wrap;
  }
  
  .currency, .percent, .suffix {
    padding: 0 8px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .related-links {
    flex-direction: column;
    gap: 8px;
  }
  
  .faq-section h2 {
    font-size: 1.3rem;
  }
  
  .faq-item h3 {
    font-size: 1rem;
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