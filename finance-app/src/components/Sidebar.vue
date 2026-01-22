<template>
  <div :class="['sidebar', isCollapsed ? 'collapsed' : 'expanded']">
    <!-- Toggle Button -->
    <div class="toggle-btn" @click="toggleSidebar">
      {{ isCollapsed ? '→' : '←' }}
    </div>
    
    <!-- Sidebar Header -->
    <div class="sidebar-header">
      <div class="logo-container">
        <div class="logo">F</div>
      </div>
      <div class="sidebar-title">Finance Free Apps</div>
    </div>
    
    <!-- Navigation -->
    <div class="sidebar-nav">
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
    
    <!-- Sidebar Footer -->
    <div class="sidebar-footer">
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
    title: 'Finance',
    icon: '💰',
    expanded: true,
    active: true,
    children: [
      {
        id: 'global-price',
        title: 'Global Price Calculator',
        route: '/dashboard/global-price',
        component: 'GlobalPriceCalculator'
      }
    ]
  },
  {
    id: 'payroll',
    title: 'Payroll',
    icon: '📊',
    expanded: false,
    active: false,
    children: [
      {
        id: 'paycheck',
        title: 'Paycheck Calculator',
        route: '/dashboard/paycheck',
        component: 'PaycheckCalculator'
      },
      {
        id: 'income-tax',
        title: 'Income Tax Calculator',
        route: '/dashboard/income-tax',
        component: 'IncomeTaxCalculator'
      }
    ]
  }
]

export default {
  name: 'Sidebar',
  data() {
    return {
      isCollapsed: false,
      navigation: JSON.parse(JSON.stringify(navigationData)),
      activeSubNav: 'global-price'
    }
  },
  mounted() {
    console.log('Sidebar mounted')
    this.updateActiveNav()
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
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
    },
    toggleNav(navItem) {
      console.log('Toggle nav:', navItem.id)
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