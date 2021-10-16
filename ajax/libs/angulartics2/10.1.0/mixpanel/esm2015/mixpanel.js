import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
export class Angulartics2Mixpanel {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.angulartics2.setUsername
            .subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties
            .subscribe((x) => this.setUserProperties(x));
        this.angulartics2.setUserPropertiesOnce
            .subscribe((x) => this.setUserPropertiesOnce(x));
        this.angulartics2.setSuperProperties
            .subscribe((x) => this.setSuperProperties(x));
        this.angulartics2.setSuperPropertiesOnce
            .subscribe((x) => this.setSuperPropertiesOnce(x));
        this.angulartics2.setAlias
            .subscribe((x) => this.setAlias(x));
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
        try {
            mixpanel.track('Page Viewed', { page: path });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    eventTrack(action, properties) {
        try {
            mixpanel.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUsername(userId) {
        try {
            mixpanel.identify(userId);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUserProperties(properties) {
        try {
            mixpanel.people.set(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUserPropertiesOnce(properties) {
        try {
            mixpanel.people.set_once(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setSuperProperties(properties) {
        try {
            mixpanel.register(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setSuperPropertiesOnce(properties) {
        try {
            mixpanel.register_once(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setAlias(alias) {
        try {
            mixpanel.alias(alias);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
}
Angulartics2Mixpanel.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Mixpanel_Factory() { return new Angulartics2Mixpanel(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Mixpanel, providedIn: "root" });
Angulartics2Mixpanel.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2Mixpanel.ctorParameters = () => [
    { type: Angulartics2 }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4cGFuZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Byb3ZpZGVycy9taXhwYW5lbC9taXhwYW5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQUs1QyxNQUFNLE9BQU8sb0JBQW9CO0lBRS9CLFlBQ1UsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFFbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXO2FBQzFCLFNBQVMsQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCO2FBQ2hDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUI7YUFDcEMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQjthQUNqQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCO2FBQ3JDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRO2FBQ3ZC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O2dCQUNsQyxNQUFNLENBQUMsQ0FBQzthQUNUO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQVU7UUFDakIsSUFBSTtZQUNGLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxjQUFjLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLENBQUM7YUFDVDtTQUNGO0lBQ0gsQ0FBQzs7OztZQTNHRixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7WUFKekIsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnYW5ndWxhcnRpY3MyJztcblxuZGVjbGFyZSB2YXIgbWl4cGFuZWw6IGFueTtcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJNaXhwYW5lbCB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMlxuICApIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VybmFtZVxuICAgICAgLnN1YnNjcmliZSgoeDogc3RyaW5nKSA9PiB0aGlzLnNldFVzZXJuYW1lKHgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllc1xuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlclByb3BlcnRpZXNPbmNlXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLnNldFVzZXJQcm9wZXJ0aWVzT25jZSh4KSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0U3VwZXJQcm9wZXJ0aWVzXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLnNldFN1cGVyUHJvcGVydGllcyh4KSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0U3VwZXJQcm9wZXJ0aWVzT25jZVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5zZXRTdXBlclByb3BlcnRpZXNPbmNlKHgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRBbGlhc1xuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5zZXRBbGlhcyh4KSk7XG4gIH1cblxuICBzdGFydFRyYWNraW5nKCk6IHZvaWQge1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnBhZ2VUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5wYWdlVHJhY2soeC5wYXRoKSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFja1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcbiAgfVxuXG4gIHBhZ2VUcmFjayhwYXRoOiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgbWl4cGFuZWwudHJhY2soJ1BhZ2UgVmlld2VkJywgeyBwYWdlOiBwYXRoIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBldmVudFRyYWNrKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgbWl4cGFuZWwudHJhY2soYWN0aW9uLCBwcm9wZXJ0aWVzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0VXNlcm5hbWUodXNlcklkOiBzdHJpbmcpIHtcbiAgICB0cnkge1xuICAgICAgbWl4cGFuZWwuaWRlbnRpZnkodXNlcklkKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllczogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgIG1peHBhbmVsLnBlb3BsZS5zZXQocHJvcGVydGllcyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldFVzZXJQcm9wZXJ0aWVzT25jZShwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgbWl4cGFuZWwucGVvcGxlLnNldF9vbmNlKHByb3BlcnRpZXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRTdXBlclByb3BlcnRpZXMocHJvcGVydGllczogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgIG1peHBhbmVsLnJlZ2lzdGVyKHByb3BlcnRpZXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRTdXBlclByb3BlcnRpZXNPbmNlKHByb3BlcnRpZXM6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICBtaXhwYW5lbC5yZWdpc3Rlcl9vbmNlKHByb3BlcnRpZXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRBbGlhcyhhbGlhczogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgIG1peHBhbmVsLmFsaWFzKGFsaWFzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=