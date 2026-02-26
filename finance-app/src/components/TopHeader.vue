<template>
  <div class="top-header">
    
    <!-- Logo区域 - 新增 -->
    <div class="logo-section">
      <img src="/logo1.webp" alt="Taxo Logo" class="logo-image">
    </div>
   <div class="page-title">
    <a href="/dashboard" style="text-decoration: none; color: inherit;">financial-calculator.net</a>
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
  background-color: #070807;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: 64px;
  width: 100%;
  box-sizing: border-box;
  position: relative; /* 为绝对定位做准备 */
}

.dashboard-link {
  flex-shrink: 0;
  min-width: 44px;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  z-index: 2; /* 确保可点击区域在最上层 */
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
    text-align: left; /* 桌面端左对齐 */
  }
}

/* 移动端优化 - Home按钮居中展示 */
@media (max-width: 768px) {
  .top-header {
    padding: 0.5rem 1rem;
    min-height: 56px;
    justify-content: center; /* 移动端改为居中布局 */
    position: relative;
  }
  
  /* 左侧Home按钮绝对定位到左边 */
  .dashboard-link {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 0;
  }
  
  /* 右侧占位符绝对定位到右边，保持平衡 */
  .user-info {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
  }
  
  /* 标题居中，并留出两边空间 */
  .page-title {
    flex-grow: 0;
    max-width: calc(100% - 120px); /* 减去两边按钮的宽度 */
    margin: 0;
    font-size: 1.2rem;
    text-align: center;
    padding: 0 10px;
  }
  
  /* 确保Home按钮在移动端更明显 */
  .link-content {
    background-color: #f1f5f9;
    border-color: #cbd5e1;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    padding: 0.5rem 0.6rem;
  }
  
  /* 超小屏幕优化 */
  @media (max-width: 480px) {
    .page-title {
      font-size: 1rem;
      max-width: calc(100% - 100px);
    }
    
    .dashboard-link {
      left: 0.5rem;
    }
    
    .user-info {
      right: 0.5rem;
    }
    
    /* 超小屏幕隐藏Home文字，只留图标 */
    .link-text {
      display: none;
    }
    
    .link-icon {
      margin-right: 0;
      font-size: 1.3rem;
    }
    
    .link-content {
      padding: 0.4rem;
      min-width: 40px;
    }
  }
}

/* 触摸设备优化 */
@media (hover: none) and (pointer: coarse) {
  .link-content {
    min-height: 44px;
    min-width: 44px;
  }
  
  .dashboard-link {
    min-width: 44px;
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