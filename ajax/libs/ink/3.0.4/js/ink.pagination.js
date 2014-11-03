/**
 * Pagination elements
 * @module Ink.UI.Pagination_1
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
     * @private
     * @param  {String} inner HTML to be placed inside the anchor.
     * @return {DOMElement}  Anchor created
     */
    var genAEl = function(inner, index, options) {
        var aEl = document.createElement('a');
        aEl.setAttribute('href', '#');
        if (typeof index === 'number') {
            aEl.setAttribute('data-index', index);
        }
        if(options && options.wrapText) {
            var spanEl = document.createElement('span');
            aEl.appendChild(spanEl);
            spanEl.innerHTML = inner;
        } else {
            aEl.innerHTML = inner;
        }
        return aEl;
    };

    /**
     * @class Ink.UI.Pagination
     * @constructor
     * @version 1
     * @param {String|DOMElement}   selector                    Selector or element
     * @param {Object}              options                     Options
     * @param {Number}              [options.size]              Number of pages.
     * @param {Number}              [options.totalItemCount]    Total numeber of items to display
     * @param {Number}              [options.itemsPerPage]      Number of items per page.
     * @param {Number}              [options.maxSize]           If passed, only shows at most maxSize items. displays also first|prev page and next page|last buttons
     * @param {Number}              [options.start]             Start page. defaults to 1
     * @param {Boolean}             [options.sideButtons=true]  Whether to show the first, last, previous, next, previousPage and lastPage buttons. Do not use together with maxSize.
     * @param {String}              [options.firstLabel]        Text for the first page button. Defaults to 'First'.
     * @param {String}              [options.lastLabel]         Text for the last page button. Defaults to 'Last'.
     * @param {String}              [options.previousLabel]     Text for the previous button. Defaults to 'Previous'-
     * @param {String}              [options.nextLabel]         Text for the next button. Defaults to 'Next'
     * @param {String}              [options.previousPageLabel] Text for the previous page button. Defaults to 'Previous {Items per page}'.
     * @param {String}              [options.nextPageLabel]     Text for the next page button. Defaults to 'Next {Items per page}'.
     * @param {Function}            [options.onChange]          Callback to be called when a page changes. Called with `(thisPaginator, newPageNumber)`.
     * @param {String}              [options.hashParameter]     Parameter to use on setHash. Defaults to 'page'.
     * @param {String}              [options.parentTag]         HTML Tag used as the parent node.
     * @param {String}              [options.childTag]          HTML Tag used as the child nodes.
     * @param {String}              [options.wrapperClass]      CSS Class used in the wrapper element
     * @param {String}              [options.paginationClass]   CSS Class used in the pagination element
     * @param {String}              [options.activeClass]       CSS Class used to mark page as active
     * @param {String}              [options.disabledClass]     CSS Class used to mark page as disabled
     * @param {String}              [options.hideClass]         CSS Class used to hide elements
     * @param {String}              [options.previousClass]     CSS Class used in the previous element
     * @param {String}              [options.previousPageClass] CSS Class used in the previous page element
     * @param {String}              [options.nextClass]         CSS Class used in the next element
     * @param {String}              [options.nextPageClass]     CSS Class used in the next page element
     * @param {Function}            [options.numberFormatter]   Number formatter function. Receives a 0-indexed number and returns the text for the numbered page button.
     *
     * @sample Ink_UI_Pagination_1.html
     */
    function Pagination() {
        Common.BaseUIComponent.apply(this, arguments);
    }

    Pagination._name = 'Pagination_1';

    Pagination._optionDefinition = {
        size:              ['Integer', null],
        totalItemCount:    ['Integer', null],
        itemsPerPage:      ['Integer', null],
        maxSize:           ['Integer', null],
        start:             ['Integer', 1],
        sideButtons:       ['Boolean', 1 /* actually `true` but we want to see if user is using the default or not. */],
        // TODO add pagination-type which accepts color strings, "chevron" and "dotted". Basically classes to add to the UL.
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
    };

    Pagination.prototype = {
        /**
         * Init function called by the constructor
         *
         * @method _init
         * @private
         */
        _init: function() {
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
                this._size = this._calculateSize(this._options.totalItemCount, this._options.itemsPerPage);
            } else if (Common.isInteger(this._options.size)) {
                this._size = this._options.size;
            } else {
                Ink.error('Ink.UI.Pagination: Please supply a size option or totalItemCount and itemsPerPage options.');
                this._size = 0;
            }

            this.setOnChange(this._options.onChange);

            this._current = this._options.start - 1;
            this._itemLiEls = [];

            // generate and apply DOM
            this._generateMarkup(this._element);

            this._updateItems();

            // subscribe events
            this._observe();
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
         * Calculate how many pages are necessary for `count` items, and `itemsPerPage` items per page.
         *
         * @method _calculateSize
         * @param count
         * @param itemsPerPage
         * @private
         **/
        _calculateSize: function (count, itemsPerPage) {
            return Math.ceil(count / itemsPerPage);
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
                    // add "active" class if this is the active element.
                    Css.setClassName(liEl, this._options.activeClass, i === this._current);
                    if (this._nextEl) {
                        this._ulEl.insertBefore(liEl, this._nextEl);
                    } else {
                        this._ulEl.appendChild(liEl);
                    }

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
            if (this._prevEl) {
                Css.setClassName(this._prevEl, this._options.disabledClass, !this.hasPrevious());
            }
            if (this._nextEl) {
                Css.setClassName(this._nextEl, this._options.disabledClass, !this.hasNext());
            }
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

            var ulEl = Ink.s('.' + this._options.paginationClass, el);
            var hasUlAlready = false;

            if( !ulEl ){
                ulEl = document.createElement(this._options.parentTag);
                Css.addClassName(ulEl, this._options.paginationClass);
            } else {
                hasUlAlready = true;
            }

            var isChevron = Css.hasClassName(ulEl, 'chevron');
            var isDotted = Css.hasClassName(ulEl, 'dotted');

            // Creates <li> elements for firstPage, nextPage, first, last, etc.
            var createLiEl = Ink.bind(function (name, options) {
                var liEl = document.createElement(this._options.childTag);
                var aEl = genAEl(this._options[name + 'Label'], undefined, { wrapText: options && options.wrapText });
                Css.addClassName(liEl, this._options[name + 'Class']);
                liEl.appendChild(aEl);
                ulEl.appendChild(liEl);
                return liEl;
            }, this);

            if (!isDotted && this._options.maxSize) {
                this._firstEl = createLiEl('first');
                this._prevPageEl = createLiEl('previousPage');
            }

            // When we're dotted, the default for sideButtons is `false`. When we're note, it's `true`.
            // Since the default is actually "1", we do a === true check when we're dotted, and a truthish check when we're not.
            if ((isDotted && this._options.sideButtons === true) || (!isDotted && this._options.sideButtons)) {
                this._prevEl = createLiEl('previous', { wrapText: isChevron });
                this._nextEl = createLiEl('next', { wrapText: isChevron });
            }

            if (!isDotted && this._options.maxSize) {
                this._nextPageEl = createLiEl('nextPage');
                this._lastEl = createLiEl('last');
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
                this.setCurrent( (isPrevPage ? -1 : 1) * this._options.maxSize, true /* relative */);
            }
            else if (isPrev || isNext) {
                this.setCurrent(isPrev ? -1 : 1, true /* relative */);
            }
            else {
                var aElem = Selector.select('[data-index]', liEl)[0];
                var nr = aElem && parseInt( aElem.getAttribute('data-index'), 10);
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
         * Sets the number of pages, then call setSize().
         *
         * @param setSizeInItems
         * @param {Number} totalItems       Total number of items
         * @param {Number} itemsPerPage     Items per page
         */
        setSizeInItems: function (totalItems, itemsPerPage) {
            var pageNumber = Math.ceil(totalItems / itemsPerPage);
            this.setSize(pageNumber);
        },

        /**
         * Sets the current page.
         *
         * @method setCurrent
         * @param {Number} nr           Sets the current page to given number.
         * @param {Boolean} isRelative  Flag to change the position from absolute to relative.
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
         * Gets the number of pages
         *
         * @method getSize
         * @return {Number} Number of pages
         * @public
         */
        getSize: function() {
            return this._size;
        },

        /**
         * Gets the current page index
         *
         * @method getCurrent
         * @return {Number} Current page
         * @public
         */
        getCurrent: function() {
            return this._current;
        },

        /**
         * Checks if it's at the first page
         *
         * @method isFirst
         * @return {Boolean} True if at first page
         * @public
         */
        isFirst: function() {
            return this._current === 0;
        },

        /**
         * Checks if it's on the last page
         *
         * @method isLast
         * @return {Boolean} True if at last page
         * @public
         */
        isLast: function() {
            return this._current === this._size - 1;
        },

        /**
         * Checks if it has previous pages
         *
         * @method hasPrevious
         * @return {Boolean} True if has prior pages
         * @public
         */
        hasPrevious: function() {
            return this._current > 0;
        },

        /**
         * Checks if it has next pages
         *
         * @method hasNext
         * @return {Boolean} True if has pages ahead
         * @public
         */
        hasNext: function() {
            return this._current < this._size - 1;
        },

        /**
         * Checks if it has a previous set of pages
         *
         * @method hasPreviousPage
         * @return {Boolean} Returns true iif has prior set of page(s)
         * @public
         */
        hasPreviousPage: function() {
            return this._options.maxSize && this._current > this._options.maxSize - 1;
        },

        /**
         * Checks if it has a next set of pages
         *
         * @method hasNextPage
         * @return {Boolean} Returns true iif has set of page(s) ahead
         * @public
         */
        hasNextPage: function() {
            return this._options.maxSize && this._size - this._current >= this._options.maxSize + 1;
        },

        /**
         * Unregisters the component and removes its markup
         *
         * @method destroy
         * @public
         */
        destroy: Common.destroyComponent
    };

    Common.createUIComponent(Pagination);

    return Pagination;

});