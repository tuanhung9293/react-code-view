import React from 'react'
import PropTypes from 'prop-types'
import Label from '../Label'
import ErrorLabel from '../ErrorLabel'
import Input from '../Input'
import debounce from 'lodash/debounce'
import styles from './FormField.module.css'

class FormField extends React.PureComponent {
  debouncedValidate = null
  componentDidMount() {
    const {name, validate} = this.props
    if (validate) {
      this.context._form && this.context._form.registerValidator(name, validate)
      this.debouncedValidate = debounce(this.validate, 50)
      this.debouncedValidate()
    }
  }

  componentWillUnmount() {
    const {name} = this.props
    this.context._form && this.context._form.unregisterValidator(name)
    if (this.debouncedValidate) {
      this.debouncedValidate.cancel()
    }
  }

  render() {
    const {
      formName,
      label,
      touched,
      validationError,
      component: Component,
      onBlur,
      onValidate,
      name,
      afterChange,
      ...rest
    } = this.props
    const displayError = validationError && touched ? validationError : null
    const componentProps = {
      name,
      ...rest,
      onBlur: this.handleBlur,
      onChange: this.handleChange
    }
    delete componentProps.validate
    delete componentProps.validateField
    delete componentProps.onValidationError
    return (
      <div className={styles.wrapper}>
        <div className={styles.labels}>
          <Label>{label}</Label>
          <ErrorLabel>
            {displayError}
          </ErrorLabel>
        </div>
        {Component ? (
          <Component {...componentProps} />
        ) : (
          <Input type="text" {...componentProps} />
        )}
      </div>
    )
  }

  handleChange = e => {
    const {onChange, afterChange, validate} = this.props
    if (validate && this.debouncedValidate) {
      this.debouncedValidate()
    }
    if (onChange) {
      onChange(e)
    }
    if (afterChange) {
      afterChange(e)
    }
  }

  handleBlur = e => {
    if (this.props.validate) {
      this.validate()
    }
    this.props.onBlur(e)
  }

  handleValidationError = error => {
    if (error && this.props.onValidationError) {
      this.props.onValidationError(error)
    }
  }

  validate = () => {
    const {value, validate: validator, validateField} = this.props
    const error = validator(value)
    if (error) {
      this.handleValidationError(error)
    }
    validateField(error)
  }
}

FormField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  component: PropTypes.func,
  validate: PropTypes.func
}

FormField.contextTypes = {
  _form: PropTypes.object
}

export default FormField
