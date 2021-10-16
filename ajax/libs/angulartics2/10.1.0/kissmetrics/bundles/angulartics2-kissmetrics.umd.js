(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/kissmetrics', ['exports', '@angular/core', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.kissmetrics = {}), global.ng.core, global.angulartics2));
}(this, (function (exports, i0, i1) { 'use strict';

    var Angulartics2Kissmetrics = /** @class */ (function () {
        function Angulartics2Kissmetrics(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            if (typeof (_kmq) === 'undefined') {
                _kmq = [];
            }
            this.angulartics2.setUsername
                .subscribe(function (x) { return _this.setUsername(x); });
            this.angulartics2.setUserProperties
                .subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2Kissmetrics.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Kissmetrics.prototype.pageTrack = function (path) {
            _kmq.push(['record', 'Pageview', { Page: path }]);
        };
        Angulartics2Kissmetrics.prototype.eventTrack = function (action, properties) {
            _kmq.push(['record', action, properties]);
        };
        Angulartics2Kissmetrics.prototype.setUsername = function (userId) {
            _kmq.push(['identify', userId]);
        };
        Angulartics2Kissmetrics.prototype.setUserProperties = function (properties) {
            _kmq.push(['set', properties]);
        };
        return Angulartics2Kissmetrics;
    }());
    Angulartics2Kissmetrics.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Kissmetrics_Factory() { return new Angulartics2Kissmetrics(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Kissmetrics, providedIn: "root" });
    Angulartics2Kissmetrics.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Kissmetrics.ctorParameters = function () { return [
        { type: i1.Angulartics2 }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2Kissmetrics = Angulartics2Kissmetrics;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-kissmetrics.umd.js.map
