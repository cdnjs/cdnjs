import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

class Angulartics2GoSquared {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.angulartics2.setUserProperties.subscribe(x => this.setUserProperties(x));
        this.angulartics2.setUserPropertiesOnce.subscribe(x => this.setUserProperties(x));
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.eventTrack(x.action, x.properties));
    }
    pageTrack(path) {
        try {
            _gs('track', path);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    eventTrack(action, properties) {
        try {
            _gs('event', action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    setUserProperties(properties) {
        try {
            _gs('identify', properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
}
Angulartics2GoSquared.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2GoSquared_Factory() { return new Angulartics2GoSquared(ɵɵinject(Angulartics2)); }, token: Angulartics2GoSquared, providedIn: "root" });
Angulartics2GoSquared.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2GoSquared.ctorParameters = () => [
    { type: Angulartics2 }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2GoSquared };
//# sourceMappingURL=angulartics2-gosquared.js.map
