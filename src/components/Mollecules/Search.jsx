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
      <input type="text" ref={searchRef} onChange={handleChange} className="border outline-none rounded-md border-slate-900 mr-1"/>
      <button className='border px-3 rounded-md' onClick={handleSearch}>Cari</button>
    </div>
  )
}

export default Search