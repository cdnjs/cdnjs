import _typeof from "@babel/runtime/helpers/esm/typeof";
import * as React from 'react';
import { expect } from 'chai';

function assertDOMNode(node) {
  // duck typing a DOM node
  expect(_typeof(node.nodeName)).to.equal('string');
}
/**
 * Utility method to make assertions about the ref on an element
 * @param {React.ReactElement} element - The element should have a component wrapped
 *                                       in withStyles as the root
 * @param {function} mount - Should be returnvalue of createMount
 * @param {function} onRef - Callback, first arg is the ref.
 *                           Assert that the ref is a DOM node by default
 */


export default function testRef(element, mount) {
  var onRef = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : assertDOMNode;
  var ref = /*#__PURE__*/React.createRef();
  var wrapper = mount( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.cloneElement(element, {
    ref: ref
  })));
  onRef(ref.current, wrapper);
}