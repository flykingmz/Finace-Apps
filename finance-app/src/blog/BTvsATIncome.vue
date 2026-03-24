<template>
  <div class="blog-paycheck">
    <div class="blog-container">
      <div class="blog-inner">
        <!-- ← Back to Blog 左上方链接 + 社交分享按钮 -->
        <div class="blog-nav">
          <div class="nav-left">
            <a href="/blog" class="back-link">← Back to Blog</a>
          </div>
          <div class="nav-right">
            <div class="social-share">
              <a href="#" @click.prevent="shareOnLinkedIn" class="social-link linkedin" title="Share on LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" @click.prevent="shareOnX" class="social-link x" title="Share on X (Twitter)">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" @click.prevent="shareOnFacebook" class="social-link facebook" title="Share on Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- 文章主体 (内容完全一致) -->
        <article class="blog-article">
          <h2>What You Really Take Home: Before vs. After Tax</h2>
          <p>In the U.S., the concept of personal income or salary usually references the before-tax amount, called gross pay. For instance, it is the form of income required on mortgage applications, is used to determine tax brackets, and is used when comparing salaries. This is because it is the raw income figure before other factors are applied, such as federal income tax, allowances, or health insurance deductions, all of which vary from person to person.</p>
          <p>However, in the context of personal finance, the more practical figure is after-tax income (sometimes referred to as disposable income or net income) because it is the figure that is actually disbursed. For instance, a person who lives paycheck-to-paycheck can calculate how much they will have available to pay next month's rent and expenses by using their take-home-paycheck amount.</p>
          <p>Figures entered into "Your Annual Income (Salary)" should be the before-tax amount, and the result shown in "Final Paycheck" is the after-tax amount (including deductions).</p>

          <h2>Pay Frequency</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Pay Frequency</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>Daily</td><td>Pay every working day. Uncommon for salaried jobs.</td></tr>
                <tr><td>Weekly</td><td>Pay each week, generally on the same day each pay period.</td></tr>
                <tr><td>Bi-weekly</td><td>Pay every other week, generally on the same day each pay period.</td></tr>
                <tr><td>Semi-monthly</td><td>Pay on specified dates twice a month, usually on the fifteenth and thirtieth.</td></tr>
                <tr><td>Monthly</td><td>Pay on a specified day once a month.</td></tr>
                <tr><td>Quarterly</td><td>Pay 4 times a year. Uncommon.</td></tr>
                <tr><td>Semi-annually</td><td>Pay 2 times a year. Uncommon.</td></tr>
                <tr><td>Annually</td><td>Pay once a year. Uncommon.</td></tr>
              </tbody>
            </table>
          </div>
          <p>It is important to make the distinction between bi-weekly and semi-monthly, even though they may seem similar at first glance. For the purposes of this calculator, bi-weekly payments occur every other week (though, in some cases, it can be used to mean twice a week). Also, a bi-weekly payment frequency generates two more paychecks a year (26 compared to 24 for semi-monthly). While a person on a bi-weekly payment schedule will receive two paychecks for ten months out of the year, they will receive three paychecks for the remaining two months. In general, employees like to be paid more frequently due to psychological factors, and employers like to pay less frequently due to the costs associated with increased payment frequency. Certain states have specific pay frequency requirements, but federal laws only dictate that the payment schedule be predictable. An employer cannot pay an employee bi-weekly one month, then monthly the next. As a side note, pay periods have no effect on tax liability.</p>

          <h2>File Status</h2>
          <p>The following are the IRS definitions of each filing status:</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>File Status</th><th>Definition</th></tr></thead>
              <tbody>
                <tr><td>Single</td><td>Not married, divorced, or legally separated according to state law.</td></tr>
                <tr><td>Married Filing Jointly</td><td>A married couple filing a return together.</td></tr>
                <tr><td>Married Filing Separately</td><td>If a married couple decides to file returns separately, each of their filing statuses should generally be Married Filing Separately.</td></tr>
                <tr><td>Head of Household</td><td>Only applies to anyone not married who has paid more than half the cost of maintaining a home for themselves and a qualifying person.</td></tr>
                <tr><td>Qualified Widow</td><td>This filing status requires a dependent child and allows for the retention of the benefits associated with the "Married Filing Jointly" status for two years after the year of the spouse's death.</td></tr>
              </tbody>
            </table>
          </div>
          <p>The most commonly chosen options will be "Single," "Married Filing Jointly," and "Head of Household." It is possible for a single person to claim another filing status. For instance, someone who is "Single" can also file as "Head of Household" or "Qualifying Widow" if the conditions are met. Given these options, it is possible for a taxpayer to evaluate their options and choose the filing status that results in the least taxation.</p>

          <h2>Deductions</h2>
          <p>Deductions can lower a person's tax liability by lowering the total taxable income. The deductions are categorized into three inputs above.</p>
          <p><strong>1. Pretax deductions withheld:</strong> These are the deductions to be withheld from the employee's salary by their employer before the salary can be paid out, including 401k, the employee's share of the health insurance premium, health savings account (HSA) deductions, child support payments, union and uniform dues, etc.</p>
          <p><strong>2. Deductions not withheld:</strong> These are the deductions that will not be withheld by the employer but can be subtracted from taxable income, including IRA contributions, student loan interest, qualified tuition, and education-related fees up to $4,000, etc.</p>
          <p><strong>3. Itemized deductions:</strong> These are expenditures on eligible products, services, or contributions that may be subtracted from taxable income, including qualified mortgage interest, state and local income tax plus either property or sales taxes up to a certain amount, charitable donations, medical and dental expenses (over 10% of adjusted gross income), etc.</p>
          <p>For those who do not use itemized deductions, a standard deduction can be used. The standard deduction dollar amount is $16,100 for single households and $32,200 for married couples filing jointly for the tax year 2026. Taxpayers can choose either itemized deductions or the standard deduction, but usually choose whichever results in a higher deduction, and therefore lower tax payable.</p>
          <p>In addition, the One Big Beautiful Bill passed in 2025 introduced several additional deductions. These deductions do not affect the choice between taking the standard deduction and itemizing. However, they apply only to tax years 2025 through 2028 and will expire after 2028 unless further legislation extends them.</p>
          <ul>
            <li><em>Tips</em>—Qualified tips of up to $25,000 per year may be deducted. This deduction phases out for taxpayers with a modified adjusted gross income over $150,000 ($300,000 for joint filers).</li>
            <li><em>Overtime compensation</em>—Qualified overtime compensation of up to $12,500 per year for single filers and $25,000 per year for joint filers may be deducted. This deduction phases out for taxpayers with a modified adjusted gross income over $150,000 ($300,000 for joint filers).</li>
            <li><em>Car loan interest</em>—Individuals may deduct up to $10,000 per year in interest paid on a loan used to purchase a qualified vehicle. This deduction phases out for taxpayers with a modified adjusted gross income over $100,000 ($200,000 for joint filers).</li>
            <li><em>Deduction for seniors</em>—Individuals aged 65 and older may claim an additional deduction of $6,000 per year for single filers, or a total of $12,000 per year for married couples in which both spouses qualify. This deduction phases out for taxpayers with a modified adjusted gross income over $75,000 ($150,000 for joint filers).</li>
          </ul>

          <h2>Income Tax</h2>
          <p>To find an estimated amount on a tax return instead, please use our Income Tax Calculator. Almost all employers automatically withhold taxes from their employees' paychecks (independent contractors and self-employed individuals need to submit quarterly or yearly tax payments independently), as it is mandatory by law. Evasion of tax can result in serious repercussions such as a felony and imprisonment for up to five years.</p>

          <h3>Federal Income Tax</h3>
          <p>The federal income tax is a progressive tax, meaning it increases in accordance with the taxable amount. The more someone makes, the more their income will be taxed as a percentage. In 2026, the federal income tax rate tops out at 37%. Only the highest earners are subject to this percentage. Federal income tax is usually the largest tax deduction from gross pay on a paycheck. It is levied by the Internal Service Revenue (IRS) in order to raise revenue for the U.S. federal government. While individual income is only one source of revenue for the IRS out of a handful, such as income tax on corporations, payroll tax, and estate tax, it is the largest.</p>

          <h3>State Income Tax</h3>
          <p>Similar to how federal income taxes generate revenue for the federal government, state income taxes are imposed in order to generate revenue for state governments. While almost everyone is subject to federal income tax, not all states have an income tax. 33 states as well as the District of Columbia have a progressive system. The state with the highest maximum state income tax rate is California at 13.30%. Eight states have flat rates: Colorado, Illinois, Indiana, Massachusetts, Michigan, North Carolina, Pennsylvania, and Utah. Seven states, Alaska, Florida, Nevada, South Dakota, Texas, Washington, and Wyoming, impose no income tax. Tennessee and New Hampshire fall into a gray area; while they don't impose a tax on income, there is a state tax on interest and dividends. As an aside, unlike the federal government, states often tax municipal bond interest from securities issued outside a certain state, and many allow a full or partial exemption for pension income.</p>

          <h3>Locality/City/Municipal Income Tax</h3>
          <p>Most U.S. cities and counties do not impose this tax, but some do, affecting approximately 10% of the total U.S. population. In general, the highest city tax rates in the U.S. are centered around large cities such as New York City.</p>

          <h3>FICA Tax</h3>
          <p>Also known as payroll tax, FICA refers to Social Security tax and Medicare tax. Whether a person is an employee or an independent contractor, a certain percentage of gross income will go towards FICA. In the case of employees, they pay half of it, and their employer pays the other half. Independent contractors or self-employed individuals pay the full amount because they are both employees and employers. This is one of the reasons why independent contractors tend to be paid more hourly than regular employees for the same job.</p>

          <h4>Social Security</h4>
          <p>Social Security is a federal government system in the U.S. that provides monetary benefits to retired, unemployed, or disabled people, paid for largely by society. The Social Security tax rate is 6.20% (total including employer contribution: 12.40%) up to an annual maximum of $184,500 for 2026 ($176,100 for 2025). For more information about or to do calculations involving Social Security, please visit the Social Security Calculator.</p>

          <h4>Medicare</h4>
          <p>Medicare is a single-payer national social insurance program administered in the U.S. by the federal government. Its main purpose is to provide health insurance to those aged 65 and older. Tax rates are dependent on income brackets. Medicare tax rate is 1.45% (total including employer contribution: 2.90%) for incomes below the threshold amounts shown in the table. Incomes above the threshold amounts will result in an additional 0.45% (total including employer contribution: 0.9%) on top of the regular Medicare tax rate.</p>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Filing Status</th><th>Threshold Amount</th></tr></thead>
              <tbody>
                <tr><td>Married filing jointly</td><td>$250,000</td></tr>
                <tr><td>Married filing separately</td><td>$125,000</td></tr>
                <tr><td>Single</td><td>$200,000</td></tr>
                <tr><td>Head of household</td><td>$200,000</td></tr>
                <tr><td>Qualifying widow(er) with dependent child</td><td>$200,000</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Take Home Pay</h3>
          <p>Only after all of these factors are accounted for can a true, finalized take-home-paycheck be calculated. Figuring out this final figure can be helpful. For instance, people often overestimate how much they are able to spend based on an inflated pre-tax income figure. Knowing the after-tax amount of a paycheck and using it to budget can help rectify this issue. For more comprehensive and detailed calculations regarding budgeting, try our Budget Calculator; just note that it also utilizes a before-tax input for income.</p>

          <h2>How to Increase a Take Home Paycheck</h2>

          <h3>Salary Increase</h3>
          <p>The easiest way to achieve a salary increase may be to simply ask for a raise, promotion, or bonus. However, this is assuming that a salary increase is deserved. For instance, an employee is in a legitimate position to ask for a raise or bonus if their performance exceeded original expectations, or if the company's performance has noticeably improved, due in part to the employee's input. If internal salary increases are not possible, which is common, try searching for another job. In the current job climate, the highest pay increases during a career generally happen while transitioning from one company to another. For more information about or to do calculations involving salary, please visit the Salary Calculator.</p>

          <h3>Reevaluate Payroll Deductions</h3>
          <p>Sometimes, it is possible to find avenues to lower the costs of certain expenses such as life, medical, dental, or long-term disability insurance. For instance, someone who is healthy with no major diseases or injuries can reconsider whether the most expensive top-of-the-line health insurance is necessary. In addition, each spouse's company may have health insurance coverage for the entire family; it would be wise to compare the offerings of each health insurance plan and choose the preferred plan.</p>

          <h3>Open a Flexible Spending Account</h3>
          <p>A flexible spending account (FSA) is a tax-advantaged account that is usually offered by employers to their employees so they have the ability to set aside some of their earnings. Because contributions into an FSA are deducted from paychecks during payroll before income taxes, less income will be subject to taxation. While it won't show up as an immediate increase in a take-home-paycheck, theoretically, any employee who is going to pay for qualified expenses in the future anyway can have more of their "paycheck" taken home using an FSA instead of as disposable income. The most common FSAs used are health savings accounts or health reimbursement accounts, but other types of FSAs exist for qualified expenses related to dependent care or adoption.</p>

          <h3>Work Overtime</h3>
          <p>According to the Fair Labor Standards Act (FLSA), non-exempt employees that are covered must receive overtime pay for hours worked over 40 in a workweek at a rate not less than one and a half times their regular rate of pay. Due to this, if allowed, non-exempt employees have the opportunity for a bigger paycheck by working over 40 hours per week. While most companies tend to set their overtime rates at the minimum, which is time and one-half, companies that provide an overtime rate of two times the regular rate are not out of the ordinary. Exempt employees, otherwise known as salaried employees, generally do not receive overtime pay, even if they work over 40 hours. For more information about overtime, non-exempt or exempt employment, or to do calculations involving working hours, please visit the Time Card Calculator.</p>

          <h3>Cash Out PTO</h3>
          <p>Traditionally, most employers would offer employees vacation days, paid time off, or paid leave. Nowadays, employers tend to roll everything into one concept called paid time off (PTO). In some cases, unused PTO at the end of the year can be "exchanged" for their equivalent financial value. If a company does allow the conversion of unused PTO, accumulated hours and/or days can then be exchanged for a larger paycheck.</p>

          <h3>Temporarily Pause 401(k) Contributions</h3>
          <p>In general, it is wise to stop contributing towards retirement when facing immediate financial difficulty. However, depending on the severity of the financial situation, a case could be made for at least contributing as much as possible towards what an employer will match for a 401(k).</p>

          <!-- 税表区段 2026–2017 完全保留 -->
          <h2>2026 Tax Brackets</h2>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Taxable Income Single</th><th>Joint</th><th>Head of Household</th><th>Tax Rate</th></tr></thead>
              <tbody>
                <tr><td>$0 to $12,400</td><td>$0 to $24,800</td><td>$0 to $17,700</td><td>10%</td></tr>
                <tr><td>$12,400 to $50,400</td><td>$24,800 to $100,800</td><td>$17,700 to $67,450</td><td>12%</td></tr>
                <tr><td>$50,400 to $105,700</td><td>$100,800 to $211,400</td><td>$67,450 to $105,700</td><td>22%</td></tr>
                <tr><td>$105,700 to $201,775</td><td>$211,400 to $403,550</td><td>$105,700 to $201,775</td><td>24%</td></tr>
                <tr><td>$201,775 to $256,225</td><td>$403,550 to $512,450</td><td>$201,775 to $256,200</td><td>32%</td></tr>
                <tr><td>$256,225 to $640,600</td><td>$512,450 to $768,700</td><td>$256,200 to $640,600</td><td>35%</td></tr>
                <tr><td>$640,600+</td><td>$768,700+</td><td>$640,600+</td><td>37%</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>2026 Deductions and Exemptions</strong> — Single: $16,100, Joint: $32,200, Head of Household: $24,150</p>

          <h2>2025 Tax Brackets</h2>
          <div class="table-wrap"><table><thead><tr><th>Taxable Income Single</th><th>Joint</th><th>Head of Household</th><th>Tax Rate</th></tr></thead><tbody><tr><td>$0 to $11,925</td><td>$0 to $23,850</td><td>$0 to $17,000</td><td>10%</td></tr><tr><td>$11,925 to $48,475</td><td>$23,850 to $96,950</td><td>$17,000 to $64,850</td><td>12%</td></tr><tr><td>$48,475 to $103,350</td><td>$96,950 to $206,700</td><td>$64,850 to $103,350</td><td>22%</td></tr><tr><td>$103,350 to $197,300</td><td>$206,700 to $394,600</td><td>$103,350 to $197,300</td><td>24%</td></tr><tr><td>$197,300 to $250,525</td><td>$394,600 to $501,050</td><td>$197,300 to $250,500</td><td>32%</td></tr><tr><td>$250,525 to $626,350</td><td>$501,050 to $751,600</td><td>$250,500 to $626,350</td><td>35%</td></tr><tr><td>$626,350+</td><td>$751,600+</td><td>$626,350+</td><td>37%</td></tr></tbody></table></div><p><strong>2025 Deductions</strong> Single $15,750 Joint $31,500 Head $23,625</p>
        
        <!-- 2024 Tax Brackets -->
