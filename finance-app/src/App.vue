<template>
 <Analytics />
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { Analytics } from '@vercel/analytics/vue'

export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>