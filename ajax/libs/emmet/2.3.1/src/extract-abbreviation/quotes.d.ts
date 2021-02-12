import { BackwardScanner } from './reader';
/**
 * Check if given character code is a quote
 */
export declare function isQuote(c?: number): boolean;
/**
 * Consumes quoted value, if possible
 * @return Returns `true` is value was consumed
 */
export declare function consumeQuoted(scanner: BackwardScanner): boolean;
