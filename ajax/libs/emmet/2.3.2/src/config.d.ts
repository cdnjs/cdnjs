import { Abbreviation } from '@emmetio/abbreviation';
import { CSSSnippet } from './stylesheet/snippets';
export declare type SyntaxType = 'markup' | 'stylesheet';
export declare type FieldOutput = (index: number, placeholder: string, offset: number, line: number, column: number) => string;
export declare type TextOutput = (text: string, offset: number, line: number, column: number) => string;
export declare type StringCase = '' | 'lower' | 'upper';
export interface SnippetsMap {
    [name: string]: string;
}
export interface AbbreviationContext {
    name: string;
    attributes?: {
        [name: string]: string | null;
    };
}
/**
 * Raw config which contains per-syntax options. `markup` and `syntax` keys are
 * reserved for global settings for all markup and stylesheet syntaxes
 */
export interface GlobalConfig {
    [syntax: string]: Partial<BaseConfig>;
}
export interface BaseConfig {
    type: SyntaxType;
    /** Options for abbreviation output */
    options: Partial<Options>;
    /** Substitutions for variable names */
    variables: SnippetsMap;
    /** Abbreviation name to snippets mapping */
    snippets: SnippetsMap;
}
interface ResolvedConfig extends BaseConfig {
    /** Host syntax */
    syntax: string;
    /**
     * Context of abbreviation. For markup abbreviation, it contains parent tag
     * name with attributes, for stylesheet abbreviation it contains property name
     * if abbreviation is expanded as value
     */
    context?: AbbreviationContext;
    /** Text to wrap with abbreviation */
    text?: string | string[];
    /** Max amount of repeated elements (fool proof) */
    maxRepeat?: number;
    /**
     * Object for storing internal cache data to be shared across Emmet methods
     * invocation. If provided, Emmet will store compute-intensive data in this
     * object and will re-use it during editor session.
     * Every time user settings are changed, you should empty cache by passing
     * new object.
     */
    cache?: Cache;
}
export declare type Config = ResolvedConfig & {
    options: Options;
};
export declare type UserConfig = Partial<ResolvedConfig>;
export interface Cache {
    stylesheetSnippets?: CSSSnippet[];
    markupSnippets?: {
        [name: string]: Abbreviation | null;
    };
}
export interface Options {
    /** A list of inline-level elements */
    inlineElements: string[];
    /** A string for one level indent */
    'output.indent': string;
    /**
     * A string for base indent, e.g. context indentation which will be added
     * for every generated line
     */
    'output.baseIndent': string;
    /** A string to use as a new line */
    'output.newline': string;
    /** Tag case: lower, upper or '' (keep as-is) */
    'output.tagCase': StringCase;
    /** Attribute name case: lower, upper or '' (keep as-is) */
    'output.attributeCase': StringCase;
    /** Attribute value quotes: 'single' or 'double' */
    'output.attributeQuotes': 'single' | 'double';
    /** Enable output formatting (indentation and line breaks) */
    'output.format': boolean;
    /** When enabled, automatically adds inner line breaks for leaf (e.g. without children) nodes */
    'output.formatLeafNode': boolean;
    /** A list of tag names that should not get inner indentation */
    'output.formatSkip': string[];
    /** A list of tag names that should *always* get inner indentation. */
    'output.formatForce': string[];
    /**
     * How many inline sibling elements should force line break for each tag.
     * Set to `0` to output all inline elements without formatting.
     * Set to `1` to output all inline elements with formatting (same as block-level).
     */
    'output.inlineBreak': number;
    /**
     * Produce compact notation of boolean attributes: attributes which doesn’t have value.
     * With this option enabled, outputs `<div contenteditable>` instead of
     * `<div contenteditable="contenteditable">`
     */
    'output.compactBoolean': boolean;
    /** A list of boolean attributes */
    'output.booleanAttributes': string[];
    /** Reverses attribute merging directions when resolving snippets */
    'output.reverseAttributes': boolean;
    /** Style of self-closing tags: html (`<br>`), xml (`<br/>`) or xhtml (`<br />`) */
    'output.selfClosingStyle': 'html' | 'xml' | 'xhtml';
    /**
     * A function that takes field index and optional placeholder and returns
     * a string field (tabstop) for host editor. For example, a TextMate-style
     * field is `$index` or `${index:placeholder}`
     * @param index Field index
     * @param placeholder Field placeholder (default value), if any
     * @param offset Current character offset from the beginning of generated content
     * @param line Current line of generated output
     * @param column Current column in line
     */
    'output.field': FieldOutput;
    /**
     * A function for processing text chunk passed to `OutputStream`.
     * May be used by editor for escaping characters, if necessary
     */
    'output.text': TextOutput;
    /**
     * Automatically update value of <a> element's href attribute
     * if inserting URL or email
     */
    'markup.href': boolean;
    /**
     * Enable/disable element commenting: generate comments before open and/or
     * after close tag
     */
    'comment.enabled': boolean;
    /**
     * Attributes that should trigger node commenting on specific node,
     * if commenting is enabled
     */
    'comment.trigger': string[];
    /**
     * Template string for comment to be placed *before* opening tag
     */
    'comment.before': string;
    /**
     * Template string for comment to be placed *after* closing tag.
     * Example: `\n<!-- /[#ID][.CLASS] -->`
     */
    'comment.after': string;
    /** Enable/disable BEM addon */
    'bem.enabled': boolean;
    /** A string for separating elements in output class */
    'bem.element': string;
    /** A string for separating modifiers in output class */
    'bem.modifier': string;
    /** Enable/disable JSX addon */
    'jsx.enabled': boolean;
    /** List of globally available keywords for properties */
    'stylesheet.keywords': string[];
    /**
     * List of unitless properties, e.g. properties where numeric values without
     * explicit unit will be outputted as is, without default value
     */
    'stylesheet.unitless': string[];
    /** Use short hex notation where possible, e.g. `#000` instead of `#000000` */
    'stylesheet.shortHex': boolean;
    /** A string between property name and value */
    'stylesheet.between': string;
    /** A string after property value */
    'stylesheet.after': string;
    /** A unit suffix to output by default after integer values, 'px' by default */
    'stylesheet.intUnit': string;
    /** A unit suffix to output by default after float values, 'em' by default */
    'stylesheet.floatUnit': string;
    /**
     * Aliases for custom units in abbreviation. For example, `r: 'rem'` will
     * output `10rem` for abbreviation `10r`
     */
    'stylesheet.unitAliases': SnippetsMap;
    /** Output abbreviation as JSON object properties (for CSS-in-JS syntaxes) */
    'stylesheet.json': boolean;
    /** Use double quotes for JSON values */
    'stylesheet.jsonDoubleQuotes': boolean;
    /**
     * A float number between 0 and 1 to pick fuzzy-matched abbreviations.
     * Lower value will pick more abbreviations (and less accurate)
     */
    'stylesheet.fuzzySearchMinScore': number;
}
/**
 * Default syntaxes for abbreviation types
 */
export declare const defaultSyntaxes: {
    [name in SyntaxType]: string;
};
/**
 * List of all known syntaxes
 */
export declare const syntaxes: {
    markup: string[];
    stylesheet: string[];
};
export declare const defaultOptions: Options;
export declare const defaultConfig: Config;
/**
 * Default per-syntax config
 */
export declare const syntaxConfig: GlobalConfig;
/**
 * Parses raw snippets definitions with possibly multiple keys into a plan
 * snippet map
 */
export declare function parseSnippets(snippets: SnippetsMap): SnippetsMap;
export default function resolveConfig(config?: UserConfig, globals?: GlobalConfig): Config;
export {};
