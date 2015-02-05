/**
 * @module Ink.UI.SortableList_1
 * Sortable lists
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
     * @param {String|DOMElement}   selector
     * @param {String}              [options.placeholderClass]          CSS class added to the "ghost" element being dragged around. Defaults to 'placeholder'.
     * @param {String}              [options.draggedClass]              CSS class added to the original element being dragged around. Defaults to 'hide-all'.
     * @param {String}              [options.draggingClass]             CSS class added to the html element when the user is dragging. Defaults to 'dragging'.
     * @param {String}              [options.dragSelector]              CSS selector for the drag enabled nodes. Defaults to 'li'.
     * @param {String}              [options.handleSelector]            CSS selector for the drag handle. If present, you can only drag nodes by this selector.
     * @param {String}              [options.moveSelector]              CSS selector to validate a node move. If present, you can only move nodes inside this selector.
     * @param {Boolean}             [options.swap]                      Flag to swap dragged element and target element instead of reordering it.
     * @param {Boolean}             [options.cancelMouseOut]            Flag to cancel draggin if mouse leaves the container element.
     *
     * @sample Ink_UI_SortableList_1.html
     */
    var SortableList = function(selector, options) {

        this._element = Common.elOrSelector(selector, 'Ink.UI.SortableList');

        this._options = Common.options('Sortable', {
            'placeholderClass': ['String', 'placeholder'],
            'draggedClass': ['String', 'hide-all'],
            'draggingClass': ['String', 'dragging'],
            'dragSelector': ['String', 'li'],
            'dragObject': ['String', null], // Deprecated. Use handleSelector instead.
            'handleSelector': ['String', null],
            'moveSelector': ['String', false],
            'swap': ['Boolean', false],
            'cancelMouseOut': ['Boolean', false]
        }, options || {}, this._element);

        if (this._options.dragObject != null) {
            // [3.0.0] Remove this deprecation notice and stop providing backwards compatibility
            Ink.warn('Ink.UI.SortableList: options.dragObject is now deprecated. ' +
                    'Please use options.handleSelector instead.');
            this._options.handleSelector =
                this._options.handleSelector || this._options.dragObject;
        }

        this._handlers = {
            down: Ink.bind(this._onDown, this),
            move: Ink.bind(this._onMove, this),
            up:   Ink.bind(this._onUp, this)
        };

        this._isMoving = false;

        this._init();
    };

    SortableList.prototype = {

        /**
         * Init function called by the constructor.
         * 
         * @method _init
         * @private
         */
        _init: function() {
            this._down = hasTouch ? 'touchstart mousedown' : 'mousedown';
            this._move = hasTouch ? 'touchmove mousemove' : 'mousemove';
            this._up   = hasTouch ? 'touchend mouseup' : 'mouseup';

            this._observe();
            Common.registerInstance(this, this._element, 'sortableList');
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
            if(this._options.handleSelector && !Selector.matchesSelector(ev.target, this._options.handleSelector)) { return; }
            var tgtEl = ev.currentTarget;
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
            this.validateMove(ev.currentTarget);
            return false;
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
            if (!this._isMoving || !this._placeholder) { return; }
            if (elem === this._placeholder) {  return; }
            if (elem === this._isMoving) { return; }
            if(!this._options.moveSelector || Selector.matchesSelector(elem, this._options.moveSelector)){
                this._movePlaceholder(elem);
            } else {
                this.stopMoving();  
            }
        }

    };

    return SortableList;
});