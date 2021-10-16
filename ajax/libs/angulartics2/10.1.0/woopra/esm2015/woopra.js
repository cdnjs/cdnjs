import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
export class Angulartics2Woopra {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        if (typeof (woopra) === 'undefined') {
            console.warn('Woopra not found');
        }
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
        try {
            woopra.track('pv', {
                url: path
            });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    eventTrack(action, properties) {
        try {
            woopra.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUserProperties(properties) {
        try {
            if (properties.email) {
                woopra.identify(properties);
            }
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
}
Angulartics2Woopra.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Woopra_Factory() { return new Angulartics2Woopra(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2Woopra, providedIn: "root" });
Angulartics2Woopra.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2Woopra.ctorParameters = () => [
    { type: Angulartics2 }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29vcHJhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wcm92aWRlcnMvd29vcHJhL3dvb3ByYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQU01QyxNQUFNLE9BQU8sa0JBQWtCO0lBRTdCLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzVDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFdBQVcsRUFBRTtZQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDbEM7UUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQjthQUNoQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDN0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVTthQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxTQUFTLENBQUMsSUFBWTtRQUNwQixJQUFJO1lBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7Z0JBQ2pCLEdBQUcsRUFBRSxJQUFJO2FBQ1YsQ0FBQyxDQUFDO1NBQ0o7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxjQUFjLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLENBQUM7YUFDVDtTQUNGO0lBQ0gsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFjLEVBQUUsVUFBZTtRQUN4QyxJQUFJO1lBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDbEM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxjQUFjLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLENBQUM7YUFDVDtTQUNGO0lBQ0gsQ0FBQztJQUVELGlCQUFpQixDQUFDLFVBQWU7UUFDL0IsSUFBSTtZQUNGLElBQUksVUFBVSxDQUFDLEtBQUssRUFBRTtnQkFDcEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUM3QjtTQUNGO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksY0FBYyxDQUFDLEVBQUU7Z0JBQ2xDLE1BQU0sQ0FBQyxDQUFDO2FBQ1Q7U0FDRjtJQUNILENBQUM7Ozs7WUFyREYsVUFBVSxTQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7O1lBTHpCLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMiB9IGZyb20gJ2FuZ3VsYXJ0aWNzMic7XG5cblxuZGVjbGFyZSB2YXIgd29vcHJhOiBhbnk7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyV29vcHJhIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFuZ3VsYXJ0aWNzMjogQW5ndWxhcnRpY3MyKSB7XG4gICAgaWYgKHR5cGVvZiAod29vcHJhKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2FybignV29vcHJhIG5vdCBmb3VuZCcpO1xuICAgIH1cblxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJQcm9wZXJ0aWVzXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLnNldFVzZXJQcm9wZXJ0aWVzKHgpKTtcbiAgfVxuXG4gIHN0YXJ0VHJhY2tpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5hbmd1bGFydGljczIucGFnZVRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLmV2ZW50VHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xuICB9XG5cbiAgcGFnZVRyYWNrKHBhdGg6IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICB3b29wcmEudHJhY2soJ3B2Jywge1xuICAgICAgICB1cmw6IHBhdGhcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBldmVudFRyYWNrKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgd29vcHJhLnRyYWNrKGFjdGlvbiwgcHJvcGVydGllcyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldFVzZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXM6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICBpZiAocHJvcGVydGllcy5lbWFpbCkge1xuICAgICAgICB3b29wcmEuaWRlbnRpZnkocHJvcGVydGllcyk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19