import { Angulartics2 } from '../../angulartics2-core';
import * as i0 from "@angular/core";
export declare class Angulartics2Mixpanel {
    private angulartics2;
    constructor(angulartics2: Angulartics2);
    startTracking(): void;
    pageTrack(path: string): void;
    eventTrack(action: string, properties: any): void;
    setUsername(userId: string): void;
    setUserProperties(properties: any): void;
    setUserPropertiesOnce(properties: any): void;
    setSuperProperties(properties: any): void;
    setSuperPropertiesOnce(properties: any): void;
    setAlias(alias: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Angulartics2Mixpanel, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Angulartics2Mixpanel>;
}
