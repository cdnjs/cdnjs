(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["notie"] = factory();
	else
		root["notie"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// ====================
// options
// ====================

var options = {
  alertTime: 3,
  dateMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  overlayClickDismiss: true,
  overlayOpacity: 0.75,
  transitionCurve: 'ease',
  transitionDuration: 0.3,
  transitionSelector: 'all',
  classes: {
    container: 'notie-container',
    textbox: 'notie-textbox',
    textboxInner: 'notie-textbox-inner',
    button: 'notie-button',
    element: 'notie-element',
    elementHalf: 'notie-element-half',
    elementThird: 'notie-element-third',
    overlay: 'notie-overlay',
    backgroundSuccess: 'notie-background-success',
    backgroundWarning: 'notie-background-warning',
    backgroundError: 'notie-background-error',
    backgroundInfo: 'notie-background-info',
    backgroundNeutral: 'notie-background-neutral',
    backgroundOverlay: 'notie-background-overlay',
    alert: 'notie-alert',
    inputField: 'notie-input-field',
    selectChoiceRepeated: 'notie-select-choice-repeated',
    dateSelectorInner: 'notie-date-selector-inner',
    dateSelectorUp: 'notie-date-selector-up'
  },
  ids: {
    overlay: 'notie-overlay'
  }
};

var setOptions = exports.setOptions = function setOptions(newOptions) {
  options = _extends({}, options, newOptions, {
    classes: _extends({}, options.classes, newOptions.classes),
    ids: _extends({}, options.ids, newOptions.ids)
  });
};

// ====================
// helpers
// ====================

var tick = function tick() {
  return new Promise(function (resolve) {
    return setTimeout(resolve, 0);
  });
};
var wait = function wait(time) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, time * 1000);
  });
};

var blur = function blur() {
  document.activeElement && document.activeElement.blur();
};

var generateRandomId = function generateRandomId() {
  // RFC4122 version 4 compliant UUID
  var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
  return 'notie-' + id;
};

var typeToClassLookup = {
  1: options.classes.backgroundSuccess,
  success: options.classes.backgroundSuccess,
  2: options.classes.backgroundWarning,
  warning: options.classes.backgroundWarning,
  3: options.classes.backgroundError,
  error: options.classes.backgroundError,
  4: options.classes.backgroundInfo,
  info: options.classes.backgroundInfo,
  5: options.classes.backgroundNeutral,
  neutral: options.classes.backgroundNeutral
};

var transitionFull = options.transitionSelector + ' ' + options.transitionDuration + 's ' + options.transitionCurve;

var enterClicked = function enterClicked(event) {
  return event.keyCode === 13;
};
var escapeClicked = function escapeClicked(event) {
  return event.keyCode === 27;
};

var addToDocument = function addToDocument(element) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  element.classList.add(options.classes.container);
  element.style[from] = '-10000px';
  document.body.appendChild(element);
  element.style[from] = '-' + element.offsetHeight + 'px';

  if (element.listener) window.addEventListener('keydown', element.listener);

  tick().then(function () {
    element.style.transition = transitionFull;
    element.style[from] = 0;
  });
};

var removeFromDocument = function removeFromDocument(id) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var element = document.getElementById(id);
  if (!element) return;
  element.style[from] = '-' + element.offsetHeight + 'px';

  if (element.listener) window.removeEventListener('keydown', element.listener);

  wait(options.transitionDuration).then(function () {
    if (element.parentNode) element.parentNode.removeChild(element);
  });
};

var addOverlayToDocument = function addOverlayToDocument(owner, from) {
  var element = document.createElement('div');
  element.id = options.ids.overlay;
  element.classList.add(options.classes.overlay);
  element.classList.add(options.classes.backgroundOverlay);
  element.style.opacity = 0;
  if (owner && options.overlayClickDismiss) {
    element.onclick = function () {
      removeFromDocument(owner.id, from);
      removeOverlayFromDocument();
    };
  }

  document.body.appendChild(element);

  tick().then(function () {
    element.style.transition = transitionFull;
    element.style.opacity = options.overlayOpacity;
  });
};

var removeOverlayFromDocument = function removeOverlayFromDocument() {
  var element = document.getElementById(options.ids.overlay);
  element.style.opacity = 0;
  wait(options.transitionDuration).then(function () {
    if (element.parentNode) element.parentNode.removeChild(element);
  });
};

