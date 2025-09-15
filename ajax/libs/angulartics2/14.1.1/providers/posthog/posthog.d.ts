import * as i0 from "@angular/core";
export declare class Angulartics2Posthog {
    private readonly angulartics2;
    constructor();
    startTracking(): void;
    startPageTracking(): void;
    startEventTracking(): void;
    pageTrack(path: string | undefined): void;
    eventTrack(action: string, properties?: any): void;
    setUsername(userId: string | {
        userId: string | number;
    }): void;
    setUserProperties(properties: any | undefined): void;
    setUserPropertiesOnce(properties: any | undefined): void;
    setSuperProperties(properties: any | undefined): void;
    setSuperPropertiesOnce(properties: any | undefined): void;
    setAlias(alias: string): void;
    setGroup(groupType: string, groupKey: string, properties: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<Angulartics2Posthog, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Angulartics2Posthog>;
}
