<template>
  <div class="mortgage-calculator">
    <!-- Header -->
    <h1 class="main-title">Mortgage Calculator</h1>
    <p class="description">
      Our Mortgage Calculator helps you estimate your monthly home loan payment based on loan amount, interest rate, term length, and down payment. Instantly see how principal, interest, property taxes, and insurance affect your total monthly cost. You can also review a detailed amortization schedule to understand how much interest you’ll pay over time and how extra payments can reduce your loan term. Whether you're buying your first home or refinancing, this tool helps you plan with clarity and confidence.
    </p>

    <!-- Calculator Form - 附件1样式，移动端优化 -->
    <div class="calculator-form">
      <h2>Mortgage Calculator</h2>

      <!-- Home Price -->
      <div class="form-row">
        <label>Home Price</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input 
              type="number" 
              v-model.number="form.homePrice" 
              @input="calculate"
              min="0"
              step="1000"
              placeholder="400,000"
            />
          </div>
        </div>
      </div>

      <!-- Down Payment (Percentage) -->
      <div class="form-row">
        <label>Down Payment</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <input 
              type="number" 
              v-model.number="form.downPaymentPercent" 
              @input="calculate"
              min="0"
              max="100"
              step="0.5"
              placeholder="20"
            />
            <span class="percent-symbol">%</span>
          </div>
        </div>
      </div>

      <!-- Loan Term -->
      <div class="form-row">
        <label>Loan Term</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <input 
              type="number" 
              v-model.number="form.loanTerm" 
              @input="calculate"
              min="1"
              max="50"
              step="1"
              placeholder="30"
            />
            <span>years</span>
          </div>
        </div>
      </div>

      <!-- Interest Rate -->
      <div class="form-row">
        <label>Interest Rate</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <input 
              type="number" 
              step="0.001" 
              v-model.number="form.interestRate" 
              @input="calculate"
              min="0"
              max="30"
              placeholder="6.064"
            />
            <span class="percent-symbol">%</span>
          </div>
        </div>
      </div>

      <!-- Start Date -->
      <div class="form-row">
        <label>Start Date</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <input 
              type="month" 
              v-model="form.startDate" 
              @change="calculate"
            />
          </div>
        </div>
      </div>

      <!-- Include Taxes & Costs Below Checkbox -->
      <div class="form-row checkbox-row">
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            v-model="form.includeTaxes" 
            @change="calculate"
          />
          <span>✔ Include Taxes & Costs Below</span>
        </label>
      </div>

      <!-- Annual Tax & Cost Section (shown when checkbox is checked) -->
      <div v-if="form.includeTaxes" class="taxes-section">
        <h3>Annual Tax & Cost</h3>

        <!-- Property Taxes -->
        <div class="form-row">
          <label>Property Taxes</label>
          <div class="input-wrapper">
            <div class="input-with-symbol">
              <input 
                type="number" 
                step="0.1" 
                v-model.number="form.propertyTaxRate" 
                @input="calculate"
                min="0"
                max="5"
                placeholder="1.2"
              />
              <span class="percent-symbol">%</span>
            </div>
          </div>
        </div>

        <!-- Home Insurance -->
        <div class="form-row">
          <label>Home Insurance</label>
          <div class="input-wrapper">
            <div class="input-with-symbol">
              <span class="currency-symbol">$</span>
              <input 
                type="number" 
                v-model.number="form.homeInsurance" 
                @input="calculate"
                min="0"
                step="100"
                placeholder="1,500"
              />
            </div>
          </div>
        </div>

        <!-- PMI Insurance -->
        <div class="form-row">
          <label>PMI Insurance</label>
          <div class="input-wrapper">
            <div class="input-with-symbol">
              <span class="currency-symbol">$</span>
              <input 
                type="number" 
                v-model.number="form.pmiInsurance" 
                @input="calculate"
                min="0"
                step="50"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <!-- HOA Fee -->
        <div class="form-row">
          <label>HOA Fee</label>
          <div class="input-wrapper">
            <div class="input-with-symbol">
              <span class="currency-symbol">$</span>
              <input 
                type="number" 
                v-model.number="form.hoaFee" 
                @input="calculate"
                min="0"
                step="50"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <!-- Other Costs -->
        <div class="form-row">
          <label>Other Costs</label>
          <div class="input-wrapper">
            <div class="input-with-symbol">
              <span class="currency-symbol">$</span>
              <input 
                type="number" 
                v-model.number="form.otherCosts" 
                @input="calculate"
                min="0"
                step="100"
                placeholder="4,000"
              />
            </div>
          </div>
        </div>

        <!-- + More Options (placeholder) -->
        <div class="more-options">
          <a href="#" @click.prevent="showMoreOptions = !showMoreOptions">
            {{ showMoreOptions ? '− Less Options' : '+ More Options' }}
          </a>
        </div>

        <!-- Additional Options (hidden by default) -->
        <div v-if="showMoreOptions" class="more-options-section">
          <div class="form-row">
            <label>Annual Tax Increase</label>
            <div class="input-wrapper">
              <div class="input-with-symbol">
                <input 
                  type="number" 
                  step="0.1" 
                  v-model.number="form.taxIncreaseRate" 
                  @input="calculate"
                  min="0"
                  max="10"
                  placeholder="0"
                />
                <span class="percent-symbol">%</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <label>Annual Insurance Increase</label>
            <div class="input-wrapper">
              <div class="input-with-symbol">
                <input 
                  type="number" 
                  step="0.1" 
                  v-model.number="form.insuranceIncreaseRate" 
                  @input="calculate"
                  min="0"
                  max="10"
                  placeholder="0"
                />
                <span class="percent-symbol">%</span>
              </div>
            </div>
          </div>
          <div class="form-row">
            <label>Extra Monthly Payment</label>
            <div class="input-wrapper">
              <div class="input-with-symbol">
                <span class="currency-symbol">$</span>
                <input 
                  type="number" 
                  v-model.number="form.extraPayment" 
                  @input="calculate"
                  min="0"
                  step="50"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button @click="calculate">Calculate</button>
        <button class="clear" @click="clearForm">Clear</button>
      </div>
    </div>

    <!-- Results Section - 附件2样式，移动端优化 -->
    <div class="results-section" v-if="results.calculated">
      <h2>Results</h2>

      <!-- Monthly Pay Header - 移动端优化为卡片式 -->
      <div class="monthly-pay-header">
        <span class="monthly-pay-label">Monthly Pay:</span>
        <span class="monthly-pay-value">${{ formatMoney(results.totalMonthlyPayment) }}</span>
      </div>

      <!-- Monthly/Total Table - 移动端优化为卡片式布局 -->
      <div class="results-cards">
        <div class="result-card main-card">
          <div class="card-row header-row">
            <span></span>
            <span>Monthly</span>
            <span>Total</span>
          </div>
          <div class="card-row highlight-row">
            <span><strong>Mortgage Payment</strong></span>
            <span><strong>${{ formatMoney(results.monthlyPrincipalInterest) }}</strong></span>
            <span><strong>${{ formatMoney(results.totalPrincipalInterest) }}</strong></span>
          </div>
          <div v-if="form.includeTaxes" class="card-row">
            <span>Property Tax</span>
            <span>${{ formatMoney(results.monthlyPropertyTax) }}</span>
            <span>${{ formatMoney(results.totalPropertyTax) }}</span>
          </div>
          <div v-if="form.includeTaxes" class="card-row">
            <span>Home Insurance</span>
            <span>${{ formatMoney(results.monthlyHomeInsurance) }}</span>
            <span>${{ formatMoney(results.totalHomeInsurance) }}</span>
          </div>
          <div v-if="form.includeTaxes && form.pmiInsurance > 0" class="card-row">
            <span>PMI Insurance</span>
            <span>${{ formatMoney(results.monthlyPMI) }}</span>
            <span>${{ formatMoney(results.totalPMI) }}</span>
          </div>
          <div v-if="form.includeTaxes && form.hoaFee > 0" class="card-row">
            <span>HOA Fee</span>
            <span>${{ formatMoney(results.monthlyHOA) }}</span>
            <span>${{ formatMoney(results.totalHOA) }}</span>
          </div>
          <div v-if="form.includeTaxes && form.otherCosts > 0" class="card-row">
            <span>Other Costs</span>
            <span>${{ formatMoney(results.monthlyOtherCosts) }}</span>
            <span>${{ formatMoney(results.totalOtherCosts) }}</span>
          </div>
        </div>
      </div>

      <!-- Total Out-of-Pocket Summary - 移动端优化为网格布局 -->
      <div class="out-of-pocket">
        <h3>Total Out-of-Pocket</h3>
        <div class="out-of-pocket-grid">
          <div class="out-of-pocket-item">
            <span class="item-label">Principal & Interest:</span>
            <span class="item-value">${{ formatMoney(results.totalPrincipalInterest) }}</span>
          </div>
          <div class="out-of-pocket-item" v-if="form.includeTaxes">
            <span class="item-label">Property Taxes:</span>
            <span class="item-value">${{ formatMoney(results.totalPropertyTax) }}</span>
          </div>
          <div class="out-of-pocket-item" v-if="form.includeTaxes">
            <span class="item-label">Home Insurance:</span>
            <span class="item-value">${{ formatMoney(results.totalHomeInsurance) }}</span>
          </div>
          <div class="out-of-pocket-item" v-if="form.includeTaxes && form.pmiInsurance > 0">
            <span class="item-label">PMI Insurance:</span>
            <span class="item-value">${{ formatMoney(results.totalPMI) }}</span>
          </div>
          <div class="out-of-pocket-item" v-if="form.includeTaxes && form.hoaFee > 0">
            <span class="item-label">HOA Fee:</span>
            <span class="item-value">${{ formatMoney(results.totalHOA) }}</span>
          </div>
          <div class="out-of-pocket-item" v-if="form.includeTaxes && form.otherCosts > 0">
            <span class="item-label">Other Cost:</span>
            <span class="item-value">${{ formatMoney(results.totalOtherCosts) }}</span>
          </div>
        </div>
      </div>

      <!-- House Price Summary - 移动端优化为卡片式 -->
      <div class="house-price-summary">
        <h3>House Price</h3>
        <div class="summary-grid">
          <div class="summary-item">
            <span class="item-label">Loan Amount</span>
            <span class="item-value">${{ formatMoney(results.loanAmount) }}</span>
          </div>
          <div class="summary-item">
            <span class="item-label">Down Payment</span>
            <span class="item-value">${{ formatMoney(results.downPayment) }}</span>
          </div>
          <div class="summary-item">
            <span class="item-label">Total of {{ results.totalPayments }} Payments</span>
            <span class="item-value">${{ formatMoney(results.totalPrincipalInterest) }}</span>
          </div>
          <div class="summary-item">
            <span class="item-label">Total Interest</span>
            <span class="item-value">${{ formatMoney(results.totalInterest) }}</span>
          </div>
          <div class="summary-item">
            <span class="item-label">Payoff Date</span>
            <span class="item-value">{{ results.payoffDate }}</span>
          </div>
        </div>
      </div>

      <!-- Amortization Schedule Tabs - 附件3样式，移动端优化 -->
      <div class="amortization-section">
        <h3>Amortization schedule</h3>
        
        <div class="schedule-tabs">
          <button 
            class="tab-btn" 
            :class="{ active: scheduleView === 'annual' }"
            @click="scheduleView = 'annual'"
          >
            Annual
          </button>
          <button 
            class="tab-btn" 
            :class="{ active: scheduleView === 'monthly' }"
            @click="scheduleView = 'monthly'"
          >
            Monthly
          </button>
        </div>

        <!-- Annual Schedule Table - 移动端优化为水平滚动 -->
        <div v-if="scheduleView === 'annual'" class="schedule-table-wrapper">
          <div class="schedule-table">
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Date</th>
                  <th>Interest</th>
                  <th>Principal</th>
                  <th>Ending Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in results.annualSchedule" :key="index">
                  <td>{{ row.year }}</td>
                  <td>{{ row.dateRange }}</td>
                  <td>${{ formatMoney(row.interest) }}</td>
                  <td>${{ formatMoney(row.principal) }}</td>
                  <td>${{ formatMoney(row.endingBalance) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Monthly Schedule Table - 移动端优化为水平滚动，并限制显示行数 -->
        <div v-if="scheduleView === 'monthly'" class="schedule-table-wrapper">
          <div class="schedule-table">
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Date</th>
                  <th>Interest</th>
                  <th>Principal</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in displayedMonthlySchedule" :key="index">
                  <td>{{ row.year }}</td>
                  <td>{{ row.date }}</td>
                  <td>${{ formatMoney(row.interest) }}</td>
                  <td>${{ formatMoney(row.principal) }}</td>
                  <td>${{ formatMoney(row.endingBalance) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="results.monthlySchedule.length > 60" class="show-more">
            <button @click="showAllMonthly = !showAllMonthly" class="show-more-btn">
              {{ showAllMonthly ? 'Show Less' : 'Show All 360 Months' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Latest Mortgage Rates Link -->
    <div class="mortgage-rates">
      <span class="rates-label">Latest Mortgage Rates:</span>
      <a href="https://www.veteransunited.com/" target="_blank" rel="noopener noreferrer">veteransunited.com</a>
    </div>

    <!-- Related Tools - 移动端优化为垂直布局 -->
    <div class="related-tools">
      <span class="related-label">Related:</span>
      <div class="related-links">
        <a href="#">Amortization Calculator</a>
        <span class="sep">|</span>
        <a href="#">Mortgage Payoff Calculator</a>
      </div>
    </div>

    <!-- FAQ Section - 移动端优化间距和字体 -->
    <div class="faq-section">
      <h2>Mortgage Information – FAQ</h2>
        <div class="faq-item">
          <h3>How is my monthly mortgage payment calculated?</h3>
          <p>Your monthly mortgage payment is based on four main components:</p>
          <p class="highlight">👉 PITI = Principal + Interest + Taxes + Insurance</p>
          <ul>
            <li>Principal → the loan amount you repay</li>
            <li>Interest → cost of borrowing</li>
            <li>Taxes → property tax</li>
            <li>Insurance → homeowners insurance</li>
          </ul>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Loan Amount</td>
                  <td>$400,000</td>
                </tr>
                <tr>
                  <td>Interest Rate</td>
                  <td>6.5%</td>
                </tr>
                <tr>
                  <td>Term</td>
                  <td>30 years</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="highlight">👉 Monthly (principal + interest) ≈ $2,528</p>
          <p>Add:</p>
          <ul>
            <li>Property tax: ~$400/month</li>
            <li>Insurance: ~$150/month</li>
          </ul>
          <p class="highlight">👉 Total ≈ $3,078/month</p>
          <p><strong>💡 Insight:</strong><br>Many people only count 'loans' but ignore taxes and insurance, resulting in serious budget deviations.</p>
        </div>

        <div class="faq-item">
          <h3>How much house can I afford based on my income?</h3>
          <p>Most lenders use this rule:</p>
          <p class="highlight">👉 Housing cost ≤ 28–30% of gross monthly income</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Income</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Annual Salary</td>
                  <td>$120,000</td>
                </tr>
                <tr>
                  <td>Monthly Gross</td>
                  <td>$10,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="highlight">👉 Max housing budget ≈ $3,000/month</p>
          <p>At ~6.5% interest:</p>
          <p class="highlight">👉 You can afford roughly $400k–$500k home</p>
          <p><strong>⚠️ What people forget:</strong></p>
          <ul>
            <li>existing debt (car, student loans)</li>
            <li>taxes & insurance</li>
            <li>down payment size</li>
          </ul>
          <p><strong>💡 Insight:</strong><br>Income ≠ affordable housing prices, with a possible gap of $100k in between+</p>
        </div>

        <div class="faq-item">
          <h3>How much interest will I pay over the life of a mortgage?</h3>
          <p>This is where most people get shocked.</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Loan</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Loan Amount</td>
                  <td>$400,000</td>
                </tr>
                <tr>
                  <td>Rate</td>
                  <td>6.5%</td>
                </tr>
                <tr>
                  <td>Term</td>
                  <td>30 years</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="highlight">👉 Monthly payment ≈ $2,528</p>
          <p class="highlight">👉 Total paid ≈ $910,000</p>
          <p class="highlight">👉 Total interest ≈ $510,000</p>
          <p><strong>💡 Insight:</strong></p>
          <p class="highlight">👉 You may pay more interest than the house itself</p>
          <p>That's also why many people choose:</p>
          <ul>
            <li>extra payments</li>
            <li>refinance</li>
            <li>shorter terms</li>
          </ul>
        </div>

        <div class="faq-item">
          <h3>What happens if I make extra mortgage payments?</h3>
          <p>Extra payments go directly toward principal, which reduces future interest.</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>No extra payment</td>
                  <td>30 years</td>
                </tr>
                <tr>
                  <td>+$300/month</td>
                  <td>~23 years</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="highlight">👉 Interest saved ≈ $100,000+</p>
          <p><strong>💡 Real Impact:</strong></p>
          <ul>
            <li>pay off loan faster</li>
            <li>save massive interest</li>
            <li>build equity quicker</li>
          </ul>
          <p><strong>⚠️ Tip:</strong><br>Always confirm with lender:</p>
          <p class="highlight">👉 "Apply to principal only"</p>
        </div>

        <div class="faq-item">
          <h3>Should I choose a 15-year or 30-year mortgage?</h3>
          <p>This depends on your financial goals.</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Monthly</th>
                  <th>Total Interest</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>30-year ($400k @6.5%)</td>
                  <td>$2,528</td>
                  <td>~$510K</td>
                </tr>
                <tr>
                  <td>15-year ($400k @6%)</td>
                  <td>$3,375</td>
                  <td>~$207K</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><strong>Key Trade-off:</strong></p>
          <p class="highlight">👉 30-year:</p>
          <ul>
            <li>lower monthly payment</li>
            <li>higher total interest</li>
          </ul>
          <p class="highlight">👉 15-year:</p>
          <ul>
            <li>higher monthly payment</li>
            <li>huge interest savings</li>
          </ul>
          <p><strong>💡 Insight:</strong></p>
          <ul>
            <li>want flexibility → 30-year</li>
            <li>want maximum savings → 15-year</li>
          </ul>
        </div>
      <div class="faq-item">
        <h3>What is a mortgage and how does it work?</h3>
        <p>A mortgage is a loan secured by property, usually real estate property. Lenders define it as the money borrowed to pay for real estate. In essence, the lender helps the buyer pay the seller of a house, and the buyer agrees to repay the money borrowed over a period of time, usually 15 or 30 years in the U.S. Each month, a payment is made from buyer to lender. A portion of the monthly payment is called the principal, which is the original amount borrowed. The other portion is the interest, which is the cost paid to the lender for using the money. There may be an escrow account involved to cover the cost of property taxes and insurance. The buyer cannot be considered the full owner of the mortgaged property until the last monthly payment is made. In the U.S., the most common mortgage loan is the conventional 30-year fixed-interest loan, which represents 70% to 90% of all mortgages. Mortgages are how most people are able to own homes in the U.S.</p>
      </div>

      <div class="faq-item">
        <h3>What are the key components of a mortgage?</h3>
        <p>A mortgage usually includes the following key components. These are also the basic components of a mortgage calculator.</p>
        <ul>
          <li><strong>Loan amount</strong> — the amount borrowed from a lender or bank. In a mortgage, this amounts to the purchase price minus any down payment.</li>
          <li><strong>Down payment</strong> — the upfront payment of the purchase, usually a percentage of the total price. Typically, mortgage lenders want the borrower to put 20% or more as a down payment.</li>
          <li><strong>Loan term</strong> — the amount of time over which the loan must be repaid in full. Most fixed-rate mortgages are for 15, 20, or 30-year terms.</li>
          <li><strong>Interest rate</strong> — the percentage of the loan charged as a cost of borrowing. Mortgage interest rates are normally expressed in Annual Percentage Rate (APR).</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>What are the recurring costs associated with home ownership?</h3>
        <ul>
          <li><strong>Property taxes</strong> — a tax that property owners pay to governing authorities. On average, Americans pay about 1.1% of their property's value as property tax each year.</li>
          <li><strong>Home insurance</strong> — an insurance policy that protects the owner from accidents that may happen to their real estate properties.</li>
          <li><strong>Private mortgage insurance (PMI)</strong> — required if down payment is less than 20% of the property's value. Annual cost typically ranges from 0.3% to 1.9% of the loan amount.</li>
          <li><strong>HOA fee</strong> — a fee imposed on the property owner by a homeowner's association (HOA) for maintaining common areas.</li>
          <li><strong>Other costs</strong> — includes utilities, home maintenance costs, and anything pertaining to the general upkeep of the property.</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>What are the strategies for early mortgage repayment?</h3>
        <ul>
          <li><strong>Make extra payments</strong> — Any extra payments will decrease the loan balance, thereby decreasing interest and allowing the borrower to pay off the loan earlier.</li>
          <li><strong>Biweekly payments</strong> — The borrower pays half the monthly payment every two weeks, resulting in 13 months of mortgage repayments during the year.</li>
          <li><strong>Refinance to a loan with a shorter term</strong> — Refinancing involves taking out a new loan with a shorter term, typically resulting in a lower interest rate.</li>
        </ul>
      </div>
    </div>

     <!-- Calculator CTA -->
    <section class="section calculator-cta">
    <a href="/how-much-house-can-i-afford-blog" class="calculator-btn">
    More How Much House Can I Afford? blog →
    </a>
    </section>
    
  </div>
</template>

<script>
export default {
  name: 'MortgageCalculator',
  data() {
    return {
      scheduleView: 'annual',
      showMoreOptions: false,
      showAllMonthly: false,
      form: {
        homePrice: 400000,
        downPaymentPercent: 20,
        loanTerm: 30,
        interestRate: 6.064,
        startDate: '2026-03',
        includeTaxes: true,
        propertyTaxRate: 1.2,
        homeInsurance: 1500,
        pmiInsurance: 0,
        hoaFee: 0,
        otherCosts: 4000,
        taxIncreaseRate: 0,
        insuranceIncreaseRate: 0,
        extraPayment: 0
      },
      results: {
        calculated: false,
        totalMonthlyPayment: 0,
        monthlyPrincipalInterest: 0,
        totalPrincipalInterest: 0,
        monthlyPropertyTax: 0,
        totalPropertyTax: 0,
        monthlyHomeInsurance: 0,
        totalHomeInsurance: 0,
        monthlyPMI: 0,
        totalPMI: 0,
        monthlyHOA: 0,
        totalHOA: 0,
        monthlyOtherCosts: 0,
        totalOtherCosts: 0,
        loanAmount: 0,
        downPayment: 0,
        totalPayments: 0,
        totalInterest: 0,
        payoffDate: '',
        annualSchedule: [],
        monthlySchedule: []
      }
    };
  },
  computed: {
    displayedMonthlySchedule() {
      if (this.showAllMonthly) {
        return this.results.monthlySchedule;
      }
      // 移动端默认只显示前24个月，避免性能问题
      return this.results.monthlySchedule.slice(0, 24);
    }
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
      desc.content = 'Calculate your monthly mortgage payment with our free Mortgage Calculator. Estimate principal, interest, taxes, insurance (PITI), and view a full amortization schedule to plan your home purchase smarter in 2026.'
      
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
      // Parse form values
      const homePrice = this.form.homePrice || 0;
      const downPaymentPercent = (this.form.downPaymentPercent || 0) / 100;
      const loanTermYears = this.form.loanTerm || 1;
      const annualRate = (this.form.interestRate || 0) / 100;
      const startDateStr = this.form.startDate || '2026-03';
      
      // Calculate down payment and loan amount
      const downPayment = homePrice * downPaymentPercent;
      const loanAmount = homePrice - downPayment;
      
      // Monthly rate and number of payments
      const monthlyRate = annualRate / 12;
      const totalPayments = loanTermYears * 12;
      
      // Calculate monthly principal & interest payment
      let monthlyPI = 0;
      if (monthlyRate === 0 || loanAmount === 0) {
        monthlyPI = loanAmount / totalPayments;
      } else {
        const factor = Math.pow(1 + monthlyRate, totalPayments);
        monthlyPI = loanAmount * monthlyRate * factor / (factor - 1);
      }
      
      // Add extra payment
      const extraPayment = this.form.extraPayment || 0;
      const effectiveMonthlyPI = monthlyPI + extraPayment;
      
      // Calculate total principal & interest
      const totalPI = monthlyPI * totalPayments;
      const totalInterest = totalPI - loanAmount;
      
      // Parse start date
      const [startYear, startMonth] = startDateStr.split('-').map(Number);
      
      // Calculate monthly and total costs for taxes, insurance, etc.
      let monthlyPropertyTax = 0;
      let totalPropertyTax = 0;
      let monthlyHomeInsurance = 0;
      let totalHomeInsurance = 0;
      let monthlyPMI = 0;
      let totalPMI = 0;
      let monthlyHOA = 0;
      let totalHOA = 0;
      let monthlyOtherCosts = 0;
      let totalOtherCosts = 0;
      
      if (this.form.includeTaxes) {
        // Property tax (annual rate based on home price)
        const annualPropertyTax = homePrice * (this.form.propertyTaxRate / 100);
        monthlyPropertyTax = annualPropertyTax / 12;
        totalPropertyTax = annualPropertyTax * loanTermYears;
        
        // Home insurance
        monthlyHomeInsurance = this.form.homeInsurance / 12;
        totalHomeInsurance = this.form.homeInsurance * loanTermYears;
        
        // PMI insurance
        monthlyPMI = this.form.pmiInsurance / 12;
        totalPMI = this.form.pmiInsurance * loanTermYears;
        
        // HOA fee
        monthlyHOA = this.form.hoaFee / 12;
        totalHOA = this.form.hoaFee * loanTermYears;
        
        // Other costs
        monthlyOtherCosts = this.form.otherCosts / 12;
        totalOtherCosts = this.form.otherCosts * loanTermYears;
      }
      
      const totalMonthlyPayment = effectiveMonthlyPI + monthlyPropertyTax + monthlyHomeInsurance + 
                                  monthlyPMI + monthlyHOA + monthlyOtherCosts;
      
      // Calculate payoff date
      const payoffDate = new Date(startYear, startMonth - 1 + totalPayments, 1);
      const payoffDateStr = payoffDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      
      // Generate amortization schedules
      const annualSchedule = [];
      const monthlySchedule = [];
      
      let balance = loanAmount;
      let currentDate = new Date(startYear, startMonth - 1, 1);
      
      for (let month = 1; month <= totalPayments; month++) {
        if (balance <= 0) break;
        
        const interest = balance * monthlyRate;
        let principal = Math.min(monthlyPI - interest + extraPayment, balance);
        if (principal < 0) principal = 0;
        
        balance -= principal;
        if (balance < 0) balance = 0;
        
        const monthStr = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
        
        monthlySchedule.push({
          year: Math.ceil(month / 12),
          date: monthStr,
          interest,
          principal,
          endingBalance: balance
        });
        
        // Move to next month
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
      
      // Generate annual schedule by grouping monthly data
      const years = Math.ceil(monthlySchedule.length / 12);
      for (let year = 1; year <= years; year++) {
        const yearData = monthlySchedule.filter(item => item.year === year);
        if (yearData.length === 0) continue;
        
        const totalInterest = yearData.reduce((sum, item) => sum + item.interest, 0);
        const totalPrincipal = yearData.reduce((sum, item) => sum + item.principal, 0);
        const endingBalance = yearData[yearData.length - 1].endingBalance;
        
        const startMonth = yearData[0].date;
        const endMonth = yearData[yearData.length - 1].date;
        const dateRange = `${startMonth}–${endMonth.split(' ')[1]}`;
        
        annualSchedule.push({
          year,
          dateRange,
          interest: totalInterest,
          principal: totalPrincipal,
          endingBalance
        });
      }
      
      this.results = {
        calculated: true,
        totalMonthlyPayment,
        monthlyPrincipalInterest: effectiveMonthlyPI,
        totalPrincipalInterest: totalPI,
        monthlyPropertyTax,
        totalPropertyTax,
        monthlyHomeInsurance,
        totalHomeInsurance,
        monthlyPMI,
        totalPMI,
        monthlyHOA,
        totalHOA,
        monthlyOtherCosts,
        totalOtherCosts,
        loanAmount,
        downPayment,
        totalPayments,
        totalInterest,
        payoffDate: payoffDateStr,
        annualSchedule,
        monthlySchedule
      };
    },
    
    clearForm() {
      this.form = {
        homePrice: 400000,
        downPaymentPercent: 20,
        loanTerm: 30,
        interestRate: 6.064,
        startDate: '2026-03',
        includeTaxes: true,
        propertyTaxRate: 1.2,
        homeInsurance: 1500,
        pmiInsurance: 0,
        hoaFee: 0,
        otherCosts: 4000,
        taxIncreaseRate: 0,
        insuranceIncreaseRate: 0,
        extraPayment: 0
      };
      this.showMoreOptions = false;
      this.showAllMonthly = false;
      this.calculate();
    },
    
    formatMoney(value) {
      if (value === undefined || value === null || isNaN(value)) return '0.00';
      return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
  mounted() {
    document.title = 'Mortgage Calculator (2026) – Estimate Monthly Payment, Interest & Amortization';
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
.mortgage-calculator {
  max-width: 1200px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 30px -10px rgba(0, 34, 68, 0.1);
  padding: 20px 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #11212e;
}

/* 移动端基础字体调整 */
@media (max-width: 480px) {
  .mortgage-calculator {
    padding: 16px 12px;
    border-radius: 20px;
  }
}

.main-title {
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: #0b2b44;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.8rem;
  }
}

.description {
  font-size: 1rem;
  line-height: 1.5;
  background: #ecf3fa;
  padding: 16px 18px;
  border-radius: 24px;
  margin-bottom: 20px;
  color: #1c3a5c;
  border: 1px solid #c7daf0;
}

@media (max-width: 480px) {
  .description {
    font-size: 0.95rem;
    padding: 14px;
  }
}

.calculator-form {
  background: #f2f6fb;
  border-radius: 24px;
  padding: 20px 18px;
  border: 1px solid #cdddee;
  margin-bottom: 24px;
}

@media (max-width: 480px) {
  .calculator-form {
    padding: 16px 12px;
  }
}

.calculator-form h2 {
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 20px;
  color: #0b2b44;
}

@media (max-width: 480px) {
  .calculator-form h2 {
    font-size: 1.3rem;
    margin-bottom: 16px;
  }
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
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
  font-size: 0.95rem;
  min-width: 140px;
}

@media (min-width: 641px) {
  .form-row label {
    width: 160px;
    font-size: 1rem;
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

.currency-symbol,
.percent-symbol {
  font-weight: 500;
  color: #1a3349;
  font-size: 1rem;
  white-space: nowrap;
}

.input-with-symbol input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  padding: 8px 0;
  min-width: 0;
  width: 100%;
}

.input-with-symbol input:focus {
  outline: none;
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

.checkbox-row {
  margin-top: 4px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 500;
  color: #1a3349;
  font-size: 0.95rem;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.taxes-section {
  margin-top: 20px;
  padding: 16px;
  background: #e8f0fe;
  border-radius: 20px;
  border: 1px solid #c9d9ec;
}

.taxes-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #1e3a5f;
}

.more-options {
  margin: 12px 0 0;
  text-align: right;
}

.more-options a {
  color: #1f4a7a;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 4px 0;
  display: inline-block;
}

.more-options-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed #b6c9dd;
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
  padding: 12px 24px;
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

.results-section {
  background: #f8fafd;
  border-radius: 24px;
  padding: 20px 16px;
  border: 1px solid #dde7f0;
  margin-bottom: 24px;
}

.results-section h2 {
  font-size: 1.5rem;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 16px;
  color: #0b2b44;
}

.monthly-pay-header {
  background: white;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 20px;
  border-left: 4px solid #2563eb;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px;
}

.monthly-pay-label {
  font-weight: 500;
  color: #4b5f73;
  font-size: 1rem;
}

.monthly-pay-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f3a5f;
  word-break: break-word;
}

.results-cards {
  margin-bottom: 24px;
}

.result-card {
  background: white;
  border-radius: 16px;
  padding: 16px;
  border: 1px solid #d9e2ef;
  overflow-x: auto;
}

.card-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #e9eef3;
  font-size: 0.9rem;
}

.card-row:last-child {
  border-bottom: none;
}

.card-row.header-row {
  font-weight: 600;
  color: #1a3349;
  background: #f0f5fa;
  margin: -16px -16px 0;
  padding: 12px 16px;
  border-radius: 16px 16px 0 0;
  border-bottom: 2px solid #d4e2f0;
}

.card-row.highlight-row {
  background: #f0f7ff;
  font-weight: 600;
}

.card-row span {
  white-space: nowrap;
}

.card-row span:first-child {
  white-space: normal;
  word-break: break-word;
}

@media (max-width: 480px) {
  .card-row {
    grid-template-columns: 1fr auto;
    gap: 8px;
  }
  
  .card-row span:last-child {
    grid-column: span 2;
    text-align: right;
    margin-top: -4px;
  }
}

.out-of-pocket {
  background: white;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 20px;
  border: 1px solid #d9e2ef;
}

.out-of-pocket h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #1e3a5f;
}

.out-of-pocket-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.out-of-pocket-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px dotted #d4e2f0;
  font-size: 0.95rem;
  flex-wrap: wrap;
  gap: 8px;
}

.item-label {
  color: #4b5f73;
}

.item-value {
  font-weight: 600;
  color: #0b2b44;
  white-space: nowrap;
}

.house-price-summary {
  background: white;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 20px;
  border: 1px solid #d9e2ef;
}

.house-price-summary h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #1e3a5f;
}

.summary-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e9eef3;
  font-size: 0.95rem;
  flex-wrap: wrap;
  gap: 8px;
}

.summary-item:last-child {
  border-bottom: none;
}

.amortization-section {
  background: white;
  border-radius: 16px;
  padding: 16px;
  border: 1px solid #d9e2ef;
}

.amortization-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #1e3a5f;
}

.schedule-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  border-bottom: 2px solid #d4e2f0;
  padding-bottom: 8px;
}

.tab-btn {
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 0.95rem;
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

.schedule-table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 0 -4px;
  padding: 0 4px;
}

.schedule-table {
  min-width: 500px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.schedule-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.schedule-table th {
  background: #e1eaf3;
  padding: 10px 8px;
  text-align: left;
  font-weight: 600;
  color: #1a3349;
  white-space: nowrap;
}

.schedule-table td {
  padding: 8px;
  border-bottom: 1px solid #e9eef3;
  color: #2c405c;
  white-space: nowrap;
}

.schedule-table tr:last-child td {
  border-bottom: none;
}

.show-more {
  margin-top: 16px;
  text-align: center;
}

.show-more-btn {
  background: white;
  border: 1px solid #1f3a5f;
  color: #1f3a5f;
  padding: 8px 16px;
  font-size: 0.9rem;
  border-radius: 30px;
  cursor: pointer;
  width: auto;
  display: inline-block;
}

.show-more-btn:hover {
  background: #f0f5fa;
}

.mortgage-rates {
  margin: 24px 0 16px;
  padding: 12px 0;
  font-size: 0.95rem;
  color: #0b2b44;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.rates-label {
  font-weight: 600;
  color: #0f2a40;
}

.mortgage-rates a {
  color: #1f4a7a;
  text-decoration: none;
  word-break: break-word;
}

.related-tools {
  margin: 16px 0 20px;
  padding: 16px 0;
  border-top: 2px solid #dde3ea;
  border-bottom: 2px solid #dde3ea;
  font-size: 0.95rem;
}

.related-label {
  font-weight: 600;
  margin-right: 12px;
  color: #0f2a40;
  display: inline-block;
  margin-bottom: 8px;
}

.related-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.related-links a {
  color: #1f4a7a;
  text-decoration: none;
}

.sep {
  color: #9aa9b9;
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

@media (max-width: 480px) {
  .related-links {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .sep {
    display: none;
  }
}

.faq-section {
  margin-top: 24px;
  background: #f3f7fc;
  border-radius: 24px;
  padding: 20px 16px;
}

.faq-section h2 {
  font-size: 1.4rem;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 20px;
  color: #0b2b44;
}

.faq-item {
  background: white;
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #c9d9ec;
}

.faq-item h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 12px;
  color: #1e3a5f;
}

.faq-item p {
  margin: 8px 0;
  line-height: 1.5;
  color: #253c54;
  font-size: 0.95rem;
}

.faq-item ul {
  margin: 8px 0;
  padding-left: 20px;
}

.faq-item li {
  margin-bottom: 6px;
  line-height: 1.5;
  color: #2c405c;
  font-size: 0.95rem;
}

@media (max-width: 480px) {
  .faq-item {
    padding: 14px;
  }
  
  .faq-item h3 {
    font-size: 1rem;
  }
  
  .faq-item p,
  .faq-item li {
    font-size: 0.9rem;
  }
}
/* FAQ 项目样式 - 基础样式 */
.faq-item {
  background: white;
  border-radius: 24px;
  padding: 20px 24px;
  margin-bottom: 20px;
  border: 1px solid #c9d9ec;
  transition: box-shadow 0.2s ease;
}

.faq-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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

.faq-item .highlight {
  font-weight: 600;
  color: #1f3a5f;
  background: #ecf3fa;
  padding: 4px 8px;
  border-radius: 6px;
  display: inline-block;
  margin: 4px 0;
}

.faq-item ul {
  margin: 8px 0;
  padding-left: 24px;
}

.faq-item li {
  margin-bottom: 4px;
  line-height: 1.6;
  color: #2c405c;
  font-size: 0.95rem;
}

.faq-item strong {
  color: #1e3a5f;
}

/* 表格容器样式 */
.table-wrap {
  overflow-x: auto;
  margin: 1rem 0;
  background: #f9fcff;
  border-radius: 12px;
  border: 1px solid #cbd9ec;
}

.table-wrap table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  min-width: 280px;
}

.table-wrap th {
  background-color: #e2edfd;
  color: #0a3455;
  font-weight: 600;
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 2px solid #cbd5e0;
}

.table-wrap td {
  padding: 0.7rem 1rem;
  border-bottom: 1px solid #c8daf2;
  color: #2c405c;
}

.table-wrap tr:last-child td {
  border-bottom: none;
}

/* 表格内数字强调样式 - 新增 */
.table-wrap td:last-child {
  font-weight: 500;
  color: #1f3a5f;
}

/* 表格内货币数值样式 - 新增 */
.table-wrap td[data-value*="$"] {
  font-family: 'Courier New', monospace;
}

/* 警告框样式 - 新增 */
.faq-item .warning {
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 8px 12px;
  border-radius: 8px;
  margin: 12px 0;
}

/* 提示框样式 - 新增 */
.faq-item .tip-box {
  background: #e8f0fe;
  border-left: 4px solid #1f3a5f;
  padding: 8px 12px;
  border-radius: 8px;
  margin: 12px 0;
}

/* 响应式布局 - 移动端适配 */
@media (max-width: 768px) {
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
  
  .table-wrap {
    margin: 0.75rem 0;
  }
  
  .table-wrap th,
  .table-wrap td {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }
  
  .faq-item .highlight {
    font-size: 0.85rem;
    padding: 3px 6px;
  }
}

/* 桌面端优化 - 大屏幕 */
@media (min-width: 1200px) {
  .faq-item {
    padding: 24px 28px;
  }
  
  .faq-item h3 {
    font-size: 1.3rem;
  }
  
  .faq-item p,
  .faq-item li {
    font-size: 1rem;
  }
}

/* 打印样式 - 可选 */
@media print {
  .faq-item {
    break-inside: avoid;
    border: 1px solid #ddd;
    box-shadow: none;
  }
  
  .faq-item .highlight {
    background: none;
    border: 1px solid #ccc;
  }
}
</style>
