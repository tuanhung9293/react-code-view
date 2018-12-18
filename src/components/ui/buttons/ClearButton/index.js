import React from 'react'
import classNames from 'classnames'
import Button from '../Button'
import styles from './ClearButton.module.css'

function ClearButton({disabled, noOutline, ...props}) {
  const className = classNames({
    [styles.base]: true,
    [styles.disabled]: disabled,
    [styles.noOutline]: noOutline
  })
  return <Button {...props} disabled={disabled} className={className} />
}

export default ClearButton