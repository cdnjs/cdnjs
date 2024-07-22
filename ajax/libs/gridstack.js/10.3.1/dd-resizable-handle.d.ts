/**
 * dd-resizable-handle.ts 10.3.1
 * Copyright (c) 2021-2022 Alain Dumesny - see GridStack root license
 */
import { GridItemHTMLElement } from './gridstack';
export interface DDResizableHandleOpt {
    start?: (event: any) => void;
    move?: (event: any) => void;
    stop?: (event: any) => void;
}
export declare class DDResizableHandle {
    protected host: GridItemHTMLElement;
    protected dir: string;
    protected option: DDResizableHandleOpt;
    constructor(host: GridItemHTMLElement, dir: string, option: DDResizableHandleOpt);
    /** call this when resize handle needs to be removed and cleaned up */
    destroy(): DDResizableHandle;
}
