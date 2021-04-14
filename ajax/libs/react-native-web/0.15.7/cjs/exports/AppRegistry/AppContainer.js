"use strict";

exports.__esModule = true;
exports.default = AppContainer;

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var RootTagContext = /*#__PURE__*/(0, _react.createContext)(null);

function AppContainer(props) {
  var children = props.children,
      WrapperComponent = props.WrapperComponent;

  var innerView = /*#__PURE__*/_react.default.createElement(_View.default, {
    children: children,
    key: 1,
    pointerEvents: "box-none",
    style: styles.appContainer
  });

  if (WrapperComponent) {
    innerView = /*#__PURE__*/_react.default.createElement(WrapperComponent, null, innerView);
  }

  return /*#__PURE__*/_react.default.createElement(RootTagContext.Provider, {
    value: props.rootTag
  }, /*#__PURE__*/_react.default.createElement(_View.default, {
    pointerEvents: "box-none",
    style: styles.appContainer
  }, innerView));
}

var styles = _StyleSheet.default.create({
  appContainer: {
    flex: 1
  }
});

module.exports = exports.default;