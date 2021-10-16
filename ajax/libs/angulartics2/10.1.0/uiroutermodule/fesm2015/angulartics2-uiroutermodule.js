import { ɵɵdefineInjectable, ɵɵinject, Injectable, NgModule } from '@angular/core';
import { ANGULARTICS2_TOKEN, RouterlessTracking, Angulartics2, Angulartics2OnModule } from 'angulartics2';
import { TransitionService } from '@uirouter/core';
import { Subject } from 'rxjs';

/**
 * Track Route changes for applications using UI-Router
 *
 * @link https://ui-router.github.io/ng2/docs/latest/
 *
 * referenced: https://github.com/ui-router/sample-app-angular/blob/9adb533b85c0f0fccef23968489cca0a5ec84654/src/app/util/ga.ts
 */
class UIRouterTracking {
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
UIRouterTracking.ɵprov = ɵɵdefineInjectable({ factory: function UIRouterTracking_Factory() { return new UIRouterTracking(ɵɵinject(TransitionService)); }, token: UIRouterTracking, providedIn: "root" });
UIRouterTracking.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
UIRouterTracking.ctorParameters = () => [
    { type: TransitionService }
];

class Angulartics2UirouterModule {
    static forRoot(settings = {}) {
        return {
            ngModule: Angulartics2UirouterModule,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { settings } },
                { provide: RouterlessTracking, useClass: UIRouterTracking },
                Angulartics2,
            ],
        };
    }
}
Angulartics2UirouterModule.decorators = [
    { type: NgModule, args: [{
                imports: [Angulartics2OnModule],
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2UirouterModule, UIRouterTracking };
//# sourceMappingURL=angulartics2-uiroutermodule.js.map
