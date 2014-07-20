/**
 * @class Ext.sparkline.Base
 *
 * The base class for ExtJS SparkLines. SparkLines are small, inline graphs used to visually
 * display small amounts of data. For large datasets, use the {@link Ext.chart.Chart chart package}.
 *
 * The SparkLine subclasses accept an {@link #values array of values}, and present the data in different visualizations.
 *
 *     @example
 *     new Ext.Panel({
 *         height: 500,
 *         width: 600,
 *         frame: true,
 *         title: 'Test Sparklines',
 *         renderTo:document.body,
 *         bodyPadding: 10,
 *
 *         // Named listeners will resolve to methods in this Panel
 *         defaultListenerScope: true,
 *
 *         // Named references will be collected, and can be access from this Panel
 *         referenceHolder: true,
 *         
 *         items: [{
 *             reference: 'values',
 *             xtype: 'textfield',
 *             fieldLabel: 'Values',
 *             validator: function(v) {
 *                 var result = [];
 *
 *                 v = v.replace(/\s/g, '');
 *                 v = v.replace(/,$/, '');
 *                 v = v.split(',');
 *                 for (var i = 0; i < v.length; i++) {
 *                     if (!Ext.isNumeric(v[i])) {
 *                         return 'Value must be a comma separated array of numbers';
 *                     }
 *                     result.push(parseInt(v[i], 10));
 *                 }
 *                 this.values = result;
 *                 return true;
 *             },
 *             listeners: {
 *                 change: 'onTypeChange',
 *                 buffer: 500
 *             }
 *         }, {
 *             reference: 'type',
 *             xtype: 'combobox',
 *             fieldLabel: 'Type',
 *             store: [
 *                 ['sparklineline',     'Line'],
 *                 ['sparklinebox',      'Box'],
 *                 ['sparklinebullet',   'Bullet'],
 *                 ['sparklinediscrete', 'Discrete'],
 *                 ['sparklinepie',      'Pie'],
 *                 ['sparklinetristate', 'TriState']
 *             ],
 *             value: 'sparklineline',
 *             listeners: {
 *                 change: 'onTypeChange',
 *                 buffer: 500
 *             }
 *         }],
 *         
 *         onTypeChange: function() {
 *             var me = this,
 *                 refs = me.getReferences(),
 *                 config;
 *
 *             if (me.sparkLine) {
 *                 me.remove(me.sparkLine, true);
 *             }
 *             config = {
 *                 xtype: refs.type.getValue(),
 *                 values: refs.values.values,
 *                 height: 25,
 *                 width: 100                    
 *             };
 *	           me.sparkLine = Ext.create(config);
 *             me.add(me.sparkLine);
 *             
 *             // Put under fields
 *             me.sparkLine.el.dom.style.marginLeft = refs.type.labelEl.getWidth() + 'px';
 *         }
 *     });
 *
 */
