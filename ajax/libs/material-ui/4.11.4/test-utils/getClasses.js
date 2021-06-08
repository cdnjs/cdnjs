"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getClasses;

var React = _interopRequireWildcard(require("react"));

var _createShallow = _interopRequireDefault(require("./createShallow"));

var shallow = (0, _createShallow.default)(); // Helper function to extract the classes from a styleSheet.

function getClasses(element) {
  var useStyles = element.type.useStyles;
  var classes;

  function Listener() {
    classes = useStyles(element.props);
    return null;
  }

  shallow( /*#__PURE__*/React.createElement(Listener, null));
  return classes;
}