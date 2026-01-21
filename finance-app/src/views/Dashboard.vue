<template>
  <div class="layout-container">
    <Sidebar />
    <div class="main-content">
      <TopHeader :page-title="currentPageTitle" />
      <div class="content-area">
        <!-- 添加 key 强制组件在路由变化时重新渲染 -->
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
      console.log('Dashboard route name:', routeName)
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
    console.log('Dashboard mounted with route:', this.$route.path)
    
    // 监听路由变化事件
    window.addEventListener('route-changed', this.handleRouteChange)
  },
  beforeUnmount() {
    window.removeEventListener('route-changed', this.handleRouteChange)
  },
  methods: {
    handleRouteChange(event) {
      console.log('Route change event received:', event.detail)
      // 强制更新 Dashboard 组件
      this.$forceUpdate()
    }
  },
  watch: {
    // 深度监听路由变化
    '$route': {
      handler(to, from) {
        console.log('Route changed from:', from.path, 'to:', to.path)
        // 强制更新组件
        this.$forceUpdate()
      },
      deep: true,
      immediate: true
    }
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
  font-size: 1.2rem;
}
</style>