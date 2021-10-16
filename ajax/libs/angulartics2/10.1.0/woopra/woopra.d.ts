import { Angulartics2 } from 'angulartics2';
export declare class Angulartics2Woopra {
    private angulartics2;
    constructor(angulartics2: Angulartics2);
    startTracking(): void;
    pageTrack(path: string): void;
    eventTrack(action: string, properties: any): void;
    setUserProperties(properties: any): void;
}
