import React from 'react'
import DocumentTitle from 'components/html/DocumentTitle'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Modal from 'components/ui/modals/Modal'
import ModalHeader from 'components/ui/modals/ModalHeader'
import CollectionForm from '../../shared/CollectionForm'
import {editCollection} from 'state/actions/collectionsAction'
import styles from './EditCollection.module.css'

class EditCollection extends React.Component {
  render() {
    const {collectionData, history} = this.props
    return (
      <Modal>
        <div className={styles.base}>
          <ModalHeader
            heading="Edit Collection"
            closeTo="/collection"
          />
          <div className={styles.form}>
            <DocumentTitle title="Edit Collection" />
            <CollectionForm
              name="editCollection"
              initialValues={collectionData}
              submitAction={editCollection}
              redirectAction={() => history.push('/collection')}
            />
          </div>
        </div>
      </Modal>
    )
  }
}

function mapStateToProps({collections}, {match}) {
  return {
    collectionData: collections.data.find(item => item.nasaId === match.params.collectionId) || {}
  }
}

export default withRouter(connect(mapStateToProps, null)(EditCollection))
