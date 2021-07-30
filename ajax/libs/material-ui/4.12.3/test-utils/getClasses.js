"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getClasses;

var React = _interopRequireWildcard(require("react"));

var _createShallow = _interopRequireDefault(require("./createShallow"));

var shallow = (0, _createShallow.default)();
var warnedOnce = false; // Helper function to extract the classes from a styleSheet.

function getClasses(element) {
  if (!warnedOnce) {
    warnedOnce = true;
    console.warn(['Material-UI: the test utils are deprecated, they are no longer present in v5.', 'The helpers were designed to work with enzyme.', 'However, the tests of the core components were moved to react-testing-library.'].join('\n'));
  }

  var useStyles = element.type.useStyles;
  var classes;

  function Listener() {
    classes = useStyles(element.props);
    return null;
  }

  shallow( /*#__PURE__*/React.createElement(Listener, null));
  return classes;
}