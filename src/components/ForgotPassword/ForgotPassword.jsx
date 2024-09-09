import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './ForgotPassword.module.css'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  let [count, setCount] = useState(0)
  useEffect(() => { }, [])
  let navigate = useNavigate()

  async function sendCode(email) {
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', email).then().catch()
    if (data.statusMsg == 'success') {
      document.querySelector('.forgotPassword').classList.add('hidden')
      document.querySelector('.verifyCode').classList.remove('hidden')
    }
  }

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email("Invalid email").required('Required')
    })
  }

  let myform = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema,
    onSubmit: sendCode
  }
  )
  async function verifyCode(resetCode) {
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', resetCode).then().catch()
    if (data.status == "Success") {
      navigate('/resetpassword')
    }
  }

  const validationSchema2 = () => {
    return Yup.object({
      resetCode: Yup.string().matches(/^\d{6}$/ , 'Code invalid').required('Required')
    })
  }

  let myform2 = useFormik({
    initialValues: {
      resetCode: ""
    },
    validationSchema : validationSchema2,
    onSubmit: verifyCode
  }
  )
  return (
    <>
      <div className='forgotPassword'>
      <h1 className='text-center text-green-500 text-4xl font-bold'>Forgot password</h1>
      <form onSubmit={myform.handleSubmit} className="max-w-lg mx-auto mt-5">
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" name='email' onBlur={myform.handleBlur} onChange={myform.handleChange} value={myform.values.email} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
        </div>
        {myform.errors.email && myform.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{myform.errors.email}</span>
        </div> : null}
        <button disabled={!(myform.isValid && myform.dirty)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Code</button>
      </form>
      </div>
      <div className='verifyCode hidden'>
      <h1 className='text-center text-green-500 text-4xl font-bold'>Verify code</h1>
      <form onSubmit={myform2.handleSubmit} className="max-w-lg mx-auto mt-5">
        <div className="mb-5">
          <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your resetCode</label>
          <input type="text" name='resetCode' onBlur={myform2.handleBlur} onChange={myform2.handleChange} value={myform2.values.resetCode} id="resetCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Code" />
        </div>
        {myform2.errors.resetCode && myform2.touched.resetCode ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{myform2.errors.resetCode}</span>
        </div> : null}
        <button disabled={!(myform2.isValid && myform2.dirty)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset Password</button>
      </form>
      </div>
    </>
  )
}
