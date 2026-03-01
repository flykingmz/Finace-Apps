<template>
  <div class="top-header">
    
    <!-- Logo区域 - 新增 -->
    <div class="logo-section">
      <img src="/logo1.webp" alt="Taxo Logo" class="logo-image">
    </div>
    
    <div class="page-title">
      <a href="/" style="text-decoration: none; color: inherit;">financial-calculator.net</a>
    </div>
    
    <!-- 分类导航按钮 - 只在桌面端显示 -->
    <div class="nav-buttons desktop-only">
      <a 
        href="/tax-salary-calculators" 
        class="nav-btn" 
        :class="{ active: activeNav === 'tax' }"
        @click="setActive('tax')"
      >Tax</a>
      <a 
        href="/retirement-calculators" 
        class="nav-btn" 
        :class="{ active: activeNav === 'retirement' }"
        @click="setActive('retirement')"
      >Retirement</a>
      <a 
        href="/mortgage-RE-calculators" 
        class="nav-btn" 
        :class="{ active: activeNav === 'mortgage' }"
        @click="setActive('mortgage')"
      >Mortgage</a>
      <a 
        href="/investment-calculators" 
        class="nav-btn" 
        :class="{ active: activeNav === 'investment' }"
        @click="setActive('investment')"
      >Investment</a>
      <a 
        href="/other-calculators" 
        class="nav-btn" 
        :class="{ active: activeNav === 'other' }"
        @click="setActive('other')"
      >Other</a>
      <a 
        href="/blog" 
        class="nav-btn" 
        :class="{ active: activeNav === 'blog' }"
        @click="setActive('other')"
      >Blog</a>
    </div>
    
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
  data() {
    return {
      activeNav: '' // 当前选中的导航按钮
    }
  },
  mounted() {
    console.log('TopHeader mounted with title:', this.pageTitle);
    // 根据当前路径设置激活状态
    this.setActiveFromPath();
  },
  watch: {
    '$route.path'() {
      this.setActiveFromPath();
    }
  },
  methods: {
    setActive(nav) {
      this.activeNav = nav;
    },
    setActiveFromPath() {
      const path = window.location.hash || this.$route?.path || '';
      if (path.includes('tax-salary')) this.activeNav = 'tax';
      else if (path.includes('retirement')) this.activeNav = 'retirement';
      else if (path.includes('mortgage')) this.activeNav = 'mortgage';
      else if (path.includes('investment')) this.activeNav = 'investment';
      else if (path.includes('other')) this.activeNav = 'other';
      else if (path.includes('blog')) this.activeNav = 'blog';
      else this.activeNav = '';
    }
  }
}
</script>

<style scoped>
.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background-color: #070807;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: 64px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
}

.dashboard-link {
  flex-shrink: 0;
  min-width: 44px;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  z-index: 2;
}

.link-content {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #46e56b;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  white-space: nowrap;
  min-height: 40px;
  min-width: 40px;
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
  display: inline-block;
}

/* 艺术字体效果 - financial-calculator.net */
.page-title {
  flex-grow: 1;
  font-family: 'Pacifico', 'Dancing Script', 'Courgette', 'Kaushan Script', cursive;
  font-size: 2.8rem;
  font-weight: 900;
  color: #333;
  background: white;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 1px;
  text-align: center;
  margin: 0 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  transition: all 0.3s ease;
}

/* 分类导航按钮样式 - 只在桌面端显示 */
.nav-buttons {
  display: flex;
  gap: 0.5rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.nav-btn {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #ffffff;
  text-decoration: none;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;
  white-space: nowrap;
  cursor: pointer;
}

.nav-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.nav-btn.active {
  background-color: #4f46e5;
  border-color: #4f46e5;
  color: white;
}

/* 确保移动端字体大小和样式与PC端完全一致 */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.8rem;
    font-family: 'Pacifico', 'Dancing Script', 'Courgette', 'Kaushan Script', cursive;
    font-weight: 900;
    letter-spacing: 1px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* 移动端隐藏分类按钮 */
  .desktop-only {
    display: none;
  }
}

/* 超小屏幕优化 */
@media (max-width: 480px) {
  .page-title {
    font-size: 2.8rem;
  }
}

.user-info {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  min-width: 44px;
  z-index: 2;
}

/* 桌面端调整 */
@media (min-width: 769px) {
  .page-title {
    text-align: left;
  }
}

/* 移动端优化 - 隐藏分类按钮后的布局调整 */
@media (max-width: 768px) {
  .top-header {
    padding: 0.5rem 1rem;
    min-height: 56px;
    justify-content: center;
    position: relative;
  }
  
  /* 左侧Logo绝对定位到左边 */
  .logo-section {
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
  }
  
  /* 右侧占位符保留，保持平衡 */
  .user-info {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    display: flex;
  }
  
  /* 标题居中，并留出两边空间 */
  .page-title {
    flex-grow: 0;
    max-width: calc(100% - 120px);
    margin: 0;
    font-size: 1.2rem;
    text-align: center;
    padding: 0 10px;
  }
  
  /* 超小屏幕优化 */
  @media (max-width: 480px) {
    .page-title {
      font-size: 1rem;
      max-width: calc(100% - 100px);
    }
    
    .logo-section {
      left: 0.25rem;
    }
    
    .user-info {
      right: 0.25rem;
    }
  }
}

/* 非常小的设备优化 */
@media (max-width: 320px) {
  .page-title {
    font-size: 0.9rem;
    max-width: calc(100% - 90px);
  }
}

.logo-image {
  height: 100px;
  object-fit: contain;
  border-radius: 10px;
}
</style>
