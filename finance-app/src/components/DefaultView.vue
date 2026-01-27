<template>
  <Analytics />
  <div class="default-view">

    <h1>Welcome to Taxo Finance Free Apps</h1>
    <p>Select a calculator from the sidebar to get started.</p>
    
    <div class="features">
      <div class="feature-card">
        <h3>💰 Global VAT Calculator</h3>
        <p>Brings you a free VAT calculator that helps you calculate VAT accurately regardless of the VAT rates</p>
      </div>
      <div class="feature-card">
        <h3>📊 Paycheck Calculator</h3>
        <p>Calculate net pay, taxes, and deductions for both salaried and hourly employees</p>
      </div>
      <div class="feature-card">
        <h3>📈 Income Tax Calculator</h3>
        <p>Estimate your income tax based on tax brackets</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultView',
  mounted() {
    console.log('injectJsonLdToHead script start.');
    document.title = 'Taxo Finance Apps - Free Financial Calculators'
    this.injectJsonLdToHead()
    // 延迟再次注入，确保不被覆盖
    setTimeout(() => {
      this.injectJsonLdToHead()
    }, 1000)
   
  },
  methods: {
    navigateTo(calculator) {
      this.$router.push(`/dashboard/${calculator}`)
    },
    
    injectJsonLdToHead() {
       
      const baseUrl = window.location.origin
      
      const jsonLd ={
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Taxo Finance Free Apps",
        "description": "Finance Free Apps including paycheck, income tax, and global VAT calculators",
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
      console.log('injectJsonLdToHead script loaded.');
    }
  }
}
</script>

<style scoped>
.default-view {
  padding: 20px;
}

.default-view h1 {
  font-size: 32px;
  margin-bottom: 20px;
  color: #1f2937;
}

.default-view p {
  font-size: 18px;
  color: #6b7280;
  margin-bottom: 40px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.feature-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  font-size: 22px;
  margin-bottom: 15px;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0;
}
</style>