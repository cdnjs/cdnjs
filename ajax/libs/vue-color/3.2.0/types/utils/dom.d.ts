export declare const getPageXYFromEvent: (e: MouseEvent | TouchEvent) => {
    x: number;
    y: number;
};
export declare const getScrollXY: () => {
    x: number;
    y: number;
};
/** get the position of the container relative to the document’s edge, regardless of any scrolling that has occurred */
export declare const getAbsolutePosition: (container: HTMLElement) => {
    x: number;
    y: number;
};
export declare const resolveArrowDirection: (e: KeyboardEvent) => "up" | "down" | "left" | "right" | null;
