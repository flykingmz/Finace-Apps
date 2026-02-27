<template>
<!-- 添加home连接，距离下面的div有间距 
  <div style="max-width: 1280px; margin: 20px auto 0; padding: 0 1.5rem;">
    <div style="margin-bottom: 20px;">
      <a href="/dashboard" style="color: #4f46e5; text-decoration: none; font-weight: 500; font-size: 1rem;">Home</a>
    </div>
  </div>
-->
  <div class="mortgage-page">
    <!-- Header -->
    <h1>🏠 Mortgage and Real Estate Calculators</h1>
    <p class="category-description">
      An all-in-one mortgage and real estate calculator suite to estimate home affordability, loan payments, refinancing savings, rent vs. buy costs, property investment returns, APR, down payments, and long-term housing expenses for smarter real estate decisions.
    </p>

    <!-- Calculators Grid -->
    <div class="calculators-grid">
      <!-- Mortgage Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-home"></i></div>
        <div class="card-content">
          <h3>Mortgage Calculator</h3>
          <p>Calculate monthly mortgage payments including principal, interest, taxes, and insurance (PITI) for any loan amount and term.</p>
          <a href="/calculators/mortgage" class="card-link" @click.prevent="navigate">Open Calculator →</a>
        </div>
      </div>

      <!-- Amortization Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-chart-bar"></i></div>
        <div class="card-content">
          <h3>Amortization Calculator</h3>
          <p>View detailed loan amortization schedules showing principal vs. interest payments over the life of your loan.</p>
          <a href="/calculators/amortization" class="card-link" @click.prevent="navigate">Open Calculator →</a>
        </div>
      </div>

      <!-- Mortgage Payoff Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-check-circle"></i></div>
        <div class="card-content">
          <h3>Mortgage Payoff Calculator</h3>
          <p>See how extra payments can shorten your loan term and reduce total interest paid.</p>
          <a href="/calculators/mortgage-payoff" class="card-link" @click.prevent="navigate">Open Calculator →</a>
        </div>
      </div>

      <!-- House Affordability Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-coins"></i></div>
        <div class="card-content">
          <h3>House Affordability Calculator</h3>
          <p>Determine how much house you can afford based on income, debt, down payment, and current interest rates.</p>
          <a href="/calculators/house-affordability" class="card-link" @click.prevent="navigate">Open Calculator →</a>
        </div>
      </div>

      <!-- Rent Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-key"></i></div>
        <div class="card-content">
          <h3>Rent Calculator</h3>
          <p>Compare renting costs across different properties and estimate annual rent expenses.</p>
          <a href="/calculators/rent" class="card-link" @click.prevent="navigate">Open Calculator →</a>
        </div>
      </div>

      <!-- Debt-to-Income Ratio Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-scale-balanced"></i></div>
        <div class="card-content">
          <h3>Debt-to-Income Ratio Calculator</h3>
          <p>Calculate your front-end and back-end DTI ratios to understand your borrowing capacity.</p>
          <a href="/calculators/debt-to-income" class="card-link" @click.prevent="navigate">Open Calculator →</a>
        </div>
      </div>

      <!-- Real Estate Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-building"></i></div>
        <div class="card-content">
          <h3>Real Estate Calculator</h3>
          <p>Analyze property values, ROI, and cash flow for residential or commercial real estate investments.</p>
          <a href="/calculators/real-estate" class="card-link" @click.prevent="navigate">Open Calculator →</a>
        </div>
      </div>

      <!-- Refinance Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-rotate"></i></div>
        <div class="card-content">
          <h3>Refinance Calculator</h3>
          <p>Compare your current mortgage with refinance options to see potential savings and break-even points.</p>
          <a href="/calculators/refinance" class="card-link" @click.prevent="navigate">Open Calculator →</a>
        </div>
      </div>

      <!-- Rental Property Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-house-circle-check"></i></div>
        <div class="card-content">
          <h3>Rental Property Calculator</h3>
          <p>Evaluate rental property cash flow, cap rate, cash-on-cash return, and overall investment performance.</p>
          <a href="/calculators/rental-property" class="card-link" @click.prevent="navigate">Open Calculator →</a>
        </div>
      </div>

      <!-- APR Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-percent"></i></div>
        <div class="card-content">
          <h3>APR Calculator</h3>
          <p>Calculate the Annual Percentage Rate including interest, fees, and other loan costs for apples-to-apples comparisons.</p>
          <a href="/calculators/apr" class="card-link" @click.prevent="navigate">Open Calculator →</a>
        </div>
      </div>

      <!-- FHA Loan Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-hand-holding-heart"></i></div>
        <div class="card-content">
          <h3>FHA Loan Calculator</h3>
          <p>Estimate payments for FHA loans including upfront and annual mortgage insurance premiums (MIP).</p>
          <a href="/calculators/fha-loan" class="card-link" @click.prevent="navigate">Open Calculator →</a>
        </div>
      </div>

      <!-- VA Mortgage Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-shield"></i></div>
        <div class="card-content">
          <h3>VA Mortgage Calculator</h3>
          <p>Calculate VA loan payments, funding fees, and affordability for eligible veterans and service members.</p>
          <a href="/calculators/va-mortgage" class="card-link" @click.prevent="navigate">Open Calculator →</a>
        </div>
      </div>

      <!-- Home Equity Loan Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-house-chimney"></i></div>
        <div class="card-content">
          <h3>Home Equity Loan Calculator</h3>
          <p>Determine how much you can borrow with a home equity loan and estimate monthly payments.</p>
          <a href="/calculators/home-equity-loan" class="card-link" @click.prevent="navigate">Open Calculator →</a>
        </div>
      </div>

      <!-- HELOC Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-water"></i></div>
        <div class="card-content">
          <h3>HELOC Calculator</h3>
          <p>Estimate draw period payments and repayment phase costs for a Home Equity Line of Credit.</p>
          <a href="/calculators/heloc" class="card-link" @click.prevent="navigate">Open Calculator →</a>
        </div>
      </div>

      <!-- Down Payment Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-money-bill"></i></div>
        <div class="card-content">
          <h3>Down Payment Calculator</h3>
          <p>Calculate the down payment needed for a home and see how it affects monthly payments and PMI.</p>
          <a href="/calculators/down-payment" class="card-link" @click.prevent="navigate">Open Calculator →</a>
        </div>
      </div>

      <!-- Rent vs. Buy Calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-scale-balanced"></i></div>
        <div class="card-content">
          <h3>Rent vs. Buy Calculator</h3>
          <p>Compare the financial outcomes of renting versus buying a home based on your time horizon and local market.</p>
          <a href="/calculators/rent-vs-buy" class="card-link" @click.prevent="navigate">Open Calculator →</a>
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
  name: 'MortgageRealEstateCalculators',
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
.mortgage-page {
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