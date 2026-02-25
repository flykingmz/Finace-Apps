<template>
  <footer class="app-footer" :class="{ 'mobile-view': isMobile }">
    <div class="footer-content">
      <!-- 移动端页面标题（仅移动端显示） 
      <div v-if="isMobile" class="mobile-page-title">
        Credit Cards Payoff Calc
      </div>
      -->
      <div class="footer-links">
        <a href="#/a/about-us" class="footer-link">
          <span class="link-text">about us</span>
        </a>
        <span class="link-separator">|</span>
        <a href="#/a/all-calculators" class="footer-link">
          <span class="link-text">sitemap</span>
        </a>
        <span class="link-separator">|</span>
        <a href="#/a/terms-of-use" class="footer-link">
          <span class="link-text">terms of use</span>
        </a>
        <span class="link-separator">|</span>
        <a href="#/a/privacy-policy" class="footer-link">
          <span class="link-text">privacy policy</span>
        </a>
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

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
}

.footer-link {
  color: black;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  transition: color 0.2s ease;
  white-space: nowrap;
}

.footer-link:hover {
  text-decoration: underline;
  color: #495057;
}

.link-separator {
  color: #dee2e6;
  margin: 0 0.125rem;
}

.footer-copyright {
  margin-top: 0.5rem;
}

/* ========== 移动端横向排版（768px及以下） ========== */
@media (max-width: 768px) {
  .app-footer {
    /* 重置为全屏宽度，固定在底部 */
    left: 0;
    width: 100%;
    padding: 0.75rem 0;
    background-color: #ffffff;
    border-top: 2px solid #e9ecef;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
    z-index: 1100; /* 提高层级 */
  }
  
  /* 移动端页面标题（顶部显示） */
  .mobile-page-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #f1f3f5;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .footer-content {
    padding: 0 0.75rem;
    display: flex;
    flex-direction: column;
  }
  
  /* 横向链接布局 */
  .footer-links {
    display: flex;
    flex-wrap: nowrap; /* 确保横向排列 */
    justify-content: space-around; /* 均匀分布 */
    align-items: center;
    gap: 0.125rem;
    margin-bottom: 0.5rem;
    width: 100%;
    overflow-x: auto; /* 允许横向滚动 */
    padding: 0.25rem 0;
    -webkit-overflow-scrolling: touch; /* iOS 平滑滚动 */
  }
  
  /* 隐藏滚动条但保留功能 */
  .footer-links::-webkit-scrollbar {
    display: none;
  }
  
  .footer-links {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .footer-link {
    flex: 0 0 auto; /* 不伸缩，保持原大小 */
    color: #495057;
    text-decoration: none;
    font-size: 0.8rem;
    padding: 0.375rem 0.5rem;
    border-radius: 4px;
    transition: all 0.2s ease;
    white-space: nowrap;
    min-width: fit-content; /* 自适应内容宽度 */
  }
  
  .footer-link:hover,
  .footer-link:active {
    background-color: #f1f3f5;
    text-decoration: none;
    color: #212529;
  }
  
  /* 移动端调整分隔符大小 */
  .link-separator {
    color: #ced4da;
    font-size: 0.8rem;
    margin: 0 0.125rem;
    flex: 0 0 auto; /* 分隔符不伸缩 */
  }
  
  /* 版权信息样式调整 */
  .footer-copyright {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background-color: #f8f9fa;
    border-radius: 6px;
    color: #495057;
    font-size: 0.8rem;
    font-weight: 500;
    text-align: center;
    width: 100%;
    border: 1px solid #e9ecef;
  }
}

/* ========== 小屏幕手机优化（480px及以下） ========== */
@media (max-width: 480px) {
  .app-footer {
    padding: 0.625rem 0;
  }
  
  .mobile-page-title {
    font-size: 0.9rem;
    margin-bottom: 0.625rem;
    padding-bottom: 0.625rem;
  }
  
  .footer-content {
    padding: 0 0.625rem;
  }
  
  .footer-link {
    font-size: 0.75rem;
    padding: 0.3125rem 0.375rem;
  }
  
  .link-separator {
    font-size: 0.75rem;
  }
  
  .footer-copyright {
    font-size: 0.75rem;
    padding: 0.4375rem;
  }
  
  .footer-links {
    gap: 0.0625rem;
  }
}

/* ========== 超小屏幕优化（360px及以下） ========== */
@media (max-width: 360px) {
  .app-footer {
    padding: 0.5rem 0;
  }
  
  .mobile-page-title {
    font-size: 0.85rem;
  }
  
  .footer-content {
    padding: 0 0.5rem;
  }
  
  .footer-link {
    font-size: 0.7rem;
    padding: 0.25rem 0.3125rem;
  }
  
  .link-separator {
    font-size: 0.7rem;
    margin: 0 0.0625rem;
  }
  
  .footer-copyright {
    font-size: 0.7rem;
    padding: 0.375rem;
  }
}

/* ========== 平板优化（769px - 1024px） ========== */
@media (min-width: 769px) and (max-width: 1024px) {
  .app-footer {
    padding: 0.875rem 0;
  }
  
  .footer-content {
    padding: 0 1.5rem;
  }
}

/* ========== 侧边栏兼容性（保持原功能） ========== */
/* 侧边栏折叠时 */
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
  
  /* 为移动端固定页脚预留内容区域空间 */
  body {
    padding-bottom: 100px;
  }
}
</style>