<h2>2024 Tax Brackets</h2>
<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th>Taxable Income Single</th>
        <th>Joint</th>
        <th>Head of Household</th>
        <th>Tax Rate</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>$0 to $11,600</td>
        <td>$0 to $23,200</td>
        <td>$0 to $16,550</td>
        <td>10%</td>
      </tr>
      <tr>
        <td>$11,600 to $47,150</td>
        <td>$23,200 to $94,300</td>
        <td>$16,550 to $63,100</td>
        <td>12%</td>
      </tr>
      <tr>
        <td>$47,150 to $100,525</td>
        <td>$94,300 to $201,050</td>
        <td>$63,100 to $100,500</td>
        <td>22%</td>
      </tr>
      <tr>
        <td>$100,525 to $191,950</td>
        <td>$201,050 to $383,900</td>
        <td>$100,500 to $191,950</td>
        <td>24%</td>
      </tr>
      <tr>
        <td>$191,950 to $243,725</td>
        <td>$383,900 to $487,450</td>
        <td>$191,950 to $243,700</td>
        <td>32%</td>
      </tr>
      <tr>
        <td>$243,725 to $609,350</td>
        <td>$487,450 to $731,200</td>
        <td>$243,700 to $609,350</td>
        <td>35%</td>
      </tr>
      <tr>
        <td>$609,350+</td>
        <td>$731,200+</td>
        <td>$609,350+</td>
        <td>37%</td>
      </tr>
    </tbody>
  </table>
