import React, {useState, useReducer,useEffect } from 'react'
import { addDoc, collection, doc, setDoc, snapshotEqual } from "firebase/firestore"; 
import { db , storage} from '../../firebase'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { useNavigate } from 'react-router-dom';
import formatCurrency from '../../utils/formatCurrency';


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
  const Navigate = useNavigate()
    const [variant, dispatch] = useReducer(reducer, [])
    
    const [metaTitle,setMetaTitle] = useState('')
    const [metaPrice,setMetaPrice] = useState(0)
    const [metaDiscount,setMetaDiscount] = useState(0)
    const [detailProduct,setDetailProduct] = useState("")
    const [tag, setTag] = useState('Elektronik')
    
    
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
      alert('berhasil dibuat')
      setTimeout(() => {
        Navigate("/admin/kelola")
      }, 1000);
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
    <div className={"mt-5 ml-6 mr-6 bg-teal-300 p-4 "}>
      <form className='flex'>
        <div className='flex flex-col text-[18px] font-medium '>
          <label className='mb-2 mr-2' htmlFor="metaTitle">Nama Product:</label>
          <label className='mb-2 mr-2' htmlFor="metaPrice">Harga :</label>
          <label className='mb-2 mr-2' htmlFor="metaDiscount">Meta discount:</label>
          <label className='mb-2 mr-2' htmlFor="tag">tag:</label>
          <label className='mb-2 mr-2' htmlFor="detailProduct">Detail Produk:</label>
        </div>
        <div className='flex flex-col'>
        <input
          type="text"
          id='metaTitle'
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          className={"mb-2 ml-1 border rounded-md py-[2px] outline-none"}
        />
        <input
          type="number"
          id="metaPrice"
          value={metaPrice}
          onChange={(e) => setMetaPrice(e.target.value)}
          className={"mb-2 ml-1 border rounded-md py-[2px] outline-none"}
        />
        <input
          type="number"
          id="metaDiscount"
          value={metaDiscount}
          onChange={(e) => setMetaDiscount(e.target.value)}
          className={"mb-2 ml-1 border rounded-md py-[2px] outline-none"}
        />
        <select 
            id='tag'
            onChange={(e) => setTag(e.target.value)}
            className={"mb-2 ml-1 border rounded-md py-[2px] outline-none"}>
          <option value="Elektronik">Elektronik</option>
          <option value="Kecantikan">Kecantikan</option>
        </select>
        <textarea
          id="detailProduct" cols="30" rows="10"
          onChange={(e) => setDetailProduct(e.target.value)}
          className={"mb-2 ml-1 border rounded-md py-[2px] outline-none"}>
        </textarea>
        </div>
      </form>

      <button
        onClick={() => setModalVariant(prevState => !prevState)}
        className='mb-2 border-2 bg-slate-400 p-2 rounded'>
        add variant
      </button>

    <div className={modalVariant ? "" : "offscreen"}>  
        <form onSubmit={handleAddVariant} className={"p-2 flex rounded-xl bg-green-300 "}>
          <div className='flex flex-col'>             
            <label className='mb-3 ' htmlFor="namaVariant">Nama Variant</label>
            <label className='mb-3 ' htmlFor="priceVariant">Harga Variant</label>
            <label className='mb-3 ' htmlFor="discountVariant">Discount Variant</label>
            <label className='mb-3 ' htmlFor="stocktVariant">Stock Variant</label>
          </div>

          <div className='flex flex-col'>
        <input
          type="text"
          id='namaVariant'
          value={namaVariant}
          onChange={(e)=>setNamaVariant(e.target.value)}
          className={"mb-2 ml-1 border rounded-md py-[2px] outline-none"}
        />
        <input
          type="number"
          id='priceVariant'
          value={priceVariant}
          onChange={(e)=>setPriceVariant(e.target.value)}
          className={"mb-2 ml-1 border rounded-md py-[2px] outline-none"}
        />
        <input
          type="number"
          id='discountVariant'
          value={discountVariant}
          onChange={(e)=>setDiscountVariant(e.target.value)}
          className={"mb-2 ml-1 border rounded-md py-[2px] outline-none"}
        />
        <input
          type="number"
          id='stockVariant'
          value={stockVariant}
          onChange={(e)=> setStockVariant(e.target.value)}
          className={"mb-2 ml-1 border rounded-md py-[2px] outline-none"}
        />
          </div>
      </form>
        <button
          onClick={handleAddVariant}
          className='border rounded-md ml-2 px-2 py-1 justify-center text-slate-300   bg-indigo-600 flex-row'>add Variant
        </button>
      </div>
    
      <div>        
        {variant.map(item => {
          return (
            <div key={item.idVariant} className='py-2 px-1 mb-1 text-slate-200 rounded-xl bg-purple-600 border-b-slate-800 border'>
              <p>Nama Variant : {item.namaVariant}</p>
              <p>Harga Variant : {formatCurrency(item.priceVariant)}</p>
              <p>Discout Variant: {item.discountVariant} %</p>
              <p>Stock Variant: {item.stockVariant} pcs</p>
              <button
                onClick={() => dispatch({ type: ACTIONS.DELETE_VARIANT, payload: { idVariant: item.idVariant } })}
                className={"bg-red-700 mt-1 p-1 rounded-md"}
              >Delete
              </button>
            </div>
          )
        })}
      </div>

      <input
        type="file" multiple multiple-accept='image/*'
        className={"mt-3"}
        onChange={onImageChange} disabled={limit} />
      <div>
        {images.map((image,index) => {
          return (
            <img key={index} src={image} alt="" className='w-[50px] h-[50px]'/>
            )
          })}
      </div>
      <button
        className={"bg-yellow-300 p-1 mt-2 mb-2 text-red-700 font-bold border-none rounded-lg"}
        onClick={handleUploadImage}>Upload Images
      </button>
      <div className='flex items-center justify-center text-slate-800 font-extrabold'>
        <button onClick={handlePublishFirebase} className='bg-green-600 hover:bg-green-400 py-1 px-2 rounded-lg '>Publish</button>
      </div>
    </div>
  )
}

export default Add