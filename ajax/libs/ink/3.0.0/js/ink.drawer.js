/**
 * @module Ink.UI.Drawer_1
 * Off-canvas menu
 * @version 1
 */
 
Ink.createModule('Ink.UI.Drawer', '1', ['Ink.UI.Common_1', 'Ink.Dom.Loaded_1', 'Ink.Dom.Selector_1', 'Ink.Dom.Element_1', 'Ink.Dom.Event_1', 'Ink.Dom.Css_1'], function(Common, Loaded, Selector, Element, Event, Css) {
    'use strict';

    function elNotFound(el) {
        Ink.warn( 'Ink.UI.Drawer_1: Could not find the "' +
            el + '" element on this page. Please make sure it exists.' );
    }

    function Drawer(options) {
        this._init(options);
    }

    Drawer.prototype = {
        /**
         * Displays off-canvas content which can be triggered by clicking elements with the 'left-drawer-trigger' and 'right-drawer-trigger', respectively.
         *
         * The left drawer has the 'left-drawer' class, and the right drawer has the 'right-drawer' class.
         *
         * The content drawer (EG your `<div id="main">`) must have the 'content-drawer' class.
         *
         * For more, see the example below, or try the sample.
         *
         * @class Ink.UI.Drawer_1
         * @constructor
         *
         * @xparam {Object}     [options]                       Configuration options.
         * @xparam {String}     [options.parentSelector]        The class you are using in your wrapper (in the example below, it's the `body` tag.
         * @xparam {String}     [options.leftDrawer]            Selector for the left drawer element. This element is placed outside the screen and shown when you click the `leftTrigger` element.
         * @xparam {String}     [options.leftTrigger]           Selector for the left drawer trigger(s). When you click this trigger, the `leftDrawer` is shown.
         * @xparam {String}     [options.rightDrawer]           Right drawer selector. (see `options.leftDrawer`)
         * @xparam {String}     [options.rightTrigger]          Right trigger selector (see `options.leftTrigger`)
         * @xparam {String}     [options.contentDrawer]         Selector for the content drawer.
         * @param {Boolean}     [options.closeOnContentClick]   Flag to close the drawer when someone clicks on the `.contentDrawer`
         * @param {String}      [options.mode]                  This can be 'push' or 'hide'.
         * @param {String}      [options.sides]                 Can be 'left', 'right', or 'both'. Controls from which sides the content
         *
         * @example
         *
         *      <body class="ink-drawer">
         *          <div class="left-drawer">
         *              Right drawer content...
         *          </div>
         *          <div class="right-drawer">
         *              Left drawer content...
         *          </div>
         *          <div id="main-content" class="content-drawer ink-grid">
         *              <a class="left-drawer-trigger" href="">Open left drawer</a>
         *              <a class="right-drawer-trigger" href="">Open right drawer</a>
         *              Content...
         *          </div>
         *      </body>
         *
         *      <script>
         *          Ink.requireModules(['Ink.UI.Drawer_1'], function (Drawer) {
         *              new Drawer();
         *          });
         *      </script>
         */
        _init: function (options) {
            this._options = Common.options({
                parentSelector:     ['String', '.ink-drawer'],
                leftDrawer:         ['String', '.left-drawer'],
                leftTrigger:        ['String', '.left-drawer-trigger'],
                rightDrawer:        ['String', '.right-drawer'],
                rightTrigger:       ['String', '.right-drawer-trigger'],
                contentDrawer:      ['String', '.content-drawer'],
                closeOnContentClick: ['Boolean', true],
                closeOnLinkClick:    ['Boolean', true],
                mode:               ['String', 'push'],
                sides:              ['String', 'both']
            }, options || {});

            // make sure we have the required elements acording to the config options

            this._contentDrawers = Ink.ss(this._options.contentDrawer);

            this._leftDrawer = Ink.s(this._options.leftDrawer);
            this._leftTriggers = Ink.ss(this._options.leftTrigger);

            this._rightDrawer = Ink.s(this._options.rightDrawer);
            this._rightTriggers = Ink.ss(this._options.rightTrigger);

            // The body might not have it
            Css.addClassName(document.body, 'ink-drawer');

            if(this._contentDrawers.length === 0) {
                Ink.warn( 'Ink.UI.Drawer_1: Could not find any "' +
                    this._options.contentDrawer + '" elements on this page. ' +
                    'Please make sure you have at least one.' );
            }

            switch (this._options.sides) {
                case 'both':
                if( !this._leftDrawer ){
                    elNotFound(this._options.leftDrawer);
                }

                if(this._leftTriggers.length === 0){
                    elNotFound(this._options.leftTrigger);
                }

                if( !this._rightDrawer ){
                    elNotFound(this._options.rightDrawer);
                }

                if( this._rightTriggers.length === 0 ){
                    elNotFound(this._options.rightTrigger);
                }
                this._triggers = this._options.leftTrigger + ', ' + this._options.rightTrigger + ', ' + this._options.contentDrawer;
                break;

                case 'left':
                if( !this._leftDrawer ){
                    elNotFound(this._options.leftDrawer);
                }

                if(this._leftTriggers.length === 0){
                    elNotFound(this._options.leftTrigger);
                }
                this._triggers = this._options.leftTrigger + ', ' + this._options.contentDrawer;
                break;

                case 'right':
                if( !this._rightDrawer ){
                    elNotFound(this._options.rightDrawer);
                }

                if( this._rightTriggers.length === 0 ){
                    elNotFound(this._options.rightTrigger);
                }
                this._triggers = this._options.rightTrigger + ', ' + this._options.contentDrawer;
                break;
            }


            this._isOpen = false;
            this._direction = undefined;

            this._handlers = {
                click:     Ink.bindEvent(this._onClick, this),
                afterTransition: Ink.bindEvent(this._afterTransition, this)
            };
            this._delay = 10;
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
            var triggerClicked = Ink.bind(function (side) {
                // When clicking on the trigger, the corresponding side is toggled.
                if (this._isOpen) {
                    this.close();
                } else {
                    this.open(side);
                }
            }, this);

            if(Selector.matchesSelector(ev.currentTarget,this._options.leftTrigger)){
                // Clicked on the left trigger
                triggerClicked('left');
            } else if(Selector.matchesSelector(ev.currentTarget,this._options.rightTrigger)){
                triggerClicked('right');
            } else if(Selector.matchesSelector(ev.currentTarget,this._options.contentDrawer)){
                // Clicked on the rest of the body
                if(this._options.closeOnContentClick) {
                    this.close();
                }
            }

            // Clicked on a link
            if (this._options.closeOnLinkClick && Element.isLink(ev.target)) {
                this.close();
            }
        },

        _afterTransition: function(){
            if(!this._isOpen){
                if(this._direction === 'left') {
                    Css.removeClassName(this._leftDrawer, 'show');
                } else {
                    Css.removeClassName(this._rightDrawer, 'show');
                }
            }
        },

        _addEvents: function(){
            Event.on(document.body, 'click', this._triggers + ', a[href*="#"]', this._handlers.click);
        },

        open: function(direction) {
            this._isOpen = true;
            this._direction = direction;

            var open = direction === 'left' ?
                this._leftDrawer :
                this._rightDrawer;

            Css.addClassName(open,'show');
            setTimeout(Ink.bind(function(){
                Css.addClassName(document.body, [this._options.mode, direction]);
            },this), this._delay);
        },

        close: function() {
            if (this._isOpen === false) { return; }
            this._isOpen = false;
            // TODO detect transitionEnd exists, otherwise don't rely on it
            Event.one(document.body, 'transitionend oTransitionEnd transitionend webkitTransitionEnd', this._handlers.afterTransition);
            Css.removeClassName(document.body, [this._options.mode, this._direction]);
        }

    };

    return Drawer;
});