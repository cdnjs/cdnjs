import { w as warn, F as extractModule, W as WidgetBehavior, i as isEqual, d as deepQueryAll } from './index-e74c1c40.js';

const VALIDATORS = {
  email: (val) => extractModule(import('./index-121a3ddd.js').then(function (n) { return n.i; }))
    .then(validator => !val || validator.validate(val)),
  maxlength: (val, option) => val == null || val.length <= Number(option),
  minlength: (val, option) => val == null || val.length >= Number(option),
  required: (val) => {
    switch (typeof val) {
      case 'string':
        return val.length > 0;
      case 'number':
        return !Number.isNaN(val);
      case 'boolean':
        return true;
      default:
        return val != null;
    }
  },
};

function checkErrors(data, checks) {
  const names = Object.keys(checks);
  const errors = {};

  Object.keys(data)
    .forEach(name => {
      const value = data[name];

      if (typeof value === 'object' && value.$errors) {
        errors[name] = value.$errors;
      }
    });

  return Promise.all(
    names
      .map(name => {
        const validators = checks[name];

        if (!validators) return true;

        const checkNames = Object.keys(validators);

        return Promise.all(checkNames
          .map(check => {
            const options = validators[check];
            const validator = VALIDATORS[check];

            // validator(data[name], options).then(result => {
            //   console.log('validation', name, options, result);
            // });

            // if it's a custom validator method
            if (typeof options === 'function') {
              return options(data[name]);
            } else {
              if (!validator) {
                warn('unknown validator', check);

                return true;
              }

              return validator(data[name], options);
            }
          }))
          .then(results => {
            const valid = results.every(r => r);

            // tell there is no error on prop
            if (valid) {
              // console.log('valid field', name, results);
              return false;
            }

            // console.log('invalid field', name);

            return checkNames.reduce((map, check, i) => {
              if (!results[i]) {
                map[check] = true;
              }

              return map;
            }, {});
          });
      })
  ).then(results => {
    return names.reduce((map, name, i) => {
      if (results[i]) {
        map[name] = results[i];
      }

      return map;
    }, errors);
  }).then(() => {
    const valid = !Object.keys(errors).length;

    if (valid) return false;

    return errors;
  });
}

/**
 * @copyright https://github.com/hyperatom
 * @url https://github.com/hyperatom/json-form-data
 */

function mergeObjects(object1, object2) {
  return [object1, object2].reduce(function (carry, objectToMerge) {
    Object.keys(objectToMerge).forEach(function (objectKey) {
      carry[objectKey] = objectToMerge[objectKey];
    });
    return carry;
  }, {});
}

function isArray(val) {

  return ({}).toString.call(val) === '[object Array]';
}

function isJsonObject(val) {

  return !isArray(val) && typeof val === 'object' && !!val && !(val instanceof Blob) && !(val instanceof Date);
}

function isAppendFunctionPresent(formData) {

  return typeof formData.append === 'function';
}

function isGlobalFormDataPresent() {

  return typeof FormData === 'function';
}

function getDefaultFormData() {

  if (isGlobalFormDataPresent()) {
    return new FormData();
  }
}

function convert(jsonObject, options) {

  if (options && options.initialFormData) {

    if (!isAppendFunctionPresent(options.initialFormData)) {

      throw 'initialFormData must have an append function.';
    }
  } else if (!isGlobalFormDataPresent()) {

    throw 'This environment does not have global form data. options.initialFormData must be specified.';
  }

  let defaultOptions = {
    initialFormData: getDefaultFormData(),
    showLeafArrayIndexes: true,
    includeNullValues: false,
    mapping: function (value) {
      if (typeof value === 'boolean') {
        return +value ? '1' : '0';
      }
      return value;
    }
  };

  let mergedOptions = mergeObjects(defaultOptions, options || {});

  return convertRecursively(jsonObject, mergedOptions, mergedOptions.initialFormData);
}

function convertRecursively(jsonObject, options, formData, parentKey) {

  let index = 0;

  for (let key in jsonObject) {

    if (jsonObject.hasOwnProperty(key)) {

      let propName = parentKey || key;
      let value = options.mapping(jsonObject[key]);

      if (parentKey && isJsonObject(jsonObject)) {
        propName = parentKey + '[' + key + ']';
      }

      if (parentKey && isArray(jsonObject)) {

        if (isArray(value) || options.showLeafArrayIndexes) {
          propName = parentKey + '[' + index + ']';
        } else {
          propName = parentKey + '[]';
        }
      }

      if (isArray(value) || isJsonObject(value)) {

        convertRecursively(value, options, formData, propName);

      } else if (value instanceof FileList) {

        for (let j = 0; j < value.length; j++) {
          formData.append(propName + '[' + j + ']', value.item(j));
        }
      } else if (value instanceof Blob) {

        formData.append(propName, value, value.name);

      } else if (value instanceof Date) {

        formData.append(propName, value.toISOString());

      } else if (((value === null && options.includeNullValues) || value !== null) && value !== undefined) {

        formData.append(propName, value);
      }
    }
    index++;
  }
  return formData;
}

