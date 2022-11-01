import React from 'react'
import {ChevronLeftIcon} from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'

function Header({pageTitle}) {
  const Navigate = useNavigate()
  return (
    <header className="flex justify-between font mt-[34px] mb-[16px] pl-[34px] pr-[22px] ">
      <div className="text-[30px]">{pageTitle}</div>
      <div className="grid place-items-center justify-center  w-[69] h-[95] p-1 border rounded-2xl">
        <div onClick={()=>Navigate(-1)}><ChevronLeftIcon className="h-[24px] w-[32px] "/></div>
      </div>
    </header>
  )
}

export default Header