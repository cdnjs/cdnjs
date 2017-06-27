(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Grade = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var prefixes = ['webkit'];

var Grade = function () {
    function Grade(container, img_selector) {
        _classCallCheck(this, Grade);

        this.container = container;
        this.image = this.container.querySelector(img_selector) || this.container.querySelector('img');
        if (!this.image || !this.container) {
            return;
        }
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.imageDimensions = {
            width: 0,
            height: 0
        };
        this.imageData = [];
        this.readImage();
    }

    _createClass(Grade, [{
        key: 'readImage',
        value: function readImage() {
            this.imageDimensions.width = this.image.width * 0.1;
            this.imageDimensions.height = this.image.height * 0.1;
            this.render();
        }
    }, {
        key: 'getImageData',
        value: function getImageData() {
            var imageData = this.ctx.getImageData(0, 0, this.imageDimensions.width, this.imageDimensions.height).data;
            this.imageData = Array.from(imageData);
        }
    }, {
        key: 'getChunkedImageData',
        value: function getChunkedImageData() {
            var perChunk = 4;

            var chunked = this.imageData.reduce(function (ar, it, i) {
                var ix = Math.floor(i / perChunk);
                if (!ar[ix]) {
                    ar[ix] = [];
                }
                ar[ix].push(it);
                return ar;
            }, []);

            var filtered = chunked.filter(function (rgba) {
                return rgba.slice(0, 2).every(function (val) {
                    return val < 250;
                }) && rgba.slice(0, 2).every(function (val) {
                    return val > 0;
                });
            });

            return filtered;
        }
    }, {
        key: 'getRGBAGradientValues',
        value: function getRGBAGradientValues(top) {
            return top.map(function (color, index) {
                return 'rgb(' + color.rgba.slice(0, 3).join(',') + ') ' + (index == 0 ? '0%' : '75%');
            }).join(',');
        }
    }, {
        key: 'getCSSGradientProperty',
        value: function getCSSGradientProperty(top) {
            var val = this.getRGBAGradientValues(top);
            return prefixes.map(function (prefix) {
                return 'background-image: -' + prefix + '-linear-gradient(\n                        135deg,\n                        ' + val + '\n                    )';
            }).concat(['background-image: linear-gradient(\n                    135deg,\n                    ' + val + '\n                )']).join(';');
        }
    }, {
        key: 'getSortedValues',
        value: function getSortedValues(uniq) {
            var occurs = Object.keys(uniq).map(function (key) {
                var rgbaKey = key;
                var components = key.split('|'),
                    brightness = (components[0] * 299 + components[1] * 587 + components[2] * 114) / 1000;
                return {
                    rgba: rgbaKey.split('|'),
                    occurs: uniq[key],
                    brightness: brightness
                };
            }).sort(function (a, b) {
                return a.occurs - b.occurs;
            }).reverse().slice(0, 10);
            return occurs.sort(function (a, b) {
                return a.brightness - b.brightness;
            }).reverse();
        }
    }, {
        key: 'getTopValues',
        value: function getTopValues(uniq) {
            var sorted = this.getSortedValues(uniq);
            return [sorted[0], sorted[sorted.length - 1]];
        }
    }, {
        key: 'getUniqValues',
        value: function getUniqValues(chunked) {
            return chunked.reduce(function (accum, current) {
                var key = current.join('|');
                if (!accum[key]) {
                    accum[key] = 1;
                    return accum;
                }
                accum[key] = ++accum[key];
                return accum;
            }, {});
        }
    }, {
        key: 'renderGradient',
        value: function renderGradient() {
            var chunked = this.getChunkedImageData();
            var gradientProperty = this.getCSSGradientProperty(this.getTopValues(this.getUniqValues(chunked)));
            var style = (this.container.getAttribute('style') || '') + '; ' + gradientProperty;
            this.container.setAttribute('style', style);
        }
    }, {
        key: 'render',
        value: function render() {
            this.canvas.width = this.imageDimensions.width;
            this.canvas.height = this.imageDimensions.height;
            this.ctx.drawImage(this.image, 0, 0, this.imageDimensions.width, this.imageDimensions.height);
            this.getImageData();
            this.renderGradient();
        }
    }]);

    return Grade;
}();

module.exports = function (containers, img_selector) {
    NodeList.prototype.isPrototypeOf(containers) ? Array.from(containers).forEach(function (container) {
        return new Grade(container, img_selector);
    }) : new Grade(containers, img_selector);
};

},{}]},{},[1])(1)
});