</div>
<p><strong>2024 Deductions and Exemptions</strong> — Single: $14,600, Joint: $29,200, Head of Household: $21,900</p>

<!-- 2023 Tax Brackets -->
<h2>2023 Tax Brackets</h2>
<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th>Taxable Income Single</th>
        <th>Joint</th>
        <th>Head of Household</th>
        <th>Tax Rate</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>$0 to $11,000</td>
        <td>$0 to $22,000</td>
        <td>$0 to $15,700</td>
        <td>10%</td>
      </tr>
      <tr>
        <td>$11,001 to $44,725</td>
        <td>$22,001 to $89,450</td>
        <td>$15,701 to $59,850</td>
        <td>12%</td>
      </tr>
      <tr>
        <td>$44,726 to $95,375</td>
        <td>$89,451 to $190,750</td>
        <td>$59,851 to $95,350</td>
        <td>22%</td>
      </tr>
      <tr>
        <td>$95,376 to $182,100</td>
        <td>$190,751 to $364,200</td>
        <td>$95,351 to $182,100</td>
        <td>24%</td>
      </tr>
      <tr>
        <td>$182,101 to $231,250</td>
        <td>$364,201 to $462,500</td>
        <td>$182,101 to $231,250</td>
        <td>32%</td>
      </tr>
      <tr>
        <td>$231,251 to $578,125</td>
        <td>$462,501 to $693,750</td>
        <td>$231,251 to $578,100</td>
        <td>35%</td>
      </tr>
      <tr>
        <td>$578,125+</td>
        <td>$693,750+</td>
        <td>$578,100+</td>
        <td>37%</td>
      </tr>
    </tbody>
  </table>
