<template>
  <div class="calculator-container">
    <h2>Paycheck Calculator</h2>
    <p>Calculate your net pay after taxes and deductions.</p>
    
    <div class="calculator-form">
      <div class="form-group">
        <label for="grossSalary">Gross Salary:</label>
        <input type="number" id="grossSalary" v-model="grossSalary" placeholder="Enter gross salary" />
      </div>
      
      <div class="form-group">
        <label for="payPeriod">Pay Period:</label>
        <select id="payPeriod" v-model="payPeriod">
          <option value="weekly">Weekly</option>
          <option value="biweekly">Bi-weekly</option>
          <option value="monthly">Monthly</option>
          <option value="annually">Annually</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="taxRate">Tax Rate (%):</label>
        <input type="number" id="taxRate" v-model="taxRate" min="0" max="100" step="0.1" />
      </div>
      
      <div class="form-group">
        <label for="deductions">Other Deductions:</label>
        <input type="number" id="deductions" v-model="deductions" placeholder="Enter additional deductions" />
      </div>
      
      <div class="results">
        <div class="result-item">
          <span>Net Pay:</span>
          <span class="result-value">${{ netPay.toLocaleString() }}</span>
        </div>
        <div class="result-item">
          <span>Tax Amount:</span>
          <span class="result-value">${{ taxAmount.toLocaleString() }}</span>
        </div>
        <div class="result-item">
          <span>Total Deductions:</span>
          <span class="result-value">${{ totalDeductions.toLocaleString() }}</span>
        </div>
      </div>
      
      <button @click="calculate">Calculate Paycheck</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaycheckCalculator',
  data() {
    return {
      grossSalary: 50000,
      payPeriod: 'annually',
      taxRate: 22,
      deductions: 1000
    }
  },
  computed: {
    taxAmount() {
      return (this.grossSalary * (this.taxRate / 100))
    },
    totalDeductions() {
      return this.taxAmount + parseFloat(this.deductions || 0)
    },
    netPay() {
      return this.grossSalary - this.totalDeductions
    }
  },
  methods: {
    calculate() {
      // Calculation is handled by computed properties
      console.log('Paycheck calculated:', {
        gross: this.grossSalary,
        net: this.netPay,
        tax: this.taxAmount
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

.result-item:last-child {
  border-bottom: none;
}

.result-value {
  font-size: 20px;
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