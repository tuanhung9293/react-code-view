import React from 'react'
import IconButton from '../IconButton'
import trash from 'assets/trash.svg'

function DeleteButton(props) {
  return <IconButton {...props}><img src={trash} alt="Add to favorite" /></IconButton>
}

export default DeleteButton