(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*!
     * @license MIT
     * Copyright (c) 2017 - 2018 Bernhard Grünewaldt
     * https://github.com/codeclou/bilderrahmen
     */
    var Bilderrahmen = /** @class */ (function () {
        function Bilderrahmen(options) {
            this.store = {
                current: {
                    galleryId: null,
                    index: null,
                },
                galleries: [],
                closeOnOutsideClick: false,
            };
            if (options !== undefined && options !== null) {
                if (options.closeOnOutsideClick !== undefined && options.closeOnOutsideClick !== null && options.closeOnOutsideClick === true) {
                    this.store.closeOnOutsideClick = true;
                }
            }
            this.init();
        }
        Bilderrahmen.prototype.__stopDefaultEvent = function (evt) {
            if (evt && evt.preventDefault) {
                evt.preventDefault();
            }
            else if (window.event && window.event.returnValue) {
                window.event.returnValue = false;
            }
        };
        Bilderrahmen.prototype._setCurrentOpenImage = function (galleryId, index) {
            this.store.current.galleryId = galleryId;
            this.store.current.index = index;
        };
        Bilderrahmen.prototype._getCurrentOpenImage = function () {
            return this.store.current;
        };
        Bilderrahmen.prototype._clearCurrentOpenImage = function () {
            this.store.current.galleryId = null;
            this.store.current.index = null;
        };
        Bilderrahmen.prototype._isCurrentOpenImage = function () {
            return this.store.current.galleryId !== null;
        };
        Bilderrahmen.prototype._getGallery = function (galleryId) {
            if (this.store[galleryId] === undefined || this.store[galleryId] === null) {
                this.store[galleryId] = [];
            }
            return this.store[galleryId];
        };
        Bilderrahmen.prototype._getImage = function (galleryId, index) {
            var gallery = this._getGallery(galleryId);
            if (gallery[index] === undefined || gallery[index] === null) {
                gallery[index] = {};
            }
            return gallery[index];
        };
        Bilderrahmen.prototype._isImage = function (galleryId, index) {
            var image = this._getImage(galleryId, index);
            return !(image.src === undefined || image.src === null);
        };
        Bilderrahmen.prototype._renderNextOrPreviousButton = function (galleryId, index, direction) {
            var self = this;
            var button = document.createElement('div');
            button.setAttribute('class', 'bilderrahmen--' + direction);
            if (self._isImage(galleryId, index)) {
                button.setAttribute('class', direction === 'left' ? 'bilderrahmen--left bilderrahmen--left--has-previous' : 'bilderrahmen--right bilderrahmen--right--has-next');
                button.onclick = function () { return self.open(galleryId, index); };
            }
            return button;
        };
        Bilderrahmen.prototype._generateId = function (galleryId, index) {
            return 'bilderrahmen--' + galleryId + '--' + index;
        };
        Bilderrahmen.prototype.closeIfOpen = function () {
            var self = this;
            var lightboxWrapper = document.getElementsByClassName('bilderrahmen-wrapper');
            if (lightboxWrapper[0] !== undefined && lightboxWrapper[0] !== null) {
                // IE11 does not support child.remove() but does child.parentNode.removeChild(child)
                lightboxWrapper[0].parentNode.removeChild(lightboxWrapper[0]);
            }
            self._clearCurrentOpenImage();
        };
        Bilderrahmen.prototype.open = function (galleryId, index) {
            this.closeIfOpen();
            this._setCurrentOpenImage(galleryId, index);
            this.create(galleryId, index);
        };
        Bilderrahmen.prototype.create = function (galleryId, index) {
            var self = this;
            var indexInt = parseInt(index, 10);
            // WRAPPER
            var wrapper = document.createElement('div');
            wrapper.setAttribute('class', 'bilderrahmen-wrapper');
            wrapper.setAttribute('data-bilderrahmen-gallery-id', galleryId);
            document.body.appendChild(wrapper);
            // TOPBAR
            var topBar = document.createElement('div');
            topBar.setAttribute('class', 'bilderrahmen--top');
            wrapper.appendChild(topBar);
            // TITLEBAR
            var titleBar = document.createElement('div');
            titleBar.setAttribute('class', 'bilderrahmen--top-title');
            titleBar.innerHTML = self._getImage(galleryId, index).title;
            topBar.appendChild(titleBar);
            // CLOSEBUTTON
            var closeButton = document.createElement('div');
            closeButton.setAttribute('class', 'bilderrahmen--top-close');
            closeButton.onclick = function () { return self.closeIfOpen(); };
            topBar.appendChild(closeButton);
            // PREVIOUS BUTTON
            wrapper.appendChild(self._renderNextOrPreviousButton(galleryId, indexInt - 1, 'left'));
            var currentImageOrVideo = self._getImage(galleryId, index);
            // IMAGE
            if (currentImageOrVideo.isVideo === false) {
                var image_1 = document.createElement('div');
                image_1.setAttribute('class', 'bilderrahmen--image');
                wrapper.appendChild(image_1);
                var imageInner = document.createElement('div');
                imageInner.setAttribute('class', 'bilderrahmen--image-inner');
                image_1.appendChild(imageInner);
                var imageInnerWrap = document.createElement('div');
                imageInnerWrap.setAttribute('class', 'bilderrahmen--image-inner-wrap');
                imageInner.appendChild(imageInnerWrap);
                var img = document.createElement('img');
                img.onload = function () {
                    image_1.setAttribute('class', 'bilderrahmen--image bilderrahmen--image-loaded');
                };
                img.setAttribute('src', self._getImage(galleryId, index).src);
                img.setAttribute('class', 'bilderrahmen--image-img');
                img.setAttribute('id', self._generateId(galleryId, index));
                imageInnerWrap.appendChild(img);
                //
                // CLOSE ON OUTSIDE CLICK
                //
                if (self.store.closeOnOutsideClick === true) {
                    imageInnerWrap.onclick = function () { return self.closeIfOpen(); };
                    img.addEventListener('click', function (event) {
                        return self.__stopDefaultEvent(event);
                    });
                }
            }
            // VIDEO
            if (currentImageOrVideo.isVideo === true) {
                var image_2 = document.createElement('div');
                image_2.setAttribute('class', 'bilderrahmen--image');
                wrapper.appendChild(image_2);
                var imageInner = document.createElement('div');
                imageInner.setAttribute('class', 'bilderrahmen--image-inner');
                image_2.appendChild(imageInner);
                var imageInnerWrap = document.createElement('div');
                imageInnerWrap.setAttribute('class', 'bilderrahmen--image-inner-wrap');
                imageInner.appendChild(imageInnerWrap);
                var video = document.createElement('video');
                video.onload = function () {
                    image_2.setAttribute('class', 'bilderrahmen--image bilderrahmen--image-loaded');
                };
                video.setAttribute('poster', currentImageOrVideo.poster);
                video.setAttribute('autoplay', '');
                video.setAttribute('controls', '');
                var source = document.createElement('source');
                source.setAttribute('src', currentImageOrVideo.src);
                source.setAttribute('type', 'video/mp4');
                video.appendChild(source);
                video.setAttribute('class', 'bilderrahmen--image-img');
                video.setAttribute('id', self._generateId(galleryId, index));
                imageInnerWrap.appendChild(video);
                //
                // CLOSE ON OUTSIDE CLICK
                //
                if (self.store.closeOnOutsideClick === true) {
                    imageInnerWrap.onclick = function () { return self.closeIfOpen(); };
                    video.addEventListener('click', function (event) {
                        return self.__stopDefaultEvent(event);
                    });
                }
            }
            // NEXT BUTTON
            wrapper.appendChild(self._renderNextOrPreviousButton(galleryId, indexInt + 1, 'right'));
            return false;
        };
        Bilderrahmen.prototype.init = function () {
            console.log('Bilderrahmen init()');
            var self = this;
            var lightboxElements = document.querySelectorAll('[data-bilderrahmen]');
            var _loop_1 = function (i) {
                var lightboxElement = lightboxElements[i];
                var galleryId = lightboxElement.getAttribute('data-bilderrahmen');
                var nextIndex = self._getGallery(galleryId).length;
                var nextImage = self._getImage(galleryId, nextIndex);
                nextImage.title = lightboxElement.getAttribute('data-bilderrahmen-title');
                var parentNode = lightboxElement.parentNode;
                if (lightboxElement.getAttribute('data-bilderrahmen-video')) {
                    nextImage.src = lightboxElement.getAttribute('data-bilderrahmen-video');
                    nextImage.poster = lightboxElement.getAttribute('src');
                    nextImage.isVideo = true;
                }
                else {
                    nextImage.src = parentNode.getAttribute('href');
                    nextImage.poster = null;
                    nextImage.isVideo = false;
                }
                //
                // THUMBNAIL CLICK OPENS LIGHTBOX
                //
                parentNode.addEventListener('click', function (event) {
                    self.open(galleryId, nextIndex);
                    return self.__stopDefaultEvent(event);
                });
            };
            for (var i = 0; i < lightboxElements.length; i++) {
                _loop_1(i);
            }
            //
            // CLOSE ON ESCAPE KEY PRESS
            //
            document.addEventListener('keydown', function (event) {
                if (event.keyCode === 27) {
                    self.closeIfOpen();
                }
                if (event.keyCode === 37) {
                    // left
                    if (self._isCurrentOpenImage()) {
                        var current = self._getCurrentOpenImage();
                        if (self._isImage(current.galleryId, current.index - 1)) {
                            self.open(current.galleryId, current.index - 1);
                        }
                    }
                }
                if (event.keyCode === 39) {
                    // right
                    if (self._isCurrentOpenImage()) {
                        var current = self._getCurrentOpenImage();
                        if (self._isImage(current.galleryId, current.index + 1)) {
                            self.open(current.galleryId, current.index + 1);
                        }
                    }
                }
            }, false);
        };
        return Bilderrahmen;
    }());
    exports.Bilderrahmen = Bilderrahmen;
});
