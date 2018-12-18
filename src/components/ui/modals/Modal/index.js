import React from 'react'
import {createPortal} from 'react-dom'
import classNames from 'classnames'
import styles from './Modal.module.css'

const modalRoot = document.getElementById('modals')

class ModalPortal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }
  componentDidMount() {
    modalRoot.appendChild(this.el)
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }
  render() {
    return createPortal(
      this.props.children,
      this.el
    )
  }
}

function Modal({children, notCenter, transparent}) {
  const className = classNames({
    [styles.modal]: true,
    [styles.notCenter]: notCenter,
    [styles.transparent]: transparent
  })
  return (
    <ModalPortal>
      <div className={styles.container}>
        <div className={styles.overlay} />
        <div className={className}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
    </ModalPortal>
  )
}

export default Modal