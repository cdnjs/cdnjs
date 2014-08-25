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
 * @class Ext.slider.Thumb
 * @private
 * Represents a single thumb element on a Slider. This would not usually be created manually and would instead
 * be created internally by an {@link Ext.slider.Multi Multi slider}.
 */
Ext.define('Ext.slider.Thumb', {
    requires: ['Ext.dd.DragTracker', 'Ext.util.Format'],
    /**
     * @private
     * @property {Number} topThumbZIndex
     * The number used internally to set the z index of the top thumb (see promoteThumb for details)
     */
    topZIndex: 10000,

    /**
     * @cfg {Ext.slider.MultiSlider} slider (required)
     * The Slider to render to.
     */

    /**
     * Creates new slider thumb.
     * @param {Object} [config] Config object.
     */
    constructor: function(config) {
        var me = this;

        /**
         * @property {Ext.slider.MultiSlider} slider
         * The slider this thumb is contained within
         */
        Ext.apply(me, config || {}, {
            cls: Ext.baseCSSPrefix + 'slider-thumb',

            /**
             * @cfg {Boolean} constrain True to constrain the thumb so that it cannot overlap its siblings
             */
            constrain: false
        });
        me.callParent([config]);
    },

    /**
     * Renders the thumb into a slider
     */
    render: function() {
        var me = this;
        me.el = me.slider.innerEl.insertFirst(me.getElConfig());
        me.onRender();
    },
    
    onRender: function() {
        if (this.disabled) {
            this.disable();
        }
        this.initEvents();
    },

    getElConfig: function() {
        var me = this,
            slider = me.slider,
            style = {};

        style[slider.vertical ? 'bottom' : slider.horizontalProp] = slider.calculateThumbPosition(slider.normalizeValue(me.value)) + '%';
        return {
            style: style,
            id  : this.id,
            cls : this.cls
        };
    },

    /**
     * @private
     * move the thumb
     */
    move: function(v, animate) {
        var me = this,
            el = me.el,
            slider = me.slider,
            styleProp = slider.vertical ? 'bottom' : slider.horizontalProp,
            to,
            from;

        v += '%';
        
        if (!animate) {
            el.dom.style[styleProp] = v;
        } else {
            to = {};
            to[styleProp] = v;
            
            if (!Ext.supports.GetPositionPercentage) {
                from = {};
                from[styleProp] = el.dom.style[styleProp];
            }
            
            new Ext.fx.Anim({
                target: el,
                duration: 350,
                from: from,
                to: to
            });
        }
    },

    /**
     * @private
     * Bring thumb dom element to front.
     */
    bringToFront: function() {
        this.el.setStyle('zIndex', this.topZIndex);
    },

    /**
     * @private
     * Send thumb dom element to back.
     */
    sendToBack: function() {
        this.el.setStyle('zIndex', '');
    },

    /**
     * Enables the thumb if it is currently disabled
     */
    enable: function() {
        var me = this;

        me.disabled = false;
        if (me.el) {
            me.el.removeCls(me.slider.disabledCls);
        }
    },

    /**
     * Disables the thumb if it is currently enabled
     */
    disable: function() {
        var me = this;

        me.disabled = true;
        if (me.el) {
            me.el.addCls(me.slider.disabledCls);
        }
    },

    /**
     * Sets up an Ext.dd.DragTracker for this thumb
     */
    initEvents: function() {
        var me = this,
            el = me.el;

        me.tracker = new Ext.dd.DragTracker({
            onBeforeStart: Ext.Function.bind(me.onBeforeDragStart, me),
            onStart      : Ext.Function.bind(me.onDragStart, me),
            onDrag       : Ext.Function.bind(me.onDrag, me),
            onEnd        : Ext.Function.bind(me.onDragEnd, me),
            tolerance    : 3,
            autoStart    : 300,
            overCls      : Ext.baseCSSPrefix + 'slider-thumb-over'
        });

        me.tracker.initEl(el);
    },

    /**
     * @private
     * This is tied into the internal Ext.dd.DragTracker. If the slider is currently disabled,
     * this returns false to disable the DragTracker too.
     * @return {Boolean} False if the slider is currently disabled
     */
    onBeforeDragStart : function(e) {
        if (this.disabled) {
            return false;
        } else {
            this.slider.promoteThumb(this);
            return true;
        }
    },

    /**
     * @private
     * This is tied into the internal Ext.dd.DragTracker's onStart template method. Adds the drag CSS class
     * to the thumb and fires the 'dragstart' event
     */
    onDragStart: function(e){
        var me = this,
            slider = me.slider;

        slider.onDragStart(me, e);
        me.el.addCls(Ext.baseCSSPrefix + 'slider-thumb-drag');
        me.dragging = me.slider.dragging = true;
        me.dragStartValue = me.value;

        slider.fireEvent('dragstart', slider, e, me);
    },

    /**
     * @private
     * This is tied into the internal Ext.dd.DragTracker's onDrag template method. This is called every time
     * the DragTracker detects a drag movement. It updates the Slider's value using the position of the drag
     */
    onDrag: function(e) {
        var me       = this,
            slider   = me.slider,
            index    = me.index,
            newValue = me.getValueFromTracker(),
            above,
            below;

        // If dragged out of range, value will be undefined
        if (newValue !== undefined) {
            if (me.constrain) {
                above = slider.thumbs[index + 1];
                below = slider.thumbs[index - 1];

                if (below !== undefined && newValue <= below.value) {
                    newValue = below.value;
                }

                if (above !== undefined && newValue >= above.value) {
                    newValue = above.value;
                }
            }
            slider.setValue(index, newValue, false);
            slider.fireEvent('drag', slider, e, me);
        }
    },

    getValueFromTracker: function() {
        var slider = this.slider,
            trackPoint = slider.getTrackpoint(this.tracker.getXY());

        // If dragged out of range, value will be undefined
        if (trackPoint !== undefined) {
            return slider.reversePixelValue(trackPoint);
        }
    },

    /**
     * @private
     * This is tied to the internal Ext.dd.DragTracker's onEnd template method. Removes the drag CSS class and
     * fires the 'changecomplete' event with the new value
     */
    onDragEnd: function(e) {
        var me     = this,
            slider = me.slider,
            value  = me.value;

        slider.onDragEnd(me, e);
        me.el.removeCls(Ext.baseCSSPrefix + 'slider-thumb-drag');

        me.dragging = slider.dragging = false;
        slider.fireEvent('dragend', slider, e);

        if (me.dragStartValue != value) {
            slider.fireEvent('changecomplete', slider, value, me);
        }
    },

    destroy: function() {
        Ext.destroy(this.tracker);
    }
});
