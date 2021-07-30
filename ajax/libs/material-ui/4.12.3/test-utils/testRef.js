"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = testRef;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var React = _interopRequireWildcard(require("react"));

var _chai = require("chai");

function assertDOMNode(node) {
  // duck typing a DOM node
  (0, _chai.expect)((0, _typeof2.default)(node.nodeName)).to.equal('string');
}
/**
 * Utility method to make assertions about the ref on an element
 * @param {React.ReactElement} element - The element should have a component wrapped
 *                                       in withStyles as the root
 * @param {function} mount - Should be returnvalue of createMount
 * @param {function} onRef - Callback, first arg is the ref.
 *                           Assert that the ref is a DOM node by default
 */


function testRef(element, mount) {
  var onRef = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : assertDOMNode;
  var ref = /*#__PURE__*/React.createRef();
  var wrapper = mount( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.cloneElement(element, {
    ref: ref
  })));
  onRef(ref.current, wrapper);
}