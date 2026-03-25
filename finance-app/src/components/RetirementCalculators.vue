<template>
<!-- 添加home连接，距离下面的div有间距 
  <div style="max-width: 1280px; margin: 20px auto 0; padding: 0 1.5rem;">
    <div style="margin-bottom: 20px;">
      <a href="/dashboard" style="color: #4f46e5; text-decoration: none; font-weight: 500; font-size: 1rem;">Home</a>
    </div>
  </div>
-->
  <div class="retirement-page">

    <!-- Header -->
    <h1>📈 Retirement Calculators</h1>
    <p class="category-description">
      A comprehensive retirement planning suite with calculators for retirement savings, 401(k), pensions, Social Security benefits, annuities, IRA and Roth IRA growth, and required minimum distributions (RMD) to help you estimate future income and plan long-term financial security.
    </p>

    <!-- Calculators Grid -->
    <div class="calculators-grid">
      <!-- Retirement Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-umbrella-beach"></i></div>
        <div class="card-content">
          <h3>Retirement Calculator</h3>
          <p>Estimate how much you need to save for retirement and project your future nest egg based on current savings, contributions, and expected returns.</p>
          <a href="/retirement" class="card-link">Open Calculator →</a>
        </div>
      </div>

      <!-- 401K Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-piggy-bank"></i></div>
        <div class="card-content">
          <h3>401(k) Calculator</h3>
          <p>Calculate your 401(k) balance at retirement including employer match, contribution growth, and investment returns over time.</p>
          <a href="/401k" class="card-link">Open Calculator →</a>
        </div>
      </div>

      <!-- Pension Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-briefcase"></i></div>
        <div class="card-content">
          <h3>Pension Calculator</h3>
          <p>Estimate your monthly pension income based on years of service, salary history, and pension plan formulas.</p>
          <a href="/pension" class="card-link">Open Calculator →</a>
        </div>
      </div>

      <!-- Social Security Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-id-card"></i></div>
        <div class="card-content">
          <h3>Social Security Calculator</h3>
          <p>Project your Social Security benefits at different claiming ages and understand how earnings history affects your payout.</p>
          <a href="/social-security" class="card-link" >Open Calculator →</a>
        </div>
      </div>

      <!-- Annuity Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-chart-pie"></i></div>
        <div class="card-content">
          <h3>Annuity Calculator</h3>
          <p>Determine the future value of an annuity or calculate the income stream you can expect from an annuity investment.</p>
          <a href="/annuity" class="card-link" >Open Calculator →</a>
        </div>
      </div>

      <!-- Annuity Payout Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-hand-holding-heart"></i></div>
        <div class="card-content">
          <h3>Annuity Payout Calculator</h3>
          <p>Calculate periodic payouts from an annuity based on principal, interest rate, and payout duration.</p>
          <a href="/annuity-payout" class="card-link" >Open Calculator →</a>
        </div>
      </div>

      <!-- Roth IRA Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-leaf"></i></div>
        <div class="card-content">
          <h3>Roth IRA Calculator</h3>
          <p>Project the tax-free growth of your Roth IRA contributions and see the impact of different contribution strategies.</p>
          <a href="/roth-ira" class="card-link" >Open Calculator →</a>
        </div>
      </div>

      <!-- IRA Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-coins"></i></div>
        <div class="card-content">
          <h3>IRA Calculator</h3>
          <p>Estimate the future value of traditional IRA accounts, including tax-deferred growth and contribution limits.</p>
          <a href="/ira-calculator" class="card-link" >Open Calculator →</a> 
        </div>
      </div>

      <!-- RMD Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-calendar-check"></i></div>
        <div class="card-content">
          <h3>RMD Calculator</h3>
          <p>Calculate Required Minimum Distributions from your retirement accounts after age 73 to avoid IRS penalties.</p>
          <!-- <a href="/calculators/finance" class="card-link" @click.prevent="navigate">Open Calculator →</a> -->
        </div>
      </div>
    </div>

    <!-- Back to Home / All Calculators Link -->
    <div class="back-links">
      <a href="/" class="back-link">← Back to Home</a>
      <a href="/all-calculators" class="back-link">All Calculators →</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RetirementCalculators',
    methods: {
    setGoogleMetaTags() {
      // 确保description存在且内容正确
      let desc = document.querySelector('meta[name="description"]')
      if (!desc) {
        desc = document.createElement('meta')
        desc.name = 'description'
        document.head.appendChild(desc)
      }
      desc.content = 'Explore free retirement calculators to estimate savings, retirement income, pension benefits, and 401(k) growth. Plan your future with tools for retirement planning, withdrawals, and long-term financial security.'
      
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
    document.title = 'Retirement Calculators – Savings, Income, Pension & 401(k) Planning Tools'
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
.retirement-page {
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
  max-width: 900px;
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
