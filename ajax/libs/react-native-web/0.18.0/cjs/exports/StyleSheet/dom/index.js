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
var initialRules = [// minimal top-level reset
'html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:rgba(0,0,0,0);}', 'body{margin:0;}', // minimal form pseudo-element reset
'button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}', 'input::-webkit-search-cancel-button,input::-webkit-search-decoration,input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none;}'];

function createSheet(root, id) {
  if (id === void 0) {
    id = defaultId;
  }

  var sheet;

  if (_ExecutionEnvironment.default.canUseDOM) {
    var rootNode = root != null ? root.getRootNode() : document; // Create the initial style sheet

    if (sheets.length === 0) {
      sheet = (0, _createOrderedCSSStyleSheet.default)((0, _createCSSStyleSheet.default)(id));
      initialRules.forEach(function (rule) {
        sheet.insert(rule, 0);
      });
      roots.set(rootNode, sheets.length);
      sheets.push(sheet);
    } else {
      var index = roots.get(rootNode);

      if (index == null) {
        var initialSheet = sheets[0]; // If we're creating a new sheet, populate it with existing styles

        var textContent = initialSheet != null ? initialSheet.getTextContent() : ''; // Cast rootNode to 'any' because Flow types for getRootNode are wrong

        sheet = (0, _createOrderedCSSStyleSheet.default)((0, _createCSSStyleSheet.default)(id, rootNode, textContent));
        roots.set(rootNode, sheets.length);
        sheets.push(sheet);
      } else {
        sheet = sheets[index];
      }
    }
  } else {
    // Create the initial style sheet
    if (sheets.length === 0) {
      sheet = (0, _createOrderedCSSStyleSheet.default)((0, _createCSSStyleSheet.default)(id));
      initialRules.forEach(function (rule) {
        sheet.insert(rule, 0);
      });
      sheets.push(sheet);
    } else {
      sheet = sheets[0];
    }
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