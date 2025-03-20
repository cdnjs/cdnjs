import type { DetailedError } from './utils.js';
import type { DiagramDefinition, DiagramMetadata } from './diagram-api/types.js';
export type ParseErrorFunction = (err: string | DetailedError | unknown, hash?: any) => void;
/**
 * An object representing a parsed mermaid diagram definition.
 * @privateRemarks This is exported as part of the public mermaidAPI.
 */
export declare class Diagram {
    text: string;
    metadata: Pick<DiagramMetadata, 'title'>;
    type: string;
    parser: DiagramDefinition['parser'];
    renderer: DiagramDefinition['renderer'];
    db: DiagramDefinition['db'];
    private init?;
    private detectError?;
    constructor(text: string, metadata?: Pick<DiagramMetadata, 'title'>);
    parse(): void;
    render(id: string, version: string): Promise<void>;
    getParser(): import("./diagram-api/types.js").ParserDefinition;
    getType(): string;
}
/**
 * Parse the text asynchronously and generate a Diagram object asynchronously.
 * **Warning:** This function may be changed in the future.
 * @alpha
 * @param text - The mermaid diagram definition.
 * @param metadata - Diagram metadata, defined in YAML.
 * @returns A the Promise of a Diagram object.
 * @throws {@link UnknownDiagramError} if the diagram type can not be found.
 * @privateRemarks This is exported as part of the public mermaidAPI.
 */
export declare const getDiagramFromText: (text: string, metadata?: Pick<DiagramMetadata, 'title'>) => Promise<Diagram>;
