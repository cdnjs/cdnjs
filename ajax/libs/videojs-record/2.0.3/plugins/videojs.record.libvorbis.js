/**
 * libvorbis plugin for videojs-record
 * @version 2.0.3
 * @see https://github.com/collab-project/videojs-record
 * @copyright 2014-2017 Collab
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.libvorbis = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file libvorbis-plugin.js
 * @since 1.1.0
 */

var RecordEngine = videojs.getComponent('RecordEngine');

/**
 * Audio-only engine for the libvorbis.js library.
 *
 * @class
 * @augments videojs.RecordPlugin
 */

var LibVorbisEngine = function (_RecordEngine) {
    _inherits(LibVorbisEngine, _RecordEngine);

    function LibVorbisEngine() {
        _classCallCheck(this, LibVorbisEngine);

        return _possibleConstructorReturn(this, (LibVorbisEngine.__proto__ || Object.getPrototypeOf(LibVorbisEngine)).apply(this, arguments));
    }

    _createClass(LibVorbisEngine, [{
        key: 'setup',

        /**
         * Setup recording engine.
         */
        value: function setup(stream, mediaType, debug) {
            this.inputStream = stream;
            this.mediaType = mediaType;
            this.debug = debug;

            // setup libvorbis.js
            this.options = {
                audioBitsPerSecond: 32000
            };
        }

        /**
         * Start recording.
         */

    }, {
        key: 'start',
        value: function start() {
            this.chunks = [];
            this.engine = new VorbisMediaRecorder(this.inputStream, this.options);
            this.engine.ondataavailable = this.onData.bind(this);
            this.engine.onstop = this.onRecordingAvailable.bind(this);

            this.engine.start();
        }

        /**
         * Stop recording.
         */

    }, {
        key: 'stop',
        value: function stop() {
            this.engine.stop();
        }

        /**
         * @private
         */

    }, {
        key: 'onData',
        value: function onData(event) {
            this.chunks.push(event.data);
        }

        /**
         * @private
         */

    }, {
        key: 'onRecordingAvailable',
        value: function onRecordingAvailable() {
            var blob = new Blob(this.chunks, { type: this.chunks[0].type });
            this.chunks = [];
            this.onStopRecording(blob);
        }
    }]);

    return LibVorbisEngine;
}(RecordEngine);

// expose plugin


videojs.LibVorbisEngine = LibVorbisEngine;

exports.default = LibVorbisEngine;

},{}]},{},[1])(1)
});