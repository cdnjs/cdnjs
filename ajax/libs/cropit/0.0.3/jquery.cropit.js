/*
 *  cropit - v0.0.3
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
        Zoomer.prototype.isZoomable = function() {
            if (!(this.minZoom && this.maxZoom)) {
                return null;
            }
            return this.minZoom !== this.maxZoom;
        };
        return Zoomer;
    }();
    var Cropit, defaults;
    defaults = {
        exportZoom: 1,
        imageBackground: false,
        imageBackgroundBorderSize: 0,
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
            var $imageBgContainer, $previewContainer, imageBgBorderSize, _ref, _ref1, _ref2, _ref3, _ref4;
            this.$fileInput = this.options.$fileInput;
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
            if (this.options.width) {
                this.$preview.width(this.options.width);
            }
            if (this.options.height) {
                this.$preview.height(this.options.height);
            }
            this.previewSize = {
                w: this.options.width || this.$preview.width(),
                h: this.options.height || this.$preview.height()
            };
            if (this.options.imageBackground) {
                imageBgBorderSize = this.options.imageBackgroundBorderSize;
                $previewContainer = this.options.$previewContainer;
                this.$imageBg = $("<img />").addClass("cropit-image-background").attr("alt", "").css("position", "absolute");
                $imageBgContainer = $("<div />").addClass("cropit-image-background-container").css({
                    position: "absolute",
                    zIndex: 0,
                    top: -imageBgBorderSize,
                    left: -imageBgBorderSize,
                    width: this.previewSize.w + imageBgBorderSize * 2,
                    height: this.previewSize.h + imageBgBorderSize * 2
                }).append(this.$imageBg);
                $previewContainer.css("position", "relative").prepend($imageBgContainer);
                this.$preview.css("position", "relative");
                this.imageBgPreviewOffset = {
                    x: imageBgBorderSize + window.parseInt(this.$preview.css("border-left-width")),
                    y: imageBgBorderSize + window.parseInt(this.$preview.css("border-top-width"))
                };
            }
            this.initialZoomSliderPos = 0;
            this.disabled = true;
            this.imageSrc = ((_ref = this.options.imageState) != null ? _ref.src : void 0) || null;
            this.offset = ((_ref1 = this.options.imageState) != null ? _ref1.offset : void 0) || {
                x: 0,
                y: 0
            };
            this.zoom = ((_ref2 = this.options.imageState) != null ? _ref2.zoom : void 0) || null;
            this.sliderPos = ((_ref3 = this.options.imageState) != null ? _ref3.sliderPos : void 0) || this.initialZoomSliderPos;
            this.$imageZoomInput.val(this.sliderPos);
            this.moveContinue = false;
            this.zoomer = new Zoomer();
            this.$preview.on("mousedown mouseup mouseleave", this.handlePreviewEvent.bind(this));
            this.$fileInput.on("change", this.onFileChange.bind(this));
            this.$imageZoomInput.on("change mousemove", this.updateImageZoom.bind(this));
            if ((_ref4 = this.options.imageState) != null ? _ref4.src : void 0) {
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
            oFReader.readAsDataURL(file);
            return oFReader.onload = this.onFileReaderLoaded.bind(this);
        };
        Cropit.prototype.onFileReaderLoaded = function(e) {
            this.imageSrc = e.target.result;
            this.sliderPos = this.initialZoomSliderPos;
            this.offset = {
                x: 0,
                y: 0
            };
            return this.loadImage();
        };
        Cropit.prototype.loadImage = function() {
            var _base;
            this.$hiddenImage.attr("src", this.imageSrc);
            this.$preview.css("background-image", "url(" + this.imageSrc + ")");
            if (typeof (_base = this.options).onImageLoading === "function") {
                _base.onImageLoading();
            }
            return this.$hiddenImage.load(this.onImageLoaded.bind(this));
        };
        Cropit.prototype.onImageLoaded = function() {
            var _base;
            if (this.options.imageBackground) {
                this.$imageBg.attr("src", this.imageSrc);
            }
            this.imageSize = {
                w: this.$hiddenImage.width(),
                h: this.$hiddenImage.height()
            };
            this.zoomer.setup(this.imageSize, this.previewSize, this.options.exportZoom, this.options);
            this.$imageZoomInput.val(this.sliderPos);
            this.zoom = this.zoomer.getZoom(this.sliderPos);
            this.updateImageZoom();
            this.disabled = false;
            return typeof (_base = this.options).onImageLoaded === "function" ? _base.onImageLoaded() : void 0;
        };
        Cropit.prototype.handlePreviewEvent = function(e) {
            if (this.disabled) {
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
                this.updateImageOffset({
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
        Cropit.prototype.updateImageOffset = function(position) {
            var _ref, _ref1;
            if (!(((_ref = this.imageSize) != null ? _ref.w : void 0) && ((_ref1 = this.imageSize) != null ? _ref1.h : void 0))) {
                return;
            }
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
        Cropit.prototype.updateImageZoom = function() {
            var newX, newY, newZoom, oldZoom, updatedHeight, updatedWidth, _ref, _ref1;
            if (!(((_ref = this.imageSize) != null ? _ref.w : void 0) && ((_ref1 = this.imageSize) != null ? _ref1.h : void 0))) {
                return;
            }
            this.sliderPos = Number(this.$imageZoomInput.val());
            newZoom = this.zoomer.getZoom(this.sliderPos);
            updatedWidth = Math.round(this.imageSize.w * newZoom);
            updatedHeight = Math.round(this.imageSize.h * newZoom);
            oldZoom = this.zoom;
            newX = this.imageSize.w * oldZoom / 2 + this.offset.x - updatedWidth / 2;
            newY = this.imageSize.h * oldZoom / 2 + this.offset.y - updatedHeight / 2;
            this.zoom = newZoom;
            this.updateImageOffset({
                x: newX,
                y: newY
            });
            this.$preview.css("background-size", "" + updatedWidth + "px " + updatedHeight + "px");
            if (this.options.imageBackground) {
                return this.$imageBg.css({
                    width: updatedWidth,
                    height: updatedHeight
                });
            }
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
                zoom: this.zoom,
                sliderPos: this.sliderPos
            };
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
        getCroppedImageData: function() {
            var cropit;
            cropit = this.first().data(dataKey);
            return cropit != null ? cropit.getCroppedImageData() : void 0;
        },
        getImageState: function() {
            var cropit;
            cropit = this.first().data(dataKey);
            return cropit != null ? cropit.getImageState() : void 0;
        },
        getImageSize: function() {
            var cropit;
            cropit = this.first().data(dataKey);
            return cropit != null ? cropit.getImageSize() : void 0;
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