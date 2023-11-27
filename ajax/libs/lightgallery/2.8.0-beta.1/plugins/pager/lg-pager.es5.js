/*!
 * lightgallery | 2.8.0-beta.1 | November 27th 2023
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

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

var pagerSettings = {
    pager: true,
};

var Pager = /** @class */ (function () {
    function Pager(instance, $LG) {
        // get lightGallery core plugin instance
        this.core = instance;
        this.$LG = $LG;
        // extend module default settings with lightGallery core settings
        this.settings = __assign(__assign({}, pagerSettings), this.core.settings);
        return this;
    }
    Pager.prototype.getPagerHtml = function (items) {
        var pagerList = '';
        for (var i = 0; i < items.length; i++) {
            pagerList += "<span  data-lg-item-id=\"" + i + "\" class=\"lg-pager-cont\"> \n                    <span data-lg-item-id=\"" + i + "\" class=\"lg-pager\"></span>\n                    <div class=\"lg-pager-thumb-cont\"><span class=\"lg-caret\"></span> <img src=\"" + items[i].thumb + "\" /></div>\n                    </span>";
        }
        return pagerList;
    };
    Pager.prototype.init = function () {
        var _this = this;
        if (!this.settings.pager) {
            return;
        }
        var timeout;
        this.core.$lgComponents.prepend('<div class="lg-pager-outer"></div>');
        var $pagerOuter = this.core.outer.find('.lg-pager-outer');
        $pagerOuter.html(this.getPagerHtml(this.core.galleryItems));
        // @todo enable click
        $pagerOuter.first().on('click.lg touchend.lg', function (event) {
            var $target = _this.$LG(event.target);
            if (!$target.hasAttribute('data-lg-item-id')) {
                return;
            }
            var index = parseInt($target.attr('data-lg-item-id'));
            _this.core.slide(index, false, true, false);
        });
        $pagerOuter.first().on('mouseover.lg', function () {
            clearTimeout(timeout);
            $pagerOuter.addClass('lg-pager-hover');
        });
        $pagerOuter.first().on('mouseout.lg', function () {
            timeout = setTimeout(function () {
                $pagerOuter.removeClass('lg-pager-hover');
            });
        });
        this.core.LGel.on(lGEvents.beforeSlide + ".pager", function (event) {
            var index = event.detail.index;
            _this.manageActiveClass.call(_this, index);
        });
        this.core.LGel.on(lGEvents.updateSlides + ".pager", function () {
            $pagerOuter.empty();
            $pagerOuter.html(_this.getPagerHtml(_this.core.galleryItems));
            _this.manageActiveClass(_this.core.index);
        });
    };
    Pager.prototype.manageActiveClass = function (index) {
        var $pagerCont = this.core.outer.find('.lg-pager-cont');
        $pagerCont.removeClass('lg-pager-active');
        $pagerCont.eq(index).addClass('lg-pager-active');
    };
    Pager.prototype.destroy = function () {
        this.core.outer.find('.lg-pager-outer').remove();
        this.core.LGel.off('.lg.pager');
        this.core.LGel.off('.pager');
    };
    return Pager;
}());

export default Pager;
//# sourceMappingURL=lg-pager.es5.js.map
