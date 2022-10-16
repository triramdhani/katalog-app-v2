import React from 'react'
import formatCurrency from '../../utils/formatCurrency';
import totalCheckout from '../../utils/totalCheckout'

export default function CartBill({cart}) {
const arrayTotalCostItem = cart.map((item) => {
        return item.priceAfterDiscount
      })
  let discont = 0;
  let deliveryCost = 0;
  const totalPay = totalCheckout(arrayTotalCostItem,deliveryCost,discont)

  return (
    <div className='m-7 h-[188px]'>
      <div className='flex justify-between'>
        <div >
            {/* <h4>Ongkos Kirim</h4> */}
            <h4>Kupon Diskon</h4>
        </div > 
        <div >
            {/* <h4>{formatCurrency(deliveryCost) }</h4> */}
            <h4>{formatCurrency(discont) }</h4>
        </div > 
      </div>
          <br/>
          <hr />
      <div>
        <h3>Total Belanja</h3>
        <h1>{formatCurrency(totalPay)}</h1>
      </div>
    </div>
  )
}
