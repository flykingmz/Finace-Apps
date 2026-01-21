<template>
<Analytics />
  <div id="app">
    <!-- 上层：广告位和标题 -->
    <header class="header-layer">
      <!-- GoogleAd.vue -->
    <div class="ad-container">
    <!-- AdSense广告单元 -->
    <ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-6532088016298458"
     data-ad-slot="7872912625"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
    </div>
      
      <div class="title-section">
        <h1 class="main-title">🌍 Global Price Calculator</h1>
        <p class="subtitle">智能计算全球商品价格 · 含税价 · 手续费 · 到手价 · VAT / GST / 消费税 标准税率</p>
      </div>
    </header>

    <!-- 中层：核心功能区域 -->
    <main class="middle-layer">
      <div class="calculator-container">
        <!-- 左侧：输入区域 -->
        <div class="input-panel">
          <div class="panel-header">
            <h2><span class="icon">📝</span> 输入参数</h2>
            <div class="reset-btn" @click="resetInputs">重置</div>
          </div>
          
          <div class="input-groups">
            <div class="input-group">
              <label class="input-label">
                <span class="label-icon">💰</span> 商品原价 (USD)
              </label>
              <div class="price-input-container">
                <span class="currency-prefix">$</span>
                <input 
                  type="number" 
                  v-model="basePrice" 
                  min="0" 
                  step="0.01" 
                  placeholder="输入价格"
                  @input="calculatePrices"
                  class="price-input"
                />
                <span class="input-hint">税前价格</span>
              </div>
            </div>
            
            <div class="input-group">
              <label class="input-label">
                <span class="label-icon">📍</span> 选择国家/地区
              </label>
              <div class="select-container">
                <select 
                  v-model="selectedCountryKey" 
                  @change="onCountryChange"
                  class="country-select"
                >
                  <option value="">请选择国家/地区</option>
                  <optgroup 
                    v-for="(countries, region) in regions" 
                    :key="region" 
                    :label="regionLabels[region]"
                  >
                    <option 
                      v-for="country in countries" 
                      :key="country.key"
                      :value="country.key"
                    >
                      {{ country.chineseName }} ({{ country.country }})
                    </option>
                  </optgroup>
                </select>
                <div class="selected-country-display" v-if="selectedCountry">
                  <span class="flag">🌐</span>
                  <span>{{ selectedCountry.chineseName }}</span>
                  <span class="tax-rate-display">{{ selectedCountry.rate }}</span>
                </div>
              </div>
            </div>
            
            <div class="input-group">
              <label class="input-label">
                <span class="label-icon">⚙️</span> 平台手续费率
                <span class="slider-value-display">{{ platformFeeRate }}%</span>
              </label>
              <div class="slider-container">
                <input 
                  type="range" 
                  v-model="platformFeeRate" 
                  min="0" 
                  max="15" 
                  step="0.5"
                  @input="calculatePrices"
                  class="custom-slider"
                />
                <div class="slider-marks">
                  <span>0%</span>
                  <span>5%</span>
                  <span>10%</span>
                  <span>15%</span>
                </div>
              </div>
            </div>
            
            <div class="input-group">
              <label class="input-label">
                <span class="label-icon">💱</span> 计算货币
              </label>
              <div class="currency-grid">
                <button 
                  v-for="currency in currencies" 
                  :key="currency.code"
                  @click="selectedCurrency = currency.code; calculatePrices()"
                  :class="{ active: selectedCurrency === currency.code }"
                  class="currency-chip"
                >
                  <span class="currency-symbol">{{ currency.symbol }}</span>
                  <span class="currency-code">{{ currency.code }}</span>
                </button>
              </div>
            </div>
          </div>
          
          <div class="quick-actions">
            <div class="action-title">常用场景</div>
            <div class="action-buttons">
              <button @click="setExample('germany')" class="action-btn">
                德国 (19%)
              </button>
              <button @click="setExample('japan')" class="action-btn">
                日本 (10%)
              </button>
              <button @click="setExample('china')" class="action-btn">
                中国 (13%)
              </button>
              <button @click="setExample('hongkong')" class="action-btn">
                香港 (0%)
              </button>
            </div>
          </div>
        </div>
        
        <!-- 右侧：结果展示区域 -->
        <div class="result-panel">
          <div class="panel-header">
            <h2><span class="icon">📊</span> 计算结果</h2>
            <div class="last-updated">实时计算</div>
          </div>
          
          <div v-if="showResults" class="results-content">
            <div class="country-highlight">
              <div class="country-flag">🌐</div>
              <div class="country-info">
                <h3>{{ selectedCountry.chineseName }}</h3>
                <p>{{ selectedCountry.country }} · 税率: {{ selectedCountry.rate }}</p>
              </div>
            </div>
            
            <div class="results-grid">
              <div class="result-card">
                <div class="result-icon">💵</div>
                <div class="result-content">
                  <div class="result-label">商品原价</div>
                  <div class="result-value">{{ formatCurrency(basePrice) }}</div>
                  <div class="result-subtext">税前价格</div>
                </div>
              </div>
              
              <div class="result-card">
                <div class="result-icon">🧾</div>
                <div class="result-content">
                  <div class="result-label">税费金额</div>
                  <div class="result-value">{{ formatCurrency(taxAmount) }}</div>
                  <div class="result-subtext">增值税/消费税</div>
                </div>
              </div>
              
              <div class="result-card highlighted">
                <div class="result-icon">🛒</div>
                <div class="result-content">
                  <div class="result-label">含税价</div>
                  <div class="result-value">{{ formatCurrency(finalPrice) }}</div>
                  <div class="result-subtext">消费者支付价格</div>
                </div>
                <div class="highlight-badge">最终价格</div>
              </div>
              
              <div class="result-card">
                <div class="result-icon">📈</div>
                <div class="result-content">
                  <div class="result-label">平台手续费</div>
                  <div class="result-value">{{ formatCurrency(platformFee) }}</div>
                  <div class="result-subtext">{{ platformFeeRate }}% 费率</div>
                </div>
              </div>
              
              <div class="result-card">
                <div class="result-icon">💎</div>
                <div class="result-content">
                  <div class="result-label">到手价</div>
                  <div class="result-value">{{ formatCurrency(netPrice) }}</div>
                  <div class="result-subtext">卖家实际收入</div>
                </div>
              </div>
            </div>
            
            <div class="price-breakdown">
              <div class="breakdown-header">
                <h4>价格构成分析</h4>
                <div class="breakdown-percentages">
                  <span>原价: {{ pricePercentage.toFixed(1) }}%</span>
                  <span>税费: {{ taxPercentage.toFixed(1) }}%</span>
                  <span>手续费: {{ feePercentage.toFixed(1) }}%</span>
                </div>
              </div>
              <div class="breakdown-bar">
                <div 
                  class="bar-segment original" 
                  :style="{ width: pricePercentage + '%' }"
                  :title="'原价: ' + pricePercentage.toFixed(1) + '%'"
                ></div>
                <div 
                  class="bar-segment tax" 
                  :style="{ width: taxPercentage + '%' }"
                  :title="'税费: ' + taxPercentage.toFixed(1) + '%'"
                ></div>
                <div 
                  class="bar-segment fee" 
                  :style="{ width: feePercentage + '%' }"
                  :title="'手续费: ' + feePercentage.toFixed(1) + '%'"
                ></div>
              </div>
              
              <div class="profit-analysis">
                <div class="analysis-item">
                  <span class="analysis-label">利润率</span>
                  <span class="analysis-value">
                    {{ ((netPrice - basePrice) / basePrice * 100).toFixed(1) }}%
                  </span>
                </div>
                <div class="analysis-item">
                  <span class="analysis-label">税费占比</span>
                  <span class="analysis-value">
                    {{ (taxAmount / finalPrice * 100).toFixed(1) }}%
                  </span>
                </div>
                <div class="analysis-item">
                  <span class="analysis-label">手续费占比</span>
                  <span class="analysis-value">
                    {{ (platformFee / finalPrice * 100).toFixed(1) }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="empty-state">
            <div class="empty-icon">📋</div>
            <h3>等待输入</h3>
            <p>请输入商品价格并选择国家/地区开始计算</p>
            <div class="example-tips">
              <p><strong>小提示：</strong></p>
              <ul>
                <li>选择国家后，系统自动计算该国的标准税率</li>
                <li>平台手续费率可根据实际情况调整</li>
                <li>可切换不同货币查看结果</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 下层：广告位和页脚 -->
    <footer class="footer-layer">
      <div class="ad-bottom">
        <div class="ad-content">
          <span class="ad-badge">合作伙伴</span>
          <span>📦 国际物流服务 · 海关清关 · 税务申报 · 一站解决跨境难题</span>
          <button class="ad-cta">免费咨询 →</button>
        </div>
      </div>
      
      <div class="footer-content">
        <div class="footer-grid">
          <!-- 关于说明 -->
          <div class="footer-section">
            <h4 class="footer-title">关于本工具</h4>
            <p class="footer-text">
              Global Price Calculator 是一个专业的全球商品价格计算工具，帮助跨境电商卖家、外贸企业和个人准确计算不同国家的含税价格、平台手续费和实际到手价。
            </p>
            <p class="footer-text">
              数据基于各国官方税务机构发布的最新税率标准，计算结果仅供参考，实际税率可能因商品类别、地区政策等因素而有所不同。
            </p>
          </div>
          
          <!-- 快速链接 -->
          <div class="footer-section">
            <h4 class="footer-title">快速链接</h4>
            <ul class="footer-links">
              <li><a href="#" class="footer-link">税率查询</a></li>
              <li><a href="#" class="footer-link">使用教程</a></li>
              <li><a href="#" class="footer-link">API接口</a></li>
              <li><a href="#" class="footer-link">批量计算</a></li>
              <li><a href="#" class="footer-link">历史记录</a></li>
            </ul>
          </div>
          
          <!-- 数据声明 -->
          <div class="footer-section">
            <h4 class="footer-title">数据声明</h4>
            <div class="disclaimer">
              <p>📊 数据来源：各国税务局官方公告、Trading Economics、World Bank</p>
              <p>⏰ 更新频率：每月定期更新</p>
              <p>⚠️ 免责声明：本工具计算结果仅供参考，不构成专业税务建议。实际业务请咨询专业税务顾问。</p>
              <p>📅 最后更新：2026年1月</p>
            </div>
          </div>
          
          <!-- 联系反馈 -->
          <div class="footer-section">
            <h4 class="footer-title">联系与反馈</h4>
            <div class="contact-info">
              <p class="contact-item">
                <span class="contact-icon">📧</span>
                <a href="mailto:flykingmz@gmail.com" class="contact-link">
                  flykingmz@gmail.com
                </a>
              </p>
              <p class="contact-item">
                <span class="contact-icon">🐦</span>
                <a href="" class="contact-link">
                flykingmz@gmail.com
                </a>
              </p>
              <p class="contact-item">
                <span class="contact-icon">💬</span>
                <a href="#" class="contact-link">在线客服</a>
              </p>
            </div>
            <div class="feedback-form">
              <input 
                type="email" 
                placeholder="输入邮箱接收更新"
                class="feedback-input"
              />
              <button class="feedback-btn">订阅</button>
            </div>
            <div class="social-links">
              <button class="social-btn">GitHub</button>
              <button class="social-btn">Twitter</button>
              <button class="social-btn">LinkedIn</button>
              <button class="social-btn">Discord</button>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>© 2025 Global Price Calculator · 全球商品价格计算工具 · 保留所有权利</p>
          <div class="footer-bottom-links">
            <a href="#" class="footer-bottom-link">隐私政策</a>
            <span class="separator">|</span>
            <a href="#" class="footer-bottom-link">服务条款</a>
            <span class="separator">|</span>
            <a href="#" class="footer-bottom-link">Cookie政策</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { Analytics } from '@vercel/analytics/vue'
import { useHead } from '@vueuse/head'

const adLoaded = ref(false);

function loadAdScript() {
  // 1. 检查脚本是否已存在，避免重复加载
  if (window.adsbygoogle) {
    adLoaded.value = true;
    return;
  }

  // 2. 动态创建script标签
  const script = document.createElement('script');
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6532088016298458';
  script.async = true;
  script.crossOrigin = 'anonymous';

  // 3. 脚本加载成功后的回调
  script.onload = () => {
    adLoaded.value = true;
    console.log('AdSense script loaded.');
    // 可以在这里触发首次广告加载
    // (window.adsbygoogle = window.adsbygoogle || []).push({});
  };

  // 4. 将脚本插入DOM
  document.head.appendChild(script);
}

onMounted(() => {
  // 在组件挂载后加载脚本
  loadAdScript();
});

// 定义你的结构化数据
const jsonLdData = computed(() => ({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "国际商品税费计算器",
        "description": "智能计算全球商品价格 · 含税价 · 手续费 · 到手价 · VAT / GST / 消费税 标准税率",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
}))

// 注入到<head>
useHead({
  title: '国际商品税费计算器', // 同时设置标题
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify(jsonLdData.value)
  }],
  meta: [
    { name: '国际商品税费计算器', content: '智能计算全球商品价格 · 含税价 · 手续费 · 到手价 · VAT / GST / 消费税 标准税率' }
  ]
})

