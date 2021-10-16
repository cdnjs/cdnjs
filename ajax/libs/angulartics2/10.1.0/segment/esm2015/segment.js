import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
export class Angulartics2Segment {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.angulartics2.setUserProperties
            .subscribe((x) => this.setUserProperties(x));
        this.angulartics2.setUserPropertiesOnce
            .subscribe((x) => this.setUserProperties(x));
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
    /**
     * https://segment.com/docs/libraries/analytics.js/#page
     *
     * analytics.page([category], [name], [properties], [options], [callback]);
     */
    pageTrack(path) {
        // TODO : Support optional parameters where the parameter order and type changes their meaning
        try {
            analytics.page(path);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    /**
     * https://segment.com/docs/libraries/analytics.js/#track
     *
     * analytics.track(event, [properties], [options], [callback]);
     */
    eventTrack(action, properties) {
        try {
            analytics.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    /**
     * https://segment.com/docs/libraries/analytics.js/#identify
     *
     * analytics.identify([userId], [traits], [options], [callback]);
     */
    setUserProperties(properties) {
        try {
            if (properties.userId) {
                analytics.identify(properties.userId, properties);
            }
            else {
                analytics.identify(properties);
            }
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    /**
     * https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#reset--logout
     *
     * analytics.reset();
     */
    unsetUserProperties() {
        analytics.reset();
    }
    /**
     * https://segment.com/docs/libraries/analytics.js/#alias
     *
     * analytics.alias(userId, previousId, options, callback);
     */
    setAlias(alias) {
        try {
            analytics.alias(alias);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
}
Angulartics2Segment.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Segment_Factory() { return new Angulartics2Segment(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Segment, providedIn: "root" });
Angulartics2Segment.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2Segment.ctorParameters = () => [
    { type: Angulartics2 }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VnbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcHJvdmlkZXJzL3NlZ21lbnQvc2VnbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQUs1QyxNQUFNLE9BQU8sbUJBQW1CO0lBRTlCLFlBQ1UsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFFbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUI7YUFDaEMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQjthQUNwQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUTthQUN2QixTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUzthQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVU7YUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFNBQVMsQ0FBQyxJQUFZO1FBQ3BCLDhGQUE4RjtRQUM5RixJQUFJO1lBQ0YsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLGNBQWMsQ0FBQyxFQUFFO2dCQUNsQyxNQUFNLENBQUMsQ0FBQzthQUNUO1NBQ0Y7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFVBQVUsQ0FBQyxNQUFjLEVBQUUsVUFBZTtRQUN4QyxJQUFJO1lBQ0YsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDckM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxjQUFjLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLENBQUM7YUFDVDtTQUNGO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxpQkFBaUIsQ0FBQyxVQUFlO1FBQy9CLElBQUk7WUFDRixJQUFJLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JCLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQzthQUNuRDtpQkFBTTtnQkFDTCxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxjQUFjLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLENBQUM7YUFDVDtTQUNGO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxtQkFBbUI7UUFDakIsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsUUFBUSxDQUFDLEtBQVU7UUFDakIsSUFBSTtZQUNGLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxjQUFjLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLENBQUM7YUFDVDtTQUNGO0lBQ0gsQ0FBQzs7OztZQS9GRixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7WUFKekIsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnYW5ndWxhcnRpY3MyJztcblxuZGVjbGFyZSB2YXIgYW5hbHl0aWNzOiBTZWdtZW50QW5hbHl0aWNzLkFuYWx5dGljc0pTO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMlNlZ21lbnQge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczJcbiAgKSB7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlclByb3BlcnRpZXNcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMuc2V0VXNlclByb3BlcnRpZXMoeCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJQcm9wZXJ0aWVzT25jZVxuICAgICAgLnN1YnNjcmliZSgoeCkgPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0QWxpYXNcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMuc2V0QWxpYXMoeCkpO1xuICB9XG5cbiAgc3RhcnRUcmFja2luZygpOiB2b2lkIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5wYWdlVHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMucGFnZVRyYWNrKHgucGF0aCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLmV2ZW50VHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMuZXZlbnRUcmFjayh4LmFjdGlvbiwgeC5wcm9wZXJ0aWVzKSk7XG4gIH1cblxuICAvKipcbiAgICogaHR0cHM6Ly9zZWdtZW50LmNvbS9kb2NzL2xpYnJhcmllcy9hbmFseXRpY3MuanMvI3BhZ2VcbiAgICpcbiAgICogYW5hbHl0aWNzLnBhZ2UoW2NhdGVnb3J5XSwgW25hbWVdLCBbcHJvcGVydGllc10sIFtvcHRpb25zXSwgW2NhbGxiYWNrXSk7XG4gICAqL1xuICBwYWdlVHJhY2socGF0aDogc3RyaW5nKSB7XG4gICAgLy8gVE9ETyA6IFN1cHBvcnQgb3B0aW9uYWwgcGFyYW1ldGVycyB3aGVyZSB0aGUgcGFyYW1ldGVyIG9yZGVyIGFuZCB0eXBlIGNoYW5nZXMgdGhlaXIgbWVhbmluZ1xuICAgIHRyeSB7XG4gICAgICBhbmFseXRpY3MucGFnZShwYXRoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGh0dHBzOi8vc2VnbWVudC5jb20vZG9jcy9saWJyYXJpZXMvYW5hbHl0aWNzLmpzLyN0cmFja1xuICAgKlxuICAgKiBhbmFseXRpY3MudHJhY2soZXZlbnQsIFtwcm9wZXJ0aWVzXSwgW29wdGlvbnNdLCBbY2FsbGJhY2tdKTtcbiAgICovXG4gIGV2ZW50VHJhY2soYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICBhbmFseXRpY3MudHJhY2soYWN0aW9uLCBwcm9wZXJ0aWVzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGh0dHBzOi8vc2VnbWVudC5jb20vZG9jcy9saWJyYXJpZXMvYW5hbHl0aWNzLmpzLyNpZGVudGlmeVxuICAgKlxuICAgKiBhbmFseXRpY3MuaWRlbnRpZnkoW3VzZXJJZF0sIFt0cmFpdHNdLCBbb3B0aW9uc10sIFtjYWxsYmFja10pO1xuICAgKi9cbiAgc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllczogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChwcm9wZXJ0aWVzLnVzZXJJZCkge1xuICAgICAgICBhbmFseXRpY3MuaWRlbnRpZnkocHJvcGVydGllcy51c2VySWQsIHByb3BlcnRpZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYW5hbHl0aWNzLmlkZW50aWZ5KHByb3BlcnRpZXMpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogaHR0cHM6Ly9zZWdtZW50LmNvbS9kb2NzL2Nvbm5lY3Rpb25zL3NvdXJjZXMvY2F0YWxvZy9saWJyYXJpZXMvd2Vic2l0ZS9qYXZhc2NyaXB0LyNyZXNldC0tbG9nb3V0XG4gICAqXG4gICAqIGFuYWx5dGljcy5yZXNldCgpO1xuICAgKi9cbiAgdW5zZXRVc2VyUHJvcGVydGllcygpIHtcbiAgICBhbmFseXRpY3MucmVzZXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBodHRwczovL3NlZ21lbnQuY29tL2RvY3MvbGlicmFyaWVzL2FuYWx5dGljcy5qcy8jYWxpYXNcbiAgICpcbiAgICogYW5hbHl0aWNzLmFsaWFzKHVzZXJJZCwgcHJldmlvdXNJZCwgb3B0aW9ucywgY2FsbGJhY2spO1xuICAgKi9cbiAgc2V0QWxpYXMoYWxpYXM6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICBhbmFseXRpY3MuYWxpYXMoYWxpYXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==