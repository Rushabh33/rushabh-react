import React from 'react'
import './form.css'

interface FormProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>{
    children: React.ReactNode
}

export default function Form({children, ...props}: FormProps){

    return (
        <form className='form' {...props}>
            {children}
        </form>
    )
}   