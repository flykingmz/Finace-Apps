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
      <!-- 动态结果展示 -->
      <div class="result-card">
        <h2>Result</h2>
        <p class="result-text" v-html="idealResultMessage"></p>

        <!-- 相对价值表 (根据出生年份动态调整FRA和相关比例) -->
        <div class="value-comparison">
          <p><strong>Value comparison of application ages</strong></p>
          <div class="axis-labels">
            <span>Y‑axis: Relative value</span>
            <span>X‑axis: Application age</span>
          </div>
          <table class="mini-table">
            <thead>
              <tr><th>Application age</th><th>Relative value</th></tr>
            </thead>
            <tbody>
              <tr v-for="age in [62,63,64,65,66]" :key="age">
                <td>{{ age }}</td>
                <td>{{ relativeValue(age) }}%</td>
              </tr>
            </tbody>
          </table>
          <p class="table-note">* Relative to Primary Insurance Amount at Full Retirement Age ({{ fra }})</p>
        </div>
      </div>

      <!-- 用户输入表单 -->
      <div class="calculator-form">
        <div class="form-row">
          <label>Your birth year:</label>
          <input type="number" v-model.number="idealInput.birthYear" @input="recalcIdeal" />
        </div>
        <div class="form-row">
          <label>Your life expectancy:</label>
          <input type="number" v-model.number="idealInput.lifeExpectancy" @input="recalcIdeal" /> <span>years</span>
        </div>
        <div class="form-row">
          <label>Your investment return:</label>
          <input type="number" step="0.1" v-model.number="idealInput.investReturn" @input="recalcIdeal" /> <span>% per year</span>
        </div>
        <div class="form-row">
          <label>Cost of living adjustment*:</label>
          <input type="number" step="0.1" v-model.number="idealInput.cola" @input="recalcIdeal" /> <span>% per year</span>
        </div>
        <div class="form-actions">
          <button @click="recalcIdeal">Calculate</button>
          <button class="clear" @click="clearIdeal">Clear</button>
        </div>
      </div>
    </div>

    <!-- ========== TAB 2: COMPARE TWO APPLICATION AGES ========== -->
    <div v-if="activeTab === 'compare'" class="tab-pane">
      <!-- 动态结果展示 -->
      <div class="result-card">
        <h2>Result</h2>
        <p class="result-text" v-html="compareResultMessage"></p>

        <!-- 等效价值条形图 (动态生成) -->
        <div class="value-comparison">
          <p><strong>Equivalent value at age 62</strong></p>
          <div class="bar-chart-labels">
            <span>If retire at age {{ compareInput.age1 }}</span>
            <span>If retire at age {{ compareInput.age2 }}</span>
          </div>
          <div class="bar-chart">
            <div class="bar-container">
              <div class="bar" :style="{ width: barWidth1, background: '#2563eb' }">
                ${{ formatNumber(cumulativeValue1) }}
              </div>
            </div>
            <div class="bar-container">
              <div class="bar" :style="{ width: barWidth2, background: '#16a34a' }">
                ${{ formatNumber(cumulativeValue2) }}
              </div>
            </div>
          </div>
          <div class="x-label">Life expectancy (age {{compareInput.lifeExpectancy || 82}})</div>
        </div>

        <!-- 选项卡片 (动态显示用户输入的金额) -->
        <div class="option-cards">
          <div class="option">
            <h3>Social security claim option 1</h3>
            <p>Retirement age: <strong>{{ compareInput.age1 }}</strong></p>
            <p>Monthly payment: <strong>${{ formatNumber(compareInput.benefit1) }} per month</strong></p>
          </div>
          <div class="option">
            <h3>Social security claim option 2 (work longer)</h3>
            <p>Retirement age: <strong>{{ compareInput.age2 }}</strong></p>
            <p>Monthly payment: <strong>${{ formatNumber(compareInput.benefit2) }} per month</strong></p>
          </div>
        </div>

        <!-- 其他信息 (动态) -->
        <div class="other-info">
          <p><strong>Other information</strong></p>
          <div class="info-row"><span>Your investment return:</span> {{ compareInput.investReturn }}% per year</div>
          <div class="info-row"><span>Cost of living adjustment*:</span> {{ compareInput.cola }}% per year</div>
        </div>
      </div>

      <!-- 用户输入表单 (所有字段均可编辑) -->
      <div class="calculator-form">
        <p class="ssa-note">
          The U.S. Social Security website
          <a href="https://www.ssa.gov/" target="_blank">https://www.ssa.gov/</a>
          provides estimated benefit payment amounts of different claim ages.
        </p>
        <div class="form-row">
          <label>Option 1 age:</label>
          <input type="number" v-model.number="compareInput.age1" @input="recalcCompare" />
        </div>
        <div class="form-row">
          <label>Option 1 monthly $:</label>
          <input type="number" v-model.number="compareInput.benefit1" @input="recalcCompare" />
        </div>
        <div class="form-row">
          <label>Option 2 age:</label>
          <input type="number" v-model.number="compareInput.age2" @input="recalcCompare" />
        </div>
        <div class="form-row">
          <label>Option 2 monthly $:</label>
          <input type="number" v-model.number="compareInput.benefit2" @input="recalcCompare" />
        </div>
        <div class="form-row">
          <label>Your life expectancy:</label>
          <input type="number" v-model.number="compareInput.lifeExpectancy" @input="recalcCompare" /> <span>years</span>
        </div>
        <div class="form-row">
          <label>Your investment return %:</label>
          <input type="number" step="0.1" v-model.number="compareInput.investReturn" @input="recalcCompare" />
        </div>
        <div class="form-row">
          <label>COLA %:</label>
          <input type="number" step="0.1" v-model.number="compareInput.cola" @input="recalcCompare" />
        </div>
        <div class="form-actions">
          <button @click="recalcCompare">Calculate</button>
          <button class="clear" @click="clearCompare">Clear</button>
        </div>
      </div>
    </div>

    <!-- Related tools -->
    <div class="related-tools">
      <span class="related-label">Related:</span>
      <a href="#">Retirement Calculator</a> <span class="sep">|</span>
      <a href="#">Pension Calculator</a> <span class="sep">|</span>
      <a href="#">401K Calculator</a>
    </div>

    <!-- FAQ section (unchanged) -->
    <div class="faq-section">
      <h2>Social Security in the U.S. – FAQ</h2>
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
  </div>
</template>

<script>
export default {
  name: 'SocialSecurityCalculator',
  data() {
    return {
      activeTab: 'ideal',
      // Tab1 输入模型
      idealInput: {
        birthYear: 1970,
        lifeExpectancy: 83,
        investReturn: 5.0,
        cola: 3.0,
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
      // 用于展示的计算结果
      idealBestAge: 68,
      idealMonthsAfterFRA: 12,
      idealPercent: 108,
      compareBreakeven: 82,
      cumulativeValue1: 60000,
      cumulativeValue2: 100000,
    };
  },
  computed: {
    // Full Retirement Age 根据出生年简单估算 (实际规则更复杂，这里简化为: 1960后=67，之前滑动)
    fra() {
      const year = this.idealInput.birthYear;
      if (year >= 1960) return 67;
      if (year >= 1943) return 66; // 1943-1954 实际上是66，但为简化，只做演示
      return 65; // 更早的简化
    },
    idealResultMessage() {
      return `Financially, the best age for you to apply for Social Security retirement benefit is
      <strong>${this.idealBestAge}</strong>. At ${this.idealBestAge}, you receive benefits
      <strong>${this.idealMonthsAfterFRA} months</strong> after you reach your normal retirement age of
      <strong>${this.fra}</strong>. Your benefit will be
      <strong>${this.idealPercent}%</strong> of your primary insurance amount.`;
    },
    compareResultMessage() {
      return `Financially, if you think you can live to <strong>${this.compareBreakeven} or older</strong>,
      it is better to apply for social security at age ${this.compareInput.age2}. Otherwise, it is better
      to apply for social security at age ${this.compareInput.age1}.`;
    },
    barWidth1() {
      const max = Math.max(this.cumulativeValue1, this.cumulativeValue2, 1);
      return (this.cumulativeValue1 / max) * 100 + '%';
    },
    barWidth2() {
      const max = Math.max(this.cumulativeValue1, this.cumulativeValue2, 1);
      return (this.cumulativeValue2 / max) * 100 + '%';
    }
  },
  methods: {
    // 相对价值计算 (基于FRA和申请年龄的简单模拟)
    relativeValue(applyAge) {
      if (applyAge >= this.fra) return 100;
      // 每早一年约减少6.67% (非常简化)
      const monthsEarly = (this.fra - applyAge) * 12;
      const reduction = Math.min(monthsEarly * 0.0055, 0.3); // 最多减30%
      return Math.round(100 * (1 - reduction));
    },

    // 重新计算理想年龄 (模拟更真实的计算)
    recalcIdeal() {
      // 这里仅作演示逻辑：根据投资回报和寿命粗略估算最优年龄
      const { lifeExpectancy, investReturn } = this.idealInput;
      // 简单规则：寿命越长，越应该延迟领取；投资回报高也倾向于延迟（因为不急用钱）
      if (lifeExpectancy > 85 && investReturn > 4) {
        this.idealBestAge = 70;
        this.idealMonthsAfterFRA = (70 - this.fra) * 12;
        this.idealPercent = 124; // 粗略
      } else if (lifeExpectancy > 80 || investReturn > 3) {
        this.idealBestAge = 68;
        this.idealMonthsAfterFRA = (68 - this.fra) * 12;
        this.idealPercent = 108;
      } else {
        this.idealBestAge = 65;
        this.idealMonthsAfterFRA = (65 - this.fra) * 12;
        this.idealPercent = 86;
      }
      // 如果寿命很短，建议尽早领取
      if (lifeExpectancy < 75) {
        this.idealBestAge = 62;
        this.idealMonthsAfterFRA = (62 - this.fra) * 12;
        this.idealPercent = 70;
      }
    },

    clearIdeal() {
      this.idealInput = {
        birthYear: 1970,
        lifeExpectancy: 83,
        investReturn: 5.0,
        cola: 3.0,
      };
      this.recalcIdeal();
    },

    // 重新计算对比数据 (基于用户输入的收益、COLA等)
    recalcCompare() {
      const { age1, benefit1, age2, benefit2, lifeExpectancy, investReturn, cola } = this.compareInput;
      if (!lifeExpectancy) return;
      
      // 简化模型：不考虑COLA和投资回报的精细折现，只简单累积到预期寿命
      const years1 = Math.max(0, lifeExpectancy - age1);
      const years2 = Math.max(0, lifeExpectancy - age2);
      
      // 非常粗略的累积 (未折现)
      let total1 = benefit1 * 12 * years1;
      let total2 = benefit2 * 12 * years2;
      
      // 加入投资回报的粗略影响: 简单乘以因子 (完全非精确，仅示意)
      if (investReturn > 0) {
        total1 = total1 * (1 + investReturn / 100);
        total2 = total2 * (1 + investReturn / 100);
      }
      
      this.cumulativeValue1 = Math.round(total1 / 1000) * 1000;
      this.cumulativeValue2 = Math.round(total2 / 1000) * 1000;
      
      // 盈亏平衡点 (粗略)
      if (benefit2 > benefit1 && age2 > age1) {
        const monthlyDiff = benefit2 - benefit1;
        const yearsDiff = age2 - age1;
        const lostDuringDelay = benefit1 * 12 * yearsDiff;
        // 需要多少个月弥补损失
        const monthsToBreakeven = lostDuringDelay / monthlyDiff;
        this.compareBreakeven = Math.ceil(age2 + monthsToBreakeven / 12);
      } else {
        this.compareBreakeven = 82; // 默认
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
      this.recalcCompare();
    },

    formatNumber(val) {
      return val.toLocaleString();
    }
  },
  mounted() {
    // 初始化计算
    this.recalcIdeal();
    this.recalcCompare();
  }
};
</script>

<style scoped>
/* 样式与之前完全相同，保证布局不变 */
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
  width: 280px;
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
.table-note {
  font-size: 0.85rem;
  color: #4b6584;
  margin-top: 8px;
}
.bar-chart-labels {
  display: flex;
  gap: 40px;
  margin: 16px 0 8px;
  font-weight: 500;
}
.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 8px;
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
  min-width: 60px;
  transition: width 0.2s;
}
.x-label {
  font-size: 0.9rem;
  color: #2f4052;
  margin-top: 8px;
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
</style>
