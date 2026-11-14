import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { StoreProvider } from './store'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductPage from './pages/ProductPage'
import GiftFinder from './pages/GiftFinder'
import Help from './pages/Help'
import Dashboard from './pages/Dashboard'
import Changes from './pages/Changes'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <StoreProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/gift-finder" element={<GiftFinder />} />
          <Route path="/help" element={<Help />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/changes" element={<Changes />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </StoreProvider>
  )
}