</div>
<p><strong>2023 Deductions and Exemptions</strong> — Single: $13,850, Joint: $27,700, Head of Household: $20,800</p>

<!-- 2022 Tax Brackets -->
<h2>2022 Tax Brackets</h2>
<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th>Taxable Income Single</th>
        <th>Joint</th>
        <th>Head of Household</th>
        <th>Tax Rate</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>$0 to $10,275</td>
        <td>$0 to $20,550</td>
        <td>$0 to $14,650</td>
        <td>10%</td>
      </tr>
      <tr>
        <td>$10,276 to $41,775</td>
        <td>$20,551 to $83,550</td>
        <td>$14,651 to $55,900</td>
        <td>12%</td>
      </tr>
      <tr>
        <td>$41,776 to $89,075</td>
        <td>$83,551 to $178,150</td>
        <td>$55,901 to $89,050</td>
        <td>22%</td>
      </tr>
      <tr>
        <td>$89,076 to $170,050</td>
        <td>$178,151 to $340,100</td>
        <td>$89,051 to $170,050</td>
        <td>24%</td>
      </tr>
      <tr>
        <td>$170,051 to $215,950</td>
        <td>$340,101 to $431,900</td>
        <td>$170,051 to $215,950</td>
        <td>32%</td>
      </tr>
      <tr>
        <td>$215,951 to $539,900</td>
        <td>$431,901 to $647,850</td>
        <td>$215,951 to $539,900</td>
        <td>35%</td>
      </tr>
      <tr>
        <td>$539,900+</td>
        <td>$647,850+</td>
        <td>$539,900+</td>
        <td>37%</td>
      </tr>
    </tbody>
  </table>
