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
