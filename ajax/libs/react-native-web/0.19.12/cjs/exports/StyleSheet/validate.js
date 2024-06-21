"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.validate = validate;
var _postcssValueParser = _interopRequireDefault(require("postcss-value-parser"));
/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var invalidShortforms = {
  background: true,
  borderBottom: true,
  borderLeft: true,
  borderRight: true,
  borderTop: true,
  font: true,
  grid: true,
  outline: true,
  textDecoration: true
};
var invalidMultiValueShortforms = {
  flex: true,
  margin: true,
  padding: true,
  borderColor: true,
  borderRadius: true,
  borderStyle: true,
  borderWidth: true,
  inset: true,
  insetBlock: true,
  insetInline: true,
  marginBlock: true,
  marginInline: true,
  marginHorizontal: true,
  marginVertical: true,
  paddingBlock: true,
  paddingInline: true,
  paddingHorizontal: true,
  paddingVertical: true,
  overflow: true,
  overscrollBehavior: true,
  backgroundPosition: true
};
function error(message) {
  console.error(message);
}
function validate(obj) {
  for (var k in obj) {
    var prop = k.trim();
    var value = obj[prop];
    var isInvalid = false;
    if (value === null) {
      continue;
    }
    if (typeof value === 'string' && value.indexOf('!important') > -1) {
      error("Invalid style declaration \"" + prop + ":" + value + "\". Values cannot include \"!important\"");
      isInvalid = true;
    } else {
      var suggestion = '';
      if (prop === 'animation' || prop === 'animationName') {
        suggestion = 'Did you mean "animationKeyframes"?';
        isInvalid = true;
      } else if (prop === 'direction') {
        suggestion = 'Did you mean "writingDirection"?';
        isInvalid = true;
      } else if (invalidShortforms[prop]) {
        suggestion = 'Please use long-form properties.';
        isInvalid = true;
      } else if (invalidMultiValueShortforms[prop]) {
        if (typeof value === 'string' && (0, _postcssValueParser.default)(value).nodes.length > 1) {
          suggestion = "Value is \"" + value + "\" but only single values are supported.";
          isInvalid = true;
        }
      }
      if (suggestion !== '') {
        error("Invalid style property of \"" + prop + "\". " + suggestion);
      }
    }
    if (isInvalid) {
      delete obj[k];
    }
  }
}