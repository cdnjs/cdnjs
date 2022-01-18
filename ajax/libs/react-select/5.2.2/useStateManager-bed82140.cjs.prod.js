"use strict";

var index = require("./index-30b509fd.cjs.prod.js"), _slicedToArray = require("@babel/runtime/helpers/slicedToArray"), _objectWithoutProperties = require("@babel/runtime/helpers/objectWithoutProperties"), React = require("react");

function _interopDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var _slicedToArray__default = _interopDefault(_slicedToArray), _objectWithoutProperties__default = _interopDefault(_objectWithoutProperties), _excluded = [ "defaultInputValue", "defaultMenuIsOpen", "defaultValue", "inputValue", "menuIsOpen", "onChange", "onInputChange", "onMenuClose", "onMenuOpen", "value" ];

function useStateManager(_ref) {
  var _ref$defaultInputValu = _ref.defaultInputValue, defaultInputValue = void 0 === _ref$defaultInputValu ? "" : _ref$defaultInputValu, _ref$defaultMenuIsOpe = _ref.defaultMenuIsOpen, defaultMenuIsOpen = void 0 !== _ref$defaultMenuIsOpe && _ref$defaultMenuIsOpe, _ref$defaultValue = _ref.defaultValue, defaultValue = void 0 === _ref$defaultValue ? null : _ref$defaultValue, propsInputValue = _ref.inputValue, propsMenuIsOpen = _ref.menuIsOpen, propsOnChange = _ref.onChange, propsOnInputChange = _ref.onInputChange, propsOnMenuClose = _ref.onMenuClose, propsOnMenuOpen = _ref.onMenuOpen, propsValue = _ref.value, restSelectProps = _objectWithoutProperties__default.default(_ref, _excluded), _useState = React.useState(void 0 !== propsInputValue ? propsInputValue : defaultInputValue), _useState2 = _slicedToArray__default.default(_useState, 2), stateInputValue = _useState2[0], setStateInputValue = _useState2[1], _useState3 = React.useState(void 0 !== propsMenuIsOpen ? propsMenuIsOpen : defaultMenuIsOpen), _useState4 = _slicedToArray__default.default(_useState3, 2), stateMenuIsOpen = _useState4[0], setStateMenuIsOpen = _useState4[1], _useState5 = React.useState(void 0 !== propsValue ? propsValue : defaultValue), _useState6 = _slicedToArray__default.default(_useState5, 2), stateValue = _useState6[0], setStateValue = _useState6[1], onChange = React.useCallback((function(value, actionMeta) {
    "function" == typeof propsOnChange && propsOnChange(value, actionMeta), setStateValue(value);
  }), [ propsOnChange ]), onInputChange = React.useCallback((function(value, actionMeta) {
    var newValue;
    "function" == typeof propsOnInputChange && (newValue = propsOnInputChange(value, actionMeta)), 
    setStateInputValue(void 0 !== newValue ? newValue : value);
  }), [ propsOnInputChange ]), onMenuOpen = React.useCallback((function() {
    "function" == typeof propsOnMenuOpen && propsOnMenuOpen(), setStateMenuIsOpen(!0);
  }), [ propsOnMenuOpen ]), onMenuClose = React.useCallback((function() {
    "function" == typeof propsOnMenuClose && propsOnMenuClose(), setStateMenuIsOpen(!1);
  }), [ propsOnMenuClose ]), inputValue = void 0 !== propsInputValue ? propsInputValue : stateInputValue, menuIsOpen = void 0 !== propsMenuIsOpen ? propsMenuIsOpen : stateMenuIsOpen, value = void 0 !== propsValue ? propsValue : stateValue;
  return index._objectSpread2(index._objectSpread2({}, restSelectProps), {}, {
    inputValue: inputValue,
    menuIsOpen: menuIsOpen,
    onChange: onChange,
    onInputChange: onInputChange,
    onMenuClose: onMenuClose,
    onMenuOpen: onMenuOpen,
    value: value
  });
}

exports.useStateManager = useStateManager;
