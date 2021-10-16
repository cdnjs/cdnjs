import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

class Angulartics2Kissmetrics {
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
Angulartics2Kissmetrics.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2Kissmetrics_Factory() { return new Angulartics2Kissmetrics(ɵɵinject(Angulartics2)); }, token: Angulartics2Kissmetrics, providedIn: "root" });
Angulartics2Kissmetrics.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2Kissmetrics.ctorParameters = () => [
    { type: Angulartics2 }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2Kissmetrics };
//# sourceMappingURL=angulartics2-kissmetrics.js.map