</div>
<p><strong>2022 Deductions and Exemptions</strong> — Single: $12,950, Joint: $25,900, Head of Household: $19,400</p>

<!-- 2021 Tax Brackets -->
<h2>2021 Tax Brackets</h2>
<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th>Taxable Income Single</th>
        <th>Joint</th>
        <th>Head of Household</th>
        <th>Tax Rate</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>$0 to $9,950</td>
        <td>$0 to $19,900</td>
        <td>$0 to $14,200</td>
        <td>10%</td>
      </tr>
      <tr>
        <td>$9,951 to $40,525</td>
        <td>$19,901 to $81,050</td>
        <td>$14,201 to $54,200</td>
        <td>12%</td>
      </tr>
      <tr>
        <td>$40,526 to $86,375</td>
        <td>$81,051 to $172,750</td>
        <td>$54,201 to $86,350</td>
        <td>22%</td>
      </tr>
      <tr>
        <td>$86,376 to $164,925</td>
        <td>$172,751 to $329,850</td>
        <td>$86,351 to $164,900</td>
        <td>24%</td>
      </tr>
      <tr>
        <td>$164,926 to $209,425</td>
        <td>$329,851 to $418,850</td>
        <td>$164,901 to $209,400</td>
        <td>32%</td>
      </tr>
      <tr>
        <td>$209,426 to $523,600</td>
        <td>$418,851 to $628,300</td>
        <td>$209,401 to $523,600</td>
        <td>35%</td>
      </tr>
      <tr>
        <td>$523,600+</td>
        <td>$628,300+</td>
        <td>$523,600+</td>
        <td>37%</td>
      </tr>
    </tbody>
  </table>