/**
 * Behavior to handle form logic.
 * Value of the form is actually DATA and can only be set by element property.
 */
class FormBehavior extends WidgetBehavior {
  static get params() {
    return {
      input: true,
      primary: true,
      provideValue: false,
      contextValue: false,
    };
  }

  init() {
    this.value = {};
    this.validators = {};
    this.checks = {};
    this.fields = {};

    super.init();

    const { host } = this;

    host.nuSetMod('form', true);

    if (!this.value) {
      this.value = {};
    }

    this.setContext('form', this);
    this.context.value = null;

    this.on('nu-change', (event) => {
      const field = event.detail;
      if (this.fields[field]) {
        this.verifyData(field);
      }
    });

    this.provideAction('submit', () => {
      this.verifyData()
        .then(valid => {
          if (valid) {
            this.emit('input', this.type === 'formdata'
              ? convert(this.value) : { ...(this.value || {}) });
            this.control();
          }
        });
    });
  }

  verifyData(field) {
    return (!field ? this.setDirty() : Promise.resolve())
      .then(() => this.validate())
      .then(valid => {
        this.setErrorProps(field);

        return valid;
      });
  }

  connected() {
    super.connected();

    setTimeout(() => this.validate(true));
  }

  setValue(value, silent) {
    if (typeof value !== 'object') return;

    const serializedValue = JSON.stringify(value);

    if (JSON.stringify(value) === this._serializedValue || !value) return;

    this._serializedValue = serializedValue;
    this.value = value;

    if (!silent) {
      this.validate()
        .then(valid => {
          if (valid) {
            this.emit('input', this.value);
          }
        });
    }

    this.control();
  }

  setFieldValue(name, value) {
    const { fields } = this;

    if (isEqual(this.value[name], value)) return;

    if (value != null) {
      this.value[name] = value;

      if (fields[name]) {
        // remove warnings if user changes data
        this.resetFieldWarning(name);
      }
    } else {
      delete this.value[name];
    }

    this.validate();
  }

  registerCheck(field, element, name, value) {
    if (!this.validators[field]) {
      this.validators[field] = {};
    }

    if (!this.checks[field]) {
      this.checks[field] = {};
    }

    this.validators[field][name] = value;
    this.checks[field][name] = element;
  }

  registerField(name, el) {
    this.fields[name] = el;
  }

  unregisterCheck(field, name) {
    if (this.validators[field]) {
      delete this.validators[field][name];
    }

    if (this.checks[field]) {
      delete this.checks[field][name];
    }
  }

  unregisterField(name) {
    delete this.fields[name];
  }

  connectForm() {
    super.connectForm();

    const validators = this.validators;

    this.validators = Object.create(this.form.validators);

    Object.keys(validators).forEach(validator => {
      this.validators[validator] = validators[validator];
    });
  }

  /**
   * Check form data correctness.
   * @return {Promise<boolean>}
   */
  validate(silent) {
    return checkErrors(this.value, this.validators)
      .then(errors => {
        if (errors) {
          this.value.$errors = errors;
        } else {
          delete this.value.$errors;
        }

        return !errors;
      });
  }

  setDirty() {
    const forms = deepQueryAll(this.host, '[is-form]');

    this.dirty = true;

    return Promise.all(forms
      .map(formEl => {
        return formEl.use('form')
          .then(Form => {
            return Form.setDirty()
              .then(() => Form.validate())
              .then(() => Form.setErrorProps())
          });
      }));
  }

  /**
   * Set custom properties to show active errors
   * @returns
   */
  setErrorProps(field) {
    const names = Object.keys(this.validators);
    const errors = this.value.$errors || {};
    const fields = this.fields;
    const checks = this.checks;

    names.forEach(name => {
      if (field && field !== name) return;

      const validators = Object.keys(this.validators[name]);
      const fieldChecks = checks[name];

      let invalid = false;

      for (let validator of validators) {
        if (errors && errors[name] && errors[name][validator] && !invalid) {
          invalid = true;
          fieldChecks[validator].setValidity(false);
          // this.host.style.setProperty(prop, 'block');
        } else {
          fieldChecks[validator].setValidity(true);
          // this.host.style.setProperty(prop, 'none');
        }
      }

      if (fields[name]) {
        fields[name].setValidity(!invalid);
      }
    });
  }

  resetFieldWarning(name) {
    const field = this.fields[name];
    const validators = Object.keys(this.validators[name] || {});

    for (let check of validators) {
      const prop = `--check-${name}-${check}`;

      this.host.style.setProperty(prop, 'none');
    }

    if (field) {
      field.setValidity(true);
    }
  }
}

export default FormBehavior;
