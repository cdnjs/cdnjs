//     Validate.js 0.2.0
//     (c) 2013 Wrapp
//     Validate.js may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://validatejs.org/

(function(exports, module, define, require) {
  "use strict";

  // The main function that calls the validators specified by the constraints.
  // The options are the following:
  //   - flatten (boolean) - If `true` will return a flat array instead of an object.
  //   - fullMessages (boolean) - If `true` (default) the attribute name is prepended to the error.
  //
  // Please note that the options are also passed to each validator.
  var validate = function(attributes, constraints, options) {
    options = options || {};
    var results = v.runValidations(attributes, constraints, options)
      , attr
      , validator;

    for (attr in results) {
      for (validator in results[attr]) {
        if (v.isPromise(results[attr][validator]))
          throw new Error("Use validate.async if you want support for promises");
      }
    }
    return validate.processValidationResults(results, options);
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
    [].slice.call(arguments, 1).forEach(function(source) {
      for (var attr in source) obj[attr] = source[attr];
    });
    return obj;
  };

  v.extend(validate, {
    // Runs the validators specified by the constraints object.
    // Will return an array of the format:
    //     [{attribute: "<attribute name>", error: "<validation result>"}, ...]
    runValidations: function(attributes, constraints, options) {
      var results = []
        , attr
        , validatorName
        , value
        , validators
        , validator
        , validatorOptions
        , error;

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
          // This allows the options to be a function. The function will be
          // called with the value, attribute name and the complete dict of
          // attributes. This is useful when you want to have different
          // validations depending on the attribute value.
          validatorOptions = v.result(validatorOptions, value, attributes, attr);
          if (!validatorOptions) continue;
          results.push({
            attribute: attr,
            error: validator.call(validator, value, validatorOptions, attr,
                                  attributes)
          });
        }
      }

      return results;
    },

    // Takes the output from runValidations and converts it to the correct
    // output format.
    processValidationResults: function(results, options) {
      var errors = {};

      // This indexes the errors per attribute
      results.forEach(function(result) {
        var error = result.error
          , attribute = result.attribute;

        if (v.isString(error)) error = [error];

        if (error)
          errors[attribute] = (errors[attribute] || []).concat(error);
      });

      // Semi ugly way to check if the errors are empty, try iterating over
      // them and short circuit when something is found.
      for (var _ in errors)
        return v.fullMessages(errors, options);
    },

    // Runs the validations with support for promises.
    // This function will return a promise that is settled when all the
    // validation promises have been completed.
    // It can be called even if no validations returned a promise.
    async: function(attributes, constraints, options) {
      options = options || {};
      var results = v.runValidations(attributes, constraints, options);

      return v.Promise(function(resolve, reject) {
        v.waitForResults(results).then(function() {
          var errors = v.processValidationResults(results);
          if (errors) reject(errors);
          else resolve();
        }).then(undefined, v.error);
      });
    },

    // Returns a promise that is resolved when all promises in the results array
    // are settled. The promise returned from this function is always resolved,
    // never rejected.
    // This function modifies the input argument, it replaces the promises
    // with the value returned from the promise.
    waitForResults: function(results) {
      // Create a sequence of all the results starting with a resolved promise.
      var promise = results.reduce(function(memo, result) {
        // If this result isn't a promise skip it in the sequence.
        if (!v.isPromise(result.error)) return memo;

        return memo.then(function() {
          return result.error.then(
            function() {
              result.error = null;
            },
            function(error) {
              // If for some reason the validator promise was rejected but no
              // error was specified.
              if (!error)
                v.warn("Validator promise was rejected but didn't return an error");
              result.error = error;
            }
          ).then(undefined, v.error);
        }).then(undefined, v.error);
      }, v.Promise(function(r) { r(); })); // A resolved promise

      return promise.then(undefined, v.error);
    },

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

    // Returns false if the object is not a function
    isFunction: function(value) {
      return typeof value === 'function';
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

    // Checks if the given argument is a promise. Anything with a `then`
    // function is considered a promise.
    isPromise: function(p) {
      return !!p && typeof p.then === 'function';
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
      if (!v.isDefined(obj)) return false;
      if (v.isArray(obj)) return obj.indexOf(value) !== -1;
      return value in obj;
    },

    capitalize: function(str) {
      if (!v.isString(str)) return str;
      return str[0].toUpperCase() + str.slice(1);
    },

    fullMessages: function(errors, options) {
      options = options || {};

      var ret = options.flatten ? [] : {}
        , attr;

      if (!errors) return ret;

      function processErrors(attr, errors) {
        errors.forEach(function(error) {
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
        });
      }

      // Converts the errors of object of the format
      // {attr: [<error>, <error>, ...]} to contain the attribute name.
      for (attr in errors) processErrors(attr, errors[attr]);
      return ret;
    },

    // Returns a promise, should be called with the new operator.
    // The first argument will be called with two functions, the first for
    // resolving the promise and the second for rejecting it.
    // Supports (in order of precedence):
    //   * EcmaScript 6 Promises
    //   * RSVP
    //   * when
    //   * Q
    //
    // If no supported promises are detected an error is thrown.
    // A word of warning, only A+ style promises are supported. jQuery deferreds
    // are NOT supported.
    Promise: v.extend(function(callback) {
      var promise = v.Promise.nativePromise(callback) ||
                    v.Promise.RSVPPromise(callback) ||
                    v.Promise.whenPromise(callback) ||
                    v.Promise.QPromise(callback);

      if (!promise) throw new Error("No promises could be detected");

      return promise;
    }, {
      nativePromise: function(callback) {
        var Promise_, module;
        if (typeof Promise !== "undefined")
          Promise_ = Promise;
        else {
          module = v.tryRequire("es6-promise");
          if (module) Promise_ = module.Promise;
        }
        if (Promise_) return new Promise_(callback);
      },
      RSVPPromise: function(callback) {
        var Promise, module;
        if (typeof RSVP !== "undefined")
          Promise = RSVP.Promise;
        else {
          module = v.tryRequire("rsvp");
          if (module) Promise = module.Promise;
        }
        if (Promise) return new Promise(callback);
      },
      whenPromise: function(callback) {
        var promise, module;
        if (typeof when !== "undefined")
          promise = when.promise;
        else {
          module = v.tryRequire("when");
          if (module) promise = module.promise;
        }
        if (promise) return promise(callback);
      },
      QPromise: function(callback) {
        var promise, module;
        if (typeof Q !== "undefined")
          promise = Q.promise;
        else {
          module = v.tryRequire("q");
          if (module) promise = module.promise;
        }
        if (promise) return promise(callback);
      }
    }),

    tryRequire: function(moduleName) {
      if (!v.require) return null;
      try {
        return v.require(moduleName);
      } catch(e) {
        return null;
      }
    },

    require: require,

    exposeModule: function(validate, root, exports, module, define) {
      if (exports) {
        if (module && module.exports) exports = module.exports = validate;
        exports.validate = validate;
      }
      else {
        root.validate = validate;

        if (validate.isFunction(define) && define.amd)
          define("validate", [], function () { return validate; });
      }
    },

    warn: function(msg) {
      if (typeof console !== "undefined" && console.warn) console.warn(msg);
    },

    error: function(msg) {
      if (typeof console !== "undefined" && console.error) console.error(msg);
    }
  });

  validate.validators = {
    // Presence validates that the value isn't empty
    presence: function(value, options) {
      var message = options.message || "can't be blank"
        , attr;

      // Null and undefined aren't allowed
      if (!v.isDefined(value)) return message;

      // functions are ok
      if (v.isFunction(value)) return;

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
    },
    email: v.extend(function(value, options) {
      var message = options.message || "is not a valid email";
      if (!v.isDefined(value)) return;
      if (!v.isString(value)) return message;
      if (!this.PATTERN.exec(value)) return message;
    }, {
      PATTERN: /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/
    })
  };

  validate.exposeModule(validate, root, exports, module, define);

}).call(this,
        typeof exports !== 'undefined' ? exports : null,
        typeof module !== 'undefined' ? module : null,
        typeof define !== 'undefined' ? define : null,
        typeof require !== 'undefined' ? require : null);
