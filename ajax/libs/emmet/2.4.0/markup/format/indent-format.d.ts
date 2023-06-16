import type { AbbreviationNode, AbbreviationAttribute, Abbreviation } from '@emmetio/abbreviation';
import { WalkState, type WalkNext } from './walk.js';
import type { Config } from '../../config.js';
/**
 * @description Utility methods for working with indent-based markup languages
 * like HAML, Slim, Pug etc.
 */
interface AttributesCollection {
    /** Primary element attributes: `id` and `class` */
    primary: AbbreviationAttribute[];
    /** Secondary element attributes: everything except `id` and `class` */
    secondary: AbbreviationAttribute[];
}
export interface IndentWalkState extends WalkState {
    options: FormatOptions;
}
export interface FormatOptions {
    /** String to output before tag name */
    beforeName?: string;
    /** String to output after tag name */
    afterName?: string;
    /** String to output before secondary attribute set */
    beforeAttribute?: string;
    /** String to output after secondary attribute set */
    afterAttribute?: string;
    /** String to put between secondary attributes */
    glueAttribute?: string;
    /** Value for boolean attributes */
    booleanValue?: string;
    /** String to put before content line (if value is multiline) */
    beforeTextLine?: string;
    /** String to put after content line (if value is multiline) */
    afterTextLine?: string;
    /** String to put after self-closing elements like `br`. Mostly a `/` character */
    selfClose?: string;
}
export default function indentFormat(abbr: Abbreviation, config: Config, options?: Partial<FormatOptions>): string;
/**
 * Outputs `node` content to output stream of `state`
 * @param node Context node
 * @param index Index of `node` in `items`
 * @param items List of `node`’s siblings
 * @param state Current walk state
 */
export declare function element(node: AbbreviationNode, index: number, items: AbbreviationNode[], state: IndentWalkState, next: WalkNext): void;
/**
 * From given node, collects all attributes as `primary` (id, class) and
 * `secondary` (all the rest) lists. In most indent-based syntaxes, primary attribute
 * has special syntax
 */
export declare function collectAttributes(node: AbbreviationNode): AttributesCollection;
/**
 * Outputs given attributes as primary into output stream
 */
export declare function pushPrimaryAttributes(attrs: AbbreviationAttribute[], state: WalkState): void;
/**
 * Outputs given attributes as secondary into output stream
 */
export declare function pushSecondaryAttributes(attrs: AbbreviationAttribute[], state: IndentWalkState): void;
/**
 * Outputs given node value into state output stream
 */
export declare function pushValue(node: AbbreviationNode, state: IndentWalkState): void;
export {};
