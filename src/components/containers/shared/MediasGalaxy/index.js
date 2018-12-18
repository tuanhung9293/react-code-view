import React from 'react'
import {connect} from 'react-redux'
import {Columns, Column} from 'components/ui/grid'
import NasaMediaItem from 'components/ui/NasaMediaItem'
import {fetchMediaItemCollection} from 'state/actions/mediaAction'
import styles from './MediasGalaxy.module.css'

class MediasGalaxy extends React.Component {
  render() {
    const {galaxyData, source, actionComponent, fetchCollectionUrl, total, searchParams} = this.props
    return (
      <React.Fragment>
        <div className={styles.info}>
          {total > 0 &&
            <div>
              <span><b>{galaxyData.length}</b> loaded results of <b>{total}</b></span>
              {source === 'medias' && <span> for <b>"{searchParams.q}"</b></span>}
            </div>
          }
        </div>
        <Columns>
          {galaxyData.map((item, key) =>
            <Column key={key} span={3} breakPoints={[{maxWidth: 1200, span: 4}, {maxWidth: 768, span: 6}, {maxWidth: 576, span: 12}]}>
              <NasaMediaItem
                itemData={item}
                source={source}
                onFetchCollectionUrl={() => fetchCollectionUrl(key, item.mediaType, item.href)}
                actionComponent={actionComponent} />
            </Column>
          )}
          {galaxyData.length === 0 && <div className={styles.nothing}>No item to show...</div>}
        </Columns>
      </React.Fragment>
    )
  }
}

export default connect(
  ({medias}) => ({searchParams: medias.params}),
  (dispatch) => ({
    fetchCollectionUrl: (index, type, url) => dispatch(fetchMediaItemCollection(index, type, url))
  })
)(MediasGalaxy)
