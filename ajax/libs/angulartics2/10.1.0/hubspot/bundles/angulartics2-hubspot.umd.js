(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/hubspot', ['exports', '@angular/core', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.hubspot = {}), global.ng.core, global.angulartics2));
}(this, (function (exports, i0, i1) { 'use strict';

    var Angulartics2Hubspot = /** @class */ (function () {
        function Angulartics2Hubspot(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.angulartics2.setUserProperties
                .subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2Hubspot.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Hubspot.prototype.pageTrack = function (path) {
            if (typeof _hsq !== 'undefined') {
                _hsq.push(['setPath', path]);
                _hsq.push(['trackPageView']);
            }
        };
        Angulartics2Hubspot.prototype.eventTrack = function (action, properties) {
            if (typeof _hsq !== 'undefined') {
                _hsq.push(['trackEvent', properties]);
            }
        };
        Angulartics2Hubspot.prototype.setUserProperties = function (properties) {
            if (typeof _hsq !== 'undefined') {
                _hsq.push(['identify', properties]);
            }
        };
        return Angulartics2Hubspot;
    }());
    Angulartics2Hubspot.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Hubspot_Factory() { return new Angulartics2Hubspot(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Hubspot, providedIn: "root" });
    Angulartics2Hubspot.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Hubspot.ctorParameters = function () { return [
        { type: i1.Angulartics2 }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2Hubspot = Angulartics2Hubspot;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-hubspot.umd.js.map
