"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _AutocompleteUnstyled.useAutocomplete;
  }
});

var _AutocompleteUnstyled = require("@material-ui/unstyled/AutocompleteUnstyled");

Object.keys(_AutocompleteUnstyled).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _AutocompleteUnstyled[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AutocompleteUnstyled[key];
    }
  });
});