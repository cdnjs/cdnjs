import { Angulartics2 } from 'angulartics2';
export declare class Angulartics2Facebook {
    private angulartics2;
    constructor(angulartics2: Angulartics2);
    startTracking(): void;
    /**
     * Send interactions to the Pixel, i.e. for event tracking in Pixel
     *
     * @param action action associated with the event
     */
    eventTrack(action: string, properties?: any): void;
}
