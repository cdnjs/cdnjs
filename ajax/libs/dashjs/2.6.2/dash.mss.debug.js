(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EventsBase = (function () {
    function EventsBase() {
        _classCallCheck(this, EventsBase);
    }

    _createClass(EventsBase, [{
        key: 'extend',
        value: function extend(events, config) {
            if (!events) return;

            var override = config ? config.override : false;
            var publicOnly = config ? config.publicOnly : false;

            for (var evt in events) {
                if (!events.hasOwnProperty(evt) || this[evt] && !override) continue;
                if (publicOnly && events[evt].indexOf('public_') === -1) continue;
                this[evt] = events[evt];
            }
        }
    }]);

    return EventsBase;
})();

exports['default'] = EventsBase;
module.exports = exports['default'];

},{}],2:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _coreEventsEventsBase = _dereq_(1);

var _coreEventsEventsBase2 = _interopRequireDefault(_coreEventsEventsBase);

var MssEvents = (function (_EventsBase) {
    _inherits(MssEvents, _EventsBase);

    function MssEvents() {
        _classCallCheck(this, MssEvents);

        _get(Object.getPrototypeOf(MssEvents.prototype), 'constructor', this).call(this);

        this.FRAGMENT_INFO_LOADING_COMPLETED = 'fragmentInfoLoadingCompleted';
    }

    return MssEvents;
})(_coreEventsEventsBase2['default']);

var mssEvents = new MssEvents();
exports['default'] = mssEvents;
module.exports = exports['default'];

},{"1":1}],3:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _MssEvents = _dereq_(2);

var _MssEvents2 = _interopRequireDefault(_MssEvents);

var _MssFragmentMoofProcessor = _dereq_(4);

var _MssFragmentMoofProcessor2 = _interopRequireDefault(_MssFragmentMoofProcessor);

function MssFragmentInfoController(config) {

    var context = this.context;

    var instance = undefined;
    var fragmentModel = undefined;
    var indexHandler = undefined;
    var started = undefined;
    var type = undefined;
    var bufferTimeout = undefined;
    var _fragmentInfoTime = undefined;
    var startFragmentInfoDate = undefined;
    var startTimeStampValue = undefined;
    var deltaTime = undefined;
    var segmentDuration = undefined;

    var streamProcessor = config.streamProcessor;
    var eventBus = config.eventBus;
    var metricsModel = config.metricsModel;
    var playbackController = config.playbackController;
    var ISOBoxer = config.ISOBoxer;
    var log = config.log;

    function setup() {}

    function initialize() {
        started = false;

        startFragmentInfoDate = null;
        startTimeStampValue = null;
        deltaTime = 0;
        segmentDuration = NaN;

        // register to stream processor as external controller
        streamProcessor.registerExternalController(instance);
        type = streamProcessor.getType();
        fragmentModel = streamProcessor.getFragmentModel();
        indexHandler = streamProcessor.getIndexHandler();
    }

    function getCurrentRepresentation() {
        var representationController = streamProcessor.getRepresentationController();
        var representation = representationController.getCurrentRepresentation();

        return representation;
    }

    function sendRequest(request) {
        fragmentModel.executeRequest(request);
    }

    function asFragmentInfoRequest(request) {
        if (request && request.url) {
            request.url = request.url.replace('Fragments', 'FragmentInfo');
            request.type = 'FragmentInfoSegment';
        }

        return request;
    }

    function onFragmentRequest(request) {

        // Check if current request signals end of stream
        if (request !== null && request.action === request.ACTION_COMPLETE) {
            doStop();
            return;
        }

        if (request !== null) {
            _fragmentInfoTime = request.startTime + request.duration;
            request = asFragmentInfoRequest(request);

            if (streamProcessor.getFragmentModel().isFragmentLoadedOrPending(request)) {
                request = indexHandler.getNextSegmentRequest(getCurrentRepresentation());
                onFragmentRequest(request);
                return;
            }

            log('[FragmentInfoController][' + type + '] onFragmentRequest ' + request.url);

            // Download the fragment info segment
            sendRequest(request);
        } else {
            // No more fragment in current list
            log('[FragmentInfoController][' + type + '] bufferFragmentInfo failed');
        }
    }

    function bufferFragmentInfo() {
        var segmentTime;

        // Check if running state
        if (!started) {
            return;
        }

        log('[FragmentInfoController][' + type + '] Start buffering process...');

        // Get next segment time
        segmentTime = _fragmentInfoTime;

        log('[FragmentInfoController][' + type + '] loadNextFragment for time: ' + segmentTime);

        var representation = getCurrentRepresentation();
        var request = indexHandler.getSegmentRequestForTime(representation, segmentTime);
        onFragmentRequest(request);
    }

    function delayLoadNextFragmentInfo(delay) {
        var delayMs = Math.round(Math.min(delay * 1000, 2000));

        log('[FragmentInfoController][' + type + '] Check buffer delta = ' + delayMs + ' ms');

        clearTimeout(bufferTimeout);
        bufferTimeout = setTimeout(function () {
            bufferTimeout = null;
            bufferFragmentInfo();
        }, delayMs);
    }

    function onFragmentInfoLoadedCompleted(e) {
        if (e.streamProcessor !== streamProcessor) {
            return;
        }

        var request = e.fragmentInfo.request;
        var deltaDate = undefined,
            deltaTimeStamp = undefined;

        if (!e.fragmentInfo.response) {
            log('[FragmentInfoController][' + type + '] ERROR loading ', request.url);
            return;
        }

        segmentDuration = request.duration;
        log('[FragmentInfoController][' + type + '] FragmentInfo loaded ', request.url);
        try {

            // update segment list
            var mssFragmentMoofProcessor = (0, _MssFragmentMoofProcessor2['default'])(context).create({
                metricsModel: metricsModel,
                playbackController: playbackController,
                ISOBoxer: ISOBoxer,
                log: log
            });
            mssFragmentMoofProcessor.updateSegmentList(e.fragmentInfo, streamProcessor);

            deltaDate = (new Date().getTime() - startFragmentInfoDate) / 1000;
            deltaTimeStamp = _fragmentInfoTime + segmentDuration - startTimeStampValue;
            deltaTime = deltaTimeStamp - deltaDate > 0 ? deltaTimeStamp - deltaDate : 0;
            delayLoadNextFragmentInfo(deltaTime);
        } catch (e) {
            log('[FragmentInfoController][' + type + '] ERROR - Internal error while processing fragment info segment ');
        }
    }

    function startPlayback() {
        if (!started) {
            return;
        }

        startFragmentInfoDate = new Date().getTime();
        startTimeStampValue = _fragmentInfoTime;

        log('[FragmentInfoController][' + type + '] startPlayback');

        // Start buffering process
        bufferFragmentInfo.call(this);
    }

    function doStart() {

        var segments = undefined;

        if (started === true) {
            return;
        }

        eventBus.on(_MssEvents2['default'].FRAGMENT_INFO_LOADING_COMPLETED, onFragmentInfoLoadedCompleted, instance);

        started = true;
        log('[FragmentInfoController][' + type + '] START');

        var representation = getCurrentRepresentation();
        segments = representation.segments;

        if (segments) {
            _fragmentInfoTime = segments[segments.length - 1].presentationStartTime - segments[segments.length - 1].duration;

            startPlayback();
        } else {
            indexHandler.updateSegmentList(representation);
            segments = representation.segments;
            _fragmentInfoTime = segments[segments.length - 1].presentationStartTime - segments[segments.length - 1].duration;

            startPlayback();
        }
    }

    function doStop() {
        if (!started) {
            return;
        }
        log('[FragmentInfoController][' + type + '] STOP');

        eventBus.off(_MssEvents2['default'].FRAGMENT_INFO_LOADING_COMPLETED, onFragmentInfoLoadedCompleted, instance);

        // Stop buffering process
        clearTimeout(bufferTimeout);
        started = false;

        startFragmentInfoDate = null;
        startTimeStampValue = null;
    }

    function reset() {
        doStop();
        streamProcessor.unregisterExternalController(instance);
    }

    instance = {
        initialize: initialize,
        start: doStart,
        reset: reset
    };

    setup();

    return instance;
}

