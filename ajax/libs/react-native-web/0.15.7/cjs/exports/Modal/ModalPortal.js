"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");

var _reactDom = _interopRequireDefault(require("react-dom"));

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
function ModalPortal(props) {
  var children = props.children;
  var elementRef = (0, _react.useRef)(null);

  if (_ExecutionEnvironment.canUseDOM && !elementRef.current) {
    var element = document.createElement('div');

    if (element && document.body) {
      document.body.appendChild(element);
      elementRef.current = element;
    }
  }

  (0, _react.useEffect)(function () {
    if (_ExecutionEnvironment.canUseDOM) {
      return function () {
        if (document.body && elementRef.current) {
          document.body.removeChild(elementRef.current);
          elementRef.current = null;
        }
      };
    }
  }, []);
  return elementRef.current && _ExecutionEnvironment.canUseDOM ? /*#__PURE__*/_reactDom.default.createPortal(children, elementRef.current) : null;
}

var _default = ModalPortal;
exports.default = _default;
module.exports = exports.default;