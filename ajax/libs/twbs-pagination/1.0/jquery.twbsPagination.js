/**
 * jQuery pagination plugin v1.0
 * http://esimakin.github.io/twbs-pagination/
 *
 * Copyright 2014, Eugene Simakin
 * Released under Apache 2.0 license
 * http://apache.org/licenses/LICENSE-2.0.html
 */
;
(function ($, window, document, undefined) {

    'use strict';

    var old = $.fn.twbsPagination;

    // PROTOTYPE AND CONSTRUCTOR

    var TwbsPagination = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.twbsPagination.defaults, options);
        this.init(this.options);
    };

    TwbsPagination.prototype = {

        constructor: TwbsPagination,

        init: function (options) {
            this.options = $.extend({}, this.options, options);

            this.currentPage = this.options.startPage;
            this.currentPagesArray = this.getPages();

            if (this.options.startPage < 1 || this.options.startPage > this.options.totalPages) {
                throw new Error('Start page option is incorrect');
            }

            if (this.options.totalPages <= 0) {
                throw new Error('Total pages option cannot be less 1 (one)!');
            }

            if (!$.isNumeric(this.options.visiblePages) && !this.options.visiblePages) {
                this.options.visiblePages = this.options.totalPages;
            }

            if (this.options.onPageClicked instanceof Function) {
                this.$element.bind('page', this.options.onPageClicked);
            }

            var tagName = (typeof this.$element.prop === 'function') ?
                this.$element.prop('tagName') : this.$element.attr('tagName');

            if (tagName === 'UL') {
                this.$listContainer = this.$element;
            } else {
                this.$listContainer = $('<ul></ul>');
            }

            this.$listContainer.addClass(this.options.paginationClass);

            this.$listContainer.append(this.buildListItems(this.currentPagesArray));

            if (tagName !== 'UL') {
                this.$element.append(this.$listContainer);
            }

            this.show(this.options.startPage);
        },

        show: function (page) {
            if (page < 1 || page > this.options.totalPages) {
                throw new Error('Page is incorrect.');
            }

            this.currentPage = page;

            this.render(this.getPages());
            this.setupEvents();

            this.$element.trigger('page', page);
        },

        getCurrentPage: function () {
            return this.currentPage;
        },

        setCurrentPage: function (page) {
            if ($.isNumeric(page)) {
                this.currentPage = page;
            }
        },

        buildListItems: function (pages) {
            var $listItems = $();

            if (this.options.first) {
                $listItems = $listItems.add(this.buildItem('first', 1));
            }

            if (this.options.prev) {
                $listItems = $listItems.add(this.buildItem('prev', 1));
            }

            for (var i = 0; i < pages.length; i++) {
                $listItems = $listItems.add(this.buildItem('page', pages[i]));
            }

            if (this.options.next) {
                $listItems = $listItems.add(this.buildItem('next', 2));
            }

            if (this.options.last) {
                $listItems = $listItems.add(this.buildItem('last', this.options.totalPages));
            }

            return $listItems;
        },

        buildItem: function (type, page) {
            var itemContainer = $('<li></li>'),
                itemContent = $('<a></a>'),
                itemText = null;

            itemContainer.addClass(type);
            itemContainer.attr('data-page', page);

            switch (type) {
                case 'page':
                    itemText = page;
                    break;
                case 'first':
                    itemText = this.options.first;
                    break;
                case 'prev':
                    itemText = this.options.prev;
                    break;
                case 'next':
                    itemText = this.options.next;
                    break;
                case 'last':
                    itemText = this.options.last;
                    break;
                default:
                    break;
            }

            itemContainer.append(itemContent.attr('href', this.href(page)).text(itemText));
            return itemContainer;
        },

        getPages: function () {
            var pages = [];

            var startPage;
            var section = parseInt(this.currentPage / this.options.visiblePages, 10);
            if (this.currentPage % this.options.visiblePages === 0) {
                startPage = (section - 1) * this.options.visiblePages + 1;
            } else {
                startPage = section * this.options.visiblePages + 1;
            }

            var endPage = Math.min(this.options.totalPages, (startPage + this.options.visiblePages) - 1);
            for (var i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            return pages;
        },

        render: function (pages) {
            if (!this.equals(this.currentPagesArray, pages)) {
                this.$listContainer.children().remove();
                this.$listContainer.append(this.buildListItems(pages));
                this.currentPagesArray = pages;
            }

            this.$listContainer.find('.page').removeClass('active');
            this.$listContainer.find('.page').filter('[data-page="' + this.currentPage + '"]').addClass('active');

            this.$listContainer.find('.first')
                .toggleClass('disabled', this.currentPage === 1);

            this.$listContainer.find('.last')
                .toggleClass('disabled', this.currentPage === this.options.totalPages);

            var prev = this.currentPage - 1;
            this.$listContainer.find('.prev')
                .toggleClass('disabled', this.currentPage === 1)
                .data('page', prev > 1 ? prev : 1);

            var next = this.currentPage + 1;
            this.$listContainer.find('.next')
                .toggleClass('disabled', this.currentPage === this.options.totalPages)
                .data('page', next < this.options.totalPages ? next : this.options.totalPages);
        },

        setupEvents: function () {
            var base = this;
            this.$listContainer.find('li').each(function () {
                var $this = $(this);
                $this.off();
                if ($this.hasClass('disabled') || $this.hasClass('active')) return;
                $this.click(function () {
                    base.show(parseInt($this.data('page'), 10));
                });
            });
        },

        equals: function (oldArray, newArray) {
            var i = 0;
            while ((i < oldArray.length) || (i < newArray.length)) {
                if (oldArray[i] !== newArray[i]) {
                    return false;
                }
                i++;
            }
            return true;
        },

        href: function (c) {
            return this.options.href.replace(this.options.hrefVariable, c);
        }

    };

    // PLUGIN DEFINITION

    $.fn.twbsPagination = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        var methodReturn;

        var $set = this.each(function () {
            var $this = $(this);
            var data = $this.data('twbs-pagination');
            var options = typeof option === 'object' && option;

            if (!data) $this.data('twbs-pagination', (data = new TwbsPagination(this, options) ));
            if (typeof option === 'string') methodReturn = data[ option ].apply(data, args);
        });

        return ( methodReturn === undefined ) ? $set : methodReturn;
    };

    $.fn.twbsPagination.defaults = {
        totalPages: 0,
        startPage: 1,
        visiblePages: 5,
        href: 'javascript:void(0);',
        hrefVariable: '{{number}}',
        first: 'First',
        prev: 'Previous',
        next: 'Next',
        last: 'Last',
        paginationClass: 'pagination',
        onPageClicked: null
    };

    $.fn.twbsPagination.Constructor = TwbsPagination;

    $.fn.twbsPagination.noConflict = function () {
        $.fn.twbsPagination = old;
        return this;
    };

})(jQuery, window, document);