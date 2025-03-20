import { CSSAbbreviation } from '@emmetio/css-abbreviation';
import { Config } from '../config.js';
export declare const CSSAbbreviationScope: {
    /** Include all possible snippets in match */
    readonly Global: "@@global";
    /** Include raw snippets only (e.g. no properties) in abbreviation match */
    readonly Section: "@@section";
    /** Include properties only in abbreviation match */
    readonly Property: "@@property";
    /** Resolve abbreviation in context of CSS property value */
    readonly Value: "@@value";
};
export default function css(abbr: CSSAbbreviation, config: Config): string;
