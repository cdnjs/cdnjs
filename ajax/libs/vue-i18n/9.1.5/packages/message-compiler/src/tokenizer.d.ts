import { SourceLocation, Position } from './location';
import { TokenizeOptions } from './options';
export declare const enum TokenTypes {
    Text = 0,
    Pipe = 1,
    BraceLeft = 2,
    BraceRight = 3,
    Modulo = 4,
    Named = 5,
    List = 6,
    Literal = 7,
    LinkedAlias = 8,
    LinkedDot = 9,
    LinkedDelimiter = 10,
    LinkedKey = 11,
    LinkedModifier = 12,
    InvalidPlace = 13,
    EOF = 14
}
export declare const ERROR_DOMAIN = "tokenizer";
export interface Token {
    type: TokenTypes;
    value?: string;
    loc?: SourceLocation;
}
export interface TokenizeContext {
    currentType: TokenTypes;
    offset: number;
    startLoc: Position;
    endLoc: Position;
    lastType: TokenTypes;
    lastOffset: number;
    lastStartLoc: Position;
    lastEndLoc: Position;
    braceNest: number;
    inLinked: boolean;
    text: string;
}
export interface Tokenizer {
    currentPosition(): Position;
    currentOffset(): number;
    context(): TokenizeContext;
    nextToken(): Token;
}
export declare function createTokenizer(source: string, options?: TokenizeOptions): Tokenizer;
export declare function parse(source: string, options?: TokenizeOptions): Token[];
//# sourceMappingURL=tokenizer.d.ts.map