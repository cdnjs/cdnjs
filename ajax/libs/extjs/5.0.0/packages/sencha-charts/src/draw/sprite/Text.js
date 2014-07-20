/**
 * @class Ext.draw.sprite.Text
 * @extends Ext.draw.sprite.Sprite
 *
 * A sprite that represents text.
 *
 *     @example preview miniphone
 *     var container = new Ext.draw.Container({
 *       items: [{
 *         type: 'text',
 *         x: 50,
 *         y: 50,
 *         text: 'Sencha',
 *         fontSize: 18,
 *         fillStyle: 'blue'
 *       }]
 *     });
 *     Ext.Viewport.setLayout('fit');
 *     Ext.Viewport.add(container);
 */
Ext.define('Ext.draw.sprite.Text', {
    extend: 'Ext.draw.sprite.Sprite',
    requires: ['Ext.draw.TextMeasurer'],
    alias: 'sprite.text',
    type: 'text',
    lineBreakRe: /\n/g,
    //<debug>
    statics: {
        /**
         * Debug rendering options:
         *
         * debug: {
         *     bbox: true // renders the bounding box of the text sprite
         * }
         *
         */
        debug: false
    },
    //</debug>
    inheritableStatics: {
        shortHand1Re: /'(.*)'/g,
        shortHand2Re: / /g,
        shortHand3Re: /\s*,\s*/g,
        shortHand4Re: /\$\$\$\$/g,
        def: {
            processors: {
                /**
                 * @cfg {Number} [x=0] The position of the sprite on the x-axis.
                 */
                x: 'number',

                /**
                 * @cfg {Number} [y=0] The position of the sprite on the y-axis.
                 */
                y: 'number',

                /**
                 * @cfg {String} [text=''] The text represented in the sprite.
                 */
                text: 'string',

                /**
                 * @cfg {String/Number} [fontSize='10px'] The size of the font displayed.
                 */
                fontSize: function (n) {
                    if (!isNaN(n)) {
                        return +n + 'px';
                    } else if (n.match(Ext.dom.Element.unitRe)) {
                        return n;
                    }
                },

                /**
                 * @cfg {String} [fontStyle=''] The style of the font displayed. {normal, italic, oblique}
                 */
                fontStyle: 'enums(,italic,oblique)',

                /**
                 * @cfg {String} [fontVariant=''] The variant of the font displayed. {normal, small-caps}
                 */
                fontVariant: 'enums(,small-caps)',

                /**
                 * @cfg {String} [fontWeight=''] The weight of the font displayed. {normal, bold, bolder, lighter}
                 */
                fontWeight: (function (fontWeights) {
                    return function (n) {
                        if (!n) {
                            return '';
                        } else if (n === 'normal') {
                            return '';
                        } else if (!isNaN(n)) {
                            n = +n;
                            if (100 <= n && n <= 900) {
                                return n;
                            }
                        } else if (n in fontWeights) {
                            return n;
                        }
                    };
                })({
                    normal: true,
                    bold: true,
                    bolder: true,
                    lighter: true
                }),

                /**
                 * @cfg {String} [fontFamily='sans-serif'] The family of the font displayed.
                 */
                fontFamily: 'string',

                /**
                 * @cfg {String} [textAlign='start'] The alignment of the text displayed. {left, right, center, start, end}
                 */
                textAlign: (function (textAligns) {
                    return function (n) {
                        if (!n) {
                            return 'center';
                        } else {
                            return textAligns[n];
                        }
                    };
                })({
                    start: 'start',
                    left: 'start',
                    center: 'center',
                    middle: 'center',
                    end: 'end',
                    right: 'end'
                }),

                /**
                 * @cfg {String} [textBaseline="alphabetic"] The baseline of the text displayed. {top, hanging, middle, alphabetic, ideographic, bottom}
                 */
                textBaseline: (function (textBaselines) {
                    return function (n) {
                        if (n === false) {
                            return 'alphabetic';
                        } else if (n in textBaselines) {
                            return n;
                        } else if (n === 'center') {
                            return 'middle';
                        }
                    };
                })({
                    top: true,
                    hanging: true,
                    middle: true,
                    alphabetic: true,
                    ideographic: true,
                    bottom: true
                }),

                /**
                 * @cfg {String} [font='10px sans-serif'] The font displayed.
                 */
                font: "string"
                //<debug>
                ,debug: 'default'
                //</debug>
            },
            aliases: {
                'font-size': 'fontSize',
                'font-family': 'fontFamily',
                'font-weight': 'fontWeight',
                'font-variant': 'fontVariant',
                'text-anchor': 'textAlign'
            },
            defaults: {
                fontStyle: '',
                fontVariant: '',
                fontWeight: '',
                fontSize: '10px',
                fontFamily: 'sans-serif',
                font: '10px sans-serif',
                textBaseline: 'alphabetic',
                textAlign: 'start',
                strokeStyle: 'rgba(0, 0, 0, 0)',
                divBased: true,
                fillStyle: '#000',
                x: 0,
                y: 0,
                text: ''
            },
            dirtyTriggers: {
                fontStyle: 'font,bbox',
                fontVariant: 'font,bbox',
                fontWeight: 'font,bbox',
                fontSize: 'font,bbox',
                fontFamily: 'font,bbox',
                font: 'font-short-hand,bbox,canvas',
                textBaseline: 'bbox',
                textAlign: 'bbox',
                x: 'bbox',
                y: 'bbox',
                text: 'bbox'
            },
            updaters: {
                'font-short-hand': (function (dispatcher) {
                    return function (attrs) {
                        // TODO: Do this according to http://www.w3.org/TR/CSS21/fonts.html#font-shorthand
                        var value = attrs.font,
                            parts, part, i, ln, dispKey;
                        value = value.replace(Ext.draw.sprite.Text.shortHand1Re, function (a, arg1) {
                            return arg1.replace(Ext.draw.sprite.Text.shortHand2Re, '$$$$');
                        });
                        value = value.replace(Ext.draw.sprite.Text.shortHand3Re, ',');
                        parts = value.split(' ');

                        attrs = {};
                        for (i = 0, ln = parts.length; i < ln; i++) {
                            part = parts[i];
                            dispKey = dispatcher[part];
                            if (dispKey) {
                                attrs[dispKey] = part;
                            } else if (part.match(Ext.dom.Element.unitRe)) {
                                attrs.fontSize = part;
                            } else {
                                attrs.fontFamily = part.replace(Ext.draw.sprite.Text.shortHand4Re, ' ');
                            }
                        }
                        this.setAttributes(attrs, true);
                    };
                })({
                    'italic': 'fontStyle',
                    'oblique': 'fontStyle',
                    'bold': 'fontWeight',
                    'bolder': 'fontWeight',
                    'lighter': 'fontWeight',
                    '100': 'fontWeight',
                    '200': 'fontWeight',
                    '300': 'fontWeight',
                    '400': 'fontWeight',
                    '500': 'fontWeight',
                    '600': 'fontWeight',
                    '700': 'fontWeight',
                    '800': 'fontWeight',
                    '900': 'fontWeight',
                    'small-caps': 'fontVariant'
                }),
                font: function (attrs) {
                    var font = '';
                    if (attrs.fontWeight) {
                        font += attrs.fontWeight + ' ';
                    }
                    if (attrs.fontVariant) {
                        font += attrs.fontVariant + ' ';
                    }
                    if (attrs.fontSize) {
                        font += attrs.fontSize + ' ';
                    }
                    if (attrs.fontFamily) {
                        font += attrs.fontFamily + ' ';
                    }
                    this.setAttributes({
                        font: font.substr(0, font.length - 1)
                    }, true);
                }
            }
        }
    },

    constructor: function (config) {
        Ext.draw.sprite.Sprite.prototype.constructor.call(this, config);
    },

    // Overriding the getBBox method of the abstract sprite here to always
    // recalculate the bounding box of the text in flipped RTL mode
    // because in that case the position of the sprite depends not just on
    // the value of its 'x' attribute, but also on the width of the surface
    // the sprite belongs to.
    getBBox: function (isWithoutTransform) {
        var me = this,
            plain = me.attr.bbox.plain,
            surface = me.getSurface();
        //<debug>
        if (!surface) {
            Ext.Error.raise("The sprite does not belong to a surface.");
        }
        //</debug>
        if (plain.dirty) {
            me.updatePlainBBox(plain);
            plain.dirty = false;
        } if (surface.getInherited().rtl && surface.getFlipRtlText()) {
            // Since sprite's attributes haven't actually changed at this point,
            // and we just want to update the position of its bbox
            // based on surface's width, there's no reason to perform
            // expensive text measurement operation here,
            // so we can use the result of the last measurement instead.
            me.updatePlainBBox(plain, true);
        }
        return me.callParent([isWithoutTransform]);
    },

    rtlAlignments: {
        start: 'end',
        center: 'center',
        end: 'start'
    },

    updatePlainBBox: function (plain, useOldSize) {
        var me = this,
            attr = me.attr,
            x = attr.x,
            y = attr.y,
            dx = [],
            font = attr.font,
            text = attr.text,
            baseline = attr.textBaseline,
            alignment = attr.textAlign,
            size = (useOldSize && me.oldSize) ? me.oldSize : (me.oldSize = Ext.draw.TextMeasurer.measureText(text, font)),
            surface = me.getSurface(),
            isRtl = surface.getInherited().rtl,
            flipRtlText = isRtl && surface.getFlipRtlText(),
            rect = surface.getRect(),
            sizes = size.sizes,
            blockHeight = size.height,
            blockWidth = size.width,
            ln = sizes ? sizes.length : 0,
            lineWidth,
            i = 0;

        switch (baseline) {
            case 'hanging' :
            case 'top':
                break;
            case 'ideographic' :
            case 'bottom' :
                y -= blockHeight;
                break;
            case 'alphabetic' :
                y -= blockHeight * 0.8;
                break;
            case 'middle' :
            case 'center' :
                y -= blockHeight * 0.5;
                break;
        }
        if (flipRtlText) {
            x = rect[2] - rect[0] - x;
            alignment = me.rtlAlignments[alignment];
        }
        // We don't apply textAlign attribute of the sprite to context,
        // so text is always left aligned, and we have to calculate the
        // offset of each line based on sprite's textAlign attribute.
        // These offsets are then used by the sprite's 'render' method
        // to position text property.
        // TODO: ^^ This was probably done because of the differences in
        // TODO: Canvas and SVG when it comes to text alignment. Have to check this.
        switch (alignment) {
            case 'start':
                if (isRtl) {
                    for (; i < ln; i++) {
                        lineWidth = sizes[i].width;
                        dx.push(-(blockWidth - lineWidth));
                    }
                }
                break;
            case 'end' :
                x -= blockWidth;
                if (isRtl) {
                    break;
                }
                for (; i < ln; i++) {
                    lineWidth = sizes[i].width;
                    dx.push(blockWidth - lineWidth);
                }
                break;
            case 'center' :
                x -= blockWidth * 0.5;
                for (; i < ln; i++) {
                    lineWidth = sizes[i].width;
                    dx.push((isRtl ? -1 : 1) * (blockWidth - lineWidth) * 0.5);
                }
                break;
        }

        attr.textAlignOffsets = dx;

        plain.x = x;
        plain.y = y;
        plain.width = blockWidth;
        plain.height = blockHeight;
    },

    setText: function (text) {
        this.setAttributes({text: text}, true);
    },

    setElementStyles: function (element, styles) {
        var stylesCache = element.stylesCache || (element.stylesCache = {}),
            style = element.dom.style,
            name;
        for (name in styles) {
            if (stylesCache[name] !== styles[name]) {
                stylesCache[name] = style[name] = styles[name];
            }
        }
    },

    //<debug>
    renderBBox: function (surface, ctx) {
        var bbox = this.getBBox(true);
        ctx.beginPath();
        ctx.moveTo(bbox.x, bbox.y);
        ctx.lineTo(bbox.x + bbox.width, bbox.y);
        ctx.lineTo(bbox.x + bbox.width, bbox.y + bbox.height);
        ctx.lineTo(bbox.x, bbox.y + bbox.height);
        ctx.closePath();
        ctx.strokeStyle = 'red';
        ctx.strokeOpacity = 1;
        ctx.lineWidth = 0.5;
        ctx.stroke();
    },
    //</debug>

    render: function (surface, ctx, rect) {
        var me = this,
            attr = me.attr,
            mat = Ext.draw.Matrix.fly(attr.matrix.elements.slice(0)),
            bbox = me.getBBox(true),
            dx = attr.textAlignOffsets,
            x, y, i, lines, lineHeight;
        if (attr.text.length === 0) {
            return;
        }

        lines = attr.text.split('\n');
        lineHeight = bbox.height / lines.length;
        // Simulate textBaseline and textAlign.
        x = attr.bbox.plain.x;
        y = attr.bbox.plain.y;
        mat.toContext(ctx);
        if (surface.getInherited().rtl) {
            // Canvas element in RTL mode automatically flips text alignment.
            // Here we compensate for that change.
            // So text is still positioned and aligned as in the LTR mode,
            // but the direction of the text is RTL.
            x += attr.bbox.plain.width;
        }

        for (i = 0; i < lines.length; i++) {
            if (ctx.fillStyle !== 'rgba(0, 0, 0, 0)') {
                ctx.fillText(lines[i], x + (dx[i] || 0), y + lineHeight * i);
            }
            if (ctx.strokeStyle !== 'rgba(0, 0, 0, 0)') {
                ctx.strokeText(lines[i], x + (dx[i] || 0), y + lineHeight * i);
            }
        }
        //<debug>
        var debug = me.statics().debug || attr.debug;
        if (debug) {
            debug.bbox && me.renderBBox(surface, ctx);
        }
        //</debug>
    }
});
