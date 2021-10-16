import { Angulartics2 } from 'angulartics2';
export declare class Angulartics2Segment {
    private angulartics2;
    constructor(angulartics2: Angulartics2);
    startTracking(): void;
    /**
     * https://segment.com/docs/libraries/analytics.js/#page
     *
     * analytics.page([category], [name], [properties], [options], [callback]);
     */
    pageTrack(path: string): void;
    /**
     * https://segment.com/docs/libraries/analytics.js/#track
     *
     * analytics.track(event, [properties], [options], [callback]);
     */
    eventTrack(action: string, properties: any): void;
    /**
     * https://segment.com/docs/libraries/analytics.js/#identify
     *
     * analytics.identify([userId], [traits], [options], [callback]);
     */
    setUserProperties(properties: any): void;
    /**
     * https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#reset--logout
     *
     * analytics.reset();
     */
    unsetUserProperties(): void;
    /**
     * https://segment.com/docs/libraries/analytics.js/#alias
     *
     * analytics.alias(userId, previousId, options, callback);
     */
    setAlias(alias: any): void;
}
