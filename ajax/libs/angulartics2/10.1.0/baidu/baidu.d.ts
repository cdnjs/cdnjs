import { Angulartics2 } from 'angulartics2';
export declare class Angulartics2BaiduAnalytics {
    private angulartics2;
    constructor(angulartics2: Angulartics2);
    startTracking(): void;
    /**
     * Page Track in Baidu Analytics
     *
     * @param path Required url 'path'
     *
     * @link http://tongji.baidu.com/open/api/more?p=ref_trackPageview
     */
    pageTrack(path: string): void;
    /**
     * Track Event in Baidu Analytics
     *
     * @param action Name associated with the event
     * @param properties Comprised of:
     *  - 'category' (string)
     *  - 'opt_label' (string)
     *  - 'opt_value' (string)
     *
     * @link http://tongji.baidu.com/open/api/more?p=ref_trackEvent
     */
    eventTrack(action: string, properties: any): void;
    setUsername(userId: string): void;
    setUserProperties(properties: any): void;
}
