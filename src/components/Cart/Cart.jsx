import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { HashLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import CartItem from '../CartItem/CartItem'

export default function Cart(props) {
  let {setCartItemsNo , getCart , removeProduct , updateProductCount , setCartId , cartId , clearCart} = useContext(CartContext)
  let [cartInfo, setCartInfo] = useState([])
  let [noCartInfo, setNoCartInfo] = useState()
  let [isLoading, setIsLoading] = useState(true)
  let navigate  = useNavigate()
  useEffect(() => {
    getCartInfo()
  }, [])
  async function getCartInfo() {
    let { data } = await getCart()
    
    if (data.numOfCartItems) {
    setCartInfo(data)
    } else {
      setNoCartInfo('No cart items found , start shopping')
    }
    setCartItemsNo(data.numOfCartItems)
    setIsLoading(false)
    setCartId(data.cartId)
  }

  async function removeItem(id) {
    let {data} = await removeProduct(id)
    setCartInfo(data)
    getCartInfo()
    setCartItemsNo(data.numOfCartItems)
  }

  async function upadteProduct(id , count) {
    if(count == 0) return
    let {data} = await updateProductCount(id , count)
    setCartInfo(data)
  }

  async function clearAllCart() {
    let {data} = await clearCart()
    
    if (data.message == 'success') {
      setNoCartInfo('no items to show')
    }
  }

  function goToCheckOut(){
    navigate(`/checkout/${cartId}`)
  }

  return (
    <>

      {isLoading ? <div className='flex w-full justify-center mt-10'><HashLoader color='#09c' /></div> :<div className='mt-10'>{noCartInfo?noCartInfo:<div className="w-[70%] mx-auto my-10 relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="text-4xl text-green-500 font-bold text-center my-5">Shipping Cart</h1>
        <div className="flex justify-between px-7">
          <h2 className="text-gray-600 text-2xl">Total cart item : {cartInfo?.numOfCartItems} </h2>
          <h2 className="text-green-600 text-2xl">Total price : {cartInfo.data.totalCartPrice} </h2>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartInfo?.data?.products?.map(ele => <CartItem ele={ele} upadteProduct={upadteProduct} removeItem={removeItem} />)}


          </tbody>
        </table>
        <button onClick={goToCheckOut} className='btn'>Continue to checkout</button>
        <button onClick={clearAllCart} className='bg-red-500 p-2 w-full rounded-md text-white mt-5'>Clear Cart</button>
      </div>}</div> }





    </>
  )
}
