<template>
<!-- 添加home连接，距离下面的div有间距 
  <div style="max-width: 1280px; margin: 20px auto 0; padding: 0 1.5rem;">
    <div style="margin-bottom: 20px;">
      <a href="/dashboard" style="color: #4f46e5; text-decoration: none; font-weight: 500; font-size: 1rem;">Home</a>
    </div>
  </div>
-->
  <div class="crypto-page">

    <!-- Header -->
    <h1>📈 crypto Calculators</h1>
    <p class="category-description">
      Easily calculate your cryptocurrency taxes and earnings with our comprehensive crypto calculators. Track Bitcoin taxes, crypto staking rewards, mining income, DeFi investment returns, NFT tax obligations, and crypto tax-loss harvesting to quickly understand your tax liabilities and optimize your crypto portfolio.
    </p>

    <!-- Calculators Grid -->
    <div class="calculators-grid">
      <!-- annuity payout calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-umbrella-beach"></i></div>
        <div class="card-content">
          <h3>Crypto Tax Calculator</h3>
          <p>Estimate your cryptocurrency tax instantly with our Crypto Tax Calculator. Calculate capital gains for Bitcoin and other digital assets across the USA, UK, Canada, and Australia. Supports both single-asset and multi-asset crypto portfolios to help you understand potential tax liabilities.</p>
          <a href="/crypto-tax-calculator" class="card-link" >Open Calculator →</a>
        </div>
      </div>

      <!-- Defi tax calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-piggy-bank"></i></div>
        <div class="card-content">
          <h3>Defi tax calculator</h3>
          <p>Accurately calculate your decentralized finance (DeFi) taxes with our DEFI Tax Calculator. Track crypto gains, losses, staking, yield farming, and NFT transactions. Perfect for investors, traders, and crypto enthusiasts looking to stay tax-compliant.</p>
           <a href="#" class="card-link" >Open Calculator →</a>
        </div>
      </div>

      <!-- NFT tax calculator -->
      <div class="calculator-card">
        <div class="card-icon"><i class="fas fa-briefcase"></i></div>
        <div class="card-content">
          <h3>NFT tax calculator</h3>
          <p>Our NFT Tax Calculator helps NFT collectors and investors accurately calculate taxes on NFT sales, trades, and transfers. Easily track gains, losses, and taxable events for digital collectibles, optimize your tax reporting, and stay compliant with crypto tax regulations. This free online NFT tax calculator simplifies NFT tax planning, making it easy to estimate capital gains, losses, and reporting requirements for every NFT transaction.</p>
          <a href="#" class="card-link">Open Calculator →</a>
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
.crypto-page {
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
