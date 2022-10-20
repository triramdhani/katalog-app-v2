import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { LabelTotalProduct } from '../components/Atoms/LabelTotalProduct'
import { CollectionProduct } from '../components/Mollecules/CollectionProduct'
import Header from '../components/Mollecules/Header'
import { collection, query, where, getDocs, } from "firebase/firestore";
import { db } from '../firebase'
import { useState } from 'react'




function Collection() {
  const { slug } = useParams()
  console.log(slug);
  const Location = useLocation()
  const [koleksi , setKoleksi] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const fetchData = async () => {
    try {
      let productByTag = []
      const q = query(collection(db, "product"), where("tag", "==", slug));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        productByTag.push({id:doc.id, ...doc.data()})
      });    
      setKoleksi(productByTag)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
      setTimeout(() => {
        fetchData()
      }, 1000);
    },[])
  
  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div> 
      <Header pageTitle={slug} />
      <LabelTotalProduct total={koleksi.length}/>
      {koleksi.map(item => {
        return (
          <div key={item.id}>
            <CollectionProduct product={item}/>
          </div>
        )
      })}
    </div>

  )
}

export default Collection