import { Injectable } from '@angular/core';
import { TransitionService } from '@uirouter/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@uirouter/core";
/**
 * Track Route changes for applications using UI-Router
 *
 * @link https://ui-router.github.io/ng2/docs/latest/
 *
 * referenced: https://github.com/ui-router/sample-app-angular/blob/9adb533b85c0f0fccef23968489cca0a5ec84654/src/app/util/ga.ts
 */
export class UIRouterTracking {
    constructor(transitionService) {
        this.transitionService = transitionService;
    }
    path(trans) {
        return trans.$to().url.format(trans.params());
    }
    trackLocation(settings) {
        const subject = new Subject();
        this.transitionService.onSuccess({}, trans => {
            return subject.next({ url: this.path(trans) });
        }, {
            priority: -10000,
        });
        return subject;
    }
    prepareExternalUrl(url) {
        return url;
    }
}
UIRouterTracking.ɵprov = i0.ɵɵdefineInjectable({ factory: function UIRouterTracking_Factory() { return new UIRouterTracking(i0.ɵɵinject(i1.TransitionService)); }, token: UIRouterTracking, providedIn: "root" });
UIRouterTracking.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
UIRouterTracking.ctorParameters = () => [
    { type: TransitionService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWlyb3V0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Vpcm91dGVybW9kdWxlL3Vpcm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0QsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBSTNDOzs7Ozs7R0FNRztBQUVILE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsWUFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFBRyxDQUFDO0lBRTVELElBQUksQ0FBQyxLQUFpQjtRQUNwQixPQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxhQUFhLENBQUMsUUFBUTtRQUNwQixNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBc0IsQ0FBQztRQUNsRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUM5QixFQUFFLEVBQ0YsS0FBSyxDQUFDLEVBQUU7WUFDTixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakQsQ0FBQyxFQUNEO1lBQ0UsUUFBUSxFQUFFLENBQUMsS0FBSztTQUNqQixDQUNGLENBQUM7UUFDRixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQsa0JBQWtCLENBQUMsR0FBVztRQUM1QixPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7Ozs7WUF4QkYsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7O1lBYmIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNpdGlvbiwgVHJhbnNpdGlvblNlcnZpY2UgfSBmcm9tICdAdWlyb3V0ZXIvY29yZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUm91dGVybGVzc1RyYWNraW5nLCBUcmFja05hdmlnYXRpb25FbmQgfSBmcm9tICdhbmd1bGFydGljczInO1xuXG4vKipcbiAqIFRyYWNrIFJvdXRlIGNoYW5nZXMgZm9yIGFwcGxpY2F0aW9ucyB1c2luZyBVSS1Sb3V0ZXJcbiAqXG4gKiBAbGluayBodHRwczovL3VpLXJvdXRlci5naXRodWIuaW8vbmcyL2RvY3MvbGF0ZXN0L1xuICpcbiAqIHJlZmVyZW5jZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS91aS1yb3V0ZXIvc2FtcGxlLWFwcC1hbmd1bGFyL2Jsb2IvOWFkYjUzM2I4NWMwZjBmY2NlZjIzOTY4NDg5Y2NhMGE1ZWM4NDY1NC9zcmMvYXBwL3V0aWwvZ2EudHNcbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBVSVJvdXRlclRyYWNraW5nIGltcGxlbWVudHMgUm91dGVybGVzc1RyYWNraW5nIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2l0aW9uU2VydmljZTogVHJhbnNpdGlvblNlcnZpY2UpIHt9XG5cbiAgcGF0aCh0cmFuczogVHJhbnNpdGlvbikge1xuICAgIHJldHVybiB0cmFucy4kdG8oKS51cmwuZm9ybWF0KHRyYW5zLnBhcmFtcygpKTtcbiAgfVxuXG4gIHRyYWNrTG9jYXRpb24oc2V0dGluZ3MpOiBPYnNlcnZhYmxlPFRyYWNrTmF2aWdhdGlvbkVuZD4ge1xuICAgIGNvbnN0IHN1YmplY3QgPSBuZXcgU3ViamVjdDxUcmFja05hdmlnYXRpb25FbmQ+KCk7XG4gICAgdGhpcy50cmFuc2l0aW9uU2VydmljZS5vblN1Y2Nlc3MoXG4gICAgICB7fSxcbiAgICAgIHRyYW5zID0+IHtcbiAgICAgICAgcmV0dXJuIHN1YmplY3QubmV4dCh7IHVybDogdGhpcy5wYXRoKHRyYW5zKSB9KTtcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHByaW9yaXR5OiAtMTAwMDAsXG4gICAgICB9LFxuICAgICk7XG4gICAgcmV0dXJuIHN1YmplY3Q7XG4gIH1cblxuICBwcmVwYXJlRXh0ZXJuYWxVcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbn1cbiJdfQ==