MssFragmentInfoController.__dashjs_factory_name = 'MssFragmentInfoController';
exports['default'] = dashjs.FactoryMaker.getClassFactory(MssFragmentInfoController);
/* jshint ignore:line */
module.exports = exports['default'];

},{"2":2,"4":4}],4:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @module MssFragmentMoovProcessor
 * @param {Object} config object
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
function MssFragmentMoofProcessor(config) {

    var instance = undefined;
    var metricsModel = config.metricsModel;
    var playbackController = config.playbackController;
    var ISOBoxer = config.ISOBoxer;
    var log = config.log;

    function setup() {}

    function processTfrf(request, tfrf, tfdt, streamProcessor) {
        var representationController = streamProcessor.getRepresentationController();
        var representation = representationController.getCurrentRepresentation();
        var indexHandler = streamProcessor.getIndexHandler();

        var manifest = representation.adaptation.period.mpd.manifest;
        var adaptation = manifest.Period_asArray[representation.adaptation.period.index].AdaptationSet_asArray[representation.adaptation.index];

        var segmentsUpdated = false;
        // Get adaptation's segment timeline (always a SegmentTimeline in Smooth Streaming use case)
        var segments = adaptation.SegmentTemplate.SegmentTimeline.S;
        var entries = tfrf.entry;
        var fragment_absolute_time = 0;
        var fragment_duration = 0;
        var segment = null;
        var t = 0;
        var i = 0;
        var j = 0;
        var segmentId = -1;
        var availabilityStartTime = null;
        var range = undefined;

        if (manifest.type !== 'dynamic') {
            return false;
        }

        // Go through tfrf entries
        while (i < entries.length) {
            fragment_absolute_time = entries[i].fragment_absolute_time;
            fragment_duration = entries[i].fragment_duration;

            // Get timestamp of the last segment
            segment = segments[segments.length - 1];
            t = segment.t;

            if (fragment_absolute_time > t) {
                log('[MssFragmentMoofProcessor]Add new segment - t = ' + fragment_absolute_time / 10000000.0);
                segments.push({
                    t: fragment_absolute_time,
                    d: fragment_duration
                });
                segmentsUpdated = true;
            }

            i += 1;
        }

        for (j = segments.length - 1; j >= 0; j -= 1) {
            if (segments[j].t === tfdt.baseMediaDecodeTime) {
                segmentId = j;
                break;
            }
        }

        if (segmentId >= 0) {
            for (i = 0; i < entries.length; i += 1) {
                if (segmentId + i < segments.length) {
                    t = segments[segmentId + i].t;
                    if (t + segments[segmentId + i].d !== entries[i].fragment_absolute_time) {
                        segments[segmentId + i].t = entries[i].fragment_absolute_time;
                        segments[segmentId + i].d = entries[i].fragment_duration;
                        log('[MssFragmentMoofProcessor]Correct tfrf time  = ' + entries[i].fragment_absolute_time + 'and duration = ' + entries[i].fragment_duration + '! ********');
                        segmentsUpdated = true;
                    }
                }
            }
        }

        //
        if (manifest.timeShiftBufferDepth && manifest.timeShiftBufferDepth > 0) {
            if (segmentsUpdated) {
                // Get timestamp of the last segment
                segment = segments[segments.length - 1];
                t = segment.t;

                // Determine the segments' availability start time
                availabilityStartTime = t - manifest.timeShiftBufferDepth * 10000000;

                // Remove segments prior to availability start time
                segment = segments[0];
                while (segment.t < availabilityStartTime) {
                    log('[MssFragmentMoofProcessor]Remove segment  - t = ' + segment.t / 10000000.0);
                    segments.splice(0, 1);
                    segment = segments[0];
                }
            }

            // Update DVR window range
            // => set range end to end time of current segment
            range = {
                start: segments[0].t / adaptation.SegmentTemplate.timescale,
                end: tfdt.baseMediaDecodeTime / adaptation.SegmentTemplate.timescale + request.duration
            };

            var dvrInfos = metricsModel.getMetricsFor(request.mediaType).DVRInfo;
            if (dvrInfos) {
                if (dvrInfos.length === 0 || dvrInfos.length > 0 && range.end > dvrInfos[dvrInfos.length - 1].range.end) {
                    log('[MssFragmentMoofProcessor][' + request.mediaType + '] Update DVR Infos [' + range.start + ' - ' + range.end + ']');
                    metricsModel.addDVRInfo(request.mediaType, playbackController.getTime(), streamProcessor.getStreamInfo().manifestInfo, range);
                }
            }
        }

        if (segmentsUpdated) {
            indexHandler.updateSegmentList(representation);
        }
        return segmentsUpdated;
    }

    // This function returns the offset of the 1st byte of a child box within a container box
    function getBoxOffset(parent, type) {
        var offset = 8;
        var i = 0;

        for (i = 0; i < parent.boxes.length; i++) {
            if (parent.boxes[i].type === type) {
                return offset;
            }
            offset += parent.boxes[i].size;
        }
        return offset;
    }

    function convertFragment(e, sp) {

        var i = undefined;

        // e.request contains request description object
        // e.response contains fragment bytes
        if (!e.response) {
            return;
        }
        var isoFile = ISOBoxer.parseBuffer(e.response);
        // Update track_Id in tfhd box
        var tfhd = isoFile.fetch('tfhd');
        tfhd.track_ID = e.request.mediaInfo.index + 1;

        // Add tfdt box
        var tfdt = isoFile.fetch('tfdt');
        var traf = isoFile.fetch('traf');
        if (tfdt === null) {
            tfdt = ISOBoxer.createFullBox('tfdt', traf, tfhd);
            tfdt.version = 1;
            tfdt.flags = 0;
            tfdt.baseMediaDecodeTime = Math.floor(e.request.startTime * e.request.timescale);
        }

        var trun = isoFile.fetch('trun');

        // Process tfxd boxes
        // This box provide absolute timestamp but we take the segment start time for tfdt
        var tfxd = isoFile.fetch('tfxd');
        if (tfxd) {
            tfxd._parent.boxes.splice(tfxd._parent.boxes.indexOf(tfxd), 1);
            tfxd = null;
        }
        var tfrf = isoFile.fetch('tfrf');
        if (tfrf) {
            processTfrf(e.request, tfrf, tfdt, sp);
            tfrf._parent.boxes.splice(tfrf._parent.boxes.indexOf(tfrf), 1);
            tfrf = null;
        }

        // If protected content in PIFF1.1 format (sepiff box = Sample Encryption PIFF)
        // => convert sepiff box it into a senc box
        // => create saio and saiz boxes (if not already present)
        var sepiff = isoFile.fetch('sepiff');
        if (sepiff !== null) {
            sepiff.type = 'senc';
            sepiff.usertype = undefined;

            var _saio = isoFile.fetch('saio');
            if (_saio === null) {
                // Create Sample Auxiliary Information Offsets Box box (saio)
                _saio = ISOBoxer.createFullBox('saio', traf);
                _saio.version = 0;
                _saio.flags = 0;
                _saio.entry_count = 1;
                _saio.offset = [0];

                var saiz = ISOBoxer.createFullBox('saiz', traf);
                saiz.version = 0;
                saiz.flags = 0;
                saiz.sample_count = sepiff.sample_count;
                saiz.default_sample_info_size = 0;
                saiz.sample_info_size = [];

                if (sepiff.flags & 0x02) {
                    // Sub-sample encryption => set sample_info_size for each sample
                    for (i = 0; i < sepiff.sample_count; i += 1) {
                        // 10 = 8 (InitializationVector field size) + 2 (subsample_count field size)
                        // 6 = 2 (BytesOfClearData field size) + 4 (BytesOfEncryptedData field size)
                        saiz.sample_info_size[i] = 10 + 6 * sepiff.entry[i].NumberOfEntries;
                    }
                } else {
                    // No sub-sample encryption => set default sample_info_size = InitializationVector field size (8)
                    saiz.default_sample_info_size = 8;
                }
            }
        }

        tfhd.flags &= 0xFFFFFE; // set tfhd.base-data-offset-present to false
        tfhd.flags |= 0x020000; // set tfhd.default-base-is-moof to true
        trun.flags |= 0x000001; // set trun.data-offset-present to true

        // Update trun.data_offset field that corresponds to first data byte (inside mdat box)
        var moof = isoFile.fetch('moof');
        var length = moof.getLength();
        trun.data_offset = length + 8;

        // Update saio box offset field according to new senc box offset
        var saio = isoFile.fetch('saio');
        if (saio !== null) {
            var trafPosInMoof = getBoxOffset(moof, 'traf');
            var sencPosInTraf = getBoxOffset(traf, 'senc');
            // Set offset from begin fragment to the first IV field in senc box
            saio.offset[0] = trafPosInMoof + sencPosInTraf + 16; // 16 = box header (12) + sample_count field size (4)
        }

        // Write transformed/processed fragment into request reponse data
        e.response = isoFile.write();
    }

    function updateSegmentList(e, sp) {

        // e.request contains request description object
        // e.response contains fragment bytes
        if (!e.response) {
            return;
        }

        var isoFile = ISOBoxer.parseBuffer(e.response);
        // Update track_Id in tfhd box
        var tfhd = isoFile.fetch('tfhd');
        tfhd.track_ID = e.request.mediaInfo.index + 1;

        // Add tfdt box
        var tfdt = isoFile.fetch('tfdt');
        var traf = isoFile.fetch('traf');
        if (tfdt === null) {
            tfdt = ISOBoxer.createFullBox('tfdt', traf, tfhd);
            tfdt.version = 1;
            tfdt.flags = 0;
            tfdt.baseMediaDecodeTime = Math.floor(e.request.startTime * e.request.timescale);
        }

        var tfrf = isoFile.fetch('tfrf');
        if (tfrf) {
            processTfrf(e.request, tfrf, tfdt, sp);
            tfrf._parent.boxes.splice(tfrf._parent.boxes.indexOf(tfrf), 1);
            tfrf = null;
        }
    }

    instance = {
        convertFragment: convertFragment,
        updateSegmentList: updateSegmentList
    };

    setup();
    return instance;
}

