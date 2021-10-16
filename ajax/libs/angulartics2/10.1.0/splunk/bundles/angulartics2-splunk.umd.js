(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/splunk', ['exports', '@angular/core', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.splunk = {}), global.ng.core, global.angulartics2));
}(this, (function (exports, i0, i1) { 'use strict';

    var Angulartics2Splunk = /** @class */ (function () {
        function Angulartics2Splunk(angulartics2) {
            this.angulartics2 = angulartics2;
            if (typeof (sp) === 'undefined') {
                console.warn('Splunk not found');
            }
        }
        Angulartics2Splunk.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Splunk.prototype.pageTrack = function (path) {
            try {
                sp.pageview(path);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Splunk.prototype.eventTrack = function (action, properties) {
            try {
                sp.track(action, properties);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        return Angulartics2Splunk;
    }());
    Angulartics2Splunk.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Splunk_Factory() { return new Angulartics2Splunk(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Splunk, providedIn: "root" });
    Angulartics2Splunk.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Splunk.ctorParameters = function () { return [
        { type: i1.Angulartics2 }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2Splunk = Angulartics2Splunk;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-splunk.umd.js.map
