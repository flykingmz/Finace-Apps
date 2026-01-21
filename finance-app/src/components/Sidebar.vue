<template>
  <aside :class="['sidebar', isCollapsed ? 'collapsed' : 'expanded']">
    <!-- Logo区域 -->
    <div class="logo-section">
      <div class="logo">$</div>
      <div v-if="!isCollapsed" class="logo-text">FinancePro</div>
    </div>
    
    <!-- 切换按钮 -->
    <div class="toggle-btn" @click="$emit('toggle-sidebar')">
      <i :class="isCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'"></i>
    </div>
    
    <!-- 标题 -->
    <div v-if="!isCollapsed" class="section-title">Finance Apps</div>
    
    <!-- 导航菜单 -->
    <nav class="nav-menu">
      <!-- Finance菜单 -->
      <div class="menu-item" :class="{ expanded: expandedMenu === 'finance' }">
        <div class="menu-header" @click="toggleMenu('finance')">
          <div class="menu-icon">
            <i class="fas fa-chart-line"></i>
          </div>
          <div v-if="!isCollapsed" class="menu-label">Finance</div>
          <div v-if="!isCollapsed" class="menu-arrow">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
        
        <div class="submenu">
          <a 
            href="#/global-price-calculator" 
            class="submenu-item"
            @click="navigateTo('/global-price-calculator')"
          >
            <span v-if="!isCollapsed">Global Price Calculator</span>
          </a>
        </div>
      </div>
      
      <!-- Payroll菜单 -->
      <div class="menu-item" :class="{ expanded: expandedMenu === 'payroll' }">
        <div class="menu-header" @click="toggleMenu('payroll')">
          <div class="menu-icon">
            <i class="fas fa-money-check-alt"></i>
          </div>
          <div v-if="!isCollapsed" class="menu-label">Payroll</div>
          <div v-if="!isCollapsed" class="menu-arrow">
            <i class="fas fa-chevron-right"></i>
          </div>
        </div>
        
        <div class="submenu">
          <a 
            href="#/paycheck-calculator" 
            class="submenu-item"
            @click="navigateTo('/paycheck-calculator')"
          >
            <span v-if="!isCollapsed">Paycheck Calculator</span>
          </a>
          <a 
            href="#/income-tax-calculator" 
            class="submenu-item"
            @click="navigateTo('/income-tax-calculator')"
          >
            <span v-if="!isCollapsed">Income Tax Calculator</span>
          </a>
        </div>
      </div>
    </nav>
    
    <!-- 社交分享区域 -->
    <div class="social-section">
      <div v-if="!isCollapsed" class="social-title">Spread the word</div>
      <div class="social-icons">
        <div class="social-icon twitter" title="Share on Twitter">
          <i class="fab fa-twitter"></i>
        </div>
        <div class="social-icon facebook" title="Share on Facebook">
          <i class="fab fa-facebook-f"></i>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Sidebar',
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-sidebar', 'navigate'],
  setup(props, { emit }) {
    const route = useRoute()
    const expandedMenu = ref(null)
    
    // 根据当前路由设置展开的菜单
    const setActiveMenu = () => {
      const path = route.path
      if (path.includes('global-price')) {
        expandedMenu.value = 'finance'
      } else if (path.includes('paycheck') || path.includes('income-tax')) {
        expandedMenu.value = 'payroll'
      }
    }
    
    // 切换菜单展开状态
    const toggleMenu = (menu) => {
      if (props.isCollapsed) return
      expandedMenu.value = expandedMenu.value === menu ? null : menu
    }
    
    // 导航处理
    const navigateTo = (path) => {
      emit('navigate', path)
      
      // 移动设备上自动关闭侧边栏
      if (window.innerWidth <= 768 && !props.isCollapsed) {
        emit('toggle-sidebar')
      }
    }
    
    // 监听路由变化
    watch(() => route.path, () => {
      setActiveMenu()
    })
    
    // 初始化
    onMounted(() => {
      setActiveMenu()
    })
    
    return {
      expandedMenu,
      toggleMenu,
      navigateTo
    }
  }
}
</script>

<style scoped>
/* 侧边栏样式 */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #1a1d29;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  box-shadow: 3px 0 15px rgba(0, 0, 0, 0.1);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar.expanded {
  width: 280px;
}

.sidebar.collapsed {
  width: 70px;
}

/* Logo区域 */
.logo-section {
  padding: 24px 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.logo {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  color: white;
  flex-shrink: 0;
}

.logo-text {
  margin-left: 15px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

/* 切换按钮 */
.toggle-btn {
  position: absolute;
  top: 28px;
  right: -12px;
  width: 24px;
  height: 24px;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  transition: transform 0.3s ease;
}

.toggle-btn:hover {
  transform: scale(1.1);
}

.toggle-btn i {
  color: #1a1d29;
  font-size: 12px;
}

/* 标题 */
.section-title {
  padding: 24px 20px 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
}

/* 导航菜单 */
.nav-menu {
  flex: 1;
  overflow-y: auto;
  padding: 0 15px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.nav-menu::-webkit-scrollbar {
  width: 4px;
}

.nav-menu::-webkit-scrollbar-track {
  background: transparent;
}

.nav-menu::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

/* 菜单项 */
.menu-item {
  margin-bottom: 8px;
  border-radius: 10px;
  overflow: hidden;
}

.menu-header {
  padding: 14px 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.2s ease;
}

.menu-header:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.menu-header.active {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 16px;
}

.menu-label {
  margin-left: 15px;
  font-size: 15px;
  font-weight: 500;
  white-space: nowrap;
  flex: 1;
}

.menu-arrow {
  transition: transform 0.3s ease;
  font-size: 12px;
  opacity: 0.7;
}

.menu-item.expanded .menu-arrow {
  transform: rotate(90deg);
}

/* 子菜单 */
.submenu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 0 0 10px 10px;
}

.menu-item.expanded .submenu {
  max-height: 300px;
}

.submenu-item {
  padding: 12px 20px 12px 51px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s ease;
  position: relative;
  white-space: nowrap;
  text-decoration: none;
  color: white;
}

.sidebar.collapsed .submenu-item {
  padding-left: 20px;
}

.submenu-item:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

.submenu-item.active {
  background-color: rgba(102, 126, 234, 0.15);
  color: #667eea;
}

.submenu-item.active::before {
  content: '';
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  background-color: #667eea;
  border-radius: 50%;
}

.sidebar.collapsed .submenu-item span {
  opacity: 0;
}

/* 社交分享区域 */
.social-section {
  padding: 24px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.social-title {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 16px;
  white-space: nowrap;
}

.social-icons {
  display: flex;
  gap: 12px;
}

.social-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.07);
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
}

.social-icon:hover {
  background-color: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

.social-icon.twitter:hover {
  background-color: #1da1f2;
}

.social-icon.facebook:hover {
  background-color: #1877f2;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar.expanded {
    width: 280px;
  }
  
  .sidebar.collapsed {
    width: 0;
  }
  
  .toggle-btn {
    right: -15px;
    background-color: #1a1d29;
  }
  
  .toggle-btn i {
    color: white;
  }
}
</style>