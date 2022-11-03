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
var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};

function toHyphenLower(match) {
  return '-' + match.toLowerCase();
}

function hyphenateStyleName(name) {
  if (name in cache) {
    return cache[name];
  }

  var hName = name.replace(uppercasePattern, toHyphenLower);
  return cache[name] = msPattern.test(hName) ? '-' + hName : hName;
}

var _default = hyphenateStyleName;
exports.default = _default;
module.exports = exports.default;