"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Input;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mergeClassNames = _interopRequireDefault(require("merge-class-names"));

var _updateInputWidth = _interopRequireWildcard(require("update-input-width"));

var _predictInputValue = _interopRequireDefault(require("@wojtekmaj/predict-input-value"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable jsx-a11y/no-autofocus */
var isEdgeLegacy = typeof window !== 'undefined' && 'navigator' in window && navigator.userAgent.match(/ Edge\/1/);

function onFocus(event) {
  var target = event.target;

  if (isEdgeLegacy) {
    requestAnimationFrame(function () {
      return target.select();
    });
  } else {
    target.select();
  }
}

function updateInputWidthOnFontLoad(element) {
  if (!document.fonts) {
    return;
  }

  var font = (0, _updateInputWidth.getFontShorthand)(element);

  if (!font) {
    return;
  }

  var isFontLoaded = document.fonts.check(font);

  if (isFontLoaded) {
    return;
  }

  function onLoadingDone() {
    (0, _updateInputWidth["default"])(element);
  }

  document.fonts.addEventListener('loadingdone', onLoadingDone);
}

function addLeadingZero(value, max) {
  return "0".concat(value).slice(-"".concat(max).length);
}

function makeOnKeyDown(_ref) {
  var max = _ref.max,
      min = _ref.min,
      onChange = _ref.onChange,
      showLeadingZeros = _ref.showLeadingZeros;
  return function onKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        {
          event.preventDefault();
          var input = event.target;
          var value = input.value;
          var numericValue = Number(value);
          var rawNextValue = numericValue + (event.key === 'ArrowUp' ? 1 : -1);
          var limitedRawNextValue = Math.min(max, Math.max(min, rawNextValue));
          var hasLeadingZero = showLeadingZeros && limitedRawNextValue < 10;
          var nextValue = hasLeadingZero ? addLeadingZero(limitedRawNextValue, max) : limitedRawNextValue;
          input.value = nextValue;
          onChange(event);
          break;
        }

      default:
    }
  };
}

function makeOnKeyPress(max) {
  return function onKeyPress(event) {
    var key = event.key;
    var isNumberKey = !isNaN(parseInt(key, 10));
    var nextValue = (0, _predictInputValue["default"])(event);

    if (isNumberKey && nextValue <= max) {
      return;
    }

    event.preventDefault();
  };
}

function Input(_ref2) {
  var ariaLabel = _ref2.ariaLabel,
      autoFocus = _ref2.autoFocus,
      className = _ref2.className,
      disabled = _ref2.disabled,
      itemRef = _ref2.itemRef,
      max = _ref2.max,
      min = _ref2.min,
      name = _ref2.name,
      nameForClass = _ref2.nameForClass,
      onChange = _ref2.onChange,
      _onKeyDown = _ref2.onKeyDown,
      _onKeyUp = _ref2.onKeyUp,
      _ref2$placeholder = _ref2.placeholder,
      placeholder = _ref2$placeholder === void 0 ? '--' : _ref2$placeholder,
      required = _ref2.required,
      showLeadingZeros = _ref2.showLeadingZeros,
      step = _ref2.step,
      value = _ref2.value;
  var hasLeadingZero = showLeadingZeros && value !== null && value !== undefined && value.toString().length < 2;
  var onKeyDownInternal = makeOnKeyDown({
    max: max,
    min: min,
    onChange: onChange,
    showLeadingZeros: showLeadingZeros
  });
  var onKeyPressInternal = makeOnKeyPress(max);
  return [hasLeadingZero && /*#__PURE__*/_react["default"].createElement("span", {
    key: "leadingZero",
    className: "".concat(className, "__leadingZero")
  }, "0"), /*#__PURE__*/_react["default"].createElement("input", {
    key: "input",
    "aria-label": ariaLabel,
    autoComplete: "off",
    autoFocus: autoFocus,
    className: (0, _mergeClassNames["default"])("".concat(className, "__input"), "".concat(className, "__").concat(nameForClass || name), hasLeadingZero && "".concat(className, "__input--hasLeadingZero")),
    "data-input": "true",
    disabled: disabled,
    inputMode: "numeric",
    max: max,
    maxLength: "".concat(max).length,
    min: min,
    name: name,
    onChange: onChange,
    onFocus: onFocus,
    onKeyDown: function onKeyDown(event) {
      onKeyDownInternal(event);

      if (_onKeyDown) {
        _onKeyDown(event);
      }
    },
    onKeyPress: onKeyPressInternal,
    onKeyUp: function onKeyUp(event) {
      (0, _updateInputWidth["default"])(event.target);

      if (_onKeyUp) {
        _onKeyUp(event);
      }
    },
    placeholder: placeholder,
    ref: function ref(_ref3) {
      if (_ref3) {
        (0, _updateInputWidth["default"])(_ref3);
        updateInputWidthOnFontLoad(_ref3);
      }

      if (itemRef) {
        itemRef(_ref3, name);
      }
    },
    required: required,
    step: step,
    type: "text",
    value: value !== null ? value : ''
  })];
}

var isValue = _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]);

Input.propTypes = {
  ariaLabel: _propTypes["default"].string,
  autoFocus: _propTypes["default"].bool,
  className: _propTypes["default"].string.isRequired,
  disabled: _propTypes["default"].bool,
  itemRef: _propTypes["default"].func,
  max: _propTypes["default"].number,
  min: _propTypes["default"].number,
  name: _propTypes["default"].string,
  nameForClass: _propTypes["default"].string,
  onChange: _propTypes["default"].func,
  onKeyDown: _propTypes["default"].func,
  onKeyUp: _propTypes["default"].func,
  placeholder: _propTypes["default"].string,
  required: _propTypes["default"].bool,
  showLeadingZeros: _propTypes["default"].bool,
  step: _propTypes["default"].number,
  value: isValue
};