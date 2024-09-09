import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let UserTokenContext = createContext(null)



export default function UserTokenContextProvider({ children }) {
    let [token, setToken] = useState(null)
    let [userId, setUserId] = useState()
    function convertToken(){
        try {
            let { id } = jwtDecode(window.localStorage.getItem('token'));
            setUserId(id);
        } catch (error) {
            console.error("Failed to decode token:", error);
            setUserId(null);
        }
    }
    
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            convertToken()
            
        }
    }, [])
    return <UserTokenContext.Provider value={{ token, setToken , convertToken , userId }}>
        {children}
    </UserTokenContext.Provider>
}
