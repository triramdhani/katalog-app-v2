import React from 'react'
import { Link } from 'react-router-dom'

const AdminProductCard = ({product, index}) => {
  return (
    <div className='grid grid-cols-5 border m-1 rounded-lg py-1 items-center' key={product.id}>
      <div className=''>{index}</div>
      <img src={product.metaImage} alt="" className=' w-[40px] h-[40px]'/>
      <div className=''>{product.metaTitle}</div>
      <div className=''>
        {product.variant.map(item => <div key={item.idVariant}>{item.namaVariant}</div>)}
      </div>
      <div className=''>
        <div><Link to={`/admin/kelola/${product.id}`}>Edit</Link></div>
      </div>
    </div>
  )
}

export default AdminProductCard