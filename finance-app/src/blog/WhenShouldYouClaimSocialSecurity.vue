<template>
  <div class="blog-post">
    <!-- Blog Header with Back Link and Social Share -->
    <div class="blog-header">
      <div class="header-left">
        <a href="blog" class="back-link">← Back to Blog</a>
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
      <h1 class="post-title">When Should You Claim Social Security?</h1>
      <h2 class="post-subtitle">A Break-Even Analysis (Age 62 vs 67 vs 70)</h2>
      <p class="post-intro">
        Deciding when to claim Social Security is one of the most important retirement decisions Americans make. 
        Claiming earlier gives you money sooner, but waiting increases your monthly benefit significantly. The trade-off is not always obvious.
      </p>
      <p class="post-intro">
        This guide walks through a data-driven break-even analysis comparing three common claiming ages: 62, 67, and 70. 
        We examine how benefits accumulate over time, when delayed claiming catches up, and which strategy tends to work best under different life expectancy scenarios.
      </p>
    </div>

    <!-- 1️⃣ Executive Summary -->
    <section class="content-section">
      <h2>Executive Summary</h2>
      <p>Many retirees ask a simple question:</p>
      <p class="quote">"Should I claim Social Security early or wait?"</p>
      <p>The answer depends on several factors, but the most common comparison is:</p>
      <ul>
        <li><strong>Age 62 (Early Claiming)</strong> – Lower monthly benefit but more years of payments</li>
        <li><strong>Age 67 (Full Retirement Age)</strong> – Standard benefit with no reductions</li>
        <li><strong>Age 70 (Delayed Claiming)</strong> – Highest monthly benefit due to delayed credits</li>
      </ul>
      <p>Key takeaways from this break-even analysis:</p>
      <ol>
        <li><strong>Claiming at 62 gives immediate cash flow but permanently reduces benefits.</strong> Workers who claim at 62 receive about 30% less per month than if they waited until full retirement age.</li>
        <li><strong>Waiting until 70 increases monthly benefits significantly.</strong> Delaying from 67 to 70 increases benefits by about 8% per year, resulting in roughly 24% higher monthly income.</li>
        <li><strong>Break-even ages typically occur in the late 70s to early 80s.</strong> Those who live longer than this often benefit from delaying.</li>
        <li><strong>Life expectancy is the most important factor.</strong> If you expect to live well into your 80s or 90s, delaying benefits often produces more lifetime income.</li>
        <li><strong>Personal cash flow needs and health considerations matter.</strong> Even if delaying is mathematically optimal, some retirees may prefer early claiming due to health risks, job loss, or retirement income needs.</li>
      </ol>
      <p>Understanding these trade-offs requires examining both monthly benefit levels and cumulative lifetime benefits.</p>
    </section>

    <!-- 2️⃣ Data & Assumptions -->
    <section class="content-section">
      <h2>Data & Assumptions</h2>
      <p>To perform a clear comparison, we use a simplified scenario based on typical Social Security benefit structures.</p>
      
      <h3>Base Assumptions</h3>
      <ul>
        <li><strong>Full Retirement Age (FRA):</strong> 67</li>
        <li><strong>Primary Insurance Amount (PIA):</strong> $2,000/month at FRA</li>
        <li><strong>Claiming ages compared:</strong> 62, 67, and 70</li>
        <li>No inflation adjustments (for simplicity)</li>
        <li>No taxation impacts included</li>
        <li>Benefits assumed constant in real terms</li>
      </ul>

      <h3>Monthly Benefit by Claiming Age</h3>
      <p>Social Security adjusts benefits based on when you claim.</p>
      
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Claim Age</th>
              <th>Monthly Benefit</th>
              <th>Adjustment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>62</td>
              <td>$1,400</td>
              <td>30% reduction</td>
            </tr>
            <tr>
              <td>67</td>
              <td>$2,000</td>
              <td>Full benefit</td>
            </tr>
            <tr>
              <td>70</td>
              <td>$2,480</td>
              <td>24% increase</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <p>These adjustments reflect:</p>
      <ul>
        <li>Early retirement reduction</li>
        <li>Delayed retirement credits (8% per year)</li>
      </ul>

      <h3>Why Break-Even Analysis Matters</h3>
      <p>Early claiming provides more total payments earlier, but delayed claiming provides larger payments later.</p>
      <p>Break-even analysis helps answer:</p>
      <p class="quote">At what age does waiting become financially better?</p>
    </section>

    <!-- 3️⃣ Scenario Comparison Table -->
    <section class="content-section">
      <h2>Scenario Comparison Table</h2>
      <p>The following table compares cumulative lifetime benefits under different claiming ages.</p>
      <p>Assuming benefits begin immediately at each age and remain constant:</p>
      
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Age</th>
              <th>Claim at 62</th>
              <th>Claim at 67</th>
              <th>Claim at 70</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>62</td><td>$16,800</td><td>$0</td><td>$0</td></tr>
            <tr><td>65</td><td>$67,200</td><td>$0</td><td>$0</td></tr>
            <tr><td>67</td><td>$100,800</td><td>$24,000</td><td>$0</td></tr>
            <tr><td>70</td><td>$151,200</td><td>$96,000</td><td>$29,760</td></tr>
            <tr><td>75</td><td>$235,200</td><td>$216,000</td><td>$178,560</td></tr>
            <tr><td>80</td><td>$319,200</td><td>$336,000</td><td>$327,360</td></tr>
            <tr><td>85</td><td>$403,200</td><td>$456,000</td><td>$476,160</td></tr>
            <tr><td>90</td><td>$487,200</td><td>$576,000</td><td>$624,960</td></tr>
          </tbody>
        </table>
      </div>

      <h3>Key Break-Even Points</h3>
      <p>From the data above:</p>
      <ul>
        <li><strong>Age 62 vs 67 break-even:</strong> around 78–79</li>
        <li><strong>Age 67 vs 70 break-even:</strong> around 81–82</li>
        <li><strong>Age 62 vs 70 break-even:</strong> around 80–81</li>
      </ul>
      <p>This means:</p>
      <ul>
        <li>If you live past your early 80s, claiming at 70 usually yields the most lifetime benefits.</li>
        <li>If your life expectancy is shorter, claiming earlier may produce more income overall.</li>
      </ul>
    </section>

    <!-- 4️⃣ Visual Breakdown -->
    <section class="content-section">
      <h2>Visual Breakdown</h2>
      <p>A visual perspective helps illustrate how benefits accumulate.</p>

      <!-- Cumulative Benefits Chart -->
      <div class="chart-section">
        <h3>Cumulative Benefits</h3>
        <div class="chart-container">
          <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet" class="benefits-chart">
            <!-- 坐标轴 -->
            <line x1="50" y1="350" x2="750" y2="350" stroke="#333" stroke-width="2" />
            <line x1="50" y1="350" x2="50" y2="50" stroke="#333" stroke-width="2" />
            
            <!-- Y轴标签 -->
            <text x="30" y="60" text-anchor="end" font-size="12">$700K</text>
            <text x="30" y="135" text-anchor="end" font-size="12">$525K</text>
            <text x="30" y="210" text-anchor="end" font-size="12">$350K</text>
            <text x="30" y="285" text-anchor="end" font-size="12">$175K</text>
            <text x="30" y="360" text-anchor="end" font-size="12">$0</text>
            
            <!-- X轴标签 -->
            <text x="50" y="380" text-anchor="middle" font-size="12">60</text>
            <text x="150" y="380" text-anchor="middle" font-size="12">65</text>
            <text x="250" y="380" text-anchor="middle" font-size="12">70</text>
            <text x="350" y="380" text-anchor="middle" font-size="12">75</text>
            <text x="450" y="380" text-anchor="middle" font-size="12">80</text>
            <text x="550" y="380" text-anchor="middle" font-size="12">85</text>
            <text x="650" y="380" text-anchor="middle" font-size="12">90</text>
            <text x="750" y="380" text-anchor="middle" font-size="12">95</text>
            
            <!-- 网格线（虚线） -->
            <line x1="50" y1="350" x2="750" y2="350" stroke="#ddd" stroke-width="1" stroke-dasharray="5,5" />
            <line x1="50" y1="285" x2="750" y2="285" stroke="#ddd" stroke-width="1" stroke-dasharray="5,5" />
            <line x1="50" y1="210" x2="750" y2="210" stroke="#ddd" stroke-width="1" stroke-dasharray="5,5" />
            <line x1="50" y1="135" x2="750" y2="135" stroke="#ddd" stroke-width="1" stroke-dasharray="5,5" />
            <line x1="50" y1="60" x2="750" y2="60" stroke="#ddd" stroke-width="1" stroke-dasharray="5,5" />
            
            <!-- Age 62 Claim Line (红色) -->
            <polyline points="
              50,350 
              150,350 
              250,350 
              350,275 
              450,200 
              550,120 
              650,40 
              750,-40
            " fill="none" stroke="#e53e3e" stroke-width="3" stroke-dasharray="5,3" />
            
            <!-- Age 67 Claim Line (蓝色) -->
            <polyline points="
              50,350 
              150,350 
              250,350 
              350,285 
              450,185 
              550,85 
              650,-15 
              750,-115
            " fill="none" stroke="#3182ce" stroke-width="3" stroke-dasharray="3,3" />
            
            <!-- Age 70 Claim Line (绿色) -->
            <polyline points="
              50,350 
              150,350 
              250,370 
              350,245 
              450,120 
              550,-5 
              650,-130 
              750,-255
            " fill="none" stroke="#38a169" stroke-width="3" />
            
            <!-- 图例 -->
            <g transform="translate(500, 40)">
              <line x1="0" y1="0" x2="40" y2="0" stroke="#e53e3e" stroke-width="3" stroke-dasharray="5,3" />
              <text x="50" y="5" font-size="12">Claim at 62</text>
            </g>
            <g transform="translate(500, 65)">
              <line x1="0" y1="0" x2="40" y2="0" stroke="#3182ce" stroke-width="3" stroke-dasharray="3,3" />
              <text x="50" y="5" font-size="12">Claim at 67</text>
            </g>
            <g transform="translate(500, 90)">
              <line x1="0" y1="0" x2="40" y2="0" stroke="#38a169" stroke-width="3" />
              <text x="50" y="5" font-size="12">Claim at 70</text>
            </g>
            
            <!-- 盈亏平衡点标记 -->
            <circle cx="425" cy="190" r="6" fill="none" stroke="#000" stroke-width="2" />
            <text x="435" y="170" font-size="11" fill="#000">~80 break-even</text>
          </svg>
        </div>
      </div>

      <h3>Early Claiming (Age 62)</h3>
      <ul>
        <li>Immediate income</li>
        <li>Lower monthly payments</li>
        <li>Higher cumulative income early in retirement</li>
      </ul>
      <p>Benefit pattern:</p>
      <p class="indent">Early advantage → declines relative to delayed strategies over time</p>

      <h3>Full Retirement Age (67)</h3>
      <ul>
        <li>Balanced approach</li>
        <li>No penalty or delayed credits</li>
        <li>Moderate monthly income</li>
      </ul>
      <p>Benefit pattern:</p>
      <p class="indent">Lower early payments than age 62<br>But higher long-term value</p>

      <h3>Delayed Claiming (Age 70)</h3>
      <ul>
        <li>Highest monthly benefit</li>
        <li>Requires waiting longer</li>
        <li>Eventually surpasses other strategies</li>
      </ul>
      <p>Benefit pattern:</p>
      <p class="indent">Lowest early income<br>Highest lifetime income if longevity is high</p>

      <h3>Conceptual Break-Even Curve</h3>
      <div class="conceptual-curve">
        <pre>
