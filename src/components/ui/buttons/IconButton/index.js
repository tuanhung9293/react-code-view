import React from 'react'
import Button from '../Button'
import styles from './IconButton.module.css'

function IconButton({children, ...rest}) {
  return (
    <Button {...rest} className={styles.button}>{children}</Button>
  )
}

export default IconButton