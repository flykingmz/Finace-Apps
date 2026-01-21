<template>
  <div class="layout-container">
    <Sidebar />
    <div class="main-content">
      <TopHeader :page-title="currentPageTitle" />
      <div class="content-area">
        <router-view v-slot="{ Component }">
          <component :is="Component" v-if="Component" />
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
      console.log('Route name:', routeName)
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
    console.log('Dashboard mounted')
    console.log('Current route:', this.$route)
  }
}
</script>

<style scoped>
.layout-container {
  display: flex;
  height: 100vh;
  width: 100%;
}

.loading-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
}
</style>