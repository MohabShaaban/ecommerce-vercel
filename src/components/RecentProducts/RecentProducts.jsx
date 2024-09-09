import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './RecentProducts.module.css'
import axios from 'axios'
import Product from '../Product/Product'
import { useQuery } from '@tanstack/react-query'
import { HashLoader } from 'react-spinners'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishlistContext } from '../../Context/WishlistContext'

export default function RecentProducts() {

  let {addProductToCart , cartItemsNo , setCartItemsNo} = useContext(CartContext)
  let {addProductToWishlist} = useContext(WishlistContext)
  let [Loading , SetLoading] = useState(false) 
  let [wishlistId , setWishlistId] = useState(null)
  let {getWishlist} = useContext(WishlistContext)


  useEffect(() => {
    getWishlistProductsId()
    getProducts()
  }, [wishlistId])



  async function getWishlistProductsId(){
    let {data} = await getWishlist()
    setWishlistId(data.data.map(product => product.id))
  }


  function getProducts(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  let {isLoading, data, isError } = useQuery({
    queryKey: ['Products'],
    queryFn: getProducts
  })



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

  async function addToWishlist(id) {
    let data = await addProductToWishlist(id);
    if(data.data.status == 'success'){
      toast.success(data.data.message ,{
        position: 'bottom-right'
      })
    }else{
      toast.error(data.response.data.message,{
        position :'bottom-right'
      })
    }
  }

  if(isLoading){
    return <div className='flex w-full justify-center'><HashLoader color='#09c' /></div>
  }

  return (
    <>
    <div className='row'>
      {data?.data.data.map(product => 
       <Product key={product.id} loading={Loading} wishlistids={wishlistId} getProduct = {getProducts} addWishlist = {addToWishlist} addCart = {addToCartItem} product={product}/>
      )}
    </div>
   </>
  )
}
