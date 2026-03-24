<template>
  <div class="main-layout">
    <!-- 左侧边栏 - 移动端自动隐藏 -->
    <Sidebar :hideOnMobile="true" />
    
    <!-- 或者不传递参数，默认为 true -->
    <Sidebar />
    
    <!-- 如果需要移动端也显示侧边栏 -->
    <Sidebar :hideOnMobile="false" />
    
    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 页面主要内容 -->
    </main>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';

export default {
  components: {
    Sidebar
  }
};
</script>

<style scoped>
.main-layout {
  display: flex;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.main-content {
  flex: 1;
  min-width: 0;
}

@media (max-width: 768px) {
  .main-layout {
    flex-direction: column;
    padding: 16px;
  }
}
</style>