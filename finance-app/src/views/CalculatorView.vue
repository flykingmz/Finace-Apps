<template>
  <div class="calculator-view">
    <!-- 计算器页面头部 -->
    <div class="calculator-header" v-if="showHeader">
      <div class="header-content">
        <h1 class="calculator-title">{{ currentCalculator?.title || 'Calculator' }}</h1>
        <p class="calculator-description">{{ currentCalculator?.description || 'Financial calculator tool' }}</p>
      </div>
      
      <!-- 快速导航 -->
      <div class="quick-nav" v-if="!isMobile">
        <div class="nav-buttons">
          <button 
            v-for="calc in calculators" 
            :key="calc.id"
            class="nav-button"
            :class="{ active: currentCalculator?.id === calc.id }"
            @click="switchCalculator(calc.id)"
          >
            <i :class="calc.icon"></i>
            <span>{{ calc.shortTitle }}</span>
          </button>
        </div>
      </div>
      
      <!-- 移动设备上的下拉菜单 -->
      <div class="mobile-nav" v-else>
        <select 
          v-model="selectedCalcId" 
          class="mobile-select"
          @change="switchCalculator(selectedCalcId)"
        >
          <option 
            v-for="calc in calculators" 
            :key="calc.id"
            :value="calc.id"
          >
            {{ calc.title }}
          </option>
        </select>
      </div>
    </div>
    
    <!-- 主内容区域 -->
    <div class="calculator-container">
      <!-- 侧边工具栏（桌面端） -->
      <aside class="calculator-sidebar" v-if="!isMobile && showSidebar">
        <div class="sidebar-section">
          <h3 class="sidebar-title">
            <i class="fas fa-calculator"></i>
            Quick Tools
          </h3>
          <div class="tool-buttons">
            <button class="tool-button" @click="saveCalculation">
              <i class="fas fa-save"></i>
              Save
            </button>
            <button class="tool-button" @click="exportToPDF">
              <i class="fas fa-file-pdf"></i>
              Export PDF
            </button>
            <button class="tool-button" @click="resetCalculator">
              <i class="fas fa-redo"></i>
              Reset
            </button>
            <button class="tool-button" @click="printCalculator">
              <i class="fas fa-print"></i>
              Print
            </button>
          </div>
        </div>
        
        <div class="sidebar-section">
          <h3 class="sidebar-title">
            <i class="fas fa-history"></i>
            Recent Calculations
          </h3>
          <div class="history-list" v-if="history.length > 0">
            <div 
              v-for="(item, index) in recentHistory" 
              :key="index"
              class="history-item"
              @click="loadHistory(item)"
            >
              <div class="history-type">{{ item.type }}</div>
              <div class="history-date">{{ formatDate(item.timestamp) }}</div>
              <div class="history-result">${{ item.result.toLocaleString() }}</div>
            </div>
          </div>
          <div class="empty-history" v-else>
            <i class="fas fa-history"></i>
            <p>No recent calculations</p>
          </div>
        </div>
        
        <div class="sidebar-section">
          <h3 class="sidebar-title">
            <i class="fas fa-info-circle"></i>
            Help & Tips
          </h3>
          <div class="tip-box">
            <div class="tip-icon">
              <i class="fas fa-lightbulb"></i>
            </div>
            <div class="tip-content">
              <p class="tip-text">{{ currentCalculator?.tip || 'Use the form to input your data and see real-time results.' }}</p>
            </div>
          </div>
        </div>
      </aside>
      
      <!-- 计算器主体内容 -->
      <main class="calculator-main">
        <!-- 加载状态 -->
        <div v-if="loading" class="loading-overlay">
          <div class="loading-spinner"></div>
          <p>Loading calculator...</p>
        </div>
        
        <!-- 动态组件容器 -->
        <div class="component-wrapper" :class="{ 'full-width': !showSidebar || isMobile }">
          <!-- 动态加载计算器组件 -->
          <component
            :is="currentComponent"
            ref="calculatorComponent"
            v-if="!loading"
            @calculation-updated="handleCalculationUpdate"
            @calculation-reset="handleCalculationReset"
          />
          
          <!-- 如果没有组件可用，显示默认视图 -->
          <div v-if="!currentComponent && !loading" class="no-calculator">
            <div class="no-calc-icon">
              <i class="fas fa-calculator"></i>
            </div>
            <h2>Select a Calculator</h2>
            <p>Choose a calculator from the navigation menu to get started.</p>
            <div class="calculator-grid">
              <div 
                v-for="calc in calculators" 
                :key="calc.id"
                class="calc-card"
                @click="switchCalculator(calc.id)"
              >
                <div class="calc-card-icon" :style="{ backgroundColor: calc.color }">
                  <i :class="calc.icon"></i>
                </div>
                <h3>{{ calc.title }}</h3>
                <p>{{ calc.description }}</p>
                <button class="select-button">Select</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    
    <!-- 底部工具栏（移动端） -->
    <div class="mobile-toolbar" v-if="isMobile">
      <button class="mobile-tool" @click="toggleSidebar">
        <i class="fas fa-bars"></i>
        <span>Tools</span>
      </button>
      <button class="mobile-tool" @click="saveCalculation">
        <i class="fas fa-save"></i>
        <span>Save</span>
      </button>
      <button class="mobile-tool" @click="resetCalculator">
        <i class="fas fa-redo"></i>
        <span>Reset</span>
      </button>
      <button class="mobile-tool" @click="shareCalculator">
        <i class="fas fa-share"></i>
        <span>Share</span>
      </button>
    </div>
    
    <!-- 移动端侧边栏遮罩 -->
    <div 
      class="sidebar-overlay" 
      v-if="isMobile && showMobileSidebar"
      @click="toggleSidebar"
    ></div>
    
    <!-- 移动端侧边栏 -->
    <div 
      class="mobile-sidebar" 
      :class="{ 'open': showMobileSidebar }"
      v-if="isMobile"
    >
      <div class="mobile-sidebar-header">
        <h3>Tools & History</h3>
        <button class="close-sidebar" @click="toggleSidebar">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="mobile-sidebar-content">
        <div class="mobile-section">
          <h4><i class="fas fa-tools"></i> Tools</h4>
          <div class="mobile-tools">
            <button class="mobile-tool-btn" @click="saveCalculation">
              <i class="fas fa-save"></i> Save Calculation
            </button>
            <button class="mobile-tool-btn" @click="exportToPDF">
              <i class="fas fa-file-pdf"></i> Export PDF
            </button>
            <button class="mobile-tool-btn" @click="printCalculator">
              <i class="fas fa-print"></i> Print
            </button>
          </div>
        </div>
        
        <div class="mobile-section">
          <h4><i class="fas fa-history"></i> History</h4>
          <div class="mobile-history" v-if="history.length > 0">
            <div 
              v-for="(item, index) in recentHistory.slice(0, 3)" 
              :key="index"
              class="mobile-history-item"
              @click="loadHistory(item)"
            >
              <div class="mobile-history-type">{{ item.type }}</div>
              <div class="mobile-history-result">${{ item.result.toLocaleString() }}</div>
            </div>
          </div>
          <div class="no-history" v-else>
            No recent calculations
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'CalculatorView',
  
  setup() {
    const route = useRoute()
    const router = useRouter()
    const calculatorComponent = ref(null)
    
    // 响应式状态
    const loading = ref(false)
    const showSidebar = ref(true)
    const showMobileSidebar = ref(false)
    const selectedCalcId = ref('')
    const history = ref([])
    const isMobile = ref(false)
    
    // 计算器配置数据
    const calculators = ref([
      {
        id: 'paycheck',
        title: 'Paycheck Calculator',
        shortTitle: 'Paycheck',
        description: 'Calculate net pay after taxes and deductions',
        icon: 'fas fa-file-invoice-dollar',
        color: '#10b981',
        component: 'PaycheckCalculator',
        tip: 'Enter your gross pay and select your filing status for accurate calculations.'
      },
      {
        id: 'global-price',
        title: 'Global Price Calculator',
        shortTitle: 'Global Price',
        description: 'Calculate international pricing with taxes and fees',
        icon: 'fas fa-globe-americas',
        color: '#3b82f6',
        component: 'GlobalPriceCalculator',
        tip: 'Add product cost, shipping, and destination country for total price calculation.'
      },
      {
        id: 'income-tax',
        title: 'Income Tax Calculator',
        shortTitle: 'Income Tax',
        description: 'Calculate federal and state income taxes',
        icon: 'fas fa-percentage',
        color: '#f59e0b',
        component: 'IncomeTaxCalculator',
        tip: 'Select your filing status and enter income for detailed tax breakdown.'
      }
    ])
    
    // 计算属性
    const currentCalculator = computed(() => {
      const calcId = route.params.calcType || selectedCalcId.value
      return calculators.value.find(calc => calc.id === calcId) || calculators.value[0]
    })
    
    const currentComponent = computed(() => {
      return currentCalculator.value?.component
    })
    
    const recentHistory = computed(() => {
      return [...history.value].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5)
    })
    
    const showHeader = computed(() => {
      return !route.meta?.hideHeader
    })
    
    // 方法
    const switchCalculator = (calcId) => {
      loading.value = true
      
      // 更新路由
      router.push(`/calculator/${calcId}`)
      
      // 更新选中的计算器
      selectedCalcId.value = calcId
      
      // 模拟加载延迟
      setTimeout(() => {
        loading.value = false
        if (isMobile.value) {
          showMobileSidebar.value = false
        }
      }, 300)
    }
    
    const saveCalculation = () => {
      if (calculatorComponent.value?.getCalculationData) {
        const data = calculatorComponent.value.getCalculationData()
        const historyItem = {
          id: Date.now(),
          type: currentCalculator.value.title,
          timestamp: Date.now(),
          result: data.total || 0,
          data: data
        }
        
        history.value.push(historyItem)
        
        // 保存到localStorage
        saveHistoryToStorage()
        
        alert('Calculation saved to history!')
      } else {
        alert('Save functionality not available for this calculator.')
      }
    }
    
    const exportToPDF = () => {
      alert('PDF export functionality would be implemented here.')
      // 实际实现可能使用jsPDF或html2pdf.js
    }
    
    const resetCalculator = () => {
      if (calculatorComponent.value?.reset) {
        calculatorComponent.value.reset()
      } else {
        alert('Reset functionality not available for this calculator.')
      }
    }
    
    const printCalculator = () => {
      window.print()
    }
    
    const shareCalculator = () => {
      if (navigator.share) {
        navigator.share({
          title: currentCalculator.value.title,
          text: `Check out this ${currentCalculator.value.title}`,
          url: window.location.href
        })
      } else {
        // 后备方案：复制链接到剪贴板
        navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    }
    
    const toggleSidebar = () => {
      if (isMobile.value) {
        showMobileSidebar.value = !showMobileSidebar.value
      } else {
        showSidebar.value = !showSidebar.value
      }
    }
    
    const loadHistory = (item) => {
      if (calculatorComponent.value?.loadFromHistory) {
        calculatorComponent.value.loadFromHistory(item.data)
        alert(`Loaded calculation from ${formatDate(item.timestamp)}`)
      } else {
        alert('History loading not available for this calculator.')
      }
      
      if (isMobile.value) {
        showMobileSidebar.value = false
      }
    }
    
    const handleCalculationUpdate = (data) => {
      // 当计算器更新时触发，可用于自动保存等
      console.log('Calculation updated:', data)
    }
    
    const handleCalculationReset = () => {
      console.log('Calculator was reset')
    }
    
    const formatDate = (timestamp) => {
      const date = new Date(timestamp)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    const saveHistoryToStorage = () => {
      try {
        localStorage.setItem('calculatorHistory', JSON.stringify(history.value))
      } catch (e) {
        console.error('Failed to save history:', e)
      }
    }
    
    const loadHistoryFromStorage = () => {
      try {
        const saved = localStorage.getItem('calculatorHistory')
        if (saved) {
          history.value = JSON.parse(saved)
        }
      } catch (e) {
        console.error('Failed to load history:', e)
      }
    }
    
    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 768
      if (!isMobile.value) {
        showMobileSidebar.value = false
      }
    }
    
    // 生命周期
    onMounted(() => {
      // 初始化
      checkMobile()
      loadHistoryFromStorage()
      
      // 设置默认计算器
      const calcId = route.params.calcType || 'paycheck'
      selectedCalcId.value = calcId
      
      // 监听窗口大小变化
      window.addEventListener('resize', checkMobile)
      
      // 监听路由变化
      const unwatch = watch(() => route.params.calcType, (newCalcId) => {
        if (newCalcId) {
          selectedCalcId.value = newCalcId
        }
      })
      
      // 保存取消监听的函数
      onUnmounted(() => {
        window.removeEventListener('resize', checkMobile)
        unwatch()
      })
    })
    
    return {
      // 状态
      loading,
      showSidebar,
      showMobileSidebar,
      selectedCalcId,
      history,
      isMobile,
      
      // 数据
      calculators,
      
      // 计算属性
      currentCalculator,
      currentComponent,
      recentHistory,
      showHeader,
      
      // 引用
      calculatorComponent,
      
      // 方法
      switchCalculator,
      saveCalculation,
      exportToPDF,
      resetCalculator,
      printCalculator,
      shareCalculator,
      toggleSidebar,
      loadHistory,
      handleCalculationUpdate,
      handleCalculationReset,
      formatDate
    }
  }
}
</script>

