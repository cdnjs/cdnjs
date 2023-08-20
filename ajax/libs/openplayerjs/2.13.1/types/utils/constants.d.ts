declare global {
    interface Window {
        MSStream: any;
        WebKitMediaSource: any;
        WebKitSourceBuffer: any;
    }
    interface NavigatorExtended extends Navigator {
        connection: NetworkInformation & {
            effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
        };
        mozConnection?: NetworkInformation & {
            effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
        };
        webkitConnection?: NetworkInformation & {
            effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
        };
    }
}
export declare const NAV: NavigatorExtended | null;
export declare const UA: string | null;
export declare const IS_IPAD: boolean;
export declare const IS_IPHONE: boolean;
export declare const IS_IPOD: boolean;
export declare const IS_IOS: boolean;
export declare const IS_ANDROID: boolean;
export declare const IS_EDGE: boolean;
export declare const IS_CHROME: boolean;
export declare const IS_FIREFOX: boolean;
export declare const IS_SAFARI: boolean;
export declare const IS_STOCK_ANDROID: boolean;
export declare const HAS_MSE: boolean;
export declare const SUPPORTS_HLS: () => boolean;
export declare const DVR_THRESHOLD = 120;
export declare const EVENT_OPTIONS: {
    passive: boolean;
};
