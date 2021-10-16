import { Angulartics2, GoogleGlobalSiteTagSettings } from 'angulartics2';
import { EventGst, UserTimingsGst } from './gst-interfaces';
export declare class GoogleGlobalSiteTagDefaults implements GoogleGlobalSiteTagSettings {
    trackingIds: string[];
    constructor();
}
export declare class Angulartics2GoogleGlobalSiteTag {
    protected angulartics2: Angulartics2;
    private dimensionsAndMetrics;
    constructor(angulartics2: Angulartics2);
    startTracking(): void;
    /**
     * Manually track page view, see:
     *
     * https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications#tracking_virtual_pageviews
     *
     * @param path relative url
     */
    pageTrack(path: string): void;
    /**
     * Send interactions to gtag, i.e. for event tracking in Google Analytics. See:
     *
     * https://developers.google.com/analytics/devguides/collection/gtagjs/events
     *
     * @param action associated with the event
     */
    eventTrack(action: string, properties?: Partial<EventGst>): void;
    /**
     * Exception Track Event in GST. See:
     *
     * https://developers.google.com/analytics/devguides/collection/gtagjs/exceptions
     *
     */
    exceptionTrack(properties: any): void;
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
    userTimings(properties: UserTimingsGst): void;
    private convertTimings;
    setUsername(userId: string | {
        userId: string | number;
    }): void;
    setUserProperties(properties: any): void;
    private setDimensionsAndMetrics;
    private eventTrackInternal;
    private cleanProperties;
}
