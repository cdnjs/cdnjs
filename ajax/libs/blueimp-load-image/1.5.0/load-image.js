/*
 * JavaScript Load Image 1.5
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * iOS image scaling fixes based on
 * https://github.com/stomita/ios-imagefile-megapixel
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/*jslint nomen: true, bitwise: true */
/*global window, document, URL, webkitURL, Blob, File, FileReader, define */

(function ($) {
    'use strict';

    // Loads an image for a given File object.
    // Invokes the callback with an img or optional canvas
    // element (if supported by the browser) as parameter:
    var loadImage = function (file, callback, options) {
            var img = document.createElement('img'),
                url,
                oUrl;
            img.onerror = callback;
            img.onload = function () {
                if (oUrl && !(options && options.noRevoke)) {
                    loadImage.revokeObjectURL(oUrl);
                }
                if (callback) {
                    callback(loadImage.scale(img, options));
                }
            };
            if (loadImage.isInstanceOf('Blob', file) ||
                    // Files are also Blob instances, but some browsers
                    // (Firefox 3.6) support the File API but not Blobs:
                    loadImage.isInstanceOf('File', file)) {
                url = oUrl = loadImage.createObjectURL(file);
                // Store the file type for resize processing:
                img._type = file.type;
            } else if (typeof file === 'string') {
                url = file;
                if (options && options.crossOrigin) {
                    img.crossOrigin = options.crossOrigin;
                }
            } else {
                return false;
            }
            if (url) {
                img.src = url;
                return img;
            }
            return loadImage.readFile(file, function (e) {
                var target = e.target;
                if (target && target.result) {
                    img.src = target.result;
                } else {
                    if (callback) {
                        callback(e);
                    }
                }
            });
        },
        // The check for URL.revokeObjectURL fixes an issue with Opera 12,
        // which provides URL.createObjectURL but doesn't properly implement it:
        urlAPI = (window.createObjectURL && window) ||
            (window.URL && URL.revokeObjectURL && URL) ||
            (window.webkitURL && webkitURL);

    loadImage.isInstanceOf = function (type, obj) {
        // Cross-frame instanceof check
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    };

    // Detects subsampling in JPEG images:
    loadImage.detectSubsampling = function (img) {
        var canvas,
            context;
        if (img.width * img.height > 1024 * 1024) { // only consider mexapixel images
            canvas = document.createElement('canvas');
            canvas.width = canvas.height = 1;
            context = canvas.getContext('2d');
            context.drawImage(img, -img.width + 1, 0);
            // subsampled image becomes half smaller in rendering size.
            // check alpha channel value to confirm image is covering edge pixel or not.
            // if alpha value is 0 image is not covering, hence subsampled.
            return context.getImageData(0, 0, 1, 1).data[3] === 0;
        }
        return false;
    };

    // Detects vertical squash in JPEG images:
    loadImage.detectVerticalSquash = function (img, correctedHeight) {
        var canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            data,
            sy,
            ey,
            py,
            alpha;
        canvas.width = 1;
        canvas.height = correctedHeight;
        context.drawImage(img, 0, 0);
        data = context.getImageData(0, 0, 1, correctedHeight).data;
        // search image edge pixel position in case it is squashed vertically:
        sy = 0;
        ey = correctedHeight;
        py = correctedHeight;
        while (py > sy) {
            alpha = data[(py - 1) * 4 + 3];
            if (alpha === 0) {
                ey = py;
            } else {
                sy = py;
            }
            py = (ey + sy) >> 1;
        }
        return (py / correctedHeight) || 1;
    };

    // Renders image to canvas while working around iOS image scaling bugs:
    // https://github.com/blueimp/JavaScript-Load-Image/issues/13
    loadImage.renderImageToCanvas = function (
        canvas,
        img,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        destX,
        destY,
        destWidth,
        destHeight
    ) {
        var context = canvas.getContext('2d'),
            tmpCanvas = document.createElement('canvas'),
            tileSize = tmpCanvas.width = tmpCanvas.height = 1024,
            tmpContext = tmpCanvas.getContext('2d'),
            vertSquashRatio,
            tileX,
            tileY;
        context.save();
        if (loadImage.detectSubsampling(img)) {
            sourceWidth /= 2;
            sourceHeight /= 2;
        }
        vertSquashRatio = loadImage.detectVerticalSquash(img, sourceHeight);
        destWidth = Math.ceil(tileSize * destWidth / sourceWidth);
        destHeight = Math.ceil(
            tileSize * destHeight / sourceHeight / vertSquashRatio
        );
        destY = 0;
        tileY = 0;
        while (tileY < sourceHeight) {
            destX = 0;
            tileX = 0;
            while (tileX < sourceWidth) {
                tmpContext.clearRect(0, 0, tileSize, tileSize);
                tmpContext.drawImage(
                    img,
                    sourceX,
                    sourceY,
                    sourceWidth,
                    sourceHeight,
                    -tileX,
                    -tileY,
                    sourceWidth,
                    sourceHeight
                );
                context.drawImage(
                    tmpCanvas,
                    0,
                    0,
                    tileSize,
                    tileSize,
                    destX,
                    destY,
                    destWidth,
                    destHeight
                );
                tileX += tileSize;
                destX += destWidth;
            }
            tileY += tileSize;
            destY += destHeight;
        }
        context.restore();
    };

    // Scales the given image (img or canvas HTML element)
    // using the given options.
    // Returns a canvas object if the browser supports canvas
    // and the canvas or crop option is true or a canvas object
    // is passed as image, else the scaled image:
    loadImage.scale = function (img, options) {
        options = options || {};
        var canvas = document.createElement('canvas'),
            useCanvas = img.getContext ||
                ((options.canvas || options.crop) && canvas.getContext),
            width = img.width,
            height = img.height,
            maxWidth = options.maxWidth,
            maxHeight = options.maxHeight,
            sourceWidth = width,
            sourceHeight = height,
            sourceX = 0,
            sourceY = 0,
            destX = 0,
            destY = 0,
            destWidth,
            destHeight,
            scale;
        if (useCanvas && maxWidth && maxHeight && options.crop) {
            destWidth = maxWidth;
            destHeight = maxHeight;
            if (width / height < maxWidth / maxHeight) {
                sourceHeight = maxHeight * width / maxWidth;
                sourceY = (height - sourceHeight) / 2;
            } else {
                sourceWidth = maxWidth * height / maxHeight;
                sourceX = (width - sourceWidth) / 2;
            }
        } else {
            destWidth = width;
            destHeight = height;
            scale = Math.max(
                (options.minWidth || destWidth) / destWidth,
                (options.minHeight || destHeight) / destHeight
            );
            if (scale > 1) {
                destWidth = Math.ceil(destWidth * scale);
                destHeight = Math.ceil(destHeight * scale);
            }
            scale = Math.min(
                (maxWidth || destWidth) / destWidth,
                (maxHeight || destHeight) / destHeight
            );
            if (scale < 1) {
                destWidth = Math.ceil(destWidth * scale);
                destHeight = Math.ceil(destHeight * scale);
            }
        }
        if (useCanvas) {
            canvas.width = destWidth;
            canvas.height = destHeight;
            if (img._type === 'image/jpeg') {
                loadImage.renderImageToCanvas(
                    canvas,
                    img,
                    sourceX,
                    sourceY,
                    sourceWidth,
                    sourceHeight,
                    destX,
                    destY,
                    destWidth,
                    destHeight
                );
            } else {
                canvas.getContext('2d').drawImage(
                    img,
                    sourceX,
                    sourceY,
                    sourceWidth,
                    sourceHeight,
                    destX,
                    destY,
                    destWidth,
                    destHeight
                );
            }
            return canvas;
        }
        img.width = destWidth;
        img.height = destHeight;
        return img;
    };

    loadImage.createObjectURL = function (file) {
        return urlAPI ? urlAPI.createObjectURL(file) : false;
    };

    loadImage.revokeObjectURL = function (url) {
        return urlAPI ? urlAPI.revokeObjectURL(url) : false;
    };

    // Loads a given File object via FileReader interface,
    // invokes the callback with the event object (load or error).
    // The result can be read via event.target.result:
    loadImage.readFile = function (file, callback) {
        if (window.FileReader && FileReader.prototype.readAsDataURL) {
            var fileReader = new FileReader();
            fileReader.onload = fileReader.onerror = callback;
            fileReader.readAsDataURL(file);
            return fileReader;
        }
        return false;
    };

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return loadImage;
        });
    } else {
        $.loadImage = loadImage;
    }
}(this));
