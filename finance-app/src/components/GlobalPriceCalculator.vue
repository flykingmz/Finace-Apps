<template>
  <div class="global-price-calculator">
    <!-- Google Ad Placeholder -->
    <div class="ad-placeholder">
      <div class="ad-label">Advertisement</div>
      <div class="ad-content">Google Ad Space (728x90)</div>
    </div>

    <!-- Page Title -->
    <div class="page-title-container">
      <h1 class="page-title">Global Price Calculator</h1>
      <p class="page-subtitle">Calculate the final price including taxes and platform fees for any country</p>
    </div>

    <!-- Main Calculator Section -->
    <div class="calculator-container">
      <!-- Left Side: Input Form -->
      <div class="input-section">
        <div class="form-card">
          <h2 class="section-title">Enter Details</h2>
          
          <!-- Product Price -->
          <div class="form-group">
            <label for="productPrice">Product Price</label>
            <div class="input-with-currency">
              <input
                id="productPrice"
                type="number"
                v-model="productPrice"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              <div class="currency-selector">
                <select v-model="inputCurrency">
                  <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
                    {{ currency.code }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Country Selection -->
          <div class="form-group">
            <label for="country">Country</label>
            <div class="searchable-select">
              <input
                id="country"
                type="text"
                v-model="countrySearch"
                placeholder="Search or select country..."
                @focus="showDropdown = true"
                @blur="handleBlur"
              />
              <div v-if="showDropdown" class="country-dropdown">
                <div
                  v-for="region in filteredRegions"
                  :key="region.name"
                  class="region-group"
                >
                  <div class="region-name">{{ region.name }}</div>
                  <div
                    v-for="country in region.countries"
                    :key="country.country"
                    class="country-option"
                    @mousedown="selectCountry(country)"
                  >
                    <span class="country-flag">📍</span>
                    <span class="country-name">{{ country.country }}</span>
                    <span class="tax-rate">{{ formatTaxRate(country.rate) }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="selectedCountry" class="selected-country">
              <div class="selected-info">
                <span class="flag">📍</span>
                <span class="name">{{ selectedCountry.country }}</span>
                <span class="tax">Tax Rate: {{ formatTaxRate(selectedCountry.rate) }}</span>
              </div>
            </div>
          </div>

          <!-- Platform Tax Rate Slider -->
          <div class="form-group">
            <label>Platform Tax Rate: {{ platformTaxRate }}%</label>
            <div class="slider-container">
              <input
                type="range"
                v-model="platformTaxRate"
                min="0"
                max="30"
                step="0.5"
                class="slider"
                @input="updateSliderValue"
              />
              <div class="slider-labels">
                <span>0%</span>
                <span>15%</span>
                <span>30%</span>
              </div>
            </div>
          </div>

          <!-- Calculation Currency -->
          <div class="form-group">
            <label for="calculationCurrency">Calculation Currency</label>
            <div class="currency-buttons">
              <button
                v-for="currency in currencies"
                :key="currency.code"
                :class="['currency-btn', calculationCurrency === currency.code ? 'active' : '']"
                @click="calculationCurrency = currency.code"
              >
                {{ currency.code }}
              </button>
            </div>
          </div>

          <!-- Quick Scenarios -->
          <div class="form-group">
            <label>Quick Scenarios</label>
            <div class="scenario-buttons">
              <button
                v-for="scenario in quickScenarios"
                :key="scenario.country"
                class="scenario-btn"
                @click="applyScenario(scenario)"
              >
                <span class="scenario-flag">{{ scenario.flag }}</span>
                <span class="scenario-name">{{ scenario.country }}</span>
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <button class="calculate-btn" @click="calculate">
              <span class="btn-icon">💰</span>
              Calculate Price
            </button>
            <button class="reset-btn" @click="reset">
              <span class="btn-icon">🔄</span>
              Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Right Side: Results -->
      <div class="result-section">
        <div class="result-card">
          <h2 class="section-title">Results</h2>
          
          <div v-if="calculated" class="results-content">
            <!-- Summary Results -->
            <div class="results-summary">
              <div class="result-item">
                <span class="label">Country</span>
                <span class="value">{{ selectedCountry.country }}</span>
              </div>
              <div class="result-item">
                <span class="label">Product Price</span>
                <span class="value">{{ formatCurrency(originalPrice, calculationCurrency) }}</span>
              </div>
              <div class="result-item">
                <span class="label">Tax Amount</span>
                <span class="value highlight">{{ formatCurrency(taxAmount, calculationCurrency) }}</span>
              </div>
              <div class="result-item">
                <span class="label">Price with Tax</span>
                <span class="value">{{ formatCurrency(priceWithTax, calculationCurrency) }}</span>
              </div>
              <div class="result-item">
                <span class="label">Platform Fee</span>
                <span class="value highlight">{{ formatCurrency(platformFee, calculationCurrency) }}</span>
              </div>
              <div class="result-item total">
                <span class="label">Final Price (Received)</span>
                <span class="value total-amount">{{ formatCurrency(finalPrice, calculationCurrency) }}</span>
              </div>
            </div>

            <!-- Price Composition Chart -->
            <div class="composition-section">
              <h3 class="composition-title">Price Composition</h3>
              <div class="composition-chart">
                <div
                  v-for="segment in priceSegments"
                  :key="segment.name"
                  :class="['chart-segment', segment.class]"
                  :style="{ width: segment.percentage + '%' }"
                  :title="`${segment.name}: ${segment.percentage.toFixed(1)}%`"
                >
                  <span class="segment-label">{{ segment.percentage.toFixed(1) }}%</span>
                </div>
              </div>
              <div class="composition-labels">
                <div v-for="segment in priceSegments" :key="segment.name" class="composition-item">
                  <div class="color-box" :style="{ backgroundColor: getSegmentColor(segment.name) }"></div>
                  <span class="item-label">{{ segment.name }}: {{ segment.percentage.toFixed(1) }}%</span>
                  <span class="item-value">{{ formatCurrency(segment.value, calculationCurrency) }}</span>
                </div>
              </div>
            </div>

            <!-- Output Summary -->
            <div class="output-summary">
              <div class="output-item">
                <div class="output-label">
                  <span class="icon">🧾</span>
                  Price with Tax
                </div>
                <div class="output-value">{{ formatCurrency(priceWithTax, calculationCurrency) }}</div>
              </div>
              <div class="output-item">
                <div class="output-label">
                  <span class="icon">💼</span>
                  Platform Fee
                </div>
                <div class="output-value">{{ formatCurrency(platformFee, calculationCurrency) }}</div>
              </div>
              <div class="output-item highlight">
                <div class="output-label">
                  <span class="icon">💰</span>
                  Final Price (Received)
                </div>
                <div class="output-value">{{ formatCurrency(finalPrice, calculationCurrency) }}</div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="empty-state">
            <div class="empty-icon">📊</div>
            <h3>No Calculation Yet</h3>
            <p>Enter the product details and click "Calculate Price" to see the results.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>About This Tool</h4>
          <p>This calculator helps you estimate the final price of products including country-specific taxes and platform fees.</p>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#" @click.prevent="goToPaycheck">Paycheck Calculator</a></li>
            <li><a href="#" @click.prevent="goToTax">Income Tax Calculator</a></li>
            <li><a href="#">Currency Converter</a></li>
            <li><a href="#">VAT Calculator</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Data Statement</h4>
          <p>Tax rates are based on the latest available data and may vary by region within each country.</p>
          <p>This tool provides estimates only.</p>
        </div>
        <div class="footer-section">
          <h4>Contact & Feedback</h4>
          <p>Have questions or suggestions?</p>
          <button class="feedback-btn" @click="sendFeedback">
            <span class="btn-icon">📧</span>
            Send Feedback
          </button>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 Finance Apps - Global Price Calculator. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
const taxData = {
  "Europe": [
    {"country": "Austria", "chineseName": "奥地利", "rate": "20"},
    {"country": "Belgium", "chineseName": "比利时", "rate": "21"},
    {"country": "Bulgaria", "chineseName": "保加利亚", "rate": "20"},
    {"country": "Croatia", "chineseName": "克罗地亚", "rate": "25"},
    {"country": "Czech Republic", "chineseName": "捷克", "rate": "21"},
    {"country": "Denmark", "chineseName": "丹麦", "rate": "25"},
    {"country": "France", "chineseName": "法国", "rate": "20"},
    {"country": "Germany", "chineseName": "德国", "rate": "19"},
    {"country": "Hungary", "chineseName": "匈牙利", "rate": "27"},
    {"country": "Ireland", "chineseName": "爱尔兰", "rate": "23"},
    {"country": "Italy", "chineseName": "意大利", "rate": "22"},
    {"country": "Netherlands", "chineseName": "荷兰", "rate": "21"},
    {"country": "Norway", "chineseName": "挪威", "rate": "25"},
    {"country": "Spain", "chineseName": "西班牙", "rate": "21"},
    {"country": "Sweden", "chineseName": "瑞典", "rate": "25"},
    {"country": "United Kingdom", "chineseName": "英国", "rate": "20"}
  ],
  "Asia": [
    {"country": "China", "chineseName": "中国", "rate": "13"},
    {"country": "India", "chineseName": "印度", "rate": "18"},
    {"country": "Indonesia", "chineseName": "印度尼西亚", "rate": "10"},
    {"country": "Japan", "chineseName": "日本", "rate": "10"},
    {"country": "Singapore", "chineseName": "新加坡", "rate": "7"},
    {"country": "Thailand", "chineseName": "泰国", "rate": "7"}
  ],
  "AfricaAndMiddleEast": [
    {"country": "South Africa", "chineseName": "南非", "rate": "15"},
    {"country": "Kenya", "chineseName": "肯尼亚", "rate": "16"},
    {"country": "Nigeria", "chineseName": "尼日利亚", "rate": "7.5"},
    {"country": "Saudi Arabia", "chineseName": "沙特", "rate": "15"},
    {"country": "United Arab Emirates", "chineseName": "阿联酋", "rate": "5"}
  ],
  "Americas": [
    {"country": "Canada", "chineseName": "加拿大", "rate": "13"},
    {"country": "Mexico", "chineseName": "墨西哥", "rate": "16"},
    {"country": "United States", "chineseName": "美国", "rate": "8"},
    {"country": "Panama", "chineseName": "巴拿马", "rate": "7"}
  ],
  "ZeroRateOrOther": [
    {"country": "Hong Kong", "chineseName": "香港", "rate": "0"},
    {"country": "Kuwait", "chineseName": "科威特", "rate": "0"},
    {"country": "Qatar", "chineseName": "卡塔尔", "rate": "0"},
    {"country": "Brunei", "chineseName": "文莱", "rate": "0"},
    {"country": "Bhutan", "chineseName": "不丹", "rate": "0"}
  ]
}

const exchangeRates = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 148.5,
  CNY: 7.2
}

const quickScenarios = [
  { country: "United States", flag: "🇺🇸", taxRate: 8, currency: "USD" },
  { country: "China", flag: "🇨🇳", taxRate: 13, currency: "CNY" },
  { country: "United Kingdom", flag: "🇬🇧", taxRate: 20, currency: "GBP" },
  { country: "Japan", flag: "🇯🇵", taxRate: 10, currency: "JPY" }
]

export default {
  name: 'GlobalPriceCalculator',
  data() {
    return {
      // Input data
      productPrice: 100,
      inputCurrency: 'USD',
      selectedCountry: null,
      countrySearch: '',
      showDropdown: false,
      platformTaxRate: 15,
      calculationCurrency: 'USD',
      
      // Results
      calculated: false,
      originalPrice: 0,
      taxAmount: 0,
      priceWithTax: 0,
      platformFee: 0,
      finalPrice: 0,
      priceSegments: [],
      
      // Static data
      currencies: [
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'EUR', name: 'Euro', symbol: '€' },
        { code: 'GBP', name: 'British Pound', symbol: '£' },
        { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
        { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' }
      ],
      quickScenarios: quickScenarios
    }
  },
  computed: {
    // Flatten tax data for search
    allCountries() {
      const countries = []
      for (const region in taxData) {
        taxData[region].forEach(country => {
          countries.push({
            ...country,
            region: region
          })
        })
      }
      return countries
    },
    
    // Grouped regions for dropdown
    groupedRegions() {
      const regions = []
      for (const regionName in taxData) {
        regions.push({
          name: regionName,
          countries: taxData[regionName]
        })
      }
      return regions
    },
    
    // Filtered regions based on search
    filteredRegions() {
      if (!this.countrySearch.trim()) {
        return this.groupedRegions
      }
      
      const searchTerm = this.countrySearch.toLowerCase()
      return this.groupedRegions
        .map(region => ({
          name: region.name,
          countries: region.countries.filter(country => 
            country.country.toLowerCase().includes(searchTerm) ||
            country.chineseName.toLowerCase().includes(searchTerm)
          )
        }))
        .filter(region => region.countries.length > 0)
    }
  },
  mounted() {
    console.log('GlobalPriceCalculator mounted with route:', this.$route.path)
    // 设置默认国家
    this.selectedCountry = taxData.Europe[6] // Germany
    this.countrySearch = this.selectedCountry.country
    
    // 计算初始值
    this.calculate()
    
    // 监听路由变化
    window.addEventListener('route-navigated', this.handleRouteNavigation)
  },
  beforeUnmount() {
    window.removeEventListener('route-navigated', this.handleRouteNavigation)
  },
  methods: {
    // 处理路由导航
    handleRouteNavigation(event) {
      console.log('Route navigation detected:', event.detail)
      if (this.$route.path === '/dashboard/global-price') {
        console.log('GlobalPriceCalculator should refresh')
        // 可以在这里添加刷新逻辑
        this.$forceUpdate()
      }
    },
    
    // Format currency
    formatCurrency(amount, currencyCode) {
      const currency = this.currencies.find(c => c.code === currencyCode)
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
      
      // Apply exchange rate if needed
      let convertedAmount = amount
      if (currencyCode !== this.inputCurrency) {
        const fromRate = exchangeRates[this.inputCurrency] || 1
        const toRate = exchangeRates[currencyCode] || 1
        convertedAmount = (amount / fromRate) * toRate
      }
      
      return formatter.format(convertedAmount)
    },
    
    // Format tax rate
    formatTaxRate(rate) {
      if (typeof rate === 'string' && rate.includes('/')) {
        return rate.split('/')[0] + '%'
      }
      return rate + '%'
    },
    
    // Extract numeric tax rate
    extractTaxRate(rateString) {
      if (typeof rateString === 'number') return rateString
      
      const match = rateString.toString().match(/(\d+(\.\d+)?)/)
      return match ? parseFloat(match[1]) : 0
    },
    
    // Select country from dropdown
    selectCountry(country) {
      this.selectedCountry = country
      this.countrySearch = country.country
      this.showDropdown = false
    },
    
    // Handle blur for dropdown
    handleBlur() {
      setTimeout(() => {
        this.showDropdown = false
      }, 200)
    },
    
    // Update slider value display
    updateSliderValue() {
      // Already bound via v-model
    },
    
    // Apply quick scenario
    applyScenario(scenario) {
      const country = this.allCountries.find(c => c.country === scenario.country)
      if (country) {
        this.selectedCountry = country
        this.countrySearch = country.country
        this.productPrice = 100
        this.inputCurrency = scenario.currency
        this.calculationCurrency = scenario.currency
        
        // Parse tax rate from scenario
        const numericRate = this.extractTaxRate(country.rate)
        // Don't update platform tax rate, let user keep their preference
      }
    },
    
    // Calculate final price
    calculate() {
      // Convert to calculation currency
      const price = parseFloat(this.productPrice) || 0
      
      // Get tax rate
      const taxRate = this.extractTaxRate(this.selectedCountry.rate)
      this.taxAmount = (price * taxRate) / 100
      
      // Calculate platform fee
      this.platformFee = (price * this.platformTaxRate) / 100
      
      // Calculate totals
      this.originalPrice = price
      this.priceWithTax = price + this.taxAmount
      this.finalPrice = this.priceWithTax - this.platformFee
      
      // Prepare price segments for chart
      const total = this.priceWithTax
      this.priceSegments = [
        { 
          name: 'Original Price', 
          value: price, 
          percentage: (price / total) * 100,
          class: 'segment-original'
        },
        { 
          name: 'Tax Amount', 
          value: this.taxAmount, 
          percentage: (this.taxAmount / total) * 100,
          class: 'segment-tax'
        },
        { 
          name: 'Platform Fee', 
          value: this.platformFee, 
          percentage: (this.platformFee / total) * 100,
          class: 'segment-fee'
        }
      ].filter(segment => segment.value > 0)
      
      this.calculated = true
    },
    
    // Get segment color
    getSegmentColor(segmentName) {
      const colors = {
        'Original Price': '#4CAF50',
        'Tax Amount': '#F44336',
        'Platform Fee': '#FF9800'
      }
      return colors[segmentName] || '#607D8B'
    },
    
    // Reset form
    reset() {
      this.productPrice = 100
      this.inputCurrency = 'USD'
      this.selectedCountry = taxData.Europe[6] // Germany
      this.countrySearch = this.selectedCountry.country
      this.platformTaxRate = 15
      this.calculationCurrency = 'USD'
      this.calculated = false
    },
    
    // Navigation methods
    goToPaycheck() {
      this.$router.push('/dashboard/paycheck')
    },
    
    goToTax() {
      this.$router.push('/dashboard/income-tax')
    },
    
    // Feedback method
    sendFeedback() {
      alert('Thank you for your feedback! This feature would typically open a contact form or email client.')
    }
  }
}
</script>

<style scoped>
.global-price-calculator {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Ad Placeholder */
.ad-placeholder {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border: 2px dashed #c3cfe2;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin-bottom: 30px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.ad-label {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.ad-content {
  font-size: 18px;
  color: #999;
  font-weight: 500;
}

/* Page Title */
.page-title-container {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px 0;
  border-bottom: 1px solid #1013d5;
}

.page-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
}

/* Calculator Container */
.calculator-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 50px;
  min-height: 600px;
}

@media (max-width: 1024px) {
  .calculator-container {
    grid-template-columns: 1fr;
  }
}

/* Form Cards */
.form-card,
.result-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #eaeaea;
  height: 100%;
}

