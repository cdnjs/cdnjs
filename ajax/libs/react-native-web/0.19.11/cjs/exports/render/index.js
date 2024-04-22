"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = renderLegacy;
exports.hydrate = hydrate;
exports.hydrateLegacy = hydrateLegacy;
exports.render = render;
var _reactDom = require("react-dom");
var _client = require("react-dom/client");
var _unmountComponentAtNode = _interopRequireDefault(require("../unmountComponentAtNode"));
var _dom = require("../StyleSheet/dom");
/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

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
function hydrateLegacy(element, root, callback) {
  (0, _dom.createSheet)(root);
  (0, _reactDom.hydrate)(element, root, callback);
  return {
    unmount: function unmount() {
      return (0, _unmountComponentAtNode.default)(root);
    }
  };
}
function renderLegacy(element, root, callback) {
  (0, _dom.createSheet)(root);
  (0, _reactDom.render)(element, root, callback);
  return {
    unmount: function unmount() {
      return (0, _unmountComponentAtNode.default)(root);
    }
  };
}