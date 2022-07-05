"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.LocaleProvider = LocaleProvider;
exports.getLocaleDirection = getLocaleDirection;
exports.useLocaleContext = useLocaleContext;

var _react = _interopRequireWildcard(require("react"));

var _isLocaleRTL = require("./isLocaleRTL");

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const defaultLocale = {
  direction: 'ltr',
  locale: 'en-US'
};
const LocaleContext = /*#__PURE__*/(0, _react.createContext)(defaultLocale);

function getLocaleDirection(locale) {
  return (0, _isLocaleRTL.isLocaleRTL)(locale) ? 'rtl' : 'ltr';
}

function LocaleProvider(props) {
  const direction = props.direction,
        locale = props.locale,
        children = props.children;
  const needsContext = direction || locale;
  return needsContext ? /*#__PURE__*/_react.default.createElement(LocaleContext.Provider, {
    children: children,
    value: {
      direction: locale ? getLocaleDirection(locale) : direction,
      locale
    }
  }) : children;
}

function useLocaleContext() {
  return (0, _react.useContext)(LocaleContext);
}