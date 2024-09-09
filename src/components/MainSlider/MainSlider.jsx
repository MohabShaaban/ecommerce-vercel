import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './MainSlider.module.css'
import Slider from 'react-slick'
import slider1 from '../../assets/images/blog-img-1.jpeg'
import slider2 from '../../assets/images/blog-img-2.jpeg'
import slider3 from '../../assets/images/assortment-citrus-fruits.png'



export default function MainSlider() {
    let [count , setCount] = useState(0)
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    };
    useEffect(()=> {}, [])
  return (
    <div className='row'>
      <div className='w-3/4'>
        <Slider {...settings}>
          <img src={slider1} className='h-[400px]'/>
          <img src={slider2} className='h-[400px]'/>
          <img src={slider3} className='h-[400px]'/>
        </Slider>
      </div>
      <div className='w-1/4'>
      <img src={slider2} className='h-[200px]'/>
          <img src={slider1} className='h-[200px]'/>

      </div>
    </div>
  )
}