</div>
<p><strong>2021 Deductions and Exemptions</strong> — Single: $12,550, Joint: $25,100, Head of Household: $18,800</p>

<!-- 2020 Tax Brackets -->
<h2>2020 Tax Brackets</h2>
<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th>Taxable Income Single</th>
        <th>Joint</th>
        <th>Head of Household</th>
        <th>Tax Rate</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>$0 to $9,875</td>
        <td>$0 to $19,750</td>
        <td>$0 to $14,100</td>
        <td>10%</td>
      </tr>
      <tr>
        <td>$9,876 to $40,125</td>
        <td>$19,751 to $80,250</td>
        <td>$14,101 to $53,700</td>
        <td>12%</td>
      </tr>
      <tr>
        <td>$40,126 to $85,525</td>
        <td>$80,251 to $171,050</td>
        <td>$53,701 to $85,500</td>
        <td>22%</td>
      </tr>
      <tr>
        <td>$85,526 to $163,300</td>
        <td>$171,051 to $326,600</td>
        <td>$85,501 to $163,300</td>
        <td>24%</td>
      </tr>
      <tr>
        <td>$163,301 to $207,350</td>
        <td>$326,601 to $414,700</td>
        <td>$163,301 to $207,350</td>
        <td>32%</td>
      </tr>
      <tr>
        <td>$207,351 to $518,400</td>
        <td>$414,701 to $622,050</td>
        <td>$207,351 to $518,400</td>
        <td>35%</td>
      </tr>
      <tr>
        <td>$518,401+</td>
        <td>$622,051+</td>
        <td>$518,401+</td>
        <td>37%</td>
      </tr>
    </tbody>
  </table>
</div>
<p><strong>2020 Deductions and Exemptions</strong> — Single: $12,400, Joint: $24,800, Head of Household: $18,650</p>

<!-- 2019 Tax Brackets -->
<h2>2019 Tax Brackets</h2>
<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th>Taxable Income Single</th>
        <th>Joint</th>
        <th>Head of Household</th>
        <th>Tax Rate</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>$0 to $9,700</td>
        <td>$0 to $19,400</td>
        <td>$0 to $13,850</td>
        <td>10%</td>
      </tr>
      <tr>
        <td>$9,700 to $39,475</td>
        <td>$19,400 to $78,950</td>
        <td>$13,850 to $52,850</td>
        <td>12%</td>
      </tr>
      <tr>
        <td>$39,475 to $84,200</td>
        <td>$78,950 to $168,400</td>
        <td>$52,850 to $84,200</td>
        <td>22%</td>
      </tr>
      <tr>
        <td>$84,200 to $160,725</td>
        <td>$168,400 to $321,450</td>
        <td>$84,200 to $160,700</td>
        <td>24%</td>
      </tr>
      <tr>
        <td>$160,725 to $204,100</td>
        <td>$321,450 to $408,200</td>
        <td>$160,700 to $204,100</td>
        <td>32%</td>
      </tr>
      <tr>
        <td>$204,100 to $510,300</td>
        <td>$408,200 to $612,350</td>
        <td>$204,100 to $510,300</td>
        <td>35%</td>
      </tr>
      <tr>
        <td>$510,300+</td>
        <td>$612,350+</td>
        <td>$510,300+</td>
        <td>37%</td>
      </tr>
    </tbody>
  </table>
