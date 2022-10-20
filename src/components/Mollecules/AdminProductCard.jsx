import React from 'react'
import { Link } from 'react-router-dom'

const AdminProductCard = ({product, index}) => {
  return (
    <div className='flex gap-3 justify-between' key={product.id}>
      <div>{index}</div>
      <img src={product.metaImage} alt="" className='w-[100px] h-[100px]'/>
      <div>{product.metaTitle}</div>
      <div>
        {product.variant.map(item => <div key={item.idVariant}>{item.namaVariant}</div>)}
      </div>
      <div className=''>
        <div><Link to={`/admin/kelola/${product.id}`}>Edit</Link></div>
      </div>
    </div>
  )
}

export default AdminProductCard