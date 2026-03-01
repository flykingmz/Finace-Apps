<template>
   <!-- 添加home连接，距离下面的div有间距 
  <div style="max-width: 1280px; margin: 20px auto 0; padding: 0 1.5rem;">
    <div style="margin-bottom: 20px;">
      <a href="/dashboard" style="color: #4f46e5; text-decoration: none; font-weight: 500; font-size: 1rem;">Home</a>
    </div>
  </div>
-->
  <div class="financial-home">

    <!-- Header -->
    <h1>📊 Free Financial Calculators</h1>
    <div class="subhead">Estimate your take-home pay, calculate VAT and taxes, plan retirement, and analyze investments — all in one place.</div>

    <!-- Tool Categories + Popular Calculators (first screen) -->
    <h2>🔧 Tool Categories</h2>
    <div class="categories-grid">
      <!-- Tax and Salary -->
      <div class="category-card">
        <!-- <div class="category-icon"><i class="fas fa-file-invoice-dollar"></i></div> -->
        <div class="category-title"><a href="/tax-salary-calculators">Tax and Salary</a> </div>
        <ul class="popular-list">
          <li><a href="/global-vat" >🌍 Global VAT/GST/Sales Tax Calculator</a></li>
          <li><a href="/take-home-paycheck-calculator" >💵 Take Home Paycheck Calculator</a></li>
          <li><a href="/income-tax" >🌍 Income Tax Calculator</a></li>
          <li><a href="/paycheck" >💵 Paycheck Calculator</a></li>
        </ul>
      </div>
      <!-- Retirement -->
      <div class="category-card">
       <!-- <div class="category-icon"><i class="fas fa-umbrella-beach"></i></div> -->
        <div class="category-title"><a href="/retirement-calculators">Retirement</a> </div>
        <ul class="popular-list">
          <li><a href="/retirement" >📈 Retirement Calculator</a></li>
          <li><a href="/401k" >💰 401(k) Calculator</a></li>
          <li><a href="/pension" >📈 Pension Calculator</a></li>
          <li><a href="/social-security" >💰 Social Security Calculator</a></li>
        </ul>
      </div>
      <!-- Mortgage and Real Estate -->
      <div class="category-card">
      <!--  <div class="category-icon"><i class="fas fa-home"></i></div> -->
        <div class="category-title"><a href="/mortgage-RE-calculators">Mortgage and Real Estate</a> </div>
        <ul class="popular-list">
          <li><a href="" >🏠 Mortgage Calculator</a></li>
          <li><a href="" >📉 Amortization Calculator</a></li>
        </ul>
      </div>
      <!-- Investment -->
      <div class="category-card">
     <!--   <div class="category-icon"><i class="fas fa-chart-line"></i></div> -->
        <div class="category-title"><a href="/investment-calculators">Investment</a> </div>
        <ul class="popular-list">
          <li><a href="" >📊 Investment Calculator</a></li>
          <li><a href="" >🧮 Interest Calculator</a></li>
        </ul>
      </div>
      <!-- Auto -->
      <div class="category-card">
        <div class="category-title"><a href="/auto-calculators">Auto</a> </div>
        <ul class="popular-list">
          <li><a href="" >📊 Auto Loan Calculator</a></li>
          <li><a href="" >🧮 Auto Lease Calculator</a></li>
        </ul>
      </div>
      <!-- Other -->
      <div class="category-card">
        <div class="category-title"><a href="/other-calculators">Other</a> </div>
        <ul class="popular-list">
          <li><a href="" >📊 Currency Calculator</a></li>
          <li><a href="" >🧮 Credit Card Calculator</a></li>
          <li><a href="" >📈 Debt Payoff Calculator</a></li>
        </ul>
      </div>
    </div>

    <!-- All Calculators button (leads to all calculators page) -->
    <div class="all-calculators-row">
      <a href="/all-calculators" class="btn-primary" >✨ All Calculators (50+ tools)</a>
    </div>

     <h2>📚 Financial Guides / Learn</h2>
    <div class="featured-grid">
      <div class="featured-item">
        <i class="fas fa-globe"></i>
        <a href="/blog" >Financial Calculator Blog</a>
      </div>
    </div>
     
    <!-- Featured Calculators section (as per 'all calculators' area) -->
    <h2>⭐ Featured Calculators</h2>
    <div class="featured-grid">
      <div class="featured-item">
        <i class="fas fa-globe"></i>
        <a href="/global-vat" >Global VAT/GST/Sales Tax Calculator</a>
      </div>
      <div class="featured-item">
        <i class="fas fa-wallet"></i>
        <a href="/take-home-paycheck-calculator" >Take Home Paycheck Calculator</a>
      </div>
    </div>

    <!-- HOW IT WORKS -->
    <h2>🚀 How It Works</h2>
    <div class="steps-container">
      <div class="step">
        <div class="step-number">1</div>
        <h4>Enter Your Financial Details</h4>
        <p>Input your salary, tax status, retirement contributions, or investment amount. Our calculators support multiple income types, tax situations, and financial scenarios.</p>
      </div>
      <div class="step">
        <div class="step-number">2</div>
        <h4>Get Instant Financial Insights</h4>
        <p>Instantly see your net income, tax breakdown, retirement projections, or investment growth estimates.</p>
      </div>
      <div class="step">
        <div class="step-number">3</div>
        <h4>Optimize Your Financial Decisions</h4>
        <p>Adjust inputs to compare scenarios and make informed choices about taxes, savings, and long-term wealth planning.</p>
      </div>
    </div>

    <!-- WHY USE US (4 blocks as described) -->
    <h2>💡 Why Use Us</h2>
    <div class="why-grid">
      <div class="why-card">
        <h4><i class="fas fa-file-invoice" style="color:#2563eb;"></i> Tax & Salary Planning</h4>
        <ul>
          <li><i class="fas fa-check-circle"></i> Calculate take-home pay after taxes</li>
          <li><i class="fas fa-check-circle"></i> Estimate federal and state tax impact</li>
          <li><i class="fas fa-check-circle"></i> Understand paycheck deductions</li>
          <li><i class="fas fa-check-circle"></i> Compare salary scenarios</li>
          <li><i class="fas fa-check-circle"></i> Plan income tax withholding</li>
        </ul>
      </div>
      <div class="why-card">
        <h4><i class="fas fa-piggy-bank" style="color:#2563eb;"></i> Retirement Planning</h4>
        <ul>
          <li><i class="fas fa-check-circle"></i> Estimate retirement savings growth</li>
          <li><i class="fas fa-check-circle"></i> Calculate 401(k) contributions</li>
          <li><i class="fas fa-check-circle"></i> Plan long-term retirement income</li>
          <li><i class="fas fa-check-circle"></i> Forecast compound interest</li>
          <li><i class="fas fa-check-circle"></i> Evaluate retirement readiness</li>
        </ul>
      </div>
      <div class="why-card">
        <h4><i class="fas fa-chart-pie" style="color:#2563eb;"></i> Investment Growth & Returns</h4>
        <ul>
          <li><i class="fas fa-check-circle"></i> Project investment returns</li>
          <li><i class="fas fa-check-circle"></i> Calculate compound interest</li>
          <li><i class="fas fa-check-circle"></i> Estimate portfolio growth</li>
          <li><i class="fas fa-check-circle"></i> Compare investment strategies</li>
          <li><i class="fas fa-check-circle"></i> Plan long-term wealth building</li>
        </ul>
      </div>
      <div class="why-card">
        <h4><i class="fas fa-bolt" style="color:#2563eb;"></i> Fast, Accurate & Free</h4>
        <ul>
          <li><i class="fas fa-check-circle"></i> No signup required</li>
          <li><i class="fas fa-check-circle"></i> Instant results</li>
          <li><i class="fas fa-check-circle"></i> Simple and intuitive interface</li>
          <li><i class="fas fa-check-circle"></i> Accurate financial formulas</li>
          <li><i class="fas fa-check-circle"></i> Free to use anytime</li>
        </ul>
      </div>
    </div>

    <!-- FAQ -->
    <h2>❓ Frequently Asked Questions</h2>
    <div class="faq-section">
      <div class="faq-grid">
        <!-- Tax & Salary FAQ -->
        <div class="faq-cat">
          <h4>Tax & Salary</h4>
          <div class="faq-item">
            <div class="faq-question">How is my take-home pay calculated?</div>
            <div class="faq-answer">Take-home pay is your gross salary minus taxes, Social Security, Medicare, and other deductions. Our calculator estimates these based on your inputs.</div>
          </div>
          <div class="faq-item">
            <div class="faq-question">Why is my net income lower than my salary?</div>
            <div class="faq-answer">Your net income is reduced by federal taxes, state taxes, retirement contributions, and benefits deductions.</div>
          </div>
          <div class="faq-item">
            <div class="faq-question">Does the calculator include state tax?</div>
            <div class="faq-answer">Yes. Depending on your inputs, state tax and local deductions can be estimated.</div>
          </div>
        </div>
        <!-- Retirement FAQ -->
        <div class="faq-cat">
          <h4>Retirement</h4>
          <div class="faq-item">
            <div class="faq-question">How much should I save for retirement?</div>
            <div class="faq-answer">Financial experts often recommend saving 10–15% of income annually, but the exact amount depends on your retirement goals.</div>
          </div>
          <div class="faq-item">
            <div class="faq-question">Can I estimate 401(k) growth?</div>
            <div class="faq-answer">Yes. Our retirement calculator estimates long-term savings based on contribution rate and expected return.</div>
          </div>
        </div>
        <!-- Investment FAQ -->
        <div class="faq-cat">
          <h4>Investment</h4>
          <div class="faq-item">
            <div class="faq-question">How is investment return calculated?</div>
            <div class="faq-answer">Investment returns are estimated using contribution amount, time horizon, and expected annual return rate.</div>
          </div>
          <div class="faq-item">
            <div class="faq-question">What is a good annual return rate?</div>
            <div class="faq-answer">Historically, stock market returns average around 7–10% annually, but actual results vary.</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-note">© Free Financial Calculators — All tools are free, no signup needed.</div>
  </div>
