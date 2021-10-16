(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/gtm', ['exports', '@angular/core', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.gtm = {}), global.ng.core, global.angulartics2));
}(this, (function (exports, i0, i1) { 'use strict';

    var GoogleTagManagerDefaults = /** @class */ (function () {
        function GoogleTagManagerDefaults() {
            this.userId = null;
        }
        return GoogleTagManagerDefaults;
    }());
    var Angulartics2GoogleTagManager = /** @class */ (function () {
        function Angulartics2GoogleTagManager(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            // The dataLayer needs to be initialized
            if (typeof dataLayer !== 'undefined' && dataLayer) {
                dataLayer = window.dataLayer = window.dataLayer || [];
            }
            var defaults = new GoogleTagManagerDefaults();
            // Set the default settings for this module
            this.angulartics2.settings.gtm = Object.assign(Object.assign({}, defaults), this.angulartics2.settings.gtm);
            this.angulartics2.setUsername
                .subscribe(function (x) { return _this.setUsername(x); });
        }
        Angulartics2GoogleTagManager.prototype.startTracking = function () {
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
        };
        Angulartics2GoogleTagManager.prototype.pageTrack = function (path) {
            this.pushLayer({
                event: 'Page View',
                'content-name': path,
                userId: this.angulartics2.settings.gtm.userId
            });
        };
        /**
         * Send Data Layer
         *
         * @layer data layer object
         */
        Angulartics2GoogleTagManager.prototype.pushLayer = function (layer) {
            if (typeof dataLayer !== 'undefined' && dataLayer) {
                dataLayer.push(layer);
            }
        };
        /**
         * Send interactions to the dataLayer, i.e. for event tracking in Google Analytics
         *
         * @param action associated with the event
         */
        Angulartics2GoogleTagManager.prototype.eventTrack = function (action, properties) {
            // TODO: make interface
            //  @param {string} properties.category
            //  @param {string} [properties.label]
            //  @param {number} [properties.value]
            //  @param {boolean} [properties.noninteraction]
            // Set a default GTM category
            properties = properties || {};
            this.pushLayer(Object.assign({ event: properties.event || 'interaction', target: properties.category || 'Event', action: action, label: properties.label, value: properties.value, interactionType: properties.noninteraction, userId: this.angulartics2.settings.gtm.userId }, properties.gtmCustom));
        };
        /**
         * Exception Track Event in GTM
         *
         */
        Angulartics2GoogleTagManager.prototype.exceptionTrack = function (properties) {
            // TODO: make interface
            //  @param {Object} properties
            //  @param {string} properties.appId
            //  @param {string} properties.appName
            //  @param {string} properties.appVersion
            //  @param {string} [properties.description]
            //  @param {boolean} [properties.fatal]
            if (!properties || !properties.appId || !properties.appName || !properties.appVersion) {
                console.error('Must be setted appId, appName and appVersion.');
                return;
            }
            if (properties.fatal === undefined) {
                console.log('No "fatal" provided, sending with fatal=true');
                properties.exFatal = true;
            }
            properties.exDescription = properties.event ? properties.event.stack : properties.description;
            this.eventTrack("Exception thrown for " + properties.appName + " <" + properties.appId + "@" + properties.appVersion + ">", {
                category: 'Exception',
                label: properties.exDescription,
            });
        };
        /**
         * Set userId for use with Universal Analytics User ID feature
         *
         * @param userId used to identify user cross-device in Google Analytics
         */
        Angulartics2GoogleTagManager.prototype.setUsername = function (userId) {
            this.angulartics2.settings.gtm.userId = userId;
        };
        return Angulartics2GoogleTagManager;
    }());
    Angulartics2GoogleTagManager.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2GoogleTagManager_Factory() { return new Angulartics2GoogleTagManager(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2GoogleTagManager, providedIn: "root" });
    Angulartics2GoogleTagManager.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2GoogleTagManager.ctorParameters = function () { return [
        { type: i1.Angulartics2 }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2GoogleTagManager = Angulartics2GoogleTagManager;
    exports.GoogleTagManagerDefaults = GoogleTagManagerDefaults;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-gtm.umd.js.map
