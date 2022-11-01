export declare class Diagram {
    txt: string;
    type: string;
    parser: any;
    renderer: any;
    db: any;
    private detectTypeFailed;
    constructor(txt: string, parseError?: Function);
    parse(text: string, parseError?: Function): boolean;
    handleError(error: unknown, parseError?: Function): void;
    getParser(): any;
    getType(): string;
}
export declare const getDiagramFromText: (txt: string, parseError?: Function) => Diagram | Promise<Diagram>;
export default Diagram;
