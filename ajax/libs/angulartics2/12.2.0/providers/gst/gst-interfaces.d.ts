/** @link https://developers.google.com/analytics/devguides/collection/gtagjs/user-timings */
export interface UserTimingsGst {
    /** A string to identify the variable being recorded (e.g. 'load'). */
    name: string;
    /** The number of milliseconds in elapsed time to report to Google Analytics (e.g. 20). */
    value: number;
    /** A string for categorizing all user timing variables into logical groups (e.g. 'JS Dependencies'). */
    category?: string;
    /** A string that can be used to add flexibility in visualizing user timings in the reports (e.g. 'Google CDN'). */
    label?: string;
}
export interface EventGst {
    category: string;
    label?: string;
    value?: number | string;
    noninteraction?: boolean;
    gstCustom?: any;
}
