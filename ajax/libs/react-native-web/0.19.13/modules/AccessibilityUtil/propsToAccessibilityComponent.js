/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import propsToAriaRole from './propsToAriaRole';
var roleComponents = {
  article: 'article',
  banner: 'header',
  blockquote: 'blockquote',
  button: 'button',
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
  paragraph: 'p',
  region: 'section',
  strong: 'strong'
};
var emptyObject = {};
var propsToAccessibilityComponent = function propsToAccessibilityComponent(props) {
  if (props === void 0) {
    props = emptyObject;
  }
  var roleProp = props.role || props.accessibilityRole;
  // special-case for "label" role which doesn't map to an ARIA role
  if (roleProp === 'label') {
    return 'label';
  }
  var role = propsToAriaRole(props);
  if (role) {
    if (role === 'heading') {
      var level = props.accessibilityLevel || props['aria-level'];
      if (level != null) {
        return "h" + level;
      }
      return 'h1';
    }
    return roleComponents[role];
  }
};
export default propsToAccessibilityComponent;