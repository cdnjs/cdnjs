export declare class Diagram {
    txt: string;
    type: string;
    parser: any;
    renderer: any;
    db: any;
    constructor(txt: string, parseError?: Function);
    parse(text: string, parseError?: Function): boolean;
    getParser(): any;
    getType(): string;
}
export default Diagram;
