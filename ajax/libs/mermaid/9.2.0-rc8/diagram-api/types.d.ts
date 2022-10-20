import { MermaidConfig } from '../config.type';
export interface InjectUtils {
    _log: any;
    _setLogLevel: any;
    _getConfig: any;
    _sanitizeText: any;
    _setupGraphViewbox: any;
}
export interface DiagramDefinition {
    db: any;
    renderer: any;
    parser: any;
    styles: any;
    init?: (config: MermaidConfig) => void;
    injectUtils?: (utils: InjectUtils) => void;
}
export interface DetectorRecord {
    detector: DiagramDetector;
    loader?: DiagramLoader;
}
export declare type DiagramDetector = (text: string, config?: MermaidConfig) => boolean;
export declare type DiagramLoader = (() => Promise<{
    id: string;
    diagram: DiagramDefinition;
}>) | null;
