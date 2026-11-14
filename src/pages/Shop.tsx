import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { AGE_BANDS, OCCASIONS, SKILLS, fitsAge, products, type Product } from '../data/products'
import { usePageTitle } from '../usePageTitle'

const BUDGETS = [
  { id: 'u500', label: 'Under ₹500', max: 499 },
  { id: 'u1000', label: 'Under ₹1,000', max: 999 },
  { id: 'u2000', label: 'Under ₹2,000', max: 1999 },
]
const SORTS = [
  { id: 'popular', label: 'Most loved' },
  { id: 'new', label: 'Newest' },
  { id: 'low', label: 'Price: low to high' },
  { id: 'high', label: 'Price: high to low' },
]

/** Understands a little natural language: "3 years", "under 800", "phonics". */
function parseQuery(q: string) {
  const t = q.toLowerCase()
  const age = t.match(/(\d{1,2})\s*(?:yr|year|years|y)\b/)
  const under = t.match(/(?:under|below|less than|<)\s*₹?\s*(\d{2,5})/)
  const words = t
    .replace(/(\d{1,2})\s*(?:yr|year|years|y)\b(\s*old)?/, '')
    .replace(/(?:under|below|less than|<)\s*₹?\s*(\d{2,5})/, '')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !['for', 'a', 'an', 'the', 'toy', 'toys', 'my', 'old', 'kid', 'kids', 'child'].includes(w))
  return { age: age ? Number(age[1]) : null, under: under ? Number(under[1]) : null, words }
}

function matchesWords(p: Product, words: string[]) {
  if (words.length === 0) return true
  const hay = [p.name, p.type, p.category, p.blurb, ...p.skills, ...p.occasions].join(' ').toLowerCase()
  return words.every((w) => hay.includes(w))
}

export default function Shop() {
  usePageTitle('Shop')
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const age = params.get('age') ?? ''
  const skill = params.get('skill') ?? ''
  const occasion = params.get('occasion') ?? ''
  const budget = params.get('budget') ?? ''
  const cat = params.get('cat') ?? ''
  const inStock = params.get('stock') === '1'
  const sort = params.get('sort') ?? 'popular'
  // Filters start open on wide screens and folded on phones, so products are visible first.
  const [filtersOpen, setFiltersOpen] = useState(() => typeof window === 'undefined' || window.matchMedia('(min-width: 861px)').matches)

  function set(key: string, value: string) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const parsed = parseQuery(q)
  const results = useMemo(() => {
    const band = AGE_BANDS.find((b) => b.id === age)
    const b = BUDGETS.find((x) => x.id === budget)
    const list = products.filter((p) =>
      (!band || fitsAge(p, band.min, band.max)) &&
      (!skill || p.skills.includes(skill as Product['skills'][number])) &&
      (!occasion || p.occasions.includes(occasion as Product['occasions'][number])) &&
      (!b || p.price <= b.max) &&
      (!cat || p.category === cat) &&
      (!inStock || p.stock > 0) &&
      (parsed.age === null || (p.minAge <= parsed.age && p.maxAge >= parsed.age)) &&
      (parsed.under === null || p.price <= parsed.under) &&
      matchesWords(p, parsed.words))
    const sorted = [...list]
    if (sort === 'popular') sorted.sort((a, b2) => b2.reviews * b2.rating - a.reviews * a.rating)
    if (sort === 'new') sorted.sort((a, b2) => a.addedDaysAgo - b2.addedDaysAgo)
    if (sort === 'low') sorted.sort((a, b2) => a.price - b2.price)
    if (sort === 'high') sorted.sort((a, b2) => b2.price - a.price)
    return sorted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, age, skill, occasion, budget, cat, inStock, sort])

  const activeCount = [age, skill, occasion, budget, cat, inStock ? '1' : '', q].filter(Boolean).length

  return (
    <section className="container section">
      <h1 className="page-title">Shop toys and books</h1>
      <p className="muted hide-sm">Filter by what matters to parents: age, the skill it builds, the occasion and your budget. Filters stay in the link, so a shared link opens the same results.</p>

      <div className="shop-layout">
        <aside className="filters" aria-label="Filters">
          <details open={filtersOpen} onToggle={(e) => setFiltersOpen((e.currentTarget as HTMLDetailsElement).open)} className="filter-details">
            <summary>Search and filters {activeCount > 0 && <span className="pill">{activeCount} on</span>}</summary>
            <div className="filter-body">
              <div className="field">
                <label htmlFor="shop-q">Search</label>
                <input id="shop-q" type="search" value={q} onChange={(e) => set('q', e.target.value)} placeholder='e.g. "stem 6 years under 2000"' />
                {(parsed.age !== null || parsed.under !== null) && (
                  <p className="hint">Understood: {parsed.age !== null && `age ${parsed.age}`}{parsed.age !== null && parsed.under !== null && ', '}{parsed.under !== null && `under ₹${parsed.under}`}</p>
                )}
              </div>
              <div className="field">
                <label htmlFor="f-age">Age</label>
                <select id="f-age" value={age} onChange={(e) => set('age', e.target.value)}>
                  <option value="">Any age</option>
                  {AGE_BANDS.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-skill">Skill it builds</label>
                <select id="f-skill" value={skill} onChange={(e) => set('skill', e.target.value)}>
                  <option value="">Any skill</option>
                  {SKILLS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-occ">Occasion</label>
                <select id="f-occ" value={occasion} onChange={(e) => set('occasion', e.target.value)}>
                  <option value="">Any occasion</option>
                  {OCCASIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <fieldset className="field">
                <legend>Budget</legend>
                <div className="seg">
                  <label><input type="radio" name="budget" checked={!budget} onChange={() => set('budget', '')} /> Any</label>
                  {BUDGETS.map((b) => (
                    <label key={b.id}><input type="radio" name="budget" checked={budget === b.id} onChange={() => set('budget', b.id)} /> {b.label}</label>
                  ))}
                </div>
              </fieldset>
              <fieldset className="field">
                <legend>Type</legend>
                <div className="seg">
                  {['', 'Toys', 'Books'].map((c) => (
                    <label key={c || 'all'}><input type="radio" name="cat" checked={cat === c} onChange={() => set('cat', c)} /> {c || 'All'}</label>
                  ))}
                </div>
              </fieldset>
              <label className="check"><input type="checkbox" checked={inStock} onChange={(e) => set('stock', e.target.checked ? '1' : '')} /> In stock only</label>
              {activeCount > 0 && <button className="btn btn-outline" onClick={() => setParams({}, { replace: true })}>Clear all filters</button>}
            </div>
          </details>
        </aside>

        <div>
          <div className="results-bar">
            <p role="status" aria-live="polite"><strong>{results.length}</strong> {results.length === 1 ? 'result' : 'results'}</p>
            <label className="sort">
              <span>Sort</span>
              <select value={sort} onChange={(e) => set('sort', e.target.value)}>
                {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </label>
          </div>
          {results.length === 0 ? (
            <div className="empty">
              <p><strong>No toys match all of those filters.</strong></p>
              <p>Try removing one filter, or ask the Help assistant for a suggestion.</p>
              <button className="btn btn-outline" onClick={() => setParams({}, { replace: true })}>Clear all filters</button>
            </div>
          ) : (
            <div className="product-grid">{results.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          )}
        </div>
      </div>
    </section>
  )
}
