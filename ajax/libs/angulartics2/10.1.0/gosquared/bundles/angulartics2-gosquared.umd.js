(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/gosquared', ['exports', '@angular/core', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.gosquared = {}), global.ng.core, global.angulartics2));
}(this, (function (exports, i0, i1) { 'use strict';

    var Angulartics2GoSquared = /** @class */ (function () {
        function Angulartics2GoSquared(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
            this.angulartics2.setUserPropertiesOnce.subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2GoSquared.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2GoSquared.prototype.pageTrack = function (path) {
            try {
                _gs('track', path);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2GoSquared.prototype.eventTrack = function (action, properties) {
            try {
                _gs('event', action, properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2GoSquared.prototype.setUserProperties = function (properties) {
            try {
                _gs('identify', properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        return Angulartics2GoSquared;
    }());
    Angulartics2GoSquared.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2GoSquared_Factory() { return new Angulartics2GoSquared(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2GoSquared, providedIn: "root" });
    Angulartics2GoSquared.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2GoSquared.ctorParameters = function () { return [
        { type: i1.Angulartics2 }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2GoSquared = Angulartics2GoSquared;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-gosquared.umd.js.map
