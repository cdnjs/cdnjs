import { DiagramDetector as _DiagramDetector } from './detectType';
import { MermaidConfig } from '../config.type';
export declare const log: Record<import("../logger").LogLevel, {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}>;
export declare const setLogLevel: (level?: string | number) => void;
export declare type DiagramDetector = _DiagramDetector;
export declare const getConfig: () => MermaidConfig;
export declare const sanitizeText: (text: string) => string;
export declare const setupGraphViewbox: (graph: any, svgElem: any, padding: any, useMaxWidth: any) => void;
export interface DiagramDefinition {
    db: any;
    renderer: any;
    parser: any;
    styles: any;
    init?: (config: MermaidConfig) => void;
}
export declare const registerDiagram: (id: string, diagram: DiagramDefinition, detector: DiagramDetector) => void;
export declare const getDiagram: (name: string) => DiagramDefinition;
