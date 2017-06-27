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
