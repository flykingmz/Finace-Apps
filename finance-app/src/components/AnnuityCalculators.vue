<template>
<!-- 添加home连接，距离下面的div有间距 
  <div style="max-width: 1280px; margin: 20px auto 0; padding: 0 1.5rem;">
    <div style="margin-bottom: 20px;">
      <a href="/dashboard" style="color: #4f46e5; text-decoration: none; font-weight: 500; font-size: 1rem;">Home</a>
    </div>
  </div>
-->
  <div class="annuity-page">

    <!-- Header -->
    <h1>📈 Annuity Calculators</h1>
    <p class="category-description">
      Explore powerful annuity calculators to estimate retirement income and investment growth. Use our annuity payout, deferred annuity calculator, fixed annuity calculator, indexed annuity calculator, and annuity withdrawal calculator to plan your financial future with confidence.
    </p>

    <!-- Calculators Grid -->
    <div class="calculators-grid">
      <!-- annuity payout calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-umbrella-beach"></i></div>
        <div class="card-content">
          <h3>Annuity Payout Calculator</h3>
          <p>Calculate periodic payouts from an annuity based on principal, interest rate, and payout duration.</p>
          <a href="/annuity-payout" class="card-link" >Open Calculator →</a>
        </div>
      </div>

      <!-- Annuity Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-piggy-bank"></i></div>
        <div class="card-content">
          <h3>Annuity Calculator</h3>
          <p>Estimate the future value of an annuity or calculate the income stream you can expect from an annuity investment.</p>
           <a href="/annuity" class="card-link" >Open Calculator →</a>
        </div>
      </div>

      <!-- deferred annuity calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-briefcase"></i></div>
        <div class="card-content">
          <h3>Deferred annuity calculator</h3>
          <p>Planning for retirement can be challenging, but a deferred annuity helps secure your future income.</p>
          <a href="/deferred-annuity" class="card-link">Open Calculator →</a>
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
  name: 'AnnuityCalculators',
  methods: {
    setGoogleMetaTags() {
      // 确保description存在且内容正确
      let desc = document.querySelector('meta[name="description"]')
      if (!desc) {
        desc = document.createElement('meta')
        desc.name = 'description'
        document.head.appendChild(desc)
      }
      desc.content = 'Explore free annuity calculators to estimate annuity payout, growth, and retirement income. Use our annuity payout calculator, deferred annuity calculator, fixed and indexed annuity tools to plan withdrawals and maximize your long-term returns.'
      
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
    document.title = 'Annuity Calculators – Estimate Payout, Growth, Withdrawal & Retirement Income'
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
.annuity-page {
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
