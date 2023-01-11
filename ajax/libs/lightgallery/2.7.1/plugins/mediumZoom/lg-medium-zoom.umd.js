/*!
 * lightgallery | 2.7.1 | January 11th 2023
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lgMediumZoom = factory());
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

    var mediumZoomSettings = {
        margin: 40,
        mediumZoom: true,
        backgroundColor: '#000',
    };

    var MediumZoom = /** @class */ (function () {
        function MediumZoom(instance, $LG) {
            var _this = this;
            // get lightGallery core plugin instance
            this.core = instance;
            this.$LG = $LG;
            // Set margin
            this.core.getMediaContainerPosition = function () {
                return {
                    top: _this.settings.margin,
                    bottom: _this.settings.margin,
                };
            };
            // Override some of lightGallery default settings
            var defaultSettings = {
                controls: false,
                download: false,
                counter: false,
                showCloseIcon: false,
                extraProps: ['lgBackgroundColor'],
                closeOnTap: false,
                enableSwipe: false,
                enableDrag: false,
                swipeToClose: false,
                addClass: this.core.settings.addClass + ' lg-medium-zoom',
            };
            this.core.settings = __assign(__assign({}, this.core.settings), defaultSettings);
            // extend module default settings with lightGallery core settings
            this.settings = __assign(__assign(__assign({}, mediumZoomSettings), this.core.settings), defaultSettings);
            return this;
        }
        MediumZoom.prototype.toggleItemClass = function () {
            for (var index = 0; index < this.core.items.length; index++) {
                var $element = this.$LG(this.core.items[index]);
                $element.toggleClass('lg-medium-zoom-item');
            }
        };
        MediumZoom.prototype.init = function () {
            var _this = this;
            if (!this.settings.mediumZoom) {
                return;
            }
            this.core.LGel.on(lGEvents.beforeOpen + ".medium", function () {
                _this.core.$backdrop.css('background-color', _this.core.galleryItems[_this.core.index].lgBackgroundColor ||
                    _this.settings.backgroundColor);
            });
            this.toggleItemClass();
            this.core.outer.on('click.lg.medium', function () {
                _this.core.closeGallery();
            });
        };
        MediumZoom.prototype.destroy = function () {
            this.toggleItemClass();
        };
        return MediumZoom;
    }());

    return MediumZoom;

})));
//# sourceMappingURL=lg-medium-zoom.umd.js.map
