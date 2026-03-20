<template>
  <div class="nft-tax-guide-blog">
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
          <h1>Do You Pay Tax on NFTs? 5 Things Every Investor Must Know</h1>
          
          <h2>Introduction</h2>
          
          <p>Non-Fungible Tokens (NFTs) have transformed digital ownership—spanning art, gaming, music, and virtual assets. But while many investors focus on buying, selling, and flipping NFTs, one critical question often gets overlooked:</p>
          
          <p class="highlight">👉 Do you pay tax on NFTs?</p>
          
          <p>The short answer is yes. In most jurisdictions, NFTs are taxable, and failing to understand how they are taxed can lead to unexpected liabilities, penalties, or audits.</p>
          
          <p>In this guide, we break down 5 essential NFT tax rules every investor must know—covering capital gains, income tax, minting, royalties, and recordkeeping—so you can stay compliant and avoid overpaying.</p>

          <h2>1️⃣ Executive Summary</h2>
          
          <ul>
            <li>NFTs are generally treated as taxable assets</li>
            <li>Selling or trading NFTs triggers Capital Gains Tax (CGT)</li>
            <li>Earning NFTs (minting, royalties, airdrops) may trigger income tax</li>
            <li>Crypto used to buy NFTs is also a taxable event</li>
            <li>Proper recordkeeping is critical to avoid penalties</li>
          </ul>

          <h2>2️⃣ What Are NFTs (From a Tax Perspective)?</h2>
          
          <p>NFTs (Non-Fungible Tokens) represent unique digital assets recorded on a blockchain.</p>
          <p>From a tax perspective, authorities like <strong>Internal Revenue Service</strong> and <strong>HM Revenue & Customs</strong> treat NFTs as property, not currency.</p>
          
          <p>This means:</p>
          <ul>
            <li>Buying, selling, or trading NFTs can create taxable events</li>
            <li>Gains are typically subject to capital gains tax</li>
            <li>Income-related activities may be taxed as ordinary income</li>
          </ul>

          <h2>3️⃣ Rule #1: Selling NFTs Triggers Capital Gains Tax</h2>
          
          <p>The most common taxable event is selling an NFT.</p>

          <h3>How It Works</h3>
          
          <div class="formula-block">
            <p><strong>Capital Gain = Sale Price – Purchase Price</strong></p>
          </div>

          <h3>Example</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Buy NFT</td><td>$2,000</td></tr>
                <tr><td>Sell NFT</td><td>$5,000</td></tr>
                <tr><td><strong>Capital Gain</strong></td><td><strong>$3,000</strong></td></tr>
              </tbody>
            </table>
          </div>
          
          <p class="highlight">👉 You owe tax on the $3,000 gain</p>

          <h3>Important Notes</h3>
          <ul>
            <li>Holding period may affect tax rate (short-term vs long-term)</li>
            <li>Losses can offset gains</li>
          </ul>

          <h3>Strategy</h3>
          <ul>
            <li>Track purchase and sale prices carefully</li>
            <li>Consider timing your sales to reduce tax impact</li>
          </ul>

          <h2>4️⃣ Rule #2: Buying NFTs with Crypto Is a Taxable Event</h2>
          
          <p>This is one of the most overlooked rules.</p>
          <p>When you use crypto (e.g., ETH) to buy an NFT:</p>
          <p class="highlight">👉 You are disposing of crypto</p>

          <h3>Example</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Tax Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Buy ETH at $1,000</td><td>Cost basis</td></tr>
                <tr><td>Use ETH at $1,500 to buy NFT</td><td>$500 gain</td></tr>
              </tbody>
            </table>
          </div>
          
          <p class="highlight">👉 That $500 gain is taxable—even though you didn't "cash out"</p>

          <h3>Why This Matters</h3>
          <p>NFT investors often:</p>
          <ul>
            <li>underestimate tax liability</li>
            <li>create multiple taxable events unintentionally</li>
          </ul>

          <h3>Strategy</h3>
          <ul>
            <li>Always track crypto cost basis</li>
            <li>Use a calculator that handles both crypto and NFT transactions</li>
          </ul>

          <div class="calculator-link-section">
            <p>You can experiment with different scenarios using an <a href="/nft-calculator">NFT Tax Calculator here</a></p>
          </div>

          <h2>5️⃣ Rule #3: Minting and Creating NFTs May Be Taxed as Income</h2>
          
          <p>If you are a creator, tax rules are different.</p>

          <h3>When Minting Is Taxable</h3>
          <p>Minting itself may not be taxable, but:</p>
          <p class="highlight">👉 Selling minted NFTs is usually treated as income</p>

          <h3>Example</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Tax Type</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Create NFT</td><td>No tax</td></tr>
                <tr><td>Sell NFT for $1,000</td><td>Income tax</td></tr>
              </tbody>
            </table>
          </div>
          
          <p>Why?</p>
          <p>Because it is considered:</p>
          <ul>
            <li>business income</li>
            <li>self-employment income (in some cases)</li>
          </ul>

          <h3>Additional Considerations</h3>
          <ul>
            <li>You may owe self-employment tax</li>
            <li>Expenses (gas fees, tools) may be deductible</li>
          </ul>

          <h2>6️⃣ Rule #4: NFT Royalties Are Taxable Income</h2>
          
          <p>NFT creators often earn royalties from secondary sales.</p>

          <h3>How Royalties Are Taxed</h3>
          <p>Royalties are treated as:</p>
          <p class="highlight">👉 ordinary income</p>

          <h3>Example</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Royalty Earned</th>
                  <th>Tax Treatment</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$5,000</td><td>Taxed as income</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Additional Tax Layer</h3>
          <p>If you later sell the crypto received:</p>
          <ul>
            <li>you may also owe capital gains tax</li>
          </ul>

          <h3>Strategy</h3>
          <ul>
            <li>Track royalty income separately</li>
            <li>Set aside funds for taxes</li>
            <li>Monitor crypto price changes</li>
          </ul>

          <h2>7️⃣ Rule #5: You Must Track Everything (Or Risk Penalties)</h2>
          
          <p>NFT transactions can become complex quickly.</p>

          <h3>Required Records</h3>
          <p>Authorities like <strong>Internal Revenue Service</strong> and <strong>HM Revenue & Customs</strong> require:</p>
          <ul>
            <li>purchase price</li>
            <li>sale price</li>
            <li>transaction dates</li>
            <li>wallet addresses</li>
            <li>gas fees</li>
            <li>crypto values at time of transaction</li>
          </ul>

          <h3>Why This Matters</h3>
          <p>Without accurate records:</p>
          <ul>
            <li>you may overpay taxes</li>
            <li>or underreport and face penalties</li>
          </ul>

          <h3>Strategy</h3>
          <ul>
            <li>use automated tracking tools</li>
            <li>export wallet and exchange data</li>
            <li>maintain consistent records</li>
          </ul>

          <h2>8️⃣ NFT Tax Scenarios (Real-World Examples)</h2>
          
          <h3>Scenario 1: Flip Trade</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Buy NFT for $1,000</td><td>Cost basis</td></tr>
                <tr><td>Sell for $2,500</td><td>$1,500 gain</td></tr>
              </tbody>
            </table>
          </div>
          <p class="highlight">👉 Capital gains tax applies</p>

          <h3>Scenario 2: Crypto Purchase + NFT Sale</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>ETH gain</td><td>$500</td></tr>
                <tr><td>NFT gain</td><td>$2,000</td></tr>
              </tbody>
            </table>
          </div>
          <p class="highlight">👉 Two separate taxable events</p>

          <h3>Scenario 3: Creator Income</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Mint NFT</td><td>No tax</td></tr>
                <tr><td>Sell NFT</td><td>Income tax</td></tr>
              </tbody>
            </table>
          </div>

          <h2>9️⃣ NFT Losses and Tax Benefits</h2>
          
          <p>Losses can reduce your tax liability.</p>

          <h3>Example</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Gains</th>
                  <th>Losses</th>
                  <th>Taxable</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>$10,000</td><td>$4,000</td><td>$6,000</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Strategy: Loss Harvesting</h3>
          <ul>
            <li>sell underperforming NFTs</li>
            <li>offset gains</li>
            <li>re-enter later if desired</li>
          </ul>

          <h2>🔟 NFT Taxes Across Jurisdictions</h2>
          
          <p>While rules vary, common patterns include:</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Tax Treatment</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>U.S.</td><td>Property (CGT + income tax)</td></tr>
                <tr><td>UK</td><td>Property (CGT + income tax)</td></tr>
                <tr><td>EU</td><td>Similar frameworks</td></tr>
              </tbody>
            </table>
          </div>
          <p>Always check local rules.</p>

          <h2>1️⃣1️⃣ Common Mistakes NFT Investors Make</h2>
          
          <ul>
            <li>Ignoring crypto-to-NFT tax events</li>
            <li>Not tracking gas fees</li>
            <li>Mixing personal and business income</li>
            <li>Failing to report royalties</li>
            <li>Assuming NFTs are "tax-free"</li>
          </ul>

          <h2>1️⃣2️⃣ Tools to Simplify NFT Tax Calculations</h2>
          
          <p>NFT tax calculations can be complicated due to:</p>
          <ul>
            <li>price volatility</li>
            <li>multiple transactions</li>
            <li>cross-platform activity</li>
          </ul>

          <h3>Benefits of Using a Tax Calculator</h3>
          <ul>
            <li>automatic gain/loss calculation</li>
            <li>tracking across wallets</li>
            <li>accurate tax reports</li>
            <li>scenario planning</li>
          </ul>

          <h2>1️⃣3️⃣ How to Reduce NFT Tax Legally</h2>
          
          <h3>Key Strategies</h3>
          <ul>
            <li>hold NFTs longer (lower tax rates in some regions)</li>
            <li>offset gains with losses</li>
            <li>spread sales across tax years</li>
            <li>track and deduct expenses</li>
          </ul>

          <h2>1️⃣4️⃣ Future of NFT Taxation</h2>
          
          <p>NFT regulation is evolving rapidly.</p>
          <p>Governments are:</p>
          <ul>
            <li>increasing enforcement</li>
            <li>improving tracking capabilities</li>
            <li>refining classification rules</li>
          </ul>
          <p>Investors should expect:</p>
          <p class="highlight">👉 stricter reporting requirements in the future</p>

          <h2>1️⃣5️⃣ Final Thoughts</h2>
          
          <p>NFT investing can be exciting and profitable—but taxes are unavoidable.</p>
          <p>Understanding how NFTs are taxed helps you:</p>
          <ul>
            <li>avoid costly mistakes</li>
            <li>reduce liabilities</li>
            <li>stay compliant with authorities like <strong>Internal Revenue Service</strong> and <strong>HM Revenue & Customs</strong></li>
          </ul>

          <h3>Key Takeaways</h3>
          <ul>
            <li>Selling NFTs → capital gains tax</li>
            <li>Buying NFTs with crypto → taxable event</li>
            <li>Minting & royalties → income tax</li>
            <li>Losses can offset gains</li>
            <li>Recordkeeping is essential</li>
          </ul>

          <h2>Conclusion</h2>
          
          <p>NFT taxes may seem complicated at first, but the core principle is simple:</p>
          <p class="quote">👉 If value is created or transferred, it's likely taxable.</p>
          
          <p>By understanding these 5 key rules, you can confidently navigate NFT taxation and focus on what really matters—building and growing your digital asset portfolio.</p>
        </article>
      </div> <!-- /blog-inner -->
    </div> <!-- /blog-container -->
  </div> <!-- /nft-tax-guide-blog -->
</template>

<script>
export default {
  name: 'NFTTaxGuideBlog',
  methods: {
    shareOnLinkedIn() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    },
    shareOnX() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('Do You Pay Tax on NFTs? 5 Things Every Investor Must Know');
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
.nft-tax-guide-blog {
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