<template>
  <div class="ss-calculator-app">
    <h1 class="main-title">Social Security Calculator</h1>
    <p class="description">
      The U.S. Social Security website provides calculators for various purposes. While they are all useful,
      there currently isn't a way to help determine the ideal (financially speaking) age at which a person
      between the ages of 62-70 should apply for their Social Security retirement benefits. This tool is
      designed specifically for this purpose. Please note that this calculator is intended for U.S. Social
      Security purposes only.
    </p>

    <!-- Tabs -->
    <div class="tabs">
      <button class="tab-button" :class="{ active: activeTab === 'ideal' }" @click="activeTab = 'ideal'">
        Determine the ideal application age
      </button>
      <button class="tab-button" :class="{ active: activeTab === 'compare' }" @click="activeTab = 'compare'">
        Compare two application ages
      </button>
    </div>

    <!-- ========== TAB 1: IDEAL APPLICATION AGE ========== -->
    <div v-if="activeTab === 'ideal'" class="tab-pane">
      <!-- 动态结果展示 - 完全基于用户输入计算 -->
      <div class="result-card">
        <h2>Result</h2>
        <div class="result-text" v-html="idealResultMessage"></div>
        
        <!-- 显示详细的决策依据 -->
        <div class="decision-details" v-if="idealBestAge">
          <h3>Why age {{ idealBestAge }} is optimal for you:</h3>
          <ul>
            <li>Your Full Retirement Age (FRA): <strong>{{ fra }}</strong></li>
            <li>Life expectancy: <strong>{{ idealInput.lifeExpectancy }} years</strong></li>
            <li>Investment return: <strong>{{ idealInput.investReturn }}%</strong></li>
            <li>COLA: <strong>{{ idealInput.cola }}%</strong></li>
            <li>Projected breakeven analysis suggests maximum lifetime value at age {{ idealBestAge }}</li>
          </ul>
        </div>

        <!-- 各年龄段相对价值表 (基于FRA动态计算) -->
        <div class="value-comparison">
          <p><strong>Value comparison of application ages</strong></p>
          <div class="axis-labels">
            <span>Y‑axis: Relative value</span>
            <span>X‑axis: Application age</span>
          </div>
          <table class="mini-table">
            <thead>
              <tr><th>Application age</th><th>Relative value</th><th>Monthly benefit %</th></tr>
            </thead>
            <tbody>
              <tr v-for="age in [62,63,64,65,66,67,68,69,70]" :key="age" 
                  :class="{ 'highlight-row': age === idealBestAge }">
                <td>{{ age }}</td>
                <td>{{ relativeValue(age) }}%</td>
                <td>{{ benefitPercent(age) }}%</td>
              </tr>
            </tbody>
          </table>
          <p class="table-note">* Relative value considers life expectancy, investment returns, and COLA. Monthly benefit % is based on SSA rules.</p>
        </div>
      </div>

      <!-- 用户输入表单 - 所有输入都会触发实时计算 -->
      <div class="calculator-form">
        <div class="form-row">
          <label>Your birth year:</label>
          <input type="number" v-model.number="idealInput.birthYear" @input="calculateIdeal" />
          <span class="field-hint">Determines your Full Retirement Age</span>
        </div>
        <div class="form-row">
          <label>Your life expectancy:</label>
          <input type="number" v-model.number="idealInput.lifeExpectancy" @input="calculateIdeal" /> 
          <span>years</span>
        </div>
        <div class="form-row">
          <label>Your investment return:</label>
          <input type="number" step="0.1" v-model.number="idealInput.investReturn" @input="calculateIdeal" /> 
          <span>% per year</span>
        </div>
        <div class="form-row">
          <label>Cost of living adjustment*:</label>
          <input type="number" step="0.1" v-model.number="idealInput.cola" @input="calculateIdeal" /> 
          <span>% per year</span>
        </div>
        <div class="form-row">
          <label>Your Primary Insurance Amount (PIA):</label>
          <input type="number" v-model.number="idealInput.pia" @input="calculateIdeal" /> 
          <span>$ per month (at FRA)</span>
        </div>
        <div class="form-actions">
          <button @click="calculateIdeal">Calculate</button>
          <button class="clear" @click="clearIdeal">Clear</button>
        </div>
      </div>
    </div>

    <!-- ========== TAB 2: COMPARE TWO APPLICATION AGES ========== -->
    <div v-if="activeTab === 'compare'" class="tab-pane">
      <!-- 动态结果展示 - 基于两个方案的对比 -->
      <div class="result-card">
        <h2>Result</h2>
        <div class="result-text" v-html="compareResultMessage"></div>

        <!-- 累积价值对比条形图 -->
        <div class="value-comparison">
          <p><strong>Cumulative benefits by age {{ compareInput.lifeExpectancy }}</strong></p>
          <div class="bar-chart-labels">
            <span>Option {{ compareInput.age1 }}: ${{ formatNumber(totalValue1) }}</span>
            <span>Option {{ compareInput.age2 }}: ${{ formatNumber(totalValue2) }}</span>
          </div>
          <div class="bar-chart">
            <div class="bar-container">
              <div class="bar" :style="{ width: barWidth1, background: '#2563eb' }">
                ${{ formatNumber(totalValue1) }}
              </div>
            </div>
            <div class="bar-container">
              <div class="bar" :style="{ width: barWidth2, background: '#16a34a' }">
                ${{ formatNumber(totalValue2) }}
              </div>
            </div>
          </div>
          
          <!-- 盈亏平衡分析 -->
          <div class="breakeven-analysis" v-if="compareInput.age2 > compareInput.age1">
            <p><strong>Breakeven analysis:</strong></p>
            <p>You will receive higher total benefits from Option {{ compareInput.age2 }} if you live to age 
               <strong>{{ breakevenAge }}</strong> or older.</p>
            <p>Current life expectancy: {{ compareInput.lifeExpectancy }}</p>
          </div>
        </div>

        <!-- 方案详情卡片 -->
        <div class="option-cards">
          <div class="option" :class="{ 'better-option': totalValue2 > totalValue1 && compareInput.lifeExpectancy >= breakevenAge }">
            <h3>Social security claim option 1</h3>
            <p>Retirement age: <strong>{{ compareInput.age1 }}</strong></p>
            <p>Monthly payment: <strong>${{ formatNumber(compareInput.benefit1) }}</strong></p>
            <p>Years of benefits: <strong>{{ benefitYears1 }}</strong></p>
            <p>Total cumulative: <strong>${{ formatNumber(totalValue1) }}</strong></p>
          </div>
          <div class="option" :class="{ 'better-option': totalValue2 > totalValue1 && compareInput.lifeExpectancy >= breakevenAge ? false : totalValue1 < totalValue2 }">
            <h3>Social security claim option 2 (work longer)</h3>
            <p>Retirement age: <strong>{{ compareInput.age2 }}</strong></p>
            <p>Monthly payment: <strong>${{ formatNumber(compareInput.benefit2) }}</strong></p>
            <p>Years of benefits: <strong>{{ benefitYears2 }}</strong></p>
            <p>Total cumulative: <strong>${{ formatNumber(totalValue2) }}</strong></p>
          </div>
        </div>

        <!-- 其他信息 -->
        <div class="other-info">
          <p><strong>Calculation assumptions</strong></p>
          <div class="info-row"><span>Investment return:</span> {{ compareInput.investReturn }}% per year</div>
          <div class="info-row"><span>COLA:</span> {{ compareInput.cola }}% per year</div>
          <div class="info-row"><span>Life expectancy:</span> {{ compareInput.lifeExpectancy }} years</div>
        </div>
      </div>

      <!-- 用户输入表单 -->
      <div class="calculator-form">
        <p class="ssa-note">
          The U.S. Social Security website
          <a href="https://www.ssa.gov/" target="_blank">https://www.ssa.gov/</a>
          provides estimated benefit payment amounts of different claim ages.
        </p>
        <div class="form-row">
          <label>Option 1 age:</label>
          <input type="number" v-model.number="compareInput.age1" @input="calculateCompare" />
        </div>
        <div class="form-row">
          <label>Option 1 monthly $:</label>
          <input type="number" v-model.number="compareInput.benefit1" @input="calculateCompare" />
        </div>
        <div class="form-row">
          <label>Option 2 age:</label>
          <input type="number" v-model.number="compareInput.age2" @input="calculateCompare" />
        </div>
        <div class="form-row">
          <label>Option 2 monthly $:</label>
          <input type="number" v-model.number="compareInput.benefit2" @input="calculateCompare" />
        </div>
        <div class="form-row">
          <label>Your life expectancy:</label>
          <input type="number" v-model.number="compareInput.lifeExpectancy" @input="calculateCompare" /> <span>years</span>
        </div>
        <div class="form-row">
          <label>Your investment return %:</label>
          <input type="number" step="0.1" v-model.number="compareInput.investReturn" @input="calculateCompare" />
        </div>
        <div class="form-row">
          <label>COLA %:</label>
          <input type="number" step="0.1" v-model.number="compareInput.cola" @input="calculateCompare" />
        </div>
        <div class="form-actions">
          <button @click="calculateCompare">Calculate</button>
          <button class="clear" @click="clearCompare">Clear</button>
        </div>
      </div>
    </div>

    <!-- Related tools -->
    <div class="related-tools">
      <span class="related-label">Related:</span>
      <a href="/retirement">Retirement Calculator</a> <span class="sep">|</span>
      <a href="/pension">Pension Calculator</a> <span class="sep">|</span>
      <a href="/401k">401K Calculator</a>
    </div>

    <!-- FAQ section (保持原样) -->
    <div class="faq-section">
      <h2>Social Security in the U.S. – FAQ</h2>
      <!-- ... FAQ内容保持不变 ... -->
      <details><summary>What is Social Security and why was it created?</summary><p>Before 1935, care for the elderly/disabled was not a federal responsibility. The Social Security Act (originally Economic Security Act) was signed by President Roosevelt, with first taxes collected in 1937. It provided monetary assistance to qualified Americans with inadequate or no income. Initially just retirement benefits, it expanded to survivors (1939) and disability (1956).</p></details>
      <details><summary>How big is Social Security today?</summary><p>About 169 million Americans pay SS taxes, and roughly 65 million (1 in 5) collect monthly benefits. One out of four families receive benefits. For over 60% of beneficiaries, SS represents more than half of their income; for one‑third it is the only income.</p></details>
      <details><summary>What is Cost‑of‑Living Adjustment (COLA)?</summary><p>COLA preserves purchasing power against inflation. It's based on the CPI‑W from Q3 of prior year to Q3 of current year. If no increase, no COLA. It applies to both SS and Supplemental Security Income (SSI).</p></details>
      <details><summary>How is Social Security taxed?</summary><p>Primarily through FICA taxes (12.4% on earnings, half paid by employee, half by employer; self‑employed pay full amount). In 2026, earnings above $184,500 are not taxed for SS. FICA also funds Medicare. About 90% of SS income comes from payroll taxes.</p></details>
      <details><summary>Are Social Security benefits themselves taxable?</summary><p>Yes, if your combined income (AGI + nontaxable interest + ½ SS benefits) exceeds certain thresholds. For 2026: single < $25,000 → no tax; $25,000–$34,000 → up to 50% taxable; > $34,000 → up to 85% taxable. Married filing jointly thresholds: $32,000 and $44,000.</p></details>
      <details><summary>What is Full Retirement Age (FRA)?</summary><p>FRA (or normal retirement age) is the age at which you receive unreduced benefits. For those born 1960 or later, FRA = 67. You can start as early as 62 (reduced benefits) or delay up to 70 (delayed credits increase benefits). After 70, no further increase.</p></details>
      <details><summary>How do work credits work?</summary><p>You earn up to 4 credits per year. In 2026, one credit = $1,890 in taxable earnings ($7,560 for four credits). Typically 40 credits (10 years of work) are needed for retirement benefits. Certain public employees may have different rules.</p></details>
      <details><summary>Can I receive SS if I live outside the U.S.?</summary><p>Yes, eligible beneficiaries can receive payments abroad (direct deposit to U.S. bank or to some foreign countries). Medicare generally doesn't cover foreign residents. Tax filing obligations remain.</p></details>
      <details><summary>What about disability benefits (SSDI, SSI)?</summary><p>SSDI is for disabled workers who have earned enough credits; it requires meeting SSA's strict disability definition. SSI is need‑based for people with limited income/assets, funded by general taxes, and does not require work credits. Some people qualify for both.</p></details>
      <details><summary>How do spousal or survivor benefits work?</summary><p>Spouses aged 62+ can receive up to 50% of the worker's benefit. Widows/widowers can start as early as 60. Divorced spouses (marriage ≥10 years, not remarried) may claim on ex‑spouse's record. Survivor cannot collect both own and spouse's benefit—they receive the larger.</p></details>
      <p class="faq-footnote">*This FAQ summarizes key points from the extensive Social Security description provided. Always consult <a href="https://www.ssa.gov/" target="_blank">ssa.gov</a> for official details.</p>
    </div>

    <!-- Calculator CTA -->
    <section class="section calculator-cta">
    <a href="/social-security-blog" class="calculator-btn">
    More social security blog → </a>
    </section>
  </div>
