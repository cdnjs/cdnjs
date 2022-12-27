"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _createPrefixer = _interopRequireDefault(require("inline-style-prefixer/lib/createPrefixer"));

var _static = _interopRequireDefault(require("./static"));

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var prefixAll = (0, _createPrefixer.default)(_static.default);
var _default = prefixAll;
exports.default = _default;
module.exports = exports.default;