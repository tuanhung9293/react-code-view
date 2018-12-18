import React from 'react'
import DocumentTitle from 'components/html/DocumentTitle'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import DismissButton from 'components/ui/buttons/DismissButton'
import {Player} from 'video-react'
import ReactAudioPlayer from 'react-audio-player'
import styles from './PlayMedia.module.css'

class PlayMedia extends React.Component {
  render() {
    const {mediaSource, windowSize, history} = this.props
    return (
      <div>
        <div className={styles.dismiss}>
          <DismissButton onClick={history.goBack} />
        </div>
        <DocumentTitle title="Play Media" />
        {mediaSource.mediaType === 'video' &&
          <Player
            playsInline
            autoPlay
            src={mediaSource.mediaUrl}
          />
        }
        {mediaSource.mediaType === 'image' &&
          <img className={styles.img}
            src={mediaSource.mediaUrl}
            style={{maxHeight: windowSize.height * 0.9}}
          />
        }
        {mediaSource.mediaType === 'audio' &&
          <ReactAudioPlayer
            src={mediaSource.mediaUrl}
            autoPlay
            controls
            className={styles.audio}
          />
        }
      </div>
    )
  }
}

function mapStateToProps(state, {match}) {
  return {
    mediaSource: state[match.params.source].data.find(item => item.nasaId === match.params.mediaId) || {},
    windowSize: state.ui.windowSize
  }
}

export default withRouter(connect(mapStateToProps, null)(PlayMedia))
