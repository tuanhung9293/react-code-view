import React from 'react'
import {connect} from 'react-redux'
import {PAGINATION_UNIT} from 'constants/defaultValues'
import DocumentTitle from 'components/html/DocumentTitle'
import {Columns, Column} from 'components/ui/grid'
import PrimaryButton from 'components/ui/buttons/PrimaryButton'
import SortSelector from 'components/ui/forms/SortSelector'
import MediaTypeCheckbox from 'components/ui/forms/MediaTypeCheckbox'
import CollectionHeader from './CollectionHeader'
import InteractionButtons from './InteractionButtons'
import MediasGalaxy from '../../shared/MediasGalaxy'
import {sortNasaCollections} from 'state/actions/collectionsAction'
import styles from './Collections.module.css'

class Collections extends React.Component {
  state = {
    sortValue: 'dateEdited,1',
    image: true,
    video: true,
    audio: true,
    favorite: false,
    page: 1
  }

  componentDidMount = () => {
    this.props.sortCollections(this.state.sortValue)
  }

  sortHandle = (e) => {
    e.preventDefault()
    this.setState({sortValue: e.target.value})
    this.props.sortCollections(e.target.value)
  }

  onImageCheck = (e) => {
    this.setState({image: e.target.checked}, this.paginatedCollection)
  }

  onVideoCheck = (e) => {
    this.setState({video: e.target.checked}, this.paginatedCollection)
  }

  onAudioCheck = (e) => {
    this.setState({audio: e.target.checked}, this.paginatedCollection)
  }

  onFavoriteCheck = (e) => {
    this.setState({favorite: e.target.checked}, this.paginatedCollection)
  }

  onLoadMore = () => {
    this.setState({page: this.state.page + 1}, this.paginatedCollection)
  }

  filterCollections = () => {
    const {image, video, audio, favorite} = this.state
    const {collectionsData} = this.props

    const filledCollections = collectionsData.filter((item) => {
      const evalFavorite = favorite ? (favorite && item.liked) : true
      return ((image && item.mediaType === 'image') ||
      (video && item.mediaType === 'video') ||
      (audio && item.mediaType === 'audio')) && evalFavorite
    })

    return filledCollections
  }

  paginatedCollection = () => {
    const {page} = this.state
    return this.filterCollections().slice(0, page * PAGINATION_UNIT)
  }

  render() {
    const {sortValue, video, image, audio, favorite, page} = this.state
    const {collectionsData} = this.props
    return (
      <React.Fragment>
        <DocumentTitle title="Collections" />
        <div>
          <CollectionHeader />
          <Columns>
            <Column span={8} breakPoints={[{maxWidth: 576, span: 12}]}>
              <div className={styles.typeCheckbox}>
                <MediaTypeCheckbox
                  label="Filter by"
                  video={video} image={image} audio={audio} favorite={favorite}
                  onImageCheck={this.onImageCheck}
                  onVideoCheck={this.onVideoCheck}
                  onAudioCheck={this.onAudioCheck}
                  onFavoriteCheck={this.onFavoriteCheck}
                />
              </div>
            </Column>
            <Column span={4} breakPoints={[{maxWidth: 576, span: 12}]}>
              <SortSelector label="Sort by" value={sortValue} onChange={this.sortHandle} />
            </Column>
          </Columns>
        </div>
        <MediasGalaxy
          galaxyData={this.paginatedCollection()}
          source="collections"
          actionComponent={InteractionButtons}
          total={collectionsData.length}
        />
        {this.filterCollections().length > page * PAGINATION_UNIT &&
          <div className={styles.loadMore}>
            <PrimaryButton onClick={this.onLoadMore}>Load more</PrimaryButton>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default connect(
  ({collections}) => ({collectionsData: collections.data}),
  (dispatch) => ({
    sortCollections: (value) => dispatch(sortNasaCollections(value))
  })
)(Collections)
