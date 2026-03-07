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
        path: 'marriage-tax-calculator',
        name: 'MarriageTaxCalculator',
        component: () => import('../components/MarriageTaxCalculator.vue'),
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
      },
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
        path: 'annuity',
        name: 'AnnuityCalculator',
        component: () => import('../components/AnnuityCalculator.vue'),
        meta: { keepAlive: false }
      },
       {
        path: 'annuity-payout',
        name: 'AnnuityPayoutCalculator',
        component: () => import('../components/AnnuityPayoutCalculator.vue'),
        meta: { keepAlive: false }
      },
       {
        path: 'mortgage',
        name: 'MortgageCalculator',
        component: () => import('../components/MortgageCalculator.vue'),
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
      },
      {
        path: 'blog',
        name: 'Blog',
        component: () => import('../components/Blog.vue'),
        meta: { keepAlive: false }
      },
      {
        path: 'vat-gst-sales-tax-blog',
        name: 'VatGstSalesTax',
        component: () => import('../blog/VatGstSalesTax.vue'),
        meta: { keepAlive: false }
      },
      {
        path: 'social-security-blog',
        name: 'SocialSecurity',
        component: () => import('../blog/SocialSecurity.vue'),
        meta: { keepAlive: false }
      },
      {
        path: 'bt-at-income-blog',
        name: 'BTvsATIncome',
        component: () => import('../blog/BTvsATIncome.vue'),
        meta: { keepAlive: false }
      },
      {
        path: 'general-annuity-info-blog',
        name: 'GeneralAnnuityInfo',
        component: () => import('../blog/GeneralAnnuityInfo.vue'),
        meta: { keepAlive: false }
      },
      {
        path: 'marriage-tax-penalty-blog',
        name: 'MarriageTaxPenalty',
        component: () => import('../blog/MarriageTaxPenalty.vue'),
        meta: { keepAlive: false }
      },
      {
        path: 'when-should-you-claim-social-security-blog',
        name: 'WhenShouldYouClaimSocialSecurity',
        component: () => import('../blog/WhenShouldYouClaimSocialSecurity.vue'),
        meta: { keepAlive: false }
      },
      {
        path: 'how-long-will-last-in-retirement-blog',
        name: 'HowLongWillLastInRetirement',
        component: () => import('../blog/HowLongWillLastInRetirement.vue'),
        meta: { keepAlive: false }
      },
      {
        path: 'vat-vs-gst-vs-sales-tax-a-global-comparison-table-blog',
        name: 'VATvsGSTvsSalesTaxAGlobalComparisonTable',
        component: () => import('../blog/VATvsGSTvsSalesTaxAGlobalComparisonTable.vue'),
        meta: { keepAlive: false }
      },
      {
        path: 'the-hidden-cost-of-filing-taxes-jointly-vs-separately-blog',
        name: 'TheHiddenCostofFilingTaxesJointlyvsSeparately',
        component: () => import('../blog/TheHiddenCostofFilingTaxesJointlyvsSeparately.vue'),
        meta: { keepAlive: false }
      },
      {
        path: 'how-much-house-can-i-afford-blog',
        name: 'HowMuchHouseCanIAfford',
        component: () => import('../blog/HowMuchHouseCanIAfford.vue'),
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
