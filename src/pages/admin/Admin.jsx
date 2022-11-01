import React from 'react'
import { Link } from 'react-router-dom'
import HomeHeader from '../../components/Mollecules/HomeHeader'

const Admin = () => {
  return (
    <>
      <HomeHeader pageTitle='Admin Dashboard'/>      
      <section className={" mt-8 items-center text-center text-lg"}>
        <button className={"px-3 py-2 border rounded-lg bg-blue-800 text-white "}>
          <Link to='/admin/kelola'>go to kelola product</Link>
        </button>
        <br />
        <div>Or</div>
        <button className={"px-3 py-2 border rounded-lg bg-red-600 text-white"}>
          <Link to='/admin/add'>go to add new prodct</Link>
        </button>
      </section>
    </>
  )
}

export default Admin