var hideAlerts = exports.hideAlerts = function hideAlerts(callback) {
  var alertsShowing = document.getElementsByClassName(options.classes.alert);
  if (alertsShowing.length) {
    for (var i = 0; i < alertsShowing.length; i++) {
      var _alert = alertsShowing[i];
      removeFromDocument(_alert.id);
    }
    if (callback) wait(options.transitionDuration).then(function () {
      return callback();
    });
  }
};

// ====================
// exports
// ====================

var alert = exports.alert = function alert(_ref) {
  var _ref$type = _ref.type,
      type = _ref$type === undefined ? 4 : _ref$type,
      text = _ref.text,
      _ref$time = _ref.time,
      time = _ref$time === undefined ? options.alertTime : _ref$time,
      _ref$stay = _ref.stay,
      stay = _ref$stay === undefined ? false : _ref$stay;

  blur();
  hideAlerts();

  var element = document.createElement('div');
  var id = generateRandomId();
  element.id = id;
  element.classList.add(options.classes.textbox);
  element.classList.add(typeToClassLookup[type]);
  element.classList.add(options.classes.alert);
  element.innerHTML = '<div class="' + options.classes.textboxInner + '">' + text + '</div>';
  element.onclick = function () {
    return removeFromDocument(id);
  };

  element.listener = function (event) {
    if (enterClicked(event) || escapeClicked(event)) hideAlerts();
  };

  addToDocument(element);

  if (time && time < 1) time = 1;
  if (!stay && time) wait(time).then(function () {
    return removeFromDocument(id);
  });
};

var force = exports.force = function force(_ref2, callbackArg) {
  var _ref2$type = _ref2.type,
      type = _ref2$type === undefined ? 5 : _ref2$type,
      text = _ref2.text,
      _ref2$buttonText = _ref2.buttonText,
      buttonText = _ref2$buttonText === undefined ? 'OK' : _ref2$buttonText,
      callback = _ref2.callback;

  blur();
  hideAlerts();

  var element = document.createElement('div');
  var id = generateRandomId();
  element.id = id;

  var elementText = document.createElement('div');
  elementText.classList.add(options.classes.textbox);
  elementText.classList.add(options.classes.backgroundInfo);
  elementText.innerHTML = '<div class="' + options.classes.textboxInner + '">' + text + '</div>';

  var elementButton = document.createElement('div');
  elementButton.classList.add(options.classes.button);
  elementButton.classList.add(typeToClassLookup[type]);
  elementButton.innerHTML = buttonText;
  elementButton.onclick = function () {
    removeFromDocument(id);
    removeOverlayFromDocument();
    if (callback) callback();else if (callbackArg) callbackArg();
  };

  element.appendChild(elementText);
  element.appendChild(elementButton);

  element.listener = function (event) {
    if (enterClicked(event)) elementButton.click();
  };

  addToDocument(element);

  addOverlayToDocument();
};

var confirm = exports.confirm = function confirm(_ref3, submitCallbackArg, cancelCallbackArg) {
  var text = _ref3.text,
      _ref3$submitText = _ref3.submitText,
      submitText = _ref3$submitText === undefined ? 'Yes' : _ref3$submitText,
      _ref3$cancelText = _ref3.cancelText,
      cancelText = _ref3$cancelText === undefined ? 'Cancel' : _ref3$cancelText,
      submitCallback = _ref3.submitCallback,
      cancelCallback = _ref3.cancelCallback;

  blur();
  hideAlerts();

  var element = document.createElement('div');
  var id = generateRandomId();
  element.id = id;

  var elementText = document.createElement('div');
  elementText.classList.add(options.classes.textbox);
  elementText.classList.add(options.classes.backgroundInfo);
  elementText.innerHTML = '<div class="' + options.classes.textboxInner + '">' + text + '</div>';

  var elementButtonLeft = document.createElement('div');
  elementButtonLeft.classList.add(options.classes.button);
  elementButtonLeft.classList.add(options.classes.elementHalf);
  elementButtonLeft.classList.add(options.classes.backgroundSuccess);
  elementButtonLeft.innerHTML = submitText;
  elementButtonLeft.onclick = function () {
    removeFromDocument(id);
    removeOverlayFromDocument();
    if (submitCallback) submitCallback();else if (submitCallbackArg) submitCallbackArg();
  };

  var elementButtonRight = document.createElement('div');
  elementButtonRight.classList.add(options.classes.button);
  elementButtonRight.classList.add(options.classes.elementHalf);
  elementButtonRight.classList.add(options.classes.backgroundError);
  elementButtonRight.innerHTML = cancelText;
  elementButtonRight.onclick = function () {
    removeFromDocument(id);
    removeOverlayFromDocument();
    if (cancelCallback) cancelCallback();else if (cancelCallbackArg) cancelCallbackArg();
  };

  element.appendChild(elementText);
  element.appendChild(elementButtonLeft);
  element.appendChild(elementButtonRight);

  element.listener = function (event) {
    if (enterClicked(event)) elementButtonLeft.click();else if (escapeClicked(event)) elementButtonRight.click();
  };

  addToDocument(element);

  addOverlayToDocument(element);
};

