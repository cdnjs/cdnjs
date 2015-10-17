// Validate.js 0.1.1
// (c) 2013 Wrapp
// Validate.js may be freely distributed under the MIT license.
// For all details and documentation:
// http://validatejs.org/

(function(exports, module) {
  "use strict";

  // The main function that calls the validators specified by the constraints.
  // The options are the following:
  //
  var validate = function(attributes, constraints, options) {
    var attr
      , error
      , validator
      , validatorName
      , validatorOptions
      , value
      , validators
      , errors = {};

    options = options || {};

    // Loops through each constraints, finds the correct validator and run it.
    for (attr in constraints) {
      value = attributes[attr];
      validators = v.result(constraints[attr], value, attributes, attr);

      for (validatorName in validators) {
        validator = v.validators[validatorName];

        if (!validator) {
          error = v.format("Unknown validator %{name}", {name: validatorName});
          throw new Error(error);
        }

        validatorOptions = validators[validatorName];
        // This allows the options to be a function. The function will be called
        // with the value, attribute name and the complete dict of attribues.
        // This is useful when you want to have different validations depending
        // on the attribute value.
        validatorOptions = v.result(validatorOptions, value, attributes, attr);
        if (!validatorOptions) continue;
        error = validator.call(validator,
                               value,
                               validatorOptions,
                               attr,
                               attributes);

        // The validator is allowed to return a string or an array.
        if (v.isString(error)) error = [error];

        if (error && error.length > 0)
          errors[attr] = (errors[attr] || []).concat(error);
      }
    }

    // Return the errors if we have any
    for (attr in errors) return v.fullMessages(errors, options);
  };

  var v = validate
    , root = this
    , XDate = root.XDate
    // Finds %{key} style patterns in the given string
    , FORMAT_REGEXP = /%\{([^\}]+)\}/g;

  // Copies over attributes from one or more sources to a single destination.
  // Very much similar to underscore's extend.
  // The first argument is the target object and the remaining arguments will be
  // used as targets.
  v.extend = function(obj) {
    var i
      , attr
      , source
      , sources = [].slice.call(arguments, 1);

    for (i = 0; i < sources.length; ++i) {
      source = sources[i];
      for (attr in source) obj[attr] = source[attr];
    }
    return obj;
  };

  v.extend(validate, {
    // If the given argument is a call: function the and: function return the value
    // otherwise just return the value. Additional arguments will be passed as
    // arguments to the function.
    // Example:
    // ```
    // result('foo') // 'foo'
    // result(Math.max, 1, 2) // 2
    // ```
    result: function(value) {
      var args = [].slice.call(arguments, 1);
      if (typeof value === 'function') value = value.apply(null, args);
      return value;
    },

    // Checks if the value is a number. This function does not consider NaN a
    // number like many other `isNumber` functions do.
    isNumber: function(value) {
      return typeof value === 'number' && !isNaN(value);
    },

    // A simple check to verify that the value is an integer. Uses `isNumber`
    // and a simple modulo check.
    isInteger: function(value) {
      return v.isNumber(value) && value % 1 === 0;
    },

    // Uses the `Object` function to check if the given argument is an object.
    isObject: function(obj) {
      return obj === Object(obj);
    },

    // Returns false if the object is `null` of `undefined`
    isDefined: function(obj) {
      return obj !== null && obj !== undefined;
    },

    // Formats the specified strings with the given values like so:
    // ```
    // format("Foo: %{foo}", {foo: "bar"}) // "Foo bar"
    // ```
    format: function(str, vals) {
      return str.replace(FORMAT_REGEXP, function(m0, m1) {
        return String(vals[m1]);
      });
    },

    // "Prettifies" the given string.
    // Prettifying means replacing - and _ with spaces as well as splitting
    // camel case words.
    prettify: function(str) {
      return str
        // Replaces - and _ with spaces
        .replace(/[_\-]/g, ' ')
        // Splits camel cased words
        .replace(/([a-z])([A-Z])/g, function(m0, m1, m2) {
          return "" + m1 + " " + m2.toLowerCase();
        })
        .toLowerCase();
    },

    isString: function(value) {
      return typeof value === 'string';
    },

    isArray: function(value) {
      return {}.toString.call(value) === '[object Array]';
    },

    contains: function(obj, value) {
      var i;
      if (!v.isDefined(obj)) return false;
      if (v.isArray(obj)) {
        if (obj.indexOf(value)) return obj.indexOf(value) !== -1;
        for (i = obj.length - 1; i >= 0; --i) {
          if (obj[i] === value) return true;
        }
        return false;
      }
      return value in obj;
    },

    capitalize: function(str) {
      if (!str) return str;
      return str[0].toUpperCase() + str.slice(1);
    },

    fullMessages: function(errors, options) {
      options = options || {};

      var ret = options.flatten ? [] : {}
        , attr
        , i
        , error;

      if (!errors) return ret;

      // Converts the errors of object of the format
      // {attr: [<error>, <error>, ...]} to contain the attribute name.
      for (attr in errors) {
        for (i = 0; i < errors[attr].length; ++i) {
          error = errors[attr][i];
          if (error[0] === '^') error = error.slice(1);
          else if (options.fullMessages !== false) {
            error = v.format("%{attr} %{message}", {
              attr: v.capitalize(v.prettify(attr)),
              message: error
            });
          }
          error = error.replace(/\\\^/g, "^");
          // If flatten is true a flat array is returned.
          if (options.flatten) ret.push(error);
          else (ret[attr] || (ret[attr] = [])).push(error);
        }
      }
      return ret;
    },
  });

  validate.validators = {
    // Presence validates that the value isn't empty
    presence: function(value, options) {
      var message = options.message || "can't be blank"
        , attr;

      // Null and undefined aren't allowed
      if (!v.isDefined(value)) return message;

      if (typeof value === 'string') {
        // Tests if the string contains only whitespace (tab, newline, space etc)
        if ((/^\s*$/).test(value)) return message;
      }
      else if (v.isArray(value)) {
        // For arrays we use the length property
        if (value.length === 0) return message;
      }
      else if (v.isObject(value)) {
        // If we find at least one property we consider it non empty
        for (attr in value) return;
        return message;
      }
    },
    length: function(value, options) {
      // Null and undefined are fine
      if (!v.isDefined(value)) return;

      var is = options.is
        , maximum = options.maximum
        , minimum = options.minimum
        , tokenizer = options.tokenizer || function(val) { return val; }
        , err
        , errors = [];

      value = tokenizer(value);

      // Is checks
      if (v.isNumber(is) && value.length !== is) {
        err = options.wrongLength ||
          "is the wrong length (should be %{count} characters)";
        errors.push(v.format(err, {count: is}));
      }

      if (v.isNumber(minimum) && value.length < minimum) {
        err = options.tooShort ||
          "is too short (minimum is %{count} characters)";
        errors.push(v.format(err, {count: minimum}));
      }

      if (v.isNumber(maximum) && value.length > maximum) {
        err = options.tooLong ||
          "is too long (maximum is %{count} characters)";
        errors.push(v.format(err, {count: maximum}));
      }

      if (errors.length > 0) return options.message || errors;
    },
    numericality: function(value, options) {
      if (!v.isDefined(value)) return;

      var errors = []
        , name
        , count
        , checks = {
            greaterThan:          function(v, c) { return v > c; },
            greaterThanOrEqualTo: function(v, c) { return v >= c; },
            equalTo:              function(v, c) { return v === c; },
            lessThan:             function(v, c) { return v < c; },
            lessThanOrEqualTo:    function(v, c) { return v <= c; }
          };

      // Coerce the value to a number unless we're being strict.
      if (options.noStrings !== true && v.isString(value)) value = +value;

      // If it's not a number we shouldn't continue since it will compare it.
      if (!v.isNumber(value)) return options.message || "is not a number";

      // Same logic as above, sort of. Don't bother with comparisons if this
      // doesn't pass.
      if (options.onlyInteger && !v.isInteger(value))
        return options.message || "must be an integer";

      for (name in checks) {
        count = options[name];
        if (v.isNumber(count) && !checks[name](value, count)) {
          errors.push(v.format("must be %{type} %{count}", {
            count: count,
            type: v.prettify(name)
          }));
        }
      }

      if (options.odd && value % 2 !== 1) errors.push("must be odd");
      if (options.even && value % 2 !== 0) errors.push("must be even");

      if (errors.length) return options.message || errors;
    },
    datetime: v.extend(function(value, options) {
      if (!v.isDefined(value)) return;

      var err
        , errors = []
        , message = options.message
        , earliest = options.earliest ? this.parse(options.earliest, options) : NaN
        , latest = options.latest ? this.parse(options.latest, options) : NaN;

      value = this.parse(value, options);

      if (isNaN(value) || options.dateOnly && value % 86400000 !== 0)
        return message || "must be a valid date";

      if (!isNaN(earliest) && value < earliest) {
        err = "must be no earlier than %{date}";
        err = v.format(err, {date: this.format(earliest, options)});
        errors.push(err);
      }

      if (!isNaN(latest) && value > latest) {
        err = "must be no later than %{date}";
        err = v.format(err, {date: this.format(latest, options)});
        errors.push(err);
      }

      if (errors.length) return options.message || errors;
    }, {
      // This is the function that will be used to convert input to the number
      // of millis since the epoch.
      // It should return NaN if it's not a valid date.
      parse: function(value, options) {
        return new XDate(value, true).getTime();
      },
      // Formats the given timestamp. Uses ISO8601 to format them.
      // If options.dateOnly is true then only the year, month and day will be
      // output.
      format: function(date, options) {
        var format = options.dateFormat || (options.dateOnly ? "yyyy-MM-dd" : "u");
        return new XDate(date, true).toString(format);
      }
    }),
    date: function(value, options) {
      options = v.extend({}, options, {onlyDate: true});
      return v.validators.datetime(value, options);
    },
    format: function(value, options) {
      if (v.isString(options) || (options instanceof RegExp))
        options = {pattern: options};

      var message = options.message || "is invalid"
        , pattern = options.pattern
        , match;

      if (!v.isDefined(value)) return;
      if (!v.isString(value)) return message;

      if (v.isString(pattern))
        pattern = new RegExp(options.pattern, options.flags);
      match = pattern.exec(value);
      if (!match || match[0].length != value.length) return message;
    },
    inclusion: function(value, options) {
      if (v.isArray(options)) options = {within: options};
      if (!v.isDefined(value)) return;
      if (v.contains(options.within, value)) return;
      var message = options.message || "^%{value} is not included in the list";
      return v.format(message, {value: value});
    },
    exclusion: function(value, options) {
      if (v.isArray(options)) options = {within: options};
      if (!v.isDefined(value)) return;
      if (!v.contains(options.within, value)) return;
      var message = options.message || "^%{value} is restricted";
      return v.format(message, {value: value});
    }
  };

  if (exports) {
    if (module && module.exports) exports = module.exports = validate;
    exports.validate = validate;
  }
  else root.validate = validate;
}).call(this,
        typeof exports !== 'undefined' ? exports : null,
        typeof module !== 'undefined' ? module : null);
