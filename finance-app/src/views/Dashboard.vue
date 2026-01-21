<template>
  <div class="dashboard-container">
    <!-- 侧边栏组件 -->
    <Sidebar 
      :isCollapsed="isCollapsed"
      @toggle-sidebar="toggleSidebar"
      @navigate="handleNavigation"
    />
    
    <!-- 右侧内容区域 -->
    <div class="main-content-area" :class="{ 'collapsed': isCollapsed }">
      <!-- 顶部标题栏 -->
      <TopHeader 
        :title="currentTitle"
        :subtitle="currentSubtitle"
      />
      
      <!-- 路由视图 -->
      <div class="content-wrapper">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import TopHeader from '@/components/TopHeader.vue'

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    TopHeader
  },
  setup() {
    const route = useRoute()
    const isCollapsed = ref(false)
    
    // 当前页面标题（从路由元数据获取）
    const currentTitle = computed(() => {
      return route.meta?.title || 'Dashboard'
    })
    
    const currentSubtitle = computed(() => {
      return route.meta?.subtitle || 'Financial Tools Dashboard'
    })
    
    // 切换侧边栏
    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value
    }
    
    // 处理导航
    const handleNavigation = (path) => {
      // 如果传入了路径，直接跳转
      if (path) {
        window.location.hash = path
        return
      }
      
      // 移动设备上导航后自动关闭侧边栏
      if (window.innerWidth <= 768) {
        isCollapsed.value = true
      }
    }
    
    return {
      isCollapsed,
      currentTitle,
      currentSubtitle,
      toggleSidebar,
      handleNavigation
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f5f7fa;
}

.main-content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: 280px; /* 侧边栏宽度 */
}

.main-content-area.collapsed {
  margin-left: 70px; /* 收缩后的侧边栏宽度 */
}

.content-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f9fafc;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content-area {
    margin-left: 0;
  }
  
  .main-content-area.collapsed {
    margin-left: 0;
  }
}
</style>