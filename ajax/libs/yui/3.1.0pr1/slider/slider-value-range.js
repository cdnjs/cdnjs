YUI.add('slider-value-range', function(Y) {

/**
 * Adds value support for Slider as a range of integers between a configured
 * minimum and maximum value.  For use with <code>Y.Base.build(..)</code> to
 * add the plumbing to <code>Y.SliderBase</code>.
 *
 * @module slider
 * @submodule slider-value-range
 */

// Constants for compression or performance
var MIN       = 'min',
    MAX       = 'max',
    VALUE     = 'value',

    round = Math.round;

/**
 * One class of value algorithm that can be built onto SliderBase.  By default,
 * values range between 0 and 100, but you can configure these on the
 * built Slider class by setting the <code>min</code> and <code>max</code>
 * configurations.  Set the initial value (will cause the thumb to move to the
 * appropriate location on the rail) in configuration as well if appropriate.
 *
 * @class SliderValueRange
 */
function SliderValueRange() {
    this._initSliderValueRange();
}

Y.SliderValueRange = Y.mix( SliderValueRange, {

    // Prototype properties and methods that will be added onto host class
    prototype: {
        /**
         * Cached X or Y offset for the rail to avoid extraneous
         * <code>getXY()</code> calls during run time calculation.
         *
         * @property _offsetXY
         * @type {Number}
         * @protected
         */
        _offsetXY: null,

        /**
         * Factor used to translate value -&gt; position -&gt; value.
         *
         * @property _factor
         * @type {Number}
         * @protected
         */
        _factor: 1,

        /**
         * Attach event listeners to keep the UI in sync with the min/max/value
         * attributes and thumb position.
         *
         * @method _initSliderValueRange
         * @protected
         */
        _initSliderValueRange: function () {
            this._key = this._key || {};

            Y.mix( this._key, ( this.axis === 'y' ) ?
                {
                    minEdge : 'top',
                    maxEdge : 'bottom',
                    xyIndex : 1
                } :
                {
                    minEdge : 'left',
                    maxEdge : 'right',
                    xyIndex : 0
                } );
        },

        /**
         * Override of stub method in SliderBase that is called at the end of
         * its bindUI stage of render().  Subscribes to internal events to
         * trigger UI and related state updates.
         *
         * @method _bindValueLogic
         * @protected
         */
        _bindValueLogic: function () {
            this.after( {
                minChange  : this._afterMinChange,
                maxChange  : this._afterMaxChange,
                valueChange: this._afterValueChange
            } );
        },

        /**
         * Move the thumb to appropriate position if necessary.  Also resets
         * the cached offsets and recalculates the conversion factor to
         * translate position to value.
         *
         * @method _syncThumbPosition
         * @protected
         */
        _syncThumbPosition: function () {
            this._cacheRailOffset();

            this._calculateFactor();

            this._setPosition( this.get( VALUE ) );
        },

        /**
         * Captures the current top left of the rail to avoid excessive DOM
         * lookups at run time.
         *
         * @method _cacheRailOffset
         * @protected
         */
        _cacheRailOffset: function () {
            var region = this._dd.con.getRegion();
            this._offsetXY = region[ this._key.minEdge ];
        },

        /**
         * Calculates and caches
         * (range between max and min) / (rail width or height)
         * for fast runtime calculation of position -&gt; value.
         *
         * @method _calculateFactor
         * @protected
         */
        _calculateFactor: function () {
            var region = this._dd.con.getRegion( true );

            // e.g. ( max - min ) / ( constrain.right - constrain.left )
            this._factor =
                ( this.get( MAX ) - this.get( MIN ) ) /
                ( region[ this._key.maxEdge ] - region[ this._key.minEdge ] );
        },

        /**
         * Dispatch the new position of the thumb into the value setting
         * operations.
         *
         * @method _defThumbMoveFn
         * @param e { EventFacade } The host's thumbMove event
         * @protected
         */
        _defThumbMoveFn: function ( e ) {
            var previous = this.get( VALUE ),
                position = this._dd.actXY[ this._key.xyIndex ],
                value    = this._offsetToValue( position );

            // Can't just do this.set( VALUE, this._offsetToValue( value ) )
            if ( previous !== value ) {
                this.set( VALUE, value, { ddEvent: e.ddEvent } );
            }
        },

        /**
         * <p>Converts a pixel position into a value.  Calculates current
         * position minus xy offsets of the rail multiplied by the
         * ratio of <code>(max - min) / (constraining dim)</code>.</p>
         *
         * <p>Override this if you want to use a different value mapping
         * algorithm.</p>
         *
         * @method _offsetToValue
         * @param { Number } X or Y pixel position
         * @return { mixed } Value corresponding to the provided pixel position
         * @protected
         */
        _offsetToValue: function ( xy ) {
            xy -= this._offsetXY;

            var value = round( xy * this._factor ) + this.get( MIN );

            return this._nearestValue( value );
        },

        /**
         * Converts a value into a positional pixel value for use in positioning
         * the thumb according to the reverse of the
         * <code>_offsetToValue( xy )</code> operation.
         *
         * @method _valueToOffset
         * @param val { Number } The value to map to pixel X or Y position
         * @return { Array } <code>[ <em>X</em>px, <em>Y</em>px ] positional values
         * @protected
         */
        _valueToOffset: function ( value ) {
            value -= this.get( MIN );

            return round( value / this._factor ) + this._offsetXY;
        },

        /**
         * Update position according to new min value.  If the new min results
         * in the current value being out of range, the value is set to the
         * closer of min or max.
         *
         * @method _afterMinChange
         * @param e { EventFacade } The <code>min</code> attribute change event.
         * @protected
         */
        _afterMinChange: function ( e ) {
            this._verifyValue();

            this._syncThumbPosition();
        },

        /**
         * Update position according to new max value.  If the new max results
         * in the current value being out of range, the value is set to the
         * closer of min or max.
         *
         * @method _afterMaxChange
         * @param e { EventFacade } The <code>max</code> attribute change event.
         * @protected
         */
        _afterMaxChange: function ( e ) {
            this._verifyValue();

            this._syncThumbPosition();
        },

        /**
         * Verifies that the current value is within the min - max range.  If
         * not, value is set to either min or max, depending on which is
         * closer.
         *
         * @method _verifyValue
         * @protected
         */
        _verifyValue: function () {
            var value   = this.get( VALUE ),
                nearest = this._nearestValue( value );

            if ( value !== nearest ) {
                // @TODO Can/should valueChange, minChange, etc be queued
                // events? To make dd.set( 'min', n ); execute after minChange
                // subscribers before on/after valueChange subscribers.
                this.set( VALUE, nearest );
            }
        },

        /**
         * Propagate change to the thumb position unless the change originated
         * from the thumbMove event.
         *
         * @method _afterValueChange
         * @param e { EventFacade } The <code>valueChange</code> event.
         * @protected
         */
        _afterValueChange: function ( e ) {
            if ( !e.ddEvent ) {
                this._setPosition( e.newVal );
            }
        },

        /**
         * Positions the thumb in accordance with the translated value.
         *
         * @method _setPosition
         * @protected
         */
        _setPosition: function ( value ) {
            var thumb = this._dd;

            // Drag element hasn't been setup yet
            if ( !thumb.deltaXY ) {
                thumb.actXY = thumb.get( 'dragNode' ).getXY();
                thumb._setStartPosition( thumb.actXY );
            }

            thumb.actXY[ this._key.xyIndex ] = this._valueToOffset( value );

            thumb._moveNode();
        },

        /**
         * Validates new values assigned to <code>min</code> attribute.  Numbers
         * are acceptable.  Override this to enforce different rules.
         *
         * @method _validateNewMin
         * @param value { mixed } Value assigned to <code>min</code> attribute.
         * @return { Boolean } True for numbers.  False otherwise.
         * @protected
         */
        _validateNewMin: function ( value ) {
            return Y.Lang.isNumber( value );
        },

        /**
         * Validates new values assigned to <code>max</code> attribute.  Numbers
         * are acceptable.  Override this to enforce different rules.
         *
         * @method _validateNewMax
         * @param value { mixed } Value assigned to <code>max</code> attribute.
         * @return { Boolean } True for numbers.  False otherwise.
         * @protected
         */
        _validateNewMax: function ( value ) {
            return Y.Lang.isNumber( value );
        },

        /**
         * Validates new values assigned to <code>value</code> attribute.
         * Numbers between the configured <code>min</code> and <code>max</code>
         * are acceptable.
         *
         * @method _validateNewValue
         * @param value { mixed } Value assigned to <code>value</code> attribute
         * @return { Boolean } True if value is a number between the configured
         *                     <code>min</code> and <code>max</code>.
         * @protected
         */
        _validateNewValue: function ( value ) {
            return ( value === this._nearestValue( value ) );
        },

        /**
         * Returns the nearest valid value to the value input.  If the provided
         * value is outside the min - max range, accounting for min > max
         * scenarios, the nearest of either min or max is returned.  Otherwise,
         * the provided value is returned.
         *
         * @method _nearestValue
         * @param value { mixed } Value to test against current min - max range
         * @return { Number } Current min, max, or value if within range
         * @protected
         */
        _nearestValue: function ( value ) {
            var min = this.get( MIN ),
                max = this.get( MAX ),
                tmp;

            // Account for reverse value range (min > max)
            tmp = ( max > min ) ? max : min;
            min = ( max > min ) ? min : max;
            max = tmp;

            return ( value < min ) ?
                    min :
                    ( value > max ) ?
                        max :
                        value;
        }

    },

    /**
     * Attributes that will be added onto host class.
     *
     * @property ATTRS
     * @type {Object}
     * @static
     * @protected
     */
    ATTRS: {
        /**
         * The value associated with the farthest top, left position of the
         * rail.  Can be greater than the configured <code>max</code> if you
         * want values to increase from right-to-left or bottom-to-top.
         *
         * @attribute min
         * @type { Number }
         * @default 0
         */
        min: {
            value    : 0,
            validator: '_validateNewMin'
        },

        /**
         * The value associated with the farthest bottom, right position of
         * the rail.  Can be less than the configured <code>min</code> if
         * you want values to increase from right-to-left or bottom-to-top.
         *
         * @attribute max
         * @type { Number }
         * @default 100
         */
        max: {
            value    : 100,
            validator: '_validateNewMax'
        },

        /**
         * The value associated with the thumb's current position on the
         * rail. Defaults to the value inferred from the thumb's current
         * position. Specifying value in the constructor will move the
         * thumb to the position that corresponds to the supplied value.
         *
         * @attribute value
         * @type { Number }
         * @default (inferred from current thumb position)
         */
        value: {
            value    : 0,
            validator: '_validateNewValue'
        }
    }
}, true );


}, '@VERSION@' ,{requires:['slider-base']});
