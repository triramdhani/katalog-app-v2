import React from 'react'
import {TrashIcon} from '@heroicons/react/20/solid'
import formatCurrency from '../../utils/formatCurrency'
import CartBill from '../Mollecules/CartBill'

export const CartCotent = ({cart, setCart}) => {
    const deleteCart = (params) => {
    let newCart = []
    let deletedCart = []
    cart.map(item => {
      return item.namaVariant === params ? deletedCart.push(item) : newCart.push(item) 
    })
    setCart(newCart)
  }

  const cartElement = cart.map((item, index) => {    
    console.log(item)
    return (
      <div key={index} className="flex ml-[38px] mr-[38px] mb-[39px] justify-between">
        <div className='flex items-center'>
          <img src={item.image} className="w-[77px] h-[77px] mr-5" />
          <div className="mr-5">
            <span>{item.metaTitle}</span> <br/>
            <span>{item.namaVariant}</span>
          </div>
          <div>{formatCurrency(item.priceAfterDiscount)}  </div>
        </div>
        <div className="flex gap-10 items-center">
          <div onClick={()=>deleteCart(item.namaVariant)}><TrashIcon className='w-[20px]'/></div> 
        </div>
      </div>
    )
  })
  
  return (
    <>
      {cartElement}
      <CartBill cart={cart} />
    </>
  )
}
