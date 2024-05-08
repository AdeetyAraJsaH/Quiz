import React, { useState } from 'react'
import UserContext from './context'

const UserContextProvider = ({ children }) => {

    const [isLogin, setIsLogin] = useState(false)
    const [userEmail, setUserEmail] = useState('User Name')
    
    return (
        <UserContext.Provider value={{ isLogin, setIsLogin, userEmail, setUserEmail }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider