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
(function (_global) {
    // patch Notification
    patchNotification(_global);
    function patchNotification(_global) {
        var Notification = _global['Notification'];
        if (!Notification || !Notification.prototype) {
            return;
        }
        var desc = Object.getOwnPropertyDescriptor(Notification.prototype, 'onerror');
        if (!desc || !desc.configurable) {
            return;
        }
        var patchOnProperties = Zone[Zone.__symbol__('patchOnProperties')];
        patchOnProperties(Notification.prototype, null);
    }
})(typeof window === 'object' && window || typeof self === 'object' && self || global);

})));
