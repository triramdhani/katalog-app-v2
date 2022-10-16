import React from 'react'

export const LabelTotalProduct = ({total}) => {
  return (
    <div className='flex items-center p-2'>
      <span className='font-bold'>{total }</span> Items
    </div>
  )
}
