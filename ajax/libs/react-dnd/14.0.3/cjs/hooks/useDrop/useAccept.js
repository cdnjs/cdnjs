"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAccept = useAccept;

var _invariant = require("@react-dnd/invariant");

var _react = require("react");

/**
 * Internal utility hook to get an array-version of spec.accept.
 * The main utility here is that we aren't creating a new array on every render if a non-array spec.accept is passed in.
 * @param spec
 */
function useAccept(spec) {
  var accept = spec.accept;
  return (0, _react.useMemo)(function () {
    (0, _invariant.invariant)(spec.accept != null, 'accept must be defined');
    return Array.isArray(accept) ? accept : [accept];
  }, [accept]);
}