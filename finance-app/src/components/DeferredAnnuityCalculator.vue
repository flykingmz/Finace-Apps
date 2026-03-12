<template>
  <div class="deferred-annuity-calculator">
    <!-- Header -->
    <h1 class="main-title">Deferred Annuity Calculator: Plan Your Retirement Income</h1>
    <p class="description">
      Planning for retirement can be challenging, but a deferred annuity helps secure your future income. Our Deferred Annuity Calculator allows you to estimate your potential payouts based on your investment amount, contribution period, and expected interest rate. Quickly compare different deferred annuity options and make informed decisions to maximize your retirement savings.
    </p>

    <!-- Calculator Form - 附件1和2样式合并 -->
    <div class="calculator-form">
      <h2>How I Want to Calculate Lifetime Income</h2>

      <!-- 计算方式选择 -->
      <div class="calculation-type">
        <label class="radio-label">
          <input
            type="radio"
            value="contribute"
            v-model="form.calculationType"
            @change="calculate"
          />
          <span>Amount I contribute</span>
        </label>
        <label class="radio-label">
          <input
            type="radio"
            value="receive"
            v-model="form.calculationType"
            @change="calculate"
          />
          <span>Amount I receive each month</span>
        </label>
      </div>

      <!-- Amount Input -->
      <div class="form-row">
        <label>Amount</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input
              type="number"
              v-model.number="form.amount"
              @input="calculate"
              min="0"
              step="1000"
              placeholder="1000"
            />
          </div>
        </div>
      </div>

      <!-- Start Date -->
      <div class="form-row">
        <label>Start Date</label>
        <div class="input-wrapper">
          <input
            type="date"
            v-model="form.startDate"
            @change="calculate"
            class="date-input"
          />
        </div>
      </div>

      <!-- Funding Source -->
      <div class="form-row radio-row">
        <label>Funding Source</label>
        <div class="radio-group">
          <label class="radio-label">
            <input
              type="radio"
              value="qualified"
              v-model="form.fundingSource"
              @change="calculate"
            />
            <span>Qualified</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              value="nonqualified"
              v-model="form.fundingSource"
              @change="calculate"
            />
            <span>Nonqualified</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              value="qlac"
              v-model="form.fundingSource"
              @change="calculate"
            />
            <span>QLAC</span>
          </label>
        </div>
      </div>

      <!-- About Me Section -->
      <h3>About Me</h3>

      <div class="form-row">
        <label>Age</label>
        <div class="input-wrapper">
          <input
            type="number"
            v-model.number="form.age"
            @input="calculate"
            min="0"
            max="100"
            step="1"
            placeholder="65"
          />
        </div>
      </div>

      <div class="form-row radio-row">
        <label>Gender</label>
        <div class="radio-group">
          <label class="radio-label">
            <input
              type="radio"
              value="male"
              v-model="form.gender"
              @change="calculate"
            />
            <span>Male</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              value="female"
              v-model="form.gender"
              @change="calculate"
            />
            <span>Female</span>
          </label>
        </div>
      </div>

      <!-- State Selection -->
      <div class="form-row">
        <label>State</label>
        <div class="input-wrapper">
          <select v-model="form.state" @change="calculate" class="state-select">
            <option v-for="state in states" :key="state.abbr" :value="state.abbr">
              {{ state.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Joint Information Section -->
      <div class="joint-section">
        <label class="checkbox-label">
          <input
            type="checkbox"
            v-model="form.includeJoint"
            @change="calculate"
          />
          <span>Add guaranteed income for an additional person</span>
        </label>

        <div v-if="form.includeJoint" class="joint-details">
          <div class="form-row">
            <label>Relationship</label>
            <div class="radio-group">
              <label class="radio-label">
                <input
                  type="radio"
                  value="spouse"
                  v-model="form.jointRelationship"
                  @change="calculate"
                />
                <span>Spouse</span>
              </label>
              <label class="radio-label">
                <input
                  type="radio"
                  value="family"
                  v-model="form.jointRelationship"
                  @change="calculate"
                />
                <span>Family</span>
              </label>
              <label class="radio-label">
                <input
                  type="radio"
                  value="other"
                  v-model="form.jointRelationship"
                  @change="calculate"
                />
                <span>Other</span>
              </label>
            </div>
          </div>

          <div class="form-row">
            <label>Age</label>
            <div class="input-wrapper">
              <input
                type="number"
                v-model.number="form.jointAge"
                @input="calculate"
                min="0"
                max="100"
                step="1"
                placeholder="65"
              />
            </div>
          </div>

          <div class="form-row radio-row">
            <label>Gender</label>
            <div class="radio-group">
              <label class="radio-label">
                <input
                  type="radio"
                  value="male"
                  v-model="form.jointGender"
                  @change="calculate"
                />
                <span>Male</span>
              </label>
              <label class="radio-label">
                <input
                  type="radio"
                  value="female"
                  v-model="form.jointGender"
                  @change="calculate"
                />
                <span>Female</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button @click="calculate">Calculate</button>
        <button class="clear" @click="clearForm">Clear</button>
      </div>
    </div>

    <!-- Results Section - 附件3样式 -->
    <div class="results-section" v-if="results.calculated">
      <div v-if="form.calculationType === 'contribute'" class="result-message">
        <p>
          For your contribution of <strong>${{ formatMoney(form.amount) }}</strong>, 
          you could receive <strong>${{ formatMoney(results.monthlyPayout) }}</strong> 
          a month starting <strong>{{ formatDate(form.startDate) }}</strong>.
        </p>
      </div>
      <div v-else class="result-message">
        <p>
          To receive <strong>${{ formatMoney(form.amount) }}</strong> per month starting 
          <strong>{{ formatDate(form.startDate) }}</strong>, you would need to contribute 
          <strong>${{ formatMoney(results.requiredPremium) }}</strong>.
        </p>
      </div>

      <div class="payout-card">
        <div class="payout-label">Guaranteed Monthly Payout</div>
        <div class="payout-value">${{ formatMoney(results.monthlyPayout) }}</div>
      </div>

      <div class="stability-link">
        <a href="#" class="stability-link">Concerned about stability? Explore guaranteed payouts →</a>
      </div>

      <div class="income-title">Total Lifetime Income with Cash Refund*</div>
      <div class="income-date">Starting {{ formatDate(form.startDate) }}</div>

      <div class="income-chart">
        <div class="income-item">
          <span class="income-label">${{ formatMoney(form.amount) }}</span>
          <span class="income-desc">Single Premium</span>
        </div>
        <div class="income-item">
          <span class="income-label">${{ formatMoney(results.income10Years) }}</span>
          <span class="income-desc">Income in 10 years</span>
        </div>
        <div class="income-item">
          <span class="income-label">${{ formatMoney(results.income20Years) }}</span>
          <span class="income-desc">Income in 20 years</span>
        </div>
        <div class="income-item">
          <span class="income-label">${{ formatMoney(results.income30Years) }}</span>
          <span class="income-desc">Income in 30 years</span>
        </div>
      </div>
    </div>

    <!-- Related Tools -->
    <div class="related-tools">
      <span class="related-label">Related:</span>
      <a href="/annuity">Annuity Calculator</a> <span class="sep">|</span>
      <a href="/annuity-payout">Annuity Payout Calculator</a>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h2>Deferred Annuity Information – FAQ</h2>

      <div class="faq-item">
        <h3>What Is a Deferred Income Annuity?</h3>
        <p>A deferred income annuity lets you convert a lump-sum payment now into a guaranteed, steady stream of income for the future. You give an insurance company a sum of money today, and in return, they promise to pay you a fixed amount later in life, typically starting when you retire.</p>
      </div>

      <div class="faq-item">
        <h3>How Do I Calculate My Estimated Future Annuity Payments?</h3>
        <p>See how a single premium can become a steady, guaranteed income stream for retirement. Our Deferred Income Annuity Calculator estimates your potential monthly annuity payments based on your premium, current age, and when you want payments to start.</p>
        <p>To get started, complete the following information:</p>
        <p><strong>How I Want to Calculate Lifetime Income:</strong> Select an option for calculation.</p>
        <ul>
          <li><strong>Amount I Contribute:</strong> Calculates the estimated monthly payment based on the total dollar amount you intend to contribute to the annuity.</li>
          <li><strong>Amount I Receive Each Month:</strong> Calculates the deposit required to attain your targeted monthly income payout.</li>
        </ul>
        <p><strong>Amount:</strong> Input the amount in dollars for your selected calculation.</p>
        <p><strong>Start Date:</strong> Enter the date when you want your payment to start. Must be at least 13 months and no more than 40 years from the illustration's effective date.</p>
        <p><strong>Funding Source:</strong> Select the funding type for the annuity.</p>
        <ul>
          <li><strong>Qualified</strong> refers to funds from accounts, such as retirement savings plans, that receive special tax treatment under IRS rules with contributions made using pre-tax dollars.</li>
          <li><strong>Nonqualified</strong> refers to funds from regular savings or investments with already paid taxes, not from a tax-advantaged retirement account.</li>
          <li><strong>QLAC</strong> stands for Qualified Longevity Annuity Contract. A deferred income annuity purchased within a retirement account that is excluded from the balance used to calculate Required Minimum Distributions (RMDs). This exclusion lowers the owner's annual RMD from the remaining account, reducing their immediate tax bill and allowing the QLAC funds to continue growing tax-deferred.</li>
        </ul>
        <p><strong>Age:</strong> Enter the age at which you intend to buy the income annuity.</p>
        <p><strong>Gender:</strong> Select Male or Female.</p>
        <p><strong>State:</strong> Select your state of residence.</p>
        <p><strong>Add guaranteed income for an additional person:</strong> Select to include a joint annuitant in your estimate.</p>
        <p><strong>Relationship:</strong> Choose the relationship type with the additional person: spouse, family, or other.</p>
        <p><strong>Age:</strong> Enter the individual's age at the time of buying the income annuity.</p>
        <p><strong>Gender:</strong> Select Male or Female.</p>
        <p>Click <strong>Calculate</strong> to produce your estimate.</p>
      </div>

      <div class="faq-item">
        <h3>How Do I Understand My Annuity Calculator Results?</h3>
        <p>Based upon the selected calculation, the results display either:</p>
        <ol>
          <li>Your estimated guaranteed monthly payout based upon your contribution amount.</li>
          <li>Your estimated single premium required to achieve the desired monthly payout.</li>
        </ol>
        <p><strong>Note:</strong> Keep in mind that these amounts will vary based on the additional inputs.</p>
        <p>The calculation is based on the Life with Cash Refund payout option, starting on the date you entered.</p>
        <p>The chart at the bottom represents the Single Premium contributed and the Total Lifetime Annuity Income Estimate over select periods of 10 years, 20 years, and 30 years.</p>
      </div>

      <div class="faq-item">
        <h3>What Are the Accumulation Phase Factors?</h3>
        <p><strong>Initial Premium and Contributions:</strong> The amount you invest upfront or contribute over time directly impacts the eventual payout. Larger contributions mean larger payouts.</p>
        <p><strong>Accumulation Period Length:</strong> The age at which you purchase the annuity significantly impacts its outcome. The longer the deferral period before payouts begin, the more time for growth, which increases the eventual payout amount.</p>
        <p><strong>Interest Rate/Growth Rate:</strong> The credited interest rate or investment returns during the accumulation phase significantly affect the account value that will fund your payouts.</p>
        <p><strong>Fees and Expenses:</strong> Administrative fees, mortality and expense charges, and investment management fees reduce the accumulating value.</p>
      </div>

      <div class="faq-item">
        <h3>What Are the Payout Phase Factors?</h3>
        <p><strong>Age at Annuitization:</strong> Starting payouts at an older age results in higher periodic payments since the insurance company expects to make payments over a shorter lifespan.</p>
        <p><strong>Payout Option Selected:</strong> Different options produce different payment amounts:</p>
        <ul>
          <li><strong>Life annuity:</strong> Provides payments for as long as you live. Payments stop upon your death.</li>
          <li><strong>Life annuity with period certain:</strong> Payments are made for a predetermined duration (such as 10 or 20 years). Should you pass away before the term concludes, the remaining amount is given to your beneficiaries.</li>
          <li><strong>Joint and survivor annuity:</strong> Provides payments for the lifetimes of you and a designated beneficiary (e.g., a spouse). The payouts continue until both individuals have passed away.</li>
          <li><strong>Life with Cash Refund:</strong> This is an annuity option where regular payments are made to the annuitant for their lifetime, and upon their death, any remaining balance of the initial premium (minus the total payments made) is refunded to a designated beneficiary. <em>Illustrated above.</em></li>
        </ul>
        <p><strong>Current Interest Rates:</strong> Prevailing interest rates at the time you annuitize affect payout calculations. Higher rates generally mean higher payouts.</p>
        <p><strong>Life Expectancy Tables:</strong> Insurance companies use mortality tables to estimate how long they'll need to make payments, which affects the payout amount.</p>
      </div>

      <div class="faq-item">
        <h3>What Additional Considerations Should I Keep in Mind?</h3>
        <p><strong>Inflation Protection:</strong> Cost-of-living adjustments reduce initial payments but provide protection against inflation.</p>
        <p><strong>Tax Treatment:</strong> Part of each payment may be taxable income vs. return of principal, affecting net value.</p>
        <p><strong>Surrender Charges:</strong> If you withdraw your funds or surrender the contract during the deferral period, you may face significant surrender charges that reduce the available value.</p>
        <p><strong>Health and Longevity:</strong> Your health and expected longevity should influence your decision. If you have health concerns that may reduce your life expectancy, consider other retirement income strategies in addition to an immediate annuity.</p>
        <p><strong>Income Needs:</strong> Assess your overall retirement income stream needs and how a lifetime income annuity contract fits into your broader financial plan.</p>
        <p><strong>Company Financial Strength:</strong> Choose a company with strong ratings from major agencies to ensure its financial stability and ability to meet long-term payment obligations.</p>
        <p>Calculating your deferred annuity payout involves considering multiple personal and financial factors. Understanding these considerations can help you make an informed decision that aligns with your retirement goals and helps provide the financial security you need.</p>
        <p>Consider consulting with a financial advisor to tailor the annuity to your overall retirement plan.</p>
      </div>

      <div class="faq-item">
        <h3>What is QLAC (Qualified Longevity Annuity Contract)?</h3>
        <p>A QLAC stands for Qualified Longevity Annuity Contract. It is a deferred income annuity purchased within a retirement account that is excluded from the balance used to calculate Required Minimum Distributions (RMDs). This exclusion lowers the owner's annual RMD from the remaining account, reducing their immediate tax bill and allowing the QLAC funds to continue growing tax-deferred.</p>
      </div>

      <div class="faq-item">
        <h3>What is the difference between Qualified and Nonqualified annuities?</h3>
        <p><strong>Qualified</strong> refers to funds from accounts, such as retirement savings plans, that receive special tax treatment under IRS rules with contributions made using pre-tax dollars. <strong>Nonqualified</strong> refers to funds from regular savings or investments with already paid taxes, not from a tax-advantaged retirement account.</p>
      </div>

      <div class="faq-item">
        <h3>How does my state of residence affect annuity payouts?</h3>
        <p>Different states have different insurance regulations, premium tax rates, and rules that can affect annuity payouts. Some states offer tax advantages for annuity investments, while others may have higher premium taxes. Insurance companies adjust payout rates based on the regulatory environment and competitive landscape in each state.</p>
      </div>

      <div class="faq-item">
        <h3>How does gender affect annuity payout calculations?</h3>
        <p>Insurance companies use life expectancy tables that differentiate by gender because statistically, women live longer than men on average. Since payouts are designed to last for your lifetime, a longer life expectancy typically results in smaller periodic payments (since the same total amount is spread over more years), while a shorter life expectancy can result in larger periodic payments.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeferredAnnuityCalculator',
  data() {
    return {
      // 美国所有州份
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
        calculationType: 'contribute',
        amount: 1000,
        startDate: '2032-03-25',
        fundingSource: 'nonqualified',
        age: 65,
        gender: 'male',
        state: 'AL',
        includeJoint: false,
        jointRelationship: 'spouse',
        jointAge: 65,
        jointGender: 'female'
      },
      results: {
        calculated: false,
        monthlyPayout: 0,
        requiredPremium: 0,
        income10Years: 0,
        income20Years: 0,
        income30Years: 0
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
      desc.content = 'Use our Deferred Annuity Calculator to estimate your retirement payouts. Plan your savings, compare deferred annuity options, and maximize your future income today.'
      
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
      const amount = this.form.amount || 0;
      const age = this.form.age || 65;
      const jointAge = this.form.jointAge || 65;
      const state = this.form.state;
      
      // 获取基于州的利率因子
      const stateRate = this.getStateRate(state);
      
      // 获取基于年龄的因子
      const ageFactor = this.getAgeFactor(age, this.form.gender);
      
      // 获取联合生命因子
      const jointFactor = this.form.includeJoint ? 
        this.getJointFactor(jointAge, this.form.jointGender) : 1;
      
      // 获取资金来源因子
      const fundingFactor = this.getFundingFactor(this.form.fundingSource);
      
      // 计算基础月付
      let monthlyPayout = 0;
      let requiredPremium = 0;
      
      if (this.form.calculationType === 'contribute') {
        // 根据贡献金额计算月付
        monthlyPayout = amount * stateRate * ageFactor * jointFactor * fundingFactor;
        requiredPremium = amount;
      } else {
        // 根据目标月付计算所需本金
        requiredPremium = amount / (stateRate * ageFactor * jointFactor * fundingFactor);
        monthlyPayout = amount;
      }
      
      // 计算不同年限的总收入
      const income10Years = monthlyPayout * 12 * 10;
      const income20Years = monthlyPayout * 12 * 20;
      const income30Years = monthlyPayout * 12 * 30;
      
      this.results = {
        calculated: true,
        monthlyPayout: Math.round(monthlyPayout * 100) / 100,
        requiredPremium: Math.round(requiredPremium * 100) / 100,
        income10Years: Math.round(income10Years * 100) / 100,
        income20Years: Math.round(income20Years * 100) / 100,
        income30Years: Math.round(income30Years * 100) / 100
      };
    },

    // 根据州获取利率因子
    getStateRate(state) {
      // 不同州的利率因子 (简化模型)
      const rates = {
        'CA': 0.058, // California
        'TX': 0.062, // Texas
        'NY': 0.059, // New York
        'FL': 0.061, // Florida
        'IL': 0.057, // Illinois
        'PA': 0.060, // Pennsylvania
        'OH': 0.059, // Ohio
        'GA': 0.060, // Georgia
        'NC': 0.059, // North Carolina
        'MI': 0.058, // Michigan
        'NJ': 0.057, // New Jersey
        'VA': 0.060, // Virginia
        'WA': 0.062, // Washington
        'AZ': 0.060, // Arizona
        'MA': 0.058, // Massachusetts
        'TN': 0.061, // Tennessee
        'IN': 0.059, // Indiana
        'MO': 0.059, // Missouri
        'MD': 0.058, // Maryland
        'WI': 0.059, // Wisconsin
        'CO': 0.061, // Colorado
        'MN': 0.058, // Minnesota
        'SC': 0.060, // South Carolina
        'AL': 0.060, // Alabama
        'LA': 0.059, // Louisiana
        'KY': 0.059, // Kentucky
        'OR': 0.058, // Oregon
        'OK': 0.060, // Oklahoma
        'CT': 0.057, // Connecticut
        'IA': 0.059, // Iowa
        'MS': 0.059, // Mississippi
        'AR': 0.060, // Arkansas
        'KS': 0.059, // Kansas
        'UT': 0.061, // Utah
        'NV': 0.061, // Nevada
        'NM': 0.059, // New Mexico
        'NE': 0.059, // Nebraska
        'WV': 0.058, // West Virginia
        'ID': 0.060, // Idaho
        'HI': 0.056, // Hawaii
        'ME': 0.057, // Maine
        'NH': 0.058, // New Hampshire
        'RI': 0.057, // Rhode Island
        'MT': 0.059, // Montana
        'DE': 0.058, // Delaware
        'SD': 0.060, // South Dakota
        'ND': 0.059, // North Dakota
        'AK': 0.062, // Alaska
        'VT': 0.057, // Vermont
        'WY': 0.061  // Wyoming
      };
      
      // 默认利率
      const defaultRate = 0.06;
      
      // 基于资金来源调整
      let rate = rates[state] || defaultRate;
      
      // 基于资金来源调整利率
      if (this.form.fundingSource === 'qualified') {
        rate *= 1.05; // Qualified 略有优势
      } else if (this.form.fundingSource === 'qlac') {
        rate *= 1.03; // QLAC 略有调整
      }
      
      return rate;
    },

    // 根据年龄和性别获取因子
    getAgeFactor(age, gender) {
      // 基础因子随年龄增加而增加（因为预期寿命更短，每月支付更高）
      const baseFactor = 0.005 + (age - 50) * 0.0003;
      
      // 女性因子略低（寿命更长）
      if (gender === 'female') {
        return baseFactor * 0.95;
      }
      
      return baseFactor;
    },

    // 获取联合生命因子
    getJointFactor(jointAge, jointGender) {
      // 联合生命因子略低，因为有两个人，支付可能持续更长时间
      const jointBase = 0.005 + (jointAge - 50) * 0.0003;
      
      // 如果是女性，因子略低
      if (jointGender === 'female') {
        return (jointBase * 0.95) / 0.006; // 归一化因子
      }
      
      return jointBase / 0.006;
    },

    // 获取资金来源因子
    getFundingFactor(source) {
      switch(source) {
        case 'qualified':
          return 1.02;
        case 'nonqualified':
          return 1.00;
        case 'qlac':
          return 0.98;
        default:
          return 1.00;
      }
    },

    clearForm() {
      this.form = {
        calculationType: 'contribute',
        amount: 1000,
        startDate: '2032-03-25',
        fundingSource: 'nonqualified',
        age: 65,
        gender: 'male',
        state: 'AL',
        includeJoint: false,
        jointRelationship: 'spouse',
        jointAge: 65,
        jointGender: 'female'
      };
      this.calculate();
    },

    formatMoney(value) {
      if (value === undefined || value === null || isNaN(value)) return '0';
      return value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        month: '2-digit', 
        day: '2-digit', 
        year: 'numeric' 
      });
    }
  },
  mounted() {
     document.title = 'Calculate Your Future Income with Our Deferred Annuity Calculator Accurate'
    // 2. 设置关键meta标签（Google最关注的）
    this.setGoogleMetaTags()
    // 设置默认开始日期（当前日期 + 13个月）
    const today = new Date();
    today.setMonth(today.getMonth() + 13);
    this.form.startDate = today.toISOString().split('T')[0];
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
.deferred-annuity-calculator {
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
  .deferred-annuity-calculator {
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

.calculator-form h3 {
  font-size: 1.4rem;
  font-weight: 500;
  margin: 28px 0 16px 0;
  color: #1e3a5f;
}

@media (max-width: 480px) {
  .calculator-form h2 {
    font-size: 1.5rem;
  }
  
  .calculator-form h3 {
    font-size: 1.2rem;
  }
}

.calculation-type {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
  padding: 16px;
  background: #e8f0fe;
  border-radius: 16px;
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
    width: 180px;
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
.date-input,
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
.date-input:focus,
.state-select:focus {
  outline: none;
}

.date-input,
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

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 500;
  color: #1a3349;
  font-size: 1rem;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.joint-section {
  margin-top: 24px;
  padding: 20px;
  background: #e8f0fe;
  border-radius: 20px;
  border: 1px solid #c9d9ec;
}

.joint-details {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px dashed #b6c9dd;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
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
  
  .radio-group {
    gap: 12px;
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

.result-message {
  background: white;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 24px;
  border: 1px solid #d9e2ef;
  font-size: 1.1rem;
  line-height: 1.5;
}

.result-message strong {
  color: #1f3a5f;
  font-size: 1.2rem;
}

.payout-card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 16px;
  border: 1px solid #d9e2ef;
  text-align: center;
  border-left: 6px solid #2563eb;
}

.payout-label {
  color: #4b5f73;
  font-size: 1rem;
  margin-bottom: 12px;
}

.payout-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f3a5f;
}

.stability-link {
  text-align: center;
  margin-bottom: 32px;
}

.stability-link a {
  color: #1f4a7a;
  text-decoration: underline;
  font-size: 1rem;
}

.stability-link a:hover {
  color: #0b2b44;
}

.income-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e3a5f;
  margin-bottom: 8px;
}

.income-date {
  color: #4b5f73;
  font-size: 0.95rem;
  margin-bottom: 24px;
}

.income-chart {
  background: white;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid #d9e2ef;
}

.income-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e9eef3;
}

.income-item:last-child {
  border-bottom: none;
}

.income-label {
  font-weight: 600;
  color: #0b2b44;
  font-size: 1.2rem;
}

.income-desc {
  color: #4b5f73;
  font-size: 0.95rem;
}

@media (max-width: 480px) {
  .payout-value {
    font-size: 2rem;
  }
  
  .income-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
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