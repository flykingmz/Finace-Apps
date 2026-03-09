<template>
  <div class="crypto-tax-calculator">
    <!-- Header -->
    <h1 class="main-title">Crypto Tax Calculator for USA, UK, Canada & Australia</h1>
    <p class="description">
      Our Crypto Tax Calculator helps investors estimate potential tax liabilities from cryptocurrency transactions. Whether you trade a single asset like Bitcoin or manage a diversified portfolio of multiple cryptocurrencies, this tool can calculate capital gains based on your selected country's tax rules. Currently supporting the United States, United Kingdom, Canada, and Australia, the calculator allows you to evaluate how buying, selling, and holding digital assets may affect your taxes. Simply enter your transaction details to estimate gains, losses, and potential tax obligations.
    </p>

    <!-- Country Selection Tabs -->
    <div class="country-tabs">
      <button
        v-for="country in countries"
        :key="country.code"
        class="country-btn"
        :class="{ active: selectedCountry === country.code }"
        @click="selectedCountry = country.code"
      >
        {{ country.name }}
      </button>
    </div>

    <!-- Calculator Form -->
    <div class="calculator-form">
      <!-- Trade Type Tabs -->
      <div class="trade-tabs">
        <button
          class="trade-btn"
          :class="{ active: tradeType === 'single' }"
          @click="tradeType = 'single'"
        >
          Single trade
        </button>
        <button
          class="trade-btn"
          :class="{ active: tradeType === 'multiple' }"
          @click="tradeType = 'multiple'"
        >
          Multiple trades
        </button>
      </div>

      <!-- Single Trade Form - 附件2样式 -->
      <div v-if="tradeType === 'single'" class="trade-form">
        <div class="form-row">
          <label>Purchase Price ({{ getCurrencySymbol }})</label>
          <input
            type="number"
            v-model.number="singleTrade.purchasePrice"
            @input="calculate"
            min="0"
            step="100"
            :placeholder="getCurrencySymbol + '10000'"
          />
        </div>

        <div class="form-row">
          <label>Fees ({{ getCurrencySymbol }})</label>
          <input
            type="number"
            v-model.number="singleTrade.fees"
            @input="calculate"
            min="0"
            step="10"
            placeholder="Enter any associated fees"
          />
        </div>

        <div class="form-row">
          <label>Total income ({{ getCurrencySymbol }})</label>
          <input
            type="number"
            v-model.number="singleTrade.totalIncome"
            @input="calculate"
            min="0"
            step="1000"
            :placeholder="getCurrencySymbol + '120000'"
          />
        </div>

        <!-- Crypto Asset Selection - 附件4样式 -->
        <div class="form-row asset-row">
          <label>Asset</label>
          <select v-model="singleTrade.asset" @change="calculate" class="asset-select">
            <option v-for="asset in cryptoAssets" :key="asset" :value="asset">
              {{ asset }}
            </option>
          </select>
        </div>

        <!-- Held for more than 1 year checkbox -->
        <div class="form-row checkbox-row">
          <label class="checkbox-label">
            <input
              type="checkbox"
              v-model="singleTrade.heldLongTerm"
              @change="calculate"
            />
            <span>Held for more than 1 year</span>
          </label>
        </div>

        <div class="form-row">
          <label>Selling Price ({{ getCurrencySymbol }})</label>
          <input
            type="number"
            v-model.number="singleTrade.sellingPrice"
            @input="calculate"
            min="0"
            step="100"
            :placeholder="getCurrencySymbol + '20000'"
          />
        </div>

        <!-- Pre-tax gain display -->
        <div class="gain-display" v-if="singleTrade.purchasePrice && singleTrade.sellingPrice">
          <p><strong>Your pre-tax gain is:</strong> {{ getCurrencySymbol }}{{ formatMoney(preTaxGain) }}</p>
        </div>
      </div>

      <!-- Multiple Trades Form - 附件3样式 -->
      <div v-if="tradeType === 'multiple'" class="trade-form">
        <div class="form-row">
          <label>Gain from crypto ({{ getCurrencySymbol }})</label>
          <input
            type="number"
            v-model.number="multipleTrade.totalGain"
            @input="calculate"
            min="0"
            step="100"
            :placeholder="getCurrencySymbol + '10000'"
          />
        </div>
        
        <div class="info-message">
          <p>This is the total gain from your crypto trades. If you have a complex trading history with multiple wallets/exchange accounts, DeFi, NFT etc then you can use a crypto tax software like Koinly to figure this out for free.</p>
          <a href="#" class="info-link">Calculate now →</a>
        </div>

        <div class="form-row">
          <label>Total income ({{ getCurrencySymbol }})</label>
          <input
            type="number"
            v-model.number="multipleTrade.totalIncome"
            @input="calculate"
            min="0"
            step="1000"
            :placeholder="getCurrencySymbol + '120000'"
          />
        </div>

        <div class="form-row checkbox-row">
          <label class="checkbox-label">
            <input
              type="checkbox"
              v-model="multipleTrade.heldLongTerm"
              @change="calculate"
            />
            <span>Held for more than 1 year</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Results Section - 附件5样式 -->
    <div class="results-section" v-if="results.calculated">
      <h2>{{ getTaxYearText }}</h2>

      <div class="summary-list">
        <div class="summary-item">
          <span class="item-label">Profit from crypto</span>
          <span class="item-value">{{ getCurrencySymbol }}{{ formatMoney(results.profit) }}</span>
        </div>

        <div v-if="results.discount > 0" class="summary-item discount">
          <span class="item-label">{{ getDiscountLabel }}</span>
          <span class="item-value">-{{ getCurrencySymbol }}{{ formatMoney(results.discount) }}</span>
        </div>

        <div v-if="results.allowance > 0" class="summary-item allowance">
          <span class="item-label">{{ getAllowanceLabel }}</span>
          <span class="item-value">-{{ getCurrencySymbol }}{{ formatMoney(results.allowance) }}</span>
        </div>

        <div class="summary-item">
          <span class="item-label">Taxable profit</span>
          <span class="item-value">{{ getCurrencySymbol }}{{ formatMoney(results.taxableProfit) }}</span>
        </div>

        <div class="summary-item">
          <span class="item-label">Capital gains tax</span>
          <span class="item-value">{{ getCurrencySymbol }}{{ formatMoney(results.tax) }} ({{ results.taxRate }}%)</span>
        </div>
      </div>

      <div class="summary-totals">
        <p class="profit-after-tax">
          <strong>Profit after tax = {{ getCurrencySymbol }}{{ formatMoney(results.profitAfterTax) }}</strong>
        </p>
        <p class="profit-percent">
          <strong>Percent of profit to taxes = {{ results.taxPercent }}%</strong>
        </p>
      </div>

      <div class="disclaimer">
        <p>{{ getDisclaimerText }}</p>
      </div>
    </div>

    <!-- Related Tools -->
    <div class="related-tools">
      <span class="related-label">Related:</span>
      <a href="/take-home-paycheck-calculator">Take Home Paycheck Calculator</a>
      <span class="sep">|</span>
      <a href="/salary-calculator">Salary Calculator</a>
    </div>

    <!-- FAQ Section (保持完整，与之前一致) -->
    <div class="faq-section">
      <h2>Crypto Tax Information – FAQ</h2>

      <div class="faq-item">
        <h3>How accurate is this crypto tax calculator?</h3>
        <p>This calculator estimates your Capital Gains Tax using the information you provide. It determines your tax band based on your annual income, applies the relevant tax rates to your reported gains, and includes the Capital Gains Tax-free allowance. If your income spans multiple tax bands, rates are applied proportionally for a more accurate estimate.</p>
        <p>Tax rates are sourced from HMRC and updated to reflect the Autumn 2024 Budget changes. However, this calculator does not account for capital losses (current or carried forward), changes to your personal allowance, tax credits, or whether you've already used your tax-free allowance.</p>
        <p>HMRC introduced new Capital Gains Tax rates for disposals made from 30 October 2024. The rates are 18% for the basic rate band and 24% for higher and additional rate bands. This calculator uses the new 2024–25 rates. If you made disposals earlier in the 2024–25 tax year, the previous rates of 10% and 20% may apply. Use the 2023–24 calculator by selecting the year from the cog icon.</p>
      </div>

      <div class="faq-item">
        <h3>What if I don't have the information to use this crypto tax calculator?</h3>
        <p>If you don't know your figures, Koinly can figure them out for you. When you import your trading history to Koinly, it does all the hard work for you, including identifying your cost basis and the fair market value of any crypto income. It even factors in deductible trading fees, all automatically.</p>
      </div>

      <div class="faq-item">
        <h3>How do I calculate my purchase price?</h3>
        <p>Your purchase price is whatever you paid for your crypto, plus any allowable fees. It's also known as your cost basis. In instances where you have multiple assets of the same kind, HMRC states investors should use the Share Pooling method to calculate their cost basis.</p>
      </div>

      <div class="faq-item">
        <h3>Why do I need to enter my annual income?</h3>
        <p>Our tool uses your annual income to figure out what tax band you fall into, so it can more accurately estimate the amount of tax due.</p>
      </div>

      <div class="faq-item">
        <h3>How is cryptocurrency taxed in the US?</h3>
        <p>Crypto is subject to Capital Gains Tax or Income Tax in the US, depending on the transaction. You'll pay up to 37% in federal income tax, up to 20% in capital gains tax, and any applicable state taxes.</p>
      </div>

      <div class="faq-item">
        <h3>What are capital gains?</h3>
        <p>You get a capital gain or loss any time you dispose of a capital asset, like cryptocurrencies or stocks. Disposals include selling crypto, trading crypto, and spending crypto. Anytime you have a disposal, you have a potentially taxable transaction and need to calculate your gain or loss. Any gain is taxable.</p>
      </div>

      <div class="faq-item">
        <h3>Income from crypto</h3>
        <p>As well as capital gains, some transactions are subject to income tax on receipt, for example, mining rewards, staking rewards, and other instances where you earn tokens as a reward.</p>
      </div>

      <div class="faq-item">
        <h3>What are capital losses?</h3>
        <p>If you have a loss from disposing of a capital asset, you can offset this loss against any capital gains. If you have no capital gains to offset, you can offset losses against up to $3,000 of ordinary income each year, or carry losses forward to offset against future gains.</p>
      </div>

      <div class="faq-item">
        <h3>How to calculate capital gains tax on crypto in the US?</h3>
        <p>Your capital gains tax rate is calculated based on your total annual income, state, filing status, and how long you've held the asset:</p>
        <ul>
          <li>Short-term capital gains (from assets held less than a year) are taxed at your federal and state income tax rates.</li>
          <li>Long-term capital gains (from assets held more than a year) are taxed at a lower capital gains tax rate of up to 20% and state tax rates.</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>How tax brackets work in the US</h3>
        <p>Your tax bracket is based on your total annual income, including wages, capital gains, and other income. The US uses a progressive tax system, so different portions of your income are taxed at different rates. No single rate applies to all your income; only the amount within each range is taxed at that rate. The federal income and capital gains tax rates are shown below:</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Income Tax Rate</th><th>Income</th><th>Capital Gains Tax Rate</th><th>Income</th></tr>
            </thead>
            <tbody>
              <tr><td>10%</td><td>$0 – $11,925</td><td>0%</td><td>$0 – $48,350</td></tr>
              <tr><td>12%</td><td>$11,926 – $48,475</td><td>15%</td><td>$48,351 – $533,400</td></tr>
              <tr><td>22%</td><td>$48,476 – $103,350</td><td>20%</td><td>$533,401+</td></tr>
              <tr><td>24%</td><td>$103,351 – $197,300</td><td></td><td></td></tr>
              <tr><td>32%</td><td>$197,301 – $250,525</td><td></td><td></td></tr>
              <tr><td>35%</td><td>$250,526 – $626,350</td><td></td><td></td></tr>
              <tr><td>37%</td><td>$626,351+</td><td></td><td></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="faq-item">
        <h3>State and local income taxes on crypto in the US</h3>
        <p>State taxes apply to both capital gains and income from crypto, but there are exceptions. States with no income tax, like Texas and Florida, do not apply additional taxes, and other states, like Missouri, have exempted capital gains from state income taxes. Other states allow for sizeable deductions of up to 50% on capital gains, and some have lower tax rates specifically for long-term capital gains. In some instances, local income taxes may also apply to crypto depending on your state laws.</p>
      </div>

      <div class="faq-item">
        <h3>When do I owe crypto taxes in the US?</h3>
        <p>Anytime you have a capital gain or income from crypto, you'll owe tax on it. You'll need to include this in your annual tax return by April 15 and pay any tax due (and depending on your circumstances, you may also need to pay estimated quarterly taxes).</p>
      </div>

      <div class="faq-item">
        <h3>How to reduce crypto taxes in the US?</h3>
        <p>Most investors opt for two simple strategies: hold assets and utilize losses. Crypto held for more than one year is taxed at lower long-term capital gains rates. Tracking how long you've held each asset helps you decide what to sell, and when, for a better tax outcome. Capital losses can offset gains and reduce your tax bill. If losses exceed gains, you can also offset up to $3,000 of ordinary income each year. Identifying unrealized losses lets you see how realizing them could lower your taxes. Koinly offers a tax optimization and asset maturity dashboard to help with both.</p>
      </div>

      <div class="faq-item">
        <h3>How is cryptocurrency taxed in the UK?</h3>
        <p>Crypto is subject to Capital Gains Tax and Income Tax in the UK, depending on your specific transactions.</p>
      </div>

      <div class="faq-item">
        <h3>What are capital gains in the UK?</h3>
        <p>Capital gains are profits made from disposing of a capital asset, like stocks and crypto. Traditionally, a disposal meant selling your capital asset. For crypto, disposals include selling, trading, spending, and gifting crypto (excluding to your spouse).</p>
      </div>

      <div class="faq-item">
        <h3>Income from crypto in the UK</h3>
        <p>In some instances, you'll also pay Income Tax upon receipt of crypto when you're earning new tokens, for example, from mining, staking, or airdrops (in most instances).</p>
      </div>

      <div class="faq-item">
        <h3>What are capital losses in the UK?</h3>
        <p>If you dispose of your crypto and have a loss, then this is a capital loss that can be offset against your capital gains to reduce your tax bill. If you don't have any gains to offset, you can also carry losses forward to offset future gains.</p>
      </div>

      <div class="faq-item">
        <h3>How to calculate capital gains tax on crypto in the UK?</h3>
        <p>Your Capital Gains Tax rate is either 18% or 24%, depending on the Income Tax band you fall into. Basic rate taxpayers pay 18%, while higher rate taxpayers pay 24%. Every taxpayer gets a £3,000 a year tax-free allowance for capital gains.</p>
      </div>

      <div class="faq-item">
        <h3>How tax brackets work in the UK</h3>
        <p>Your tax band is based on your total annual income, including employment income, capital gains, and other taxable income. The UK uses a progressive tax system, meaning different portions of your income are taxed at different rates. No single rate applies to your full income; only the amount within each band is taxed at that rate. See the UK capital gains tax rates below:</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Tax Rate</th><th>Taxable Income</th></tr>
            </thead>
            <tbody>
              <tr><td>18%</td><td>Basic Rate Income Band (up to £50,270)</td></tr>
              <tr><td>24%</td><td>Higher Rate Income Band (up to £150,000)</td></tr>
              <tr><td>24%</td><td>Additional Rate Income Band (more than £150,000)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="faq-item">
        <h3>When do I owe crypto taxes in the UK?</h3>
        <p>You owe tax when you realise a capital gain or receive taxable income from crypto. These must be reported on your Self Assessment tax return, which is due by 31 January following the end of the tax year. Any tax owed is due on the same date.</p>
      </div>

      <div class="faq-item">
        <h3>How to reduce crypto tax in the UK?</h3>
        <p>There are many steps investors can take throughout the financial year in order to optimise their tax liability, including using Koinly's tax optimization tool to identify unrealised losses and gains to harvest.</p>
      </div>

      <div class="faq-item">
        <h3>How is cryptocurrency taxed in Canada?</h3>
        <p>Crypto is subject to both federal and provincial income tax in Canada, and the amount you'll pay depends on how much you earn, your transactions, and whether you have capital gains or business income.</p>
      </div>

      <div class="faq-item">
        <h3>What are capital gains in Canada?</h3>
        <p>Capital gains are the profits you make when you dispose of a capital asset, such as stocks or crypto. While disposal traditionally meant selling, for crypto, it also includes trading, spending, or gifting your assets. Canada doesn't have a separate Capital Gains Tax rate. Instead, capital gains are taxed as income at your federal and provincial rates. If the CRA treats your profits as capital gains, only 50% of the gain is taxable (or 2/3 for capital gains over $250,000). In some cases, the CRA may classify your crypto profits as business income, depending on your trading activity and intent, in which case the 50% inclusion rate would not apply. Some other transactions, like mining or staking rewards, may also be taxable income upon receipt.</p>
      </div>

      <div class="faq-item">
        <h3>What are capital losses in Canada?</h3>
        <p>If you have a loss from disposing of crypto, then you have a capital loss. You can use these losses to offset gains and reduce your overall tax liability. However, like gains, only half of any loss is allowed to be offset.</p>
      </div>

      <div class="faq-item">
        <h3>How to calculate capital gains tax on crypto in Canada?</h3>
        <p>Your Capital Gains Tax rate depends on your total annual income and how you're viewed as an investor. For individual investors, only half of any gain is subject to tax at your Federal and Provincial tax rate.</p>
      </div>

      <div class="faq-item">
        <h3>How tax brackets work in Canada</h3>
        <p>Your tax rate depends on your total taxable income for the year, including salary, capital gains, and any other income. In Canada, income is taxed progressively, so higher portions of your income are taxed at higher rates. This means you don't pay one flat rate on everything you earn; each portion of income is taxed at the rate for its bracket. Your final tax bill is based on a combination of federal and provincial income tax rates. You can see the federal rates for the last financial year below:</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Tax Rate</th><th>Income</th></tr>
            </thead>
            <tbody>
              <tr><td>14.5%*</td><td>$57,375 or less</td></tr>
              <tr><td>20.5%</td><td>$57,375.01 - $114,750</td></tr>
              <tr><td>26%</td><td>$114,751 - $177,882</td></tr>
              <tr><td>29%</td><td>$177,883 - $253,414</td></tr>
              <tr><td>33%</td><td>$253,414.01+</td></tr>
            </tbody>
          </table>
        </div>
        <p>*Effective rate based on the 14% mid-year rate change.</p>
      </div>

      <div class="faq-item">
        <h3>Provincial income tax on crypto in Canada</h3>
        <p>Provincial income taxes apply to both capital gains and income from crypto, and can vary between 4% to 21.8% depending on your location and annual income. Some provinces also have additional regulations surrounding crypto; for example, in Ontario, retail investors are subject to a net buy limit of $30,000 on the majority of tokens.</p>
      </div>

      <div class="faq-item">
        <h3>When do I owe crypto taxes in Canada?</h3>
        <p>You owe tax whenever you realise a capital gain or receive taxable income from crypto. These amounts must be reported on your annual income tax return, which is due by 30 April following the end of the tax year. Any tax owed is also payable by this date, although self-employed individuals may have a later filing deadline.</p>
      </div>

      <div class="faq-item">
        <h3>How do I reduce crypto taxes in Canada?</h3>
        <p>One simple strategy available to Canadian investors to reduce their crypto tax bill is to utilise losses. Losses might be bad news for your portfolio, but they're good news for your tax bill because the CRA lets you offset half of any loss against your taxable gains to reduce your overall tax bill. Koinly's tax optimization dashboard helps you identify unrealised losses and simulate how realizing them would impact your tax bill.</p>
      </div>

      <div class="faq-item">
        <h3>How is cryptocurrency taxed in Australia?</h3>
        <p>Crypto is subject to Income Tax, but the amount you'll pay depends on your annual income, how long you've held your crypto, and your specific transactions.</p>
      </div>

      <div class="faq-item">
        <h3>What are capital gains in Australia?</h3>
        <p>Capital gains are profits made from disposing of property, like stocks and crypto. Traditionally, a disposal meant selling your capital asset. For crypto, disposals include selling, trading, spending, and gifting crypto. Any capital gain you make will be subject to income tax, but if you've held your crypto for more than a year, you'll receive a 50% discount.</p>
      </div>

      <div class="faq-item">
        <h3>Income from crypto in Australia</h3>
        <p>In some instances, crypto can also be subject to income tax upon receipt when you're earning new tokens, for example, through mining or staking rewards.</p>
      </div>

      <div class="faq-item">
        <h3>What are capital losses in Australia?</h3>
        <p>If you have a loss from disposing of a capital asset, you can offset this loss against any capital gains. If you have no capital gains to offset, you can carry losses forward to offset against future gains.</p>
      </div>

      <div class="faq-item">
        <h3>How to calculate capital gains tax on crypto in Australia?</h3>
        <p>Your Capital Gains Tax rate is based on the same Income Tax rates the ATO uses for regular income, like your salary. How much you'll pay depends on your total annual income and how long you've held the asset:</p>
        <ul>
          <li>For short-term capital gains, from crypto held less than a year, you'll pay the same Income Tax rate you would on your regular salary or other income, at up to 45% depending on how much you earn.</li>
          <li>For long-term capital gains, from crypto held more than a year, you receive a 50% discount, so only half your gain is subject to Income Tax.</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>How tax brackets work in Australia</h3>
        <p>Your tax bracket is based on your total annual income, including salary and wages, capital gains, and other assessable income. Australia uses a progressive tax system, which means different portions of your income are taxed at different rates. No single rate applies to your entire income; only the amount within each tax bracket is taxed at that rate. The current income tax rates are below, but remember, if you've held your asset for a year, you receive a 50% discount!</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Income</th><th>Tax Rate</th></tr>
            </thead>
            <tbody>
              <tr><td>$0 - $18,200</td><td>0%</td></tr>
              <tr><td>$18,201 - $45,000</td><td>16%</td></tr>
              <tr><td>$45,001 - $135,000</td><td>30%</td></tr>
              <tr><td>$135,001 - $190,000</td><td>37%</td></tr>
              <tr><td>$190,001+</td><td>45%</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="faq-item">
        <h3>When do I owe crypto taxes in Australia?</h3>
        <p>You owe tax when you make a capital gain or receive assessable income from crypto. These amounts must be reported in your annual tax return, which is due by 31 October following the end of the financial year (or later if you lodge through a registered tax agent).</p>
      </div>

      <div class="faq-item">
        <h3>How to reduce crypto tax in Australia?</h3>
        <p>There are two simple strategies available to Aussie investors to reduce their crypto tax bill: hold and utilise losses.</p>
        <ul>
          <li>Crypto held for more than 12 months before disposal qualifies for the 50% capital gains tax discount, so only half of your gain is taxable. Koinly's asset maturity dashboard helps you track how long you've held each asset so you can plan what to sell and when.</li>
          <li>Capital losses can be used to offset capital gains and reduce your overall tax bill. Koinly's tax optimisation dashboard helps you identify unrealised losses and model the impact of realising them.</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>How much Capital Gains Tax will I pay?</h3>
        <p>It depends on your profit, how much you earn in total annual income, and how long you held your asset before disposing of it. Both short and long-term gains are taxed at your Income Tax rate, but long-term gains receive a 50% discount.</p>
      </div>

      <div class="faq-item">
        <h3>What's the difference between short and long-term capital gains?</h3>
        <p>Short-term capital gains are gains from assets you held for less than a year before disposing of them. Long-term capital gains are gains from assets you held for more than a year before disposing of them. The latter receive favorable tax treatment, so it pays to hold!</p>
      </div>

      <div class="faq-item">
        <h3>How does income affect capital gains?</h3>
        <p>Your income dictates what tax bracket you fall into, and the amount of tax you'll pay on your capital gains. Your holding period also determines this.</p>
      </div>

      <div class="faq-item">
        <h3>How do fees impact my tax calculations?</h3>
        <p>Purchase and sale fees are deductible! This means they can be factored in as allowable expenses when calculating your cost basis, so you can use fees to reduce your tax liability.</p>
      </div>
    </div>

     <!-- Calculator CTA -->
    <section class="section calculator-cta">
    <a href="/crypto-tax-calculator-estimate-bitcoin-crypto-capital-gains-blog" class="calculator-btn">
    More Estimate Bitcoin & Crypto Capital Gains (2026 Guide) blog →
    </a>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CryptoTaxCalculator',
  data() {
    return {
      countries: [
        { code: 'au', name: 'Australia' },
        { code: 'uk', name: 'UK' },
        { code: 'usa', name: 'USA' },
        { code: 'canada', name: 'Canada' }
      ],
      selectedCountry: 'au',
      tradeType: 'single',
      cryptoAssets: [
        'Bitcoin', 'Ethereum', 'Tether', 'BNB', 'XRP', 'USD Coin', 
        'Cardano', 'Dogecoin', 'Solana', 'TRON', 'Ton'
      ],
      singleTrade: {
        purchasePrice: 10000,
        fees: 0,
        totalIncome: 120000,
        asset: 'Bitcoin',
        heldLongTerm: true,
        sellingPrice: 20000
      },
      multipleTrade: {
        totalGain: 10000,
        totalIncome: 120000,
        heldLongTerm: true
      },
      results: {
        calculated: false,
        profit: 0,
        discount: 0,
        allowance: 0,
        taxableProfit: 0,
        tax: 0,
        taxRate: 0,
        profitAfterTax: 0,
        taxPercent: 0
      }
    };
  },
  computed: {
    getTaxPeriod() {
      if (this.selectedCountry === 'au') return '1/7/2025 - 30/6/2026';
      if (this.selectedCountry === 'uk') return '6/4/2025 - 5/4/2026';
      if (this.selectedCountry === 'usa') return '1/1/2025 - 31/12/2025';
      if (this.selectedCountry === 'canada') return '1/1/2025 - 31/12/2025';
      return '';
    },
    getCurrencySymbol() {
      if (this.selectedCountry === 'au') return 'A$';
      if (this.selectedCountry === 'uk') return '£';
      if (this.selectedCountry === 'usa') return '$';
      if (this.selectedCountry === 'canada') return 'C$';
      return '$';
    },
    preTaxGain() {
      if (!this.singleTrade.purchasePrice || !this.singleTrade.sellingPrice) return 0;
      const gain = this.singleTrade.sellingPrice - this.singleTrade.purchasePrice - (this.singleTrade.fees || 0);
      return Math.max(0, gain);
    },
    getTaxYearText() {
      if (this.selectedCountry === 'au') return 'Estimated 2025-26 Tax Summary';
      if (this.selectedCountry === 'uk') return 'Estimated 2025-26 Tax Summary';
      if (this.selectedCountry === 'usa') return 'Estimated 2025 Tax Summary';
      if (this.selectedCountry === 'canada') return 'Estimated 2025 Tax Summary';
      return 'Estimated Tax Summary';
    },
    getDiscountLabel() {
      if (this.selectedCountry === 'au') return '50% CGT Discount';
      if (this.selectedCountry === 'canada') return '50% Inclusion Rate Adjustment';
      return 'Long-term discount';
    },
    getAllowanceLabel() {
      if (this.selectedCountry === 'uk') return 'Tax-free allowance';
      return '';
    },
    getDisclaimerText() {
      if (this.selectedCountry === 'au') {
        return 'Disclaimer: This information is only intended as a general estimate for Australia capital gains taxes and assumes that all amounts are provided in AUD. It does not include the potential effects of losses carried over from prior years, deductions, tax credits, or capital losses that may offset your capital gains. See a qualified tax advisor for details.';
      }
      if (this.selectedCountry === 'uk') {
        return 'Disclaimer: This information is only intended as a general estimate for UK capital gains taxes and assumes that all amounts are provided in GBP. It does not include the potential effects of losses carried over from prior years, deductions, tax credits, or the personal allowance. See a qualified tax advisor for details.';
      }
      if (this.selectedCountry === 'usa') {
        return 'Disclaimer: This information is only intended as a general estimate for US federal capital gains taxes and assumes that all amounts are provided in USD. It does not include state taxes, the potential effects of losses carried over from prior years, deductions, tax credits, or capital losses that may offset your capital gains. See a qualified tax advisor for details.';
      }
      if (this.selectedCountry === 'canada') {
        return 'Disclaimer: This information is only intended as a general estimate for Canada capital gains taxes and assumes that all amounts are provided in CAD. It does not include provincial taxes, the potential effects of losses carried over from prior years, deductions, tax credits, or capital losses that may offset your capital gains. See a qualified tax advisor for details.';
      }
      return 'Disclaimer: This information is only intended as a general estimate. See a qualified tax advisor for details.';
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
      desc.content = 'Estimate your cryptocurrency tax instantly with our Crypto Tax Calculator. Calculate capital gains for Bitcoin and other digital assets across the USA, UK, Canada, and Australia. Supports both single-asset and multi-asset crypto portfolios to help you understand potential tax liabilities.'
      
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
    calculate() {
      let profit = 0;
      let totalIncome = 0;
      let heldLongTerm = false;

      if (this.tradeType === 'single') {
        profit = this.preTaxGain;
        totalIncome = this.singleTrade.totalIncome || 0;
        heldLongTerm = this.singleTrade.heldLongTerm;
      } else {
        profit = this.multipleTrade.totalGain || 0;
        totalIncome = this.multipleTrade.totalIncome || 0;
        heldLongTerm = this.multipleTrade.heldLongTerm;
      }

      if (profit <= 0) {
        this.results = { calculated: false };
        return;
      }

      // 根据不同国家的税制计算
      if (this.selectedCountry === 'au') {
        this.calculateAustralia(profit, totalIncome, heldLongTerm);
      } else if (this.selectedCountry === 'uk') {
        this.calculateUK(profit, totalIncome, heldLongTerm);
      } else if (this.selectedCountry === 'usa') {
        this.calculateUSA(profit, totalIncome, heldLongTerm);
      } else if (this.selectedCountry === 'canada') {
        this.calculateCanada(profit, totalIncome, heldLongTerm);
      }
    },

    calculateAustralia(profit, totalIncome, heldLongTerm) {
      // Australia: 50% discount for long-term holdings
      let discount = 0;
      let allowance = 0;
      let taxableProfit = profit;

      if (heldLongTerm) {
        discount = profit * 0.5;
        taxableProfit = profit - discount;
      }

      // 根据收入确定税率 (包含利润后的总收入)
      const totalAssessable = totalIncome + taxableProfit;
      let taxRate = 0;

      if (totalAssessable <= 18200) {
        taxRate = 0;
      } else if (totalAssessable <= 45000) {
        taxRate = 16;
      } else if (totalAssessable <= 135000) {
        taxRate = 30;
      } else if (totalAssessable <= 190000) {
        taxRate = 37;
      } else {
        taxRate = 45;
      }

      const tax = taxableProfit * (taxRate / 100);
      const profitAfterTax = profit - tax;
      const taxPercent = profit > 0 ? (tax / profit * 100) : 0;

      this.results = {
        calculated: true,
        profit: profit,
        discount: discount,
        allowance: allowance,
        taxableProfit: taxableProfit,
        tax: tax,
        taxRate: taxRate.toFixed(1),
        profitAfterTax: profitAfterTax,
        taxPercent: taxPercent.toFixed(2)
      };
    },

    calculateUK(profit, totalIncome, heldLongTerm) {
      // UK: £3,000 allowance, rates 18%/24%
      const allowance = 3000;
      const taxableProfit = Math.max(0, profit - allowance);
      
      // 根据总收入确定税率
      const totalAssessable = totalIncome + profit;
      let taxRate = 0;

      if (totalAssessable <= 50270) {
        taxRate = 18; // Basic rate
      } else {
        taxRate = 24; // Higher/Additional rate
      }

      const tax = taxableProfit * (taxRate / 100);
      const profitAfterTax = profit - tax;
      const taxPercent = profit > 0 ? (tax / profit * 100) : 0;

      this.results = {
        calculated: true,
        profit: profit,
        discount: 0,
        allowance: allowance,
        taxableProfit: taxableProfit,
        tax: tax,
        taxRate: taxRate.toFixed(1),
        profitAfterTax: profitAfterTax,
        taxPercent: taxPercent.toFixed(2)
      };
    },

    calculateUSA(profit, totalIncome, heldLongTerm) {
      // USA: 短期按收入税率，长期按优惠税率
      let discount = 0;
      let allowance = 0;
      let taxableProfit = profit;
      let taxRate = 0;

      const totalAssessable = totalIncome + profit;

      if (heldLongTerm) {
        // Long-term capital gains rates
        if (totalAssessable <= 48350) {
          taxRate = 0;
        } else if (totalAssessable <= 533400) {
          taxRate = 15;
        } else {
          taxRate = 20;
        }
      } else {
        // Short-term (income tax rates)
        if (totalAssessable <= 11925) {
          taxRate = 10;
        } else if (totalAssessable <= 48475) {
          taxRate = 12;
        } else if (totalAssessable <= 103350) {
          taxRate = 22;
        } else if (totalAssessable <= 197300) {
          taxRate = 24;
        } else if (totalAssessable <= 250525) {
          taxRate = 32;
        } else if (totalAssessable <= 626350) {
          taxRate = 35;
        } else {
          taxRate = 37;
        }
      }

      const tax = taxableProfit * (taxRate / 100);
      const profitAfterTax = profit - tax;
      const taxPercent = profit > 0 ? (tax / profit * 100) : 0;

      this.results = {
        calculated: true,
        profit: profit,
        discount: discount,
        allowance: allowance,
        taxableProfit: taxableProfit,
        tax: tax,
        taxRate: taxRate.toFixed(1),
        profitAfterTax: profitAfterTax,
        taxPercent: taxPercent.toFixed(2)
      };
    },

    calculateCanada(profit, totalIncome, heldLongTerm) {
      // Canada: 50% inclusion rate, 2/3 for gains over $250k
      let discount = 0;
      let allowance = 0;
      let taxableProfit = profit;

      // 50% inclusion rate for capital gains
      taxableProfit = profit * 0.5;
      discount = profit - taxableProfit;

      const totalAssessable = totalIncome + profit;

      // Federal tax rates
      let taxRate = 0;
      if (totalAssessable <= 57375) {
        taxRate = 14.5;
      } else if (totalAssessable <= 114750) {
        taxRate = 20.5;
      } else if (totalAssessable <= 177882) {
        taxRate = 26;
      } else if (totalAssessable <= 253414) {
        taxRate = 29;
      } else {
        taxRate = 33;
      }

      const tax = taxableProfit * (taxRate / 100);
      const profitAfterTax = profit - tax;
      const taxPercent = profit > 0 ? (tax / profit * 100) : 0;

      this.results = {
        calculated: true,
        profit: profit,
        discount: discount,
        allowance: allowance,
        taxableProfit: taxableProfit,
        tax: tax,
        taxRate: taxRate.toFixed(1),
        profitAfterTax: profitAfterTax,
        taxPercent: taxPercent.toFixed(2)
      };
    },

    formatMoney(value) {
      if (value === undefined || value === null || isNaN(value)) return '0.00';
      return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    clearForm() {
      this.singleTrade = {
        purchasePrice: 10000,
        fees: 0,
        totalIncome: 120000,
        asset: 'Bitcoin',
        heldLongTerm: true,
        sellingPrice: 20000
      };
      this.multipleTrade = {
        totalGain: 10000,
        totalIncome: 120000,
        heldLongTerm: true
      };
      this.calculate();
    }
  },
  mounted() {
    document.title = 'Crypto Tax Calculator (USA, UK, Canada, Australia) – Estimate Capital Gains on Crypto Trades'
    // 2. 设置关键meta标签（Google最关注的）
    this.setGoogleMetaTags()
    this.calculate();
  },
  watch: {
    selectedCountry: {
      handler: 'calculate'
    },
    tradeType: {
      handler: 'calculate'
    },
    'singleTrade.purchasePrice': 'calculate',
    'singleTrade.fees': 'calculate',
    'singleTrade.totalIncome': 'calculate',
    'singleTrade.asset': 'calculate',
    'singleTrade.heldLongTerm': 'calculate',
    'singleTrade.sellingPrice': 'calculate',
    'multipleTrade.totalGain': 'calculate',
    'multipleTrade.totalIncome': 'calculate',
    'multipleTrade.heldLongTerm': 'calculate'
  }
};
</script>

<style scoped>
/* 移动端优先的样式设计 - 保持与之前完全一致 */
.crypto-tax-calculator {
  max-width: 1100px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 32px;
  box-shadow: 0 20px 40px -10px rgba(0, 34, 68, 0.15);
  padding: 28px 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #11212e;
}

@media (max-width: 480px) {
  .crypto-tax-calculator {
    padding: 20px 16px;
    border-radius: 24px;
  }
}

.main-title {
  font-size: 2.2rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #0b2b44;
  letter-spacing: -0.02em;
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.8rem;
  }
}

