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
        component: () => import('../components/DefaultView.vue'),
        meta: {
          jsonLd: {
            type: 'WebSite',
            name: 'Finance Apps Dashboard',
            description: 'Financial calculators dashboard'
          }
        }
      },
      {
        path: 'global-price',
        name: 'GlobalPriceCalculator',
        component: () => import('../components/GlobalPriceCalculator.vue'),
        meta: {
          jsonLd: {
            type: 'WebApplication',
            name: 'Global Price Calculator',
            description: 'Calculate product prices with taxes and fees across different countries'
          }
        }
      },
      {
        path: 'paycheck',
        name: 'PaycheckCalculator',
        component: () => import('../components/PaycheckCalculator.vue'),
        meta: {
          jsonLd: {
            type: 'WebApplication',
            name: 'Paycheck Calculator',
            description: 'Calculate net pay, taxes, and deductions for salaried and hourly employees'
          }
        }
      },
      {
        path: 'income-tax',
        name: 'IncomeTaxCalculator',
        component: () => import('../components/IncomeTaxCalculator.vue'),
        meta: {
          jsonLd: {
            type: 'WebApplication',
            name: 'Income Tax Calculator',
            description: 'Calculate income tax based on federal and state tax brackets'
          }
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫 - 在每个路由变化时注入 JSON-LD
router.afterEach((to) => {
  // 等待组件加载完成
  setTimeout(() => {
    injectJsonLdForRoute(to)
  }, 100)
})

function injectJsonLdForRoute(to) {
  // 移除旧的 JSON-LD
  const oldScripts = document.querySelectorAll('script[data-route-jsonld]')
  oldScripts.forEach(script => script.remove())
  
  // 从路由 meta 获取 JSON-LD 配置
  const jsonLdConfig = to.meta?.jsonLd
  if (!jsonLdConfig) return
  
  // 创建 JSON-LD 数据
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": jsonLdConfig.type,
    "name": jsonLdConfig.name,
    "url": window.location.href,
    "description": jsonLdConfig.description
  }
  
  // 根据页面类型添加额外信息
  if (jsonLdConfig.type === 'WebApplication') {
    jsonLd.applicationCategory = 'FinanceApplication'
    jsonLd.offers = {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
  
  // 创建并注入脚本
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-route-jsonld', 'true')
  script.textContent = JSON.stringify(jsonLd, null, 2)
  
  // 确保添加到 head 的最开始位置
  const firstScript = document.head.querySelector('script')
  if (firstScript) {
    document.head.insertBefore(script, firstScript)
  } else {
    document.head.appendChild(script)
  }
  
  console.log('JSON-LD injected for route:', to.name)
}

export default router