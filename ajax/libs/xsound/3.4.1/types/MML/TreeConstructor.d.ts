import { Tokenizer } from '/src/MML/Tokenizer';
import { Tree, MMLSyntaxError } from '/src/MML/Tree';
/**
 * This class is Tree Construction (syntax tree) for MML (Music Macro Language).
 * @constructor
 */
export declare class TreeConstructor {
    static id: number;
    private tokenizer;
    private syntaxTree;
    /**
     * @param {Tokenizer} tokenizer This argument is instance of `Tokenizer`.
     */
    constructor(tokenizer: Tokenizer);
    /**
     * This method executes tree construction (parsing) from tokens.
     * @return {Array<Tree>|MMLSyntaxError} Return value is syntax tree.
     */
    parse(): Tree[] | MMLSyntaxError;
    /**
     * This method releases memory that stack has.
     */
    free(): void;
}
//# sourceMappingURL=TreeConstructor.d.ts.map