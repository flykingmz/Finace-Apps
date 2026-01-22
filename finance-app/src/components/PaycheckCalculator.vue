<template>
  <div class="paycheck-calculator">
    <!-- Google Ad Placeholder -->
    <div class="ad-placeholder">
      <div class="ad-label">Advertisement</div>
      <div class="ad-content">Google Ad Space (728x90)</div>
    </div>

    <!-- Page Title -->
    <div class="page-title-container">
      <h1 class="page-title">Paycheck Calculator</h1>
      <p class="page-subtitle">Calculate net pay, taxes, and deductions for both salaried and hourly employees</p>
    </div>

    <!-- Main Content -->
    <div class="main-content-container">
      <!-- Input Section -->
      <div v-if="!showResults" class="input-section">
        <div class="form-container">
          <!-- State Selection -->
          <div class="form-section">
            <h3 class="section-title">Select your state</h3>
            <div class="form-group">
              <select v-model="selectedState" class="state-select">
                <option v-for="state in states" :key="state.code" :value="state">
                  {{ state.state }}
                </option>
              </select>
              <div class="state-info" v-if="selectedState">
                <span :class="['tax-type', selectedState.type]">
                  {{ getTaxTypeLabel(selectedState.type) }}
                </span>
                <span class="tax-rate">
                  Rate: {{ formatRate(selectedState) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Employee Information -->
          <div class="form-section">
            <h3 class="section-title">Employee Information</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Employee Name *</label>
                <input type="text" v-model="employeeName" placeholder="Enter employee name" />
              </div>
              <div class="form-group">
                <label>Employee Type *</label>
                <select v-model="employeeType">
                  <option value="exempted">Exempted</option>
                  <option value="non-exempted">Non Exempted</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Wages Information -->
          <div class="form-section">
            <h3 class="section-title">Wages (USD)</h3>
            <div class="wages-form">
              <div class="wage-type-toggle">
                <button 
                  :class="['wage-btn', wageType === 'hourly' ? 'active' : '']"
                  @click="wageType = 'hourly'"
                >
                  Hourly
                </button>
                <button 
                  :class="['wage-btn', wageType === 'salary' ? 'active' : '']"
                  @click="wageType = 'salary'"
                >
                  Salary
                </button>
              </div>
              
              <div v-if="wageType === 'hourly'" class="hourly-wages">
                <div class="form-row">
                  <div class="form-group">
                    <label>Hourly Rate *</label>
                    <div class="input-with-symbol">
                      <span class="symbol">$</span>
                      <input type="number" v-model="hourlyRate" min="0" step="0.01" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Regular Hours *</label>
                    <input type="number" v-model="regularHours" min="0" max="168" />
                  </div>
                  <div class="form-group">
                    <label>Overtime Hours</label>
                    <input type="number" v-model="overtimeHours" min="0" />
                  </div>
                </div>
              </div>
              
              <div v-else class="salary-wages">
                <div class="form-group">
                  <label>Annual Salary *</label>
                  <div class="input-with-symbol">
                    <span class="symbol">$</span>
                    <input type="number" v-model="annualSalary" min="0" step="0.01" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pay Frequency -->
          <div class="form-section">
            <h3 class="section-title">Pay Frequency</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Pay Frequency *</label>
                <select v-model="payFrequency">
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="semimonthly">Semi-monthly</option>
                  <option value="monthly">Monthly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
              <div class="form-group">
                <label>Pay Date *</label>
                <input type="date" v-model="payDate" />
              </div>
            </div>
          </div>

          <!-- Federal Tax Information -->
          <div class="form-section">
            <h3 class="section-title">Federal Tax Information</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Form W-4 Version *</label>
                <select v-model="w4Version">
                  <option value="2020">2020 or later</option>
                  <option value="2019">2019 or earlier</option>
                </select>
              </div>
              <div class="form-group">
                <label>Filing Status *</label>
                <select v-model="filingStatus">
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="married_single">Married, but withhold as Single</option>
                  <option value="head">Head of Household</option>
                </select>
              </div>
            </div>
            
            <div v-if="w4Version === '2020'" class="w4-2020-options">
              <div class="form-row">
                <div class="form-group">
                  <label>Multiple Jobs?</label>
                  <select v-model="multipleJobs">
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Dependent Amount</label>
                  <input type="number" v-model="dependentAmount" min="0" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Other Income</label>
                  <div class="input-with-symbol">
                    <span class="symbol">$</span>
                    <input type="number" v-model="otherIncome" min="0" />
                  </div>
                </div>
                <div class="form-group">
                  <label>Deductions</label>
                  <div class="input-with-symbol">
                    <span class="symbol">$</span>
                    <input type="number" v-model="deductions" min="0" />
                  </div>
                </div>
                <div class="form-group">
                  <label>Additional Withholding</label>
                  <div class="input-with-symbol">
                    <span class="symbol">$</span>
                    <input type="number" v-model="additionalWithholding" min="0" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- State Tax Information -->
          <div class="form-section">
            <h3 class="section-title">State Tax Information</h3>
            <div class="form-row">
              <div class="form-group">
                <label>State Filing Status</label>
                <select v-model="stateFilingStatus">
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="head">Head of Household</option>
                </select>
              </div>
              <div class="form-group">
                <label>Withholding Allowances</label>
                <input type="number" v-model="withholdingAllowances" min="0" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Additional State Withholding</label>
                <div class="input-with-symbol">
                  <span class="symbol">$</span>
                  <input type="number" v-model="additionalStateWithholding" min="0" />
                </div>
              </div>
            </div>
          </div>

          <!-- Deductions Section -->
          <div class="form-section">
            <h3 class="section-title">Deductions</h3>
            <div class="deductions-table">
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Employee Contribution (USD)</th>
                    <th>Employer Contribution (USD)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(deduction, index) in deductionsList" :key="index">
                    <td>
                      <select v-model="deduction.type">
                        <option value="">Select Benefit</option>
                        <option value="401k">401(k) Retirement</option>
                        <option value="health">Health Insurance</option>
                        <option value="dental">Dental Insurance</option>
                        <option value="vision">Vision Insurance</option>
                        <option value="hsa">HSA Contribution</option>
                        <option value="fsa">FSA Contribution</option>
                        <option value="life">Life Insurance</option>
                        <option value="disability">Disability Insurance</option>
                        <option value="other">Other</option>
                      </select>
                    </td>
                    <td>
                      <input 
                        type="number" 
                        v-model="deduction.employee" 
                        min="0" 
                        placeholder="0" 
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        v-model="deduction.employer" 
                        min="0" 
                        placeholder="0" 
                      />
                    </td>
                    <td>
                      <button class="remove-btn" @click="removeDeduction(index)">×</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button class="add-deduction-btn" @click="addDeduction">
                <span class="btn-icon">+</span>
                Add Deduction
              </button>
            </div>
          </div>

          <!-- Calculate Button -->
          <div class="calculate-section">
            <button class="calculate-btn" @click="calculatePaycheck">
              CALCULATE
            </button>
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div v-else class="results-section">
        <div class="results-container">
          <!-- Results Header -->
          <div class="results-header">
            <div class="header-left">
              <h2>Here's your paycheck!</h2>
              <div class="net-pay">
                <span class="label">Net Pay</span>
                <span class="amount">{{ formatCurrency(results.netPay) }}</span>
              </div>
            </div>
            <div class="header-right">
              <button class="print-btn" @click="printResults">
                <span class="btn-icon">🖨️</span>
                Print
              </button>
              <button class="email-btn" @click="emailResults">
                <span class="btn-icon">📧</span>
                Email
              </button>
            </div>
          </div>

          <!-- Employee Info Summary -->
          <div class="employee-summary">
            <div class="summary-row">
              <div class="summary-item">
                <span class="label">Name</span>
                <span class="value">{{ employeeName || 'Not specified' }}</span>
              </div>
              <div class="summary-item">
                <span class="label">Pay Date</span>
                <span class="value">{{ formatDate(payDate) }}</span>
              </div>
              <div class="summary-item">
                <span class="label">State</span>
                <span class="value">{{ selectedState.state }}</span>
              </div>
              <div class="summary-item">
                <span class="label">Employee Type</span>
                <span class="value">{{ employeeType === 'exempted' ? 'Exempted' : 'Non Exempted' }}</span>
              </div>
            </div>
          </div>

          <!-- Main Summary -->
          <div class="main-summary">
            <h3>SUMMARY</h3>
            <div class="summary-box">
              <div class="total-gross">
                <span>Total Gross Pay:</span>
                <span class="amount">{{ formatCurrency(results.grossPay) }}</span>
              </div>
              <div class="summary-breakdown">
                <div class="breakdown-item net-pay-breakdown">
                  <div class="breakdown-label">Net Pay</div>
                  <div class="breakdown-amount">{{ formatCurrency(results.netPay) }}</div>
                  <div class="breakdown-percentage">
                    {{ calculatePercentage(results.netPay, results.grossPay) }}%
                  </div>
                </div>
                <div class="breakdown-item deductions-breakdown">
                  <div class="breakdown-label">Deductions</div>
                  <div class="breakdown-amount">{{ formatCurrency(results.totalDeductions) }}</div>
                  <div class="breakdown-percentage">
                    {{ calculatePercentage(results.totalDeductions, results.grossPay) }}%
                  </div>
                </div>
                <div class="breakdown-item taxes-breakdown">
                  <div class="breakdown-label">Taxes</div>
                  <div class="breakdown-amount">{{ formatCurrency(results.totalTaxes) }}</div>
                  <div class="breakdown-percentage">
                    {{ calculatePercentage(results.totalTaxes, results.grossPay) }}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Earnings Breakdown -->
          <div class="earnings-section">
            <h3>Earnings</h3>
            <table class="earnings-table">
              <thead>
                <tr>
                  <th>Earnings</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="wageType === 'hourly'">
                  <td>Regular Pay ({{ formatCurrency(hourlyRate) }} × {{ regularHours }} hours)</td>
                  <td>{{ formatCurrency(results.regularPay) }}</td>
                </tr>
                <tr v-if="wageType === 'hourly' && results.overtimePay > 0">
                  <td>Overtime Pay ({{ formatCurrency(hourlyRate * 1.5) }} × {{ overtimeHours }} hours)</td>
                  <td>{{ formatCurrency(results.overtimePay) }}</td>
                </tr>
                <tr v-if="wageType === 'salary'">
                  <td>Salary Pay</td>
                  <td>{{ formatCurrency(results.regularPay) }}</td>
                </tr>
                <tr class="total-row">
                  <td><strong>Gross Earnings</strong></td>
                  <td><strong>{{ formatCurrency(results.grossPay) }}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Taxes Breakdown -->
          <div class="taxes-section">
            <h3>Taxes</h3>
            <table class="taxes-table">
              <thead>
                <tr>
                  <th>Taxes</th>
                  <th>Employer Contribution</th>
                  <th>Employee Contribution</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Social Security Tax (6.2%)</td>
                  <td>{{ formatCurrency(results.socialSecurityEmployer) }}</td>
                  <td>{{ formatCurrency(results.socialSecurityEmployee) }}</td>
                </tr>
                <tr>
                  <td>Medicare Tax (1.45%)</td>
                  <td>{{ formatCurrency(results.medicareEmployer) }}</td>
                  <td>{{ formatCurrency(results.medicareEmployee) }}</td>
                </tr>
                <tr>
                  <td>Federal Income Tax</td>
                  <td>-</td>
                  <td>{{ formatCurrency(results.federalIncomeTax) }}</td>
                </tr>
                <tr v-if="selectedState.type !== 'none'">
                  <td>{{ selectedState.state }} State Income Tax</td>
                  <td>-</td>
                  <td>{{ formatCurrency(results.stateIncomeTax) }}</td>
                </tr>
                <tr v-if="selectedState.code === 'CA'">
                  <td>CA SDI (State Disability Insurance)</td>
                  <td>-</td>
                  <td>{{ formatCurrency(results.stateDisability) }}</td>
                </tr>
                <tr class="total-row">
                  <td><strong>Total Taxes</strong></td>
                  <td><strong>{{ formatCurrency(results.totalEmployerTaxes) }}</strong></td>
                  <td><strong>{{ formatCurrency(results.totalEmployeeTaxes) }}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Deductions Breakdown -->
          <div v-if="results.totalDeductions > 0" class="deductions-results">
            <h3>Deductions</h3>
            <table class="deductions-results-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Employee Contribution</th>
                  <th>Employer Contribution</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(deduction, index) in deductionsList" :key="index">
                  <td>{{ getDeductionTypeLabel(deduction.type) }}</td>
                  <td>{{ formatCurrency(deduction.employee) }}</td>
                  <td>{{ formatCurrency(deduction.employer) }}</td>
                </tr>
                <tr class="total-row">
                  <td><strong>Total Deductions</strong></td>
                  <td><strong>{{ formatCurrency(results.employeeDeductions) }}</strong></td>
                  <td><strong>{{ formatCurrency(results.employerDeductions) }}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Final Summary -->
          <div class="final-summary">
            <div class="summary-card">
              <div class="summary-item">
                <span class="label">Gross Earnings</span>
                <span class="value">{{ formatCurrency(results.grossPay) }}</span>
              </div>
              <div class="summary-item">
                <span class="label">Total Deductions</span>
                <span class="value negative">-{{ formatCurrency(results.totalDeductions) }}</span>
              </div>
              <div class="summary-item">
                <span class="label">Total Taxes</span>
                <span class="value negative">-{{ formatCurrency(results.totalTaxes) }}</span>
              </div>
              <div class="summary-item total">
                <span class="label">Net Pay</span>
                <span class="value total-amount">{{ formatCurrency(results.netPay) }}</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="results-actions">
            <button class="start-over-btn" @click="startOver">
              START OVER
            </button>
            <button class="save-btn" @click="saveResults">
              <span class="btn-icon">💾</span>
              Save Results
            </button>
          </div>

          <!-- Disclaimer -->
          <div class="results-disclaimer">
            <p>This calculation is for informational purposes only. Actual amounts may vary based on specific circumstances and regulations.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>Tool Statement</h4>
          <p>This paycheck calculator provides estimates based on current tax rates and regulations. It is designed for educational and planning purposes.</p>
        </div>
        <div class="footer-section">
          <h4>Data Statement</h4>
          <p><strong>Data Sources:</strong> IRS Publication 15-T, State Revenue Departments, SSA.gov</p>
          <p><strong>Tax Year:</strong> {{ taxData.tax_year }}</p>
          <p>Rates are updated annually based on official publications.</p>
        </div>
       <!--
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#" @click.prevent="goToGlobalPrice">Global Price Calculator</a></li>
            <li><a href="#" @click.prevent="goToIncomeTax">Income Tax Calculator</a></li>
            <li><a href="#">IRS Withholding Calculator</a></li>
            <li><a href="#">State Tax Calculators</a></li>
          </ul>
        </div>
        -->
        <div class="footer-section">
          <h4>Contact & Feedback</h4>
          <p>Need help or have suggestions for improvement?</p>
          <button class="feedback-btn" @click="sendFeedback">
            <span class="btn-icon">📧</span>
            Send Feedback
          </button>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 Finance Apps - Paycheck Calculator. This tool is for estimation purposes only and should not be used for official tax filings.</p>
      </div>
    </div>
  </div>
</template>

<script>
const taxData = {
  "country": "United States",
  "currency": "USD",
  "tax_year": "2025-2026",
  "states": [
    // ... 你提供的州数据 ...
    // 这里放置你提供的完整州数据JSON
    {
      "state": "Alaska",
      "code": "AK",
      "type": "none",
      "rate_min": 0,
      "rate_max": 0,
      "notes": "No state personal income tax"
    },
    {
      "state": "Florida",
      "code": "FL",
      "type": "none",
      "rate_min": 0,
      "rate_max": 0,
      "notes": "No state personal income tax tax"
    },
    {
      "state": "Nevada",
      "code": "NV",
      "type": "none",
      "rate_min": 0,
      "rate_max": 0,
      "notes": "No state personal income tax"
    },
    {
      "state": "South Dakota",
      "code": "SD",
      "type": "none",
      "rate_min": 0,
      "rate_max": 0,
      "notes": "No state personal income tax"
    },
    {
      "state": "Tennessee",
      "code": "TN",
      "type": "none",
      "rate_min": 0,
      "rate_max": 0,
      "notes": "No state personal income tax"
    },
    {
      "state": "Texas",
      "code": "TX",
      "type": "none",
      "rate_min": 0,
      "rate_max": 0,
      "notes": "No state personal income tax"
    },
    {
      "state": "Washington",
      "code": "WA",
      "type": "none",
      "rate_min": 0,
      "rate_max": 0,
      "notes": "No state income tax on wages (capital gains tax may apply)"
    },
    {
      "state": "Wyoming",
      "code": "WY",
      "type": "none",
      "rate_min": 0,
      "rate_max": 0,
      "notes": "No state personal income tax"
    },
    {
      "state": "California",
      "code": "CA",
      "type": "progressive",
      "rate_min": 1,
      "rate_max": 13.3,
      "notes": "Highest state income tax rate in the U.S."
    },
    {
      "state": "Hawaii",
      "code": "HI",
      "type": "progressive",
      "rate_min": 1.4,
      "rate_max": 11,
      "notes": "High progressive tax brackets"
    },
    {
      "state": "New York",
      "code": "NY",
      "type": "progressive",
      "rate_min": 4,
      "rate_max": 10.9,
      "notes": "NYC local income tax may apply"
    },
    {
      "state": "New Jersey",
      "code": "NJ",
      "type": "progressive",
      "rate_min": 1.4,
      "rate_max": 10.75,
      "notes": "High-income earners taxed at higher brackets"
    },
    {
      "state": "Oregon",
      "code": "OR",
      "type": "progressive",
      "rate_min": 4.75,
      "rate_max": 9.9,
      "notes": "No sales tax, relies on income tax"
    },
    {
      "state": "Minnesota",
      "code": "MN",
      "type": "progressive",
      "rate_min": 5.35,
      "rate_max": 9.85,
      "notes": "High progressive tax for top earners"
    },
    {
      "state": "Vermont",
      "code": "VT",
      "type": "progressive",
      "rate_min": 3.35,
      "rate_max": 8.75,
      "notes": "Multiple tax brackets"
    },
    {
      "state": "Arizona",
      "code": "AZ",
      "type": "flat",
      "rate_min": 2.5,
      "rate_max": 2.5,
      "notes": "Flat income tax rate"
    },
    {
      "state": "Colorado",
      "code": "CO",
      "type": "flat",
      "rate_min": 4.4,
      "rate_max": 4.4,
      "notes": "Flat income tax rate"
    },
    {
      "state": "Illinois",
      "code": "IL",
      "type": "flat",
      "rate_min": 4.95,
      "rate_max": 4.95,
      "notes": "Flat income tax rate"
    },
    {
      "state": "Indiana",
      "code": "IN",
      "type": "flat",
      "rate_min": 3.05,
      "rate_max": 3.05,
      "notes": "Flat income tax rate"
    },
    {
      "state": "Pennsylvania",
      "code": "PA",
      "type": "flat",
      "rate_min": 3.07,
      "rate_max": 3.07,
      "notes": "Flat income tax rate"
    },
    {
      "state": "Utah",
      "code": "UT",
      "type": "flat",
      "rate_min": 4.55,
      "rate_max": 4.55,
      "notes": "Flat income tax with credits"
    },
    {
      "state": "Delaware",
      "code": "DE",
      "type": "progressive",
      "rate_min": 2.2,
      "rate_max": 6.6,
      "notes": "Progressive brackets"
    },
    {
      "state": "Connecticut",
      "code": "CT",
      "type": "progressive",
      "rate_min": 3,
      "rate_max": 6.99,
      "notes": "Progressive brackets"
    },
    {
      "state": "Maine",
      "code": "ME",
      "type": "progressive",
      "rate_min": 5.8,
      "rate_max": 7.15,
      "notes": "Progressive brackets"
    },
    {
      "state": "Maryland",
      "code": "MD",
      "type": "progressive",
      "rate_min": 2,
      "rate_max": 5.75,
      "notes": "Local income taxes may apply"
    },
    {
      "state": "Rhode Island",
      "code": "RI",
      "type": "progressive",
      "rate_min": 3.75,
      "rate_max": 5.99,
      "notes": "Progressive brackets"
    },
    {
      "state": "Virginia",
      "code": "VA",
      "type": "progressive",
      "rate_min": 2,
      "rate_max": 5.75,
      "notes": "Low top marginal rate"
    },
    {
      "state": "Wisconsin",
      "code": "WI",
      "type": "progressive",
      "rate_min": 3.5,
      "rate_max": 7.65,
      "notes": "Progressive brackets"
    },
    {
      "state": "South Carolina",
      "code": "SC",
      "type": "progressive",
      "rate_min": 0,
      "rate_max": 6.2,
      "notes": "Low income exemptions"
    },
    {
      "state": "North Dakota",
      "code": "ND",
      "type": "progressive",
      "rate_min": 1.95,
      "rate_max": 2.5,
      "notes": "Low marginal rates"
    },
    {
      "state": "Oklahoma",
      "code": "OK",
      "type": "progressive",
      "rate_min": 0.25,
      "rate_max": 4.75,
      "notes": "Progressive brackets"
    }
  ]
}

// 联邦税率表（2025年）
const federalTaxBrackets = {
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
  ],
  head: [
    { min: 0, max: 15700, rate: 0.10 },
    { min: 15701, max: 59850, rate: 0.12 },
    { min: 59851, max: 95350, rate: 0.22 },
    { min: 95351, max: 182100, rate: 0.24 },
    { min: 182101, max: 231250, rate: 0.32 },
    { min: 231251, max: 578100, rate: 0.35 },
    { min: 578101, max: Infinity, rate: 0.37 }
  ]
}

// 州累进税率表（示例，实际应更详细）
const stateTaxBrackets = {
  CA: {
    single: [
      { min: 0, max: 10099, rate: 0.01 },
      { min: 10100, max: 23942, rate: 0.02 },
      { min: 23943, max: 37788, rate: 0.04 },
      { min: 37789, max: 52455, rate: 0.06 },
      { min: 52456, max: 66295, rate: 0.08 },
      { min: 66296, max: 338639, rate: 0.093 },
      { min: 338640, max: 406364, rate: 0.103 },
      { min: 406365, max: 677275, rate: 0.113 },
      { min: 677276, max: 1000000, rate: 0.123 },
      { min: 1000001, max: Infinity, rate: 0.133 }
    ],
    married: [
      { min: 0, max: 20198, rate: 0.01 },
      { min: 20199, max: 47884, rate: 0.02 },
      { min: 47885, max: 75576, rate: 0.04 },
      { min: 75577, max: 104910, rate: 0.06 },
      { min: 104911, max: 132590, rate: 0.08 },
      { min: 132591, max: 677278, rate: 0.093 },
      { min: 677279, max: 812728, rate: 0.103 },
      { min: 812729, max: 1354550, rate: 0.113 },
      { min: 1354551, max: 2000000, rate: 0.123 },
      { min: 2000001, max: Infinity, rate: 0.133 }
    ]
  },
  // 其他州的税率表可以类似添加
}

export default {
  name: 'PaycheckCalculator',
  data() {
    return {
      // Input fields
      selectedState: null,
      employeeName: '',
      employeeType: 'non-exempted',
      wageType: 'hourly',
      hourlyRate: 25.00,
      regularHours: 40,
      overtimeHours: 0,
      annualSalary: 52000,
      payFrequency: 'biweekly',
      payDate: this.getDefaultPayDate(),
      w4Version: '2020',
      filingStatus: 'single',
      multipleJobs: 'no',
      dependentAmount: 0,
      otherIncome: 0,
      deductions: 0,
      additionalWithholding: 0,
      stateFilingStatus: 'single',
      withholdingAllowances: 1,
      additionalStateWithholding: 0,
      deductionsList: [
        { type: '401k', employee: 200, employer: 0 },
        { type: 'health', employee: 150, employer: 300 }
      ],
      
      // Results
      showResults: false,
      results: {
        grossPay: 0,
        regularPay: 0,
        overtimePay: 0,
        totalDeductions: 0,
        employeeDeductions: 0,
        employerDeductions: 0,
        totalTaxes: 0,
        socialSecurityEmployee: 0,
        socialSecurityEmployer: 0,
        medicareEmployee: 0,
        medicareEmployer: 0,
        federalIncomeTax: 0,
        stateIncomeTax: 0,
        stateDisability: 0,
        totalEmployeeTaxes: 0,
        totalEmployerTaxes: 0,
        netPay: 0
      },
      
      // Static data
      taxData: taxData,
      states: taxData.states
    }
  },
  mounted() {
    // Set default state to California
    this.selectedState = this.states.find(state => state.code === 'CA')
    
    // Calculate initial results
    // this.calculatePaycheck()
  },
  methods: {
    // Helper methods
    getDefaultPayDate() {
      const date = new Date()
      date.setDate(date.getDate() + 7) // Next week
      return date.toISOString().split('T')[0]
    },
    
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount || 0)
    },
    
    formatDate(dateString) {
      if (!dateString) return 'Not specified'
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    },
    
    getTaxTypeLabel(type) {
      const labels = {
        'none': 'No State Tax',
        'flat': 'Flat Rate',
        'progressive': 'Progressive'
      }
      return labels[type] || type
    },
    
    formatRate(state) {
      if (state.type === 'none') return '0%'
      if (state.type === 'flat') return `${state.rate_min}%`
      return `${state.rate_min}% - ${state.rate_max}%`
    },
    
    getDeductionTypeLabel(type) {
      const labels = {
        '401k': '401(k) Retirement',
        'health': 'Health Insurance',
        'dental': 'Dental Insurance',
        'vision': 'Vision Insurance',
        'hsa': 'HSA Contribution',
        'fsa': 'FSA Contribution',
        'life': 'Life Insurance',
        'disability': 'Disability Insurance',
        'other': 'Other'
      }
      return labels[type] || type
    },
    
    calculatePercentage(part, total) {
      if (!total) return 0
      return ((part / total) * 100).toFixed(1)
    },
    
    // Deduction management
    addDeduction() {
      this.deductionsList.push({
        type: '',
        employee: 0,
        employer: 0
      })
    },
    
    removeDeduction(index) {
      this.deductionsList.splice(index, 1)
    },
    
    // Calculate gross pay based on pay frequency
    calculateGrossPay() {
      let annualIncome = 0
      
      if (this.wageType === 'hourly') {
        // Calculate regular and overtime pay
        const regularPay = this.hourlyRate * this.regularHours
        const overtimePay = this.hourlyRate * 1.5 * this.overtimeHours
        const weeklyPay = regularPay + overtimePay
        
        // Convert to annual based on hours
        if (this.payFrequency === 'weekly') {
          annualIncome = weeklyPay * 52
        } else if (this.payFrequency === 'biweekly') {
          annualIncome = weeklyPay * 2 * 26
        } else if (this.payFrequency === 'semimonthly') {
          annualIncome = (weeklyPay * 52) / 2
        } else if (this.payFrequency === 'monthly') {
          annualIncome = weeklyPay * 4.33 * 12
        } else { // annually
          annualIncome = weeklyPay * 52
        }
      } else { // salary
        annualIncome = this.annualSalary
        
        // Adjust for pay frequency in calculations
        if (this.payFrequency === 'weekly') {
          annualIncome = this.annualSalary
        } else if (this.payFrequency === 'biweekly') {
          annualIncome = this.annualSalary
        } else if (this.payFrequency === 'semimonthly') {
          annualIncome = this.annualSalary
        } else if (this.payFrequency === 'monthly') {
          annualIncome = this.annualSalary
        }
      }
      
      return annualIncome
    },
    
    // Calculate federal income tax
    calculateFederalIncomeTax(taxableIncome) {
      let tax = 0
      let remainingIncome = taxableIncome
      
      // Get appropriate brackets based on filing status
      const brackets = this.getFederalBrackets()
      
      for (const bracket of brackets) {
        if (remainingIncome <= 0) break
        
        const bracketSize = bracket.max - bracket.min + 1
        const incomeInBracket = Math.min(remainingIncome, bracketSize)
        
        tax += incomeInBracket * bracket.rate
        remainingIncome -= incomeInBracket
      }
      
      return tax
    },
    
    getFederalBrackets() {
      if (this.filingStatus === 'single' || this.filingStatus === 'married_single') {
        return federalTaxBrackets.single
      } else if (this.filingStatus === 'married') {
        return federalTaxBrackets.married
      } else if (this.filingStatus === 'head') {
        return federalTaxBrackets.head
      }
      return federalTaxBrackets.single
    },
    
    // Calculate state income tax
    calculateStateIncomeTax(taxableIncome) {
      if (this.selectedState.type === 'none') {
        return 0
      }
      
      if (this.selectedState.type === 'flat') {
        return taxableIncome * (this.selectedState.rate_min / 100)
      }
      
      // For progressive states, use simplified calculation
      // In production, you would use detailed bracket tables for each state
      return this.calculateProgressiveStateTax(taxableIncome)
    },
    
    calculateProgressiveStateTax(taxableIncome) {
      // Simplified progressive tax calculation
      // For California as an example
      if (this.selectedState.code === 'CA') {
        const brackets = stateTaxBrackets.CA[this.stateFilingStatus === 'married' ? 'married' : 'single']
        let tax = 0
        let remainingIncome = taxableIncome
        
        for (const bracket of brackets) {
          if (remainingIncome <= 0) break
          
          const bracketSize = bracket.max - bracket.min + 1
          const incomeInBracket = Math.min(remainingIncome, bracketSize)
          
          tax += incomeInBracket * bracket.rate
          remainingIncome -= incomeInBracket
        }
        
        return tax
      }
      
      // For other progressive states, use average rate
      const avgRate = (this.selectedState.rate_min + this.selectedState.rate_max) / 2 / 100
      return taxableIncome * avgRate
    },
    
    // Calculate California SDI
    calculateCASDI(taxableIncome) {
      if (this.selectedState.code !== 'CA') return 0
      
      // CA SDI rate for 2025 is approximately 1.1% up to a maximum
      const sdiRate = 0.011
      const sdiMax = 153164 // Maximum taxable earnings for 2025
      const sdiWageBase = Math.min(taxableIncome, sdiMax)
      
      return sdiWageBase * sdiRate
    },
    
    // Main calculation function
    calculatePaycheck() {
      // console.log('calculatePaycheck method called')
      // Calculate annual gross income
      const annualGrossIncome = this.calculateGrossPay()
      
      // Calculate pay period gross
      let payPeriodGross = 0
      if (this.payFrequency === 'weekly') {
        payPeriodGross = annualGrossIncome / 52
      } else if (this.payFrequency === 'biweekly') {
        payPeriodGross = annualGrossIncome / 26
      } else if (this.payFrequency === 'semimonthly') {
        payPeriodGross = annualGrossIncome / 24
      } else if (this.payFrequency === 'monthly') {
        payPeriodGross = annualGrossIncome / 12
      } else { // annually
        payPeriodGross = annualGrossIncome
      }
      
      // Calculate deductions
      const employeeDeductions = this.deductionsList.reduce((sum, d) => sum + (parseFloat(d.employee) || 0), 0)
      const employerDeductions = this.deductionsList.reduce((sum, d) => sum + (parseFloat(d.employer) || 0), 0)
      const totalDeductions = employeeDeductions + employerDeductions
      
      // Calculate taxable income for FICA
      const ficaTaxableIncome = Math.min(annualGrossIncome, 168600) // Social Security wage base for 2025
      
      // Calculate FICA taxes
      const socialSecurityRate = 0.062
      const medicareRate = 0.0145
      
      const socialSecurityEmployee = (ficaTaxableIncome * socialSecurityRate) / (this.payFrequency === 'annually' ? 1 : 
        this.payFrequency === 'weekly' ? 52 :
        this.payFrequency === 'biweekly' ? 26 :
        this.payFrequency === 'semimonthly' ? 24 : 12)
      
      const socialSecurityEmployer = socialSecurityEmployee
      const medicareEmployee = (annualGrossIncome * medicareRate) / (this.payFrequency === 'annually' ? 1 :
        this.payFrequency === 'weekly' ? 52 :
        this.payFrequency === 'biweekly' ? 26 :
        this.payFrequency === 'semimonthly' ? 24 : 12)
      
      const medicareEmployer = medicareEmployee
      
      // Calculate federal income tax
      const federalIncomeTax = this.calculateFederalIncomeTax(annualGrossIncome) / (this.payFrequency === 'annually' ? 1 :
        this.payFrequency === 'weekly' ? 52 :
        this.payFrequency === 'biweekly' ? 26 :
        this.payFrequency === 'semimonthly' ? 24 : 12)
      
      // Calculate state income tax
      const stateIncomeTax = this.calculateStateIncomeTax(annualGrossIncome) / (this.payFrequency === 'annually' ? 1 :
        this.payFrequency === 'weekly' ? 52 :
        this.payFrequency === 'biweekly' ? 26 :
        this.payFrequency === 'semimonthly' ? 24 : 12)
      
      // Calculate CA SDI if applicable
      const stateDisability = this.calculateCASDI(annualGrossIncome) / (this.payFrequency === 'annually' ? 1 :
        this.payFrequency === 'weekly' ? 52 :
        this.payFrequency === 'biweekly' ? 26 :
        this.payFrequency === 'semimonthly' ? 24 : 12)
      
      // Calculate totals
      const totalEmployeeTaxes = socialSecurityEmployee + medicareEmployee + federalIncomeTax + stateIncomeTax + stateDisability
      const totalEmployerTaxes = socialSecurityEmployer + medicareEmployer
      const totalTaxes = totalEmployeeTaxes + totalEmployerTaxes
      
      // Calculate net pay
      const netPay = payPeriodGross - employeeDeductions - totalEmployeeTaxes
      
      // Update results
      this.results = {
        grossPay: payPeriodGross,
        regularPay: this.wageType === 'hourly' ? this.hourlyRate * this.regularHours : payPeriodGross,
        overtimePay: this.wageType === 'hourly' ? this.hourlyRate * 1.5 * this.overtimeHours : 0,
        totalDeductions: totalDeductions,
        employeeDeductions: employeeDeductions,
        employerDeductions: employerDeductions,
        totalTaxes: totalTaxes,
        socialSecurityEmployee: socialSecurityEmployee,
        socialSecurityEmployer: socialSecurityEmployer,
        medicareEmployee: medicareEmployee,
        medicareEmployer: medicareEmployer,
        federalIncomeTax: federalIncomeTax,
        stateIncomeTax: stateIncomeTax,
        stateDisability: stateDisability,
        totalEmployeeTaxes: totalEmployeeTaxes,
        totalEmployerTaxes: totalEmployerTaxes,
        netPay: netPay
      }
      
      // Show results
      this.showResults = true
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    
    // Navigation methods
    startOver() {
      this.showResults = false
      // Reset form values (optional)
    },
    
    printResults() {
      window.print()
    },
    
    emailResults() {
      alert('This feature would typically open your email client with the results.')
    },
    
    saveResults() {
      alert('Results saved! This feature would typically save to local storage or database.')
    },
    
    goToGlobalPrice() {
      this.$router.push('/dashboard/global-price')
    },
    
    goToIncomeTax() {
      this.$router.push('/dashboard/income-tax')
    },
    
    sendFeedback() {
      alert('Thank you for your feedback!')
    }
  }
}
</script>

