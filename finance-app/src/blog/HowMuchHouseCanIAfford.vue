<template>
  <div class="home-affordability-blog">
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
          <h1>How Much House Can I Afford?</h1>
          <h2>A Practical Guide Based on Income</h2>
          
          <p>Buying a home is one of the most significant financial decisions most people will make. While homeownership offers long-term benefits such as stability, equity building, and potential appreciation, it also requires careful financial planning. One of the most common questions prospective buyers ask is simple:</p>
          
          <p><strong>How much house can I realistically afford based on my income?</strong></p>
          
          <p>The answer depends on several factors including income level, debt obligations, mortgage interest rates, down payment size, and local housing costs. Many buyers focus only on the purchase price of a home, but affordability actually depends on monthly housing costs relative to total income.</p>
          
          <p>This guide provides a structured, data-driven framework to help determine how much home you can afford. We will analyze affordability rules used by lenders, explore real-world income scenarios, and provide practical strategies for maintaining financial stability after purchasing a home.</p>

          <h2>Executive Summary</h2>
          
          <p>Determining housing affordability requires balancing income, debt obligations, and expected monthly housing costs. Lenders typically evaluate affordability using debt-to-income ratios, which measure how much of a borrower's monthly income is used to pay debts.</p>
          
          <p>A widely used guideline is the 28/36 rule:</p>
          <ul>
            <li><strong>Housing expenses should not exceed 28% of gross monthly income</strong></li>
            <li><strong>Total debt payments should not exceed 36% of gross monthly income</strong></li>
          </ul>
          
          <p>Using this rule, buyers can estimate a safe home price range before speaking with lenders.</p>
          
          <p>For example:</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Annual Income</th>
                  <th>Affordable Monthly Housing</th>
                  <th>Estimated Home Price</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$60,000</td><td>~$1,400</td><td>~$220,000</td></tr>
                <tr><td>$80,000</td><td>~$1,900</td><td>~$300,000</td></tr>
                <tr><td>$120,000</td><td>~$2,800</td><td>~$450,000</td></tr>
                <tr><td>$200,000</td><td>~$4,600</td><td>~$750,000</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>These estimates assume typical mortgage terms and moderate interest rates.</p>
          
          <p>Key insights include:</p>
          <ul>
            <li>Housing affordability depends more on monthly payment capacity than home price.</li>
            <li>Rising mortgage rates significantly affect purchasing power.</li>
            <li>Down payment size can dramatically change loan affordability.</li>
            <li>Buyers should maintain financial buffers beyond minimum lender requirements.</li>
          </ul>
          
          <p>Understanding these principles helps prospective homeowners make informed purchasing decisions while protecting long-term financial stability.</p>

          <h2>Key Factors That Determine Home Affordability</h2>
          
          <h3>Income</h3>
          <p>Income is the foundation of mortgage qualification. Lenders evaluate both:</p>
          <ul>
            <li>Gross income (before taxes)</li>
            <li>Stable income sources</li>
          </ul>
          <p>Acceptable income sources typically include:</p>
          <ul>
            <li>Salary or wages</li>
            <li>Bonuses and commissions</li>
            <li>Self-employment income</li>
            <li>Rental income</li>
            <li>Investment income</li>
            <li>Pension or retirement income</li>
          </ul>
          <p>Most lenders prefer income that has been consistent for at least two years.</p>

          <h3>Debt-to-Income Ratio (DTI)</h3>
          <p>Debt-to-income ratio measures how much of your income is used to pay debts.</p>
          <p><strong>Formula:</strong> DTI = Total Monthly Debt Payments ÷ Gross Monthly Income</p>
          <p>Two DTI metrics are commonly used:</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Ratio</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Front-end ratio</td><td>Housing expenses only</td></tr>
                <tr><td>Back-end ratio</td><td>Housing + other debts</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Typical lender limits:</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Maximum</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Housing ratio</td><td>28%</td></tr>
                <tr><td>Total debt ratio</td><td>36–43%</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Higher ratios may be allowed depending on credit scores and loan programs.</p>

          <h3>Mortgage Interest Rates</h3>
          <p>Mortgage rates significantly impact affordability because they determine the size of the monthly payment.</p>
          <p>Example for a $400,000 mortgage:</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Interest Rate</th>
                  <th>Monthly Payment</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>3%</td><td>~$1,686</td></tr>
                <tr><td>5%</td><td>~$2,147</td></tr>
                <tr><td>7%</td><td>~$2,661</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>A 2% increase in rates can reduce purchasing power by 20–25%.</p>

          <h3>Down Payment</h3>
          <p>The size of your down payment affects:</p>
          <ul>
            <li>Loan size</li>
            <li>Monthly payment</li>
            <li>Mortgage insurance requirements</li>
          </ul>
          <p>Typical down payment levels:</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Down Payment</th>
                  <th>Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>3–5%</td><td>First-time buyer programs</td></tr>
                <tr><td>10–15%</td><td>Moderate loan size</td></tr>
                <tr><td>20%</td><td>Avoids private mortgage insurance</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>For example:</p>
          <p>Home Price $400,000 → Down Payment $80,000 (20%) → Loan Amount $320,000</p>
          <p>A larger down payment reduces financial risk and improves loan approval odds.</p>

          <h3>Property Taxes and Insurance</h3>
          <p>Homeownership costs include more than just the mortgage payment.</p>
          <p>Additional costs include:</p>
          <ul>
            <li>Property taxes</li>
            <li>Homeowners insurance</li>
            <li>HOA fees</li>
            <li>Maintenance costs</li>
          </ul>
          <p>Typical annual estimates:</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Expense</th>
                  <th>Typical Range</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Property tax</td><td>0.5–2.5% of home value</td></tr>
                <tr><td>Insurance</td><td>$1,000–$2,500 annually</td></tr>
                <tr><td>Maintenance</td><td>1% of home value</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Ignoring these costs can lead to significant underestimation of housing expenses.</p>

          <h2>Scenario Comparison Table</h2>
          <p>To illustrate affordability, consider several household income scenarios.</p>
          <p>Assumptions:</p>
          <ul>
            <li>20% down payment</li>
            <li>30-year fixed mortgage</li>
            <li>6% interest rate</li>
            <li>Property taxes and insurance included</li>
          </ul>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Household Income</th>
                  <th>Max Monthly Housing</th>
                  <th>Estimated Mortgage</th>
                  <th>Approx Home Price</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$50,000</td><td>$1,167</td><td>$180,000</td><td>$225,000</td></tr>
                <tr><td>$75,000</td><td>$1,750</td><td>$270,000</td><td>$335,000</td></tr>
                <tr><td>$100,000</td><td>$2,333</td><td>$360,000</td><td>$450,000</td></tr>
                <tr><td>$150,000</td><td>$3,500</td><td>$540,000</td><td>$675,000</td></tr>
                <tr><td>$200,000</td><td>$4,667</td><td>$720,000</td><td>$900,000</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>These estimates assume moderate financial conditions and no major debt obligations.</p>

          <h2>Visual Breakdown of Housing Costs</h2>
          <p>Understanding affordability is easier when we break down the typical monthly housing payment.</p>
          
          <div class="visual-tree">
            <p><strong>Example: $400,000 home</strong></p>
            <pre>
