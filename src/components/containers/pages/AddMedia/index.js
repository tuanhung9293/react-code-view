import React from 'react'
import DocumentTitle from 'components/html/DocumentTitle'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Modal from 'components/ui/modals/Modal'
import ModalHeader from 'components/ui/modals/ModalHeader'
import CollectionForm from '../../shared/CollectionForm'
import {addCollection} from 'state/actions/collectionsAction'
import styles from './AddMedia.module.css'

class AddMedia extends React.Component {
  render() {
    const {media, history} = this.props
    return (
      <Modal>
        <div className={styles.base}>
          <ModalHeader
            heading="Add To Collections"
            closeTo="/nasa-search"
          />
          <div className={styles.form}>
            <DocumentTitle title="Add Media" />
            <CollectionForm
              create
              name="addMedia"
              initialValues={media}
              submitAction={addCollection}
              redirectAction={() => history.push('/collection')}
            />
          </div>
        </div>
      </Modal>
    )
  }
}

function mapStateToProps({medias}, {match}) {
  return {
    media: medias.data.find(item => item.nasaId === match.params.mediaId) || {}
  }
}

export default withRouter(connect(mapStateToProps, null)(AddMedia))
