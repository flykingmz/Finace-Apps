<template>
 <div class="home-page">
    <!-- 页面顶部区域 -->
    <div class="page-top">
      <!-- 标题部分 -->
      <div class="title-section">
        <h1 class="main-title">Taxo Financial Free Calculators</h1>
        <p class="subtitle">Professional, accurate, and easy-to-use online financial calculator collection</p>
      </div>
    </div>

    <!-- 内容区域 -->
    <main class="home-body">
      <!-- 分类导航 -->
      <div class="category-grid">
        <!-- Tax and Salary -->
        <div class="category-card">
          <div class="category-header-active">
            <h2 class="category-title">Tax and Salary</h2>
            <div class="category-count">5 tools</div>
          </div>
          <div class="tools-list">
            <a href="#/a/global-price" class="tool-link">Global VAT Calculator</a>
            <a href="#/a/income-tax" class="tool-link">Income Tax Calculator</a>
            <a href="#/a/paycheck" class="tool-link">Paycheck Calculator</a>
          </div>
        </div>

        <!-- Retirement -->
        <div class="category-card">
          <div class="category-header-active">
            <h2 class="category-title">Retirement</h2>
            <div class="category-count">9 tools</div>
          </div>
          <div class="tools-list">
            <a href="#/a/retirement" class="tool-link">Retirement Calculator</a>
            <a href="#" class="tool-link">401K Calculator</a>
            <a href="#" class="tool-link">Pension Calculator</a>
            <a href="#" class="tool-link">Social Security Calculator</a>
            <a href="#" class="tool-link">Annuity Calculator</a>
            <a href="#" class="tool-link">Annuity Payout Calculator</a>
            <a href="#" class="tool-link">Roth IRA Calculator</a>
            <a href="#" class="tool-link">IRA Calculator</a>
            <a href="#" class="tool-link">RMD Calculator</a>
          </div>
        </div>

        <!-- Mortgage and Real Estate -->
        <div class="category-card">
          <div class="category-header">
            <h2 class="category-title">Mortgage and Real Estate（TBC）</h2>
            <div class="category-count">16 tools</div>
          </div>
          <div class="tools-list">
            <a href="#" class="tool-link">Mortgage Calculator</a>
            <a href="#" class="tool-link">Amortization Calculator</a>
            <a href="#" class="tool-link">Mortgage Payoff Calculator</a>
            <a href="#" class="tool-link">House Affordability Calculator</a>
            <a href="#" class="tool-link">Rent Calculator</a>
            <a href="#" class="tool-link">Debt-to-Income Ratio Calculator</a>
            <a href="#" class="tool-link">Real Estate Calculator</a>
            <a href="#" class="tool-link">Refinance Calculator</a>
            <a href="#" class="tool-link">Rental Property Calculator</a>
            <a href="#" class="tool-link">APR Calculator</a>
            <a href="#" class="tool-link">FHA Loan Calculator</a>
            <a href="#" class="tool-link">VA Mortgage Calculator</a>
            <a href="#" class="tool-link">Home Equity Loan Calculator</a>
            <a href="#" class="tool-link">HELOC Calculator</a>
            <a href="#" class="tool-link">Down Payment Calculator</a>
            <a href="#" class="tool-link">Rent vs. Buy Calculator</a>
          </div>
        </div>

       

      <!-- Investment -->
        <div class="category-card">
          <div class="category-header">
            <h2 class="category-title">Investment（TBC）</h2>
            <div class="category-count">3 tools</div>
          </div>
          <div class="tools-list">
            <a href="#" class="tool-link">Interest Calculator</a>
            <a href="#" class="tool-link">Investment Calculator</a>
            <a href="#" class="tool-link">Finance Calculator</a>
            <a href="#" class="tool-link">Compound Interest Calculator</a>
            <a href="#" class="tool-link">Interest Rate Calculator</a>
          </div>
        </div>

        <!-- Auto -->
        <div class="category-card">
          <div class="category-header">
            <h2 class="category-title">Auto（TBC）</h2>
            <div class="category-count">3 tools</div>
          </div>
          <div class="tools-list">
            <a href="#" class="tool-link">Auto Loan Calculator</a>
            <a href="#" class="tool-link">Cash Back or Low Interest Calculator</a>
            <a href="#" class="tool-link">Auto Lease Calculator</a>
          </div>
        </div>

        <!-- Other -->
        <div class="category-card">
          <div class="category-header">
            <h2 class="category-title">Other（TBC）</h2>
            <div class="category-count">17 tools</div>
          </div>
          <div class="tools-list">
            <a href="#" class="tool-link">Loan Calculator</a>
            <a href="#" class="tool-link">Payment Calculator</a>
            <a href="#" class="tool-link">Currency Calculator</a>
            <a href="#" class="tool-link">Inflation Calculator</a>
            <a href="#" class="tool-link">Sales Tax Calculator</a>
            <a href="#" class="tool-link">Credit Card Calculator</a>
            <a href="#" class="tool-link">Credit Cards Payoff Calculator</a>
            <a href="#" class="tool-link">Debt Payoff Calculator</a>
            <a href="#" class="tool-link">Debt Consolidation Calculator</a>
            <a href="#" class="tool-link">Repayment Calculator</a>
            <a href="#" class="tool-link">Student Loan Calculator</a>
            <a href="#" class="tool-link">College Cost Calculator</a>
            <a href="#" class="tool-link">VAT Calculator</a>
            <a href="#" class="tool-link">Depreciation Calculator</a>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DefaultView',
  mounted() {
    //console.log('injectJsonLdToHead script start.');
    document.title = 'Taxo Financial Free Calculators'
    // 2. 设置关键meta标签（Google最关注的）
    this.setGoogleMetaTags()

    this.injectJsonLdToHead()
    // 延迟再次注入，确保不被覆盖
    setTimeout(() => {
      this.injectJsonLdToHead()
    }, 1000)
   
  },
  methods: {
    // navigateTo(calculator) {
    //  this.$router.push(`/dashboard/${calculator}`)
    // },

    setGoogleMetaTags() {
      // 确保description存在且内容正确
      let desc = document.querySelector('meta[name="description"]')
      if (!desc) {
        desc = document.createElement('meta')
        desc.name = 'description'
        document.head.appendChild(desc)
      }
      desc.content = 'Free financial calculators for paycheck, income tax, and global price calculations. Calculate net pay, estimate taxes, compare prices worldwide.'
      
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
    },
    
    injectJsonLdToHead() {
       
      const baseUrl = window.location.origin
      
      const jsonLd ={
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Taxo Financial Free Calculators",
        "description": "Finance Free Calculators including paycheck, income tax, and global VAT calculators,Tax and Salary calculators,Mortgage and Real Estate calculators、Retirement calculators、Investment calculators、loan calculators etc.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
      
      // 移除旧的脚本
      const oldScript = document.querySelector('script[data-dashboard-jsonld]')
      if (oldScript) oldScript.remove()
      
      // 创建并注入新脚本
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-dashboard-jsonld', 'true')
      script.textContent = JSON.stringify(jsonLd, null, 2)
      
      document.head.appendChild(script)
      //console.log('injectJsonLdToHead script loaded.');
    }
  }
}
</script>

