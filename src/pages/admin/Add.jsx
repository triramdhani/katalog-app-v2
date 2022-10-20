import React, {useState, useReducer,useEffect } from 'react'
import { addDoc, collection, doc, setDoc, snapshotEqual } from "firebase/firestore"; 
import { db , storage} from '../../firebase'
import {ref , getDownloadURL , uploadBytesResumable} from 'firebase/storage'


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
    const [URLs, setURLs] = useState([])
    const [progress , setProgress] = useState('')
    const [limit, setLimit] = useState(false)
    useEffect(()=>{
      images.length > 5 && setLimit(true)
      const uploadImages = () => {
        const storageRef = ref(storage, 'images/rivers.jpg')
      }
      images && uploadImages()
    }, [images])


    const onImageChange = (e) => {
      for (let i = 0; i < e.target.files.length; i++){
        const newImage = e.target.files[i]
        setImages(prevState => {
        return [...prevState , newImage]
      })
      }
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
      setModalVariant(prevState=>!prevState)
    }

 const handlePublishFirebase = async(e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "product"), {
        "metaTitle": metaTitle,
        "rating": 5,
        "metaImage": URLs[0],
        "metaPrice": parseInt(metaPrice),
        "metaDiscount": parseInt(metaDiscount),
        "sold": 999,
        "tag": tag,
        "koleksiGambarNolinked": URLs,
        "detailProduct": detailProduct,
        'deskripsiProduct': "default",
        "variant": variant
      });
    } catch (error) {
      console.log(error)
    }
  }
  const handleUploadImage = () => {
    images.map(img => {
      const newName = new Date().getTime() + img.name
      const storageRef = ref(storage, newName) 

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on('state_changed', 
        (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
          console.log('Upload is paused');
          break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break
        }
      }, 
          (error) => {
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log('File available at', url);
              setURLs(prevState => {
                return [...prevState , url]
              })
            });
          }
        );
    })
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

      <button onClick={()=>setModalVariant(prevState=>!prevState)} className='border-2 bg-slate-400 p-2 rounded'>
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

      <input type="file" multiple multiple-accept='image/*' onChange={onImageChange} disabled={limit} />
      <button onClick={handleUploadImage}>Upload Images</button>
      <div>
        {images.map((image,index) => {
          return (
            <img key={index} src={image} alt="" className='w-[50px] h-[50px]'/>
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