import React from 'react'
import {shallow, mount} from 'enzyme'
import FormField from './FormField'
import Label from '../Label'
import ErrorLabel from '../ErrorLabel'
import Input from '../Input'


describe('validation', () => {

  let onBlur, onChange, validator, validateField, registerValidator, unregisterValidator, context

  beforeEach(() => {
    onBlur = jest.fn()
    onChange = jest.fn()
    validator = jest.fn().mockImplementation(() => 'fail error')
    validateField = jest.fn()
    registerValidator = jest.fn()
    unregisterValidator = jest.fn()
    context = {
      _form: {
        registerValidator,
        unregisterValidator
      }
    }
  })

  it('registers validator to context on mount', () => {
    const wrapper = mount(<FormField name="testField" validate={validator} />, {context})
    expect(registerValidator).toBeCalledWith('testField', validator)
  })

  it('runs the validator when mounted', () => {
    jest.useFakeTimers()
    const wrapper = mount(
      <FormField
        name="testField"
        validate={validator}
        validateField={validateField}
      />, {context}
    )
    jest.runAllTimers()
    expect(validateField).toBeCalled()
    expect(validator).toBeCalled()
  })

  it('skips registering validator to context if none', () => {
    const wrapper = mount(<FormField name="testField" />, {context})
    expect(registerValidator).not.toBeCalled()
  })

  it('unregisters validator to context on unmount', () => {
    const wrapper = shallow(<FormField name="testField" validate={validator} />, {context})
    wrapper.unmount()
    expect(unregisterValidator).toBeCalledWith('testField')
  })

  it('calls onBlur on blur', () => {
    const wrapper = shallow(
      <FormField
        name="testField"
        value=""
        onBlur={onBlur}
        validate={validator}
        validateField={validateField}
      />,
      {context}
    )
    const event = {target: {name: 'testField', value: ''}}
    wrapper.find('Input').simulate('blur', event)
    expect(onBlur).toBeCalledWith(event)
  })

  it('calls validator on blur', () => {
    const wrapper = shallow(
      <FormField
        name="testField"
        value="test value"
        onBlur={onBlur}
        validate={validator}
        validateField={validateField}
      />,
      {context}
    )
    const event = {target: {name: 'testField', value: 'hej'}}
    wrapper.find('Input').simulate('blur', event)
    expect(validator).toBeCalledWith('test value')
  })

  it('does not call validator on blur if none', () => {
    const wrapper = shallow(
      <FormField
        name="testField"
        value="test value"
        onBlur={onBlur}
        validateField={validateField}
      />,
      {context}
    )
    const event = {target: {name: 'testField', value: 'hej'}}
    wrapper.find('Input').simulate('blur', event)
    expect(validator).not.toBeCalled()
  })

  it('calls validateField on blur', () => {
    const wrapper = shallow(
      <FormField
        name="testField"
        value="test value"
        onBlur={onBlur}
        validate={validator}
        validateField={validateField}
      />,
      {context}
    )
    const event = {target: {name: 'testField', value: 'hej'}}
    wrapper.find('Input').simulate('blur', event)
    expect(validateField).toBeCalledWith('fail error')
  })

  it('calls validateField debounced on change', () => {
    jest.useFakeTimers()
    const wrapper = mount(
      <FormField
        name="testField"
        value="test value"
        validate={validator}
        validateField={validateField}
      />,
      {context}
    )
    const event = {target: {name: 'testField', value: 'hej'}}
    wrapper.find('Input').simulate('change', event)
    jest.runAllTimers()
    expect(validateField).toBeCalledWith('fail error')
  })

  it('calls cancels debounced validate on unmount', () => {
    const wrapper = mount(
      <FormField
        name="testField"
        value="test value"
        validate={validator}
        validateField={validateField}
      />,
      {context}
    )
    const instance = wrapper.instance()
    instance.debouncedValidate = jest.fn()
    instance.debouncedValidate.cancel = jest.fn()
    const event = {target: {name: 'testField', value: 'hej'}}
    wrapper.unmount()
    expect(instance.debouncedValidate.cancel).toBeCalled()
  })

  it('calls onChange handler on change if it exists', () => {
    const wrapper = shallow(
      <FormField
        name="testField"
        value="test value"
        validate={validator}
        onChange={onChange}
        validateField={validateField}
      />,
      {context}
    )
    const event = {target: {name: 'testField', value: 'hej'}}
    wrapper.find('Input').simulate('change', event)
    expect(onChange).toBeCalledWith(event)
  })

  it('calls onValidationError when there is an error', () => {
    const onValidationError = jest.fn()
    const wrapper = shallow(
      <FormField
        name="testField"
        value="test value"
        onBlur={onBlur}
        onValidationError={onValidationError}
        validate={validator}
        validateField={validateField}
      />,
      {context}
    )
    const event = {target: {name: 'testField', value: 'hej'}}
    wrapper.find('Input').simulate('blur', event)
    expect(onValidationError).toBeCalledWith('fail error')
  })

  it('does not call onValidationError if there is no error', () => {
    const onValidationError = jest.fn()
    const wrapper = shallow(
      <FormField
        name="testField"
        value="test value"
        onBlur={onBlur}
        onValidationError={onValidationError}
        validate={() => false}
        validateField={validateField}
      />,
      {context}
    )
    const event = {target: {name: 'testField', value: 'hej'}}
    wrapper.find('Input').simulate('blur', event)
    expect(onValidationError).toHaveBeenCalledTimes(0)
  })
})

describe('rendering', () => {
  it('contains a label', () => {
    const wrapper = shallow(<FormField name="testField" label="Test" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('contains an error label when there is an error', () => {
    const wrapper = mount(<FormField name="testField" error="test error" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('handles errors that are objects', () => {
    const wrapper = mount(<FormField name="testField" error={{some: 'error'}} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('handles errors that are arrays of strings', () => {
    const wrapper = mount(<FormField name="testField" error={['some error', 'some other error']} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('handles errors that are arrays of objects', () => {
    const wrapper = mount(<FormField name="testField" error={[{some: 'error'}, {some: 'other error'}]} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('contains validation error when touched', () => {
    const wrapper = shallow(<FormField name="testField" validationError="test error" touched />)
    expect(wrapper).toMatchSnapshot()
  })

  it('contains no validation error when not touched', () => {
    const wrapper = shallow(<FormField name="testField" validationError="test error" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders an Input element with type text as default', () => {
    const wrapper = shallow(<FormField name="testField" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renders a component if supplied', () => {
    const TestComponent = () => (
      <div className="Component"></div>
    )
    const wrapper = shallow(<FormField name="testField" component={TestComponent} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('passes needed props to component', () => {
    const TestComponent = () => (
      <div className="Component"></div>
    )
    const props = {
      name: 'testField',
      component: TestComponent,
      value: 'test value',
      onBlur: () => {},
      onChange: () => {}
    }
    const wrapper = shallow(<FormField {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})

