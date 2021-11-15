export interface Logger {
    error(...args: any[]): void;
    info(...args: any[]): void;
    debug(...args: any[]): void;
    warn(...args: any[]): void;
}
export declare class Log {
    static get NONE(): number;
    static get ERROR(): number;
    static get WARN(): number;
    static get INFO(): number;
    static get DEBUG(): number;
    static reset(): void;
    static get level(): number;
    static set level(value: number);
    static get logger(): Logger;
    static set logger(value: Logger);
    static debug(...args: any[]): void;
    static info(...args: any[]): void;
    static warn(...args: any[]): void;
    static error(...args: any[]): void;
}
