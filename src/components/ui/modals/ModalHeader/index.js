import React from 'react'
import classNames from 'classnames'
import ClearButton from 'components/ui/buttons/ClearButton'
import CrossIcon from 'components/ui/CrossIcon'
import styles from './ModalHeader.module.css'

function ModalHeader({heading, subheading, closeTo, onClose, children}) {
  const wrapperClassName = classNames({
    [styles.base]: true,
    [styles.withCloseButton]: closeTo || onClose
  })

  return (
    <header className={wrapperClassName}>
      <div>
        {heading && <h1>{heading}</h1>}
        {subheading && <p>{subheading}</p>}
        {children}
      </div>
      {(closeTo || onClose) && (
        <div className={styles.closeButton}>
          <ClearButton
            to={closeTo && closeTo}
            onClick={onClose && onClose}
          >
            <CrossIcon dark />
          </ClearButton>
        </div>
      )}
    </header>
  )
}

export default ModalHeader