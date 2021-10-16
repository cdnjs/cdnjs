import { Angulartics2 } from 'angulartics2';
export declare class Angulartics2IBMDigitalAnalytics {
    private angulartics2;
    constructor(angulartics2: Angulartics2);
    startTracking(): void;
    /**
     * Track Page in IBM Digital Analytics
     *
     * @param path location
     *
     * @link https://www.ibm.com/support/knowledgecenter/SSPG9M/Implementation/impl_pageviewtag.html
     */
    pageTrack(path: string): void;
    /**
     * Track an event in IBM Digital Analytics
     *
     * @param action A string corresponding to the type of event that needs to be tracked.
     * @param properties The properties that need to be logged with the event.
     */
    eventTrack(action: string, properties?: any): void;
}
