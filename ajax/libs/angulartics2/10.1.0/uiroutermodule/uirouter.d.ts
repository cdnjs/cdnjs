import { Transition, TransitionService } from '@uirouter/core';
import { Observable } from 'rxjs';
import { RouterlessTracking, TrackNavigationEnd } from 'angulartics2';
/**
 * Track Route changes for applications using UI-Router
 *
 * @link https://ui-router.github.io/ng2/docs/latest/
 *
 * referenced: https://github.com/ui-router/sample-app-angular/blob/9adb533b85c0f0fccef23968489cca0a5ec84654/src/app/util/ga.ts
 */
export declare class UIRouterTracking implements RouterlessTracking {
    private transitionService;
    constructor(transitionService: TransitionService);
    path(trans: Transition): string;
    trackLocation(settings: any): Observable<TrackNavigationEnd>;
    prepareExternalUrl(url: string): string;
}
