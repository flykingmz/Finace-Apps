<template>
  <div class="amortization-schedule-blog">
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
          <h1>What Is an Amortization Schedule? A Simple Explanation for Homebuyers</h1>
          
          <p>For many homebuyers, a mortgage is the largest financial commitment they will ever make. While most borrowers understand their monthly payment amount, far fewer understand how that payment is structured over time.</p>
          
          <p>This is where an amortization schedule becomes extremely valuable. It shows exactly how each payment is divided between interest and principal, how the loan balance declines over time, and how long it will take to fully repay the loan.</p>
          
          <p>In this guide, we'll explain what an amortization schedule is, how it works, how lenders calculate it, and how homebuyers can use it to make smarter mortgage decisions.</p>

          <h2>Executive Summary</h2>
          
          <p>An amortization schedule is a detailed table showing how each mortgage payment is applied toward interest and principal over the life of the loan.</p>
          
          <p>Key characteristics of amortized loans include:</p>
          <ul>
            <li>Payments remain fixed each month (for fixed-rate mortgages)</li>
            <li>Early payments are mostly interest</li>
            <li>Later payments are mostly principal</li>
            <li>The loan balance gradually declines to zero at the end of the term</li>
          </ul>
          
          <p>For example, on a 30-year mortgage, the first few years of payments mainly cover interest costs. Over time, a larger share of each payment goes toward reducing the loan balance.</p>
          
          <p>Understanding an amortization schedule helps homebuyers:</p>
          <ul>
            <li>See the true cost of borrowing</li>
            <li>Understand how quickly equity builds</li>
            <li>Evaluate the benefit of extra payments</li>
            <li>Compare 15-year vs 30-year mortgage options</li>
          </ul>

          <h2>What Is Amortization?</h2>
          
          <p>Amortization refers to the process of gradually paying off a loan through scheduled payments over time.</p>
          
          <p>Each payment includes two parts:</p>
          <ol>
            <li><strong>Interest</strong> – the cost of borrowing money</li>
            <li><strong>Principal</strong> – the portion that reduces the loan balance</li>
          </ol>
          
          <p>The goal of amortization is to ensure that the loan is fully repaid by the end of the loan term.</p>
          
          <p>For example:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Loan Term</th>
                  <th>Total Payments</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>30-year mortgage</td><td>360 payments</td></tr>
                <tr><td>15-year mortgage</td><td>180 payments</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Even though payments remain fixed, the proportion of principal and interest changes every month.</p>

          <h2>What Is an Amortization Schedule?</h2>
          
          <p>An amortization schedule is a table that shows every payment in detail.</p>
          
          <p>It typically includes the following columns:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Column</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Payment Number</td><td>Sequence of payments</td></tr>
                <tr><td>Payment Amount</td><td>Fixed monthly payment</td></tr>
                <tr><td>Interest Portion</td><td>Amount applied to interest</td></tr>
                <tr><td>Principal Portion</td><td>Amount reducing loan balance</td></tr>
                <tr><td>Remaining Balance</td><td>Outstanding loan balance</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>This schedule allows borrowers to see the exact path of their loan repayment.</p>

          <h2>Mortgage Payment Formula</h2>
          
          <p>Mortgage amortization relies on a standard formula used by lenders worldwide.</p>
          
          <div class="formula-block">
            <p><strong>M = P × [r(1+r)^n] / [(1+r)^n - 1]</strong></p>
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
                <tr><td>M</td><td>Monthly payment</td></tr>
                <tr><td>P</td><td>Loan amount</td></tr>
                <tr><td>r</td><td>Monthly interest rate</td></tr>
                <tr><td>n</td><td>Total number of payments</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Example:</p>
          <p>Loan amount: $350,000</p>
          <p>Interest rate: 6%</p>
          <p>Loan term: 30 years</p>
          
          <p>Monthly interest rate:</p>
          <div class="formula-block">
            <p><strong>0.06 / 12 = 0.005</strong></p>
          </div>
          
          <p>Total payments:</p>
          <div class="formula-block">
            <p><strong>30 × 12 = 360</strong></p>
          </div>
          
          <p>Monthly payment:</p>
          <div class="formula-block">
            <p><strong>≈ $2,098</strong></p>
          </div>

          <h2>Example Amortization Schedule</h2>
          
          <p>Let's examine a simplified amortization schedule for the first few payments of a $350,000 mortgage at 6%.</p>
          
          <p>Monthly payment: <strong>$2,098</strong></p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Payment</th>
                  <th>Interest</th>
                  <th>Principal</th>
                  <th>Remaining Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>$1,750</td><td>$348</td><td>$349,652</td></tr>
                <tr><td>2</td><td>$1,748</td><td>$350</td><td>$349,302</td></tr>
                <tr><td>3</td><td>$1,747</td><td>$351</td><td>$348,951</td></tr>
                <tr><td>12</td><td>$1,731</td><td>$367</td><td>$345,900</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Notice that:</p>
          <ul>
            <li>Interest declines slightly each month</li>
            <li>Principal repayment gradually increases</li>
          </ul>

          <h2>Why Early Payments Are Mostly Interest</h2>
          
          <p>Many homeowners are surprised to learn that their early mortgage payments mostly cover interest.</p>
          
          <p>This happens because interest is calculated on the remaining loan balance.</p>
          
          <p>Formula:</p>
          <div class="formula-block">
            <p><strong>Interest = Remaining Balance × Monthly Rate</strong></p>
          </div>
          
          <p>Example:</p>
          <p>Loan balance: $350,000</p>
          <p>Monthly rate: 0.005</p>
          <p>Interest: 350,000 × 0.005 = $1,750</p>
          
          <p>Because the balance is large at the start of the loan, interest costs are higher.</p>
          <p>As the balance declines, interest charges shrink.</p>

          <h2>How the Loan Balance Changes Over Time</h2>
          
          <p>One of the most important insights from an amortization schedule is how slowly the loan balance declines at first.</p>
          
          <p>Example: $350,000 mortgage at 6%</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Remaining Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>$345,900</td></tr>
                <tr><td>5</td><td>$326,000</td></tr>
                <tr><td>10</td><td>$292,000</td></tr>
                <tr><td>20</td><td>$206,000</td></tr>
                <tr><td>30</td><td>$0</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>During the first decade, most payments go toward interest rather than principal.</p>
          <p>The balance decreases much faster in the last third of the loan.</p>

          <h2>Total Interest Paid</h2>
          
          <p>An amortization schedule also reveals the true cost of borrowing.</p>
          
          <p>Example:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Loan Amount</td><td>$350,000</td></tr>
                <tr><td>Monthly Payment</td><td>$2,098</td></tr>
                <tr><td>Total Payments</td><td>$755,280</td></tr>
                <tr><td>Total Interest</td><td>$405,280</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>The borrower pays over $400,000 in interest over the life of the loan.</p>
          <p>This is why loan structure matters.</p>

          <h2>Comparing 30-Year vs 15-Year Amortization</h2>
          
          <p>Shorter mortgage terms significantly reduce interest costs.</p>
          
          <p>Example: Loan: $350,000 at 6%</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Loan Term</th>
                  <th>Monthly Payment</th>
                  <th>Total Interest</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>30 years</td><td>$2,098</td><td>$405k</td></tr>
                <tr><td>15 years</td><td>$2,952</td><td>$181k</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Interest savings: <strong>$224,000</strong></p>
          
          <p>However, the monthly payment increases significantly.</p>
          <p>Borrowers must balance monthly affordability and long-term savings.</p>

          <h2>Visualizing Amortization</h2>
          
          <p>Mortgage repayment typically follows a predictable pattern.</p>
          
          <h3>Early Years</h3>
          <ul>
            <li>Payments mostly interest</li>
            <li>Loan balance decreases slowly</li>
          </ul>
          
          <h3>Middle Years</h3>
          <ul>
            <li>Interest and principal portions become similar</li>
          </ul>
          
          <h3>Final Years</h3>
          <ul>
            <li>Payments mostly principal</li>
            <li>Loan balance drops quickly</li>
          </ul>
          
          <p>This curve is often called the amortization curve.</p>

          <h2>Building Home Equity</h2>
          
          <p>Equity is the difference between:</p>
          <p><strong>Home value – Mortgage balance</strong></p>
          
          <p>Example:</p>
          <p>Home price: $400,000</p>
          <p>Mortgage balance after 10 years: $292,000</p>
          <p>Equity: $108,000</p>
          
          <p>An amortization schedule shows how quickly equity grows from loan repayment.</p>

          <h2>Impact of Extra Payments</h2>
          
          <p>Extra payments can significantly accelerate mortgage payoff.</p>
          
          <p>Example: Extra payment: $300 per month</p>
          
          <p>Result:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Impact</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Loan term</td><td>Reduced by ~6 years</td></tr>
                <tr><td>Interest saved</td><td>~$80,000</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Even small additional payments can dramatically reduce borrowing costs.</p>

          <h2>Biweekly Payment Strategy</h2>
          
          <p>Another strategy is biweekly mortgage payments.</p>
          
          <p>Instead of:</p>
          <p>12 monthly payments</p>
          
          <p>Borrowers make:</p>
          <p>26 half-payments annually.</p>
          
          <p>This equals 13 full payments per year.</p>
          
          <p>Benefits:</p>
          <ul>
            <li>Faster loan payoff</li>
            <li>Lower interest costs</li>
            <li>Earlier equity buildup</li>
          </ul>
          
          <p>Example savings:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Loan</th>
                  <th>Interest Saved</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$350k mortgage</td><td>~$70k</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Adjustable Rate Mortgage Amortization</h2>
          
          <p>For Adjustable Rate Mortgages (ARMs), the amortization schedule can change over time.</p>
          
          <p>Example ARM structure:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Rate Type</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>First 5 years</td><td>Fixed rate</td></tr>
                <tr><td>Afterward</td><td>Adjustable annually</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>When the interest rate changes, the payment amount and amortization schedule adjust accordingly.</p>
          <p>This introduces more uncertainty compared with fixed-rate loans.</p>

          <h2>How Homebuyers Use Amortization Schedules</h2>
          
          <p>Amortization schedules are useful tools for financial planning.</p>
          
          <p>Homebuyers can use them to:</p>
          
          <h3>Evaluate Mortgage Options</h3>
          <p>Compare:</p>
          <ul>
            <li>15-year vs 30-year loans</li>
            <li>Different interest rates</li>
          </ul>
          
          <h3>Plan Refinancing</h3>
          <p>See how much interest remains on the loan.</p>
          
          <h3>Estimate Equity Growth</h3>
          <p>Understand how quickly ownership increases.</p>
          
          <h3>Test Extra Payment Strategies</h3>
          <p>Calculate interest savings from additional payments.</p>

          <h2>Tools for Creating Amortization Schedules</h2>
          
          <p>Today, borrowers typically generate amortization schedules using online tools.</p>
          
          <p>These calculators allow users to adjust:</p>
          <ul>
            <li>Loan amount</li>
            <li>Interest rate</li>
            <li>Loan term</li>
            <li>Extra payments</li>
          </ul>
          
          <p>The tool then generates a full schedule showing all 360 payments for a typical mortgage.</p>
          
          <p>Understanding these numbers gives borrowers greater control over long-term financial decisions.</p>

          <h2>Final Thoughts</h2>
          
          <p>An amortization schedule provides a clear roadmap of how a mortgage is repaid over time.</p>
          
          <p>It reveals several important truths about home loans:</p>
          <ul>
            <li>Early payments are dominated by interest</li>
            <li>Principal repayment accelerates later in the loan</li>
            <li>Total interest costs can be substantial</li>
            <li>Extra payments can dramatically shorten loan terms</li>
          </ul>
          
          <p>For homebuyers, reviewing an amortization schedule before taking on a mortgage can provide valuable insights into borrowing costs, equity growth, and long-term financial impact.</p>
          
          <p>By understanding how mortgage amortization works, buyers can make more informed decisions about loan terms, payment strategies, and overall housing affordability.</p>
        </article>

        <!-- 底部中间calculator按钮 -->
        <div class="blog-footer-button">
          <a href="/amortization" class="calculator-button">Explore Amortization Calculator →</a>
        </div>
      </div> <!-- /blog-inner -->
    </div> <!-- /blog-container -->
  </div> <!-- /amortization-schedule-blog -->
</template>

<script>
export default {
  name: 'AmortizationScheduleBlog',
  methods: {
    shareOnLinkedIn() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    },
    shareOnX() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('What Is an Amortization Schedule? A Simple Explanation for Homebuyers');
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
.amortization-schedule-blog {
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

/* 底部按钮居中 */
.blog-footer-button {
  display: flex;
  justify-content: center;
  margin-top: 3.5rem;
  margin-bottom: 1.5rem;
}

.calculator-button {
  display: inline-block;
  background: linear-gradient(145deg, #1f5f99, #134879);
  color: white;
  font-weight: 600;
  font-size: 1.3rem;
  padding: 1rem 3rem;
  border-radius: 60px;
  text-decoration: none;
  box-shadow: 0 12px 24px -8px #0f3d60a0;
  transition: all 0.2s ease;
  border: 1px solid #3883c3;
  letter-spacing: 0.02em;
}

.calculator-button:hover {
  background: #0b3f68;
  box-shadow: 0 16px 28px -6px #06273f;
  transform: scale(1.02);
}

@media (max-width: 700px) {
  .calculator-button {
    font-size: 1rem;
    padding: 0.8rem 2rem;
    width: 90%;
    text-align: center;
  }
}
</style>
