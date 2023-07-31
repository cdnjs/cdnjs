import type { AbbreviationNode, Field, Value, AbbreviationAttribute } from '@emmetio/abbreviation';
import type { WalkState } from './walk.js';
import type { Config } from '../../config.js';
export declare const caret: Field[];
/**
 * Check if given node is a snippet: a node without name and attributes
 */
export declare function isSnippet(node?: AbbreviationNode): boolean;
/**
 * Check if given node is inline-level element, e.g. element with explicitly
 * defined node name
 */
export declare function isInlineElement(node: AbbreviationNode | undefined, config: Config): boolean;
/**
 * Check if given value token is a field
 */
export declare function isField(token: Value): token is Field;
export declare function pushTokens(tokens: Value[], state: WalkState): void;
/**
 * Splits given value token by lines: returns array where each entry is a token list
 * for a single line
 */
export declare function splitByLines(tokens: Value[]): Value[][];
/**
 * Check if given attribute should be outputted
 */
export declare function shouldOutputAttribute(attr: AbbreviationAttribute): boolean;
