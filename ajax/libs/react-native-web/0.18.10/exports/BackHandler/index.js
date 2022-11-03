/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
function emptyFunction() {}

var BackHandler = {
  exitApp: emptyFunction,

  addEventListener() {
    return {
      remove: emptyFunction
    };
  },

  removeEventListener: emptyFunction
};
export default BackHandler;