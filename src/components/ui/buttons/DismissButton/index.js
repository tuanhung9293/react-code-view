import React from 'react'
import IconButton from '../IconButton'
import dismiss from 'assets/dismiss.svg'

function DismissButton(props) {
  return <IconButton {...props}><img src={dismiss} alt="Dismiss" /></IconButton>
}

export default DismissButton