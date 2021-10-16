import { InjectionToken } from '@angular/core';
import { Angulartics2Settings } from './angulartics2-config';
export interface Angulartics2Token {
    settings: Partial<Angulartics2Settings>;
}
export declare const ANGULARTICS2_TOKEN: InjectionToken<Angulartics2Token>;
