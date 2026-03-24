<template>
  <article class="blog-container">
    <!-- Back to Blog and Social Share -->
    <div class="blog-header">
      <div class="header-left">
        <a href="/blog" class="back-link">← Back to Blog</a>
      </div>
      <div class="header-right">
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

    <!-- Hero -->
    <header class="hero">
      <h1>Understanding U.S. Social Security: A Complete Guide</h1>
      <p class="subtitle">
        A comprehensive overview of how Social Security works, who qualifies,
        how benefits are calculated, and what retirees, workers, and families need to know.
      </p>
    </header>

    <!-- Introduction -->
    <section class="section">
      <p>
        The term "Social Security" in the United States refers to the national
        system that provides financial assistance to individuals with inadequate
        or no income. It can be understood as the “financial security of society.”
        While many countries operate similar systems under different names, this
        guide focuses specifically on the U.S. Social Security system.
      </p>
    </section>

    <!-- History -->
    <section class="section">
      <h2>History of Social Security in the U.S.</h2>
      <p>
        Before 1935, care for elderly or disabled individuals was not a federal
        responsibility. That changed with the Social Security Act, signed into law
        by President Franklin D. Roosevelt. Payroll taxes began in 1937 to fund
        retirement benefits.
      </p>
      <p>
        Over time, the program expanded to include survivors benefits (1939) and
        disability benefits (1956). Today, Social Security is formally known as
        Old-Age, Survivors, and Disability Insurance (OASDI).
      </p>
    </section>

    <!-- Key Facts -->
    <section class="section">
      <h2>Key Social Security Facts</h2>
      <ul>
        <li>About 169 million Americans pay Social Security taxes.</li>
        <li>About 65 million Americans receive monthly benefits.</li>
        <li>1 in 5 Americans receives benefits.</li>
        <li>Over 60% of beneficiaries rely on it for more than half of their income.</li>
        <li>Administrative costs are roughly 1% of total expenditures.</li>
      </ul>
    </section>

    <!-- COLA -->
    <section class="section">
      <h2>Cost-of-Living Adjustment (COLA)</h2>
      <p>
        Benefits increase annually through the Cost-of-Living Adjustment (COLA),
        which protects purchasing power from inflation. COLA is calculated using
        the Consumer Price Index for Urban Wage Earners and Clerical Workers (CPI-W).
        If inflation does not increase year over year, no COLA is applied.
      </p>
    </section>

    <!-- Social Security Tax -->
    <section class="section">
      <h2>How Social Security Is Funded</h2>
      <p>
        Social Security operates on a pay-as-you-go system. Today's workforce
        funds today's beneficiaries through payroll taxes under the Federal
        Insurance Contributions Act (FICA).
      </p>

      <h3>Payroll Tax Details (2026)</h3>
      <ul>
        <li>Total tax rate: 12.4% of earnings</li>
        <li>Split between employee and employer (6.2% each)</li>
        <li>Self-employed pay full 12.4%</li>
        <li>Taxable wage cap: $184,500</li>
        <li>Maximum employee contribution: $11,439</li>
      </ul>

      <p>
        Earnings above the annual wage cap are not subject to Social Security tax.
      </p>
    </section>

    <!-- Income Tax on Benefits -->
    <section class="section">
      <h2>Income Tax on Social Security Benefits</h2>
      <p>
        Social Security benefits may be taxable depending on combined income
        (Adjusted Gross Income + nontaxable interest + half of SS benefits).
      </p>

      <ul>
        <li>Single under $25,000 → No tax</li>
        <li>$25,000–$34,000 → Up to 50% taxable</li>
        <li>Above $34,000 → Up to 85% taxable</li>
      </ul>
    </section>

    <!-- Retirement Benefits -->
    <section class="section">
      <h2>Retirement Benefits</h2>
      <p>
        Benefits are based on a worker’s 35 highest-earning years. Social Security
        replaces roughly 40% of pre-retirement income for the average worker.
      </p>

      <h3>Full Retirement Age (FRA)</h3>
      <ul>
        <li>Age 67 for those born in 1960 or later</li>
        <li>Can claim as early as 62 (reduced benefits)</li>
        <li>Delaying until 70 increases benefits</li>
      </ul>
    </section>

    <!-- Working While Receiving -->
    <section class="section">
      <h2>Working While Receiving Benefits</h2>
      <p>
        If under FRA and earning above the annual limit, benefits are reduced:
        $1 deducted for every $2 earned above the threshold. Once FRA is reached,
        reductions stop.
      </p>
    </section>

    <!-- Credits -->
    <section class="section">
      <h2>Social Security Credits</h2>
      <p>
        Workers earn up to four credits per year. Typically, 40 credits are required
        for retirement eligibility.
      </p>
      <p>
        In 2026, one credit is earned for every $1,890 in taxable income.
      </p>
    </section>

    <!-- Disability -->
    <section class="section">
      <h2>Disability Benefits (SSDI & SSI)</h2>
      <p>
        Social Security Disability Insurance (SSDI) provides benefits to workers
        who meet strict disability criteria and have sufficient work credits.
      </p>
      <p>
        Supplemental Security Income (SSI) assists disabled individuals with
        limited income and resources, regardless of work history.
      </p>
    </section>

    <!-- Spousal & Survivor -->
    <section class="section">
      <h2>Spousal & Survivor Benefits</h2>
      <p>
        Spouses may receive up to 50% of a worker’s benefit. Widows and widowers
        may claim survivor benefits starting at age 60. Divorced spouses married
        at least 10 years may also qualify under certain conditions.
      </p>
    </section>

    <!-- Living Abroad -->
    <section class="section">
      <h2>Receiving Benefits Outside the U.S.</h2>
      <p>
        U.S. citizens may receive Social Security while living abroad.
        However, Medicare coverage is limited to the United States.
      </p>
    </section>

    <!-- Conclusion -->
    <section class="section">
      <h2>Conclusion</h2>
      <p>
        Social Security plays a foundational role in retirement security for
        millions of Americans. While not intended as a complete income replacement,
        it remains a critical pillar of retirement, disability protection, and
        survivor support.
      </p>
    </section>

    <!-- Calculator CTA -->
    <section class="calculator-cta">
      <a href="/social-security" class="calculator-btn">
        Explore Social Security Calculator →
      </a>
    </section>

  </article>
