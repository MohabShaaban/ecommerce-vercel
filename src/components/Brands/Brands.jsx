import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Brands.module.css'
import axios from 'axios'
import { data } from 'autoprefixer'

export default function Brands() {
  let [brands, setBrands] = useState()
  useEffect(() => {
    getBrands()
  }, [])

  async function getBrands() {
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    setBrands(data)
  }


  return (
    <>
      <h1 className='text-center text-green-500 text-4xl font-bold mt-5'>Brands</h1>
      <div className='row'>
        {brands?.data?.map(brand => <>
          <div className='w-[80%] text-center md:w-1/2 lg:w-1/4 p-1'>
            <div className='product hover:rounded-md overflow-hidden'>
              <div>
                  <img src={brand.image} className='w-full' alt={brand.name} />
                  <h2 className='font-bold mb-3 text-center'>{brand.name} </h2>
              </div>
            </div>
          </div>
        </>)}
      </div>

    </>
  )
}
