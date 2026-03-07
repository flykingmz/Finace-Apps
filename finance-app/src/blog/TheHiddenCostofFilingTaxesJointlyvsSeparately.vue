<template>
  <div class="blog-post">
    <!-- Blog Header with Back Link and Social Share -->
    <div class="blog-header">
      <div class="header-left">
        <router-link to="/blog" class="back-link">← Back to Blog</router-link>
      </div>
      <div class="header-right">
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

    <!-- 博客标题区域 -->
    <div class="post-header">
      <h1 class="post-title">The Hidden Cost of Filing Taxes Jointly vs Separately</h1>
      <p class="post-intro">
        Choosing between Married Filing Jointly (MFJ) and Married Filing Separately (MFS) can significantly impact a couple's total tax burden. While many assume filing jointly is always the best option, the reality is more nuanced. Differences in tax brackets, deductions, credits, and income distribution can create hidden costs—or unexpected savings—depending on how a couple files.
      </p>
      <p class="post-intro">
        This article examines the financial implications of filing jointly versus separately using structured assumptions, scenario comparisons, and analytical interpretation.
      </p>
    </div>

    <!-- 1️⃣ Executive Summary -->
    <section class="content-section">
      <h2>1️⃣ Executive Summary</h2>
      <p>For married couples in the United States, the tax code provides multiple filing statuses. The two most relevant for married taxpayers are:</p>
      <ul>
        <li><strong>Married Filing Jointly (MFJ)</strong></li>
        <li><strong>Married Filing Separately (MFS)</strong></li>
      </ul>
      <p>In general, filing jointly offers lower tax rates and access to more credits, which is why roughly 90% of married couples file jointly.</p>
      <p>However, there are situations where filing separately may produce a lower overall tax burden or financial benefit, particularly when:</p>
      <ul>
        <li>One spouse has large medical deductions</li>
        <li>One spouse has student loan income-driven repayment plans</li>
        <li>Couples want financial separation or liability protection</li>
        <li>Income levels create a marriage tax penalty</li>
      </ul>
      <p>Key findings from the analysis:</p>
      <ul>
        <li>Couples with similar income levels generally benefit most from joint filing</li>
        <li>Couples with high income disparity may sometimes benefit from separate filing</li>
        <li>Filing separately can disqualify major tax credits</li>
        <li>In high-income brackets, joint filing can create a marriage penalty</li>
      </ul>
      <p>Understanding these dynamics is essential for couples seeking to optimize tax outcomes.</p>
    </section>

    <!-- 2️⃣ Data & Assumptions -->
    <section class="content-section">
      <h2>2️⃣ Data & Assumptions</h2>
      <p>To compare filing strategies, we define several baseline assumptions.</p>
      
      <h3>Tax Framework</h3>
      <p>The analysis uses simplified assumptions based on recent U.S. tax structures:</p>
      
      <div class="table-responsive">
        <table class="data-table small-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Standard deduction (MFJ)</td>
              <td>$29,200</td>
            </tr>
            <tr>
              <td>Standard deduction (MFS)</td>
              <td>$14,600</td>
            </tr>
            <tr>
              <td>Federal tax brackets</td>
              <td>Current progressive structure</td>
            </tr>
            <tr>
              <td>State taxes</td>
              <td>Not included</td>
            </tr>
            <tr>
              <td>Filing status</td>
              <td>Married couple</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Income Distribution Scenarios</h3>
      <p>We analyze four representative income scenarios.</p>
      
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Spouse A Income</th>
              <th>Spouse B Income</th>
              <th>Total Household Income</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Equal income</td>
              <td>$80,000</td>
              <td>$80,000</td>
              <td>$160,000</td>
            </tr>
            <tr>
              <td>Moderate imbalance</td>
              <td>$120,000</td>
              <td>$40,000</td>
              <td>$160,000</td>
            </tr>
            <tr>
              <td>High imbalance</td>
              <td>$150,000</td>
              <td>$10,000</td>
              <td>$160,000</td>
            </tr>
            <tr>
              <td>High-income couple</td>
              <td>$250,000</td>
              <td>$250,000</td>
              <td>$500,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Credit Eligibility</h3>
      <p>Some tax credits cannot be claimed when filing separately, including:</p>
      <ul>
        <li>Earned Income Tax Credit</li>
        <li>American Opportunity Credit</li>
        <li>Child and dependent care credits (limited)</li>
        <li>Student loan interest deduction</li>
      </ul>
      <p>These restrictions are a major reason why joint filing often produces better results.</p>
    </section>

    <!-- 3️⃣ Scenario Comparison Table -->
    <section class="content-section">
      <h2>3️⃣ Scenario Comparison Table</h2>
      <p>The following simplified table estimates federal tax outcomes under both filing strategies.</p>
      
      <h3>Estimated Federal Tax Comparison</h3>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Filing Status</th>
              <th>Taxable Income</th>
              <th>Estimated Tax</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="2">Equal income</td>
              <td>Joint</td>
              <td>$130,800</td>
              <td>~$20,900</td>
            </tr>
            <tr>
              <td>Separate</td>
              <td>$65,400 each</td>
              <td>~$22,600 total</td>
            </tr>
            <tr>
              <td rowspan="2">Moderate imbalance</td>
              <td>Joint</td>
              <td>$130,800</td>
              <td>~$20,900</td>
            </tr>
            <tr>
              <td>Separate</td>
              <td>uneven</td>
              <td>~$21,800</td>
            </tr>
            <tr>
              <td rowspan="2">High imbalance</td>
              <td>Joint</td>
              <td>$130,800</td>
              <td>~$20,900</td>
            </tr>
            <tr>
              <td>Separate</td>
              <td>uneven</td>
              <td>~$19,900</td>
            </tr>
            <tr>
              <td rowspan="2">High-income couple</td>
              <td>Joint</td>
              <td>$470,800</td>
              <td>~$105,000</td>
            </tr>
            <tr>
              <td>Separate</td>
              <td>$235,400 each</td>
              <td>~$102,000 total</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Key Observations</h3>
      <ol>
        <li><strong>Equal incomes favor joint filing</strong> – When both spouses earn similar salaries, combining incomes usually reduces taxes.</li>
        <li><strong>Income imbalance can change outcomes</strong> – When one spouse earns significantly more, separate filing may sometimes produce a slight benefit.</li>
        <li><strong>High-income couples may face penalties</strong> – In upper brackets, combining incomes may push couples into higher marginal tax rates.</li>
      </ol>
    </section>

    <!-- 4️⃣ Visual Breakdown -->
    <section class="content-section">
      <h2>4️⃣ Visual Breakdown</h2>
      <p>Although tax calculations are numerical, the financial flow can be understood visually.</p>

      <div class="visual-flow">
        <h3>Income → Deductions → Taxable Income → Taxes</h3>
        
        <div class="flow-diagram">
          <div class="flow-column">
            <div class="flow-box">Household Income</div>
            <div class="flow-arrow">↓</div>
            <div class="flow-box">Standard Deduction</div>
            <div class="flow-arrow">↓</div>
            <div class="flow-box">Taxable Income</div>
            <div class="flow-arrow">↓</div>
            <div class="flow-box">Progressive Tax Brackets</div>
            <div class="flow-arrow">↓</div>
            <div class="flow-box final">Final Tax Liability</div>
          </div>
          <div class="flow-caption">For a joint filing household</div>
        </div>

        <div class="flow-diagram separate">
          <div class="flow-row">
            <div class="flow-column half">
              <div class="flow-box">Spouse A Income</div>
              <div class="flow-arrow">↓</div>
              <div class="flow-box">Deduction</div>
              <div class="flow-arrow">↓</div>
              <div class="flow-box">Tax</div>
            </div>
            <div class="flow-column half">
              <div class="flow-box">Spouse B Income</div>
              <div class="flow-arrow">↓</div>
              <div class="flow-box">Deduction</div>
              <div class="flow-arrow">↓</div>
              <div class="flow-box">Tax</div>
            </div>
          </div>
          <div class="flow-arrow">↓</div>
          <div class="flow-box final">Combined Tax Total</div>
          <div class="flow-caption">For separate filing</div>
        </div>
      </div>

      <h3>Structural Differences</h3>
      <p>Key structural differences include:</p>
      
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Factor</th>
              <th>Filing Jointly</th>
              <th>Filing Separately</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tax brackets</td>
              <td>Wider</td>
              <td>Narrower</td>
            </tr>
            <tr>
              <td>Standard deduction</td>
              <td>Higher</td>
              <td>Lower</td>
            </tr>
            <tr>
              <td>Tax credits</td>
              <td>Many available</td>
              <td>Many disallowed</td>
            </tr>
            <tr>
              <td>Liability sharing</td>
              <td>Shared</td>
              <td>Individual</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>These structural differences explain why joint filing usually wins, but not always.</p>
    </section>

    <!-- 5️⃣ Interpretation -->
    <section class="content-section">
      <h2>5️⃣ Interpretation</h2>

      <h3>1. Why Filing Jointly Usually Saves Money</h3>
      <p>Joint filing expands tax brackets and deductions, which prevents couples from moving into higher marginal rates too quickly.</p>
      <p>Example:</p>
      <p class="indent">Two individuals earning $80k each pay more tax individually than if their income is combined under MFJ brackets.</p>
      <p>This is known as the marriage bonus.</p>

      <h3>2. The Marriage Tax Penalty</h3>
      <p>In some cases, joint filing produces the opposite effect.</p>
      <p>If both spouses earn high incomes, combining salaries may push the couple into higher tax brackets faster than if they filed separately.</p>
      
      <div class="table-responsive small-table">
        <table class="data-table">
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Tax Impact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Two high earners</td>
              <td>Possible penalty</td>
            </tr>
            <tr>
              <td>One high + one low earner</td>
              <td>Often a bonus</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>This dynamic is commonly referred to as the marriage tax penalty.</p>

      <h3>3. Credit Restrictions Under Separate Filing</h3>
      <p>A major drawback of filing separately is the loss of important tax benefits.</p>
      <p>Examples include:</p>
      <ul>
        <li>Child tax credit limitations</li>
        <li>Education credits</li>
        <li>Student loan interest deductions</li>
      </ul>
      <p>These restrictions can easily outweigh any tax bracket advantage.</p>

      <h3>4. When Filing Separately Makes Sense</h3>
      <p>Despite its limitations, separate filing can be beneficial in certain cases.</p>
      <p>Situations include:</p>
      <ul>
        <li><strong>Medical expense deductions</strong> – Medical deductions are only allowed above a percentage of income. Lower income can increase eligibility.</li>
        <li><strong>Student loan repayment programs</strong> – Income-driven repayment plans may benefit from a lower reported income.</li>
        <li><strong>Legal or financial separation</strong> – Separate filing can limit liability exposure between spouses.</li>
        <li><strong>Large itemized deductions</strong> – One spouse may qualify for deductions independently.</li>
      </ul>

      <h3>5. Strategic Tax Planning</h3>
      <p>Couples should evaluate multiple strategies before choosing a filing status.</p>
      <p>Key considerations include:</p>
      
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Factor</th>
              <th>Why It Matters</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Income balance</td>
              <td>Affects tax brackets</td>
            </tr>
            <tr>
              <td>Available deductions</td>
              <td>Changes taxable income</td>
            </tr>
            <tr>
              <td>Credit eligibility</td>
              <td>Can significantly reduce taxes</td>
            </tr>
            <tr>
              <td>Long-term financial goals</td>
              <td>Retirement and investment planning</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Running multiple scenarios using a tax calculator or financial planning tool can help identify the most tax-efficient filing strategy.</p>
    </section>

    <!-- Conclusion -->
    <section class="content-section">
      <h2>Conclusion</h2>
      <p>While Married Filing Jointly is typically the most tax-efficient option, it is not universally optimal. Income distribution, eligibility for tax credits, and deduction structures can create meaningful differences in tax liability.</p>
      <p>Our scenario analysis highlights several important insights:</p>
      <ul>
        <li>Most couples benefit from joint filing due to wider tax brackets</li>
        <li>Income imbalance can sometimes favor separate filing</li>
        <li>High-income couples may experience a marriage tax penalty</li>
        <li>Filing separately often results in lost tax credits</li>
      </ul>
      <p>Ultimately, the best filing status depends on each household's financial situation. Couples should compare both approaches annually to determine which strategy produces the lowest total tax burden.</p>
      <p>Understanding the hidden costs of filing jointly versus separately can help households make better tax decisions and maximize their after-tax income.</p>
    </section>

    <!-- Explore Marriage Tax Calculator 按钮 -->
    <div class="calculator-button-container">
      <router-link to="/marriage-tax-calculator" class="calculator-button">Explore Marriage Tax Calculator →</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarriageTaxBlogPost',
  methods: {
    shareOnLinkedIn() {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent('The Hidden Cost of Filing Taxes Jointly vs Separately');
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    },
    shareOnX() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('The Hidden Cost of Filing Taxes Jointly vs Separately');
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    },
    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }
  }
};
</script>

