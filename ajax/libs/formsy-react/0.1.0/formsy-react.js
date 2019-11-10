!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define(["react"],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Formsy=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/christianalfoni/Documents/dev/formsy-react/src/main.js":[function(require,module,exports){
(function (global){
var React = global.React || require('react');
var Formsy = {};
var validationRules = {
  'isValue': function (value) {
    return !!value;
  },
  'isEmail': function (value) {
    return value.match(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
  },
  'isTrue': function (value) {
    return value === true;
  },
  'isNumeric': function (value) {
    return value.match(/^-?[0-9]+$/)
  },
  'isAlpha': function (value) {
    return value.match(/^[a-zA-Z]+$/);
  },
  isLength: function (value, min, max) {
    if (max !== undefined) {
      return value.length >= min && value.length <= max;
    }
    return value.length >= min;
  },
  equals: function (value, eql) {
    return value == eql;
  }
};
var toURLEncoded = function (element,key,list){
  var list = list || [];
  if(typeof(element)=='object'){
    for (var idx in element)
      toURLEncoded(element[idx],key?key+'['+idx+']':idx,list);
  } else {
    list.push(key+'='+encodeURIComponent(element));
  }
  return list.join('&');
};

var request = function (method, url, data, contentType) {

  var contentType = contentType === 'urlencoded' ? 'application/' + contentType.replace('urlencoded', 'x-www-form-urlencoded') : 'application/json';
  data = contentType === 'application/json' ? JSON.stringify(data) : toURLEncoded(data);

  return new Promise(function (resolve, reject) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Content-Type', contentType);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {

          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.responseText ? JSON.parse(xhr.responseText) : null);
          } else {
            reject(xhr.responseText ? JSON.parse(xhr.responseText) : null);
          }

        }
      };
      xhr.send(data);
    } catch (e) {
      reject(e);
    }
  });

};
var ajax = {
  post: request.bind(null, 'POST'),
  put: request.bind(null, 'PUT')
};
var options = {};

Formsy.defaults = function (passedOptions) {
  options = passedOptions;
};

Formsy.Mixin = {
  getInitialState: function () {
      return {
          _value: this.props.value ? this.props.value : '',
          _isValid: true
      };
  },
  componentWillMount: function () {

      if (!this.props.name) {
        throw new Error('Form Input requires a name property when used');
      }

      if (!this.props._attachToForm) {
        throw new Error('Form Mixin requires component to be nested in a Form');
      }

      if (this.props.required) {
          this.props.validations = this.props.validations ? this.props.validations + ',' : '';
          this.props.validations += 'isValue';
      }
      this.props._attachToForm(this);
  },

  // Detach it when component unmounts
  componentWillUnmount: function () {
      this.props._detachFromForm(this);
  },

  // We validate after the value has been set
  setValue: function (value) {
      this.setState({
          _value: value
      }, function () {
          this.props._validate(this);
      }.bind(this));
  },
  getValue: function () {
    return this.state._value;
  },
  getErrorMessage: function () {
    return this.isValid() || this.showRequired() ? null : this.state._serverError || this.props.validationError;
  },
  isValid: function () {
    return this.state._isValid;
  },
  isRequired: function () {
    return this.props.required;
  },
  showRequired: function () {
    return this.props.required && !this.state._value.length;
  },
  showError: function () {
    return !this.showRequired() && !this.state._isValid;
  }
};

Formsy.addValidationRule = function (name, func) {
  validationRules[name] = func;
};

