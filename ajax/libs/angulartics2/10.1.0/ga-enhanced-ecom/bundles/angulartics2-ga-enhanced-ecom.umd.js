(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('angulartics2/ga-enhanced-ecom', ['exports', '@angular/core'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2['ga-enhanced-ecom'] = {}), global.ng.core));
}(this, (function (exports, i0) { 'use strict';

    var Angulartics2GoogleAnalyticsEnhancedEcommerce = /** @class */ (function () {
        function Angulartics2GoogleAnalyticsEnhancedEcommerce() {
        }
        /**
         * Add impression in GA enhanced ecommerce tracking
         * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-activities
         */
        Angulartics2GoogleAnalyticsEnhancedEcommerce.prototype.ecAddImpression = function (properties) {
            ga('ec:addImpression', properties);
        };
        /**
         * Add product in GA enhanced ecommerce tracking
         * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
         */
        Angulartics2GoogleAnalyticsEnhancedEcommerce.prototype.ecAddProduct = function (product) {
            ga('ec:addProduct', product);
        };
        /**
         * Set action in GA enhanced ecommerce tracking
         * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
         */
        Angulartics2GoogleAnalyticsEnhancedEcommerce.prototype.ecSetAction = function (action, properties) {
            ga('ec:setAction', action, properties);
        };
        return Angulartics2GoogleAnalyticsEnhancedEcommerce;
    }());
    Angulartics2GoogleAnalyticsEnhancedEcommerce.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2GoogleAnalyticsEnhancedEcommerce_Factory() { return new Angulartics2GoogleAnalyticsEnhancedEcommerce(); }, token: Angulartics2GoogleAnalyticsEnhancedEcommerce, providedIn: "root" });
    Angulartics2GoogleAnalyticsEnhancedEcommerce.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2GoogleAnalyticsEnhancedEcommerce = Angulartics2GoogleAnalyticsEnhancedEcommerce;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-ga-enhanced-ecom.umd.js.map