<style scoped>
/* 全局样式 */
.blog-post {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #1a2b3c;
  line-height: 1.6;
  background: #ffffff;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .blog-post {
    padding: 20px 16px;
  }
}

/* Blog Header with Back Link and Social Share */
.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.header-left {
  flex: 1;
}

.header-right {
  flex-shrink: 0;
}

.back-link {
  display: inline-block;
  color: #2c5282;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: #1a365d;
  text-decoration: underline;
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
  background: #f0f5fa;
  color: #4b5f73;
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

@media (max-width: 480px) {
  .blog-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-right {
    width: 100%;
  }
  
  .social-share {
    justify-content: flex-start;
  }
}

/* 博客标题区域 */
.post-header {
  margin-bottom: 40px;
}

.post-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0b2b44;
  margin: 0 0 20px 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.post-intro {
  font-size: 1.1rem;
  color: #2d3e50;
  margin: 16px 0;
}

@media (max-width: 480px) {
  .post-title {
    font-size: 2rem;
  }
  
  .post-intro {
    font-size: 1rem;
  }
}

/* 内容章节 */
.content-section {
  margin-bottom: 48px;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 32px;
}

.content-section:last-of-type {
  border-bottom: none;
}

.content-section h2 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #0b2b44;
  margin: 32px 0 20px 0;
  line-height: 1.3;
}

