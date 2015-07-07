/*!
 * Cropper v0.2.0
 * https://github.com/fengyuanchen/cropper
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 */

(function(factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as anonymous module.
        define(["jquery"], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
}(function($) {

    "use strict";

    var $document = $(document),
        Cropper = function(element, options) {
            options = $.isPlainObject(options) ? options : {};
            this.$element = $(element);
            this.defaults = $.extend({}, Cropper.defaults, this.$element.data(), options);
            this.init();
        };

    Cropper.prototype = {
        construstor: Cropper,

        init: function() {
            var ratio = this.defaults.aspectRatio;

            if ($.isNumeric(ratio)) {
                ratio = ratio > 0 ? ratio : 1;
            } else {
                ratio = NaN;
            }

            this.defaults.aspectRatio = ratio;

            this.enable();
        },

        enable: function(url) {
            var $element = this.$element;

            if (this.active) {
                return;
            }

            url = url || $element.prop("src");

            if (!url) {
                throw new Error("Invalid image!");
            }

            this.url = url;
            this.$cropper = $(Cropper.template);
            this.$dragger = this.$cropper.find(".cropper-dragger");

            Cropper.fn.toggle($element);
            $element.after(this.$cropper);

            if (!this.defaults.modal) {
                Cropper.fn.toggle(this.$cropper.find(".cropper-modal"));
            }

            this.setPreview();
            this.setImage();
            this.addListener();
            this.active = true;
        },

        disable: function() {

            if (!this.active) {
                return;
            }

            this.removeListener();
            this.$cropper.empty().remove();
            Cropper.fn.toggle(this.$element);

            this.$cropper = null;
            this.$dragger = null;
            this.$preview = null;

            this.cropper = null;
            this.dragger = null;
            this.image = null;
            this.url = "";
            this.active = false;
        },

        addListener: function() {
            this.$element.on("load", $.proxy(this.load, this));
            this.$dragger.on("mousedown", $.proxy(this.mousedown, this));
            $document.on("mousemove", $.proxy(this.mousemove, this));
            $document.on("mouseup", $.proxy(this.mouseup, this));
        },

        removeListener: function() {
            this.$element.off("load", this.load);
            this.$dragger.off("mousedown", this.mousedown);
            $document.off("mousemove", this.mousemove);
            $document.off("mouseup", this.mouseup);
        },

        load: function() {
            var url;

            if (this.active) {
                url = this.$element.prop("src");

                if (url && url !== this.url) {
                    this.disable();
                    this.enable(url);
                }

                return;
            }

            this.enable();
        },

        mousedown: function(e) {
            var direction = $(e.target).data().direction;

            if (typeof direction === "string" && direction.length > 0) {
                this.mouseX1 = e.clientX;
                this.mouseY1 = e.clientY;
                this.direction = direction;
            }
        },

        mousemove: function(e) {
            if (this.direction) {
                this.mouseX2 = e.clientX;
                this.mouseY2 = e.clientY;
                this.dragging();
            }
        },

        mouseup: function() {
            this.direction = "";
        },

        setAspectRatio: function(ratio) {
            if ($.isNumeric(ratio) && ratio > 0) {
                this.defaults.aspectRatio = ratio;
                this.active && this.setDragger();
            }
        },

        setImage: function() {
            var that = this,
                $image = $('<img src="' + this.url + '">');

            $image.on("load", function() {
                var $this = $(this),
                    image;

                if (this.naturalWidth && this.naturalHeight) {
                    image = {
                        naturalHeight: this.naturalHeight,
                        naturalWidth: this.naturalWidth
                    };
                } else {
                    Cropper.fn.size($this, {
                        height: "auto",
                        width: "auto"
                    });

                    image = Cropper.fn.size($this);
                    image = {
                        naturalHeight: image.height,
                        naturalWidth: image.width
                    };
                }

                Cropper.fn.size($this, {
                    height: "100%",
                    width: "100%"
                });

                that.image = image;
                that.setCropper();
            });

            this.$cropper.prepend($image);
        },

        getImgInfo: function() {
            return this.image;
        },

        setPreview: function() {
            var preview = this.defaults.preview;

            this.$preview = this.$cropper.find(".cropper-preview");

            if (typeof preview === "string" && preview.length > 0) {
                this.$preview = this.$preview.add(preview);
            }

            this.$preview.html('<img src="' + this.url + '">');
        },

        setCropper: function() {
            var $container = this.$element.parent(),
                container = Cropper.fn.size($container),
                image = this.image,
                cropper;

            if (((image.naturalWidth * container.height / image.naturalHeight) - container.width) >= 0) {
                cropper = {
                    height: container.width * image.naturalHeight / image.naturalWidth,
                    width: container.width,
                    left: 0
                };

                cropper.top = (container.height - cropper.height) / 2;
            } else {
                cropper = {
                    height: container.height,
                    width: container.height * image.naturalWidth / image.naturalHeight,
                    top: 0
                };

                cropper.left = (container.width - cropper.width) / 2;
            }

            $.each(cropper, function(i, n) {
                cropper[i] = Math.round(n);
            });

            image.height = cropper.height;
            image.width = cropper.width;
            image.ratio = image.width / image.naturalWidth;

            Cropper.fn.position($container);
            this.$cropper.css({
                height: cropper.height,
                left: cropper.left,
                top: cropper.top,
                width: cropper.width
            });

            this.cropper = cropper;
            this.setDragger();
        },

        setDragger: function() {
            var cropper = this.cropper,
                ratio = this.defaults.aspectRatio || (this.image.naturalWidth / this.image.naturalHeight),
                dragger;

            if (((cropper.height * ratio) - cropper.width) >= 0) {
                dragger = {
                    height: cropper.width / ratio,
                    width: cropper.width,
                    left: 0,
                    top: (cropper.height - (cropper.width / ratio)) / 2,
                    maxWidth: cropper.width,
                    maxHeight: cropper.width / ratio
                };
            } else {
                dragger = {
                    height: cropper.height,
                    width: cropper.height * ratio,
                    left: (cropper.width - (cropper.height * ratio)) / 2,
                    top: 0,
                    maxHeight: cropper.height,
                    maxWidth: cropper.height * ratio
                };
            }

            dragger.height *= 0.8;
            dragger.width *= 0.8;

            dragger.left = (cropper.width - dragger.width) / 2;
            dragger.top = (cropper.height - dragger.height) / 2;

            this.dragger = Cropper.fn.round(dragger);
            this.resetDragger();
        },

        resetDragger: function() {
            var dragger = this.dragger,
                cropper = this.cropper;

            dragger.width = dragger.width > dragger.maxWidth ? dragger.maxWidth : Math.abs(dragger.width);
            dragger.height = dragger.height > dragger.maxHeight ? dragger.maxHeight : Math.abs(dragger.height);

            dragger.maxLeft = cropper.width - dragger.width;
            dragger.maxTop = cropper.height - dragger.height;

            dragger.left = dragger.left < 0 ? 0 : dragger.left > dragger.maxLeft ? dragger.maxLeft : dragger.left;
            dragger.top = dragger.top < 0 ? 0 : dragger.top > dragger.maxTop ? dragger.maxTop : dragger.top;

            dragger = Cropper.fn.round(dragger);

            this.$dragger.css({
                height: dragger.height,
                left: dragger.left,
                top: dragger.top,
                width: dragger.width
            });

            this.dragger = dragger;
            this.preview();
            this.output();
        },

        dragging: function() {
            var direction = this.direction,
                dragger = this.dragger,
                ratio = this.defaults.aspectRatio,
                range = {
                    x: this.mouseX2 - this.mouseX1,
                    y: this.mouseY2 - this.mouseY1
                };

            if (ratio) {
                range.X = range.y * ratio;
                range.Y = range.x / ratio;
            }

            switch (direction) {

                // dragging
                case "e":
                    dragger.width += range.x;

                    if (ratio) {
                        dragger.height = dragger.width / ratio;
                        dragger.top -= range.Y / 2;
                    }

                    if (dragger.width < 0) {
                        this.direction = "w";
                        dragger.width = 0;
                    }

                    break;

                case "n":
                    dragger.height -= range.y;
                    dragger.top += range.y;

                    if (ratio) {
                        dragger.width = dragger.height * ratio;
                        dragger.left += range.X / 2;
                    }

                    if (dragger.height < 0) {
                        this.direction = "s";
                        dragger.height = 0;
                    }

                    break;

                case "w":
                    dragger.width -= range.x;
                    dragger.left += range.x;

                    if (ratio) {
                        dragger.height = dragger.width / ratio;
                        dragger.top += range.Y / 2;
                    }

                    if (dragger.width < 0) {
                        this.direction = "e";
                        dragger.width = 0;
                    }

                    break;

                case "s":
                    dragger.height += range.y;

                    if (ratio) {
                        dragger.width = dragger.height * ratio;
                        dragger.left -= range.X / 2;
                    }

                    if (dragger.height < 0) {
                        this.direction = "n";
                        dragger.height = 0;
                    }

                    break;

                case "ne":
                    dragger.height -= range.y;
                    dragger.top += range.y;

                    if (ratio) {
                        dragger.width = dragger.height * ratio;
                    } else {
                        dragger.width += range.x;
                    }

                    if (dragger.height < 0) {
                        this.direction = "sw";
                        dragger.height = 0;
                        dragger.width = 0;
                    }

                    break;

                case "nw":
                    dragger.height -= range.y;
                    dragger.top += range.y;

                    if (ratio) {
                        dragger.width = dragger.height * ratio;
                        dragger.left += range.X;
                    } else {
                        dragger.width -= range.x;
                        dragger.left += range.x;
                    }

                    if (dragger.height < 0) {
                        this.direction = "se";
                        dragger.height = 0;
                        dragger.width = 0;
                    }

                    break;

                case "sw":
                    dragger.width -= range.x;
                    dragger.left += range.x;

                    if (ratio) {
                        dragger.height = dragger.width / ratio;
                    } else {
                        dragger.height += range.y;
                    }

                    if (dragger.width < 0) {
                        this.direction = "ne";
                        dragger.height = 0;
                        dragger.width = 0;
                    }

                    break;

                case "se":
                    dragger.width += range.x;

                    if (ratio) {
                        dragger.height = dragger.width / ratio;
                    } else {
                        dragger.height += range.y;
                    }

                    if (dragger.width < 0) {
                        this.direction = "nw";
                        dragger.height = 0;
                        dragger.width = 0;
                    }

                    break;

                // moving
                default:
                    dragger.left += range.x;
                    dragger.top += range.y;
            }

            this.resetDragger();
            this.mouseX1 = this.mouseX2;
            this.mouseY1 = this.mouseY2;
        },

        output: function() {
            var ratio = this.image.ratio,
                dragger = this.dragger,
                data = {
                    x1: dragger.left,
                    y1: dragger.top,
                    x2: dragger.left + dragger.width,
                    y2: dragger.top + dragger.height,
                    height: dragger.height,
                    width: dragger.width,
                    image: this.image
                };

            this.defaults.done(Cropper.fn.round(data, function(n) {
                return n / ratio;
            }));
        },

        preview: function() {
            var that = this,
                cropper = that.cropper,
                dragger = that.dragger;

            this.$preview.each(function() {
                var $this = $(this),
                    ratio = $this.outerWidth() / dragger.width,
                    styles = {
                        height: cropper.height,
                        marginLeft: - dragger.left,
                        marginTop: - dragger.top,
                        width: cropper.width
                    };

                $this.css({overflow: "hidden"});
                $this.find("img").css(Cropper.fn.round(styles, function(n) {
                    return n * ratio;
                }));
            });
        }
    };

    // Common methods
    Cropper.fn = {
        toggle: function($e) {
            $e.toggleClass("cropper-hidden");
        },

        position: function($e, option) {
            var position = $e.css("position");

            if (position === "static") {
                $e.css("position", option || "relative");
            }
        },

        size: function($e, options) {
            if ($.isPlainObject(options)) {
                $e.css(options);
            } else {
                return {
                    height: $e.height(),
                    width: $e.width()
                };
            }
        },

        round: function(data, fn) {
            var value,
                i;

            for (i in data) {
                value = data[i];

                if (data.hasOwnProperty(i) && typeof value === "number") {
                    data[i] = Math.round($.isFunction(fn) ? fn(value) : value);
                }
            }

            return data;
        }
    };

    Cropper.template = [
        '<div class="cropper-container">',
            '<div class="cropper-modal"></div>',
            '<div class="cropper-dragger">',
                '<span class="cropper-preview"></span>',
                '<span class="cropper-dashed dashed-h"></span>',
                '<span class="cropper-dashed dashed-v"></span>',
                '<span class="cropper-face" data-direction="*"></span>',
                '<span class="cropper-line line-e" data-direction="e"></span>',
                '<span class="cropper-line line-n" data-direction="n"></span>',
                '<span class="cropper-line line-w" data-direction="w"></span>',
                '<span class="cropper-line line-s" data-direction="s"></span>',
                '<span class="cropper-point point-e" data-direction="e"></span>',
                '<span class="cropper-point point-n" data-direction="n"></span>',
                '<span class="cropper-point point-w" data-direction="w"></span>',
                '<span class="cropper-point point-s" data-direction="s"></span>',
                '<span class="cropper-point point-ne" data-direction="ne"></span>',
                '<span class="cropper-point point-nw" data-direction="nw"></span>',
                '<span class="cropper-point point-sw" data-direction="sw"></span>',
                '<span class="cropper-point point-se" data-direction="se"></span>',
            '</div>',
        '</div>'
    ].join("");

    Cropper.defaults = {
        aspectRatio: "auto",
        done: function(/* data */) {},
        modal: true,
        preview: ""
    };

    Cropper.setDefaults = function(options) {
        $.extend(Cropper.defaults, options);
    };

    // Register as jQuery plugin
    $.fn.cropper = function(options, settings) {
        var result = this;

        this.each(function() {
            var $this = $(this),
                data = $this.data("cropper");

            if (!data) {
                data = new Cropper(this, options);
                $this.data("cropper", data);
            }

            if (typeof options === "string" && $.isFunction(data[options])) {
                result = data[options](settings);
            }
        });

        return result;
    };

    $.fn.cropper.Constructor = Cropper;
    $.fn.cropper.setDefaults = Cropper.setDefaults;

    $(function() {
        $("img[cropper]").cropper();
    });
}));
