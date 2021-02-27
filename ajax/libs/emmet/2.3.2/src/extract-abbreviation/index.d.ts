import { SyntaxType } from '../config';
export interface ExtractOptions {
    /**
     * Allow parser to look ahead of `pos` index for searching of missing
     * abbreviation parts. Most editors automatically inserts closing braces for
     * `[`, `{` and `(`, which will most likely be right after current caret position.
     * So in order to properly expand abbreviation, user must explicitly move
     * caret right after auto-inserted braces. With this option enabled, parser
     * will search for closing braces right after `pos`. Default is `true`
     */
    lookAhead: boolean;
    /**
     * Type of context syntax of expanded abbreviation.
     * In 'stylesheet' syntax, brackets `[]` and `{}` are not supported thus
     * not extracted.
     */
    type: SyntaxType;
    /**
     * A string that should precede abbreviation in order to make it successfully
     * extracted. If given, the abbreviation will be extracted from the nearest
     * `prefix` occurrence.
     */
    prefix: string;
}
export interface ExtractedAbbreviation {
    /** Extracted abbreviation */
    abbreviation: string;
    /** Location of abbreviation in input string */
    location: number;
    /** Start location of matched abbreviation, including prefix */
    start: number;
    /** End location of extracted abbreviation */
    end: number;
}
/**
 * Extracts Emmet abbreviation from given string.
 * The goal of this module is to extract abbreviation from current editor’s line,
 * e.g. like this: `<span>.foo[title=bar|]</span>` -> `.foo[title=bar]`, where
 * `|` is a current caret position.
 * @param line A text line where abbreviation should be expanded
 * @param pos Caret position in line. If not given, uses end of line
 * @param options Extracting options
 */
export default function extractAbbreviation(line: string, pos?: number, options?: Partial<ExtractOptions>): ExtractedAbbreviation | undefined;
