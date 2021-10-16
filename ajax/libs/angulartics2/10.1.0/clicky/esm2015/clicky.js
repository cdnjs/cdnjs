import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
import * as i2 from "@angular/platform-browser";
export class Angulartics2Clicky {
    constructor(angulartics2, titleService) {
        this.angulartics2 = angulartics2;
        this.titleService = titleService;
        if (typeof clicky === 'undefined') {
            console.warn('Angulartics 2 Clicky Plugin: clicky global not found');
        }
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.eventOrGoalTrack(x.action, x.properties));
    }
    /**
     * Track Page in Clicky
     *
     * @param path location
     *
     * @link https://clicky.com/help/custom/manual#log
     */
    pageTrack(path) {
        const title = this.titleService.getTitle();
        clicky.log(path, title, 'pageview');
    }
    /**
     * Track Event Or Goal in Clicky
     *
     * @param action Action name
     * @param properties Definition of 'properties.goal' determines goal vs event tracking
     *
     * @link https://clicky.com/help/custom/manual#log
     * @link https://clicky.com/help/custom/manual#goal
     */
    eventOrGoalTrack(action, properties) {
        if (typeof properties.goal === 'undefined') {
            const title = properties.title || null;
            const type = properties.type != null ? this.validateType(properties.type) : null;
            clicky.log(action, title, type);
        }
        else {
            const goalId = properties.goal;
            const revenue = properties.revenue;
            clicky.goal(goalId, revenue, !!properties.noQueue);
        }
    }
    validateType(type) {
        const EventType = ['pageview', 'click', 'download', 'outbound'];
        return EventType.indexOf(type) > -1 ? type : 'pageview';
    }
}
Angulartics2Clicky.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2Clicky_Factory() { return new Angulartics2Clicky(i0.ɵɵinject(i1.Angulartics2), i0.ɵɵinject(i2.Title)); }, token: Angulartics2Clicky, providedIn: "root" });
Angulartics2Clicky.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2Clicky.ctorParameters = () => [
    { type: Angulartics2 },
    { type: Title }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2t5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wcm92aWRlcnMvY2xpY2t5L2NsaWNreS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7O0FBTTVDLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFDVSxZQUEwQixFQUMxQixZQUFtQjtRQURuQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixpQkFBWSxHQUFaLFlBQVksQ0FBTztRQUUzQixJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtZQUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDLHNEQUFzRCxDQUFDLENBQUM7U0FDdEU7SUFDSCxDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUzthQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVU7YUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3QyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxTQUFTLENBQUMsSUFBWTtRQUNwQixNQUFNLEtBQUssR0FBVyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxnQkFBZ0IsQ0FBQyxNQUFjLEVBQUUsVUFBcUM7UUFDcEUsSUFBSSxPQUFPLFVBQVUsQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQzFDLE1BQU0sS0FBSyxHQUFXLFVBQVUsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO1lBQy9DLE1BQU0sSUFBSSxHQUFXLFVBQVUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3pGLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNqQzthQUFNO1lBQ0wsTUFBTSxNQUFNLEdBQVcsVUFBVSxDQUFDLElBQUksQ0FBQztZQUN2QyxNQUFNLE9BQU8sR0FBVyxVQUFVLENBQUMsT0FBTyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQztJQUVPLFlBQVksQ0FBQyxJQUFZO1FBQy9CLE1BQU0sU0FBUyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDaEUsT0FBTyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztJQUMxRCxDQUFDOzs7O1lBeERGLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUU7OztZQUx6QixZQUFZO1lBRlosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpdGxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMiB9IGZyb20gJ2FuZ3VsYXJ0aWNzMic7XG5pbXBvcnQgeyBDbGlja3lQcm9wZXJ0aWVzIH0gZnJvbSAnLi9jbGlja3kuaW50ZXJmYWNlcyc7XG5cbmRlY2xhcmUgdmFyIGNsaWNreTogYW55O1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMkNsaWNreSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczIsXG4gICAgcHJpdmF0ZSB0aXRsZVNlcnZpY2U6IFRpdGxlLFxuICApIHtcbiAgICBpZiAodHlwZW9mIGNsaWNreSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2FybignQW5ndWxhcnRpY3MgMiBDbGlja3kgUGx1Z2luOiBjbGlja3kgZ2xvYmFsIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0VHJhY2tpbmcoKTogdm9pZCB7XG4gICAgdGhpcy5hbmd1bGFydGljczIucGFnZVRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrXG4gICAgICAucGlwZSh0aGlzLmFuZ3VsYXJ0aWNzMi5maWx0ZXJEZXZlbG9wZXJNb2RlKCkpXG4gICAgICAuc3Vic2NyaWJlKCh4KSA9PiB0aGlzLmV2ZW50T3JHb2FsVHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYWNrIFBhZ2UgaW4gQ2xpY2t5XG4gICAqXG4gICAqIEBwYXJhbSBwYXRoIGxvY2F0aW9uXG4gICAqXG4gICAqIEBsaW5rIGh0dHBzOi8vY2xpY2t5LmNvbS9oZWxwL2N1c3RvbS9tYW51YWwjbG9nXG4gICAqL1xuICBwYWdlVHJhY2socGF0aDogc3RyaW5nKSB7XG4gICAgY29uc3QgdGl0bGU6IHN0cmluZyA9IHRoaXMudGl0bGVTZXJ2aWNlLmdldFRpdGxlKCk7XG4gICAgY2xpY2t5LmxvZyhwYXRoLCB0aXRsZSwgJ3BhZ2V2aWV3Jyk7XG4gIH1cblxuICAvKipcbiAgICogVHJhY2sgRXZlbnQgT3IgR29hbCBpbiBDbGlja3lcbiAgICpcbiAgICogQHBhcmFtIGFjdGlvbiBBY3Rpb24gbmFtZVxuICAgKiBAcGFyYW0gcHJvcGVydGllcyBEZWZpbml0aW9uIG9mICdwcm9wZXJ0aWVzLmdvYWwnIGRldGVybWluZXMgZ29hbCB2cyBldmVudCB0cmFja2luZ1xuICAgKlxuICAgKiBAbGluayBodHRwczovL2NsaWNreS5jb20vaGVscC9jdXN0b20vbWFudWFsI2xvZ1xuICAgKiBAbGluayBodHRwczovL2NsaWNreS5jb20vaGVscC9jdXN0b20vbWFudWFsI2dvYWxcbiAgICovXG4gIGV2ZW50T3JHb2FsVHJhY2soYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IFBhcnRpYWw8Q2xpY2t5UHJvcGVydGllcz4pIHtcbiAgICBpZiAodHlwZW9mIHByb3BlcnRpZXMuZ29hbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IHRpdGxlOiBzdHJpbmcgPSBwcm9wZXJ0aWVzLnRpdGxlIHx8IG51bGw7XG4gICAgICBjb25zdCB0eXBlOiBzdHJpbmcgPSBwcm9wZXJ0aWVzLnR5cGUgIT0gbnVsbCA/IHRoaXMudmFsaWRhdGVUeXBlKHByb3BlcnRpZXMudHlwZSkgOiBudWxsO1xuICAgICAgY2xpY2t5LmxvZyhhY3Rpb24sIHRpdGxlLCB0eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZ29hbElkOiBzdHJpbmcgPSBwcm9wZXJ0aWVzLmdvYWw7XG4gICAgICBjb25zdCByZXZlbnVlOiBudW1iZXIgPSBwcm9wZXJ0aWVzLnJldmVudWU7XG4gICAgICBjbGlja3kuZ29hbChnb2FsSWQsIHJldmVudWUsICEhcHJvcGVydGllcy5ub1F1ZXVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHZhbGlkYXRlVHlwZSh0eXBlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IEV2ZW50VHlwZSA9IFsncGFnZXZpZXcnLCAnY2xpY2snLCAnZG93bmxvYWQnLCAnb3V0Ym91bmQnXTtcbiAgICByZXR1cm4gRXZlbnRUeXBlLmluZGV4T2YodHlwZSkgPiAtMSA/IHR5cGUgOiAncGFnZXZpZXcnO1xuICB9XG59XG4iXX0=