export declare function getAbsoluteUrl(url: string): string;
export declare function isVideo(element: Element): boolean;
export declare function isAudio(element: Element): boolean;
export declare function loadScript(url: string): Promise<void>;
export declare function offset(el: HTMLElement): {
    left: number;
    top: number;
};
export declare function sanitize(html: string, plainText?: boolean): string;
export declare function isXml(input: string): boolean;
export declare function isJson(item: unknown): boolean;
export declare function addEvent(event: string, details?: CustomEventInit): CustomEvent;
