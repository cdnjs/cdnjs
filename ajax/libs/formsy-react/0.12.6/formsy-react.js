(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var React = global.React || require('react');
var Formsy = {};
var validationRules = require('./validationRules.js');
var utils = require('./utils.js');
var Mixin = require('./Mixin.js');
var options = {};

Formsy.Mixin = Mixin;

Formsy.defaults = function (passedOptions) {
  options = passedOptions;
};

Formsy.addValidationRule = function (name, func) {
  validationRules[name] = func;
};

Formsy.Form = React.createClass({displayName: "Form",
  getInitialState: function () {
    return {
      isValid: true,
      isSubmitting: false,
      canChange: false
    };
  },
  getDefaultProps: function () {
    return {
      onSuccess: function () {},
      onError: function () {},
      onSubmit: function () {},
      onValidSubmit: function () {},
      onInvalidSubmit: function () {},
      onSubmitted: function () {},
      onValid: function () {},
      onInvalid: function () {},
      onChange: function () {},
      validationErrors: null
    };
  },

  // Add a map to store the inputs of the form, a model to store
  // the values of the form and register child inputs
  componentWillMount: function () {
    this.inputs = {};
    this.model = {};
  },

  componentDidMount: function () {
    this.validateForm();
  },

  componentWillUpdate: function () {
    var inputKeys = Object.keys(this.inputs);

    // The updated children array is not available here for some reason,
    // we need to wait for next event loop
    setTimeout(function () {

      // The component might have been unmounted on an
      // update
      if (this.isMounted()) {

        if (this.props.validationErrors) {
          this.setInputValidationErrors(this.props.validationErrors);
        }

        var newInputKeys = Object.keys(this.inputs);
        if (utils.arraysDiffer(inputKeys, newInputKeys)) {
          this.validateForm();
        }

      }

    }.bind(this), 0);
  },

  // Update model, submit to url prop and send the model
  submit: function (event) {

    event && event.preventDefault();

    // Trigger form as not pristine.
    // If any inputs have not been touched yet this will make them dirty
    // so validation becomes visible (if based on isPristine)
    this.setFormPristine(false);
    this.updateModel();
    var model = this.mapModel();
    this.props.onSubmit(model, this.resetModel, this.updateInputsWithError);
    this.state.isValid ? this.props.onValidSubmit(model, this.resetModel, this.updateInputsWithError) : this.props.onInvalidSubmit(model, this.resetModel, this.updateInputsWithError);

  },

  mapModel: function () {
    return this.props.mapping ? this.props.mapping(this.model) : this.model;
  },

  // Goes through all registered components and
  // updates the model values
  updateModel: function () {
    Object.keys(this.inputs).forEach(function (name) {
      var component = this.inputs[name];
      this.model[name] = component.state._value;
    }.bind(this));
  },

  // Reset each key in the model to the original / initial value
  resetModel: function () {
    Object.keys(this.inputs).forEach(function (name) {
      this.inputs[name].resetValue();
    }.bind(this));
    this.validateForm();
  },

  setInputValidationErrors: function (errors) {
    Object.keys(this.inputs).forEach(function (name, index) {
      var component = this.inputs[name];
      var args = [{
        _isValid: !(name in errors),
        _validationError: errors[name]
      }];
      component.setState.apply(component, args);
    }.bind(this));
  },

  // Go through errors from server and grab the components
  // stored in the inputs map. Change their state to invalid
  // and set the serverError message
  updateInputsWithError: function (errors) {
    Object.keys(errors).forEach(function (name, index) {
      var component = this.inputs[name];

      if (!component) {
        throw new Error('You are trying to update an input that does not exists. Verify errors object with input names. ' + JSON.stringify(errors));
      }

      var args = [{
        _isValid: false,
        _externalError: errors[name]
      }];
      component.setState.apply(component, args);
    }.bind(this));
  },

  // Traverse the children and children of children to find
  // all inputs by checking the name prop. Maybe do a better
  // check here
  traverseChildrenAndRegisterInputs: function (children) {

    if (typeof children !== 'object' || children === null) {
      return children;
    }
    return React.Children.map(children, function (child) {

      if (typeof child !== 'object' || child === null) {
        return child;
      }

      if (child.props && child.props.name) {

        return React.cloneElement(child, {
          _attachToForm: this.attachToForm,
          _detachFromForm: this.detachFromForm,
          _validate: this.validate,
          _isFormDisabled: this.isFormDisabled,
          _isValidValue: function (component, value) {
            return this.runValidation(component, value).isValid;
          }.bind(this)
        }, child.props && child.props.children);
      } else {
        return React.cloneElement(child, {}, this.traverseChildrenAndRegisterInputs(child.props && child.props.children));
      }

    }, this);

  },

  isFormDisabled: function () {
    return this.props.disabled;
  },

  getCurrentValues: function () {
    return Object.keys(this.inputs).reduce(function (data, name) {
      var component = this.inputs[name];
      data[name] = component.state._value;
      return data;
    }.bind(this), {});
  },

  setFormPristine: function (isPristine) {
    var inputs = this.inputs;
    var inputKeys = Object.keys(inputs);

    // Iterate through each component and set it as pristine
    // or "dirty".
    inputKeys.forEach(function (name, index) {
      var component = inputs[name];
      component.setState({
        _isPristine: isPristine
      });
    }.bind(this));
  },

  // Use the binded values and the actual input value to
  // validate the input and set its state. Then check the
  // state of the form itself
  validate: function (component) {

    // Trigger onChange
    if (this.state.canChange) {
      this.props.onChange(this.getCurrentValues());
    }

    var validation = this.runValidation(component);
    // Run through the validations, split them up and call
    // the validator IF there is a value or it is required
    component.setState({
      _isValid: validation.isValid,
      _isRequired: validation.isRequired,
      _validationError: validation.error,
      _externalError: null
    }, this.validateForm);

  },

  // Checks validation on current value or a passed value
  runValidation: function (component, value) {

    var currentValues = this.getCurrentValues();
    var validationErrors = component.props.validationErrors;
    var validationError = component.props.validationError;
    value = arguments.length === 2 ? value : component.state._value;

    var validationResults = this.runRules(value, currentValues, component._validations);
    var requiredResults = this.runRules(value, currentValues, component._requiredValidations);

    // the component defines an explicit validate function
    if (typeof component.validate === "function") {
      validationResults.failed = component.validate() ? [] : ['failed'];
    }

    var isRequired = Object.keys(component._requiredValidations).length ? !!requiredResults.success.length : false;
    var isValid = !validationResults.failed.length && !(this.props.validationErrors && this.props.validationErrors[component.props.name]);

    return {
      isRequired: isRequired,
      isValid: isRequired ? false : isValid,
      error: (function () {

        if (isValid && !isRequired) {
          return '';
        }

        if (validationResults.errors.length) {
          return validationResults.errors[0];
        }

        if (this.props.validationErrors && this.props.validationErrors[component.props.name]) {
          return this.props.validationErrors[component.props.name];
        }

        if (isRequired) {
          return validationErrors[requiredResults.success[0]] || null;
        }

        if (!isValid) {
          return validationErrors[validationResults.failed[0]] || validationError;
        }

      }.call(this))
    };

  },

  runRules: function (value, currentValues, validations) {

    var results = {
      errors: [],
      failed: [],
      success: []
    };
    if (Object.keys(validations).length) {
      Object.keys(validations).forEach(function (validationMethod) {

        if (validationRules[validationMethod] && typeof validations[validationMethod] === 'function') {
          throw new Error('Formsy does not allow you to override default validations: ' + validationMethod);
        }

        if (!validationRules[validationMethod] && typeof validations[validationMethod] !== 'function') {
          throw new Error('Formsy does not have the validation rule: ' + validationMethod);
        }

        if (typeof validations[validationMethod] === 'function') {
          var validation = validations[validationMethod](currentValues, value);
          if (typeof validation === 'string') {
            results.errors.push(validation);
            results.failed.push(validationMethod);
          } else if (!validation) {
            results.failed.push(validationMethod);
          }
          return;

        } else if (typeof validations[validationMethod] !== 'function') {
          var validation = validationRules[validationMethod](currentValues, value, validations[validationMethod]);
          if (typeof validation === 'string') {
            results.errors.push(validation);
            results.failed.push(validationMethod);
          } else if (!validation) {
            results.failed.push(validationMethod);
          } else {
            results.success.push(validationMethod);
          }
          return;

        }

        return results.success.push(validationMethod);

      });
    }

    return results;

  },

  // Validate the form by going through all child input components
  // and check their state
  validateForm: function () {
    var allIsValid = true;
    var inputs = this.inputs;
    var inputKeys = Object.keys(inputs);

    // We need a callback as we are validating all inputs again. This will
    // run when the last component has set its state
    var onValidationComplete = function () {
      inputKeys.forEach(function (name) {
        if (!inputs[name].state._isValid) {
          allIsValid = false;
        }
      }.bind(this));

      this.setState({
        isValid: allIsValid
      });

      if (allIsValid) {
        this.props.onValid();
      } else {
        this.props.onInvalid();
      }

      // Tell the form that it can start to trigger change events
      this.setState({
        canChange: true
      });

    }.bind(this);

    // Run validation again in case affected by other inputs. The
    // last component validated will run the onValidationComplete callback
    inputKeys.forEach(function (name, index) {
      var component = inputs[name];
      var validation = this.runValidation(component);
      if (validation.isValid && component.state._externalError) {
        validation.isValid = false;
      }
      component.setState({
        _isValid: validation.isValid,
        _isRequired: validation.isRequired,
        _validationError: validation.error,
        _externalError: !validation.isValid && component.state._externalError ? component.state._externalError : null
      }, index === inputKeys.length - 1 ? onValidationComplete : null);
    }.bind(this));

    // If there are no inputs, set state where form is ready to trigger
    // change event. New inputs might be added later
    if (!inputKeys.length && this.isMounted()) {
      this.setState({
        canChange: true
      });
    }
  },

  // Method put on each input component to register
  // itself to the form
  attachToForm: function (component) {
    this.inputs[component.props.name] = component;
    this.model[component.props.name] = component.state._value;
    this.validate(component);
  },

  // Method put on each input component to unregister
  // itself from the form
  detachFromForm: function (component) {
    delete this.inputs[component.props.name];
    delete this.model[component.props.name];
  },
  render: function () {

    return React.DOM.form({
        onSubmit: this.submit,
        className: this.props.className 
      },
      this.traverseChildrenAndRegisterInputs(this.props.children)
    );

  }
});

if (!global.exports && !global.module && (!global.define || !global.define.amd)) {
  global.Formsy = Formsy;
}

module.exports = Formsy;



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Mixin.js":2,"./utils.js":3,"./validationRules.js":4,"react":"react"}],2:[function(require,module,exports){
var convertValidationsToObject = function (validations) {

  if (typeof validations === 'string') {

    return validations.split(/\,(?![^{\[]*[}\]])/g).reduce(function (validations, validation) {
      var args = validation.split(':');
      var validateMethod = args.shift();
      args = args.map(function (arg) {
        try {
          return JSON.parse(arg);
        } catch (e) {
          return arg; // It is a string if it can not parse it
        }
      });
      
      if (args.length > 1) {
        throw new Error('Formsy does not support multiple args on string validations. Use object format of validations instead.');
      }
      validations[validateMethod] = args.length ? args[0] : true;
      return validations;
    }, {});

  }

  return validations || {};

};
module.exports = {
  getInitialState: function () {
    return {
      _value: this.props.value,
      _isRequired: false,
      _isValid: true,
      _isPristine: true,
      _pristineValue: this.props.value,
      _validationError: '',
      _externalError: null
    };
  },
  getDefaultProps: function () {
    return {
      validationError: '',
      validationErrors: {}
    };
  },
  componentWillMount: function () {

    var configure = function () {
      this.setValidations(this.props.validations, this.props.required);
      this.props._attachToForm(this);
    }.bind(this);

    if (!this.props.name) {
      throw new Error('Form Input requires a name property when used');
    }

    if (!this.props._attachToForm) {
      return setTimeout(function () {
        if (!this.isMounted()) return;
        if (!this.props._attachToForm) {
          throw new Error('Form Mixin requires component to be nested in a Form');
        }
        configure();
      }.bind(this), 0);
    }
    configure();

  },

  // We have to make the validate method is kept when new props are added
  componentWillReceiveProps: function (nextProps) {
    this.setValidations(nextProps.validations, nextProps.required);
  },

  componentDidUpdate: function (prevProps, prevState) {

    var isValueChanged = function () {
      
      return this.props.value !== prevProps.value && this.state._value === prevProps.value;

    }.bind(this);


    // If validations has changed or something outside changes 
    // the value, set the value again running a validation
    if (isValueChanged()) {
      this.setValue(this.props.value);
    }
  },

  // Detach it when component unmounts
  componentWillUnmount: function () {
    this.props._detachFromForm(this);
  },

  setValidations: function (validations, required) {

    // Add validations to the store itself as the props object can not be modified
    this._validations = convertValidationsToObject(validations) || {};
    this._requiredValidations = required === true ? {isDefaultRequiredValue: true} : convertValidationsToObject(required);

  },

  // We validate after the value has been set
  setValue: function (value) {
    this.setState({
      _value: value,
      _isPristine: false
    }, function () {
      this.props._validate(this);
    }.bind(this));
  },
  resetValue: function () {
    this.setState({
      _value: this.state._pristineValue,
      _isPristine: true
    }, function () {
      this.props._validate(this);
    });
  },
  getValue: function () {
    return this.state._value;
  },
  hasValue: function () {
    return this.state._value !== '';
  },
  getErrorMessage: function () {
    return !this.isValid() || this.showRequired() ? (this.state._externalError || this.state._validationError) : null;
  },
  isFormDisabled: function () {
    return this.props._isFormDisabled();
  },
  isValid: function () {
    return this.state._isValid;
  },
  isPristine: function () {
    return this.state._isPristine;
  },
  isRequired: function () {
    return !!this.props.required;
  },
  showRequired: function () {
    return this.state._isRequired;
  },
  showError: function () {
    return !this.showRequired() && !this.isValid();
  },
  isValidValue: function (value) {
    return this.props._isValidValue.call(null, this, value);
  }
};



},{}],3:[function(require,module,exports){
module.exports = {
  arraysDiffer: function (arrayA, arrayB) {
    var isDifferent = false;
    if (arrayA.length !== arrayB.length) {
      isDifferent = true;
    } else {
      arrayA.forEach(function (item, index) {
        if (item !== arrayB[index]) {
          isDifferent = true;
        }
      });
    }
    return isDifferent;
  }
};



},{}],4:[function(require,module,exports){
module.exports = {
  isDefaultRequiredValue: function (values, value) {
    return value === undefined || value === '';
  },
  hasValue: function (values, value) {
    return !!value;
  },
  matchRegexp: function (values, value, regexp) {
    return !!value && !!value.match(regexp);
  },
  isUndefined: function (values, value) {
    return value === undefined;
  },
  isEmptyString: function (values, value) {
    return value === '';
  },
  isEmail: function (values, value) {
    return !value || value.match(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
  },
  isTrue: function (values, value) {
    return value === true;
  },
  isFalse: function (values, value) {
    return value === false;
  },
  isNumeric: function (values, value) {
    if (!value) {
        return false;
    }
    if (typeof value === 'number') {
      return true;
    } else {
      var matchResults = value.match(/[-+]?(\d*[.])?\d+/);
      if (!!matchResults) {
        return matchResults[0] == value;
      } else {
        return false;
      }
    }
  },
  isAlpha: function (values, value) {
    return value && /^[a-zA-Z]+$/.test(value);
  },
  isWords: function (values, value) {
    return value && /^[a-zA-Z\s]+$/.test(value);
  },
  isSpecialWords: function (values, value) {
    return !value || value.match(/^[a-zA-Z\s\u00C0-\u017F]+$/);
  },
  isLength: function (values, value, length) {
    return value && value.length === length;
  },
  equals: function (values, value, eql) {
    return value == eql;
  },
  equalsField: function (values, value, field) {
    return value == values[field];
  },
  maxLength: function (values, value, length) {
    return value && value.length && value.length <= length;
  },
  minLength: function (values, value, length) {
    return value && value.length && value.length >= length;
  }
};



},{}]},{},[1]);
