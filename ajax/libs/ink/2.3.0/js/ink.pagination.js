/**
 * @module Ink.UI.Pagination_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Pagination', '1',
    ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1'],
    function(Common, Event, Css, Element, Selector ) {
    'use strict';

    /**
     * Function to create the pagination anchors
     *
     * @method genAel
     * @param  {String} inner HTML to be placed inside the anchor.
     * @return {DOMElement}  Anchor created
     */
    var genAEl = function(inner, index) {
        var aEl = document.createElement('a');
        aEl.setAttribute('href', '#');
        if (index !== undefined) {
            aEl.setAttribute('data-index', index);
        }
        aEl.innerHTML = inner;
        return aEl;
    };

    /**
     * @class Ink.UI.Pagination
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {Object} options Options
     * @param {Number}   [options.size]              number of pages.
     * @param {Number}   [options.totalItemCount]    Total numeber of items to display
     * @param {Number}   [options.itemsPerPage]      number of items per page.
     * @param {Number}   [options.maxSize]           If passed, only shows at most maxSize items. displays also first|prev page and next page|last buttons
     * @param {Number}   [options.start]             start page. defaults to 1
     * @param {String}   [options.firstLabel]        label to display on first page button
     * @param {String}   [options.lastLabel]         label to display on last page button
     * @param {String}   [options.previousLabel]     label to display on previous button
     * @param {String}   [options.nextLabel]         label to display on next button
     * @param {String}   [options.previousPageLabel] label to display on previous page button
     * @param {String}   [options.nextPageLabel]     label to display on next page button
     * @param {Function} [options.onChange]          optional callback. Called with `(thisPaginator, newPageNumber)`.
     * @param {String}   [options.hashParameter]     parameter to use on setHash. by default uses 'page'
     * @param {String}   [options.parentTag]         HTML Tag used as the parent node.
     * @param {String}   [options.childTag]          HTML Tag used as the child nodes.
     * @param {String}   [options.wrapperClass]      CSS Class used in the wrapper element
     * @param {String}   [options.paginationClass]   CSS Class used in the pagination element
     * @param {String}   [options.activeClass]       CSS Class used to mark page as active
     * @param {String}   [options.disabledClass]     CSS Class used to mark page as disabled
     * @param {String}   [options.hideClass]         CSS Class used to hide elements
     * @param {String}   [options.previousClass]     CSS Class used in the previous element
     * @param {String}   [options.previousPageClass] CSS Class used in the previous page element
     * @param {String}   [options.nextClass]         CSS Class used in the next element
     * @param {String}   [options.nextPageClass]     CSS Class used in the next page element
     * @param {Function} [options.numberFormatter]   optional function which takes and 0-indexed number and returns the string which appears on a numbered button
     */
    var Pagination = function(selector, options) {

        this._element = Common.elOrSelector(selector, 'Ink.UI.Pagination element');

        this._options = Common.options('Ink.UI.Pagination_1', {
            size:              ['Integer', null],
            totalItemCount:    ['Integer', null],
            itemsPerPage:      ['Integer', null],
            maxSize:           ['Integer', null],
            start:             ['Integer', 1],
            firstLabel:        ['String', 'First'],
            lastLabel:         ['String', 'Last'],
            previousLabel:     ['String', 'Previous'],
            nextLabel:         ['String', 'Next'],
            previousPageLabel: ['String', null],
            nextPageLabel:     ['String', null],
            onChange:          ['Function', undefined],
            hashParameter:     ['String', 'page'],
            parentTag:         ['String', 'ul'],
            childTag:          ['String', 'li'],
            wrapperClass:      ['String', 'ink-navigation'],
            paginationClass:   ['String', 'pagination'],
            activeClass:       ['String', 'active'],
            disabledClass:     ['String', 'disabled'],
            hideClass:         ['String', 'hide-all'],
            previousClass:     ['String', 'previous'],
            previousPageClass: ['String', 'previousPage'],
            nextClass:         ['String', 'next'],
            nextPageClass:     ['String', 'nextPage'],

            numberFormatter: ['Function', function(i) { return i + 1; }]
        }, options || {}, this._element);

        if (!this._options.previousPageLabel) {
            this._options.previousPageLabel = this._options.previousLabel + ' ' + this._options.maxSize;
        }

        if (!this._options.nextPageLabel) {
            this._options.nextPageLabel = this._options.nextLabel + ' ' + this._options.maxSize;
        }

        this._handlers = {
            click: Ink.bindEvent(this._onClick,this)
        };

        if (Common.isInteger(this._options.totalItemCount) && Common.isInteger(this._options.itemsPerPage)) {
            this._size = Math.ceil(this._options.totalItemCount / this._options.itemsPerPage);
        } else if (Common.isInteger(this._options.size)) {
            this._size = this._options.size;
        } else {
            throw new TypeError('Ink.UI.Pagination: Please supply a size option or totalItemCount and itemsPerPage options.');
        }

        if (!Common.isInteger(this._options.start) && this._options.start > 0 && this._options.start <= this._size) {
            throw new TypeError('start option is a required integer between 1 and size!');
        }

        if (this._options.maxSize && !Common.isInteger(this._options.maxSize) && this._options.maxSize > 0) {
            throw new TypeError('maxSize option is a positive integer!');
        }

        else if (this._size < 0) {
            throw new RangeError('size option must be equal or more than 0!');
        }

        this.setOnChange(this._options.onChange);

        this._current = this._options.start - 1;
        this._itemLiEls = [];

        this._init();
    };

    Pagination.prototype = {

        /**
         * Init function called by the constructor
         *
         * @method _init
         * @private
         */
        _init: function() {
            // generate and apply DOM
            this._generateMarkup(this._element);

            this._updateItems();

            // subscribe events
            this._observe();

            Common.registerInstance(this, this._element, 'pagination');
        },

        /**
         * Responsible for setting listener in the 'click' event of the Pagination element.
         *
         * @method _observe
         * @private
         */
        _observe: function() {
            Event.observeDelegated(this._element, 'click', '.' + this._options.paginationClass + ' > ' + this._options.childTag, this._handlers.click);
        },

        /**
         * Updates the markup everytime there's a change in the Pagination object.
         *
         * @method _updateItems
         * @private
         */
        _updateItems: function() {
            var liEls = this._itemLiEls;

            var isSimpleToggle = this._size === liEls.length;

            var i, f, liEl;

            if (isSimpleToggle) {
                // just toggle active class
                for (i = 0, f = this._size; i < f; ++i) {
                    Css.setClassName(liEls[i], this._options.activeClass, i === this._current);
                }
            }
            else {
                // remove old items
                for (i = liEls.length - 1; i >= 0; --i) {
                    this._ulEl.removeChild(liEls[i]);
                }

                // add new items
                liEls = [];
                for (i = 0, f = this._size; i < f; ++i) {
                    liEl = document.createElement(this._options.childTag);
                    liEl.appendChild( genAEl( this._options.numberFormatter(i), i) );
                    Css.setClassName(liEl, this._options.activeClass, i === this._current);
                    this._ulEl.insertBefore(liEl, this._nextEl);
                    liEls.push(liEl);
                }
                this._itemLiEls = liEls;
            }

            if (this._options.maxSize) {
                // toggle visible items
                var page = Math.floor( this._current / this._options.maxSize );
                var pi = this._options.maxSize * page;
                var pf = pi + this._options.maxSize - 1;

                for (i = 0, f = this._size; i < f; ++i) {
                    liEl = liEls[i];
                    Css.setClassName(liEl, this._options.hideClass, i < pi || i > pf);
                }

                this._pageStart = pi;
                this._pageEnd = pf;
                this._page = page;

                Css.setClassName(this._prevPageEl, this._options.disabledClass, !this.hasPreviousPage());
                Css.setClassName(this._nextPageEl, this._options.disabledClass, !this.hasNextPage());

                Css.setClassName(this._firstEl, this._options.disabledClass, this.isFirst());
                Css.setClassName(this._lastEl, this._options.disabledClass, this.isLast());
            }

            // update prev and next
            Css.setClassName(this._prevEl, this._options.disabledClass, !this.hasPrevious());
            Css.setClassName(this._nextEl, this._options.disabledClass, !this.hasNext());
        },

        /**
         * Returns the top element for the gallery DOM representation
         *
         * @method _generateMarkup
         * @param {DOMElement} el
         * @private
         */
        _generateMarkup: function(el) {
            Css.addClassName(el, 'ink-navigation');

            var ulEl,liEl,
                hasUlAlready = false;
            if( ( ulEl = Selector.select('.' + this._options.paginationClass,el)).length < 1 ){
                ulEl = document.createElement(this._options.parentTag);
                Css.addClassName(ulEl, this._options.paginationClass);
            } else {
                hasUlAlready = true;
                ulEl = ulEl[0];
            }

            if (this._options.maxSize) {
                liEl = document.createElement(this._options.childTag);
                liEl.appendChild( genAEl(this._options.firstLabel) );
                this._firstEl = liEl;
                Css.addClassName(liEl, this._options.firstClass);
                ulEl.appendChild(liEl);

                liEl = document.createElement(this._options.childTag);
                liEl.appendChild( genAEl(this._options.previousPageLabel) );
                this._prevPageEl = liEl;
                Css.addClassName(liEl, this._options.previousPageClass);
                ulEl.appendChild(liEl);
            }

            liEl = document.createElement(this._options.childTag);
            liEl.appendChild( genAEl(this._options.previousLabel) );
            this._prevEl = liEl;
            Css.addClassName(liEl, this._options.previousClass);
            ulEl.appendChild(liEl);

            liEl = document.createElement(this._options.childTag);
            liEl.appendChild( genAEl(this._options.nextLabel) );
            this._nextEl = liEl;
            Css.addClassName(liEl, this._options.nextClass);
            ulEl.appendChild(liEl);

            if (this._options.maxSize) {
                liEl = document.createElement(this._options.childTag);
                liEl.appendChild( genAEl(this._options.nextPageLabel) );
                this._nextPageEl = liEl;
                Css.addClassName(liEl, this._options.nextPageClass);
                ulEl.appendChild(liEl);

                liEl = document.createElement(this._options.childTag);
                liEl.appendChild( genAEl(this._options.lastLabel) );
                this._lastEl = liEl;
                Css.addClassName(liEl, this._options.lastClass);
                ulEl.appendChild(liEl);
            }

            if( !hasUlAlready ){
                el.appendChild(ulEl);
            }

            this._ulEl = ulEl;
        },

        /**
         * Click handler
         *
         * @method _onClick
         * @param {Event} ev
         * @private
         */
        _onClick: function(ev) {
            Event.stop(ev);

            var liEl = Event.element(ev);
            if ( Css.hasClassName(liEl, this._options.activeClass) ||
                 Css.hasClassName(liEl, this._options.disabledClass) ) { return; }

            var isPrev = Css.hasClassName(liEl, this._options.previousClass);
            var isNext = Css.hasClassName(liEl, this._options.nextClass);
            var isPrevPage = Css.hasClassName(liEl, this._options.previousPageClass);
            var isNextPage = Css.hasClassName(liEl, this._options.nextPageClass);
            var isFirst = Css.hasClassName(liEl, this._options.firstClass);
            var isLast = Css.hasClassName(liEl, this._options.lastClass);

            if (isFirst) {
                this.setCurrent(0);
            }
            else if (isLast) {
                this.setCurrent(this._size - 1);
            }
            else if (isPrevPage || isNextPage) {
                this.setCurrent( (isPrevPage ? -1 : 1) * this._options.maxSize, true);
            }
            else if (isPrev || isNext) {
                this.setCurrent(isPrev ? -1 : 1, true);
            }
            else {
                var aElem = Ink.s('[data-index]', liEl);
                var nr = parseInt( aElem.getAttribute('data-index'), 10);
                this.setCurrent(nr);
            }
        },


        /**
         * Allows you to subscribe to the onChange event
         *
         * @method setOnChange
         * @param cb {Function} Callback called with `(thisPaginator, newPageNumber)`.
         */
        setOnChange: function (onChange) {
            if (onChange !== undefined && typeof onChange !== 'function') {
                throw new TypeError('onChange option must be a function!');
            }
            this._onChange = onChange;
        },

        /**************
         * PUBLIC API *
         **************/

        /**
         * Sets the number of pages
         *
         * @method setSize
         * @param {Number} sz number of pages
         * @public
         */
        setSize: function(sz) {
            if (!Common.isInteger(sz)) {
                throw new TypeError('1st argument must be an integer number!');
            }

            this._size = sz;
            this._updateItems();
            this._current = 0;
        },

        /**
         * Calculate the number of pages, then call setSize().
         *
         * @param setSizeInItems
         * @param {Number} totalItems
         * @param {Number} itemsPerPage
         */
        setSizeInItems: function (totalItems, itemsPerPage) {
            var pageNumber = Math.ceil(totalItems / itemsPerPage);
            this.setSize(pageNumber);
        },

        /**
         * Sets the current page
         *
         * @method setCurrent
         * @param {Number} nr sets the current page to given number
         * @param {Boolean} isRelative trueish to set relative change instead of absolute (default)
         * @public
         */
        setCurrent: function(nr, isRelative) {
            if (!Common.isInteger(nr)) {
                throw new TypeError('1st argument must be an integer number!');
            }

            if (isRelative) {
                nr += this._current;
            }

            if (nr > this._size - 1) {
                nr = this._size - 1;
            }

            if (nr < 0) {
                nr = 0;
            }

            this._current = nr;
            this._updateItems();

            if (this._onChange) {
                this._onChange(this, nr);
            }

            /*if (this._options.setHash) {
                var o = {};
                o[this._options.hashParameter] = nr;
                Common.setHash(o);
            }*/  // undocumented option, removing
        },

        /**
         * Returns the number of pages
         *
         * @method getSize
         * @return {Number} Number of pages
         * @public
         */
        getSize: function() {
            return this._size;
        },

        /**
         * Returns current page
         *
         * @method getCurrent
         * @return {Number} Current page
         * @public
         */
        getCurrent: function() {
            return this._current;
        },

        /**
         * Returns true iif at first page
         *
         * @method isFirst
         * @return {Boolean} True if at first page
         * @public
         */
        isFirst: function() {
            return this._current === 0;
        },

        /**
         * Returns true iif at last page
         *
         * @method isLast
         * @return {Boolean} True if at last page
         * @public
         */
        isLast: function() {
            return this._current === this._size - 1;
        },

        /**
         * Returns true iif has prior pages
         *
         * @method hasPrevious
         * @return {Boolean} True if has prior pages
         * @public
         */
        hasPrevious: function() {
            return this._current > 0;
        },

        /**
         * Returns true iif has pages ahead
         *
         * @method hasNext
         * @return {Boolean} True if has pages ahead
         * @public
         */
        hasNext: function() {
            return this._current < this._size - 1;
        },

        /**
         * Returns true iif has prior set of page(s)
         *
         * @method hasPreviousPage
         * @return {Boolean} Returns true iif has prior set of page(s)
         * @public
         */
        hasPreviousPage: function() {
            return this._options.maxSize && this._current > this._options.maxSize - 1;
        },

        /**
         * Returns true iif has set of page(s) ahead
         *
         * @method hasNextPage
         * @return {Boolean} Returns true iif has set of page(s) ahead
         * @public
         */
        hasNextPage: function() {
            return this._options.maxSize && this._size - this._current >= this._options.maxSize + 1;
        },

        /**
         * Unregisters the component and removes its markup from the DOM
         *
         * @method destroy
         * @public
         */
        destroy: Common.destroyComponent
    };

    return Pagination;

});
