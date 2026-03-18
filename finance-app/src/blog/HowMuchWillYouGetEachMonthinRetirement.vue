<template>
  <div class="pension-guide-blog">
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
          <h1>Pension Calculator: How Much Will You Get Each Month in Retirement?</h1>
          
          <h2>Introduction</h2>
          
          <p>One of the most important questions in retirement planning is:</p>
          
          <p class="quote">"How much income will I actually receive each month after I retire?"</p>
          
          <p>While many people focus on total savings, what truly matters is monthly income—because that determines your lifestyle, spending ability, and financial security.</p>
          
          <p>A pension calculator helps answer this by estimating how much income you can expect from:</p>
          <ul>
            <li>government pensions</li>
            <li>employer pension plans</li>
            <li>personal retirement savings</li>
          </ul>
          
          <p>In this comprehensive guide, we'll break down how pension income is calculated, walk through real-world scenarios, and show how to estimate your monthly retirement income with precision.</p>

          <h2>Executive Summary</h2>
          
          <ul>
            <li>Pension income is typically calculated based on salary, years of service, and benefit formulas</li>
            <li>Monthly retirement income often combines multiple sources</li>
            <li>Small changes in assumptions (retirement age, returns) can significantly impact results</li>
            <li>Pension calculators help convert savings into predictable monthly income</li>
          </ul>
          
          <p><strong>Key takeaway:</strong></p>
          <p class="highlight">👉 Retirement success is not about how much you save—it's about how much you can spend each month sustainably</p>

          <h2>Types of Pension Income</h2>
          
          <p>Understanding pension income starts with identifying the sources.</p>

          <h3>1. Government Pension</h3>
          <p>In the U.S., retirement income often includes benefits from the Social Security Administration.</p>
          <p>These benefits are based on:</p>
          <ul>
            <li>lifetime earnings</li>
            <li>retirement age</li>
            <li>contribution history</li>
          </ul>

          <h3>2. Employer Pension (Defined Benefit Plan)</h3>
          <p>Traditional pensions provide fixed monthly payments based on a formula.</p>
          
          <p><strong>Typical formula:</strong></p>
          <div class="formula-block">
            <p><strong>Annual Pension = Salary × Years of Service × Benefit Multiplier</strong></p>
          </div>
          
          <p>Example:</p>
          <ul>
            <li>Salary: $70,000</li>
            <li>Years worked: 30</li>
            <li>Multiplier: 1.5%</li>
          </ul>
          <p>Result:</p>
          <p>$70,000 × 30 × 1.5% = $31,500/year</p>
          <p>≈ $2,625/month</p>

          <h3>3. Defined Contribution Plans</h3>
          <p>These include:</p>
          <ul>
            <li>401(k)</li>
            <li>IRA</li>
          </ul>
          <p>Unlike pensions, they do not guarantee income—you must convert savings into monthly withdrawals.</p>

          <h2>How a Pension Calculator Works</h2>
          
          <p>A pension calculator estimates monthly income by combining different inputs.</p>

          <h3>Key Inputs</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Variable</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Retirement Age</td><td>When you stop working</td></tr>
                <tr><td>Life Expectancy</td><td>How long income is needed</td></tr>
                <tr><td>Savings</td><td>Total retirement funds</td></tr>
                <tr><td>Return Rate</td><td>Investment growth</td></tr>
                <tr><td>Withdrawal Rate</td><td>% withdrawn annually</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Core Calculation Concept</h3>
          <p>Monthly income is often estimated using the safe withdrawal rule:</p>
          <div class="formula-block">
            <p><strong>Annual Withdrawal ≈ 4% of Total Savings</strong></p>
          </div>
          <p>Then converted into monthly income.</p>

          <h2>Scenario Comparison Table</h2>
          
          <p>Let's analyze different retirement savings scenarios.</p>
          
          <h3>Assumptions</h3>
          <ul>
            <li>Retirement age: 65</li>
            <li>Return: 6%</li>
            <li>Withdrawal rate: 4%</li>
          </ul>

          <h3>Scenario Table</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Savings</th>
                  <th>Annual Income</th>
                  <th>Monthly Income</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$300,000</td><td>$12,000</td><td>$1,000</td></tr>
                <tr><td>$500,000</td><td>$20,000</td><td>$1,667</td></tr>
                <tr><td>$800,000</td><td>$32,000</td><td>$2,667</td></tr>
                <tr><td>$1,000,000</td><td>$40,000</td><td>$3,333</td></tr>
                <tr><td>$1,500,000</td><td>$60,000</td><td>$5,000</td></tr>
              </tbody>
            </table>
          </div>
          
          <p><strong>Key Insight</strong></p>
          <p>Even a $1M portfolio generates about $3,300/month, which surprises many people.</p>

          <div class="calculator-link-section">
            <p>You can experiment with different scenarios using a <a href="/pension">Pension Calculator here</a></p>
          </div>

          <h2>Visual Breakdown (Conceptual)</h2>
          
          <p>Your retirement income typically comes from three layers:</p>
          <ol>
            <li>Government pension (Social Security)</li>
            <li>Employer pension (if available)</li>
            <li>Personal savings</li>
          </ol>
          
          <p>Example:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Monthly Income</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Social Security</td><td>$1,800</td></tr>
                <tr><td>401(k) withdrawals</td><td>$2,200</td></tr>
                <tr><td>Other savings</td><td>$1,000</td></tr>
                <tr><td><strong>Total</strong></td><td><strong>$5,000/month</strong></td></tr>
              </tbody>
            </table>
          </div>

          <h2>Real-Life Example</h2>
          
          <h3>Profile</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Age</td><td>40</td></tr>
                <tr><td>Savings</td><td>$200,000</td></tr>
                <tr><td>Annual Contribution</td><td>$10,000</td></tr>
                <tr><td>Return</td><td>7%</td></tr>
                <tr><td>Retirement Age</td><td>65</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Results</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Final Savings</td><td>~$1.1M</td></tr>
                <tr><td>Annual Income</td><td>~$44,000</td></tr>
                <tr><td>Monthly Income</td><td>~$3,667</td></tr>
              </tbody>
            </table>
          </div>
          <p>This example shows how consistent investing builds sustainable income.</p>

          <h2>Factors That Impact Pension Income</h2>
          
          <h3>1. Retirement Age</h3>
          <p>Delaying retirement increases:</p>
          <ul>
            <li>savings growth</li>
            <li>pension benefits</li>
            <li>Social Security payouts</li>
          </ul>

          <h3>2. Investment Returns</h3>
          <p>Even small differences matter.</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Return</th>
                  <th>Final Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>5%</td><td>$900K</td></tr>
                <tr><td>7%</td><td>$1.1M</td></tr>
                <tr><td>9%</td><td>$1.4M</td></tr>
              </tbody>
            </table>
          </div>

          <h3>3. Withdrawal Rate</h3>
          <p>Higher withdrawals increase income—but also risk running out of money.</p>

          <h3>4. Inflation</h3>
          <p>Inflation reduces purchasing power.</p>
          <p>Example:</p>
          <ul>
            <li>$3,000/month today may feel like $2,000 in 20 years</li>
          </ul>

          <h2>Pension vs Savings-Based Retirement</h2>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Pension</th>
                  <th>Savings</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Income</td><td>Guaranteed</td><td>Variable</td></tr>
                <tr><td>Risk</td><td>Low</td><td>Market-dependent</td></tr>
                <tr><td>Flexibility</td><td>Low</td><td>High</td></tr>
              </tbody>
            </table>
          </div>
          <p>Most modern retirees rely more on savings than pensions.</p>

          <h2>How Much Monthly Income Do You Need?</h2>
          
          <p>A common rule:</p>
          <p class="highlight">👉 Replace 70%–80% of pre-retirement income</p>
          
          <p>Example:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Pre-Retirement Salary</th>
                  <th>Needed Income</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$60,000</td><td>$42,000–$48,000</td></tr>
                <tr><td>$100,000</td><td>$70,000–$80,000</td></tr>
              </tbody>
            </table>
          </div>

          <h2>The 4% Rule Explained</h2>
          
          <p>The 4% rule suggests you can withdraw 4% annually without running out of money.</p>
          
          <p>Example:</p>
          <ul>
            <li>$1,000,000 → $40,000/year</li>
            <li>→ $3,333/month</li>
          </ul>
          <p>It's widely used but not perfect.</p>

          <h2>Common Mistakes</h2>
          
          <h3>Underestimating Expenses</h3>
          <p>Healthcare costs rise significantly in retirement.</p>

          <h3>Overestimating Returns</h3>
          <p>Assuming high returns can lead to shortfalls.</p>

          <h3>Ignoring Inflation</h3>
          <p>Inflation quietly erodes purchasing power.</p>

          <h3>Retiring Too Early</h3>
          <p>Shortens accumulation period and increases withdrawal years.</p>

          <h2>How to Increase Monthly Pension Income</h2>
          
          <h3>Increase Contributions</h3>
          <p>Saving more early leads to exponential growth.</p>

          <h3>Delay Retirement</h3>
          <p>Each additional year:</p>
          <ul>
            <li>increases savings</li>
            <li>reduces withdrawal period</li>
          </ul>

          <h3>Optimize Investments</h3>
          <p>Balanced portfolios improve long-term returns.</p>

          <h3>Reduce Fees</h3>
          <p>Lower fees = higher net returns.</p>

          <h2>Using a Pension Calculator Effectively</h2>
          
          <p>To get realistic estimates:</p>
          <ul>
            <li>test multiple scenarios</li>
            <li>adjust return rates conservatively</li>
            <li>include all income sources</li>
            <li>factor in inflation</li>
          </ul>

          <h3>Scenario Testing Examples</h3>
          <ul>
            <li>What if I retire at 62 vs 67?</li>
            <li>What if returns are lower?</li>
            <li>What if I save 5% more?</li>
          </ul>

          <h2>Putting It All Together</h2>
          
          <p>Let's combine everything into a full example.</p>

          <h3>Comprehensive Retirement Scenario</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Savings</td><td>$900,000</td></tr>
                <tr><td>Social Security</td><td>$2,000/month</td></tr>
                <tr><td>Withdrawal</td><td>$3,000/month</td></tr>
              </tbody>
            </table>
          </div>
          
          <p><strong>Total monthly income:</strong></p>
          <p class="highlight">👉 $5,000/month</p>

          <h2>Interpretation</h2>
          
          <p>This level of income supports a moderate retirement lifestyle in many areas.</p>

          <h2>Why Monthly Income Matters More Than Total Savings</h2>
          
          <p>Many people aim for a "magic number" like $1 million.</p>
          <p>But what really matters is:</p>
          <p class="highlight">👉 How much you can spend each month without running out of money</p>
          <p>A pension calculator translates savings into real-life income.</p>

          <h2>Conclusion</h2>
          
          <p>Planning for retirement isn't just about accumulating wealth—it's about turning that wealth into predictable, sustainable monthly income.</p>
          
          <p>A pension calculator helps you:</p>
          <ul>
            <li>estimate retirement income</li>
            <li>understand trade-offs</li>
            <li>adjust your strategy early</li>
          </ul>
          
          <p>Key takeaways:</p>
          <ul>
            <li>Monthly income is the most important metric</li>
            <li>Multiple income sources should be considered</li>
            <li>Small changes today can significantly impact retirement</li>
            <li>Planning early provides the biggest advantage</li>
          </ul>

          <h2>Final Thought</h2>
          
          <p>Retirement planning becomes much clearer when you shift your mindset from:</p>
          <p class="quote">👉 "How much will I have?"<br>to<br>👉 "How much will I get each month?"</p>
          
          <p>Because in the end, retirement isn't about a number—it's about financial freedom and peace of mind.</p>
        </article>
      </div> <!-- /blog-inner -->
    </div> <!-- /blog-container -->
  </div> <!-- /pension-guide-blog -->
</template>

<script>
export default {
  name: 'PensionGuideBlog',
  methods: {
    shareOnLinkedIn() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    },
    shareOnX() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('Pension Calculator: How Much Will You Get Each Month in Retirement?');
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
.pension-guide-blog {
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

.quote {
  font-style: italic;
  padding: 8px 20px;
  background: #f7fafc;
  border-left: 4px solid #2c7fb8;
  margin: 16px 0;
  font-size: 1.2rem;
  color: #1e3a5f;
}

.highlight {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f3a5f;
  background: #ecf3fa;
  padding: 8px 16px;
  border-radius: 8px;
  display: inline-block;
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