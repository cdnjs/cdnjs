import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
export class Angulartics2Kissmetrics {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        if (typeof (_kmq) === 'undefined') {
            _kmq = [];
        }
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
    }
    pageTrack(path) {
        _kmq.push(['record', 'Pageview', { Page: path }]);
    }
    eventTrack(action, properties) {
        _kmq.push(['record', action, properties]);
    }
    setUsername(userId) {
        _kmq.push(['identify', userId]);
    }
    setUserProperties(properties) {
        _kmq.push(['set', properties]);
    }
}
Angulartics2Kissmetrics.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Kissmetrics_Factory() { return new Angulartics2Kissmetrics(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Kissmetrics, providedIn: "root" });
Angulartics2Kissmetrics.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2Kissmetrics.ctorParameters = () => [
    { type: Angulartics2 }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2lzc21ldHJpY3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3Byb3ZpZGVycy9raXNzbWV0cmljcy9raXNzbWV0cmljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQUs1QyxNQUFNLE9BQU8sdUJBQXVCO0lBRWxDLFlBQ1UsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFFbEMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssV0FBVyxFQUFFO1lBQ2pDLElBQUksR0FBRyxFQUFFLENBQUM7U0FDWDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVzthQUMxQixTQUFTLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQjthQUNoQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVTthQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxTQUFTLENBQUMsSUFBWTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFjLEVBQUUsVUFBZTtRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxXQUFXLENBQUMsTUFBYztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELGlCQUFpQixDQUFDLFVBQWU7UUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7WUF0Q0YsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7O1lBSnpCLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMiB9IGZyb20gJ2FuZ3VsYXJ0aWNzMic7XG5cbmRlY2xhcmUgdmFyIF9rbXE6IGFueTtcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJLaXNzbWV0cmljcyB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMlxuICApIHtcbiAgICBpZiAodHlwZW9mIChfa21xKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIF9rbXEgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlcm5hbWVcbiAgICAgIC5zdWJzY3JpYmUoKHg6IHN0cmluZykgPT4gdGhpcy5zZXRVc2VybmFtZSh4KSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlclByb3BlcnRpZXNcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMuc2V0VXNlclByb3BlcnRpZXMoeCkpO1xuICB9XG5cbiAgc3RhcnRUcmFja2luZygpOiB2b2lkIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5wYWdlVHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMucGFnZVRyYWNrKHgucGF0aCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLmV2ZW50VHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMuZXZlbnRUcmFjayh4LmFjdGlvbiwgeC5wcm9wZXJ0aWVzKSk7XG4gIH1cblxuICBwYWdlVHJhY2socGF0aDogc3RyaW5nKSB7XG4gICAgX2ttcS5wdXNoKFsncmVjb3JkJywgJ1BhZ2V2aWV3JywgeyBQYWdlOiBwYXRoIH1dKTtcbiAgfVxuXG4gIGV2ZW50VHJhY2soYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IGFueSkge1xuICAgIF9rbXEucHVzaChbJ3JlY29yZCcsIGFjdGlvbiwgcHJvcGVydGllc10pO1xuICB9XG5cbiAgc2V0VXNlcm5hbWUodXNlcklkOiBzdHJpbmcpIHtcbiAgICBfa21xLnB1c2goWydpZGVudGlmeScsIHVzZXJJZF0pO1xuICB9XG5cbiAgc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllczogYW55KSB7XG4gICAgX2ttcS5wdXNoKFsnc2V0JywgcHJvcGVydGllc10pO1xuICB9XG59XG4iXX0=