<style scoped>
.calculator-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f9fafc;
}

/* 头部样式 */
.calculator-header {
  background: white;
  padding: 20px 30px;
  border-bottom: 1px solid #eef2f7;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.header-content {
  margin-bottom: 20px;
}

.calculator-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1d29;
  margin: 0 0 8px 0;
}

.calculator-description {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

/* 快速导航 */
.quick-nav {
  margin-top: 15px;
}

.nav-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #f3f4f6;
  border: 2px solid transparent;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-button:hover {
  background: #e5e7eb;
  transform: translateY(-2px);
}

.nav-button.active {
  background: white;
  border-color: #3b82f6;
  color: #3b82f6;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
}

.nav-button i {
  font-size: 16px;
}

/* 移动端导航 */
.mobile-nav {
  margin-top: 15px;
}

.mobile-select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 16px;
  background: white;
  color: #1a1d29;
  cursor: pointer;
}

.mobile-select:focus {
  outline: none;
  border-color: #3b82f6;
}

/* 主容器布局 */
.calculator-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* 侧边栏样式 */
.calculator-sidebar {
  width: 280px;
  min-width: 280px;
  background: white;
  border-right: 1px solid #eef2f7;
  padding: 20px;
  overflow-y: auto;
  transition: width 0.3s ease;
}

