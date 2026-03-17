<template>
  <div class="cd-calculator">
    <!-- Header -->
    <h1 class="main-title">Certificate of Deposit (CD) Calculator</h1>
    <p class="description">
      The Certificate of Deposit (CD) Calculator helps you estimate how much interest you can earn from a CD investment over time. By entering your initial deposit, interest rate, compounding frequency, and term length, you can quickly calculate the future value of your certificate of deposit.CDs are a popular low-risk savings option offered by banks and credit unions. This calculator allows you to compare different interest rates and terms to understand how your savings may grow and how much total interest you could earn by the end of the CD term.
    </p>

    <!-- Calculator Form - 附件1样式 -->
    <div class="calculator-form">
      <h2>Certificate of Deposit Calculator</h2>

      <!-- Initial Deposit -->
      <div class="form-row">
        <label>Initial deposit</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input
              type="number"
              v-model.number="form.initialDeposit"
              @input="calculate"
              min="0"
              step="1000"
              placeholder="10000"
            />
          </div>
        </div>
      </div>

      <!-- Interest Rate -->
      <div class="form-row">
        <label>Interest rate</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <input
              type="number"
              step="0.1"
              v-model.number="form.interestRate"
              @input="calculate"
              min="0"
              max="20"
              placeholder="5"
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
            <option value="annually">annually (APY)</option>
            <option value="semiannually">semiannually</option>
            <option value="quarterly">quarterly</option>
            <option value="monthly">monthly</option>
            <option value="continuously">continuously</option>
          </select>
        </div>
      </div>

      <!-- Deposit Length -->
      <div class="form-row">
        <label>Deposit length</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <input
              type="number"
              v-model.number="form.years"
              @input="calculate"
              min="0"
              max="30"
              step="0.5"
              placeholder="3"
            />
            <span>years</span>
          </div>
        </div>
      </div>

      <!-- Marginal Tax Rate -->
      <div class="form-row">
        <label>Marginal tax rate</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <input
              type="number"
              step="0.1"
              v-model.number="form.taxRate"
              @input="calculate"
              min="0"
              max="50"
              placeholder="0"
            />
            <span class="percent-symbol">%</span>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button @click="calculate">Calculate</button>
        <button class="clear" @click="clearForm">Clear</button>
      </div>
    </div>

    <!-- Results Section - 附件2样式 -->
    <div class="results-section" v-if="results.calculated">
      <h2>Results</h2>

      <!-- End Balance -->
      <div class="result-card end-balance">
        <div class="result-label">End balance</div>
        <div class="result-value">${{ formatMoney(results.endBalance) }}</div>
      </div>

      <!-- Total Interest -->
      <div class="result-card total-interest">
        <div class="result-label">Total interest</div>
        <div class="result-value">${{ formatMoney(results.totalInterest) }}</div>
      </div>

      <!-- Pie Chart Visualization -->
      <div class="pie-chart-container">
        <div class="pie-chart">
          <svg viewBox="0 0 100 100" class="pie-svg">
            <!-- Initial deposit slice -->
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#2563eb"
              stroke-width="20"
              :stroke-dasharray="pieChartData.initialDash"
              stroke-dashoffset="0"
              transform="rotate(-90 50 50)"
            />
            <!-- Interest slice -->
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#16a34a"
              stroke-width="20"
              :stroke-dasharray="pieChartData.interestDash"
              :stroke-dashoffset="pieChartData.interestOffset"
              transform="rotate(-90 50 50)"
            />
          </svg>
        </div>
        <div class="pie-legend">
          <div class="legend-item">
            <span class="color-box" style="background: #2563eb;"></span>
            <span>Initial deposit ({{ results.initialPercent.toFixed(0) }}%)</span>
          </div>
          <div class="legend-item">
            <span class="color-box" style="background: #16a34a;"></span>
            <span>Interest ({{ results.interestPercent.toFixed(0) }}%)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Accumulation Schedule Tabs -->
    <div class="schedule-section" v-if="results.calculated">
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

      <!-- Annual Schedule Table -->
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

      <!-- Monthly Schedule Table - 附件3样式，分年显示 -->
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

    <!-- Related Tools -->
    <div class="related-tools">
      <span class="related-label">Related:</span>
      <a href="/investment">Investment Calculator</a> <span class="sep">|</span>
      <a href="/interest">Interest Calculator</a>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h2>Certificate of Deposit (CD) Information – FAQ</h2>

      <div class="faq-item">
        <h3>What is a Certificate of Deposit?</h3>
        <p>A certificate of deposit is an agreement to deposit money for a fixed period that will pay interest. Common term lengths range from three months to five years. The lengthier the term, the higher the exposure to interest rate risk. Generally, the larger the initial deposit, or the longer the investment period, the higher the interest rate. As a type of investment, CDs fall on the low-risk, low-return end of the spectrum. Historically, interest rates of CDs tend to be higher than rates of savings accounts and money markets, but much lower than the historical average return rate of the equity market. There are also different types of CDs with varying rates of interest or rates linked to indexes of various kinds, but the calculator can only do calculations based on fixed-rate CDs.</p>
        <p>The gains from CDs are taxable as income in the U.S. unless they are in accounts that are tax-deferred or tax-free, such as an IRA or Roth IRA. For more information about or to do calculations involving a traditional IRA or Roth IRA, please visit the IRA Calculator or Roth IRA Calculator.</p>
        <p>CDs are called "certificates of deposit" because before electronic transfers were invented, buyers of CDs were issued certificates in exchange for their deposits as a way for financial institutions to keep track of buyers of their CDs. Receiving actual certificates for making deposits is no longer practiced today, as transactions are done electronically.</p>
      </div>

      <div class="faq-item">
        <h3>FDIC-Backed</h3>
        <p>One of the defining characteristics of CDs in the U.S. is that they are protected by the Federal Deposit Insurance Corporation (FDIC). CDs that originate from FDIC-insured banks are insured for up to $250,000, meaning that if banks fail, up to $250,000 of each depositor's funds is guaranteed to be safe. Anyone who wishes to deposit more than the $250,000 limit and wants all of it to be FDIC-insured can simply buy CDs from other FDIC-insured banks. Due to this insurance, there are few lower-risk investments. Similarly, credit unions are covered by insurance from the National Credit Union Administration (NCUA insurance), which provides essentially the same insurance coverage on deposits as the FDIC.</p>
      </div>

      <div class="faq-item">
        <h3>Where and How to Purchase CDs</h3>
        <p>CDs are typically offered by many financial institutions (including the largest banks) as fixed-income investments. Different banks offer different interest rates on CDs, so it is important to first shop around and compare maturity periods of CDs, especially their annual percentage yields (APY). This ultimately determines how much interest is received. The process of buying CDs is straightforward; an initial deposit will be required, along with the desired term. CDs tend to have various minimum deposit requirements. Brokers can also charge fees for CDs purchased through them.</p>
        <p>"Buying" a CD is effectively lending money to the seller of the CD. Financial institutions use the funds from sold CDs to re-lend (and profit from the difference), hold in their reserves, spend for their operations, or take care of other miscellaneous expenses. Along with the federal funds rate, all of these factors play a part in determining the interest rates that each financial institution will pay on their CDs.</p>
      </div>

      <div class="faq-item">
        <h3>History of CDs</h3>
        <p>Although they weren't called CDs then, a financial concept similar to that of a modern CD was first used by European banks in the 1600s. These banks gave a receipt to account holders for the funds they deposited, which they lent to merchants. However, to ensure that account holders did not withdraw their funds while they were lent out, the banks began to pay interest for the use of their money for a designated period of time. This sort of financial transaction is essentially how a modern CD operates.</p>
        <p>A major turning point for CDs happened in the early twentieth century after the stock market crash of 1929, which was partly due to unregulated banks that didn't have reserve requirements. In response, the FDIC was established to regulate banks and give investors (such as CD holders) assurance that the government would protect their assets up to a limit.</p>
        <p>Historically, rates of CD yields have varied greatly. During the high-inflation years of the late 1970s and 1980s, CDs had return rates of almost 20%. After that the CD rates declined steadily. In late 2007, just before the economy spiraled downward, they were at around 4%. In comparison, the one-year CD yield is below 1% in 2021. It gradually increased in 2022, reaching more than 5% in 2023 and 2024 due to rising inflation. It began to decline in mid-2024, with the downward trend continuing into 2025 and 2026 as inflation gradually came under control. In the U.S., the Federal Reserve, which controls federal funds rates, calibrates them accordingly based on the economic climate.</p>
      </div>

      <div class="faq-item">
        <h3>How to Use CDs</h3>
        <p>CDs are effective financial instruments when it comes to protecting savings, building short-term wealth, and ensuring returns without risk. With these key benefits in mind, it is possible to capitalize on CDs by using them to:</p>
        <ul>
          <li>supplement diversified portfolios to reduce total risk exposure. This can come in handy as retirees get closer to their retirement date and require a more guaranteed return to ensure they have savings in retirement to live off of.</li>
          <li>act as a short-term (5 years or less) place to put extra money that isn't needed or isn't required until a set future date. This can come in handy when saving for a down payment for a home or car several years in the future.</li>
          <li>estimate future returns accurately because most CDs have fixed rates. The result of this is a useful investment for people who prefer predictability.</li>
        </ul>
        <p>As the maturity date for a CD approaches, CD owners have options of what to do next. In most cases, if nothing is done after the maturity date, the funds will likely be reinvested into another similar CD. If not, it is possible for buyers to notify the sellers to transfer the funds into a checking or savings account, or reinvest into a different CD.</p>
      </div>

      <div class="faq-item">
        <h3>Withdrawing from a CD</h3>
        <p>Funds that are invested in CDs are meant to be tied up for the life of the certificate, and any early withdrawals are normally subject to a penalty (except liquid CDs). The severity of the penalty depends on the length of the CD and the issuing institution. As an aside, in certain rising interest rate environments, it can be financially beneficial to pay the early withdrawal penalty in order to reinvest the proceeds into new higher-yielding CDs or other investments.</p>
      </div>

      <div class="faq-item">
        <h3>CD Ladder</h3>
        <p>While longer-term CDs offer higher returns, an obvious drawback to them is that the funds are locked up for longer. A CD ladder is a common strategy employed by investors that attempts to circumvent this drawback by using multiple CDs. Instead of renewing just one CD with a specific amount, the CD is split up into multiple amounts for multiple CDs in a setup that allows them to mature at staggered intervals. For example, instead of investing all funds into a 3-year CD, the funds are used to invest in 3 different CDs at the same time with terms of 1, 2, and 3 years. As one matures, making principal and earnings available, proceeds can be optionally reinvested into a new CD or withdrawal. CD laddering can be beneficial when more flexibility is required, by giving a person access to previously invested funds at more frequent intervals, or the ability to purchase new CDs at higher rates if interest rates go up.</p>
      </div>

      <div class="faq-item">
        <h3>APY vs. APR</h3>
        <p>It is important to make the distinction between annual percentage yield (APY) and annual percentage rate (APR). Banks tend to use APR for debt-related accounts such as mortgages, credit cards, and car loans, whereas APY is often related to interest-accruing accounts such as CDs and money market investments. APY denotes the amount of interest earned with compound interest accounted for in an entire year, while APR is the annualized representation of the monthly interest rate. APY is typically the more accurate representation of effective net gains or losses, and CDs are often advertised in APY rates.</p>
      </div>

      <div class="faq-item">
        <h3>Compounding Frequency</h3>
        <p>The calculator contains options for different compounding frequencies. As a rule of thumb, the more frequently compounding occurs, the greater the return. To understand the differences between compounding frequencies or to do calculations involving them, please use our Compound Interest Calculator.</p>
      </div>

      <div class="faq-item">
        <h3>Types of CDs</h3>
        <ul>
          <li><strong>Traditional CD</strong>—Investors receive fixed interest rates over a specified period of time. Money can only be withdrawn without penalty after maturity, and there are also options to roll earnings over for more terms. Traditional CDs that require initial deposits of $100,000 or more are often referred to as "jumbo" CDs, and usually have higher interest rates.</li>
          <li><strong>Bump-Up CD</strong>—Investors are allowed to "bump up" preexisting interest rates on CDs to match higher current market rates. Bump-up CDs offer the best returns for investors who hold them while interest rates increase. Compared to traditional CDs, these generally receive lower rates.</li>
          <li><strong>Liquid CD</strong>—Investors can withdraw from liquid CDs without penalties, but they require maintaining a minimum balance. Interest rates are relatively lower than other types of CDs, but for the most part, still higher than savings accounts or money market investments.</li>
          <li><strong>Zero-Coupon CD</strong>—Similar to zero-coupon bonds, these CDs contain no interest payments. Rather, they are reinvested in order to earn more interest. Zero-coupon CDs are bought at fractions of their par values (face value, or amount received at maturity), and generally have longer terms compared to traditional CDs, which can expose investors to considerable risk.</li>
          <li><strong>Callable CD</strong>—Issuers that sell callable CDs can possibly recall them from their investors after call-protection periods expire and before they mature, resulting in the return of the initial deposit and any subsequent interest earnings. To make up for this, sellers offer higher rates for these CDs than other types.</li>
          <li><strong>Brokered CD</strong>—These are different in that they are sold in brokerage accounts and not through financial institutions such as banks or credit unions. An advantage to brokered CDs is that there is exposure to a wide variety of CDs instead of just the CDs offered by individual banks.</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>Alternatives to CDs</h3>
        <ul>
          <li><strong>Paying off Debt</strong>—Especially for high-interest debt, paying off existing debt is a great alternative to CDs because it is essentially a guaranteed rate of return, compared to any further investment. Comparatively, even the interest rate of a low rate loan, such as a home mortgage, is normally higher than CDs, making it financially rewarding to pay off a loan than to collect interest from CD.</li>
          <li><strong>Money Market Accounts</strong>—Investors who like the security of a CD and are okay with slightly lower returns can consider money market accounts, which are certain types of FDIC-insured savings accounts that have restrictions such as limits on how funds can be withdrawn. They are generally offered by banks.</li>
          <li><strong>Bonds</strong>—Similar to CDs, bonds are relatively low-risk financial instruments. Bonds are sold by the government (municipal, state, or federal) or corporate entities.</li>
          <li><strong>Peer-to-Peer Lending</strong>—Peer-to-peer (P2P) lending is a fairly new form of lending that arose from advances in internet technology that enables lenders and borrowers to link up on an online platform. Peer borrowers request loans through the platform, and lenders can fund the loans they find desirable. Each P2P lending service will come with rules in order to regulate cases of default.</li>
          <li><strong>Bundled Mortgages</strong>—Commonly available through mutual funds, bundled mortgages are securities that are traded in a similar manner as bonds but generally yield more than Treasury securities. Although they received a lot of negative publicity for the role they played in the 2008 financial crisis, mortgage securities have bounced back through more stringent regulations. Bundled mortgages are backed by the Government National Mortgage Association (Ginnie Mae).</li>
        </ul>
        <p>Listed above are just some of the low-risk alternatives to CDs. There are much more investment options for those that can tolerate higher risk.</p>
      </div>
    </div>
 <!-- Calculator CTA -->
    <section class="section calculator-cta">
    <a href="/how-to-calculate-certificate-of-deposit-interest-blog" class="calculator-btn">
    How to Calculate Certificate of Deposit Interest (CD Calculator + Real Examples) →
    </a>
    </section>
    
  </div>
