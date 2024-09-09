import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Register from './components/Register/Register'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import NotFound from './components/NotFound/NotFound'
import Login from './components/Login/Login'
import UserTokenContextProvider, { UserTokenContext } from './Context/UsetTokenContext'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CartContextProvider, { CartContext } from './Context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import CheckOut from './components/CheckOut/CheckOut'
import Order from './components/Order/Order'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import Wishlist from './components/Wishlist/Wishlist'
import ResetPassword from './components/ResetPassword/ResetPassword'


let query = new QueryClient()

const routes = createBrowserRouter([
  {path:'' , element: <Layout/> ,children:[
    {index : true , element:<ProtectedRoutes><Home/></ProtectedRoutes>},
    {path:'register' , element:<Register/>},
    {path:'home' , element:<ProtectedRoutes><Home/></ProtectedRoutes> },
    {path:'login' , element:<ProtectedRoutes><Login/></ProtectedRoutes>},
    {path:'cart' , element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
    {path:'categories' , element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
    {path:'brands' , element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
    {path:'productdetails/:id/:categoryId' , element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
    {path:'checkout/:cartId' , element:<ProtectedRoutes><CheckOut/></ProtectedRoutes>},
    {path:'allorders' , element:<ProtectedRoutes><Order/></ProtectedRoutes>},
    {path:'forgotpassword' , element:<ForgotPassword/>},
    {path:'wishlist' , element:<ProtectedRoutes><Wishlist/></ProtectedRoutes>},
    {path:'resetpassword' , element:<ResetPassword/>},

    {path:'*' , element:<NotFound/>}
  ]}
])

function App() {
  const [count, setCount] = useState(0)
  let {getCart , setCartItemsNo} = useContext(CartContext)

  useEffect(() => {
    getCartInfo()
  }, [])
  
  async function getCartInfo() {
    let { data } = await getCart()
    setCartItemsNo(data.numOfCartItems)
  }

  return (
    <>
    <QueryClientProvider client={query}>
      <UserTokenContextProvider>
        
        <RouterProvider router={routes}></RouterProvider>
      <Toaster />
      </UserTokenContextProvider>
    </QueryClientProvider>
      
    </>
  )
}

export default App
