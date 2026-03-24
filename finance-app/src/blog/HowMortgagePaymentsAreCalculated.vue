<template>
  <div class="mortgage-payment-blog">
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
          <h1>How Mortgage Payments Are Calculated (With Formula & Real Examples)</h1>
          
          <p>Understanding how mortgage payments are calculated is essential for anyone buying a home or refinancing a loan. Many borrowers see their monthly payment but don't fully understand how the numbers are derived, why payments are structured the way they are, and how interest impacts long-term borrowing costs.</p>
          
          <p>This guide explains the mortgage payment formula, key variables, amortization mechanics, and real examples so you can understand exactly how lenders calculate your monthly payment.</p>

          <h2>Executive Summary</h2>
          
          <p>Mortgage payments are determined using a standard amortization formula that spreads loan repayment across a fixed period.</p>
          
          <p>Your monthly payment depends on four key factors:</p>
          <ul>
            <li>Loan amount (principal)</li>
            <li>Interest rate</li>
            <li>Loan term</li>
            <li>Payment frequency</li>
          </ul>
          
          <p>The core formula lenders use is:</p>
          
          <div class="formula-block">
            <p><strong>M = P × [r(1+r)^n] / [(1+r)^n - 1]</strong></p>
          </div>
          
          <p>Where:</p>
          <ul>
            <li>M = Monthly payment</li>
            <li>P = Loan principal</li>
            <li>r = Monthly interest rate</li>
            <li>n = Total number of payments</li>
          </ul>
          
          <p>Key insights:</p>
          <ul>
            <li>Longer loan terms reduce monthly payments but increase total interest</li>
            <li>Lower interest rates dramatically reduce lifetime borrowing cost</li>
            <li>Early payments are mostly interest, while later payments reduce principal</li>
          </ul>
          
          <p>Understanding this formula allows borrowers to estimate payments, compare mortgage options, and plan long-term finances more effectively.</p>

          <h2>Components of a Mortgage Payment</h2>
          
          <p>Most homeowners refer to their mortgage payment as a single monthly number, but it is usually composed of several elements.</p>
          
          <p>These components are often summarized as PITI.</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Principal</td><td>The amount borrowed from the lender</td></tr>
                <tr><td>Interest</td><td>The cost of borrowing the money</td></tr>
                <tr><td>Taxes</td><td>Local property taxes</td></tr>
                <tr><td>Insurance</td><td>Homeowners insurance</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Sometimes the payment may also include:</p>
          <ul>
            <li>Private Mortgage Insurance (PMI)</li>
            <li>HOA fees</li>
            <li>Escrow reserves</li>
          </ul>
          
          <p>However, the core mortgage calculation only determines principal and interest. Taxes and insurance are added later.</p>

          <h2>The Mortgage Payment Formula</h2>
          
          <p>Mortgage loans are amortized loans, meaning each payment includes both principal and interest.</p>
          
          <p>The formula used worldwide by lenders is:</p>
          
          <div class="formula-block">
            <p><strong>M = P × [r(1+r)^n] / [(1+r)^n - 1]</strong></p>
          </div>
          
          <h3>Variable Definitions</h3>
          
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
                <tr><td>P</td><td>Loan principal</td></tr>
                <tr><td>r</td><td>Monthly interest rate</td></tr>
                <tr><td>n</td><td>Number of payments</td></tr>
              </tbody>
            </table>
          </div>
          
          <h3>Converting Annual Interest to Monthly Rate</h3>
          
          <p>Mortgage rates are quoted annually.</p>
          <p>To convert:</p>
          
          <div class="formula-block">
            <p><strong>r = Annual Rate / 12</strong></p>
          </div>
          
          <p>Example:</p>
          <p>6% interest rate:</p>
          <div class="formula-block">
            <p><strong>r = 0.06 / 12 = 0.005</strong></p>
          </div>

          <h2>Real Example: $400,000 Mortgage</h2>
          
          <p>Assume the following loan:</p>
          <ul>
            <li>Loan amount: $400,000</li>
            <li>Interest rate: 6.5%</li>
            <li>Loan term: 30 years</li>
          </ul>
          
          <h3>Step 1: Convert Interest Rate</h3>
          <p>Annual rate: 6.5%</p>
          <p>Monthly rate: 0.065 / 12 = 0.005417</p>
          
          <h3>Step 2: Determine Total Payments</h3>
          <p>n = 30 × 12 = 360</p>
          
          <h3>Step 3: Apply Formula</h3>
          <div class="formula-block">
            <p>M = 400,000 × [0.005417(1+0.005417)^360] / [(1+0.005417)^360 - 1]</p>
          </div>
          
          <p>Result:</p>
          <p><strong>Monthly payment ≈ $2,528</strong></p>

          <h2>Payment Breakdown</h2>
          
          <p>Although the monthly payment stays constant, the composition of principal and interest changes over time.</p>
          
          <h3>First Payment</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Interest</td><td>$2,167</td></tr>
                <tr><td>Principal</td><td>$361</td></tr>
                <tr><td><strong>Total Payment</strong></td><td><strong>$2,528</strong></td></tr>
              </tbody>
            </table>
          </div>
          <p>Most of the payment goes toward interest at the beginning.</p>

          <h3>After 15 Years</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Interest</td><td>$1,262</td></tr>
                <tr><td>Principal</td><td>$1,266</td></tr>
              </tbody>
            </table>
          </div>
          <p>At the midpoint of the loan, principal payments begin to dominate.</p>

          <h3>Final Payment</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Interest</td><td>$13</td></tr>
                <tr><td>Principal</td><td>$2,515</td></tr>
              </tbody>
            </table>
          </div>
          <p>Nearly the entire payment reduces the loan balance.</p>
          
          <p>This gradual shift is known as amortization.</p>

          <h2>Total Interest Cost</h2>
          
          <p>The long loan term significantly increases total interest paid.</p>
          
          <p>Example:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Loan Amount</td><td>$400,000</td></tr>
                <tr><td>Monthly Payment</td><td>$2,528</td></tr>
                <tr><td>Total Paid</td><td>$910,080</td></tr>
                <tr><td>Total Interest</td><td>$510,080</td></tr>
              </tbody>
            </table>
          </div>
          <p>Borrowers pay more than half the loan amount again in interest.</p>
          <p>This is why loan term length matters.</p>

          <h2>Comparison: 15-Year vs 30-Year Mortgage</h2>
          
          <p>Shorter loan terms dramatically reduce interest costs.</p>
          
          <p>Example comparison:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Mortgage</th>
                  <th>Monthly Payment</th>
                  <th>Total Interest</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>30-Year</td><td>$2,528</td><td>$510k</td></tr>
                <tr><td>15-Year</td><td>$3,484</td><td>$227k</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Savings: <strong>$283,000 less interest</strong></p>
          
          <p>However, the monthly payment increases by nearly $1,000.</p>
          <p>Borrowers must balance affordability and long-term savings.</p>

          <h2>How Interest Rates Affect Payments</h2>
          
          <p>Mortgage payments are extremely sensitive to interest rate changes.</p>
          
          <p>Example for a $400,000 loan:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Rate</th>
                  <th>Monthly Payment</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>5%</td><td>$2,147</td></tr>
                <tr><td>6%</td><td>$2,398</td></tr>
                <tr><td>7%</td><td>$2,661</td></tr>
                <tr><td>8%</td><td>$2,935</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Even a 1% increase can significantly raise the monthly payment.</p>
          <p>This is why buyers closely watch mortgage rate cycles.</p>

          <h2>Amortization Schedule Example</h2>
          
          <p>Below is a simplified amortization table.</p>
          
          <p>Loan: $400,000 at 6.5%</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Remaining Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>$395,600</td></tr>
                <tr><td>5</td><td>$372,900</td></tr>
                <tr><td>10</td><td>$336,400</td></tr>
                <tr><td>20</td><td>$227,500</td></tr>
                <tr><td>30</td><td>$0</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Notice that the balance declines slowly in early years.</p>
          <p>Most principal reduction happens in the last third of the loan.</p>

          <h2>Why Early Payments Are Mostly Interest</h2>
          
          <p>Mortgage interest is calculated on the remaining loan balance.</p>
          
          <p>In the early years:</p>
          <ul>
            <li>Balance is very high</li>
            <li>Interest calculation is large</li>
          </ul>
          
          <p>Example:</p>
          <div class="formula-block">
            <p><strong>Interest = Balance × Monthly Rate</strong></p>
          </div>
          
          <p>If balance = $400,000</p>
          <p>Monthly rate = 0.005417</p>
          <p>Interest = 400,000 × 0.005417 = $2,167</p>
          
          <p>This explains why early payments barely reduce the principal.</p>

          <h2>Extra Payments and Mortgage Savings</h2>
          
          <p>One of the most effective ways to reduce mortgage cost is making extra principal payments.</p>
          
          <p>Example:</p>
          <p>Extra payment: $200 per month</p>
          
          <p>Results:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Loan term</td><td>Reduced by ~5 years</td></tr>
                <tr><td>Interest saved</td><td>~$70,000</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Even small extra payments can significantly shorten a loan.</p>

          <h2>Biweekly Payment Strategy</h2>
          
          <p>Another popular strategy is biweekly mortgage payments.</p>
          
          <p>Instead of:</p>
          <p>12 monthly payments</p>
          
          <p>Borrowers make:</p>
          <p>26 half-payments per year.</p>
          
          <p>This equals:</p>
          <p>13 full payments annually</p>
          
          <p>Result:</p>
          <ul>
            <li>Loan paid off faster</li>
            <li>Significant interest savings</li>
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
                <tr><td>$400k mortgage</td><td>~$90k</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Factors That Change Mortgage Payments</h2>
          
          <p>Several variables influence the final payment amount.</p>
          
          <h3>Loan Size</h3>
          <p>Larger loans increase monthly payments.</p>
          
          <h3>Interest Rate</h3>
          <p>Even small changes have large impacts.</p>
          
          <h3>Loan Term</h3>
          <p>Longer terms lower payments but increase interest.</p>
          
          <h3>Down Payment</h3>
          <p>Higher down payments reduce borrowing.</p>
          
          <p>Example:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Down Payment</th>
                  <th>Loan Size</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>5%</td><td>$380k</td></tr>
                <tr><td>20%</td><td>$320k</td></tr>
              </tbody>
            </table>
          </div>
          <p>Smaller loan = lower monthly payment.</p>

          <h2>Adjustable Rate Mortgages (ARM)</h2>
          
          <p>Not all mortgages use fixed payments.</p>
          
          <p>Adjustable Rate Mortgages (ARMs) change interest rates periodically.</p>
          
          <p>Example:</p>
          <p>5/1 ARM</p>
          <ul>
            <li>Fixed rate for 5 years</li>
            <li>Adjusts annually afterward</li>
          </ul>
          
          <p>Payment calculation remains the same, but the interest rate variable changes, altering future payments.</p>

          <h2>Mortgage Affordability Guidelines</h2>
          
          <p>Financial advisors often suggest the 28/36 rule.</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Rule</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>28%</td><td>Housing costs ≤ 28% of gross income</td></tr>
                <tr><td>36%</td><td>Total debt ≤ 36% of income</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Example:</p>
          <p>Income = $8,000/month</p>
          <p>Recommended housing payment:</p>
          <div class="formula-block">
            <p><strong>8,000 × 0.28 = $2,240</strong></p>
          </div>
          
          <p>This helps prevent borrowers from becoming house poor.</p>

          <h2>Tools for Calculating Mortgage Payments</h2>
          
          <p>Today, borrowers rarely calculate payments manually.</p>
          
          <p>Most people use:</p>
          <ul>
            <li>Mortgage calculators</li>
            <li>Financial planning tools</li>
            <li>Real estate websites</li>
          </ul>
          
          <p>However, understanding the formula allows borrowers to:</p>
          <ul>
            <li>Verify lender calculations</li>
            <li>Compare loan options</li>
            <li>Evaluate refinancing opportunities</li>
          </ul>

          <h2>Final Thoughts</h2>
          
          <p>Mortgage payments are calculated using a standard amortization formula that balances principal and interest over time.</p>
          
          <p>The key variables influencing payments include:</p>
          <ul>
            <li>Loan amount</li>
            <li>Interest rate</li>
            <li>Loan term</li>
            <li>Payment schedule</li>
          </ul>
          
          <p>Even small changes in these variables can dramatically impact monthly payments and total borrowing costs.</p>
          
          <p>For homebuyers, understanding how these calculations work makes it easier to:</p>
          <ul>
            <li>Compare mortgage offers</li>
            <li>Plan long-term finances</li>
            <li>Avoid unexpected borrowing costs</li>
          </ul>
          
          <p>Before choosing a mortgage, it is always wise to run multiple payment scenarios, evaluate interest costs, and ensure the monthly payment fits comfortably within your financial plan.</p>
        </article>

        <!-- 底部中间calculator按钮 -->
        <div class="blog-footer-button">
          <a href="/mortgage" class="calculator-button">Explore Mortgage Calculator →</a>
        </div>
      </div> <!-- /blog-inner -->
    </div> <!-- /blog-container -->
  </div> <!-- /mortgage-payment-blog -->
</template>

<script>
export default {
  name: 'MortgagePaymentBlog',
  methods: {
    shareOnLinkedIn() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    },
    shareOnX() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('How Mortgage Payments Are Calculated (With Formula & Real Examples)');
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    },
    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }
  },
  mounted() {
    document.title = 'How Mortgage Payments Are Calculated (With Formula & Real Examples)'
  }
}
</script>

<style scoped>
/* 完整布局，保持与原文一致 */
.mortgage-payment-blog {
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
