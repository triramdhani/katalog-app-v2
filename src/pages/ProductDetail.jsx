import React, {useState} from 'react'
import { useLocation ,useNavigate,} from 'react-router-dom'
import Header from '../components/Mollecules/Header'
import { AddToCart } from '../components/Organisme/AddToCart'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import formatCurrency from '../utils/formatCurrency'
import discountCalc from '../utils/discountCalc'

function Gambar({image}) {
  return (
    <img  src={`/src/assets/${image}` } className="w-[100vw] h-[180px]"/>    
  )
}

const Product = ({cart, setCart}) => {
  const Navigate = useNavigate()
  const Location = useLocation()
  const product = Location.state

  const [activeVariant, setActiveVariant] = useState(product.variant[0])
  
  return (
    <div>
      <Header pageTitle={product.metaTitle} />
      <Swiper
        direction='horizontal'
        slidesPerView={1}
        spaceBetween={30}
        className="p-6"
      >
        {product.koleksigambarNolinked.map((item, index) => { 
          return (
            <SwiperSlide key={index} className='w-[100vw]'>
            <Gambar  image={item} />
            </SwiperSlide>
            )
          })
        }
      </Swiper>
      <div className='ml-[14px] font-semibold'>{formatCurrency(discountCalc(activeVariant.priceVariant, activeVariant.discountVariant))}</div>
      <div>
        <div className='text-[12px] ml-[18px] '>{activeVariant.discountVariant}% Off</div>
        <div className='text-[12px] ml-[14px] line-through'>{formatCurrency( activeVariant.priceVariant)}</div>
      </div>
      <div className='ml-[18px] text-[16px]'>stock : {activeVariant.stockVariant} </div>

      <div className='flex  gap-5 justify-center'>
        {product.variant.map(item => {
          return (
            <div key={item.idVariant}
              onClick={item.stockVariant >  0 ? ()=> setActiveVariant(item): (e)=> e.preventDefault()}
              className="p-1 border cursor-pointer" >
              <div className={item.stockVariant === 0 ? 'bg-slate-400': ''}>
              {item.namaVariant}
              </div>
            </div>
          )
        })}
      </div>
      <AddToCart cart={cart} setCart={setCart} product={product} activeVariant={activeVariant} />
    </div>
  )
}

export default Product