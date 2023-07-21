/**
 * dd-resizable-handle.ts 8.4.0
 * Copyright (c) 2021-2022 Alain Dumesny - see GridStack root license
 */
export interface DDResizableHandleOpt {
    start?: (event: any) => void;
    move?: (event: any) => void;
    stop?: (event: any) => void;
}
export declare class DDResizableHandle {
    constructor(host: HTMLElement, direction: string, option: DDResizableHandleOpt);
    /** call this when resize handle needs to be removed and cleaned up */
    destroy(): DDResizableHandle;
}
