import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {PAGINATION_UNIT} from 'constants/defaultValues'
import DocumentTitle from 'components/html/DocumentTitle'
import SearchForm from './SearchForm'
import AddCollectionButton from './AddCollectionButton'
import MediasGalaxy from '../../shared/MediasGalaxy'
import PrimaryButton from 'components/ui/buttons/PrimaryButton'
import Loading from 'components/ui/Loading'
import {searchMoreNasaMedia} from 'state/actions/mediaAction'
import styles from './NasaSearch.module.css'

class NasaSearch extends React.Component {
  state = {
    page: 1
  }

  loadMore = () => {
    this.checkMoreSource()
    this.setState({page: this.state.page + 1})
  }

  checkMoreSource = () => {
    const {params, fetchMoreMedias, totalHits, searchResults} = this.props

    if ((totalHits > searchResults.length) && ((this.paginatedSearchResults().length + PAGINATION_UNIT) > searchResults.length)) {
      fetchMoreMedias({...params, page: params.page + 1})
    }
  }

  paginatedSearchResults = () => {
    return this.props.searchResults.slice(0, PAGINATION_UNIT * this.state.page)
  }

  render() {
    const {totalHits, loading, loadingMore} = this.props
    return (
      <React.Fragment>
        <DocumentTitle title="Search" />
        <div className={styles.link}>
          <Link to="/collection">Back to Collection</Link>
        </div>
        <SearchForm />
        {loading && <div className={styles.loading}><Loading /></div>}
        {!loading &&
          <div>
            <MediasGalaxy
              galaxyData={this.paginatedSearchResults()}
              source="medias"
              actionComponent={AddCollectionButton}
              total={totalHits}
            />
            {(this.paginatedSearchResults().length < totalHits) &&
              <div className={styles.loadMore}>
                {loadingMore && <Loading />}
                {!loadingMore && <PrimaryButton onClick={this.loadMore}>Load more</PrimaryButton>}
              </div>
            }
          </div>
        }
      </React.Fragment>
    )
  }
}

export default connect(
  ({medias}) => ({
    searchResults: medias.data,
    totalHits: medias.totalHits,
    params: medias.params,
    loading: medias.loading,
    loadingMore: medias.loadingMore
  }),
  (dispatch) => ({
    fetchMoreMedias: (params) => dispatch(searchMoreNasaMedia(params))
  })
)(NasaSearch)
