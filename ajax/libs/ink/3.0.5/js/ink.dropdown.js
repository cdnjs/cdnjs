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
        'target':           ['Element'],
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
         * @param {DOMElement|String}   trigger         Trigger Element
         * @param {Object}              options         Options Object
         * @param {DOMElement|String}   options.target Target of the dropdown action.
         *
         * @sample Ink_UI_Dropdown_1.html
         */
        _init: function() {
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
         * @param [callHandler=false] call onDismiss handler
         */
        dismiss: function (callHandler, doNotInformToggle) {
            this._openOrDismiss(false, callHandler, doNotInformToggle);
        },

        /**
         * Opens the dropdown
         *
         * @method open
         * @param [callHandler=false] call onOpen handler
         */
        open: function (callHandler, _doNotInformToggle) {
            this._openOrDismiss(true, callHandler, _doNotInformToggle);
        },

        /**
         * DRY'ing up open() and dismiss()
         *
         * @method _openOrDismiss
         * @param [newState=false]
         * @param [callHandler=false]
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
         * @param handler {String} The handler name in this._options
         * @param [args*] Arguments to pass to function
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
