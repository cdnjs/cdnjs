import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterlessTracking, TrackNavigationEnd } from './routerless';
import * as i0 from "@angular/core";
/**
 * Track Route changes for applications using Angular's
 * default router
 *
 * @link https://angular.io/api/router/Router
 */
export declare class AngularRouterTracking implements RouterlessTracking {
    private router;
    private location;
    constructor(router: Router, location: Location);
    trackLocation(settings: any): Observable<TrackNavigationEnd>;
    prepareExternalUrl(url: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AngularRouterTracking, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AngularRouterTracking>;
}
