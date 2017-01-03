/**
 * This class encapsulates a drawn text item as rendered by the Ext.draw package within a Component which can be
 * then used anywhere in an ExtJS application just like any other Component.
 *
 * ## Example usage
 *
 *     @example
 *     Ext.create('Ext.panel.Panel', {
 *         title: 'Panel with VerticalTextItem',
 *         width: 300,
 *         height: 200,
 *         lbar: {
 *             layout: {
 *                 align: 'center'
 *             },
 *             items: [{
 *                 xtype: 'text',
 *                 text: 'Sample VerticalTextItem',
 *                 degrees: 90
 *             }]
 *         },
 *         renderTo: Ext.getBody()
 *     });
 *
 * @constructor
 * Creates a new Text Component
 * @param {Object} text A config object containing a `text` property, a `degrees` property,
 * and, optionally, a `styleSelector` property which specifies a selector which provides CSS rules to
 * give font family, size and color to the drawn text.
 */
Ext.define('Ext.draw.Text', {
    extend: 'Ext.draw.Component',
    uses: ['Ext.util.CSS'],
    alias: 'widget.text',

    /**
     * @cfg {String} text
     * The text to display (html tags are <b>not</b> accepted)
     */
    text: '',

    /**
     * @cfg {String} styleSelector
     * A CSS selector string which matches a style rule in the document stylesheet from which
     * the text's font properties are read.
     *
     * **Drawn** text is not styled by CSS, but by properties set during its construction, so these styles
     * must be programatically read from a stylesheet rule found via a selector at construction time.
     */

    /**
     * @cfg {Number} degrees
     * The angle by which to initially rotate the text clockwise. Defaults to zero.
     */

    focusable: false,
    viewBox: false,
    autoSize: true,
    baseCls: Ext.baseCSSPrefix + 'surface ' + Ext.baseCSSPrefix + 'draw-text',

    initComponent: function() {
        var me = this;

        me.textConfig = Ext.apply({
            type: 'text',
            text: me.text,
            rotate: {
                degrees: me.degrees || 0
            }
        }, me.textStyle);
        Ext.apply(me.textConfig, me.getStyles(me.styleSelectors || me.styleSelector));

        // Surface is created from the *initialConfig*, not the current object state,
        // So the generated items must go into the initialConfig
        me.initialConfig.items = [me.textConfig];
        me.callParent(arguments);
    },

    /**
     * @private
     * Accumulates a style object based upon the styles specified in document stylesheets
     * by an array of CSS selectors
     */
    getStyles: function(selectors) {
        selectors = Ext.Array.from(selectors);
        var i = 0,
            len = selectors.length,
            rule,
            style,
            prop,
            result = {};

        for (; i < len; i++) {
            // Get the style rule which exactly matches the selector.
            rule = Ext.util.CSS.getRule(selectors[i]);
            if (rule) {
                style = rule.style;
                if (style) {
                    Ext.apply(result, {
                        'font-family': style.fontFamily,
                        'font-weight': style.fontWeight,
                        'line-height': style.lineHeight,
                        'font-size': style.fontSize,
                        fill: style.color
                    });
                }
            }
        }
        return result;
    },

    /**
     * Sets the clockwise rotation angle relative to the horizontal axis.
     * @param {Number} degrees The clockwise angle (in degrees) from the horizontal axis
     * by which the text should be rotated.
     */
    setAngle: function(degrees) {
        var me = this,
            surface,
            sprite;
            
        if (me.rendered) {
            surface = me.surface;
            sprite = surface.items.items[0];

            me.degrees = degrees;
            sprite.setAttributes({
                rotate: {
                    degrees: degrees
                }
            }, true);
            if (me.autoSize || me.viewBox) {
                me.updateLayout();
            }
        } else {
            me.degrees = degrees;
        }
    },

    /**
     * Updates this item's text.
     * @param {String} t The text to display (html **not** accepted).
     */
    setText: function(text) {
        var me = this,
            surface,
            sprite;
            
        if (me.rendered) {
            surface = me.surface;
            sprite = surface.items.items[0];

            me.text = text || '';
            surface.remove(sprite);
            me.textConfig.type = 'text';
            me.textConfig.text = me.text;
            sprite = surface.add(me.textConfig);
            sprite.setAttributes({
                rotate: {
                    degrees: me.degrees
                }
            }, true);
            if (me.autoSize || me.viewBox) {
                me.updateLayout();
            }
        } else {
            me.on({
                render: function() {
                    me.setText(text);
                },
                single: true
            });
        }
    }
});
