"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = usePlatformMethods;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _UIManager = _interopRequireDefault(require("../../exports/UIManager"));

var _createDOMProps = _interopRequireDefault(require("../createDOMProps"));

var _useStable = _interopRequireDefault(require("../useStable"));

var _react = require("react");

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var didWarn = false;
var emptyObject = {};

function setNativeProps(node, nativeProps, pointerEvents, style, previousStyleRef) {
  if (!didWarn) {
    console.warn('setNativeProps is deprecated. Please update props using React state instead.');
    didWarn = true;
  }

  if (node != null && nativeProps) {
    var domProps = (0, _createDOMProps.default)(null, (0, _objectSpread2.default)((0, _objectSpread2.default)({
      pointerEvents
    }, nativeProps), {}, {
      style: [style, nativeProps.style]
    }));
    var nextDomStyle = domProps.style;

    if (previousStyleRef.current != null) {
      if (domProps.style == null) {
        domProps.style = {};
      }

      for (var styleName in previousStyleRef.current) {
        if (domProps.style[styleName] == null) {
          domProps.style[styleName] = '';
        }
      }
    }

    previousStyleRef.current = nextDomStyle;

    _UIManager.default.updateView(node, domProps);
  }
}
/**
 * Adds non-standard methods to the hode element. This is temporarily until an
 * API like `ReactNative.measure(hostRef, callback)` is added to React Native.
 */


function usePlatformMethods(_ref) {
  var pointerEvents = _ref.pointerEvents,
      style = _ref.style;
  var previousStyleRef = (0, _react.useRef)(null);
  var setNativePropsArgsRef = (0, _react.useRef)(null);
  setNativePropsArgsRef.current = {
    pointerEvents,
    style
  }; // Avoid creating a new ref on every render. The props only need to be
  // available to 'setNativeProps' when it is called.

  var ref = (0, _useStable.default)(() => hostNode => {
    if (hostNode != null) {
      hostNode.measure = callback => _UIManager.default.measure(hostNode, callback);

      hostNode.measureLayout = (relativeToNode, success, failure) => _UIManager.default.measureLayout(hostNode, relativeToNode, failure, success);

      hostNode.measureInWindow = callback => _UIManager.default.measureInWindow(hostNode, callback);

      hostNode.setNativeProps = nativeProps => {
        var _ref2 = setNativePropsArgsRef.current || emptyObject,
            style = _ref2.style,
            pointerEvents = _ref2.pointerEvents;

        setNativeProps(hostNode, nativeProps, pointerEvents, style, previousStyleRef);
      };
    }
  });
  return ref;
}

module.exports = exports.default;