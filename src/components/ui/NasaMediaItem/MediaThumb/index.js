import React from 'react'
import PlayButton from 'components/ui/buttons/PlayButton'
import styles from './MediaThumb.module.css'

class MediaThumb extends React.Component {
  componentDidMount = () => {
    const {source, onFetchCollectionUrl} = this.props
    if (source === 'medias') onFetchCollectionUrl()
  }

  componentDidUpdate = (nextProps) => {
    if (nextProps.itemData.href !== this.props.itemData.href) {
      const {source, onFetchCollectionUrl} = this.props
      if (source === 'medias') onFetchCollectionUrl()
    }
  }

  render() {
    const {itemData, source} = this.props

    return (
      <div className={styles.wrapper}>
        <img src={itemData.thumbUrl} className={styles.thumb} />
        <div className={styles.playButton}>
          <PlayButton to={`/play-media/${source}/${itemData.nasaId}`} />
        </div>
      </div>
    )
  }
}

export default MediaThumb