import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Byb3ZpZGVycy9mYWNlYm9vay9mYWNlYm9vay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQUk1QyxNQUFNLGlCQUFpQixHQUFHO0lBQ3hCLGFBQWE7SUFDYixRQUFRO0lBQ1IsV0FBVztJQUNYLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLFVBQVU7SUFDVixNQUFNO0lBQ04sc0JBQXNCO0NBQ3ZCLENBQUM7QUFHRixNQUFNLE9BQU8sb0JBQW9CO0lBQy9CLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQUksQ0FBQztJQUVuRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVO2FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsVUFBVSxDQUFDLE1BQWMsRUFBRSxhQUFrQixFQUFFO1FBQzdDLElBQUksT0FBTyxHQUFHLEtBQUssV0FBVyxFQUFFO1lBQzlCLE9BQU87U0FDUjtRQUNELElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzVDLE9BQU8sR0FBRyxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDL0M7UUFDRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7WUF2QkYsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7O1lBaEJ6QixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICdhbmd1bGFydGljczInO1xuXG5kZWNsYXJlIGNvbnN0IGZicTogZmFjZWJvb2suUGl4ZWwuRXZlbnQ7XG5cbmNvbnN0IGZhY2Vib29rRXZlbnRMaXN0ID0gW1xuICAnVmlld0NvbnRlbnQnLFxuICAnU2VhcmNoJyxcbiAgJ0FkZFRvQ2FydCcsXG4gICdBZGRUb1dpc2hsaXN0JyxcbiAgJ0luaXRpYXRlQ2hlY2tvdXQnLFxuICAnQWRkUGF5bWVudEluZm8nLFxuICAnUHVyY2hhc2UnLFxuICAnTGVhZCcsXG4gICdDb21wbGV0ZVJlZ2lzdHJhdGlvbicsXG5dO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMkZhY2Vib29rIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMikgeyB9XG5cbiAgc3RhcnRUcmFja2luZygpOiB2b2lkIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKHggPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGludGVyYWN0aW9ucyB0byB0aGUgUGl4ZWwsIGkuZS4gZm9yIGV2ZW50IHRyYWNraW5nIGluIFBpeGVsXG4gICAqXG4gICAqIEBwYXJhbSBhY3Rpb24gYWN0aW9uIGFzc29jaWF0ZWQgd2l0aCB0aGUgZXZlbnRcbiAgICovXG4gIGV2ZW50VHJhY2soYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IGFueSA9IHt9KSB7XG4gICAgaWYgKHR5cGVvZiBmYnEgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChmYWNlYm9va0V2ZW50TGlzdC5pbmRleE9mKGFjdGlvbikgPT09IC0xKSB7XG4gICAgICByZXR1cm4gZmJxKCd0cmFja0N1c3RvbScsIGFjdGlvbiwgcHJvcGVydGllcyk7XG4gICAgfVxuICAgIHJldHVybiBmYnEoJ3RyYWNrJywgYWN0aW9uLCBwcm9wZXJ0aWVzKTtcbiAgfVxufVxuIl19