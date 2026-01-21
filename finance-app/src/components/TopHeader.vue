<template>
  <div class="top-header">
    <div class="page-title">{{ pageTitle }}</div>
    <!-- You can add user profile or other header elements here -->
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
  }
}
</script>