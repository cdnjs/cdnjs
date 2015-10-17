YUI.add('slider-base', function(Y) {

/**
 * Create a sliding value range input visualized as a draggable thumb on a
 * background element.
 * 
 * @module slider
 * @submodule slider-base
 */

var INVALID_VALUE = Y.Attribute.INVALID_VALUE;

/**
 * Create a slider to represent an input control capable of representing a
 * series of intermediate states based on the position of the slider's thumb.
 * These states are typically aligned to a value algorithm whereby the thumb
 * position corresponds to a given value. Sliders may be aligned vertically or
 * horizontally, based on the <code>axis</code> configuration.
 *
 * @class SliderBase
 * @extends Widget
 * @param config {Object} Configuration object
 * @constructor
 */
function SliderBase() {
    SliderBase.superclass.constructor.apply( this, arguments );
}

Y.SliderBase = Y.extend( SliderBase, Y.Widget, {

    // Y.Slider prototype

    /**
     * Construction logic executed during Slider instantiation.
     *
     * @method initializer
     * @protected
     */
    initializer : function () {
        /**
         * The configured axis, stored for fast lookup since it's a writeOnce
         * attribute.  This is for use by extension classes.  For
         * implementation code, use <code>get( &quot;axis&quot; )</code> for
         * authoritative source.  Never write to this property.
         *
         * @property axis
         * @type {String}
         * @protected
         */
        this.axis = this.get( 'axis' );

        /**
         * Cached fast access map for DOM properties and attributes that
         * pertain to accessing dimensional or positioning information
         * according to the Slider's axis (e.g. &quot;height&quot; vs.
         * &quot;width&quot;).  Extension classes should add to this collection
         * for axis related strings if necessary.
         *
         * @property _key
         * @type {Object}
         * @protected
         */
        this._key = {
            dim    : ( this.axis === 'y' ) ? 'height' : 'width',
            minEdge: ( this.axis === 'y' ) ? 'top'    : 'left',
            maxEdge: ( this.axis === 'y' ) ? 'bottom' : 'right'
        };

        /**
         * Signals that the thumb has moved.  Payload includes the thumb's
         * <code>drag:align</code>.
         *
         * @event thumbMove
         * @param event {Event} The event object for the thumbMove with the
         *                      following extra properties:
         *  <dl>
         *      <dt>ddEvent</dt>
         *          <dd><code>drag:align</code> event from the thumb</dd>
         *  </dl>
         */
        this.publish( 'thumbMove', {
            defaultFn: this._defThumbMoveFn,
            queuable : true
        } );
    },

    /**
     * Create the DOM structure for the Slider.
     *
     * @method renderUI
     * @protected
     */
    renderUI : function () {
        var contentBox = this.get( 'contentBox' );

        /**
         * The Node instance of the Slider's rail element.  Do not write to
         * this property.
         *
         * @property rail
         * @type {Node}
         */
        this.rail = this._renderRail();

        this._uiSetRailLength( this.get( 'length' ) );

        /**
         * The Node instance of the Slider's thumb element.  Do not write to
         * this property.
         *
         * @property thumb
         * @type {Node}
         */
        this.thumb = this._renderThumb();

        this.rail.appendChild( this.thumb );
        // @TODO: insert( contentBox, 'replace' ) or setContent?
        contentBox.appendChild( this.rail );

        // <span class="yui3-slider-x">
        contentBox.addClass( this.getClassName( this.axis ) );
    },

    /**
     * Creates the Slider rail DOM subtree for insertion into the Slider's
     * <code>contentBox</code>.
     *
     * @method _renderRail
     * @return {Node} the rail node subtree
     * @protected
     */
    _renderRail: function () {
        var minCapClass = this.getClassName( 'rail', 'cap', this._key.minEdge ),
            maxCapClass = this.getClassName( 'rail', 'cap', this._key.maxEdge );

        return Y.Node.create(
            Y.substitute( this.RAIL_TEMPLATE, {
                railClass      : this.getClassName( 'rail' ),
                railMinCapClass: minCapClass,
                railMaxCapClass: maxCapClass
            } ) );
    },

    /**
     * Sets the rail length according to the <code>length</code> attribute.
     *
     * @method _uiSetRailLength
     * @param length {String} the length to apply to the rail style
     * @protected
     */
    _uiSetRailLength: function ( length ) {
        this.rail.setStyle( this._key.dim, length );
    },

    /**
     * Creates the Slider thumb DOM subtree for insertion into the Slider's
     * rail.
     *
     * @method _renderThumb
     * @return {Node} the thumb node subtree
     * @protected
     */
    _renderThumb: function () {
        this._initThumbUrl();

        var imageUrl = this.get( 'thumbUrl' );

        return Y.Node.create(
            Y.substitute( this.THUMB_TEMPLATE, {
                thumbClass      : this.getClassName( 'thumb' ),
                thumbShadowClass: this.getClassName( 'thumb', 'shadow' ),
                thumbImageClass : this.getClassName( 'thumb', 'image' ),
                thumbShadowUrl  : imageUrl,
                thumbImageUrl   : imageUrl
            } ) );
    },

    /**
     * Creates the Y.DD.Drag instance used to handle the thumb movement and
     * binds Slider interaction to the configured value model.
     *
     * @method bindUI
     * @protected
     */
    bindUI : function () {
        this._bindThumbDD();

        this._bindValueLogic();

        this.after( 'disabledChange', this._afterDisabledChange );
        this.after( 'lengthChange',   this._afterLengthChange );
    },

    /**
     * Makes the thumb draggable and constrains it to the rail.
     *
     * @method _bindThumbDD
     * @protected
     */
    _bindThumbDD: function () {
        var config = { constrain: this.rail };
        
        // { constrain: rail, stickX: true }
        config[ 'stick' + this.axis.toUpperCase() ] = true;

        /** 
         * The DD.Drag instance linked to the thumb node.
         *
         * @property _dd
         * @type {DD.Drag}
         * @protected
         */
        this._dd = new Y.DD.Drag( {
            node   : this.thumb,
            bubble : false,
            on     : {
                'drag:start': Y.bind( this._onDragStart, this )
            },
            after  : {
                'drag:align': Y.bind( this._afterAlign,   this ),
                'drag:end'  : Y.bind( this._afterDragEnd, this )
            }
        } );

        // Constrain the thumb to the rail
        this._dd.plug( Y.Plugin.DDConstrained, config );
    },

    /**
     * Stub implementation.  Override this (presumably in a class extension) to
     * initialize any value logic that depends on the presence of the Drag
     * instance.
     *
     * @method _bindValueLogic
     * @protected
     */
    _bindValueLogic: function () {},

    /**
     * Dispatches the <code>slideStart</code> event.
     *
     * @method _onDragStart
     * @param e {Event} the <code>drag:start</code> event from the thumb
     * @protected
     */
    _onDragStart: function ( e ) {
        /**
         * Signals the beginning of a thumb drag operation.  Payload includes
         * the thumb's drag:start event.
         *
         * @event slideStart
         * @param event {Event} The event object for the slideStart with the
         *                      following extra properties:
         *  <dl>
         *      <dt>ddEvent</dt>
         *          <dd><code>drag:start</code> event from the thumb</dd>
         *  </dl>
         */
        this.fire( 'slideStart', { ddEvent: e } );
    },

    /**
     * Dispatches the <code>thumbMove</code> event.
     *
     * @method _afterAlign
     * @param e {Event} the <code>drag:align</code> event from the thumb
     * @protected
     */
    _afterAlign: function ( e ) {
        this.fire( 'thumbMove', { ddEvent: e } );
    },

    /**
     * Dispatches the <code>slideEnd</code> event.
     *
     * @method _onDragEnd
     * @param e {Event} the <code>drag:end</code> event from the thumb
     * @protected
     */
    _afterDragEnd: function ( e ) {
        /**
         * Signals the end of a thumb drag operation.  Payload includes
         * the thumb's drag:end event.
         *
         * @event slideStart
         * @param event {Event} The event object for the slideEnd with the
         *                      following extra properties:
         *  <dl>
         *      <dt>ddEvent</dt>
         *          <dd><code>drag:end</code> event from the thumb</dd>
         *  </dl>
         */
        this.fire( 'slideEnd', { ddEvent: e } );
    },

    /**
     * Locks or unlocks the thumb.
     *
     * @method _afterDisabledChange
     * @param e {Event} The disabledChange event object
     * @protected
     */
    _afterDisabledChange: function ( e ) {
        this._dd.set( 'lock', e.newVal );
    },

    /**
     * Handles changes to the <code>length</code> attribute.  By default, it
     * triggers an update to the UI.
     *
     * @method _afterLengthChange
     * @param e {Event} The lengthChange event object
     * @protected
     */
    _afterLengthChange: function ( e ) {
        if ( this.get( 'rendered' ) ) {
            this._uiSetRailLength( e.newVal );

            this.syncUI();
        }
    },

    /**
     * Synchronizes the DOM state with the attribute settings.
     *
     * @method syncUI
     */
    syncUI : function () {
        this._dd.con.resetCache();

        this._syncThumbPosition();

        // Forces a reflow of the bounding box to address IE8 inline-block
        // container not expanding correctly. bug 2527905
        //this.get('boundingBox').toggleClass('');
    },

    /**
     * Stub implementation.  Override this (presumably in a class extension) to
     * ensure the thumb is in the correct position according to the value
     * alogorithm.
     * instance.
     *
     * @method _syncThumbPosition
     * @protected
     */
    _syncThumbPosition: function () {},

    /**
     * Validates the axis is &quot;x&quot; or &quot;y&quot; (case insensitive).
     * Converts to lower case for storage.
     *
     * @method _setAxis
     * @param v {String} proposed value for the axis attribute
     * @return {String} lowercased first character of the input string
     * @protected
     */
    _setAxis : function (v) {
        v = ( v + '' ).toLowerCase();

        return ( v === 'x' || v === 'y' ) ? v : INVALID_VALUE;
    },

    /** 
     * Ensures the stored length value is a string with a quantity and unit.
     * Unit will be defaulted to &quot;px&quot; if not included.  Rejects
     * values less than or equal to 0 and those that don't at least start with
     * a number.
     *
     * @method _setLength
     * @param v {String} proposed value for the length attribute
     * @return {String} the sanitized value
     * @protected
     */
    _setLength: function ( v ) {
        v = ( v + '' ).toLowerCase();

        var length = parseFloat( v, 10 ),
            units  = v.replace( /[\d\.\-]/g, '' ) || this.DEF_UNIT;

        return length > 0 ? ( length + units ) : INVALID_VALUE;
    },

    /**
     * <p>Defaults the thumbURL attribute according to the current skin, or
     * &quot;sam&quot; if none can be determined.  Horizontal Sliders will have
     * their <code>thumbUrl</code> attribute set to</p>
     * <p><code>&quot;/<em>configured</em>/<em>yu</em>i/<em>builddi</em>r/slider/assets/skins/sam/thumb-x.png&quot;</code></p>
     * <p>And vertical thumbs will get</p>
     * <p><code>&quot;/<em>configured</em>/<em>yui</em>/<em>builddir</em>/slider/assets/skins/sam/thumb-y.png&quot;</code></p>
     *
     * @method _initThumbUrl
     * @protected
     */
    _initThumbUrl: function () {
        var url     = this.get( 'thumbUrl' ),
            skin    = this.getSkinName() || 'sam',
            skinDir = Y.config.base + 'slider/assets/skins/' + skin;

        if ( !url ) {
            // <img src="/path/to/build/slider/assets/skins/sam/thumb-x.png">
            url = skinDir + '/thumb-' + this.axis + '.png';
            this.set( 'thumbUrl', url );
        }
    },

    /**
     * Bounding box template that will contain the Slider's DOM subtree.  &lt;span&gt;s are used to support inline-block styling.
     *
     * @property BOUNDING_TEMPLATE
     * @type {String}
     * @default &lt;span>&lt;/span>
     */
    BOUNDING_TEMPLATE : '<span></span>',

    /**
     * Content box template that will contain the Slider's rail and thumb.
     *
     * @property CONTENT_TEMPLATE
     * @type {String}
     * @default &lt;span>&lt;/span>
     */
    CONTENT_TEMPLATE  : '<span></span>',

    /**
     * Rail template that will contain the end caps and the thumb.
     * {placeholder}s are used for template substitution at render time.
     *
     * @property RAIL_TEMPLATE
     * @type {String}
     * @default &lt;span class="{railClass}">&lt;span class="{railMinCapClass}">&lt;/span>&lt;span class="{railMaxCapClass}">&lt;/span>&lt;/span>
     */
    RAIL_TEMPLATE     : '<span class="{railClass}">' +
                            '<span class="{railMinCapClass}"></span>' +
                            '<span class="{railMaxCapClass}"></span>' +
                        '</span>',

    /**
     * Thumb template that will contain the thumb image and shadow. &lt;img>
     * tags are used instead of background images to avoid a flicker bug in IE.
     * {placeholder}s are used for template substitution at render time.
     *
     * @property THUMB_TEMPLATE
     * @type {String}
     * @default &lt;span class="{thumbClass}" tabindex="-1">&lt;img src="{thumbShadowUrl}" alt="Slider thumb shadow" class="{thumbShadowClass}">&lt;img src="{thumbImageUrl}" alt="Slider thumb" class="{thumbImageClass}">&lt;/span>
     */
    THUMB_TEMPLATE    : '<span class="{thumbClass}" tabindex="-1">' +
                            '<img src="{thumbShadowUrl}" ' +
                                'alt="Slider thumb shadow" ' +
                                'class="{thumbShadowClass}">' +
                            '<img src="{thumbImageUrl}" ' +
                                'alt="Slider thumb" ' +
                                'class="{thumbImageClass}">' +
                        '</span>'

}, {

    // Y.SliderBase static properties

    /**
     * The identity of the widget.
     *
     * @property SliderBase.NAME
     * @type String
     * @default 'sliderBase'
     * @readOnly
     * @protected
     * @static
     */
    NAME : 'sliderBase',

    /**
     * Static property used to define the default attribute configuration of
     * the Widget.
     *
     * @property SliderBase.ATTRS
     * @type {Object}
     * @protected
     * @static
     */
    ATTRS : {

        /**
         * Axis upon which the Slider's thumb moves.  &quot;x&quot; for
         * horizontal, &quot;y&quot; for vertical.
         *
         * @attribute axis
         * @type {String}
         * @default &quot;x&quot;
         * @writeOnce
         */
        axis : {
            value     : 'x',
            writeOnce : true,
            setter    : '_setAxis',
            lazyAdd   : false
        },

        /**
         * The length of the rail (exclusive of the end caps if positioned by
         * CSS).  This corresponds to the movable range of the thumb.
         *
         * @attribute length
         * @type {String | Number} e.g. "200px", "6em", or 200 (defaults to px)
         * @default 150px
         */
        length: {
            value: '150px',
            setter: '_setLength'
        },

        /**
         * Path to the thumb image.  This will be used as both the thumb and
         * shadow as a sprite.  Defaults at render() to thumb-x.png or
         * thumb-y.png in the skin directory of the current skin.
         *
         * @attribute thumbUrl
         * @type {String}
         * @default thumb-x.png or thumb-y.png in the sam skin directory of the
         *          current build path for Slider
         */
        thumbUrl: {
            value: null,
            validator: Y.Lang.isString
        }
    }
});


}, '@VERSION@' ,{requires:['widget', 'substitute', 'dd-constrain']});
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
YUI.add('clickable-rail', function(Y) {

/**
 * Adds support for mouse interaction with the Slider rail triggering thumb
 * movement.
 *
 * @module slider
 * @submodule clickable-rail
 */

/**
 * Slider extension that allows clicking on the Slider's rail element,
 * triggering the thumb to align with the location of the click.
 *
 * @class ClickableRail
 */
function ClickableRail() {
    this._initClickableRail();
}

Y.ClickableRail = Y.mix( ClickableRail, {

    // Prototype methods added to host class
    prototype: {

        /**
         * Initializes the internal state and sets up events.
         *
         * @method _initClickableRail
         * @protected
         */
        _initClickableRail: function () {
            this._evtGuid = this._evtGuid || ( Y.guid() + '|' );

            /**
             * Broadcasts when the rail has received a mousedown event and
             * triggers the thumb positioning.  Use
             * <code>e.preventDefault()</code> or
             * <code>set(&quot;clickableRail&quot;, false)</code> to prevent
             * the thumb positioning.
             *
             * @event railMouseDown
             * @preventable _defRailMouseDownFn
             */
            this.publish( 'railMouseDown', {
                defaultFn: this._defRailMouseDownFn
            } );

            this.after( 'render', this._bindClickableRail );
            this.on( 'destroy', this._unbindClickableRail );
        },

        /** 
         * Attaches DOM event subscribers to support rail interaction.
         *
         * @method _bindClickableRail
         * @protected
         */
        _bindClickableRail: function () {
            this._dd.addHandle( this.rail );

            this.rail.on( this._evtGuid + 'mousedown',
                this._onRailMouseDown, this );
        },

        /**
         * Detaches DOM event subscribers for cleanup/destruction cycle.
         *
         * @method _unbindClickableRail
         * @protected
         */
        _unbindClickableRail: function () {
            if ( this.get( 'rendered' ) ) {
                var contentBox = this.get( 'contentBox' ),
                    rail = contentBox.one( '.' + this.getClassName( 'rail' ) );

                rail.detach( this.evtGuid + '*' );
            }
        },

        /**
         * Dispatches the railMouseDown event.
         *
         * @method _onRailMouseDown
         * @param e {DOMEvent} the mousedown event object
         * @protected
         */
        _onRailMouseDown: function ( e ) {
            if ( this.get( 'clickableRail' ) && !this.get( 'disabled' ) ) {
                this.fire( 'railMouseDown', { ev: e } );
            }
        },

        /**
         * Default behavior for the railMouseDown event.  Centers the thumb at
         * the click location and passes control to the DDM to behave as though
         * the thumb itself were clicked in preparation for a drag operation.
         *
         * @method _defRailMouseDownFn
         * @param e {Event} the EventFacade for the railMouseDown custom event
         * @protected
         */
        _defRailMouseDownFn: function ( e ) {
            e = e.ev;

            // Logic that determines which thumb should be used is abstracted
            // to someday support multi-thumb sliders
            var thumb = this._resolveThumb( e ),
                xy;
                
            if ( thumb ) {

                if ( !thumb.startXY ) {
                    thumb._setStartPosition( thumb.getXY() );
                }

                xy = this._getThumbDestination( e, thumb.get( 'dragNode' ) );

                thumb._alignNode( xy );

                // Delegate to DD's natural behavior
                thumb._handleMouseDownEvent( e );
            }
        },

        /**
         * Resolves which thumb to actuate if any.  Override this if you want to
         * support multiple thumbs.  By default, returns the Drag instance for
         * the thumb stored by the Slider.
         *
         * @method _resolveThumb
         * @param e {DOMEvent} the mousedown event object
         * @return {Y.DD.Drag} the Drag instance that should be moved
         * @protected
         */
        _resolveThumb: function ( e ) {
            var primaryOnly = this._dd.get( 'primaryButtonOnly' ),
                validClick  = !primaryOnly || e.button <= 1;

            return ( validClick ) ? this._dd : null;
        },

        /**
         * Calculates the top left position the thumb should be moved to to
         * align the click XY with the center of the specified node.
         *
         * @method _getThumbDestination
         * @param e {DOMEvent} The mousedown event object
         * @param node {Node} The node to position
         * @return {Array} the [top, left] pixel position of the destination
         * @protected
         */
        _getThumbDestination: function ( e, node ) {
            var offsetWidth  = node.get( 'offsetWidth' ),
                offsetHeight = node.get( 'offsetHeight' );

            // center
            return [
                ( e.pageX - Math.round( ( offsetWidth  / 2 ) ) ),
                ( e.pageY - Math.round( ( offsetHeight / 2 ) ) )
            ];
        }

    },

    // Static properties added onto host class
    ATTRS: {
        /**
         * Enable or disable clickable rail support.
         *
         * @attribute clickableRail
         * @type {Boolean}
         * @default true
         */
        clickableRail: {
            value: true,
            validator: Y.Lang.isBoolean
        }
    }

}, true );


}, '@VERSION@' ,{requires:['slider-base']});
YUI.add('range-slider', function(Y) {

/**
 * Create a sliding value range input visualized as a draggable thumb on a
 * background rail element.
 * 
 * @module slider
 * @submodule range-slider
 */

/**
 * Create a slider to represent an integer value between a given minimum and
 * maximum.  Sliders may be aligned vertically or horizontally, based on the
 * <code>axis</code> configuration.
 *
 * @class Slider
 * @constructor
 * @extends SliderBase
 * @uses SliderValueRange
 * @uses ClickableRail
 * @param config {Object} Configuration object
 */
Y.Slider = Y.Base.build( 'slider', Y.SliderBase,
    [ Y.SliderValueRange, Y.ClickableRail ] );


}, '@VERSION@' ,{requires:['slider-base', 'clickable-rail', 'slider-value-range']});


YUI.add('slider', function(Y){}, '@VERSION@' ,{use:['slider-base', 'slider-value-range', 'clickable-rail', 'range-slider']});

