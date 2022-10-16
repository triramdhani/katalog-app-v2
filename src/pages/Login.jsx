import React, { useState, useEffect, useRef ,useContext } from 'react'
import axios from '/src/api/axios'
import AuthContext from '../hooks/AuthProvider'

const LOGIN_URL = 'register'

export const Login = () => {
  const {setAuth} = useContext(AuthContext)
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [succes, setSucces] =useState('') //pada realita menggunakan router navigate jika login succes
  
  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user,pwd])

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      // seharusnya menggunakan method post dan mendapat responses berupa acces token dan roles. karena belum ada api back end jadi sementara ambil data yang ada di register aja.
      const response = await axios.get(LOGIN_URL)
      const data = response.data;
      if (data.user === user && data.pwd === pwd) {
        let roles = "admin"
        setAuth({user, pwd , accesToken, roles})
        setSucces(true)    
        setUser('')
        setPwd('')
      } alert('username & password salah!')
    } catch (error) {
      if (!err?.response) {
        setErrMsg('No server Response')
      } else if (err.response?.status === 409) {
        setErrMsg('Login Failed')
      } else {
        setErrMsg('Login Failed')
      }
    }
  }


  return (
    <section>
      <p ref={errRef} className={errMsg ? "nstruction" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              id='username'
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className='border-2 border-gray-700 rounded'
            />
            <br />

            <label htmlFor="password">
              Password:
            </label>
            <input
              type="text"
              id='password'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              className='border-2 border-gray-700 rounded'
            />
            <br />
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'>Sign In</button>
      </form>
          <p>
            Need an account? <br />
            <span className='line'>
              {/* putrouter */}
              <a href="#">Sign up</a>
            </span>
          </p>
    </section>
  )
}