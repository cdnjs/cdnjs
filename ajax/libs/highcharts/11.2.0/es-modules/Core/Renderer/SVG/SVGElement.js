/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import A from '../../Animation/AnimationUtilities.js';
const { animate, animObject, stop } = A;
import Color from '../../Color/Color.js';
import H from '../../Globals.js';
const { deg2rad, doc, noop, svg, SVG_NS, win } = H;
import U from '../../Utilities.js';
const { addEvent, attr, createElement, css, defined, erase, extend, fireEvent, isArray, isFunction, isObject, isString, merge, objectEach, pick, pInt, syncTimeout, uniqueKey } = U;
/* *
 *
 *  Class
 *
 * */
/* eslint-disable no-invalid-this, valid-jsdoc */
/**
 * The SVGElement prototype is a JavaScript wrapper for SVG elements used in the
 * rendering layer of Highcharts. Combined with the
 * {@link Highcharts.SVGRenderer}
 * object, these prototypes allow freeform annotation in the charts or even in
 * HTML pages without instanciating a chart. The SVGElement can also wrap HTML
 * labels, when `text` or `label` elements are created with the `useHTML`
 * parameter.
 *
 * The SVGElement instances are created through factory functions on the
 * {@link Highcharts.SVGRenderer}
 * object, like
 * {@link Highcharts.SVGRenderer#rect|rect},
 * {@link Highcharts.SVGRenderer#path|path},
 * {@link Highcharts.SVGRenderer#text|text},
 * {@link Highcharts.SVGRenderer#label|label},
 * {@link Highcharts.SVGRenderer#g|g}
 * and more.
 *
 * @class
 * @name Highcharts.SVGElement
 */
