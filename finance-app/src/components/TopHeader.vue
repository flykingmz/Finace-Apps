<template>
  <div class="top-header">
  <!-- 返回dashboard的链接 -->
    <div class="dashboard-link">
      <a href="/dashboard" class="link-content">
        <span class="link-icon">←</span>
        <span class="link-text">Home</span>
      </a>
    </div>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dashboard-link {
  flex-shrink: 0;
  margin-right: 1.5rem;
}

.link-content {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #4f46e5;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
}

.link-content:hover {
  background-color: #f1f5f9;
  color: #3730a3;
  border-color: #c7d2fe;
  transform: translateY(-1px);
}

.link-icon {
  margin-right: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.link-text {
  white-space: nowrap;
}

.page-title {
  flex-grow: 1;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  text-align: left;
}

.user-info {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .top-header {
    padding: 0.75rem 1rem;
  }
  
  .link-text {
    display: none; /* 在移动设备上隐藏文字，只显示图标 */
  }
  
  .link-icon {
    margin-right: 0;
    font-size: 1.2rem;
  }
  
  .link-content {
    padding: 0.5rem;
  }
  
  .page-title {
    font-size: 1.3rem;
    margin-left: 0.5rem;
  }
}
</style>