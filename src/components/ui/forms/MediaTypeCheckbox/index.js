
import React from 'react'
import Checkbox from 'components/ui/forms/Checkbox'
import Label from 'components/ui/forms/Label'
import styles from './MediaTypeCheckbox.module.css'

function MediaTypeCheckbox({video, image, audio, favorite, onImageCheck, onVideoCheck, onAudioCheck, onFavoriteCheck, label}) {
  return (
    <div className={styles.wrapper}>
      {label &&
        <div className={styles.labels}>
          <Label>{label}</Label>
        </div>
      }
      <div className={styles.inlineFlex}>
        <label className={styles.checkbox}>
          <Checkbox checked={image} onChange={onImageCheck} />Image
        </label>
        <label className={styles.checkbox}>
          <Checkbox checked={video} onChange={onVideoCheck} />Video
        </label>
        <label className={styles.checkbox}>
          <Checkbox checked={audio} onChange={onAudioCheck} />Audio
        </label>
        {favorite !== undefined &&
          <label className={styles.checkbox}>
            <Checkbox checked={favorite} onChange={onFavoriteCheck} />Favorite
          </label>
        }
      </div>
    </div>
  )
}

export default MediaTypeCheckbox