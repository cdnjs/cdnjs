import { Angulartics2 } from 'angulartics2';
export declare class Angulartics2LaunchByAdobe {
    protected angulartics2: Angulartics2;
    payload: any;
    constructor(angulartics2: Angulartics2);
    setUsername(userId: string | boolean): void;
    setUserProperties(properties: any): void;
    startTracking(): void;
    pageTrack(path: string): void;
    /**
     * @param action associated with the event
     * @param properties associated with the event
     */
    eventTrack(action: string, properties: any): void;
}