var input = function input(_ref4, submitCallbackArg, cancelCallbackArg) {
  var text = _ref4.text,
      _ref4$submitText = _ref4.submitText,
      submitText = _ref4$submitText === undefined ? 'Submit' : _ref4$submitText,
      _ref4$cancelText = _ref4.cancelText,
      cancelText = _ref4$cancelText === undefined ? 'Cancel' : _ref4$cancelText,
      submitCallback = _ref4.submitCallback,
      cancelCallback = _ref4.cancelCallback,
      settings = _objectWithoutProperties(_ref4, ['text', 'submitText', 'cancelText', 'submitCallback', 'cancelCallback']);

  blur();
  hideAlerts();

  var element = document.createElement('div');
  var id = generateRandomId();
  element.id = id;

  var elementText = document.createElement('div');
  elementText.classList.add(options.classes.textbox);
  elementText.classList.add(options.classes.backgroundInfo);
  elementText.innerHTML = '<div class="' + options.classes.textboxInner + '">' + text + '</div>';

  var elementInput = document.createElement('input');
  elementInput.classList.add(options.classes.inputField);

  elementInput.setAttribute('autocapitalize', settings.autocapitalize || 'none');
  elementInput.setAttribute('autocomplete', settings.autocomplete || 'off');
  elementInput.setAttribute('autocorrect', settings.autocorrect || 'off');
  elementInput.setAttribute('autofocus', settings.autofocus || 'true');
  elementInput.setAttribute('inputmode', settings.inputmode || 'verbatim');
  elementInput.setAttribute('max', settings.max || '');
  elementInput.setAttribute('maxlength', settings.maxlength || '');
  elementInput.setAttribute('min', settings.min || '');
  elementInput.setAttribute('minlength', settings.minlength || '');
  elementInput.setAttribute('placeholder', settings.placeholder || '');
  elementInput.setAttribute('spellcheck', settings.spellcheck || 'default');
  elementInput.setAttribute('step', settings.step || 'any');
  elementInput.setAttribute('type', settings.type || 'text');

  elementInput.value = settings.value || '';

  // As-you-type input restrictions
  if (settings.allowed) {
    elementInput.oninput = function () {
      var regex = void 0;
      if (Array.isArray(settings.allowed)) {
        var regexString = '';
        var allowed = settings.allowed;
        for (var i = 0; i < allowed.length; i++) {
          if (allowed[i] === 'an') regexString += '0-9a-zA-Z';else if (allowed[i] === 'a') regexString += 'a-zA-Z';else if (allowed[i] === 'n') regexString += '0-9';
          if (allowed[i] === 's') regexString += ' ';
        }
        regex = new RegExp('[^' + regexString + ']', 'g');
      } else if (_typeof(settings.allowed) === 'object') {
        regex = settings.allowed;
      }
      elementInput.value = elementInput.value.replace(regex, '');
    };
  }

  var elementButtonLeft = document.createElement('div');
  elementButtonLeft.classList.add(options.classes.button);
  elementButtonLeft.classList.add(options.classes.elementHalf);
  elementButtonLeft.classList.add(options.classes.backgroundSuccess);
  elementButtonLeft.innerHTML = submitText;
  elementButtonLeft.onclick = function () {
    removeFromDocument(id);
    removeOverlayFromDocument();
    if (submitCallback) submitCallback(elementInput.value);else if (submitCallbackArg) submitCallbackArg(elementInput.value);
  };

  var elementButtonRight = document.createElement('div');
  elementButtonRight.classList.add(options.classes.button);
  elementButtonRight.classList.add(options.classes.elementHalf);
  elementButtonRight.classList.add(options.classes.backgroundError);
  elementButtonRight.innerHTML = cancelText;
  elementButtonRight.onclick = function () {
    removeFromDocument(id);
    removeOverlayFromDocument();
    if (cancelCallback) cancelCallback(elementInput.value);else if (cancelCallbackArg) cancelCallbackArg(elementInput.value);
  };

  element.appendChild(elementText);
  element.appendChild(elementInput);
  element.appendChild(elementButtonLeft);
  element.appendChild(elementButtonRight);

  element.listener = function (event) {
    if (enterClicked(event)) elementButtonLeft.click();else if (escapeClicked(event)) elementButtonRight.click();
  };

  addToDocument(element);

  elementInput.focus();

  addOverlayToDocument(element);
};

