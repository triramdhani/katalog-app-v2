import React from 'react'
import {Bars3Icon} from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Link,  NavLink } from 'react-router-dom'

function Header({ pageTitle }) {
  const [modalOpen, setModalOpen ] = useState(false)  
  return (
    <header
      className="flex justify-between mt-[34px] mb-[16px] pl-[34px] pr-[22px] relative">
      <h1
        className="text-[30px] li">
        {pageTitle}
        <span className={"font-semibold"}> Tokopedia</span>
      </h1>
      <div
        className="grid place-items-center justify-center  w-[49] h-[70px] p-1 border rounded-2xl cursor-pointer">
        <Bars3Icon
          className="h-[24px] w-[32px]"
          onClick={() => setModalOpen(prevState => !prevState)} />
      </div>
      <div
        className={modalOpen ? 'absolute right-12 w-[240px] top-10' : 'offscreen'}>
        <div
          className='border text-[17px] p-3 flex flex-col  bg-white rounded-lg'>
          <Link to='/' className={"hover:text-blue-700"}>Home</Link>
          <Link to='/admin'  className={"hover:text-blue-700"}>Admin</Link>
          <hr className={"mt-1 mb-1" } />
          <Link to='' aria-disabled='true'  className={"hover:text-blue-700"}>Login</Link>
        </div>
      </div>
    </header>
  )
}

export default Header