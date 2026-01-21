<template>
  <div class="calculator-container">
    <h2>Global Price Calculator</h2>
    <p>This calculator helps you compare prices across different countries and currencies.</p>
    
    <div class="calculator-form">
      <div class="form-group">
        <label for="basePrice">Base Price (USD):</label>
        <input type="number" id="basePrice" v-model="basePrice" placeholder="Enter price in USD" />
      </div>
      
      <div class="form-group">
        <label for="country">Target Country:</label>
        <select id="country" v-model="selectedCountry">
          <option v-for="country in countries" :key="country.code" :value="country.code">
            {{ country.name }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Converted Price:</label>
        <div class="result">{{ convertedPrice }} {{ selectedCurrency }}</div>
      </div>
      
      <button @click="calculate">Calculate</button>
    </div>
  </div>
</template>

<script>
const exchangeRates = {
  'EUR': 0.92,
  'GBP': 0.79,
  'JPY': 148.5,
  'CAD': 1.36,
  'AUD': 1.52
}

const countries = [
  { code: 'EUR', name: 'Eurozone', currency: 'EUR' },
  { code: 'GBP', name: 'United Kingdom', currency: 'GBP' },
  { code: 'JPY', name: 'Japan', currency: 'JPY' },
  { code: 'CAD', name: 'Canada', currency: 'CAD' },
  { code: 'AUD', name: 'Australia', currency: 'AUD' }
]

export default {
  name: 'GlobalPriceCalculator',
  data() {
    return {
      basePrice: 100,
      selectedCountry: 'EUR',
      countries: countries,
      exchangeRates: exchangeRates
    }
  },
  computed: {
    selectedCurrency() {
      const country = this.countries.find(c => c.code === this.selectedCountry)
      return country ? country.currency : 'USD'
    },
    convertedPrice() {
      const rate = this.exchangeRates[this.selectedCurrency] || 1
      return (this.basePrice * rate).toFixed(2)
    }
  },
  methods: {
    calculate() {
      // Calculation is handled by computed property
      console.log('Price calculated:', this.convertedPrice)
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

.form-group select {
  appearance: none;
  background-color: white;
}

.result {
  padding: 10px;
  background-color: #f3f4f6;
  border-radius: 6px;
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
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