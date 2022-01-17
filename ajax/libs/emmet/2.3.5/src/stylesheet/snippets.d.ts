import { CSSValue, FunctionCall, Literal } from '@emmetio/css-abbreviation';
export declare type CSSSnippet = CSSSnippetRaw | CSSSnippetProperty;
interface KeywordMap {
    [name: string]: FunctionCall | Literal;
}
export declare const enum CSSSnippetType {
    Raw = "Raw",
    Property = "Property"
}
interface CSSSnippetBase {
    type: CSSSnippetType;
    key: string;
}
export interface CSSSnippetRaw extends CSSSnippetBase {
    type: CSSSnippetType.Raw;
    value: string;
}
export interface CSSSnippetProperty extends CSSSnippetBase {
    type: CSSSnippetType.Property;
    property: string;
    value: CSSValue[][];
    keywords: KeywordMap;
    dependencies: CSSSnippetProperty[];
}
/**
 * Creates structure for holding resolved CSS snippet
 */
export default function createSnippet(key: string, value: string): CSSSnippet;
/**
 * Nests more specific CSS properties into shorthand ones, e.g.
 * `background-position-x` -> `background-position` -> `background`
 */
export declare function nest(snippets: CSSSnippet[]): CSSSnippet[];
export {};
