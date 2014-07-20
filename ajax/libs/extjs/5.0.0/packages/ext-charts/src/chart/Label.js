/**
 * Labels is a mixin to the Series class. Labels methods are implemented
 * in each of the Series (Pie, Bar, etc) for label creation and placement.
 *
 * The 2 methods that must be implemented by the Series are:
 *
 * - {@link #onCreateLabel}
 * - {@link #onPlaceLabel}
 *
 * The application can override these methods to control the style and
 * location of the labels. For instance, to display the labels in green and
 * add a '+' symbol when the value of a Line series exceeds 50:
 *
 *      Ext.define('Ext.chart.series.MyLine', {
 *          extend: 'Ext.chart.series.Line',
 *          alias: ['series.myline', 'Ext.chart.series.MyLine'],
 *          type: 'MYLINE',
 *     
 *          onPlaceLabel: function(label, storeItem, item, i, display, animate){
 *              if (storeItem.data.y >= 50) {
 *                  label.setAttributes({
 *                      fill: '#080',
 *                      text: "+" + storeItem.data.y
 *                  }, true);
 *              }
 *              return this.callParent(arguments);
 *          }
 *      });
 *
 * Note that for simple effects, like the example above, it is simpler
 * for the application to provide a label.renderer function in the config:
 *
 *       label: {
 *           renderer: function(value, label, storeItem, item, i, display, animate, index) {
 *               if (value >= 50) {
 *                   label.setAttributes({fill:'#080'});
 *                   value = "+" + value;
 *               }
 *               return value;
 *           }
 *       }
 *
 * The rule of thumb is that to customize the value and modify simple visual attributes, it
 * is simpler to use a renderer function, while overridding `onCreateLabel` and `onPlaceLabel`
 * allows the application to take entire control over the labels.
 * 
 */