</div>
<p><strong>2019 Deductions and Exemptions</strong> — Single: $12,200, Joint: $24,400, Head of Household: $18,350<br>Personal Exemptions (PEP): $0 per person (not available anymore)</p>

<!-- 2018 Tax Brackets -->
<h2>2018 Tax Brackets</h2>
<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th>Taxable Income Single</th>
        <th>Joint</th>
        <th>Head of Household</th>
        <th>Tax Rate</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>$0 to $9,525</td>
        <td>$0 to $19,050</td>
        <td>$0 to $13,600</td>
        <td>10%</td>
      </tr>
      <tr>
        <td>$9,525 to $38,700</td>
        <td>$19,050 to $77,400</td>
        <td>$13,600 to $51,800</td>
        <td>12%</td>
      </tr>
      <tr>
        <td>$38,700 to $82,500</td>
        <td>$77,400 to $165,000</td>
        <td>$51,800 to $82,500</td>
        <td>22%</td>
      </tr>
      <tr>
        <td>$82,500 to $157,500</td>
        <td>$165,000 to $315,000</td>
        <td>$82,500 to $157,500</td>
        <td>24%</td>
      </tr>
      <tr>
        <td>$157,500 to $200,000</td>
        <td>$315,000 to $400,000</td>
        <td>$157,500 to $200,000</td>
        <td>32%</td>
      </tr>
      <tr>
        <td>$200,000 to $500,000</td>
        <td>$400,000 to $600,000</td>
        <td>$200,000 to $500,000</td>
        <td>35%</td>
      </tr>
      <tr>
        <td>$500,000+</td>
        <td>$600,000+</td>
        <td>$500,000+</td>
        <td>37%</td>
      </tr>
    </tbody>
  </table>
</div>
<p><strong>2018 Deductions and Exemptions</strong> — Single: $12,000, Joint: $24,000, Head of Household: $18,000<br>Personal Exemptions (PEP): $0 per person (not available anymore)</p>

<!-- 2017 Tax Brackets -->
<h2>2017 Tax Brackets</h2>
<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th>Taxable Income Single</th>
        <th>Joint</th>
        <th>Head of Household</th>
        <th>Tax Rate</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>$0 to $9,325</td>
        <td>$0 to $18,650</td>
        <td>$0 to $13,350</td>
        <td>10%</td>
      </tr>
      <tr>
        <td>$9,325 to $37,950</td>
        <td>$18,650 to $75,900</td>
        <td>$13,350 to $50,800</td>
        <td>15%</td>
      </tr>
      <tr>
        <td>$37,950 to $91,900</td>
        <td>$75,900 to $153,100</td>
        <td>$50,800 to $131,200</td>
        <td>25%</td>
      </tr>
      <tr>
        <td>$91,900 to $191,650</td>
        <td>$153,100 to $233,350</td>
        <td>$131,200 to $212,500</td>
        <td>28%</td>
      </tr>
      <tr>
        <td>$191,650 to $416,700</td>
        <td>$233,350 to $416,700</td>
        <td>$212,500 to $416,700</td>
        <td>33%</td>
      </tr>
      <tr>
        <td>$416,700 to $418,400</td>
        <td>$416,700 to $470,700</td>
        <td>$416,700 to $444,550</td>
        <td>35%</td>
      </tr>
      <tr>
        <td>$418,400+</td>
        <td>$470,700+</td>
        <td>$444,550+</td>
        <td>39.6%</td>
      </tr>
    </tbody>
  </table>
</div>
<p><strong>2017 Deductions and Exemptions</strong><br>
Standard Deductions — Single: $6,350, Joint: $12,700, Head of Household: $9,350<br>
Itemized Deduction Eliminated: $261,500 (Single), $313,800 (Joint), $287,650 (Head of Household)<br>
Personal Exemptions (PEP): $4,050 per person<br>
Personal Exemptions Phase-out Begin: $261,500 (Single), $313,800 (Joint), $287,650 (Head of Household)<br>
Personal Exemptions Phase-out Completely: $384,000 (Single), $436,300 (Joint), $410,150 (Head of Household)</p>

        </article>

        <!-- 底部中间calculator按钮 -->
        <div class="blog-footer-button">
          <a href="/take-home-paycheck-calculator" class="calculator-button" @click.prevent>
            Explore Take-Home-Paycheck Calculator →
          </a>
        </div>
      </div> <!-- /blog-inner -->
    </div> <!-- /blog-container -->
  </div> <!-- /blog-paycheck -->
</template>

