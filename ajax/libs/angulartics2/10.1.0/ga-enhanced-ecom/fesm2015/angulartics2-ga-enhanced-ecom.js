import { ɵɵdefineInjectable, Injectable } from '@angular/core';

class Angulartics2GoogleAnalyticsEnhancedEcommerce {
    /**
     * Add impression in GA enhanced ecommerce tracking
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-activities
     */
    ecAddImpression(properties) {
        ga('ec:addImpression', properties);
    }
    /**
     * Add product in GA enhanced ecommerce tracking
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
     */
    ecAddProduct(product) {
        ga('ec:addProduct', product);
    }
    /**
     * Set action in GA enhanced ecommerce tracking
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
     */
    ecSetAction(action, properties) {
        ga('ec:setAction', action, properties);
    }
}
Angulartics2GoogleAnalyticsEnhancedEcommerce.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2GoogleAnalyticsEnhancedEcommerce_Factory() { return new Angulartics2GoogleAnalyticsEnhancedEcommerce(); }, token: Angulartics2GoogleAnalyticsEnhancedEcommerce, providedIn: "root" });
Angulartics2GoogleAnalyticsEnhancedEcommerce.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2GoogleAnalyticsEnhancedEcommerce };
//# sourceMappingURL=angulartics2-ga-enhanced-ecom.js.map
