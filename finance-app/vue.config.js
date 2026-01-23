const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('prerender').use(require('prerender-spa-plugin'), [
        {
          staticDir: path.join(__dirname, 'dist'),
          routes: [
            '/',
            '/dashboard',
            '/dashboard/paycheck',
            '/dashboard/income-tax',
            '/dashboard/global-price'
          ],
          renderer: require('@prerenderer/renderer-puppeteer'),
          postProcess(renderedRoute) {
            // 为每个页面添加 JSON-LD
            renderedRoute.html = renderedRoute.html.replace(
              '</head>',
              `
              <script type="application/ld+json">
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Finance Apps",
                "url": "https://finance-apps.com${renderedRoute.route}",
                "description": "Financial Calculator"
              }
              </script>
              </head>
              `
            )
            return renderedRoute
          }
        }
      ])
    }
  }
})