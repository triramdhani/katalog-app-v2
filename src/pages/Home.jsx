import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Mollecules/HomeHeader'
import HomeProduct from '../components/Mollecules/HomeProduct'
import { Swiper , SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase'
import findTag from '../utils/findTag'

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
        <div
          className='flex justify-between ml-[34px] mr-[34px] mb-[22px] items-center'>
          <div
            className='text-[25px]'>koleksi <span className='font-semibold'>{kategori}</span>
          </div>
          <div
            onClick={() => Navigate(`/${kategori}`)}
            className="text-end text-[14px] hover:text-blue-600 cursor-pointer">Lihat semua
          </div>
        </div>
        <Swiper
          direction='horizontal'
          spaceBetween={10}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            780: {
              slidesPerView: 4,
              spaceBetween: 1,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween:10
            }
          }}
          className='ml-[24px] mb-[50px] '>
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
    <>
      <Header pageTitle="Tiruannya" />
      <div>
        
      </div>
      {kategoryElement}
    </>
  )
}