Ext.define('Ext.sparkline.Base', {
    extend: 'Ext.Widget',
    requires: [
        'Ext.XTemplate',
        'Ext.sparkline.CanvasCanvas',
        'Ext.sparkline.VmlCanvas'
    ],

    cachedConfig: {
        baseCls: Ext.baseCSSPrefix + 'sparkline',

        /**
         * @cfg {String} [lineColor=#157fcc] The hex value for line colors in graphs which display lines ({@link Ext.sparkline.Box Box}, {@link Ext.sparkline.Discrete Discrete and {@link Ext.sparkline.Line Line}).
         */
        lineColor: '#157fcc',

        /**
         * @cfg {String} [fillColor=#def] The hex value for fill color in graphs which fill areas ({@link Ext.sparkline.Line Line}).
         */
        fillColor: '#def',

        defaultPixelsPerValue: 3,

        tagValuesAttribute: 'values',

        enableTagOptions: false,
        
        enableHighlight: true,
        
        /**
         * @cfg {String} [highlightColor=null] The hex value for the highlight color to use when mouseing over a graph segment.
         */
        highlightColor: null,
        
        /**
         * @cfg {Number} [highlightLighten=1.4] How much to lighten the highlight color by when mouseing over a graph segment.
         */
        highlightLighten: 1.4,
        
        /**
         * @cfg {Boolean} [tooltipSkipNull=true] Null values will not have a tooltip displayed.
         */
        tooltipSkipNull: true,
        
        /*
         * @cfg {String} [tooltipPrefix] A string to prepend to each field displayed in a tooltip.
         */
        tooltipPrefix: '',
        
        /*
         * @cfg {String} [tooltipPrefix] A string to append to each field displayed in a tooltip.
         */
        tooltipSuffix: '',
        
        /*
         * @cfg {Boolean} [disableTooltips=false] Set to `true` to disable mouseover tooltips.
         */
        disableTooltips: false,
        
        disableInteraction: false,
        
        /**
         * @cfg {String/Ext.XTemplate} [tipTpl] An XTemplate used to display the value or values in a tooltip when hovering over a Sparkline.
         *
         * The implemented subclases all define their own `tipTpl`, but it can be overridden.
         */
        tipTpl: null
    },

    config: {
        /**
         * @cfg {Number[]} values An array of numbers which define the chart.
         */
        values: null
    },

    element: {
        tag: 'canvas',
        reference: 'element',
        style: {
            display: 'inline-block',
            verticalAlign: 'top'
        },
        listeners: {
            mouseenter: 'onMouseEnter',
            mouseleave: 'onMouseLeave',
            mousemove: 'onMouseMove'
        },
        // Create canvas zero sized so that it does not affect the containing element's initial layout
        // https://sencha.jira.com/browse/EXTJSIV-10145
        width: 0,
        height: 0
    },
    
    defaultBindProperty: 'values',

    // When any config is changed, the canvas needs to be redrawn.
    // This is done at the next animation frame when this queue is traversed.
    redrawQueue: {},

    inheritableStatics: {
        sparkLineTipClass: Ext.baseCSSPrefix + 'sparkline-tip-target',

        onClassCreated: function(cls) {
            var proto = cls.prototype,
                configs = cls.getConfigurator().configs,
                config;

            // Set up an applier for all local configs which kicks off a request to redraw on the next animation frame
            for (config in configs) {
                // tipTpl not included in this scheme
                if (config !== 'tipTpl') {
                    proto[Ext.Config.get(config).names.apply] = proto.applyConfigChange;
                }
            }    
        }
    },

    constructor: function(config) {
        var me = this;

        // The canvas sets our element config
        me.canvas = Ext.supports.Canvas ? new Ext.sparkline.CanvasCanvas(me)
                                        : new Ext.sparkline.VmlCanvas(me);
        if (!me.getDisableTooltips()) {
            me.element.cls = Ext.sparkline.Base.sparkLineTipClass;
        }

        Ext.apply(me, config);
        me.callParent([config]);

        // For compatibility of all the code.
        me.el = me.element;
    },

    // determine if all values of an array match a value
    // returns true if the array is empty
    all: function (val, arr, ignoreNull) {
        var i;
        for (i = arr.length; i--; ) {
            if (ignoreNull && arr[i] === null) {
                continue;
            }
            if (arr[i] !== val) {
                return false;
            }
        }
        return true;
    },

    // generic config value applier.
    // Adds this to the queue to do a redraw on the next animation frame
    applyConfigChange: function(newValue) {
        var me = this;
        me.redrawQueue[me.getId()] = me;

        // Ensure that there is a single timer to handle all queued redraws.
        if (!me.redrawTimer) {
            Ext.sparkline.Base.prototype.redrawTimer =
                    Ext.Function.requestAnimationFrame(me.processRedrawQueue);
        }
        return newValue;
    },

    // Appliers convert an incoming config value.
    // Ensure the tipTpl is an XTemplate
    applyTipTpl: function(tipTpl) {
        if (!tipTpl.isTemplate) {
            tipTpl = new Ext.XTemplate(tipTpl);
        }
        return tipTpl;
    },

    normalizeValue: function (val) {
        var nf;
        switch (val) {
            case 'undefined':
                val = undefined;
                break;
            case 'null':
                val = null;
                break;
            case 'true':
                val = true;
                break;
            case 'false':
                val = false;
                break;
            default:
                nf = parseFloat(val);
                if (val == nf) {
                    val = nf;
                }
        }
        return val;
    },

    normalizeValues: function (vals) {
        var i, result = [];
        for (i = vals.length; i--;) {
            result[i] = this.normalizeValue(vals[i]);
        }
        return result;
    },

    doSetWidth: function(width) {
        var me = this,
            dom = me.element.dom;

        me.callParent(arguments);
        me.canvas.setWidth(width);
        me.width = width;
        if (me.height == null) {
            me.setHeight(parseInt(me.measurer.getCachedStyle(dom.parentNode, 'line-height'), 10));
        }
        else {
            me.redrawQueue[me.getId()] = me;
        }
    },

    doSetHeight: function(height) {
        var me = this;

        me.callParent(arguments);
        me.canvas.setHeight(height);
        me.height = height;
        me.redrawQueue[me.getId()] = me;
    },

    updateValues: function(values) {
        this.values = values;
    },

    redraw: function() {
        var me = this,
            tooltip;

        if (me.getValues()) {
            tooltip = me.tooltip;
            // Avoid the visible tooltup thinking a subsequent mousemove is a mouseout by updating its triggerElement
            if (tooltip && tooltip.isVisible() && me.currentPageXY && me.el.getRegion().contains(me.currentPageXY)) {
                me.tooltip.triggerElement = me.el.dom;
            }

            me.onUpdate();
            me.canvas.onOwnerUpdate();
            me.renderGraph();
        }
    },

    onUpdate: Ext.emptyFn,

    /*
     * Render the chart to the canvas
     */
    renderGraph: function () {
        var ret = true;
        if (this.disabled) {
            this.canvas.reset();
            ret = false;
        }
        return ret;
    },

    onMouseEnter: function(e) {
        this.onMouseMove(e);
    },

    onMouseMove: function (e) {
        this.currentPageXY = e.getPoint();
        this.redraw();
    },

    onMouseLeave: function () {
        var me = this;
        me.currentPageXY = me.targetX = me.targetY = null;
        me.redraw();
    },

    updateDisplay: function () {
        var me = this,
            offset, tooltip, tooltipHTML, region;

        if (me.currentPageXY && me.el.getRegion().contains(me.currentPageXY)) {
            offset = me.canvas.el.getXY();
            region = me.getRegion(me.currentPageXY[0] - offset[0], me.currentPageXY[1] - offset[1]);

            if (region != null && !me.disableHighlight) {
                me.renderHighlight(region);
            }
            me.fireEvent('sparklineregionchange', me);

            tooltip = me.tooltip;
            if (region != null && tooltip) {
                tooltipHTML = me.getRegionTooltip(region);
                if (tooltipHTML) {
                    if (!me.lastTooltipHTML || tooltipHTML[0] !== me.lastTooltipHTML[0] || tooltipHTML[1] !== me.lastTooltipHTML[1]) {
                        tooltip.setTitle(tooltipHTML[0]);
                        tooltip.update(tooltipHTML[1]);
                        me.lastTooltipHTML = tooltipHTML;
                    }
                } else {
                    tooltip.hide();
                }
            }
        }
    },

    /*
     * Return a region id for a given x/y co-ordinate
     */
    getRegion: Ext.emptyFn,

    /*
     * Fetch the HTML to display as a tooltip
     */
    getRegionTooltip: function(region) {
        var me = this,
            header = me.tooltipChartTitle,
            entries = [],
            tipTpl = me.getTipTpl(),
            fields, showFields, showFieldsKey, newFields, fv,
            formatter, fieldlen, j;

        fields = me.getRegionFields(region);
        formatter = me.tooltipFormatter;
        if (formatter) {
            return formatter(me, me, fields);
        }

        if (!tipTpl) {
            return '';
        }
        if (!Ext.isArray(fields)) {
            fields = [fields];
        }
        showFields = me.tooltipFormatFieldlist;
        showFieldsKey = me.tooltipFormatFieldlistKey;
        if (showFields && showFieldsKey) {
            // user-selected ordering of fields
            newFields = [];
            for (i = fields.length; i--;) {
                fv = fields[i][showFieldsKey];
                if ((j = Ext.Array.indexOf(fv, showFields)) != -1) {
                    newFields[j] = fields[i];
                }
            }
            fields = newFields;
        }
        fieldlen = fields.length;

        for (j = 0; j < fieldlen; j++) {
            if (!fields[j].isNull || !me.getTooltipSkipNull()) {
                Ext.apply(fields[j], {
                    prefix: me.getTooltipPrefix(),
                    suffix: me.getTooltipSuffix()
                });
                entries.push(tipTpl.apply(fields[j]));
            }
        }

        if (header || entries.length) {
            return [header, entries.join('<br>')];
        }
        return '';
    },

    getRegionFields: Ext.emptyFn,

    calcHighlightColor: function(color) {
        var me = this,
            highlightColor = me.getHighlightColor(),
            lighten = me.getHighlightLighten(),
            parse, mult, rgbnew, i;

        if (highlightColor) {
            return highlightColor;
        }
        if (lighten) {
            // extract RGB values
            parse = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(color) || /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(color);
            if (parse) {
                rgbnew = [];
                mult = color.length === 4 ? 16 : 1;
                for (i = 0; i < 3; i++) {
                    rgbnew[i] = Ext.Number.constrain(Math.round(parseInt(parse[i + 1], 16) * mult * lighten), 0, 255);
                }
                return 'rgb(' + rgbnew.join(',') + ')';
            }
        }
        return color;
    },

    destroy: function() {
        delete this.redrawQueue[this.getId()];
        this.callParent();
    }
}, function(cls) {
    var proto = cls.prototype;

    Ext.onReady(function() {
        proto.tooltip = new Ext.tip.ToolTip({
            id: 'sparklines-tooltip',
            target: document.body,
            delegate: '.' + cls.sparkLineTipClass,
            showDelay: 0,
            dismissDelay: 0,
            hideDelay: 400
        });
    });

    cls.onClassCreated(cls);
    
    proto.processRedrawQueue = function () {
        var redrawQueue = proto.redrawQueue,
            id;

        for (id in redrawQueue) {
            redrawQueue[id].redraw();
        }
        proto.redrawQueue = {};
        proto.redrawTimer = 0;
    };
});
