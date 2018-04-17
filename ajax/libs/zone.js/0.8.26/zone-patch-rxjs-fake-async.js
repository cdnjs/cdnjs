/**
* @license
* Copyright Google Inc. All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://angular.io/license
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('rxjs/Scheduler'), require('rxjs/scheduler/async'), require('rxjs/scheduler/asap')) :
	typeof define === 'function' && define.amd ? define(['rxjs/Scheduler', 'rxjs/scheduler/async', 'rxjs/scheduler/asap'], factory) :
	(factory(global.Scheduler,global.async,global.Rx.Scheduler));
}(this, (function (Scheduler,async,asap) { 'use strict';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Zone.__load_patch('rxjs.Scheduler.now', function (global, Zone, api) {
    api.patchMethod(Scheduler.Scheduler, 'now', function (delegate) { return function (self, args) {
        return Date.now.apply(self, args);
    }; });
    api.patchMethod(async.async, 'now', function (delegate) { return function (self, args) {
        return Date.now.apply(self, args);
    }; });
    api.patchMethod(asap.asap, 'now', function (delegate) { return function (self, args) {
        return Date.now.apply(self, args);
    }; });
});

})));
