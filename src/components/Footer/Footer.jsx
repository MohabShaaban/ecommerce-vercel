import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Footer.module.css'

export default function Footer() {
    let [count , setCount] = useState(0)
    useEffect(()=> {}, [])
  return (
    <div className='fixed bottom-0 left-0 right-0 text-white p-4 bg-slate-500 text-center text-2xl'>
      <h2>Footer</h2>
    </div>
  )
}
