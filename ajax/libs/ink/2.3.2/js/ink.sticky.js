/**
 * @module Ink.UI.Sticky_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Sticky', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Element_1','Ink.Dom.Css_1'], function(Common, Event, Element, Css) {
    'use strict';

    /**
     * The Sticky component takes an element and transforms it's behavior in order to, when the user scrolls he sets its position
     * to fixed and maintain it until the user scrolls back to the same place.
     *
     * @class Ink.UI.Sticky
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     *     @param {Number}     [options.offsetBottom=0]    Number of pixels of distance from the bottomElement.
     *     @param {Number}     [options.offsetTop=0]       Number of pixels of distance from the topElement.
     *     @param {Boolean}    [options.inlineDimensions=true] Whether to set "style.height" and "style.width" in the stuck element. Turn this off when your `stickyClass` has its own height and width and you don't want this to be dealt with through javascript.
     *     @param {Boolean}    [options.inlinePosition=true] Whether to set "style.left" in the stuck element. Turn this off when your `stickyClass` has its own "left" position and you don't want this to be dealt with through javascript.
     *     @param {String}     [options.wrapperClass="ink-sticky-wrapper"] Css class for the wrapper element.
     *     @param {String}     [options.stickyClass="ink-sticky-stuck"] Css class for sticking the sticky to the screen. Add your own "stuck" class to define your own sticky behaviour.
     *     @param {String}     [options.topElement]        CSS Selector that specifies a top element with which the component could collide.
     *     @param {String}     [options.bottomElement]     CSS Selector that specifies a bottom element with which the component could collide.
     *     @param {Array|String} [options.activateInLayouts='medium,large'] Layouts in which the sticky behaviour is present. Pass an array or comma-separated string.
     * @example
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.Sticky_1'], function( Selector, Sticky ) {
     *              var menuElement = Ink.s('#menu');
     *              var stickyObj = new Sticky( menuElement );
     *          });
     *      </script>
     */
    var Sticky = function( selector, options ){
        this._rootElement = Common.elOrSelector(selector, 'Ink.UI.Sticky_1');

        this._options = Common.options({
            offsetBottom: ['Integer', 0],
            offsetTop: ['Integer', 0],
            topElement: ['Element', null],
            wrapperClass: ['String', 'ink-sticky-wrapper'],
            stickyClass: ['String', 'ink-sticky-stuck'],
            inlineDimensions: ['Boolean', true],
            inlinePosition: ['Boolean', true],
            bottomElement: ['Element', null],
            activateInLayouts: ['String', 'medium,large']
        }, options || {}, this._rootElement );

        // Because String#indexOf is compatible with lt IE8 but not Array#indexOf
        this._options.activateInLayouts = this._options.activateInLayouts.toString();

        this._dims = null;  // force a recalculation of the dimensions later

        this._options.offsetTop = parseInt(this._options.offsetTop, 10) || 0;
        this._options.offsetBottom = parseInt(this._options.offsetBottom, 10) || 0;

        if (this._options.topElement) {
            this._options.topElement = Common.elOrSelector(this._options.topElement, 'Top Element');
        }
        if (this._options.bottomElement) {
            this._options.bottomElement = Common.elOrSelector(this._options.bottomElement, 'Sticky bottom Element');
        }

        this._wrapper = Element.create('div', { className: this._options.wrapperClass });
        Element.wrap(this._rootElement, this._wrapper);

        this._init();
    };

    Sticky.prototype = {

        /**
         * Init function called by the constructor
         *
         * @method _init
         * @private
         */
        _init: function() {
            var scrollTarget = document.addEventListener ? document : window;
            this._onScroll = Ink.bind(Event.throttle(this._onScroll, 33), this);  // Because this is called directly.
            Event.observe( scrollTarget, 'scroll', this._onScroll );
            Event.observe( window, 'resize', Ink.bindEvent(Event.throttle(this._onResize, 100), this) );
            this._onScroll();
        },

        /**
         * Returns whether the sticky is disabled in the current view
         *
         * @method isDisabledInLayout
         * @private
         */
        _isDisabledInLayout: function () {
            var currentLayout = Common.currentLayout();
            if (!currentLayout) { return false; }
            return this._options.activateInLayouts.indexOf(currentLayout) === -1;
        },

        /**
         * Scroll handler.
         *
         * @method _onScroll
         * @private
         */
        _onScroll: function(){
            var dims = this._getDims();
            var scrollHeight = Element.scrollHeight();

            var unstick = this._isDisabledInLayout() ||
                scrollHeight <= dims.top - this._options.offsetTop ||
                (this._options.topElement && this._options.topElement.getBoundingClientRect().bottom + this._options.offsetTop > 0);

            if( unstick ) {
                // We're on top, no sticking. position:static is the "normal" position.
                this._unstick();
                return;
            }

            // If we stick it now, what will be its boundingClientRect.bottom ?
            var bottomOfSticky = this._options.offsetTop + dims.height + Element.scrollHeight();
            var maxBottomOfSticky = document.body.scrollHeight;

            if (this._options.bottomElement) {
                maxBottomOfSticky =
                    this._options.bottomElement.getBoundingClientRect().top +
                    Element.scrollHeight();
            }

            maxBottomOfSticky -= this._options.offsetBottom;

            if ( bottomOfSticky < maxBottomOfSticky ) {
                // Stick to screen!
                this._stickTo('screen');
            } else {
                // Stick to bottom
                this._stickTo('bottom');
            }
        },

        /**
         * Have the sticky stick nowhere, to the screen, or to the bottom.
         *
         * @method _stickTo
         * @private
         */
        _stickTo: function (where) {
            var style = this._rootElement.style;
            var dims = this._getDims();

            Css.addClassName(this._rootElement, this._options.stickyClass);
            this._wrapper.style.height = dims.height + 'px';

            this._inlineDimensions(dims.height + 'px', dims.width + 'px');

            if (this._options.inlinePosition === false) {
                return;
            }

            style.left = dims.left + 'px';

            if (where === 'screen') {
                style.bottom = null;
                style.top = this._options.offsetTop + 'px';
            } else if (where === 'bottom') {
                // Distance between bottom of sticky and bottom of document
                var bottom = this._getBottomOffset();

                // Distance between bottom of viewport and bottom of document
                var bottomOfViewport = Element.scrollHeight() + Element.viewportHeight();
                var toBottomOfDocument = Element.pageHeight() - bottomOfViewport;

                style.bottom = bottom - toBottomOfDocument + 'px';
                style.top = 'auto';
            }
        },

        /**
         * "unstick" the sticky from the screen or bottom of the document
         * @method _unstick
         * @private
         */
        _unstick: function () {
            Css.removeClassName(this._rootElement, this._options.stickyClass);
            // deinline dimensions of our root element
            this._inlineDimensions(null, null);

            // deinline the position of our root element
            if (this._options.inlinePosition) {
                this._rootElement.style.left = null;
                this._rootElement.style.top = null;
                this._rootElement.style.bottom = null;
            }

            // deinline dimensions of wrapper
            this._wrapper.style.height = null;
            this._wrapper.style.width = null;

            // Break the "getDims" cache
            this._dims = null;
        },

        /**
         * Resize handler
         *
         * @method _onResize
         * @private
         */
        _onResize: function(){
            this._dims = null;  // Blow the cache so _getDims recalculates
            this._onScroll();
        },

        /**
         * Recalculate the "dims" cache, or get it.
         *
         * The "dims" cache is to be set to null when the element is liable to have changed dimensions
         *
         * (eg: on resize)
         *
         **/
        _getDims: function () {
            if (this._dims !== null) { return this._dims; }

            var style = this._rootElement.style;

            // We unstick the sticky so we can measure.
            var oldPosition = style.position;
            var oldWidth = style.width;

            style.position = 'static'; // [todo] this should be a class toggle
            style.width = null;

            var dimensionsInStatic = Element.outerDimensions(this._rootElement);
            var rect = this._wrapper.getBoundingClientRect();
            this._dims = {
                height: dimensionsInStatic[1],
                width: dimensionsInStatic[0],
                left: rect.left + Element.scrollWidth(),
                top: rect.top + Element.scrollHeight()
            };

            style.position = oldPosition;
            style.width = oldWidth;

            return this._dims;
        },

        /**
         * Set style.height and style.width, but not if options.inlineDimensions === false
         *
         * @method _inlineDimensions
         * @private
         */
        _inlineDimensions: function (height, width) {
            if (this._options.inlineDimensions) {
                this._rootElement.style.height = height;
                this._rootElement.style.width = width;
            }
        },

        /**
         * Get the distance between the bottom of the element and the bottom of the page
         *
         * @method _getBottomOffset
         * @private
         */
        _getBottomOffset: function () {
            var bottom = this._options.offsetBottom;
            if (this._options.bottomElement) {
                bottom += Element.pageHeight() -
                    Element.offsetTop(this._options.bottomElement);
            }
            return bottom;
        }
    };

    return Sticky;

});
