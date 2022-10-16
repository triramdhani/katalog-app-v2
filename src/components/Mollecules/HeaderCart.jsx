import React from 'react'

export const HeaderCart = ({cart }) => {
  return (
    <header
      className="flex justify-between mt-[34px] mb-[16px] pl-[34px] pr-[22px] ">
      <h1 className="text-[30px]">Keranjang</h1>
      <div
        className="grid place-items-center justify-center  w-[69] h-[95] p-1 border rounded-2xl">
        <div>
          {cart.length}
        </div>
      </div>
    </header>
    
  )
}
