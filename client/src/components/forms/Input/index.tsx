import { ForwardedRef, forwardRef } from "react"

interface IInputProps {
    type?: string;
    id: string;
    label: string;
    error: any;
    placeholder?: string;
}

export const Input = forwardRef(({type='text', id, label, error, ...rest}: IInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <div className="input-box">
            {label ? <label htmlFor={id}>{label}</label> : null}
            <input ref={ref} type={type} id={id} {...rest}/>
            {error ? <label className="headline danger">{error.message}</label> : null }
        </div>
    )
})