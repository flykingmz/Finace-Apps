<template>
  <div class="nft-tax-calculator">
    <!-- Header -->
    <h1 class="main-title">NFT Tax Calculator for USA, UK, Canada, and Australia</h1>
    <p class="description">
      This NFT Tax Calculator helps you estimate capital gains, profits, and potential tax liabilities from NFT transactions. The calculator supports tax calculations for users in the United States, United Kingdom, Canada, and Australia, allowing you to evaluate how buying, selling, minting, or trading NFTs may affect your crypto tax obligations.Simply enter the NFT purchase price, selling price, transaction fees, and your applicable tax rate to calculate potential gains or losses. Whether you are an NFT collector, trader, or creator, this tool provides a quick way to understand how NFT profits may be taxed in your country.
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

    <!-- Calculator Form - 附件1样式 -->
    <div class="calculator-form">
      <h2>NFT Tax Calculator</h2>

      <!-- Sale Price -->
      <div class="form-row">
        <label>Enter sale price of NFT *</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">{{ getCurrencySymbol }}</span>
            <input
              type="number"
              v-model.number="form.salePrice"
              @input="calculate"
              min="0"
              step="1000"
              placeholder="24234423"
            />
          </div>
        </div>
      </div>

      <!-- Purchase Price -->
      <div class="form-row">
        <label>Enter purchase price of NFT *</label>
        <div class="input-wrapper">
          <div class="input-with-symbol">
            <span class="currency-symbol">{{ getCurrencySymbol }}</span>
            <input
              type="number"
              v-model.number="form.purchasePrice"
              @input="calculate"
              min="0"
              step="1000"
              placeholder="423423"
            />
          </div>
        </div>
      </div>

      <!-- Profit/Loss Display -->
      <div class="result-row" v-if="profitLoss !== 0">
        <div class="profit-loss-label">Profit/Loss from the transfer of NFT</div>
        <div class="profit-loss-value" :class="{ negative: profitLoss < 0 }">
          {{ getCurrencySymbol }}{{ formatMoney(Math.abs(profitLoss)) }}
          <span v-if="profitLoss < 0"> (Loss)</span>
        </div>
      </div>

      <!-- Tax Display -->
      <div class="result-row tax-row" v-if="taxLiability > 0">
        <div class="tax-label">The tax you need to pay</div>
        <div class="tax-value">
          {{ getCurrencySymbol }}{{ formatMoney(taxLiability) }}
        </div>
      </div>
      <div class="result-row tax-row" v-else-if="profitLoss <= 0">
        <div class="tax-label">The tax you need to pay</div>
        <div class="tax-value zero-tax">No tax due (loss)</div>
      </div>

      <div class="form-actions">
        <button @click="calculate">Calculate</button>
        <button class="clear" @click="clearForm">Clear</button>
      </div>
    </div>

    <!-- Related Tools -->
    <div class="related-tools">
      <span class="related-label">Related:</span>
      <a href="/crypto-tax-calculator">Crypto Tax Calculator</a>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section">
      <h2>NFT Tax Information – FAQ</h2>

      <div class="faq-item">
        <h3>NFT Taxes in the US – The Ultimate Guide 2026</h3>
        <p>NFT taxes are here to stay after many doubts among investors on how Non-Fungible Tokens are taxed in the United States.</p>
        <p>If you're an NFT trader or an NFT creator, there are several crypto tax requirements you should follow. In this guide, we'll clarify everything from the NFT tax rate in the US to how to report NFT taxes and much more!</p>
      </div>

      <div class="faq-item">
        <h3>KEY TAKEAWAYS about NFT taxes in the US</h3>
        <ul>
          <li>Trading NFTs are taxable in the US, subject to capital gains taxes</li>
          <li>Your NFT tax rate will depend on the holding period of the crypto or NFT you had before selling, with rates ranging from 0% to 37%</li>
          <li>NFT creators are taxed differently than investors, usually subject to income tax rates</li>
          <li>You have to report your NFT gains/losses on your tax return, on Form 8949 and Schedule D, and your NFT income in Schedule 1 or Schedule C of your Income Tax Return.</li>
          <li>Crypto tax software like CoinTracking can help you import your NFT transactions, determine your gains/losses and income, and generate tax reports for you.</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>What are NFTs?</h3>
        <p>Non-Fungible Tokens (NFTs) are uniquely identified tokens (non-fungible), meaning they cannot be replicated. NFTs can be issued on several blockchain networks, with Ethereum being the most popular, while several blockchains, such as Cardano and BSC, are becoming more relevant in the NFT space. Recently, the Bitcoin network announced a protocol that enables it to issue Bitcoin-based NFTs, called Ordinals, reaching all-time high levels of activity in the network due to this launch.</p>
      </div>

      <div class="faq-item">
        <h3>Do I have to report NFTs on my tax return?</h3>
        <p>Yes, if you trade NFTs, you would have to report gains/losses in your taxes (in the right tax forms) in the US. If you trade any crypto for NFTs or vice versa, you'd need to determine the gain/loss on each trade and then report it on Form 8949 and Schedule D of Form 1040. If you're an NFT creator, you'd have to report the income you receive from your NFT sales in your US Individual Income Tax return as ordinary income. Learn more about reporting crypto taxes in the US.</p>
      </div>

      <div class="faq-item">
        <h3>NFT tax overview</h3>
        <p>NFTs are taxed similarly to cryptocurrencies, being subject to capital gains taxes if you're an investor/trader in the US. Whereas, if you're an NFT creator, you'd be taxed at an income level based on the net proceeds (total sales proceeds – costs of creation) of your NFT sales. NFTs are also reported differently depending on whether you're just trading crypto/NFTs or creating and selling them. Let's cover this in more detail.</p>
      </div>

      <div class="faq-item">
        <h3>Taxable NFT transactions</h3>
        <p>In the US, selling an NFT is a taxable event, regardless if you sell it for another NFT, a cryptocurrency, or FIAT (e.g., USD). Moreover, if you sell any of your cryptocurrency for an NFT, you'd also have a taxable event, subject to capital gains taxes. Anytime you sell any of your crypto holdings, from coins to NFTs, you're taxed in the US.</p>
      </div>

      <div class="faq-item">
        <h3>Non-taxable NFT transactions</h3>
        <p>There are a few NFT transactions that are not taxable in the US, including:</p>
        <ul>
          <li>Holding NFTs without selling them</li>
          <li>Moving NFTs between different crypto wallets (personal wallets) that you own is not a taxable event in the US</li>
          <li>Gifting NFTs to a friend or family member within the annual gift tax exemption amount</li>
          <li>Donating NFTs to a charitable organization</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>How are NFTs taxed?</h3>
        <p>Trading NFTs is a taxable event in the US, subject to capital gains taxes, with your tax rate depending on the holding period of your NFT. You can be taxed between 0% and 37%, depending on the type of tax rate, every time you sell crypto for an NFT or an NFT for cryptocurrency, another NFT, or FIAT (e.g., USD).</p>
      </div>

      <div class="faq-item">
        <h3>What if you're an NFT creator? Let's cover it in more detail.</h3>
        <p>NFT creators are taxed differently than NFT investors based on the net proceeds of their NFT creations. NFT creators should determine the total sales proceeds of their art and deduct the cost associated with their creations. Finally, NFT creators should report their net proceeds in their Income Tax Returns, alongside any other income they had during the tax year. If the NFT creator is creating and selling NFTs as a business, they will need to report their NFT sales and deduct associated expenses on Schedule C of their tax return unless they have formed a legal entity, which requires a separate tax return filing.</p>
      </div>

      <div class="faq-item">
        <h3>Taxes on minting an NFT</h3>
        <p>If you mint an NFT, you can take the cost you paid for doing the minting as your cost basis in the NFT. Minting NFT is not a taxable event in the US, but if you sell the NFT, the realized gain would be subject to capital gains tax. Also, if you pay the minting fee with a crypto, the deemed sale of crypto for NFT would be a taxable event.</p>
      </div>

      <div class="faq-item">
        <h3>Taxes on selling an NFT as a creator</h3>
        <p>As an NFT creator, you should determine the net proceeds of your NFT sales every time you sell one, deduct the costs related to its creation, and report the net proceeds as income on your tax return.</p>
      </div>

      <div class="faq-item">
        <h3>Taxes on earning royalties on NFTs</h3>
        <p>If you earn royalties on your NFTs, you should recognize the Fair Market Value (in USD) of each batch of royalties you receive, and that FMV will be added to your income for the tax year. You should then report all those FMVs in your income tax return.</p>
      </div>

      <div class="faq-item">
        <h3>NFT taxes for investors</h3>
        <p>NFT investors are taxed at the capital gains level in the US, with rates ranging from 0% to 37%, depending on their holding period.</p>
      </div>

      <div class="faq-item">
        <h3>Taxes on buying an NFT with FIAT</h3>
        <p>If you're buying an NFT with FIAT (e.g., USD), you won't be taxed on that transaction, but that will become your cost basis for when you sell it. Buying crypto or NFTs with FIAT (e.g., USD) are not taxable events in the US.</p>
      </div>

      <div class="faq-item">
        <h3>Taxes on selling an NFT</h3>
        <p>Every time you sell an NFT for another NFT, cryptocurrency, or FIAT (e.g., USD), you'd get taxed at a capital gains level, with tax rates ranging from 0% to 37%. If you sell any crypto for an NFT, you'd also have to report its gain/loss in your taxes.</p>
      </div>

      <div class="faq-item">
        <h3>NFT taxes on airdrops</h3>
        <p>If you win an NFT from an airdrop, you'd need to recognize its Fair Market Value (in USD) at the time you received it. When you report your NFT taxes, you'd have to include that FMV (in USD) in your income tax return alongside other income you have (crypto and non-crypto).</p>
      </div>

      <div class="faq-item">
        <h3>Paying tax on donating NFTs</h3>
        <p>When you donate crypto or NFTs to a charitable organization, you don't need to pay taxes, and you can even take a tax deduction based on the FMV of the NFT you donated if you have held the NFT for more than 12 months. Otherwise, you can only deduct your cost basis from the donation. You can take a tax deduction for donating your NFT to a charitable organization in the US if you claim an itemized deduction in your tax return.</p>
      </div>

      <div class="faq-item">
        <h3>How to pay tax on NFTs in play-to-earn games?</h3>
        <p>If you earn NFTs as a reward from play-to-earn games, you'd have to report the Fair Market Value (in USD) of each NFT at the time you received it. Every time you receive any NFT as a reward from Web3-based games, you need to determine their FMV. All the NFT income from play-to-earn games has to be reported in your Income Tax return at the end of the tax year.</p>
      </div>

      <div class="faq-item">
        <h3>How are NFT gas fees taxed?</h3>
        <p>NFT gas fees related to the purchase or sale of NFTs can be deducted from your total NFT gains as an investor, reducing your total capital gains and effectively lowering your NFT taxes. Gas fees related to the transfer of NFTs are not deductible for individual investors. NFT gas fees can also help lower your taxable income if you're an NFT creator, as you can deduct those fees from your total sales proceeds.</p>
      </div>

      <div class="faq-item">
        <h3>Tax on worthless NFTs & treatment of losses</h3>
        <p>If the NFTs were bought or minted and now they become worthless, you can take a worthless loss deduction, and the loss can be used to offset your taxable capital gain.</p>
      </div>

      <div class="faq-item">
        <h3>How to report NFTs on taxes?</h3>
        <p>In the US, you have to report your NFT transactions on your tax return in different tax forms depending on if you are an investor or creator. In either case, you need to track your NFT transactions, and the easiest way to do so is with crypto tax software like CoinTracking. In particular, our NFT Center is your go-to hub for NFTs. Let's cover NFT taxation reporting in more detail.</p>
      </div>

      <div class="faq-item">
        <h3>For NFT Investors</h3>
        <p>NFT investors have to determine their NFT gains/losses on each trade and report their gains/losses on the right tax forms. NFTs are taxed and reported similarly to cryptocurrencies in the US. NFT capital gains taxes for investors should be reported on Schedule D of Form 1040 and Form 8949.</p>
      </div>

      <div class="faq-item">
        <h3>For professional & hobby NFT creators</h3>
        <p>NFT creators, regardless of whether they create NFTs professionally or as a hobby, need to report their income from NFT sales. After determining the net proceeds for each NFT sale (total sales proceeds minus costs of creation), NFT creators need to include that income in their Income Tax Return (Form 1040). If you are creating NFTs as a hobby, you should report your NFT income as miscellaneous income on Schedule 1 of your Form 1040. Professional NFT creators will need to report their NFT income and expenses on Schedule C and pay self-employment tax on their net income if they are running their NFT business as a sole proprietor or single-member LLC.</p>
      </div>

      <div class="faq-item">
        <h3>How to reduce NFT taxes?</h3>
        <p>Here's how to legally reduce NFTs taxes in the US if you are an NFT investor:</p>
        <p><strong>Track your NFTs and hold them for over 12 months</strong> – Holding your NFTs for over 12 months before selling them for other NFTs, crypto, or FIAT will enable you to get a long-term capital gains tax rate on your gains, ranging from 0% to 20%.</p>
        <p><strong>Donate your NFTs</strong> – Donating NFTs to a charitable organization can reduce your taxes by claiming an itemized tax deduction, effectively lowering your other capital gains.</p>
        <p><strong>Move to a NFT tax-free country</strong> – Several crypto-tax-free countries don't tax cryptocurrency investors (including NFTs). Here are some NFT tax-friendly countries: Portugal, Germany, Puerto Rico, Cayman Islands, UAE.</p>
        <p><strong>Use a Tax calculator for NFT taxes</strong> – Using a tax calculator like CoinTracking for your NFT taxes is the easiest way to track if you're eligible for a long-term capital gain tax rate and to make sure you're compliant with all the tax rules.</p>
      </div>

      <div class="faq-item">
        <h3>Do I pay sales tax when buying NFTs?</h3>
        <p>Some NFT providers in the US may charge sales taxes on NFTs, increasing the total price of the NFT for buyers.</p>
      </div>

      <div class="faq-item">
        <h3>How to easily calculate NFT taxes</h3>
        <p>You can easily calculate your NFT taxes with the help of a crypto tax software that can:</p>
        <ul>
          <li>Import your NFT trades from different crypto wallets and networks. For example, with CoinTracking, you can paste your Ethereum address and import your NFT transactions.</li>
          <li>Determine the gains/losses on each NFT trade (NFTs to NFTs, NFTs to crypto and vice versa, and NFTs to FIAT)</li>
          <li>Generating the right tax forms to declare your NFT gains and income.</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>Crypto Taxes Canada: The Ultimate Guide for 2026</h3>
        <p>Crypto is subject to taxes in Canada, with investors having to pay federal income taxes over their crypto gains and income! Discover how Canada taxes crypto, how to get a 50% discount on your capital gains, how to report Canadian crypto taxes, tax forms to file, and more!</p>
      </div>

      <div class="faq-item">
        <h3>Key Takeaways about crypto taxes in Canada:</h3>
        <ul>
          <li>Cryptocurrency is classified as property in Canada and subject to taxes.</li>
          <li>Gains from crypto are subject to federal income taxes for individuals.</li>
          <li>Businesses will pay business income taxes over their gains from crypto trading.</li>
          <li>There are tax benefits for individuals in Canada, with the CRA only taxing 50% of capital gains.</li>
          <li>You must file your crypto taxes in Canada each year in the right tax forms, including the Schedule 3 form.</li>
          <li>CoinTracking is the easiest way to track trades, determine crypto gains, and generate forms to file crypto taxes.</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>Are Cryptocurrencies Taxed in Canada?</h3>
        <p>Cryptocurrency trading in Canada is taxed at a federal income tax level. As an individual, gains from trading or spending crypto fall under income taxes. If you are running a business and dealing with cryptocurrencies, you'll have to pay business taxes for your crypto activity.</p>
      </div>

      <div class="faq-item">
        <h3>How is Cryptocurrency Taxed in Canada?</h3>
        <p>Cryptocurrency taxes in Canada range from income taxes to business taxes, depending on your crypto activity. Here's how each type of tax works for cryptocurrencies in Canada:</p>
        <p><strong>Capital Gains Tax:</strong> If your crypto trading generates a gain, you'll need to pay capital gains tax, with the tax rate depending on your federal income bracket. However, individual investors can benefit from a 50% discount on their gains in Canada.</p>
        <p><strong>Income Tax:</strong> In Canada, cryptocurrency trading is taxed according to your federal income bracket. Transactions like trading or spending crypto to buy a product/service will fall under income taxes. In both cases, you'll need to determine the gain on that transaction.</p>
        <p><strong>Business Income vs. Capital Gain for Cryptocurrency Taxes:</strong> Businesses are taxed under business income taxes over 100% of their cryptocurrency gains, while individuals get a 50% tax break.</p>
      </div>

      <div class="faq-item">
        <h3>Crypto Tax Rates in Canada for 2026</h3>
        <p>Here are the crypto tax rates for the fiscal year of 2025/6 in Canada:</p>
        <p><strong>Overview of Crypto Tax Rates</strong><br>
        Tax bracket (based on taxable income in CAD) – Crypto tax rate<br>
        Up to $55,867 – 15%<br>
        $55,867 – $111,733 – 20.5%<br>
        $111,733 – $173,205 – 26%<br>
        $173,205 – $246,752 – 29%<br>
        Over $246,752 – 33%</p>
        <p><strong>Capital Gains Tax Rates:</strong> In Canada, the capital gains tax rates will be the same as the federal income tax brackets since cryptocurrency is treated as property. However, investors can benefit from a 50% discount on their taxable gains in Canada. For example, if you have a gain of $5,000 in a trade, you'll only get taxed on $2,500.</p>
        <p><strong>Income Tax Brackets:</strong> Here are the federal income tax brackets that apply to cryptocurrencies in 2026:<br>
        Up to $55,867 – 15%<br>
        $55,867 – $111,733 – 20.5%<br>
        $111,733 – $173,205 – 26%<br>
        $173,205 – $246,752 – 29%<br>
        Over $246,752 – 33%</p>
      </div>

      <div class="faq-item">
        <h3>How to Calculate Gains on Cryptocurrency in Canada</h3>
        <p><strong>Calculating Capital Gains:</strong> Investors need to calculate capital gains on transactions when they dispose of cryptocurrencies in Canada. These types of taxable transactions include:</p>
        <ul>
          <li>Crypto transactions (crypto-to-FIAT and crypto-to-crypto trades)</li>
          <li>Spending crypto to buy a product/service</li>
          <li>Gifting cryptocurrencies</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>What crypto transactions are tax free in Canada?</h3>
        <p>Many crypto transactions are tax free in Canada, including:</p>
        <ol>
          <li>Holding crypto without triggering any sale</li>
          <li>Transferring crypto between personal wallets</li>
          <li>Buying crypto with FIAT (e.g., CAD)</li>
          <li>Receiving a crypto gift</li>
        </ol>
      </div>

      <div class="faq-item">
        <h3>Specific Crypto Transactions and Their Tax Implications</h3>
        <p><strong>Crypto-to-CAD:</strong> When you sell a cryptocurrency for a FIAT currency like CAD, you trigger a tax event. You need to determine the gain on the transaction and pay capital gains taxes (based on your total income for that year).</p>
        <p><strong>Buy and HODL:</strong> Buying cryptocurrencies with FIAT in Canada is a tax-free event since you're only buying the asset. Holding cryptocurrency without triggering any sale/gift/expenditure of that cryptocurrency is a tax-free event.</p>
        <p><strong>Crypto-to-Crypto Trades:</strong> Trading a cryptocurrency for another cryptocurrency is a taxable event in Canada, where you must determine the gain on that transaction and pay income taxes over it.</p>
      </div>

      <div class="faq-item">
        <h3>Tax on Various Crypto Activities</h3>
        <p>In Canada, many crypto transactions are taxed, according to the CRA. Here's how different crypto trades, from airdrops to staking, are taxed in Canada:</p>
        <p><strong>Staking:</strong> As an individual investor, crypto staking rewards are taxed when you receive and sell them. When you receive staking rewards, you need to determine the Fair Market Value (in CAD) at that moment and add it to your income. This FMV is taxed according to your federal income tax rate. When you sell your staking rewards for FIAT or another cryptocurrency, you have to determine the gain on that transaction and be taxed over capital gains taxes. Your cost basis on this trade is the FMV of your staking rewards. The tax rate on the gain will depend on your federal income tax bracket.</p>
        <p><strong>Mining:</strong> As an individual investor, mining rewards are not taxed when you receive them but only when you sell them as capital gains. Your total sales proceeds (i.e., the sale of the mining rewards) will be the gain from that trade, taxed according to your federal income tax bracket.</p>
        <p><strong>Lending:</strong> Unlike crypto mining, receiving interest from lending crypto in a protocol is taxed when you receive that interest (e.g., coins), according to your income taxes in Canada.</p>
        <p><strong>Airdrops and Forks:</strong> The CRA has not published any formal guidelines for the taxation of airdrop, but the conservative approach is to assume that you're due income taxes when receiving new tokens from an airdrop and pay capital gains when you sell those tokens.</p>
        <p><strong>Lost or Stolen Crypto:</strong> In Canada, investors can deduct losses from stolen personal property, with crypto falling under that definition.</p>
      </div>

      <div class="faq-item">
        <h3>NFT Taxes in Australia 2026: The Best NFT Tax Guide</h3>
        <p>NFT taxes in Australia are a legal reality, with capital gains and income taxes looking over your shoulder! But, don't worry! Our guide covers everything you need to know to stay compliant with your NFT taxes. Discover how to track your NFT gains and income, which taxes you need to pay, and how to report your NFT taxes in Australia in 2026. Let's go!</p>
      </div>

      <div class="faq-item">
        <h3>KEY TAKEAWAYS about NFT Taxes in Australia</h3>
        <ul>
          <li>Trading NFTs for other NFTs or cryptocurrencies is a taxable event in Australia and is subject to capital gains tax;</li>
          <li>Earning NFTs, creating NFTs as an artist, or earning any form of NFT-derived income will be taxed under your income tax bracket in Australia;</li>
          <li>Creating, selling, or trading NFTs as a business falls under business taxation rules;</li>
          <li>According to the ATO, you're required to keep track of your NFT trades with key information (e.g., sales proceeds, gains/losses, income, etc);</li>
          <li>The easiest way to keep track of this data is to use a crypto portfolio tracker and tax tool like CoinTracking that natively supports Australian investors.</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>What are NFTs?</h3>
        <p>Non-Fungible Tokens (NFTs) are unique digital tokens, usually representing an asset, art piece, collectible, token, or any other digitally stored asset on the blockchain.</p>
      </div>

      <div class="faq-item">
        <h3>Are NFTs Taxable in Australia?</h3>
        <p>Yes, NFTs are taxable in Australia, following the same rules as cryptocurrencies in general, with investors facing capital gains and income tax rates. As a general rule, trading/selling NFTs are treated as capital gains taxes, while earning income from creating and selling NFTs or from secondary sales will fall under income taxes.</p>
      </div>

      <div class="faq-item">
        <h3>How Much Tax Do You Pay on NFTs in Australia?</h3>
        <p>NFTs can be subject to different types of taxes (capital gains vs income), but the tax rate will always depend on the income tax bracket of individual investors. In Australia, income tax rates can go as high as 45%. Let's cover the differences:</p>
        <p><strong>Income Tax Rate:</strong> Creating and selling NFTs or earning any type of income from NFTs (e.g., secondary sales) will be taxed under income taxes in Australia. In other words, any income will be added to your total income for the tax year and the tax rate you'll pay depends on your income bracket.</p>
        <p>The ordinary income tax brackets in Australia in 2026 are as follows:<br>
        $0 to $18,200 – 0%<br>
        $18,201 to $45,000 – 16%<br>
        $45,001 to $135,000 – 30%<br>
        $135,001 to $190,000 – 37%<br>
        $190,001+ – 45%</p>
        <p><strong>Capital Gains Rate:</strong> Gains from trading NFTs (e.g., selling NFTs for FIAT or other cryptocurrencies) are subject to capital gains tax in Australia. These gains from NFT activities are added to your taxable income and your tax rate depends on your total income for the year. However, you can reduce these taxes in Australia if you hold your NFTs for over one year, with only 50% of your gains counting as taxable income.</p>
      </div>

      <div class="faq-item">
        <h3>What Records Should You Keep of Your NFT Transactions?</h3>
        <p>The ATO requires NFT investors to keep accurate and detailed information about their crypto/NFT activities. To stay compliant, you should track key details such as:</p>
        <ul>
          <li>Sales proceeds</li>
          <li>Cost basis (Fair Market Value at purchase)</li>
          <li>Earned income</li>
          <li>Capital gains/losses</li>
          <li>Date of acquisition</li>
          <li>Date of sale</li>
          <li>Type of asset and purpose (identification)</li>
          <li>Trade info (wallet)</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>How to Report NFT Taxes to the ATO in Australia?</h3>
        <p>Any income and gains from NFTs must be reported to the Australian Taxation Office (ATO), either online or via paper forms using the appropriate tax return sections. However, before filling your taxes, you need to accurately determine the gains/losses and income from your NFT activities. Here's what you need to know to enjoy a smooth process:</p>
        <p><strong>Should You File Taxes Manually or Automatically?</strong> The easiest way to track your gains/losses and income from NFT activities is by using an Australian-compliant crypto tax calculator that automates the entire process and helps you to generate compliant tax reports.</p>
      </div>

      <div class="faq-item">
        <h3>How Do You Save Money on NFT Taxes in Australia?</h3>
        <p>There are several effective strategies for crypto investors to optimize their NFT taxes in Australia. Let's cover the main ways you can reduce NFT taxes:</p>
        <p><strong>Hold Your NFTs for the Long-Run:</strong> In Australia, if you hold your NFTs for over one year before selling them, you qualify for a 50% discount on your gains. In other words, only half of your NFTs gains will be going towards your taxable income (affecting your income bracket and tax rate).</p>
        <p><strong>Buy NFTs with FIAT Currency:</strong> In Australia, buying NFTs with FIAT currency (e.g., Australian Dollars) is not a taxable event, thus you don't have to pay capital gains taxes.</p>
        <p><strong>Dispose of Your NFTs in a Low-Income Year:</strong> If possible, consider selling your NFTs in a low income year, because those gains are added to your taxable income, and, if in one particular year, your total taxable income is low, you'll likely fall under a lower income bracket and you'll pay less tax on your total NFT gains.</p>
        <p><strong>Offset Gains with NFT Losses:</strong> If you've incurred losses from trading NFTs,but have gains from other crypto activities, you can reduce those gains with the NFT losses and pay less capital gains taxes.</p>
        <p><strong>Account for Transaction Fees:</strong> When trading (selling) NFTs, it's important to include any transaction or exchange fees in your cost basis, thus reducing your NFT gains and paying less taxes.</p>
      </div>

      <div class="faq-item">
        <h3>Special Cases for the NFT Tax in Australia</h3>
        <p>NFT taxes follow the same rules as crypto taxes in Australia. However, some NFT-related transactions can be more complex to evaluate. In either case, let's cover how you can handle taxes for the most common NFT operations:</p>
        <p><strong>NFT Taxes for Creators:</strong> People creating and selling NFTs (without running a business) will have to determine the income (Fair Market Value) of each NFT sold and declare that total amount in their taxes. Here's how it works:</p>
        <p><strong>Taxes on Selling an NFT:</strong> Let's see how you can determine your income from creating and selling an NFT: In March 2024, John sold 1 NFT for 1 ETH (worth AUD 4K) at the time. As a result, he reported, in March 2024, income of AUD 4K (an invoice for that sale).</p>
        <p><strong>Taxes on Earning Royalties on NFTs:</strong> Creators can also gain income from secondary sales (similar to royalties). Here's how to calculate your NFT taxes: In July 2024, John received 0.1 ETH because of a secondary sale. At that time, 1 ETH is worth AUD 3K, so he reports an income for that royalty of AUD 300 (0.1 ETH *AUD 3K).</p>
        <p><strong>NFT Taxes for Investors:</strong> Trading NFTs for other cryptocurrencies or selling them for FIAT will result in a taxable event in Australia. Here's how NFT taxes work for investors:</p>
        <p><strong>Taxes on Buying an NFT:</strong> When investors buy an NFT with FIAT, there's no taxable event in Australia. However, when buying an NFT with another cryptocurrency, it is treated as a crypto-to-crypto trade, which is taxable. Let's see how to calculate this case in the next section.</p>
        <p><strong>Taxes on Selling an NFT:</strong> Selling a NFT for a cryptocurrency or FIAT is a taxable event in Australia. Buying an NFT with crypto (the same as selling a cryptocurrency for an NFT) is also a taxable event. Here's a simulation: In August 2024, John bought NFTs for 10 ETH, when 1 ETH was worth AUD 3K. John's cost base is AUD 30K. In September 2021, John sold those NFTs for 30 ETH when 1 ETH was worth AUD 3.5K. This results in total sales proceeds of AUD 105K. The capital gains on the NFT sale are AUD 75K (AUD 105K - AUD 30K).</p>
      </div>

      <div class="faq-item">
        <h3>Crypto Taxes UK: The Ultimate Guide 2026 [HMRC Rules]</h3>
        <p>The world of cryptocurrencies is ever-evolving, and with it comes the need for clarity on taxation. As the UK government and HMRC adapt to the digital currency landscape, understanding your tax obligations is crucial. This guide provides an in-depth look at crypto taxation in the UK for 2026.</p>
      </div>

      <div class="faq-item">
        <h3>Key Takeaways about crypto taxes in the UK:</h3>
        <ul>
          <li>Cryptocurrencies are taxable in the UK, falling under either Capital Gains Tax or Income Tax.</li>
          <li>The Capital Gains Tax allowance for 2023/24 was £6,000. For the tax year 2024/25 the allowance has been reduced to £3,000. This is halved for trusts.</li>
          <li>HMRC has the capability to track cryptocurrency transactions and has data-sharing agreements with all UK exchanges.</li>
          <li>Activities like trading, mining, staking, and participating in DeFi can trigger income tax obligations.</li>
          <li>Derivative trades are always income tax.</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>Understanding Crypto Taxation in the UK</h3>
        <p>Cryptocurrencies have firmly established themselves in the financial landscape, and the UK's HMRC has been proactive in setting guidelines for their taxation. Whether you're trading, investing, or merely dabbling in the crypto space, it's vital to be aware of your tax obligations.</p>
      </div>

      <div class="faq-item">
        <h3>Taxable Events on Cryptocurrencies</h3>
        <p>A taxable event in the realm of cryptocurrencies refers to a specific action or transaction that triggers a tax obligation. Key taxable events include:</p>
        <ul>
          <li>Selling crypto for fiat currency.</li>
          <li>Trading one cryptocurrency for another.</li>
          <li>Spending crypto on goods or services.</li>
          <li>Gifting cryptocurrency (except to your spouse).</li>
          <li>Mining and receiving crypto through airdrops.</li>
          <li>Participating in hard forks.</li>
          <li>"Burning" digital assets</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>Cost Basis and Valuation</h3>
        <p>Understanding the cost basis is crucial for determining the taxable amount. In the UK, specific cost basis methods for crypto include:</p>
        <ul>
          <li><strong>Same-Day Rule:</strong> If you purchase and sell the same cryptocurrency within the same day, the cost basis used for calculating gains or losses is determined by the value of the assets on that particular day. If you have conducted numerous purchases at varying prices on the same day, the cost basis is determined by calculating the average acquisition cost.</li>
          <li><strong>Bed and Breakfasting Rule:</strong> If you sell tokens and buy them back within 30 days, the cost basis for Capital Gains Tax will be the cost of acquiring the tokens within that 30-day window.</li>
          <li><strong>Section 104 Rule:</strong> If neither of the above rules applies, then the average cost of all the tokens you own is used.</li>
        </ul>
        <p>It's also worth noting that transferring crypto between personal wallets or exchanges is tax-free. However, the associated transfer fees might complicate the tax situation.</p>
      </div>

      <div class="faq-item">
        <h3>Crypto Tax Rates and Allowances</h3>
        <p>As the cryptocurrency market matures, the UK's HMRC has established clear guidelines on tax rates and allowances for crypto transactions. Whether you're a seasoned trader or a casual investor, understanding these rates and allowances can help you navigate the complex world of crypto taxation.</p>
        <p><strong>Crypto Capital Gains Tax UK:</strong> Capital Gains Tax (CGT) is levied on the profit made from selling an asset that has increased in value. In the context of cryptocurrencies:</p>
        <ul>
          <li>Profits from disposing crypto are subject to CGT.</li>
          <li>You will be required to pay Capital Gains Tax on the portion that exceeds the tax-free allowance.</li>
          <li>The specific rate of CGT you'll pay depends on the total amount of your capital gains. The tax rate is either 10% (basic rate taxpayer) or 20% (higher rate taxpayer).</li>
          <li>You are a basic rate taxpayer if you earn up to £50,270. If you earn more than this amount you are considered a higher rate taxpayer. Here is an example: If your gains push you over the basic rate threshold then the gains in excess of this will be taxed at the higher rate. For example, if you earn £40,270 through your job and make a £20,000 taxable gain then the first £10,000 (up to £50,270) will be taxed at 10%, with the remaining £10,000 taxed at 20%.</li>
        </ul>
        <p><strong>Crypto Income Tax UK:</strong></p>
        <ul>
          <li>If your crypto activities are more in line with trading or receiving income rather than investing, HMRC might consider your gains as income, subjecting them to Income Tax instead.</li>
          <li>Rewards from mining or DeFi activities as well as receiving airdrops are subject to income tax.</li>
          <li>Derivative trading of crypto assets are generally taxed as income.</li>
          <li>The income tax rates are as follows:<br>
          Personal Allowance – Up to £12,570 – 0%<br>
          Basic rate – £12,571 to £50,270 – 20%<br>
          Higher rate – £50,271 to £125,140 – 40%<br>
          Additional rate – Over £125,140 – 45%</li>
        </ul>
        <p>Current UK income tax rates for 2024/25 (source gov.uk). However, Income tax bands are different if you live in Scotland (https://www.gov.uk/scottish-income-tax).</p>
        <p><strong>Short-Term and Long-Term Capital Gains:</strong> The duration you hold a cryptocurrency doesn't influence the tax you owe:</p>
        <ul>
          <li><strong>Short-Term Capital Gains:</strong> These are gains on assets held for a short period, typically less than a year. In the UK, there isn't a separate tax rate for short-term gains; they are taxed at the same rate as long-term gains. However, frequent trading can lead HMRC to classify your activities as trading, which might subject your gains to Income Tax.</li>
          <li><strong>Long-Term Capital Gains:</strong> These are gains on assets held for more than a year. While the holding duration doesn't change the CGT rate in the UK, it can provide benefits like reducing the likelihood of your activities being classified as trading.</li>
        </ul>
        <p><strong>Annual Tax-Free Allowance:</strong> Every individual in the UK has an annual tax-free allowance for capital gains:</p>
        <ul>
          <li>For the tax year 2022/2023, the tax-free allowance was £12,300.</li>
          <li>For the tax year 2023/2024, the government announced a reduction in the Capital Gains Tax allowance to £6,000.</li>
          <li>For the tax year 2024/2025, the tax-free allowance is £3,000.</li>
        </ul>
      </div>

      <div class="faq-item">
        <h3>Calculating Crypto Gains and Losses</h3>
        <p>One of the most crucial aspects of crypto taxation is calculating gains and losses. This section will guide you through the process and provide clarity on the methods used.</p>
        <p>The basic formula to calculate gains or losses from a crypto transaction is:</p>
        <p><strong>Gain/Loss = Selling Price – Acquisition Cost</strong></p>
        <ul>
          <li><strong>Selling Price:</strong> The amount you receive when you sell your cryptocurrency.</li>
          <li><strong>Acquisition Cost:</strong> The amount you initially paid to acquire the cryptocurrency, including any associated fees.</li>
        </ul>
        <p><strong>Comparative Example:</strong></p>
        <p>Scenario A: You bought 1 Bitcoin for £5,000 in January and sold it in June for £8,000. Gain = £8,000 (Selling Price) – £5,000 (Acquisition Cost) = £3,000</p>
        <p>Scenario B: You bought 1 Bitcoin for £9,000 in July and sold it in December for £7,000. Loss = £7,000 (Selling Price) – £9,000 (Acquisition Cost) = -£2,000</p>
        <p>In Scenario A, you have a gain of £3,000, while in Scenario B, you have a loss of £2,000.</p>
      </div>

      <div class="faq-item">
        <h3>Reporting Cryptocurrencies on Tax Returns</h3>
        <p>In the UK, HMRC has provided guidelines on how individuals should report their crypto transactions on tax returns. Any cryptocurrency investor who has earned over £1,000 in crypto income or realized more than £6,000 (2023/2024) or £3,000 (2024/2025) in crypto capital gains is required to file a Self Assessment Tax Return with HMRC.</p>
        <p><strong>How to Report Crypto Taxes to HMRC:</strong></p>
        <ol>
          <li><strong>Self Assessment Tax Return:</strong> If you've made gains or incurred losses from your crypto transactions, you'll need to report them using the Self Assessment tax return. We recommend doing this online through the Government Gateway service.</li>
          <li><strong>Capital gains and losses:</strong> Include details of your crypto transactions using the supplementary form SA108.</li>
          <li><strong>Crypto income:</strong> If you've received income from crypto, such as from mining or staking, report it in the supplementary pages using form SA100.</li>
          <li><strong>Record Keeping:</strong> Ensure you maintain detailed records of all your crypto transactions. This includes dates, amounts, the type of cryptocurrency, the purpose of the transaction and wallet addresses. HMRC can request these records, so it's essential to keep them for at least five years after the submission date of the tax return.</li>
        </ol>
        <p><strong>When Do You Need to Report Your Crypto Taxes?</strong></p>
        <ol>
          <li><strong>Annual Reporting:</strong> You should report your crypto transactions annually, in line with the UK's tax year, which runs from 6th April to 5th April the following year. Regarding online tax returns, the deadline is the 31st of January following the conclusion of the tax year. Therefore, if the tax year concludes on the 5th of April 2023, online tax returns should be submitted by the 31st of January 2024.</li>
          <li><strong>Thresholds:</strong> If you make a taxable gain (over £6,000 for 2024 or £3,000 for 2025) then you must file a tax return and report it. However, if you already filed a tax return you must also report if your total proceeds exceed £50,000, even if you have no tax to pay.</li>
          <li><strong>Losses:</strong> If you've incurred losses, it's beneficial to report them as they can be offset against other gains, potentially reducing your tax liability.</li>
        </ol>
      </div>
    </div>

     <!-- Calculator CTA -->
    <section class="section calculator-cta">
    <a href="/do-you-pay-tax-on-nfts-5-things-every-investor-must-know-blog" class="calculator-btn">
    Do You Pay Tax on NFTs? 5 Things Every Investor Must Know →
    </a>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NFTTaxCalculator',
  data() {
    return {
      countries: [
        { code: 'us', name: 'USA' },
        { code: 'uk', name: 'UK' },
        { code: 'ca', name: 'Canada' },
        { code: 'au', name: 'Australia' }
      ],
      selectedCountry: 'us',
      form: {
        salePrice: 0,
        purchasePrice: 0
      },
      profitLoss: 0,
      taxLiability: 0
    };
  },
  computed: {
    getCurrencySymbol() {
      const symbols = {
        us: '$',
        uk: '£',
        ca: 'C$',
        au: 'A$'
      };
      return symbols[this.selectedCountry] || '$';
    },

    getTaxRate() {
      // 不同国家的税率模型
      const rates = {
        us: 0.30, // 30% capital gains (简化模型)
        uk: 0.20, // 20% capital gains (简化模型)
        ca: 0.25, // 25% capital gains (简化模型)
        au: 0.30  // 30% capital gains (简化模型)
      };
      return rates[this.selectedCountry] || 0.30;
    },

    getTaxFreeAllowance() {
      const allowances = {
        us: 0, // 美国无免税额度（简化）
        uk: 3000, // 英国 £3,000
        ca: 0, // 加拿大无免税额度（简化）
        au: 0 // 澳大利亚无免税额度（简化）
      };
      return allowances[this.selectedCountry] || 0;
    },

    getCapitalGainsDiscount() {
      // 加拿大的50%折扣
      if (this.selectedCountry === 'ca') return 0.5;
      return 1;
    },

    getHoldingPeriodDiscount() {
      // 澳大利亚的长期持有折扣（假设持有超过1年）
      if (this.selectedCountry === 'au') return 0.5;
      return 1;
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
      desc.content = 'Use this NFT Tax Calculator to estimate capital gains and taxes from NFT trades in the USA, UK, Canada, and Australia. Calculate NFT profits, losses, minting costs, and crypto tax liabilities from buying, selling, or trading NFTs with accurate country-specific tax rules.'
      
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
      // 计算利润/亏损
      this.profitLoss = this.form.salePrice - this.form.purchasePrice;
      
      // 计算应税利润
      let taxableProfit = Math.max(0, this.profitLoss);
      
      // 应用免税额度
      taxableProfit = Math.max(0, taxableProfit - this.getTaxFreeAllowance);
      
      // 应用加拿大50%折扣
      taxableProfit = taxableProfit * this.getCapitalGainsDiscount;
      
      // 应用澳大利亚长期持有折扣
      taxableProfit = taxableProfit * this.getHoldingPeriodDiscount;
      
      // 计算税额
      this.taxLiability = taxableProfit * this.getTaxRate;
    },

    clearForm() {
      this.form = {
        salePrice: 0,
        purchasePrice: 0
      };
      this.profitLoss = 0;
      this.taxLiability = 0;
    },

    formatMoney(value) {
      if (value === undefined || value === null || isNaN(value)) return '0';
      return Math.round(value).toLocaleString('en-US');
    }
  },
  mounted() {
    document.title = 'NFT Tax Calculator (USA, UK, Canada & Australia) – Calculate NFT Capital Gains and Crypto Taxes'
    // 2. 设置关键meta标签（Google最关注的）
    this.setGoogleMetaTags()
    this.calculate();
  },
  watch: {
    selectedCountry: {
      handler: 'calculate'
    },
    form: {
      handler: 'calculate',
      deep: true
    }
  }
};
</script>