<script>
export default {
  name: 'BlogPaycheck',
  methods: {
    shareOnLinkedIn() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    },
    shareOnX() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('Understanding Take Home Pay: Before-Tax vs After-Tax Income');
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    },
    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }
  },
  mounted() {
    document.title = 'What You Really Take Home: Before vs. After Tax？'
  }
}
</script>

<style scoped>
/* 完全复现布局 + 左上方← + 底部按钮中间 + 社交分享 */
.blog-paycheck {
  background-color: #f0f4fa;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem 1rem;
}

.blog-container {
  max-width: 1100px;
  width: 100%;
  background: #ffffff;
  border-radius: 40px;
  box-shadow: 0 25px 50px -12px rgba(0, 32, 64, 0.25);
}

.blog-inner {
  padding: 2.5rem 3rem;
}

/* ← Back to Blog 左上方 + 社交分享 */
.blog-nav {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.nav-left {
  flex: 1;
}

.nav-right {
  flex-shrink: 0;
}

.back-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: 520;
  color: #1d4e7c;
  background-color: #ecf3fa;
  border: 1px solid #b9d1ef;
  border-radius: 40px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  transition: 0.15s;
}

.back-link:hover {
  background-color: #dde9fc;
  border-color: #7ba9e6;
}

/* Social Share Buttons */
.social-share {
  display: flex;
  gap: 12px;
  align-items: center;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #ecf3fa;
  color: #1d4e7c;
  transition: all 0.2s ease;
}

.social-link:hover {
  transform: translateY(-2px);
}

.social-link.linkedin:hover {
  background: #0077b5;
  color: white;
}

.social-link.x:hover {
  background: #000000;
  color: white;
}

.social-link.facebook:hover {
  background: #1877f2;
  color: white;
}

.social-link svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 600px) {
  .blog-nav {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .nav-right {
    width: 100%;
  }
  
  .social-share {
    justify-content: flex-start;
  }
}

.blog-header h1 {
  font-size: 2.6rem;
  font-weight: 750;
  color: #0b2542;
  line-height: 1.2;
  margin-bottom: 0.25rem;
  border-left: 10px solid #2c7fb8;
  padding-left: 1.5rem;
}

.header-sub {
  color: #406e96;
  font-size: 1.2rem;
  margin-left: 2.5rem;
  margin-top: 0.5rem;
}

.blog-article {
  color: #1a2e44;
  font-size: 1.05rem;
}

.blog-article h2 {
  font-size: 1.9rem;
  font-weight: 680;
  margin: 2.2rem 0 1rem 0;
  color: #0f3b5e;
  border-bottom: 2px solid #dde7f3;
  padding-bottom: 0.3rem;
}

.blog-article h3 {
  font-size: 1.5rem;
  margin: 1.8rem 0 0.8rem;
  color: #17466b;
}

.blog-article h4 {
  font-size: 1.25rem;
  margin: 1.5rem 0 0.3rem;
  color: #205b88;
}

.blog-article p, .blog-article ul {
  margin-bottom: 1rem;
}

.blog-article ul {
  padding-left: 2rem;
}

.blog-article li {
  margin-bottom: 0.3rem;
}

.table-wrap {
  overflow-x: auto;
  margin: 1.5rem 0;
  background: #f9fcff;
  border-radius: 20px;
  border: 1px solid #cbd9ec;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  min-width: 600px;
}

th {
  background-color: #e2edfd;
  color: #0a3455;
  font-weight: 600;
  padding: 0.75rem 1rem;
  text-align: left;
}

td {
  padding: 0.7rem 1rem;
  border-bottom: 1px solid #c8daf2;
}

tr:last-child td {
  border-bottom: none;
}

/* 底部按钮居中 */
.blog-footer-button {
  display: flex;
  justify-content: center;
  margin-top: 3.5rem;
  margin-bottom: 1.5rem;
}

.calculator-button {
  display: inline-block;
  background: linear-gradient(145deg, #1f5f99, #134879);
  color: white;
  font-weight: 600;
  font-size: 1.3rem;
  padding: 1rem 3rem;
  border-radius: 60px;
  text-decoration: none;
  box-shadow: 0 12px 24px -8px #0f3d60a0;
  transition: all 0.2s ease;
  border: 1px solid #3883c3;
  letter-spacing: 0.02em;
}

.calculator-button:hover {
  background: #0b3f68;
  box-shadow: 0 16px 28px -6px #06273f;
  transform: scale(1.02);
}

/* 确保所有原始内容视觉一致 */
@media (max-width: 700px) {
  .blog-inner { padding: 1.5rem; }
  .blog-header h1 { font-size: 2rem; }
}
</style>
