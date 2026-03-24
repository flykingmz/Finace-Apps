<template>
  <div class="layout-container">
    <!-- <Sidebar />  -->
    <div class="main-content">
      <TopHeader :page-title="currentPageTitle" />
      <!-- 新增的广告区域 - 位于TopHeader下方，main-content内部 -->
        <div class="ad-banner">
        <div class="ad-content">
        <!-- 广告内容，如 Google AdSense 代码或自定义广告图片 -->
         <img src="/logo-i.png" alt="广告" style="width:100%; height:100%; object-fit: cover;">
        </div>
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
/* 广告区域样式 - PC端和移动端适配 */
.ad-banner {
  margin: 15px 0 25px 0;
  background: white;
  border-radius: 12px;
  border: 1px solid #e9eef3;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  display:none;
}

/* PC端样式 - 300x250 */
@media (min-width: 769px) {
  .ad-banner {
    width: 300px;
    height: 250px;
    margin-left: auto;
    margin-right: auto;
  }
  .ad-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* 移动端样式 - 320x50 */
@media (max-width: 768px) {
  .ad-banner {
    width: 100%;
    max-width: 320px;
    height: 50px;
    margin-left: auto;
    margin-right: auto;
  }
  .ad-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
