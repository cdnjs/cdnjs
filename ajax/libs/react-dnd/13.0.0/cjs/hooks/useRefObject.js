"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRefObject = useRefObject;

var _react = require("react");

function useRefObject(input) {
  var ref = (0, _react.useRef)(input);
  (0, _react.useEffect)(function () {
    ref.current = input;
  }, [input]);
  return ref;
}