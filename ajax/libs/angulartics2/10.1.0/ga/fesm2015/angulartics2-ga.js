import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

class GoogleAnalyticsDefaults {
    constructor() {
        this.additionalAccountNames = [];
        this.userId = null;
        this.transport = '';
        this.anonymizeIp = false;
    }
}
class Angulartics2GoogleAnalytics {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.dimensionsAndMetrics = [];
        const defaults = new GoogleAnalyticsDefaults();
        // Set the default settings for this module
        this.angulartics2.settings.ga = Object.assign(Object.assign({}, defaults), this.angulartics2.settings.ga);
        this.settings = this.angulartics2.settings.ga;
        this.angulartics2.setUsername.subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties.subscribe(x => this.setUserProperties(x));
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.eventTrack(x.action, x.properties));
        this.angulartics2.exceptionTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.exceptionTrack(x));
        this.angulartics2.userTimings
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.userTimings(x));
    }
    pageTrack(path) {
        if (typeof _gaq !== 'undefined' && _gaq) {
            _gaq.push(['_trackPageview', path]);
            for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
                _gaq.push([accountName + '._trackPageview', path]);
            }
        }
        if (typeof ga !== 'undefined' && ga) {
            if (this.angulartics2.settings.ga.userId) {
                ga('set', '&uid', this.angulartics2.settings.ga.userId);
                for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
                    ga(accountName + '.set', '&uid', this.angulartics2.settings.ga.userId);
                }
            }
            if (this.angulartics2.settings.ga.anonymizeIp) {
                ga('set', 'anonymizeIp', true);
                for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
                    ga(accountName + '.set', 'anonymizeIp', true);
                }
            }
            ga('send', 'pageview', path);
            for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
                ga(accountName + '.send', 'pageview', path);
            }
        }
    }
    /**
     * Track Event in GA
     *
     * @param action Associated with the event
     * @param properties Comprised of:
     *  - category (string) and optional
     *  - label (string)
     *  - value (integer)
     *  - noninteraction (boolean)
     *
     * @link https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     */
    eventTrack(action, properties) {
        // Google Analytics requires an Event Category
        if (!properties || !properties.category) {
            properties = properties || {};
            properties.category = 'Event';
        }
        // GA requires that eventValue be an integer, see:
        // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue
        // https://github.com/luisfarzati/angulartics/issues/81
        if (properties.value) {
            const parsed = parseInt(properties.value, 10);
            properties.value = isNaN(parsed) ? 0 : parsed;
        }
        if (typeof ga !== 'undefined') {
            const eventOptions = Object.assign({ eventCategory: properties.category, eventAction: action, eventLabel: properties.label, eventValue: properties.value, nonInteraction: properties.noninteraction, page: properties.page || location.hash.substring(1) || location.pathname, userId: this.angulartics2.settings.ga.userId, hitCallback: properties.hitCallback }, this.angulartics2.settings.ga.transport && { transport: this.angulartics2.settings.ga.transport });
            // add custom dimensions and metrics
            this.setDimensionsAndMetrics(properties);
            ga('send', 'event', eventOptions);
            for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
                ga(accountName + '.send', 'event', eventOptions);
            }
        }
        else if (typeof _gaq !== 'undefined') {
            _gaq.push([
                '_trackEvent',
                properties.category,
                action,
                properties.label,
                properties.value,
                properties.noninteraction,
            ]);
        }
    }
    /**
     * Exception Track Event in GA
     *
     * @param properties Comprised of the optional fields:
     *  - fatal (string)
     *  - description (string)
     *
     * @https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     */
    exceptionTrack(properties) {
        if (properties.fatal === undefined) {
            console.log('No "fatal" provided, sending with fatal=true');
            properties.fatal = true;
        }
        properties.exDescription = properties.description;
        const eventOptions = {
            exFatal: properties.fatal,
            exDescription: properties.description,
        };
        ga('send', 'exception', eventOptions);
        for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
            ga(accountName + '.send', 'exception', eventOptions);
        }
    }
    /**
     * User Timings Event in GA
     *
     * @param properties Comprised of the mandatory fields:
     *  - timingCategory (string)
     *  - timingVar (string)
     *  - timingValue (number)
     * Properties can also have the optional fields:
     *  - timingLabel (string)
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings
     */
    userTimings(properties) {
        if (!properties ||
            !properties.timingCategory ||
            !properties.timingVar ||
            !properties.timingValue) {
            console.error('Properties timingCategory, timingVar, and timingValue are required to be set.');
            return;
        }
        if (typeof ga !== 'undefined') {
            ga('send', 'timing', properties);
            for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
                ga(accountName + '.send', 'timing', properties);
            }
        }
    }
    setUsername(userId) {
        this.angulartics2.settings.ga.userId = userId;
        if (typeof ga === 'undefined') {
            return;
        }
        ga('set', 'userId', userId);
    }
    setUserProperties(properties) {
        this.setDimensionsAndMetrics(properties);
    }
    setDimensionsAndMetrics(properties) {
        if (typeof ga === 'undefined') {
            return;
        }
        // clean previously used dimensions and metrics that will not be overriden
        this.dimensionsAndMetrics.forEach(elem => {
            if (!properties.hasOwnProperty(elem)) {
                ga('set', elem, undefined);
                this.angulartics2.settings.ga.additionalAccountNames.forEach((accountName) => {
                    ga(`${accountName}.set`, elem, undefined);
                });
            }
        });
        this.dimensionsAndMetrics = [];
        // add custom dimensions and metrics
        Object.keys(properties).forEach(key => {
            if (key.lastIndexOf('dimension', 0) === 0 ||
                key.lastIndexOf('metric', 0) === 0) {
                ga('set', key, properties[key]);
                this.angulartics2.settings.ga.additionalAccountNames.forEach((accountName) => {
                    ga(`${accountName}.set`, key, properties[key]);
                });
                this.dimensionsAndMetrics.push(key);
            }
        });
    }
}
Angulartics2GoogleAnalytics.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2GoogleAnalytics_Factory() { return new Angulartics2GoogleAnalytics(ɵɵinject(Angulartics2)); }, token: Angulartics2GoogleAnalytics, providedIn: "root" });
Angulartics2GoogleAnalytics.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2GoogleAnalytics.ctorParameters = () => [
    { type: Angulartics2 }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2GoogleAnalytics, GoogleAnalyticsDefaults };
//# sourceMappingURL=angulartics2-ga.js.map
