import { useEffect, useRef, useState } from 'react'
import { formatINR, products } from '../data/products'
import { matchFaq } from '../data/support'
import { useStore } from '../store'
import { usePageTitle } from '../usePageTitle'

// Everything on this page is a simulation with invented events. Nothing connects to a real store.

type RuleId = 'cod-confirm' | 'track-update' | 'faq-auto' | 'replace-auto' | 'restock-alert' | 'cart-reminder' | 'review-ask' | 'low-stock'

interface Rule { id: RuleId; name: string; when: string; then: string; manualSteps: number }
const RULES: Rule[] = [
  { id: 'cod-confirm', name: 'COD confirm', when: 'A cash on delivery order is placed', then: 'Send a one-tap WhatsApp confirm. Hold dispatch until confirmed; cancel after 24 hours with no reply.', manualSteps: 2 },
  { id: 'track-update', name: 'Tracking update', when: 'The courier status changes', then: 'Send the buyer an update with the tracking link and expected date.', manualSteps: 1 },
  { id: 'faq-auto', name: 'FAQ reply', when: 'A message matches a known question', then: 'Reply with the answer and a link. Send to a person only if the buyer says it did not help.', manualSteps: 1 },
  { id: 'replace-auto', name: 'Replacement', when: 'A replacement request is within 7 days and has a photo', then: 'Approve, create the replacement order and book a pickup.', manualSteps: 4 },
  { id: 'restock-alert', name: 'Restock alert', when: 'A sold-out product is restocked', then: 'Alert everyone on the waitlist, oldest first.', manualSteps: 1 },
  { id: 'cart-reminder', name: 'Cart reminder', when: 'A cart is left for 3 hours', then: 'Send one gentle reminder. Never more than one.', manualSteps: 1 },
  { id: 'review-ask', name: 'Review request', when: 'An order is delivered 2 days ago', then: 'Ask for a short review and share a care tip for the toy.', manualSteps: 1 },
  { id: 'low-stock', name: 'Reorder flag', when: 'Stock drops below 10 units', then: 'Flag for reorder with last 30 days of sales attached.', manualSteps: 2 },
]

interface SimEvent { text: string; rule: RuleId | null; needsPerson?: boolean }
const EVENT_POOL: SimEvent[] = [
  { text: 'New COD order DEMO2041, Indore, ₹1,299', rule: 'cod-confirm' },
  { text: 'Courier: DEMO1001 out for delivery', rule: 'track-update' },
  { text: 'Message: "where is my order? its been 3 days"', rule: 'faq-auto' },
  { text: 'Replacement: DEMO1002, damaged, photo attached', rule: 'replace-auto' },
  { text: 'Restock: First Senses Rattle Set, 40 units', rule: 'restock-alert' },
  { text: 'Cart left 3h ago: Magnetic Building Tiles', rule: 'cart-reminder' },
  { text: 'Delivered 2 days ago: DEMO1002', rule: 'review-ask' },
  { text: 'Stock low: Tap and Learn Phonics Board (4 left)', rule: 'low-stock' },
  { text: 'Message: "my parcel was delivered to the wrong address"', rule: null, needsPerson: true },
  { text: 'Message: "is the laptop toy safe for a 3 year old"', rule: 'faq-auto' },
  { text: 'Replacement: DEMO1003, 11 days after delivery', rule: null, needsPerson: true },
  { text: 'New COD order DEMO2042, Patna, ₹549', rule: 'cod-confirm' },
  { text: 'Courier: DEMO1004 shipped', rule: 'track-update' },
  { text: 'Message: "do sound books need an app"', rule: 'faq-auto' },
]

const INBOX = [
  'Hi my order DEMO1001 has not arrived, where is it?',
  'The duck toy came broken, one stair is cracked',
  'Which toy is best for 2 year old girl birthday',
  'Do you deliver to Shillong? what is pin code time',
  'Want 150 sets for our preschool annual day',
  'Can I pay by cash?',
  'I was charged twice, please check',
]

const REVIEWS = [
  'My son loves it, plays every evening. Great quality.',
  'Sound stopped working after 4 days, disappointed.',
  'Good but box was a bit dented. Toy is fine.',
  'Excellent gift, the pages are thick and safe.',
]
const NEG = ['stopped', 'broken', 'disappointed', 'bad', 'not working', 'worst', 'cracked', 'refund']
const MIX = ['but', 'dented', 'late', 'okay']

