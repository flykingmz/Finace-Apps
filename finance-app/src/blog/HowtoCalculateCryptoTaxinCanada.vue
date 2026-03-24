<template>
  <div class="canada-crypto-tax-guide-blog">
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
          <h1>How to Calculate Crypto Tax in Canada (Capital Gains vs Income Explained)</h1>
          
          <h2>Introduction</h2>
          
          <p>Cryptocurrency adoption in Canada has surged in recent years—but so has confusion around taxation.</p>
          
          <p>One of the most common questions Canadian investors ask is:</p>
          <p class="highlight">👉 "Do I pay capital gains tax or income tax on crypto?"</p>
          
          <p>The answer isn't always straightforward.</p>
          
          <p>Under rules set by the <strong>Canada Revenue Agency (CRA)</strong>, crypto can be taxed in two very different ways:</p>
          <ul>
            <li>Capital gains (more favorable tax treatment)</li>
            <li>Business income (fully taxable)</li>
          </ul>
          
          <p>Understanding the difference can save—or cost—you thousands of dollars.</p>
          
          <p>This guide breaks down exactly how crypto taxes work in Canada, how to calculate them, and how to stay compliant while optimizing your tax strategy.</p>

          <h2>1️⃣ Executive Summary</h2>
          
          <ul>
            <li>Crypto is treated as property, not currency in Canada</li>
            <li>Transactions can trigger either capital gains or income tax</li>
            <li>Capital gains → only 50% taxable</li>
            <li>Business income → 100% taxable</li>
            <li>Classification depends on trading behavior and intent</li>
          </ul>

          <h2>2️⃣ How Crypto Is Taxed in Canada</h2>
          
          <p>The <strong>Canada Revenue Agency</strong> classifies crypto into two categories:</p>

          <h3>Capital Gains</h3>
          <p>Applies when:</p>
          <ul>
            <li>you invest occasionally</li>
            <li>you hold crypto long-term</li>
            <li>trading is not your primary activity</li>
          </ul>

          <h3>Business Income</h3>
          <p>Applies when:</p>
          <ul>
            <li>you trade frequently</li>
            <li>you operate like a business</li>
            <li>you engage in speculative activity</li>
          </ul>
          
          <p class="highlight">👉 The same transaction can be taxed differently depending on your profile.</p>

          <h2>3️⃣ Capital Gains Tax Explained</h2>
          
          <p>Capital gains are the more favorable tax treatment.</p>

          <h3>How It Works</h3>
          
          <div class="formula-block">
            <p><strong>Capital Gain = Selling Price – Adjusted Cost Base (ACB)</strong></p>
          </div>

          <h3>Key Rule</h3>
          <p class="highlight">👉 Only 50% of the gain is taxable</p>

          <h3>Example</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Buy Bitcoin</td><td>$10,000</td></tr>
                <tr><td>Sell Bitcoin</td><td>$20,000</td></tr>
                <tr><td>Gain</td><td>$10,000</td></tr>
                <tr><td>Taxable Portion</td><td>$5,000</td></tr>
              </tbody>
            </table>
          </div>
          
          <p><strong>Why This Matters</strong></p>
          <p>Capital gains effectively cut your taxable income in half.</p>

          <h2>4️⃣ Income Tax on Crypto</h2>
          
          <p>If your activity is considered a business, profits are taxed as income.</p>

          <h3>Key Rule</h3>
          <p class="highlight">👉 100% of profits are taxable</p>

          <h3>Example</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>Item</th><th>Value</th></tr>
              </thead>
              <tbody>
                <tr><td>Profit from trading</td><td>$10,000</td></tr>
                <tr><td>Taxable income</td><td>$10,000</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Additional Impact</h3>
          <ul>
            <li>taxed at your marginal tax rate</li>
            <li>may require business reporting</li>
            <li>potential deductions available</li>
          </ul>

          <h2>5️⃣ Capital Gains vs Income: Key Differences</h2>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>Feature</th><th>Capital Gains</th><th>Income</th></tr>
              </thead>
              <tbody>
                <tr><td>Taxable Portion</td><td>50%</td><td>100%</td></tr>
                <tr><td>Tax Rate</td><td>Lower</td><td>Higher</td></tr>
                <tr><td>Complexity</td><td>Moderate</td><td>High</td></tr>
                <tr><td>Reporting</td><td>Simpler</td><td>More detailed</td></tr>
              </tbody>
            </table>
          </div>
          
          <p class="highlight">👉 This classification is the most important factor in your tax outcome.</p>

          <h2>6️⃣ How CRA Determines Your Classification</h2>
          
          <p>The <strong>Canada Revenue Agency</strong> evaluates several factors:</p>

          <h3>Key Criteria</h3>
          <ol>
            <li><strong>Frequency of Transactions</strong><br>occasional trades → capital gains<br>frequent trades → business income</li>
            <li><strong>Intention</strong><br>long-term investing → capital<br>short-term profit → income</li>
            <li><strong>Knowledge & Expertise</strong><br>professional-level trading → income</li>
            <li><strong>Time Spent</strong><br>part-time → capital<br>full-time → income</li>
          </ol>
          
          <p class="highlight">👉 No single factor determines classification—it's a holistic assessment.</p>

          <h2>7️⃣ What Counts as a Taxable Event?</h2>
          
          <p>In Canada, crypto transactions are taxable when you:</p>
          <ul>
            <li>sell crypto for fiat (CAD)</li>
            <li>trade one crypto for another</li>
            <li>spend crypto</li>
            <li>gift crypto (in most cases)</li>
          </ul>

          <h3>Example</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>Action</th><th>Taxable?</th></tr>
              </thead>
              <tbody>
                <tr><td>Buy crypto</td><td>❌ No</td></tr>
                <tr><td>Sell crypto</td><td>✅ Yes</td></tr>
                <tr><td>Swap BTC → ETH</td><td>✅ Yes</td></tr>
              </tbody>
            </table>
          </div>
          
          <p class="highlight">👉 Crypto-to-crypto trades are taxable—even without cashing out.</p>

          <h2>8️⃣ Adjusted Cost Base (ACB) Explained</h2>
          
          <p>Canada uses the <strong>Adjusted Cost Base (ACB)</strong> method.</p>

          <h3>What Is ACB?</h3>
          <p>ACB is the average cost of all units held</p>

          <h3>Example</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>Purchase</th><th>Price</th></tr>
              </thead>
              <tbody>
                <tr><td>1 BTC</td><td>$10,000</td></tr>
                <tr><td>1 BTC</td><td>$20,000</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>ACB:</p>
          <p class="formula">👉 ($10,000 + $20,000) ÷ 2 = $15,000</p>

          <h3>Selling Example</h3>
          <p>Sell 1 BTC at $25,000:</p>
          <ul>
            <li>Gain = $25,000 – $15,000 = $10,000</li>
          </ul>
          
          <p class="highlight">👉 ACB simplifies cost tracking but requires accurate records.</p>

          <h2>9️⃣ Crypto Income Scenarios</h2>
          
          <p>Some activities are always treated as income:</p>

          <h3>Taxable as Income</h3>
          <ul>
            <li>mining</li>
            <li>staking rewards</li>
            <li>airdrops (in some cases)</li>
            <li>DeFi yield</li>
          </ul>

          <h3>Example</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>Activity</th><th>Value</th></tr>
              </thead>
              <tbody>
                <tr><td>Staking reward</td><td>$2,000</td></tr>
                <tr><td>Taxable income</td><td>$2,000</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Later, selling that crypto triggers capital gains.</p>
          
          <p class="highlight">👉 This creates a double tax layer</p>

          <h2>🔟 Real-Life Scenario</h2>
          
          <h3>Investor Profile</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>Activity</th><th>Value</th></tr>
              </thead>
              <tbody>
                <tr><td>Buy BTC</td><td>$10,000</td></tr>
                <tr><td>Sell BTC</td><td>$18,000</td></tr>
                <tr><td>Staking income</td><td>$2,000</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Tax Breakdown</h3>
          <p><strong>Capital Gain</strong></p>
          <p>$18,000 – $10,000 = $8,000<br>Taxable = $4,000</p>

          <p><strong>Income</strong></p>
          <p>$2,000 fully taxable</p>

          <p><strong>Total Taxable Amount</strong></p>
          <p class="highlight">👉 $6,000</p>

          <h2>1️⃣1️⃣ Losses and Tax Benefits</h2>
          
          <p>Losses can reduce your tax burden.</p>

          <h3>Example</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr><th>Gains</th><th>Losses</th><th>Net</th></tr>
              </thead>
              <tbody>
                <tr><td>$10,000</td><td>$3,000</td><td>$7,000</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Capital Loss Rules</h3>
          <ul>
            <li>offset gains in same year</li>
            <li>carry forward indefinitely</li>
          </ul>
          
          <p class="highlight">👉 Strategic loss harvesting can significantly reduce taxes.</p>

          <div class="calculator-link-section">
            <p>You can experiment with different scenarios using a <a href="/canada-crypto-calculator">Canada crypto Calculator here</a></p>
          </div>

          <h2>1️⃣2️⃣ Common Mistakes</h2>
          
          <h3>Ignoring Crypto-to-Crypto Trades</h3>
          <p>These are taxable—even without fiat conversion.</p>

          <h3>Not Tracking ACB</h3>
          <p>Incorrect cost basis leads to incorrect tax reporting.</p>

          <h3>Misclassifying Activity</h3>
          <p>Calling trading "investing" when it's actually business activity.</p>

          <h3>Poor Recordkeeping</h3>
          <p>Missing data leads to overpayment or penalties.</p>

          <h2>1️⃣3️⃣ Recordkeeping Requirements</h2>
          
          <p>The <strong>Canada Revenue Agency</strong> requires:</p>
          <ul>
            <li>transaction dates</li>
            <li>value in CAD</li>
            <li>wallet addresses</li>
            <li>exchange records</li>
            <li>fees</li>
          </ul>
          
          <p class="highlight">👉 Accurate records are essential for compliance.</p>

          <h2>1️⃣4️⃣ How to Calculate Crypto Tax Step-by-Step</h2>
          
          <h3>Step 1: Identify Transactions</h3>
          <p>List all taxable events.</p>

          <h3>Step 2: Determine Classification</h3>
          <p>Capital vs income.</p>

          <h3>Step 3: Calculate ACB</h3>
          <p>Track average cost.</p>

          <h3>Step 4: Calculate Gains/Losses</h3>
          <p>Subtract ACB from sale price.</p>

          <h3>Step 5: Apply Tax Rules</h3>
          <ul>
            <li>50% inclusion for capital gains</li>
            <li>100% for income</li>
          </ul>

          <h3>Step 6: Report to CRA</h3>
          <p>Include in your annual tax return.</p>

          <h2>1️⃣5️⃣ Using a Crypto Tax Calculator</h2>
          
          <p>Manual calculation is complex, especially with:</p>
          <ul>
            <li>multiple exchanges</li>
            <li>DeFi activity</li>
            <li>NFTs</li>
          </ul>

          <h3>Benefits of Using a Calculator</h3>
          <ul>
            <li>automatic ACB tracking</li>
            <li>accurate gain/loss calculation</li>
            <li>CRA-compliant reporting</li>
            <li>time savings</li>
          </ul>

          <h2>1️⃣6️⃣ Tax Optimization Strategies</h2>
          
          <h3>1. Hold Long-Term</h3>
          <p>More likely to qualify as capital gains.</p>

          <h3>2. Offset Losses</h3>
          <p>Use losses to reduce gains.</p>

          <h3>3. Spread Transactions</h3>
          <p>Avoid large gains in a single year.</p>

          <h3>4. Track Everything</h3>
          <p>Accuracy prevents overpayment.</p>

          <h2>1️⃣7️⃣ Future of Crypto Tax in Canada</h2>
          
          <p>The <strong>Canada Revenue Agency</strong> is increasing enforcement through:</p>
          <ul>
            <li>exchange reporting</li>
            <li>blockchain analytics</li>
            <li>international cooperation</li>
          </ul>
          
          <p class="highlight">👉 Expect stricter compliance requirements.</p>

          <h2>Conclusion</h2>
          
          <p>Crypto tax in Canada comes down to one key distinction:</p>
          <p class="highlight">👉 Capital Gains vs Income</p>
          <p>Understanding this difference can dramatically affect how much tax you pay.</p>

          <h3>Final Takeaways</h3>
          <ul>
            <li>Capital gains → only 50% taxable</li>
            <li>Income → fully taxable</li>
            <li>ACB is critical for accurate calculations</li>
            <li>Most transactions are taxable</li>
            <li>Recordkeeping is essential</li>
          </ul>

          <h3>Final Thought</h3>
          <p>Crypto investing isn't just about making profits—it's about keeping them.</p>
          <p>By understanding how to calculate crypto tax correctly and applying the right strategies, you can:</p>
          <ul>
            <li>stay compliant</li>
            <li>reduce your tax burden</li>
            <li>make smarter financial decisions</li>
          </ul>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CanadaCryptoTaxGuideBlog',
  methods: {
    shareOnLinkedIn() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    },
    shareOnX() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('How to Calculate Crypto Tax in Canada (Capital Gains vs Income Explained)');
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    },
    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }
  },
  mounted() {
    document.title = 'How to Calculate Crypto Tax in Canada (Capital Gains vs Income Explained)'
  }
}
</script>

<style scoped>
/* 完整布局，保持与原文一致 */
.canada-crypto-tax-guide-blog {
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

.highlight {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f3a5f;
  background: #ecf3fa;
  padding: 8px 16px;
  border-radius: 8px;
  display: inline-block;
  margin: 8px 0;
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

.formula {
  font-family: 'Courier New', monospace;
  background: #f0f7ff;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 500;
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