exports.input = input;
var select = exports.select = function select(_ref5, cancelCallbackArg) {
  var text = _ref5.text,
      _ref5$cancelText = _ref5.cancelText,
      cancelText = _ref5$cancelText === undefined ? 'Cancel' : _ref5$cancelText,
      cancelCallback = _ref5.cancelCallback,
      choices = _ref5.choices;

  blur();
  hideAlerts();

  var from = 'bottom';

  var element = document.createElement('div');
  var id = generateRandomId();
  element.id = id;

  var elementText = document.createElement('div');
  elementText.classList.add(options.classes.textbox);
  elementText.classList.add(options.classes.backgroundInfo);
  elementText.innerHTML = '<div class="' + options.classes.textboxInner + '">' + text + '</div>';

  element.appendChild(elementText);

  choices.forEach(function (_ref6, index) {
    var _ref6$type = _ref6.type,
        type = _ref6$type === undefined ? 1 : _ref6$type,
        text = _ref6.text,
        handler = _ref6.handler;

    var elementChoice = document.createElement('div');
    elementChoice.classList.add(typeToClassLookup[type]);
    elementChoice.classList.add(options.classes.button);
    elementChoice.classList.add(options.classes.selectChoice);

    var nextChoice = choices[index + 1];
    if (nextChoice && !nextChoice.type) nextChoice.type = 1;
    if (nextChoice && nextChoice.type === type) {
      elementChoice.classList.add(options.classes.selectChoiceRepeated);
    }

    elementChoice.innerHTML = text;
    elementChoice.onclick = function () {
      removeFromDocument(id, from);
      removeOverlayFromDocument();
      handler();
    };

    element.appendChild(elementChoice);
  });

  var elementCancel = document.createElement('div');
  elementCancel.classList.add(options.classes.backgroundNeutral);
  elementCancel.classList.add(options.classes.button);
  elementCancel.innerHTML = cancelText;
  elementCancel.onclick = function () {
    removeFromDocument(id, from);
    removeOverlayFromDocument();
    if (cancelCallback) cancelCallback();else if (cancelCallbackArg) cancelCallbackArg();
  };

  element.appendChild(elementCancel);

  element.listener = function (event) {
    if (escapeClicked(event)) elementCancel.click();
  };

  addToDocument(element, from);

  addOverlayToDocument(element, from);
};

