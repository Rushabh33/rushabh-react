import React, { useContext, useEffect } from 'react'
import { getAuthTokens, saveCredentialsToSession } from './login.utils';
import AuthContext from '../../context/AuthContext';
import { FormInput as Input } from "../blocks/form/input/FormInput";
import Button, { DesignType } from '../blocks/button/Button';
import Form from '../blocks/form/Form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes.constants';
import { FORM_CONSTRAINTS, FORM_INPUT_IDS } from './login.constants';
import "./login.css"
import Logo from '../../assets/Logo.png'
export interface FormInputProps {
    email: string
    password: string
}

export default function Login() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputProps>()
    const { authState, setAuthState } = useContext(AuthContext)

    useEffect(() => {
        if (authState.isAuthenticated) navigate(ROUTES.PRODUCTS)
    }, [authState])

    const onSubmit: SubmitHandler<FormInputProps> = async (data) => {
        try {
            const tokens = await getAuthTokens(data);
            saveCredentialsToSession(tokens);
            setAuthState({ ...tokens, isAuthenticated: true })
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    return (
        <div className='login_page'>
            <div className='login_container'>
                <img src={Logo} className='login_logo' />
                <h1 className='login_title'>Sign in</h1>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input id={FORM_INPUT_IDS.EMAIL}
                        {...register(FORM_INPUT_IDS.EMAIL, {
                            required: true, pattern: {
                                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Invalid email address"
                            }
                        })}
                        errors={errors}
                    />
                    <Input
                        id={FORM_INPUT_IDS.PASSWORD}
                        {...register(FORM_INPUT_IDS.PASSWORD, {
                            required: "You must specify a password",
                            minLength: {
                                value: FORM_CONSTRAINTS.MAX_PASSWORD_LENGTH,
                                message: `Password must have at least ${FORM_CONSTRAINTS.MAX_PASSWORD_LENGTH} characters`
                            }
                        })}
                        errors={errors}
                    />
                    <Button designType={DesignType.primary} type="submit" >Sign in</Button>
                </Form>
                <div className='login_forgotPasswordContainer'>
                <Button designType={DesignType.tertiary}>Forgot Password</Button>
                </div>
            </div>
           <div className='login_companyDetails'>
           <p>&copy;2001-2019 All Rights Reserved. Clip* is a registered trademark of Rover Labs. </p>
            <a href="#">Cookie Preferences, Privary and Terms</a>
           </div>
        </div>
    )
}