MssFragmentMoofProcessor.__dashjs_factory_name = 'MssFragmentMoofProcessor';
exports['default'] = dashjs.FactoryMaker.getClassFactory(MssFragmentMoofProcessor);
/* jshint ignore:line */
module.exports = exports['default'];

},{}],5:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @module MssFragmentMoovProcessor
 * @param {Object} config object
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
function MssFragmentMoovProcessor(config) {
    var TIME_SCALE = 10000000;
    var NALUTYPE_SPS = 7;
    var NALUTYPE_PPS = 8;
    var constants = config.constants;
    var ISOBoxer = config.ISOBoxer;

    var protectionController = config.protectionController;
    var instance = undefined,
        period = undefined,
        adaptationSet = undefined,
        representation = undefined,
        contentProtection = undefined,
        trackId = undefined;

    function createFtypBox(isoFile) {
        var ftyp = ISOBoxer.createBox('ftyp', isoFile);
        ftyp.major_brand = 'iso6';
        ftyp.minor_version = 1; // is an informative integer for the minor version of the major brand
        ftyp.compatible_brands = []; //is a list, to the end of the box, of brands isom, iso6 and msdh
        ftyp.compatible_brands[0] = 'isom'; // => decimal ASCII value for isom
        ftyp.compatible_brands[1] = 'iso6'; // => decimal ASCII value for iso6
        ftyp.compatible_brands[2] = 'msdh'; // => decimal ASCII value for msdh

        return ftyp;
    }

    function createMoovBox(isoFile) {

        // moov box
        var moov = ISOBoxer.createBox('moov', isoFile);

        // moov/mvhd
        createMvhdBox(moov);

        // moov/trak
        var trak = ISOBoxer.createBox('trak', moov);

        // moov/trak/tkhd
        createTkhdBox(trak);

        // moov/trak/mdia
        var mdia = ISOBoxer.createBox('mdia', trak);

        // moov/trak/mdia/mdhd
        createMdhdBox(mdia);

        // moov/trak/mdia/hdlr
        createHdlrBox(mdia);

        // moov/trak/mdia/minf
        var minf = ISOBoxer.createBox('minf', mdia);

        switch (adaptationSet.type) {
            case constants.VIDEO:
                // moov/trak/mdia/minf/vmhd
                createVmhdBox(minf);
                break;
            case constants.AUDIO:
                // moov/trak/mdia/minf/smhd
                createSmhdBox(minf);
                break;
            default:
                break;
        }

        // moov/trak/mdia/minf/dinf
        var dinf = ISOBoxer.createBox('dinf', minf);

        // moov/trak/mdia/minf/dinf/dref
        createDrefBox(dinf);

        // moov/trak/mdia/minf/stbl
        var stbl = ISOBoxer.createBox('stbl', minf);

        // Create empty stts, stsc, stco and stsz boxes
        // Use data field as for codem-isoboxer unknown boxes for setting fields value

        // moov/trak/mdia/minf/stbl/stts
        var stts = ISOBoxer.createFullBox('stts', stbl);
        stts._data = [0, 0, 0, 0, 0, 0, 0, 0]; // version = 0, flags = 0, entry_count = 0

        // moov/trak/mdia/minf/stbl/stsc
        var stsc = ISOBoxer.createFullBox('stsc', stbl);
        stsc._data = [0, 0, 0, 0, 0, 0, 0, 0]; // version = 0, flags = 0, entry_count = 0

        // moov/trak/mdia/minf/stbl/stco
        var stco = ISOBoxer.createFullBox('stco', stbl);
        stco._data = [0, 0, 0, 0, 0, 0, 0, 0]; // version = 0, flags = 0, entry_count = 0

        // moov/trak/mdia/minf/stbl/stsz
        var stsz = ISOBoxer.createFullBox('stsz', stbl);
        stsz._data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // version = 0, flags = 0, sample_size = 0, sample_count = 0

        // moov/trak/mdia/minf/stbl/stsd
        createStsdBox(stbl);

        // moov/mvex
        var mvex = ISOBoxer.createBox('mvex', moov);

        // moov/mvex/trex
        createTrexBox(mvex);

        if (contentProtection && protectionController) {
            var supportedKS = protectionController.getSupportedKeySystemsFromContentProtection(contentProtection);
            createProtectionSystemSpecificHeaderBox(moov, supportedKS);
        }
    }

    function createMvhdBox(moov) {

        var mvhd = ISOBoxer.createFullBox('mvhd', moov);

        mvhd.version = 1; // version = 1  in order to have 64bits duration value

        mvhd.creation_time = 0; // the creation time of the presentation => ignore (set to 0)
        mvhd.modification_time = 0; // the most recent time the presentation was modified => ignore (set to 0)
        mvhd.timescale = TIME_SCALE; // the time-scale for the entire presentation => 10000000 for MSS
        mvhd.duration = Math.round(period.duration * TIME_SCALE); // the length of the presentation (in the indicated timescale) =>  take duration of period
        mvhd.rate = 1.0; // 16.16 number, '1.0' = normal playback
        mvhd.volume = 1.0; // 8.8 number, '1.0' = full volume
        mvhd.reserved1 = 0;
        mvhd.reserved2 = [0x0, 0x0];
        mvhd.matrix = [1, 0, 0, // provides a transformation matrix for the video;
        0, 1, 0, // (u,v,w) are restricted here to (0,0,1)
        0, 0, 16384];
        mvhd.pre_defined = [0, 0, 0, 0, 0, 0];
        mvhd.next_track_ID = trackId + 1; // indicates a value to use for the track ID of the next track to be added to this presentation

        return mvhd;
    }

    function createTkhdBox(trak) {

        var tkhd = ISOBoxer.createFullBox('tkhd', trak);

        tkhd.version = 1; // version = 1  in order to have 64bits duration value
        tkhd.flags = 0x1 | // Track_enabled (0x000001): Indicates that the track is enabled
        0x2 | // Track_in_movie (0x000002):  Indicates that the track is used in the presentation
        0x4; // Track_in_preview (0x000004):  Indicates that the track is used when previewing the presentation

        tkhd.creation_time = 0; // the creation time of the presentation => ignore (set to 0)
        tkhd.modification_time = 0; // the most recent time the presentation was modified => ignore (set to 0)
        tkhd.track_ID = trackId; // uniquely identifies this track over the entire life-time of this presentation
        tkhd.reserved1 = 0;
        tkhd.duration = Math.round(period.duration * TIME_SCALE); // the duration of this track (in the timescale indicated in the Movie Header Box) =>  take duration of period
        tkhd.reserved2 = [0x0, 0x0];
        tkhd.layer = 0; // specifies the front-to-back ordering of video tracks; tracks with lower numbers are closer to the viewer => 0 since only one video track
        tkhd.alternate_group = 0; // specifies a group or collection of tracks => ignore
        tkhd.volume = 1.0; // '1.0' = full volume
        tkhd.reserved3 = 0;
        tkhd.matrix = [1, 0, 0, // provides a transformation matrix for the video;
        0, 1, 0, // (u,v,w) are restricted here to (0,0,1)
        0, 0, 16384];
        tkhd.width = representation.width; // visual presentation width
        tkhd.height = representation.height; // visual presentation height

        return tkhd;
    }

    function createMdhdBox(mdia) {

        var mdhd = ISOBoxer.createFullBox('mdhd', mdia);

        mdhd.version = 1; // version = 1  in order to have 64bits duration value

        mdhd.creation_time = 0; // the creation time of the presentation => ignore (set to 0)
        mdhd.modification_time = 0; // the most recent time the presentation was modified => ignore (set to 0)
        mdhd.timescale = TIME_SCALE; // the time-scale for the entire presentation
        mdhd.duration = Math.round(period.duration * TIME_SCALE); // the duration of this media (in the scale of the timescale). If the duration cannot be determined then duration is set to all 1s.
        mdhd.language = adaptationSet.lang || 'und'; // declares the language code for this media (see getLanguageCode())
        mdhd.pre_defined = 0;

        return mdhd;
    }

    function createHdlrBox(mdia) {

        var hdlr = ISOBoxer.createFullBox('hdlr', mdia);

        hdlr.pre_defined = 0;
        switch (adaptationSet.type) {
            case constants.VIDEO:
                hdlr.handler_type = 'vide';
                break;
            case constants.AUDIO:
                hdlr.handler_type = 'soun';
                break;
            default:
                hdlr.handler_type = 'meta';
                break;
        }
        hdlr.name = representation.id;
        hdlr.reserved = [0, 0, 0];

        return hdlr;
    }

    function createVmhdBox(minf) {

        var vmhd = ISOBoxer.createFullBox('vmhd', minf);

        vmhd.flags = 1;

        vmhd.graphicsmode = 0; // specifies a composition mode for this video track, from the following enumerated set, which may be extended by derived specifications: copy = 0 copy over the existing image
        vmhd.opcolor = [0, 0, 0]; // is a set of 3 colour values (red, green, blue) available for use by graphics modes

        return vmhd;
    }

    function createSmhdBox(minf) {

        var smhd = ISOBoxer.createFullBox('smhd', minf);

        smhd.flags = 1;

        smhd.balance = 0; // is a fixed-point 8.8 number that places mono audio tracks in a stereo space; 0 is centre (the normal value); full left is -1.0 and full right is 1.0.
        smhd.reserved = 0;

        return smhd;
    }

    function createDrefBox(dinf) {

        var dref = ISOBoxer.createFullBox('dref', dinf);

        dref.entry_count = 1;
        dref.entries = [];

        var url = ISOBoxer.createFullBox('url ', dref, false);
        url.location = '';
        url.flags = 1;

        dref.entries.push(url);

        return dref;
    }

    function createStsdBox(stbl) {

        var stsd = ISOBoxer.createFullBox('stsd', stbl);

        stsd.entries = [];
        switch (adaptationSet.type) {
            case constants.VIDEO:
            case constants.AUDIO:
                stsd.entries.push(createSampleEntry(stsd));
                break;
            default:
                break;
        }

        stsd.entry_count = stsd.entries.length; // is an integer that counts the actual entries
        return stsd;
    }

    function createSampleEntry(stsd) {
        var codec = representation.codecs.substring(0, representation.codecs.indexOf('.'));

        switch (codec) {
            case 'avc1':
                return createAVCVisualSampleEntry(stsd, codec);
            case 'mp4a':
                return createMP4AudioSampleEntry(stsd, codec);
            default:
                throw {
                    name: 'Unsupported codec',
                    message: 'Unsupported codec',
                    data: {
                        codec: codec
                    }
                };
        }
    }

    function createAVCVisualSampleEntry(stsd, codec) {
        var avc1 = undefined;

        if (contentProtection) {
            avc1 = ISOBoxer.createBox('encv', stsd, false);
        } else {
            avc1 = ISOBoxer.createBox('avc1', stsd, false);
        }

        // SampleEntry fields
        avc1.reserved1 = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0];
        avc1.data_reference_index = 1;

        // VisualSampleEntry fields
        avc1.pre_defined1 = 0;
        avc1.reserved2 = 0;
        avc1.pre_defined2 = [0, 0, 0];
        avc1.height = representation.height;
        avc1.width = representation.width;
        avc1.horizresolution = 72; // 72 dpi
        avc1.vertresolution = 72; // 72 dpi
        avc1.reserved3 = 0;
        avc1.frame_count = 1; // 1 compressed video frame per sample
        avc1.compressorname = [0x0A, 0x41, 0x56, 0x43, 0x20, 0x43, 0x6F, 0x64, // = 'AVC Coding';
        0x69, 0x6E, 0x67, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
        avc1.depth = 0x0018; // 0x0018 – images are in colour with no alpha.
        avc1.pre_defined3 = 65535;
        avc1.config = createAVC1ConfigurationRecord();
        if (contentProtection) {
            // Create and add Protection Scheme Info Box
            var sinf = ISOBoxer.createBox('sinf', avc1);

            // Create and add Original Format Box => indicate codec type of the encrypted content
            createOriginalFormatBox(sinf, codec);

            // Create and add Scheme Type box
            createSchemeTypeBox(sinf);

            // Create and add Scheme Information Box
            createSchemeInformationBox(sinf);
        }

        return avc1;
    }

    function createAVC1ConfigurationRecord() {

        var avcC = null;
        var avcCLength = 15; // length = 15 by default (0 SPS and 0 PPS)

        // First get all SPS and PPS from codecPrivateData
        var sps = [];
        var pps = [];
        var AVCProfileIndication = 0;
        var AVCLevelIndication = 0;
        var profile_compatibility = 0;

        var nalus = representation.codecPrivateData.split('00000001').slice(1);
        var naluBytes = undefined,
            naluType = undefined;

        for (var _i = 0; _i < nalus.length; _i++) {
            naluBytes = hexStringtoBuffer(nalus[_i]);

            naluType = naluBytes[0] & 0x1F;

            switch (naluType) {
                case NALUTYPE_SPS:
                    sps.push(naluBytes);
                    avcCLength += naluBytes.length + 2; // 2 = sequenceParameterSetLength field length
                    break;
                case NALUTYPE_PPS:
                    pps.push(naluBytes);
                    avcCLength += naluBytes.length + 2; // 2 = pictureParameterSetLength field length
                    break;
                default:
                    break;
            }
        }

        // Get profile and level from SPS
        if (sps.length > 0) {
            AVCProfileIndication = sps[0][1];
            profile_compatibility = sps[0][2];
            AVCLevelIndication = sps[0][3];
        }

        // Generate avcC buffer
        avcC = new Uint8Array(avcCLength);

        var i = 0;
        // length
        avcC[i++] = (avcCLength & 0xFF000000) >> 24;
        avcC[i++] = (avcCLength & 0x00FF0000) >> 16;
        avcC[i++] = (avcCLength & 0x0000FF00) >> 8;
        avcC[i++] = avcCLength & 0x000000FF;
        avcC.set([0x61, 0x76, 0x63, 0x43], i); // type = 'avcC'
        i += 4;
        avcC[i++] = 1; // configurationVersion = 1
        avcC[i++] = AVCProfileIndication;
        avcC[i++] = profile_compatibility;
        avcC[i++] = AVCLevelIndication;
        avcC[i++] = 0xFF; // '11111' + lengthSizeMinusOne = 3
        avcC[i++] = 0xE0 | sps.length; // '111' + numOfSequenceParameterSets
        for (var n = 0; n < sps.length; n++) {
            avcC[i++] = (sps[n].length & 0xFF00) >> 8;
            avcC[i++] = sps[n].length & 0x00FF;
            avcC.set(sps[n], i);
            i += sps[n].length;
        }
        avcC[i++] = pps.length; // numOfPictureParameterSets
        for (var n = 0; n < pps.length; n++) {
            avcC[i++] = (pps[n].length & 0xFF00) >> 8;
            avcC[i++] = pps[n].length & 0x00FF;
            avcC.set(pps[n], i);
            i += pps[n].length;
        }

        return avcC;
    }

    function createMP4AudioSampleEntry(stsd, codec) {
        var mp4a = undefined;

        if (contentProtection) {
            mp4a = ISOBoxer.createBox('enca', stsd, false);
        } else {
            mp4a = ISOBoxer.createBox('mp4a', stsd, false);
        }

        // SampleEntry fields
        mp4a.reserved1 = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0];
        mp4a.data_reference_index = 1;

        // AudioSampleEntry fields
        mp4a.reserved2 = [0x0, 0x0];
        mp4a.channelcount = representation.audioChannels;
        mp4a.samplesize = 16;
        mp4a.pre_defined = 0;
        mp4a.reserved_3 = 0;
        mp4a.samplerate = representation.audioSamplingRate << 16;

        mp4a.esds = createMPEG4AACESDescriptor();

        if (contentProtection) {
            // Create and add Protection Scheme Info Box
            var sinf = ISOBoxer.createBox('sinf', mp4a);

            // Create and add Original Format Box => indicate codec type of the encrypted content
            createOriginalFormatBox(sinf, codec);

            // Create and add Scheme Type box
            createSchemeTypeBox(sinf);

            // Create and add Scheme Information Box
            createSchemeInformationBox(sinf);
        }

        return mp4a;
    }

    function createMPEG4AACESDescriptor() {

        // AudioSpecificConfig (see ISO/IEC 14496-3, subpart 1) => corresponds to hex bytes contained in 'codecPrivateData' field
        var audioSpecificConfig = hexStringtoBuffer(representation.codecPrivateData);

        // ESDS length = esds box header length (= 12) +
        //               ES_Descriptor header length (= 5) +
        //               DecoderConfigDescriptor header length (= 15) +
        //               decoderSpecificInfo header length (= 2) +
        //               AudioSpecificConfig length (= codecPrivateData length)
        var esdsLength = 34 + audioSpecificConfig.length;
        var esds = new Uint8Array(esdsLength);

        var i = 0;
        // esds box
        esds[i++] = (esdsLength & 0xFF000000) >> 24; // esds box length
        esds[i++] = (esdsLength & 0x00FF0000) >> 16; // ''
        esds[i++] = (esdsLength & 0x0000FF00) >> 8; // ''
        esds[i++] = esdsLength & 0x000000FF; // ''
        esds.set([0x65, 0x73, 0x64, 0x73], i); // type = 'esds'
        i += 4;
        esds.set([0, 0, 0, 0], i); // version = 0, flags = 0
        i += 4;
        // ES_Descriptor (see ISO/IEC 14496-1 (Systems))
        esds[i++] = 0x03; // tag = 0x03 (ES_DescrTag)
        esds[i++] = 20 + audioSpecificConfig.length; // size
        esds[i++] = (trackId & 0xFF00) >> 8; // ES_ID = track_id
        esds[i++] = trackId & 0x00FF; // ''
        esds[i++] = 0; // flags and streamPriority

        // DecoderConfigDescriptor (see ISO/IEC 14496-1 (Systems))
        esds[i++] = 0x04; // tag = 0x04 (DecoderConfigDescrTag)
        esds[i++] = 15 + audioSpecificConfig.length; // size
        esds[i++] = 0x40; // objectTypeIndication = 0x40 (MPEG-4 AAC)
        esds[i] = 0x05 << 2; // streamType = 0x05 (Audiostream)
        esds[i] |= 0 << 1; // upStream = 0
        esds[i++] |= 1; // reserved = 1
        esds[i++] = 0xFF; // buffersizeDB = undefined
        esds[i++] = 0xFF; // ''
        esds[i++] = 0xFF; // ''
        esds[i++] = (representation.bandwidth & 0xFF000000) >> 24; // maxBitrate
        esds[i++] = (representation.bandwidth & 0x00FF0000) >> 16; // ''
        esds[i++] = (representation.bandwidth & 0x0000FF00) >> 8; // ''
        esds[i++] = representation.bandwidth & 0x000000FF; // ''
        esds[i++] = (representation.bandwidth & 0xFF000000) >> 24; // avgbitrate
        esds[i++] = (representation.bandwidth & 0x00FF0000) >> 16; // ''
        esds[i++] = (representation.bandwidth & 0x0000FF00) >> 8; // ''
        esds[i++] = representation.bandwidth & 0x000000FF; // ''

        // DecoderSpecificInfo (see ISO/IEC 14496-1 (Systems))
        esds[i++] = 0x05; // tag = 0x05 (DecSpecificInfoTag)
        esds[i++] = audioSpecificConfig.length; // size
        esds.set(audioSpecificConfig, i); // AudioSpecificConfig bytes

        return esds;
    }

    function createOriginalFormatBox(sinf, codec) {
        var frma = ISOBoxer.createBox('frma', sinf);
        frma.data_format = stringToCharCode(codec);
    }

    function createSchemeTypeBox(sinf) {
        var schm = ISOBoxer.createFullBox('schm', sinf);

        schm.flags = 0;
        schm.version = 0;
        schm.scheme_type = 0x63656E63; // 'cenc' => common encryption
        schm.scheme_version = 0x00010000; // version set to 0x00010000 (Major version 1, Minor version 0)
    }

    function createSchemeInformationBox(sinf) {
        var schi = ISOBoxer.createBox('schi', sinf);

        // Create and add Track Encryption Box
        createTrackEncryptionBox(schi);
    }

    function createProtectionSystemSpecificHeaderBox(moov, keySystems) {
        var pssh_bytes = undefined;
        var pssh = undefined;
        var i = undefined;
        var parsedBuffer = undefined;

        for (i = 0; i < keySystems.length; i += 1) {
            pssh_bytes = keySystems[i].initData;
            parsedBuffer = ISOBoxer.parseBuffer(pssh_bytes);
            pssh = parsedBuffer.fetch('pssh');
            if (pssh) {
                ISOBoxer.Utils.appendBox(moov, pssh);
            }
        }
    }

    function createTrackEncryptionBox(schi) {
        var tenc = ISOBoxer.createFullBox('tenc', schi);

        tenc.flags = 0;
        tenc.version = 0;

        tenc.default_IsEncrypted = 0x1;
        tenc.default_IV_size = 8;
        tenc.default_KID = contentProtection && contentProtection.length > 0 && contentProtection[0]['cenc:default_KID'] ? contentProtection[0]['cenc:default_KID'] : [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0];
    }

    function createTrexBox(moov) {

        var trex = ISOBoxer.createFullBox('trex', moov);

        trex.track_ID = trackId;
        trex.default_sample_description_index = 1;
        trex.default_sample_duration = 0;
        trex.default_sample_size = 0;
        trex.default_sample_flags = 0;

        return trex;
    }

    function hexStringtoBuffer(str) {
        var buf = new Uint8Array(str.length / 2);
        var i = undefined;

        for (i = 0; i < str.length / 2; i += 1) {
            buf[i] = parseInt('' + str[i * 2] + str[i * 2 + 1], 16);
        }
        return buf;
    }

    function stringToCharCode(str) {
        var code = 0;
        var i = undefined;

        for (i = 0; i < str.length; i += 1) {
            code |= str.charCodeAt(i) << (str.length - i - 1) * 8;
        }
        return code;
    }

    function generateMoov(rep) {
        if (!rep || !rep.adaptation) {
            return;
        }

        var isoFile = undefined,
            arrayBuffer = undefined;

        representation = rep;
        adaptationSet = representation.adaptation;

        period = adaptationSet.period;
        trackId = adaptationSet.index + 1;
        contentProtection = period.mpd.manifest.Period_asArray[period.index].AdaptationSet_asArray[adaptationSet.index].ContentProtection;

        isoFile = ISOBoxer.createFile();
        createFtypBox(isoFile);
        createMoovBox(isoFile);

        arrayBuffer = isoFile.write();

        return arrayBuffer;
    }

    instance = {
        generateMoov: generateMoov
    };

    return instance;
}