.description {
  font-size: 1rem;
  line-height: 1.5;
  background: #ecf3fa;
  padding: 16px 20px;
  border-radius: 24px;
  margin-bottom: 24px;
  color: #1c3a5c;
  border: 1px solid #c7daf0;
}

/* Country Tabs */
.country-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 12px;
}

.country-btn {
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 500;
  color: #4b5f73;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.2s;
  flex: 1;
  min-width: 70px;
}

.country-btn.active {
  background: #1f3a5f;
  color: white;
}

@media (max-width: 480px) {
  .country-btn {
    font-size: 0.9rem;
    padding: 6px 10px;
  }
}

.calculator-form {
  background: #f2f6fb;
  border-radius: 28px;
  padding: 24px;
  border: 1px solid #cdddee;
  margin-bottom: 32px;
}

/* Trade Tabs */
.trade-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  border-bottom: 2px solid #d4e2f0;
  padding-bottom: 12px;
}

.trade-btn {
  background: none;
  border: none;
  padding: 8px 20px;
  font-size: 1rem;
  font-weight: 500;
  color: #4b5f73;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.2s;
}

.trade-btn.active {
  background: #1f3a5f;
  color: white;
}

.trade-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

@media (min-width: 641px) {
  .form-row {
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }
}

.form-row label {
  font-weight: 500;
  color: #1a3349;
  font-size: 0.95rem;
  min-width: 140px;
}

