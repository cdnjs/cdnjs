/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * Defines a mask for a chart's series.
 * The 'chart' member must be set prior to rendering.
 *
 * A Mask can be used to select a certain region in a chart.
 * When enabled, the `select` event will be triggered when a
 * region is selected by the mask, allowing the user to perform
 * other tasks like zooming on that region, etc.
 *
 * In order to use the mask one has to set the Chart `mask` option to
 * `true`, `vertical` or `horizontal`. Then a possible configuration for the
 * listener could be:
 *
 *     items: {
 *         xtype: 'chart',
 *         animate: true,
 *         store: store1,
 *         mask: 'horizontal',
 *         listeners: {
 *             select: {
 *                 fn: function(me, selection) {
 *                     me.setZoom(selection);
 *                     me.mask.hide();
 *                 }
 *             }
 *         }
 *     }
 *
 * In this example we zoom the chart to that particular region. You can also get
 * a handle to a mask instance from the chart object. The `chart.mask` element is a
 * `Ext.Panel`.
 * 
 */
Ext.define('Ext.chart.Mask', {
    requires: [
        'Ext.chart.MaskLayer'
    ],
    
    /**
     * @cfg {Boolean/String} mask
     * Enables selecting a region on chart. True to enable any selection,
     * 'horizontal' or 'vertical' to restrict the selection to X or Y axis.
     *
     * The mask in itself will do nothing but fire 'select' event.
     * See {@link Ext.chart.Mask} for example.
     */

    /**
     * Creates new Mask.
     * @param {Object} [config] Config object.
     */
    constructor: function(config) {
        var me = this;

        me.addEvents('select');

        if (config) {
            Ext.apply(me, config);
        }
        if (me.enableMask) {
            me.on('afterrender', function() {
                //create a mask layer component
                var comp = new Ext.chart.MaskLayer({
                    renderTo: me.el,
                    hidden: true
                });
                comp.el.on({
                    'mousemove': function(e) {
                        me.onMouseMove(e);
                    },
                    'mouseup': function(e) {
                        me.onMouseUp(e);
                    }
                });
                comp.initDraggable();
                me.maskType = me.mask;
                me.mask = comp;
                me.maskSprite = me.surface.add({
                    type: 'path',
                    path: ['M', 0, 0],
                    zIndex: 1001,
                    opacity: 0.6,
                    hidden: true,
                    stroke: '#00f',
                    cursor: 'crosshair'
                });
            }, me, { single: true });
        }
    },

    onMouseUp: function(e) {
        var me = this,
            bbox = me.bbox || me.chartBBox,
            sel;
        me.maskMouseDown = false;
        me.mouseDown = false;
        if (me.mouseMoved) {
            me.handleMouseEvent(e);
            me.mouseMoved = false;
            sel = me.maskSelection;
            me.fireEvent('select', me, {
                x: sel.x - bbox.x,
                y: sel.y - bbox.y,
                width: sel.width,
                height: sel.height
            });
        }
    },

    onMouseDown: function(e) {
        this.handleMouseEvent(e);
    },

    onMouseMove: function(e) {
        this.handleMouseEvent(e);
    },

    handleMouseEvent: function(e) {
        var me = this,
            mask = me.maskType,
            bbox = me.bbox || me.chartBBox,
            x = bbox.x,
            y = bbox.y,
            math = Math,
            floor = math.floor,
            abs = math.abs,
            min = math.min,
            max = math.max,
            height = floor(y + bbox.height),
            width = floor(x + bbox.width),
            staticX = e.getPageX() - me.el.getX(),
            staticY = e.getPageY() - me.el.getY(),
            maskMouseDown = me.maskMouseDown,
            path;

        staticX = max(staticX, x);
        staticY = max(staticY, y);
        staticX = min(staticX, width);
        staticY = min(staticY, height);

        if (e.type === 'mousedown') {
            // remember the cursor location
            me.mouseDown = true;
            me.mouseMoved = false;
            me.maskMouseDown = {
                x: staticX,
                y: staticY
            };
        }
        else {
            // mousedown or mouseup:
            // track the cursor to display the selection
            me.mouseMoved = me.mouseDown;
            if (maskMouseDown && me.mouseDown) {
                if (mask == 'horizontal') {
                    staticY = y;
                    maskMouseDown.y = height;
                }
                else if (mask == 'vertical') {
                    staticX = x;
                    maskMouseDown.x = width;
                }
                width = maskMouseDown.x - staticX;
                height = maskMouseDown.y - staticY;
                path = ['M', staticX, staticY, 'l', width, 0, 0, height, -width, 0, 'z'];
                me.maskSelection = {
                    x: (width > 0 ? staticX : staticX + width) + me.el.getX(),
                    y: (height > 0 ? staticY : staticY + height) + me.el.getY(),
                    width: abs(width),
                    height: abs(height)
                };
                me.mask.updateBox(me.maskSelection);
                me.mask.show();
                me.maskSprite.setAttributes({
                    hidden: true    
                }, true);
            }
            else {
                if (mask == 'horizontal') {
                    path = ['M', staticX, y, 'L', staticX, height];
                }
                else if (mask == 'vertical') {
                    path = ['M', x, staticY, 'L', width, staticY];
                }
                else {
                    path = ['M', staticX, y, 'L', staticX, height, 'M', x, staticY, 'L', width, staticY];
                }
                me.maskSprite.setAttributes({
                    path: path,
                    'stroke-width': mask === true ? 1 : 1,
                    hidden: false
                }, true);
            }
        }

    },

    onMouseLeave: function(e) {
        var me = this;
        me.mouseMoved = false;
        me.mouseDown = false;
        me.maskMouseDown = false;
        me.mask.hide();
        me.maskSprite.hide(true);
    }
});
    
