import { MonoTypeOperatorFunction, ReplaySubject } from 'rxjs';
import { Angulartics2Settings } from './angulartics2-config';
import { EventTrack, PageTrack, UserTimings } from './angulartics2-interfaces';
import { Angulartics2Token } from './angulartics2-token';
import { RouterlessTracking } from './routerless';
export declare class Angulartics2 {
    private tracker;
    settings: Angulartics2Settings;
    pageTrack: ReplaySubject<Partial<PageTrack>>;
    eventTrack: ReplaySubject<Partial<EventTrack>>;
    exceptionTrack: ReplaySubject<any>;
    setAlias: ReplaySubject<string>;
    setUsername: ReplaySubject<string | {
        userId: string | number;
    }>;
    setUserProperties: ReplaySubject<any>;
    setUserPropertiesOnce: ReplaySubject<any>;
    setSuperProperties: ReplaySubject<any>;
    setSuperPropertiesOnce: ReplaySubject<any>;
    userTimings: ReplaySubject<UserTimings>;
    constructor(tracker: RouterlessTracking, setup: Angulartics2Token);
    /** filters all events when developer mode is true */
    filterDeveloperMode<T>(): MonoTypeOperatorFunction<T>;
    protected trackUrlChange(url: string): void;
    /**
     * Use string literals or regular expressions to exclude routes
     * from automatic pageview tracking.
     *
     * @param url location
     */
    protected matchesExcludedRoute(url: string): boolean;
    /**
     * Removes id's from tracked route.
     *  EX: `/project/12981/feature` becomes `/project/feature`
     *
     * @param url current page path
     */
    protected clearUrl(url: string): string;
}
