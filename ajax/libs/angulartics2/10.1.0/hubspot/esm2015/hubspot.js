import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
export class Angulartics2Hubspot {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
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
    }
    pageTrack(path) {
        if (typeof _hsq !== 'undefined') {
            _hsq.push(['setPath', path]);
            _hsq.push(['trackPageView']);
        }
    }
    eventTrack(action, properties) {
        if (typeof _hsq !== 'undefined') {
            _hsq.push(['trackEvent', properties]);
        }
    }
    setUserProperties(properties) {
        if (typeof _hsq !== 'undefined') {
            _hsq.push(['identify', properties]);
        }
    }
}
Angulartics2Hubspot.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Hubspot_Factory() { return new Angulartics2Hubspot(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Hubspot, providedIn: "root" });
Angulartics2Hubspot.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2Hubspot.ctorParameters = () => [
    { type: Angulartics2 }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVic3BvdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcHJvdmlkZXJzL2h1YnNwb3QvaHVic3BvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQUs1QyxNQUFNLE9BQU8sbUJBQW1CO0lBRTlCLFlBQ1UsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFFbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUI7YUFDaEMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUzthQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVU7YUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsU0FBUyxDQUFDLElBQVk7UUFDcEIsSUFBSSxPQUFPLElBQUksS0FBSyxXQUFXLEVBQUU7WUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFjLEVBQUUsVUFBZTtRQUN4QyxJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsRUFBRTtZQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsVUFBZTtRQUMvQixJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsRUFBRTtZQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDOzs7O1lBcENGLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OztZQUp6QixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICdhbmd1bGFydGljczInO1xuXG5kZWNsYXJlIHZhciBfaHNxOiBhbnk7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MySHVic3BvdCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMlxuICApIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllc1xuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSk7XG4gIH1cblxuICBzdGFydFRyYWNraW5nKCk6IHZvaWQge1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnBhZ2VUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5wYWdlVHJhY2soeC5wYXRoKSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcbiAgfVxuXG4gIHBhZ2VUcmFjayhwYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIF9oc3EgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBfaHNxLnB1c2goWydzZXRQYXRoJywgcGF0aF0pO1xuICAgICAgX2hzcS5wdXNoKFsndHJhY2tQYWdlVmlldyddKTtcbiAgICB9XG4gIH1cblxuICBldmVudFRyYWNrKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIF9oc3EgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBfaHNxLnB1c2goWyd0cmFja0V2ZW50JywgcHJvcGVydGllc10pO1xuICAgIH1cbiAgfVxuXG4gIHNldFVzZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXM6IGFueSkge1xuICAgIGlmICh0eXBlb2YgX2hzcSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIF9oc3EucHVzaChbJ2lkZW50aWZ5JywgcHJvcGVydGllc10pO1xuICAgIH1cbiAgfVxufVxuIl19