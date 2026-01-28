<template>
 <Analytics />
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { Analytics } from '@vercel/analytics/vue'

export default {
  name: 'App',
  
  // 2. 注册组件
  components: {
    Analytics
  }
}
</script>

<style scoped>
#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>