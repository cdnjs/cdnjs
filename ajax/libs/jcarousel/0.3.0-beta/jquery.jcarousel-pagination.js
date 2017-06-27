/*! jCarousel - v0.3.0-beta - 2013-01-18
* http://sorgalla.com/jcarousel/
* Copyright 2013 Jan Sorgalla
* Released under the MIT license */

(function($) {
    'use strict';

    $.jCarousel.plugin('jcarouselPagination', {
        _options: {
            perPage: null,
            item: function(page) {
                return '<a href="#' + page + '">' + page + '</a>';
            }
        },
        _pages: {},
        _items: {},
        _init: function() {
            this.onDestroy = $.proxy(function() {
                this._destroy();
                this.carousel()
                    .one('createend.jcarousel', $.proxy(this._create, this));
            }, this);
            this.onReload = $.proxy(this._reload, this);
        },
        _create: function() {
            this.carousel()
                .one('destroy.jcarousel', this.onDestroy)
                .bind('reloadend.jcarousel', this.onReload);

            this._reload();
        },
        _destroy: function() {
            if ($.fn.jcarouselControl) {
                $.each(this._items, function(page, item) {
                    item.jcarouselControl('destroy');
                });
            }

            this._element.empty();

            this.carousel()
                .unbind('destroy.jcarousel', this.onDestroy)
                .unbind('reloadend.jcarousel', this.onReload);
        },
        _reload: function() {
            var perPage = this.options('perPage');

            this._pages = {};
            this._items = {};

            // Calculate pages
            if ($.isFunction(perPage)) {
                perPage = perPage.call(this);
            }

            if (perPage == null) {
                this._pages = this._calculatePages();
            } else {
                var pp    = parseInt(perPage, 10) || 0,
                    items = this.carousel().jcarousel('items'),
                    page  = 1,
                    i     = 0,
                    curr;

                while (true) {
                    curr = items.eq(i++);

                    if (curr.size() === 0) {
                        break;
                    }

                    if (!this._pages[page]) {
                        this._pages[page] = curr;
                    } else {
                        this._pages[page] = this._pages[page].add(curr);
                    }

                    if (i % pp === 0) {
                        page++;
                    }
                }
            }

            var self    = this,
                element = this._element.empty(),
                item    = this.options('item');

            $.each(this._pages, function(page, carouselItems) {
                var currItem = self._items[page] = $(item.call(self, page, carouselItems));

                element.append(currItem);

                if ($.fn.jcarouselControl) {
                    currItem.jcarouselControl({
                        carousel: self.carousel(),
                        target:   carouselItems.eq(0)
                    });
                }
            });
        },
        items: function() {
            return this._items;
        },
        _calculatePages: function() {
            var carousel = this.carousel().data('jcarousel'),
                items    = carousel.items(),
                clip     = carousel.clipping(),
                wh       = 0,
                idx      = 0,
                page     = 1,
                pages    = {},
                curr;

            while (true) {
                curr = items.eq(idx++);

                if (curr.size() === 0) {
                    break;
                }

                if (!pages[page]) {
                    pages[page] = curr;
                } else {
                    pages[page] = pages[page].add(curr);
                }

                wh += carousel.dimension(curr);

                if (wh >= clip) {
                    page++;
                    wh = 0;
                }
            }

            return pages;
        }
    });
}(jQuery));
