import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ORDER_STEPS, demoOrders, faqs, type DemoOrder } from '../data/support'
import { usePageTitle } from '../usePageTitle'

function findOrder(id: string, last4: string): DemoOrder | undefined {
  return demoOrders.find((o) => o.id === id.trim().toUpperCase() && o.phoneLast4 === last4.trim())
}

function TrackOrder() {
  const [id, setId] = useState('')
  const [last4, setLast4] = useState('')
  const [order, setOrder] = useState<DemoOrder | null>(null)
  const [error, setError] = useState('')

  function submit(e: FormEvent) {
    e.preventDefault()
    const o = findOrder(id, last4)
    if (!o) { setOrder(null); setError('No demo order matches. Try DEMO1001 with 1234.'); return }
    setError(''); setOrder(o)
  }

  return (
    <section id="track" className="card help-card" aria-labelledby="track-h">
      <h2 id="track-h">Track your order</h2>
      <p className="muted">Demo orders: <code>DEMO1001</code> / <code>1234</code>, <code>DEMO1002</code> / <code>5678</code>, <code>DEMO1004</code> / <code>3456</code>.</p>
      <form className="form-grid" onSubmit={submit} noValidate>
        <div className="field">
          <label htmlFor="t-id">Order ID</label>
          <input id="t-id" value={id} onChange={(e) => setId(e.target.value)} autoComplete="off" placeholder="DEMO1001" />
        </div>
        <div className="field">
          <label htmlFor="t-ph">Last 4 digits of phone</label>
          <input id="t-ph" inputMode="numeric" maxLength={4} value={last4} onChange={(e) => setLast4(e.target.value.replace(/\D/g, ''))} placeholder="1234" />
        </div>
        <button className="btn btn-primary" type="submit">Track</button>
      </form>
      <div role="status" aria-live="polite">
        {error && <p className="error-text">{error}</p>}
        {order && (
          <div className="track-result">
            <p><strong>{order.item}</strong> to {order.city} · {order.payment}</p>
            <p className="eta">{order.step === 5 ? `Delivered ${order.deliveredDaysAgo} days ago` : `Expected: ${order.eta}`}</p>
            <ol className="timeline">
              {ORDER_STEPS.map((s, i) => (
                <li key={s} className={i < order.step ? 'done' : i === order.step ? 'current' : ''}>
                  <span className="dot" aria-hidden="true" />
                  <span>{s}{i === order.step && <span className="sr-only"> (current step)</span>}</span>
                </li>
              ))}
            </ol>
            <div className="wa-preview" aria-label="Example automatic WhatsApp update">
              <p className="wa-label">Automatic update the buyer would receive</p>
              <p className="wa-bubble">Hi! Your {order.item} is now <strong>{ORDER_STEPS[order.step].toLowerCase()}</strong>. {order.step < 5 ? `Expected ${order.eta.toLowerCase()}.` : 'Hope it brings lots of play. Reply 1 if anything is wrong.'}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

type Issue = 'damaged' | 'missing' | 'not-working' | 'changed-mind'
const ISSUES: { id: Issue; label: string }[] = [
  { id: 'damaged', label: 'Arrived damaged' },
  { id: 'missing', label: 'Part missing' },
  { id: 'not-working', label: 'Not working' },
  { id: 'changed-mind', label: 'Changed my mind' },
]

function Replacement() {
  const [id, setId] = useState('')
  const [last4, setLast4] = useState('')
  const [order, setOrder] = useState<DemoOrder | null>(null)
  const [error, setError] = useState('')
  const [issue, setIssue] = useState<Issue | ''>('')
  const [photo, setPhoto] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  useEffect(() => () => { if (photo) URL.revokeObjectURL(photo) }, [photo])

  function lookUp(e: FormEvent) {
    e.preventDefault()
    const o = findOrder(id, last4)
    setDone(false); setIssue('')
    if (!o) { setOrder(null); setError('No demo order matches. Try DEMO1002 with 5678 (eligible) or DEMO1003 with 9012 (outside 7 days).'); return }
    setError(''); setOrder(o)
  }

  const delivered = order?.step === 5
  const inWindow = delivered && (order?.deliveredDaysAgo ?? 99) <= 7
  const autoApprove = inWindow && issue !== '' && issue !== 'changed-mind' && (issue === 'missing' || !!photo)

  return (
    <section id="replace" className="card help-card" aria-labelledby="rep-h">
      <h2 id="rep-h">Request a replacement</h2>
      <p className="muted">Demo orders: <code>DEMO1002</code> / <code>5678</code> (delivered 2 days ago), <code>DEMO1003</code> / <code>9012</code> (delivered 11 days ago).</p>
      <form className="form-grid" onSubmit={lookUp} noValidate>
        <div className="field">
          <label htmlFor="r-id">Order ID</label>
          <input id="r-id" value={id} onChange={(e) => setId(e.target.value)} autoComplete="off" placeholder="DEMO1002" />
        </div>
        <div className="field">
          <label htmlFor="r-ph">Last 4 digits of phone</label>
          <input id="r-ph" inputMode="numeric" maxLength={4} value={last4} onChange={(e) => setLast4(e.target.value.replace(/\D/g, ''))} placeholder="5678" />
        </div>
        <button className="btn btn-primary" type="submit">Check order</button>
      </form>
      <div role="status" aria-live="polite">{error && <p className="error-text">{error}</p>}</div>

      {order && !delivered && <p className="info-box">This order has not been delivered yet, so a replacement is not needed. <a href="#track">Track it instead</a>.</p>}
      {order && delivered && !inWindow && (
        <p className="info-box">This order was delivered {order.deliveredDaysAgo} days ago, outside the 7-day window. In a live version, this is routed to a person with the full order history attached, so they can decide on a goodwill exception quickly.</p>
      )}
      {order && inWindow && !done && (
        <div className="stack">
          <p className="ok-text">✓ Within the 7-day window for {order.item}.</p>
          <fieldset>
            <legend>What went wrong?</legend>
            <div className="choice-grid">
              {ISSUES.map((i) => (
                <button type="button" key={i.id} className={`choice ${issue === i.id ? 'selected' : ''}`} aria-pressed={issue === i.id} onClick={() => setIssue(i.id)}>{i.label}</button>
              ))}
            </div>
          </fieldset>
          {(issue === 'damaged' || issue === 'not-working') && (
            <div className="field">
              <label htmlFor="r-photo">Add a photo or short video (stays on your device in this demo)</label>
              <input id="r-photo" type="file" accept="image/*,video/*" onChange={(e) => { const f = e.target.files?.[0]; setPhoto(f ? URL.createObjectURL(f) : null) }} />
              {photo && <img src={photo} alt="Your uploaded photo preview" className="photo-preview" />}
            </div>
          )}
          {issue === 'changed-mind' && <p className="info-box">The replacement policy covers damaged, missing or faulty items. A live version could offer an exchange voucher here instead.</p>}
          {issue && issue !== 'changed-mind' && (
            <button className="btn btn-primary" disabled={!autoApprove} onClick={() => setDone(true)}>
              {autoApprove ? 'Submit request' : 'Add a photo to continue'}
            </button>
          )}
        </div>
      )}
      {done && order && (
        <div className="success-box" role="status">
          <p><strong>Approved automatically (demo).</strong> Reference: REP-{order.id.slice(-4)}.</p>
          <p>What would happen next, with no agent needed: a replacement order is created, a pickup is booked for the faulty item, and you get both tracking links on WhatsApp. Nothing was actually sent.</p>
        </div>
      )}
    </section>
  )
}

function BulkEnquiry() {
  const [qty, setQty] = useState('')
  const [kind, setKind] = useState('School or preschool')
  const [result, setResult] = useState<string | null>(null)

  function submit(e: FormEvent) {
    e.preventDefault()
    const n = Number(qty)
    if (!n || n < 1) { setResult('Please enter how many units you need.'); return }
    const route = n >= 200 ? 'Sales lead, high priority, call back within a working day' : n >= 50 ? 'Sales team, quote sent automatically from the price list' : 'Standard checkout with an automatic bulk discount code'
    setResult(`Routed to: ${route}. Type: ${kind}. (Demo only, nothing was sent.)`)
  }

  return (
    <section id="bulk" className="card help-card" aria-labelledby="bulk-h">
      <h2 id="bulk-h">Schools and bulk orders</h2>
      <p className="muted">A short form that sorts enquiries by size, so large orders reach the right person first.</p>
      <form className="form-grid" onSubmit={submit} noValidate>
        <div className="field">
          <label htmlFor="b-kind">Who is ordering?</label>
          <select id="b-kind" value={kind} onChange={(e) => setKind(e.target.value)}>
            <option>School or preschool</option><option>Company gifting</option><option>Reseller</option><option>Other</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="b-qty">How many units?</label>
          <input id="b-qty" inputMode="numeric" value={qty} onChange={(e) => setQty(e.target.value.replace(/\D/g, ''))} placeholder="e.g. 120" />
        </div>
        <button className="btn btn-primary" type="submit">See routing</button>
      </form>
      <p role="status" aria-live="polite" className={result?.startsWith('Routed') ? 'ok-text' : 'error-text'}>{result}</p>
    </section>
  )
}

export default function Help() {
  usePageTitle('Help and tracking')
  const [filter, setFilter] = useState('')
  const shown = faqs.filter((f) => (f.q + ' ' + f.a).toLowerCase().includes(filter.toLowerCase()))
  return (
    <section className="container section">
      <h1 className="page-title">Help and tracking</h1>
      <p className="muted">The most common questions, answered without waiting. Everything here is a demo with invented orders.</p>
      <nav aria-label="Help sections" className="jump-links">
        <a href="#track">Track an order</a><a href="#replace">Replacement</a><a href="#bulk">Bulk orders</a><a href="#faq">FAQ</a>
      </nav>
      <div className="help-grid">
        <TrackOrder />
        <Replacement />
        <BulkEnquiry />
        <section id="faq" className="card help-card" aria-labelledby="faq-h">
          <h2 id="faq-h">Frequently asked questions</h2>
          <label htmlFor="faq-filter" className="sr-only">Filter questions</label>
          <input id="faq-filter" type="search" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter questions" />
          {shown.map((f) => (
            <details key={f.id} className="acc">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
              {f.action && (f.action.to.startsWith('/help#') ? <a href={f.action.to.replace('/help', '')}>{f.action.label} →</a> : <Link to={f.action.to}>{f.action.label} →</Link>)}
            </details>
          ))}
          {shown.length === 0 && <p>No questions match. Try the Help button at the bottom right.</p>}
        </section>
      </div>
    </section>
  )
}
