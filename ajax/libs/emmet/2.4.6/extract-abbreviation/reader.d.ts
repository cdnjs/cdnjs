type Match = ((code: number) => boolean) | number;
export interface BackwardScanner {
    /** Text to scan */
    text: string;
    /** Left bound till given text must be scanned */
    start: number;
    /** Current scanner position */
    pos: number;
}
/**
 * Creates structure for scanning given string in backward direction
 */
export default function backwardScanner(text: string, start?: number): BackwardScanner;
/**
 * Check if given scanner position is at start of scanned text
 */
export declare function sol(scanner: BackwardScanner): boolean;
/**
 * “Peeks” character code an current scanner location without advancing it
 */
export declare function peek(scanner: BackwardScanner, offset?: number): number;
/**
 * Returns current character code and moves character location one symbol back
 */
export declare function previous(scanner: BackwardScanner): number | undefined;
/**
 * Consumes current character code if it matches given `match` code or function
 */
export declare function consume(scanner: BackwardScanner, match: Match): boolean;
export declare function consumeWhile(scanner: BackwardScanner, match: Match): boolean;
export {};