// 响应式数据
const basePrice = ref(100)
const selectedCountryKey = ref('germany') // 改为存储key值
const platformFeeRate = ref(5.0)
const selectedCurrency = ref('USD')
const taxAmount = ref(0)
const finalPrice = ref(0)
const platformFee = ref(0)
const netPrice = ref(0)
const pricePercentage = ref(0)
const taxPercentage = ref(0)
const feePercentage = ref(0)

// 准备税率数据，为每个国家添加唯一key
const prepareRegions = () => {
  const rawData = {
    Europe: [
      {"country": "Austria", "chineseName": "奥地利", "rate": "20"},
      {"country": "Belgium", "chineseName": "比利时", "rate": "21"},
      {"country": "Bulgaria", "chineseName": "保加利亚", "rate": "20"},
      {"country": "Croatia", "chineseName": "克罗地亚", "rate": "25"},
      {"country": "Czech Republic", "chineseName": "捷克", "rate": "21"},
      {"country": "Denmark", "chineseName": "丹麦", "rate": "25"},
      {"country": "France", "chineseName": "法国", "rate": "20"},
      {"country": "Germany", "chineseName": "德国", "rate": "19"},
      {"country": "Hungary", "chineseName": "匈牙利", "rate": "27"},
      {"country": "Ireland", "chineseName": "爱尔兰", "rate": "23"},
      {"country": "Italy", "chineseName": "意大利", "rate": "22"},
      {"country": "Netherlands", "chineseName": "荷兰", "rate": "21"},
      {"country": "Norway", "chineseName": "挪威", "rate": "25"},
      {"country": "Spain", "chineseName": "西班牙", "rate": "21"},
      {"country": "Sweden", "chineseName": "瑞典", "rate": "25"},
      {"country": "United Kingdom", "chineseName": "英国", "rate": "20"}
    ],
    Asia: [
      {"country": "China", "chineseName": "中国", "rate": "13 / 9 / 6*"},
      {"country": "India", "chineseName": "印度", "rate": "28 / 18 / 12 / 5 / 0*"},
      {"country": "Indonesia", "chineseName": "印度尼西亚", "rate": "10 / 11*"},
      {"country": "Japan", "chineseName": "日本", "rate": "10"},
      {"country": "Singapore", "chineseName": "新加坡", "rate": "7"},
      {"country": "Thailand", "chineseName": "泰国", "rate": "7"}
    ],
    AfricaAndMiddleEast: [
      {"country": "South Africa", "chineseName": "南非", "rate": "15"},
      {"country": "Kenya", "chineseName": "肯尼亚", "rate": "16"},
      {"country": "Nigeria", "chineseName": "尼日利亚", "rate": "7.5"},
      {"country": "Saudi Arabia", "chineseName": "沙特", "rate": "15"},
      {"country": "United Arab Emirates", "chineseName": "阿联酋", "rate": "5"}
    ],
    Americas: [
      {"country": "Canada", "chineseName": "加拿大", "rate": "5 (GST) + PST 省级"},
      {"country": "Mexico", "chineseName": "墨西哥", "rate": "16"},
      {"country": "United States", "chineseName": "美国", "rate": "0–约15+"},
      {"country": "Panama", "chineseName": "巴拿马", "rate": "7"}
    ],
    ZeroRateOrOther: [
      {"country": "Hong Kong", "chineseName": "香港", "rate": "0"},
      {"country": "Kuwait", "chineseName": "科威特", "rate": "0"},
      {"country": "Qatar", "chineseName": "卡塔尔", "rate": "0"},
      {"country": "Brunei", "chineseName": "文莱", "rate": "0"},
      {"country": "Bhutan", "chineseName": "不丹", "rate": "0"}
    ]
  }
  
  // 为每个国家添加唯一key
  const regionsWithKeys: any = {}
  Object.keys(rawData).forEach(region => {
    regionsWithKeys[region] = (rawData as any)[region].map((country: any) => ({
      ...country,
      key: `${region.toLowerCase()}_${country.country.toLowerCase().replace(/\s+/g, '_')}`
    }))
  })
  
  return regionsWithKeys
}

