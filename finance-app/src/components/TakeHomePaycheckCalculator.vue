<template>
  <div class="calculator-container">
    <!-- Header Section -->
    <div class="header">
      <div class="ad-container">
        <div class="ad-placeholder">
          Google Ad Space (728x90)
        </div>
      </div>
      <div class="title">
        <h1>Take Home Paycheck Calculator</h1>
        <p class="subtitle">Know exactly what you'll earn after taxes and deductions</p>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Tab Navigation -->
      <div class="tabs">
        <button 
          @click="activeTab = 'basic'"
          :class="['tab-btn', { active: activeTab === 'basic' }]"
        >
          Basic Calculator
        </button>
        <button 
          @click="activeTab = 'compare'"
          :class="['tab-btn', { active: activeTab === 'compare' }]"
        >
          Compare Scenarios
        </button>
      </div>

      <!-- Basic Calculator Tab -->
      <div v-if="activeTab === 'basic'" class="tab-content">
        <div class="calculator-form">
          <div class="input-section">
            <h2>Enter Your Information</h2>
            
            <div class="input-group">
              <label for="salary">Annual Salary ($)</label>
              <input 
                type="number" 
                id="salary"
                v-model.number="basicSalary"
                @input="calculateBasic"
                placeholder="e.g., 75000"
              >
            </div>

            <div class="input-group">
              <label for="state">State</label>
              <select id="state" v-model="basicState" @change="calculateBasic">
                <option v-for="state in stateData.states" :key="state.code" :value="state.code">
                  {{ state.state }} ({{ state.code }})
                </option>
              </select>
            </div>

            <div class="input-group">
              <label>Filing Status</label>
              <div class="radio-group">
                <label>
                  <input type="radio" v-model="basicFilingStatus" value="single" @change="calculateBasic">
                  Single
                </label>
                <label>
                  <input type="radio" v-model="basicFilingStatus" value="married" @change="calculateBasic">
                  Married
                </label>
              </div>
            </div>

            <!-- Deduction Reality Layer -->
            <div class="deduction-section">
              <h3>Deduction Reality Layer</h3>
              
              <div class="deduction-layer">
                <h4 class="cannot-avoid">Layer 1: You cannot avoid</h4>
                <div class="deduction-item">
                  <span>Federal Tax</span>
                  <span>Calculated based on brackets</span>
                </div>
                <div class="deduction-item">
                  <span>Social Security (6.2%)</span>
                  <span>Max: $168,600 in 2024</span>
                </div>
                <div class="deduction-item">
                  <span>Medicare (1.45%)</span>
                  <span>No cap</span>
                </div>
              </div>

              <div class="deduction-layer">
                <h4 class="can-adjust">Layer 2: You can adjust</h4>
                <div class="deduction-item">
                  <label>401(k) Contribution (%)</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="20" 
                    step="0.5"
                    v-model.number="basic401k"
                    @input="calculateBasic"
                  >
                  <span>{{ basic401k }}%</span>
                </div>
                <div class="deduction-item">
                  <label>HSA Contribution ($/year)</label>
                  <input 
                    type="number"
                    v-model.number="basicHSA"
                    @input="calculateBasic"
                    placeholder="0"
                  >
                </div>
              </div>

              <div class="deduction-layer">
                <h4 class="might-not-need">Layer 3: You might not need (yet)</h4>
                <div class="deduction-item">
                  <label>Extra Withholding ($/paycheck)</label>
                  <input 
                    type="number"
                    v-model.number="basicExtraWithholding"
                    @input="calculateBasic"
                    placeholder="0"
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Results Section -->
          <div class="results-section" v-if="basicResult">
            <h2>Your Take-Home Pay</h2>
            
            <!-- Income Phase Insights -->
            <div class="income-phase">
              <h3>At your income level:</h3>
              <ul>
                <li v-for="insight in incomeInsights" :key="insight">{{ insight }}</li>
              </ul>
            </div>

            <!-- Breakdown -->
            <div class="breakdown">
              <h3>Paycheck Breakdown</h3>
              <div class="breakdown-item">
                <span>Gross Pay (monthly)</span>
                <span>${{ formatNumber(basicResult.grossMonthly) }}</span>
              </div>
              <div class="breakdown-item">
                <span>Federal Tax</span>
                <span>-${{ formatNumber(basicResult.federalTax) }}</span>
              </div>
              <div class="breakdown-item">
                <span>State Tax</span>
                <span>-${{ formatNumber(basicResult.stateTax) }}</span>
              </div>
              <div class="breakdown-item">
                <span>FICA Taxes</span>
                <span>-${{ formatNumber(basicResult.ficaTaxes) }}</span>
              </div>
              <div class="breakdown-item">
                <span>401(k) Contribution</span>
                <span>-${{ formatNumber(basicResult.contrib401k) }}</span>
              </div>
              <div class="breakdown-item total">
                <span>Net Take-Home Pay</span>
                <span>${{ formatNumber(basicResult.netMonthly) }}</span>
              </div>
            </div>

            <!-- Trust Layer -->
            <div class="trust-layer">
              <h3>Why These Numbers?</h3>
              <p>• Federal tax uses 2024 brackets for {{ basicFilingStatus }} filers</p>
              <p>• Social Security caps at $168,600. After that, this deduction disappears</p>
              <p>• State tax calculated for {{ getStateName(basicState) }} ({{ getStateRate(basicState) }}%)</p>
              <p>• Medicare has no income cap</p>
            </div>

            <!-- Emotional Summary -->
            <div class="emotional-summary">
              <h3>Summary</h3>
              <p>{{ emotionalSummary }}</p>
            </div>

            <button @click="resetBasic" class="reset-btn">Start Over</button>
          </div>
        </div>
      </div>

      <!-- Compare Scenarios Tab -->
      <div v-if="activeTab === 'compare'" class="tab-content">
        <div class="compare-form">
          <!-- Current vs New Job Comparison -->
          <div class="comparison-section">
            <h2>Raise / Offer Reality Check</h2>
            
            <div class="two-column">
              <div class="column">
                <h3>Current Job</h3>
                <div class="input-group">
                  <label>Annual Salary ($)</label>
                  <input type="number" v-model.number="currentSalary" placeholder="e.g., 75000">
                </div>
                <div class="input-group">
                  <label>State</label>
                  <select v-model="currentState">
                    <option v-for="state in stateData.states" :key="state.code" :value="state.code">
                      {{ state.code }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="column">
                <h3>New Job / Raise</h3>
                <div class="input-group">
                  <label>New Salary ($)</label>
                  <input type="number" v-model.number="newSalary" placeholder="e.g., 90000">
                </div>
                <div class="input-group">
                  <label>State</label>
                  <select v-model="newState">
                    <option v-for="state in stateData.states" :key="state.code" :value="state.code">
                      {{ state.code }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <button @click="calculateRaise" class="calculate-btn">Calculate Raise Impact</button>

            <div v-if="raiseResult" class="raise-results">
              <h3>Raise Reality Check</h3>
              <div class="result-item">
                <span>Gross Increase</span>
                <span>+${{ formatNumber(raiseResult.grossIncrease) }}</span>
              </div>
              <div class="result-item">
                <span>Net Increase</span>
                <span>+${{ formatNumber(raiseResult.netIncrease) }}</span>
              </div>
              <div class="result-item highlight">
                <span>Real Impact Per Paycheck (bi-weekly)</span>
                <span>+${{ formatNumber(raiseResult.perPaycheck) }}</span>
              </div>
              <div class="breakdown">
                <p>Per Month: +${{ formatNumber(raiseResult.perMonth) }}</p>
                <p>Per Hour (2080 hrs/year): +${{ formatNumber(raiseResult.perHour) }}/hr</p>
              </div>

              <div class="trust-layer">
                <h4>Why This Net Increase?</h4>
                <p>• Moving from {{ getStateName(currentState) }} to {{ getStateName(newState) }}</p>
                <p>• Tax brackets increase with higher income</p>
                <p>• FICA taxes remain at same percentage</p>
              </div>

              <div class="emotional-summary">
                <p>{{ raiseEmotionalSummary }}</p>
              </div>
            </div>
          </div>

          <!-- Scenario Toggle Comparison -->
          <div class="scenario-section">
            <h2>Scenario Comparison</h2>
            
            <div class="two-column">
              <div class="column">
                <h3>Scenario A</h3>
                <div class="input-group">
                  <label>Annual Salary ($)</label>
                  <input type="number" v-model.number="scenarioA.salary" placeholder="75000">
                </div>
                <div class="input-group">
                  <label>State</label>
                  <select v-model="scenarioA.state">
                    <option v-for="state in stateData.states" :key="state.code" :value="state.code">
                      {{ state.code }}
                    </option>
                  </select>
                </div>
                <div class="input-group">
                  <label>Filing Status</label>
                  <select v-model="scenarioA.filingStatus">
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                  </select>
                </div>
                <div class="input-group">
                  <label>401(k) %</label>
                  <input type="range" min="0" max="20" step="0.5" v-model.number="scenarioA.contrib401k">
                  <span>{{ scenarioA.contrib401k }}%</span>
                </div>
              </div>

              <div class="column">
                <h3>Scenario B</h3>
                <div class="input-group">
                  <label>Annual Salary ($)</label>
                  <input type="number" v-model.number="scenarioB.salary" placeholder="75000">
                </div>
                <div class="input-group">
                  <label>State</label>
                  <select v-model="scenarioB.state">
                    <option v-for="state in stateData.states" :key="state.code" :value="state.code">
                      {{ state.code }}
                    </option>
                  </select>
                </div>
                <div class="input-group">
                  <label>Filing Status</label>
                  <select v-model="scenarioB.filingStatus">
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                  </select>
                </div>
                <div class="input-group">
                  <label>401(k) %</label>
                  <input type="range" min="0" max="20" step="0.5" v-model.number="scenarioB.contrib401k">
                  <span>{{ scenarioB.contrib401k }}%</span>
                </div>
              </div>
            </div>

            <div class="toggle-buttons">
              <button @click="toggleScenario('single_married')" class="toggle-btn">
                Single ↔ Married
              </button>
              <button @click="toggleScenario('state')" class="toggle-btn">
                State A ↔ State B
              </button>
              <button @click="toggleScenario('401k')" class="toggle-btn">
                401k 0% ↔ 10%
              </button>
            </div>

            <button @click="calculateScenario" class="calculate-btn">Compare Scenarios</button>

            <div v-if="scenarioResult" class="scenario-results">
              <h3>Comparison Results</h3>
              <div class="comparison-grid">
                <div class="scenario-result">
                  <h4>Scenario A</h4>
                  <div class="result-item">
                    <span>Annual Take-Home</span>
                    <span>${{ formatNumber(scenarioResult.a.annual) }}</span>
                  </div>
                  <div class="result-item">
                    <span>Monthly Take-Home</span>
                    <span>${{ formatNumber(scenarioResult.a.monthly) }}</span>
                  </div>
                </div>

                <div class="scenario-result">
                  <h4>Scenario B</h4>
                  <div class="result-item">
                    <span>Annual Take-Home</span>
                    <span>${{ formatNumber(scenarioResult.b.annual) }}</span>
                  </div>
                  <div class="result-item">
                    <span>Monthly Take-Home</span>
                    <span>${{ formatNumber(scenarioResult.b.monthly) }}</span>
                  </div>
                </div>
              </div>

              <div class="difference-highlight">
                <h4>Impact: This changes your take-home by {{ scenarioResult.difference >= 0 ? '+' : '' }}${{ formatNumber(Math.abs(scenarioResult.difference)) }} per month</h4>
              </div>

              <div class="trust-layer">
                <h4>Why This Difference?</h4>
                <p>• State tax difference: {{ getStateName(scenarioA.state) }} vs {{ getStateName(scenarioB.state) }}</p>
                <p>• Filing status affects federal tax brackets</p>
                <p>• 401(k) contributions reduce taxable income</p>
              </div>

              <div class="emotional-summary">
                <p>{{ scenarioEmotionalSummary }}</p>
              </div>
            </div>

            <button @click="resetCompare" class="reset-btn">Reset Comparison</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TakeHomePaycheckCalculator',
  
  data() {
    return {
      activeTab: 'basic',
      
      // Basic Calculator Data
      basicSalary: 75000,
      basicState: 'CA',
      basicFilingStatus: 'single',
      basic401k: 5,
      basicHSA: 0,
      basicExtraWithholding: 0,
      basicResult: null,
      
      // Compare Tab Data
      currentSalary: 75000,
      currentState: 'CA',
      newSalary: 90000,
      newState: 'TX',
      
      scenarioA: {
        salary: 75000,
        state: 'CA',
        filingStatus: 'single',
        contrib401k: 0
      },
      scenarioB: {
        salary: 75000,
        state: 'TX',
        filingStatus: 'single',
        contrib401k: 10
      },
      
      raiseResult: null,
      scenarioResult: null,
      
      // State tax data from JSON
      stateData: {
        "country": "United States",
        "currency": "USD",
        "tax_year": "2025-2026",
        "states": [
          // ... (paste the full JSON data here from your question)
          // For brevity, including only a few states in this example
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
      "notes": "No state personal income tax"
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
      "rate_max": 11.0,
      "notes": "High progressive tax brackets"
    },
    {
      "state": "New York",
      "code": "NY",
      "type": "progressive",
      "rate_min": 4.0,
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
      "rate_min": 3.0,
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
      "rate_min": 2.0,
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
      "rate_min": 2.0,
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
    }
  },
  
  computed: {
    incomeInsights() {
      if (!this.basicResult) return []
      
      const insights = []
      const salary = this.basicSalary
      
      if (salary < 50000) {
        insights.push('State tax matters more than deductions at this income level')
        insights.push('401k optimization has low impact')
        insights.push('Focus on maximizing standard deduction')
      } else if (salary < 100000) {
        insights.push('State tax matters more than deductions')
        insights.push('401k optimization has medium impact')
        insights.push('Itemized deductions may not be worth it')
      } else if (salary < 200000) {
        insights.push('401k optimization has high impact')
        insights.push('State tax vs no-tax states matter significantly')
        insights.push('Consider itemizing if you have mortgage/donations')
      } else {
        insights.push('Maximize all pre-tax contributions')
        insights.push('State tax planning is crucial')
        insights.push('Additional Medicare tax may apply (0.9%)')
      }
      
      return insights
    },
    
    emotionalSummary() {
      if (!this.basicResult) return ''
      
      const state = this.getStateName(this.basicState)
      const hasStateTax = this.getStateRate(this.basicState) > 0
      
      if (hasStateTax) {
        return `Your paycheck is lower than it could be in a no-tax state. Consider that moving from ${state} to a state like Texas or Florida could significantly increase your take-home pay.`
      } else {
        return `Your paycheck is optimized for location. You're keeping more of what you earn by living in a no-tax state.`
      }
    },
    
    raiseEmotionalSummary() {
      if (!this.raiseResult) return ''
      
      const oldState = this.getStateName(this.currentState)
      const newState = this.getStateName(this.newState)
      const netIncrease = this.raiseResult.netIncrease
      const grossIncrease = this.raiseResult.grossIncrease
      const taxTake = grossIncrease - netIncrease
      
      if (taxTake > grossIncrease * 0.4) {
        return `Your raise is being mostly eaten by taxes. You're only taking home ${Math.round(netIncrease/grossIncrease*100)}% of your gross increase.`
      } else if (oldState !== newState) {
        return `Your state choice matters more than your salary increase! Moving from ${oldState} to ${newState} is having a significant impact.`
      } else {
        return `This is a meaningful raise that will noticeably improve your monthly cash flow.`
      }
    },
    
    scenarioEmotionalSummary() {
      if (!this.scenarioResult) return ''
      
      const diff = this.scenarioResult.difference
      const stateA = this.getStateName(this.scenarioA.state)
      const stateB = this.getStateName(this.scenarioB.state)
      
      if (Math.abs(diff) > 500) {
        return `This choice makes a HUGE difference in your monthly budget. That's ${Math.abs(diff)*12} per year!`
      } else if (Math.abs(diff) > 200) {
        return `This is a meaningful difference that could cover a utility bill or grocery trip each month.`
      } else {
        return `While the difference seems small monthly, it adds up to ${Math.abs(diff)*12} annually.`
      }
    }
  },
  
  mounted() {
    this.calculateBasic()
  },
  
  methods: {
    // Formatting
    formatNumber(num) {
      return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    },
    
    // State helper methods
    getStateName(code) {
      const state = this.stateData.states.find(s => s.code === code)
      return state ? state.state : 'Unknown'
    },
    
    getStateRate(code) {
      const state = this.stateData.states.find(s => s.code === code)
      if (!state) return 0
      
      // Simplified: use average of min/max for progressive, flat rate for flat
      if (state.type === 'none') return 0
      if (state.type === 'flat') return state.rate_min
      
      // For progressive states, use a simplified progressive calculation
      return (state.rate_min + state.rate_max) / 3
    },
    
    // Federal tax calculation (simplified 2024 brackets)
    calculateFederalTax(income, filingStatus) {
      const brackets = filingStatus === 'single' ? [
        { min: 0, max: 11600, rate: 0.10 },
        { min: 11601, max: 47150, rate: 0.12 },
        { min: 47151, max: 100525, rate: 0.22 },
        { min: 100526, max: 191950, rate: 0.24 },
        { min: 191951, max: 243725, rate: 0.32 },
        { min: 243726, max: 609350, rate: 0.35 },
        { min: 609351, max: Infinity, rate: 0.37 }
      ] : [
        { min: 0, max: 23200, rate: 0.10 },
        { min: 23201, max: 94300, rate: 0.12 },
        { min: 94301, max: 201050, rate: 0.22 },
        { min: 201051, max: 383900, rate: 0.24 },
        { min: 383901, max: 487450, rate: 0.32 },
        { min: 487451, max: 731200, rate: 0.35 },
        { min: 731201, max: Infinity, rate: 0.37 }
      ]
      
      let tax = 0
      let remainingIncome = income
      
      for (let i = brackets.length - 1; i >= 0; i--) {
        const bracket = brackets[i]
        if (income > bracket.min) {
          const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min)
          tax += taxableInBracket * bracket.rate
          remainingIncome -= taxableInBracket
        }
      }
      
      return tax
    },
    
    // Main calculation function for basic tab
    calculateBasic() {
      const salary = this.basicSalary
      const filingStatus = this.basicFilingStatus
      
      // Calculate pre-tax deductions
      const contrib401k = salary * (this.basic401k / 100)
      const hsa = this.basicHSA
      const preTaxDeductions = contrib401k + hsa
      
      // Taxable income
      const taxableIncome = salary - preTaxDeductions
      
      // Calculate taxes
      const federalTax = this.calculateFederalTax(taxableIncome, filingStatus)
      const stateRate = this.getStateRate(this.basicState)
      const stateTax = taxableIncome * (stateRate / 100)
      
      // FICA taxes (Social Security and Medicare)
      const ssWageBase = 168600
      const ssIncome = Math.min(salary, ssWageBase)
      const socialSecurity = ssIncome * 0.062
      const medicare = salary * 0.0145
      const ficaTaxes = socialSecurity + medicare
      
      // Additional Medicare tax for high earners
      const additionalMedicareThreshold = filingStatus === 'single' ? 200000 : 250000
      if (salary > additionalMedicareThreshold) {
        const additionalMedicare = (salary - additionalMedicareThreshold) * 0.009
        ficaTaxes += additionalMedicare
      }
      
      // Total deductions
      const totalDeductions = federalTax + stateTax + ficaTaxes + preTaxDeductions
      
      // Monthly calculations
      const grossMonthly = salary / 12
      const netAnnual = salary - totalDeductions
      const netMonthly = netAnnual / 12
      
      this.basicResult = {
        grossMonthly,
        federalTax: federalTax / 12,
        stateTax: stateTax / 12,
        ficaTaxes: ficaTaxes / 12,
        contrib401k: contrib401k / 12,
        hsa: hsa / 12,
        netMonthly,
        netAnnual
      }
    },
    
    // Calculate raise impact
    calculateRaise() {
      // Simplified calculation - in real app you'd use the full tax calculation
      const currentTakeHome = this.calculateTakeHome(this.currentSalary, this.currentState, 'single')
      const newTakeHome = this.calculateTakeHome(this.newSalary, this.newState, 'single')
      
      const grossIncrease = this.newSalary - this.currentSalary
      const netIncrease = newTakeHome - currentTakeHome
      
      this.raiseResult = {
        grossIncrease,
        netIncrease,
        perPaycheck: netIncrease / 26, // bi-weekly
        perMonth: netIncrease / 12,
        perHour: netIncrease / 2080 // 2080 work hours per year
      }
    },
    
    // Calculate scenario comparison
    calculateScenario() {
      const takeHomeA = this.calculateTakeHome(
        this.scenarioA.salary,
        this.scenarioA.state,
        this.scenarioA.filingStatus,
        this.scenarioA.contrib401k
      )
      
      const takeHomeB = this.calculateTakeHome(
        this.scenarioB.salary,
        this.scenarioB.state,
        this.scenarioB.filingStatus,
        this.scenarioB.contrib401k
      )
      
      this.scenarioResult = {
        a: {
          annual: takeHomeA,
          monthly: takeHomeA / 12
        },
        b: {
          annual: takeHomeB,
          monthly: takeHomeB / 12
        },
        difference: (takeHomeB - takeHomeA) / 12
      }
    },
    
    // Helper function to calculate take-home pay
    calculateTakeHome(salary, stateCode, filingStatus, contrib401kPercent = 0) {
      // Pre-tax deductions
      const contrib401k = salary * (contrib401kPercent / 100)
      const preTaxDeductions = contrib401k
      
      // Taxable income
      const taxableIncome = salary - preTaxDeductions
      
      // Calculate taxes
      const federalTax = this.calculateFederalTax(taxableIncome, filingStatus)
      const stateRate = this.getStateRate(stateCode)
      const stateTax = taxableIncome * (stateRate / 100)
      
      // FICA taxes
      const ssWageBase = 168600
      const ssIncome = Math.min(salary, ssWageBase)
      const socialSecurity = ssIncome * 0.062
      const medicare = salary * 0.0145
      let ficaTaxes = socialSecurity + medicare
      
      // Additional Medicare tax
      const additionalMedicareThreshold = filingStatus === 'single' ? 200000 : 250000
      if (salary > additionalMedicareThreshold) {
        ficaTaxes += (salary - additionalMedicareThreshold) * 0.009
      }
      
      // Total take-home
      return salary - federalTax - stateTax - ficaTaxes - preTaxDeductions
    },
    
    // Toggle scenarios
    toggleScenario(type) {
      switch(type) {
        case 'single_married':
          this.scenarioA.filingStatus = this.scenarioA.filingStatus === 'single' ? 'married' : 'single'
          this.scenarioB.filingStatus = this.scenarioB.filingStatus === 'single' ? 'married' : 'single'
          break
        case 'state':
          [this.scenarioA.state, this.scenarioB.state] = [this.scenarioB.state, this.scenarioA.state]
          break
        case '401k':
          this.scenarioA.contrib401k = this.scenarioA.contrib401k === 0 ? 10 : 0
          this.scenarioB.contrib401k = this.scenarioB.contrib401k === 0 ? 10 : 0
          break
      }
    },
    
    // Reset functions
    resetBasic() {
      this.basicSalary = 75000
      this.basicState = 'CA'
      this.basicFilingStatus = 'single'
      this.basic401k = 5
      this.basicHSA = 0
      this.basicExtraWithholding = 0
      this.calculateBasic()
    },
    
    resetCompare() {
      this.currentSalary = 75000
      this.currentState = 'CA'
      this.newSalary = 90000
      this.newState = 'TX'
      this.scenarioA = {
        salary: 75000,
        state: 'CA',
        filingStatus: 'single',
        contrib401k: 0
      }
      this.scenarioB = {
        salary: 75000,
        state: 'TX',
        filingStatus: 'single',
        contrib401k: 10
      }
      this.raiseResult = null
      this.scenarioResult = null
    }
  }
}
</script>

<style scoped>
.calculator-container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Header Styles */
.header {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.ad-container {
  height: 90px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 2px dashed #cbd5e0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  font-size: 14px;
  margin-bottom: 20px;
  display: none;
}

.title {
  text-align: center;
}

.title h1 {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
}

/* Tabs */
.tabs {
  display: flex;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.tab-btn {
  flex: 1;
  padding: 16px;
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  background: #edf2f7;
}

.tab-btn.active {
  color: #667eea;
  border-bottom: 3px solid #667eea;
  background: white;
}

/* Main Content */
.main-content {
  padding: 0;
}

.tab-content {
  padding: 30px;
}

/* Form Styles */
.calculator-form, .compare-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

@media (max-width: 768px) {
  .calculator-form, .compare-form {
    grid-template-columns: 1fr;
  }
}

.input-section {
  background: #f8fafc;
  padding: 25px;
  border-radius: 12px;
}

.input-section h2, .results-section h2 {
  color: #2d3748;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #4a5568;
  font-weight: 600;
}

.input-group input, .input-group select {
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.input-group input:focus, .input-group select:focus {
  outline: none;
  border-color: #667eea;
}

.radio-group {
  display: flex;
  gap: 20px;
  margin-top: 8px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: normal;
  cursor: pointer;
}

/* Deduction Layers */
.deduction-section {
  margin-top: 30px;
}

.deduction-section h3 {
  color: #2d3748;
  margin-bottom: 20px;
  font-size: 1.3rem;
}

.deduction-layer {
  margin-bottom: 25px;
  padding: 20px;
  border-radius: 8px;
  background: white;
  border: 1px solid #e2e8f0;
}

.deduction-layer h4 {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid;
}

.cannot-avoid {
  color: #e53e3e;
  border-bottom-color: #e53e3e;
}

.can-adjust {
  color: #38a169;
  border-bottom-color: #38a169;
}

.might-not-need {
  color: #d69e2e;
  border-bottom-color: #d69e2e;
}

.deduction-item {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e2e8f0;
}

.deduction-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.deduction-item input[type="range"] {
  width: 100%;
  margin: 10px 0;
}

/* Results Section */
.results-section {
  background: white;
  padding: 25px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.income-phase {
  background: #ebf8ff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
  border-left: 4px solid #4299e1;
}

.income-phase h3 {
  color: #2b6cb0;
  margin-bottom: 10px;
}

.income-phase ul {
  list-style: none;
  padding: 0;
}

.income-phase li {
  padding: 8px 0;
  color: #4a5568;
  position: relative;
  padding-left: 20px;
}

.income-phase li:before {
  content: "•";
  color: #4299e1;
  position: absolute;
  left: 0;
}

.breakdown {
  margin: 25px 0;
}

.breakdown h3 {
  color: #2d3748;
  margin-bottom: 15px;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
}

.breakdown-item.total {
  font-weight: bold;
  font-size: 1.2rem;
  color: #2d3748;
  border-bottom: 2px solid #667eea;
  margin-top: 10px;
}

/* Trust Layer */
.trust-layer {
  background: #f0fff4;
  padding: 20px;
  border-radius: 8px;
  margin: 25px 0;
  border-left: 4px solid #38a169;
}

.trust-layer h3, .trust-layer h4 {
  color: #276749;
  margin-bottom: 10px;
}

.trust-layer p {
  color: #4a5568;
  padding: 5px 0;
}

/* Emotional Summary */
.emotional-summary {
  background: #fffaf0;
  padding: 20px;
  border-radius: 8px;
  margin: 25px 0;
  border-left: 4px solid #d69e2e;
}

.emotional-summary h3 {
  color: #975a16;
  margin-bottom: 10px;
}

.emotional-summary p {
  color: #4a5568;
  font-size: 1.1rem;
  line-height: 1.6;
}

/* Buttons */
.reset-btn, .calculate-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: block;
  width: 100%;
  margin-top: 20px;
}

.reset-btn:hover, .calculate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

/* Compare Tab Styles */
.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 20px 0;
}

@media (max-width: 768px) {
  .two-column {
    grid-template-columns: 1fr;
  }
}

.column {
  background: #f8fafc;
  padding: 25px;
  border-radius: 12px;
}

.column h3 {
  color: #2d3748;
  margin-bottom: 20px;
  text-align: center;
}

.toggle-buttons {
  display: flex;
  gap: 15px;
  margin: 25px 0;
  flex-wrap: wrap;
}

.toggle-btn {
  background: #edf2f7;
  border: 2px solid #cbd5e0;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  min-width: 150px;
}

.toggle-btn:hover {
  background: #e2e8f0;
  border-color: #a0aec0;
}

/* Results in Compare Tab */
.raise-results, .scenario-results {
  background: white;
  padding: 25px;
  border-radius: 12px;
  margin: 25px 0;
  border: 1px solid #e2e8f0;
}

.result-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin: 10px 0;
  background: #f8fafc;
  border-radius: 8px;
}

.result-item.highlight {
  background: linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%);
  border-left: 4px solid #4299e1;
  font-weight: bold;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 25px 0;
}

.scenario-result {
  background: #f8fafc;
  padding: 20px;
  border-radius: 12px;
}

.scenario-result h4 {
  text-align: center;
  color: #2d3748;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #667eea;
}

.difference-highlight {
  background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%);
  padding: 20px;
  border-radius: 8px;
  margin: 25px 0;
  text-align: center;
  border: 2px solid #38a169;
}

.difference-highlight h4 {
  color: #276749;
  margin: 0;
}
</style>