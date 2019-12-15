'use strict';

/* the following code is borrowed from the WebComponents project, licensed
 * under the BSD license. Source:
 * <https://github.com/webcomponents/webcomponentsjs/blob/5283db1459fa2323e5bfc8b9b5cc1753ed85e3d0/src/WebComponents/dom.js#L53-L78>
 */
// defaultPrevented is broken in IE.
// https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called

var workingDefaultPrevented = function () {
  var e = document.createEvent('Event');
  e.initEvent('foo', true, true);
  e.preventDefault();
  return e.defaultPrevented;
}();

if (!workingDefaultPrevented) {
  var origPreventDefault = window.Event.prototype.preventDefault;

  window.Event.prototype.preventDefault = function () {
    if (!this.cancelable) {
      return;
    }

    origPreventDefault.call(this);
    Object.defineProperty(this, 'defaultPrevented', {
      get: function get() {
        return true;
      },
      configurable: true
    });
  };
}
/* end of borrowed code */


function create_event(name) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$bubbles = _ref.bubbles,
      bubbles = _ref$bubbles === void 0 ? true : _ref$bubbles,
      _ref$cancelable = _ref.cancelable,
      cancelable = _ref$cancelable === void 0 ? false : _ref$cancelable;

  var event = document.createEvent('Event');
  event.initEvent(name, bubbles, cancelable);
  return event;
}
function trigger_event (element, event) {
  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$bubbles = _ref2.bubbles,
      bubbles = _ref2$bubbles === void 0 ? true : _ref2$bubbles,
      _ref2$cancelable = _ref2.cancelable,
      cancelable = _ref2$cancelable === void 0 ? false : _ref2$cancelable;

  var payload = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (!(event instanceof window.Event)) {
    event = create_event(event, {
      bubbles: bubbles,
      cancelable: cancelable
    });
  }

  for (var key in payload) {
    if (payload.hasOwnProperty(key)) {
      event[key] = payload[key];
    }
  }

  element.dispatchEvent(event);
  return event;
}

/* shim layer for the Element.matches method */

