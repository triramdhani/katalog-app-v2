import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

const Search = ({Search, setSearch, handleChange, handleSearch}) => {
  const searchRef = useRef()
  let keyword 
  useEffect(() => {
    keyword = searchRef.current.value
  },[Search])

  return (
    <div>
      <input type="text" ref={searchRef} onChange={handleChange} className="border"/>
      <button className='border ' onClick={handleSearch}>Cari</button>
    </div>
  )
}

export default Search