(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@angular/router'), require('rxjs/operators'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/appinsights', ['exports', '@angular/core', '@angular/platform-browser', '@angular/router', 'rxjs/operators', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.appinsights = {}), global.ng.core, global.ng.platformBrowser, global.ng.router, global.rxjs.operators, global.angulartics2));
}(this, (function (exports, i0, i2, i3, operators, i1) { 'use strict';

    var AppInsightsDefaults = /** @class */ (function () {
        function AppInsightsDefaults() {
            this.userId = null;
        }
        return AppInsightsDefaults;
    }());
    var Angulartics2AppInsights = /** @class */ (function () {
        function Angulartics2AppInsights(angulartics2, title, router) {
            var _this = this;
            this.angulartics2 = angulartics2;
            this.title = title;
            this.router = router;
            this.loadStartTime = null;
            this.loadTime = null;
            this.metrics = null;
            this.dimensions = null;
            this.measurements = null;
            if (typeof appInsights === 'undefined') {
                console.warn('appInsights not found');
            }
            var defaults = new AppInsightsDefaults();
            // Set the default settings for this module
            this.angulartics2.settings.appInsights = Object.assign(Object.assign({}, defaults), this.angulartics2.settings.appInsights);
            this.angulartics2.setUsername
                .subscribe(function (x) { return _this.setUsername(x); });
            this.angulartics2.setUserProperties
                .subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2AppInsights.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
            this.angulartics2.exceptionTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.exceptionTrack(x); });
            this.router.events
                .pipe(this.angulartics2.filterDeveloperMode(), operators.filter(function (event) { return event instanceof i3.NavigationStart; }))
                .subscribe(function (event) { return _this.startTimer(); });
            this.router.events
                .pipe(operators.filter(function (event) { return event instanceof i3.NavigationError || event instanceof i3.NavigationEnd; }))
                .subscribe(function (error) { return _this.stopTimer(); });
        };
        Angulartics2AppInsights.prototype.startTimer = function () {
            this.loadStartTime = Date.now();
            this.loadTime = null;
        };
        Angulartics2AppInsights.prototype.stopTimer = function () {
            this.loadTime = Date.now() - this.loadStartTime;
            this.loadStartTime = null;
        };
        /**
         * Page Track in Baidu Analytics
         *
         * @param path - Location 'path'
         *
         * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackpageview
         */
        Angulartics2AppInsights.prototype.pageTrack = function (path) {
            appInsights.trackPageView(this.title.getTitle(), path, this.dimensions, this.metrics, this.loadTime);
        };
        /**
         * Log a user action or other occurrence.
         *
         * @param name Name to identify this event in the portal.
         * @param properties Additional data used to filter events and metrics in the portal. Defaults to empty.
         *
         * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackevent
         */
        Angulartics2AppInsights.prototype.eventTrack = function (name, properties) {
            appInsights.trackEvent(name, properties, this.measurements);
        };
        /**
         * Exception Track Event in GA
         *
         * @param properties - Comprised of the mandatory fields 'appId' (string), 'appName' (string) and 'appVersion' (string) and
         * optional fields 'fatal' (boolean) and 'description' (string), error
         *
         * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackexception
         */
        Angulartics2AppInsights.prototype.exceptionTrack = function (properties) {
            var description = properties.event || properties.description || properties;
            appInsights.trackException(description);
        };
        /**
         * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#setauthenticatedusercontext
         */
        Angulartics2AppInsights.prototype.setUsername = function (userId) {
            this.angulartics2.settings.appInsights.userId = userId;
            appInsights.setAuthenticatedUserContext(userId);
        };
        Angulartics2AppInsights.prototype.setUserProperties = function (properties) {
            if (properties.userId) {
                this.angulartics2.settings.appInsights.userId = properties.userId;
            }
            if (properties.accountId) {
                appInsights.setAuthenticatedUserContext(this.angulartics2.settings.appInsights.userId, properties.accountId);
            }
            else {
                appInsights.setAuthenticatedUserContext(this.angulartics2.settings.appInsights.userId);
            }
        };
        return Angulartics2AppInsights;
    }());
    Angulartics2AppInsights.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2AppInsights_Factory() { return new Angulartics2AppInsights(i0.ɵɵinject(i1.Angulartics2), i0.ɵɵinject(i2.Title), i0.ɵɵinject(i3.Router)); }, token: Angulartics2AppInsights, providedIn: "root" });
    Angulartics2AppInsights.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2AppInsights.ctorParameters = function () { return [
        { type: i1.Angulartics2 },
        { type: i2.Title },
        { type: i3.Router }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2AppInsights = Angulartics2AppInsights;
    exports.AppInsightsDefaults = AppInsightsDefaults;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-appinsights.umd.js.map
