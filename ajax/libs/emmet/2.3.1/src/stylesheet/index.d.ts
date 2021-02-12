import { CSSAbbreviation } from '@emmetio/css-abbreviation';
import { Config, SnippetsMap } from '../config';
import { CSSSnippet } from './snippets';
declare type MatchInput = CSSSnippet | string;
export declare const enum CSSAbbreviationScope {
    /** Include all possible snippets in match */
    Global = "@@global",
    /** Include raw snippets only (e.g. no properties) in abbreviation match */
    Section = "@@section",
    /** Include properties only in abbreviation match */
    Property = "@@property",
    /** Resolve abbreviation in context of CSS property value */
    Value = "@@value"
}
/**
 * Parses given Emmet abbreviation into a final abbreviation tree with all
 * required transformations applied
 */
export default function parse(abbr: string | CSSAbbreviation, config: Config): CSSAbbreviation;
export { default as stringify } from './format';
/**
 * Converts given raw snippets into internal snippets representation
 */
export declare function convertSnippets(snippets: SnippetsMap): CSSSnippet[];
/**
 * Finds best matching item from `items` array
 * @param abbr  Abbreviation to match
 * @param items List of items for match
 * @param minScore The minimum score the best matched item should have to be a valid match.
 */
export declare function findBestMatch<T extends MatchInput>(abbr: string, items: T[], minScore?: number, partialMatch?: boolean): T | null;
