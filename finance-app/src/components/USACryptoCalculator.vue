<template>
  <div class="usa-crypto-tax-calculator">
    <!-- Header -->
    <h1 class="main-title">USA Crypto Tax Calculator</h1>
    <p class="description">
      The USA Crypto Tax Calculator helps you estimate capital gains and potential tax liabilities from cryptocurrency transactions based on U.S. tax rules. You can calculate taxes from crypto trading, staking rewards, mining income, DeFi activities, and NFT transactions.Simply enter your purchase price, selling price, transaction fees, and income details to estimate your crypto gains or losses. This calculator provides a quick way for U.S. investors and traders to understand how cryptocurrency profits may impact their tax reporting.
    </p>

    <!-- Calculator Form - 附件1样式 -->
    <div class="calculator-form">
      <h2>USA Crypto Tax Calculator</h2>

      <div class="form-grid">
        <!-- Left Column -->
        <div class="form-column">
          <div class="form-row">
            <label>Original Investment ($)</label>
            <div class="input-wrapper">
              <div class="input-with-symbol">
                <span class="currency-symbol">$</span>
                <input
                  type="number"
                  v-model.number="form.originalInvestment"
                  @input="calculate"
                  min="0"
                  step="100"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div class="form-row">
            <label>Buy Price ($)</label>
            <div class="input-wrapper">
              <div class="input-with-symbol">
                <span class="currency-symbol">$</span>
                <input
                  type="number"
                  v-model.number="form.buyPrice"
                  @input="calculate"
                  min="0"
                  step="100"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div class="form-row">
            <label>Sell Price ($)</label>
            <div class="input-wrapper">
              <div class="input-with-symbol">
                <span class="currency-symbol">$</span>
                <input
                  type="number"
                  v-model.number="form.sellPrice"
                  @input="calculate"
                  min="0"
                  step="100"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="form-column">
          <div class="form-row">
            <label>Investment Fee ($)</label>
            <div class="input-wrapper">
              <div class="input-with-symbol">
                <span class="currency-symbol">$</span>
                <input
                  type="number"
                  v-model.number="form.investmentFee"
                  @input="calculate"
                  min="0"
                  step="10"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div class="form-row">
            <label>Exit Fee ($)</label>
            <div class="input-wrapper">
              <div class="input-with-symbol">
                <span class="currency-symbol">$</span>
                <input
                  type="number"
                  v-model.number="form.exitFee"
                  @input="calculate"
                  min="0"
                  step="10"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div class="form-row">
            <label>Annual Income ($)</label>
            <div class="input-wrapper">
              <div class="input-with-symbol">
                <span class="currency-symbol">$</span>
                <input
                  type="number"
                  v-model.number="form.annualIncome"
                  @input="calculate"
                  min="0"
                  step="1000"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Holding Period -->
      <div class="form-row radio-row">
        <label>Holding Period</label>
        <div class="radio-group">
          <label class="radio-label">
            <input
              type="radio"
              value="short"
              v-model="form.holdingPeriod"
              @change="calculate"
            />
            <span>Short-term (less than 1 year)</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              value="long"
              v-model="form.holdingPeriod"
              @change="calculate"
            />
            <span>Long-term (1+ year)</span>
          </label>
        </div>
      </div>

      <!-- State of Residence and Filing Status -->
      <div class="form-row">
        <label>State of Residence</label>
        <div class="input-wrapper">
          <select v-model="form.state" @change="calculate" class="state-select">
            <option v-for="state in states" :key="state.abbr" :value="state.abbr">
              {{ state.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <label>Filing Status</label>
        <div class="input-wrapper">
          <select v-model="form.filingStatus" @change="calculate" class="state-select">
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
            <option value="head">Head of Household</option>
          </select>
        </div>
      </div>

      <div class="form-actions">
        <button @click="calculate">Calculate</button>
        <button class="clear" @click="clearForm">Clear</button>
      </div>
    </div>

    <!-- Results Section - 附件2样式 -->
    <div class="results-section" v-if="results.calculated">
      <h2>Results</h2>

      <!-- Capital Gain -->
      <div class="result-card capital-gain">
        <div class="result-label">Capital Gain:</div>
        <div class="result-value">${{ formatMoney(results.capitalGain) }}</div>
      </div>

      <!-- Federal Tax -->
      <div class="result-card federal-tax">
        <div class="result-label">Federal Tax:</div>
        <div class="result-value">${{ formatMoney(results.federalTax) }}</div>
      </div>

      <div class="tax-details">
        <div class="tax-detail-item">
          <span class="detail-label">Tax Type:</span>
          <span class="detail-value">{{ results.taxType }}</span>
        </div>
        <div class="tax-detail-item">
          <span class="detail-label">Marginal Rate:</span>
          <span class="detail-value">{{ results.federalMarginalRate.toFixed(2) }}%</span>
        </div>
        <div class="tax-detail-item">
          <span class="detail-label">Effective Rate:</span>
          <span class="detail-value">{{ results.federalEffectiveRate.toFixed(2) }}%</span>
        </div>
      </div>

      <!-- State Tax -->
      <div class="result-card state-tax">
        <div class="result-label">State Tax ({{ getStateName(form.state) }}):</div>
        <div class="result-value">${{ formatMoney(results.stateTax) }}</div>
      </div>

      <div class="tax-details">
        <div class="tax-detail-item">
          <span class="detail-label">Marginal Rate:</span>
          <span class="detail-value">{{ results.stateMarginalRate.toFixed(2) }}%</span>
        </div>
        <div class="tax-detail-item">
          <span class="detail-label">Effective Rate:</span>
          <span class="detail-value">{{ results.stateEffectiveRate.toFixed(2) }}%</span>
        </div>
      </div>

      <!-- Total Tax -->
      <div class="result-card total-tax">
        <div class="result-label">Total Tax:</div>
        <div class="result-value">${{ formatMoney(results.totalTax) }}</div>
      </div>

      <!-- State Tax Brackets -->
      <div class="brackets-section">
        <h3>{{ getStateName(form.state) }} Income Tax Brackets ({{ getFilingStatusLabel(form.filingStatus) }}):</h3>
        <div class="brackets-table">
          <div v-for="(bracket, index) in getStateBrackets(form.state, form.filingStatus)" :key="index" class="bracket-row">
            <div class="bracket-range">{{ bracket.range }}</div>
            <div class="bracket-rate">{{ bracket.rate }}%</div>
          </div>
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
      <h2>USA Crypto Tax Information – FAQ</h2>

      <div class="faq-item">
        <h3>How does the crypto tax calculator work?</h3>
        <p>USA crypto tax calculator is designed for you to get an estimate of your crypto taxes in tax season. A lot of people use it with our <a href="/crypto-tax-calculator">crypto tax software</a> to get an accurate estimate of their taxes.</p>
        <p>It takes the profit or loss that you enter and calculates is against the IRS capital gain brackets based on your location (State). For more accurate predictions, include any fees you are aware of.</p>
        <p>You will need to know your original investment, buy price, sell price, investment fee, exit fee and annual income. In addition to that, you should know whether you have owned the asset for more or less than one year, your state of Residence and your filing status.</p>
      </div>

      <div class="faq-item">
        <h3>Crypto taxes in the United States explained</h3>
        <p>In the US, cryptocurrency is treated as property for tax purposes, meaning you owe capital gains tax when you sell, trade, or use crypto if its value has increased since you acquired it. Short-term gains (held less than a year) are taxed as ordinary income, while long-term gains get preferential tax rates. You must report all crypto transactions to the IRS, including trading one cryptocurrency for another.</p>
      </div>

      <div class="faq-item">
        <h3>Does a crypto tax calculator handle NFTs and DeFi?</h3>
        <p>USA tax calculator can tell you your crypto taxes in the same way you would any crypto asset. However to calculate many transactions you should strongly consider using Awaken's crypto tax software to handle your full tax return.</p>
      </div>

      <div class="faq-item">
        <h3>Do I still need an accountant if I use a crypto tax calculator?</h3>
        <p>A calculator automates the math, but an accountant ensures compliance and advises on strategy. Many crypto tax professionals typically use software in addition to calculators.</p>
      </div>

      <div class="faq-item">
        <h3>Is your crypto tax calculator free?</h3>
        <p>Yes, our crypto tax calculator is completely free to use.</p>
      </div>

      <div class="faq-item">
        <h3>How much will I be taxed on crypto?</h3>
        <p>It depends on your country's tax rules. In most places, profits from selling, trading, or spending crypto are treated as capital gains, while mining, staking, and airdrops are taxed as income. A crypto tax calculator helps estimate your exact tax owed based on your transaction history and cost basis.</p>
      </div>

      <div class="faq-item">
        <h3>What is 'cost basis' in a crypto tax calculator?</h3>
        <p>Cost basis is the original value you paid for a cryptocurrency, including purchase price and fees. When you sell or trade, the calculator uses cost basis methods (FIFO, LIFO, HIFO, Specific ID) to work out your gains or losses.</p>
      </div>

      <div class="faq-item">
        <h3>What is the easiest way to calculate crypto taxes?</h3>
        <p>The easiest way is to connect your exchanges and wallets to a crypto tax software because a calculator will only get you so far. It automatically imports your transactions, reconciles transfers, applies cost basis, and generates tax reports. This removes the need for manual spreadsheets.</p>
      </div>

      <div class="faq-item">
        <h3>What is considered a taxable event in crypto?</h3>
        <p>Taxable events usually include selling crypto for fiat, swapping one coin for another, spending crypto on goods/services, and earning income from mining, staking, or NFTs.</p>
      </div>

      <div class="faq-item">
        <h3>What is a non-taxable event in crypto?</h3>
        <p>Non-taxable events include simply buying and holding crypto, transferring coins between your own wallets, or receiving gifts (depending on jurisdiction). A calculator separates these from taxable events so you don't overreport.</p>
      </div>

      <div class="faq-item">
        <h3>What is considered a capital gain in crypto?</h3>
        <p>A capital gain occurs when you sell or trade crypto for more than your cost basis. For example, buying 1 ETH at $1,500 and later selling at $2,500 creates a $1,000 capital gain. A calculator tracks and classifies these as short-term or long-term.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'USACryptoTaxCalculator',
  data() {
    return {
      // 美国所有州
      states: [
        { abbr: 'AL', name: 'Alabama' },
        { abbr: 'AK', name: 'Alaska' },
        { abbr: 'AZ', name: 'Arizona' },
        { abbr: 'AR', name: 'Arkansas' },
        { abbr: 'CA', name: 'California' },
        { abbr: 'CO', name: 'Colorado' },
        { abbr: 'CT', name: 'Connecticut' },
        { abbr: 'DE', name: 'Delaware' },
        { abbr: 'FL', name: 'Florida' },
        { abbr: 'GA', name: 'Georgia' },
        { abbr: 'HI', name: 'Hawaii' },
        { abbr: 'ID', name: 'Idaho' },
        { abbr: 'IL', name: 'Illinois' },
        { abbr: 'IN', name: 'Indiana' },
        { abbr: 'IA', name: 'Iowa' },
        { abbr: 'KS', name: 'Kansas' },
        { abbr: 'KY', name: 'Kentucky' },
        { abbr: 'LA', name: 'Louisiana' },
        { abbr: 'ME', name: 'Maine' },
        { abbr: 'MD', name: 'Maryland' },
        { abbr: 'MA', name: 'Massachusetts' },
        { abbr: 'MI', name: 'Michigan' },
        { abbr: 'MN', name: 'Minnesota' },
        { abbr: 'MS', name: 'Mississippi' },
        { abbr: 'MO', name: 'Missouri' },
        { abbr: 'MT', name: 'Montana' },
        { abbr: 'NE', name: 'Nebraska' },
        { abbr: 'NV', name: 'Nevada' },
        { abbr: 'NH', name: 'New Hampshire' },
        { abbr: 'NJ', name: 'New Jersey' },
        { abbr: 'NM', name: 'New Mexico' },
        { abbr: 'NY', name: 'New York' },
        { abbr: 'NC', name: 'North Carolina' },
        { abbr: 'ND', name: 'North Dakota' },
        { abbr: 'OH', name: 'Ohio' },
        { abbr: 'OK', name: 'Oklahoma' },
        { abbr: 'OR', name: 'Oregon' },
        { abbr: 'PA', name: 'Pennsylvania' },
        { abbr: 'RI', name: 'Rhode Island' },
        { abbr: 'SC', name: 'South Carolina' },
        { abbr: 'SD', name: 'South Dakota' },
        { abbr: 'TN', name: 'Tennessee' },
        { abbr: 'TX', name: 'Texas' },
        { abbr: 'UT', name: 'Utah' },
        { abbr: 'VT', name: 'Vermont' },
        { abbr: 'VA', name: 'Virginia' },
        { abbr: 'WA', name: 'Washington' },
        { abbr: 'WV', name: 'West Virginia' },
        { abbr: 'WI', name: 'Wisconsin' },
        { abbr: 'WY', name: 'Wyoming' }
      ],
  form: {
  originalInvestment: 10000,
  buyPrice: 15000,
  sellPrice: 25000,
  investmentFee: 50,
  exitFee: 50,
  annualIncome: 50000,
  holdingPeriod: 'short',
  state: 'CA',
  filingStatus: 'head'
},
      results: {
        calculated: false,
        capitalGain: 0,
        federalTax: 0,
        taxType: '',
        federalMarginalRate: 0,
        federalEffectiveRate: 0,
        stateTax: 0,
        stateMarginalRate: 0,
        stateEffectiveRate: 0,
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
      desc.content = 'Use the USA Crypto Tax Calculator to estimate cryptocurrency capital gains and tax liabilities. Calculate taxes from crypto trading, staking, mining, and NFT transactions based on U.S. tax rules quickly and accurately.'
      
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
      // 使用 originalInvestment 作为成本基础
      const costBasis = (this.form.originalInvestment || 0) + (this.form.investmentFee || 0);
      const netProceeds = (this.form.sellPrice || 0) - (this.form.exitFee || 0);
      const capitalGain = netProceeds - costBasis;
      
      if (capitalGain <= 0) {
        this.results = {
          calculated: true,
          capitalGain: 0,
          federalTax: 0,
          taxType: this.form.holdingPeriod === 'short' ? 'Short-term (Ordinary Income)' : 'Long-term (Capital Gains)',
          federalMarginalRate: 0,
          federalEffectiveRate: 0,
          stateTax: 0,
          stateMarginalRate: 0,
          stateEffectiveRate: 0,
          totalTax: 0
        };
        return;
      }

      // 计算联邦税率
      const federalBrackets = this.getFederalBrackets(this.form.filingStatus);
      const totalIncome = this.form.annualIncome + capitalGain;
      
      let federalTax = 0;
      let marginalRate = 0;
      let remainingIncome = totalIncome; // 使用新变量

      // 计算联邦税（累进税率）
      for (let i = federalBrackets.length - 1; i >= 0; i--) {
        const bracket = federalBrackets[i];
        if (remainingIncome > bracket.threshold) {
        const taxableAmount = remainingIncome - bracket.threshold;
        const taxAtThisBracket = taxableAmount * (bracket.rate / 100);
        federalTax += taxAtThisBracket;
    
      if (marginalRate === 0) {
      marginalRate = bracket.rate;
        }
    
        remainingIncome = bracket.threshold; // 使用remainingIncome
      }
      }
      
      // 计算州税
      const stateBrackets = this.getStateBrackets(this.form.state, this.form.filingStatus);
      let stateTax = 0;
      let stateMarginalRate = 0;
      let stateTaxPaid = 0;
      let stateIncome = this.form.annualIncome + capitalGain;
      
      for (let i = 0; i < stateBrackets.length; i++) {
        const bracket = stateBrackets[i];
        const bracketMax = bracket.max === Infinity ? stateIncome : bracket.max;
        
        if (stateIncome > bracket.min) {
          const taxableInBracket = Math.min(stateIncome, bracketMax) - bracket.min;
          if (taxableInBracket > 0) {
            const taxAtThisBracket = taxableInBracket * (bracket.rate / 100);
            stateTax += taxAtThisBracket;
            stateTaxPaid += taxAtThisBracket;
            
            if (stateMarginalRate === 0 && stateIncome > bracket.min) {
              stateMarginalRate = bracket.rate;
            }
          }
        }
      }

      // 计算有效税率
      const federalEffectiveRate = capitalGain > 0 ? (federalTax / capitalGain * 100) : 0;
      const stateEffectiveRate = capitalGain > 0 ? (stateTax / capitalGain * 100) : 0;

      this.results = {
        calculated: true,
        capitalGain,
        federalTax,
        taxType: this.form.holdingPeriod === 'short' ? 'Short-term (Ordinary Income)' : 'Long-term (Capital Gains)',
        federalMarginalRate: marginalRate,
        federalEffectiveRate,
        stateTax,
        stateMarginalRate,
        stateEffectiveRate,
        totalTax: federalTax + stateTax
      };
    },

    getFederalBrackets(filingStatus) {
      // 2026年联邦税率（简化）
      const brackets = {
        single: [
          { threshold: 0, rate: 10 },
          { threshold: 11925, rate: 12 },
          { threshold: 48475, rate: 22 },
          { threshold: 103350, rate: 24 },
          { threshold: 197300, rate: 32 },
          { threshold: 250525, rate: 35 },
          { threshold: 626350, rate: 37 }
        ],
        married: [
          { threshold: 0, rate: 10 },
          { threshold: 23850, rate: 12 },
          { threshold: 96950, rate: 22 },
          { threshold: 206700, rate: 24 },
          { threshold: 394600, rate: 32 },
          { threshold: 501050, rate: 35 },
          { threshold: 751600, rate: 37 }
        ],
        head: [
          { threshold: 0, rate: 10 },
          { threshold: 17000, rate: 12 },
          { threshold: 64850, rate: 22 },
          { threshold: 103350, rate: 24 },
          { threshold: 197300, rate: 32 },
          { threshold: 250500, rate: 35 },
          { threshold: 626350, rate: 37 }
        ]
      };

      if (filingStatus === 'married') return brackets.married;
      if (filingStatus === 'head') return brackets.head;
      return brackets.single;
    },

    getStateBrackets(state, filingStatus) {
      // 加州税率（附件2示例）
      if (state === 'CA') {
        if (filingStatus === 'head') {
          return [
            { min: 0, max: 21527, rate: 1.0, range: '$0 - $21,527' },
            { min: 21527, max: 51000, rate: 2.0, range: '$21,528 - $51,000' },
            { min: 51000, max: 65744, rate: 4.0, range: '$51,001 - $65,744' },
            { min: 65744, max: 81364, rate: 6.0, range: '$65,745 - $81,364' },
            { min: 81364, max: 96107, rate: 8.0, range: '$81,365 - $96,107' },
            { min: 96107, max: 490493, rate: 9.3, range: '$96,108 - $490,493' },
            { min: 490493, max: 588593, rate: 10.3, range: '$490,494 - $588,593' },
            { min: 588593, max: 980987, rate: 11.3, range: '$588,593 - $980,987' },
            { min: 980987, max: Infinity, rate: 12.3, range: '$980,988 - ∞' }
          ];
        }
        // 简化其他加州税率
        return [
          { min: 0, max: 10000, rate: 1.0, range: '$0 - $10,000' },
          { min: 10000, max: Infinity, rate: 9.3, range: '$10,001 - ∞' }
        ];
      }

      // 其他州的简化税率（无州所得税的州）
      const noTaxStates = ['AK', 'FL', 'NV', 'NH', 'SD', 'TN', 'TX', 'WA', 'WY'];
      if (noTaxStates.includes(state)) {
        return [{ min: 0, max: Infinity, rate: 0, range: 'No state income tax' }];
      }

      // 默认税率
      return [
        { min: 0, max: 10000, rate: 3.0, range: '$0 - $10,000' },
        { min: 10000, max: 50000, rate: 5.0, range: '$10,001 - $50,000' },
        { min: 50000, max: Infinity, rate: 7.0, range: '$50,001 - ∞' }
      ];
    },

    getStateName(abbr) {
      const state = this.states.find(s => s.abbr === abbr);
      return state ? state.name : abbr;
    },

    getFilingStatusLabel(status) {
      const map = {
        single: 'Single',
        married: 'Married Filing Jointly',
        head: 'Head of Household'
      };
      return map[status] || status;
    },

    clearForm() {
      this.form = {
        originalInvestment: 0,
        buyPrice: 0,
        sellPrice: 0,
        investmentFee: 0,
        exitFee: 0,
        annualIncome: 0,
        holdingPeriod: 'short',
        state: 'CA',
        filingStatus: 'head'
      };
      this.calculate();
    },

    formatMoney(value) {
      if (value === undefined || value === null || isNaN(value)) return '0.00';
      return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
  mounted() {
    document.title = 'USA Crypto Tax Calculator – Calculate Cryptocurrency Capital Gains and Taxes'
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
.usa-crypto-tax-calculator {
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
  .usa-crypto-tax-calculator {
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

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 20px;
}

@media (max-width: 700px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 0;
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
.state-select {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  padding: 8px 0;
  min-width: 0;
  width: 100%;
}

.input-with-symbol input:focus,
.state-select:focus {
  outline: none;
}

.state-select {
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

.radio-row {
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 20px;
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

.result-card {
  background: white;
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d9e2ef;
}

.result-card.capital-gain {
  border-left: 6px solid #2563eb;
}

.result-card.federal-tax {
  border-left: 6px solid #16a34a;
}

.result-card.state-tax {
  border-left: 6px solid #eab308;
}

.result-card.total-tax {
  border-left: 6px solid #1f3a5f;
  background: #e8f0fe;
  font-weight: 600;
}

.result-label {
  color: #4b5f73;
  font-size: 1rem;
}

.result-value {
  font-weight: 600;
  color: #0b2b44;
  font-size: 1.3rem;
}

.tax-details {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  border: 1px solid #d9e2ef;
}

.tax-detail-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e9eef3;
}

.tax-detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  color: #4b5f73;
  font-size: 0.95rem;
}

.detail-value {
  font-weight: 500;
  color: #0b2b44;
}

.brackets-section {
  margin-top: 24px;
}

.brackets-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1e3a5f;
}

.brackets-table {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.bracket-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid #e9eef3;
}

.bracket-row:last-child {
  border-bottom: none;
}

.bracket-range {
  color: #2c405c;
  font-size: 0.95rem;
}

.bracket-rate {
  font-weight: 600;
  color: #0b2b44;
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

.faq-item a {
  color: #1f4a7a;
  text-decoration: underline;
}

.faq-item a:hover {
  color: #0b2b44;
}

.faq-item ul,
.faq-item ol {
  margin: 8px 0;
  padding-left: 24px;
}

.faq-item li {
  margin-bottom: 4px;
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

  .faq-item p,
  .faq-item li {
    font-size: 0.9rem;
  }
}
</style>
