<template>
  <div class="income-tax-calculator">
    <!-- 第一层：Google Ads占位和标题 -->
    <div class="top-layer dark-bg">
      <div class="google-ads-placeholder">
        <!-- Google Ads占位符 -->
        <div class="ad-banner">
          <div class="ad-content">
            <span class="ad-text">Advertisement</span>
            <div class="ad-slot">Google Ads - 728x90</div>
          </div>
        </div>
      </div>
      
      <div class="header">
        <h1><i class="fas fa-calculator"></i> India Income Tax Calculator</h1>
        <p class="subtitle">A comparative tool that helps you calculate income tax according to both the old and new tax regime. Use this online income tax calculator to know your tax liabilities.</p>
        
        <div class="fiscal-year-tabs">
          <button 
            :class="['year-tab', { 'active': currentFY === '2024-2025' }]" 
            @click="currentFY = '2024-2025'; calculateTax()"
          >
            PREVIOUS FY(2024-2025)
          </button>
          <button 
            :class="['year-tab', { 'active': currentFY === '2025-2026' }]" 
            @click="currentFY = '2025-2026'; calculateTax()"
          >
            CURRENT FY(2025-2026)
          </button>
        </div>
      </div>
    </div>

    <!-- 第二层：主要计算区域 -->
    <div class="middle-layer">
      <div class="calculator-container">
        <!-- 输入区域 -->
        <div class="input-section" v-if="!showResult">
          <div class="section-header">
            <h2><i class="fas fa-money-bill-wave"></i> Yearly income from salary</h2>
          </div>
          
          <div class="input-group">
            <div class="input-row">
              <label for="salary">Yearly Salary Income (₹)</label>
              <input 
                type="number" 
                id="salary" 
                v-model.number="incomeData.salaryIncome" 
                @input="calculateTax"
                placeholder="Enter yearly salary"
              >
            </div>
            
            <div class="input-row">
              <label for="otherIncome">Income from other sources (Interest on FD and let-out property) (₹)</label>
              <input 
                type="number" 
                id="otherIncome" 
                v-model.number="incomeData.otherIncome" 
                @input="calculateTax"
                placeholder="Enter other income"
              >
            </div>
            
            <div class="input-row">
              <label>Age Group</label>
              <div class="radio-group">
                <label class="radio-option">
                  <input 
                    type="radio" 
                    v-model="incomeData.ageGroup" 
                    value="<60" 
                    @change="calculateTax"
                  >
                  <span>Less than 60</span>
                </label>
                <label class="radio-option">
                  <input 
                    type="radio" 
                    v-model="incomeData.ageGroup" 
                    value="60-80" 
                    @change="calculateTax"
                  >
                  <span>60 to 80</span>
                </label>
                <label class="radio-option">
                  <input 
                    type="radio" 
                    v-model="incomeData.ageGroup" 
                    value=">80" 
                    @change="calculateTax"
                  >
                  <span>Above 80</span>
                </label>
              </div>
            </div>
          </div>

          <!-- 豁免和扣除部分 -->
          <div class="exemption-section">
            <div class="section-header">
              <h2><i class="fas fa-file-invoice-dollar"></i> Exemption details</h2>
            </div>
            
            <div class="exemption-grid">
              <!-- 第一列 -->
              <div class="exemption-column">
                <div class="exemption-item">
                  <label for="hra">HRA and other exemptions (₹)</label>
                  <input 
                    type="number" 
                    id="hra" 
                    v-model.number="deductions.hra" 
                    @input="calculateTax"
                    :max="50000"
                  >
                  <div class="exemption-limit">Common limit</div>
                </div>
                
                <div class="exemption-item">
                  <label for="housingLoan">Interest paid on housing loan (₹)</label>
                  <input 
                    type="number" 
                    id="housingLoan" 
                    v-model.number="deductions.housingLoan" 
                    @input="calculateTax"
                    :max="200000"
                  >
                  <div class="exemption-limit">Exemption Limit: ₹2,00,000</div>
                </div>
                
                <div class="exemption-item">
                  <label for="section80C">80C (PF, PPF, insurance premium) (₹)</label>
                  <input 
                    type="number" 
                    id="section80C" 
                    v-model.number="deductions.section80C" 
                    @input="calculateTax"
                    :max="150000"
                  >
                  <div class="exemption-limit">Exemption Limit: ₹1,50,000</div>
                </div>
                
                <div class="exemption-item">
                  <label for="section80CCD">80CCD (Employee's contribution to NPS) (₹)</label>
                  <input 
                    type="number" 
                    id="section80CCD" 
                    v-model.number="deductions.section80CCD" 
                    @input="calculateTax"
                    :max="150000"
                  >
                  <div class="exemption-limit">Exemption Limit: ₹1,50,000</div>
                </div>
              </div>
              
              <!-- 第二列 -->
              <div class="exemption-column">
                <div class="exemption-item">
                  <label for="section80CCD1B">80CCD(1B) (Additional contribution to NPS) (₹)</label>
                  <input 
                    type="number" 
                    id="section80CCD1B" 
                    v-model.number="deductions.section80CCD1B" 
                    @input="calculateTax"
                    :max="50000"
                  >
                  <div class="exemption-limit">Exemption Limit: ₹50,000</div>
                </div>
                
                <div class="exemption-item">
                  <label for="section80D">80D (Medical insurance premium) (₹)</label>
                  <input 
                    type="number" 
                    id="section80D" 
                    v-model.number="deductions.section80D" 
                    @input="calculateTax"
                    :max="50000"
                  >
                  <div class="exemption-limit">Limit varies by age</div>
                </div>
                
                <div class="exemption-item">
                  <label for="section80EE">80EE (Interest paid on home loan for affordable housing) (₹)</label>
                  <input 
                    type="number" 
                    id="section80EE" 
                    v-model.number="deductions.section80EE" 
                    @input="calculateTax"
                    :max="150000"
                  >
                  <div class="exemption-limit">Exemption Limit: ₹1,50,000</div>
                </div>
                
                <div class="exemption-item">
                  <label for="section80EEB">80EEB (Interest paid on loan for purchase of electrical vehicle) (₹)</label>
                  <input 
                    type="number" 
                    id="section80EEB" 
                    v-model.number="deductions.section80EEB" 
                    @input="calculateTax"
                    :max="150000"
                  >
                  <div class="exemption-limit">Exemption Limit: ₹1,50,000</div>
                </div>
                
                <div class="exemption-item">
                  <label for="section80G">80G (Donations to charity) (₹)</label>
                  <input 
                    type="number" 
                    id="section80G" 
                    v-model.number="deductions.section80G" 
                    @input="calculateTax"
                    :max="150000"
                  >
                  <div class="exemption-limit">Exemption Limit: ₹1,50,000</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="calculate-button">
            <button @click="showResult = true; calculateTax()" class="btn-calculate">
              <i class="fas fa-calculator"></i> Calculate income tax
            </button>
            <button @click="resetForm" class="btn-reset">
              <i class="fas fa-redo"></i> Reset
            </button>
          </div>
        </div>
        
        <!-- 结果展示区域 -->
        <div class="result-section" v-if="showResult">
          <div class="section-header">
            <h2><i class="fas fa-chart-pie"></i> Tax Summary for FY {{ currentFY }}</h2>
            <button @click="showResult = false" class="btn-back">
              <i class="fas fa-arrow-left"></i> Back to Input
            </button>
          </div>
          
          <div class="tax-summary">
            <!-- 税率对比表格 -->
            <div class="tax-rate-comparison">
              <h3>Tax Slabs Comparison</h3>
              <div class="comparison-table">
                <div class="comparison-row header">
                  <div class="comparison-cell">Income Range (₹)</div>
                  <div class="comparison-cell">Old Regime Rate</div>
                  <div class="comparison-cell">New Regime Rate ({{ currentFY }})</div>
                </div>
                <div v-for="(slab, index) in taxSlabs" :key="index" class="comparison-row">
                  <div class="comparison-cell">{{ formatCurrency(slab.range[0]) }} - {{ formatCurrency(slab.range[1]) }}</div>
                  <div class="comparison-cell">{{ slab.oldRate }}%</div>
                  <div class="comparison-cell">{{ slab.newRate }}%</div>
                </div>
              </div>
            </div>
            
            <!-- 详细结果 -->
            <div class="detailed-results">
              <div class="result-row total-income">
                <div class="result-label">Total Gross Income</div>
                <div class="result-value">₹{{ formatCurrency(totalIncome) }}</div>
              </div>
              
              <div class="result-row total-deductions">
                <div class="result-label">Total Eligible Deductions (Old Regime)</div>
                <div class="result-value">₹{{ formatCurrency(oldRegimeDeductions) }}</div>
              </div>
              
              <div class="result-row taxable-income">
                <div class="result-label">Taxable Income (Old Regime)</div>
                <div class="result-value">₹{{ formatCurrency(oldRegimeTaxableIncome) }}</div>
              </div>
              
              <div class="result-row taxable-income-new">
                <div class="result-label">Taxable Income (New Regime)</div>
                <div class="result-value">₹{{ formatCurrency(newRegimeTaxableIncome) }}</div>
              </div>
              
              <!-- 旧制度税计算 -->
              <div class="regime-section old-regime">
                <h4><i class="fas fa-balance-scale-left"></i> Old Tax Regime</h4>
                <div class="tax-breakdown">
                  <div class="breakdown-row">
                    <span>Tax on Taxable Income</span>
                    <span>₹{{ formatCurrency(oldRegimeTax) }}</span>
                  </div>
                  <div class="breakdown-row">
                    <span>Rebate Under Section 87A</span>
                    <span>₹{{ formatCurrency(oldRegimeRebate) }}</span>
                  </div>
                  <div class="breakdown-row">
                    <span>Surcharge (if applicable)</span>
                    <span>₹{{ formatCurrency(oldRegimeSurcharge) }}</span>
                  </div>
                  <div class="breakdown-row">
                    <span>Health & Education Cess (4%)</span>
                    <span>₹{{ formatCurrency(oldRegimeCess) }}</span>
                  </div>
                  <div class="breakdown-row total">
                    <span><strong>Total Tax to be Paid</strong></span>
                    <span><strong>₹{{ formatCurrency(oldRegimeTotalTax) }}</strong></span>
                  </div>
                </div>
              </div>
              
              <!-- 新制度税计算 -->
              <div class="regime-section new-regime">
                <h4><i class="fas fa-balance-scale-right"></i> New Tax Regime</h4>
                <div class="tax-breakdown">
                  <div class="breakdown-row">
                    <span>Tax on Taxable Income</span>
                    <span>₹{{ formatCurrency(newRegimeTax) }}</span>
                  </div>
                  <div class="breakdown-row">
                    <span>Rebate Under Section 87A</span>
                    <span>₹{{ formatCurrency(newRegimeRebate) }}</span>
                  </div>
                  <div class="breakdown-row">
                    <span>Standard Deduction (₹75,000)</span>
                    <span>-₹75,000</span>
                  </div>
                  <div class="breakdown-row">
                    <span>Surcharge (if applicable)</span>
                    <span>₹{{ formatCurrency(newRegimeSurcharge) }}</span>
                  </div>
                  <div class="breakdown-row">
                    <span>Health & Education Cess (4%)</span>
                    <span>₹{{ formatCurrency(newRegimeCess) }}</span>
                  </div>
                  <div class="breakdown-row total">
                    <span><strong>Total Tax to be Paid</strong></span>
                    <span><strong>₹{{ formatCurrency(newRegimeTotalTax) }}</strong></span>
                  </div>
                </div>
              </div>
              
              <!-- 建议 -->
              <div class="recommendation" :class="recommendationClass">
                <h4><i class="fas fa-lightbulb"></i> Recommendation</h4>
                <p>{{ recommendationText }}</p>
                <p v-if="taxSavings > 0" class="savings">
                  You could save ₹{{ formatCurrency(taxSavings) }} by choosing the {{ recommendedRegime }} regime
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 第三层：FAQ和页脚 -->
    <div class="bottom-layer">
      <!-- FAQ部分 -->
      <div class="faq-section">
        <div class="section-header">
          <h2><i class="fas fa-question-circle"></i> Frequently Asked Questions</h2>
        </div>
        
        <div class="faq-list">
          <div class="faq-item">
            <h3 @click="toggleFAQ(0)" class="faq-question">
              <i class="fas fa-chevron-right" :class="{ 'rotated': activeFAQ === 0 }"></i>
              What is the Income Tax Calculator?
            </h3>
            <div class="faq-answer" v-if="activeFAQ === 0">
              <p>The Income Tax Calculator is a digital tool designed to help Indian taxpayers estimate their income tax liability for a given financial year. It allows comparison between the old and new tax regimes to help you make an informed decision about which regime is more beneficial for you.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <h3 @click="toggleFAQ(1)" class="faq-question">
              <i class="fas fa-chevron-right" :class="{ 'rotated': activeFAQ === 1 }"></i>
              Why have we come up with the Income Tax Calculator?
            </h3>
            <div class="faq-answer" v-if="activeFAQ === 1">
              <p>We developed this calculator to simplify the complex process of income tax calculation in India. With the introduction of the new tax regime and frequent changes in tax laws, taxpayers often find it confusing to determine their exact tax liability. This tool provides clarity and helps in tax planning.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <h3 @click="toggleFAQ(2)" class="faq-question">
              <i class="fas fa-chevron-right" :class="{ 'rotated': activeFAQ === 2 }"></i>
              How the Income Tax Calculator can be used?
            </h3>
            <div class="faq-answer" v-if="activeFAQ === 2">
              <p>Simply enter your annual salary, income from other sources, age, and applicable deductions under various sections (80C, 80D, etc.). The calculator will automatically compute your tax liability under both regimes and show you which one is more beneficial.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <h3 @click="toggleFAQ(3)" class="faq-question">
              <i class="fas fa-chevron-right" :class="{ 'rotated': activeFAQ === 3 }"></i>
              What are the salary slabs for old tax regime?
            </h3>
            <div class="faq-answer" v-if="activeFAQ === 3">
              <p>For FY 2024-2025, the old regime slabs for individuals below 60 years are: 0% for income up to ₹2.5 lakh, 5% for ₹2.5-5 lakh, 20% for ₹5-10 lakh, and 30% above ₹10 lakh. Senior citizens (60-80 years) have a higher exemption limit of ₹3 lakh, and super seniors (above 80) have ₹5 lakh.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <h3 @click="toggleFAQ(4)" class="faq-question">
              <i class="fas fa-chevron-right" :class="{ 'rotated': activeFAQ === 4 }"></i>
              What are the income tax slabs for the new regime announced in the Union Budget 2025?
            </h3>
            <div class="faq-answer" v-if="activeFAQ === 4">
              <p>For FY 2025-2026, the new regime slabs are: 0% for income up to ₹3 lakh, 5% for ₹3-7 lakh, 10% for ₹7-10 lakh, 15% for ₹10-12 lakh, 20% for ₹12-15 lakh, and 30% above ₹15 lakh. A standard deduction of ₹75,000 is available under this regime.</p>
            </div>
          </div>
          
          <div class="faq-item">
            <h3 @click="toggleFAQ(5)" class="faq-question">
              <i class="fas fa-chevron-right" :class="{ 'rotated': activeFAQ === 5 }"></i>
              What was the standard deduction specified in the Union Budget of 2025?
            </h3>
            <div class="faq-answer" v-if="activeFAQ === 5">
              <p>In the Union Budget 2025, the standard deduction for salaried individuals under the new tax regime was increased to ₹75,000 (from ₹50,000 in previous years). This deduction is available regardless of actual expenses incurred and is aimed at simplifying tax filing under the new regime.</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 页脚 -->
      <div class="footer dark-bg">
        <div class="footer-content">
          <div class="footer-section">
            <h4><i class="fas fa-exclamation-triangle"></i> Tool Statement</h4>
            <p>This Income Tax Calculator has been designed to provide accurate estimates based on current Indian tax laws. However, tax laws are complex and subject to change. Always consult with a qualified tax professional for final tax calculations and filing.</p>
          </div>
          
          <div class="footer-section">
            <h4><i class="fas fa-shield-alt"></i> Data Statement</h4>
            <p>Your data is processed locally in your browser and is not stored on any server. All calculations are performed on your device, ensuring complete privacy and security of your financial information.</p>
          </div>
          
          <div class="footer-section">
            <h4><i class="fas fa-envelope"></i> Contact & Feedback</h4>
            <p>For feedback, suggestions, or reporting issues, please contact us at:</p>
            <ul class="contact-list">
              <li><i class="fas fa-envelope"></i>flykingmz@gmail.com</li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>© 2026 India Income Tax Calculator. This tool is for informational purposes only.</p>
          <p>Tax rates are based on the Finance Act 2024 and 2025 for FY 2024-2025 and 2025-2026 respectively.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IncomeTaxCalculator',
  data() {
    return {
      currentFY: '2025-2026',
      showResult: false,
      activeFAQ: null,
      
      // 收入数据
      incomeData: {
        salaryIncome: 0,
        otherIncome: 0,
        ageGroup: '<60'
      },
      
      // 扣除项
      deductions: {
        hra: 0,
        housingLoan: 0,
        section80C: 0,
        section80CCD: 0,
        section80CCD1B: 0,
        section80D: 0,
        section80EE: 0,
        section80EEB: 0,
        section80G: 0
      },
      
      // 计算结果
      calculationResults: {
        totalIncome: 0,
        oldRegimeDeductions: 0,
        newRegimeDeductions: 0,
        oldRegimeTaxableIncome: 0,
        newRegimeTaxableIncome: 0,
        oldRegimeTax: 0,
        newRegimeTax: 0,
        oldRegimeRebate: 0,
        newRegimeRebate: 0,
        oldRegimeSurcharge: 0,
        newRegimeSurcharge: 0,
        oldRegimeCess: 0,
        newRegimeCess: 0,
        oldRegimeTotalTax: 0,
        newRegimeTotalTax: 0
      },
      
      // 税率表（基于印度官方税率）
      taxSlabs: []
    };
  },
  
  computed: {
    // 计算总收入
    totalIncome() {
      return (this.incomeData.salaryIncome || 0) + (this.incomeData.otherIncome || 0);
    },
    
    // 旧制度总扣除额
    oldRegimeDeductions() {
      let total = 0;
      Object.values(this.deductions).forEach(value => {
        total += value || 0;
      });
      
      // 根据年龄组增加基本豁免
      if (this.incomeData.ageGroup === '<60') {
        total += 250000; // 标准豁免
      } else if (this.incomeData.ageGroup === '60-80') {
        total += 300000; // 老年人豁免
      } else if (this.incomeData.ageGroup === '>80') {
        total += 500000; // 超老年人豁免
      }
      
      return total;
    },
    
    // 新制度扣除额（标准扣除）
    newRegimeDeductions() {
      return 75000; // 2025-2026财年标准扣除
    },
    
    // 旧制度应税收入
    oldRegimeTaxableIncome() {
      const taxable = this.totalIncome - this.oldRegimeDeductions;
      return taxable > 0 ? taxable : 0;
    },
    
    // 新制度应税收入
    newRegimeTaxableIncome() {
      const taxable = this.totalIncome - this.newRegimeDeductions;
      return taxable > 0 ? taxable : 0;
    },
    
    // 建议文本
    recommendationText() {
      if (this.oldRegimeTotalTax < this.newRegimeTotalTax) {
        return 'The Old Tax Regime is more beneficial for you as it results in lower tax liability.';
      } else if (this.newRegimeTotalTax < this.oldRegimeTotalTax) {
        return 'The New Tax Regime is more beneficial for you as it results in lower tax liability.';
      } else {
        return 'Both tax regimes result in similar tax liability. You may choose either based on your preference.';
      }
    },
    
    // 建议类别
    recommendationClass() {
      if (this.oldRegimeTotalTax < this.newRegimeTotalTax) {
        return 'recommend-old';
      } else if (this.newRegimeTotalTax < this.oldRegimeTotalTax) {
        return 'recommend-new';
      } else {
        return 'recommend-equal';
      }
    },
    
    // 推荐制度
    recommendedRegime() {
      if (this.oldRegimeTotalTax < this.newRegimeTotalTax) {
        return 'Old';
      } else {
        return 'New';
      }
    },
    
    // 节省税额
    taxSavings() {
      return Math.abs(this.oldRegimeTotalTax - this.newRegimeTotalTax);
    },
    
    // 从计算结果中获取值
    oldRegimeTax() {
      return this.calculationResults.oldRegimeTax;
    },
    newRegimeTax() {
      return this.calculationResults.newRegimeTax;
    },
    oldRegimeRebate() {
      return this.calculationResults.oldRegimeRebate;
    },
    newRegimeRebate() {
      return this.calculationResults.newRegimeRebate;
    },
    oldRegimeSurcharge() {
      return this.calculationResults.oldRegimeSurcharge;
    },
    newRegimeSurcharge() {
      return this.calculationResults.newRegimeSurcharge;
    },
    oldRegimeCess() {
      return this.calculationResults.oldRegimeCess;
    },
    newRegimeCess() {
      return this.calculationResults.newRegimeCess;
    },
    oldRegimeTotalTax() {
      return this.calculationResults.oldRegimeTotalTax;
    },
    newRegimeTotalTax() {
      return this.calculationResults.newRegimeTotalTax;
    }
  },
  
  watch: {
    currentFY() {
      this.updateTaxSlabs();
      this.calculateTax();
    }
  },
  
  mounted() {
    this.updateTaxSlabs();
    this.calculateTax();
  },
  
  methods: {
    // 更新税率表
    updateTaxSlabs() {
      if (this.currentFY === '2024-2025') {
        this.taxSlabs = [
          { range: [0, 250000], oldRate: 0, newRate: 0 },
          { range: [250000, 500000], oldRate: 5, newRate: 5 },
          { range: [500000, 750000], oldRate: 20, newRate: 10 },
          { range: [750000, 1000000], oldRate: 20, newRate: 15 },
          { range: [1000000, 1250000], oldRate: 30, newRate: 20 },
          { range: [1250000, 1500000], oldRate: 30, newRate: 25 },
          { range: [1500000, Infinity], oldRate: 30, newRate: 30 }
        ];
      } else { // 2025-2026
        this.taxSlabs = [
          { range: [0, 300000], oldRate: 0, newRate: 0 },
          { range: [300000, 700000], oldRate: 5, newRate: 5 },
          { range: [700000, 1000000], oldRate: 20, newRate: 10 },
          { range: [1000000, 1200000], oldRate: 20, newRate: 15 },
          { range: [1200000, 1500000], oldRate: 30, newRate: 20 },
          { range: [1500000, Infinity], oldRate: 30, newRate: 30 }
        ];
      }
    },
    
    // 计算税款
    calculateTax() {
      // 计算旧制度税款
      const oldTax = this.calculateTaxForRegime(this.oldRegimeTaxableIncome, 'old');
      const newTax = this.calculateTaxForRegime(this.newRegimeTaxableIncome, 'new');
      
      // 计算附加费
      const oldSurcharge = this.calculateSurcharge(this.oldRegimeTaxableIncome, oldTax);
      const newSurcharge = this.calculateSurcharge(this.newRegimeTaxableIncome, newTax);
      
      // 计算教育税
      const oldCess = (oldTax + oldSurcharge) * 0.04;
      const newCess = (newTax + newSurcharge) * 0.04;
      
      // 计算第87A条退税
      const oldRebate = this.calculateRebate87A(oldTax, this.oldRegimeTaxableIncome, 'old');
      const newRebate = this.calculateRebate87A(newTax, this.newRegimeTaxableIncome, 'new');
      
      // 总税款
      const oldTotalTax = Math.max(0, oldTax - oldRebate + oldSurcharge + oldCess);
      const newTotalTax = Math.max(0, newTax - newRebate + newSurcharge + newCess);
      
      // 更新结果
      this.calculationResults = {
        totalIncome: this.totalIncome,
        oldRegimeDeductions: this.oldRegimeDeductions,
        newRegimeDeductions: this.newRegimeDeductions,
        oldRegimeTaxableIncome: this.oldRegimeTaxableIncome,
        newRegimeTaxableIncome: this.newRegimeTaxableIncome,
        oldRegimeTax: oldTax,
        newRegimeTax: newTax,
        oldRegimeRebate: oldRebate,
        newRegimeRebate: newRebate,
        oldRegimeSurcharge: oldSurcharge,
        newRegimeSurcharge: newSurcharge,
        oldRegimeCess: oldCess,
        newRegimeCess: newCess,
        oldRegimeTotalTax: oldTotalTax,
        newRegimeTotalTax: newTotalTax
      };
    },
    
    // 根据制度计算税款
    calculateTaxForRegime(income, regime) {
      if (income <= 0) return 0;
      
      let tax = 0;
      let remainingIncome = income;
      
      // 获取适用的税率表
      const slabs = regime === 'old' ? 
        this.getOldRegimeSlabs() : 
        this.getNewRegimeSlabs();
      
      for (let i = slabs.length - 1; i >= 0; i--) {
        const slab = slabs[i];
        if (remainingIncome > slab.min) {
          const taxableInSlab = Math.min(remainingIncome - slab.min, slab.max - slab.min);
          tax += taxableInSlab * (slab.rate / 100);
          remainingIncome = slab.min;
        }
      }
      
      return tax;
    },
    
    // 旧制度税率表
    getOldRegimeSlabs() {
      const basicExemption = this.incomeData.ageGroup === '<60' ? 250000 : 
                           this.incomeData.ageGroup === '60-80' ? 300000 : 500000;
      
      if (this.currentFY === '2024-2025') {
        return [
          { min: 0, max: basicExemption, rate: 0 },
          { min: basicExemption, max: 500000, rate: 5 },
          { min: 500000, max: 1000000, rate: 20 },
          { min: 1000000, max: Infinity, rate: 30 }
        ];
      } else { // 2025-2026
        return [
          { min: 0, max: basicExemption, rate: 0 },
          { min: basicExemption, max: 500000, rate: 5 },
          { min: 500000, max: 1000000, rate: 20 },
          { min: 1000000, max: Infinity, rate: 30 }
        ];
      }
    },
    
    // 新制度税率表
    getNewRegimeSlabs() {
      if (this.currentFY === '2024-2025') {
        return [
          { min: 0, max: 300000, rate: 0 },
          { min: 300000, max: 600000, rate: 5 },
          { min: 600000, max: 900000, rate: 10 },
          { min: 900000, max: 1200000, rate: 15 },
          { min: 1200000, max: 1500000, rate: 20 },
          { min: 1500000, max: Infinity, rate: 30 }
        ];
      } else { // 2025-2026
        return [
          { min: 0, max: 300000, rate: 0 },
          { min: 300000, max: 700000, rate: 5 },
          { min: 700000, max: 1000000, rate: 10 },
          { min: 1000000, max: 1200000, rate: 15 },
          { min: 1200000, max: 1500000, rate: 20 },
          { min: 1500000, max: Infinity, rate: 30 }
        ];
      }
    },
    
    // 计算附加费
    calculateSurcharge(income, tax) {
      if (income > 5000000 && income <= 10000000) {
        return tax * 0.10; // 10%附加费
      } else if (income > 10000000 && income <= 20000000) {
        return tax * 0.15; // 15%附加费
      } else if (income > 20000000 && income <= 50000000) {
        return tax * 0.25; // 25%附加费
      } else if (income > 50000000) {
        return tax * 0.37; // 37%附加费
      }
      return 0;
    },
    
    // 计算第87A条退税
    calculateRebate87A(tax, taxableIncome, regime) {
      // 2024-2025: 应税收入不超过70万卢比可全额退税，最高1.25万卢比
      // 2025-2026: 应税收入不超过75万卢比可全额退税，最高1.25万卢比
      
      const limit = this.currentFY === '2024-2025' ? 700000 : 750000;
      const maxRebate = 12500;
      
      if (taxableIncome <= limit) {
        return Math.min(tax, maxRebate);
      }
      return 0;
    },
    
    // 格式化货币显示
    formatCurrency(amount) {
      if (amount === 0) return '0';
      if (amount < 1000) return amount.toLocaleString('en-IN');
      
      // 简化显示：使用K, L, Cr
      if (amount < 100000) {
        return (amount / 1000).toFixed(1) + 'K';
      } else if (amount < 10000000) {
        return (amount / 100000).toFixed(2) + 'L';
      } else {
        return (amount / 10000000).toFixed(2) + 'Cr';
      }
    },
    
    // 切换FAQ显示
    toggleFAQ(index) {
      this.activeFAQ = this.activeFAQ === index ? null : index;
    },
    
    // 重置表单
    resetForm() {
      this.incomeData = {
        salaryIncome: 0,
        otherIncome: 0,
        ageGroup: '<60'
      };
      
      this.deductions = {
        hra: 0,
        housingLoan: 0,
        section80C: 0,
        section80CCD: 0,
        section80CCD1B: 0,
        section80D: 0,
        section80EE: 0,
        section80EEB: 0,
        section80G: 0
      };
      
      this.showResult = false;
      this.calculateTax();
    }
  }
};
</script>

