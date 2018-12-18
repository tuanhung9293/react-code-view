import React from 'react'
import classNames from 'classnames'
import styles from './ModalContent.module.css'

function ModalContent({center, ...props}) {
  const className = classNames({
    [styles.base]: true,
    [styles.center]: center
  })

  return <div {...props} className={className} />
}

export default ModalContent