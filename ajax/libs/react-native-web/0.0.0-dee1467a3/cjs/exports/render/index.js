"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = render;
exports.hydrate = hydrate;
exports.hydrateLegacy = hydrateLegacy;
exports.renderLegacy = renderLegacy;
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

function hydrate(element, container) {
  var rootNode = container.getRootNode();
  (0, _dom.createSheet)(rootNode);
  return (0, _client.hydrateRoot)(container, element);
}
function render(element, container) {
  var rootNode = container.getRootNode();
  var reactRoot = (0, _client.createRoot)(container);
  reactRoot.render(element);
  (0, _dom.createSheet)(rootNode);
  return reactRoot;
}
function hydrateLegacy(element, container, callback) {
  var rootNode = container.getRootNode();
  (0, _reactDom.hydrate)(element, container, callback);
  (0, _dom.createSheet)(rootNode);
  return {
    unmount: function unmount() {
      return (0, _unmountComponentAtNode.default)(container);
    }
  };
}
function renderLegacy(element, container, callback) {
  var rootNode = container.getRootNode();
  (0, _reactDom.render)(element, container, callback);
  (0, _dom.createSheet)(rootNode);
  return {
    unmount: function unmount() {
      return (0, _unmountComponentAtNode.default)(container);
    }
  };
}