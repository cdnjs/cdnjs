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
    var FUNCTION = 'function';
    var _a = require('electron'), desktopCapturer = _a.desktopCapturer, shell = _a.shell, CallbackRegistry = _a.CallbackRegistry;
    // patch api in renderer process directly
    // desktopCapturer
    if (desktopCapturer) {
        api.patchArguments(desktopCapturer, 'getSources', 'electron.desktopCapturer.getSources');
    }
    // shell
    if (shell) {
        api.patchArguments(shell, 'openExternal', 'electron.shell.openExternal');
    }
    // patch api in main process through CallbackRegistry
    if (!CallbackRegistry) {
        return;
    }
    api.patchArguments(CallbackRegistry.prototype, 'add', 'CallbackRegistry.add');
});

})));
