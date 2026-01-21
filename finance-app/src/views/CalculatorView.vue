<template>
  <div class="calculator-view">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'CalculatorView'
}
</script>

<style scoped>
.calculator-view {
  height: 100%;
  width: 100%;
}
</style>