</template>

<script>
export default {
  name: 'CDCalculator',
  data() {
    return {
      scheduleView: 'annual',
      form: {
        initialDeposit: 10000,
        interestRate: 5,
        compoundFrequency: 'annually',
        years: 3,
        taxRate: 0
      },
      results: {
        calculated: false,
        endBalance: 0,
        totalInterest: 0,
        initialPercent: 0,
        interestPercent: 0,
        annualSchedule: [],
        monthlySchedule: []
      }
    };
  },
  computed: {
    // 获取所有不重复的年份（用于月度表）
    uniqueYears() {
      return [...new Set(this.results.monthlySchedule.map(row => row.year))];
    },

    // 获取最大年份
    maxYear() {
      return Math.max(...this.uniqueYears);
    },

    // 饼图数据
    pieChartData() {
      const circumference = 2 * Math.PI * 40; // r=40
      const initialPercent = this.results.initialPercent / 100;
      const interestPercent = this.results.interestPercent / 100;
      
      const initialLength = circumference * initialPercent;
      const interestLength = circumference * interestPercent;
      
      return {
        initialDash: `${initialLength} ${circumference - initialLength}`,
        interestDash: `${interestLength} ${circumference - interestLength}`,
        interestOffset: -initialLength
      };
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
      desc.content = 'Use this Certificate of Deposit (CD) Calculator to estimate your CD interest earnings and future value. Enter your deposit amount, interest rate, and term to calculate how much your CD investment could grow over time.'
      
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
      const principal = this.form.initialDeposit || 0;
      const annualRate = (this.form.interestRate || 0) / 100;
      const years = this.form.years || 0;
      const taxRate = (this.form.taxRate || 0) / 100;
      
      if (principal <= 0 || years <= 0) {
        this.results.calculated = false;
        return;
      }

      const totalMonths = Math.round(years * 12);
      let balance = principal;
      let totalInterest = 0;
      const monthlySchedule = [];
      const annualSchedule = [];

      // 计算每月等效利率
      let monthlyRate;
      const freq = this.form.compoundFrequency;
      
      if (freq === 'annually') {
        monthlyRate = Math.pow(1 + annualRate, 1/12) - 1;
      } else if (freq === 'semiannually') {
        const semiRate = annualRate / 2;
        monthlyRate = Math.pow(1 + semiRate, 1/6) - 1;
      } else if (freq === 'quarterly') {
        const quarterRate = annualRate / 4;
        monthlyRate = Math.pow(1 + quarterRate, 1/3) - 1;
      } else if (freq === 'monthly') {
        monthlyRate = annualRate / 12;
      } else if (freq === 'continuously') {
        // 连续复利：A = P * e^(rt)
        // 每月等效：取第12个月的等效月利率
        monthlyRate = Math.exp(annualRate / 12) - 1;
      } else {
        monthlyRate = annualRate / 12;
      }

      // 按月循环计算
      for (let month = 1; month <= totalMonths; month++) {
        const year = Math.ceil(month / 12);
        const monthInYear = ((month - 1) % 12) + 1;
        
        // 计算当月利息
        const interest = balance * monthlyRate;
        
        // 只记录初始存款（无额外存款）
        const monthDeposit = month === 1 ? principal : 0;
        
        // 更新余额
        balance += interest;
        
        // 记录月度数据
        monthlySchedule.push({
          year: year,
          month: monthInYear,
          deposit: monthDeposit,
          interest: interest,
          endingBalance: balance
        });
        
        // 年末记录年度数据
        if (monthInYear === 12 || month === totalMonths) {
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

      // 计算总利息
      totalInterest = balance - principal;
      
      // 应用税率
      const afterTaxInterest = totalInterest * (1 - taxRate);
      const afterTaxBalance = principal + afterTaxInterest;

      // 计算百分比
      const initialPercent = principal / afterTaxBalance * 100;
      const interestPercent = afterTaxInterest / afterTaxBalance * 100;

      this.results = {
        calculated: true,
        endBalance: afterTaxBalance,
        totalInterest: afterTaxInterest,
        initialPercent: initialPercent,
        interestPercent: interestPercent,
        annualSchedule: annualSchedule,
        monthlySchedule: monthlySchedule
      };
    },

    // 按月筛选年度数据
    monthlyScheduleByYear(year) {
      return this.results.monthlySchedule.filter(row => row.year === year);
    },

    clearForm() {
      this.form = {
        initialDeposit: 10000,
        interestRate: 5,
        compoundFrequency: 'annually',
        years: 3,
        taxRate: 0
      };
      this.calculate();
    },

    formatMoney(value) {
      if (value === undefined || value === null || isNaN(value)) return '0.00';
      return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
  mounted() {
     document.title = 'Certificate of Deposit (CD) Calculator – Estimate CD Interest and Future Value'
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
.cd-calculator {
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
  .cd-calculator {
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
  min-width: 120px;
}

@media (min-width: 641px) {
  .form-row label {
    width: 120px;
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

.input-with-symbol input,
.frequency-select {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  padding: 8px 0;
  min-width: 0;
  width: 100%;
}

.input-with-symbol input:focus,
.frequency-select:focus {
  outline: none;
}

.frequency-select {
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

.result-card {
  background: white;
  border-radius: 16px;
  padding: 20px 24px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d9e2ef;
}

.result-card.end-balance {
  border-left: 6px solid #2563eb;
}

.result-card.total-interest {
  border-left: 6px solid #16a34a;
}

.result-label {
  color: #4b5f73;
  font-size: 1.1rem;
  font-weight: 500;
}

.result-value {
  font-weight: 700;
  color: #0b2b44;
  font-size: 1.5rem;
}

/* Pie Chart */
.pie-chart-container {
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-top: 20px;
  border: 1px solid #d9e2ef;
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

.pie-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
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

@media (min-width: 641px) {
  .pie-chart {
    width: 200px;
    height: 200px;
  }
}

/* Schedule Section */
.schedule-section {
  background: white;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #d9e2ef;
  margin-bottom: 32px;
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

.tab-btn.small {
  min-width: auto;
  flex: 0 1 auto;
  padding: 8px 20px;
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
  margin: 8px 0;
  line-height: 1.6;
  color: #253c54;
  font-size: 0.95rem;
}

.faq-item ul {
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
</style>