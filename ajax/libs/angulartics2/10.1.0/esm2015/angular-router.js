import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
/**
 * Track Route changes for applications using Angular's
 * default router
 *
 * @link https://angular.io/api/router/Router
 */
export class AngularRouterTracking {
    constructor(router, location) {
        this.router = router;
        this.location = location;
    }
    trackLocation(settings) {
        return this.router.events.pipe(filter(e => e instanceof NavigationEnd), filter(() => !settings.developerMode), map((e) => {
            return { url: e.urlAfterRedirects };
        }), delay(0));
    }
    prepareExternalUrl(url) {
        return this.location.prepareExternalUrl(url);
    }
}
AngularRouterTracking.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularRouterTracking_Factory() { return new AngularRouterTracking(i0.ɵɵinject(i1.Router), i0.ɵɵinject(i2.Location)); }, token: AngularRouterTracking, providedIn: "root" });
AngularRouterTracking.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
AngularRouterTracking.ctorParameters = () => [
    { type: Router },
    { type: Location }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1yb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvcmUvYW5ndWxhci1yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV4RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUtwRDs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsWUFDVSxNQUFjLEVBQ2QsUUFBa0I7UUFEbEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDekIsQ0FBQztJQUVKLGFBQWEsQ0FBQyxRQUFRO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUM1QixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFlBQVksYUFBYSxDQUFDLEVBQ3ZDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFDckMsR0FBRyxDQUFDLENBQUMsQ0FBZ0IsRUFBRSxFQUFFO1lBQ3ZCLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdEMsQ0FBQyxDQUFDLEVBQ0YsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUNULENBQUM7SUFDSixDQUFDO0lBRUQsa0JBQWtCLENBQUMsR0FBVztRQUM1QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7OztZQXBCRixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7WUFiVixNQUFNO1lBRnJCLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBkZWxheSwgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFJvdXRlcmxlc3NUcmFja2luZywgVHJhY2tOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnLi9yb3V0ZXJsZXNzJztcblxuLyoqXG4gKiBUcmFjayBSb3V0ZSBjaGFuZ2VzIGZvciBhcHBsaWNhdGlvbnMgdXNpbmcgQW5ndWxhcidzXG4gKiBkZWZhdWx0IHJvdXRlclxuICpcbiAqIEBsaW5rIGh0dHBzOi8vYW5ndWxhci5pby9hcGkvcm91dGVyL1JvdXRlclxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJSb3V0ZXJUcmFja2luZyBpbXBsZW1lbnRzIFJvdXRlcmxlc3NUcmFja2luZyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24sXG4gICkge31cblxuICB0cmFja0xvY2F0aW9uKHNldHRpbmdzKTogT2JzZXJ2YWJsZTxUcmFja05hdmlnYXRpb25FbmQ+IHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIuZXZlbnRzLnBpcGUoXG4gICAgICBmaWx0ZXIoZSA9PiBlIGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCksXG4gICAgICBmaWx0ZXIoKCkgPT4gIXNldHRpbmdzLmRldmVsb3Blck1vZGUpLFxuICAgICAgbWFwKChlOiBOYXZpZ2F0aW9uRW5kKSA9PiB7XG4gICAgICAgIHJldHVybiB7IHVybDogZS51cmxBZnRlclJlZGlyZWN0cyB9O1xuICAgICAgfSksXG4gICAgICBkZWxheSgwKSxcbiAgICApO1xuICB9XG5cbiAgcHJlcGFyZUV4dGVybmFsVXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdGlvbi5wcmVwYXJlRXh0ZXJuYWxVcmwodXJsKTtcbiAgfVxufVxuIl19