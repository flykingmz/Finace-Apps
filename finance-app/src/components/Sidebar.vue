<template>
  <div :class="['sidebar', isCollapsed ? 'collapsed' : 'expanded']">
    <!-- Toggle Button -->
    <div class="toggle-btn" @click="toggleSidebar">
      {{ isCollapsed ? '➡️' : '⬅️' }}
    </div>
    
    <!-- Sidebar Header - 在折叠时只显示logo -->
    <div class="sidebar-header" v-if="!isCollapsed">
      <div class="logo">
        <img src="/logo1.webp" alt="Taxo Logo" class="logo-image" fetchpriority="high">
      </div>
      <!-- <div class="sidebar-title">Taxo Financial Free Calculators</div> -->
    </div>
    <!-- 折叠时显示小logo -->
    <div class="sidebar-header-collapsed" v-else>
      <div class="logo-collapsed">
        <img src="/logo1.webp" alt="Taxo Logo" class="logo-image-collapsed">
      </div>
    </div>
      
    <!-- Navigation - 未折叠时才显示 -->
    <div class="sidebar-nav" v-if="!isCollapsed">
      <template v-for="nav in navigation" :key="nav.id">
        <div 
          :class="['nav-item', nav.expanded ? 'expanded' : '', nav.active ? 'active' : '']"
          @click="toggleNav(nav)"
        >
          <div class="nav-title">
            <span class="nav-icon">{{ nav.icon }}</span>
            <span class="nav-text">{{ nav.title }}</span>
          </div>
          <span v-if="nav.children" class="nav-arrow">▼</span>
        </div>
        
        <!-- Sub Navigation -->
        <div 
          v-if="nav.children && nav.expanded"
          :key="'sub-' + nav.id"
          :class="['subnav', nav.expanded ? 'expanded' : '']"
        >
          <div 
            v-for="child in nav.children" 
            :key="child.id"
            :class="['subnav-item', activeSubNav === child.id ? 'active' : '']"
            @click="navigateTo(child)"
          >
            {{ child.title }}
          </div>
        </div>
      </template>
    </div>
    
    <!-- Sidebar Footer - 未折叠时才显示 -->
    <div class="sidebar-footer" v-if="!isCollapsed">
      <div class="footer-title">Spread the word</div>
      <div class="social-icons">
        <div class="social-icon" @click="shareOnTwitter">
          𝕏
        </div>
        <div class="social-icon" @click="shareOnFacebook">
          f
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const navigationData = [
  {
    id: 'finance',
    title: 'Tax and Salary',
    icon: '💰',
    expanded: true,
    active: true,
    children: [
      {
        id: 'global-price',
        title: 'Global VAT Calculator',
        route: '/a/global-price',
        component: 'GlobalPriceCalculator'
      },
      {
        id: 'income-tax',
        title: 'Income Tax Calculator',
        route: '/a/income-tax',
        component: 'IncomeTaxCalculator'
      },
      {
        id: 'paycheck',
        title: 'Paycheck Calculator',
        route: '/a/paycheck',
        component: 'PaycheckCalculator'
      },
      {
        id: 'takehomepaycheck',
        title: 'TakeHome Paycheck Calculator',
        route: '/a/takehomepaycheck',
        component: 'TakeHomePaycheckCalculator'
      }
    ]
  },
  {
    id: 'retirement',
    title: 'Retirement',
    icon: '👵',
    expanded: false,
    active: false,
    children: [
      {
        id: 'retirement-ca',
        title: 'Retirement Calculator',
        route: '/a/retirement',
        component: 'RetirementCalculator'
      },
      {
        id: '401K-ca',
        title: '401K Calculator',
        route: '/a/401k',
        component: '401KCalculator'
      },
      {
        id: 'pension-ca',
        title: 'Pension Calculator',
        route: '/a/pension',
        component: 'PensionCalculator'
      }
    ]
  },
  {
    id: 'mortgage',
    title: 'Mortgage and Real Estate',
    icon: '📊',
    expanded: false,
    active: false,
    children: [
      {
        id: 'mortgage-ca',
        title: 'Mortgage Calculator',
        route: '',
        component: ''
      },
      {
        id: 'amortization-ca',
        title: 'Amortization Calculator',
        route: '',
        component: ''
      }
    ]
  },
  {
    id: 'investment',
    title: 'Investment',
    icon: '💵',
    expanded: false,
    active: false,
    children: [
      {
        id: 'interest-ca',
        title: 'Interest Calculator',
        route: '',
        component: ''
      },
      {
        id: 'investment-ca',
        title: 'Investment Calculator',
        route: '',
        component: ''
      },
      {
        id: 'finance-ca',
        title: 'Finance Calculator',
        route: '',
        component: ''
      }
    ]
  },
  {
    id: 'auto',
    title: 'Auto',
    icon: '🧾',
    expanded: false,
    active: false,
    children: [
      {
        id: 'autoloan-ca',
        title: 'Auto Loan Calculator',
        route: '',
        component: ''
      },
      {
        id: 'cashback-ca',
        title: 'Cash Back or Low Interest Calculator',
        route: '',
        component: ''
      }
    ]
  },
  {
    id: 'other',
    title: 'Other',
    icon: '📈',
    expanded: false,
    active: false,
    children: [
      {
        id: 'loan-ca',
        title: 'Loan Calculator',
        route: '',
        component: ''
      },
      {
        id: 'currency-ca',
        title: 'Currency Calculator',
        route: '',
        component: ''
      }
    ]
  }
]

