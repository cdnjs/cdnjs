/**
 * Text class deals with all text placed on chart.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Container } from "../Container";
import { registry } from "../Registry";
import { getTextFormatter } from "../formatters/TextFormatter";
import { MultiDisposer } from "../utils/Disposer";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import * as $math from "../utils/Math";
import * as $utils from "../utils/Utils";
import * as $type from "../utils/Type";
import * as $dom from "../utils/DOM";
import { defaultRules, ResponsiveBreakpoints } from "../utils/Responsive";
import { options } from "../Options";
;
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Text is used to display highly configurable, data-enabled textual elements.
 *
 * ## Data Binding
 *
 * A Text element can dynamically parse and populate its contents with values
 * from a [[DataItem]].
 *
 * To activate such binding, set element's `dataItem` property.
 *
 * When activated, text contents will be parsed for special tags, e.g.:
 *
 * ```TypeScript
 * label.dataItem = myDataItem;
 * label.text = "The title is: {title}";
 * ```
 * ```JavaScript
 * label.dataItem = myDataItem;
 * label.text = "The title is: {title}";
 * ```
 *
 * The above will automatically replace "{title}" in the string with the
 * actual data value from `myDataItem`.
 *
 * Note, that most often dataItem is set by the Component.
 *
 *
 * @see {@link ILabelEvents} for a list of available events
 * @see {@link ILabelAdapters} for a list of available Adapters
 * @see {@link https://www.amcharts.com/docs/v4/concepts/formatters/formatting-strings/} for info on string formatting and data binding
 * @todo Vertical align
 * @important
 */
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    /**
     * Constructor
     */
    function Label() {
        var _this = 
        // Execute super's constructor
        _super.call(this) || this;
        /**
         * Indicates if the whole text does not fit into max dimenstions set for it.
         */
        _this.isOversized = false;
        // Set this class name
        _this.className = "Label";
        _this.fill = new InterfaceColorSet().getFor("text");
        // not good to set this, as then these will appear on each label and values set on container won't be applied.
        //this.textDecoration = "none";
        //this.fontWeight = "normal";
        // Set defaults
        _this.wrap = false;
        _this.truncate = false;
        _this.fullWords = true;
        _this.ellipsis = "…";
        _this.textAlign = "start";
        _this.textValign = "top";
        _this.layout = "absolute";
        _this.baseLineRatio = -0.27;
        //this.pixelPerfect = true;
        _this._positionPrecision = 1;
        // Add events to watch for maxWidth/maxHeight changes so that we can
        // invalidate this
        _this.events.on("maxsizechanged", function () {
            if (_this.inited) {
                _this.handleMaxSize();
            }
        }, _this, false);
        // this solves strange bug when text just added to svg is 0x0
        _this.events.once("validated", _this.handleValidate, _this, false);
        // Aply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * A placeholder method that is called **after** element finishes drawing
     * itself.
     *
     * @ignore Exclude from docs
     */
    Label.prototype.afterDraw = function () {
        // since we removed validatePosition from sprite, we still need it here to handle rotated text
        _super.prototype.afterDraw.call(this);
        this.validatePosition();
    };
    /**
     * Sets [[Paper]] instance to use to draw elements.
     * @ignore
     * @param paper Paper
     * @return true if paper was changed, false, if it's the same
     */
    Label.prototype.setPaper = function (paper) {
        var changed = _super.prototype.setPaper.call(this, paper);
        if (changed) {
            this.hardInvalidate();
        }
        return changed;
    };
    /**
     * @ignore
     */
    Label.prototype.handleValidate = function () {
        if ((this.currentText || this.text) && (this.bbox.width == 0 || this.bbox.height == 0)) {
            registry.events.once("exitframe", this.hardInvalidate, this);
        }
    };
    /**
     * @ignore
     */
    Label.prototype.handleMaxSize = function () {
        if ((this.bbox.width > this.availableWidth)
            || ((this.bbox.width < this.availableWidth) && (this.isOversized || this.truncate))
            || (this.bbox.height > this.availableHeight)
            || ((this.bbox.height < this.availableHeight) && this.isOversized)) {
            this.invalidate();
        }
        else {
            //this.alignSVGText();
        }
    };
    /**
     * [arrange description]
     *
     * @ignore Exclude from docs
     * @todo Description
     */
    Label.prototype.arrange = function () {
    };
    /**
     * Updates current text according to data item and supported features.
     * Returns `true` if current text has changed.
     *
     * @return Text changed?
     */
    Label.prototype.updateCurrentText = function () {
        // Determine output format
        var output, text;
        if ($utils.isNotEmpty(this.html) && this.paper.supportsForeignObject()) {
            // We favor HTML text if it's set and browser supports `foreignObject`
            output = "html";
            text = this.html;
        }
        else {
            output = "svg";
            text = this.text;
        }
        // Need to toString source?
        if ($type.isObject(text)) {
            text = text.toString();
        }
        // Need to format text all the time
        if ($type.hasValue(text) && text !== "") {
            text = this.populateString(text, this.dataItem);
        }
        if (output == "html") {
            if (this._adapterO) {
                text = this._adapterO.apply("htmlOutput", text);
            }
        }
        else {
            if (this._adapterO) {
                text = this._adapterO.apply("textOutput", text);
            }
        }
        // Update the text
        var changed = text != this.currentText || output != this._currentFormat;
        this.currentText = text;
        this._currentFormat = output;
        return changed;
    };
    /**
     * Hard invalidate means the text will be redrawn even if it hasn't changed.
     * This is used when we change `fontSize`, `fontFamily`, or for some other
     * reasons.
     */
    Label.prototype.hardInvalidate = function () {
        this._prevStatus = "";
        this.invalidate();
    };
    /**
     * Gets line bbox, uses caching to save cpu
     * @ignore
     */
    Label.prototype.getLineBBox = function (lineInfo) {
        //let cacheKey = lineInfo.text + lineInfo.style;
        //let lineBBox = this.getCache(cacheKey);
        //if (!lineBBox) {
        //lineBBox = lineInfo.element.getBBox();
        //if (lineBBox.width != 0 && lineBBox.height != 0) {
        //	this.setCache(cacheKey, lineBBox, 5000);
        //}
        //}
        var element = lineInfo && lineInfo.element;
        var node = element && element.node;
        // Check for the parent Node to avoid FF from throwing errors
        if (node && node.parentNode) {
            lineInfo.bbox = element.getBBox();
        }
    };
    /**
     * Draws the textual label.
     *
     * @ignore Exclude from docs
     */
    Label.prototype.draw = function () {
        // Draw super
        _super.prototype.draw.call(this);
        var oldW = this.bbox.width;
        var oldH = this.bbox.height;
        var topParent = this.topParent;
        if (topParent) {
            if (!topParent.maxWidth || !topParent.maxHeight) {
                topParent.events.once("maxsizechanged", this.hardInvalidate, this, false);
                return;
            }
        }
        // Calculate max width and height
        var maxWidth = $math.max(this.availableWidth - this.pixelPaddingLeft - this.pixelPaddingRight, 0);
        var maxHeight = $math.max(this.availableHeight - this.pixelPaddingTop - this.pixelPaddingBottom, 0);
        // save
        var status = maxHeight + "," + maxWidth + this.wrap + this.truncate + this.fullWords + this.rtl + this.ellipsis;
        // Update text
        if (!this.updateCurrentText() && this.inited && this._prevStatus == status) {
            return;
        }
        this._measuredWidth = 0;
        this._measuredHeight = 0;
        // Reset
        this.isOversized = false;
        // Determine output format
        var output = this._currentFormat;
        var text = this.currentText;
        // Empty string
        if (!$type.hasValue(text) || text == "") {
            this.element.attr({ display: "none" });
            return;
        }
        // Chop up text into lines
        // We're still processing SVG and HTML in the same way for now
        var lines = text.split("\n");
        // Do we need to go through the trouble of measuring lines
        //let measure: boolean = true;// (lines.length > 1) || this.wrap;
        this._prevStatus = status;
        this.textAlign = this.textAlign;
        // need this to measure
        var display = this.group.getAttr("display");
        if (display == "none") {
            this.group.removeAttr("display");
        }
        if (this.textPathElement) {
            this.textPathElement.removeChildren();
        }
        // SVG or HTML?
        if (output === "svg") {
            /**
             * SVG
             */
            this.element.removeAttr("display");
            // Clear the element
            var group = this.element;
            //group.removeChildren();
            this.resetBBox();
            // Init state variables
            var currentHeight = 0;
            var currentFormat = "";
            // Process each line
            for (var i = 0; i < lines.length; i++) {
                // Get line
                var line = lines[i];
                // Check if line is empty
                if (line == "") {
                    // It is, let's just update currentHeight and go to the next one
                    // If it's the first line, we'll have to use arbirary line height,
                    // since there's nothing to measure. For subsequent lines we can take
                    // previous line's height
                    var tempElement = this.getSVGLineElement("", 0);
                    tempElement.add(this.getSvgElement(".", getTextFormatter().translateStyleShortcuts(currentFormat)));
                    group.add(tempElement);
                    var offset = Math.ceil(tempElement.getBBox().height);
                    if (offset > 0) {
                        currentHeight += offset;
                    }
                    group.removeElement(tempElement);
                    // Clear cache if necessary
                    var lineInfo_1 = this.getLineInfo(i);
                    if (lineInfo_1) {
                        lineInfo_1.text = "";
                        lineInfo_1.element.textContent = "";
                    }
                    continue;
                }
                // Chunk up the line and process each chunk
                var chunks = getTextFormatter().chunk(line, null, this.ignoreFormatting);
                var currentLineHeight = 0;
                var firstChunk = true;
                var skipTextChunks = false;
                // Create line element or grab it from cache
                var lineInfo = this.getLineInfo(i);
                if (lineInfo) {
                    // Empty line
                    lineInfo.text = "";
                    lineInfo.element.textContent = "";
                }
                else {
                    // Init new line info
                    lineInfo = {
                        "text": "",
                        "element": this.getSVGLineElement("", 0),
                        "complex": false
                    };
                    // Create the line element
                    //lineInfo.element = this.getSVGLineElement("", 0);
                    //lineElement = this.getSVGLineElement("", 0);
                    group.add(lineInfo.element);
                }
                lineInfo.element.removeAttr("display");
                lineInfo.element.removeChildren(); // memory leak without this
                if (this.textPathElement) {
                    lineInfo.element.add(this.textPathElement);
                }
                /*// @todo not needed anymore
                if (this.rtl) {
                    chunks.reverse();
                }*/
                // Process each chunk
                for (var x = 0; x < chunks.length; x++) {
                    // If there's more than one chunk, means the line is "complex"
                    if (x) {
                        lineInfo.complex = true;
                    }
                    // Get chunk
                    var chunk = chunks[x];
                    // Is this chunk format or text?
                    if (chunk.type === "format") {
                        // Log current format, so that we can apply it to multiple lines if
                        // necessary
                        currentFormat = chunk.text;
                    }
                    else {
                        // It's text block
                        // Need to skip?
                        // We do this when truncating. We can't just simply go ahead and
                        // abandon chunk processing as they might have formatting
                        // instructions in them that are relevant for subsequent lines
                        if (skipTextChunks) {
                            continue;
                        }
                        // Add chunk to the current element
                        //lineInfo.element.content += $utils.trim(getTextFormatter().format(currentFormat + chunk.text, output));
                        lineInfo.text = chunk.text;
                        lineInfo.style = getTextFormatter().translateStyleShortcuts(currentFormat);
                        if (this.textPathElement) {
                            this.getSvgElement(lineInfo.text, lineInfo.style, this.textPathElement);
                        }
                        else {
                            this.getSvgElement(lineInfo.text, lineInfo.style, lineInfo.element);
                        }
                        this.getLineBBox(lineInfo);
                        lineInfo.bbox.width = Math.ceil(lineInfo.bbox.width);
                        // Updated current line height
                        if (currentLineHeight < lineInfo.bbox.height) {
                            currentLineHeight = lineInfo.bbox.height;
                        }
                        // Wrapping?
                        if ((this.wrap || this.truncate) && (lineInfo.bbox.width > maxWidth)) {
                            // Set oversized
                            this.isOversized = true;
                            // Take temporary measurements
                            var lineText = lineInfo.element.textContent;
                            var avgCharWidth = (lineInfo.bbox.width / lineText.length); // * .9;
                            // Calculate average number of symbols / width
                            var excessChars = $math.min(Math.ceil((lineInfo.bbox.width - maxWidth) / avgCharWidth), lineText.length);
                            // Are we truncating or auto-wrapping text?
                            if (this.truncate) {
                                /**
                                 * Processing line truncation
                                 * With the addition of each text chunk we measure if current
                                 * line does not exceed maxWidth. If it does, we will stop
                                 * addition of further chunks as well as try to truncate
                                 * current or any number of previous chunks with an added
                                 * ellipsis
                                 */
                                // Indicator whether we need to add ellipsis to the current
                                // element, even if it fits. This is needed to indicate
                                // whether we have already removed some subsequent chunks in
                                // which case we need to add ellipsis.
                                var addEllipsis = false;
                                // Process each child in the temporary line, until the whole
                                // line fits, preferably with an ellipsis
                                // TODO use iterator instead
                                var node_1 = lineInfo.element.node;
                                if (node_1 && node_1.childNodes) {
                                    for (var e = lineInfo.element.node.childNodes.length - 1; e >= 0; e--) {
                                        // Get current element
                                        var node_2 = lineInfo.element.node.childNodes[e];
                                        // Add ellipsis only if previous chunk was removed in full
                                        // and this chunk already fits
                                        //if (addEllipsis && (bbox.width <= maxWidth)) {
                                        if (addEllipsis && (lineInfo.bbox.width <= maxWidth)) {
                                            // Add ellipsis
                                            node_2.textContent += " " + this.ellipsis;
                                            // Measure again (we need to make sure ellipsis fits)
                                            lineInfo.bbox = lineInfo.element.getBBox();
                                            lineInfo.bbox.width = Math.floor(lineInfo.bbox.width);
                                            // If it fits, we're done here
                                            // If it doesn't we continue rolling
                                            if (lineInfo.bbox.width <= maxWidth) {
                                                break;
                                            }
                                        }
                                        addEllipsis = false;
                                        // Get element text
                                        var elementText = node_2.textContent;
                                        // Calculate average number of symbols / width
                                        lineText = lineInfo.element.textContent;
                                        excessChars = $math.min(Math.ceil((lineInfo.bbox.width - maxWidth) / avgCharWidth), lineText.length);
                                        // Do this until we fit
                                        while ((lineInfo.bbox.width > maxWidth) && (excessChars <= lineText.length) && (excessChars > 0)) {
                                            // Calculate max available chars
                                            var maxChars = $math.max(lineText.length - excessChars - this.ellipsis.length, 1);
                                            // Is there anything left?
                                            if (maxChars <= 1) {
                                                // Nope, let's jump to the previous item
                                                // Set excess characters to zero so that this loop does
                                                // not repeat when it over
                                                excessChars = 0;
                                                // Add ellipsis to previous item
                                                // Subsequent iterations will check if the ellipsis fits
                                                if (e > 0) {
                                                    // Indicating to add ellipsis to previous item
                                                    addEllipsis = true;
                                                    // Removing this node
                                                    lineInfo.element.node.removeChild(node_2);
                                                }
                                            }
                                            // Truncate the text
                                            elementText = $utils.truncateWithEllipsis(elementText, maxChars, this.ellipsis, this.fullWords, this.rtl);
                                            if ((elementText.length > maxChars) && this.fullWords) {
                                                // Still too long?
                                                // Let's try truncating breaking words anyway
                                                elementText = $utils.truncateWithEllipsis(elementText, maxChars, this.ellipsis, false, this.rtl);
                                            }
                                            // Set truncated text
                                            node_2.textContent = elementText;
                                            // Measure again
                                            lineInfo.bbox = lineInfo.element.getBBox();
                                            lineInfo.bbox.width = Math.floor(lineInfo.bbox.width);
                                            // Increase excess characters count, just in case it still
                                            // doesn't fit and we have to go at it again
                                            excessChars = Math.ceil(excessChars * 1.1);
                                        }
                                        // Do not process further chunks
                                        skipTextChunks = true;
                                    }
                                }
                            }
                            else {
                                /**
                                 * Processign auto-wrap
                                 * In this case we're going to be adding text chunks until
                                 * they don't fit into current line. Once that happens we will
                                 * inject the rest of the chunks to the next line
                                 */
                                // Get last node added and measure it
                                var node_3 = lineInfo.element.node;
                                if (node_3) {
                                    var lastNode = lineInfo.element.node.lastChild;
                                    // Init split lines
                                    var splitLines = void 0;
                                    while ((lineInfo.bbox.width > maxWidth) && (excessChars <= lineText.length) && (excessChars > 0)) {
                                        // Calculate max available chars
                                        var maxChars = $math.max(chunk.text.length - excessChars, 1);
                                        // Don't split the words mid-word if it's not the first chunk
                                        // in the line
                                        if (firstChunk) {
                                            // Split mid-word if necessary
                                            splitLines = $utils.splitTextByCharCount(chunk.text, maxChars, true, this.rtl);
                                        }
                                        else {
                                            // Don't split mid-word
                                            splitLines = $utils.splitTextByCharCount(chunk.text, maxChars, true, this.rtl, false);
                                            // Check if the first word is too long
                                            if ((splitLines[0].length > maxChars) || maxChars === 1) {
                                                // Yes - move the whole chunk to the next line
                                                // Remove the element we just added
                                                lineInfo.element.node.removeChild(lastNode);
                                                // Break out of the while on next cycle
                                                excessChars = 0;
                                            }
                                        }
                                        // Use the first line to update last item
                                        if (excessChars > 0) {
                                            var lineText_1 = splitLines.shift();
                                            if (firstChunk) {
                                                lineText_1 = $utils.trim(lineText_1);
                                            }
                                            lastNode.textContent = getTextFormatter().cleanUp(lineText_1);
                                        }
                                        // Measure again, just in case
                                        lineInfo.bbox = lineInfo.element.getBBox();
                                        lineInfo.bbox.width = Math.floor(lineInfo.bbox.width);
                                        // Increase excess characters count, just in case it still
                                        // doesn't fit and we have to go at it again
                                        //excessChars = Math.ceil(excessChars * 1.05);
                                        excessChars++;
                                    }
                                    // Construct the rest of the line
                                    if (splitLines.length > 0) {
                                        var restOfLine = "";
                                        // Add leftovers from splitting the current chunk
                                        if ($type.hasValue(splitLines)) {
                                            if (this.rtl) {
                                                restOfLine += splitLines.join("") + currentFormat;
                                            }
                                            else {
                                                restOfLine += currentFormat + splitLines.join("").replace(/([\[\]]{1})/g, "$1$1");
                                            }
                                        }
                                        // Add the rest of the chunks
                                        for (var c = x + 1; c < chunks.length; c++) {
                                            if (chunks[c].type == "value") {
                                                // We're escaping single square brackets that were
                                                // cleaned up by chunk() back to double square brackets
                                                // so that they are not being treated as format on
                                                // next pass.
                                                restOfLine += chunks[c].text.replace(/([\[\]]{1})/g, "$1$1");
                                            }
                                            else {
                                                restOfLine += chunks[c].text;
                                            }
                                        }
                                        // Inject the rest of the lines as chunks for subsequent
                                        lines.splice(i + 1, 0, restOfLine);
                                    }
                                    // Skip processing the rest of the chunks
                                    skipTextChunks = true;
                                }
                            }
                        }
                        // Let's update the text's bbox with the line's one
                        if (this.bbox.width < lineInfo.bbox.width) {
                            this.bbox.width = lineInfo.bbox.width;
                        }
                        // commented to avoid bug (seen on sankey link) where text is incorrectly aligned
                        //if (this.bbox.x > lineInfo.bbox.x) {
                        //this.bbox.x = lineInfo.bbox.x;
                        //}
                        this.bbox.height = currentHeight + currentLineHeight;
                        // Position current line
                        if (!this.textPathElement) {
                            lineInfo.element.attr({
                                "x": "0",
                                "y": currentHeight + currentLineHeight,
                                "dy": $math.round((this.baseLineRatio * currentLineHeight), 3).toString()
                            });
                        }
                        else {
                            lineInfo.element.attr({
                                "dy": -this.paddingBottom.toString()
                            });
                        }
                        firstChunk = false;
                    }
                }
                // Trim the last item
                var node = lineInfo.element.node;
                if (node) {
                    var lastNode = node.lastChild;
                    if (lastNode) {
                        lastNode.textContent = this.rtl ?
                            $utils.ltrim(lastNode.textContent) :
                            $utils.rtrim(lastNode.textContent);
                    }
                }
                // Increment collective height
                currentHeight += currentLineHeight;
                // Save line cache
                this.addLineInfo(lineInfo, i);
            }
            // Check if maybe we need to hide the whole label if it doesn't fit
            this.maybeHideOversized();
            this.measureFailed = false;
            if (this.bbox.width == 0 || this.bbox.height == 0) {
                this.measureFailed = true;
            }
            // Updated measured dims
            this._measuredWidth = $math.round($math.max(this.bbox.width, this.pixelWidth - this.pixelPaddingLeft - this.pixelPaddingRight));
            this._measuredHeight = $math.round($math.max(this.bbox.height, this.pixelHeight - this.pixelPaddingTop - this.pixelPaddingBottom));
            // Align the lines
            this.alignSVGText();
            this.bbox.width = this._measuredWidth;
            this.bbox.height = this._measuredHeight;
            if (oldH != this._measuredHeight || oldW != this._measuredWidth) {
                this.dispatch("transformed");
            }
            this.hideUnused(lines.length);
        }
        else {
            /**
             * HTML
             */
            this.element.removeAttr("display");
            this.resetBBox();
            // Clear the element
            var group = this.element;
            group.removeChildren();
            this.setCache("lineInfo", [], 0);
            // Create a ForeignObject to use as HTML container
            var fo = this.paper.foreignObject();
            group.add(fo);
            // Set widths on foreignObject so that autosizing measurements work
            // This will bet reset to actual content width/height
            if (this.maxWidth) {
                fo.attr({
                    width: this.maxWidth - this.pixelPaddingLeft - this.pixelPaddingRight
                });
            }
            if (this.maxHeight) {
                fo.attr({
                    height: this.maxHeight - this.pixelPaddingTop - this.pixelPaddingBottom
                });
            }
            // Create line element
            //let lineElement: HTMLElement = this.getHTMLLineElement(getTextFormatter().format(this.html, output));
            var lineElement = this.getHTMLLineElement(text);
            fo.node.appendChild(lineElement);
            // Temporarily set to inline-block so we can measure real width and height
            lineElement.style.display = "inline-block";
            var clientWidth = lineElement.clientWidth;
            var clientHeight = lineElement.clientHeight;
            lineElement.style.display = "block";
            this._bbox = {
                x: 0,
                y: 0,
                width: clientWidth,
                height: clientHeight
            };
            // Set exact dimensions of foreignObject so it is sized exactly as
            // the content within (add one pixel to width so it does not wrap)
            fo.attr({
                width: clientWidth + 1,
                height: clientHeight
            });
            // Check if maybe we need to hide the whole label if it doesn't fit
            this.maybeHideOversized();
            // Set measurements and update bbox
            this._measuredWidth = $math.max(this.bbox.width, this.pixelWidth - this.pixelPaddingLeft - this.pixelPaddingRight);
            this._measuredHeight = $math.max(this.bbox.height, this.pixelHeight - this.pixelPaddingTop - this.pixelPaddingBottom);
            this.bbox.width = this._measuredWidth;
            this.bbox.height = this._measuredHeight;
            // Don't let labels bleed out of the alotted area
            if (this.truncate) {
                lineElement.style.overflow = "hidden";
            }
            if ((clientWidth > maxWidth) || (clientHeight > maxHeight)) {
                this.isOversized = true;
            }
        }
        // Set applicable styles
        this.setStyles();
        this.updateCenter();
        this.updateBackground();
        if (display == "none") {
            this.group.attr({ display: "none" });
        }
        if (this.pathElement) {
            this.paper.appendDef(this.pathElement);
        }
    };
    /**
     * Hides element if it does not fit into available space
     */
    Label.prototype.maybeHideOversized = function () {
        if (this.hideOversized) {
            if ((this.availableWidth < this.bbox.width) || (this.availableHeight < this.bbox.height)) {
                this.element.attr({ display: "none" });
                this.isOversized = true;
            }
            else {
                this.element.removeAttr("display");
                this.isOversized = false;
            }
        }
    };
    /**
     * Aligns the lines horizontally and vertically, based on properties.
     *
     * @ignore Exclude from docs
     */
    Label.prototype.alignSVGText = function () {
        // Get Group
        var group = this.element;
        var children = group.node.children || group.node.childNodes;
        // Is there anything to align?
        if (!children || (children && children.length == 0)) {
            return;
        }
        var width = this._measuredWidth;
        var height = this._measuredHeight;
        // TODO maybe these aren't needed ?
        $utils.used(this.pixelPaddingLeft);
        $utils.used(this.pixelPaddingRight);
        $utils.used(this.pixelPaddingTop);
        $utils.used(this.pixelPaddingBottom);
        if (this.rtl) {
            group.attr({
                "direction": "rtl"
            });
        }
        else {
            group.removeAttr("direction");
        }
        // Process each line
        //$iter.each(group.children.backwards().iterator(), (element) => {
        for (var i = children.length - 1; i >= 0; i--) {
            // Align horizontally
            // Since we are using `text-anchor` for horizontal alignment, all we need
            // to do here is move the `x` position
            var node = children[i];
            node.setAttribute("text-anchor", this.textAlign);
            if (this.textPathElement) {
                node.removeAttribute("x");
                node.removeAttribute("y");
            }
            else {
                switch (this.textAlign) {
                    case "middle":
                        node.setAttribute("x", (width / 2).toString() + "px");
                        break;
                    case "end":
                        if (this.rtl) {
                        }
                        else {
                            node.setAttribute("x", width.toString());
                        }
                        break;
                    default:
                        if (this.rtl) {
                            node.setAttribute("x", width.toString());
                        }
                        else {
                            node.removeAttribute("text-anchor");
                        }
                        break;
                }
                var y = $type.toNumber(node.getAttribute("y"));
                switch (this.textValign) {
                    case "middle":
                        node.setAttribute("y", ((y || 0) + (height - this.bbox.height) / 2).toString());
                        break;
                    case "bottom":
                        node.setAttribute("y", ((y || 0) + height - this.bbox.height).toString());
                        break;
                    default:
                        node.setAttribute("y", (y || 0).toString());
                        break;
                }
            }
        }
    };
    /**
     * Produces an SVG line element with formatted text.
     *
     * @ignore Exclude from docs
     * @param text    Text to wrap into line
     * @param y       Current line vertical position
     * @return A DOM element
     * @todo Implement HTML support
     */
    Label.prototype.getSVGLineElement = function (text, y) {
        // Create a <text> node and set text
        var element = this.paper.addGroup("text");
        element.textContent = text;
        // Set parameters
        element.attr({
            "x": "0"
            //"alignment-baseline": "hanging",
            //"baseline-shift": "-20%",
            //"text-anchor": "center"
        });
        // Set `y` position
        if ($type.hasValue(y)) {
            element.attr({
                "y": y.toString()
            });
        }
        // Don't let labels blled out of the alotted area
        if (this.truncate || this.wrap) {
            element.attr({ "overflow": "hidden" });
        }
        // Add RTL?
        // This has now been moved to this.alignSVGText()
        // if (this.rtl) {
        // 	element.attr({
        // 		"direction": "rtl",
        // 		//"unicode-bidi": "bidi-override"
        // 	});
        // }
        return element;
    };
    Object.defineProperty(Label.prototype, "rtl", {
        /**
         * @return RTL?
         */
        get: function () {
            if ($type.hasValue(this._rtl)) {
                return this._rtl;
            }
            else if (this._topParent) {
                return this._topParent.rtl;
            }
            return false;
        },
        /**
         * An RTL (right-to-left) setting.
         *
         * RTL may affect alignment, text, and other visual properties.
         *
         * If you set this on a top-level chart object, it will be used for all
         * child elements, e.g. labels, unless they have their own `rtl` setting
         * set directly on them.
         *
         * @param value  `true` for to use RTL
         */
        set: function (value) {
            value = $type.toBoolean(value);
            this._rtl = value;
            if (this.element) {
                this.alignSVGText();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets cached BBox.
     *
     * @ignore Exclude from docs
     */
    Label.prototype.resetBBox = function () {
        this._bbox = { x: 0, y: 0, width: 0, height: 0 };
    };
    /**
     * Creates and returns an HTML line element (`<div>`).
     *
     * @ignore Exclude from docs
     * @param text  Text to add
     * @return `<div>` element reference
     */
    Label.prototype.getHTMLLineElement = function (text) {
        // Create the <div> element
        var div = document.createElement("div");
        div.innerHTML = text;
        // Set text alignment
        switch (this.textAlign) {
            case "middle":
                div.style.textAlign = "center";
                break;
            case "end":
                div.style.textAlign = "right";
                break;
        }
        // Disable or enable wrapping
        if (this.wrap) {
            div.style.wordWrap = "break-word";
        }
        else {
            div.style.whiteSpace = "nowrap";
        }
        // Don't let labels bleed out of the alotted area
        // Moved to `draw()` because setting "hidden" kills all measuring
        /*if (this.truncate) {
            div.style.overflow = "hidden";
        }*/
        // Set RTL-related styles
        if (this.rtl) {
            div.style.direction = "rtl";
            //div.style.unicodeBidi = "bidi-override";
        }
        // Translate some of the SVG styles into CSS
        if ($type.hasValue(this.fill)) {
            div.style.color = this.fill.toString();
        }
        return div;
    };
    /**
     * Applies specific styles to text to make it not selectable, unless it is
     * explicitly set as `selectable`.
     *
     * @ignore Exclude from docs
     * @todo Set styles via AMElement
     */
    Label.prototype.setStyles = function () {
        var group = this.element;
        if (!this.selectable || this.draggable || this.resizable || this.swipeable) {
            group.addStyle({
                "webkitUserSelect": "none",
                "msUserSelect": "none"
            });
        }
        else if (this.selectable) {
            group.removeStyle("webkitUserSelect");
            group.removeStyle("msUserSelect");
        }
    };
    /**
     * Hides unused lines
     */
    Label.prototype.hideUnused = function (index) {
        this.initLineCache();
        var lines = this.getCache("lineInfo");
        if (lines.length >= index) {
            for (var i = index; i < lines.length; i++) {
                var line = lines[i];
                if (line && line.element) {
                    line.element.attr({ "display": "none" });
                }
            }
        }
    };
    Object.defineProperty(Label.prototype, "text", {
        /**
         * @return SVG text
         */
        get: function () {
            return this.getPropertyValue("text");
        },
        /**
         * An SVG text.
         *
         * Please note that setting `html` will override this setting if browser
         * supports `foreignObject` in SGV, such as most modern browsers excluding
         * IEs.
         *
         * @param value  SVG Text
         */
        set: function (value) {
            //this.setPropertyValue("html", undefined);
            this.setPropertyValue("text", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "path", {
        /**
         * @return Path
         */
        get: function () {
            return this.getPropertyValue("path");
        },
        /**
         * An SVG path string to position text along. If set, the text will follow
         * the curvature of the path.
         *
         * Location along the path can be set using `locationOnPath`.
         *
         * IMPORTANT: Only SVG text can be put on path. If you are using HTML text
         * this setting will be ignored.
         *
         * @since 4.1.2
         * @param  value  Path
         */
        set: function (value) {
            if (this.setPropertyValue("path", value, true)) {
                if (this.pathElement) {
                    this.pathElement.dispose();
                }
                if (this.textPathElement) {
                    this.textPathElement.dispose();
                }
                this.pathElement = this.paper.add("path");
                this.pathElement.attr({ "d": value });
                this.pathElement.attr({ "id": "text-path-" + this.uid });
                this._disposers.push(this.pathElement);
                this.textPathElement = this.paper.addGroup("textPath");
                this.textPathElement.attrNS($dom.XLINK, "xlink:href", "#text-path-" + this.uid);
                // TODO remove after https://bugzilla.mozilla.org/show_bug.cgi?id=455986 is fixed
                this.textPathElement.attr({ "path": value });
                this._disposers.push(this.textPathElement);
                this.hardInvalidate();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "locationOnPath", {
        /**
         * @return Relatvie location on path
         */
        get: function () {
            return this.getPropertyValue("locationOnPath");
        },
        /**
         * Relative label location on `path`. Value range is from 0 (beginning)
         * to 1 (end).
         *
         * Works only if you set `path` setting to an SVG path.
         *
         * @since 4.1.2
         * @default 0
         * @param  value  Relatvie location on path
         */
        set: function (value) {
            this.setPropertyValue("locationOnPath", value);
            if (this.textPathElement) {
                this.textPathElement.attr({ "startOffset": (value * 100) + "%" });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "baseLineRatio", {
        /**
         * @return Base line ratio
         */
        get: function () {
            return this.getPropertyValue("baseLineRatio");
        },
        /**
         * A ratio to calculate text baseline. Ralative distance from the bottom of
         * the label.
         *
         * @since 4.4.2
         * @default -0.27
         * @param  value  Base line ratio
         */
        set: function (value) {
            this.setPropertyValue("baseLineRatio", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "wrap", {
        /**
         * @return Auto-wrap enabled or not
         */
        get: function () {
            return this.getPropertyValue("wrap");
        },
        /**
         * Enables or disables autowrapping of text.
         *
         * @param value  Auto-wrapping enabled
         */
        set: function (value) {
            this.resetBBox();
            this.setPropertyValue("wrap", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "truncate", {
        /**
         * @return Truncate text?
         */
        get: function () {
            return this.getPropertyValue("truncate");
        },
        /**
         * Indicates if text lines need to be truncated if they do not fit, using
         * configurable `ellipsis` string.
         *
         * `truncate` overrides `wrap` if both are set to `true`.
         *
         * NOTE: For HTML text, this setting **won't** trigger a parser and actual
         * line truncation with ellipsis. It will just hide everything that goes
         * outside the label.
         *
         * @param value  trincate text?
         */
        set: function (value) {
            this.resetBBox();
            this.setPropertyValue("truncate", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "fullWords", {
        /**
         * @return Truncate on full words?
         */
        get: function () {
            return this.getPropertyValue("fullWords");
        },
        /**
         * If `truncate` is enabled, should Label try to break only on full words
         * (`true`), or whenever needed, including middle of the word. (`false`)
         *
         * @default true
         * @param value  Truncate on full words?
         */
        set: function (value) {
            this.setPropertyValue("fullWords", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "ellipsis", {
        /**
         * @return Ellipsis string
         */
        get: function () {
            return this.getPropertyValue("ellipsis");
        },
        /**
         * Ellipsis character to use if `truncate` is enabled.
         *
         * @param value Ellipsis string
         * @default "..."
         */
        set: function (value) {
            this.setPropertyValue("ellipsis", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "selectable", {
        /**
         * @return Text selectable?
         */
        get: function () {
            return this.getPropertyValue("selectable");
        },
        /**
         * Forces the text to be selectable. This setting will be ignored if the
         * object has some kind of interaction attached to it, such as it is
         * `draggable`, `swipeable`, `resizable`.
         *
         * @param value  Text selectable?
         * @default false
         */
        set: function (value) {
            this.setPropertyValue("selectable", value, true);
            this.setStyles();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "textAlign", {
        /**
         * @return Alignment
         */
        get: function () {
            return this.getPropertyValue("textAlign");
        },
        /**
         * Horizontal text alignment.
         *
         * Available choices:
         * * "start"
         * * "middle"
         * * "end"
         *
         * @param value  Alignment
         */
        set: function (value) {
            this.setPropertyValue("textAlign", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "textValign", {
        /**
         * @ignore Exclude from docs (not used)
         * @return Alignment
         * @deprecated
         */
        get: function () {
            return this.getPropertyValue("textValign");
        },
        /**
         * Vertical text alignment.
         *
         * @ignore Exclude from docs (not used)
         * @param value  Alignment
         * @deprecated
         */
        set: function (value) {
            this.setPropertyValue("textValign", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "html", {
        /**
         * @return HTML content
         */
        get: function () {
            return this.getPropertyValue("html");
        },
        /**
         * Raw HTML to be used as text.
         *
         * NOTE: HTML text is subject to browser support. It relies on browsers
         * supporting SVG `foreignObject` nodes. Some browsers (read IEs) do not
         * support it. On those browsers, the text will fall back to basic SVG text,
         * striping out all HTML markup and styling that goes with it.
         *
         * For more information about `foreignObject` and its browser compatibility
         * refer to [this page](https://developer.mozilla.org/en/docs/Web/SVG/Element/foreignObject#Browser_compatibility).
         *
         * @param value HTML text
         */
        set: function (value) {
            this.setPropertyValue("html", value, true);
            if (!$type.hasValue(value)) {
                var group = this.element;
                group.removeChildrenByTag("foreignObject");
            }
        },
        enumerable: true,
        configurable: true
    });
    Label.prototype.setFill = function (value) {
        _super.prototype.setFill.call(this, value);
        if (this.html) {
            var group = this.element;
            var divs = group.node.getElementsByTagName("div");
            for (var i = 0; i < divs.length; i++) {
                var div = divs[i];
                if ($type.hasValue(this.fill)) {
                    div.style.color = this.fill.toString();
                }
            }
        }
    };
    Object.defineProperty(Label.prototype, "hideOversized", {
        /**
         * @return Hide if text does not fit?
         */
        get: function () {
            return this.getPropertyValue("hideOversized");
        },
        /**
         * Indicates whether the whole text should be hidden if it does not fit into
         * its allotted space.
         *
         * @param value  Hide if text does not fit?
         */
        set: function (value) {
            this.setPropertyValue("hideOversized", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "ignoreFormatting", {
        /**
         * @return Ignore formatting?
         */
        get: function () {
            return this.getPropertyValue("ignoreFormatting");
        },
        /**
         * If set to `true` square-bracket formatting blocks will be treated as
         * regular text.
         *
         * @default false
         * @param value  Ignore formatting?
         */
        set: function (value) {
            this.setPropertyValue("ignoreFormatting", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Override `mesaureElement` so it does not get measure again, because
     * internal `_bbox` is being updated by measuring routines in Text itself.
     */
    Label.prototype.measureElement = function () { };
    /**
     * Returns information about a line element.
     *
     * @ignore Exclude from docs
     * @param index  Line index
     * @return Line info object
     */
    Label.prototype.getLineInfo = function (index) {
        this.initLineCache();
        var lines = this.getCache("lineInfo");
        return lines.length > index ? lines[index] : undefined;
    };
    /**
     * Adds a line to line info cache.
     *
     * @ignore Exclude from docs
     * @param line     Line info object
     * @param index    Insert at specified index
     */
    Label.prototype.addLineInfo = function (line, index) {
        this.initLineCache();
        this.getCache("lineInfo")[index] = line;
    };
    /**
     * Checks if line cache is initialized and initializes it.
     */
    Label.prototype.initLineCache = function () {
        if (!$type.hasValue(this.getCache("lineInfo"))) {
            this.setCache("lineInfo", [], 0);
        }
    };
    /**
     * Sets a [[DataItem]] to use for populating dynamic sections of the text.
     *
     * Check the description for [[Text]] class, for data binding.
     *
     * @param dataItem Data item
     */
    Label.prototype.setDataItem = function (dataItem) {
        if (this._sourceDataItemEvents) {
            this._sourceDataItemEvents.dispose();
        }
        if (dataItem) {
            this._sourceDataItemEvents = new MultiDisposer([
                dataItem.events.on("valuechanged", this.invalidate, this, false),
                dataItem.events.on("workingvaluechanged", this.invalidate, this, false),
                dataItem.events.on("calculatedvaluechanged", this.invalidate, this, false),
                dataItem.events.on("propertychanged", this.invalidate, this, false)
            ]);
        }
        _super.prototype.setDataItem.call(this, dataItem);
    };
    Object.defineProperty(Label.prototype, "availableWidth", {
        /**
         * Returns available horizontal space.
         *
         * @ignore Exclude from docs
         * @return Available width (px)
         */
        get: function () {
            return $type.hasValue(this.maxWidth) ? this.maxWidth : this.pixelWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "availableHeight", {
        /**
         * Returns available vertical space.
         *
         * @return Available height (px)
         */
        get: function () {
            return $type.hasValue(this.maxHeight) ? this.maxHeight : this.pixelHeight;
        },
        enumerable: true,
        configurable: true
    });
    // temp, replacing textFormatter method
    Label.prototype.getSvgElement = function (text, style, parent) {
        var element = this.paper.add("tspan");
        element.textContent = text;
        if (style) {
            if (options.nonce && parent) {
                //element.node.setAttribute("nonce", "test123");
                var classid = "amcharts_element_style_" + btoa(style).replace(/[^\w]*/g, "");
                element.node.setAttribute("class", classid);
                var defs = document.createElementNS($dom.SVGNS, "defs");
                parent.node.appendChild(defs);
                var e = document.createElement("style");
                e.type = "text/css";
                e.innerHTML = "." + classid + " { " + style + "}";
                e.setAttribute("nonce", options.nonce);
                defs.appendChild(e);
            }
            else {
                element.node.setAttribute("style", style);
            }
        }
        if (parent) {
            parent.add(element);
        }
        return element;
    };
    /**
     * Invalidates the whole element, including layout AND all its child
     * elements.
     */
    Label.prototype.deepInvalidate = function () {
        _super.prototype.deepInvalidate.call(this);
        this.hardInvalidate();
    };
    Object.defineProperty(Label.prototype, "readerTitle", {
        /**
         * @return Title
         */
        get: function () {
            var title = this.getPropertyValue("readerTitle");
            if (!title) {
                title = this.populateString($utils.plainText($utils.isNotEmpty(this.html)
                    ? this.html
                    : this.text));
            }
            else if (this.dataItem) {
                title = this.populateString(title);
            }
            return title;
        },
        /**
         * Screen reader title of the element.
         *
         * @param value Title
         */
        set: function (value) {
            value = $type.toText(value);
            if (this.setPropertyValue("readerTitle", value)) {
                this.applyAccessibility();
            }
        },
        enumerable: true,
        configurable: true
    });
    return Label;
}(Container));
export { Label };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Label"] = Label;
/**
 * Add default responsive rules
 */
/**
 * Hide labels added directly to chart, like titles if chart is short.
 */
defaultRules.push({
    relevant: ResponsiveBreakpoints.heightXS,
    state: function (target, stateId) {
        if (target instanceof Label && target.parent && target.parent.isBaseSprite) {
            var state = target.states.create(stateId);
            state.properties.disabled = true;
            return state;
        }
        return null;
    }
});
//# sourceMappingURL=Label.js.map