</template>

<script>
export default {
  name: 'SocialSecurityCalculator',
  data() {
    return {
      activeTab: 'ideal',
      // Tab1 输入模型 - 添加了PIA字段
      idealInput: {
        birthYear: 1970,
        lifeExpectancy: 83,
        investReturn: 5.0,
        cola: 3.0,
        pia: 2000, // Primary Insurance Amount at FRA
      },
      // Tab2 输入模型
      compareInput: {
        age1: 62,
        benefit1: 1600,
        age2: 70,
        benefit2: 2810,
        lifeExpectancy: 82,
        investReturn: 5.0,
        cola: 3.0,
      },
      // 计算结果
      idealBestAge: 68,
      idealMonthsAfterFRA: 12,
      idealPercent: 108,
      totalValue1: 60000,
      totalValue2: 100000,
      breakevenAge: 82,
    };
  },
  computed: {
    // Full Retirement Age based on birth year (SSA rules)
    fra() {
      const year = this.idealInput.birthYear;
      if (year >= 1960) return 67;
      if (year >= 1955) return 66 + Math.floor((year - 1954) * 2); // 简化的渐进规则
      if (year >= 1943) return 66;
      if (year >= 1938) return 65 + Math.floor((year - 1937) * 0.5);
      return 65;
    },
    
    idealResultMessage() {
      if (!this.idealBestAge) return 'Please enter your information and click Calculate';
      
      const monthsAfter = this.idealBestAge > this.fra ? 
        (this.idealBestAge - this.fra) * 12 : 
        (this.fra - this.idealBestAge) * -12;
      
      const action = this.idealBestAge > this.fra ? 'after' : 'before';
      
      return `Financially, the best age for you to apply for Social Security retirement benefit is
      <strong>${this.idealBestAge}</strong>. At ${this.idealBestAge}, you receive benefits
      <strong>${Math.abs(monthsAfter)} months</strong> ${action} you reach your normal retirement age of
      <strong>${this.fra}</strong>. Your benefit will be
      <strong>${this.benefitPercent(this.idealBestAge)}%</strong> of your primary insurance amount
      ($${this.formatNumber(this.idealInput.pia)}).`;
    },
    
    compareResultMessage() {
      if (!this.compareInput.lifeExpectancy) return 'Please enter all values';
      
      const betterOption = this.totalValue2 > this.totalValue1 ? 
        this.compareInput.age2 : this.compareInput.age1;
      const worseOption = this.totalValue2 > this.totalValue1 ? 
        this.compareInput.age1 : this.compareInput.age2;
      
      return `Based on your life expectancy of ${this.compareInput.lifeExpectancy} years,
      <strong>Option ${betterOption}</strong> provides $${this.formatNumber(Math.abs(this.totalValue2 - this.totalValue1))} 
      more in total benefits than Option ${worseOption}.`;
    },
    
    benefitYears1() {
      return Math.max(0, this.compareInput.lifeExpectancy - this.compareInput.age1).toFixed(1);
    },
    
    benefitYears2() {
      return Math.max(0, this.compareInput.lifeExpectancy - this.compareInput.age2).toFixed(1);
    },
    
    barWidth1() {
      const max = Math.max(this.totalValue1, this.totalValue2, 1);
      return (this.totalValue1 / max) * 100 + '%';
    },
    
    barWidth2() {
      const max = Math.max(this.totalValue1, this.totalValue2, 1);
      return (this.totalValue2 / max) * 100 + '%';
    }
  },
  methods: {
    
setGoogleMetaTags() {
      // 确保description存在且内容正确
      let desc = document.querySelector('meta[name="description"]')
      if (!desc) {
        desc = document.createElement('meta')
        desc.name = 'description'
        document.head.appendChild(desc)
      }
      desc.content = 'Find the best age to claim U.S. Social Security retirement benefits between 62–70. Compare payout scenarios and optimize your retirement income with our Social Security calculator.'
      
      // 确保robots标签存在（告诉Google索引此页）
      let robots = document.querySelector('meta[name="robots"]')
      if (!robots) {
        robots = document.createElement('meta')
        robots.name = 'robots'
        document.head.appendChild(robots)
      }
      robots.content = 'index, follow'
      
      // 添加Google专用的nositelinkssearchbox（可选）
      let google = document.querySelector('meta[name="google"]')
      if (!google) {
        google = document.createElement('meta')
        google.name = 'google'
        document.head.appendChild(google)
      }
      google.content = 'nositelinkssearchbox'
      
      // 添加canonical链接（防止重复内容）
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = window.location.href
      
      console.log('Google meta tags set')
    },
    // 计算基于SSA规则的福利百分比
    benefitPercent(applyAge) {
      if (applyAge >= this.fra) {
        // 延迟退休 credits: 每年增加8% (每月2/3%)
        const monthsLate = Math.min((applyAge - this.fra) * 12, 36); // 最多到70岁
        return Math.min(100 + monthsLate * (8/12), 124);
      } else {
        // 提前退休 reduction: 36个月内每月减少5/9%，之后每月减少5/12%
        const monthsEarly = (this.fra - applyAge) * 12;
        if (monthsEarly <= 36) {
          return 100 - (monthsEarly * (5/9));
        } else {
          return 100 - (36 * (5/9) + (monthsEarly - 36) * (5/12));
        }
      }
    },
    
    // 计算相对价值 (考虑寿命、投资回报和COLA)
    relativeValue(applyAge) {
      if (!this.idealInput.lifeExpectancy) return 0;
      
      const months = (this.idealInput.lifeExpectancy - applyAge) * 12;
      if (months <= 0) return 0;
      
      const monthlyBenefit = this.idealInput.pia * (this.benefitPercent(applyAge) / 100);
      
      // 简单现值计算 (不考虑COLA的复合效应，仅示意)
      let totalValue = 0;
      for (let m = 0; m < months; m++) {
        // 每月折现
        const discountFactor = Math.pow(1 + this.idealInput.investReturn / 100 / 12, -m);
        totalValue += monthlyBenefit * discountFactor;
      }
      
      // 找到所有年龄中的最大值作为基准
      let maxValue = 0;
      for (let age = 62; age <= 70; age++) {
        const ageMonths = (this.idealInput.lifeExpectancy - age) * 12;
        if (ageMonths <= 0) continue;
        const ageBenefit = this.idealInput.pia * (this.benefitPercent(age) / 100);
        let ageTotal = 0;
        for (let m = 0; m < ageMonths; m++) {
          ageTotal += ageBenefit * Math.pow(1 + this.idealInput.investReturn / 100 / 12, -m);
        }
        if (ageTotal > maxValue) maxValue = ageTotal;
      }
      
      if (maxValue === 0) return 0;
      return Math.round((totalValue / maxValue) * 100);
    },
    
    // 计算最优申领年龄
    calculateIdeal() {
      if (!this.idealInput.lifeExpectancy || !this.idealInput.pia) return;
      
      let bestAge = 62;
      let bestValue = -1;
      
      // 遍历所有可能的申领年龄 (62-70)
      for (let age = 62; age <= 70; age++) {
        const months = (this.idealInput.lifeExpectancy - age) * 12;
        if (months <= 0) continue;
        
        const monthlyBenefit = this.idealInput.pia * (this.benefitPercent(age) / 100);
        
        // 计算考虑COLA和投资回报的现值
        let totalPV = 0;
        for (let m = 0; m < months; m++) {
          // COLA每年调整一次 (简化: 每年初调整)
          const year = Math.floor(m / 12);
          const colaFactor = Math.pow(1 + this.idealInput.cola / 100, year);
          
          // 每月折现
          const discountFactor = Math.pow(1 + this.idealInput.investReturn / 100 / 12, -m);
          
          totalPV += monthlyBenefit * colaFactor * discountFactor;
        }
        
        if (totalPV > bestValue) {
          bestValue = totalPV;
          bestAge = age;
        }
      }
      
      this.idealBestAge = bestAge;
      this.idealMonthsAfterFRA = bestAge > this.fra ? 
        (bestAge - this.fra) * 12 : 
        (this.fra - bestAge) * -12;
      this.idealPercent = Math.round(this.benefitPercent(bestAge));
    },
    
    clearIdeal() {
      this.idealInput = {
        birthYear: 1970,
        lifeExpectancy: 83,
        investReturn: 5.0,
        cola: 3.0,
        pia: 2000,
      };
      this.calculateIdeal();
    },
    
    // 计算方案对比
    calculateCompare() {
      if (!this.compareInput.lifeExpectancy) return;
      
      // 计算Option 1的总价值
      const months1 = Math.max(0, (this.compareInput.lifeExpectancy - this.compareInput.age1) * 12);
      let total1 = 0;
      for (let m = 0; m < months1; m++) {
        const year = Math.floor(m / 12);
        const colaFactor = Math.pow(1 + this.compareInput.cola / 100, year);
        const discountFactor = Math.pow(1 + this.compareInput.investReturn / 100 / 12, -m);
        total1 += this.compareInput.benefit1 * colaFactor * discountFactor;
      }
      
      // 计算Option 2的总价值
      const months2 = Math.max(0, (this.compareInput.lifeExpectancy - this.compareInput.age2) * 12);
      let total2 = 0;
      for (let m = 0; m < months2; m++) {
        const year = Math.floor(m / 12);
        const colaFactor = Math.pow(1 + this.compareInput.cola / 100, year);
        const discountFactor = Math.pow(1 + this.compareInput.investReturn / 100 / 12, -m);
        total2 += this.compareInput.benefit2 * colaFactor * discountFactor;
      }
      
      this.totalValue1 = Math.round(total1);
      this.totalValue2 = Math.round(total2);
      
      // 计算盈亏平衡年龄
      if (this.compareInput.age2 > this.compareInput.age1 && this.compareInput.benefit2 > this.compareInput.benefit1) {
        const monthlyDiff = this.compareInput.benefit2 - this.compareInput.benefit1;
        const delayMonths = (this.compareInput.age2 - this.compareInput.age1) * 12;
        const lostDuringDelay = this.compareInput.benefit1 * delayMonths;
        
        // 考虑COLA和投资回报的盈亏平衡点 (简化)
        const monthsToBreakeven = lostDuringDelay / monthlyDiff;
        this.breakevenAge = this.compareInput.age2 + monthsToBreakeven / 12;
      } else {
        this.breakevenAge = this.compareInput.age2;
      }
    },
    
    clearCompare() {
      this.compareInput = {
        age1: 62,
        benefit1: 1600,
        age2: 70,
        benefit2: 2810,
        lifeExpectancy: 82,
        investReturn: 5.0,
        cola: 3.0,
      };
      this.calculateCompare();
    },
    
    formatNumber(val) {
      if (val === undefined || val === null) return '0';
      return Math.round(val).toLocaleString();
    }
  },
  mounted() {
    document.title = 'Social Security Calculator – Find Your Best Claiming Age (62–70)'
    // 2. 设置关键meta标签（Google最关注的）
    this.setGoogleMetaTags()
    // 初始化计算
    this.calculateIdeal();
    this.calculateCompare();
  },
  watch: {
    // 监听所有输入字段的变化，实时重新计算
    'idealInput.birthYear': {
      handler: 'calculateIdeal',
      deep: true
    },
    'idealInput.lifeExpectancy': 'calculateIdeal',
    'idealInput.investReturn': 'calculateIdeal',
    'idealInput.cola': 'calculateIdeal',
    'idealInput.pia': 'calculateIdeal',
    
    'compareInput.age1': 'calculateCompare',
    'compareInput.benefit1': 'calculateCompare',
    'compareInput.age2': 'calculateCompare',
    'compareInput.benefit2': 'calculateCompare',
    'compareInput.lifeExpectancy': 'calculateCompare',
    'compareInput.investReturn': 'calculateCompare',
    'compareInput.cola': 'calculateCompare',
  }
};
</script>

