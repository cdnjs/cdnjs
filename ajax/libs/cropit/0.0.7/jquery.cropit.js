/*
 *  cropit - v0.0.7
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
    var Cropit, defaults;
    defaults = {
        exportZoom: 1,
        imageBackground: false,
        imageBackgroundBorderWidth: 0,
        imageState: null
    };
    Cropit = function() {
        function Cropit(element, options) {
            var dynamicDefaults;
            this.element = element;
            this.$el = $(this.element);
            dynamicDefaults = {
                $fileInput: this.$("input.cropit-image-input"),
                $preview: this.$(".cropit-image-preview"),
                $imageZoomInput: this.$("input.cropit-image-zoom-input"),
                $previewContainer: this.$(".cropit-image-preview-container")
            };
            this.options = $.extend({}, defaults, dynamicDefaults, options);
            this._defaults = defaults;
            this.init();
        }
        Cropit.prototype.init = function() {
            var $previewContainer, imageBgBorderSize, _ref, _ref1, _ref2, _ref3;
            this.$fileInput = this.options.$fileInput.attr({
                accept: "image/*"
            });
            this.$preview = this.options.$preview.css({
                backgroundRepeat: "no-repeat"
            });
            this.$imageZoomInput = this.options.$imageZoomInput.attr({
                min: 0,
                max: 1,
                step: .01
            });
            this.$hiddenImage = $("<img />").addClass("cropit-image-hidden-preview").attr({
                alt: "",
                style: "display: none;"
            }).appendTo(this.$el);
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
                imageBgBorderSize = this.options.imageBackgroundBorderWidth;
                $previewContainer = this.options.$previewContainer;
                this.$imageBg = $("<img />").addClass("cropit-image-background").attr("alt", "").css("position", "absolute");
                this.$imageBgContainer = $("<div />").addClass("cropit-image-background-container").css({
                    position: "absolute",
                    zIndex: 0,
                    top: -imageBgBorderSize,
                    left: -imageBgBorderSize,
                    width: this.previewSize.w + imageBgBorderSize * 2,
                    height: this.previewSize.h + imageBgBorderSize * 2
                }).append(this.$imageBg);
                if (imageBgBorderSize > 0) {
                    this.$imageBgContainer.css({
                        overflow: "hidden"
                    });
                }
                $previewContainer.css("position", "relative").prepend(this.$imageBgContainer);
                this.$preview.css("position", "relative");
                this.imageBgPreviewOffset = {
                    x: imageBgBorderSize + window.parseInt(this.$preview.css("border-left-width")),
                    y: imageBgBorderSize + window.parseInt(this.$preview.css("border-top-width"))
                };
            }
            this.initialOffset = {
                x: 0,
                y: 0
            };
            this.initialZoom = 0;
            this.initialSliderPos = 0;
            this.imageLoaded = false;
            this.imageSrc = ((_ref = this.options.imageState) != null ? _ref.src : void 0) || null;
            this.setOffset(((_ref1 = this.options.imageState) != null ? _ref1.offset : void 0) || this.initialOffset);
            this.zoom = ((_ref2 = this.options.imageState) != null ? _ref2.zoom : void 0) || this.initialZoom;
            this.$imageZoomInput.val(this.initialSliderPos);
            this.moveContinue = false;
            this.zoomer = new Zoomer();
            this.$preview.on("mousedown mouseup mouseleave", this.handlePreviewEvent.bind(this));
            this.$fileInput.on("change", this.onFileChange.bind(this));
            this.$imageZoomInput.on("mousedown mouseup mousemove", this.updateSliderPos.bind(this));
            if ((_ref3 = this.options.imageState) != null ? _ref3.src : void 0) {
                return this.loadImage();
            }
        };
        Cropit.prototype.onFileChange = function() {
            var file, oFReader, _base;
            if (typeof (_base = this.options).onFileChange === "function") {
                _base.onFileChange();
            }
            oFReader = new FileReader();
            file = this.$fileInput.get(0).files[0];
            if (file != null ? file.type.match("image") : void 0) {
                this.setImageLoadingClass();
                oFReader.readAsDataURL(file);
                return oFReader.onload = this.onFileReaderLoaded.bind(this);
            }
        };
        Cropit.prototype.onFileReaderLoaded = function(e) {
            this.imageSrc = e.target.result;
            this.zoom = this.initialZoom;
            this.setOffset(this.initialOffset);
            return this.loadImage();
        };
        Cropit.prototype.loadImage = function() {
            var _base;
            this.$hiddenImage.attr("src", this.imageSrc);
            if (typeof (_base = this.options).onImageLoading === "function") {
                _base.onImageLoading();
            }
            this.setImageLoadingClass();
            return this.$hiddenImage.load(this.onImageLoaded.bind(this));
        };
        Cropit.prototype.onImageLoaded = function() {
            var _base;
            this.setImageLoadedClass();
            this.$preview.css("background-image", "url(" + this.imageSrc + ")");
            if (this.options.imageBackground) {
                this.$imageBg.attr("src", this.imageSrc);
            }
            this.imageSize = {
                w: this.$hiddenImage.width(),
                h: this.$hiddenImage.height()
            };
            this.setupZoomer();
            this.imageLoaded = true;
            return typeof (_base = this.options).onImageLoaded === "function" ? _base.onImageLoaded() : void 0;
        };
        Cropit.prototype.setImageLoadingClass = function() {
            return this.$preview.removeClass("cropit-image-loaded").addClass("cropit-image-loading");
        };
        Cropit.prototype.setImageLoadedClass = function() {
            return this.$preview.removeClass("cropit-image-loading").addClass("cropit-image-loaded");
        };
        Cropit.prototype.handlePreviewEvent = function(e) {
            if (!this.imageLoaded) {
                return;
            }
            this.moveContinue = false;
            this.$preview.off("mousemove");
            if (e.type === "mousedown") {
                this.origin = {
                    x: e.clientX,
                    y: e.clientY
                };
                this.moveContinue = true;
                this.$preview.on("mousemove", this.onMove.bind(this));
            } else {
                $(document.body).focus();
            }
            e.stopPropagation();
            return false;
        };
        Cropit.prototype.onMove = function(e) {
            if (this.moveContinue) {
                this.setOffset({
                    x: this.offset.x + e.clientX - this.origin.x,
                    y: this.offset.y + e.clientY - this.origin.y
                });
            }
            this.origin = {
                x: e.clientX,
                y: e.clientY
            };
            e.stopPropagation();
            return false;
        };
        Cropit.prototype.setOffset = function(position) {
            this.offset = this.fixOffset(position);
            this.$preview.css("background-position", "" + this.offset.x + "px " + this.offset.y + "px");
            if (this.options.imageBackground) {
                return this.$imageBg.css({
                    left: this.offset.x + this.imageBgPreviewOffset.x,
                    top: this.offset.y + this.imageBgPreviewOffset.y
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
            ret.x = Math.round(ret.x);
            ret.y = Math.round(ret.y);
            return ret;
        };
        Cropit.prototype.updateSliderPos = function() {
            var newZoom;
            if (!this.imageLoaded) {
                return;
            }
            this.sliderPos = Number(this.$imageZoomInput.val());
            newZoom = this.zoomer.getZoom(this.sliderPos);
            return this.setZoom(newZoom);
        };
        Cropit.prototype.setupZoomer = function() {
            var _base, _base1;
            this.zoomer.setup(this.imageSize, this.previewSize, this.options.exportZoom, this.options);
            this.zoom = this.fixZoom(this.zoom);
            this.setZoom(this.zoom);
            if (this.isZoomable()) {
                this.$imageZoomInput.removeAttr("disabled");
                return typeof (_base = this.options).onZoomEnabled === "function" ? _base.onZoomEnabled() : void 0;
            } else {
                this.$imageZoomInput.attr("disabled", true);
                return typeof (_base1 = this.options).onZoomDisabled === "function" ? _base1.onZoomDisabled() : void 0;
            }
        };
        Cropit.prototype.setZoom = function(newZoom) {
            var newX, newY, oldZoom, updatedHeight, updatedWidth;
            newZoom = this.fixZoom(newZoom);
            updatedWidth = Math.round(this.imageSize.w * newZoom);
            updatedHeight = Math.round(this.imageSize.h * newZoom);
            oldZoom = this.zoom;
            newX = this.imageSize.w * oldZoom / 2 + this.offset.x - updatedWidth / 2;
            newY = this.imageSize.h * oldZoom / 2 + this.offset.y - updatedHeight / 2;
            this.zoom = newZoom;
            this.setOffset({
                x: newX,
                y: newY
            });
            this.sliderPos = this.zoomer.getSliderPos(this.zoom);
            this.$imageZoomInput.val(this.sliderPos);
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
        Cropit.prototype.getCroppedImageData = function() {
            var $canvas, canvasContext, croppedSize;
            if (!this.imageSrc) {
                return null;
            }
            croppedSize = {
                w: this.previewSize.w,
                h: this.previewSize.h
            };
            if (this.options.fitHeight && !this.options.fitWidth && this.imageSize.w * this.zoom < this.previewSize.w) {
                croppedSize.w = this.imageSize.w * this.zoom;
            } else if (this.options.fitWidth && !this.options.fitHeight && this.imageSize.h * this.zoom < this.previewSize.h) {
                croppedSize.h = this.imageSize.h * this.zoom;
            }
            $canvas = $("<canvas />").attr({
                style: "display: none;",
                width: croppedSize.w * this.options.exportZoom,
                height: croppedSize.h * this.options.exportZoom
            }).appendTo(this.$el);
            canvasContext = $canvas[0].getContext("2d");
            canvasContext.drawImage(this.$hiddenImage[0], this.offset.x * this.options.exportZoom, this.offset.y * this.options.exportZoom, this.zoom * this.options.exportZoom * this.imageSize.w, this.zoom * this.options.exportZoom * this.imageSize.h);
            return $canvas[0].toDataURL();
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
                    width: this.previewSize.w + this.options.imageBackgroundBorderWidth * 2,
                    height: this.previewSize.h + this.options.imageBackgroundBorderWidth * 2
                });
            }
            if (this.imageLoaded) {
                return this.setupZoomer();
            }
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
                cropit = new Cropit(this, options);
                return $.data(this, dataKey, cropit);
            });
        },
        isZoomable: function() {
            var cropit;
            cropit = this.first().data(dataKey);
            return cropit != null ? cropit.isZoomable() : void 0;
        },
        croppedImageData: function() {
            var cropit;
            cropit = this.first().data(dataKey);
            return cropit != null ? cropit.getCroppedImageData() : void 0;
        },
        imageState: function() {
            var cropit;
            cropit = this.first().data(dataKey);
            return cropit != null ? cropit.getImageState() : void 0;
        },
        imageSrc: function() {
            var cropit;
            cropit = this.first().data(dataKey);
            return cropit != null ? cropit.getImageSrc() : void 0;
        },
        offset: function() {
            var cropit;
            cropit = this.first().data(dataKey);
            return cropit != null ? cropit.getOffset() : void 0;
        },
        zoom: function() {
            var cropit;
            cropit = this.first().data(dataKey);
            return cropit != null ? cropit.getZoom() : void 0;
        },
        imageSize: function() {
            var cropit;
            cropit = this.first().data(dataKey);
            return cropit != null ? cropit.getImageSize() : void 0;
        },
        previewSize: function(newSize) {
            var cropit;
            if (arguments.length) {
                return this.each(function() {
                    var cropit;
                    cropit = $.data(this, dataKey);
                    return cropit != null ? cropit.setPreviewSize(newSize) : void 0;
                });
            } else {
                cropit = this.first().data(dataKey);
                return cropit != null ? cropit.getPreviewSize() : void 0;
            }
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