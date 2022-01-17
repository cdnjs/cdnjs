import { Angulartics2 } from '../../angulartics2-core';
import { GoogleAnalyticsSettings } from '../../angulartics2-config';
import { UserTimings } from '../../angulartics2-interfaces';
import * as i0 from "@angular/core";
export declare class GoogleAnalyticsDefaults implements GoogleAnalyticsSettings {
    additionalAccountNames: any[];
    userId: any;
    transport: string;
    anonymizeIp: boolean;
}
export declare class Angulartics2GoogleAnalytics {
    private angulartics2;
    dimensionsAndMetrics: any[];
    settings: Partial<GoogleAnalyticsSettings>;
    constructor(angulartics2: Angulartics2);
    startTracking(): void;
    pageTrack(path: string): void;
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
    eventTrack(action: string, properties: any): void;
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
    exceptionTrack(properties: any): void;
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
    userTimings(properties: UserTimings): void;
    setUsername(userId: string): void;
    setUserProperties(properties: any): void;
    private setDimensionsAndMetrics;
    static ɵfac: i0.ɵɵFactoryDeclaration<Angulartics2GoogleAnalytics, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Angulartics2GoogleAnalytics>;
}
