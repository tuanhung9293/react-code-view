import React from 'react'
import {shallow} from 'enzyme'
import MediaTypeCheckbox from './'

const baseProps = {
  video: true,
  image: true,
  audio: true,
  onImageCheck: () => {},
  onVideoCheck: () => {},
  onAudioCheck: () => {}
}

describe('renders', () => {
  it('renders MediaTypeCheckbox', () => {
    expect(shallow(
        <MediaTypeCheckbox {...baseProps}/>
    )).toMatchSnapshot()
  })

  it('renders MediaTypeCheckbox with label', () => {
    expect(shallow(
        <MediaTypeCheckbox {...baseProps} label="label" />
    )).toMatchSnapshot()
  })

  it('renders MediaTypeCheckbox with favorite checkbox', () => {
    expect(shallow(
        <MediaTypeCheckbox {...baseProps}
          favorite={true}
          onFavoriteCheck={() => {}} />
    )).toMatchSnapshot()
  })
})