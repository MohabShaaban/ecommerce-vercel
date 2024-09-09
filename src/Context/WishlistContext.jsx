import axios from "axios";
import { createContext, useState } from "react";

function createHeaders() {
    return {
        token: window.localStorage.getItem('token')
    };
}

export let WishlistContext = createContext();


function addProductToWishlist(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        {
            headers: createHeaders()
        }
    ).then()
        .catch()
}

function getWishlist() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
            headers: createHeaders()
        }
    ).then()
        .catch()
}

function removeProductFromWishlist(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers: createHeaders() }).then().catch()
}

export default function WishlistContextProvider({children}){
    return <WishlistContext.Provider value={{addProductToWishlist , getWishlist , removeProductFromWishlist}}>
        {children}
    </WishlistContext.Provider>
}