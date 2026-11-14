import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

// Demo cart and "notify me" list. Stored only in this browser (localStorage), never sent anywhere.

interface CartLine { id: string; qty: number }
interface StoreValue {
  cart: CartLine[]
  add: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
  alerts: string[]
  toggleAlert: (id: string) => void
  toast: string | null
  notify: (msg: string) => void
}

const StoreCtx = createContext<StoreValue | null>(null)

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}
function save(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage may be blocked */ }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => load('concept-cart', []))
  const [alerts, setAlerts] = useState<string[]>(() => load('concept-alerts', []))
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => save('concept-cart', cart), [cart])
  useEffect(() => save('concept-alerts', alerts), [alerts])
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3200)
    return () => clearTimeout(t)
  }, [toast])

  const value: StoreValue = {
    cart,
    add: (id) => {
      setCart((c) => (c.some((l) => l.id === id) ? c.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)) : [...c, { id, qty: 1 }]))
      setToast('Added to your demo cart')
    },
    setQty: (id, qty) => setCart((c) => (qty <= 0 ? c.filter((l) => l.id !== id) : c.map((l) => (l.id === id ? { ...l, qty } : l)))),
    clear: () => setCart([]),
    alerts,
    toggleAlert: (id) => setAlerts((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id])),
    toast,
    notify: setToast,
  }
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const v = useContext(StoreCtx)
  if (!v) throw new Error('useStore must be used inside StoreProvider')
  return v
}
