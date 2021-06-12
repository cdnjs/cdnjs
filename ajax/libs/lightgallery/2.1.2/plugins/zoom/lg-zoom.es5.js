/*!
 * lightgallery | 2.1.2 | June 4th 2021
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

var zoomSettings = {
    scale: 1,
    zoom: true,
    actualSize: true,
    showZoomInOutIcons: false,
    actualSizeIcons: {
        zoomIn: 'lg-zoom-in',
        zoomOut: 'lg-zoom-out',
    },
    enableZoomAfter: 300,
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
};

var Zoom = /** @class */ (function () {
    function Zoom(instance, $LG) {
        // get lightGallery core plugin instance
        this.core = instance;
        this.$LG = $LG;
        this.settings = __assign(__assign({}, zoomSettings), this.core.settings);
        return this;
    }
    // Append Zoom controls. Actual size, Zoom-in, Zoom-out
    Zoom.prototype.buildTemplates = function () {
        var zoomIcons = this.settings.showZoomInOutIcons
            ? "<button id=\"" + this.core.getIdName('lg-zoom-in') + "\" type=\"button\" aria-label=\"Zoom in\" class=\"lg-zoom-in lg-icon\"></button><button id=\"" + this.core.getIdName('lg-zoom-out') + "\" type=\"button\" aria-label=\"Zoom out\" class=\"lg-zoom-out lg-icon\"></button>"
            : '';
        if (this.settings.actualSize) {
            zoomIcons += "<button id=\"" + this.core.getIdName('lg-actual-size') + "\" type=\"button\" aria-label=\"View actual size\" class=\"" + this.settings.actualSizeIcons.zoomIn + " lg-icon\"></button>";
        }
        this.core.outer.addClass('lg-use-transition-for-zoom');
        this.core.$toolbar.first().append(zoomIcons);
    };
    /**
     * @desc Enable zoom option only once the image is completely loaded
     * If zoomFromOrigin is true, Zoom is enabled once the dummy image has been inserted
     *
     * Zoom styles are defined under lg-zoomable CSS class.
     */
    Zoom.prototype.enableZoom = function (event) {
        var _this = this;
        // delay will be 0 except first time
        var _speed = this.settings.enableZoomAfter + event.detail.delay;
        // set _speed value 0 if gallery opened from direct url and if it is first slide
        if (this.$LG('body').first().hasClass('lg-from-hash') &&
            event.detail.delay) {
            // will execute only once
            _speed = 0;
        }
        else {
            // Remove lg-from-hash to enable starting animation.
            this.$LG('body').first().removeClass('lg-from-hash');
        }
        this.zoomableTimeout = setTimeout(function () {
            _this.core.getSlideItem(event.detail.index).addClass('lg-zoomable');
        }, _speed + 30);
    };
    Zoom.prototype.enableZoomOnSlideItemLoad = function () {
        // Add zoomable class
        this.core.LGel.on(lGEvents.slideItemLoad + ".zoom", this.enableZoom.bind(this));
    };
    Zoom.prototype.getModifier = function (rotateValue, axis, el) {
        var originalRotate = rotateValue;
        rotateValue = Math.abs(rotateValue);
        var transformValues = this.getCurrentTransform(el);
        if (!transformValues) {
            return 1;
        }
        var modifier = 1;
        if (axis === 'X') {
            var flipHorizontalValue = Math.sign(parseFloat(transformValues[0]));
            if (rotateValue === 0 || rotateValue === 180) {
                modifier = 1;
            }
            else if (rotateValue === 90) {
                if ((originalRotate === -90 && flipHorizontalValue === 1) ||
                    (originalRotate === 90 && flipHorizontalValue === -1)) {
                    modifier = -1;
                }
                else {
                    modifier = 1;
                }
            }
            modifier = modifier * flipHorizontalValue;
        }
        else {
            var flipVerticalValue = Math.sign(parseFloat(transformValues[3]));
            if (rotateValue === 0 || rotateValue === 180) {
                modifier = 1;
            }
            else if (rotateValue === 90) {
                var sinX = parseFloat(transformValues[1]);
                var sinMinusX = parseFloat(transformValues[2]);
                modifier = Math.sign(sinX * sinMinusX * originalRotate * flipVerticalValue);
            }
            modifier = modifier * flipVerticalValue;
        }
        return modifier;
    };
    Zoom.prototype.getImageSize = function ($image, rotateValue, axis) {
        var imageSizes = {
            y: 'offsetHeight',
            x: 'offsetWidth',
        };
        if (rotateValue === 90) {
            // Swap axis
            if (axis === 'x') {
                axis = 'y';
            }
            else {
                axis = 'x';
            }
        }
        return $image[imageSizes[axis]];
    };
    Zoom.prototype.getDragCords = function (e, rotateValue) {
        if (rotateValue === 90) {
            return {
                x: e.pageY,
                y: e.pageX,
            };
        }
        else {
            return {
                x: e.pageX,
                y: e.pageY,
            };
        }
    };
    Zoom.prototype.getSwipeCords = function (e, rotateValue) {
        var x = e.targetTouches[0].pageX;
        var y = e.targetTouches[0].pageY;
        if (rotateValue === 90) {
            return {
                x: y,
                y: x,
            };
        }
        else {
            return {
                x: x,
                y: y,
            };
        }
    };
    Zoom.prototype.getDragAllowedAxises = function ($image, rotateValue) {
        var $lg = this.core.$lgContent.get();
        var scale = parseFloat($image.attr('data-scale')) || 1;
        var imgEl = $image.get();
        var allowY = this.getImageSize(imgEl, rotateValue, 'y') * scale >
            $lg.clientHeight;
        var allowX = this.getImageSize(imgEl, rotateValue, 'x') * scale >
            $lg.clientWidth;
        if (rotateValue === 90) {
            return {
                allowX: allowY,
                allowY: allowX,
            };
        }
        else {
            return {
                allowX: allowX,
                allowY: allowY,
            };
        }
    };
    /**
     *
     * @param {Element} el
     * @return matrix(cos(X), sin(X), -sin(X), cos(X), 0, 0);
     * Get the current transform value
     */
    Zoom.prototype.getCurrentTransform = function (el) {
        if (!el) {
            return;
        }
        var st = window.getComputedStyle(el, null);
        var tm = st.getPropertyValue('-webkit-transform') ||
            st.getPropertyValue('-moz-transform') ||
            st.getPropertyValue('-ms-transform') ||
            st.getPropertyValue('-o-transform') ||
            st.getPropertyValue('transform') ||
            'none';
        if (tm !== 'none') {
            return tm.split('(')[1].split(')')[0].split(',');
        }
        return;
    };
    Zoom.prototype.getCurrentRotation = function (el) {
        if (!el) {
            return 0;
        }
        var values = this.getCurrentTransform(el);
        if (values) {
            return Math.round(Math.atan2(parseFloat(values[1]), parseFloat(values[0])) *
                (180 / Math.PI));
            // If you want rotate in 360
            //return (angle < 0 ? angle + 360 : angle);
        }
        return 0;
    };
    /**
     * @desc Image zoom
     * Translate the wrap and scale the image to get better user experience
     *
     * @param {String} scale - Zoom decrement/increment value
     */
    Zoom.prototype.zoomImage = function (scale) {
        var $image = this.core
            .getSlideItem(this.core.index)
            .find('.lg-image')
            .first();
        var imageNode = $image.get();
        if (!imageNode)
            return;
        var containerRect = this.core.outer.get().getBoundingClientRect();
        // Find offset manually to avoid issue after zoom
        var offsetX = (containerRect.width - imageNode.offsetWidth) / 2 +
            containerRect.left;
        var offsetY = (containerRect.height - imageNode.offsetHeight) / 2 +
            this.$LG(window).scrollTop() +
            containerRect.top;
        var originalX;
        var originalY;
        if (scale === 1) {
            this.positionChanged = false;
        }
        if (this.positionChanged) {
            originalX =
                parseFloat($image.parent().attr('data-x')) /
                    (parseFloat($image.attr('data-scale')) - 1);
            originalY =
                parseFloat($image.parent().attr('data-y')) /
                    (parseFloat($image.attr('data-scale')) - 1);
            this.pageX = originalX + offsetX;
            this.pageY = originalY + offsetY;
            this.positionChanged = false;
        }
        var _x = this.pageX - offsetX;
        var _y = this.pageY - offsetY;
        var x = (scale - 1) * _x;
        var y = (scale - 1) * _y;
        this.setZoomStyles({
            x: x,
            y: y,
            scale: scale,
        });
    };
    /**
     * @desc apply scale3d to image and translate to image wrap
     * @param {style} X,Y and scale
     */
    Zoom.prototype.setZoomStyles = function (style) {
        var $image = this.core
            .getSlideItem(this.core.index)
            .find('.lg-image')
            .first();
        var $dummyImage = this.core.outer
            .find('.lg-current .lg-dummy-img')
            .first();
        var $imageWrap = $image.parent();
        $image
            .attr('data-scale', style.scale + '')
            .css('transform', 'scale3d(' + style.scale + ', ' + style.scale + ', 1)');
        $dummyImage.css('transform', 'scale3d(' + style.scale + ', ' + style.scale + ', 1)');
        var transform = 'translate3d(-' + style.x + 'px, -' + style.y + 'px, 0)';
        $imageWrap.css('transform', transform);
        $imageWrap.attr('data-x', style.x).attr('data-y', style.y);
    };
    /**
     * @param index - Index of the current slide
     * @param event - event will be available only if the function is called on clicking/taping the imags
     */
    Zoom.prototype.setActualSize = function (index, event) {
        var _this = this;
        var currentItem = this.core.galleryItems[this.core.index];
        // Allow zoom only on image
        if (!currentItem.src ||
            this.core.outer.hasClass('lg-first-slide-loading')) {
            return;
        }
        var scale = this.getCurrentImageActualSizeScale();
        if (this.core.outer.hasClass('lg-zoomed')) {
            this.scale = 1;
        }
        else {
            this.scale = this.getScale(scale);
        }
        this.setPageCords(event);
        this.beginZoom(this.scale);
        this.zoomImage(this.scale);
        setTimeout(function () {
            _this.core.outer.removeClass('lg-grabbing').addClass('lg-grab');
        }, 10);
    };
    Zoom.prototype.getNaturalWidth = function (index) {
        var $image = this.core.getSlideItem(index).find('.lg-image').first();
        var naturalWidth = this.core.galleryItems[index].width;
        return naturalWidth
            ? parseFloat(naturalWidth)
            : $image.get().naturalWidth;
    };
    Zoom.prototype.getActualSizeScale = function (naturalWidth, width) {
        var _scale;
        var scale;
        if (naturalWidth > width) {
            _scale = naturalWidth / width;
            scale = _scale || 2;
        }
        else {
            scale = 1;
        }
        return scale;
    };
    Zoom.prototype.getCurrentImageActualSizeScale = function () {
        var $image = this.core
            .getSlideItem(this.core.index)
            .find('.lg-image')
            .first();
        var width = $image.get().offsetWidth;
        var naturalWidth = this.getNaturalWidth(this.core.index) || width;
        return this.getActualSizeScale(naturalWidth, width);
    };
    Zoom.prototype.getPageCords = function (event) {
        var cords = {};
        if (event) {
            cords.x = event.pageX || event.targetTouches[0].pageX;
            cords.y = event.pageY || event.targetTouches[0].pageY;
        }
        else {
            var containerRect = this.core.outer.get().getBoundingClientRect();
            cords.x = containerRect.width / 2 + containerRect.left;
            cords.y =
                containerRect.height / 2 +
                    this.$LG(window).scrollTop() +
                    containerRect.top;
        }
        return cords;
    };
    Zoom.prototype.setPageCords = function (event) {
        var pageCords = this.getPageCords(event);
        this.pageX = pageCords.x;
        this.pageY = pageCords.y;
    };
    // If true, zoomed - in else zoomed out
    Zoom.prototype.beginZoom = function (scale) {
        this.core.outer.removeClass('lg-zoom-drag-transition lg-zoom-dragging');
        if (scale > 1) {
            this.core.outer.addClass('lg-zoomed');
            var $actualSize = this.core.getElementById('lg-actual-size');
            $actualSize
                .removeClass(this.settings.actualSizeIcons.zoomIn)
                .addClass(this.settings.actualSizeIcons.zoomOut);
        }
        else {
            this.resetZoom();
        }
        return scale > 1;
    };
    Zoom.prototype.getScale = function (scale) {
        var actualSizeScale = this.getCurrentImageActualSizeScale();
        if (scale < 1) {
            scale = 1;
        }
        else if (scale > actualSizeScale) {
            scale = actualSizeScale;
        }
        return scale;
    };
    Zoom.prototype.init = function () {
        var _this = this;
        if (!this.settings.zoom) {
            return;
        }
        this.buildTemplates();
        this.enableZoomOnSlideItemLoad();
        var tapped = null;
        this.core.outer.on('dblclick.lg', function (event) {
            if (!_this.$LG(event.target).hasClass('lg-image')) {
                return;
            }
            _this.setActualSize(_this.core.index, event);
        });
        this.core.outer.on('touchstart.lg', function (event) {
            var $target = _this.$LG(event.target);
            if (event.targetTouches.length === 1 &&
                $target.hasClass('lg-image')) {
                if (!tapped) {
                    tapped = setTimeout(function () {
                        tapped = null;
                    }, 300);
                }
                else {
                    clearTimeout(tapped);
                    tapped = null;
                    _this.setActualSize(_this.core.index, event);
                }
                event.preventDefault();
            }
        });
        // Update zoom on resize and orientationchange
        this.core.LGel.on(lGEvents.containerResize + ".zoom", function () {
            if (!_this.core.lgOpened)
                return;
            _this.setPageCords();
            _this.zoomImage(_this.scale);
        });
        this.core.getElementById('lg-zoom-out').on('click.lg', function () {
            if (_this.core.outer.find('.lg-current .lg-image').get()) {
                _this.scale -= _this.settings.scale;
                _this.scale = _this.getScale(_this.scale);
                _this.beginZoom(_this.scale);
                _this.zoomImage(_this.scale);
            }
        });
        this.core.getElementById('lg-zoom-in').on('click.lg', function () {
            _this.zoomIn();
        });
        this.core.getElementById('lg-actual-size').on('click.lg', function () {
            _this.setActualSize(_this.core.index);
        });
        this.core.LGel.on(lGEvents.beforeOpen + ".zoom", function () {
            _this.core.outer.find('.lg-item').removeClass('lg-zoomable');
        });
        // Reset zoom on slide change
        this.core.LGel.on(lGEvents.afterSlide + ".zoom", function (event) {
            var prevIndex = event.detail.prevIndex;
            _this.scale = 1;
            _this.resetZoom(prevIndex);
        });
        // Drag option after zoom
        this.zoomDrag();
        this.pinchZoom();
        this.zoomSwipe();
        // Store the zoomable timeout value just to clear it while closing
        this.zoomableTimeout = false;
        this.positionChanged = false;
        // Set the initial value center
        this.pageX = this.core.outer.width() / 2;
        this.pageY =
            this.core.outer.height() / 2 + this.$LG(window).scrollTop();
        this.scale = 1;
    };
    Zoom.prototype.zoomIn = function (scale) {
        var currentItem = this.core.galleryItems[this.core.index];
        // Allow zoom only on image
        if (!currentItem.src) {
            return;
        }
        if (scale) {
            this.scale = scale;
        }
        else {
            this.scale += this.settings.scale;
        }
        this.scale = this.getScale(this.scale);
        this.beginZoom(this.scale);
        this.zoomImage(this.scale);
    };
    // Reset zoom effect
    Zoom.prototype.resetZoom = function (index) {
        this.core.outer.removeClass('lg-zoomed lg-zoom-drag-transition');
        var $actualSize = this.core.getElementById('lg-actual-size');
        var $item = this.core.getSlideItem(index !== undefined ? index : this.core.index);
        $actualSize
            .removeClass(this.settings.actualSizeIcons.zoomOut)
            .addClass(this.settings.actualSizeIcons.zoomIn);
        $item.find('.lg-img-wrap').first().removeAttr('style data-x data-y');
        $item.find('.lg-image').first().removeAttr('style data-scale');
        // Reset pagx pagy values to center
        this.setPageCords();
    };
    Zoom.prototype.getTouchDistance = function (e) {
        return Math.sqrt((e.targetTouches[0].pageX - e.targetTouches[1].pageX) *
            (e.targetTouches[0].pageX - e.targetTouches[1].pageX) +
            (e.targetTouches[0].pageY - e.targetTouches[1].pageY) *
                (e.targetTouches[0].pageY - e.targetTouches[1].pageY));
    };
    Zoom.prototype.pinchZoom = function () {
        var _this = this;
        var startDist = 0;
        var pinchStarted = false;
        var initScale = 1;
        var $item = this.core.getSlideItem(this.core.index);
        this.core.$inner.on('touchstart.lg', function (e) {
            $item = _this.core.getSlideItem(_this.core.index);
            e.preventDefault();
            if (e.targetTouches.length === 2 &&
                (_this.$LG(e.target).hasClass('lg-item') ||
                    $item.get().contains(e.target))) {
                initScale = _this.scale || 1;
                _this.core.outer.removeClass('lg-zoom-drag-transition lg-zoom-dragging');
                _this.core.touchAction = 'pinch';
                startDist = _this.getTouchDistance(e);
            }
        });
        this.core.$inner.on('touchmove.lg', function (e) {
            e.preventDefault();
            if (e.targetTouches.length === 2 &&
                _this.core.touchAction === 'pinch' &&
                (_this.$LG(e.target).hasClass('lg-item') ||
                    $item.get().contains(e.target))) {
                var endDist = _this.getTouchDistance(e);
                var distance = startDist - endDist;
                if (!pinchStarted && Math.abs(distance) > 5) {
                    pinchStarted = true;
                }
                if (pinchStarted) {
                    _this.scale = Math.max(1, initScale + -distance * 0.008);
                    _this.zoomImage(_this.scale);
                }
            }
        });
        this.core.$inner.on('touchend.lg', function (e) {
            if (_this.core.touchAction === 'pinch' &&
                (_this.$LG(e.target).hasClass('lg-item') ||
                    $item.get().contains(e.target))) {
                pinchStarted = false;
                startDist = 0;
                if (_this.scale <= 1) {
                    _this.resetZoom();
                }
                else {
                    _this.scale = _this.getScale(_this.scale);
                    _this.zoomImage(_this.scale);
                    _this.core.outer.addClass('lg-zoomed');
                }
                _this.core.touchAction = undefined;
            }
        });
    };
    Zoom.prototype.touchendZoom = function (startCoords, endCoords, allowX, allowY, touchDuration, rotateValue) {
        var rotateEl = this.core
            .getSlideItem(this.core.index)
            .find('.lg-img-rotate')
            .first()
            .get();
        var distanceXnew = endCoords.x - startCoords.x;
        var distanceYnew = endCoords.y - startCoords.y;
        var speedX = Math.abs(distanceXnew) / touchDuration + 1;
        var speedY = Math.abs(distanceYnew) / touchDuration + 1;
        if (speedX > 2) {
            speedX += 1;
        }
        if (speedY > 2) {
            speedY += 1;
        }
        distanceXnew = distanceXnew * speedX;
        distanceYnew = distanceYnew * speedY;
        var _LGel = this.core
            .getSlideItem(this.core.index)
            .find('.lg-img-wrap')
            .first();
        var $image = this.core
            .getSlideItem(this.core.index)
            .find('.lg-object')
            .first();
        var dataX = parseFloat(_LGel.attr('data-x')) || 0;
        var dataY = parseFloat(_LGel.attr('data-y')) || 0;
        var distance = {};
        distance.x =
            -Math.abs(dataX) +
                distanceXnew * this.getModifier(rotateValue, 'X', rotateEl);
        distance.y =
            -Math.abs(dataY) +
                distanceYnew * this.getModifier(rotateValue, 'Y', rotateEl);
        var possibleSwipeCords = this.getPossibleSwipeDragCords($image, rotateValue);
        if (Math.abs(distanceXnew) > 15 || Math.abs(distanceYnew) > 15) {
            if (allowY) {
                if (distance.y <= -possibleSwipeCords.maxY) {
                    distance.y = -possibleSwipeCords.maxY;
                }
                else if (distance.y >= -possibleSwipeCords.minY) {
                    distance.y = -possibleSwipeCords.minY;
                }
            }
            if (allowX) {
                if (distance.x <= -possibleSwipeCords.maxX) {
                    distance.x = -possibleSwipeCords.maxX;
                }
                else if (distance.x >= -possibleSwipeCords.minX) {
                    distance.x = -possibleSwipeCords.minX;
                }
            }
            if (allowY) {
                _LGel.attr('data-y', Math.abs(distance.y));
            }
            else {
                var dataY_1 = parseFloat(_LGel.attr('data-y')) || 0;
                distance.y = -Math.abs(dataY_1);
            }
            if (allowX) {
                _LGel.attr('data-x', Math.abs(distance.x));
            }
            else {
                var dataX_1 = parseFloat(_LGel.attr('data-x')) || 0;
                distance.x = -Math.abs(dataX_1);
            }
            this.setZoomSwipeStyles(_LGel, distance);
            this.positionChanged = true;
        }
    };
    Zoom.prototype.getZoomSwipeCords = function (startCoords, endCoords, allowX, allowY, possibleSwipeCords, dataY, dataX, rotateValue, rotateEl) {
        var distance = {};
        if (allowY) {
            distance.y =
                -Math.abs(dataY) +
                    (endCoords.y - startCoords.y) *
                        this.getModifier(rotateValue, 'Y', rotateEl);
            if (distance.y <= -possibleSwipeCords.maxY) {
                var diffMaxY = -possibleSwipeCords.maxY - distance.y;
                distance.y = -possibleSwipeCords.maxY - diffMaxY / 6;
            }
            else if (distance.y >= -possibleSwipeCords.minY) {
                var diffMinY = distance.y - -possibleSwipeCords.minY;
                distance.y = -possibleSwipeCords.minY + diffMinY / 6;
            }
        }
        else {
            distance.y = -Math.abs(dataY);
        }
        if (allowX) {
            distance.x =
                -Math.abs(dataX) +
                    (endCoords.x - startCoords.x) *
                        this.getModifier(rotateValue, 'X', rotateEl);
            if (distance.x <= -possibleSwipeCords.maxX) {
                var diffMaxX = -possibleSwipeCords.maxX - distance.x;
                distance.x = -possibleSwipeCords.maxX - diffMaxX / 6;
            }
            else if (distance.x >= -possibleSwipeCords.minX) {
                var diffMinX = distance.x - -possibleSwipeCords.minX;
                distance.x = -possibleSwipeCords.minX + diffMinX / 6;
            }
        }
        else {
            distance.x = -Math.abs(dataX);
        }
        return distance;
    };
    Zoom.prototype.getPossibleSwipeDragCords = function ($image, rotateValue) {
        var $cont = this.core.$lgContent;
        var contHeight = $cont.height();
        var contWidth = $cont.width();
        var imageYSize = this.getImageSize($image.get(), rotateValue, 'y');
        var imageXSize = this.getImageSize($image.get(), rotateValue, 'x');
        var dataY = parseFloat($image.attr('data-scale')) || 1;
        var elDataScale = Math.abs(dataY);
        var minY = (contHeight - imageYSize) / 2;
        var maxY = Math.abs(imageYSize * elDataScale - contHeight + minY);
        var minX = (contWidth - imageXSize) / 2;
        var maxX = Math.abs(imageXSize * elDataScale - contWidth + minX);
        if (rotateValue === 90) {
            return {
                minY: minX,
                maxY: maxX,
                minX: minY,
                maxX: maxY,
            };
        }
        else {
            return {
                minY: minY,
                maxY: maxY,
                minX: minX,
                maxX: maxX,
            };
        }
    };
    Zoom.prototype.setZoomSwipeStyles = function (LGel, distance) {
        LGel.css('transform', 'translate3d(' + distance.x + 'px, ' + distance.y + 'px, 0)');
    };
    Zoom.prototype.zoomSwipe = function () {
        var _this = this;
        var startCoords = {};
        var endCoords = {};
        var isMoved = false;
        // Allow x direction drag
        var allowX = false;
        // Allow Y direction drag
        var allowY = false;
        var startTime = new Date();
        var endTime = new Date();
        var dataX = 0;
        var dataY = 0;
        var possibleSwipeCords;
        var _LGel;
        var rotateEl = null;
        var rotateValue = 0;
        var $item = this.core.getSlideItem(this.core.index);
        this.core.$inner.on('touchstart.lg', function (e) {
            e.preventDefault();
            var currentItem = _this.core.galleryItems[_this.core.index];
            // Allow zoom only on image
            if (!currentItem.src) {
                return;
            }
            $item = _this.core.getSlideItem(_this.core.index);
            if ((_this.$LG(e.target).hasClass('lg-item') ||
                $item.get().contains(e.target)) &&
                e.targetTouches.length === 1 &&
                _this.core.outer.hasClass('lg-zoomed')) {
                startTime = new Date();
                _this.core.touchAction = 'zoomSwipe';
                var $image = _this.core
                    .getSlideItem(_this.core.index)
                    .find('.lg-object')
                    .first();
                _LGel = _this.core
                    .getSlideItem(_this.core.index)
                    .find('.lg-img-wrap')
                    .first();
                rotateEl = _this.core
                    .getSlideItem(_this.core.index)
                    .find('.lg-img-rotate')
                    .first()
                    .get();
                rotateValue = _this.getCurrentRotation(rotateEl);
                var dragAllowedAxises = _this.getDragAllowedAxises($image, Math.abs(rotateValue));
                allowY = dragAllowedAxises.allowY;
                allowX = dragAllowedAxises.allowX;
                if (allowX || allowY) {
                    startCoords = _this.getSwipeCords(e, Math.abs(rotateValue));
                }
                dataY = parseFloat(_LGel.attr('data-y'));
                dataX = parseFloat(_LGel.attr('data-x'));
                possibleSwipeCords = _this.getPossibleSwipeDragCords($image, rotateValue);
                // reset opacity and transition duration
                _this.core.outer.addClass('lg-zoom-dragging lg-zoom-drag-transition');
            }
        });
        this.core.$inner.on('touchmove.lg', function (e) {
            e.preventDefault();
            if (e.targetTouches.length === 1 &&
                _this.core.touchAction === 'zoomSwipe' &&
                (_this.$LG(e.target).hasClass('lg-item') ||
                    $item.get().contains(e.target))) {
                _this.core.touchAction = 'zoomSwipe';
                endCoords = _this.getSwipeCords(e, Math.abs(rotateValue));
                var distance = _this.getZoomSwipeCords(startCoords, endCoords, allowX, allowY, possibleSwipeCords, dataY, dataX, rotateValue, rotateEl);
                if (Math.abs(endCoords.x - startCoords.x) > 15 ||
                    Math.abs(endCoords.y - startCoords.y) > 15) {
                    isMoved = true;
                    _this.setZoomSwipeStyles(_LGel, distance);
                }
            }
        });
        this.core.$inner.on('touchend.lg', function (e) {
            if (_this.core.touchAction === 'zoomSwipe' &&
                (_this.$LG(e.target).hasClass('lg-item') ||
                    $item.get().contains(e.target))) {
                _this.core.touchAction = undefined;
                _this.core.outer.removeClass('lg-zoom-dragging');
                if (!isMoved) {
                    return;
                }
                isMoved = false;
                endTime = new Date();
                var touchDuration = endTime.valueOf() - startTime.valueOf();
                _this.touchendZoom(startCoords, endCoords, allowX, allowY, touchDuration, rotateValue);
            }
        });
    };
    Zoom.prototype.zoomDrag = function () {
        var _this = this;
        var startCoords = {};
        var endCoords = {};
        var isDragging = false;
        var isMoved = false;
        var rotateEl = null;
        var rotateValue = 0;
        // Allow x direction drag
        var allowX = false;
        // Allow Y direction drag
        var allowY = false;
        var startTime;
        var endTime;
        var possibleSwipeCords;
        var dataY;
        var dataX;
        var _LGel;
        this.core.outer.on('mousedown.lg.zoom', function (e) {
            var currentItem = _this.core.galleryItems[_this.core.index];
            // Allow zoom only on image
            if (!currentItem.src) {
                return;
            }
            var $item = _this.core.getSlideItem(_this.core.index);
            if (_this.$LG(e.target).hasClass('lg-item') ||
                $item.get().contains(e.target)) {
                startTime = new Date();
                // execute only on .lg-object
                var $image = _this.core
                    .getSlideItem(_this.core.index)
                    .find('.lg-object')
                    .first();
                _LGel = _this.core
                    .getSlideItem(_this.core.index)
                    .find('.lg-img-wrap')
                    .first();
                rotateEl = _this.core
                    .getSlideItem(_this.core.index)
                    .find('.lg-img-rotate')
                    .get();
                rotateValue = _this.getCurrentRotation(rotateEl);
                var dragAllowedAxises = _this.getDragAllowedAxises($image, Math.abs(rotateValue));
                allowY = dragAllowedAxises.allowY;
                allowX = dragAllowedAxises.allowX;
                if (_this.core.outer.hasClass('lg-zoomed')) {
                    if (_this.$LG(e.target).hasClass('lg-object') &&
                        (allowX || allowY)) {
                        e.preventDefault();
                        startCoords = _this.getDragCords(e, Math.abs(rotateValue));
                        possibleSwipeCords = _this.getPossibleSwipeDragCords($image, rotateValue);
                        isDragging = true;
                        dataY = parseFloat(_LGel.attr('data-y'));
                        dataX = parseFloat(_LGel.attr('data-x'));
                        // ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
                        _this.core.outer.get().scrollLeft += 1;
                        _this.core.outer.get().scrollLeft -= 1;
                        _this.core.outer
                            .removeClass('lg-grab')
                            .addClass('lg-grabbing lg-zoom-drag-transition lg-zoom-dragging');
                        // reset opacity and transition duration
                    }
                }
            }
        });
        this.$LG(window).on("mousemove.lg.zoom.global" + this.core.lgId, function (e) {
            if (isDragging) {
                isMoved = true;
                endCoords = _this.getDragCords(e, Math.abs(rotateValue));
                var distance = _this.getZoomSwipeCords(startCoords, endCoords, allowX, allowY, possibleSwipeCords, dataY, dataX, rotateValue, rotateEl);
                _this.setZoomSwipeStyles(_LGel, distance);
            }
        });
        this.$LG(window).on("mouseup.lg.zoom.global" + this.core.lgId, function (e) {
            if (isDragging) {
                endTime = new Date();
                isDragging = false;
                _this.core.outer.removeClass('lg-zoom-dragging');
                // Fix for chrome mouse move on click
                if (isMoved &&
                    (startCoords.x !== endCoords.x ||
                        startCoords.y !== endCoords.y)) {
                    endCoords = _this.getDragCords(e, Math.abs(rotateValue));
                    var touchDuration = endTime.valueOf() - startTime.valueOf();
                    _this.touchendZoom(startCoords, endCoords, allowX, allowY, touchDuration, rotateValue);
                }
                isMoved = false;
            }
            _this.core.outer.removeClass('lg-grabbing').addClass('lg-grab');
        });
    };
    Zoom.prototype.closeGallery = function () {
        this.resetZoom();
    };
    Zoom.prototype.destroy = function () {
        // Unbind all events added by lightGallery zoom plugin
        this.$LG(window).off(".lg.zoom.global" + this.core.lgId);
        this.core.LGel.off('.lg.zoom');
        this.core.LGel.off('.zoom');
        clearTimeout(this.zoomableTimeout);
        this.zoomableTimeout = false;
    };
    return Zoom;
}());

export default Zoom;
//# sourceMappingURL=lg-zoom.es5.js.map
