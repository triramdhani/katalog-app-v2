import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = () => {
  let token = localStorage.getItem('token')
  const {currentUser} = useContext(AuthContext)
  const curentUser = true
  return (
    curentUser ? <Outlet/> : <Navigate to='/login' replace/>
  )
}

export default ProtectedRoute