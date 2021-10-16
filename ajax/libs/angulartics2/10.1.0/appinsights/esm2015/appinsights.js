import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, NavigationError, NavigationStart, Router, } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/router";
export class AppInsightsDefaults {
    constructor() {
        this.userId = null;
    }
}
export class Angulartics2AppInsights {
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
Angulartics2AppInsights.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2AppInsights_Factory() { return new Angulartics2AppInsights(i0.ɵɵinject(i1.Angulartics2), i0.ɵɵinject(i2.Title), i0.ɵɵinject(i3.Router)); }, token: Angulartics2AppInsights, providedIn: "root" });
Angulartics2AppInsights.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2AppInsights.ctorParameters = () => [
    { type: Angulartics2 },
    { type: Title },
    { type: Router }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwaW5zaWdodHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Byb3ZpZGVycy9hcHBpbnNpZ2h0cy9hcHBpbnNpZ2h0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNsRCxPQUFPLEVBQ0wsYUFBYSxFQUNiLGVBQWUsRUFDZixlQUFlLEVBQ2YsTUFBTSxHQUNQLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhDLE9BQU8sRUFBRSxZQUFZLEVBQXVCLE1BQU0sY0FBYyxDQUFDOzs7OztBQUlqRSxNQUFNLE9BQU8sbUJBQW1CO0lBQWhDO1FBQ0UsV0FBTSxHQUFHLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQUE7QUFHRCxNQUFNLE9BQU8sdUJBQXVCO0lBUWxDLFlBQ1UsWUFBMEIsRUFDMUIsS0FBWSxFQUNaLE1BQWM7UUFGZCxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQ1osV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVZ4QixrQkFBYSxHQUFXLElBQUksQ0FBQztRQUM3QixhQUFRLEdBQVcsSUFBSSxDQUFDO1FBRXhCLFlBQU8sR0FBK0IsSUFBSSxDQUFDO1FBQzNDLGVBQVUsR0FBK0IsSUFBSSxDQUFDO1FBQzlDLGlCQUFZLEdBQStCLElBQUksQ0FBQztRQU85QyxJQUFJLE9BQU8sV0FBVyxLQUFLLFdBQVcsRUFBRTtZQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDdkM7UUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFDM0MsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxZQUFZLENBQUMs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OUQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxjQUFjLENBQUMsVUFBZTtRQUM1QixNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsS0FBSyxJQUFJLFVBQVUsQ0FBQyxXQUFXLElBQUksVUFBVSxDQUFDO1FBRTdFLFdBQVcsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVyxDQUFDLE1BQWM7UUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdkQsV0FBVyxDQUFDLDJCQUEyQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxVQUEwRDtRQUMxRSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO1NBQ25FO1FBQ0QsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQ3hCLFdBQVcsQ0FBQywyQkFBMkIsQ0FDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFDN0MsVUFBVSxDQUFDLFNBQVMsQ0FDckIsQ0FBQztTQUNIO2FBQU07WUFDTCxXQUFXLENBQUMsMkJBQTJCLENBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQzlDLENBQUM7U0FDSDtJQUNILENBQUM7Ozs7WUE1SEYsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7O1lBUnpCLFlBQVk7WUFUWixLQUFLO1lBS1osTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpdGxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge1xuICBOYXZpZ2F0aW9uRW5kLFxuICBOYXZpZ2F0aW9uRXJyb3IsXG4gIE5hdmlnYXRpb25TdGFydCxcbiAgUm91dGVyLFxufSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBbmd1bGFydGljczIsIEFwcEluc2lnaHRzU2V0dGluZ3MgfSBmcm9tICdhbmd1bGFydGljczInO1xuXG5kZWNsYXJlIGNvbnN0IGFwcEluc2lnaHRzOiBNaWNyb3NvZnQuQXBwbGljYXRpb25JbnNpZ2h0cy5JQXBwSW5zaWdodHM7XG5cbmV4cG9ydCBjbGFzcyBBcHBJbnNpZ2h0c0RlZmF1bHRzIGltcGxlbWVudHMgQXBwSW5zaWdodHNTZXR0aW5ncyB7XG4gIHVzZXJJZCA9IG51bGw7XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyQXBwSW5zaWdodHMge1xuICBsb2FkU3RhcnRUaW1lOiBudW1iZXIgPSBudWxsO1xuICBsb2FkVGltZTogbnVtYmVyID0gbnVsbDtcblxuICBtZXRyaWNzOiB7IFtuYW1lOiBzdHJpbmddOiBudW1iZXIgfSA9IG51bGw7XG4gIGRpbWVuc2lvbnM6IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9ID0gbnVsbDtcbiAgbWVhc3VyZW1lbnRzOiB7IFtuYW1lOiBzdHJpbmddOiBudW1iZXIgfSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMixcbiAgICBwcml2YXRlIHRpdGxlOiBUaXRsZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICApIHtcbiAgICBpZiAodHlwZW9mIGFwcEluc2lnaHRzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS53YXJuKCdhcHBJbnNpZ2h0cyBub3QgZm91bmQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWZhdWx0cyA9IG5ldyBBcHBJbnNpZ2h0c0RlZmF1bHRzKCk7XG4gICAgLy8gU2V0IHRoZSBkZWZhdWx0IHNldHRpbmdzIGZvciB0aGlzIG1vZHVsZVxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmFwcEluc2lnaHRzID0geyAuLi5kZWZhdWx0cywgLi4udGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuYXBwSW5zaWdodHMgfTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VybmFtZVxuICAgICAgLnN1YnNjcmliZSgoeDogc3RyaW5nKSA9PiB0aGlzLnNldFVzZXJuYW1lKHgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllc1xuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSk7XG4gIH1cblxuICBzdGFydFRyYWNraW5nKCk6IHZvaWQge1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnBhZ2VUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5wYWdlVHJhY2soeC5wYXRoKSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5leGNlcHRpb25UcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5leGNlcHRpb25UcmFjayh4KSk7XG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAucGlwZShcbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpLFxuICAgICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQpLFxuICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4gdGhpcy5zdGFydFRpbWVyKCkpO1xuXG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAucGlwZShmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRXJyb3IgfHwgZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSlcbiAgICAgIC5zdWJzY3JpYmUoZXJyb3IgPT4gdGhpcy5zdG9wVGltZXIoKSk7XG4gIH1cblxuICBzdGFydFRpbWVyKCkge1xuICAgIHRoaXMubG9hZFN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgdGhpcy5sb2FkVGltZSA9IG51bGw7XG4gIH1cblxuICBzdG9wVGltZXIoKSB7XG4gICAgdGhpcy5sb2FkVGltZSA9IERhdGUubm93KCkgLSB0aGlzLmxvYWRTdGFydFRpbWU7XG4gICAgdGhpcy5sb2FkU3RhcnRUaW1lID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYWdlIFRyYWNrIGluIEJhaWR1IEFuYWx5dGljc1xuICAgKlxuICAgKiBAcGFyYW0gcGF0aCAtIExvY2F0aW9uICdwYXRoJ1xuICAgKlxuICAgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L0FwcGxpY2F0aW9uSW5zaWdodHMtSlMvYmxvYi9tYXN0ZXIvQVBJLXJlZmVyZW5jZS5tZCN0cmFja3BhZ2V2aWV3XG4gICAqL1xuICBwYWdlVHJhY2socGF0aDogc3RyaW5nKSB7XG4gICAgYXBwSW5zaWdodHMudHJhY2tQYWdlVmlldyhcbiAgICAgIHRoaXMudGl0bGUuZ2V0VGl0bGUoKSxcbiAgICAgIHBhdGgsXG4gICAgICB0aGlzLmRpbWVuc2lvbnMsXG4gICAgICB0aGlzLm1ldHJpY3MsXG4gICAgICB0aGlzLmxvYWRUaW1lLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTG9nIGEgdXNlciBhY3Rpb24gb3Igb3RoZXIgb2NjdXJyZW5jZS5cbiAgICpcbiAgICogQHBhcmFtIG5hbWUgTmFtZSB0byBpZGVudGlmeSB0aGlzIGV2ZW50IGluIHRoZSBwb3J0YWwuXG4gICAqIEBwYXJhbSBwcm9wZXJ0aWVzIEFkZGl0aW9uYWwgZGF0YSB1c2VkIHRvIGZpbHRlciBldmVudHMgYW5kIG1ldHJpY3MgaW4gdGhlIHBvcnRhbC4gRGVmYXVsdHMgdG8gZW1wdHkuXG4gICAqXG4gICAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvQXBwbGljYXRpb25JbnNpZ2h0cy1KUy9ibG9iL21hc3Rlci9BUEktcmVmZXJlbmNlLm1kI3RyYWNrZXZlbnRcbiAgICovXG4gIGV2ZW50VHJhY2sobmFtZTogc3RyaW5nLCBwcm9wZXJ0aWVzOiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfSkge1xuICAgIGFwcEluc2lnaHRzLnRyYWNrRXZlbnQobmFtZSwgcHJvcGVydGllcywgdGhpcy5tZWFzdXJlbWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4Y2VwdGlvbiBUcmFjayBFdmVudCBpbiBHQVxuICAgKlxuICAgKiBAcGFyYW0gcHJvcGVydGllcyAtIENvbXByaXNlZCBvZiB0aGUgbWFuZGF0b3J5IGZpZWxkcyAnYXBwSWQnIChzdHJpbmcpLCAnYXBwTmFtZScgKHN0cmluZykgYW5kICdhcHBWZXJzaW9uJyAoc3RyaW5nKSBhbmRcbiAgICogb3B0aW9uYWwgZmllbGRzICdmYXRhbCcgKGJvb2xlYW4pIGFuZCAnZGVzY3JpcHRpb24nIChzdHJpbmcpLCBlcnJvclxuICAgKlxuICAgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L0FwcGxpY2F0aW9uSW5zaWdodHMtSlMvYmxvYi9tYXN0ZXIvQVBJLXJlZmVyZW5jZS5tZCN0cmFja2V4Y2VwdGlvblxuICAgKi9cbiAgZXhjZXB0aW9uVHJhY2socHJvcGVydGllczogYW55KSB7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBwcm9wZXJ0aWVzLmV2ZW50IHx8IHByb3BlcnRpZXMuZGVzY3JpcHRpb24gfHwgcHJvcGVydGllcztcblxuICAgIGFwcEluc2lnaHRzLnRyYWNrRXhjZXB0aW9uKGRlc2NyaXB0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L0FwcGxpY2F0aW9uSW5zaWdodHMtSlMvYmxvYi9tYXN0ZXIvQVBJLXJlZmVyZW5jZS5tZCNzZXRhdXRoZW50aWNhdGVkdXNlcmNvbnRleHRcbiAgICovXG4gIHNldFVzZXJuYW1lKHVzZXJJZDogc3RyaW5nKSB7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuYXBwSW5zaWdodHMudXNlcklkID0gdXNlcklkO1xuICAgIGFwcEluc2lnaHRzLnNldEF1dGhlbnRpY2F0ZWRVc2VyQ29udGV4dCh1c2VySWQpO1xuICB9XG5cbiAgc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllczogUGFydGlhbDx7IHVzZXJJZDogc3RyaW5nLCBhY2NvdW50SWQ6IHN0cmluZyB9Pikge1xuICAgIGlmIChwcm9wZXJ0aWVzLnVzZXJJZCkge1xuICAgICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuYXBwSW5zaWdodHMudXNlcklkID0gcHJvcGVydGllcy51c2VySWQ7XG4gICAgfVxuICAgIGlmIChwcm9wZXJ0aWVzLmFjY291bnRJZCkge1xuICAgICAgYXBwSW5zaWdodHMuc2V0QXV0aGVudGljYXRlZFVzZXJDb250ZXh0KFxuICAgICAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5hcHBJbnNpZ2h0cy51c2VySWQsXG4gICAgICAgIHByb3BlcnRpZXMuYWNjb3VudElkLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBwSW5zaWdodHMuc2V0QXV0aGVudGljYXRlZFVzZXJDb250ZXh0KFxuICAgICAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5hcHBJbnNpZ2h0cy51c2VySWQsXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl19