<template>
  <div class="salary-calculator">
    <!-- 主卡片：计算器在上方，结果表格在下方 (垂直布局) -->
    <div class="calculator-vertical">
      <!-- 上方：计算器表单 (附件1样式) -->
      <div class="input-panel">
       <h1>Salary Calculator</h1>
        <p>The Salary Calculator helps you convert income amounts between different pay frequencies, including hourly, weekly, biweekly, semi-monthly, monthly, and annual salaries. It provides both unadjusted results and adjusted figures that consider vacation days and paid holidays throughout the year. This makes it easier to understand your true earnings, compare job offers, and estimate income across different payment schedules.</p>
        <form @submit.prevent="noop">
          <!-- Salary amount with per selector -->
          <div class="form-row amount-row">
            <label>Salary amount</label>
            <div class="amount-input-group">
              <span class="currency-symbol">$</span>
              <input type="number" v-model.number="inputs.amount" step="any" min="0" />
              <select v-model="inputs.period" class="period-select">
                <option value="hour">per Hour</option>
                <option value="day">per Day</option>
                <option value="week">per Week</option>
                <option value="biweek">per Bi-Week</option>
                <option value="month">per Month</option>
                <option value="year">per Year</option>
              </select>
            </div>
          </div>

          <!-- Hours per week -->
          <div class="form-row">
            <label>Hours per week</label>
            <input type="number" v-model.number="inputs.hoursPerWeek" min="0" step="0.5" />
          </div>

          <div class="form-row">
            <label>Days per week</label>
            <input type="number" v-model.number="inputs.daysPerWeek" min="0" max="7" step="0.5" />
          </div>

          <div class="form-row">
            <label>Holidays per year</label>
            <input type="number" v-model.number="inputs.holidays" min="0" step="1" />
          </div>

          <div class="form-row">
            <label>Vacation days per year</label>
            <input type="number" v-model.number="inputs.vacation" min="0" step="1" />
          </div>

          <!-- Action buttons (Calculate is automatic, Clear resets) -->
          <div class="action-buttons">
            <button type="button" class="btn-calculate" disabled>Calculate</button>
            <button type="button" class="btn-clear" @click="clearInputs">Clear</button>
          </div>
          <p class="note"><!-- placeholder for any note, optional --></p>
        </form>
      </div>

      <!-- 下方：计算结果表格 (附件2样式) -->
      <div class="result-panel">
        <h3>Result</h3>
        <table class="salary-table">
          <thead>
            <tr>
              <th></th>
              <th>Unadjusted</th>
              <th>Holidays & vacation days adjusted</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in resultRows" :key="row.label">
              <td>{{ row.label }}</td>
              <td>{{ formatMoney(row.unadjusted) }}</td>
              <td>{{ formatMoney(row.adjusted) }}</td>
            </tr>
          </tbody>
        </table>
        <div class="save-row">save</div>
      </div>
    </div>

    <!-- Related tools links -->
    <div class="related-section">
      <h4>Related</h4>
      <div class="related-links">
        <a href="#" target="_blank">Take Home Pay Calculator</a>
        <span>|</span>
        <a href="#" target="_blank">paycheck Calculator</a>
      </div>
    </div>

    <!-- FAQ section (directly expanded, no click toggle) -->
    <div class="faq-section">
      <h3>Frequently Asked Questions</h3>
      <div class="faq-item">
        <p class="faq-q">What is the difference between salary and wage?</p>
        <p class="faq-a">Salary is typically an annual fixed amount, while wage is based on hours worked. Salary earners are often exempt from overtime; wage earners are usually non-exempt and may receive overtime pay (e.g., 1.5× for over 40 hours/week). Most salaries/wages are paid periodically: monthly, semi-monthly, bi-weekly, weekly, etc.</p>
      </div>
      <div class="faq-item">
        <p class="faq-q">How are unadjusted and adjusted salaries calculated?</p>
        <p class="faq-a">Unadjusted annual salary = (hourly rate) × (hours/day) × (working days/year). Working days/year are typically 260 (52 weeks × 5 days). Adjusted subtracts non-working days: holidays + vacation days. Example: $30/hour × 8h/day × (260 − 25) = $56,400. All other periods (monthly, bi-weekly, etc.) derive from these annual figures.</p>
      </div>
      <div class="faq-item">
        <p class="faq-q">What are common pay frequencies?</p>
        <p class="faq-a">Daily (end of day), Weekly (52x/year), Bi-Weekly (26x/year), Semi-Monthly (24x/year, 15th & last day), Monthly (12x/year). Frequency affects paycheck consistency and employer costs.</p>
      </div>
      <div class="faq-item">
        <p class="faq-q">Do employers have to give paid holidays or vacation?</p>
        <p class="faq-a">In the U.S., FLSA does not mandate paid vacation or holidays. Many employers offer 6–11 holidays and PTO (paid time off) which may combine sick/vacation days. European countries often mandate 20+ vacation days.</p>
      </div>
      <div class="faq-item">
        <p class="faq-q">What other benefits might affect total compensation?</p>
        <p class="faq-a">Besides salary, benefits include health insurance, employer retirement contributions, payroll tax coverage (Social Security/Medicare half), bonuses, paid leave, company discounts. Self-employed contractors usually lack these and often charge higher rates.</p>
      </div>
      <div class="faq-item">
        <p class="faq-q">What factors influence salary in the U.S.?</p>
        <p class="faq-a">Age (peak 35–65), education (bachelor's avg $90k+), experience, industry, location, gender/race pay gaps, and job hazards. Minimum wage: federal $7.25, but states may set higher (e.g., DC $17.95). Exempt employees must earn at least $684/week.</p>
      </div>
      <div class="faq-item">
        <p class="faq-q">How can someone increase their salary?</p>
        <p class="faq-a">Further education/certifications, gaining experience, networking, positive performance reviews (ask for raise), negotiating, or changing jobs (often +10% or more).</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalaryCalculator',
  data() {
    return {
      // Input fields based on screenshot: amount, per, hours/week, days/week, holidays, vacation
      inputs: {
        amount: 50,
        period: 'hour',         // 'hour', 'day', 'week', 'biweek', 'month', 'year'
        hoursPerWeek: 40,
        daysPerWeek: 5,
        holidays: 10,
        vacation: 15,
      }
    };
  },
  computed: {
    // Derived working hours per day from hours/week and days/week
    hoursPerDay() {
      if (this.inputs.daysPerWeek === 0) return 0;
      return this.inputs.hoursPerWeek / this.inputs.daysPerWeek;
    },
    // Annual unadjusted working days (52 weeks * days/week)
    workingDaysPerYearUnadjusted() {
      return 52 * this.inputs.daysPerWeek;
    },
    // Annual adjusted working days (subtract holidays+vacation)
    workingDaysPerYearAdjusted() {
      return Math.max(0, this.workingDaysPerYearUnadjusted - this.inputs.holidays - this.inputs.vacation);
    },
    // Base hourly rate derived from input amount and period
    baseHourlyRate() {
      const { amount, period, hoursPerWeek, daysPerWeek } = this.inputs;
      if (amount === null || amount === undefined || amount < 0) return 0;
      const hPerDay = this.hoursPerDay;
      if (period === 'hour') return amount;
      if (period === 'day') return hPerDay > 0 ? amount / hPerDay : 0;
      if (period === 'week') return hoursPerWeek > 0 ? amount / hoursPerWeek : 0;
      if (period === 'biweek') return hoursPerWeek > 0 ? amount / (hoursPerWeek * 2) : 0;
      if (period === 'month') {
        // average weeks per month ≈ 52/12 = 4.333...; monthly hours = (52/12)*hoursPerWeek
        const monthlyHours = (52 / 12) * hoursPerWeek;
        return monthlyHours > 0 ? amount / monthlyHours : 0;
      }
      if (period === 'year') {
        const annualHours = 52 * hoursPerWeek;
        return annualHours > 0 ? amount / annualHours : 0;
      }
      return 0;
    },
    // Unadjusted annual salary (using unadjusted working days)
    annualUnadjusted() {
      return this.baseHourlyRate * this.hoursPerDay * this.workingDaysPerYearUnadjusted;
    },
    // Adjusted annual salary
    annualAdjusted() {
      return this.baseHourlyRate * this.hoursPerDay * this.workingDaysPerYearAdjusted;
    },
    // Table rows data (matching screenshot order)
    resultRows() {
      const h = this.baseHourlyRate;
      const hPerDay = this.hoursPerDay;
      const daysPerWeek = this.inputs.daysPerWeek;
      const daysPerYearUnadj = this.workingDaysPerYearUnadjusted;
      const daysPerYearAdj = this.workingDaysPerYearAdjusted;

      // unadjusted values
      const hourlyUnadj = h;
      const dailyUnadj = h * hPerDay;
      const weeklyUnadj = dailyUnadj * daysPerWeek;
      const biweeklyUnadj = weeklyUnadj * 2;
      // semi-monthly: based on annual/24
      const semiMonthlyUnadj = this.annualUnadjusted / 24;
      const monthlyUnadj = this.annualUnadjusted / 12;
      const quarterlyUnadj = this.annualUnadjusted / 4;
      const annualUnadj = this.annualUnadjusted;

      // adjusted (using adjusted annual then derive)
      const annualAdj = this.annualAdjusted;
      const hourlyAdj = daysPerYearAdj > 0 ? annualAdj / (hPerDay * daysPerYearAdj) : 0;
      const dailyAdj = hPerDay > 0 ? hourlyAdj * hPerDay : 0;
      const weeklyAdj = dailyAdj * daysPerWeek;
      const biweeklyAdj = weeklyAdj * 2;
      const semiMonthlyAdj = annualAdj / 24;
      const monthlyAdj = annualAdj / 12;
      const quarterlyAdj = annualAdj / 4;

      return [
        { label: 'Hourly', unadjusted: hourlyUnadj, adjusted: hourlyAdj },
        { label: 'Daily', unadjusted: dailyUnadj, adjusted: dailyAdj },
        { label: 'Weekly', unadjusted: weeklyUnadj, adjusted: weeklyAdj },
        { label: 'Bi-weekly', unadjusted: biweeklyUnadj, adjusted: biweeklyAdj },
        { label: 'Semi-monthly', unadjusted: semiMonthlyUnadj, adjusted: semiMonthlyAdj },
        { label: 'Monthly', unadjusted: monthlyUnadj, adjusted: monthlyAdj },
        { label: 'Quarterly', unadjusted: quarterlyUnadj, adjusted: quarterlyAdj },
        { label: 'Annual', unadjusted: annualUnadj, adjusted: annualAdj },
      ];
    }
  },
  mounted() {
    // 设置页面标题
    if (typeof document !== 'undefined') {
      document.title = 'Salary Calculator – Convert Annual, Monthly, Weekly & Hourly Pay';
      
      // 设置关键meta标签（Google最关注的）
      this.setGoogleMetaTags();
    }
  },
  methods: {
    noop() {},
    clearInputs() {
      this.inputs = {
        amount: 50,
        period: 'hour',
        hoursPerWeek: 40,
        daysPerWeek: 5,
        holidays: 10,
        vacation: 15,
      };
    },
    formatMoney(value) {
      if (isNaN(value) || value === null || value === undefined) return '$0.00';
      // round to two decimals, but show as needed
      const rounded = Math.round(value * 100) / 100;
      return '$' + rounded.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
    setGoogleMetaTags() {
      // 确保在浏览器环境中
      if (typeof document === 'undefined') return;
      
      // 安全地获取或创建meta标签
      const metaTags = {
        description: 'Free salary calculator to convert between hourly, daily, weekly, monthly, and annual pay. Adjust for holidays and vacation days. Compare unadjusted and adjusted salaries instantly.',
        keywords: 'salary calculator, paycheck calculator, hourly to annual, wage converter, take home pay, income calculator, pay frequency',
        robots: 'index, follow',
        author: 'Salary Calculator Tool'
      };
      
      // 设置或创建每个meta标签
      Object.entries(metaTags).forEach(([name, content]) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = name;
          document.head.appendChild(meta);
        }
        meta.content = content;
      });
      
      // 设置viewport（移动端优化）
      let viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.head.appendChild(viewport);
      }
      viewport.content = 'width=device-width, initial-scale=1.0';
    }
  }
};
</script>

