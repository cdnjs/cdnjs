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
