<template>
  <div class="interest-guide-blog">
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
          <h1>How to Calculate Interest on Savings: Simple vs Compound Interest Explained</h1>
          
          <p>Understanding how interest works is essential for anyone trying to grow their savings. Whether you are saving in a bank account, investing in bonds, or using long-term investment vehicles, the way interest is calculated will determine how quickly your money grows.</p>
          
          <p>Two fundamental concepts dominate the world of savings and investments: simple interest and compound interest. While both generate returns on your savings, they operate very differently and can produce dramatically different outcomes over time.</p>
          
          <p>This guide explains how to calculate interest on savings, the mathematical formulas behind simple and compound interest, and how these calculations impact long-term financial growth.</p>

          <h2>1. Why Interest Matters for Savings</h2>
          
          <p>Interest is essentially the cost of borrowing money or the reward for saving it. When you deposit money into a savings account or investment vehicle, financial institutions compensate you for allowing them to use your capital.</p>
          
          <p>Interest can be paid in several forms:</p>
          <ul>
            <li>Bank savings interest</li>
            <li>Certificate of deposit (CD) returns</li>
            <li>Bond yields</li>
            <li>Investment returns</li>
          </ul>
          
          <p>However, the method used to calculate interest determines how much money you will actually earn.</p>
          
          <p>For long-term savers, even small differences in interest calculations can produce significant financial outcomes.</p>

          <h2>2. What Is Simple Interest?</h2>
          
          <p>Simple interest is the most straightforward method of calculating returns. Under this system, interest is calculated only on the original principal amount.</p>
          
          <p>This means the interest earned does not generate additional interest over time.</p>
          
          <h3>Simple Interest Formula</h3>
          
          <p>The formula used to calculate simple interest is:</p>
          
          <div class="formula-block">
            <p><strong>Simple Interest = Principal × Interest Rate × Time</strong></p>
          </div>
          
          <p>Where:</p>
          <ul>
            <li>Principal (P) = initial amount deposited</li>
            <li>Interest Rate (r) = annual rate expressed as a decimal</li>
            <li>Time (t) = number of years</li>
          </ul>
          
          <p>The total value of the investment is then:</p>
          
          <div class="formula-block">
            <p><strong>Total Value = Principal + Interest</strong></p>
          </div>

          <h2>3. Example of Simple Interest</h2>
          
          <p>Suppose you deposit $10,000 into a savings account that pays 5% simple interest per year for 10 years.</p>
          
          <p><strong>Step 1: Calculate interest</strong></p>
          <p>Interest = 10,000 × 0.05 × 10</p>
          <p>Interest = $5,000</p>
          
          <p><strong>Step 2: Calculate total value</strong></p>
          <p>Total value = 10,000 + 5,000</p>
          <p>Total value = $15,000</p>
          
          <p>In this case, the interest remains fixed each year:</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Interest Earned</th>
                  <th>Total Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>$500</td><td>$10,500</td></tr>
                <tr><td>5</td><td>$2,500</td><td>$12,500</td></tr>
                <tr><td>10</td><td>$5,000</td><td>$15,000</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Because the interest is always based on the original principal, growth occurs at a steady linear pace.</p>

          <h2>4. What Is Compound Interest?</h2>
          
          <p>Compound interest works differently. Instead of calculating interest only on the principal, compound interest calculates returns on both the principal and previously earned interest.</p>
          
          <p>This creates a snowball effect, allowing savings to grow exponentially over time.</p>
          
          <p>Albert Einstein allegedly referred to compound interest as:</p>
          
          <p class="quote">"The eighth wonder of the world."</p>
          
          <p>While the quote may be debated, the concept accurately reflects the power of compounded growth.</p>

          <h2>5. Compound Interest Formula</h2>
          
          <p>The compound interest formula is:</p>
          
          <div class="formula-block">
            <p><strong>A = P (1 + r/n)^(nt)</strong></p>
          </div>
          
          <p>Where:</p>
          <ul>
            <li>A = final investment value</li>
            <li>P = principal</li>
            <li>r = annual interest rate</li>
            <li>n = number of compounding periods per year</li>
            <li>t = number of years</li>
          </ul>
          
          <p>Compounding can occur at different frequencies:</p>
          <ul>
            <li>annually</li>
            <li>quarterly</li>
            <li>monthly</li>
            <li>daily</li>
          </ul>
          
          <p>The more frequently interest compounds, the faster savings grow.</p>

          <h2>6. Example of Compound Interest</h2>
          
          <p>Consider the same scenario as before:</p>
          <ul>
            <li>Initial investment: $10,000</li>
            <li>Interest rate: 5%</li>
            <li>Time period: 10 years</li>
            <li>Compounded annually</li>
          </ul>
          
          <p>Using the formula:</p>
          <p>A = 10,000 × (1.05)^10</p>
          <p>A ≈ $16,289</p>
          
          <p>This produces $1,289 more than the simple interest example.</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Final Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Simple Interest</td><td>$15,000</td></tr>
                <tr><td>Compound Interest</td><td>$16,289</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>The difference becomes significantly larger over longer periods.</p>

          <h2>7. Long-Term Comparison: Simple vs Compound Interest</h2>
          
          <p>The true power of compound interest appears when investments are held for decades.</p>
          
          <p>Example:</p>
          <p>Initial deposit: $10,000</p>
          <p>Interest rate: 5%</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Years</th>
                  <th>Simple Interest</th>
                  <th>Compound Interest</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>10</td><td>$15,000</td><td>$16,289</td></tr>
                <tr><td>20</td><td>$20,000</td><td>$26,533</td></tr>
                <tr><td>30</td><td>$25,000</td><td>$43,219</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>After 30 years, compound interest produces nearly double the total return.</p>
          
          <p>This illustrates why compounding plays a central role in retirement planning and long-term investing.</p>

          <h2>8. Impact of Compounding Frequency</h2>
          
          <p>The number of times interest compounds per year can significantly influence investment growth.</p>
          
          <p>Example:</p>
          <p>$10,000 investment at 5% for 10 years.</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Compounding Frequency</th>
                  <th>Final Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Annually</td><td>$16,289</td></tr>
                <tr><td>Quarterly</td><td>$16,436</td></tr>
                <tr><td>Monthly</td><td>$16,470</td></tr>
                <tr><td>Daily</td><td>$16,487</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Although the differences appear small in short periods, over decades the effect becomes more pronounced.</p>

          <h2>9. Continuous Compounding</h2>
          
          <p>Some financial models use continuous compounding, which assumes interest is calculated infinitely often.</p>
          
          <p>The formula becomes:</p>
          
          <div class="formula-block">
            <p><strong>A = Pe^(rt)</strong></p>
          </div>
          
          <p>Where e is the mathematical constant (approximately 2.71828).</p>
          
          <p>Continuous compounding produces the theoretical maximum growth under a given interest rate.</p>
          
          <p>However, most real financial products compound monthly or daily rather than continuously.</p>

          <h2>10. How Savings Accounts Calculate Interest</h2>
          
          <p>Modern savings accounts usually use compound interest with daily compounding.</p>
          
          <p>The process typically follows these steps:</p>
          <ol>
            <li>Daily interest is calculated using the account balance.</li>
            <li>The interest accumulates throughout the month.</li>
            <li>The bank deposits the earned interest at the end of the statement cycle.</li>
          </ol>
          
          <p>Because interest compounds daily, savers benefit from incremental growth every day.</p>

          <h2>11. The Role of Interest Rates</h2>
          
          <p>Interest rates directly influence how quickly savings grow.</p>
          
          <p>Example: $10,000 invested for 30 years.</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Rate</th>
                  <th>Final Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>3%</td><td>$24,273</td></tr>
                <tr><td>5%</td><td>$43,219</td></tr>
                <tr><td>7%</td><td>$76,123</td></tr>
                <tr><td>10%</td><td>$174,494</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Even a 2% difference in return can produce dramatically different outcomes.</p>
          
          <p>This is why investors carefully compare interest rates across financial products.</p>

          <h2>12. Adding Regular Contributions</h2>
          
          <p>Most savers do not rely solely on an initial deposit. Instead, they contribute regularly.</p>
          
          <p>Adding monthly deposits can significantly accelerate compound growth.</p>
          
          <p>Example:</p>
          <ul>
            <li>Initial investment: $5,000</li>
            <li>Monthly contribution: $200</li>
            <li>Interest rate: 6%</li>
            <li>Investment period: 30 years</li>
          </ul>
          
          <p>Final value ≈ $206,000</p>
          
          <p>Regular contributions create a powerful combination of:</p>
          <ul>
            <li>consistent saving</li>
            <li>compound growth</li>
            <li>long-term financial accumulation</li>
          </ul>

          <h2>13. Inflation and Real Returns</h2>
          
          <p>Interest calculations should also consider inflation, which reduces purchasing power.</p>
          
          <p>If a savings account earns 5% interest but inflation is 3%, the real return is only:</p>
          
          <div class="formula-block">
            <p><strong>Real Return ≈ 2%</strong></p>
          </div>
          
          <p>This means the actual increase in purchasing power is much smaller than the nominal interest rate suggests.</p>
          
          <p>Investors must therefore consider inflation-adjusted returns when planning long-term savings strategies.</p>

          <h2>14. Using a Savings Interest Calculator</h2>
          
          <p>Manually calculating compound interest can be complicated, especially when contributions and compounding frequencies vary.</p>
          
          <p>Online financial calculators simplify the process by allowing users to input:</p>
          <ul>
            <li>starting balance</li>
            <li>monthly contributions</li>
            <li>interest rate</li>
            <li>investment duration</li>
            <li>compounding frequency</li>
          </ul>
          
          <p>These tools instantly generate projections and help users compare savings strategies.</p>
          
          <p>You can experiment with different scenarios using an online calculator here:</p>
          
          <p class="calculator-link">
            <a href="/interest">Interest Calculator</a>
          </p>

          <h2>15. Practical Strategies for Maximizing Interest</h2>
          
          <p>To maximize the growth of your savings, consider the following strategies.</p>
          
          <h3>Start Early</h3>
          <p>The earlier you begin saving, the longer compound interest has to work.</p>
          
          <h3>Contribute Consistently</h3>
          <p>Regular contributions dramatically increase final balances.</p>
          
          <h3>Seek Competitive Interest Rates</h3>
          <p>Even small differences in interest rates can produce significant long-term gains.</p>
          
          <h3>Reinvest Earnings</h3>
          <p>Allowing interest to remain invested enables compounding to accelerate growth.</p>
          
          <h3>Avoid Unnecessary Withdrawals</h3>
          <p>Frequent withdrawals interrupt the compounding process.</p>

          <h2>16. Why Compound Interest Is Essential for Wealth Building</h2>
          
          <p>Compound interest is the foundation of nearly all long-term wealth strategies.</p>
          
          <p>It allows money to grow through exponential expansion rather than linear accumulation.</p>
          
          <p>Over time, compound growth transforms modest savings into substantial financial assets.</p>
          
          <p>For example:</p>
          <ul>
            <li>Saving $300 per month for 35 years at 7% can grow to over $540,000.</li>
          </ul>
          
          <p>This illustrates why financial planners emphasize early and consistent investing.</p>

          <h2>Conclusion</h2>
          
          <p>Understanding how interest works is fundamental to successful financial planning. While simple interest provides predictable and straightforward returns, compound interest offers significantly greater long-term growth.</p>
          
          <p>Key takeaways include:</p>
          <ul>
            <li>Simple interest grows linearly based on the original principal.</li>
            <li>Compound interest grows exponentially by reinvesting earned interest.</li>
            <li>Time, interest rate, and contribution frequency are the most important factors influencing savings growth.</li>
          </ul>
          
          <p>By leveraging compound interest and maintaining consistent savings habits, individuals can dramatically improve their long-term financial outcomes.</p>
          
          <p>For anyone looking to grow their savings effectively, learning how to calculate and optimize interest returns is one of the most valuable financial skills.</p>
        </article>
      </div> <!-- /blog-inner -->
    </div> <!-- /blog-container -->
  </div> <!-- /interest-guide-blog -->
</template>

<script>
export default {
  name: 'InterestGuideBlog',
  methods: {
    shareOnLinkedIn() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    },
    shareOnX() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('How to Calculate Interest on Savings: Simple vs Compound Interest Explained');
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
.interest-guide-blog {
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
.calculator-link {
  margin: 1rem 0 2rem;
}

.calculator-link a {
  color: #1f4a7a;
  font-weight: 600;
  text-decoration: underline;
  font-size: 1.2rem;
}

.calculator-link a:hover {
  color: #0b2b44;
}
</style>