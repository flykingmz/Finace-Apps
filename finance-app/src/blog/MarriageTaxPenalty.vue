<template>
  <div class="marriage-tax-blog">
    <div class="blog-container">
      <div class="blog-inner">
        <!-- ← Back to Blog 左上方链接 和 社交分享按钮 -->
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

        <!-- 文章标题 -->
        <header class="blog-header">
          <h1>The Real Marriage Tax Penalty: Data by Income Bracket (2026 Update)</h1>
        </header>

        <!-- 文章主体 (内容完全一致) -->
        <article class="blog-article">
          <!-- 1️⃣ Executive Summary -->
          <h2>Executive Summary</h2>
          <p>The "marriage tax penalty" refers to situations where a married couple pays more federal income tax filing jointly than they would have paid if they remained unmarried and filed separately as single (or head of household).</p>
          <p>While the 2017 Tax Cuts and Jobs Act (TCJA) significantly reduced marriage penalties for many middle-income households, penalties still exist — particularly for:</p>
          <ul>
            <li>Dual-income couples earning similar salaries</li>
            <li>Lower-income couples affected by the Earned Income Tax Credit (EITC)</li>
            <li>High-income couples impacted by Medicare surtaxes, capital gains thresholds, and phaseouts</li>
          </ul>
          
          <p><strong>🔎 What's New in 2026?</strong><br>
          Many TCJA individual tax provisions were scheduled to expire after 2025. Under 2026 rules (as currently projected under post-TCJA reversion):</p>
          <ul>
            <li>Tax brackets for married filers are no longer consistently double single brackets.</li>
            <li>The top bracket thresholds compress.</li>
            <li>Child Tax Credit phaseouts begin at lower income levels.</li>
            <li>Standard deductions are narrower relative to TCJA years.</li>
            <li>AMT and surtax thresholds create more high-income distortions.</li>
          </ul>
          <p><strong>Result:</strong> Marriage penalties become more common again in 2026 — especially in upper-middle and high-income brackets.</p>

          <!-- 2️⃣ Data & Assumptions -->
          <h2>Data & Assumptions</h2>
          <p>To keep this analysis consistent, we use the following modeling assumptions:</p>
          
          <p><strong>Filing Status Comparison</strong><br>
          We compare:</p>
          <ul>
            <li>Married Filing Jointly (MFJ) vs.</li>
            <li>Hypothetical unmarried scenario:
              <ul>
                <li>One spouse files Single</li>
                <li>One spouse files Head of Household (if children exist)</li>
              </ul>
            </li>
          </ul>
          
          <p><strong>Income Splits Analyzed</strong><br>
          We test:</p>
          <ol>
            <li>Equal Income Split (50/50)</li>
            <li>Single Earner Household (100/0)</li>
            <li>Moderate Imbalance (70/30)</li>
          </ol>
          
          <p><strong>Income Brackets Modeled (2026 Projection)</strong></p>
          <ul>
            <li>$40,000 (Low income)</li>
            <li>$100,000 (Middle income)</li>
            <li>$200,000 (Upper-middle income)</li>
            <li>$500,000 (High income)</li>
            <li>$900,000 (Very high income)</li>
          </ul>
          
          <p><strong>Credits & Phaseouts Modeled</strong></p>
          <ul>
            <li>Standard deduction differences</li>
            <li>Child Tax Credit (projected 2026 rules)</li>
            <li>Earned Income Tax Credit</li>
            <li>Medicare surtax (0.9%)</li>
            <li>Net Investment Income Tax (3.8%)</li>
            <li>AMT exposure</li>
            <li>Capital gains thresholds</li>
          </ul>

          <!-- 3️⃣ Scenario Comparison Table -->
          <h2> Scenario Comparison Table</h2>
          <p>Below is a simplified comparison under projected 2026 rules.</p>
          
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Total Income</th>
                  <th>Split</th>
                  <th>Children</th>
                  <th>Joint Tax</th>
                  <th>Hypothetical Separate</th>
                  <th>Penalty / Bonus</th>
                  <th>% of AGI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>$40k</td>
                  <td>50/50</td>
                  <td>2</td>
                  <td>Higher</td>
                  <td>Lower</td>
                  <td>Penalty (~$2k)</td>
                  <td>~5%</td>
                </tr>
                <tr>
                  <td>$100k</td>
                  <td>50/50</td>
                  <td>2</td>
                  <td>Slightly Higher</td>
                  <td>Lower</td>
                  <td>Penalty (~$3k)</td>
                  <td>~3%</td>
                </tr>
                <tr>
                  <td>$200k</td>
                  <td>100/0</td>
                  <td>2</td>
                  <td>Lower</td>
                  <td>Higher</td>
                  <td>Bonus (~$5–6k)</td>
                  <td>~3%</td>
                </tr>
                <tr>
                  <td>$200k</td>
                  <td>50/50</td>
                  <td>2</td>
                  <td>Slightly Higher</td>
                  <td>Lower</td>
                  <td>Small Penalty</td>
                  <td>~1–2%</td>
                </tr>
                <tr>
                  <td>$500k</td>
                  <td>50/50</td>
                  <td>0</td>
                  <td>Higher</td>
                  <td>Lower</td>
                  <td>Penalty</td>
                  <td>~2%</td>
                </tr>
                <tr>
                  <td>$900k</td>
                  <td>50/50</td>
                  <td>0</td>
                  <td>Much Higher</td>
                  <td>Lower</td>
                  <td>Large Penalty</td>
                  <td>~3–4%</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p><strong>Key 2026 Changes vs 2023–2025</strong></p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Policy Area</th>
                  <th>TCJA Era</th>
                  <th>2026 Projection</th>
                  <th>Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Joint Bracket Width</td>
                  <td>Mostly 2x single</td>
                  <td>Less than 2x at upper tiers</td>
                  <td>More high-income penalties</td>
                </tr>
                <tr>
                  <td>Child Tax Credit Phaseout</td>
                  <td>$400k MFJ</td>
                  <td>Likely lower threshold</td>
                  <td>More penalties for families</td>
                </tr>
                <tr>
                  <td>Standard Deduction Gap</td>
                  <td>Larger</td>
                  <td>Narrower relative benefit</td>
                  <td>Less offsetting benefit</td>
                </tr>
                <tr>
                  <td>AMT Phaseout</td>
                  <td>Higher</td>
                  <td>Lower</td>
                  <td>More exposure</td>
                </tr>
                <tr>
                  <td>Capital Gains Threshold</td>
                  <td>Not double</td>
                  <td>Still not double</td>
                  <td>High earners penalized</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 4️⃣ Visual Breakdown -->
          <h2>Visual Breakdown</h2>
          
          <h3>🔹 Dual Earners — Equal Income</h3>
          <p><strong>What happens?</strong><br>
          When both spouses earn similar incomes:</p>
          <ul>
            <li>Combining income can push total earnings into higher brackets.</li>
            <li>Loss of Head of Household status.</li>
            <li>EITC shrinks sharply.</li>
            <li>Phaseouts hit sooner in 2026.</li>
          </ul>
          <p>This group sees the highest probability of marriage penalties.</p>
          
          <h3>🔹 Single-Earner Household</h3>
          <p><strong>What happens?</strong><br>
          When one spouse earns most or all income:</p>
          <ul>
            <li>Joint filing shifts income into lower brackets.</li>
            <li>Larger standard deduction.</li>
            <li>Better bracket smoothing.</li>
            <li>Child credits more accessible.</li>
          </ul>
          <p>This group is most likely to receive a marriage bonus, especially at $150k–$300k income ranges.</p>
          
          <h3>🔹 High-Income Earners</h3>
          <p>High earners are affected by:</p>
          <ul>
            <li>37% bracket compression</li>
            <li>Medicare surtax threshold</li>
            <li>Net Investment Income Tax</li>
            <li>Capital gains threshold not doubling</li>
            <li>AMT re-expansion in 2026</li>
          </ul>
          <p>Penalties grow again above $500k under 2026 rules.</p>

          <!-- 5️⃣ Interpretation -->
          <h2>Interpretation</h2>
          
          <h3>Marriage Penalties Are Structural — Not Political</h3>
          <p>They arise because:</p>
          <ul>
            <li>The U.S. has a progressive tax system.</li>
            <li>Filing jointly combines incomes.</li>
            <li>Some brackets and credits are not perfectly doubled.</li>
            <li>Some phaseouts depend on total income.</li>
          </ul>
          <p>As long as these structures exist, penalties and bonuses will exist.</p>
          
          <h3>2026 Reintroduces More Penalties</h3>
          <p>Compared to 2023–2025:</p>
          <ul>
            <li>Upper-middle-income couples ($200k–$500k) face more bracket compression.</li>
            <li>Families lose some credit flexibility.</li>
            <li>AMT becomes relevant for more households.</li>
            <li>High earners feel surtax distortion more strongly.</li>
          </ul>
          <p>Net effect: Marriage penalties expand upward again.</p>
          
          <h3>Equal Earners Face the Highest Risk</h3>
          <p>Historically, data from the Tax Policy Center showed:</p>
          <ul>
            <li>~43% of couples faced penalties</li>
            <li>~43% received bonuses</li>
            <li>Average penalty ≈ $2,000+</li>
            <li>Average bonus ≈ $3,000+</li>
          </ul>
          <p>In 2026 modeling, the share facing penalties likely increases modestly due to bracket narrowing.<br>
          Couples with similar wages (especially both earning $100k–$300k) are the most exposed.</p>
          
          <h3>Low-Income Families and EITC</h3>
          <p>EITC creates some of the largest percentage penalties.<br>
          A couple earning $40k split evenly with children can lose:</p>
          <ul>
            <li>Head of Household filing</li>
            <li>Larger standard deduction</li>
            <li>Maximum EITC benefit</li>
          </ul>
          <p>This can create penalties exceeding 5% of AGI — among the largest proportional effects in the system.</p>
          
          <h3>High-Income Planning Matters More in 2026</h3>
          <p>Couples above:</p>
          <ul>
            <li>$250k (Medicare surtax)</li>
            <li>$400k (credit phaseouts)</li>
            <li>$500k+ (bracket compression)</li>
          </ul>
          <p>Should consider:</p>
          <ul>
            <li>Retirement contributions (401k, IRA)</li>
            <li>HSA contributions</li>
            <li>Capital gains timing</li>
            <li>Tax-loss harvesting</li>
            <li>Income smoothing strategies</li>
          </ul>
          <p>Marriage itself is not taxed — income stacking is.</p>
          
          <h3>Final Takeaway</h3>
          <p>Marriage does not automatically reduce or increase your taxes.<br>
          Instead:</p>
          <ul>
            <li>Dual earners with similar salaries → More likely penalty</li>
            <li>Single earner households → More likely bonus</li>
            <li>Low-income EITC households → Potentially large penalty</li>
            <li>High-income households → Growing 2026 exposure</li>
          </ul>
          <p>The 2026 tax environment reintroduces structural friction that had been partially muted under TCJA.<br>
          For couples planning marriage, career changes, or large income increases:<br>
          <strong>Run projections before filing — not after.</strong><br>
          Because the real marriage tax penalty is not emotional.<br>
          It's mathematical.</p>
        </article>

        <!-- 底部中间calculator按钮 (Explore Marriage Tax Calculator →) -->
        <div class="blog-footer-button">
          <a href="/marriage-tax-calculator" class="calculator-button">
            Explore Marriage Tax Calculator →
          </a>
        </div>
      </div> <!-- /blog-inner -->
    </div> <!-- /blog-container -->
  </div> <!-- /marriage-tax-blog -->
