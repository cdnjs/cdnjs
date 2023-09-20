/*!
 * lightgallery | 2.7.2 | September 20th 2023
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.lgShare = factory());
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

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    var shareSettings = {
        share: true,
        facebook: true,
        facebookDropdownText: 'Facebook',
        twitter: true,
        twitterDropdownText: 'Twitter',
        pinterest: true,
        pinterestDropdownText: 'Pinterest',
        additionalShareOptions: [],
        sharePluginStrings: { share: 'Share' },
    };

    function getFacebookShareLink(galleryItem) {
        var facebookBaseUrl = '//www.facebook.com/sharer/sharer.php?u=';
        return (facebookBaseUrl +
            encodeURIComponent(galleryItem.facebookShareUrl || window.location.href));
    }

    function getTwitterShareLink(galleryItem) {
        var twitterBaseUrl = '//twitter.com/intent/tweet?text=';
        var url = encodeURIComponent(galleryItem.twitterShareUrl || window.location.href);
        var text = galleryItem.tweetText;
        return twitterBaseUrl + text + '&url=' + url;
    }

    function getPinterestShareLink(galleryItem) {
        var pinterestBaseUrl = 'http://www.pinterest.com/pin/create/button/?url=';
        var description = galleryItem.pinterestText;
        var media = encodeURIComponent(galleryItem.src);
        var url = encodeURIComponent(galleryItem.pinterestShareUrl || window.location.href);
        return (pinterestBaseUrl +
            url +
            '&media=' +
            media +
            '&description=' +
            description);
    }

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

    var Share = /** @class */ (function () {
        function Share(instance) {
            this.shareOptions = [];
            // get lightGallery core plugin instance
            this.core = instance;
            // extend module default settings with lightGallery core settings
            this.settings = __assign(__assign({}, shareSettings), this.core.settings);
            return this;
        }
        Share.prototype.init = function () {
            if (!this.settings.share) {
                return;
            }
            this.shareOptions = __spreadArrays(this.getDefaultShareOptions(), this.settings.additionalShareOptions);
            this.setLgShareMarkup();
            this.core.outer
                .find('.lg-share .lg-dropdown')
                .append(this.getShareListHtml());
            this.core.LGel.on(lGEvents.afterSlide + ".share", this.onAfterSlide.bind(this));
        };
        Share.prototype.getShareListHtml = function () {
            var shareHtml = '';
            this.shareOptions.forEach(function (shareOption) {
                shareHtml += shareOption.dropdownHTML;
            });
            return shareHtml;
        };
        Share.prototype.setLgShareMarkup = function () {
            var _this = this;
            this.core.$toolbar.append("<button type=\"button\" aria-label=\"" + this.settings.sharePluginStrings['share'] + "\" aria-haspopup=\"true\" aria-expanded=\"false\" class=\"lg-share lg-icon\">\n                <ul class=\"lg-dropdown\" style=\"position: absolute;\"></ul></button>");
            this.core.outer.append('<div class="lg-dropdown-overlay"></div>');
            var $shareButton = this.core.outer.find('.lg-share');
            $shareButton.first().on('click.lg', function () {
                _this.core.outer.toggleClass('lg-dropdown-active');
                if (_this.core.outer.hasClass('lg-dropdown-active')) {
                    _this.core.outer.attr('aria-expanded', true);
                }
                else {
                    _this.core.outer.attr('aria-expanded', false);
                }
            });
            this.core.outer
                .find('.lg-dropdown-overlay')
                .first()
                .on('click.lg', function () {
                _this.core.outer.removeClass('lg-dropdown-active');
                _this.core.outer.attr('aria-expanded', false);
            });
        };
        Share.prototype.onAfterSlide = function (event) {
            var _this = this;
            var index = event.detail.index;
            var currentItem = this.core.galleryItems[index];
            setTimeout(function () {
                _this.shareOptions.forEach(function (shareOption) {
                    var selector = shareOption.selector;
                    _this.core.outer
                        .find(selector)
                        .attr('href', shareOption.generateLink(currentItem));
                });
            }, 100);
        };
        Share.prototype.getShareListItemHTML = function (type, text) {
            return "<li><a class=\"lg-share-" + type + "\" rel=\"noopener\" target=\"_blank\"><span class=\"lg-icon\"></span><span class=\"lg-dropdown-text\">" + text + "</span></a></li>";
        };
        Share.prototype.getDefaultShareOptions = function () {
            return __spreadArrays((this.settings.facebook
                ? [
                    {
                        type: 'facebook',
                        generateLink: getFacebookShareLink,
                        dropdownHTML: this.getShareListItemHTML('facebook', this.settings.facebookDropdownText),
                        selector: '.lg-share-facebook',
                    },
                ]
                : []), (this.settings.twitter
                ? [
                    {
                        type: 'twitter',
                        generateLink: getTwitterShareLink,
                        dropdownHTML: this.getShareListItemHTML('twitter', this.settings.twitterDropdownText),
                        selector: '.lg-share-twitter',
                    },
                ]
                : []), (this.settings.pinterest
                ? [
                    {
                        type: 'pinterest',
                        generateLink: getPinterestShareLink,
                        dropdownHTML: this.getShareListItemHTML('pinterest', this.settings.pinterestDropdownText),
                        selector: '.lg-share-pinterest',
                    },
                ]
                : []));
        };
        Share.prototype.destroy = function () {
            this.core.outer.find('.lg-dropdown-overlay').remove();
            this.core.outer.find('.lg-share').remove();
            this.core.LGel.off('.lg.share');
            this.core.LGel.off('.share');
        };
        return Share;
    }());

    return Share;

})));
//# sourceMappingURL=lg-share.umd.js.map
