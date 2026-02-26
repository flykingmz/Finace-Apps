<template>
  <div class="top-header">
    <!-- 返回dashboard的链接 - 优化移动端可见性 -->
    <div class="dashboard-link">
      <a href="/dashboard" class="link-content">
        <span class="link-icon">←</span>
        <span class="link-text">Home</span>
      </a>
    </div>
    
    <div class="page-title">{{ pageTitle }}</div>
    
    <div class="user-info">
      <!-- 可选的用户信息区域，保持占位 -->
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
  min-height: 64px; /* 确保最小高度 */
  width: 100%;
  box-sizing: border-box;
}

.dashboard-link {
  flex-shrink: 0;
  min-width: 44px; /* 确保移动端最小点击区域 */
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
}

.link-content {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #4f46e5;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  white-space: nowrap;
  min-height: 40px; /* 确保点击区域足够大 */
  min-width: 40px; /* 确保点击区域足够大 */
  box-sizing: border-box;
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
  line-height: 1;
}

.link-text {
  white-space: nowrap;
  display: inline-block; /* 确保文字正确显示 */
}

.page-title {
  flex-grow: 1;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  text-align: left;
  margin: 0 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0; /* 允许flex子项收缩 */
}

.user-info {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  min-width: 44px; /* 保持平衡，如果为空至少占位 */
}

/* 移动端优化 - 确保Home始终可见且可点击 */
@media (max-width: 768px) {
  .top-header {
    padding: 0.5rem 0.75rem;
    min-height: 56px; /* 移动端稍小的高度 */
  }
  
  .dashboard-link {
    margin-right: 0.25rem;
  }
  
  .link-content {
    padding: 0.4rem 0.6rem;
    background-color: #f1f5f9; /* 稍微加深背景，更显眼 */
    border-color: #cbd5e1;
  }
  
  /* 确保Home文字在空间足够时显示，空间不够时隐藏 */
  .link-text {
    display: inline-block; /* 默认显示 */
  }
  
  .page-title {
    font-size: 1.1rem; /* 移动端减小标题字号 */
    margin: 0 0.25rem;
  }
  
  /* 当屏幕非常小（< 360px）时，隐藏文字只留图标 */
  @media (max-width: 360px) {
    .link-text {
      display: none; /* 超小屏幕隐藏文字，只保留图标 */
    }
    
    .link-icon {
      margin-right: 0;
    }
    
    .link-content {
      padding: 0.4rem;
    }
    
    .page-title {
      font-size: 1rem;
    }
  }
}

/* 确保触摸区域足够大 */
@media (hover: none) and (pointer: coarse) {
  .link-content {
    min-height: 44px;
    min-width: 44px;
    padding: 0.6rem; /* 增大触摸区域 */
  }
  
  .dashboard-link {
    min-width: 44px;
  }
}
</style>