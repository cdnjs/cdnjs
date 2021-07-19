"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = capitalize;

var _utils = require("@material-ui/utils");

// It should to be noted that this function isn't equivalent to `text-transform: capitalize`.
//
// A strict capitalization should uppercase the first letter of each word a the sentence.
// We only handle the first word.
function capitalize(string) {
  if (typeof string !== 'string') {
    throw new Error(process.env.NODE_ENV !== "production" ? "Material-UI: capitalize(string) expects a string argument." : (0, _utils.formatMuiErrorMessage)(7));
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}