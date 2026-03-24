<template>
  <div class="cd-guide-blog">
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
          <h1>How to Calculate Certificate of Deposit Interest (CD Calculator + Real Examples)</h1>
          
          <h2>Introduction</h2>
          
          <p>Certificates of Deposit (CDs) are among the most popular low-risk savings tools offered by banks and credit unions. They allow individuals to earn a fixed interest rate over a specified term, often higher than traditional savings accounts. For investors looking for predictable returns without market volatility, CDs can play an important role in a diversified financial strategy.</p>
          
          <p>However, many savers do not fully understand how CD interest is calculated. Questions such as:</p>
          <ul>
            <li>How much interest will my CD earn?</li>
            <li>How does compounding affect returns?</li>
            <li>Are longer CD terms always better?</li>
            <li>How can I estimate returns before investing?</li>
          </ul>
          
          <p>Understanding the math behind CD interest allows savers to compare rates, evaluate maturity periods, and optimize savings strategies.</p>
          
          <p>In this guide, we will explain:</p>
          <ul>
            <li>How CD interest works</li>
            <li>The formulas used to calculate returns</li>
            <li>The impact of compounding frequency</li>
            <li>Real-world CD examples</li>
            <li>Strategies for maximizing CD earnings</li>
          </ul>
          
          <p>By the end of this article, you will know exactly how to calculate CD interest and how to estimate your potential earnings.</p>

          <h2>What Is a Certificate of Deposit (CD)?</h2>
          
          <p>A Certificate of Deposit (CD) is a time-based deposit product offered by financial institutions such as JPMorgan Chase or Bank of America.</p>
          
          <p>When you invest in a CD:</p>
          <ol>
            <li>You deposit a fixed amount of money.</li>
            <li>The bank pays a fixed interest rate.</li>
            <li>The money remains locked for a specified term.</li>
          </ol>
          
          <p>Common CD terms include:</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>CD Term</th>
                  <th>Typical Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Short-term CDs</td><td>3–12 months</td></tr>
                <tr><td>Medium-term CDs</td><td>1–3 years</td></tr>
                <tr><td>Long-term CDs</td><td>5+ years</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>In exchange for committing funds for a fixed period, banks typically offer higher interest rates than standard savings accounts.</p>

          <h2>Key Factors That Affect CD Interest</h2>
          
          <p>Several variables determine how much a CD will earn over time.</p>
          
          <h3>1. Principal Amount</h3>
          <p>The principal is the initial deposit placed into the CD.</p>
          <p>Example:</p>
          <ul>
            <li>$5,000 deposit</li>
            <li>$10,000 deposit</li>
          </ul>
          <p>Larger deposits generate more interest.</p>

          <h3>2. Annual Percentage Yield (APY)</h3>
          <p>The Annual Percentage Yield (APY) represents the total yearly return including compounding effects.</p>
          
          <p>Example CD rates:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>CD Term</th>
                  <th>APY</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1-year CD</td><td>4.2%</td></tr>
                <tr><td>3-year CD</td><td>4.5%</td></tr>
                <tr><td>5-year CD</td><td>4.8%</td></tr>
              </tbody>
            </table>
          </div>
          
          <h3>3. Compounding Frequency</h3>
          <p>Interest may compound:</p>
          <ul>
            <li>annually</li>
            <li>quarterly</li>
            <li>monthly</li>
            <li>daily</li>
          </ul>
          <p>The more frequently interest compounds, the higher the effective return.</p>

          <h3>4. CD Term Length</h3>
          <p>Longer terms allow interest to accumulate for a longer period.</p>
          <p>However, longer CDs may also involve:</p>
          <ul>
            <li>liquidity restrictions</li>
            <li>early withdrawal penalties</li>
          </ul>

          <h2>The CD Interest Calculation Formula</h2>
          
          <p>CD returns are usually calculated using the compound interest formula.</p>
          
          <h3>Compound Interest Formula</h3>
          
          <div class="formula-block">
            <p><strong>A = P (1 + r/n)<sup>nt</sup></strong></p>
          </div>
          
          <p>Where:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Variable</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>A</td><td>Final value</td></tr>
                <tr><td>P</td><td>Principal</td></tr>
                <tr><td>r</td><td>Annual interest rate</td></tr>
                <tr><td>n</td><td>Compounding periods per year</td></tr>
                <tr><td>t</td><td>Number of years</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>This formula calculates the total balance at maturity.</p>

          <h2>Example 1: Basic CD Interest Calculation</h2>
          
          <p>Assume the following:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Deposit</td><td>$10,000</td></tr>
                <tr><td>Interest Rate</td><td>4%</td></tr>
                <tr><td>Term</td><td>3 years</td></tr>
                <tr><td>Compounding</td><td>Annually</td></tr>
              </tbody>
            </table>
          </div>
          
          <h3>Calculation</h3>
          <div class="formula-block">
            <p><strong>A = 10,000(1 + 0.04)^3</strong></p>
            <p><strong>A = 10,000 × 1.124864</strong></p>
            <p><strong>Final Value = $11,248.64</strong></p>
            <p><strong>Total Interest Earned = $1,248.64</strong></p>
          </div>

          <h2>Example 2: Monthly Compounding</h2>
          
          <p>Now consider the same CD but compounded monthly.</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Deposit</td><td>$10,000</td></tr>
                <tr><td>Rate</td><td>4%</td></tr>
                <tr><td>Term</td><td>3 years</td></tr>
                <tr><td>Compounding</td><td>Monthly</td></tr>
              </tbody>
            </table>
          </div>
          
          <h3>Calculation</h3>
          <div class="formula-block">
            <p><strong>A = 10,000(1 + 0.04/12)^(36)</strong></p>
            <p><strong>Final Value ≈ $11,273</strong></p>
          </div>
          
          <p>Monthly compounding increases the total return slightly.</p>

          <h2>Example 3: Long-Term CD Growth</h2>
          
          <p>Longer CD durations demonstrate the power of compounding.</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Deposit</th>
                  <th>Rate</th>
                  <th>Term</th>
                  <th>Final Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$10,000</td><td>4.5%</td><td>5 years</td><td>$12,460</td></tr>
                <tr><td>$10,000</td><td>4.5%</td><td>10 years</td><td>$15,529</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>The longer the term, the larger the compound growth.</p>

          <h2>How CD Calculators Work</h2>
          
          <p>A CD calculator automates the compound interest formula and allows users to quickly estimate returns.</p>
          
          <p>Typical CD calculators include inputs for:</p>
          <ul>
            <li>deposit amount</li>
            <li>interest rate</li>
            <li>compounding frequency</li>
            <li>investment duration</li>
          </ul>
          
          <p>Once these variables are entered, the calculator provides:</p>
          <ul>
            <li>total interest earned</li>
            <li>final account balance</li>
            <li>yearly growth projections</li>
          </ul>
          
          <p>These tools eliminate the need for manual calculations and allow investors to compare multiple CD scenarios instantly.</p>

          <div class="calculator-link-section">
            <p>You can experiment with different scenarios using a <a href="/certificate-deposit">CD Calculator here</a></p>
          </div>

          <h2>CD Interest Growth Visualization</h2>
          
          <p>Consider a $10,000 CD at 4.5%.</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>$10,450</td></tr>
                <tr><td>2</td><td>$10,920</td></tr>
                <tr><td>3</td><td>$11,411</td></tr>
                <tr><td>4</td><td>$11,924</td></tr>
                <tr><td>5</td><td>$12,460</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Notice how the interest earned increases every year due to compounding.</p>

          <h2>CD Ladder Strategy</h2>
          
          <p>Many investors use a CD ladder to maximize flexibility.</p>
          
          <p>A CD ladder involves dividing funds across multiple maturity dates.</p>
          
          <p>Example:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Investment</th>
                  <th>Term</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$5,000</td><td>1-year CD</td></tr>
                <tr><td>$5,000</td><td>2-year CD</td></tr>
                <tr><td>$5,000</td><td>3-year CD</td></tr>
                <tr><td>$5,000</td><td>5-year CD</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Benefits include:</p>
          <ul>
            <li>higher average yield</li>
            <li>regular liquidity</li>
            <li>reduced reinvestment risk</li>
          </ul>

          <h2>Early Withdrawal Penalties</h2>
          
          <p>One downside of CDs is that funds are locked until maturity.</p>
          
          <p>Typical early withdrawal penalties include:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>CD Term</th>
                  <th>Penalty</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>&lt;1 year</td><td>3 months interest</td></tr>
                <tr><td>1–3 years</td><td>6 months interest</td></tr>
                <tr><td>5 years</td><td>12 months interest</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Investors should ensure they will not need the funds before maturity.</p>

          <h2>CD vs Savings Accounts</h2>
          
          <p>CDs often outperform savings accounts because banks reward longer-term deposits.</p>
          
          <p>Example comparison:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Account Type</th>
                  <th>Interest Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Savings Account</td><td>1–2%</td></tr>
                <tr><td>High-Yield Savings</td><td>3–4%</td></tr>
                <tr><td>CD</td><td>4–5%</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>However, savings accounts offer more liquidity.</p>

          <h2>CD vs Bonds</h2>
          
          <p>Some investors compare CDs with government bonds such as U.S. Treasury Bond.</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>CD</th>
                  <th>Treasury Bond</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Issuer</td><td>Bank</td><td>Government</td></tr>
                <tr><td>Liquidity</td><td>Low</td><td>Medium</td></tr>
                <tr><td>Risk</td><td>Very low</td><td>Very low</td></tr>
                <tr><td>Interest</td><td>Fixed</td><td>Fixed</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Both instruments can serve conservative investors seeking predictable returns.</p>

          <h2>Tax Considerations</h2>
          
          <p>Interest earned from CDs is considered taxable income in the United States and must be reported to the Internal Revenue Service.</p>
          
          <p>Even if the CD has not matured, interest earned each year may still be taxable.</p>
          
          <p>Banks typically issue Form 1099-INT reporting interest income.</p>

          <h2>Tips for Maximizing CD Returns</h2>
          
          <h3>Compare APY Across Banks</h3>
          <p>Rates can vary significantly between institutions.</p>
          
          <h3>Use CD Laddering</h3>
          <p>Ladders provide higher flexibility.</p>
          
          <h3>Watch Interest Rate Cycles</h3>
          <p>CDs lock rates, so timing can matter.</p>
          
          <h3>Avoid Early Withdrawals</h3>
          <p>Penalties can reduce earnings significantly.</p>

          <h2>Conclusion</h2>
          
          <p>Certificates of Deposit remain a valuable tool for savers seeking predictable, low-risk returns. By understanding how CD interest is calculated using compound interest formulas, investors can accurately estimate potential earnings and compare different CD products.</p>
          
          <p>Key takeaways include:</p>
          <ul>
            <li>CD interest depends on principal, rate, compounding, and time</li>
            <li>Compound interest significantly increases long-term returns</li>
            <li>CD calculators simplify the process of estimating earnings</li>
            <li>Strategies like CD laddering can improve flexibility and yield</li>
          </ul>
          
          <p>Before opening a CD account, it is always wise to run the numbers and compare different scenarios. Doing so ensures that your savings strategy aligns with both your financial goals and liquidity needs.</p>
          
          <p>With careful planning and the right tools, CDs can be an effective component of a stable and predictable investment portfolio.</p>
        </article>
      </div> <!-- /blog-inner -->
    </div> <!-- /blog-container -->
  </div> <!-- /cd-guide-blog -->
</template>

<script>
export default {
  name: 'CDGuideBlog',
  methods: {
    shareOnLinkedIn() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    },
    shareOnX() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('How to Calculate Certificate of Deposit Interest (CD Calculator + Real Examples)');
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    },
    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }
  },
  mounted() {
    document.title = 'How to Calculate Certificate of Deposit Interest (CD Calculator + Real Examples)'
  }
}
</script>

<style scoped>
/* 完整布局，保持与原文一致 */
.cd-guide-blog {
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