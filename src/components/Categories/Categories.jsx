import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Categories.module.css'
import axios from 'axios'
import Slider from 'react-slick'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'

export default function Categories() {
  let [categories, setCategories] = useState([])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,

  };
  useEffect(() => {
    getCategories()
  }, [])

  function getCategories() {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(({ data }) => setCategories(data.data))
      .catch()
  }
  return (
    <>
      <h1 className='text-center text-green-500 text-4xl font-bold mt-5'>Categories</h1>
      <CategoriesSlider/>
      <div className='row'>
        {categories.map(category => <div key={category._id} className='p-3 w-full md:w-1/2 lg:w-1/4'>
          <div className='product hover:rounded-md overflow-hidden'>
            <img className='w-full h-[500px]' src={category.image} alt='' />
            <h2>{category.name}</h2>
          </div>
        </div>
        )}
      </div>

    </>
  )
}
