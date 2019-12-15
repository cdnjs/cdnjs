/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Zone.__load_patch('electron', function (global, Zone, api) {
    function patchArguments(target, name, source) {
        return api.patchMethod(target, name, function (delegate) { return function (self, args) {
            return delegate && delegate.apply(self, api.bindArguments(args, source));
        }; });
    }
    var _a = require('electron'), desktopCapturer = _a.desktopCapturer, shell = _a.shell, CallbacksRegistry = _a.CallbacksRegistry;
    // patch api in renderer process directly
    // desktopCapturer
    if (desktopCapturer) {
        patchArguments(desktopCapturer, 'getSources', 'electron.desktopCapturer.getSources');
    }
    // shell
    if (shell) {
        patchArguments(shell, 'openExternal', 'electron.shell.openExternal');
    }
    // patch api in main process through CallbackRegistry
    if (!CallbacksRegistry) {
        return;
    }
    patchArguments(CallbacksRegistry.prototype, 'add', 'CallbackRegistry.add');
});

})));
