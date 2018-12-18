import {mapStateToProps, mapDispatchToProps} from './index'

const baseState = {
  forms: {
    testForm: {
      values: {testField: 'test value'},
      initialValues: {testField: 'test value'},
      errors: {testField: 'test error'},
      validationErrors: {testField: 'test validation error'},
      touched: {testField: true}
    }
  }
}

const baseProps = {
  formName: 'testForm',
  name: 'testField'
}

describe('mapStateToProps', () => {
  it('maps state to props', () => {
    expect(mapStateToProps(baseState, baseProps)).toMatchSnapshot()
  })
  it('creates default props if no form in state', () => {
    
    expect(mapStateToProps({forms: {}}, baseProps)).toMatchSnapshot()
  })
  it('uses initial value instead of value if no value', () => {
    const state = {
      forms: {
        testForm: {
          ...baseState.forms.testForm,
          values: {}
        }
      }
    }
    expect(mapStateToProps(state, baseProps)).toMatchSnapshot()
  })
})

describe('mapDispatchToProps', () => {
  it('creates dispatch actions', () => {
    const dispatch = () => {}
    expect(mapDispatchToProps(dispatch, {formName: 'testForm', name: 'testField'})).toMatchSnapshot()
  })
})

