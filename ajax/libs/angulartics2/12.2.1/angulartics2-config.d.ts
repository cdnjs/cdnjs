export interface GoogleAnalyticsSettings {
    /** array of additional account names (only works for analyticsjs) */
    additionalAccountNames: string[];
    userId: any;
    /** see https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#transport */
    transport: string;
    anonymizeIp: boolean;
}
export interface AppInsightsSettings {
    userId: string;
}
export interface GoogleTagManagerSettings {
    userId: any;
}
export interface GoogleGlobalSiteTagSettings {
    trackingIds: any;
    userId?: any;
    anonymizeIp?: boolean;
    customMap?: {
        [key: string]: string;
    };
}
export interface PageTrackingSettings {
    autoTrackVirtualPages: boolean;
    basePath: string;
    excludedRoutes: (string | RegExp)[];
    /** drop ids from url `/sections/123/pages/456` -> `/sections/pages` */
    clearIds: boolean;
    /** drop contents of url after hash marker `/callback#authcode=1234` -> `/callback` */
    clearHash: boolean;
    /** drop query params from url `/sections/123/pages?param=456&param2=789` -> `/sections/123/pages` */
    clearQueryParams: boolean;
    /** used with clearIds, define the matcher to clear url parts */
    idsRegExp: RegExp;
}
export interface Angulartics2Settings {
    pageTracking: Partial<PageTrackingSettings>;
    /** Disable page tracking */
    developerMode: boolean;
    ga: Partial<GoogleAnalyticsSettings>;
    appInsights: Partial<AppInsightsSettings>;
    gtm: Partial<GoogleTagManagerSettings>;
    gst: Partial<GoogleGlobalSiteTagSettings>;
}
export declare class DefaultConfig implements Angulartics2Settings {
    pageTracking: {
        autoTrackVirtualPages: boolean;
        basePath: string;
        excludedRoutes: any[];
        clearIds: boolean;
        clearHash: boolean;
        clearQueryParams: boolean;
        idsRegExp: RegExp;
    };
    developerMode: boolean;
    ga: {};
    appInsights: {};
    gtm: {};
    gst: {};
}
