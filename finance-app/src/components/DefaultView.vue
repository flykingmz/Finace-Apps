<template>
<!-- 添加home连接，距离下面的div有间距 
  <div style="max-width: 1280px; margin: 20px auto 0; padding: 0 1.5rem;">
    <div style="margin-bottom: 20px;">
      <a href="/dashboard" style="color: #4f46e5; text-decoration: none; font-weight: 500; font-size: 1rem;">Home</a>
    </div>
  </div>
  -->
 <div class="home-page">
    <!-- 页面顶部区域 -->
    <div class="page-top">
      <!-- 标题部分 -->
      <div class="title-section">
        <h1 class="main-title">Free Financial Calculators</h1>
        <p class="subtitle">The following is a complete list of our free financial calculators.</p>
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
            <div class="category-count">3 tools</div>
          </div>
          <div class="tools-list">
            <a href="/global-vat" class="tool-link">Global VAT Calculator</a>
            <a href="/income-tax" class="tool-link">Income Tax Calculator</a>
            <a href="/paycheck" class="tool-link">Paycheck Calculator</a>
            <a href="/take-home-paycheck-calculator" class="tool-link">TakeHome Paycheck Calculator</a>
            <a href="/marriage-tax-calculator" class="tool-link">Marriage Tax Calculator</a>
            <a href="/salary-calculator" class="tool-link">Salary Calculator</a>
            <a href="/crypto-tax-calculator" class="tool-link">Crypto Tax Calculator</a>
          </div>
        </div>

        <!-- Retirement -->
        <div class="category-card">
          <div class="category-header-active">
            <h2 class="category-title">Retirement</h2>
            <div class="category-count">9 tools</div>
          </div>
          <div class="tools-list">
            <a href="/retirement" class="tool-link">Retirement Calculator</a>
            <a href="/401k" class="tool-link">401K Calculator</a>
            <a href="/pension" class="tool-link">Pension Calculator</a>
            <a href="/social-security" class="tool-link">Social Security Calculator</a>
            <a href="/annuity" class="tool-link">Annuity Calculator</a>
            <a href="/annuity-payout" class="tool-link">Annuity Payout Calculator</a>
            <a href="/roth-ira" class="tool-link">Roth IRA Calculator</a>
            <li class="tool-link">IRA Calculator(Coming Soon)</li>
            <li class="tool-link">RMD Calculator(Coming Soon)</li>
          </div>
        </div>

        <!-- Mortgage and Real Estate -->
        <div class="category-card">
          <div class="category-header-active">
            <h2 class="category-title">Mortgage and Real Estate</h2>
            <div class="category-count">16 tools</div>
          </div>
          <div class="tools-list">
            <a href="/mortgage" class="tool-link">Mortgage Calculator</a>
            <a href="/amortization" class="tool-link">Amortization Calculator</a>
            <a href="/mortgage-payoff" class="tool-link">Mortgage Payoff Calculator</a>
            <li class="tool-link">House Affordability Calculator(Coming Soon)</li>
            <li class="tool-link">Rent Calculator(Coming Soon)</li>
            <li class="tool-link">Debt-to-Income Ratio Calculator(Coming Soon)</li>
            <li class="tool-link">Real Estate Calculator(Coming Soon)</li>
            <li class="tool-link">Refinance Calculator(Coming Soon)</li>
            <li class="tool-link">Rental Property Calculator(Coming Soon)</li>
            <li class="tool-link">APR Calculator(Coming Soon)</li>
            <li class="tool-link">FHA Loan Calculator(Coming Soon)</li>
            <li class="tool-link">VA Mortgage Calculator(Coming Soon)</li>
            <li class="tool-link">Home Equity Loan Calculator(Coming Soon)</li>
            <li class="tool-link">HELOC Calculator(Coming Soon)</li>
            <li class="tool-link">Down Payment Calculator(Coming Soon)</li>
            <li class="tool-link">Rent vs. Buy Calculator(Coming Soon)</li>
          </div>
        </div>

       

      <!-- Investment -->
        <div class="category-card">
          <div class="category-header-active">
            <h2 class="category-title">Investment</h2>
            <div class="category-count">3 tools</div>
          </div>
          <div class="tools-list">
            <a href="/interest" class="tool-link">Interest Calculator</a>
            <a href="/investment" class="tool-link">Investment Calculator</a>
            <a href="/certificate-deposit" class="tool-link">Certificate of Deposit (CD) Calculator</a>
            <li class="tool-link">Finance Calculator(Coming Soon)</li>
            <li class="tool-link">Compound Interest Calculator(Coming Soon)</li>
            <li class="tool-link">Interest Rate Calculator(Coming Soon)</li>
          </div>
        </div>

        <!-- crypto  -->
        <div class="category-card">
          <div class="category-header-active">
            <h2 class="category-title">Crypto</h2>
            <div class="category-count">5 tools</div>
          </div>
          <div class="tools-list">
            <a href="/crypto-tax-calculator" class="tool-link">Crypto Tax Calculator</a>
            <a href="/nft-calculator" class="tool-link">NFT tax calculator</a>
            <a href="/usa-crypto-calculator" class="tool-link">USA crypto calculator</a>
            <a href="/uk-crypto-calculator" class="tool-link">UK crypto calculator</a>
            <a href="/canada-crypto-calculator" class="tool-link">Canada crypto calculator</a>
            <a href="/australia-crypto-calculator" class="tool-link">Australia crypto calculator</a>
             <li class="tool-link">Defi tax calculator</li>
          </div>
        </div>

        <!-- annuity  -->
        <div class="category-card">
          <div class="category-header-active">
            <h2 class="category-title">annuity</h2>
            <div class="category-count">3 tools</div>
          </div>
          <div class="tools-list">
            <a href="/annuity-payout" class="tool-link">Annuity Payout Calculator</a>
            <a href="/annuity" class="tool-link">Annuity Calculator</a>
            <a href="/deferred-annuity" class="tool-link">Deferred Annuity Calculator</a>
          </div>
        </div>
        
        <!-- Other -->
        <div class="category-card">
          <div class="category-header">
            <h2 class="category-title">Other(Coming Soon)</h2>
            <div class="category-count">17 tools</div>
          </div>
          <div class="tools-list">
            <li class="tool-link">Loan Calculator</li>
            <li class="tool-link">Payment Calculator</li>
            <li class="tool-link">Currency Calculator</li>
            <li class="tool-link">Inflation Calculator</li>
            <li class="tool-link">Sales Tax Calculator</li>
            <li class="tool-link">Credit Card Calculator</li>
            <li class="tool-link">Credit Cards Payoff Calculator</li>
            <li class="tool-link">Debt Payoff Calculator</li>
            <li class="tool-link">Debt Consolidation Calculator</li>
            <li class="tool-link">Repayment Calculator</li>
            <li class="tool-link">Student Loan Calculator</li>
            <li class="tool-link">College Cost Calculator</li>
            <li class="tool-link">VAT Calculator</li>
            <li class="tool-link">Depreciation Calculator</li>
            <li class="tool-link">Auto Loan Calculator</li>
            <li class="tool-link">Cash Back or Low Interest Calculator</li>
            <li class="tool-link">Auto Lease Calculator</li>
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
    // 将长破折号 — 替换为普通的连字符 -
    document.title = 'Financial Calculators - Free Tax, Paycheck, VAT, Mortgage, Investment & Retirement Calculators';
    // 2. 设置关键meta标签（Google最关注的）
    this.setGoogleMetaTags()

    /*
    this.injectJsonLdToHead()
    // 延迟再次注入，确保不被覆盖
    setTimeout(() => {
      this.injectJsonLdToHead()
    }, 1000)
   */
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
      desc.content = 'Free financial calculators for tax, paycheck, VAT, mortgage, and retirement planning. Estimate take-home pay, calculate taxes, and plan your finances instantly.'
      
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
        "name": "Financial Calculators — Free Tax, Paycheck, VAT, Mortgage & Retirement Calculators",
        "description": "Free financial calculators for tax, paycheck, VAT, mortgage, and retirement planning. Estimate take-home pay, calculate taxes, and plan your finances instantly.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "url": "https://financial-calculator.net/",
        "logo": "https://financial-calculator.net/logo.png",
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
.home-page {
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* 页面顶部区域样式 */
.page-top {
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 标题部分样式 */
.title-section {
  background-color: #1a365d; /* 深色纯色背景 */
  color: white; /* 白色字体 */
  text-align: center; /* 内容居中 */
  padding: 2.5rem 1rem;
}

.main-title {
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  letter-spacing: 0.5px;
}

.subtitle {
  font-size: 1rem; /* 白色小字体 */
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.5;
  font-weight: 300;
}

/* 内容区域样式 */
.home-body {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 3rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.8rem;
}

.category-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.category-header {
  background-color: #2d3748;
  color: white;
  padding: 1.2rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-header-active {
  background-color: #0f9805;
  color: white;
  padding: 1.2rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.category-count {
  background-color: rgba(255, 255, 255, 0.2);
  font-size: 0.85rem;
  padding: 0.3rem 0.7rem;
  border-radius: 12px;
  font-weight: 500;
}

.tools-list {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  flex-grow: 1;
  overflow-y: auto;
  max-height: 400px;
}

.tool-link {
  color: #2d3748;
  text-decoration: none;
  padding: 0.7rem 0.9rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-size: 0.95rem;
  border-left: 3px solid transparent;
  display: block;
}

.tool-link:hover {
  background-color: #f7fafc;
  color: #4a90e2;
  border-left-color: #4a90e2;
  padding-left: 1.1rem;
}

/* 滚动条样式 */
.tools-list::-webkit-scrollbar {
  width: 6px;
}

.tools-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.tools-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.tools-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .category-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
  
  .main-title {
    font-size: 1.9rem;
  }
  
  .subtitle {
    font-size: 0.95rem;
    padding: 0 1rem;
  }
  
  .title-section {
    padding: 2rem 1rem;
  }
}

@media (min-width: 1200px) {
  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1400px) {
  .category-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
