import { Injectable } from '@angular/core';
import { Angulartics2 } from '../../angulartics2-core';
import * as i0 from "@angular/core";
import * as i1 from "../../angulartics2-core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWJtLWRpZ2l0YWwtYW5hbHl0aWNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wcm92aWRlcnMvaWJtLWRpZ2l0YWwtYW5hbHl0aWNzL2libS1kaWdpdGFsLWFuYWx5dGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7O0FBR3ZELE1BQU0sT0FBTywrQkFBK0I7SUFDMUMsWUFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDNUMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLFVBQVUsRUFBRTtZQUN2RCxPQUFPLENBQUMsSUFBSSxDQUFDLHdFQUF3RSxDQUFDLENBQUM7U0FDeEY7SUFDSCxDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUzthQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVO2FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxTQUFTLENBQUMsSUFBWTtRQUNwQixNQUFNLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FB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LFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFMUYsTUFBTTtZQUVSOzs7Ozs7ZUFNRztZQUNILEtBQUssNEJBQTRCO2dCQUMvQixNQUFNLDBCQUEwQixHQUFHLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2dCQUN4RSwwQkFBMEIsQ0FDeEIsVUFBVSxDQUFDLE9BQU8sRUFDbEIsVUFBVSxDQUFDLFVBQVUsRUFDckIsVUFBVSxDQUFDLGVBQWUsRUFDMUIsVUFBVSxDQUFDLE1BQU0sRUFDakIsVUFBVSxDQUFDLFFBQVEsRUFDbkIsVUFBVSxDQUFDLFdBQVcsQ0FDdkIsQ0FBQztnQkFFRixNQUFNO1lBRVI7Z0JBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQzs7OztZQXZMRixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7WUFGekIsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnLi4vLi4vYW5ndWxhcnRpY3MyLWNvcmUnO1xyXG5cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMklCTURpZ2l0YWxBbmFseXRpY3Mge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczIpIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93WydjbUNyZWF0ZVBhZ2V2aWV3VGFnJ10gIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgY29uc29sZS53YXJuKCdBbmd1bGFydGljcyAyIElCTSBEaWdpdGFsIEFuYWx5dGljcyBQbHVnaW46IGVsdW1pbmF0ZS5qcyBpcyBub3QgbG9hZGVkJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGFydFRyYWNraW5nKCk6IHZvaWQge1xyXG4gICAgdGhpcy5hbmd1bGFydGljczIucGFnZVRyYWNrXHJcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcclxuICAgICAgLnN1YnNjcmliZSh4ID0+IHRoaXMucGFnZVRyYWNrKHgucGF0aCkpO1xyXG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFja1xyXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB0aGlzLmV2ZW50VHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhY2sgUGFnZSBpbiBJQk0gRGlnaXRhbCBBbmFseXRpY3NcclxuICAgKlxyXG4gICAqIEBwYXJhbSBwYXRoIGxvY2F0aW9uXHJcbiAgICpcclxuICAgKiBAbGluayBodHRwczovL3d3dy5pYm0uY29tL3N1cHBvcnQva25vd2xlZGdlY2VudGVyL1NTUEc5TS9JbXBsZW1lbnRhdGlvbi9pbXBsX3BhZ2V2aWV3dGFnLmh0bWxcclxuICAgKi9cclxuICBwYWdlVHJhY2socGF0aDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBjbUNyZWF0ZVBhZ2V2aWV3VGFnID0gd2luZG93WydjbUNyZWF0ZVBhZ2V2aWV3VGFnJ107XHJcbiAgICBjbUNyZWF0ZVBhZ2V2aWV3VGFnKHBhdGgsIG51bGwsIG51bGwsIG51bGwpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhY2sgYW4gZXZlbnQgaW4gSUJNIERpZ2l0YWwgQW5hbHl0aWNzXHJcbiAgICpcclxuICAgKiBAcGFyYW0gYWN0aW9uIEEgc3RyaW5nIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHR5cGUgb2YgZXZlbnQgdGhhdCBuZWVkcyB0byBiZSB0cmFja2VkLlxyXG4gICAqIEBwYXJhbSBwcm9wZXJ0aWVzIFRoZSBwcm9wZXJ0aWVzIHRoYXQgbmVlZCB0byBiZSBsb2dnZWQgd2l0aCB0aGUgZXZlbnQuXHJcbiAgICovXHJcbiAgZXZlbnRUcmFjayhhY3Rpb246IHN0cmluZywgcHJvcGVydGllczogYW55ID0ge30pIHtcclxuICAgIGNvbnN0IGNtRGlzcGxheVNob3BzID0gd2luZG93WydjbURpc3BsYXlTaG9wcyddO1xyXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcclxuICAgICAgLyoqXHJcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUaGUgUHJvZHVjdCBWaWV3IHRhZyBjYXB0dXJlcyBpbmZvcm1hdGlvbiBhYm91dCB2ZGlnaXRhbERhdGFpZXdzIG9mIHByb2R1Y3QgZGV0YWlsIHBhZ2VzLlxyXG4gICAgICAgKiAgVGhlIFByb2R1Y3QgVmlldyB0YWcgc2hvdWxkIGJlIGNhbGxlZCBvbiB0aGUgbG93ZXN0IGxldmVsIGRldGFpbCBwYWdlIGZvciBwcm9kdWN0cywgd2hpY2ggaXMgdHlwaWNhbGx5XHJcbiAgICAgICAqICB0aGUgUHJvZHVjdCBEZXRhaWxzIHBhZ2UuIFlvdSBjYW4gdmlldyBleGFtcGxlIFByb2R1Y3QgVmlldyB0YWdzIGJlbG93LlxyXG4gICAgICAgKlxyXG4gICAgICAgKiBAbGluayBodHRwczovL3d3dy5pYm0uY29tL3N1cHBvcnQva25vd2xlZGdlY2VudGVyL1NTUEc5TS9JbXBsZW1lbnRhdGlvbi9pbXBsX3Byb2R2aWV3dGFnLmh0bWxcclxuICAgICAgICovXHJcbiAgICAgIGNhc2UgJ2NtQ3JlYXRlUHJvZHVjdHZpZXdUYWcnOlxyXG4gICAgICAgIGNvbnN0IGNtQ3JlYXRlUHJvZHVjdHZpZXdUYWcgPSB3aW5kb3dbJ2NtQ3JlYXRlUHJvZHVjdHZpZXdUYWcnXTtcclxuICAgICAgICBjbUNyZWF0ZVByb2R1Y3R2aWV3VGFnKFxyXG4gICAgICAgICAgcHJvcGVydGllcy5wcm9kdWN0SWQsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnByb2R1Y3ROYW1lLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5jYXRlZ29yeUlkLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5hdHRyYnV0ZSxcclxuICAgICAgICAgIHByb3BlcnRpZXMudmlydHVhbENhdGVnb3J5LFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUaGUgU2hvcCBBY3Rpb24gNSB0YWcgY2FwdHVyZXMgZGF0YSBhYm91dCBzZWxlY3RlZCBwcm9kdWN0cyBhbmQgd2hpY2ggcHJvZHVjdHMgYXJlIHByZXNlbnQgaW4gYSBzaG9wcGluZyBjYXJ0LFxyXG4gICAgICAgKiAgaWYgYW55LCB3aGVuIHRoZSBjYXJ0IGlzIHZpZXdlZC5cclxuICAgICAgICpcclxuICAgICAgICogQGxpbmsgaHR0cHM6Ly93d3cuaWJtLmNvbS9zdXBwb3J0L2tub3dsZWRnZWNlbnRlci9TU1BHOU0vSW1wbGVtZW50YXRpb24vaW1wbF9zaG9wYWN0NXRhZy5odG1sXHJcbiAgICAgICAqL1xyXG4gICAgICBjYXNlICdjbUNyZWF0ZVNob3BBY3Rpb241VGFnJzpcclxuICAgICAgICBjb25zdCBjbUNyZWF0ZVNob3BBY3Rpb241VGFnID0gd2luZG93WydjbUNyZWF0ZVNob3BBY3Rpb241VGFnJ107XHJcbiAgICAgICAgY21DcmVhdGVTaG9wQWN0aW9uNVRhZyhcclxuICAgICAgICAgIHByb3BlcnRpZXMucHJvZHVjdElkLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5wcm9kdWN0TmFtZSxcclxuICAgICAgICAgIHByb3BlcnRpZXMucXVhbnRpdHksXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnVuaXRQcmljZSxcclxuICAgICAgICAgIHByb3BlcnRpZXMuY2F0ZWdvcnlJZCxcclxuICAgICAgICAgIHByb3BlcnRpZXMuYXR0cmJ1dGUsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLmV4dHJhRmllbGRzLFxyXG4gICAgICAgICAgcHJvcGVydGllcy52aXJ0dWFsQ2F0ZWdvcnksXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgY21EaXNwbGF5U2hvcHMoKTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogQGRlc2NyaXB0aW9uIFRoZSBTaG9wIEFjdGlvbiA5IHRhZyBjYXB0dXJlcyBkYXRhIGFib3V0IHdoYXQgcHJvZHVjdHMgd2VyZSBwdXJjaGFzZWQgYnkgYSBjdXN0b21lci5cclxuICAgICAgICogIExpa2UgdGhlIFNob3AgQWN0aW9uIDUgdGFnLCBvbmUgdGFnIHNob3VsZCBiZSBzZW50IGZvciBlYWNoIHByb2R1Y3QgbGluZSBpdGVtIHB1cmNoYXNlZC4gVGhlc2UgdGFncyBzaG91bGQgYmUgc2VudFxyXG4gICAgICAgKiAgb24gdGhlIHJlY2VpcHQgb3Igb3RoZXIgY29tcGxldGlvbiBwYWdlIGNvbmZpcm1pbmcgYSBzdWNjZXNzZnVsIG9yZGVyLlxyXG4gICAgICAgKlxyXG4gICAgICAgKiBAbGluayBodHRwczovL3d3dy5pYm0uY29tL3N1cHBvcnQva25vd2xlZGdlY2VudGVyL1NTUEc5TS9JbXBsZW1lbnRhdGlvbi9pbXBsX3Nob3BhY3Q5dGFnLmh0bWxcclxuICAgICAgICovXHJcbiAgICAgIGNhc2UgJ2NtQ3JlYXRlU2hvcEFjdGlvbjlUYWcnOlxyXG4gICAgICAgIGNvbnN0IGNtQ3JlYXRlU2hvcEFjdGlvbjlUYWcgPSB3aW5kb3dbJ2NtQ3JlYXRlU2hvcEFjdGlvbjlUYWcnXTtcclxuICAgICAgICBjbUNyZWF0ZVNob3BBY3Rpb245VGFnKFxyXG4gICAgICAgICAgcHJvcGVydGllcy5wcm9kdWN0SWQsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnByb2R1Y3ROYW1lLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5xdWFudGl0eSxcclxuICAgICAgICAgIHByb3BlcnRpZXMudW5pdFByaWNlLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5yZWdpc3RyYXRpb25JZCxcclxuICAgICAgICAgIHByb3BlcnRpZXMub3JkZXJJZCxcclxuICAgICAgICAgIHByb3BlcnRpZXMub3JkZXJTdWJ0b3RhbCxcclxuICAgICAgICAgIHByb3BlcnRpZXMuY2F0ZWdvcnlJZCxcclxuICAgICAgICAgIHByb3BlcnRpZXMuYXR0cmJ1dGUsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLmV4dHJhRmllbGRzLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNtRGlzcGxheVNob3BzKCk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUaGUgT3JkZXIgdGFnIGNhcHR1cmVzIG9yZGVyIGhlYWRlciBpbmZvcm1hdGlvbiBzdWNoIGFzIFJlZ2lzdHJhdGlvbiBJRCwgb3JkZXIgSUQsIG9yZGVyIHN1YnRvdGFsLFxyXG4gICAgICAgKiAgYW5kIHNoaXBwaW5nIGFuZCBoYW5kbGluZy4gVGhlIE9yZGVyIHRhZyBzaG91bGQgYmUgc2VudCBvbiB0aGUgcmVjZWlwdCBwYWdlIGNvbmZpcm1pbmcgb3JkZXIgY29tcGxldGlvbi5cclxuICAgICAgICpcclxuICAgICAgICogQGxpbmsgaHR0cHM6Ly93d3cuaWJtLmNvbS9zdXBwb3J0L2tub3dsZWRnZWNlbnRlci9TU1BHOU0vSW1wbGVtZW50YXRpb24vaW1wbF9vcmRlcnRhZy5odG1sXHJcbiAgICAgICAqL1xyXG4gICAgICBjYXNlICdjbUNyZWF0ZU9yZGVyVGFnJzpcclxuICAgICAgICBjb25zdCBjbUNyZWF0ZU9yZGVyVGFnID0gd2luZG93WydjbUNyZWF0ZU9yZGVyVGFnJ107XHJcbiAgICAgICAgY21DcmVhdGVPcmRlclRhZyhcclxuICAgICAgICAgIHByb3BlcnRpZXMub3JkZXJJZCxcclxuICAgICAgICAgIHByb3BlcnRpZXMub3JkZXJTdWJ0b3RhbCxcclxuICAgICAgICAgIHByb3BlcnRpZXMub3JkZXJTaGlwcGluZyxcclxuICAgICAgICAgIHByb3BlcnRpZXMucmVnaXN0cmF0aW9uSWQsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnJlZ2lzdHJhbnRDaXR5LFxyXG4gICAgICAgICAgcHJvcGVydGllcy5yZWdpc3RyYW50U3RhdGUsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLnJlZ2lzdHJhbnRQb3N0YWxDb2RlLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5hdHRyYnV0ZSxcclxuICAgICAgICAgIHByb3BlcnRpZXMuZXh0cmFGaWVsZHMsXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogQGRlc2NyaXB0aW9uIFRoZSBSZWdpc3RyYXRpb24gdGFnIGNyZWF0ZXMgYSBMaWZldGltZSBWaXNpdG9yIEV4cGVyaWVuY2UgUHJvZmlsZSAoTElWRSBQcm9maWxlKSBieSBhc3NvY2lhdGluZyBhIHNpbmdsZVxyXG4gICAgICAgKiAgY29tbW9uIFJlZ2lzdHJhdGlvbiBJRCB3aXRoIHRoZSBJQk3CriBEaWdpdGFsIEFuYWx5dGljcyBwZXJtYW5lbnQgY29va2llIHNldCBpbiBldmVyeSBicm93c2VyIHZpc2l0aW5nIHRoZSB0YWdnZWQgc2l0ZS5cclxuICAgICAgICpcclxuICAgICAgICogQGxpbmsgaHR0cHM6Ly93d3cuaWJtLmNvbS9zdXBwb3J0L2tub3dsZWRnZWNlbnRlci9TU1BHOU0vSW1wbGVtZW50YXRpb24vaW1wbF9yZWdpc3RyYXRpb250YWcuaHRtbFxyXG4gICAgICAgKi9cclxuICAgICAgY2FzZSAnY21DcmVhdGVSZWdpc3RyYXRpb25UYWcnOlxyXG4gICAgICAgIGNvbnN0IGNtQ3JlYXRlUmVnaXN0cmF0aW9uVGFnID0gd2luZG93WydjbUNyZWF0ZVJlZ2lzdHJhdGlvblRhZyddO1xyXG4gICAgICAgIGNtQ3JlYXRlUmVnaXN0cmF0aW9uVGFnKFxyXG4gICAgICAgICAgcHJvcGVydGllcy5yZWdpc3RyYXRpb25JZCxcclxuICAgICAgICAgIHByb3BlcnRpZXMucmVnaXN0cmFudEVtYWlsLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5yZWdpc3RyYW50Q2l0eSxcclxuICAgICAgICAgIHByb3BlcnRpZXMucmVnaXN0cmFudFN0YXRlLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5yZWdpc3RyYW50UG9zdGFsQ29kZSxcclxuICAgICAgICAgIHByb3BlcnRpZXMucmVnaXN0cmFudENvdW50cnksXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLmF0dHJidXRlLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIEBkZXNjcmlwdGlvbiBUaGUgRWxlbWVudCB0YWcgaXMgdXNlZCB0byB0cmFjayBpbnRyYS1wYWdlIGNvbnRlbnQgaW4gSUJNwq4gRGlnaXRhbCBBbmFseXRpY3MuIERhdGEgY29sbGVjdGVkIGJ5XHJcbiAgICAgICAqICB0aGUgRWxlbWVudCB0YWcgaXMgdXNlZCB0byBwb3B1bGF0ZSB2YWx1ZXMgaW4gdGhlIEVsZW1lbnQgQ2F0ZWdvcmllcyBhbmQgVG9wIFZpZXdlZCBFbGVtZW50cyByZXBvcnRzLlxyXG4gICAgICAgKlxyXG4gICAgICAgKiBAbGluayBodHRwczovL3d3dy5pYm0uY29tL3N1cHBvcnQva25vd2xlZGdlY2VudGVyL1NTUEc5TS9JbXBsZW1lbnRhdGlvbi9pbXBsX2VsZW1lbnR0YWcuaHRtbFxyXG4gICAgICAgKi9cclxuICAgICAgY2FzZSAnY21DcmVhdGVFbGVtZW50VGFnJzpcclxuICAgICAgICBjb25zdCBjbUNyZWF0ZUVsZW1lbnRUYWcgPSB3aW5kb3dbJ2NtQ3JlYXRlRWxlbWVudFRhZyddO1xyXG4gICAgICAgIGNtQ3JlYXRlRWxlbWVudFRhZyhwcm9wZXJ0aWVzLmVsZW1lbnRJZCwgcHJvcGVydGllcy5lbGVtZW50Q2F0ZWdvcnksIHByb3BlcnRpZXMuYXR0cmJ1dGUpO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBAZGVzY3JpcHRpb24gVGhlIENvbnZlcnNpb24gRXZlbnQgdGFnIGlzIGVtcGxveWVkIGZvciB0cmFja2luZyBvZiBnZW5lcmFsIG5vbi1jb21tZXJjZSBjb252ZXJzaW9uIGV2ZW50cy5cclxuICAgICAgICogVGhlIENvbnZlcnNpb24gRXZlbnQgdGFnIGlzIHVzZWQgdG8gcG9wdWxhdGUgdmFsdWVzIGluIHRoZSBDb252ZXJzaW9uIEV2ZW50cyBSZXBvcnRzIGFuZCB0byBjcmVhdGUgS2V5IFNlZ21lbnRzLlxyXG4gICAgICAgKiBUaGlzIHRhZyBhbmQgdGhlIHJlcG9ydHMgaXQgcG9wdWxhdGVzIGVuYWJsZSBhbmFseXNpcyBvZiBhIHdpZGUgdmFyaWV0eSBvZiBzaXRlIGFjdGl2aXRpZXMuXHJcbiAgICAgICAqXHJcbiAgICAgICAqIEBsaW5rIGh0dHBzOi8vd3d3LmlibS5jb20vc3VwcG9ydC9rbm93bGVkZ2VjZW50ZXIvU1NQRzlNL0ltcGxlbWVudGF0aW9uL2ltcGxfY29udmVyc2lvbmV2ZW50dGFnLmh0bWxcclxuICAgICAgICovXHJcbiAgICAgIGNhc2UgJ2NtQ3JlYXRlQ29udmVyc2lvbkV2ZW50VGFnJzpcclxuICAgICAgICBjb25zdCBjbUNyZWF0ZUNvbnZlcnNpb25FdmVudFRhZyA9IHdpbmRvd1snY21DcmVhdGVDb252ZXJzaW9uRXZlbnRUYWcnXTtcclxuICAgICAgICBjbUNyZWF0ZUNvbnZlcnNpb25FdmVudFRhZyhcclxuICAgICAgICAgIHByb3BlcnRpZXMuZXZlbnRJZCxcclxuICAgICAgICAgIHByb3BlcnRpZXMuYWN0aW9uVHlwZSxcclxuICAgICAgICAgIHByb3BlcnRpZXMuZXZlbnRDYXRlZ29yeUlkLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5wb2ludHMsXHJcbiAgICAgICAgICBwcm9wZXJ0aWVzLmF0dHJidXRlLFxyXG4gICAgICAgICAgcHJvcGVydGllcy5leHRyYUZpZWxkcyxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdVbnN1cHBvcnRlZCBFdmVudCBBY3Rpb24nKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19