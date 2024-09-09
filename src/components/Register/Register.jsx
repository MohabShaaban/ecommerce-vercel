import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  let navigate = useNavigate()
  let [apiError, setApiError] = useState(null)
  let [isLoading, setIsLoading] = useState(false)
  useEffect(() => { }, [])

  function register(formValue) {
    setApiError(null)
    setIsLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formValue)
      .then((res) => {
        let {data} = res
        if(data.message == 'success'){
          navigate('/login')
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
      name: Yup.string().min(3, 'not less than 3').max(15, 'max is 15').required('Required'),
      email: Yup.string().email("Invalid email").required('Required'),
      password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}/).required('Required'),
      rePassword: Yup.string().oneOf([Yup.ref('password'), 'Repassword should match password']).required('Required'),
      phone: Yup.string().matches(/^01[0125][0-9]{8}$/).required('Required')

    })
  }

  let myform = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema,
    onSubmit: register
  }
  )

  return (
    <>
      <h1 className='text-center text-green-500 text-4xl font-bold'>Register</h1>
      {apiError && <div className="max-w-lg mx-auto p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">{apiError}</span>
      </div>}
      <form onSubmit={myform.handleSubmit} className="max-w-lg mx-auto mt-5">
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
          <input type="text" name='name' onBlur={myform.handleBlur} onChange={myform.handleChange} value={myform.values.name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your name" />
        </div>
        {myform.errors.name && myform.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{myform.errors.name}</span>
        </div> : null}

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

        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Repassword</label>
          <input type="password" name='rePassword' onBlur={myform.handleBlur} onChange={myform.handleChange} value={myform.values.rePassword} id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="RePassword" />
        </div>
        {myform.errors.rePassword && myform.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{myform.errors.rePassword}</span>
        </div> : null}
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
          <input type="tel" name='phone' onBlur={myform.handleBlur} onChange={myform.handleChange} value={myform.values.phone} id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone no." />
        </div>
        {myform.errors.phone && myform.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{myform.errors.phone}</span>
        </div> : null}
        <button disabled={isLoading} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{
        isLoading? <i className='fa fa-spinner fa-spin'></i> : 'Submit'
        }</button>
      </form>
    </>
  )
}
