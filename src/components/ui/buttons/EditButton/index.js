import React from 'react'
import IconButton from '../IconButton'
import edit from 'assets/edit.svg'

function EditButton(props) {
  return <IconButton {...props}><img src={edit} alt="Edit" /></IconButton>
}

export default EditButton