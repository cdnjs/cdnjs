"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createStyles;

var _styles = require("@material-ui/styles");

// let warnOnce = false;
// To remove in v5
function createStyles(styles) {
  // warning(
  //   warnOnce,
  //   [
  //     'Material-UI: createStyles from @material-ui/core/styles is deprecated.',
  //     'Please use @material-ui/styles/createStyles',
  //   ].join('\n'),
  // );
  // warnOnce = true;
  return (0, _styles.createStyles)(styles);
}