import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/calculator',
    name: 'CalculatorView',
    component: () => import('../views/CalculatorView.vue'),
    children: [
      {
        path: 'global-price',
        name: 'GlobalPriceCalculator',
        component: () => import('../components/GlobalPriceCalculator.vue')
      },
      {
        path: 'paycheck',
        name: 'PaycheckCalculator',
        component: () => import('../components/PaycheckCalculator.vue')
      },
      {
        path: 'income-tax',
        name: 'IncomeTaxCalculator',
        component: () => import('../components/IncomeTaxCalculator.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