export default function Dashboard() {
  usePageTitle('Automation dashboard')
  const { alerts } = useStore()
  const [enabled, setEnabled] = useState<Record<RuleId, boolean>>(() => Object.fromEntries(RULES.map((r) => [r.id, true])) as Record<RuleId, boolean>)
  const [log, setLog] = useState<{ e: SimEvent; auto: boolean; at: string }[]>([])
  const [running, setRunning] = useState(false)
  const idx = useRef(0)

  useEffect(() => {
    if (!running) return
    const t = setInterval(() => {
      const e = EVENT_POOL[idx.current % EVENT_POOL.length]
      idx.current += 1
      const auto = !!e.rule && enabled[e.rule]
      const at = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      setLog((l) => [{ e, auto, at }, ...l].slice(0, 40))
      if (idx.current >= EVENT_POOL.length * 2) setRunning(false)
    }, 900)
    return () => clearInterval(t)
  }, [running, enabled])

  const autoCount = log.filter((l) => l.auto).length
  const personCount = log.length - autoCount
  const stepsSaved = log.reduce((s, l) => s + (l.auto && l.e.rule ? RULES.find((r) => r.id === l.e.rule)!.manualSteps : 0), 0)
  const lowStock = products.filter((p) => p.stock <= 10).sort((a, b) => a.stock - b.stock)

  return (
    <section className="container section">
      <p className="eyebrow">Concept for the internal team</p>
      <h1 className="page-title">Automation dashboard</h1>
      <p className="muted">A mock-up of the rules that could run behind the store, so the team spends time on the cases that really need a person. All events and numbers below are simulated in your browser.</p>

      <div className="kpis" aria-live="polite">
        <div className="kpi"><span className="kpi-num">{log.length}</span><span className="kpi-label">Events in this simulation</span></div>
        <div className="kpi"><span className="kpi-num">{autoCount}</span><span className="kpi-label">Handled by rules</span></div>
        <div className="kpi"><span className="kpi-num">{personCount}</span><span className="kpi-label">Sent to a person</span></div>
        <div className="kpi"><span className="kpi-num">{stepsSaved}</span><span className="kpi-label">Manual steps skipped</span></div>
      </div>

      <div className="dash-grid">
        <section className="card" aria-labelledby="sim-h">
          <div className="section-head">
            <h2 id="sim-h" className="h3">Live event feed (simulated)</h2>
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => setRunning((r) => !r)}>{running ? 'Pause' : log.length ? 'Resume' : 'Simulate a busy hour'}</button>
              {log.length > 0 && <button className="btn btn-outline" onClick={() => { setLog([]); idx.current = 0; setRunning(false) }}>Reset</button>}
            </div>
          </div>
          {log.length === 0 ? <p className="muted">Press the button to stream sample store events through the rules. Turn rules off on the right to see what lands on the team instead.</p> : (
            <ol className="feed">
              {log.map((l, i) => (
                <li key={log.length - i} className={l.auto ? 'auto' : 'person'}>
                  <span className="feed-time">{l.at}</span>
                  <span className="feed-text">{l.e.text}</span>
                  <span className={`pill ${l.auto ? 'pill-ok' : 'pill-warn'}`}>{l.auto ? `Auto: ${RULES.find((r) => r.id === l.e.rule)!.name}` : 'Needs a person'}</span>
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="card" aria-labelledby="rules-h">
          <h2 id="rules-h" className="h3">Rules</h2>
          <ul className="rules">
            {RULES.map((r) => (
              <li key={r.id}>
                <label className="switch">
                  <input type="checkbox" checked={enabled[r.id]} onChange={(e) => setEnabled((s) => ({ ...s, [r.id]: e.target.checked }))} />
                  <span className="switch-ui" aria-hidden="true" />
                  <span className="rule-text"><strong>When</strong> {r.when.toLowerCase()}<br /><strong>Then</strong> {r.then}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section className="card" aria-labelledby="inbox-h">
          <h2 id="inbox-h" className="h3">Support inbox, auto-tagged</h2>
          <p className="muted small">Each message is matched against the FAQ. Matches get a suggested reply; the rest go to a person.</p>
          <div className="table-wrap"><table className="table">
            <thead><tr><th scope="col">Message</th><th scope="col">Tag</th><th scope="col">Route</th></tr></thead>
            <tbody>
              {INBOX.map((m) => {
                const hit = matchFaq(m)
                return (
                  <tr key={m}>
                    <td>{m}</td>
                    <td>{hit ? <span className="pill pill-soft">{hit.id}</span> : <span className="pill pill-warn">unknown</span>}</td>
                    <td>{hit ? (hit.id === 'bulk' ? 'Sales' : 'Auto reply') : 'Person'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table></div>
        </section>

        <section className="card" aria-labelledby="stock-h">
          <h2 id="stock-h" className="h3">Stock watch</h2>
          <div className="table-wrap"><table className="table">
            <thead><tr><th scope="col">Product</th><th scope="col">Left</th><th scope="col">Suggested action</th></tr></thead>
            <tbody>
              {lowStock.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.stock}</td>
                  <td>{p.stock === 0 ? `Reorder; ${alerts.includes(p.id) ? 'you are' : 'buyers are'} on the waitlist` : 'Reorder soon'}</td>
                </tr>
              ))}
            </tbody>
          </table></div>
          <p className="muted small">Tip: set a "Notify me" alert on a sold-out toy in the shop and it shows up here.</p>
        </section>

        <section className="card" aria-labelledby="cod-h">
          <h2 id="cod-h" className="h3">Cash on delivery confirmations</h2>
          <ul className="plain cod-list">
            <li><span>DEMO2041 · Indore · {formatINR(1299)}</span><span className="pill pill-ok">Confirmed by buyer</span></li>
            <li><span>DEMO2042 · Patna · {formatINR(549)}</span><span className="pill pill-soft">Waiting, 2h left</span></li>
            <li><span>DEMO2039 · Surat · {formatINR(1899)}</span><span className="pill pill-warn">No reply, auto-cancelled</span></li>
          </ul>
          <p className="muted small">Parcels are only shipped after a confirm, so fewer come back unopened at the store's cost.</p>
        </section>

        <section className="card" aria-labelledby="rev-h">
          <h2 id="rev-h" className="h3">New reviews, sorted by tone</h2>
          <ul className="plain review-list">
            {REVIEWS.map((r) => {
              const t = r.toLowerCase()
              const tone = NEG.some((w) => t.includes(w)) ? 'Needs follow-up' : MIX.some((w) => t.includes(w)) ? 'Mixed' : 'Positive'
              return (
                <li key={r}>
                  <span>"{r}"</span>
                  <span className={`pill ${tone === 'Positive' ? 'pill-ok' : tone === 'Mixed' ? 'pill-soft' : 'pill-warn'}`}>{tone}</span>
                </li>
              )
            })}
          </ul>
          <p className="muted small">Negative reviews open a support ticket automatically, so an unhappy parent hears back before they post again.</p>
        </section>
      </div>
    </section>
  )
}
