(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/matomo', ['exports', '@angular/core', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2.matomo = {}), global.ng.core, global.angulartics2));
}(this, (function (exports, i0, i1) { 'use strict';

    var Angulartics2Matomo = /** @class */ (function () {
        function Angulartics2Matomo(angulartics2) {
            var _this = this;
            this.angulartics2 = angulartics2;
            if (typeof (_paq) === 'undefined') {
                console.warn('Matomo not found');
            }
            this.angulartics2.setUsername
                .subscribe(function (x) { return _this.setUsername(x); });
            this.angulartics2.setUserProperties
                .subscribe(function (x) { return _this.setUserProperties(x); });
        }
        Angulartics2Matomo.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        Angulartics2Matomo.prototype.pageTrack = function (path, title) {
            try {
                if (!window.location.origin) {
                    window.location.origin = window.location.protocol + '//'
                        + window.location.hostname
                        + (window.location.port ? ':' + window.location.port : '');
                }
                _paq.push(['setDocumentTitle', title || window.document.title]);
                _paq.push(['setCustomUrl', window.location.origin + path]);
                _paq.push(['trackPageView']);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Matomo.prototype.resetUser = function () {
            try {
                _paq.push(['appendToTrackingUrl', 'new_visit=1']); // (1) forces a new visit
                _paq.push(['deleteCookies']); // (2) deletes existing tracking cookies to start the new visit
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        /**
         * Track a basic event in Matomo, or send an ecommerce event.
         *
         * @param action A string corresponding to the type of event that needs to be tracked.
         * @param properties The properties that need to be logged with the event.
         */
        Angulartics2Matomo.prototype.eventTrack = function (action, properties) {
            var params = [];
            switch (action) {
                /**
                 * @description Sets the current page view as a product or category page view. When you call
                 * setEcommerceView it must be followed by a call to trackPageView to record the product or
                 * category page view.
                 *
                 * @link https://matomo.org/docs/ecommerce-analytics/#tracking-product-page-views-category-page-views-optional
                 * @link https://developer.matomo.org/api-reference/tracking-javascript#ecommerce
                 *
                 * @property productSKU (required) SKU: Product unique identifier
                 * @property productName (optional) Product name
                 * @property categoryName (optional) Product category, or array of up to 5 categories
                 * @property price (optional) Product Price as displayed on the page
                 */
                case 'setEcommerceView':
                    params = ['setEcommerceView', properties.productSKU,
                        properties.productName,
                        properties.categoryName,
                        properties.price,
                    ];
                    break;
                /**
                 * @description Adds a product into the ecommerce order. Must be called for each product in
                 * the order.
                 *
                 * @link https://matomo.org/docs/ecommerce-analytics/#tracking-ecommerce-orders-items-purchased-required
                 * @link https://developer.matomo.org/api-reference/tracking-javascript#ecommerce
                 *
                 * @property productSKU (required) SKU: Product unique identifier
                 * @property productName (optional) Product name
                 * @property categoryName (optional) Product category, or array of up to 5 categories
                 * @property price (recommended) Product price
                 * @property quantity (optional, default to 1) Product quantity
                 */
                case 'addEcommerceItem':
                    params = [
                        'addEcommerceItem',
                        properties.productSKU,
                        properties.productName,
                        properties.productCategory,
                        properties.price,
                        properties.quantity,
                    ];
                    break;
                /**
                 * @description Tracks a shopping cart. Call this javascript function every time a user is
                 * adding, updating or deleting a product from the cart.
                 *
                 * @link https://matomo.org/docs/ecommerce-analytics/#tracking-add-to-cart-items-added-to-the-cart-optional
                 * @link https://developer.matomo.org/api-reference/tracking-javascript#ecommerce
                 *
                 * @property grandTotal (required) Cart amount
                 */
                case 'trackEcommerceCartUpdate':
                    params = ['trackEcommerceCartUpdate', properties.grandTotal];
                    break;
                /**
                 * @description Tracks an Ecommerce order, including any ecommerce item previously added to
                 * the order. orderId and grandTotal (ie. revenue) are required parameters.
                 *
                 * @link https://matomo.org/docs/ecommerce-analytics/#tracking-ecommerce-orders-items-purchased-required
                 * @link https://developer.matomo.org/api-reference/tracking-javascript#ecommerce
                 *
                 * @property orderId (required) Unique Order ID
                 * @property grandTotal (required) Order Revenue grand total (includes tax, shipping, and subtracted discount)
                 * @property subTotal (optional) Order sub total (excludes shipping)
                 * @property tax (optional) Tax amount
                 * @property shipping (optional) Shipping amount
                 * @property discount (optional) Discount offered (set to false for unspecified parameter)
                 */
                case 'trackEcommerceOrder':
                    params = [
                        'trackEcommerceOrder',
                        properties.orderId,
                        properties.grandTotal,
                        properties.subTotal,
                        properties.tax,
                        properties.shipping,
                        properties.discount,
                    ];
                    break;
                /**
                 * @description To manually trigger an outlink
                 *
                 * @link https://matomo.org/docs/tracking-goals-web-analytics/
                 * @link https://developer.matomo.org/guides/tracking-javascript-guide#tracking-a-click-as-an-outlink-via-css-or-javascript
                 *
                 * @property url (required) link url
                 * @property linkType (optional) type of link
                 */
                case 'trackLink':
                    params = [
                        'trackLink',
                        properties.url,
                        properties.linkType
                    ];
                    break;
                /**
                 * @description Tracks an Ecommerce goal
                 *
                 * @link https://matomo.org/docs/tracking-goals-web-analytics/
                 * @link https://developer.matomo.org/guides/tracking-javascript-guide#manually-trigger-goal-conversions
                 *
                 * @property goalId (required) Unique Goal ID
                 * @property value (optional) passed to goal tracking
                 */
                case 'trackGoal':
                    params = [
                        'trackGoal',
                        properties.goalId,
                        properties.value,
                    ];
                    break;
                /**
                 * @description Tracks a site search
                 *
                 * @link https://matomo.org/docs/site-search/
                 * @link https://developer.matomo.org/guides/tracking-javascript-guide#internal-search-tracking
                 *
                 * @property keyword (required) Keyword searched for
                 * @property category (optional) Search category
                 * @property searchCount (optional) Number of results
                 */
                case 'trackSiteSearch':
                    params = [
                        'trackSiteSearch',
                        properties.keyword,
                        properties.category,
                        properties.searchCount,
                    ];
                    break;
                /**
                 * @description Logs an event with an event category (Videos, Music, Games...), an event
                 * action (Play, Pause, Duration, Add Playlist, Downloaded, Clicked...), and an optional
                 * event name and optional numeric value.
                 *
                 * @link https://matomo.org/docs/event-tracking/
                 * @link https://developer.matomo.org/api-reference/tracking-javascript#using-the-tracker-object
                 *
                 * @property category
                 * @property action
                 * @property name (optional, recommended)
                 * @property value (optional)
                 */
                default:
                    // PAQ requires that eventValue be an integer, see: http://matomo.org/docs/event-tracking
                    if (properties.value) {
                        var parsed = parseInt(properties.value, 10);
                        properties.value = isNaN(parsed) ? 0 : parsed;
                    }
                    params = [
                        'trackEvent',
                        properties.category,
                        action,
                        properties.name || properties.label,
                        properties.value,
                    ];
            }
            try {
                _paq.push(params);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Matomo.prototype.setUsername = function (userId) {
            try {
                _paq.push(['setUserId', userId]);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        /**
         * Sets custom dimensions if at least one property has the key "dimension<n>",
         * e.g. dimension10. If there are custom dimensions, any other property is ignored.
         *
         * If there are no custom dimensions in the given properties object, the properties
         * object is saved as a custom variable.
         *
         * If in doubt, prefer custom dimensions.
         * @link https://matomo.org/docs/custom-variables/
         */
        Angulartics2Matomo.prototype.setUserProperties = function (properties) {
            var dimensions = this.setCustomDimensions(properties);
            try {
                if (dimensions.length === 0) {
                    _paq.push(['setCustomVariable', properties.index, properties.name, properties.value, properties.scope]);
                }
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        /**
          * If you created a custom variable and then decide to remove this variable from
          * a visit or page view, you can use deleteCustomVariable.
          *
          * @link https://developer.matomo.org/guides/tracking-javascript-guide#deleting-a-custom-variable
          */
        Angulartics2Matomo.prototype.deletedUserProperties = function (properties) {
            try {
                _paq.push(['deleteCustomVariable', properties.index, properties.scope]);
            }
            catch (e) {
                if (!(e instanceof ReferenceError)) {
                    throw e;
                }
            }
        };
        Angulartics2Matomo.prototype.setCustomDimensions = function (properties) {
            var dimensionRegex = /dimension[1-9]\d*/;
            var dimensions = Object.keys(properties)
                .filter(function (key) { return dimensionRegex.exec(key); });
            dimensions.forEach(function (dimension) {
                var number = Number(dimension.substr(9));
                _paq.push(['setCustomDimension', number, properties[dimension]]);
            });
            return dimensions;
        };
        return Angulartics2Matomo;
    }());
    Angulartics2Matomo.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Matomo_Factory() { return new Angulartics2Matomo(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Matomo, providedIn: "root" });
    Angulartics2Matomo.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2Matomo.ctorParameters = function () { return [
        { type: i1.Angulartics2 }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2Matomo = Angulartics2Matomo;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-matomo.umd.js.map
