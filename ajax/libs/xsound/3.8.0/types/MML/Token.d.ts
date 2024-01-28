export type TokenType = 'TEMPO' | 'OCTAVE' | 'NOTE' | 'REST' | 'NUMBER' | 'TIE' | 'SPACE' | 'EOS' | 'UNKNOWN';
/**
 * MML characters are corresponds to tokens by this map.
 * Namely, this map is definitions of MML Tokens.
 */
export declare const TokenMap: Map<string | undefined, TokenType>;
/**
 * This class is entity for MML token.
 * This class has token type, token data and token value if token is number.
 * @constructor
 */
export declare class Token {
    private _id;
    private _type;
    private _token;
    private _value;
    /**
     * @param {string} id This argument is string that identifies MML token.
     * @param {TokenType} type This argument is one of 'TEMPO', 'OCTAVE', 'NOTE', 'REST', 'NUMBER', 'TIE', 'SPACE', 'EOS', 'UNKNOWN'.
     * @param {string|undefined} token This argument is string that constructs of token.
     */
    constructor(id: string, type: TokenType, token: string | undefined);
    /**
     * This method is getter for token type.
     */
    get type(): TokenType;
    /**
     * This method is getter for token.
     */
    get token(): string | undefined;
    /**
     * This method is getter for token value if token is number.
     */
    get value(): number;
    /**
     * This method returns fields that `Token` has as JSON.
     */
    toString(): string;
}
//# sourceMappingURL=Token.d.ts.map