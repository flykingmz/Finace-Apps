<template>
  <div class="retirement-calculator">
    <!-- Google Ads Section (hidden by default) -->
    <div class="ads-section" v-if="showAds">
      <!-- Google Ads placeholder -->
      <div class="ads-container">
        <p>Google Ads Section (Hidden by default)</p>
      </div>
    </div>

    <!-- Title Section -->
    <header class="calculator-header">
      <h1>Retirement Calculator</h1>
      <p>Plan your retirement savings and see if you're on track</p>
    </header>

    <!-- Main Content Area -->
    <main class="calculator-main">
      <!-- Results Section (shown after calculation) -->
      <section v-if="showResults" class="results-section">
        <div class="results-header">
          <h2>Result</h2>
        </div>
        
        <div class="results-summary">
          <p>You will need about <strong>${{ formatCurrency(retirementNeed) }}</strong> at age {{ retirementAge }} to retire.</p>
          <p v-if="currentSavingsProjection < retirementNeed">
            Based on your current plan, you will have about ${{ formatCurrency(currentSavingsProjection) }} at age {{ retirementAge }}, 
            which is <strong>less than what you need</strong> for retirement.
          </p>
          <p v-else>
            Based on your current plan, you will have about ${{ formatCurrency(currentSavingsProjection) }} at age {{ retirementAge }}, 
            which is <strong>sufficient for your retirement needs</strong>.
          </p>
          
          <div class="savings-comparison">
            <div class="comparison-bar">
              <div class="bar-container">
                <div 
                  class="current-savings-bar" 
                  :style="{ width: currentSavingsPercentage + '%' }"
                >
                  <span class="bar-label">~${{ formatCurrency(currentSavingsProjection) }} ({{ Math.round(currentSavingsPercentage) }}%)</span>
                </div>
                <div class="needed-savings-bar" :style="{ width: '100%' }"></div>
              </div>
            </div>
            <div class="bar-legends">
              <div class="legend">
                <span class="legend-dot current-dot"></span>
                <span>You will have</span>
              </div>
              <div class="legend">
                <span class="legend-dot needed-dot"></span>
                <span>You will need</span>
              </div>
            </div>
          </div>
        </div>

        <div class="retirement-income-section">
          <h3>After retirement (if saved ${{ formatCurrency(currentSavingsProjection) }}):</h3>
          <table class="income-table">
            <thead>
              <tr>
                <th>Actual amount</th>
                <th>Today's money</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Income: ${{ formatCurrency(monthlyIncomeFromCurrent / 12) }}/month</td>
                <td>${{ formatCurrency(monthlyIncomeInTodaysMoneyFromCurrent) }}/month</td>
              </tr>
            </tbody>
          </table>

          <h3>After retirement (if saved ${{ formatCurrency(retirementNeed) }}):</h3>
          <table class="income-table">
            <thead>
              <tr>
                <th>Actual amount</th>
                <th>Today's money</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Income: ${{ formatCurrency(monthlyIncomeFromNeeded / 12) }}/month</td>
                <td>${{ formatCurrency(monthlyIncomeInTodaysMoneyFromNeeded) }}/month</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="savings-plan-section">
          <h3>How can you save ${{ formatCurrency(retirementNeed) }} at {{ retirementAge }}?</h3>
          <p>
            To save ${{ formatCurrency(retirementNeed) }} at {{ retirementAge }}, you can either save 
            <strong>${{ formatCurrency(requiredMonthlySavings) }} per month</strong> or 
            <strong>${{ formatCurrency(requiredYearlySavings) }} per year</strong> or 
            save <strong>{{ requiredSavingsRate.toFixed(2) }}%</strong> of your income every year.
          </p>
        </div>

        <div class="balance-by-age-section">
          <h3>Balance by age</h3>
          <div class="graph-placeholder">
            <p>[Graph Placeholder]</p>
            <p><strong>Y-axis:</strong> Year End Balance</p>
            <p><strong>X-axis:</strong> Age</p>
            <div class="graph-legends">
              <div class="graph-legend">
                <span class="legend-line blue-line"></span>
                <span>If saved ${{ formatCurrency(currentSavingsProjection) }}</span>
              </div>
              <div class="graph-legend">
                <span class="legend-line green-line"></span>
                <span>If saved ${{ formatCurrency(retirementNeed) }}</span>
              </div>
            </div>
          </div>

          <div class="balance-table-container">
            <table class="balance-table">
              <thead>
                <tr>
                  <th>Age</th>
                  <th colspan="4">Current Plan</th>
                  <th colspan="4">Target Plan</th>
                </tr>
                <tr>
                  <th></th>
                  <th>Beginning balance</th>
                  <th>Contribution</th>
                  <th>Distribution</th>
                  <th>Ending balance</th>
                  <th>Beginning balance</th>
                  <th>Contribution</th>
                  <th>Distribution</th>
                  <th>Ending balance</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="year in projectedYears" :key="year.age">
                  <td>{{ year.age }}</td>
                  <td>${{ formatCurrency(year.current.beginningBalance) }}</td>
                  <td>${{ formatCurrency(year.current.contribution) }}</td>
                  <td>${{ formatCurrency(year.current.distribution) }}</td>
                  <td>${{ formatCurrency(year.current.endingBalance) }}</td>
                  <td>${{ formatCurrency(year.target.beginningBalance) }}</td>
                  <td>${{ formatCurrency(year.target.contribution) }}</td>
                  <td>${{ formatCurrency(year.target.distribution) }}</td>
                  <td>${{ formatCurrency(year.target.endingBalance) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Calculator Input Section -->
      <section :class="['calculator-section', { 'with-results': showResults }]">
        <div class="calculator-form">
          <div class="form-row">
            <div class="form-group">
              <label for="currentAge">Your current age</label>
              <input 
                type="number" 
                id="currentAge" 
                v-model.number="currentAge" 
                min="18"
                max="100"
              />
            </div>
            
            <div class="form-group">
              <label for="retirementAge">Your planned retirement age</label>
              <input 
                type="number" 
                id="retirementAge" 
                v-model.number="retirementAge" 
                min="18"
                max="100"
              />
            </div>
            
            <div class="form-group">
              <label for="lifeExpectancy">Your life expectancy</label>
              <input 
                type="number" 
                id="lifeExpectancy" 
                v-model.number="lifeExpectancy" 
                min="50"
                max="120"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="currentIncome">Your current pre-tax income</label>
              <div class="input-with-unit">
                <input 
                  type="number" 
                  id="currentIncome" 
                  v-model.number="currentIncome" 
                  min="0"
                />
                <span class="unit">/ year</span>
              </div>
            </div>
          </div>
          
          <div class="assumptions-section">
            <h3>Assumptions</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label for="incomeIncrease">Your current income increase</label>
                <div class="input-with-unit">
                  <input 
                    type="number" 
                    id="incomeIncrease" 
                    v-model.number="incomeIncrease" 
                    step="0.1"
                    min="0"
                    max="20"
                  />
                  <span class="unit">% / year</span>
                </div>
              </div>
              
              <div class="form-group">
                <label for="retirementIncomeNeeded">Income needed after retirement</label>
                <div class="input-with-unit">
                  <input 
                    type="number" 
                    id="retirementIncomeNeeded" 
                    v-model.number="retirementIncomeNeeded" 
                    step="0.1"
                    min="0"
                    max="100"
                  />
                  <span class="unit">% of current income</span>
                </div>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="investmentReturn">Average investment return</label>
                <div class="input-with-unit">
                  <input 
                    type="number" 
                    id="investmentReturn" 
                    v-model.number="investmentReturn" 
                    step="0.1"
                    min="0"
                    max="20"
                  />
                  <span class="unit">% / year</span>
                </div>
              </div>
              
              <div class="form-group">
                <label for="inflationRate">Inflation rate</label>
                <div class="input-with-unit">
                  <input 
                    type="number" 
                    id="inflationRate" 
                    v-model.number="inflationRate" 
                    step="0.1"
                    min="0"
                    max="20"
                  />
                  <span class="unit">% / year</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="optional-section">
            <h3>Optional</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label for="otherIncome">Other income after retirement</label>
                <div class="input-with-unit">
                  <input 
                    type="number" 
                    id="otherIncome" 
                    v-model.number="otherIncome" 
                    min="0"
                  />
                  <span class="unit">/ month social security, pension, etc</span>
                </div>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="currentRetirementSavings">Your current retirement savings</label>
                <div class="input-with-unit">
                  <input 
                    type="number" 
                    id="currentRetirementSavings" 
                    v-model.number="currentRetirementSavings" 
                    min="0"
                  />
                </div>
              </div>
              
              <div class="form-group">
                <label for="futureRetirementSavings">Future retirement savings</label>
                <div class="input-with-unit">
                  <input 
                    type="number" 
                    id="futureRetirementSavings" 
                    v-model.number="futureRetirementSavings" 
                    step="0.1"
                    min="0"
                    max="100"
                  />
                  <span class="unit">% of income</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="form-actions">
            <button @click="calculate" class="btn-calculate">Calculate</button>
            <button @click="clear" class="btn-clear">Clear</button>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="faq-section">
        <h2>What is Retirement?</h2>
        <p>To retire is to withdraw from active working life, and for most retirees, retirement lasts the rest of their lives.</p>
        
        <h3>Why Retire?</h3>
        <p>There are many factors at play that ultimately affect a person's decision to retire. Physical or mental health can affect a person's decision to retire; if a worker is not physically strong enough, succumbs to a disability, or has mentally declined too much to perform the duties of their job, they should probably consider retiring, or at the very least try to find a new occupation that better accommodates their health. Also, stressors associated with an occupation can become too unbearable, leading to a decline in satisfaction with work. Age is also a factor that affects a person's decision to retire. Theoretically, retirement can happen during any normal working year. Some may choose to "semi-retire" by gradually decreasing their work hours as they approach retirement. Some announce retirement and enter it short-term, just to rejoin the workforce again. However, it generally occurs between the ages of 55 and 70.</p>
        
        <p>One of the most important factors that affect a person's decision to retire is whether it is even financially possible in the first place. While it is somewhat possible to retire with nothing in savings and to rely solely on Social Security (which an unfortunately significant number of Americans in the U.S. do), it is generally a bad idea for most due to the sheer difference between a working income as opposed to the Social Security benefits. In the U.S., Social Security benefits are only designed to replace about 40% of the average worker's wages during retirement.</p>
        
        <p>Retirement is an important consideration for everyone, and when not forced to retire due to various reasons such as illness or disability, most people choose to retire when they are ready and comfortable with the decision.</p>
        
        <h3>How Much to Save for Retirement</h3>
        <p>Naturally, the next question becomes: how much should a person save for retirement? Simply put, it's an extremely loaded question with very few definite answers. Similar to the answer to the question of whether to retire or not, it will depend on each person, and factors such as how much income will be needed, entitlement for Social Security retirement benefits, health and life expectancy, personal preferences regarding inheritances, and many other things.</p>
        
        <p>Below are some general guidelines.</p>
        
        <h3>10% Rule</h3>
        <p>This rule suggests that a person save 10% to 15% of their pre-tax income per year during their working years. For instance, a person who makes $50,000 a year would put away anywhere from $5,000 to $7,500 for that year. Roughly speaking, by saving 10% starting at age 25, a $1 million nest egg by the time of retirement is possible.</p>
      
        <h3>80% Rule</h3>
        <p>Another popular rule suggests that an income of 70% to 80% of a worker's pre-retirement income can maintain a retiree's standard of living after retirement. For example, if a person made roughly $100,000 a year on average during his working life, this person can have a similar standard of living with $70,000 - $80,000 a year of income after retirement. This 70% - 80% figure can vary greatly depending on how people envision their retirements. Some retirees want to sail a yacht around the world, while others want to live in a simple cabin in the woods.</p>
      
      <h3>4% Rule</h3>
        <p>People who have a good estimate of how much they will require a year in retirement can divide this number by 4% to determine the nest egg required to enable their lifestyle. For instance, if a retiree estimates they need $100,000 a year, according to the 4% rule, the nest egg required is $100,000 / 4% = $2.5 million. <br>

Some experts claim that savings of 15 to 25 times of a person's current annual income are enough to last them throughout their retirement. Of course, there are other ways to determine how much to save for retirement. The calculations here can be helpful, as can many other retirement calculators out there. It also can be helpful to speak with licensed professionals who help people plan their retirements.</p>
      
      <h3>Impact of Inflation on Retirement Savings</h3>
        <p>Inflation is the general increase in prices and a fall in the purchasing power of money over time. The average inflation rate in the United States for the past 30 years has been around 2.6% per year, which means that the purchasing power of one dollar now is not only less than one dollar 30 years ago but less than 50 cents! Inflation is one of the reasons why people tend to underestimate how much they need to save for retirement.<br>

Although inflation does have an impact on retirement savings, it is unpredictable and mostly out of a person's control. As a result, people generally do not center their retirement planning or investments around inflation and instead focus mainly on achieving as large and steady a total return on investment as possible. For people interested in mitigating inflation, there are investments in the U.S. that are specifically designed to counter inflation called Treasury Inflation-Protected Securities (TIPs) and similar investments in other countries that go by different names. Also, gold and other commodities are traditionally favored as protection against inflation, as are dividend-paying stocks as opposed to short-term bonds.<br>

Our Retirement Calculator can help by considering inflation in several calculations. Please visit the Inflation Calculator for more information about inflation or to do calculations involving inflation.</p>
    
    <h2>Common Sources of Retirement Funds</h2>
        <p>People in the U.S. generally rely on the following sources for financial support after retirement.</p>

      <h3>Social Security</h3>
        <p>Social Security is a social insurance program run by the government to provide protection against poverty, old age, and disability. People in the U.S. who have contributed to the Federal Insurance Contributions Act (FICA) tax as withholdings from payroll will receive some of their income in the form of Social Security benefits during retirement. In the U.S., Social Security was designed to replace approximately 40% of a person's working income. Yet, approximately one-third of the working population and 50% of retirees expect Social Security to be their major source of income after retirement.
      <p>Social Security is a social insurance program run by the government to provide protection against poverty, old age, and disability. People in the U.S. who have contributed to the Federal Insurance Contributions Act (FICA) tax as withholdings from payroll will receive some of their income in the form of Social Security benefits during retirement. In the U.S., Social Security was designed to replace approximately 40% of a person's working income. Yet, approximately one-third of the working population and 50% of retirees expect Social Security to be their major source of income after retirement.<br>

Future proceeds from Social Security are only loosely based on past income levels. For example, a person earning $20,000 per year would receive approximately $800 per month in benefits. A person earning $100,000 per year would receive around $2,000 per month in benefits. As can be seen, while a person who earns more does receive more in benefits as their income increases, the increase in benefits is not proportional. What this translates to is that low income-earners have more to gain from their initial investments into Social Security relative to higher-income earners. For more information or to do calculations involving Social Security, please visit our Social Security Calculator.</p>

       <h3>Pensions, 401(k)s, Individual Retirement Accounts (IRA), and Other Savings Plans</h3>
    
       <h4>401(k), 403(b), 457 Plan</h4>
        <p>In the U.S., two of the most popular ways to save for retirement include Employer Matching Programs such as the 401(k) and their offshoot, the 403(b) (nonprofit, religious organizations, school districts, governmental organizations). 401(k)s vary from company to company, but many employers offer a matching contribution up to a certain percentage of the gross income of the employee. For example, an employer may match up to 3% of an employee's contribution to their 401(k); if this employee earned $60,000, the employer would contribute a maximum of $1,800 to the employee's 401(k) that year. Only 6% of companies that offer 401(k)s don't make some sort of employer contribution. It is generally recommended to at least contribute the maximum amount that an employer will match.<br>

Employer matching program contributions are made using pre-tax dollars. Funds are essentially allowed to grow tax-free until distributed. Only distributions are taxed as ordinary income in retirement, during which retirees most likely fall within a lower tax bracket. Please visit our 401K Calculator for more information about 401(k)s.</p>

       <h4>IRA and Roth IRA</h4>
        <p>In the U.S., the traditional IRA (Individual Retirement Account) and Roth IRA are also popular forms of retirement savings. Just like 401(k)s and other employer matching programs, there are specific tax shields in place that make them both appealing. The big difference between traditional IRAs and Roth IRAs is when taxation is applied. The former's contributions go in pre-tax (usually taken from gross pay, very similar to 401(k)s) but are taxed upon withdrawal. In contrast, Roth IRA contributions are deposited using after-tax dollars and are not taxed when withdrawn during retirement. For more information about traditional IRAs or Roth IRAs, please visit our IRA Calculator or Roth IRA Calculator.</p>

       <h4>Pension Plans</h4>
        <p>Pension plans are retirement funds that employers pool together and manage for their employees until they retire. Most public servants in the United States are covered by pension programs rather than Social Security. Some private employers may also provide pension benefits. Upon retirement, each employee can then choose to have fixed payouts from their share of the pension pot or sell them as a lump sum to an insurance company. They can then choose to receive income in the form of an annuity.<br>

In the U.S., pension plans were a popular form of saving for retirement in the past, but they have since fallen out of favor, largely due to increasing longevity; there are fewer workers for each retired person. However, they can still be found in the public sector or traditional corporations.<br>

For more information about or to do calculations involving pensions, please visit the Pension Calculator.</p>

       <h4>Investments and CDs</h4>
        <p>In the U.S., while pensions, 401(k)s, and IRAs are great ways to save for retirement due to their tax benefits, they all have annual investment limits that can vary based on income or other factors. In general, investments are used as a method to grow wealth, but people who have maxed out their tax-advantaged retirement plans and are searching for other places to put retirement funds can also use investments in order to reach their retirement goals.<br>

Examples of typical investments in the U.S. include mutual funds, index funds, individual stocks, real estate properties, bonds, commodities such as gold, and Certificates of Deposit (CDs). While these are some of the most popular, the list of potential investments as a way to grow wealth for retirement is much, much longer.<br>

Some funds offer a relatively steady rate of growth over time, while individual stocks tend to be volatile. Gold and other commodities tend to fluctuate depending on economic conditions, and so does real estate. Comparatively, CDs and fixed income investments have low returns but make good options for those who seek low-risk, steady income, and are approaching or in retirement. All investments have different levels of risk and reward, and it is up to each individual to decide what is best for them. Tax-advantaged retirement accounts listed above will most likely use these same investments in their portfolios, with the addition of the tax benefits.<br>

For more information or to do calculations involving investments, please visit the Investment Calculator.</p>
         
         <h4>Personal Savings</h4>
        <p>What may seem like the most obvious way to save for retirement is through personal savings such as checking, savings, or money market accounts; after all, it is the first place where surplus disposable income accumulates for most people before something is done with it. However, it may not exactly be the best method to save for retirement over the long term, mainly due to inflation. In the U.S., personal savings such as cash, checking accounts, savings accounts, or other forms of liquid assets normally offer little or no interest. With income tax accounted for, the returns rarely beat inflation.<br>

That's not to say that there aren't certain benefits to having some savings in a readily available form in the case of an emergency. Emergency funds are an important part of healthy personal finance arrangements that can eventually be contributed to a retirement fund if not used.</p>
         
        <h3>Other Sources of Retirement Income</h3>
        <h4>Home Equity and Real Estate</h4>
        <p>For some people in certain scenarios, preexisting mortgages and ownership of real estate can be liquidated for disposable income during retirement through a reverse mortgage. A reverse mortgage is just as it is aptly named — a reversing of a mortgage where at the end (the last amortized payment has been released), ownership of the house is transferred to whoever bought the reverse mortgage. In other words, retirees are paid to live in their homes until a fixed point in the future, where ownership of the home is finally transferred.</p>
  
        <h4>Annuities</h4>
        <p>A common way to receive income in retirement is through the use of an annuity, which is a fixed sum of periodic cash flows typically distributed for the rest of an annuitant's life. There are two types of annuities: immediate and deferred. Immediate annuities are upfront premiums paid which release payments from the principal starting as early as the next month. Deferred annuities are annuities with two phases. The first phase is the accumulation or deferral phase, during which a person contributes money to the account (or pays a premium). The second phase is the distribution, or annuitization phase, during which a person will receive periodic payments until death. For more information, it may be worth checking out our Annuity Calculator or Annuity Payout Calculator to determine whether annuities could be a viable option for your retirement.</p>
  
        <h4>Passive Income</h4>
        <p>Just because other investments don't have tax benefits doesn't mean they should automatically be ruled out. Passive income is one of them. During retirement, they can come in forms such as rental income, income from a business, stock dividends, or royalties. When 401(k) and IRA accounts have reached their contribution limits, passively-held investments offer another avenue where any remaining money can be placed. For more information on rental properties, please visit the Rental Property Calculator.</p>
  
        <h4>Inheritance</h4>
        <p>An inheritance is a portion of assets given to the heirs of the deceased, which an heir can use as income for retirement. However, because the estates of owners that die haven't exchanged hands since ownership, they may still be subject to tax, whether state or federal (In the U.S., along with the mandatory federal estate tax, six states mandate the payment of a separate inheritance tax). Also, the value of estates may change due to factors such as legal rights or financial volatility. Tangible assets such as real estate or jewelry may require the payment of capital gains tax if the assets are sold for profit. For more information about inheritances or to do calculations involving estate tax, please visit the Estate Tax Calculator.</p>
  
      </section>
    </main>

    <!-- Footer Section -->
    <footer class="calculator-footer">
      <div class="footer-content">
        <div class="footer-section">
          <h4>Tool Statement</h4>
          <p>This retirement calculator is provided for educational and informational purposes only. Results are estimates and should not be considered as financial advice.</p>
        </div>
        
        <div class="footer-section">
          <h4>Data Statement</h4>
          <p>All data entered is processed locally in your browser and is not stored or transmitted to any servers. Your privacy is protected.</p>
        </div>
        
        <div class="footer-section">
          <h4>Contact & Feedback</h4>
          <p>For questions or feedback about this calculator, please contact us at calculator@example.com</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'RetirementCalculator',
  data() {
    return {
      // Input fields with default values
      currentAge: 35,
      retirementAge: 67,
      lifeExpectancy: 85,
      currentIncome: 70000,
      incomeIncrease: 3,
      retirementIncomeNeeded: 75,
      investmentReturn: 6,
      inflationRate: 3,
      otherIncome: 0,
      currentRetirementSavings: 30000,
      futureRetirementSavings: 10,
      
      // Results
      showResults: false,
      retirementNeed: 0,
      currentSavingsProjection: 0,
      monthlyIncomeFromCurrent: 0,
      monthlyIncomeInTodaysMoneyFromCurrent: 0,
      monthlyIncomeFromNeeded: 0,
      monthlyIncomeInTodaysMoneyFromNeeded: 0,
      requiredMonthlySavings: 0,
      requiredYearlySavings: 0,
      requiredSavingsRate: 0,
      projectedYears: [],
      
      // Control ads display
      showAds: false
    }
  },
  computed: {
    currentSavingsPercentage() {
      if (this.retirementNeed === 0) return 0;
      return (this.currentSavingsProjection / this.retirementNeed) * 100;
    },
    workingYears() {
      return this.retirementAge - this.currentAge;
    },
    retirementYears() {
      return this.lifeExpectancy - this.retirementAge;
    }
  },
  methods: {
    calculate() {
      // Calculate retirement need
      const realReturnRate = (1 + this.investmentReturn / 100) / (1 + this.inflationRate / 100) - 1;
      
      // Calculate annual retirement income needed in today's dollars
      const annualRetirementIncomeNeeded = (this.currentIncome * (this.retirementIncomeNeeded / 100));
      
      // Adjust for inflation to retirement age
      const yearsToRetirement = this.retirementAge - this.currentAge;
      const futureAnnualIncomeNeeded = annualRetirementIncomeNeeded * Math.pow(1 + this.inflationRate / 100, yearsToRetirement);
      
      // Calculate retirement nest egg needed (simplified calculation)
      // Using 4% withdrawal rule as a simplified approach
      this.retirementNeed = futureAnnualIncomeNeeded / 0.04;
      
      // Calculate current savings projection
      this.currentSavingsProjection = this.calculateCurrentSavingsProjection();
      
      // Calculate monthly income from savings
      this.monthlyIncomeFromCurrent = this.currentSavingsProjection * 0.04;
      this.monthlyIncomeInTodaysMoneyFromCurrent = this.monthlyIncomeFromCurrent / Math.pow(1 + this.inflationRate / 100, yearsToRetirement);
      
      this.monthlyIncomeFromNeeded = this.retirementNeed * 0.04;
      this.monthlyIncomeInTodaysMoneyFromNeeded = this.monthlyIncomeFromNeeded / Math.pow(1 + this.inflationRate / 100, yearsToRetirement);
      
      // Calculate required savings
      this.calculateRequiredSavings();
      
      // Generate projected years data
      this.generateProjectedYears();
      
      this.showResults = true;
    },
    
    calculateCurrentSavingsProjection() {
      let savings = this.currentRetirementSavings;
      let annualContribution = this.currentIncome * (this.futureRetirementSavings / 100);
      let currentIncome = this.currentIncome;
      
      for (let year = 1; year <= this.workingYears; year++) {
        // Add investment return
        savings = savings * (1 + this.investmentReturn / 100);
        // Add annual contribution
        savings += annualContribution;
        // Increase income and contribution for next year
        currentIncome = currentIncome * (1 + this.incomeIncrease / 100);
        annualContribution = currentIncome * (this.futureRetirementSavings / 100);
      }
      
      return savings;
    },
    
    calculateRequiredSavings() {
      // Calculate required monthly savings to reach retirement need
      // Using future value of annuity formula
      const years = this.workingYears;
      const annualReturn = this.investmentReturn / 100;
      const futureValue = this.retirementNeed;
      const presentValue = this.currentRetirementSavings * Math.pow(1 + annualReturn, years);
      
      // PMT calculation
      if (annualReturn > 0) {
        const pmt = (futureValue - presentValue) * (annualReturn) / (Math.pow(1 + annualReturn, years) - 1);
        this.requiredYearlySavings = pmt;
        this.requiredMonthlySavings = pmt / 12;
      } else {
        this.requiredYearlySavings = (futureValue - this.currentRetirementSavings) / years;
        this.requiredMonthlySavings = this.requiredYearlySavings / 12;
      }
      
      // Calculate required savings rate as percentage of current income
      this.requiredSavingsRate = (this.requiredYearlySavings / this.currentIncome) * 100;
    },
    
    generateProjectedYears() {
      this.projectedYears = [];
      
      let currentSavings = this.currentRetirementSavings;
      let targetSavings = this.currentRetirementSavings;
      let currentIncome = this.currentIncome;
      let currentAge = this.currentAge;
      
      let currentAnnualContribution = currentIncome * (this.futureRetirementSavings / 100);
      let targetAnnualContribution = this.requiredYearlySavings;
      
      for (let year = 0; year <= Math.min(5, this.workingYears); year++) {
        const age = currentAge + year;
        
        // Calculate for current plan
        const currentBeginningBalance = currentSavings;
        const currentContribution = currentAnnualContribution;
        const currentDistribution = 0;
        const currentEndingBalance = currentBeginningBalance * (1 + this.investmentReturn / 100) + currentContribution;
        
        // Calculate for target plan
        const targetBeginningBalance = targetSavings;
        const targetContribution = targetAnnualContribution;
        const targetDistribution = 0;
        const targetEndingBalance = targetBeginningBalance * (1 + this.investmentReturn / 100) + targetContribution;
        
        this.projectedYears.push({
          age,
          current: {
            beginningBalance: currentBeginningBalance,
            contribution: currentContribution,
            distribution: currentDistribution,
            endingBalance: currentEndingBalance
          },
          target: {
            beginningBalance: targetBeginningBalance,
            contribution: targetContribution,
            distribution: targetDistribution,
            endingBalance: targetEndingBalance
          }
        });
        
        // Update for next year
        currentSavings = currentEndingBalance;
        targetSavings = targetEndingBalance;
        
        // Increase income for next year
        currentIncome = currentIncome * (1 + this.incomeIncrease / 100);
        currentAnnualContribution = currentIncome * (this.futureRetirementSavings / 100);
      }
    },
    
    clear() {
      // Reset to default values
      this.currentAge = 35;
      this.retirementAge = 67;
      this.lifeExpectancy = 85;
      this.currentIncome = 70000;
      this.incomeIncrease = 3;
      this.retirementIncomeNeeded = 75;
      this.investmentReturn = 6;
      this.inflationRate = 3;
      this.otherIncome = 0;
      this.currentRetirementSavings = 30000;
      this.futureRetirementSavings = 10;
      
      this.showResults = false;
    },
    
    formatCurrency(value) {
      if (value >= 1000000) {
        return (value / 1000000).toFixed(2) + 'M';
      } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
      }
      return Math.round(value).toLocaleString();
    }
  }
}
</script>

