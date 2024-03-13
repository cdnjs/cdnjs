import type { AbbreviationAttribute, AbbreviationNode } from '@emmetio/abbreviation';
import type { Config, Options } from './config.js';
export interface OutputStream {
    options: Options;
    value: string;
    level: number;
    offset: number;
    line: number;
    column: number;
}
export declare const expressionStart = "{";
export declare const expressionEnd = "}";
export default function createOutputStream(options: Options, level?: number): OutputStream;
/**
 * Pushes plain string into output stream without newline processing
 */
export declare function push(stream: OutputStream, text: string): void;
/**
 * Pushes given string with possible newline formatting into output
 */
export declare function pushString(stream: OutputStream, value: string): void;
/**
 * Pushes new line into given output stream
 */
export declare function pushNewline(stream: OutputStream, indent?: boolean | number): void;
/**
 * Adds indentation of `size` to current output stream
 */
export declare function pushIndent(stream: OutputStream, size?: number): void;
/**
 * Pushes field/tabstop into output stream
 */
export declare function pushField(stream: OutputStream, index: number, placeholder: string): void;
/**
 * Returns given tag name formatted according to given config
 */
export declare function tagName(name: string, config: Config): string;
/**
 * Returns given attribute name formatted according to given config
 */
export declare function attrName(name: string, config: Config): string;
/**
 * Returns character for quoting value of given attribute
 */
export declare function attrQuote(attr: AbbreviationAttribute, config: Config, isOpen?: boolean): string;
/**
 * Check if given attribute is boolean
 */
export declare function isBooleanAttribute(attr: AbbreviationAttribute, config: Config): boolean;
/**
 * Returns a token for self-closing tag, depending on current options
 */
export declare function selfClose(config: Config): string;
/**
 * Check if given tag name belongs to inline-level element
 * @param node Parsed node or tag name
 */
export declare function isInline(node: string | AbbreviationNode, config: Config): boolean;
/**
 * Splits given text by lines
 */
export declare function splitByLines(text: string): string[];
