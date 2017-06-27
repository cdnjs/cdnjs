/*!
* Parsleyjs
* Guillaume Potier - <guillaume@wisembly.com>
* Version 2.2.0-rc1 - built Sun Aug 16 2015 14:04:07
* MIT Licensed
*
*/
!(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module depending on jQuery.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Register plugin with global jQuery object.
    factory(jQuery);
  }
}(function ($) {
  // small hack for requirejs if jquery is loaded through map and not path
  // see http://requirejs.org/docs/jquery.html
  if ('undefined' === typeof $ && 'undefined' !== typeof window.jQuery)
    $ = window.jQuery;
  var globalID = 1,
    pastWarnings = {};
  var ParsleyUtils = {
    // Parsley DOM-API
    // returns object from dom attributes and values
    attr: function ($element, namespace, obj) {
      var
        attribute, attributes,
        regex = new RegExp('^' + namespace, 'i');
      if ('undefined' === typeof obj)
        obj = {};
      else {
        // Clear all own properties. This won't affect prototype's values
        for (var i in obj) {
          if (obj.hasOwnProperty(i))
            delete obj[i];
        }
      }
      if ('undefined' === typeof $element || 'undefined' === typeof $element[0])
        return obj;
      attributes = $element[0].attributes;
      for (var i = attributes.length; i--; ) {
        attribute = attributes[i];
        if (attribute && attribute.specified && regex.test(attribute.name)) {
          obj[this.camelize(attribute.name.slice(namespace.length))] = this.deserializeValue(attribute.value);
        }
      }
      return obj;
    },
    checkAttr: function ($element, namespace, checkAttr) {
      return $element.is('[' + namespace + checkAttr + ']');
    },
    setAttr: function ($element, namespace, attr, value) {
      $element[0].setAttribute(this.dasherize(namespace + attr), String(value));
    },
    generateID: function () {
      return '' + globalID++;
    },
    /** Third party functions **/
    // Zepto deserialize function
    deserializeValue: function (value) {
      var num;
      try {
        return value ?
          value == "true" ||
          (value == "false" ? false :
          value == "null" ? null :
          !isNaN(num = Number(value)) ? num :
          /^[\[\{]/.test(value) ? $.parseJSON(value) :
          value)
          : value;
      } catch (e) { return value; }
    },
    // Zepto camelize function
    camelize: function (str) {
      return str.replace(/-+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : '';
      });
    },
    // Zepto dasherize function
    dasherize: function (str) {
      return str.replace(/::/g, '/')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
        .replace(/([a-z\d])([A-Z])/g, '$1_$2')
        .replace(/_/g, '-')
        .toLowerCase();
    },
    warn: function() {
      if (window.console && 'function' === typeof window.console.warn)
        window.console.warn.apply(window.console, arguments);
    },
    warnOnce: function(msg) {
      if (!pastWarnings[msg]) {
        pastWarnings[msg] = true;
        this.warn.apply(this, arguments);
      }
    },
    _resetWarnings: function() {
      pastWarnings = {};
    },
    trimString: function(string) {
      return string.replace(/^\s+|\s+$/g, '');
    },
    // Object.create polyfill, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create#Polyfill
    objectCreate: Object.create || (function () {
      var Object = function () {};
      return function (prototype) {
        if (arguments.length > 1) {
          throw Error('Second argument not supported');
        }
        if (typeof prototype != 'object') {
          throw TypeError('Argument must be an object');
        }
        Object.prototype = prototype;
        var result = new Object();
        Object.prototype = null;
        return result;
      };
    })()
  };
// All these options could be overriden and specified directly in DOM using
// `data-parsley-` default DOM-API
// eg: `inputs` can be set in DOM using `data-parsley-inputs="input, textarea"`
// eg: `data-parsley-stop-on-first-failing-constraint="false"`

  var ParsleyDefaults = {
    // ### General
    // Default data-namespace for DOM API
    namespace: 'data-parsley-',
    // Supported inputs by default
    inputs: 'input, textarea, select',
    // Excluded inputs by default
    excluded: 'input[type=button], input[type=submit], input[type=reset], input[type=hidden]',
    // Stop validating field on highest priority failing constraint
    priorityEnabled: true,
    // ### Field only
    // identifier used to group together inputs (e.g. radio buttons...)
    multiple: null,
    // identifier (or array of identifiers) used to validate only a select group of inputs
    group: null,
    // ### UI
    // Enable\Disable error messages
    uiEnabled: true,
    // Key events threshold before validation
    validationThreshold: 3,
    // Focused field on form validation error. 'first'|'last'|'none'
    focus: 'first',
    // `$.Event()` that will trigger validation. eg: `keyup`, `change`...
    trigger: false,
    // Class that would be added on every failing validation Parsley field
    errorClass: 'parsley-error',
    // Same for success validation
    successClass: 'parsley-success',
    // Return the `$element` that will receive these above success or error classes
    // Could also be (and given directly from DOM) a valid selector like `'#div'`
    classHandler: function (ParsleyField) {},
    // Return the `$element` where errors will be appended
    // Could also be (and given directly from DOM) a valid selector like `'#div'`
    errorsContainer: function (ParsleyField) {},
    // ul elem that would receive errors' list
    errorsWrapper: '<ul class="parsley-errors-list"></ul>',
    // li elem that would receive error message
    errorTemplate: '<li></li>'
  };

  var ParsleyAbstract = function () {};
  ParsleyAbstract.prototype = {
    asyncSupport: true, // Deprecated
    actualizeOptions: function () {
      ParsleyUtils.attr(this.$element, this.options.namespace, this.domOptions);
      if (this.parent && this.parent.actualizeOptions)
        this.parent.actualizeOptions();
      return this;
    },
    _resetOptions: function (initOptions) {
      this.domOptions = ParsleyUtils.objectCreate(this.parent.options);
      this.options = ParsleyUtils.objectCreate(this.domOptions);
      // Shallow copy of ownProperties of initOptions:
      for (var i in initOptions) {
        if (initOptions.hasOwnProperty(i))
          this.options[i] = initOptions[i];
      }
      this.actualizeOptions();
    },
    _listeners: null,
    // Register a callback for the given event name.
    // Callback is called with context as the first argument and the `this`.
    // The context is the current parsley instance, or window.Parsley if global.
    // A return value of `false` will interrupt the calls
    on: function (name, fn) {
      this._listeners = this._listeners || {};
      var queue = this._listeners[name] = this._listeners[name] || [];
      queue.push(fn);
      return this;
    },
    // Deprecated. Use `on` instead.
    subscribe: function(name, fn) {
      $.listenTo(this, name.toLowerCase(), fn);
    },
    // Unregister a callback (or all if none is given) for the given event name
    off: function (name, fn) {
      var queue = this._listeners && this._listeners[name];
      if (queue) {
        if (!fn) {
          delete this._listeners[name];
        } else {
          for(var i = queue.length; i--; )
            if (queue[i] === fn)
              queue.splice(i, 1);
        }
      }
      return this;
    },
    // Deprecated. Use `off`
    unsubscribe: function(name, fn) {
      $.unsubscribeTo(this, name.toLowerCase());
    },
    // Trigger an event of the given name.
    // A return value of `false` interrupts the callback chain.
    // Returns false if execution was interrupted.
    trigger: function (name, target) {
      target = target || this;
      var queue = this._listeners && this._listeners[name];
      var result, parentResult;
      if (queue) {
        for(var i = queue.length; i--; ) {
          result = queue[i].call(target, target);
          if (result === false) return result;
        }
      }
      if (this.parent) {
        return this.parent.trigger(name, target);
      }
      return true;
    },
    // Reset UI
    reset: function () {
      // Field case: just emit a reset event for UI
      if ('ParsleyForm' !== this.__class__)
        return this._trigger('reset');
      // Form case: emit a reset event for each field
      for (var i = 0; i < this.fields.length; i++)
        this.fields[i]._trigger('reset');
      this._trigger('reset');
    },
    // Destroy Parsley instance (+ UI)
    destroy: function () {
      // Field case: emit destroy event to clean UI and then destroy stored instance
      if ('ParsleyForm' !== this.__class__) {
        this.$element.removeData('Parsley');
        this.$element.removeData('ParsleyFieldMultiple');
        this._trigger('destroy');
        return;
      }
      // Form case: destroy all its fields and then destroy stored instance
      for (var i = 0; i < this.fields.length; i++)
        this.fields[i].destroy();
      this.$element.removeData('Parsley');
      this._trigger('destroy');
    },
    asyncIsValid: function() {
      ParsleyUtils.warnOnce("asyncIsValid is deprecated; please use whenIsValid instead");
      return this.whenValid.apply(this, arguments);
    },
    _findRelatedMultiple: function() {
      return this.parent.$element.find('[' + this.options.namespace + 'multiple="' + this.options.multiple +'"]');
    }
  };

  var requirementConverters = {
    string: function(string) {
      return string;
    },
    integer: function(string) {
      if (isNaN(string))
        throw 'Requirement is not an integer: "' + string + '"';
      return parseInt(string, 10);
    },
    number: function(string) {
      if (isNaN(string))
        throw 'Requirement is not a number: "' + string + '"';
      return parseFloat(string);
    },
    reference: function(string) { // Unused for now
      var result = $(string);
      if (result.length === 0)
        throw 'No such reference: "' + string + '"';
      return result;
    },
    boolean: function(string) {
      return string !== 'false';
    },
    object: function(string) {
      return ParsleyUtils.deserializeValue(string);
    },
    regexp: function(regexp) {
      var flags = '';
      // Test if RegExp is literal, if not, nothing to be done, otherwise, we need to isolate flags and pattern
      if (!!(/^\/.*\/(?:[gimy]*)$/.test(regexp))) {
        // Replace the regexp literal string with the first match group: ([gimy]*)
        // If no flag is present, this will be a blank string
        flags = regexp.replace(/.*\/([gimy]*)$/, '$1');
        // Again, replace the regexp literal string with the first match group:
        // everything excluding the opening and closing slashes and the flags
        regexp = regexp.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1');
      }
      return new RegExp(regexp, flags);
    }
  };
  var convertArrayRequirement = function(string, length) {
    var m = string.match(/^\s*\[(.*)\]\s*$/)
    if (!m)
      throw 'Requirement is not an array: "' + string + '"';
    var values = m[1].split(',').map(ParsleyUtils.trimString);
    if (values.length !== length)
      throw 'Requirement has ' + values.length + ' values when ' + length + ' are needed';
    return values;
  };
  var convertRequirement = function(requirementType, string) {
    var converter = requirementConverters[requirementType || 'string'];
    if (!converter)
      throw 'Unknown requirement specification: "' + requirementType + '"';
    return converter(string);
  };
  var convertExtraOptionRequirement = function(requirementSpec, string, extraOptionReader) {
    var main = null, extra = {};
    for(var key in requirementSpec) {
      if (key) {
        var value = extraOptionReader(key);
        if('string' === typeof value)
          value = convertRequirement(requirementSpec[key], value);
        extra[key] = value;
      } else {
        main = convertRequirement(requirementSpec[key], string)
      }
    }
    return [main, extra];
  };
  // A Validator needs to implement the methods `validate` and `parseRequirements`
  var ParsleyValidator = function(spec) {
    $.extend(true, this, spec);
  };
  ParsleyValidator.prototype = {
    // Returns `true` iff the given `value` is valid according the given requirements.
    validate: function(value, requirementFirstArg) {
      if(this.fn) { // Legacy style validator
        if(arguments.length > 3)  // If more args then value, requirement, instance...
          requirementFirstArg = [].slice.call(arguments, 1, -1);  // Skip first arg (value) and last (instance), combining the rest
        return this.fn.call(this, value, requirementFirstArg);
      }
      if ($.isArray(value)) {
        if (!this.validateMultiple)
          throw 'Validator `' + this.name + '` does not handle multiple values';
        return this.validateMultiple.apply(this, arguments);
      } else {
        if (this.validateNumber) {
          if (isNaN(value))
            return false;
          value = parseFloat(value);
          return this.validateNumber.apply(this, arguments);
        }
        if (this.validateString) {
          return this.validateString.apply(this, arguments);
        }
        throw 'Validator `' + this.name + '` only handles multiple values';
      }
    },
    // Parses `requirements` into an array of arguments,
    // according to `this.requirementType`
    parseRequirements: function(requirements, extraOptionReader) {
      if ('string' !== typeof requirements) {
        // Assume requirement already parsed
        // but make sure we return an array
        return $.isArray(requirements) ? requirements : [requirements];
      }
      var type = this.requirementType;
      if ($.isArray(type)) {
        var values = convertArrayRequirement(requirements, type.length);
        for (var i = 0; i < values.length; i++)
          values[i] = convertRequirement(type[i], values[i]);
        return values;
      } else if ($.isPlainObject(type)) {
        return convertExtraOptionRequirement(type, requirements, extraOptionReader)
      } else {
        return [convertRequirement(type, requirements)];
      }
    },
    // Defaults:
    requirementType: 'string',
    priority: 2
  };

  var ParsleyValidatorRegistry = function (validators, catalog) {
    this.__class__ = 'ParsleyValidatorRegistry';
    // Default Parsley locale is en
    this.locale = 'en';
    this.init(validators || {}, catalog || {});
  };
  var typeRegexes =  {
    email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
    number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,
    integer: /^-?\d+$/,
    digits: /^\d+$/,
    alphanum: /^\w+$/i,
    url: new RegExp(
        "^" +
          // protocol identifier
          "(?:(?:https?|ftp)://)?" + // ** mod: make scheme optional
          // user:pass authentication
          "(?:\\S+(?::\\S*)?@)?" +
          "(?:" +
            // IP address exclusion
            // private & local networks
            // "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +   // ** mod: allow local networks
            // "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +  // ** mod: allow local networks
            // "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +  // ** mod: allow local networks
            // IP address dotted notation octets
            // excludes loopback network 0.0.0.0
            // excludes reserved space >= 224.0.0.0
            // excludes network & broacast addresses
            // (first & last IP address of each class)
            "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
            "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
            "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
          "|" +
            // host name
            "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
            // domain name
            "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
            // TLD identifier
            "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
          ")" +
          // port number
          "(?::\\d{2,5})?" +
          // resource path
          "(?:/\\S*)?" +
        "$", 'i'
      )
  };
  typeRegexes.range = typeRegexes.number;
  ParsleyValidatorRegistry.prototype = {
    init: function (validators, catalog) {
      this.catalog = catalog;
      // Copy prototype's validators:
      this.validators = $.extend({}, this.validators);
      for (var name in validators)
        this.addValidator(name, validators[name].fn, validators[name].priority);
      window.Parsley.trigger('parsley:validator:init');
    },
    // Set new messages locale if we have dictionary loaded in ParsleyConfig.i18n
    setLocale: function (locale) {
      if ('undefined' === typeof this.catalog[locale])
        throw new Error(locale + ' is not available in the catalog');
      this.locale = locale;
      return this;
    },
    // Add a new messages catalog for a given locale. Set locale for this catalog if set === `true`
    addCatalog: function (locale, messages, set) {
      if ('object' === typeof messages)
        this.catalog[locale] = messages;
      if (true === set)
        return this.setLocale(locale);
      return this;
    },
    // Add a specific message for a given constraint in a given locale
    addMessage: function (locale, name, message) {
      if ('undefined' === typeof this.catalog[locale])
        this.catalog[locale] = {};
      this.catalog[locale][name.toLowerCase()] = message;
      return this;
    },
    // Add a new validator
    //
    //    addValidator('custom', {
    //        requirementType: ['integer', 'integer'],
    //        validateString: function(value, from, to) {},
    //        priority: 22,
    //        messages: {
    //          en: "Hey, that's no good",
    //          fr: "Aye aye, pas bon du tout",
    //        }
    //    }
    //
    // Old API was addValidator(name, function, priority)
    //
    addValidator: function (name, arg1, arg2) {
      if (this.validators[name])
        ParsleyUtils.warn('Validator "' + name + '" is already defined.');
      else if (ParsleyDefaults.hasOwnProperty(name)) {
        ParsleyUtils.warn('"' + name + '" is a restricted keyword and is not a valid validator name.');
        return;
      };
      return this._setValidator.apply(this, arguments);
    },
    updateValidator: function (name, arg1, arg2) {
      if (!this.validators[name]) {
        ParsleyUtils.warn('Validator "' + name + '" is not already defined.');
        return this.addValidator.apply(this, arguments);
      }
      return this._setValidator(this, arguments);
    },
    removeValidator: function (name) {
      if (!this.validators[name])
        ParsleyUtils.warn('Validator "' + name + '" is not defined.');
      delete this.validators[name];
      return this;
    },
    _setValidator: function (name, validator, priority) {
      if ('object' !== typeof validator) {
        // Old style validator, with `fn` and `priority`
        validator = {
          fn: validator,
          priority: priority
        };
      };
      if (!validator.validate) {
        validator = new ParsleyValidator(validator);
      };
      this.validators[name] = validator;
      for (var locale in validator.messages || {})
        this.addMessage(locale, name, validator.messages[locale]);
      return this;
    },
    getErrorMessage: function (constraint) {
      var message;
      // Type constraints are a bit different, we have to match their requirements too to find right error message
      if ('type' === constraint.name) {
        var typeMessages = this.catalog[this.locale][constraint.name] || {};
        message = typeMessages[constraint.requirements];
      } else
        message = this.formatMessage(this.catalog[this.locale][constraint.name], constraint.requirements);
      return message || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage;
    },
    // Kind of light `sprintf()` implementation
    formatMessage: function (string, parameters) {
      if ('object' === typeof parameters) {
        for (var i in parameters)
          string = this.formatMessage(string, parameters[i]);
        return string;
      }
      return 'string' === typeof string ? string.replace(new RegExp('%s', 'i'), parameters) : '';
    },
    // Here is the Parsley default validators list.
    // A validator is an object with the following key values:
    //  - priority: an integer
    //  - requirement: 'string' (default), 'integer', 'number', 'regexp' or an Array of these
    //  - validateString, validateMultiple, validateNumber: functions returning `true`, `false` or a promise
    // Alternatively, a validator can be a function that returns such an object
    //
    validators: {
      notblank: {
        validateString: function(value) {
          return /\S/.test(value);
        },
        priority: 2
      },
      required: {
        validateMultiple: function(values) {
          return values.length > 0;
        },
        validateString: function(value) {
          return /\S/.test(value);
        },
        priority: 512
      },
      type: {
        validateString: function(value, type) {
          var regex = typeRegexes[type];
          if (!regex)
            throw new Error('validator type `' + type + '` is not supported');
          return regex.test(value);
        },
        priority: 256
      },
      pattern: {
        validateString: function(value, regexp) {
          return regexp.test(value);
        },
        requirementType: 'regexp',
        priority: 64
      },
      minlength: {
        validateString: function (value, requirement) {
          return value.length >= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      maxlength: {
        validateString: function (value, requirement) {
          return value.length <= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      length: {
        validateString: function (value, min, max) {
          return value.length >= min && value.length <= max;
        },
        requirementType: ['integer', 'integer'],
        priority: 30
      },
      mincheck: {
        validateMultiple: function (values, requirement) {
          return values.length >= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      maxcheck: {
        validateMultiple: function (values, requirement) {
          return values.length <= requirement;
        },
        requirementType: 'integer',
        priority: 30
      },
      check: {
        validateMultiple: function (values, min, max) {
          return values.length >= min && values.length <= max;
        },
        requirementType: ['integer', 'integer'],
        priority: 30
      },
      min: {
        validateNumber: function (value, requirement) {
          return value >= requirement;
        },
        requirementType: 'number',
        priority: 30
      },
      max: {
        validateNumber: function (value, requirement) {
          return value <= requirement;
        },
        requirementType: 'number',
        priority: 30
      },
      range: {
        validateNumber: function (value, min, max) {
          return value >= min && value <= max;
        },
        requirementType: ['number', 'number'],
        priority: 30
      },
      equalto: {
        validateString: function (value, refOrValue) {
          var $reference = $(refOrValue);
          if ($reference.length)
            return value === $reference.val();
          else
            return value === refOrValue;
        },
        priority: 256
      }
    }
  };

  var ParsleyUI = function (options) {
    this.__class__ = 'ParsleyUI';
  };
  ParsleyUI.prototype = {
    listen: function () {
      var that = this;
      window.Parsley
      .on('form:init',       function () { that.setupForm (this); } )
      .on('field:init',      function () { that.setupField(this); } )
      .on('field:validated', function () { that.reflow    (this); } )
      .on('form:validated',  function () { that.focus     (this); } )
      .on('field:reset',     function () { that.reset     (this); } )
      .on('form:destroy',    function () { that.destroy   (this); } )
      .on('field:destroy',   function () { that.destroy   (this); } );
      return this;
    },
    reflow: function (fieldInstance) {
      // If this field has not an active UI (case for multiples) don't bother doing something
      if ('undefined' === typeof fieldInstance._ui || false === fieldInstance._ui.active)
        return;
      // Diff between two validation results
      var diff = this._diff(fieldInstance.validationResult, fieldInstance._ui.lastValidationResult);
      // Then store current validation result for next reflow
      fieldInstance._ui.lastValidationResult = fieldInstance.validationResult;
      // Field have been validated at least once if here. Useful for binded key events...
      fieldInstance._ui.validatedOnce = true;
      // Handle valid / invalid / none field class
      this.manageStatusClass(fieldInstance);
      // Add, remove, updated errors messages
      this.manageErrorsMessages(fieldInstance, diff);
      // Triggers impl
      this.actualizeTriggers(fieldInstance);
      // If field is not valid for the first time, bind keyup trigger to ease UX and quickly inform user
      if ((diff.kept.length || diff.added.length) && true !== fieldInstance._ui.failedOnce)
        this.manageFailingFieldTrigger(fieldInstance);
    },
    // Returns an array of field's error message(s)
    getErrorsMessages: function (fieldInstance) {
      // No error message, field is valid
      if (true === fieldInstance.validationResult)
        return [];
      var messages = [];
      for (var i = 0; i < fieldInstance.validationResult.length; i++)
        messages.push(this._getErrorMessage(fieldInstance, fieldInstance.validationResult[i].assert));
      return messages;
    },
    manageStatusClass: function (fieldInstance) {
      if (fieldInstance.hasConstraints() && fieldInstance.needsValidation() && true === fieldInstance.validationResult)
        this._successClass(fieldInstance);
      else if (fieldInstance.validationResult.length > 0)
        this._errorClass(fieldInstance);
      else
        this._resetClass(fieldInstance);
    },
    manageErrorsMessages: function (fieldInstance, diff) {
      if ('undefined' !== typeof fieldInstance.options.errorsMessagesDisabled)
        return;
      // Case where we have errorMessage option that configure an unique field error message, regardless failing validators
      if ('undefined' !== typeof fieldInstance.options.errorMessage) {
        if ((diff.added.length || diff.kept.length)) {
          this._insertErrorWrapper(fieldInstance);
          if (0 === fieldInstance._ui.$errorsWrapper.find('.parsley-custom-error-message').length)
            fieldInstance._ui.$errorsWrapper
              .append(
                $(fieldInstance.options.errorTemplate)
                .addClass('parsley-custom-error-message')
              );
          return fieldInstance._ui.$errorsWrapper
            .addClass('filled')
            .find('.parsley-custom-error-message')
            .html(fieldInstance.options.errorMessage);
        }
        return fieldInstance._ui.$errorsWrapper
          .removeClass('filled')
          .find('.parsley-custom-error-message')
          .remove();
      }
      // Show, hide, update failing constraints messages
      for (var i = 0; i < diff.removed.length; i++)
        this.removeError(fieldInstance, diff.removed[i].assert.name, true);
      for (i = 0; i < diff.added.length; i++)
        this.addError(fieldInstance, diff.added[i].assert.name, undefined, diff.added[i].assert, true);
      for (i = 0; i < diff.kept.length; i++)
        this.updateError(fieldInstance, diff.kept[i].assert.name, undefined, diff.kept[i].assert, true);
    },
    // TODO: strange API here, intuitive for manual usage with addError(pslyInstance, 'foo', 'bar')
    // but a little bit complex for above internal usage, with forced undefined parameter...
    addError: function (fieldInstance, name, message, assert, doNotUpdateClass) {
      this._insertErrorWrapper(fieldInstance);
      fieldInstance._ui.$errorsWrapper
        .addClass('filled')
        .append(
          $(fieldInstance.options.errorTemplate)
          .addClass('parsley-' + name)
          .html(message || this._getErrorMessage(fieldInstance, assert))
        );
      if (true !== doNotUpdateClass)
        this._errorClass(fieldInstance);
    },
    // Same as above
    updateError: function (fieldInstance, name, message, assert, doNotUpdateClass) {
      fieldInstance._ui.$errorsWrapper
        .addClass('filled')
        .find('.parsley-' + name)
        .html(message || this._getErrorMessage(fieldInstance, assert));
      if (true !== doNotUpdateClass)
        this._errorClass(fieldInstance);
    },
    // Same as above twice
    removeError: function (fieldInstance, name, doNotUpdateClass) {
      fieldInstance._ui.$errorsWrapper
        .removeClass('filled')
        .find('.parsley-' + name)
        .remove();
      // edge case possible here: remove a standard Parsley error that is still failing in fieldInstance.validationResult
      // but highly improbable cuz' manually removing a well Parsley handled error makes no sense.
      if (true !== doNotUpdateClass)
        this.manageStatusClass(fieldInstance);
    },
    focus: function (formInstance) {
      formInstance._focusedField = null;
      if (true === formInstance.validationResult || 'none' === formInstance.options.focus)
        return null;
      for (var i = 0; i < formInstance.fields.length; i++) {
        var field = formInstance.fields[i];
        if (true !== field.validationResult && field.validationResult.length > 0 && 'undefined' === typeof field.options.noFocus) {
          formInstance._focusedField = field.$element;
          if ('first' === formInstance.options.focus)
            break;
        }
      }
      if (null === formInstance._focusedField)
        return null;
      return formInstance._focusedField.focus();
    },
    _getErrorMessage: function (fieldInstance, constraint) {
      var customConstraintErrorMessage = constraint.name + 'Message';
      if ('undefined' !== typeof fieldInstance.options[customConstraintErrorMessage])
        return window.Parsley.formatMessage(fieldInstance.options[customConstraintErrorMessage], constraint.requirements);
      return window.Parsley.getErrorMessage(constraint);
    },
    _diff: function (newResult, oldResult, deep) {
      var
        added = [],
        kept = [];
      for (var i = 0; i < newResult.length; i++) {
        var found = false;
        for (var j = 0; j < oldResult.length; j++)
          if (newResult[i].assert.name === oldResult[j].assert.name) {
            found = true;
            break;
          }
        if (found)
          kept.push(newResult[i]);
        else
          added.push(newResult[i]);
      }
      return {
        kept: kept,
        added: added,
        removed: !deep ? this._diff(oldResult, newResult, true).added : []
      };
    },
    setupForm: function (formInstance) {
      formInstance.$element.on('submit.Parsley', false, $.proxy(formInstance.onSubmitValidate, formInstance));
      // UI could be disabled
      if (false === formInstance.options.uiEnabled)
        return;
      formInstance.$element.attr('novalidate', '');
    },
    setupField: function (fieldInstance) {
      var _ui = { active: false };
      // UI could be disabled
      if (false === fieldInstance.options.uiEnabled)
        return;
      _ui.active = true;
      // Give field its Parsley id in DOM
      fieldInstance.$element.attr(fieldInstance.options.namespace + 'id', fieldInstance.__id__);
      /** Generate important UI elements and store them in fieldInstance **/
      // $errorClassHandler is the $element that woul have parsley-error and parsley-success classes
      _ui.$errorClassHandler = this._manageClassHandler(fieldInstance);
      // $errorsWrapper is a div that would contain the various field errors, it will be appended into $errorsContainer
      _ui.errorsWrapperId = 'parsley-id-' + (fieldInstance.options.multiple ? 'multiple-' + fieldInstance.options.multiple : fieldInstance.__id__);
      _ui.$errorsWrapper = $(fieldInstance.options.errorsWrapper).attr('id', _ui.errorsWrapperId);
      // ValidationResult UI storage to detect what have changed bwt two validations, and update DOM accordingly
      _ui.lastValidationResult = [];
      _ui.validatedOnce = false;
      _ui.validationInformationVisible = false;
      // Store it in fieldInstance for later
      fieldInstance._ui = _ui;
      // Bind triggers first time
      this.actualizeTriggers(fieldInstance);
    },
    // Determine which element will have `parsley-error` and `parsley-success` classes
    _manageClassHandler: function (fieldInstance) {
      // An element selector could be passed through DOM with `data-parsley-class-handler=#foo`
      if ('string' === typeof fieldInstance.options.classHandler && $(fieldInstance.options.classHandler).length)
        return $(fieldInstance.options.classHandler);
      // Class handled could also be determined by function given in Parsley options
      var $handler = fieldInstance.options.classHandler(fieldInstance);
      // If this function returned a valid existing DOM element, go for it
      if ('undefined' !== typeof $handler && $handler.length)
        return $handler;
      // Otherwise, if simple element (input, texatrea, select...) it will perfectly host the classes
      if (!fieldInstance.options.multiple || fieldInstance.$element.is('select'))
        return fieldInstance.$element;
      // But if multiple element (radio, checkbox), that would be their parent
      return fieldInstance.$element.parent();
    },
    _insertErrorWrapper: function (fieldInstance) {
      var $errorsContainer;
      // Nothing to do if already inserted
      if (0 !== fieldInstance._ui.$errorsWrapper.parent().length)
        return fieldInstance._ui.$errorsWrapper.parent();
      if ('string' === typeof fieldInstance.options.errorsContainer) {
        if ($(fieldInstance.options.errorsContainer).length)
          return $(fieldInstance.options.errorsContainer).append(fieldInstance._ui.$errorsWrapper);
        else
          ParsleyUtils.warn('The errors container `' + fieldInstance.options.errorsContainer + '` does not exist in DOM');
      }
      else if ('function' === typeof fieldInstance.options.errorsContainer)
        $errorsContainer = fieldInstance.options.errorsContainer(fieldInstance);
      if ('undefined' !== typeof $errorsContainer && $errorsContainer.length)
        return $errorsContainer.append(fieldInstance._ui.$errorsWrapper);
      var $from = fieldInstance.$element;
      if (fieldInstance.options.multiple)
        $from = $from.parent();
      return $from.after(fieldInstance._ui.$errorsWrapper);
    },
    actualizeTriggers: function (fieldInstance) {
      var $toBind = fieldInstance.$element;
      if (fieldInstance.options.multiple)
        $toBind = $('[' + fieldInstance.options.namespace + 'multiple="' + fieldInstance.options.multiple + '"]');
      // Remove Parsley events already binded on this field
      $toBind.off('.Parsley');
      // If no trigger is set, all good
      if (false === fieldInstance.options.trigger)
        return;
      var triggers = fieldInstance.options.trigger.replace(/^\s+/g , '').replace(/\s+$/g , '');
      if ('' === triggers)
        return;
      // Bind fieldInstance.eventValidate if exists (for parsley.ajax for example), ParsleyUI.eventValidate otherwise
      $toBind.on(
        triggers.split(' ').join('.Parsley ') + '.Parsley',
        $.proxy('function' === typeof fieldInstance.eventValidate ? fieldInstance.eventValidate : this.eventValidate, fieldInstance));
    },
    // Called through $.proxy with fieldInstance. `this` context is ParsleyField
    eventValidate: function (event) {
      // For keyup, keypress, keydown... events that could be a little bit obstrusive
      // do not validate if val length < min threshold on first validation. Once field have been validated once and info
      // about success or failure have been displayed, always validate with this trigger to reflect every yalidation change.
      if (new RegExp('key').test(event.type))
        if (!this._ui.validationInformationVisible && this.getValue().length <= this.options.validationThreshold)
          return;
      this._ui.validatedOnce = true;
      this.validate();
    },
    manageFailingFieldTrigger: function (fieldInstance) {
      fieldInstance._ui.failedOnce = true;
      // Radio and checkboxes fields must bind every field multiple
      if (fieldInstance.options.multiple)
        $('[' + fieldInstance.options.namespace + 'multiple="' + fieldInstance.options.multiple + '"]').each(function () {
          if (!new RegExp('change', 'i').test($(this).parsley().options.trigger || ''))
            return $(this).on('change.ParsleyFailedOnce', false, $.proxy(fieldInstance.validate, fieldInstance));
        });
      // Select case
      if (fieldInstance.$element.is('select'))
        if (!new RegExp('change', 'i').test(fieldInstance.options.trigger || ''))
          return fieldInstance.$element.on('change.ParsleyFailedOnce', false, $.proxy(fieldInstance.validate, fieldInstance));
      // All other inputs fields
      if (!new RegExp('keyup', 'i').test(fieldInstance.options.trigger || ''))
        return fieldInstance.$element.on('keyup.ParsleyFailedOnce', false, $.proxy(fieldInstance.validate, fieldInstance));
    },
    reset: function (parsleyInstance) {
      // Reset all event listeners
      this.actualizeTriggers(parsleyInstance);
      parsleyInstance.$element.off('.ParsleyFailedOnce');
      // Nothing to do if UI never initialized for this field
      if ('undefined' === typeof parsleyInstance._ui)
        return;
      if ('ParsleyForm' === parsleyInstance.__class__)
        return;
      // Reset all errors' li
      parsleyInstance._ui.$errorsWrapper
        .removeClass('filled')
        .children()
        .remove();
      // Reset validation class
      this._resetClass(parsleyInstance);
      // Reset validation flags and last validation result
      parsleyInstance._ui.validatedOnce = false;
      parsleyInstance._ui.lastValidationResult = [];
      parsleyInstance._ui.validationInformationVisible = false;
      parsleyInstance._ui.failedOnce = false;
    },
    destroy: function (parsleyInstance) {
      this.reset(parsleyInstance);
      if ('ParsleyForm' === parsleyInstance.__class__)
        return;
      if ('undefined' !== typeof parsleyInstance._ui)
        parsleyInstance._ui.$errorsWrapper.remove();
      delete parsleyInstance._ui;
    },
    _successClass: function (fieldInstance) {
      fieldInstance._ui.validationInformationVisible = true;
      fieldInstance._ui.$errorClassHandler.removeClass(fieldInstance.options.errorClass).addClass(fieldInstance.options.successClass);
    },
    _errorClass: function (fieldInstance) {
      fieldInstance._ui.validationInformationVisible = true;
      fieldInstance._ui.$errorClassHandler.removeClass(fieldInstance.options.successClass).addClass(fieldInstance.options.errorClass);
    },
    _resetClass: function (fieldInstance) {
      fieldInstance._ui.$errorClassHandler.removeClass(fieldInstance.options.successClass).removeClass(fieldInstance.options.errorClass);
    }
  };

  var ParsleyForm = function (element, domOptions, options) {
    this.__class__ = 'ParsleyForm';
    this.__id__ = ParsleyUtils.generateID();
    this.$element = $(element);
    this.domOptions = domOptions;
    this.options = options;
    this.parent = window.Parsley;
    this.fields = [];
    this.validationResult = null;
  };
  var statusMapping = { pending: null, resolved: true, rejected: false };
  ParsleyForm.prototype = {
    onSubmitValidate: function (event) {
      var that = this;
      // This is a Parsley generated submit event, do not validate, do not prevent, simply exit and keep normal behavior
      if (true === event.parsley)
        return;
      // Because some validations might be asynchroneous,
      // we cancel this submit and will fake it after validation.
      event.stopImmediatePropagation();
      event.preventDefault();
      this.whenValidate(undefined, undefined, event)
        .done(function() { that._submit(); })
        .always(function() { that._submitSource = null; });
      return this;
    },
    // internal
    // _submit submits the form, this time without going through the validations.
    // Care must be taken to "fake" the actual submit button being clicked.
    _submit: function() {
      if (false === this._trigger('submit'))
        return;
      this.$element.find('.parsley_synthetic_submit_button').remove();
      if (this._submitSource) {
        $('<input class=".parsley_synthetic_submit_button" type="hidden">')
        .attr('name', this._submitSource.name)
        .attr('value', this._submitSource.value)
        .appendTo(this.$element);
      }
      this.$element.trigger($.extend($.Event('submit'), { parsley: true }));
    },
    // Performs validation on fields while triggering events.
    // @returns `true` if al validations succeeds, `false`
    // if a failure is immediately detected, or `null`
    // if dependant on a promise.
    // Prefer `whenValidate`.
    validate: function (group, force, event) {
      return statusMapping[ this.whenValidate(group, force, event).state() ];
    },
    whenValidate: function (group, force, event) {
      var that = this;
      this.submitEvent = event;
      this.validationResult = true;
      // fire validate event to eventually modify things before very validation
      this._trigger('validate');
      // Refresh form DOM options and form's fields that could have changed
      this._refreshFields();
      var promises = this._withoutReactualizingFormOptions(function(){
        return $.map(this.fields, function(field) {
          // do not validate a field if not the same as given validation group
          if (!group || that._isFieldInGroup(field, group))
            return field.whenValidate(force);
        });
      });
      return $.when.apply($, promises)
        .done(  function() { that._trigger('success'); })
        .fail(  function() { that.validationResult = false; that._trigger('error'); })
        .always(function() { that._trigger('validated'); });
    },
    // Iterate over refreshed fields, and stop on first failure.
    // Returns `true` if all fields are valid, `false` if a failure is detected
    // or `null` if the result depends on an unresolved promise.
    // Prefer using `whenValid` instead.
    isValid: function (group, force) {
      return statusMapping[ this.whenValid(group, force).state() ];
    },
    // Iterate over refreshed fields and validate them.
    // Returns a promise.
    // A validation that immediately fails will interrupt the validations.
    whenValid: function (group, force) {
      var that = this;
      this._refreshFields();
      var promises = this._withoutReactualizingFormOptions(function(){
        return $.map(this.fields, function(field) {
          // do not validate a field if not the same as given validation group
          if (!group || that._isFieldInGroup(field, group))
            return field.whenValid(force);
        });
      });
      return $.when.apply($, promises);
    },
    _isFieldInGroup: function (field, group) {
      if($.isArray(field.options.group))
        return -1 !== $.inArray(group, field.options.group);
      return field.options.group === group;
    },
    _refreshFields: function () {
      return this.actualizeOptions()._bindFields();
    },
    _bindFields: function () {
      var self = this,
        oldFields = this.fields;
      this.fields = [];
      this.fieldsMappedById = {};
      this._withoutReactualizingFormOptions(function(){
        this.$element
        .find(this.options.inputs)
        .not(this.options.excluded)
        .each(function () {
          var fieldInstance = new Parsley.Factory(this, {}, self);
          // Only add valid and not excluded `ParsleyField` and `ParsleyFieldMultiple` children
          if (('ParsleyField' === fieldInstance.__class__ || 'ParsleyFieldMultiple' === fieldInstance.__class__) && (true !== fieldInstance.options.excluded))
            if ('undefined' === typeof self.fieldsMappedById[fieldInstance.__class__ + '-' + fieldInstance.__id__]) {
              self.fieldsMappedById[fieldInstance.__class__ + '-' + fieldInstance.__id__] = fieldInstance;
              self.fields.push(fieldInstance);
            }
        });
        $(oldFields).not(self.fields).each(function () {
          this._trigger('reset');
        });
      });
      return this;
    },
    // Internal only.
    // Looping on a form's fields to do validation or similar
    // will trigger reactualizing options on all of them, which
    // in turn will reactualize the form's options.
    // To avoid calling actualizeOptions so many times on the form
    // for nothing, _withoutReactualizingFormOptions temporarily disables
    // the method actualizeOptions on this form while `fn` is called.
    _withoutReactualizingFormOptions: function (fn) {
      var oldActualizeOptions = this.actualizeOptions;
      this.actualizeOptions = function() { return this };
      var result = fn.call(this); // Keep the current `this`.
      this.actualizeOptions = oldActualizeOptions;
      return result;
    },
    // Internal only.
    // Shortcut to trigger an event
    // Returns true iff event is not interrupted and default not prevented.
    _trigger: function (eventName) {
      eventName = 'form:' + eventName;
      return this.trigger.apply(this, arguments);
    }
  };

  var ConstraintFactory = function (parsleyField, name, requirements, priority, isDomConstraint) {
    if (!new RegExp('ParsleyField').test(parsleyField.__class__))
      throw new Error('ParsleyField or ParsleyFieldMultiple instance expected');
    var validatorSpec = window.Parsley._validatorRegistry.validators[name];
    var validator = new ParsleyValidator(validatorSpec);
    $.extend(this, {
      validator: validator,
      name: name,
      requirements: requirements,
      priority: priority || parsleyField.options[name + 'Priority'] || validator.priority,
      isDomConstraint: true === isDomConstraint
    });
    this._parseRequirements(parsleyField.options);
  };
  var capitalize = function(str) {
    var cap = str[0].toUpperCase();
    return cap + str.slice(1);
  };
  ConstraintFactory.prototype = {
    validate: function(value, instance) {
      var args = this.requirementList.slice(0); // Make copy
      args.unshift(value);
      args.push(instance);
      return this.validator.validate.apply(this.validator, args);
    },
    _parseRequirements: function(options) {
      var that = this;
      this.requirementList = this.validator.parseRequirements(this.requirements, function(key) {
        return options[that.name + capitalize(key)];
      });
    }
  };

  var ParsleyField = function (field, domOptions, options, parsleyFormInstance) {
    this.__class__ = 'ParsleyField';
    this.__id__ = ParsleyUtils.generateID();
    this.$element = $(field);
    // Set parent if we have one
    if ('undefined' !== typeof parsleyFormInstance) {
      this.parent = parsleyFormInstance;
    }
    this.options = options;
    this.domOptions = domOptions;
    // Initialize some properties
    this.constraints = [];
    this.constraintsByName = {};
    this.validationResult = [];
    // Bind constraints
    this._bindConstraints();
  };
  var statusMapping = { pending: null, resolved: true, rejected: false };
  ParsleyField.prototype = {
    // # Public API
    // Validate field and trigger some events for mainly `ParsleyUI`
    // @returns `true`, an array of the validators that failed, or
    // `null` if validation is not finished. Prefer using whenValidate
    validate: function (force) {
      var promise = this.whenValidate(force);
      switch (promise.state()) {
        case 'pending': return null;
        case 'resolved': return true;
        case 'rejected': return this.validationResult;
      };
    },
    // Validate field and trigger some events for mainly `ParsleyUI`
    // @returns a promise that succeeds only when all validations do.
    whenValidate: function (force) {
      var that = this;
      this.value = this.getValue();
      // Field Validate event. `this.value` could be altered for custom needs
      this._trigger('validate');
      return this.whenValid(force, this.value)
        .done(function()   { that._trigger('success'); })
        .fail(function()   { that._trigger('error'); })
        .always(function() { that._trigger('validated'); });
    },
    hasConstraints: function () {
      return 0 !== this.constraints.length;
    },
    // An empty optional field does not need validation
    needsValidation: function (value) {
      if ('undefined' === typeof value)
        value = this.getValue();
      // If a field is empty and not required, it is valid
      // Except if `data-parsley-validate-if-empty` explicitely added, useful for some custom validators
      if (!value.length && !this._isRequired() && 'undefined' === typeof this.options.validateIfEmpty)
        return false;
      return true;
    },
    // Just validate field. Do not trigger any event.
    // Returns `true` iff all constraints pass, `false` if there are failures,
    // or `null` if the result can not be determined yet (depends on a promise)
    // Prefer using `whenValid`.
    isValid: function (force, value) {
      return statusMapping[this.whenValid(force, value).state()];
    },
    whenValid: function (force, value) {
      // Recompute options and rebind constraints to have latest changes
      this.refreshConstraints();
      this.validationResult = true;
      // A field without constraint is valid
      if (!this.hasConstraints())
        return $.when();
      // Value could be passed as argument, needed to add more power to 'parsley:field:validate'
      if ('undefined' === typeof value || null === value)
        value = this.getValue();
      if (!this.needsValidation(value) && true !== force)
        return $.when();
      var groupedConstraints = this._getGroupedConstraints();
      var promises = [];
      var that = this;
      $.each(groupedConstraints, function(_, constraints) {
        // Process one group of constraints at a time, we validate the constraints
        // and combine the promises together.
        var promise = $.when.apply($,
          $.map(constraints, $.proxy(that, '_validateConstraint', value))
        );
        promises.push(promise);
        if (promise.state() === 'rejected')
          return false; // Interrupt processing if a group has already failed
      });
      return $.when.apply($, promises);
    },
    // @returns a promise
    _validateConstraint: function(value, constraint) {
      var that = this;
      var result = constraint.validate(value, this);
      // Map false to a failed promise
      if (false === result)
        result = $.Deferred().reject();
      // Make sure we return a promise and that we record failures
      return $.when(result).fail(function() {
        if (true === that.validationResult)
          that.validationResult = [];
        that.validationResult.push({assert: constraint});
      });
    },
    // @returns Parsley field computed value that could be overrided or configured in DOM
    getValue: function () {
      var value;
      // Value could be overriden in DOM or with explicit options
      if ('function' === typeof this.options.value)
        value = this.options.value(this);
      else if ('undefined' !== typeof this.options.value)
        value = this.options.value;
      else
        value = this.$element.val();
      // Handle wrong DOM or configurations
      if ('undefined' === typeof value || null === value)
        return '';
      return this._handleWhitespace(value);
    },
    // Actualize options that could have change since previous validation
    // Re-bind accordingly constraints (could be some new, removed or updated)
    refreshConstraints: function () {
      return this.actualizeOptions()._bindConstraints();
    },
    /**
    * Add a new constraint to a field
    *
    * @method addConstraint
    * @param {String}   name
    * @param {Mixed}    requirements      optional
    * @param {Number}   priority          optional
    * @param {Boolean}  isDomConstraint   optional
    */
    addConstraint: function (name, requirements, priority, isDomConstraint) {
      if (window.Parsley._validatorRegistry.validators[name]) {
        var constraint = new ConstraintFactory(this, name, requirements, priority, isDomConstraint);
        // if constraint already exist, delete it and push new version
        if ('undefined' !== this.constraintsByName[constraint.name])
          this.removeConstraint(constraint.name);
        this.constraints.push(constraint);
        this.constraintsByName[constraint.name] = constraint;
      }
      return this;
    },
    // Remove a constraint
    removeConstraint: function (name) {
      for (var i = 0; i < this.constraints.length; i++)
        if (name === this.constraints[i].name) {
          this.constraints.splice(i, 1);
          break;
        }
      delete this.constraintsByName[name];
      return this;
    },
    // Update a constraint (Remove + re-add)
    updateConstraint: function (name, parameters, priority) {
      return this.removeConstraint(name)
        .addConstraint(name, parameters, priority);
    },
    // # Internals
    // Internal only.
    // Bind constraints from config + options + DOM
    _bindConstraints: function () {
      var constraints = [], constraintsByName = {};
      // clean all existing DOM constraints to only keep javascript user constraints
      for (var i = 0; i < this.constraints.length; i++)
        if (false === this.constraints[i].isDomConstraint) {
          constraints.push(this.constraints[i]);
          constraintsByName[this.constraints[i].name] = this.constraints[i];
        }
      this.constraints = constraints;
      this.constraintsByName = constraintsByName;
      // then re-add Parsley DOM-API constraints
      for (var name in this.options)
        this.addConstraint(name, this.options[name], undefined, true);
      // finally, bind special HTML5 constraints
      return this._bindHtml5Constraints();
    },
    // Internal only.
    // Bind specific HTML5 constraints to be HTML5 compliant
    _bindHtml5Constraints: function () {
      // html5 required
      if (this.$element.hasClass('required') || this.$element.attr('required'))
        this.addConstraint('required', true, undefined, true);
      // html5 pattern
      if ('string' === typeof this.$element.attr('pattern'))
        this.addConstraint('pattern', this.$element.attr('pattern'), undefined, true);
      // range
      if ('undefined' !== typeof this.$element.attr('min') && 'undefined' !== typeof this.$element.attr('max'))
        this.addConstraint('range', [this.$element.attr('min'), this.$element.attr('max')], undefined, true);
      // HTML5 min
      else if ('undefined' !== typeof this.$element.attr('min'))
        this.addConstraint('min', this.$element.attr('min'), undefined, true);
      // HTML5 max
      else if ('undefined' !== typeof this.$element.attr('max'))
        this.addConstraint('max', this.$element.attr('max'), undefined, true);

      // length
      if ('undefined' !== typeof this.$element.attr('minlength') && 'undefined' !== typeof this.$element.attr('maxlength'))
        this.addConstraint('length', [this.$element.attr('minlength'), this.$element.attr('maxlength')], undefined, true);
      // HTML5 minlength
      else if ('undefined' !== typeof this.$element.attr('minlength'))
        this.addConstraint('minlength', this.$element.attr('minlength'), undefined, true);
      // HTML5 maxlength
      else if ('undefined' !== typeof this.$element.attr('maxlength'))
        this.addConstraint('maxlength', this.$element.attr('maxlength'), undefined, true);

      // html5 types
      var type = this.$element.attr('type');
      if ('undefined' === typeof type)
        return this;
      // Small special case here for HTML5 number: integer validator if step attribute is undefined or an integer value, number otherwise
      if ('number' === type) {
        if (('undefined' === typeof this.$element.attr('step')) || (0 === parseFloat(this.$element.attr('step')) % 1)) {
          return this.addConstraint('type', 'integer', undefined, true);
        } else {
          return this.addConstraint('type', 'number', undefined, true);
        }
      // Regular other HTML5 supported types
      } else if (/^(email|url|range)$/i.test(type)) {
        return this.addConstraint('type', type, undefined, true);
      }
      return this;
    },
    // Internal only.
    // Field is required if have required constraint without `false` value
    _isRequired: function () {
      if ('undefined' === typeof this.constraintsByName.required)
        return false;
      return false !== this.constraintsByName.required.requirements;
    },
    // Internal only.
    // Shortcut to trigger an event
    _trigger: function (eventName) {
      eventName = 'field:' + eventName;
      return this.trigger.apply(this, arguments);
    },
    // Internal only
    // Handles whitespace in a value
    // Use `data-parsley-whitespace="squish"` to auto squish input value
    // Use `data-parsley-whitespace="trim"` to auto trim input value
    _handleWhitespace: function (value) {
      if (true === this.options.trimValue)
        ParsleyUtils.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"');
      if ('squish' === this.options.whitespace)
        value = value.replace(/\s{2,}/g, ' ');
      if (('trim' === this.options.whitespace) || ('squish' === this.options.whitespace) || (true === this.options.trimValue))
        value = ParsleyUtils.trimString(value);
      return value;
    },
    // Internal only.
    // Returns the constraints, grouped by descending priority.
    // The result is thus an array of arrays of constraints.
    _getGroupedConstraints: function () {
      if (false === this.options.priorityEnabled)
        return [this.constraints];
      var groupedConstraints = [];
      var index = {};
      // Create array unique of priorities
      for (var i = 0; i < this.constraints.length; i++) {
        var p = this.constraints[i].priority;
        if (!index[p])
          groupedConstraints.push(index[p] = []);
        index[p].push(this.constraints[i]);
      }
      // Sort them by priority DESC
      groupedConstraints.sort(function (a, b) { return b[0].priority - a[0].priority; });
      return groupedConstraints;
    }
  };

  var ParsleyMultiple = function () {
    this.__class__ = 'ParsleyFieldMultiple';
  };
  ParsleyMultiple.prototype = {
    // Add new `$element` sibling for multiple field
    addElement: function ($element) {
      this.$elements.push($element);
      return this;
    },
    // See `ParsleyField.refreshConstraints()`
    refreshConstraints: function () {
      var fieldConstraints;
      this.constraints = [];
      // Select multiple special treatment
      if (this.$element.is('select')) {
        this.actualizeOptions()._bindConstraints();
        return this;
      }
      // Gather all constraints for each input in the multiple group
      for (var i = 0; i < this.$elements.length; i++) {
        // Check if element have not been dynamically removed since last binding
        if (!$('html').has(this.$elements[i]).length) {
          this.$elements.splice(i, 1);
          continue;
        }
        fieldConstraints = this.$elements[i].data('ParsleyFieldMultiple').refreshConstraints().constraints;
        for (var j = 0; j < fieldConstraints.length; j++)
          this.addConstraint(fieldConstraints[j].name, fieldConstraints[j].requirements, fieldConstraints[j].priority, fieldConstraints[j].isDomConstraint);
      }
      return this;
    },
    // See `ParsleyField.getValue()`
    getValue: function () {
      // Value could be overriden in DOM
      if ('undefined' !== typeof this.options.value)
        return this.options.value;
      // Radio input case
      if (this.$element.is('input[type=radio]'))
        return this._findRelatedMultiple().filter(':checked').val() || '';
      // checkbox input case
      if (this.$element.is('input[type=checkbox]')) {
        var values = [];
        this._findRelatedMultiple().filter(':checked').each(function () {
          values.push($(this).val());
        });
        return values;
      }
      // Select multiple case
      if (this.$element.is('select') && null === this.$element.val())
        return [];
      // Default case that should never happen
      return this.$element.val();
    },
    _init: function () {
      this.$elements = [this.$element];
      return this;
    }
  };

  var ParsleyFactory = function (element, options, parsleyFormInstance) {
    this.$element = $(element);
    // If the element has already been bound, returns its saved Parsley instance
    var savedparsleyFormInstance = this.$element.data('Parsley');
    if (savedparsleyFormInstance) {
      // If the saved instance has been bound without a ParsleyForm parent and there is one given in this call, add it
      if ('undefined' !== typeof parsleyFormInstance && savedparsleyFormInstance.parent === window.Parsley) {
        savedparsleyFormInstance.parent = parsleyFormInstance;
        savedparsleyFormInstance._resetOptions(savedparsleyFormInstance.options);
      }
      return savedparsleyFormInstance;
    }
    // Parsley must be instantiated with a DOM element or jQuery $element
    if (!this.$element.length)
      throw new Error('You must bind Parsley on an existing element.');
    if ('undefined' !== typeof parsleyFormInstance && 'ParsleyForm' !== parsleyFormInstance.__class__)
      throw new Error('Parent instance must be a ParsleyForm instance');
    this.parent = parsleyFormInstance || window.Parsley;
    return this.init(options);
  };
  ParsleyFactory.prototype = {
    init: function (options) {
      this.__class__ = 'Parsley';
      this.__version__ = '2.2.0-rc1';
      this.__id__ = ParsleyUtils.generateID();
      // Pre-compute options
      this._resetOptions(options);
      // A ParsleyForm instance is obviously a `<form>` element but also every node that is not an input and has the `data-parsley-validate` attribute
      if (this.$element.is('form') || (ParsleyUtils.checkAttr(this.$element, this.options.namespace, 'validate') && !this.$element.is(this.options.inputs)))
        return this.bind('parsleyForm');
      // Every other element is bound as a `ParsleyField` or `ParsleyFieldMultiple`
      return this.isMultiple() ? this.handleMultiple() : this.bind('parsleyField');
    },
    isMultiple: function () {
      return (this.$element.is('input[type=radio], input[type=checkbox]')) || (this.$element.is('select') && 'undefined' !== typeof this.$element.attr('multiple'));
    },
    // Multiples fields are a real nightmare :(
    // Maybe some refactoring would be appreciated here...
    handleMultiple: function () {
      var
        that = this,
        name,
        multiple,
        parsleyMultipleInstance;
      // Handle multiple name
      if (this.options.multiple)
        ; // We already have our 'multiple' identifier
      else if ('undefined' !== typeof this.$element.attr('name') && this.$element.attr('name').length)
        this.options.multiple = name = this.$element.attr('name');
      else if ('undefined' !== typeof this.$element.attr('id') && this.$element.attr('id').length)
        this.options.multiple = this.$element.attr('id');
      // Special select multiple input
      if (this.$element.is('select') && 'undefined' !== typeof this.$element.attr('multiple')) {
        this.options.multiple = this.options.multiple || this.__id__;
        return this.bind('parsleyFieldMultiple');
      // Else for radio / checkboxes, we need a `name` or `data-parsley-multiple` to properly bind it
      } else if (!this.options.multiple) {
        ParsleyUtils.warn('To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.', this.$element);
        return this;
      }
      // Remove special chars
      this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, '');
      // Add proper `data-parsley-multiple` to siblings if we have a valid multiple name
      if ('undefined' !== typeof name) {
        $('input[name="' + name + '"]').each(function () {
          if ($(this).is('input[type=radio], input[type=checkbox]'))
            $(this).attr(that.options.namespace + 'multiple', that.options.multiple);
        });
      }
      // Check here if we don't already have a related multiple instance saved
      var $previouslyRelated = this._findRelatedMultiple();
      for (var i = 0; i < $previouslyRelated.length; i++) {
        parsleyMultipleInstance = $($previouslyRelated.get(i)).data('Parsley');
        if ('undefined' !== typeof parsleyMultipleInstance) {
          if (!this.$element.data('ParsleyFieldMultiple')) {
            parsleyMultipleInstance.addElement(this.$element);
          }
          break;
        }
      }
      // Create a secret ParsleyField instance for every multiple field. It will be stored in `data('ParsleyFieldMultiple')`
      // And will be useful later to access classic `ParsleyField` stuff while being in a `ParsleyFieldMultiple` instance
      this.bind('parsleyField', true);
      return parsleyMultipleInstance || this.bind('parsleyFieldMultiple');
    },
    // Return proper `ParsleyForm`, `ParsleyField` or `ParsleyFieldMultiple`
    bind: function (type, doNotStore) {
      var parsleyInstance;
      switch (type) {
        case 'parsleyForm':
          parsleyInstance = $.extend(
            new ParsleyForm(this.$element, this.domOptions, this.options),
            window.ParsleyExtend
          )._bindFields();
          break;
        case 'parsleyField':
          parsleyInstance = $.extend(
            new ParsleyField(this.$element, this.domOptions, this.options, this.parent),
            window.ParsleyExtend
          );
          break;
        case 'parsleyFieldMultiple':
          parsleyInstance = $.extend(
            new ParsleyField(this.$element, this.domOptions, this.options, this.parent),
            new ParsleyMultiple(),
            window.ParsleyExtend
          )._init();
          break;
        default:
          throw new Error(type + 'is not a supported Parsley type');
      }
      if (this.options.multiple)
        ParsleyUtils.setAttr(this.$element, this.options.namespace, 'multiple', this.options.multiple);
      if ('undefined' !== typeof doNotStore) {
        this.$element.data('ParsleyFieldMultiple', parsleyInstance);
        return parsleyInstance;
      }
       // Store the freshly bound instance in a DOM element for later access using jQuery `data()`
      this.$element.data('Parsley', parsleyInstance);
      // Tell the world we have a new ParsleyForm or ParsleyField instance!
      parsleyInstance._trigger('init');
      return parsleyInstance;
    }
  };

  var
    o = $({}),
    deprecated = function () {
      ParsleyUtils.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley");
    };
  // Returns an event handler that calls `fn` with the arguments it expects
  function adapt(fn, context) {
    // Store to allow unbinding
    if (!fn.parsleyAdaptedCallback) {
      fn.parsleyAdaptedCallback = function () {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift(this);
        fn.apply(context || o, args);
      };
    }
    return fn.parsleyAdaptedCallback;
  }
  var eventPrefix = 'parsley:';
  // Converts 'parsley:form:validate' into 'form:validate'
  function eventName(name) {
    if (name.lastIndexOf(eventPrefix, 0) === 0)
      return name.substr(eventPrefix.length);
    return name;
  }
  // $.listen is deprecated. Use Parsley.on instead.
  $.listen = function (name, callback) {
    var context;
    deprecated();
    if ('object' === typeof arguments[1] && 'function' === typeof arguments[2]) {
      context = arguments[1];
      callback = arguments[2];
    }
    if ('function' !== typeof arguments[1])
      throw new Error('Wrong parameters');
    window.Parsley.on(eventName(name), adapt(callback, context));
  };
  $.listenTo = function (instance, name, fn) {
    deprecated();
    if (!(instance instanceof ParsleyField) && !(instance instanceof ParsleyForm))
      throw new Error('Must give Parsley instance');
    if ('string' !== typeof name || 'function' !== typeof fn)
      throw new Error('Wrong parameters');
    instance.on(eventName(name), adapt(fn));
  };
  $.unsubscribe = function (name, fn) {
    deprecated();
    if ('string' !== typeof name || 'function' !== typeof fn)
      throw new Error('Wrong arguments');
    window.Parsley.off(eventName(name), fn.parsleyAdaptedCallback);
  };
  $.unsubscribeTo = function (instance, name) {
    deprecated();
    if (!(instance instanceof ParsleyField) && !(instance instanceof ParsleyForm))
      throw new Error('Must give Parsley instance');
    instance.off(eventName(name));
  };
  $.unsubscribeAll = function (name) {
    deprecated();
    window.Parsley.off(eventName(name));
    $('form,input,textarea,select').each(function() {
      var instance = $(this).data('Parsley');
      if (instance) {
        instance.off(eventName(name));
      }
    });
  };
  // $.emit is deprecated. Use jQuery events instead.
  $.emit = function (name, instance) {
    deprecated();
    var instanceGiven = (instance instanceof ParsleyField) || (instance instanceof ParsleyForm);
    var args = Array.prototype.slice.call(arguments, instanceGiven ? 2 : 1);
    args.unshift(eventName(name));
    if (!instanceGiven) {
      instance = window.Parsley;
    }
    instance.trigger.apply(instance, args);
  };

// ParsleyConfig definition if not already set
window.ParsleyConfig = window.ParsleyConfig || {};
window.ParsleyConfig.i18n = window.ParsleyConfig.i18n || {};
// Define then the messages
window.ParsleyConfig.i18n.en = jQuery.extend(window.ParsleyConfig.i18n.en || {}, {
  defaultMessage: "This value seems to be invalid.",
  type: {
    email:        "This value should be a valid email.",
    url:          "This value should be a valid url.",
    number:       "This value should be a valid number.",
    integer:      "This value should be a valid integer.",
    digits:       "This value should be digits.",
    alphanum:     "This value should be alphanumeric."
  },
  notblank:       "This value should not be blank.",
  required:       "This value is required.",
  pattern:        "This value seems to be invalid.",
  min:            "This value should be greater than or equal to %s.",
  max:            "This value should be lower than or equal to %s.",
  range:          "This value should be between %s and %s.",
  minlength:      "This value is too short. It should have %s characters or more.",
  maxlength:      "This value is too long. It should have %s characters or fewer.",
  length:         "This value length is invalid. It should be between %s and %s characters long.",
  mincheck:       "You must select at least %s choices.",
  maxcheck:       "You must select %s choices or fewer.",
  check:          "You must select between %s and %s choices.",
  equalto:        "This value should be the same."
});
// If file is loaded after Parsley main file, auto-load locale
if ('undefined' !== typeof window.ParsleyValidator)
  window.ParsleyValidator.addCatalog('en', window.ParsleyConfig.i18n.en, true);

//     Parsley.js 2.2.0-rc1
//     http://parsleyjs.org
//     (c) 2012-2015 Guillaume Potier, Wisembly
//     Parsley may be freely distributed under the MIT license.

  // Inherit `on`, `off` & `trigger` to Parsley:
  var Parsley = $.extend(new ParsleyAbstract(), {
      $element: $(document),
      actualizeOptions: null,
      _resetOptions: null,
      Factory: ParsleyFactory,
      version: '2.2.0-rc1'
    });
  // Supplement ParsleyField and Form with ParsleyAbstract
  // This way, the constructors will have access to those methods
  $.extend(ParsleyField.prototype, ParsleyAbstract.prototype);
  $.extend(ParsleyForm.prototype, ParsleyAbstract.prototype);
  // Inherit actualizeOptions and _resetOptions:
  $.extend(ParsleyFactory.prototype, ParsleyAbstract.prototype);
  // ### jQuery API
  // `$('.elem').parsley(options)` or `$('.elem').psly(options)`
  $.fn.parsley = $.fn.psly = function (options) {
    if (this.length > 1) {
      var instances = [];
      this.each(function () {
        instances.push($(this).parsley(options));
      });
      return instances;
    }
    // Return undefined if applied to non existing DOM element
    if (!$(this).length) {
      ParsleyUtils.warn('You must bind Parsley on an existing element.');
      return;
    }
    return new ParsleyFactory(this, options);
  };
  // ### ParsleyField and ParsleyForm extension
  // Ensure the extension is now defined if it wasn't previously
  if ('undefined' === typeof window.ParsleyExtend)
    window.ParsleyExtend = {};
  // ### Parsley config
  // Inherit from ParsleyDefault, and copy over any existing values
  Parsley.options = $.extend(ParsleyUtils.objectCreate(ParsleyDefaults), window.ParsleyConfig);
  window.ParsleyConfig = Parsley.options; // Old way of accessing global options
  // ### Globals
  window.Parsley = window.psly = Parsley;
  window.ParsleyUtils = ParsleyUtils;
  // ### Define methods that forward to the registry, and deprecate all access except through window.Parsley
  var registry = window.Parsley._validatorRegistry = new ParsleyValidatorRegistry(window.ParsleyConfig.validators, window.ParsleyConfig.i18n);
  window.ParsleyValidator = {};
  $.each('setLocale addCatalog addMessage getErrorMessage formatMessage addValidator updateValidator removeValidator'.split(' '), function (i, method) {
    window.Parsley[method] = $.proxy(registry, method);
    window.ParsleyValidator[method] = function () {
      ParsleyUtils.warnOnce('Accessing the method `'+ method +'` through ParsleyValidator is deprecated. Simply call `window.Parsley.' + method + '(...)`');
      return window.Parsley[method].apply(window.Parsley, arguments);
    };
  });
  // ### ParsleyUI
  // UI is a separate class that only listens to some events and then modifies the DOM accordingly
  // Could be overriden by defining a `window.ParsleyConfig.ParsleyUI` appropriate class (with `listen()` method basically)
  window.ParsleyUI = 'function' === typeof window.ParsleyConfig.ParsleyUI ?
    new window.ParsleyConfig.ParsleyUI().listen() : new ParsleyUI().listen();
  // ### PARSLEY auto-binding
  // Prevent it by setting `ParsleyConfig.autoBind` to `false`
  if (false !== window.ParsleyConfig.autoBind)
    $(function () {
      // Works only on `data-parsley-validate`.
      if ($('[data-parsley-validate]').length)
        $('[data-parsley-validate]').parsley();
    });
	return window.Parsley;
}));