.section-title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
}

/* Form Groups */
.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: #34495e;
  font-size: 1rem;
}

/* Input with Currency */
.input-with-currency {
  display: flex;
  gap: 10px;
}

.input-with-currency input {
  flex: 1;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.input-with-currency input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.currency-selector select {
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  background: white;
  font-size: 1.1rem;
  min-width: 100px;
  cursor: pointer;
}

/* Searchable Country Select */
.searchable-select {
  position: relative;
}

.searchable-select input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.searchable-select input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.country-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  margin-top: 5px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.region-group {
  padding: 10px 0;
}

.region-name {
  padding: 10px 16px;
  font-weight: 600;
  color: #7f8c8d;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #f8f9fa;
}

.country-option {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-left: 3px solid transparent;
}

.country-option:hover {
  background-color: #f8f9fa;
  border-left-color: #3498db;
}

.country-flag {
  margin-right: 12px;
  font-size: 1.2rem;
}

.country-name {
  flex: 1;
  font-weight: 500;
}

.tax-rate {
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.selected-country {
  margin-top: 15px;
  padding: 15px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 10px;
  border: 1px solid #dee2e6;
}

.selected-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.selected-info .flag {
  font-size: 1.5rem;
}

.selected-info .name {
  font-weight: 600;
  font-size: 1.1rem;
  color: #2c3e50;
}

.selected-info .tax {
  margin-left: auto;
  background: #4CAF50;
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

/* Slider */
.slider-container {
  padding: 10px 0;
}

.slider {
  width: 100%;
  height: 10px;
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(to right, #4CAF50, #FF9800, #F44336);
  outline: none;
  border-radius: 5px;
  margin: 15px 0;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  border: 3px solid #3498db;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-top: 5px;
}

/* Currency Buttons */
.currency-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.currency-btn {
  padding: 12px 20px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 70px;
}

.currency-btn:hover {
  border-color: #3498db;
  background: #f8f9fa;
}

.currency-btn.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

/* Scenario Buttons */
.scenario-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.scenario-btn {
  padding: 15px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.scenario-btn:hover {
  border-color: #9b59b6;
  background: #f8f9fa;
  transform: translateY(-2px);
}

.scenario-flag {
  font-size: 1.2rem;
}

.scenario-name {
  font-weight: 600;
  font-size: 0.9rem;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 15px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.calculate-btn,
.reset-btn {
  flex: 1;
  padding: 16px 24px;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.calculate-btn {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
}

.calculate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

.reset-btn {
  background: #f5f5f5;
  color: #666;
  border: 2px solid #e0e0e0;
}

.reset-btn:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 1.2rem;
}

/* Results Section */
.results-content {
  height: 100%;
}

/* Results Summary */
.results-summary {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eaeaea;
}

.result-item:last-child {
  border-bottom: none;
}

.result-item.total {
  border-top: 2px solid #3498db;
  margin-top: 10px;
  padding-top: 20px;
}

.result-item .label {
  font-weight: 500;
  color: #7f8c8d;
}

.result-item .value {
  font-weight: 600;
  font-size: 1.1rem;
  color: #2c3e50;
}

.result-item .value.highlight {
  color: #e74c3c;
  font-weight: 700;
}

.result-item .value.total-amount {
  font-size: 1.5rem;
  color: #2c3e50;
}

/* Composition Chart */
.composition-section {
  margin: 30px 0;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #eaeaea;
}

.composition-title {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.composition-chart {
  display: flex;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chart-segment {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
}

.chart-segment:hover {
  transform: scale(1.05);
  z-index: 1;
}

.segment-original {
  background: linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%);
}

.segment-tax {
  background: linear-gradient(135deg, #F44336 0%, #EF5350 100%);
}

.segment-fee {
  background: linear-gradient(135deg, #FF9800 0%, #FFB74D 100%);
}

.segment-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.composition-labels {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.composition-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
}

.color-box {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.item-label {
  flex: 1;
  font-weight: 500;
  color: #2c3e50;
}

.item-value {
  font-weight: 600;
  color: #34495e;
}

/* Output Summary */
.output-summary {
  margin-top: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
}

.output-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.output-item:last-child {
  border-bottom: none;
}

.output-item.highlight {
  border-top: 2px solid white;
  padding-top: 20px;
  margin-top: 10px;
}

.output-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  font-size: 1.1rem;
}

.output-label .icon {
  font-size: 1.3rem;
}

.output-value {
  font-size: 1.3rem;
  font-weight: 700;
}

.output-item.highlight .output-value {
  font-size: 1.5rem;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  text-align: center;
  color: #7f8c8d;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 10px;
}

.empty-state p {
  max-width: 400px;
  line-height: 1.6;
}

/* Footer */
.footer {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #eaeaea;
  background: #0a59a8;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  padding: 0 40px 40px;
}

.footer-section h4 {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-weight: 600;
}

.footer-section p {
  color: #eaeaea;
  line-height: 1.6;
  margin-bottom: 10px;
  font-size: 0.95rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section ul li a {
  color: #3498db;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 0.95rem;
}

.footer-section ul li a:hover {
  color: #2980b9;
  text-decoration: underline;
}

.feedback-btn {
  margin-top: 10px;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.feedback-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

.footer-bottom {
  text-align: center;
  padding: 20px;
  background: #2c3e50;
  color: white;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .global-price-calculator {
    padding: 0 15px;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .calculator-container {
    gap: 20px;
  }
  
  .form-card,
  .result-card {
    padding: 20px;
  }
  
  .currency-buttons,
  .scenario-buttons {
    flex-direction: column;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    padding: 0 20px 30px;
  }
}
</style>