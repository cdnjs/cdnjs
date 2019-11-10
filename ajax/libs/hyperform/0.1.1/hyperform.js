(function () {
    'use strict';

    /* and datetime-local? Spec says “Nah!” */

    var dates = ['datetime', 'date', 'month', 'week', 'time'];

    var plain_numbers = ['number', 'range'];

    var numbers = dates.concat(plain_numbers, 'datetime-local');

    var text = ['text', 'search', 'url', 'tel', 'email', 'password'];

    /* missing from this set are: button, hidden, menu (from <button>), reset */
    var validation_candidates = ['checkbox', 'color', 'file', 'image', 'radio', 'submit'].concat(numbers, text);

    /**
     * check if an element is a candidate for constraint validation
     *
     * @see https://html.spec.whatwg.org/multipage/forms.html#barred-from-constraint-validation
     */
    function is_validation_candidate (element) {
      /* it must be any of those elements */
      if (element instanceof window.HTMLSelectElement || element instanceof window.HTMLTextAreaElement || element instanceof window.HTMLButtonElement || element instanceof window.HTMLInputElement) {

        /* it's type must be in the whitelist or missing (select, textarea) */
        if (!element.type || validation_candidates.indexOf(element.type) > -1) {

          /* it mustn't be disabled or readonly */
          if (!element.disabled && !element.readonly) {

            /* then it's a candidate */
            return true;
          }
        }
      }

      /* this is no HTML5 validation candidate... */
      return false;
    }

    /**
     * mark an object with a 'hyperform=true' property
     *
     * We use this to distinguish our properties from the native ones. Usage:
     * js> obj.hyperform === true
     */

    function mark (obj) {
      if (typeof obj !== 'object') {
        /* do it old style for primitive values */
        obj.hyperform = true;
      } else {
        Object.defineProperty(obj, 'hyperform', {
          value: true
        });
      }

      return obj;
    }

    function installer (property, descriptor) {
      return function (element) {
        delete element[property];
        Object.defineProperty(element, property, descriptor);
      };
    }

    function trigger_event (element, event, _ref) {
        var _ref$bubbles = _ref.bubbles;
        var bubbles = _ref$bubbles === undefined ? true : _ref$bubbles;
        var _ref$cancelable = _ref.cancelable;
        var cancelable = _ref$cancelable === undefined ? false : _ref$cancelable;

        if (!(event instanceof window.Event)) {
            var _event = document.createEvent('Event');
            _event.initEvent(event, bubbles, cancelable);
            event = _event;
        }
        element.dispatchEvent(event);
    }

    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    function _slicedToArray (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };

    /**
     * get previous and next valid values for a stepped input element
     *
     * TODO add support for date, time, ...
     */

    function get_next_valid (element) {
      var min = Number(element.getAttribute('min') || 0);
      var max = Number(element.getAttribute('max') || 100);
      var step = Number(element.getAttribute('step') || 1);
      var value = Number(element.value || 0);

      var prev = min + Math.floor((value - min) / step) * step;
      var next = min + (Math.floor((value - min) / step) + 1) * step;

      if (prev < min) {
        prev = null;
      } else if (prev > max) {
        prev = max;
      }

      if (next > max) {
        next = null;
      } else if (next < min) {
        next = min;
      }

      return [prev, next];
    }

    function sprintf (str) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var args_length = args.length;
      var global_index = 0;

      return str.replace(/%([0-9]+\$)?([sl])/g, function (match, position, type) {
        var local_index = global_index;
        if (position) {
          local_index = Number(position.replace(/\$$/, '')) - 1;
        }
        global_index += 1;

        var arg = '';
        if (args_length > local_index) {
          arg = args[local_index];
        }

        if (arg instanceof Date || typeof arg === 'number' || arg instanceof Number) {
          /* try getting a localized representation of dates and numbers, if the
           * browser supports this */
          if (type === 'l') {
            arg = (arg.toLocaleString || arg.toString).call(arg);
          } else {
            arg = arg.toString();
          }
        }

        return arg;
      });
    }

    var catalog = {};

    function _ (s) {
      if (s in catalog) {
        return catalog[s];
      }
      return s;
    }

    var message_store = new WeakMap();

    /**
     * test the max attribute
     *
     * @TODO support max in type=date fields
     */
    function test_max (element) {
      /* we use Number() instead of parseFloat(), because an invalid attribute
       * value like "123abc" should result in an error. */
      return !is_validation_candidate(element) || !element.value || !element.hasAttribute('max') || isNaN(Number(element.getAttribute('max'))) || Number(element.value) <= Number(element.getAttribute('max'));
    }

    /**
     * test the maxlength attribute
     *
     * Allows empty input. If you do not want this, add the `required` attribute.
     */
    function test_maxlength (element) {
        return !is_validation_candidate(element) || !element.value || !element.hasAttribute('maxlength') || element.value.length >= parseInt(element.getAttribute('maxlength'), 10);
    }

    /**
     * test the min attribute
     *
     * @TODO support min in type=date fields
     */
    function test_min (element) {
      /* we use Number() instead of parseFloat(), because an invalid attribute
       * value like "123abc" should result in an error. */
      return !is_validation_candidate(element) || !element.value || !element.hasAttribute('min') || isNaN(Number(element.getAttribute('min'))) || Number(element.value) >= Number(element.getAttribute('min'));
    }

    /**
     * test the minlength attribute
     *
     * Allows empty input. If you do not want this, add the `required` attribute.
     */
    function test_minlength (element) {
        return !is_validation_candidate(element) || !element.value || !element.hasAttribute('minlength') || element.value.length >= parseInt(element.getAttribute('minlength'), 10);
    }

    /**
     * test the pattern attribute
     */
    function test_pattern (element) {
        return !is_validation_candidate(element) || !element.value || !element.hasAttribute('pattern') || new RegExp('^(?:' + element.getAttribute('pattern') + ')$').test(element.value);
    }

    /**
     * test the required attribute
     */
    function test_required (element) {
      if (!is_validation_candidate(element) || !element.hasAttribute('required')) {
        /* nothing to do */
        return true;
      }

      switch (element.type) {
        case 'checkbox':
          return element.checked;
        //break;
        case 'radio':
          /* radio inputs have "required" fulfilled, if _any_ other radio
           * with the same name in this form is checked. */
          return element.checked || Array.prototype.filter.call(element.form.getElementsByName(element.name), function (radio) {
            return radio.form === element.form && radio.checked;
          }).length > 0;
        //break;
        default:
          return !!element.value;
      }
    }

    /**
     * test the step attribute
     *
     * @TODO support steps in type=date fields
     */
    function test_step (element) {
      /* we use Number() instead of parseFloat(), because an invalid attribute
       * value like "123abc" should result in an error. */
      // TODO refactor those multiple "Number()" calls
      return !is_validation_candidate(element) || !element.value || !element.hasAttribute('step') || element.getAttribute('step').toLowerCase() === 'any' || Number(element.getAttribute('step')) <= 0 || isNaN(Number(element.getAttribute('step'))) || Math.abs(Number(element.value) - Number(element.getAttribute('min') || 0)) % Number(element.getAttribute('step')) < 0.00000001 || /* crappy floating-point arithmetics! */
      Math.abs(Number(element.value) - Number(element.getAttribute('min') || 0)) % Number(element.getAttribute('step')) > Number(element.getAttribute('step')) - 0.00000001;
    }

    /* the spec says to only check those. ¯\_(ツ)_/¯ */
    var checked_types = ['email', 'url'];

    /* we use a dummy <a> where we set the href to test URL validity */
    var url_canary = document.createElement('a');

    /* see https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address */
    var email_pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    /**
     * test the type-inherent syntax
     */
    function test_type (element) {
      if (!is_validation_candidate(element) || !element.value || !checked_types.contains(element.type)) {
        /* we're not responsible for this element */
        return true;
      }

      var is_valid = true;

      switch (element.type) {
        case 'url':
          url_canary.href = element.value;
          is_valid = url_canary.href === element.value || url_canary.href === element.value + '/';
          break;
        case 'email':
          if (element.hasAttribute('multiple')) {
            is_valid = element.value.split(',').map(function (item) {
              return item.trim();
            }).every(function (value) {
              return email_pattern.test(value);
            });
          } else {
            is_valid = email_pattern.test(element.value);
          }
          break;
      }

      return is_valid;
    }

    /**
     * Implement constraint checking functionality defined in the HTML5 standard
     *
     * @see https://html.spec.whatwg.org/multipage/forms.html#dom-cva-validity
     * @return bool true if the test fails [!], false otherwise
     */
    var validity_state_checkers = {
      badInput: function badInput(element) {
        // TODO
        return false;
      },

      customError: function customError(element) {
        var msg = message_store.get(element);
        var invalid = msg && 'is_custom' in msg;
        /* no need for message_store.set, because the message is already there. */
        return invalid;
      },

      patternMismatch: function patternMismatch(element) {
        var invalid = !test_pattern(element);
        if (invalid) {
          message_store.set(element, element.title ? sprintf(_('Please match the requested format: %s.'), element.title) : _('Please match the requested format.'));
        }
        return invalid;
      },

      rangeOverflow: function rangeOverflow(element) {
        var invalid = !test_max(element);

        if (invalid) {
          var msg = void 0;
          switch (element.type) {
            case 'date':
            case 'datetime':
            case 'datetime-local':
            case 'time':
              msg = sprintf(_('Please select a value that is no later than %l.'), element.value);
              break;
            // case 'number':
            default:
              msg = sprintf(_('Please select a value that is no more than %l.'), element.value);
              break;
          }
          message_store.set(element, msg);
        }

        return invalid;
      },

      rangeUnderflow: function rangeUnderflow(element) {
        var invalid = !test_min(element);

        if (invalid) {
          var msg = void 0;
          switch (element.type) {
            case 'date':
            case 'datetime':
            case 'datetime-local':
            case 'time':
              msg = sprintf(_('Please select a value that is no earlier than %l.'), element.value);
              break;
            // case 'number':
            default:
              msg = sprintf(_('Please select a value that is no less than %l.'), element.value);
              break;
          }
          message_store.set(element, msg);
        }

        return invalid;
      },

      stepMismatch: function stepMismatch(element) {
        var invalid = !test_step(element);

        if (invalid) {
          var _get_next_valid = get_next_valid(element);

          var _get_next_valid2 = _slicedToArray(_get_next_valid, 2);

          var min = _get_next_valid2[0];
          var max = _get_next_valid2[1];

          var sole = false;

          if (min === null) {
            sole = max;
          } else if (max === null) {
            sole = min;
          }

          if (sole !== false) {
            message_store.set(element, sprintf(_('Please select a valid value. The nearest valid value is %l.'), sole));
          } else {
            message_store.set(element, sprintf(_('Please select a valid value. The two nearest valid values are %l and %l.'), min, max));
          }
        }

        return invalid;
      },

      tooLong: function tooLong(element) {
        var invalid = !test_maxlength(element);

        if (invalid) {
          message_store.set(element, sprintf(_('Please shorten this text to %l characters or less (you are currently using %l characters).'), element.getAttribute('maxlength'), element.value.length));
        }

        return invalid;
      },

      tooShort: function tooShort(element) {
        var invalid = !test_minlength(element);

        if (invalid) {
          message_store.set(element, sprintf(_('Please lengthen this text to %l characters or more (you are currently using %l characters).'), element.getAttribute('maxlength'), element.value.length));
        }

        return invalid;
      },

      typeMismatch: function typeMismatch(element) {
        var invalid = !test_type(element);

        if (invalid) {
          var msg = _('Please use the appropriate format.');
          if (element.type === 'email') {
            if (element.hasAttribute('multiple')) {
              msg = _('Please enter a comma separated list of email addresses.');
            } else {
              msg = _('Please enter an email address.');
            }
          } else if (element.type === 'url') {
            msg = _('Please enter a URL.');
          }
          message_store.set(element, msg);
        }

        return invalid;
      },

      valueMissing: function valueMissing(element) {
        var invalid = !test_required(element);

        if (invalid) {
          var msg = _('Please fill out this field.');
          if (element.type === 'checkbox') {
            msg = _('Please check this box if you want to proceed.');
          } else if (element.type === 'radio') {
            msg = _('Please select one of these options.');
          } else if (element.type === 'file') {
            if (element.hasAttribute('multiple')) {
              msg = _('Please select one or more files.');
            } else {
              msg = _('Please select a file.');
            }
          } else if (element instanceof window.HTMLSelectElement) {
            msg = _('Please select an item in the list.');
          }
          message_store.set(element, msg);
        }

        return invalid;
      }

    };

    /**
     * TODO allow HTMLFieldSetElement, too
     */
    var ValidityState = function ValidityState(element) {
      if (!(element instanceof window.HTMLElement)) {
        throw new Error('cannot create a ValidityState for a non-element');
      }

      var cached = ValidityState.cache.get(element);
      if (cached) {
        return cached;
      }

      if (!(this instanceof ValidityState)) {
        /* working around a forgotten `new` */
        return new ValidityState(element);
      }

      this.element = element;
      ValidityState.cache.set(element, this);
    };

    var ValidityStatePrototype = {};
    ValidityState.prototype = ValidityStatePrototype;

    ValidityState.cache = new WeakMap();

    /**
     * copy functionality from the validity checkers to the ValidityState
     * prototype
     */
    for (var prop in validity_state_checkers) {
      Object.defineProperty(ValidityStatePrototype, prop, {
        configurable: true,
        enumerable: true,
        get: function (func) {
          return function () {
            return func(this.element);
          };
        }(validity_state_checkers[prop]),
        set: undefined
      });
    }

    /**
     * the "valid" property calls all other validity checkers and returns true,
     * if all those return false.
     */
    Object.defineProperty(ValidityStatePrototype, 'valid', {
      configurable: true,
      enumerable: true,
      get: function get() {
        for (var _prop in validity_state_checkers) {
          if (validity_state_checkers[_prop](this.element)) {
            return false;
          }
        }
        return true;
      },
      set: undefined
    });

    mark(ValidityStatePrototype);

    /**
     * publish a convenience function to replace the native element.validity
     */
    ValidityState.install = installer('validity', {
      configurable: true,
      enumerable: true,
      get: function get() {
        return ValidityState(this);
      }
    });

    /**
     * check an element's validity with respect to it's form
     */
    function checkValidity() {
      /* jshint -W040 */

      /* if this is a <form>, check validity of all child inputs */
      if (this instanceof window.HTMLFormElement) {
        return Array.prototype.every.call(this.elements, checkValidity);
      }

      /* default is true, also for elements that are no validation candidates */
      var valid = true;

      if (is_validation_candidate(this)) {
        valid = ValidityState(this).valid;
        if (!valid) {
          trigger_event(this, 'invalid', { cancelable: true });
        }
      }
      /* jshint +W040 */

      return valid;
    }

    /**
     * publish a convenience function to replace the native element.checkValidity
     */
    checkValidity.install = installer('checkValidity', {
      configurable: true,
      enumerable: true,
      value: checkValidity,
      writable: true
    });

    mark(checkValidity);

    var Renderer = {

      show_warning: function show_warning(element) {
        var msg = message_store.get(element);
        if (msg) {
          window.alert(msg);
        }
      },

      set: function set(renderer, action) {
        Renderer[renderer] = action;
      }

    };

    /**
     * check element's validity and report an error back to the user
     */
    function reportValidity() {
      /* jshint -W040 */

      /* if this is a <form>, check validity of all child inputs */
      if (this instanceof window.HTMLFormElement) {
        return Array.prototype.every.call(this.elements, reportValidity);
      }

      var valid = checkValidity.call(this);
      if (!valid) {
        /* TODO suppress warning, if checkValidity's invalid event is canceled. */
        Renderer.show_warning(this);
      }
      /* jshint +W040 */
      return valid;
    }

    /**
     * publish a convenience function to replace the native element.reportValidity
     */
    reportValidity.install = installer('reportValidity', {
      configurable: true,
      enumerable: true,
      value: reportValidity,
      writable: true
    });

    mark(reportValidity);

    /**
     * TODO allow HTMLFieldSetElement, too
     */
    function setCustomValidity(msg) {
      msg.is_custom = true;
      /* jshint -W040 */
      message_store.set(this, msg);
      /* jshint +W040 */
    }

    /**
     * publish a convenience function to replace the native element.setCustomValidity
     */
    setCustomValidity.install = installer('setCustomValidity', {
      configurable: true,
      enumerable: true,
      get: setCustomValidity,
      set: undefined
    });

    mark(setCustomValidity);

    /**
     * TODO allow HTMLFieldSetElement, too
     */
    function validationMessage() {
      /* jshint -W040 */
      var msg = message_store.get(this);
      /* jshint +W040 */
      if (!msg) {
        return '';
      }
      return msg;
    }

    /**
     * publish a convenience function to replace the native element.validationMessage
     */
    validationMessage.install = installer('validationMessage', {
      configurable: true,
      enumerable: true,
      get: validationMessage,
      set: undefined
    });

    mark(validationMessage);

    /**
     * return a new Date() representing the ISO date for a week number
     *
     * @see http://stackoverflow.com/a/16591175/113195
     */

    function get_date_from_week (week, year) {
      var date = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));

      if (date.getUTCDay() <= 4 /* thursday */) {
          date.setUTCDate(date.getUTCDate() - date.getUTCDay() + 1);
        } else {
        date.setUTCDate(date.getUTCDate() + 8 - date.getUTCDay());
      }

      return date;
    }

    /**
     * calculate a date from a string according to HTML5
     */
    function string_to_date (string, element_type) {
      var date = new Date(0);
      switch (element_type) {
        case 'datetime':
          if (!/^([0-9]{4,})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9])(?:\.([0-9]{1,3})))?$/.test(string)) {
            return null;
          }
          var ms = RegExp.$7;
          while (ms.length < 3) {
            ms += '0';
          }
          date.setUTCFullYear(Number(RegExp.$1));
          date.setUTCMonth(Number(RegExp.$2) - 1, Number(RegExp.$3));
          date.setUTCHours(Number(RegExp.$4), Number(RegExp.$5), Number(RegExp.$6 || 0), Number(ms));
          return date;

        case 'date':
          if (!/^([0-9]{4,})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(string)) {
            return null;
          }
          date.setUTCFullYear(Number(RegExp.$1));
          date.setUTCMonth(Number(RegExp.$2) - 1, Number(RegExp.$3));
          return date;

        case 'month':
          if (!/^([0-9]{4,})-(0[1-9]|1[012])$/.test(string)) {
            return null;
          }
          date.setUTCFullYear(Number(RegExp.$1));
          date.setUTCMonth(Number(RegExp.$2) - 1, 1);
          return date;

        case 'week':
          if (!/^([0-9]{4,})-W(0[1-9]|[1234][0-9]|5[0-3])$/.test(string)) {
            return null;
          }
          return get_date_from_week(Number(RegExp.$2), Number(RegExp.$1));

        case 'time':
          if (!/^([01][0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9])(?:\.([0-9]{1,3}))?)?$/.test(string)) {
            return null;
          }
          date.setUTCHours(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3 || 0), Number(RegExp.$4 || 0));
          return date;
      }

      return null;
    }

    /* For a given date, get the ISO week number
     *
     * Source: http://stackoverflow.com/a/6117889/113195
     *
     * Based on information at:
     *
     *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
     *
     * Algorithm is to find nearest thursday, it's year
     * is the year of the week number. Then get weeks
     * between that date and the first day of that year.
     *
     * Note that dates in one year can be weeks of previous
     * or next year, overlap is up to 3 days.
     *
     * e.g. 2014/12/29 is Monday in week  1 of 2015
     *      2012/1/1   is Sunday in week 52 of 2011
     */

    function get_week_of_year (d) {
      /* Copy date so don't modify original */
      d = new Date(+d);
      d.setUTCHours(0, 0, 0);
      /* Set to nearest Thursday: current date + 4 - current day number
       * Make Sunday's day number 7 */
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
      /* Get first day of year */
      var yearStart = new Date(d.getUTCFullYear(), 0, 1);
      /* Calculate full weeks to nearest Thursday */
      var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
      /* Return array of year and week number */
      return [d.getUTCFullYear(), weekNo];
    }

    function pad(num) {
      var size = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

      var s = num + '';
      while (s.length < size) {
        s = '0' + s;
      }
      return s;
    }

    /**
     * calculate a string from a date according to HTML5
     */
    function date_to_string(date, element_type) {
      switch (element_type) {
        case 'datetime':
          return date_to_string(date, 'date') + 'T' + date_to_string(date, 'time');

        case 'datetime-local':
          return sprintf('%s-%s-%sT%s:%s:%s.%s', date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate()), pad(date.getHours()), pad(date.getMinutes()), pad(date.getSeconds()), pad(date.getMilliseconds(), 3)).replace(/(:00)?\.000$/, '');

        case 'date':
          return sprintf('%s-%s-%s', date.getUTCFullYear(), pad(date.getUTCMonth() + 1), pad(date.getUTCDate()));

        case 'month':
          return sprintf('%s-%s', date.getUTCFullYear(), pad(date.getUTCMonth() + 1));

        case 'week':
          var params = get_week_of_year(date);
          return sprintf.call(null, '%s-W%s', params[0], pad(params[1]));

        case 'time':
          return sprintf('%s:%s:%s.%s', pad(date.getUTCHours()), pad(date.getUTCMinutes()), pad(date.getUTCSeconds()), pad(date.getUTCMilliseconds(), 3)).replace(/(:00)?\.000$/, '');
      }

      return null;
    }

    /**
     * implement the valueAsDate functionality
     *
     * @see https://html.spec.whatwg.org/multipage/forms.html#dom-input-valueasdate
     */
    function valueAsDate() {
      var value = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

      /* jshint -W040 */
      if (dates.indexOf(this.type) > -1) {
        if (value !== undefined) {
          /* setter: value must be null or a Date() */
          if (value === null) {
            this.value = '';
          } else if (value instanceof Date) {
            if (isNaN(value.getTime())) {
              this.value = '';
            } else {
              this.value = date_to_string(value, this.type);
            }
          } else {
            throw new window.DOMException('valueAsDate setter encountered invalid value', 'TypeError');
          }
          return;
        }

        var value_date = string_to_date(this.value, this.type);
        return value_date instanceof Date ? value_date : null;
      } else if (value !== undefined) {
        /* trying to set a date on a not-date input fails */
        throw new window.DOMException('valueAsDate setter cannot set date on this element', 'InvalidStateError');
      }
      /* jshint +W040 */

      return null;
    }

    valueAsDate.install = installer('valueAsDate', {
      configurable: true,
      enumerable: true,
      get: valueAsDate,
      set: valueAsDate
    });

    mark(valueAsDate);

    /**
     * implement the valueAsNumber functionality
     *
     * @see https://html.spec.whatwg.org/multipage/forms.html#dom-input-valueasnumber
     */
    function valueAsNumber() {
      var value = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

      /* jshint -W040 */
      if (numbers.indexOf(this.type) > -1) {
        if (this.type === 'range' && this.hasAttribute('multiple')) {
          /* @see https://html.spec.whatwg.org/multipage/forms.html#do-not-apply */
          return NaN;
        }

        if (value !== undefined) {
          /* setter: value must be NaN or a finite number */
          if (isNaN(value)) {
            this.value = '';
          } else if (typeof value === 'number' && window.isFinite(value)) {
            try {
              /* try setting as a date, but... */
              valueAsDate.call(this, new Date(value));
            } catch (e) {
              /* ... when valueAsDate is not responsible, ... */
              if (!(e instanceof window.DOMException)) {
                throw e;
              }
              /* ... set it via Number.toString(). */
              this.value = value.toString();
            }
          } else {
            throw new window.DOMException('valueAsNumber setter encountered invalid value', 'TypeError');
          }
          return;
        }

        var rval = valueAsDate.call(this);
        if (rval !== null) {
          return +rval;
        }
        /* not parseFloat, because we want NaN for invalid values like "1.2xxy" */
        return Number(this.value);
      } else if (value !== undefined) {
        /* trying to set a number on a not-number input fails */
        throw new window.DOMException('valueAsNumber setter cannot set number on this element', 'InvalidStateError');
      }
      /* jshint +W040 */

      return NaN;
    }

    valueAsNumber.install = installer('valueAsNumber', {
      configurable: true,
      enumerable: true,
      get: valueAsNumber,
      set: valueAsNumber
    });

    mark(valueAsNumber);

    /**
     * check, if an element will be subject to HTML5 validation
     */
    function willValidate() {
      /* jshint -W040 */
      return is_validation_candidate(this);
      /* jshint +W040 */
    }

    /**
     * publish a convenience function to replace the native element.willValidate
     */
    willValidate.install = installer('willValidate', {
      configurable: true,
      enumerable: true,
      get: willValidate,
      set: undefined
    });

    mark(willValidate);

    var version = '0.1.0';

    /**
     * public hyperform interface:
     */
    var hyperform = {

      version: version,

      checkValidity: checkValidity,

      reportValidity: reportValidity,

      setCustomValidity: setCustomValidity,

      validationMessage: validationMessage,

      ValidityState: ValidityState,

      valueAsDate: valueAsDate,

      valueAsNumber: valueAsNumber,

      willValidate: willValidate,

      capture: function capture(form) {
        var els;
        if (form === window || form instanceof window.HTMLDocument) {
          /* install on the prototypes, when called for the document */
          els = [window.HTMLInputElement.prototype, window.HTMLSelectElement.prototype, window.HTMLTextAreaElement.prototype];
        } else if (form instanceof window.HTMLFormElement || form instanceof window.HTMLFieldSetElement) {
          els = form.elements;
        }

        var els_length = els.length;
        for (var i = 0; i < els_length; i++) {
          checkValidity.install(els[i]);
          reportValidity.install(els[i]);
          setCustomValidity.install(els[i]);
          validationMessage.install(els[i]);
          ValidityState.install(els[i]);
          valueAsDate.install(els[i]);
          valueAsNumber.install(els[i]);
          willValidate.install(els[i]);
        }
      }
    };

    window.hyperform = hyperform;

}());