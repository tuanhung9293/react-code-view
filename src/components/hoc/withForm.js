import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {clearForm, validateForm, setInitialValues} from 'state/actions/formsAction'

export function createForm(formName, FormComponent) {
  class Form extends React.Component {
    validators = {}

    componentDidMount() {
      this.setInitialValues()
      this.validate()
    }

    componentWillUnmount() {
      this.clearForm()
    }

    shouldComponentUpdate(next) {
      const {submitting, submitted, valid, dirty} = this.props
      const shouldUpdate =
        submitting !== next.submitting ||
        submitted !== next.submitted ||
        valid !== next.valid ||
        dirty !== next.dirty
      return shouldUpdate
    }

    getChildContext() {
      return {
        _form: {
          name: formName,
          registerValidator: this.registerValidator,
          unregisterValidator: this.unregisterValidator
        }
      }
    }

    render() {
      const {
        form,
        ...rest
      } = this.props
      return <FormComponent form={form} formName={formName} {...rest} handleSubmit={this.handleSubmit} />
    }

    registerValidator = (name, validator) => {
      this.validators[name] = validator
    }

    unregisterValidator = (name) => {
      delete this.validators[name]
    }

    setInitialValues = () => {
      this.props.setInitialValues()
    }

    clearForm = () => {
      this.props.clearForm()
    }

    handleSubmit = () => {
      this.props.handleSubmit(this.props.form)
    }

    validate = () => {
      const {validateForm, form: {values}} = this.props
      const errors = Object.keys(this.validators).reduce((errors, name) => {
        const value = values[name]
        const validator = this.validators[name]
        const error = validator(value)
        if (error) {
          return {
            ...errors,
            [name]: error
          }
        }

        return errors
      }, {})
      validateForm(errors)
    }
  }

  Form.childContextTypes = {
    _form: PropTypes.object.isRequired
  }

  return Form
}

function withForm(
  formName = '',
  initialValues = {},
  submitActionCreator = (values = {}) => {},
  redirectAction = () => {},
  validator = (values = {}) => {}
) {
  function mapStateToProps({forms}) {
    const form = forms[formName] || {values: initialValues, touched: {}, validationErrors: {}, meta: {}}
    const {meta, ...rest} = form
    return {
      form: rest,
      ...meta,
      dirty: Object.keys(form.values).length > 0,
      valid: Object.keys(form.validationErrors).length === 0
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      setInitialValues: () => dispatch(setInitialValues({form: formName, initialValues})),
      clearForm: () => dispatch(clearForm({form: formName})),
      handleSubmit: (form) => {
        const values = {
          ...form.initialValues,
          ...form.values
        }
        dispatch(submitActionCreator(values))
        redirectAction()
      },
      validateForm: (errors) => dispatch(validateForm({form: formName, errors}))
    }
  }

  return (Component) => connect(mapStateToProps, mapDispatchToProps)(createForm(formName, Component))
}

export default withForm