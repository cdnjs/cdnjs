'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @todo: Add dynamic params support;
 *
 * Exp;
 * usePassThrough(pt1, pt2, pt3, pt*, { merge: true });
 * usePassThrough(pt1, { merge: true });
 */
var usePassThrough = function usePassThrough() {
  var pt1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var pt2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref$merge = _ref.merge,
    merge = _ref$merge === void 0 ? true : _ref$merge,
    _ref$useMergeProps = _ref.useMergeProps,
    useMergeProps = _ref$useMergeProps === void 0 ? true : _ref$useMergeProps;
  return {
    _usept: {
      merge: merge,
      useMergeProps: useMergeProps
    },
    originalValue: pt1,
    value: pt2
  };
};

exports.usePassThrough = usePassThrough;