Formsy.Form = React.createClass({
  getInitialState: function () {
    return {
      isValid: true,
      isSubmitting: false
    };
  },
  getDefaultProps: function () {
    return {
      onSuccess: function () {},
      onError: function () {},
      onSubmit: function () {},
      onSubmitted: function () {}
    }
  },

  // Add a map to store the inputs of the form, a model to store
  // the values of the form and register child inputs
  componentWillMount: function () {
    this.inputs = {};
    this.model = {};
    this.registerInputs(this.props.children);
  },

  componentDidMount: function () {
    this.validateForm();
  },

  // Update model, submit to url prop and send the model
  submit: function (event) {
    event.preventDefault();

    if (!this.props.url) {
      throw new Error('Formsy Form needs a url property to post the form');
    }

    this.updateModel();
    this.setState({
      isSubmitting: true
    });
    this.props.onSubmit();
    ajax[this.props.method || 'post'](this.props.url, this.model, this.props.contentType || options.contentType || 'json')
      .then(function (response) {
        this.onSuccess(response);
        this.onSubmitted();
      }.bind(this))
      .catch(this.updateInputsWithError);
  },

  // Goes through all registered components and
  // updates the model values
  updateModel: function () {
    Object.keys(this.inputs).forEach(function (name) {
      var component = this.inputs[name];
      this.model[name] = component.state._value;
    }.bind(this));
  },

  // Go through errors from server and grab the components
  // stored in the inputs map. Change their state to invalid
  // and set the serverError message
  updateInputsWithError: function (errors) {
    Object.keys(errors).forEach(function (name, index) {
      var component = this.inputs[name];
      var args = [{
        _isValid: false,
        _serverError: errors[name]
      }];
      if (index === Object.keys(errors).length - 1) {
        args.push(this.validateForm);
      }
      component.setState.apply(component, args);
    }.bind(this));
    this.setState({
      isSubmitting: false
    });
    this.props.onError(errors);
    this.props.onSubmitted();
  },

  // Traverse the children and children of children to find
  // all inputs by checking the name prop. Maybe do a better
  // check here
  registerInputs: function (children) {
    React.Children.forEach(children, function (child) {

      if (child.props.name) {
        child.props._attachToForm = this.attachToForm;
        child.props._detachFromForm = this.detachFromForm;
        child.props._validate = this.validate;
      }

      if (child.props.children) {
        this.registerInputs(child.props.children);
      }

    }.bind(this));
  },

  // Use the binded values and the actual input value to
  // validate the input and set its state. Then check the
  // state of the form itself
  validate: function (component) {

    if (!component.props.validations) {
      return;
    }

    // Run through the validations, split them up and call
    // the validator IF there is a value or it is required
    var isValid = true;
    if (component.props.required || component.state._value) {
      component.props.validations.split(',').forEach(function (validation) {
        var args = validation.split(':');
        var validateMethod = args.shift();
        args = args.map(function (arg) { return JSON.parse(arg); });
        args = [component.state._value].concat(args);
        if (!validationRules[validateMethod]) {
          throw new Error('Formsy does not have the validation rule: ' + validateMethod);
        }
        if (!validationRules[validateMethod].apply(null, args)) {
          isValid = false;
        }
      });
    }

    component.setState({
      _isValid: isValid,
      _serverError: null
    }, this.validateForm);

  },

  // Validate the form by going through all child input components
  // and check their state
  validateForm: function () {
    var allIsValid = true;
    var inputs = this.inputs;
    
    Object.keys(inputs).forEach(function (name) {
      if (!inputs[name].state._isValid) {
        allIsValid = false;
      }
    });

    this.setState({
      isValid: allIsValid
    });
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
    var submitButton = React.DOM.button({
      className: this.props.submitButtonClass || options.submitButtonClass,
      disabled: this.state.isSubmitting || !this.state.isValid
    }, this.props.submitLabel || 'Submit');

    var cancelButton = React.DOM.button({
      onClick: this.props.onCancel,
      disabled: this.state.isSubmitting,
      className: this.props.resetButtonClass || options.resetButtonClass
    }, this.props.cancelLabel || 'Cancel');

    return React.DOM.form({
      onSubmit: this.submit,
      className: this.props.className
    }, 
      this.props.children, 
      React.DOM.div({
        className: this.props.buttonWrapperClass || options.buttonWrapperClass
      }, 
        this.props.showCancel || options.showCancel ? cancelButton : null, 
        this.props.hideSubmit || options.hideSubmit ? null : submitButton
      )
    );
    
  }
});

if (!global.exports && !global.module && (!global.define || !global.define.amd)) {
  global.Formsy = Formsy;
}

module.exports = Formsy;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"react":"react"}]},{},["/Users/christianalfoni/Documents/dev/formsy-react/src/main.js"])("/Users/christianalfoni/Documents/dev/formsy-react/src/main.js")
});