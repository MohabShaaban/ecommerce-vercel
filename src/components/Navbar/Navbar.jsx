import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserTokenContext } from '../../Context/UsetTokenContext'
import { CartContext } from '../../Context/CartContext'

export default function Navbar() {
    let [count , setCount] = useState(0)
    let {token , setToken} = useContext(UserTokenContext)
    let {cartItemsNo} = useContext(CartContext)
    let navigate  = useNavigate()
    useEffect(()=> {}, [])
    function logout(){
      setToken(null)
      localStorage.removeItem('token')
      navigate('/login')
    }
  return (
    <nav className='bg-slate-300 p-2 lg:fixed left-0 right-0 top-0 z-50'>
      <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center'>
        <div className='text-center flex flex-col items-center lg:flex-row'>
          <img width={120} src={logo} alt='' className='mr-4 ml-2 mb-4 lg:mb-0' />
          {token? <ul className='flex flex-col lg:flex-row gap-2 text-xl'>
            <li>
              <NavLink to='home'><span>Home</span></NavLink>
            </li>
            <li>
              <NavLink to='cart'><span>Cart</span></NavLink>
            </li>
            <li>
              <NavLink to='brands'><span>Brands</span></NavLink>
            </li>
            <li>
              <NavLink to='categories'><span>Categories</span></NavLink>
            </li>
            <li>
              <NavLink to='allorders'><span>Orders</span></NavLink>
            </li>
            <li>
              <NavLink to='wishlist'><span>Wishlist</span></NavLink>
            </li>
          </ul> : null}
        </div>
        <ul className='flex flex-col items-center gap-2 lg:flex-row'>
        {token?<NavLink to='cart'>
          <li className='mx-10 relative py-5'>
        <i className='fa fa-cart-shopping text-green-600 text-3xl'></i>
        <div className='bg-green-800 absolute py-1 px-2 rounded-xl top-0 right-0 text-white '>{cartItemsNo}</div>
        </li> 
        </NavLink>:''}
          <li>
            <i className='fa-brands fa-facebook mx-1'></i>
            <i className='fa-brands fa-instagram mx-1'></i>
            <i className='fa-brands fa-tiktok mx-1'></i>
            <i className='fa-brands fa-facebook mx-1'></i>
            <i className='fa-brands fa-youtube mx-1'></i>
          </li>
          {token? <li>
            <button onClick={logout}>Sign out</button>
          </li> : <>
          <li>
            <NavLink to='register'>Register</NavLink>
          </li>
          <li>
            <NavLink to='login'>Login</NavLink>
          </li>
          </> }
          
         
         </ul>
      </div>
    </nav>
  )
}
