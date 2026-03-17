<template>
  <div class="paycheck-guide-blog">
    <div class="blog-container">
      <div class="blog-inner">
        <!-- 左上方 Back to Blog + 右上方社交分享 -->
        <div class="blog-nav">
          <div class="nav-left">
            <a href="/blog" class="back-link">← Back to Blog</a>
          </div>
          <div class="nav-right">
            <div class="social-share">
              <a href="#" @click.prevent="shareOnLinkedIn" class="social-link linkedin" title="Share on LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" @click.prevent="shareOnX" class="social-link x" title="Share on X (Twitter)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" @click.prevent="shareOnFacebook" class="social-link facebook" title="Share on Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- 文章主体 (内容完全一致) -->
        <article class="blog-article">
          <h1>Why Is My Paycheck So Much Lower Than My Salary? (Paycheck Calculator Explained)</h1>
          
          <h2>Introduction</h2>
          
          <p>Many employees experience the same moment of confusion when they receive their first paycheck from a new job. The offer letter might promise a $70,000 annual salary, yet the actual paycheck deposited into the bank account appears significantly lower than expected.</p>
          
          <p>This discrepancy often leads to common questions:</p>
          <ul>
            <li>Why is my take-home pay so much smaller than my salary?</li>
            <li>Where is all the money going?</li>
            <li>How do taxes and deductions affect my paycheck?</li>
            <li>How can I estimate my real take-home income?</li>
          </ul>
          
          <p>The answer lies in the difference between gross salary and net pay, along with a variety of taxes and deductions applied to each paycheck.</p>
          
          <p>In this guide, we will explain:</p>
          <ol>
            <li>The difference between salary and take-home pay</li>
            <li>The taxes deducted from paychecks</li>
            <li>Common payroll deductions</li>
            <li>How paycheck calculators estimate take-home income</li>
            <li>Real-world paycheck examples</li>
          </ol>
          
          <p>Understanding how paychecks are calculated helps employees budget better, plan taxes, and avoid surprises when reviewing their earnings.</p>

          <h2>Gross Salary vs Net Pay</h2>
          
          <p>Before analyzing deductions, it's important to understand two key terms.</p>
          
          <h3>Gross Salary</h3>
          <p>Gross salary refers to the total income before taxes or deductions.</p>
          <p>Example:</p>
          <p>Annual salary: $80,000</p>
          <p>This is the number typically listed in job offers and employment contracts.</p>

          <h3>Net Pay (Take-Home Pay)</h3>
          <p>Net pay is the amount actually received after all deductions.</p>
          
          <p>Example:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Annual Salary</td><td>$80,000</td></tr>
                <tr><td>Taxes & Deductions</td><td>$22,000</td></tr>
                <tr><td><strong>Take-home Pay</strong></td><td><strong>$58,000</strong></td></tr>
              </tbody>
            </table>
          </div>
          
          <p>This difference explains why paychecks may appear much smaller than expected.</p>

          <h2>Major Taxes Deducted From Paychecks</h2>
          
          <p>Employees in the United States typically pay several types of taxes automatically withheld by employers.</p>
          <p>These are required by the Internal Revenue Service and other government agencies.</p>

          <h3>1. Federal Income Tax</h3>
          <p>Federal income tax is the largest deduction for most workers.</p>
          <p>The United States uses a progressive tax system, meaning higher income levels are taxed at higher rates.</p>
          
          <p>Example tax brackets:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Income Range</th>
                  <th>Tax Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$0 – $11,000</td><td>10%</td></tr>
                <tr><td>$11,001 – $44,725</td><td>12%</td></tr>
                <tr><td>$44,726 – $95,375</td><td>22%</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Your employer estimates withholding using information from Form W-4.</p>

          <h3>2. Social Security Tax</h3>
          <p>The Social Security tax funds retirement and disability programs.</p>
          <p>It is part of the system administered by the Social Security Administration.</p>
          
          <p>Current rate:</p>
          <ul>
            <li>6.2% of wages</li>
          </ul>
          
          <p>Example:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Salary</th>
                  <th>Social Security Tax</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$70,000</td><td>$4,340</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Employers match this contribution with another 6.2%.</p>

          <h3>3. Medicare Tax</h3>
          <p>Medicare funds healthcare for seniors.</p>
          
          <p>Rate:</p>
          <ul>
            <li>1.45% of wages</li>
          </ul>
          
          <p>Example:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Salary</th>
                  <th>Medicare Tax</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$70,000</td><td>$1,015</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>High earners may also pay an additional 0.9% Medicare surtax.</p>

          <h3>4. State Income Tax</h3>
          <p>Many states impose income tax in addition to federal tax.</p>
          
          <p>Example states with significant income tax include:</p>
          <ul>
            <li>California</li>
            <li>New York</li>
          </ul>
          
          <p>Typical rates range from 3% to 10%.</p>
          
          <p>However, some states have no state income tax, such as:</p>
          <ul>
            <li>Texas</li>
            <li>Florida</li>
          </ul>
          
          <p>Location can therefore significantly affect take-home pay.</p>

          <h2>Common Paycheck Deductions</h2>
          
          <p>Beyond taxes, employers often deduct several additional items from paychecks.</p>

          <h3>1. Health Insurance</h3>
          <p>Many employers offer healthcare coverage.</p>
          
          <p>Monthly premiums might range from:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Plan Type</th>
                  <th>Monthly Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Individual plan</td><td>$150 – $400</td></tr>
                <tr><td>Family plan</td><td>$400 – $900</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Employer contributions often reduce the employee's cost.</p>

          <h3>2. Retirement Contributions</h3>
          <p>Employees frequently contribute to retirement plans such as a 401(k).</p>
          <p>A 401(k) plan is regulated under the framework established by the U.S. Department of Labor.</p>
          
          <p>Example contribution:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Salary</th>
                  <th>Contribution Rate</th>
                  <th>Annual Contribution</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$80,000</td><td>5%</td><td>$4,000</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Many employers also provide matching contributions.</p>

          <h3>3. Flexible Spending Accounts (FSA)</h3>
          <p>FSAs allow employees to set aside pre-tax income for healthcare or childcare expenses.</p>
          
          <p>Benefits include:</p>
          <ul>
            <li>lower taxable income</li>
            <li>tax-free medical spending</li>
          </ul>

          <h3>4. Other Deductions</h3>
          <p>Some paychecks may include deductions for:</p>
          <ul>
            <li>life insurance</li>
            <li>union dues</li>
            <li>commuter benefits</li>
            <li>student loan repayment programs</li>
          </ul>

          <h2>Example Paycheck Breakdown</h2>
          
          <p>Let's analyze a realistic scenario.</p>
          
          <p>Employee profile:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Salary</td><td>$75,000</td></tr>
                <tr><td>State</td><td>California</td></tr>
                <tr><td>401(k) Contribution</td><td>5%</td></tr>
                <tr><td>Health Insurance</td><td>$250/month</td></tr>
              </tbody>
            </table>
          </div>
          
          <h3>Annual Paycheck Calculation</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Gross Salary</td><td>$75,000</td></tr>
                <tr><td>Federal Tax</td><td>$9,800</td></tr>
                <tr><td>Social Security</td><td>$4,650</td></tr>
                <tr><td>Medicare</td><td>$1,088</td></tr>
                <tr><td>State Tax</td><td>$3,000</td></tr>
                <tr><td>401(k)</td><td>$3,750</td></tr>
                <tr><td>Health Insurance</td><td>$3,000</td></tr>
                <tr><td><strong>Net Income</strong></td><td><strong>≈ $49,712</strong></td></tr>
              </tbody>
            </table>
          </div>

          <h3>Monthly Take-Home Pay</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Gross Monthly Pay</td><td>$6,250</td></tr>
                <tr><td>Total Deductions</td><td>$2,108</td></tr>
                <tr><td><strong>Take-Home Pay</strong></td><td><strong>$4,142</strong></td></tr>
              </tbody>
            </table>
          </div>
          
          <p>This example shows how deductions can reduce income by 30–35%.</p>

          <h2>How Paycheck Calculators Work</h2>
          
          <p>A paycheck calculator estimates net income by applying tax formulas and deduction rules.</p>
          
          <p>These tools usually request the following inputs:</p>
          <ul>
            <li>annual salary</li>
            <li>filing status</li>
            <li>state of residence</li>
            <li>pay frequency</li>
            <li>retirement contributions</li>
            <li>health insurance deductions</li>
          </ul>
          
          <p>Once entered, the calculator estimates:</p>
          <ul>
            <li>federal tax withholding</li>
            <li>payroll taxes</li>
            <li>state taxes</li>
            <li>net paycheck amount</li>
          </ul>
          
          <p>This helps employees predict their real earnings before accepting a job offer.</p>

          <div class="calculator-link-section">
            <p>You can experiment with different scenarios using a <a href="/paycheck">Paycheck Calculator here</a></p>
          </div>

          <h2>Pay Frequency and Paychecks</h2>
          
          <p>Another factor affecting paycheck size is pay frequency.</p>
          
          <p>Common pay schedules include:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Pay Schedule</th>
                  <th>Paychecks per Year</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Weekly</td><td>52</td></tr>
                <tr><td>Bi-weekly</td><td>26</td></tr>
                <tr><td>Semi-monthly</td><td>24</td></tr>
                <tr><td>Monthly</td><td>12</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>For example:</p>
          <p>$72,000 salary paid bi-weekly:</p>
          <p>$72,000 ÷ 26 = $2,769 gross per paycheck</p>
          <p>Taxes and deductions are applied to each paycheck.</p>

          <h2>Why Paychecks Feel Smaller Than Expected</h2>
          
          <p>Several psychological factors contribute to the shock many employees feel when seeing their paycheck.</p>
          
          <ol>
            <li><strong>Job Offers Show Gross Salary</strong> – Offer letters rarely emphasize net income.</li>
            <li><strong>Taxes Are Invisible Until Payday</strong> – Taxes are automatically withheld.</li>
            <li><strong>Benefits Are Deducted Automatically</strong> – Insurance and retirement contributions reduce visible income.</li>
            <li><strong>Progressive Tax Systems</strong> – Higher income pushes workers into higher tax brackets.</li>
          </ol>

          <h2>Strategies to Increase Take-Home Pay</h2>
          
          <p>While taxes cannot be avoided entirely, several strategies can increase net income.</p>

          <h3>Optimize W-4 Withholding</h3>
          <p>Updating your W-4 form ensures tax withholding matches your situation.</p>
          <p>Too much withholding reduces monthly take-home pay.</p>

          <h3>Use Pre-Tax Benefits</h3>
          <p>Programs like:</p>
          <ul>
            <li>health savings accounts</li>
            <li>retirement plans</li>
            <li>commuter benefits</li>
          </ul>
          <p>reduce taxable income.</p>

          <h3>Employer Matching Contributions</h3>
          <p>Always contribute enough to capture full employer matches.</p>
          <p>Failing to do so means leaving free money on the table.</p>

          <h3>Consider State Taxes When Relocating</h3>
          <p>States with no income tax can significantly increase net pay.</p>
          <p>For example, moving from California to Texas may increase take-home income by several thousand dollars annually.</p>

          <h2>Example Salary vs Take-Home Pay Comparison</h2>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Salary</th>
                  <th>Estimated Take-Home</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$50,000</td><td>~$38,000</td></tr>
                <tr><td>$75,000</td><td>~$55,000</td></tr>
                <tr><td>$100,000</td><td>~$72,000</td></tr>
                <tr><td>$150,000</td><td>~$102,000</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Actual results vary based on location and deductions.</p>

          <h2>Why Understanding Your Paycheck Matters</h2>
          
          <p>Knowing how your paycheck works allows you to:</p>
          <ul>
            <li>build realistic budgets</li>
            <li>negotiate salaries more effectively</li>
            <li>optimize retirement contributions</li>
            <li>plan tax strategies</li>
          </ul>
          
          <p>Many workers overestimate their actual income simply because they focus only on the headline salary number.</p>
          <p>Understanding deductions helps align financial expectations with reality.</p>

          <h2>Conclusion</h2>
          
          <p>If your paycheck feels smaller than your salary suggests, you are not alone. The gap between gross salary and take-home pay is the result of multiple taxes and deductions, including federal income tax, payroll taxes, retirement contributions, and employee benefits.</p>
          
          <p>Key takeaways include:</p>
          <ul>
            <li>Salary listed in job offers represents gross income</li>
            <li>Federal, state, and payroll taxes significantly reduce take-home pay</li>
            <li>Benefits and retirement contributions also affect paychecks</li>
            <li>Paycheck calculators help estimate real income before accepting jobs</li>
          </ul>
          
          <p>By understanding how paychecks are calculated, employees can better manage finances, optimize tax strategies, and make smarter career decisions.</p>
          
          <p>Ultimately, the best way to avoid paycheck surprises is to estimate your net income using a paycheck calculator and review your deductions carefully. Doing so provides a clearer picture of what you truly earn—and how to maximize it.</p>
        </article>
      </div> <!-- /blog-inner -->
    </div> <!-- /blog-container -->
  </div> <!-- /paycheck-guide-blog -->
