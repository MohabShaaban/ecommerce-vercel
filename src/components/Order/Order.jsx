import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './Order.module.css'
import { CartContext } from '../../Context/CartContext'
import { UserTokenContext } from '../../Context/UsetTokenContext'
import { Accordion } from "flowbite-react";
import CartItem from '../CartItem/CartItem'


export default function Order() {
  let [orders, setOrders] = useState([])
  let { userId } = useContext(UserTokenContext)
  let { getOrders } = useContext(CartContext)
  useEffect(() => {
    if (userId) {
      getAllOrders(userId);
    }
  }, [userId]);

  async function getAllOrders(id) {
    let { data } = await getOrders(id)
    setOrders(data)
  }

  return (
    <>
      <Accordion className='mt-5'>
      {orders.map(order =><Accordion.Panel>
        <Accordion.Title className={order.isPaid? 'bg-green-200 mb-10 p-15': 'bg-red-200 mb-10 p-15'} >{order.paymentMethodType}</Accordion.Title>
        <Accordion.Content>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {order?.cartItems?.map(ele => <CartItem ele={ele} showAction={false} />)}


          </tbody>
        </table>
        </Accordion.Content>
      </Accordion.Panel> )}

      
    </Accordion>
    </>
  )
}
