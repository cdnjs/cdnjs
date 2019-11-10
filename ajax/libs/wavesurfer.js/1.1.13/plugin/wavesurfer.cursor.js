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

WaveSurfer.Cursor = {
    init: function (wavesurfer) {
        var my = this;

        this.wavesurfer = wavesurfer;
        this.drawer = this.wavesurfer.drawer;
        this.wrapper = this.drawer.wrapper;

        this.wrapper.addEventListener('mousemove', function (e) {
            my.updateCursorPosition(my.drawer.handleEvent(e));
        });

        this.wrapper.addEventListener('mouseenter', function (e) {
            my.showCursor();
        });

        this.wrapper.addEventListener('mouseleave', function (e) {
            my.hideCursor();
        });

        this.cursor = this.wrapper.appendChild(
            this.drawer.style(document.createElement('wave'), {
                position: 'absolute',
                zIndex: 3,
                left: 0,
                top: 0,
                bottom: 0,
                width: '0',
                display: 'block',
                borderRightStyle: 'solid',
                borderRightWidth: 1 + 'px',
                borderRightColor: 'black',
                opacity: '.25',
                pointerEvents: 'none'
            })
        );
    },

    updateCursorPosition: function(progress) {
        var pos = Math.round(this.drawer.width * progress) / this.drawer.params.pixelRatio - 1;
        this.drawer.style(this.cursor, { left: pos + 'px' });
    },

    showCursor: function() {
        this.drawer.style(this.cursor, { display: 'block' });
    },

    hideCursor: function() {
        this.drawer.style(this.cursor, { display: 'none' });
    }
};

WaveSurfer.util.extend(WaveSurfer.Cursor, WaveSurfer.Observer);

WaveSurfer.enableCursor = function () {
    if (!this.cursor) {
        this.cursor = Object.create(WaveSurfer.Cursor);
        this.cursor.init(this);
    }
};

}));