MssFragmentMoovProcessor.__dashjs_factory_name = 'MssFragmentMoovProcessor';
exports['default'] = dashjs.FactoryMaker.getClassFactory(MssFragmentMoovProcessor);
/* jshint ignore:line */
module.exports = exports['default'];

},{}],6:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _MssFragmentMoofProcessor = _dereq_(4);

var _MssFragmentMoofProcessor2 = _interopRequireDefault(_MssFragmentMoofProcessor);

var _MssFragmentMoovProcessor = _dereq_(5);

var _MssFragmentMoovProcessor2 = _interopRequireDefault(_MssFragmentMoovProcessor);

var _MssEvents = _dereq_(2);

var _MssEvents2 = _interopRequireDefault(_MssEvents);

// Add specific box processors not provided by codem-isoboxer library

function arrayEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every(function (element, index) {
        return element === arr2[index];
    });
}

function saioProcessor() {
    this._procFullBox();
    if (this.flags & 1) {
        this._procField('aux_info_type', 'uint', 32);
        this._procField('aux_info_type_parameter', 'uint', 32);
    }
    this._procField('entry_count', 'uint', 32);
    this._procFieldArray('offset', this.entry_count, 'uint', this.version === 1 ? 64 : 32);
}

function saizProcessor() {
    this._procFullBox();
    if (this.flags & 1) {
        this._procField('aux_info_type', 'uint', 32);
        this._procField('aux_info_type_parameter', 'uint', 32);
    }
    this._procField('default_sample_info_size', 'uint', 8);
    this._procField('sample_count', 'uint', 32);
    if (this.default_sample_info_size === 0) {
        this._procFieldArray('sample_info_size', this.sample_count, 'uint', 8);
    }
}