<style scoped>
.salary-calculator {
  max-width: 1000px;
  margin: 0 auto;
  background: #f8fafc;
  padding: 2rem;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
.calculator-vertical {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: white;
  border-radius: 2rem;
  padding: 2rem;
  box-shadow: 0 20px 35px -8px rgba(0,0,0,0.1);
}
.input-panel h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 2rem;
  color: #0a1e2f;
}
.form-row {
  margin-bottom: 1.5rem;
}
.form-row label {
  display: block;
  font-weight: 500;
  color: #334155;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}
.amount-row .amount-input-group {
  display: flex;
  align-items: center;
  border: 1px solid #cbd5e1;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
}
.currency-symbol {
  padding: 0 0.75rem;
  background: #f1f5f9;
  font-weight: 500;
  color: #475569;
  border-right: 1px solid #cbd5e1;
  line-height: 2.8rem;
}
.amount-input-group input {
  flex: 2;
  border: none;
  padding: 0.75rem 0.5rem;
  font-size: 1rem;
  outline: none;
  min-width: 100px;
}
.period-select {
  flex: 1;
  border: none;
  border-left: 1px solid #cbd5e1;
  background: #f8fafc;
  padding: 0.75rem 0.5rem;
  font-weight: 500;
  color: #1e293b;
  cursor: pointer;
  outline: none;
}
.form-row input[type="number"] {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 1rem;
  font-size: 1rem;
  background: white;
}
.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}
.btn-calculate {
  background: #1e3a5f;
  color: white;
  border: none;
  padding: 0.9rem 2rem;
  border-radius: 2.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: not-allowed;
  opacity: 0.9;
  flex: 1;
}
.btn-clear {
  background: white;
  color: #1e293b;
  border: 1px solid #94a3b8;
  padding: 0.9rem 2rem;
  border-radius: 2.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  flex: 1;
}
.btn-clear:hover {
  background: #f1f5f9;
}
.note { min-height: 1rem; }