<style scoped>
.retirement-calculator {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
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
}

/* Header Section */
.calculator-header {
  background-color: #2c3e50;
  color: white;
  padding: 30px 20px;
  text-align: center;
  border-radius: 8px 8px 0 0;
}

.calculator-header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5rem;
}

.calculator-header p {
  margin: 0;
  opacity: 0.9;
  font-size: 1.1rem;
}

/* Main Content */
.calculator-main {
  padding: 20px;
  background-color: white;
}

/* Results Section */
.results-section {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.results-header h2 {
  color: #2c3e50;
  margin-top: 0;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.results-summary p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 15px;
}

.savings-comparison {
  margin: 25px 0;
}

.bar-container {
  height: 40px;
  background-color: #e74c3c;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  margin-bottom: 10px;
}

.current-savings-bar {
  height: 100%;
  background-color: #3498db;
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 1s ease;
}

.bar-label {
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
}

.needed-savings-bar {
  height: 100%;
  background-color: transparent;
}

.bar-legends {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}

.legend {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: inline-block;
}

.current-dot {
  background-color: #3498db;
}

.needed-dot {
  background-color: #e74c3c;
}

/* Retirement Income Section */
.retirement-income-section {
  margin: 30px 0;
  padding: 20px;
  background-color: white;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.retirement-income-section h3 {
  color: #2c3e50;
  margin-top: 0;
}

.income-table {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0 25px 0;
}

.income-table th, .income-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.income-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.income-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* Savings Plan Section */
.savings-plan-section {
  background-color: #e8f4fc;
  padding: 20px;
  border-radius: 6px;
  margin: 25px 0;
  border-left: 4px solid #3498db;
}

.savings-plan-section h3 {
  margin-top: 0;
  color: #2c3e50;
}

/* Balance by Age Section */
.balance-by-age-section {
  margin-top: 40px;
}

.balance-by-age-section h3 {
  color: #2c3e50;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.graph-placeholder {
  background-color: #f5f5f5;
  padding: 30px;
  text-align: center;
  border-radius: 6px;
  margin: 20px 0;
  border: 1px dashed #ccc;
}

.graph-legends {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
}

.graph-legend {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-line {
  width: 30px;
  height: 3px;
  display: inline-block;
}

.blue-line {
  background-color: #3498db;
}

.green-line {
  background-color: #2ecc71;
}

.balance-table-container {
  overflow-x: auto;
  margin-top: 20px;
}

.balance-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.balance-table th {
  background-color: #2c3e50;
  color: white;
  padding: 12px 8px;
  text-align: center;
  border: 1px solid #34495e;
}

.balance-table td {
  padding: 10px 8px;
  border: 1px solid #ddd;
  text-align: right;
}

.balance-table tbody tr:nth-child(even) {
  background-color: #f8f9fa;
}

.balance-table tbody tr:hover {
  background-color: #e8f4fc;
}

/* Calculator Section */
.calculator-section {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.calculator-section.with-results {
  margin-top: 30px;
}

.calculator-form h3 {
  color: #2c3e50;
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c3e50;
}

.form-group input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.input-with-unit {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-unit input {
  padding-right: 80px;
}

.input-with-unit .unit {
  position: absolute;
  right: 12px;
  color: #666;
  font-size: 0.9rem;
}

.assumptions-section,
.optional-section {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 6px;
  margin: 25px 0;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.btn-calculate,
.btn-clear {
  padding: 14px 28px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-calculate {
  background-color: #3498db;
  color: white;
}

.btn-calculate:hover {
  background-color: #2980b9;
}

.btn-clear {
  background-color: #95a5a6;
  color: white;
}

.btn-clear:hover {
  background-color: #7f8c8d;
}

/* FAQ Section */
.faq-section {
  margin-top: 40px;
  padding: 30px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.faq-section h2 {
  color: #2c3e50;
  margin-top: 0;
}

.faq-section h3 {
  color: #2c3e50;
  margin-top: 25px;
  border-left: 4px solid #3498db;
  padding-left: 10px;
}

.faq-section p {
  line-height: 1.6;
  margin-bottom: 15px;
}

/* Footer Section */
.calculator-footer {
  background-color: #2c3e50;
  color: white;
  padding: 40px 20px;
  margin-top: 40px;
  border-radius: 0 0 8px 8px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section h4 {
  color: #3498db;
  margin-top: 0;
  margin-bottom: 15px;
}

.footer-section p {
  line-height: 1.6;
  opacity: 0.9;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .bar-legends {
    flex-direction: column;
    gap: 10px;
  }
  
  .graph-legends {
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  
  .balance-table {
    font-size: 0.8rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn-calculate,
  .btn-clear {
    width: 100%;
  }
}
</style>