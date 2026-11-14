import { useEffect, useRef, useState } from 'react'
import ProductArt from './ProductArt'
import { findProduct, formatINR } from '../data/products'
import { useStore } from '../store'

const PREPAID_DISCOUNT = 0.1

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const { cart, setQty, clear, notify } = useStore()
  const [prepaid, setPrepaid] = useState(true)
  const [placed, setPlaced] = useState(false)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) { d.showModal(); setPlaced(false) }
    if (!open && d.open) d.close()
  }, [open])

  const lines = cart.map((l) => ({ ...l, p: findProduct(l.id)! })).filter((l) => l.p)
  const subtotal = lines.reduce((s, l) => s + l.p.price * l.qty, 0)
  const discount = prepaid ? Math.round(subtotal * PREPAID_DISCOUNT) : 0
  const freeShipAt = 999
  const shipping = subtotal === 0 || subtotal - discount >= freeShipAt ? 0 : 79
  const total = subtotal - discount + shipping

  return (
    <dialog ref={ref} className="drawer" aria-labelledby="cart-title" onClose={onClose} onClick={(e) => { if (e.target === ref.current) onClose() }}>
      <div className="drawer-inner">
        <div className="drawer-head">
          <h2 id="cart-title">Your demo cart</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close cart">✕</button>
        </div>
        {placed ? (
          <div className="stack">
            <p className="success-box">Demo order placed. Nothing was charged or sent.</p>
            <p>In a live version, these automations would now run with no one on the team touching the order:</p>
            <ol className="steps-list">
              <li>{prepaid ? 'Payment confirmed, order marked ready to pack.' : 'WhatsApp message asks the buyer to confirm the cash on delivery order with one tap.'}</li>
              <li>Packing slip and courier label created, pickup booked.</li>
              <li>Tracking link sent on WhatsApp and email at every step.</li>
              <li>Two days after delivery, a short review request and a care tip for the toy.</li>
            </ol>
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        ) : lines.length === 0 ? (
          <p>Your cart is empty. Add a toy from the shop to try the demo checkout.</p>
        ) : (
          <div className="stack">
            <ul className="cart-lines">
              {lines.map((l) => (
                <li key={l.id}>
                  <span className="cart-emoji" aria-hidden="true" style={{ background: l.p.tint }}><ProductArt id={l.p.id} className="art-svg" /></span>
                  <span className="cart-name">{l.p.name}<small>{formatINR(l.p.price)} each</small></span>
                  <span className="qty">
                    <button className="qty-btn" onClick={() => setQty(l.id, l.qty - 1)} aria-label={`Remove one ${l.p.name}`}>−</button>
                    <span aria-label={`Quantity ${l.qty}`}>{l.qty}</span>
                    <button className="qty-btn" onClick={() => setQty(l.id, l.qty + 1)} aria-label={`Add one more ${l.p.name}`}>+</button>
                  </span>
                </li>
              ))}
            </ul>
            {subtotal - discount < freeShipAt && (
              <p className="hint">Add {formatINR(freeShipAt - (subtotal - discount))} more for free delivery.</p>
            )}
            <fieldset className="pay-choice">
              <legend>Payment (demo)</legend>
              <label><input type="radio" name="pay" checked={prepaid} onChange={() => setPrepaid(true)} /> Pay online (UPI or card), save 10%</label>
              <label><input type="radio" name="pay" checked={!prepaid} onChange={() => setPrepaid(false)} /> Cash on delivery</label>
            </fieldset>
            <dl className="totals">
              <div><dt>Subtotal</dt><dd>{formatINR(subtotal)}</dd></div>
              {discount > 0 && <div><dt>Prepaid saving</dt><dd>−{formatINR(discount)}</dd></div>}
              <div><dt>Delivery</dt><dd>{shipping === 0 ? 'Free' : formatINR(shipping)}</dd></div>
              <div className="grand"><dt>Total</dt><dd>{formatINR(total)}</dd></div>
            </dl>
            <p className="hint">One price, worked out in front of you. No second "online price" to puzzle over.</p>
            <button className="btn btn-primary" onClick={() => { setPlaced(true); clear(); notify('Demo order placed. Nothing was sent.') }}>
              Place demo order
            </button>
          </div>
        )}
      </div>
    </dialog>
  )
}