.sidebar-section {
  margin-bottom: 30px;
}

.sidebar-title {
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-title i {
  font-size: 12px;
}

.tool-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.tool-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.tool-button:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
  transform: translateX(2px);
}

.tool-button i {
  width: 16px;
  text-align: center;
  color: #6b7280;
}

/* 历史记录 */
.history-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.history-item {
  padding: 12px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.history-item:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.history-type {
  font-size: 14px;
  font-weight: 600;
  color: #1a1d29;
  margin-bottom: 4px;
}

.history-date {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
}

.history-result {
  font-size: 14px;
  font-weight: 700;
  color: #059669;
}

.empty-history {
  text-align: center;
  padding: 20px;
  color: #9ca3af;
}

.empty-history i {
  font-size: 24px;
  margin-bottom: 10px;
  opacity: 0.5;
}

.empty-history p {
  font-size: 14px;
  margin: 0;
}

/* 提示框 */
.tip-box {
  display: flex;
  gap: 12px;
  padding: 15px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
}

.tip-icon {
  width: 24px;
  height: 24px;
  background: #3b82f6;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.tip-content {
  flex: 1;
}

.tip-text {
  font-size: 14px;
  color: #0369a1;
  margin: 0;
  line-height: 1.5;
}

/* 主内容区域 */
.calculator-main {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.component-wrapper {
  height: 100%;
  overflow-y: auto;
  padding: 20px;
}

.component-wrapper.full-width {
  padding: 20px;
}

/* 无计算器时的视图 */
.no-calculator {
  text-align: center;
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
}

.no-calc-icon {
  font-size: 64px;
  color: #d1d5db;
  margin-bottom: 20px;
}

.no-calculator h2 {
  font-size: 28px;
  color: #1a1d29;
  margin: 0 0 10px 0;
}

.no-calculator p {
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 30px 0;
}

.calculator-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.calc-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.calc-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.calc-card-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  color: white;
  font-size: 24px;
}

.calc-card h3 {
  font-size: 18px;
  color: #1a1d29;
  margin: 0 0 10px 0;
}

.calc-card p {
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 15px 0;
  line-height: 1.5;
}

.select-button {
  padding: 8px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.select-button:hover {
  background: #2563eb;
}

/* 移动端工具栏 */
.mobile-toolbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-around;
  padding: 10px;
  z-index: 100;
}

.mobile-tool {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px;
  background: none;
  border: none;
  font-size: 12px;
  color: #4b5563;
  cursor: pointer;
  flex: 1;
}

.mobile-tool i {
  font-size: 18px;
  margin-bottom: 2px;
}

/* 移动端侧边栏 */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.mobile-sidebar {
  position: fixed;
  top: 0;
  right: -300px;
  width: 300px;
  height: 100%;
  background: white;
  z-index: 1000;
  transition: right 0.3s ease;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
}

.mobile-sidebar.open {
  right: 0;
}

.mobile-sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-sidebar-header h3 {
  margin: 0;
  font-size: 18px;
  color: #1a1d29;
}

.close-sidebar {
  background: none;
  border: none;
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
  padding: 5px;
}

.mobile-sidebar-content {
  padding: 20px;
  overflow-y: auto;
  height: calc(100% - 70px);
}

.mobile-section {
  margin-bottom: 30px;
}

.mobile-section h4 {
  font-size: 16px;
  color: #4b5563;
  margin: 0 0 15px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mobile-tools {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mobile-tool-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  color: #4b5563;
  cursor: pointer;
  text-align: left;
}

.mobile-history {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mobile-history-item {
  padding: 12px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
}

.mobile-history-type {
  font-size: 14px;
  font-weight: 600;
  color: #1a1d29;
  margin-bottom: 4px;
}

.mobile-history-result {
  font-size: 14px;
  color: #059669;
  font-weight: 600;
}

.no-history {
  text-align: center;
  padding: 20px;
  color: #9ca3af;
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .calculator-header {
    padding: 15px 20px;
  }
  
  .calculator-title {
    font-size: 24px;
  }
  
  .calculator-description {
    font-size: 14px;
  }
  
  .calculator-sidebar {
    display: none;
  }
  
  .component-wrapper {
    padding: 15px;
    padding-bottom: 70px; /* 为移动工具栏留出空间 */
  }
  
  .calculator-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .calculator-header {
    padding: 12px 15px;
  }
  
  .calculator-title {
    font-size: 22px;
  }
  
  .mobile-sidebar {
    width: 280px;
  }
}
</style>