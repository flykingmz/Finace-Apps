<template>
  <header class="top-header">
    <div class="header-left">
      <h1 class="page-title">{{ title }}</h1>
      <div class="page-subtitle">{{ subtitle }}</div>
    </div>
    
    <div class="user-profile">
      <div class="user-avatar">JD</div>
      <div class="user-info">
        <div class="user-name">John Doe</div>
        <div class="user-role">Administrator</div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TopHeader',
  props: {
    title: {
      type: String,
      default: 'Dashboard'
    },
    subtitle: {
      type: String,
      default: 'Financial Tools Dashboard'
    }
  }
}
</script>

<style scoped>
.top-header {
  padding: 20px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eef2f7;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.header-left {
  flex: 1;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1d29;
  margin: 0;
}

.page-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin-top: 4px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  border-radius: 12px;
  background-color: #f9fafc;
  border: 1px solid #eef2f7;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  font-size: 14px;
  color: #1a1d29;
}

.user-role {
  font-size: 12px;
  color: #6b7280;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .top-header {
    padding: 15px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .user-profile {
    align-self: stretch;
    justify-content: flex-start;
  }
}
</style>