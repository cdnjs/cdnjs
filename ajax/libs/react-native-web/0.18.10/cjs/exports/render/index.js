"use strict";

exports.__esModule = true;
exports.default = render;
exports.hydrate = hydrate;

var _reactDom = require("react-dom");

var _dom = require("../StyleSheet/dom");

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function hydrate(element, root, callback) {
  (0, _dom.createSheet)(root);
  return (0, _reactDom.hydrate)(element, root, callback);
}

function render(element, root, callback) {
  (0, _dom.createSheet)(root);
  return (0, _reactDom.render)(element, root, callback);
}