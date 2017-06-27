/**
 * @module Ink.UI.Droppable_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule("Ink.UI.Droppable","1",["Ink.Dom.Element_1", "Ink.Dom.Event_1", "Ink.Dom.Css_1", "Ink.UI.Aux_1", "Ink.Util.Array_1", "Ink.Dom.Selector_1"], function( InkElement, InkEvent, Css, Aux, InkArray, Selector) {
    // Higher order functions
    var hAddClassName = function (element) {
        return function (className) {return Css.addClassName(element, className);};
    };
    var hRemoveClassName = function (element) {
        return function (className) {return Css.removeClassName(element, className);};
    };

    /**
     * @class Ink.UI.Droppable
     * @version 1
     * @static
     */
    var Droppable = {
        /**
         * Flag that determines if it's in debug mode or not
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
         * Makes an element droppable and adds it to the stack of droppable elements.
         * Can consider it a constructor of droppable elements, but where no Droppable object is returned.
         * 
         * In the following arguments, any events/callbacks you may pass, can be either functions or strings. If the 'move' or 'copy' strings are passed, the draggable gets moved into this droppable. If 'revert' is passed, an acceptable droppable is moved back to the element it came from.

         *
         * @method add
         * @param {String|DOMElement}       element     Target element
         * @param {Object}                  [options]   options object
         *     @param {String}      [options.hoverClass] Classname(s) applied when an acceptable draggable element is hovering the element
         *     @param {String}      [options.accept]    Selector for choosing draggables which can be dropped in this droppable.
         *     @param {Function}    [options.onHover]   callback called when an acceptable draggable element is hovering the droppable. Gets the draggable and the droppable element as parameters.
         *     @param {Function|String} [options.onDrop] callback called when an acceptable draggable element is dropped. Gets the draggable, the droppable and the event as parameters.
         *     @param {Function|String} [options.onDropOut] callback called when a droppable is dropped outside this droppable. Gets the draggable, the droppable and the event as parameters. (see above for string options).
         * @public
         *
         * @example
         *
         *       <style type="text/css">
         *           .hover {
         *               border: 1px solid red;
         *           }
         *           .left, .right {
         *               float: left; width: 50%;
         *               outline: 1px solid gray;
         *               min-height: 2em;
         *           }
         *       </style>
         *        <ul class="left">
         *            <li>Draggable 1</li>
         *            <li>Draggable 2</li>
         *            <li>Draggable 3</li>
         *        </ul>
         *        <ul class="right">
         *        </ul>
         *        <script type="text/javascript">
         *            Ink.requireModules(['Ink.UI.Draggable_1', 'Ink.UI.Droppable_1'], function (Draggable, Droppable) {
         *                new Draggable('.left li:eq(0)', {});
         *                new Draggable('.left li:eq(1)', {});
         *                new Draggable('.left li:eq(2)', {});
         *                Droppable.add('.left', {onDrop: 'move', onDropOut: 'revert'});
         *                Droppable.add('.right', {onDrop: 'move', onDropOut: 'revert'});
         *            })
         *        </script>
         *
         */
        add: function(element, options) {
            element = Aux.elOrSelector(element, 'Droppable.add target element');

            var opt = Ink.extendObj( {
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
                move: function (draggable, droppable, event) {
                    cleanStyle(draggable);
                    droppable.appendChild(draggable);
                },
                copy: function (draggable, droppable, event) {
                    cleanStyle(draggable);
                    droppable.appendChild(draggable.cloneNode);
                },
                revert: function (draggable, droppable, event) {
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
         * find droppable data about `element`. this data is added in `.add`
         *
         * @method _findData
         * @param {DOMElement} element  Needle
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
         * Find draggable data about `element`
         *
         * @method _findDraggable
         * @param {DOMElement} element  Needle
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
         * Invoke every time a drag starts
         * 
         * @method updateAll
         * @private
         */
        updateAll: function() {
            InkArray.each(this._droppables, Droppable._update);
        },

        /**
         * Updates location and size of droppable element
         * 
         * @method update * @param {String|DOMElement} element - target element
         * @private
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
         * @param {String|DOMElement} elOrSelector  Droppable element to disable.
         * @return {Boolean} Whether the object was found and deleted
         * @public
         */
        remove: function(el) {
            el = Aux.elOrSelector(el);
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
         * Method called by a draggable to execute an action on a droppable
         * 
         * @method action
         * @param {Object} coords    coordinates where the action happened
         * @param {String} type      type of action. drag or drop.
         * @param {Object} ev        Event object
         * @param {Object} draggable draggable element
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
