import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './ResetPassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'


export default function ResetPassword() {
    let [count , setCount] = useState(0)
    useEffect(()=> {}, [])
    let navigate = useNavigate()
    const validationSchema = () => {
      return Yup.object({
        email: Yup.string().email("Invalid email").required('Required'),
        newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}/).required('Required'),
  
      })
    }
  
    async function resetPassword(newpass) {
      let {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword" , newpass)
      if(data.token){
        navigate('/login')
      }
    }
    
    let myform = useFormik({
      initialValues: {
        email: "",
        newPassword: "",
      },
      validationSchema,
      onSubmit: resetPassword
    }
    )
  return (
    <>
      <h1 className='text-center text-green-500 text-4xl font-bold'>Reset Password</h1> 
      <form onSubmit={myform.handleSubmit} className="max-w-lg mx-auto mt-5">
        
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" name='email' onBlur={myform.handleBlur} onChange={myform.handleChange} value={myform.values.email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
        </div>
        {myform.errors.email && myform.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{myform.errors.email}</span>
        </div> : null}

        <div className="mb-5">
          <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your newPassword</label>
          <input type="password" name='newPassword' onBlur={myform.handleBlur} onChange={myform.handleChange} value={myform.values.newPassword} id="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" />
        </div>
        {myform.errors.newPassword && myform.touched.newPassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{myform.errors.newPassword}</span>
        </div> : null}
        <button disabled={!(myform.isValid && myform.dirty)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset Password</button>
      </form>
    </>
  )
}
