import { FaAngleDown } from "react-icons/fa"
import styles from "./style.module.scss"
import { forwardRef } from "react"

export const Select = forwardRef(({label, id, children, defaultValue, error, ...rest}, ref) => {
  return (
    <div className="input-box">
      {label ? <label className="headline" htmlFor={id}> {label} </label> : null}
      <div className={styles.inputContainer}>
        <select ref={ref} id={id} defaultValue={defaultValue} {...rest}>
          {children}
        </select>
        <span className={styles.icon}>
          <FaAngleDown />
        </span>
      </div>
      {error ? <label className="headline danger">{error.message}</label> : null }
    </div>
  )
})
