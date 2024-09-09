import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Wishlist.module.css'
import { WishlistContext } from '../../Context/WishlistContext'
import { HashLoader } from 'react-spinners'
import WishlistItem from '../WishlistItem/WishlistItem'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function Wishlist() {
    let [count , setCount] = useState(0)
  let {addProductToCart , cartItemsNo , setCartItemsNo} = useContext(CartContext)

    let {getWishlist , removeProductFromWishlist} = useContext(WishlistContext)
    let [wishlistInfo, setwishlistInfo] = useState([])
    let [noWishlistInfo, setNoWishlistInfo] = useState()
    let [isLoading, setIsLoading] = useState(true)
    let [Loading , SetLoading] = useState(false) 

    useEffect(()=> {
      getWishlistInfo()
    }, [])

    async function getWishlistInfo(){
      let {data} = await getWishlist()
      if (data.count){
        setwishlistInfo(data)
        setIsLoading(false)
      }else{
        setNoWishlistInfo('no thing to show here')
        setIsLoading(false)
      }
      
    }

    async function addToCartItem(id){
      SetLoading(true)
      let data = await  addProductToCart(id)
      if(data.data.status == 'success'){
        let newCartItemNo = cartItemsNo + 1
        setCartItemsNo(newCartItemNo)
        toast.success(data.data.message ,{
          position: 'bottom-right'
        })
      }else{
        toast.error(data.response.data.message,{
          position :'bottom-right'
        })
      }
      SetLoading(false)
    }

    async function removeProductFromWishlistitem(id) {
      let {data} = await removeProductFromWishlist(id)
      setwishlistInfo(data)
      getWishlistInfo()
    }

  return (
    <>

      {isLoading ? <div className='flex w-full justify-center mt-10'><HashLoader color='#09c' /></div> :<div className='mt-10'>{noWishlistInfo?noWishlistInfo:<div className="w-[70%] mx-auto my-10 relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="text-4xl text-green-500 font-bold text-center my-5">Wishlist</h1>
        <div className="flex justify-between px-7">
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
                Add to cart
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
            {wishlistInfo?.data?.map(ele => <WishlistItem loading = {Loading} ele={ele} addCart={addToCartItem} removeItem={removeProductFromWishlistitem} />)}


          </tbody>
        </table>
      </div>}</div> }





    </>
  )
}