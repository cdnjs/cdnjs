/**
 * Handles formatting of pseudo-markup in text.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "../Base";
import { AMElement } from "../rendering/AMElement";
import { Adapter } from "../utils/Adapter";
import { registry } from "../Registry";
import * as $strings from "../utils/Strings";
import * as $type from "../utils/Type";
/**
 * Handles formatting of pseudo-markdown in text.
 *
 * @todo Encode < > in output
 * @todo Add more adapters
 * @important
 */
var TextFormatter = /** @class */ (function (_super) {
    __extends(TextFormatter, _super);
    /**
     * Constructor
     */
    function TextFormatter() {
        var _this = _super.call(this) || this;
        /**
         * Adapter.
         */
        _this.adapter = new Adapter(_this);
        _this.className = "TextFormatter";
        _this.applyTheme();
        return _this;
    }
    TextFormatter.prototype.debug = function () { };
    /**
     * Formats the text according to specifications passed in.
     *
     * @param text    Text to format
     * @param output  Output format (svg, html)
     * @return Formatted text
     */
    TextFormatter.prototype.format = function (text, output) {
        // Apply default
        if (!$type.hasValue(output)) {
            output = "svg";
        }
        // Init return value
        var formatted = "";
        // Replace double (escaped) square spaces with remporary codes
        text = this.escape(text);
        // Divvy up the string by style tags
        var styles = text.match(/\[([^\]]*?)\]/gm);
        if (!styles) {
            // Nothing to do here - no formatting elements
            return this.wrap(text, "", output);
        }
        // Get pure text - no style tags
        var texts = text.split(/\[[^\[\]]*\]/);
        // Go through each of the texts and wrap it in style tags
        for (var i = 0, len = texts.length; i < len; i++) {
            // Get text bit
            var t = texts[i];
            // Check if string is empty
            if (t === "") {
                continue;
            }
            // Run through an adapter
            t = this.adapter.apply("chunk", t);
            // Get related style
            var s = "";
            if (i > 0) {
                s = styles[i - 1].replace('[', '').replace(']', '');
            }
            // Wrap text in tag
            formatted += this.wrap(t, s, output);
        }
        // Replace placeholders back
        formatted = this.unescape(formatted);
        // Return result
        return this.cleanUp(formatted);
    };
    /**
     * Replaces brackets with temporary placeholders.
     *
     * @ignore Exclude from docs
     * @param text  Input text
     * @return Escaped text
     */
    TextFormatter.prototype.escape = function (text) {
        return text.
            replace(/\[\[/g, registry.getPlaceholder("1")).
            replace(/([^\/]{1})\]\]/g, "$1" + registry.getPlaceholder("2")).
            replace(/\]\]/g, registry.getPlaceholder("2")).
            replace(/\{\{/g, registry.getPlaceholder("3")).
            replace(/\}\}/g, registry.getPlaceholder("4")).
            replace(/\'\'/g, registry.getPlaceholder("5"));
    };
    /**
     * Replaces placeholders back to brackets.
     *
     * @ignore Exclude from docs
     * @param text  Escaped text
     * @return Unescaped text
     */
    TextFormatter.prototype.unescape = function (text) {
        return text.
            replace(new RegExp(registry.getPlaceholder("1"), "g"), "[[").
            replace(new RegExp(registry.getPlaceholder("2"), "g"), "]]").
            replace(new RegExp(registry.getPlaceholder("3"), "g"), "{{").
            replace(new RegExp(registry.getPlaceholder("4"), "g"), "}}").
            replace(new RegExp(registry.getPlaceholder("5"), "g"), "'");
    };
    /**
     * Cleans up the text text for leftover double square brackets.
     *
     * @ignore Exclude from docs
     * @param text  Input text
     * @return Cleaned up text
     */
    TextFormatter.prototype.cleanUp = function (text) {
        return text.
            replace(/\[\[/g, "[").
            replace(/\]\]/g, "]").
            replace(/\{\{/g, "{").
            replace(/\}\}/g, "}").
            replace(/\'\'/g, "'");
    };
    /**
     * Wraps text into corresponding tags.
     *
     * @ignore Exclude from docs
     * @param text   Text to wrap
     * @param style  Styles
     * @param output  Format to output in (svg, html)
     * @return Formatted string
     */
    TextFormatter.prototype.wrap = function (text, style, output) {
        if (style === "" || style === "/") {
            //return text;
            style = "";
        }
        switch (output) {
            case "html":
                return this.wrapHtml(text, this.translateStyleShortcuts(style));
            default:
                return this.wrapSvg(text, this.translateStyleShortcuts(style));
        }
    };
    /**
     * Wraps text in styled SVG tag.
     *
     * @ignore Exclude from docs
     * @param text   Text to wrap
     * @param style  Style property
     * @return Formatted tag
     */
    TextFormatter.prototype.wrapSvg = function (text, style) {
        if (style === "") {
            return "<tspan>" + text + "</tspan>";
        }
        else {
            return "<tspan style='" + style + "'>" + text + "</tspan>";
        }
    };
    /**
     * Returns an SVG `<tspan>` element.
     *
     * @ignore Exclude from docs
     * @param text   Text
     * @param style  Style
     * @return Element
     */
    TextFormatter.prototype.getSvgElement = function (text, style) {
        var element = new AMElement("tspan");
        element.textContent = text;
        if (style) {
            element.node.setAttribute("style", style);
        }
        return element;
    };
    /**
     * Wraps text in HTML <span> tag.
     *
     * @ignore Exclude from docs
     * @param text   Text to wrap
     * @param style  Style property
     * @return Formatted tag
     * @todo Translate SVG styles into HTML ones
     */
    TextFormatter.prototype.wrapHtml = function (text, style) {
        if (style === "") {
            return "<span>" + text + "</span>";
        }
        else {
            return "<span style='" + this.styleSvgToHtml(style) + "'>" + text + "</span>";
        }
    };
    /**
     * Returns an HTML `<span>` element.
     *
     * @ignore Exclude from docs
     * @param text   Text/HTML
     * @param style  Style definition
     * @return HTML element
     */
    TextFormatter.prototype.getHtmlElement = function (text, style) {
        var element = document.createElement("span");
        element.innerHTML = text;
        if (style) {
            element.setAttribute("style", style);
        }
        return element;
    };
    /**
     * Trabslates SVG CSS into HTML CSS.
     *
     * @ignore Exclude from docs
     * @param style  SVG CSS
     * @return HTML CSS
     * @todo Implement actual translation
     */
    TextFormatter.prototype.styleSvgToHtml = function (style) {
        style = style.replace(/fill:/, "color:");
        return style;
    };
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
    TextFormatter.prototype.translateStyleShortcuts = function (style) {
        if (style == "" || style == "[ ]") {
            return "";
        }
        var cached = registry.getCache("translateStyleShortcuts_" + style);
        if (cached) {
            return cached;
        }
        // Pre-process quoted text
        var q = style.match(/('[^']*')|("[^"]*")/gi);
        if (q) {
            for (var i = 0; i < q.length; i++) {
                style = style.replace(q[i], q[i].replace(/['"]*/g, "").replace(/[ ]+/g, "+"));
            }
        }
        // Get style parts
        var b = style.match(/([\w\-]*:[\s]?[^;\s\]]*)|(\#[\w]{1,6})|([\w]+)|(\/)/gi);
        // Empty?
        if (!b) {
            return style;
        }
        // Check each part
        for (var i = 0; i < b.length; i++) {
            if (b[i].match(/^bold$/i)) {
                // Bold
                b[i] = "font-weight:" + b[i];
            }
            else if (b[i] == "/") {
                // Just closing tag
                // Do nothing
                b[i] = "";
            }
            else if (!b[i].match(/:/)) {
                // Color
                b[i] = "fill:" + b[i];
            }
            else {
                b[i] = b[i].replace(/\+/g, " ");
            }
        }
        var res = b.join(';');
        registry.setCache("translateStyleShortcuts_" + style, res);
        return res;
    };
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
    TextFormatter.prototype.chunk = function (text, quotedBlocks, noFormatting) {
        if (quotedBlocks === void 0) { quotedBlocks = false; }
        if (noFormatting === void 0) { noFormatting = false; }
        // Init result
        var res = [];
        // Replace double (escaped) square spaces and quotes with temporary codes
        text = this.escape(text);
        // Deal with style blocks
        var chunks = quotedBlocks ? text.split("'") : [text];
        for (var i = 0; i < chunks.length; i++) {
            var chunk = chunks[i];
            // Empty?
            if (chunk === "") {
                continue;
            }
            if ((i % 2) === 0) {
                // Text outside quotes
                // Parse for style blocks which are "text" chunks, the rest chunks are
                // "value"
                chunk = chunk.replace(/\]\[/g, "]" + $strings.PLACEHOLDER + "[");
                chunk = chunk.replace(/\[\]/g, "[ ]");
                var chunks2 = chunk.split(/[\[\]]+/);
                for (var i2 = 0; i2 < chunks2.length; i2++) {
                    var chunk2 = this.cleanUp(this.unescape(chunks2[i2]));
                    // Placeholder?
                    if (chunk2 === $strings.PLACEHOLDER) {
                        continue;
                    }
                    // Empty?
                    if (chunk2 === "") {
                        continue;
                    }
                    // Block or value
                    if ((i2 % 2) === 0) {
                        res.push({
                            "type": "value",
                            "text": this.adapter.apply("chunk", chunk2)
                        });
                    }
                    else {
                        res.push({
                            "type": noFormatting ? "value" : "format",
                            "text": "[" + chunk2 + "]"
                        });
                    }
                }
            }
            else {
                // A text within doublequotes
                // All chunks are "text"
                var chunks2 = chunk.split(/[\[\]]+/);
                for (var i2 = 0; i2 < chunks2.length; i2++) {
                    var chunk2 = this.cleanUp(this.unescape(chunks2[i2]));
                    // Empty?
                    if (chunk2 === "") {
                        continue;
                    }
                    // Block or text
                    if ((i2 % 2) === 0) {
                        res.push({
                            "type": "text",
                            "text": chunk2
                        });
                    }
                    else if (this.isImage(chunk2)) {
                        res.push({
                            "type": "image",
                            "text": "[" + chunk2 + "]"
                        });
                    }
                    else {
                        res.push({
                            "type": "format",
                            "text": "[" + chunk2 + "]"
                        });
                    }
                }
            }
        }
        return res;
    };
    /**
     * Checks if supplied format contains image information and should be
     * formatted as such.
     * I.e.: `[img: myImage.png]`
     *
     * @ignore Exclude from docs
     * @param text  Format
     * @return `true` if it is an image
     */
    TextFormatter.prototype.isImage = function (text) {
        return text.match(/img[ ]?:/) ? true : false;
    };
    return TextFormatter;
}(BaseObject));
export { TextFormatter };
var formatter;
/**
 * Returns the global instance of [[TextFormatter]].
 *
 * All classes and instances should reuse this universal text formatter,
 * rather than create their own instance of it.
 */
export function getTextFormatter() {
    if (formatter == null) {
        formatter = new TextFormatter();
    }
    return formatter;
}
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["TextFormatter"] = TextFormatter;
//# sourceMappingURL=TextFormatter.js.map