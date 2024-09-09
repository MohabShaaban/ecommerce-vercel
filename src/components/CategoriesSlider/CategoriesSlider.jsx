import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './CategoriesSlider.module.css'
import Slider from 'react-slick'
import axios from 'axios'

export default function CategoriesSlider() {
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
    <Slider {...settings} className='my-8'>
        {categories.map(category => <div key={category._id} className='p-3'>
          <img className='w-full h-[200px]' src={category.image} alt='' />
          <h2>{category.name}</h2>
        </div>
        )}
      </Slider>
  )
}
