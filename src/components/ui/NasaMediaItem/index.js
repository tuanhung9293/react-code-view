import React from 'react'
import MediaThumb from './MediaThumb'
import moment from 'moment'
import styles from './NasaMediaItem.module.css'
import clock from 'assets/clock.svg'

function NasaMediaItem({itemData, source, onFetchCollectionUrl, actionComponent: ActionComponent}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <MediaThumb
          itemData={itemData}
          source={source}
          onFetchCollectionUrl={onFetchCollectionUrl}
        />
        <div className={styles.mediaType}>
          <a>{itemData.mediaType}</a>
        </div>
        <div className={styles.info}>
          <h4 className={styles.title}>
            <a>{itemData.title}</a>
          </h4>
          <div className={styles.meta}>
            <div className={styles.postauthor}>By <a>{itemData.photographer || 'unknown'}</a></div>
            <div>
              &nbsp;&nbsp;/&nbsp;&nbsp;<img src={clock} height="10px" />
              &nbsp;{moment(new Date(itemData.dateCreated)).format('Do MMMM YYYY')}
            </div>
          </div>
          <div className={styles.description}>{itemData.description}</div>
        </div>

        <div className={styles.addButton}>
          {ActionComponent && <ActionComponent itemData={itemData} />}
        </div>
      </div>
    </div>
  )
}

export default NasaMediaItem