Monthly Housing Cost
│
├─ Mortgage Principal & Interest
│
├─ Property Taxes
│
├─ Homeowners Insurance
│
├─ Mortgage Insurance (if applicable)
│
└─ Maintenance / HOA fees
            </pre>
          </div>
          
          <p>Example breakdown:</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Expense</th>
                  <th>Monthly Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Mortgage payment</td><td>$1,900</td></tr>
                <tr><td>Property tax</td><td>$350</td></tr>
                <tr><td>Insurance</td><td>$150</td></tr>
                <tr><td>Maintenance</td><td>$300</td></tr>
                <tr><td><strong>Total monthly cost</strong></td><td><strong>$2,700</strong></td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Many first-time buyers underestimate the non-mortgage costs of owning a home.</p>

          <h2>Practical Income-Based Housing Rules</h2>
          <p>Several affordability rules are commonly used by financial planners.</p>
          
          <h3>The 28% Rule</h3>
          <p>Housing costs should not exceed 28% of gross income.</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Income</th>
                  <th>Max Housing</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$80,000</td><td>$1,867</td></tr>
                <tr><td>$120,000</td><td>$2,800</td></tr>
              </tbody>
            </table>
          </div>
          
          <h3>The 36% Rule</h3>
          <p>Total debt payments should not exceed 36% of income.</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Income</th>
                  <th>Max Total Debt</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$100,000</td><td>$3,000</td></tr>
              </tbody>
            </table>
          </div>
          
          <h3>The 3× Income Rule</h3>
          <p>Some experts suggest buying homes worth no more than three times annual income.</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Income</th>
                  <th>Home Price</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$100,000</td><td>$300,000</td></tr>
                <tr><td>$150,000</td><td>$450,000</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>This rule is simple but may not account for debt or interest rates.</p>

          <h2>Affordability Risks</h2>
          <p>Even if lenders approve a large loan, buyers should consider financial risks.</p>
          
          <h3>Lifestyle Creep</h3>
          <p>Buying at the top of your affordability range can reduce flexibility for:</p>
          <ul>
            <li>travel</li>
            <li>savings</li>
            <li>investments</li>
          </ul>
          
          <h3>Interest Rate Changes</h3>
          <p>For adjustable-rate mortgages, rising rates may increase monthly payments significantly.</p>
          
          <h3>Job Instability</h3>
          <p>A large mortgage becomes risky if household income suddenly drops.</p>
          <p>Experts often recommend maintaining 6–12 months of emergency savings before purchasing a home.</p>

          <h2>Strategies to Increase Buying Power</h2>
          <p>Prospective buyers can improve affordability using several strategies.</p>
          
          <h3>Increase Down Payment</h3>
          <p>Larger down payments reduce:</p>
          <ul>
            <li>monthly payments</li>
            <li>loan size</li>
            <li>interest costs</li>
          </ul>
          
          <h3>Improve Credit Score</h3>
          <p>Higher credit scores result in lower mortgage rates, improving affordability.</p>
          <p>Typical mortgage score tiers:</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Credit Score</th>
                  <th>Rate Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>760+</td><td>Best rates</td></tr>
                <tr><td>700–759</td><td>Slightly higher</td></tr>
                <tr><td>650–699</td><td>Moderate increase</td></tr>
              </tbody>
            </table>
          </div>
          
          <h3>Reduce Debt</h3>
          <p>Lowering credit card or auto loan balances improves debt-to-income ratios.</p>
          
          <h3>Consider Location</h3>
          <p>Housing costs vary dramatically between cities.</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>City</th>
                  <th>Median Home Price</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>San Francisco</td><td>$1.3M</td></tr>
                <tr><td>Dallas</td><td>$420k</td></tr>
                <tr><td>Cleveland</td><td>$230k</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Location can dramatically change affordability.</p>

          <h2>Long-Term Cost Considerations</h2>
          <p>Buying a home involves long-term financial commitments.</p>
          <p>Costs include:</p>
          <ul>
            <li>mortgage interest</li>
            <li>property taxes</li>
            <li>repairs and renovations</li>
            <li>opportunity cost of invested funds</li>
          </ul>
          <p>Homeownership should align with long-term financial goals.</p>

          <h2>Conclusion</h2>
          <p>Determining how much house you can afford requires more than simply calculating a mortgage payment. Buyers must evaluate income stability, debt obligations, interest rates, and long-term financial goals.</p>
          
          <p>Key takeaways include:</p>
          <ul>
            <li>The 28/36 rule provides a practical affordability guideline.</li>
            <li>Mortgage rates strongly influence purchasing power.</li>
            <li>Down payment size affects loan approval and monthly payments.</li>
            <li>Buyers should account for taxes, insurance, and maintenance costs.</li>
          </ul>
          
          <p>A realistic understanding of housing affordability helps buyers avoid financial stress and build sustainable homeownership.</p>
          
          <p>Before purchasing a home, prospective buyers should evaluate their financial situation carefully, compare multiple scenarios, and ensure that homeownership supports—not undermines—their long-term financial security.</p>
        </article>

        <!-- 底部中间calculator按钮 -->
        <div class="blog-footer-button">
          <a href="/mortgage" class="calculator-button">Explore Mortgage Calculator →</a>
        </div>
      </div> <!-- /blog-inner -->
    </div> <!-- /blog-container -->
  </div> <!-- /home-affordability-blog -->
