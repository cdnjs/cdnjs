"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const accessibilityRoleToWebRole = {
  adjustable: 'slider',
  button: 'button',
  header: 'heading',
  image: 'img',
  imagebutton: null,
  keyboardkey: null,
  label: null,
  link: 'link',
  none: 'presentation',
  search: 'search',
  summary: 'region',
  text: null
};

const propsToAriaRole = _ref => {
  let accessibilityRole = _ref.accessibilityRole;

  if (accessibilityRole) {
    const inferredRole = accessibilityRoleToWebRole[accessibilityRole];

    if (inferredRole !== null) {
      // ignore roles that don't map to web
      return inferredRole || accessibilityRole;
    }
  }
};

var _default = propsToAriaRole;
exports.default = _default;
module.exports = exports.default;