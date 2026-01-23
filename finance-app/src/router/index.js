import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: () => import('../components/DefaultView.vue')
      },
      {
        path: 'global-price',
        name: 'GlobalPriceCalculator',
        component: () => import('../components/GlobalPriceCalculator.vue'),
        meta: { keepAlive: false } // 确保不缓存
      },
      {
        path: 'paycheck',
        name: 'PaycheckCalculator',
        component: () => import('../components/PaycheckCalculator.vue'),
        meta: { keepAlive: false }
      },
      {
        path: 'income-tax',
        name: 'IncomeTaxCalculator',
        component: () => import('../components/IncomeTaxCalculator.vue'),
        meta: { keepAlive: false }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 添加全局路由守卫
router.beforeEach((to, from, next) => {
  console.log('Route changing from:', from.path, 'to:', to.path)
  
  // 如果是相同路由，强制重新加载
  if (to.path === from.path) {
    console.log('Same route detected, forcing reload')
    // 这里我们可以添加一些逻辑来强制刷新
  }
  
  next()
})

// 添加路由解析守卫
router.beforeResolve((to, from, next) => {
  console.log('Route resolving:', to.path)
  next()
})

// 添加路由后置守卫
router.afterEach((to, from) => {
  console.log('Route changed to:', to.path)
  // 可以在这里触发一些全局事件
  window.dispatchEvent(new CustomEvent('route-navigated', { 
    detail: { to: to.path, from: from.path }
  }))
})

export default router