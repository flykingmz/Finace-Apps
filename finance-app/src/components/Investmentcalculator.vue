<template>
  <div class="investment-calculator">
    <!-- Header -->
    <h1 class="main-title">Investment Calculator</h1>
    <p class="description">
      Our Investment Calculator helps you estimate how your money could grow over time through compounding and consistent contributions. By entering your initial investment, expected annual return, and optional periodic deposits, you can project the potential future value of your portfolio. This tool is useful for planning long-term financial goals such as retirement, savings targets, or general wealth accumulation. Experiment with different scenarios to see how time, return rates, and regular investments can significantly impact overall growth.
    </p>

    <!-- Calculator Tabs - 5个标签页 -->
    <div class="calculator-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="tab-btn"
        :class="{ active: activeTab === tab.value }"
        @click="activeTab = tab.value"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Calculator Form - 根据当前标签页动态显示 -->
    <div class="calculator-form">
      <h2>{{ getTabTitle }}</h2>

      <!-- Target Amount (显示在除 End Amount 外的所有模式) -->
      <div class="form-row" v-if="activeTab !== 'end'">
        <label>Your Target ($)</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input
              type="number"
              v-model.number="form.targetAmount"
              @input="calculate"
              min="0"
              step="1000"
              placeholder="1000000"
            />
          </div>
        </div>
      </div>

      <!-- Starting Amount (不显示在 Starting Amount 模式) -->
      <div class="form-row" v-if="activeTab !== 'starting'">
        <label>Starting Amount ($)</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input
              type="number"
              v-model.number="form.startingAmount"
              @input="calculate"
              min="0"
              step="1000"
              placeholder="20000"
            />
          </div>
        </div>
      </div>

      <!-- Investment Length (不显示在 Investment Length 模式) -->
      <div class="form-row" v-if="activeTab !== 'length'">
        <label>After (years)</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <input
              type="number"
              v-model.number="form.years"
              @input="calculate"
              min="1"
              max="100"
              step="1"
              placeholder="10"
            />
            <span>years</span>
          </div>
        </div>
      </div>

      <!-- Return Rate (不显示在 Return Rate 模式) -->
      <div class="form-row" v-if="activeTab !== 'return'">
        <label>Return Rate (%)</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <input
              type="number"
              step="0.1"
              v-model.number="form.returnRate"
              @input="calculate"
              min="0"
              max="30"
              placeholder="6"
            />
            <span class="percent-symbol">%</span>
          </div>
        </div>
      </div>

      <!-- Compound Frequency -->
      <div class="form-row">
        <label>Compound</label>
        <div class="input-wrapper">
          <select v-model="form.compoundFrequency" @change="calculate" class="frequency-select">
            <option v-for="option in compoundOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Additional Contribution (不显示在 Additional Contribution 模式) -->
      <div class="form-row" v-if="activeTab !== 'additional'">
        <label>Additional Contribution ($)</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input
              type="number"
              v-model.number="form.additionalContribution"
              @input="calculate"
              min="0"
              step="100"
              placeholder="1000"
            />
          </div>
        </div>
      </div>

      <!-- Contribution Timing -->
      <div class="form-row radio-row">
        <label>Contribute at the</label>
        <div class="radio-group">
          <label class="radio-label">
            <input
              type="radio"
              value="beginning"
              v-model="form.contributeTiming"
              @change="calculate"
            />
            <span>beginning</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              value="end"
              v-model="form.contributeTiming"
              @change="calculate"
            />
            <span>end</span>
          </label>
        </div>
        <span class="of-text">of each</span>
        <div class="radio-group">
          <label class="radio-label">
            <input
              type="radio"
              value="month"
              v-model="form.contributeFrequency"
              @change="calculate"
            />
            <span>month</span>
          </label>
          <label class="radio-label">
            <input
              type="radio"
              value="year"
              v-model="form.contributeFrequency"
              @change="calculate"
            />
            <span>year</span>
          </label>
        </div>
      </div>

      <div class="form-actions">
        <button @click="calculate">Calculate</button>
        <button class="clear" @click="clearForm">Clear</button>
      </div>
    </div>

    <!-- Results Section - 附件6样式 -->
    <div class="results-section" v-if="results.calculated">
      <h2>Results</h2>

      <!-- 如果是计算年限，显示特殊消息 -->
      <div v-if="activeTab === 'length'" class="result-message">
        <p>You will need to invest <strong>{{ formatNumber(results.years) }}</strong> years to reach the target of ${{ formatMoney(results.targetAmount) }}.</p>
      </div>

      <!-- 结果卡片 -->
      <div class="results-cards">
        <div class="result-card">
          <div class="card-label">End Balance</div>
          <div class="card-value highlight">${{ formatMoney(results.endBalance) }}</div>
        </div>
        <div class="result-card">
          <div class="card-label">Starting Amount</div>
          <div class="card-value">${{ formatMoney(results.startingAmount) }}</div>
        </div>
        <div class="result-card">
          <div class="card-label">Total Contributions</div>
          <div class="card-value">${{ formatMoney(results.totalContributions) }}</div>
        </div>
        <div class="result-card">
          <div class="card-label">Total Interest</div>
          <div class="card-value">${{ formatMoney(results.totalInterest) }}</div>
        </div>
      </div>

      <!-- 饼图占比 -->
      <div class="chart-section">
        <h3>Chart:</h3>
        <div class="pie-chart-container">
          <svg viewBox="0 0 100 100" class="pie-chart">
            <!-- 计算饼图切片 -->
            <circle
              v-for="(slice, index) in pieSlices"
              :key="index"
              cx="50"
              cy="50"
              r="40"
              :stroke-dasharray="slice.dashArray"
              :stroke-dashoffset="slice.offset"
              :stroke="slice.color"
              stroke-width="20"
              fill="transparent"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div class="pie-legend">
            <div class="legend-item">
              <span class="color-box" style="background: #2563eb;"></span>
              <span>Starting Amount ({{ formatPercent(results.startingPercent) }}%)</span>
            </div>
            <div class="legend-item">
              <span class="color-box" style="background: #16a34a;"></span>
              <span>Total Contributions ({{ formatPercent(results.contributionsPercent) }}%)</span>
            </div>
            <div class="legend-item">
              <span class="color-box" style="background: #eab308;"></span>
              <span>Interest ({{ formatPercent(results.interestPercent) }}%)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Accumulation Schedule Tabs -->
      <div class="schedule-section">
        <h3>Accumulation Schedule</h3>

        <div class="schedule-tabs">
          <button
            class="tab-btn small"
            :class="{ active: scheduleView === 'annual' }"
            @click="scheduleView = 'annual'"
          >
            Annual Schedule
          </button>
          <button
            class="tab-btn small"
            :class="{ active: scheduleView === 'monthly' }"
            @click="scheduleView = 'monthly'"
          >
            Monthly Schedule
          </button>
        </div>

        <!-- Annual Schedule Table - 附件7样式 -->
        <div v-if="scheduleView === 'annual'" class="schedule-table-wrapper">
          <div class="schedule-table">
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Deposit</th>
                  <th>Interest</th>
                  <th>Ending balance</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in results.annualSchedule" :key="index">
                  <td>{{ row.year }}</td>
                  <td>${{ formatMoney(row.deposit) }}</td>
                  <td>${{ formatMoney(row.interest) }}</td>
                  <td>${{ formatMoney(row.endingBalance) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Monthly Schedule Table - 附件8样式，分年显示，每年12个月 -->
        <div v-if="scheduleView === 'monthly'" class="schedule-table-wrapper">
          <div v-for="year in uniqueYears" :key="year" class="monthly-year-section">
            <h4>Year {{ year }}</h4>
            <div class="schedule-table">
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Deposit</th>
                    <th>Interest</th>
                    <th>Ending balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in monthlyScheduleByYear(year)" :key="row.month">
                    <td>{{ row.month }}</td>
                    <td>${{ formatMoney(row.deposit) }}</td>
                    <td>${{ formatMoney(row.interest) }}</td>
                    <td>${{ formatMoney(row.endingBalance) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="year < maxYear" class="year-separator">End of year {{ year }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Tools -->
    <div class="related-tools">
      <span class="related-label">Related:</span>
      <a href="#">Interest Calculator</a> <span class="sep">|</span>
      <a href="#">Average Return Calculator</a> <span class="sep">|</span>
      <a href="#">ROI Calculator</a>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h2>Investment Information – FAQ</h2>

      <div class="faq-item">
        <h3>What is investing?</h3>
        <p>Investing is the act of using money to make more money. The Investment Calculator can help determine one of many different variables concerning investments with a fixed rate of return.</p>
      </div>

      <div class="faq-item">
        <h3>What variables are involved in an investment?</h3>
        <p>For any typical financial investment, there are four crucial elements that make up the investment.</p>
        <ul>
          <li><strong>Return rate</strong> – For many investors, this is what matters most. On the surface, it appears as a plain percentage, but it is the cold, hard number used to compare the attractiveness of various sorts of financial investments.</li>
          <li><strong>Starting amount</strong> – Sometimes called the principal, this is the amount apparent at the inception of the investment. In practical investing terms, it can be a large amount saved up for a home, an inheritance, or the purchase price of a quantity of gold.</li>
          <li><strong>End amount</strong> – The desired amount at the end of the life of the investment.</li>
          <li><strong>Investment length</strong> – The length of the life of the investment. Generally, the longer the investment, the riskier it becomes due to the unforeseeable future. Normally, the more periods involved in an investment, the more compounding of return is accrued and the greater the rewards.</li>
          <li><strong>Additional contribution</strong> – Commonly referred to as annuity payment in financial jargon, investments can be made without them. However, any additional contributions during the life of an investment will result in a more accrued return and a higher end value.</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>Different Types of Investments</h3>
        <p>Our Investment Calculator can be used for almost any investment opportunity that can be simplified to the variables above. The following is a list of some common investments. The investment options available are far beyond what was listed.</p>
      </div>

      <div class="faq-item">
        <h3>CDs (Certificates of Deposit)</h3>
        <p>A simple example of a type of investment that can be used with the calculator is a certificate of deposit, or CD, which is available at most banks. A CD is a low-risk investment. In the U.S., most banks are insured by Federal Deposit Insurance Corporation (FDIC), a U.S. government agency. This means the CD is guaranteed by FDIC up to a certain amount. It pays a fixed interest rate for a specified amount of time, giving an easy-to-determine rate of return and investment length. Normally, the longer that money is left in a CD, the higher the rate of interest received. Other low-risk investments of this type include savings accounts and money market accounts, which pay relatively low rates of interest. We have a CD Calculator for investments involving CDs.</p>
      </div>

      <div class="faq-item">
        <h3>Bonds</h3>
        <p>Risk is a key factor when making bond investments. In general, premiums must be paid for greater risks. For example, buying the bonds or debt of some companies rated at a risky level by the agencies that determine levels of risk in corporate debt (Moody's, Fitch, Standard & Poor's) will earn a relatively high rate of interest, but there is always a risk that these companies might go out of business, possibly resulting in losses on investments.</p>
        <p>Buying bonds from companies that are highly rated for being low-risk by the mentioned agencies is much safer, but this earns a lower rate of interest. Bonds can be bought for the short or long term.</p>
        <p>Short-term bond investors want to buy a bond when its price is low and sell it when its price has risen, rather than holding the bond to maturity. Bond prices tend to drop as interest rates rise, and they typically rise when interest rates fall. Within different parts of the bond market, differences in supply and demand can also generate short-term trading opportunities.</p>
        <p>A conservative approach to bond investing is to hold them until maturity. This way, interest payments become available, usually twice a year, and owners receive the face value of the bond at maturity. By following a long-term bond-buying strategy, it is not a requirement to be too concerned about the impact of interest rates on a bond's price or market value. If interest rates rise and the market value of bonds change, the strategy shouldn't change unless there is a decision to sell.</p>
        <p>One very special kind of bond is the United States Treasury inflation-protected securities, known as TIPS. TIPS offers an effective way to handle the risk of inflation. They also provide a risk-free return guaranteed by the U.S. government. For this reason, they are a very popular investment, although the return is relatively low compared to other fixed-income investments. TIPS are guaranteed to keep pace with inflation as defined by the Consumer Price Index (CPI). This is what makes them unique and characterizes their behavior. Please visit our Inflation Calculator for more information about inflation or TIPS.</p>
      </div>

      <div class="faq-item">
        <h3>Stocks</h3>
        <p>Equity or stocks are popular forms of investments. While they are not fixed-interest investments, they are one of the most important forms of investments for both institutional and private investors.</p>
        <p>A stock is a share, literally a percentage of ownership, in a company. It permits a partial owner of a public company to share in its profits, and shareholders receive funds in the form of dividends for as long as the shares are held (and the company pays dividends). Most stocks are traded on exchanges, and many investors purchase stocks with the intent of buying them at a low price and selling them at a higher one (hopefully). Many investors also prefer to invest in mutual funds or other types of stock funds, which group stocks together. These funds are normally managed by a finance manager or firm. The investor pays a small fee called a "load" for the privilege of working with the manager or firm. Another kind of stock fund is the exchange-traded fund (ETF), which tracks an index, sector, commodity, or other assets. An ETF fund can be purchased or sold on a stock exchange the same way as a regular stock. An ETF can be structured to track anything, such as the S&P 500 index, certain types of real estate, commodities, bonds, or other assets.</p>
      </div>

      <div class="faq-item">
        <h3>Real Estate</h3>
        <p>Another popular investment type is real estate. A popular form of investment in real estate is to buy houses or apartments. The owner can then choose to sell them (commonly called flipping) or rent them out in the meantime to maybe sell in the future at a more opportune time. Please consult our comprehensive Rental Property Calculator for more information or to do calculations involving rental properties. Also, land can be bought and made more valuable through improvements. Understandably, not everyone wants to get their hands dirty, and there exist more passive forms of real estate investing such as Real Estate Investment Trusts (REITs), which is a company or fund that owns or finances income-producing real estate. Real estate investing is usually contingent upon values going up, and there can be many reasons as to why they appreciate; examples include gentrification, an increase in the development of surrounding areas, or even certain global affairs.</p>
        <p>Real estate investing takes on many different forms. We offer a selection of real estate calculators that can be helpful.</p>
      </div>

      <div class="faq-item">
        <h3>Commodities</h3>
        <p>Last but not least are commodities. These can range from precious metals like gold and silver, to useful commodities like oil and gas. Investment in gold is complex, as the price of it is not determined by any industrial usage but by the fact that it is valuable due to being a finite resource. It is common for investors to hold gold, particularly in times of financial uncertainty. When there is a war or crisis, investors tend to buy gold and drive the price up. Investing in silver, on the other hand, is very largely determined by the demand for that commodity in photovoltaics, the automobile industry, and other practical uses. Oil is a very popular investment, and demand for oil is strong as the need for gasoline is always considerable. Oil is traded around the world on spot markets, public financial markets where commodities are traded for immediate delivery, and its price goes up and down depending on the state of the global economy. Investment in commodities like gas, on the other hand, is usually made through futures exchanges, of which the largest in the U.S. is the CBOT in Chicago. Futures exchanges trade options on quantities of gas and other commodities before delivery. A private investor can trade into futures and then trade out, always avoiding the terminal delivery point.</p>
        <p>Although the vastly different types of investments listed above (among many others) can be calculated using our Investment Calculator, the real difficulty is trying to arrive at the correct value for each variable. For instance, it is feasible to use either the recent historical average return rates of similarly sold homes or a rate based on future forecasts as the "Return Rate" variable for the investment calculation of a particular house. It is also just as feasible to include all capital expenditures or only a particular stream of cash flows of the purchase of a factory as inputs for "Additional Contribution." Due to this difficulty, there really is no "right" way to arrive at accurate calculations, and results should be taken with a grain of salt. For more precise and detailed calculations, it may be worthwhile to first check out our other financial calculators to see if there is a specific calculator developed for a more specific use before using this Investment Calculator.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvestmentCalculator',
  data() {
    return {
      tabs: [
        { value: 'end', label: 'End Amount' },
        { value: 'additional', label: 'Additional Contribution' },
        { value: 'return', label: 'Return Rate' },
        { value: 'starting', label: 'Starting Amount' },
        { value: 'length', label: 'Investment Length' }
      ],
      compoundOptions: [
        { value: 'annually', label: 'annually' },
        { value: 'semiannually', label: 'semiannually' },
        { value: 'quarterly', label: 'quarterly' },
        { value: 'monthly', label: 'monthly' },
        { value: 'semimonthly', label: 'semimonthly' },
        { value: 'biweekly', label: 'biweekly' },
        { value: 'weekly', label: 'weekly' },
        { value: 'daily', label: 'daily' },
        { value: 'continuously', label: 'continuously' }
      ],
      activeTab: 'end',
      scheduleView: 'annual',
      form: {
        targetAmount: 1000000,
        startingAmount: 20000,
        years: 10,
        returnRate: 6,
        compoundFrequency: 'annually',
        additionalContribution: 1000,
        contributeTiming: 'beginning',
        contributeFrequency: 'year'
      },
      results: {
        calculated: false,
        endBalance: 0,
        startingAmount: 0,
        totalContributions: 0,
        totalInterest: 0,
        startingPercent: 0,
        contributionsPercent: 0,
        interestPercent: 0,
        years: 0,
        targetAmount: 0,
        annualSchedule: [],
        monthlySchedule: []
      }
    };
  },
  computed: {
    getTabTitle() {
      const map = {
        end: 'End Amount',
        additional: 'Additional Contribution',
        return: 'Return Rate',
        starting: 'Starting Amount',
        length: 'Investment Length'
      };
      return map[this.activeTab] || 'Investment Calculator';
    },

    // 获取每期贡献金额
    contributionPerPeriod() {
      if (this.form.contributeFrequency === 'year') {
        return this.form.additionalContribution || 0;
      } else {
        return (this.form.additionalContribution || 0) / 12;
      }
    },

    // 获取每年的期数
    periodsPerYear() {
      const freq = this.form.compoundFrequency;
      if (freq === 'annually') return 1;
      if (freq === 'semiannually') return 2;
      if (freq === 'quarterly') return 4;
      if (freq === 'monthly') return 12;
      if (freq === 'semimonthly') return 24;
      if (freq === 'biweekly') return 26;
      if (freq === 'weekly') return 52;
      if (freq === 'daily') return 365;
      if (freq === 'continuously') return Infinity;
      return 1;
    },

    // 获取每期利率
    ratePerPeriod() {
      const annualRate = (this.form.returnRate || 0) / 100;
      const periods = this.periodsPerYear;
      if (periods === Infinity) {
        return Math.exp(annualRate) - 1; // 连续复利的等效期利率
      }
      return annualRate / periods;
    },

    // 饼图切片
    pieSlices() {
      const slices = [];
      const total = this.results.startingAmount + this.results.totalContributions + this.results.totalInterest;
      if (total === 0) return slices;

      const circumference = 2 * Math.PI * 40; // r=40
      
      // 计算每个切片的角度
      const startPercent = this.results.startingPercent / 100;
      const contribPercent = this.results.contributionsPercent / 100;
      
      // 起始金额切片
      const startLength = circumference * startPercent;
      slices.push({
        dashArray: `${startLength} ${circumference - startLength}`,
        offset: 0,
        color: '#2563eb'
      });
      
      // 贡献金额切片
      const contribLength = circumference * contribPercent;
      const contribOffset = -startLength;
      slices.push({
        dashArray: `${contribLength} ${circumference - contribLength}`,
        offset: contribOffset,
        color: '#16a34a'
      });
      
      // 利息切片
      const interestLength = circumference * (this.results.interestPercent / 100);
      const interestOffset = -(startLength + contribLength);
      slices.push({
        dashArray: `${interestLength} ${circumference - interestLength}`,
        offset: interestOffset,
        color: '#eab308'
      });
      
      return slices;
    },

    // 获取所有不重复的年份（用于月度表）
    uniqueYears() {
      return [...new Set(this.results.monthlySchedule.map(row => row.year))];
    },

    // 获取最大年份
    maxYear() {
      return Math.max(...this.uniqueYears);
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
      desc.content = 'Use our Investment Calculator to estimate how your investments could grow over time. Calculate future value, compound returns, and potential earnings based on your initial investment, contribution amount, and expected rate of return.'
      
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
      // 根据当前标签页执行不同计算
      if (this.activeTab === 'end') {
        this.calculateEndAmount();
      } else if (this.activeTab === 'additional') {
        this.calculateAdditionalContribution();
      } else if (this.activeTab === 'return') {
        this.calculateReturnRate();
      } else if (this.activeTab === 'starting') {
        this.calculateStartingAmount();
      } else if (this.activeTab === 'length') {
        this.calculateInvestmentLength();
      }
    },

    // 计算终值
    calculateEndAmount() {
  const principal = this.form.startingAmount || 0;
  const years = this.form.years || 1;
  const annualRate = (this.form.returnRate || 0) / 100;
  const contribution = this.form.additionalContribution || 0;
  const contributeAtBeginning = this.form.contributeTiming === 'beginning';
  const isMonthlyContribution = this.form.contributeFrequency === 'month';
  
  // 计算等效月利率（基于选定的复合频率）
  let monthlyRate;
  const freq = this.form.compoundFrequency;
  
  if (freq === 'annually') {
    // 按年复利：月利率 = (1 + 年利率)^(1/12) - 1
    monthlyRate = Math.pow(1 + annualRate, 1/12) - 1;
  } else if (freq === 'semiannually') {
    // 半年复利：半年利率 = 年利率/2，再转为月利率
    const semiRate = annualRate / 2;
    monthlyRate = Math.pow(1 + semiRate, 1/6) - 1;
  } else if (freq === 'quarterly') {
    const quarterRate = annualRate / 4;
    monthlyRate = Math.pow(1 + quarterRate, 1/3) - 1;
  } else if (freq === 'monthly') {
    monthlyRate = annualRate / 12;
  } else if (freq === 'semimonthly') {
    // 半月复利：半月利率 = 年利率/24，每月复利2次
    const semiMonthlyRate = annualRate / 24;
    monthlyRate = Math.pow(1 + semiMonthlyRate, 2) - 1;
  } else if (freq === 'biweekly') {
    // 双周复利：双周利率 = 年利率/26，每月约2.1667次
    const biweeklyRate = annualRate / 26;
    monthlyRate = Math.pow(1 + biweeklyRate, 26/12) - 1;
  } else if (freq === 'weekly') {
    // 周复利：周利率 = 年利率/52，每月约4.333次
    const weeklyRate = annualRate / 52;
    monthlyRate = Math.pow(1 + weeklyRate, 52/12) - 1;
  } else if (freq === 'daily') {
    // 日复利：日利率 = 年利率/365，每月约30.417次
    const dailyRate = annualRate / 365;
    monthlyRate = Math.pow(1 + dailyRate, 365/12) - 1;
  } else if (freq === 'continuously') {
    // 连续复利
    monthlyRate = Math.exp(annualRate / 12) - 1;
  } else {
    monthlyRate = annualRate / 12; // 默认按月
  }
  
  const totalMonths = years * 12;
  let balance = principal;
  let totalContributions = 0;
  const monthlySchedule = [];
  const annualSchedule = [];
  
  // 按月循环，共 totalMonths 个月
  for (let month = 1; month <= totalMonths; month++) {
    const year = Math.ceil(month / 12);
    const monthInYear = ((month - 1) % 12) + 1;
    
    // 当月贡献金额
    let monthDeposit = 0;
    
    // 添加贡献（根据时间点）
    if (isMonthlyContribution) {
      // 月度贡献：每月都贡献
      if (contributeAtBeginning) {
        balance += contribution;
        monthDeposit += contribution;
        totalContributions += contribution;
      }
    } else {
      // 年度贡献：只在每年第一个月贡献
      if (monthInYear === 1) {
        if (contributeAtBeginning) {
          balance += contribution;
          monthDeposit += contribution;
          totalContributions += contribution;
        }
      }
    }
    
    // 计算当月利息
    const interest = balance * monthlyRate;
    balance += interest;
    
    // 期末贡献
    if (isMonthlyContribution) {
      if (!contributeAtBeginning) {
        balance += contribution;
        monthDeposit += contribution;
        totalContributions += contribution;
      }
    } else {
      if (monthInYear === 1) {
        if (!contributeAtBeginning) {
          balance += contribution;
          monthDeposit += contribution;
          totalContributions += contribution;
        }
      }
    }
    
    // 记录月度数据
    monthlySchedule.push({
      year: year,
      month: monthInYear,
      deposit: monthDeposit,
      interest: interest,
      endingBalance: balance
    });
    
    // 每年末记录年度数据
    if (monthInYear === 12) {
      const yearData = monthlySchedule.filter(row => row.year === year);
      const yearDeposit = yearData.reduce((sum, row) => sum + row.deposit, 0);
      const yearInterest = yearData.reduce((sum, row) => sum + row.interest, 0);
      
      annualSchedule.push({
        year: year,
        deposit: yearDeposit,
        interest: yearInterest,
        endingBalance: balance
      });
    }
  }
  
  const totalInterest = balance - principal - totalContributions;
  const total = principal + totalContributions + totalInterest;
  
  this.results = {
    calculated: true,
    endBalance: balance,
    startingAmount: principal,
    totalContributions,
    totalInterest,
    startingPercent: total > 0 ? (principal / total * 100) : 0,
    contributionsPercent: total > 0 ? (totalContributions / total * 100) : 0,
    interestPercent: total > 0 ? (totalInterest / total * 100) : 0,
    years: years,
    targetAmount: 0,
    annualSchedule,
    monthlySchedule
  };
  },

    // 计算所需额外贡献
    calculateAdditionalContribution() {
      const principal = this.form.startingAmount || 0;
      const target = this.form.targetAmount || 0;
      const years = this.form.years || 1;
      const rate = this.ratePerPeriod;
      const periodsPerYear = this.periodsPerYear;
      const totalPeriods = years * periodsPerYear;
      const contributeAtBeginning = this.form.contributeTiming === 'beginning';
      const isMonthlyContribution = this.form.contributeFrequency === 'month';
      
      if (principal >= target) {
        this.form.additionalContribution = 0;
        this.calculateEndAmount();
        return;
      }
      
      // 使用二分法求解贡献金额
      let low = 0;
      let high = target * 2;
      let mid = 0;
      let iterations = 0;
      const maxIterations = 100;
      
      while (iterations < maxIterations) {
        mid = (low + high) / 2;
        
        // 根据贡献频率调整每期金额
        const perPeriodContribution = isMonthlyContribution ? mid / 12 : mid;
        
        let balance = principal;
        
        for (let period = 1; period <= totalPeriods; period++) {
          if (isMonthlyContribution) {
            // 月度贡献：每期都贡献
            if (contributeAtBeginning) {
              balance += perPeriodContribution;
            }
          } else {
            // 年度贡献：只在每年第一期贡献
            if (period % periodsPerYear === 1 || periodsPerYear === 1) {
              if (contributeAtBeginning) {
                balance += perPeriodContribution;
              }
            }
          }
          
          balance += balance * rate;
          
          if (isMonthlyContribution) {
            if (!contributeAtBeginning) {
              balance += perPeriodContribution;
            }
          } else {
            if (period % periodsPerYear === 1 || periodsPerYear === 1) {
              if (!contributeAtBeginning) {
                balance += perPeriodContribution;
              }
            }
          }
        }
        
        if (Math.abs(balance - target) < 1) {
          break;
        }
        
        if (balance > target) {
          high = mid;
        } else {
          low = mid;
        }
        
        iterations++;
      }
      
      this.form.additionalContribution = mid;
      this.calculateEndAmount();
    },

    // 计算所需收益率
    calculateReturnRate() {
      const principal = this.form.startingAmount || 0;
      const target = this.form.targetAmount || 0;
      const years = this.form.years || 1;
      const contribution = this.contributionPerPeriod;
      const periodsPerYear = this.periodsPerYear;
      const totalPeriods = years * periodsPerYear;
      const contributeAtBeginning = this.form.contributeTiming === 'beginning';
      const isMonthlyContribution = this.form.contributeFrequency === 'month';
      
      if (principal >= target) {
        this.form.returnRate = 0;
        this.calculateEndAmount();
        return;
      }
      
      // 二分法求解利率
      let low = 0;
      let high = 1; // 100%
      let mid = 0;
      let iterations = 0;
      const maxIterations = 100;
      
      while (iterations < maxIterations) {
        mid = (low + high) / 2;
        
        let balance = principal;
        
        for (let period = 1; period <= totalPeriods; period++) {
          if (isMonthlyContribution) {
            if (contributeAtBeginning) {
              balance += contribution;
            }
          } else {
            if (period % periodsPerYear === 1 || periodsPerYear === 1) {
              if (contributeAtBeginning) {
                balance += contribution;
              }
            }
          }
          
          balance += balance * mid;
          
          if (isMonthlyContribution) {
            if (!contributeAtBeginning) {
              balance += contribution;
            }
          } else {
            if (period % periodsPerYear === 1 || periodsPerYear === 1) {
              if (!contributeAtBeginning) {
                balance += contribution;
              }
            }
          }
        }
        
        if (Math.abs(balance - target) < 1) {
          break;
        }
        
        if (balance > target) {
          high = mid;
        } else {
          low = mid;
        }
        
        iterations++;
      }
      
      // 将期利率转换为年利率
      const periods = this.periodsPerYear;
      if (periods === Infinity) {
        this.form.returnRate = Math.log(1 + mid) * 100;
      } else {
        this.form.returnRate = mid * periods * 100;
      }
      
      this.calculateEndAmount();
    },

    // 计算所需初始本金
    calculateStartingAmount() {
      const target = this.form.targetAmount || 0;
      const years = this.form.years || 1;
      const contribution = this.contributionPerPeriod;
      const rate = this.ratePerPeriod;
      const periodsPerYear = this.periodsPerYear;
      const totalPeriods = years * periodsPerYear;
      const contributeAtBeginning = this.form.contributeTiming === 'beginning';
      const isMonthlyContribution = this.form.contributeFrequency === 'month';
      
      // 二分法求解初始本金
      let low = 0;
      let high = target;
      let mid = 0;
      let iterations = 0;
      const maxIterations = 100;
      
      while (iterations < maxIterations) {
        mid = (low + high) / 2;
        
        let balance = mid;
        
        for (let period = 1; period <= totalPeriods; period++) {
          if (isMonthlyContribution) {
            if (contributeAtBeginning) {
              balance += contribution;
            }
          } else {
            if (period % periodsPerYear === 1 || periodsPerYear === 1) {
              if (contributeAtBeginning) {
                balance += contribution;
              }
            }
          }
          
          balance += balance * rate;
          
          if (isMonthlyContribution) {
            if (!contributeAtBeginning) {
              balance += contribution;
            }
          } else {
            if (period % periodsPerYear === 1 || periodsPerYear === 1) {
              if (!contributeAtBeginning) {
                balance += contribution;
              }
            }
          }
        }
        
        if (Math.abs(balance - target) < 1) {
          break;
        }
        
        if (balance > target) {
          high = mid;
        } else {
          low = mid;
        }
        
        iterations++;
      }
      
      this.form.startingAmount = mid;
      this.calculateEndAmount();
    },

    // 计算所需投资年限
    calculateInvestmentLength() {
      const principal = this.form.startingAmount || 0;
      const target = this.form.targetAmount || 0;
      const contribution = this.contributionPerPeriod;
      const rate = this.ratePerPeriod;
      const periodsPerYear = this.periodsPerYear;
      const contributeAtBeginning = this.form.contributeTiming === 'beginning';
      const isMonthlyContribution = this.form.contributeFrequency === 'month';
      
      if (principal >= target) {
        this.form.years = 0;
        this.calculateEndAmount();
        return;
      }
      
      // 逐期计算直到达到目标
      let balance = principal;
      let periods = 0;
      const maxPeriods = 1200; // 100年上限
      
      while (balance < target && periods < maxPeriods) {
        periods++;
        
        if (isMonthlyContribution) {
          if (contributeAtBeginning) {
            balance += contribution;
          }
        } else {
          if (periods % periodsPerYear === 1 || periodsPerYear === 1) {
            if (contributeAtBeginning) {
              balance += contribution;
            }
          }
        }
        
        balance += balance * rate;
        
        if (isMonthlyContribution) {
          if (!contributeAtBeginning) {
            balance += contribution;
          }
        } else {
          if (periods % periodsPerYear === 1 || periodsPerYear === 1) {
            if (!contributeAtBeginning) {
              balance += contribution;
            }
          }
        }
      }
      
      this.form.years = periods / periodsPerYear;
      this.calculateEndAmount();
      
      // 更新结果中的年限消息
      this.results.years = this.form.years;
      this.results.targetAmount = target;
    },

    // 按月筛选年度数据
    monthlyScheduleByYear(year) {
      return this.results.monthlySchedule.filter(row => row.year === year);
    },

    clearForm() {
      this.form = {
        targetAmount: 1000000,
        startingAmount: 20000,
        years: 10,
        returnRate: 6,
        compoundFrequency: 'annually',
        additionalContribution: 1000,
        contributeTiming: 'beginning',
        contributeFrequency: 'year'
      };
      this.calculate();
    },

    formatMoney(value) {
      if (value === undefined || value === null || isNaN(value)) return '0.00';
      return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    formatNumber(value) {
      if (value === undefined || value === null || isNaN(value)) return '0';
      return value.toFixed(3);
    },

    formatPercent(value) {
      if (value === undefined || value === null || isNaN(value)) return '0.0';
      return value.toFixed(1);
    }
  },
  mounted() {
    document.title = 'Investment Calculator – Estimate Investment Growth and Future Value'
    // 2. 设置关键meta标签（Google最关注的）
    this.setGoogleMetaTags()
    this.calculate();
  },
  watch: {
    activeTab: {
      handler: 'calculate'
    },
    form: {
      handler: 'calculate',
      deep: true
    }
  }
};
</script>

<style scoped>
/* 移动端优先的样式设计 - 与之前完全一致 */
.investment-calculator {
  max-width: 1200px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 32px;
  box-shadow: 0 20px 40px -10px rgba(0, 34, 68, 0.15);
  padding: 28px 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #11212e;
}

@media (max-width: 480px) {
  .investment-calculator {
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

/* Calculator Tabs */
.calculator-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 12px;
}

.tab-btn {
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 500;
  color: #4b5f73;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.2s;
  flex: 1;
  min-width: 100px;
}

.tab-btn.small {
  min-width: auto;
  flex: 0 1 auto;
}

.tab-btn.active {
  background: #1f3a5f;
  color: white;
}

@media (max-width: 480px) {
  .tab-btn {
    font-size: 0.9rem;
    padding: 6px 10px;
    min-width: 70px;
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

@media (max-width: 480px) {
  .calculator-form h2 {
    font-size: 1.5rem;
  }
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
    width: 160px;
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

.frequency-select {
  padding: 12px 16px;
  border: 1px solid #b6c9dd;
  border-radius: 30px;
  font-size: 0.95rem;
  background: white;
  width: 100%;
  cursor: pointer;
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

.of-text {
  margin: 0 8px;
  color: #1a3349;
}

@media (max-width: 480px) {
  .radio-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .of-text {
    margin: 4px 0;
  }
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
}

/* Results Section */
.results-section {
  background: #f8fafd;
  border-radius: 28px;
  padding: 28px 24px;
  border: 1px solid #dde7f0;
  margin-bottom: 32px;
}

.results-section h2 {
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 24px;
  color: #0b2b44;
}

.result-message {
  background: white;
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 24px;
  font-size: 1.1rem;
  border-left: 4px solid #2563eb;
}

.result-message strong {
  color: #1f3a5f;
}

.results-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 28px;
}

.result-card {
  background: white;
  border-radius: 16px;
  padding: 16px;
  border: 1px solid #d9e2ef;
}

.card-label {
  color: #4b5f73;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.card-value {
  font-weight: 600;
  color: #0b2b44;
  font-size: 1.3rem;
}

.card-value.highlight {
  color: #1f3a5f;
  font-size: 1.5rem;
}

/* Chart Section */
.chart-section {
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 28px;
  border: 1px solid #d9e2ef;
}

.chart-section h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #1e3a5f;
}

.pie-chart-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 32px;
}

.pie-chart {
  width: 160px;
  height: 160px;
}

@media (min-width: 641px) {
  .pie-chart {
    width: 200px;
    height: 200px;
  }
}

.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #2c405c;
}

.color-box {
  width: 20px;
  height: 12px;
  border-radius: 4px;
}

/* Schedule Section */
.schedule-section {
  background: white;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #d9e2ef;
}

.schedule-section h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: #1e3a5f;
}

.schedule-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  border-bottom: 2px solid #d4e2f0;
  padding-bottom: 12px;
}

.schedule-table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.schedule-table {
  min-width: 500px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
}

.schedule-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.schedule-table th {
  background: #e1eaf3;
  padding: 12px 8px;
  text-align: left;
  font-weight: 600;
  color: #1a3349;
  white-space: nowrap;
}

.schedule-table td {
  padding: 10px 8px;
  border-bottom: 1px solid #e9eef3;
  color: #2c405c;
  white-space: nowrap;
}

.schedule-table tr:last-child td {
  border-bottom: none;
}

.monthly-year-section {
  margin-bottom: 24px;
}

.monthly-year-section h4 {
  margin: 0 0 8px 0;
  color: #0f3b5e;
  font-size: 1.1rem;
}

.year-separator {
  text-align: center;
  padding: 12px;
  font-weight: 600;
  color: #4b5f73;
  background: #f0f4fa;
  border-top: 1px dashed #9aa9b9;
  border-bottom: 1px dashed #9aa9b9;
  margin: 16px 0;
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
  margin: 12px 0;
  line-height: 1.6;
  color: #253c54;
  font-size: 0.95rem;
}

.faq-item ul {
  margin: 12px 0;
  padding-left: 24px;
}

.faq-item li {
  margin-bottom: 6px;
  line-height: 1.5;
  color: #2c405c;
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