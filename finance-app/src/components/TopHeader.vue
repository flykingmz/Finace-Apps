<template>
  <div class="top-header">
    <div class="page-title">{{ pageTitle }}</div>
    <div class="user-info">
      <!-- Add user info or other header elements here -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopHeader',
  props: {
    pageTitle: {
      type: String,
      default: 'Dashboard'
    }
  },
  mounted() {
    console.log('TopHeader mounted with title:', this.pageTitle)
  }
}
</script>

<style scoped>
.top-header {
  background-color: white;
  padding: 15px 30px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}
</style>