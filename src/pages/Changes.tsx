import { Link } from 'react-router-dom'
import { usePageTitle } from '../usePageTitle'

// Findings come from one visit to the public site on 14 Nov 2026 (desktop and a 375px phone view).
// Observations can change as the live site changes. No statistics are invented here:
// where an effect is described, it is the expected direction, not a measured number.

interface Change {
  area: string
  found: string
  change: string
  effect: string
  effectType: 'Reach' | 'Conversion' | 'Operations' | 'Trust'
  demo?: { label: string; to: string }
}

const CHANGES: Change[] = [
  {
    area: 'Order tracking', effectType: 'Operations',
    found: 'The Order Tracking page told visitors to enter their tracking details, but no tracking form appeared on the page during my visit.',
    change: 'A working tracker by order ID and last 4 phone digits, with a step-by-step timeline and an example of the automatic WhatsApp update for each step.',
    effect: '"Where is my order?" is usually the most common support question for online stores. Answering it on the site should cut those messages and the time staff spend looking up couriers.',
    demo: { label: 'Try tracking', to: '/help#track' },
  },
  {
    area: 'Replacements', effectType: 'Operations',
    found: 'The 7-day replacement promise is shown on the home and product pages, but I could not find a way to start a request on the site.',
    change: 'A replacement wizard that checks the 7-day window instantly, asks for a photo, and approves clear cases automatically. Cases outside the rules go to a person with the order attached.',
    effect: 'Fewer back-and-forth messages per request, and parents get an answer straight away instead of waiting for a reply.',
    demo: { label: 'Try a replacement', to: '/help#replace' },
  },
  {
    area: 'Finding the right toy', effectType: 'Conversion',
    found: 'The "Shop by Age" section on the home page shows 4 age groups, while the menu lists 6. The catalogue filters only offer availability and price, so there is no way to filter by age, skill or type there.',
    change: 'One consistent set of 6 age bands everywhere, plus filters for age, skill, occasion, budget and type. Search understands phrases like "3 years under 800", and filters stay in the link so a shared link opens the same results.',
    effect: 'Parents reach a suitable toy in fewer steps, which usually helps more visits turn into orders.',
    demo: { label: 'Try the filters', to: '/shop?q=3%20years%20under%20800' },
  },
  {
    area: 'Gifting', effectType: 'Conversion',
    found: 'The home page offers occasion tiles (birthday, festival, new baby, school rewards), but the gifting collection is one list. In my visit it showed the same product twice, and its page title mentions budgets that cannot be filtered.',
    change: 'A 4-tap Gift finder (age, occasion, budget, interest) that ranks matches and explains why each one fits, plus a gift note box.',
    effect: 'Gift buyers often do not know the child well. Guided picks should reduce drop-off from people who cannot decide.',
    demo: { label: 'Open Gift finder', to: '/gift-finder' },
  },
  {
    area: 'Pricing clarity', effectType: 'Trust',
    found: 'Product pages show two prices close together, for example a main price and a lower "online" price, and the home banner adds a separate prepaid discount. It takes a moment to work out what you will actually pay.',
    change: 'One price on the card. The prepaid saving is explained in one line and applied in a cart that shows subtotal, saving, delivery and total.',
    effect: 'Clear totals reduce surprise at checkout, a common reason people abandon carts.',
  },
  {
    area: 'Cash on delivery', effectType: 'Operations',
    found: 'Cash on delivery is an important payment option for Indian shoppers, and unconfirmed COD orders are a known cause of parcels being refused at the door.',
    change: 'A rule that sends a one-tap WhatsApp confirmation for COD orders and holds dispatch until the buyer confirms.',
    effect: 'Fewer return-to-origin parcels, which saves shipping both ways and packing time.',
    demo: { label: 'See the rule', to: '/dashboard' },
  },
  {
    area: 'Help and FAQ', effectType: 'Operations',
    found: 'FAQs sit at the bottom of the home page as a short list. The footer links to a WhatsApp channel (a broadcast feed), and I could not find a contact page, email or phone number in the header or footer.',
    change: 'A help centre with searchable FAQ, and a Help assistant on every page that answers common questions instantly. When it cannot help, it drafts a ticket with the question and page, so nobody has to repeat themselves.',
    effect: 'Routine questions are answered without staff, and the ones that reach a person arrive with context.',
  },
  {
    area: 'Sold-out products', effectType: 'Conversion',
    found: 'The catalogue includes an "Out of stock" filter, so sold-out items exist, but there is no visible way to be told when they return.',
    change: '"Notify me when it is back" on sold-out items, with alerts sent automatically on restock. The dashboard shows the waitlist next to reorder suggestions.',
    effect: 'Keeps demand that would otherwise leave, and gives purchasing a signal of what to restock first.',
  },
  {
    area: 'Page speed', effectType: 'Reach',
    found: 'In my test the home page made about 470 network requests (around 2.6 MB transferred) and loaded about 168 script tags from many third-party services. Full load took around 8.5 seconds on my connection.',
    change: 'This concept is a static site with one small JavaScript bundle and no photos. A real store would still need its apps, but auditing them and loading non-essential ones later would help.',
    effect: 'Faster pages generally rank better in search and lose fewer visitors on slow mobile networks.',
  },
  {
    area: 'Accessibility', effectType: 'Reach',
    found: 'About 24 links and buttons had no readable name (for example icon-only social links), the only H1 on the home page was the logo text, and the trust strip scrolls continuously.',
    change: 'Every control has a label, each page has one clear H1, colours meet WCAG AA contrast, there is a skip link and visible focus outline, and there is no auto-moving content.',
    effect: 'Usable by more parents, including screen reader and keyboard users, and easier for search engines to understand.',
  },
  {
    area: 'Mobile layout', effectType: 'Conversion',
    found: 'On a 375px phone, the catalogue heading takes about half the first screen, so products start below it. A floating button overlaps the corner of product cards.',
    change: 'Compact headings, filters folded into one control on phones, a sticky "Add to cart" bar on product pages, and a help button that does not cover content.',
    effect: 'Products are visible sooner and the main action is always in reach.',
  },
  {
    area: 'Consistency of claims', effectType: 'Trust',
    found: 'Different places describe the number of happy parents differently (for example 2 lakh in one public profile and 3 lakh on a product page), and one product page title calls a physical sound book a "PDF".',
    change: 'Not something a design can fix alone, but the concept keeps one source for each claim and shows it the same way everywhere.',
    effect: 'Consistent facts build trust, and an accurate page title matches what people actually search for.',
  },
]

