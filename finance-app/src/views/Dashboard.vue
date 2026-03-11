<template>
  <div class="layout-container">
    <!-- <Sidebar />  -->
    <div class="main-content">
      <TopHeader :page-title="currentPageTitle" />
      <!-- 新增的广告区域 - 位于TopHeader下方，main-content内部 -->
        <div class="ad-banner">
              <p>Your ad could be here</p>
        </div>

      <div class="content-area">
       <router-view v-slot="{ Component, route }">
          <component :is="Component" :key="route.fullPath"/>
       </router-view>
      </div>
    </div>
    <Foot />
  </div>
</template>

<script>
// import Sidebar from '../components/Sidebar.vue'
import TopHeader from '../components/TopHeader.vue'
import Foot from '../components/Foot.vue'

export default {
  name: 'Dashboard',
  components: {
   // Sidebar,
    TopHeader,
    Foot
  },
  computed: {
    currentPageTitle() {
      return ''
      /*
      const routeName = this.$route.name
      switch (routeName) {
        case 'GlobalPriceCalculator':
          return 'Global VAT Calculator'
        case 'PaycheckCalculator':
          return 'Paycheck Calculator'
        case 'IncomeTaxCalculator':
          return 'Income Tax Calculator'
        case 'DashboardHome':
          return 'Dashboard'
        default:
          return 'Taxo Finance Apps'
      }
      */
    }
  },
  mounted() {
    //this.injectJsonLd()
  },
  watch: {
    '$route.path': {
      handler() {
       // this.injectJsonLd()
      }
    }
  },
  methods: {
    /*
    injectJsonLd() {
      // 移除旧的JSON-LD
      const oldScripts = document.querySelectorAll('script[type="application/ld+json"]')
      oldScripts.forEach(script => {
        if (script.parentElement === document.head) {
          script.remove()
        }
      })
      
      const currentRoute = this.$route.path
      const baseUrl = window.location.origin
      
      let jsonLd = null
      
      // 根据页面生成相应的JSON-LD
      if (currentRoute.includes('/dashboard/global-price')) {
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Global VAT Calculator",
          "url": baseUrl + currentRoute,
          "description": "Calculate product prices with taxes and fees across different countries",
          "applicationCategory": "FinanceApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }
      } else if (currentRoute.includes('/dashboard/paycheck')) {
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Paycheck Calculator",
          "url": baseUrl + currentRoute,
          "description": "Calculate net pay, taxes, and deductions for employees",
          "applicationCategory": "FinanceApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }
      } else if (currentRoute.includes('/dashboard/income-tax')) {
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Income Tax Calculator",
          "url": baseUrl + currentRoute,
          "description": "Calculate income tax based on federal and state brackets",
          "applicationCategory": "FinanceApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }
      }
      
      // 将JSON-LD注入到head
      if (jsonLd) {
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.textContent = JSON.stringify(jsonLd, null, 2)
        document.head.appendChild(script)
      }
    }
    */
  }
}
</script>

<style scoped>

/* 广告区域样式 */
.ad-banner {
  margin: 15px 0 25px 0;
  width: 100%;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9eef3;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  height:100px;
  display: none;
}

@media (max-width: 768px) {
  .ad-content {
    min-height: 80px;
    display: none;
  }
}
</style>
