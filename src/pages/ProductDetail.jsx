import React, {useState, useEffect} from 'react'
import { useLocation ,useNavigate, useParams} from 'react-router-dom'
import Header from '../components/Mollecules/Header'
import { AddToCart } from '../components/Organisme/AddToCart'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'
import discountCalc from '../utils/discountCalc'
import formatCurrency from '../utils/formatCurrency'

const Gambar = ({image})=> {
  return (
    <img  src={image} className="w-[100vw] h-[180px] object-contain"/>    
  )
}

const Product = ({cart, setCart}) => {
  const slug = useParams()
  const Navigate = useNavigate()
  const [product, setProduct] = useState([]) 
  const [activeVariant, setActiveVariant] = useState({})
  const [notif, setNotif] = useState(false)
  const [isLoading, setIsLoading]= useState(true)

    const fetchData = async () => {
      const docRef = doc(db, "product", slug.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data())
        setActiveVariant(docSnap.data().variant[0])
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
    return <div>loading..</div>
  }

  return (
    <div>
       <Header pageTitle={product.metaTitle} />
      <Swiper
        direction='horizontal'
        slidesPerView={1}
        spaceBetween={30}
        className="p-6"
      >
        {product.koleksiGambarNolinked.map((item, index) => { 
          return (
            <SwiperSlide key={index} className='w-[100vw]'>
            <Gambar  image={item} />
            </SwiperSlide>
            )
          })
        }
      </Swiper>
      <div className='ml-4 mr-4 mt-2 mb-2'>
          <div
            className='ml-[18px] text-[20px] font-bold mb-1'>{formatCurrency(discountCalc(activeVariant.priceVariant, activeVariant.discountVariant))}
          </div>
          <div className='text-[12px] ml-[18px] '><span className={'border bg-slate-300 p-[2px] rounded-md font-medium'}>{activeVariant.discountVariant}%</span>
            <span className='text-[13px] text-slate-700 ml-[14px] line-through'>{formatCurrency( activeVariant.priceVariant)}</span>
          </div>
          <div className='ml-[18px] mb-[20px] text-[16px]'>
            stock : {activeVariant.stockVariant}
          </div>
        <hr />
          <div className='ml-[18px] mt-[20px] mb-[10px] font-semibold'>Pilih Variant: <span className='font-medium text-slate-700'>{activeVariant.namaVariant}</span></div>

        <div className='flex  gap-5 mt-[10px] mb-[20px] justify-center'>
          {product.variant.map(item => {
            return (
              <div key={item.idVariant}
                onClick={item.stockVariant >  0 ? ()=> setActiveVariant(item): (e)=> e.preventDefault()}
                className={`p-1 border cursor-pointer rounded text-slate-700 ${activeVariant.idVariant === item.idVariant ? ' bg-slate-200 border-green-400 text-green-900': ''}`} >
                <div className={item.stockVariant === 0 ? 'bg-slate-400': ''}>
                {item.namaVariant}
                </div>
              </div>
            )
          })}
        </div>
        <hr />
      </div>
      
      <AddToCart cart={cart} setCart={setCart} product={product} activeVariant={activeVariant} setNotif={setNotif} /> 
    </div>
  )
}

export default Product