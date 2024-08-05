import { Angulartics2 } from '../../angulartics2-core';
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDeclaration<Angulartics2IBMDigitalAnalytics, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Angulartics2IBMDigitalAnalytics>;
}
