import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    
  return (
    <div>
      <Navbar/>
      <div className='container mx-auto py-10 my-10'>
        <Outlet></Outlet>
      </div>
      <Footer/>
    </div>
  )
}
