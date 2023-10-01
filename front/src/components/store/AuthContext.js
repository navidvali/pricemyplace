import React, { useState } from "react"

const AuthContext = React.createContext({
    token: null,
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
})

export const AuthContextProvider = (props) => {
    const initToken = localStorage.getItem('token')
    const [ token, setToken ] = useState(initToken)

    const userIsLoggedIn = !!token

    const loginhandler = (token) => {
        setToken(token)
        localStorage.setItem('token', token)
    }

    const logouthandler = () => {
        setToken(null)
        localStorage.removeItem('token')
    }

    const contextvalue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginhandler,
        logout: logouthandler,
    }

    return (
        <AuthContext.Provider value={contextvalue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
