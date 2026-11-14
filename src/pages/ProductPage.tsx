import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { ageLabel, discountPct, findProduct, formatINR, products } from '../data/products'
import { estimateDelivery } from '../data/support'
import { useStore } from '../store'
import { usePageTitle } from '../usePageTitle'
import NotFound from './NotFound'

export default function ProductPage() {
  const { id = '' } = useParams()
  const p = findProduct(id)
  usePageTitle(p ? p.name : 'Product not found')
  const { add, alerts, toggleAlert, notify } = useStore()
  const [pin, setPin] = useState('')
  const [eta, setEta] = useState<{ ok: boolean; text: string } | null>(null)

  if (!p) return <NotFound />

  const out = p.stock === 0
  const watching = alerts.includes(p.id)
  const prepaid = Math.round(p.price * 0.9)
  // "Goes well with": same age range, different skill, so the pair adds something new.
  const pairs = products
    .filter((x) => x.id !== p.id && x.stock > 0 && x.minAge <= p.maxAge && x.maxAge >= p.minAge && !x.skills.some((s) => p.skills.includes(s)))
    .slice(0, 3)
  const similar = products.filter((x) => x.id !== p.id && x.skills.some((s) => p.skills.includes(s))).slice(0, 4)

  function checkPin(e: FormEvent) {
    e.preventDefault()
    setEta(estimateDelivery(pin))
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="container breadcrumb">
        <ol><li><Link to="/">Home</Link></li><li><Link to="/shop">Shop</Link></li><li aria-current="page">{p.name}</li></ol>
      </nav>
      <section className="container product-layout">
        <div className="pdp-art" style={{ background: p.tint }} aria-hidden="true"><span>{p.emoji}</span></div>
        <div className="pdp-info">
          <p className="meta"><span className="age-tag">{ageLabel(p)}</span> · {p.type} · {p.category}</p>
          <h1 className="pdp-title">{p.name}</h1>
          <p className="rating"><span aria-hidden="true">★</span> {p.rating} out of 5 · {p.reviews} demo reviews</p>
          <p className="lead">{p.blurb}</p>
          <div className="price-box">
            <p className="price big"><strong>{formatINR(p.price)}</strong> <s className="muted"><span className="sr-only">was </span>{formatINR(p.mrp)}</s> <span className="save">{discountPct(p)}% off</span></p>
            <p className="hint">Pay online and it is {formatINR(prepaid)}. The saving is applied automatically at checkout.</p>
          </div>
          <div className="skills">{p.skills.map((s) => <span key={s} className="pill pill-soft">{s}</span>)}</div>

          {out ? (
            <div className="stack">
              <p className="stock out">Out of stock right now</p>
              <button className="btn btn-primary btn-wide" aria-pressed={watching} onClick={() => { toggleAlert(p.id); notify(watching ? 'Alert removed' : 'You will get a WhatsApp alert when it is back (demo)') }}>
                {watching ? 'Back-in-stock alert set ✓' : 'Notify me when it is back'}
              </button>
              <p className="hint">In a live version, restocking triggers the alert automatically, in the order people signed up.</p>
            </div>
          ) : (
            <div className="stack">
              {p.stock <= 10 && <p className="stock low">Only {p.stock} left in stock</p>}
              <button className="btn btn-primary btn-wide" onClick={() => add(p.id)}>Add to cart</button>
            </div>
          )}

          <form className="pin-check" onSubmit={checkPin}>
            <label htmlFor="pin">Check delivery date</label>
            <div className="inline-field">
              <input id="pin" inputMode="numeric" maxLength={6} value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} placeholder="6-digit PIN code" aria-describedby="pin-result" />
              <button className="btn btn-outline" type="submit">Check</button>
            </div>
            <p id="pin-result" role="status" className={eta ? (eta.ok ? 'ok-text' : 'error-text') : ''}>{eta?.text}</p>
          </form>

          <details className="acc" open>
            <summary>Why kids love it</summary>
            <ul>{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          </details>
          <details className="acc">
            <summary>What is in the box</summary>
            <ul>{p.inBox.map((h) => <li key={h}>{h}</li>)}</ul>
          </details>
          <details className="acc">
            <summary>Safety and care</summary>
            <p>Recommended for {ageLabel(p)}. A live version would list materials, test standards and a link to the safety certificate here, so parents do not need to message support to ask.</p>
          </details>
          <details className="acc">
            <summary>Replacement policy</summary>
            <p>Arrived damaged or not working? Request a replacement online within 7 days of delivery. <Link to="/help#replace">Start a request</Link>.</p>
          </details>
        </div>
      </section>

      {pairs.length > 0 && (
        <section className="container section" aria-labelledby="pair-h">
          <h2 id="pair-h">Goes well with</h2>
          <p className="muted">Picked automatically: same age range, but builds a different skill.</p>
          <div className="product-grid">{pairs.map((x) => <ProductCard key={x.id} p={x} reason={`Adds ${x.skills[0].toLowerCase()} practice`} />)}</div>
        </section>
      )}
      {similar.length > 0 && (
        <section className="container section" aria-labelledby="sim-h">
          <h2 id="sim-h">Similar toys</h2>
          <div className="product-grid">{similar.map((x) => <ProductCard key={x.id} p={x} />)}</div>
        </section>
      )}

      {!out && (
        <div className="sticky-buy" aria-hidden="false">
          <span><strong>{formatINR(p.price)}</strong> <small className="muted">{p.name}</small></span>
          <button className="btn btn-primary" onClick={() => add(p.id)}>Add to cart</button>
        </div>
      )}
    </>
  )
}