<style scoped>
.paycheck-calculator {
  max-width: 1200px;
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
  border-bottom: 1px dashed #2c3e50;
  background: #2c3e50;
  border-radius: 10px;
}

.page-title {
  font-size: 2.5rem;
  color: white;
  margin-bottom: 10px;
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
}

/* Main Content Container */
.main-content-container {
  margin-bottom: 50px;
  min-height: 800px;
}

/* Input Section */
.form-container {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
}

.form-section {
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid #eaeaea;
}

.form-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-title {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 600;
}

/* Form Layout */
.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #5d6d7e;
  font-size: 0.95rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.form-group input[type="date"] {
  padding: 11px 16px;
}

/* State Selection */
.state-select {
  font-size: 1.1rem;
  font-weight: 500;
  padding: 14px;
}

.state-info {
  display: flex;
  gap: 15px;
  margin-top: 10px;
  font-size: 0.9rem;
}

.tax-type {
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
}

.tax-type.none {
  background: #d4edda;
  color: #155724;
}

.tax-type.flat {
  background: #d1ecf1;
  color: #0c5460;
}

.tax-type.progressive {
  background: #f8d7da;
  color: #721c24;
}

.tax-rate {
  color: #7f8c8d;
  font-weight: 500;
}

/* Wage Type Toggle */
.wage-type-toggle {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.wage-btn {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.wage-btn:hover {
  border-color: #3498db;
  background: #f8f9fa;
}

.wage-btn.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

/* Input with Symbol */
.input-with-symbol {
  position: relative;
}

.input-with-symbol .symbol {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
  font-weight: 500;
}

.input-with-symbol input {
  padding-left: 40px;
}

/* W4 Options */
.w4-2020-options {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  border: 1px solid #eaeaea;
}

/* Deductions Table */
.deductions-table {
  overflow-x: auto;
}

.deductions-table table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.deductions-table th {
  background: #f8f9fa;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #5d6d7e;
  border-bottom: 2px solid #e0e0e0;
}

.deductions-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #eaeaea;
}

.deductions-table input,
.deductions-table select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.remove-btn {
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background: #c0392b;
}

.add-deduction-btn {
  background: #2ecc71;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.add-deduction-btn:hover {
  background: #27ae60;
}

/* Calculate Button */
.calculate-section {
  text-align: center;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 2px solid #eaeaea;
}

.calculate-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 18px 50px;
  border-radius: 10px;
  font-size: 1.3rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.calculate-btn:hover {
  background: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

/* Results Section */
.results-container {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
}

/* Results Header */
.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #3498db;
}

.header-left h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 15px;
}

