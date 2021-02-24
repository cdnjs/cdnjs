"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAccept = useAccept;

var _react = require("react");

function useAccept(spec) {
  var specAccept = spec.accept;
  return (0, _react.useMemo)(function () {
    return Array.isArray(specAccept) ? specAccept : [specAccept];
  }, [specAccept]);
}