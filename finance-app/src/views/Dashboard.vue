<template>
  <div class="layout-container">
    <Sidebar />
    <div class="main-content">
      <TopHeader :page-title="currentPageTitle" />
      <div class="content-area">
        <router-view v-slot="{ Component, route }">
          <component 
            :is="Component" 
            :key="route.fullPath"
            v-if="Component"
          />
          <div v-else class="loading-content">
            Loading content...
          </div>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import TopHeader from '../components/TopHeader.vue'

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    TopHeader
  },
  computed: {
    currentPageTitle() {
      const routeName = this.$route.name
      switch (routeName) {
        case 'GlobalPriceCalculator':
          return 'Global Price Calculator'
        case 'PaycheckCalculator':
          return 'Paycheck Calculator'
        case 'IncomeTaxCalculator':
          return 'Income Tax Calculator'
        case 'DashboardHome':
          return 'Dashboard'
        default:
          return 'Finance Apps'
      }
    }
  },
  mounted() {
    this.injectJsonLd()
  },
  watch: {
    '$route.path': {
      handler() {
        this.injectJsonLd()
      }
    }
  },
  methods: {
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
          "name": "Global Price Calculator",
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
  }
}
</script>