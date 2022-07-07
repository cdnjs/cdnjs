/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * 
 */
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = useWindowDimensions;

var _Dimensions = _interopRequireDefault(require("../Dimensions"));

var _react = require("react");

function useWindowDimensions() {
  var _useState = (0, _react.useState)(() => _Dimensions.default.get('window')),
      dims = _useState[0],
      setDims = _useState[1];

  (0, _react.useEffect)(() => {
    function handleChange(_ref) {
      var window = _ref.window;

      if (window != null) {
        setDims(window);
      }
    }

    _Dimensions.default.addEventListener('change', handleChange); // We might have missed an update between calling `get` in render and
    // `addEventListener` in this handler, so we set it here. If there was
    // no change, React will filter out this update as a no-op.


    setDims(_Dimensions.default.get('window'));
    return () => {
      _Dimensions.default.removeEventListener('change', handleChange);
    };
  }, []);
  return dims;
}

module.exports = exports.default;