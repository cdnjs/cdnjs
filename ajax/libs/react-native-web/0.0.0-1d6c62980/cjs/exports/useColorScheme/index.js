"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

exports.__esModule = true;
exports.default = useColorScheme;

var React = _interopRequireWildcard(require("react"));

var _Appearance = _interopRequireDefault(require("../Appearance"));

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function useColorScheme() {
  const _React$useState = React.useState(_Appearance.default.getColorScheme()),
        colorScheme = _React$useState[0],
        setColorScheme = _React$useState[1];

  React.useEffect(() => {
    function listener(appearance) {
      setColorScheme(appearance.colorScheme);
    }

    _Appearance.default.addChangeListener(listener);

    return () => _Appearance.default.removeChangeListener(listener);
  });
  return colorScheme;
}

module.exports = exports.default;