import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Home.module.css'
import axios from 'axios'
import RecentProducts from '../RecentProducts/RecentProducts'
import Categories from '../Categories/Categories'
import MainSlider from '../MainSlider/MainSlider'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'

export default function Home() {
    return(
      <>
      <MainSlider></MainSlider>
      <CategoriesSlider></CategoriesSlider>
      <RecentProducts></RecentProducts>
      </>
      
    )
}
