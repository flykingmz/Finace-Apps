<template>
  <div class="calculator-container">
    <h2>Income Tax Calculator</h2>
    <p>Calculate your income tax based on tax brackets.</p>
    
    <div class="calculator-form">
      <div class="form-group">
        <label for="income">Annual Income:</label>
        <input type="number" id="income" v-model="income" placeholder="Enter annual income" />
      </div>
      
      <div class="form-group">
        <label for="filingStatus">Filing Status:</label>
        <select id="filingStatus" v-model="filingStatus">
          <option value="single">Single</option>
          <option value="married">Married Filing Jointly</option>
          <option value="separate">Married Filing Separately</option>
          <option value="head">Head of Household</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="state">State:</label>
        <select id="state" v-model="selectedState">
          <option value="none">No State Tax</option>
          <option v-for="state in states" :key="state.code" :value="state.code">
            {{ state.name }}
          </option>
        </select>
      </div>
      
      <div class="results">
        <div class="result-item">
          <span>Federal Tax:</span>
          <span class="result-value">${{ federalTax.toLocaleString() }}</span>
        </div>
        <div class="result-item">
          <span>State Tax:</span>
          <span class="result-value">${{ stateTax.toLocaleString() }}</span>
        </div>
        <div class="result-item total">
          <span>Total Tax:</span>
          <span class="result-value">${{ totalTax.toLocaleString() }}</span>
        </div>
        <div class="result-item">
          <span>Effective Tax Rate:</span>
          <span class="result-value">{{ effectiveTaxRate.toFixed(2) }}%</span>
        </div>
        <div class="result-item">
          <span>Net Income:</span>
          <span class="result-value">${{ netIncome.toLocaleString() }}</span>
        </div>
      </div>
      
      <button @click="calculate">Calculate Tax</button>
    </div>
  </div>
</template>

<script>
const taxBrackets = {
  single: [
    { min: 0, max: 11000, rate: 0.10 },
    { min: 11001, max: 44725, rate: 0.12 },
    { min: 44726, max: 95375, rate: 0.22 },
    { min: 95376, max: 182100, rate: 0.24 },
    { min: 182101, max: 231250, rate: 0.32 },
    { min: 231251, max: 578125, rate: 0.35 },
    { min: 578126, max: Infinity, rate: 0.37 }
  ],
  married: [
    { min: 0, max: 22000, rate: 0.10 },
    { min: 22001, max: 89450, rate: 0.12 },
    { min: 89451, max: 190750, rate: 0.22 },
    { min: 190751, max: 364200, rate: 0.24 },
    { min: 364201, max: 462500, rate: 0.32 },
    { min: 462501, max: 693750, rate: 0.35 },
    { min: 693751, max: Infinity, rate: 0.37 }
  ]
}

const states = [
  { code: 'CA', name: 'California', rate: 0.093 },
  { code: 'NY', name: 'New York', rate: 0.0882 },
  { code: 'TX', name: 'Texas', rate: 0.00 },
  { code: 'FL', name: 'Florida', rate: 0.00 },
  { code: 'IL', name: 'Illinois', rate: 0.0495 }
]

const stateTaxRates = {
  'CA': 0.093,
  'NY': 0.0882,
  'TX': 0.00,
  'FL': 0.00,
  'IL': 0.0495
}

export default {
  name: 'IncomeTaxCalculator',
  data() {
    return {
      income: 75000,
      filingStatus: 'single',
      selectedState: 'none',
      states: states
    }
  },
  computed: {
    federalTax() {
      const brackets = taxBrackets[this.filingStatus] || taxBrackets.single
      let tax = 0
      let remainingIncome = this.income
      
      for (const bracket of brackets) {
        if (remainingIncome <= 0) break
        
        const taxableInBracket = Math.min(
          bracket.max === Infinity ? remainingIncome : bracket.max - bracket.min + 1,
          remainingIncome
        )
        
        if (taxableInBracket > 0) {
          tax += taxableInBracket * bracket.rate
          remainingIncome -= taxableInBracket
        }
      }
      
      return Math.round(tax)
    },
    stateTax() {
      if (this.selectedState === 'none') return 0
      const rate = stateTaxRates[this.selectedState] || 0
      return Math.round(this.income * rate)
    },
    totalTax() {
      return this.federalTax + this.stateTax
    },
    effectiveTaxRate() {
      return this.income > 0 ? (this.totalTax / this.income) * 100 : 0
    },
    netIncome() {
      return this.income - this.totalTax
    }
  },
  methods: {
    calculate() {
      // Calculation is handled by computed properties
      console.log('Tax calculated:', {
        income: this.income,
        federal: this.federalTax,
        state: this.stateTax,
        total: this.totalTax
      })
    }
  }
}
</script>

<style scoped>
.calculator-form {
  max-width: 500px;
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
}

.results {
  background-color: #f8fafc;
  border-radius: 8px;
  padding: 20px;
  margin: 30px 0;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e5e7eb;
}

.result-item.total {
  border-top: 2px solid #667eea;
  border-bottom: 2px solid #667eea;
  margin: 10px 0;
  padding: 15px 0;
  font-size: 18px;
}

.result-item:last-child {
  border-bottom: none;
}

.result-value {
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
}

.result-item.total .result-value {
  font-size: 22px;
  color: #667eea;
}

button {
  background-color: #667eea;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #5a67d8;
}
</style>