(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["./../wavesurfer"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("wavesurfer.js"));
  } else {
    factory(WaveSurfer);
  }
}(this, function (WaveSurfer) {

'use strict';

WaveSurfer.Timeline = {
    init: function (params) {
        this.params = params;
        var wavesurfer = this.wavesurfer = params.wavesurfer;

        if (!this.wavesurfer) {
            throw Error('No WaveSurfer intance provided');
        }

        var drawer = this.drawer = this.wavesurfer.drawer;

        this.container = 'string' == typeof params.container ?
            document.querySelector(params.container) : params.container;

        if (!this.container) {
            throw Error('No container for WaveSurfer timeline');
        }

        this.width = drawer.width;
        this.pixelRatio = this.drawer.params.pixelRatio;
        this.maxCanvasWidth = drawer.maxCanvasWidth || this.width;
        this.maxCanvasElementWidth = drawer.maxCanvasElementWidth || Math.round(this.maxCanvasWidth / this.pixelRatio);
        this.height = this.params.height || 20;
        this.notchPercentHeight = this.params.notchPercentHeight || 90;
        this.primaryColor = this.params.primaryColor || '#000';
        this.secondaryColor = this.params.secondaryColor || '#c0c0c0';
        this.primaryFontColor = this.params.primaryFontColor || '#000';
        this.secondaryFontColor = this.params.secondaryFontColor || '#000';
        this.fontFamily = this.params.fontFamily || 'Arial';
        this.fontSize = this.params.fontSize || 10;
        this.timeInterval = this.params.timeInterval;
        this.primaryLabelInterval = this.params.primaryLabelInterval;
        this.secondaryLabelInterval = this.params.secondaryLabelInterval;
        this.formatTimeCallback = this.params.formatTimeCallback;
        this.canvases = [];

        this.createWrapper();
        this.render();

        drawer.wrapper.addEventListener('scroll', function (e) {
            this.updateScroll(e);
        }.bind(this));
        wavesurfer.on('redraw', this.render.bind(this));
        wavesurfer.on('destroy', this.destroy.bind(this));
    },

    destroy: function () {
        this.unAll();
        if (this.wrapper && this.wrapper.parentNode) {
            this.wrapper.parentNode.removeChild(this.wrapper);
            this.wrapper = null;
        }
    },

    createWrapper: function () {
        var prevTimeline = this.container.querySelector('timeline');
        if (prevTimeline) {
            this.container.removeChild(prevTimeline);
        }

        var wsParams = this.wavesurfer.params;
        this.wrapper = this.container.appendChild(
            document.createElement('timeline')
        );
        this.drawer.style(this.wrapper, {
            display: 'block',
            position: 'relative',
            userSelect: 'none',
            webkitUserSelect: 'none',
            height: this.height + 'px'
        });

        if (wsParams.fillParent || wsParams.scrollParent) {
            this.drawer.style(this.wrapper, {
                width: '100%',
                overflowX: 'hidden',
                overflowY: 'hidden'
            });
        }

        var my = this;
        this.wrapper.addEventListener('click', function (e) {
            e.preventDefault();
            var relX = 'offsetX' in e ? e.offsetX : e.layerX;
            my.fireEvent('click', (relX / my.wrapper.scrollWidth) || 0);
        });
    },

    removeOldCanvases: function () {
        while (this.canvases.length > 0) {
            var canvas = this.canvases.pop();
            canvas.parentElement.removeChild(canvas);
        }
    },

    createCanvases: function () {
        this.removeOldCanvases();

        var totalWidth = Math.round(this.drawer.wrapper.scrollWidth),
            requiredCanvases = Math.ceil(totalWidth / this.maxCanvasElementWidth),
            canvas;

        for (var i = 0; i < requiredCanvases; i++) {
            canvas = this.wrapper.appendChild(document.createElement('canvas'));
            this.canvases.push(canvas);
            this.drawer.style(canvas, {
                position: 'absolute',
                zIndex: 4
            });
        }
    },

    render: function () {
        this.createCanvases();
        this.updateCanvasStyle();
        this.drawTimeCanvases();
    },

    updateCanvasStyle: function () {
        var requiredCanvases = this.canvases.length;
        for (var i = 0; i < requiredCanvases; i++) {
            var canvas = this.canvases[i],
                canvasWidth = this.maxCanvasElementWidth;

            if (i === requiredCanvases - 1) {
                canvasWidth = this.drawer.wrapper.scrollWidth - (this.maxCanvasElementWidth * (requiredCanvases - 1));
            }

            canvas.width = canvasWidth * this.pixelRatio;
            canvas.height = this.height * this.pixelRatio;
            canvas.style.width = canvasWidth + 'px';
            canvas.style.height = this.height + 'px';
            canvas.style.left = i * this.maxCanvasElementWidth + 'px';
        }
    },

    drawTimeCanvases: function() {
        var backend = this.wavesurfer.backend,
            wsParams = this.wavesurfer.params,
            duration = backend.getDuration(),
            self = this;

        if (wsParams.fillParent && !wsParams.scrollParent) {
            var width = this.drawer.getWidth();
        } else {
            width = this.drawer.wrapper.scrollWidth * wsParams.pixelRatio;
        }
        var pixelsPerSecond = width/duration;

        if (duration <= 0) { return; }

        var curPixel = 0,
            curSeconds = 0,
            totalSeconds = parseInt(duration, 10) + 1,
            formatTime = function(seconds) {
                if (typeof self.formatTimeCallback === 'function') {
                    return self.formatTimeCallback(seconds);
                }

                if (seconds/60 > 1) {
                    var minutes = parseInt(seconds / 60),
                        seconds = parseInt(seconds % 60);
                    seconds = (seconds < 10) ? '0' + seconds : seconds;
                    return '' + minutes + ':' + seconds;
                } else {
                    return seconds;
                }
            };

        if (pixelsPerSecond * 1 >= 25) {
            var timeInterval = 1;
            var primaryLabelInterval = 10;
            var secondaryLabelInterval = 5;
        } else if (pixelsPerSecond * 5 >= 25) {
            var timeInterval = 5;
            var primaryLabelInterval = 6;
            var secondaryLabelInterval = 2;
        } else if (pixelsPerSecond * 15 >= 25) {
            var timeInterval = 15;
            var primaryLabelInterval = 4;
            var secondaryLabelInterval = 2;
        } else {
            var timeInterval = 60;
            var primaryLabelInterval = 4;
            var secondaryLabelInterval = 2;
        }

        timeInterval = this.timeInterval || timeInterval;
        primaryLabelInterval = this.primaryLabelInterval || primaryLabelInterval;
        secondaryLabelInterval = this.secondaryLabelInterval || secondaryLabelInterval;

        var height1 = this.height - 4,
            height2 = (this.height * (this.notchPercentHeight / 100.0)) - 4,
            fontSize = this.fontSize * wsParams.pixelRatio;

        for (var i = 0; i < totalSeconds/timeInterval; i++) {
            if (i % primaryLabelInterval == 0) {
                this.setFillStyles(this.primaryColor);
                this.fillRect(curPixel, 0, 1, height1);
                this.setFonts(fontSize + 'px ' + this.fontFamily);
                this.setFillStyles(this.primaryFontColor);
                this.fillText(formatTime(curSeconds), curPixel + 5, height1);
            } else if (i % secondaryLabelInterval == 0) {
                this.setFillStyles(this.secondaryColor);
                this.fillRect(curPixel, 0, 1, height1);
                this.setFonts(fontSize + 'px ' + this.fontFamily);
                this.setFillStyles(this.secondaryFontColor);
                this.fillText(formatTime(curSeconds), curPixel + 5, height1);
            } else {
                this.setFillStyles(this.secondaryColor);
                this.fillRect(curPixel, 0, 1, height2);
            }

            curSeconds += timeInterval;
            curPixel += pixelsPerSecond * timeInterval;
        }
    },

    setFillStyles: function (fillStyle) {
        for (var i in this.canvases) {
            this.canvases[i].getContext('2d').fillStyle = fillStyle;
        }
    },

    setFonts: function (font) {
        for (var i in this.canvases) {
            this.canvases[i].getContext('2d').font = font;
        }
    },

    fillRect: function (x, y, width, height) {
        for (var i in this.canvases) {
            var canvas = this.canvases[i],
                leftOffset = i * this.maxCanvasWidth;

            var intersection = {
                x1: Math.max(x, i * this.maxCanvasWidth),
                y1: y,
                x2: Math.min(x + width, i * this.maxCanvasWidth + canvas.width),
                y2: y + height
            };

            if (intersection.x1 < intersection.x2) {
                canvas.getContext('2d').fillRect(
                    intersection.x1 - leftOffset,
                    intersection.y1,
                    intersection.x2 - intersection.x1,
                    intersection.y2 - intersection.y1);
            }
        }
    },

    fillText: function (text, x, y) {
        var textWidth,
            xOffset = 0;

        for (var i in this.canvases) {
            var context = this.canvases[i].getContext('2d'),
                canvasWidth = context.canvas.width;

            if (xOffset > x + textWidth) {
                break;
            }

            if (xOffset + canvasWidth > x) {
                textWidth = context.measureText(text).width;
                context.fillText(text, x - xOffset, y);
            }

            xOffset += canvasWidth;
        }
    },

    updateScroll: function () {
        this.wrapper.scrollLeft = this.drawer.wrapper.scrollLeft;
    }
};

WaveSurfer.util.extend(WaveSurfer.Timeline, WaveSurfer.Observer);


}));
