<template>
  <footer class="app-footer" :class="{ 'mobile-view': isMobile }">
    <div class="footer-content">
      <!-- 移动端页面标题（仅移动端显示） 
      <div v-if="isMobile" class="mobile-page-title">
        Credit Cards Payoff Calc
      </div>
      -->
      <div class="footer-links">
        <a href="#/a/about-us">about us</a>
        <span class="link-separator">|</span>
        <a href="/">sitemap</a>
        <span class="link-separator">|</span>
        <a href="#/a/terms-of-use">terms of use</a>
        <span class="link-separator">|</span>
        <a href="#/a/privacy-policy">privacy policy</a>
      </div>
      <div class="footer-copyright">
        © 2025 - 2026 Taxo
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Foot',
  data() {
    return {
      isMobile: false
    }
  },
  mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile)
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 768
    }
  }
}
</script>

<style scoped>
/* ========== 桌面端样式（保持原样） ========== */
.app-footer {
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 1rem 0;
  text-align: center;
  font-size: 0.875rem;
  color: #6c757d;
  position: fixed; /* 固定在底部 */
  bottom: 0;
  left: 250px;  /* ✅ 从侧边栏右侧开始 */
  width: calc(100% - 250px);  /* ✅ 减去侧边栏宽度 */
  z-index: 1000;
  transition: left 0.3s ease, width 0.3s ease;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-links a {
  color: black;
  text-decoration: none;
  margin: 0 0.25rem;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  text-decoration: underline;
  color: #495057;
}

.footer-copyright {
  margin-top: 0.5rem;
}

/* 分隔符样式 */
.link-separator {
  color: #dee2e6;
  margin: 0 0.25rem;
}

/* ========== 移动端适配（768px及以下） ========== */
@media (max-width: 768px) {
  .app-footer {
    /* 重置为全屏宽度，固定在底部 */
    left: 0;
    width: 100%;
    padding: 1.25rem 0;
    background-color: #ffffff;
    border-top: 2px solid #e9ecef;
    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
  }
  
  /* 添加移动端页面标题 */
  .mobile-page-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 1.25rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #f1f3f5;
  }
  
  .footer-content {
    padding: 0 1rem;
  }
  
  /* 链接调整为垂直布局 */
  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  
  .footer-links a {
    display: block;
    padding: 0.875rem 1rem;
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    margin: 0;
    color: #495057;
    font-weight: 500;
    transition: all 0.2s ease;
  }
  
  .footer-links a:hover {
    background-color: #e9ecef;
    text-decoration: none;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* 移动端隐藏分隔符 */
  .footer-links .link-separator {
    display: none;
  }
  
  /* 版权信息样式调整 */
  .footer-copyright {
    margin-top: 0.75rem;
    padding: 0.75rem 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    color: #495057;
    font-weight: 500;
  }
}

/* ========== 小屏幕手机优化（480px及以下） ========== */
@media (max-width: 480px) {
  .app-footer {
    padding: 1rem 0;
  }
  
  .mobile-page-title {
    font-size: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 0.875rem;
  }
  
  .footer-content {
    padding: 0 0.875rem;
  }
  
  .footer-links a {
    padding: 0.75rem 0.875rem;
    font-size: 0.85rem;
  }
  
  .footer-copyright {
    padding: 0.625rem 0.875rem;
    font-size: 0.85rem;
  }
}

/* ========== 超小屏幕优化（360px及以下） ========== */
@media (max-width: 360px) {
  .app-footer {
    padding: 0.875rem 0;
  }
  
  .footer-content {
    padding: 0 0.75rem;
  }
  
  .footer-links a {
    padding: 0.625rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .footer-copyright {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
}

/* ========== 侧边栏兼容性（保持原功能） ========== */
/* 如果你的侧边栏是可折叠的，可以通过父组件传递类名来调整 */
.app-footer.sidebar-collapsed {
  left: 64px;  /* 折叠后的侧边栏宽度 */
  width: calc(100% - 64px);  /* 减去折叠后的侧边栏宽度 */
}

/* 确保移动端忽略侧边栏折叠样式 */
@media (max-width: 768px) {
  .app-footer.sidebar-collapsed {
    left: 0;
    width: 100%;
  }
}
</style>
