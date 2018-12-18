import React from 'react'
import {shallow} from 'enzyme'
import GeneralErrorBoundary from './'

describe('renders', () => {
  it('renders GeneralErrorBoundary in case without error', () => {
    expect(shallow(
        <GeneralErrorBoundary>
          I am a Child
        </GeneralErrorBoundary>
    )).toMatchSnapshot()
  })
})

