/**
 * @license React
 * react-dom-server-rendering-stub.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.ReactDOMServerRenderingStub = {}));
}(this, (function (exports) { 'use strict';

  var ReactVersion = '18.3.0-next-79c582981-20221021';

  var Internals = {
    usingClientEntryPoint: false,
    Events: null,
    Dispatcher: {
      current: null
    }
  };

  function createPortal() {
    throw new Error('createPortal was called on the server. Portals are not currently' + ' supported on the server. Update your program to conditionally call' + ' createPortal on the client only.');
  }
  function flushSync() {
    throw new Error('flushSync was called on the server. This is likely caused by a' + ' function being called during render or in module scope that was' + ' intended to be called from an effect or event handler. Update your' + ' to not call flushSync no the server.');
  }

  exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Internals;
  exports.createPortal = createPortal;
  exports.flushSync = flushSync;
  exports.version = ReactVersion;

})));
