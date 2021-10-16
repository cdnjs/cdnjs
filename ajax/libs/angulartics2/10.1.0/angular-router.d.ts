import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterlessTracking, TrackNavigationEnd } from './routerless';
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
}
