(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/clicky', ['exports', '@angular/core', '@angular/platform-browser', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.clicky = {}), global.ng.core, global.ng.platformBrowser, global.angulartics2));
}(this, (function (exports, i0, i2, i1) { 'use strict';

    var Angulartics2Clicky = /** @class */ (function () {
        function Angulartics2Clicky(angulartics2, titleService) {
            this.angulartics2 = angulartics2;
            this.titleService = titleService;
            if (typeof clicky === 'undefined') {
                console.warn('Angulartics 2 Clicky Plugin: clicky global not found');
            }
        }
        Angulartics2Clicky.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventOrGoalTrack(x.action, x.properties); });
        };
        /**
         * Track Page in Clicky
         *
         * @param path location
         *
         * @link https://clicky.com/help/custom/manual#log
         */
        Angulartics2Clicky.prototype.pageTrack = function (path) {
            var title = this.titleService.getTitle();
            clicky.log(path, title, 'pageview');
        };
        /**
         * Track Event Or Goal in Clicky
         *
         * @param action Action name
         * @param properties Definition of 'properties.goal' determines goal vs event tracking
         *
         * @link https://clicky.com/help/custom/manual#log
         * @link https://clicky.com/help/custom/manual#goal
         */
        Angulartics2Clicky.prototype.eventOrGoalTrack = function (action, properties) {
            if (typeof properties.goal === 'undefined') {
                var title = properties.title || null;
                var type = properties.type != null ? this.validateType(properties.type) : null;
                clicky.log(action, title, type);
            }
            else {
                var goalId = properties.goal;
                var revenue = properties.revenue;
                clicky.goal(goalId, revenue, !!properties.noQueue);
            }
        };
        Angulartics2Clicky.prototype.validateType = function (type) {
            var EventType = ['pageview', 'click', 'download', 'outbound'];
            return EventType.indexOf(type) > -1 ? type : 'pageview';
        };
        return Angulartics2Clicky;
    }());
    Angulartics2Clicky.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Clicky_Factory() { return new Angulartics2Clicky(i0.ɵɵinject(i1.Angulartics2), i0.ɵɵinject(i2.Title)); }, token: Angulartics2Clicky, providedIn: "root" });
    Angulartics2Clicky.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Clicky.ctorParameters = function () { return [
        { type: i1.Angulartics2 },
        { type: i2.Title }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2Clicky = Angulartics2Clicky;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-clicky.umd.js.map
