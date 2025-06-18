"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _canUseDom = _interopRequireDefault(require("../../modules/canUseDom"));
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function ModalPortal(props) {
  var children = props.children;
  var elementRef = React.useRef(null);
  if (_canUseDom.default && !elementRef.current) {
    var element = document.createElement('div');
    if (element && document.body) {
      document.body.appendChild(element);
      elementRef.current = element;
    }
  }
  React.useEffect(() => {
    if (_canUseDom.default) {
      return () => {
        if (document.body && elementRef.current) {
          document.body.removeChild(elementRef.current);
          elementRef.current = null;
        }
      };
    }
  }, []);
  return elementRef.current && _canUseDom.default ? /*#__PURE__*/_reactDom.default.createPortal(children, elementRef.current) : null;
}
var _default = exports.default = ModalPortal;
module.exports = exports.default;