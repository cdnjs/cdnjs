(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/facebook', ['exports', '@angular/core', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.facebook = {}), global.ng.core, global.angulartics2));
}(this, (function (exports, i0, i1) { 'use strict';

    var facebookEventList = [
        'ViewContent',
        'Search',
        'AddToCart',
        'AddToWishlist',
        'InitiateCheckout',
        'AddPaymentInfo',
        'Purchase',
        'Lead',
        'CompleteRegistration',
    ];
    var Angulartics2Facebook = /** @class */ (function () {
        function Angulartics2Facebook(angulartics2) {
            this.angulartics2 = angulartics2;
        }
        Angulartics2Facebook.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        /**
         * Send interactions to the Pixel, i.e. for event tracking in Pixel
         *
         * @param action action associated with the event
         */
        Angulartics2Facebook.prototype.eventTrack = function (action, properties) {
            if (properties === void 0) { properties = {}; }
            if (typeof fbq === 'undefined') {
                return;
            }
            if (facebookEventList.indexOf(action) === -1) {
                return fbq('trackCustom', action, properties);
            }
            return fbq('track', action, properties);
        };
        return Angulartics2Facebook;
    }());
    Angulartics2Facebook.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Facebook_Factory() { return new Angulartics2Facebook(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Facebook, providedIn: "root" });
    Angulartics2Facebook.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Facebook.ctorParameters = function () { return [
        { type: i1.Angulartics2 }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2Facebook = Angulartics2Facebook;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-facebook.umd.js.map
