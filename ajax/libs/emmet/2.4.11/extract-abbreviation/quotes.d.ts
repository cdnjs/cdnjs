import { BackwardScanner } from './reader.js';
declare const enum Chars {
    SingleQuote = 39,
    DoubleQuote = 34,
    Escape = 92
}
/**
 * Check if given character code is a quote
 */
export declare function isQuote(c?: number): c is Chars.SingleQuote | Chars.DoubleQuote;
/**
 * Consumes quoted value, if possible
 * @return Returns `true` is value was consumed
 */
export declare function consumeQuoted(scanner: BackwardScanner): boolean;
export {};
