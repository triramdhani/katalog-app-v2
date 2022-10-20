import React, {useState} from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const Navigate = useNavigate()
  const {dispatch} = useContext(AuthContext)
  const [errMsg, setErrMsg] =useState(false)
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const handleLogin = (e) => {
    e.preventDefault()
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    dispatch({type : "LOGIN", payload:user})
    Navigate('/admin')
    // ...
  })
  .catch((error) => {
    setErrMsg(error)
  });

  }
  return (
    <div className='login h-[100vh] flex justify-center items-center'>
      <form className='flex flex-col text-center' onSubmit={handleLogin}>
        <input type="email" placeholder='email' className='w-[200px] h-[40px] m-[10px] border-2 border-slate-800 ' onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder='password'className='w-[200px] h-[40px] m-[10px] border-2 border-slate-800 ' onChange={(e)=>setPassword(e.target.value)}/>
        <button type='submit' className='w-[200px] h-[50px] border-none bg-purple-600 font-bold'>Login</button>
        {errMsg && <span>Wrong email or password</span> }
        
      </form>
    </div>
  )
}

export default Login