export default {
  name: 'Sidebar',
  data() {
    return {
      isCollapsed: false,
      isMobile: false,
      navigation: JSON.parse(JSON.stringify(navigationData)),
      activeSubNav: 'global-price'
    }
  },
  mounted() {
    console.log('Sidebar mounted')
    this.checkMobile()
    this.updateActiveNav()
    
    // 监听窗口大小变化
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    // 移除事件监听
    window.removeEventListener('resize', this.handleResize)
  },
  watch: {
    '$route.path': {
      handler(newPath) {
        console.log('Route changed to:', newPath)
        this.updateActiveNav()
      },
      immediate: true
    }
  },
  methods: {
    checkMobile() {
      // 检测是否为移动端（宽度小于768px）
      this.isMobile = window.innerWidth < 768
      // 如果是移动端，默认收起侧边栏
      if (this.isMobile) {
        this.isCollapsed = true
      }
    },
    handleResize() {
      const wasMobile = this.isMobile
      this.checkMobile()
      
      // 如果从桌面端切换到移动端，自动收起
      if (!wasMobile && this.isMobile) {
        this.isCollapsed = true
      }
      // 如果从移动端切换到桌面端，自动展开
      else if (wasMobile && !this.isMobile) {
        this.isCollapsed = false
      }
    },
    toggleSidebar() {
      // 切换侧边栏状态
      this.isCollapsed = !this.isCollapsed
      
      // 如果展开侧边栏，确保第一个导航项是展开状态
      if (!this.isCollapsed) {
        // 重置所有导航项状态
        this.navigation.forEach((nav, index) => {
          nav.expanded = index === 0 // 只展开第一个
          nav.active = index === 0
        })
      }
    },
    toggleNav(navItem) {
      console.log('Toggle nav:', navItem.id)
      
      // 如果侧边栏是收起的，先展开侧边栏
      if (this.isCollapsed) {
        this.isCollapsed = false
        // 等待侧边栏展开动画完成后再切换导航
        setTimeout(() => {
          this._toggleNavInternal(navItem)
        }, 300)
      } else {
        this._toggleNavInternal(navItem)
      }
    },
    _toggleNavInternal(navItem) {
      this.navigation.forEach(nav => {
        if (nav.id === navItem.id) {
          nav.expanded = !nav.expanded
          nav.active = true
        } else {
          nav.expanded = false
          nav.active = false
        }
      })
    },
    navigateTo(child) {
      console.log('Navigating to:', child.route, 'Current route:', this.$route.path)
      
      // 在移动端，点击子导航后自动收起侧边栏
      if (this.isMobile) {
        this.isCollapsed = true
      }
      
      // 强制导航，即使路由相同也要刷新
      if (this.$route.path === child.route) {
        console.log('Same route, forcing reload...')
        // 方法1: 使用 replace 强制更新
        this.$router.replace(child.route).then(() => {
          console.log('Route replaced')
          // 强制重新加载组件
          this.$forceUpdate()
          // 触发 window 事件通知 Dashboard 组件
          window.dispatchEvent(new CustomEvent('route-changed', { 
            detail: { route: child.route }
          }))
        }).catch(err => {
          console.log('Navigation error:', err)
        })
      } else {
        // 不同路由，正常导航
        this.$router.push(child.route).catch(err => {
          console.log('Navigation error:', err)
        })
      }
      
      this.activeSubNav = child.id
      this.updateNavigationState(child.route)
    },
    updateActiveNav() {
      const currentRoute = this.$route.path
      console.log('Updating active nav for route:', currentRoute)
      
      let found = false
      this.navigation.forEach(nav => {
        if (nav.children) {
          nav.children.forEach(child => {
            if (child.route === currentRoute) {
              this.activeSubNav = child.id
              nav.expanded = true
              nav.active = true
              found = true
            }
          })
        }
      })
      
      if (!found && (currentRoute === '/' || currentRoute === '/dashboard' || currentRoute === '/dashboard/')) {
        this.activeSubNav = 'global-price'
        this.navigation[0].expanded = true
        this.navigation[0].active = true
        this.navigation[1].expanded = false
        this.navigation[1].active = false
      }
    },
    updateNavigationState(route) {
      this.navigation.forEach(nav => {
        if (nav.children) {
          nav.children.forEach(child => {
            if (child.route === route) {
              this.activeSubNav = child.id
              nav.expanded = true
              nav.active = true
            } else {
              nav.active = false
            }
          })
        }
      })
    },
    shareOnTwitter() {
      const url = window.location.href
      const text = 'Check out these awesome Finance Apps!'
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
    },
    shareOnFacebook() {
      const url = window.location.href
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
    }
  }
}
</script>

<style scoped>
/* 添加一些响应式样式 */
.sidebar {
  transition: all 0.3s ease;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar.expanded {
  width: 250px;
}

.sidebar-header-collapsed {
  padding: 10px;
  text-align: center;
}

.logo-image-collapsed {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

/* 移动端优化 */
@media (max-width: 767px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;
    background: white;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  }
  
  .sidebar.collapsed {
    width: 60px;
  }
  
  .sidebar.expanded {
    width: 250px;
  }
  
  /* 在移动端展开时，添加遮罩层效果 */
  .sidebar.expanded::after {
    content: '';
    position: fixed;
    top: 0;
    left: 250px;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: -1;
  }
}

/* 平板设备 */
@media (min-width: 768px) and (max-width: 1024px) {
  .sidebar.collapsed {
    width: 70px;
  }
  
  .sidebar.expanded {
    width: 220px;
  }
}

/* 桌面端 */
@media (min-width: 1025px) {
  .sidebar.collapsed {
    width: 80px;
  }
  
  .sidebar.expanded {
    width: 250px;
  }
}
</style>
