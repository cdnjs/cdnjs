import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Angulartics2, AppInsightsSettings } from 'angulartics2';
export declare class AppInsightsDefaults implements AppInsightsSettings {
    userId: any;
}
export declare class Angulartics2AppInsights {
    private angulartics2;
    private title;
    private router;
    loadStartTime: number;
    loadTime: number;
    metrics: {
        [name: string]: number;
    };
    dimensions: {
        [name: string]: string;
    };
    measurements: {
        [name: string]: number;
    };
    constructor(angulartics2: Angulartics2, title: Title, router: Router);
    startTracking(): void;
    startTimer(): void;
    stopTimer(): void;
    /**
     * Page Track in Baidu Analytics
     *
     * @param path - Location 'path'
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackpageview
     */
    pageTrack(path: string): void;
    /**
     * Log a user action or other occurrence.
     *
     * @param name Name to identify this event in the portal.
     * @param properties Additional data used to filter events and metrics in the portal. Defaults to empty.
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackevent
     */
    eventTrack(name: string, properties: {
        [name: string]: string;
    }): void;
    /**
     * Exception Track Event in GA
     *
     * @param properties - Comprised of the mandatory fields 'appId' (string), 'appName' (string) and 'appVersion' (string) and
     * optional fields 'fatal' (boolean) and 'description' (string), error
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackexception
     */
    exceptionTrack(properties: any): void;
    /**
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#setauthenticatedusercontext
     */
    setUsername(userId: string): void;
    setUserProperties(properties: Partial<{
        userId: string;
        accountId: string;
    }>): void;
}
