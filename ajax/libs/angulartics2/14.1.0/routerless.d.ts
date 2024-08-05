import { Observable } from 'rxjs';
import { Angulartics2Settings } from './angulartics2-config';
export interface TrackNavigationEnd {
    url: string;
}
export declare class RouterlessTracking {
    trackLocation(settings: Angulartics2Settings): Observable<TrackNavigationEnd>;
    prepareExternalUrl(url: string): string;
}
