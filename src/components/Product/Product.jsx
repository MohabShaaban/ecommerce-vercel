import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Product.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { WishlistContext } from '../../Context/WishlistContext'
import { CartContext } from '../../Context/CartContext'

export default function Product({ product, addCart, loading , addWishlist , wishlistids, getProduct}) {
  let [currentId, setCurrentId] = useState(null)
  useEffect(() => {
  }, [])
  
  
  return (
    <div className='w-1/3 lg:w-1/4 xl:w-1/6  p-1'>
      <div className='product hover:rounded-md overflow-hidden'>
        <div>
          <Link to={`/productdetails/${product.id}/${product.category._id}`}>
            <img src={product.imageCover} className='w-full' alt={product.title} />
            <span className='text-green-500'>{product.category?.name}</span>
            <h2 className='font-bold mb-3'>{product.title.split(' ').splice(0, 2).join(' ')} </h2>
            <div className='flex justify-between'>
              <span>{product.price} EGP</span>
              <span>{product.ratingsAverage}<i className='fa fa-star text-yellow-300'></i>  </span>
            </div>
          </Link>
        </div>
        <div className='px-3 pb-3'>
          <button onClick={() => addWishlist(product.id)}>{wishlistids?.includes(product.id) ? <i className='fa fa-heart text-green-500 text-xl'></i> :<i className='fa-regular fa-heart text-green-500 text-xl'></i> }</button>
          <button className='btn' onClick={() => { addCart(product.id); setCurrentId(product.id) }}>
            {loading && product.id == currentId? <i className='fa fa-spinner fa-spin'></i> : <span>+ Add to cart</span>}
          </button>
        </div>
      </div>
    </div>
  )
}
