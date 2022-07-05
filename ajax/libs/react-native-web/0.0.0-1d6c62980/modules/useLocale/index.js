/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import React, { createContext, useContext } from 'react';
import { isLocaleRTL } from './isLocaleRTL';
const defaultLocale = {
  direction: 'ltr',
  locale: 'en-US'
};
const LocaleContext = /*#__PURE__*/createContext(defaultLocale);
export function getLocaleDirection(locale) {
  return isLocaleRTL(locale) ? 'rtl' : 'ltr';
}
export function LocaleProvider(props) {
  const direction = props.direction,
        locale = props.locale,
        children = props.children;
  const needsContext = direction || locale;
  return needsContext ? /*#__PURE__*/React.createElement(LocaleContext.Provider, {
    children: children,
    value: {
      direction: locale ? getLocaleDirection(locale) : direction,
      locale
    }
  }) : children;
}
export function useLocaleContext() {
  return useContext(LocaleContext);
}