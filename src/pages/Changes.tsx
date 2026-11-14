import { Link } from 'react-router-dom'
import { usePageTitle } from '../usePageTitle'

// Findings come from visits to the public site on 14 Nov 2026 (desktop, a 375px phone view, and a second,
// slower pass that let third-party widgets load, including the cart and the start of checkout).
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
    found: 'Tracking exists: a floating "Track" button opens a box that asks for the courier AWB number. The Order Tracking page itself only has text, and parents often remember their order number or phone, not the AWB.',
    change: 'Track by order number and last 4 phone digits, on the page itself and inside the assistant, with a step-by-step timeline and the automatic WhatsApp update for each step.',
    effect: 'Fewer "where is my order?" messages from parents who cannot find their AWB number, and less time spent looking orders up for them.',
    demo: { label: 'Try tracking', to: '/help#track' },
  },
  {
    area: 'Replacements', effectType: 'Operations',
    found: 'The 7-day replacement promise is shown on the home and product pages, but there is no way to start a request on the site. When I asked the AI assistant about a broken toy, it replied that chat cannot start a return or exchange yet and gave the support email.',
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
    found: 'The cart is already strong: a progress bar toward tiered discounts, a free worksheet, a combo upsell, and the prepaid price on the Checkout button. Earlier, on the product page, the main price and a lower "online" price sit close together, which takes a moment to read.',
    change: 'A small one: one price on the product card, with the prepaid saving explained in one line underneath. The cart ideas are kept as they are.',
    effect: 'A clearer first impression of the price, before the cart explains the rest.',
  },
  {
    area: 'Cash on delivery', effectType: 'Operations',
    found: 'Checkout uses GoKwik (mobile number and OTP, coupons). Its COD tools may already cover this, which I cannot see from outside. Unconfirmed COD orders are a known cause of parcels refused at the door.',
    change: 'If not already in place: a rule that sends a one-tap WhatsApp confirmation for COD orders and holds dispatch until the buyer confirms.',
    effect: 'Fewer return-to-origin parcels, which saves shipping both ways and packing time.',
    demo: { label: 'See the rule', to: '/dashboard' },
  },
  {
    area: 'Support inside the assistant', effectType: 'Operations',
    found: 'The site already has an AI shopping assistant (Jify by GoKwik) for bestsellers, picks and product questions. It sends support requests elsewhere: for a broken toy it pointed to care@wishluck.in, an email that is not shown in the header or footer.',
    change: 'Extend the assistant from shopping into support actions: track an order, start a replacement, and when it cannot help, hand over a ticket with the question and page already filled in. A help centre page with a searchable FAQ backs it up.',
    effect: 'The assistant finishes common support tasks itself instead of sending parents to email, and the cases that reach a person arrive with context.',
  },
  {
    area: 'Sold-out products', effectType: 'Conversion',
    found: 'A few products are sold out (4 of about 100 when I checked). Their pages show only a disabled "Sold out" button, with no way to be told when they return.',
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

// Strongest ideas first. Smaller observations are folded into "Other notes" so they do not read as a list of complaints.
const ORDER = ['Replacements', 'Support inside the assistant', 'Order tracking', 'Sold-out products', 'Finding the right toy', 'Gifting', 'Cash on delivery', 'Mobile layout', 'Accessibility']
const MAIN = ORDER.map((a) => CHANGES.find((c) => c.area === a)!).filter(Boolean)

const TOP3: { title: string; text: string; to: string; ask?: string }[] = [
  { title: 'Replacements without email', text: 'A 7-day replacement request that checks eligibility and approves clear cases on its own.', to: '/help#replace' },
  { title: 'An assistant that also does support', text: 'Track by order number and start replacements in chat, with a ready ticket when a person is needed.', to: '', ask: 'DEMO1001 1234' },
  { title: 'Alerts instead of dead ends', text: '"Notify me" on sold-out toys, plus rules that handle routine order updates automatically.', to: '/dashboard' },
]

const MINOR = [
  'Pricing: the cart already explains savings well; the product page could show one price with the prepaid saving in a single line.',
  'Speed: the home page loads many third-party scripts (about 470 requests in my test). Loading non-essential apps later would help on slow mobile networks.',
  'Consistency: the happy-parents count and one product page title differ between pages; one shared source for each claim keeps them aligned.',
]

const TYPE_CLASS: Record<Change['effectType'], string> = { Reach: 'pill-soft', Conversion: 'pill-ok', Operations: 'pill-blue', Trust: 'pill-warn' }

export default function Changes() {
  usePageTitle('What I changed and why')
  return (
    <section className="container section">
      <h1 className="page-title">What I changed and why</h1>
      <p className="lead narrow-text">
        I went through the public website on 14 November 2026 as a parent would, on a laptop and a phone, including the cart and the start of checkout
        (no order placed). These are honest observations, not an internal audit, and some may already be planned. No statistics are invented.
      </p>

      <section aria-labelledby="top3-h" className="top3">
        <h2 id="top3-h" className="h3">If you only read one thing: the top 3 ideas</h2>
        <ol className="top3-list">
          {TOP3.map((t, i) => (
            <li key={t.title} className="card">
              <span className="start-num" aria-hidden="true">{i + 1}</span>
              <div>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                {t.ask
                  ? <button className="link-btn" onClick={() => window.dispatchEvent(new CustomEvent('assistant-ask', { detail: t.ask }))}>Try it in the assistant →</button>
                  : <Link to={t.to}>See it →</Link>}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <p className="muted narrow-text">What already works well and is kept: shopping by age, toys or books as two clear paths, detailed product pages, an AI shopping assistant, AWB tracking, a cart with tiered discounts and combo upsells, a fast GoKwik checkout with coupons, the 7-day replacement promise, and occasion-based gifting. The ideas below build on these rather than replace them.</p>

      <ul className="legend" aria-label="Effect types">
        <li><span className="pill pill-soft">Reach</span> more people find and can use the site</li>
        <li><span className="pill pill-ok">Conversion</span> more visits turn into orders</li>
        <li><span className="pill pill-blue">Operations</span> less manual work for the team</li>
        <li><span className="pill pill-warn">Trust</span> clearer and more consistent</li>
      </ul>

      <ol className="changes">
        {MAIN.map((c) => (
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

      <section className="card narrow-text minor-notes" aria-labelledby="minor-h">
        <h2 id="minor-h" className="h3">Other notes</h2>
        <ul>{MINOR.map((m) => <li key={m}>{m}</li>)}</ul>
      </section>

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
