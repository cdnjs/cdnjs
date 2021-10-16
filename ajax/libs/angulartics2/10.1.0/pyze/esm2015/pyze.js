import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
export class Angulartics2Pyze {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.angulartics2.setUsername.subscribe((x) => this.setUserId(x));
        this.angulartics2.setUserProperties.subscribe((x) => this.postTraits(x));
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
            Pyze.postPageView('Page Viewed', { page: path });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    eventTrack(action, properties) {
        try {
            PyzeEvents.postCustomEventWithAttributes(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUserId(userId) {
        try {
            PyzeIdentity.setUserIdentifier(userId);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    postTraits(properties) {
        try {
            PyzeIdentity.postTraits(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
}
Angulartics2Pyze.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Pyze_Factory() { return new Angulartics2Pyze(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Pyze, providedIn: "root" });
Angulartics2Pyze.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2Pyze.ctorParameters = () => [
    { type: Angulartics2 }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHl6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvcHJvdmlkZXJzL3B5emUvcHl6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQVE1QyxNQUFNLE9BQVEsZ0JBQWdCO0lBRTFCLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELGFBQWE7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVM7YUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVO2FBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFZO1FBQ2xCLElBQUk7WUFDQSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3BEO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksY0FBYyxDQUFDLEVBQUU7Z0JBQ3BDLE1BQU0sQ0FBQyxDQUFDO2FBQ1A7U0FDSjtJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBYyxFQUFFLFVBQWU7UUFDdEMsSUFBSTtZQUNBLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDaEU7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxjQUFjLENBQUMsRUFBRTtnQkFDcEMsTUFBTSxDQUFDLENBQUM7YUFDUDtTQUNKO0lBQ0wsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFjO1FBQ3BCLElBQUk7WUFDQSxZQUFZLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDMUM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxjQUFjLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLENBQUM7YUFDVDtTQUNGO0lBQ0gsQ0FBQztJQUVILFVBQVUsQ0FBQyxVQUFrQjtRQUN6QixJQUFJO1lBQ0EsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN2QztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLGNBQWMsQ0FBQyxFQUFFO2dCQUNsQyxNQUFNLENBQUMsQ0FBQzthQUNUO1NBQ0Y7SUFDTCxDQUFDOzs7O1lBdkRKLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OztZQVB6QixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICdhbmd1bGFydGljczInO1xuXG5kZWNsYXJlIHZhciBQeXplOiBhbnk7XG5kZWNsYXJlIHZhciBQeXplRXZlbnRzOiBhbnk7XG5kZWNsYXJlIHZhciBQeXplSWRlbnRpdHk6IGFueTtcblxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzICBBbmd1bGFydGljczJQeXplIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczIpIHtcbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlcm5hbWUuc3Vic2NyaWJlKCh4OiBzdHJpbmcpID0+IHRoaXMuc2V0VXNlcklkKHgpKTtcbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlclByb3BlcnRpZXMuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLnBvc3RUcmFpdHMoeCkpO1xuICAgIH1cblxuICAgIHN0YXJ0VHJhY2tpbmcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYW5ndWxhcnRpY3MyLnBhZ2VUcmFja1xuICAgICAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgpKTtcbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFja1xuICAgICAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLmV2ZW50VHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xuICAgIH1cblxuICAgIHBhZ2VUcmFjayhwYXRoOiBzdHJpbmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIFB5emUucG9zdFBhZ2VWaWV3KCdQYWdlIFZpZXdlZCcsIHsgcGFnZTogcGF0aCB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xuICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV2ZW50VHJhY2soYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IGFueSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgUHl6ZUV2ZW50cy5wb3N0Q3VzdG9tRXZlbnRXaXRoQXR0cmlidXRlcyhhY3Rpb24sIHByb3BlcnRpZXMpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0VXNlcklkKHVzZXJJZDogc3RyaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBQeXplSWRlbnRpdHkuc2V0VXNlcklkZW50aWZpZXIodXNlcklkKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICBwb3N0VHJhaXRzKHByb3BlcnRpZXM6IHN0cmluZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgUHl6ZUlkZW50aXR5LnBvc3RUcmFpdHMocHJvcGVydGllcyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==