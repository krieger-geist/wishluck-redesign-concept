// Demo-only support data. Order IDs, names and dates are invented.

export interface FaqItem {
  id: string
  q: string
  a: string
  keywords: string[]
  action?: { label: string; to: string }
}

export const faqs: FaqItem[] = [
  {
    id: 'track', q: 'Where is my order?',
    a: 'Enter your order ID on the Track order page to see every step, from packing to delivery. In a live version, you would also get each update on WhatsApp automatically.',
    keywords: ['where', 'track', 'order', 'status', 'shipped', 'delivery', 'courier', 'awb', 'late'],
    action: { label: 'Track my order', to: '/help#track' },
  },
  {
    id: 'replace', q: 'Something arrived broken or missing. What do I do?',
    a: 'Within 7 days of delivery, start a replacement request. Add a photo and the system checks eligibility instantly, so most requests do not need to wait for an agent.',
    keywords: ['broken', 'damaged', 'missing', 'replace', 'replacement', 'return', 'defective', 'not working', 'refund'],
    action: { label: 'Start a replacement', to: '/help#replace' },
  },
  {
    id: 'age', q: 'Which toy is right for my child\'s age?',
    a: 'Every product shows a clear age range. The Gift finder asks three quick questions (age, occasion, budget) and suggests toys that fit.',
    keywords: ['age', 'year', 'old', 'months', 'toddler', 'baby', 'suitable', 'which toy', 'recommend'],
    action: { label: 'Open Gift finder', to: '/gift-finder' },
  },
  {
    id: 'safe', q: 'Are the toys safe for small children?',
    a: 'Each product page lists materials, the recommended age, and any small-part warnings. In a live version, this would link to the safety certificate for that product.',
    keywords: ['safe', 'safety', 'toxic', 'bpa', 'choking', 'small parts', 'material', 'certified', 'bis'],
  },
  {
    id: 'cod', q: 'Can I pay cash on delivery?',
    a: 'Yes in this concept. Prepaid orders get an extra discount. For cash on delivery, a one-tap WhatsApp confirmation is sent first, which cuts down on parcels that are refused at the door.',
    keywords: ['cod', 'cash', 'pay', 'payment', 'upi', 'prepaid', 'card'],
  },
  {
    id: 'shipping', q: 'How long does delivery take?',
    a: 'Enter your PIN code on any product page to see an estimated delivery date before you order. Metro cities are usually faster than remote areas.',
    keywords: ['how long', 'days', 'shipping', 'pincode', 'pin code', 'deliver', 'when will'],
  },
  {
    id: 'battery', q: 'Do sound books need batteries or an app?',
    a: 'Sound books and toys work on batteries, with no app, phone or Wi-Fi needed. The product page says whether batteries are included.',
    keywords: ['battery', 'batteries', 'app', 'wifi', 'charge', 'phone', 'screen'],
  },
  {
    id: 'gift', q: 'Can you gift wrap and add a message?',
    a: 'In this concept, you can add gift wrap and a short message at checkout, and hide the price on the invoice.',
    keywords: ['gift', 'wrap', 'message', 'birthday', 'present'],
    action: { label: 'Find a gift', to: '/gift-finder' },
  },
  {
    id: 'invoice', q: 'How do I get a GST invoice?',
    a: 'In this concept, the invoice is emailed automatically when the order ships, and you can download it again from the Track order page. Add your GST number at checkout for a business invoice.',
    keywords: ['invoice', 'gst', 'bill', 'receipt', 'tax'],
    action: { label: 'Go to Track order', to: '/help#track' },
  },
  {
    id: 'bulk', q: 'Do you work with schools or bulk orders?',
    a: 'This concept includes a short bulk enquiry form. It sorts enquiries by size and routes them to the right person automatically.',
    keywords: ['school', 'bulk', 'wholesale', 'teacher', 'preschool', 'corporate', 'quantity'],
    action: { label: 'Bulk enquiry', to: '/help#bulk' },
  },
]

/** Simple keyword scoring. A real version could use the store's own FAQ data. */
export function matchFaq(text: string): FaqItem | null {
  const t = text.toLowerCase()
  let best: FaqItem | null = null
  let bestScore = 0
  for (const f of faqs) {
    const score = f.keywords.reduce((s, k) => (t.includes(k) ? s + (k.includes(' ') ? 2 : 1) : s), 0)
    if (score > bestScore) { best = f; bestScore = score }
  }
  return bestScore > 0 ? best : null
}

export type OrderStep = 'Placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Out for delivery' | 'Delivered'
export const ORDER_STEPS: OrderStep[] = ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Out for delivery', 'Delivered']

export interface DemoOrder {
  id: string
  phoneLast4: string
  item: string
  step: number // index into ORDER_STEPS
  city: string
  deliveredDaysAgo?: number
  eta: string
  payment: 'Prepaid' | 'Cash on delivery'
}

export const demoOrders: DemoOrder[] = [
  { id: 'DEMO1001', phoneLast4: '1234', item: 'Talking Picture Word Book', step: 3, city: 'Pune', eta: 'Tomorrow by 8 pm', payment: 'Prepaid' },
  { id: 'DEMO1002', phoneLast4: '5678', item: 'Magnetic Building Tiles (60 pcs)', step: 5, city: 'Lucknow', deliveredDaysAgo: 2, eta: 'Delivered', payment: 'Cash on delivery' },
  { id: 'DEMO1003', phoneLast4: '9012', item: 'Kids Learning Laptop', step: 5, city: 'Jaipur', deliveredDaysAgo: 11, eta: 'Delivered', payment: 'Prepaid' },
  { id: 'DEMO1004', phoneLast4: '3456', item: 'Wooden Rainbow Stacker', step: 1, city: 'Kochi', eta: 'In 3 to 4 days', payment: 'Cash on delivery' },
]

/** Rough, invented delivery estimate by the first digit of the PIN code (postal zone). */
export function estimateDelivery(pin: string): { ok: boolean; text: string } {
  if (!/^[1-9][0-9]{5}$/.test(pin)) return { ok: false, text: 'Please enter a valid 6-digit PIN code.' }
  const metros = ['110', '400', '560', '600', '700', '500', '411', '201', '122']
  const isMetro = metros.some((m) => pin.startsWith(m))
  const remote = ['17', '18', '19', '79', '74'].some((m) => pin.startsWith(m))
  const days = isMetro ? 2 : remote ? 6 : 4
  const d = new Date()
  d.setDate(d.getDate() + days)
  const when = d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
  return { ok: true, text: `Estimated delivery by ${when} (demo estimate${isMetro ? ', metro area' : remote ? ', remote area' : ''}).` }
}