</template>

<script setup>
export default {
  name: 'RothIRAGuideBlog',
  methods: {
    shareOnLinkedIn() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    },
    shareOnX() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('Understanding U.S. Social Security: A Complete Guide');
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    },
    shareOnFacebook() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }
  },
  mounted() {
    document.title = 'Understanding U.S. Social Security: A Complete Guide'
  }
}
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

/* Blog Header with Back Link and Social Share */
.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
}

.header-left {
  flex: 1;
}

.header-right {
  flex-shrink: 0;
}

.back-link {
  text-decoration: none;
  color: #444;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
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
  background: #f5f5f5;
  color: #4b5f73;
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

@media (max-width: 480px) {
  .blog-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-right {
    width: 100%;
  }
  
  .social-share {
    justify-content: flex-start;
  }
}

.hero {
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 38px;
  margin-bottom: 16px;
}

.subtitle {
  font-size: 18px;
  color: #666;
}

.section {
  margin-bottom: 50px;
}

h2 {
  font-size: 26px;
  margin-bottom: 14px;
}

h3 {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
}

ul {
  padding-left: 20px;
}

.calculator-cta {
  text-align: center;
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #eee;
}

.calculator-btn {
  display: inline-block;
  padding: 14px 30px;
  background: #111;
  color: #fff;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: 0.2s ease;
}

.calculator-btn:hover {
  background: #333;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 28px;
  }
}
</style>