function sencProcessor() {
    this._procFullBox();
    this._procField('sample_count', 'uint', 32);
    if (this.flags & 1) {
        this._procField('IV_size', 'uint', 8);
    }
    this._procEntries('entry', this.sample_count, function (entry) {
        this._procEntryField(entry, 'InitializationVector', 'data', 8);
        if (this.flags & 2) {
            this._procEntryField(entry, 'NumberOfEntries', 'uint', 16);
            this._procSubEntries(entry, 'clearAndCryptedData', entry.NumberOfEntries, function (clearAndCryptedData) {
                this._procEntryField(clearAndCryptedData, 'BytesOfClearData', 'uint', 16);
                this._procEntryField(clearAndCryptedData, 'BytesOfEncryptedData', 'uint', 32);
            });
        }
    });
}

function uuidProcessor() {
    var tfxdUserType = [0x6D, 0x1D, 0x9B, 0x05, 0x42, 0xD5, 0x44, 0xE6, 0x80, 0xE2, 0x14, 0x1D, 0xAF, 0xF7, 0x57, 0xB2];
    var tfrfUserType = [0xD4, 0x80, 0x7E, 0xF2, 0xCA, 0x39, 0x46, 0x95, 0x8E, 0x54, 0x26, 0xCB, 0x9E, 0x46, 0xA7, 0x9F];
    var sepiffUserType = [0xA2, 0x39, 0x4F, 0x52, 0x5A, 0x9B, 0x4f, 0x14, 0xA2, 0x44, 0x6C, 0x42, 0x7C, 0x64, 0x8D, 0xF4];

    if (arrayEqual(this.usertype, tfxdUserType)) {
        this._procFullBox();
        if (this._parsing) {
            this.type = 'tfxd';
        }
        this._procField('fragment_absolute_time', 'uint', this.version === 1 ? 64 : 32);
        this._procField('fragment_duration', 'uint', this.version === 1 ? 64 : 32);
    }

    if (arrayEqual(this.usertype, tfrfUserType)) {
        this._procFullBox();
        if (this._parsing) {
            this.type = 'tfrf';
        }
        this._procField('fragment_count', 'uint', 8);
        this._procEntries('entry', this.fragment_count, function (entry) {
            this._procEntryField(entry, 'fragment_absolute_time', 'uint', this.version === 1 ? 64 : 32);
            this._procEntryField(entry, 'fragment_duration', 'uint', this.version === 1 ? 64 : 32);
        });
    }

    if (arrayEqual(this.usertype, sepiffUserType)) {
        if (this._parsing) {
            this.type = 'sepiff';
        }
        sencProcessor.call(this);
    }
}

function MssFragmentProcessor(config) {

    var context = this.context;
    var metricsModel = config.metricsModel;
    var playbackController = config.playbackController;
    var eventBus = config.eventBus;
    var protectionController = config.protectionController;
    var ISOBoxer = config.ISOBoxer;
    var log = config.log;
    var instance = undefined;

    function setup() {
        ISOBoxer.addBoxProcessor('uuid', uuidProcessor);
        ISOBoxer.addBoxProcessor('saio', saioProcessor);
        ISOBoxer.addBoxProcessor('saiz', saizProcessor);
        ISOBoxer.addBoxProcessor('senc', sencProcessor);
    }

    function generateMoov(rep) {
        var mssFragmentMoovProcessor = (0, _MssFragmentMoovProcessor2['default'])(context).create({ protectionController: protectionController, constants: config.constants, ISOBoxer: config.ISOBoxer });
        return mssFragmentMoovProcessor.generateMoov(rep);
    }

    function processFragment(e, sp) {
        if (!e) {
            return;
        }

        var request = e.request;

        if (!request) {
            return;
        }

        if (request.type === 'MediaSegment') {

            // it's a MediaSegment, let's convert fragment
            var mssFragmentMoofProcessor = (0, _MssFragmentMoofProcessor2['default'])(context).create({
                metricsModel: metricsModel,
                playbackController: playbackController,
                ISOBoxer: ISOBoxer,
                log: log
            });
            mssFragmentMoofProcessor.convertFragment(e, sp);
        } else if (request.type === 'FragmentInfoSegment') {

            // it's a FragmentInfo, ask relative fragment info controller to handle it
            eventBus.trigger(_MssEvents2['default'].FRAGMENT_INFO_LOADING_COMPLETED, {
                fragmentInfo: e,
                streamProcessor: sp
            });

            // Change the sender value to stop event to be propagated (fragment info must not be added to buffer)
            e.sender = null;
        }
    }

    instance = {
        generateMoov: generateMoov,
        processFragment: processFragment
    };

    setup();

    return instance;
}

MssFragmentProcessor.__dashjs_factory_name = 'MssFragmentProcessor';
exports['default'] = dashjs.FactoryMaker.getClassFactory(MssFragmentProcessor);
/* jshint ignore:line */
module.exports = exports['default'];

},{"2":2,"4":4,"5":5}],7:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _streamingVoDataChunk = _dereq_(10);

var _streamingVoDataChunk2 = _interopRequireDefault(_streamingVoDataChunk);

var _streamingVoFragmentRequest = _dereq_(11);

var _streamingVoFragmentRequest2 = _interopRequireDefault(_streamingVoFragmentRequest);

var _MssFragmentInfoController = _dereq_(3);

var _MssFragmentInfoController2 = _interopRequireDefault(_MssFragmentInfoController);

var _MssFragmentProcessor = _dereq_(6);

var _MssFragmentProcessor2 = _interopRequireDefault(_MssFragmentProcessor);

var _parserMssParser = _dereq_(9);

var _parserMssParser2 = _interopRequireDefault(_parserMssParser);

function MssHandler(config) {

    var context = this.context;
    var eventBus = config.eventBus;
    var events = config.events;
    var constants = config.constants;
    var initSegmentType = config.initSegmentType;
    var metricsModel = config.metricsModel;
    var playbackController = config.playbackController;
    var protectionController = config.protectionController;
    var mssFragmentProcessor = (0, _MssFragmentProcessor2['default'])(context).create({
        metricsModel: metricsModel,
        playbackController: playbackController,
        protectionController: protectionController,
        eventBus: eventBus,
        constants: constants,
        ISOBoxer: config.ISOBoxer,
        log: config.log
    });
    var mssParser = undefined;

    var instance = undefined;

    function setup() {}

    function onInitializationRequested(e) {
        var streamProcessor = e.sender.getStreamProcessor();
        var request = new _streamingVoFragmentRequest2['default']();
        var representationController = streamProcessor.getRepresentationController();
        var representation = representationController.getCurrentRepresentation();
        var period = undefined,
            presentationStartTime = undefined;

        period = representation.adaptation.period;

        request.mediaType = representation.adaptation.type;
        request.type = initSegmentType;
        request.range = representation.range;
        presentationStartTime = period.start;
        //request.availabilityStartTime = timelineConverter.calcAvailabilityStartTimeFromPresentationTime(presentationStartTime, representation.adaptation.period.mpd, isDynamic);
        //request.availabilityEndTime = timelineConverter.calcAvailabilityEndTimeFromPresentationTime(presentationStartTime + period.duration, period.mpd, isDynamic);
        request.quality = representation.index;
        request.mediaInfo = streamProcessor.getMediaInfo();
        request.representationId = representation.id;

        var chunk = createDataChunk(request, streamProcessor.getStreamInfo().id);

        // Generate initialization segment (moov)
        chunk.bytes = mssFragmentProcessor.generateMoov(representation);

        eventBus.trigger(events.INIT_FRAGMENT_LOADED, {
            chunk: chunk,
            fragmentModel: streamProcessor.getFragmentModel()
        });

        // Change the sender value to stop event to be propagated
        e.sender = null;
    }

    function createDataChunk(request, streamId) {
        var chunk = new _streamingVoDataChunk2['default']();

        chunk.streamId = streamId;
        chunk.mediaInfo = request.mediaInfo;
        chunk.segmentType = request.type;
        chunk.start = request.startTime;
        chunk.duration = request.duration;
        chunk.end = chunk.start + chunk.duration;
        chunk.index = request.index;
        chunk.quality = request.quality;
        chunk.representationId = request.representationId;

        return chunk;
    }

    function onSegmentMediaLoaded(e) {
        // Process moof to transcode it from MSS to DASH
        var streamProcessor = e.sender.getStreamProcessor();
        mssFragmentProcessor.processFragment(e, streamProcessor);
    }

    function onPlaybackSeekAsked() {
        if (playbackController.getIsDynamic() && playbackController.getTime() !== 0) {

            //create fragment info controllers for each stream processors of active stream (only for audio, video or fragmentedText)
            var streamController = playbackController.getStreamController();
            if (streamController) {
                var processors = streamController.getActiveStreamProcessors();
                processors.forEach(function (processor) {
                    if (processor.getType() === constants.VIDEO || processor.getType() === constants.AUDIO || processor.getType() === constants.FRAGMENTED_TEXT) {

                        var fragmentInfoController = (0, _MssFragmentInfoController2['default'])(context).create({
                            streamProcessor: processor,
                            eventBus: eventBus,
                            metricsModel: metricsModel,
                            playbackController: playbackController,
                            ISOBoxer: config.ISOBoxer,
                            log: config.log
                        });
                        fragmentInfoController.initialize();
                        fragmentInfoController.start();
                    }
                });
            }
        }
    }

    function registerEvents() {
        eventBus.on(events.INIT_REQUESTED, onInitializationRequested, instance, dashjs.FactoryMaker.getSingletonFactoryByName(eventBus.getClassName()).EVENT_PRIORITY_HIGH); /* jshint ignore:line */
        eventBus.on(events.PLAYBACK_SEEK_ASKED, onPlaybackSeekAsked, instance, dashjs.FactoryMaker.getSingletonFactoryByName(eventBus.getClassName()).EVENT_PRIORITY_HIGH); /* jshint ignore:line */
        eventBus.on(events.FRAGMENT_LOADING_COMPLETED, onSegmentMediaLoaded, instance, dashjs.FactoryMaker.getSingletonFactoryByName(eventBus.getClassName()).EVENT_PRIORITY_HIGH); /* jshint ignore:line */
    }

    function reset() {
        eventBus.off(events.INIT_REQUESTED, onInitializationRequested, this);
        eventBus.off(events.PLAYBACK_SEEK_ASKED, onPlaybackSeekAsked, this);
        eventBus.off(events.FRAGMENT_LOADING_COMPLETED, onSegmentMediaLoaded, this);
    }

    function createMssParser() {
        mssParser = (0, _parserMssParser2['default'])(context).create(config);
        return mssParser;
    }

    instance = {
        reset: reset,
        createMssParser: createMssParser,
        registerEvents: registerEvents
    };

    setup();

    return instance;
}

