import React from 'react'
import styles from './Checkbox.module.css'

function Checkbox({hasError, ...props}) {
  return (
    <span className={styles.wrapper}>
      <input {...props} className={styles.input} type="checkbox" />
      <span className={styles.display} />
    </span>
  )
}

export default Checkbox