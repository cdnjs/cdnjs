/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';
import createCSSStyleSheet from './createCSSStyleSheet';
import createOrderedCSSStyleSheet from './createOrderedCSSStyleSheet';
var defaultId = 'react-native-stylesheet';
var roots = new WeakMap();
var sheets = [];
export function createSheet(root, id) {
  if (id === void 0) {
    id = defaultId;
  }

  var sheet;

  if (ExecutionEnvironment.canUseDOM) {
    var rootNode = root != null ? root.getRootNode() : document;
    var index = roots.get(rootNode);

    if (index == null) {
      var initialSheet = sheets[0]; // If we're creating a new sheet, populate it with existing styles

      var textContent = initialSheet != null ? initialSheet.getTextContent() : null; // Cast rootNode to 'any' because Flow types for getRootNode are wrong

      sheet = createOrderedCSSStyleSheet(createCSSStyleSheet(id, textContent, rootNode));
      roots.set(rootNode, sheets.length);
      sheets.push(sheet);
    } else {
      sheet = sheets[index];
    }
  } else {
    sheet = createOrderedCSSStyleSheet(createCSSStyleSheet(id));
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