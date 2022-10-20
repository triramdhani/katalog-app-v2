import React, { useEffect, useState, useReducer } from 'react'
import { doc, updateDoc } from "firebase/firestore";
import {ref , getDownloadURL , uploadBytesResumable, deleteObject } from 'firebase/storage'
import { db , storage} from '../../firebase';


const EditMode = ({ setEditMode, product ,productId}) => {
  

    const [metaTitle,setMetaTitle] = useState(product.metaTitle)
    const [metaPrice,setMetaPrice] = useState(product.metaPrice)
    const [metaDiscount,setMetaDiscount] = useState(product.metaDiscount)
    const [detailProduct,setDetailProduct] = useState(product.detailProduct)
    const [tag, setTag] = useState(product.tag)
    const [images, setImages] = useState([])
    const [arrayVariant, setArrayVariant] = useState(product.variant)

    const [idVariant, setIdVariant] = useState(0)
    const [namaVariant, setNamaVariant] = useState('')
    const [priceVariant, setPriceVariant] = useState(0)
    const [discountVariant, setDiscountVariant] = useState(0)
    const [stockVariant, setStockVariant] = useState(0)
    
    
    
    const [limit, setLimit] = useState(false)
    const [modalVariant, setModalVariant] = useState(false)
    const [modalAddVariant, setModalAddVariant] = useState(false)
    
    const [URLs, setURLs] = useState([])
    const [progress , setProgress] = useState('')
    // useEffect(()=>{
    //   images.length > 5 && setLimit(true)
    //   const uploadImages = () => {
    //     const storageRef = ref(storage, 'images/rivers.jpg')
    //   }
    //   images && uploadImages()
    // }, [images])


    const onImageChange = (e) => {
      for (let i = 0; i < e.target.files.length; i++){
        const newImage = e.target.files[i]
        setImages(prevState => {
        return [...prevState , newImage]
      })
      }
    }
    useEffect(()=>{
      setURLs([...product.koleksiGambarNolinked])
    }, [])
  
    useEffect(()=>{
      images.length > 5 && setLimit(true)
    }, [URLs])

    const handleDeleteImage = (e)=> {
      let storageRef = ref(storage, `${e.target.src}`)
      deleteObject(storageRef).then(() => {
        console.log('filedeleted')

        setURLs(prevState => {
        let newImg = []
        prevState.map(img => {
          img === e.target.src ? '' : newImg.push(img)
        })
        return newImg
      })
      }).catch((error) => {
        console.log(error)
      });
    }
        const elementImagePriview =  URLs.map((imgURL, index) => {
          return (
            <div onClick={handleDeleteImage} key={index}>
              <img src={imgURL} alt={imgURL} />
            </div>
          )
        })
  const handleEditVariant = (e,item) => {
    setIdVariant(item.idVariant)
    setNamaVariant(item.namaVariant)
    setPriceVariant(item.priceVariant)
    setDiscountVariant(item.discountVariant)
    setStockVariant(item.stockVariant)
    setModalVariant(prevState=> !prevState)
  }
  const handleUpdateVariant = (e) => {
    e.preventDefault()
    const updatedVariant = {
    idVariant: idVariant,
    namaVariant: namaVariant,
    priceVariant: priceVariant,
    discountVariant: discountVariant,
    stockVariant: stockVariant,
    isAvailable: stockVariant < 1 ? true : false
    }
    setArrayVariant(prevState => {
      let newUpdatedArrayVariant = []
      prevState.map(variant => {
        variant.idVariant === idVariant ? newUpdatedArrayVariant.push(updatedVariant) : newUpdatedArrayVariant.push(variant)
      })
      return newUpdatedArrayVariant
    })
    setModalVariant(prevState => !prevState)
      setIdVariant(0)
      setNamaVariant('')
      setPriceVariant(0)
      setDiscountVariant(0)
      setStockVariant(0)
  }

  const handleDeleteVariant = (e, itemIdVariant) => {
    setArrayVariant(prevState => {
      let newArrayVariant = []
      prevState.map(variant => {
        variant.idVariant === itemIdVariant ? '' : newArrayVariant.push(variant)
      })
      return newArrayVariant
    })
  }
  const handleAddVariant = (e) => {
    e.preventDefault()
    const newVariant = {
    idVariant: Date.now(),
    namaVariant: namaVariant,
    priceVariant: priceVariant,
    discountVariant: discountVariant,
    stockVariant: stockVariant,
    isAvailable: true
    }
    setArrayVariant(prevState => {
      return [...prevState, newVariant]
    })
    setModalAddVariant(prevState => !prevState)
      setIdVariant(0)
      setNamaVariant('')
      setPriceVariant(0)
      setDiscountVariant(0)
      setStockVariant(0)
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

  const handleChanges = async () => { 
    let updatedData = {
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
        "variant": arrayVariant
    }
    const docRef = doc(db, "product", productId);

    // Set the "capital" field of the city 'DC'
    await updateDoc(docRef,{...updatedData});
    setEditMode(prevState => !prevState)
    alert("refresh page to see new updated data")

  }

  return (
    <>
      <div>EditMode</div>

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
        <select id='tag' onChange={(e)=>setTag(e.target.value)} defaultValue={tag}>
          <option value="Elektronik">Elektronik</option>
          <option value="Kecantikan">Kecantikan</option>
        </select>
        <br />
        <label htmlFor="detailProduct">Detail Produk</label>
        <textarea
          id="detailProduct" cols="30" rows="10"
          value={detailProduct}
          onChange={(e) => setDetailProduct(e.target.value)}>
          
        </textarea>
        <br />
      </form>

      <div>
        {arrayVariant.map(item => {
        return (
          <div key={item.idVariant} className='border-b-slate-800 border'>
            <p>{item.namaVariant}</p>
            <p>{item.priceVariant}</p>
            <p>{item.discountVariant}</p>
            <p>{item.stockVariant}</p>
            <button onClick={(e)=>handleEditVariant(e, item)}>edit</button>
            <button onClick={(e)=>handleDeleteVariant(e,item.idVariant)}>Delete</button>
          </div>
        )
      })}
      </div>

      <button onClick={()=>setModalAddVariant(prevState=>!prevState)} className='border-2 bg-slate-400 p-2 rounded'>
        add variant
      </button>
      <div className={modalAddVariant === true ? '' : 'offscreen'}>
        <form >
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
        <button onClick={handleAddVariant}>add Variant</button>
      </form>
      </div>

      <div className={modalVariant === true ? '' : 'offscreen'}>
        <form>
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
        <button onClick={(e)=>handleUpdateVariant(e)}>Update Variant</button>
      </form>
      </div>
      <input type="file" multiple multiple-accept='image/*' onChange={onImageChange} disabled={limit} />
      <button onClick={handleUploadImage}>Upload Images</button>
      <div>
        {elementImagePriview}
      </div>




      <button onClick={handleChanges}>Simpan Perubahan</button>
      <button onClick={()=>setEditMode(prev=>!prev)}>Batalkan perubahan</button>

    </>
  )
}

export default EditMode