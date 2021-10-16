(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('angulartics2')) :
    typeof define === 'function' && define.amd ? define('angulartics2/ibm-digital-analytics', ['exports', '@angular/core', 'angulartics2'], factory) :
    (global = global || self, factory((global.angulartics2 = global.angulartics2 || {}, global.angulartics2['ibm-digital-analytics'] = {}), global.ng.core, global.angulartics2));
}(this, (function (exports, i0, i1) { 'use strict';

    var Angulartics2IBMDigitalAnalytics = /** @class */ (function () {
        function Angulartics2IBMDigitalAnalytics(angulartics2) {
            this.angulartics2 = angulartics2;
            if (typeof window['cmCreatePageviewTag'] !== 'function') {
                console.warn('Angulartics 2 IBM Digital Analytics Plugin: eluminate.js is not loaded');
            }
        }
        Angulartics2IBMDigitalAnalytics.prototype.startTracking = function () {
            var _this = this;
            this.angulartics2.pageTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.pageTrack(x.path); });
            this.angulartics2.eventTrack
                .pipe(this.angulartics2.filterDeveloperMode())
                .subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        };
        /**
         * Track Page in IBM Digital Analytics
         *
         * @param path location
         *
         * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_pageviewtag.html
         */
        Angulartics2IBMDigitalAnalytics.prototype.pageTrack = function (path) {
            var cmCreatePageviewTag = window['cmCreatePageviewTag'];
            cmCreatePageviewTag(path, null, null, null);
        };
        /**
         * Track an event in IBM Digital Analytics
         *
         * @param action A string corresponding to the type of event that needs to be tracked.
         * @param properties The properties that need to be logged with the event.
         */
        Angulartics2IBMDigitalAnalytics.prototype.eventTrack = function (action, properties) {
            if (properties === void 0) { properties = {}; }
            var cmDisplayShops = window['cmDisplayShops'];
            switch (action) {
                /**
                 * @description The Product View tag captures information about vdigitalDataiews of product detail pages.
                 *  The Product View tag should be called on the lowest level detail page for products, which is typically
                 *  the Product Details page. You can view example Product View tags below.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_prodviewtag.html
                 */
                case 'cmCreateProductviewTag':
                    var cmCreateProductviewTag = window['cmCreateProductviewTag'];
                    cmCreateProductviewTag(properties.productId, properties.productName, properties.categoryId, properties.attrbute, properties.virtualCategory);
                    break;
                /**
                 * @description The Shop Action 5 tag captures data about selected products and which products are present in a shopping cart,
                 *  if any, when the cart is viewed.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_shopact5tag.html
                 */
                case 'cmCreateShopAction5Tag':
                    var cmCreateShopAction5Tag = window['cmCreateShopAction5Tag'];
                    cmCreateShopAction5Tag(properties.productId, properties.productName, properties.quantity, properties.unitPrice, properties.categoryId, properties.attrbute, properties.extraFields, properties.virtualCategory);
                    cmDisplayShops();
                    break;
                /**
                 * @description The Shop Action 9 tag captures data about what products were purchased by a customer.
                 *  Like the Shop Action 5 tag, one tag should be sent for each product line item purchased. These tags should be sent
                 *  on the receipt or other completion page confirming a successful order.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_shopact9tag.html
                 */
                case 'cmCreateShopAction9Tag':
                    var cmCreateShopAction9Tag = window['cmCreateShopAction9Tag'];
                    cmCreateShopAction9Tag(properties.productId, properties.productName, properties.quantity, properties.unitPrice, properties.registrationId, properties.orderId, properties.orderSubtotal, properties.categoryId, properties.attrbute, properties.extraFields);
                    cmDisplayShops();
                    break;
                /**
                 * @description The Order tag captures order header information such as Registration ID, order ID, order subtotal,
                 *  and shipping and handling. The Order tag should be sent on the receipt page confirming order completion.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_ordertag.html
                 */
                case 'cmCreateOrderTag':
                    var cmCreateOrderTag = window['cmCreateOrderTag'];
                    cmCreateOrderTag(properties.orderId, properties.orderSubtotal, properties.orderShipping, properties.registrationId, properties.registrantCity, properties.registrantState, properties.registrantPostalCode, properties.attrbute, properties.extraFields);
                    break;
                /**
                 * @description The Registration tag creates a Lifetime Visitor Experience Profile (LIVE Profile) by associating a single
                 *  common Registration ID with the IBM® Digital Analytics permanent cookie set in every browser visiting the tagged site.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_registrationtag.html
                 */
                case 'cmCreateRegistrationTag':
                    var cmCreateRegistrationTag = window['cmCreateRegistrationTag'];
                    cmCreateRegistrationTag(properties.registrationId, properties.registrantEmail, properties.registrantCity, properties.registrantState, properties.registrantPostalCode, properties.registrantCountry, properties.attrbute);
                    break;
                /**
                 * @description The Element tag is used to track intra-page content in IBM® Digital Analytics. Data collected by
                 *  the Element tag is used to populate values in the Element Categories and Top Viewed Elements reports.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_elementtag.html
                 */
                case 'cmCreateElementTag':
                    var cmCreateElementTag = window['cmCreateElementTag'];
                    cmCreateElementTag(properties.elementId, properties.elementCategory, properties.attrbute);
                    break;
                /**
                 * @description The Conversion Event tag is employed for tracking of general non-commerce conversion events.
                 * The Conversion Event tag is used to populate values in the Conversion Events Reports and to create Key Segments.
                 * This tag and the reports it populates enable analysis of a wide variety of site activities.
                 *
                 * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_conversioneventtag.html
                 */
                case 'cmCreateConversionEventTag':
                    var cmCreateConversionEventTag = window['cmCreateConversionEventTag'];
                    cmCreateConversionEventTag(properties.eventId, properties.actionType, properties.eventCategoryId, properties.points, properties.attrbute, properties.extraFields);
                    break;
                default:
                    console.warn('Unsupported Event Action');
            }
        };
        return Angulartics2IBMDigitalAnalytics;
    }());
    Angulartics2IBMDigitalAnalytics.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2IBMDigitalAnalytics_Factory() { return new Angulartics2IBMDigitalAnalytics(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2IBMDigitalAnalytics, providedIn: "root" });
    Angulartics2IBMDigitalAnalytics.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Angulartics2IBMDigitalAnalytics.ctorParameters = function () { return [
        { type: i1.Angulartics2 }
    ]; };

    /**
     * Generated bundle index. Do not edit.
     */

    exports.Angulartics2IBMDigitalAnalytics = Angulartics2IBMDigitalAnalytics;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angulartics2-ibm-digital-analytics.umd.js.map
