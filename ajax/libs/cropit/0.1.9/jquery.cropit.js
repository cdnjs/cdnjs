/*
 *  cropit - v0.1.9
 *  Customizable crop and zoom.
 *  https://github.com/scottcheng/cropit
 *
 *  Made by Scott Cheng
 *  Based on https://github.com/yufeiliu/simple_image_uploader
 *  Under MIT License
 */
(function($) {
    var Zoomer;
    Zoomer = function() {
        function Zoomer() {}
        Zoomer.prototype.setup = function(imageSize, previewSize, exportZoom, options) {
            var heightRatio, widthRatio;
            if (exportZoom == null) {
                exportZoom = 1;
            }
            widthRatio = previewSize.w / imageSize.w;
            heightRatio = previewSize.h / imageSize.h;
            if ((options != null ? options.fitWidth : void 0) && !(options != null ? options.fitHeight : void 0)) {
                this.minZoom = widthRatio;
            } else if ((options != null ? options.fitHeight : void 0) && !(options != null ? options.fitWidth : void 0)) {
                this.minZoom = heightRatio;
            } else if ((options != null ? options.fitWidth : void 0) && (options != null ? options.fitHeight : void 0)) {
                this.minZoom = widthRatio < heightRatio ? widthRatio : heightRatio;
            } else {
                this.minZoom = widthRatio < heightRatio ? heightRatio : widthRatio;
            }
            return this.maxZoom = this.minZoom < 1 / exportZoom ? 1 / exportZoom : this.minZoom;
        };
        Zoomer.prototype.getZoom = function(sliderPos) {
            if (!(this.minZoom && this.maxZoom)) {
                return null;
            }
            return sliderPos * (this.maxZoom - this.minZoom) + this.minZoom;
        };
        Zoomer.prototype.getSliderPos = function(zoom) {
            if (!(this.minZoom && this.maxZoom)) {
                return null;
            }
            if (this.minZoom === this.maxZoom) {
                return 0;
            } else {
                return (zoom - this.minZoom) / (this.maxZoom - this.minZoom);
            }
        };
        Zoomer.prototype.isZoomable = function() {
            if (!(this.minZoom && this.maxZoom)) {
                return null;
            }
            return this.minZoom !== this.maxZoom;
        };
        Zoomer.prototype.fixZoom = function(zoom) {
            if (zoom < this.minZoom) {
                return this.minZoom;
            }
            if (zoom > this.maxZoom) {
                return this.maxZoom;
            }
            return zoom;
        };
        return Zoomer;
    }();
    var Cropit;
    Cropit = function() {
        Cropit._DEFAULTS = {
            exportZoom: 1,
            imageBackground: false,
            imageBackgroundBorderWidth: 0,
            imageState: null,
            allowCrossOrigin: false
        };
        Cropit.PREVIEW_EVENTS = function() {
            return [ "mousedown", "mouseup", "mouseleave", "touchstart", "touchend", "touchcancel", "touchleave" ].map(function(type) {
                return "" + type + ".cropit";
            }).join(" ");
        }();
        Cropit.PREVIEW_MOVE_EVENTS = "mousemove.cropit touchmove.cropit";
        Cropit.ZOOM_INPUT_EVENTS = function() {
            return [ "mousemove", "touchmove", "change" ].map(function(type) {
                return "" + type + ".cropit";
            }).join(" ");
        }();
        function Cropit(element, options) {
            var dynamicDefaults;
            this.element = element;
            this.$el = $(this.element);
            dynamicDefaults = {
                $fileInput: this.$("input.cropit-image-input"),
                $preview: this.$(".cropit-image-preview"),
                $zoomSlider: this.$("input.cropit-image-zoom-input"),
                $previewContainer: this.$(".cropit-image-preview-container")
            };
            this.options = $.extend({}, Cropit._DEFAULTS, dynamicDefaults, options);
            this.init();
        }
        Cropit.prototype.init = function() {
            var $previewContainer, _ref, _ref1, _ref2;
            this.image = new Image();
            if (this.options.allowCrossOrigin) {
                this.image.crossOrigin = "Anonymous";
            }
            if ($.isArray(this.options.imageBackgroundBorderWidth)) {
                this.imageBgBorderWidthArray = this.options.imageBackgroundBorderWidth;
            } else {
                this.imageBgBorderWidthArray = [];
                [ 0, 1, 2, 3 ].forEach(function(_this) {
                    return function(i) {
                        return _this.imageBgBorderWidthArray[i] = _this.options.imageBackgroundBorderWidth;
                    };
                }(this));
            }
            this.$fileInput = this.options.$fileInput.attr({
                accept: "image/*"
            });
            this.$preview = this.options.$preview.css({
                backgroundRepeat: "no-repeat"
            });
            this.$zoomSlider = this.options.$zoomSlider.attr({
                min: 0,
                max: 1,
                step: .01
            });
            this.previewSize = {
                w: this.options.width || this.$preview.width(),
                h: this.options.height || this.$preview.height()
            };
            if (this.options.width) {
                this.$preview.width(this.previewSize.w);
            }
            if (this.options.height) {
                this.$preview.height(this.previewSize.h);
            }
            if (this.options.imageBackground) {
                $previewContainer = this.options.$previewContainer;
                this.$imageBg = $("<img />").addClass("cropit-image-background").attr("alt", "").css("position", "absolute");
                this.$imageBgContainer = $("<div />").addClass("cropit-image-background-container").css({
                    position: "absolute",
                    zIndex: 0,
                    left: -this.imageBgBorderWidthArray[3] + window.parseInt(this.$preview.css("border-left-width")),
                    top: -this.imageBgBorderWidthArray[0] + window.parseInt(this.$preview.css("border-top-width")),
                    width: this.previewSize.w + this.imageBgBorderWidthArray[1] + this.imageBgBorderWidthArray[3],
                    height: this.previewSize.h + this.imageBgBorderWidthArray[0] + this.imageBgBorderWidthArray[2]
                }).append(this.$imageBg);
                if (this.imageBgBorderWidthArray[0] > 0) {
                    this.$imageBgContainer.css({
                        overflow: "hidden"
                    });
                }
                $previewContainer.css("position", "relative").prepend(this.$imageBgContainer);
                this.$preview.css("position", "relative");
                this.$preview.hover(function(_this) {
                    return function() {
                        return _this.$imageBg.addClass("cropit-preview-hovered");
                    };
                }(this), function(_this) {
                    return function() {
                        return _this.$imageBg.removeClass("cropit-preview-hovered");
                    };
                }(this));
            }
            this.initialOffset = {
                x: 0,
                y: 0
            };
            this.initialZoom = 0;
            this.initialZoomSliderPos = 0;
            this.imageLoaded = false;
            this.moveContinue = false;
            this.zoomer = new Zoomer();
            this.bindListeners();
            this.$zoomSlider.val(this.initialZoomSliderPos);
            this.setOffset(((_ref = this.options.imageState) != null ? _ref.offset : void 0) || this.initialOffset);
            this.zoom = ((_ref1 = this.options.imageState) != null ? _ref1.zoom : void 0) || this.initialZoom;
            return this.loadImage(((_ref2 = this.options.imageState) != null ? _ref2.src : void 0) || null);
        };
        Cropit.prototype.bindListeners = function() {
            this.$fileInput.on("change.cropit", this.onFileChange.bind(this));
            this.$preview.on(Cropit.PREVIEW_EVENTS, this.onPreviewEvent.bind(this));
            return this.$zoomSlider.on(Cropit.ZOOM_INPUT_EVENTS, this.onZoomSliderChange.bind(this));
        };
        Cropit.prototype.unbindListeners = function() {
            this.$fileInput.off("change.cropit");
            this.$preview.off(Cropit.PREVIEW_EVENTS);
            return this.$zoomSlider.off(Cropit.ZOOM_INPUT_EVENTS);
        };
        Cropit.prototype.reset = function() {
            this.zoom = this.initialZoom;
            return this.offset = this.initialOffset;
        };
        Cropit.prototype.onFileChange = function() {
            var file, fileReader, _base;
            if (typeof (_base = this.options).onFileChange === "function") {
                _base.onFileChange();
            }
            fileReader = new FileReader();
            file = this.$fileInput.get(0).files[0];
            if (file != null ? file.type.match("image") : void 0) {
                this.setImageLoadingClass();
                fileReader.readAsDataURL(file);
                fileReader.onload = this.onFileReaderLoaded.bind(this);
                return fileReader.onerror = this.onFileReaderError.bind(this);
            }
        };
        Cropit.prototype.onFileReaderLoaded = function(e) {
            this.reset();
            return this.loadImage(e.target.result);
        };
        Cropit.prototype.onFileReaderError = function() {
            var _base;
            return typeof (_base = this.options).onFileReaderError === "function" ? _base.onFileReaderError() : void 0;
        };
        Cropit.prototype.loadImage = function(imageSrc) {
            var _base;
            this.imageSrc = imageSrc;
            if (!this.imageSrc) {
                return;
            }
            if (typeof (_base = this.options).onImageLoading === "function") {
                _base.onImageLoading();
            }
            this.setImageLoadingClass();
            this.image.onload = this.onImageLoaded.bind(this);
            this.image.onerror = this.onImageError.bind(this);
            return this.image.src = this.imageSrc;
        };
        Cropit.prototype.onImageLoaded = function() {
            var _base;
            this.setImageLoadedClass();
            this.setOffset(this.offset);
            this.$preview.css("background-image", "url(" + this.imageSrc + ")");
            if (this.options.imageBackground) {
                this.$imageBg.attr("src", this.imageSrc);
            }
            this.imageSize = {
                w: this.image.width,
                h: this.image.height
            };
            this.setupZoomer();
            this.imageLoaded = true;
            return typeof (_base = this.options).onImageLoaded === "function" ? _base.onImageLoaded() : void 0;
        };
        Cropit.prototype.onImageError = function() {
            var _base;
            return typeof (_base = this.options).onImageError === "function" ? _base.onImageError() : void 0;
        };
        Cropit.prototype.setImageLoadingClass = function() {
            return this.$preview.removeClass("cropit-image-loaded").addClass("cropit-image-loading");
        };
        Cropit.prototype.setImageLoadedClass = function() {
            return this.$preview.removeClass("cropit-image-loading").addClass("cropit-image-loaded");
        };
        Cropit.prototype.getEventPosition = function(e) {
            var _ref, _ref1, _ref2, _ref3;
            if ((_ref = e.originalEvent) != null ? (_ref1 = _ref.touches) != null ? _ref1[0] : void 0 : void 0) {
                e = (_ref2 = e.originalEvent) != null ? (_ref3 = _ref2.touches) != null ? _ref3[0] : void 0 : void 0;
            }
            if (e.clientX && e.clientY) {
                return {
                    x: e.clientX,
                    y: e.clientY
                };
            }
        };
        Cropit.prototype.onPreviewEvent = function(e) {
            if (!this.imageLoaded) {
                return;
            }
            this.moveContinue = false;
            this.$preview.off(Cropit.PREVIEW_MOVE_EVENTS);
            if (e.type === "mousedown" || e.type === "touchstart") {
                this.origin = this.getEventPosition(e);
                this.moveContinue = true;
                this.$preview.on(Cropit.PREVIEW_MOVE_EVENTS, this.onMove.bind(this));
            } else {
                $(document.body).focus();
            }
            e.stopPropagation();
            return false;
        };
        Cropit.prototype.onMove = function(e) {
            var eventPosition;
            eventPosition = this.getEventPosition(e);
            if (this.moveContinue && eventPosition) {
                this.setOffset({
                    x: this.offset.x + eventPosition.x - this.origin.x,
                    y: this.offset.y + eventPosition.y - this.origin.y
                });
            }
            this.origin = eventPosition;
            e.stopPropagation();
            return false;
        };
        Cropit.prototype.setOffset = function(position) {
            this.offset = this.fixOffset(position);
            this.$preview.css("background-position", "" + this.offset.x + "px " + this.offset.y + "px");
            if (this.options.imageBackground) {
                return this.$imageBg.css({
                    left: this.offset.x + this.imageBgBorderWidthArray[3],
                    top: this.offset.y + this.imageBgBorderWidthArray[0]
                });
            }
        };
        Cropit.prototype.fixOffset = function(offset) {
            var ret;
            if (!this.imageLoaded) {
                return offset;
            }
            ret = {
                x: offset.x,
                y: offset.y
            };
            if (this.imageSize.w * this.zoom <= this.previewSize.w) {
                ret.x = 0;
            } else if (ret.x > 0) {
                ret.x = 0;
            } else if (ret.x + this.imageSize.w * this.zoom < this.previewSize.w) {
                ret.x = this.previewSize.w - this.imageSize.w * this.zoom;
            }
            if (this.imageSize.h * this.zoom <= this.previewSize.h) {
                ret.y = 0;
            } else if (ret.y > 0) {
                ret.y = 0;
            } else if (ret.y + this.imageSize.h * this.zoom < this.previewSize.h) {
                ret.y = this.previewSize.h - this.imageSize.h * this.zoom;
            }
            ret.x = this.round(ret.x);
            ret.y = this.round(ret.y);
            return ret;
        };
        Cropit.prototype.onZoomSliderChange = function() {
            var newZoom;
            if (!this.imageLoaded) {
                return;
            }
            this.zoomSliderPos = Number(this.$zoomSlider.val());
            newZoom = this.zoomer.getZoom(this.zoomSliderPos);
            return this.setZoom(newZoom);
        };
        Cropit.prototype.enableZoomSlider = function() {
            var _base;
            this.$zoomSlider.removeAttr("disabled");
            return typeof (_base = this.options).onZoomEnabled === "function" ? _base.onZoomEnabled() : void 0;
        };
        Cropit.prototype.disableZoomSlider = function() {
            var _base;
            this.$zoomSlider.attr("disabled", true);
            return typeof (_base = this.options).onZoomDisabled === "function" ? _base.onZoomDisabled() : void 0;
        };
        Cropit.prototype.setupZoomer = function() {
            this.zoomer.setup(this.imageSize, this.previewSize, this.options.exportZoom, this.options);
            this.zoom = this.fixZoom(this.zoom);
            this.setZoom(this.zoom);
            if (this.isZoomable()) {
                return this.enableZoomSlider();
            } else {
                return this.disableZoomSlider();
            }
        };
        Cropit.prototype.setZoom = function(newZoom) {
            var newX, newY, oldZoom, updatedHeight, updatedWidth;
            newZoom = this.fixZoom(newZoom);
            updatedWidth = this.round(this.imageSize.w * newZoom);
            updatedHeight = this.round(this.imageSize.h * newZoom);
            oldZoom = this.zoom;
            newX = this.previewSize.w / 2 - (this.previewSize.w / 2 - this.offset.x) * newZoom / oldZoom;
            newY = this.previewSize.h / 2 - (this.previewSize.h / 2 - this.offset.y) * newZoom / oldZoom;
            this.zoom = newZoom;
            this.setOffset({
                x: newX,
                y: newY
            });
            this.zoomSliderPos = this.zoomer.getSliderPos(this.zoom);
            this.$zoomSlider.val(this.zoomSliderPos);
            this.$preview.css("background-size", "" + updatedWidth + "px " + updatedHeight + "px");
            if (this.options.imageBackground) {
                return this.$imageBg.css({
                    width: updatedWidth,
                    height: updatedHeight
                });
            }
        };
        Cropit.prototype.fixZoom = function(zoom) {
            return this.zoomer.fixZoom(zoom);
        };
        Cropit.prototype.isZoomable = function() {
            return this.zoomer.isZoomable();
        };
        Cropit.prototype.getCroppedImageData = function(exportOptions) {
            var canvas, canvasContext, croppedSize, exportDefaults, exportZoom;
            if (!this.imageSrc) {
                return null;
            }
            exportDefaults = {
                type: "image/png",
                quality: .75,
                originalSize: false,
                fillBg: "#fff"
            };
            exportOptions = $.extend({}, exportDefaults, exportOptions);
            croppedSize = {
                w: this.previewSize.w,
                h: this.previewSize.h
            };
            if (this.options.fitHeight && !this.options.fitWidth && this.imageSize.w * this.zoom < this.previewSize.w) {
                croppedSize.w = this.imageSize.w * this.zoom;
            } else if (this.options.fitWidth && !this.options.fitHeight && this.imageSize.h * this.zoom < this.previewSize.h) {
                croppedSize.h = this.imageSize.h * this.zoom;
            }
            exportZoom = exportOptions.originalSize ? 1 / this.zoom : this.options.exportZoom;
            canvas = $("<canvas />").attr({
                width: croppedSize.w * exportZoom,
                height: croppedSize.h * exportZoom
            }).get(0);
            canvasContext = canvas.getContext("2d");
            if (exportOptions.type === "image/jpeg") {
                canvasContext.fillStyle = exportOptions.fillBg;
                canvasContext.fillRect(0, 0, canvas.width, canvas.height);
            }
            canvasContext.drawImage(this.image, this.offset.x * exportZoom, this.offset.y * exportZoom, this.zoom * exportZoom * this.imageSize.w, this.zoom * exportZoom * this.imageSize.h);
            return canvas.toDataURL(exportOptions.type, exportOptions.quality);
        };
        Cropit.prototype.getImageState = function() {
            return {
                src: this.imageSrc,
                offset: this.offset,
                zoom: this.zoom
            };
        };
        Cropit.prototype.getImageSrc = function() {
            return this.imageSrc;
        };
        Cropit.prototype.getOffset = function() {
            return this.offset;
        };
        Cropit.prototype.getZoom = function() {
            return this.zoom;
        };
        Cropit.prototype.getImageSize = function() {
            if (!this.imageSize) {
                return null;
            }
            return {
                width: this.imageSize.w,
                height: this.imageSize.h
            };
        };
        Cropit.prototype.getPreviewSize = function() {
            return {
                width: this.previewSize.w,
                height: this.previewSize.h
            };
        };
        Cropit.prototype.setPreviewSize = function(size) {
            if (!((size != null ? size.width : void 0) > 0 && (size != null ? size.height : void 0) > 0)) {
                return;
            }
            this.previewSize = {
                w: size.width,
                h: size.height
            };
            this.$preview.css({
                width: this.previewSize.w,
                height: this.previewSize.h
            });
            if (this.options.imageBackground) {
                this.$imageBgContainer.css({
                    width: this.previewSize.w + this.imageBgBorderWidthArray[1] + this.imageBgBorderWidthArray[3],
                    height: this.previewSize.h + this.imageBgBorderWidthArray[0] + this.imageBgBorderWidthArray[2]
                });
            }
            if (this.imageLoaded) {
                return this.setupZoomer();
            }
        };
        Cropit.prototype.disable = function() {
            this.unbindListeners();
            this.disableZoomSlider();
            return this.$el.addClass("cropit-disabled");
        };
        Cropit.prototype.reenable = function() {
            this.bindListeners();
            this.enableZoomSlider();
            return this.$el.removeClass("cropit-disabled");
        };
        Cropit.prototype.round = function(x) {
            return Math.round(x * 1e5) / 1e5;
        };
        Cropit.prototype.$ = function(selector) {
            if (!this.$el) {
                return null;
            }
            return this.$el.find(selector);
        };
        return Cropit;
    }();
    var dataKey, methods;
    dataKey = "cropit";
    methods = {
        init: function(options) {
            return this.each(function() {
                var cropit;
                if (!$.data(this, dataKey)) {
                    cropit = new Cropit(this, options);
                    return $.data(this, dataKey, cropit);
                }
            });
        },
        destroy: function() {
            return this.each(function() {
                return $.removeData(this, dataKey);
            });
        },
        isZoomable: function() {
            var cropit;
            cropit = this.first().data(dataKey);
            return cropit != null ? cropit.isZoomable() : void 0;
        },
        "export": function(options) {
            var cropit;
            cropit = this.first().data(dataKey);
            return cropit != null ? cropit.getCroppedImageData(options) : void 0;
        },
        imageState: function() {
            var cropit;
            cropit = this.first().data(dataKey);
            return cropit != null ? cropit.getImageState() : void 0;
        },
        imageSrc: function(newImageSrc) {
            var cropit;
            if (newImageSrc != null) {
                return this.each(function() {
                    var cropit;
                    cropit = $.data(this, dataKey);
                    if (cropit != null) {
                        cropit.reset();
                    }
                    return cropit != null ? cropit.loadImage(newImageSrc) : void 0;
                });
            } else {
                cropit = this.first().data(dataKey);
                return cropit != null ? cropit.getImageSrc() : void 0;
            }
        },
        offset: function(newOffset) {
            var cropit;
            if (newOffset != null && newOffset.x != null && newOffset.y != null) {
                return this.each(function() {
                    var cropit;
                    cropit = $.data(this, dataKey);
                    return cropit != null ? cropit.setOffset(newOffset) : void 0;
                });
            } else {
                cropit = this.first().data(dataKey);
                return cropit != null ? cropit.getOffset() : void 0;
            }
        },
        zoom: function(newZoom) {
            var cropit;
            if (newZoom != null) {
                return this.each(function() {
                    var cropit;
                    cropit = $.data(this, dataKey);
                    return cropit != null ? cropit.setZoom(newZoom) : void 0;
                });
            } else {
                cropit = this.first().data(dataKey);
                return cropit != null ? cropit.getZoom() : void 0;
            }
        },
        imageSize: function() {
            var cropit;
            cropit = this.first().data(dataKey);
            return cropit != null ? cropit.getImageSize() : void 0;
        },
        previewSize: function(newSize) {
            var cropit;
            if (newSize != null) {
                return this.each(function() {
                    var cropit;
                    cropit = $.data(this, dataKey);
                    return cropit != null ? cropit.setPreviewSize(newSize) : void 0;
                });
            } else {
                cropit = this.first().data(dataKey);
                return cropit != null ? cropit.getPreviewSize() : void 0;
            }
        },
        disable: function() {
            return this.each(function() {
                var cropit;
                cropit = $.data(this, dataKey);
                return cropit.disable();
            });
        },
        reenable: function() {
            return this.each(function() {
                var cropit;
                cropit = $.data(this, dataKey);
                return cropit.reenable();
            });
        }
    };
    $.fn.cropit = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, [].slice.call(arguments, 1));
        } else {
            return methods.init.apply(this, arguments);
        }
    };
})(window.jQuery);