@media (min-width: 641px) {
  .form-row label {
    width: 160px;
  }
}

.form-row input[type="number"],
.asset-select {
  padding: 12px 16px;
  border: 1px solid #b6c9dd;
  border-radius: 30px;
  font-size: 0.95rem;
  background: white;
  width: 100%;
  transition: border-color 0.2s;
}

@media (min-width: 641px) {
  .form-row input[type="number"],
  .asset-select {
    width: 250px;
  }
}

.form-row input[type="number"]:focus,
.asset-select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* 移除number输入框的上下箭头 */
.form-row input[type="number"]::-webkit-inner-spin-button,
.form-row input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.form-row input[type="number"] {
  -moz-appearance: textfield;
}

.checkbox-row {
  margin-top: 4px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 500;
  color: #1a3349;
  font-size: 0.95rem;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.asset-row {
  align-items: center;
}

.asset-select {
  cursor: pointer;
}

.gain-display {
  background: #e8f0fe;
  border-radius: 16px;
  padding: 16px;
  margin-top: 8px;
  text-align: center;
  font-size: 1.1rem;
}

.gain-display strong {
  color: #1f3a5f;
}

.info-message {
  background: #d9e6f5;
  border-radius: 16px;
  padding: 16px;
  margin: 8px 0;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #1c3a5c;
}

.info-link {
  display: inline-block;
  margin-top: 8px;
  color: #1f4a7a;
  text-decoration: none;
  font-weight: 600;
}

.info-link:hover {
  text-decoration: underline;
}

/* Results Section */
.results-section {
  background: #f8fafd;
  border-radius: 28px;
  padding: 24px;
  border: 1px solid #dde7f0;
  margin-bottom: 32px;
}

.results-section h2 {
  font-size: 1.6rem;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 24px;
  color: #0b2b44;
}

.summary-list {
  background: white;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid #d9e2ef;
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e9eef3;
  font-size: 1rem;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-item.discount .item-value {
  color: #16a34a;
}

.summary-item.allowance .item-value {
  color: #16a34a;
}

.item-label {
  color: #4b5f73;
}

.item-value {
  font-weight: 600;
  color: #0b2b44;
}

.summary-totals {
  background: white;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #d9e2ef;
  margin-bottom: 20px;
}

.profit-after-tax {
  font-size: 1.2rem;
  color: #0b2b44;
  margin-bottom: 8px;
}

.profit-percent {
  font-size: 1.1rem;
  color: #1f3a5f;
}

.disclaimer {
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 16px;
  border-radius: 12px;
  font-size: 0.9rem;
  color: #856404;
  line-height: 1.5;
}

/* Related Tools */
.related-tools {
  margin: 32px 0 28px;
  padding: 18px 0;
  border-top: 2px solid #dde3ea;
  border-bottom: 2px solid #dde3ea;
  font-size: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.related-label {
  font-weight: 600;
  color: #0f2a40;
}

.related-tools a {
  color: #1f4a7a;
  text-decoration: none;
  margin: 0 4px;
}

.related-tools a:hover {
  text-decoration: underline;
}

.sep {
  color: #9aa9b9;
}

@media (max-width: 480px) {
  .related-tools {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .sep {
    display: none;
  }
}

/* FAQ Section */
.faq-section {
  margin-top: 28px;
  background: #f3f7fc;
  border-radius: 30px;
  padding: 28px 24px;
}

.faq-section h2 {
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 24px;
  color: #0b2b44;
}

@media (max-width: 480px) {
  .faq-section h2 {
    font-size: 1.5rem;
  }
}

.faq-item {
  background: white;
  border-radius: 24px;
  padding: 20px 24px;
  margin-bottom: 20px;
  border: 1px solid #c9d9ec;
}

.faq-item h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 12px;
  color: #1e3a5f;
}

.faq-item p {
  margin: 12px 0;
  line-height: 1.6;
  color: #253c54;
  font-size: 0.95rem;
}

.faq-item ul,
.faq-item ol {
  margin: 12px 0;
  padding-left: 24px;
}

.faq-item li {
  margin-bottom: 6px;
  line-height: 1.5;
  color: #2c405c;
  font-size: 0.95rem;
}

/* 表格样式 */
.table-wrap {
  overflow-x: auto;
  margin: 1rem 0;
  background: #f9fcff;
  border-radius: 12px;
  border: 1px solid #cbd9ec;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  min-width: 400px;
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

@media (max-width: 700px) {
  .faq-item {
    padding: 16px;
  }

  .faq-item h3 {
    font-size: 1.1rem;
  }

  .faq-item p,
  .faq-item li {
    font-size: 0.9rem;
  }
}
</style>