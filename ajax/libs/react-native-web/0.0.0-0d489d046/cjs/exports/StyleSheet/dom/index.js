"use strict";

exports.__esModule = true;
exports.createSheet = createSheet;

var _ExecutionEnvironment = _interopRequireDefault(require("fbjs/lib/ExecutionEnvironment"));

var _createCSSStyleSheet = _interopRequireDefault(require("./createCSSStyleSheet"));

var _createOrderedCSSStyleSheet = _interopRequireDefault(require("./createOrderedCSSStyleSheet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var defaultId = 'react-native-stylesheet';
var roots = new WeakMap();
var sheets = [];

function createSheet(root, id) {
  if (id === void 0) {
    id = defaultId;
  }

  var sheet;

  if (_ExecutionEnvironment.default.canUseDOM) {
    var rootNode = root != null ? root.getRootNode() : document;
    var index = roots.get(rootNode);

    if (index == null) {
      var initialSheet = sheets[0]; // If we're creating a new sheet, populate it with existing styles

      var textContent = initialSheet != null ? initialSheet.getTextContent() : null; // Cast rootNode to 'any' because Flow types for getRootNode are wrong

      sheet = (0, _createOrderedCSSStyleSheet.default)((0, _createCSSStyleSheet.default)(id, textContent, rootNode));
      roots.set(rootNode, sheets.length);
      sheets.push(sheet);
    } else {
      sheet = sheets[index];
    }
  } else {
    sheet = (0, _createOrderedCSSStyleSheet.default)((0, _createCSSStyleSheet.default)(id));
  }

  return {
    getTextContent: function getTextContent() {
      return sheet.getTextContent();
    },
    id: id,
    insert: function insert(cssText, groupValue) {
      sheets.forEach(function (s) {
        s.insert(cssText, groupValue);
      });
    }
  };
}