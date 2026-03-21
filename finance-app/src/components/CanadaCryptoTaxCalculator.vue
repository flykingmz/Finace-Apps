<template>
  <div class="canada-crypto-tax-calculator">
    <!-- Header -->
    <h1 class="main-title">Canada Crypto Tax Calculator</h1>
    <p class="description">
      The Canada Crypto Tax Calculator helps you estimate your cryptocurrency tax obligations under CRA guidelines. Whether you are trading, staking, mining, or earning income through DeFi or NFTs, this tool provides a simple way to calculate your crypto gains and taxes.Enter your buy and sell prices, transaction fees, and income details to calculate capital gains or business income from your crypto activities. Designed for Canadian investors and traders, this calculator supports both single transactions and multiple crypto portfolios, helping you better understand your tax liability and plan ahead.
    </p>

    <!-- Calculator Form - 附件1样式 -->
    <div class="calculator-form">
      <h2>Crypto Tax Estimator</h2>

      <!-- Tax Year -->
      <div class="form-row">
        <label>Tax Year</label>
        <div class="year-display">2026</div>
      </div>

      <!-- Total Income with tooltip -->
      <div class="form-row">
        <label>
          Total Income (CAD)
          <span class="tooltip-icon" @mouseenter="showTooltip('income')" @mouseleave="hideTooltip('income')">
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
              v-model.number="form.totalIncome"
              @input="calculate"
              min="0"
              step="1000"
              placeholder="100000"
            />
          </div>
        </div>
      </div>

      <!-- Cost Basis with tooltip -->
      <div class="form-row">
        <label>
          Cost Basis (CAD)
          <span class="tooltip-icon" @mouseenter="showTooltip('costBasis')" @mouseleave="hideTooltip('costBasis')">
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
              v-model.number="form.costBasis"
              @input="calculate"
              min="0"
              step="1000"
              placeholder="20000"
            />
          </div>
        </div>
      </div>

      <!-- Sale Amount with tooltip -->
      <div class="form-row">
        <label>
          Sale Amount (CAD)
          <span class="tooltip-icon" @mouseenter="showTooltip('saleAmount')" @mouseleave="hideTooltip('saleAmount')">
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
              v-model.number="form.saleAmount"
              @input="calculate"
              min="0"
              step="1000"
              placeholder="120000"
            />
          </div>
        </div>
      </div>

      <!-- Province / Territory with tooltip -->
      <div class="form-row">
        <label>
          Province / Territory
          <span class="tooltip-icon" @mouseenter="showTooltip('province')" @mouseleave="hideTooltip('province')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#1a3349"/>
            </svg>
          </span>
        </label>
        <div class="input-wrapper">
          <select v-model="form.province" @change="calculate" class="province-select">
            <option v-for="province in provinces" :key="province.code" :value="province.code">
              {{ province.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Tooltips -->
      <div v-if="activeTooltip === 'income'" class="tooltip-popup income-tooltip">
        Your total annual income — needed because Canadian tax rates are marginal
      </div>
      <div v-if="activeTooltip === 'costBasis'" class="tooltip-popup cost-tooltip">
        The amount you originally paid for the crypto
      </div>
      <div v-if="activeTooltip === 'saleAmount'" class="tooltip-popup sale-tooltip">
        The amount you received when selling
      </div>
      <div v-if="activeTooltip === 'province'" class="tooltip-popup province-tooltip">
        Select your province to include provincial tax in the estimate
      </div>

      <div class="form-actions">
        <button @click="calculate">Calculate Tax</button>
      </div>
    </div>

    <!-- Results Section - 附件2样式 -->
    <div class="results-section" v-if="results.calculated">
      <h2>Results</h2>

      <div class="results-card">
        <div class="result-row">
          <span class="result-label">Capital Gain</span>
          <span class="result-value">${{ formatMoney(results.capitalGain) }}</span>
        </div>
        <div class="result-row">
          <span class="result-label">Taxable Gain (50%)</span>
          <span class="result-value">${{ formatMoney(results.taxableGain) }}</span>
        </div>
        <div class="result-row">
          <span class="result-label">Federal Tax</span>
          <span class="result-value">${{ formatMoney(results.federalTax) }}</span>
        </div>
        <div class="result-row">
          <span class="result-label">{{ getProvinceName(form.province) }} Tax</span>
          <span class="result-value">${{ formatMoney(results.provincialTax) }}</span>
        </div>
        <div class="result-row total">
          <span class="result-label">Total Estimated Tax</span>
          <span class="result-value">${{ formatMoney(results.totalTax) }}</span>
        </div>
      </div>

      <div class="tax-breakdown">
        <h3>Tax Breakdown</h3>
        <div class="breakdown-row">
          <span class="breakdown-label">Federal</span>
          <span class="breakdown-value">${{ formatMoney(results.federalTax) }}</span>
        </div>
        <div class="breakdown-row">
          <span class="breakdown-label">{{ getProvinceName(form.province) }}</span>
          <span class="breakdown-value">${{ formatMoney(results.provincialTax) }}</span>
        </div>
        <div class="note-text">
          Only 50% of capital gains are taxable in Canada. Marginal rates applied.
        </div>
      </div>

      <button class="copy-button" @click="copyResults">Copy Results</button>
    </div>

    <!-- Related Tools -->
    <div class="related-tools">
      <span class="related-label">Related:</span>
      <a href="/crypto-tax-calculator">Crypto Tax Calculator</a> <span class="sep">|</span>
      <a href="/nft-calculator">NFT Tax Calculator</a>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h2>Canada Crypto Tax Information – FAQ</h2>

      <div class="faq-item">
        <h3>How to Use This Calculator</h3>
        <p><strong>1. Enter Your Total Income:</strong> Input your overall annual taxable income for 2026 in Canadian Dollars.</p>
        <p><strong>2. Provide Cost Basis & Sale Amount:</strong> Enter what you originally paid for your crypto and the amount you sold it for.</p>
        <p><strong>3. Select Your Province:</strong> Choose your province or territory so we can estimate your provincial tax.</p>
        <p><strong>4. View Results:</strong> The calculator automatically updates as you type, or click the button to calculate. You'll see federal tax, provincial tax, and total estimated tax.</p>
      </div>

      <div class="faq-item">
        <h3>How It's Calculated</h3>
        <p>• Your <strong>capital gain</strong> is calculated as sale amount minus cost basis.</p>
        <p>• In Canada, only <strong>50% of capital gains</strong> are included as taxable income (the inclusion rate).</p>
        <p>• Federal and provincial taxes are calculated using <strong>marginal tax brackets</strong> — each portion of your taxable gain is taxed at the rate for that bracket, not a single flat rate.</p>
        <p>• If your sale is less than your cost basis, you have a <strong>capital loss</strong>, which can offset other capital gains.</p>
      </div>

      <div class="faq-item">
        <h3>2026 Federal Tax Brackets</h3>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>TAXABLE INCOME</th>
                <th>RATE</th>
               </tr>
            </thead>
            <tbody>
              <tr><td>Up to $57,375</td><td>15%</td></tr>
              <tr><td>$57,375 – $114,750</td><td>20.5%</td></tr>
              <tr><td>$114,750 – $158,468</td><td>26%</td></tr>
              <tr><td>$158,468 – $221,708</td><td>29%</td></tr>
              <tr><td>Over $221,708</td><td>33%</td></tr>
            </tbody>
           </table>
        </div>
      </div>

      <div class="faq-item">
        <h3>2026 Provincial & Territorial Tax Brackets</h3>
        
        <h4>Alberta</h4>
        <div class="table-wrap"><table><thead><tr><th>TAXABLE INCOME</th><th>RATE</th></tr></thead><tbody><tr><td>Up to $148,269</td><td>10%</td></tr><tr><td>$148,269 – $177,922</td><td>12%</td></tr><tr><td>$177,922 – $237,230</td><td>13%</td></tr><tr><td>$237,230 – $355,845</td><td>14%</td></tr><tr><td>Over $355,845</td><td>15%</td></tr></tbody></table></div>

        <h4>British Columbia</h4>
        <div class="table-wrap"><table><thead><tr><th>TAXABLE INCOME</th><th>RATE</th></tr></thead><tbody><tr><td>Up to $47,937</td><td>5.06%</td></tr><tr><td>$47,937 – $95,875</td><td>7.7%</td></tr><tr><td>$95,875 – $110,076</td><td>10.5%</td></tr><tr><td>$110,076 – $133,664</td><td>12.29%</td></tr><tr><td>$133,664 – $181,232</td><td>14.7%</td></tr><tr><td>$181,232 – $252,752</td><td>16.8%</td></tr><tr><td>Over $252,752</td><td>20.5%</td></tr></tbody></table></div>

        <h4>Manitoba</h4>
        <div class="table-wrap"><table><thead><tr><th>TAXABLE INCOME</th><th>RATE</th></tr></thead><tbody><tr><td>Up to $47,000</td><td>10.8%</td></tr><tr><td>$47,000 – $100,000</td><td>12.75%</td></tr><tr><td>Over $100,000</td><td>17.4%</td></tr></tbody></table></div>

        <h4>New Brunswick</h4>
        <div class="table-wrap"><table><thead><tr><th>TAXABLE INCOME</th><th>RATE</th></tr></thead><tbody><tr><td>Up to $49,958</td><td>9.4%</td></tr><tr><td>$49,958 – $99,916</td><td>14%</td></tr><tr><td>$99,916 – $185,064</td><td>16%</td></tr><tr><td>Over $185,064</td><td>19.5%</td></tr></tbody></table></div>

        <h4>Newfoundland and Labrador</h4>
        <div class="table-wrap"><table><thead><tr><th>TAXABLE INCOME</th><th>RATE</th></tr></thead><tbody><tr><td>Up to $43,198</td><td>8.7%</td></tr><tr><td>$43,198 – $86,395</td><td>14.5%</td></tr><tr><td>$86,395 – $154,244</td><td>15.8%</td></tr><tr><td>$154,244 – $215,943</td><td>17.8%</td></tr><tr><td>$215,943 – $275,870</td><td>19.8%</td></tr><tr><td>$275,870 – $551,739</td><td>20.8%</td></tr><tr><td>$551,739 – $1,103,478</td><td>21.3%</td></tr><tr><td>Over $1,103,478</td><td>21.8%</td></tr></tbody></table></div>

        <h4>Northwest Territories</h4>
        <div class="table-wrap"><table><thead><tr><th>TAXABLE INCOME</th><th>RATE</th></tr></thead><tbody><tr><td>Up to $50,597</td><td>5.9%</td></tr><tr><td>$50,597 – $101,198</td><td>8.6%</td></tr><tr><td>$101,198 – $164,525</td><td>12.2%</td></tr><tr><td>Over $164,525</td><td>14.05%</td></tr></tbody></table></div>

        <h4>Nova Scotia</h4>
        <div class="table-wrap"><table><thead><tr><th>TAXABLE INCOME</th><th>RATE</th></tr></thead><tbody><tr><td>Up to $29,590</td><td>8.79%</td></tr><tr><td>$29,590 – $59,180</td><td>14.95%</td></tr><tr><td>$59,180 – $93,000</td><td>16.67%</td></tr><tr><td>$93,000 – $150,000</td><td>17.5%</td></tr><tr><td>Over $150,000</td><td>21%</td></tr></tbody></table></div>

        <h4>Nunavut</h4>
        <div class="table-wrap"><table><thead><tr><th>TAXABLE INCOME</th><th>RATE</th></tr></thead><tbody><tr><td>Up to $53,268</td><td>4%</td></tr><tr><td>$53,268 – $106,537</td><td>7%</td></tr><tr><td>$106,537 – $173,205</td><td>9%</td></tr><tr><td>Over $173,205</td><td>11.5%</td></tr></tbody></table></div>

        <h4>Ontario</h4>
        <div class="table-wrap"><table><thead><tr><th>TAXABLE INCOME</th><th>RATE</th></tr></thead><tbody><tr><td>Up to $51,446</td><td>5.05%</td></tr><tr><td>$51,446 – $102,894</td><td>9.15%</td></tr><tr><td>$102,894 – $150,000</td><td>11.16%</td></tr><tr><td>$150,000 – $220,000</td><td>12.16%</td></tr><tr><td>Over $220,000</td><td>13.16%</td></tr></tbody></table></div>

        <h4>Prince Edward Island</h4>
        <div class="table-wrap"><table><thead><tr><th>TAXABLE INCOME</th><th>RATE</th></tr></thead><tbody><tr><td>Up to $32,656</td><td>9.5%</td></tr><tr><td>$32,656 – $63,969</td><td>13.47%</td></tr><tr><td>$63,969 – $105,000</td><td>16.6%</td></tr><tr><td>$105,000 – $140,000</td><td>17.62%</td></tr><tr><td>Over $140,000</td><td>19%</td></tr></tbody></table></div>

        <h4>Quebec</h4>
        <div class="table-wrap"><table><thead><tr><th>TAXABLE INCOME</th><th>RATE</th></tr></thead><tbody><tr><td>Up to $51,780</td><td>14%</td></tr><tr><td>$51,780 – $103,545</td><td>19%</td></tr><tr><td>$103,545 – $126,000</td><td>24%</td></tr><tr><td>Over $126,000</td><td>25.75%</td></tr></tbody></table></div>

        <h4>Saskatchewan</h4>
        <div class="table-wrap"><table><thead><tr><th>TAXABLE INCOME</th><th>RATE</th></tr></thead><tbody><tr><td>Up to $52,057</td><td>10.5%</td></tr><tr><td>$52,057 – $148,734</td><td>12.5%</td></tr><tr><td>Over $148,734</td><td>14.5%</td></tr></tbody></table></div>

        <h4>Yukon</h4>
        <div class="table-wrap"><table><thead><tr><th>TAXABLE INCOME</th><th>RATE</th></tr></thead><tbody><tr><td>Up to $55,867</td><td>6.4%</td></tr><tr><td>$55,867 – $111,733</td><td>9%</td></tr><tr><td>$111,733 – $173,205</td><td>10.9%</td></tr><tr><td>$173,205 – $500,000</td><td>12.8%</td></tr><tr><td>Over $500,000</td><td>15%</td></tr></tbody></table></div>
      </div>
    </div>
     <!-- Calculator CTA -->
    <section class="section calculator-cta">
    <a href="/how-to-calculate-crypto-tax-in-canada-blog" class="calculator-btn">
    How to Calculate Crypto Tax in Canada (Capital Gains vs Income Explained) →
    </a>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CanadaCryptoTaxCalculator',
  data() {
    return {
      provinces: [
        { code: 'AB', name: 'Alberta' },
        { code: 'BC', name: 'British Columbia' },
        { code: 'MB', name: 'Manitoba' },
        { code: 'NB', name: 'New Brunswick' },
        { code: 'NL', name: 'Newfoundland and Labrador' },
        { code: 'NT', name: 'Northwest Territories' },
        { code: 'NS', name: 'Nova Scotia' },
        { code: 'NU', name: 'Nunavut' },
        { code: 'ON', name: 'Ontario' },
        { code: 'PE', name: 'Prince Edward Island' },
        { code: 'QC', name: 'Quebec' },
        { code: 'SK', name: 'Saskatchewan' },
        { code: 'YT', name: 'Yukon' }
      ],
      form: {
        totalIncome: 100000,
        costBasis: 20000,
        saleAmount: 120000,
        province: 'NB'
      },
      activeTooltip: null,
      results: {
        calculated: false,
        capitalGain: 0,
        taxableGain: 0,
        federalTax: 0,
        provincialTax: 0,
        totalTax: 0
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
      desc.content = 'Use this Canada Crypto Tax Calculator to estimate your cryptocurrency taxes based on CRA rules. Calculate capital gains, income from staking, mining, DeFi, and NFT transactions. Get accurate crypto tax results for Canada investors and traders.'
      
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
      // 计算资本利得
      const capitalGain = Math.max(0, this.form.saleAmount - this.form.costBasis);
      const taxableGain = capitalGain * 0.5; // 50% inclusion rate
      
      // 计算联邦税
      const federalTax = this.calculateTax(taxableGain + this.form.totalIncome, 'federal');
      
      // 计算省税
      const provincialTax = this.calculateTax(taxableGain + this.form.totalIncome, this.form.province);
      
      this.results = {
        calculated: true,
        capitalGain: capitalGain,
        taxableGain: taxableGain,
        federalTax: federalTax,
        provincialTax: provincialTax,
        totalTax: federalTax + provincialTax
      };
    },

    calculateTax(income, region) {
      let brackets = [];
      
      if (region === 'federal') {
        brackets = [
          { max: 57375, rate: 0.15 },
          { max: 114750, rate: 0.205 },
          { max: 158468, rate: 0.26 },
          { max: 221708, rate: 0.29 },
          { max: Infinity, rate: 0.33 }
        ];
      } else if (region === 'AB') {
        brackets = [
          { max: 148269, rate: 0.10 },
          { max: 177922, rate: 0.12 },
          { max: 237230, rate: 0.13 },
          { max: 355845, rate: 0.14 },
          { max: Infinity, rate: 0.15 }
        ];
      } else if (region === 'BC') {
        brackets = [
          { max: 47937, rate: 0.0506 },
          { max: 95875, rate: 0.077 },
          { max: 110076, rate: 0.105 },
          { max: 133664, rate: 0.1229 },
          { max: 181232, rate: 0.147 },
          { max: 252752, rate: 0.168 },
          { max: Infinity, rate: 0.205 }
        ];
      } else if (region === 'MB') {
        brackets = [
          { max: 47000, rate: 0.108 },
          { max: 100000, rate: 0.1275 },
          { max: Infinity, rate: 0.174 }
        ];
      } else if (region === 'NB') {
        brackets = [
          { max: 49958, rate: 0.094 },
          { max: 99916, rate: 0.14 },
          { max: 185064, rate: 0.16 },
          { max: Infinity, rate: 0.195 }
        ];
      } else if (region === 'NL') {
        brackets = [
          { max: 43198, rate: 0.087 },
          { max: 86395, rate: 0.145 },
          { max: 154244, rate: 0.158 },
          { max: 215943, rate: 0.178 },
          { max: 275870, rate: 0.198 },
          { max: 551739, rate: 0.208 },
          { max: 1103478, rate: 0.213 },
          { max: Infinity, rate: 0.218 }
        ];
      } else if (region === 'NT') {
        brackets = [
          { max: 50597, rate: 0.059 },
          { max: 101198, rate: 0.086 },
          { max: 164525, rate: 0.122 },
          { max: Infinity, rate: 0.1405 }
        ];
      } else if (region === 'NS') {
        brackets = [
          { max: 29590, rate: 0.0879 },
          { max: 59180, rate: 0.1495 },
          { max: 93000, rate: 0.1667 },
          { max: 150000, rate: 0.175 },
          { max: Infinity, rate: 0.21 }
        ];
      } else if (region === 'NU') {
        brackets = [
          { max: 53268, rate: 0.04 },
          { max: 106537, rate: 0.07 },
          { max: 173205, rate: 0.09 },
          { max: Infinity, rate: 0.115 }
        ];
      } else if (region === 'ON') {
        brackets = [
          { max: 51446, rate: 0.0505 },
          { max: 102894, rate: 0.0915 },
          { max: 150000, rate: 0.1116 },
          { max: 220000, rate: 0.1216 },
          { max: Infinity, rate: 0.1316 }
        ];
      } else if (region === 'PE') {
        brackets = [
          { max: 32656, rate: 0.095 },
          { max: 63969, rate: 0.1347 },
          { max: 105000, rate: 0.166 },
          { max: 140000, rate: 0.1762 },
          { max: Infinity, rate: 0.19 }
        ];
      } else if (region === 'QC') {
        brackets = [
          { max: 51780, rate: 0.14 },
          { max: 103545, rate: 0.19 },
          { max: 126000, rate: 0.24 },
          { max: Infinity, rate: 0.2575 }
        ];
      } else if (region === 'SK') {
        brackets = [
          { max: 52057, rate: 0.105 },
          { max: 148734, rate: 0.125 },
          { max: Infinity, rate: 0.145 }
        ];
      } else if (region === 'YT') {
        brackets = [
          { max: 55867, rate: 0.064 },
          { max: 111733, rate: 0.09 },
          { max: 173205, rate: 0.109 },
          { max: 500000, rate: 0.128 },
          { max: Infinity, rate: 0.15 }
        ];
      }
      
      let tax = 0;
      let remainingIncome = income;
      let previousMax = 0;
      
      for (const bracket of brackets) {
        if (remainingIncome <= 0) break;
        const taxableInBracket = Math.min(remainingIncome, bracket.max - previousMax);
        if (taxableInBracket > 0) {
          tax += taxableInBracket * bracket.rate;
        }
        remainingIncome -= taxableInBracket;
        previousMax = bracket.max;
      }
      
      return tax;
    },

    getProvinceName(code) {
      const province = this.provinces.find(p => p.code === code);
      return province ? province.name : code;
    },

    showTooltip(tooltipId) {
      this.activeTooltip = tooltipId;
    },

    hideTooltip() {
      this.activeTooltip = null;
    },

    copyResults() {
      const text = `Capital Gain: $${this.formatMoney(this.results.capitalGain)}\n` +
                   `Taxable Gain (50%): $${this.formatMoney(this.results.taxableGain)}\n` +
                   `Federal Tax: $${this.formatMoney(this.results.federalTax)}\n` +
                   `${this.getProvinceName(this.form.province)} Tax: $${this.formatMoney(this.results.provincialTax)}\n` +
                   `Total Estimated Tax: $${this.formatMoney(this.results.totalTax)}`;
      navigator.clipboard.writeText(text);
      alert('Results copied to clipboard!');
    },

    formatMoney(value) {
      if (value === undefined || value === null || isNaN(value)) return '0.00';
      return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
  mounted() {
    document.title = 'Canada Crypto Tax Calculator – Calculate Capital Gains, Income & CRA Crypto Taxes'
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
.canada-crypto-tax-calculator {
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
  .canada-crypto-tax-calculator {
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
  min-width: 140px;
  display: flex;
  align-items: center;
  gap: 6px;
}

@media (min-width: 641px) {
  .form-row label {
    width: 160px;
  }
}

.year-display {
  font-size: 1rem;
  font-weight: 500;
  color: #1f3a5f;
  background: #e8f0fe;
  padding: 12px 16px;
  border-radius: 30px;
  display: inline-block;
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
.province-select {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  padding: 8px 0;
  min-width: 0;
  width: 100%;
}

.input-with-symbol input:focus,
.province-select:focus {
  outline: none;
}

.province-select {
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

.tooltip-icon {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-left: 4px;
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

.income-tooltip {
  top: 130px;
  left: 20px;
}

.cost-tooltip {
  top: 210px;
  left: 20px;
}

.sale-tooltip {
  top: 290px;
  left: 20px;
}

.province-tooltip {
  top: 370px;
  left: 20px;
}

@media (min-width: 641px) {
  .income-tooltip { top: 130px; left: 200px; }
  .cost-tooltip { top: 210px; left: 200px; }
  .sale-tooltip { top: 290px; left: 200px; }
  .province-tooltip { top: 370px; left: 200px; }
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
  margin-bottom: 24px;
  color: #0b2b44;
}

.results-card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid #d9e2ef;
}

.result-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e9eef3;
}

.result-row:last-child {
  border-bottom: none;
}

.result-row.total {
  margin-top: 8px;
  font-weight: 600;
  background: #ecf3fa;
  padding: 12px;
  border-radius: 8px;
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
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid #d9e2ef;
}

.tax-breakdown h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #1e3a5f;
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e9eef3;
}

.breakdown-row:last-child {
  border-bottom: none;
}

.breakdown-label {
  color: #4b5f73;
}

.breakdown-value {
  font-weight: 600;
  color: #0b2b44;
}

.note-text {
  margin-top: 16px;
  font-size: 0.85rem;
  color: #6b7f96;
  font-style: italic;
}

.copy-button {
  background: white;
  color: #1f3a5f;
  border: 1px solid #1f3a5f;
  width: auto;
  min-width: 150px;
}

.copy-button:hover {
  background: #e4ecf5;
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

.faq-item h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 16px 0 8px;
  color: #17466b;
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

  .faq-item h4 {
    font-size: 1rem;
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