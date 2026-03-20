<template>
  <div class="uk-crypto-tax-calculator">
    <!-- Header -->
    <h1 class="main-title">UK Crypto Tax Calculator</h1>
    <p class="description">
      The UK Crypto Tax Calculator helps you estimate capital gains and tax liabilities from cryptocurrency transactions under HMRC guidelines. This tool supports common crypto activities such as trading, staking, mining, DeFi, and NFT transactions.Enter your purchase price, selling price, transaction fees, and income details to calculate your crypto gains or losses. Whether you are a crypto investor, trader, or NFT collector in the UK, this calculator provides a simple way to understand how your cryptocurrency profits may be taxed.
    </p>

    <!-- Calculator Form - 附件1样式 -->
    <div class="calculator-form">
      <h2>Tax Calculator</h2>

      <!-- Tax Year Selection -->
      <div class="form-row">
        <label>Tax Year</label>
        <div class="input-wrapper">
          <select v-model="selectedTaxYear" @change="updateTaxRates" class="tax-year-select">
            <option v-for="year in taxYears" :key="year" :value="year">
              {{ year }}/{{ (year + 1).toString().slice(-2) }}
            </option>
          </select>
        </div>
      </div>

      <!-- Transaction Type Tabs -->
      <div class="transaction-tabs">
        <button
          class="tab-btn"
          :class="{ active: transactionType === 'buy' }"
          @click="transactionType = 'buy'"
        >
          Buy / Acquisition
        </button>
        <button
          class="tab-btn"
          :class="{ active: transactionType === 'sell' }"
          @click="transactionType = 'sell'"
        >
          Sell / Disposal
        </button>
      </div>

      <!-- Transaction Details -->
      <div class="transaction-details">
        <!-- Asset Selection -->
        <div class="form-row">
          <label>Asset</label>
          <div class="input-wrapper">
            <select v-model="selectedAsset" class="asset-select">
              <option v-for="asset in cryptoAssets" :key="asset.symbol" :value="asset">
                {{ asset.name }} ({{ asset.symbol }})
              </option>
            </select>
          </div>
        </div>

        <!-- Amount -->
        <div class="form-row">
          <label>Amount</label>
          <div class="input-wrapper">
            <div class="input-with-symbol">
              <input
                type="number"
                v-model.number="transactionAmount"
                min="0"
                step="0.001"
                placeholder="12"
              />
            </div>
          </div>
        </div>

        <!-- Date -->
        <div class="form-row">
          <label>Date</label>
          <div class="input-wrapper">
            <input
              type="date"
              v-model="transactionDate"
              class="date-input"
            />
          </div>
        </div>

        <!-- Price -->
        <div class="form-row">
          <label>Price (£)</label>
          <div class="input-wrapper">
            <div class="input-with-symbol">
              <span class="currency-symbol">£</span>
              <input
                type="number"
                v-model.number="transactionPrice"
                min="0"
                step="0.01"
                placeholder="12345"
              />
            </div>
          </div>
        </div>

        <!-- Valuation (calculated) -->
        <div class="form-row valuation-row">
          <label>Valuation (£)</label>
          <div class="valuation-display">
            £{{ formatMoney(transactionAmount * transactionPrice) }}
          </div>
        </div>
      </div>

      <!-- Other Taxable Income -->
      <div class="form-row">
        <label>Other Taxable Income (£)</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">£</span>
            <input
              type="number"
              v-model.number="otherIncome"
              min="0"
              step="100"
              placeholder="123444"
            />
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="form-actions">
        <button @click="calculate">Calculate</button>
        <button class="reset" @click="resetForm">Reset</button>
      </div>
    </div>

    <!-- Results Section - 附件2样式 -->
    <div class="results-section" v-if="results.calculated">
      <h2>Calculation Details</h2>

      <!-- Section 104 Pool -->
      <div class="result-card pool-card">
        <h3>Section 104 Pool</h3>
        <div class="pool-details">
          <div class="pool-row">
            <span class="pool-label">{{ results.assetAmount }} {{ results.assetSymbol }}</span>
            <span class="pool-value">£{{ formatMoney(results.costBasis) }} cost</span>
          </div>
          <div class="pool-row">
            <span class="pool-label">Disposal Proceeds</span>
            <span class="pool-value">£{{ formatMoney(results.disposalProceeds) }}</span>
          </div>
          <div class="pool-row">
            <span class="pool-label">Less Allowable Costs</span>
            <span class="pool-value negative">-£{{ formatMoney(results.costBasis) }}</span>
          </div>
          <div class="pool-row total">
            <span class="pool-label">Total Gain</span>
            <span class="pool-value gain">£{{ formatMoney(results.totalGain) }}</span>
          </div>
        </div>
      </div>

      <!-- UK Tax Liability -->
      <div class="result-card tax-card">
        <h3>UK Tax Liability</h3>

        <div class="tax-row">
          <span class="tax-label">Other Taxable Income (Salary, dividends, etc)</span>
          <span class="tax-value">£{{ formatMoney(otherIncome) }}</span>
        </div>

        <div class="tax-details">
          <div class="tax-row">
            <span class="tax-label">Annual Exemption</span>
            <span class="tax-value">-£{{ formatMoney(taxRates.annualExemption) }}</span>
          </div>
          <div class="tax-row">
            <span class="tax-label">Taxable Gain</span>
            <span class="tax-value gain">£{{ formatMoney(results.taxableGain) }}</span>
          </div>
          <div class="tax-row">
            <span class="tax-label">Higher Rate Tax ({{ results.taxRate }}%)</span>
            <span class="tax-value">-£{{ formatMoney(results.taxPayable) }}</span>
          </div>
        </div>

        <div class="tax-row total">
          <span class="tax-label">CGT Payable</span>
          <span class="tax-value cgt">£{{ formatMoney(results.cgtPayable) }}</span>
        </div>

        <div class="profit-after-tax">
          <span class="profit-label">Profit after tax:</span>
          <span class="profit-value">£{{ formatMoney(results.profitAfterTax) }}</span>
        </div>
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
      <h2>UK Crypto Tax Calculator – FAQ (Complete Guide for 2026)</h2>
      <p class="faq-intro">Below is a comprehensive FAQ designed to cover the most searched questions around UK crypto tax calculator, crypto capital gains tax UK, and HMRC crypto rules.</p>

      <div class="faq-item">
        <h3>❓ What is a UK crypto tax calculator?</h3>
        <p>A UK crypto tax calculator is a tool that helps you estimate how much tax you owe on cryptocurrency transactions based on rules from HM Revenue & Customs. It typically calculates:</p>
        <ul>
          <li>Capital Gains Tax (CGT) on crypto disposals</li>
          <li>Income tax on staking, mining, or airdrops</li>
          <li>Total taxable profit or loss</li>
        </ul>
        <p>It's especially useful for investors dealing with Bitcoin, Ethereum, NFTs, and DeFi transactions.</p>
      </div>

      <div class="faq-item">
        <h3>❓ Do I have to pay tax on cryptocurrency in the UK?</h3>
        <p>Yes. In the UK, crypto is treated as property, not currency. You may owe tax when you:</p>
        <ul>
          <li>Sell crypto for GBP</li>
          <li>Trade one crypto for another (e.g., BTC → ETH)</li>
          <li>Spend crypto on goods or services</li>
          <li>Gift crypto (in some cases)</li>
        </ul>
        <p>Taxes are generally categorized as:</p>
        <ul>
          <li>Capital Gains Tax (CGT) → for disposals</li>
          <li>Income Tax → for earnings like staking or mining</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>❓ How is crypto capital gains tax calculated in the UK?</h3>
        <p>Crypto gains are calculated using:</p>
        <p class="formula">Capital Gain = Sale Price – Cost Basis</p>
        <p>In the UK, you must also follow share pooling rules:</p>
        <ul>
          <li>Same-day rule</li>
          <li>30-day "bed and breakfast" rule</li>
          <li>Section 104 pool</li>
        </ul>
        <p>A crypto tax calculator automates these complex calculations and ensures compliance.</p>
      </div>

      <div class="faq-item">
        <h3>❓ What is the crypto tax-free allowance in the UK?</h3>
        <p>As of recent tax years, individuals have a Capital Gains Tax allowance (annual exempt amount).</p>
        <p>Example:</p>
        <ul>
          <li>First £6,000 (or updated threshold) may be tax-free</li>
          <li>Gains above that are taxed</li>
        </ul>
        <p>Rates depend on your income bracket:</p>
        <ul>
          <li>Basic rate: 10%</li>
          <li>Higher rate: 20%</li>
        </ul>
        <p>A UK crypto tax calculator helps determine whether you exceed this threshold.</p>
      </div>

      <div class="faq-item">
        <h3>❓ Do I pay tax when I buy crypto?</h3>
        <p>No. Buying crypto is not a taxable event. However, it becomes taxable when you dispose of it, such as selling or trading.</p>
      </div>

      <div class="faq-item">
        <h3>❓ Is crypto-to-crypto trading taxable in the UK?</h3>
        <p>Yes. Even if you don't convert to GBP, trading crypto (e.g., ETH → SOL) is considered a taxable disposal. This is one of the most commonly misunderstood rules—and where a crypto tax calculator becomes essential.</p>
      </div>

      <div class="faq-item">
        <h3>❓ How are staking and mining taxed?</h3>
        <p>Crypto earned through:</p>
        <ul>
          <li>staking</li>
          <li>mining</li>
          <li>liquidity pools</li>
          <li>airdrops</li>
        </ul>
        <p>is usually treated as income. You must:</p>
        <ol>
          <li>Declare the fair market value at the time received</li>
          <li>Pay income tax</li>
          <li>Later calculate CGT when you sell</li>
        </ol>
        <p>A crypto tax calculator can track both income and capital gains automatically.</p>
      </div>

      <div class="faq-item">
        <h3>❓ What about NFT taxes in the UK?</h3>
        <p>NFTs are also subject to tax. You may owe:</p>
        <ul>
          <li>CGT when selling NFTs</li>
          <li>Income tax if NFTs are earned (e.g., royalties, minting income)</li>
        </ul>
        <p>NFT tax calculations can be complex due to fluctuating valuations—another reason to use a calculator.</p>
      </div>

      <div class="faq-item">
        <h3>❓ Can I offset crypto losses?</h3>
        <p>Yes. Crypto losses can be used to:</p>
        <ul>
          <li>Offset gains in the same tax year</li>
          <li>Carry forward to future years</li>
        </ul>
        <p>Example:</p>
        <ul>
          <li>Gain: £10,000</li>
          <li>Loss: £4,000</li>
          <li>Taxable gain: £6,000</li>
        </ul>
        <p>A crypto tax calculator helps track and apply losses correctly.</p>
      </div>

      <div class="faq-item">
        <h3>❓ Do I need to report crypto if I made no profit?</h3>
        <p>In some cases, yes. You may still need to report if:</p>
        <ul>
          <li>Total disposals exceed certain thresholds</li>
          <li>HMRC requests information</li>
        </ul>
        <p>Keeping accurate records is essential.</p>
      </div>

      <div class="faq-item">
        <h3>❓ What records does HMRC require?</h3>
        <p>You should keep:</p>
        <ul>
          <li>transaction dates</li>
          <li>purchase and sale prices</li>
          <li>wallet addresses</li>
          <li>exchange records</li>
          <li>fees</li>
        </ul>
        <p>A crypto tax calculator often integrates with exchanges to automate this process.</p>
      </div>

      <div class="faq-item">
        <h3>❓ Can HMRC track my crypto?</h3>
        <p>Yes. HM Revenue & Customs has increasing access to:</p>
        <ul>
          <li>exchange data</li>
          <li>blockchain analytics tools</li>
          <li>international reporting systems</li>
        </ul>
        <p>Failing to report crypto gains can lead to penalties.</p>
      </div>

      <div class="faq-item">
        <h3>❓ What is the best way to calculate crypto taxes in the UK?</h3>
        <p>Manual calculation is possible—but extremely time-consuming. Most investors prefer using a UK crypto tax calculator because it:</p>
        <ul>
          <li>automates HMRC rules</li>
          <li>reduces errors</li>
          <li>saves time</li>
          <li>handles complex transactions (DeFi, NFTs, staking)</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>❓ Can I reduce my crypto tax legally?</h3>
        <p>Yes, common strategies include:</p>
        <ul>
          <li>using annual CGT allowance</li>
          <li>harvesting losses</li>
          <li>spreading disposals across tax years</li>
          <li>transferring assets to a spouse</li>
        </ul>
        <p>A calculator helps model these scenarios before filing.</p>
      </div>

      <div class="faq-item">
        <h3>❓ Is DeFi taxable in the UK?</h3>
        <p>Yes, but treatment varies depending on the activity. Examples:</p>
        <ul>
          <li>liquidity provision → may trigger CGT</li>
          <li>yield farming → often treated as income</li>
          <li>token swaps → taxable disposals</li>
        </ul>
        <p>Because DeFi transactions are complex, using a calculator is highly recommended.</p>
      </div>

      <div class="faq-item">
        <h3>❓ When is the UK crypto tax deadline?</h3>
        <p>The UK tax year runs: 👉 6 April – 5 April</p>
        <p>Deadlines:</p>
        <ul>
          <li>Self Assessment: 31 January (following year)</li>
        </ul>
        <p>A crypto tax calculator helps prepare data before filing.</p>
      </div>

      <div class="faq-item">
        <h3>❓ Why should I use a UK crypto tax calculator?</h3>
        <p>Because crypto taxes are more complex than traditional investing. A good calculator helps you:</p>
        <ul>
          <li>estimate tax liability instantly</li>
          <li>avoid HMRC penalties</li>
          <li>track gains across exchanges</li>
          <li>optimize tax strategy</li>
        </ul>
      </div>
    </div>

     <!-- Calculator CTA -->
    <section class="section calculator-cta">
    <a href="/annuity-rule-which-gives-you-more-monthly-income-blog" class="calculator-btn">
    UK Crypto Tax 2026: 7 Rules That Could Save You Thousands →
    </a>
    </section>
  </div>
