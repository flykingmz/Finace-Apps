<template>
  <aside class="sidebar">
    <!-- 侧边栏内容 -->
    <div class="sidebar-content">
      <!-- 其他侧边栏内容 -->
      <div class="sidebar-widgets">
        <!-- 分类导航 -->
        <div class="widget">
          <h3 class="widget-title">Categories</h3>
          <ul class="widget-list">
            <li><a href="#">Tax Calculators</a></li>
            <li><a href="#">Investment Tools</a></li>
            <li><a href="#">Retirement Planning</a></li>
            <li><a href="#">Mortgage Resources</a></li>
          </ul>
        </div>

        <!-- 热门文章 -->
        <div class="widget">
          <h3 class="widget-title">Popular Posts</h3>
          <ul class="widget-list">
            <li><a href="#">How to Calculate Crypto Tax</a></li>
            <li><a href="#">Mortgage Payoff Strategies</a></li>
            <li><a href="#">Roth IRA vs Traditional IRA</a></li>
          </ul>
        </div>

        <!-- Google Ads 广告位 - 适应200px宽侧边栏 -->
        <div class="widget ad-widget">
          <h3 class="widget-title">Sponsored</h3>
          <div class="google-ad-container">
            <!-- Google AdSense 广告代码 -->
            <ins class="adsbygoogle"
                 :style="adStyle"
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                 data-ad-slot="XXXXXXXXXX"
                 data-ad-format="auto"
                 data-full-width-responsive="false"></ins>
            <script>
              (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
          </div>
        </div>

        <!-- 第二个广告位（可选） -->
        <div class="widget ad-widget">
          <h3 class="widget-title">Advertisement</h3>
          <div class="google-ad-container">
            <ins class="adsbygoogle"
                 :style="adStyleSmall"
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                 data-ad-slot="YYYYYYYYYY"
                 data-ad-format="rectangle"
                 data-full-width-responsive="false"></ins>
            <script>
              (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
          </div>
        </div>

        <!-- 固定广告位（粘性定位） -->
        <div class="widget ad-widget sticky-ad">
          <h3 class="widget-title">Sponsor</h3>
          <div class="google-ad-container">
            <ins class="adsbygoogle"
                 :style="adStyleSticky"
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                 data-ad-slot="ZZZZZZZZZZ"
                 data-ad-format="rectangle"
                 data-full-width-responsive="false"></ins>
            <script>
              (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      // 广告样式 - 适配200px宽侧边栏
      adStyle: {
        display: 'block',
        width: '100%',
        minWidth: '160px',
        maxWidth: '200px',
        height: 'auto',
        margin: '0 auto'
      },
      adStyleSmall: {
        display: 'block',
        width: '100%',
        minWidth: '160px',
        maxWidth: '200px',
        height: '250px',
        margin: '0 auto'
      },
      adStyleSticky: {
        display: 'block',
        width: '100%',
        minWidth: '160px',
        maxWidth: '200px',
        height: 'auto',
        margin: '0 auto'
      }
    };
  },
  mounted() {
    // 加载 Google AdSense 脚本
    this.loadAdSense();
  },
  methods: {
    loadAdSense() {
      // 如果已经加载过，则不重复加载
      if (document.querySelector('script[src*="adsbygoogle.js"]')) {
        return;
      }
      
      // 动态加载 AdSense 脚本
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  background: #f8fafd;
  border-radius: 20px;
  padding: 20px 12px;
  position: sticky;
  top: 20px;
  height: fit-content;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.sidebar-content {
  width: 100%;
}

.sidebar-widgets {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.widget {
  background: white;
  border-radius: 16px;
  padding: 16px 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.widget-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1f3a5f;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #e2e8f0;
}

.widget-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.widget-list li {
  margin-bottom: 10px;
}

.widget-list li:last-child {
  margin-bottom: 0;
}

.widget-list a {
  color: #2c5282;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
  display: block;
  padding: 4px 0;
}

.widget-list a:hover {
  color: #1a365d;
  text-decoration: underline;
}

/* 广告小部件特殊样式 */
.ad-widget {
  padding: 12px;
  background: #f9fcff;
}

.ad-widget .widget-title {
  font-size: 0.85rem;
  color: #6b7f96;
  border-bottom-color: #e2e8f0;
  margin-bottom: 12px;
}

.google-ad-container {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f1f5f9;
  border-radius: 8px;
  overflow: hidden;
  min-height: 250px;
}

/* 粘性广告位 - 滚动时跟随 */
.sticky-ad {
  position: sticky;
  top: 20px;
}

/* 移动端适配 - 当侧边栏在移动端时调整为全宽 */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    position: static;
    margin-bottom: 24px;
    padding: 16px;
  }
  
  .google-ad-container {
    min-height: auto;
  }
  
  /* 移动端广告样式调整 */
  .google-ad-container ins {
    max-width: 100% !important;
  }
}
</style>