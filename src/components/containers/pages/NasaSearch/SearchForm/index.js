import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {objectToUrlParams, urlParamsToObject} from 'services//transformers'
import {searchNasaMedia} from 'state/actions/mediaAction'
import Input from 'components/ui/forms/Input'
import MediaTypeCheckbox from 'components/ui/forms/MediaTypeCheckbox'
import styles from './SearchForm.module.css'

class SearchForm extends React.Component {
  state = {
    searchData: {
      q: '',
      media_type: 'image,video,audio'
    },
    image: true,
    video: true,
    audio: true
  }

  componentDidMount = () => {
    this.onRefreshPage()
  }

  onRefreshPage = () => {
    const {location, searchMedia, mediasParams} = this.props
    const params = urlParamsToObject(location.search)

    params.q && this.setState({
      searchData: {
        ...this.state.searchData,
        q: params.q
      }
    }, () => {
      this.setMediaTypeParamsToState(params)
      if (params.q !== mediasParams.q) searchMedia(params)
    })
  }

  setMediaTypeParamsToState = (params) => {
    if (params.media_type) {
      this.setState({
        searchData: {
          ...this.state.searchData,
          media_type: params.media_type
        },
        image: false,
        video: false,
        audio: false
      })
      params.media_type.split(',').forEach(type => {
        this.setState({[type]: true})
      })
    }
  }

  onQueryChange = (e) => {
    this.setState({searchData: {...this.state.searchData, q: e.target.value}})
  }

  onImageCheck = (e) => {
    this.setState({image: e.target.checked}, this.reduceMediaType)
  }

  onVideoCheck = (e) => {
    this.setState({video: e.target.checked}, this.reduceMediaType)
  }

  onAudioCheck = (e) => {
    this.setState({audio: e.target.checked}, this.reduceMediaType)
  }

  reduceMediaType = () => {
    const {image, video, audio} = this.state
    const mediaType = `${image ? 'image,' : ''}${video ? 'video,' : ''}${audio ? 'audio,' : ''}`.slice(0, -1)
    this.setState({searchData: {...this.state.searchData, media_type: mediaType}})
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.handleSearchMedia()
    }
  }

  handleSearchMedia = () => {
    const {searchMedia, history} = this.props
    const {searchData} = this.state

    searchMedia(searchData)
    history.push(
      `${history.location.pathname}${objectToUrlParams(searchData)}`
    )
  }

  render() {
    const {searchData, video, image, audio} = this.state
    return (
      <div className={styles.wrapper}>
        <div>
          <div className={styles.title}>Search from Nasa</div>
          <Input value={searchData.q}
            onChange={this.onQueryChange}
            onKeyPress={this.handleKeyPress}
            disabled={!video && !image && !audio}
            placeholder="Type something to search..."
          />
        </div>
        <MediaTypeCheckbox
          video={video} image={image} audio={audio}
          onImageCheck={this.onImageCheck}
          onVideoCheck={this.onVideoCheck}
          onAudioCheck={this.onAudioCheck}
        />
      </div>
    )
  }
}

export default withRouter(connect(
  ({medias}) => ({mediasParams: medias.params}),
  (dispatch) => ({
    searchMedia: (data) => dispatch(searchNasaMedia(data))
  })
)(SearchForm))