<style scoped>
/* 移动端优先的响应式样式 */
.home-page {
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  background-color: #f8f9fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 页面顶部区域样式 */
.page-top {
  margin-bottom: clamp(1rem, 4vw, 2rem);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

/* 标题部分样式 */
.title-section {
  background-color: #1a365d;
  color: white;
  text-align: center;
  padding: clamp(1.5rem, 6vw, 2.5rem) clamp(0.5rem, 2vw, 1rem);
  position: relative;
  overflow: hidden;
}

.main-title {
  font-size: clamp(1.8rem, 7vw, 2.4rem);
  font-weight: 700;
  margin-bottom: clamp(0.5rem, 2vw, 0.8rem);
  letter-spacing: 0.3px;
  line-height: 1.2;
  padding: 0 clamp(0.5rem, 2vw, 1rem);
}

.subtitle {
  font-size: clamp(0.9rem, 3.5vw, 1rem);
  opacity: 0.9;
  max-width: min(90vw, 700px);
  margin: 0 auto;
  line-height: 1.5;
  font-weight: 300;
  padding: 0 clamp(0.5rem, 2vw, 1rem);
}

/* 内容区域样式 */
.home-body {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 clamp(0.75rem, 3vw, 1rem) clamp(2rem, 6vw, 3rem);
  box-sizing: border-box;
}

.category-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1rem, 4vw, 1.8rem);
  width: 100%;
}

/* 平板及以上设备 */
@media (min-width: 640px) {
  .category-grid {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  }
}

