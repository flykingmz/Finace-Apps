<template>
  <div class="blog-list-app">
    <!-- Simple header -->
    <div class="blog-header">
      <h1 class="main-title">Financial Calculator Blog</h1>
      <p class="header-description">Explore expert financial insights to help you make smarter decisions about taxes, retirement, income, and investments. Our guides explain complex financial topics in simple terms, helping you understand how different scenarios impact your money. From VAT and paycheck calculations to Social Security and retirement planning, learn practical strategies to optimize your financial future.</p>
    </div>

    <!-- Blog List Section -->
    <div class="blog-list-section">
      <div class="blog-items">
        <!-- Blog 1: VAT vs GST vs Sales Tax -->
        <div class="blog-card">
          <h2 class="blog-title">VAT vs GST vs Sales Tax</h2>
          <div class="blog-meta">
            <span class="publish-date">March 1, 2026</span>
          </div>
          <p class="blog-excerpt">Understanding the differences between Value-Added Tax (VAT), Goods and Services Tax (GST), and traditional Sales Tax is crucial for businesses and consumers alike. This article breaks down how each tax system works, where they are commonly used, and their impact on pricing and compliance.</p>
          <a href="/vat-gst-sales-tax-blog" class="learn-more">Detail →</a>
        </div>

        <!-- Blog 2: How Social Security Benefits Work -->
        <div class="blog-card">
          <h2 class="blog-title">Understanding U.S. Social Security: A Complete Guide</h2>
          <div class="blog-meta">
            <span class="publish-date">February 25, 2026</span>
          </div>
          <p class="blog-excerpt">Social Security is a vital source of retirement income for millions of Americans. Learn about how benefits are calculated based on your lifetime earnings, the importance of work credits, and how your claiming age affects monthly payments.</p>
          <a href="/social-security-blog" class="learn-more">Detail →</a>
        </div>

        <!-- Blog 3: Best Age to Claim Social Security -->
        <div class="blog-card">
          <h2 class="blog-title">Best Age to Claim Social Security</h2>
          <div class="blog-meta">
            <span class="publish-date">February 18, 2026</span>
          </div>
          <p class="blog-excerpt">Deciding when to claim Social Security benefits is one of the most important financial decisions you'll make. This article analyzes the trade-offs between claiming early at 62, waiting until Full Retirement Age, or delaying until 70 to maximize lifetime benefits.</p>
          <a href="#" class="learn-more">Detail →</a>
        </div>

        <!-- Blog 4: How Annuities Work -->
        <div class="blog-card">
          <h2 class="blog-title">How Annuities Work?</h2>
          <div class="blog-meta">
            <span class="publish-date">February 10, 2026</span>
          </div>
          <p class="blog-excerpt">Annuities can provide guaranteed lifetime income, but they come with complexity and fees. This comprehensive guide explains the different types of annuities—fixed, variable, and indexed—and helps you understand whether they belong in your retirement portfolio.</p>
          <a href="#" class="learn-more">Detail →</a>
        </div>

        <!-- Blog 5: How Take Home Pay Is Calculated -->
        <div class="blog-card">
          <h2 class="blog-title">How Take Home Pay Is Calculated?</h2>
          <div class="blog-meta">
            <span class="publish-date">February 3, 2026</span>
          </div>
          <p class="blog-excerpt">Ever wonder why your take home pay is less than your salary? This article walks through all the deductions—federal and state income tax, FICA (Social Security and Medicare), and other withholdings—that determine your actual paycheck amount.</p>
          <a href="#" class="learn-more">Detail →</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogListPage',
  methods: {
    setGoogleMetaTags() {
      // 确保description存在且内容正确
      let desc = document.querySelector('meta[name="description"]')
      if (!desc) {
        desc = document.createElement('meta')
        desc.name = 'description'
        document.head.appendChild(desc)
      }
      desc.content = 'Expert financial guides on taxes, retirement, paycheck planning, investments, and personal finance decisions. Learn how to calculate, compare scenarios, and optimize your financial future with practical insights.'
      
      // 确保robots标签存在（告诉Google索引此页）
      let robots = document.querySelector('meta[name="robots"]')
      if (!robots) {
        robots = document.createElement('meta')
        robots.name = 'robots'
        document.head.appendChild(robots)
      }
      robots.content = 'index, follow'
      
      // 添加Google专用的nositelinkssearchbox（可选）
      let google = document.querySelector('meta[name="google"]')
      if (!google) {
        google = document.createElement('meta')
        google.name = 'google'
        document.head.appendChild(google)
      }
      google.content = 'nositelinkssearchbox'
      
      // 添加canonical链接（防止重复内容）
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = window.location.href
      
      console.log('Google meta tags set')
    }
  },
  mounted() {
    document.title = 'Financial Insights Blog – Tax, Retirement, Investment and Financial Planning Guides'
    // 2. 设置关键meta标签（Google最关注的）
    this.setGoogleMetaTags()
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.blog-list-app {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 24px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #f9fafc;
  min-height: 100vh;
}

.blog-header {
  margin-bottom: 48px;
  text-align: center;
}

.main-title {
  font-size: 2.8rem;
  font-weight: 700;
  color: #0b2b44;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.header-description {
  font-size: 1.2rem;
  color: #4b5f73;
  line-height: 1.5;
  max-width: 600px;
  margin: 0 auto;
}

.blog-list-section {
  width: 100%;
}

.blog-items {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.blog-card {
  background: white;
  border-radius: 24px;
  padding: 28px 32px;
  box-shadow: 0 8px 20px rgba(0, 20, 40, 0.06);
  border: 1px solid #e6edf5;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.blog-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 28px rgba(0, 30, 60, 0.1);
  border-color: #c9d9ec;
}

.blog-title {
  font-size: 1.9rem;
  font-weight: 600;
  color: #0f2a40;
  margin-bottom: 10px;
  line-height: 1.3;
}

.blog-meta {
  margin-bottom: 16px;
}

.publish-date {
  font-size: 0.95rem;
  color: #6b7f96;
  display: inline-block;
  background: #ecf3fa;
  padding: 4px 12px;
  border-radius: 30px;
  font-weight: 500;
}

.blog-excerpt {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #2c405c;
  margin-bottom: 20px;
}

.learn-more {
  display: inline-block;
  font-size: 1rem;
  font-weight: 600;
  color: #1f4a7a;
  text-decoration: none;
  padding: 8px 0;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;
}

.learn-more:hover {
  border-bottom-color: #1f4a7a;
}

/* Responsive adjustments */
@media (max-width: 700px) {
  .blog-list-app {
    padding: 24px 16px;
  }
  
  .main-title {
    font-size: 2.2rem;
  }
  
  .blog-title {
    font-size: 1.6rem;
  }
  
  .blog-card {
    padding: 22px 24px;
  }
}
</style>
