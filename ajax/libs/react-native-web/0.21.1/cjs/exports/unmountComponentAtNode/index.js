"use strict";

exports.__esModule = true;
exports.default = unmountComponentAtNode;
/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function unmountComponentAtNode(rootTag) {
  rootTag.unmount();
  return true;
}
module.exports = exports.default;