(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/segment', ['exports', '@angular/core', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.segment = {}), global.ng.core, global.angulartics2));
}(this, (function (exports, i0, i1) { 'use strict';

    var Angulartics2Segment = /** @class */ (function () {
        function Angulartics2Segment(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.angulartics2.setUserProperties
                .subscribe(function (x) { return _this.setUserProperties(x); });
            this.angulartics2.setUserPropertiesOnce
                .subscribe(function (x) { return _this.setUserProperties(x); });
            this.angulartics2.setAlias
                .subscribe(function (x) { return _this.setAlias(x); });
        }
        Angulartics2Segment.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        /**
         * https://segment.com/docs/libraries/analytics.js/#page
         *
         * analytics.page([category], [name], [properties], [options], [callback]);
         */
        Angulartics2Segment.prototype.pageTrack = function (path) {
            // TODO : Support optional parameters where the parameter order and type changes their meaning
            try {
                analytics.page(path);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        /**
         * https://segment.com/docs/libraries/analytics.js/#track
         *
         * analytics.track(event, [properties], [options], [callback]);
         */
        Angulartics2Segment.prototype.eventTrack = function (action, properties) {
            try {
                analytics.track(action, properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        /**
         * https://segment.com/docs/libraries/analytics.js/#identify
         *
         * analytics.identify([userId], [traits], [options], [callback]);
         */
        Angulartics2Segment.prototype.setUserProperties = function (properties) {
            try {
                if (properties.userId) {
                    analytics.identify(properties.userId, properties);
                }
                else {
                    analytics.identify(properties);
                }
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        /**
         * https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#reset--logout
         *
         * analytics.reset();
         */
        Angulartics2Segment.prototype.unsetUserProperties = function () {
            analytics.reset();
        };
        /**
         * https://segment.com/docs/libraries/analytics.js/#alias
         *
         * analytics.alias(userId, previousId, options, callback);
         */
        Angulartics2Segment.prototype.setAlias = function (alias) {
            try {
                analytics.alias(alias);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        return Angulartics2Segment;
    }());
    Angulartics2Segment.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Segment_Factory() { return new Angulartics2Segment(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Segment, providedIn: "root" });
    Angulartics2Segment.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Segment.ctorParameters = function () { return [
        { type: i1.Angulartics2 }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2Segment = Angulartics2Segment;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-segment.umd.js.map
