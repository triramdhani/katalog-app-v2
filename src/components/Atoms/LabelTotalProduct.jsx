import React from 'react'

export const LabelTotalProduct = ({total}) => {
  return (
    <div className='flex items-center p-2 mb-1'>
      <span className='font-bold mr-1'>{total}</span> <span className={"border-b-2"}> Items</span>
    </div>
  )
}
