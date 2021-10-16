import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

const facebookEventList = [
    'ViewContent',
    'Search',
    'AddToCart',
    'AddToWishlist',
    'InitiateCheckout',
    'AddPaymentInfo',
    'Purchase',
    'Lead',
    'CompleteRegistration',
];
class Angulartics2Facebook {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
    }
    startTracking() {
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.eventTrack(x.action, x.properties));
    }
    /**
     * Send interactions to the Pixel, i.e. for event tracking in Pixel
     *
     * @param action action associated with the event
     */
    eventTrack(action, properties = {}) {
        if (typeof fbq === 'undefined') {
            return;
        }
        if (facebookEventList.indexOf(action) === -1) {
            return fbq('trackCustom', action, properties);
        }
        return fbq('track', action, properties);
    }
}
Angulartics2Facebook.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2Facebook_Factory() { return new Angulartics2Facebook(ɵɵinject(Angulartics2)); }, token: Angulartics2Facebook, providedIn: "root" });
Angulartics2Facebook.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2Facebook.ctorParameters = () => [
    { type: Angulartics2 }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2Facebook };
//# sourceMappingURL=angulartics2-facebook.js.map