.net-pay {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.net-pay .label {
  font-size: 1rem;
  color: #7f8c8d;
}

.net-pay .amount {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
}

.header-right {
  display: flex;
  gap: 10px;
}

.print-btn,
.email-btn {
  padding: 10px 20px;
  border: 2px solid #3498db;
  background: white;
  color: #3498db;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.print-btn:hover,
.email-btn:hover {
  background: #3498db;
  color: white;
}

/* Employee Summary */
.employee-summary {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
}

.summary-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.summary-item .label {
  font-size: 0.9rem;
  color: #7f8c8d;
}

.summary-item .value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

/* Main Summary */
.main-summary {
  margin-bottom: 40px;
}

.main-summary h3 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 15px;
}

.summary-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 10px;
}

.total-gross {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-size: 1.2rem;
}

.total-gross .amount {
  font-size: 1.5rem;
  font-weight: 700;
}

.summary-breakdown {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.breakdown-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  backdrop-filter: blur(10px);
}

.breakdown-label {
  font-size: 1rem;
  margin-bottom: 10px;
  opacity: 0.9;
}

.breakdown-amount {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.breakdown-percentage {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Tables */
.earnings-section,
.taxes-section,
.deductions-results {
  margin-bottom: 40px;
}

.earnings-section h3,
.taxes-section h3,
.deductions-results h3 {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 15px;
}

.earnings-table,
.taxes-table,
.deductions-results-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.earnings-table th,
.taxes-table th,
.deductions-results-table th {
  background: #f8f9fa;
  padding: 15px 20px;
  text-align: left;
  font-weight: 600;
  color: #5d6d7e;
  border-bottom: 2px solid #e0e0e0;
}

.earnings-table td,
.taxes-table td,
.deductions-results-table td {
  padding: 15px 20px;
  border-bottom: 1px solid #eaeaea;
}

.total-row {
  background: #f8f9fa;
  font-weight: 600;
}

.total-row td {
  border-top: 2px solid #e0e0e0;
  border-bottom: none;
}

/* Final Summary */
.final-summary {
  margin: 40px 0;
}

.summary-card {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 30px;
  border: 1px solid #e0e0e0;
}

.summary-card .summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eaeaea;
}

.summary-card .summary-item:last-child {
  border-bottom: none;
}

.summary-card .summary-item.total {
  border-top: 2px solid #3498db;
  padding-top: 25px;
  margin-top: 10px;
}

.summary-card .label {
  font-size: 1.1rem;
  color: #5d6d7e;
}

.summary-card .value {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
}

.summary-card .value.negative {
  color: #e74c3c;
}

.summary-card .value.total-amount {
  font-size: 1.8rem;
  color: #2c3e50;
}

/* Results Actions */
.results-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 40px 0 20px;
}

.start-over-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
}

.start-over-btn:hover {
  background: #c0392b;
  transform: translateY(-2px);
}

.save-btn {
  background: #2ecc71;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.save-btn:hover {
  background: #27ae60;
  transform: translateY(-2px);
}

/* Results Disclaimer */
.results-disclaimer {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
  color: #856404;
  font-size: 0.95rem;
  text-align: center;
}

/* Footer */
.footer {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px dashed #2c3e50;
  background: #2c3e50;
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
  color: white;
  margin-bottom: 15px;
  font-weight: 600;
}

.footer-section p {
  color: #7f8c8d;
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
  .paycheck-calculator {
    padding: 0 15px;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .form-container,
  .results-container {
    padding: 20px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .summary-row {
    grid-template-columns: 1fr;
  }
  
  .summary-breakdown {
    grid-template-columns: 1fr;
  }
  
  .results-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .header-right {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .results-actions {
    flex-direction: column;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    padding: 0 20px 30px;
  }
}

@media print {
  .ad-placeholder,
  .footer,
  .results-actions .save-btn,
  .header-right {
    display: none;
  }
  
  .results-container {
    box-shadow: none;
    border: none;
  }
}
</style>