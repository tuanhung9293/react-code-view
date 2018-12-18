import React from 'react'
import classNames from 'classnames'
import Button from '../Button'
import styles from './PrimaryButton.module.css'

function PrimaryButton({disabled, outlined, danger, wide, ...props}) {
  const className = classNames({
    [styles.base]: true,
    [styles.disabled]: disabled,
    [styles.outlined]: outlined,
    [styles.danger]: danger,
    [styles.wide]: wide
  })
  return <Button {...props} disabled={disabled} className={className} />
}

export default PrimaryButton