<style scoped>
/* 基础样式 */
.income-tax-calculator {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.dark-bg {
  background-color: #1a1a2e;
  color: white;
}

/* 第一层：标题和广告 */
.top-layer {
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  /* 添加以下4行代码居中展示 */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.google-ads-placeholder {
  margin-bottom: 20px;
  display: none !important;
}

.ad-banner {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  padding: 15px;
  text-align: center;
}

.ad-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.ad-text {
  font-size: 12px;
  color: rgba(255,255,255,0.8);
}

.ad-slot {
  background: white;
  color: #333;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
}

.header h1 {
  font-size: 28px;
  margin-bottom: 10px;
  color: white;
}

.header .subtitle {
  font-size: 16px;
  color: rgba(255,255,255,0.8);
  margin-bottom: 20px;
  line-height: 1.5;
}

.fiscal-year-tabs {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  justify-content: center;  /* 水平居中 */
  width: 100%;              /* 确保占据整个宽度 */
}

.year-tab {
  padding: 12px 24px;
  background: transparent;
  border: 2px solid #4cc9f0;
  color: #4cc9f0;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.year-tab.active {
  background: #4cc9f0;
  color: #1a1a2e;
}

.year-tab:hover:not(.active) {
  background: rgba(76, 201, 240, 0.1);
}

/* 第二层：计算区域 */
.middle-layer {
  flex: 1;
  padding: 30px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.calculator-container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  overflow: hidden;
}

.section-header {
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-header h2 {
  font-size: 22px;
  margin: 0;
}

.btn-back {
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.4);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-back:hover {
  background: rgba(255,255,255,0.3);
}

/* 输入区域样式 */
.input-section {
  padding: 30px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.input-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-row label {
  font-weight: 600;
  color: #333;
  font-size: 16px;
}

.input-row input[type="number"] {
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.input-row input[type="number"]:focus {
  outline: none;
  border-color: #4361ee;
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
}

.radio-group {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.radio-option input[type="radio"] {
  width: 18px;
  height: 18px;
}

/* 豁免部分样式 */
.exemption-section {
  margin: 30px 0;
}

.exemption-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.exemption-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.exemption-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.exemption-item label {
  font-weight: 600;
  color: #444;
  font-size: 15px;
}

.exemption-item input[type="number"] {
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 16px;
}

.exemption-limit {
  font-size: 13px;
  color: #666;
  font-style: italic;
}

/* 按钮样式 */
.calculate-button {
  display: flex;
  gap: 15px;
  margin-top: 30px;
  justify-content: center;
}

.btn-calculate {
  background: linear-gradient(135deg, #4cc9f0 0%, #4361ee 100%);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-calculate:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(67, 97, 238, 0.3);
}

.btn-reset {
  background: #f8f9fa;
  color: #666;
  border: 2px solid #dee2e6;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-reset:hover {
  background: #e9ecef;
}

/* 结果区域样式 */
.result-section {
  padding: 30px;
}

.tax-summary {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.tax-rate-comparison {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e0e0e0;
}

.tax-rate-comparison h3 {
  margin-bottom: 15px;
  color: #333;
}

.comparison-table {
  display: table;
  width: 100%;
  border-collapse: collapse;
}

.comparison-row {
  display: table-row;
}

.comparison-row.header {
  background: #4361ee;
  color: white;
}

.comparison-cell {
  display: table-cell;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
}

.comparison-row.header .comparison-cell {
  font-weight: bold;
  border-color: #3a0ca3;
}

/* 详细结果样式 */
.detailed-results {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #4361ee;
}

.result-row.total-income {
  border-left-color: #4cc9f0;
}

.result-row.total-deductions {
  border-left-color: #f72585;
}

.result-row.taxable-income {
  border-left-color: #7209b7;
}

.result-row.taxable-income-new {
  border-left-color: #3a0ca3;
}

.result-label {
  font-weight: 600;
  color: #333;
  font-size: 16px;
}

.result-value {
  font-weight: bold;
  color: #4361ee;
  font-size: 18px;
}

/* 税制部分样式 */
.regime-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  border: 2px solid #e0e0e0;
}

.regime-section h4 {
  margin-bottom: 15px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
}

.old-regime {
  border-color: #4361ee;
}

.new-regime {
  border-color: #4cc9f0;
}

.tax-breakdown {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px dashed #e0e0e0;
}

.breakdown-row.total {
  border-bottom: 2px solid #333;
  margin-top: 10px;
  padding-top: 15px;
}

/* 建议样式 */
.recommendation {
  padding: 20px;
  border-radius: 8px;
  background: #f8f9fa;
  border-left: 5px solid;
}

.recommendation h4 {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.recommend-old {
  border-left-color: #4361ee;
  background: linear-gradient(135deg, rgba(67, 97, 238, 0.1) 0%, rgba(58, 12, 163, 0.05) 100%);
}

.recommend-new {
  border-left-color: #4cc9f0;
  background: linear-gradient(135deg, rgba(76, 201, 240, 0.1) 0%, rgba(67, 97, 238, 0.05) 100%);
}

.recommend-equal {
  border-left-color: #7209b7;
}

.savings {
  margin-top: 10px;
  font-weight: bold;
  color: #f72585;
}

/* FAQ样式 */
.faq-section {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.faq-list {
  margin-top: 20px;
}

.faq-item {
  margin-bottom: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.faq-question {
  background: #f8f9fa;
  padding: 18px 20px;
  margin: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.faq-question:hover {
  background: #e9ecef;
}

.faq-question i {
  transition: transform 0.3s ease;
}

.faq-question i.rotated {
  transform: rotate(90deg);
}

.faq-answer {
  padding: 20px;
  background: white;
  border-top: 1px solid #e0e0e0;
  line-height: 1.6;
}

/* 页脚样式 */
.footer {
  padding: 40px 20px;
  margin-top: 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
}

.footer-section h4 {
  color: white;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-section p {
  color: rgba(255,255,255,0.8);
  line-height: 1.6;
}

.contact-list {
  list-style: none;
  margin-top: 15px;
}

.contact-list li {
  color: rgba(255,255,255,0.8);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.6);
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .fiscal-year-tabs {
    flex-direction: column;
  }
  
  .exemption-grid {
    grid-template-columns: 1fr;
  }
  
  .calculate-button {
    flex-direction: column;
  }
  
  .comparison-table {
    display: block;
  }
  
  .comparison-row {
    display: block;
    margin-bottom: 10px;
  }
  
  .comparison-cell {
    display: block;
    padding: 8px;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
  }
  
  .header h1 {
    font-size: 24px;
  }
  
  .section-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .btn-back {
    align-self: stretch;
    text-align: center;
  }
}

/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.input-section, .result-section, .faq-section {
  animation: fadeIn 0.5s ease-out;
}

/* 工具提示 */
.exemption-item input[type="number"]:hover {
  border-color: #4361ee;
}

/* 打印样式 */
@media print {
  .top-layer, .calculate-button, .btn-back, .footer {
    display: none;
  }
  
  .middle-layer {
    background: white;
    padding: 0;
  }
  
  .calculator-container {
    box-shadow: none;
    border: 1px solid #ccc;
  }
}
</style>