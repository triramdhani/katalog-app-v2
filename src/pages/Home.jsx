import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Mollecules/HomeHeader'
import HomeProduct from '../components/Mollecules/HomeProduct'
// import dummy from '../data/dummy'
import findTag from '../utils/findTag'
import { Swiper , SwiperSlide } from 'swiper/react'
import 'swiper/css'


export const Home = () => {
  const [dummyData, setDummyData] = useState([])
  React.useEffect(()=> {
    async function fetchApi() {
      const res = await fetch('http://localhost:3000/product')
      const data = await res.json()
      setDummyData(data)
    }
    fetchApi()
    
  }, [])
  const Navigate = useNavigate()
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
