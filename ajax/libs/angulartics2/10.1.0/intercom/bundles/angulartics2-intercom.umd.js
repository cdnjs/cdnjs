(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/intercom', ['exports', '@angular/core', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.intercom = {}), global.ng.core, global.angulartics2));
}(this, (function (exports, i0, i1) { 'use strict';

    var Angulartics2Intercom = /** @class */ (function () {
        function Angulartics2Intercom(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.angulartics2.setUserProperties
                .subscribe(function (x) { return _this.setUserProperties(x); });
            this.angulartics2.setUserPropertiesOnce
                .subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2Intercom.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Intercom.prototype.pageTrack = function (path) {
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
        Angulartics2Intercom.prototype.eventTrack = function (action, properties) {
            try {
                Intercom('trackEvent', action, properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Intercom.prototype.setUserProperties = function (properties) {
            try {
                if (properties.userId && !properties.user_id) {
                    properties.user_id = properties.userId;
                }
                Intercom('boot', properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        return Angulartics2Intercom;
    }());
    Angulartics2Intercom.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Intercom_Factory() { return new Angulartics2Intercom(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Intercom, providedIn: "root" });
    Angulartics2Intercom.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Intercom.ctorParameters = function () { return [
        { type: i1.Angulartics2 }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2Intercom = Angulartics2Intercom;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-intercom.umd.js.map
