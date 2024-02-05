export interface EventTrack {
    action: string;
    properties: any;
}
export interface PageTrack {
    path: string;
}
/** @link https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings */
export interface UserTimings {
    /** A string for categorizing all user timing variables into logical groups (e.g. 'JS Dependencies'). */
    timingCategory: string;
    /** A string to identify the variable being recorded (e.g. 'load'). */
    timingVar: string;
    /** The number of milliseconds in elapsed time to report to Google Analytics (e.g. 20). */
    timingValue: number;
    /** A string that can be used to add flexibility in visualizing user timings in the reports (e.g. 'Google CDN'). */
    timingLabel?: string;
}
