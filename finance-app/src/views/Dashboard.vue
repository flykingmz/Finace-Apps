<template>
  <div class="layout-container">
    <Sidebar />
    <div class="main-content">
      <TopHeader :page-title="currentPageTitle" />
      <div class="content-area">
        <router-view />
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
        default:
          return 'Dashboard'
      }
    }
  }
}
</script>