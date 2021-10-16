import { Angulartics2, GoogleTagManagerSettings } from 'angulartics2';
export declare class GoogleTagManagerDefaults implements GoogleTagManagerSettings {
    userId: any;
}
export declare class Angulartics2GoogleTagManager {
    protected angulartics2: Angulartics2;
    constructor(angulartics2: Angulartics2);
    startTracking(): void;
    pageTrack(path: string): void;
    /**
     * Send Data Layer
     *
     * @layer data layer object
     */
    pushLayer(layer: any): void;
    /**
     * Send interactions to the dataLayer, i.e. for event tracking in Google Analytics
     *
     * @param action associated with the event
     */
    eventTrack(action: string, properties: any): void;
    /**
     * Exception Track Event in GTM
     *
     */
    exceptionTrack(properties: any): void;
    /**
     * Set userId for use with Universal Analytics User ID feature
     *
     * @param userId used to identify user cross-device in Google Analytics
     */
    setUsername(userId: string): void;
}
