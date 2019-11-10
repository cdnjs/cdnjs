/*!
 * ZUI: 图片裁剪工具 - v1.5.0 - 2016-09-06
 * http://zui.sexy
 * GitHub: https://github.com/easysoft/zui.git 
 * Copyright (c) 2016 cnezsoft.com; Licensed MIT
 */

/* ========================================================================
 * ZUI: img-cutter.js
 * http://zui.sexy
 * ========================================================================
 * Copyright (c) 2014-2016 cnezsoft.com; Licensed MIT
 * ======================================================================== */


(function($, Math, undefined) {
    'use strict';

    if(!$.fn.draggable) console.error('img-cutter requires draggable.js');
    if(!$.zui.imgReady) console.error('img-cutter requires image.ready.js');

    var NAME = 'zui.imgCutter';

    var ImgCutter = function(element, options) {
        this.$ = $(element);
        this.initOptions(options);
        this.init();
    };

    ImgCutter.DEFAULTS = {
        coverColor: '#000',
        coverOpacity: 0.6,
        // fixedRatio: false,
        defaultWidth: 128,
        defaultHeight: 128,
        minWidth: 48,
        minHeight: 48
    }; // default options

    ImgCutter.prototype.callEvent = function(name, params) {
        var result = this.$.callEvent(name + '.' + this.name, params, this);
        return !(result.result !== undefined && (!result.result));
    };

    ImgCutter.prototype.initOptions = function(options) {
        this.options = $.extend({}, ImgCutter.DEFAULTS, this.$.data(), options);
        this.options.coverOpacityIE = this.options.coverOpacity * 100;
        this.clipWidth = this.options.defaultWidth;
        this.clipHeight = this.options.defaultHeight;
    };

    ImgCutter.prototype.init = function() {
        this.initDom();
        this.initSize();
        this.bindEvents();
    };

    ImgCutter.prototype.initDom = function() {
        this.$canvas = this.$.children('.canvas');
        this.$img = this.$canvas.children('img');
        this.$actions = this.$.children('.actions');
        this.$btn = this.$.find('.img-cutter-submit');
        this.$preview = this.$.find('.img-cutter-preview');

        this.options.img = this.$img.attr('src');

        this.$canvas.append('<div class="cover" style="background: {coverColor}; opacity: {coverOpacity}; filter:alpha(opacity={coverOpacityIE});"></div><div class="controller" style="width: {defaultWidth}px; height: {defaultHeight}px"><div class="control" data-direction="top"></div><div class="control" data-direction="right"></div><div class="control" data-direction="bottom"></div><div class="control" data-direction="left"></div><div class="control" data-direction="top-left"></div><div class="control" data-direction="top-right"></div><div class="control" data-direction="bottom-left"></div><div class="control" data-direction="bottom-right"></div></div><div class="cliper"><img src="{img}"/></div>'.format(this.options));

        this.$cover = this.$canvas.children('.cover');
        this.$controller = this.$canvas.children('.controller');
        this.$cliper = this.$canvas.children('.cliper');
        this.$chipImg = this.$cliper.children('img');

        if(this.options.fixedRatio) {
            this.$.addClass('fixed-ratio');
        }
    };

    ImgCutter.prototype.resetImage = function(img) {
        var that = this;
        that.options.img = img;
        that.$img.attr('src', img);
        that.$chipImg.attr('src', img);
        that.imgWidth = undefined;
        that.left = undefined;
        that.initSize();
    };

    ImgCutter.prototype.initSize = function() {
        var that = this;
        if(!that.imgWidth) {
            $.zui.imgReady(that.options.img, function() {
                that.imgWidth = this.width;
                that.imgHeight = this.height;
                that.callEvent('ready');
            });
        }


        var waitImgWidth = setInterval(function() {
            if(that.imgWidth) {
                clearInterval(waitImgWidth);

                that.width = Math.min(that.imgWidth, that.$.width());
                that.$canvas.css('width', this.width);
                that.$cliper.css('width', this.width);
                that.height = that.$canvas.height();

                if(that.left === undefined) {
                    that.left = Math.floor((that.width - that.$controller.width()) / 2);
                    that.top = Math.floor((that.height - that.$controller.height()) / 2);
                }

                that.refreshSize();
            }
        }, 0);
    };

    ImgCutter.prototype.refreshSize = function(ratioSide) {
        var options = this.options;

        this.clipWidth = Math.max(options.minWidth, Math.min(this.width, this.clipWidth));
        this.clipHeight = Math.max(options.minHeight, Math.min(this.height, this.clipHeight));

        if(options.fixedRatio) {
            if(ratioSide && ratioSide === 'height') {
                this.clipWidth = Math.max(options.minWidth, Math.min(this.width, this.clipHeight * options.defaultWidth / options.defaultHeight));
                this.clipHeight = this.clipWidth * options.defaultHeight / options.defaultWidth;
            } else {
                this.clipHeight = Math.max(options.minHeight, Math.min(this.height, this.clipWidth * options.defaultHeight / options.defaultWidth));
                this.clipWidth = this.clipHeight * options.defaultWidth / options.defaultHeight;
            }
        }

        this.left = Math.min(this.width - this.clipWidth, Math.max(0, this.left));
        this.top = Math.min(this.height - this.clipHeight, Math.max(0, this.top));
        this.right = this.left + this.clipWidth;
        this.bottom = this.top + this.clipHeight;

        this.$controller.css({
            left: this.left,
            top: this.top,
            width: this.clipWidth,
            height: this.clipHeight
        });
        this.$cliper.css('clip', 'rect({0}px {1}px {2}px {3}px'.format(this.top, this.left + this.clipWidth, this.top + this.clipHeight, this.left));


        this.callEvent('change', {
            top: this.top,
            left: this.left,
            bottom: this.bottom,
            right: this.right,
            width: this.clipWidth,
            height: this.clipHeight
        });
    };

    ImgCutter.prototype.getData = function() {
        var that = this;
        that.data = {
            originWidth: that.imgWidth,
            originHeight: that.imgHeight,
            scaleWidth: that.width,
            scaleHeight: that.height,
            width: that.right - that.left,
            height: that.bottom - that.top,
            left: that.left,
            top: that.top,
            right: that.right,
            bottom: that.bottom,
            scaled: that.imgWidth != that.width || that.imgHeight != that.height
        };
        return that.data;
    };

    ImgCutter.prototype.bindEvents = function() {
        var that = this,
            options = this.options;
        this.$.resize($.proxy(this.initSize, this));
        this.$btn.hover(function() {
            that.$.toggleClass('hover');
        }).click(function() {
            var data = that.getData();

            if(!that.callEvent('before', data)) return;

            var url = options.post || options.get || options.url || null;
            if(url !== null) {
                $.ajax({
                        type: options.post ? 'POST' : 'GET',
                        url: url,
                        data: data
                    })
                    .done(function(e) {
                        that.callEvent('done', e);
                    }).fail(function(e) {
                        that.callEvent('fail', e);
                    }).always(function(e) {
                        that.callEvent('always', e);
                    });
            }
        });

        this.$controller.draggable({
            move: false,
            container: this.$canvas,
            drag: function(e) {
                that.left += e.smallOffset.x;
                that.top += e.smallOffset.y;
                that.refreshSize();
            }
        });

        this.$controller.children('.control').draggable({
            move: false,
            container: this.$canvas,
            stopPropagation: true,
            drag: function(e) {
                var dr = e.element.data('direction');
                var offset = e.smallOffset;
                var ratioSide = false;

                switch(dr) {
                    case 'left':
                    case 'top-left':
                    case 'bottom-left':
                        that.left += offset.x;
                        that.left = Math.min(that.right - options.minWidth, Math.max(0, that.left));
                        that.clipWidth = that.right - that.left;
                        break;
                    case 'right':
                    case 'top-right':
                    case 'bottom-right':
                        that.clipWidth += offset.x;
                        that.clipWidth = Math.min(that.width - that.left, Math.max(options.minWidth, that.clipWidth));
                        break;
                }
                switch(dr) {
                    case 'top':
                    case 'top-left':
                    case 'top-right':
                        that.top += offset.y;
                        that.top = Math.min(that.bottom - options.minHeight, Math.max(0, that.top));
                        that.clipHeight = that.bottom - that.top;
                        ratioSide = true;
                        break;
                    case 'bottom':
                    case 'bottom-left':
                    case 'bottom-right':
                        that.clipHeight += offset.y;
                        that.clipHeight = Math.min(that.height - that.top, Math.max(options.minHeight, that.clipHeight));
                        ratioSide = true;
                        break;
                }

                that.refreshSize(ratioSide);
            }
        });
    };

    $.fn.imgCutter = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data(NAME);
            var options = typeof option == 'object' && option;

            if(!data) $this.data(NAME, (data = new ImgCutter(this, options)));

            if(typeof option == 'string') data[option]();
        });
    };

    $.fn.imgCutter.Constructor = ImgCutter;

    $(function() {
        $('[data-toggle="imgCutter"]').imgCutter();
    });
}(jQuery, Math, undefined));

