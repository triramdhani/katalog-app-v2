import React from 'react'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { LabelTotalProduct } from '../components/Atoms/LabelTotalProduct'
import { CollectionProduct } from '../components/Mollecules/CollectionProduct'
import Header from '../components/Mollecules/Header'

function Collection() {
  const {slug} = useParams()
  const Location = useLocation()
  const koleksi = Location.state
  console.log(koleksi);

  return (
    <div> 
      <Header pageTitle={slug} />
      <LabelTotalProduct total={Location.state.length}/>
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