/* result panel */
.result-panel h3 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #0a1e2f;
}
.salary-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.02);
}
.salary-table th {
  text-align: left;
  padding: 1rem 1rem;
  background: #f1f5f9;
  font-weight: 600;
  color: #1e293b;
  border-bottom: 2px solid #cbd5e1;
}
.salary-table td {
  padding: 0.9rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}
.salary-table tr:last-child td {
  border-bottom: none;
}
.salary-table td:first-child {
  font-weight: 500;
  color: #0f172a;
}
.salary-table td:nth-child(2),
.salary-table td:nth-child(3) {
  font-family: 'JetBrains Mono', monospace;
  color: #0b3b5c;
}
.save-row {
  text-align: right;
  margin-top: 1rem;
  font-weight: 500;
  color: #3b82f6;
  cursor: default;
  letter-spacing: 0.5px;
}
.related-section {
  margin-top: 2.5rem;
  padding: 1.5rem 2rem;
  background: white;
  border-radius: 2rem;
  box-shadow: 0 10px 20px -10px rgba(0,0,0,0.05);
}
.related-section h4 {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: #0b2a41;
}
.related-links {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}
.related-links a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
}
.related-links a:hover {
  text-decoration: underline;
}
.related-links span {
  color: #94a3b8;
}
.faq-section {
  margin-top: 2.5rem;
  padding: 2rem;
  background: white;
  border-radius: 2rem;
  box-shadow: 0 10px 25px -10px rgba(0,0,0,0.05);
}
.faq-section h3 {
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 2rem;
  color: #0a1f33;
}
.faq-item {
  margin-bottom: 1.75rem;
  border-bottom: 1px solid #e9eef3;
  padding-bottom: 1.5rem;
}
.faq-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.faq-q {
  font-weight: 700;
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
  color: #1e3a5f;
}
.faq-a {
  margin: 0;
  color: #334155;
  line-height: 1.6;
  font-size: 1rem;
}
</style>
