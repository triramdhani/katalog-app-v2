import React, { useState } from 'react'
import {Routes , Route} from 'react-router-dom'
import { Cart } from './pages/Cart'
import Collection from './pages/Collection'
import { Home } from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Admin from './pages/admin/Admin'
import ProtectedRoute from './components/ProtectedRoute'
import Kelola from './pages/admin/Kelola'
import Edit from './pages/admin/Edit'
import Add from './pages/admin/Add'
import Login from './pages/Login'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const [cart, setCart] = useState([])

  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path='/:slug' element={<Collection/>}/>
      <Route path='/:slug/:id' element={<ProductDetail cart={cart } setCart={setCart} />}/>
      <Route path='keranjang' element={<Cart cart={cart} setCart={setCart } />} />

      <Route element={<ProtectedRoute />}>
        <Route path='/admin' element={<Admin/> } />
        <Route path='/admin/kelola' element={<Kelola/>}/>
        <Route path='/admin/kelola/:id' element={<Edit/>}/>
        <Route path='/admin/add' element={<Add/>}/>
      </Route>
      
      {/* <Route path='/login' element={<Login/>} /> */}
      </Routes>
      </BrowserRouter>
  )
}

export default App
