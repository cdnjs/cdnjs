(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/woopra', ['exports', '@angular/core', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.woopra = {}), global.ng.core, global.angulartics2));
}(this, (function (exports, i0, i1) { 'use strict';

    var Angulartics2Woopra = /** @class */ (function () {
        function Angulartics2Woopra(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            if (typeof (woopra) === 'undefined') {
                console.warn('Woopra not found');
            }
            this.angulartics2.setUserProperties
                .subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2Woopra.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Woopra.prototype.pageTrack = function (path) {
            try {
                woopra.track('pv', {
                    url: path
                });
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Woopra.prototype.eventTrack = function (action, properties) {
            try {
                woopra.track(action, properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Woopra.prototype.setUserProperties = function (properties) {
            try {
                if (properties.email) {
                    woopra.identify(properties);
                }
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        return Angulartics2Woopra;
    }());
    Angulartics2Woopra.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Woopra_Factory() { return new Angulartics2Woopra(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Woopra, providedIn: "root" });
    Angulartics2Woopra.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Woopra.ctorParameters = function () { return [
        { type: i1.Angulartics2 }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2Woopra = Angulartics2Woopra;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-woopra.umd.js.map