<style scoped>
/* 移动端优先的样式设计 */
.nft-tax-calculator {
  max-width: 900px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 32px;
  box-shadow: 0 20px 40px -10px rgba(0, 34, 68, 0.15);
  padding: 28px 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #11212e;
}

@media (max-width: 480px) {
  .nft-tax-calculator {
    padding: 20px 16px;
    border-radius: 24px;
  }
}

.main-title {
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #0b2b44;
  letter-spacing: -0.02em;
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2rem;
  }
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

@media (max-width: 480px) {
  .description {
    font-size: 0.95rem;
    padding: 16px;
  }
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
    min-width: 60px;
  }
}

.calculator-form {
  background: #f2f6fb;
  border-radius: 28px;
  padding: 28px 24px;
  border: 1px solid #cdddee;
  margin-bottom: 32px;
}

.calculator-form h2 {
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 24px;
  color: #0b2b44;
}

@media (max-width: 480px) {
  .calculator-form h2 {
    font-size: 1.5rem;
  }
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
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
  font-size: 1rem;
  min-width: 200px;
}

@media (min-width: 641px) {
  .form-row label {
    width: 220px;
  }
}

.input-wrapper {
  flex: 1;
  width: 100%;
}

.input-with-symbol {
  display: flex;
  align-items: center;
  gap: 4px;
  background: white;
  border: 1px solid #b6c9dd;
  border-radius: 30px;
  padding: 0 12px;
  height: 44px;
  transition: border-color 0.2s;
}

