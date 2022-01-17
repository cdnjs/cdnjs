import { Angulartics2 } from '../../angulartics2-core';
import * as i0 from "@angular/core";
export declare class Angulartics2Splunk {
    private angulartics2;
    constructor(angulartics2: Angulartics2);
    startTracking(): void;
    pageTrack(path: string): void;
    eventTrack(action: string, properties: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Angulartics2Splunk, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Angulartics2Splunk>;
}
