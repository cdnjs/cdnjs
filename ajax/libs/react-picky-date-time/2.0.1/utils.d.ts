export declare const cx: (...params: Array<any>) => string;
export declare const isValidDate: (str: string) => boolean;
export declare const isValidDates: (arr: Array<string>) => boolean;
export declare const useWillUnmount: (f: Function) => void;
export declare const usePrevious: (value: any) => undefined;
export declare const formatClockNumber: (value: number) => string;
export declare const isValidTime: (value: string) => {
    hour?: undefined;
    minute?: undefined;
    second?: undefined;
    meridiem?: undefined;
    hourText?: undefined;
} | {
    hour: string;
    minute: string;
    second: string;
    meridiem: string;
    hourText: string;
};
export declare const animationInterval: (ms: number, signal: any, callback: Function) => void;
