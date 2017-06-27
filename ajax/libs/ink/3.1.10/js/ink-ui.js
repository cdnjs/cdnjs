/**
 * Animate.css Utility
 *
 * This module is a wrapper around animate.css's CSS classes to produce animation.
 * It contains options to ease common tasks, like listen to the "animationend" event with all necessary prefixes, remove the necessary class names when the animation finishes, or configure the duration of your animation with the necessary browser prefix.
 *
 * @module Ink.UI.Animate_1
 * @version 1
 */

Ink.createModule('Ink.UI.Animate', 1, ['Ink.UI.Common_1', 'Ink.Dom.Event_1', 'Ink.Dom.Css_1'], function (Common, InkEvent, Css) {
    'use strict';

    var animationPrefix = (function (el) {
        return ('animationName' in el.style) ? 'animation' :
               ('webkitAnimationName' in el.style) ? 'webkitAnimation' : null;
    }(document.createElement('div')));

    var animationEndEventName = {
        animation: 'animationend',
        webkitAnimation: 'webkitAnimationEnd'
    }[animationPrefix];

    /**
     * @class Ink.UI.Animate_1
     * @constructor
     *
     * @param {Element}         element                     Animated element
     * @param {Object}          options                     Options object
     * @param {String}          options.animation           Animation name
     * @param {String|Number}   [options.duration]          Duration name (fast|medium|slow) or duration in milliseconds. Defaults to 'medium'.
     * @param {Boolean}         [options.removeClass]       Flag to remove the CSS class when finished animating. Defaults to false.
     * @param {Function}        [options.onEnd]             Callback for the animation end
     *
     * @sample Ink_UI_Animate_1.html
     *
     **/
    function Animate() {
        Common.BaseUIComponent.apply(this, arguments);
    }

    Animate._name = 'Animate_1';

    Animate._optionDefinition = {
        trigger: ['Element', null],
        duration: ['String', 'slow'],  // Actually a string with a duration name, or a number of ms
        animation: ['String'],
        removeClass: ['Boolean', true],
        onEnd: ['Function', function () {}]
    };

    Animate.prototype._init = function () {
        if (!isNaN(parseInt(this._options.duration, 10))) {
            this._options.duration = parseInt(this._options.duration, 10);
        }

        if (this._options.trigger) {
            InkEvent.observe(this._options.trigger, 'click', Ink.bind(function () {
                this.animate();
            }, this));  // later
        } else {
            this.animate();
        }
    };

    Animate.prototype.animate = function () {
        Animate.animate(this._element, this._options.animation, this._options);
    };

    Ink.extendObj(Animate, {
        /**
         * Browser prefix for the CSS animations.
         *
         * @property _animationPrefix
         * @private
         **/
        _animationPrefix: animationPrefix,

        /**
         * Boolean which says whether this browser has CSS3 animation support.
         *
         * @property animationSupported
         **/
        animationSupported: !!animationPrefix,

        /**
         * Prefixed 'animationend' event name.
         *
         * @property animationEndEventName
         **/
        animationEndEventName: animationEndEventName,

        /**
         * Animate an element using one of the animate.css classes
         *
         * **Note: This is a utility method inside the `Animate` class, which you can access through `Animate.animate()`. Do not mix these up.**
         *
         * @static
         * @method animate
         * @param {Element} element Animated element
         * @param {String} animation Animation name
         * @param {Object} [options] Options object, containing:
         *     @param {Function}      [options.onEnd=null]        Callback for animation end.
         *     @param {Boolean}       [options.removeClass=false] Whether to remove the Css class when finished.
         *     @param {String|Number} [options.duration=medium]   Duration name (the fast|medium|slow strings) or, duration in milliseconds.
         *
         * @return {void}
         * @public
         *
         * @sample Ink_UI_Animate_1_animate.html
         **/
        animate: function (element, animation, options) {
            element = Common.elOrSelector(element);

            if (typeof options === 'number' || typeof options === 'string') {
                options = { duration: options };
            } else if (!options) {
                options = {};
            }

            if (typeof arguments[3] === 'function') {
                options.onEnd = arguments[3];
            }

            if (typeof options.duration !== 'number' && typeof options.duration !== 'string') {
                options.duration = 400;
            }

            if (!Animate.animationSupported) {
                if (options.onEnd) {
                    setTimeout(function () {
                        options.onEnd(null);
                    }, 0);
                }
                return;
            }

            if (typeof options.duration === 'number') {
                element.style[animationPrefix + 'Duration'] = options.duration + 'ms';
            } else if (typeof options.duration === 'string') {
                Css.addClassName(element, options.duration);
            }

            Css.addClassName(element, ['animated', animation]);

            function onAnimationEnd(event) {
                if (event.target !== element) { return; }
                if (event.animationName !== animation) { return; }
                if (options.onEnd) { options.onEnd(event); }
                if (options.removeClass) {
                    Css.removeClassName(element, animation);
                }
                if (typeof options.duration === 'string') {
                    Css.removeClassName(element, options.duration);
                }
                element.removeEventListener(animationEndEventName, onAnimationEnd, false);
            }

            element.addEventListener(animationEndEventName, onAnimationEnd, false);
        }
    });

    Common.createUIComponent(Animate);

    return Animate;
});

/**
 * Flexible Carousel
 * @module Ink.UI.Carousel_1
 * @version 1
 */

Ink.createModule('Ink.UI.Carousel', '1',
    ['Ink.UI.Common_1', 'Ink.Dom.Event_1', 'Ink.Dom.Css_1', 'Ink.Dom.Element_1', 'Ink.UI.Pagination_1', 'Ink.Dom.Browser_1', 'Ink.Dom.Selector_1'],
    function(Common, InkEvent, Css, InkElement, Pagination, Browser/*, Selector*/) {
    'use strict';

    /*
     * TODO:
     *  keyboardSupport
     */

    function limitRange(n, min, max) {
        return Math.min(max, Math.max(min, n));
    }

    var requestAnimationFrame = window.requestAnimationFrame ||
        function (cb) { return setTimeout(cb, 1000 / 30); };

    /**
     * @class Ink.UI.Carousel_1
     * @constructor
     *
     * @param {String|Element}      selector                    DOM element or element id
     * @param {Object}              [options]                   Carousel Options
     * @param {Integer}             [options.autoAdvance]       Milliseconds to wait before auto-advancing pages. Set to 0 to disable auto-advance. Defaults to 0.
     * @param {String}              [options.axis]              Axis of the carousel. Set to 'y' for a vertical carousel. Defaults to 'x'.
     * @param {Number}              [options.initialPage]       Initial index page of the carousel. Defaults to 0.
     * @param {Boolean}             [options.spaceAfterLastSlide=true] If there are not enough slides to fill the full width of the last page, leave white space. Defaults to `true`.
     * @param {Boolean}             [options.swipe]             Enable swipe support if available. Defaults to true.
     * @param {Mixed}               [options.pagination]        Either an ul element to add pagination markup to or an `Ink.UI.Pagination` instance to use.
     * @param {Function}            [options.onChange]          Callback to be called when the page changes.
     *
     * @sample Ink_UI_Carousel_1.html
     */
    function Carousel() {
        Common.BaseUIComponent.apply(this, arguments);
    }

    Carousel._name = 'Carousel_1';

    Carousel._optionDefinition = {
        autoAdvance:    ['Integer', 0],
        axis:           ['String', 'x'],
        initialPage:    ['Integer', 0],
        spaceAfterLastSlide: ['Boolean', true],
        keyboardSupport:['Boolean', false],
        pagination:     ['String', null],
        onChange:       ['Function', null],
        onInit:         ['Function', function () {}],
        swipe:          ['Boolean', true]
        // TODO exponential swipe
        // TODO specify break point for next page when moving finger
    };

    Carousel.prototype = {
        _validate: function(){
            var ulEl = Ink.s('ul.stage', this._element);
            if (!ulEl) {
                return new Error('Carousel must contain a ul.stage element!')
            }
        },
        _init: function () {
            this._handlers = {
                paginationChange: Ink.bindMethod(this, '_onPaginationChange'),
                windowResize:     InkEvent.throttle(Ink.bindMethod(this, 'refit'), 200)
            };

            InkEvent.observe(window, 'resize', this._handlers.windowResize);

            this._isY = (this._options.axis === 'y');

            var ulEl = Ink.s('ul.stage', this._element);
            ulEl.style.width = '100%';
            this._ulEl = ulEl;

            InkElement.removeTextNodeChildren(ulEl);

            if (this._options.pagination == null) {
                this._currentPage = this._options.initialPage;
            }

            this.refit(); // recalculate this._numPages

            if (this._isY) {
                // Override white-space: no-wrap which is only necessary to make sure horizontal stuff stays horizontal, but breaks stuff intended to be vertical.
                this._ulEl.style.whiteSpace = 'normal';
            }

            if (this._options.swipe) {
                InkEvent.observe(this._element, 'touchstart', Ink.bindMethod(this, '_onTouchStart'));
                InkEvent.observe(this._element, 'touchmove', Ink.bindMethod(this, '_onTouchMove'));
                InkEvent.observe(this._element, 'touchend', Ink.bindMethod(this, '_onTouchEnd'));
            }

            this._setUpPagination();
            this._setUpAutoAdvance();

            this._options.onInit.call(this, this);
        },

        /**
         * Repositions elements around.
         * Measure the carousel once again, adjusting the involved elements' sizes. This is called automatically when the window resizes, in order to cater for changes from responsive media queries, for instance.
         *
         * @method refit
         * @return {void}
         * @public
         */
        refit: function() {
            var _isY = this._isY;

            var size = function (elm, perpendicular) {
                if (!elm) { return 0; }

                if (!perpendicular) {
                    return InkElement.outerDimensions(elm)[_isY ? 1 : 0];
                } else {
                    return InkElement.outerDimensions(elm)[_isY ? 0 : 1];
                }
            };

            this._liEls = Ink.ss('li.slide', this._ulEl);
            var numSlides = this._liEls.length;

            var contRect = this._ulEl.getBoundingClientRect();
            this._ctnLength = _isY ? contRect.bottom - contRect.top : contRect.right - contRect.left;
            this._elLength = size(this._liEls[0]);
            this._slidesPerPage = Math.floor( this._ctnLength / this._elLength  ) || 1;
            if (!isFinite(this._slidesPerPage)) { this._slidesPerPage = 1; }

            var numPages = Math.ceil( numSlides / this._slidesPerPage );
            var numPagesChanged = this._numPages !== numPages;
            this._numPages = numPages;
            this._deltaLength = this._slidesPerPage * this._elLength;
            
            this._IE7();

            if (this._pagination && numPagesChanged) {
                this._pagination.setSize(this._numPages);
            }
            this.setPage(limitRange(this.getPage(), 0, this._numPages - 1));
        },

        _setUpPagination: function () {
            if (this._options.pagination) {
                if (Common.isDOMElement(this._options.pagination) ||
                        typeof this._options.pagination === 'string') {
                    // if dom element or css selector string...
                    this._pagination = new Pagination(this._options.pagination, {
                        size:     this._numPages,
                        onChange: this._handlers.paginationChange
                    });
                } else {
                    // assumes instantiated pagination
                    this._pagination = this._options.pagination;
                    this._pagination.setOnChange(this._handlers.paginationChange);
                    this._pagination.setSize(this._numPages);
                }
                this._pagination.setCurrent(this._options.initialPage || 0);
            } else {
                this._currentPage = this._options.initialPage || 0;
            }
        },

        _setUpAutoAdvance: function () {
            if (!this._options.autoAdvance) { return; }
            this.autoAdvance(this._options.autoAdvance);
        },

        /**
         * Auto-advance the carousel every `ms` milliseconds.
         *
         * @method autoAdvance
         * @param [ms] {String} Number of milliseconds between advances.
         * @return {void}
         *
         **/
        autoAdvance: function (ms) {
            if (this._autoAdvanceSto) { return; }

            var self = this;
            function autoAdvance() {
                self.nextPage(true /* wrap */);
                self._autoAdvanceSto = setTimeout(autoAdvance, ms);
            }

            this._autoAdvanceSto = setTimeout(autoAdvance, ms);
        },

        /**
         * Stop the carousel from auto-advancing. Calls clearTimeout to cancel the auto-advancer.
         *
         * @method stopAutoAdvance
         * @return {void}
         *
         **/
        stopAutoAdvance: function () {
            if (!this._autoAdvanceSto) { return; }

            clearTimeout(this._autoAdvanceSto);
            this._autoAdvanceSto = null;
        },

        /**
         * Refits elements for IE7 because it doesn't support inline-block.
         *
         * @method _IE7
         * @private
         */
        _IE7: function () {
            if (Browser.IE && '' + Browser.version.split('.')[0] === '7') {
                // var numPages = this._numPages;
                var slides = Ink.ss('li.slide', this._ulEl);
                var stl = function (prop, val) {slides[i].style[prop] = val; };
                for (var i = 0, len = slides.length; i < len; i++) {
                    stl('position', 'absolute');
                    stl(this._isY ? 'top' : 'left', (i * this._elLength) + 'px');
                }
            }
        },

        _onTouchStart: function (event) {
            if (event.touches.length > 1) { return; }

            this._swipeData = {
                x: InkEvent.pointerX(event),
                y: InkEvent.pointerY(event)
            };

            var ulRect = this._ulEl.getBoundingClientRect();

            this._swipeData.firstUlPos = ulRect[this._isY ? 'top' : 'left'];

            this._swipeData.inUlX =  this._swipeData.x - ulRect.left;
            this._swipeData.inUlY =  this._swipeData.y - ulRect.top;

            setTransitionProperty(this._ulEl, 'none');

            this._touchMoveIsFirstTouchMove = true;
        },

        _onTouchMove: function (event) {
            if (event.touches.length > 1) { return; /* multitouch event, not my problem. */ }

            var pointerX = InkEvent.pointerX(event);
            var pointerY = InkEvent.pointerY(event);

            var deltaY = this._swipeData.y - pointerY;
            var deltaX = this._swipeData.x - pointerX;

            if (this._touchMoveIsFirstTouchMove) {
                var aDeltaY = Math.abs(deltaY);
                var aDeltaX = Math.abs(deltaX);

                this._touchMoveIsFirstTouchMove = undefined;
                this._scrolling = this._isY ?
                    aDeltaX > aDeltaY :
                    aDeltaY > aDeltaX ;

                if (!this._scrolling) {
                    this._onAnimationFrame();
                }
            }

            if (!this._scrolling && this._swipeData) {
                InkEvent.stopDefault(event);

                this._swipeData.pointerDelta = this._isY ? deltaY : deltaX;
                this._swipeData.pointerPos = this._isY ? pointerY : pointerX;
            }
        },

        _onAnimationFrame: function () {
            var swipeData = this._swipeData;

            if (!swipeData || this._scrolling || this._touchMoveIsFirstTouchMove) { return; }

            var elRect = this._element.getBoundingClientRect();

            var newPos;

            if (!this._isY) {
                newPos = swipeData.pointerPos - swipeData.inUlX - elRect.left;
            } else {
                newPos = swipeData.pointerPos - swipeData.inUlY - elRect.top;
            }

            this._ulEl.style[this._isY ? 'top' : 'left'] = newPos + 'px';

            requestAnimationFrame(Ink.bindMethod(this, '_onAnimationFrame'));
        },

        _onTouchEnd: function (event) {
            if (this._swipeData && this._swipeData.pointerPos && !this._scrolling && !this._touchMoveIsFirstTouchMove) {
                var snapToNext = 0.1;  // swipe 10% of the way to change page

                var pointerDelta = this._swipeData.pointerDelta;

                var curPage = this.getPage();

                // How many pages were advanced? May be fractional.
                var progressInPages = pointerDelta / this._elLength / this._slidesPerPage;

                // Have we advanced enough to change page?
                if (Math.abs(progressInPages) > snapToNext) {
                    curPage += Math[ pointerDelta < 0 ? 'floor' : 'ceil' ](progressInPages);
                }

                curPage = limitRange(curPage, 0, this._numPages - 1);

                // If something used to calculate progressInPages was zero, we get NaN here.
                if (!isNaN(curPage)) {
                    this.setPage(curPage);
                }

                InkEvent.stopDefault(event);
            }

            setTransitionProperty(this._ulEl, null /* transition: left, top */);
            this._swipeData = null;
            this._touchMoveIsFirstTouchMove = undefined;
            this._scrolling = undefined;
        },

        _onPaginationChange: function(pgn) {
            this._setPage(pgn.getCurrent());
        },

        /**
         * Gets the current page index
         * @method getPage
         * @return {Number} The current page number
         * @public
         **/
        getPage: function () {
            if (this._pagination) {
                return this._pagination.getCurrent();
            } else {
                return this._currentPage || 0;
            }
        },

        /**
         * Gets the Ink Pagination element this carousel is using.
         * @method getPagination
         * @return {Pagination} The pagination instance, if any. Otherwise, `null`.
         * @public
         **/
        getPagination: function () {
            return this._pagination || null;
        },

        /**
         * Sets the current page index
         * @method setPage
         * @param {Number}  page   Index of the destination page.
         * @param {Boolean} [wrap=false] Flag to activate circular counting (for example, if you set the page to `5` and there are only 4 pages, you're actually going to the first page).
         * @return {void}
         * @public
         **/
        setPage: function (page, wrap) {
            if (wrap) {
                // Pages outside the range [0..this._numPages] are wrapped.
                page = page % this._numPages;
                if (page < 0) { page = this._numPages - page; }
            }
            page = limitRange(page, 0, this._numPages - 1);

            if (page === this._currentPage) {
                if (this._swipeData) {
                    this._setPage(page);  // Just advance the view.
                }
                return;
            }

            if (this._pagination) {
                this._pagination.setCurrent(page);  // _setPage is called by pagination because it listens to its Change event.
            } else {
                this._setPage(page);
            }
        },

        _setPage: function (page) {
            var _lengthToGo = page * this._deltaLength;
            var isLastPage = page === (this._numPages - 1);

            if (!this._options.spaceAfterLastSlide && isLastPage && page > 0) { 
                var _itemsInLastPage = this._liEls.length - (page * this._slidesPerPage);
                if(_itemsInLastPage < this._slidesPerPage) {
                    _lengthToGo = ((page - 1) * this._deltaLength) + (_itemsInLastPage * this._elLength);
                }
            }

            this._ulEl.style[ this._isY ? 'top' : 'left'] =
                ['-', (_lengthToGo / this._ctnLength) * 100, '%'].join('');

            if (this._options.onChange) {
                this._options.onChange.call(this, page);
            }

            this._currentPage = page;
        },

        /**
         * Goes to the next page
         * @method nextPage
         * @param {Boolean} [wrap=false] Flag to loop from last page to first page.
         * @return {void}
         * @public
         **/
        nextPage: function (wrap) {
            this.setPage(this.getPage() + 1, wrap);
        },

        /**
         * Goes to the previous page
         * @method previousPage
         * @param {Boolean} [wrap=false] Flag to loop from first page to last page.
         * @return {void}
         * @public
         **/
        previousPage: function (wrap) { this.setPage(this.getPage() - 1, wrap); },

        /**
         * Returns how many slides fit into a page
         * @method getSlidesPerPage
         * @return {Number} The number of slides per page
         * @public
         */
        getSlidesPerPage: function() {
            return this._slidesPerPage;
        },

        /**
         * Get the amount of pages in the carousel.
         * @method getTotalPages
         * @return {Number} The number of pages
         * @public
         */
        getTotalPages: function() {
            return this._numPages;
        },

        /**
         * Get the stage element (your UL with the class ".stage").
         * @method getStageElm
         * @public
         * @return {Element} Stage element
         **/
        getStageElm: function() {
            return this._ulEl;
        },

        /**
         * Get a list of your slides (elements with the ".slide" class inside your stage)
         * @method getSlidesList
         * @return {Element[]} Array containing the slides.
         * @public
         */
        getSlidesList: function() {
            return this._liEls;
        },

        /**
         * Get the total number of slides
         * @method getTotalSlides
         * @return {Number} The number of slides
         * @public
         */
        getTotalSlides: function() {
            return this.getSlidesList().length;
        }
    };

    function setTransitionProperty(el, newTransition) {
        el.style.transitionProperty =
        el.style.oTransitionProperty =
        el.style.msTransitionProperty =
        el.style.mozTransitionProperty =
        el.style.webkitTransitionProperty = newTransition;
    }

    Common.createUIComponent(Carousel);

    return Carousel;

});

/**
 * Closing utilities
 * @module Ink.UI.Close_1
 * @version 1
 */
Ink.createModule('Ink.UI.Close', '1', ['Ink.Dom.Event_1','Ink.Dom.Element_1'], function(InkEvent, InkElement) {
    'use strict';

    /**
     * Subscribes clicks on the document.body.
     * Whenever an element with the classes ".ink-close" or ".ink-dismiss" is clicked, this module finds an ancestor ".ink-alert" or ".ink-alert-block" element and removes it from the DOM.
     * This module should be created only once per page.
     * 
     * @class Ink.UI.Close
     * @constructor
     * @example
     *     <script>
     *         Ink.requireModules(['Ink.UI.Close_1'],function( Close ){
     *             new Close();
     *         });
     *     </script>
     *
     * @sample Ink_UI_Close_1.html
     */
    function Close() {
        InkEvent.observe(document.body, 'click', function(ev) {
            var el = InkEvent.element(ev);

            el = InkElement.findUpwardsByClass(el, 'ink-close') ||
                 InkElement.findUpwardsByClass(el, 'ink-dismiss');

            if (!el) {
                return;  // ink-close or ink-dismiss class not found
            }

            var toRemove = InkElement.findUpwardsByClass(el, 'ink-alert') ||
                           InkElement.findUpwardsByClass(el, 'ink-alert-block') ||
                           el;

            if (toRemove) {
                InkEvent.stopDefault(ev);
                InkElement.remove(toRemove);
            }
        });
    }

    Close._name = 'Close_1';

    return Close;
});

/**
 * Auxiliar utilities for UI Modules
 * @module Ink.UI.Common_1
 * @version 1
 */
 
Ink.createModule('Ink.UI.Common', '1', ['Ink.Dom.Element_1', 'Ink.Net.Ajax_1','Ink.Dom.Css_1','Ink.Dom.Selector_1','Ink.Util.Url_1'], function(InkElement, Ajax,Css,Selector,Url) {

    'use strict';

    var nothing = {} /* a marker, for reference comparison. */;

    var keys = Object.keys || function (obj) {
        var ret = [];
        for (var k in obj) if (obj.hasOwnProperty(k)) {
            ret.push(k);
        }
        return ret;
    };

    var es6WeakMapSupport = 'WeakMap' in window;
    var instances = es6WeakMapSupport ? new WeakMap() : null;
    // Old Registry
    var _reg = [];
    var domRegistry = {
        get: function get(el) {
            return es6WeakMapSupport ?
                instances.get(el) :
                _reg[el.getAttribute('__InkInstance')];
        },
        set: function set(el, thing) {
            if (es6WeakMapSupport) {
                instances.set(el, thing);
            } else {
                el.setAttribute('__InkInstance', _reg.push(thing) - 1);
            }
        }
    };

    /**
     * @namespace Ink.UI.Common_1
     */

    var Common = {

        /**
         * Supported Ink Layouts
         *
         * @property Layouts
         * @type Object
         * @readOnly
         */
        Layouts: {
            TINY: 'tiny',
            SMALL:  'small',
            MEDIUM: 'medium',
            LARGE:  'large',
            XLARGE: 'xlarge'
        },

        /**
         * Checks if an item is a valid DOM Element.
         *
         * @method isDOMElement
         * @static
         * @param   {Mixed}     o   The object to be checked.
         * @return  {Boolean}       True if it's a valid DOM Element.
         * @example
         *     var el = Ink.s('#element');
         *     if( Ink.UI.Common.isDOMElement( el ) === true ){
         *         // It is a DOM Element.
         *     } else {
         *         // It is NOT a DOM Element.
         *     }
         */
        isDOMElement: InkElement.isDOMElement,

        /**
         * Checks if an item is a valid integer.
         *
         * @method isInteger
         * @static
         * @param {Mixed} n     The value to be checked.
         * @return {Boolean}    True if it's a valid integer.
         * @example
         *     var value = 1;
         *     if( Ink.UI.Common.isInteger( value ) === true ){
         *         // It is an integer.
         *     } else {
         *         // It is NOT an integer.
         *     }
         */
        isInteger: function(n) {
            return (typeof n === 'number' && n % 1 === 0);
        },

        /**
         * Gets a DOM Element. 
         *
         * @method elOrSelector
         * @static
         * @param  {Element|String}         elOrSelector    DOM Element or CSS Selector
         * @param  {String}                 fieldName       The name of the field. Commonly used for debugging.
         * @return {Element} Returns the Element passed or the first result of the CSS Selector. Otherwise it throws an exception.
         * @example
         *     // In case there are several .myInput, it will retrieve the first found
         *     var el = Ink.UI.Common.elOrSelector('.myInput','My Input');
         */
        elOrSelector: function(elOrSelector, fieldName) {
            if (!Common.isDOMElement(elOrSelector)) {
                var t = Selector.select(elOrSelector);
                if (t.length === 0) {
                    Ink.warn(fieldName + ' must either be a DOM Element or a selector expression!\nThe script element must also be after the DOM Element itself.');
                    return null;
                }
                return t[0];
            }
            return elOrSelector;
        },

        /**
         * Like `elOrSelector` but returns an array of elements.
         *
         * @method elsOrSelector
         *
         * @static
         * @param  {Element|Array|String} elsOrSelector DOM Element, array of DOM Elements, or CSS Selector
         * @param  {String}               [fieldName]     The name of the field. Used for the error shown when no elements are found.
         * @param {Boolean} required If this is true, throw an error instead of returning an empty array.
         * @return {Array} The selected Elements, or the given Elements
         * @example
         *     var elements = Ink.UI.Common.elsOrSelector('input.my-inputs', 'My Input');
         */
        elsOrSelector: function(elsOrSelector, fieldName, required) {
            var ret;
            if (typeof elsOrSelector === 'string') {
                ret = Selector.select(elsOrSelector);
            } else if (Common.isDOMElement(elsOrSelector)) {
                ret = [elsOrSelector];
            } else if (elsOrSelector && typeof elsOrSelector === 'object' && typeof elsOrSelector.length === 'number') {
                ret = elsOrSelector;
            }

            if (ret && ret.length) {
                return ret;
            } else {
                if (required) {
                    throw new TypeError(fieldName + ' must either be a DOM Element, an Array of elements, or a selector expression!\nThe script element must also be after the DOM Element itself.');
                } else {
                    return [];
                }
            }
        },

        /**
         * Gets options an object and element's metadata.
         *
         * The element's data attributes take precedence. Values from the element's data-atrributes are coerced into the required type.
         *
         * @method options
         *
         * @param {Object}  [fieldId]   Name to be used in error reports.
         * @param {Object}  defaults    Object with the options' types and defaults.
         * @param {Object}  overrides   Options to override the defaults. Usually passed when instantiating an UI module.
         * @param {Element} [element]   Element with data-attributes
         * @return {Object} An object containing all the option values.
         *
         * @example
         *
         *      this._options = Ink.UI.Common.options('MyComponent', {
         *          'anobject': ['Object', null],  // Defaults to null
         *          'target': ['Element', null],
         *          'stuff': ['Number', 0.1],
         *          'stuff2': ['Integer', 0],
         *          'doKickFlip': ['Boolean', false],
         *          'targets': ['Elements'], // Required option since no default was given
         *          'onClick': ['Function', null]
         *      }, options || {}, elm)
         *
         * @example
         *
         * ### Note about booleans
         *
         * Here is how options are read from the markup
         * data-attributes, for several values`data-a-boolean`.
         *
         * Options considered true:
         *
         *   - `data-a-boolean="true"`
         *   - (Every other value which is not on the list below.)
         * 
         * Options considered false:
         *
         *   - `data-a-boolean="false"`
         *   - `data-a-boolean=""`
         *   - `data-a-boolean`
         *
         * Options which go to default:
         *
         *   - (no attribute). When `data-a-boolean` is ommitted, the
         *   option is not considered true nor false, and as such
         *   defaults to what is in the `defaults` argument.
         *
         **/
        options: function (fieldId, defaults, overrides, element) {
            // TODO Change Common.options's signature? the below looks better, more manageable
            // var options = Common.options({
            //     element: this._element,
            //     modName: constructor._name,
            //     options: constructor._optionDefinition,
            //     defaults: constructor._globalDefaults
            // });

            if (typeof fieldId !== 'string') {
                element = overrides;
                overrides = defaults;
                defaults = fieldId;
                fieldId = '';
            }
            overrides = overrides || {};
            var out = {};
            var dataAttrs = element ? InkElement.data(element) : {};
            var fromDataAttrs;
            var type;
            var lType;
            var defaultVal;

            var invalidStr = function (str) {
                if (fieldId) { str = fieldId + ': "' + ('' + str).replace(/"/, '\\"') + '"'; }
                return str;
            };

            var quote = function (str) {
                return '"' + ('' + str).replace(/"/, '\\"') + '"';
            };

            var invalidThrow = function (str) {
                throw new Error(invalidStr(str));
            };

            var invalid = function (str) {
                Ink.error(invalidStr(str) + '. Ignoring option.');
            };

            function optionValue(key) {
                type = defaults[key][0];
                lType = type.toLowerCase();
                defaultVal = defaults[key].length === 2 ? defaults[key][1] : nothing;

                if (!type) {
                    invalidThrow('Ink.UI.Common.options: Always specify a type!');
                }
                if (!(lType in Common._coerce_funcs)) {
                    invalidThrow('Ink.UI.Common.options: ' + defaults[key][0] + ' is not a valid type. Use one of ' + keys(Common._coerce_funcs).join(', '));

                }
                if (!defaults[key].length || defaults[key].length > 2) {
                    invalidThrow('the "defaults" argument must be an object mapping option names to [typestring, optional] arrays.');
                }

                if (key in dataAttrs) {
                    fromDataAttrs = Common._coerce_from_string(lType, dataAttrs[key], key, fieldId);
                    // (above can return `nothing`)
                } else {
                    fromDataAttrs = nothing;
                }

                if (fromDataAttrs !== nothing) {
                    if (!Common._options_validate(fromDataAttrs, lType)) {
                        invalid('(' + key + ' option) Invalid ' + lType + ' ' + quote(fromDataAttrs));
                        return defaultVal;
                    } else {
                        return fromDataAttrs;
                    }
                } else if (key in overrides) {
                    return overrides[key];
                } else if (defaultVal !== nothing) {
                    return defaultVal;
                } else {
                    invalidThrow('Option ' + key + ' is required!');
                }
            }

            for (var key in defaults) {
                if (defaults.hasOwnProperty(key)) {
                    out[key] = optionValue(key);
                }
            }

            return out;
        },

        _coerce_from_string: function (type, val, paramName, fieldId) {
            if (type in Common._coerce_funcs) {
                return Common._coerce_funcs[type](val, paramName, fieldId);
            } else {
                return val;
            }
        },

        _options_validate: function (val, type) {
            if (type in Common._options_validate_types) {
                return Common._options_validate_types[type].call(Common, val);
            } else {
                // 'object' options cannot be passed through data-attributes.
                // Json you say? Not any good to embed in HTML.
                return false;
            }
        },

        _coerce_funcs: (function () {
            var ret = {
                element: function (val) {
                    return Common.elOrSelector(val, '');
                },
                elements: function (val) {
                    return Common.elsOrSelector(val, '', false /*not required, so don't throw an exception now*/);
                },
                object: function (val) { return val; },
                number: function (val) { return parseFloat(val); },
                'boolean': function (val) {
                    return !(val === 'false' || val === '' || val === null);
                },
                string: function (val) { return val; },
                'function': function (val, paramName, fieldId) {
                    Ink.error(fieldId + ': You cannot specify the option "' + paramName + '" through data-attributes because it\'s a function');
                    return nothing;
                }
            };
            ret['float'] = ret.integer = ret.number;
            return ret;
        }()),

        _options_validate_types: (function () {
            var types = {
                string: function (val) {
                    return typeof val === 'string';
                },
                number: function (val) {
                    return typeof val === 'number' && !isNaN(val) && isFinite(val);
                },
                integer: function (val) {
                    return val === Math.round(val);
                },
                element: function (val) {
                    return Common.isDOMElement(val);
                },
                elements: function (val) {
                    return val && typeof val === 'object' && typeof val.length === 'number' && val.length;
                },
                'boolean': function (val) {
                    return typeof val === 'boolean';
                },
                object: function () { return true; }
            };
            types['float'] = types.number;
            return types;
        }()),

        /**
         * Deep copy (clone) an object.
         * Note: The object cannot have referece loops.
         *
         * @method clone
         * @static
         * @deprecated
         * @param  {Object} o The object to be cloned/copied.
         * @return {Object} Returns the result of the clone/copy.
         * @example
         *     var originalObj = {
         *         key1: 'value1',
         *         key2: 'value2',
         *         key3: 'value3'
         *     };
         *     var cloneObj = Ink.UI.Common.clone( originalObj );
         */
        clone: function(o) {
            try {
                return JSON.parse( JSON.stringify(o) );
            } catch (ex) {
                throw new Error('Given object cannot have loops!');
            }
        },


        /**
         * Gets an element's one-base index relative to its parent.
         *
         * Deprecated. Use Ink.Dom.Element.parentIndexOf instead.
         *
         * @method childIndex
         * @deprecated
         * @static
         * @param  {Element}     childEl     Valid DOM Element.
         * @return {Number}                     Numerical position of an element relatively to its parent.
         * @example
         *     <!-- Imagine the following HTML: -->
         *     <ul>
         *       <li>One</li>
         *       <li>Two</li>
         *       <li id="test">Three</li>
         *       <li>Four</li>
         *     </ul>
         *
         *     <script>
         *         var testLi = Ink.s('#test');
         *         Ink.UI.Common.childIndex( testLi ); // Returned value: 3
         *     </script>
         */
        childIndex: InkElement.parentIndexOf,

        /**
         * AJAX JSON request shortcut method
         * It provides a more convenient way to do an AJAX request and expect a JSON response.It also offers a callback option, as third parameter, for better async handling.
         *
         * @method ajaxJSON
         * @static
         * @async
         * @param   {String}    endpoint    Valid URL to be used as target by the request.
         * @param   {Object}    params      This field is used in the thrown Exception to identify the parameter.
         * @param   {Function}  cb          Callback for the request.
         * @return {void}
         * @public
         * @example
         *     // In case there are several .myInput, it will retrieve the first found
         *     var el = Ink.UI.Common.elOrSelector('.myInput','My Input');
         */
        ajaxJSON: function(endpoint, params, cb) {
            new Ajax(
                endpoint,
                {
                    evalJS:         'force',
                    method:         'POST',
                    parameters:     params,

                    onSuccess:  function( r) {
                        try {
                            r = r.responseJSON;
                            if (r.status !== 'ok') {
                                throw 'server error: ' + r.message;
                            }
                            cb(null, r);
                        } catch (ex) {
                            cb(ex);
                        }
                    },

                    onFailure: function() {
                        cb('communication failure');
                    }
                }
            );
        },


        /**
         * Gets the current Ink layout.
         *
         * @method currentLayout
         * @static
         * @return {String} A string representation of the current layout name.
         * @public
         * @example
         *      var inkLayout = Ink.UI.Common.currentLayout();
         *      if (inkLayout === 'small') {
         *          // ...
         *      }
         */
        currentLayout: function() {
            var i, f, k, v, el, detectorEl = Selector.select('#ink-layout-detector')[0];
            if (!detectorEl) {
                detectorEl = document.createElement('div');
                detectorEl.id = 'ink-layout-detector';
                for (k in Common.Layouts) {
                    if (Common.Layouts.hasOwnProperty(k)) {
                        v = Common.Layouts[k];
                        el = document.createElement('div');
                        el.className = 'show-' + v + ' hide-all';
                        el.setAttribute('data-ink-layout', v);
                        detectorEl.appendChild(el);
                    }
                }
                document.body.appendChild(detectorEl);
            }

            for (i = 0, f = detectorEl.children.length; i < f; ++i) {
                el = detectorEl.children[i];
                if (Css.getStyle(el, 'display') === 'block') {
                    return el.getAttribute('data-ink-layout');
                }
            }

            return 'large';
        },


        /**
         * Sets the location's hash (window.location.hash).
         *
         * @method hashSet
         * @static
         * @param  {Object} o Object with the info to be placed in the location's hash.
         * @return {void}
         * @example
         *     // It will set the location's hash like: <url>#key1=value1&key2=value2&key3=value3
         *     Ink.UI.Common.hashSet({
         *         key1: 'value1',
         *         key2: 'value2',
         *         key3: 'value3'
         *     });
         */
        hashSet: function(o) {
            if (typeof o !== 'object') { throw new TypeError('o should be an object!'); }
            var hashParams = Url.getAnchorString();
            hashParams = Ink.extendObj(hashParams, o);
            window.location.hash = Url.genQueryString('', hashParams).substring(1);
        },

        /**
         * Removes children nodes from a given object.
         * This method was initially created to help solve a problem in Internet Explorer(s) that occurred when trying to set the innerHTML of some specific elements like 'table'.
         *
         * @method cleanChildren
         * @static
         * @param  {Element} parentEl Valid DOM Element
         * @return {void}
         * @public
         * @example
         *     <!-- Imagine the following HTML: -->
         *     <ul id="myUl">
         *       <li>One</li>
         *       <li>Two</li>
         *       <li>Three</li>
         *       <li>Four</li>
         *     </ul>
         *
         *     <script>
         *     Ink.UI.Common.cleanChildren( Ink.s( '#myUl' ) );
         *     </script>
         *
         *     <!-- After running it, the HTML changes to: -->
         *     <ul id="myUl"></ul>
         */
        cleanChildren: function(parentEl) {
            if( !Common.isDOMElement(parentEl) ){
                throw new Error('Please provide a valid DOMElement');
            }
            InkElement.clear(parentEl);
        },

        /**
         * Stores the id and/or classes of an element in an object.
         *
         * @method storeIdAndClasses
         * @static
         * @param  {Element}    fromEl    Valid DOM Element to get the id and classes from.
         * @param  {Object}     inObj     Object where the id and classes will be saved.
         * @return {void}
         * @public
         * @example
         *     <div id="myDiv" class="aClass"></div>
         *
         *     <script>
         *         var storageObj = {};
         *         Ink.UI.Common.storeIdAndClasses( Ink.s('#myDiv'), storageObj );
         *         // storageObj changes to:
         *         {
         *           _id: 'myDiv',
         *           _classes: 'aClass'
         *         }
         *     </script>
         */
        storeIdAndClasses: function(fromEl, inObj) {
            if( !Common.isDOMElement(fromEl) ){
                throw 'Please provide a valid Element as first parameter';
            }

            var id = fromEl.id;
            if (id) {
                inObj._id = id;
            }

            var classes = fromEl.className;
            if (classes) {
                inObj._classes = classes;
            }
        },

        /**
         * Sets the id and className properties of an element based 
         *
         * @method restoreIdAndClasses
         * @static
         * @param  {Element}    toEl    Valid DOM Element to set the id and classes on.
         * @param  {Object}     inObj   Object where the id and classes to be set are. This method uses the same format as the one given in `storeIdAndClasses`
         * @return {void}
         * @public
         * @example
         *     <div></div>
         *
         *     <script>
         *         var storageObj = {
         *           _id: 'myDiv',
         *           _classes: 'aClass'
         *         };
         *
         *         Ink.UI.Common.storeIdAndClasses( Ink.s('div'), storageObj );
         *     </script>
         *
         *     <!-- After the code runs the div element changes to: -->
         *     <div id="myDiv" class="aClass"></div>
         */
        restoreIdAndClasses: function(toEl, inObj) {

            if( !Common.isDOMElement(toEl) ){
                throw 'Please provide a valid Element as first parameter';
            }

            if (inObj._id && toEl.id !== inObj._id) {
                toEl.id = inObj._id;
            }

            if (inObj._classes && toEl.className.indexOf(inObj._classes) === -1) {
                if (toEl.className) { toEl.className += ' ' + inObj._classes; }
                else {                toEl.className  =       inObj._classes; }
            }

            if (inObj._instanceId && !toEl.getAttribute('data-instance')) {
                toEl.setAttribute('data-instance', inObj._instanceId);
            }
        },

        _warnDoubleInstantiation: function (elm, newInstance) {
            var instances = Common.getInstance(elm);

            if (getName(newInstance) === '') { return; }
            if (!instances) { return; }

            var nameWithoutVersion = getName(newInstance);

            if (!nameWithoutVersion) { return; }

            for (var i = 0, len = instances.length; i < len; i++) {
                if (nameWithoutVersion === getName(instances[i])) {
                    // Yes, I am using + to concatenate and , to split
                    // arguments.
                    //
                    // Elements can't be concatenated with strings, but if
                    // they are passed in an argument, modern debuggers will
                    // pretty-print them and make it easy to find them in the
                    // element inspector.
                    //
                    // On the other hand, if strings are passed as different
                    // arguments, they get pretty printed. And the pretty
                    // print of a string has quotes around it.
                    //
                    // If some day people find out that strings are not
                    // just text and they start preserving contextual
                    // information, then by all means change this to a
                    // regular concatenation.
                    //
                    // But they won't. So don't change this.
                    Ink.warn('Creating more than one ' + nameWithoutVersion + ' for the same element.',
                            '(Was creating a ' + nameWithoutVersion + ' on:', elm, ').');
                    return false;
                }
            }

            function getName(thing) {
                return ((thing.constructor && (thing.constructor._name)) ||
                    thing._name ||
                    '').replace(/_.*?$/, '');
            }

            return true;
        },

        /**
         * Saves an object (which should inherit BaseUIComponent) in the registry, associated with an element. You can retrieve it later by calling getInstance.
         *
         * This won't allow two instances of the same class to be created on a single element. It will fail and print a warning to the console if you try to do it. That is a common error when using Ink.
         *
         * @method registerInstance
         * @static
         * @param  {Object}  inst Object that holds the instance.
         * @param  {Element} el   Element to associate with `inst`.
         * @return {Boolean} `true` if we could create the instance, `false` otherwise.
         */
        registerInstance: function(inst, el) {
            if (!inst) { return; }

            if (!el) { el = inst._element; }

            if (!Common.isDOMElement(el)) { throw new TypeError('Ink.UI.Common.registerInstance: The element passed in is not a DOM element!'); }

            // [todo] this belongs in the BaseUIComponent's initialization
            if (Common._warnDoubleInstantiation(el, inst) === false) {
                return false;
            }

            var instances = domRegistry.get(el);

            if (!instances) {
                instances = [];
                domRegistry.set(el, instances);
            }

            instances.push(inst);

            return true;
        },

        /**
         * Unregisters (removes from the registry) a UI component instance from whatever element it's on.
         *
         * @method unregisterInstance
         * @static
         * @param  {String}     inst       Instance to be unregistered.
         * @return {void}
         * @public
         */
        unregisterInstance: function(inst) {
            if (!inst || !inst._element) { return; }
            var instances = domRegistry.get(inst._element);
            for (var i = 0, len = instances.length; i < len; i++) {
                if (instances[i] === inst) {
                    instances.splice(i, 1);
                }
            }
        },

        /**
         * Gets an UI component instance from an element.
         *
         * This function is already available in the UI components' classes themselves. You can call Modal.getInstance() and retrieve a modal.
         *
         * @method getInstance
         * @static
         * @param  {String|Element} el Element from which we want the instances. A selector is okay.
         * @param {BaseUIComponent} [UIComponent] If you pass an Ink UI component class (Like Ink.UI.Modal or Ink.UI.Carousel), this won't return an array of all instances associated with the element. Instead it will return only the object which is an instance of that class.
         * @return  {Object|Array}               Returns an array containing all the instances in that element.
         * @public
         */
        getInstance: function(el, UIComponent) {
            var givenEl = el;  // So we can warn it later.

            el = Common.elOrSelector(el);

            if (!Common.isDOMElement(el)) {
                Ink.warn('Ink.UI.Common: getInstance called on non-element (' + givenEl + ')');
                return [];
            }

            var instances = domRegistry.get(el);

            if (!instances) {
                instances = [];
            }

            if (typeof UIComponent !== 'function') {
                return instances;
            }

            for (var i = 0, len = instances.length; i < len; i++) {
                if (instances[i] instanceof UIComponent) {
                    return instances[i];
                }
            }

            return null;
        },

        /**
         * Gets an instance based on a selector.
         *
         * @method getInstanceFromSelector
         * @static
         * @param  {String}             selector    CSS selector to get the instances from. This function will only use the *first* element.
         * @return  {Object|Array}               Returns an array of the instances in the selected element.
         * @public
         */
        getInstanceFromSelector: function(selector) {
            return Common.getInstance(selector);
        },

        /**
         * Gets all the instance ids
         *
         * @method getInstanceIds
         * @static
         * @return  {Array} Collection of instance ids
         */
        getInstanceIds: function() {
            if( _reg.length > 0 ) return _reg;
            var res = [];
            for (var id in instances) {
                if (instances.hasOwnProperty(id)) {
                    res.push( id );
                }
            }
            return res;
        },

        /**
         * Gets all the instances
         *
         * @method getInstances
         * @static
         * @return  {Array}     Collection of existing instances.
         * @public
         */
        getInstances: function() {
            if( _reg.length > 0 ) return _reg;
            var res = [];
            for (var id in instances) {
                if (instances.hasOwnProperty(id)) {
                    res.push( instances[id] );
                }
            }
            return res;
        },

        /**
         * Boilerplate method to destroy a component.
         * Components should copy this method as its destroy method and modify it.
         *
         * @method destroyComponent
         * @return {void}
         * @public
         * @static
         */
        destroyComponent: function() {
            Common.unregisterInstance(this);
            this._element.parentNode.removeChild(this._element);
        }
    };




    /**
     * Ink UI Base Class
     **/

    function warnStub() {
        /* jshint validthis: true */
        if (!this || this === window || typeof this.constructor !== 'function') { return; }
        Ink.warn('You called a method on an incorrectly instantiated ' + this.constructor._name + ' component. Check the warnings above to see what went wrong.');
    }

    function stub(prototype, obj) {
        for (var k in prototype) if (prototype.hasOwnProperty(k)) {
            if (k === 'constructor') { continue; }
            if (typeof obj[k] === 'function') {
                obj[k] = warnStub;
            }
        }
    }

    /**
     * Ink UI Base Class
     *
     * You don't use this class directly, or inherit from it directly.
     *
     * See createUIComponent() (in this module) for how to create a UI component and inherit from this. It's not plain old JS inheritance, for several reasons.
     *
     * @class Ink.UI.Common.BaseUIComponent
     * @constructor
     *
     * @param {Element|String} element Element to associate this UI component with. It's the element you can get later using `comp.getElement()`
     * @param {Object} [options] Options to pass to the component. You should see your specific UI component for this information.
     * @public
     **/
    function BaseUIComponent(element, options) {
        var constructor = this.constructor;
        var _name = constructor._name;

        if (!this || this === window) {
            throw new Error('Use "new InkComponent()" instead of "InkComponent()"');
        }

        if (this && !(this instanceof BaseUIComponent)) {
            throw new Error('You forgot to call Ink.UI.Common.createUIComponent() on this module!');
        }

        if (!element && !constructor._componentOptions.elementIsOptional) {
            Ink.error(new Error(_name + ': You need to pass an element or a selector as the first argument to "new ' + _name + '()"'));
            return;
        } else {
            this._element = Common.elsOrSelector(element,
                _name + ': An element with the selector "' + element + '" was not found!')[0];
        }

        if (!this._element && !constructor._componentOptions.elementIsOptional) {
            isValidInstance = false;
            Ink.error(new Error(element + ' does not match an element on the page. You need to pass a valid selector to "new ' + _name + '".'));
        }

        this._options = Common.options(_name, constructor._optionDefinition, options, this._element);

        var isValidInstance = BaseUIComponent._validateInstance(this) === true;

        if (isValidInstance && typeof this._init === 'function') {
            try {
                this._init.apply(this, arguments);
            } catch(e) {
                isValidInstance = false;
                Ink.error(e);
            }
        }

        if (!isValidInstance) {
            BaseUIComponent._stubInstance(this, constructor, _name);
        } else if (this._element) {
            Common.registerInstance(this);
        }
    }

    /**
     * Calls the `instance`'s _validate() method so it can validate itself.
     *
     * Returns false if the method exists, was called, but no Error was returned or thrown.
     *
     * @method _validateInstance
     * @private
     */
    BaseUIComponent._validateInstance = function (instance) {
        var err;

        if (typeof instance._validate !== 'function') { return true; }

        try {
            err = instance._validate();
        } catch (e) {
            err = e;
        }

        if (err instanceof Error) {
            instance._validationError = err;
            return false;
        }

        return true;
    };


    /**
     * Replaces every method in the instance with stub functions which just call Ink.warn().
     *
     * This avoids breaking the page when there are errors.
     *
     * @method _stubInstance
     * @param instance
     * @param constructor
     * @param name
     * @private
     */
    BaseUIComponent._stubInstance = function (instance, constructor, name) {
        stub(constructor.prototype, instance);
        stub(BaseUIComponent.prototype, instance);
        Ink.warn(name + ' was not correctly created. ' + (instance._validationError || ''));
    };

    // TODO BaseUIComponent.setGlobalOptions = function () {}
    // TODO BaseUIComponent.createMany = function (selector) {}
    BaseUIComponent.getInstance = function (elOrSelector) {
        elOrSelector = Common.elOrSelector(elOrSelector);
        return Common.getInstance(elOrSelector, this /* get instance by constructor */);
    };

    Ink.extendObj(BaseUIComponent.prototype, {
        /**
         * Get an UI component's option's value.
         *
         * @method getOption
         * @param {String} name The option's name.
         * @return {Mixed} The option value, or undefined if nothing is found.
         *
         * @example
         *
         * var myUIComponent = new Modal('#element', { trigger: '#trigger' }); // or anything else inheriting BaseUIComponent
         * myUIComponent.getOption('trigger');  // -> The trigger element (not the selector string, mind you)
         *
         **/
        getOption: function (name) {
            if (this.constructor && !(name in this.constructor._optionDefinition)) {
                Ink.error('"' + name + '" is not an option for ' + this.constructor._name);
                return undefined;
            }

            return this._options[name];
        },

        /**
         * Sets an option's value.
         *
         * @method getOption
         * @param {String} name Name of the option.
         * @param {Mixed} value New option value.
         * @return {void}
         * @public
         *
         * @example
         *
         * var myUIComponent = new Modal(...);
         * myUIComponent.setOption('trigger', '#some-element');
         **/
        setOption: function (name, value) {
            if (this.constructor && !(name in this.constructor._optionDefinition)) {
                Ink.error('"' + name + ' is not an option for ' + this.constructor._name);
                return;
            }

            this._options[name] = value;
        },

        /**
         * Get the element associated with an UI component (IE the one you used in the constructor)
         *
         * @method getElement
         * @return {Element} The component's element.
         *
         * @example
         * var myUIComponent = new Modal('#element'); // or anything else inheriting BaseUIComponent
         * myUIComponent.getElement();  // -> The '#element' (not the selector string, mind you).
         *
         **/
        getElement: function () {
            return this._element;
        }
    });

    Common.BaseUIComponent = BaseUIComponent;

    /**
     * Take a constructor, and make it an Ink UI component.
     *
     * Makes it inherit BaseUIComponent, makes sure it has the basic properties Ink.UI.Common needs it to have, adds the necessary static methods, sets its options, etc.
     *
     * @method createUIComponent
     * @param {Function} theConstructor UI component constructor. It should have an _init function in its prototype, an _optionDefinition object, and a _name property indicating its name.
     * @param {Object}  [options] Options hash, containing:
     * @param {Boolean} [options.elementIsOptional=false] Whether the element argument is optional (For example, when the component might work on existing markup or create its own).
     * @return {void}
     * @public
     **/
    Common.createUIComponent = function createUIComponent(theConstructor, options) {
        theConstructor._componentOptions = options || {};

        function assert(test, msg) {
            if (!test) {
                throw new Error('Ink.UI_1.createUIComponent: ' + msg);
            }
        }

        function assertProp(prop, propType, message) {
            var propVal = theConstructor[prop];
            // Check that the property was passed
            assert(typeof propVal !== 'undefined',
                theConstructor + ' doesn\'t have a "' + prop + '" property. ' + message);
            // Check that its type is correct
            assert(propType && typeof propVal === propType,
                'typeof ' + theConstructor + '.' + prop + ' is not "' + propType + '". ' + message);
        }

        assert(typeof theConstructor === 'function',
            'constructor argument is not a function!');

        assertProp('_name', 'string', 'This property is used for error ' +
            'messages. Set it to the full module path and version (Ink.My.Module_1).');
        assertProp('_optionDefinition', 'object', 'This property contains the ' +
            'option names, types and defaults. See Ink.UI.Common.options() for reference.');

        // Extend the instance methods and props
        var _oldProto = theConstructor.prototype;

        if (typeof Object.create === 'function') {
            theConstructor.prototype = Object.create(BaseUIComponent.prototype);
        } else {
            theConstructor.prototype = (function hideF() {
                function F() {}
                F.prototype = BaseUIComponent.prototype;
                return new F();
            }());
        }

        Ink.extendObj(theConstructor.prototype, _oldProto);
        theConstructor.prototype.constructor = theConstructor;
        // Extend static methods
        Ink.extendObj(theConstructor, BaseUIComponent);
    };

    return Common;

});

/**
 * Date selector
 * @module Ink.UI.DatePicker_1
 * @version 1
 */

Ink.createModule('Ink.UI.DatePicker', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1','Ink.Util.Date_1', 'Ink.Util.I18n_1'], function(Common, Event, Css, InkElement, Selector, InkArray, InkDate, I18n ) {
    'use strict';

    // Clamp a number into a min/max limit
    function clamp(n, min, max) {
        if (n > max) { n = max; }
        if (n < min) { n = min; }

        return n;
    }

    function dateishFromYMDString(YMD) {
        var split = YMD.split('-');
        return dateishFromYMD(+split[0], +split[1] - 1, +split[2]);
    }

    function keys(obj) {
        if (Object.keys) {
            return Object.keys(obj);
        }
        var ret = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                ret.push(key);
            }
        }
        return ret;
    }

    function dateishFromYMD(year, month, day) {
        return {_year: year, _month: month, _day: day};
    }

    function dateishFromDate(date) {
        return {_year: date.getFullYear(), _month: date.getMonth(), _day: date.getDate()};
    }

    function getDecade(year) {
        return Math.floor(year / 10) * 10;  // Round to first place
    }

    var datePickerI18n = new I18n({
        pt_PT: {
            'datepicker.clean':       'Limpar',
            'datepicker.close':       'Fechar',
            'datepicker.format':      'dd-mm-yyyy',
            'datepicker.of':          ' de ',
            'datepicker.next_button': '»',
            'datepicker.prev_button': '«',
            'datepicker.months': {
                 1:'Janeiro',
                 2:'Fevereiro',
                 3:'Março',
                 4:'Abril',
                 5:'Maio',
                 6:'Junho',
                 7:'Julho',
                 8:'Agosto',
                 9:'Setembro',
                10:'Outubro',
                11:'Novembro',
                12:'Dezembro'
            },
            'datepicker.week_days': {
                0:'Domingo',
                1:'Segunda-feira',
                2:'Terça-feira',
                3:'Quarta-feira',
                4:'Quinta-feira',
                5:'Sexta-feira',
                6:'Sábado'
            }
        },
        en_US: {
            'datepicker.clean':       'Clear',
            'datepicker.close':       'Close',
            'datepicker.format':      'dd-mm-yyyy',
            'datepicker.of':          ' of ',
            'datepicker.next_button': '»',
            'datepicker.prev_button': '«',
            'datepicker.months': {
                 1:'January',
                 2:'February',
                 3:'March',
                 4:'April',
                 5:'May',
                 6:'June',
                 7:'July',
                 8:'August',
                 9:'September',
                10:'October',
                11:'November',
                12:'December'
            },
            'datepicker.week_days': {
                0:'Sunday',
                1:'Monday',
                2:'Tuesday',
                3:'Wednesday',
                4:'Thursday',
                5:'Friday',
                6:'Saturday'
            }
        }
    }, 'en_US');

    /**
     * @class Ink.UI.DatePicker
     * @constructor
     * @version 1
     *
     * @param {String|Element}      selector                    Datepicker element
     * @param {Object}              [options]                   Options
     * @param {String}              [options.lang]              Set the language of the DatePicker, to show month names, day names, etc. Internally this results in changing our Ink.Util.I18n instance. pt_PT and en_US are available, but using getI18n().append({ lang_CODE: {...} }) you can create your own language.
     * @param {Boolean}             [options.autoOpen]          Flag to automatically open the datepicker.
     * @param {String}              [options.cssClass]          CSS class to be applied on the datepicker
     * @param {String|Element}      [options.pickerField]       (if not using in an input[type="text"]) Element which displays the DatePicker when clicked. Defaults to an "open" link.
     * @param {String}              [options.dateRange]         Enforce limits to year, month and day for the Date, ex: '1990-08-25:2020-11'
     * @param {Boolean}             [options.displayInSelect]   Flag to display the component in a select element.
     * @param {String|Element}      [options.dayField]          (if using options.displayInSelect) `select` field with days.
     * @param {String|Element}      [options.monthField]        (if using options.displayInSelect) `select` field with months.
     * @param {String|Element}      [options.yearField]         (if using options.displayInSelect) `select` field with years.
     * @param {Boolean}             [options.createSelectOptions] (if using options.displayInSelect) create the `option` elements with months, days, and years. Otherwise, datepicker trusts you to create them yourself.
     * @param {String}              [options.format]            Date format string
     * @param {Boolean}             [options.onFocus]           If the datepicker should open when the target element is focused. Defaults to true.
     * @param {Function}            [options.onMonthSelected]   Callback to execute when the month is selected.
     * @param {Function}            [options.onSetDate]         Callback to execute when the date is set.
     * @param {Function}            [options.onYearSelected]    Callback to execute when the year is selected.
     * @param {String}              [options.position]          Position for the datepicker. Either 'right' or 'bottom'. Defaults to 'right'.
     * @param {Boolean}             [options.showClean]         If the clean button should be visible. Defaults to true.
     * @param {Boolean}             [options.showClose]         If the close button should be visible. Defaults to true.
     * @param {Boolean}             [options.shy]               If the datepicker should hide automatically when the user clicks outside. Defaults to true.
     * @param {String}              [options.startDate]         Date to define initial month. Must be in yyyy-mm-dd format.
     * @param {Number}              [options.startWeekDay]      First day of the week. Sunday is zero. Defaults to 1 (Monday).
     * @param {Function}            [options.validYearFn]       Callback to execute when 'rendering' the month (in the month view)
     * @param {Function}            [options.validMonthFn]      Callback to execute when 'rendering' the month (in the month view)
     * @param {Function}            [options.validDayFn]        Callback to execute when 'rendering' the day (in the month view)
     * @param {Function}            [options.nextValidDateFn]   Function to calculate the next valid date, given the current. Useful when there's invalid dates or time frames.
     * @param {Function}            [options.prevValidDateFn]   Function to calculate the previous valid date, given the current. Useful when there's invalid dates or time frames.
     * @param {String}              [options.yearRange]         Enforce limits to year for the Date, ex: '1990:2020' (deprecated)
     * @param {Object}              [options.month]             (Deprecated. use options.lang or i18n instead) Hash of month names. Defaults to english month names. January is 1.
     * @param {Object}              [options.wDay]              (Deprecated. use options.lang or i18n instead) Hash of week day names. Sunday is 0. Defaults to { 0:'Sunday', 1:'Monday', etc...
     * @param {String}              [options.nextLinkText]      (Deprecated. use options.lang or i18n instead) Text for the previous button. Defaults to '»'.
     * @param {String}              [options.prevLinkText]      (Deprecated. use options.lang or i18n instead) Text for the previous button. Defaults to '«'.
     * @param {String}              [options.ofText]            (Deprecated. use options.lang or i18n instead) Text to show between month and year. Defaults to ' of '.
     * @param {String}              [options.cleanText]         (Deprecated. use options.lang or i18n instead) Text for the clean button. Defaults to 'Clear'.
     * @param {String}              [options.closeText]         (Deprecated. use options.lang or i18n instead) Text for the close button. Defaults to 'Close'.
     *
     * @sample Ink_UI_DatePicker_1.html
     */
    function DatePicker() {
        Common.BaseUIComponent.apply(this, arguments);
    }

    DatePicker._name = 'DatePicker_1';

    DatePicker._optionDefinition = {
        autoOpen:        ['Boolean', false],
        pickerField:     ['Element', null],
        containerElement:['Element', null],
        cssClass:        ['String', 'ink-calendar bottom'],
        dateRange:       ['String', null],
        
        // use this in a <select>
        displayInSelect: ['Boolean', false],
        dayField:        ['Element', null],
        monthField:      ['Element', null],
        yearField:       ['Element', null],
        createSelectOptions: ['Boolean', false],

        format:          ['String', 'yyyy-mm-dd'],
        onFocus:         ['Boolean', true],
        onMonthSelected: ['Function', null],
        onSetDate:       ['Function', null],
        onYearSelected:  ['Function', null],
        position:        ['String', 'right'],
        showClean:       ['Boolean', true],
        showClose:       ['Boolean', true],
        shy:             ['Boolean', true],
        startDate:       ['String', null], // format yyyy-mm-dd,
        startWeekDay:    ['Number', 1],

        // Validation
        validDayFn:      ['Function', null],
        validMonthFn:    ['Function', null],
        validYearFn:     ['Function', null],
        nextValidDateFn: ['Function', null],
        prevValidDateFn: ['Function', null],
        yearRange:       ['String', null],

        // I18n
        lang:            ['String', null],

        // Old I18n
        month:       ['Object', null],
        wDay:        ['Object', null],
        nextLinkText:['String', null],
        prevLinkText:['String', null],
        ofText:      ['String', null],
        cleanText:   ['String', null],
        closeText:   ['String', null]
    };

    DatePicker.prototype = {
        /**
         * Initialization function. Called by the constructor and receives the same parameters.
         *
         * @method _init
         * @private
         */
        _init: function() {
            this.i18n = datePickerI18n.clone();

            if (this._options.lang) {
                this.i18n.lang(this._options.lang);
            }

            // Convert any legacy i18n options passed into a nice i18n object
            var lang = this._options.lang || datePickerI18n.lang();
            var dict = {};
            dict[lang] = {};

            if (this._options.month) {
                dict[lang]['datepicker.months'] = this._options.month; }
            if (this._options.wDay) {
                dict[lang]['datepicker.week_days'] = this._options.wDay; }
            if (this._options.nextLinkText) {
                dict[lang]['datepicker.next_button'] = this._options.nextLinkText; }
            if (this._options.prevLinkText) {
                dict[lang]['datepicker.prev_button'] = this._options.prevLinkText; }
            if (this._options.ofText) {
                dict[lang]['datepicker.of'] = this._options.ofText; }
            if (this._options.cleanText) {
                dict[lang]['datepicker.clean'] = this._options.cleanText; }
            if (this._options.closeText) {
                dict[lang]['datepicker.close'] = this._options.closeText; }

            if (keys(dict[lang]).length) {
                this.i18n.append(dict);
            }

            this._options.format = this._dateParsers[ this._options.format ] || this._options.format;

            this._hoverPicker = false;

            this._picker = this._options.pickerField || null;

            this._setMinMax( this._options.dateRange || this._options.yearRange );

            if(this._options.startDate) {
                this.setDate( this._options.startDate );
            } else if (this._element && this._element.value) {
                this.setDate( this._element.value );
            } else {
                this.setDate(new Date());
            }

            if (this._options.startWeekDay < 0 || this._options.startWeekDay > 6) {
                Ink.warn('Ink.UI.DatePicker_1: option "startWeekDay" must be between 0 (sunday) and 6 (saturday)');
                this._options.startWeekDay = clamp(this._options.startWeekDay, 0, 6);
            }

            if (this._options.displayInSelect && this._options.createSelectOptions) {
                this._createSelectOptions();
            }

            Ink.extendObj(this._options,this._lang || {});

            this._render();
            this._listenToContainerObjectEvents();
        },

        _validate: function () {
            if(this._options.displayInSelect &&
                    !(this._options.dayField && this._options.monthField && this._options.yearField)){
                throw new Error(
                    'Ink.UI.DatePicker: displayInSelect option enabled.'+
                    'Please specify dayField, monthField and yearField selectors.');
            }
        },

        /**
         * Renders the DatePicker's markup.
         *
         * @method _render
         * @private
         */
        _render: function() {
            this._containerObject = document.createElement('div');

            this._containerObject.className = this._options.cssClass + ' ink-datepicker-calendar hide-all';

            this._renderSuperTopBar();

            var calendarTop = document.createElement("div");
            calendarTop.className = 'ink-calendar-top';

            this._monthDescContainer = document.createElement("div");
            this._monthDescContainer.className = 'ink-calendar-month_desc';

            this._monthPrev = document.createElement('div');
            this._monthPrev.className = 'ink-calendar-prev';
            this._monthPrev.appendChild(InkElement.create('a', {
                href: '#prev',
                className: 'change_month_prev',
                setHTML: this.i18n.text('datepicker.prev_button')
            }));

            this._monthNext = document.createElement('div');
            this._monthNext.className = 'ink-calendar-next';
            this._monthNext.appendChild(InkElement.create('a', {
                href: '#next',
                className: 'change_month_next',
                setHTML: this.i18n.text('datepicker.next_button')
            }));

            calendarTop.appendChild(this._monthPrev);
            calendarTop.appendChild(this._monthDescContainer);
            calendarTop.appendChild(this._monthNext);

            this._monthContainer = document.createElement("div");
            this._monthContainer.className = 'ink-calendar-month';

            this._containerObject.appendChild(calendarTop);
            this._containerObject.appendChild(this._monthContainer);

            this._monthSelector = this._renderMonthSelector();
            this._containerObject.appendChild(this._monthSelector);

            this._yearSelector = document.createElement('ul');
            this._yearSelector.className = 'ink-calendar-year-selector';

            this._containerObject.appendChild(this._yearSelector);

            if(!this._options.onFocus || this._options.displayInSelect){
                if(!this._options.pickerField){
                    this._picker = InkElement.create('a', {
                        href: '#open_cal',
                        setHTML: 'open',
                        insertBottom: this._element.parentNode,
                        className: 'ink-datepicker-picker-field'
                    });
                } else {
                    this._picker = Common.elOrSelector(this._options.pickerField, 'pickerField');
                }
            }

            this._appendDatePickerToDom();

            this._renderMonth();

            this._monthChanger = InkElement.create('a', {
                href: '#monthchanger',
                className: 'ink-calendar-link-month',
                setTextContent: this.i18n.getKey('datepicker.months')[this._month + 1]
            });

            this._ofText = InkElement.create('span', {
                className: 'ink-calendar-of-text',
                setTextContent: this.i18n.text('datepicker.of')
            });

            this._yearChanger = InkElement.create('a', {
                href: '#yearchanger',
                className: 'ink-calendar-link-year',
                setTextContent: this._year
            });

            this._monthDescContainer.appendChild(this._monthChanger);
            this._monthDescContainer.appendChild(this._ofText);
            this._monthDescContainer.appendChild(this._yearChanger);

            if (!this._options.inline) {
                this._addOpenCloseEvents();
            } else {
                this.show();
            }
            this._addDateChangeHandlersToInputs();
        },

        _addDateChangeHandlersToInputs: function () {
            var fields = this._element;
            if (this._options.displayInSelect) {
                fields = [
                    this._options.dayField,
                    this._options.monthField,
                    this._options.yearField];
            }
            Event.observeMulti(fields ,'change', Ink.bindEvent(function(){
                this._updateDate( );
                this._showDefaultView( );
                this.setDate( );
                if(this._options.onSetDate) {
                    // calling onSetDate because the user selected something
                    this._options.onSetDate( this , { date : this.getDate() } );
                }
                if ( !this._inline && !this._hoverPicker ) {
                    this._hide(true);
                }
            },this));
        },

        /**
         * Shows the calendar.
         *
         * @method show
         * @return {void}
         * @public
         **/
        show: function () {
            this._updateDate();
            this._renderMonth();
            Css.removeClassName(this._containerObject, 'hide-all');
        },

        _addOpenCloseEvents: function () {
            var opener = this._picker || this._element;

            Event.observe(opener, 'click', Ink.bindEvent(function(e){
                Event.stopDefault(e);
                this.show();
            },this));

            if (this._options.autoOpen) {
                this.show();
            }

            if(!this._options.displayInSelect){
                Event.observe(opener, 'blur', Ink.bindEvent(function() {
                    if ( !this._hoverPicker ) {
                        this._hide(true);
                    }
                },this));
            }

            if (this._options.shy) {
                // Close the picker when clicking elsewhere.
                Event.observe(document,'click',Ink.bindEvent(function(e){
                    var target = Event.element(e);

                    // "elsewhere" is outside any of these elements:
                    var cannotBe = [
                        this._options.dayField,
                        this._options.monthField,
                        this._options.yearField,
                        this._picker,
                        this._containerObject,
                        this._element
                    ];

                    for (var i = 0, len = cannotBe.length; i < len; i++) {
                        if (cannotBe[i] && (InkElement.descendantOf(cannotBe[i], target) || cannotBe[i] === target)) {
                            return;
                        }
                    }

                    this._hide(true);
                },this));
            }
        },

        /**
         * Creates the markup of the view with months.
         *
         * @method _renderMonthSelector
         * @private
         */
        _renderMonthSelector: function () {
            var selector = document.createElement('ul');
            selector.className = 'ink-calendar-month-selector';

            var ulSelector = document.createElement('ul');
            for(var mon=1; mon<=12; mon++){
                ulSelector.appendChild(this._renderMonthButton(mon));

                if (mon % 4 === 0) {
                    selector.appendChild(ulSelector);
                    ulSelector = document.createElement('ul');
                }
            }
            return selector;
        },

        /**
         * Renders a single month button.
         */
        _renderMonthButton: function (mon) {
            var liMonth = document.createElement('li');
            liMonth.appendChild(InkElement.create('a', {
                'data-cal-month': mon,
                setTextContent: this.i18n.getKey('datepicker.months')[mon].substring(0, 3)
            }));
            return liMonth;
        },

        _appendDatePickerToDom: function () {
            if(this._options.containerElement) {
                var appendTarget =
                    Common.elOrSelector(this._options.containerElement);
                appendTarget.appendChild(this._containerObject);
            }

            var parentIsControl = Selector.matchesSelector(
                this._element.parentNode,
                '.ink-form .control-group .control, .ink-form .control-group .control > *');

            if (parentIsControl) {
                this._wrapper = this._element.parentNode;
                this._wrapperIsControl = true;
            } else {
                this._wrapper = InkElement.create('div', { className: 'ink-datepicker-wrapper' });
                InkElement.wrap(this._element, this._wrapper);
            }

            InkElement.insertAfter(this._containerObject, this._element);
        },

        /**
         * Render the topmost bar with the "close" and "clear" buttons.
         */
        _renderSuperTopBar: function () {
            if((!this._options.showClose) || (!this._options.showClean)){ return; }

            this._superTopBar = document.createElement("div");
            this._superTopBar.className = 'ink-calendar-top-options';
            if(this._options.showClean){
                this._superTopBar.appendChild(InkElement.create('a', {
                    className: 'clean',
                    setHTML: this.i18n.text('datepicker.clean')
                }));
            }
            if(this._options.showClose){
                this._superTopBar.appendChild(InkElement.create('a', {
                    className: 'close',
                    setHTML: this.i18n.text('datepicker.close')
                }));
            }
            this._containerObject.appendChild(this._superTopBar);
        },

        _listenToContainerObjectEvents: function () {
            Event.observe(this._containerObject, 'mouseover' ,Ink.bindEvent(function(e){
                Event.stopDefault( e );
                this._hoverPicker = true;
            },this));

            Event.observe(this._containerObject, 'mouseout', Ink.bindEvent(function(e){
                Event.stopDefault( e );
                this._hoverPicker = false;
            },this));

            Event.observe(this._containerObject, 'click', Ink.bindEvent(this._onClick, this));
        },

        _onClick: function(e){
            var elem = Event.element(e);

            if (Css.hasClassName(elem, 'ink-calendar-off')) {
                Event.stopDefault(e);
                return null;
            }

            Event.stopDefault(e);

            // Relative changers
            this._onRelativeChangerClick(elem);

            // Absolute changers
            this._onAbsoluteChangerClick(elem);

            // Mode changers
            if (Css.hasClassName(elem, 'ink-calendar-link-month')) {
                this._showMonthSelector();
            } else if (Css.hasClassName(elem, 'ink-calendar-link-year')) {
                this._showYearSelector();
            } else if(Css.hasClassName(elem, 'clean')){
                this._clean();
            } else if(Css.hasClassName(elem, 'close')){
                this._hide(false);
            }

            this._updateDescription();
        },

        /**
         * Handles click events on a changer (« ») for next/prev year/month
         * @method _onChangerClick
         * @private
         **/
        _onRelativeChangerClick: function (elem) {
            var changeYear = {
                change_year_next: 1,
                change_year_prev: -1
            };
            var changeMonth = {
                change_month_next: 1,
                change_month_prev: -1
            };

            if( elem.className in changeMonth ) {
                this._updateCal(changeMonth[elem.className]);
            } else if( elem.className in changeYear ) {
                this._showYearSelector(changeYear[elem.className]);
            }
        },

        /**
         * Handles click events on an atom-changer (day button, month button, year button)
         *
         * @method _onAbsoluteChangerClick
         * @private
         */
        _onAbsoluteChangerClick: function (elem) {
            var elemData = InkElement.data(elem);

            if( Number(elemData.calDay) ){
                this.setDate(new Date(this._year, this._month, elemData.calDay), elem);
                if (this._options.shy) {
                    this._hide();
                } else {
                    this._updateCal();
                }
            } else if( Number(elemData.calMonth) ) {
                this._month = Number(elemData.calMonth) - 1;
                this._showDefaultView();
                this._updateCal();
            } else if( Number(elemData.calYear) ){
                this._changeYear(Number(elemData.calYear));
            }
        },

        _changeYear: function (year) {
            year = +year;
            if(!isNaN(year)){
                this._year = year;
                if( typeof this._options.onYearSelected === 'function' ){
                    this._options.onYearSelected(this, {
                        'year': this._year
                    });
                }
                this._showMonthSelector();
            }
        },

        _clean: function () {
            if(this._options.displayInSelect){
                this._options.yearField.selectedIndex = 0;
                this._options.monthField.selectedIndex = 0;
                this._options.dayField.selectedIndex = 0;
            } else {
                this._element.value = '';
            }
        },

        /**
         * Hides the DatePicker.
         * If the component is shy (options.shy), behaves differently.
         *
         * @method _hide
         * @param {Boolean}    [blur]   If false, forces hiding even if the component is shy.
         */
        _hide: function(blur) {
            blur = blur === undefined ? true : blur;
            if (blur === false || (blur && this._options.shy)) {
                Css.addClassName(this._containerObject, 'hide-all');
            }
        },

        /**
         * Sets the range of dates allowed to be selected in the Date Picker
         *
         * @method _setMinMax
         * @param {String} dateRange Two dates separated by a ':'. Example: 2013-01-01:2013-12-12
         * @private
         */
        _setMinMax: function( dateRange ) {
            var self = this;

            var noMinLimit = {
                _year: -Number.MAX_VALUE,
                _month: 0,
                _day: 1
            };

            var noMaxLimit = {
                _year: Number.MAX_VALUE,
                _month: 11,
                _day: 31
            };

            function noLimits() {
                self._min = noMinLimit;
                self._max = noMaxLimit;
            }

            if (!dateRange) { return noLimits(); }

            var dates = dateRange.split( ':' );
            var rDate = /^(\d{4})((\-)(\d{1,2})((\-)(\d{1,2}))?)?$/;

            InkArray.each([
                        {name: '_min', date: dates[0], noLim: noMinLimit},
                        {name: '_max', date: dates[1], noLim: noMaxLimit}
                    ], Ink.bind(function (data) {

                var lim = data.noLim;

                if ( data.date.toUpperCase() === 'NOW' ) {
                    var now = new Date();
                    lim = dateishFromDate(now);
                } else if (data.date.toUpperCase() === 'EVER') {
                    lim = data.noLim;
                } else if ( rDate.test( data.date ) ) {
                    lim = dateishFromYMDString(data.date);

                    lim._month = clamp(lim._month, 0, 11);
                    lim._day = clamp(lim._day, 1, this._daysInMonth( lim._year, lim._month + 1 ));
                }

                this[data.name] = lim;
            }, this));

            // Should be equal, or min should be smaller
            var valid = this._dateCmp(this._max, this._min) !== -1;

            if (!valid) {
                noLimits();
            }
        },

        /**
         * Checks if a date is between the valid range.
         * Starts by checking if the date passed is valid. If not, will fallback to the 'today' date.
         * Then checks if the all params are inside of the date range specified. If not, it will fallback to the nearest valid date (either Min or Max).
         *
         * @method _fitDateToRange
         * @param  {Number} year  Year with 4 digits (yyyy)
         * @param  {Number} month Month
         * @param  {Number} day   Day
         * @return {Array}       Array with the final processed date.
         * @private
         */
        _fitDateToRange: function( date ) {
            if ( !this._isValidDate( date ) ) {
                date = dateishFromDate(new Date());
            }

            if (this._dateCmp(date, this._min) === -1) {
                return Ink.extendObj({}, this._min);
            } else if (this._dateCmp(date, this._max) === 1) {
                return Ink.extendObj({}, this._max);
            }

            return Ink.extendObj({}, date);  // date is okay already, just copy it.
        },

        /**
         * Checks whether a date is within the valid date range
         * @method _dateWithinRange
         * @param year
         * @param month
         * @param day
         * @return {Boolean}
         * @private
         */
        _dateWithinRange: function (date) {
            if (!arguments.length) {
                date = this;
            }

            return  (!this._dateAboveMax(date) &&
                    (!this._dateBelowMin(date)));
        },

        _dateAboveMax: function (date) {
            return this._dateCmp(date, this._max) === 1;
        },

        _dateBelowMin: function (date) {
            return this._dateCmp(date, this._min) === -1;
        },

        _dateCmp: function (self, oth) {
            return this._dateCmpUntil(self, oth, '_day');
        },

        /**
         * _dateCmp with varied precision. You can compare down to the day field, or, just to the month.
         * // the following two dates are considered equal because we asked
         * // _dateCmpUntil to just check up to the years.
         *
         * _dateCmpUntil({_year: 2000, _month: 10}, {_year: 2000, _month: 11}, '_year') === 0
         */
        _dateCmpUntil: function (self, oth, depth) {
            var props = ['_year', '_month', '_day'];
            var i = -1;

            do {
                i++;
                if      (self[props[i]] > oth[props[i]]) { return 1; }
                else if (self[props[i]] < oth[props[i]]) { return -1; }
            } while (props[i] !== depth &&
                    self[props[i + 1]] !== undefined && oth[props[i + 1]] !== undefined);

            return 0;
        },

        _createSelectOptions: function () {
            var dayField = this._options.dayField;
            var monthField = this._options.monthField;
            var yearField = this._options.yearField;

            InkElement.setHTML(monthField, '');
            InkElement.setHTML(yearField, '');

            InkElement.fillSelect(monthField, InkArray.map([
                'Janeiro', 'Fevereiro', 'Março', 'Abril',
                'Maio', 'Junho', 'Julho', 'Agosto',
                'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ], function (monthName, i) { return [ i + 1, monthName ]; }), true);

            InkElement.fillSelect(yearField, InkArray.range(1900, 2000), true);

            function updateDays() {
                var daysInMonth =
                    new Date(+yearField.value,
                        monthField.value - 1 /* because JS months are zero-based */ + 1 /* because we want the next month */,
                        0 /* days are 1-based so if we choose 0 we get the last day of the previous month */
                    ).getDate();
                InkElement.setHTML(dayField, '');
                InkElement.fillSelect(dayField, InkArray.range(1, daysInMonth + 1), true);
            }

            // create event on selects to add or remove options depending on selection
            Event.observeMulti([monthField, yearField], 'change', updateDays);

            updateDays();
        },

        /**
         * Sets the markup in the default view mode (showing the days).
         * Also disables the previous and next buttons in case they don't meet the range requirements.
         *
         * @method _showDefaultView
         * @private
         */
        _showDefaultView: function(){
            this._yearSelector.style.display = 'none';
            this._monthSelector.style.display = 'none';
            this._monthPrev.childNodes[0].className = 'change_month_prev';
            this._monthNext.childNodes[0].className = 'change_month_next';

            if ( !this._getPrevMonth() ) {
                this._monthPrev.childNodes[0].className = 'action_inactive';
            }

            if ( !this._getNextMonth() ) {
                this._monthNext.childNodes[0].className = 'action_inactive';
            }

            this._monthContainer.style.display = 'block';
        },

        /**
         * Updates the date shown on the datepicker
         *
         * @method _updateDate
         * @private
         */
        _updateDate: function(){
            var dataParsed;
            if(!this._options.displayInSelect && this._element.value){
                dataParsed = this._parseDate(this._element.value);
            } else if (this._options.displayInSelect) {
                dataParsed = {
                    _year: this._options.yearField[this._options.yearField.selectedIndex].value,
                    _month: this._options.monthField[this._options.monthField.selectedIndex].value - 1,
                    _day: this._options.dayField[this._options.dayField.selectedIndex].value
                };
            }

            if (dataParsed) {
                dataParsed = this._fitDateToRange(dataParsed);
                this._year = dataParsed._year;
                this._month = dataParsed._month;
                this._day = dataParsed._day;
            }
            this._setDate();
            this._updateDescription();
            this._renderMonth();
        },

        /**
         * Updates the date description shown at the top of the datepicker
         *
         * EG "12 de November"
         *
         * @method  _updateDescription
         * @private
         */
        _updateDescription: function(){
            InkElement.setTextContent(this._monthChanger, this.i18n.getKey('datepicker.months')[this._month + 1]);
            InkElement.setTextContent(this._ofText, this.i18n.text('datepicker.of'));
            InkElement.setTextContent(this._yearChanger, this._year);
        },

        /**
         * Renders the year selector view of the datepicker
         *
         * @method _showYearSelector
         * @private
         */
        _showYearSelector: function(inc){
            this._incrementViewingYear(inc);

            var firstYear = this._year - (this._year % 10);
            var thisYear = firstYear - 1;

            InkElement.setHTML(this._yearSelector, '');
            var yearUl = InkElement.create('ul');
            this._yearSelector.appendChild(yearUl);

            if (thisYear > this._min._year) {
                var prevYearLi = InkElement.create('li');

                prevYearLi.appendChild(InkElement.create('a', {
                    href: '#year_prev',
                    className: 'change_year_prev',
                    setHTML: this.i18n.text('datepicker.prev_button')
                }));

                yearUl.appendChild(prevYearLi);
            } else {
                yearUl.appendChild(InkElement.create('li', { setHTML: '&nbsp;' }));
            }

            for (var i=1; i < 11; i++){
                if (i % 4 === 0){
                    yearUl = InkElement.create('ul');
                    this._yearSelector.appendChild(yearUl);
                }

                thisYear = firstYear + i - 1;

                yearUl.appendChild(this._getYearButton(thisYear));
            }

            if (thisYear < this._max._year) {
                var nextYearLi = InkElement.create('li');

                nextYearLi.appendChild(InkElement.create('a', {
                    href: '#year_next',
                    className: 'change_year_next',
                    setHTML: this.i18n.text('datepicker.next_button')
                }));

                yearUl.appendChild(nextYearLi);
            } else {
                yearUl.appendChild(InkElement.create('li', { setHTML: '&nbsp;' }));
            }

            this._monthPrev.childNodes[0].className = 'action_inactive';
            this._monthNext.childNodes[0].className = 'action_inactive';
            this._monthSelector.style.display = 'none';
            this._monthContainer.style.display = 'none';
            this._yearSelector.style.display = 'block';
        },

        /**
         * For the year selector.
         *
         * Update this._year, to find the next decade or use nextValidDateFn to find it.
         */
        _incrementViewingYear: function (inc) {
            if (!inc) { return; }

            var year = +this._year + inc*10;
            year = year - year % 10;
            if ( year > this._max._year || year + 9 < this._min._year){
                return;
            }
            this._year = +this._year + inc*10;
        },

        _getYearButton: function (thisYear) {
            var className = '';

            if (!this._acceptableYear({ _year: thisYear })) {
                className = 'ink-calendar-off';
            } else if (thisYear === this._year) {
                className = 'ink-calendar-on';
            }

            var li = InkElement.create('li');

            li.appendChild(InkElement.create('a', {
                href: '#',
                'data-cal-year': thisYear,
                className: className,
                setTextContent: thisYear
            }));

            return li;
        },

        /**
         * Show the month selector (happens when you click a year, or the "month" link.
         * @method _showMonthSelector
         * @private
         */
        _showMonthSelector: function () {
            this._yearSelector.style.display = 'none';
            this._monthContainer.style.display = 'none';
            this._monthPrev.childNodes[0].className = 'action_inactive';
            this._monthNext.childNodes[0].className = 'action_inactive';
            this._addMonthClassNames();
            this._monthSelector.style.display = 'block';
        },

        /**
         * This function returns the given date in the dateish format
         *
         * @method _parseDate
         * @param {String} dateStr A date on a string.
         * @private
         */
        _parseDate: function(dateStr){
            var date = InkDate.set( this._options.format , dateStr );
            if (date) {
                return dateishFromDate(date);
            }
            return null;
        },

        /**
         * Checks if a date is valid
         *
         * @method _isValidDate
         * @param {Dateish} date
         * @private
         * @return {Boolean} True if the date is valid, false otherwise
         */
        _isValidDate: function(date){
            var yearRegExp = /^\d{4}$/;
            var validOneOrTwo = /^\d{1,2}$/;
            return (
                yearRegExp.test(date._year)     &&
                validOneOrTwo.test(date._month) &&
                validOneOrTwo.test(date._day)   &&
                +date._month + 1 >= 1  &&
                +date._month + 1 <= 12 &&
                +date._day       >= 1  &&
                +date._day       <= this._daysInMonth(date._year, date._month + 1)
            );
        },

        /**
         * Checks if a given date is an valid format.
         *
         * @method _isDate
         * @param {String} format A date format.
         * @param {String} dateStr A date on a string.
         * @private
         * @return {Boolean} True if the given date is valid according to the given format
         */
        _isDate: function(format, dateStr){
            try {
                if (typeof format === 'undefined'){
                    return false;
                }
                var date = InkDate.set( format , dateStr );
                if( date && this._isValidDate( dateishFromDate(date) )) {
                    return true;
                }
            } catch (ex) {}

            return false;
        },

        _acceptableDay: function (date) {
            return this._acceptableDateComponent(date, 'validDayFn');
        },

        _acceptableMonth: function (date) {
            return this._acceptableDateComponent(date, 'validMonthFn');
        },

        _acceptableYear: function (date) {
            return this._acceptableDateComponent(date, 'validYearFn');
        },

        /** DRY base for the above 2 functions */
        _acceptableDateComponent: function (date, userCb) {
            if (this._options[userCb]) {
                return this._callUserCallbackBool(this._options[userCb], date);
            } else {
                return this._dateWithinRange(date);
            }
        },

        /**
         * This method returns the date written with the format specified on the options
         *
         * @method _writeDateInFormat
         * @private
         * @return {String} Returns the current date of the object in the specified format
         */
        _writeDateInFormat:function(){
            return InkDate.get( this._options.format , this.getDate());
        },

        /**
         * This method allows the user to set the DatePicker's date on run-time.
         *
         * @method setDate
         * @param {Date|String} dateString A Date object, or date string in yyyy-mm-dd format.
         * @return {void}
         * @public
         */
        setDate: function( dateString , objClicked) {
            if (dateString && typeof dateString.getDate === 'function') {
                dateString = [ dateString.getFullYear(),
                    dateString.getMonth() + 1, dateString.getDate() ].join('-');
            }

            if ( /\d{4}-\d{1,2}-\d{1,2}/.test( dateString ) ) {
                var auxDate = dateString.split( '-' );
                this._year  = +auxDate[ 0 ];
                this._month = +auxDate[ 1 ] - 1;
                this._day   = +auxDate[ 2 ];
            }

            this._setDate( objClicked );
        },

        /**
         * Gets the currently selected date as a JavaScript date.
         *
         * @method getDate
         * @return {void}
         * @public
         */
        getDate: function () {
            if (!this._day) {
                throw 'Ink.UI.DatePicker: Still picking a date. Cannot getDate now!';
            }
            return new Date(this._year, this._month, this._day);
        },

        /**
         * Sets the chosen date on the target input field
         *
         * @method _setDate
         * @param {Element} objClicked Clicked object inside the DatePicker's calendar.
         * @private
         */
        _setDate : function( objClicked ) {
            if (objClicked) {
                var data = InkElement.data(objClicked);
                this._day = (+data.calDay) || this._day;

                if(this._options.onSetDate) {
                    // calling onSetDate because the user selected something
                    this._options.onSetDate( this , { date : this.getDate() } );
                }
            }

            var dt = this._fitDateToRange(this);

            this._year = dt._year;
            this._month = dt._month;
            this._day = dt._day;

            if(!this._options.displayInSelect){
                var formattedDate = this._writeDateInFormat();
                if (formattedDate !== this._element.value) {
                    this._element.value = formattedDate;
                }
            } else {
                this._options.dayField.value   = this._day;
                this._options.monthField.value = this._month + 1;
                this._options.yearField.value  = this._year;
            }
        },

        /**
         * Makes the necessary work to update the calendar
         * when choosing a different month
         *
         * @method _updateCal
         * @param {Number} inc Indicates previous or next month
         * @private
         */
        _updateCal: function(inc){
            if( typeof this._options.onMonthSelected === 'function' ){
                this._options.onMonthSelected(this, {
                    'year': this._year,
                    'month' : this._month
                });
            }
            if (inc && this._updateMonth(inc) === null) {
                return;
            }
            this._renderMonth();
        },

        /**
         * Function that returns the number of days on a given month on a given year
         *
         * @method _daysInMonth
         * @param {Number} _y - year
         * @param {Number} _m - month
         * @private
         * @return {Number} The number of days on a given month on a given year
         */
        _daysInMonth: function(_y,_m){
            var exceptions = {
                2: ((_y % 400 === 0) || (_y % 4 === 0 && _y % 100 !== 0)) ? 29 : 28,
                4: 30,
                6: 30,
                9: 30,
                11: 30
            };

            return exceptions[_m] || 31;
        },


        /**
         * Updates the calendar when a different month is chosen
         *
         * @method _updateMonth
         * @param {Number} incValue - indicates previous or next month
         * @private
         */
        _updateMonth: function(incValue){
            var date;
            if (incValue > 0) {
                date = this._getNextMonth();
            } else if (incValue < 0) {
                date = this._getPrevMonth();
            }
            if (!date) { return null; }
            this._year = date._year;
            this._month = date._month;
            this._day = date._day;
        },

        /**
         * Get the next month we can show.
         */
        _getNextMonth: function (date) {
            return this._tryLeap( date, 'Month', 'next', function (d) {
                    d._month += 1;
                    if (d._month > 11) {
                        d._month = 0;
                        d._year += 1;
                    }
                    return d;
                });
        },

        /**
         * Get the previous month we can show.
         */
        _getPrevMonth: function (date) {
            return this._tryLeap( date, 'Month', 'prev', function (d) {
                    d._month -= 1;
                    if (d._month < 0) {
                        d._month = 11;
                        d._year -= 1;
                    }
                    return d;
                });
        },

        /**
         * Get the next year we can show.
         */
        _getPrevYear: function (date) {
            return this._tryLeap( date, 'Year', 'prev', function (d) {
                    d._year -= 1;
                    return d;
                });
        },

        /**
         * Get the next year we can show.
         */
        _getNextYear: function (date) {
            return this._tryLeap( date, 'Year', 'next', function (d) {
                    d._year += 1;
                    return d;
                });
        },

        /**
         * DRY base for a function which tries to get the next or previous valid year or month.
         *
         * It checks if we can go forward by using _dateCmp with atomic
         * precision (this means, {_year} for leaping years, and
         * {_year, month} for leaping months), then it tries to get the
         * result from the user-supplied callback (nextDateFn or prevDateFn),
         * and when this is not present, advance the date forward using the
         * `advancer` callback.
         */
        _tryLeap: function (date, atomName, directionName, advancer) {
            date = date || { _year: this._year, _month: this._month, _day: this._day };

            var maxOrMin = directionName === 'prev' ? '_min' : '_max';
            var boundary = this[maxOrMin];

            // Check if we're by the boundary of min/max year/month
            if (this._dateCmpUntil(date, boundary, atomName) === 0) {
                return null;  // We're already at the boundary. Bail.
            }

            var leapUserCb = this._options[directionName + 'ValidDateFn'];
            if (leapUserCb) {
                return this._callUserCallbackDate(leapUserCb, date);
            } else {
                date = advancer(date);
            }

            var daysInThisMonth = this._daysInMonth(date._year, date._month + 1);
            if (date._day > daysInThisMonth) {
                date._day = daysInThisMonth;
            }

            date = this._fitDateToRange(date);

            return this['_acceptable' + atomName](date) ? date : null;
        },

        _getNextDecade: function (date) {
            date = date || { _year: this._year, _month: this._month, _day: this._day };
            var decade = this._getCurrentDecade(date);
            if (decade + 10 > this._max._year) { return null; }
            return decade + 10;
        },

        _getPrevDecade: function (date) {
            date = date || { _year: this._year, _month: this._month, _day: this._day };
            var decade = this._getCurrentDecade(date);
            if (getDecade(decade - 10) < getDecade(this._min._year)) { return null; }
            return decade - 10;
        },

        /** Returns the decade given a date or year*/
        _getCurrentDecade: function (year) {
            year = year ? (year._year || year) : this._year;
            return getDecade(this._year);
        },

        _callUserCallbackBase: function (cb, date) {
            return cb.call(this, date._year, date._month + 1, date._day);
        },

        _callUserCallbackBool: function (cb, date) {
            return !!this._callUserCallbackBase(cb, date);
        },

        _callUserCallbackDate: function (cb, date) {
            var ret = this._callUserCallbackBase(cb, date);
            return ret ? dateishFromDate(ret) : null;
        },

        /**
         * Key-value object that (for a given key) points to the correct parsing format for the DatePicker
         * @property _dateParsers
         * @type {Object}
         * @readOnly
         */
        _dateParsers: {
            'yyyy-mm-dd' : 'Y-m-d' ,
            'yyyy/mm/dd' : 'Y/m/d' ,
            'yy-mm-dd'   : 'y-m-d' ,
            'yy/mm/dd'   : 'y/m/d' ,
            'dd-mm-yyyy' : 'd-m-Y' ,
            'dd/mm/yyyy' : 'd/m/Y' ,
            'dd-mm-yy'   : 'd-m-y' ,
            'dd/mm/yy'   : 'd/m/y' ,
            'mm/dd/yyyy' : 'm/d/Y' ,
            'mm-dd-yyyy' : 'm-d-Y'
        },

        /**
         * Renders the current month
         *
         * @method _renderMonth
         * @private
         */
        _renderMonth: function(){
            var month = this._month;
            var year = this._year;

            this._showDefaultView();

            InkElement.setHTML(this._monthContainer, '');

            this._monthContainer.appendChild(
                    this._getMonthCalendarHeader(this._options.startWeekDay));

            this._monthContainer.appendChild(
                    this._getDayButtons(year, month));
        },

        /**
         * Figure out where the first day of a month lies
         * in the first row of the calendar.
         *
         *      having options.startWeekDay === 0
         *
         *      Su Mo Tu We Th Fr Sa  
         *                         1  <- The "1" is in the 7th day. return 6.
         *       2  3  4  5  6  7  8  
         *       9 10 11 12 13 14 15  
         *      16 17 18 19 20 21 22  
         *      23 24 25 26 27 28 29  
         *      30 31
         *
         * This obviously changes according to the user option "startWeekDay"
         **/
        _getFirstDayIndex: function (year, month) {
            var wDayFirst = (new Date( year , month , 1 )).getDay();  // Sunday=0
            var startWeekDay = this._options.startWeekDay || 0;  // Sunday=0

            var result = wDayFirst - startWeekDay;

            result %= 7;

            if (result < 0) {
                result += 7;
            }

            return result;
        },

        _getDayButtons: function (year, month) {
            var daysInMonth = this._daysInMonth(year, month + 1);

            var ret = document.createDocumentFragment();

            var ul = InkElement.create('ul');
            ret.appendChild(ul);

            var firstDayIndex = this._getFirstDayIndex(year, month);

            // Add padding if the first day of the month is not monday.
            for (var i = 0; i < firstDayIndex; i ++) {
                ul.appendChild(InkElement.create('li', {
                    className: 'ink-calendar-empty',
                    setHTML: '&nbsp;'
                }));
            }

            for (var day = 1; day <= daysInMonth; day++) {
                if ((day - 1 + firstDayIndex) % 7 === 0){ // new week, new UL
                    ul = InkElement.create('ul');
                    ret.appendChild(ul);
                }

                ul.appendChild(this._getDayButton(year, month, day));
            }
            return ret;
        },

        /**
         * Get the HTML markup for a single day in month view, given year, month, day.
         *
         * @method _getDayButtonHtml
         * @private
         */
        _getDayButton: function (year, month, day) {
            var attrs = {};
            var date = dateishFromYMD(year, month, day);

            if (!this._acceptableDay(date)) {
                attrs.className = 'ink-calendar-off';
            } else {
                attrs['data-cal-day'] = day;

                if (this._day && this._dateCmp(date, this) === 0) {
                    attrs.className = 'ink-calendar-on';
                }
            }

            attrs.setTextContent = day;

            var dayButton = InkElement.create('li');
            dayButton.appendChild(InkElement.create('a', attrs));
            return dayButton;
        },

        /** Write the top bar of the calendar (M T W T F S S) */
        _getMonthCalendarHeader: function (startWeekDay) {
            var header = InkElement.create('ul', {
                className: 'ink-calendar-header'
            });

            var wDay;
            for(var i=0; i<7; i++){
                wDay = (startWeekDay + i) % 7;
                header.appendChild(InkElement.create('li', {
                    setTextContent: this.i18n.getKey('datepicker.week_days')[wDay].substring(0, 1)
                }));
            }

            return header;
        },

        /**
         * This method adds class names to month buttons, to visually distinguish.
         *
         * @method _addMonthClassNames
         * @param {Element} parent Element where all the months are.
         * @private
         */
        _addMonthClassNames: function(parent){
            InkArray.forEach(
                (parent || this._monthSelector).getElementsByTagName('a'),
                Ink.bindMethod(this, '_addMonthButtonClassNames'));
        },

        /**
         * Add the ink-calendar-on className if the given button is the current month,
         * otherwise add the ink-calendar-off className if the given button refers to
         * an unacceptable month (given dateRange and validMonthFn)
         */
        _addMonthButtonClassNames: function (btn) {
            var data = InkElement.data(btn);
            if (!data.calMonth) { throw 'not a calendar month button!'; }

            var month = +data.calMonth - 1;

            if ( month === this._month ) {
                Css.addClassName( btn, 'ink-calendar-on' );  // This month
                Css.removeClassName( btn, 'ink-calendar-off' );
            } else {
                Css.removeClassName( btn, 'ink-calendar-on' );  // Not this month

                var toDisable = !this._acceptableMonth({_year: this._year, _month: month});
                Css.addRemoveClassName( btn, 'ink-calendar-off', toDisable);
            }
        },

        /**
         * Set my I18n instance with the calendar text
         * @method setI18n
         * @param {Ink.Util.I18n_1} i18n I18n instance
         **/
        setI18n: function (i18n) {
            if (i18n.clone) {
                // New function, added safety
                i18n = i18n.clone();
            }
            this.i18n = i18n;
        },

        /**
         * Get my I18n instance with the calendar text
         * @method getI18n
         * @return {Ink.Util.I18n_1} I18n instance
         **/
        getI18n: function () {
            return this.i18n || datePickerI18n;
        },

        /**
         * Set the language to the given language code
         * If we don't have an i18n instance, create one which is a copy of the global one.
         * @method setLanguage
         * @param {String} language Language code (ex: en_US, pt_PT)
         * @return {void}
         * @public
         **/
        setLanguage: function (language) {
            if (!this.i18n) {
                this.setI18n(datePickerI18n);
            }
            this.i18n.lang(language);
        },

        /**
         * Gets the language code string (pt_PT or en_US for example) currently in use.
         * May be global
         *
         * @method getLanguage
         * @public
         * @return {String} Language code.
         **/
        getLanguage: function () {
            return this.i18n ? this.i18n.lang() : datePickerI18n.lang();
        },

        /**
         * This calls the rendering of the selected month. (Deprecated: use show() instead)
         *
         */
        showMonth: function(){
            this._renderMonth();
        },

        /**
         * Checks if the calendar screen is in 'select day' mode
         * 
         * @method isMonthRendered
         * @return {Boolean} True if the calendar screen is in 'select day' mode
         * @public
         */
        isMonthRendered: function(){
            var header = Selector.select('.ink-calendar-header', this._containerObject)[0];

            return ((Css.getStyle(header.parentNode,'display') !== 'none') &&
                    (Css.getStyle(header.parentNode.parentNode,'display') !== 'none') );
        },

        /**
         * Destroys this datepicker, removing it from the page.
         *
         * @method destroy
         * @return {void}
         * @public
         **/
        destroy: function () {
            InkElement.unwrap(this._element);
            InkElement.remove(this._wrapper);
            InkElement.remove(this._containerObject);
            Common.unregisterInstance.call(this);
        }
    };

    Common.createUIComponent(DatePicker);

    return DatePicker;
});


Ink.createModule('Ink.UI.DragDrop', 1, ['Ink.Dom.Element_1', 'Ink.Dom.Event_1', 'Ink.Dom.Css_1', 'Ink.Util.Array_1', 'Ink.UI.Common_1', 'Ink.Dom.Selector_1'], function(InkElement, InkEvent, InkCss, InkArray, UICommon, Selector){
    'use strict';

    function findElementUnderMouse(opt) {
        // TODO take advantage of getElementsFromPoint when it comes out
        opt.exceptFor.style.display = 'none';

        var ret = document.elementFromPoint(
            opt.x,
            opt.y);

        opt.exceptFor.style.display = '';

        return ret;
    }

    function DragDrop() {
        UICommon.BaseUIComponent.apply(this, arguments);
    }

    DragDrop._name = 'DragDrop_1';

    DragDrop._optionDefinition = {
        // dragdropContainer: ['Element', '.dragdrop-container'], - is this._element
        dragItem:       ['String', '.drag-item'],
        dragHandle:     ['String', '.drag-handle'],
        dropZone:       ['String', '.drop-zone'],
        ignoreDrag:     ['String', '.drag-ignore'],
        draggedCloneClass: ['String', 'drag-cloned-item'],
        placeholderClass: ['String', 'drag-placeholder-item'],
        onDrag:         ['Function', null],
        onDrop:         ['Function', null]
    };

    DragDrop.prototype = {
        /**
         * A replacement for Draggables, Droppables, and SortableList. It aims to be good at creating draggables, droppables and sortable lists at the same time while keeping it simple for everyone.
         *
         * A DragDrop component may contain one or more "dropZone"s, which are the areas where the "dragItem"s can be dropped. You can identify elements as being a dropZone or a dragItem by using the correct selectors (".drag-item" and ".drop-zone").
         *
         * @class Ink.UI.DragDrop
         * @constructor
         * @version 1
         * @param {Element} [element] Root element for the DragDrop. It can contain one or more dropzones.
         * @param {Object} [options]
         *  Options object, containing:
         * @param {String} [options.dragItem='.drag-item']
         *  Selector for the items to be dragged
         * @param {String} [options.dragHandle='.drag-handle']
         *  Selector for a dragging handle. You won't be able to drag other parts of the dragItem.
         * @param {String} [options.dropZone='.drop-zone']
         *  Selector of drop zones. Should add this to the element itself.
         * @param {String} [options.ignoreDrag='.drag-ignore']
         *  Selector of places where you can't drag.
         * @param {String} [options.draggedCloneClass='drag-cloned-item']
         *  Class for the cloned (and position:fixed'ed) element.
         * @param {String} [options.placeholderClass='drag-placeholder-item']
         *  Class for the placeholder clone
         * @param {Function} [options.onDrag]
         *  Called when dragging starts. Takes an `{ dragItem, dropZone }` object.
         * @param {Function} [options.onDrop]
         *  Called when dragging ends. Takes an `{ origin, dragItem, dropZone }` object.
         *
         * @sample Ink_UI_DragDrop_1.html
         **/
        _init: function() {
            this._dragActive = false;

            this._draggedElm = null;
            this._clonedElm = null;
            this._placeholderElm = null;
            this._originalDrop = null;

            this._mouseDelta = [0, 0];

            this._addEvents();
        },

        _addEvents: function() {
            InkEvent.on(this._element, 'mousedown touchstart', Ink.bindEvent(this._onMouseDown, this));
        },

        _onMouseDown: function(event) {
            var tgt = InkEvent.element(event);

            var draggedElm = InkElement.findUpwardsBySelector(tgt, this._options.dragItem);

            var elmIgnoreDraggable = InkElement.findUpwardsBySelector(tgt, this._options.ignoreDrag);

            if(draggedElm && !elmIgnoreDraggable) {
                // has handler
                var handleElm = Ink.s(this._options.dragHandle, draggedElm);
                if(handleElm && InkElement.findUpwardsBySelector(tgt, this._options.dragHandle)) {
                    this._dragActive = true;
                } else if (!handleElm) {
                    this._dragActive = true;
                }

                if (this._dragActive) {
                    InkEvent.stopDefault(event);
                    this._startDrag(event, draggedElm);
                }
            }
        },

        _startDrag: function(event, draggedElm) {
            // TODO rename
            this._clonedElm = draggedElm.cloneNode(true);
            this._placeholderElm = draggedElm.cloneNode(false);

            InkCss.addClassName(this._clonedElm, this._options.draggedCloneClass);
            this._clonedElm.removeAttribute('id');

            InkCss.addClassName(this._placeholderElm, this._options.placeholderClass);
            this._placeholderElm.removeAttribute('id');

            var rect = draggedElm.getBoundingClientRect();
            var dragElmDims = [
                rect.right - rect.left,
                rect.bottom - rect.top
            ];

            this._clonedElm.style.width = dragElmDims[0] + 'px';
            this._clonedElm.style.height = dragElmDims[1] + 'px';

            this._placeholderElm.style.width = dragElmDims[0] + 'px';
            this._placeholderElm.style.height = dragElmDims[1] + 'px';
            this._placeholderElm.style.visibility = 'hidden';

            // TODO goes in style
            this._clonedElm.style.position = 'fixed';
            this._clonedElm.style.zIndex = '1000';
            this._clonedElm.style.left = rect.left + 'px';
            this._clonedElm.style.top = rect.top + 'px';

            var mousePos = InkEvent.pointer(event);
            var dragElmPos = InkElement.offset(draggedElm);
            this._mouseDelta = [
                (mousePos.x - dragElmPos[0]),
                (mousePos.y - dragElmPos[1])
            ];

            this._clonedElm.style.opacity = '0.6';

            draggedElm.parentNode.insertBefore(this._clonedElm, draggedElm);

            // TODO rename
            this._draggedElm = draggedElm;

            draggedElm.parentNode.insertBefore(this._placeholderElm, draggedElm);
            InkCss.addClassName(draggedElm, 'hide-all');

            var hasOnDrag = typeof this._options.onDrag === 'function';
            var hasOnDrop = typeof this._options.onDrop === 'function';

            if (hasOnDrag || hasOnDrop) {
                var dragEvent = {
                    dragItem: this._draggedElm,
                    dropZone: this.getDropZone(this._draggedElm)
                };

                if (hasOnDrag) {
                    this._options.onDrag.call(this, dragEvent);
                }

                if (hasOnDrop) {
                    this._originalDrop = dragEvent.dropZone;
                }
            }

            var mouseMoveThrottled = InkEvent.throttle(this._onMouseMove, 50, {
                // Prevent the default of events
                preventDefault: true,
                bind: this
            });

            InkEvent.on(document, 'mousemove.inkdraggable touchmove.inkdraggable', mouseMoveThrottled);
            InkEvent.on(document, 'mouseup.inkdraggable touchend.inkdraggable',
                Ink.bindEvent(this._onMouseUp, this));
        },

        _onMouseMove: function(event) {
            if (!this._dragActive) { return; }

            var mousePos = InkEvent.pointer(event);

            var scrollLeft = InkElement.scrollWidth();
            var scrollTop = InkElement.scrollHeight();

            this._clonedElm.style.left =
                (mousePos.x - this._mouseDelta[0] - scrollLeft) + 'px';
            this._clonedElm.style.top =
                (mousePos.y - this._mouseDelta[1] - scrollTop) + 'px';

            var elUnderMouse = findElementUnderMouse({
                x: mousePos.x - scrollLeft,
                y: mousePos.y - scrollTop,
                exceptFor: this._clonedElm
            });

            var dropZoneUnderMouse =
                this.getDropZone(elUnderMouse);

            var isMyDropZone = dropZoneUnderMouse && (
                InkElement.isAncestorOf(this._element, dropZoneUnderMouse) ||
                this._element === dropZoneUnderMouse);

            if(dropZoneUnderMouse && isMyDropZone) {
                var otherDragItem =
                    InkElement.findUpwardsBySelector(elUnderMouse, this._options.dragItem);

                if (otherDragItem && this.isDragItem(otherDragItem)) {
                    // The mouse cursor is over another drag-item
                    this._insertPlaceholder(otherDragItem);
                } else if (this._dropZoneIsEmpty(dropZoneUnderMouse)) {
                    // The mouse cursor is over an empty dropzone, so there is nowhere to put it "after" or "before"
                    dropZoneUnderMouse.appendChild(this._placeholderElm);
                }
            }
            // Otherwise, the cursor is outside anything useful
        },

        /**
         * Returns whether a given .drag-item element is a plain old .drag-item element
         * and not one of the clones we're creating or the element we're really dragging.
         *
         * Used because the selector ".drag-item" finds these elements we don't consider drag-items
         *
         * @method isDragItem
         * @param elm {Element} The element to test.
         * @public
         **/
        isDragItem: function (elm) {
            return (
                Selector.matchesSelector(elm, this._options.dragItem) &&
                elm !== this._draggedElm &&
                elm !== this._placeholderElm &&
                elm !== this._clonedElm);
        },

        _dropZoneIsEmpty: function (dropZone) {
            // Find elements with the class .drag-item in the drop-zone
            var dragItems = Ink.ss(this._options.dragItem, dropZone);

            // Make sure none of these elements are actually the dragged element,
            // the placeholder, or the position:fixed clone.
            return !InkArray.some(dragItems, Ink.bindMethod(this, 'isDragItem'));
        },

        _onMouseUp: function() {
            if (!this._dragActive) { return; }

            // The actual dropping is just putting our *real* node where the placeholder once was.
            InkElement.insertBefore(this._draggedElm, this._placeholderElm);

            InkElement.remove(this._placeholderElm);
            InkElement.remove(this._clonedElm);

            InkCss.removeClassName(this._draggedElm, 'hide-all');

            InkEvent.off(document, '.inkdraggable');

            this._dragActive = false;

            if (typeof this._options.onDrop === 'function') {
                this._options.onDrop.call(this, {
                    origin: this._originalDrop,
                    dragItem: this._draggedElm,
                    dropZone: this.getDropZone(this._draggedElm)
                });
            }

            this._placeholderElm = null;
            this._clonedElm = null;
            this._draggedElm = null;
            this._originalDrop = null;
        },

        /**
         * Get the dropZone containing the given element.
         *
         * @method getDropZone
         * @param dragItem {Element} The dragItem to find the dropZone of
         * @returns {Element}
         * @public
         **/
        getDropZone: function (dragItem) {
            var ret = InkElement.findUpwardsBySelector(
                dragItem, this._options.dropZone) || this._element;

            if (InkElement.isAncestorOf(this._element, ret) || ret === this._element) {
                return ret;
            }

            return null;
        },

        /**
         * Returns what element the user is dragging, or `null` if no drag is occurring.
         *
         * @method getDraggedElement
         * @returns {Element|null} Element being dragged
         * @public
         **/
        getDraggedElement: function () {
            if (!this.dragActive) {
                return null;
            }

            return this._draggedElm;
        },

        /**
         * Called when mouse has moved over a new element
         *
         * Given a competitor drag-item, it figures out
         * whether we want to put our placeholder *after* it or *before* it.
         *
         **/
        _insertPlaceholder: function(elm) {
            var goesAfter = true;

            if (!InkArray.inArray(this._placeholderElm, InkElement.previousSiblings(elm))) {
                goesAfter = false;
            }

            if(goesAfter) {
                InkElement.insertAfter(this._placeholderElm, elm);
            } else {
                InkElement.insertBefore(this._placeholderElm, elm);
            }
        },

        /**
         * Destroy your DragDrop, removing it from the DOM
         *
         * @method destroy
         * @public
         * @returns {void}
         **/
        destroy: function () {
            if (this._dragActive) {
                InkEvent.off(document, '.inkdraggable');
            }
            UICommon.destroyComponent.call(this);
        }
    };

    UICommon.createUIComponent(DragDrop);

    return DragDrop;
});


/**
 * Dragging elements around
 * @module Ink.UI.Draggable_1
 * @version 1
 */
 
Ink.createModule("Ink.UI.Draggable","1",["Ink.Dom.Element_1", "Ink.Dom.Event_1", "Ink.Dom.Css_1", "Ink.Dom.Browser_1", "Ink.Dom.Selector_1", "Ink.UI.Common_1"],function( InkElement, InkEvent, Css, Browser, Selector, Common) {
    'use strict';

    var x = 0,
        y = 1;  // For accessing coords in [x, y] arrays
    
    // Get a value between two boundaries
    function between (val, min, max) {
        val = Math.min(val, max);
        val = Math.max(val, min);
        return val;
    }

    /**
     * @class Ink.UI.Draggable
     * @version 1
     * @constructor
     * @param {String|Element}      target                      Target element.
     * @param {Object}              [options]                   Optional object to configure the component.
     * @param {String}              [options.constraint]        Movement constraint. None by default. Can be `vertical`, `horizontal`, or `both`.
     * @param {String|Element}      [options.constraintElm]     Constrain dragging to be within this element. None by default.
     * @param {Number}              [options.top]               Limits to constrain draggable movement.
     * @param {Number}              [options.right]             Limits to constrain draggable movement.
     * @param {Number}              [options.bottom]            Limits to constrain draggable movement.
     * @param {Number}              [options.left]              Limits to constrain draggable movement.
     * @param {String|Element}      [options.handle]            If specified, this element or CSS ID will be used as a handle for dragging.
     * @param {Boolean}             [options.revert=false]            Flag to revert the draggable to the original position when dragging stops.
     * @param {String}              [options.cursor='move']            Cursor type (CSS `cursor` value) used when the mouse is over the draggable object.
     * @param {Number}              [options.zIndex]            Z-index applied to the draggable element while dragged.
     * @param {Number}              [options.fps]               If set, throttles the drag effect to this number of frames per second.
     * @param {Element}             [options.droppableProxy]    If set, a shallow copy of this element will be moved around with transparent background.
     * @param {String}              [options.mouseAnchor]       Anchor for the drag. Can be one of: 'left','center','right','top','center','bottom'.
     * @param {String}              [options.dragClass]         Class to add when the draggable is being dragged. Defaults to drag.
     * @param {Boolean}             [options.skipChildren=true] Whether you have to drag the actual element, or dragging one of the children is okay too.
     * @param {Function}            [options.onStart]           Callback called when dragging starts.
     * @param {Function}            [options.onEnd]             Callback called when dragging stops.
     * @param {Function}            [options.onDrag]            Callback called while dragging, prior to position updates.
     * @param {Function}            [options.onChange]          Callback called while dragging, after position updates.
     *
     * @sample Ink_UI_Draggable_1.html
     */
    function Draggable() {
        Common.BaseUIComponent.apply(this, arguments);
    }

    Draggable._name = 'Draggable_1';

    Draggable._optionDefinition = {
        constraint:         ['String', false],
        constraintElm:      ['Element', false],
        top:                ['Number', false],
        right:              ['Number', false],
        bottom:             ['Number', false],
        left:               ['Number', false],
        handle:             ['Element', false],
        revert:             ['Boolean', false],
        cursor:             ['String', 'move'],
        zIndex:             ['Number', 9999],
        fps:                ['Number', 0],
        droppableProxy:     ['Element', false],
        mouseAnchor:        ['String', undefined],
        dragClass:          ['String', 'drag'],
        skipChildren:       ['Boolean', true],  // Magic/More Magic
        onStart:            ['Function', false],
        onEnd:              ['Function', false],
        onDrag:             ['Function', false],
        onChange:           ['Function', false]
    };

    Draggable.prototype = {
        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @param {String|Element}      element     Element ID of the element or DOM Element.
         * @param {Object}              [options]   Options object for configuration of the module.
         * @private
         */
        _init: function() {
            var o = this._options;
            this.constraintElm = o.constraintElm && Common.elOrSelector(o.constraintElm);

            this.handle             = false;
            this.elmStartPosition   = false;
            this.active             = false;
            this.dragged            = false;
            this.prevCoords         = false;
            this.placeholder        = false;

            this.position           = false;
            this.zindex             = false;
            this.firstDrag          = true;

            if (o.fps) {
                this.deltaMs = 1000 / o.fps;
                this.lastRunAt = 0;
            }

            this.handlers = {};
            this.handlers.start         = Ink.bindEvent(this._onStart,this);
            this.handlers.dragFacade    = Ink.bindEvent(this._onDragFacade,this);
            this.handlers.drag          = Ink.bindEvent(this._onDrag,this);
            this.handlers.end           = Ink.bindEvent(this._onEnd,this);
            this.handlers.selectStart   = function(event) {    InkEvent.stop(event);    return false;    };

            // set handle
            this.handle = (this._options.handle) ?
                Common.elOrSelector(this._options.handle) :
                this._element;

            this.handle.style.cursor = o.cursor;

            InkEvent.observe(this.handle, 'touchstart', this.handlers.start);
            InkEvent.observe(this.handle, 'mousedown', this.handlers.start);

            if (Browser.IE) {
                InkEvent.observe(this._element, 'selectstart', this.handlers.selectStart);
            }
        },

        /**
         * Removes the ability of the element of being dragged
         * 
         * @method destroy
         * @return {void}
         * @public
         */
        destroy: function() {
            InkEvent.stopObserving(this.handle, 'touchstart', this.handlers.start);
            InkEvent.stopObserving(this.handle, 'mousedown', this.handlers.start);

            if (Browser.IE) {
                InkEvent.stopObserving(this._element, 'selectstart', this.handlers.selectStart);
            }
        },

        /**
         * Gets coordinates for a given event (with added page scroll)
         * 
         * @method _getCoords
         * @param {Object} e window.event object.
         * @return {Array} Array where the first position is the x coordinate, the second is the y coordinate
         * @private
         */
        _getCoords: function(e) {
            var ps = [InkElement.scrollWidth(), InkElement.scrollHeight()];
            return {
                x: (e.touches ? e.touches[0].clientX : e.clientX) + ps[x],
                y: (e.touches ? e.touches[0].clientY : e.clientY) + ps[y]
            };
        },

        /**
         * Clones src element's relevant properties to dst
         * 
         * @method _cloneStyle
         * @param {Element} src Element from where we're getting the styles
         * @param {Element} dst Element where we're placing the styles.
         * @private
         */
        _cloneStyle: function(src, dst) {
            dst.className = src.className;
            dst.style.borderWidth   = '0';
            dst.style.padding       = '0';
            dst.style.position      = 'absolute';
            dst.style.width         = InkElement.elementWidth(src)        + 'px';
            dst.style.height        = InkElement.elementHeight(src)    + 'px';
            dst.style.left          = InkElement.elementLeft(src)        + 'px';
            dst.style.top           = InkElement.elementTop(src)        + 'px';
            dst.style.cssFloat      = Css.getStyle(src, 'float');
            dst.style.display       = Css.getStyle(src, 'display');
        },

        /**
         * onStart event handler
         * 
         * @method _onStart
         * @param {Object} e mousedown or touchstart event
         * @return {Boolean|void} Returns false to cancel the event, unless the drag has already been started.
         * @private
         */
        _onStart: function(e) {
            if (!this.active && InkEvent.isLeftClick(e) || typeof e.button === 'undefined') {

                var tgtEl = InkEvent.element(e);
                if (this._options.skipChildren && tgtEl !== this.handle) {    return;    }

                InkEvent.stop(e);

                Css.addClassName(this._element, this._options.dragClass);

                this.elmStartPosition = [
                    InkElement.elementLeft(this._element),
                    InkElement.elementTop( this._element)
                ];

                var pos = [
                    parseInt(Css.getStyle(this._element, 'left'), 10),
                    parseInt(Css.getStyle(this._element, 'top'),  10)
                ];

                var dims = InkElement.elementDimensions(this._element);

                this.originalPosition = [ pos[x] ? pos[x]: null, pos[y] ? pos[y] : null ];
                this.delta = this._getCoords(e); // mouse coords at beginning of drag

                this.active = true;
                this.position = Css.getStyle(this._element, 'position');
                this.zindex = Css.getStyle(this._element, 'zIndex');

                var div = document.createElement('div');
                div.style.position      = this.position;
                div.style.width         = dims[x] + 'px';
                div.style.height        = dims[y] + 'px';
                div.style.marginTop     = Css.getStyle(this._element, 'margin-top');
                div.style.marginBottom  = Css.getStyle(this._element, 'margin-bottom');
                div.style.marginLeft    = Css.getStyle(this._element, 'margin-left');
                div.style.marginRight   = Css.getStyle(this._element, 'margin-right');
                div.style.borderWidth   = '0';
                div.style.padding       = '0';
                div.style.cssFloat      = Css.getStyle(this._element, 'float');
                div.style.display       = Css.getStyle(this._element, 'display');
                div.style.visibility    = 'hidden';

                this.delta2 = [ this.delta.x - this.elmStartPosition[x], this.delta.y - this.elmStartPosition[y] ]; // diff between top-left corner of obj and mouse
                if (this._options.mouseAnchor) {
                    var parts = this._options.mouseAnchor.split(' ');
                    var ad = [dims[x], dims[y]];    // starts with 'right bottom'
                    if (parts[0] === 'left') {    ad[x] = 0;    } else if(parts[0] === 'center') {    ad[x] = parseInt(ad[x]/2, 10);    }
                    if (parts[1] === 'top') {     ad[y] = 0;    } else if(parts[1] === 'center') {    ad[y] = parseInt(ad[y]/2, 10);    }
                    this.applyDelta = [this.delta2[x] - ad[x], this.delta2[y] - ad[y]];
                }

                var dragHandlerName = this._options.fps ? 'dragFacade' : 'drag';

                this.placeholder = div;

                if (this._options.onStart) {        this._options.onStart(this._element, e);        }

                if (this._options.droppableProxy) {    // create new transparent div to optimize DOM traversal during drag
                    this.proxy = document.createElement('div');
                    dims = [
                        window.innerWidth     || document.documentElement.clientWidth   || document.body.clientWidth,
                        window.innerHeight    || document.documentElement.clientHeight  || document.body.clientHeight
                    ];
                    var fs = this.proxy.style;
                    fs.width            = dims[x] + 'px';
                    fs.height           = dims[y] + 'px';
                    fs.position         = 'fixed';
                    fs.left             = '0';
                    fs.top              = '0';
                    fs.zIndex           = this._options.zIndex + 1;
                    fs.backgroundColor  = '#FF0000';
                    Css.setOpacity(this.proxy, 0);

                    var firstEl = document.body.firstChild;
                    while (firstEl && firstEl.nodeType !== 1) {    firstEl = firstEl.nextSibling;    }
                    document.body.insertBefore(this.proxy, firstEl);

                    
                    InkEvent.observe(this.proxy, 'mousemove', this.handlers[dragHandlerName]);
                    InkEvent.observe(this.proxy, 'touchmove', this.handlers[dragHandlerName]);
                }
                else {
                    InkEvent.observe(document, 'mousemove', this.handlers[dragHandlerName]);
                }

                this._element.style.position = 'absolute';
                this._element.style.zIndex = this._options.zIndex;
                this._element.parentNode.insertBefore(this.placeholder, this._element);

                this._onDrag(e);

                InkEvent.observe(document, 'mouseup',      this.handlers.end);
                InkEvent.observe(document, 'touchend',     this.handlers.end);

                return false;
            }
        },

        /**
         * Function that gets the timestamp of the current run from time to time. (FPS)
         * 
         * @method _onDragFacade
         * @param {Object} mousemove or touchmove event object
         * @private
         */
        _onDragFacade: function(e) {
            var now = +new Date();
            if (!this.lastRunAt || now > this.lastRunAt + this.deltaMs) {
                this.lastRunAt = now;
                this._onDrag(e);
            }
        },

        /**
         * Function that handles the dragging movement
         * 
         * @method _onDrag
         * @param {Object} mousemove or touchmove event object.
         * @returns {Boolean|void} Returns false to cancel the event, which avoids accidental selection.
         * @private
         */
        _onDrag: function(e) {
            if (this.active) {
                InkEvent.stop(e);
                this.dragged = true;
                var mouseCoords = this._getCoords(e),
                    mPosX       = mouseCoords.x,
                    mPosY       = mouseCoords.y,
                    o           = this._options,
                    newX        = false,
                    newY        = false;

                if (this.prevCoords && mPosX !== this.prevCoords.x || mPosY !== this.prevCoords.y) {
                    if (o.onDrag) {        o.onDrag(this._element, e);        }
                    this.prevCoords = mouseCoords;

                    newX = this.elmStartPosition[x] + mPosX - this.delta.x;
                    newY = this.elmStartPosition[y] + mPosY - this.delta.y;

                    var draggableSize = InkElement.elementDimensions(this._element);

                    if (this.constraintElm) {
                        var offset = InkElement.offset(this.constraintElm);
                        var size = InkElement.elementDimensions(this.constraintElm);
                        var constTop = offset[y] + (o.top || 0),
                            constBottom = offset[y] + size[y] - (o.bottom || 0),
                            constLeft = offset[x] + (o.left || 0),
                            constRight = offset[x] + size[x] - (o.right || 0);

                        newY = between(newY, constTop, constBottom - draggableSize[y]);
                        newX = between(newX, constLeft, constRight - draggableSize[x]);
                    } else if (o.constraint) {
                        var right = o.right === false ? InkElement.pageWidth() - draggableSize[x] : o.right,
                            left = o.left === false ? 0 : o.left,
                            top = o.top === false ? 0 : o.top,
                            bottom = o.bottom === false ? InkElement.pageHeight() - draggableSize[y] : o.bottom;
                        if (o.constraint === 'horizontal' || o.constraint === 'both') {
                            newX = between(newX, left, right);
                        }
                        if (o.constraint === 'vertical' || o.constraint === 'both') {
                            newY = between(newY, top, bottom);
                        }
                    }

                    var Droppable = Ink.getModule('Ink.UI.Droppable_1');
                    if (this.firstDrag) {
                        if (Droppable) {    Droppable.updateAll();    }
                        /*this._element.style.position = 'absolute';
                        this._element.style.zIndex = this._options.zindex;
                        this._element.parentNode.insertBefore(this.placeholder, this._element);*/
                        this.firstDrag = false;
                    }

                    if (newX) {        this._element.style.left = newX + 'px';        }
                    if (newY) {        this._element.style.top  = newY + 'px';        }

                    if (Droppable) {
                        // apply applyDelta defined on drag init
                        var mouseCoords2 = this._options.mouseAnchor ?
                            {x: mPosX - this.applyDelta[x], y: mPosY - this.applyDelta[y]} :
                            mouseCoords;
                        Droppable.action(mouseCoords2, 'drag', e, this._element);
                    }
                    if (o.onChange) {    o.onChange(this);    }
                }
            }
        },

        /**
         * Function that handles the end of the dragging process
         * 
         * @method _onEnd
         * @param {Object} window.event object.
         * @private
         */
        _onEnd: function(e) {
            InkEvent.stopObserving(document, 'mousemove', this.handlers.drag);
            InkEvent.stopObserving(document, 'touchmove', this.handlers.drag);

            if (this._options.fps) {
                this._onDrag(e);
            }

            Css.removeClassName(this._element, this._options.dragClass);

            if (this.active && this.dragged) {

                if (this._options.droppableProxy) {    // remove transparent div...
                    document.body.removeChild(this.proxy);
                }

                if (this.pt) {    // remove debugging element...
                    InkElement.remove(this.pt);
                    this.pt = undefined;
                }

                /*if (this._options.revert) {
                    this.placeholder.parentNode.removeChild(this.placeholder);
                }*/

                if(this.placeholder) {
                    InkElement.remove(this.placeholder);
                }

                if (this._options.revert) {
                    this._element.style.position = this.position;
                    if (this.zindex !== null) {
                        this._element.style.zIndex = this.zindex;
                    }
                    else {
                        this._element.style.zIndex = 'auto';
                    } // restore default zindex of it had none

                    this._element.style.left = (this.originalPosition[x]) ? this.originalPosition[x] + 'px' : '';
                    this._element.style.top  = (this.originalPosition[y]) ? this.originalPosition[y] + 'px' : '';
                }

                if (this._options.onEnd) {
                    this._options.onEnd(this._element, e);
                }
                
                var Droppable = Ink.getModule('Ink.UI.Droppable_1');
                if (Droppable) {
                    Droppable.action(this._getCoords(e), 'drop', e, this._element);
                }

                this.position   = false;
                this.zindex     = false;
                this.firstDrag  = true;
            }

            this.active         = false;
            this.dragged        = false;
        }
    };

    Common.createUIComponent(Draggable);

    return Draggable;

});

/**
 * Off-canvas menu
 * @module Ink.UI.Drawer_1
 * @version 1
 */
 
Ink.createModule('Ink.UI.Drawer', '1', ['Ink.UI.Common_1', 'Ink.Dom.Loaded_1', 'Ink.Dom.Selector_1', 'Ink.Dom.Element_1', 'Ink.Dom.Event_1', 'Ink.Dom.Css_1'], function(Common, Loaded, Selector, Element, Event, Css) {
    'use strict';

    // A selector that finds focusable elements
    var sFocusableElms = [
        '[tabindex]:not([tabindex="-1"])',
        'input',
        'select',
        'textarea',
        'button',
        'object',
        'a[href]',
        'area'
    ].join(',');

    /**
     * Listen to a focus even on the document using capture, taking care to be the only focus listener in the whole page for this Drawer, and also to not regard focus events caused by the mouse.
     * @method pageWideFocusListener
     * @param {Function} callback Called when the focus is set on an element.
     * @private
     */
    var onlyWrapper = null;
    function pageWideFocusListener(callback) {
        // We *necessarily* need capture to make this happen
        if (!document.addEventListener) { return; }

        if (onlyWrapper) {
            _removePageWideFocusListener();
        }

        var mouseIsDown = false;
        onlyWrapper = function (ev) {
            if (ev.type  === 'mousedown' || ev.type === 'mouseup') {
                // Disregard focus events when mouse is down
                mouseIsDown = ev.type === 'mousedown';
                return;
            }

            if (mouseIsDown) { return; }

            callback(ev.target);
        };

        document.addEventListener('focus', onlyWrapper, true);
        document.addEventListener('mousedown', onlyWrapper, true);
        document.addEventListener('mouseup', onlyWrapper, true);
    }

    /**
     * Remove the focus event listener added by pageWideFocusListener. Called when Drawer is closed.
     * @method removePageWideFocusListener
     * @private
     */
    function _removePageWideFocusListener() {
        if (!document.addEventListener) { return; }
        if (!onlyWrapper) { return; }
        document.removeEventListener('focus', onlyWrapper, true);
        document.removeEventListener('mousedown', onlyWrapper, true);
        document.removeEventListener('mouseup', onlyWrapper, true);
        onlyWrapper = null;
    }

    /**
     * Finds the first focusable element inside a container and focuses it
     * @method focusFirstFocusableElementInside
     * @private
     * @returns {Boolean} `true` if it found something to focus, `false` otherwise.
     */
    function focusFirstFocusableElementInside(container) {
        // Find elements with positive tabIndex
        var withTabIndex = Ink.ss('[tabindex]', container);

        // Find the lowest tabIndex and focus it!
        var lowestTabIndex = null;
        var lowestTabIndexElm = null;
        for (var i = 0; i < withTabIndex.length; i++) {
            var ind = +withTabIndex[i].tabIndex;
            if (!ind /* 0 or NaN */) {
                withTabIndex.splice(i, 1);
            }
            if (lowestTabIndex === null || ind < lowestTabIndex) {
                lowestTabIndex = ind;
                lowestTabIndexElm = withTabIndex[i];
            }
        }

        if (lowestTabIndexElm) {
            lowestTabIndexElm.focus();
            return true;
        }

        var firstFocusable = Ink.s(sFocusableElms, container);

        if (firstFocusable) {
            firstFocusable.focus();
            return true;
        }

        return false;
    }

    function elNotFound(el) {
        return 'Ink.UI.Drawer_1: Could not find the "' +
            el + '" element on this page. Please make sure it exists.';
    }

    // Detect the transitionEnd event name, and the style property name for "transition", because prefixes.
    // Source: https://github.com/EvandroLG/transitionEnd/blob/master/src/transition-end.js
    var transitionSupport = (function (div) {
        var transitions = {
            'WebkitTransitionProperty': 'webkitTransitionEnd',
            'transitionProperty': 'transitionend'
        };

        for (var t in transitions) {
            if (transitions.hasOwnProperty(t)) {
                if (div.style[t] !== undefined) {
                    return { styleProp: t, eventName: transitions[t] };
                }
            }
        }

        return false;
    }(document.createElement('div')));

    // Drawer takes two arguments for consistency with the rest of UI components, but only uses "options" for now.
    // In the future it might use the "el" argument. Until that works, we're ignoring the argument but asking for
    // people to kindly call new Drawer() with document.body which should then seamlessly be forward-compatible.
    function Drawer(el, options) {
        if (!Common.isDOMElement(el)) {
            // One-argument form, for backwards compat.
            options = el;
        }
        Common.BaseUIComponent.apply(this, [document.body, options]);
    }

    // Expose for testing
    Drawer.transitionSupport = transitionSupport;

    Drawer._name = 'Drawer_1';

    Drawer._optionDefinition = {
        parentSelector:     ['String', '.ink-drawer'],
        leftDrawer:         ['String', '.left-drawer'],
        leftTrigger:        ['String', '.left-drawer-trigger'],
        rightDrawer:        ['String', '.right-drawer'],
        rightTrigger:       ['String', '.right-drawer-trigger'],
        contentDrawer:      ['String', '.content-drawer'],
        mode:               ['String', 'push'],
        sides:              ['String', 'both']
    };

    Drawer.prototype = {
        /**
         * Displays off-canvas content which can be triggered by clicking elements with the 'left-drawer-trigger' and 'right-drawer-trigger', respectively.
         * The left drawer has the 'left-drawer' class, and the right drawer has the 'right-drawer' class. The content drawer (EG your `<div id="main">`) must have the 'content-drawer' class. For more, see the example below, or try the sample.
         * @class Ink.UI.Drawer_1
         * @constructor
         *
         * @param {Object}      [options]                       Configuration options.
         * @xparam {String}     [options.parentSelector='.ink-drawer']       The class you are using in your wrapper (in the example below, it's the `body` tag.)
         * @xparam {String}     [options.leftDrawer='.left-drawer']          Selector for the left drawer element. This element is placed outside the screen and shown when you click the `leftTrigger` element.
         * @xparam {String}     [options.leftTrigger='.left-drawer-trigger'] Selector for the left drawer trigger(s). When you click this trigger, the `leftDrawer` is shown.
         * @xparam {String}     [options.rightDrawer='.right-drawer']        Right drawer selector. (see `options.leftDrawer`)
         * @xparam {String}     [options.rightTrigger='.right-drawer-trigger'] Right trigger selector (see `options.leftTrigger`)
         * @xparam {String}     [options.contentDrawer='.content-drawer']    Selector for the content drawer.
         * @param {String}      [options.mode='push']                        This can be 'push' or 'over'.
         * @param {String}      [options.sides='both']                       Can be 'left', 'right', or 'both'. Controls what sides have a drawer.
         *
         * @example
         * <body class="ink-drawer">
         *     <div class="left-drawer">
         *         Right drawer content...
         *     </div>
         *     <div class="right-drawer">
         *         Left drawer content...
         *     </div>
         *     <div id="main-content" class="content-drawer ink-grid">
         *         <a class="left-drawer-trigger" href="">Open left drawer</a>
         *         <a class="right-drawer-trigger" href="">Open right drawer</a>
         *         Content...
         *     </div>
         * </body>
         *
         * <script>
         *     Ink.requireModules(['Ink.UI.Drawer_1'], function (Drawer) {
         *         new Drawer();
         *     });
         * </script>
         */
        _init: function () {
            // make sure we have the required elements acording to the config options
            // TODO consider this._has{Left,Right} because of extensive checks for this._options.sides
            this._contentDrawers = Ink.ss(this._options.contentDrawer);

            this._leftDrawer = Ink.s(this._options.leftDrawer);
            this._leftTriggers = Ink.ss(this._options.leftTrigger);

            this._rightDrawer = Ink.s(this._options.rightDrawer);
            this._rightTriggers = Ink.ss(this._options.rightTrigger);

            // The body might not have it
            Css.addClassName(document.body, 'ink-drawer');

            if(this._contentDrawers.length === 0) {
                throw new Error('Ink.UI.Drawer_1: Could not find any "' +
                    this._options.contentDrawer + '" elements on this page. ' +
                    'Please make sure you have at least one.' );
            }

            switch (this._options.sides) {
                case 'both':
                    this._triggers =
                        this._options.leftTrigger + ', ' +
                        this._options.rightTrigger + ', ' +
                        this._options.contentDrawer;
                break;

                case 'left':
                    this._triggers =
                        this._options.leftTrigger + ', ' +
                        this._options.contentDrawer;
                break;

                case 'right':
                    this._triggers =
                        this._options.rightTrigger + ', ' +
                        this._options.contentDrawer;
                break;
            }

            var atLeastOneSide = false;
            var errorMsg = null;

            function validateSide(side) {
                if (side.drawer && side.triggers.length) {
                    atLeastOneSide = true;
                } else {
                    errorMsg = side.drawer ? elNotFound(side.drawerOption) : elNotFound(side.triggerOption);
                }
            }

            if (this._options.sides === 'left' || this._options.sides === 'both') {
                validateSide({
                    name: 'left',
                    drawer: this._leftDrawer,
                    drawerOption: this._options.leftDrawer,
                    triggers: this._leftTriggers,
                    triggerOption: this._options.leftTrigger
                });
            }

            if (this._options.sides === 'right' || this._options.sides === 'both') {
                validateSide({
                    name: 'right',
                    drawer: this._rightDrawer,
                    drawerOption: this._options.rightDrawer,
                    triggers: this._rightTriggers,
                    triggerOption: this._options.rightTrigger
                });
            }

            // Only if all sides requested are missing, warn.
            // Setting 'sides' to both and ommitting the left side (or elements for the left side)
            // shouldn't trigger a warning. So we set the error message above, and here we decide whether to show it or not by counting.
            if (!atLeastOneSide) {
                Ink.warn(errorMsg);
            }

            this._isOpen = false;
            this._direction = undefined;

            this._handlers = {
                click:     Ink.bindEvent(this._onClick, this),
                afterTransition: Ink.bindEvent(this._afterTransition, this)
            };
            this._addEvents();
        },

        /**
         * Click event handler.
         * Listens to the body's click event
         *
         * @method _onClick
         * @private
         **/
        _onClick: function(ev){
            var clickedTrigger =
                Element.findUpwardsBySelector(ev.currentTarget, this._options.leftTrigger) ? 'left' :
                Element.findUpwardsBySelector(ev.currentTarget, this._options.rightTrigger) ? 'right' : null;

            if (clickedTrigger) {
                this._onTriggerClicked(ev, clickedTrigger);
                return;
            }

            if (this._isOpen) {
                var clickedInContent = Element.findUpwardsBySelector(
                    ev.currentTarget, this._options.contentDrawer);

                var clickedInLink = Element.isLink(ev.target);

                if (clickedInContent || clickedInLink) {
                    this.close();
                }

                if (clickedInContent) {
                    ev.preventDefault();
                }
            }
        },

        _onTriggerClicked: function (ev, side) {
            // When clicking on the trigger, the corresponding side is toggled.
            if (this._isOpen) {
                this.close();
            } else {
                this.open(side);
            }
            ev.preventDefault();
        },

        _afterTransition: function(){
            if(!this._isOpen){
                Css.removeClassName(this._getRecentDrawer(), 'show');
            }
        },

        _addEvents: function(){
            Event.on(document.body, 'click', this._triggers + ', a[href*="#"]', this._handlers.click);
        },

        /**
         * Gets the drawer which was most recently opened.
         **/
        _getRecentDrawer: function () {
            return  this._direction === 'left'  ? this._leftDrawer :
                    this._direction === 'right' ? this._rightDrawer : null;
        },

        open: function(direction) {
            this._isOpen = true;
            this._direction = direction;

            var drawerEl = this._getRecentDrawer();

            Css.addClassName(drawerEl ,'show');

            // Add a timeout because a reflow must trigger for the transition to take place.
            // Setting the transform at the same time as the element has display:block won't do a transition.

            setTimeout(Ink.bind(function(){
                Css.addClassName(document.body, [this._options.mode, direction]);
            },this), 0);

            if (transitionSupport && this._transitionWillOccur(drawerEl)) {
                // Fix a renderer problem on IE11 and firefox by causing a reflow on the drawer element when our transition is done.
                // this problem was preventing the drawer from displaying at all when it was open.
                Event.one(drawerEl,
                    transitionSupport.eventName,
                    function () {
                        /* jshint unused:false */
                        Css.removeClassName(drawerEl, 'show');

                        // Let's cause a reflow by reading a value!
                        var uselessValue = +drawerEl.offsetWidth;

                        Css.addClassName(drawerEl, 'show');
                    });
            }

            var lastFocused = document.activeElement;
            var didFocus = focusFirstFocusableElementInside(drawerEl);

            pageWideFocusListener(Ink.bind(function (target) {
                var insideDrawer = Element.isAncestorOf(drawerEl, target);

                if (insideDrawer) { return; }

                this.close();
                _removePageWideFocusListener();

                if (didFocus && lastFocused) {
                    lastFocused.focus();
                }
            }, this));
        },

        /**
         * Given an element, return whether it is going to perform a transition.
         * This is not perfect, but since there is no transitionstart event, it will have to do.
         */
        _transitionWillOccur: function (elm) {
            return !!(transitionSupport && Css.getStyle(elm, transitionSupport.styleProp));
        },

        close: function() {
            if (this._isOpen === false) { return; }
            var drawerEl = this._getRecentDrawer();

            if (!drawerEl) { return; }

            _removePageWideFocusListener();

            this._isOpen = false;

            // Detect whether there is transition going on
            var transitioning = null;
            if (transitionSupport) {
                transitioning = this._transitionWillOccur(this._getRecentDrawer());
            }

            Css.removeClassName(document.body, [this._options.mode, this._direction]);

            if (transitioning) {
                Event.one(document.body, transitionSupport.eventName, this._handlers.afterTransition);
            } else {
                // End the transition now.
                this._handlers.afterTransition();
            }
        }
    };

    Common.createUIComponent(Drawer);

    return Drawer;
});

/**
 * Dropdown menus
 *
 * @module Ink.UI.Dropdown_1
 * Use this UI module to achieve a dropdown menu.
 *
 * @version 1
 */

Ink.createModule('Ink.UI.Dropdown', '1', ['Ink.UI.Common_1', 'Ink.UI.Toggle_1', 'Ink.Dom.Event_1', 'Ink.Dom.Element_1'], function(Common, Toggle, InkEvent, InkElement) {
    'use strict';

    function Dropdown() {
        Common.BaseUIComponent.apply(this, arguments);
    }

    Dropdown._name = 'Dropdown_1';

    Dropdown._optionDefinition = {
        'target':           ['Element', null],
        'hoverOpen':        ['Number', null],
        'dismissOnInsideClick': ['Boolean', false],
        'dismissOnOutsideClick': ['Boolean', true],
        'dismissAfter':     ['Number', null],
        'onInsideClick':    ['Function', null],
        'onOutsideClick':   ['Function', null],
        'onOpen':           ['Function', null],
        'onDismiss':        ['Function', null]
    };

    Dropdown.prototype = {
        /**
         * @class Ink.UI.Dropdown
         *
         * @constructor
         * @param {Element|String}   trigger                Trigger Element
         * @param {Object}           options                Options Object
         * @param {Element|String}  [options.target]        Target of the dropdown action. By default, dropdown will try to find an element with the `.dropdown-menu` class.
         * @param {Number}          [options.hoverOpen]     The number of seconds you need to hover with the mouse before the dropdown opens.
         * @param {Boolean}         [options.dismissOnInsideClick=false] Whether to dismiss the dropdown when there's a click inside.
         * @param {Boolean}         [options.dismissOnOutsideClick=true] Whether to dismiss the dropdown when there's a click outside.
         * @param {Number}          [options.dismissAfter]  When the mouse moves away from the dropdown, wait for `dismissAfter` seconds and only then dismiss.
         * @param {Function}        [options.onInsideClick] Called when there's a click inside the dropdown.
         * @param {Function}        [options.onOutsideClick] Called when there's a click outside the dropdown.
         * @param {Function}        [options.onOpen]        Called when the dropdown is opened.
         * @param {Function}        [options.onDismiss]     Called when the dropdown is dismissed.
         *
         * @sample Ink_UI_Dropdown_1.html
         */
        _init: function() {
            if (this._options.target === null) {
                this._options.target = Ink.s('.dropdown-menu', this._element);
                if (!this._options.target) {
                    throw new Error('Dropdown: You did not specify a "target" option, and cannot find an element with the .dropdown-menu class!');
                }
            }

            this._toggle = new Toggle(this._element, {
                target: this._options.target,
                closeOnInsideClick: null,
                closeOnClick: false,
                onChangeState: Ink.bind(function (newState) {
                    return this._openOrDismiss(newState, true, true);
                }, this)
            });

            // Event where we set this._dismissTimeout and clear this._openTimeout
            InkEvent.observeMulti([this._options.target, this._element],
                'mouseout', Ink.bindMethod(this, '_onMouseOut'));

            // Events to keep clearing this._dismissTimeout and set this._openTimeout
            InkEvent.observeMulti([this._options.target, this._element],
                'mouseover', Ink.bindMethod(this, '_onMouseOver'));

            // to call dismissOnInsideClick and onInsideClick
            InkEvent.observe(this._options.target, 'click', Ink.bindMethod(this, '_onInsideClick'));
            // to call dismissOnOutsideClick and onOutsideClick
            InkEvent.observe(document, 'click', Ink.bindMethod(this, '_onOutsideClick'));
        },

        /**
         * Called when the mouse is over the toggler, or the dropdown.
         *
         * Deals with "hoverOpen" by setting the dropdown to open later. Also cancels "dismissAfter".
         * @method _onMouseOver
         * @private
         **/
        _onMouseOver: function () {
            if (typeof this._options.hoverOpen === 'number' && this._toggle.getState() === false) {
                clearTimeout(this._openTimeout);
                this._openTimeout = setTimeout(
                    Ink.bindMethod(this, 'open', true),
                    this._options.hoverOpen * 1000);
            }
            if (typeof this._options.dismissAfter === 'number') {
                clearTimeout(this._dismissTimeout);
            }
        },

        /**
         * Called when the mouse leaves either the toggler, or the dropdown.
         *
         * Deals with "dismissAfter" by setting the dropdown to be dismissed later. Also cancels "hoverOpen".
         * @method _onMouseOut
         * @private
         **/
        _onMouseOut: function () {
            if (typeof this._options.dismissAfter === 'number' && this._toggle.getState() === true) {
                clearTimeout(this._dismissTimeout);
                this._dismissTimeout = setTimeout(
                    Ink.bindMethod(this, 'dismiss', true),
                    this._options.dismissAfter * 1000);
            }
            if (typeof this._options.hoverOpen === 'number') {
                clearTimeout(this._openTimeout);
            }
        },

        /**
         * Handle clicks on the dropdown.
         * @method _onInsideClick
         * @param {Event} event Dom click event.
         * @return {void}
         * @private
         */
        _onInsideClick: function (event) {
            var ret = this._handlerCall('onInsideClick', InkEvent.element(event));
            if (ret === false) { return; }
            if (this._options.dismissOnInsideClick) {
                this.dismiss(true);
            }
        },

        /**
         * Handle clicks outside the dropdown.
         * @method _onOutsideClick
         * @param {Event} event Dom click event.
         * @return {void}
         * @private
         */
        _onOutsideClick: function (event) {
            var target = InkEvent.element(event);
            var foundElem = InkElement.findUpwardsHaving(target, Ink.bind(function (needle) {
                return needle === this._element;
            }, this));
            var foundTarget = InkElement.findUpwardsHaving(target, Ink.bind(function (needle) {
                return needle === this._options.target;
            }, this));

            if (!foundElem && !foundTarget) {
                var ret = this._handlerCall('onOutsideClick', target);
                if (ret === false) { return; }
                if (this._options.dismissOnOutsideClick) {
                    this.dismiss(true);
                }
            }
        },

        /**
         * Closes the dropdown.
         *
         * @method dismiss
         * @param {Boolean} [callHandler=false] Whether to call the onDismiss handler
         * @return {void}
         * @public
         */
        dismiss: function (callHandler/*, _doNotInformToggle*/) {
            this._openOrDismiss(false, callHandler, arguments[1]);
        },

        /**
         * Opens the dropdown
         *
         * @method open
         * @param {Boolean} [callHandler=false] call onOpen handler
         * @return {void}
         * @public
         */
        open: function (callHandler/*, _doNotInformToggle*/) {
            this._openOrDismiss(true, callHandler, arguments[1]);
        },

        /**
         * DRY'ing up open() and dismiss()
         *
         * @method _openOrDismiss
         * @param {Boolean} [newState=false]    The new state of the Dropdown. `true` for open, `false` for dismiss.
         * @param {Boolean} [callHandler=false] Whether to call the onOpen or onDismiss handler.
         * @param {Boolean} [_doNotInformToggle=false] Whether to call our toggle's setState method.
         * @return {void}
         * @private
         */
        _openOrDismiss: function (newState, callHandler, _doNotInformToggle) {
            if (this._toggle && this._toggle.getState() === newState) { return; }
            if (callHandler) {
                if (this._handlerCall(newState ? 'onOpen' : 'onDismiss') === false) {
                    return false;  // canceled by event handler
                }
            }
            if (!_doNotInformToggle) {
                this._toggle.setState(newState);
            }
            clearTimeout(this._dismissTimeout);
            clearTimeout(this._openTimeout);
        },

        /**
         * call a method given by the user through the options
         *
         * @method _handlerCall
         * @param {String} handler  The handler name in this._options
         * @param {Mixed} [args...] Arguments to pass to function
         */
        _handlerCall: function (handler/*, ... */) {
            if (this._options[handler]) {
                return this._options[handler].call(this, [].slice.call(arguments, 1));
            }
        }
    };

    Common.createUIComponent(Dropdown);

    return Dropdown;
});

/**
 * Drop elements around
 * @module Ink.UI.Droppable_1
 * @version 1
 */

Ink.createModule("Ink.UI.Droppable","1",["Ink.Dom.Element_1", "Ink.Dom.Event_1", "Ink.Dom.Css_1", "Ink.UI.Common_1", "Ink.Util.Array_1", "Ink.Dom.Selector_1"], function( InkElement, InkEvent, Css, Common, InkArray, Selector) {
    'use strict';

    // Higher order functions
    var hAddClassName = function (element) {
        return function (className) {return Css.addClassName(element, className);};
    };
    var hRemoveClassName = function (element) {
        return function (className) {return Css.removeClassName(element, className);};
    };

    /**
     * @namespace Ink.UI.Droppable
     * @version 1
     * @static
     */
    var Droppable = {
        /**
         * Flag to activate debug mode
         *
         * @property debug
         * @type {Boolean}
         * @private
         */
        debug: false,

        /**
         * Array with the data of each element (`{element: ..., data: ..., options: ...}`)
         * 
         * @property _droppables
         * @type {Array}
         * @private
         */
        _droppables: [],

        /**
         * Array of data for each draggable. (`{element: ..., data: ...}`)
         *
         * @property _draggables
         * @type {Array}
         * @private
         */
        _draggables: [],

        /**
         * Makes an element droppable.
         * This method adds it to the stack of droppable elements.
         * Can consider it a constructor of droppable elements, but where no Droppable object is returned.
         *
         * The onHover, onDrop, and onDropOut options below can be:
         *
         * - 'move', 'copy': Move or copy the draggable element into this droppable.
         * - 'revert': Make the draggable go back to where it came from.
         * - A function (draggableElement, droppableElement), defining what you want to do in this case.
         *
         * @method add
         * @param {String|Element}      element                 Target element
         * @param {Object}              [options]               Options object
         * @param {String}              [options.hoverClass]    Classname(s) applied when an acceptable draggable element is hovering the element
         * @param {String}              [options.accept]        Selector for choosing draggables which can be dropped in this droppable.
         * @param {Function}            [options.onHover]       Called when an acceptable element is hovering the droppable (see above for string options).
         * @param {Function|String}     [options.onDrop]        Called when an acceptable element is dropped (see above for string options). 
         * @param {Function|String}     [options.onDropOut]     Called when a droppable is dropped outside this droppable (see above for string options).
         * @return {void}
         * @public
         *
         * @sample Ink_UI_Droppable_1.html
         *
         */
        add: function(element, options) {
            element = Common.elOrSelector(element, 'Droppable.add target element');

            var opt = Ink.extendObj({
                hoverClass:     options.hoverclass /* old name */ || false,
                accept:         false,
                onHover:        false,
                onDrop:         false,
                onDropOut:      false
            }, options || {}, InkElement.data(element));
            
            if (typeof opt.hoverClass === 'string') {
                opt.hoverClass = opt.hoverClass.split(/\s+/);
            }
            
            function cleanStyle(draggable) {
                draggable.style.position = 'inherit';
            }
            var that = this;
            var namedEventHandlers = {
                move: function (draggable, droppable/*, event*/) {
                    cleanStyle(draggable);
                    droppable.appendChild(draggable);
                },
                copy: function (draggable, droppable/*, event*/) {
                    cleanStyle(draggable);
                    droppable.appendChild(draggable.cloneNode(true));
                },
                revert: function (draggable/*, droppable, event*/) {
                    that._findDraggable(draggable).originalParent.appendChild(draggable);
                    cleanStyle(draggable);
                }
            };
            var name;

            if (typeof opt.onHover === 'string') {
                name = opt.onHover;
                opt.onHover = namedEventHandlers[name];
                if (opt.onHover === undefined) {
                    throw new Error('Unknown hover event handler: ' + name);
                }
            }
            if (typeof opt.onDrop === 'string') {
                name = opt.onDrop;
                opt.onDrop = namedEventHandlers[name];
                if (opt.onDrop === undefined) {
                    throw new Error('Unknown drop event handler: ' + name);
                }
            }
            if (typeof opt.onDropOut === 'string') {
                name = opt.onDropOut;
                opt.onDropOut = namedEventHandlers[name];
                if (opt.onDropOut === undefined) {
                    throw new Error('Unknown dropOut event handler: ' + name);
                }
            }

            var elementData = {
                element: element,
                data: {},
                options: opt
            };
            this._droppables.push(elementData);
            this._update(elementData);
        },
        
        /**
         * Finds droppable data about `element`. this data is added in `.add`
         *
         * @method _findData
         * @param {Element} element  Needle
         * @return {object}             Droppable data of the element
         * @private
         */
        _findData: function (element) {
            var elms = this._droppables;
            for (var i = 0, len = elms.length; i < len; i++) {
                if (elms[i].element === element) {
                    return elms[i];
                }
            }
        },
        /**
         * Finds draggable data about `element`
         *
         * @method _findDraggable
         * @param {Element} element  Needle
         * @return {Object}             Draggable data queried
         * @private
         */
        _findDraggable: function (element) {
            var elms = this._draggables;
            for (var i = 0, len = elms.length; i < len; i++) {
                if (elms[i].element === element) {
                    return elms[i];
                }
            }
        },

        /**
         * Invoke every time a drag starts. Calls Droppable._update on all Droppables.
         * 
         * @method updateAll
         * @return {void}
         * @private
         */
        updateAll: function() {
            InkArray.each(this._droppables, Droppable._update);
        },

        /**
         * Updates location and size of droppable element
         * 
         * @method update
         * @param {String|Element} element Target element
         * @return {void}
         * @public
         */
        update: function(element) {
            this._update(this._findData(element));
        },

        _update: function(elementData) {
            var data = elementData.data;
            var element = elementData.element;
            data.left   = InkElement.offsetLeft(element);
            data.top    = InkElement.offsetTop( element);
            data.right  = data.left + InkElement.elementWidth( element);
            data.bottom = data.top  + InkElement.elementHeight(element);
        },

        /**
         * Removes an element from the droppable stack and removes the droppable behavior
         * 
         * @method remove
         * @param {String|Element} el Droppable element to disable.
         * @return {Boolean} Whether the object was found and deleted
         * @public
         */
        remove: function(el) {
            el = Common.elOrSelector(el);
            var len = this._droppables.length;
            for (var i = 0; i < len; i++) {
                if (this._droppables[i].element === el) {
                    this._droppables.splice(i, 1);
                    break;
                }
            }
            return len !== this._droppables.length;
        },

        /**
         * Executes an action on a droppable
         * 
         * @method action
         * @param {Object} coords       Coordinates where the action happened
         * @param {String} type         Type of action. 'drag' or 'drop'.
         * @param {Object} ev           Event object
         * @param {Object} draggable    Draggable element
         * @return {void}
         * @private
         */
        action: function(coords, type, ev, draggable) {
            // check all droppable elements
            InkArray.each(this._droppables, Ink.bind(function(elementData) {
                var data = elementData.data;
                var opt = elementData.options;
                var element = elementData.element;

                if (opt.accept && !Selector.matches(opt.accept, [draggable]).length) {
                    return;
                }

                if (type === 'drag' && !this._findDraggable(draggable)) {
                    this._draggables.push({
                        element: draggable,
                        originalParent: draggable.parentNode
                    });
                }

                // check if our draggable is over our droppable
                if (coords.x >= data.left && coords.x <= data.right &&
                        coords.y >= data.top && coords.y <= data.bottom) {
                    // INSIDE
                    if (type === 'drag') {
                        if (opt.hoverClass) {
                            InkArray.each(opt.hoverClass,
                                hAddClassName(element));
                        }
                        if (opt.onHover) {
                            opt.onHover(draggable, element);
                        }
                    } else if (type === 'drop') {
                        if (opt.hoverClass) {
                            InkArray.each(opt.hoverClass,
                                hRemoveClassName(element));
                        }
                        if (opt.onDrop) {
                            opt.onDrop(draggable, element, ev);
                        }
                    }
                } else {
                    // OUTSIDE

                    if (type === 'drag' && opt.hoverClass) {
                        InkArray.each(opt.hoverClass, hRemoveClassName(element));
                    } else if (type === 'drop') {
                        if(opt.onDropOut){
                            opt.onDropOut(draggable, element, ev);
                        }
                    }
                }
            }, this));
        }
    };

    return Droppable;
});

/**
 * Form Validation
 * @module Ink.UI.FormValidator_1
 * @version 1
 **/

Ink.createModule('Ink.UI.FormValidator', '1', ['Ink.Dom.Element_1', 'Ink.Dom.Css_1','Ink.Util.Validator_1','Ink.Dom.Selector_1'], function( InkElement, Css, InkValidator , Selector) {
    'use strict';

    function elementsWithSameName(elm) {
        if (!elm.name) { return []; }
        if (!elm.form) {
            return Selector.select('[name="' + elm.name + '"]');
        }
        var ret = elm.form[elm.name];
        if (!ret) {  // We're in IE7
            return (function () {
                var ret = [];
                var everything = Ink.ss('*', elm.form);
                for (var i = 0; i < everything.length; i++) {
                    if (everything[i].name === elm.name) { ret.push(everything[i]); }
                }
                return ret;
            }());
        }
        if(typeof(ret.length) === 'undefined') {
            ret = [ret];
        }
        return ret;
    }
    /**
     * @namespace Ink.UI.FormValidator
     * @version 1
     */
    var FormValidator = {

        /**
         * Specifies the version of the component
         *
         * @property version
         * @type {String}
         * @readOnly
         * @public
         */
        version: '1',

        /**
         * Available flags to use in the validation process.
         * The keys are the 'rules', and their values are objects with the key 'msg', determining
         * what is the error message.
         *
         * @property _flagMap
         * @type {Object}
         * @readOnly
         * @private
         */
        _flagMap: {
            //'ink-fv-required': {msg: 'Campo obrigat&oacute;rio'},
            'ink-fv-required': {msg: 'Required field'},
            //'ink-fv-email': {msg: 'E-mail inv&aacute;lido'},
            'ink-fv-email': {msg: 'Invalid e-mail address'},
            //'ink-fv-url': {msg: 'URL inv&aacute;lido'},
            'ink-fv-url': {msg: 'Invalid URL'},
            //'ink-fv-number': {msg: 'N&uacute;mero inv&aacute;lido'},
            'ink-fv-number': {msg: 'Invalid number'},
            //'ink-fv-phone_pt': {msg: 'N&uacute;mero de telefone inv&aacute;lido'},
            'ink-fv-phone_pt': {msg: 'Invalid phone number'},
            //'ink-fv-phone_cv': {msg: 'N&uacute;mero de telefone inv&aacute;lido'},
            'ink-fv-phone_cv': {msg: 'Invalid phone number'},
            //'ink-fv-phone_mz': {msg: 'N&uacute;mero de telefone inv&aacute;lido'},
            'ink-fv-phone_mz': {msg: 'Invalid phone number'},
            //'ink-fv-phone_ao': {msg: 'N&uacute;mero de telefone inv&aacute;lido'},
            'ink-fv-phone_ao': {msg: 'Invalid phone number'},
            //'ink-fv-date': {msg: 'Data inv&aacute;lida'},
            'ink-fv-date': {msg: 'Invalid date'},
            //'ink-fv-confirm': {msg: 'Confirma&ccedil;&atilde;o inv&aacute;lida'},
            'ink-fv-confirm': {msg: 'Confirmation does not match'},
            'ink-fv-custom': {msg: ''}
        },

        /**
         * This property holds all form elements for later validation
         *
         * @property elements
         * @type {Object}
         * @public
         */
        elements: {},

        /**
         * This property holds the objects needed to cross-check for the 'confirm' rule
         *
         * @property confirmElms
         * @type {Object}
         * @public
         */
        confirmElms: {},

        /**
         * This property holds the previous elements in the confirmElms property, but with a
         * true/false specifying if it has the class ink-fv-confirm.
         *
         * @property hasConfirm
         * @type {Object}
         */
        hasConfirm: {},

        /**
         * Defined class name to use in error messages label
         *
         * @property _errorClassName
         * @type {String}
         * @readOnly
         * @private
         */
        _errorClassName: 'tip error',

        /**
         * @property _errorValidationClassName
         * @type {String}
         * @readOnly
         * @private
         */
        _errorValidationClassName: 'validaton',

        /**
         * @property _errorTypeWarningClassName
         * @type {String}
         * @readOnly
         * @private
         */
        _errorTypeWarningClassName: 'warning',

        /**
         * @property _errorTypeErrorClassName
         * @type {String}
         * @readOnly
         * @private
         */
        _errorTypeErrorClassName: 'error',

        /**
         * Checks if a form is valid
         * 
         * @method validate
         * @param {Element|String} elm                     DOM form element or form id
         * @param {Object}         [options]               Configuration options
         * @param {Function}       [options.onSuccess]     Callback to run when form is valid
         * @param {Function}       [options.onError]       Callback to run when form is not valid
         * @param {Array}          [options.customFlag]    Custom flags to use to validate form fields
         * @param {Array}          [options.confirmGroup]
         * @public
         * @return {Boolean} Whether the form is deemed valid or not.
         *
         * @sample Ink_UI_FormValidator_1.html
         */
        validate: function(elm, options) {
            this._free();

            options = Ink.extendObj({
                onSuccess: false,
                onError: false,
                customFlag: false,
                confirmGroup: []
            }, options || {});

            if(typeof(elm) === 'string') {
                elm = document.getElementById(elm);
            }
            if(elm === null){
                return false;
            }
            this.element = elm;

            if(typeof(this.element.id) === 'undefined' || this.element.id === null || this.element.id === '') {
                // generate a random ID
                // TODO ugly and potentially problematic, and you know Murphy's law.
                this.element.id = 'ink-fv_randomid_'+(Math.round(Math.random() * 99999));
            }

            this.custom = options.customFlag;

            this.confirmGroup = options.confirmGroup;

            var fail = this._validateElements();

            if(fail.length > 0) {
                if(options.onError) {
                    options.onError(fail);
                } else {
                    this._showError(elm, fail);
                }
                return false;
            } else {
                if(!options.onError) {
                    this._clearError(elm);
                }
                this._clearCache();
                if(options.onSuccess) {
                    options.onSuccess();
                }
                return true;
            }

        },

        /**
         * Resets previously generated validation errors
         * 
         * @method reset
         * @returns {void}
         * @public
         */
        reset: function()
        {
            this._clearError();
            this._clearCache();
        },

        /**
         * Cleans the object
         * 
         * @method _free
         * @returns {void}
         * @private
         */
        _free: function()
        {
            this.element = null;
            //this.elements = [];
            this.custom = false;
            this.confirmGroup = false;
        },

        /**
         * Cleans the properties responsible for caching
         * 
         * @method _clearCache
         * @returns {void}
         * @private
         */
        _clearCache: function()
        {
            this.element = null;
            this.elements = [];
            this.custom = false;
            this.confirmGroup = false;
        },

        /**
         * Gets the form elements and stores them in the caching properties
         * 
         * @method _getElements
         * @returns {void}
         * @private
         */
        _getElements: function()
        {
            //this.elements = [];
            // if(typeof(this.elements[this.element.id]) !== 'undefined') {
            //     return;
            // }

            var elements = this.elements[this.element.id] = [];
            this.confirmElms[this.element.id] = [];
            //console.log(this.element);
            //console.log(this.element.elements);
            var formElms = Selector.select(':input', this.element);
            var curElm = false;
            for(var i=0, totalElm = formElms.length; i < totalElm; i++) {
                curElm = formElms[i];
                var type = (curElm.getAttribute('type') + '').toLowerCase();

                if (type === 'radio' || type === 'checkbox') {
                    if(elements.length === 0 ||
                            (
                             curElm.getAttribute('type') !== elements[elements.length - 1].getAttribute('type') &&
                            curElm.getAttribute('name') !== elements[elements.length - 1].getAttribute('name')
                            )) {
                        for(var flag in this._flagMap) {
                            if(Css.hasClassName(curElm, flag)) {
                                elements.push(curElm);
                                break;
                            }
                        }
                    }
                } else {
                    for(var flag2 in this._flagMap) {
                        if(Css.hasClassName(curElm, flag2) && flag2 !== 'ink-fv-confirm') {
                            /*if(flag2 == 'ink-fv-confirm') {
                                this.confirmElms[this.element.id].push(curElm);
                                this.hasConfirm[this.element.id] = true;
                            }*/
                            elements.push(curElm);
                            break;
                        }
                    }

                    if(Css.hasClassName(curElm, 'ink-fv-confirm')) {
                        this.confirmElms[this.element.id].push(curElm);
                        this.hasConfirm[this.element.id] = true;
                    }

                }
            }
        },

        /**
         * Runs the validation for each element
         * 
         * @method _validateElements
         * @return {Object} Error description objects, in the format: { "elm": inputWithError, "errors": [ (from _flagMap): { "msg": "please input ...' }, ...] }
         * @private
         */
        _validateElements: function() {
            var oGroups;
            this._getElements();
            if(this.hasConfirm[this.element.id] === true) {
                oGroups = this._makeConfirmGroups();
            }

            var errors = [];

            var curElm = false;
            var customErrors = false;
            var inArray;
            for(var i=0, totalElm = this.elements[this.element.id].length; i < totalElm; i++) {
                inArray = false;
                curElm = this.elements[this.element.id][i];

                if(!curElm.disabled) {
                    for(var flag in this._flagMap) {
                        if(Css.hasClassName(curElm, flag)) {
                            if(flag !== 'ink-fv-custom' && flag !== 'ink-fv-confirm') {
                                if(!this._isValid(curElm, flag)) {
                                    if(!inArray) {
                                        errors.push({elm: curElm, errors:[flag]});
                                        inArray = true;
                                    } else {
                                        errors[(errors.length - 1)].errors.push(flag);
                                    }
                                }
                            } else if(flag !== 'ink-fv-confirm'){
                                customErrors = this._isCustomValid(curElm);
                                if(customErrors.length > 0) {
                                    errors.push({elm: curElm, errors:[flag], custom: customErrors});
                                }
                            } else if(flag === 'ink-fv-confirm'){
                                continue;
                            }
                        }
                    }
                }
            }
            errors = this._validateConfirmGroups(oGroups, errors);
            //console.log(InkDumper.returnDump(errors));
            return errors;
        },

        /**
         * Runs the 'confirm' validation for each group of elements
         * 
         * @method _validateConfirmGroups
         * @param {Array} oGroups Array/Object that contains the group of confirm objects
         * @param {Array} errors Array that will store the errors
         * @private
         * @return {Array} Array of errors that was passed as 2nd parameter (either changed, or not, depending if errors were found).
         */
        _validateConfirmGroups: function(oGroups, errors) {
            //console.log(oGroups);
            var curGroup = false;
            for(var i in oGroups) if (oGroups.hasOwnProperty(i)) {
                curGroup = oGroups[i];
                if(curGroup.length === 2) {
                    if(curGroup[0].value !== curGroup[1].value) {
                        errors.push({elm:curGroup[1], errors:['ink-fv-confirm']});
                    }
                }
            }
            return errors;
        },

        /**
         * Creates the groups of 'confirm' objects
         * 
         * @method _makeConfirmGroups
         * @private
         * @return {Array|Boolean} Returns the array of confirm elements or false on error.
         */
        _makeConfirmGroups: function()
        {
            var oGroups;
            if(this.confirmGroup && this.confirmGroup.length > 0) {
                oGroups = {};
                var curElm = false;
                var curGroup = false;
                //this.confirmElms[this.element.id];
                for(var i=0, total=this.confirmElms[this.element.id].length; i < total; i++) {
                    curElm = this.confirmElms[this.element.id][i];
                    for(var j=0, totalG=this.confirmGroup.length; j < totalG; j++) {
                        curGroup =  this.confirmGroup[j];
                        if(Css.hasClassName(curElm, curGroup)) {
                            if(typeof(oGroups[curGroup]) === 'undefined') {
                                oGroups[curGroup] = [curElm];
                            } else {
                                oGroups[curGroup].push(curElm);
                            }
                        }
                    }
                }
                return oGroups;
            } else {
                if(this.confirmElms[this.element.id].length === 2) {
                    oGroups = {
                        "ink-fv-confirm": [
                            this.confirmElms[this.element.id][0],
                            this.confirmElms[this.element.id][1]
                        ]
                    };
                }
                return oGroups;
            }
            return false;
        },

        /**
         * Validates an element with a custom validation
         * 
         * @method _isCustomValid
         * @param {DOMElemenmt} elm Element to be validated
         * @private
         * @return {Array} Array of errors. If no errors are found, results in an empty array.
         */
        _isCustomValid: function(elm)
        {
            var customErrors = [];
            var curFlag = false;
            for(var i=0, tCustom = this.custom.length; i < tCustom; i++) {
                curFlag = this.custom[i];
                if(Css.hasClassName(elm, curFlag.flag)) {
                    if(!curFlag.callback(elm, curFlag.msg)) {
                        customErrors.push({flag: curFlag.flag, msg: curFlag.msg});
                    }
                }
            }
            return customErrors;
        },

        /**
         * Runs the normal validation functions for a specific element
         * 
         * @method _isValid
         * @param {Element} elm Element that will be validated
         * @param {String} fieldType Rule to be validated. This must be one of the keys present in the _flagMap property.
         * @private
         * @return {Boolean} The result of the validation.
         */
        _isValid: function(elm, fieldType) {
            var nodeName = elm.nodeName.toLowerCase();
            var inputType = (elm.getAttribute('type') || '').toLowerCase();
            var value = this._trim(elm.value);

            // When we're analyzing emails, telephones, etc, and the field is
            // empty, we check if it is required. If not required, it's valid.
            if (fieldType !== 'ink-fv-required' &&
                    inputType !== 'checkbox' && inputType !== 'radio' &&
                    value === '') {
                return !Css.hasClassName(elm, 'ink-fv-required');
            }

            switch(fieldType) {
                case 'ink-fv-required':
                    if(nodeName === 'select') {
                        if(elm.selectedIndex > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                    if(inputType !== 'checkbox' && inputType !== 'radio') {
                        // A input type=text,email,etc.
                        return value !== '';
                    } else if(inputType === 'checkbox' || inputType === 'radio') {
                        var aFormRadios = elementsWithSameName(elm);
                        // check if any input of the radio is checked
                        for(var i=0, totalRadio = aFormRadios.length; i < totalRadio; i++) {
                            if(aFormRadios[i].checked === true) {
                                return true;
                            }
                        }
                        return false;
                    }
                    return false;

                case 'ink-fv-email':
                    return InkValidator.mail(elm.value);

                case 'ink-fv-url':
                    return InkValidator.url(elm.value);

                case 'ink-fv-number':
                    return !isNaN(Number(elm.value)) && isFinite(Number(elm.value));

                case 'ink-fv-phone_pt':
                    return InkValidator.isPTPhone(elm.value);

                case 'ink-fv-phone_cv':
                    return InkValidator.isCVPhone(elm.value);

                case 'ink-fv-phone_ao':
                    return InkValidator.isAOPhone(elm.value);

                case 'ink-fv-phone_mz':
                    return InkValidator.isMZPhone(elm.value);

                case 'ink-fv-date':
                    var Element = Ink.getModule('Ink.Dom.Element',1);
                    var dataset = Element.data( elm );
                    var validFormat = 'yyyy-mm-dd';

                    if( Css.hasClassName(elm, 'ink-datepicker') && ('format' in dataset) ){
                        validFormat = dataset.format;
                    } else if( ('validFormat' in dataset) ){
                        validFormat = dataset.validFormat;
                    }

                    if( !(validFormat in InkValidator._dateParsers ) ){
                        var validValues = [];
                        for( var val in InkValidator._dateParsers ){
                            if (InkValidator._dateParsers.hasOwnProperty(val)) {
                                validValues.push(val);
                            }
                        }
                        throw new Error(
                            'The attribute data-valid-format must be one of ' +
                            'the following values: ' + validValues.join(', '));
                    }

                    return InkValidator.isDate( validFormat, elm.value );
                case 'ink-fv-custom':
                    break;
            }

            return false;
        },

        /**
         * Makes the necessary changes to the markup to show the errors of a given element
         * 
         * @method _showError
         * @param {Element} formElm The form element to be changed to show the errors
         * @param {Array} aFail An array with the errors found.
         * @return {void}
         * @private
         */
        _showError: function(formElm, aFail) {
            this._clearError(formElm);

            //ink-warning-field

            //console.log(aFail);
            var curElm = false;
            for(var i=0, tFail = aFail.length; i < tFail; i++) {
                curElm = aFail[i].elm;
                if (curElm) {
                    this._showAnErrorOnElement(curElm, aFail[i]);
                }
            }
        },

        _showAnErrorOnElement: function (curElm, error) {
            /* jshint noempty:false */

            var controlGroupElm = InkElement.findUpwardsByClass(
                    curElm, 'control-group');
            var controlElm = InkElement.findUpwardsByClass(
                    curElm, 'control');

            var errorClasses = [
                this._errorClassName,
                this._errorTypeClassName].join(' ');

            var errorMsg = InkElement.create('p', {
                className: errorClasses
            });

            if(error.errors[0] !== 'ink-fv-custom') {
                errorMsg.innerHTML = this._flagMap[error.errors[0]].msg;
            } else {
                errorMsg.innerHTML = error.custom[0].msg;
            }

            var target = (controlElm || controlGroupElm);
            if (target) {
                target.appendChild(errorMsg);
            } else {
                InkElement.insertAfter(errorMsg, curElm);
            }

            if (controlElm) {
                if(error.errors[0] === 'ink-fv-required') {
                    Css.addClassName(controlGroupElm, 'validation error');
                } else {
                    Css.addClassName(controlGroupElm, 'validation warning');
                }
            }
        },

        /**
         * Clears the error of a given element. Normally executed before any validation, for all elements, as a reset.
         * 
         * @method _clearErrors
         * @param {Element} formElm Form element to be cleared.
         * @return {void}
         * @private
         */
        _clearError: function(formElm) {
            //return;
            var aErrorLabel = formElm.getElementsByTagName('p');

            var curElm;
            var control;

            for(var i = (aErrorLabel.length - 1); i >= 0; i--) {
                curElm = aErrorLabel[i];
                if(Css.hasClassName(curElm, this._errorClassName)) {
                    control = InkElement.findUpwardsBySelector(curElm, '.control-group');
                    if (control) {
                        Css.removeClassName(control, ['validation', 'error', 'warning']);
                    }

                    if(Css.hasClassName(curElm, this._errorClassName, true /*both*/)) {
                        InkElement.remove(curElm);
                    }
                }
            }

            var aErrorLabel2 = formElm.getElementsByTagName('ul');
            for(i = (aErrorLabel2.length - 1); i >= 0; i--) {
                curElm = aErrorLabel2[i];
                if(Css.hasClassName(curElm, 'control-group')) {
                    Css.removeClassName(curElm, 'validation error');
                }
            }
        },

        /**
         * Removes unnecessary spaces to the left or right of a string
         * 
         * @method _trim
         * @param {String} str String to be trimmed
         * @private
         * @return {String|undefined} String trimmed.
         */
        _trim: function(str)
        {
            if(typeof(str) === 'string')
            {
                return str.replace(/^\s+|\s+$|\n+$/g, '');
            }
        }
    };

    return FormValidator;

});
/**
 * Form Validation
 * @module Ink.UI.FormValidator_2
 * @version 2
 */

Ink.createModule('Ink.UI.FormValidator', '2', [ 'Ink.UI.Common_1','Ink.Dom.Element_1','Ink.Dom.Event_1','Ink.Dom.Selector_1','Ink.Dom.Css_1','Ink.Util.Array_1','Ink.Util.I18n_1','Ink.Util.Validator_1'], function( Common, Element, Event, Selector, Css, InkArray, I18n, InkValidator ) {
    'use strict';

    function getValue(element) {
        // TODO this is already implemented in FormSerialize.
        switch(element.nodeName.toLowerCase()){
            case 'select':
                var checkedOpt = Ink.s('option:checked', element);
                if (checkedOpt) { return checkedOpt.value; }
                return '';
            case 'textarea':
                return element.value;
            case 'input':
                if( "type" in element ){
                    if( (element.type === 'radio') || (element.type === 'checkbox') ){
                        if( element.checked ){
                            return element.value;
                        }
                    } else if( element.type !== 'file' ){
                        return element.value;
                    }
                } else {
                    return element.value;
                }
                return;
            default:
                return element.innerHTML;
        }
    }

    /**
     * Validation Functions used in the rules (data-rules) option to FormValidator_2.
     *
     * This option is a string with a special syntax: `function_name|function2_name|...`. Optionally you can pass parameters to these methods using square brackets (`[]`)
     *
     * For instance:
     *
     *     data-rules="required|numeric[.,2]|max_length[8]"
     *
     * Meaning:
     * - Required field;
     * - Number in which the decimal separator is a dot (.) and has at most 2 decimal places;
     * - Field with at most 8 characters;
     *
     * @class FormValidator.validationFunctions
     * @static
     */
    var validationFunctions = {
        /**
         * Checks if a value is defined and not empty
         * @method required
         * @return {Boolean}       True case is defined, false if it's empty or not defined.
         * @public
         */
        'required': function( value ){
            return ( (typeof value !== 'undefined') && ( !(/^\s*$/).test(value) ) );
        },

        /**
         * Checks if a value has a minimum length
         *
         * @method min_length
         * @param  {String|Number}  minSize Minimum number of characters.
         * @return {Boolean}                True if the length of value is equal or bigger than the minimum chars defined. False if not.
         */
        'min_length': function( value, minSize ){
            return ( (typeof value === 'string') && ( value.length >= parseInt(minSize,10) ) );
        },

        /**
         * Checks if a value has a maximum length
         *
         * @method max_length
         * @param  {String|Number}  maxSize Maximum number of characters.
         * @return {Boolean}         True if the length of value is equal or smaller than the maximum chars defined. False if not.
         */
        'max_length': function( value, maxSize ){
            return ( (typeof value === 'string') && ( value.length <= parseInt(maxSize,10) ) );
        },

        /**
         * Checks if a value has an exact length
         *
         * @method exact_length
         * @param  {String|Number}  exactSize   Exact number of characters.
         * @return {Boolean}                    True if the length of value is equal to the size defined. False if not.
         */
        'exact_length': function( value, exactSize ){
            return ( (typeof value === 'string') && ( value.length === parseInt(exactSize,10) ) );
        },

        /**
         * Checks if a value is a valid email address
         *
         * @method email
         * @return {Boolean}         True if the value is a valid email address. False if not.
         */
        'email': function( value ){
            return ( ( typeof value === 'string' ) && InkValidator.mail( value ) );
        },

        /**
         * Checks if a value has a valid URL
         *
         * @method url
         * @param  {Boolean} fullCheck  Flag to validate a full url (with the protocol).
         * @return {Boolean}            True if the URL is considered valid. False if not.
         */
        'url': function( value, fullCheck ){
            fullCheck = fullCheck || false;
            return ( (typeof value === 'string') && InkValidator.url( value, fullCheck ) );
        },

        /**
         * Checks if a value is a valid IP. Supports ipv4 and ipv6
         *
         * @method ip
         * @param  {String} ipType Type of IP to be validated. The values are: ipv4, ipv6. By default is ipv4.
         * @return {Boolean}         True if the value is a valid IP address. False if not.
         */
        'ip': function( value, ipType ){
            if( typeof value !== 'string' ){
                return false;
            }

            return InkValidator.isIP(value, ipType);
        },

        /**
         * Checks if a value is a valid phone number.
         * Supports several countries, based in the Ink.Util.Validator class.
         *
         * @method phone
         * @param  {String} phoneType Country's initials to specify the type of phone number to be validated. Ex: 'AO'.
         * @return {Boolean}         True if it's a valid phone number. False if not.
         */
        'phone': function( value, phoneType ){
            if( typeof value !== 'string' ){
                return false;
            }

            var countryCode = phoneType ? phoneType.toUpperCase() : '';

            return InkValidator['is' + countryCode + 'Phone'](value);
        },

        /**
         * Checks if a value is a valid credit card.
         *
         * @method credit_card
         * @param  {String} cardType Type of credit card to be validated. The card types available are in the Ink.Util.Validator class.
         * @return {Boolean}         True if the value is a valid credit card number. False if not.
         */
        'credit_card': function( value, cardType ){
            if( typeof value !== 'string' ){
                return false;
            }

            return InkValidator.isCreditCard( value, cardType || 'default' );
        },

        /**
         * Checks if a value is a valid date.
         *
         * @method date
         * @param  {String} format Specific format of the date.
         * @return {Boolean}         True if the value is a valid date. False if not.
         */
        'date': function( value, format ){
            return ( (typeof value === 'string' ) && InkValidator.isDate(format, value) );
        },

        /**
         * Checks if a value only contains alphabetical values.
         *
         * @method alpha
         * @param  {Boolean} supportSpaces  Allow whitespace
         * @return {Boolean}                True if the value is alphabetical-only. False if not.
         */
        'alpha': function( value, supportSpaces ){
            return InkValidator.ascii(value, {singleLineWhitespace: supportSpaces});
        },

        /*
         * Checks if a value contains only printable BMP unicode characters
         * Optionally allow punctuation and whitespace
         *
         * @method text
         * @param  {Boolean} [whitespace=false] Allow whitespace
         * @param  {Boolean} [punctuation=false] Allow punctuation
         * @return {Boolean}        Whether the value only contains printable text characters
         **/
        'text': function (value, whitespace, punctuation) {
            return InkValidator.unicode(value, {
                singleLineWhitespace: whitespace,
                numbers: true,
                unicodePunctuation: punctuation });
        },

        /*
         * Checks if a value contains only printable latin-1 text characters.
         * Optionally allow punctuation and whitespace.
         *
         * @method text
         * @param  {Boolean} [whitespace=false] Allow whitespace
         * @param  {Boolean} [punctuation=false] Allow punctuation
         * @return {Boolean}        Whether the value only contains printable text characters
         **/
        'latin': function (value, punctuation, whitespace) {
            if ( typeof value !== 'string') { return false; }
            return InkValidator.latin1(value, {
                latin1Punctuation: punctuation,
                singleLineWhitespace: whitespace,
                numbers: true });
        },

        /**
         * Checks if a value contains only alphabetical or numerical characters.
         *
         * @method alpha_numeric
         * @return {Boolean}         True if the value is a valid alphanumerical. False if not.
         */
        'alpha_numeric': function( value ){
            return InkValidator.ascii(value, {numbers: true});
        },

        /**
         * Checks if a value contains only alphabetical, dash or underscore characteres.
         *
         * @method alpha_dash
         * @return {Boolean}         True if the value is a valid. False if not.
         */
        'alpha_dash': function( value ){
            return InkValidator.ascii(value, {dash: true, underscore: true});
        },

        /**
         * Checks if a value is a single digit.
         *
         * @method digit
         * @return {Boolean}         True if the value is a valid digit. False if not.
         */
        'digit': function( value ){
            return ((typeof value === 'string') && /^[0-9]{1}$/.test(value));
        },

        /**
         * Checks if a value is a valid integer.
         *
         * @method integer
         * @param  {String} positive Flag that specifies if the integer is must be positive (unsigned).
         * @return {Boolean}         True if the value is a valid integer. False if not.
         */
        'integer': function( value, positive ){
            return InkValidator.number(value, {
                negative: !positive,
                decimalPlaces: 0
            });
        },

        /**
         * Checks if a value is a valid decimal number.
         *
         * @method decimal
         * @param  {String} decimalSeparator Character that splits the integer part from the decimal one. By default is '.'.
         * @param  {String} [decimalPlaces] Maximum number of digits that the decimal part must have.
         * @param  {String} [leftDigits] Maximum number of digits that the integer part must have, when provided.
         * @return {Boolean}         True if the value is a valid decimal number. False if not.
         */
        'decimal': function( value, decimalSeparator, decimalPlaces, leftDigits ){
            return InkValidator.number(value, {
                decimalSep: decimalSeparator || '.',
                decimalPlaces: +decimalPlaces || null,
                maxDigits: +leftDigits
            });
        },

        /**
         * Checks if a value is a numeric value.
         *
         * @method numeric
         * @param  {String} decimalSeparator    Checks if it's a valid decimal. Otherwise checks if it's a valid integer.
         * @param  {String} [decimalPlaces]     Maximum number of digits the decimal part must have.
         * @param  {String} [leftDigits]        Maximum number of digits the integer part must have, when provided.
         * @return {Boolean}         True if the value is numeric. False if not.
         */
        'numeric': function( value, decimalSeparator, decimalPlaces, leftDigits ){
            decimalSeparator = decimalSeparator || '.';
            if( value.indexOf(decimalSeparator) !== -1  ){
                return validationFunctions.decimal( value, decimalSeparator, decimalPlaces, leftDigits );
            } else {
                return validationFunctions.integer( value );
            }
        },

        /**
         * Checks if a value is in a specific range of values.
         * The parameters after the first one are used to specify the range, and are similar in function to python's range() function.
         *
         * @method range
         * @param  {String} minValue        Left limit of the range.
         * @param  {String} maxValue        Right limit of the range.
         * @param  {String} [multipleOf]    In case you want numbers that are only multiples of another number.
         * @return {Boolean}                True if the value is within the range. False if not.
         */
        'range': function( value, minValue, maxValue, multipleOf ){
            value = +value;
            minValue = +minValue;
            maxValue = +maxValue;

            if (isNaN(value) || isNaN(minValue) || isNaN(maxValue)) {
                return false;
            }

            if( value < minValue || value > maxValue ){
                return false;
            }

            if (multipleOf) {
                return (value - minValue) % multipleOf === 0;
            } else {
                return true;
            }
        },

        /**
         * Checks if a value is a valid color.
         *
         * @method color
         * @return {Boolean}         True if the value is a valid color. False if not.
         */
        'color': function( value ){
            return InkValidator.isColor(value);
        },

        /**
         * Checks if a value matches the value of a different field.
         *
         * @method matches
         * @param  {String} fieldToCompare  Name or ID of the field to compare.
         * @return {Boolean}         True if the values match. False if not.
         */
        'matches': function( value, fieldToCompare ){
            // Find the other field in the FormValidator.
            var otherField = this.getFormElements()[fieldToCompare];

            if (!otherField) {
                // It's in the actual <form>, not in the FormValidator's fields
                var possibleFields = Ink.ss('input, select, textarea, .control-group', this._options.form._element);
                for (var i = 0; i < possibleFields.length; i++) {
                    if ((possibleFields[i].name || possibleFields[i].id) === fieldToCompare) {
                        return getValue(possibleFields[i]) === value;
                    }
                }
                return false;
            } else {
                otherField = otherField[0];
            }

            var otherFieldValue = otherField.getValue();
            if (otherField._rules.required) {
                if (otherFieldValue === '') {
                    return false;
                }
            }
            return value === otherFieldValue;
        },

        /**
         * Validates an [EAN barcode](https://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29)
         *
         * @method ean
         * @return {Boolean} True if the given value is an EAN. False if not.
         */
        'ean': function (value) {
            return InkValidator.isEAN(value.replace(/[^\d]/g, ''), 'ean-13');
        }
    };

    /**
     * Error messages for the validation functions above
     * @private
     * @static
     */
    var validationMessages = new I18n({
        en_US: {
            'formvalidator.generic_error' : '{field} is invalid',
            'formvalidator.required' : 'Filling {field} is mandatory',
            'formvalidator.min_length': 'The {field} must have a minimum size of {param1} characters',
            'formvalidator.max_length': 'The {field} must have a maximum size of {param1} characters',
            'formvalidator.exact_length': 'The {field} must have an exact size of {param1} characters',
            'formvalidator.email': 'The {field} must have a valid e-mail address',
            'formvalidator.url': 'The {field} must have a valid URL',
            'formvalidator.ip': 'The {field} does not contain a valid {param1} IP address',
            'formvalidator.phone': 'The {field} does not contain a valid {param1} phone number',
            'formvalidator.credit_card': 'The {field} does not contain a valid {param1} credit card',
            'formvalidator.date': 'The {field} should contain a date in the {param1} format',
            'formvalidator.alpha': 'The {field} should only contain letters',
            'formvalidator.text': 'The {field} should only contain alphabetic characters',
            'formvalidator.latin': 'The {field} should only contain alphabetic characters',
            'formvalidator.alpha_numeric': 'The {field} should only contain letters or numbers',
            'formvalidator.alpha_dash': 'The {field} should only contain letters or dashes',
            'formvalidator.digit': 'The {field} should only contain a digit',
            'formvalidator.integer': 'The {field} should only contain an integer',
            'formvalidator.decimal': 'The {field} should contain a valid decimal number',
            'formvalidator.numeric': 'The {field} should contain a number',
            'formvalidator.range': 'The {field} should contain a number between {param1} and {param2}',
            'formvalidator.color': 'The {field} should contain a valid color',
            'formvalidator.matches': 'The {field} should match the field {param1}'
        },
        pt_PT: {
            'formvalidator.generic_error' : '{field} inválido',
            'formvalidator.required' : 'Preencher {field} é obrigatório',
            'formvalidator.min_length': '{field} deve ter no mínimo {param1} caracteres',
            'formvalidator.max_length': '{field} tem um tamanho máximo de {param1} caracteres',
            'formvalidator.exact_length': '{field} devia ter exactamente {param1} caracteres',
            'formvalidator.email': '{field} deve ser um e-mail válido',
            'formvalidator.url': 'O {field} deve ser um URL válido',
            'formvalidator.ip': '{field} não tem um endereço IP {param1} válido',
            'formvalidator.phone': '{field} deve ser preenchido com um número de telefone {param1} válido.',
            'formvalidator.credit_card': '{field} não tem um cartão de crédito {param1} válido',
            'formvalidator.date': '{field} deve conter uma data no formato {param1}',
            'formvalidator.alpha': 'O campo {field} deve conter apenas caracteres alfabéticos',
            'formvalidator.text': 'O campo {field} deve conter apenas caracteres alfabéticos',
            'formvalidator.latin': 'O campo {field} deve conter apenas caracteres alfabéticos',
            'formvalidator.alpha_numeric': '{field} deve conter apenas letras e números',
            'formvalidator.alpha_dash': '{field} deve conter apenas letras e traços',
            'formvalidator.digit': '{field} destina-se a ser preenchido com apenas um dígito',
            'formvalidator.integer': '{field} deve conter um número inteiro',
            'formvalidator.decimal': '{field} deve conter um número válido',
            'formvalidator.numeric': '{field} deve conter um número válido',
            'formvalidator.range': '{field} deve conter um número entre {param1} e {param2}',
            'formvalidator.color': '{field} deve conter uma cor válida',
            'formvalidator.matches': '{field} deve corresponder ao campo {param1}'
        }
    }, 'en_US');

    /**
     * A FormElement represents a single form element to be validated.
     *
     * It is constructed with a DOM form element, and options.
     *
     * This class contains methods to parse rules and apply them to its element,
     * and also formats the error messages to be displayed in case of an error.
     *
     * You don't normally call "new FormElement" yourself. This is done
     * internally.
     *
     * @class FormValidator.FormElement
     * @constructor
     * @param  {Element} element DOM Element
     * @param  {Object} options Object with configuration options
     * @param  {String} [options.label] Label for this element. It is used in the error message. If not specified, the text in the `label` tag in the control-group is used.
     * @param  {String} [options.rules] Rules string to be parsed.
     * @param  {String} [options.error] Error message to show in case of error
     * @param  {Boolean} [options.autoReparse] Set to `true` to reparse data-rules every time this is submitted.
     * @param  {FormValidator} options.form FormValidator instance.
     */
    function FormElement(){
        Common.BaseUIComponent.apply(this, arguments);
    }

    FormElement._name = 'FormElement_1';

    FormElement._optionDefinition = {
        label: ['String', null],
        rules: ['String', null],  // The rules to apply
        error: ['String', null],  // Error message
        autoReparse: ['Boolean', false],
        form: ['Object']
    };

    /**
     * FormElement's prototype
     */
    FormElement.prototype = {
        _init: function () {
            this._errors = {};
            this._rules = {};
            this._value = null;
            this._forceInvalid = null;
            this._forceValid = null;
            this._errorParagraph = null;

            if (this._options.label === null) {
                this._options.label = this._getLabel();
            }

            // Mostly true, whether the element has an attribute named "data-rules".
            // Used only if options.autoReparse is true.
            this._elementHadDataRules = this._element.hasAttribute('data-rules');
        },

        /**
         * Function to get the label that identifies the field.
         * If it can't find one, it will use the name or the id
         * (depending on what is defined)
         *
         * @method _getLabel
         * @return {String} Label to be used in the error messages
         * @private
         */
        _getLabel: function(){
            var label = Element.findUpwardsBySelector(this._element,'.control-group label');

            if( label ){
                return Element.textContent(label);
            } else {
                return this._element.name || this._element.id || '';
            }
        },

        /**
         * Function to parse a rules' string.
         * Ex: required|number|max_length[30]
         *
         * @method _parseRules
         * @param  {String} rules String with the rules
         * @private
         */
        _parseRules: function( rules ){
            this._rules = {};
            rules = rules.split("|");
            var i, rulesLength = rules.length, rule, params, paramStartPos ;
            if( rulesLength > 0 ){
                for( i = 0; i < rulesLength; i++ ){
                    rule = rules[i];
                    if( !rule ){
                        continue;
                    }

                    if( ( paramStartPos = rule.indexOf('[') ) !== -1 ){
                        params = rule.substr( paramStartPos+1 );
                        params = params.split(']');
                        params = params[0];
                        params = params.split(',');
                        for (var p = 0, len = params.length; p < len; p++) {
                            params[p] =
                                params[p] === 'true' ? true :
                                params[p] === 'false' ? false :
                                params[p];
                        }
                        params.splice(0,0,this.getValue());

                        rule = rule.substr(0,paramStartPos);

                        this._rules[rule] = params;
                    } else {
                        this._rules[rule] = [this.getValue()];
                    }
                }
            }
        },

        /**
         * Function to add an error to the FormElement's 'errors' object.
         * It basically receives the rule where the error occurred, the parameters passed to it (if any)
         * and the error message.
         * Then it replaces some tokens in the message for a more 'custom' reading
         *
         * @method _addError
         * @param  {Object} opt Options object, containing either `rule` or `message`, below:
         * @param  {String} [rule] The rule that called for this error. Used to find a message.
         * @param  {String} [messag] The raw error message.
         * @private
         * @static
         */
        _addError: function(opt){
            if (typeof opt === 'string') { opt = { rule: opt }; }
            var rule = opt.rule;
            var message = opt.message;

            if (!message && !rule) { throw new Error('FormElement#_addError: Please pass an error message, or a rule that was broken'); }

            if (!message) {
                var params = this._rules[rule] || [];

                var paramObj = {
                    field: this._options.label,
                    value: this.getValue()
                };

                for( var i = 1; i < params.length; i++ ){
                    paramObj['param' + i] = params[i];
                }

                var i18nKey = 'formvalidator.' + rule;

                if (this._options.error) {
                    message = this._options.error;
                } else {
                    message = this._options.form.getI18n().text(i18nKey, paramObj);

                    if (message === i18nKey) {
                        message = '[Validation message not found for rule ]' + rule;
                    }
                }
            }

            this._errors[rule] = message;
        },

        /**
         * Gets an element's value
         *
         * @method getValue
         * @return {mixed} The DOM Element's value
         * @public
         */
        getValue: function(){
            return getValue(this._element);
        },

        /**
         * Gets this FormElement's display label, as passed to the error messages.
         *
         * @method getLabel
         * @return {String} The label string, from the name, id or data-label
         **/
        getLabel: function () {
            return this._options.label;
        },

        /**
         * Gets the constructed errors' object.
         *
         * @method getErrors
         * @return {Object} Errors' object
         * @public
         */
        getErrors: function(){
            return this._errors;
        },

        /**
         * Gets the DOM element related to the instance.
         *
         * @method getElement
         * @return {Object} DOM Element
         * @public
         */
        getElement: function(){
            return this._element;
        },

        /**
         * Gets other elements in the same form.
         *
         * @method getFormElements
         * @return {Object} A mapping of keys to other elements in this form.
         * @public
         */
        getFormElements: function () {
            return this._options.form._formElements;
        },

        /**
         * Sets the rules string (just as passed in data-rules) of this FormElement.
         *
         * Use this if a form's rules need to be dynamically modified.
         *
         * @method setRules
         * @param {String} rulesStr String with rules
         * @return {void}
         * @public
         **/
        setRules: function (rulesStr) {
            this._options.rules = rulesStr;
        },

        /**
         * Forcefully mark this FormElement as invalid. Use unsetInvalid() to remove this forced invalidation.
         *
         * @method forceInvalid
         * @param {String} [message='(a generic error string)'] The error message to show.
         **/
        forceInvalid: function (message) {
            this._forceInvalid = message ?
                message :
                this._options.form.getI18n().text('formvalidator.generic_error', { field: this.getLabel() });
        },

        /**
         * Undo a forceInvalid() call on this FormElement.
         *
         * @method unforceInvalid
         * @return {void}
         * @public
         **/
        unforceInvalid: function () {
            this._forceInvalid = null;
        },

        /**
         * Forcefully mark this FormElement as valid
         *
         * @method forceValid
         * @return {void}
         * @public
         *
         **/
        forceValid: function() {
            this._forceValid = true;
        },

        /**
         * Undo a forceValid() call
         *
         * @method unforceValid
         * @return {void}
         * @public
         **/
        unforceValid: function() {
            this._forceValid = false;
        },

        /**
         * Returns the element which gets the .validation.error classes. Might not exist.
         *
         * @method getControlGroup
         * @return {Element|void}
         * @public
         **/
        getControlGroup: function () {
            if( Css.hasClassName(this._element, 'control-group') ){
                return this._element;
            } else {
                return Element.findUpwardsByClass(this._element, 'control-group');
            }
        },

        /**
         * Returns the .control element. Might not exist
         *
         * @method getControl
         * @return {Element|void}
         * @public
         **/
        getControl: function () {
            if( Css.hasClassName(this._element, 'control-group') ){
                return Ink.s('.control', this._element) || undefined;
            } else {
                return Element.findUpwardsByClass(this._element, 'control');
            }
        },

        /**
         * Remove error marking and any error paragraphs
         *
         * @method removeErrors
         * @return {void}
         * @public
         **/
        removeErrors: function() {
            var controlGroup = this.getControlGroup();
            if (controlGroup) {
                Css.removeClassName(controlGroup, ['validation', 'error']);
            }
            if (this._errorParagraph) {
                Element.remove(this._errorParagraph);
            }
        },

        /**
         * Displays error messages and marks as invalid, if this is invalid.
         *
         * @method displayErrors
         * @return {void}
         * @public
         **/
        displayErrors: function() {
            this.validate();
            this.removeErrors();

            var errors = this.getErrors();
            var errorArr = [];
            for (var k in errors) {
                if (errors.hasOwnProperty(k)) {
                    errorArr.push(errors[k]);
                }
            }

            if (!errorArr.length) { return; }

            var controlGroupElement = this.getControlGroup();
            var controlElement = this.getControl();

            if(controlGroupElement) {
                Css.addClassName( controlGroupElement, ['validation', 'error'] );
            }

            var paragraph = document.createElement('p');
            Css.addClassName(paragraph, 'tip');
            if (controlElement || controlGroupElement) {
                (controlElement || controlGroupElement).appendChild(paragraph);
            } else {
                Element.insertAfter(paragraph, this._element);
            }

            paragraph.innerHTML = errorArr.join('<br/>');
            this._errorParagraph = paragraph;
        },

        /**
         * Validates the element based on the rules defined.
         * It parses the rules defined in the _options.rules property.
         *
         * @method validate
         * @return {Boolean} True if every rule was valid. False if one fails.
         * @public
         */
        validate: function(){
            if (this._forceValid) {
                /* The user says it's valid */
                this._errors = {};
                return true;
            }

            if (this._element.disabled) {
                return true;
            }

            if (this._forceInvalid) {
                /* The user says it's invalid */
                this._addError({ message: this._forceInvalid });
                return false;
            }

            this._errors = {};

            if (this._options.autoReparse) {
                var rules = this._element.getAttribute('data-rules');
                if (rules) {
                    this._options.rules = rules;
                } else if (this._elementHadDataRules && !this._element.hasAttribute('data-rules')) {
                    // Element had [data-rules], but it was removed.
                    // Which means it is actually valid.
                    return true;
                }
            }

            this._parseRules( this._options.rules );

            // We want to validate this field only if it's not empty
            // "" is not an invalid number.
            var doValidate = this.getValue() !== '' ||
                // If it's required it will be validated anyway.
                ("required" in this._rules) ||
                // If it has a "matches" rule it will also be validated because "" is not a valid password confirmation.
                ("matches" in this._rules);

            if (doValidate) {
                for(var rule in this._rules) {
                    if (this._rules.hasOwnProperty(rule)) {
                        if( (typeof validationFunctions[rule] === 'function') ){
                            if( validationFunctions[rule].apply(this, this._rules[rule] ) === false ){
                                this._addError({ rule: rule });
                                return false;
                            }

                        } else {
                            Ink.warn('Rule "' + rule + '" not found. Used in element:', this._element);
                            this._addError({
                                message: this._options.form.getI18n().text('formvalidator.generic_error', { field: this.getLabel() })
                            });
                            return false;
                        }
                    }
                }
            }

            return true;

        }
    };

    Common.createUIComponent(FormElement);


    /**
     * @class FormValidator_2
     * @constructor
     * @param {String|Element}      selector                        Either a CSS Selector string, or the form's Element
     * @param {Object}              [options]                       Options object, containing the following options:
     * @param {String}              [options.lang]                  Set the language of the error messages. This internally sets the lang of our Ink.Util.I18n instance. pt_PT and en_US are available, but using getI18n().append({ lang_CODE: {...} }) you can create your own language.
     * @param {String}              [options.eventTrigger]          Event that will trigger the validation. Defaults to 'submit'.
     * @param {Boolean}             [options.neverSubmit]           Flag to cancel the submit event. Use this to avoid submitting the form.
     * @param {Selector}            [options.searchFor]             Selector containing the validation data-attributes. Defaults to 'input, select, textarea, .control-group'.
     * @param {Function}            [options.beforeValidation]      Callback to be executed before validating the form. Takes { validator (this FormValidator), elements (Object containing arrays of FormElement) } as an argument. Use this callback to preemptively mark fields as invalid or valid using forceInvalid or forceValid.
     * @param {Boolean}             [options.autoReparse]           Set to `true` to reparse data-rules in input elements every time this is submitted.
     * @param {Function}            [options.extraValidation]       Use this callback to perform extra validation on the form. Useful for cross-validation of several fields, for example. Takes { validator (this FormValidator), elements (Object containing arrays of FormElement), errorCount (errors the form had before calling the function) } as an argument, and is called at the end of validate(). Return false to force the form to be invalid. You are responsible for showing any visual feedback to the user for now. This might change later.
     * @param {Function}            [options.onError]               Validation error callback
     * @param {Function}            [options.onSuccess]             Validation success callback
     *
     * @sample Ink_UI_FormValidator_2.html
     */
    function FormValidator(){
        Common.BaseUIComponent.apply(this, arguments);
    }

    FormValidator._name = 'FormValidator_1';

    FormValidator._optionDefinition = {
        lang: ['String', null],
        eventTrigger: ['String', 'submit'],
        neverSubmit: ['Boolean', false],
        autoReparse: ['Boolean', false],
        searchFor: ['String', 'input, select, textarea, .control-group'],
        beforeValidation: ['Function', undefined],
        onError: ['Function', undefined],
        onSuccess: ['Function', undefined],
        extraValidation: ['Function', undefined]
    };

    /**
     * Sets or modifies validation functions
     *
     * @method setRule
     * @param {String}   name         Name of the function. E.g. 'required'
     * @param {String}   errorMessage Error message to be displayed in case of returning false. E.g. 'Oops, you passed {param1} as parameter1, lorem ipsum dolor...'
     * @param {Function} cb           Function to be executed when calling this rule
     * @return {void}
     * @public
     * @static
     */
    FormValidator.setRule = function( name, errorMessage, cb ){
        validationFunctions[ name ] = cb;
        if (validationMessages.getKey('formvalidator.' + name) !== errorMessage) {
            var langObj = {}; langObj['formvalidator.' + name] = errorMessage;
            var dictObj = {}; dictObj[validationMessages.lang()] = langObj;
            validationMessages.append(dictObj);
        }
    };

    /**
     * Gets the i18n object in charge of the error messages
     *
     * @method getI18n
     * @static
     * @return {Ink.Util.I18n} The i18n object the FormValidator is using.
     * @public
     */
    FormValidator.getI18n = function () {
        return validationMessages;
    };

    /**
     * Sets the I18n object for validation error messages
     *
     * @method setI18n
     * @static
     * @param {Ink.Util.I18n} i18n  The I18n object.
     * @return {void}
     * @public
     */
    FormValidator.setI18n = function (i18n) {
        validationMessages = i18n;
    };

   /**
     * Add to the I18n dictionary.
     * See `Ink.Util.I18n.append()` documentation.
     *
     * @method appendI18n
     * @return {void}
     * @static
     * @public
     */
    FormValidator.appendI18n = function () {
        validationMessages.append.apply(validationMessages, [].slice.call(arguments));
    };

    /**
     * Sets the language of the error messages.
     * pt_PT and en_US are available, but you can add new languages by using append()
     *
     * See the `Ink.Util.I18n.lang()` setter
     *
     * @method setLanguage
     * @param {Ink.Util.I18n} language The language to set i18n to.
     * @return {void}
     * @static
     * @public
     */
    FormValidator.setLanguage = function (language) {
        validationMessages.lang(language);
    };

    /**
     * Method used to get the existing defined validation functions
     *
     * @method getRules
     * @return {Object} Object with the rules defined
     * @public
     * @static
     */
    FormValidator.getRules = function(){
        return validationFunctions;
    };

    FormValidator.prototype = {
        _init: function(){
            /**
             * Element of the form being validated
             *
             * @property _rootElement
             * @type {Element}
             */
            this._rootElement = this._element;

            /**
             * Object that will gather the form elements by name
             *
             * @property _formElements
             * @type {Object}
             */
            this._formElements = {};

            /**
             * Error message Elements
             * 
             * @property _errorMessages
             */
            this._errorMessages = [];

            /**
             * Array of FormElements marked with validation errors
             *
             * @property _markedErrorElements
             */
            this._markedErrorElements = [];

            // Sets an event listener for a specific event in the form, if defined.
            // By default is the 'submit' event.
            if( typeof this._options.eventTrigger === 'string' ){
                Event.observe(
                    this._rootElement,
                    this._options.eventTrigger,
                    Ink.bindEvent(this.validate,this) );
            }

            if (this._options.lang) {
                this.setLanguage(this._options.lang);
            }
        },

        /**
         * Searches for the elements in the form.
         * This method is based in the this._options.searchFor configuration.
         *
         * Returns an object mapping names of object to arrays of FormElement instances.
         *
         * @method getElements
         * @return {Object} An object with the elements in the form, indexed by name/id
         * @public
         */
        getElements: function(){
            if (!this._formElements) {
                this._formElements = {};
            }
            var i;
            for (var k in this._formElements) if (this._formElements.hasOwnProperty(k)) {
                i = this._formElements[k].length;
                while (i--) {
                    if (!Element.isAncestorOf(document.documentElement,
                            this._formElements[k][i]._element)) {
                        // Element was detached from DOM, remove its formElement from our roster.
                        this._formElements[k][i].removeErrors();
                        this._formElements[k].splice(i, 1);
                    }
                }
                // Check if formElement was removed.
                if (this._formElements[k].length === 0) {
                    delete this._formElements[k];
                }
            }
            var formElements = Selector.select( this._options.searchFor, this._rootElement );

            for(i=0; i<formElements.length; i+=1 ){
                var element = formElements[i];

                var dataAttrs = Element.data( element );

                if( !("rules" in dataAttrs) ){
                    continue;
                }

                var options = {
                    form: this
                };

                var key;
                if( ("name" in element) && element.name ){
                    key = element.name;
                } else if( ("id" in element) && element.id ){
                    key = element.id;
                } else {
                    key = 'element_' + Math.floor(Math.random()*100);
                    element.id = key;
                }

                if( !(key in this._formElements) ){
                    this._formElements[key] = [];
                }

                var formElement = this._getOrCreateFormElementInstance(key, element, options);

                if (formElement) {
                    this._formElements[key].push(formElement);
                }
            }

            return this._formElements;
        },

        _getOrCreateFormElementInstance: function (key, element, options) {
            for (var j = 0; j < this._formElements[key].length; j++) {
                if (this._formElements[key][j].getElement() === element) {
                    return null;
                }
            }
            if (!element.getAttribute('data-auto-reparse')) {
                options.autoReparse = this._options.autoReparse;
            }
            return new FormElement(element, options);
        },

        /**
         * Set my I18n instance with the validation messages.
         * @method setI18n
         * @param {Ink.Util.I18n_1} i18n I18n instance
         **/
        setI18n: function (i18n) {
            if (i18n.clone) {
                // New function, added safety
                i18n = i18n.clone();
            }
            this.i18n = i18n;
        },

        /**
         * Get my I18n instance with the validation messages.
         * @method getI18n
         * @return {Ink.Util.I18n_1} I18n instance
         **/
        getI18n: function () {
            return this.i18n || validationMessages;
        },

        /**
         * Set the language of this form validator to the given language code
         * If we don't have an i18n instance, create one which is a copy of the global one.
         * @method setLanguage
         * @param {String} language Language code (ex: en_US, pt_PT)
         * @return {void}
         * @public
         **/
        setLanguage: function (language) {
            if (!this.i18n) {
                this.setI18n(validationMessages);
            }
            this.i18n.lang(language);
        },

        /**
         * Gets the language code string (pt_PT or en_US for example) currently in use by this formvalidator.
         * May be global
         *
         * @method getLanguage
         * @public
         * @return {String} Language code.
         **/
        getLanguage: function () {
            return this.i18n ? this.i18n.lang() : validationMessages.lang();
        },

        /**
         * Validates every registered FormElement 
         * This method looks inside the this._formElements object for validation targets.
         * Also, based on the this._options.beforeValidation, this._options.onError, and this._options.onSuccess, this callbacks are executed when defined.
         *
         * @method validate
         * @param  {Event} event    Window.event object
         * @return {Boolean} Whether the form is considered valid
         * @public
         */
        validate: function( event ) {

            if(this._options.neverSubmit && event) {
                Event.stopDefault(event);
            }

            this.getElements();

            if( typeof this._options.beforeValidation === 'function' ){
                this._options.beforeValidation.call(this, {
                    event: event,
                    validator: this,
                    elements: this._formElements
                });
            }

            Css.removeClassName(this._element, 'form-error');

            var errorElements = [];

            for( var key in this._formElements ){
                if( this._formElements.hasOwnProperty(key) ){
                    for( var counter = 0; counter < this._formElements[key].length; counter+=1 ){
                        this._formElements[key][counter].removeErrors();
                        if( !this._formElements[key][counter].validate() ) {
                            errorElements.push(this._formElements[key][counter]);
                        }
                    }
                }
            }

            var isValid = errorElements.length === 0;

            if (typeof this._options.extraValidation === 'function') {
                var param = {
                    event: event,
                    validator: this,
                    elements: this._formElements,
                    errorCount: errorElements.length
                };
                var result = this._options.extraValidation.call(this, param);
                if (result === false) { isValid = false; }
            }
            
            if( isValid ){
                if( typeof this._options.onSuccess === 'function' ){
                    this._options.onSuccess();
                }
            } else {
                if(event) {
                    Event.stopDefault(event);
                }

                if( typeof this._options.onError === 'function' ){
                    this._options.onError( errorElements );
                }

                this._invalid(errorElements);
            }

            return isValid;
        },

        _invalid: function (errorElements) {
            errorElements = errorElements || [];
            this._errorMessages = [];

            Css.addClassName(this._element, 'form-error');

            for (var i = 0; i < errorElements.length; i++) {
                errorElements[i].displayErrors();
            }
        }
    };

    Common.createUIComponent(FormValidator);

    FormValidator.FormElement = FormElement;  // Export FormElement too, for testing.
    FormValidator.validationFunctions = validationFunctions;  // Export the raw validation functions too, for fiddling.

    return FormValidator;

});

/**
 * Responsive image loading
 * @module Ink.UI.ImageQuery_1
 * @version 1
 */
 
Ink.createModule('Ink.UI.ImageQuery', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Element_1','Ink.Util.Array_1'], function(Common, Event, Element, InkArray ) {
    'use strict';

    /**
     * @class Ink.UI.ImageQuery
     * @constructor
     * @version 1
     *
     * @param {String|Element}      selector                    Selector or element
     * @param {Object}              [options]                   Options object
     * @param {String|Function}     [options.src]               A template string in which '{:width}' or '{:label}' will be expanded into the corresponding properties of the `query` object, or a function which takes the query object and should return a src string, for more flexibility.
     * @param {String|Function}     [options.retina]            String or Callback function (that returns a string) with the path to be used to get RETINA specific images.
     * @param {Array}               [options.queries]           Array of queries. Each query object contains the following properties:
     * @param {String}              [options.queries.label]     Label of the query. Ex. 'small'.
     * @param {Number}              [options.queries.width]     Min-width to use this query.
     * @param {String}              [options.queries.src]       If you don't want to specify a "string template" in options.src, you can also specify an image source in each query by setting this option.
     * @param {Function}            [options.onLoad]            A function to be attached to the image 'load' event. Called when an image is loaded into this img (occurs several times because the user may resize the page, causing the image's "load" event to be called several times).
     *
     * @sample Ink_UI_ImageQuery_1.html
     */
    function ImageQuery() {
        Common.BaseUIComponent.apply(this, arguments);
    }

    ImageQuery._name = 'ImageQuery_1';

    ImageQuery._optionDefinition = {
        src: ['String'],
        retina: ['String', undefined],
        queries: ['Object'],
        onLoad: ['Function', null]
    };

    ImageQuery.prototype = {

        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function(){
            // /**
            //  * Get elements, create more ImageQueries if selector finds more than one
            //  *
            //  * [improvement] This is a useful pattern. More UI modules could use it.
            //  */
            // this._element = Common.elsOrSelector(selector, 'Ink.UI.ImageQuery', /*required=*/true);

            // // In case we have several elements
            // for (var i = 1 /* start from second element*/; i < this._element.length; i++) {
            //     new ImageQuery(this._element[i], options);
            // }

            // this._element = this._element[0];
            /**
             * Determining the original basename (with the querystring) of the file.
             */
            var pos;
            if( (pos=this._element.src.lastIndexOf('?')) !== -1 ){
                var search = this._element.src.substr(pos);
                this._filename = this._element.src.replace(search,'').split('/').pop()+search;
            } else {
                this._filename = this._element.src.split('/').pop();
            }

            if (!this._options.queries) { this._options.queries = []; }

            // Sort queries by width, in descendant order.
            this._options.queries = InkArray.sortMulti(this._options.queries, 'width').reverse();

            if( typeof this._options.onLoad === 'function' ){
                Event.observe(this._element, 'load', Ink.bindEvent(this._onLoad, this));
            }

            // Imediate call to apply the right images based on the current viewport
            this._onResize();

            Event.observe(window, 'resize', Event.throttle(Ink.bindMethod(this, '_onResize'), 400));
        },

        /**
         * Handles the resize event (as specified in the _init function)
         *
         * @method _onResize
         * @private
         */
        _onResize: function(){
            if( !this._options.queries.length ){
                return;
            }

            var current = this._findCurrentQuery();

            this._element.src = this.getQuerySrc(current);
        },

        /**
         * Queries are in a descendant order. We want to find the query with the highest width that fits the viewport, therefore the first one.
         */
        _findCurrentQuery: function () {
            /**
             * Gets viewport width
             */
            var viewportWidth = Element.viewportWidth();

            var queries = this._options.queries;
            var last = queries.length - 1;

            for( var query=0; query < last; query+=1 ){
                if (queries[query].width <= viewportWidth){
                    return queries[query];
                }
            }

            return queries[last];
        },

        /**
         * @method getQuerySrc
         * @param {Object} query A query object, comprised of:
         * @param {Number} [query.width] The minimum viewport width in which this query is active.
         * @param {String} [query.label] The label for this query. Used in the template strings.
         * @param {String|Function} [query.src=this.getOption('src')] Exactly the same as `options-src`. If you pass this, `options.src` will be overridden. A template string in which '{:width}' or '{:label}' will be expanded into the corresponding properties of the `query` object, or a function which takes the query object and should return a src string, for more flexibility.
         **/
        getQuerySrc: function (query) {
            /**
             * Choosing the right src. The rule is:
             *
             *   "If there is specifically defined in the query object, use that. Otherwise uses the global src."
             *
             * The above rule applies to a retina src.
             */
            var src = query.src || this._options.src;

            if ( window.devicePixelRatio > 1 && (this._options.retina !== undefined) ) {
                src = query.retina || this._options.retina;
            }

            /**
             * Injects the file variable for usage in the 'templating system' below
             */
            query.file = this._filename;

            /**
             * Since we allow the src to be a callback, let's run it and get the results.
             * For the inside, we're passing the element (img) being processed and the object of the selected query.
             */
            if( typeof src === 'function' ){
                src = src.apply(this,[this._element,query]);
                if( typeof src !== 'string' ){
                    throw '[ImageQuery] :: "src" callback does not return a string';
                }
            }

            /**
             * Replace the values of the existing properties on the query object (except src and retina) in the
             * defined src and/or retina.
             */
            src = src.replace(/{:(.*?)}/g, function(_, prop) {
                return query[prop];
            });

            // Removes the injected file property
            delete query.file;

            return src;
        },

        /**
         * Handles the element loading (img onload) event
         *
         * @method _onLoad
         * @private
         */
        _onLoad: function(){
            /**
             * Since we allow a callback for this let's run it.
             */
            this._options.onLoad.call(this);
        }

    };

    Common.createUIComponent(ImageQuery);

    return ImageQuery;

});

/**
 * Delays content loading
 * @module Ink.UI.LazyLoad_1
 * @version 1
 */

Ink.createModule('Ink.UI.LazyLoad', '1', ['Ink.UI.Common_1', 'Ink.Dom.Event_1', 'Ink.Dom.Element_1', 'Ink.Dom.Css_1'], function(Common, InkEvent, InkElement, Css) {
'use strict';

var scrollSupport = 'onscroll' in document &&
    // Opera Mini reports having the scroll event, but it does not.
    typeof operamini === 'undefined';

function LazyLoad() {
    Common.BaseUIComponent.apply(this, arguments);
}

LazyLoad._name = 'LazyLoad_1';

LazyLoad._optionDefinition = {
    item: ['String', '.lazyload-item'],
    placeholder: ['String', null],
    loadedClass: ['String', null],
    source: ['String', 'data-src'],
    destination: ['String', 'src'],
    delay: ['Number', 100],
    delta: ['Number', 0],
    image: ['Boolean', true],
    scrollElement: ['Element', window],
    touchEvents: ['Boolean', true],
    onInsideViewport: ['Function', false],
    onAfterAttributeChange: ['Function', false],
    autoInit: ['Boolean', true]
};

LazyLoad.prototype = {
    /**
     * Stops the browser from loading a barrage of content at once.
     *
     * This delays the loading of images and other content until the corresponding elements are visible in the browser viewport.
     * This was created to load images later, but can be also used for widgets which are slow to load and are only useful when on screen.
     *
     * This works through copying the `src` attribute into `data-src`, and placing a `placeholder` string in the `src` attribute. Then, when the element is on screen, the `data-src` attribute is copied back to `src` and the content starts loading. You can use the options below to change what attributes are involved in the exchange.
     *
     * You can also provide your `onInsideViewport` callback and use it to start widgets which need javascript, such as an interactive map or an animation.
     *
     * @class Ink.UI.LazyLoad_1
     * @constructor
     *
     * @param {String|Element} selector                   The element which contains the lazily-loaded items.
     * @param {Object}      [options]                           Options object, containing:
     * @param {String}      [options.item]                      Item selector. Defaults to '.lazyload-item'.
     * @param {String}      [options.placeholder]               Placeholder value for items which are not 'visible', in case they don't already have a value set.
     * @param {String}      [options.loadedClass]               Add this class to the images when they're loaded.
     * @param {String}      [options.source]                    Source attribute. When an item is 'visible', use this attribute's value to set its destination attribute. Defaults to 'data-src'.
     * @param {String}      [options.destination]               Destination attribute. Attribute to change when the element is 'visible'. Defaults to 'src'. 
     * @param {Number}      [options.delay]                     Milliseconds to wait before trying to load items. Defaults to 100.
     * @param {Number}      [options.delta]                     Offset distance in pixels. Determines how far the top of an item must be from the viewport be considered 'visible'. Negative values shrink the considered 'visible' viewport while positive values enlarge it. Defaults to 0.
     * @param {Boolean}     [options.image]                     Set to false to make this component do nothing to any elements and just give you the onInsideViewport callback.
     * @param {Element}     [options.scrollElement]             (advanced) What element is to be listened for the scroll event. Defaults to document.window.
     * @param {Boolean}     [options.touchEvents]               Subscribe to touch events in addition to scroll events. Useful in mobile safari because 'scroll' events aren't frequent enough. Defaults to true.
     * @param {Function}    [options.onInsideViewport]          Callback function for when an `item` is 'visible'. Receives an object containing the item's element as an argument.
     * @param {Function}    [options.onAfterAttributeChange]    (advanced) Callback function when an item's attribute changes. Receives an object containing the item's element as an argument.
     * @param {Boolean}     [options.autoInit]                  (advanced) Set to false if you want to start LazyLoad yourself with `reload()`. Defaults to true.
     *
     * @sample Ink_UI_LazyLoad_1.html
     */
    _init: function() {
        this._aData = [];
        this._hasEvents = false;
   
        if(this._options.autoInit) {
            this._activate();
        }
    },

    _activate: function() 
    {
        this._getData();
        if (!scrollSupport) {
            // If there is no scroll event support (Opera Mini!), load everything now.
            // A trivial fallback, that avoids entire pages without images.
            for (var i = 0; i < this._aData.length; i++) {
                this._elInViewport(this._aData[i]);
            }
        }
        if(!this._hasEvents) {
            this._addEvents(); 
        }
        this._onScrollThrottled();
    },

    _getData: function()
    {
        var aElms = Ink.ss(this._options.item, this._element);
        var attr = null;
        for(var i=0, t=aElms.length; i < t; i++) {
            if (this._options.placeholder != null && !InkElement.hasAttribute(aElms[i], this._options.destination)) {
                // [todo]: this function's name implies that it doesn't touch anything, yet it's changing attributes.
                aElms[i].setAttribute(this._options.destination, this._options.placeholder);
            }
            attr = aElms[i].getAttribute(this._options.source);
            if(attr !== null || !this._options.image) {
                this._aData.push({elm: aElms[i], original: attr});
            }
        }
    },

    _addEvents: function() 
    {
        if (!scrollSupport) { return; }
        this._onScrollThrottled = InkEvent.throttle(Ink.bindEvent(this._onScroll, this), this._options.delay);
        if('ontouchmove' in document.documentElement && this._options.touchEvents) {
            InkEvent.observe(document.documentElement, 'touchmove', this._onScrollThrottled);
        }
        InkEvent.observe(this._options.scrollElement, 'scroll', this._onScrollThrottled);
        this._hasEvents = true;
    },

    _removeEvents: function() {
        if('ontouchmove' in document.documentElement && this._options.touchEvents) {
            InkEvent.stopObserving(document.documentElement, 'touchmove', this._onScrollThrottled);
        }
        InkEvent.stopObserving(this._options.scrollElement, 'scroll', this._onScrollThrottled);
        this._hasEvents = false;
    }, 

    _onScroll: function() {
        var curElm;

        for (var i = 0; i < this._aData.length; i++) {
            curElm = this._aData[i];

            if (InkElement.inViewport(curElm.elm, { partial: true, margin: this._options.delta })) {
                this._elInViewport(curElm);
                this._aData.splice(i, 1);
                i -= 1;
            }
        }

        if (this._aData.length === 0) {
            this._removeEvents();
        }
    },

    /**
     * Called when an element is detected inside the viewport
     *
     * @method _elInViewport
     * @param {LazyLoadInternalElementData} curElm
     * @private
     **/
    _elInViewport: function (curElm) {
        this._userCallback('onInsideViewport', { element: curElm.elm });

        if(this._options.image) {
            curElm.elm.setAttribute(this._options.destination, curElm.original);
            if (this._options.loadedClass) {
                Css.addClassName(curElm.elm, this._options.loadedClass);
            }
            curElm.elm.removeAttribute(this._options.source);
        }

        this._userCallback('onAfterAttributeChange', { element: curElm.elm });
    },

    /**
     * Call a callback if it exists and its `typeof` is `"function"`.
     * @method _userCallback
     * @param name {String} Callback name in this._options.
     * @private
     **/
    _userCallback: function (name) {
        if (typeof this._options[name] === 'function') {
            this._options[name].apply(this, [].slice.call(arguments, 1));
        }
    },

    /**
     * Load or reload the component.
     * Adding the 'scroll' event listener if necessary and checks if anything needs to be loaded now.
     *
     * You can use this to manually invoke the loading logic without user action. 
     *
     * @method reload
     * @return {void}
     * @public
     */
    reload: function() {
        this._activate(); 
    },

    /**
     * Destroy this component
     * @method destroy
     * @return {void}
     * @public
     **/
    destroy: function() {
        if(this._hasEvents) {
            this._removeEvents();
        }
        Common.destroyComponent.call(this);
    }
};

Common.createUIComponent(LazyLoad);

return LazyLoad;

});

/**
 * Modal dialog prompts
 * @module Ink.UI.Modal_1
 * @version 1
 */
Ink.createModule('Ink.UI.Modal', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1'], function(Common, Event, Css, InkElement, Selector, InkArray ) {
    'use strict';

    var opacitySupported = (function (div) {
        div.style.opacity = 'invalid';
        return div.style.opacity !== 'invalid';
    }(InkElement.create('div', {style: 'opacity: 1'})));

    var vhVwSupported = (function (elem) {
        // Stolen with pride from modernizr:
        // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/css/vhunit.js
        // and https://github.com/Modernizr/Modernizr/blob/master/feature-detects/css/vwunit.js
        var height = parseInt(window.innerHeight / 2, 10);
        var compHeight = parseInt((window.getComputedStyle ?
                                  getComputedStyle(elem, null) :
                                  elem.currentStyle)['height'], 10);
        var width = parseInt(window.innerWidth / 2, 10);
        var compWidth = parseInt((window.getComputedStyle ?
                                  getComputedStyle(elem, null) :
                                  elem.currentStyle).width, 10);

        return compHeight === height && compWidth === width
    }(InkElement.create('div', { style: 'height:50vh;width:50vw' })));

    var flexSupported = (function (div) {
        return div.style.display !== '';
    }(InkElement.create('div', { style: 'display: flex' })));

    var cleanDimension = function (dim) {
        dim = dim.replace(/^\s+|\s+$/g, '');
        var hasPercent = dim.indexOf('%') !== -1;
        var hasPx = dim.indexOf('px') !== -1;
        return !hasPercent && !hasPx ? dim + '%' :
            !hasPercent && hasPx ? dim :
            !hasPx && hasPercent ? dim :
            dim + 'px';
    };

    var dimensionOfLayout = function (dimensionList, needleLayout) {
        var dims = dimensionList.split(/\s+/g);
        var theDefault;
        for (var i = 0; i < dims.length; i++) {
            var _dim = dims[i].split('-');
            var layout = _dim[0].replace(/^\s+|\s+$/g, '');

            if (layout === needleLayout) {
                return cleanDimension(_dim[1]);
            }

            if (layout === 'all') {
                theDefault = cleanDimension(_dim[1]);
            }
        }
        return theDefault;
    };

    /**
     * @class Ink.UI.Modal
     * @constructor
     * @version 1
     * @param {String|Element}      selector                        Element or ID
     * @param {Object}              [options]                       Options object, containing:
     * @param {String}              [options.width]                 Default/Initial width. Ex: '600px'
     * @param {String}              [options.height]                Default/Initial height. Ex: '400px'
     * @param {String}              [options.shadeClass]            Custom class to be added to the div.ink-shade
     * @param {String}              [options.modalClass]            Custom class to be added to the div.ink-modal
     * @param {String}              [options.trigger]               CSS Selector for target elements that will trigger the Modal.
     * @param {Boolean}             [options.autoDisplay]           Displays the Modal automatically when constructed.
     * @param {String}              [options.markup]                Markup to be placed in the Modal when created
     * @param {Function}            [options.onShow]                Callback function to run when the Modal is opened.
     * @param {Function}            [options.onDismiss]             Callback function to run when the Modal is closed. Return `false` to cancel dismissing the Modal.
     * @param {Boolean}             [options.closeOnClick]          Flag to close the modal when clicking outside of it.
     * @param {Boolean}             [options.closeOnEscape]         Determines if the Modal should close when "Esc" key is pressed. Defaults to true.
     * @param {Boolean}             [options.responsive]            Determines if the Modal should behave responsively (adapt to smaller viewports).
     * @param {String}              [options.triggerEvent]          (advanced) Trigger's event to be listened. Defaults to 'click'.
     *
     * @sample Ink_UI_Modal_1.html
     */

    var openModals = [];

    function Modal() {
        Common.BaseUIComponent.apply(this, arguments);
    }

    Modal._name = 'Modal_1';

    Modal._optionDefinition = {
        /**
         * Width, height and markup really optional, as they can be obtained by the element
         */
        width:        ['String', '90%'],
        height:       ['String', '90%'],

        /**
         * To add extra classes
         */
        shadeClass:   ['String', undefined],
        modalClass:   ['String', undefined],

        /**
         * Optional trigger properties
         */
        trigger:      ['String', undefined],
        triggerEvent: ['String', 'click'],
        autoDisplay:  ['Boolean', true],

        /**
         * Remaining options
         */
        markup:       ['String', undefined],
        onShow:       ['Function', undefined],
        onDismiss:    ['Function', undefined],
        closeOnClick: ['Boolean', false],
        closeOnEscape: ['Boolean', true],
        responsive:    ['Boolean', true]
    };

    Modal.prototype = {
        _init: function () {
            this._handlers = {
                click:   Ink.bindEvent(this._onShadeClick, this),
                keyDown: Ink.bindEvent(this._onKeyDown, this),
                resize: null
            };

            this._dimensionIsVariant = {
                width: ('' + this._options.width).indexOf(' ') !== -1,
                height: ('' + this._options.height).indexOf(' ') !== -1
            };

            this._isOpen = false;

            /**
             * Modal Markup
             */
            if( this._element ){
                this._markupMode = Css.hasClassName(this._element,'ink-modal'); // Check if the full modal comes from the markup
            } else {
                this._markupMode = false;
            }

            if( !this._markupMode ){
                this._modalShadow = InkElement.create('div', { className: 'ink-shade' });
                this._modalDiv    = InkElement.create('div', { className: 'ink-modal ink-space' });

                if( !!this._element ){
                    this._options.markup = this._element.innerHTML;
                }

                /**
                 * Applying the main css styles
                 */
                // this._modalDiv.style.position = 'absolute';
                this._modalShadow.appendChild( this._modalDiv);
                document.body.appendChild( this._modalShadow );
            } else {
                this._modalDiv         = this._element;
                this._modalShadow      = this._modalDiv.parentNode;

                this._contentContainer = Selector.select(".modal-body", this._modalDiv)[0];
                if( !this._contentContainer){
                    throw new Error('Ink.UI.Modal: Missing div with class "modal-body"');
                }

                this._options.markup = this._contentContainer.innerHTML;
            }

            if( !this._markupMode ){
                this.setContentMarkup(this._options.markup);
            }

            if( typeof this._options.shadeClass === 'string' ){
                Css.addClassName(this._modalShadow, this._options.shadeClass);
            }

            if( typeof this._options.modalClass === 'string' ){
                Css.addClassName(this._modalDiv, this._options.modalClass);
            }

            if( this._options.trigger ) {
                var triggerElements = Common.elsOrSelector(this._options.trigger, '');
                Event.observeMulti(triggerElements, this._options.triggerEvent, Ink.bindEvent(this.open, this));
            } else if ( this._options.autoDisplay ) {
                this.open();
            }
        },

        _dimensionIsPercentage: function () {
            var dims = this._getDimensions();
            return {
                width: ('' + dims.width).indexOf('%') !== -1,
                height: ('' + dims.height).indexOf('%') !== -1
            };
        },

        _getDimensions: function (opt) {
            opt = opt || {};
            var dims = {
                width: this._options.width,
                height: this._options.height
            };
            var currentLayout;
            if (this._dimensionIsVariant.width || this._dimensionIsVariant.height) {
                currentLayout = Common.currentLayout();
            }
            if (this._dimensionIsVariant.width) {
                dims.width = dimensionOfLayout(dims.width, currentLayout);
            }
            if (this._dimensionIsVariant.height) {
                dims.height = dimensionOfLayout(dims.height, currentLayout);
            }
            if (opt.dynamic) {
                var isPercentage = this._dimensionIsPercentage();
                if (!isPercentage.width) {
                    // TODO maxWidth and maxHeight should be options, not bound to 90%
                    var maxWidth = InkElement.viewportWidth() * 0.9;
                    if (parseFloat(dims.width) >= maxWidth) {
                        dims.width = maxWidth + 'px';
                    }
                }
                if (!isPercentage.height) {
                    var maxHeight = InkElement.viewportHeight() * 0.9;
                    if (parseFloat(dims.height) >= maxHeight) {
                        dims.height = maxHeight + 'px';
                    }
                }
            }
            return dims;
        },

        /**
         * Responsible for repositioning the modal
         * 
         * @method _reposition
         * @private
         */
        _reposition: function(){
            // reposition vertically
            var largerThan90Percent;

            var dimensionIsPercentage = this._dimensionIsPercentage();
            var dims = this._getDimensions();

            if (vhVwSupported && dimensionIsPercentage.height) {
                this._modalDiv.style.marginTop = (-parseFloat(dims.height)/2) + 'vh';
            } else if (vhVwSupported) {
                largerThan90Percent = parseFloat(dims.height) > InkElement.viewportHeight() * 0.9;

                if (largerThan90Percent !== this._heightWasLargerThan90Percent || !largerThan90Percent || this._dimensionIsVariant.height) {
                    this._heightWasLargerThan90Percent = largerThan90Percent;

                    if (largerThan90Percent) {
                        this._modalDiv.style.marginTop = '0';
                        this._modalDiv.style.top = '5vh';
                    } else {
                        this._modalDiv.style.marginTop = (-parseFloat(dims.height)/2) + 'px';
                        this._modalDiv.style.top = '';
                    }
                }
            } else {
                this._modalDiv.style.marginTop = (-InkElement.elementHeight(this._modalDiv)/2) + 'px';
            }

            // reposition horizontally
            if (vhVwSupported && dimensionIsPercentage.width) {
                this._modalDiv.style.marginLeft = (-parseFloat(dims.width)/2) + 'vw';
            } else if (vhVwSupported) {
                largerThan90Percent = parseFloat(dims.width) > InkElement.viewportWidth() * 0.9;

                if (largerThan90Percent !== this._widthWasLargerThan90Percent || !largerThan90Percent || this._dimensionIsVariant.width) {
                    this._widthWasLargerThan90Percent = largerThan90Percent;

                    if (largerThan90Percent) {
                        this._modalDiv.style.marginLeft = '0';
                        this._modalDiv.style.left = '5vw';
                    } else {
                        this._modalDiv.style.marginLeft = (-parseFloat(dims.width)/2) + 'px';
                        this._modalDiv.style.left = '';
                    }
                }
            } else {
                this._modalDiv.style.marginLeft = (-InkElement.elementWidth(this._modalDiv)/2) + 'px';
            }
        },

        /**
         * Responsible for resizing the modal when the window's size changes.
         * 
         * @method _onResize
         * @private
         */
        _onResize: function( ){
            var dimensionsAreVariant = this._dimensionIsVariant.height || this._dimensionIsVariant.width;
            var dimensionIsPercentage = this._dimensionIsPercentage();
            var dimensionsArePercentage = !dimensionIsPercentage.height || !dimensionIsPercentage.width;

            if (dimensionsAreVariant) {
                this._resize();
            }

            if (!vhVwSupported || dimensionsAreVariant) {
                this._avoidModalLargerThanScreen();
            }

            if (!vhVwSupported || dimensionsArePercentage || dimensionsAreVariant) {
                this._reposition();
            }

            if (!flexSupported) {
                this._resizeContainer();
            }
        },

        /**
         * Handle clicks on the shade element.
         * 
         * @method _onShadeClick
         * @param {Event} ev DOM click event
         * @private
         */
        _onShadeClick: function(ev) {
            if (!this._isOpen) { return; }

            var tgtEl = Event.element(ev);

            if (tgtEl === this._modalShadow && this._options.closeOnClick) {
                this.dismiss();
            } else if (Css.hasClassName(tgtEl, 'ink-close') || Css.hasClassName(tgtEl, 'ink-dismiss') || 
                InkElement.findUpwardsBySelector(tgtEl, '.ink-close,.ink-dismiss') ||
                (
                    this._options.closeOnClick &&
                    (!InkElement.descendantOf(this._shadeElement, tgtEl) || (tgtEl === this._shadeElement))
                )
            ) {
                var alertsInTheModal = Selector.select('.ink-alert', this._shadeElement),
                    alertsLength = alertsInTheModal.length;
                for( var i = 0; i < alertsLength; i++ ){
                    if( InkElement.descendantOf(alertsInTheModal[i], tgtEl) ){
                        return;
                    }
                }

                this.dismiss();

                // Only stop the event if this dismisses this modal
                if (!this._isOpen) {
                    Event.stop(ev);
                }
            }
        },

        /**
         * Responsible for handling the escape key pressing.
         *
         * @method _onKeyDown
         * @param  {Event} ev
         * @private
         */
        _onKeyDown: function(ev) {
            if (ev.keyCode !== 27 || !this._isOpen) { return; }
            if (this._options.closeOnEscape &&
                    openModals[openModals.length - 1] === this) {
                this.dismiss();
                if (!this._isOpen) {
                    Event.stopDefault(ev);
                }
            }
        },

        _resize: function () {
            var dims = this._getDimensions();

            this._modalDiv.style.width = dims.width;
            this._modalDiv.style.height = dims.height;
        },

        _resizeContainer: function() {
            var containerHeight = InkElement.elementHeight(this._modalDiv);

            this._modalHeader = Selector.select('.modal-header',this._modalDiv)[0];
            if( this._modalHeader ){
                containerHeight -= InkElement.elementHeight(this._modalHeader);
            }

            this._modalFooter = Selector.select('.modal-footer',this._modalDiv)[0];
            if( this._modalFooter ){
                containerHeight -= InkElement.elementHeight(this._modalFooter);
            }

            this._contentContainer.style.height = containerHeight + 'px';

            if( this._markupMode ){ return; }
        },

        _resizeContainerFlex: function() {
            this._contentContainer.style.flex = '1';
            this._modalDiv.style.display = 'flex';
            this._modalDiv.style.flexDirection = 'column';
        },

        _avoidModalLargerThanScreen: function () {
            var dimensionIsPercentage = this._dimensionIsPercentage();

            if (!vhVwSupported) {
                var currentViewport = {
                    height: InkElement.viewportHeight(),
                    width: InkElement.viewportWidth()
                };

                var dims = this._getDimensions();

                InkArray.forEach(['height', 'width'], Ink.bind(function (dimension) {
                    // Not used for percentage measurements
                    if (dimensionIsPercentage[dimension]) { return; }

                    var dim = Math.round(currentViewport[dimension] * 0.9);

                    if (parseFloat(dims[dimension]) > dim) {
                        this._modalDiv.style[dimension] = dim + 'px';
                    } else {
                        if (isNaN(parseFloat(dims[dimension]))) { return; }
                        this._modalDiv.style[dimension] = parseFloat(dims[dimension]) + 'px';
                    }
                }, this));
            } else {
                if (!dimensionIsPercentage.width) {
                    this._modalDiv.style.maxWidth = '90vw';
                }
                if (!dimensionIsPercentage.height) {
                    this._modalDiv.style.maxHeight = '90vh';
                }
            }
        },

        /**************
         * PUBLIC API *
         **************/

        /**
         * Opens this Modal. 
         * Use this if you created the modal with `autoDisplay: false`
         * to open the modal when you want to.
         * @method open 
         * @param {Event} [event] (internal) In case its fired by the internal trigger.
         * @return {void}
         * @public
         */
        open: function(event) {
            /* jshint -W030 */

            if (this.isOpen()) { return false; }

            if( event ){ Event.stopDefault(event); }

            Css.addClassName( this._modalShadow,'ink-shade' );
            this._modalShadow.style.display = this._modalDiv.style.display = 'block';

            this._modalShadow.offsetHeight;  // Cause a reflow

            Css.addClassName( this._modalShadow, 'visible' );
            Css.addClassName( this._modalDiv, 'visible' );

            /**
             * Fallback to the old one
             */
            this._contentElement = this._modalDiv;
            this._shadeElement   = this._modalShadow;

            if( !this._markupMode ){
                /**
                 * Setting the content of the modal
                 */
                this.setContentMarkup( this._options.markup );
            }

            /**
             * If any size has been user-defined, let's set them as max-width and max-height
             */

            this._resize();

            // /**
            //  * Let's resize, place it:
            //  */
            this._avoidModalLargerThanScreen();
            this._reposition();
            if (!flexSupported) {
                this._resizeContainer();
            } else {
                this._resizeContainerFlex();
            }

            // /**
            //  * Responsive modals (they're responsive by default) will resize as the viewport resizes.
            //  * They need a resize handler if we're an old browser or they're not percentage-based
            //  * (because pixel-size-based iframes become larger than the viewport at some point).
            //  **/
            if( this._options.responsive ) {
                var isPercentage = this._dimensionIsPercentage();

                var needResizeHandler = !(
                    vhVwSupported &&
                    flexSupported &&
                    //Css.getStyle(this._modalDiv, 'display') !== 'block' &&
                    isPercentage.height &&
                    isPercentage.width &&
                    !this._dimensionIsVariant.height &&
                    !this._dimensionIsVariant.width );

                if (needResizeHandler) {
                    this._handlers.resize = Event.throttle(Ink.bind(this._onResize, this), 500);
                    Event.observe(window, 'resize', this._handlers.resize);
                }
            }

            if (this._options.onShow) {
                if (event) {
                    var trigger = InkElement.findUpwardsBySelector(
                            Event.element(event),
                            this._options.trigger);
                }

                this._options.onShow.call(this, this, {
                    trigger: trigger
                });
            }

            // // subscribe events
            Event.observe(this._shadeElement, 'click', this._handlers.click);
            if (this._options.closeOnEscape ) {
                Event.observe(document, 'keydown', this._handlers.keyDown);
            }

            this._isOpen = true;
            openModals.push(this);

            Css.addClassName(document.documentElement, 'ink-modal-open');
        },

        /**
         * Returns whether the modal is currently open.
         * @method isOpen
         * @return {Boolean} Whether the modal is open right now.
         * @public
         **/
        isOpen: function () {
            return this._isOpen;
        },

        /**
         * Closes the modal.
         * 
         * @method dismiss
         * @return {void}
         * @public
         */
        dismiss: function() {
            if (!this._isOpen) { /* Already dismissed. WTF IE. */ return; }

            if (this._options.onDismiss) {
                var ret = this._options.onDismiss(this);
                if (ret === false) { return; }
            }

            this._isOpen = false;

            if( this._handlers.resize ){
                Event.stopObserving(window, 'resize', this._handlers.resize);
            }

            // this._modalShadow.parentNode.removeChild(this._modalShadow);

            if( !this._markupMode ){
                this._modalShadow.parentNode.removeChild(this._modalShadow);
                this.destroy();
            } else {
                Css.removeClassName( this._modalDiv, 'visible' );
                Css.removeClassName( this._modalShadow, 'visible' );

                this._waitForFade(this._modalShadow, Ink.bind(function () {
                    this._modalShadow.style.display = 'none';
                }, this));
            }

            openModals = InkArray.remove(openModals, InkArray.keyValue(this, openModals), 1);

            if (openModals.length === 0) {  // Document level stuff now there are no modals in play.
                var htmlEl = document.documentElement;

                // Remove the class from the HTML element.
                Css.removeClassName(htmlEl, 'ink-modal-open');
            }
        },

        /**
         * Utility function to listen to the onTransmissionEnd event, or wait using setTimeouts
         *
         * Specific to this._element
         */
        _waitForFade: function (elem, callback) {
            if (!opacitySupported) { return callback(); }

            var fadeChecks = 5;
            var fadeChecker = function () {
                if( +Css.getStyle(elem, 'opacity') > 0 && fadeChecks > 0) {
                    fadeChecks--;
                    setTimeout(fadeChecker, 250);
                } else {
                    callback();
                }
            };

            setTimeout(fadeChecker, 500);
        },

        /**
         * Removes the modal from the DOM
         * 
         * @method destroy
         * @return {void}
         * @public
         */
        destroy: function() {
            Common.unregisterInstance(this._instanceId);
        },

        /**
         * Returns the content DOM element
         * 
         * @method getContentElement
         * @return {Element} Modal main cointainer.
         * @public
         */
        getContentElement: function() {
            return this._contentContainer || null;
        },

        /**
         * Returns the modal element
         *
         * @method getModalElement
         * @return {Element} Modal element
         * @public
         */
        getModalElement: function () {
            return this._modalDiv || null;
        },

        /**
         * Returns the modal shade (the page-covering dark shade element)
         *
         * @method getShadeElement
         * @return {Element} Modal shade
         * @public
         */
        getShadeElement: function () {
            return this._modalShadow || null;
        },

        /**
         * Replaces the content markup
         * 
         * @method setContentMarkup
         * @param {String} contentMarkup Markup to be placed inside the modal.
         * @return {void}
         * @public
         */
        setContentMarkup: function(contentMarkup) {
            if( !this._markupMode ){
                this._modalDiv.innerHTML = [contentMarkup].join('');
                this._contentContainer = Selector.select(".modal-body", this._modalDiv);
                if( !this._contentContainer.length ){
                    // throw 'Missing div with class "modal-body"';
                    var tempHeader = Selector.select(".modal-header", this._modalDiv);
                    var tempFooter = Selector.select(".modal-footer", this._modalDiv);

                    InkArray.each(tempHeader, InkElement.remove);
                    InkArray.each(tempFooter, InkElement.remove);

                    var body = document.createElement('div');
                    Css.addClassName(body,'modal-body');
                    body.innerHTML = this._modalDiv.innerHTML;
                    this._modalDiv.innerHTML = '';

                    var toAdd = tempHeader.concat([body]).concat(tempFooter);
                    InkArray.each(toAdd, Ink.bindMethod(this._modalDiv, 'appendChild'));

                    this._contentContainer = Selector.select(".modal-body",this._modalDiv);
                }
                this._contentContainer = this._contentContainer[0];
            } else {
                this._contentContainer.innerHTML = contentMarkup;
            }
            this._contentElement = this._modalDiv;
            this._resizeContainer();
        }
    };

    Common.createUIComponent(Modal, { elementIsOptional: true });

    Modal._vhVwSupported = vhVwSupported;
    Modal._flexSupported = flexSupported;

    return Modal;

});

/**
 * Pagination elements
 * @module Ink.UI.Pagination_1
 * @version 1
 */
 
Ink.createModule('Ink.UI.Pagination', '1',
    ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1'],
    function(Common, Event, Css, Element, Selector ) {
    'use strict';

    /**
     * Function to create the pagination links
     *
     * @method genAel
     * @private
     * @param  {String} innerHTML HTML to be placed inside the anchor.
     * @param  {String} index The page's index, for the data-index attribute. Omit this for the "next", "prev", etc. buttons.
     * @param  {Object} [options] Options object, containing:
     * @param  {Boolean} [options.wrapText] Whether to wrap text in a `<span>`
     * @return {Element} The created link element.
     */
    var genAEl = function(innerHTML, index, options) {
        var aEl = document.createElement('a');
        aEl.setAttribute('href', '#');
        if (typeof index === 'number') {
            aEl.setAttribute('data-index', index);
        }
        if(options && options.wrapText) {
            var spanEl = document.createElement('span');
            aEl.appendChild(spanEl);
            spanEl.innerHTML = innerHTML;
        } else {
            aEl.innerHTML = innerHTML;
        }
        return aEl;
    };

    /**
     * @class Ink.UI.Pagination
     * @constructor
     * @version 1
     * @param {String|Element}      selector                    Selector or element
     * @param {Object}              options                     Options
     * @param {Number}              [options.size]              Number of pages.
     * @param {Number}              [options.totalItemCount]    Total number of items to display
     * @param {Number}              [options.itemsPerPage]      Number of items per page.
     * @param {Number}              [options.maxSize]           If passed, only shows at most maxSize items. displays also first|prev page and next page|last buttons
     * @param {Number}              [options.start]             Start page. defaults to 1
     * @param {Boolean}             [options.sideButtons=true]  Whether to show the first, last, previous, next, previousPage and lastPage buttons. Do not use together with maxSize.
     * @param {String}              [options.firstLabel]        Text for the first page button. Defaults to 'First'.
     * @param {String}              [options.lastLabel]         Text for the last page button. Defaults to 'Last'.
     * @param {String}              [options.previousLabel]     Text for the previous button. Defaults to 'Previous'-
     * @param {String}              [options.nextLabel]         Text for the next button. Defaults to 'Next'
     * @param {String}              [options.previousPageLabel] Text for the previous page button. Defaults to 'Previous {Items per page}'.
     * @param {String}              [options.nextPageLabel]     Text for the next page button. Defaults to 'Next {Items per page}'.
     * @param {Function}            [options.onChange]          Callback to be called when a page changes. Called with `(thisPaginator, newPageNumber)`.
     * @param {String}              [options.hashParameter]     Parameter to use on setHash. Defaults to 'page'.
     * @param {String}              [options.parentTag]         HTML Tag used as the parent node.
     * @param {String}              [options.childTag]          HTML Tag used as the child nodes.
     * @param {String}              [options.wrapperClass]      CSS Class used in the wrapper element
     * @param {String}              [options.paginationClass]   CSS Class used in the pagination element
     * @param {String}              [options.activeClass]       CSS Class used to mark page as active
     * @param {String}              [options.disabledClass]     CSS Class used to mark page as disabled
     * @param {String}              [options.hideClass]         CSS Class used to hide elements
     * @param {String}              [options.previousClass]     CSS Class used in the previous element
     * @param {String}              [options.previousPageClass] CSS Class used in the previous page element
     * @param {String}              [options.nextClass]         CSS Class used in the next element
     * @param {String}              [options.nextPageClass]     CSS Class used in the next page element
     * @param {Function}            [options.numberFormatter]   Number formatter function. Receives a 0-indexed page number, and the page count. Returns the text for the numbered page button.
     * @param {Boolean}             [options.autoWrap=false]    Whether to navigate to first page when clicking next in last page or vice-versa.
     *
     * @sample Ink_UI_Pagination_1.html
     */
    function Pagination() {
        Common.BaseUIComponent.apply(this, arguments);
    }

    Pagination._name = 'Pagination_1';

    Pagination._optionDefinition = {
        size:              ['Integer', null],
        totalItemCount:    ['Integer', null],
        itemsPerPage:      ['Integer', null],
        maxSize:           ['Integer', null],
        start:             ['Integer', 1],
        sideButtons:       ['Boolean', 1 /* actually `true` but we want to see if user is using the default or not. */],
        // TODO add pagination-type which accepts color strings, "chevron" and "dotted". Basically classes to add to the UL.
        firstLabel:        ['String', 'First'],
        lastLabel:         ['String', 'Last'],
        previousLabel:     ['String', 'Previous'],
        nextLabel:         ['String', 'Next'],
        previousPageLabel: ['String', null],
        nextPageLabel:     ['String', null],
        onChange:          ['Function', undefined],
        hashParameter:     ['String', 'page'],
        parentTag:         ['String', 'ul'],
        childTag:          ['String', 'li'],
        wrapperClass:      ['String', 'ink-navigation'],
        paginationClass:   ['String', 'pagination'],
        activeClass:       ['String', 'active'],
        disabledClass:     ['String', 'disabled'],
        hideClass:         ['String', 'hide-all'],
        previousClass:     ['String', 'previous'],
        previousPageClass: ['String', 'previousPage'],
        nextClass:         ['String', 'next'],
        nextPageClass:     ['String', 'nextPage'],
        firstClass:        ['String', 'first'],
        lastClass:         ['String', 'last'],

        numberFormatter: ['Function', function(i) { return i + 1; }],
        autoWrap:          ['Boolean', false]
    };

    Pagination.prototype = {
        /**
         * Init function called by the constructor
         *
         * @method _init
         * @private
         */
        _init: function() {
            if (!this._options.previousPageLabel) {
                this._options.previousPageLabel = this._options.previousLabel + ' ' + this._options.maxSize;
            }

            if (!this._options.nextPageLabel) {
                this._options.nextPageLabel = this._options.nextLabel + ' ' + this._options.maxSize;
            }

            this._handlers = {
                click: Ink.bindEvent(this._onClick,this)
            };

            if (Common.isInteger(this._options.totalItemCount) && Common.isInteger(this._options.itemsPerPage)) {
                this._size = this._calculateSize(this._options.totalItemCount, this._options.itemsPerPage);
            } else if (Common.isInteger(this._options.size)) {
                this._size = this._options.size;
            } else {
                Ink.error('Ink.UI.Pagination: Please supply a size option or totalItemCount and itemsPerPage options.');
                this._size = 0;
            }

            this._current = this._options.start - 1;
            this._itemLiEls = [];

            // generate and apply DOM
            this._generateMarkup(this._element);

            this._updateItems();

            // subscribe events
            this._observe();
        },

        /**
         * Responsible for setting listener in the 'click' event of the Pagination element.
         *
         * @method _observe
         * @private
         */
        _observe: function() {
            Event.observeDelegated(this._element, 'click', '.' + this._options.paginationClass + ' > ' + this._options.childTag, this._handlers.click);
        },

        /**
         * Calculate how many pages are necessary for `count` items, and `itemsPerPage` items per page.
         *
         * @method _calculateSize
         * @param count
         * @param itemsPerPage
         * @private
         **/
        _calculateSize: function (count, itemsPerPage) {
            return Math.ceil(count / itemsPerPage);
        },
        /**
         * Updates the markup everytime there's a change in the Pagination object.
         *
         * @method _updateItems
         * @private
         */
        _updateItems: function() {
            var liEls = this._itemLiEls;

            var isSimpleToggle = this._size === liEls.length;

            var i, f, liEl;

            if (isSimpleToggle) {
                // just toggle active class
                for (i = 0, f = this._size; i < f; ++i) {
                    Css.setClassName(liEls[i], this._options.activeClass, i === this._current);
                }
            }
            else {
                // remove old items
                for (i = liEls.length - 1; i >= 0; --i) {
                    this._ulEl.removeChild(liEls[i]);
                }

                // add new items
                liEls = [];
                for (i = 0, f = this._size; i < f; ++i) {
                    liEl = document.createElement(this._options.childTag);
                    liEl.appendChild( genAEl( this._options.numberFormatter(i,this._size), i) );
                    // add "active" class if this is the active element.
                    Css.setClassName(liEl, this._options.activeClass, i === this._current);
                    if (this._nextEl) {
                        this._ulEl.insertBefore(liEl, this._nextEl);
                    } else {
                        this._ulEl.appendChild(liEl);
                    }

                    liEls.push(liEl);
                }
                this._itemLiEls = liEls;
            }

            if (this._options.maxSize) {
                // toggle visible items
                var page = Math.floor( this._current / this._options.maxSize );
                var pi = this._options.maxSize * page;
                var pf = pi + this._options.maxSize - 1;

                for (i = 0, f = this._size; i < f; ++i) {
                    liEl = liEls[i];
                    Css.setClassName(liEl, this._options.hideClass, i < pi || i > pf);
                }

                this._pageStart = pi;
                this._pageEnd = pf;
                this._page = page;

                Css.setClassName(this._prevPageEl, this._options.disabledClass, !this.hasPreviousPage());
                Css.setClassName(this._nextPageEl, this._options.disabledClass, !this.hasNextPage());

                Css.setClassName(this._firstEl, this._options.disabledClass, this.isFirst());
                Css.setClassName(this._lastEl, this._options.disabledClass, this.isLast());
            }

            // update prev and next
            if (this._prevEl && !this._options.autoWrap) {
                Css.setClassName(this._prevEl, this._options.disabledClass, !this.hasPrevious());
            }
            if (this._nextEl && !this._options.autoWrap) {
                Css.setClassName(this._nextEl, this._options.disabledClass, !this.hasNext());
            }
        },

        /**
         * Returns the top element for the gallery DOM representation
         *
         * @method _generateMarkup
         * @param {Element} el
         * @private
         */
        _generateMarkup: function(el) {
            Css.addClassName(el, 'ink-navigation');

            var ulEl = Ink.s('.' + this._options.paginationClass, el);
            var hasUlAlready = false;

            if( !ulEl ){
                ulEl = document.createElement(this._options.parentTag);
                Css.addClassName(ulEl, this._options.paginationClass);
            } else {
                hasUlAlready = true;
            }

            var isChevron = Css.hasClassName(ulEl, 'chevron');
            var isDotted = Css.hasClassName(ulEl, 'dotted');

            // Creates <li> elements for firstPage, nextPage, first, last, etc.
            var createLiEl = Ink.bind(function (name, options) {
                var liEl = document.createElement(this._options.childTag);
                var aEl = genAEl(this._options[name + 'Label'], undefined, { wrapText: options && options.wrapText });
                Css.addClassName(liEl, this._options[name + 'Class']);
                liEl.appendChild(aEl);
                ulEl.appendChild(liEl);
                return liEl;
            }, this);

            if (!isDotted && this._options.maxSize) {
                this._firstEl = createLiEl('first');
                this._prevPageEl = createLiEl('previousPage');
            }

            // When we're dotted, the default for sideButtons is `false`. When we're note, it's `true`.
            // Since the default is actually "1", we do a === true check when we're dotted, and a truthish check when we're not.
            var showSideButtons =
                (isDotted && isChevron) || // dotted chevron has side buttons
                (isDotted && !isChevron && this._options.sideButtons === true) ||
                (!isDotted && !!this._options.sideButtons);

            if (showSideButtons) {
                this._prevEl = createLiEl('previous', { wrapText: isChevron });
                this._nextEl = createLiEl('next', { wrapText: isChevron });
            }

            if (!isDotted && this._options.maxSize) {
                this._nextPageEl = createLiEl('nextPage');
                this._lastEl = createLiEl('last');
            }

            if( !hasUlAlready ){
                el.appendChild(ulEl);
            }

            this._ulEl = ulEl;
        },

        /**
         * Click handler
         *
         * @method _onClick
         * @param {Event} ev
         * @private
         */
        _onClick: function(ev) {
            Event.stopDefault(ev);

            var liEl = Event.element(ev);
            if ( Css.hasClassName(liEl, this._options.activeClass) ||
                 Css.hasClassName(liEl, this._options.disabledClass) ) { return; }

            var isPrev = Css.hasClassName(liEl, this._options.previousClass);
            var isNext = Css.hasClassName(liEl, this._options.nextClass);
            var isPrevPage = Css.hasClassName(liEl, this._options.previousPageClass);
            var isNextPage = Css.hasClassName(liEl, this._options.nextPageClass);
            var isFirst = Css.hasClassName(liEl, this._options.firstClass);
            var isLast = Css.hasClassName(liEl, this._options.lastClass);

            if (isFirst) {
                this.setCurrent(0);
            }
            else if (isLast) {
                this.setCurrent(this._size - 1);
            }
            else if (isPrevPage || isNextPage) {
                this.setCurrent( (isPrevPage ? -1 : 1) * this._options.maxSize,
                    true /* relative */,
                    !!this._options.autoWrap /* whether to wrap */);
            }
            else if (isPrev || isNext) {
                this.setCurrent(isPrev ? -1 : 1,
                    true /* relative */,
                    !!this._options.autoWrap /* whether to wrap */);
            }
            else {
                var aElem = Selector.select('[data-index]', liEl)[0];
                var nr = aElem && parseInt( aElem.getAttribute('data-index'), 10);
                this.setCurrent(nr);
            }
        },


        /**
         * Allows you to subscribe to the onChange event
         *
         * @method setOnChange
         * @param {Function} onChange Callback called with `(thisPaginator, newPageNumber)`.
         * @return {void}
         * @public
         */
        setOnChange: function (onChange) {
            if (onChange && typeof onChange !== 'function') {
                throw new TypeError('onChange option must be a function!');
            }
            this._options.onChange = onChange;
        },

        /**************
         * PUBLIC API *
         **************/

        /**
         * Sets the number of pages to `sz`
         *
         * @method setSize
         * @param {Number} sz number of pages
         * @return {void}
         * @public
         */
        setSize: function(sz) {
            if (!Common.isInteger(sz)) {
                throw new TypeError('1st argument must be an integer number!');
            }

            this._size = sz;
            this._updateItems();
            this._current = 0;
        },

        /**
         * An alternative to setSize, to define the number of pages in the Paginator.
         *
         * If you don't know how many pages you want, but know the amount of items you have and how many of them you want on each page, use this.
         *
         * @method setSizeInItems
         * @param {Number} totalItems       Total number of items
         * @param {Number} itemsPerPage     Items per page
         * @return {void}
         * @public
         */
        setSizeInItems: function (totalItems, itemsPerPage) {
            var pageNumber = Math.ceil(totalItems / itemsPerPage);
            this.setSize(pageNumber);
        },

        /**
         * Sets the current page. First page is 0.
         *
         * @method setCurrent
         * @param {Number} nr           Sets the current page to given number.
         * @param {Boolean} [isRelative=false] If you set this to `true`, the function will perform a relative change. (example: setCurrent(1) will move to the next page, while setCurrent(-1) will move to the previous page)
         * @param {Boolean} [wrap=false] Set this to true to wrap to the first page when moving past the last, and to wrap to the last page when moving before the first one.
         * @return {void}
         * @public
         */
        setCurrent: function(nr, isRelative, wrap) {
            if (!Common.isInteger(nr)) {
                throw new TypeError('1st argument must be an integer number!');
            }

            if (isRelative) {
                nr += this._current;
            }

            if (wrap) {
                nr %= this._size;

                if (nr < 0) {
                    nr += this._size;
                }
            } else {
                if (nr > this._size - 1) {
                    nr = this._size - 1;
                }

                if (nr < 0) {
                    nr = 0;
                }
            }

            this._current = nr;
            this._updateItems();

            if (this._options.onChange) {
                this._options.onChange(this, nr);
            }

            /*if (this._options.setHash) {
                var o = {};
                o[this._options.hashParameter] = nr;
                Common.setHash(o);
            }*/  // undocumented option, removing
        },

        /**
         * Navigates to next item
         *
         * @method next
         * @param {Boolean} [wrap=false] Set this to true if you want to go to the first item when going after the last item.
         * @return {void}
         * @public
         **/
        next: function (wrap) {
            this.setCurrent(1, true /*relative*/, wrap);
        },

        /**
         * Navigates to the previous item
         *
         * @method previous
         * @param {Boolean} [wrap=false] Set this to true if you want to go to the last item when going before the first item.
         * @return {void}
         * @public
         **/
        previous: function (wrap) {
            this.setCurrent(-1, true /*relative*/, wrap);
        },

        /**
         * Gets the number of pages
         *
         * @method getSize
         * @return {Number} Number of pages
         * @public
         */
        getSize: function() {
            return this._size;
        },

        /**
         * Gets the current page index. First page is 0.
         *
         * @method getCurrent
         * @return {Number} Current page
         * @public
         */
        getCurrent: function() {
            return this._current;
        },

        /**
         * Checks if it's at the first page
         *
         * @method isFirst
         * @return {Boolean} True if at first page
         * @public
         */
        isFirst: function() {
            return this._current === 0;
        },

        /**
         * Checks if it's on the last page
         *
         * @method isLast
         * @return {Boolean} True if at last page
         * @public
         */
        isLast: function() {
            return this._current === this._size - 1;
        },

        /**
         * Checks if it has previous pages
         *
         * @method hasPrevious
         * @return {Boolean} True if has prior pages
         * @public
         */
        hasPrevious: function() {
            return this._current > 0;
        },

        /**
         * Checks if it has next pages
         *
         * @method hasNext
         * @return {Boolean} True if has pages ahead
         * @public
         */
        hasNext: function() {
            return this._current < this._size - 1;
        },

        /**
         * Checks if it has a previous set of pages
         *
         * @method hasPreviousPage
         * @return {Boolean} Returns true iif has prior set of page(s)
         * @public
         */
        hasPreviousPage: function() {
            return this._options.maxSize && this._current > this._options.maxSize - 1;
        },

        /**
         * Checks if it has a next set of pages
         *
         * @method hasNextPage
         * @return {Boolean} Returns true iif has set of page(s) ahead
         * @public
         */
        hasNextPage: function() {
            return this._options.maxSize && this._size - this._current >= this._options.maxSize + 1;
        },

        /**
         * Unregisters the component and removes its markup
         *
         * @method destroy
         * @public
         */
        destroy: Common.destroyComponent
    };

    Common.createUIComponent(Pagination);

    return Pagination;

});

/**
 * Animated progress bars
 * @module Ink.UI.ProgressBar_1
 * @version 1
 */

Ink.createModule('Ink.UI.ProgressBar', '1', ['Ink.UI.Common_1', 'Ink.Dom.Selector_1'], function( Common, Selector ) {
    'use strict';

    /**
     * Associated to a .ink-progress-bar element, it provides a setValue() method to change the element's value.
     * 
     * @class Ink.UI.ProgressBar
     * @constructor
     * @version 1
     * @param {String|Element}      selector                Element or selector
     * @param {Object}              [options]               Options object
     * @param {Number}              [options.startValue]    Percentage of the bar that is filled. Ranges between 0 and 100. Default: 0
     * @param {Function}            [options.onStart]       Callback called when a change of value is started
     * @param {Function}            [options.onEnd]         Callback called when a change of value ends
     *
     * @sample Ink_UI_ProgressBar_1.html
     */
    function ProgressBar(){
        Common.BaseUIComponent.apply(this, arguments);
    }

    ProgressBar._name = 'ProgressBar_1';

    ProgressBar._optionDefinition = {
        startValue: ['Number', 0],
        onStart: ['Function', function () {}],
        onEnd: ['Function', function () {}]
    };

    ProgressBar.prototype = {
        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function(){
            this._value = this._options.startValue;
            this._elementBar = Selector.select('.bar',this._element);
            if( this._elementBar.length < 1 ){
                throw new Error('[Ink.UI.ProgressBar] :: Bar element not found');
            }
            this._elementBar = this._elementBar[0];

            this.setValue( this._options.startValue );
        },

        /**
         * Sets the value of the Progressbar
         * 
         * @method setValue
         * @param {Number} newValue Numeric value, between 0 and 100, that represents the percentage of the bar.
         * @return {void}
         * @public
         */
        setValue: function( newValue ){
            this._options.onStart.call(this, this._value);

            newValue = parseInt(newValue,10);
            if( isNaN(newValue) || (newValue < 0) ){
                newValue = 0;
            } else if( newValue>100 ){
                newValue = 100;
            }
            this._value = newValue;
            this._elementBar.style.width = this._value + '%';

            this._options.onEnd.call(this, this._value);
        }
    };

    Common.createUIComponent(ProgressBar);

    return ProgressBar;

});

/**
 * Scroll to content
 * @module Ink.UI.SmoothScroller_1
 * @version 1
 */
Ink.createModule('Ink.UI.SmoothScroller', '1', ['Ink.UI.Common_1', 'Ink.Dom.Event_1', 'Ink.Dom.Element_1', 'Ink.Dom.Selector_1','Ink.Dom.Css_1'], function(Common, Event, InkElement, Selector, Css) {
    'use strict';

    var requestAnimationFrame =
        window.requestAnimationFrame ||
        function (cb) { return setTimeout(cb, 10); };

    var cancelAnimationFrame =
        window.cancelAnimationFrame ||
        function (id) { clearTimeout(id); };

    /**
     * @namespace SmoothScroller
     * @version 1
     * @static
     *
     * SmoothScroller is a component which replaces the default scroll-to behaviour of `<a>` tags which refer to IDs on the page.
     *
     * For example, when you have this:
     *
     *          <a href="#todo">Todo</a>
     *              [...]
     *          <section id="todo">
     *              [...]
     *
     * You can click the `<a>` and the page will scroll until the section you pointed to.
     *
     * When you use SmoothScroller, instead of immediately scrolling to the element, you get a smooth motion.
     *
     * Also, you can define the data-margin option if you have a `position:fixed` top menu ruining the behaviour.
     *
     * @example
     *
     */
    var SmoothScroller = {

        /**
         * The default scrolling speed. Higher is slower. Defaults to 10.
         *
         * @property speed
         * @type {Number}
         * @default 10
         * @static
         */
        speed: 10,

        /**
         * Change the URL hash (location.hash) when done scrolling? Defaults to true.
         *
         * @property changeHash
         * @default true
         * @type {Boolean}
         * @static
         */
        changeHash: true,

        /**
         * The default top margin.
         * Use this when you want the scroll motion to stop before it reaches its destination, for example when you want to add some breathing space or have a position:fixed top bar in front of your content.
         *
         * @property margin
         * @default 0
         * @type {Number}
         * @static
         */
        margin: 0,


        /**
         * Moves the scrollbar to the target element. This is the function
         * which animates the scroll position bit by bit. It calls itself in
         * the end through requestAnimationFrame
         *
         * @method scroll
         * @param  {Number} scrollTop Y coordinate value to stop at
         * @param  {Object} options Option hash containing:
         * @param  {Number} [options.margin] Set this to non-zero to leave a margin between the top of the page and your element. Useful if you have a top bar with `position: fixed`.
         * @param  {Number} [options.speed] Inverse scrolling speed. Smaller is faster.
         * @return {void}
         * @public
         * @static
         */
        scroll: function(scrollTop, options) {
            var a = Math.round(InkElement.scrollHeight());

            var endPos = Math.round(scrollTop - (options.margin || 0));

            if (endPos > a) {
                a += Math.ceil((endPos - a) / options.speed);
            } else {
                a = a + (endPos - a) / options.speed;
            }

            cancelAnimationFrame(SmoothScroller.interval);

            if (!((a) === endPos || SmoothScroller.offsetTop === a)) {
                SmoothScroller.interval = requestAnimationFrame(
                    Ink.bindMethod(SmoothScroller, 'scroll', scrollTop, options), document.body);
            } else {
                SmoothScroller.onDone(options);
            }

            window.scrollTo(0, a);
            SmoothScroller.offsetTop = a;
        },


        /**
         * Has smooth scrolling applied to relevant elements upon page load.
         * Listens to the click event on the document.
         * Anything which matches the selector will be considered a "link" by SmoothScroller and handled as such.
         *
         * When a link is clicked, it is checked for several options:
         * - `data-margin="0"` - A margin in pixels -- useful when you have a position:fixed top bar.
         * - `data-speed="10"` - Inverse speed of the scrolling motion. Smaller is faster.
         * - `data-change-hash="true"` - Change the URL hash (location.hash) when done scrolling.
         *
         * @method init
         * @param {String} [selector='a.scrollableLink,a.ink-smooth-scroll'] Selector string for finding links with smooth scrolling enabled.
         * @return {void}
         * @static
         * @sample Ink_UI_SmoothScroller_1.html
         */
        init: function(selector) {
            Event.on(document, 'click', selector || 'a.scrollableLink, a.ink-smooth-scroll', SmoothScroller.onClick);
        },

        // Deprecated. Kept around just in case someone is still calling this.
        render: function() {},

        /**
         * Handles clicks on link elements
         *
         * @method onClick
         * @param {Event} event DOM click event.
         * @return {void}
         * @private
         * @static
         */
        onClick: function(event) {
            var link = event.currentTarget;

            var thisDocument =    (location + '').replace(/#.*?$/, '');
            var linkedDocument = (link.href + '').replace(/#.*?$/, '');

            if (linkedDocument !== thisDocument) {
                return; // It's an external link.
            }

            var hash = link.getAttribute('data-hash') || (link.getAttribute('href') || '')
                .replace(/^.*?#/, '');

            if(hash) {
                event.preventDefault();
                var selector = 'a[name="' + hash + '"],#' + hash;

                var elm = Ink.s(selector);
                var closestUL = InkElement.findUpwardsBySelector(link, 'ul');

                if (closestUL) {
                    var currentlyActive = Ink.s('li.active', closestUL);
                    Css.removeClassName(currentlyActive, 'active')
                }

                if (elm) {
                    if (link.parentNode && link.parentNode.tagName.toLowerCase() === 'li') {
                        Css.addClassName(link.parentNode, 'active');
                    }

                    var options = Common.options('SmoothScroller link options', {
                        margin: ['Number', SmoothScroller.margin],
                        speed: ['Number', SmoothScroller.speed],
                        changeHash: ['Boolean', SmoothScroller.changeHash]
                    }, {}, link);

                    SmoothScroller.hash = hash;
                    
                    SmoothScroller.scroll(InkElement.offsetTop(elm), options);
                }
            }
        },

        /**
         * Called when the scroll movement is done. Updates browser address.
         *
         * @method onDone
         * @param {Object} options Options object from the element.
         * @return {void}
         * @private
         */
        onDone: function (options) {
            if (options.changeHash === true) {
                window.location.hash = SmoothScroller.hash;
            }

            SmoothScroller.hash = SmoothScroller.offsetTop = null;
        }
    };

    return SmoothScroller;

});

/**
 * Sortable lists
 * @module Ink.UI.SortableList_1
 * @version 1
 */

Ink.createModule('Ink.UI.SortableList', '1', ['Ink.UI.Common_1','Ink.Dom.Css_1','Ink.Dom.Event_1','Ink.Dom.Element_1','Ink.Dom.Selector_1'], function( Common, Css, Events, Element, Selector ) {
    'use strict';
    var hasTouch = (('ontouchstart' in window) ||       // html5 browsers
                    (navigator.maxTouchPoints > 0) ||   // future IE
                    (navigator.msMaxTouchPoints > 0));

    /**
     * Adds sortable behaviour to any list.
     * 
     * @class Ink.UI.SortableList
     * @constructor
     * @version 1
     * @param {String|Element}      selector                            The list you wish to be sortable.
     * @param {String}              [options.placeholderClass]          CSS class added to the "ghost" element being dragged around. Defaults to 'placeholder'.
     * @param {String}              [options.draggedClass]              CSS class added to the original element being dragged around. Defaults to 'hide-all'.
     * @param {String}              [options.draggingClass]             CSS class added to the html element when the user is dragging. Defaults to 'dragging'.
     * @param {String}              [options.dragSelector]              CSS selector for the drag enabled nodes. Defaults to 'li'.
     * @param {String}              [options.handleSelector]            CSS selector for the drag handle. If present, you can only drag nodes by this selector.
     * @param {String}              [options.moveSelector]              CSS selector to validate a node move. If present, you can only move nodes inside this selector.
     * @param {Boolean}             [options.swap]                      Flag to swap dragged element and target element instead of reordering it.
     * @param {Boolean}             [options.cancelMouseOut]            Flag to cancel draggin if mouse leaves the container element.
     * @param {Function}            [options.onDrop]                    Callback to be executed after dropping an element. Receives { droppedElement: Element } as an argument.
     *
     * @sample Ink_UI_SortableList_1.html
     */
    function SortableList() {
        Common.BaseUIComponent.apply(this, arguments);
    }

    SortableList._name = 'SortableList_1';

    SortableList._optionDefinition = {
        'placeholderClass': ['String', 'placeholder'],
        'draggedClass': ['String', 'hide-all'],
        'draggingClass': ['String', 'dragging'],
        'dragSelector': ['String', '> li'],
        'handleSelector': ['String', ':not(button, button *, a[href], a[href] *)'],
        'moveSelector': ['String', false],
        'swap': ['Boolean', false],
        'cancelMouseOut': ['Boolean', false],
        'onDrop': ['Function', function(){}]
    };

    SortableList.prototype = {
        /**
         * Init function called by the constructor.
         * 
         * @method _init
         * @private
         */
        _init: function() {
            this._handlers = {
                down: Ink.bind(this._onDown, this),
                move: Ink.bind(this._onMove, this),
                up:   Ink.bind(this._onUp, this)
            };

            this._isMoving = false;

            this._down = hasTouch ? 'touchstart mousedown' : 'mousedown';
            this._move = hasTouch ? 'touchmove mousemove' : 'mousemove';
            this._up   = hasTouch ? 'touchend mouseup' : 'mouseup';

            this._observe();
        },

        /**
         * Sets the event handlers.
         * 
         * @method _observe
         * @private
         */
        _observe: function() {
            Events.on(this._element, this._down, this._options.dragSelector, this._handlers.down);
            Events.on(this._element, this._move, this._options.dragSelector, this._handlers.move);
            if(this._options.cancelMouseOut) {
                Events.on(this._element, 'mouseleave', Ink.bind(this.stopMoving, this));
            }
            Events.on(document.documentElement, this._up, this._handlers.up);
        },

        /**
         * Mousedown or touchstart handler
         * 
         * @method _onDown
         * @param {Event} ev
         * @private
         */
        _onDown: function(ev) {
            if (this._isMoving || this._placeholder) { return; }
            var tgtEl = ev.currentTarget;
            if(this._options.handleSelector &&
                    Ink.s(this._options.handleSelector, this._currentTarget)) {
                var handle = Element.findUpwardsBySelector(ev.target, this._options.handleSelector);

                if (!(handle && (Element.isAncestorOf(tgtEl, handle) || tgtEl === handle))) {
                    return;
                }
            }
            this._isMoving = tgtEl;
            this._placeholder = tgtEl.cloneNode(true);
            this._movePlaceholder(tgtEl);
            this._addMovingClasses();
            return false;
        },

        /**
         * Mousemove or touchmove handler
         * 
         * @method _onMove
         * @param {Event} ev
         * @private
         */
        _onMove: function(ev) {
            var target = ev.currentTarget;

            // Touch events give you the element where the finger touched first,
            // not the element under it like mouse events.
            if (ev.type === 'touchmove') {
                var touch = ev.touches[0];
                target = document.elementFromPoint(touch.clientX, touch.clientY);
                target = Element.findUpwardsBySelector(target, this._options.dragSelector);
            }

            this.validateMove(target);
            ev.preventDefault();
        },

        /**
         * Mouseup or touchend handler
         * 
         * @method _onUp
         * @param {Event} ev
         * @private
         */
        _onUp: function(ev) {
            if (!this._isMoving || !this._placeholder) { return; }
            if (ev.currentTarget === this._isMoving) { return; }
            if (ev.currentTarget === this._placeholder) { return; }
            Element.insertBefore(this._isMoving, this._placeholder);
            this.stopMoving();
            this._options.onDrop.call(this, { droppedElement: ev.currentTarget });
            return false;
        },

        /**
         * Adds the CSS classes to interactive elements
         * 
         * @method _addMovingClasses
         * @private
         */
        _addMovingClasses: function(){
            Css.addClassName(this._placeholder, this._options.placeholderClass);
            Css.addClassName(this._isMoving, this._options.draggedClass);
            Css.addClassName(document.documentElement, this._options.draggingClass);
        },

        /**
         * Removes the CSS classes from interactive elements
         * 
         * @method _removeMovingClasses
         * @private
         */
        _removeMovingClasses: function(){
            if(this._isMoving) { Css.removeClassName(this._isMoving, this._options.draggedClass); }
            if(this._placeholder) { Css.removeClassName(this._placeholder, this._options.placeholderClass); }
            Css.removeClassName(document.documentElement, this._options.draggingClass);
        },

        /**
         * Moves the placeholder element relative to the target element
         * 
         * @method _movePlaceholder
         * @param {Element} target_position
         * @private
         */
        _movePlaceholder: function(target){
            var placeholder = this._placeholder,
                target_position,
                placeholder_position,
                from_top,
                from_left;
            if(!placeholder) {
                Element.insertAfter(placeholder, target);
            } else if(this._options.swap){
                Element.insertAfter(placeholder, target);
                Element.insertBefore(target, this._isMoving);
                Element.insertBefore(this._isMoving, placeholder);
            } else {
                target_position = Element.offset(target);
                placeholder_position = Element.offset(this._placeholder);
                from_top = target_position[1] > placeholder_position[1];
                from_left = target_position[0] > placeholder_position[0];
                if( ( from_top && from_left ) || ( !from_top && !from_left ) ) {
                    Element.insertBefore(placeholder, target);
                } else {
                    Element.insertAfter(placeholder, target);
                }
                Element.insertBefore(this._isMoving, placeholder);
            }
        },

        /**************
         * PUBLIC API *
         **************/

        /**
         * Unregisters the component and removes its markup
         * 
         * @method destroy
         * @public
         */
        destroy: Common.destroyComponent,

        /**
         * Visually stops moving. 
         * Removes the placeholder as well as the styling classes.
         * 
         * @method _movePlaceholder
         * @public
         */
        stopMoving: function(){
            this._removeMovingClasses();
            Element.remove(this._placeholder);
            this._placeholder = false;
            this._isMoving = false;
        },

        /**
         * Validate a move.
         * This method is used by the move handler
         * 
         * @method _movePlaceholder
         * @param {Element} elem
         * @public
         */
        validateMove: function(elem){
            if (!elem || !this._isMoving || !this._placeholder) { return; }
            if (elem === this._placeholder) { return; }
            if (elem === this._isMoving) { return; }
            if(!this._options.moveSelector || Selector.matchesSelector(elem, this._options.moveSelector)){
                this._movePlaceholder(elem);
            } else {
                this.stopMoving();  
            }
        }

    };

    Common.createUIComponent(SortableList);

    return SortableList;
});

/**
 * Highlight elements as you scroll
 * @module Ink.UI.Spy_1
 * @version 1
 */
Ink.createModule('Ink.UI.Spy', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1'], function(Common, Event, Css, Element, Selector ) {
    'use strict';

    // Maps a spy target (EG a menu with links inside) to spied instances.
    var spyTargets = [
        // [target, [spied, spied, spied...], { margin }], ...
    ];

    function targetIndex(target) {
        for (var i = 0, len = spyTargets.length; i < len; i++) {
            if (spyTargets[i][0] === target) {
                return i;
            }
        }
        return null;
    }

    function addSpied(spied, target, options) {
        var index = targetIndex(target);

        if (index === null) {
            spyTargets.push([target, [spied], options]);
        } else {
            spyTargets[index][1].push(spied);
        }
    }

    var observingOnScroll = false;
    function observeOnScroll() {
        if (!observingOnScroll) {
            observingOnScroll = true;
            Event.observe(document, 'scroll', Event.throttle(onScroll, 300));
        }
    }

    function onScroll() {
        for (var i = 0, len = spyTargets.length; i < len; i++) {
            onScrollForTarget(spyTargets[i][0], spyTargets[i][1], spyTargets[i][2]);
        }
    }

    function onScrollForTarget(target, spied, options) {
        var activeEl = findActiveElement(spied, options);

        // This selector finds li's to deactivate
        var toDeactivate = Selector.select('li.active', target);
        for (var i = 0, total = toDeactivate.length; i < total; i++) {
            Css.removeClassName(toDeactivate[i], 'active');
        }

        if (activeEl === null) {
            return;
        }

        // The link which should be activated has a "href" ending with "#" + name or id of the element
        var menuLinkSelector = 'a[href$="#' + (activeEl.name || activeEl.id) + '"]';

        var toActivate = Selector.select(menuLinkSelector, target);
        for (i = 0, total = toActivate.length; i < total; i++) {
            Css.addClassName(Element.findUpwardsByTag(toActivate[i], 'li'), 'active');
        }
    }

    function findActiveElement(spied, options) {
        /* 
         * Find the element above the top of the screen, but closest to it.
         *          _____ 
         *         |_____| element 1  (active element)
         *
         *      ------------------------ 
         *     |    _____               |
         *     |   |     |  element 2   |
         *     |   |     |              |
         *     |   |_____|              |
         *      ------- Viewport ------- 
         */

        // Remember that getBoundingClientRect returns coordinates
        // relative to the top left corner of the screen.
        //
        // So checking if it's < 0 is used to tell if
        // the element is above the top of the screen.
        var closest = -Infinity;
        var closestIndex;
        var top;
        for( var i = 0, total = spied.length; i < total; i++ ){
            top = spied[i].getBoundingClientRect().top;
            if (options.margin) {
                top -= options.margin;
            }
            if (top <= 0 && top > closest) {
                closest = top;
                closestIndex = i;
            }
        }
        if (closestIndex === undefined) {
            return null;
        } else {
            return spied[closestIndex];
        }
    }

    /**
     * Spy is an UI component which tells the user which section is currently visible.
     * Spy can be used to highlight a menu item for the section which is visible to the user.
     * You need two things: A menu element (which contains your links inside `li` tags), and an element containing your section's content.
     * The links must be inside `li` tags. These will get the 'active' class, to signal which item is currently visible. In your CSS you need to add styling for this class.
     * To use Ink.UI.Spy for more than one section, loop through your sections (as you see in the sample below), or just load `autoload.js` and set add the `data-spy="true"` attribute to your sections.
     * The currently visible element's corresponding link in the menu gets the 'visible' class added to it.
     *
     * @class Ink.UI.Spy
     * @constructor
     * @version 1
     * @param {String|Element}    selector              The spied element
     * @param {Object}            [options] Options
     * @param {Element|String}    options.target    Target menu where the spy will highlight the right option.
     * @param {Number}            [options.margin=0] A margin from the top of the screen. Use this if you have a `position:fixed` top bar on your site.
     *
     * @sample Ink_UI_Spy_1.html
     */
    function Spy(){
        Common.BaseUIComponent.apply(this, arguments);
    }

    Spy._name = 'Spy_1';

    Spy._optionDefinition = {
        target: ['Element', undefined],
        margin: ['Number', 0]
    };

    Spy.prototype = {
        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function() {
            addSpied(this._element, this._options.target, this._options);
            observeOnScroll();
            onScroll();
        }
    };

    Common.createUIComponent(Spy);

    return Spy;

});

/**
 * Stacking items in columns
 * @module Ink.UI.Stacker_1
 * @version 1
 **/

Ink.createModule('Ink.UI.Stacker', 1, ['Ink.UI.Common_1', 'Ink.Dom.Event_1', 'Ink.Dom.Element_1'], function(Common, InkEvent, InkElement) {
    'use strict';

function Stacker() {
    Common.BaseUIComponent.apply(this, arguments);
}

Stacker._name = 'Stacker_1';

Stacker._optionDefinition = {
    column: ['String', '.stacker-column'],
    item: ['String', '.stacker-item'],

    // [3.2.0] review this when we have info about our breakpoints from the CSS
    customBreakPoints: ['Object', null], // Must be: {xlarge: {max: 9999, min: 1281, cols: 5}, large:{max:1280, min:1001, cols:4} medium:{max:1000, min:801,cols:3}, ...etc..}
    largeMax: ['Number', Number.MAX_VALUE],
    largeMin: ['Number', 961],
    mediumMax: ['Number', 960],
    mediumMin: ['Number', 651],
    smallMax: ['Number', 650],
    smallMin: ['Number', 0],

    largeCols: ['Integer', 3],
    mediumCols: ['Integer', 2],
    smallCols: ['Integer', 1],

    isOrdered: ['Boolean', true],
    onRunCallback: ['Function', null],
    onResizeCallback: ['Function', null],
    onAPIReloadCallback: ['Function', null]
};

Stacker.prototype = {
    /**
     * This module combines several stacks of items together, in smaller screen sizes.
     *
     * The purpose is to have several stacks of items which may have different heights and as such cannot be used because of `float: left` quirks.
     *
     * For example, when you have three different columns of information:
     *
     *     [col. A: 1] [col. B: 1] [col. C: 1]
     *     [col. B: 2] [col. C: 2] [col. C: 2]
     *
     * and the screen resizes and you need a layout of 2 columns, Stacker reorders the stacks so that you get:
     *
     *     [col. A: 1] [col. B: 1]
     *     [col. C: 1] [col. A: 2]
     *     [col. B: 2] [col. C: 2]
     * 
     * Note: If you just want to use a different amount of columns for your items in several viewports, but these items are guaranteed to have a fixed height, don't use this module. Use the `small-*`, `medium-*` and `large-*` classes instead.
     *
     * @class Ink.UI.Stacker_1
     *
     * @constructor
     * @param {Element|String}      [container]                                     Element which contains the stacks (identified by the options.column selector)
     * @param {Object}              [options]                                       Options object.
     * @param {String}              [options.column]                                Selector for the the columns inside the container element. Defaults to '.stacker-column'.
     * @param {String}              [options.item]                                  Selector for the items in your stack. Defaults to '.stacker-item'.
     * @param {Object}              [options.customBreakPoints]                     Options for each breakpoint name. Use this if you have more breakpoints than Ink by default (`large`, `medium`, `small`)
     * @param {Object}              [options.customBreakpoints.BREAKPOINT_NAME]     Custom breakpoints object.
     * @param {String}              options.customBreakpoints.BREAKPOINT_NAME.max   Maximum screen size as seen in your media query
     * @param {String}              options.customBreakpoints.BREAKPOINT_NAME.min   Minimum screen size as seen in your media query
     * @param {String}              options.customBreakpoints.BREAKPOINT_NAME.cols  Column count for this size.
     * @param {Number}              [options.largeMax]                              Upper bound of `large` breakpoint
     * @param {Number}              [options.largeMin]                              Lower bound of `large` breakpoint. Defaults to 961.
     * @param {Number}              [options.mediumMax]                             Upper bound of `medium` breakpoint. Defaults to 960.
     * @param {Number}              [options.mediumMin]                             Lower bound of `medium` breakpoint. Defaults to 651.
     * @param {Number}              [options.smallMax]                              Upper bound of `small` breakpoint. Defaults to 650.
     * @param {Number}              [options.smallMin]                              Lower bound of `small` breakpoint
     *
     * @param {Integer}             [options.largeCols]                             Number of columns in the `large` viewport. Defaults to 3.
     * @param {Integer}             [options.mediumCols]                            Number of columns in the `medium` viewport. Defaults to 2.
     * @param {Integer}             [options.smallCols]                             Number of columns in the `small` viewport. Defaults to 1.
     *
     * @param {Boolean}             [options.isOrdered]                             When false, doesn't reorder stacks when combining them.
     * @param {Function}            [options.onRunCallback]                         Called when instantiated.
     * @param {Function}            [options.onResizeCallback]                      Called when the window resizes.
     * @param {Function}            [options.onAPIReloadCallback]                   Called when the reload function executes.
     *
     * @sample Ink_UI_Stacker_1.html
     **/
    _init: function() {
        this._aList = []; 

        this._curLayout = 'large';

        // [todo] is this needed?
        this._runFirstTime = false;

        this._getPageItemsToList();

        if(this._canApplyLayoutChange() || !this._runFirstTime) {
            this._runFirstTime = true;
            this._applyLayoutChange();
            if(typeof(this._options.onRunCallback) === 'function') {
                this._options.onRunCallback(this._curLayout);
            }
        }
        this._addEvents();
    },

    /**
     * Adds an item to the end of your stacks.
     * Call `reloadItems()` when you are done adding items.
     *
     * @method addItem
     * @param {Element} item     Element
     * @return {void}
     * @public
     **/
    addItem: function(item) {
        this._aList.push(item);
    },

    /**
     * Updates the layout of your items.
     * Call this method after adding items or changing their dimensions. This method is automatically called when the window resizes.
     *
     * @method reloadItems
     * @return {void}
     * @public
     **/
    reloadItems: function() {
        this._applyLayoutChange();
        if(typeof(this._options.onAPIReloadCallback) === 'function') {
            this._options.onAPIReloadCallback(this._curLayout);
        }
    },

    _addEvents: function() {
        InkEvent.observe(window, 'resize', Ink.bindEvent(this._onResize, this));
    },

    _onResize: function() {
        if(this._canApplyLayoutChange()) {
            this._removeDomItems();
            this._applyLayoutChange();
            if(typeof(this._options.onResizeCallback) === 'function') {
                this._options.onResizeCallback(this._curLayout);
            }
        }
    },

    _setCurLayout: function() {
        var viewportWidth = InkElement.viewportWidth();
        if(this._options.customBreakpoints && typeof(this._options.customBreakPoints) === 'object') {
            for(var prop in this._options.customBreakPoints) {
                if(this._options.customBreakPoints.hasOwnProperty(prop)) {
                    if(viewportWidth >= Number(this._options.customBreakPoints[prop].min) && viewportWidth <= Number(this._options.customBreakPoints[prop].max) && this._curLayout !== prop) {
                        this._curLayout = prop;
                        return;
                    } 
                }
            }
        } else {
            if(viewportWidth <= Number(this._options.largeMax) && viewportWidth >= Number(this._options.largeMin) && this._curLayout !== 'large') {
                this._curLayout = 'large';
            } else if(viewportWidth >= Number(this._options.mediumMin) && viewportWidth <= Number(this._options.mediumMax) && this._curLayout !== 'medium') {
                this._curLayout = 'medium';
            } else if(viewportWidth >= Number(this._options.smallMin) && viewportWidth <= Number(this._options.smallMax) && this._curLayout !== 'small') {
                this._curLayout = 'small';
            }
        }
    },

    _getColumnsToShow: function() {
        if(this._options.customBreakPoints && typeof(this._options.customBreakPoints) === 'object') {
            return Number(this._options.customBreakPoints[this._curLayout].cols);
        } else {
            return Number(this._options[this._curLayout+'Cols']);
        }
    },

    _canApplyLayoutChange: function() {
        var curLayout = this._curLayout;
        this._setCurLayout();
        if(curLayout !== this._curLayout) {
            return true;
        }
        return false;
    },

    _getPageItemsToList: function() {
        this._aColumn = Ink.ss(this._options.column, this._element);
        var totalCols = this._aColumn.length;
        var index = 0;
        if(totalCols > 0) {
            for(var i=0; i < this._aColumn.length; i++) {
                var aItems = Ink.ss(this._options.item, this._aColumn[i]);
                for(var j=0; j < aItems.length; j++) {
                    if(this._options.isOrdered) {
                        index = i + (j * totalCols);
                    }
                    this._aList[index] = aItems[j];
                    if(!this._options.isOrdered) {
                        index++;
                    }
                    //aItems[j].style.height = (100 + (Math.random() * 100))+'px';
                    aItems[j].parentNode.removeChild(aItems[j]);
                }
            }
            if(this._aList.length > 0 && this._options.isOrdered) {
                var aNewList = [];
                for(var ii=0; ii < this._aList.length; ii++) {
                    if(typeof(this._aList[ii]) !== 'undefined') {
                        aNewList.push(this._aList[ii]);
                    }
                }
                this._aList = aNewList;
            }
        }
    }, 

    _removeDomItems: function() {
        var totalCols = this._aColumn.length;
        if(totalCols > 0) {
            for(var i=0; i < totalCols; i++) {
                var aItems = Ink.ss(this._options.item, this._aColumn[i]);
                for(var j=aItems.length - 1; j >= 0; j--) {
                    aItems[j].parentNode.removeChild(aItems[j]);
                }
            }
        }
    },

    _applyLayoutChange: function() {
        var totalCols = this._getColumnsToShow();
        var totalItems = this._aList.length;
        var index = 0;
        var countCol = 0;
        if(totalCols > 0) {
            while(countCol < totalCols) {
                this._aColumn[countCol].appendChild(this._aList[index]);
                index++;
                countCol++;
                if(index === totalItems) {
                    return;
                }
                if(countCol === totalCols) {
                    countCol = 0;
                }
            }
        }
    }
};

Common.createUIComponent(Stacker);

return Stacker;

});

/**
 * Stick elements to the viewport
 * @module Ink.UI.Sticky_1
 * @version 1
 */
Ink.createModule('Ink.UI.Sticky', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Element_1','Ink.Dom.Css_1'], function(Common, Event, Element, Css) {
    'use strict';

    /**
     * Ink.UI.Sticky makes an element "stick" to the screen and stay in the same place as the user scrolls. To use it, just select an element as you create the Sticky. As you scroll past it, it will stick to the top of the screen.
     * The `activateInLayouts` option controls in what layouts this behaviour happens. By default, it is disabled for the `small` and `tiny` layouts. Pass a comma-separated string to choose just the layouts you need. You can use the `offsetTop` option if you want it to keep some distance from the top of the screen. To avoid it going under the footer of your page, pass a selector to your footer as the `bottomElement` option.
     *
     * @class Ink.UI.Sticky
     * @constructor
     * @version 1
     * @param {String|Element}      selector                    Element or selector
     * @param {Object}              [options] Options           Options object.
     * @param {Number}              [options.offsetBottom]      Number of pixels of distance from the bottomElement. Defaults to 0.
     * @param {Number}              [options.offsetTop]         Number of pixels of distance from the topElement. Defaults to 0.
     * @param {Boolean}             [options.inlineDimensions]  Set to false to disable setting inline CSS dimensions. Use this if you want to use CSS to define your own dimensions. Defaults to true.
     * @param {Boolean}             [options.inlinePosition]    Set to false to disable setting inline CSS positions. Use this if you want to use CSS to define your own positioning. Defaults to true.
     * @param {String}              [options.wrapperClass]      CSS class for the wrapper element. Defaults to 'ink-sticky-wrapper'.
     * @param {String}              [options.stickyClass]       CSS class to stick the element to the screen. Defaults to 'ink-sticky-stuck'.
     * @param {String}              [options.topElement]        CSS Selector that specifies a top element with which the component could collide.
     * @param {String}              [options.bottomElement]     CSS Selector that specifies a bottom element with which the component could collide.
     * @param {Array|String}        [options.activateInLayouts] Layouts in which the sticky behaviour is present. Pass an array or comma-separated string. Defaults to null, meaning it's enabled in every layout.
     *
     * @sample Ink_UI_Sticky_1.html
     */
    function Sticky(){
        Common.BaseUIComponent.apply(this, arguments);
    }

    Sticky._name = 'Sticky_1';

    Sticky._optionDefinition = {
        offsetBottom: ['Integer', 0],
        offsetTop: ['Integer', 0],
        topElement: ['Element', null],
        wrapperClass: ['String', 'ink-sticky-wrapper'],
        stickyClass: ['String', 'ink-sticky-stuck'],
        inlineDimensions: ['Boolean', true],
        inlinePosition: ['Boolean', true],
        bottomElement: ['Element', null],
        activateInLayouts: ['String', null]
    };

    Sticky.prototype = {

        /**
         * Init function called by the constructor
         *
         * @method _init
         * @private
         */
        _init: function() {
            // Because String#indexOf is compatible with lt IE8 but not Array#indexOf
            if (this._options.activateInLayouts) {
                this._options.activateInLayouts = this._options.activateInLayouts.toString();
            }

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
            Element.wrap(this._element, this._wrapper);

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
         * @return {Boolean} Whether Sticky is disabled in this layout.
         * @private
         */
        _isDisabledInLayout: function () {
            if (!this._options.activateInLayouts) {
                return false;
            }
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
            var style = this._element.style;
            var dims = this._getDims();

            Css.addClassName(this._element, this._options.stickyClass);
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
            Css.removeClassName(this._element, this._options.stickyClass);
            // deinline dimensions of our root element
            this._inlineDimensions(null, null);

            // deinline the position of our root element
            if (this._options.inlinePosition) {
                this._element.style.left = null;
                this._element.style.top = null;
                this._element.style.bottom = null;
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

            var style = this._element.style;

            // We unstick the sticky so we can measure.
            var oldPosition = style.position;
            var oldWidth = style.width;

            style.position = 'static'; // [todo] this should be a class toggle
            style.width = null;

            var dimensionsInStatic = Element.outerDimensions(this._element);
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
                this._element.style.height = height;
                this._element.style.width = width;
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

    Common.createUIComponent(Sticky);

    return Sticky;

});

/**
 * Swipe gestures
 * @module Ink.UI.Swipe_1
 * @version 1
 */
Ink.createModule('Ink.UI.Swipe', '1', ['Ink.Dom.Event_1', 'Ink.Dom.Element_1', 'Ink.UI.Common_1'], function(InkEvent, InkElement, Common) {
    'use strict';

    /**
     * Subscribe swipe gestures.
     *
     * Supports filtering swipes be any combination of the criteria supported in the options.
     *
     * -----
     *
     * Arguments received by the callbacks
     * -----------------------------------
     *
     * The `onStart`, `onMove`, and `onEnd` options receive as argument an object containing:
     *
     *   - `event`: the DOMEvent object
     *   - `element`: the target element
     *   - `Instance`: the `Ink.UI.Swipe_1` instance
     *   - `position`: `Array` with `[x, y]` coordinates of current position
     *   - `dt`: Time passed between now and the first event (onMove only)
     *   - `gesture`: an Array containing [x,y] coordinates of every touchmove event received (only if options.storeGesture is enabled) (onEnd only)
     *   - `time`: an Array containing all the `dt` values for every touchmove event (onEnd only)
     *   - `overallMovement`: X and Y distance traveled by the touch movement (`[x, y]`) (onEnd only)
     *   - `overallTime`: total time passed (onEnd only)
     *
     * @class Ink.UI.Swipe
     * @constructor
     * @param {String|Element}      el                      Element or Selector
     * @param {Object}              options                 Options Object
     * @param {Function}            [options.onEnd]         Callback function for the `touchend` event. Gets all the gesture information, and is filtered by min/max Dist and Duration options (see below)
     * @param {Function}            [options.onStart]       Callback function for `touchstart` event.
     * @param {Function}            [options.onMove]        Callback function for every `touchmove` event. Gets current gesture information.
     * @param {Number}              [options.minDist]       Minimum allowed distance, in pixels.
     * @param {Number}              [options.maxDist]       Maximum allowed distance, in pixels.
     * @param {Number}              [options.minDuration]   Minimum allowed duration, in seconds.
     * @param {Number}              [options.maxDuration]   Maximum allowed duration, in seconds.
     * @param {String}              [options.axis]          If either 'x' or 'y' is passed, only swipes where the dominant axis is the given one trigger the callback
     * @param {String}              [options.storeGesture]  If to store gesture information and provide it to the callback. Defaults to true.
     * @param {String}              [options.stopEvents]    Flag to stop (default and propagation) of the received events. Defaults to true.
     *
     *
     * @sample Ink_UI_Swipe_1.html
     */
    function Swipe() {
        if (typeof arguments[1] === 'function') {
            arguments[1] = { onEnd: arguments[1] };
        }

        Common.BaseUIComponent.apply(this, arguments);
    }

    Swipe._name = 'Swipe_1';

    Swipe._optionDefinition = {
        onEnd:          ['Function', undefined],
        onStart:        ['Function', undefined],
        onMove:         ['Function', undefined],
        minDist:        ['Number',   undefined],      // in pixels
        maxDist:        ['Number',   undefined],
        minDuration:    ['Number',   undefined],      // in seconds
        maxDuration:    ['Number',   undefined],
        axis:           ['String',   undefined],       // x | y
        storeGesture:   ['Boolean',  false],
        stopEvents:     ['Boolean',  true]
    };

    Swipe.prototype = {
        _supported: ('ontouchstart' in document.documentElement),

        _init: function() {
            this._handlers = {
                down: Ink.bindEvent(this._onDown, this),
                move: Ink.bindEvent(this._onMove, this),
                up:   Ink.bindEvent(this._onUp, this)
            };

            var db = document.body;
            InkEvent.observe(db, 'touchstart', this._handlers.down);
            if (this._options.storeGesture || this._options.onMove) {
                InkEvent.observe(db, 'touchmove', this._handlers.move);
            }
            InkEvent.observe(db, 'touchend', this._handlers.up);
            this._isOn = false;
        },

        _isMeOrParent: function(el, parentEl) {
            if (!el) {return;}
            do {
                if (el === parentEl) { return true; }
                el = el.parentNode;
            } while (el);
            return false;
        },

        _pushGesture: function (coords, dt) {
            if (this._options.storeGesture) {
                this._gesture.push(coords);
                this._time.push(dt);
            }
        },

        _onDown: function(event) {
            if (event.changedTouches.length !== 1) { return; }
            if (!this._isMeOrParent(event.target, this._element)) { return; }

            if( this._options.stopEvents === true ){
                InkEvent.stop(event);
            }
            event = event.changedTouches[0];
            this._isOn = true;
            this._target = event.target;

            this._t0 = +new Date();
            this._p0 = [event.pageX, event.pageY];

            if (this._options.storeGesture) {
                this._gesture = [];
                this._time    = [];
            }

            this._pushGesture(this._p0, 0);

            if (this._options.onStart) {
                this._options.onStart({
                    event: event,
                    element: this._element,
                    instance: this,
                    position: this._p0,
                    dt: 0
                });
            }
        },

        _onMove: function(event) {
            if (!this._isOn || event.changedTouches.length !== 1) { return; }
            if( this._options.stopEvents === true ) {
                InkEvent.stop(event);
            }

            event = event.changedTouches[0];
            var t1 = +new Date();
            var dt = (t1 - this._t0);

            var gesture = [event.pageX, event.pageY];

            this._pushGesture(gesture, dt);

            if (this._options.onMove) {
                this._options.onMove({
                    event: event,
                    element: this._element,
                    instance: this,
                    position: gesture,
                    dt: dt
                });
            }
        },

        _onUp: function(event) {
            if (!this._isOn || event.changedTouches.length !== 1) { return; }

            if( this._options.stopEvents === true ){
                InkEvent.stop(event);
            }
            event = event.changedTouches[0];   // TODO SHOULD CHECK IT IS THE SAME TOUCH
            this._isOn = false;

            var t1 = +new Date();
            var p1 = [event.pageX, event.pageY];
            var dt = (t1 - this._t0);
            var dr = [
                p1[0] - this._p0[0],
                p1[1] - this._p0[1]
            ];
            var dist = Math.sqrt(dr[0]*dr[0] + dr[1]*dr[1]);
            var axis = Math.abs(dr[0]) > Math.abs(dr[1]) ? 'x' : 'y';

            var o = this._options;
            if (o.minDist     && dist <   o.minDist) {     return; }
            if (o.maxDist     && dist >   o.maxDist) {     return; }
            if (o.minDuration && dt   <   o.minDuration) { return; }
            if (o.maxDuration && dt   >   o.maxDuration) { return; }
            if (o.axis        && axis !== o.axis)    {     return; }

            if (this._options.onEnd) {
                this._options.onEnd({
                    event: event,
                    element: this._element,
                    instance: this,
                    gesture: this._gesture,
                    time: this._time,
                    axis: axis,
                    overallMovement: dr,
                    overallTime: dt
                });
            }
        }
    };

    Common.createUIComponent(Swipe);

    return Swipe;
});

/**
 * Sort and paginate tabular data
 * @module Ink.UI.Table_1
 * @version 1
 */
Ink.createModule('Ink.UI.Table', '1', ['Ink.Util.Url_1','Ink.UI.Pagination_1','Ink.Net.Ajax_1','Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1','Ink.Util.String_1', 'Ink.Util.Json_1'], function(InkUrl,Pagination, Ajax, Common, Event, Css, Element, Selector, InkArray, InkString, Json) {
    'use strict';

    var rNumber = /\d/g;
    // Turn into a number, if we can. For sorting data which could be numeric or not.
    function maybeTurnIntoNumber(value) {
        if( !isNaN(value) && rNumber.test(value) ){
            return parseInt(value, 10);
        } else if( !isNaN(value) ){
            return parseFloat(value);
        }
        return value;
    }
    function cmp (a, b) {
        if( a === b ){
            return 0;
        }
        return ( ( a > b ) ? 1 : -1 );
    }
    // cmp function for comparing data which might be a number.
    function numberishEnabledCmp (a, b) {
        var aValue = maybeTurnIntoNumber(Element.textContent(a));
        var bValue = maybeTurnIntoNumber(Element.textContent(b));

        if (typeof aValue === typeof bValue) {
            return cmp(aValue, bValue);
        } else {
            if (typeof aValue === 'number') {  // Numbers always go first, then letters.
                return 1;
            } else {
                return -1;
            }
        }

        return cmp(aValue, bValue);
    }
    // Object.keys polyfill
    function keys(obj) {
        if (typeof Object.keys !== 'undefined') {
            return Object.keys(obj);
        }
        var ret = [];
        for (var k in obj) if (obj.hasOwnProperty(k)) {
            ret.push(k);
        }
        return ret;
    }

    /**
     * The Table component transforms the native/DOM table element into a sortable, paginated component.
     * You can use this component to display data from a JSON endpoint, or from table rows in the DOM. Displaying from the DOM is more practical, but sometimes you don't want to load everything at once (if you have a HUGE table). In those cases, you should configure Ink.UI.Table to get data from JSON endpoint.
     * To enable sorting, just set the `data-sortable` attribute of your table headers (they must be in the `thead` of the table) to "true". To enable pagination, you should pass either an `Ink.UI.Pagination` instance or a selector to create the Ink.UI.Pagination element on.
     *
     * @class Ink.UI.Table
     * @constructor
     * @version 1
     * @param {String|Element}      selector                                Your `table` element.
     * @param {Object}              [options] Options object containing:
     * @param {Number}              [options.pageSize]                      Number of rows per page. Omit to avoid paginating.
     * @param {String}              [options.endpoint]                      Endpoint to get the records via AJAX. Omit if you don't want to do AJAX
     * @param {Function}            [options.createEndpointURL]             Callback to customise what URL the AJAX endpoint is at. Receives three arguments: base (the "endpoint" option), sort (`{ order: 'asc' or 'desc', field: fieldname }`) and page ({ page: page number, size: items per page })
     * @param {Function}            [options.getDataFromEndpoint]           Callback to allow the user to retrieve the data himself given an URL.  Must accept two arguments: `url` and `callback`. This `callback` will take as a single argument a JavaScript object.
     * @param {Function}            [options.processJSONRows]               Retrieve an array of rows from the data which came from AJAX.
     * @param {Function}            [options.processJSONHeaders]            Get an object with all the headers' names as keys, and a { label, sortable } object as value.  Example: `{col1: {label: "Column 1"}, col2: {label: "Column 2", sortable: true}`.  Takes a single argument, the JSON response.
     * @param {Function}            [options.processJSONRow]                Process a row object before it gets on the table.
     * @param {Function}            [options.processJSONField]              Process the field data before putting it on the table.  You can return HTML, a DOM element, or a string here.  Arguments you receive: `(column, fieldData, rowIndex)`.
     * @param {Function}            [options.processJSONField.FIELD_NAME]   The same as processJSONField, but for a particular field.
     * @param {Function}            [options.processJSONTotalRows]          A callback where you have a chance to say how many rows are in the dataset (not only on this page) you have on the collection. You get as an argument the JSON response.
     * @param {Function}            [options.getSortKey]                    A function taking a `{ columnIndex, columnName, data, element }` object and returning a value which serves as a sort key for the sorting operation. For example, if you want to sort by a `data-sort-key` atribute, set `getSortKey` to: function (cell) { return cell.element.getAttribute('data-sort-key'); }
     * @param {Function}            [options.getSortKey.FIELD_NAME]         Same as `options.getSortKey`, but for a particular field.
     * @param {Object}              [options.tdClassNames]                  An object mapping each field to what classes it gets.  Example: `{ name: "large-10", isBoss: "hide-small" }`
     * @param {Mixed}               [options.pagination]                    Pagination instance, element or selector.
     * @param {Object}              [options.paginationOptions]             Override the options with which we instantiate the Ink.UI.Pagination.
     * @param {Boolean}             [options.allowResetSorting]             Allow sort order to be set to "none" in addition to "ascending" and "descending"
     * @param {String|Array}        [options.visibleFields]                 Set of fields which get shown on the table
     *
     * @sample Ink_UI_Table_1.html
     */
    function Table(){
        Common.BaseUIComponent.apply(this, arguments);
    }

    Table._name = 'Table_1';

    // Most processJSON* functions can just default to this.
    function sameSame(obj) { return obj; }

    Table._optionDefinition = {
        pageSize: ['Integer', null],
        caretUpClass: ['String', 'fa fa-caret-up'],
        caretDownClass: ['String', 'fa fa-caret-down'],
        endpoint: ['String', null],
        createEndpointUrl: ['Function', null],  // Deprecated misspelled option
        createEndpointURL: ['Function', null /* default func uses above option */],
        getDataFromEndPoint: ['Function', null],  // Deprecated mis-cased option
        getDataFromEndpoint: ['Function', null /* by default use plain ajax for JSON */],
        processJSONRows: ['Function', function (dt) { return typeof dt.length === 'number' ? dt : (dt.rows || null); }],
        processJSONRow: ['Function', sameSame],
        processJSONField: ['Function', sameSame],
        processJSONHeaders: ['Function', function (dt) { return dt.fields; }],
        processJSONTotalRows: ['Function', function (dt) { return dt.totalRows || dt.length; }],
        getSortKey: ['Function', null],
        pagination: ['Element', null],
        allowResetSorting: ['Boolean', false],
        visibleFields: ['String', null],
        tdClassNames: ['Object', {}],
        paginationOptions: ['Object', null]
    };

    Table.prototype = {
        _validate: function () {
            if( this._element.nodeName.toLowerCase() !== 'table' ){
                throw new Error('[Ink.UI.Table] :: The element is not a table');
            }
        },
        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function(){
            // Historic aliases
            if (this._options.createEndpointUrl) {
                this._options.createEndpointURL = this._options.createEndpointUrl;
            }
            if (this._options.getDataFromEndPoint) {
                this._options.getDataFromEndpoint = this._options.getDataFromEndpoint;
            }

            /**
             * Checking if it's in markup mode or endpoint mode
             */
            this._markupMode = !(this._options.endpoint || this._options.createEndpointURL);

            if( this._options.visibleFields ){
                this._options.visibleFields = this._options.visibleFields.toString().split(/[, ]+/g);
            }

            this._thead = this._element.tHead || this._element.createTHead();
            this._headers = Selector.select('th', this._thead);

            /**
             * Initializing variables
             */
            this._handlers = {
                thClick: null
            };
            this._originalFields = [
                // field headers from the DOM
            ];
            this._sortableFields = {
                // Identifies which columns are sorted and how.
                // columnIndex: 'none'|'asc'|'desc'
            };
            this._originalData = this._data = [];
            this._pagination = null;
            this._totalRows = 0;

            this._handlers.thClick = Event.on(this._element, 'click',
                    'thead th[data-sortable="true"]',
                    Ink.bindMethod(this, '_onThClick'));

            /**
             * If not is in markup mode, we have to do the initial request
             * to get the first data and the headers
             */
            if( !this._markupMode ) {
                /* Endpoint mode */
                this._getData(  );
            } else /* Markup mode */ {
                this._resetSortOrder();
                this._addHeadersClasses();

                /**
                 * Getting the table's data
                 */
                this._data = Selector.select('tbody tr', this._element);
                this._originalData = this._data.slice(0);

                this._totalRows = this._data.length;

                /**
                 * Set pagination if options tell us to
                 */
                this._setPagination();
            }
        },

        /**
         * Add the classes in this._options.tdClassNames to our table headers.
         * @method _addHeadersClasses
         * @private
         */
        _addHeadersClasses: function () {
            var headerLabel;
            var classNames;
            for (var i = 0, len = this._headers.length; i < len; i++) {
                headerLabel = Element.textContent(this._headers[i]);
                classNames = this._options.tdClassNames[headerLabel];
                // TODO do not find header labels this way. But how?
                if (classNames) {
                    Css.addClassName(this._headers[i], classNames);
                }
            }
        },

        /**
         * Click handler. This will mainly handle the sorting (when you click in the headers)
         * 
         * @method _onThClick
         * @param {Event} event Event obj
         * @private
         */
        _onThClick: function( event ){
            var tgtEl = Event.element(event),
                paginated = this._options.pageSize !== undefined;

            Event.stopDefault(event);

            var index = InkArray.keyValue(tgtEl, this._headers, true);
            var sortable = index !== false && this._sortableFields[index] !== undefined;

            if( !sortable ){
                return;
            }

            if( !this._markupMode && paginated ){
                this._invertSortOrder(index, false);
            } else {
                if ( (this._sortableFields[index] === 'desc') && this._options.allowResetSorting ) {
                    this._setSortOrderOfColumn(index, null);
                    this._data = this._originalData.slice(0);
                } else {
                    this._invertSortOrder(index, true);
                }

                var tbody = Selector.select('tbody',this._element)[0];
                InkArray.each(this._data, function (row) {
                    tbody.appendChild(row);
                });

                if (this._pagination) {
                    this._pagination.setCurrent(0);
                    this._paginate(1);
                }
            }
        },

        _invertSortOrder: function (index, sortAndReverse) {
            var isAscending = this._sortableFields[index] === 'asc';

            // Reset the sort order of everything
            for (var i = 0, len = this._headers.length; i < len; i++) {
                this._setSortOrderOfColumn(i, null);
            }
            // Except for the index we're looking at
            this._setSortOrderOfColumn(index, !isAscending);

            if (sortAndReverse) {
                this._sort(index);
                if (isAscending) {
                    this._data.reverse();
                }
            } else {
                this._getData();
            }
        },

        _setSortOrderOfColumn: function(index, up) {
            var header = this._headers[index];
            var caretHtml = [''];
            var order = 'none';

            if (up === true) {
                caretHtml = ['<i class="', this._options.caretUpClass, '"></i>'];
                order = 'asc';
            } else if (up === false) {
                caretHtml = ['<i class="', this._options.caretDownClass, '"></i>'];
                order = 'desc';
            }

            this._sortableFields[index] = order;
            header.innerHTML = Element.textContent(header) + caretHtml.join('');
        },

        /**
         * Applies and/or changes the CSS classes in order to show the right columns
         * 
         * @method _paginate
         * @param {Number} page Current page
         * @private
         */
        _paginate: function( page ){
            if (!this._pagination) { return; }

            var pageSize = this._options.pageSize;

            // Hide everything except the items between these indices
            var firstIndex = (page - 1) * pageSize;
            var lastIndex = firstIndex + pageSize;

            InkArray.each(this._data, function(item, index){
                if (index >= firstIndex && index < lastIndex) {
                    Css.removeClassName(item,'hide-all');
                } else {
                    Css.addClassName(item,'hide-all');
                }
            });

        },

        /* register fields into this._originalFields, whether they come from JSON or a table.
         * @method _registerFieldNames
         * @private
         * @param [names] The field names in an array
         **/
        _registerFieldNames: function (names) {
            this._originalFields = [];

            InkArray.forEach(names, Ink.bind(function (field) {
                if( !this._fieldIsVisible(field) ){
                    return;  // The user deems this not to be necessary to see.
                }
                this._originalFields.push(field);
            }, this));
        },

        _fieldIsVisible: function (field) {
            return !this._options.visibleFields ||
                (this._options.visibleFields.indexOf(field) !== -1);
        },

        /**
         * Sorts by a specific column.
         * 
         * @method _sort
         * @param {Number} index Column number (starting at 0)
         * @private
         */
        _sort: function( index ){
            // TODO this is THE worst way to declare field names. Incompatible with i18n and a lot of other things.
            var fieldName = Element.textContent(this._headers[index]);
            var keyFunction = this._options.getSortKey;

            if (keyFunction) {
                keyFunction =
                    typeof keyFunction[fieldName] === 'function' ?
                        keyFunction[fieldName] :
                    typeof keyFunction === 'function' ?
                        keyFunction :
                        null;
            }

            var self = this;

            this._data.sort(function (trA, trB) {
                var elementA = Ink.ss('td', trA)[index];
                var elementB = Ink.ss('td', trB)[index];
                if (keyFunction) {
                    return cmp(userKey(elementA), userKey(elementB));
                } else {
                    return numberishEnabledCmp(elementA, elementB, index);
                }
            });

            function userKey(element) {
                return keyFunction.call(self, {
                    columnIndex: index,
                    columnName: fieldName,
                    data: Element.textContent(element),
                    element: element
                });
            }
        },

        /**
         * Assembles the headers markup
         *
         * @method _createHeadersFromJson
         * @param  {Object} headers Key-value object that contains the fields as keys, their configuration (label and sorting ability) as value
         * @private
         */
        _createHeadersFromJson: function( headers ){
            this._registerFieldNames(keys(headers));

            if (this._thead.children.length) { return; }

            var tr = this._thead.insertRow(0);
            var th;

            for (var i = 0, len = headers.length; i < len; i++) {
                if (this._fieldIsVisible(headers[i])) {
                    th = Element.create('th');
                    th = this._createSingleHeaderFromJson(headers[i], th);
                    tr.appendChild(th);
                    this._headers.push(th);
                }
            }
        },

        _createSingleHeaderFromJson: function (header, th) {
            if (header.sortable) {
                th.setAttribute('data-sortable','true');
            }

            if (header.label){
                Element.setTextContent(th, header.label);
            }

            return th;
        },

        /**
         * Reset the sort order as marked on the table headers to "none"
         *
         * @method _resetSortOrder
         * @private
         */
        _resetSortOrder: function(){
            /**
             * Setting the sortable columns and its event listeners
             */
            for (var i = 0, len = this._headers.length; i < len; i++) {
                var dataset = Element.data( this._headers[i] );
                if (dataset.sortable && dataset.sortable.toString() === 'true') {
                    this._sortableFields[i] = 'none';
                }
            }
        },

        /**
         * This method gets the rows from AJAX and places them as <tr> and <td>
         *
         * @method _createRowsFromJSON
         * @param  {Object} rows Array of objects with the data to be showed
         * @private
         */
        _createRowsFromJSON: function( rows ){
            var tbody = Selector.select('tbody',this._element)[0];

            if( !tbody ){
                tbody = document.createElement('tbody');
                this._element.appendChild( tbody );
            } else {
                Element.setHTML(tbody, '');
            }

            this._data = [];
            var row;

            for (var trIndex in rows) {
                if (rows.hasOwnProperty(trIndex)) {
                    row = this._options.processJSONRow(rows[trIndex]);
                    this._createSingleRowFromJson(tbody, row, trIndex);
                }
            }

            this._originalData = this._data.slice(0);
        },

        _createSingleRowFromJson: function (tbody, row, rowIndex) {
            var tr = document.createElement('tr');
            tbody.appendChild( tr );
            for( var field in row ){
                if (row.hasOwnProperty(field)) {
                    this._createFieldFromJson(tr, row[field], field, rowIndex);
                }
            }
            this._data.push(tr);
        },

        _createFieldFromJson: function (tr, fieldData, fieldName, rowIndex) {
            if (!this._fieldIsVisible(fieldName)) { return; }

            var processor =
                this._options.processJSONField[fieldName] ||  // per-field callback
                this._options.processJSONField;  // generic callback

            var result;
            if (typeof processor === 'function') {
                result = processor(fieldData, fieldName, rowIndex);
            } else {
                result = fieldData;
            }
            var elm = this._elOrFieldData(result);

            var className = this._options.tdClassNames[fieldName];
            if (className) {
                Css.addClassName(elm, className);
            }

            tr.appendChild(elm);
        },

        _elOrFieldData: function (processed) {
            if (Common.isDOMElement(processed)) {
                return processed;
            }

            var isString = typeof processed === 'string';
            var isNumber = typeof processed === 'number';
            var elm = Element.create('td');

            if (isString && /^\s*?</.test(processed)) {
                Element.setHTML(elm, processed);
            } else if (isString || isNumber) {
                Element.setTextContent(elm, processed);
            } else {
                throw new Error('Ink.UI.Table Unknown result from processJSONField: ' + processed);
            }

            return elm;
        },

        /**
         * Sets the AJAX endpoint.
         * Useful to change the endpoint in runtime.
         *
         * @method setEndpoint
         * @param {String} endpoint New endpoint
         * @param {Number} currentPage If you pass this, setCurrent will also be called.
         * @return {void}
         * @public
         */
        setEndpoint: function( endpoint, currentPage ){
            if( !this._markupMode ){
                this._options.endpoint = endpoint;
                if (this._pagination) {
                    this._pagination.setCurrent(currentPage ? parseInt(currentPage,10) : 0 );
                }
            }
        },

        /**
         * Sets the instance's pagination, if necessary.
         *
         * Precondition: this._totalRows needs to be known.
         *
         * @method _setPagination
         * @private
         */
        _setPagination: function(){
            /* If user doesn't say they want pagination, bail. */
            if( this._options.pageSize == null ){ return; }

            /**
             * Fetch pagination from options. Can be a selector string, an element or a Pagination instance.
             */
            var paginationEl = this._options.pagination;

            if ( paginationEl instanceof Pagination ) {
                this._pagination = paginationEl;
                return;
            }

            if (!paginationEl) {
                paginationEl = Element.create('nav', {
                    className: 'ink-navigation',
                    insertAfter: this._element
                });
                Element.create('ul', {
                    className: 'pagination',
                    insertBottom: paginationEl
                });
            }

            var paginationOptions = Ink.extendObj({
                totalItemCount: this._totalRows,
                itemsPerPage: this._options.pageSize,
                onChange: Ink.bind(function (_, pageNo) {
                    this._paginate(pageNo + 1);
                }, this)
            }, this._options.paginationOptions || {});

            this._pagination = new Pagination(paginationEl, paginationOptions);

            this._paginate(1);
        },

        /**
         * Method to choose which is the best way to get the data based on the endpoint:
         *     - AJAX
         *     - JSONP
         *
         * @method _getData
         * @private
         */
        _getData: function( ){
            var sortOrder = this._getSortOrder() || null;
            var page = null;

            if (this._options.pageSize) {
                page = {
                    size: this._options.pageSize,
                    page: this._pagination ? this._pagination.getCurrent() + 1 : 1
                };
            }

            this._getDataViaAjax( this._getUrl( sortOrder, page) );
        },

        /**
         * Return an object describing sort order { field: [field name] ,
         * order: ["asc" or "desc"] }, or null if there is no sorting
         * going on.
         * @method _getSortOrder
         * @private
         */
        _getSortOrder: function () {
            var index;
            for (index in this._sortableFields) if (this._sortableFields.hasOwnProperty(index)) {
                if( this._sortableFields[index] !== 'none' ){
                    break;
                }
            }
            if (!index) {
                return null; // no sorting going on
            }
            return {
                field: this._originalFields[index] || Element.textContent(this._headers[index]),
                order: this._sortableFields[index]
            };
        },

        _getUrl: function (sort, page) {
            var urlCreator = this._options.createEndpointURL ||
                function (endpoint, sort, page
                        /* TODO implement filters too */) {
                    endpoint = InkUrl.parseUrl(endpoint);
                    endpoint.query = endpoint.query || {};

                    if (sort) {
                        endpoint.query.sortOrder = sort.order;
                        endpoint.query.sortField = sort.field;
                    }

                    if (page) {
                        endpoint.query['rows_per_page'] = page.size;
                        endpoint.query['page'] = page.page;
                    }

                    return InkUrl.format(endpoint);
                };

            var ret = urlCreator(this._options.endpoint, sort, page);

            if (typeof ret !== 'string') {
                throw new TypeError('Ink.UI.Table_1: ' +
                    'createEndpointUrl did not return a string!');
            }

            return ret;
        },

        /**
         * Gets the data via AJAX and calls this._onAjaxSuccess with the response.
         * 
         * Will call options.getDataFromEndpoint( Uri, callback ) if available.
         *
         * When done, calls _onAjaxSuccess
         *
         * @method _getDataViaAjax
         * @param {String} endpointUri Endpoint to get data from, after processing.
         * @private
         */
        _getDataViaAjax: function( endpointUri ){
            var success = Ink.bind(function( JSONData ){
                this._onAjaxSuccess( JSONData );
            }, this);

            if (!this._options.getDataFromEndpoint) {
                new Ajax( endpointUri, {
                    method: 'GET',
                    contentType: 'application/json',
                    sanitizeJSON: true,
                    onSuccess: Ink.bind(function( response ){
                        if( response.status === 200 ){
                            success(Json.parse(response.responseText));
                        }
                    }, this)
                });
            } else {
                this._options.getDataFromEndpoint( endpointUri, success );
            }
        },

        _onAjaxSuccess: function (jsonResponse) {
            var paginated = this._options.pageSize != null;
            var rows = this._options.processJSONRows(jsonResponse);
            this._headers = Selector.select('th', this._thead);

            // If headers not in DOM, get from JSON
            if( this._headers.length === 0 ) {
                var headers = this._options.processJSONHeaders(
                    jsonResponse);
                if (!headers || !headers.length || !headers[0]) {
                    throw new Error('Ink.UI.Table: processJSONHeaders option must return an array of objects!');
                }
                this._createHeadersFromJson( headers );
                this._resetSortOrder();
                this._addHeadersClasses();
            } else {
                this._resetSortOrder();
            }

            this._createRowsFromJSON( rows );

            this._totalRows = this._rowLength = rows.length;

            if( paginated ){
                this._totalRows = this._options.processJSONTotalRows(jsonResponse);
                this._setPagination( );
            }
        }
    };

    Common.createUIComponent(Table);

    return Table;

});

/**
 * Display tabbed content
 * @module Ink.UI.Tabs_1
 * @version 1
 */
Ink.createModule('Ink.UI.Tabs', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1'], function(Common, Event, Css, Element, Selector) {
    'use strict';

    /**
     * The Tabs Component offers a simple way to build a tab-separated layout, allowing you to offer multiple content panes in the same space with intuitive navigation.
     * This component requires your markup to have:
     * - A container element (this is what you call the Ink.UI.Tabs constructor on), containing everything below.
     * - An element with the `tabs-nav` class, to contain links.
     * - Your links with `href="#ID_OF_SECTION"`
     * - Your sections with the corresponding `id` attributes and the `tabs-content` class.
     * - The content for each section.
     *
     * When the user clicks in the links inside `tabs-nav`, the tab with the corresponding ID is then activated. The active tab when the tab component is initialized has its hash in the browser URL. If there is no hash, then the `active` option kicks in. Otherwise, Tabs will fall back to showing the tab corresponding to the first link.
     *
     * You can disable some (or all) tabs by passing an array for the `disabled` option, or by adding the `ink-disabled` class to tab links.
     *
     * @class Ink.UI.Tabs
     * @constructor
     * @version 1
     * @param {String|Element}      selector                        Your container element. You can pass in a pure DOM element or a selector.
     * @param {Object}              [options]                       Options object, containing:
     * @param {Boolean}             [options.preventUrlChange=false] Flag that determines if follows the link on click or stops the event
     * @param {String}              [options.active]                ID of the tab to activate on creation if the window hash is not already a tab ID.
     * @param {Function}            [options.onBeforeChange]        Callback to be executed before changing tabs.
     * @param {Function}            [options.onChange]              Callback to be executed after changing tabs.
     * 
     * @param {String}              [options.menuSelector='.tabs-nav'] Selector to find your tab links.
     * @param {String}              [options.contentSelector='.tabs-content'] Selector to find your tab content panes.
     * @param {Boolean}             [options.triggerEventsOnLoad=true] Call the above callbacks after this component is created.
     *
     * @sample Ink_UI_Tabs_1.html
     */
    function Tabs() {
        Common.BaseUIComponent.apply(this, arguments);
    }

    Tabs._name = 'Tabs_1';

    Tabs._optionDefinition = {
        preventUrlChange:   ['Boolean', false],
        active:             ['String', undefined],
        onBeforeChange:     ['Function', undefined],
        onChange:           ['Function', undefined],
        menuSelector:       ['String', '.tabs-nav'],
        contentSelector:    ['String', '.tabs-content'],
        triggerEventsOnLoad:['Boolean', true]
    };

    Tabs.prototype = {

        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function() {
            this._menu = Selector.select(this._options.menuSelector, this._element)[0];

            if (!this._menu) {
                Ink.warn('Ink.UI.Tabs: An element selected by "' + this._options.menuSelector + '" needs to exist inside the element!');
                return;
            }

            //initialization of the tabs, hides all content before setting the active tab
            this._initializeDom();

            // subscribe click event
            Event.on(this._menu, 'click', 'a', Ink.bindMethod(this, '_onTabClickedGeneric'));

            //sets the first active tab
            this._setFirstActive();
        },

        /**
         * Initialization of the tabs, hides all content before setting the active tab
         * 
         * @method _initializeDom
         * @private
         */
        _initializeDom: function(){
            var contentTabs = Selector.select(this._options.contentSelector, this._element);

            for(var i = 0; i < contentTabs.length; i++){
                Css.addClassName(contentTabs[i], 'hide-all');
            }
        },

        /**
         * Run at instantiation, to determine which is the first active tab
         * fallsback from window.location.href to options.active to the first not disabled tab
         * 
         * @method _setFirstActive
         * @private
         */
        _setFirstActive: function() {
            var hash = window.location.hash;

            var activeMenuLink = this._findLinkByHref(hash) ||
                                 (this._options.active && this._findLinkByHref(this._options.active)) ||
                                 Selector.select('.active a', this._menu)[0] ||
                                 Selector.select('a', this._menu)[0];

            if (activeMenuLink) {
                this._firstTime = true;
                this._changeTab(activeMenuLink, this._options.triggerEventsOnLoad);
                this._firstTime = false;
            }
        },

        /**
         * Changes to the desired tab
         * 
         * @method _changeTab
         * @param {Element}    link             anchor linking to the content container
         * @param {boolean}    runCallbacks     defines if the callbacks should be run or not
         * @private
         */
        _changeTab: function(link, runCallbacks){
            if(runCallbacks && typeof this._options.onBeforeChange !== 'undefined'){
                this._options.onBeforeChange(this);
            }

            var selector = link.getAttribute('href');
            var href = selector.substr(selector.indexOf('#'));

            // Notice that this is done while the content pane is hidden (it's
            // going to be shown below). That is intentional. If the content is
            // shown and location.hash changes, scroll jumps to that pane, and
            // we do not want that.
            if (window.location.hash !== href && !this._options.preventUrlChange && !this._firstTime) {
                window.location.hash = href;
            }

            var activeTabs = Selector.select('> li.active', this._menu);

            for (var i = 0, len = activeTabs.length; i < len; i++) {
                if (activeTabs[i] !== link) {
                    Css.removeClassName(activeTabs[i], 'active');
                }
            }

            if (this._activeMenuTab) {
                Css.removeClassName(this._activeMenuTab, 'active');
                Css.removeClassName(this._activeSection, 'active');
                Css.addClassName(this._activeSection, 'hide-all');
            }

            this._activeMenuLink = link;
            this._activeMenuTab = this._activeMenuLink.parentNode;
            this._activeSection = Selector.select(href, this._element)[0];

            if (!this._activeSection) {
                this._activeMenuLink = this._activeMenuTab = this._activeSection = null;
                return;
            }

            Css.addClassName(this._activeMenuTab, 'active');
            Css.addClassName(this._activeSection, 'active');
            Css.removeClassName(this._activeSection, 'hide-all');

            if(runCallbacks && typeof(this._options.onChange) !== 'undefined'){
                this._options.onChange(this);
            }
        },

        /**
         * Generic Tab clicked handler.
         * Just calls _onTabClicked or _onDisabledTabClicked
         *
         * @private
         **/
        _onTabClickedGeneric: function (event) {
            event.preventDefault();

            var doChangeTab =
                !Css.hasClassName(event.currentTarget, 'ink-disabled') &&  // Not disabled
                event.currentTarget !== this._activeMenuLink;  // Not the current tab

            if (doChangeTab) {
                this._onTabClicked(event.currentTarget);
            }
        },

        /**
         * Tab clicked handler
         * 
         * @method _onTabClicked
         * @param {Event} ev
         * @private
         */
        _onTabClicked: function(tabElm) {
            var href = tabElm.getAttribute('href') || '';
            href = href.substr(href.indexOf('#'));

            if (!href || Ink.i(this._dehashify(href)) === null) {
                return;
            }

            if (tabElm === this._activeMenuLink) {
                return;
            }

            this.changeTab(tabElm);
        },

        /*****************
         * Aux Functions *
         *****************/

        /**
         * Allows the hash to be passed with or without the cardinal sign
         * 
         * @method _hashify
         * @param {String} hash     the string to be hashified
         * @return {String} Resulting hash
         * @private
         */
        _hashify: function(hash){
            if(!hash){
                return '';
            }
            return hash.indexOf('#') === 0? hash : '#' + hash;
        },

        /**
         * Removes the cardinal sign from the beginning of a string
         **/
        _dehashify: function(hash) {
            if (!hash) { return ''; }
            return ('' + hash).replace(/^#/, '');
        },

        /**
         * Returns the anchor with the desired href
         * 
         * @method _findLinkBuHref
         * @param {String} href     the href to be found on the returned link
         * @return {String|undefined} [description]
         * @private
         */
        _findLinkByHref: function(href){
            // If it's null or undefined, the following checks fail.
            if (!href) { return null; }

            // If it's a node, it could be a link or a section.
            if (href.nodeType === 1) {
                if (Element.isAncestorOf(href, this._element)) { return null; }  // Element is outside the tabs element.

                var links = Selector.select('a', this._menu);
                var id = href.getAttribute('id');

                for (var i = 0, len = links.length; i < len; i++) {
                    if (links[i] === href || Element.isAncestorOf(href, links[i])) {
                        return links[i];  // We got a link
                    } else if (id && id === this._dehashify(links[i].hash)) {
                        return links[i];  // We got a section
                    }
                }

                return null;
            }

            // Else, it's a string. It could start with "#" or without it.
            href = this._hashify(href);
            // Find a link which has a href ending with...
            return Selector.select('a[href$="' + href + '"]', this._menu)[0] || null;
        },

        /**************
         * PUBLIC API *
         **************/

        /**
         * Changes the active tab
         *
         * Pass a selector/element identifying what tab you want
         * 
         * @method changeTab
         * @param {String|Element} selector      Selector of the desired tab or the link that links to it
         * @return {void}
         * @public
         */
        changeTab: function(selector) {
            selector = this._findLinkByHref(selector);

            if(!selector || Css.hasClassName(selector, 'ink-disabled')){
                return;
            }

            this._changeTab(selector, true);
        },

        /**
         * Disables the desired tab
         * 
         * @method disable
         * @param {String|Element} selector      the id of the desired tab or the link that links to it
         * @return {void}
         * @public
         */
        disable: function(selector){
            Css.addClassName(this._findLinkByHref(selector), 'ink-disabled');
        },

        /**
         * Enables the desired tab
         * 
         * @method enable
         * @param {String|Element} selector      The id of the desired tab or the link that links to it
         * @return {void}
         * @public
         */
        enable: function(selector){
            Css.removeClassName(this._findLinkByHref(selector), 'ink-disabled');
        },

        /***********
         * Getters *
         ***********/

        /**
         * Returns the active tab id
         * 
         * @method activeTab
         * @return {String} ID of the active section (use activeSection() instead to get the element).
         * @public
         */
        activeTab: function(){
            return this._activeSection.getAttribute('id');
        },

        /**
         * Gets the currently active Menu link (the links which the user clicks on to change tabs)
         * 
         * @method activeMenuLink
         * @return {Element|null} Active menu link, or `null` if there is none.
         * @public
         */
        activeMenuLink: function(){
            return this._activeMenuLink;
        },

        /**
         * Gets the currently active section
         *
         * (Each section contains content for a tab, and must have an `id` attribute)
         * 
         * @method activeContentTab
         * @return {Element|null} Active section, or `null` if there is none.
         * @public
         */
        activeSection: function(){
            return this._activeSection;
        },

        /**
         * Unregisters the component and removes its markup
         * 
         * @method destroy
         * @public
         */
        destroy: Common.destroyComponent
    };

    Common.createUIComponent(Tabs);

    return Tabs;

});

/*
 * Tagging input element
 * @module Ink.UI.TagField_1
 * @version 1
 */
Ink.createModule("Ink.UI.TagField","1",["Ink.Dom.Element_1", "Ink.Dom.Event_1", "Ink.Dom.Css_1", "Ink.Dom.Browser_1", "Ink.UI.Droppable_1", "Ink.Util.Array_1", "Ink.Dom.Selector_1", "Ink.UI.Common_1"],function( InkElement, InkEvent, Css, Browser, Droppable, InkArray, Selector, Common) {
    'use strict';

    var enterKey = 13;
    var backspaceKey = 8;
    var isTruthy = function (val) {return !!val;};

    // Old IE (< 9) would split this into ['s'], but the correct behaviour is ['s', '']
    // We get around this.
    var buggySplit = 's,'.split(/,/g).length === 1;

    var splitFunction = (function () {
        // Solves the above problem in old IE. Taken from:
        // http://blog.stevenlevithan.com/archives/cross-browser-split
        // (slightly adapted so as to not touch String.prototype)
        var nativeSplit = String.prototype.split,
            compliantExecNpcg = /()??/.exec("")[1] === undefined, // NPCG: nonparticipating capturing group
            self;

        self = function (str, separator, limit) {
            /*jshint -W038 */
            /*jshint -W004 */
            /*jshint boss:true */
            /*jshint loopfunc:true */
            // If `separator` is not a regex, use `nativeSplit`
            if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
                return nativeSplit.call(str, separator, limit);
            }
            var output = [],
                flags = (separator.ignoreCase ? "i" : "") +
                        (separator.multiline  ? "m" : "") +
                        (separator.extended   ? "x" : "") + // Proposed for ES6
                        (separator.sticky     ? "y" : ""), // Firefox 3+
                lastLastIndex = 0,
                // Make `global` and avoid `lastIndex` issues by working with a copy
                separator = new RegExp(separator.source, flags + "g"),
                separator2, match, lastIndex, lastLength;
            str += ""; // Type-convert
            if (!compliantExecNpcg) {
                // Doesn't need flags gy, but they don't hurt
                separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
            }
            /* Values for `limit`, per the spec:
             * If undefined: 4294967295 // Math.pow(2, 32) - 1
             * If 0, Infinity, or NaN: 0
             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
             * If other: Type-convert, then use the above rules
             */
            limit = limit === undefined ?
                -1 >>> 0 : // Math.pow(2, 32) - 1
                limit >>> 0; // ToUint32(limit)
            while (match = separator.exec(str)) {
                // `separator.lastIndex` is not reliable cross-browser
                lastIndex = match.index + match[0].length;
                if (lastIndex > lastLastIndex) {
                    output.push(str.slice(lastLastIndex, match.index));
                    // Fix browsers whose `exec` methods don't consistently return `undefined` for
                    // nonparticipating capturing groups
                    if (!compliantExecNpcg && match.length > 1) {
                        match[0].replace(separator2, function () {
                            for (var i = 1; i < arguments.length - 2; i++) {
                                if (arguments[i] === undefined) {
                                    match[i] = undefined;
                                }
                            }
                        });
                    }
                    if (match.length > 1 && match.index < str.length) {
                        Array.prototype.push.apply(output, match.slice(1));
                    }
                    lastLength = match[0].length;
                    lastLastIndex = lastIndex;
                    if (output.length >= limit) {
                        break;
                    }
                }
                if (separator.lastIndex === match.index) {
                    separator.lastIndex++; // Avoid an infinite loop
                }
            }
            if (lastLastIndex === str.length) {
                if (lastLength || !separator.test("")) {
                    output.push("");
                }
            } else {
                output.push(str.slice(lastLastIndex));
            }
            return output.length > limit ? output.slice(0, limit) : output;
        };

        // For convenience
        /* We don't override prototypes in Ink
        String.prototype.split = function (separator, limit) {
            return self(this, separator, limit);
        };
        */

        return self;
    }());



    /**
     * Use this class to have a field where a user can input several tags into a single text field. A good example is allowing the user to describe a blog post or a picture through tags, for later searching.
     *
     * The markup is as follows:
     *
     *           <input class="ink-tagfield" type="text" value="initial,value">
     *
     * By applying this UI class to the above input, you get a tag field with the tags "initial" and "value". The class preserves the original input element. It remains hidden and is updated with new tag information dynamically, so regular HTML form logic still applies.
     *
     * Below "input" refers to the current value of the input tag (updated as the user enters text, of course), and "output" refers to the value which this class writes back to said input tag.
     *
     * @class Ink.UI.TagField
     * @version 1
     * @constructor
     * @param {String|Element}      element                         Selector or DOM Input Element.
     * @param {Object}              [options]                       Options object
     * @param {String|Array}        [options.tags]                  Initial tags in the input
     * @param {Boolean}             [options.allowRepeated]         Flag to allow user to input several tags. Defaults to true.
     * @param {RegExp}              [options.separator]             Split the input by this RegExp. Defaults to /[,;(space)]+/g (spaces, commas and semicolons)
     * @param {String}              [options.outSeparator]          Use this string to separate each tag from the next in the output. Defaults to ','.
     * @param {Boolean}             [options.autoSplit]             Flag to activate tag creation when the user types a separator. Defaults to true.
     * @param {Integer}             [options.maxTags]               Maximum number of tags allowed. Set to -1 for no limit. Defaults to -1.
     * @example
     */
    function TagField() {
        Common.BaseUIComponent.apply(this, arguments);
    }

    TagField._name = 'TagField_1';

    TagField._optionDefinition = {
        tags: ['String', []],
        allowRepeated: ['Boolean', false],
        maxTags: ['Integer', -1],
        outSeparator: ['String', ','],
        separator: ['String', /[,; ]+/g],
        autoSplit: ['Boolean', true]
    };

    TagField.prototype = {
        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function() {
            var o = this._options;
            if (typeof o.separator === 'string') {
                o.separator = new RegExp(o.separator, 'g');
            }

            if (typeof o.tags === 'string') {
                // coerce to array using the separator
                o.tags = this._readInput(o.tags);
            }

            Css.addClassName(this._element, 'hide-all');

            this._viewElm = InkElement.create('div', {
                className: 'ink-tagfield',
                insertAfter: this._element
            });

            this._input = InkElement.create('input', {
                type: 'text',
                className: 'new-tag-input',
                insertBottom: this._viewElm
            });

            var tags = [].concat(o.tags, this._tagsFromMarkup(this._element));

            this._tags = [];

            InkArray.each(tags, Ink.bindMethod(this, '_addTag'));

            InkEvent.observe(this._input, 'keyup', Ink.bindEvent(this._onKeyUp, this));
            InkEvent.observe(this._input, 'change', Ink.bindEvent(this._onKeyUp, this));
            InkEvent.observe(this._input, 'keydown', Ink.bindEvent(this._onKeyDown, this));
            InkEvent.observe(this._input, 'blur', Ink.bindEvent(this._onBlur, this));
            InkEvent.observe(this._viewElm, 'click', Ink.bindEvent(this._refocus, this));
        },

        destroy: function () {
            InkElement.remove(this._viewElm);
            Css.removeClassName(this._element, 'hide-all');
        },

        _tagsFromMarkup: function (element) {
            var tagname = element.tagName.toLowerCase();
            if (tagname === 'input') {
                return this._readInput(element.value);
            } else if (tagname === 'select') {
                return InkArray.map(element.getElementsByTagName('option'), function (option) {
                    return InkElement.textContent(option);
                });
            } else {
                throw new Error('Cannot read tags from a ' + tagname + ' tag. Unknown tag');
            }
        },

        _tagsToMarkup: function (tags, element) {
            var tagname = element.tagName.toLowerCase();
            if (tagname === 'input') {
                if (this._options.separator) {
                    element.value = tags.join(this._options.outSeparator);
                }
            } else if (tagname === 'select') {
                element.innerHTML = '';
                InkArray.each(tags, function (tag) {
                    var opt = InkElement.create('option', {selected: 'selected'});
                    InkElement.setTextContent(opt, tag);
                    element.appendChild(opt);
                });
            } else {
                throw new Error('TagField: Cannot read tags from a ' + tagname + ' tag. Unknown tag');
            }
        },

        _addTag: function (tag) {
            if (this._options.maxTags !== -1 &&
                    this._tags.length >= this._options.maxTags) {
                return;
            }
            if ((!this._options.allowRepeated &&
                    InkArray.inArray(tag, this._tags, tag)) || !tag) {
                return false;
            }
            var elm = InkElement.create('span', {
                className: 'ink-tag',
                setTextContent: tag + ' '
            });

            var remove = InkElement.create('span', {
                className: 'remove fa fa-times',
                insertBottom: elm
            });
            InkEvent.observe(remove, 'click', Ink.bindEvent(this._removeTag, this, null));

            var spc = document.createTextNode(' ');

            this._tags.push(tag);
            this._viewElm.insertBefore(elm, this._input);
            this._viewElm.insertBefore(spc, this._input);
            this._tagsToMarkup(this._tags, this._element);
        },

        _readInput: function (text) {
            if (this._options.separator) {
                return InkArray.filter(text.split(this._options.separator), isTruthy);
            } else {
                return [text];
            }
        },

        _onKeyUp: function () {  // TODO control input box size
            if (!this._options.autoSplit) {
                return;
            }

            var split;
            if (!buggySplit) {
                split = this._input.value.split(this._options.separator);
            } else {
                split = splitFunction(this._input.value, this._options.separator);
            }

            if (split.length <= 1) {
                return;
            }
            var last = split[split.length - 1];
            split = split.splice(0, split.length - 1);
            split = InkArray.filter(split, isTruthy);
            
            InkArray.each(split, Ink.bind(this._addTag, this));
            this._input.value = last;
        },

        _onKeyDown: function (event) {
            if (event.which === enterKey) {
                return this._onEnterKeyDown(event);
            } else if (event.which === backspaceKey) {
                return this._onBackspaceKeyDown();
            } else if (this._removeConfirm) {
                // user pressed another key, cancel removal from a backspace key
                this._unsetRemovingVisual(this._tags.length - 1);
            }
        },

        /**
         * When the user presses backspace twice on the empty input, we delete the last tag on the field.
         * @method onBackspaceKeyDown
         * @return {void}
         * @private
         */
        _onBackspaceKeyDown: function () {
            if (this._input.value) { return; }

            if (this._removeConfirm) {
                this._unsetRemovingVisual(this._tags.length - 1);
                this._removeTag(this._tags.length - 1);
                this._removeConfirm = null;
            } else {
                this._setRemovingVisual(this._tags.length - 1);
            }
        },

        _onEnterKeyDown: function (event) {
            var tag = this._input.value;
            if (tag) {
                this._addTag(tag);
                this._input.value = '';
            }
            InkEvent.stopDefault(event);
        },

        _onBlur: function () {
            this._addTag(this._input.value);
            this._input.value = '';
        },

        /* For when the user presses backspace.
         * Set the style of the tag so that it seems like it's going to be removed
         * if they press backspace again. */
        _setRemovingVisual: function (tagIndex) {
            var elm = this._viewElm.children[tagIndex];
            if (!elm) { return; }

            Css.addClassName(elm, 'tag-deleting');

            this._removeRemovingVisualTimeout = setTimeout(Ink.bindMethod(this, '_unsetRemovingVisual', tagIndex), 4000);
            InkEvent.observe(this._input, 'blur', Ink.bindMethod(this, '_unsetRemovingVisual', tagIndex));
            this._removeConfirm = true;
        },
        _unsetRemovingVisual: function (tagIndex) {
            var elm = this._viewElm.children[tagIndex];
            if (elm) {
                Css.removeClassName(elm, 'tag-deleting');
                clearTimeout(this._removeRemovingVisualTimeout);
            }
            this._removeConfirm = null;
        },

        _removeTag: function (event) {
            var index;
            if (typeof event === 'object') {  // click event on close button
                var elm = InkEvent.element(event).parentNode;
                index = InkElement.parentIndexOf(this._viewElm, elm);
            } else if (typeof event === 'number') {  // manual removal
                index = event;
            }
            this._tags = InkArray.remove(this._tags, index, 1);
            InkElement.remove(this._viewElm.children[index]);
            this._tagsToMarkup(this._tags, this._element);
        },

        _refocus: function (event) {
            this._input.focus();
            InkEvent.stop(event);
            return false;
        }
    };

    Common.createUIComponent(TagField);

    return TagField;
});

/**
 * Toggle the visibility of elements.
 * @module Ink.UI.Toggle_1
 * @version 1
 */

 Ink.createModule('Ink.UI.Toggle', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1'], function(Common, InkEvent, Css, InkElement, Selector, InkArray ) {
    'use strict';

    /**
     * *Important note: Do NOT use this as a dropdown! Use Ink.UI.Dropdown for that.*
     *
     * You need two elements to use Toggle: the `trigger` element, and the `target` element (or elements). The default behaviour is to toggle the `target`(s) when you click the `trigger`.
     *
     * The toggle has a state. It is either "on" or "off". It works by switching between the CSS classes in `classNameOn` and `classNameOff` according to the current state.
     *
     * When you initialize the Toggle, it will check if the targets are visible to figure out what the initial state is. You can force the toggle to consider itself turned "on" or "off" by setting the `initialState` option to `true` or `false`, respectively.
     *
     * You can get the current state of the Toggle by calling `getState`, or by checking if your `trigger` element has the "active" class.
     * The state can be changed through JavaScript. Just call  `setState(true)`
     * to turn the Toggle on (or `setState(false)` to turn it off).
     *
     * @class Ink.UI.Toggle
     * @constructor
     * @version 1
     * @param {String|Element} selector  Trigger element. By clicking this, the target (or targets) are triggered.
     * @param {Object} [options] Options object, containing:
     *
     * @param {String}              options.target                  CSS Selector that specifies the elements that this component will toggle
     * @param {Boolean}             [options.isAccordion]           Set this to true to signal that this toggle is part of an accordion with other toggles. The toggles of an accordion must be common descendants of an element with the class "accordion". If they're not, Ink will warn you about this on the console.
     * @param {String}              [options.classNameOn]           CSS class to toggle when on. Defaults to 'show-all'.
     * @param {String}              [options.classNameOff]          CSS class to toggle when off. Defaults to 'hide-all'.
     * @param {String}              [options.triggerEvent]          Event that will trigger the toggling. Defaults to 'click'.
     * @param {Boolean}             [options.closeOnClick]          Flag to toggle the target off when clicking outside the toggled content. Defaults to true.
     * @param {Boolean}             [options.canToggleAnAncestor]   Set to true if you want the toggle to target ancestors of itself. Defaults to false.
     * @param {String}              [options.closeOnInsideClick]    Toggle off when a child element matching this selector is clicked. Set to null to deactivate the check. Defaults to 'a[href]'.
     * @param {Boolean}             [options.initialState]          Flag to define initial state. false: off, true: on, null: markup. Defaults to null.
     * @param {Function}            [options.onChangeState]         Callback when the toggle state changes. Return `false` to cancel the event.
     *
     * @sample Ink_UI_Toggle_1_constructor.html
     */
    function Toggle(){
        Common.BaseUIComponent.apply(this, arguments);
    }

    Toggle._name = 'Toggle_1';

    Toggle._optionDefinition = {
        target:         ['Elements'],
        triggerEvent:   ['String', 'click'],
        closeOnClick:   ['Boolean', null],
        canToggleAnAncestor: ['Boolean', false],
        isAccordion:    ['Boolean', false],
        initialState:   ['Boolean', null],  // May be true, false, or null to be what it is right now
        classNameOn:    ['String', 'show-all'],
        classNameOff:   ['String', 'hide-all'],
        closeOnInsideClick: ['String', 'a[href]'],  // closes the toggle when a target is clicked and it is a link
        onChangeState:  ['Function', null]
    };

    Toggle.prototype = {

        /**
         * Init function called by the constructor
         *
         * @method _init
         * @private
         */
        _init: function(){
            var i, len;

            this._targets = Common.elsOrSelector(this._options.target);

            // closeOnClick should default to false when isAccordion
            if (this._options.closeOnClick === null) {
                this._options.closeOnClick =
                    (this._options.isAccordion || this._options.canToggleAnAncestor) ? false : true;
            }
            // Actually a throolean
            if (this._options.initialState === null) {
                this._options.initialState = Css.hasClassName(this._targets[0], this._options.classNameOn);
            }

            if (this._options.classNameOn !== 'show-all' || this._options.classNameOff !== 'hide-all') {
                for (i = 0, len = this._targets.length; i < len; i++) {
                    Css.removeClassName(this._targets[i], 'show-all');
                    Css.removeClassName(this._targets[i], 'hide-all');
                }
            }

            if (this._options.isAccordion) {
                this._accordionContainer = InkElement.findUpwardsByClass(
                    this._element, 'accordion');
                if (!this._accordionContainer) {
                    Ink.warn('Ink.UI.Toggle_1: This toggle has the isAccordion option set to `true`, but is not a descendant of an element with the class "accordion"! Because of this, it won\'t be able to find other toggles in the same accordion and cooperate with them.');
                }
            }

            this._constructing = true;

            this._bindEvents();

            if (this._options.initialState !== null) {
                this.setState(this._options.initialState, true);
            } else {
                // Add initial classes matching the current "display" of the object.
                var state = Css.getStyle(this._targets[0], 'display') !== 'none';
                this.setState(state, true);
            }
            // Aditionally, remove any inline "display" style.
            for (i = 0, len = this._targets.length; i < len; i++) {
                if (this._targets[i].style.display) {
                    this._targets[i].style.display = '';  // becomes default
                }
            }

            this._element.setAttribute('data-is-toggle-trigger', 'true');

            this._constructing = false;
        },

        /**
         * @method _bindEvents
         * @private
         */
        _bindEvents: function () {
            if ( this._options.triggerEvent ) {
                InkEvent.on(
                    this._element,
                    this._options.triggerEvent,
                    Ink.bind(this._onTriggerEvent, this));
            }
            if( this._options.closeOnClick ){
                InkEvent.observe( document, 'click', Ink.bind(this._onOutsideClick, this));
            }
            if( this._options.closeOnInsideClick ) {
                var sel = this._options.closeOnInsideClick;
                if (sel.toString() === 'true') {
                    sel = '*';
                }
                InkEvent.observeMulti(this._targets, 'click', Ink.bind(function (e) {
                    if ( InkElement.findUpwardsBySelector(InkEvent.element(e), sel) ) {
                        this.setState(false, true);
                    }
                }, this));
            }
        },

        /**
         * Event handler. It's responsible for handling the `triggerEvent` as defined in the options.
         *
         * This will trigger the toggle.
         *
         * @method _onTriggerEvent
         * @param {Event} event
         * @private
         */
        _onTriggerEvent: function( event ){
            // When the togglee is a child of the toggler, we get the togglee's events here. We have to check that this event is for us.
            var target = InkEvent.element(event);

            var isAncestorOfClickedElement = InkArray.some(this._targets, function (thisOne) {
                return thisOne === target || InkElement.isAncestorOf(thisOne, target);
            });

            if (!this._options.canToggleAnAncestor && isAncestorOfClickedElement) {
                return;
            }

            var has = this.getState();
            this.setState(!has, true);
            if (!has && this._firstTime) {
                this._firstTime = false;
            }

            InkEvent.stopDefault(event);
        },

        /**
         * Be compatible with accordions
         *
         * @method _updateAccordion
         **/
        _updateAccordion: function () {
            if (!this._accordionContainer) { return; }
            if (this.getState() === false) { return; }

            var elms = Selector.select('[data-is-toggle-trigger]', this._accordionContainer);
            for (var i = 0; i < elms.length; i++) {
                var otherToggle = Toggle.getInstance(elms[i]);
                if (otherToggle && (otherToggle !== this) && otherToggle.getState() === true) {
                    otherToggle.setState(false, true);
                }
            }
        },

        /**
         * Click handler. Will handle clicks outside the toggle component.
         *
         * @method _onOutsideClick
         * @param {Event} event
         * @private
         */
        _onOutsideClick: function( event ){
            var tgtEl = InkEvent.element(event);
            var shades;

            if (!InkElement.isAncestorOf(document.documentElement, tgtEl)) {
                // Because if the element was removed while the click event was
                // bubbling, we can't tell where it came from
                return;
            }

            var ancestorOfTargets = InkArray.some(this._targets, function (target) {
                return InkElement.isAncestorOf(target, tgtEl) || target === tgtEl;
            });

            if( (this._element === tgtEl) || InkElement.isAncestorOf(this._element, tgtEl) || ancestorOfTargets) {
                return;
            } else if( (shades = Ink.ss('.ink-shade')).length ) {
                var shadesLength = shades.length;

                for( var i = 0; i < shadesLength; i++ ){
                    if( InkElement.isAncestorOf(shades[i],tgtEl) && InkElement.isAncestorOf(shades[i],this._element) ){
                        return;
                    }
                }
            }

            this.setState(false, true);  // dismiss
        },

        /**
         * Sets the state of the toggle. (on/off)
         *
         * @method setState
         * @param {Boolean} on New state (on/off)
         * @param {Boolean} callHandler Whether to call the onChangeState handler.
         * @return {void}
         */
        setState: function (on, callHandler) {
            if (on === this.getState() && !this._constructing) { return; }

            var i, len;
            if (this._group && on) {
                for (i = 0, len = this._group.length; i < len; i++) {
                    if (this._group[i].getState() === true) {
                        this._group[i].setState(false, true);
                    }
                }
            }

            if (callHandler && typeof this._options.onChangeState === 'function') {
                var ret = this._options.onChangeState.call(this, on, { element: this._element });
                if (ret === false) { return false; } //  Canceled by the event handler
            }
            for (i = 0, len = this._targets.length; i < len; i++) {
                Css.addRemoveClassName(this._targets[i], this._options.classNameOn, on);
                Css.addRemoveClassName(this._targets[i], this._options.classNameOff, !on);
            }
            Css.addRemoveClassName(this._element, 'active', on);

            if (this._accordionContainer) {
                this._updateAccordion();
            }
        },

        /**
         * Gets the state of the toggle. (on/off)
         *
         * @method getState
         *
         * @return {Boolean} whether the toggle is toggled on.
         */
        getState: function () {
            return Css.hasClassName(this._element, 'active');
        }
    };

    Common.createUIComponent(Toggle);

    return Toggle;
});

/**
 * Content Tooltips
 * @module Ink.UI.Tooltip_1
 * @version 1
 */
Ink.createModule('Ink.UI.Tooltip', '1', ['Ink.UI.Common_1', 'Ink.Dom.Event_1', 'Ink.Dom.Element_1', 'Ink.Dom.Selector_1', 'Ink.Util.Array_1', 'Ink.Dom.Css_1', 'Ink.Dom.Browser_1'], function (Common, InkEvent, InkElement, Selector, InkArray, Css) {
    'use strict';

    /**
     * Tooltips are useful as a means to display information about functionality while avoiding clutter.
     *
     * Tooltips show up when you hover elements which "have" tooltips.
     *
     * This class will "give" a tooltip to many elements, selected by its first argument (`target`). This is contrary to the other UI modules in Ink, which are created once per element.
     *
     * You can define options either through the second argument of the Tooltip constructor, or as data-attributes in each `target` element. Options set through data-attributes all start with "data-tip", and override options passed into the Tooltip constructor.
     *
     * @class Ink.UI.Tooltip
     * @constructor
     *
     * @param {Element|String}      target                  Target element or selector of elements, to display the tooltips on.
     * @param {Object}              [options]               Options object
     * @param {String}              [options.text]          Text content for the tooltip.
     * @param {String}              [options.html]          HTML for the tooltip. Same as above, but won't escape HTML.
     * @param {String}              [options.where]         Positioning for the tooltip. Options are 'up', 'down', 'left', 'right', 'mousemove' (follows the cursor), and 'mousefix' (stays fixed). Defaults to 'up'.
     *     
     * @param {String}              [options.color]         Color of the tooltip. Options are red, orange, blue, green and black. Default is white.
     * @param {Number}              [options.fade]          Number of seconds to fade in/out. Defaults to 0.3.
     * @param {Boolean}             [options.forever]       Flag to prevent the tooltip from being erased when the mouse hovers away from the target.
     * @param {Number}              [options.timeout]       Number of seconds the tooltip will stay open. Useful together with options.forever. Defaults to 0.
     * @param {Number}              [options.delay]         Time the tooltip waits until it is displayed. Useful to avoid getting the attention of the user unnecessarily
     * @param {Element|Selector}    [options.template]      Element or selector containing HTML to be cloned into the tooltips. Can be a hidden element, because CSS `display` is set to `block`.
     * @param {String}              [options.templatefield] Selector within the template element to choose where the text is inserted into the tooltip. Useful when a wrapper DIV is required.
     * @param {Number}              [options.left]          Spacing from the target to the tooltip, when `where` is `mousemove` or `mousefix`. Defaults to 10.
     * @param {Number}              [options.top]           Spacing from the target to the tooltip, when `where` is `mousemove` or `mousefix`. Defaults to 10.
     * @param {Number}              [options.spacing]       Spacing between the tooltip and the target element, when `where` is not `mousemove` or `mousefix`. Defaults to 8.
     * 
     * @sample Ink_UI_Tooltip_1.html
     */
    function Tooltip(element, options) {
        this._init(element, options || {});
    }

    function EachTooltip(root, elm) {
        this._init(root, elm);
    }

    var transitionDurationName,
        transitionPropertyName,
        transitionTimingFunctionName;
    (function () {  // Feature detection
        var test = document.createElement('DIV');
        var names = ['transition', 'oTransition', 'msTransition', 'mozTransition',
            'webkitTransition'];
        for (var i = 0; i < names.length; i++) {
            if (typeof test.style[names[i] + 'Duration'] !== 'undefined') {
                transitionDurationName = names[i] + 'Duration';
                transitionPropertyName = names[i] + 'Property';
                transitionTimingFunctionName = names[i] + 'TimingFunction';
                break;
            }
        }
    }());

    // Body or documentElement
    var bodies = document.getElementsByTagName('body');
    var body = bodies.length ? bodies[0] : document.documentElement;

    Tooltip.prototype = {
        _init: function(element, options) {
            var elements;

            this.options = Ink.extendObj({
                    where: 'up',
                    zIndex: 10000,
                    left: 10,
                    top: 10,
                    spacing: 8,
                    forever: 0,
                    color: '',
                    timeout: 0,
                    delay: 0,
                    template: null,
                    templatefield: null,
                    fade: 0.3,
                    text: ''
                }, options || {});

            if (typeof element === 'string') {
                elements = Selector.select(element);
            } else if (typeof element === 'object') {
                elements = [element];
            } else {
                throw 'Element expected';
            }

            this.tooltips = [];

            for (var i = 0, len = elements.length; i < len; i++) {
                this.tooltips[i] = new EachTooltip(this, elements[i]);
            }
        },
        /**
         * Destroys the tooltips created by this instance
         *
         * @method destroy
         * @return {void}
         * @public
         */
        destroy: function () {
            InkArray.each(this.tooltips, function (tooltip) {
                tooltip._destroy();
            });
            this.tooltips = null;
            this.options = null;
        }
    };

    EachTooltip.prototype = {
        _oppositeDirections: {
            left: 'right',
            right: 'left',
            up: 'down',
            down: 'up'
        },
        _init: function(root, elm) {
            InkEvent.observe(elm, 'mouseover', Ink.bindEvent(this._onMouseOver, this));
            InkEvent.observe(elm, 'focus', Ink.bindEvent(this._onMouseOver, this));
            InkEvent.observe(elm, 'mouseout', Ink.bindEvent(this._onMouseOut, this));
            InkEvent.observe(elm, 'blur', Ink.bindEvent(this._onMouseOut, this));
            InkEvent.observe(elm, 'mousemove', Ink.bindEvent(this._onMouseMove, this));

            this.root = root;
            this.element = elm;
            this._delayTimeout = null;
            this.tooltip = null;

            Common.registerInstance(this, this.element);
        },
        _makeTooltip: function (mousePosition) {
            if (!this._getOpt('text') &&
                    !this._getOpt('html') &&
                    !InkElement.hasAttribute(this.element, 'title')) {
                return false;
            }

            var tooltip = this._createTooltipElement();

            if (this.tooltip) {
                this._removeTooltip();
            }

            this.tooltip = tooltip;

            this._fadeInTooltipElement(tooltip);
            this._placeTooltipElement(tooltip, mousePosition);

            InkEvent.observe(tooltip, 'mouseover', Ink.bindEvent(this._onTooltipMouseOver, this));

            var timeout = this._getFloatOpt('timeout');
            if (timeout) {
                setTimeout(Ink.bind(function () {
                    if (this.tooltip === tooltip) {
                        this._removeTooltip();
                    }
                }, this), timeout * 1000);
            }
        },
        _createTooltipElement: function () {
            var template = this._getOpt('template'),  // User template instead of our HTML
                templatefield = this._getOpt('templatefield'),
                
                tooltip,  // The element we float
                field;  // Element where we write our message. Child or same as the above

            if (template) {  // The user told us of a template to use. We copy it.
                var temp = document.createElement('DIV');
                temp.innerHTML = Common.elOrSelector(template, 'options.template').outerHTML;
                tooltip = temp.firstChild;
                
                if (templatefield) {
                    field = Selector.select(templatefield, tooltip);
                    if (field) {
                        field = field[0];
                    } else {
                        throw 'options.templatefield must be a valid selector within options.template';
                    }
                } else {
                    field = tooltip;  // Assume same element if user did not specify a field
                }
            } else {  // We create the default structure
                tooltip = document.createElement('DIV');
                Css.addClassName(tooltip, 'ink-tooltip');
                Css.addClassName(tooltip, this._getOpt('color'));

                field = document.createElement('DIV');
                Css.addClassName(field, 'content');

                tooltip.appendChild(field);
            }
            
            if (this._getOpt('html')) {
                field.innerHTML = this._getOpt('html');
            } else if (this._getOpt('text')) {
                InkElement.setTextContent(field, this._getOpt('text'));
            } else {
                InkElement.setTextContent(field, this.element.getAttribute('title'));
            }
            tooltip.style.display = 'block';
            tooltip.style.position = 'absolute';
            tooltip.style.zIndex = this._getIntOpt('zIndex');

            return tooltip;
        },
        _fadeInTooltipElement: function (tooltip) {
            var fadeTime = this._getFloatOpt('fade');
            if (transitionDurationName && fadeTime) {
                tooltip.style.opacity = '0';
                tooltip.style[transitionDurationName] = fadeTime + 's';
                tooltip.style[transitionPropertyName] = 'opacity';
                tooltip.style[transitionTimingFunctionName] = 'ease-in-out';
                setTimeout(function () {
                    tooltip.style.opacity = '1';
                }, 0); // Wait a tick
            }
        },
        _placeTooltipElement: function (tooltip, mousePosition) {
            var where = this._getOpt('where');

            if (mousePosition === null && (where === 'mousemove' || where === 'mousefix')) {
                // When there are no mouse coords available (focus event)
                where = 'up';
            }

            if (where === 'mousemove' || where === 'mousefix') {
                var mPos = mousePosition;
                this._setPos(mPos[0], mPos[1]);
                body.appendChild(tooltip);
            } else if (where.match(/(up|down|left|right)/)) {
                body.appendChild(tooltip);
                var targetElementPos = InkElement.offset(this.element);
                var tleft = targetElementPos[0],
                    ttop = targetElementPos[1];

                var centerh = (InkElement.elementWidth(this.element) / 2) - (InkElement.elementWidth(tooltip) / 2),
                    centerv = (InkElement.elementHeight(this.element) / 2) - (InkElement.elementHeight(tooltip) / 2);
                var spacing = this._getIntOpt('spacing');

                var tooltipDims = InkElement.elementDimensions(tooltip);
                var elementDims = InkElement.elementDimensions(this.element);

                var maxX = InkElement.scrollWidth() + InkElement.viewportWidth();
                var maxY = InkElement.scrollHeight() + InkElement.viewportHeight();
                
                where = this._getWhereValueInsideViewport(where, {
                    left: tleft - tooltipDims[0],
                    right: tleft + tooltipDims[0],
                    top: ttop + tooltipDims[1],
                    bottom: ttop + tooltipDims[1]
                }, {
                    right: maxX,
                    bottom: maxY
                });
                
                if (where === 'up') {
                    ttop -= tooltipDims[1];
                    ttop -= spacing;
                    tleft += centerh;
                } else if (where === 'down') {
                    ttop += elementDims[1];
                    ttop += spacing;
                    tleft += centerh;
                } else if (where === 'left') {
                    tleft -= tooltipDims[0];
                    tleft -= spacing;
                    ttop += centerv;
                } else if (where === 'right') {
                    tleft += elementDims[0];
                    tleft += spacing;
                    ttop += centerv;
                }
                
                var arrow = null;
                if (where.match(/(up|down|left|right)/)) {
                    arrow = document.createElement('SPAN');
                    Css.addClassName(arrow, 'arrow');
                    Css.addClassName(arrow, this._oppositeDirections[where]);
                    tooltip.appendChild(arrow);
                }

                var tooltipLeft = tleft;
                var tooltipTop = ttop;

                var toBottom = (tooltipTop + tooltipDims[1]) - maxY;
                var toRight = (tooltipLeft + tooltipDims[0]) - maxX;
                var toLeft = 0 - tooltipLeft;
                var toTop = 0 - tooltipTop;

                if (toBottom > 0) {
                    if (arrow) { arrow.style.top = (tooltipDims[1] / 2) + toBottom + 'px'; }
                    tooltipTop -= toBottom;
                } else if (toTop > 0) {
                    if (arrow) { arrow.style.top = (tooltipDims[1] / 2) - toTop + 'px'; }
                    tooltipTop += toTop;
                } else if (toRight > 0) {
                    if (arrow) { arrow.style.left = (tooltipDims[0] / 2) + toRight + 'px'; }
                    tooltipLeft -= toRight;
                } else if (toLeft > 0) {
                    if (arrow) { arrow.style.left = (tooltipDims[0] / 2) - toLeft + 'px'; }
                    tooltipLeft += toLeft;
                }

                tooltip.style.left = tooltipLeft + 'px';
                tooltip.style.top = tooltipTop + 'px';
            }
        },

        /**
         * Get a value for "where" (left/right/up/down) which doesn't put the
         * tooltip off the screen
         *
         * @method _getWhereValueInsideViewport
         * @param where {String} "where" value which was given by the user and we might change
         * @param bbox {BoundingBox} A bounding box like what you get from getBoundingClientRect ({top, bottom, left, right}) with pixel positions from the top left corner of the viewport.
         * @param viewport {BoundingBox} Bounding box for the viewport. "top" and "left" are omitted because these coordinates are relative to the top-left corner of the viewport so they are zero.
         *
         * @TODO: we can't use getBoundingClientRect in this case because it returns {0,0,0,0} on our uncreated tooltip.
         */
        _getWhereValueInsideViewport: function (where, bbox, viewport) {
            if (where === 'left' && bbox.left < 0) {
                return 'right';
            } else if (where === 'right' && bbox.right > viewport.right) {
                return 'left';
            } else if (where === 'up' && bbox.top < 0) {
                return 'down';
            } else if (where === 'down' && bbox.bottom > viewport.bottom) {
                return 'up';
            }

            return where;
        },
        _removeTooltip: function() {
            var tooltip = this.tooltip;
            if (!tooltip) {return;}

            var remove = Ink.bind(InkElement.remove, {}, tooltip);

            if (this._getOpt('where') !== 'mousemove' && transitionDurationName) {
                tooltip.style.opacity = 0;
                // remove() will operate on correct tooltip, although this.tooltip === null then
                setTimeout(remove, this._getFloatOpt('fade') * 1000);
            } else {
                remove();
            }
            this.tooltip = null;
        },
        _getOpt: function (option) {
            var dataAttrVal = InkElement.data(this.element)[InkElement._camelCase('tip-' + option)];
            if (dataAttrVal /* either null or "" may signify the absense of this attribute*/) {
                return dataAttrVal;
            }
            var instanceOption = this.root.options[option];
            if (typeof instanceOption !== 'undefined') {
                return instanceOption;
            }
        },
        _getIntOpt: function (option) {
            return parseInt(this._getOpt(option), 10);
        },
        _getFloatOpt: function (option) {
            return parseFloat(this._getOpt(option), 10);
        },
        _destroy: function () {
            if (this.tooltip) {
                InkElement.remove(this.tooltip);
            }
            this.root = null;  // Cyclic reference = memory leaks
            this.element = null;
            this.tooltip = null;
        },
        _onMouseOver: function(e) {
            // on IE < 10 you can't access the mouse event not even a tick after it fired
            var mousePosition;
            if (e.type !== 'mouseover') {
                // No mouse coords available
                mousePosition = null;
            } else {
                mousePosition = this._getMousePosition(e);
            }
            var delay = this._getFloatOpt('delay');
            if (delay) {
                this._delayTimeout = setTimeout(Ink.bind(function () {
                    if (!this.tooltip) {
                        this._makeTooltip(mousePosition);
                    }
                    this._delayTimeout = null;
                }, this), delay * 1000);
            } else {
                this._makeTooltip(mousePosition);
            }
        },
        _onMouseMove: function(e) {
            if (this._getOpt('where') === 'mousemove' && this.tooltip) {
                var mPos = this._getMousePosition(e);
                this._setPos(mPos[0], mPos[1]);
            }
        },
        _onMouseOut: function () {
            if (!this._getIntOpt('forever')) {
                this._removeTooltip();
            }
            if (this._delayTimeout) {
                clearTimeout(this._delayTimeout);
                this._delayTimeout = null;
            }
        },
        _onTooltipMouseOver: function () {
            if (this.tooltip) {  // If tooltip is already being removed, this has no effect
                this._removeTooltip();
            }
        },
        _setPos: function(left, top) {
            left += this._getIntOpt('left');
            top += this._getIntOpt('top');
            var pageDims = this._getPageXY();
            if (this.tooltip) {
                var elmDims = [InkElement.elementWidth(this.tooltip), InkElement.elementHeight(this.tooltip)];
                var scrollDim = this._getScroll();

                if((elmDims[0] + left - scrollDim[0]) >= (pageDims[0] - 20)) {
                    left = (left - elmDims[0] - this._getIntOpt('left') - 10);
                }
                if((elmDims[1] + top - scrollDim[1]) >= (pageDims[1] - 20)) {
                    top = (top - elmDims[1] - this._getIntOpt('top') - 10);
                }

                this.tooltip.style.left = left + 'px';
                this.tooltip.style.top = top + 'px';
            }
        },
        _getPageXY: function() {
            var cWidth = 0;
            var cHeight = 0;
            if( typeof( window.innerWidth ) === 'number' ) {
                cWidth = window.innerWidth;
                cHeight = window.innerHeight;
            } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
                cWidth = document.documentElement.clientWidth;
                cHeight = document.documentElement.clientHeight;
            } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
                cWidth = document.body.clientWidth;
                cHeight = document.body.clientHeight;
            }
            return [parseInt(cWidth, 10), parseInt(cHeight, 10)];
        },
        _getScroll: function() {
            var dd = document.documentElement, db = document.body;
            if (dd && (dd.scrollLeft || dd.scrollTop)) {
                return [dd.scrollLeft, dd.scrollTop];
            } else if (db) {
                return [db.scrollLeft, db.scrollTop];
            } else {
                return [0, 0];
            }
        },
        _getMousePosition: function(e) {
            return [parseInt(InkEvent.pointerX(e), 10), parseInt(InkEvent.pointerY(e), 10)];
        }
    };

    return Tooltip;
});

/**
 * Elements in a tree structure
 * @module Ink.UI.TreeView_1
 * @version 1
 */
Ink.createModule('Ink.UI.TreeView', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1'], function(Common, Event, Css, Element, Selector, InkArray ) {
    'use strict';


    /**
     * Shows elements in a tree structure which can be expanded and contracted.
     * A TreeView is built with "node"s and "children". "node"s are `li` tags, and "children" are `ul` tags.
     * You can build your TreeView out of a regular UL and  LI element structure which you already use to display lists with several levels.
     * If you want a node to be open when the TreeView is built, just add the data-open="true" attribute to it.
     * 
     * @class Ink.UI.TreeView
     * @constructor
     * @version 1
     * @param {String|Element}      selector                    Element or selector.
     * @param {String}              [options]                   Options object, containing:
     * @param {String}              [options.node]              Selector for the nodes. Defaults to 'li'.
     * @param {String}              [options.children]          Selector for the children. Defaults to 'ul'.
     * @param {String}              [options.parentClass]       CSS classes to be added to parent nodes. Defaults to 'parent'.
     * @param {String}              [options.openClass]         CSS classes to be added to the icon when a parent is open. Defaults to 'fa fa-minus-circle'.
     * @param {String}              [options.closedClass]       CSS classes to be added to the icon when a parent is closed. Defaults to 'fa fa-plus-circle'.
     * @param {String}              [options.hideClass]         CSS Class to toggle visibility of the children. Defaults to 'hide-all'.
     * @param {String}              [options.iconTag]           The name of icon tag. The component tries to find a tag with that name as a direct child of the node. If it doesn't find it, it creates it. Defaults to 'i'.
     * @param {Boolean}             [options.stopDefault]       Flag to stops the default behavior of the click handler. Defaults to true.
     * @example
     *      <ul class="ink-tree-view">
     *        <li data-open="true"><a href="#">root</a>
     *          <ul>
     *            <li><a href="#">child 1</a></li>
     *            <li><a href="#">child 2</a>
     *              <ul>
     *                <li><a href="#">grandchild 2a</a></li>
     *                <li><a href="#">grandchild 2b</a>
     *                  <ul>
     *                    <li><a href="#">grandgrandchild 1bA</a></li>
     *                    <li><a href="#">grandgrandchild 1bB</a></li>
     *                  </ul>
     *                </li>
     *              </ul>
     *            </li>
     *            <li><a href="#">child 3</a></li>
     *          </ul>
     *        </li>
     *      </ul>
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.TreeView_1'], function( Selector, TreeView ){
     *              var treeViewElement = Ink.s('.ink-tree-view');
     *              var treeViewObj = new TreeView( treeViewElement );
     *          });
     *      </script>
     * 
     * @sample Ink_UI_TreeView_1.html
     */
    function TreeView() {
        Common.BaseUIComponent.apply(this, arguments);
    }

    TreeView._name = 'TreeView_1';

    TreeView._optionDefinition = {
        'node':   ['String', 'li'],
        'children':  ['String','ul'],
        'parentClass': ['String','parent'],
        'openNodeClass': ['String', 'open'],
        'openClass': ['String','fa fa-minus-circle'],
        'closedClass': ['String','fa fa-plus-circle'],
        'hideClass': ['String','hide-all'],
        'iconTag': ['String', 'i'],
        'stopDefault' : ['Boolean', true]
    };

    TreeView.prototype = {
        /**
         * Init function called by the constructor. Sets the necessary event handlers.
         * 
         * @method _init
         * @private
         */
        _init: function(){
            this._handlers = {
                click: Ink.bindEvent(this._onClick,this)
            };

            Event.on(this._element, 'click', this._options.node, this._handlers.click);

            InkArray.each(Ink.ss(this._options.node, this._element), Ink.bind(function(item){
                if( this.isParent(item) ) {
                    Css.addClassName(item, this._options.parentClass);

                    var isOpen = this.isOpen(item);
                    if( !this._getIcon(item) ){
                        Element.create(this._options.iconTag, { insertTop: item });
                    }

                    this._setNodeOpen(item, isOpen);
                }
            },this));
        },

        _getIcon: function (node) {
            return Ink.s('> ' + this._options.iconTag, node);
        },

        /**
         * Checks if a node is open.
         *
         * @method isOpen
         * @param {Element} node  The tree node to check
         * @return {Boolean} Whether the node is open.
         **/
        isOpen: function (node) {
            if (!this._getChild(node)) {
                throw new Error('not a node!');
            }

            return node.getAttribute('data-open') === 'true' ||
                Css.hasClassName(node, this._options.openNodeClass);
        },

        /**
         * Checks if a node is a parent.
         *
         * @method isParent
         * @param {Element} node     Node to check
         * @return {Boolean} Whether `node` is a parent.
         **/
        isParent: function (node) {
            return Css.hasClassName(node, this._options.parentClass) ||
                this._getChild(node) != null;
        },

        _setNodeOpen: function (node, beOpen) {
            var child = this._getChild(node);
            if (child) {
                Css.setClassName(child, this._options.hideClass, !beOpen);
                var icon = this._getIcon(node);

                node.setAttribute('data-open', beOpen);

                /*
                 * Don't refactor this to
                 *
                 * setClassName(el, className, status); setClassName(el, className, !status);
                 *
                 * because it won't work with multiple classes.
                 *
                 * Doing:
                 * setClassName(el, 'fa fa-whatever', true);setClassName(el, 'fa fa-whatever-else', false);
                 *
                 * will remove 'fa' although it is a class we want.
                 */

                var toAdd = beOpen ? this._options.openClass : this._options.closedClass;
                var toRemove = beOpen ? this._options.closedClass : this._options.openClass;
                Css.removeClassName(icon, toRemove);
                Css.addClassName(icon, toAdd);

                Css.setClassName(node, this._options.openNodeClass, beOpen);
            } else {
                Ink.error('Ink.UI.TreeView: node', node, 'is not a node!');
            }
        },

        /**
         * Opens one of the tree nodes
         *
         * Make sure you pass the node's Element
         * @method open
         * @param {Element} node     The node you wish to open.
         * @return {void}
         **/
        open: function (node) {
            this._setNodeOpen(node, true);
        },

        /**
         * Closes one of the tree nodes
         *
         * Make sure you pass the node's Element
         * @method close
         * @param {Element} node     The node you wish to close.
         * @return {void}
         **/
        close: function (node) {
            this._setNodeOpen(node, false);
        },

        /**
         * Toggles a node state
         *
         * @method toggle
         * @param {Element} node     The node to toggle.
         * @return {void}
         **/
        toggle: function (node) {
            if (this.isOpen(node)) {
                this.close(node);
            } else {
                this.open(node);
            }
        },

        /**
         * @method _getChild
         **/
        _getChild: function (node) {
            return Selector.select(this._options.children, node)[0] || null;
        },

        /**
         * Handles the click event (as specified in the _init function).
         * 
         * @method _onClick
         * @param {Event} ev DOM click event.
         * @return {void}
         * @private
         */
        _onClick: function(ev){
            /**
             * Summary:
             * If the clicked element is a "node" as defined in the options, will check if it has any "child".
             * If so, will toggle its state and stop the event's default behavior if the stopDefault option is true.
             **/

            if (!this.isParent(ev.currentTarget) ||
                    Selector.matchesSelector(ev.target, this._options.node) ||
                    Selector.matchesSelector(ev.target, this._options.children)) {
                return;
            }

            if (this._options.stopDefault){
                ev.preventDefault();
            }

            this.toggle(ev.currentTarget);
        }
    };

    Common.createUIComponent(TreeView);

    return TreeView;
});

Ink.createModule('Ink.UI.Upload', '1', [
    'Ink.Dom.Event_1',
    'Ink.Dom.Element_1',
    'Ink.Dom.Browser_1',
    'Ink.UI.Common_1'
], function(Event, Element, Browser, Common) {
    'use strict';

    var DirectoryReader = function(options) {
        this.init(options);
    };

    DirectoryReader.prototype = {
        init: function(options) {
            this._options = Ink.extendObj({
                entry:      undefined,
                maxDepth:   10
            }, options || {});

            try {
                this._read();
            } catch(e) {
                Ink.error(e);
            }
        },


        _read: function() {
            if(!this._options.entry) {
                Ink.error('You must specify the entry!');
                return;
            }

            try {
                this._readDirectories();
            } catch(e) {
                Ink.error(e);
            }
        },


        _readDirectories: function() {
            var entries         = [],
                running         = false,
                maxDepth        = 0;

            /* TODO return as tree because much better well */
            var _readEntries = Ink.bind(function(currentEntry) {
                var dir     = currentEntry.createReader();
                    running = true;

                dir.readEntries(Ink.bind(function(res) {
                    if(res.length > 0) {
                        for(var i = 0, len = res.length; i<len; i++) {
                            entries.push(res[i]);
                            if(!res[i].isDirectory) {
                                continue;
                            }
                            maxDepth = this.clearArray(res[i].fullPath.split('/'));
                            maxDepth.shift();
                            maxDepth = maxDepth.length;
                            if(maxDepth <= this._options.maxDepth) {
                                _readEntries(res[i]);
                            }
                        }
                        if(this._stopActivityTimeout) {
                            clearTimeout(this._stopActivityTimeout);
                        }
                        this._stopActivityTimeout = setTimeout(function() {
                            running = false;
                        }, 250);
                    }
                    if(!res.length) {
                        running = false;
                    }
                }, this), Ink.bind(function(err) {
                    this._options.readError(err, currentEntry);
                }, this));
            }, this);

            _readEntries(this._options.entry);

            var activity;
            var checkActivity = function() {
                if(running) {
                    return false;
                }
                clearInterval(activity);
                if(this._options.readComplete && typeof this._options.readComplete === 'function') {
                    this._options.readComplete(entries);
                }
                return true;
            };

            activity = setInterval(Ink.bind(checkActivity, this), 250);
        },


        clearArray: function(arr) {
            for(var i = arr.length - 1; i>=0; i--) {
                if(typeof(arr[i]) === 'undefined' || arr[i] === null || arr[i] === '') {
                    arr.splice(i, 1);
                }
            }
            return arr;
        }
    };

    var Queue = {
        lists:  [],
        items:  [],


        /**
         * Create new queue list
         * @function create
         * @public
         * @param {String} list name
         * @param {Function} function to iterate on items
         * @return {Object} list id
        */
        create: function(name) {
            var id;
                name = String(name);
            this.lists.push({name: name});
            id = this.lists.length - 1;
            return id;
        },


        getItems: function(parentId) {
            if(!parentId) {
                return this.items;
            }
            var items = [];
            for(var i = 0, len = this.items.length; i<len; i++) {
                if(this.items[i].parentId === parentId) {
                    items.push(this.items[i]);
                }
            }

            return items;
        },


        /**
         * Delete list
         * @function purge
         * @public
         * @param {String} List name
         * @return {Object} removed list
        */
        purge: function(id, keepList) {
            if(typeof(id) !== 'number' || isNaN(Number(id))) {
                return false;
            }
            try {
                for(var i = this.items.length; i>=0; i--) {
                    if(this.items[i] && id === this.items[i].parentId) {
                        this.remove(this.items[i].parentId, this.items[i].pid);
                    }
                }
                if(!keepList) {
                    this.lists.splice(id, 1);
                }
                return true;
            } catch(e) {
                Ink.error('Purge: invalid id');
                return false;
            }
        },


        /**
         * add an item to a list
         * @function add
         * @public
         * @param {String} name
         * @param {Object} item
         * @return {Number} pid
        */
        add: function(parentId, item, priority) {
            if(!this.lists[parentId]) {
                return false;
            }
            if(typeof(item) !== 'object') {
                item = String(item);
            }

            var pid = parseInt(Math.round(Math.random() * 100000) + "" + Math.round(Math.random() * 100000), 10);
            priority    = priority || 0;

            this.items.push({parentId: parentId, item: item, priority: priority || 0, pid: pid});
            return pid;
        },


        /**
         * View list
         * @function view
         * @public
         * @param {Number} list id
         * @param {Number} process id
         * @return {Object} item
        */
        view: function(parentId, pid) {
            var id = this._searchByPid(parentId, pid);
            if(id === false) {
                return false;
            }
            return this.items[id];
        },


        /**
         * Remove an item
         * @function remove
         * @public
         * @param {Object} item
         * @return {Object|Boolean} removed item or false if not found
        */
        remove: function(parentId, pid) {
            try {
                var id = this._searchByPid(parentId, pid);
                if(id === false) {
                    return false;
                }
                this.items.splice(id, 1);
                return true;
            } catch(e) {
                Ink.error('Remove: invalid id');
                return false;
            }
        },

        _searchByPid: function(parentId, pid) {
            if(!parentId && typeof(parentId) === 'boolean' || !pid) {
                return false;
            }

            parentId    = parseInt(parentId, 10);
            pid         = parseInt(pid, 10);

            if(isNaN(parentId) || isNaN(pid)) {
                return false;
            }

            for(var i = 0, len = this.items.length; i<len; i++) {
                if(this.items[i].parentId === parentId && this.items[i].pid === pid) {
                    return i;
                }
            }
            return false;
        }
    };

    var UI = function(Upload) {
        this.Upload = Upload;
        this.init();
    };

    UI.prototype = {
        init: function() {
            this._fileButton = this.Upload._options.fileButton;
            this._dropzone = this.Upload._options.dropzone;
            this._setDropEvent();
            this._setFileButton();
        },


        _setDropEvent: function() {
            var dropzones = this._dropzone;
            if (!dropzones) { return; }

            for(var i = 0, len = dropzones.length; i<len; i++) {
                dropzones[i].ondrop        = Ink.bindEvent(this.Upload._dropEventHandler, this.Upload);
                dropzones[i].ondragleave   = Ink.bindEvent(this._onDragLeave, this);
                dropzones[i].ondragend     = Ink.bindEvent(this._onDragEndEventHandler, this);
                dropzones[i].ondragdrop    = Ink.bindEvent(this._onDragEndEventHandler, this);
                dropzones[i].ondragenter   = Ink.bindEvent(this._onDragEnterHandler, this);
                dropzones[i].ondragover    = Ink.bindEvent(this._onDragOverHandler, this);
            }
        },


        _onDragEnterHandler: function(ev) {
            if(ev && ev.stopPropagation) {
                ev.stopPropagation();
            }
            if(ev && ev.preventDefault) {
                ev.preventDefault();
            }
            if(ev) {
                ev.returnValue = false;
            }

            this.Upload.publish('DragEnter', ev);
            return false;
        },


        _onDragOverHandler: function(ev) {
            if(!ev) {
                return false;
            }
            ev.preventDefault();
            ev.stopPropagation();
            ev.returnValue = false;
            return true;
        },


        _onDragLeave: function(ev) {
            return this.Upload.publish('DragLeave', ev);
        },


        _onDragEndEventHandler: function(ev) {
            return this.Upload.publish('DragEnd', ev);
        },


        _setFileButton: function() {
            var btns = this._fileButton;
            if (!btns) { return; }
            Event.observeMulti(btns, 'change', Ink.bindEvent(this._fileChangeHandler, this));
        },


        _fileChangeHandler: function(ev) {
            var btn = Event.element(ev);
            var files = btn.files;
            var form = Element.findUpwardsByTag(btn, 'form');

            if(!files || !window.FormData || !('withCredentials' in new XMLHttpRequest())) {
                form.parentNode.submit();
                return false;
            }
            this.Upload._addFilesToQueue(files);
            btn.value = "";
        }
    };






    var Upload = function(options) {
        this.Queue = Queue;
        this.init(options);
        this._events = {};
    };

    Upload.prototype = {
        //_events: {},
        
        /**
         * This component is used to enable HTML5 upload on forms easily. It
         * evens out differences between browsers which support HTML5 upload,
         * and supports chunked uploads and directory tree uploads.
         *
         * Choose a drop zone and/or a file input. When the user drops the file
         * on the drop zone element, or chooses it using the file input,
         * Ink.UI.Upload takes care of uploading it through AJAX POST.
         *
         * The name given to the file in the POST request's data is chosen
         * through the `fileFormName` option.
         *
         * On the server side, you will receive a POST with a Content-type of
         * `multipart/form-data` or `x-www-form/urlencoded` if `useChunks`
         * is `true`.
         *
         * @class Ink.UI.Upload_1
         * @constructor
         *
         * @param options {Object} Options hash, containing:
         * @param [options.dropzone] {Element} Element where the user can drop files onto.
         * @param [options.fileButton] {Element} An `input[type="file"]` for the user to choose a file using a native dialog.
         * @param [options.fileFormName='Ink_Filelist'] The name of the file in the POST request.
         * @param [options.endpoint=window.location] The URL where we're POSTing the files to. Defaults to the current location, like a HTML form.
         * @param [options.maxFileSize] Maximum file size in bytes. Defaults to 300mb.
         * @param [INVALID_FILE_NAME] A regular expression to invalidate file names. For example, set this to `/\.png$/` if you don't want files with the ".png" extension. Remember that file extensions are just hints!
         * @param [options.extraData] Add more data to your POST request. Each key in this hash gets added to the form data sent to the server.
         * TODO chunk options, also write a bit above about chunking and the serverside of chunking.
         * TODO directory options, also write a bit above about directories and the server end of directories.
         */
        init: function(options) {
            if (typeof options === 'string') {
                options = Element.data(Common.elOrSelector(options, '1st argument'));
            }
            this._options = Ink.extendObj({
                dropzone:           undefined,
                fileButton:         undefined,
                fileFormName:       'Ink_Filelist',  // TODO default to fileButton's [name] if available.
                endpoint:           '',
                maxFilesize:        300 << 20, //300mb
                INVALID_FILE_NAME:  undefined,
                extraData:          {},
                // Chunks
                useChunks:          false,
                chunkSize:          4194304,  // 4MB
                minSizeToUseChunks: 20971520, // 20mb
                endpointChunk:      '',  // Where to send chunk data.
                endpointChunkCommit:'',  // Where to send the "chunk transaction" commit.
                // Directory trees
                foldersEnabled:     false,
                directoryMaxDepth:  10
            }, options || {});

            this._queueId           = Queue.create('Ink_UPLOAD');
            this._queueRunning      = false;
            this._folders           = {};


            if(this._options.dropzone) {
                this._options.dropzone =
                    Common.elsOrSelector(this._options.dropzone, 'Ink.UI.Upload - dropzone');
            }

            if(this._options.fileButton) {
                this._options.fileButton =
                    Common.elsOrSelector(this._options.fileButton, 'Ink.UI.Upload - fileButton');
            }

            if(!this._options.dropzone && !this._options.fileButton) {
                throw new TypeError(
                    'Ink.UI.Upload: Specify a fileButton or a Dropzone!');
            }

            new UI(this);
        },


        _supportChunks: function(size) {
            return this._options.useChunks &&
                    'Blob' in window &&
                    (new Blob()).slice &&
                    size > this._options.minSizeToUseChunks;
        },


        _dropEventHandler: function(ev) {
            Event.stopDefault(ev);

            this.publish('DropComplete', ev.dataTransfer);

            var data = ev.dataTransfer;

            if(!data || !data.files || !data.files.length) {
                return false;
            }

            this._files = data.files;
            this._files = Array.prototype.slice.call(this._files || [], 0);

            // check if webkitGetAsEntry exists on first item
            if(data.items && data.items[0] && data.items[0].webkitGetAsEntry) {
                if(!this._options.foldersEnabled) {
                    return setTimeout(Ink.bind(this._addFilesToQueue, this, this._files), 0);
                }
                var entry, folders = [];
                for(var i = ev.dataTransfer.items.length-1; i>=0; i--) {
                    entry = ev.dataTransfer.items[i].webkitGetAsEntry();
                    if(entry && entry.isDirectory) {
                        folders.push(entry);
                        this._files[i].isDirectory = true;
                        this._files.splice(i, 1);
                    }
                }
                // starting callback hell
                this._addFolderToQueue(folders, Ink.bind(function() {
                    setTimeout(Ink.bind(this._addFilesToQueue, this, this._files), 0);
                }, this));
            } else {
                setTimeout(Ink.bind(this._addFilesToQueue, this, this._files), 0);
            }

            return true;
        },


        _addFolderToQueue: function(folders, cb) {
            var files = [], invalidFolders = {};

            if(!folders || !folders.length) {
                cb();
                return files;
            }

            var getFiles = function(entries) {
                var files = [];
                for(var i = 0, len = entries.length; i<len; i++) {
                    if(entries[i].isFile) {
                        files.push(entries[i]);
                    }
                }
                return files;
            };

            var convertToFile = function(cb, index) {
                var fullPath;
                index = index || 0;
                if(!this._files[index]) {
                    cb();
                    return files;
                }
                if(this._files[index].constructor.name.toLowerCase() !== 'fileentry') {
                    return convertToFile.apply(this, [cb, ++index]);
                }
                this._files[index].file(Ink.bind(function(res) {
                    fullPath = this._files[index].fullPath; // bug
                    this._files[index]              = res;
                    this._files[index].hasParent    = true;

                    // if browser don't have it natively, set it
                    if(!this._files[index].fullPath) {
                        this._files[index].fullPath = fullPath;
                    }
                    convertToFile.apply(this, [cb, ++index]);
                }, this), Ink.bind(function() {
                    this._files.splice(index, 1);
                    convertToFile.apply(this, [cb, index]);
                }, this));
            };

            var getSubDirs = Ink.bind(function(index) {
                if(!folders[index]) {
                    this._files = this._files.concat(files);
                    convertToFile.call(this, cb);
                    return false;
                }

                new DirectoryReader({
                    entry:      folders[index],
                    maxDepth:   this._options.directoryMaxDepth,
                    readComplete: Ink.bind(function(entries) {
                        files = files.concat(getFiles(entries));
                        // adding root dirs
                        if(!folders[index] || folders[index].fullPath in this._folders) {
                            return;
                        }

                        this._folders[folders[index].fullPath] = {
                            items:      entries,
                            files:      files,
                            length:     entries.length,
                            created:    false,
                            root:       true
                        };

                        // adding sub dirs
                        for(var i = 0, len = entries.length; i<len; i++) {
                            if(entries[i].isFile) {
                                continue;
                            }
                            if(entries[i].fullPath in invalidFolders) {
                                delete invalidFolders[entries[i].fullPath];
                                continue;
                            }
                            this._folders[entries[i].fullPath] = {
                                created:    false,
                                root:       false
                            };
                        }
                        getSubDirs(++index);
                    }, this),
                    readError: Ink.bind(function(err, dir) {
                        invalidFolders[dir.fullPath] = {};
                        invalidFolders[dir.fullPath].error = err;
                    }, this)
                });
            }, this);

            getSubDirs(0);
            return files;
        },


        _addFilesToQueue: function(files) {
            var file, fileID, o;
            for(var i = 0, len = files.length; i<len; i++) {
                file = files[i];

                if(!file.isDirectory) {
                    // dirty hack to allow 0B files avoiding folders on GECKO
                    if(file === null || (!file.type && file.size % 4096 === 0 && (!Browser.CHROME || !this._options.foldersEnabled))) {
                        this.publish('InvalidFile', file, 'size');
                        continue;
                    }
                }

                if(file.size > this._options.maxFilesize) {
                    this.publish('MaxSizeFailure', file, this._options.maxFilesize);
                    continue;
                }

                fileID = parseInt(Math.round(Math.random() * 100000) + "" + Math.round(Math.random() * 100000), 10);
                o = { id: i, data: file, fileID: fileID, directory: file.isDirectory };
                Queue.add(this._queueId, o);

                this.publish('FileAddedToQueue', o);
            }
            this._processQueue(true);
            this._files = [];
        },


        _processQueue: function(internalUpload) {
            if(this._queueRunning) {
                return false;
            }

            this.running = 0;
            var max = 1, i = 0, items,
                queueLen = Queue.items.length;
            this._queueRunning = true;

            this.interval = setInterval(Ink.bind(function() {
                if(Queue.items.length === i && this.running === 0) {
                    Queue.purge(this._queueId, true);
                    this._queueRunning = false;
                    clearInterval(this.interval);
                    this.publish('QueueEnd', this._queueId, queueLen);
                }

                items = Queue.getItems(this._queueId);

                if(this.running < max && items[i]) {
                    if(!items[i].canceled) {
                        _doRequest.call(this, items[i].pid, items[i].item.data, items[i].item.fileID, items[i].item.directory, internalUpload);
                        this.running++;
                        i++;
                    } else {
                        var j = i;
                        while(items[j] && items[j].canceled) {
                            i++;
                            j++;
                        }
                    }
                    return true;
                }
                return false;
            }, this), 100);


            var _doRequest = function(pid, data, fileID, directory, internalUpload) {
                var o = {
                    file:   data,
                    fileID: fileID,
                    cb: Ink.bind(function() {
                        this.running--;
                    }, this)
                };
                if(internalUpload) {
                    if(directory) {
                        // do magic
                        o.cb();
                    } else {
                        this._upload(o);
                    }
                }
            };

            return true;
        },


        _upload: function(o) {
            var file = o.file,
                xhr = new XMLHttpRequest(),
                fileID = o.fileID;

            this.publish('BeforeUpload', file, this._options.extraData, fileID, xhr, this._supportChunks(file.size));

            var forceAbort = function(showError) {
                if(o.cb && typeof(o.cb === 'function')) {
                    o.cb();
                }

                this.publish('OnProgress', {
                    length: file.size,
                    lengthComputable: true,
                    loaded: file.size,
                    total: file.size
                }, file, fileID);
                this.publish('EndUpload', file, fileID, (showError ? { error: true } : true));
                this.publish('InvalidFile', file, 'name');
                xhr.abort();
            };

            if(this._options.INVALID_FILE_NAME && this._options.INVALID_FILE_NAME instanceof RegExp) {
                if(this._options.INVALID_FILE_NAME.test(o.file.name)) {
                    forceAbort.call(this);
                    return;
                }
            }

            // If file was renamed, abort it
            // FU OPERA: Opera always return lastModified date as null
            if(!file.lastModifiedDate && !Ink.Dom.Browser.OPERA) {
                forceAbort.call(this, true);
                return;
            }

            xhr.upload.onprogress = Ink.bind(this.publish, this, 'OnProgress', file, fileID);

            var endpoint, method;
            if(this._supportChunks(file.size)) {
                if(file.size <= file.chunk_offset) {
                    endpoint = this._options.endpointChunkCommit;
                    method = 'POST';
                } else {
                    endpoint = this._options.endpointChunk;
                    if(file.chunk_upload_id) {
                        endpoint += '?upload_id=' + file.chunk_upload_id;
                    }
                    if(file.chunk_offset) {
                        endpoint += '&offset=' + file.chunk_offset;
                    }
                    method = 'PUT';
                }
            } else {
                endpoint = this._options.endpoint;
                method = 'POST';
            }

            xhr.open(method, endpoint, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader("x-requested-with", "XMLHttpRequest");
            if(this._supportChunks(file.size)) {
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            }

            var fd = new FormData(),
                blob;

            if("Blob" in window && typeof Blob === 'function') {
                blob = new Blob([file], { type: file.type });
                if(this._supportChunks(file.size)) {
                    file.chunk_offset = file.chunk_offset || 0;
                    blob = blob.slice(file.chunk_offset, file.chunk_offset + this._options.chunkSize);
                } else {
                    fd.append(this._options.fileFormName, blob, file.name);
                }
            } else {
                fd.append(this._options.fileFormName, file);
            }

            if(!this._supportChunks(file.size)) {
                for(var k in this._options.extraData) {
                    if(this._options.extraData.hasOwnProperty(k)) {
                        fd.append(k, this._options.extraData[k]);
                    }
                }
            } else {
                fd.append('upload_id', file.chunk_upload_id);
                fd.append('path', file.upload_path);
            }

            if(!file.hasParent) {
                if(!this._supportChunks(file.size)) {
                    xhr.send(fd);
                } else {
                    if(file.size <= file.chunk_offset) {
                        xhr.send('upload_id=' + file.chunk_upload_id + '&path=' + file.upload_path + '/' + file.name);
                    } else {
                        xhr.send(blob);
                    }
                }
            } else {
                this.publish('cbCreateFolder', file.parentID, file.fullPath, this._options.extraData, this._folders, file.rootPath, Ink.bind(function() {
                    if(!this._supportChunks(file.size)) {
                        xhr.send(fd);
                    } else {
                        if(file.size <= file.chunk_offset) {
                            xhr.send('upload_id=' + file.chunk_upload_id + '&path=' + file.upload_path + '/' + file.name);
                        } else {
                            xhr.send(blob);
                        }
                    }
                }, this));
            }


            xhr.onload = Ink.bindEvent(function() {
                /* jshint boss:true */
                if(this._supportChunks(file.size) && file.size > file.chunk_offset) {
                    if(xhr.response) {
                        var response = JSON.parse(xhr.response);

                        // check expected offset
                        var invalidOffset = file.chunk_offset && response.offset !== (file.chunk_offset + this._options.chunkSize) && file.size !== response.offset;
                        if(invalidOffset) {
                            if(o.cb) {
                                o.cb();
                            }
                            this.publish('ErrorUpload', file, fileID);
                        } else {
                            file.chunk_upload_id = response.upload_id;
                            file.chunk_offset = response.offset;
                            file.chunk_expires = response.expires;
                            this._upload(o);
                        }
                    } else {
                        if(o.cb) {
                            o.cb();
                        }
                        this.publish('ErrorUpload', file, fileID);
                    }
                    return (xhr = null);
                }

                if(o.cb) {
                    o.cb();
                }

                if(xhr.responseText && xhr['status'] < 400) {
                    this.publish('EndUpload', file, fileID, xhr.responseText);
                } else {
                    this.publish('ErrorUpload', file, fileID);
                }
                return (xhr = null);
            }, this);


            xhr.onerror = Ink.bindEvent(function() {
                if(o.cb) {
                    o.cb();
                }
                this.publish('ErrorUpload', file, fileID);
            }, this);

            xhr.onabort = Ink.bindEvent(function() {
                if(o.cb) {
                    o.cb();
                }
                this.publish('AbortUpload', file, fileID, {
                    abortAll: Ink.bind(this.abortAll, this),
                    abortOne: Ink.bind(this.abortOne, this)
                });
            }, this);
        },


        abortAll: function() {
            if(!this._queueRunning) {
                return false;
            }
            clearInterval(this.interval);
            this._queueRunning = false;
            Queue.purge(this._queueId, true);
            return true;
        },

        abortOne: function(id, cb) {
            var items = Queue.getItems(0),
                o;
            for(var i = 0, len = items.length; i<len; i++) {
                if(items[i].item.fileID === id) {
                    o = {
                        id:         items[i].item.fileID,
                        name:       items[i].item.data.name,
                        size:       items[i].item.data.size,
                        hasParent:  items[i].item.data.hasParent
                    };
                    Queue.remove(0, items[i].pid);
                    if(cb) {
                        cb(o);
                    }
                    return true;
                }
            }
            return false;
        },


        subscribe: function(eventName, fn) {
            if(!this._events[eventName]) {
                this._events[eventName] = [];
            }
            this._events[eventName].push(fn);
            return this._events[eventName];
        },


        publish: function(eventName) {
            var events = this._events[eventName],
                args = Array.prototype.slice.call(arguments || [], 0);

            if(!events) {
                return;
            }

            for(var i = 0, len = events.length; i<len; i++) {
                try {
                    events[i].apply(this, args.splice(1, args.length));
                } catch(err) {
                    Ink.error(eventName + ": " + err);
                }
            }
        }
    };

    return Upload;
});
