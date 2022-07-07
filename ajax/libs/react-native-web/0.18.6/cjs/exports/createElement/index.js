"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _AccessibilityUtil = _interopRequireDefault(require("../../modules/AccessibilityUtil"));

var _createDOMProps = _interopRequireDefault(require("../../modules/createDOMProps"));

var _react = _interopRequireDefault(require("react"));

var _useLocale = require("../../modules/useLocale");

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var createElement = (component, props, options) => {
  // Use equivalent platform elements where possible.
  var accessibilityComponent;

  if (component && component.constructor === String) {
    accessibilityComponent = _AccessibilityUtil.default.propsToAccessibilityComponent(props);
  }

  var Component = accessibilityComponent || component;
  var domProps = (0, _createDOMProps.default)(Component, props, options);

  var element = /*#__PURE__*/_react.default.createElement(Component, domProps); // Update locale context if element's writing direction prop changes


  var elementWithLocaleProvider = domProps.dir ? /*#__PURE__*/_react.default.createElement(_useLocale.LocaleProvider, {
    children: element,
    direction: domProps.dir,
    locale: domProps.lang
  }) : element;
  return elementWithLocaleProvider;
};

var _default = createElement;
exports.default = _default;
module.exports = exports.default;