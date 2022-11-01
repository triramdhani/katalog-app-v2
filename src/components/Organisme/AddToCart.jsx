import React from 'react'
import {Link} from 'react-router-dom'
import discountCalc from '../../utils/discountCalc'
import formatCurrency from '../../utils/formatCurrency'

export const AddToCart = ({product, activeVariant, cart ,setCart}) => {
  function addCart() {
    let isAdded 
    let priceAfterDiscount = discountCalc(activeVariant.priceVariant, activeVariant.discountVariant)
    formatCurrency(priceAfterDiscount)

    for (let i = 0; i < cart.length ; i++){
      cart[i].namaVariant === activeVariant.namaVariant ? isAdded= true : 'nothing'
    }
    isAdded ? alert('sudah ada') : setCart(prevState => {
      let newCart = {
        metaTitle: product.metaTitle,
        image: product.metaImage, 
        namaVariant: activeVariant.namaVariant,
        idVariant: activeVariant.idVariant,
        priceVariant: activeVariant.priceVariant,
        discountVariant: activeVariant.discountVariant,
        priceAfterDiscount : priceAfterDiscount
      }
      alert('modal muncul berhasil ditambahkan!')

      return [...prevState, newCart]
    })
  }
  
  return (
    <div
      className={"w-[300px] h-[40px] m-auto rounded-sm text-white flex items-center justify-center bg-blue-500"}
      onClick={() => addCart()}>
      <Link to='/keranjang'>Tambah ke Keranjang</Link>
    </div>

  )
}
