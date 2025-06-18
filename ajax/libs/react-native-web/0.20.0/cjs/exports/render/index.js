"use strict";
/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

'use client';

exports.__esModule = true;
exports.default = render;
exports.hydrate = hydrate;
var _client = require("react-dom/client");
var _dom = require("../StyleSheet/dom");
function hydrate(element, root) {
  (0, _dom.createSheet)(root);
  return (0, _client.hydrateRoot)(root, element);
}
function render(element, root) {
  (0, _dom.createSheet)(root);
  var reactRoot = (0, _client.createRoot)(root);
  reactRoot.render(element);
  return reactRoot;
}