const regions = prepareRegions()

// 根据key查找国家
const findCountryByKey = (key: string) => {
  for (const region of Object.values(regions)) {
    const country = (region as any[]).find(c => c.key === key)
    if (country) return country
  }
  return null
}

// 当前选中的国家（计算属性）
const selectedCountry = computed(() => {
  return findCountryByKey(selectedCountryKey.value)
})

// 区域标签
const regionLabels = {
  Europe: '欧洲',
  Asia: '亚洲',
  AfricaAndMiddleEast: '非洲 / 中东',
  Americas: '美洲',
  ZeroRateOrOther: '零税率 / 其他'
}

// 货币选项
const currencies = [
  { code: 'USD', symbol: '$', rate: 1.0 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'JPY', symbol: '¥', rate: 149.0 },
  { code: 'CNY', symbol: '¥', rate: 7.29 }
]

// 计算属性
const showResults = computed(() => {
  return selectedCountry.value && basePrice.value > 0
})

const taxRate = computed(() => {
  if (!selectedCountry.value) return 0
  const rateStr = selectedCountry.value.rate.toString()
  const match = rateStr.match(/(\d+(\.\d+)?)/)
  return match ? parseFloat(match[1]) / 100 : 0
})

// 方法
const calculatePrices = () => {
  if (!selectedCountry.value || basePrice.value <= 0) {
    resetResults()
    return
  }
  
  taxAmount.value = basePrice.value * taxRate.value
  finalPrice.value = basePrice.value + taxAmount.value
  platformFee.value = finalPrice.value * (platformFeeRate.value / 100)
  netPrice.value = finalPrice.value - platformFee.value
  
  const total = finalPrice.value
  if (total > 0) {
    pricePercentage.value = (basePrice.value / total) * 100
    taxPercentage.value = (taxAmount.value / total) * 100
    feePercentage.value = (platformFee.value / total) * 100
  } else {
    pricePercentage.value = 0
    taxPercentage.value = 0
    feePercentage.value = 0
  }
}

