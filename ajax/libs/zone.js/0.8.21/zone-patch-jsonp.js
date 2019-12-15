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
Zone.__load_patch('jsonp', function (global, Zone, api) {
    Zone[Zone.__symbol__('jsonp')] = function patchJsonp(options) {
        if (!options || !options.jsonp || !options.sendFuncName) {
            return;
        }
        var noop = function () { };
        [options.successFuncName, options.failedFuncName].forEach(function (methodName) {
            if (!methodName) {
                return;
            }
            var oriFunc = global[methodName];
            if (oriFunc) {
                api.patchMethod(global, methodName, function (delegate) { return function (self, args) {
                    var task = global[api.symbol('jsonTask')];
                    if (task) {
                        task.callback = delegate;
                        return task.invoke.apply(self, args);
                    }
                    else {
                        return delegate.apply(self, args);
                    }
                }; });
            }
            else {
                Object.defineProperty(global, methodName, {
                    configurable: true,
                    enumerable: true,
                    get: function () {
                        return function () {
                            var task = global[api.symbol('jsonpTask')];
                            var delegate = global[api.symbol("jsonp" + methodName + "callback")];
                            if (task) {
                                if (delegate) {
                                    task.callback = delegate;
                                }
                                global[api.symbol('jsonpTask')] = undefined;
                                return task.invoke.apply(this, arguments);
                            }
                            else {
                                if (delegate) {
                                    return delegate.apply(this, arguments);
                                }
                            }
                            return null;
                        };
                    },
                    set: function (callback) {
                        this[api.symbol("jsonp" + methodName + "callback")] = callback;
                    }
                });
            }
        });
        api.patchMethod(options.jsonp, options.sendFuncName, function (delegate) { return function (self, args) {
            global[api.symbol('jsonpTask')] = Zone.current.scheduleMacroTask('jsonp', noop, {}, function (task) {
                return delegate.apply(self, args);
            }, noop);
        }; });
    };
});

})));
