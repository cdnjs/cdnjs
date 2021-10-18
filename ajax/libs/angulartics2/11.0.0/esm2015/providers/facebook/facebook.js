import { Injectable } from '@angular/core';
import { Angulartics2 } from '../../angulartics2-core';
import * as i0 from "@angular/core";
import * as i1 from "../../angulartics2-core";
const facebookEventList = [
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
export class Angulartics2Facebook {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
    }
    startTracking() {
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.eventTrack(x.action, x.properties));
    }
    /**
     * Send interactions to the Pixel, i.e. for event tracking in Pixel
     *
     * @param action action associated with the event
     */
    eventTrack(action, properties = {}) {
        if (typeof fbq === 'undefined') {
            return;
        }
        if (facebookEventList.indexOf(action) === -1) {
            return fbq('trackCustom', action, properties);
        }
        return fbq('track', action, properties);
    }
}
Angulartics2Facebook.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Facebook_Factory() { return new Angulartics2Facebook(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Facebook, providedIn: "root" });
Angulartics2Facebook.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2Facebook.ctorParameters = () => [
    { type: Angulartics2 }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Byb3ZpZGVycy9mYWNlYm9vay9mYWNlYm9vay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7O0FBSXZELE1BQU0saUJBQWlCLEdBQUc7SUFDeEIsYUFBYTtJQUNiLFFBQVE7SUFDUixXQUFXO0lBQ1gsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsVUFBVTtJQUNWLE1BQU07SUFDTixzQkFBc0I7Q0FDdkIsQ0FBQztBQUdGLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0IsWUFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFBSSxDQUFDO0lBRW5ELGFBQWE7UUFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVU7YUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxVQUFVLENBQUMsTUFBYyxFQUFFLGFBQWtCLEVBQUU7UUFDN0MsSUFBSSxPQUFPLEdBQUcsS0FBSyxXQUFXLEVBQUU7WUFDOUIsT0FBTztTQUNSO1FBQ0QsSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDNUMsT0FBTyxHQUFHLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztTQUMvQztRQUNELE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7OztZQXZCRixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7WUFoQnpCLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMiB9IGZyb20gJy4uLy4uL2FuZ3VsYXJ0aWNzMi1jb3JlJztcblxuZGVjbGFyZSBjb25zdCBmYnE6IGZhY2Vib29rLlBpeGVsLkV2ZW50O1xuXG5jb25zdCBmYWNlYm9va0V2ZW50TGlzdCA9IFtcbiAgJ1ZpZXdDb250ZW50JyxcbiAgJ1NlYXJjaCcsXG4gICdBZGRUb0NhcnQnLFxuICAnQWRkVG9XaXNobGlzdCcsXG4gICdJbml0aWF0ZUNoZWNrb3V0JyxcbiAgJ0FkZFBheW1lbnRJbmZvJyxcbiAgJ1B1cmNoYXNlJyxcbiAgJ0xlYWQnLFxuICAnQ29tcGxldGVSZWdpc3RyYXRpb24nLFxuXTtcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJGYWNlYm9vayB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczIpIHsgfVxuXG4gIHN0YXJ0VHJhY2tpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSh4ID0+IHRoaXMuZXZlbnRUcmFjayh4LmFjdGlvbiwgeC5wcm9wZXJ0aWVzKSk7XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBpbnRlcmFjdGlvbnMgdG8gdGhlIFBpeGVsLCBpLmUuIGZvciBldmVudCB0cmFja2luZyBpbiBQaXhlbFxuICAgKlxuICAgKiBAcGFyYW0gYWN0aW9uIGFjdGlvbiBhc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50XG4gICAqL1xuICBldmVudFRyYWNrKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBhbnkgPSB7fSkge1xuICAgIGlmICh0eXBlb2YgZmJxID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZmFjZWJvb2tFdmVudExpc3QuaW5kZXhPZihhY3Rpb24pID09PSAtMSkge1xuICAgICAgcmV0dXJuIGZicSgndHJhY2tDdXN0b20nLCBhY3Rpb24sIHByb3BlcnRpZXMpO1xuICAgIH1cbiAgICByZXR1cm4gZmJxKCd0cmFjaycsIGFjdGlvbiwgcHJvcGVydGllcyk7XG4gIH1cbn1cbiJdfQ==