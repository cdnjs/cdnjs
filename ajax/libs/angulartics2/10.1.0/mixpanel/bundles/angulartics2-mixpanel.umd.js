(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/mixpanel', ['exports', '@angular/core', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.mixpanel = {}), global.ng.core, global.angulartics2));
}(this, (function (exports, i0, i1) { 'use strict';

    var Angulartics2Mixpanel = /** @class */ (function () {
        function Angulartics2Mixpanel(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.angulartics2.setUsername
                .subscribe(function (x) { return _this.setUsername(x); });
            this.angulartics2.setUserProperties
                .subscribe(function (x) { return _this.setUserProperties(x); });
            this.angulartics2.setUserPropertiesOnce
                .subscribe(function (x) { return _this.setUserPropertiesOnce(x); });
            this.angulartics2.setSuperProperties
                .subscribe(function (x) { return _this.setSuperProperties(x); });
            this.angulartics2.setSuperPropertiesOnce
                .subscribe(function (x) { return _this.setSuperPropertiesOnce(x); });
            this.angulartics2.setAlias
                .subscribe(function (x) { return _this.setAlias(x); });
        }
        Angulartics2Mixpanel.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Mixpanel.prototype.pageTrack = function (path) {
            try {
                mixpanel.track('Page Viewed', { page: path });
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Mixpanel.prototype.eventTrack = function (action, properties) {
            try {
                mixpanel.track(action, properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Mixpanel.prototype.setUsername = function (userId) {
            try {
                mixpanel.identify(userId);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Mixpanel.prototype.setUserProperties = function (properties) {
            try {
                mixpanel.people.set(properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Mixpanel.prototype.setUserPropertiesOnce = function (properties) {
            try {
                mixpanel.people.set_once(properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Mixpanel.prototype.setSuperProperties = function (properties) {
            try {
                mixpanel.register(properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Mixpanel.prototype.setSuperPropertiesOnce = function (properties) {
            try {
                mixpanel.register_once(properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Mixpanel.prototype.setAlias = function (alias) {
            try {
                mixpanel.alias(alias);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        return Angulartics2Mixpanel;
    }());
    Angulartics2Mixpanel.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Mixpanel_Factory() { return new Angulartics2Mixpanel(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Mixpanel, providedIn: "root" });
    Angulartics2Mixpanel.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Mixpanel.ctorParameters = function () { return [
        { type: i1.Angulartics2 }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2Mixpanel = Angulartics2Mixpanel;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-mixpanel.umd.js.map
