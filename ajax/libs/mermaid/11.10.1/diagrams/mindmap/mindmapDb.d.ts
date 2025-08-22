import type { D3Element } from '../../types.js';
import type { MindmapNode } from './mindmapTypes.js';
declare const nodeType: {
    readonly DEFAULT: 0;
    readonly NO_BORDER: 0;
    readonly ROUNDED_RECT: 1;
    readonly RECT: 2;
    readonly CIRCLE: 3;
    readonly CLOUD: 4;
    readonly BANG: 5;
    readonly HEXAGON: 6;
};
export declare class MindmapDB {
    private nodes;
    private count;
    private elements;
    readonly nodeType: typeof nodeType;
    constructor();
    clear(): void;
    getParent(level: number): MindmapNode | null;
    getMindmap(): MindmapNode | null;
    addNode(level: number, id: string, descr: string, type: number): void;
    getType(startStr: string, endStr: string): 0 | 2 | 1 | 3 | 4 | 5 | 6;
    setElementForId(id: number, element: D3Element): void;
    getElementById(id: number): any;
    decorateNode(decoration?: {
        class?: string;
        icon?: string;
    }): void;
    type2Str(type: number): string;
    getLogger(): Record<import("../../logger.js").LogLevel, {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    }>;
}
export {};
