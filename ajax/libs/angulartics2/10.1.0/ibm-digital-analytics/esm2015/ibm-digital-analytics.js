import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
export class Angulartics2IBMDigitalAnalytics {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        if (typeof window['cmCreatePageviewTag'] !== 'function') {
            console.warn('Angulartics 2 IBM Digital Analytics Plugin: eluminate.js is not loaded');
        }
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.eventTrack(x.action, x.properties));
    }
    /**
     * Track Page in IBM Digital Analytics
     *
     * @param path location
     *
     * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_pageviewtag.html
     */
    pageTrack(path) {
        const cmCreatePageviewTag = window['cmCreatePageviewTag'];
        cmCreatePageviewTag(path, null, null, null);
    }
    /**
     * Track an event in IBM Digital Analytics
     *
     * @param action A string corresponding to the type of event that needs to be tracked.
     * @param properties The properties that need to be logged with the event.
     */
    eventTrack(action, properties = {}) {
        const cmDisplayShops = window['cmDisplayShops'];
        switch (action) {
            /**
             * @description The Product View tag captures information about vdigitalDataiews of product detail pages.
             *  The Product View tag should be called on the lowest level detail page for products, which is typically
             *  the Product Details page. You can view example Product View tags below.
             *
             * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_prodviewtag.html
             */
            case 'cmCreateProductviewTag':
                const cmCreateProductviewTag = window['cmCreateProductviewTag'];
                cmCreateProductviewTag(properties.productId, properties.productName, properties.categoryId, properties.attrbute, properties.virtualCategory);
                break;
            /**
             * @description The Shop Action 5 tag captures data about selected products and which products are present in a shopping cart,
             *  if any, when the cart is viewed.
             *
             * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_shopact5tag.html
             */
            case 'cmCreateShopAction5Tag':
                const cmCreateShopAction5Tag = window['cmCreateShopAction5Tag'];
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
                const cmCreateShopAction9Tag = window['cmCreateShopAction9Tag'];
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
                const cmCreateOrderTag = window['cmCreateOrderTag'];
                cmCreateOrderTag(properties.orderId, properties.orderSubtotal, properties.orderShipping, properties.registrationId, properties.registrantCity, properties.registrantState, properties.registrantPostalCode, properties.attrbute, properties.extraFields);
                break;
            /**
             * @description The Registration tag creates a Lifetime Visitor Experience Profile (LIVE Profile) by associating a single
             *  common Registration ID with the IBM® Digital Analytics permanent cookie set in every browser visiting the tagged site.
             *
             * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_registrationtag.html
             */
            case 'cmCreateRegistrationTag':
                const cmCreateRegistrationTag = window['cmCreateRegistrationTag'];
                cmCreateRegistrationTag(properties.registrationId, properties.registrantEmail, properties.registrantCity, properties.registrantState, properties.registrantPostalCode, properties.registrantCountry, properties.attrbute);
                break;
            /**
             * @description The Element tag is used to track intra-page content in IBM® Digital Analytics. Data collected by
             *  the Element tag is used to populate values in the Element Categories and Top Viewed Elements reports.
             *
             * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_elementtag.html
             */
            case 'cmCreateElementTag':
                const cmCreateElementTag = window['cmCreateElementTag'];
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
                const cmCreateConversionEventTag = window['cmCreateConversionEventTag'];
                cmCreateConversionEventTag(properties.eventId, properties.actionType, properties.eventCategoryId, properties.points, properties.attrbute, properties.extraFields);
                break;
            default:
                console.warn('Unsupported Event Action');
        }
    }
}
Angulartics2IBMDigitalAnalytics.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2IBMDigitalAnalytics_Factory() { return new Angulartics2IBMDigitalAnalytics(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2IBMDigitalAnalytics, providedIn: "root" });
Angulartics2IBMDigitalAnalytics.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2IBMDigitalAnalytics.ctorParameters = () => [
    { type: Angulartics2 }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWJtLWRpZ2l0YWwtYW5hbHl0aWNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wcm92aWRlcnMvaWJtLWRpZ2l0YWwtYW5hbHl0aWNzL2libS1kaWdpdGFsLWFuYWx5dGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQUc1QyxNQUFNLE9BQU8sK0JBQStCO0lBQzFDLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzVDLElBQUksT0FBTyxNQUFNLENBQUMscUJBQXFCLENBQUMsS0FBSyxVQUFVLEVBQUU7WUFDdkQsT0FBTyxDQUFDLElBQUksQ0FDVix3RUFBd0UsQ0FDekUsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVM7YUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVTthQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsU0FBUyxDQUFDLElBQVk7UUFDcEIsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLENBQUMscUJBQXFCLENBQUMs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QixVQUFVLENBQUMsUUFBUSxDQUNwQixDQUFDO2dCQUVGLE1BQU07WUFFUjs7Ozs7O2VBTUc7WUFDSCxLQUFLLDRCQUE0QjtnQkFDL0IsTUFBTSwwQkFBMEIsR0FBRyxNQUFNLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnQkFDeEUsMEJBQTBCLENBQ3hCLFVBQVUsQ0FBQyxPQUFPLEVBQ2xCLFVBQVUsQ0FBQyxVQUFVLEVBQ3JCLFVBQVUsQ0FBQyxlQUFlLEVBQzFCLFVBQVUsQ0FBQyxNQUFNLEVBQ2pCLFVBQVUsQ0FBQyxRQUFRLEVBQ25CLFVBQVUsQ0FBQyxXQUFXLENBQ3ZCLENBQUM7Z0JBRUYsTUFBTTtZQUVSO2dCQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUM7Ozs7WUE3TEYsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7O1lBRnpCLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMiB9IGZyb20gJ2FuZ3VsYXJ0aWNzMic7XHJcblxyXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MySUJNRGlnaXRhbEFuYWx5dGljcyB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMikge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3dbJ2NtQ3JlYXRlUGFnZXZpZXdUYWcnXSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBjb25zb2xlLndhcm4oXHJcbiAgICAgICAgJ0FuZ3VsYXJ0aWNzIDIgSUJNIERpZ2l0YWwgQW5hbHl0aWNzIFBsdWdpbjogZWx1bWluYXRlLmpzIGlzIG5vdCBsb2FkZWQnLFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhcnRUcmFja2luZygpOiB2b2lkIHtcclxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnBhZ2VUcmFja1xyXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgpKTtcclxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLmV2ZW50VHJhY2tcclxuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxyXG4gICAgICAuc3Vic2NyaWJlKHggPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYWNrIFBhZ2UgaW4gSUJNIERpZ2l0YWwgQW5hbHl0aWNzXHJcbiAgICpcclxuICAgKiBAcGFyYW0gcGF0aCBsb2NhdGlvblxyXG4gICAqXHJcbiAgICogQGxpbmsgaHR0cHM6Ly93d3cuaWJtLmNvbS9zdXBwb3J0L2tub3dsZWRnZWNlbnRlci9TU1BHOU0vSW1wbGVtZW50YXRpb24vaW1wbF9wYWdldmlld3RhZy5odG1sXHJcbiAgICovXHJcbiAgcGFnZVRyYWNrKHBhdGg6IHN0cmluZykge1xyXG4gICAgY29uc3QgY21DcmVhdGVQYWdldmlld1RhZyA9IHdpbmRvd1snY21DcmVhdGVQYWdldmlld1RhZyddO1xyXG4gICAgY21DcmVhdGVQYWdldmlld1RhZyhwYXRoLCBudWxsLCBudWxsLCBudWxsKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYWNrIGFuIGV2ZW50IGluIElCTSBEaWdpdGFsIEFuYWx5dGljc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIGFjdGlvbiBBIHN0cmluZyBjb3JyZXNwb25kaW5nIHRvIHRoZSB0eXBlIG9mIGV2ZW50IHRoYXQgbmVlZHMgdG8gYmUgdHJhY2tlZC5cclxuICAgKiBAcGFyYW0gcHJvcGVydGllcyBUaGUgcHJvcGVydGllcyB0aGF0IG5lZWQgdG8gYmUgbG9nZ2VkIHdpdGggdGhlIGV2ZW50LlxyXG4gICAqL1xyXG4gIGV2ZW50VHJhY2soYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IGFueSA9IHt9KSB7XHJcbiAgICBjb25zdCBjbURpc3BsYXlTaG9wcyA9IHdpbmRvd1snY21EaXNwbGF5U2hvcHMnXTtcclxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBAZGVzY3JpcHRpb24gVGhlIFByb2R1Y3QgVmlldyB0YWcgY2FwdHVyZXMgaW5mb3JtYXRpb24gYWJvdXQgdmRpZ2l0YWxEYXRhaWV3cyBvZiBwcm9kdWN0IGRldGFpbCBwYWdlcy5cclxuICAgICAgICogIFRoZSBQcm9kdWN0IFZpZXcgdGFnIHNob3VsZCBiZSBjYWxsZWQgb24gdGhlIGxvd2VzdCBsZXZlbCBkZXRhaWwgcGFnZSBmb3IgcHJvZHVjdHMsIHdoaWNoIGlzIHR5cGljYWxseVxyXG4gICAgICAgKiAgdGhlIFByb2R1Y3QgRGV0YWlscyBwYWdlLiBZb3UgY2FuIHZpZXcgZXhhbXBsZSBQcm9kdWN0IFZpZXcgdGFncyBiZWxvdy5cclxuICAgICAgICpcclxuICAgICAgICogQGxpbmsgaHR0cHM6Ly93d3cuaWJtLmNvbS9zdXBwb3J0L2tub3dsZWRnZWNlbnRlci9TU1BHOU0vSW1wbGVtZW50YXRpb24vaW1wbF9wcm9kdmlld3RhZy5odG1sXHJcbiAgICAgICAqL1xyXG4gICAgICBjYXNlICdjbUNyZWF0ZVByb2R1Y3R2aWV3VGFnJzpcclxuICAgICAgICBjb25zdCBjbUNyZWF0ZVByb2R1Y3R2aWV3VGFnID0gd2luZG93WydjbUNyZWF0ZVByb2R1Y3R2aWV3VGFnJ107XHJcbiAgICAgICAgY21DcmVhdGVQcm9kdWN0dmlld1RhZyhcclxuICAgICAgICAgIHByb3BlcnRpZXMucHJvZHVjdElkLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5wcm9kdWN0TmFtZSxcclxuICAgICAgICAgIHByb3BlcnRpZXMuY2F0ZWdvcnlJZCxcclxuICAgICAgICAgIHByb3BlcnRpZXMuYXR0cmJ1dGUsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnZpcnR1YWxDYXRlZ29yeSxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBAZGVzY3JpcHRpb24gVGhlIFNob3AgQWN0aW9uIDUgdGFnIGNhcHR1cmVzIGRhdGEgYWJvdXQgc2VsZWN0ZWQgcHJvZHVjdHMgYW5kIHdoaWNoIHByb2R1Y3RzIGFyZSBwcmVzZW50IGluIGEgc2hvcHBpbmcgY2FydCxcclxuICAgICAgICogIGlmIGFueSwgd2hlbiB0aGUgY2FydCBpcyB2aWV3ZWQuXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vd3d3LmlibS5jb20vc3VwcG9ydC9rbm93bGVkZ2VjZW50ZXIvU1NQRzlNL0ltcGxlbWVudGF0aW9uL2ltcGxfc2hvcGFjdDV0YWcuaHRtbFxyXG4gICAgICAgKi9cclxuICAgICAgY2FzZSAnY21DcmVhdGVTaG9wQWN0aW9uNVRhZyc6XHJcbiAgICAgICAgY29uc3QgY21DcmVhdGVTaG9wQWN0aW9uNVRhZyA9IHdpbmRvd1snY21DcmVhdGVTaG9wQWN0aW9uNVRhZyddO1xyXG4gICAgICAgIGNtQ3JlYXRlU2hvcEFjdGlvbjVUYWcoXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnByb2R1Y3RJZCxcclxuICAgICAgICAgIHByb3BlcnRpZXMucHJvZHVjdE5hbWUsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnF1YW50aXR5LFxyXG4gICAgICAgICAgcHJvcGVydGllcy51bml0UHJpY2UsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLmNhdGVnb3J5SWQsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLmF0dHJidXRlLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5leHRyYUZpZWxkcyxcclxuICAgICAgICAgIHByb3BlcnRpZXMudmlydHVhbENhdGVnb3J5LFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNtRGlzcGxheVNob3BzKCk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUaGUgU2hvcCBBY3Rpb24gOSB0YWcgY2FwdHVyZXMgZGF0YSBhYm91dCB3aGF0IHByb2R1Y3RzIHdlcmUgcHVyY2hhc2VkIGJ5IGEgY3VzdG9tZXIuXHJcbiAgICAgICAqICBMaWtlIHRoZSBTaG9wIEFjdGlvbiA1IHRhZywgb25lIHRhZyBzaG91bGQgYmUgc2VudCBmb3IgZWFjaCBwcm9kdWN0IGxpbmUgaXRlbSBwdXJjaGFzZWQuIFRoZXNlIHRhZ3Mgc2hvdWxkIGJlIHNlbnRcclxuICAgICAgICogIG9uIHRoZSByZWNlaXB0IG9yIG90aGVyIGNvbXBsZXRpb24gcGFnZSBjb25maXJtaW5nIGEgc3VjY2Vzc2Z1bCBvcmRlci5cclxuICAgICAgICpcclxuICAgICAgICogQGxpbmsgaHR0cHM6Ly93d3cuaWJtLmNvbS9zdXBwb3J0L2tub3dsZWRnZWNlbnRlci9TU1BHOU0vSW1wbGVtZW50YXRpb24vaW1wbF9zaG9wYWN0OXRhZy5odG1sXHJcbiAgICAgICAqL1xyXG4gICAgICBjYXNlICdjbUNyZWF0ZVNob3BBY3Rpb245VGFnJzpcclxuICAgICAgICBjb25zdCBjbUNyZWF0ZVNob3BBY3Rpb245VGFnID0gd2luZG93WydjbUNyZWF0ZVNob3BBY3Rpb245VGFnJ107XHJcbiAgICAgICAgY21DcmVhdGVTaG9wQWN0aW9uOVRhZyhcclxuICAgICAgICAgIHByb3BlcnRpZXMucHJvZHVjdElkLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5wcm9kdWN0TmFtZSxcclxuICAgICAgICAgIHByb3BlcnRpZXMucXVhbnRpdHksXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnVuaXRQcmljZSxcclxuICAgICAgICAgIHByb3BlcnRpZXMucmVnaXN0cmF0aW9uSWQsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLm9yZGVySWQsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLm9yZGVyU3VidG90YWwsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLmNhdGVnb3J5SWQsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLmF0dHJidXRlLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5leHRyYUZpZWxkcyxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjbURpc3BsYXlTaG9wcygpO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBAZGVzY3JpcHRpb24gVGhlIE9yZGVyIHRhZyBjYXB0dXJlcyBvcmRlciBoZWFkZXIgaW5mb3JtYXRpb24gc3VjaCBhcyBSZWdpc3RyYXRpb24gSUQsIG9yZGVyIElELCBvcmRlciBzdWJ0b3RhbCxcclxuICAgICAgICogIGFuZCBzaGlwcGluZyBhbmQgaGFuZGxpbmcuIFRoZSBPcmRlciB0YWcgc2hvdWxkIGJlIHNlbnQgb24gdGhlIHJlY2VpcHQgcGFnZSBjb25maXJtaW5nIG9yZGVyIGNvbXBsZXRpb24uXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vd3d3LmlibS5jb20vc3VwcG9ydC9rbm93bGVkZ2VjZW50ZXIvU1NQRzlNL0ltcGxlbWVudGF0aW9uL2ltcGxfb3JkZXJ0YWcuaHRtbFxyXG4gICAgICAgKi9cclxuICAgICAgY2FzZSAnY21DcmVhdGVPcmRlclRhZyc6XHJcbiAgICAgICAgY29uc3QgY21DcmVhdGVPcmRlclRhZyA9IHdpbmRvd1snY21DcmVhdGVPcmRlclRhZyddO1xyXG4gICAgICAgIGNtQ3JlYXRlT3JkZXJUYWcoXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLm9yZGVySWQsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLm9yZGVyU3VidG90YWwsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLm9yZGVyU2hpcHBpbmcsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnJlZ2lzdHJhdGlvbklkLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5yZWdpc3RyYW50Q2l0eSxcclxuICAgICAgICAgIHByb3BlcnRpZXMucmVnaXN0cmFudFN0YXRlLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5yZWdpc3RyYW50UG9zdGFsQ29kZSxcclxuICAgICAgICAgIHByb3BlcnRpZXMuYXR0cmJ1dGUsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLmV4dHJhRmllbGRzLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUaGUgUmVnaXN0cmF0aW9uIHRhZyBjcmVhdGVzIGEgTGlmZXRpbWUgVmlzaXRvciBFeHBlcmllbmNlIFByb2ZpbGUgKExJVkUgUHJvZmlsZSkgYnkgYXNzb2NpYXRpbmcgYSBzaW5nbGVcclxuICAgICAgICogIGNvbW1vbiBSZWdpc3RyYXRpb24gSUQgd2l0aCB0aGUgSUJNwq4gRGlnaXRhbCBBbmFseXRpY3MgcGVybWFuZW50IGNvb2tpZSBzZXQgaW4gZXZlcnkgYnJvd3NlciB2aXNpdGluZyB0aGUgdGFnZ2VkIHNpdGUuXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vd3d3LmlibS5jb20vc3VwcG9ydC9rbm93bGVkZ2VjZW50ZXIvU1NQRzlNL0ltcGxlbWVudGF0aW9uL2ltcGxfcmVnaXN0cmF0aW9udGFnLmh0bWxcclxuICAgICAgICovXHJcbiAgICAgIGNhc2UgJ2NtQ3JlYXRlUmVnaXN0cmF0aW9uVGFnJzpcclxuICAgICAgICBjb25zdCBjbUNyZWF0ZVJlZ2lzdHJhdGlvblRhZyA9IHdpbmRvd1snY21DcmVhdGVSZWdpc3RyYXRpb25UYWcnXTtcclxuICAgICAgICBjbUNyZWF0ZVJlZ2lzdHJhdGlvblRhZyhcclxuICAgICAgICAgIHByb3BlcnRpZXMucmVnaXN0cmF0aW9uSWQsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnJlZ2lzdHJhbnRFbWFpbCxcclxuICAgICAgICAgIHByb3BlcnRpZXMucmVnaXN0cmFudENpdHksXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnJlZ2lzdHJhbnRTdGF0ZSxcclxuICAgICAgICAgIHByb3BlcnRpZXMucmVnaXN0cmFudFBvc3RhbENvZGUsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnJlZ2lzdHJhbnRDb3VudHJ5LFxyXG4gICAgICAgICAgcHJvcGVydGllcy5hdHRyYnV0ZSxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBAZGVzY3JpcHRpb24gVGhlIEVsZW1lbnQgdGFnIGlzIHVzZWQgdG8gdHJhY2sgaW50cmEtcGFnZSBjb250ZW50IGluIElCTcKuIERpZ2l0YWwgQW5hbHl0aWNzLiBEYXRhIGNvbGxlY3RlZCBieVxyXG4gICAgICAgKiAgdGhlIEVsZW1lbnQgdGFnIGlzIHVzZWQgdG8gcG9wdWxhdGUgdmFsdWVzIGluIHRoZSBFbGVtZW50IENhdGVnb3JpZXMgYW5kIFRvcCBWaWV3ZWQgRWxlbWVudHMgcmVwb3J0cy5cclxuICAgICAgICpcclxuICAgICAgICogQGxpbmsgaHR0cHM6Ly93d3cuaWJtLmNvbS9zdXBwb3J0L2tub3dsZWRnZWNlbnRlci9TU1BHOU0vSW1wbGVtZW50YXRpb24vaW1wbF9lbGVtZW50dGFnLmh0bWxcclxuICAgICAgICovXHJcbiAgICAgIGNhc2UgJ2NtQ3JlYXRlRWxlbWVudFRhZyc6XHJcbiAgICAgICAgY29uc3QgY21DcmVhdGVFbGVtZW50VGFnID0gd2luZG93WydjbUNyZWF0ZUVsZW1lbnRUYWcnXTtcclxuICAgICAgICBjbUNyZWF0ZUVsZW1lbnRUYWcoXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLmVsZW1lbnRJZCxcclxuICAgICAgICAgIHByb3BlcnRpZXMuZWxlbWVudENhdGVnb3J5LFxyXG4gICAgICAgICAgcHJvcGVydGllcy5hdHRyYnV0ZSxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBAZGVzY3JpcHRpb24gVGhlIENvbnZlcnNpb24gRXZlbnQgdGFnIGlzIGVtcGxveWVkIGZvciB0cmFja2luZyBvZiBnZW5lcmFsIG5vbi1jb21tZXJjZSBjb252ZXJzaW9uIGV2ZW50cy5cclxuICAgICAgICogVGhlIENvbnZlcnNpb24gRXZlbnQgdGFnIGlzIHVzZWQgdG8gcG9wdWxhdGUgdmFsdWVzIGluIHRoZSBDb252ZXJzaW9uIEV2ZW50cyBSZXBvcnRzIGFuZCB0byBjcmVhdGUgS2V5IFNlZ21lbnRzLlxyXG4gICAgICAgKiBUaGlzIHRhZyBhbmQgdGhlIHJlcG9ydHMgaXQgcG9wdWxhdGVzIGVuYWJsZSBhbmFseXNpcyBvZiBhIHdpZGUgdmFyaWV0eSBvZiBzaXRlIGFjdGl2aXRpZXMuXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vd3d3LmlibS5jb20vc3VwcG9ydC9rbm93bGVkZ2VjZW50ZXIvU1NQRzlNL0ltcGxlbWVudGF0aW9uL2ltcGxfY29udmVyc2lvbmV2ZW50dGFnLmh0bWxcclxuICAgICAgICovXHJcbiAgICAgIGNhc2UgJ2NtQ3JlYXRlQ29udmVyc2lvbkV2ZW50VGFnJzpcclxuICAgICAgICBjb25zdCBjbUNyZWF0ZUNvbnZlcnNpb25FdmVudFRhZyA9IHdpbmRvd1snY21DcmVhdGVDb252ZXJzaW9uRXZlbnRUYWcnXTtcclxuICAgICAgICBjbUNyZWF0ZUNvbnZlcnNpb25FdmVudFRhZyhcclxuICAgICAgICAgIHByb3BlcnRpZXMuZXZlbnRJZCxcclxuICAgICAgICAgIHByb3BlcnRpZXMuYWN0aW9uVHlwZSxcclxuICAgICAgICAgIHByb3BlcnRpZXMuZXZlbnRDYXRlZ29yeUlkLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5wb2ludHMsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLmF0dHJidXRlLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5leHRyYUZpZWxkcyxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdVbnN1cHBvcnRlZCBFdmVudCBBY3Rpb24nKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19