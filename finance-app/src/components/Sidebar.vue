<template>
  <div :class="['sidebar', isMobile ? 'mobile-hidden' : (isCollapsed ? 'collapsed' : 'expanded')]">
    <!-- Toggle Button - 只在桌面端显示 -->
    <div class="toggle-btn" @click="toggleSidebar" v-if="!isMobile">
      {{ isCollapsed ? '➡️' : '⬅️' }}
    </div>
    
    <!-- 移动端菜单按钮 - 只在移动端显示 -->
    <div class="mobile-menu-btn" v-if="isMobile" @click="openMobileMenu">
      ☰
    </div>
    
    <!-- Sidebar Header - 在折叠时只显示logo -->
    <div class="sidebar-header" v-if="!isCollapsed && !isMobile">
      <div class="logo">
        <img src="/logo1.webp" alt="Taxo Logo" class="logo-image" fetchpriority="high">
      </div>
      <!-- <div class="sidebar-title">Taxo Financial Free Calculators</div> -->
    </div>
    <!-- 折叠时显示小logo - 只在桌面端显示 -->
    <div class="sidebar-header-collapsed" v-else-if="isCollapsed && !isMobile">
      <div class="logo-collapsed">
        <img src="/logo1.webp" alt="Taxo Logo" class="logo-image-collapsed">
      </div>
    </div>
      
    <!-- Navigation - 只在桌面端未折叠时显示 -->
    <div class="sidebar-nav" v-if="!isCollapsed && !isMobile">
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
    
    <!-- Sidebar Footer - 只在桌面端未折叠时显示 -->
    <div class="sidebar-footer" v-if="!isCollapsed && !isMobile">
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

  <!-- 移动端全屏菜单 - 单独弹出层 -->
  <div class="mobile-menu-overlay" v-if="isMobile && mobileMenuOpen" @click="closeMobileMenu">
    <div class="mobile-menu-content" @click.stop>
      <div class="mobile-menu-header">
        <div class="mobile-logo">
          <img src="/logo1.webp" alt="Taxo Logo" class="mobile-logo-image">
          <span class="mobile-app-name">Financial Tools</span>
        </div>
        <button class="mobile-close-btn" @click="closeMobileMenu">✕</button>
      </div>
      
      <div class="mobile-nav">
        <template v-for="nav in navigation" :key="nav.id">
          <div 
            :class="['mobile-nav-item', nav.expanded ? 'expanded' : '']"
            @click="toggleMobileNav(nav)"
          >
            <div class="mobile-nav-title">
              <span class="mobile-nav-icon">{{ nav.icon }}</span>
              <span class="mobile-nav-text">{{ nav.title }}</span>
            </div>
            <span v-if="nav.children" class="mobile-nav-arrow">▼</span>
          </div>
          
          <!-- Mobile Sub Navigation -->
          <div 
            v-if="nav.children && nav.expanded"
            :key="'mobile-sub-' + nav.id"
            class="mobile-subnav"
          >
            <div 
              v-for="child in nav.children" 
              :key="child.id"
              :class="['mobile-subnav-item', activeSubNav === child.id ? 'active' : '']"
              @click="navigateToMobile(child)"
            >
              {{ child.title }}
            </div>
          </div>
        </template>
      </div>
      
      <div class="mobile-footer">
        <div class="mobile-social-icons">
          <div class="mobile-social-icon" @click="shareOnTwitter">𝕏</div>
          <div class="mobile-social-icon" @click="shareOnFacebook">f</div>
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
        route: '/a/global-vat',
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
        route: '/a/take-home-paycheck-calculator',
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
        route: '/a/mortgage',
        component: 'MortgageCalculator'
      },
      {
        id: 'amortization-ca',
        title: 'Amortization Calculator',
        route: '/a/amortization',
        component: 'AmortizationCalculator'
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
        route: '/a/interest',
        component: 'InterestCalculator'
      },
      {
        id: 'investment-ca',
        title: 'Investment Calculator',
        route: '/a/investment',
        component: 'InvestmentCalculator'
      },
      {
        id: 'finance-ca',
        title: 'Finance Calculator',
        route: '/a/finance',
        component: 'FinanceCalculator'
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
        route: '/a/auto-loan',
        component: 'AutoLoanCalculator'
      },
      {
        id: 'cashback-ca',
        title: 'Cash Back or Low Interest Calculator',
        route: '/a/cashback',
        component: 'CashbackCalculator'
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
        route: '/a/loan',
        component: 'LoanCalculator'
      },
      {
        id: 'currency-ca',
        title: 'Currency Calculator',
        route: '/a/currency',
        component: 'CurrencyCalculator'
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
      mobileMenuOpen: false,
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
        // 移动端选择后关闭菜单
        if (this.isMobile) {
          this.mobileMenuOpen = false
        }
      },
      immediate: true
    }
  },
  methods: {
    checkMobile() {
      // 检测是否为移动端（宽度小于768px）
      this.isMobile = window.innerWidth < 768
      // 如果是移动端，强制收起侧边栏
      if (this.isMobile) {
        this.isCollapsed = false
        this.mobileMenuOpen = false
      }
    },
    handleResize() {
      const wasMobile = this.isMobile
      this.checkMobile()
      
      // 如果从桌面端切换到移动端
      if (!wasMobile && this.isMobile) {
        this.isCollapsed = false
        this.mobileMenuOpen = false
      }
      // 如果从移动端切换到桌面端
      else if (wasMobile && !this.isMobile) {
        this.isCollapsed = false
        this.mobileMenuOpen = false
      }
    },
    toggleSidebar() {
      // 桌面端切换侧边栏状态
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
    openMobileMenu() {
      this.mobileMenuOpen = true
      // 重置导航状态
      this.navigation.forEach((nav, index) => {
        nav.expanded = index === 0
      })
      document.body.style.overflow = 'hidden' // 禁止背景滚动
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
      document.body.style.overflow = '' // 恢复背景滚动
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
    toggleMobileNav(navItem) {
      // 移动端导航切换
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
      
      // 强制导航
      if (this.$route.path === child.route) {
        console.log('Same route, forcing reload...')
        this.$router.replace(child.route).then(() => {
          console.log('Route replaced')
          this.$forceUpdate()
          window.dispatchEvent(new CustomEvent('route-changed', { 
            detail: { route: child.route }
          }))
        }).catch(err => {
          console.log('Navigation error:', err)
        })
      } else {
        this.$router.push(child.route).catch(err => {
          console.log('Navigation error:', err)
        })
      }
      
      this.activeSubNav = child.id
      this.updateNavigationState(child.route)
    },
    navigateToMobile(child) {
      // 移动端导航，然后关闭菜单
      this.navigateTo(child)
      this.closeMobileMenu()
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
/* 基础样式 */
.sidebar {
  transition: all 0.3s ease;
  background: white;
  height: 100vh;
  overflow-y: auto;
  position: relative;
  z-index: 1000;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar.expanded {
  width: 250px;
}

.sidebar.mobile-hidden {
  display: none; /* 移动端完全隐藏 */
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

/* 移动端菜单按钮 */
.mobile-menu-btn {
  position: fixed;
  top: 10px;
  left: 10px;
  width: 44px;
  height: 44px;
  background: #4f46e5;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  z-index: 1001;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

/* 移动端全屏菜单覆盖层 */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  animation: fadeIn 0.3s ease;
}

.mobile-menu-content {
  width: 85%;
  max-width: 320px;
  height: 100vh;
  background: white;
  overflow-y: auto;
  animation: slideIn 0.3s ease;
  display: flex;
  flex-direction: column;
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.mobile-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mobile-logo-image {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.mobile-app-name {
  font-weight: 600;
  color: #1f2937;
}

.mobile-close-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: #f3f4f6;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-nav {
  flex: 1;
  padding: 16px;
}

.mobile-nav-item {
  margin-bottom: 8px;
  border-radius: 8px;
  overflow: hidden;
}

.mobile-nav-title {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #f9fafb;
  cursor: pointer;
  border-radius: 8px;
}

.mobile-nav-icon {
  margin-right: 12px;
  font-size: 20px;
}

.mobile-nav-text {
  flex: 1;
  font-weight: 500;
  color: #1f2937;
}

.mobile-nav-arrow {
  transition: transform 0.3s ease;
  color: #6b7280;
}

.mobile-nav-item.expanded .mobile-nav-arrow {
  transform: rotate(180deg);
}

.mobile-subnav {
  padding-left: 44px;
  background: #f9fafb;
  margin-top: 2px;
  border-radius: 8px;
}

.mobile-subnav-item {
  padding: 10px 12px;
  cursor: pointer;
  color: #4b5563;
  transition: all 0.2s ease;
}

.mobile-subnav-item.active {
  color: #4f46e5;
  font-weight: 500;
  background: #eef2ff;
}

.mobile-footer {
  padding: 16px;
  border-top: 1px solid #e5e7eb;
}

.mobile-social-icons {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.mobile-social-icon {
  width: 40px;
  height: 40px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
}

/* 动画 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

/* 桌面端样式 */
@media (min-width: 768px) {
  .sidebar {
    position: relative;
  }
  
  .sidebar.collapsed {
    width: 60px;
  }
  
  .sidebar.expanded {
    width: 250px;
  }
}
</style>