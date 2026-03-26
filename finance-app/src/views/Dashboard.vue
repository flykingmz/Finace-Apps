<template>
  <div class="layout-container">
    <!--  <SidebarAds />  -->
    <div class="main-content">
      <TopHeader :page-title="currentPageTitle" />
      
      <!-- PC端：内容区域 + 右侧广告区 -->
      <div class="content-with-sidebar">
        <!-- 左侧内容区域 - 向左移动 -->
        <div class="content-area">
          <router-view v-slot="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
          </router-view>
        </div>
        
        <!-- PC端右侧 Google Ads 区域 -->
        <div class="sidebar-ads">
          <div class="google-ad-container">
            <!-- Google AdSense 广告代码 -->
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                 data-ad-slot="XXXXXXXXXX"
                 data-ad-format="rectangle"
                 data-full-width-responsive="false"></ins>
            <script>
              (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
          </div>
        </div>
      </div>
      
      <!-- 移动端：Google Ads 区域放在 Footer 上方 -->
      <div class="mobile-ads">
        <div class="google-ad-container">
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format="rectangle"
               data-full-width-responsive="false"></ins>
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        </div>
      </div>
    </div>
    <Foot />
  </div>
</template>

<script>
import TopHeader from '../components/TopHeader.vue'
import Foot from '../components/Foot.vue'

export default {
  name: 'Dashboard',
  components: {
    TopHeader,
    Foot
  },
  computed: {
    currentPageTitle() {
      return ''
    }
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
}
</script>

<style scoped>
.layout-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.main-content {
  width: 100%;
}

/* PC端：内容区 + 右侧广告区布局 */
.content-with-sidebar {
  display: flex;
  gap: 30px;
  margin-top: 20px;
}

/* 左侧内容区域 - 向左移动（通过 flex 布局自然实现） */
.content-area {
  flex: 1;
  min-width: 0; /* 防止溢出 */
  /* 内容区宽度自适应，相对于右侧广告区占据更多空间 */
}

/* PC端右侧 Google Ads 区域 */
.sidebar-ads {
  width: 300px;
  flex-shrink: 0;
  position: sticky;
  top: 20px;
  align-self: flex-start;
}

.google-ad-container {
  background: #f8fafd;
  border-radius: 12px;
  border: 1px solid #e9eef3;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 250px;
}

.google-ad-container ins {
  width: 100%;
  height: 100%;
}

/* 移动端广告区域 - 默认隐藏 */
.mobile-ads {
  display: none;
  margin: 20px 0;
  background: #f8fafd;
  border-radius: 12px;
  border: 1px solid #e9eef3;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.mobile-ads .google-ad-container {
  width: 100%;
  max-width: 320px;
  height: 50px;
  margin: 0 auto;
  background: transparent;
  border: none;
  box-shadow: none;
}

/* 移动端响应式布局 */
@media (max-width: 768px) {
  .layout-container {
    padding: 0 16px;
  }
  
  /* PC端侧边栏布局改为垂直布局 */
  .content-with-sidebar {
    flex-direction: column;
    gap: 20px;
  }
  
  /* 隐藏 PC 端右侧广告区 */
  .sidebar-ads {
    display: none;
  }
  
  /* 显示移动端广告区域 */
  .mobile-ads {
    display: block;
  }
  
  .mobile-ads .google-ad-container {
    height: 50px;
  }
  
  .content-area {
    width: 100%;
  }
}

/* 大屏优化：当屏幕很宽时，内容区域可适当居中 */
@media (min-width: 1400px) {
  .layout-container {
    padding: 0 40px;
  }
  
  .content-with-sidebar {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
}

/* 广告容器内广告样式优化 */
.google-ad-container ins {
  display: block;
  width: 100%;
  height: 100%;
}

/* 确保广告内容正确显示 */
.google-ad-container img,
.google-ad-container iframe {
  max-width: 100%;
  height: auto;
}
</style>