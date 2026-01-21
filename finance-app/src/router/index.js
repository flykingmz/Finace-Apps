import { createRouter, createWebHistory } from 'vue-router'

// 导入组件
import Dashboard from '@/views/Dashboard.vue'
import CalculatorView from '@/views/CalculatorView.vue'
import PaycheckCalculator from '@/components/PaycheckCalculator.vue'
import GlobalPriceCalculator from '@/components/GlobalPriceCalculator.vue'
import IncomeTaxCalculator from '@/components/IncomeTaxCalculator.vue'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      subtitle: 'Financial Tools Dashboard'
    }
  },
  {
    path: '/calculator',
    name: 'CalculatorView',
    component: CalculatorView,
    children: [
      {
        path: 'paycheck',
        name: 'PaycheckCalculator',
        component: PaycheckCalculator,
        meta: {
          title: 'Paycheck Calculator',
          subtitle: 'Estimate your net pay after deductions'
        }
      },
      {
        path: 'global-price',
        name: 'GlobalPriceCalculator',
        component: GlobalPriceCalculator,
        meta: {
          title: 'Global Price Calculator',
          subtitle: 'Calculate international pricing with taxes and fees'
        }
      },
      {
        path: 'income-tax',
        name: 'IncomeTaxCalculator',
        component: IncomeTaxCalculator,
        meta: {
          title: 'Income Tax Calculator',
          subtitle: 'Calculate federal and state income taxes'
        }
      }
    ]
  },
  // 重定向
  {
    path: '/paycheck-calculator',
    redirect: '/calculator/paycheck'
  },
  {
    path: '/global-price-calculator',
    redirect: '/calculator/global-price'
  },
  {
    path: '/income-tax-calculator',
    redirect: '/calculator/income-tax'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

// 路由守卫 - 更新页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title 
    ? `${to.meta.title} - Finance Apps` 
    : 'Finance Apps'
  next()
})

export default router