import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './WishlistItem.module.css'

export default function WishlistItem({loading ,ele , showAction , addCart , removeItem}) {
    let [count , setCount] = useState(0)
    let [currentId, setCurrentId] = useState(null)
    if(showAction == undefined){
      showAction = true
    }
    useEffect(()=> {}, [])
  return (
    <>
      <tr key={ele.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img src={ele.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {ele.title}
              </td>
              <td className="px-6 py-4">

                {showAction?<button className='btn' onClick={() => { addCart(ele.id); setCurrentId(ele.id) }}>
            {loading && ele.id == currentId? <i className='fa fa-spinner fa-spin'></i> : <span>+ Add to cart</span>}
          </button>
                  :null}
                
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {ele.price} EGP
              </td>
              {showAction?<td className="px-6 py-4">
                <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={()=>removeItem(ele.id)}>Remove</a>
              </td>:null}
              
            </tr>
    </>
  )
}
