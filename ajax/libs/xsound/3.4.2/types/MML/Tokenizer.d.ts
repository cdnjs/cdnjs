import { Token } from '/src/MML/Token';
/**
 * This class is for MML Tokenization.
 * @constructor
 */
export declare class Tokenizer {
    static id: number;
    private tokens;
    private notes;
    private numbers;
    /**
     * @param {string} mml This argument is MML string.
     */
    constructor(mml: string);
    /**
     * This method executes tokenization from MML.
     * @return {Token|null} Return value is instance of `Token`.
     */
    get(): Token | null;
}
//# sourceMappingURL=Tokenizer.d.ts.map