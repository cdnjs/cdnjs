export function sanitizeText(text: any): string;
export function clear(): void;
export function getMindmap(): any;
export function addNode(level: any, id: any, descr: any, type: any): void;
export namespace nodeType {
    const DEFAULT: number;
    const NO_BORDER: number;
    const ROUNDED_RECT: number;
    const RECT: number;
    const CIRCLE: number;
    const CLOUD: number;
    const BANG: number;
    const HEXAGON: number;
}
export function getType(startStr: any, endStr: any): number;
export function setElementForId(id: any, element: any): void;
export function decorateNode(decoration: any): void;
export function type2Str(type: any): "circle" | "rect" | "no-border" | "rounded-rect" | "cloud" | "bang" | "hexgon";
export let parseError: any;
export function setErrorHandler(handler: any): void;
export function getLogger(): Record<import("../../logger").LogLevel, {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}>;
export function getNodeById(id: any): any;
export function getElementById(id: any): any;
