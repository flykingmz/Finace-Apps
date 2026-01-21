<template>
  <div :class="['sidebar', isCollapsed ? 'collapsed' : 'expanded']">
    <!-- Toggle Button -->
    <div class="toggle-btn" @click="toggleSidebar">
      {{ isCollapsed ? '→' : '←' }}
    </div>
    
    <!-- Sidebar Header -->
    <div class="sidebar-header">
      <div class="logo">F</div>
      <div class="sidebar-title">Finance Apps</div>
    </div>
    
    <!-- Navigation -->
    <div class="sidebar-nav">
      <div 
        v-for="nav in navigation" 
        :key="nav.id"
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
        v-for="nav in navigation" 
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
        route: '/calculator/global-price'
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
        route: '/calculator/paycheck'
      },
      {
        id: 'income-tax',
        title: 'Income Tax Calculator',
        route: '/calculator/income-tax'
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
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
    },
    toggleNav(navItem) {
      this.navigation.forEach(nav => {
        if (nav.id === navItem.id) {
          nav.expanded = !nav.expanded
          nav.active = true
        } else {
          nav.active = false
        }
      })
    },
    navigateTo(child) {
      this.activeSubNav = child.id
      this.$router.push(child.route)
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
  },
  mounted() {
    // Set initial active navigation based on current route
    const currentRoute = this.$route.path
    this.navigation.forEach(nav => {
      if (nav.children) {
        nav.children.forEach(child => {
          if (child.route === currentRoute) {
            this.activeSubNav = child.id
            nav.expanded = true
            nav.active = true
          }
        })
      }
    })
  }
}
</script>