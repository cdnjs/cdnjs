"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _invariant = _interopRequireDefault(require("fbjs/lib/invariant"));
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

class Share {
  static share(content, options) {
    if (options === void 0) {
      options = {};
    }
    (0, _invariant.default)(typeof content === 'object' && content !== null, 'Content to share must be a valid object');
    (0, _invariant.default)(typeof content.url === 'string' || typeof content.message === 'string', 'At least one of URL and message is required');
    (0, _invariant.default)(typeof options === 'object' && options !== null, 'Options must be a valid object');
    (0, _invariant.default)(!content.title || typeof content.title === 'string', 'Invalid title: title should be a string.');
    if (window.navigator.share !== undefined) {
      return window.navigator.share({
        title: content.title,
        text: content.message,
        url: content.url
      });
    } else {
      return Promise.reject(new Error('Share is not supported in this browser'));
    }
  }

  /**
   * The content was successfully shared.
   */
  static get sharedAction() {
    return 'sharedAction';
  }

  /**
   * The dialog has been dismissed.
   * @platform ios
   */
  static get dismissedAction() {
    return 'dismissedAction';
  }
}
var _default = Share;
exports.default = _default;
module.exports = exports.default;