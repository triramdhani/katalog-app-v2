import React from 'react'
import { useNavigate } from 'react-router-dom'
import formatCurrency from '../../utils/formatCurrency'

export const CollectionProduct = ({product}) => {
  const Navigate = useNavigate()
  return (
    <div
      className='w-[150px] h-[250px] border rounded-2xl'
      onClick={() => { Navigate(`/${product.tag}/${product.id}`,{state: product}) }}
    >     
        <img
          src={product.metaImage} alt={product.metaTitle}
          className={"w-[150px] h-[150px] object-fit rounded-2xl"} />
        <div
          className='flex flex-col items-center mt-[20px]'>
          <div>{product.metaTitle}</div>
          <div>{formatCurrency(product.metaPrice) }</div>
        </div>
    </div>
  )
}
