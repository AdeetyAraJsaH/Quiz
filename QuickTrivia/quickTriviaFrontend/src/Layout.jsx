import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import UserContext from './context/context'

function Layout() {
    const { isLogin, setIsLogin } = useContext(UserContext);
    const Navigate = useNavigate()
    const checkSession = async () => {
        await axios.post('/user/auth', { token: localStorage.getItem('jwtToken') })
            .then(res => {
                setIsLogin(res.data.valid)
                // console.log(res)
            })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('jwtToken')
                setIsLogin(err.response.data.valid)
                Navigate('/')
            })
    }
    useEffect(() => {
        if (localStorage.getItem('jwtToken'))
            setIsLogin(true)
        const sessionCheckInterval = setInterval(checkSession, 10000); //Checks every minute that session expired or not
        return () => clearInterval(sessionCheckInterval);
    }, [isLogin]);
    return (
        <>
            <Header />
            <main className="flex flex-grow h-full justify-center items-center">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout