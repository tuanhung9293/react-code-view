import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import FormField from './FormField'
import {setFormValue, formFieldBlur, validateField} from 'state/actions/formsAction'

export function mapStateToProps({forms}, {formName, name}) {
  const form = forms[formName] || {values: {}, initialValues: {}, touched: {}, validationErrors: {}}
  const value = form.values.hasOwnProperty(name) ? form.values[name] : form.initialValues[name]
  return {
    value: value,
    validationError: form.validationErrors[name] || null,
    hasError: !!(form.touched[name] && form.validationErrors[name]),
    touched: form.touched[name] || false
  }
}

export function mapDispatchToProps(dispatch, {formName, name}) {
  return {
    onChange: ({target: {value}}) => dispatch(setFormValue({form: formName, name, value})),
    onBlur: () => {
      dispatch(formFieldBlur({form: formName, name}))
    },
    validateField: (error) => dispatch(validateField({form: formName, name, error}))
  }
}

const ConnectedFormField = connect(mapStateToProps, mapDispatchToProps)(FormField)

function ConnectedFormFieldWithContext(props, context) {
  const formName = context._form && context._form.name
  return <ConnectedFormField {...props} formName={formName} />
}

ConnectedFormFieldWithContext.contextTypes = {
  _form: PropTypes.object
}

export default ConnectedFormFieldWithContext