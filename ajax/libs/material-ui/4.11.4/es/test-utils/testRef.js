import * as React from 'react';
import { expect } from 'chai';

function assertDOMNode(node) {
  // duck typing a DOM node
  expect(typeof node.nodeName).to.equal('string');
}
/**
 * Utility method to make assertions about the ref on an element
 * @param {React.ReactElement} element - The element should have a component wrapped
 *                                       in withStyles as the root
 * @param {function} mount - Should be returnvalue of createMount
 * @param {function} onRef - Callback, first arg is the ref.
 *                           Assert that the ref is a DOM node by default
 */


export default function testRef(element, mount, onRef = assertDOMNode) {
  const ref = /*#__PURE__*/React.createRef();
  const wrapper = mount( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.cloneElement(element, {
    ref
  })));
  onRef(ref.current, wrapper);
}