</template>

<script>
export default {
  name: 'PaycheckGuideBlog',
  methods: {
    shareOnLinkedIn() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    },
    shareOnX() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('Why Is My Paycheck So Much Lower Than My Salary? (Paycheck Calculator Explained)');
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    },
    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }
  }
}
</script>

<style scoped>
/* 完整布局，保持与原文一致 */
.paycheck-guide-blog {
  background-color: #f3f7fc;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem 1rem;
}

.blog-container {
  max-width: 1100px;
  width: 100%;
  background: #ffffff;
  border-radius: 40px;
  box-shadow: 0 25px 50px -12px rgba(0, 42, 76, 0.25);
}

.blog-inner {
  padding: 2.5rem 3rem;
}

@media (max-width: 700px) {
  .blog-inner {
    padding: 1.5rem;
  }
}

/* 左上方 Back + 右上方社交分享 */
.blog-nav {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.nav-left {
  flex: 1;
}

.nav-right {
  flex-shrink: 0;
}

.back-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: 520;
  color: #1d4e7c;
  background-color: #ecf3fa;
  border: 1px solid #b9d1ef;
  border-radius: 40px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  transition: 0.15s;
}

.back-link:hover {
  background-color: #dde9fc;
  border-color: #7ba9e6;
}

@media (max-width: 600px) {
  .back-link {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
  }
}

