export function sanitizeText(text: any): string;
export function clear(): void;
export function getMindmap(): any;
export function addNode(level: any, id: any, descr: any, type: any): void;
export namespace nodeType {
    let DEFAULT: number;
    let NO_BORDER: number;
    let ROUNDED_RECT: number;
    let RECT: number;
    let CIRCLE: number;
    let CLOUD: number;
    let BANG: number;
    let HEXAGON: number;
}
export function getType(startStr: any, endStr: any): number;
export function setElementForId(id: any, element: any): void;
export function decorateNode(decoration: any): void;
export function type2Str(type: any): "circle" | "rect" | "no-border" | "rounded-rect" | "cloud" | "bang" | "hexgon";
export let parseError: any;
export function setErrorHandler(handler: any): void;
export function getLogger(): Record<import("../../logger.js").LogLevel, {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}>;
export function getNodeById(id: any): any;
export function getElementById(id: any): any;
