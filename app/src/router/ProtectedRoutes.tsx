import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { ROUTES } from './routes.constants';


export function ProtectedRoutes() {
    const { authState } = useContext(AuthContext)

    if (!authState.isAuthenticated) <Navigate to={ROUTES.LOGIN} />

    return <Outlet />
}