/*!
 * Cropper v0.5.0
 * https://github.com/fengyuanchen/cropper
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 */

(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as anonymous module.
        define(["jquery"], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
})(function ($) {

    "use strict";

    var $window = $(window),
        $document = $(document),

        // RegExps
        regexpDirection = /^(\+|\*|e|n|w|s|ne|nw|sw|se)$/i,
        regexpOption = /^(x|y|width|height)$/i,

        // Classes
        classHidden = "cropper-hidden",
        classInvisible = "cropper-invisible",

        // Events
        eventDragStart = "mousedown touchstart",
        eventDragMove = "mousemove touchmove",
        eventDragEnd = "mouseup mouseleave touchend touchleave",
        eventBuild = "build.cropper",
        eventBuilt = "built.cropper",
        eventRender = "render.cropper",
        eventResize = "resize.cropper",

        // Functions
        isNumber = function (n) {
            return typeof n === "number";
        },

        // Constructor
        Cropper = function (element, options) {
            this.$image = $(element);
            this.setDefaults(options);
            this.init();
        },

        // Others
        round = Math.round,
        min = Math.min,
        max = Math.max,
        abs = Math.abs,
        num = parseFloat;

    Cropper.prototype = {
        constructor: Cropper,

        setDefaults: function (options) {
            options = $.extend({}, Cropper.defaults, options);

            $.each(options, function (i, n) {
                switch (i) {
                    case "aspectRatio":
                        options[i] = abs(num(n)) || NaN; // 0 -> NaN
                        break;

                    case "minWidth":
                    case "minHeight":
                        options[i] = abs(num(n)) || 0; // NaN -> 0
                        break;

                    case "maxWidth":
                    case "maxHeight":
                        options[i] = abs(num(n)) || Infinity; // NaN -> Infinity
                        break;

                    // No default
                }
            });

            this.defaults = options;
        },

        init: function () {
            var _this = this,
                src = this.$image.attr("src"),
                $clone = $('<img src="' + src + '">'),
                image = {};

            this.$clone && this.$clone.remove();
            this.$clone = $clone;

            $clone.one("load", function () {
                image.naturalWidth = this.naturalWidth || $clone.width();
                image.naturalHeight = this.naturalHeight || $clone.height();
                image.aspectRatio = image.naturalWidth / image.naturalHeight;

                _this.active = true;
                _this.src = src;
                _this.image = image;
                _this.build();
            });

            // Hide and prepend the clone iamge to the document body (Don't append to).
            $clone.addClass(classInvisible).prependTo("body");
        },

        build: function () {
            var defaults = this.defaults,
                buildEvent,
                $cropper;

            if (this.built) {
                this.unbuild();
            }

            buildEvent = $.Event(eventBuild);
            this.$image.trigger(buildEvent);

            if (buildEvent.isDefaultPrevented()) {
                return;
            }

            // Create cropper elements
            this.$cropper = ($cropper = $(Cropper.template));

            // Hide the original image
            this.$image.addClass(classHidden);

            // Show and prepend the clone iamge to the cropper
            this.$clone.removeClass(classInvisible).prependTo($cropper);

            this.$container = this.$image.parent();
            this.$container.append($cropper);

            this.$modal = $cropper.find(".cropper-modal");
            this.$canvas = $cropper.find(".cropper-canvas");
            this.$dragger = $cropper.find(".cropper-dragger");
            this.$viewer = $cropper.find(".cropper-viewer");

            // Init default settings
            this.cropped = true;

            if (!defaults.autoCrop) {
                this.$dragger.addClass(classHidden);
                this.cropped = false;
            }

            this.$modal.toggleClass(classHidden, !defaults.modal);
            !defaults.dragCrop && this.$canvas.addClass(classHidden);
            !defaults.moveable && this.$dragger.find(".cropper-face").addClass(classHidden);
            !defaults.resizeable && this.$dragger.find(".cropper-line, .cropper-point").addClass(classHidden);

            this.$dragScope = defaults.multiple ? this.$cropper : $document;

            this.addListener();
            this.initPreview();

            this.built = true;
            this.update();
            this.$image.trigger(eventBuilt);
        },

        unbuild: function () {
            if (!this.built) {
                return;
            }

            this.built = false;
            this.removeListener();

            this.$preview.empty();
            this.$preview = null;

            this.$dragger = null;
            this.$canvas = null;
            this.$modal = null;
            this.$container = null;

            this.$cropper.remove();
            this.$cropper = null;
        },

        update: function (data) {
            this.initContainer();
            this.initCropper();
            this.initDragger();

            if (data) {
                this.setData(data, true);
            } else {
                this.setData(this.defaults.data);
            }
        },

        resize: function () {
            clearTimeout(this.resizing);
            this.resizing = setTimeout($.proxy(this.update, this, this.getData()), 200);
        },

        reset: function (deep) {
            if (!this.cropped) {
                return;
            }

            if (deep) {
                this.defaults.data = {};
            }

            this.dragger = this.cloneDragger();
            this.setData(this.defaults.data);
        },

        release: function () {
            if (!this.cropped) {
                return;
            }

            this.cropped = false;

            this.defaults.done({
                x: 0,
                y: 0,
                width: 0,
                height: 0
            });

            this.$dragger.addClass(classHidden);
        },

        destroy: function () {
            if (!this.active) {
                return;
            }

            this.unbuild();
            this.$image.removeClass(classHidden);
            this.$image.removeData("cropper");
            this.$image = null;
        },

        preview: function () {
            var cropper = this.cropper,
                dragger = this.dragger;

            this.$viewer.find("img").css({
                height: round(cropper.height),
                marginLeft: - round(dragger.left),
                marginTop: - round(dragger.top),
                width: round(cropper.width)
            });

            this.$preview.each(function () {
                var $this = $(this),
                    ratio = $this.width() / dragger.width,
                    styles = {
                        height: round(cropper.height * ratio),
                        marginLeft: - round(dragger.left * ratio),
                        marginTop: - round(dragger.top * ratio),
                        width: round(cropper.width * ratio)
                    };

                $this.find("img").css(styles);
            });
        },

        addListener: function () {
            var defaults = this.defaults;

            this.$image.on(eventBuild, defaults.build).on(eventBuilt, defaults.built).on(eventRender, defaults.render);

            this.$cropper.on(eventDragStart, $.proxy(this.dragstart, this));

            this.$dragScope.on(eventDragMove, $.proxy(this.dragmove, this)).on(eventDragEnd, $.proxy(this.dragend, this));

            $window.on(eventResize, $.proxy(this.resize, this));
        },

        removeListener: function () {
            var defaults = this.defaults;

            this.$image.off(eventBuild, defaults.build).off(eventBuilt, defaults.built).off(eventRender, defaults.render);

            this.$cropper.off(eventDragStart, this.dragstart);

            this.$dragScope.off(eventDragMove, this.dragmove).on(eventDragEnd, this.dragend);

            $window.off(eventResize, this.resize);
        },

        initPreview: function () {
            var img = '<img src="' + this.src + '">';

            this.$preview = $(this.defaults.preview);
            this.$preview.html(img);
            this.$viewer.html(img);
        },

        initContainer: function () {
            var $container = this.$container;

            this.container = {
                width: $container.width(),
                height: $container.height()
            };
        },

        initCropper: function () {
            var container = this.container,
                image = this.image,
                cropper;

            if (((image.naturalWidth * container.height / image.naturalHeight) - container.width) >= 0) {
                cropper = {
                    height: container.width / image.aspectRatio,
                    width: container.width,
                    left: 0
                };

                cropper.top = (container.height - cropper.height) / 2;
            } else {
                cropper = {
                    height: container.height,
                    width: container.height * image.aspectRatio,
                    top: 0
                };

                cropper.left = (container.width - cropper.width) / 2;
            }

            image.ratio = cropper.width / image.naturalWidth;
            image.height = cropper.height;
            image.width = cropper.width;

            this.$cropper.css({
                height: round(cropper.height),
                left: round(cropper.left),
                top: round(cropper.top),
                width: round(cropper.width)
            });

            this.cropper = cropper;
        },

        initDragger: function () {
            var defaults = this.defaults,
                cropper = this.cropper,
                // If not set, use the original aspect ratio of the image.
                aspectRatio = defaults.aspectRatio || this.image.aspectRatio,
                ratio = this.image.ratio,
                dragger;

            if (((cropper.height * aspectRatio) - cropper.width) >= 0) {
                dragger = {
                    height: cropper.width / aspectRatio,
                    width: cropper.width,
                    left: 0,
                    top: (cropper.height - (cropper.width / aspectRatio)) / 2,
                    maxWidth: cropper.width,
                    maxHeight: cropper.width / aspectRatio
                };
            } else {
                dragger = {
                    height: cropper.height,
                    width: cropper.height * aspectRatio,
                    left: (cropper.width - (cropper.height * aspectRatio)) / 2,
                    top: 0,
                    maxWidth: cropper.height * aspectRatio,
                    maxHeight: cropper.height
                };
            }

            dragger.minWidth = 0;
            dragger.minHeight = 0;

            if (defaults.aspectRatio) {
                if (isFinite(defaults.maxWidth)) {
                    dragger.maxWidth = min(dragger.maxWidth, defaults.maxWidth * ratio);
                    dragger.maxHeight = dragger.maxWidth / aspectRatio;
                } else if (isFinite(defaults.maxHeight)) {
                    dragger.maxHeight = min(dragger.maxHeight, defaults.maxHeight * ratio);
                    dragger.maxWidth = dragger.maxHeight * aspectRatio;
                }

                if (defaults.minWidth > 0) {
                    dragger.minWidth = max(0, defaults.minWidth * ratio);
                    dragger.minHeight = dragger.minWidth / aspectRatio;
                } else if (defaults.minHeight > 0) {
                    dragger.minHeight = max(0, defaults.minHeight * ratio);
                    dragger.minWidth = dragger.minHeight * aspectRatio;
                }
            } else {
                dragger.maxWidth = min(dragger.maxWidth, defaults.maxWidth * ratio);
                dragger.maxHeight = min(dragger.maxHeight, defaults.maxHeight * ratio);
                dragger.minWidth = max(0, defaults.minWidth * ratio);
                dragger.minHeight = max(0, defaults.minHeight * ratio);
            }

            // minWidth can't be greater than maxWidth, and minHeight too.
            dragger.minWidth = min(dragger.maxWidth, dragger.minWidth);
            dragger.minHeight = min(dragger.maxHeight, dragger.minHeight);

            // Center the dragger by default
            dragger.height *= 0.8;
            dragger.width *= 0.8;
            dragger.left = (cropper.width - dragger.width) / 2;
            dragger.top = (cropper.height - dragger.height) / 2;

            this.defaultDragger = dragger;
            this.dragger = this.cloneDragger();
            this.draggerLeft = dragger.left;
            this.draggerTop = dragger.top;
        },

        cloneDragger: function () {
            return $.extend({}, this.defaultDragger);
        },

        renderDragger: function () {
            var dragger = this.dragger,
                cropper = this.cropper,
                left = this.draggerLeft,
                top = this.draggerTop,
                maxLeft,
                maxTop,
                renderEvent;

            if (dragger.width > dragger.maxWidth) {
                dragger.width = dragger.maxWidth;
                dragger.left = left;
            } else if (dragger.width < dragger.minWidth) {
                dragger.width = dragger.minWidth;
                dragger.left = left;
            }

            if (dragger.height > dragger.maxHeight) {
                dragger.height = dragger.maxHeight;
                dragger.top = top;
            } else if (dragger.height < dragger.minHeight) {
                dragger.height = dragger.minHeight;
                dragger.top = top;
            }

            maxLeft = cropper.width - dragger.width;
            maxTop = cropper.height - dragger.height;
            dragger.left = dragger.left > maxLeft ? maxLeft : dragger.left < 0 ? 0 : dragger.left;
            dragger.top = dragger.top > maxTop ? maxTop : dragger.top < 0 ? 0 : dragger.top;

            // Trigger the render event
            renderEvent = $.Event(eventRender);
            this.$image.trigger(renderEvent);

            if (renderEvent.isDefaultPrevented()) {
                return;
            }

            // Re-render the dragger
            this.dragger = dragger;
            this.draggerLeft = dragger.left;
            this.draggerTop = dragger.top;
            this.defaults.done(this.getData());

            this.$dragger.css({
                height: round(dragger.height),
                left: round(dragger.left),
                top: round(dragger.top),
                width: round(dragger.width)
            });

            this.preview();
        },

        setData: function (data, once) {
            var cropper = this.cropper,
                dragger = this.dragger,
                aspectRatio = this.defaults.aspectRatio;

            if (!this.built || typeof data === "undefined") {
                return;
            }

            if (data === null || $.isEmptyObject(data)) {
                dragger = this.cloneDragger();
            }

            if ($.isPlainObject(data) && !$.isEmptyObject(data)) {

                if (!once) {
                    this.defaults.data = data;
                }

                data = this.transformData(data);

                if (isNumber(data.x) && data.x <= cropper.width) {
                    dragger.left = data.x;
                }

                if (isNumber(data.y) && data.y <= cropper.height) {
                    dragger.top = data.y;
                }

                if (aspectRatio) {
                    if (isNumber(data.width) && data.width <= dragger.maxWidth && data.width >= dragger.minWidth) {
                        dragger.width = data.width;
                        dragger.height = dragger.width / aspectRatio;
                    } else if (isNumber(data.height) && data.height <= dragger.maxHeight && data.height >= dragger.minHeight) {
                        dragger.height = data.height;
                        dragger.width = dragger.height * aspectRatio;
                    }
                } else {
                    if (isNumber(data.width) && data.width <= dragger.maxWidth && data.width >= dragger.minWidth) {
                        dragger.width = data.width;
                    }

                    if (isNumber(data.height) && data.height <= dragger.maxHeight && data.height >= dragger.minHeight) {
                        dragger.height = data.height;
                    }
                }
            }

            this.dragger = dragger;
            this.renderDragger();
        },

        getData: function () {
            var dragger = this.dragger,
                data = {};

            if (this.built) {
                data = {
                    x: dragger.left,
                    y: dragger.top,
                    width: dragger.width,
                    height: dragger.height
                };

                data = this.transformData(data, true);
            }

            return data;
        },

        transformData: function (data, reverse) {
            var ratio = this.image.ratio,
                result = {};

            $.each(data, function (i, n) {
                n = num(n);

                if (regexpOption.test(i) && !isNaN(n)) {
                    // Not round when set data.
                    result[i] = reverse ? round(n / ratio) : n * ratio;
                }
            });

            return result;
        },

        setAspectRatio: function (aspectRatio) {
            var freeRatio = aspectRatio === "auto";

            aspectRatio = num(aspectRatio);

            if (freeRatio || (!isNaN(aspectRatio) && aspectRatio > 0)) {
                this.defaults.aspectRatio = freeRatio ? NaN : aspectRatio;

                if (this.built) {
                    this.initDragger();
                    this.renderDragger();
                }
            }
        },

        setImgSrc: function (src) {
            if (src && src !== this.src) {
                this.$image.attr("src", src);
                this.init();
            }
        },

        getImgInfo: function () {
            return this.image || {};
        },

        dragstart: function (event) {
            var touches = (event.originalEvent || event).touches,
                e = event,
                direction;

            if (touches && touches.length === 1) {
                e = touches[0];
                this.touchId = e.identifier;
            }

            direction = $(e.target).data("direction");

            if (regexpDirection.test(direction)) {
                event.preventDefault();

                this.direction = direction;
                this.startX = e.pageX;
                this.startY = e.pageY;

                if (direction === "+") {
                    this.cropping = true;
                    this.$modal.removeClass(classHidden);
                }
            }
        },

        dragmove: function (event) {
            var touches = (event.originalEvent || event).changedTouches,
                e = event;

            if (touches && touches.length === 1) {
                e = touches[0];

                if (e.identifier !== this.touchId) {
                    return;
                }
            }

            if (this.direction) {
                event.preventDefault();

                this.endX = e.pageX;
                this.endY = e.pageY;
                this.dragging();
            }
        },

        dragend: function (event) {
            var touches = (event.originalEvent || event).changedTouches,
                e = event;

            if (touches && touches.length === 1) {
                e = touches[0];

                if (e.identifier !== this.touchId) {
                    return;
                }
            }

            if (this.direction) {
                event.preventDefault();

                if (this.cropping) {
                    this.cropping = false;
                    this.$modal.toggleClass(classHidden, !this.defaults.modal);
                }

                this.direction = "";
            }
        },

        dragging: function () {
            var direction = this.direction,
                dragger = this.dragger,
                width = dragger.width,
                height = dragger.height,
                left = dragger.left,
                top = dragger.top,
                aspectRatio = this.defaults.aspectRatio,
                range = {
                    x: this.endX - this.startX,
                    y: this.endY - this.startY
                },
                offset;

            if (aspectRatio) {
                range.X = range.y * aspectRatio;
                range.Y = range.x / aspectRatio;
            }

            switch (direction) {

                // cropping
                case "+":
                    if (range.x && range.y) {
                        offset = this.$cropper.offset();
                        left = this.startX - offset.left;
                        top = this.startY - offset.top;
                        width = dragger.minWidth;
                        height = dragger.minHeight;

                        if (range.x > 0) {
                            if (range.y > 0) {
                                direction = "se";
                            } else {
                                direction = "ne";
                                top -= height;
                            }
                        } else {
                            if (range.y > 0) {
                                direction = "sw";
                                left -= width;
                            } else {
                                direction = "nw";
                                left -= width;
                                top -= height;
                            }
                        }

                        // Show the dragger if is hidden
                        if (!this.cropped) {
                            this.cropped = true;
                            this.$dragger.removeClass(classHidden);
                        }
                    }

                    break;

                // moving
                case "*":
                    left += range.x;
                    top += range.y;

                    break;

                // resizing
                case "e":
                    width += range.x;

                    if (aspectRatio) {
                        height = width / aspectRatio;
                        top -= range.Y / 2;
                    }

                    if (width < 0) {
                        direction = "w";
                        width = 0;
                    }

                    break;

                case "n":
                    height -= range.y;
                    top += range.y;

                    if (aspectRatio) {
                        width = height * aspectRatio;
                        left += range.X / 2;
                    }

                    if (height < 0) {
                        direction = "s";
                        height = 0;
                    }

                    break;

                case "w":
                    width -= range.x;
                    left += range.x;

                    if (aspectRatio) {
                        height = width / aspectRatio;
                        top += range.Y / 2;
                    }

                    if (width < 0) {
                        direction = "e";
                        width = 0;
                    }

                    break;

                case "s":
                    height += range.y;

                    if (aspectRatio) {
                        width = height * aspectRatio;
                        left -= range.X / 2;
                    }

                    if (height < 0) {
                        direction = "n";
                        height = 0;
                    }

                    break;

                case "ne":
                    height -= range.y;
                    top += range.y;

                    if (aspectRatio) {
                        width = height * aspectRatio;
                    } else {
                        width += range.x;
                    }

                    if (height < 0) {
                        direction = "sw";
                        height = 0;
                        width = 0;
                    }

                    break;

                case "nw":
                    height -= range.y;
                    top += range.y;

                    if (aspectRatio) {
                        width = height * aspectRatio;
                        left += range.X;
                    } else {
                        width -= range.x;
                        left += range.x;
                    }

                    if (height < 0) {
                        direction = "se";
                        height = 0;
                        width = 0;
                    }

                    break;

                case "sw":
                    width -= range.x;
                    left += range.x;

                    if (aspectRatio) {
                        height = width / aspectRatio;
                    } else {
                        height += range.y;
                    }

                    if (width < 0) {
                        direction = "ne";
                        height = 0;
                        width = 0;
                    }

                    break;

                case "se":
                    width += range.x;

                    if (aspectRatio) {
                        height = width / aspectRatio;
                    } else {
                        height += range.y;
                    }

                    if (width < 0) {
                        direction = "nw";
                        height = 0;
                        width = 0;
                    }

                    break;

                // No default
            }

            dragger.width = width;
            dragger.height = height;
            dragger.left = left;
            dragger.top = top;
            this.direction = direction;

            this.renderDragger();

            // Override
            this.startX = this.endX;
            this.startY = this.endY;
        }
    };

    Cropper.template = (
        '<div class="cropper-container">' +
            '<div class="cropper-modal"></div>' +
            '<div class="cropper-canvas" data-direction="+"></div>' +
            '<div class="cropper-dragger">' +
                '<span class="cropper-viewer"></span>' +
                '<span class="cropper-dashed dashed-h"></span>' +
                '<span class="cropper-dashed dashed-v"></span>' +
                '<span class="cropper-face" data-direction="*"></span>' +
                '<span class="cropper-line line-e" data-direction="e"></span>' +
                '<span class="cropper-line line-n" data-direction="n"></span>' +
                '<span class="cropper-line line-w" data-direction="w"></span>' +
                '<span class="cropper-line line-s" data-direction="s"></span>' +
                '<span class="cropper-point point-e" data-direction="e"></span>' +
                '<span class="cropper-point point-n" data-direction="n"></span>' +
                '<span class="cropper-point point-w" data-direction="w"></span>' +
                '<span class="cropper-point point-s" data-direction="s"></span>' +
                '<span class="cropper-point point-ne" data-direction="ne"></span>' +
                '<span class="cropper-point point-nw" data-direction="nw"></span>' +
                '<span class="cropper-point point-sw" data-direction="sw"></span>' +
                '<span class="cropper-point point-se" data-direction="se"></span>' +
            '</div>' +
        '</div>'
    );

    Cropper.defaults = {
        // Basic
        aspectRatio: "auto",
        data: {}, // Allow options: x, y, width, height
        done: $.noop,
        multiple: false,
        // preview: undefined,

        // Toggles
        autoCrop: true,
        dragCrop: true,
        modal: true,
        moveable: true,
        resizeable: true,

        // Dimensions
        maxWidth: Infinity,
        maxHeight: Infinity,
        minWidth: 0,
        minHeight: 0
    };

    Cropper.setDefaults = function (options) {
        $.extend(Cropper.defaults, options);
    };

    // Reference the old cropper
    Cropper.other = $.fn.cropper;

    // Register as jQuery plugin
    $.fn.cropper = function (options, settings) {
        var result = this;

        this.each(function () {
            var $this = $(this),
                data = $this.data("cropper");

            if (!data && $.isPlainObject(options)) {
                $this.data("cropper", (data = new Cropper(this, options)));
            }

            if (typeof options === "string" && $.isFunction(data[options])) {
                result = data[options](settings);
            }
        });

        return (typeof result !== "undefined" ? result : this);
    };

    $.fn.cropper.constructor = Cropper;
    $.fn.cropper.setDefaults = Cropper.setDefaults;

    // No conflict
    $.fn.cropper.noConflict = function () {
        $.fn.cropper = Cropper.other;
        return this;
    };
});
