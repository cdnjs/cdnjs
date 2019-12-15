'use strict';
(function ($) {
    var SlickLightbox, defaults;
    SlickLightbox = function () {
        /*
  The core class.
   */
        function SlickLightbox(element, options1) {
            var slickLightbox;
            this.options = options1;
            /* Binds the plugin. */
            this.$element = $(element);
            this.didInit = false;
            slickLightbox = this;
            this.$element.on('click.slickLightbox', this.options.itemSelector, function (e) {
                var $clickedItem, $items;
                e.preventDefault();
                $clickedItem = $(this);
                $clickedItem.blur();
                if (typeof slickLightbox.options.shouldOpen === 'function') {
                    if (!slickLightbox.options.shouldOpen(slickLightbox, $clickedItem, e)) {
                        return;
                    }
                }
                $items = slickLightbox.$element.find(slickLightbox.options.itemSelector);
                if (slickLightbox.elementIsSlick()) {
                    $items = slickLightbox.filterOutSlickClones($items);
                    $clickedItem = slickLightbox.handlePossibleCloneClick($clickedItem, $items);
                }
                return slickLightbox.init($items.index($clickedItem));
            });
        }
        SlickLightbox.prototype.init = function (index) {
            /* Creates the lightbox, opens it, binds events and calls `slick`. Accepts `index` of the element, that triggered it (so that we know, on which slide to start slick). */
            this.didInit = true;
            this.detectIE();
            this.createModal();
            this.bindEvents();
            this.initSlick(index);
            return this.open();
        };
        SlickLightbox.prototype.createModalItems = function () {
            /* Creates individual slides to be used with slick. If `options.images` array is specified, it uses it's contents, otherwise loops through elements' `options.itemSelector`. */
            var $items, createItem, itemTemplate, lazyPlaceholder, length, links;
            lazyPlaceholder = this.options.lazyPlaceholder || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            itemTemplate = function (source, caption, lazy) {
                var imgSourceParams;
                if (lazy === true) {
                    imgSourceParams = ' data-lazy="' + source + '" src="' + lazyPlaceholder + '" ';
                } else {
                    imgSourceParams = ' src="' + source + '" ';
                }
                return '<div class="slick-lightbox-slick-item">\n  <div class="slick-lightbox-slick-item-inner">\n    <img class="slick-lightbox-slick-img" ' + imgSourceParams + ' />\n    ' + caption + '\n  </div>\n</div>';
            };
            if (this.options.images) {
                links = $.map(this.options.images, function (_this) {
                    return function (img) {
                        return itemTemplate(img, _this.options.lazy);
                    };
                }(this));
            } else {
                $items = this.filterOutSlickClones(this.$element.find(this.options.itemSelector));
                length = $items.length;
                createItem = function (_this) {
                    return function (el, index) {
                        var caption, info, src;
                        info = {
                            index: index,
                            length: length
                        };
                        caption = _this.getElementCaption(el, info);
                        src = _this.getElementSrc(el);
                        return itemTemplate(src, caption, _this.options.lazy);
                    };
                }(this);
                links = $.map($items, createItem);
            }
            return links;
        };
        SlickLightbox.prototype.createModal = function () {
            /* Creates a `slick`-friendly modal. */
            var html, links;
            links = this.createModalItems();
            html = '<div class="slick-lightbox slick-lightbox-hide-init' + (this.isIE ? ' slick-lightbox-ie' : '') + '" style="background: ' + this.options.background + ';">\n  <div class="slick-lightbox-inner">\n    <div class="slick-lightbox-slick slick-caption-' + this.options.captionPosition + '">' + links.join('') + '</div>\n  <div>\n<div>';
            this.$modalElement = $(html);
            this.$parts = {};
            this.$parts['closeButton'] = $(this.options.layouts.closeButton);
            this.$modalElement.find('.slick-lightbox-inner').append(this.$parts['closeButton']);
            return $('body').append(this.$modalElement);
        };
        SlickLightbox.prototype.initSlick = function (index) {
            /* Runs slick by default, using `options.slick` if provided. If `options.slick` is a function, it gets fired instead of us initializing slick. Merges in initialSlide option. */
            var additional;
            additional = { initialSlide: index };
            if (this.options.lazy) {
                additional.lazyLoad = 'ondemand';
            }
            if (this.options.slick != null) {
                if (typeof this.options.slick === 'function') {
                    this.slick = this.options.slick(this.$modalElement);
                } else {
                    this.slick = this.$modalElement.find('.slick-lightbox-slick').slick($.extend({}, this.options.slick, additional));
                }
            } else {
                this.slick = this.$modalElement.find('.slick-lightbox-slick').slick(additional);
            }
            return this.$modalElement.trigger('init.slickLightbox');
        };
        SlickLightbox.prototype.open = function () {
            /* Opens the lightbox. */
            if (this.options.useHistoryApi) {
                this.writeHistory();
            }
            this.$element.trigger('show.slickLightbox');
            setTimeout(function (_this) {
                return function () {
                    return _this.$element.trigger('shown.slickLightbox');
                };
            }(this), this.getTransitionDuration());
            return this.$modalElement.removeClass('slick-lightbox-hide-init');
        };
        SlickLightbox.prototype.close = function () {
            /* Closes the lightbox and destroys it, maintaining the original element bindings. */
            this.$element.trigger('hide.slickLightbox');
            setTimeout(function (_this) {
                return function () {
                    return _this.$element.trigger('hidden.slickLightbox');
                };
            }(this), this.getTransitionDuration());
            this.$modalElement.addClass('slick-lightbox-hide');
            return this.destroy();
        };
        SlickLightbox.prototype.bindEvents = function () {
            /* Binds global events. */
            var resizeSlides;
            resizeSlides = function (_this) {
                return function () {
                    var h;
                    h = _this.$modalElement.find('.slick-lightbox-inner').height();
                    _this.$modalElement.find('.slick-lightbox-slick-item').height(h);
                    return _this.$modalElement.find('.slick-lightbox-slick-img, .slick-lightbox-slick-item-inner').css('max-height', Math.round(_this.options.imageMaxHeight * h));
                };
            }(this);
            $(window).on('orientationchange.slickLightbox resize.slickLightbox', resizeSlides);
            if (this.options.useHistoryApi) {
                $(window).on('popstate.slickLightbox', function (_this) {
                    return function () {
                        return _this.close();
                    };
                }(this));
            }
            this.$modalElement.on('init.slickLightbox', resizeSlides);
            this.$modalElement.on('destroy.slickLightbox', function (_this) {
                return function () {
                    return _this.destroy();
                };
            }(this));
            this.$element.on('destroy.slickLightbox', function (_this) {
                return function () {
                    return _this.destroy(true);
                };
            }(this));
            this.$parts['closeButton'].on('click.slickLightbox touchstart.slickLightbox', function (_this) {
                return function (e) {
                    e.preventDefault();
                    return _this.close();
                };
            }(this));
            if (this.options.closeOnEscape || this.options.navigateByKeyboard) {
                $(document).on('keydown.slickLightbox', function (_this) {
                    return function (e) {
                        var code;
                        code = e.keyCode ? e.keyCode : e.which;
                        if (_this.options.navigateByKeyboard) {
                            if (code === 37) {
                                _this.slideSlick('left');
                            } else if (code === 39) {
                                _this.slideSlick('right');
                            }
                        }
                        if (_this.options.closeOnEscape) {
                            if (code === 27) {
                                return _this.close();
                            }
                        }
                    };
                }(this));
            }
            if (this.options.closeOnBackdropClick) {
                this.$modalElement.on('click.slickLightbox touchstart.slickLightbox', '.slick-lightbox-slick-img', function (e) {
                    return e.stopPropagation();
                });
                return this.$modalElement.on('click.slickLightbox', '.slick-lightbox-slick-item', function (_this) {
                    return function (e) {
                        e.preventDefault();
                        return _this.close();
                    };
                }(this));
            }
        };
        SlickLightbox.prototype.slideSlick = function (direction) {
            /* Moves the slick prev or next. */
            if (direction === 'left') {
                return this.slick.slick('slickPrev');
            } else {
                return this.slick.slick('slickNext');
            }
        };
        SlickLightbox.prototype.detectIE = function () {
            /* Detects usage of IE8 and lower. */
            var ieversion;
            this.isIE = false;
            if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                ieversion = new Number(RegExp.$1);
                if (ieversion < 9) {
                    return this.isIE = true;
                }
            }
        };
        SlickLightbox.prototype.getElementCaption = function (el, info) {
            /* Returns caption for each slide based on the type of `options.caption`. */
            var c;
            if (!this.options.caption) {
                return '';
            }
            c = function () {
                switch (typeof this.options.caption) {
                case 'function':
                    return this.options.caption(el, info);
                case 'string':
                    return $(el).data(this.options.caption);
                }
            }.call(this);
            return '<span class="slick-lightbox-slick-caption">' + c + '</span>';
        };
        SlickLightbox.prototype.getElementSrc = function (el) {
            /* Returns src for each slide image based on the type of `options.src`. */
            switch (typeof this.options.src) {
            case 'function':
                return this.options.src(el);
            case 'string':
                return $(el).attr(this.options.src);
            default:
                return el.href;
            }
        };
        SlickLightbox.prototype.unbindEvents = function () {
            /* Unbinds global events. */
            $(window).off('.slickLightbox');
            $(document).off('.slickLightbox');
            return this.$modalElement.off('.slickLightbox');
        };
        SlickLightbox.prototype.destroy = function (unbindAnchors) {
            if (unbindAnchors == null) {
                unbindAnchors = false;
            }
            /* Destroys the lightbox and unbinds global events. If `true` is passed as an argument, unbinds the original element as well. */
            if (this.didInit) {
                this.unbindEvents();
                setTimeout(function (_this) {
                    return function () {
                        return _this.$modalElement.remove();
                    };
                }(this), this.options.destroyTimeout);
            }
            if (unbindAnchors) {
                this.$element.off('.slickLightbox');
                return this.$element.off('.slickLightbox', this.options.itemSelector);
            }
        };
        SlickLightbox.prototype.destroyPrevious = function () {
            /* Destroys lightboxes currently in DOM. */
            return $('body').children('.slick-lightbox').trigger('destroy.slickLightbox');
        };
        SlickLightbox.prototype.getTransitionDuration = function () {
            /* Detects the transition duration to know when to remove stuff from DOM etc. */
            var duration;
            if (this.transitionDuration) {
                return this.transitionDuration;
            }
            duration = this.$modalElement.css('transition-duration');
            if (typeof duration === 'undefined') {
                return this.transitionDuration = 500;
            } else {
                return this.transitionDuration = duration.indexOf('ms') > -1 ? parseFloat(duration) : parseFloat(duration) * 1000;
            }
        };
        SlickLightbox.prototype.writeHistory = function () {
            /* Writes an empty state to the history API if supported. */
            return typeof history !== 'undefined' && history !== null ? typeof history.pushState === 'function' ? history.pushState(null, null, '') : void 0 : void 0;
        };
        SlickLightbox.prototype.filterOutSlickClones = function ($items) {
            /* Removes all slick clones from the set of elements. Only does so, if the target element is a slick slider. */
            if (!this.elementIsSlick()) {
                return $items;
            }
            return $items = $items.filter(function () {
                var $item;
                $item = $(this);
                return !$item.hasClass('slick-cloned') && $item.parents('.slick-cloned').length === 0;
            });
        };
        SlickLightbox.prototype.handlePossibleCloneClick = function ($clickedItem, $items) {
            var href;
            if (!this.elementIsSlick()) {
                return $clickedItem;
            }
            if (!$clickedItem.closest('.slick-slide').hasClass('slick-cloned')) {
                return $clickedItem;
            }
            href = $clickedItem.attr('href');
            return $items.filter(function () {
                return $(this).attr('href') === href;
            }).first();
        };
        SlickLightbox.prototype.elementIsSlick = function () {
            return this.$element.hasClass('slick-slider');
        };
        return SlickLightbox;
    }();
    defaults = {
        background: 'rgba(0,0,0,.8)',
        closeOnEscape: true,
        closeOnBackdropClick: true,
        destroyTimeout: 500,
        itemSelector: 'a',
        navigateByKeyboard: true,
        src: false,
        caption: false,
        captionPosition: 'dynamic',
        images: false,
        slick: {},
        useHistoryApi: false,
        layouts: { closeButton: '<button type="button" class="slick-lightbox-close"></button>' },
        shouldOpen: null,
        imageMaxHeight: 0.9,
        lazy: false
    };
    $.fn.slickLightbox = function (options) {
        /* Fires the plugin. */
        options = $.extend({}, defaults, options);
        $(this).each(function () {
            return this.slickLightbox = new SlickLightbox(this, options);
        });
        return this;
    };
    $.fn.unslickLightbox = function () {
        /* Removes everything. */
        return $(this).trigger('destroy.slickLightbox').each(function () {
            return this.slickLightbox = null;
        });
    };
}(jQuery));