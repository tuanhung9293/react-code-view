import React from 'react'
import InternalError from 'components/errors/InternalError'

class GeneralErrorBoundary extends React.Component {
  state = {
    hasError: false
  }

  componentDidCatch() {
    this.setState({hasError: true})
  }

  render() {
    if (this.state.hasError) {
      return <InternalError />
    }
    return this.props.children
  }
}

export default GeneralErrorBoundary