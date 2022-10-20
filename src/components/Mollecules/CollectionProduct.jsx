import React from 'react'
import { useNavigate } from 'react-router-dom'

export const CollectionProduct = ({product}) => {
  const Navigate = useNavigate()
  return (
    <div
      className='w-[150px] h-[250px] border'
      onClick={() => { Navigate(`/${product.tag}/${product.id}`,{state: product}) }}
    >
      <div       >
      {product.metaTitle}
      </div>
    </div>
  )
}
