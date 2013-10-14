/**
 * @module Ink.UI.SortableList_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.SortableList', '1', ['Ink.UI.Aux_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1'], function(Aux, Event, Css, Element, Selector, InkArray ) {
    'use strict';

    /**
     * Adds sortable behaviour to any list!
     * 
     * @class Ink.UI.SortableList
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     *     @param {String} [options.dragObject] CSS Selector. The element that will trigger the dragging in the list. Default is 'li'.
     * @example
     *      <ul class="unstyled ink-sortable-list" id="slist" data-instance="sortableList9">
     *          <li><span class="ink-label info"><i class="icon-reorder"></i>drag here</span>primeiro</li>
     *          <li><span class="ink-label info"><i class="icon-reorder"></i>drag here</span>segundo</li>
     *          <li><span class="ink-label info"><i class="icon-reorder"></i>drag here</span>terceiro</li>
     *      </ul>
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.SortableList_1'], function( Selector, SortableList ){
     *              var sortableListElement = Ink.s('.ink-sortable-list');
     *              var sortableListObj = new SortableList( sortableListElement );
     *          });
     *      </script>
     */
    var SortableList = function(selector, options) {

        this._element = Aux.elOrSelector(selector, '1st argument');

        if( !Aux.isDOMElement(selector) && (typeof selector !== 'string') ){
            throw '[Ink.UI.SortableList] :: Invalid selector';
        } else if( typeof selector === 'string' ){
            this._element = Ink.Dom.Selector.select( selector );

            if( this._element.length < 1 ){
                throw '[Ink.UI.SortableList] :: Selector has returned no elements';
            }
            this._element = this._element[0];

        } else {
            this._element = selector;
        }

        this._options = Ink.extendObj({
            dragObject: 'li'
        }, Ink.Dom.Element.data(this._element));

        this._options = Ink.extendObj( this._options, options || {});

        this._handlers = {
            down: Ink.bindEvent(this._onDown,this),
            move: Ink.bindEvent(this._onMove,this),
            up:   Ink.bindEvent(this._onUp,this)
        };

        this._model = [];
        this._index = undefined;
        this._isMoving = false;

        if (this._options.model instanceof Array) {
            this._model = this._options.model;
            this._createdFrom = 'JSON';
        }
        else if (this._element.nodeName.toLowerCase() === 'ul') {
            this._createdFrom = 'DOM';
        }
        else {
            throw new TypeError('You must pass a selector expression/DOM element as 1st option or provide a model on 2nd argument!');
        }


        this._dragTriggers = Selector.select( this._options.dragObject, this._element );
        if( !this._dragTriggers ){
            throw "[Ink.UI.SortableList] :: Drag object not found";
        }

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
            // extract model
            if (this._createdFrom === 'DOM') {
                this._extractModelFromDOM();
                this._createdFrom = 'JSON';
            }

            var isTouch = 'ontouchstart' in document.documentElement;

            this._down = isTouch ? 'touchstart': 'mousedown';
            this._move = isTouch ? 'touchmove' : 'mousemove';
            this._up   = isTouch ? 'touchend'  : 'mouseup';

            // subscribe events
            var db = document.body;
            Event.observe(db, this._move, this._handlers.move);
            Event.observe(db, this._up,   this._handlers.up);
            this._observe();

            Aux.registerInstance(this, this._element, 'sortableList');
        },

        /**
         * Sets the event handlers.
         * 
         * @method _observe
         * @private
         */
        _observe: function() {
            Event.observe(this._element, this._down, this._handlers.down);
        },

        /**
         * Updates the model from the UL representation
         * 
         * @method _extractModelFromDOM
         * @private
         */
        _extractModelFromDOM: function() {
            this._model = [];
            var that = this;

            var liEls = Selector.select('> li', this._element);

            InkArray.each(liEls,function(liEl) {
                //var t = Element.getChildrenText(liEl);
                var t = liEl.innerHTML;
                that._model.push(t);
            });
        },

        /**
         * Returns the top element for the gallery DOM representation
         * 
         * @method _generateMarkup
         * @return {DOMElement}
         * @private
         */
        _generateMarkup: function() {
            var el = document.createElement('ul');
            el.className = 'unstyled ink-sortable-list';
            var that = this;

            InkArray.each(this._model,function(label, idx) {
                var liEl = document.createElement('li');
                if (idx === that._index) {
                    liEl.className = 'drag';
                }
                liEl.innerHTML = [
                    // '<span class="ink-label ink-info"><i class="icon-reorder"></i>', that._options.dragLabel, '</span>', label
                    label
                ].join('');
                el.appendChild(liEl);
            });

            return el;
        },

        /**
         * Extracts the Y coordinate of the mouse from the given MouseEvent
         * 
         * @method _getY
         * @param  {Event} ev
         * @return {Number}
         * @private
         */
        _getY: function(ev) {
            if (ev.type.indexOf('touch') === 0) {
                //console.log(ev.type, ev.changedTouches[0].pageY);
                return ev.changedTouches[0].pageY;
            }
            if (typeof ev.pageY === 'number') {
                return ev.pageY;
            }
            return ev.clientY;
        },

        /**
         * Refreshes the markup.
         * 
         * @method _refresh
         * @param {Boolean} skipObs True if needs to set the event handlers, false if not.
         * @private
         */
        _refresh: function(skipObs) {
            var el = this._generateMarkup();
            this._element.parentNode.replaceChild(el, this._element);
            this._element = el;

            Aux.restoreIdAndClasses(this._element, this);

            this._dragTriggers = Selector.select( this._options.dragObject, this._element );

            // subscribe events
            if (!skipObs) { this._observe(); }
        },

        /**
         * Mouse down handler
         * 
         * @method _onDown
         * @param {Event} ev
         * @return {Boolean|undefined} [description]
         * @private
         */
        _onDown: function(ev) {
            if (this._isMoving) { return; }
            var tgtEl = Event.element(ev);

            if( !InkArray.inArray(tgtEl,this._dragTriggers) ){
                while( !InkArray.inArray(tgtEl,this._dragTriggers) && (tgtEl.nodeName.toLowerCase() !== 'body') ){
                    tgtEl = tgtEl.parentNode;
                }

                if( tgtEl.nodeName.toLowerCase() === 'body' ){
                    return;
                }
            }

            Event.stop(ev);

            var liEl;
            if( tgtEl.nodeName.toLowerCase() !== 'li' ){
                while( (tgtEl.nodeName.toLowerCase() !== 'li') && (tgtEl.nodeName.toLowerCase() !== 'body') ){
                    tgtEl = tgtEl.parentNode;
                }
            }
            liEl = tgtEl;

            this._index = Aux.childIndex(liEl);
            this._height = liEl.offsetHeight;
            this._startY = this._getY(ev);
            this._isMoving = true;

            document.body.style.cursor = 'move';

            this._refresh(false);

            return false;
        },

        /**
         * Mouse move handler
         * 
         * @method _onMove
         * @param {Event} ev
         * @private
         */
        _onMove: function(ev) {
            if (!this._isMoving) { return; }
            Event.stop(ev);

            var y = this._getY(ev);
            //console.log(y);
            var dy = y - this._startY;
            var sign = dy > 0 ? 1 : -1;
            var di = sign * Math.floor( Math.abs(dy) / this._height );
            if (di === 0) { return; }
            di = di / Math.abs(di);
            if ( (di === -1 && this._index === 0) ||
                 (di === 1 && this._index === this._model.length - 1) ) { return; }

            var a = di > 0 ? this._index : this._index + di;
            var b = di < 0 ? this._index : this._index + di;
            //console.log(a, b);
            this._model.splice(a, 2, this._model[b], this._model[a]);
            this._index += di;
            this._startY = y;

            this._refresh(false);
        },

        /**
         * Mouse up handler
         * 
         * @method _onUp
         * @param {Event} ev
         * @private
         */
        _onUp: function(ev) {
            if (!this._isMoving) { return; }
            Event.stop(ev);

            this._index = undefined;
            this._isMoving = false;
            document.body.style.cursor = '';

            this._refresh();
        },



        /**************
         * PUBLIC API *
         **************/

        /**
         * Returns a copy of the model
         * 
         * @method getModel
         * @return {Array} Copy of the model
         * @public
         */
        getModel: function() {
            return this._model.slice();
        },

        /**
         * Unregisters the component and removes its markup from the DOM
         * 
         * @method destroy
         * @public
         */
        destroy: Aux.destroyComponent

    };

    return SortableList;

});
