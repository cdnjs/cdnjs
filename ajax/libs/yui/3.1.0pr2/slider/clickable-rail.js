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
