import { DetailedError } from './utils';
export declare type ParseErrorFunction = (err: string | DetailedError | unknown, hash?: any) => void;
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
export declare const getDiagramFromText: (text: string) => Promise<Diagram>;
