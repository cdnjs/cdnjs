import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

class Angulartics2Woopra {
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
Angulartics2Woopra.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2Woopra_Factory() { return new Angulartics2Woopra(ɵɵinject(Angulartics2)); }, token: Angulartics2Woopra, providedIn: "root" });
Angulartics2Woopra.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2Woopra.ctorParameters = () => [
    { type: Angulartics2 }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2Woopra };
//# sourceMappingURL=angulartics2-woopra.js.map
