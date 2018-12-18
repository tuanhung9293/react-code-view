import React from 'react'
import classNames from 'classnames'
import styles from './Input.module.css'

function Input({type, hasError, value, ...rest}) {
  const inputValue = value || ''
  const className = classNames({
    [styles.input]: true,
    [styles.error]: hasError
  })
  return (
    <input className={className} type={type || 'text'} value={inputValue} {...rest} />
  )
}

export default Input