class SVGElement {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        this.element = void 0;
        this.onEvents = {};
        this.opacity = 1; // Default base for animation
        this.renderer = void 0;
        this.SVG_NS = SVG_NS;
    }
    // @todo public zIndex?: number;
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Get the current value of an attribute or pseudo attribute,
     * used mainly for animation. Called internally from
     * the {@link Highcharts.SVGRenderer#attr} function.
     *
     * @private
     * @function Highcharts.SVGElement#_defaultGetter
     *
     * @param {string} key
     *        Property key.
     *
     * @return {number|string}
     *         Property value.
     */
    _defaultGetter(key) {
        let ret = pick(this[key + 'Value'], // align getter
        this[key], this.element ? this.element.getAttribute(key) : null, 0);
        if (/^[\-0-9\.]+$/.test(ret)) { // is numerical
            ret = parseFloat(ret);
        }
        return ret;
    }
    /**
     * @private
     * @function Highcharts.SVGElement#_defaultSetter
     *
     * @param {string} value
     *
     * @param {string} key
     *
     * @param {Highcharts.SVGDOMElement} element
     *
     */
    _defaultSetter(value, key, element) {
        element.setAttribute(key, value);
    }
    /**
     * Add the element to the DOM. All elements must be added this way.
     *
     * @sample highcharts/members/renderer-g
     *         Elements added to a group
     *
     * @function Highcharts.SVGElement#add
     *
     * @param {Highcharts.SVGElement} [parent]
     *        The parent item to add it to. If undefined, the element is added
     *        to the {@link Highcharts.SVGRenderer.box}.
     *
     * @return {Highcharts.SVGElement}
     *         Returns the SVGElement for chaining.
     */
    add(parent) {
        const renderer = this.renderer, element = this.element;
        let inserted;
        if (parent) {
            this.parentGroup = parent;
        }
        // Build formatted text
        if (typeof this.textStr !== 'undefined' &&
            this.element.nodeName === 'text' // Not for SVGLabel instances
        ) {
            renderer.buildText(this);
        }
        // Mark as added
        this.added = true;
        // If we're adding to renderer root, or other elements in the group
        // have a z index, we need to handle it
        if (!parent || parent.handleZ || this.zIndex) {
            inserted = this.zIndexSetter();
        }
        // If zIndex is not handled, append at the end
        if (!inserted) {
            (parent ?
                parent.element :
                renderer.box).appendChild(element);
        }
        // fire an event for internal hooks
        if (this.onAdd) {
            this.onAdd();
        }
        return this;
    }
    /**
     * Add a class name to an element.
     *
     * @function Highcharts.SVGElement#addClass
     *
     * @param {string} className
     * The new class name to add.
     *
     * @param {boolean} [replace=false]
     * When true, the existing class name(s) will be overwritten with the new
     * one. When false, the new one is added.
     *
     * @return {Highcharts.SVGElement}
     * Return the SVG element for chainability.
     */
    addClass(className, replace) {
        const currentClassName = replace ? '' : (this.attr('class') || '');
        // Trim the string and remove duplicates
        className = (className || '')
            .split(/ /g)
            .reduce(function (newClassName, name) {
            if (currentClassName.indexOf(name) === -1) {
                newClassName.push(name);
            }
            return newClassName;
        }, (currentClassName ?
            [currentClassName] :
            []))
            .join(' ');
        if (className !== currentClassName) {
            this.attr('class', className);
        }
        return this;
    }
    /**
     * This method is executed in the end of `attr()`, after setting all
     * attributes in the hash. In can be used to efficiently consolidate
     * multiple attributes in one SVG property -- e.g., translate, rotate and
     * scale are merged in one "transform" attribute in the SVG node.
     *
     * @private
     * @function Highcharts.SVGElement#afterSetters
     */
    afterSetters() {
        // Update transform. Do this outside the loop to prevent redundant
        // updating for batch setting of attributes.
        if (this.doTransform) {
            this.updateTransform();
            this.doTransform = false;
        }
    }
    /**
     * Align the element relative to the chart or another box.
     *
     * @function Highcharts.SVGElement#align
     *
     * @param {Highcharts.AlignObject} [alignOptions]
     *        The alignment options. The function can be called without this
     *        parameter in order to re-align an element after the box has been
     *        updated.
     *
     * @param {boolean} [alignByTranslate]
     *        Align element by translation.
     *
     * @param {string|Highcharts.BBoxObject} [box]
     *        The box to align to, needs a width and height. When the box is a
     *        string, it refers to an object in the Renderer. For example, when
     *        box is `spacingBox`, it refers to `Renderer.spacingBox` which
     *        holds `width`, `height`, `x` and `y` properties.
     *
     * @return {Highcharts.SVGElement} Returns the SVGElement for chaining.
     */
    align(alignOptions, alignByTranslate, box) {
        const attribs = {}, renderer = this.renderer, alignedObjects = renderer.alignedObjects;
        let x, y, alignTo, alignFactor, vAlignFactor;
        // First call on instanciate
        if (alignOptions) {
            this.alignOptions = alignOptions;
            this.alignByTranslate = alignByTranslate;
            if (!box || isString(box)) {
                this.alignTo = alignTo = box || 'renderer';
                // prevent duplicates, like legendGroup after resize
                erase(alignedObjects, this);
                alignedObjects.push(this);
                box = void 0; // reassign it below
            }
            // When called on resize, no arguments are supplied
        }
        else {
            alignOptions = this.alignOptions;
            alignByTranslate = this.alignByTranslate;
            alignTo = this.alignTo;
        }
        box = pick(box, renderer[alignTo], alignTo === 'scrollablePlotBox' ?
            renderer.plotBox : void 0, renderer);
        // Assign variables
        const align = alignOptions.align, vAlign = alignOptions.verticalAlign;
        // default: left align
        x = (box.x || 0) + (alignOptions.x || 0);
        // default: top align
        y = (box.y || 0) + (alignOptions.y || 0);
        // Align
        if (align === 'right') {
            alignFactor = 1;
        }
        else if (align === 'center') {
            alignFactor = 2;
        }
        if (alignFactor) {
            x += (box.width - (alignOptions.width || 0)) /
                alignFactor;
        }
        attribs[alignByTranslate ? 'translateX' : 'x'] = Math.round(x);
        // Vertical align
        if (vAlign === 'bottom') {
            vAlignFactor = 1;
        }
        else if (vAlign === 'middle') {
            vAlignFactor = 2;
        }
        if (vAlignFactor) {
            y += (box.height - (alignOptions.height || 0)) /
                vAlignFactor;
        }
        attribs[alignByTranslate ? 'translateY' : 'y'] = Math.round(y);
        // Animate only if already placed
        this[this.placed ? 'animate' : 'attr'](attribs);
        this.placed = true;
        this.alignAttr = attribs;
        return this;
    }
    /**
     * @private
     * @function Highcharts.SVGElement#alignSetter
     * @param {"left"|"center"|"right"} value
     */
    alignSetter(value) {
        const convert = {
            left: 'start',
            center: 'middle',
            right: 'end'
        };
        if (convert[value]) {
            this.alignValue = value;
            this.element.setAttribute('text-anchor', convert[value]);
        }
    }
    /**
     * Animate to given attributes or CSS properties.
     *
     * @sample highcharts/members/element-on/
     *         Setting some attributes by animation
     *
     * @function Highcharts.SVGElement#animate
     *
     * @param {Highcharts.SVGAttributes} params
     *        SVG attributes or CSS to animate.
     *
     * @param {boolean|Partial<Highcharts.AnimationOptionsObject>} [options]
     *        Animation options.
     *
     * @param {Function} [complete]
     *        Function to perform at the end of animation.
     *
     * @return {Highcharts.SVGElement}
     *         Returns the SVGElement for chaining.
     */
    animate(params, options, complete) {
        const animOptions = animObject(pick(options, this.renderer.globalAnimation, true)), deferTime = animOptions.defer;
        // When the page is hidden save resources in the background by not
        // running animation at all (#9749).
        if (doc.hidden) {
            animOptions.duration = 0;
        }
        if (animOptions.duration !== 0) {
            // allows using a callback with the global animation without
            // overwriting it
            if (complete) {
                animOptions.complete = complete;
            }
            // If defer option is defined delay the animation #12901
            syncTimeout(() => {
                if (this.element) {
                    animate(this, params, animOptions);
                }
            }, deferTime);
        }
        else {
            this.attr(params, void 0, complete || animOptions.complete);
            // Call the end step synchronously
            objectEach(params, function (val, prop) {
                if (animOptions.step) {
                    animOptions.step.call(this, val, { prop: prop, pos: 1, elem: this });
                }
            }, this);
        }
        return this;
    }
    /**
     * Apply a text outline through a custom CSS property, by copying the text
     * element and apply stroke to the copy. Used internally. Contrast checks at
     * [example](https://jsfiddle.net/highcharts/43soe9m1/2/).
     *
     * @example
     * // Specific color
     * text.css({
     *    textOutline: '1px black'
     * });
     * // Automatic contrast
     * text.css({
     *    color: '#000000', // black text
     *    textOutline: '1px contrast' // => white outline
     * });
     *
     * @private
     * @function Highcharts.SVGElement#applyTextOutline
     *
     * @param {string} textOutline
     *        A custom CSS `text-outline` setting, defined by `width color`.
     */
    applyTextOutline(textOutline) {
        const elem = this.element, hasContrast = textOutline.indexOf('contrast') !== -1, styles = {};
        // When the text shadow is set to contrast, use dark stroke for light
        // text and vice versa.
        if (hasContrast) {
            styles.textOutline = textOutline = textOutline.replace(/contrast/g, this.renderer.getContrast(elem.style.fill));
        }
        // Extract the stroke width and color
        const parts = textOutline.split(' ');
        const color = parts[parts.length - 1];
        let strokeWidth = parts[0];
        if (strokeWidth && strokeWidth !== 'none' && H.svg) {
            this.fakeTS = true; // Fake text shadow
            // Since the stroke is applied on center of the actual outline, we
            // need to double it to get the correct stroke-width outside the
            // glyphs.
            strokeWidth = strokeWidth.replace(/(^[\d\.]+)(.*?)$/g, function (match, digit, unit) {
                return (2 * Number(digit)) + unit;
            });
            // Remove shadows from previous runs.
            this.removeTextOutline();
            const outline = doc.createElementNS(SVG_NS, 'tspan');
            attr(outline, {
                'class': 'highcharts-text-outline',
                fill: color,
                stroke: color,
                'stroke-width': strokeWidth,
                'stroke-linejoin': 'round'
            });
            // For each of the tspans and text nodes, create a copy in the
            // outline.
            const parentElem = elem.querySelector('textPath') || elem;
            [].forEach.call(parentElem.childNodes, (childNode) => {
                const clone = childNode.cloneNode(true);
                if (clone.removeAttribute) {
                    ['fill', 'stroke', 'stroke-width', 'stroke'].forEach((prop) => clone
                        .removeAttribute(prop));
                }
                outline.appendChild(clone);
            });
            // Collect the sum of dy from all children, included nested ones
            let totalHeight = 0;
            [].forEach.call(parentElem.querySelectorAll('text tspan'), (element) => {
                totalHeight += Number(element.getAttribute('dy'));
            });
            // Insert an absolutely positioned break before the original text
            // to keep it in place
            const br = doc.createElementNS(SVG_NS, 'tspan');
            br.textContent = '\u200B';
            // Reset the position for the following text
            attr(br, {
                x: Number(elem.getAttribute('x')),
                dy: -totalHeight
            });
            // Insert the outline
            outline.appendChild(br);
            parentElem.insertBefore(outline, parentElem.firstChild);
        }
    }
    /**
     * @function Highcharts.SVGElement#attr
     * @param {string} key
     * @return {number|string}
     */ /**
    * Apply native and custom attributes to the SVG elements.
    *
    * In order to set the rotation center for rotation, set x and y to 0 and
    * use `translateX` and `translateY` attributes to position the element
    * instead.
    *
    * Attributes frequently used in Highcharts are `fill`, `stroke`,
    * `stroke-width`.
    *
    * @sample highcharts/members/renderer-rect/
    *         Setting some attributes
    *
    * @example
    * // Set multiple attributes
    * element.attr({
    *     stroke: 'red',
    *     fill: 'blue',
    *     x: 10,
    *     y: 10
    * });
    *
    * // Set a single attribute
    * element.attr('stroke', 'red');
    *
    * // Get an attribute
    * element.attr('stroke'); // => 'red'
    *
    * @function Highcharts.SVGElement#attr
    *
    * @param {string|Highcharts.SVGAttributes} [hash]
    *        The native and custom SVG attributes.
    *
    * @param {number|string|Highcharts.SVGPathArray} [val]
    *        If the type of the first argument is `string`, the second can be a
    *        value, which will serve as a single attribute setter. If the first
    *        argument is a string and the second is undefined, the function
    *        serves as a getter and the current value of the property is
    *        returned.
    *
    * @param {Function} [complete]
    *        A callback function to execute after setting the attributes. This
    *        makes the function compliant and interchangeable with the
    *        {@link SVGElement#animate} function.
    *
    * @param {boolean} [continueAnimation=true]
    *        Used internally when `.attr` is called as part of an animation
    *        step. Otherwise, calling `.attr` for an attribute will stop
    *        animation for that attribute.
    *
    * @return {Highcharts.SVGElement}
    *         If used as a setter, it returns the current
    *         {@link Highcharts.SVGElement} so the calls can be chained. If
    *         used as a getter, the current value of the attribute is returned.
    */
    attr(hash, val, complete, continueAnimation) {
        const element = this.element, symbolCustomAttribs = SVGElement.symbolCustomAttribs;
        let key, hasSetSymbolSize, ret = this, skipAttr, setter;
        // single key-value pair
        if (typeof hash === 'string' && typeof val !== 'undefined') {
            key = hash;
            hash = {};
            hash[key] = val;
        }
        // used as a getter: first argument is a string, second is undefined
        if (typeof hash === 'string') {
            ret = (this[hash + 'Getter'] ||
                this._defaultGetter).call(this, hash, element);
            // setter
        }
        else {
            objectEach(hash, function eachAttribute(val, key) {
                skipAttr = false;
                // Unless .attr is from the animator update, stop current
                // running animation of this property
                if (!continueAnimation) {
                    stop(this, key);
                }
                // Special handling of symbol attributes
                if (this.symbolName &&
                    symbolCustomAttribs.indexOf(key) !== -1) {
                    if (!hasSetSymbolSize) {
                        this.symbolAttr(hash);
                        hasSetSymbolSize = true;
                    }
                    skipAttr = true;
                }
                if (this.rotation && (key === 'x' || key === 'y')) {
                    this.doTransform = true;
                }
                if (!skipAttr) {
                    setter = (this[key + 'Setter'] ||
                        this._defaultSetter);
                    setter.call(this, val, key, element);
                }
            }, this);
            this.afterSetters();
        }
        // In accordance with animate, run a complete callback
        if (complete) {
            complete.call(this);
        }
        return ret;
    }
    /**
     * Apply a clipping rectangle to this element.
     *
     * @function Highcharts.SVGElement#clip
     *
     * @param {Highcharts.ClipRectElement} [clipRect]
     *        The clipping rectangle. If skipped, the current clip is removed.
     *
     * @return {Highcharts.SVGElement}
     *         Returns the SVG element to allow chaining.
     */
    clip(clipRect) {
        return this.attr('clip-path', clipRect ?
            'url(' + this.renderer.url + '#' + clipRect.id + ')' :
            'none');
    }
    /**
     * Calculate the coordinates needed for drawing a rectangle crisply and
     * return the calculated attributes.
     *
     * @function Highcharts.SVGElement#crisp
     *
     * @param {Highcharts.RectangleObject} rect
     * Rectangle to crisp.
     *
     * @param {number} [strokeWidth]
     * The stroke width to consider when computing crisp positioning. It can
     * also be set directly on the rect parameter.
     *
     * @return {Highcharts.RectangleObject}
     * The modified rectangle arguments.
     */
    crisp(rect, strokeWidth) {
        const wrapper = this;
        strokeWidth = strokeWidth || rect.strokeWidth || 0;
        // Math.round because strokeWidth can sometimes have roundoff errors
        const normalizer = Math.round(strokeWidth) % 2 / 2;
        // normalize for crisp edges
        rect.x = Math.floor(rect.x || wrapper.x || 0) + normalizer;
        rect.y = Math.floor(rect.y || wrapper.y || 0) + normalizer;
        rect.width = Math.floor((rect.width || wrapper.width || 0) - 2 * normalizer);
        rect.height = Math.floor((rect.height || wrapper.height || 0) - 2 * normalizer);
        if (defined(rect.strokeWidth)) {
            rect.strokeWidth = strokeWidth;
        }
        return rect;
    }
    /**
     * Build and apply an SVG gradient out of a common JavaScript configuration
     * object. This function is called from the attribute setters. An event
     * hook is added for supporting other complex color types.
     *
     * @private
     * @function Highcharts.SVGElement#complexColor
     *
     * @param {Highcharts.GradientColorObject|Highcharts.PatternObject} colorOptions
     * The gradient or pattern options structure.
     *
     * @param {string} prop
     * The property to apply, can either be `fill` or `stroke`.
     *
     * @param {Highcharts.SVGDOMElement} elem
     * SVG element to apply the gradient on.
     */
    complexColor(colorOptions, prop, elem) {
        const renderer = this.renderer;
        let colorObject, gradName, gradAttr, radAttr, gradients, stops, stopColor, stopOpacity, radialReference, id, key = [], value;
        fireEvent(this.renderer, 'complexColor', {
            args: arguments
        }, function () {
            // Apply linear or radial gradients
            if (colorOptions.radialGradient) {
                gradName = 'radialGradient';
            }
            else if (colorOptions.linearGradient) {
                gradName = 'linearGradient';
            }
            if (gradName) {
                gradAttr = colorOptions[gradName];
                gradients = renderer.gradients;
                stops = colorOptions.stops;
                radialReference = elem.radialReference;
                // Keep < 2.2 kompatibility
                if (isArray(gradAttr)) {
                    colorOptions[gradName] = gradAttr = {
                        x1: gradAttr[0],
                        y1: gradAttr[1],
                        x2: gradAttr[2],
                        y2: gradAttr[3],
                        gradientUnits: 'userSpaceOnUse'
                    };
                }
                // Correct the radial gradient for the radial reference system
                if (gradName === 'radialGradient' &&
                    radialReference &&
                    !defined(gradAttr.gradientUnits)) {
                    // Save the radial attributes for updating
                    radAttr = gradAttr;
                    gradAttr = merge(gradAttr, renderer.getRadialAttr(radialReference, radAttr), { gradientUnits: 'userSpaceOnUse' });
                }
                // Build the unique key to detect whether we need to create a
                // new element (#1282)
                objectEach(gradAttr, function (value, n) {
                    if (n !== 'id') {
                        key.push(n, value);
                    }
                });
                objectEach(stops, function (val) {
                    key.push(val);
                });
                key = key.join(',');
                // Check if a gradient object with the same config object is
                // created within this renderer
                if (gradients[key]) {
                    id = gradients[key].attr('id');
                }
                else {
                    // Set the id and create the element
                    gradAttr.id = id = uniqueKey();
                    const gradientObject = gradients[key] =
                        renderer.createElement(gradName)
                            .attr(gradAttr)
                            .add(renderer.defs);
                    gradientObject.radAttr = radAttr;
                    // The gradient needs to keep a list of stops to be able to
                    // destroy them
                    gradientObject.stops = [];
                    stops.forEach(function (stop) {
                        if (stop[1].indexOf('rgba') === 0) {
                            colorObject = Color.parse(stop[1]);
                            stopColor = colorObject.get('rgb');
                            stopOpacity = colorObject.get('a');
                        }
                        else {
                            stopColor = stop[1];
                            stopOpacity = 1;
                        }
                        const stopObject = renderer.createElement('stop').attr({
                            offset: stop[0],
                            'stop-color': stopColor,
                            'stop-opacity': stopOpacity
                        }).add(gradientObject);
                        // Add the stop element to the gradient
                        gradientObject.stops.push(stopObject);
                    });
                }
                // Set the reference to the gradient object
                value = 'url(' + renderer.url + '#' + id + ')';
                elem.setAttribute(prop, value);
                elem.gradient = key;
                // Allow the color to be concatenated into tooltips formatters
                // etc. (#2995)
                colorOptions.toString = function () {
                    return value;
                };
            }
        });
    }
    /**
     * Set styles for the element. In addition to CSS styles supported by
     * native SVG and HTML elements, there are also some custom made for
     * Highcharts, like `width`, `ellipsis` and `textOverflow` for SVG text
     * elements.
     *
     * @sample highcharts/members/renderer-text-on-chart/
     *         Styled text
     *
     * @function Highcharts.SVGElement#css
     *
     * @param {Highcharts.CSSObject} styles
     *        The new CSS styles.
     *
     * @return {Highcharts.SVGElement}
     *         Return the SVG element for chaining.
     */
    css(styles) {
        const oldStyles = this.styles, newStyles = {}, elem = this.element;
        let textWidth, hasNew = !oldStyles;
        // Filter out existing styles to increase performance (#2640)
        if (oldStyles) {
            objectEach(styles, function (value, n) {
                if (oldStyles && oldStyles[n] !== value) {
                    newStyles[n] = value;
                    hasNew = true;
                }
            });
        }
        if (hasNew) {
            // Merge the new styles with the old ones
            if (oldStyles) {
                styles = extend(oldStyles, newStyles);
            }
            // Get the text width from style
            // Previously set, unset it (#8234)
            if (styles.width === null || styles.width === 'auto') {
                delete this.textWidth;
                // Apply new
            }
            else if (elem.nodeName.toLowerCase() === 'text' &&
                styles.width) {
                textWidth = this.textWidth = pInt(styles.width);
            }
            // store object
            this.styles = styles;
            if (textWidth && (!svg && this.renderer.forExport)) {
                delete styles.width;
            }
            const stylesToApply = merge(styles);
            if (elem.namespaceURI === this.SVG_NS) {
                // These CSS properties are interpreted internally by the SVG
                // renderer, but are not supported by SVG and should not be
                // added to the DOM. In styled mode, no CSS should find its way
                // to the DOM whatsoever (#6173, #6474).
                ['textOutline', 'textOverflow', 'width'].forEach((key) => (stylesToApply &&
                    delete stylesToApply[key]));
                // SVG requires fill for text
                if (stylesToApply.color) {
                    stylesToApply.fill = stylesToApply.color;
                }
            }
            css(elem, stylesToApply);
        }
        if (this.added) {
            // Rebuild text after added. Cache mechanisms in the buildText will
            // prevent building if there are no significant changes.
            if (this.element.nodeName === 'text') {
                this.renderer.buildText(this);
            }
            // Apply text outline after added
            if (styles.textOutline) {
                this.applyTextOutline(styles.textOutline);
            }
        }
        return this;
    }
    /**
     * @private
     * @function Highcharts.SVGElement#dashstyleSetter
     * @param {string} value
     */
    dashstyleSetter(value) {
        let i, strokeWidth = this['stroke-width'];
        // If "inherit", like maps in IE, assume 1 (#4981). With HC5 and the new
        // strokeWidth function, we should be able to use that instead.
        if (strokeWidth === 'inherit') {
            strokeWidth = 1;
        }
        value = value && value.toLowerCase();
        if (value) {
            const v = value
                .replace('shortdashdotdot', '3,1,1,1,1,1,')
                .replace('shortdashdot', '3,1,1,1')
                .replace('shortdot', '1,1,')
                .replace('shortdash', '3,1,')
                .replace('longdash', '8,3,')
                .replace(/dot/g, '1,3,')
                .replace('dash', '4,3,')
                .replace(/,$/, '')
                .split(','); // ending comma
            i = v.length;
            while (i--) {
                v[i] = '' + (pInt(v[i]) * pick(strokeWidth, NaN));
            }
            value = v.join(',').replace(/NaN/g, 'none'); // #3226
            this.element.setAttribute('stroke-dasharray', value);
        }
    }
    /**
     * Destroy the element and element wrapper and clear up the DOM and event
     * hooks.
     *
     * @function Highcharts.SVGElement#destroy
     */
    destroy() {
        const wrapper = this, element = wrapper.element || {}, renderer = wrapper.renderer, ownerSVGElement = element.ownerSVGElement;
        let parentToClean = (element.nodeName === 'SPAN' &&
            wrapper.parentGroup ||
            void 0), grandParent, i;
        // remove events
        element.onclick = element.onmouseout = element.onmouseover =
            element.onmousemove = element.point = null;
        stop(wrapper); // stop running animations
        if (wrapper.clipPath && ownerSVGElement) {
            const clipPath = wrapper.clipPath;
            // Look for existing references to this clipPath and remove them
            // before destroying the element (#6196).
            // The upper case version is for Edge
            [].forEach.call(ownerSVGElement.querySelectorAll('[clip-path],[CLIP-PATH]'), function (el) {
                if (el.getAttribute('clip-path').indexOf(clipPath.element.id) > -1) {
                    el.removeAttribute('clip-path');
                }
            });
            wrapper.clipPath = clipPath.destroy();
        }
        wrapper.connector = wrapper.connector?.destroy();
        // Destroy stops in case this is a gradient object @todo old code?
        if (wrapper.stops) {
            for (i = 0; i < wrapper.stops.length; i++) {
                wrapper.stops[i].destroy();
            }
            wrapper.stops.length = 0;
            wrapper.stops = void 0;
        }
        // remove element
        wrapper.safeRemoveChild(element);
        // In case of useHTML, clean up empty containers emulating SVG groups
        // (#1960, #2393, #2697).
        while (parentToClean &&
            parentToClean.div &&
            parentToClean.div.childNodes.length === 0) {
            grandParent = parentToClean.parentGroup;
            wrapper.safeRemoveChild(parentToClean.div);
            delete parentToClean.div;
            parentToClean = grandParent;
        }
        // remove from alignObjects
        if (wrapper.alignTo) {
            erase(renderer.alignedObjects, wrapper);
        }
        objectEach(wrapper, function (val, key) {
            // Destroy child elements of a group
            if (wrapper[key] &&
                wrapper[key].parentGroup === wrapper &&
                wrapper[key].destroy) {
                wrapper[key].destroy();
            }
            // Delete all properties
            delete wrapper[key];
        });
        return;
    }
    /**
     * @private
     * @function Highcharts.SVGElement#dSettter
     * @param {number|string|Highcharts.SVGPathArray} value
     * @param {string} key
     * @param {Highcharts.SVGDOMElement} element
     */
    dSetter(value, key, element) {
        if (isArray(value)) {
            // Backwards compatibility, convert one-dimensional array into an
            // array of segments
            if (typeof value[0] === 'string') {
                value = this.renderer.pathToSegments(value);
            }
            this.pathArray = value;
            value = value.reduce((acc, seg, i) => {
                if (!seg || !seg.join) {
                    return (seg || '').toString();
                }
                return (i ? acc + ' ' : '') + seg.join(' ');
            }, '');
        }
        if (/(NaN| {2}|^$)/.test(value)) {
            value = 'M 0 0';
        }
        // Check for cache before resetting. Resetting causes disturbance in the
        // DOM, causing flickering in some cases in Edge/IE (#6747). Also
        // possible performance gain.
        if (this[key] !== value) {
            element.setAttribute(key, value);
            this[key] = value;
        }
    }
    /**
     * @private
     * @function Highcharts.SVGElement#fillSetter
     * @param {Highcharts.ColorType} value
     * @param {string} key
     * @param {Highcharts.SVGDOMElement} element
     */
    fillSetter(value, key, element) {
        if (typeof value === 'string') {
            element.setAttribute(key, value);
        }
        else if (value) {
            this.complexColor(value, key, element);
        }
    }
    /**
     * @private
     * @function Highcharts.SVGElement#hrefSetter
     * @param {Highcharts.ColorType} value
     * @param {string} key
     * @param {Highcharts.SVGDOMElement} element
     */
    hrefSetter(value, key, element) {
        // Namespace is needed for offline export, #19106
        element.setAttributeNS('http://www.w3.org/1999/xlink', key, value);
    }
    /**
     * Get the bounding box (width, height, x and y) for the element. Generally
     * used to get rendered text size. Since this is called a lot in charts,
     * the results are cached based on text properties, in order to save DOM
     * traffic. The returned bounding box includes the rotation, so for example
     * a single text line of rotation 90 will report a greater height, and a
     * width corresponding to the line-height.
     *
     * @sample highcharts/members/renderer-on-chart/
     *         Draw a rectangle based on a text's bounding box
     *
     * @function Highcharts.SVGElement#getBBox
     *
     * @param {boolean} [reload]
     *        Skip the cache and get the updated DOM bouding box.
     *
     * @param {number} [rot]
     *        Override the element's rotation. This is internally used on axis
     *        labels with a value of 0 to find out what the bounding box would
     *        be have been if it were not rotated.
     *
     * @return {Highcharts.BBoxObject}
     *         The bounding box with `x`, `y`, `width` and `height` properties.
     */
    getBBox(reload, rot) {
        const wrapper = this, { alignValue, element, renderer, styles, textStr } = wrapper, { cache, cacheKeys } = renderer, isSVG = element.namespaceURI === wrapper.SVG_NS, rotation = pick(rot, wrapper.rotation, 0), fontSize = renderer.styledMode ? (element &&
            SVGElement.prototype.getStyle.call(element, 'font-size')) : (styles && styles.fontSize);
        let bBox, width, height, toggleTextShadowShim, cacheKey;
        // Avoid undefined and null (#7316)
        if (defined(textStr)) {
            cacheKey = textStr.toString();
            // Since numbers are monospaced, and numerical labels appear a lot
            // in a chart, we assume that a label of n characters has the same
            // bounding box as others of the same length. Unless there is inner
            // HTML in the label. In that case, leave the numbers as is (#5899).
            if (cacheKey.indexOf('<') === -1) {
                cacheKey = cacheKey.replace(/[0-9]/g, '0');
            }
            // Properties that affect bounding box
            cacheKey += [
                '',
                renderer.rootFontSize,
                fontSize,
                rotation,
                wrapper.textWidth,
                alignValue,
                styles && styles.textOverflow,
                styles && styles.fontWeight // #12163
            ].join(',');
        }
        if (cacheKey && !reload) {
            bBox = cache[cacheKey];
        }
        // No cache found
        if (!bBox) {
            // SVG elements
            if (isSVG || renderer.forExport) {
                try { // Fails in Firefox if the container has display: none.
                    // When the text shadow shim is used, we need to hide the
                    // fake shadows to get the correct bounding box (#3872)
                    toggleTextShadowShim = this.fakeTS && function (display) {
                        const outline = element.querySelector('.highcharts-text-outline');
                        if (outline) {
                            css(outline, { display });
                        }
                    };
                    // Workaround for #3842, Firefox reporting wrong bounding
                    // box for shadows
                    if (isFunction(toggleTextShadowShim)) {
                        toggleTextShadowShim('none');
                    }
                    bBox = element.getBBox ?
                        // SVG: use extend because IE9 is not allowed to change
                        // width and height in case of rotation (below)
                        extend({}, element.getBBox()) : {
                        // HTML elements with `exporting.allowHTML` and
                        // legacy IE in export mode
                        width: element.offsetWidth,
                        height: element.offsetHeight,
                        x: 0,
                        y: 0
                    };
                    // #3842
                    if (isFunction(toggleTextShadowShim)) {
                        toggleTextShadowShim('');
                    }
                }
                catch (e) {
                    '';
                }
                // If the bBox is not set, the try-catch block above failed. The
                // other condition is for Opera that returns a width of
                // -Infinity on hidden elements.
                if (!bBox || bBox.width < 0) {
                    bBox = { x: 0, y: 0, width: 0, height: 0 };
                }
                // useHTML within SVG
            }
            else {
                bBox = wrapper.htmlGetBBox();
            }
            // True SVG elements as well as HTML elements in modern browsers
            // using the .useHTML option need to compensated for rotation
            width = bBox.width;
            height = bBox.height;
            // Workaround for wrong bounding box in IE, Edge and Chrome on
            // Windows. With Highcharts' default font, IE and Edge report
            // a box height of 16.899 and Chrome rounds it to 17. If this
            // stands uncorrected, it results in more padding added below
            // the text than above when adding a label border or background.
            // Also vertical positioning is affected.
            // https://jsfiddle.net/highcharts/em37nvuj/
            // (#1101, #1505, #1669, #2568, #6213).
            if (isSVG) {
                bBox.height = height = ({
                    '11px,17': 14,
                    '13px,20': 16
                }[`${fontSize || ''},${Math.round(height)}`] ||
                    height);
            }
            // Adjust for rotated text
            if (rotation) {
                const baseline = Number(element.getAttribute('y') || 0) - bBox.y, alignFactor = {
                    'right': 1,
                    'center': 0.5
                }[alignValue || 0] || 0, rad = rotation * deg2rad, rad90 = (rotation - 90) * deg2rad, wCosRad = width * Math.cos(rad), wSinRad = width * Math.sin(rad), cosRad90 = Math.cos(rad90), sinRad90 = Math.sin(rad90), 
                // Find the starting point on the left side baseline of
                // the text
                pX = bBox.x + alignFactor * (width - wCosRad), pY = bBox.y + baseline - alignFactor * wSinRad, 
                // Find all corners
                aX = pX + baseline * cosRad90, bX = aX + wCosRad, cX = bX - height * cosRad90, dX = cX - wCosRad, aY = pY + baseline * sinRad90, bY = aY + wSinRad, cY = bY - height * sinRad90, dY = cY - wSinRad;
                // Deduct the bounding box from the corners
                bBox.x = Math.min(aX, bX, cX, dX);
                bBox.y = Math.min(aY, bY, cY, dY);
                bBox.width = Math.max(aX, bX, cX, dX) - bBox.x;
                bBox.height = Math.max(aY, bY, cY, dY) - bBox.y;
            }
        }
        // Cache it. When loading a chart in a hidden iframe in Firefox and
        // IE/Edge, the bounding box height is 0, so don't cache it (#5620).
        if (cacheKey && (textStr === '' || bBox.height > 0)) {
            // Rotate (#4681)
            while (cacheKeys.length > 250) {
                delete cache[cacheKeys.shift()];
            }
            if (!cache[cacheKey]) {
                cacheKeys.push(cacheKey);
            }
            cache[cacheKey] = bBox;
        }
        return bBox;
    }
    /**
     * Get the computed style. Only in styled mode.
     *
     * @example
     * chart.series[0].points[0].graphic.getStyle('stroke-width'); // => '1px'
     *
     * @function Highcharts.SVGElement#getStyle
     *
     * @param {string} prop
     *        The property name to check for.
     *
     * @return {string}
     *         The current computed value.
     */
    getStyle(prop) {
        return win
            .getComputedStyle(this.element || this, '')
            .getPropertyValue(prop);
    }
    /**
     * Check if an element has the given class name.
     *
     * @function Highcharts.SVGElement#hasClass
     *
     * @param {string} className
     * The class name to check for.
     *
     * @return {boolean}
     * Whether the class name is found.
     */
    hasClass(className) {
        return ('' + this.attr('class'))
            .split(' ')
            .indexOf(className) !== -1;
    }
    /**
     * Hide the element, similar to setting the `visibility` attribute to
     * `hidden`.
     *
     * @function Highcharts.SVGElement#hide
     *
     * @return {Highcharts.SVGElement}
     *         Returns the SVGElement for chaining.
     */
    hide() {
        return this.attr({ visibility: 'hidden' });
    }
    /**
     * @private
     */
    htmlGetBBox() {
        return { height: 0, width: 0, x: 0, y: 0 };
    }
    /**
     * Initialize the SVG element. This function only exists to make the
     * initialization process overridable. It should not be called directly.
     *
     * @function Highcharts.SVGElement#init
     *
     * @param {Highcharts.SVGRenderer} renderer
     * The SVGRenderer instance to initialize to.
     *
     * @param {string} nodeName
     * The SVG node name.
     */
    init(renderer, nodeName) {
        /**
         * The primary DOM node. Each `SVGElement` instance wraps a main DOM
         * node, but may also represent more nodes.
         *
         * @name Highcharts.SVGElement#element
         * @type {Highcharts.SVGDOMElement|Highcharts.HTMLDOMElement}
         */
        this.element = nodeName === 'span' ?
            createElement(nodeName) :
            doc.createElementNS(this.SVG_NS, nodeName);
        /**
         * The renderer that the SVGElement belongs to.
         *
         * @name Highcharts.SVGElement#renderer
         * @type {Highcharts.SVGRenderer}
         */
        this.renderer = renderer;
        fireEvent(this, 'afterInit');
    }
    /**
     * Add an event listener. This is a simple setter that replaces the
     * previous event of the same type added by this function, as opposed to
     * the {@link Highcharts#addEvent} function.
     *
     * @sample highcharts/members/element-on/
     *         A clickable rectangle
     *
     * @function Highcharts.SVGElement#on
     *
     * @param {string} eventType
     * The event type.
     *
     * @param {Function} handler
     * The handler callback.
     *
     * @return {Highcharts.SVGElement}
     * The SVGElement for chaining.
     */
    on(eventType, handler) {
        const { onEvents } = this;
        if (onEvents[eventType]) {
            // Unbind existing event
            onEvents[eventType]();
        }
        onEvents[eventType] = addEvent(this.element, eventType, handler);
        return this;
    }
    /**
     * @private
     * @function Highcharts.SVGElement#opacitySetter
     * @param {string} value
     * @param {string} key
     * @param {Highcharts.SVGDOMElement} element
     */
    opacitySetter(value, key, element) {
        // Round off to avoid float errors, like tests where opacity lands on
        // 9.86957e-06 instead of 0
        const opacity = Number(Number(value).toFixed(3));
        this.opacity = opacity;
        element.setAttribute(key, opacity);
    }
    /**
     * Remove a class name from the element.
     *
     * @function Highcharts.SVGElement#removeClass
     *
     * @param {string|RegExp} className
     *        The class name to remove.
     *
     * @return {Highcharts.SVGElement} Returns the SVG element for chainability.
     */
    removeClass(className) {
        return this.attr('class', ('' + this.attr('class'))
            .replace(isString(className) ?
            new RegExp(`(^| )${className}( |$)`) : // #12064, #13590
            className, ' ')
            .replace(/ +/g, ' ')
            .trim());
    }
    /**
     *
     * @private
     */
    removeTextOutline() {
        const outline = this.element
            .querySelector('tspan.highcharts-text-outline');
        if (outline) {
            this.safeRemoveChild(outline);
        }
    }
    /**
     * Removes an element from the DOM.
     *
     * @private
     * @function Highcharts.SVGElement#safeRemoveChild
     *
     * @param {Highcharts.SVGDOMElement|Highcharts.HTMLDOMElement} element
     * The DOM node to remove.
     */
    safeRemoveChild(element) {
        const parentNode = element.parentNode;
        if (parentNode) {
            parentNode.removeChild(element);
        }
    }
    /**
     * Set the coordinates needed to draw a consistent radial gradient across
     * a shape regardless of positioning inside the chart. Used on pie slices
     * to make all the slices have the same radial reference point.
     *
     * @function Highcharts.SVGElement#setRadialReference
     *
     * @param {Array<number>} coordinates
     * The center reference. The format is `[centerX, centerY, diameter]` in
     * pixels.
     *
     * @return {Highcharts.SVGElement}
     * Returns the SVGElement for chaining.
     */
    setRadialReference(coordinates) {
        const existingGradient = (this.element.gradient &&
            this.renderer.gradients[this.element.gradient]);
        this.element.radialReference = coordinates;
        // On redrawing objects with an existing gradient, the gradient needs
        // to be repositioned (#3801)
        if (existingGradient && existingGradient.radAttr) {
            existingGradient.animate(this.renderer.getRadialAttr(coordinates, existingGradient.radAttr));
        }
        return this;
    }
    /**
     * Set a text path for a `text` or `label` element, allowing the text to
     * flow along a path.
     *
     * In order to unset the path for an existing element, call `setTextPath`
     * with `{ enabled: false }` as the second argument.
     *
     * @sample highcharts/members/renderer-textpath/ Text path demonstrated
     *
     * @function Highcharts.SVGElement#setTextPath
     *
     * @param {Highcharts.SVGElement|undefined} path
     *        Path to follow. If undefined, it allows changing options for the
     *        existing path.
     *
     * @param {Highcharts.DataLabelsTextPathOptionsObject} textPathOptions
     *        Options.
     *
     * @return {Highcharts.SVGElement} Returns the SVGElement for chaining.
     */
    setTextPath(path, textPathOptions) {
        // Defaults
        textPathOptions = merge(true, {
            enabled: true,
            attributes: {
                dy: -5,
                startOffset: '50%',
                textAnchor: 'middle'
            }
        }, textPathOptions);
        const url = this.renderer.url, textWrapper = this.text || this, textPath = textWrapper.textPath, { attributes, enabled } = textPathOptions;
        path = path || (textPath && textPath.path);
        // Remove previously added event
        if (textPath) {
            textPath.undo();
        }
        if (path && enabled) {
            const undo = addEvent(textWrapper, 'afterModifyTree', (e) => {
                if (path && enabled) {
                    // Set ID for the path
                    let textPathId = path.attr('id');
                    if (!textPathId) {
                        path.attr('id', textPathId = uniqueKey());
                    }
                    // Set attributes for the <text>
                    const textAttribs = {
                        // dx/dy options must by set on <text> (parent), the
                        // rest should be set on <textPath>
                        x: 0,
                        y: 0
                    };
                    if (defined(attributes.dx)) {
                        textAttribs.dx = attributes.dx;
                        delete attributes.dx;
                    }
                    if (defined(attributes.dy)) {
                        textAttribs.dy = attributes.dy;
                        delete attributes.dy;
                    }
                    textWrapper.attr(textAttribs);
                    // Handle label properties
                    this.attr({ transform: '' });
                    if (this.box) {
                        this.box = this.box.destroy();
                    }
                    // Wrap the nodes in a textPath
                    const children = e.nodes.slice(0);
                    e.nodes.length = 0;
                    e.nodes[0] = {
                        tagName: 'textPath',
                        attributes: extend(attributes, {
                            'text-anchor': attributes.textAnchor,
                            href: `${url}#${textPathId}`
                        }),
                        children
                    };
                }
            });
            // Set the reference
            textWrapper.textPath = { path, undo };
        }
        else {
            textWrapper.attr({ dx: 0, dy: 0 });
            delete textWrapper.textPath;
        }
        if (this.added) {
            // Rebuild text after added
            textWrapper.textCache = '';
            this.renderer.buildText(textWrapper);
        }
        return this;
    }
    /**
     * Add a shadow to the element. In styled mode, this method is not used,
     * instead use `defs` and filters.
     *
     * @example
     * renderer.rect(10, 100, 100, 100)
     *     .attr({ fill: 'red' })
     *     .shadow(true);
     *
     * @function Highcharts.SVGElement#shadow
     *
     * @param {boolean|Highcharts.ShadowOptionsObject} [shadowOptions] The
     *        shadow options. If `true`, the default options are applied. If
     *        `false`, the current shadow will be removed.
     *
     * @return {Highcharts.SVGElement} Returns the SVGElement for chaining.
     */
    shadow(shadowOptions) {
        const { renderer } = this, options = merge(this.parentGroup?.rotation === 90 ? {
            offsetX: -1,
            offsetY: -1
        } : {}, isObject(shadowOptions) ? shadowOptions : {}), id = renderer.shadowDefinition(options);
        return this.attr({
            filter: shadowOptions ?
                `url(${renderer.url}#${id})` :
                'none'
        });
    }
    /**
     * Show the element after it has been hidden.
     *
     * @function Highcharts.SVGElement#show
     *
     * @param {boolean} [inherit=true]
     *        Set the visibility attribute to `inherit` rather than `visible`.
     *        The difference is that an element with `visibility="visible"`
     *        will be visible even if the parent is hidden.
     *
     * @return {Highcharts.SVGElement}
     *         Returns the SVGElement for chaining.
     */
    show(inherit = true) {
        return this.attr({ visibility: inherit ? 'inherit' : 'visible' });
    }
    /**
     * Set the stroke-width and record it on the SVGElement
     *
     * @private
     * @function Highcharts.SVGElement#strokeSetter
     * @param {number|string|ColorType} value
     * @param {string} key
     * @param {Highcharts.SVGDOMElement} element
     */
    'stroke-widthSetter'(value, key, element) {
        // Record it for quick access in getter
        this[key] = value;
        element.setAttribute(key, value);
    }
    /**
     * Get the computed stroke width in pixel values. This is used extensively
     * when drawing shapes to ensure the shapes are rendered crisp and
     * positioned correctly relative to each other. Using
     * `shape-rendering: crispEdges` leaves us less control over positioning,
     * for example when we want to stack columns next to each other, or position
     * things pixel-perfectly within the plot box.
     *
     * The common pattern when placing a shape is:
     * - Create the SVGElement and add it to the DOM. In styled mode, it will
     *   now receive a stroke width from the style sheet. In classic mode we
     *   will add the `stroke-width` attribute.
     * - Read the computed `elem.strokeWidth()`.
     * - Place it based on the stroke width.
     *
     * @function Highcharts.SVGElement#strokeWidth
     *
     * @return {number}
     * The stroke width in pixels. Even if the given stroke widtch (in CSS or by
     * attributes) is based on `em` or other units, the pixel size is returned.
     */
    strokeWidth() {
        // In non-styled mode, read the stroke width as set by .attr
        if (!this.renderer.styledMode) {
            return this['stroke-width'] || 0;
        }
        // In styled mode, read computed stroke width
        const val = this.getStyle('stroke-width');
        let ret = 0, dummy;
        // Read pixel values directly
        if (val.indexOf('px') === val.length - 2) {
            ret = pInt(val);
            // Other values like em, pt etc need to be measured
        }
        else if (val !== '') {
            dummy = doc.createElementNS(SVG_NS, 'rect');
            attr(dummy, {
                width: val,
                'stroke-width': 0
            });
            this.element.parentNode.appendChild(dummy);
            ret = dummy.getBBox().width;
            dummy.parentNode.removeChild(dummy);
        }
        return ret;
    }
    /**
     * If one of the symbol size affecting parameters are changed,
     * check all the others only once for each call to an element's
     * .attr() method
     *
     * @private
     * @function Highcharts.SVGElement#symbolAttr
     *
     * @param {Highcharts.SVGAttributes} hash
     * The attributes to set.
     */
    symbolAttr(hash) {
        const wrapper = this;
        SVGElement.symbolCustomAttribs.forEach(function (key) {
            wrapper[key] = pick(hash[key], wrapper[key]);
        });
        wrapper.attr({
            d: wrapper.renderer.symbols[wrapper.symbolName](wrapper.x, wrapper.y, wrapper.width, wrapper.height, wrapper)
        });
    }
    /**
     * @private
     * @function Highcharts.SVGElement#textSetter
     * @param {string} value
     */
    textSetter(value) {
        if (value !== this.textStr) {
            // Delete size caches when the text changes
            // delete this.bBox; // old code in series-label
            delete this.textPxLength;
            this.textStr = value;
            if (this.added) {
                this.renderer.buildText(this);
            }
        }
    }
    /**
     * @private
     * @function Highcharts.SVGElement#titleSetter
     * @param {string} value
     */
    titleSetter(value) {
        const el = this.element;
        const titleNode = el.getElementsByTagName('title')[0] ||
            doc.createElementNS(this.SVG_NS, 'title');
        // Move to first child
        if (el.insertBefore) {
            el.insertBefore(titleNode, el.firstChild);
        }
        else {
            el.appendChild(titleNode);
        }
        // Replace text content and escape markup
        titleNode.textContent =
            // #3276, #3895
            String(pick(value, ''))
                .replace(/<[^>]*>/g, '')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>');
    }
    /**
     * Bring the element to the front. Alternatively, a new zIndex can be set.
     *
     * @sample highcharts/members/element-tofront/
     *         Click an element to bring it to front
     *
     * @function Highcharts.SVGElement#toFront
     *
     * @return {Highcharts.SVGElement}
     * Returns the SVGElement for chaining.
     */
    toFront() {
        const element = this.element;
        element.parentNode.appendChild(element);
        return this;
    }
    /**
     * Move an object and its children by x and y values.
     *
     * @function Highcharts.SVGElement#translate
     *
     * @param {number} x
     * The x value.
     *
     * @param {number} y
     * The y value.
     *
     * @return {Highcharts.SVGElement}
     * Translated element.
     */
    translate(x, y) {
        return this.attr({
            translateX: x,
            translateY: y
        });
    }
    /**
     * Update the transform attribute based on internal properties. Deals with
     * the custom `translateX`, `translateY`, `rotation`, `scaleX` and `scaleY`
     * attributes and updates the SVG `transform` attribute.
     *
     * @private
     * @function Highcharts.SVGElement#updateTransform
     */
    updateTransform() {
        const { element, matrix, rotation = 0, scaleX, scaleY, translateX = 0, translateY = 0 } = this;
        // Apply translate. Nearly all transformed elements have translation,
        // so instead of checking for translate = 0, do it always (#1767,
        // #1846).
        const transform = ['translate(' + translateX + ',' + translateY + ')'];
        // apply matrix
        if (defined(matrix)) {
            transform.push('matrix(' + matrix.join(',') + ')');
        }
        // Apply rotation
        if (rotation) { // text rotation or inverted chart
            transform.push('rotate(' + rotation + ' ' +
                pick(this.rotationOriginX, element.getAttribute('x'), 0) +
                ' ' +
                pick(this.rotationOriginY, element.getAttribute('y') || 0) + ')');
        }
        // apply scale
        if (defined(scaleX) || defined(scaleY)) {
            transform.push('scale(' + pick(scaleX, 1) + ' ' + pick(scaleY, 1) + ')');
        }
        if (transform.length && !(this.text || this).textPath) {
            element.setAttribute('transform', transform.join(' '));
        }
    }
    /**
     * @private
     * @function Highcharts.SVGElement#visibilitySetter
     *
     * @param {string} value
     *
     * @param {string} key
     *
     * @param {Highcharts.SVGDOMElement} element
     *
     */
    visibilitySetter(value, key, element) {
        // IE9-11 doesn't handle visibilty:inherit well, so we remove the
        // attribute instead (#2881, #3909)
        if (value === 'inherit') {
            element.removeAttribute(key);
        }
        else if (this[key] !== value) { // #6747
            element.setAttribute(key, value);
        }
        this[key] = value;
    }
    /**
     * @private
     * @function Highcharts.SVGElement#xGetter
     */
    xGetter(key) {
        if (this.element.nodeName === 'circle') {
            if (key === 'x') {
                key = 'cx';
            }
            else if (key === 'y') {
                key = 'cy';
            }
        }
        return this._defaultGetter(key);
    }
    /**
     * @private
     * @function Highcharts.SVGElement#zIndexSetter
     */
    zIndexSetter(value, key) {
        const renderer = this.renderer, parentGroup = this.parentGroup, parentWrapper = parentGroup || renderer, parentNode = parentWrapper.element || renderer.box, element = this.element, svgParent = parentNode === renderer.box;
        let childNodes, otherElement, otherZIndex, inserted = false, undefinedOtherZIndex, run = this.added, i;
        if (defined(value)) {
            // So we can read it for other elements in the group
            element.setAttribute('data-z-index', value);
            value = +value;
            if (this[key] === value) {
                // Only update when needed (#3865)
                run = false;
            }
        }
        else if (defined(this[key])) {
            element.removeAttribute('data-z-index');
        }
        this[key] = value;
        // Insert according to this and other elements' zIndex. Before .add() is
        // called, nothing is done. Then on add, or by later calls to
        // zIndexSetter, the node is placed on the right place in the DOM.
        if (run) {
            value = this.zIndex;
            if (value && parentGroup) {
                parentGroup.handleZ = true;
            }
            childNodes = parentNode.childNodes;
            for (i = childNodes.length - 1; i >= 0 && !inserted; i--) {
                otherElement = childNodes[i];
                otherZIndex = otherElement.getAttribute('data-z-index');
                undefinedOtherZIndex = !defined(otherZIndex);
                if (otherElement !== element) {
                    if (
                    // Negative zIndex versus no zIndex:
                    // On all levels except the highest. If the parent is
                    // <svg>, then we don't want to put items before <desc>
                    // or <defs>
                    value < 0 &&
                        undefinedOtherZIndex &&
                        !svgParent &&
                        !i) {
                        parentNode.insertBefore(element, childNodes[i]);
                        inserted = true;
                    }
                    else if (
                    // Insert after the first element with a lower zIndex
                    pInt(otherZIndex) <= value ||
                        // If negative zIndex, add this before first undefined
                        // zIndex element
                        (undefinedOtherZIndex &&
                            (!defined(value) || value >= 0))) {
                        parentNode.insertBefore(element, childNodes[i + 1]);
                        inserted = true;
                    }
                }
            }
            if (!inserted) {
                parentNode.insertBefore(element, childNodes[svgParent ? 3 : 0]);
                inserted = true;
            }
        }
        return inserted;
    }
}
// Custom attributes used for symbols, these should be filtered out when
// setting SVGElement attributes (#9375).
SVGElement.symbolCustomAttribs = [
    'anchorX',
    'anchorY',
    'clockwise',
    'end',
    'height',
    'innerR',
    'r',
    'start',
    'width',
    'x',
    'y'
];
// Some shared setters and getters
SVGElement.prototype.strokeSetter = SVGElement.prototype.fillSetter;
SVGElement.prototype.yGetter = SVGElement.prototype.xGetter;
SVGElement.prototype.matrixSetter =
    SVGElement.prototype.rotationOriginXSetter =
        SVGElement.prototype.rotationOriginYSetter =
            SVGElement.prototype.rotationSetter =
                SVGElement.prototype.scaleXSetter =
                    SVGElement.prototype.scaleYSetter =
                        SVGElement.prototype.translateXSetter =
                            SVGElement.prototype.translateYSetter =
                                SVGElement.prototype.verticalAlignSetter = function (value, key) {
                                    this[key] = value;
                                    this.doTransform = true;
                                };
