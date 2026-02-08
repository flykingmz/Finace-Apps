<template>
  <div class="about-us-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">About Us</h1>
      <div class="page-subtitle">
        A comprehensive collection of free online Financial calculators for public use
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="content-container">
      <div class="about-content">
        <!-- 第一段 -->
        <section class="content-section">
          <p>
            We are a group of IT professionals enthusiastic in creating quality free tools and content on the Internet. The main purpose of this website is to provide a comprehensive collection of free online Financial calculators for ease of public use. This site was launched on finace-apps-one.vercel.app.
          </p>
        </section>

        <!-- 第二段 -->
        <section class="content-section">
          <h2 class="section-title">Calculator Categories</h2>
          <p>
            The calculators on this site were grouped into 4 sections: Tax and Salary, Retirement, Mortgage and Real Estate, Investment, Auto, and others. All of the Financial calculators were developed in-house.
          </p>
        </section>

        <!-- 第三段 -->
        <section class="content-section">
          <h2 class="section-title">Development & Sources</h2>
          <p>
            Some calculators use open-source JavaScript components under different open-source licenses. More than 90% of the Financial calculators are based on well-known formulas or equations from textbooks, such as the mortgage calculator, Auto calculator etc. 
          </p>
    
        </section>

        <!-- 第四段 -->
        <section class="content-section">
          <h2 class="section-title">Quality Assurance</h2>
          <div class="quality-grid">
            <div class="quality-item">
              <div class="quality-icon">✅</div>
              <div class="quality-content">
                <h3>Financial Review</h3>
                <p>The results of the financial calculators were reviewed by our financial advisors, who work for major personal financial advising firms.</p>
              </div>
            </div>

            <div class="quality-item">
              <div class="quality-icon">📝</div>
              <div class="quality-content">
                <h3>Content Development</h3>
                <p>More than 99% of the descriptive content was developed in-house with a small amount of content taken from wikipedia.org under the GNU Free Documentation License.</p>
              </div>
            </div>

          </div>
        </section>

        <!-- 最后一段 -->
        <section class="content-section owner-section">
          <div class="owner-card">
            <div class="owner-icon">🏢</div>
            <div class="owner-content">
              <h2 class="owner-title">Ownership</h2>
              <p class="owner-desc">
                This site is owned and operated by <strong>flyking</strong>.
              </p>
              <div class="owner-details">
                <div class="detail-item">
                  <span class="detail-label">Founded:</span>
                  <span class="detail-value">2025</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Current Domain:</span>
                  <span class="detail-value">finace-apps-one.vercel.app</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Mission:</span>
                  <span class="detail-value">Providing free, quality tools for public use</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 联系信息 -->
        <div class="contact-section">
          <h2 class="contact-title">Get in Touch</h2>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-icon">✉️</span>
              <span class="contact-text">contact@calculator.net</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">🌐</span>
              <a href="https://finace-apps-one.vercel.app/" class="contact-link" target="_blank">finace-apps-one.vercel.app</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  data() {
    return {
      stats: [
        { number: '2025', label: 'Founded Year' },
        { number: '4+', label: 'Categories' },
        { number: '90%+', label: 'Formula Based' },
        { number: '99%+', label: 'In-house Content' }
      ]
    }
  }
}
</script>

<style scoped>
/* 页面基础样式 */
.about-us-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
  line-height: 1.6;
}

/* 页面标题区域 */
.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eaeaea;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #7f8c8d;
  max-width: 600px;
  margin: 0 auto;
}

/* 内容容器 */
.content-container {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  padding: 40px;
  margin-bottom: 40px;
}

/* 内容区域 */
.content-section {
  margin-bottom: 40px;
}

.content-section p {
  font-size: 1.05rem;
  color: #555;
  margin-bottom: 15px;
}

/* 小标题 */
.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #3498db;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}

/* 分类网格 */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.category-card {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 25px 20px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #eaeaea;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.category-icon {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.category-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.category-desc {
  font-size: 0.9rem;
  color: #7f8c8d;
  line-height: 1.4;
}

/* 质量保证网格 */
.quality-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.quality-item {
  display: flex;
  align-items: flex-start;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.quality-icon {
  font-size: 1.8rem;
  margin-right: 15px;
  flex-shrink: 0;
}

.quality-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.quality-content p {
  font-size: 0.95rem;
  color: #555;
  margin: 0;
}

/* 所有者信息 */
.owner-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 30px;
}

.owner-card {
  display: flex;
  align-items: center;
  gap: 30px;
}

.owner-icon {
  font-size: 4rem;
  flex-shrink: 0;
}

.owner-content {
  flex: 1;
}

.owner-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 15px;
}

.owner-desc {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 20px;
}

.owner-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 5px;
}

.detail-value {
  font-size: 1rem;
  color: #2c3e50;
  font-weight: 500;
}

/* 联系信息 */
.contact-section {
  text-align: center;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 10px;
  margin-top: 40px;
}

.contact-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 20px;
}

.contact-info {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-icon {
  font-size: 1.2rem;
}

.contact-text {
  font-size: 1.1rem;
  color: #555;
}

.contact-link {
  font-size: 1.1rem;
  color: #3498db;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #2980b9;
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-us-page {
    padding: 10px;
  }
  
  .content-container {
    padding: 20px;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .categories-grid,
  .quality-grid {
    grid-template-columns: 1fr;
  }
  
  .owner-card {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .owner-details {
    grid-template-columns: 1fr;
  }
  
  .contact-info {
    flex-direction: column;
    gap: 15px;
  }
  
  .content-section {
    margin-bottom: 30px;
  }
}
</style>