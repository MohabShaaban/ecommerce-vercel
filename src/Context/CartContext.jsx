import axios from "axios";
import { createContext, useState } from "react";

function createHeaders() {
    return {
        token: window.localStorage.getItem('token')
    };
}


export let CartContext = createContext();


function addProductToCart(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        {productId},
        {
            headers : createHeaders()
        }
    ).then()
    .catch()
}

function getCart(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
            headers : createHeaders()
        }
    ).then()
    .catch()
}

function clearCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
            headers : createHeaders()
        }
    ).then()
    .catch()
}

function removeProduct(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {headers : createHeaders()}).then().catch()
}

function updateProductCount(id,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {count} , {headers : createHeaders()}).then().catch()
}

function cashOnDelivery(url , shippingAdress){
    return axios.post(url , {shippingAdress} , {headers : createHeaders()}).then().catch()
}

function getOrders(userId){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`).then().catch()

}

export default function CartContextProvider({children}){
    let [cartId , setCartId] = useState(null)
    let [cartItemsNo , setCartItemsNo] = useState(null)
    return <CartContext.Provider value={{clearCart , cartItemsNo , setCartItemsNo , getOrders , cartId , setCartId ,addProductToCart , getCart , removeProduct , updateProductCount , cashOnDelivery}}>
        {children}
    </CartContext.Provider>
}