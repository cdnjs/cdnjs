import { Angulartics2 } from '../../angulartics2-core';
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDeclaration<Angulartics2LaunchByAdobe, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Angulartics2LaunchByAdobe>;
}
