import React, { useState } from 'react'
import {Routes , Route} from 'react-router-dom'
import { Cart } from './pages/Cart'
import Collection from './pages/Collection'
import { Home } from './pages/Home'
import ProductDetail from './pages/ProductDetail'
function App() {
  const [cart , setCart] = useState([])
  return (
    <Routes>
      <Route path='/'> 
        <Route index element={<Home/>}/>
      </Route>
        <Route path='/:slug' element={<Collection/>}/>
      <Route path='/:slug/:id' element={<ProductDetail cart={cart } setCart={setCart} />}/>
      <Route path='keranjang' element={<Cart cart={cart} setCart={setCart } />} />
    </Routes>
  )
}

export default App
