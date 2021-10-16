import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import * as i0 from "@angular/core";
import * as i1 from "angulartics2";
export class GoogleGlobalSiteTagDefaults {
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
export class Angulartics2GoogleGlobalSiteTag {
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
Angulartics2GoogleGlobalSiteTag.ɵprov = i0.ɵɵdefineInjectable({ factory: function Angulartics2GoogleGlobalSiteTag_Factory() { return new Angulartics2GoogleGlobalSiteTag(i0.ɵɵinject(i1.Angulartics2)); }, token: Angulartics2GoogleGlobalSiteTag, providedIn: "root" });
Angulartics2GoogleGlobalSiteTag.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
Angulartics2GoogleGlobalSiteTag.ctorParameters = () => [
    { type: Angulartics2 }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9wcm92aWRlcnMvZ3N0L2dzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQTRDLE1BQU0sY0FBYyxDQUFDOzs7QUFNdEYsTUFBTSxPQUFPLDJCQUEyQjtJQUd0QztRQUZBLGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBR3pCLElBQUksT0FBTyxFQUFFLEtBQUssV0FBVyxJQUFJLEVBQUUsRUFBRTtZQUNuQyw0R0FBNEc7WUFDNUcsRUFBRSxDQUFDLEdBQUcsRUFBRTtnQkFDTixFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUU7b0JBQ25DLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3JDLG9FQUFvRTtvQkFDcEUsSUFBSSxFQUFFLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUMzRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDM0I7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztDQUNGO0FBR0QsTUFBTSxPQUFPLCtCQUErQjtJQUcxQyxZQUFzQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUZ4Qyx5QkFBb0IsR0FBMkIsRUFBRSxDQUFDO1FBR3hELE1BQU0sUUFBUSxHQUFHLElBQUksMkJBQTJCLEVBQUUsQ0FBQztRQUNuRCwyQ0FBMkM7UUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxtQ0FBUSxRQUFRLEdBQUss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Qzs7OztZQTVMRixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7WUF6QnpCLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMiwgR29vZ2xlR2xvYmFsU2l0ZVRhZ1NldHRpbmdzLCBVc2VyVGltaW5ncyB9IGZyb20gJ2FuZ3VsYXJ0aWNzMic7XG5pbXBvcnQgeyBFdmVudEdzdCwgVXNlclRpbWluZ3NHc3QgfSBmcm9tICcuL2dzdC1pbnRlcmZhY2VzJztcblxuZGVjbGFyZSB2YXIgZ3RhZzogYW55O1xuZGVjbGFyZSB2YXIgZ2E6IGFueTtcblxuZXhwb3J0IGNsYXNzIEdvb2dsZUdsb2JhbFNpdGVUYWdEZWZhdWx0cyBpbXBsZW1lbnRzIEdvb2dsZUdsb2JhbFNpdGVUYWdTZXR0aW5ncyB7XG4gIHRyYWNraW5nSWRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGlmICh0eXBlb2YgZ2EgIT09ICd1bmRlZmluZWQnICYmIGdhKSB7XG4gICAgICAvLyBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9nYS1vYmplY3QtbWV0aG9kcy1yZWZlcmVuY2VcbiAgICAgIGdhKCgpID0+IHtcbiAgICAgICAgZ2EuZ2V0QWxsKCkuZm9yRWFjaCgodHJhY2tlcjogYW55KSA9PiB7XG4gICAgICAgICAgY29uc3QgaWQgPSB0cmFja2VyLmdldCgndHJhY2tpbmdJZCcpO1xuICAgICAgICAgIC8vIElmIHNldCBib3RoIGluIGZvclJvb3QgYW5kIEhUTUwgcGFnZSwgd2Ugd2FudCB0byBhdm9pZCBkdXBsaWNhdGVzXG4gICAgICAgICAgaWYgKGlkICE9PSB1bmRlZmluZWQgJiYgdGhpcy50cmFja2luZ0lkcy5pbmRleE9mKGlkKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMudHJhY2tpbmdJZHMucHVzaChpZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMkdvb2dsZUdsb2JhbFNpdGVUYWcge1xuICBwcml2YXRlIGRpbWVuc2lvbnNBbmRNZXRyaWNzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFuZ3VsYXJ0aWNzMjogQW5ndWxhcnRpY3MyKSB7XG4gICAgY29uc3QgZGVmYXVsdHMgPSBuZXcgR29vZ2xlR2xvYmFsU2l0ZVRhZ0RlZmF1bHRzKCk7XG4gICAgLy8gU2V0IHRoZSBkZWZhdWx0IHNldHRpbmdzIGZvciB0aGlzIG1vZHVsZVxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdzdCA9IHsgLi4uZGVmYXVsdHMsIC4uLnRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdzdCB9O1xuICB9XG5cbiAgc3RhcnRUcmFja2luZygpOiB2b2lkIHtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5wYWdlVHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMucGFnZVRyYWNrKHgucGF0aCkpO1xuICAgIHRoaXMuYW5ndWxhcnRpY3MyLmV2ZW50VHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHgpID0+IHRoaXMuZXZlbnRUcmFjayh4LmFjdGlvbiwgeC5wcm9wZXJ0aWVzKSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIuZXhjZXB0aW9uVHJhY2tcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoKHg6IGFueSkgPT4gdGhpcy5leGNlcHRpb25UcmFjayh4KSk7XG4gICAgdGhpcy5hbmd1bGFydGljczIudXNlclRpbWluZ3NcbiAgICAgIC5waXBlKHRoaXMuYW5ndWxhcnRpY3MyLmZpbHRlckRldmVsb3Blck1vZGUoKSlcbiAgICAgIC5zdWJzY3JpYmUoeCA9PiB0aGlzLnVzZXJUaW1pbmdzKHRoaXMuY29udmVydFRpbWluZ3MoeCkpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VybmFtZVxuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeDogc3RyaW5nKSA9PiB0aGlzLnNldFVzZXJuYW1lKHgpKTtcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllc1xuICAgICAgLnBpcGUodGhpcy5hbmd1bGFydGljczIuZmlsdGVyRGV2ZWxvcGVyTW9kZSgpKVxuICAgICAgLnN1YnNjcmliZSgoeDogYW55KSA9PiB0aGlzLnNldFVzZXJQcm9wZXJ0aWVzKHgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYW51YWxseSB0cmFjayBwYWdlIHZpZXcsIHNlZTpcbiAgICpcbiAgICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2d0YWdqcy9zaW5nbGUtcGFnZS1hcHBsaWNhdGlvbnMjdHJhY2tpbmdfdmlydHVhbF9wYWdldmlld3NcbiAgICpcbiAgICogQHBhcmFtIHBhdGggcmVsYXRpdmUgdXJsXG4gICAqL1xuICBwYWdlVHJhY2socGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBndGFnICE9PSAndW5kZWZpbmVkJyAmJiBndGFnKSB7XG4gICAgICBjb25zdCBwYXJhbXM6IGFueSA9IHtcbiAgICAgICAgcGFnZV9wYXRoOiBwYXRoLFxuICAgICAgICBwYWdlX2xvY2F0aW9uOiB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyBwYXRoLFxuICAgICAgICAuLi50aGlzLmRpbWVuc2lvbnNBbmRNZXRyaWNzXG4gICAgICB9O1xuXG4gICAgICAvLyBDdXN0b20gbWFwIG11c3QgYmUgcmVzZXQgd2l0aCBhbGwgY29uZmlnIHRvIHN0YXkgdmFsaWQuXG5cbiAgICAgIGlmICh0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nc3QuY3VzdG9tTWFwKSB7XG4gICAgICAgIHBhcmFtcy5jdXN0b21fbWFwID0gdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3N0LmN1c3RvbU1hcDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nc3QudXNlcklkKSB7XG4gICAgICAgIHBhcmFtcy51c2VyX2lkID0gdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3N0LnVzZXJJZDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nc3QuYW5vbnltaXplSXApIHtcbiAgICAgICAgcGFyYW1zLmFub255bWl6ZV9pcCA9IHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdzdC5hbm9ueW1pemVJcDtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBpZCBvZiB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nc3QudHJhY2tpbmdJZHMpIHtcbiAgICAgICAgZ3RhZygnY29uZmlnJywgaWQsIHBhcmFtcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgaW50ZXJhY3Rpb25zIHRvIGd0YWcsIGkuZS4gZm9yIGV2ZW50IHRyYWNraW5nIGluIEdvb2dsZSBBbmFseXRpY3MuIFNlZTpcbiAgICpcbiAgICogaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2d0YWdqcy9ldmVudHNcbiAgICpcbiAgICogQHBhcmFtIGFjdGlvbiBhc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50XG4gICAqL1xuICBldmVudFRyYWNrKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBQYXJ0aWFsPEV2ZW50R3N0PiA9IHt9KSB7XG4gICAgdGhpcy5ldmVudFRyYWNrSW50ZXJuYWwoYWN0aW9uLCB7XG4gICAgICBldmVudF9jYXRlZ29yeTogcHJvcGVydGllcy5jYXRlZ29yeSB8fCAnaW50ZXJhY3Rpb24nLFxuICAgICAgZXZlbnRfbGFiZWw6IHByb3BlcnRpZXMubGFiZWwsXG4gICAgICB2YWx1ZTogcHJvcGVydGllcy52YWx1ZSxcbiAgICAgIG5vbl9pbnRlcmFjdGlvbjogcHJvcGVydGllcy5ub25pbnRlcmFjdGlvbixcbiAgICAgIC4uLnByb3BlcnRpZXMuZ3N0Q3VzdG9tXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRXhjZXB0aW9uIFRyYWNrIEV2ZW50IGluIEdTVC4gU2VlOlxuICAgKlxuICAgKiBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9hbmFseXRpY3MvZGV2Z3VpZGVzL2NvbGxlY3Rpb24vZ3RhZ2pzL2V4Y2VwdGlvbnNcbiAgICpcbiAgICovXG4gIGV4Y2VwdGlvblRyYWNrKHByb3BlcnRpZXM6IGFueSkge1xuICAgIC8vIFRPRE86IG1ha2UgaW50ZXJmYWNlXG4gICAgLy8gIEBwYXJhbSB7T2JqZWN0fSBwcm9wZXJ0aWVzXG4gICAgLy8gIEBwYXJhbSB7c3RyaW5nfSBbcHJvcGVydGllcy5kZXNjcmlwdGlvbl1cbiAgICAvLyAgQHBhcmFtIHtib29sZWFufSBbcHJvcGVydGllcy5mYXRhbF1cbiAgICBpZiAocHJvcGVydGllcy5mYXRhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmxvZygnTm8gXCJmYXRhbFwiIHByb3ZpZGVkLCBzZW5kaW5nIHdpdGggZmF0YWw9dHJ1ZScpO1xuICAgICAgcHJvcGVydGllcy5mYXRhbCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHJvcGVydGllcy5leERlc2NyaXB0aW9uID0gcHJvcGVydGllcy5ldmVudCA/IHByb3BlcnRpZXMuZXZlbnQuc3RhY2sgOiBwcm9wZXJ0aWVzLmRlc2NyaXB0aW9uO1xuXG4gICAgdGhpcy5ldmVudFRyYWNrKCdleGNlcHRpb24nLCB7XG4gICAgICBnc3RDdXN0b206IHtcbiAgICAgICAgZGVzY3JpcHRpb246IHByb3BlcnRpZXMuZXhEZXNjcmlwdGlvbixcbiAgICAgICAgZmF0YWw6IHByb3BlcnRpZXMuZmF0YWwsXG4gICAgICAgIC4uLnByb3BlcnRpZXMuZ3N0Q3VzdG9tXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXNlciBUaW1pbmdzIEV2ZW50IGluIEdTVC5cbiAgICpcbiAgICogQHBhcmFtIHByb3BlcnRpZXMgQ29tcHJpc2VkIG9mIHRoZSBtYW5kYXRvcnkgZmllbGRzOlxuICAgKiAgLSBuYW1lIChzdHJpbmcpXG4gICAqICAtIHZhbHVlIChudW1iZXIgLSBpbnRlZ2VyKVxuICAgKiBQcm9wZXJ0aWVzIGNhbiBhbHNvIGhhdmUgdGhlIG9wdGlvbmFsIGZpZWxkczpcbiAgICogIC0gY2F0ZWdvcnkgKHN0cmluZylcbiAgICogIC0gbGFiZWwgKHN0cmluZylcbiAgICpcbiAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2d0YWdqcy91c2VyLXRpbWluZ3NcbiAgICovXG4gIHVzZXJUaW1pbmdzKHByb3BlcnRpZXM6IFVzZXJUaW1pbmdzR3N0KSB7XG4gICAgaWYgKCFwcm9wZXJ0aWVzKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdVc2VyIHRpbWluZ3MgLSBcInByb3BlcnRpZXNcIiBwYXJhbWV0ZXIgaXMgcmVxdWlyZWQgdG8gYmUgc2V0LicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZXZlbnRUcmFja0ludGVybmFsKCd0aW1pbmdfY29tcGxldGUnLCB7XG4gICAgICBuYW1lOiBwcm9wZXJ0aWVzLm5hbWUsXG4gICAgICB2YWx1ZTogcHJvcGVydGllcy52YWx1ZSxcbiAgICAgIGV2ZW50X2NhdGVnb3J5OiBwcm9wZXJ0aWVzLmNhdGVnb3J5LFxuICAgICAgZXZlbnRfbGFiZWw6IHByb3BlcnRpZXMubGFiZWxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFRpbWluZ3MocHJvcGVydGllczogVXNlclRpbWluZ3MpOiBVc2VyVGltaW5nc0dzdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHByb3BlcnRpZXMudGltaW5nVmFyLFxuICAgICAgdmFsdWU6IHByb3BlcnRpZXMudGltaW5nVmFsdWUsXG4gICAgICBjYXRlZ29yeTogcHJvcGVydGllcy50aW1pbmdDYXRlZ29yeSxcbiAgICAgIGxhYmVsOiBwcm9wZXJ0aWVzLnRpbWluZ0xhYmVsXG4gICAgfTtcbiAgfVxuXG4gIHNldFVzZXJuYW1lKHVzZXJJZDogc3RyaW5nIHwgeyB1c2VySWQ6IHN0cmluZyB8IG51bWJlciB9KSB7XG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3N0LnVzZXJJZCA9IHVzZXJJZDtcbiAgICBpZiAodHlwZW9mIGd0YWcgIT09ICd1bmRlZmluZWQnICYmIGd0YWcpIHtcbiAgICAgIGd0YWcoJ3NldCcsIHsgdXNlcl9pZDogdHlwZW9mIHVzZXJJZCA9PT0gJ3N0cmluZycgfHwgIXVzZXJJZCA/IHVzZXJJZCA6IHVzZXJJZC51c2VySWQgfSk7XG4gICAgfVxuICB9XG5cbiAgc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllczogYW55KSB7XG4gICAgdGhpcy5zZXREaW1lbnNpb25zQW5kTWV0cmljcyhwcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0RGltZW5zaW9uc0FuZE1ldHJpY3MocHJvcGVydGllczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkge1xuICAgIC8vIFdlIHdhbnQgdGhlIGRpbWVuc2lvbnMgYW5kIG1ldHJpY3MgdG8gYWNjdW11bGF0ZSwgc28gd2UgbWVyZ2Ugd2l0aCBwcmV2aW91cyB2YWx1ZVxuICAgIHRoaXMuZGltZW5zaW9uc0FuZE1ldHJpY3MgPSB7XG4gICAgICAuLi50aGlzLmRpbWVuc2lvbnNBbmRNZXRyaWNzLFxuICAgICAgLi4ucHJvcGVydGllc1xuICAgIH07XG5cbiAgICAvLyBSZW1vdmUgcHJvcGVydGllcyB0aGF0IGFyZSBudWxsIG9yIHVuZGVmaW5lZFxuICAgIE9iamVjdC5rZXlzKHRoaXMuZGltZW5zaW9uc0FuZE1ldHJpY3MpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGNvbnN0IHZhbCA9IHRoaXMuZGltZW5zaW9uc0FuZE1ldHJpY3Nba2V5XTtcbiAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCB8fCB2YWwgPT09IG51bGwpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuZGltZW5zaW9uc0FuZE1ldHJpY3Nba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0eXBlb2YgZ3RhZyAhPT0gJ3VuZGVmaW5lZCcgJiYgZ3RhZykge1xuICAgICAgZ3RhZygnc2V0JywgdGhpcy5kaW1lbnNpb25zQW5kTWV0cmljcyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBldmVudFRyYWNrSW50ZXJuYWwoYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IGFueSA9IHt9KSB7XG4gICAgdGhpcy5jbGVhblByb3BlcnRpZXMocHJvcGVydGllcyk7XG4gICAgaWYgKHR5cGVvZiBndGFnICE9PSAndW5kZWZpbmVkJyAmJiBndGFnKSB7XG4gICAgICBndGFnKCdldmVudCcsIGFjdGlvbiwgcHJvcGVydGllcyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhblByb3BlcnRpZXMocHJvcGVydGllczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IHZvaWQge1xuICAgIC8vIEdBIHJlcXVpcmVzIHRoYXQgZXZlbnRWYWx1ZSBiZSBhbiBub24tbmVnYXRpdmUgaW50ZWdlciwgc2VlOlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9ndGFnanMvZXZlbnRzXG4gICAgaWYgKHByb3BlcnRpZXMudmFsdWUpIHtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50KHByb3BlcnRpZXMudmFsdWUsIDEwKTtcbiAgICAgIHByb3BlcnRpZXMudmFsdWUgPSBpc05hTihwYXJzZWQpID8gMCA6IHBhcnNlZDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==