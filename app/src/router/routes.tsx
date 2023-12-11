import React from 'react'
import { Navigate, createBrowserRouter } from "react-router-dom"
import App from '../App'
import Login from "../components/login/Login"
import Products from "../components/products/Products"
import { ROUTES } from './routes.constants'
import { ProtectedRoutes } from './ProtectedRoutes'

 

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <App />,
    },
    {
        path: ROUTES.LOGIN,
        element: <Login />,
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: ROUTES.PRODUCTS,
                element:  <Products />,
            }
        ]
    },
    {
        path: ROUTES.ALL,
        element: <Navigate to={ROUTES.HOME} replace />
    },
]);
