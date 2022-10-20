import React, {useState, useReducer,useEffect } from 'react'
import axios from '../../api/axios'
import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
import { db } from '../../firebase'

const ACTIONS = {
  ADD_VARIANT: 'add-variant',
  DELETE_VARIANT: 'delete'
}
function reducer(variant, action) {
  switch (action.type) {
    case ACTIONS.ADD_VARIANT:
      return [...variant, newVariant(action.payload.namaVariant, action.payload.priceVariant, action.payload.discountVariant, action.payload.stockVariant)]
    case ACTIONS.DELETE_VARIANT:
      return variant.filter(item=>item.idVariant !== action.payload.idVariant)
    default:
      return variant;
  }
}

const newVariant = (namaVariant,priceVariant,discountVariant, stockVariant) => {
  return {
    idVariant: Date.now(),
    namaVariant: namaVariant,
    priceVariant: parseInt(priceVariant),
    discountVariant: parseInt(discountVariant),
    stockVariant: parseInt(stockVariant),
    isAvailable: true
  }
}

function Add() {
    const [variant, dispatch] = useReducer(reducer, [])
    
    const [metaTitle,setMetaTitle] = useState('')
    const [metaPrice,setMetaPrice] = useState(0)
    const [metaDiscount,setMetaDiscount] = useState(0)
    const [detailProduct,setDetailProduct] = useState("")
    const [tag, setTag] = useState('')
    
    
    const [namaVariant, setNamaVariant] = useState('')
    const [priceVariant, setPriceVariant] = useState(0)
    const [discountVariant, setDiscountVariant] = useState(0)
    const [stockVariant, setStockVariant] = useState(0)
    
    const [modalVariant, setModalVariant] = useState(false)
    
    const [images, setImages] = useState([])
    const [limit, setLimit] = useState(false)
    useEffect(()=>{
      images.length > 5 && setLimit(true)
    }, [images])

    const onImageChange = (e) => {
      setImages(prevState => {
        return [...prevState , e.target.files]
      })
    }
  
    const showModalVariant = ()=>{
      setModalVariant(!modalVariant)
    }
    const handleAddVariant = (e) => {
      e.preventDefault()
      dispatch({type : ACTIONS.ADD_VARIANT , payload: {namaVariant:namaVariant, priceVariant:priceVariant, discountVariant:discountVariant, stockVariant:stockVariant}})  
      setNamaVariant('')
      setPriceVariant(0)
      setDiscountVariant(0)
      setStockVariant(0)
    }

    const handlePublishProduct = async () => {
    let newProduct = {
      "id": Date.now(),
      "metaTitle": metaTitle,
      "metaPrice": metaPrice,
      "metaDiscount": metaDiscount,
      "detailProduct": detailProduct,
      "tag": tag,
      "koleksiGambarNolinked": [],
      "variant": variant
    }
    //push ke api 
    try {
      const res = await fetch('http://localhost:3000/product', {
        method: "post",
        headers: {
          "content-Type": "application/json",
          "x-acces-token": "token-value",
        },
        body: JSON.stringify(newProduct)
      })
      if (!res.ok) {
        const message = `an error has accoured: ${res.status}`
      }
    } catch (error) {
      
    }
  }
 const handlePublishFirebase = async(e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "product"), {
        "metaTitle": metaTitle,
        "rating": 5,
        "metaImage": "defalut.jpg",
        "metaPrice": parseInt(metaPrice),
        "metaDiscount": parseInt(metaDiscount),
        "sold": 999,
        "tag": tag,
        "koleksiGambarNolinked": ["degfault.jpg"],
        "detailProduct": detailProduct,
        'deskripsiProduct': "default",
        "variant": variant
      });
    } catch (error) {
    }
  }

  return (
    <>

      <form>
        <label htmlFor="metaTitle">Nama Product</label>
        <input
          type="text"
          id='metaTitle'
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
        />
        <br />
        <label htmlFor="metaPrice">Harga :</label>
        <input
          type="number"
          id="metaPrice"
          value={metaPrice}
          onChange={(e) => setMetaPrice(e.target.value)}
        />
        <br />
        <label htmlFor="metaDiscount">Meta discount:</label>
        <input
          type="number"
          id="metaDiscount"
          value={metaDiscount}
          onChange={(e) => setMetaDiscount(e.target.value)}
        />
        <br />
        <label htmlFor="tag">tag</label>
        <select id='tag' onChange={(e)=>setTag(e.target.value)}>
          <option value="Elektronik">Elektronik</option>
          <option value="Kecantikan">Kecantikan</option>
        </select>
        <br />
        <label htmlFor="detailProduct">Detail Produk</label>
        <textarea
          id="detailProduct" cols="30" rows="10"
          onChange={(e) => setDetailProduct(e.target.value)}>
        </textarea>
        <br />
      </form>

      <button onClick={showModalVariant} className='border-2 bg-slate-400 p-2 rounded'>
        add variant
      </button>

    <div className={modalVariant ? "" : "offscreen"}>  
      <form onSubmit={handleAddVariant}>
        <label htmlFor="namaVariant">Nama Variant</label>
        <input
          type="text"
          id='namaVariant'
          value={namaVariant}
          onChange={(e)=>setNamaVariant(e.target.value)}
        />
        <br />
        <label htmlFor="priceVariant">Harga Variant</label>
        <input
          type="number"
          id='priceVariant'
          value={priceVariant}
          onChange={(e)=>setPriceVariant(e.target.value)}
        />
        <br />
        <label htmlFor="discountVariant">Discount Variant</label>
        <input
          type="number"
          id='discountVariant'
          value={discountVariant}
          onChange={(e)=>setDiscountVariant(e.target.value)}
        />
        <br />
        <label htmlFor="stocktVariant">Stock Variant</label>
        <input
          type="number"
          id='stockVariant'
          value={stockVariant}
          onChange={(e)=> setStockVariant(e.target.value)}
        />
        <button>add Variant</button>
      </form>
    </div>
      {variant.map(item => {
        return (
          <div key={item.idVariant} className='border-b-slate-800 border'>
            <p>{item.namaVariant}</p>
            <p>{item.priceVariant}</p>
            <p>{item.discountVariant}</p>
            <p>{item.stockVariant}</p>
            <button onClick={()=>dispatch({type: ACTIONS.DELETE_VARIANT, payload: {idVariant : item.idVariant}})}>delete</button>
          </div>
        )
      })}

      <input type="file" multiple-accept='image/*' onChange={onImageChange} disabled={limit} />
      <div>
        {images.map(image => {
          return (
            <img key={Date.now()} src={image} alt="" className='w-[50px] h-[50px]'/>
          )
        })}
      </div>

      <div>
        <button onClick={handlePublishFirebase} className='bg-green-600 hover:bg-green-400 py-1 px-2 rounded-lg flex items-center'>Publish</button>
      </div>
    </>
  )
}

export default Add