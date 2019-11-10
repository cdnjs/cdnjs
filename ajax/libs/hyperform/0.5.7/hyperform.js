(function () {
    'use strict';

    /**
     * mark an object with a 'hyperform=true' property
     *
     * We use this to distinguish our properties from the native ones. Usage:
     * js> mark(obj);
     * js> assert(obj.hyperform === true)
     */

    function mark (obj) {
      if (['object', 'function'].indexOf(typeof obj) > -1) {
        delete obj.hyperform;
        Object.defineProperty(obj, 'hyperform', {
          value: true
        });
      }

      return obj;
    }

    /**
     * return a function, that adds property to an element
     *
     * js> installer('foo', { value: 'bar' })(element);
     * js> assert(element.foo === 'bar');
     */

    function installer (property, descriptor) {
      return function (element) {
        var original_descriptor = Object.getOwnPropertyDescriptor(element, property);
        if (original_descriptor && !(original_descriptor.get && original_descriptor.get.hyperform || original_descriptor.value && original_descriptor.value.hyperform)) {
          /* publish existing property under new name, if it's not from us */
          Object.defineProperty(element, '_original_' + property, original_descriptor);
        }
        delete element[property];
        Object.defineProperty(element, property, descriptor);
      };
    }

    function trigger_event (element, event) {
        var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

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

        return event;
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
      if (!(date instanceof Date)) {
        return null;
      }

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
      var ms;
      switch (element_type) {
        case 'datetime':
          if (!/^([0-9]{4,})-([0-9]{2})-([0-9]{2})T([01][0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9])(?:\.([0-9]{1,3}))?)?$/.test(string)) {
            return null;
          }
          ms = RegExp.$7 || '000';
          while (ms.length < 3) {
            ms += '0';
          }
          date.setUTCFullYear(Number(RegExp.$1));
          date.setUTCMonth(Number(RegExp.$2) - 1, Number(RegExp.$3));
          date.setUTCHours(Number(RegExp.$4), Number(RegExp.$5), Number(RegExp.$6 || 0), Number(ms));
          return date;

        case 'date':
          if (!/^([0-9]{4,})-([0-9]{2})-([0-9]{2})$/.test(string)) {
            return null;
          }
          date.setUTCFullYear(Number(RegExp.$1));
          date.setUTCMonth(Number(RegExp.$2) - 1, Number(RegExp.$3));
          return date;

        case 'month':
          if (!/^([0-9]{4,})-([0-9]{2})$/.test(string)) {
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
          ms = RegExp.$4 || '000';
          while (ms.length < 3) {
            ms += '0';
          }
          date.setUTCHours(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3 || 0), Number(ms));
          return date;
      }

      return null;
    }

    /**
     * calculate a date from a string according to HTML5
     */
    function string_to_number (string, element_type) {
      var rval = string_to_date(string, element_type);
      if (rval !== null) {
        return +rval;
      }
      /* not parseFloat, because we want NaN for invalid values like "1.2xxy" */
      return Number(string);
    }

    /* and datetime-local? Spec says “Nah!” */

    var dates = ['datetime', 'date', 'month', 'week', 'time'];

    var plain_numbers = ['number', 'range'];

    /* everything that returns something meaningful for valueAsNumber and
     * can have the step attribute */
    var numbers = dates.concat(plain_numbers, 'datetime-local');

    /* the spec says to only check those for syntax in validity.typeMismatch.
     * ¯\_(ツ)_/¯ */
    var type_checked = ['email', 'url'];

    /* check these for validity.badInput */
    var input_checked = ['email', 'date', 'month', 'week', 'time', 'datetime', 'datetime-local', 'number', 'range', 'color'];

    var text_types = ['text', 'search', 'tel', 'password'].concat(type_checked);

    /* input element types, that are candidates for the validation API.
     * Missing from this set are: button, hidden, menu (from <button>), reset and
     * the types for non-<input> elements. */
    var validation_candidates = ['checkbox', 'color', 'file', 'image', 'radio', 'submit'].concat(numbers, text_types);

    /* all known types of <input> */
    var inputs = ['button', 'hidden', 'reset'].concat(validation_candidates);

    /* apparently <select> and <textarea> have types of their own */
    var non_inputs = ['select-one', 'select-multiple', 'textarea'];

    /**
     * get the element's type in a backwards-compatible way
     */
    function get_type (element) {
      if (element instanceof window.HTMLTextAreaElement) {
        return 'textarea';
      } else if (element instanceof window.HTMLSelectElement) {
        return element.hasAttribute('multiple') ? 'select-multiple' : 'select-one';
      } else if (element instanceof window.HTMLButtonElement) {
        return (element.getAttribute('type') || 'submit').toLowerCase();
      } else if (element instanceof window.HTMLInputElement) {
        var attr = (element.getAttribute('type') || '').toLowerCase();
        if (attr && inputs.indexOf(attr) > -1) {
          return attr;
        } else {
          /* perhaps the DOM has in-depth knowledge. Take that before returning
           * 'text'. */
          return element.type || 'text';
        }
      }

      return '';
    }

    var catalog = {
      en: {
        /**
         * these validation messages are from Firefox source,
         * http://mxr.mozilla.org/mozilla-central/source/dom/locales/en-US/chrome/dom/dom.properties
         * released under MPL license, http://mozilla.org/MPL/2.0/.
         */
        TextTooLong: 'Please shorten this text to %l characters or less (you are currently using %l characters).',
        ValueMissing: 'Please fill out this field.',
        CheckboxMissing: 'Please check this box if you want to proceed.',
        RadioMissing: 'Please select one of these options.',
        FileMissing: 'Please select a file.',
        SelectMissing: 'Please select an item in the list.',
        InvalidEmail: 'Please enter an email address.',
        InvalidURL: 'Please enter a URL.',
        PatternMismatch: 'Please match the requested format.',
        PatternMismatchWithTitle: 'Please match the requested format: %l.',
        NumberRangeOverflow: 'Please select a value that is no more than %l.',
        DateRangeOverflow: 'Please select a value that is no later than %l.',
        TimeRangeOverflow: 'Please select a value that is no later than %l.',
        NumberRangeUnderflow: 'Please select a value that is no less than %l.',
        DateRangeUnderflow: 'Please select a value that is no earlier than %l.',
        TimeRangeUnderflow: 'Please select a value that is no earlier than %l.',
        StepMismatch: 'Please select a valid value. The two nearest valid values are %l and %l.',
        StepMismatchOneValue: 'Please select a valid value. The nearest valid value is %l.',
        BadInputNumber: 'Please enter a number.'
      }
    };

    var language = 'en';

    function set_language(newlang) {
      language = newlang;
    }

    function add_translation(lang, new_catalog) {
      if (!(lang in catalog)) {
        catalog[lang] = {};
      }
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(new_catalog)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          catalog[lang][key] = new_catalog[key];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    function _ (s) {
      if (language in catalog && s in catalog[language]) {
        return catalog[language][s];
      } else if (s in catalog.en) {
        return catalog.en[s];
      }
      return s;
    }

    var default_step = {
      'datetime-local': 60,
      datetime: 60,
      time: 60
    };

    var step_scale_factor = {
      'datetime-local': 1000,
      datetime: 1000,
      date: 86400000,
      week: 604800000,
      time: 1000
    };

    var default_step_base = {
      week: -259200000
    };

    var default_min = {
      range: 0
    };

    var default_max = {
      range: 100
    };

    /**
     * get previous and next valid values for a stepped input element
     */
    function get_next_valid (element) {
      var n = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      var type = get_type(element);

      var aMin = element.getAttribute('min');
      var min = default_min[type] || NaN;
      if (aMin) {
        var pMin = string_to_number(aMin, type);
        if (!isNaN(pMin)) {
          min = pMin;
        }
      }

      var aMax = element.getAttribute('max');
      var max = default_max[type] || NaN;
      if (aMax) {
        var pMax = string_to_number(aMax, type);
        if (!isNaN(pMax)) {
          max = pMax;
        }
      }

      var aStep = element.getAttribute('step');
      var step = default_step[type] || 1;
      if (aStep && aStep.toLowerCase() === 'any') {
        /* quick return: we cannot calculate prev and next */
        return [_('any value'), _('any value')];
      } else if (aStep) {
        var pStep = string_to_number(aStep, type);
        if (!isNaN(pStep)) {
          step = pStep;
        }
      }

      var default_value = string_to_number(element.getAttribute('value'), type);

      var value = string_to_number(element.value || element.getAttribute('value'), type);

      if (isNaN(value)) {
        /* quick return: we cannot calculate without a solid base */
        return [_('any valid value'), _('any valid value')];
      }

      var step_base = !isNaN(min) ? min : !isNaN(default_value) ? default_value : default_step_base[type] || 0;

      var scale = step_scale_factor[type] || 1;

      var prev = step_base + Math.floor((value - step_base) / (step * scale)) * (step * scale) * n;
      var next = step_base + (Math.floor((value - step_base) / (step * scale)) + 1) * (step * scale) * n;

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

      /* convert to date objects, if appropriate */
      if (dates.indexOf(type) > -1) {
        prev = date_to_string(new Date(prev), type);
        next = date_to_string(new Date(next), type);
      }

      return [prev, next];
    }

    var _classCallCheck = (function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    })

    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };

    /**
     * the internal storage for messages
     */
    var store = new WeakMap();

    /* jshint -W053 */
    var message_store = {
      set: function set(element, message) {
        if (element instanceof window.HTMLFieldSetElement) {
          var wrapped_form = Wrapper.get_wrapped(element);
          if (wrapped_form && wrapped_form.settings.strict) {
            /* make this a no-op for <fieldset> in strict mode */
            return message_store;
          }
        }

        if (typeof message === 'string') {
          message = new String(message);
        }
        mark(message);
        store.set(element, message);

        /* allow the :invalid selector to match */
        if ('_original_setCustomValidity' in element) {
          element._original_setCustomValidity(message.toString());
        }

        return message_store;
      },
      get: function get(element) {
        var message = store.get(element);
        if (message === undefined && '_original_validationMessage' in element) {
          /* get the browser's validation message, if we have none. Maybe it
           * knows more than we. */
          message = new String(element._original_validationMessage);
        }
        return message ? message : new String('');
      },
      delete: function _delete(element) {
        if ('_original_setCustomValidity' in element) {
          element._original_setCustomValidity('');
        }
        return store.delete(element);
      }
    };

    var warnings_cache = new WeakMap();

    var Renderer = {

      show_warning: function show_warning(element) {
        var msg = message_store.get(element);
        var warning = warnings_cache.get(element);
        if (msg) {
          if (!warning) {
            warning = document.createElement('div');
            warning.className = 'hf-warning';
            warnings_cache.set(element, warning);
          }
          warning.textContent = msg;
          /* should also work, if element is last,
           * http://stackoverflow.com/a/4793630/113195 */
          element.parentNode.insertBefore(warning, element.nextSibling);
        } else if (warning && warning.parentNode) {
          warning.parentNode.removeChild(warning);
        }
      },

      set: function set(renderer, action) {
        Renderer[renderer] = action;
      }

    };

    /**
     * check element's validity and report an error back to the user
     */
    function reportValidity(element) {
      /* if this is a <form>, report validity of all child inputs */
      if (element instanceof window.HTMLFormElement) {
        return Array.prototype.map.call(element.elements, reportValidity).every(function (b) {
          return b;
        });
      }

      /* we copy checkValidity() here, b/c we have to check if the "invalid"
       * event was canceled. */
      var valid = ValidityState(element).valid;
      var event;
      if (valid) {
        var wrapped_form = Wrapper.get_wrapped(element);
        if (wrapped_form && wrapped_form.settings.valid_event) {
          event = trigger_event(element, 'valid', { cancelable: true });
        }
      } else {
        event = trigger_event(element, 'invalid', { cancelable: true });
      }

      if (!event || !event.defaultPrevented) {
        Renderer.show_warning(element);
      }

      return valid;
    }

    /**
     * publish a convenience function to replace the native element.reportValidity
     */
    reportValidity.install = installer('reportValidity', {
      configurable: true,
      enumerable: true,
      value: function value() {
        return reportValidity(this);
      },
      writable: true
    });

    mark(reportValidity);

    function check(event) {
      event.preventDefault();

      /* trigger a "validate" event on the form to be submitted */
      var val_event = trigger_event('validate', event.target.form, { cancelable: true });
      if (val_event.defaultPrevented) {
        /* skip the whole submit thing, if the validation is canceled. A user
         * can still call form.submit() afterwards. */
        return;
      }

      if (reportValidity(event.target.form)) {
        event.target.form.submit();
      }
    }

    /**
     * catch all relevant events _prior_ to a form being submitted
     */
    function catch_submit (listening_node) {
      /* catch explicit submission (click on button) */
      listening_node.addEventListener('click', function (event) {
        if (!event.defaultPrevented && (event.target.nodeName === 'INPUT' || event.target.nodeName === 'BUTTON') && (event.target.type === 'image' || event.target.type === 'submit') && !event.target.hasAttribute('formnovalidate') && event.target.form && !event.target.form.hasAttribute('novalidate')) {

          check(event);
        }
      });

      /* catch implicit submission */
      listening_node.addEventListener('keypress', function (event) {
        if (!event.defaultPrevented && event.keyCode === 13 && event.target.nodeName === 'INPUT' && text_types.indexOf(event.target.type) > -1 && event.target.form && !event.target.form.hasAttribute('novalidate')) {

          /* check, that there is no submit button in the form. Otherwise
           * that should be clicked. */
          var submit,
              el = event.target.form.elements.length;
          for (var i = 0; i < el; i++) {
            if (['image', 'submit'].indexOf(event.target.form.elements[i].type) > -1) {
              submit = event.target.form.elements[i];
              break;
            }
          }

          if (submit) {
            event.preventDefault();
            submit.click();
          } else {
            check(event);
          }
        }
      });
    }

    /**
     *
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
     * implement the valueAsDate functionality
     *
     * @see https://html.spec.whatwg.org/multipage/forms.html#dom-input-valueasdate
     */
    function valueAsDate() {
      var value = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

      /* jshint -W040 */
      var type = get_type(this);
      if (dates.indexOf(type) > -1) {
        if (value !== undefined) {
          /* setter: value must be null or a Date() */
          if (value === null) {
            this.value = '';
          } else if (value instanceof Date) {
            if (isNaN(value.getTime())) {
              this.value = '';
            } else {
              this.value = date_to_string(value, type);
            }
          } else {
            throw new window.DOMException('valueAsDate setter encountered invalid value', 'TypeError');
          }
          return;
        }

        var value_date = string_to_date(this.value, type);
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
      var type = get_type(this);
      if (numbers.indexOf(type) > -1) {
        if (type === 'range' && this.hasAttribute('multiple')) {
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

        return string_to_number(this.value, type);
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
     *
     */
    function stepDown(element) {
      var n = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      if (numbers.indexOf(get_type(element)) === -1) {
        throw new window.DOMException('stepDown encountered invalid type', 'InvalidStateError');
      }
      if ((element.getAttribute('step') || '').toLowerCase() === 'any') {
        throw new window.DOMException('stepDown encountered step "any"', 'InvalidStateError');
      }

      var _get_next_valid = get_next_valid(element, n);

      var prev = _get_next_valid.prev;
      var next = _get_next_valid.next;


      if (prev !== null) {
        valueAsNumber.call(element, prev);
      }
    }

    stepDown.install = installer('stepDown', {
      configurable: true,
      enumerable: true,
      value: function value() {
        var n = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
        return stepDown(this, n);
      },
      writable: true
    });

    mark(stepDown);

    /**
     *
     */
    function stepUp(element) {
      var n = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      if (numbers.indexOf(get_type(element)) === -1) {
        throw new window.DOMException('stepUp encountered invalid type', 'InvalidStateError');
      }
      if ((element.getAttribute('step') || '').toLowerCase() === 'any') {
        throw new window.DOMException('stepUp encountered step "any"', 'InvalidStateError');
      }

      var _get_next_valid = get_next_valid(element, n);

      var prev = _get_next_valid.prev;
      var next = _get_next_valid.next;


      if (next !== null) {
        valueAsNumber.call(element, next);
      }
    }

    stepUp.install = installer('stepUp', {
      configurable: true,
      enumerable: true,
      value: function value() {
        var n = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
        return stepUp(this, n);
      },
      writable: true
    });

    mark(stepUp);

    /**
     * get the validation message for an element, empty string, if the element
     * satisfies all constraints.
     */
    function validationMessage() {
      /* jshint -W040 */
      var msg = message_store.get(this);
      /* jshint +W040 */
      if (!msg) {
        return '';
      }

      /* make it a primitive again, since message_store returns String(). */
      return msg.toString();
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

    var instances = new WeakMap();

    /**
     * wrap <form>s, window or document, that get treated with the global
     * hyperform()
     */

    var Wrapper = function () {
      function Wrapper(form, settings) {
        _classCallCheck(this, Wrapper);

        this.form = form;
        this.settings = settings || {};

        instances.set(form, this);

        catch_submit(form);

        if (form === window || form instanceof window.HTMLDocument) {
          /* install on the prototypes, when called for the whole document */
          this.install([window.HTMLButtonElement.prototype, window.HTMLInputElement.prototype, window.HTMLSelectElement.prototype, window.HTMLTextAreaElement.prototype, window.HTMLFieldSetElement.prototype]);
        } else if (form instanceof window.HTMLFormElement || form instanceof window.HTMLFieldSetElement) {
          this.install(form.elements);
        }

        if (settings.revalidate === 'oninput') {
          /* in a perfect world we'd just bind to "input", but support here is
           * abysmal: http://caniuse.com/#feat=input-event */
          form.addEventListener('keyup', this.revalidate.bind(this));
          form.addEventListener('change', this.revalidate.bind(this));
        }
      }

      /**
       * revalidate an input element
       */


      _createClass(Wrapper, [{
        key: 'revalidate',
        value: function revalidate(event) {
          if (event.target instanceof window.HTMLButtonElement || event.target instanceof window.HTMLTextAreaElement || event.target instanceof window.HTMLSelectElement || event.target instanceof window.HTMLInputElement) {
            reportValidity(event.target);
          }
        }

        /**
         * install the polyfills on each given element
         *
         * If you add elements dynamically, you have to call install() on them
         * yourself:
         *
         * js> var form = hyperform(document.forms[0]);
         * js> document.forms[0].appendChild(input);
         * js> form.install(input);
         *
         * You can skip this, if you called hyperform on window or document.
         */

      }, {
        key: 'install',
        value: function install(els) {
          if (els instanceof window.HTMLElement) {
            els = [els];
          }

          var els_length = els.length;

          for (var i = 0; i < els_length; i++) {
            checkValidity.install(els[i]);
            reportValidity.install(els[i]);
            setCustomValidity.install(els[i]);
            stepDown.install(els[i]);
            stepUp.install(els[i]);
            validationMessage.install(els[i]);
            ValidityState.install(els[i]);
            valueAsDate.install(els[i]);
            valueAsNumber.install(els[i]);
            willValidate.install(els[i]);
          }
        }

        /**
         * try to get the appropriate wrapper for a specific element by looking up
         * its parent chain
         *
         * @return Wrapper | undefined
         */

      }], [{
        key: 'get_wrapped',
        value: function get_wrapped(element) {
          var wrapped;

          if (element.form) {
            /* try a shortcut with the element's <form> */
            wrapped = instances.get(element.form);
          }

          /* walk up the parent nodes until document (including) */
          while (!wrapped && element) {
            wrapped = instances.get(element);
            element = element.parentNode;
          }

          if (!wrapped) {
            /* try the global instance, if exists. This may also be undefined. */
            wrapped = instances.get(window);
          }

          return wrapped;
        }
      }]);

      return Wrapper;
    }();

    /**
     * check if an element is a candidate for constraint validation
     *
     * @see https://html.spec.whatwg.org/multipage/forms.html#barred-from-constraint-validation
     */
    function is_validation_candidate (element) {
      /* it must be any of those elements */
      if (element instanceof window.HTMLSelectElement || element instanceof window.HTMLTextAreaElement || element instanceof window.HTMLButtonElement || element instanceof window.HTMLInputElement) {

        var type = get_type(element);
        /* it's type must be in the whitelist or missing (select, textarea) */
        if (!type || non_inputs.indexOf(type) > -1 || validation_candidates.indexOf(type) > -1) {

          /* it mustn't be disabled or readonly */
          if (!element.hasAttribute('disabled') && !element.hasAttribute('readonly')) {

            var wrapped_form = Wrapper.get_wrapped(element);
            /* it hasn't got the (non-standard) attribute 'novalidate' or its
             * parent form has got the strict parameter */
            if (wrapped_form && wrapped_form.settings.strict || !element.hasAttribute('novalidate') || !element.noValidate) {

              /* it isn't part of a <fieldset disabled> */
              var p = element.parentNode;
              while (p && p.nodeType === 1) {
                if (p instanceof window.HTMLFieldSetElement && p.hasAttribute('disabled')) {
                  /* quick return, if it's a child of a disabled fieldset */
                  return false;
                } else if (p === element.form) {
                  /* the outer boundary. We can stop looking for relevant
                   * fieldsets. */
                  break;
                }
                p = p.parentNode;
              }

              /* then it's a candidate */
              return true;
            }
          }
        }
      }

      /* this is no HTML5 validation candidate... */
      return false;
    }

    var _toConsumableArray = (function (arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }return arr2;
      } else {
        return Array.from(arr);
      }
    })

    function unicode_string_length (str) {
      return [].concat(_toConsumableArray(str)).length;
    }

    var internal_registry = new WeakMap();

    /**
     * slim wrapper around a WeakMap to ensure the values are arrays
     * (hence allowing > 1 validators per element)
     */
    var registry = {
      set: function set(element, validator) {
        var current = internal_registry.get(element) || [];
        current.push(validator);
        internal_registry.set(element, current);
        return registry;
      },
      get: function get(element) {
        return internal_registry.get(element) || [];
      },
      delete: function _delete(element) {
        return internal_registry.delete(element);
      }
    };

    /**
     * test the max attribute
     *
     * we use Number() instead of parseFloat(), because an invalid attribute
     * value like "123abc" should result in an error.
     */
    function test_max (element) {
      var type = get_type(element);

      if (!is_validation_candidate(element) || !element.value || !element.hasAttribute('max')) {
        /* we're not responsible here */
        return true;
      }

      var value = void 0,
          max = void 0;
      if (dates.indexOf(type) > -1) {
        value = 1 * string_to_date(element.value, type);
        max = 1 * (string_to_date(element.getAttribute('max'), type) || NaN);
      } else {
        value = Number(element.value);
        max = Number(element.getAttribute('max'));
      }

      return isNaN(max) || value <= max;
    }

    /**
     * test the maxlength attribute
     */
    function test_maxlength (element) {
      if (!is_validation_candidate(element) || !element.value || text_types.indexOf(get_type(element)) === -1 || !element.hasAttribute('maxlength') || !element.getAttribute('maxlength') // catch maxlength=""
      ) {
          return true;
        }

      var maxlength = parseInt(element.getAttribute('maxlength'), 10);

      /* check, if the maxlength value is usable at all.
       * We allow maxlength === 0 to basically disable input (Firefox does, too).
       */
      if (isNaN(maxlength) || maxlength < 0) {
        return true;
      }

      return unicode_string_length(element.value) <= maxlength;
    }

    /**
     * test the min attribute
     *
     * we use Number() instead of parseFloat(), because an invalid attribute
     * value like "123abc" should result in an error.
     */
    function test_min (element) {
      var type = get_type(element);

      if (!is_validation_candidate(element) || !element.value || !element.hasAttribute('min')) {
        /* we're not responsible here */
        return true;
      }

      var value = void 0,
          min = void 0;
      if (dates.indexOf(type) > -1) {
        value = 1 * string_to_date(element.value, type);
        min = 1 * (string_to_date(element.getAttribute('min'), type) || NaN);
      } else {
        value = Number(element.value);
        min = Number(element.getAttribute('min'));
      }

      return isNaN(min) || value >= min;
    }

    /**
     * test the minlength attribute
     */
    function test_minlength (element) {
      if (!is_validation_candidate(element) || !element.value || text_types.indexOf(get_type(element)) === -1 || !element.hasAttribute('minlength') || !element.getAttribute('minlength') // catch minlength=""
      ) {
          return true;
        }

      var minlength = parseInt(element.getAttribute('minlength'), 10);

      /* check, if the minlength value is usable at all. */
      if (isNaN(minlength) || minlength < 0) {
        return true;
      }

      return unicode_string_length(element.value) >= minlength;
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

      /* we don't need get_type() for element.type, because "checkbox" and "radio"
       * are well supported. */
      switch (element.type) {
        case 'checkbox':
          return element.checked;
        //break;
        case 'radio':
          /* radio inputs have "required" fulfilled, if _any_ other radio
           * with the same name in this form is checked. */
          return !!(element.checked || element.form && Array.prototype.filter.call(document.getElementsByName(element.name), function (radio) {
            return radio.name === element.name && radio.form === element.form && radio.checked;
          }).length > 0);
        //break;
        default:
          return !!element.value;
      }
    }

    /**
     * test the step attribute
     */
    function test_step (element) {
      var type = get_type(element);

      if (!is_validation_candidate(element) || !element.value || numbers.indexOf(type) === -1 || (element.getAttribute('step') || '').toLowerCase() === 'any') {
        /* we're not responsible here. Note: If no step attribute is given, we
         * need to validate against the default step as per spec. */
        return true;
      }

      var step = element.getAttribute('step');
      if (step) {
        step = string_to_number(step, type);
      } else {
        step = default_step[type] || 1;
      }

      if (step <= 0 || isNaN(step)) {
        /* error in specified "step". We cannot validate against it, so the value
         * is true. */
        return true;
      }

      var scale = step_scale_factor[type] || 1;

      var value = string_to_number(element.value, type);
      var min = string_to_number(element.getAttribute('min') || element.getAttribute('value') || '', type);

      if (isNaN(min)) {
        min = default_step_base[type] || 0;
      }

      if (type === 'month') {
        /* type=month has month-wide steps. See
         * https://html.spec.whatwg.org/multipage/forms.html#month-state-%28type=month%29
         */
        min = new Date(min).getUTCFullYear() * 12 + new Date(min).getUTCMonth();
        value = new Date(value).getUTCFullYear() * 12 + new Date(value).getUTCMonth();
      }

      var result = Math.abs(min - value) % (step * scale);

      return result < 0.00000001 ||
      /* crappy floating-point arithmetics! */
      result > step * scale - 0.00000001;
    }

    /**
     * split a string on comma and trim the components
     *
     * As specified at
     * https://html.spec.whatwg.org/multipage/infrastructure.html#split-a-string-on-commas
     * plus removing empty entries.
     *
     * We don't use String.trim() to remove the need to polyfill it.
     */

    function comma_split (str) {
      return str.split(',').map(function (item) {
        return item /*.trim()*/.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
      }).filter(function (b) {
        return b;
      });
    }

    /* we use a dummy <a> where we set the href to test URL validity */
    var url_canary = document.createElement('a');

    /* see https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address */
    var email_pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    /**
     * test the type-inherent syntax
     */
    function test_type (element) {
      var type = get_type(element);

      if (!is_validation_candidate(element) || type !== 'file' && !element.value || type !== 'file' && type_checked.indexOf(type) === -1) {
        /* we're not responsible for this element */
        return true;
      }

      var is_valid = true;

      switch (type) {
        case 'url':
          url_canary.href = element.value;
          is_valid = url_canary.href === element.value || url_canary.href === element.value + '/';
          break;
        case 'email':
          if (element.hasAttribute('multiple')) {
            is_valid = comma_split(element.value).every(function (value) {
              return email_pattern.test(value);
            });
          } else {
            is_valid = email_pattern.test(element.value);
          }
          break;
        case 'file':
          if ('files' in element && element.files.length && element.hasAttribute('accept')) {
            var patterns = comma_split(element.getAttribute('accept')).map(function (pattern) {
              if (/^(audio|video|image)\/\*$/.test(pattern)) {
                pattern = new RegExp('^' + RegExp.$1 + '/.+$');
              }
              return pattern;
            });

            if (!patterns.length) {
              break;
            }

            fileloop: for (var i = 0; i < element.files.length; i++) {
              /* we need to match a whitelist, so pre-set with false */
              var file_valid = false;

              patternloop: for (var j = 0; j < patterns.length; j++) {
                var file = element.files[i];
                var pattern = patterns[j];

                var fileprop = file.type;

                if (typeof pattern === 'string' && pattern.substr(0, 1) === '.') {
                  if (file.name.search('.') === -1) {
                    /* no match with any file ending */
                    continue patternloop;
                  }

                  fileprop = file.name.substr(file.name.lastIndexOf('.'));
                }

                if (fileprop.search(pattern) === 0) {
                  /* we found one match and can quit looking */
                  file_valid = true;
                  break patternloop;
                }
              }

              if (!file_valid) {
                is_valid = false;
                break fileloop;
              }
            }
          }
      }

      return is_valid;
    }

    /**
     * test whether the element suffers from bad input
     */
    function test_bad_input (element) {
      var type = get_type(element);

      if (!is_validation_candidate(element) || !element.value || input_checked.indexOf(type) === -1) {
        /* we're not interested, thanks! */
        return true;
      }

      var result = true;
      switch (type) {
        case 'color':
          result = /^#[a-f0-9]{6}$/.test(element.value);
          break;
        case 'number':
        case 'range':
          result = !isNaN(Number(element.value));
          break;
        case 'datetime':
        case 'date':
        case 'month':
        case 'week':
        case 'time':
          result = string_to_date(element.value, type) !== null;
          break;
        case 'datetime-local':
          result = /^([0-9]{4,})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9])(?:\.([0-9]{1,3}))?)?$/.test(element.value);
          break;
        case 'tel':
          /* spec says No! Phone numbers can have all kinds of formats, so this
           * is expected to be a free-text field. */
          // TODO we could allow a setting 'phone_regex' to be evaluated here.
          break;
        case 'email':
          // TODO can we do this at all? Punycode conversion would be done by
          // the browser or not at all. If not, typeMismatch will catch that
          // altogether. And I hesitate a bit to pull in a heavy punycode lib
          // for basically no gain.
          break;
      }

      return result;
    }

    /**
     * Implement constraint checking functionality defined in the HTML5 standard
     *
     * @see https://html.spec.whatwg.org/multipage/forms.html#dom-cva-validity
     * @return bool true if the test fails [!], false otherwise
     */
    var validity_state_checkers = {
      badInput: function badInput(element) {
        var invalid = !test_bad_input(element);
        if (invalid) {
          message_store.set(element, _('Please match the requested type.'));
        }
        return invalid;
      },

      customError: function customError(element) {
        var msg = message_store.get(element);
        var invalid = msg && 'is_custom' in msg;
        /* no need for message_store.set, if the message is already there. */

        if (!msg) {
          /* check, if there are custom validators in the registry, and call
           * them. */
          var custom_validators = registry.get(element);
          if (custom_validators.length) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = custom_validators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var validator = _step.value;

                invalid = !validator(element);
                if (invalid) {
                  message_store.set(validator.message || _('Please comply with all requirements.'));
                  break;
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }
        }
        return invalid;
      },

      patternMismatch: function patternMismatch(element) {
        var invalid = !test_pattern(element);
        if (invalid) {
          message_store.set(element, element.title ? sprintf(_('PatternMismatchWithTitle'), element.title) : _('PatternMismatch'));
        }
        return invalid;
      },

      rangeOverflow: function rangeOverflow(element) {
        var invalid = !test_max(element);

        if (invalid) {
          var msg = void 0;
          switch (get_type(element)) {
            case 'date':
            case 'datetime':
            case 'datetime-local':
              msg = sprintf(_('DateRangeOverflow'), element.value);
              break;
            case 'time':
              msg = sprintf(_('TimeRangeOverflow'), element.value);
              break;
            // case 'number':
            default:
              msg = sprintf(_('NumberRangeOverflow'), element.value);
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
          switch (get_type(element)) {
            case 'date':
            case 'datetime':
            case 'datetime-local':
              msg = sprintf(_('DateRangeUnderflow'), element.value);
              break;
            case 'time':
              msg = sprintf(_('TimeRangeUnderflow'), element.value);
              break;
            // case 'number':
            default:
              msg = sprintf(_('NumberRangeUnderflow'), element.value);
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
            message_store.set(element, sprintf(_('StepMismatchOneValue'), sole));
          } else {
            message_store.set(element, sprintf(_('StepMismatch'), min, max));
          }
        }

        return invalid;
      },

      tooLong: function tooLong(element) {
        var invalid = !test_maxlength(element);

        if (invalid) {
          message_store.set(element, sprintf(_('TextTooLong'), element.getAttribute('maxlength'), unicode_string_length(element.value)));
        }

        return invalid;
      },

      tooShort: function tooShort(element) {
        var invalid = !test_minlength(element);

        if (invalid) {
          message_store.set(element, sprintf(_('Please lengthen this text to %l characters or more (you are currently using %l characters).'), element.getAttribute('maxlength'), unicode_string_length(element.value)));
        }

        return invalid;
      },

      typeMismatch: function typeMismatch(element) {
        var invalid = !test_type(element);

        if (invalid) {
          var msg = _('Please use the appropriate format.');
          var type = get_type(element);

          if (type === 'email') {
            if (element.hasAttribute('multiple')) {
              msg = _('Please enter a comma separated list of email addresses.');
            } else {
              msg = _('InvalidEmail');
            }
          } else if (type === 'url') {
            msg = _('InvalidURL');
          } else if (type === 'file') {
            msg = _('Please select a file of the correct type.');
          }
          message_store.set(element, msg);
        }

        return invalid;
      },

      valueMissing: function valueMissing(element) {
        var invalid = !test_required(element);

        if (invalid) {
          var msg = _('ValueMissing');
          var type = get_type(element);

          if (type === 'checkbox') {
            msg = _('CheckboxMissing');
          } else if (type === 'radio') {
            msg = _('RadioMissing');
          } else if (type === 'file') {
            if (element.hasAttribute('multiple')) {
              msg = _('Please select one or more files.');
            } else {
              msg = _('FileMissing');
            }
          } else if (element instanceof window.HTMLSelectElement) {
            msg = _('SelectMissing');
          }
          message_store.set(element, msg);
        }

        return invalid;
      }

    };

    /**
     * the validity state constructor
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

    /**
     * the prototype for new validityState instances
     */
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
     *
     * This is the major access point for _all_ other API methods, namely
     * (check|report)Validity().
     */
    Object.defineProperty(ValidityStatePrototype, 'valid', {
      configurable: true,
      enumerable: true,
      get: function get() {
        this.element.classList.add('hf-validated');

        if (is_validation_candidate(this.element)) {
          for (var _prop in validity_state_checkers) {
            if (validity_state_checkers[_prop](this.element)) {
              this.element.classList.add('hf-invalid');
              this.element.classList.remove('hf-valid');
              this.element.setAttribute('aria-invalid', 'true');
              return false;
            }
          }
        }

        message_store.delete(this.element);
        this.element.classList.remove('hf-invalid');
        this.element.classList.add('hf-valid');
        this.element.setAttribute('aria-invalid', 'false');
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
    function checkValidity(element) {
      /* if this is a <form>, check validity of all child inputs */
      if (element instanceof window.HTMLFormElement) {
        return Array.prototype.map.call(element.elements, checkValidity).every(function (b) {
          return b;
        });
      }

      /* default is true, also for elements that are no validation candidates */
      var valid = ValidityState(element).valid;
      if (valid) {
        var wrapped_form = Wrapper.get_wrapped(element);
        if (wrapped_form && wrapped_form.settings.valid_event) {
          trigger_event(element, 'valid');
        }
      } else {
        trigger_event(element, 'invalid', { cancelable: true });
      }

      return valid;
    }

    /**
     * publish a convenience function to replace the native element.checkValidity
     */
    checkValidity.install = installer('checkValidity', {
      configurable: true,
      enumerable: true,
      value: function value() {
        return checkValidity(this);
      },
      writable: true
    });

    mark(checkValidity);

    var version = '0.5.7';

    /**
     * public hyperform interface:
     */
    function hyperform(form) {
      var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var _ref$strict = _ref.strict;
      var strict = _ref$strict === undefined ? false : _ref$strict;
      var _ref$revalidate = _ref.revalidate;
      var revalidate = _ref$revalidate === undefined ? 'oninput' : _ref$revalidate;
      var _ref$valid_event = _ref.valid_event;
      var valid_event = _ref$valid_event === undefined ? true : _ref$valid_event;

      if (form instanceof window.NodeList || form instanceof window.HTMLCollection || form instanceof Array) {
        return Array.prototype.map.call(form, function (element) {
          return hyperform(element);
        });
      }

      return new Wrapper(form, { strict: strict, revalidate: revalidate, valid_event: valid_event });
    }

    hyperform.version = version;

    hyperform.checkValidity = checkValidity;
    hyperform.reportValidity = reportValidity;
    hyperform.setCustomValidity = setCustomValidity;
    hyperform.stepDown = stepDown;
    hyperform.stepUp = stepUp;
    hyperform.validationMessage = validationMessage;
    hyperform.ValidityState = ValidityState;
    hyperform.valueAsDate = valueAsDate;
    hyperform.valueAsNumber = valueAsNumber;
    hyperform.willValidate = willValidate;

    hyperform.set_language = set_language;
    hyperform.add_translation = add_translation;
    hyperform.add_renderer = Renderer.set;
    hyperform.register = registry.set;

    /* publish globally */
    window.hyperform = hyperform;

}());