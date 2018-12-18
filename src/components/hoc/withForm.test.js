import React from 'react'
import withForm, {createForm} from './withForm'
import {shallow, mount} from 'enzyme'
import configureStore from 'redux-mock-store'
const mockStore = configureStore()
jest.mock('state/actions/formsAction')
import {setInitialValues, clearForm, validateForm} from 'state/actions/formsAction'

function createMockComponent() {
  return jest.fn().mockImplementation(props => null)
}

let MockComponent, store

beforeEach(() => {
  MockComponent = createMockComponent()
  store = mockStore({
    forms: {
      testForm: {
        values: {
          testField: 'changed value',
          another: 'value'
        },
        errors: {},
        validationErrors: {}
      }
    }
  })
  store.dispatch = () => {}
})

it('should take some configuration and return a component enhancer', () => {
  const enhance = withForm()
  const MockComponent = createMockComponent()
  const FormMockComponent = enhance(MockComponent)
  const enhancedComponent = shallow(<FormMockComponent store={store} />).dive()
  expect(enhancedComponent).toMatchSnapshot()
})

it('should dispatch set initial values action on mount', () => {
  const FormComponent = withForm('testForm', {testField: 'test value'})(createMockComponent())
  const wrapper = mount(<FormComponent store={store} />)
  expect(setInitialValues).toBeCalledWith({form: 'testForm', initialValues: {testField: 'test value'}})
})

it('should dispatch validate form action on mount', () => {
  const FormComponent = withForm('testForm', {testField: 'test value'})(createMockComponent())
  const wrapper = mount(<FormComponent store={store} />)
  expect(validateForm).toBeCalledWith({errors: {}, form: 'testForm'})
})

it('should dispatch clear form action on unmount', () => {
  const FormComponent = withForm('testForm', {testField: 'test value'})(createMockComponent())
  const wrapper = shallow(<FormComponent store={store} />).dive()
  wrapper.unmount()
  expect(clearForm).toBeCalled()
})

it('should dispatch submitActionCreator on submit', () => {
  const submitActionCreator = jest.fn()
  const FormComponent = withForm('testForm', {testField: 'test value'}, submitActionCreator)(createMockComponent())
  const wrapper = shallow(<FormComponent store={store} />).dive()
  wrapper.props().handleSubmit('this is the stuff')
  expect(submitActionCreator.mock.calls[0][0]).toEqual({
    testField: 'changed value',
    another: 'value'
  })
})

it('should append ids on submit', () => {
  const submitActionCreator = jest.fn()
  const FormComponent = withForm('testForm', {id: 123, testField: 'test value'}, submitActionCreator)(createMockComponent())
  const wrapper = shallow(<FormComponent store={store} />).dive()
  wrapper.props().handleSubmit('hello')
  expect(submitActionCreator.mock.calls[0][0]).toEqual({
    testField: 'changed value',
    another: 'value'
  })
})

it('should setup child context', () => {
  const FormComponent = createForm('testForm', createMockComponent())
  const wrapper = shallow(<FormComponent />, {disableLifecycleMethods: true})
  expect(wrapper.instance().getChildContext()).toMatchSnapshot()
})