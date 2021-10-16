import { ɵɵdefineInjectable, ɵɵinject, Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

class GoogleGlobalSiteTagDefaults {
    constructor() {
        this.trackingIds = [];
        if (typeof ga !== 'undefined' && ga) {
            // See: https://developers.google.com/analytics/devguides/collection/analyticsjs/ga-object-methods-reference
            ga(() => {
                ga.getAll().forEach((tracker) => {
                    const id = tracker.get('trackingId');
                    // If set both in forRoot and HTML page, we want to avoid duplicates
                    if (id !== undefined && this.trackingIds.indexOf(id) === -1) {
                        this.trackingIds.push(id);
                    }
                });
            });
        }
    }
}
class Angulartics2GoogleGlobalSiteTag {
    constructor(angulartics2) {
        this.angulartics2 = angulartics2;
        this.dimensionsAndMetrics = {};
        const defaults = new GoogleGlobalSiteTagDefaults();
        // Set the default settings for this module
        this.angulartics2.settings.gst = Object.assign(Object.assign({}, defaults), this.angulartics2.settings.gst);
    }
    startTracking() {
        this.angulartics2.pageTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.pageTrack(x.path));
        this.angulartics2.eventTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.eventTrack(x.action, x.properties));
        this.angulartics2.exceptionTrack
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.exceptionTrack(x));
        this.angulartics2.userTimings
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe(x => this.userTimings(this.convertTimings(x)));
        this.angulartics2.setUsername
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.setUsername(x));
        this.angulartics2.setUserProperties
            .pipe(this.angulartics2.filterDeveloperMode())
            .subscribe((x) => this.setUserProperties(x));
    }
    /**
     * Manually track page view, see:
     *
     * https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications#tracking_virtual_pageviews
     *
     * @param path relative url
     */
    pageTrack(path) {
        if (typeof gtag !== 'undefined' && gtag) {
            const params = Object.assign({ page_path: path, page_location: window.location.protocol + '//' + window.location.host + path }, this.dimensionsAndMetrics);
            // Custom map must be reset with all config to stay valid.
            if (this.angulartics2.settings.gst.customMap) {
                params.custom_map = this.angulartics2.settings.gst.customMap;
            }
            if (this.angulartics2.settings.gst.userId) {
                params.user_id = this.angulartics2.settings.gst.userId;
            }
            if (this.angulartics2.settings.gst.anonymizeIp) {
                params.anonymize_ip = this.angulartics2.settings.gst.anonymizeIp;
            }
            for (const id of this.angulartics2.settings.gst.trackingIds) {
                gtag('config', id, params);
            }
        }
    }
    /**
     * Send interactions to gtag, i.e. for event tracking in Google Analytics. See:
     *
     * https://developers.google.com/analytics/devguides/collection/gtagjs/events
     *
     * @param action associated with the event
     */
    eventTrack(action, properties = {}) {
        this.eventTrackInternal(action, Object.assign({ event_category: properties.category || 'interaction', event_label: properties.label, value: properties.value, non_interaction: properties.noninteraction }, properties.gstCustom));
    }
    /**
     * Exception Track Event in GST. See:
     *
     * https://developers.google.com/analytics/devguides/collection/gtagjs/exceptions
     *
     */
    exceptionTrack(properties) {
        // TODO: make interface
        //  @param {Object} properties
        //  @param {string} [properties.description]
        //  @param {boolean} [properties.fatal]
        if (properties.fatal === undefined) {
            console.log('No "fatal" provided, sending with fatal=true');
            properties.fatal = true;
        }
        properties.exDescription = properties.event ? properties.event.stack : properties.description;
        this.eventTrack('exception', {
            gstCustom: Object.assign({ description: properties.exDescription, fatal: properties.fatal }, properties.gstCustom)
        });
    }
    /**
     * User Timings Event in GST.
     *
     * @param properties Comprised of the mandatory fields:
     *  - name (string)
     *  - value (number - integer)
     * Properties can also have the optional fields:
     *  - category (string)
     *  - label (string)
     *
     * @link https://developers.google.com/analytics/devguides/collection/gtagjs/user-timings
     */
    userTimings(properties) {
        if (!properties) {
            console.error('User timings - "properties" parameter is required to be set.');
            return;
        }
        this.eventTrackInternal('timing_complete', {
            name: properties.name,
            value: properties.value,
            event_category: properties.category,
            event_label: properties.label
        });
    }
    convertTimings(properties) {
        return {
            name: properties.timingVar,
            value: properties.timingValue,
            category: properties.timingCategory,
            label: properties.timingLabel
        };
    }
    setUsername(userId) {
        this.angulartics2.settings.gst.userId = userId;
        if (typeof gtag !== 'undefined' && gtag) {
            gtag('set', { user_id: typeof userId === 'string' || !userId ? userId : userId.userId });
        }
    }
    setUserProperties(properties) {
        this.setDimensionsAndMetrics(properties);
    }
    setDimensionsAndMetrics(properties) {
        // We want the dimensions and metrics to accumulate, so we merge with previous value
        this.dimensionsAndMetrics = Object.assign(Object.assign({}, this.dimensionsAndMetrics), properties);
        // Remove properties that are null or undefined
        Object.keys(this.dimensionsAndMetrics).forEach(key => {
            const val = this.dimensionsAndMetrics[key];
            if (val === undefined || val === null) {
                delete this.dimensionsAndMetrics[key];
            }
        });
        if (typeof gtag !== 'undefined' && gtag) {
            gtag('set', this.dimensionsAndMetrics);
        }
    }
    eventTrackInternal(action, properties = {}) {
        this.cleanProperties(properties);
        if (typeof gtag !== 'undefined' && gtag) {
            gtag('event', action, properties);
        }
    }
    cleanProperties(properties) {
        // GA requires that eventValue be an non-negative integer, see:
        // https://developers.google.com/analytics/devguides/collection/gtagjs/events
        if (properties.value) {
            const parsed = parseInt(properties.value, 10);
            properties.value = isNaN(parsed) ? 0 : parsed;
        }
    }
}
Angulartics2GoogleGlobalSiteTag.ɵprov = ɵɵdefineInjectable({ factory: function Angulartics2GoogleGlobalSiteTag_Factory() { return new Angulartics2GoogleGlobalSiteTag(ɵɵinject(Angulartics2)); }, token: Angulartics2GoogleGlobalSiteTag, providedIn: "root" });
Angulartics2GoogleGlobalSiteTag.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2GoogleGlobalSiteTag.ctorParameters = () => [
    { type: Angulartics2 }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Angulartics2GoogleGlobalSiteTag, GoogleGlobalSiteTagDefaults };
//# sourceMappingURL=angulartics2-gst.js.map
