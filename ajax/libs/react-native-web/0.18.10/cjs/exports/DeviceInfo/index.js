"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.default = void 0;

var _Dimensions = _interopRequireDefault(require("../Dimensions"));

var _canUseDom = _interopRequireDefault(require("../../modules/canUseDom"));

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var DeviceInfo = {
  Dimensions: {
    get windowPhysicalPixels() {
      var _Dimensions$get = _Dimensions.default.get('window'),
          width = _Dimensions$get.width,
          height = _Dimensions$get.height,
          fontScale = _Dimensions$get.fontScale,
          scale = _Dimensions$get.scale;

      return {
        width: width * scale,
        height: height * scale,
        scale,
        fontScale
      };
    },

    get screenPhysicalPixels() {
      var _Dimensions$get2 = _Dimensions.default.get('screen'),
          width = _Dimensions$get2.width,
          height = _Dimensions$get2.height,
          fontScale = _Dimensions$get2.fontScale,
          scale = _Dimensions$get2.scale;

      return {
        width: width * scale,
        height: height * scale,
        scale,
        fontScale
      };
    }

  },

  get locale() {
    if (_canUseDom.default) {
      if (navigator.languages) {
        return navigator.languages[0];
      } else {
        return navigator.language;
      }
    }
  },

  get totalMemory() {
    // $FlowIssue deviceMemory not defined in navigator
    return _canUseDom.default ? navigator.deviceMemory : undefined;
  },

  get userAgent() {
    return _canUseDom.default ? navigator.userAgent : '';
  }

};
var _default = DeviceInfo;
exports.default = _default;
module.exports = exports.default;