import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider  = ({children})=>{
    const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
});

    // Save to localStorage when user changes
    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(user))
    },[user]);

    const login = (userData)=>{
         setUser(userData)
    }
    const logOut = ()=>{
        setUser(null)
    }
    return (
    <AuthContext.Provider value={{user,login,logOut}}>
      {children}
    </AuthContext.Provider>)
    
}