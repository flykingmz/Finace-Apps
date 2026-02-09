<template>
  <div class="calculator-container">
   <!-- Google Ads Section (hidden by default) -->
    <div class="ads-section" v-if="showAds">
      <!-- Google Ads placeholder -->
      <div class="ads-container">
        <p>Google Ads Section (Hidden by default)</p>
      </div>
    </div>
    <!-- Header Section -->
    <div class="header">
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

      <!-- FAQ Section - Always Visible -->
      <div class="faq-section">
        <div class="faq-header">
          <h2>Take-Home Paycheck Calculator – FAQ & Understanding Guide</h2>
          <p class="faq-subtitle">This guide explains why your paycheck looks the way it does, not just how the numbers are calculated.</p>
        </div>

        <div class="faq-content">
          <div class="faq-item">
            <h3>1. Why is my take-home pay so much lower than my salary?</h3>
            <p class="faq-short-answer"><strong>Short answer:</strong> Because not all deductions are optional, and not all deductions work the way people expect.</p>
            <p>Your paycheck is affected by multiple layers of deductions, including:</p>
            <ul>
              <li>Federal income tax</li>
              <li>State and local taxes</li>
              <li>Social Security and Medicare (FICA)</li>
              <li>Employer benefits (insurance, retirement plans, etc.)</li>
            </ul>
            <p>Many people assume that everything deducted is "tax", but in reality, only part of it is. That's why our calculator separates deductions into:</p>
            <ul class="deduction-types">
              <li><strong>Unavoidable deductions</strong> (required by law)</li>
              <li><strong>Adjustable deductions</strong> (you control them)</li>
              <li><strong>Context-dependent deductions</strong> (may not apply to you yet)</li>
            </ul>
            <p>This helps you understand what you can't change vs. what you actually can.</p>
          </div>

          <div class="faq-item">
            <h3>2. What deductions are mandatory vs adjustable?</h3>
            <p>Not all paycheck deductions are equal.</p>
            
            <div class="deduction-breakdown">
              <div class="deduction-category">
                <h4 class="cannot-avoid">Mandatory (You cannot avoid these)</h4>
                <p>These apply regardless of employer or benefits:</p>
                <ul>
                  <li>Federal income tax</li>
                  <li>Social Security</li>
                  <li>Medicare</li>
                  <li>Most state income taxes</li>
                </ul>
              </div>
              
              <div class="deduction-category">
                <h4 class="can-adjust">Adjustable (You can control these)</h4>
                <p>These depend on your personal choices:</p>
                <ul>
                  <li>401(k) or retirement contribution %</li>
                  <li>HSA or FSA contributions</li>
                  <li>Certain insurance plans</li>
                </ul>
              </div>
              
              <div class="deduction-category">
                <h4 class="might-not-need">Situational (You may not need these yet)</h4>
                <p>These only matter under specific conditions:</p>
                <ul>
                  <li>Extra tax withholding</li>
                  <li>Additional benefits that don't fit your income level</li>
                  <li>Deductions with minimal impact at lower incomes</li>
                </ul>
              </div>
            </div>
            <p>Understanding this distinction removes a lot of confusion and frustration.</p>
          </div>

          <div class="faq-item">
            <h3>3. I got a raise — why doesn't it feel like one?</h3>
            <p>This is one of the most common and most frustrating paycheck surprises.</p>
            <p>A salary increase does not translate 1:1 into take-home pay because:</p>
            <ul>
              <li>Higher income can push part of your salary into a higher tax bracket</li>
              <li>Some deductions scale with income</li>
              <li>Bonuses are often taxed differently than regular pay</li>
            </ul>
            <p>That's why we include a <strong>Raise Reality Check</strong>, showing:</p>
            <ul>
              <li>Gross increase vs net increase</li>
              <li>How much extra you actually take home per paycheck</li>
              <li>The real hourly or monthly impact of a raise</li>
            </ul>
            <p>This helps answer the real question: "Did this raise actually improve my life?"</p>
          </div>

          <div class="faq-item">
            <h3>4. Do I need to care about taxes and deductions at my income level?</h3>
            <p><strong>Not always — and that's important.</strong></p>
            <p>Many calculators overwhelm users by showing every possible tax rule, even when it doesn't materially affect them yet.</p>
            <p>We highlight:</p>
            <ul>
              <li>Which deductions matter at your income level</li>
              <li>Which optimizations are not worth thinking about yet</li>
              <li>When certain thresholds start to matter</li>
            </ul>
            <p>This prevents premature optimization and helps you focus only on what actually impacts your take-home pay right now.</p>
          </div>

          <div class="faq-item">
            <h3>5. Can I trust this result if my situation isn't "simple"?</h3>
            <p>We designed this calculator for real-world scenarios, not ideal ones.</p>
            <p>It works for:</p>
            <ul>
              <li>W-2 employees</li>
              <li>Different states and local tax systems</li>
              <li>Mid-year job changes</li>
              <li>Bonuses and irregular pay</li>
              <li>Common benefit structures</li>
            </ul>
            <p>That said, this tool is designed for <strong>clarity and planning</strong>, not for filing your taxes.</p>
            <p>If your situation involves:</p>
            <ul>
              <li>Multiple countries</li>
              <li>Complex business income</li>
              <li>Special tax elections</li>
            </ul>
            <p>You should treat this as a <strong>directional tool</strong>, not a legal or tax filing replacement.</p>
          </div>

          <div class="faq-item">
            <h3>6. What should I do after seeing my paycheck breakdown?</h3>
            <p>A paycheck calculator shouldn't leave you with just a number.</p>
            <p>After using this tool, you should be able to:</p>
            <ul>
              <li>Identify which deductions are worth adjusting</li>
              <li>Understand whether your state choice matters</li>
              <li>See if increasing retirement contributions makes sense</li>
              <li>Decide whether a salary change is actually meaningful</li>
            </ul>
            <p>Our goal is not to tell you what to do, but to help you stop guessing and start making informed decisions.</p>
          </div>

          <div class="faq-footer">
            <div class="what-is">
              <h4>What this calculator is (and is not)</h4>
              <div class="two-column-faq">
                <div class="column">
                  <h5>This calculator is:</h5>
                  <ul>
                    <li>A paycheck clarity tool</li>
                    <li>A decision-support tool</li>
                    <li>A way to understand why your money ends up where it does</li>
                  </ul>
                </div>
                <div class="column">
                  <h5>This calculator is not:</h5>
                  <ul>
                    <li>A tax filing service</li>
                    <li>A legal or tax advisory replacement</li>
                    <li>A one-size-fits-all solution for edge cases</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="why-built">
              <h4>Why we built it this way</h4>
              <p class="quote">Most paycheck tools focus on math.<br>We focus on understanding.</p>
              <p class="emphasis">Because the real problem isn't calculating your paycheck — it's trusting it.</p>
            </div>
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
      
      // State tax data from JSON (完整数据，这里只展示部分)
      stateData: {
        "country": "United States",
        "currency": "USD",
        "tax_year": "2025-2026",
        "states": [
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
    formatNumber(num) {
      return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    },
    
    getStateName(code) {
      const state = this.stateData.states.find(s => s.code === code)
      return state ? state.state : 'Unknown'
    },
    
    getStateRate(code) {
      const state = this.stateData.states.find(s => s.code === code)
      if (!state) return 0
      
      if (state.type === 'none') return 0
      if (state.type === 'flat') return state.rate_min
      
      // For progressive states, use a simplified progressive calculation
      return (state.rate_min + state.rate_max) / 3
    },
    
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
    
    calculateRaise() {
      const currentTakeHome = this.calculateTakeHome(this.currentSalary, this.currentState, 'single')
      const newTakeHome = this.calculateTakeHome(this.newSalary, this.newState, 'single')
      
      const grossIncrease = this.newSalary - this.currentSalary
      const netIncrease = newTakeHome - currentTakeHome
      
      this.raiseResult = {
        grossIncrease,
        netIncrease,
        perPaycheck: netIncrease / 26,
        perMonth: netIncrease / 12,
        perHour: netIncrease / 2080
      }
    },
    
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

/* FAQ Section Styles */
.faq-section {
  background: #f8fafc;
  padding: 40px 30px;
  margin-top: 40px;
  border-top: 3px solid #667eea;
}

.faq-header {
  text-align: center;
  margin-bottom: 40px;
}

.faq-header h2 {
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.faq-subtitle {
  font-size: 1.2rem;
  color: #64748b;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.faq-content {
  max-width: 1000px;
  margin: 0 auto;
}

.faq-item {
  background: white;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #667eea;
}

.faq-item h3 {
  color: #2d3748;
  font-size: 1.5rem;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e2e8f0;
}

.faq-short-answer {
  background: #ebf8ff;
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0;
  border-left: 4px solid #4299e1;
}

.faq-item p {
  color: #4a5568;
  line-height: 1.7;
  margin: 15px 0;
}

.faq-item ul {
  margin: 15px 0;
  padding-left: 25px;
}

.faq-item li {
  color: #4a5568;
  line-height: 1.6;
  margin: 8px 0;
}

.deduction-types {
  background: #f0fff4;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.deduction-types li {
  padding: 8px 0;
  position: relative;
  padding-left: 25px;
}

.deduction-types li:before {
  content: "✓";
  color: #38a169;
  position: absolute;
  left: 0;
  font-weight: bold;
}

.deduction-breakdown {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 25px 0;
}

.deduction-category {
  background: #f8fafc;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
}

.deduction-category h4 {
  padding-bottom: 10px;
  margin-bottom: 15px;
  border-bottom: 2px solid;
}

.faq-footer {
  background: white;
  padding: 30px;
  border-radius: 12px;
  margin-top: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.what-is h4, .why-built h4 {
  color: #2d3748;
  font-size: 1.4rem;
  margin-bottom: 20px;
  text-align: center;
}

.two-column-faq {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 25px 0;
}

@media (max-width: 768px) {
  .two-column-faq {
    grid-template-columns: 1fr;
  }
}

.two-column-faq .column {
  background: #f8fafc;
  padding: 20px;
  border-radius: 8px;
}

.two-column-faq h5 {
  color: #4a5568;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.two-column-faq ul {
  padding-left: 20px;
}

.two-column-faq li {
  color: #4a5568;
  margin: 8px 0;
  position: relative;
  padding-left: 10px;
}

.two-column-faq li:before {
  content: "•";
  color: #667eea;
  position: absolute;
  left: 0;
}

.why-built {
  text-align: center;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 2px solid #e2e8f0;
}

.quote {
  font-size: 1.3rem;
  color: #4a5568;
  font-style: italic;
  margin: 20px 0;
  line-height: 1.6;
}

.emphasis {
  font-size: 1.4rem;
  color: #2d3748;
  font-weight: 600;
  margin-top: 20px;
  line-height: 1.5;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .calculator-form, .compare-form {
    grid-template-columns: 1fr;
  }
  
  .two-column {
    grid-template-columns: 1fr;
  }
  
  .comparison-grid {
    grid-template-columns: 1fr;
  }
  
  .two-column-faq {
    grid-template-columns: 1fr;
  }
  
  .faq-item {
    padding: 20px;
  }
  
  .deduction-breakdown {
    grid-template-columns: 1fr;
  }
  
  .title h1 {
    font-size: 2rem;
  }
  
  .faq-header h2 {
    font-size: 1.5rem;
  }
}
/* Ads Section */
.ads-section {
  background-color: #f5f5f5;
  padding: 10px;
  text-align: center;
  margin-bottom: 20px;
  border: 1px dashed #ccc;
}

.ads-container {
  min-height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden; /* 保留空间但不可见 */
}
</style>