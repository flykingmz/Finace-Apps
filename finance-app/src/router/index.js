import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: () => import('../components/Home.vue')
      },
      {
        path: 'all-calculators',
        name: 'DashboardAll',
        component: () => import('../components/DefaultView.vue')
      },
      {
        path: 'tax-salary-calculators',
        name: 'TaxSalaryCalculators',
        component: () => import('../components/TaxSalaryCalculators.vue')
      },
      {
        path: 'retirement-calculators',
        name: 'RetirementCalculators',
        component: () => import('../components/RetirementCalculators.vue')
      },
      {
        path: 'mortgage-RE-calculators',
        name: 'MortgageRECalculators',
        component: () => import('../components/MortgageRECalculators.vue')
      },
      {
        path: 'investment-calculators',
        name: 'InvestmentCalculators',
        component: () => import('../components/InvestmentCalculators.vue')
      },
      {
        path: 'auto-calculators',
        name: 'AutoCalculators',
        component: () => import('../components/AutoCalculators.vue')
      },
      {
        path: 'other-calculators',
        name: 'OtherCalculators',
        component: () => import('../components/OtherCalculators.vue')
      },
      {
        path: 'global-vat',
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
      },
      {
        path: 'take-home-paycheck-calculator',
        name: 'TakeHomePaycheckCalculator',
        component: () => import('../components/TakeHomePaycheckCalculator.vue'),
        meta: { keepAlive: false }
      },
      {
        path: 'retirement',
        name: 'RetirementCalculator',
        component: () => import('../components/RetirementCalculator.vue'),
        meta: { keepAlive: false }
      },
      {
        path: '401k',
        name: '401KCalculator',
        component: () => import('../components/401KCalculator.vue'),
        meta: { keepAlive: false }
      },finance-app/src/components/
      {
        path: 'pension',
        name: 'PensionCalculator',
        component: () => import('../components/PensionCalculator.vue'),
        meta: { keepAlive: false }
      },
      {
        path: 'social-security',
        name: 'SocialSecurityCalculator',
        component: () => import('../components/SocialSecurityCalculator.vue'),
        meta: { keepAlive: false }
      },
      {
        path: 'about-us',
        name: 'AboutUs',
        component: () => import('../footlink/AboutUs.vue'),
        meta: { keepAlive: false }
      },
      {
        path: 'terms-of-use',
        name: 'TermsOfUse',
        component: () => import('../footlink/TermsOfUse.vue'),
        meta: { keepAlive: false }
      },
      {
        path: 'privacy-policy',
        name: 'PrivacyPolicy',
        component: () => import('../footlink/PrivacyPolicy.vue'),
        meta: { keepAlive: false }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

// 添加全局路由守卫
router.beforeEach((to, from, next) => {
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
