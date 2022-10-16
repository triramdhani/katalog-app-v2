import React from 'react'
import { Link } from 'react-router-dom'
import { HeaderCart } from '../components/Mollecules/HeaderCart'
import { CartCotent } from '../components/Organisme/CartCotent'
import { CartZero } from '../components/Atoms/CartZero'

export const Cart = ({cart, setCart}) => {
  return (
    <>
      <HeaderCart cart={cart} />
      {cart < 1 ? <CartZero/> : <CartCotent cart={cart} setCart={setCart} />}
      
      <Link to='/'>
        <div className='text-center text-xs text-blue-800 mt-9'>Kembali ke Halaman Utama</div>
      </Link>
    </>
  )
}
