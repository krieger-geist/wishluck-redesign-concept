import { Link } from 'react-router-dom'
import { usePageTitle } from '../usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <section className="container section narrow">
      <h1>Page not found</h1>
      <p>This page does not exist in the concept. Try the <Link to="/shop">shop</Link> or the <Link to="/help">help centre</Link>.</p>
    </section>
  )
}
