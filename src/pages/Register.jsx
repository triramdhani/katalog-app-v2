import React, { useState, useEffect, useRef } from 'react'
import axios from '/src/api/axios.js'
import {CheckCircleIcon} from '@heroicons/react/20/solid'
import {XCircleIcon} from '@heroicons/react/20/solid'
import {ExclamationCircleIcon} from '@heroicons/react/20/solid'

let USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
let PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
let REGISTER_URL = '/register'

const Register = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [user, setuser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setpwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [succes, setSucces] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user)
    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    setValidPwd(result)
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL,
          JSON.stringify({user, pwd}),
          {
            headers: { "Content-Type": 'application/json' },
            withCredentials: true
          }
      )
      setSucces(true)
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server Response')
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken')
      } else {
        setErrMsg('Registration Failed')
      }
    }
  }
  
  return (
    <>
      {succes === true ?
        <section>
          <h1>Succes!</h1>
          <p><a href="#">Sign In</a></p>
        </section> : (
        <section>
          <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive"> {errMsg}</p>
          <h1>Register</h1>
          <form
              onSubmit={handleSubmit}
              className="block"
            >
            <label htmlFor="username">
              Username:
                <span className={!validName ? "offscreen": ""}> <CheckCircleIcon className='w-[20px] h-[20px]' /></span>
                <span className={validName || !user ? "offscreen": ""}> <XCircleIcon className='w-[20px] h-[20px]' /></span>
            </label>
            <input
              type="text"
              id='username'
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setuser(e.target.value)}
              required
              aria-invalid={validName ? 'false' : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className="border-gray-700 border-2 rounded"
            />
            <p id='uidnote' className={userFocus && user && !validName ? "instruction" : "offscreen"}>
              2 to 4 character. <br />
              Must begin with a Letter. <br />
              Letters, numbers, underscore, hypehns allowed
            </p>
            <br />
            <label htmlFor="password">
              password:
                <span className={!validPwd ? "offscreen": ""}> <CheckCircleIcon className='w-[20px] h-[20px]' /></span>
                <span className={validPwd || !pwd ? "offscreen": ""}> <XCircleIcon className='w-[20px] h-[20px]' /></span>
            </label>
            <input
              type="text"
              id='password'
              onChange={(e) => setpwd(e.target.value)}
              required
              aria-invalid={validName ? 'false' : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              className="border-2 border-gray-700 rounded"
            />
            <p id='pwdnote' className={pwdFocus && !validPwd ? "instruction" : "offscreen"}>
              2 to 4 character.  <br />
              Must Include uppercase and lowercase, a number, and a special character. <br />
              allowed specials character <span aria-label='exclmation mark'>!</span> <span aria-label='at symbol'>@</span><span aria-label='hashtag'>#</span><span aria-label='dolar sign'>$</span><span aria-label='percent'>%</span>
            </p>
            <br />
            <label htmlFor="confirm_pwd">
              Confirm password:
                <span className={!validMatch ? "offscreen": ""}> <CheckCircleIcon className='w-[20px] h-[20px]' /></span>
                <span className={validMatch || !matchPwd ? "offscreen": ""}> <XCircleIcon className='w-[20px] h-[20px]' /></span>
            </label>
            <input
              type="text"
              id='confirm_pwd'
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validName ? 'false' : "true"}
              aria-describedby="matchnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              className="border-2 border-gray-700 rounded"
            />
            <p id='matchnote' className={matchFocus && !validMatch ? "instruction" : "offscreen"}>
              harus sama password
            </p> 
           <br />
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded items-center'>Sign Up</button>
          </form>

          <p>
            Alredy registered? <br />
            <span className='line'>
              <a href="#">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  )
}

export default Register