/* *
 *
 *  Default Export
 *
 * */
export default SVGElement;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Reference to the global SVGElement class as a workaround for a name conflict
 * in the Highcharts namespace.
 *
 * @global
 * @typedef {global.SVGElement} GlobalSVGElement
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SVGElement
 */
/**
 * The horizontal alignment of an element.
 *
 * @typedef {"center"|"left"|"right"} Highcharts.AlignValue
 */
/**
 * Options to align the element relative to the chart or another box.
 *
 * @interface Highcharts.AlignObject
 */ /**
* Horizontal alignment. Can be one of `left`, `center` and `right`.
*
* @name Highcharts.AlignObject#align
* @type {Highcharts.AlignValue|undefined}
*
* @default left
*/ /**
* Vertical alignment. Can be one of `top`, `middle` and `bottom`.
*
* @name Highcharts.AlignObject#verticalAlign
* @type {Highcharts.VerticalAlignValue|undefined}
*
* @default top
*/ /**
* Horizontal pixel offset from alignment.
*
* @name Highcharts.AlignObject#x
* @type {number|undefined}
*
* @default 0
*/ /**
* Vertical pixel offset from alignment.
*
* @name Highcharts.AlignObject#y
* @type {number|undefined}
*
* @default 0
*/ /**
* Use the `transform` attribute with translateX and translateY custom
* attributes to align this elements rather than `x` and `y` attributes.
*
* @name Highcharts.AlignObject#alignByTranslate
* @type {boolean|undefined}
*
* @default false
*/
/**
 * Bounding box of an element.
 *
 * @interface Highcharts.BBoxObject
 * @extends Highcharts.PositionObject
 */ /**
* Height of the bounding box.
*
* @name Highcharts.BBoxObject#height
* @type {number}
*/ /**
* Width of the bounding box.
*
* @name Highcharts.BBoxObject#width
* @type {number}
*/ /**
* Horizontal position of the bounding box.
*
* @name Highcharts.BBoxObject#x
* @type {number}
*/ /**
* Vertical position of the bounding box.
*
* @name Highcharts.BBoxObject#y
* @type {number}
*/
/**
 * An object of key-value pairs for SVG attributes. Attributes in Highcharts
 * elements for the most parts correspond to SVG, but some are specific to
 * Highcharts, like `zIndex`, `rotation`, `rotationOriginX`,
 * `rotationOriginY`, `translateX`, `translateY`, `scaleX` and `scaleY`. SVG
 * attributes containing a hyphen are _not_ camel-cased, they should be
 * quoted to preserve the hyphen.
 *
 * @example
 * {
 *     'stroke': '#ff0000', // basic
 *     'stroke-width': 2, // hyphenated
 *     'rotation': 45 // custom
 *     'd': ['M', 10, 10, 'L', 30, 30, 'z'] // path definition, note format
 * }
 *
 * @interface Highcharts.SVGAttributes
 */ /**
* @name Highcharts.SVGAttributes#[key:string]
* @type {*}
*/ /**
* @name Highcharts.SVGAttributes#d
* @type {string|Highcharts.SVGPathArray|undefined}
*/ /**
* @name Highcharts.SVGAttributes#dx
* @type {number|undefined}
*/ /**
* @name Highcharts.SVGAttributes#dy
* @type {number|undefined}
*/ /**
* @name Highcharts.SVGAttributes#fill
* @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject|undefined}
*/ /**
* @name Highcharts.SVGAttributes#inverted
* @type {boolean|undefined}
*/ /**
* @name Highcharts.SVGAttributes#matrix
* @type {Array<number>|undefined}
*/ /**
* @name Highcharts.SVGAttributes#rotation
* @type {number|undefined}
*/ /**
* @name Highcharts.SVGAttributes#rotationOriginX
* @type {number|undefined}
*/ /**
* @name Highcharts.SVGAttributes#rotationOriginY
* @type {number|undefined}
*/ /**
* @name Highcharts.SVGAttributes#scaleX
* @type {number|undefined}
*/ /**
* @name Highcharts.SVGAttributes#scaleY
* @type {number|undefined}
*/ /**
* @name Highcharts.SVGAttributes#stroke
* @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject|undefined}
*/ /**
* @name Highcharts.SVGAttributes#style
* @type {string|Highcharts.CSSObject|undefined}
*/ /**
* @name Highcharts.SVGAttributes#translateX
* @type {number|undefined}
*/ /**
* @name Highcharts.SVGAttributes#translateY
* @type {number|undefined}
*/ /**
* @name Highcharts.SVGAttributes#zIndex
* @type {number|undefined}
*/
/**
 * An SVG DOM element. The type is a reference to the regular SVGElement in the
 * global scope.
 *
 * @typedef {globals.GlobalSVGElement} Highcharts.SVGDOMElement
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SVGElement
 */
/**
 * The vertical alignment of an element.
 *
 * @typedef {"bottom"|"middle"|"top"} Highcharts.VerticalAlignValue
 */
''; // keeps doclets above in JS file