var date = exports.date = function date(_ref7, submitCallbackArg, cancelCallbackArg) {
  var _ref7$value = _ref7.value,
      value = _ref7$value === undefined ? new Date() : _ref7$value,
      _ref7$submitText = _ref7.submitText,
      submitText = _ref7$submitText === undefined ? 'OK' : _ref7$submitText,
      _ref7$cancelText = _ref7.cancelText,
      cancelText = _ref7$cancelText === undefined ? 'Cancel' : _ref7$cancelText,
      submitCallback = _ref7.submitCallback,
      cancelCallback = _ref7.cancelCallback;

  blur();
  hideAlerts();

  var arrow = '&#9662';

  var element = document.createElement('div');
  var id = generateRandomId();
  element.id = id;

  var elementDateSelector = document.createElement('div');
  elementDateSelector.classList.add(options.classes.backgroundInfo);

  var elementDateSelectorInner = document.createElement('div');
  elementDateSelectorInner.classList.add(options.classes.dateSelectorInner);

  var elementDateUpMonth = document.createElement('div');
  elementDateUpMonth.classList.add(options.classes.button);
  elementDateUpMonth.classList.add(options.classes.elementThird);
  elementDateUpMonth.classList.add(options.classes.dateSelectorUp);
  elementDateUpMonth.innerHTML = arrow;

  var elementDateUpDay = document.createElement('div');
  elementDateUpDay.classList.add(options.classes.button);
  elementDateUpDay.classList.add(options.classes.elementThird);
  elementDateUpDay.classList.add(options.classes.dateSelectorUp);
  elementDateUpDay.innerHTML = arrow;

  var elementDateUpYear = document.createElement('div');
  elementDateUpYear.classList.add(options.classes.button);
  elementDateUpYear.classList.add(options.classes.elementThird);
  elementDateUpYear.classList.add(options.classes.dateSelectorUp);
  elementDateUpYear.innerHTML = arrow;

  var elementDateMonth = document.createElement('div');
  elementDateMonth.classList.add(options.classes.element);
  elementDateMonth.classList.add(options.classes.elementThird);
  elementDateMonth.innerHTML = options.dateMonths[value.getMonth()];

  var elementDateDay = document.createElement('div');
  elementDateDay.classList.add(options.classes.element);
  elementDateDay.classList.add(options.classes.elementThird);
  elementDateDay.innerHTML = value.getDate();

  var elementDateYear = document.createElement('div');
  elementDateYear.classList.add(options.classes.element);
  elementDateYear.classList.add(options.classes.elementThird);
  elementDateYear.innerHTML = value.getFullYear();

  var elementDateDownMonth = document.createElement('div');
  elementDateDownMonth.classList.add(options.classes.button);
  elementDateDownMonth.classList.add(options.classes.elementThird);
  elementDateDownMonth.innerHTML = arrow;

  var elementDateDownDay = document.createElement('div');
  elementDateDownDay.classList.add(options.classes.button);
  elementDateDownDay.classList.add(options.classes.elementThird);
  elementDateDownDay.innerHTML = arrow;

  var elementDateDownYear = document.createElement('div');
  elementDateDownYear.classList.add(options.classes.button);
  elementDateDownYear.classList.add(options.classes.elementThird);
  elementDateDownYear.innerHTML = arrow;

  var setValueHTML = function setValueHTML(date) {
    elementDateMonth.innerHTML = options.dateMonths[date.getMonth()];
    elementDateDay.innerHTML = date.getDate();
    elementDateYear.innerHTML = date.getFullYear();
  };

  elementDateUpMonth.onclick = function () {
    value.setMonth(value.getMonth() - 1);
    setValueHTML(value);
  };

  elementDateUpDay.onclick = function () {
    value.setDate(value.getDate() - 1);
    setValueHTML(value);
  };

  elementDateUpYear.onclick = function () {
    value.setFullYear(value.getFullYear() - 1);
    setValueHTML(value);
  };

  elementDateDownMonth.onclick = function () {
    value.setMonth(value.getMonth() + 1);
    setValueHTML(value);
  };

  elementDateDownDay.onclick = function () {
    value.setDate(value.getDate() + 1);
    setValueHTML(value);
  };

  elementDateDownYear.onclick = function () {
    value.setFullYear(value.getFullYear() + 1);
    setValueHTML(value);
  };

  var elementButtonLeft = document.createElement('div');
  elementButtonLeft.classList.add(options.classes.button);
  elementButtonLeft.classList.add(options.classes.elementHalf);
  elementButtonLeft.classList.add(options.classes.backgroundSuccess);
  elementButtonLeft.innerHTML = submitText;
  elementButtonLeft.onclick = function () {
    removeFromDocument(id);
    removeOverlayFromDocument();
    if (submitCallback) submitCallback(value);else if (submitCallbackArg) submitCallbackArg(value);
  };

  var elementButtonRight = document.createElement('div');
  elementButtonRight.classList.add(options.classes.button);
  elementButtonRight.classList.add(options.classes.elementHalf);
  elementButtonRight.classList.add(options.classes.backgroundError);
  elementButtonRight.innerHTML = cancelText;
  elementButtonRight.onclick = function () {
    removeFromDocument(id);
    removeOverlayFromDocument();
    if (cancelCallback) cancelCallback(value);else if (cancelCallbackArg) cancelCallbackArg(value);
  };

  elementDateSelectorInner.appendChild(elementDateUpMonth);
  elementDateSelectorInner.appendChild(elementDateUpDay);
  elementDateSelectorInner.appendChild(elementDateUpYear);
  elementDateSelectorInner.appendChild(elementDateMonth);
  elementDateSelectorInner.appendChild(elementDateDay);
  elementDateSelectorInner.appendChild(elementDateYear);
  elementDateSelectorInner.appendChild(elementDateDownMonth);
  elementDateSelectorInner.appendChild(elementDateDownDay);
  elementDateSelectorInner.appendChild(elementDateDownYear);
  elementDateSelector.appendChild(elementDateSelectorInner);
  element.appendChild(elementDateSelector);
  element.appendChild(elementButtonLeft);
  element.appendChild(elementButtonRight);

  element.listener = function (event) {
    if (enterClicked(event)) elementButtonLeft.click();else if (escapeClicked(event)) elementButtonRight.click();
  };

  addToDocument(element);

  addOverlayToDocument(element);
};

exports.default = {
  alert: alert,
  force: force,
  confirm: confirm,
  input: input,
  select: select,
  date: date,
  setOptions: setOptions,
  hideAlerts: hideAlerts
};

/***/ })
/******/ ]);
});