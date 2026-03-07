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
      <h1 class="post-title">VAT vs GST vs Sales Tax: A Global Comparison Table (150+ Countries & Regions)</h1>
      <p class="post-intro">
        Consumption taxes are one of the largest sources of government revenue worldwide, yet the system varies significantly between countries. Businesses selling internationally must navigate three major consumption tax systems:
      </p>
      <ul class="intro-list">
        <li>VAT (Value-Added Tax)</li>
        <li>GST (Goods and Services Tax)</li>
        <li>Sales Tax</li>
      </ul>
      <p class="post-intro">
        While these systems appear similar—taxing goods and services consumed by individuals—the collection mechanisms, thresholds, and compliance rules differ significantly.
      </p>
      <p class="post-intro">
        Today, over 176 countries operate VAT or GST systems, while a smaller group—most notably the United States—relies on retail sales taxes instead.
      </p>
      <p class="post-intro">
        This guide provides:
      </p>
      <ul class="intro-list">
        <li>A global comparison of VAT, GST, and Sales Tax systems</li>
        <li>Country-level tax rates</li>
        <li>Registration thresholds</li>
        <li>Taxable goods and services</li>
        <li>A global comparison table covering 150+ countries</li>
      </ul>
    </div>

    <!-- 1. Executive Summary -->
    <section class="content-section">
      <h2>1. Executive Summary</h2>
      <p>Global consumption taxes generally fall into three categories:</p>
      
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Tax System</th>
              <th>Countries Using It</th>
              <th>Key Feature</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>VAT</td>
              <td>EU, UK, most of Africa, Latin America</td>
              <td>Multi-stage tax applied throughout the supply chain</td>
            </tr>
            <tr>
              <td>GST</td>
              <td>Canada, Australia, India, Singapore, New Zealand</td>
              <td>Similar to VAT but sometimes unified nationally</td>
            </tr>
            <tr>
              <td>Sales Tax</td>
              <td>United States and a few others</td>
              <td>Collected only at the final retail stage</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p><strong>Key global insights</strong></p>
      <ul>
        <li>176 countries use VAT or GST systems worldwide.</li>
        <li>The average VAT rate among OECD countries is ~19%.</li>
        <li>Hungary currently has the highest standard VAT rate (27%).</li>
        <li>Essential goods such as food, medicine, and books often receive reduced or zero VAT rates.</li>
        <li>Many countries have registration thresholds, meaning businesses must register for VAT/GST only after reaching a certain revenue level.</li>
      </ul>
    </section>

    <!-- 2. Understanding the Three Major Systems -->
    <section class="content-section">
      <h2>2. Understanding the Three Major Systems</h2>
      
      <h3>VAT (Value-Added Tax)</h3>
      <p>VAT is a multi-stage consumption tax applied at each stage of the supply chain.</p>
      <p>Businesses charge VAT on sales but can deduct VAT paid on inputs, meaning the tax burden ultimately falls on the final consumer.</p>
      
      <p><strong>Example</strong></p>
      <p class="indent">Manufacturer → Wholesaler → Retailer → Consumer</p>
      <p>Each stage pays tax only on the value added.</p>
      
      <p><strong>Countries using VAT</strong></p>
      <ul>
        <li>European Union</li>
        <li>United Kingdom</li>
        <li>Brazil</li>
        <li>South Africa</li>
        <li>Turkey</li>
        <li>Mexico</li>
        <li>Most African and Latin American countries</li>
      </ul>
      
      <p><strong>Typical VAT rates:</strong></p>
      <div class="table-responsive">
        <table class="data-table small-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>Standard VAT</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Hungary</td><td>27%</td></tr>
            <tr><td>France</td><td>20%</td></tr>
            <tr><td>Germany</td><td>19%</td></tr>
            <tr><td>Italy</td><td>22%</td></tr>
            <tr><td>UK</td><td>20%</td></tr>
            <tr><td>South Africa</td><td>15%</td></tr>
          </tbody>
        </table>
      </div>

      <h3>GST (Goods and Services Tax)</h3>
      <p>GST is conceptually similar to VAT but often implemented as a single nationwide tax system.</p>
      
      <p><strong>Common GST countries:</strong></p>
      <div class="table-responsive">
        <table class="data-table small-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>GST Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Australia</td><td>10%</td></tr>
            <tr><td>Singapore</td><td>9%</td></tr>
            <tr><td>Canada</td><td>5% federal GST (+ provincial taxes)</td></tr>
            <tr><td>New Zealand</td><td>15%</td></tr>
            <tr><td>India</td><td>5%–28% multi-tier structure</td></tr>
          </tbody>
        </table>
      </div>
      <p>India uses a multi-rate GST system, with the most common rate around 18%.</p>

      <h3>Sales Tax</h3>
      <p>Sales tax is different because it applies only at the point of retail sale.</p>
      <p>The best-known example is the United States, which does not have a federal VAT system.</p>
      
      <p><strong>Instead:</strong></p>
      <ul>
        <li>Each state sets its own tax</li>
        <li>Rates vary widely</li>
        <li>Some states have no sales tax</li>
      </ul>
      
      <p><strong>Examples:</strong></p>
      <div class="table-responsive">
        <table class="data-table small-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Sales Tax</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>California</td><td>~7.25% + local</td></tr>
            <tr><td>New York</td><td>~8.875%</td></tr>
            <tr><td>Texas</td><td>~6.25%</td></tr>
            <tr><td>Oregon</td><td>0%</td></tr>
            <tr><td>Delaware</td><td>0%</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 3. Global VAT / GST / Sales Tax Comparison Table -->
    <section class="content-section">
      <h2>3. Global VAT / GST / Sales Tax Comparison Table</h2>
      <p>Below is a simplified comparison of major tax systems by region.</p>
      
      <h3>Europe (VAT Dominant)</h3>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>Tax Type</th>
              <th>Standard Rate</th>
              <th>Threshold</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Germany</td><td>VAT</td><td>19%</td><td>€22,000</td></tr>
            <tr><td>France</td><td>VAT</td><td>20%</td><td>€85,800</td></tr>
            <tr><td>Italy</td><td>VAT</td><td>22%</td><td>€85,000</td></tr>
            <tr><td>Spain</td><td>VAT</td><td>21%</td><td>€85,000</td></tr>
            <tr><td>Netherlands</td><td>VAT</td><td>21%</td><td>€20,000</td></tr>
            <tr><td>Sweden</td><td>VAT</td><td>25%</td><td>SEK 80,000</td></tr>
            <tr><td>Poland</td><td>VAT</td><td>23%</td><td>PLN 200,000</td></tr>
            <tr><td>Portugal</td><td>VAT</td><td>23%</td><td>€12,500</td></tr>
            <tr><td>Ireland</td><td>VAT</td><td>23%</td><td>€75,000</td></tr>
            <tr><td>Greece</td><td>VAT</td><td>24%</td><td>€10,000</td></tr>
          </tbody>
        </table>
      </div>
      <p>EU countries must maintain VAT rates above 15% by law.</p>
    </section>

    <!-- 4. Asia-Pacific VAT / GST Systems -->
    <section class="content-section">
      <h2>4. Asia-Pacific VAT / GST Systems</h2>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>Tax Type</th>
              <th>Rate</th>
              <th>Registration Threshold</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Japan</td><td>Consumption Tax</td><td>10%</td><td>JPY 10M</td></tr>
            <tr><td>China</td><td>VAT</td><td>13%</td><td>CNY 5M</td></tr>
            <tr><td>India</td><td>GST</td><td>5-28%</td><td>₹4M</td></tr>
            <tr><td>Singapore</td><td>GST</td><td>9%</td><td>SGD 1M</td></tr>
            <tr><td>Australia</td><td>GST</td><td>10%</td><td>AUD 75k</td></tr>
            <tr><td>New Zealand</td><td>GST</td><td>15%</td><td>NZD 60k</td></tr>
            <tr><td>Indonesia</td><td>VAT</td><td>12%</td><td>IDR 4.8B</td></tr>
            <tr><td>Malaysia</td><td>SST</td><td>5-10%</td><td>MYR 500k</td></tr>
            <tr><td>Thailand</td><td>VAT</td><td>7%</td><td>THB 1.8M</td></tr>
          </tbody>
        </table>
      </div>
      <p>Australia’s GST registration threshold is AUD 75,000 annual revenue.</p>
    </section>

    <!-- 5. Americas Tax Systems -->
    <section class="content-section">
      <h2>5. Americas Tax Systems</h2>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>Tax System</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Canada</td><td>GST + PST/HST</td><td>5-15%</td></tr>
            <tr><td>Mexico</td><td>VAT</td><td>16%</td></tr>
            <tr><td>Brazil</td><td>VAT-like ICMS</td><td>17-22%</td></tr>
            <tr><td>Argentina</td><td>VAT</td><td>21%</td></tr>
            <tr><td>Chile</td><td>VAT</td><td>19%</td></tr>
            <tr><td>Peru</td><td>VAT</td><td>18%</td></tr>
            <tr><td>Colombia</td><td>VAT</td><td>19%</td></tr>
            <tr><td>United States</td><td>Sales Tax</td><td>0-10%</td></tr>
          </tbody>
        </table>
      </div>
      <p>Canada combines federal GST with provincial sales taxes, producing rates up to 15% in some provinces.</p>
    </section>

    <!-- 6. Middle East VAT Systems -->
    <section class="content-section">
      <h2>6. Middle East VAT Systems</h2>
      <p>VAT is relatively new in the Gulf region.</p>
      <div class="table-responsive">
        <table class="data-table small-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>VAT Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>UAE</td><td>5%</td></tr>
            <tr><td>Saudi Arabia</td><td>15%</td></tr>
            <tr><td>Bahrain</td><td>10%</td></tr>
            <tr><td>Oman</td><td>5%</td></tr>
            <tr><td>Israel</td><td>18%</td></tr>
          </tbody>
        </table>
      </div>
      <p>Many Gulf countries introduced VAT after 2018 to diversify government revenue.</p>
    </section>

    <!-- 7. Africa VAT Systems -->
    <section class="content-section">
      <h2>7. Africa VAT Systems</h2>
      <div class="table-responsive">
        <table class="data-table small-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>VAT Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>South Africa</td><td>15%</td></tr>
            <tr><td>Nigeria</td><td>7.5%</td></tr>
            <tr><td>Kenya</td><td>16%</td></tr>
            <tr><td>Egypt</td><td>14%</td></tr>
            <tr><td>Morocco</td><td>20%</td></tr>
            <tr><td>Ghana</td><td>15%</td></tr>
            <tr><td>Tanzania</td><td>18%</td></tr>
          </tbody>
        </table>
      </div>
      <p>Many African countries rely heavily on VAT due to its efficient revenue collection.</p>
    </section>

    <!-- 8. Registration Thresholds Around the World -->
    <section class="content-section">
      <h2>8. Registration Thresholds Around the World</h2>
      <p>Many countries require businesses to register for VAT/GST only after reaching certain sales levels.</p>
      
      <p><strong>Examples:</strong></p>
      <div class="table-responsive">
        <table class="data-table small-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>Threshold</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Australia</td><td>AUD 75,000</td></tr>
            <tr><td>Canada</td><td>CAD 30,000</td></tr>
            <tr><td>Japan</td><td>JPY 10,000,000</td></tr>
            <tr><td>Malaysia</td><td>MYR 500,000</td></tr>
            <tr><td>Norway</td><td>NOK 50,000</td></tr>
            <tr><td>New Zealand</td><td>NZD 60,000</td></tr>
          </tbody>
        </table>
      </div>
      <p>Some countries have zero thresholds for foreign sellers, meaning tax applies from the first sale.</p>
    </section>

    <!-- 9. Taxable Goods and Services -->
    <section class="content-section">
      <h2>9. Taxable Goods and Services</h2>
      <p>Most VAT/GST systems apply to nearly all goods and services, but essential products often receive reduced rates.</p>
      
      <p><strong>Common reduced categories:</strong></p>
      <ul>
        <li>Food staples</li>
        <li>Medicine</li>
        <li>Healthcare</li>
        <li>Books</li>
        <li>Children's clothing</li>
      </ul>
      
      <p>For example:</p>
      <p class="indent">Spain applies 4% VAT to essential foods, while other foods receive 10%.</p>
    </section>

    <!-- 10. Digital Services and SaaS Taxes -->
    <section class="content-section">
      <h2>10. Digital Services and SaaS Taxes</h2>
      <p>A major change in global tax policy is the expansion of VAT/GST to digital services, including:</p>
      <ul>
        <li>SaaS platforms</li>
        <li>Streaming services</li>
        <li>Online advertising</li>
        <li>Mobile apps</li>
        <li>Digital downloads</li>
      </ul>
      
      <p>Many countries now require foreign digital companies to register and collect VAT.</p>
      
      <p><strong>Examples:</strong></p>
      <div class="table-responsive">
        <table class="data-table small-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>Digital VAT</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>EU</td><td>17-27%</td></tr>
            <tr><td>UK</td><td>20%</td></tr>
            <tr><td>Australia</td><td>10%</td></tr>
            <tr><td>Japan</td><td>10%</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 11. Key Differences Between VAT, GST, and Sales Tax -->
    <section class="content-section">
      <h2>11. Key Differences Between VAT, GST, and Sales Tax</h2>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>VAT</th>
              <th>GST</th>
              <th>Sales Tax</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Collection stage</td>
              <td>Multiple stages</td>
              <td>Multiple stages</td>
              <td>Retail only</td>
            </tr>
            <tr>
              <td>Input tax credit</td>
              <td>Yes</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Typical rate</td>
              <td>15-25%</td>
              <td>5-18%</td>
              <td>0-10%</td>
            </tr>
            <tr>
              <td>Global adoption</td>
              <td>Very high</td>
              <td>High</td>
              <td>Limited</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 12. Global Trends -->
    <section class="content-section">
      <h2>12. Global Trends</h2>
      <p>Several major trends are shaping the future of consumption taxes:</p>
      
      <p><strong>1️⃣ Digital tax expansion</strong><br>
      More countries now require VAT on digital services.</p>
      
      <p><strong>2️⃣ Cross-border compliance</strong><br>
      International sellers must track multiple tax regimes simultaneously.</p>
      
      <p><strong>3️⃣ Simplified filing systems</strong><br>
      Examples include:</p>
      <ul>
        <li>EU One Stop Shop (OSS)</li>
        <li>GST unified filing systems</li>
        <li>automated tax APIs</li>
      </ul>
    </section>

    <!-- 13. Why Businesses Need Global Tax Calculators -->
    <section class="content-section">
      <h2>13. Why Businesses Need Global Tax Calculators</h2>
      <p>Because tax rules vary widely across countries, companies selling internationally often use automated tools to:</p>
      <ul>
        <li>calculate VAT or GST</li>
        <li>determine tax thresholds</li>
        <li>compare tax rates</li>
        <li>simulate cross-border pricing</li>
      </ul>
      
      <p>This is especially important for:</p>
      <ul>
        <li>SaaS companies</li>
        <li>e-commerce platforms</li>
        <li>digital service providers</li>
      </ul>
    </section>

    <!-- 14. Final Thoughts -->
    <section class="content-section">
      <h2>14. Final Thoughts</h2>
      <p>VAT, GST, and Sales Tax systems share a common goal: taxing consumption rather than income. However, the implementation varies significantly across jurisdictions.</p>
      
      <p><strong>Key takeaways:</strong></p>
      <ul>
        <li>VAT/GST is the dominant global model, used by more than 176 countries.</li>
        <li>Rates typically range between 10% and 25%, depending on the country.</li>
        <li>Registration thresholds vary widely and can significantly affect compliance requirements.</li>
      </ul>
      
      <p>For businesses operating internationally, understanding these differences is critical to pricing, compliance, and tax reporting.</p>
    </section>

    <!-- Explore Global VAT, GST & Sales Tax Calculator 按钮 -->
    <div class="calculator-button-container">
      <router-link to="/global-vat" class="calculator-button">Explore Global VAT, GST & Sales Tax Calculator →</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalTaxBlogPost',
  methods: {
    shareOnLinkedIn() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    },
    shareOnX() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('VAT vs GST vs Sales Tax: A Global Comparison Table (150+ Countries & Regions)');
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
  max-width: 1000px;
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

.intro-list {
  margin: 16px 0 16px 28px;
  padding-left: 0;
}

.intro-list li {
  margin: 8px 0;
  font-size: 1.1rem;
  color: #2d3e50;
}

@media (max-width: 480px) {
  .post-title {
    font-size: 2rem;
  }
  
  .post-intro,
  .intro-list li {
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
  min-width: 500px;
}

.data-table.small-table {
  min-width: 350px;
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
