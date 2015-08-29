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
