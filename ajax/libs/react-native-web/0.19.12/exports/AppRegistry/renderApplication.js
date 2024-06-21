import _extends from "@babel/runtime/helpers/extends";
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import AppContainer from './AppContainer';
import invariant from 'fbjs/lib/invariant';
import renderLegacy, { hydrateLegacy, render, hydrate } from '../render';
import StyleSheet from '../StyleSheet';
import React from 'react';
export default function renderApplication(RootComponent, WrapperComponent, callback, options) {
  var shouldHydrate = options.hydrate,
    initialProps = options.initialProps,
    mode = options.mode,
    rootTag = options.rootTag;
  var renderFn = shouldHydrate ? mode === 'concurrent' ? hydrate : hydrateLegacy : mode === 'concurrent' ? render : renderLegacy;
  invariant(rootTag, 'Expect to have a valid rootTag, instead got ', rootTag);
  return renderFn( /*#__PURE__*/React.createElement(AppContainer, {
    WrapperComponent: WrapperComponent,
    ref: callback,
    rootTag: rootTag
  }, /*#__PURE__*/React.createElement(RootComponent, initialProps)), rootTag);
}
export function getApplication(RootComponent, initialProps, WrapperComponent) {
  var element = /*#__PURE__*/React.createElement(AppContainer, {
    WrapperComponent: WrapperComponent,
    rootTag: {}
  }, /*#__PURE__*/React.createElement(RootComponent, initialProps));
  // Don't escape CSS text
  var getStyleElement = props => {
    var sheet = StyleSheet.getSheet();
    return /*#__PURE__*/React.createElement("style", _extends({}, props, {
      dangerouslySetInnerHTML: {
        __html: sheet.textContent
      },
      id: sheet.id
    }));
  };
  return {
    element,
    getStyleElement
  };
}