</template>

<script>
export default {
  name: 'FinancialToolsHome',
  mounted() {
    // 将长破折号 — 替换为普通的连字符 -
    document.title = 'Financial Calculators - Free Tax, Paycheck, VAT, Mortgage, Investment & Retirement Calculators';
    // 2. 设置关键meta标签（Google最关注的）
    this.setGoogleMetaTags()

    this.injectJsonLdToHead()
    // 延迟再次注入，确保不被覆盖
    setTimeout(() => {
      this.injectJsonLdToHead()
    }, 1000)
   
  },
  methods: {
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
        "name": "Financial Calculators — Free Tax, Paycheck, VAT, Mortgage, Investment & Retirement Calculators",
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}
.financial-home {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background-color: #f8fafc;
  color: #0f172a;
  line-height: 1.5;
}
h1 {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
  color: #0a2540;
}
h2 {
  font-size: 2rem;
  font-weight: 600;
  margin: 2.5rem 0 1.5rem;
  color: #1e293b;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}
h3 {
  font-size: 1.35rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem;
  color: #334155;
}
.subhead {
  font-size: 1.1rem;
  color: #475569;
  margin-bottom: 2rem;
}
/* categories grid */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}
.category-card {
  background: white;
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.02);
  border: 1px solid #e9eef3;
  transition: transform 0.1s ease;
}
.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 30px -10px rgba(0,100,200,0.1);
}
.category-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(145deg, #eef2ff, #e0e7ff);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
  color: #2563eb;
  font-size: 1.8rem;
}
.category-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
}
.popular-list {
  list-style: none;
  margin: 1rem 0;
}
.popular-list li {
  margin: 0.6rem 0;
}
.popular-list a {
  text-decoration: none;
  color: #2563eb;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px dotted transparent;
  transition: border-color 0.2s;
}
.popular-list a:hover {
  border-bottom: 1px dotted #2563eb;
}
.btn-link {
  display: inline-block;
  margin-top: 1.2rem;
  font-weight: 600;
  color: #0f172a;
  background: #f1f5f9;
  padding: 0.5rem 1.2rem;
  border-radius: 40px;
  text-decoration: none;
  font-size: 0.95rem;
  border: 1px solid #cbd5e1;
  transition: 0.2s;
}
.btn-link i {
  margin-left: 6px;
  font-size: 0.8rem;
}
.btn-link:hover {
  background: #e2e8f0;
  border-color: #94a3b8;
}
.btn-primary {
  background: #0f172a;
  color: white;
  border: none;
  padding: 0.8rem 2.5rem;
  border-radius: 60px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  border: 1px solid #0f172a;
  transition: 0.2s;
}
.btn-primary:hover {
  background: #1e293b;
}
.all-calculators-row {
  display: flex;
  justify-content: center;
  margin: 3rem 0 1rem;
}
/* featured section */
.featured-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  background: #ffffffd6;
  padding: 2rem;
  border-radius: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
  border: 1px solid #dee7ef;
  margin: 1.5rem 0;
}
.featured-item {
  flex: 1 1 250px;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.featured-item i {
  font-size: 2rem;
  color: #2563eb;
  background: #eef2ff;
  padding: 0.8rem;
  border-radius: 18px;
}
.featured-item a {
  font-weight: 600;
  color: #1e293b;
  text-decoration: none;
  font-size: 1.15rem;
}
.featured-item a:hover {
  color: #2563eb;
  text-decoration: underline;
}
/* steps / how it works */
.steps-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 2rem 0;
}
.step {
  flex: 1 1 250px;
  background: white;
  padding: 1.8rem 1.5rem;
  border-radius: 1.8rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 8px 20px -8px rgba(0,34,64,0.08);
}
.step-number {
  background: #0f172a;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-bottom: 1.2rem;
}
.step h4 {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
}
.step p {
  color: #475569;
}
/* why use us grid */
.why-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}
.why-card {
  background: white;
  border-radius: 1.5rem;
  padding: 1.8rem;
  border: 1px solid #e2e8f0;
}
.why-card h4 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.why-card ul {
  list-style: none;
}
.why-card li {
  margin: 0.7rem 0;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #334155;
}
.why-card li i {
  color: #2563eb;
  font-size: 0.9rem;
}
.faq-section {
  margin: 2rem 0 3rem;
}
.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
.faq-cat h4 {
  font-size: 1.25rem;
  margin: 1.5rem 0 1rem;
  color: #0f172a;
}
.faq-item {
  margin: 1.2rem 0;
}
.faq-question {
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.25rem;
}
.faq-answer {
  color: #475569;
  font-size: 0.95rem;
  padding-left: 0.5rem;
  border-left: 3px solid #cbd5e1;
  padding-left: 1rem;
}
hr {
  border: 1px solid #e2e8f0;
  margin: 2rem 0;
}
.footer-note {
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;
  margin-top: 4rem;
}
</style>
