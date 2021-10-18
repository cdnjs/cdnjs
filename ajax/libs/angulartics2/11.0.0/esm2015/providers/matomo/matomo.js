import { Injectable } from '@angular/core';
import { Angulartics2 } from '../../angulartics2-core';
import * as i0 from "@angular/core";
import * as i1 from "../../angulartics2-core";
export class Angulartics2Matomo {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        if (typeof _paq === 'undefined') {
            console.warn('Matomo not found');
        }
        this.angulartics2.setUsername.subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties.subscribe((x) => this.setUserProperties(x));
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.eventTrack(x.action, x.properties));
    }
    pageTrack(path, title) {
        try {
            if (!window.location.origin) {
                window.location.origin =
                    window.location.protocol +
                        '//' +
                        window.location.hostname +
                        (window.location.port ? ':' + window.location.port : '');
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
    }
    resetUser() {
        try {
            _paq.push(['appendToTrackingUrl', 'new_visit=1']); // (1) forces a new visit
            _paq.push(['deleteCookies']); // (2) deletes existing tracking cookies to start the new visit
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    /**
     * Track a basic event in Matomo, or send an ecommerce event.
     *
     * @param action A string corresponding to the type of event that needs to be tracked.
     * @param properties The properties that need to be logged with the event.
     */
    eventTrack(action, properties) {
        let params = [];
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
                params = [
                    'setEcommerceView',
                    properties.productSKU,
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
                params = [
                    'trackEcommerceCartUpdate',
                    properties.grandTotal,
                ];
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
                    properties.linkType,
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
                    const parsed = parseInt(properties.value, 10);
                    properties.value = isNaN(parsed) ? 0 : parsed;
                }
                params = [
                    'trackEvent',
                    properties.category,
                    action,
                    properties.name ||
                        properties.label,
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
    }
    setUsername(userId) {
        try {
            _paq.push(['setUserId', userId]);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
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
    setUserProperties(properties) {
        const dimensions = this.setCustomDimensions(properties);
        try {
            if (dimensions.length === 0) {
                _paq.push([
                    'setCustomVariable',
                    properties.index,
                    properties.name,
                    properties.value,
                    properties.scope,
                ]);
            }
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    /**
     * If you created a custom variable and then decide to remove this variable from
     * a visit or page view, you can use deleteCustomVariable.
     *
     * @link https://developer.matomo.org/guides/tracking-javascript-guide#deleting-a-custom-variable
     */
    deletedUserProperties(properties) {
        try {
            _paq.push(['deleteCustomVariable', properties.index, properties.scope]);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setCustomDimensions(properties) {
        const dimensionRegex = /dimension[1-9]\d*/;
        const dimensions = Object.keys(properties).filter(key => dimensionRegex.exec(key));
        dimensions.forEach(dimension => {
            const number = Number(dimension.substr(9));
            _paq.push(['setCustomDimension', number, properties[dimension]]);
        });
        return dimensions;
    }
}
Angulartics2Matomo.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Matomo_Factory() { return new Angulartics2Matomo(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Matomo, providedIn: "root" });
Angulartics2Matomo.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2Matomo.ctorParameters = () => [
    { type: Angulartics2 }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0b21vLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wcm92aWRlcnMvbWF0b21vL21hdG9tby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7O0FBdUl2RCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzVDLElBQUksT0FBTyxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNsQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBb0MsRUFBRSxFQUFFLENBQ3JGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FDMUIsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVU7YUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVB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SSxDQUFDLENBQUMsQ0FBQyxZQUFZLGNBQWMsQ0FBQyxFQUFFO2dCQUNsQyxNQUFNLENBQUMsQ0FBQzthQUNUO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sbUJBQW1CLENBQUMsVUFBNkM7UUFDdkUsTUFBTSxjQUFjLEdBQVcsbUJBQW1CLENBQUM7UUFDbkQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkYsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM3QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Ozs7WUEzVEYsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7O1lBdEl6QixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICcuLi8uLi9hbmd1bGFydGljczItY29yZSc7XG5cbmRlY2xhcmUgdmFyIF9wYXE6IGFueTtcblxuZXhwb3J0IHR5cGUgRXZlbnRUcmFja0FjdGlvbiA9XG4gIHwgJ3NldEVjb21tZXJjZVZpZXcnXG4gIHwgJ2FkZEVjb21tZXJjZUl0ZW0nXG4gIHwgJ3RyYWNrRWNvbW1lcmNlQ2FydFVwZGF0ZSdcbiAgfCAndHJhY2tFY29tbWVyY2VPcmRlcidcbiAgfCAndHJhY2tMaW5rJ1xuICB8ICd0cmFja0dvYWwnXG4gIHwgJ3RyYWNrU2l0ZVNlYXJjaCdcbiAgfCBzdHJpbmc7XG5cbmV4cG9ydCB0eXBlIFNjb3BlTWF0b21vID0gJ3Zpc2l0JyB8ICdwYWdlJztcblxuZXhwb3J0IGludGVyZmFjZSBEaW1lbnNpb25zTWF0b21vUHJvcGVydGllcyB7XG4gIGRpbWVuc2lvbjA/OiBzdHJpbmc7XG4gIGRpbWVuc2lvbjE/OiBzdHJpbmc7XG4gIGRpbWVuc2lvbjI/OiBzdHJpbmc7XG4gIGRpbWVuc2lvbjM/OiBzdHJpbmc7XG4gIGRpbWVuc2lvbjQ/OiBzdHJpbmc7XG4gIGRpbWVuc2lvbjU/OiBzdHJpbmc7XG4gIGRpbWVuc2lvbjY/OiBzdHJpbmc7XG4gIGRpbWVuc2lvbjc/OiBzdHJpbmc7XG4gIGRpbWVuc2lvbjg/OiBzdHJpbmc7XG4gIGRpbWVuc2lvbjk/OiBzdHJpbmc7XG59XG5leHBvcnQgaW50ZXJmYWNlIFNldEVjb21tZXJjZVZpZXdNYXRvbW9Qcm9wZXJ0aWVzIHtcbiAgLyoqIEBjbGFzcyBTZXRFY29tbWVyY2VWaWV3TWF0b21vUHJvcGVydGllcyAqL1xuICBwcm9kdWN0U0tVOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgU2V0RWNvbW1lcmNlVmlld01hdG9tb1Byb3BlcnRpZXMgKi9cbiAgcHJvZHVjdE5hbWU6IHN0cmluZztcbiAgLyoqIEBjbGFzcyBTZXRFY29tbWVyY2VWaWV3TWF0b21vUHJvcGVydGllcyAqL1xuICBjYXRlZ29yeU5hbWU6IHN0cmluZztcbiAgLyoqIEBjbGFzcyBTZXRFY29tbWVyY2VWaWV3TWF0b21vUHJvcGVydGllcyAqL1xuICBwcmljZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFkZEVjb21tZXJjZUl0ZW1Qcm9wZXJ0aWVzIHtcbiAgLyoqIEBjbGFzcyBBZGRFY29tbWVyY2VJdGVtUHJvcGVydGllcyAqL1xuICBwcm9kdWN0U0tVOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgQWRkRWNvbW1lcmNlSXRlbVByb3BlcnRpZXMgKi9cbiAgcHJvZHVjdE5hbWU6IHN0cmluZztcbiAgLyoqIEBjbGFzcyBBZGRFY29tbWVyY2VJdGVtUHJvcGVydGllcyAqL1xuICBwcm9kdWN0Q2F0ZWdvcnk6IHN0cmluZztcbiAgLyoqIEBjbGFzcyBBZGRFY29tbWVyY2VJdGVtUHJvcGVydGllcyAqL1xuICBwcmljZTogc3RyaW5nO1xuICAvKiogQGNsYXNzIEFkZEVjb21tZXJjZUl0ZW1Qcm9wZXJ0aWVzICovXG4gIHF1YW50aXR5OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhY2tFY29tbWVyY2VDYXJ0VXBkYXRlTWF0b21vUHJvcGVydGllcyB7XG4gIC8qKiBAY2xhc3MgVHJhY2tFY29tbWVyY2VDYXJ0VXBkYXRlTWF0b21vUHJvcGVydGllcyAqL1xuICBncmFuZFRvdGFsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhY2tFY29tbWVyY2VPcmRlck1hdG9tb1Byb3BlcnRpZXMge1xuICAvKiogQGNsYXNzIFRyYWNrRWNvbW1lcmNlT3JkZXJNYXRvbW9Qcm9wZXJ0aWVzICovXG4gIG9yZGVySWQ6IHN0cmluZztcbiAgLyoqIEBjbGFzcyBUcmFja0Vjb21tZXJjZU9yZGVyTWF0b21vUHJvcGVydGllcyAqL1xuICBncmFuZFRvdGFsOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgVHJhY2tFY29tbWVyY2VPcmRlck1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgc3ViVG90YWw6IHN0cmluZztcbiAgLyoqIEBjbGFzcyBUcmFja0Vjb21tZXJjZU9yZGVyTWF0b21vUHJvcGVydGllcyAqL1xuICB0YXg6IHN0cmluZztcbiAgLyoqIEBjbGFzcyBUcmFja0Vjb21tZXJjZU9yZGVyTWF0b21vUHJvcGVydGllcyAqL1xuICBzaGlwcGluZzogc3RyaW5nO1xuICAvKiogQGNsYXNzIFRyYWNrRWNvbW1lcmNlT3JkZXJNYXRvbW9Qcm9wZXJ0aWVzICovXG4gIGRpc2NvdW50OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhY2tMaW5rTWF0b21vUHJvcGVydGllcyB7XG4gIC8qKiBAY2xhc3MgVHJhY2tMaW5rTWF0b21vUHJvcGVydGllcyAqL1xuICB1cmw6IHN0cmluZztcbiAgLyoqIEBjbGFzcyBUcmFja0xpbmtNYXRvbW9Qcm9wZXJ0aWVzICovXG4gIGxpbmtUeXBlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhY2tHb2FsTWF0b21vUHJvcGVydGllcyB7XG4gIC8qKiBAY2xhc3MgVHJhY2tHb2FsTWF0b21vUHJvcGVydGllcyAqL1xuICBnb2FsSWQ6IHN0cmluZztcbiAgLyoqIEBjbGFzcyBUcmFja0dvYWxNYXRvbW9Qcm9wZXJ0aWVzICovXG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhY2tTaXRlU2VhcmNoTWF0b21vUHJvcGVydGllcyB7XG4gIC8qKiBAY2xhc3MgVHJhY2tTaXRlU2VhcmNoTWF0b21vUHJvcGVydGllcyAqL1xuICBrZXl3b3JkOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgVHJhY2tTaXRlU2VhcmNoTWF0b21vUHJvcGVydGllcyAqL1xuICBjYXRlZ29yeTogc3RyaW5nO1xuICAvKiogQGNsYXNzIFRyYWNrU2l0ZVNlYXJjaE1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgc2VhcmNoQ291bnQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUcmFja0V2ZW50TWF0b21vUHJvcGVydGllcyB7XG4gIC8qKiBAY2xhc3MgVHJhY2tFdmVudE1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgY2F0ZWdvcnk6IHN0cmluZztcbiAgLyoqIEBjbGFzcyBUcmFja0V2ZW50TWF0b21vUHJvcGVydGllcyAqL1xuICBuYW1lPzogc3RyaW5nO1xuICAvKiogQGNsYXNzIFRyYWNrRXZlbnRNYXRvbW9Qcm9wZXJ0aWVzICovXG4gIGxhYmVsPzogc3RyaW5nO1xuICAvKiogQGNsYXNzIFRyYWNrRXZlbnRNYXRvbW9Qcm9wZXJ0aWVzICovXG4gIHZhbHVlOiBudW1iZXIgfCBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2V0Q3VzdG9tVmFyaWFibGVNYXRvbW9Qcm9wZXJ0aWVzIGV4dGVuZHMgRGltZW5zaW9uc01hdG9tb1Byb3BlcnRpZXMge1xuICAvKiogQGNsYXNzIFNldEN1c3RvbVZhcmlhYmxlTWF0b21vUHJvcGVydGllcyAqL1xuICBpbmRleDogbnVtYmVyO1xuICAvKiogQGNsYXNzIFNldEN1c3RvbVZhcmlhYmxlTWF0b21vUHJvcGVydGllcyAqL1xuICBuYW1lOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgU2V0Q3VzdG9tVmFyaWFibGVNYXRvbW9Qcm9wZXJ0aWVzICovXG4gIHZhbHVlOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgU2V0Q3VzdG9tVmFyaWFibGVNYXRvbW9Qcm9wZXJ0aWVzICovXG4gIHNjb3BlOiBTY29wZU1hdG9tbztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEZWxldGVDdXN0b21WYXJpYWJsZU1hdG9tb1Byb3BlcnRpZXMge1xuICAvKiogQGNsYXNzIERlbGV0ZUN1c3RvbVZhcmlhYmxlTWF0b21vUHJvcGVydGllcyAqL1xuICBpbmRleDogbnVtYmVyO1xuICAvKiogQGNsYXNzIERlbGV0ZUN1c3RvbVZhcmlhYmxlTWF0b21vUHJvcGVydGllcyAqL1xuICBzY29wZTogU2NvcGVNYXRvbW87XG59XG5cbmV4cG9ydCB0eXBlIEV2ZW50VHJhY2thY3Rpb25Qcm9wZXJ0aWVzID1cbiAgfCBTZXRFY29tbWVyY2VWaWV3TWF0b21vUHJvcGVydGllc1xuICB8IEFkZEVjb21tZXJjZUl0ZW1Qcm9wZXJ0aWVzXG4gIHwgVHJhY2tFY29tbWVyY2VDYXJ0VXBkYXRlTWF0b21vUHJvcGVydGllc1xuICB8IFRyYWNrRWNvbW1lcmNlT3JkZXJNYXRvbW9Qcm9wZXJ0aWVzXG4gIHwgVHJhY2tMaW5rTWF0b21vUHJvcGVydGllc1xuICB8IFRyYWNrR29hbE1hdG9tb1Byb3BlcnRpZXNcbiAgfCBUcmFja1NpdGVTZWFyY2hNYXRvbW9Qcm9wZXJ0aWVzXG4gIHwgVHJhY2tFdmVudE1hdG9tb1Byb3BlcnRpZXM7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyTWF0b21vIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMikge1xuICAgIGlmICh0eXBlb2YgX3BhcSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2FybignTWF0b21vIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VybmFtZS5zdWJzY3JpYmUoKHg6IHN0cmluZykgPT4gdGhpcy5zZXRVc2VybmFtZSh4KSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlclByb3BlcnRpZXMuc3Vic2NyaWJlKCh4OiBTZXRDdXN0b21WYXJpYWJsZU1hdG9tb1Byb3BlcnRpZXMpID0+XG4gICAgICB0aGlzLnNldFVzZXJQcm9wZXJ0aWVzKHgpLFxuICAgICk7XG4gIH1cblxuICBzdGFydFRyYWNraW5nKCk6IHZvaWQge1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnBhZ2VUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSh4ID0+IHRoaXMucGFnZVRyYWNrKHgucGF0aCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLmV2ZW50VHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB0aGlzLmV2ZW50VHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xuICB9XG5cbiAgcGFnZVRyYWNrKHBhdGg6IHN0cmluZywgdGl0bGU/OiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCF3aW5kb3cubG9jYXRpb24ub3JpZ2luKSB7XG4gICAgICAgICh3aW5kb3cubG9jYXRpb24gYXMgYW55KS5vcmlnaW4gPVxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCArXG4gICAgICAgICAgJy8vJyArXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lICtcbiAgICAgICAgICAod2luZG93LmxvY2F0aW9uLnBvcnQgPyAnOicgKyB3aW5kb3cubG9jYXRpb24ucG9ydCA6ICcnKTtcbiAgICAgIH1cbiAgICAgIF9wYXEucHVzaChbJ3NldERvY3VtZW50VGl0bGUnLCB0aXRsZSB8fCB3aW5kb3cuZG9jdW1lbnQudGl0bGVdKTtcbiAgICAgIF9wYXEucHVzaChbJ3NldEN1c3RvbVVybCcsIHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyBwYXRoXSk7XG4gICAgICBfcGFxLnB1c2goWyd0cmFja1BhZ2VWaWV3J10pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXNldFVzZXIoKSB7XG4gICAgdHJ5IHtcbiAgICAgIF9wYXEucHVzaChbJ2FwcGVuZFRvVHJhY2tpbmdVcmwnLCAnbmV3X3Zpc2l0PTEnXSk7IC8vICgxKSBmb3JjZXMgYSBuZXcgdmlzaXRcbiAgICAgIF9wYXEucHVzaChbJ2RlbGV0ZUNvb2tpZXMnXSk7IC8vICgyKSBkZWxldGVzIGV4aXN0aW5nIHRyYWNraW5nIGNvb2tpZXMgdG8gc3RhcnQgdGhlIG5ldyB2aXNpdFxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBldmVudFRyYWNrKGFjdGlvbjogJ3NldEVjb21tZXJjZVZpZXcnLCBwcm9wZXJ0aWVzOiBTZXRFY29tbWVyY2VWaWV3TWF0b21vUHJvcGVydGllcyk6IHZvaWQ7XG4gIGV2ZW50VHJhY2soYWN0aW9uOiAnYWRkRWNvbW1lcmNlSXRlbScsIHByb3BlcnRpZXM6IEFkZEVjb21tZXJjZUl0ZW1Qcm9wZXJ0aWVzKTogdm9pZDtcbiAgZXZlbnRUcmFjayhcbiAgICBhY3Rpb246ICd0cmFja0Vjb21tZXJjZUNhcnRVcGRhdGUnLFxuICAgIHByb3BlcnRpZXM6IFRyYWNrRWNvbW1lcmNlQ2FydFVwZGF0ZU1hdG9tb1Byb3BlcnRpZXMsXG4gICk6IHZvaWQ7XG4gIGV2ZW50VHJhY2soYWN0aW9uOiAndHJhY2tFY29tbWVyY2VPcmRlcicsIHByb3BlcnRpZXM6IFRyYWNrRWNvbW1lcmNlT3JkZXJNYXRvbW9Qcm9wZXJ0aWVzKTogdm9pZDtcbiAgZXZlbnRUcmFjayhhY3Rpb246ICd0cmFja0xpbmsnLCBwcm9wZXJ0aWVzOiBUcmFja0xpbmtNYXRvbW9Qcm9wZXJ0aWVzKTogdm9pZDtcbiAgZXZlbnRUcmFjayhhY3Rpb246ICd0cmFja0dvYWwnLCBwcm9wZXJ0aWVzOiBUcmFja0dvYWxNYXRvbW9Qcm9wZXJ0aWVzKTogdm9pZDtcbiAgZXZlbnRUcmFjayhhY3Rpb246ICd0cmFja1NpdGVTZWFyY2gnLCBwcm9wZXJ0aWVzOiBUcmFja1NpdGVTZWFyY2hNYXRvbW9Qcm9wZXJ0aWVzKTogdm9pZDtcbiAgZXZlbnRUcmFjayhhY3Rpb246IHN0cmluZywgcHJvcGVydGllczogVHJhY2tFdmVudE1hdG9tb1Byb3BlcnRpZXMpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBUcmFjayBhIGJhc2ljIGV2ZW50IGluIE1hdG9tbywgb3Igc2VuZCBhbiBlY29tbWVyY2UgZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSBhY3Rpb24gQSBzdHJpbmcgY29ycmVzcG9uZGluZyB0byB0aGUgdHlwZSBvZiBldmVudCB0aGF0IG5lZWRzIHRvIGJlIHRyYWNrZWQuXG4gICAqIEBwYXJhbSBwcm9wZXJ0aWVzIFRoZSBwcm9wZXJ0aWVzIHRoYXQgbmVlZCB0byBiZSBsb2dnZWQgd2l0aCB0aGUgZXZlbnQuXG4gICAqL1xuICBldmVudFRyYWNrKGFjdGlvbjogRXZlbnRUcmFja0FjdGlvbiwgcHJvcGVydGllcz86IEV2ZW50VHJhY2thY3Rpb25Qcm9wZXJ0aWVzKSB7XG4gICAgbGV0IHBhcmFtcyA9IFtdO1xuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAvKipcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBTZXRzIHRoZSBjdXJyZW50IHBhZ2UgdmlldyBhcyBhIHByb2R1Y3Qgb3IgY2F0ZWdvcnkgcGFnZSB2aWV3LiBXaGVuIHlvdSBjYWxsXG4gICAgICAgKiBzZXRFY29tbWVyY2VWaWV3IGl0IG11c3QgYmUgZm9sbG93ZWQgYnkgYSBjYWxsIHRvIHRyYWNrUGFnZVZpZXcgdG8gcmVjb3JkIHRoZSBwcm9kdWN0IG9yXG4gICAgICAgKiBjYXRlZ29yeSBwYWdlIHZpZXcuXG4gICAgICAgKlxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9tYXRvbW8ub3JnL2RvY3MvZWNvbW1lcmNlLWFuYWx5dGljcy8jdHJhY2tpbmctcHJvZHVjdC1wYWdlLXZpZXdzLWNhdGVnb3J5LXBhZ2Utdmlld3Mtb3B0aW9uYWxcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1hdG9tby5vcmcvYXBpLXJlZmVyZW5jZS90cmFja2luZy1qYXZhc2NyaXB0I2Vjb21tZXJjZVxuICAgICAgICpcbiAgICAgICAqIEBwcm9wZXJ0eSBwcm9kdWN0U0tVIChyZXF1aXJlZCkgU0tVOiBQcm9kdWN0IHVuaXF1ZSBpZGVudGlmaWVyXG4gICAgICAgKiBAcHJvcGVydHkgcHJvZHVjdE5hbWUgKG9wdGlvbmFsKSBQcm9kdWN0IG5hbWVcbiAgICAgICAqIEBwcm9wZXJ0eSBjYXRlZ29yeU5hbWUgKG9wdGlvbmFsKSBQcm9kdWN0IGNhdGVnb3J5LCBvciBhcnJheSBvZiB1cCB0byA1IGNhdGVnb3JpZXNcbiAgICAgICAqIEBwcm9wZXJ0eSBwcmljZSAob3B0aW9uYWwpIFByb2R1Y3QgUHJpY2UgYXMgZGlzcGxheWVkIG9uIHRoZSBwYWdlXG4gICAgICAgKi9cbiAgICAgIGNhc2UgJ3NldEVjb21tZXJjZVZpZXcnOlxuICAgICAgICBwYXJhbXMgPSBbXG4gICAgICAgICAgJ3NldEVjb21tZXJjZVZpZXcnLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFNldEVjb21tZXJjZVZpZXdNYXRvbW9Qcm9wZXJ0aWVzKS5wcm9kdWN0U0tVLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFNldEVjb21tZXJjZVZpZXdNYXRvbW9Qcm9wZXJ0aWVzKS5wcm9kdWN0TmFtZSxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBTZXRFY29tbWVyY2VWaWV3TWF0b21vUHJvcGVydGllcykuY2F0ZWdvcnlOYW1lLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFNldEVjb21tZXJjZVZpZXdNYXRvbW9Qcm9wZXJ0aWVzKS5wcmljZSxcbiAgICAgICAgXTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8qKlxuICAgICAgICogQGRlc2NyaXB0aW9uIEFkZHMgYSBwcm9kdWN0IGludG8gdGhlIGVjb21tZXJjZSBvcmRlci4gTXVzdCBiZSBjYWxsZWQgZm9yIGVhY2ggcHJvZHVjdCBpblxuICAgICAgICogdGhlIG9yZGVyLlxuICAgICAgICpcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vbWF0b21vLm9yZy9kb2NzL2Vjb21tZXJjZS1hbmFseXRpY3MvI3RyYWNraW5nLWVjb21tZXJjZS1vcmRlcnMtaXRlbXMtcHVyY2hhc2VkLXJlcXVpcmVkXG4gICAgICAgKiBAbGluayBodHRwczovL2RldmVsb3Blci5tYXRvbW8ub3JnL2FwaS1yZWZlcmVuY2UvdHJhY2tpbmctamF2YXNjcmlwdCNlY29tbWVyY2VcbiAgICAgICAqXG4gICAgICAgKiBAcHJvcGVydHkgcHJvZHVjdFNLVSAocmVxdWlyZWQpIFNLVTogUHJvZHVjdCB1bmlxdWUgaWRlbnRpZmllclxuICAgICAgICogQHByb3BlcnR5IHByb2R1Y3ROYW1lIChvcHRpb25hbCkgUHJvZHVjdCBuYW1lXG4gICAgICAgKiBAcHJvcGVydHkgY2F0ZWdvcnlOYW1lIChvcHRpb25hbCkgUHJvZHVjdCBjYXRlZ29yeSwgb3IgYXJyYXkgb2YgdXAgdG8gNSBjYXRlZ29yaWVzXG4gICAgICAgKiBAcHJvcGVydHkgcHJpY2UgKHJlY29tbWVuZGVkKSBQcm9kdWN0IHByaWNlXG4gICAgICAgKiBAcHJvcGVydHkgcXVhbnRpdHkgKG9wdGlvbmFsLCBkZWZhdWx0IHRvIDEpIFByb2R1Y3QgcXVhbnRpdHlcbiAgICAgICAqL1xuICAgICAgY2FzZSAnYWRkRWNvbW1lcmNlSXRlbSc6XG4gICAgICAgIHBhcmFtcyA9IFtcbiAgICAgICAgICAnYWRkRWNvbW1lcmNlSXRlbScsXG4gICAgICAgICAgKHByb3BlcnRpZXMgYXMgQWRkRWNvbW1lcmNlSXRlbVByb3BlcnRpZXMpLnByb2R1Y3RTS1UsXG4gICAgICAgICAgKHByb3BlcnRpZXMgYXMgQWRkRWNvbW1lcmNlSXRlbVByb3BlcnRpZXMpLnByb2R1Y3ROYW1lLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIEFkZEVjb21tZXJjZUl0ZW1Qcm9wZXJ0aWVzKS5wcm9kdWN0Q2F0ZWdvcnksXG4gICAgICAgICAgKHByb3BlcnRpZXMgYXMgQWRkRWNvbW1lcmNlSXRlbVByb3BlcnRpZXMpLnByaWNlLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIEFkZEVjb21tZXJjZUl0ZW1Qcm9wZXJ0aWVzKS5xdWFudGl0eSxcbiAgICAgICAgXTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8qKlxuICAgICAgICogQGRlc2NyaXB0aW9uIFRyYWNrcyBhIHNob3BwaW5nIGNhcnQuIENhbGwgdGhpcyBqYXZhc2NyaXB0IGZ1bmN0aW9uIGV2ZXJ5IHRpbWUgYSB1c2VyIGlzXG4gICAgICAgKiBhZGRpbmcsIHVwZGF0aW5nIG9yIGRlbGV0aW5nIGEgcHJvZHVjdCBmcm9tIHRoZSBjYXJ0LlxuICAgICAgICpcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vbWF0b21vLm9yZy9kb2NzL2Vjb21tZXJjZS1hbmFseXRpY3MvI3RyYWNraW5nLWFkZC10by1jYXJ0LWl0ZW1zLWFkZGVkLXRvLXRoZS1jYXJ0LW9wdGlvbmFsXG4gICAgICAgKiBAbGluayBodHRwczovL2RldmVsb3Blci5tYXRvbW8ub3JnL2FwaS1yZWZlcmVuY2UvdHJhY2tpbmctamF2YXNjcmlwdCNlY29tbWVyY2VcbiAgICAgICAqXG4gICAgICAgKiBAcHJvcGVydHkgZ3JhbmRUb3RhbCAocmVxdWlyZWQpIENhcnQgYW1vdW50XG4gICAgICAgKi9cbiAgICAgIGNhc2UgJ3RyYWNrRWNvbW1lcmNlQ2FydFVwZGF0ZSc6XG4gICAgICAgIHBhcmFtcyA9IFtcbiAgICAgICAgICAndHJhY2tFY29tbWVyY2VDYXJ0VXBkYXRlJyxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0Vjb21tZXJjZUNhcnRVcGRhdGVNYXRvbW9Qcm9wZXJ0aWVzKS5ncmFuZFRvdGFsLFxuICAgICAgICBdO1xuICAgICAgICBicmVhaztcblxuICAgICAgLyoqXG4gICAgICAgKiBAZGVzY3JpcHRpb24gVHJhY2tzIGFuIEVjb21tZXJjZSBvcmRlciwgaW5jbHVkaW5nIGFueSBlY29tbWVyY2UgaXRlbSBwcmV2aW91c2x5IGFkZGVkIHRvXG4gICAgICAgKiB0aGUgb3JkZXIuIG9yZGVySWQgYW5kIGdyYW5kVG90YWwgKGllLiByZXZlbnVlKSBhcmUgcmVxdWlyZWQgcGFyYW1ldGVycy5cbiAgICAgICAqXG4gICAgICAgKiBAbGluayBodHRwczovL21hdG9tby5vcmcvZG9jcy9lY29tbWVyY2UtYW5hbHl0aWNzLyN0cmFja2luZy1lY29tbWVyY2Utb3JkZXJzLWl0ZW1zLXB1cmNoYXNlZC1yZXF1aXJlZFxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubWF0b21vLm9yZy9hcGktcmVmZXJlbmNlL3RyYWNraW5nLWphdmFzY3JpcHQjZWNvbW1lcmNlXG4gICAgICAgKlxuICAgICAgICogQHByb3BlcnR5IG9yZGVySWQgKHJlcXVpcmVkKSBVbmlxdWUgT3JkZXIgSURcbiAgICAgICAqIEBwcm9wZXJ0eSBncmFuZFRvdGFsIChyZXF1aXJlZCkgT3JkZXIgUmV2ZW51ZSBncmFuZCB0b3RhbCAoaW5jbHVkZXMgdGF4LCBzaGlwcGluZywgYW5kIHN1YnRyYWN0ZWQgZGlzY291bnQpXG4gICAgICAgKiBAcHJvcGVydHkgc3ViVG90YWwgKG9wdGlvbmFsKSBPcmRlciBzdWIgdG90YWwgKGV4Y2x1ZGVzIHNoaXBwaW5nKVxuICAgICAgICogQHByb3BlcnR5IHRheCAob3B0aW9uYWwpIFRheCBhbW91bnRcbiAgICAgICAqIEBwcm9wZXJ0eSBzaGlwcGluZyAob3B0aW9uYWwpIFNoaXBwaW5nIGFtb3VudFxuICAgICAgICogQHByb3BlcnR5IGRpc2NvdW50IChvcHRpb25hbCkgRGlzY291bnQgb2ZmZXJlZCAoc2V0IHRvIGZhbHNlIGZvciB1bnNwZWNpZmllZCBwYXJhbWV0ZXIpXG4gICAgICAgKi9cbiAgICAgIGNhc2UgJ3RyYWNrRWNvbW1lcmNlT3JkZXInOlxuICAgICAgICBwYXJhbXMgPSBbXG4gICAgICAgICAgJ3RyYWNrRWNvbW1lcmNlT3JkZXInLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrRWNvbW1lcmNlT3JkZXJNYXRvbW9Qcm9wZXJ0aWVzKS5vcmRlcklkLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrRWNvbW1lcmNlT3JkZXJNYXRvbW9Qcm9wZXJ0aWVzKS5ncmFuZFRvdGFsLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrRWNvbW1lcmNlT3JkZXJNYXRvbW9Qcm9wZXJ0aWVzKS5zdWJUb3RhbCxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0Vjb21tZXJjZU9yZGVyTWF0b21vUHJvcGVydGllcykudGF4LFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrRWNvbW1lcmNlT3JkZXJNYXRvbW9Qcm9wZXJ0aWVzKS5zaGlwcGluZyxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0Vjb21tZXJjZU9yZGVyTWF0b21vUHJvcGVydGllcykuZGlzY291bnQsXG4gICAgICAgIF07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvKipcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUbyBtYW51YWxseSB0cmlnZ2VyIGFuIG91dGxpbmtcbiAgICAgICAqXG4gICAgICAgKiBAbGluayBodHRwczovL21hdG9tby5vcmcvZG9jcy90cmFja2luZy1nb2Fscy13ZWItYW5hbHl0aWNzL1xuICAgICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubWF0b21vLm9yZy9ndWlkZXMvdHJhY2tpbmctamF2YXNjcmlwdC1ndWlkZSN0cmFja2luZy1hLWNsaWNrLWFzLWFuLW91dGxpbmstdmlhLWNzcy1vci1qYXZhc2NyaXB0XG4gICAgICAgKlxuICAgICAgICogQHByb3BlcnR5IHVybCAocmVxdWlyZWQpIGxpbmsgdXJsXG4gICAgICAgKiBAcHJvcGVydHkgbGlua1R5cGUgKG9wdGlvbmFsKSB0eXBlIG9mIGxpbmtcbiAgICAgICAqL1xuICAgICAgY2FzZSAndHJhY2tMaW5rJzpcbiAgICAgICAgcGFyYW1zID0gW1xuICAgICAgICAgICd0cmFja0xpbmsnLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrTGlua01hdG9tb1Byb3BlcnRpZXMpLnVybCxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0xpbmtNYXRvbW9Qcm9wZXJ0aWVzKS5saW5rVHlwZSxcbiAgICAgICAgXTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8qKlxuICAgICAgICogQGRlc2NyaXB0aW9uIFRyYWNrcyBhbiBFY29tbWVyY2UgZ29hbFxuICAgICAgICpcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vbWF0b21vLm9yZy9kb2NzL3RyYWNraW5nLWdvYWxzLXdlYi1hbmFseXRpY3MvXG4gICAgICAgKiBAbGluayBodHRwczovL2RldmVsb3Blci5tYXRvbW8ub3JnL2d1aWRlcy90cmFja2luZy1qYXZhc2NyaXB0LWd1aWRlI21hbnVhbGx5LXRyaWdnZXItZ29hbC1jb252ZXJzaW9uc1xuICAgICAgICpcbiAgICAgICAqIEBwcm9wZXJ0eSBnb2FsSWQgKHJlcXVpcmVkKSBVbmlxdWUgR29hbCBJRFxuICAgICAgICogQHByb3BlcnR5IHZhbHVlIChvcHRpb25hbCkgcGFzc2VkIHRvIGdvYWwgdHJhY2tpbmdcbiAgICAgICAqL1xuICAgICAgY2FzZSAndHJhY2tHb2FsJzpcbiAgICAgICAgcGFyYW1zID0gW1xuICAgICAgICAgICd0cmFja0dvYWwnLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrR29hbE1hdG9tb1Byb3BlcnRpZXMpLmdvYWxJZCxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0dvYWxNYXRvbW9Qcm9wZXJ0aWVzKS52YWx1ZSxcbiAgICAgICAgXTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8qKlxuICAgICAgICogQGRlc2NyaXB0aW9uIFRyYWNrcyBhIHNpdGUgc2VhcmNoXG4gICAgICAgKlxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9tYXRvbW8ub3JnL2RvY3Mvc2l0ZS1zZWFyY2gvXG4gICAgICAgKiBAbGluayBodHRwczovL2RldmVsb3Blci5tYXRvbW8ub3JnL2d1aWRlcy90cmFja2luZy1qYXZhc2NyaXB0LWd1aWRlI2ludGVybmFsLXNlYXJjaC10cmFja2luZ1xuICAgICAgICpcbiAgICAgICAqIEBwcm9wZXJ0eSBrZXl3b3JkIChyZXF1aXJlZCkgS2V5d29yZCBzZWFyY2hlZCBmb3JcbiAgICAgICAqIEBwcm9wZXJ0eSBjYXRlZ29yeSAob3B0aW9uYWwpIFNlYXJjaCBjYXRlZ29yeVxuICAgICAgICogQHByb3BlcnR5IHNlYXJjaENvdW50IChvcHRpb25hbCkgTnVtYmVyIG9mIHJlc3VsdHNcbiAgICAgICAqL1xuICAgICAgY2FzZSAndHJhY2tTaXRlU2VhcmNoJzpcbiAgICAgICAgcGFyYW1zID0gW1xuICAgICAgICAgICd0cmFja1NpdGVTZWFyY2gnLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrU2l0ZVNlYXJjaE1hdG9tb1Byb3BlcnRpZXMpLmtleXdvcmQsXG4gICAgICAgICAgKHByb3BlcnRpZXMgYXMgVHJhY2tTaXRlU2VhcmNoTWF0b21vUHJvcGVydGllcykuY2F0ZWdvcnksXG4gICAgICAgICAgKHByb3BlcnRpZXMgYXMgVHJhY2tTaXRlU2VhcmNoTWF0b21vUHJvcGVydGllcykuc2VhcmNoQ291bnQsXG4gICAgICAgIF07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvKipcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBMb2dzIGFuIGV2ZW50IHdpdGggYW4gZXZlbnQgY2F0ZWdvcnkgKFZpZGVvcywgTXVzaWMsIEdhbWVzLi4uKSwgYW4gZXZlbnRcbiAgICAgICAqIGFjdGlvbiAoUGxheSwgUGF1c2UsIER1cmF0aW9uLCBBZGQgUGxheWxpc3QsIERvd25sb2FkZWQsIENsaWNrZWQuLi4pLCBhbmQgYW4gb3B0aW9uYWxcbiAgICAgICAqIGV2ZW50IG5hbWUgYW5kIG9wdGlvbmFsIG51bWVyaWMgdmFsdWUuXG4gICAgICAgKlxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9tYXRvbW8ub3JnL2RvY3MvZXZlbnQtdHJhY2tpbmcvXG4gICAgICAgKiBAbGluayBodHRwczovL2RldmVsb3Blci5tYXRvbW8ub3JnL2FwaS1yZWZlcmVuY2UvdHJhY2tpbmctamF2YXNjcmlwdCN1c2luZy10aGUtdHJhY2tlci1vYmplY3RcbiAgICAgICAqXG4gICAgICAgKiBAcHJvcGVydHkgY2F0ZWdvcnlcbiAgICAgICAqIEBwcm9wZXJ0eSBhY3Rpb25cbiAgICAgICAqIEBwcm9wZXJ0eSBuYW1lIChvcHRpb25hbCwgcmVjb21tZW5kZWQpXG4gICAgICAgKiBAcHJvcGVydHkgdmFsdWUgKG9wdGlvbmFsKVxuICAgICAgICovXG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBQQVEgcmVxdWlyZXMgdGhhdCBldmVudFZhbHVlIGJlIGFuIGludGVnZXIsIHNlZTogaHR0cDovL21hdG9tby5vcmcvZG9jcy9ldmVudC10cmFja2luZ1xuICAgICAgICBpZiAoKHByb3BlcnRpZXMgYXMgVHJhY2tFdmVudE1hdG9tb1Byb3BlcnRpZXMpLnZhbHVlKSB7XG4gICAgICAgICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoKHByb3BlcnRpZXMgYXMgVHJhY2tFdmVudE1hdG9tb1Byb3BlcnRpZXMpLnZhbHVlIGFzIGFueSwgMTApO1xuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrRXZlbnRNYXRvbW9Qcm9wZXJ0aWVzKS52YWx1ZSA9IGlzTmFOKHBhcnNlZCkgPyAwIDogcGFyc2VkO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyYW1zID0gW1xuICAgICAgICAgICd0cmFja0V2ZW50JyxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0V2ZW50TWF0b21vUHJvcGVydGllcykuY2F0ZWdvcnksXG4gICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrRXZlbnRNYXRvbW9Qcm9wZXJ0aWVzKS5uYW1lIHx8XG4gICAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0V2ZW50TWF0b21vUHJvcGVydGllcykubGFiZWwsIC8vIENoYW5nZWQgaW4gZmF2b3VyIG9mIE1hdG9tbyBkb2N1bWVudGF0aW9uLiBBZGRlZCBmYWxsYmFjayBzbyBpdCdzIGJhY2t3YXJkcyBjb21wYXRpYmxlLlxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrRXZlbnRNYXRvbW9Qcm9wZXJ0aWVzKS52YWx1ZSxcbiAgICAgICAgXTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIF9wYXEucHVzaChwYXJhbXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRVc2VybmFtZSh1c2VySWQ6IHN0cmluZyB8IGJvb2xlYW4pIHtcbiAgICB0cnkge1xuICAgICAgX3BhcS5wdXNoKFsnc2V0VXNlcklkJywgdXNlcklkXSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGN1c3RvbSBkaW1lbnNpb25zIGlmIGF0IGxlYXN0IG9uZSBwcm9wZXJ0eSBoYXMgdGhlIGtleSBcImRpbWVuc2lvbjxuPlwiLFxuICAgKiBlLmcuIGRpbWVuc2lvbjEwLiBJZiB0aGVyZSBhcmUgY3VzdG9tIGRpbWVuc2lvbnMsIGFueSBvdGhlciBwcm9wZXJ0eSBpcyBpZ25vcmVkLlxuICAgKlxuICAgKiBJZiB0aGVyZSBhcmUgbm8gY3VzdG9tIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHByb3BlcnRpZXMgb2JqZWN0LCB0aGUgcHJvcGVydGllc1xuICAgKiBvYmplY3QgaXMgc2F2ZWQgYXMgYSBjdXN0b20gdmFyaWFibGUuXG4gICAqXG4gICAqIElmIGluIGRvdWJ0LCBwcmVmZXIgY3VzdG9tIGRpbWVuc2lvbnMuXG4gICAqIEBsaW5rIGh0dHBzOi8vbWF0b21vLm9yZy9kb2NzL2N1c3RvbS12YXJpYWJsZXMvXG4gICAqL1xuICBzZXRVc2VyUHJvcGVydGllcyhwcm9wZXJ0aWVzOiBTZXRDdXN0b21WYXJpYWJsZU1hdG9tb1Byb3BlcnRpZXMpIHtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gdGhpcy5zZXRDdXN0b21EaW1lbnNpb25zKHByb3BlcnRpZXMpO1xuICAgIHRyeSB7XG4gICAgICBpZiAoZGltZW5zaW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgX3BhcS5wdXNoKFtcbiAgICAgICAgICAnc2V0Q3VzdG9tVmFyaWFibGUnLFxuICAgICAgICAgIHByb3BlcnRpZXMuaW5kZXgsXG4gICAgICAgICAgcHJvcGVydGllcy5uYW1lLFxuICAgICAgICAgIHByb3BlcnRpZXMudmFsdWUsXG4gICAgICAgICAgcHJvcGVydGllcy5zY29wZSxcbiAgICAgICAgXSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB5b3UgY3JlYXRlZCBhIGN1c3RvbSB2YXJpYWJsZSBhbmQgdGhlbiBkZWNpZGUgdG8gcmVtb3ZlIHRoaXMgdmFyaWFibGUgZnJvbVxuICAgKiBhIHZpc2l0IG9yIHBhZ2UgdmlldywgeW91IGNhbiB1c2UgZGVsZXRlQ3VzdG9tVmFyaWFibGUuXG4gICAqXG4gICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1hdG9tby5vcmcvZ3VpZGVzL3RyYWNraW5nLWphdmFzY3JpcHQtZ3VpZGUjZGVsZXRpbmctYS1jdXN0b20tdmFyaWFibGVcbiAgICovXG4gIGRlbGV0ZWRVc2VyUHJvcGVydGllcyhwcm9wZXJ0aWVzOiBEZWxldGVDdXN0b21WYXJpYWJsZU1hdG9tb1Byb3BlcnRpZXMpIHtcbiAgICB0cnkge1xuICAgICAgX3BhcS5wdXNoKFsnZGVsZXRlQ3VzdG9tVmFyaWFibGUnLCBwcm9wZXJ0aWVzLmluZGV4LCBwcm9wZXJ0aWVzLnNjb3BlXSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Q3VzdG9tRGltZW5zaW9ucyhwcm9wZXJ0aWVzOiBTZXRDdXN0b21WYXJpYWJsZU1hdG9tb1Byb3BlcnRpZXMpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgZGltZW5zaW9uUmVnZXg6IFJlZ0V4cCA9IC9kaW1lbnNpb25bMS05XVxcZCovO1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKS5maWx0ZXIoa2V5ID0+IGRpbWVuc2lvblJlZ2V4LmV4ZWMoa2V5KSk7XG4gICAgZGltZW5zaW9ucy5mb3JFYWNoKGRpbWVuc2lvbiA9PiB7XG4gICAgICBjb25zdCBudW1iZXIgPSBOdW1iZXIoZGltZW5zaW9uLnN1YnN0cig5KSk7XG4gICAgICBfcGFxLnB1c2goWydzZXRDdXN0b21EaW1lbnNpb24nLCBudW1iZXIsIHByb3BlcnRpZXNbZGltZW5zaW9uXV0pO1xuICAgIH0pO1xuICAgIHJldHVybiBkaW1lbnNpb25zO1xuICB9XG59XG4iXX0=