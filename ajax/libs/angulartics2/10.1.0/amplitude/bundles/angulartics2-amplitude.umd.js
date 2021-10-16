(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/amplitude', ['exports', '@angular/core', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.amplitude = {}), global.ng.core, global.angulartics2));
}(this, (function (exports, i0, i1) { 'use strict';

    var Angulartics2Amplitude = /** @class */ (function () {
        function Angulartics2Amplitude(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.angulartics2.setUsername
                .subscribe(function (x) { return _this.setUsername(x); });
            this.angulartics2.setUserProperties
                .subscribe(function (x) { return _this.setUserProperties(x); });
            this.angulartics2.setUserPropertiesOnce
                .subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2Amplitude.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Amplitude.prototype.pageTrack = function (path) {
            try {
                this.eventTrack('Pageview', {
                    url: path
                });
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Amplitude.prototype.eventTrack = function (action, properties) {
            try {
                amplitude.getInstance().logEvent(action, properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Amplitude.prototype.setUsername = function (userId) {
            try {
                amplitude.getInstance().setUserId(userId);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Amplitude.prototype.setUserProperties = function (properties) {
            try {
                amplitude.getInstance().setUserProperties(properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        return Angulartics2Amplitude;
    }());
    Angulartics2Amplitude.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Amplitude_Factory() { return new Angulartics2Amplitude(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Amplitude, providedIn: "root" });
    Angulartics2Amplitude.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Amplitude.ctorParameters = function () { return [
        { type: i1.Angulartics2 }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2Amplitude = Angulartics2Amplitude;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-amplitude.umd.js.map
