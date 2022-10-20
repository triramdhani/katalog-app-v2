import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Mollecules/HomeHeader'
import HomeProduct from '../components/Mollecules/HomeProduct'
import dab from '../data/db'
import findTag from '../utils/findTag'
import { Swiper , SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase'

export const Home = () => {

  const [dummyData,setDummyData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async() => {
      let product = []
      try {
      const querySnapshot = await getDocs(collection(db,"product"))
      querySnapshot.forEach((doc) => {
        product.push({id:doc.id, ...doc.data()})
      })
      setDummyData(product)
      } catch (error) {
      }
    }
    fetchData()
    setIsLoading(false)
  },[])
  const Navigate = useNavigate()
  if (isLoading) {
    return <div>loading...</div>
  } 
  let uniqueTag = findTag(dummyData)
  const kategoryElement = uniqueTag.map(kategori => {
    let koleksiByCategory = []
    dummyData.map(item => {
      return item.tag === kategori && koleksiByCategory.push(item)
    })
    let displayedProductAtHome = []
    koleksiByCategory.map((item, index) => {
      return index < 5 && displayedProductAtHome.push(item)
    })
    return (
      <div key={kategori} className="mt-[26px]">
        <div className='flex justify-between ml-[34px] mr-[34px] mb-[22px] items-center'>
          <div >koleksi {kategori}</div>
          <div onClick={() => Navigate(`/${kategori}`, { state: koleksiByCategory })} className="text-end text-[16px]">Lihat semua</div>
        </div>
        {/* mapping koleksi hanya sampai 5 product saja */}
        <Swiper
          direction='horizontal'
          spaceBetween={10}
          slidesPerView={2}
          className='ml-[24px] mb-[50px] '
        >
          {displayedProductAtHome.map(item => { 
            return (
              <SwiperSlide key={item.id}>
                <HomeProduct
                  product={item}
                  key={item.id}
                />
              </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>
    )
  })

  return (
    <div>
      <Header pageTitle="Tri Electronics" />
      {kategoryElement}
    </div>
  )
}
