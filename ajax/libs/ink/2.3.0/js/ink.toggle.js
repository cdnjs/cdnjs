/**
 * @module Ink.UI.Toggle_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Toggle', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1'], function(Common, InkEvent, Css, InkElement, Selector, InkArray ) {
    'use strict';

    /**
     * Toggle component
     * 
     * @class Ink.UI.Toggle
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     *     @param {String}       options.target                    CSS Selector that specifies the elements that this component will toggle
     *     @param {String}       [options.classNameOn='show-all']  className when toggle is On
     *     @param {String}       [options.classNameOff='hide-all'] className when toggle is Off.
     *     @param {String}       [options.triggerEvent='click']    Event that will trigger the toggling.
     *     @param {Boolean}      [options.closeOnClick=true]       When this is on, if the user clicks outside of the toggled content, the target is toggled off.
     *     @param {Selector}     [options.closeOnInsideClick='a[href]'] Toggle off when an element matching this selector is clicked. Set to null to deactivate the check. Default: 'a[href]' (finds links)
     *     @param {Boolean}      [options.initialState=null]       Whether to start toggled off, on, or as found in the markup. (false: off, true: on, null: markup)
     *     @param {Function}     [options.onChangeState=null]      Callback to be called when the toggle state changes. Return `false` to cancel the event.
     *
     * @example
     *      <div class="ink-dropdown">
     *          <button class="ink-button toggle" data-target="#dropdown">Dropdown <span class="icon-caret-down"></span></button>
     *          <ul id="dropdown" class="dropdown-menu">
     *              <li class="heading">Heading</li>
     *              <li class="separator-above"><a href="#">Option</a></li>
     *              <li><a href="#">Option</a></li>
     *              <li class="separator-above disabled"><a href="#">Disabled option</a></li>
     *              <li class="submenu">
     *                  <a href="#" class="toggle" data-target="#submenu1">A longer option name</a>
     *                  <ul id="submenu1" class="dropdown-menu">
     *                      <li class="submenu">
     *                          <a href="#" class="toggle" data-target="#ultrasubmenu">Sub option</a>
     *                          <ul id="ultrasubmenu" class="dropdown-menu">
     *                              <li><a href="#">Sub option</a></li>
     *                              <li><a href="#" data-target="ultrasubmenu">Sub option</a></li>
     *                              <li><a href="#">Sub option</a></li>
     *                          </ul>
     *                      </li>
     *                      <li><a href="#">Sub option</a></li>
     *                      <li><a href="#">Sub option</a></li>
     *                  </ul>
     *              </li>
     *              <li><a href="#">Option</a></li>
     *          </ul>
     *      </div>
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.Toggle_1'], function( Selector, Toggle ){
     *              var toggleElement = Ink.s('.toggle');
     *              var toggleObj = new Toggle( toggleElement );
     *          });
     *      </script>
     */
    var Toggle = function( selector, options ){
        this._rootElement = Common.elOrSelector(selector, '[Ink.UI.Toggle root element]:');

        this._options = Ink.extendObj({
            target : undefined,
            triggerEvent: 'click',
            closeOnClick: true,
            isAccordion: false,
            initialState: null,
            classNameOn: 'show-all',
            classNameOff: 'hide-all',
            togglesDisplay: null,
            closeOnInsideClick: 'a[href]',  // closes the toggle when a target is clicked and it is a link
            onChangeState: null
        }, options || {}, InkElement.data(this._rootElement));

        this._targets = Common.elsOrSelector(this._options.target, 'Ink.UI.Toggle target option');

        // Boolean option handling
        this._options.closeOnClick = this._options.closeOnClick.toString() === 'true';
        // Actually a throolean
        if (this._options.initialState !== null){
            this._options.initialState = this._options.initialState.toString() === 'true';
        } else {
            this._options.initialState = Css.getStyle(this._targets[0], 'display') !== 'none';
        }

        if (this._options.classNameOn !== 'show-all' || this._options.classNameOff !== 'hide-all') {
            for (var i = 0, len = this._targets.length; i < len; i++) {
                Css.removeClassName(this._targets[i], 'show-all');
                Css.removeClassName(this._targets[i], 'hide-all');
            }
        }

        this._init();
    };

    Toggle.prototype = {

        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function(){
            this._accordion = ( Css.hasClassName(this._rootElement.parentNode,'accordion') || Css.hasClassName(this._targets[0].parentNode,'accordion') );

            this._firstTime = true;

            this._bindEvents();

            if (this._options.initialState !== null) {
                this.setState(this._options.initialState, true);
            } else {
                // Add initial classes matching the current "display" of the object.
                var state = Css.getStyle(this._targets[0], 'display') !== 'none';
                this.setState(state, true);
            }
            // Aditionally, remove any inline "display" style.
            for (var i = 0, len = this._targets.length; i < len; i++) {
                if (this._targets[i].style.display) {
                    this._targets[i].style.display = '';  // becomes default
                }
            }
        },

        /**
         * @method _bindEvents
         * @private
         */
        _bindEvents: function () {
            if ( this._options.triggerEvent ) {
                InkEvent.observe(
                    this._rootElement,
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

            if (isAncestorOfClickedElement) {
                return;
            }

            if (this._accordion) {
                this._updateAccordion();
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
            var elms, accordionElement;
            if( Css.hasClassName(this._targets[0].parentNode,'accordion') ){
                accordionElement = this._targets[0].parentNode;
            } else {
                accordionElement = this._targets[0].parentNode.parentNode;
            }
            elms = Selector.select('.toggle, .ink-toggle',accordionElement);
            for(var i=0; i<elms.length; i+=1 ){
                var dataset = InkElement.data( elms[i] ),
                    targetElm = Selector.select( dataset.target,accordionElement );

                if( (targetElm.length > 0) && (targetElm[0] !== this._targets[0]) ){
                    targetElm[0].style.display = 'none';
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
            var tgtEl = InkEvent.element(event),
                shades;

            var ancestorOfTargets = InkArray.some(this._targets, function (target) {
                return InkElement.isAncestorOf(target, tgtEl) || target === tgtEl;
            });

            if( (this._rootElement === tgtEl) || InkElement.isAncestorOf(this._rootElement, tgtEl) || ancestorOfTargets /*|| this._firstTime (I forgot what this last check was for) */) {
                return;
            } else if( (shades = Ink.ss('.ink-shade')).length ) {
                var shadesLength = shades.length;

                for( var i = 0; i < shadesLength; i++ ){
                    if( InkElement.isAncestorOf(shades[i],tgtEl) && InkElement.isAncestorOf(shades[i],this._rootElement) ){
                        return;
                    }
                }
            }

            this.setState(false, true);  // dismiss
        },

        /**
         * Sets the state of the toggle. (on/off)
         *
         * @param on {Boolean} New state (on/off)
         * 
         * @method setState
         */
        setState: function (on, callHandler) {
            if (on === this.getState()) { return; }
            if (callHandler && typeof this._options.onChangeState === 'function') {
                var ret = this._options.onChangeState(on);
                if (ret === false) { return false; } //  Canceled by the event handler
            }
            for (var i = 0, len = this._targets.length; i < len; i++) {
                Css.addRemoveClassName(this._targets[i], this._options.classNameOn, on);
                Css.addRemoveClassName(this._targets[i], this._options.classNameOff, !on);
            }
            Css.addRemoveClassName(this._rootElement, 'active', on);
        },

        /**
         * Gets the state of the toggle. (on/off)
         *
         * @method getState
         *
         * @return {Boolean} whether the toggle is toggled on.
         */
        getState: function () {
            return Css.hasClassName(this._rootElement, 'active');
        }
    };

    return Toggle;
});

