<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-links">
        <a href="#/a/about-us">about us</a> | 
        <a href="/">sitemap</a> | 
        <a href="#/a/terms-of-use">terms of use</a> | 
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
  name: 'Foot'
}
</script>

<style scoped>
.app-footer {
  background-color: #f8f9fa; /* 可根据你的设计调整 */
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
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-links a {
  color: #0c0c0f05;
  text-decoration: none;
  margin: 0 0.25rem;
}

.footer-links a:hover {
  text-decoration: underline;
}

.footer-copyright {
  margin-top: 0.5rem;
}
</style>