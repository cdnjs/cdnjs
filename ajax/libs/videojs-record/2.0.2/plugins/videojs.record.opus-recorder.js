/**
 * opus-recorder plugin for videojs-record
 * @version 2.0.2
 * @see https://github.com/collab-project/videojs-record
 * @copyright 2014-2017 Collab
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.opusRecorder = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file opus-recorder-plugin.js
 * @since 1.1.0
 */

var RecordEngine = videojs.getComponent('RecordEngine');

/**
 * Audio-only engine for the opus-recorder library.
 *
 * Audio is encoded using libopus.
 *
 * @class
 * @augments videojs.RecordEngine
 */

var OpusRecorderEngine = function (_RecordEngine) {
    _inherits(OpusRecorderEngine, _RecordEngine);

    function OpusRecorderEngine() {
        _classCallCheck(this, OpusRecorderEngine);

        return _possibleConstructorReturn(this, (OpusRecorderEngine.__proto__ || Object.getPrototypeOf(OpusRecorderEngine)).apply(this, arguments));
    }

    _createClass(OpusRecorderEngine, [{
        key: 'setup',

        /**
         * Setup recording engine.
         */
        value: function setup(stream, mediaType, debug) {
            this.inputStream = stream;
            this.mediaType = mediaType;
            this.debug = debug;

            this.engine = new Recorder({
                leaveStreamOpen: true,
                numberOfChannels: this.audioChannels,
                bufferLength: this.bufferSize,
                encoderSampleRate: this.sampleRate,
                encoderPath: this.audioWorkerURL
            });
            this.engine.addEventListener('dataAvailable', this.onRecordingAvailable.bind(this));

            this.engine.stream = stream;
            this.engine.sourceNode = this.engine.audioContext.createMediaStreamSource(stream);
            this.engine.sourceNode.connect(this.engine.filterNode || this.engine.scriptProcessorNode);
            this.engine.sourceNode.connect(this.engine.monitorNode);
            this.engine.eventTarget.dispatchEvent(new Event('streamReady'));
        }

        /**
         * Start recording.
         */

    }, {
        key: 'start',
        value: function start() {
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
         * Pause recording.
         */

    }, {
        key: 'pause',
        value: function pause() {
            this.engine.pause();
        }

        /**
         * Resume recording.
         */

    }, {
        key: 'resume',
        value: function resume() {
            this.engine.resume();
        }

        /**
         * @private
         */

    }, {
        key: 'onRecordingAvailable',
        value: function onRecordingAvailable(data) {
            // Opus format stored in an Ogg container
            var blob = new Blob([data.detail], { type: 'audio/ogg' });

            this.onStopRecording(blob);
        }
    }]);

    return OpusRecorderEngine;
}(RecordEngine);

// expose plugin


videojs.OpusRecorderEngine = OpusRecorderEngine;

exports.default = OpusRecorderEngine;

},{}]},{},[1])(1)
});