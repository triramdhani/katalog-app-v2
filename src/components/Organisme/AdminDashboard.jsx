import React, {useState, useRef, useEffect} from 'react'
import Search from '../Mollecules/Search'
import AdminProductCard from '../Mollecules/AdminProductCard'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase';

// const product = db.product

const Dashboard = () => {
  const [search, setSearch] = useState('')
  const [product,setProduct] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  
  const handleSearchChange = (e) => {
    setSearch(e.target.value) // debounce
  }
  const handleSearchSubmit = (e) => {
    setSearch(search)
  }


  useEffect(() => {
    const fetchData = async() => {
      let product = []
      try {
      const querySnapshot = await getDocs(collection(db,"product"))
      querySnapshot.forEach((doc) => {
        product.push({id:doc.id, ...doc.data()})
      })
      setProduct(product)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    setIsLoading(false)
  },[])
  if (isLoading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <>
      <Search Search={search} setSearch={setSearch} handleChange={handleSearchChange} handleSearch={handleSearchSubmit} />
      
      <div className='block'>
        {product.map((item,index) => {
          return (
            <AdminProductCard product={item} index={index} key={item.id} />
            )
          })}
      </div>
    </>
  )
}

export default Dashboard