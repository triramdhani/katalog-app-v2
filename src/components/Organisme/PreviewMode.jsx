import React from 'react'

const PreviewMode = ({setEditMode, product}) => {
  return (
    <div>
      <h1>PreviewMode</h1>
      <section>
        <h1>Nama Product : {product.metaTitle}</h1>
        <p>Meta Price: {product.metaPrice}</p>
        <label htmlFor="deskripsiPoduct">Deskripsi Product</label>
        <textarea defaultValue={product.deskripsiProduct} id="deskripsiProduct"></textarea>
        <div>Meta Diskon : {product.metaDiscount}</div>
        <div>Tag : {product.tag}</div>
        <div>
          {product.variant.map(item => {
            return (
              <div key={item.idVariant} className='border-b-slate-800 border'>
                <p>Nama Variant{item.namaVariant}</p>
                <p>harga : {item.priceVariant}</p>
                <p>diskon : {item.discountVariant}</p>
                <p>stock: {item.stockVariant}</p>
              </div>
            )
          })}
        </div>
        <div className='flex'>
          {product.koleksiGambarNolinked.map((url,index) => {
            return (
              <div key={index} className="relative">
                {/* <span className='absolute bg-black right-0 text-white px-1 rounded-lg text-xs' onClick={()=>}>X</span> */}
                <img src={url}  alt="" />
              </div>
            )
          })}
        </div>
      </section>
      


      <button onClick={()=>setEditMode(prev => !prev)}>Edit Product</button>
      <button>Delete product</button>
    </div>

  )
}

export default PreviewMode