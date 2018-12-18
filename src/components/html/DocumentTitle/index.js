import React from 'react'
import ReactDocumentTitle from 'react-document-title'

function DocumentTitle({title}) {
  return <ReactDocumentTitle title={
    title
      ? `${title} - Tuan`
      : 'Tuan Page'
  } />
}

export default DocumentTitle