MssHandler.__dashjs_factory_name = 'MssHandler';
exports['default'] = dashjs.FactoryMaker.getClassFactory(MssHandler);
/* jshint ignore:line */
module.exports = exports['default'];

},{"10":10,"11":11,"3":3,"6":6,"9":9}],8:[function(_dereq_,module,exports){
(function (global){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _MssHandler = _dereq_(7);

var _MssHandler2 = _interopRequireDefault(_MssHandler);

// Shove both of these into the global scope
var context = typeof window !== 'undefined' && window || global;

var dashjs = context.dashjs;
if (!dashjs) {
  dashjs = context.dashjs = {};
}

dashjs.MssHandler = _MssHandler2['default'];

exports['default'] = dashjs;
exports.MssHandler = _MssHandler2['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"7":7}],9:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @module MssParser
 * @param {Object} config object
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
function MssParser(config) {
    var protectionController = config.protectionController;
    var BASE64 = config.BASE64;
    var log = config.log;
    var errorHandler = config.errHandler;
    var constants = config.constants;

    var TIME_SCALE_100_NANOSECOND_UNIT = 10000000.0;
    var SUPPORTED_CODECS = ['AAC', 'AACL', 'AVC1', 'H264', 'TTML', 'DFXP'];
    var samplingFrequencyIndex = {
        96000: 0x0,
        88200: 0x1,
        64000: 0x2,
        48000: 0x3,
        44100: 0x4,
        32000: 0x5,
        24000: 0x6,
        22050: 0x7,
        16000: 0x8,
        12000: 0x9,
        11025: 0xA,
        8000: 0xB,
        7350: 0xC
    };
    var mimeTypeMap = {
        'video': 'video/mp4',
        'audio': 'audio/mp4',
        'text': 'application/mp4'
    };

    var instance = undefined,
        mediaPlayerModel = undefined;

    function setup() {
        mediaPlayerModel = config.mediaPlayerModel;
    }

    function mapPeriod(smoothStreamingMedia) {
        var period = {};
        var streams = undefined,
            adaptation = undefined;

        period.duration = parseFloat(smoothStreamingMedia.getAttribute('Duration')) === 0 ? Infinity : parseFloat(smoothStreamingMedia.getAttribute('Duration')) / TIME_SCALE_100_NANOSECOND_UNIT;

        // For each StreamIndex node, create an AdaptationSet element
        period.AdaptationSet_asArray = [];
        streams = smoothStreamingMedia.getElementsByTagName('StreamIndex');
        for (var i = 0; i < streams.length; i++) {
            adaptation = mapAdaptationSet(streams[i]);
            if (adaptation !== null) {
                period.AdaptationSet_asArray.push(adaptation);
            }
        }

        if (period.AdaptationSet_asArray.length > 0) {
            period.AdaptationSet = period.AdaptationSet_asArray.length > 1 ? period.AdaptationSet_asArray : period.AdaptationSet_asArray[0];
        }

        return period;
    }

    function mapAdaptationSet(streamIndex) {

        var adaptationSet = {};
        var representations = [];
        var segmentTemplate = {};
        var qualityLevels = undefined,
            representation = undefined,
            segments = undefined,
            range = undefined,
            i = undefined;

        adaptationSet.id = streamIndex.getAttribute('Name') ? streamIndex.getAttribute('Name') : streamIndex.getAttribute('Type');
        adaptationSet.contentType = streamIndex.getAttribute('Type');
        adaptationSet.lang = streamIndex.getAttribute('Language') || 'und';
        adaptationSet.mimeType = mimeTypeMap[adaptationSet.contentType];
        adaptationSet.subType = streamIndex.getAttribute('Subtype');
        adaptationSet.maxWidth = streamIndex.getAttribute('MaxWidth');
        adaptationSet.maxHeight = streamIndex.getAttribute('MaxHeight');

        // Create a SegmentTemplate with a SegmentTimeline
        segmentTemplate = mapSegmentTemplate(streamIndex);

        qualityLevels = streamIndex.getElementsByTagName('QualityLevel');
        // For each QualityLevel node, create a Representation element
        for (i = 0; i < qualityLevels.length; i++) {
            // Propagate BaseURL and mimeType
            qualityLevels[i].BaseURL = adaptationSet.BaseURL;
            qualityLevels[i].mimeType = adaptationSet.mimeType;

            // Set quality level id
            qualityLevels[i].Id = adaptationSet.id + '_' + qualityLevels[i].getAttribute('Index');

            // Map Representation to QualityLevel
            representation = mapRepresentation(qualityLevels[i], streamIndex);

            if (representation !== null) {
                // Copy SegmentTemplate into Representation
                representation.SegmentTemplate = segmentTemplate;

                representations.push(representation);
            }
        }

        if (representations.length === 0) {
            return null;
        }

        adaptationSet.Representation = representations.length > 1 ? representations : representations[0];
        adaptationSet.Representation_asArray = representations;

        // Set SegmentTemplate
        adaptationSet.SegmentTemplate = segmentTemplate;

        segments = segmentTemplate.SegmentTimeline.S_asArray;

        range = {
            start: segments[0].t / segmentTemplate.timescale,
            end: (segments[segments.length - 1].t + segments[segments.length - 1].d) / segmentTemplate.timescale
        };

        return adaptationSet;
    }

    function mapRepresentation(qualityLevel, streamIndex) {

        var representation = {};
        var fourCCValue = null;

        representation.id = qualityLevel.Id;
        representation.bandwidth = parseInt(qualityLevel.getAttribute('Bitrate'), 10);
        representation.mimeType = qualityLevel.mimeType;
        representation.width = parseInt(qualityLevel.getAttribute('MaxWidth'), 10);
        representation.height = parseInt(qualityLevel.getAttribute('MaxHeight'), 10);

        fourCCValue = qualityLevel.getAttribute('FourCC');

        // If FourCC not defined at QualityLevel level, then get it from StreamIndex level
        if (fourCCValue === null) {
            fourCCValue = streamIndex.getAttribute('FourCC');
        }

        // If still not defined (optionnal for audio stream, see https://msdn.microsoft.com/en-us/library/ff728116%28v=vs.95%29.aspx),
        // then we consider the stream is an audio AAC stream
        if (fourCCValue === null) {
            fourCCValue = 'AAC';
        }

        // Check if codec is supported
        if (SUPPORTED_CODECS.indexOf(fourCCValue.toUpperCase()) === -1) {
            // Do not send warning
            //this.errHandler.sendWarning(MediaPlayer.dependencies.ErrorHandler.prototype.MEDIA_ERR_CODEC_UNSUPPORTED, 'Codec not supported', {codec: fourCCValue});
            log('[MssParser] Codec not supported: ' + fourCCValue);
            return null;
        }

        // Get codecs value according to FourCC field
        if (fourCCValue === 'H264' || fourCCValue === 'AVC1') {
            representation.codecs = getH264Codec(qualityLevel);
        } else if (fourCCValue.indexOf('AAC') >= 0) {
            representation.codecs = getAACCodec(qualityLevel, fourCCValue);
            representation.audioSamplingRate = parseInt(qualityLevel.getAttribute('SamplingRate'), 10);
            representation.audioChannels = parseInt(qualityLevel.getAttribute('Channels'), 10);
        } else if (fourCCValue.indexOf('TTML') || fourCCValue.indexOf('DFXP')) {
            representation.codecs = constants.STPP;
        }

        representation.codecPrivateData = '' + qualityLevel.getAttribute('CodecPrivateData');
        representation.BaseURL = qualityLevel.BaseURL;

        return representation;
    }

    function getH264Codec(qualityLevel) {
        var codecPrivateData = qualityLevel.getAttribute('CodecPrivateData').toString();
        var nalHeader = undefined,
            avcoti = undefined;

        // Extract from the CodecPrivateData field the hexadecimal representation of the following
        // three bytes in the sequence parameter set NAL unit.
        // => Find the SPS nal header
        nalHeader = /00000001[0-9]7/.exec(codecPrivateData);
        // => Find the 6 characters after the SPS nalHeader (if it exists)
        avcoti = nalHeader && nalHeader[0] ? codecPrivateData.substr(codecPrivateData.indexOf(nalHeader[0]) + 10, 6) : undefined;

        return 'avc1.' + avcoti;
    }

    function getAACCodec(qualityLevel, fourCCValue) {
        var objectType = 0;
        var codecPrivateData = qualityLevel.getAttribute('CodecPrivateData').toString();
        var samplingRate = parseInt(qualityLevel.getAttribute('SamplingRate'), 10);
        var codecPrivateDataHex = undefined,
            arr16 = undefined,
            indexFreq = undefined,
            extensionSamplingFrequencyIndex = undefined;

        //chrome problem, in implicit AAC HE definition, so when AACH is detected in FourCC
        //set objectType to 5 => strange, it should be 2
        if (fourCCValue === 'AACH') {
            objectType = 0x05;
        }
        //if codecPrivateData is empty, build it :
        if (codecPrivateData === undefined || codecPrivateData === '') {
            objectType = 0x02; //AAC Main Low Complexity => object Type = 2
            indexFreq = samplingFrequencyIndex[samplingRate];
            if (fourCCValue === 'AACH') {
                // 4 bytes :     XXXXX         XXXX          XXXX             XXXX                  XXXXX      XXX   XXXXXXX
                //           ' ObjectType' 'Freq Index' 'Channels value'   'Extens Sampl Freq'  'ObjectType'  'GAS' 'alignment = 0'
                objectType = 0x05; // High Efficiency AAC Profile = object Type = 5 SBR
                codecPrivateData = new Uint8Array(4);
                extensionSamplingFrequencyIndex = samplingFrequencyIndex[samplingRate * 2]; // in HE AAC Extension Sampling frequence
                // equals to SamplingRate*2
                //Freq Index is present for 3 bits in the first byte, last bit is in the second
                codecPrivateData[0] = objectType << 3 | indexFreq >> 1;
                codecPrivateData[1] = indexFreq << 7 | qualityLevel.Channels << 3 | extensionSamplingFrequencyIndex >> 1;
                codecPrivateData[2] = extensionSamplingFrequencyIndex << 7 | 0x02 << 2; // origin object type equals to 2 => AAC Main Low Complexity
                codecPrivateData[3] = 0x0; //alignment bits

                arr16 = new Uint16Array(2);
                arr16[0] = (codecPrivateData[0] << 8) + codecPrivateData[1];
                arr16[1] = (codecPrivateData[2] << 8) + codecPrivateData[3];
                //convert decimal to hex value
                codecPrivateDataHex = arr16[0].toString(16);
                codecPrivateDataHex = arr16[0].toString(16) + arr16[1].toString(16);
            } else {
                // 2 bytes :     XXXXX         XXXX          XXXX              XXX
                //           ' ObjectType' 'Freq Index' 'Channels value'   'GAS = 000'
                codecPrivateData = new Uint8Array(2);
                //Freq Index is present for 3 bits in the first byte, last bit is in the second
                codecPrivateData[0] = objectType << 3 | indexFreq >> 1;
                codecPrivateData[1] = indexFreq << 7 | parseInt(qualityLevel.getAttribute('Channels'), 10) << 3;
                // put the 2 bytes in an 16 bits array
                arr16 = new Uint16Array(1);
                arr16[0] = (codecPrivateData[0] << 8) + codecPrivateData[1];
                //convert decimal to hex value
                codecPrivateDataHex = arr16[0].toString(16);
            }

            codecPrivateData = '' + codecPrivateDataHex;
            codecPrivateData = codecPrivateData.toUpperCase();
            qualityLevel.setAttribute('CodecPrivateData', codecPrivateData);
        } else if (objectType === 0) {
            objectType = (parseInt(codecPrivateData.substr(0, 2), 16) & 0xF8) >> 3;
        }

        return 'mp4a.40.' + objectType;
    }

    function mapSegmentTemplate(streamIndex) {

        var segmentTemplate = {};
        var mediaUrl = undefined;

        mediaUrl = streamIndex.getAttribute('Url').replace('{bitrate}', '$Bandwidth$');
        mediaUrl = mediaUrl.replace('{start time}', '$Time$');

        segmentTemplate.media = mediaUrl;
        segmentTemplate.timescale = TIME_SCALE_100_NANOSECOND_UNIT;

        segmentTemplate.SegmentTimeline = mapSegmentTimeline(streamIndex);

        return segmentTemplate;
    }

    function mapSegmentTimeline(streamIndex) {

        var segmentTimeline = {};
        var chunks = streamIndex.getElementsByTagName('c');
        var segments = [];
        var segment = undefined;
        var prevSegment = undefined;
        var tManifest = undefined;
        var i = undefined;
        var duration = 0;

        for (i = 0; i < chunks.length; i++) {
            segment = {};

            // Get time 't' attribute value
            tManifest = chunks[i].getAttribute('t');

            // => segment.tManifest = original timestamp value as a string (for constructing the fragment request url, see DashHandler)
            // => segment.t = number value of timestamp (maybe rounded value, but only for 0.1 microsecond)
            segment.tManifest = parseFloat(tManifest);
            segment.t = parseFloat(tManifest);

            // Get duration 'd' attribute value
            segment.d = parseFloat(chunks[i].getAttribute('d'));

            // If 't' not defined for first segment then t=0
            if (i === 0 && !segment.t) {
                segment.t = 0;
            }

            if (i > 0) {
                prevSegment = segments[segments.length - 1];
                // Update previous segment duration if not defined
                if (!prevSegment.d) {
                    if (prevSegment.tManifest) {
                        prevSegment.d = parseFloat(tManifest) - parseFloat(prevSegment.tManifest);
                    } else {
                        prevSegment.d = segment.t - prevSegment.t;
                    }
                }
                // Set segment absolute timestamp if not set in manifest
                if (!segment.t) {
                    if (prevSegment.tManifest) {
                        segment.tManifest = parseFloat(prevSegment.tManifest) + prevSegment.d;
                        segment.t = parseFloat(segment.tManifest);
                    } else {
                        segment.t = prevSegment.t + prevSegment.d;
                    }
                }
            }

            duration += segment.d;

            // Create new segment
            segments.push(segment);
        }

        segmentTimeline.S = segments;
        segmentTimeline.S_asArray = segments;
        segmentTimeline.duration = duration / TIME_SCALE_100_NANOSECOND_UNIT;

        return segmentTimeline;
    }

    function getKIDFromProtectionHeader(protectionHeader) {
        var prHeader = undefined,
            wrmHeader = undefined,
            xmlReader = undefined,
            KID = undefined;

        // Get PlayReady header as byte array (base64 decoded)
        prHeader = BASE64.decodeArray(protectionHeader.firstChild.data);

        // Get Right Management header (WRMHEADER) from PlayReady header
        wrmHeader = getWRMHeaderFromPRHeader(prHeader);

        // Convert from multi-byte to unicode
        wrmHeader = new Uint16Array(wrmHeader.buffer);

        // Convert to string
        wrmHeader = String.fromCharCode.apply(null, wrmHeader);

        // Parse <WRMHeader> to get KID field value
        xmlReader = new DOMParser().parseFromString(wrmHeader, 'application/xml');
        KID = xmlReader.querySelector('KID').textContent;

        // Get KID (base64 decoded) as byte array
        KID = BASE64.decodeArray(KID);

        // Convert UUID from little-endian to big-endian
        convertUuidEndianness(KID);

        return KID;
    }

    function getWRMHeaderFromPRHeader(prHeader) {
        var length = undefined,
            recordCount = undefined,
            recordType = undefined,
            recordLength = undefined,
            recordValue = undefined;
        var i = 0;

        // Parse PlayReady header

        // Length - 32 bits (LE format)
        length = (prHeader[i + 3] << 24) + (prHeader[i + 2] << 16) + (prHeader[i + 1] << 8) + prHeader[i];
        i += 4;

        // Record count - 16 bits (LE format)
        recordCount = (prHeader[i + 1] << 8) + prHeader[i];
        i += 2;

        // Parse records
        while (i < prHeader.length) {
            // Record type - 16 bits (LE format)
            recordType = (prHeader[i + 1] << 8) + prHeader[i];
            i += 2;

            // Check if Rights Management header (record type = 0x01)
            if (recordType === 0x01) {

                // Record length - 16 bits (LE format)
                recordLength = (prHeader[i + 1] << 8) + prHeader[i];
                i += 2;

                // Record value => contains <WRMHEADER>
                recordValue = new Uint8Array(recordLength);
                recordValue.set(prHeader.subarray(i, i + recordLength));
                return recordValue;
            }
        }

        return null;
    }

    function convertUuidEndianness(uuid) {
        swapBytes(uuid, 0, 3);
        swapBytes(uuid, 1, 2);
        swapBytes(uuid, 4, 5);
        swapBytes(uuid, 6, 7);
    }

    function swapBytes(bytes, pos1, pos2) {
        var temp = bytes[pos1];
        bytes[pos1] = bytes[pos2];
        bytes[pos2] = temp;
    }

    function createPRContentProtection(protectionHeader) {
        var keySystems = protectionController ? protectionController.getKeySystems() : null;
        var ksPlayReady = undefined;

        for (var i = 0; i < keySystems.length; i++) {
            if (keySystems[i].systemString && keySystems[i].systemString.indexOf('playready') !== -1) {
                ksPlayReady = keySystems[i];
                break;
            }
        }

        var contentProtection = {};
        var pro = undefined;

        pro = {
            __text: protectionHeader.firstChild.data,
            __prefix: 'mspr'
        };

        if (ksPlayReady) {
            contentProtection.schemeIdUri = ksPlayReady.schemeIdURI;
            contentProtection.value = ksPlayReady.systemString;
            contentProtection.pro = pro;
            contentProtection.pro_asArray = pro;
        }

        return contentProtection;
    }

    function createWidevineContentProtection() /*protectionHeader*/{
        var keySystems = protectionController ? protectionController.getKeySystems() : null;
        var ksWidevine = undefined;

        for (var i = 0; i < keySystems.length; i++) {
            if (keySystems[i].systemString && keySystems[i].systemString.indexOf('widevine') !== -1) {
                ksWidevine = keySystems[i];
                break;
            }
        }

        var contentProtection = {};
        if (ksWidevine) {
            contentProtection.schemeIdUri = ksWidevine.schemeIdURI;
            contentProtection.value = ksWidevine.systemString;
        }

        return contentProtection;
    }

    function processManifest(xmlDoc, manifestLoadedTime) {
        var manifest = {};
        var contentProtections = [];
        var smoothStreamingMedia = xmlDoc.getElementsByTagName('SmoothStreamingMedia')[0];
        var protection = xmlDoc.getElementsByTagName('Protection')[0];
        var protectionHeader = null;
        var period = undefined,
            adaptations = undefined,
            contentProtection = undefined,
            KID = undefined,
            timestampOffset = undefined,
            startTime = undefined,
            segments = undefined,
            i = undefined,
            j = undefined;

        // Set manifest node properties
        manifest.protocol = 'MSS';
        manifest.profiles = 'urn:mpeg:dash:profile:isoff-live:2011';
        manifest.type = smoothStreamingMedia.getAttribute('IsLive') === 'TRUE' ? 'dynamic' : 'static';
        manifest.timeShiftBufferDepth = parseFloat(smoothStreamingMedia.getAttribute('DVRWindowLength')) / TIME_SCALE_100_NANOSECOND_UNIT;
        manifest.mediaPresentationDuration = parseFloat(smoothStreamingMedia.getAttribute('Duration')) === 0 ? Infinity : parseFloat(smoothStreamingMedia.getAttribute('Duration')) / TIME_SCALE_100_NANOSECOND_UNIT;
        manifest.minBufferTime = mediaPlayerModel.getStableBufferTime();
        manifest.ttmlTimeIsRelative = true;

        // In case of live streams, set availabilityStartTime property according to DVRWindowLength
        if (manifest.type === 'dynamic') {
            manifest.availabilityStartTime = new Date(manifestLoadedTime.getTime() - manifest.timeShiftBufferDepth * 1000);
            manifest.refreshManifestOnSwitchTrack = true;
            manifest.doNotUpdateDVRWindowOnBufferUpdated = true; // done by Mss fragment processor
            manifest.ignorePostponeTimePeriod = true; // in Mss, manifest is never updated
        }

        // Map period node to manifest root node
        manifest.Period = mapPeriod(smoothStreamingMedia);
        manifest.Period_asArray = [manifest.Period];

        // Initialize period start time
        period = manifest.Period;
        period.start = 0;

        // ContentProtection node
        if (protection !== undefined) {
            protectionHeader = xmlDoc.getElementsByTagName('ProtectionHeader')[0];

            // Some packagers put newlines into the ProtectionHeader base64 string, which is not good
            // because this cannot be correctly parsed. Let's just filter out any newlines found in there.
            protectionHeader.firstChild.data = protectionHeader.firstChild.data.replace(/\n|\r/g, '');

            // Get KID (in CENC format) from protection header
            KID = getKIDFromProtectionHeader(protectionHeader);

            // Create ContentProtection for PlayReady
            contentProtection = createPRContentProtection(protectionHeader);
            contentProtection['cenc:default_KID'] = KID;
            contentProtections.push(contentProtection);

            // Create ContentProtection for Widevine (as a CENC protection)
            contentProtection = createWidevineContentProtection(protectionHeader);
            contentProtection['cenc:default_KID'] = KID;
            contentProtections.push(contentProtection);

            manifest.ContentProtection = contentProtections;
            manifest.ContentProtection_asArray = contentProtections;
        }

        adaptations = period.AdaptationSet_asArray;

        for (i = 0; i < adaptations.length; i += 1) {
            adaptations[i].SegmentTemplate.initialization = '$Bandwidth$';
            // Propagate content protection information into each adaptation
            if (manifest.ContentProtection !== undefined) {
                adaptations[i].ContentProtection = manifest.ContentProtection;
                adaptations[i].ContentProtection_asArray = manifest.ContentProtection_asArray;
            }

            if (manifest.type === 'dynamic') {
                // Match timeShiftBufferDepth to video segment timeline duration
                if (manifest.timeShiftBufferDepth > 0 && adaptations[i].contentType === 'video' && manifest.timeShiftBufferDepth > adaptations[i].SegmentTemplate.SegmentTimeline.duration) {
                    manifest.timeShiftBufferDepth = adaptations[i].SegmentTemplate.SegmentTimeline.duration;
                }
            }
        }

        if (manifest.timeShiftBufferDepth < manifest.minBufferTime) {
            manifest.minBufferTime = manifest.timeShiftBufferDepth;
        }

        // Delete Content Protection under root manifest node
        delete manifest.ContentProtection;
        delete manifest.ContentProtection_asArray;

        // In case of VOD streams, check if start time is greater than 0
        // Then determine timestamp offset according to higher audio/video start time
        // (use case = live stream delinearization)
        if (manifest.type === 'static') {
            for (i = 0; i < adaptations.length; i++) {
                if (adaptations[i].contentType === 'audio' || adaptations[i].contentType === 'video') {
                    segments = adaptations[i].SegmentTemplate.SegmentTimeline.S_asArray;
                    startTime = segments[0].t;
                    if (!timestampOffset) {
                        timestampOffset = startTime;
                    }
                    timestampOffset = Math.min(timestampOffset, startTime);
                    // Correct content duration according to minimum adaptation's segments duration
                    // in order to force <video> element sending 'ended' event
                    manifest.mediaPresentationDuration = Math.min(manifest.mediaPresentationDuration, ((segments[segments.length - 1].t + segments[segments.length - 1].d) / TIME_SCALE_100_NANOSECOND_UNIT).toFixed(3));
                }
            }

            // Patch segment templates timestamps and determine period start time (since audio/video should not be aligned to 0)
            if (timestampOffset > 0) {
                for (i = 0; i < adaptations.length; i++) {
                    segments = adaptations[i].SegmentTemplate.SegmentTimeline.S_asArray;
                    for (j = 0; j < segments.length; j++) {
                        if (!segments[j].tManifest) {
                            segments[j].tManifest = segments[j].t;
                        }
                        segments[j].t -= timestampOffset;
                    }
                    if (adaptations[i].contentType === 'audio' || adaptations[i].contentType === 'video') {
                        period.start = Math.max(segments[0].t, period.start);
                    }
                }
                period.start /= TIME_SCALE_100_NANOSECOND_UNIT;
            }
        }

        period.duration = manifest.mediaPresentationDuration;

        return manifest;
    }

    function parseDOM(data) {

        var xmlDoc = null;

        if (window.DOMParser) {
            try {
                var parser = new window.DOMParser();

                xmlDoc = parser.parseFromString(data, 'text/xml');
                if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
                    throw new Error('Error parsing XML');
                }
            } catch (e) {
                errorHandler.manifestError('parsing the manifest failed', 'parse', data, e);
                xmlDoc = null;
            }
        }

        return xmlDoc;
    }

    function getMatchers() {
        return null;
    }

    function getIron() {
        return null;
    }

    function internalParse(data) {
        var xmlDoc = null;
        var manifest = null;

        var startTime = window.performance.now();

        // Parse the MSS XML manifest
        xmlDoc = parseDOM(data);

        var xmlParseTime = window.performance.now();

        if (xmlDoc === null) {
            return null;
        }

        // Convert MSS manifest into DASH manifest
        manifest = processManifest(xmlDoc, new Date());

        var mss2dashTime = window.performance.now();

        log('Parsing complete: (xmlParsing: ' + (xmlParseTime - startTime).toPrecision(3) + 'ms, mss2dash: ' + (mss2dashTime - xmlParseTime).toPrecision(3) + 'ms, total: ' + ((mss2dashTime - startTime) / 1000).toPrecision(3) + 's)');

        return manifest;
    }

    instance = {
        parse: internalParse,
        getMatchers: getMatchers,
        getIron: getIron
    };

    setup();

    return instance;
}

MssParser.__dashjs_factory_name = 'MssParser';
exports['default'] = dashjs.FactoryMaker.getClassFactory(MssParser);
/* jshint ignore:line */
module.exports = exports['default'];

},{}],10:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @class
 * @ignore
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataChunk =
//Represents a data structure that keep all the necessary info about a single init/media segment
function DataChunk() {
  _classCallCheck(this, DataChunk);

  this.streamId = null;
  this.mediaInfo = null;
  this.segmentType = null;
  this.quality = NaN;
  this.index = NaN;
  this.bytes = null;
  this.start = NaN;
  this.end = NaN;
  this.duration = NaN;
  this.representationId = null;
};

exports["default"] = DataChunk;
module.exports = exports["default"];

},{}],11:[function(_dereq_,module,exports){
/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
/**
 * @class
 * @ignore
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var FragmentRequest = function FragmentRequest() {
  _classCallCheck(this, FragmentRequest);

  this.action = FragmentRequest.ACTION_DOWNLOAD;
  this.startTime = NaN;
  this.mediaType = null;
  this.mediaInfo = null;
  this.type = null;
  this.duration = NaN;
  this.timescale = NaN;
  this.range = null;
  this.url = null;
  this.serviceLocation = null;
  this.requestStartDate = null;
  this.firstByteDate = null;
  this.requestEndDate = null;
  this.quality = NaN;
  this.index = NaN;
  this.availabilityStartTime = null;
  this.availabilityEndTime = null;
  this.wallStartTime = null;
  this.bytesLoaded = NaN;
  this.bytesTotal = NaN;
  this.delayLoadingTime = NaN;
  this.responseType = 'arraybuffer';
  this.representationId = null;
};

FragmentRequest.ACTION_DOWNLOAD = 'download';
FragmentRequest.ACTION_COMPLETE = 'complete';

exports['default'] = FragmentRequest;
module.exports = exports['default'];

},{}]},{},[8])
//# sourceMappingURL=dash.mss.debug.js.map
