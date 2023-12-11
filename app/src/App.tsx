import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext, { initalValue } from './context/AuthContext';
import { removeCredentialsFromSession } from './components/login/login.utils';
import { ROUTES } from './router/routes.constants';
import Button from './components/blocks/button/Button';
import "./App.css"

export default function App() {
    const  {authState, setAuthState} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        setAuthState(initalValue.authState)
        removeCredentialsFromSession(authState)
    }
    
    const handleLogin = () => {
        navigate(ROUTES.LOGIN)
    }

    return (
        <div className='home_page'>
            <div className='home_container'>
                <Button className='primary' onClick={handleLogin}>
                    Log in
                </Button>
                {authState.isAuthenticated && <Button className='secondary' onClick={handleLogout}>
                    Log Out
                </Button>}
            </div>
        </div>
    )
}