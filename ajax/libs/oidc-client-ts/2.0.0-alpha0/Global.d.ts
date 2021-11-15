export declare class Global {
    static get location(): Location;
    static get localStorage(): Storage;
    static get sessionStorage(): Storage;
    static get XMLHttpRequest(): typeof XMLHttpRequest;
    static get timer(): {
        setInterval: (cb: (...args: any[]) => void, duration?: number | undefined) => number;
        clearInterval: (handle: number) => void;
    };
}
