<template>
  <article class="blog-container">
  <!-- Back Button -->
    <div class="back-wrapper">
        <a href="/blog" class="back-btn">
         ← Back to Blog
        </a>
    </div>
    <!-- Hero -->
    <header class="hero">
      <h1>VAT vs GST vs Sales Tax: A Global Guide to Consumption Taxes</h1>
      <p class="subtitle">
        A deep comparison of global consumption taxes including thresholds,
        digital product rules, and international examples.
      </p>
    </header>

    <!-- Introduction -->
    <section class="section">
      <h2>Introduction</h2>
      <p>
        As global commerce expands — especially digital services, SaaS, and
        cross-border e-commerce — businesses increasingly face three major types
        of consumption taxes: Value Added Tax (VAT), Goods and Services Tax
        (GST), and Sales Tax.
      </p>
      <p>
        While they all tax consumption, they differ significantly in structure,
        collection methods, compliance burden, and global application.
        Understanding these differences is critical for SaaS founders,
        e-commerce businesses, and international sellers.
      </p>
    </section>

    <!-- VAT -->
    <section class="section">
      <h2>What Is VAT (Value Added Tax)?</h2>

      <p>
        VAT is a multi-stage consumption tax applied at every step of the supply
        chain based on value added. Businesses collect VAT on sales and deduct
        VAT paid on purchases, meaning only incremental value is taxed.
      </p>

      <h3>Key Characteristics</h3>
      <ul>
        <li>Multi-stage tax system</li>
        <li>Input tax credit mechanism</li>
        <li>Tax included in price</li>
        <li>Continuous supply chain taxation</li>
        <li>Used by over 160 countries globally</li>
      </ul>

      <h3>Major VAT Regions</h3>
      <table>
        <thead>
          <tr>
            <th>Region</th>
            <th>Example Countries</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Europe</td>
            <td>EU countries, UK, Norway, Switzerland</td>
          </tr>
          <tr>
            <td>Asia</td>
            <td>China, Indonesia, Vietnam</td>
          </tr>
          <tr>
            <td>Middle East</td>
            <td>UAE, Saudi Arabia</td>
          </tr>
          <tr>
            <td>Africa</td>
            <td>South Africa, Nigeria</td>
          </tr>
          <tr>
            <td>Latin America</td>
            <td>Mexico, Chile, Argentina</td>
          </tr>
        </tbody>
      </table>

      <h3>VAT Registration Threshold Examples</h3>
      <table>
        <thead>
          <tr>
            <th>Country / Region</th>
            <th>Threshold</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>EU Digital Sales</td>
            <td>€10,000 annually</td>
          </tr>
          <tr>
            <td>UK</td>
            <td>£90,000 turnover</td>
          </tr>
          <tr>
            <td>UAE</td>
            <td>AED 375,000</td>
          </tr>
          <tr>
            <td>Switzerland</td>
            <td>CHF 100,000</td>
          </tr>
        </tbody>
      </table>

      <h3>VAT and Digital Products</h3>
      <ul>
        <li>SaaS subscriptions</li>
        <li>Software downloads</li>
        <li>Streaming services</li>
        <li>Online courses</li>
        <li>Digital advertising</li>
        <li>Hosting services</li>
      </ul>
    </section>

    <!-- GST -->
    <section class="section">
      <h2>What Is GST (Goods and Services Tax)?</h2>

      <p>
        GST is a modern variation of VAT that taxes value added but is typically
        structured as a unified national tax system. It is widely used in
        Asia-Pacific economies.
      </p>

      <h3>VAT vs GST Structural Differences</h3>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>VAT</th>
            <th>GST</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Structure</td>
            <td>Regional or multi-rate</td>
            <td>Unified national system</td>
          </tr>
          <tr>
            <td>Administration</td>
            <td>Country dependent</td>
            <td>Usually centralized</td>
          </tr>
          <tr>
            <td>Complexity</td>
            <td>Higher</td>
            <td>Often simpler</td>
          </tr>
        </tbody>
      </table>

      <h3>Major GST Countries</h3>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Standard Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Australia</td>
            <td>10%</td>
          </tr>
          <tr>
            <td>New Zealand</td>
            <td>15%</td>
          </tr>
          <tr>
            <td>Canada</td>
            <td>5% federal GST</td>
          </tr>
          <tr>
            <td>Singapore</td>
            <td>9%</td>
          </tr>
          <tr>
            <td>India</td>
            <td>~18%</td>
          </tr>
        </tbody>
      </table>

      <h3>GST Registration Threshold Examples</h3>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Threshold</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Australia</td>
            <td>AUD 75,000</td>
          </tr>
          <tr>
            <td>New Zealand</td>
            <td>NZD 60,000</td>
          </tr>
          <tr>
            <td>Canada</td>
            <td>CAD 30,000</td>
          </tr>
          <tr>
            <td>Singapore</td>
            <td>SGD 1 million</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Sales Tax -->
    <section class="section">
      <h2>What Is Sales Tax?</h2>

      <p>
        Sales tax is a single-stage consumption tax applied only at the final
        retail sale to consumers. Unlike VAT or GST, it does not tax intermediate
        supply chain transactions.
      </p>

      <h3>Where Sales Tax Is Used</h3>
      <ul>
        <li>United States</li>
        <li>Some Canadian provinces</li>
        <li>Selected jurisdictions worldwide</li>
      </ul>

      <h3>US Economic Nexus Threshold Examples</h3>
      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>Threshold</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>California</td>
            <td>$500,000 sales</td>
          </tr>
          <tr>
            <td>Texas</td>
            <td>$500,000 sales</td>
          </tr>
          <tr>
            <td>New York</td>
            <td>$500,000 + 100 transactions</td>
          </tr>
          <tr>
            <td>Florida</td>
            <td>$100,000</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Comparison -->
    <section class="section">
      <h2>Core Structural Differences</h2>

      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>VAT</th>
            <th>GST</th>
            <th>Sales Tax</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tax Stage</td>
            <td>Multi-stage</td>
            <td>Multi-stage</td>
            <td>Single-stage</td>
          </tr>
          <tr>
            <td>Input Tax Credits</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Supply Chain Taxation</td>
            <td>Yes</td>
            <td>Yes</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Primary Regions</td>
            <td>Europe, Africa, LATAM</td>
            <td>Asia-Pacific</td>
            <td>United States</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Example -->
    <section class="section">
      <h2>Practical Example: SaaS Company Selling Globally</h2>

      <ul>
        <li>EU customers → VAT after €10,000 revenue</li>
        <li>Australia → GST above AUD 75,000</li>
        <li>United States → monitor state nexus thresholds</li>
      </ul>
    </section>

    <!-- Conclusion -->
    <section class="section">
      <h2>Conclusion</h2>
      <p>
        VAT, GST, and Sales Tax represent three different approaches to taxing
        consumption. VAT is globally dominant, GST is a simplified variant, and
        Sales Tax remains fragmented but widely used in the United States.
      </p>
      <p>
        For modern digital businesses, understanding these systems is essential
        for global compliance, pricing strategy, and international expansion.
      </p>
    </section>

    <!-- Calculator CTA -->
    <section class="section calculator-cta">
    <a href="/global-vat" class="calculator-btn">
    Explore Global VAT, GST & Sales Tax Calculators →
    </a>
    </section>
  </article>
</template>

<script setup>
// This component is static content but can later
// be connected to CMS or API.
</script>

<style scoped>
.blog-container {
  max-width: 900px;
  margin: auto;
  padding: 60px 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.7;
  color: #1a1a1a;
}

.hero {
  margin-bottom: 50px;
}

.hero h1 {
  font-size: 40px;
  margin-bottom: 16px;
}

.subtitle {
  font-size: 18px;
  color: #666;
}

.section {
  margin-bottom: 60px;
}

h2 {
  margin-bottom: 16px;
  font-size: 28px;
}

h3 {
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 20px;
}

ul {
  padding-left: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th,
td {
  padding: 12px;
  border: 1px solid #e5e5e5;
  text-align: left;
}

th {
  background: #f7f7f7;
}

.back-wrapper {
  margin-bottom: 20px;
}

.back-btn {
  display: inline-block;
  padding: 10px 16px;
  border-radius: 8px;
  background: #f5f5f5;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: #eaeaea;
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

@media (max-width: 768px) {
  .hero h1 {
    font-size: 28px;
  }
}
</style>