const TYPE_CLASS: Record<Change['effectType'], string> = { Reach: 'pill-soft', Conversion: 'pill-ok', Operations: 'pill-blue', Trust: 'pill-warn' }

export default function Changes() {
  usePageTitle('What I changed and why')
  return (
    <section className="container section">
      <h1 className="page-title">What I changed and why</h1>
      <p className="lead narrow-text">
        I looked through the public website on 14 November 2026 on a laptop and a phone-sized screen, as a parent would. Below is what I noticed,
        what this concept does differently, and the effect I would expect. These are honest observations from one visit, not an audit by the team,
        and some may already be known or planned. I have not invented any statistics: effects are described as the expected direction only.
      </p>
      <p className="muted narrow-text">What already works well and is kept: shopping by age, toys or books as two clear paths, a real product page with modes, how-to and safety notes, the 7-day replacement promise, and occasion-based gifting.</p>

      <ul className="legend" aria-label="Effect types">
        <li><span className="pill pill-soft">Reach</span> more people find and can use the site</li>
        <li><span className="pill pill-ok">Conversion</span> more visits turn into orders</li>
        <li><span className="pill pill-blue">Operations</span> less manual work for the team</li>
        <li><span className="pill pill-warn">Trust</span> clearer and more consistent</li>
      </ul>

      <ol className="changes">
        {CHANGES.map((c) => (
          <li key={c.area} className="card change-card">
            <div className="change-head">
              <h2 className="h3">{c.area}</h2>
              <span className={`pill ${TYPE_CLASS[c.effectType]}`}>{c.effectType}</span>
            </div>
            <dl className="change-dl">
              <div><dt>What I found</dt><dd>{c.found}</dd></div>
              <div><dt>What I changed</dt><dd>{c.change}</dd></div>
              <div><dt>Expected effect</dt><dd>{c.effect}</dd></div>
            </dl>
            {c.demo && <Link className="btn btn-outline" to={c.demo.to}>{c.demo.label}</Link>}
          </li>
        ))}
      </ol>

      <div className="card narrow-text">
        <h2 className="h3">How the team could use parts of this</h2>
        <ul>
          <li>The store runs on Shopify, so most ideas map to existing Shopify features or apps: product tags for age and skill filters, a tracking app, back-in-stock apps, and WhatsApp automation tools.</li>
          <li>The Gift finder and the search parser are small, self-contained pieces of code that could become a theme section.</li>
          <li>The rules on the dashboard are written in plain "when, then" form so they can be checked against whatever automation tool the team already uses.</li>
        </ul>
      </div>
    </section>
  )
}