</template>

<script>
export default {
  name: 'MarriageTaxBlog',
  methods: {
    shareOnLinkedIn() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    },
    shareOnX() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('The Real Marriage Tax Penalty: Data by Income Bracket (2026 Update)');
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    },
    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }
  },
  mounted() {
    document.title = 'The Real Marriage Tax Penalty: Data by Income Bracket (2026 Update)'
  }
}
</script>

<style scoped>
/* 布局保持一致，沿用之前的风格但微调颜色 */
.marriage-tax-blog {
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

/* ← Back to Blog 左上方 + 社交分享 */
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

/* Social Share Buttons */
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

.blog-header h1 {
  font-size: 2.4rem;
  font-weight: 750;
  color: #0b2542;
  line-height: 1.2;
  margin-bottom: 1rem;
  border-left: 10px solid #2c7fb8;
  padding-left: 1.5rem;
}

.blog-article {
  color: #1a2e44;
  font-size: 1.05rem;
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
  font-size: 1.4rem;
  margin: 1.8rem 0 0.8rem;
  color: #17466b;
}

.blog-article h4 {
  font-size: 1.25rem;
  margin: 1.5rem 0 0.3rem;
  color: #205b88;
}

.blog-article p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.blog-article ul, .blog-article ol {
  margin-bottom: 1rem;
  padding-left: 2rem;
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
  min-width: 700px;
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
  .blog-inner { padding: 1.5rem; }
  .blog-header h1 { font-size: 1.8rem; }
}
</style>
