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
 * Slider which supports vertical or horizontal orientation, keyboard adjustments, configurable snapping, axis clicking
 * and animation. Can be added as an item to any container.
 *
 * Sliders can be created with more than one thumb handle by passing an array of values instead of a single one:
 *
 *     @example
 *     Ext.create('Ext.slider.Multi', {
 *         width: 200,
 *         values: [25, 50, 75],
 *         increment: 5,
 *         minValue: 0,
 *         maxValue: 100,
 *
 *         // this defaults to true, setting to false allows the thumbs to pass each other
 *         constrainThumbs: false,
 *         renderTo: Ext.getBody()
 *     });
 */
Ext.define('Ext.slider.Multi', {
    extend: 'Ext.form.field.Base',
    alias: 'widget.multislider',
    alternateClassName: 'Ext.slider.MultiSlider',

    requires: [
        'Ext.slider.Thumb',
        'Ext.slider.Tip',
        'Ext.Number',
        'Ext.util.Format',
        'Ext.Template',
        'Ext.layout.component.field.Slider'
    ],

    childEls: [
        'endEl', 'innerEl'
    ],

    // note: {id} here is really {inputId}, but {cmpId} is available
    fieldSubTpl: [
        '<div id="{id}" class="' + Ext.baseCSSPrefix + 'slider {fieldCls} {vertical}',
        '{childElCls}',
        '" aria-valuemin="{minValue}" aria-valuemax="{maxValue}" aria-valuenow="{value}" aria-valuetext="{value}">',
            '<div id="{cmpId}-endEl" class="' + Ext.baseCSSPrefix + 'slider-end" role="presentation">',
                '<div id="{cmpId}-innerEl" class="' + Ext.baseCSSPrefix + 'slider-inner" role="presentation">',
                    '{%this.renderThumbs(out, values)%}',
                '</div>',
            '</div>',
        '</div>',
        {
            renderThumbs: function(out, values) {
                var me = values.$comp,
                    i = 0,
                    thumbs = me.thumbs,
                    len = thumbs.length,
                    thumb,
                    thumbConfig;

                for (; i < len; i++) {
                    thumb = thumbs[i];
                    thumbConfig = thumb.getElConfig();
                    thumbConfig.id = me.id + '-thumb-' + i;
                    Ext.DomHelper.generateMarkup(thumbConfig, out);
                }
            },
            disableFormats: true
        }
    ],
    
    horizontalProp: 'left',

    /**
     * @cfg {Number} value
     * A value with which to initialize the slider. Setting this will only result in the creation
     * of a single slider thumb; if you want multiple thumbs then use the {@link #values} config instead.
     *
     * Defaults to #minValue.
     */

    /**
     * @cfg {Number[]} values
     * Array of Number values with which to initalize the slider. A separate slider thumb will be created for each value
     * in this array. This will take precedence over the single {@link #value} config.
     */

    /**
     * @cfg {Boolean} vertical
     * Orient the Slider vertically rather than horizontally.
     */
    vertical: false,

    /**
     * @cfg {Number} minValue
     * The minimum value for the Slider.
     */
    minValue: 0,

    /**
     * @cfg {Number} maxValue
     * The maximum value for the Slider.
     */
    maxValue: 100,

    /**
     * @cfg {Number/Boolean} decimalPrecision The number of decimal places to which to round the Slider's value.
     *
     * To disable rounding, configure as **false**.
     */
    decimalPrecision: 0,

    /**
     * @cfg {Number} keyIncrement
     * How many units to change the Slider when adjusting with keyboard navigation. If the increment
     * config is larger, it will be used instead.
     */
    keyIncrement: 1,

    /**
     * @cfg {Number} increment
     * How many units to change the slider when adjusting by drag and drop. Use this option to enable 'snapping'.
     */
    increment: 0,

    /**
     * @cfg {Boolean} [zeroBasedSnapping=false]
     * Set to `true` to calculate snap points based on {@link #increment}s from zero as opposed to
     * from this Slider's {@link #minValue}.
     *
     * By Default, valid snap points are calculated starting {@link #increment}s from the {@link #minValue}
     */

    /**
     * @private
     * @property {Number[]} clickRange
     * Determines whether or not a click to the slider component is considered to be a user request to change the value. Specified as an array of [top, bottom],
     * the click event's 'top' property is compared to these numbers and the click only considered a change request if it falls within them. e.g. if the 'top'
     * value of the click event is 4 or 16, the click is not considered a change request as it falls outside of the [5, 15] range
     */
    clickRange: [5,15],

    /**
     * @cfg {Boolean} clickToChange
     * Determines whether or not clicking on the Slider axis will change the slider.
     */
    clickToChange : true,

    /**
     * @cfg {Boolean} animate
     * Turn on or off animation.
     */
    animate: true,

    /**
     * @property {Boolean} dragging
     * True while the thumb is in a drag operation
     */
    dragging: false,

    /**
     * @cfg {Boolean} constrainThumbs
     * True to disallow thumbs from overlapping one another.
     */
    constrainThumbs: true,

    componentLayout: 'sliderfield',

    /**
     * @cfg {Object/Boolean} useTips
     * True to use an {@link Ext.slider.Tip} to display tips for the value. This option may also
     * provide a configuration object for an {@link Ext.slider.Tip}.
     */
    useTips : true,

    /**
     * @cfg {Function} [tipText=undefined]
     * A function used to display custom text for the slider tip.
     *
     * Defaults to null, which will use the default on the plugin.
     *
     * @cfg {Ext.slider.Thumb} tipText.thumb The Thumb that the Tip is attached to
     * @cfg {String} tipText.return The text to display in the tip
     */
    tipText : null,

    ariaRole: 'slider',

    // private override
    initValue: function() {
        var me = this,
            extValue = Ext.value,
            // Fallback for initial values: values config -> value config -> minValue config -> 0
            values = extValue(me.values, [extValue(me.value, extValue(me.minValue, 0))]),
            i = 0,
            len = values.length;

        // Store for use in dirty check
        me.originalValue = values;

        // Add a thumb for each value
        for (; i < len; i++) {
            me.addThumb(values[i]);
        }
    },

    // private override
    initComponent : function() {
        var me = this,
            tipPlug,
            hasTip,
            p, pLen, plugins;

        /**
         * @property {Array} thumbs
         * Array containing references to each thumb
         */
        me.thumbs = [];

        me.keyIncrement = Math.max(me.increment, me.keyIncrement);

        me.addEvents(
            /**
             * @event beforechange
             * Fires before the slider value is changed. By returning false from an event handler, you can cancel the
             * event and prevent the slider from changing.
             * @param {Ext.slider.Multi} slider The slider
             * @param {Number} newValue The new value which the slider is being changed to.
             * @param {Number} oldValue The old value which the slider was previously.
             */
            'beforechange',

            /**
             * @event change
             * Fires when the slider value is changed.
             * @param {Ext.slider.Multi} slider The slider
             * @param {Number} newValue The new value which the slider has been changed to.
             * @param {Ext.slider.Thumb} thumb The thumb that was changed
             */
            'change',

            /**
             * @event changecomplete
             * Fires when the slider value is changed by the user and any drag operations have completed.
             * @param {Ext.slider.Multi} slider The slider
             * @param {Number} newValue The new value which the slider has been changed to.
             * @param {Ext.slider.Thumb} thumb The thumb that was changed
             */
            'changecomplete',

            /**
             * @event dragstart
             * Fires after a drag operation has started.
             * @param {Ext.slider.Multi} slider The slider
             * @param {Ext.EventObject} e The event fired from Ext.dd.DragTracker
             */
            'dragstart',

            /**
             * @event drag
             * Fires continuously during the drag operation while the mouse is moving.
             * @param {Ext.slider.Multi} slider The slider
             * @param {Ext.EventObject} e The event fired from Ext.dd.DragTracker
             */
            'drag',

            /**
             * @event dragend
             * Fires after the drag operation has completed.
             * @param {Ext.slider.Multi} slider The slider
             * @param {Ext.EventObject} e The event fired from Ext.dd.DragTracker
             */
            'dragend'
        );

        me.callParent();

        // only can use it if it exists.
        if (me.useTips) {
            if (Ext.isObject(me.useTips)) {
                tipPlug = Ext.apply({}, me.useTips);
            } else {
                tipPlug = me.tipText ? {getText: me.tipText} : {};    
            }

            plugins = me.plugins = me.plugins || [];
            pLen    = plugins.length;
            
            for (p = 0; p < pLen; p++) {
                if (plugins[p].isSliderTip) {
                    hasTip = true;
                    break;
                }
            }

            if (!hasTip) {
                me.plugins.push(new Ext.slider.Tip(tipPlug));
            }
        }
    },

    /**
     * Creates a new thumb and adds it to the slider
     * @param {Number} [value=0] The initial value to set on the thumb.
     * @return {Ext.slider.Thumb} The thumb
     */
    addThumb: function(value) {
        var me = this,
            thumb = new Ext.slider.Thumb({
                ownerCt     : me,
                ownerLayout : me.getComponentLayout(),
                value       : value,
                slider      : me,
                index       : me.thumbs.length,
                constrain   : me.constrainThumbs,
                disabled    : !!me.readOnly
            });

        me.thumbs.push(thumb);

        //render the thumb now if needed
        if (me.rendered) {
            thumb.render();
        }

        return thumb;
    },

    /**
     * @private
     * Moves the given thumb above all other by increasing its z-index. This is called when as drag
     * any thumb, so that the thumb that was just dragged is always at the highest z-index. This is
     * required when the thumbs are stacked on top of each other at one of the ends of the slider's
     * range, which can result in the user not being able to move any of them.
     * @param {Ext.slider.Thumb} topThumb The thumb to move to the top
     */
    promoteThumb: function(topThumb) {
        var thumbs = this.thumbs,
            ln = thumbs.length,
            zIndex, thumb, i;

        for (i = 0; i < ln; i++) {
            thumb = thumbs[i];

            if (thumb == topThumb) {
                thumb.bringToFront();
            } else {
                thumb.sendToBack();
            }
        }
    },

    // private override
    getSubTplData : function() {
        var me = this;

        return Ext.apply(me.callParent(), {
            $comp: me,
            vertical: me.vertical ? Ext.baseCSSPrefix + 'slider-vert' : Ext.baseCSSPrefix + 'slider-horz',
            minValue: me.minValue,
            maxValue: me.maxValue,
            value: me.value,
            childElCls: ''
        });
    },

    onRender : function() {
        var me = this,
            thumbs = me.thumbs,
            len = thumbs.length,
            i = 0,
            thumb;

        me.callParent(arguments);

        for (i = 0; i < len; i++) {
            thumb = thumbs[i];
            thumb.el = me.el.getById(me.id + '-thumb-' + i);
            thumb.onRender();
        }
    },

    /**
     * @private
     * Adds keyboard and mouse listeners on this.el. Ignores click events on the internal focus element.
     */
    initEvents : function() {
        var me = this;
        me.mon(me.el, {
            scope    : me,
            mousedown: me.onMouseDown,
            keydown  : me.onKeyDown
        });
    },
    
    onDragStart: Ext.emptyFn,
    onDragEnd: Ext.emptyFn,

    /**
     * @private
     * Given an `[x, y]` position within the slider's track (Points outside the slider's track are coerced to either the minimum or maximum value),
     * calculate how many pixels **from the slider origin** (left for horizontal Sliders and bottom for vertical Sliders) that point is.
     *
     * If the point is outside the range of the Slider's track, the return value is `undefined`
     * @param {Number[]} xy The point to calculate the track point for
     */
    getTrackpoint : function(xy) {
        var me = this,
            vertical = me.vertical,
            sliderTrack = me.innerEl,
            trackLength, result,
            positionProperty;

        if (vertical) {
            positionProperty = 'top';
            trackLength = sliderTrack.getHeight();
        } else {
            positionProperty = me.horizontalProp;
            trackLength = sliderTrack.getWidth();
        }
        xy = me.transformTrackPoints(sliderTrack.translatePoints(xy));
        result = Ext.Number.constrain(xy[positionProperty], 0, trackLength);
        return vertical ? trackLength - result : result;
    },
    
    transformTrackPoints: Ext.identityFn,

    /**
     * @private
     * Mousedown handler for the slider. If the clickToChange is enabled and the click was not on the draggable 'thumb',
     * this calculates the new value of the slider and tells the implementation (Horizontal or Vertical) to move the thumb
     * @param {Ext.EventObject} e The click event
     */
    onMouseDown : function(e) {
        var me = this,
            thumbClicked = false,
            i = 0,
            thumbs = me.thumbs,
            len = thumbs.length,
            trackPoint;

        if (me.disabled) {
            return;
        }

        //see if the click was on any of the thumbs
        for (; i < len; i++) {
            thumbClicked = thumbClicked || e.target == thumbs[i].el.dom;
        }

        if (me.clickToChange && !thumbClicked) {
            trackPoint = me.getTrackpoint(e.getXY());
            if (trackPoint !== undefined) {
                me.onClickChange(trackPoint);
            }
        }
        me.focus();
    },

    /**
     * @private
     * Moves the thumb to the indicated position.
     * Only changes the value if the click was within this.clickRange.
     * @param {Number} trackPoint local pixel offset **from the origin** (left for horizontal and bottom for vertical) along the Slider's axis at which the click event occured.
     */
    onClickChange : function(trackPoint) {
        var me = this,
            thumb, index;

        // How far along the track *from the origin* was the click.
        // If vertical, the origin is the bottom of the slider track.

        //find the nearest thumb to the click event
        thumb = me.getNearest(trackPoint);
        if (!thumb.disabled) {
            index = thumb.index;
            me.setValue(index, Ext.util.Format.round(me.reversePixelValue(trackPoint), me.decimalPrecision), undefined, true);
        }
    },

    /**
     * @private
     * Returns the nearest thumb to a click event, along with its distance
     * @param {Number} trackPoint local pixel position along the Slider's axis to find the Thumb for
     * @return {Object} The closest thumb object and its distance from the click event
     */
    getNearest: function(trackPoint) {
        var me = this,
            clickValue = me.reversePixelValue(trackPoint),
            nearestDistance = me.getRange() + 5, //add a small fudge for the end of the slider
            nearest = null,
            thumbs = me.thumbs,
            i = 0,
            len = thumbs.length,
            thumb,
            value,
            dist;

        for (; i < len; i++) {
            thumb = me.thumbs[i];
            value = thumb.value;
            dist  = Math.abs(value - clickValue);

            if (Math.abs(dist <= nearestDistance)) {
                nearest = thumb;
                nearestDistance = dist;
            }
        }
        return nearest;
    },

    /**
     * @private
     * Handler for any keypresses captured by the slider. If the key is UP or RIGHT, the thumb is moved along to the right
     * by this.keyIncrement. If DOWN or LEFT it is moved left. Pressing CTRL moves the slider to the end in either direction
     * @param {Ext.EventObject} e The Event object
     */
    onKeyDown : function(e) {
        /*
         * The behaviour for keyboard handling with multiple thumbs is currently undefined.
         * There's no real sane default for it, so leave it like this until we come up
         * with a better way of doing it.
         */
        var me = this,
            k,
            val;

        if(me.disabled || me.thumbs.length !== 1) {
            e.preventDefault();
            return;
        }
        k = e.getKey();

        switch(k) {
            case e.UP:
            case e.RIGHT:
                e.stopEvent();
                val = e.ctrlKey ? me.maxValue : me.getValue(0) + me.keyIncrement;
                me.setValue(0, val, undefined, true);
            break;
            case e.DOWN:
            case e.LEFT:
                e.stopEvent();
                val = e.ctrlKey ? me.minValue : me.getValue(0) - me.keyIncrement;
                me.setValue(0, val, undefined, true);
            break;
            default:
                e.preventDefault();
        }
    },

    /**
     * @private
     * Returns a snapped, constrained value when given a desired value
     * @param {Number} value Raw number value
     * @return {Number} The raw value rounded to the correct d.p. and constrained within the set max and min values
     */
    normalizeValue : function(v) {
        var me = this,
            snapFn = me.zeroBasedSnapping ? 'snap' : 'snapInRange';

        v = Ext.Number[snapFn](v, me.increment, me.minValue, me.maxValue);
        v = Ext.util.Format.round(v, me.decimalPrecision);
        v = Ext.Number.constrain(v, me.minValue, me.maxValue);
        return v;
    },

    /**
     * Sets the minimum value for the slider instance. If the current value is less than the minimum value, the current
     * value will be changed.
     * @param {Number} val The new minimum value
     */
    setMinValue : function(val) {
        var me = this,
            thumbs = me.thumbs,
            len = thumbs.length,
            thumb, i;

        me.minValue = val;
        if (me.rendered) {
            me.inputEl.dom.setAttribute('aria-valuemin', val);
        }

        for (i = 0; i < len; ++i) {
            thumb = thumbs[i];
            if (thumb.value < val) {
                me.setValue(i, val, false);    
            }
        }
        me.syncThumbs();
    },

    /**
     * Sets the maximum value for the slider instance. If the current value is more than the maximum value, the current
     * value will be changed.
     * @param {Number} val The new maximum value
     */
    setMaxValue : function(val) {
        var me = this,
            thumbs = me.thumbs,
            len = thumbs.length,
            thumb, i;

        me.maxValue = val;
        if (me.rendered) {
            me.inputEl.dom.setAttribute('aria-valuemax', val);
        }

        for (i = 0; i < len; ++i) {
            thumb = thumbs[i];
            if (thumb.value > val) {
                me.setValue(i, val, false);
            }
        }
        me.syncThumbs();
    },

    /**
     * Programmatically sets the value of the Slider. Ensures that the value is constrained within the minValue and
     * maxValue.
     * 
     * Setting a single value:
     *     // Set the second slider value, don't animate
     *     mySlider.setValue(1, 50, false);
     * 
     * Setting multiple values at once
     *     // Set 3 thumb values, animate
     *     mySlider.setValue([20, 40, 60], true);
     * 
     * @param {Number/Number[]} index Index of the thumb to move. Alternatively, it can be an array of values to set
     * for each thumb in the slider.
     * @param {Number} value The value to set the slider to. (This will be constrained within minValue and maxValue)
     * @param {Boolean} [animate=true] Turn on or off animation
     * @return {Ext.slider.Multi} this
     */
    setValue : function(index, value, animate, changeComplete) {
        var me = this,
            thumbs = me.thumbs,
            thumb, len, i, values;
            
        if (Ext.isArray(index)) {
            values = index;
            animate = value;
            
            for (i = 0, len = values.length; i < len; ++i) {
                thumb = thumbs[i];
                if (thumb) {
                    me.setValue(i, values[i], animate);
                }    
            }
            return me;
        }

        thumb = me.thumbs[index];
        // ensures value is contstrained and snapped
        value = me.normalizeValue(value);

        if (value !== thumb.value && me.fireEvent('beforechange', me, value, thumb.value, thumb) !== false) {
            thumb.value = value;
            if (me.rendered) {
                // TODO this only handles a single value; need a solution for exposing multiple values to aria.
                // Perhaps this should go on each thumb element rather than the outer element.
                me.inputEl.set({
                    'aria-valuenow': value,
                    'aria-valuetext': value
                });

                thumb.move(me.calculateThumbPosition(value), Ext.isDefined(animate) ? animate !== false : me.animate);

                me.fireEvent('change', me, value, thumb);
                me.checkDirty();
                if (changeComplete) {
                    me.fireEvent('changecomplete', me, value, thumb);
                }
            }
        }
        return me;
    },

    /**
     * @private
     * Given a value within this Slider's range, calculates a Thumb's percentage CSS position to map that value.
     */
    calculateThumbPosition : function(v) {
        var me = this,
            minValue = me.minValue,
            pos = (v - minValue) / me.getRange() * 100;

        // If the total number of records is <= pageSize then return minValue.
        if (isNaN(pos)) {
            pos = minValue;
        }

        return pos;
    },

    /**
     * @private
     * Returns the ratio of pixels to mapped values. e.g. if the slider is 200px wide and maxValue - minValue is 100,
     * the ratio is 2
     * @return {Number} The ratio of pixels to mapped values
     */
    getRatio : function() {
        var me = this,
            innerEl = me.innerEl,
            trackLength = me.vertical ? innerEl.getHeight() : innerEl.getWidth(),
            valueRange = me.getRange();
            
        return valueRange === 0 ? trackLength : (trackLength / valueRange);
    },
    
    getRange: function(){
        return this.maxValue - this.minValue;
    },

    /**
     * @private
     * Given a pixel location along the slider, returns the mapped slider value for that pixel.
     * E.g. if we have a slider 200px wide with minValue = 100 and maxValue = 500, reversePixelValue(50)
     * returns 200
     * @param {Number} pos The position along the slider to return a mapped value for
     * @return {Number} The mapped value for the given position
     */
    reversePixelValue : function(pos) {
        return this.minValue + (pos / this.getRatio());
    },

    /**
     * @private
     * Given a Thumb's percentage position along the slider, returns the mapped slider value for that pixel.
     * E.g. if we have a slider 200px wide with minValue = 100 and maxValue = 500, reversePercentageValue(25)
     * returns 200
     * @param {Number} pos The percentage along the slider track to return a mapped value for
     * @return {Number} The mapped value for the given position
     */
    reversePercentageValue : function(pos) {
        return this.minValue + this.getRange() * (pos / 100);
    },

    //private
    onDisable: function() {
        var me = this,
            i = 0,
            thumbs = me.thumbs,
            len = thumbs.length,
            thumb,
            el,
            xy;

        me.callParent();

        for (; i < len; i++) {
            thumb = thumbs[i];
            el = thumb.el;

            thumb.disable();

            if(Ext.isIE) {
                //IE breaks when using overflow visible and opacity other than 1.
                //Create a place holder for the thumb and display it.
                xy = el.getXY();
                el.hide();

                me.innerEl.addCls(me.disabledCls).dom.disabled = true;

                if (!me.thumbHolder) {
                    me.thumbHolder = me.endEl.createChild({cls: Ext.baseCSSPrefix + 'slider-thumb ' + me.disabledCls});
                }

                me.thumbHolder.show().setXY(xy);
            }
        }
    },

    //private
    onEnable: function() {
        var me = this,
            i = 0,
            thumbs = me.thumbs,
            len = thumbs.length,
            thumb,
            el;

        this.callParent();

        for (; i < len; i++) {
            thumb = thumbs[i];
            el = thumb.el;

            thumb.enable();

            if (Ext.isIE) {
                me.innerEl.removeCls(me.disabledCls).dom.disabled = false;

                if (me.thumbHolder) {
                    me.thumbHolder.hide();
                }

                el.show();
                me.syncThumbs();
            }
        }
    },

    /**
     * Synchronizes thumbs position to the proper proportion of the total component width based on the current slider
     * {@link #value}. This will be called automatically when the Slider is resized by a layout, but if it is rendered
     * auto width, this method can be called from another resize handler to sync the Slider if necessary.
     */
    syncThumbs : function() {
        if (this.rendered) {
            var thumbs = this.thumbs,
                length = thumbs.length,
                i = 0;

            for (; i < length; i++) {
                thumbs[i].move(this.calculateThumbPosition(thumbs[i].value));
            }
        }
    },

    /**
     * Returns the current value of the slider
     * @param {Number} index The index of the thumb to return a value for
     * @return {Number/Number[]} The current value of the slider at the given index, or an array of all thumb values if
     * no index is given.
     */
    getValue : function(index) {
        return Ext.isNumber(index) ? this.thumbs[index].value : this.getValues();
    },

    /**
     * Returns an array of values - one for the location of each thumb
     * @return {Number[]} The set of thumb values
     */
    getValues: function() {
        var values = [],
            i = 0,
            thumbs = this.thumbs,
            len = thumbs.length;

        for (; i < len; i++) {
            values.push(thumbs[i].value);
        }

        return values;
    },

    getSubmitValue: function() {
        var me = this;
        return (me.disabled || !me.submitValue) ? null : me.getValue();
    },

    reset: function() {
        var me = this,
            arr = [].concat(me.originalValue),
            a     = 0,
            aLen  = arr.length,
            val;

        for (; a < aLen; a++) {
            val = arr[a];

            me.setValue(a, val);
        }

        me.clearInvalid();
        // delete here so we reset back to the original state
        delete me.wasValid;
    },
    
    setReadOnly: function(readOnly){
        var me = this,
            thumbs = me.thumbs,
            len = thumbs.length,
            i = 0;
            
        me.callParent(arguments); 
        readOnly = me.readOnly;
        
        for (; i < len; ++i) {
            if (readOnly) {
                thumbs[i].disable();
            } else {
                thumbs[i].enable();
            }
            
        }
           
    },

    // private
    beforeDestroy : function() {
        var me     = this,
            thumbs = me.thumbs,
            t      = 0,
            tLen   = thumbs.length,
            thumb;

        Ext.destroy(me.innerEl, me.endEl, me.focusEl);

        for (; t < tLen; t++) {
            thumb = thumbs[t];

            Ext.destroy(thumb);
        }

        me.callParent();
    }
});