/* 社交分享按钮 */
.social-share {
  display: flex;
  gap: 12px;
  align-items: center;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ecf3fa;
  color: #1d4e7c;
  transition: all 0.2s ease;
}

.social-link:hover {
  transform: translateY(-2px);
}

.social-link.linkedin:hover {
  background: #0077b5;
  color: white;
}

.social-link.x:hover {
  background: #000000;
  color: white;
}

.social-link.facebook:hover {
  background: #1877f2;
  color: white;
}

.social-link svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 600px) {
  .blog-nav {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .nav-right {
    width: 100%;
  }
  
  .social-share {
    justify-content: flex-start;
  }
  
  .social-link {
    width: 32px;
    height: 32px;
  }
}

/* 文章标题 */
.blog-article h1 {
  font-size: 2.6rem;
  font-weight: 750;
  color: #0b2542;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

@media (max-width: 700px) {
  .blog-article h1 {
    font-size: 2rem;
  }
}

.blog-article h2 {
  font-size: 1.9rem;
  font-weight: 680;
  margin: 2.2rem 0 1rem 0;
  color: #0f3b5e;
  border-bottom: 2px solid #dde7f3;
  padding-bottom: 0.3rem;
}

@media (max-width: 700px) {
  .blog-article h2 {
    font-size: 1.5rem;
  }
}

.blog-article h3 {
  font-size: 1.5rem;
  margin: 1.8rem 0 0.8rem;
  color: #17466b;
}

@media (max-width: 700px) {
  .blog-article h3 {
    font-size: 1.2rem;
  }
}

.blog-article p {
  margin-bottom: 1rem;
  color: #1a2e44;
  font-size: 1.05rem;
  line-height: 1.6;
}

@media (max-width: 700px) {
  .blog-article p {
    font-size: 0.95rem;
  }
}

.blog-article ul,
.blog-article ol {
  margin-bottom: 1rem;
  padding-left: 2rem;
  color: #1a2e44;
  font-size: 1.05rem;
}

@media (max-width: 700px) {
  .blog-article ul,
  .blog-article ol {
    font-size: 0.95rem;
  }
}

.blog-article li {
  margin-bottom: 0.3rem;
}

/* 表格样式 */
.table-wrap {
  overflow-x: auto;
  margin: 1.5rem 0;
  background: #f9fcff;
  border-radius: 20px;
  border: 1px solid #cbd9ec;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  min-width: 400px;
}

@media (max-width: 700px) {
  table {
    font-size: 0.85rem;
  }
}

th {
  background-color: #e2edfd;
  color: #0a3455;
  font-weight: 600;
  padding: 0.75rem 1rem;
  text-align: left;
}

td {
  padding: 0.7rem 1rem;
  border-bottom: 1px solid #c8daf2;
}

tr:last-child td {
  border-bottom: none;
}

/* 计算器链接样式 */
.calculator-link-section {
  margin: 2rem 0;
  padding: 1rem;
  background: #ecf3fa;
  border-radius: 16px;
  text-align: center;
  font-size: 1.1rem;
}

.calculator-link-section a {
  color: #1f4a7a;
  font-weight: 600;
  text-decoration: underline;
}

.calculator-link-section a:hover {
  color: #0b2b44;
}
</style>