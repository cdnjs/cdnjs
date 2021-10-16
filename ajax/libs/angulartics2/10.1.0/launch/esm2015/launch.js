import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
export class Angulartics2LaunchByAdobe {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.payload = {};
        if ('undefined' === typeof _satellite) {
            console.warn('Launch not found!');
        }
        this.angulartics2.setUsername
            .subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties
            .subscribe((x) => this.setUserProperties(x));
    }
    setUsername(userId) {
        if ('undefined' !== typeof userId && userId) {
            this.payload.userId = userId;
        }
    }
    setUserProperties(properties) {
        if ('undefined' !== typeof properties && properties) {
            this.payload.properties = properties;
        }
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
        this.payload = this.payload || {};
        this.payload.path = path;
        if ('undefined' !== typeof _satellite && _satellite) {
            _satellite.track('pageTrack', this.payload);
        }
    }
    /**
     * @param action associated with the event
     * @param properties associated with the event
     */
    eventTrack(action, properties) {
        properties = properties || {};
        // add properties to payload
        this.payload.action = action;
        this.payload.eventProperties = properties;
        if ('undefined' !== typeof _satellite && _satellite) {
            _satellite.track('eventTrack', this.payload);
        }
    }
}
Angulartics2LaunchByAdobe.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2LaunchByAdobe_Factory() { return new Angulartics2LaunchByAdobe(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2LaunchByAdobe, providedIn: "root" });
Angulartics2LaunchByAdobe.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2LaunchByAdobe.ctorParameters = () => [
    { type: Angulartics2 }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wcm92aWRlcnMvbGF1bmNoL2xhdW5jaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQUs1QyxNQUFNLE9BQU8seUJBQXlCO0lBRXBDLFlBQ1ksWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFGdEMsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUloQixJQUFJLFdBQVcsS0FBSyxPQUFPLFVBQVUsRUFBRTtZQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDbkM7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVc7YUFDMUIsU0FBUyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUI7YUFDaEMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsV0FBVyxDQUFDLE1BQXdCO1FBQ2xDLElBQUksV0FBVyxLQUFLLE9BQU8sTUFBTSxJQUFJLE1BQU0sRUFBRTtZQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsVUFBZTtRQUMvQixJQUFJLFdBQVcsS0FBSyxPQUFPLFVBQVUsSUFBSSxVQUFVLEVBQUU7WUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVM7YUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVO2FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFZO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRXpCLElBQUksV0FBVyxLQUFLLE9BQU8sVUFBVSxJQUFJLFVBQVUsRUFBRTtZQUNuRCxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsVUFBVSxDQUFDLE1BQWMsRUFBRSxVQUFlO1FBQ3hDLFVBQVUsR0FBRyxVQUFVLElBQUksRUFBRSxDQUFDO1FBRTlCLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUFDO1FBRTFDLElBQUksV0FBVyxLQUFLLE9BQU8sVUFBVSxJQUFJLFVBQVUsRUFBRTtZQUNuRCxVQUFVLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUM7SUFDSCxDQUFDOzs7O1lBM0RGLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OztZQUp6QixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICdhbmd1bGFydGljczInO1xuXG5kZWNsYXJlIGNvbnN0IF9zYXRlbGxpdGU6IGFueTtcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJMYXVuY2hCeUFkb2JlIHtcbiAgcGF5bG9hZDogYW55ID0ge307XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMixcbiAgKSB7XG4gICAgaWYgKCd1bmRlZmluZWQnID09PSB0eXBlb2YgX3NhdGVsbGl0ZSkge1xuICAgICAgY29uc29sZS53YXJuKCdMYXVuY2ggbm90IGZvdW5kIScpO1xuICAgIH1cbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VybmFtZVxuICAgICAgLnN1YnNjcmliZSgoeDogc3RyaW5nKSA9PiB0aGlzLnNldFVzZXJuYW1lKHgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllc1xuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSk7XG4gIH1cblxuICBzZXRVc2VybmFtZSh1c2VySWQ6IHN0cmluZyB8IGJvb2xlYW4pIHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiB1c2VySWQgJiYgdXNlcklkKSB7XG4gICAgICB0aGlzLnBheWxvYWQudXNlcklkID0gdXNlcklkO1xuICAgIH1cbiAgfVxuXG4gIHNldFVzZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXM6IGFueSkge1xuICAgIGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIHByb3BlcnRpZXMgJiYgcHJvcGVydGllcykge1xuICAgICAgdGhpcy5wYXlsb2FkLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0VHJhY2tpbmcoKSB7XG4gICAgdGhpcy5hbmd1bGFydGljczIucGFnZVRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLmV2ZW50VHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xuICB9XG5cbiAgcGFnZVRyYWNrKHBhdGg6IHN0cmluZykge1xuICAgIHRoaXMucGF5bG9hZCA9IHRoaXMucGF5bG9hZCB8fCB7fTtcbiAgICB0aGlzLnBheWxvYWQucGF0aCA9IHBhdGg7XG5cbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBfc2F0ZWxsaXRlICYmIF9zYXRlbGxpdGUpIHtcbiAgICAgIF9zYXRlbGxpdGUudHJhY2soJ3BhZ2VUcmFjaycsIHRoaXMucGF5bG9hZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBhY3Rpb24gYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudFxuICAgKiBAcGFyYW0gcHJvcGVydGllcyBhc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50XG4gICAqL1xuICBldmVudFRyYWNrKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCB7fTtcblxuICAgIC8vIGFkZCBwcm9wZXJ0aWVzIHRvIHBheWxvYWRcbiAgICB0aGlzLnBheWxvYWQuYWN0aW9uID0gYWN0aW9uO1xuICAgIHRoaXMucGF5bG9hZC5ldmVudFByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuXG4gICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgX3NhdGVsbGl0ZSAmJiBfc2F0ZWxsaXRlKSB7XG4gICAgICBfc2F0ZWxsaXRlLnRyYWNrKCdldmVudFRyYWNrJywgdGhpcy5wYXlsb2FkKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==