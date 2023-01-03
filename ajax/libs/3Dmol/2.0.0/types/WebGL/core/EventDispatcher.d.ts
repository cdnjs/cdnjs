export declare class EventDispatcher {
    listeners: Record<string, ((event: any) => void)[]>;
    dispatchEvent(event: any): void;
    removeEventListener(type: string, listener?: (event: any) => void): void;
    addEventListener(type: string, listener: (event: any) => void): void;
}