Cumulative Benefits
^
|                 Claim 70
|                /
|               /
|      Claim 67
|             /
|            /
| Claim 62
|---------/-----------------> Age
        ~80 break-even
        </pre>
      </div>
      <p>This illustrates the classic retirement trade-off: early access vs long-term income security.</p>
    </section>

    <!-- 5️⃣ Interpretation -->
    <section class="content-section">
      <h2>Interpretation</h2>
      <p>While the break-even math is useful, real-world retirement planning requires considering several additional factors.</p>

      <h3>Life Expectancy</h3>
      <p>The longer you expect to live, the more attractive delayed claiming becomes.</p>
      <p>Average life expectancy:</p>
      <ul>
        <li>Men at 65: ~84</li>
        <li>Women at 65: ~87</li>
      </ul>
      <p>Because many retirees live into their mid-80s or beyond, delayed claiming often produces higher lifetime income.</p>
      <p>However, personal health and family longevity are important considerations.</p>

      <h3>Spousal Benefits</h3>
      <p>For married couples, claiming strategies become more complex.</p>
      <p>Higher earners delaying benefits can increase:</p>
      <ul>
        <li>Survivor benefits</li>
        <li>Household lifetime income</li>
      </ul>
      <p>In many cases, the higher-earning spouse benefits most from delaying to age 70.</p>

      <h3>Longevity Insurance</h3>
      <p>Another way to think about delayed claiming is longevity insurance.</p>
      <p>Waiting increases guaranteed income later in life, when retirees may face:</p>
      <ul>
        <li>Rising healthcare costs</li>
        <li>Market downturns</li>
        <li>Depleted savings</li>
      </ul>
      <p>This makes Social Security one of the most valuable inflation-adjusted lifetime income sources available.</p>

      <h3>Opportunity Cost</h3>
      <p>Some retirees argue that claiming early allows them to invest benefits.</p>
      <p>However, this strategy must outperform the 8% annual delayed retirement credit, which is difficult to guarantee with low-risk investments.</p>

      <h3>Tax Considerations</h3>
      <p>Social Security benefits can be taxable depending on total retirement income.</p>
      <p>Claiming later may:</p>
      <ul>
        <li>Increase monthly income</li>
        <li>Potentially increase taxable benefits</li>
      </ul>
      <p>Proper retirement planning should consider tax brackets, withdrawals, and other income sources.</p>

      <h3>Final Thoughts</h3>
      <p>The question "When should you claim Social Security?" does not have a universal answer.</p>
      <p>However, break-even analysis reveals several clear patterns:</p>
      <ul>
        <li><strong>Age 62</strong> provides early cash flow but permanently reduces benefits.</li>
        <li><strong>Age 67</strong> offers a balanced middle ground.</li>
        <li><strong>Age 70</strong> maximizes monthly income and often produces the highest lifetime benefits for long-lived retirees.</li>
      </ul>
      <p>For individuals who expect to live into their 80s or beyond, delaying benefits can significantly increase lifetime retirement income.</p>
      <p>Ultimately, the optimal claiming strategy depends on:</p>
      <ul>
        <li>Health and life expectancy</li>
        <li>Retirement savings</li>
        <li>Income needs</li>
        <li>Spousal benefits</li>
        <li>Risk tolerance</li>
      </ul>
      <p>Understanding these trade-offs allows retirees to make informed decisions that align with their long-term financial goals.</p>
    </section>

    <!-- Explore Social Security Calculator 按钮 -->
    <div class="calculator-button-container">
      <a href="/social-security" class="calculator-button">Explore Social Security Calculator →</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialSecurityBlogPost',
  methods: {
    shareOnLinkedIn() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    },
    shareOnX() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('When Should You Claim Social Security? A Break-Even Analysis');
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    },
    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }
  },
  mounted() {
    document.title = 'When Should You Claim Social Security?'
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
  margin-bottom: 48px;
}

.post-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0b2b44;
  margin: 0 0 8px 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.post-subtitle {
  font-size: 1.5rem;
  font-weight: 400;
  color: #2c5282;
  margin: 0 0 24px 0;
  line-height: 1.3;
}

.post-intro {
  font-size: 1.1rem;
  color: #2d3e50;
  margin: 16px 0;
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

.quote {
  font-style: italic;
  padding: 8px 20px;
  background: #f7fafc;
  border-left: 4px solid #2c5282;
  margin: 16px 0;
  font-size: 1.1rem;
  color: #1e3a5f;
}

.indent {
  padding-left: 24px;
  margin: 8px 0;
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

/* 图表区域 */
.chart-section {
  margin: 32px 0;
  padding: 24px;
  background: #f8fafc;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.chart-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 20px 0;
}

.benefits-chart {
  width: 100%;
  min-width: 600px;
  height: auto;
  max-height: 450px;
}

/* 概念曲线 */
.conceptual-curve {
  background: #f7fafc;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin: 24px 0;
  overflow-x: auto;
}

.conceptual-curve pre {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #1e3a5f;
  margin: 0;
  white-space: pre;
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
  
  .post-title {
    font-size: 2rem;
  }
  
  .post-subtitle {
    font-size: 1.2rem;
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
