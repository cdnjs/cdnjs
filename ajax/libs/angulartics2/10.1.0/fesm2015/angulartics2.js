import { InjectionToken, ɵɵdefineInjectable, ɵɵinject, Injectable, Inject, Directive, ElementRef, Renderer2, Input, NgModule } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { filter, map, delay } from 'rxjs/operators';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

class DefaultConfig {
    constructor() {
        this.pageTracking = {
            autoTrackVirtualPages: true,
            basePath: '',
            excludedRoutes: [],
            clearIds: false,
            clearHash: false,
            clearQueryParams: false,
            idsRegExp: /^\d+$|^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
        };
        this.developerMode = false;
        this.ga = {};
        this.appInsights = {};
        this.gtm = {};
        this.gst = {};
    }
}

const ANGULARTICS2_TOKEN = new InjectionToken('ANGULARTICS2');

class RouterlessTracking {
    trackLocation(settings) {
        return new BehaviorSubject({ url: '/' });
    }
    prepareExternalUrl(url) {
        return url;
    }
}

class Angulartics2 {
    constructor(tracker, setup) {
        this.tracker = tracker;
        this.pageTrack = new ReplaySubject(10);
        this.eventTrack = new ReplaySubject(10);
        this.exceptionTrack = new ReplaySubject(10);
        this.setAlias = new ReplaySubject(10);
        this.setUsername = new ReplaySubject(10);
        this.setUserProperties = new ReplaySubject(10);
        this.setUserPropertiesOnce = new ReplaySubject(10);
        this.setSuperProperties = new ReplaySubject(10);
        this.setSuperPropertiesOnce = new ReplaySubject(10);
        this.userTimings = new ReplaySubject(10);
        const defaultConfig = new DefaultConfig();
        this.settings = Object.assign(Object.assign({}, defaultConfig), setup.settings);
        this.settings.pageTracking = Object.assign(Object.assign({}, defaultConfig.pageTracking), setup.settings.pageTracking);
        this.tracker
            .trackLocation(this.settings)
            .subscribe((event) => this.trackUrlChange(event.url));
    }
    /** filters all events when developer mode is true */
    filterDeveloperMode() {
        return filter((value, index) => !this.settings.developerMode);
    }
    trackUrlChange(url) {
        if (this.settings.pageTracking.autoTrackVirtualPages && !this.matchesExcludedRoute(url)) {
            const clearedUrl = this.clearUrl(url);
            let path;
            if (this.settings.pageTracking.basePath.length) {
                path = this.settings.pageTracking.basePath + clearedUrl;
            }
            else {
                path = this.tracker.prepareExternalUrl(clearedUrl);
            }
            this.pageTrack.next({ path });
        }
    }
    /**
     * Use string literals or regular expressions to exclude routes
     * from automatic pageview tracking.
     *
     * @param url location
     */
    matchesExcludedRoute(url) {
        for (const excludedRoute of this.settings.pageTracking.excludedRoutes) {
            const matchesRegex = excludedRoute instanceof RegExp && excludedRoute.test(url);
            if (matchesRegex || url.indexOf(excludedRoute) !== -1) {
                return true;
            }
        }
        return false;
    }
    /**
     * Removes id's from tracked route.
     *  EX: `/project/12981/feature` becomes `/project/feature`
     *
     * @param url current page path
     */
    clearUrl(url) {
        if (this.settings.pageTracking.clearIds || this.settings.pageTracking.clearQueryParams ||
            this.settings.pageTracking.clearHash) {
            return url
                .split('/')
                .map(part => this.settings.pageTracking.clearQueryParams ? part.split('?')[0] : part)
                .map(part => this.settings.pageTracking.clearHash ? part.split('#')[0] : part)
                .filter(part => !this.settings.pageTracking.clearIds || !part.match(this.settings.pageTracking.idsRegExp))
                .join('/');
        }
        return url;
    }
}
Angulartics2.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2_Factory() { return new Angulartics2(ɵɵinject(RouterlessTracking), ɵɵinject(ANGULARTICS2_TOKEN)); }, token: Angulartics2, providedIn: "root" });
Angulartics2.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2.ctorParameters = () => [
    { type: RouterlessTracking },
    { type: undefined, decorators: [{ type: Inject, args: [ANGULARTICS2_TOKEN,] }] }
];

/**
 * Track Route changes for applications using Angular's
 * default router
 *
 * @link https://angular.io/api/router/Router
 */
class AngularRouterTracking {
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
AngularRouterTracking.ɵprov = ɵɵdefineInjectable({ factory: function AngularRouterTracking_Factory() { return new AngularRouterTracking(ɵɵinject(Router), ɵɵinject(Location)); }, token: AngularRouterTracking, providedIn: "root" });
AngularRouterTracking.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
AngularRouterTracking.ctorParameters = () => [
    { type: Router },
    { type: Location }
];

class Angulartics2On {
    constructor(elRef, angulartics2, renderer) {
        this.elRef = elRef;
        this.angulartics2 = angulartics2;
        this.renderer = renderer;
        this.angularticsProperties = {};
    }
    ngAfterContentInit() {
        this.renderer.listen(this.elRef.nativeElement, this.angulartics2On || 'click', (event) => this.eventTrack(event));
    }
    eventTrack(event) {
        const action = this.angularticsAction; // || this.inferEventName();
        const properties = Object.assign(Object.assign({}, this.angularticsProperties), { eventType: event.type });
        if (this.angularticsCategory) {
            properties.category = this.angularticsCategory;
        }
        if (this.angularticsLabel) {
            properties.label = this.angularticsLabel;
        }
        if (this.angularticsValue) {
            properties.value = this.angularticsValue;
        }
        this.angulartics2.eventTrack.next({
            action,
            properties,
        });
    }
}
Angulartics2On.decorators = [
    { type: Directive, args: [{ selector: '[angulartics2On]' },] }
];
Angulartics2On.ctorParameters = () => [
    { type: ElementRef },
    { type: Angulartics2 },
    { type: Renderer2 }
];
Angulartics2On.propDecorators = {
    angulartics2On: [{ type: Input, args: ['angulartics2On',] }],
    angularticsAction: [{ type: Input }],
    angularticsCategory: [{ type: Input }],
    angularticsLabel: [{ type: Input }],
    angularticsValue: [{ type: Input }],
    angularticsProperties: [{ type: Input }]
};
class Angulartics2OnModule {
}
Angulartics2OnModule.decorators = [
    { type: NgModule, args: [{
                declarations: [Angulartics2On],
                exports: [Angulartics2On],
            },] }
];

class Angulartics2Module {
    static forRoot(settings = {}) {
        return {
            ngModule: Angulartics2Module,
            providers: [
                { provide: ANGULARTICS2_TOKEN, useValue: { settings } },
                { provide: RouterlessTracking, useClass: AngularRouterTracking },
                Angulartics2,
            ],
        };
    }
}
Angulartics2Module.decorators = [
    { type: NgModule, args: [{
                imports: [Angulartics2OnModule],
                exports: [Angulartics2On],
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { ANGULARTICS2_TOKEN, AngularRouterTracking, Angulartics2, Angulartics2Module, Angulartics2On, Angulartics2OnModule, DefaultConfig, RouterlessTracking };
//# sourceMappingURL=angulartics2.js.map
