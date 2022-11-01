import React, {useReducer} from 'react'
import { Suspense } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import EditMode from '../../components/Organisme/EditMode'
import PreviewMode from '../../components/Organisme/PreviewMode'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase'


const productList = db.product

const Edit = () => {
  const slug = useParams()

  const [product, setProduct] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)

  const fetchData = async() => {
      const docRef = doc(db, "product", slug.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data())
      } else {
        console.log("No such document!");
      }
      setIsLoading(false)
  }
  useEffect(() => {
    setTimeout(() => {
      fetchData()
      
    }, 1000);
  },[])

  
  
  if (isLoading === true) {
    return (<div>loading...</div>)
  }
  console.log(product);
  return (
    <>
      <div>Edit {product.metaTitle}</div>
      {editMode === true ?
        <EditMode setEditMode={setEditMode} product={product} productId={slug.id} /> :
        <PreviewMode setEditMode={setEditMode} product={product} productId={slug.id} />}
    </>
  )
}

export default Edit





  // fethcing data lagi untuk mencari data product kemudian gunakan methode post jika melakukan parubahan atau menghapus product
  // untuk edit page akan ada dua mode . by default edit page akan menampilkan data product terkait. dipaling bawah ada dua button. 1. untuk merubah mode page ke editable mode atau dan jika sedang berada di editable mode button akan berubah value menjadi simpan perubahan. 2. button kedua pada default mode akan berfungsi untuk menghapus product, sedangkan pada mode editable akan berfungsi untuk membatalkan edit dan kembali ke mode default.