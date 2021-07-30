"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unwrap;
var warnedOnce = false;

function unwrap(component) {
  if (!warnedOnce) {
    warnedOnce = true;
    console.warn(['Material-UI: the test utils are deprecated, they are no longer present in v5.', 'The helpers were designed to work with enzyme.', 'However, the tests of the core components were moved to react-testing-library.'].join('\n'));
  }

  return component.Naked;
}