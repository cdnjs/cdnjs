import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationStart, NavigationError, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Angulartics2 } from 'angulartics2';

class AppInsightsDefaults {
    constructor() {
        this.userId = null;
    }
}
class Angulartics2AppInsights {
    constructor(angulartics2, title, router) {
        this.angulartics2 = angulartics2;
        this.title = title;
        this.router = router;
        this.loadStartTime = null;
        this.loadTime = null;
        this.metrics = null;
        this.dimensions = null;
        this.measurements = null;
        if (typeof appInsights === 'undefined') {
            console.warn('appInsights not found');
        }
        const defaults = new AppInsightsDefaults();
        // Set the default settings for this module
        this.angulartics2.settings.appInsights = Object.assign(Object.assign({}, defaults), this.angulartics2.settings.appInsights);
        this.angulartics2.setUsername
            .subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties
            .subscribe((x) => this.setUserProperties(x));
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.eventTrack(x.action, x.properties));
        this.angulartics2.exceptionTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.exceptionTrack(x));
        this.router.events
            .pipe(this.angulartics2.filterDeveloperMode(), filter(event => event instanceof NavigationStart))
            .subscribe(event => this.startTimer());
        this.router.events
            .pipe(filter(event => event instanceof NavigationError || event instanceof NavigationEnd))
            .subscribe(error => this.stopTimer());
    }
    startTimer() {
        this.loadStartTime = Date.now();
        this.loadTime = null;
    }
    stopTimer() {
        this.loadTime = Date.now() - this.loadStartTime;
        this.loadStartTime = null;
    }
    /**
     * Page Track in Baidu Analytics
     *
     * @param path - Location 'path'
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackpageview
     */
    pageTrack(path) {
        appInsights.trackPageView(this.title.getTitle(), path, this.dimensions, this.metrics, this.loadTime);
    }
    /**
     * Log a user action or other occurrence.
     *
     * @param name Name to identify this event in the portal.
     * @param properties Additional data used to filter events and metrics in the portal. Defaults to empty.
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackevent
     */
    eventTrack(name, properties) {
        appInsights.trackEvent(name, properties, this.measurements);
    }
    /**
     * Exception Track Event in GA
     *
     * @param properties - Comprised of the mandatory fields 'appId' (string), 'appName' (string) and 'appVersion' (string) and
     * optional fields 'fatal' (boolean) and 'description' (string), error
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackexception
     */
    exceptionTrack(properties) {
        const description = properties.event || properties.description || properties;
        appInsights.trackException(description);
    }
    /**
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#setauthenticatedusercontext
     */
    setUsername(userId) {
        this.angulartics2.settings.appInsights.userId = userId;
        appInsights.setAuthenticatedUserContext(userId);
    }
    setUserProperties(properties) {
        if (properties.userId) {
            this.angulartics2.settings.appInsights.userId = properties.userId;
        }
        if (properties.accountId) {
            appInsights.setAuthenticatedUserContext(this.angulartics2.settings.appInsights.userId, properties.accountId);
        }
        else {
            appInsights.setAuthenticatedUserContext(this.angulartics2.settings.appInsights.userId);
        }
    }
}
Angulartics2AppInsights.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2AppInsights_Factory() { return new Angulartics2AppInsights(ɵɵinject(Angulartics2), ɵɵinject(Title), ɵɵinject(Router)); }, token: Angulartics2AppInsights, providedIn: "root" });
Angulartics2AppInsights.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2AppInsights.ctorParameters = () => [
    { type: Angulartics2 },
    { type: Title },
    { type: Router }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2AppInsights, AppInsightsDefaults };
//# sourceMappingURL=angulartics2-appinsights.js.map
