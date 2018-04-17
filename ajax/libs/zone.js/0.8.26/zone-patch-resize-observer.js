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

var __values = (undefined && undefined.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Zone.__load_patch('ResizeObserver', function (global, Zone, api) {
    var ResizeObserver = global['ResizeObserver'];
    if (!ResizeObserver) {
        return;
    }
    var resizeObserverSymbol = api.symbol('ResizeObserver');
    api.patchMethod(global, 'ResizeObserver', function (delegate) { return function (self, args) {
        var callback = args.length > 0 ? args[0] : null;
        if (callback) {
            args[0] = function (entries, observer) {
                var _this = this;
                var zones = {};
                var currZone = Zone.current;
                try {
                    for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                        var entry = entries_1_1.value;
                        var zone = entry.target[resizeObserverSymbol];
                        if (!zone) {
                            zone = currZone;
                        }
                        var zoneEntriesInfo = zones[zone.name];
                        if (!zoneEntriesInfo) {
                            zones[zone.name] = zoneEntriesInfo = { entries: [], zone: zone };
                        }
                        zoneEntriesInfo.entries.push(entry);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                Object.keys(zones).forEach(function (zoneName) {
                    var zoneEntriesInfo = zones[zoneName];
                    if (zoneEntriesInfo.zone !== Zone.current) {
                        zoneEntriesInfo.zone.run(callback, _this, [zoneEntriesInfo.entries, observer], 'ResizeObserver');
                    }
                    else {
                        callback.call(_this, zoneEntriesInfo.entries, observer);
                    }
                });
                var e_1, _a;
            };
        }
        return args.length > 0 ? new ResizeObserver(args[0]) : new ResizeObserver();
    }; });
    api.patchMethod(ResizeObserver.prototype, 'observe', function (delegate) { return function (self, args) {
        var target = args.length > 0 ? args[0] : null;
        if (!target) {
            return delegate.apply(self, args);
        }
        var targets = self[resizeObserverSymbol];
        if (!targets) {
            targets = self[resizeObserverSymbol] = [];
        }
        targets.push(target);
        target[resizeObserverSymbol] = Zone.current;
        return delegate.apply(self, args);
    }; });
    api.patchMethod(ResizeObserver.prototype, 'unobserve', function (delegate) { return function (self, args) {
        var target = args.length > 0 ? args[0] : null;
        if (!target) {
            return delegate.apply(self, args);
        }
        var targets = self[resizeObserverSymbol];
        if (targets) {
            for (var i = 0; i < targets.length; i++) {
                if (targets[i] === target) {
                    targets.splice(i, 1);
                    break;
                }
            }
        }
        target[resizeObserverSymbol] = undefined;
        return delegate.apply(self, args);
    }; });
    api.patchMethod(ResizeObserver.prototype, 'disconnect', function (delegate) { return function (self, args) {
        var targets = self[resizeObserverSymbol];
        if (targets) {
            targets.forEach(function (target) { target[resizeObserverSymbol] = undefined; });
            self[resizeObserverSymbol] = undefined;
        }
        return delegate.apply(self, args);
    }; });
});

})));