</template>

<script>
export default {
  name: 'HomeAffordabilityBlog',
  methods: {
    shareOnLinkedIn() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    },
    shareOnX() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('How Much House Can I Afford? A Practical Guide Based on Income');
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
.home-affordability-blog {
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
}

/* 文章标题 */
.blog-article h1 {
  font-size: 2.6rem;
  font-weight: 750;
  color: #0b2542;
  line-height: 1.2;
  margin-bottom: 0.25rem;
}

.blog-article h2 {
  font-size: 1.9rem;
  font-weight: 680;
  margin: 2.2rem 0 1rem 0;
  color: #0f3b5e;
  border-bottom: 2px solid #dde7f3;
  padding-bottom: 0.3rem;
}

.blog-article h3 {
  font-size: 1.5rem;
  margin: 1.8rem 0 0.8rem;
  color: #17466b;
}

.blog-article p {
  margin-bottom: 1rem;
  color: #1a2e44;
  font-size: 1.05rem;
  line-height: 1.6;
}

.blog-article ul {
  margin-bottom: 1rem;
  padding-left: 2rem;
  color: #1a2e44;
  font-size: 1.05rem;
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
  min-width: 500px;
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

/* 视觉树形图 */
.visual-tree {
  background: #f9fcff;
  border: 1px solid #cbd9ec;
  border-radius: 20px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  overflow-x: auto;
}

.visual-tree pre {
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  color: #0a3455;
  margin: 1rem 0 0;
  line-height: 1.6;
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
  .blog-inner { padding: 1.5rem; }
  .blog-article h1 { font-size: 2rem; }
}
</style>
