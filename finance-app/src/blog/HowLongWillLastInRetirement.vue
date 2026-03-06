<template>
  <div class="blog-post">
    <!-- ← Back to Blog 链接 -->
    <div class="blog-header">
      <a href="/blog" class="back-link">← Back to Blog</a>
    </div>

    <!-- 博客标题区域 -->
    <div class="post-header">
      <h1 class="post-title">How Long Will $500,000 Last in Retirement? Scenario Analysis</h1>
    </div>

    <!-- Executive Summary -->
    <section class="content-section">
      <h2>Executive Summary</h2>
      <p>One of the most common questions people ask when planning retirement is simple but critical: How long will my savings last? For many households approaching retirement, $500,000 represents a realistic amount of accumulated savings in retirement accounts such as a 401(k), IRA, or pension rollover. However, the sustainability of this amount depends heavily on several factors including withdrawal rate, investment returns, inflation, and life expectancy.</p>
      <p>This article performs a scenario analysis to estimate how long a $500,000 retirement portfolio may last under different spending strategies and market return assumptions. Rather than presenting a single answer, we compare multiple realistic scenarios that retirees often face.</p>
      <p>Key insights from the analysis include:</p>
      <ul>
        <li><strong>A 4% withdrawal strategy</strong> may allow $500,000 to last 30 years or more under moderate market conditions.</li>
        <li><strong>Higher withdrawal rates such as 6–8%</strong> dramatically shorten portfolio longevity, often reducing sustainability to 15–20 years.</li>
        <li><strong>Even small differences in investment returns</strong> (3% vs 6%) can add or remove 10+ years of retirement sustainability.</li>
        <li><strong>Inflation plays a critical role;</strong> retirees who do not adjust spending for inflation may underestimate future expenses.</li>
      </ul>
      <p>The results show that retirement success is less about a single number and more about managing withdrawal strategy and risk. Through structured comparisons, retirees can better understand how spending decisions today affect financial stability decades into the future.</p>
    </section>

    <!-- Data & Assumptions -->
    <section class="content-section">
      <h2>Data & Assumptions</h2>
      <p>To build realistic retirement projections, we use a simplified financial model that reflects typical retirement planning assumptions used by financial planners.</p>
      
      <h3>Starting Retirement Portfolio</h3>
      <p>Initial savings:</p>
      <p class="highlight">$500,000</p>
      <p>This amount may represent combined retirement savings from:</p>
      <ul>
        <li>401(k)</li>
        <li>Traditional IRA</li>
        <li>Roth IRA</li>
        <li>Brokerage retirement investments</li>
        <li>Pension lump-sum rollovers</li>
      </ul>

      <h3>Withdrawal Strategies</h3>
      <p>We test four common withdrawal strategies:</p>
      
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Withdrawal Rate</th>
              <th>Annual Withdrawal</th>
              <th>Monthly Income</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>3%</td>
              <td>$15,000</td>
              <td>$1,250</td>
            </tr>
            <tr>
              <td>4%</td>
              <td>$20,000</td>
              <td>$1,667</td>
            </tr>
            <tr>
              <td>5%</td>
              <td>$25,000</td>
              <td>$2,083</td>
            </tr>
            <tr>
              <td>6%</td>
              <td>$30,000</td>
              <td>$2,500</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <p>The 4% rule is widely known in retirement planning. It originated from the Trinity Study, which suggested retirees withdrawing around 4% annually could sustain portfolios for roughly 30 years under historical market conditions.</p>
      <p>However, modern markets and longer life expectancies make it important to test other scenarios.</p>

      <h3>Investment Return Assumptions</h3>
      <p>Retirement portfolios typically contain a mix of stocks and bonds. Depending on asset allocation and market conditions, average annual returns may vary significantly.</p>
      <p>We test three realistic return environments:</p>
      
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Market Scenario</th>
              <th>Annual Return</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Conservative</td>
              <td>3%</td>
            </tr>
            <tr>
              <td>Moderate</td>
              <td>5%</td>
            </tr>
            <tr>
              <td>Growth</td>
              <td>7%</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <p>These returns are after fees but before inflation adjustments.</p>

      <h3>Inflation Assumptions</h3>
      <p>Inflation reduces purchasing power over time. Historical US inflation averages around 2–3% annually, though periods of higher inflation can occur.</p>
      <p>For this analysis we assume:</p>
      <p class="indent">Average inflation: 2.5% annually</p>
      <p class="indent">Withdrawals are assumed to increase each year to maintain the same real purchasing power.</p>

      <h3>Retirement Horizon</h3>
      <p>Typical retirement horizons include:</p>
      <ul>
        <li>Early retirement: 40 years</li>
        <li>Standard retirement: 30 years</li>
        <li>Late retirement: 20 years</li>
      </ul>
      <p>Our model evaluates how long the portfolio lasts before reaching $0 under each scenario.</p>
    </section>

    <!-- Scenario Comparison Table -->
    <section class="content-section">
      <h2>Scenario Comparison Table</h2>
      <p>The following table summarizes how long a $500,000 portfolio lasts across different withdrawal rates and investment return assumptions.</p>
      
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Withdrawal Rate</th>
              <th>Annual Return</th>
              <th>Portfolio Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>3%</td><td>3%</td><td>40+ years</td></tr>
            <tr><td>3%</td><td>5%</td><td>50+ years</td></tr>
            <tr><td>3%</td><td>7%</td><td>Potentially indefinite</td></tr>
            <tr><td>4%</td><td>3%</td><td>~27 years</td></tr>
            <tr><td>4%</td><td>5%</td><td>~33 years</td></tr>
            <tr><td>4%</td><td>7%</td><td>40+ years</td></tr>
            <tr><td>5%</td><td>3%</td><td>~21 years</td></tr>
            <tr><td>5%</td><td>5%</td><td>~27 years</td></tr>
            <tr><td>5%</td><td>7%</td><td>~33 years</td></tr>
            <tr><td>6%</td><td>3%</td><td>~17 years</td></tr>
            <tr><td>6%</td><td>5%</td><td>~22 years</td></tr>
            <tr><td>6%</td><td>7%</td><td>~28 years</td></tr>
          </tbody>
        </table>
      </div>

      <h3>Key Observations</h3>
      <ol>
        <li><strong>Small changes in withdrawal rates have large impacts</strong><br>Increasing withdrawals from 4% to 6% reduces sustainability by roughly 10 years in most scenarios.</li>
        <li><strong>Investment returns dramatically influence outcomes</strong><br>A difference between 3% and 7% returns can extend portfolio longevity by more than 15 years.</li>
        <li><strong>Lower withdrawal rates provide significant safety</strong><br>A conservative 3% withdrawal rate may allow $500,000 to last indefinitely under moderate market conditions.</li>
      </ol>
    </section>

    <!-- Visual Breakdown -->
    <section class="content-section">
      <h2>Visual Breakdown</h2>
      <p>To better understand these scenarios, imagine the retirement portfolio declining over time based on different withdrawal strategies.</p>

      <!-- 图表: 组合价值随时间变化 -->
      <div class="chart-section">
        <h3>Portfolio Decline Over Time</h3>
        <div class="chart-container">
          <svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet" class="portfolio-chart">
            <!-- 坐标轴 -->
            <line x1="50" y1="350" x2="750" y2="350" stroke="#333" stroke-width="2" />
            <line x1="50" y1="350" x2="50" y2="50" stroke="#333" stroke-width="2" />
            
            <!-- Y轴标签 -->
            <text x="30" y="60" text-anchor="end" font-size="12">$500K</text>
            <text x="30" y="135" text-anchor="end" font-size="12">$375K</text>
            <text x="30" y="210" text-anchor="end" font-size="12">$250K</text>
            <text x="30" y="285" text-anchor="end" font-size="12">$125K</text>
            <text x="30" y="360" text-anchor="end" font-size="12">$0</text>
            
            <!-- X轴标签 -->
            <text x="50" y="380" text-anchor="middle" font-size="12">0</text>
            <text x="190" y="380" text-anchor="middle" font-size="12">10</text>
            <text x="330" y="380" text-anchor="middle" font-size="12">20</text>
            <text x="470" y="380" text-anchor="middle" font-size="12">30</text>
            <text x="610" y="380" text-anchor="middle" font-size="12">40</text>
            <text x="750" y="380" text-anchor="middle" font-size="12">50</text>
            
            <!-- 网格线（虚线） -->
            <line x1="50" y1="350" x2="750" y2="350" stroke="#ddd" stroke-width="1" stroke-dasharray="5,5" />
            <line x1="50" y1="285" x2="750" y2="285" stroke="#ddd" stroke-width="1" stroke-dasharray="5,5" />
            <line x1="50" y1="210" x2="750" y2="210" stroke="#ddd" stroke-width="1" stroke-dasharray="5,5" />
            <line x1="50" y1="135" x2="750" y2="135" stroke="#ddd" stroke-width="1" stroke-dasharray="5,5" />
            <line x1="50" y1="60" x2="750" y2="60" stroke="#ddd" stroke-width="1" stroke-dasharray="5,5" />
            
            <!-- 垂直网格线 -->
            <line x1="190" y1="50" x2="190" y2="350" stroke="#ddd" stroke-width="1" stroke-dasharray="5,5" />
            <line x1="330" y1="50" x2="330" y2="350" stroke="#ddd" stroke-width="1" stroke-dasharray="5,5" />
            <line x1="470" y1="50" x2="470" y2="350" stroke="#ddd" stroke-width="1" stroke-dasharray="5,5" />
            <line x1="610" y1="50" x2="610" y2="350" stroke="#ddd" stroke-width="1" stroke-dasharray="5,5" />
            
            <!-- Conservative Strategy (3%) - 绿色 -->
            <polyline points="
              50,60 
              190,80 
              330,100 
              470,120 
              610,140 
              750,160
            " fill="none" stroke="#38a169" stroke-width="3" />
            
            <!-- Balanced Strategy (4%) - 蓝色 -->
            <polyline points="
              50,60 
              190,100 
              330,200 
              470,310 
              610,420
            " fill="none" stroke="#3182ce" stroke-width="3" stroke-dasharray="5,3" />
            
            <!-- Aggressive Withdrawal (6%) - 红色 -->
            <polyline points="
              50,60 
              190,140 
             330,250 
             470,400 
             550,500
            " fill="none" stroke="#e53e3e" stroke-width="3" stroke-dasharray="3,3" />
            
            <!-- 图例 -->
            <g transform="translate(500, 40)">
              <line x1="0" y1="0" x2="40" y2="0" stroke="#38a169" stroke-width="3" />
              <text x="50" y="5" font-size="12">Conservative (3% withdrawal)</text>
            </g>
            <g transform="translate(500, 65)">
              <line x1="0" y1="0" x2="40" y2="0" stroke="#3182ce" stroke-width="3" stroke-dasharray="5,3" />
              <text x="50" y="5" font-size="12">Balanced (4% withdrawal)</text>
            </g>
            <g transform="translate(500, 90)">
              <line x1="0" y1="0" x2="40" y2="0" stroke="#e53e3e" stroke-width="3" stroke-dasharray="3,3" />
              <text x="50" y="5" font-size="12">Aggressive (6% withdrawal)</text>
            </g>
          </svg>
        </div>
        <p class="chart-note">* Assumes 5% annual return, 2.5% inflation adjustment</p>
      </div>

      <h3>Conservative Strategy (3%)</h3>
      <ul>
        <li>Slow portfolio decline</li>
        <li>High probability of sustaining retirement</li>
        <li>Significant buffer for market downturns</li>
      </ul>
      <p>Example timeline:</p>
      
      <div class="table-responsive">
        <table class="data-table small-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Portfolio Value</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Start</td><td>$500,000</td></tr>
            <tr><td>10</td><td>$470,000</td></tr>
            <tr><td>20</td><td>$440,000</td></tr>
            <tr><td>30</td><td>$410,000</td></tr>
            <tr><td>40</td><td>$380,000</td></tr>
          </tbody>
        </table>
      </div>
      <p>In many moderate return environments, the portfolio may never fully deplete.</p>

      <h3>Balanced Strategy (4%)</h3>
      <p>The traditional retirement planning approach.</p>
      <p>Example trajectory:</p>
      
      <div class="table-responsive">
        <table class="data-table small-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Portfolio Value</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Start</td><td>$500,000</td></tr>
            <tr><td>10</td><td>$420,000</td></tr>
            <tr><td>20</td><td>$300,000</td></tr>
            <tr><td>30</td><td>$120,000</td></tr>
            <tr><td>33</td><td>$0</td></tr>
          </tbody>
        </table>
      </div>
      <p>This scenario generally supports a 30-year retirement horizon.</p>

      <h3>Aggressive Withdrawal (6%)</h3>
      <p>Higher withdrawals increase lifestyle flexibility early in retirement but significantly increase risk.</p>
      <p>Example path:</p>
      
      <div class="table-responsive">
        <table class="data-table small-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Portfolio Value</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Start</td><td>$500,000</td></tr>
            <tr><td>10</td><td>$310,000</td></tr>
            <tr><td>15</td><td>$180,000</td></tr>
            <tr><td>20</td><td>$60,000</td></tr>
            <tr><td>22</td><td>$0</td></tr>
          </tbody>
        </table>
      </div>
      <p>Retirees relying on higher withdrawals may face longevity risk if they live longer than expected.</p>
    </section>

    <!-- Interpretation -->
    <section class="content-section">
      <h2>Interpretation</h2>
      <p>The results of this analysis highlight several important retirement planning principles.</p>

      <h3>1. Retirement Sustainability Depends on Spending Discipline</h3>
      <p>The most controllable factor in retirement planning is spending behavior. Even a relatively small portfolio such as $500,000 can last decades if withdrawals remain conservative.</p>
      <p>Many retirees underestimate how much small spending adjustments affect long-term financial stability.</p>
      <p>For example:</p>
      <ul>
        <li>Reducing withdrawals from 5% to 4% may extend retirement savings by 5–10 years.</li>
      </ul>

      <h3>2. Market Returns Create Uncertainty</h3>
      <p>Investment markets are unpredictable. While historical averages provide useful benchmarks, real-world outcomes vary.</p>
      <p>A retiree experiencing poor returns in the early years of retirement may see portfolios decline faster due to a phenomenon called sequence of returns risk.</p>
      <p>To manage this risk:</p>
      <ul>
        <li>Maintain diversified portfolios</li>
        <li>Reduce withdrawals during downturns</li>
        <li>Hold some assets in stable income investments</li>
      </ul>

      <h3>3. Social Security and Other Income Sources Matter</h3>
      <p>Many retirees do not rely solely on savings. Other income streams may include:</p>
      <ul>
        <li>Social Security</li>
        <li>Pensions</li>
        <li>Rental income</li>
        <li>Part-time work</li>
      </ul>
      <p>These additional income sources reduce pressure on retirement savings, allowing portfolios to last longer.</p>
      <p>For example, if Social Security provides $2,000 per month, a retiree withdrawing only $10,000 annually from savings may extend portfolio longevity dramatically.</p>

      <h3>4. Longevity Risk Is Increasing</h3>
      <p>Average life expectancy continues to increase, especially for higher-income households.</p>
      <p>Many retirees should plan for retirement durations of:</p>
      <ul>
        <li>30–35 years</li>
        <li>Potentially 40 years for early retirement</li>
      </ul>
      <p>This makes conservative withdrawal strategies more important than ever.</p>

      <h3>5. Flexibility Is the Best Retirement Strategy</h3>
      <p>Rather than following a fixed rule, successful retirees often adopt flexible withdrawal strategies, adjusting spending based on market conditions and portfolio performance.</p>
      <p>Examples include:</p>
      <ul>
        <li>Reducing spending during market downturns</li>
        <li>Increasing withdrawals during strong market years</li>
        <li>Delaying large discretionary expenses</li>
      </ul>
      <p>This dynamic approach improves the chances of retirement success.</p>

      <h3>Final Thoughts</h3>
      <p>A $500,000 retirement portfolio can last anywhere from 15 years to over 40 years, depending on withdrawal strategy, investment returns, and spending discipline.</p>
      <p>Key takeaways:</p>
      <ul>
        <li><strong>4% withdrawals remain a reasonable starting point</strong></li>
        <li><strong>Lower withdrawal rates significantly increase retirement safety</strong></li>
        <li><strong>Investment returns and inflation heavily influence long-term outcomes</strong></li>
        <li><strong>Flexible spending strategies improve sustainability</strong></li>
      </ul>
      <p>Retirement planning is ultimately about balancing financial security, lifestyle goals, and longevity risk.</p>
      <p>Understanding how long savings may last under different scenarios allows retirees to make informed decisions and build a retirement strategy that aligns with their long-term financial goals.</p>
    </section>

    <!-- Explore retirement Calculator 按钮 -->
    <div class="calculator-button-container">
      <a href="/retirement" class="calculator-button">Explore retirement Calculator →</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RetirementBlogPost'
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

/* ← Back to Blog 链接 */
.blog-header {
  margin-bottom: 32px;
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

/* 博客标题区域 */
.post-header {
  margin-bottom: 40px;
}

.post-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0b2b44;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

@media (max-width: 480px) {
  .post-title {
    font-size: 2rem;
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

.highlight {
  font-size: 1.8rem;
  font-weight: 700;
  color: #0b2b44;
  background: #ecf3fa;
  padding: 8px 16px;
  border-radius: 8px;
  display: inline-block;
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

.data-table.small-table {
  min-width: 300px;
  max-width: 400px;
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

.chart-section h3 {
  margin-top: 0;
}

.chart-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 20px 0;
}

.portfolio-chart {
  width: 100%;
  min-width: 600px;
  height: auto;
  max-height: 450px;
}

.chart-note {
  font-size: 0.9rem;
  color: #718096;
  text-align: center;
  margin: 16px 0 0;
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
  
  .highlight {
    font-size: 1.5rem;
  }
}
</style>