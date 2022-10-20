import { DiagramDefinition, DiagramDetector } from './types';
export declare const log: Record<import("../logger").LogLevel, {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}>;
export declare const setLogLevel: (level?: string | number) => void;
export declare const getConfig: () => import("../config.type").MermaidConfig;
export declare const sanitizeText: (text: string) => string;
export declare const setupGraphViewbox: (graph: any, svgElem: any, padding: any, useMaxWidth: any) => void;
export interface Detectors {
    [key: string]: DiagramDetector;
}
export declare const registerDiagram: (id: string, diagram: DiagramDefinition, detector?: DiagramDetector, callback?: ((_log: any, _setLogLevel: any, _getConfig: any, _sanitizeText: any, _setupGraphViewbox: any) => void) | undefined) => void;
export declare const getDiagram: (name: string) => DiagramDefinition;
export declare class DiagramNotFoundError extends Error {
    constructor(message: string);
}
