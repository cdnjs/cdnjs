"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = renderApplication;
exports.getApplication = getApplication;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _AppContainer = _interopRequireDefault(require("./AppContainer"));
var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));
var _render = _interopRequireWildcard(require("../render"));
var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));
var _react = _interopRequireDefault(require("react"));
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function renderApplication(RootComponent, WrapperComponent, callback, options) {
  var shouldHydrate = options.hydrate,
    initialProps = options.initialProps,
    mode = options.mode,
    rootTag = options.rootTag;
  var renderFn = shouldHydrate ? mode === 'concurrent' ? _render.hydrate : _render.hydrateLegacy : mode === 'concurrent' ? _render.render : _render.default;
  (0, _invariant.default)(rootTag, 'Expect to have a valid rootTag, instead got ', rootTag);
  return renderFn( /*#__PURE__*/_react.default.createElement(_AppContainer.default, {
    WrapperComponent: WrapperComponent,
    ref: callback,
    rootTag: rootTag
  }, /*#__PURE__*/_react.default.createElement(RootComponent, initialProps)), rootTag);
}
function getApplication(RootComponent, initialProps, WrapperComponent) {
  var element = /*#__PURE__*/_react.default.createElement(_AppContainer.default, {
    WrapperComponent: WrapperComponent,
    rootTag: {}
  }, /*#__PURE__*/_react.default.createElement(RootComponent, initialProps));
  // Don't escape CSS text
  var getStyleElement = props => {
    var sheet = _StyleSheet.default.getSheet();
    return /*#__PURE__*/_react.default.createElement("style", (0, _extends2.default)({}, props, {
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