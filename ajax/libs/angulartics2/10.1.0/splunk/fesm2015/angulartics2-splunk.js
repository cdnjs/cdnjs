import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

class Angulartics2Splunk {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        if (typeof (sp) === 'undefined') {
            console.warn('Splunk not found');
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
        try {
            sp.pageview(path);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
    eventTrack(action, properties) {
        try {
            sp.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    }
}
Angulartics2Splunk.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2Splunk_Factory() { return new Angulartics2Splunk(ɵɵinject(Angulartics2)); }, token: Angulartics2Splunk, providedIn: "root" });
Angulartics2Splunk.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2Splunk.ctorParameters = () => [
    { type: Angulartics2 }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2Splunk };
//# sourceMappingURL=angulartics2-splunk.js.map
