/*!
 * lightgallery | 2.7.1 | January 11th 2023
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lgThumbnail = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var thumbnailsSettings = {
        thumbnail: true,
        animateThumb: true,
        currentPagerPosition: 'middle',
        alignThumbnails: 'middle',
        thumbWidth: 100,
        thumbHeight: '80px',
        thumbMargin: 5,
        appendThumbnailsTo: '.lg-components',
        toggleThumb: false,
        enableThumbDrag: true,
        enableThumbSwipe: true,
        thumbnailSwipeThreshold: 10,
        loadYouTubeThumbnail: true,
        youTubeThumbSize: 1,
        thumbnailPluginStrings: {
            toggleThumbnails: 'Toggle thumbnails',
        },
    };

    /**
     * List of lightGallery events
     * All events should be documented here
     * Below interfaces are used to build the website documentations
     * */
    var lGEvents = {
        afterAppendSlide: 'lgAfterAppendSlide',
        init: 'lgInit',
        hasVideo: 'lgHasVideo',
        containerResize: 'lgContainerResize',
        updateSlides: 'lgUpdateSlides',
        afterAppendSubHtml: 'lgAfterAppendSubHtml',
        beforeOpen: 'lgBeforeOpen',
        afterOpen: 'lgAfterOpen',
        slideItemLoad: 'lgSlideItemLoad',
        beforeSlide: 'lgBeforeSlide',
        afterSlide: 'lgAfterSlide',
        posterClick: 'lgPosterClick',
        dragStart: 'lgDragStart',
        dragMove: 'lgDragMove',
        dragEnd: 'lgDragEnd',
        beforeNextSlide: 'lgBeforeNextSlide',
        beforePrevSlide: 'lgBeforePrevSlide',
        beforeClose: 'lgBeforeClose',
        afterClose: 'lgAfterClose',
        rotateLeft: 'lgRotateLeft',
        rotateRight: 'lgRotateRight',
        flipHorizontal: 'lgFlipHorizontal',
        flipVertical: 'lgFlipVertical',
        autoplay: 'lgAutoplay',
        autoplayStart: 'lgAutoplayStart',
        autoplayStop: 'lgAutoplayStop',
    };

    var Thumbnail = /** @class */ (function () {
        function Thumbnail(instance, $LG) {
            this.thumbOuterWidth = 0;
            this.thumbTotalWidth = 0;
            this.translateX = 0;
            this.thumbClickable = false;
            // get lightGallery core plugin instance
            this.core = instance;
            this.$LG = $LG;
            return this;
        }
        Thumbnail.prototype.init = function () {
            // extend module default settings with lightGallery core settings
            this.settings = __assign(__assign({}, thumbnailsSettings), this.core.settings);
            this.thumbOuterWidth = 0;
            this.thumbTotalWidth =
                this.core.galleryItems.length *
                    (this.settings.thumbWidth + this.settings.thumbMargin);
            // Thumbnail animation value
            this.translateX = 0;
            this.setAnimateThumbStyles();
            if (!this.core.settings.allowMediaOverlap) {
                this.settings.toggleThumb = false;
            }
            if (this.settings.thumbnail) {
                this.build();
                if (this.settings.animateThumb) {
                    if (this.settings.enableThumbDrag) {
                        this.enableThumbDrag();
                    }
                    if (this.settings.enableThumbSwipe) {
                        this.enableThumbSwipe();
                    }
                    this.thumbClickable = false;
                }
                else {
                    this.thumbClickable = true;
                }
                this.toggleThumbBar();
                this.thumbKeyPress();
            }
        };
        Thumbnail.prototype.build = function () {
            var _this = this;
            this.setThumbMarkup();
            this.manageActiveClassOnSlideChange();
            this.$lgThumb.first().on('click.lg touchend.lg', function (e) {
                var $target = _this.$LG(e.target);
                if (!$target.hasAttribute('data-lg-item-id')) {
                    return;
                }
                setTimeout(function () {
                    // In IE9 and bellow touch does not support
                    // Go to slide if browser does not support css transitions
                    if (_this.thumbClickable && !_this.core.lgBusy) {
                        var index = parseInt($target.attr('data-lg-item-id'));
                        _this.core.slide(index, false, true, false);
                    }
                }, 50);
            });
            this.core.LGel.on(lGEvents.beforeSlide + ".thumb", function (event) {
                var index = event.detail.index;
                _this.animateThumb(index);
            });
            this.core.LGel.on(lGEvents.beforeOpen + ".thumb", function () {
                _this.thumbOuterWidth = _this.core.outer.get().offsetWidth;
            });
            this.core.LGel.on(lGEvents.updateSlides + ".thumb", function () {
                _this.rebuildThumbnails();
            });
            this.core.LGel.on(lGEvents.containerResize + ".thumb", function () {
                if (!_this.core.lgOpened)
                    return;
                setTimeout(function () {
                    _this.thumbOuterWidth = _this.core.outer.get().offsetWidth;
                    _this.animateThumb(_this.core.index);
                    _this.thumbOuterWidth = _this.core.outer.get().offsetWidth;
                }, 50);
            });
        };
        Thumbnail.prototype.setThumbMarkup = function () {
            var thumbOuterClassNames = 'lg-thumb-outer ';
            if (this.settings.alignThumbnails) {
                thumbOuterClassNames += "lg-thumb-align-" + this.settings.alignThumbnails;
            }
            var html = "<div class=\"" + thumbOuterClassNames + "\">\n        <div class=\"lg-thumb lg-group\">\n        </div>\n        </div>";
            this.core.outer.addClass('lg-has-thumb');
            if (this.settings.appendThumbnailsTo === '.lg-components') {
                this.core.$lgComponents.append(html);
            }
            else {
                this.core.outer.append(html);
            }
            this.$thumbOuter = this.core.outer.find('.lg-thumb-outer').first();
            this.$lgThumb = this.core.outer.find('.lg-thumb').first();
            if (this.settings.animateThumb) {
                this.core.outer
                    .find('.lg-thumb')
                    .css('transition-duration', this.core.settings.speed + 'ms')
                    .css('width', this.thumbTotalWidth + 'px')
                    .css('position', 'relative');
            }
            this.setThumbItemHtml(this.core.galleryItems);
        };
        Thumbnail.prototype.enableThumbDrag = function () {
            var _this = this;
            var thumbDragUtils = {
                cords: {
                    startX: 0,
                    endX: 0,
                },
                isMoved: false,
                newTranslateX: 0,
                startTime: new Date(),
                endTime: new Date(),
                touchMoveTime: 0,
            };
            var isDragging = false;
            this.$thumbOuter.addClass('lg-grab');
            this.core.outer
                .find('.lg-thumb')
                .first()
                .on('mousedown.lg.thumb', function (e) {
                if (_this.thumbTotalWidth > _this.thumbOuterWidth) {
                    // execute only on .lg-object
                    e.preventDefault();
                    thumbDragUtils.cords.startX = e.pageX;
                    thumbDragUtils.startTime = new Date();
                    _this.thumbClickable = false;
                    isDragging = true;
                    // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                    _this.core.outer.get().scrollLeft += 1;
                    _this.core.outer.get().scrollLeft -= 1;
                    // *
                    _this.$thumbOuter
                        .removeClass('lg-grab')
                        .addClass('lg-grabbing');
                }
            });
            this.$LG(window).on("mousemove.lg.thumb.global" + this.core.lgId, function (e) {
                if (!_this.core.lgOpened)
                    return;
                if (isDragging) {
                    thumbDragUtils.cords.endX = e.pageX;
                    thumbDragUtils = _this.onThumbTouchMove(thumbDragUtils);
                }
            });
            this.$LG(window).on("mouseup.lg.thumb.global" + this.core.lgId, function () {
                if (!_this.core.lgOpened)
                    return;
                if (thumbDragUtils.isMoved) {
                    thumbDragUtils = _this.onThumbTouchEnd(thumbDragUtils);
                }
                else {
                    _this.thumbClickable = true;
                }
                if (isDragging) {
                    isDragging = false;
                    _this.$thumbOuter.removeClass('lg-grabbing').addClass('lg-grab');
                }
            });
        };
        Thumbnail.prototype.enableThumbSwipe = function () {
            var _this = this;
            var thumbDragUtils = {
                cords: {
                    startX: 0,
                    endX: 0,
                },
                isMoved: false,
                newTranslateX: 0,
                startTime: new Date(),
                endTime: new Date(),
                touchMoveTime: 0,
            };
            this.$lgThumb.on('touchstart.lg', function (e) {
                if (_this.thumbTotalWidth > _this.thumbOuterWidth) {
                    e.preventDefault();
                    thumbDragUtils.cords.startX = e.targetTouches[0].pageX;
                    _this.thumbClickable = false;
                    thumbDragUtils.startTime = new Date();
                }
            });
            this.$lgThumb.on('touchmove.lg', function (e) {
                if (_this.thumbTotalWidth > _this.thumbOuterWidth) {
                    e.preventDefault();
                    thumbDragUtils.cords.endX = e.targetTouches[0].pageX;
                    thumbDragUtils = _this.onThumbTouchMove(thumbDragUtils);
                }
            });
            this.$lgThumb.on('touchend.lg', function () {
                if (thumbDragUtils.isMoved) {
                    thumbDragUtils = _this.onThumbTouchEnd(thumbDragUtils);
                }
                else {
                    _this.thumbClickable = true;
                }
            });
        };
        // Rebuild thumbnails
        Thumbnail.prototype.rebuildThumbnails = function () {
            var _this = this;
            // Remove transitions
            this.$thumbOuter.addClass('lg-rebuilding-thumbnails');
            setTimeout(function () {
                _this.thumbTotalWidth =
                    _this.core.galleryItems.length *
                        (_this.settings.thumbWidth + _this.settings.thumbMargin);
                _this.$lgThumb.css('width', _this.thumbTotalWidth + 'px');
                _this.$lgThumb.empty();
                _this.setThumbItemHtml(_this.core.galleryItems);
                _this.animateThumb(_this.core.index);
            }, 50);
            setTimeout(function () {
                _this.$thumbOuter.removeClass('lg-rebuilding-thumbnails');
            }, 200);
        };
        // @ts-check
        Thumbnail.prototype.setTranslate = function (value) {
            this.$lgThumb.css('transform', 'translate3d(-' + value + 'px, 0px, 0px)');
        };
        Thumbnail.prototype.getPossibleTransformX = function (left) {
            if (left > this.thumbTotalWidth - this.thumbOuterWidth) {
                left = this.thumbTotalWidth - this.thumbOuterWidth;
            }
            if (left < 0) {
                left = 0;
            }
            return left;
        };
        Thumbnail.prototype.animateThumb = function (index) {
            this.$lgThumb.css('transition-duration', this.core.settings.speed + 'ms');
            if (this.settings.animateThumb) {
                var position = 0;
                switch (this.settings.currentPagerPosition) {
                    case 'left':
                        position = 0;
                        break;
                    case 'middle':
                        position =
                            this.thumbOuterWidth / 2 - this.settings.thumbWidth / 2;
                        break;
                    case 'right':
                        position = this.thumbOuterWidth - this.settings.thumbWidth;
                }
                this.translateX =
                    (this.settings.thumbWidth + this.settings.thumbMargin) * index -
                        1 -
                        position;
                if (this.translateX > this.thumbTotalWidth - this.thumbOuterWidth) {
                    this.translateX = this.thumbTotalWidth - this.thumbOuterWidth;
                }
                if (this.translateX < 0) {
                    this.translateX = 0;
                }
                this.setTranslate(this.translateX);
            }
        };
        Thumbnail.prototype.onThumbTouchMove = function (thumbDragUtils) {
            thumbDragUtils.newTranslateX = this.translateX;
            thumbDragUtils.isMoved = true;
            thumbDragUtils.touchMoveTime = new Date().valueOf();
            thumbDragUtils.newTranslateX -=
                thumbDragUtils.cords.endX - thumbDragUtils.cords.startX;
            thumbDragUtils.newTranslateX = this.getPossibleTransformX(thumbDragUtils.newTranslateX);
            // move current slide
            this.setTranslate(thumbDragUtils.newTranslateX);
            this.$thumbOuter.addClass('lg-dragging');
            return thumbDragUtils;
        };
        Thumbnail.prototype.onThumbTouchEnd = function (thumbDragUtils) {
            thumbDragUtils.isMoved = false;
            thumbDragUtils.endTime = new Date();
            this.$thumbOuter.removeClass('lg-dragging');
            var touchDuration = thumbDragUtils.endTime.valueOf() -
                thumbDragUtils.startTime.valueOf();
            var distanceXnew = thumbDragUtils.cords.endX - thumbDragUtils.cords.startX;
            var speedX = Math.abs(distanceXnew) / touchDuration;
            // Some magical numbers
            // Can be improved
            if (speedX > 0.15 &&
                thumbDragUtils.endTime.valueOf() - thumbDragUtils.touchMoveTime < 30) {
                speedX += 1;
                if (speedX > 2) {
                    speedX += 1;
                }
                speedX =
                    speedX +
                        speedX * (Math.abs(distanceXnew) / this.thumbOuterWidth);
                this.$lgThumb.css('transition-duration', Math.min(speedX - 1, 2) + 'settings');
                distanceXnew = distanceXnew * speedX;
                this.translateX = this.getPossibleTransformX(this.translateX - distanceXnew);
                this.setTranslate(this.translateX);
            }
            else {
                this.translateX = thumbDragUtils.newTranslateX;
            }
            if (Math.abs(thumbDragUtils.cords.endX - thumbDragUtils.cords.startX) <
                this.settings.thumbnailSwipeThreshold) {
                this.thumbClickable = true;
            }
            return thumbDragUtils;
        };
        Thumbnail.prototype.getThumbHtml = function (thumb, index) {
            var slideVideoInfo = this.core.galleryItems[index].__slideVideoInfo || {};
            var thumbImg;
            if (slideVideoInfo.youtube) {
                if (this.settings.loadYouTubeThumbnail) {
                    thumbImg =
                        '//img.youtube.com/vi/' +
                            slideVideoInfo.youtube[1] +
                            '/' +
                            this.settings.youTubeThumbSize +
                            '.jpg';
                }
                else {
                    thumbImg = thumb;
                }
            }
            else {
                thumbImg = thumb;
            }
            return "<div data-lg-item-id=\"" + index + "\" class=\"lg-thumb-item " + (index === this.core.index ? ' active' : '') + "\" \n        style=\"width:" + this.settings.thumbWidth + "px; height: " + this.settings.thumbHeight + ";\n            margin-right: " + this.settings.thumbMargin + "px;\">\n            <img data-lg-item-id=\"" + index + "\" src=\"" + thumbImg + "\" />\n        </div>";
        };
        Thumbnail.prototype.getThumbItemHtml = function (items) {
            var thumbList = '';
            for (var i = 0; i < items.length; i++) {
                thumbList += this.getThumbHtml(items[i].thumb, i);
            }
            return thumbList;
        };
        Thumbnail.prototype.setThumbItemHtml = function (items) {
            var thumbList = this.getThumbItemHtml(items);
            this.$lgThumb.html(thumbList);
        };
        Thumbnail.prototype.setAnimateThumbStyles = function () {
            if (this.settings.animateThumb) {
                this.core.outer.addClass('lg-animate-thumb');
            }
        };
        // Manage thumbnail active calss
        Thumbnail.prototype.manageActiveClassOnSlideChange = function () {
            var _this = this;
            // manage active class for thumbnail
            this.core.LGel.on(lGEvents.beforeSlide + ".thumb", function (event) {
                var $thumb = _this.core.outer.find('.lg-thumb-item');
                var index = event.detail.index;
                $thumb.removeClass('active');
                $thumb.eq(index).addClass('active');
            });
        };
        // Toggle thumbnail bar
        Thumbnail.prototype.toggleThumbBar = function () {
            var _this = this;
            if (this.settings.toggleThumb) {
                this.core.outer.addClass('lg-can-toggle');
                this.core.$toolbar.append('<button type="button" aria-label="' +
                    this.settings.thumbnailPluginStrings['toggleThumbnails'] +
                    '" class="lg-toggle-thumb lg-icon"></button>');
                this.core.outer
                    .find('.lg-toggle-thumb')
                    .first()
                    .on('click.lg', function () {
                    _this.core.outer.toggleClass('lg-components-open');
                });
            }
        };
        Thumbnail.prototype.thumbKeyPress = function () {
            var _this = this;
            this.$LG(window).on("keydown.lg.thumb.global" + this.core.lgId, function (e) {
                if (!_this.core.lgOpened || !_this.settings.toggleThumb)
                    return;
                if (e.keyCode === 38) {
                    e.preventDefault();
                    _this.core.outer.addClass('lg-components-open');
                }
                else if (e.keyCode === 40) {
                    e.preventDefault();
                    _this.core.outer.removeClass('lg-components-open');
                }
            });
        };
        Thumbnail.prototype.destroy = function () {
            if (this.settings.thumbnail) {
                this.$LG(window).off(".lg.thumb.global" + this.core.lgId);
                this.core.LGel.off('.lg.thumb');
                this.core.LGel.off('.thumb');
                this.$thumbOuter.remove();
                this.core.outer.removeClass('lg-has-thumb');
            }
        };
        return Thumbnail;
    }());

    return Thumbnail;

})));
//# sourceMappingURL=lg-thumbnail.umd.js.map
