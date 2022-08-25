"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = AppContainer;

var React = _interopRequireWildcard(require("react"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _View = _interopRequireDefault(require("../View"));

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var RootTagContext = /*#__PURE__*/React.createContext(null);

function AppContainer(props) {
  var children = props.children,
      WrapperComponent = props.WrapperComponent;
  var innerView = /*#__PURE__*/React.createElement(_View.default, {
    children: children,
    key: 1,
    pointerEvents: "box-none",
    style: styles.appContainer
  });

  if (WrapperComponent) {
    innerView = /*#__PURE__*/React.createElement(WrapperComponent, null, innerView);
  }

  return /*#__PURE__*/React.createElement(RootTagContext.Provider, {
    value: props.rootTag
  }, /*#__PURE__*/React.createElement(_View.default, {
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