.input-with-symbol:focus-within {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.currency-symbol {
  font-weight: 500;
  color: #1a3349;
  font-size: 1rem;
  white-space: nowrap;
}

.input-with-symbol input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 0.95rem;
  padding: 8px 0;
  min-width: 0;
  width: 100%;
}

.input-with-symbol input:focus {
  outline: none;
}

/* 移除number输入框的上下箭头 */
.input-with-symbol input[type="number"]::-webkit-inner-spin-button,
.input-with-symbol input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-with-symbol input[type="number"] {
  -moz-appearance: textfield;
}

.result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 16px;
  margin-bottom: 16px;
  border: 1px solid #d9e2ef;
}

.profit-loss-label,
.tax-label {
  font-weight: 500;
  color: #1a3349;
  font-size: 1rem;
}

.profit-loss-value {
  font-weight: 600;
  color: #16a34a;
  font-size: 1.3rem;
}

.profit-loss-value.negative {
  color: #dc2626;
}

.tax-value {
  font-weight: 600;
  color: #1f3a5f;
  font-size: 1.3rem;
}

.tax-value.zero-tax {
  color: #16a34a;
  font-size: 1rem;
}

.tax-row {
  background: #e8f0fe;
  border: 2px solid #1f3a5f;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
}

button {
  background: #1f3a5f;
  border: none;
  color: white;
  padding: 12px 28px;
  border-radius: 40px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.15s;
  border: 1px solid #1f3a5f;
  flex: 1;
  min-width: 120px;
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

@media (max-width: 480px) {
  .form-actions {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
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
  margin: 8px 0;
  line-height: 1.6;
  color: #253c54;
  font-size: 0.95rem;
}

.faq-item ul,
.faq-item ol {
  margin: 8px 0;
  padding-left: 24px;
}

.faq-item li {
  margin-bottom: 4px;
  line-height: 1.6;
  color: #253c54;
  font-size: 0.95rem;
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
