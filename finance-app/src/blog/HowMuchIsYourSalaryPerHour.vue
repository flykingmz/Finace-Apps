<template>
  <div class="salary-guide-blog">
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
          <h1>Salary Calculator: How Much Is Your Salary Per Hour, Day, Week, and Month?</h1>
          
          <h2>Introduction</h2>
          
          <p>When people talk about income, they usually refer to annual salary. A job offer might say $80,000 per year, but that number alone doesn't tell the full story about how much you actually earn per hour, per day, per week, or per month.</p>
          
          <p>Understanding how to convert salary into different time-based earnings helps you:</p>
          <ul>
            <li>Compare job offers more accurately</li>
            <li>Understand the real value of your time</li>
            <li>Plan budgets and expenses</li>
            <li>Estimate overtime value</li>
            <li>Evaluate side income opportunities</li>
          </ul>
          
          <p>Many professionals also use salary conversions to answer practical questions like:</p>
          <ul>
            <li>How much do I really make per hour?</li>
            <li>What is my daily income?</li>
            <li>How much should I expect per paycheck?</li>
          </ul>
          
          <p>This guide explains how salary calculations work, including formulas, real-world examples, comparison tables, and practical insights.</p>

          <h2>Why Converting Salary Matters</h2>
          
          <p>Annual salaries can be misleading because they hide the true value of time.</p>
          
          <p>For example:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Salary</th>
                  <th>Sounds Like</th>
                  <th>Hourly Reality</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$50,000</td><td>Solid income</td><td>~$24/hour</td></tr>
                <tr><td>$80,000</td><td>High salary</td><td>~$38/hour</td></tr>
                <tr><td>$120,000</td><td>Very high</td><td>~$57/hour</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>These numbers assume a standard 40-hour work week.</p>
          <p>Understanding this conversion is especially useful for:</p>
          <ul>
            <li>freelancers</li>
            <li>remote workers</li>
            <li>consultants</li>
            <li>part-time professionals</li>
          </ul>
          <p>It also helps employees negotiate salaries more effectively.</p>

          <h2>Standard Work Assumptions</h2>
          
          <p>Most salary calculators rely on a few standard assumptions about work schedules.</p>
          
          <h3>Typical Work Schedule</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Hours per day</td><td>8</td></tr>
                <tr><td>Days per week</td><td>5</td></tr>
                <tr><td>Weeks per year</td><td>52</td></tr>
                <tr><td>Total hours per year</td><td>2,080</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Calculation:</p>
          <div class="formula-block">
            <p><strong>40 hours/week × 52 weeks = 2,080 hours</strong></p>
          </div>
          
          <p>This 2,080-hour figure is widely used in payroll and compensation calculations.</p>

          <h2>Salary Conversion Formulas</h2>
          
          <p>To convert annual salary into other time periods, simple formulas are used.</p>
          
          <h3>Hourly Wage</h3>
          <div class="formula-block">
            <p><strong>Hourly Pay = Annual Salary ÷ 2,080</strong></p>
          </div>
          <p>Example:</p>
          <p>$80,000 salary</p>
          <div class="formula-block">
            <p><strong>80,000 ÷ 2,080 = $38.46/hour</strong></p>
          </div>

          <h3>Daily Pay</h3>
          <div class="formula-block">
            <p><strong>Daily Pay = Annual Salary ÷ 260</strong></p>
          </div>
          <p>(260 workdays per year)</p>
          <p>Example:</p>
          <div class="formula-block">
            <p><strong>80,000 ÷ 260 = $307.69/day</strong></p>
          </div>

          <h3>Weekly Pay</h3>
          <div class="formula-block">
            <p><strong>Weekly Pay = Annual Salary ÷ 52</strong></p>
          </div>
          <p>Example:</p>
          <div class="formula-block">
            <p><strong>80,000 ÷ 52 = $1,538/week</strong></p>
          </div>

          <h3>Monthly Pay</h3>
          <div class="formula-block">
            <p><strong>Monthly Pay = Annual Salary ÷ 12</strong></p>
          </div>
          <p>Example:</p>
          <div class="formula-block">
            <p><strong>80,000 ÷ 12 = $6,667/month</strong></p>
          </div>

          <h2>Salary Conversion Table</h2>
          
          <p>Below is a common salary conversion chart.</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Annual Salary</th>
                  <th>Hourly</th>
                  <th>Daily</th>
                  <th>Weekly</th>
                  <th>Monthly</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$40,000</td><td>$19.23</td><td>$154</td><td>$769</td><td>$3,333</td></tr>
                <tr><td>$60,000</td><td>$28.85</td><td>$231</td><td>$1,154</td><td>$5,000</td></tr>
                <tr><td>$80,000</td><td>$38.46</td><td>$308</td><td>$1,538</td><td>$6,667</td></tr>
                <tr><td>$100,000</td><td>$48.08</td><td>$385</td><td>$1,923</td><td>$8,333</td></tr>
                <tr><td>$150,000</td><td>$72.12</td><td>$577</td><td>$2,885</td><td>$12,500</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>These estimates assume a standard work schedule and no overtime.</p>

          <h2>Real-World Salary Examples</h2>
          
          <h3>Example 1: $60,000 Salary</h3>
          <p>Let's convert a $60,000 annual salary.</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Hourly</td><td>$28.85</td></tr>
                <tr><td>Daily</td><td>$231</td></tr>
                <tr><td>Weekly</td><td>$1,154</td></tr>
                <tr><td>Monthly</td><td>$5,000</td></tr>
              </tbody>
            </table>
          </div>
          <p>This breakdown helps workers understand their earnings on a practical level.</p>
          <p>For instance:</p>
          <ul>
            <li>Missing one workday ≈ $231</li>
            <li>One hour meeting ≈ $29</li>
          </ul>

          <h3>Example 2: $90,000 Salary</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Hourly</td><td>$43.27</td></tr>
                <tr><td>Daily</td><td>$346</td></tr>
                <tr><td>Weekly</td><td>$1,731</td></tr>
                <tr><td>Monthly</td><td>$7,500</td></tr>
              </tbody>
            </table>
          </div>
          <p>Understanding hourly value helps employees evaluate overtime or freelance opportunities.</p>

          <h3>Example 3: $120,000 Salary</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Hourly</td><td>$57.69</td></tr>
                <tr><td>Daily</td><td>$462</td></tr>
                <tr><td>Weekly</td><td>$2,308</td></tr>
                <tr><td>Monthly</td><td>$10,000</td></tr>
              </tbody>
            </table>
          </div>
          <p>Many professionals use this calculation to estimate consulting rates.</p>

          <h2>Salary vs Take-Home Pay</h2>
          
          <p>One important factor to remember is that salary conversions use gross income, not take-home pay.</p>
          <p>Actual income is reduced by taxes and deductions.</p>
          <p>In the United States, workers pay taxes to the Internal Revenue Service.</p>
          
          <p>Typical deductions include:</p>
          <ul>
            <li>federal income tax</li>
            <li>state income tax</li>
            <li>Social Security tax</li>
            <li>Medicare tax</li>
            <li>retirement contributions</li>
            <li>health insurance</li>
          </ul>
          
          <p>For example:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Salary</th>
                  <th>Estimated Take-Home</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$60,000</td><td>~$46,000</td></tr>
                <tr><td>$80,000</td><td>~$60,000</td></tr>
                <tr><td>$100,000</td><td>~$72,000</td></tr>
              </tbody>
            </table>
          </div>
          <p>Actual values depend on location and benefits.</p>

          <h2>Impact of State Taxes</h2>
          
          <p>State taxes can significantly affect real earnings.</p>
          
          <p>For example, employees living in high-tax states such as:</p>
          <ul>
            <li>California</li>
            <li>New York</li>
          </ul>
          <p>may pay 8–12% state income tax.</p>
          
          <p>Meanwhile, states with no income tax include:</p>
          <ul>
            <li>Texas</li>
            <li>Florida</li>
          </ul>
          
          <p>Workers moving between these states can see thousands of dollars difference in take-home income.</p>

          <h2>How Salary Calculators Work</h2>
          
          <p>A salary calculator converts income into different time periods automatically.</p>
          
          <p>Most calculators ask for:</p>
          <ul>
            <li>annual salary</li>
            <li>hours worked per week</li>
            <li>weeks worked per year</li>
          </ul>
          
          <p>The tool then calculates:</p>
          <ul>
            <li>hourly pay</li>
            <li>daily earnings</li>
            <li>weekly income</li>
            <li>monthly salary</li>
          </ul>
          
          <p>Advanced calculators may also include:</p>
          <ul>
            <li>tax estimates</li>
            <li>overtime calculations</li>
            <li>net income estimates</li>
          </ul>
          
          <p>These tools are widely used by job seekers and HR professionals.</p>

          <div class="calculator-link-section">
            <p>You can experiment with different scenarios using a <a href="/salary-calculator">Salary Calculator here</a></p>
          </div>

          <h2>Adjusting for Different Work Hours</h2>
          
          <p>Not everyone works a standard 40-hour schedule.</p>
          
          <h3>Example: 35-Hour Work Week</h3>
          <p>If you earn $70,000 but work 35 hours weekly:</p>
          <p>Total yearly hours:</p>
          <div class="formula-block">
            <p><strong>35 × 52 = 1,820 hours</strong></p>
          </div>
          <p>Hourly pay becomes:</p>
          <div class="formula-block">
            <p><strong>70,000 ÷ 1,820 = $38.46/hour</strong></p>
          </div>
          <p>This is higher than the standard 40-hour conversion.</p>

          <h3>Example: 50-Hour Work Week</h3>
          <p>If you earn $80,000 but work 50 hours weekly:</p>
          <div class="formula-block">
            <p><strong>50 × 52 = 2,600 hours</strong></p>
          </div>
          <p>Hourly pay becomes:</p>
          <div class="formula-block">
            <p><strong>80,000 ÷ 2,600 = $30.77/hour</strong></p>
          </div>
          <p>Even though salary appears high, hourly value may be lower than expected.</p>

          <h2>Salary vs Hourly Jobs</h2>
          
          <p>Some jobs are paid hourly instead of annually.</p>
          
          <p>To convert hourly wage into salary:</p>
          <div class="formula-block">
            <p><strong>Annual Salary = Hourly Pay × Hours per Week × 52</strong></p>
          </div>
          
          <p>Example:</p>
          <p>$25/hour job</p>
          <div class="formula-block">
            <p><strong>25 × 40 × 52 = $52,000 salary equivalent</strong></p>
          </div>

          <h2>Salary Negotiation Insights</h2>
          
          <p>Understanding salary conversions can improve negotiation strategies.</p>
          
          <h3>Example</h3>
          <p>Two job offers:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Offer</th>
                  <th>Salary</th>
                  <th>Weekly Hours</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Job A</td><td>$90,000</td><td>40</td></tr>
                <tr><td>Job B</td><td>$100,000</td><td>55</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Hourly comparison:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Hourly Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Job A</td><td>$43/hour</td></tr>
                <tr><td>Job B</td><td>$35/hour</td></tr>
              </tbody>
            </table>
          </div>
          <p>Even though Job B pays more annually, Job A pays more per hour.</p>

          <h2>Common Salary Conversion Mistakes</h2>
          
          <h3>Ignoring Taxes</h3>
          <p>Gross salary doesn't reflect real income.</p>
          
          <h3>Ignoring Work Hours</h3>
          <p>Long hours reduce hourly value.</p>
          
          <h3>Ignoring Benefits</h3>
          <p>Some jobs include valuable benefits like:</p>
          <ul>
            <li>retirement matching</li>
            <li>health insurance</li>
            <li>bonuses</li>
          </ul>
          <p>These should be considered in total compensation.</p>

          <h2>Salary Planning for Financial Goals</h2>
          
          <p>Converting salary helps with budgeting and financial planning.</p>
          
          <p>For example:</p>
          <p>Monthly salary helps plan:</p>
          <ul>
            <li>rent or mortgage payments</li>
            <li>groceries</li>
            <li>transportation</li>
            <li>savings</li>
          </ul>
          
          <p>Financial planners often recommend saving 20% of income.</p>

          <h3>Example Monthly Budget</h3>
          <p>$80,000 salary (~$6,667/month gross)</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Housing</td><td>$2,000</td></tr>
                <tr><td>Transportation</td><td>$600</td></tr>
                <tr><td>Food</td><td>$700</td></tr>
                <tr><td>Savings</td><td>$1,200</td></tr>
                <tr><td>Other expenses</td><td>$1,200</td></tr>
              </tbody>
            </table>
          </div>
          <p>Understanding monthly income makes budgeting far easier.</p>

          <h2>When Salary Conversions Are Most Useful</h2>
          
          <p>Salary calculators are particularly useful for:</p>
          <ul>
            <li>job comparisons</li>
            <li>freelance rate calculations</li>
            <li>overtime evaluation</li>
            <li>budgeting</li>
            <li>relocation decisions</li>
          </ul>
          <p>They provide a clearer picture of income than annual salary alone.</p>

          <h2>Conclusion</h2>
          
          <p>While annual salary is the most common way to describe income, it often hides the true value of work. Converting salary into hourly, daily, weekly, and monthly earnings provides a much clearer understanding of compensation.</p>
          
          <p>Key takeaways include:</p>
          <ul>
            <li>Most salary calculations assume 2,080 work hours per year</li>
            <li>Converting salary helps evaluate job offers and hourly value</li>
            <li>Taxes and deductions reduce actual take-home income</li>
            <li>Work hours significantly affect hourly pay</li>
            <li>Salary calculators simplify these conversions instantly</li>
          </ul>
          
          <p>Whether you are negotiating a job offer, planning a budget, or comparing opportunities, understanding how salary translates across time periods is one of the most practical financial skills you can develop.</p>
          
          <p>A salary calculator makes this process simple—allowing you to instantly see what your income truly looks like across hours, days, weeks, and months.</p>
        </article>
      </div> <!-- /blog-inner -->
    </div> <!-- /blog-container -->
  </div> <!-- /salary-guide-blog -->
</template>

<script>
export default {
  name: 'SalaryGuideBlog',
  methods: {
    shareOnLinkedIn() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    },
    shareOnX() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('Salary Calculator: How Much Is Your Salary Per Hour, Day, Week, and Month?');
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    },
    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }
  },
  mounted() {
    document.title = 'Salary Calculator: How Much Is Your Salary Per Hour, Day, Week, and Month?'
  }
}
</script>

<style scoped>
/* 完整布局，保持与原文一致 */
.salary-guide-blog {
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

/* 公式块 */
.formula-block {
  background: #f0f7ff;
  border-left: 4px solid #2c7fb8;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 16px 16px 0;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
}

@media (max-width: 700px) {
  .formula-block {
    font-size: 0.9rem;
    padding: 0.8rem 1rem;
  }
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