import { Inject, Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DefaultConfig } from './angulartics2-config';
import { ANGULARTICS2_TOKEN } from './angulartics2-token';
import { RouterlessTracking } from './routerless';
import * as i0 from "@angular/core";
import * as i1 from "./routerless";
import * as i2 from "./angulartics2-token";
export class Angulartics2 {
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
Angulartics2.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2_Factory() { return new Angulartics2(i0.ɵɵinject(i1.RouterlessTracking), i0.ɵɵinject(i2.ANGULARTICS2_TOKEN)); }, token: Angulartics2, providedIn: "root" });
Angulartics2.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2.ctorParameters = () => [
    { type: RouterlessTracking },
    { type: undefined, decorators: [{ type: Inject, args: [ANGULARTICS2_TOKEN,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcnRpY3MyLWNvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvcmUvYW5ndWxhcnRpY3MyLWNvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUE0QixhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBd0IsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFNUUsT0FBTyxFQUFxQixrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzdFLE9BQU8sRUFBRSxrQkFBa0IsRUFBc0IsTUFBTSxjQUFjLENBQUM7Ozs7QUFHdEUsTUFBTSxPQUFPLFlBQVk7SUFjdkIsWUFDVSxPQUEyQixFQUNQLEtBQXdCO1FBRDVDLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBWnJDLGNBQVMsR0FBRyxJQUFJLGFBQWEsQ0FBcUIsRUFBRSxDQUFDLENBQUM7UUFDdEQsZUFBVSxHQUFHLElBQUksYUFBYSxDQUFzQixFQUFFLENBQUMsQ0FBQztRQUN4RCxtQkFBYyxHQUFHLElBQUksYUFBYSxDQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLGFBQVEsR0FBRyxJQUFJLGFBQWEsQ0FBUyxFQUFFLENBQUMsQ0FBQztRQUN6QyxnQkFBVyxHQUFHLElBQUksYUFBYSxDQUF1QyxFQUFFLENBQUMsQ0FBQztRQUMxRSxzQkFBaUIsR0FBRyxJQUFJLGFBQWEsQ0FBTSxFQUFFLENBQUMsQ0FBQztRQUMvQywwQkFBcUIsR0FBRyxJQUFJLGFBQWEsQ0FBTSxFQUFFLENBQUMsQ0FBQztRQUNuRCx1QkFBa0IsR0FBRyxJQUFJLGFBQWEsQ0FBTSxFQUFFLENBQUMsQ0FBQztRQUNoRCwyQkFBc0IsR0FBRyxJQUFJLGFBQWEsQ0FBTSxF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QUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2lCQUM3RSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3pHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNkO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDOzs7O1lBbkZGLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OztZQUZ6QixrQkFBa0I7NENBbUJ0QixNQUFNLFNBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE1vbm9UeXBlT3BlcmF0b3JGdW5jdGlvbiwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBbmd1bGFydGljczJTZXR0aW5ncywgRGVmYXVsdENvbmZpZyB9IGZyb20gJy4vYW5ndWxhcnRpY3MyLWNvbmZpZyc7XG5pbXBvcnQgeyBFdmVudFRyYWNrLCBQYWdlVHJhY2ssIFVzZXJUaW1pbmdzIH0gZnJvbSAnLi9hbmd1bGFydGljczItaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBBbmd1bGFydGljczJUb2tlbiwgQU5HVUxBUlRJQ1MyX1RPS0VOIH0gZnJvbSAnLi9hbmd1bGFydGljczItdG9rZW4nO1xuaW1wb3J0IHsgUm91dGVybGVzc1RyYWNraW5nLCBUcmFja05hdmlnYXRpb25FbmQgfSBmcm9tICcuL3JvdXRlcmxlc3MnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMiB7XG4gIHNldHRpbmdzOiBBbmd1bGFydGljczJTZXR0aW5ncztcblxuICBwYWdlVHJhY2sgPSBuZXcgUmVwbGF5U3ViamVjdDxQYXJ0aWFsPFBhZ2VUcmFjaz4+KDEwKTtcbiAgZXZlbnRUcmFjayA9IG5ldyBSZXBsYXlTdWJqZWN0PFBhcnRpYWw8RXZlbnRUcmFjaz4+KDEwKTtcbiAgZXhjZXB0aW9uVHJhY2sgPSBuZXcgUmVwbGF5U3ViamVjdDxhbnk+KDEwKTtcbiAgc2V0QWxpYXMgPSBuZXcgUmVwbGF5U3ViamVjdDxzdHJpbmc+KDEwKTtcbiAgc2V0VXNlcm5hbWUgPSBuZXcgUmVwbGF5U3ViamVjdDx7IHVzZXJJZDogc3RyaW5nIHwgbnVtYmVyIH0gfCBzdHJpbmc+KDEwKTtcbiAgc2V0VXNlclByb3BlcnRpZXMgPSBuZXcgUmVwbGF5U3ViamVjdDxhbnk+KDEwKTtcbiAgc2V0VXNlclByb3BlcnRpZXNPbmNlID0gbmV3IFJlcGxheVN1YmplY3Q8YW55PigxMCk7XG4gIHNldFN1cGVyUHJvcGVydGllcyA9IG5ldyBSZXBsYXlTdWJqZWN0PGFueT4oMTApO1xuICBzZXRTdXBlclByb3BlcnRpZXNPbmNlID0gbmV3IFJlcGxheVN1YmplY3Q8YW55PigxMCk7XG4gIHVzZXJUaW1pbmdzID0gbmV3IFJlcGxheVN1YmplY3Q8VXNlclRpbWluZ3M+KDEwKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHRyYWNrZXI6IFJvdXRlcmxlc3NUcmFja2luZyxcbiAgICBASW5qZWN0KEFOR1VMQVJUSUNTMl9UT0tFTikgc2V0dXA6IEFuZ3VsYXJ0aWNzMlRva2VuLFxuICApIHtcbiAgICBjb25zdCBkZWZhdWx0Q29uZmlnID0gbmV3IERlZmF1bHRDb25maWcoKTtcbiAgICB0aGlzLnNldHRpbmdzID0geyAuLi5kZWZhdWx0Q29uZmlnLCAuLi5zZXR1cC5zZXR0aW5ncyB9O1xuICAgIHRoaXMuc2V0dGluZ3MucGFnZVRyYWNraW5nID0ge1xuICAgICAgLi4uZGVmYXVsdENvbmZpZy5wYWdlVHJhY2tpbmcsXG4gICAgICAuLi5zZXR1cC5zZXR0aW5ncy5wYWdlVHJhY2tpbmcsXG4gICAgfTtcbiAgICB0aGlzLnRyYWNrZXJcbiAgICAgIC50cmFja0xvY2F0aW9uKHRoaXMuc2V0dGluZ3MpXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogVHJhY2tOYXZpZ2F0aW9uRW5kKSA9PlxuICAgICAgICB0aGlzLnRyYWNrVXJsQ2hhbmdlKGV2ZW50LnVybCksXG4gICAgICApO1xuICB9XG5cbiAgLyoqIGZpbHRlcnMgYWxsIGV2ZW50cyB3aGVuIGRldmVsb3BlciBtb2RlIGlzIHRydWUgKi9cbiAgZmlsdGVyRGV2ZWxvcGVyTW9kZTxUPigpOiBNb25vVHlwZU9wZXJhdG9yRnVuY3Rpb248VD4ge1xuICAgIHJldHVybiBmaWx0ZXIoKHZhbHVlLCBpbmRleCkgPT4gIXRoaXMuc2V0dGluZ3MuZGV2ZWxvcGVyTW9kZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdHJhY2tVcmxDaGFuZ2UodXJsOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5wYWdlVHJhY2tpbmcuYXV0b1RyYWNrVmlydHVhbFBhZ2VzICYmICF0aGlzLm1hdGNoZXNFeGNsdWRlZFJvdXRlKHVybCkpIHtcbiAgICAgIGNvbnN0IGNsZWFyZWRVcmwgPSB0aGlzLmNsZWFyVXJsKHVybCk7XG4gICAgICBsZXQgcGF0aDogc3RyaW5nO1xuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MucGFnZVRyYWNraW5nLmJhc2VQYXRoLmxlbmd0aCkge1xuICAgICAgICBwYXRoID0gdGhpcy5zZXR0aW5ncy5wYWdlVHJhY2tpbmcuYmFzZVBhdGggKyBjbGVhcmVkVXJsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGF0aCA9IHRoaXMudHJhY2tlci5wcmVwYXJlRXh0ZXJuYWxVcmwoY2xlYXJlZFVybCk7XG4gICAgICB9XG4gICAgICB0aGlzLnBhZ2VUcmFjay5uZXh0KHsgcGF0aCB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXNlIHN0cmluZyBsaXRlcmFscyBvciByZWd1bGFyIGV4cHJlc3Npb25zIHRvIGV4Y2x1ZGUgcm91dGVzXG4gICAqIGZyb20gYXV0b21hdGljIHBhZ2V2aWV3IHRyYWNraW5nLlxuICAgKlxuICAgKiBAcGFyYW0gdXJsIGxvY2F0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgbWF0Y2hlc0V4Y2x1ZGVkUm91dGUodXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBmb3IgKGNvbnN0IGV4Y2x1ZGVkUm91dGUgb2YgdGhpcy5zZXR0aW5ncy5wYWdlVHJhY2tpbmcuZXhjbHVkZWRSb3V0ZXMpIHtcbiAgICAgIGNvbnN0IG1hdGNoZXNSZWdleCA9IGV4Y2x1ZGVkUm91dGUgaW5zdGFuY2VvZiBSZWdFeHAgJiYgZXhjbHVkZWRSb3V0ZS50ZXN0KHVybCk7XG4gICAgICBpZiAobWF0Y2hlc1JlZ2V4IHx8IHVybC5pbmRleE9mKGV4Y2x1ZGVkUm91dGUgYXMgc3RyaW5nKSAhPT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGlkJ3MgZnJvbSB0cmFja2VkIHJvdXRlLlxuICAgKiAgRVg6IGAvcHJvamVjdC8xMjk4MS9mZWF0dXJlYCBiZWNvbWVzIGAvcHJvamVjdC9mZWF0dXJlYFxuICAgKlxuICAgKiBAcGFyYW0gdXJsIGN1cnJlbnQgcGFnZSBwYXRoXG4gICAqL1xuICBwcm90ZWN0ZWQgY2xlYXJVcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnNldHRpbmdzLnBhZ2VUcmFja2luZy5jbGVhcklkcyB8fCB0aGlzLnNldHRpbmdzLnBhZ2VUcmFja2luZy5jbGVhclF1ZXJ5UGFyYW1zIHx8XG4gICAgICB0aGlzLnNldHRpbmdzLnBhZ2VUcmFja2luZy5jbGVhckhhc2gpIHtcbiAgICAgIHJldHVybiB1cmxcbiAgICAgICAgLnNwbGl0KCcvJylcbiAgICAgICAgLm1hcChwYXJ0ID0+IHRoaXMuc2V0dGluZ3MucGFnZVRyYWNraW5nLmNsZWFyUXVlcnlQYXJhbXMgPyBwYXJ0LnNwbGl0KCc/JylbMF0gOiBwYXJ0KVxuICAgICAgICAubWFwKHBhcnQgPT4gdGhpcy5zZXR0aW5ncy5wYWdlVHJhY2tpbmcuY2xlYXJIYXNoID8gcGFydC5zcGxpdCgnIycpWzBdIDogcGFydClcbiAgICAgICAgLmZpbHRlcihwYXJ0ID0+ICF0aGlzLnNldHRpbmdzLnBhZ2VUcmFja2luZy5jbGVhcklkcyB8fCAhcGFydC5tYXRjaCh0aGlzLnNldHRpbmdzLnBhZ2VUcmFja2luZy5pZHNSZWdFeHApKVxuICAgICAgICAuam9pbignLycpO1xuICAgIH1cbiAgICByZXR1cm4gdXJsO1xuICB9XG59XG4iXX0=