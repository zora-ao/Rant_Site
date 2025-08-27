import React, { forwardRef, useId, useRef } from 'react'

const Input = forwardRef(({
    label, type = "text", className = "", ref, ...props
}) => {
    
    const id = useId;

    return (
        <div className='w-full'>
            {label && (
                <label 
                className='inline-block'
                htmlFor={id}>
                    {label}
                </label>
            )}

            <input 
            className='border'
            type={type}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input
