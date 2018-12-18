import React from 'react'
import {connect} from 'react-redux'
import {objectToUrlParams} from 'services//transformers'
import {Columns, Column} from 'components/ui/grid'
import PrimaryButton from 'components/ui/buttons/PrimaryButton'
import styles from './CollectionHeader.module.css'

const CollectionHeader = ({searchParams}) => {
  return (
    <div className={styles.header}>
      <Columns>
        <Column span={8} breakPoints={[{maxWidth: 576, span: 12}]}>
          <div className={styles.title}>NASA COLLECTION</div>
        </Column>
        <Column span={4} breakPoints={[{maxWidth: 576, span: 12}]}>
          <div className={styles.addButton}>
            <PrimaryButton to={`/nasa-search${objectToUrlParams(searchParams)}`}>
              Add new item
            </PrimaryButton>
          </div>
        </Column>
      </Columns>
    </div>
  )
}

export default connect(
  ({medias}) => ({searchParams: medias.params})
)(CollectionHeader)
