<template>
<!-- 添加home连接，距离下面的div有间距 
  <div style="max-width: 1280px; margin: 20px auto 0; padding: 0 1.5rem;">
    <div style="margin-bottom: 20px;">
      <a href="/dashboard" style="color: #4f46e5; text-decoration: none; font-weight: 500; font-size: 1rem;">Home</a>
    </div>
  </div>
-->
  <div class="investment-page">
    <!-- Header -->
    <h1>📊 Investment Calculators</h1>
    <p class="category-description">
      A comprehensive investment calculator suite to estimate returns, interest growth, savings projections, compound earnings, ROI, IRR, bond and mutual fund performance, and future value to help you make smarter financial decisions.
    </p>

    <!-- Calculators Grid -->
    <div class="calculators-grid">
    <!-- Investment Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-chart-line"></i></div>
        <div class="card-content">
          <h3>Investment Calculator</h3>
          <p>Estimate how your investments could grow over time. Calculate future value, compound returns, and potential earnings based on your initial investment, contribution amount, and expected rate of return.</p>
          <a href="/investment" class="card-link" >Open Calculator →</a>
        </div>
      </div>
      
      <!-- Interest Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-percent"></i></div>
        <div class="card-content">
          <h3>Interest Calculator</h3>
          <p>Use this free Interest Calculator to quickly estimate simple or compound interest on loans, savings, or investments. Enter the principal amount, interest rate, and time period to see how much interest you will earn or pay.</p>
          <a href="/interest" class="card-link">Open Calculator →</a>
        </div>
      </div>

      <!-- CD Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-certificate"></i></div>
        <div class="card-content">
          <h3>CD Calculator</h3>
          <p>Calculate Certificate of Deposit maturity amounts and interest earnings for any term and rate.</p>
          <a href="/certificate-deposit" class="card-link" >Open Calculator →</a>
        </div>
      </div>

      <!-- Finance Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-calculator"></i></div>
        <div class="card-content">
          <h3>Finance Calculator (Coming Soon)</h3>
          <p>Solve for any variable in financial equations — PV, FV, PMT, rate, or periods — quickly and accurately.</p>
          <!-- <a href="/calculators/finance" class="card-link" @click.prevent="navigate">Open Calculator →</a> -->
        </div>
      </div>

      <!-- Compound Interest Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-seedling"></i></div>
        <div class="card-content">
          <h3>Compound Interest Calculator</h3>
          <p>See how your money grows with compound interest — daily, monthly, yearly, or continuously.</p>
          <!-- <a href="/calculators/finance" class="card-link" @click.prevent="navigate">Open Calculator →</a> -->
        </div>
      </div>

      <!-- Interest Rate Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-arrow-trend-up"></i></div>
        <div class="card-content">
          <h3>Interest Rate Calculator</h3>
          <p>Find the effective interest rate on loans or investments given principal, time, and total interest.</p>
         <!-- <a href="/calculators/finance" class="card-link" @click.prevent="navigate">Open Calculator →</a> -->
        </div>
      </div>

      <!-- Savings Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-piggy-bank"></i></div>
        <div class="card-content">
          <h3>Savings Calculator</h3>
          <p>Estimate the future value of your savings with regular deposits and compounding interest.</p>
          <!-- <a href="/calculators/finance" class="card-link" @click.prevent="navigate">Open Calculator →</a> -->
        </div>
      </div>

      <!-- Simple Interest Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-plus-circle"></i></div>
        <div class="card-content">
          <h3>Simple Interest Calculator</h3>
          <p>Quickly compute simple interest for loans or investments using principal × rate × time.</p>
          <!-- <a href="/calculators/finance" class="card-link" @click.prevent="navigate">Open Calculator →</a> -->
        </div>
      </div>


      <!-- Bond Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-link"></i></div>
        <div class="card-content">
          <h3>Bond Calculator</h3>
          <p>Determine bond prices, yields to maturity, coupon payments, and current yield for fixed-income securities.</p>
          <!-- <a href="/calculators/finance" class="card-link" @click.prevent="navigate">Open Calculator →</a> -->
        </div>
      </div>

      <!-- Mutual Fund Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-chart-pie"></i></div>
        <div class="card-content">
          <h3>Mutual Fund Calculator</h3>
          <p>Estimate mutual fund returns including expense ratios, dividends, and capital gains distributions.</p>
          <!-- <a href="/calculators/finance" class="card-link" @click.prevent="navigate">Open Calculator →</a> -->
        </div>
      </div>

      <!-- Average Return Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-chart-simple"></i></div>
        <div class="card-content">
          <h3>Average Return Calculator</h3>
          <p>Compute arithmetic average, geometric average, and CAGR for a series of investment returns.</p>
          <!-- <a href="/calculators/finance" class="card-link" @click.prevent="navigate">Open Calculator →</a> -->
        </div>
      </div>

      <!-- IRR Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-arrow-right-arrow-left"></i></div>
        <div class="card-content">
          <h3>IRR Calculator</h3>
          <p>Calculate Internal Rate of Return for a series of cash flows to evaluate investment profitability.</p>
          <!-- <a href="/calculators/finance" class="card-link" @click.prevent="navigate">Open Calculator →</a> -->
        </div>
      </div>

      <!-- ROI Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-bullseye"></i></div>
        <div class="card-content">
          <h3>ROI Calculator</h3>
          <p>Measure Return on Investment as a percentage and compare efficiency across different investments.</p>
          <!-- <a href="/calculators/finance" class="card-link" @click.prevent="navigate">Open Calculator →</a> -->
        </div>
      </div>

      <!-- Payback Period Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-clock"></i></div>
        <div class="card-content">
          <h3>Payback Period Calculator</h3>
          <p>Determine how long it will take to recover an initial investment from expected cash flows.</p>
          <!-- <a href="/calculators/finance" class="card-link" @click.prevent="navigate">Open Calculator →</a> -->
        </div>
      </div>

      <!-- Present Value Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-money-bill-trend-up"></i></div>
        <div class="card-content">
          <h3>Present Value Calculator</h3>
          <p>Discount future cash flows to today's dollars using a specified discount rate.</p>
          <!-- <a href="/calculators/finance" class="card-link" @click.prevent="navigate">Open Calculator →</a> -->
        </div>
      </div>

      <!-- Future Value Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-eye"></i></div>
        <div class="card-content">
          <h3>Future Value Calculator</h3>
          <p>Project the future value of an investment or savings account with compounding interest.</p>
          <!-- <a href="/calculators/finance" class="card-link" @click.prevent="navigate">Open Calculator →</a> -->
        </div>
      </div>
    </div>

    <!-- Back to Home / All Calculators Link -->
    <div class="back-links">
      <a href="/" class="back-link">← Back to Home</a>
      <a href="/all-calculators" class="back-link" >All Calculators →</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvestmentCalculators',
  methods: {
    setGoogleMetaTags() {
      // 确保description存在且内容正确
      let desc = document.querySelector('meta[name="description"]')
      if (!desc) {
        desc = document.createElement('meta')
        desc.name = 'description'
        document.head.appendChild(desc)
      }
      desc.content = 'Explore free investment calculators to estimate ROI, compound interest, future value, and portfolio growth. Use our investment calculator, return on investment tools, and savings calculators to plan and optimize your financial future.'
      
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
    document.title = 'Investment Calculators – ROI, Compound Interest, Future Value & Portfolio Growth Tools'
    // 2. 设置关键meta标签（Google最关注的）
    this.setGoogleMetaTags()
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.investment-page {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  background-color: #f9fafc;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  color: #0f172a;
  line-height: 1.5;
}
h1 {
  font-size: 2.8rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0a2540;
  margin-bottom: 0.75rem;
}
.category-description {
  font-size: 1.2rem;
  color: #475569;
  max-width: 1000px;
  margin-bottom: 3rem;
  border-left: 4px solid #2563eb;
  padding-left: 1.5rem;
  background: #f1f5f9;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
}
.calculators-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
  margin: 2.5rem 0;
}
.calculator-card {
  background: white;
  border-radius: 1.8rem;
  padding: 1.8rem;
  box-shadow: 0 12px 30px -8px rgba(0, 34, 64, 0.06);
  border: 1px solid #e9edf3;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
}
.calculator-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 24px 40px -12px rgba(0, 100, 200, 0.2);
  border-color: #b9d1f0;
}
.card-icon {
  font-size: 2.5rem;
  color: #2563eb;
  background: #eef2ff;
  width: 60px;
  height: 60px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.3rem;
}
.card-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1e293b;
}
.card-content p {
  color: #475569;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}
.card-link {
  display: inline-block;
  font-weight: 600;
  color: #2563eb;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s;
  padding: 0.25rem 0;
}
.card-link:hover {
  border-bottom-color: #2563eb;
}
.back-links {
  margin-top: 4rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  border-top: 1px solid #dde3ea;
  padding-top: 2.5rem;
}
.back-link {
  color: #0f172a;
  text-decoration: none;
  font-weight: 500;
  padding: 0.6rem 1.8rem;
  background: white;
  border-radius: 40px;
  border: 1px solid #cbd5e1;
  transition: 0.2s;
}
.back-link:hover {
  background: #f1f5f9;
  border-color: #94a3b8;
}
</style>
