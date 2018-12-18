import React from 'react'
import classNames from 'classnames'
import styles from './Textarea.module.css'

function Textarea({hasError, value, ...rest}) {
  const className = classNames({
    [styles.textarea]: true,
    [styles.error]: hasError
  })
  return (
    <textarea {...rest} value={value || ''} className={className} />
  )
}

export default Textarea