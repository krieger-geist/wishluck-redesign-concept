import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { AGE_BANDS, OCCASIONS, products } from '../data/products'
import { usePageTitle } from '../usePageTitle'

const OCCASION_ICON: Record<string, string> = { Birthday: '🎂', Festival: '🪔', 'New baby': '🍼', 'School reward': '🏅', Everyday: '☀️' }

export default function Home() {
  usePageTitle('Home')
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const best = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4)

  function search(e: FormEvent) {
    e.preventDefault()
    navigate(`/shop${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`)
  }

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Screen-free learning toys and books</p>
            <h1>Find the right toy for your child in under a minute</h1>
            <p className="lead">Pick an age, tell us the occasion, and see toys that fit. Clear prices, delivery dates before you pay, and help that answers instantly.</p>
            <form className="hero-search" role="search" onSubmit={search}>
              <label htmlFor="home-search" className="sr-only">Search toys and books</label>
              <input id="home-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder='Try "phonics", "3 years" or "under 800"' />
              <button className="btn btn-primary" type="submit">Search</button>
            </form>
            <div className="hero-ctas">
              <Link className="btn btn-accent" to="/gift-finder">Open the Gift finder</Link>
              <Link className="btn btn-outline" to="/help#track">Track an order</Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <span className="blob b1">📖</span><span className="blob b2">🧲</span><span className="blob b3">🌈</span><span className="blob b4">🚀</span>
          </div>
        </div>
      </section>

      <section className="trust container" aria-label="Store promises (demo)">
        <ul>
          <li><span aria-hidden="true">🚚</span> Delivery across India</li>
          <li><span aria-hidden="true">🔁</span> 7-day replacement, requested online</li>
          <li><span aria-hidden="true">💸</span> Extra saving on prepaid orders</li>
          <li><span aria-hidden="true">💬</span> Instant answers, people when needed</li>
        </ul>
      </section>

      <section className="container section" aria-labelledby="age-h">
        <div className="section-head">
          <h2 id="age-h">Shop by age</h2>
          <Link to="/shop">See all toys</Link>
        </div>
        <ul className="age-grid">
          {AGE_BANDS.map((b) => (
            <li key={b.id}>
              <Link to={`/shop?age=${encodeURIComponent(b.id)}`} className="age-card">
                <span className="age-num">{b.short}</span>
                <span className="age-label">{b.label}</span>
                <span className="age-note">{b.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="container section" aria-labelledby="best-h">
        <div className="section-head">
          <h2 id="best-h">Parents' favourites</h2>
          <Link to="/shop?sort=popular">View all</Link>
        </div>
        <div className="product-grid">
          {best.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="container section" aria-labelledby="occ-h">
        <h2 id="occ-h">Gifting, sorted by occasion</h2>
        <ul className="occasion-grid">
          {OCCASIONS.map((o) => (
            <li key={o}>
              <Link className="occasion-card" to={`/gift-finder?occasion=${encodeURIComponent(o)}`}>
                <span aria-hidden="true" className="occ-icon">{OCCASION_ICON[o]}</span>
                <span>{o}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="container section" aria-labelledby="auto-h">
        <div className="feature-band">
          <div>
            <p className="eyebrow">Inside this concept</p>
            <h2 id="auto-h">Less waiting for parents, less manual work for the team</h2>
            <p>Most support messages in online toy stores are about the same few things: where is my order, something is broken, which toy fits my child. This concept answers those on the site, and shows the behind-the-scenes rules that would handle the rest.</p>
            <div className="hero-ctas">
              <Link className="btn btn-primary" to="/dashboard">See the automation dashboard</Link>
              <Link className="btn btn-outline" to="/changes">What I changed and why</Link>
            </div>
          </div>
          <ul className="feature-list">
            <li><strong>Self-serve tracking</strong> with WhatsApp updates at every step</li>
            <li><strong>Replacement wizard</strong> that checks the 7-day window instantly</li>
            <li><strong>FAQ assistant</strong> that hands off to a person with a ready summary</li>
            <li><strong>COD confirmation</strong> before dispatch to reduce refused parcels</li>
            <li><strong>Back-in-stock alerts</strong> instead of dead-end sold-out pages</li>
          </ul>
        </div>
      </section>
    </>
  )
}
