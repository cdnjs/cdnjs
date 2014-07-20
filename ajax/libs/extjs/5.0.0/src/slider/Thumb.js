/**
 * @class Ext.slider.Thumb
 * @private
 * Represents a single thumb element on a Slider. This would not usually be created manually and would instead
 * be created internally by an {@link Ext.slider.Multi Multi slider}.
 */
Ext.define('Ext.slider.Thumb', {
    requires: ['Ext.dd.DragTracker', 'Ext.util.Format'],

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
            cls : this.cls,
            role: 'presentation'
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
        var me = this;

        me.tracker = new Ext.dd.DragTracker({
            el           : me.el,
            onBeforeStart: me.onBeforeDragStart.bind(me),
            onStart      : me.onDragStart.bind(me),
            onDrag       : me.onDrag.bind(me),
            onEnd        : me.onDragEnd.bind(me),
            tolerance    : 3,
            autoStart    : 300,
            overCls      : Ext.baseCSSPrefix + 'slider-thumb-over'
        });
    },

    /**
     * @private
     * This is tied into the internal Ext.dd.DragTracker. If the slider is currently disabled,
     * this returns false to disable the DragTracker too.
     * @return {Boolean} False if the slider is currently disabled
     */
    onBeforeDragStart : function(e) {
        var me = this,
            el = me.el,
            trackerXY = me.tracker.getXY(),
            delta = me.pointerOffset = el.getXY();

        if (me.disabled) {
            return false;
        } else {
            // Work out the delta of the pointer from the dead centre of the thumb.
            // Slider.getTrackPoint positions the centre of the slider at the reported
            // pointer position, so we have to correct for that in getValueFromTracker.
            delta[0] += Math.floor(el.getWidth() / 2) - trackerXY[0];
            delta[1] += Math.floor(el.getHeight() / 2) - trackerXY[1];
            me.slider.promoteThumb(me);
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
            trackerXY = this.tracker.getXY(),
            trackPoint;

        trackerXY[0] += this.pointerOffset[0];
        trackerXY[1] += this.pointerOffset[1];
        trackPoint = slider.getTrackpoint(trackerXY);

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
            if (slider.publishOnComplete) {
                slider.publishValue(value);
            }
        }
    },

    destroy: function() {
        Ext.destroy(this.tracker);
        this.el.destroy();
        this.el = null;
    }
});