/* 桌面设备 */
@media (min-width: 1024px) {
  .category-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

/* 大桌面设备 */
@media (min-width: 1400px) {
  .category-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.category-card {
  background-color: white;
  border-radius: clamp(8px, 2vw, 10px);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
  min-height: 180px;
}

.category-card:hover,
.category-card:active {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.category-header,
.category-header-active {
  padding: clamp(1rem, 4vw, 1.2rem) clamp(1rem, 4vw, 1.5rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
  box-sizing: border-box;
}

.category-header {
  background-color: #2d3748;
  color: white;
}

.category-header-active {
  background-color: #0f9805;
  color: white;
}

.category-title {
  font-size: clamp(1.1rem, 4vw, 1.3rem);
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
  word-break: break-word;
  flex: 1;
  padding-right: 0.5rem;
}

.category-count {
  background-color: rgba(255, 255, 255, 0.2);
  font-size: clamp(0.75rem, 3vw, 0.85rem);
  padding: clamp(0.2rem, 1vw, 0.3rem) clamp(0.5rem, 2vw, 0.7rem);
  border-radius: 20px;
  font-weight: 500;
  white-space: nowrap;
  min-width: fit-content;
  height: fit-content;
}

.tools-list {
  padding: clamp(1rem, 3vw, 1.5rem);
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 2vw, 0.7rem);
  flex-grow: 1;
  overflow-y: auto;
  max-height: min(50vh, 400px);
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.tool-link {
  color: #2d3748;
  text-decoration: none;
  padding: clamp(0.6rem, 2.5vw, 0.7rem) clamp(0.8rem, 2.5vw, 0.9rem);
  border-radius: clamp(5px, 1.5vw, 6px);
  transition: all 0.2s ease;
  font-size: clamp(0.9rem, 3.5vw, 0.95rem);
  border-left: 3px solid transparent;
  display: block;
  position: relative;
  min-height: 44px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.tool-link:hover,
.tool-link:active {
  background-color: #f7fafc;
  color: #4a90e2;
  border-left-color: #4a90e2;
  padding-left: clamp(1rem, 3.5vw, 1.1rem);
  transform: translateX(2px);
}

/* 触摸反馈效果 */
.tool-link:active {
  background-color: #edf2f7;
  transition-duration: 0.1s;
}

/* 滚动条样式 - 移动端优化 */
.tools-list::-webkit-scrollbar {
  width: 4px;
}

.tools-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
  margin: 4px 0;
}

.tools-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.tools-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 移动端横屏优化 */
@media (orientation: landscape) and (max-height: 500px) {
  .title-section {
    padding: clamp(1rem, 3vw, 1.5rem) clamp(0.5rem, 2vw, 1rem);
  }
  
  .main-title {
    font-size: clamp(1.5rem, 5vw, 2rem);
    margin-bottom: 0.5rem;
  }
  
  .category-card {
    min-height: 160px;
  }
  
  .tools-list {
    max-height: 30vh;
  }
}

/* 暗色模式支持 */
@media (prefers-color-scheme: dark) {
  .home-page {
    background-color: #1a202c;
  }
  
  .category-card {
    background-color: #2d3748;
    border-color: #4a5568;
  }
  
  .tool-link {
    color: #e2e8f0;
  }
  
  .tool-link:hover,
  .tool-link:active {
    background-color: #4a5568;
    color: #63b3ed;
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  .category-header {
    background-color: #000;
  }
  
  .category-header-active {
    background-color: #006400;
  }
  
  .tool-link {
    border-left-width: 4px;
  }
}

/* 减少动画（可访问性） */
@media (prefers-reduced-motion: reduce) {
  .category-card,
  .tool-link {
    transition: none;
  }
  
  .category-card:hover,
  .category-card:active,
  .tool-link:hover,
  .tool-link:active {
    transform: none;
  }
}

/* 防止文本溢出 */
.category-title,
.tool-link {
  overflow-wrap: break-word;
  word-wrap: break-word;
}

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
  .category-card:hover {
    transform: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  
  .category-card:active {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
  
  .tool-link:hover {
    background-color: transparent;
    border-left-color: transparent;
    padding-left: clamp(0.8rem, 2.5vw, 0.9rem);
  }
  
  .tool-link:active {
    background-color: #f7fafc;
    border-left-color: #4a90e2;
    padding-left: clamp(1rem, 3.5vw, 1.1rem);
  }
}

/* 超大字体支持 */
@media (prefers-font-size: large) {
  .main-title {
    font-size: clamp(2rem, 8vw, 2.8rem);
  }
  
  .category-title {
    font-size: clamp(1.3rem, 5vw, 1.5rem);
  }
  
  .tool-link {
    font-size: clamp(1rem, 4vw, 1.1rem);
    min-height: 52px;
  }
  
  .tools-list {
    gap: 1rem;
  }
}

/* 防止iPhone安全区域问题 */
@supports (padding: max(0px)) {
  .home-body {
    padding-left: max(clamp(0.75rem, 3vw, 1rem), env(safe-area-inset-left));
    padding-right: max(clamp(0.75rem, 3vw, 1rem), env(safe-area-inset-right));
    padding-bottom: max(clamp(2rem, 6vw, 3rem), env(safe-area-inset-bottom));
  }
  
  .title-section {
    padding-left: max(clamp(0.5rem, 2vw, 1rem), env(safe-area-inset-left));
    padding-right: max(clamp(0.5rem, 2vw, 1rem), env(safe-area-inset-right));
  }
}

/* 性能优化 */
.category-card,
.tool-link {
  will-change: transform;
  backface-visibility: hidden;
}

/* 打印样式 */
@media print {
  .home-page {
    background-color: white;
    min-height: auto;
  }
  
  .category-card {
    break-inside: avoid;
    box-shadow: none;
    border: 1px solid #ddd;
  }
  
  .tools-list {
    max-height: none;
  }
}

/* 超小屏幕设备优化 */
@media (max-width: 320px) {
  .category-header,
  .category-header-active {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .category-count {
    align-self: flex-start;
  }
  
  .tool-link {
    min-height: 40px;
    padding: 0.5rem 0.7rem;
  }
}
</style>