.content-section h3 {
  font-size: 1.4rem;
  font-weight: 500;
  color: #1e3a5f;
  margin: 28px 0 16px 0;
}

.content-section p {
  margin: 16px 0;
  font-size: 1.05rem;
  color: #1f2e3f;
}

.indent {
  padding-left: 24px;
  margin: 8px 0;
  font-style: italic;
}

.content-section ul,
.content-section ol {
  margin: 16px 0;
  padding-left: 28px;
}

.content-section li {
  margin: 10px 0;
  font-size: 1.05rem;
  color: #1f2e3f;
  line-height: 1.6;
}

.content-section li strong {
  color: #0b2b44;
}

/* 表格响应式 */
.table-responsive {
  overflow-x: auto;
  margin: 24px 0;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  min-width: 400px;
}

.data-table.small-table {
  min-width: 300px;
  max-width: 500px;
}

.data-table th {
  background: #e6f0fa;
  padding: 14px 16px;
  text-align: left;
  font-weight: 600;
  color: #1a3349;
  border-bottom: 2px solid #cbd5e0;
}

.data-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  color: #2d3e50;
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tr:hover td {
  background: #f7fafc;
}

/* 可视化流程图 */
.visual-flow {
  margin: 32px 0;
  padding: 24px;
  background: #f8fafc;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.visual-flow h3 {
  margin-top: 0;
  text-align: center;
}

