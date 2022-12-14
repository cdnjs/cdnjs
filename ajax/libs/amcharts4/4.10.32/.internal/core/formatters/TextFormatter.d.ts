/**
 * Handles formatting of pseudo-markup in text.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "../Base";
import { AMElement } from "../rendering/AMElement";
import { Adapter } from "../utils/Adapter";
/**
 * Defines an interface for an object that holds a chunk of text.
 */
export interface ITextChunk {
    /**
     * Type of the chunk.
     */
    "type": "value" | "text" | "format" | "image";
    /**
     * Text.
     */
    "text": string;
}
/**
 * A list of Adapters for [[TextFormatter]].
 */
export interface ITextFormatterAdapters {
    /**
     * Applied to each chunk of text when it is parsed and added to chunk list.
     */
    chunk: string;
}
/**
 * Handles formatting of pseudo-markdown in text.
 *
 * @todo Encode < > in output
 * @todo Add more adapters
 * @important
 */
export declare class TextFormatter extends BaseObject {
    /**
     * Defines available adapters.
     */
    _adapter: ITextFormatterAdapters;
    /**
     * Adapter.
     */
    adapter: Adapter<TextFormatter, ITextFormatterAdapters>;
    /**
     * Constructor
     */
    constructor();
    protected debug(): void;
    /**
     * Formats the text according to specifications passed in.
     *
     * @param text    Text to format
     * @param output  Output format (svg, html)
     * @return Formatted text
     */
    format(text: string, output?: string): string;
    /**
     * Replaces brackets with temporary placeholders.
     *
     * @ignore Exclude from docs
     * @param text  Input text
     * @return Escaped text
     */
    escape(text: string): string;
    /**
     * Replaces placeholders back to brackets.
     *
     * @ignore Exclude from docs
     * @param text  Escaped text
     * @return Unescaped text
     */
    unescape(text: string): string;
    /**
     * Cleans up the text text for leftover double square brackets.
     *
     * @ignore Exclude from docs
     * @param text  Input text
     * @return Cleaned up text
     */
    cleanUp(text: string): string;
    /**
     * Wraps text into corresponding tags.
     *
     * @ignore Exclude from docs
     * @param text   Text to wrap
     * @param style  Styles
     * @param output  Format to output in (svg, html)
     * @return Formatted string
     */
    wrap(text: string, style: string, output: string): string;
    /**
     * Wraps text in styled SVG tag.
     *
     * @ignore Exclude from docs
     * @param text   Text to wrap
     * @param style  Style property
     * @return Formatted tag
     */
    wrapSvg(text: string, style: string): string;
    /**
     * Returns an SVG `<tspan>` element.
     *
     * @ignore Exclude from docs
     * @param text   Text
     * @param style  Style
     * @return Element
     */
    getSvgElement(text: string, style?: string): AMElement;
    /**
     * Wraps text in HTML <span> tag.
     *
     * @ignore Exclude from docs
     * @param text   Text to wrap
     * @param style  Style property
     * @return Formatted tag
     * @todo Translate SVG styles into HTML ones
     */
    wrapHtml(text: string, style: string): string;
    /**
     * Returns an HTML `<span>` element.
     *
     * @ignore Exclude from docs
     * @param text   Text/HTML
     * @param style  Style definition
     * @return HTML element
     */
    getHtmlElement(text: string, style?: string): HTMLElement;
    /**
     * Trabslates SVG CSS into HTML CSS.
     *
     * @ignore Exclude from docs
     * @param style  SVG CSS
     * @return HTML CSS
     * @todo Implement actual translation
     */
    styleSvgToHtml(style: string): string;
    /**
     * Translates style shortcuts into full styles, i.e.:
     * "bold" => "font-weight: bold"
     * "#f00" => "fill: #f00"
     *
     * @ignore Exclude from docs
     * @param style  Untranslated style
     * @return Translated style
     * @todo Implement actual translation
     */
    translateStyleShortcuts(style: string): string;
    /**
     * Splits string into chunks. (style blocks, quoted blocks, regular blocks)
     *
     * If the second parameter `quotedBlocks` is set to `true` this method will
     * also single out text blocks enclosed within single quotes that no
     * formatting should be applied to, and they should be displayed as is.
     *
     * Default for the above is `false`, so that you can use single quote in text
     * without escaping it.
     *
     * If enabled, single quotes can be escaped by doubling it - adding two
     * single quotes, which will be replaced by a one single quote in the final
     * output.
     *
     * @ignore Exclude from docs
     * @param text          Text to chunk
     * @param quotedBlocks  Use quoted blocks
     * @param noFormatting  Formatting blocks will be treated as regular text
     * @return Array of string chunks
     */
    chunk(text: string, quotedBlocks?: boolean, noFormatting?: boolean): ITextChunk[];
    /**
     * Checks if supplied format contains image information and should be
     * formatted as such.
     * I.e.: `[img: myImage.png]`
     *
     * @ignore Exclude from docs
     * @param text  Format
     * @return `true` if it is an image
     */
    isImage(text: string): boolean;
}
/**
 * Returns the global instance of [[TextFormatter]].
 *
 * All classes and instances should reuse this universal text formatter,
 * rather than create their own instance of it.
 */
export declare function getTextFormatter(): TextFormatter;
