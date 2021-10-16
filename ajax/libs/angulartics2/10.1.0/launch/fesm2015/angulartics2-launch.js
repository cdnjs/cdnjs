import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

class Angulartics2LaunchByAdobe {
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
Angulartics2LaunchByAdobe.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2LaunchByAdobe_Factory() { return new Angulartics2LaunchByAdobe(ɵɵinject(Angulartics2)); }, token: Angulartics2LaunchByAdobe, providedIn: "root" });
Angulartics2LaunchByAdobe.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2LaunchByAdobe.ctorParameters = () => [
    { type: Angulartics2 }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2LaunchByAdobe };
//# sourceMappingURL=angulartics2-launch.js.map
