import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Angulartics2 } from 'angulartics2';

class Angulartics2Clicky {
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
Angulartics2Clicky.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2Clicky_Factory() { return new Angulartics2Clicky(ɵɵinject(Angulartics2), ɵɵinject(Title)); }, token: Angulartics2Clicky, providedIn: "root" });
Angulartics2Clicky.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2Clicky.ctorParameters = () => [
    { type: Angulartics2 },
    { type: Title }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2Clicky };
//# sourceMappingURL=angulartics2-clicky.js.map
