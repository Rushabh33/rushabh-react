import React from 'react'
import { FieldErrors } from 'react-hook-form';
import './forminput.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errors: FieldErrors
  id: string
  classNames?: string
}

export const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, errors, classNames = "", ...props }, ref) => {
    const isError = !!errors[id]
    const errorMessage = errors[id]?.message as string

    return (
      <div className='formInput_container'>
        <label htmlFor={id} className='formInput_label'>
          {id}
        </label>
          <input ref={ref} {...props} type={type || 'text'} id={id} className={`${classNames} formInput`} />
        {isError && (
          <span role="alert" className='formInput_error' >{errorMessage}</span>
        )}
      </div>
    );
  }
);