const resetResults = () => {
  taxAmount.value = 0
  finalPrice.value = 0
  platformFee.value = 0
  netPrice.value = 0
  pricePercentage.value = 0
  taxPercentage.value = 0
  feePercentage.value = 0
}

const resetInputs = () => {
  basePrice.value = 100
  platformFeeRate.value = 5.0
  selectedCurrency.value = 'USD'
  calculatePrices()
}

const setExample = (type: string) => {
  switch(type) {
    case 'germany':
      selectedCountryKey.value = 'europe_germany'
      break
    case 'japan':
      selectedCountryKey.value = 'asia_japan'
      break
    case 'china':
      selectedCountryKey.value = 'asia_china'
      break
    case 'hongkong':
      selectedCountryKey.value = 'zerorateorother_hong_kong'
      break
  }
  calculatePrices()
}

const onCountryChange = () => {
  calculatePrices()
}

const formatCurrency = (amount: number) => {
  const currency = currencies.find(c => c.code === selectedCurrency.value)
  if (!currency) return '$0.00'
  
  const convertedAmount = amount * currency.rate
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: selectedCurrency.value,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(convertedAmount)
}

// 初始化计算
calculatePrices()
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  color: #334155;
  line-height: 1.5;
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 上层：广告位和标题 */
.header-layer {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.ad-top {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: white;
  padding: 12px 20px;
}

.ad-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.ad-badge {
  background: #f59e0b;
  color: #1e293b;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.ad-cta {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.ad-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.title-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  text-align: center;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 1.1rem;
  color: #64748b;
  font-weight: 400;
}

/* 中层：核心功能区域 */
.middle-layer {
  flex: 1;
  padding: 30px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.calculator-container {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 30px;
  height: 100%;
}

@media (max-width: 1024px) {
  .calculator-container {
    grid-template-columns: 1fr;
  }
}

/* 左侧输入面板 */
.input-panel {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f1f5f9;
}

.panel-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 10px;
}

.reset-btn {
  background: #f1f5f9;
  color: #64748b;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background: #e2e8f0;
  color: #475569;
}

.input-groups {
  display: flex;
  flex-direction: column;
  gap: 25px;
  flex: 1;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-label {
  font-weight: 600;
  color: #334155;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.label-icon {
  font-size: 1.1rem;
}

.price-input-container {
  position: relative;
}

.currency-prefix {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 600;
  color: #475569;
  font-size: 1.1rem;
}

.price-input {
  width: 100%;
  padding: 16px 20px;
  padding-left: 50px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  background: #f8fafc;
}

.price-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-hint {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.85rem;
  color: #94a3b8;
}

.select-container {
  position: relative;
}

.country-select {
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  background: #f8fafc;
  appearance: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.country-select:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.selected-country-display {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #475569;
  pointer-events: none;
}

.tax-rate-display {
  background: #10b981;
  color: white;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
}

.slider-value-display {
  background: #3b82f6;
  color: white;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-left: auto;
}

.slider-container {
  padding: 10px 0;
}

.custom-slider {
  width: 100%;
  height: 8px;
  background: linear-gradient(90deg, #10b981 0%, #f59e0b 50%, #ef4444 100%);
  border-radius: 4px;
  outline: none;
  -webkit-appearance: none;
  margin-bottom: 8px;
}

.custom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  background: white;
  border: 3px solid #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.slider-marks {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #94a3b8;
}

.currency-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.currency-chip {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.currency-chip:hover {
  border-color: #cbd5e1;
  transform: translateY(-2px);
}

.currency-chip.active {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-color: #3b82f6;
  color: white;
}

.currency-symbol {
  font-size: 1.2rem;
  font-weight: 600;
}

.currency-code {
  font-size: 0.85rem;
  font-weight: 500;
}

.quick-actions {
  margin-top: auto;
  padding-top: 25px;
  border-top: 2px solid #f1f5f9;
}

.action-title {
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 12px;
  font-weight: 600;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.action-btn {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px;
  font-size: 0.9rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: #e2e8f0;
  border-color: #cbd5e1;
}

/* 右侧结果面板 */
.result-panel {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.last-updated {
  background: #10b981;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
}

.results-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.country-highlight {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 12px;
}

.country-flag {
  font-size: 2.5rem;
}

.country-info h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
}

.country-info p {
  color: #64748b;
  font-size: 0.95rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 1200px) {
  .results-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .results-grid {
    grid-template-columns: 1fr;
  }
}

.result-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 2px solid #e2e8f0;
  position: relative;
  transition: all 0.3s ease;
}

.result-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.result-card.highlighted {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border: none;
  color: white;
  grid-column: span 3;
}

@media (max-width: 1200px) {
  .result-card.highlighted {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .result-card.highlighted {
    grid-column: span 1;
  }
}

.result-icon {
  font-size: 1.8rem;
  margin-bottom: 12px;
}

.result-label {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 8px;
}

.result-card.highlighted .result-label {
  color: rgba(255, 255, 255, 0.9);
}

.result-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 4px;
}

.result-card.highlighted .result-value {
  color: white;
}

.result-subtext {
  font-size: 0.85rem;
  color: #94a3b8;
}

.result-card.highlighted .result-subtext {
  color: rgba(255, 255, 255, 0.8);
}

.highlight-badge {
  position: absolute;
  top: -10px;
  right: 20px;
  background: #f59e0b;
  color: #1e293b;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.price-breakdown {
  background: #f8fafc;
  border-radius: 12px;
  padding: 25px;
  border: 2px solid #e2e8f0;
}

.breakdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.breakdown-header h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
}

.breakdown-percentages {
  display: flex;
  gap: 20px;
  font-size: 0.9rem;
  color: #64748b;
}

.breakdown-bar {
  height: 24px;
  background: #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  display: flex;
}

.bar-segment {
  height: 100%;
  transition: width 0.5s ease;
}

.bar-segment.original {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
}

.bar-segment.tax {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.bar-segment.fee {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.profit-analysis {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding-top: 20px;
  border-top: 2px solid #e2e8f0;
}

.analysis-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.analysis-label {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}

.analysis-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
}

.empty-state {
  text-align: center;
  padding: 60px 40px;
  color: #94a3b8;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #64748b;
  margin-bottom: 12px;
}

.empty-state p {
  font-size: 1rem;
  margin-bottom: 30px;
}

.example-tips {
  background: #f8fafc;
  border-radius: 12px;
  padding: 25px;
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
}

.example-tips p {
  font-weight: 600;
  color: #475569;
  margin-bottom: 15px;
}

.example-tips ul {
  list-style-type: none;
}

.example-tips li {
  padding: 8px 0;
  color: #64748b;
  font-size: 0.95rem;
  position: relative;
  padding-left: 20px;
}

.example-tips li:before {
  content: "•";
  color: #3b82f6;
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* 下层：广告位和页脚 */
.footer-layer {
  background: #1e293b;
  color: #cbd5e1;
  margin-top: auto;
}

.ad-bottom {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 15px 20px;
  border-bottom: 1px solid #334155;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin-bottom: 40px;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-title {
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.footer-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #94a3b8;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: white;
  text-decoration: underline;
}

.disclaimer {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.disclaimer p {
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.5;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-icon {
  font-size: 1rem;
}

.contact-link {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: white;
  text-decoration: underline;
}

.feedback-form {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.feedback-input {
  flex: 1;
  padding: 12px 16px;
  background: #334155;
  border: 1px solid #475569;
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
}

.feedback-input::placeholder {
  color: #94a3b8;
}

.feedback-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.feedback-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.feedback-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.social-links {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.social-btn {
  background: #334155;
  color: #cbd5e1;
  border: 1px solid #475569;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-btn:hover {
  background: #475569;
  color: white;
}

.footer-bottom {
  padding-top: 30px;
  border-top: 1px solid #334155;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.footer-bottom p {
  color: #94a3b8;
  font-size: 0.9rem;
}

.footer-bottom-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.footer-bottom-link {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.3s ease;
}

.footer-bottom-link:hover {
  color: white;
  text-decoration: underline;
}

.separator {
  color: #475569;
}
</style>