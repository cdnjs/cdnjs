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

function getSelectionString() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.getSelection().toString();
}

function makeOnKeyPress(maxLength) {
  return function onKeyPress(event) {
    var key = event.key,
        input = event.target;
    var value = input.value;
    var isNumberKey = !isNaN(parseInt(key, 10));
    var selection = getSelectionString();

    if (isNumberKey && (selection || value.length < maxLength)) {
      return;
    }

    event.preventDefault();
  };
}

function Input(_ref) {
  var ariaLabel = _ref.ariaLabel,
      autoFocus = _ref.autoFocus,
      className = _ref.className,
      disabled = _ref.disabled,
      itemRef = _ref.itemRef,
      max = _ref.max,
      min = _ref.min,
      name = _ref.name,
      nameForClass = _ref.nameForClass,
      onChange = _ref.onChange,
      onKeyDown = _ref.onKeyDown,
      _onKeyUp = _ref.onKeyUp,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? '--' : _ref$placeholder,
      required = _ref.required,
      showLeadingZeros = _ref.showLeadingZeros,
      step = _ref.step,
      value = _ref.value;
  var hasLeadingZero = showLeadingZeros && value !== null && value < 10;
  var maxLength = max.toString().length;
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
    min: min,
    name: name,
    onChange: onChange,
    onFocus: onFocus,
    onKeyDown: onKeyDown,
    onKeyPress: makeOnKeyPress(maxLength),
    onKeyUp: function onKeyUp(event) {
      (0, _updateInputWidth["default"])(event.target);

      if (_onKeyUp) {
        _onKeyUp(event);
      }
    },
    placeholder: placeholder,
    ref: function ref(_ref2) {
      if (_ref2) {
        (0, _updateInputWidth["default"])(_ref2);
        updateInputWidthOnFontLoad(_ref2);
      }

      if (itemRef) {
        itemRef(_ref2, name);
      }
    },
    required: required,
    step: step,
    type: "number",
    value: value !== null ? value : ''
  })];
}

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
  value: _propTypes["default"].number
};