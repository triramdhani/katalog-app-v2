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
    return (
      <div key={index} className="flex ml-[38px] mr-[38px] mb-[39px] justify-between">
        <div className='flex gap-5 items-center'>
          <img src={item.metaImage} className="w-[77px] h-[77px]" />
          <div className="">
            <span>{item.metaTitle}</span> <br/>
            <span>{item.namaVariant}</span>
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <div>{formatCurrency(item.priceAfterDiscount)}  </div>
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
