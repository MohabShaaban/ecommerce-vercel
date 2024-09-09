import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Login.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { UserTokenContext } from '../../Context/UsetTokenContext'

export default function Login() {
  
  let navigate = useNavigate()
  let [apiError, setApiError] = useState(null)
  let [isLoading, setIsLoading] = useState(false)
  let {setToken , convertToken} = useContext(UserTokenContext)
  useEffect(() => { }, [])

  function login(formValue) {
    setApiError(null)
    setIsLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formValue)
      .then((res) => {
        let {data} = res
        if(data.message == 'success'){
          localStorage.setItem('token', data.token)
          setToken(data.token)
          convertToken()
          navigate('/home')
        }else{
          
        }
      })
      .catch((err) => {
        setApiError(err.response.data.message)
        setIsLoading(false)
      })
  }


  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email("Invalid email").required('Required'),
      password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}/).required('Required'),

    })
  }

  let myform = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login
  }
  )

  return (
    <>
      {apiError && <div className="max-w-lg mx-auto p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{apiError}</span>
      </div>}
      <h1 className='text-center text-green-500 text-4xl font-bold'>Login</h1>
      <form onSubmit={myform.handleSubmit} className="max-w-lg mx-auto mt-5">
        
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" name='email' onBlur={myform.handleBlur} onChange={myform.handleChange} value={myform.values.email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
        </div>
        {myform.errors.email && myform.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{myform.errors.email}</span>
        </div> : null}

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" name='password' onBlur={myform.handleBlur} onChange={myform.handleChange} value={myform.values.password} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" />
        </div>
        {myform.errors.password && myform.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{myform.errors.password}</span>
        </div> : null}

        <button disabled={isLoading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{
        isLoading? <i className='fa fa-spinner fa-spin'></i> : 'Login'
        }</button>
        <br/>
        <Link to='/forgotpassword'>Forgot password?</Link>
      </form>
    </>
  )
}
