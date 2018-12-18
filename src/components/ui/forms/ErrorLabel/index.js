import React from 'react'
import styles from './ErrorLabel.module.css'

function ErrorLabel({...rest}) {
  return <label className={styles.base} {...rest} />
}

export default ErrorLabel