<style scoped>
/* 样式基本保持不变，添加一些新样式 */
.ss-calculator-app {
  max-width: 1100px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 32px;
  box-shadow: 0 20px 40px -10px rgba(0, 34, 68, 0.15);
  padding: 28px 32px;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  color: #11212e;
}
.main-title {
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #0b2b44;
  letter-spacing: -0.02em;
}
.description {
  font-size: 1.05rem;
  line-height: 1.5;
  background: #ecf3fa;
  padding: 20px 24px;
  border-radius: 32px;
  margin-bottom: 28px;
  color: #1c3a5c;
  border: 1px solid #c7daf0;
}
.tabs {
  display: flex;
  gap: 12px;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 12px;
  margin-bottom: 28px;
}
.tab-button {
  background: none;
  border: none;
  padding: 10px 20px;
  font-size: 1.1rem;
  font-weight: 500;
  color: #4b5f73;
  border-radius: 40px;
  cursor: pointer;
  transition: 0.2s;
}
.tab-button.active {
  background: #0b2b44;
  color: white;
}
.result-card {
  background: #f8fafd;
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 32px;
  border: 1px solid #dde7f0;
}
.result-card h2 {
  font-size: 1.6rem;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 16px;
  color: #0a2942;
}
.result-text {
  font-size: 1.1rem;
  line-height: 1.5;
  background: #e6f0fa;
  padding: 16px 20px;
  border-radius: 20px;
  margin-bottom: 24px;
}
.decision-details {
  background: white;
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 24px;
  border-left: 4px solid #2563eb;
}
.decision-details h3 {
  margin-top: 0;
  margin-bottom: 12px;
  color: #1e3a5f;
}
.decision-details ul {
  margin: 0;
  padding-left: 20px;
}
.decision-details li {
  margin-bottom: 6px;
}
.value-comparison {
  margin-top: 24px;
}
.axis-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #3f5468;
  margin-bottom: 8px;
}
.mini-table {
  width: 100%;
  max-width: 400px;
  border-collapse: collapse;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.02);
}
.mini-table th {
  background: #d4e2f0;
  font-weight: 500;
  padding: 10px;
}
.mini-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #eef2f6;
}
.mini-table .highlight-row {
  background: #fef9c3;
  font-weight: 600;
}
.table-note {
  font-size: 0.85rem;
  color: #4b6584;
  margin-top: 8px;
}
.field-hint {
  font-size: 0.85rem;
  color: #64748b;
  font-style: italic;
}
.bar-chart-labels {
  display: flex;
  justify-content: space-between;
  margin: 16px 0 8px;
  font-weight: 500;
}
.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}
.bar-container {
  background: #e9edf2;
  border-radius: 30px;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
}
.bar {
  height: 100%;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
  min-width: 80px;
  transition: width 0.3s ease;
}
.breakeven-analysis {
  background: #e8f0fe;
  border-radius: 12px;
  padding: 12px 16px;
  margin-top: 16px;
}
.option-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin: 28px 0;
}
.option {
  background: white;
  border: 1px solid #cbd5e1;
  border-radius: 24px;
  padding: 16px 22px;
  flex: 1 1 260px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.02);
  transition: all 0.2s;
}
.option.better-option {
  border: 2px solid #16a34a;
  background: #f0fdf4;
}
.option h3 {
  font-size: 1.1rem;
  margin: 0 0 12px 0;
  color: #1e3a5f;
}
.option p {
  margin: 6px 0;
}
.other-info {
  background: #e8f0fe;
  border-radius: 18px;
  padding: 18px;
  margin-top: 16px;
}
.info-row {
  display: flex;
  gap: 24px;
  margin: 8px 0;
}
.calculator-form {
  background: #f2f6fb;
  border-radius: 28px;
  padding: 28px;
  border: 1px solid #cdddee;
}
.ssa-note {
  margin-top: 0;
  margin-bottom: 22px;
  font-size: 0.95rem;
  background: #d9e6f5;
  padding: 12px 18px;
  border-radius: 30px;
}
.form-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.form-row label {
  width: 200px;
  font-weight: 500;
  color: #1a3349;
}
.form-row input {
  padding: 10px 14px;
  border: 1px solid #b6c9dd;
  border-radius: 30px;
  font-size: 1rem;
  width: 140px;
  background: white;
}
.form-row span {
  color: #475569;
}
.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}
button {
  background: #1f3a5f;
  border: none;
  color: white;
  padding: 12px 34px;
  border-radius: 40px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.15s;
  border: 1px solid #1f3a5f;
}
button.clear {
  background: white;
  color: #1f3a5f;
}
button:hover {
  background: #143049;
}
button.clear:hover {
  background: #e4ecf5;
}
.related-tools {
  margin: 36px 0 24px;
  padding: 18px 0;
  border-top: 2px solid #dde3ea;
  border-bottom: 2px solid #dde3ea;
  font-size: 1.1rem;
}
.related-label {
  font-weight: 600;
  margin-right: 18px;
  color: #0f2a40;
}
.related-tools a {
  color: #1f4a7a;
  text-decoration: none;
  margin: 0 6px;
}
.related-tools a:hover {
  text-decoration: underline;
}
.sep {
  color: #9aa9b9;
}
.faq-section {
  margin-top: 28px;
  background: #f3f7fc;
  border-radius: 30px;
  padding: 28px;
}
.faq-section h2 {
  font-size: 1.6rem;
  font-weight: 500;
  margin-top: 0;
  color: #0b2b44;
}
details {
  background: white;
  border-radius: 50px;
  padding: 14px 24px;
  margin-bottom: 12px;
  border: 1px solid #c9d9ec;
}
summary {
  font-weight: 600;
  color: #113355;
  cursor: pointer;
}
details p {
  margin: 16px 0 8px;
  line-height: 1.5;
  color: #253c54;
}
.faq-footnote {
  margin-top: 24px;
  font-style: italic;
  background: #dce8f5;
  padding: 14px 22px;
  border-radius: 40px;
}
/* Calculator CTA */
.calculator-cta {
  text-align: center;
  padding: 50px 20px;
  border-top: 1px solid #eee;
}

.calculator-btn {
  display: inline-block;
  margin-top: 20px;
  padding: 14px 28px;
  border-radius: 10px;
  background: #111;
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
}

.calculator-btn:hover {
  background: #333;
  transform: translateY(-1px);
}

</style>
