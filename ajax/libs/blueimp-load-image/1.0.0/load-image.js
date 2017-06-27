/*
 * JavaScript Load Image 1.0
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://creativecommons.org/licenses/MIT/
 */

/*jslint nomen: true */
/*global window, document, Blob, URL, webkitURL, FileReader, define */

(function ($) {
    'use strict';

    // Loads an image for a given File object.
    // Invokes the callback with an img or optional canvas
    // element (if supported by the browser) as parameter:
    var loadImage = function (file, callback, options) {
            var img = document.createElement('img'),
                url,
                isFile;
            if (file instanceof Blob) {
                url = loadImage.createObjectURL(file);
                isFile = true;
            } else {
                url = file;
            }
            img.onerror = callback;
            img.onload = function () {
                if (isFile) {
                    loadImage.revokeObjectURL(url);
                }
                callback(loadImage.scale(img, options));
            };
            if (url) {
                img.src = url;
                return true;
            } else {
                return loadImage.readFile(file, function (url) {
                    img.src = url;
                });
            }
        },
        undef = 'undefined';

    // Scales the given image (img HTML element)
    // using the given options.
    // Returns a canvas object if the canvas option is true
    // and the browser supports canvas, else the scaled image:
    loadImage.scale = function (img, options) {
        options = options || {};
        var canvas = document.createElement('canvas'),
            scale = Math.min(
                (options.maxWidth || img.width) / img.width,
                (options.maxHeight || img.height) / img.height
            );
        if (scale >= 1) {
            scale = Math.max(
                (options.minWidth || img.width) / img.width,
                (options.minHeight || img.height) / img.height
            );
        }
        img.width = parseInt(img.width * scale, 10);
        img.height = parseInt(img.height * scale, 10);
        if (!options.canvas || !canvas.getContext) {
            return img;
        }
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d')
            .drawImage(img, 0, 0, img.width, img.height);
        return canvas;
    };

    loadImage.createObjectURL = function (file) {
        var urlAPI = (typeof window.createObjectURL !== undef && window) ||
                (typeof URL !== undef && URL) ||
                (typeof webkitURL !== undef && webkitURL);
        return urlAPI ? urlAPI.createObjectURL(file) : false;
    };

    loadImage.revokeObjectURL = function (url) {
        var urlAPI = (typeof window.revokeObjectURL !== undef && window) ||
                (typeof URL !== undef && URL) ||
                (typeof webkitURL !== undef && webkitURL);
        return urlAPI ? urlAPI.revokeObjectURL(url) : false;
    };

    // Loads a given File object via FileReader interface,
    // invokes the callback with a data url:
    loadImage.readFile = function (file, callback) {
        if (typeof FileReader !== undef &&
                FileReader.prototype.readAsDataURL) {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                callback(e.target.result);
            };
            fileReader.readAsDataURL(file);
            return true;
        }
        return false;
    };

    if (typeof define !== undef && define.amd) {
        // Register as an AMD module:
        define('loadImage', function () {
            return loadImage;
        });
    } else {
        // Bind to the global (window) object:
        $.loadImage = loadImage;
    }
}(this));
