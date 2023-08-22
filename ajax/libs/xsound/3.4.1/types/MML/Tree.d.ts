import { Token } from '/src/MML/Token';
/**
 * This class is entity for MML syntax tree.
 * @constructor
 */
export declare class Tree {
    private static indent;
    private _id;
    private _operator;
    private _left;
    private _right;
    /**
     * @param {string} id This argument is string that identifies syntax tree node.
     * @param {Token} operator This argument is instance of `Token` as syntax tree node.
     * @param {Tree} left This argument is instance of `Tree` as left subtree.
     * @param {Tree} right This argument is instance of `Tree` as right subtree.
     */
    constructor(id: string, operator: Token, left: Tree | null, right: Tree | null);
    /**
     * This method concatenates subtree as right subtree.
     * @param {Tree} operator This argument is instance of `Tree` as syntax tree node.
     */
    concat(node: Tree): void;
    /**
     * This method is getter for operator.
     */
    get operator(): Token;
    /**
     * This method is getter for left subtree.
     */
    get left(): Tree | null;
    /**
     * This method is getter for right subtree.
     */
    get right(): Tree | null;
    /**
     * This method clears indent.
     */
    clear(): void;
    /**
     * This method represents tree status as string.
     */
    toString(): string;
}
/**
 * This class is error class for MML syntax error.
 * @constructor
 */
export declare class MMLSyntaxError {
    private _token;
    /**
     * @param {Token} token This argument is instance of `Token` that error occurs in.
     */
    constructor(token: Token);
    /**
     * This method is getter for instance of `Token`.
     */
    get token(): Token;
}
//# sourceMappingURL=Tree.d.ts.map