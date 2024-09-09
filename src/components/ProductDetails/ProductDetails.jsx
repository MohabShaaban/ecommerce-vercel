import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { HashLoader, PacmanLoader } from 'react-spinners'
import Product from '../Product/Product'
import Slider from 'react-slick'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function ProductDetails() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  let [productDetails, setProductDetails] = useState()
  let [relatedProduct, setRelatedProduct] = useState([])
  let { id, categoryId } = useParams()
  let {addProductToCart , cartItemsNo , setCartItemsNo} = useContext(CartContext)
  useEffect(() => {
    getProductdetails()
    getRelatedProducts()
  }, [])
  useEffect(() => {
    getProductdetails()
  }, [id])

  async function addToCartItem(id){
    let data = await  addProductToCart(id)
    if(data.data.status == 'success'){
      let newCartItemNo = cartItemsNo + 1
      setCartItemsNo(newCartItemNo)
      toast.success(data.data.message , {
        position: 'bottom-right'
      })
    }else{
      toast.error(data.response.data.message,{
        position :'bottom-right'
      })
    }

  }


  function getProductdetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }


  let { data , isLoading } = useQuery({
    queryKey: ['Details' , id],
    queryFn: getProductdetails,
    select: (data) => data?.data.data
  })

  useEffect(() => {
      setProductDetails(data)
  }, [data])

  function getRelatedProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        getFilteredData(data.data)
      })
      .catch();
  }
  function getFilteredData(data) {
    let res = data.filter(ele => ele.category._id == categoryId && ele.id != id)
    setRelatedProduct(res)
  }
  return (
    <>

      {isLoading  ?
        <div className='flex w-full justify-center'><HashLoader color='#09c' /></div>
        :
        <div className='row items-center'>
          <div className='w-1/3 p-6 mt-10'>
            <Slider {...settings}>
              {productDetails?.images.map(src => <img key={id} src={src} />)}
            </Slider>
          </div>
          <div className='w-2/3'>
            <h2 className='text-4xl font-semibold mb-3'>{productDetails?.title}</h2>
            <p className='mb-5 text-gray-400 font-light'>{productDetails?.description}</p>
            <span className='mb-2 block'>{productDetails?.category.name}</span>
            <div className='flex justify-between'>
              <span>{productDetails?.price} EGP</span>
              <span>{productDetails?.ratingsAverage} <i className='fa fa-star text-yellow-300'></i></span>
            </div>
            <button className='btn' onClick={()=>addToCartItem(productDetails?.id)}>+ Add to cart</button>
          </div>
        </div>
      }
      <h2 className='text-green-500 text-3xl mb-3'></h2>

      <div className='row'>
        {relatedProduct.map(product => <Product key={product.id} product={product} />)}
      </div>

    </>
  )
}
