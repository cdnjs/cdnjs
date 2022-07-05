"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _getBoundingClientRect = _interopRequireDefault(require("../../modules/getBoundingClientRect"));

var _setValueForStyles = _interopRequireDefault(require("../../modules/setValueForStyles"));

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const getRect = node => {
  // Unlike the DOM's getBoundingClientRect, React Native layout measurements
  // for "height" and "width" ignore scale transforms.
  // https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
  const _getBoundingClientRec = (0, _getBoundingClientRect.default)(node),
        x = _getBoundingClientRec.x,
        y = _getBoundingClientRec.y,
        top = _getBoundingClientRec.top,
        left = _getBoundingClientRec.left;

  const width = node.offsetWidth;
  const height = node.offsetHeight;
  return {
    x,
    y,
    width,
    height,
    top,
    left
  };
};

const measureLayout = (node, relativeToNativeNode, callback) => {
  const relativeNode = relativeToNativeNode || node && node.parentNode;

  if (node && relativeNode) {
    setTimeout(() => {
      const relativeRect = (0, _getBoundingClientRect.default)(relativeNode);

      const _getRect = getRect(node),
            height = _getRect.height,
            left = _getRect.left,
            top = _getRect.top,
            width = _getRect.width;

      const x = left - relativeRect.left;
      const y = top - relativeRect.top;
      callback(x, y, width, height, left, top);
    }, 0);
  }
};

const focusableElements = {
  A: true,
  INPUT: true,
  SELECT: true,
  TEXTAREA: true
};
const UIManager = {
  blur(node) {
    try {
      node.blur();
    } catch (err) {}
  },

  focus(node) {
    try {
      const name = node.nodeName; // A tabIndex of -1 allows element to be programmatically focused but
      // prevents keyboard focus, so we don't want to set the value on elements
      // that support keyboard focus by default.

      if (node.getAttribute('tabIndex') == null && focusableElements[name] == null) {
        node.setAttribute('tabIndex', '-1');
      }

      node.focus();
    } catch (err) {}
  },

  measure(node, callback) {
    measureLayout(node, null, callback);
  },

  measureInWindow(node, callback) {
    if (node) {
      setTimeout(() => {
        const _getRect2 = getRect(node),
              height = _getRect2.height,
              left = _getRect2.left,
              top = _getRect2.top,
              width = _getRect2.width;

        callback(left, top, width, height);
      }, 0);
    }
  },

  measureLayout(node, relativeToNativeNode, onFail, onSuccess) {
    measureLayout(node, relativeToNativeNode, onSuccess);
  },

  updateView(node, props) {
    for (const prop in props) {
      if (!Object.prototype.hasOwnProperty.call(props, prop)) {
        continue;
      }

      const value = props[prop];

      switch (prop) {
        case 'style':
          {
            (0, _setValueForStyles.default)(node, value);
            break;
          }

        case 'class':
        case 'className':
          {
            node.setAttribute('class', value);
            break;
          }

        case 'text':
        case 'value':
          // native platforms use `text` prop to replace text input value
          node.value = value;
          break;

        default:
          node.setAttribute(prop, value);
      }
    }
  },

  configureNextLayoutAnimation(config, onAnimationDidEnd) {
    onAnimationDidEnd();
  },

  // mocks
  setLayoutAnimationEnabledExperimental() {}

};
var _default = UIManager;
exports.default = _default;
module.exports = exports.default;