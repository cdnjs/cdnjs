import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
export class Angulartics2Matomo {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        if (typeof (_paq) === 'undefined') {
            console.warn('Matomo not found');
        }
        this.angulartics2.setUsername
            .subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties
            .subscribe((x) => this.setUserProperties(x));
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.eventTrack(x.action, x.properties));
    }
    pageTrack(path, title) {
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
                    const parsed = parseInt(properties.value, 10);
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
                _paq.push(['setCustomVariable', properties.index, properties.name, properties.value, properties.scope]);
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
        const dimensions = Object.keys(properties)
            .filter(key => dimensionRegex.exec(key));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0b21vLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wcm92aWRlcnMvbWF0b21vL21hdG9tby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQWdJNUMsTUFBTSxPQUFPLGtCQUFrQjtJQUU3QixZQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUM1QyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxXQUFXLEVBQUU7WUFDakMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXO2FBQzFCLFNBQVMsQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCO2FBQ2hDLFNBQVMsQ0FBQyxDQUFDLENBQW9DLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVTthQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FB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LENBQUMsQ0FBQyxDQUFDLFlBQVksY0FBYyxDQUFDLEVBQUU7Z0JBQ2xDLE1BQU0sQ0FBQyxDQUFDO2FBQ1Q7U0FDRjtJQUNILENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxVQUE2QztRQUN2RSxNQUFNLGNBQWMsR0FBVyxtQkFBbUIsQ0FBQztRQUNuRCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUN2QyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0MsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM3QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Ozs7WUE3U0YsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7O1lBL0h6QixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICdhbmd1bGFydGljczInO1xuXG5kZWNsYXJlIHZhciBfcGFxOiBhbnk7XG5cbmV4cG9ydCB0eXBlIEV2ZW50VHJhY2tBY3Rpb24gPSAnc2V0RWNvbW1lcmNlVmlldycgfCAnYWRkRWNvbW1lcmNlSXRlbScgfCAndHJhY2tFY29tbWVyY2VDYXJ0VXBkYXRlJ1xuICB8ICd0cmFja0Vjb21tZXJjZU9yZGVyJyB8ICd0cmFja0xpbmsnIHwgJ3RyYWNrR29hbCcgfCAndHJhY2tTaXRlU2VhcmNoJyB8IHN0cmluZztcblxuZXhwb3J0IHR5cGUgU2NvcGVNYXRvbW8gPSAndmlzaXQnIHwgJ3BhZ2UnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgRGltZW5zaW9uc01hdG9tb1Byb3BlcnRpZXMge1xuICBkaW1lbnNpb24wPzogc3RyaW5nO1xuICBkaW1lbnNpb24xPzogc3RyaW5nO1xuICBkaW1lbnNpb24yPzogc3RyaW5nO1xuICBkaW1lbnNpb24zPzogc3RyaW5nO1xuICBkaW1lbnNpb240Pzogc3RyaW5nO1xuICBkaW1lbnNpb241Pzogc3RyaW5nO1xuICBkaW1lbnNpb242Pzogc3RyaW5nO1xuICBkaW1lbnNpb243Pzogc3RyaW5nO1xuICBkaW1lbnNpb244Pzogc3RyaW5nO1xuICBkaW1lbnNpb245Pzogc3RyaW5nO1xufVxuZXhwb3J0IGludGVyZmFjZSBTZXRFY29tbWVyY2VWaWV3TWF0b21vUHJvcGVydGllcyB7XG4gIC8qKiBAY2xhc3MgU2V0RWNvbW1lcmNlVmlld01hdG9tb1Byb3BlcnRpZXMgKi9cbiAgcHJvZHVjdFNLVTogc3RyaW5nO1xuICAvKiogQGNsYXNzIFNldEVjb21tZXJjZVZpZXdNYXRvbW9Qcm9wZXJ0aWVzICovXG4gIHByb2R1Y3ROYW1lOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgU2V0RWNvbW1lcmNlVmlld01hdG9tb1Byb3BlcnRpZXMgKi9cbiAgY2F0ZWdvcnlOYW1lOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgU2V0RWNvbW1lcmNlVmlld01hdG9tb1Byb3BlcnRpZXMgKi9cbiAgcHJpY2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBZGRFY29tbWVyY2VJdGVtUHJvcGVydGllcyB7XG4gIC8qKiBAY2xhc3MgQWRkRWNvbW1lcmNlSXRlbVByb3BlcnRpZXMgKi9cbiAgcHJvZHVjdFNLVTogc3RyaW5nO1xuICAvKiogQGNsYXNzIEFkZEVjb21tZXJjZUl0ZW1Qcm9wZXJ0aWVzICovXG4gIHByb2R1Y3ROYW1lOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgQWRkRWNvbW1lcmNlSXRlbVByb3BlcnRpZXMgKi9cbiAgcHJvZHVjdENhdGVnb3J5OiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgQWRkRWNvbW1lcmNlSXRlbVByb3BlcnRpZXMgKi9cbiAgcHJpY2U6IHN0cmluZztcbiAgLyoqIEBjbGFzcyBBZGRFY29tbWVyY2VJdGVtUHJvcGVydGllcyAqL1xuICBxdWFudGl0eTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyYWNrRWNvbW1lcmNlQ2FydFVwZGF0ZU1hdG9tb1Byb3BlcnRpZXMge1xuICAvKiogQGNsYXNzIFRyYWNrRWNvbW1lcmNlQ2FydFVwZGF0ZU1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgZ3JhbmRUb3RhbDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyYWNrRWNvbW1lcmNlT3JkZXJNYXRvbW9Qcm9wZXJ0aWVzIHtcbiAgLyoqIEBjbGFzcyBUcmFja0Vjb21tZXJjZU9yZGVyTWF0b21vUHJvcGVydGllcyAqL1xuICBvcmRlcklkOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgVHJhY2tFY29tbWVyY2VPcmRlck1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgZ3JhbmRUb3RhbDogc3RyaW5nO1xuICAvKiogQGNsYXNzIFRyYWNrRWNvbW1lcmNlT3JkZXJNYXRvbW9Qcm9wZXJ0aWVzICovXG4gIHN1YlRvdGFsOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgVHJhY2tFY29tbWVyY2VPcmRlck1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgdGF4OiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgVHJhY2tFY29tbWVyY2VPcmRlck1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgc2hpcHBpbmc6IHN0cmluZztcbiAgLyoqIEBjbGFzcyBUcmFja0Vjb21tZXJjZU9yZGVyTWF0b21vUHJvcGVydGllcyAqL1xuICBkaXNjb3VudDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyYWNrTGlua01hdG9tb1Byb3BlcnRpZXMge1xuICAvKiogQGNsYXNzIFRyYWNrTGlua01hdG9tb1Byb3BlcnRpZXMgKi9cbiAgdXJsOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgVHJhY2tMaW5rTWF0b21vUHJvcGVydGllcyAqL1xuICBsaW5rVHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyYWNrR29hbE1hdG9tb1Byb3BlcnRpZXMge1xuICAvKiogQGNsYXNzIFRyYWNrR29hbE1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgZ29hbElkOiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgVHJhY2tHb2FsTWF0b21vUHJvcGVydGllcyAqL1xuICB2YWx1ZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyYWNrU2l0ZVNlYXJjaE1hdG9tb1Byb3BlcnRpZXMge1xuICAvKiogQGNsYXNzIFRyYWNrU2l0ZVNlYXJjaE1hdG9tb1Byb3BlcnRpZXMgKi9cbiAga2V5d29yZDogc3RyaW5nO1xuICAvKiogQGNsYXNzIFRyYWNrU2l0ZVNlYXJjaE1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgY2F0ZWdvcnk6IHN0cmluZztcbiAgLyoqIEBjbGFzcyBUcmFja1NpdGVTZWFyY2hNYXRvbW9Qcm9wZXJ0aWVzICovXG4gIHNlYXJjaENvdW50OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhY2tFdmVudE1hdG9tb1Byb3BlcnRpZXMge1xuICAvKiogQGNsYXNzIFRyYWNrRXZlbnRNYXRvbW9Qcm9wZXJ0aWVzICovXG4gIGNhdGVnb3J5OiBzdHJpbmc7XG4gIC8qKiBAY2xhc3MgVHJhY2tFdmVudE1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgbmFtZT86IHN0cmluZztcbiAgLyoqIEBjbGFzcyBUcmFja0V2ZW50TWF0b21vUHJvcGVydGllcyAqL1xuICBsYWJlbD86IHN0cmluZztcbiAgLyoqIEBjbGFzcyBUcmFja0V2ZW50TWF0b21vUHJvcGVydGllcyAqL1xuICB2YWx1ZTogbnVtYmVyIHwgc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNldEN1c3RvbVZhcmlhYmxlTWF0b21vUHJvcGVydGllcyBleHRlbmRzIERpbWVuc2lvbnNNYXRvbW9Qcm9wZXJ0aWVzIHtcbiAgLyoqIEBjbGFzcyBTZXRDdXN0b21WYXJpYWJsZU1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgaW5kZXg6IG51bWJlcjtcbiAgLyoqIEBjbGFzcyBTZXRDdXN0b21WYXJpYWJsZU1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgbmFtZTogc3RyaW5nO1xuICAvKiogQGNsYXNzIFNldEN1c3RvbVZhcmlhYmxlTWF0b21vUHJvcGVydGllcyAqL1xuICB2YWx1ZTogc3RyaW5nO1xuICAvKiogQGNsYXNzIFNldEN1c3RvbVZhcmlhYmxlTWF0b21vUHJvcGVydGllcyAqL1xuICBzY29wZTogU2NvcGVNYXRvbW87XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVsZXRlQ3VzdG9tVmFyaWFibGVNYXRvbW9Qcm9wZXJ0aWVzIHtcbiAgLyoqIEBjbGFzcyBEZWxldGVDdXN0b21WYXJpYWJsZU1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgaW5kZXg6IG51bWJlcjtcbiAgLyoqIEBjbGFzcyBEZWxldGVDdXN0b21WYXJpYWJsZU1hdG9tb1Byb3BlcnRpZXMgKi9cbiAgc2NvcGU6IFNjb3BlTWF0b21vO1xufVxuXG5leHBvcnQgdHlwZSBFdmVudFRyYWNrYWN0aW9uUHJvcGVydGllcyA9IFNldEVjb21tZXJjZVZpZXdNYXRvbW9Qcm9wZXJ0aWVzXG4gIHwgQWRkRWNvbW1lcmNlSXRlbVByb3BlcnRpZXNcbiAgfCBUcmFja0Vjb21tZXJjZUNhcnRVcGRhdGVNYXRvbW9Qcm9wZXJ0aWVzXG4gIHwgVHJhY2tFY29tbWVyY2VPcmRlck1hdG9tb1Byb3BlcnRpZXNcbiAgfCBUcmFja0xpbmtNYXRvbW9Qcm9wZXJ0aWVzXG4gIHwgVHJhY2tHb2FsTWF0b21vUHJvcGVydGllc1xuICB8IFRyYWNrU2l0ZVNlYXJjaE1hdG9tb1Byb3BlcnRpZXNcbiAgfCBUcmFja0V2ZW50TWF0b21vUHJvcGVydGllcztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJNYXRvbW8ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczIpIHtcbiAgICBpZiAodHlwZW9mIChfcGFxKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2FybignTWF0b21vIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VybmFtZVxuICAgICAgLnN1YnNjcmliZSgoeDogc3RyaW5nKSA9PiB0aGlzLnNldFVzZXJuYW1lKHgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllc1xuICAgICAgLnN1YnNjcmliZSgoeDogU2V0Q3VzdG9tVmFyaWFibGVNYXRvbW9Qcm9wZXJ0aWVzKSA9PiB0aGlzLnNldFVzZXJQcm9wZXJ0aWVzKHgpKTtcbiAgfVxuXG4gIHN0YXJ0VHJhY2tpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5hbmd1bGFydGljczIucGFnZVRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLmV2ZW50VHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xuICB9XG5cbiAgcGFnZVRyYWNrKHBhdGg6IHN0cmluZywgdGl0bGU/OiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCF3aW5kb3cubG9jYXRpb24ub3JpZ2luKSB7XG4gICAgICAgICh3aW5kb3cubG9jYXRpb24gYXMgYW55KS5vcmlnaW4gPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nXG4gICAgICAgICAgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWVcbiAgICAgICAgICArICh3aW5kb3cubG9jYXRpb24ucG9ydCA/ICc6JyArIHdpbmRvdy5sb2NhdGlvbi5wb3J0IDogJycpO1xuICAgICAgfVxuICAgICAgX3BhcS5wdXNoKFsnc2V0RG9jdW1lbnRUaXRsZScsIHRpdGxlIHx8IHdpbmRvdy5kb2N1bWVudC50aXRsZV0pO1xuICAgICAgX3BhcS5wdXNoKFsnc2V0Q3VzdG9tVXJsJywgd2luZG93LmxvY2F0aW9uLm9yaWdpbiArIHBhdGhdKTtcbiAgICAgIF9wYXEucHVzaChbJ3RyYWNrUGFnZVZpZXcnXSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlc2V0VXNlcigpIHtcbiAgICB0cnkge1xuICAgICAgX3BhcS5wdXNoKFsnYXBwZW5kVG9UcmFja2luZ1VybCcsICduZXdfdmlzaXQ9MSddKTsgLy8gKDEpIGZvcmNlcyBhIG5ldyB2aXNpdFxuICAgICAgX3BhcS5wdXNoKFsnZGVsZXRlQ29va2llcyddKTsgLy8gKDIpIGRlbGV0ZXMgZXhpc3RpbmcgdHJhY2tpbmcgY29va2llcyB0byBzdGFydCB0aGUgbmV3IHZpc2l0XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGV2ZW50VHJhY2soYWN0aW9uOiAnc2V0RWNvbW1lcmNlVmlldycsIHByb3BlcnRpZXM6IFNldEVjb21tZXJjZVZpZXdNYXRvbW9Qcm9wZXJ0aWVzKTogdm9pZDtcbiAgZXZlbnRUcmFjayhhY3Rpb246ICdhZGRFY29tbWVyY2VJdGVtJywgcHJvcGVydGllczogQWRkRWNvbW1lcmNlSXRlbVByb3BlcnRpZXMpOiB2b2lkO1xuICBldmVudFRyYWNrKGFjdGlvbjogJ3RyYWNrRWNvbW1lcmNlQ2FydFVwZGF0ZScsIHByb3BlcnRpZXM6IFRyYWNrRWNvbW1lcmNlQ2FydFVwZGF0ZU1hdG9tb1Byb3BlcnRpZXMpOiB2b2lkO1xuICBldmVudFRyYWNrKGFjdGlvbjogJ3RyYWNrRWNvbW1lcmNlT3JkZXInLCBwcm9wZXJ0aWVzOiBUcmFja0Vjb21tZXJjZU9yZGVyTWF0b21vUHJvcGVydGllcyk6IHZvaWQ7XG4gIGV2ZW50VHJhY2soYWN0aW9uOiAndHJhY2tMaW5rJywgcHJvcGVydGllczogVHJhY2tMaW5rTWF0b21vUHJvcGVydGllcyk6IHZvaWQ7XG4gIGV2ZW50VHJhY2soYWN0aW9uOiAndHJhY2tHb2FsJywgcHJvcGVydGllczogVHJhY2tHb2FsTWF0b21vUHJvcGVydGllcyk6IHZvaWQ7XG4gIGV2ZW50VHJhY2soYWN0aW9uOiAndHJhY2tTaXRlU2VhcmNoJywgcHJvcGVydGllczogVHJhY2tTaXRlU2VhcmNoTWF0b21vUHJvcGVydGllcyk6IHZvaWQ7XG4gIGV2ZW50VHJhY2soYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IFRyYWNrRXZlbnRNYXRvbW9Qcm9wZXJ0aWVzKTogdm9pZDtcblxuICAvKipcbiAgICogVHJhY2sgYSBiYXNpYyBldmVudCBpbiBNYXRvbW8sIG9yIHNlbmQgYW4gZWNvbW1lcmNlIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0gYWN0aW9uIEEgc3RyaW5nIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHR5cGUgb2YgZXZlbnQgdGhhdCBuZWVkcyB0byBiZSB0cmFja2VkLlxuICAgKiBAcGFyYW0gcHJvcGVydGllcyBUaGUgcHJvcGVydGllcyB0aGF0IG5lZWQgdG8gYmUgbG9nZ2VkIHdpdGggdGhlIGV2ZW50LlxuICAgKi9cbiAgZXZlbnRUcmFjayhhY3Rpb246IEV2ZW50VHJhY2tBY3Rpb24sIHByb3BlcnRpZXM/OiBFdmVudFRyYWNrYWN0aW9uUHJvcGVydGllcykge1xuICAgIGxldCBwYXJhbXMgPSBbXTtcbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgLyoqXG4gICAgICAgKiBAZGVzY3JpcHRpb24gU2V0cyB0aGUgY3VycmVudCBwYWdlIHZpZXcgYXMgYSBwcm9kdWN0IG9yIGNhdGVnb3J5IHBhZ2Ugdmlldy4gV2hlbiB5b3UgY2FsbFxuICAgICAgICogc2V0RWNvbW1lcmNlVmlldyBpdCBtdXN0IGJlIGZvbGxvd2VkIGJ5IGEgY2FsbCB0byB0cmFja1BhZ2VWaWV3IHRvIHJlY29yZCB0aGUgcHJvZHVjdCBvclxuICAgICAgICogY2F0ZWdvcnkgcGFnZSB2aWV3LlxuICAgICAgICpcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vbWF0b21vLm9yZy9kb2NzL2Vjb21tZXJjZS1hbmFseXRpY3MvI3RyYWNraW5nLXByb2R1Y3QtcGFnZS12aWV3cy1jYXRlZ29yeS1wYWdlLXZpZXdzLW9wdGlvbmFsXG4gICAgICAgKiBAbGluayBodHRwczovL2RldmVsb3Blci5tYXRvbW8ub3JnL2FwaS1yZWZlcmVuY2UvdHJhY2tpbmctamF2YXNjcmlwdCNlY29tbWVyY2VcbiAgICAgICAqXG4gICAgICAgKiBAcHJvcGVydHkgcHJvZHVjdFNLVSAocmVxdWlyZWQpIFNLVTogUHJvZHVjdCB1bmlxdWUgaWRlbnRpZmllclxuICAgICAgICogQHByb3BlcnR5IHByb2R1Y3ROYW1lIChvcHRpb25hbCkgUHJvZHVjdCBuYW1lXG4gICAgICAgKiBAcHJvcGVydHkgY2F0ZWdvcnlOYW1lIChvcHRpb25hbCkgUHJvZHVjdCBjYXRlZ29yeSwgb3IgYXJyYXkgb2YgdXAgdG8gNSBjYXRlZ29yaWVzXG4gICAgICAgKiBAcHJvcGVydHkgcHJpY2UgKG9wdGlvbmFsKSBQcm9kdWN0IFByaWNlIGFzIGRpc3BsYXllZCBvbiB0aGUgcGFnZVxuICAgICAgICovXG4gICAgICBjYXNlICdzZXRFY29tbWVyY2VWaWV3JzpcbiAgICAgICAgcGFyYW1zID0gWydzZXRFY29tbWVyY2VWaWV3JyxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBTZXRFY29tbWVyY2VWaWV3TWF0b21vUHJvcGVydGllcykucHJvZHVjdFNLVSxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBTZXRFY29tbWVyY2VWaWV3TWF0b21vUHJvcGVydGllcykucHJvZHVjdE5hbWUsXG4gICAgICAgICAgKHByb3BlcnRpZXMgYXMgU2V0RWNvbW1lcmNlVmlld01hdG9tb1Byb3BlcnRpZXMpLmNhdGVnb3J5TmFtZSxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBTZXRFY29tbWVyY2VWaWV3TWF0b21vUHJvcGVydGllcykucHJpY2UsXG4gICAgICAgIF07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvKipcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBBZGRzIGEgcHJvZHVjdCBpbnRvIHRoZSBlY29tbWVyY2Ugb3JkZXIuIE11c3QgYmUgY2FsbGVkIGZvciBlYWNoIHByb2R1Y3QgaW5cbiAgICAgICAqIHRoZSBvcmRlci5cbiAgICAgICAqXG4gICAgICAgKiBAbGluayBodHRwczovL21hdG9tby5vcmcvZG9jcy9lY29tbWVyY2UtYW5hbHl0aWNzLyN0cmFja2luZy1lY29tbWVyY2Utb3JkZXJzLWl0ZW1zLXB1cmNoYXNlZC1yZXF1aXJlZFxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubWF0b21vLm9yZy9hcGktcmVmZXJlbmNlL3RyYWNraW5nLWphdmFzY3JpcHQjZWNvbW1lcmNlXG4gICAgICAgKlxuICAgICAgICogQHByb3BlcnR5IHByb2R1Y3RTS1UgKHJlcXVpcmVkKSBTS1U6IFByb2R1Y3QgdW5pcXVlIGlkZW50aWZpZXJcbiAgICAgICAqIEBwcm9wZXJ0eSBwcm9kdWN0TmFtZSAob3B0aW9uYWwpIFByb2R1Y3QgbmFtZVxuICAgICAgICogQHByb3BlcnR5IGNhdGVnb3J5TmFtZSAob3B0aW9uYWwpIFByb2R1Y3QgY2F0ZWdvcnksIG9yIGFycmF5IG9mIHVwIHRvIDUgY2F0ZWdvcmllc1xuICAgICAgICogQHByb3BlcnR5IHByaWNlIChyZWNvbW1lbmRlZCkgUHJvZHVjdCBwcmljZVxuICAgICAgICogQHByb3BlcnR5IHF1YW50aXR5IChvcHRpb25hbCwgZGVmYXVsdCB0byAxKSBQcm9kdWN0IHF1YW50aXR5XG4gICAgICAgKi9cbiAgICAgIGNhc2UgJ2FkZEVjb21tZXJjZUl0ZW0nOlxuICAgICAgICBwYXJhbXMgPSBbXG4gICAgICAgICAgJ2FkZEVjb21tZXJjZUl0ZW0nLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIEFkZEVjb21tZXJjZUl0ZW1Qcm9wZXJ0aWVzKS5wcm9kdWN0U0tVLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIEFkZEVjb21tZXJjZUl0ZW1Qcm9wZXJ0aWVzKS5wcm9kdWN0TmFtZSxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBBZGRFY29tbWVyY2VJdGVtUHJvcGVydGllcykucHJvZHVjdENhdGVnb3J5LFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIEFkZEVjb21tZXJjZUl0ZW1Qcm9wZXJ0aWVzKS5wcmljZSxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBBZGRFY29tbWVyY2VJdGVtUHJvcGVydGllcykucXVhbnRpdHksXG4gICAgICAgIF07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvKipcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUcmFja3MgYSBzaG9wcGluZyBjYXJ0LiBDYWxsIHRoaXMgamF2YXNjcmlwdCBmdW5jdGlvbiBldmVyeSB0aW1lIGEgdXNlciBpc1xuICAgICAgICogYWRkaW5nLCB1cGRhdGluZyBvciBkZWxldGluZyBhIHByb2R1Y3QgZnJvbSB0aGUgY2FydC5cbiAgICAgICAqXG4gICAgICAgKiBAbGluayBodHRwczovL21hdG9tby5vcmcvZG9jcy9lY29tbWVyY2UtYW5hbHl0aWNzLyN0cmFja2luZy1hZGQtdG8tY2FydC1pdGVtcy1hZGRlZC10by10aGUtY2FydC1vcHRpb25hbFxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubWF0b21vLm9yZy9hcGktcmVmZXJlbmNlL3RyYWNraW5nLWphdmFzY3JpcHQjZWNvbW1lcmNlXG4gICAgICAgKlxuICAgICAgICogQHByb3BlcnR5IGdyYW5kVG90YWwgKHJlcXVpcmVkKSBDYXJ0IGFtb3VudFxuICAgICAgICovXG4gICAgICBjYXNlICd0cmFja0Vjb21tZXJjZUNhcnRVcGRhdGUnOlxuICAgICAgICBwYXJhbXMgPSBbJ3RyYWNrRWNvbW1lcmNlQ2FydFVwZGF0ZScsIChwcm9wZXJ0aWVzIGFzIFRyYWNrRWNvbW1lcmNlQ2FydFVwZGF0ZU1hdG9tb1Byb3BlcnRpZXMpLmdyYW5kVG90YWxdO1xuICAgICAgICBicmVhaztcblxuICAgICAgLyoqXG4gICAgICAgKiBAZGVzY3JpcHRpb24gVHJhY2tzIGFuIEVjb21tZXJjZSBvcmRlciwgaW5jbHVkaW5nIGFueSBlY29tbWVyY2UgaXRlbSBwcmV2aW91c2x5IGFkZGVkIHRvXG4gICAgICAgKiB0aGUgb3JkZXIuIG9yZGVySWQgYW5kIGdyYW5kVG90YWwgKGllLiByZXZlbnVlKSBhcmUgcmVxdWlyZWQgcGFyYW1ldGVycy5cbiAgICAgICAqXG4gICAgICAgKiBAbGluayBodHRwczovL21hdG9tby5vcmcvZG9jcy9lY29tbWVyY2UtYW5hbHl0aWNzLyN0cmFja2luZy1lY29tbWVyY2Utb3JkZXJzLWl0ZW1zLXB1cmNoYXNlZC1yZXF1aXJlZFxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubWF0b21vLm9yZy9hcGktcmVmZXJlbmNlL3RyYWNraW5nLWphdmFzY3JpcHQjZWNvbW1lcmNlXG4gICAgICAgKlxuICAgICAgICogQHByb3BlcnR5IG9yZGVySWQgKHJlcXVpcmVkKSBVbmlxdWUgT3JkZXIgSURcbiAgICAgICAqIEBwcm9wZXJ0eSBncmFuZFRvdGFsIChyZXF1aXJlZCkgT3JkZXIgUmV2ZW51ZSBncmFuZCB0b3RhbCAoaW5jbHVkZXMgdGF4LCBzaGlwcGluZywgYW5kIHN1YnRyYWN0ZWQgZGlzY291bnQpXG4gICAgICAgKiBAcHJvcGVydHkgc3ViVG90YWwgKG9wdGlvbmFsKSBPcmRlciBzdWIgdG90YWwgKGV4Y2x1ZGVzIHNoaXBwaW5nKVxuICAgICAgICogQHByb3BlcnR5IHRheCAob3B0aW9uYWwpIFRheCBhbW91bnRcbiAgICAgICAqIEBwcm9wZXJ0eSBzaGlwcGluZyAob3B0aW9uYWwpIFNoaXBwaW5nIGFtb3VudFxuICAgICAgICogQHByb3BlcnR5IGRpc2NvdW50IChvcHRpb25hbCkgRGlzY291bnQgb2ZmZXJlZCAoc2V0IHRvIGZhbHNlIGZvciB1bnNwZWNpZmllZCBwYXJhbWV0ZXIpXG4gICAgICAgKi9cbiAgICAgIGNhc2UgJ3RyYWNrRWNvbW1lcmNlT3JkZXInOlxuICAgICAgICBwYXJhbXMgPSBbXG4gICAgICAgICAgJ3RyYWNrRWNvbW1lcmNlT3JkZXInLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrRWNvbW1lcmNlT3JkZXJNYXRvbW9Qcm9wZXJ0aWVzKS5vcmRlcklkLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrRWNvbW1lcmNlT3JkZXJNYXRvbW9Qcm9wZXJ0aWVzKS5ncmFuZFRvdGFsLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrRWNvbW1lcmNlT3JkZXJNYXRvbW9Qcm9wZXJ0aWVzKS5zdWJUb3RhbCxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0Vjb21tZXJjZU9yZGVyTWF0b21vUHJvcGVydGllcykudGF4LFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrRWNvbW1lcmNlT3JkZXJNYXRvbW9Qcm9wZXJ0aWVzKS5zaGlwcGluZyxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0Vjb21tZXJjZU9yZGVyTWF0b21vUHJvcGVydGllcykuZGlzY291bnQsXG4gICAgICAgIF07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvKipcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUbyBtYW51YWxseSB0cmlnZ2VyIGFuIG91dGxpbmtcbiAgICAgICAqXG4gICAgICAgKiBAbGluayBodHRwczovL21hdG9tby5vcmcvZG9jcy90cmFja2luZy1nb2Fscy13ZWItYW5hbHl0aWNzL1xuICAgICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubWF0b21vLm9yZy9ndWlkZXMvdHJhY2tpbmctamF2YXNjcmlwdC1ndWlkZSN0cmFja2luZy1hLWNsaWNrLWFzLWFuLW91dGxpbmstdmlhLWNzcy1vci1qYXZhc2NyaXB0XG4gICAgICAgKlxuICAgICAgICogQHByb3BlcnR5IHVybCAocmVxdWlyZWQpIGxpbmsgdXJsXG4gICAgICAgKiBAcHJvcGVydHkgbGlua1R5cGUgKG9wdGlvbmFsKSB0eXBlIG9mIGxpbmtcbiAgICAgICAqL1xuICAgICAgY2FzZSAndHJhY2tMaW5rJzpcbiAgICAgICAgcGFyYW1zID0gW1xuICAgICAgICAgICd0cmFja0xpbmsnLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrTGlua01hdG9tb1Byb3BlcnRpZXMpLnVybCxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0xpbmtNYXRvbW9Qcm9wZXJ0aWVzKS5saW5rVHlwZVxuICAgICAgICBdO1xuICAgICAgICBicmVhaztcblxuICAgICAgLyoqXG4gICAgICAgKiBAZGVzY3JpcHRpb24gVHJhY2tzIGFuIEVjb21tZXJjZSBnb2FsXG4gICAgICAgKlxuICAgICAgICogQGxpbmsgaHR0cHM6Ly9tYXRvbW8ub3JnL2RvY3MvdHJhY2tpbmctZ29hbHMtd2ViLWFuYWx5dGljcy9cbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1hdG9tby5vcmcvZ3VpZGVzL3RyYWNraW5nLWphdmFzY3JpcHQtZ3VpZGUjbWFudWFsbHktdHJpZ2dlci1nb2FsLWNvbnZlcnNpb25zXG4gICAgICAgKlxuICAgICAgICogQHByb3BlcnR5IGdvYWxJZCAocmVxdWlyZWQpIFVuaXF1ZSBHb2FsIElEXG4gICAgICAgKiBAcHJvcGVydHkgdmFsdWUgKG9wdGlvbmFsKSBwYXNzZWQgdG8gZ29hbCB0cmFja2luZ1xuICAgICAgICovXG4gICAgICBjYXNlICd0cmFja0dvYWwnOlxuICAgICAgICBwYXJhbXMgPSBbXG4gICAgICAgICAgJ3RyYWNrR29hbCcsXG4gICAgICAgICAgKHByb3BlcnRpZXMgYXMgVHJhY2tHb2FsTWF0b21vUHJvcGVydGllcykuZ29hbElkLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrR29hbE1hdG9tb1Byb3BlcnRpZXMpLnZhbHVlLFxuICAgICAgICBdO1xuICAgICAgICBicmVhaztcblxuICAgICAgLyoqXG4gICAgICAgKiBAZGVzY3JpcHRpb24gVHJhY2tzIGEgc2l0ZSBzZWFyY2hcbiAgICAgICAqXG4gICAgICAgKiBAbGluayBodHRwczovL21hdG9tby5vcmcvZG9jcy9zaXRlLXNlYXJjaC9cbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1hdG9tby5vcmcvZ3VpZGVzL3RyYWNraW5nLWphdmFzY3JpcHQtZ3VpZGUjaW50ZXJuYWwtc2VhcmNoLXRyYWNraW5nXG4gICAgICAgKlxuICAgICAgICogQHByb3BlcnR5IGtleXdvcmQgKHJlcXVpcmVkKSBLZXl3b3JkIHNlYXJjaGVkIGZvclxuICAgICAgICogQHByb3BlcnR5IGNhdGVnb3J5IChvcHRpb25hbCkgU2VhcmNoIGNhdGVnb3J5XG4gICAgICAgKiBAcHJvcGVydHkgc2VhcmNoQ291bnQgKG9wdGlvbmFsKSBOdW1iZXIgb2YgcmVzdWx0c1xuICAgICAgICovXG4gICAgICBjYXNlICd0cmFja1NpdGVTZWFyY2gnOlxuICAgICAgICBwYXJhbXMgPSBbXG4gICAgICAgICAgJ3RyYWNrU2l0ZVNlYXJjaCcsXG4gICAgICAgICAgKHByb3BlcnRpZXMgYXMgVHJhY2tTaXRlU2VhcmNoTWF0b21vUHJvcGVydGllcykua2V5d29yZCxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja1NpdGVTZWFyY2hNYXRvbW9Qcm9wZXJ0aWVzKS5jYXRlZ29yeSxcbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja1NpdGVTZWFyY2hNYXRvbW9Qcm9wZXJ0aWVzKS5zZWFyY2hDb3VudCxcbiAgICAgICAgXTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIC8qKlxuICAgICAgICogQGRlc2NyaXB0aW9uIExvZ3MgYW4gZXZlbnQgd2l0aCBhbiBldmVudCBjYXRlZ29yeSAoVmlkZW9zLCBNdXNpYywgR2FtZXMuLi4pLCBhbiBldmVudFxuICAgICAgICogYWN0aW9uIChQbGF5LCBQYXVzZSwgRHVyYXRpb24sIEFkZCBQbGF5bGlzdCwgRG93bmxvYWRlZCwgQ2xpY2tlZC4uLiksIGFuZCBhbiBvcHRpb25hbFxuICAgICAgICogZXZlbnQgbmFtZSBhbmQgb3B0aW9uYWwgbnVtZXJpYyB2YWx1ZS5cbiAgICAgICAqXG4gICAgICAgKiBAbGluayBodHRwczovL21hdG9tby5vcmcvZG9jcy9ldmVudC10cmFja2luZy9cbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVyLm1hdG9tby5vcmcvYXBpLXJlZmVyZW5jZS90cmFja2luZy1qYXZhc2NyaXB0I3VzaW5nLXRoZS10cmFja2VyLW9iamVjdFxuICAgICAgICpcbiAgICAgICAqIEBwcm9wZXJ0eSBjYXRlZ29yeVxuICAgICAgICogQHByb3BlcnR5IGFjdGlvblxuICAgICAgICogQHByb3BlcnR5IG5hbWUgKG9wdGlvbmFsLCByZWNvbW1lbmRlZClcbiAgICAgICAqIEBwcm9wZXJ0eSB2YWx1ZSAob3B0aW9uYWwpXG4gICAgICAgKi9cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIFBBUSByZXF1aXJlcyB0aGF0IGV2ZW50VmFsdWUgYmUgYW4gaW50ZWdlciwgc2VlOiBodHRwOi8vbWF0b21vLm9yZy9kb2NzL2V2ZW50LXRyYWNraW5nXG4gICAgICAgIGlmICgocHJvcGVydGllcyBhcyBUcmFja0V2ZW50TWF0b21vUHJvcGVydGllcykudmFsdWUpIHtcbiAgICAgICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUludCgocHJvcGVydGllcyBhcyBUcmFja0V2ZW50TWF0b21vUHJvcGVydGllcykudmFsdWUgYXMgYW55LCAxMCk7XG4gICAgICAgICAgKHByb3BlcnRpZXMgYXMgVHJhY2tFdmVudE1hdG9tb1Byb3BlcnRpZXMpLnZhbHVlID0gaXNOYU4ocGFyc2VkKSA/IDAgOiBwYXJzZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJhbXMgPSBbXG4gICAgICAgICAgJ3RyYWNrRXZlbnQnLFxuICAgICAgICAgIChwcm9wZXJ0aWVzIGFzIFRyYWNrRXZlbnRNYXRvbW9Qcm9wZXJ0aWVzKS5jYXRlZ29yeSxcbiAgICAgICAgICBhY3Rpb24sXG4gICAgICAgICAgKHByb3BlcnRpZXMgYXMgVHJhY2tFdmVudE1hdG9tb1Byb3BlcnRpZXMpLm5hbWUgfHwgKHByb3BlcnRpZXMgYXMgVHJhY2tFdmVudE1hdG9tb1Byb3BlcnRpZXMpLmxhYmVsLCAvLyBDaGFuZ2VkIGluIGZhdm91ciBvZiBNYXRvbW8gZG9jdW1lbnRhdGlvbi4gQWRkZWQgZmFsbGJhY2sgc28gaXQncyBiYWNrd2FyZHMgY29tcGF0aWJsZS5cbiAgICAgICAgICAocHJvcGVydGllcyBhcyBUcmFja0V2ZW50TWF0b21vUHJvcGVydGllcykudmFsdWUsXG4gICAgICAgIF07XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBfcGFxLnB1c2gocGFyYW1zKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0VXNlcm5hbWUodXNlcklkOiBzdHJpbmcgfCBib29sZWFuKSB7XG4gICAgdHJ5IHtcbiAgICAgIF9wYXEucHVzaChbJ3NldFVzZXJJZCcsIHVzZXJJZF0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBjdXN0b20gZGltZW5zaW9ucyBpZiBhdCBsZWFzdCBvbmUgcHJvcGVydHkgaGFzIHRoZSBrZXkgXCJkaW1lbnNpb248bj5cIixcbiAgICogZS5nLiBkaW1lbnNpb24xMC4gSWYgdGhlcmUgYXJlIGN1c3RvbSBkaW1lbnNpb25zLCBhbnkgb3RoZXIgcHJvcGVydHkgaXMgaWdub3JlZC5cbiAgICpcbiAgICogSWYgdGhlcmUgYXJlIG5vIGN1c3RvbSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiBwcm9wZXJ0aWVzIG9iamVjdCwgdGhlIHByb3BlcnRpZXNcbiAgICogb2JqZWN0IGlzIHNhdmVkIGFzIGEgY3VzdG9tIHZhcmlhYmxlLlxuICAgKlxuICAgKiBJZiBpbiBkb3VidCwgcHJlZmVyIGN1c3RvbSBkaW1lbnNpb25zLlxuICAgKiBAbGluayBodHRwczovL21hdG9tby5vcmcvZG9jcy9jdXN0b20tdmFyaWFibGVzL1xuICAgKi9cbiAgc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllczogU2V0Q3VzdG9tVmFyaWFibGVNYXRvbW9Qcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMuc2V0Q3VzdG9tRGltZW5zaW9ucyhwcm9wZXJ0aWVzKTtcbiAgICB0cnkge1xuICAgICAgaWYgKGRpbWVuc2lvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIF9wYXEucHVzaChbJ3NldEN1c3RvbVZhcmlhYmxlJywgcHJvcGVydGllcy5pbmRleCwgcHJvcGVydGllcy5uYW1lLCBwcm9wZXJ0aWVzLnZhbHVlLCBwcm9wZXJ0aWVzLnNjb3BlXSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgICogSWYgeW91IGNyZWF0ZWQgYSBjdXN0b20gdmFyaWFibGUgYW5kIHRoZW4gZGVjaWRlIHRvIHJlbW92ZSB0aGlzIHZhcmlhYmxlIGZyb20gXG4gICAgKiBhIHZpc2l0IG9yIHBhZ2UgdmlldywgeW91IGNhbiB1c2UgZGVsZXRlQ3VzdG9tVmFyaWFibGUuXG4gICAgKlxuICAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXIubWF0b21vLm9yZy9ndWlkZXMvdHJhY2tpbmctamF2YXNjcmlwdC1ndWlkZSNkZWxldGluZy1hLWN1c3RvbS12YXJpYWJsZVxuICAgICovXG4gIGRlbGV0ZWRVc2VyUHJvcGVydGllcyhwcm9wZXJ0aWVzOiBEZWxldGVDdXN0b21WYXJpYWJsZU1hdG9tb1Byb3BlcnRpZXMpIHtcbiAgICB0cnkge1xuICAgICAgX3BhcS5wdXNoKFsnZGVsZXRlQ3VzdG9tVmFyaWFibGUnLCBwcm9wZXJ0aWVzLmluZGV4LCBwcm9wZXJ0aWVzLnNjb3BlXSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Q3VzdG9tRGltZW5zaW9ucyhwcm9wZXJ0aWVzOiBTZXRDdXN0b21WYXJpYWJsZU1hdG9tb1Byb3BlcnRpZXMpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgZGltZW5zaW9uUmVnZXg6IFJlZ0V4cCA9IC9kaW1lbnNpb25bMS05XVxcZCovO1xuICAgIGNvbnN0IGRpbWVuc2lvbnMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKVxuICAgICAgLmZpbHRlcihrZXkgPT4gZGltZW5zaW9uUmVnZXguZXhlYyhrZXkpKTtcbiAgICBkaW1lbnNpb25zLmZvckVhY2goZGltZW5zaW9uID0+IHtcbiAgICAgIGNvbnN0IG51bWJlciA9IE51bWJlcihkaW1lbnNpb24uc3Vic3RyKDkpKTtcbiAgICAgIF9wYXEucHVzaChbJ3NldEN1c3RvbURpbWVuc2lvbicsIG51bWJlciwgcHJvcGVydGllc1tkaW1lbnNpb25dXSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRpbWVuc2lvbnM7XG4gIH1cbn1cbiJdfQ==