import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Column.module.css'

export class Column extends React.PureComponent {
  render() {
    const {children, span, breakPoints} = this.props
    let style = null

    if (breakPoints) {
      const currentBreakPoint = this.getCurrentBreakPoint()
      if (currentBreakPoint) {
        style = this.getStyleForSpan(currentBreakPoint.span)
      }
    }

    if (span && style === null) {
      style = this.getStyleForSpan(span)
    }

    const className = classNames({
      [styles.base]: true,
      [styles.column]: !style,
      [styles.grid]: style
    })
    return <div className={className} style={style}>{children}</div>
  }

  getStyleForSpan = (span) => {
    if (1 * span === 0) {
      return {display: 'none'}
    }
    const widthPercent = `${span / 0.12}%`
    return {
      WebkitBoxFlex: 0,
      msFlexPositive: 0,
      flexGrow: 0,
      msFlexPreferredSize: widthPercent,
      flexBasis: widthPercent,
      maxWidth: widthPercent
    }
  }

  getCurrentBreakPoint = () => {
    const {breakPoints, windowWidth} = this.props
    return breakPoints.reduce((currentBreakPoint, breakPoint) => {
      return windowWidth <= breakPoint.maxWidth
        ? breakPoint
        : currentBreakPoint
    }, null)
  }
}

Column.propTypes = {
  span: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ])
}

export default connect(
  ({ui}) => ({windowWidth: ui.windowSize.width})
)(Column)