</template>

<script>
export default {
  name: 'UKCryptoTaxCalculator',
  data() {
    return {
      // Tax years from 2020 to 2026
      taxYears: [2020, 2021, 2022, 2023, 2024, 2025, 2026],
      selectedTaxYear: 2026,
      
      // UK tax rates by year (annual exemption and CGT rates)
      taxRatesByYear: {
        2020: { annualExemption: 12300, basicRate: 10, higherRate: 20 },
        2021: { annualExemption: 12300, basicRate: 10, higherRate: 20 },
        2022: { annualExemption: 12300, basicRate: 10, higherRate: 20 },
        2023: { annualExemption: 6000, basicRate: 10, higherRate: 20 },
        2024: { annualExemption: 6000, basicRate: 10, higherRate: 20 },
        2025: { annualExemption: 3000, basicRate: 10, higherRate: 20 },
        2026: { annualExemption: 3000, basicRate: 10, higherRate: 20 }
      },
      
      // Current tax rates (will be updated based on selected year)
      taxRates: {
        annualExemption: 3000,
        basicRate: 10,
        higherRate: 20
      },
      
      // Mainstream crypto assets
      cryptoAssets: [
        { symbol: 'BTC', name: 'Bitcoin' },
        { symbol: 'ETH', name: 'Ethereum' },
        { symbol: 'BNB', name: 'BNB' },
        { symbol: 'SOL', name: 'Solana' },
        { symbol: 'XRP', name: 'XRP' },
        { symbol: 'ADA', name: 'Cardano' },
        { symbol: 'AVAX', name: 'Avalanche' },
        { symbol: 'DOT', name: 'Polkadot' },
        { symbol: 'LINK', name: 'Chainlink' },
        { symbol: 'MATIC', name: 'Polygon' },
        { symbol: 'ATOM', name: 'Cosmos' },
        { symbol: 'UNI', name: 'Uniswap' },
        { symbol: 'LTC', name: 'Litecoin' },
        { symbol: 'BCH', name: 'Bitcoin Cash' },
        { symbol: 'ALGO', name: 'Algorand' },
        { symbol: 'NEAR', name: 'Near Protocol' },
        { symbol: 'FIL', name: 'Filecoin' },
        { symbol: 'APT', name: 'Aptos' },
        { symbol: 'HBAR', name: 'Hedera' },
        { symbol: 'VET', name: 'VeChain' }
      ],
      
      selectedAsset: { symbol: 'BTC', name: 'Bitcoin' },
      transactionType: 'buy', // 'buy' or 'sell'
      transactionAmount: 12,
      transactionDate: new Date().toISOString().split('T')[0],
      transactionPrice: 12345,
      otherIncome: 123444,
      
      results: {
        calculated: false,
        assetSymbol: 'BTC',
        assetAmount: 12,
        costBasis: 0,
        disposalProceeds: 0,
        totalGain: 0,
        taxableGain: 0,
        taxRate: 20,
        taxPayable: 0,
        cgtPayable: 0,
        profitAfterTax: 0
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
      desc.content = 'Use this UK Crypto Tax Calculator to estimate cryptocurrency capital gains and tax liabilities based on HMRC rules. Calculate taxes from crypto trading, staking, mining, DeFi, and NFT transactions quickly and accurately.'
      
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
    updateTaxRates() {
      this.taxRates = { ...this.taxRatesByYear[this.selectedTaxYear] };
    },
    
    calculate() {
      // Calculate valuation
      const valuation = this.transactionAmount * this.transactionPrice;
      
      // For simplicity, we'll assume the cost basis is the purchase price
      // In a real app, this would come from the Section 104 pool
      const costBasis = this.transactionType === 'sell' ? valuation * 0.5 : valuation;
      const disposalProceeds = this.transactionType === 'sell' ? valuation : 0;
      const totalGain = this.transactionType === 'sell' ? valuation - costBasis : 0;
      
      // Determine if this is a basic rate or higher rate taxpayer
      // Basic rate threshold is £50,270 for all years (simplified)
      const basicRateThreshold = 50270;
      const totalIncome = this.otherIncome + totalGain;
      
      let taxableGain = Math.max(0, totalGain - this.taxRates.annualExemption);
      let taxRate = totalIncome > basicRateThreshold ? this.taxRates.higherRate : this.taxRates.basicRate;
      
      // Calculate tax payable
      const taxPayable = taxableGain * (taxRate / 100);
      const cgtPayable = taxPayable;
      const profitAfterTax = totalGain - cgtPayable;
      
      this.results = {
        calculated: true,
        assetSymbol: this.selectedAsset.symbol,
        assetAmount: this.transactionAmount,
        costBasis: costBasis,
        disposalProceeds: disposalProceeds,
        totalGain: totalGain,
        taxableGain: taxableGain,
        taxRate: taxRate,
        taxPayable: taxPayable,
        cgtPayable: cgtPayable,
        profitAfterTax: profitAfterTax
      };
    },
    
    resetForm() {
      this.selectedTaxYear = 2026;
      this.selectedAsset = { symbol: 'BTC', name: 'Bitcoin' };
      this.transactionType = 'buy';
      this.transactionAmount = 12;
      this.transactionDate = new Date().toISOString().split('T')[0];
      this.transactionPrice = 12345;
      this.otherIncome = 123444;
      this.results.calculated = false;
      this.updateTaxRates();
    },
    
    formatMoney(value) {
      if (value === undefined || value === null || isNaN(value)) return '0.00';
      return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
  mounted() {
    document.title = 'UK Crypto Tax Calculator – Calculate Cryptocurrency Capital Gains & HMRC Taxes'
    // 2. 设置关键meta标签（Google最关注的）
    this.setGoogleMetaTags()
    this.updateTaxRates();
  },
  watch: {
    selectedTaxYear: 'updateTaxRates'
  }
};
</script>

<style scoped>
/* 移动端优先的样式设计 */
.uk-crypto-tax-calculator {
  max-width: 1100px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 32px;
  box-shadow: 0 20px 40px -10px rgba(0, 34, 68, 0.15);
  padding: 28px 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #11212e;
}

@media (max-width: 480px) {
  .uk-crypto-tax-calculator {
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
  min-width: 120px;
}

@media (min-width: 641px) {
  .form-row label {
    width: 140px;
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

.input-with-symbol input,
.tax-year-select,
.asset-select,
.date-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  padding: 8px 0;
  min-width: 0;
  width: 100%;
}

.input-with-symbol input:focus,
.tax-year-select:focus,
.asset-select:focus,
.date-input:focus {
  outline: none;
}

.tax-year-select,
.asset-select,
.date-input {
  padding: 12px 16px;
  border: 1px solid #b6c9dd;
  border-radius: 30px;
  background: white;
  cursor: pointer;
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

.transaction-tabs {
  display: flex;
  gap: 12px;
  margin: 24px 0 20px;
  border-bottom: 2px solid #d4e2f0;
  padding-bottom: 12px;
}

.tab-btn {
  background: none;
  border: none;
  padding: 8px 20px;
  font-size: 1rem;
  font-weight: 500;
  color: #4b5f73;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.2s;
  flex: 1;
}

.tab-btn.active {
  background: #1f3a5f;
  color: white;
}

.transaction-details {
  background: #e8f0fe;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid #c9d9ec;
}

.valuation-row {
  background: white;
  border-radius: 16px;
  padding: 12px 16px;
  margin-top: 8px;
}

.valuation-display {
  font-weight: 600;
  color: #1f3a5f;
  font-size: 1.2rem;
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

button.reset {
  background: white;
  color: #1f3a5f;
}

button:hover {
  background: #143049;
}

button.reset:hover {
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

.result-card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid #d9e2ef;
}

.result-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #1e3a5f;
  border-bottom: 2px solid #e1eaf3;
  padding-bottom: 8px;
}

.pool-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pool-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e9eef3;
}

.pool-row:last-child {
  border-bottom: none;
}

.pool-row.total {
  margin-top: 8px;
  font-weight: 600;
  background: #ecf3fa;
  padding: 12px;
  border-radius: 8px;
}

.pool-label {
  color: #4b5f73;
  font-size: 0.95rem;
}

.pool-value {
  font-weight: 500;
  color: #0b2b44;
}

.pool-value.negative {
  color: #dc2626;
}

.pool-value.gain {
  color: #16a34a;
  font-size: 1.1rem;
}

.tax-details {
  background: #f0f7ff;
  border-radius: 12px;
  padding: 16px;
  margin: 16px 0;
}

.tax-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e9eef3;
}

.tax-row:last-child {
  border-bottom: none;
}

.tax-row.total {
  font-weight: 600;
  background: #e1eaf3;
  padding: 12px;
  border-radius: 8px;
  margin-top: 8px;
}

.tax-label {
  color: #4b5f73;
  font-size: 0.95rem;
}

.tax-value {
  font-weight: 500;
  color: #0b2b44;
}

.tax-value.gain {
  color: #16a34a;
  font-size: 1.1rem;
}

.tax-value.cgt {
  color: #1f3a5f;
  font-size: 1.2rem;
  font-weight: 600;
}

.profit-after-tax {
  margin-top: 20px;
  padding: 16px;
  background: #ecf3fa;
  border-radius: 12px;
  text-align: center;
}

.profit-label {
  font-size: 1rem;
  color: #4b5f73;
  margin-right: 8px;
}

.profit-value {
  font-size: 1.3rem;
  font-weight: 600;
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
  margin-bottom: 12px;
  color: #0b2b44;
}

.faq-intro {
  font-size: 1rem;
  color: #4b5f73;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #d4e2f0;
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

.faq-item .formula {
  font-family: 'Courier New', monospace;
  background: #ecf3fa;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 500;
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