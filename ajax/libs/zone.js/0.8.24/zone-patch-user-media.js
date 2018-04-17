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
Zone.__load_patch('getUserMedia', function (global, Zone, api) {
    function wrapFunctionArgs(func, source) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            var wrappedArgs = api.bindArguments(args, source ? source : func.name);
            return func.apply(this, wrappedArgs);
        };
    }
    var navigator = global['navigator'];
    if (navigator && navigator.getUserMedia) {
        navigator.getUserMedia = wrapFunctionArgs(navigator.getUserMedia);
    }
});

})));
