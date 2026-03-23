<template>
  <div class="australia-crypto-tax-calculator">
    <!-- Header -->
    <h1 class="main-title">Australia Crypto Tax Calculator</h1>
    <p class="description">
      The Australia Crypto Tax Calculator helps you estimate your cryptocurrency tax obligations under ATO guidelines. Whether you are trading, staking, mining, or earning income through DeFi and NFTs, this tool provides a simple and accurate way to calculate your crypto taxes.Enter your purchase and sale prices, transaction fees, and income details to determine capital gains or losses. Designed for Australian investors and traders, this calculator supports both single transactions and multiple crypto portfolios, helping you understand your tax liability and plan ahead.
   </p>

    <!-- Calculator Form - 附件1样式 -->
    <div class="calculator-form">
      <h2>Crypto Tax Calculator</h2>

      <!-- Price of Purchase -->
      <div class="form-row">
        <label>Price of Purchase of Crypto Assets:</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">AUD$</span>
            <input
              type="number"
              v-model.number="form.purchasePrice"
              @input="calculate"
              min="0"
              step="100"
              placeholder="1000"
            />
          </div>
        </div>
      </div>

      <!-- Price of Sale -->
      <div class="form-row">
        <label>Price of Sale of Crypto Assets:</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">AUD$</span>
            <input
              type="number"
              v-model.number="form.salePrice"
              @input="calculate"
              min="0"
              step="100"
              placeholder="2000"
            />
          </div>
        </div>
      </div>

      <!-- Holding Period -->
      <div class="form-row radio-row">
        <label>How long do you own your crypto assets?</label>
        <div class="radio-group">
          <label class="radio-label">
            <input
              type="radio"
              value="short"
              v-model="form.holdingPeriod"
              @change="calculate"
            />
            <span>Short term (1 year or less)</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              value="long"
              v-model="form.holdingPeriod"
              @change="calculate"
            />
            <span>Long term (more than 1 year)</span>
          </label>
        </div>
      </div>

      <!-- Other Income -->
      <div class="form-row">
        <label>Other Income (for tax bracket determination)</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">AUD$</span>
            <input
              type="number"
              v-model.number="form.otherIncome"
              @input="calculate"
              min="0"
              step="1000"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button @click="calculate">Calculate my tax</button>
      </div>
    </div>

    <!-- Results Section - 附件2样式 -->
    <div class="results-section" v-if="results.calculated">
      <h2>How much tax is payable:</h2>

      <div class="result-card">
        <div class="result-item">
          <span class="result-label">Capital Gain</span>
          <span class="result-value">AUD${{ formatMoney(results.capitalGain) }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">Estimated Tax</span>
          <span class="result-value">AUD${{ formatMoney(results.estimatedTax) }}</span>
        </div>
        <div class="result-item">
          <span class="result-label">Income After Tax</span>
          <span class="result-value">AUD${{ formatMoney(results.incomeAfterTax) }}</span>
        </div>
      </div>

      <div class="tax-breakdown">
        <p><strong>Estimated Capital Gain (Profit/Loss): AUD${{ formatMoney(results.capitalGain) }}</strong></p>
        <p><strong>Taxable Gain: AUD${{ formatMoney(results.taxableGain) }}</strong></p>
        <p><strong>Estimated Tax You Need to Pay: AUD${{ formatMoney(results.estimatedTax) }}</strong></p>
        <p><strong>Income from Crypto Assets After Tax: AUD${{ formatMoney(results.incomeAfterTax) }}</strong></p>
      </div>
    </div>

    <!-- Related Tools -->
    <div class="related-tools">
      <span class="related-label">Related:</span>
      <a href="/crypto-tax-calculator">Crypto Tax Calculator</a> <span class="sep">|</span>
      <a href="/nft-calculator">NFT Tax Calculator</a>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h2>Australia Crypto Tax Information – FAQ</h2>

      <div class="faq-item">
        <h3>How to Calculate Cryptocurrency Tax in Australia (2026)</h3>
        <p><strong>Step 1: Determine Your Capital Gain or Loss</strong><br>
        Start by determining the difference between your purchase price and sale price of your cryptocurrency. This amount is your capital gain or loss.<br>
        <em>Example:</em> You bought crypto for AUD 5,000 and sold it for AUD 8,000. Your capital gain would be AUD 3,000.</p>
        
        <p><strong>Step 2: Check if Your Holding Period Qualifies for the CGT Discount</strong><br>
        In Australia, if you've held your crypto assets for over 12 months, you're eligible for a 50% capital gains tax (CGT) discount. This means only half of your capital gain is taxable.<br>
        <em>Example:</em> With a gain of AUD 3,000 from Step 1, if held for over 12 months, only AUD 1,500 would be subject to tax.</p>
        
        <p><strong>Step 3: Calculate Taxable Income from Crypto</strong><br>
        The taxable gain (from Step 2) is added to your other income for the year to determine the final tax rate. Use the following table to check which tax bracket applies.</p>
        
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Taxable Income</th>
                <th>Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Up to AUD 18,200</td>
                <td>0%</td>
              </tr>
              <tr>
                <td>AUD 18,201 – AUD 45,000</td>
                <td>19%</td>
              </tr>
              <tr>
                <td>AUD 45,001 – AUD 120,000</td>
                <td>32.5%</td>
              </tr>
              <tr>
                <td>AUD 120,001 – AUD 180,000</td>
                <td>37%</td>
              </tr>
              <tr>
                <td>Above AUD 180,000</td>
                <td>45%</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p><strong>Step 4: Use the Calculator</strong><br>
        Enter your purchase and sale prices, select "Australia" as your country, and choose your holding period. The calculator will estimate the tax based on the data entered.</p>
      </div>

      <div class="faq-item">
        <h3>Example Scenarios</h3>
        <p><strong>Example 1: Short-Term Holding (Less than 12 months)</strong><br>
        You bought crypto for AUD 2,000 and sold it for AUD 5,000 within 10 months. No CGT discount applies, so the full AUD 3,000 gain is added to your income and taxed.</p>
        
        <p><strong>Example 2: Long-Term Holding (More than 12 months)</strong><br>
        You bought crypto for AUD 5,000 and sold it for AUD 10,000 after 2 years. The gain is AUD 5,000, but with the 50% CGT discount, only AUD 2,500 is taxable.</p>
        
        <p><strong>Example 3: Additional Income</strong><br>
        If you have a taxable gain of AUD 2,500 and other income of AUD 45,000, your total taxable income becomes AUD 47,500. Based on this bracket, your tax rate will be 32.5%.</p>
      </div>

      <div class="faq-item">
        <h3>Additional Resources</h3>
        <p>For more details, refer to the <a href="https://www.ato.gov.au/" target="_blank">Australian Taxation Office (ATO)</a> official guidelines on crypto assets.</p>
      </div>

      <div class="faq-item">
        <h3>How do I use the crypto tax calculator in Australia?</h3>
        <p>To use the crypto tax calculator Australia, input your transaction details such as purchase price, sale price, and holding period. The calculator will automatically determine your capital gains or losses based on Australian Tax Office (ATO) guidelines.</p>
      </div>

      <div class="faq-item">
        <h3>How are crypto gains taxed in Australia?</h3>
        <p>In Australia, crypto gains are taxed as capital gains. If you hold your crypto for more than 12 months, you may qualify for a 50% capital gains tax discount. The crypto tax calculator Australia can calculate this for you.</p>
      </div>

      <div class="faq-item">
        <h3>Does the calculator account for capital gains tax discounts?</h3>
        <p>Yes, the crypto capital gains tax Australia calculator applies the 50% discount for long-term holdings of over 12 months, following ATO guidelines.</p>
      </div>

      <div class="faq-item">
        <h3>Can I use a free crypto tax calculator in Australia?</h3>
        <p>Yes, we offer a free crypto tax calculator Australia version that allows users to calculate taxes on their crypto transactions without any cost.</p>
      </div>

      <div class="faq-item">
        <h3>How do I calculate crypto taxes in Australia?</h3>
        <p>Use the crypto tax calculator Australia to input your transaction details. The tool calculates your capital gains or losses and applies the relevant tax rates based on ATO rules.</p>
      </div>

      <div class="faq-item">
        <h3>What information do I need to calculate my crypto taxes?</h3>
        <p>To calculate your crypto taxes in Australia, you need details like the purchase price, sale price, holding period, and other income (for tax bracket determination), and any associated fees. The Australian crypto tax calculator will use this data to determine your tax liability.</p>
      </div>

      <div class="faq-item">
        <h3>Is staking income taxable in Australia?</h3>
        <p>Yes, staking income is treated as ordinary income and taxed at your marginal tax rate. The crypto tax calculator Australia can help you include this income in your tax calculations.</p>
      </div>

      <div class="faq-item">
        <h3>How do I report crypto gains to the ATO?</h3>
        <p>After using the Australian crypto tax calculator, generate a detailed report of your transactions. This report can be included in your annual tax return for submission to the ATO.</p>
      </div>

      <div class="faq-item">
        <h3>What is the best crypto tax calculator for Australia?</h3>
        <p>The best crypto tax calculator Australia provides accurate calculations, supports multiple transactions, and follows ATO guidelines. Our calculator meets these criteria, making it a reliable choice for Australian crypto users.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AustraliaCryptoTaxCalculator',
  data() {
    return {
      form: {
        purchasePrice: 1000,
        salePrice: 2000,
        holdingPeriod: 'short',
        otherIncome: 0
      },
      results: {
        calculated: false,
        capitalGain: 0,
        taxableGain: 0,
        estimatedTax: 0,
        incomeAfterTax: 0
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
      desc.content = 'Use this Australia Crypto Tax Calculator to estimate your cryptocurrency taxes based on ATO rules. Calculate capital gains, staking income, mining, DeFi, and NFT taxes quickly and accurately for Australian investors and traders.'
      
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
      const purchase = this.form.purchasePrice || 0;
      const sale = this.form.salePrice || 0;
      const otherIncome = this.form.otherIncome || 0;
      const holdingPeriod = this.form.holdingPeriod;
      
      // Calculate capital gain
      const capitalGain = Math.max(0, sale - purchase);
      
      // Apply CGT discount for long-term holdings (over 12 months)
      let taxableGain = capitalGain;
      if (holdingPeriod === 'long' && capitalGain > 0) {
        taxableGain = capitalGain * 0.5; // 50% discount
      }
      
      // Calculate total taxable income
      const totalTaxableIncome = otherIncome + taxableGain;
      
      // Calculate tax based on 2026 Australian tax brackets
      let estimatedTax = 0;
      
      if (totalTaxableIncome <= 18200) {
        estimatedTax = 0;
      } else if (totalTaxableIncome <= 45000) {
        estimatedTax = (totalTaxableIncome - 18200) * 0.19;
      } else if (totalTaxableIncome <= 120000) {
        estimatedTax = (45000 - 18200) * 0.19 + (totalTaxableIncome - 45000) * 0.325;
      } else if (totalTaxableIncome <= 180000) {
        estimatedTax = (45000 - 18200) * 0.19 + (120000 - 45000) * 0.325 + (totalTaxableIncome - 120000) * 0.37;
      } else {
        estimatedTax = (45000 - 18200) * 0.19 + (120000 - 45000) * 0.325 + (180000 - 120000) * 0.37 + (totalTaxableIncome - 180000) * 0.45;
      }
      
      // Calculate income after tax
      const incomeAfterTax = totalTaxableIncome - estimatedTax;
      
      this.results = {
        calculated: true,
        capitalGain: capitalGain,
        taxableGain: taxableGain,
        estimatedTax: estimatedTax,
        incomeAfterTax: incomeAfterTax
      };
    },
    
    formatMoney(value) {
      if (value === undefined || value === null || isNaN(value)) return '0.00';
      return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
  mounted() {
     document.title = 'Australia Crypto Tax Calculator – Calculate Capital Gains, Income & ATO Crypto Taxes'
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
.australia-crypto-tax-calculator {
  max-width: 900px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 32px;
  box-shadow: 0 20px 40px -10px rgba(0, 34, 68, 0.15);
  padding: 28px 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #11212e;
}

@media (max-width: 480px) {
  .australia-crypto-tax-calculator {
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
  min-width: 180px;
}

@media (min-width: 641px) {
  .form-row label {
    width: 220px;
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

.currency-symbol {
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

button:hover {
  background: #143049;
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
  margin-bottom: 20px;
  color: #0b2b44;
}

.result-card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid #d9e2ef;
}

.result-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e9eef3;
}

.result-item:last-child {
  border-bottom: none;
}

.result-label {
  color: #4b5f73;
  font-size: 1rem;
}

.result-value {
  font-weight: 600;
  color: #0b2b44;
  font-size: 1.1rem;
}

.tax-breakdown {
  background: white;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid #d9e2ef;
}

.tax-breakdown p {
  margin: 12px 0;
  color: #1a2e44;
  font-size: 1rem;
}

.tax-breakdown p strong {
  color: #1f3a5f;
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

.faq-item ul,
.faq-item ol {
  margin: 8px 0;
  padding-left: 24px;
}

.faq-item li {
  margin-bottom: 4px;
  line-height: 1.6;
  color: #2c405c;
  font-size: 0.95rem;
}

.faq-item a {
  color: #1f4a7a;
  text-decoration: underline;
}

.faq-item a:hover {
  color: #0b2b44;
}

/* 表格样式 */
.table-wrap {
  overflow-x: auto;
  margin: 1rem 0;
  background: #f9fcff;
  border-radius: 12px;
  border: 1px solid #cbd9ec;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  min-width: 300px;
}

th {
  background-color: #e2edfd;
  color: #0a3455;
  font-weight: 600;
  padding: 0.75rem 1rem;
  text-align: left;
}

td {
  padding: 0.7rem 1rem;
  border-bottom: 1px solid #c8daf2;
}

@media (max-width: 700px) {
  .faq-item {
    padding: 16px;
  }

  .faq-item h3 {
    font-size: 1.1rem;
  }

  .faq-item p,
  .faq-item li {
    font-size: 0.9rem;
  }
}
</style>