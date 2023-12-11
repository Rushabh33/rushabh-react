import React, { useContext, useEffect, useState } from 'react'
import { refreshTokenIfNeeded } from '../../utils/apiUtils';
import AuthContext, { AuthState, initalValue } from '../../context/AuthContext';
import { SERVER_ROUTES } from '../../constants';
import Button from '../blocks/button/Button';
import { removeCredentialsFromSession } from '../login/login.utils';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes.constants';

interface ProductDetails {
    id: number
    title: string
    description: string
    price: number
    currency: string
}


export default function Products() {
    const { authState, setAuthState } = useContext(AuthContext)
    const [productList, setProductList] = useState<ProductDetails[]>([]);
    const navigate = useNavigate()



    const fetchProducts = async (authState: AuthState) => {
        try {
            const reviewAccessToken = await refreshTokenIfNeeded(authState);

            const response = await fetch(`${SERVER_ROUTES.BASE_URL + SERVER_ROUTES.PRODUCTS}`, {
                headers: {
                    'Authorization': `Bearer ${reviewAccessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const products = await response.json();
            setProductList(products)
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    };


    useEffect(() => {
        fetchProducts(authState)
    }, [])

    const handleLogout = () => {
        setAuthState(initalValue.authState)
        removeCredentialsFromSession(authState)
        navigate(ROUTES.HOME)
    }
    

    return (
        <div>
            <Button className='secondary' onClick={handleLogout}>
                Log Out
            </Button>
            {productList && productList.map((product) => {
                return (
                    <div key={product.id}>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>{product.description}</p>
                        <p>{product.currency + product.price} </p>
                    </div>
                )
            })}</div>
    )
}