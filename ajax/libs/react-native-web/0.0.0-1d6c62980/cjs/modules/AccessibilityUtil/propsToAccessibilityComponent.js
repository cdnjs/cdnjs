"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _propsToAriaRole = _interopRequireDefault(require("./propsToAriaRole"));

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const roleComponents = {
  article: 'article',
  banner: 'header',
  blockquote: 'blockquote',
  code: 'code',
  complementary: 'aside',
  contentinfo: 'footer',
  deletion: 'del',
  emphasis: 'em',
  figure: 'figure',
  insertion: 'ins',
  form: 'form',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  region: 'section',
  strong: 'strong'
};
const emptyObject = {};

const propsToAccessibilityComponent = function propsToAccessibilityComponent(props) {
  if (props === void 0) {
    props = emptyObject;
  }

  // special-case for "label" role which doesn't map to an ARIA role
  if (props.accessibilityRole === 'label') {
    return 'label';
  }

  const role = (0, _propsToAriaRole.default)(props);

  if (role) {
    if (role === 'heading') {
      const level = props.accessibilityLevel || props['aria-level'];

      if (level != null) {
        return "h" + level;
      }

      return 'h1';
    }

    return roleComponents[role];
  }
};

var _default = propsToAccessibilityComponent;
exports.default = _default;
module.exports = exports.default;