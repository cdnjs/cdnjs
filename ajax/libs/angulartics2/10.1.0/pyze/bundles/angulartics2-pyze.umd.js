(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/pyze', ['exports', '@angular/core', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.pyze = {}), global.ng.core, global.angulartics2));
}(this, (function (exports, i0, i1) { 'use strict';

    var Angulartics2Pyze = /** @class */ (function () {
        function Angulartics2Pyze(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.angulartics2.setUsername.subscribe(function (x) { return _this.setUserId(x); });
            this.angulartics2.setUserProperties.subscribe(function (x) { return _this.postTraits(x); });
        }
        Angulartics2Pyze.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Pyze.prototype.pageTrack = function (path) {
            try {
                Pyze.postPageView('Page Viewed', { page: path });
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Pyze.prototype.eventTrack = function (action, properties) {
            try {
                PyzeEvents.postCustomEventWithAttributes(action, properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Pyze.prototype.setUserId = function (userId) {
            try {
                PyzeIdentity.setUserIdentifier(userId);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Pyze.prototype.postTraits = function (properties) {
            try {
                PyzeIdentity.postTraits(properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        return Angulartics2Pyze;
    }());
    Angulartics2Pyze.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Pyze_Factory() { return new Angulartics2Pyze(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Pyze, providedIn: "root" });
    Angulartics2Pyze.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Pyze.ctorParameters = function () { return [
        { type: i1.Angulartics2 }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2Pyze = Angulartics2Pyze;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-pyze.umd.js.map
