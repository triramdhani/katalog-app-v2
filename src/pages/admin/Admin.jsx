import React from 'react'
import { Link } from 'react-router-dom'
import HomeHeader from '../../components/Mollecules/HomeHeader'

const Admin = () => {
  return (
    <>
      <HomeHeader pageTitle='Admin Dashboard'/>      
      <Link to='/admin/kelola'>go to kelola</Link>
      <Link to='/admin/add'>go to add new prodct</Link>
    </>
  )
}

export default Admin