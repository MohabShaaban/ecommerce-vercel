import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './CheckOut.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function CheckOut() {
  let [isOnlinePayment, setIsOnlinePayment] = useState(false)
  let {cashOnDelivery , cartId} = useContext(CartContext)
  let navigate = useNavigate()
  useEffect(() => { }, [])

  async function pay(){
    try {
        let url = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
        if (isOnlinePayment) {
            url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`;
        }
        let { data } = await cashOnDelivery(url, myform.values);

        if(data.status === 'success'){
            if(isOnlinePayment){
                window.location.href = data.session.url;
            }else{
                navigate("/allorders");
            }
        }
    } catch (error) {
        console.error("Payment failed:", error);
    }
}

  let myform = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: pay
  }
  )

  return (
    <>
      <h1>Checkout now:</h1>
      <form onSubmit={myform.handleSubmit} className='w-[50%] mx-auto'>
        <div className="mb-5">
          <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
          <input type="text" name='details' onBlur={myform.handleBlur} onChange={myform.handleChange} value={myform.values.details} id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Adress" />
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
          <input type="tel" name='phone' onBlur={myform.handleBlur} onChange={myform.handleChange} value={myform.values.phone} id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone no." />
        </div>
        <div className="mb-5">
          <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
          <input type="text" name='city' onBlur={myform.handleBlur} onChange={myform.handleChange} value={myform.values.city} id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City" />
        </div>
        <input id='online' type='checkbox' onChange={()=>setIsOnlinePayment(!isOnlinePayment)}/>
        <label htmlFor='online'> Pay online</label>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full mt-3  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{
          !isOnlinePayment? 'COD':'Pay Online'
        }</button>
      </form>
    </>
  )
}
