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
    <h1>📊 Auto Calculators</h1>
    <p class="category-description">
      A comprehensive Auto calculator suite to Estimate monthly payments with the Auto Loan Calculator, evaluate savings with the Cash Back or Low Interest Calculator, and calculate lease costs with the Auto Lease Calculator to find the best option for your budget.
    </p>

    <!-- Calculators Grid -->
    <div class="calculators-grid">
      <!-- Auto Loan Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-percent"></i></div>
        <div class="card-content">
          <h3>Auto Loan Calculator</h3>
          <p>An Auto Loan Calculator helps you estimate monthly car payments, interest costs, and total loan expenses based on loan amount, rate, term, and down payment.</p>
          <a href="/calculators/interest" class="card-link" @click.prevent="navigate">Open Calculator →</a>
        </div>
      </div>

      <!-- Cash Back or Low Interest Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-chart-line"></i></div>
        <div class="card-content">
          <h3>Cash Back or Low Interest Calculator</h3>
          <p>Compare cash back and low interest offers to see which auto financing option saves you more.</p>
          <a href="/calculators/investment" class="card-link" @click.prevent="navigate">Open Calculator →</a>
        </div>
      </div>

      <!-- Auto Lease Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-calculator"></i></div>
        <div class="card-content">
          <h3>Auto Lease Calculator</h3>
          <p>An Auto Lease Calculator helps you estimate monthly lease payments based on vehicle price, residual value, money factor, lease term, and down payment.</p>
          <a href="/calculators/finance" class="card-link" @click.prevent="navigate">Open Calculator →</a>
        </div>
      </div>
    </div>

    <!-- Back to Home / All Calculators Link -->
    <div class="back-links">
      <a href="/dashboard" class="back-link">← Back to Home</a>
      <a href="#/a/all-calculators" class="back-link" >All Calculators →</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvestmentCalculators',
  methods: {
    navigate(event) {
      event.preventDefault();
      const path = event.currentTarget.getAttribute('href');
      // In a real Vue Router app you'd use: this.$router.push(path)
      console.log(`Navigate to: ${path}`);
      alert(`[Demo] This would navigate to ${path} — integrate with router for full functionality.`);
    }
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