var ep = window.Element.prototype;
var native_matches = ep.matches || ep.matchesSelector || ep.msMatchesSelector || ep.webkitMatchesSelector;
function matches (element, selector) {
  return native_matches.call(element, selector);
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function mark (obj) {
  if (['object', 'function'].indexOf(_typeof(obj)) > -1) {
    delete obj.__hyperform;
    Object.defineProperty(obj, '__hyperform', {
      configurable: true,
      enumerable: false,
      value: true
    });
  }

  return obj;
}

/**
 * the internal storage for messages
 */

var store = new WeakMap();
/* jshint -W053 */

/* allow new String() */

/**
 * handle validation messages
 *
 * Falls back to browser-native errors, if any are available. The messages
 * are String objects so that we can mark() them.
 */

var message_store = {
  set: function set(element, message) {
    var is_custom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (element instanceof window.HTMLFieldSetElement) {
      var wrapped_form = get_wrapper(element);

      if (wrapped_form && !wrapped_form.settings.extendFieldset) {
        /* make this a no-op for <fieldset> in strict mode */
        return message_store;
      }
    }

    if (typeof message === 'string') {
      message = new String(message);
    }

    if (is_custom) {
      message.is_custom = true;
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
  "delete": function _delete(element) {
    var is_custom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if ('_original_setCustomValidity' in element) {
      element._original_setCustomValidity('');
    }

    var message = store.get(element);

    if (message && is_custom && !message.is_custom) {
      /* do not delete "native" messages, if asked */
      return false;
    }

    return store["delete"](element);
  }
};

/**
 * counter that will be incremented with every call
 *
 * Will enforce uniqueness, as long as no more than 1 hyperform scripts
 * are loaded. (In that case we still have the "random" part below.)
 */

var uid = 0;
/**
 * generate a random ID
 *
 * @see https://gist.github.com/gordonbrander/2230317
 */

function generate_id () {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'hf_';
  return prefix + uid++ + Math.random().toString(36).substr(2);
}

/**
 * get all radio buttons (including `element`) that belong to element's
 * radio group
 */

function get_radiogroup(element) {
  if (element.form) {
    return Array.prototype.filter.call(element.form.elements, function (radio) {
      return radio.type === 'radio' && radio.name === element.name;
    });
  }

  return [element];
}

var warningsCache = new WeakMap();
var DefaultRenderer = {
  /**
   * called when a warning should become visible
   */
  attachWarning: function attachWarning(warning, element) {
    /* should also work, if element is last,
     * http://stackoverflow.com/a/4793630/113195 */
    element.parentNode.insertBefore(warning, element.nextSibling);
  },

  /**
   * called when a warning should vanish
   */
  detachWarning: function detachWarning(warning, element) {
    /* be conservative here, since an overwritten attachWarning() might not
     * actually have attached the warning. */
    if (warning.parentNode) {
      warning.parentNode.removeChild(warning);
    }
  },

  /**
   * called when feedback to an element's state should be handled
   *
   * i.e., showing and hiding warnings
   */
  showWarning: function showWarning(element) {
    var whole_form_validated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    /* don't render error messages on subsequent radio buttons of the
     * same group. This assumes, that element.validity.valueMissing is the only
     * possible validation failure for radio buttons. */
    if (whole_form_validated && element.type === 'radio' && get_radiogroup(element)[0] !== element) {
      return;
    }

    var msg = message_store.get(element).toString();
    var warning = warningsCache.get(element);

    if (msg) {
      if (!warning) {
        var wrapper = get_wrapper(element);
        warning = document.createElement('div');
        warning.className = wrapper && wrapper.settings.classes.warning || 'hf-warning';
        warning.id = generate_id();
        warning.setAttribute('aria-live', 'polite');
        warningsCache.set(element, warning);
      }

      element.setAttribute('aria-errormessage', warning.id);

      if (!element.hasAttribute('aria-describedby')) {
        element.setAttribute('aria-describedby', warning.id);
      }

      Renderer.setMessage(warning, msg, element);
      Renderer.attachWarning(warning, element);
    } else if (warning && warning.parentNode) {
      if (element.getAttribute('aria-describedby') === warning.id) {
        element.removeAttribute('aria-describedby');
      }

      element.removeAttribute('aria-errormessage');
      Renderer.detachWarning(warning, element);
    }
  },

  /**
   * set the warning's content
   *
   * Overwrite this method, if you want, e.g., to allow HTML in warnings
   * or preprocess the content.
   */
  setMessage: function setMessage(warning, message, element) {
    warning.textContent = message;
  }
};
var Renderer = {
  attachWarning: DefaultRenderer.attachWarning,
  detachWarning: DefaultRenderer.detachWarning,
  showWarning: DefaultRenderer.showWarning,
  setMessage: DefaultRenderer.setMessage,
  set: function set(renderer, action) {
    if (!action) {
      action = DefaultRenderer[renderer];
    }

    Renderer[renderer] = action;
  },
  getWarning: function getWarning(element) {
    return warningsCache.get(element);
  }
};

var registry = Object.create(null);
/**
 * run all actions registered for a hook
 *
 * Every action gets called with a state object as `this` argument and with the
 * hook's call arguments as call arguments.
 *
 * @return mixed the returned value of the action calls or undefined
 */

function call_hook(hook) {
  var result;
  var call_args = Array.prototype.slice.call(arguments, 1);

  if (hook in registry) {
    result = registry[hook].reduce(function (args) {
      return function (previousResult, currentAction) {
        var interimResult = currentAction.apply({
          state: previousResult,
          hook: hook
        }, args);
        return interimResult !== undefined ? interimResult : previousResult;
      };
    }(call_args), result);
  }

  return result;
}
/**
 * Filter a value through hooked functions
 *
 * Allows for additional parameters:
 * js> do_filter('foo', null, current_element)
 */

function do_filter(hook, initial_value) {
  var result = initial_value;
  var call_args = Array.prototype.slice.call(arguments, 1);

  if (hook in registry) {
    result = registry[hook].reduce(function (previousResult, currentAction) {
      call_args[0] = previousResult;
      var interimResult = currentAction.apply({
        state: previousResult,
        hook: hook
      }, call_args);
      return interimResult !== undefined ? interimResult : previousResult;
    }, result);
  }

  return result;
}
/**
 * remove an action again
 */

function remove_hook(hook, action) {
  if (hook in registry) {
    for (var i = 0; i < registry[hook].length; i++) {
      if (registry[hook][i] === action) {
        registry[hook].splice(i, 1);
        break;
      }
    }
  }
}
/**
 * add an action to a hook
 */

function add_hook(hook, action, position) {
  if (!(hook in registry)) {
    registry[hook] = [];
  }

  if (position === undefined) {
    position = registry[hook].length;
  }

  registry[hook].splice(position, 0, action);
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
var text = ['text', 'search', 'tel', 'password'].concat(type_checked);
/* input element types, that are candidates for the validation API.
 * Missing from this set are: button, hidden, menu (from <button>), reset and
 * the types for non-<input> elements. */

var validation_candidates = ['checkbox', 'color', 'file', 'image', 'radio', 'submit'].concat(numbers, text);
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

/**
 * check if an element should be ignored due to any of its parents
 *
 * Checks <fieldset disabled> and <datalist>.
 */

function is_in_disallowed_parent(element) {
  var p = element.parentNode;

  while (p && p.nodeType === 1) {
    if (p instanceof window.HTMLFieldSetElement && p.hasAttribute('disabled')) {
      /* quick return, if it's a child of a disabled fieldset */
      return true;
    } else if (p.nodeName.toUpperCase() === 'DATALIST') {
      /* quick return, if it's a child of a datalist
       * Do not use HTMLDataListElement to support older browsers,
       * too.
       * @see https://html.spec.whatwg.org/multipage/forms.html#the-datalist-element:barred-from-constraint-validation
       */
      return true;
    } else if (p === element.form) {
      /* the outer boundary. We can stop looking for relevant elements. */
      break;
    }

    p = p.parentNode;
  }

  return false;
}
/**
 * check if an element is a candidate for constraint validation
 *
 * @see https://html.spec.whatwg.org/multipage/forms.html#barred-from-constraint-validation
 */


function is_validation_candidate (element) {
  /* allow a shortcut via filters, e.g. to validate type=hidden fields */
  var filtered = do_filter('is_validation_candidate', null, element);

  if (filtered !== null) {
    return !!filtered;
  }
  /* it must be any of those elements */


  if (element instanceof window.HTMLSelectElement || element instanceof window.HTMLTextAreaElement || element instanceof window.HTMLButtonElement || element instanceof window.HTMLInputElement) {
    var type = get_type(element);
    /* its type must be in the whitelist */

    if (non_inputs.indexOf(type) > -1 || validation_candidates.indexOf(type) > -1) {
      /* it mustn't be disabled or readonly */
      if (!element.hasAttribute('disabled') && !element.hasAttribute('readonly')) {
        var wrapped_form = get_wrapper(element);

        if (
        /* the parent form doesn't allow non-standard "novalidate" attributes... */
        wrapped_form && !wrapped_form.settings.novalidateOnElements ||
        /* ...or it doesn't have such an attribute/property */
        !element.hasAttribute('novalidate') && !element.noValidate) {
          /* it isn't part of a <fieldset disabled> */
          if (!is_in_disallowed_parent(element)) {
            /* then it's a candidate */
            return true;
          }
        }
      }
    }
  }
  /* this is no HTML5 validation candidate... */


  return false;
}

function format_date (date) {
  var part = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  switch (part) {
    case 'date':
      return (date.toLocaleDateString || date.toDateString).call(date);

    case 'time':
      return (date.toLocaleTimeString || date.toTimeString).call(date);

    case 'month':
      return 'toLocaleDateString' in date ? date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: '2-digit'
      }) : date.toDateString();
    // case 'week':
    // TODO

    default:
      return (date.toLocaleString || date.toString).call(date);
  }
}

function sprintf (str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
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
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
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

  if (date.getUTCDay() <= 4
  /* thursday */
  ) {
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
  var date;

  switch (element_type) {
    case 'datetime':
      if (!/^([0-9]{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9])(?:\.([0-9]{1,3}))?)?$/.test(string)) {
        return null;
      }

      date = new Date(string + 'z');
      return isNaN(date.valueOf()) ? null : date;

    case 'date':
      if (!/^([0-9]{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(string)) {
        return null;
      }

      date = new Date(string);
      return isNaN(date.valueOf()) ? null : date;

    case 'month':
      if (!/^([0-9]{4})-(0[1-9]|1[012])$/.test(string)) {
        return null;
      }

      date = new Date(string);
      return isNaN(date.valueOf()) ? null : date;

    case 'week':
      if (!/^([0-9]{4})-W(0[1-9]|[1234][0-9]|5[0-3])$/.test(string)) {
        return null;
      }

      return get_date_from_week(Number(RegExp.$2), Number(RegExp.$1));

    case 'time':
      if (!/^([01][0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9])(?:\.([0-9]{1,3}))?)?$/.test(string)) {
        return null;
      }

      date = new Date('1970-01-01T' + string + 'z');
      return date;
  }

  return null;
}

/**
 * calculate a number from a string according to HTML5
 */

function string_to_number (string, element_type) {
  var rval = string_to_date(string, element_type);

  if (rval !== null) {
    return +rval;
  }
  /* not parseFloat, because we want NaN for invalid values like "1.2xxy" */


  return Number(string);
}

/**
 * the following validation messages are from Firefox source,
 * http://mxr.mozilla.org/mozilla-central/source/dom/locales/en-US/chrome/dom/dom.properties
 * released under MPL license, http://mozilla.org/MPL/2.0/.
 */

var catalog = {
  en: {
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
/**
 * the global language Hyperform will use
 */

var language = 'en';
/**
 * the base language according to BCP47, i.e., only the piece before the first hyphen
 */

var base_lang = 'en';
/**
 * set the language for Hyperform’s messages
 */

function set_language(newlang) {
  language = newlang;
  base_lang = newlang.replace(/[-_].*/, '');
}
/**
 * add a lookup catalog "string: translation" for a language
 */

function add_translation(lang, new_catalog) {
  if (!(lang in catalog)) {
    catalog[lang] = {};
  }

  for (var key in new_catalog) {
    if (new_catalog.hasOwnProperty(key)) {
      catalog[lang][key] = new_catalog[key];
    }
  }
}
/**
 * return `s` translated into the current language
 *
 * Defaults to the base language and then English if the former has no
 * translation for `s`.
 */

function _ (s) {
  if (language in catalog && s in catalog[language]) {
    return catalog[language][s];
  } else if (base_lang in catalog && s in catalog[base_lang]) {
    return catalog[base_lang][s];
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
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
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

/**
 * patch String.length to account for non-BMP characters
 *
 * @see https://mathiasbynens.be/notes/javascript-unicode
 * We do not use the simple [...str].length, because it needs a ton of
 * polyfills in older browsers.
 */

function unicode_string_length (str) {
  return str.match(/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g).length;
}

/**
 * internal storage for custom error messages
 */

var store$1 = new WeakMap();
/**
 * register custom error messages per element
 */

var custom_messages = {
  set: function set(element, validator, message) {
    var messages = store$1.get(element) || {};
    messages[validator] = message;
    store$1.set(element, messages);
    return custom_messages;
  },
  get: function get(element, validator) {
    var _default = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

    var messages = store$1.get(element);

    if (messages === undefined || !(validator in messages)) {
      var data_id = 'data-' + validator.replace(/[A-Z]/g, '-$&').toLowerCase();

      if (element.hasAttribute(data_id)) {
        /* if the element has a data-validator attribute, use this as fallback.
         * E.g., if validator == 'valueMissing', the element can specify a
         * custom validation message like this:
         *     <input data-value-missing="Oh noes!">
         */
        return element.getAttribute(data_id);
      }

      return _default;
    }

    return messages[validator];
  },
  "delete": function _delete(element) {
    var validator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (!validator) {
      return store$1["delete"](element);
    }

    var messages = store$1.get(element) || {};

    if (validator in messages) {
      delete messages[validator];
      store$1.set(element, messages);
      return true;
    }

    return false;
  }
};

var internal_registry = new WeakMap();
/**
 * A registry for custom validators
 *
 * slim wrapper around a WeakMap to ensure the values are arrays
 * (hence allowing > 1 validators per element)
 */

var custom_validator_registry = {
  set: function set(element, validator) {
    var current = internal_registry.get(element) || [];
    current.push(validator);
    internal_registry.set(element, current);
    return custom_validator_registry;
  },
  get: function get(element) {
    return internal_registry.get(element) || [];
  },
  "delete": function _delete(element) {
    return internal_registry["delete"](element);
  }
};

/**
 * test whether the element suffers from bad input
 */

function test_bad_input (element) {
  var type = get_type(element);

  if (input_checked.indexOf(type) === -1) {
    /* we're not interested, thanks! */
    return true;
  }
  /* the browser hides some bad input from the DOM, e.g. malformed numbers,
   * email addresses with invalid punycode representation, ... We try to resort
   * to the original method here. The assumption is, that a browser hiding
   * bad input will hopefully also always support a proper
   * ValidityState.badInput */


  if (!element.value) {
    if ('_original_validity' in element && !element._original_validity.__hyperform) {
      return !element._original_validity.badInput;
    }
    /* no value and no original badInput: Assume all's right. */


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
      break;
  }

  return result;
}

/**
 * test the max attribute
 *
 * we use Number() instead of parseFloat(), because an invalid attribute
 * value like "123abc" should result in an error.
 */

function test_max (element) {
  var type = get_type(element);

  if (!element.value || !element.hasAttribute('max')) {
    /* we're not responsible here */
    return true;
  }

  var value, max;

  if (dates.indexOf(type) > -1) {
    value = string_to_date(element.value, type);
    value = value === null ? NaN : +value;
    max = string_to_date(element.getAttribute('max'), type);
    max = max === null ? NaN : +max;
  } else {
    value = Number(element.value);
    max = Number(element.getAttribute('max'));
  }
  /* we cannot validate invalid values and trust on badInput, if isNaN(value) */


  return isNaN(max) || isNaN(value) || value <= max;
}

/**
 * test the maxlength attribute
 */

function test_maxlength (element) {
  if (!element.value || text.indexOf(get_type(element)) === -1 || !element.hasAttribute('maxlength') || !element.getAttribute('maxlength') // catch maxlength=""
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

  if (!element.value || !element.hasAttribute('min')) {
    /* we're not responsible here */
    return true;
  }

  var value, min;

  if (dates.indexOf(type) > -1) {
    value = string_to_date(element.value, type);
    value = value === null ? NaN : +value;
    min = string_to_date(element.getAttribute('min'), type);
    min = min === null ? NaN : +min;
  } else {
    value = Number(element.value);
    min = Number(element.getAttribute('min'));
  }
  /* we cannot validate invalid values and trust on badInput, if isNaN(value) */


  return isNaN(min) || isNaN(value) || value >= min;
}

/**
 * test the minlength attribute
 */

function test_minlength (element) {
  if (!element.value || text.indexOf(get_type(element)) === -1 || !element.hasAttribute('minlength') || !element.getAttribute('minlength') // catch minlength=""
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
  return !element.value || !element.hasAttribute('pattern') || new RegExp('^(?:' + element.getAttribute('pattern') + ')$').test(element.value);
}

function has_submittable_option(select) {
  /* Definition of the placeholder label option:
   * https://www.w3.org/TR/html5/sec-forms.html#element-attrdef-select-required
   * Being required (the first constraint in the spec) is trivially true, since
   * this function is only called for such selects.
   */
  var has_placeholder_option = !select.multiple && select.size <= 1 && select.options.length > 0 && select.options[0].parentNode == select && select.options[0].value === '';
  return (
    /* anything selected at all? That's redundant with the .some() call below,
     * but more performant in the most probable error case. */
    select.selectedIndex > -1 && Array.prototype.some.call(select.options, function (option) {
      return (
        /* it isn't the placeholder option */
        (!has_placeholder_option || option.index !== 0) &&
        /* it isn't disabled */
        !option.disabled &&
        /* and it is, in fact, selected */
        option.selected
      );
    })
  );
}
/**
 * test the required attribute
 */


function test_required (element) {
  if (element.type === 'radio') {
    /* the happy (and quick) path for radios: */
    if (element.hasAttribute('required') && element.checked) {
      return true;
    }

    var radiogroup = get_radiogroup(element);
    /* if any radio in the group is required, we need any (not necessarily the
     * same) radio to be checked */

    if (radiogroup.some(function (radio) {
      return radio.hasAttribute('required');
    })) {
      return radiogroup.some(function (radio) {
        return radio.checked;
      });
    }
    /* not required, validation passes */


    return true;
  }

  if (!element.hasAttribute('required')) {
    /* nothing to do */
    return true;
  }

  if (element instanceof window.HTMLSelectElement) {
    return has_submittable_option(element);
  }

  return element.type === 'checkbox' ? element.checked : !!element.value;
}

/**
 * test the step attribute
 */

function test_step (element) {
  var type = get_type(element);

  if (!element.value || numbers.indexOf(type) === -1 || (element.getAttribute('step') || '').toLowerCase() === 'any') {
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

  if (isNaN(value)) {
    /* we cannot compare an invalid value and trust that the badInput validator
     * takes over from here */
    return true;
  }

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

var ws_on_start_or_end = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
/**
 * trim a string of whitespace
 *
 * We don't use String.trim() to remove the need to polyfill it.
 */

function trim (str) {
  return str.replace(ws_on_start_or_end, '');
}

/**
 * split a string on comma and trim the components
 *
 * As specified at
 * https://html.spec.whatwg.org/multipage/infrastructure.html#split-a-string-on-commas
 * plus removing empty entries.
 */

function comma_split (str) {
  return str.split(',').map(function (item) {
    return trim(item);
  }).filter(function (b) {
    return b;
  });
}

/* we use a dummy <a> where we set the href to test URL validity
 * The definition is out of the "global" scope so that JSDOM can be instantiated
 * after loading Hyperform for tests.
 */

var url_canary;
/* see https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address */

var email_pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
/**
 * test the type-inherent syntax
 */

function test_type (element) {
  var type = get_type(element);

  if (type !== 'file' && !element.value || type !== 'file' && type_checked.indexOf(type) === -1) {
    /* we're not responsible for this element */
    return true;
  }

  var is_valid = true;

  switch (type) {
    case 'url':
      if (!url_canary) {
        url_canary = document.createElement('a');
      }

      var value = trim(element.value);
      url_canary.href = value;
      is_valid = url_canary.href === value || url_canary.href === value + '/';
      break;

    case 'email':
      if (element.hasAttribute('multiple')) {
        is_valid = comma_split(element.value).every(function (value) {
          return email_pattern.test(value);
        });
      } else {
        is_valid = email_pattern.test(trim(element.value));
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
 * boilerplate function for all tests but customError
 */

function check(test, react) {
  return function (element) {
    var invalid = !test(element);

    if (invalid) {
      react(element);
    }

    return invalid;
  };
}
/**
 * create a common function to set error messages
 */


function set_msg(element, msgtype, _default) {
  message_store.set(element, custom_messages.get(element, msgtype, _default));
}

var badInput = check(test_bad_input, function (element) {
  return set_msg(element, 'badInput', _('Please match the requested type.'));
});

function customError(element) {
  /* prevent infinite loops when the custom validators call setCustomValidity(),
   * which in turn calls this code again. We check, if there is an already set
   * custom validity message there. */
  if (element.__hf_custom_validation_running) {
    var msg = message_store.get(element);
    return msg && msg.is_custom;
  }
  /* check, if there are custom validators in the registry, and call
   * them. */


  var custom_validators = custom_validator_registry.get(element);
  var cvl = custom_validators.length;
  var valid = true;

  if (cvl) {
    element.__hf_custom_validation_running = true;

    for (var i = 0; i < cvl; i++) {
      var result = custom_validators[i](element);

      if (result !== undefined && !result) {
        valid = false;
        /* break on first invalid response */

        break;
      }
    }

    delete element.__hf_custom_validation_running;
  }
  /* check, if there are other validity messages already */


  if (valid) {
    var _msg = message_store.get(element);

    valid = !(_msg.toString() && 'is_custom' in _msg);
  }

  return !valid;
}

var patternMismatch = check(test_pattern, function (element) {
  set_msg(element, 'patternMismatch', element.title ? sprintf(_('PatternMismatchWithTitle'), element.title) : _('PatternMismatch'));
});
/**
 * TODO: when rangeOverflow and rangeUnderflow are both called directly and
 * successful, the inRange and outOfRange classes won't get removed, unless
 * element.validityState.valid is queried, too.
 */

var rangeOverflow = check(test_max, function (element) {
  var type = get_type(element);
  var wrapper = get_wrapper(element);
  var outOfRangeClass = wrapper && wrapper.settings.classes.outOfRange || 'hf-out-of-range';
  var inRangeClass = wrapper && wrapper.settings.classes.inRange || 'hf-in-range';
  var msg;

  switch (type) {
    case 'date':
    case 'datetime':
    case 'datetime-local':
      msg = sprintf(_('DateRangeOverflow'), format_date(string_to_date(element.getAttribute('max'), type), type));
      break;

    case 'time':
      msg = sprintf(_('TimeRangeOverflow'), format_date(string_to_date(element.getAttribute('max'), type), type));
      break;
    // case 'number':

    default:
      msg = sprintf(_('NumberRangeOverflow'), string_to_number(element.getAttribute('max'), type));
      break;
  }

  set_msg(element, 'rangeOverflow', msg);
  element.classList.add(outOfRangeClass);
  element.classList.remove(inRangeClass);
});
var rangeUnderflow = check(test_min, function (element) {
  var type = get_type(element);
  var wrapper = get_wrapper(element);
  var outOfRangeClass = wrapper && wrapper.settings.classes.outOfRange || 'hf-out-of-range';
  var inRangeClass = wrapper && wrapper.settings.classes.inRange || 'hf-in-range';
  var msg;

  switch (type) {
    case 'date':
    case 'datetime':
    case 'datetime-local':
      msg = sprintf(_('DateRangeUnderflow'), format_date(string_to_date(element.getAttribute('min'), type), type));
      break;

    case 'time':
      msg = sprintf(_('TimeRangeUnderflow'), format_date(string_to_date(element.getAttribute('min'), type), type));
      break;
    // case 'number':

    default:
      msg = sprintf(_('NumberRangeUnderflow'), string_to_number(element.getAttribute('min'), type));
      break;
  }

  set_msg(element, 'rangeUnderflow', msg);
  element.classList.add(outOfRangeClass);
  element.classList.remove(inRangeClass);
});
var stepMismatch = check(test_step, function (element) {
  var list = get_next_valid(element);
  var min = list[0];
  var max = list[1];
  var sole = false;
  var msg;

  if (min === null) {
    sole = max;
  } else if (max === null) {
    sole = min;
  }

  if (sole !== false) {
    msg = sprintf(_('StepMismatchOneValue'), sole);
  } else {
    msg = sprintf(_('StepMismatch'), min, max);
  }

  set_msg(element, 'stepMismatch', msg);
});
var tooLong = check(test_maxlength, function (element) {
  set_msg(element, 'tooLong', sprintf(_('TextTooLong'), element.getAttribute('maxlength'), unicode_string_length(element.value)));
});
var tooShort = check(test_minlength, function (element) {
  set_msg(element, 'tooShort', sprintf(_('Please lengthen this text to %l characters or more (you are currently using %l characters).'), element.getAttribute('minlength'), unicode_string_length(element.value)));
});
var typeMismatch = check(test_type, function (element) {
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

  set_msg(element, 'typeMismatch', msg);
});
var valueMissing = check(test_required, function (element) {
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

  set_msg(element, 'valueMissing', msg);
});
/**
 * the "valid" property calls all other validity checkers and returns true,
 * if all those return false.
 *
 * This is the major access point for _all_ other API methods, namely
 * (check|report)Validity().
 */

var valid = function valid(element) {
  var wrapper = get_wrapper(element);
  var validClass = wrapper && wrapper.settings.classes.valid || 'hf-valid';
  var invalidClass = wrapper && wrapper.settings.classes.invalid || 'hf-invalid';
  var userInvalidClass = wrapper && wrapper.settings.classes.userInvalid || 'hf-user-invalid';
  var userValidClass = wrapper && wrapper.settings.classes.userValid || 'hf-user-valid';
  var inRangeClass = wrapper && wrapper.settings.classes.inRange || 'hf-in-range';
  var outOfRangeClass = wrapper && wrapper.settings.classes.outOfRange || 'hf-out-of-range';
  var validatedClass = wrapper && wrapper.settings.classes.validated || 'hf-validated';
  element.classList.add(validatedClass);

  for (var _i = 0, _arr = [badInput, customError, patternMismatch, rangeOverflow, rangeUnderflow, stepMismatch, tooLong, tooShort, typeMismatch, valueMissing]; _i < _arr.length; _i++) {
    var checker = _arr[_i];

    if (checker(element)) {
      element.classList.add(invalidClass);
      element.classList.remove(validClass);
      element.classList.remove(userValidClass);

      if ((element.type === 'checkbox' || element.type === 'radio') && element.checked !== element.defaultChecked ||
      /* the following test is trivially false for checkboxes/radios */
      element.value !== element.defaultValue) {
        element.classList.add(userInvalidClass);
      } else {
        element.classList.remove(userInvalidClass);
      }

      element.setAttribute('aria-invalid', 'true');
      return false;
    }
  }

  message_store["delete"](element);
  element.classList.remove(invalidClass);
  element.classList.remove(userInvalidClass);
  element.classList.remove(outOfRangeClass);
  element.classList.add(validClass);
  element.classList.add(inRangeClass);

  if (element.value !== element.defaultValue) {
    element.classList.add(userValidClass);
  } else {
    element.classList.remove(userValidClass);
  }

  element.setAttribute('aria-invalid', 'false');
  return true;
};

var validity_state_checkers = {
  badInput: badInput,
  customError: customError,
  patternMismatch: patternMismatch,
  rangeOverflow: rangeOverflow,
  rangeUnderflow: rangeUnderflow,
  stepMismatch: stepMismatch,
  tooLong: tooLong,
  tooShort: tooShort,
  typeMismatch: typeMismatch,
  valueMissing: valueMissing,
  valid: valid
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
/* small wrapper around the actual validator to check if the validator
 * should actually be called. `this` refers to the ValidityState object. */

var checker_getter = function checker_getter(func) {
  return function () {
    if (!is_validation_candidate(this.element)) {
      /* not being validated == valid by default */
      return true;
    }

    return func(this.element);
  };
};
/**
 * copy functionality from the validity checkers to the ValidityState
 * prototype
 */


for (var prop in validity_state_checkers) {
  Object.defineProperty(ValidityStatePrototype, prop, {
    configurable: true,
    enumerable: true,
    get: checker_getter(validity_state_checkers[prop]),
    set: undefined
  });
}
/**
 * mark the validity prototype, because that is what the client-facing
 * code deals with mostly, not the property descriptor thing */


mark(ValidityStatePrototype);

/**
 * check element's validity and report an error back to the user
 */

function reportValidity(element) {
  /* if this is a <form>, report validity of all child inputs */
  if (element instanceof window.HTMLFormElement) {
    element.__hf_form_validation = true;
    var form_valid = get_validated_elements(element).map(reportValidity).every(function (b) {
      return b;
    });
    delete element.__hf_form_validation;
    return form_valid;
  }
  /* we copy checkValidity() here, b/c we have to check if the "invalid"
   * event was canceled. */


  var valid = ValidityState(element).valid;
  var event;

  if (valid) {
    var wrapped_form = get_wrapper(element);

    if (wrapped_form && wrapped_form.settings.validEvent) {
      event = trigger_event(element, 'valid', {
        cancelable: true
      });
    }
  } else {
    event = trigger_event(element, 'invalid', {
      cancelable: true
    });
  }

  if (!event || !event.defaultPrevented) {
    Renderer.showWarning(element, element.form && element.form.__hf_form_validation);
  }

  return valid;
}

/**
 * submit a form, because `element` triggered it
 *
 * This method also dispatches a submit event on the form prior to the
 * submission. The event contains the trigger element as `submittedVia`.
 *
 * If the element is a button with a name, the name=value pair will be added
 * to the submitted data.
 */

function submit_form_via(element) {
  /* apparently, the submit event is not triggered in most browsers on
   * the submit() method, so we do it manually here to model a natural
   * submit as closely as possible.
   * Now to the fun fact: If you trigger a submit event from a form, what
   * do you think should happen?
   * 1) the form will be automagically submitted by the browser, or
   * 2) nothing.
   * And as you already suspected, the correct answer is: both! Firefox
   * opts for 1), Chrome for 2). Yay! */
  var event_got_cancelled;
  var submit_event = create_event('submit', {
    cancelable: true
  });
  /* force Firefox to not submit the form, then fake preventDefault() */

  submit_event.preventDefault();
  Object.defineProperty(submit_event, 'defaultPrevented', {
    value: false,
    writable: true
  });
  Object.defineProperty(submit_event, 'preventDefault', {
    value: function value() {
      return submit_event.defaultPrevented = event_got_cancelled = true;
    },
    writable: true
  });
  trigger_event(element.form, submit_event, {}, {
    submittedVia: element
  });

  if (!event_got_cancelled) {
    add_submit_field(element);
    window.HTMLFormElement.prototype.submit.call(element.form);
    window.setTimeout(function () {
      return remove_submit_field(element);
    });
  }
}
/**
 * if a submit button was clicked, add its name=value by means of a type=hidden
 * input field
 */


function add_submit_field(button) {
  if (['image', 'submit'].indexOf(button.type) > -1 && button.name) {
    var wrapper = get_wrapper(button.form) || {};
    var submit_helper = wrapper.submit_helper;

    if (submit_helper) {
      if (submit_helper.parentNode) {
        submit_helper.parentNode.removeChild(submit_helper);
      }
    } else {
      submit_helper = document.createElement('input');
      submit_helper.type = 'hidden';
      wrapper.submit_helper = submit_helper;
    }

    submit_helper.name = button.name;
    submit_helper.value = button.value;
    button.form.appendChild(submit_helper);
  }
}
/**
 * remove a possible helper input, that was added by `add_submit_field`
 */


function remove_submit_field(button) {
  if (['image', 'submit'].indexOf(button.type) > -1 && button.name) {
    var wrapper = get_wrapper(button.form) || {};
    var submit_helper = wrapper.submit_helper;

    if (submit_helper && submit_helper.parentNode) {
      submit_helper.parentNode.removeChild(submit_helper);
    }
  }
}
/**
 * check a form's validity and submit it
 *
 * The method triggers a cancellable `validate` event on the form. If the
 * event is cancelled, form submission will be aborted, too.
 *
 * If the form is found to contain invalid fields, focus the first field.
 */


function check$1(button) {
  /* trigger a "validate" event on the form to be submitted */
  var val_event = trigger_event(button.form, 'validate', {
    cancelable: true
  });

  if (val_event.defaultPrevented) {
    /* skip the whole submit thing, if the validation is canceled. A user
     * can still call form.submit() afterwards. */
    return;
  }

  var valid = true;
  var first_invalid;
  button.form.__hf_form_validation = true;
  get_validated_elements(button.form).map(function (element) {
    if (!reportValidity(element)) {
      valid = false;

      if (!first_invalid && 'focus' in element) {
        first_invalid = element;
      }
    }
  });
  delete button.form.__hf_form_validation;

  if (valid) {
    submit_form_via(button);
  } else if (first_invalid) {
    /* focus the first invalid element, if validation went south */
    first_invalid.focus();
    /* tell the tale, if anyone wants to react to it */

    trigger_event(button.form, 'forminvalid');
  }
}
/**
 * test if node is a submit button
 */


function is_submit_button(node) {
  return (
    /* must be an input or button element... */
    (node.nodeName === 'INPUT' || node.nodeName === 'BUTTON') && (
    /* ...and have a submitting type */
    node.type === 'image' || node.type === 'submit')
  );
}
/**
 * test, if the click event would trigger a submit
 */


function is_submitting_click(event, button) {
  return (
    /* prevented default: won't trigger a submit */
    !event.defaultPrevented && (
    /* left button or middle button (submits in Chrome) */
    !('button' in event) || event.button < 2) &&
    /* must be a submit button... */
    is_submit_button(button) &&
    /* the button needs a form, that's going to be submitted */
    button.form &&
    /* again, if the form should not be validated, we're out of the game */
    !button.form.hasAttribute('novalidate')
  );
}
/**
 * test, if the keypress event would trigger a submit
 */


function is_submitting_keypress(event) {
  return (
    /* prevented default: won't trigger a submit */
    !event.defaultPrevented && (
    /* ...and <Enter> was pressed... */
    event.keyCode === 13 &&
    /* ...on an <input> that is... */
    event.target.nodeName === 'INPUT' &&
    /* ...a standard text input field (not checkbox, ...) */
    text.indexOf(event.target.type) > -1 ||
    /* or <Enter> or <Space> was pressed... */
    (event.keyCode === 13 || event.keyCode === 32) &&
    /* ...on a submit button */
    is_submit_button(event.target)) &&
    /* there's a form... */
    event.target.form &&
    /* ...and the form allows validation */
    !event.target.form.hasAttribute('novalidate')
  );
}
/**
 * catch clicks to children of <button>s
 */


function get_clicked_button(element) {
  if (is_submit_button(element)) {
    return element;
  } else if (matches(element, 'button:not([type]) *, button[type="submit"] *')) {
    return get_clicked_button(element.parentNode);
  } else {
    return null;
  }
}
/**
 * return event handler to catch explicit submission by click on a button
 */


function get_click_handler() {
  var ignore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return function (event) {
    var button = get_clicked_button(event.target);

    if (button && is_submitting_click(event, button)) {
      event.preventDefault();

      if (ignore || button.hasAttribute('formnovalidate')) {
        /* if validation should be ignored, we're not interested in any checks */
        submit_form_via(button);
      } else {
        check$1(button);
      }
    }
  };
}

var click_handler = get_click_handler();
var ignored_click_handler = get_click_handler(true);
/**
 * catch implicit submission by pressing <Enter> in some situations
 */

function get_keypress_handler(ignore) {
  return function keypress_handler(event) {
    if (is_submitting_keypress(event)) {
      event.preventDefault();
      var wrapper = get_wrapper(event.target.form) || {
        settings: {}
      };

      if (wrapper.settings.preventImplicitSubmit) {
        /* user doesn't want an implicit submit. Cancel here. */
        return;
      }
      /* check, that there is no submit button in the form. Otherwise
      * that should be clicked. */


      var el = event.target.form.elements.length;
      var submit;

      for (var i = 0; i < el; i++) {
        if (['image', 'submit'].indexOf(event.target.form.elements[i].type) > -1) {
          submit = event.target.form.elements[i];
          break;
        }
      }
      /* trigger an "implicit_submit" event on the form to be submitted */


      var implicit_event = trigger_event(event.target.form, 'implicit_submit', {
        cancelable: true
      }, {
        trigger: event.target,
        submittedVia: submit || event.target
      });

      if (implicit_event.defaultPrevented) {
        /* skip the submit, if implicit submit is canceled */
        return;
      }

      if (submit) {
        submit.click();
      } else if (ignore) {
        submit_form_via(event.target);
      } else {
        check$1(event.target);
      }
    }
  };
}

var keypress_handler = get_keypress_handler();
var ignored_keypress_handler = get_keypress_handler(true);
/**
 * catch all relevant events _prior_ to a form being submitted
 *
 * @param bool ignore bypass validation, when an attempt to submit the
 *                    form is detected. True, when the wrapper's revalidate
 *                    setting is 'never'.
 */

function catch_submit(listening_node) {
  var ignore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (ignore) {
    listening_node.addEventListener('click', ignored_click_handler);
    listening_node.addEventListener('keypress', ignored_keypress_handler);
  } else {
    listening_node.addEventListener('click', click_handler);
    listening_node.addEventListener('keypress', keypress_handler);
  }
}
/**
 * decommission the event listeners from catch_submit() again
 */

function uncatch_submit(listening_node) {
  listening_node.removeEventListener('click', ignored_click_handler);
  listening_node.removeEventListener('keypress', ignored_keypress_handler);
  listening_node.removeEventListener('click', click_handler);
  listening_node.removeEventListener('keypress', keypress_handler);
}

/**
 * remove `property` from element and restore _original_property, if present
 */

function uninstall_property (element, property) {
  try {
    delete element[property];
  } catch (e) {
    /* Safari <= 9 and PhantomJS will end up here :-( Nothing to do except
     * warning */
    var wrapper = get_wrapper(element);

    if (wrapper && wrapper.settings.debug) {
      /* global console */
      console.log('[hyperform] cannot uninstall custom property ' + property);
    }

    return false;
  }

  var original_descriptor = Object.getOwnPropertyDescriptor(element, '_original_' + property);

  if (original_descriptor) {
    Object.defineProperty(element, property, original_descriptor);
  }
}

/**
 * add `property` to an element
 *
 * ATTENTION! This function will search for an equally named property on the
 * *prototype* of an element, if element is a concrete DOM node. Do not use
 * it as general-purpose property installer.
 *
 * js> installer(element, 'foo', { value: 'bar' });
 * js> assert(element.foo === 'bar');
 */

function install_property (element, property, descriptor) {
  descriptor.configurable = true;
  descriptor.enumerable = true;

  if ('value' in descriptor) {
    descriptor.writable = true;
  }
  /* on concrete instances, i.e., <input> elements, the naive lookup
   * yields undefined. We have to look on its prototype then. On elements
   * like the actual HTMLInputElement object the first line works. */


  var original_descriptor = Object.getOwnPropertyDescriptor(element, property);

  if (original_descriptor === undefined) {
    original_descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), property);
  }

  if (original_descriptor) {
    if (original_descriptor.configurable === false) {
      /* Safari <= 9 and PhantomJS will end up here :-( Nothing to do except
       * warning */
      var wrapper = get_wrapper(element);

      if (wrapper && wrapper.settings.debug) {
        /* global console */
        console.log('[hyperform] cannot install custom property ' + property);
      }

      return false;
    }
    /* we already installed that property... */


    if (original_descriptor.get && original_descriptor.get.__hyperform || original_descriptor.value && original_descriptor.value.__hyperform) {
      return;
    }
    /* publish existing property under new name, if it's not from us */


    Object.defineProperty(element, '_original_' + property, original_descriptor);
  }

  delete element[property];
  Object.defineProperty(element, property, descriptor);
  return true;
}

function is_field (element) {
  return element instanceof window.HTMLButtonElement || element instanceof window.HTMLInputElement || element instanceof window.HTMLSelectElement || element instanceof window.HTMLTextAreaElement || element instanceof window.HTMLFieldSetElement || element === window.HTMLButtonElement.prototype || element === window.HTMLInputElement.prototype || element === window.HTMLSelectElement.prototype || element === window.HTMLTextAreaElement.prototype || element === window.HTMLFieldSetElement.prototype;
}

/**
 * set a custom validity message or delete it with an empty string
 */

function setCustomValidity(element, msg) {
  if (!msg) {
    message_store["delete"](element, true);
  } else {
    message_store.set(element, msg, true);
  }
  /* live-update the warning */


  var warning = Renderer.getWarning(element);

  if (warning) {
    Renderer.setMessage(warning, msg, element);
  }
  /* update any classes if the validity state changes */


  validity_state_checkers.valid(element);
}

/**
 * implement the valueAsDate functionality
 *
 * @see https://html.spec.whatwg.org/multipage/forms.html#dom-input-valueasdate
 */

function valueAsDate(element) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var type = get_type(element);

  if (dates.indexOf(type) > -1) {
    if (value !== undefined) {
      /* setter: value must be null or a Date() */
      if (value === null) {
        element.value = '';
      } else if (value instanceof Date) {
        if (isNaN(value.getTime())) {
          element.value = '';
        } else {
          element.value = date_to_string(value, type);
        }
      } else {
        throw new window.DOMException('valueAsDate setter encountered invalid value', 'TypeError');
      }

      return;
    }

    var value_date = string_to_date(element.value, type);
    return value_date instanceof Date ? value_date : null;
  } else if (value !== undefined) {
    /* trying to set a date on a not-date input fails */
    throw new window.DOMException('valueAsDate setter cannot set date on this element', 'InvalidStateError');
  }

  return null;
}

/**
 * implement the valueAsNumber functionality
 *
 * @see https://html.spec.whatwg.org/multipage/forms.html#dom-input-valueasnumber
 */

function valueAsNumber(element) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  var type = get_type(element);

  if (numbers.indexOf(type) > -1) {
    if (type === 'range' && element.hasAttribute('multiple')) {
      /* @see https://html.spec.whatwg.org/multipage/forms.html#do-not-apply */
      return NaN;
    }

    if (value !== undefined) {
      /* setter: value must be NaN or a finite number */
      if (isNaN(value)) {
        element.value = '';
      } else if (typeof value === 'number' && window.isFinite(value)) {
        try {
          /* try setting as a date, but... */
          valueAsDate(element, new Date(value));
        } catch (e) {
          /* ... when valueAsDate is not responsible, ... */
          if (!(e instanceof window.DOMException)) {
            throw e;
          }
          /* ... set it via Number.toString(). */


          element.value = value.toString();
        }
      } else {
        throw new window.DOMException('valueAsNumber setter encountered invalid value', 'TypeError');
      }

      return;
    }

    return string_to_number(element.value, type);
  } else if (value !== undefined) {
    /* trying to set a number on a not-number input fails */
    throw new window.DOMException('valueAsNumber setter cannot set number on this element', 'InvalidStateError');
  }

  return NaN;
}

/**
 *
 */

function stepDown(element) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (numbers.indexOf(get_type(element)) === -1) {
    throw new window.DOMException('stepDown encountered invalid type', 'InvalidStateError');
  }

  if ((element.getAttribute('step') || '').toLowerCase() === 'any') {
    throw new window.DOMException('stepDown encountered step "any"', 'InvalidStateError');
  }

  var prev = get_next_valid(element, n)[0];

  if (prev !== null) {
    valueAsNumber(element, prev);
  }
}

/**
 *
 */

function stepUp(element) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (numbers.indexOf(get_type(element)) === -1) {
    throw new window.DOMException('stepUp encountered invalid type', 'InvalidStateError');
  }

  if ((element.getAttribute('step') || '').toLowerCase() === 'any') {
    throw new window.DOMException('stepUp encountered step "any"', 'InvalidStateError');
  }

  var next = get_next_valid(element, n)[1];

  if (next !== null) {
    valueAsNumber(element, next);
  }
}

/**
 * get the validation message for an element, empty string, if the element
 * satisfies all constraints.
 */

function validationMessage(element) {
  var msg = message_store.get(element);

  if (!msg) {
    return '';
  }
  /* make it a primitive again, since message_store returns String(). */


  return msg.toString();
}

/**
 * check, if an element will be subject to HTML5 validation at all
 */

function willValidate(element) {
  return is_validation_candidate(element);
}

var gA = function gA(prop) {
  return function () {
    return do_filter('attr_get_' + prop, this.getAttribute(prop), this);
  };
};

var sA = function sA(prop) {
  return function (value) {
    this.setAttribute(prop, do_filter('attr_set_' + prop, value, this));
  };
};

var gAb = function gAb(prop) {
  return function () {
    return do_filter('attr_get_' + prop, this.hasAttribute(prop), this);
  };
};

var sAb = function sAb(prop) {
  return function (value) {
    if (do_filter('attr_set_' + prop, value, this)) {
      this.setAttribute(prop, prop);
    } else {
      this.removeAttribute(prop);
    }
  };
};

var gAn = function gAn(prop) {
  return function () {
    return do_filter('attr_get_' + prop, Math.max(0, Number(this.getAttribute(prop))), this);
  };
};

var sAn = function sAn(prop) {
  return function (value) {
    value = do_filter('attr_set_' + prop, value, this);

    if (/^[0-9]+$/.test(value)) {
      this.setAttribute(prop, value);
    }
  };
};

function install_properties(element) {
  for (var _i = 0, _arr = ['accept', 'max', 'min', 'pattern', 'placeholder', 'step']; _i < _arr.length; _i++) {
    var prop = _arr[_i];
    install_property(element, prop, {
      get: gA(prop),
      set: sA(prop)
    });
  }

  for (var _i2 = 0, _arr2 = ['multiple', 'required', 'readOnly']; _i2 < _arr2.length; _i2++) {
    var _prop = _arr2[_i2];
    install_property(element, _prop, {
      get: gAb(_prop.toLowerCase()),
      set: sAb(_prop.toLowerCase())
    });
  }

  for (var _i3 = 0, _arr3 = ['minLength', 'maxLength']; _i3 < _arr3.length; _i3++) {
    var _prop2 = _arr3[_i3];
    install_property(element, _prop2, {
      get: gAn(_prop2.toLowerCase()),
      set: sAn(_prop2.toLowerCase())
    });
  }
}

function uninstall_properties(element) {
  for (var _i4 = 0, _arr4 = ['accept', 'max', 'min', 'pattern', 'placeholder', 'step', 'multiple', 'required', 'readOnly', 'minLength', 'maxLength']; _i4 < _arr4.length; _i4++) {
    var prop = _arr4[_i4];
    uninstall_property(element, prop);
  }
}

var polyfills = {
  checkValidity: {
    value: mark(function () {
      return checkValidity(this);
    })
  },
  reportValidity: {
    value: mark(function () {
      return reportValidity(this);
    })
  },
  setCustomValidity: {
    value: mark(function (msg) {
      return setCustomValidity(this, msg);
    })
  },
  stepDown: {
    value: mark(function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return stepDown(this, n);
    })
  },
  stepUp: {
    value: mark(function () {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return stepUp(this, n);
    })
  },
  validationMessage: {
    get: mark(function () {
      return validationMessage(this);
    })
  },
  validity: {
    get: mark(function () {
      return ValidityState(this);
    })
  },
  valueAsDate: {
    get: mark(function () {
      return valueAsDate(this);
    }),
    set: mark(function (value) {
      valueAsDate(this, value);
    })
  },
  valueAsNumber: {
    get: mark(function () {
      return valueAsNumber(this);
    }),
    set: mark(function (value) {
      valueAsNumber(this, value);
    })
  },
  willValidate: {
    get: mark(function () {
      return willValidate(this);
    })
  }
};
function polyfill (element) {
  if (is_field(element)) {
    for (var prop in polyfills) {
      install_property(element, prop, polyfills[prop]);
    }

    install_properties(element);
  } else if (element instanceof window.HTMLFormElement || element === window.HTMLFormElement.prototype) {
    install_property(element, 'checkValidity', polyfills.checkValidity);
    install_property(element, 'reportValidity', polyfills.reportValidity);
  }
}

function polyunfill (element) {
  if (is_field(element)) {
    uninstall_property(element, 'checkValidity');
    uninstall_property(element, 'reportValidity');
    uninstall_property(element, 'setCustomValidity');
    uninstall_property(element, 'stepDown');
    uninstall_property(element, 'stepUp');
    uninstall_property(element, 'validationMessage');
    uninstall_property(element, 'validity');
    uninstall_property(element, 'valueAsDate');
    uninstall_property(element, 'valueAsNumber');
    uninstall_property(element, 'willValidate');
    uninstall_properties(element);
  } else if (element instanceof window.HTMLFormElement) {
    uninstall_property(element, 'checkValidity');
    uninstall_property(element, 'reportValidity');
  }
}

var instances = new WeakMap();
/**
 * wrap <form>s, window or document, that get treated with the global
 * hyperform()
 */

function Wrapper(form, settings) {
  /* do not allow more than one instance per form. Otherwise we'd end
   * up with double event handlers, polyfills re-applied, ... */
  var existing = instances.get(form);

  if (existing) {
    existing.settings = settings;
    return existing;
  }

  this.form = form;
  this.settings = settings;
  this.revalidator = this.revalidate.bind(this);
  instances.set(form, this);
  catch_submit(form, settings.revalidate === 'never');

  if (form === window || form.nodeType === 9) {
    /* install on the prototypes, when called for the whole document */
    this.install([window.HTMLButtonElement.prototype, window.HTMLInputElement.prototype, window.HTMLSelectElement.prototype, window.HTMLTextAreaElement.prototype, window.HTMLFieldSetElement.prototype]);
    polyfill(window.HTMLFormElement);
  } else if (form instanceof window.HTMLFormElement || form instanceof window.HTMLFieldSetElement) {
    this.install(form.elements);

    if (form instanceof window.HTMLFormElement) {
      polyfill(form);
    }
  }

  if (settings.revalidate === 'oninput' || settings.revalidate === 'hybrid') {
    /* in a perfect world we'd just bind to "input", but support here is
     * abysmal: http://caniuse.com/#feat=input-event */
    form.addEventListener('keyup', this.revalidator);
    form.addEventListener('change', this.revalidator);
  }

  if (settings.revalidate === 'onblur' || settings.revalidate === 'hybrid') {
    /* useCapture=true, because `blur` doesn't bubble. See
     * https://developer.mozilla.org/en-US/docs/Web/Events/blur#Event_delegation
     * for a discussion */
    form.addEventListener('blur', this.revalidator, true);
  }
}
Wrapper.prototype = {
  destroy: function destroy() {
    uncatch_submit(this.form);
    instances["delete"](this.form);
    this.form.removeEventListener('keyup', this.revalidator);
    this.form.removeEventListener('change', this.revalidator);
    this.form.removeEventListener('blur', this.revalidator, true);

    if (this.form === window || this.form.nodeType === 9) {
      this.uninstall([window.HTMLButtonElement.prototype, window.HTMLInputElement.prototype, window.HTMLSelectElement.prototype, window.HTMLTextAreaElement.prototype, window.HTMLFieldSetElement.prototype]);
      polyunfill(window.HTMLFormElement);
    } else if (this.form instanceof window.HTMLFormElement || this.form instanceof window.HTMLFieldSetElement) {
      this.uninstall(this.form.elements);

      if (this.form instanceof window.HTMLFormElement) {
        polyunfill(this.form);
      }
    }
  },

  /**
   * revalidate an input element
   */
  revalidate: function revalidate(event) {
    if (event.target instanceof window.HTMLButtonElement || event.target instanceof window.HTMLTextAreaElement || event.target instanceof window.HTMLSelectElement || event.target instanceof window.HTMLInputElement) {
      if (event.target.form && event.target.form.hasAttribute('novalidate')) {
        /* do nothing, if the form forbids it. This still allows manual
         * validation via, e.g., input.reportValidity(), but mirrors browser
         * behavior, that are also completely silent in this case. */
        return;
      }

      if (this.settings.revalidate === 'hybrid') {
        /* "hybrid" somewhat simulates what browsers do. See for example
         * Firefox's :-moz-ui-invalid pseudo-class:
         * https://developer.mozilla.org/en-US/docs/Web/CSS/:-moz-ui-invalid */
        if (event.type === 'blur' && event.target.value !== event.target.defaultValue || ValidityState(event.target).valid) {
          /* on blur, update the report when the value has changed from the
           * default or when the element is valid (possibly removing a still
           * standing invalidity report). */
          reportValidity(event.target);
        } else if (event.type === 'keyup' && event.keyCode !== 9 || event.type === 'change') {
          if (ValidityState(event.target).valid) {
            // report instantly, when an element becomes valid,
            // postpone report to blur event, when an element is invalid
            reportValidity(event.target);
          }
        }
      } else if (event.type !== 'keyup' || event.keyCode !== 9) {
        /* do _not_ validate, when the user "tabbed" into the field initially,
         * i.e., a keyup event with keyCode 9 */
        reportValidity(event.target);
      }
    }
  },

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
  install: function install(els) {
    if (els instanceof window.Element) {
      els = [els];
    }

    var els_length = els.length;

    for (var i = 0; i < els_length; i++) {
      polyfill(els[i]);
    }
  },
  uninstall: function uninstall(els) {
    if (els instanceof window.Element) {
      els = [els];
    }

    var els_length = els.length;

    for (var i = 0; i < els_length; i++) {
      polyunfill(els[i]);
    }
  }
};
/**
 * try to get the appropriate wrapper for a specific element by looking up
 * its parent chain
 *
 * @return Wrapper | undefined
 */

function get_wrapper(element) {
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

/**
 * filter a form's elements for the ones needing validation prior to
 * a submit
 *
 * Returns an array of form elements.
 */

function get_validated_elements(form) {
  var wrapped_form = get_wrapper(form);
  return Array.prototype.filter.call(form.elements, function (element) {
    /* it must have a name (or validating nameless inputs is allowed) */
    if (element.getAttribute('name') || wrapped_form && wrapped_form.settings.validateNameless) {
      return true;
    }

    return false;
  });
}

/**
 * return either the data of a hook call or the result of action, if the
 * former is undefined
 *
 * @return function a function wrapper around action
 */

function return_hook_or (hook, action) {
  return function () {
    var data = call_hook(hook, Array.prototype.slice.call(arguments));

    if (data !== undefined) {
      return data;
    }

    return action.apply(this, arguments);
  };
}

/**
 * check an element's validity with respect to it's form
 */

var checkValidity = return_hook_or('checkValidity', function (element) {
  /* if this is a <form>, check validity of all child inputs */
  if (element instanceof window.HTMLFormElement) {
    return get_validated_elements(element).map(checkValidity).every(function (b) {
      return b;
    });
  }
  /* default is true, also for elements that are no validation candidates */


  var valid = ValidityState(element).valid;

  if (valid) {
    var wrapped_form = get_wrapper(element);

    if (wrapped_form && wrapped_form.settings.validEvent) {
      trigger_event(element, 'valid');
    }
  } else {
    trigger_event(element, 'invalid', {
      cancelable: true
    });
  }

  return valid;
});

var version = '0.11.0';

/**
 * public hyperform interface:
 */

function hyperform(form) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      classes = _ref.classes,
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? false : _ref$debug,
      extendFieldset = _ref.extendFieldset,
      novalidateOnElements = _ref.novalidateOnElements,
      _ref$preventImplicitS = _ref.preventImplicitSubmit,
      preventImplicitSubmit = _ref$preventImplicitS === void 0 ? false : _ref$preventImplicitS,
      revalidate = _ref.revalidate,
      _ref$strict = _ref.strict,
      strict = _ref$strict === void 0 ? false : _ref$strict,
      validEvent = _ref.validEvent,
      _ref$validateNameless = _ref.validateNameless,
      validateNameless = _ref$validateNameless === void 0 ? false : _ref$validateNameless;

  if (!classes) {
    classes = {};
  } // TODO: clean up before next non-patch release


  if (extendFieldset === undefined) {
    extendFieldset = !strict;
  }

  if (novalidateOnElements === undefined) {
    novalidateOnElements = !strict;
  }

  if (preventImplicitSubmit === undefined) {
    preventImplicitSubmit = false;
  }

  if (revalidate === undefined) {
    /* other recognized values: 'oninput', 'onblur', 'onsubmit' and 'never' */
    revalidate = strict ? 'onsubmit' : 'hybrid';
  }

  if (validEvent === undefined) {
    validEvent = !strict;
  }

  var settings = {
    debug: debug,
    strict: strict,
    preventImplicitSubmit: preventImplicitSubmit,
    revalidate: revalidate,
    validEvent: validEvent,
    extendFieldset: extendFieldset,
    classes: classes,
    novalidateOnElements: novalidateOnElements,
    validateNameless: validateNameless
  };

  if (form instanceof window.NodeList || form instanceof window.HTMLCollection || form instanceof Array) {
    return Array.prototype.map.call(form, function (element) {
      return hyperform(element, settings);
    });
  }

  return new Wrapper(form, settings);
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

hyperform.setLanguage = function (lang) {
  set_language(lang);
  return hyperform;
};

hyperform.addTranslation = function (lang, catalog) {
  add_translation(lang, catalog);
  return hyperform;
};

hyperform.setRenderer = function (renderer, action) {
  Renderer.set(renderer, action);
  return hyperform;
};

hyperform.addValidator = function (element, validator) {
  custom_validator_registry.set(element, validator);
  return hyperform;
};

hyperform.setMessage = function (element, validator, message) {
  custom_messages.set(element, validator, message);
  return hyperform;
};

hyperform.addHook = function (hook, action, position) {
  add_hook(hook, action, position);
  return hyperform;
};

hyperform.removeHook = function (hook, action) {
  remove_hook(hook, action);
  return hyperform;
};

if (document.currentScript && document.currentScript.hasAttribute('data-hf-autoload')) {
  hyperform(window);
}

module.exports = hyperform;