Ext.define('Ext.chart.Label', {

    /* Begin Definitions */

    requires: ['Ext.draw.Color'],

    /* End Definitions */

    /**
     * @method onCreateLabel
     * @template
     * 
     * Called each time a new label is created.
     * 
     * **Note:** This method must be implemented in Series that mixes
     * in this Label mixin.
     * 
     * @param {Ext.data.Model} storeItem The element of the store that is
     * related to the sprite.
     * @param {Object} item The item related to the sprite.
     * An item is an object containing the position of the shape
     * used to describe the visualization and also pointing to the
     * actual shape (circle, rectangle, path, etc).
     * @param {Number} i The index of the element created
     * (i.e the first created label, second created label, etc).
     * @param {String} display The label.display type.
     * May be `false` if the label is hidden
     * @return {Ext.draw.Sprite} The created sprite that will draw the label.
     */
    
    /**
     * @method onPlaceLabel
     * @template
     * 
     * Called for updating the position of the label.
     * 
     * **Note:** This method must be implemented in Series that mixes
     * in this Label mixin.
     * 
     * @param {Ext.draw.Sprite} label The sprite that draws the label.
     * @param {Ext.data.Model} storeItem The element of the store
     * that is related to the sprite.
     * @param {Object} item The item related to the
     * sprite. An item is an object containing the position of
     * the shape used to describe the visualization and also
     * pointing to the actual shape (circle, rectangle, path, etc).
     * @param {Number} i The index of the element to be updated
     * (i.e. whether it is the first, second, third from the
     * labelGroup)
     * @param {String} display The label.display type.
     * May be `false` if the label is hidden
     * @param {Boolean} animate A boolean value to set or unset
     * animations for the labels.
     * @param {Number} index The series index.
     */
    
    /**
     * @cfg {Object} label
     * Object with the following properties:
     *
     * @cfg {String} label.display
     *
     * Specifies the presence and position of the labels. The possible values depend on the chart type. 
     * For Line and Scatter charts: "under" | "over" | "rotate".
     * For Bar and Column charts: "insideStart" | "insideEnd" | "outside".
     * For Pie charts: "inside" | "outside" | "rotate".
     * For all charts: "none" hides the labels and "middle" is reserved for future use.
     * On stacked Bar and stacked Column charts, if 'stackedDisplay' is set, the values
     * "over" or "under" can be passed internally to {@link #onCreateLabel} and {@link #onPlaceLabel}
     * (however they cannot be used by the application as config values for label.display).
     *
     * Default value: 'none'.
     *
     * @cfg {String} label.stackedDisplay
     *
     * The type of label we want to display as a summary on a stacked
     * bar or a stacked column.  If set to 'total', the total amount
     * of all the stacked values is displayed on top of the column.
     * If set to 'balances', the total amount of the positive values
     * is displayed on top of the column and the total amount of the
     * negative values is displayed at the bottom.
     *
     * Default value: 'none'.
     *
     * @cfg {String} label.color
     *
     * The color of the label text. It can be specified in hex values 
     * (eg. '#f00' or '#ff0000'), or as a CSS color name (eg. 'red').
     *
     * Default value: '#000' (black).
     *
     * @cfg {Boolean} label.contrast
     *
     * True to render the label in contrasting color with the backround of a column
     * in a Bar chart or of a slice in a Pie chart. 
     *
     * Default value: false.
     *
     * @cfg {String|String[]} label.field
     *
     * The name(s) of the field(s) to be displayed in the labels. If your chart has 3 series
     * that correspond to the fields 'a', 'b', and 'c' of your model and you only want to
     * display labels for the series 'c', you must still provide an array `[null, null, 'c']`.
     *
     * Default value: 'name'.
     *
     * @cfg {Number} label.minMargin
     *
     * Specifies the minimum distance from a label to the origin of
     * the visualization.  This parameter is useful when using
     * PieSeries width variable pie slice lengths.
     *
     * Default value: 50.
     *
     * @cfg {Number} label.padding
     *
     * The distance between the label and the chart when the label is displayed
     * outside the chart.
     *
     * Default value: 20.
     *
     * @cfg {Boolean|Object} label.calloutLine
     *
     * True to draw a line between the label and the chart with the default settings,
     * or an Object that defines the 'color', 'width' and 'length' properties of the line.
     * This config is only applicable when the label is displayed outside the chart.
     *
     * Default value: false.
     *
     * @cfg {String} label.calloutLine.color
     *
     * The color of the line. It can be specified in hex values 
     * (eg. '#f00' or '#ff0000'), or as a CSS color name (eg. 'red').
     * By default, it uses the color of the pie slice.
     *
     * @cfg {Number} label.calloutLine.width
     *
     * The width of the line.
     *
     * Default value: 2.
     *
     * @cfg {Number} label.calloutLine.length
     *
     * The length of the line. By default, the length of the line is calculated taking
     * into account the {@link #label.padding} and the width and height of the label.
     * If specified, it should be larger than {@link #label.padding} otherwise the 
     * line may cross the label itself.
     *
     * @cfg {String} label.font
     *
     * The font used for the labels.
     *
     * Default value: `"11px Helvetica, sans-serif"`.
     *
     * @cfg {String} label.orientation
     *
     * Either "horizontal" or "vertical".
     *
     * Default value: `"horizontal"`.
     *
     * @cfg {Function} label.renderer
     *
     * Optional function for formatting the label into a displayable value.
     *
     * The arguments to the method are:
     *
     *   - *`value`* The value
     *   - *`label`*, *`storeItem`*, *`item`*, *`i`*, *`display`*, *`animate`*, *`index`*
     *
     *     Same arguments as {@link #onPlaceLabel}.
     *
     *     Default value: `function(v) { return v; }`
     */

    // @private a regex to parse url type colors.
    colorStringRe: /url\s*\(\s*#([^\/)]+)\s*\)/,

    // @private the mixin constructor. Used internally by Series.
    constructor: function(config) {
        var me = this;
        me.label = Ext.applyIf(me.label || {},
        {
            display: "none",
            stackedDisplay: "none",
            color: "#000",
            field: "name",
            minMargin: 50,
            font: "11px Helvetica, sans-serif",
            orientation: "horizontal",
            renderer: Ext.identityFn
        });

        if (me.label.display !== 'none') {
            me.labelsGroup = me.chart.surface.getGroup(me.seriesId + '-labels');
        }
    },

    // @private a method to render all labels in the labelGroup
    renderLabels: function() {
        var me = this,
            chart = me.chart,
            gradients = chart.gradients,
            items = me.items,
            animate = chart.animate,
            config = me.label,
            display = config.display,
            stackedDisplay = config.stackedDisplay,
            format = config.renderer,
            color = config.color,
            field = [].concat(config.field),
            group = me.labelsGroup,
            groupLength = (group || 0) && group.length,
            store = me.chart.getChartStore(),
            len = store.getCount(),
            itemLength = (items || 0) && items.length,
            ratio = itemLength / len,
            gradientsCount = (gradients || 0) && gradients.length,
            Color = Ext.draw.Color,
            hides = [],
            gradient, i, count, groupIndex, index, j, k, colorStopTotal, colorStopIndex, colorStop, item, label,
            storeItem, sprite, spriteColor, spriteBrightness, labelColor, colorString,
            total, totalPositive, totalNegative, topText, bottomText;

        if (display == 'none' || !group) {
            return;
        }
        // no items displayed, hide all labels
        if(itemLength == 0){
            while(groupLength--) {
                hides.push(groupLength);
            }
        } else {
            for (i = 0, count = 0, groupIndex = 0; i < len; i++) {
                index = 0;
                for (j = 0; j < ratio; j++) {
                    item = items[count];
                    label = group.getAt(groupIndex);
                    storeItem = store.getAt(i);
                    //check the excludes
                    while(this.__excludes && this.__excludes[index]) {
                        index++;
                    }

                    if (!item && label) {
                        label.hide(true);
                        groupIndex++;
                    }

                    if (item && field[j]) {
                        if (!label) {
                            label = me.onCreateLabel(storeItem, item, i, display);
                            if (!label) {
                                break;
                            }
                        }

                        // set color (the app can override it in onPlaceLabel)
                        label.setAttributes({
                            fill: String(color)
                        }, true);

                        // position the label
                        me.onPlaceLabel(label, storeItem, item, i, display, animate, index);
                        groupIndex++;

                        // set contrast
                        if (config.contrast && item.sprite) {
                            sprite = item.sprite;
                            //set the color string to the color to be set, only read the
                            // _endStyle/_to if we're animating, otherwise they're not relevant
                            if (animate && sprite._endStyle) {
                                colorString = sprite._endStyle.fill;
                            } else if (animate && sprite._to) {
                                colorString = sprite._to.fill;
                            } else {
                                colorString = sprite.attr.fill;
                            }
                            colorString = colorString || sprite.attr.fill;

                            spriteColor = Color.fromString(colorString);
                            //color wasn't parsed property maybe because it's a gradient id
                            if (colorString && !spriteColor) {
                                colorString = colorString.match(me.colorStringRe)[1];
                                for (k = 0; k < gradientsCount; k++) {
                                    gradient = gradients[k];
                                    if (gradient.id == colorString) {
                                        //avg color stops
                                        colorStop = 0; colorStopTotal = 0;
                                        for (colorStopIndex in gradient.stops) {
                                            colorStop++;
                                            colorStopTotal += Color.fromString(gradient.stops[colorStopIndex].color).getGrayscale();
                                        }
                                        spriteBrightness = (colorStopTotal / colorStop) / 255;
                                        break;
                                    }
                                }
                            }
                            else {
                                spriteBrightness = spriteColor.getGrayscale() / 255;
                            }
                            if (label.isOutside) {
                                spriteBrightness = 1;
                            }
                            labelColor = Color.fromString(label.attr.fill || label.attr.color).getHSL();
                            labelColor[2] = spriteBrightness > 0.5 ? 0.2 : 0.8;
                            label.setAttributes({
                                fill: String(Color.fromHSL.apply({}, labelColor))
                            }, true);
                        }

                        // display totals on stacked charts
                        if (me.stacked && stackedDisplay && (item.totalPositiveValues || item.totalNegativeValues)) {
                            totalPositive = (item.totalPositiveValues || 0);
                            totalNegative = (item.totalNegativeValues || 0);
                            total = totalPositive + totalNegative;

                            if (stackedDisplay == 'total') {
                                topText = format(total);
                            } else if (stackedDisplay == 'balances') {
                                if (totalPositive == 0 && totalNegative == 0) {
                                    topText = format(0);
                                } else {
                                    topText = format(totalPositive);
                                    bottomText = format(totalNegative);
                                }
                            }

                            if (topText) {
                                label = group.getAt(groupIndex);
                                if (!label) {
                                    label = me.onCreateLabel(storeItem, item, i, 'over');
                                }
                                labelColor = Color.fromString(label.attr.color || label.attr.fill).getHSL();
                                label.setAttributes({
                                    text: topText,
                                    style: config.font,
                                    fill: String(Color.fromHSL.apply({}, labelColor))
                                }, true);
                                me.onPlaceLabel(label, storeItem, item, i, 'over', animate, index);
                                groupIndex ++;
                            }

                            if (bottomText) {
                                label = group.getAt(groupIndex);
                                if (!label) {
                                    label = me.onCreateLabel(storeItem, item, i, 'under');
                                }
                                labelColor = Color.fromString(label.attr.color || label.attr.fill).getHSL();
                                label.setAttributes({
                                    text: bottomText,
                                    style: config.font,
                                    fill: String(Color.fromHSL.apply({}, labelColor))
                                }, true);
                                me.onPlaceLabel(label, storeItem, item, i, 'under', animate, index);
                                groupIndex ++;
                            }
                        }
                    }
                    count++;
                    index++;
                }
            }
            groupLength = group.length;
        
            while(groupLength > groupIndex){
                hides.push(groupIndex);
                groupIndex++;
           }
        }
        me.hideLabels(hides);
    },

    hideLabels: function(hides){
        var labelsGroup = this.labelsGroup,
            hlen = !!hides && hides.length;

        if (!labelsGroup) {
            return;
        }

        if (hlen === false) {
            hlen = labelsGroup.getCount();
            while (hlen--) {
              labelsGroup.getAt(hlen).hide(true);
            }
        } else {
            while(hlen--) {
                labelsGroup.getAt(hides[hlen]).hide(true);
            }
        }
    }
});
