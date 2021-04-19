export interface Scanner {
    index(): number;
    line(): number;
    column(): number;
    peekOffset(): number;
    charAt(offset: number): string;
    currentChar(): string;
    currentPeek(): string;
    next(): string;
    peek(): string;
    reset(): void;
    resetPeek(offset?: number): void;
    skipToPeek(): void;
}
export declare const CHAR_SP = " ";
export declare const CHAR_CR = "\r";
export declare const CHAR_LF = "\n";
export declare const CHAR_LS: string;
export declare const CHAR_PS: string;
export declare function createScanner(str: string): Scanner;
//# sourceMappingURL=scanner.d.ts.map