.flow-diagram {
  margin: 32px 0;
  text-align: center;
}

.flow-diagram.separate {
  margin-top: 48px;
}

.flow-row {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

.flow-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 180px;
}

.flow-column.half {
  flex: 1;
  min-width: 140px;
}

.flow-box {
  background: white;
  border: 2px solid #2c5282;
  border-radius: 8px;
  padding: 12px 16px;
  font-weight: 500;
  color: #1e3a5f;
  width: 100%;
  text-align: center;
}

.flow-box.final {
  background: #1f3a5f;
  color: white;
  border-color: #0b2b44;
}

.flow-arrow {
  font-size: 1.5rem;
  color: #718096;
  margin: 8px 0;
}

.flow-caption {
  margin-top: 16px;
  color: #718096;
  font-style: italic;
}

@media (max-width: 600px) {
  .flow-row {
    flex-direction: column;
    gap: 16px;
  }
  
  .flow-column.half {
    width: 100%;
  }
}

/* 计算器按钮 */
.calculator-button-container {
  margin: 48px 0 24px;
  text-align: center;
}

.calculator-button {
  display: inline-block;
  background: #1f3a5f;
  color: white;
  text-decoration: none;
  padding: 16px 40px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  transition: background-color 0.2s, transform 0.1s;
  box-shadow: 0 4px 12px rgba(0, 34, 68, 0.2);
  border: 1px solid #1f3a5f;
}

.calculator-button:hover {
  background: #143049;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 34, 68, 0.25);
}

.calculator-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 34, 68, 0.2);
}

@media (max-width: 480px) {
  .calculator-button {
    padding: 14px 24px;
    font-size: 1rem;
    width: 100%;
  }
  
  .content-section h2 {
    font-size: 1.5rem;
  }
  
  .content-section h3 {
    font-size: 1.2rem;
  }
  
  .content-section p,
  .content-section li {
    font-size: 0.95rem;
  }
}
</style>
