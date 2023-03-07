import { DetailedError } from './utils';
export declare type ParseErrorFunction = (err: string | DetailedError | unknown, hash?: any) => void;
/**
 * An object representing a parsed mermaid diagram definition.
 * @privateRemarks This is exported as part of the public mermaidAPI.
 */
export declare class Diagram {
    text: string;
    type: string;
    parser: any;
    renderer: any;
    db: import("./diagram-api/types").DiagramDb;
    private detectError?;
    constructor(text: string);
    parse(): void;
    render(id: string, version: string): Promise<void>;
    getParser(): any;
    getType(): string;
}
/**
 * Parse the text asynchronously and generate a Diagram object asynchronously.
 * **Warning:** This function may be changed in the future.
 * @alpha
 * @param text - The mermaid diagram definition.
 * @returns A the Promise of a Diagram object.
 * @throws {@link UnknownDiagramError} if the diagram type can not be found.
 * @privateRemarks This is exported as part of the public mermaidAPI.
 */
export declare const getDiagramFromText: (text: string) => Promise<Diagram>;
