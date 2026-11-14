import { Link } from 'react-router-dom'
import ProductArt from './ProductArt'
import { ageLabel, discountPct, formatINR, type Product } from '../data/products'
import { useStore } from '../store'

export default function ProductCard({ p, reason }: { p: Product; reason?: string }) {
  const { add, alerts, toggleAlert, notify } = useStore()
  const out = p.stock === 0
  const watching = alerts.includes(p.id)
  return (
    <article className="card product-card">
      <Link to={`/product/${p.id}`} className="product-art" style={{ background: p.tint }} aria-hidden="true" tabIndex={-1}>
        <ProductArt id={p.id} className="art-svg" />
      </Link>
      <div className="product-body">
        <p className="meta"><span className="age-tag">{ageLabel(p)}</span> · {p.type}</p>
        <h3 className="product-name"><Link to={`/product/${p.id}`}>{p.name}</Link></h3>
        {reason && <p className="reason">{reason}</p>}
        <p className="rating" aria-label={`Rated ${p.rating} out of 5 from ${p.reviews} demo reviews`}>
          <span aria-hidden="true">★ {p.rating}</span> <span className="muted" aria-hidden="true">({p.reviews})</span>
        </p>
        <p className="price">
          <strong>{formatINR(p.price)}</strong>{' '}
          <s className="muted"><span className="sr-only">was </span>{formatINR(p.mrp)}</s>{' '}
          <span className="save">{discountPct(p)}% off</span>
        </p>
        {out ? (
          <>
            <p className="stock out">Out of stock</p>
            <button className="btn btn-outline" aria-pressed={watching} onClick={() => { toggleAlert(p.id); notify(watching ? 'Alert removed' : 'We will tell you when it is back (demo)') }}>
              {watching ? 'Alert set ✓' : 'Notify me when back'}
            </button>
          </>
        ) : (
          <>
            {p.stock <= 10 && <p className="stock low">Only {p.stock} left</p>}
            <button className="btn btn-primary" onClick={() => add(p.id)}>Add to cart<span className="sr-only">: {p.name}</span></button>
          </>
        )}
      </div>
    </article>
  )
}
