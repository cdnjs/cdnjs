/*! videojs-contrib-hls - v1.3.11 - 2016-03-04
* Copyright (c) 2016 Brightcove; Licensed  */
/*! videojs-contrib-media-sources - v2.4.6 - 2016-03-01
* Copyright (c) 2016 Brightcove; Licensed  */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.muxjs = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * mux.js
 *
 * Copyright (c) 2016 Brightcove
 * All rights reserved.
 *
 * A stream-based aac to mp4 converter. This utility can be used to
 * deliver mp4s to a SourceBuffer on platforms that support native
 * Media Source Extensions.
 */
'use strict';
var Stream = require('../utils/stream.js');

// Constants
var AacStream;

/**
 * Splits an incoming stream of binary data into ADTS and ID3 Frames.
 */

AacStream = function() {
  var
    everything,
    receivedTimeStamp = false,
    timeStamp = 0;

  AacStream.prototype.init.call(this);

  this.setTimestamp = function (timestamp) {
    timeStamp = timestamp;
  };

  this.parseId3TagSize = function(header, byteIndex) {
    var
      returnSize = (header[byteIndex + 6] << 21) |
                   (header[byteIndex + 7] << 14) |
                   (header[byteIndex + 8] << 7) |
                   (header[byteIndex + 9]),
      flags = header[byteIndex + 5],
      footerPresent = (flags & 16) >> 4;

    if (footerPresent) {
      return returnSize + 20;
    }
    return returnSize + 10;
  };

  this.parseAdtsSize = function(header, byteIndex) {
    var
      lowThree = (header[byteIndex + 5] & 0xE0) >> 5,
      middle = header[byteIndex + 4] << 3,
      highTwo = header[byteIndex + 3] & 0x3 << 11;

    return (highTwo | middle) | lowThree;
  };

  this.push = function(bytes) {
    var
      frameSize = 0,
      byteIndex = 0,
      chunk,
      packet,
      tempLength;

    // If there are bytes remaining from the last segment, prepend them to the
    // bytes that were pushed in
    if (everything !== undefined && everything.length) {
      tempLength = everything.length;
      everything = new Uint8Array(bytes.byteLength + tempLength);
      everything.set(everything.subarray(0, tempLength));
      everything.set(bytes, tempLength);
    } else {
      everything = bytes;
    }

    while (everything.length - byteIndex >= 10) {
      if ((everything[byteIndex] === 'I'.charCodeAt(0)) &&
          (everything[byteIndex + 1] === 'D'.charCodeAt(0)) &&
          (everything[byteIndex + 2] === '3'.charCodeAt(0))) {

        //check framesize
        frameSize = this.parseId3TagSize(everything, byteIndex);
        //we have enough in the buffer to emit a full packet
        if (frameSize > everything.length) {
          break;
        }
        chunk = {
          type: 'timed-metadata',
          data: everything.subarray(byteIndex, byteIndex + frameSize)
        };
        this.trigger('data', chunk);
        byteIndex += frameSize;
        continue;
      } else if ((everything[byteIndex] & 0xff === 0xff) &&
                 ((everything[byteIndex + 1] & 0xf0) === 0xf0)) {
        frameSize = this.parseAdtsSize(everything, byteIndex);

        if (frameSize > everything.length) {
          break;
        }
        packet = {
          type: 'audio',
          data: everything.subarray(byteIndex, byteIndex + frameSize),
          pts: timeStamp,
          dts: timeStamp,
        };
        this.trigger('data', packet);
        byteIndex += frameSize;
        continue;
      }
      byteIndex++;
    }
  };
};

AacStream.prototype = new Stream();



module.exports = AacStream;

},{"../utils/stream.js":20}],2:[function(require,module,exports){
'use strict';

var Stream = require('../utils/stream.js');

var AdtsStream;

var
  ADTS_SAMPLING_FREQUENCIES = [
    96000,
    88200,
    64000,
    48000,
    44100,
    32000,
    24000,
    22050,
    16000,
    12000,
    11025,
    8000,
    7350
  ];

/*
 * Accepts a ElementaryStream and emits data events with parsed
 * AAC Audio Frames of the individual packets. Input audio in ADTS
 * format is unpacked and re-emitted as AAC frames.
 *
 * @see http://wiki.multimedia.cx/index.php?title=ADTS
 * @see http://wiki.multimedia.cx/?title=Understanding_AAC
 */
AdtsStream = function() {
  var self, buffer;

  AdtsStream.prototype.init.call(this);

  self = this;

  this.push = function(packet) {
    var
      i = 0,
      frameNum = 0,
      frameLength,
      protectionSkipBytes,
      frameEnd,
      oldBuffer,
      numFrames,
      sampleCount,
      adtsFrameDuration;

    if (packet.type !== 'audio') {
      // ignore non-audio data
      return;
    }

    // Prepend any data in the buffer to the input data so that we can parse
    // aac frames the cross a PES packet boundary
    if (buffer) {
      oldBuffer = buffer;
      buffer = new Uint8Array(oldBuffer.byteLength + packet.data.byteLength);
      buffer.set(oldBuffer);
      buffer.set(packet.data, oldBuffer.byteLength);
    } else {
      buffer = packet.data;
    }

    // unpack any ADTS frames which have been fully received
    // for details on the ADTS header, see http://wiki.multimedia.cx/index.php?title=ADTS
    while (i + 5 < buffer.length) {

      // Loook for the start of an ADTS header..
      if (buffer[i] !== 0xFF || (buffer[i + 1] & 0xF6) !== 0xF0) {
        // If a valid header was not found,  jump one forward and attempt to
        // find a valid ADTS header starting at the next byte
        i++;
        continue;
      }

      // The protection skip bit tells us if we have 2 bytes of CRC data at the
      // end of the ADTS header
      protectionSkipBytes = (~buffer[i + 1] & 0x01) * 2;

      // Frame length is a 13 bit integer starting 16 bits from the
      // end of the sync sequence
      frameLength = ((buffer[i + 3] & 0x03) << 11) |
        (buffer[i + 4] << 3) |
        ((buffer[i + 5] & 0xe0) >> 5);

      sampleCount = ((buffer[i + 6] & 0x03) + 1) * 1024;
      adtsFrameDuration = (sampleCount * 90000) /
        ADTS_SAMPLING_FREQUENCIES[(buffer[i + 2] & 0x3c) >>> 2];

      frameEnd = i + frameLength;

      // If we don't have enough data to actually finish this ADTS frame, return
      // and wait for more data
      if (buffer.byteLength < frameEnd) {
        return;
      }

      // Otherwise, deliver the complete AAC frame
      this.trigger('data', {
        pts: packet.pts + (frameNum * adtsFrameDuration),
        dts: packet.dts + (frameNum * adtsFrameDuration),
        sampleCount: sampleCount,
        audioobjecttype: ((buffer[i + 2] >>> 6) & 0x03) + 1,
        channelcount: ((buffer[i + 2] & 1) << 3) |
          ((buffer[i + 3] & 0xc0) >>> 6),
        samplerate: ADTS_SAMPLING_FREQUENCIES[(buffer[i + 2] & 0x3c) >>> 2],
        samplingfrequencyindex: (buffer[i + 2] & 0x3c) >>> 2,
        // assume ISO/IEC 14496-12 AudioSampleEntry default of 16
        samplesize: 16,
        data: buffer.subarray(i + 7 + protectionSkipBytes, frameEnd)
      });

      // If the buffer is empty, clear it and return
      if (buffer.byteLength === frameEnd) {
        buffer = undefined;
        return;
      }

      frameNum++;

      // Remove the finished frame from the buffer and start the process again
      buffer = buffer.subarray(frameEnd);
    }
  };
  this.flush = function() {
    this.trigger('done');
  };
};

AdtsStream.prototype = new Stream();

module.exports = AdtsStream;

},{"../utils/stream.js":20}],3:[function(require,module,exports){
'use strict';

var Stream = require('../utils/stream.js');
var ExpGolomb = require('../utils/exp-golomb.js');

var H264Stream, NalByteStream;

/**
 * Accepts a NAL unit byte stream and unpacks the embedded NAL units.
 */
NalByteStream = function() {
  var
    syncPoint = 0,
    i,
    buffer;
  NalByteStream.prototype.init.call(this);

  this.push = function(data) {
    var swapBuffer;

    if (!buffer) {
      buffer = data.data;
    } else {
      swapBuffer = new Uint8Array(buffer.byteLength + data.data.byteLength);
      swapBuffer.set(buffer);
      swapBuffer.set(data.data, buffer.byteLength);
      buffer = swapBuffer;
    }

    // Rec. ITU-T H.264, Annex B
    // scan for NAL unit boundaries

    // a match looks like this:
    // 0 0 1 .. NAL .. 0 0 1
    // ^ sync point        ^ i
    // or this:
    // 0 0 1 .. NAL .. 0 0 0
    // ^ sync point        ^ i

    // advance the sync point to a NAL start, if necessary
    for (; syncPoint < buffer.byteLength - 3; syncPoint++) {
      if (buffer[syncPoint + 2] === 1) {
        // the sync point is properly aligned
        i = syncPoint + 5;
        break;
      }
    }

    while (i < buffer.byteLength) {
      // look at the current byte to determine if we've hit the end of
      // a NAL unit boundary
      switch (buffer[i]) {
      case 0:
        // skip past non-sync sequences
        if (buffer[i - 1] !== 0) {
          i += 2;
          break;
        } else if (buffer[i - 2] !== 0) {
          i++;
          break;
        }

        // deliver the NAL unit
        this.trigger('data', buffer.subarray(syncPoint + 3, i - 2));

        // drop trailing zeroes
        do {
          i++;
        } while (buffer[i] !== 1 && i < buffer.length);
        syncPoint = i - 2;
        i += 3;
        break;
      case 1:
        // skip past non-sync sequences
        if (buffer[i - 1] !== 0 ||
            buffer[i - 2] !== 0) {
          i += 3;
          break;
        }

        // deliver the NAL unit
        this.trigger('data', buffer.subarray(syncPoint + 3, i - 2));
        syncPoint = i - 2;
        i += 3;
        break;
      default:
        // the current byte isn't a one or zero, so it cannot be part
        // of a sync sequence
        i += 3;
        break;
      }
    }
    // filter out the NAL units that were delivered
    buffer = buffer.subarray(syncPoint);
    i -= syncPoint;
    syncPoint = 0;
  };

  this.flush = function() {
    // deliver the last buffered NAL unit
    if (buffer && buffer.byteLength > 3) {
      this.trigger('data', buffer.subarray(syncPoint + 3));
    }
    // reset the stream state
    buffer = null;
    syncPoint = 0;
    this.trigger('done');
  };
};
NalByteStream.prototype = new Stream();

/**
 * Accepts input from a ElementaryStream and produces H.264 NAL unit data
 * events.
 */
H264Stream = function() {
  var
    nalByteStream = new NalByteStream(),
    self,
    trackId,
    currentPts,
    currentDts,

    discardEmulationPreventionBytes,
    readSequenceParameterSet,
    skipScalingList;

  H264Stream.prototype.init.call(this);
  self = this;

  this.push = function(packet) {
    if (packet.type !== 'video') {
      return;
    }
    trackId = packet.trackId;
    currentPts = packet.pts;
    currentDts = packet.dts;

    nalByteStream.push(packet);
  };

  nalByteStream.on('data', function(data) {
    var
      event = {
        trackId: trackId,
        pts: currentPts,
        dts: currentDts,
        data: data
      };

    switch (data[0] & 0x1f) {
    case 0x05:
      event.nalUnitType = 'slice_layer_without_partitioning_rbsp_idr';
      break;
    case 0x06:
      event.nalUnitType = 'sei_rbsp';
      event.escapedRBSP = discardEmulationPreventionBytes(data.subarray(1));
      break;
    case 0x07:
      event.nalUnitType = 'seq_parameter_set_rbsp';
      event.escapedRBSP = discardEmulationPreventionBytes(data.subarray(1));
      event.config = readSequenceParameterSet(event.escapedRBSP);
      break;
    case 0x08:
      event.nalUnitType = 'pic_parameter_set_rbsp';
      break;
    case 0x09:
      event.nalUnitType = 'access_unit_delimiter_rbsp';
      break;

    default:
      break;
    }
    self.trigger('data', event);
  });
  nalByteStream.on('done', function() {
    self.trigger('done');
  });

  this.flush = function() {
    nalByteStream.flush();
  };

  /**
   * Advance the ExpGolomb decoder past a scaling list. The scaling
   * list is optionally transmitted as part of a sequence parameter
   * set and is not relevant to transmuxing.
   * @param count {number} the number of entries in this scaling list
   * @param expGolombDecoder {object} an ExpGolomb pointed to the
   * start of a scaling list
   * @see Recommendation ITU-T H.264, Section 7.3.2.1.1.1
   */
  skipScalingList = function(count, expGolombDecoder) {
    var
      lastScale = 8,
      nextScale = 8,
      j,
      deltaScale;

    for (j = 0; j < count; j++) {
      if (nextScale !== 0) {
        deltaScale = expGolombDecoder.readExpGolomb();
        nextScale = (lastScale + deltaScale + 256) % 256;
      }

      lastScale = (nextScale === 0) ? lastScale : nextScale;
    }
  };

  /**
   * Expunge any "Emulation Prevention" bytes from a "Raw Byte
   * Sequence Payload"
   * @param data {Uint8Array} the bytes of a RBSP from a NAL
   * unit
   * @return {Uint8Array} the RBSP without any Emulation
   * Prevention Bytes
   */
  discardEmulationPreventionBytes = function(data) {
    var
      length = data.byteLength,
      emulationPreventionBytesPositions = [],
      i = 1,
      newLength, newData;

    // Find all `Emulation Prevention Bytes`
    while (i < length - 2) {
      if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0x03) {
        emulationPreventionBytesPositions.push(i + 2);
        i += 2;
      } else {
        i++;
      }
    }

    // If no Emulation Prevention Bytes were found just return the original
    // array
    if (emulationPreventionBytesPositions.length === 0) {
      return data;
    }

    // Create a new array to hold the NAL unit data
    newLength = length - emulationPreventionBytesPositions.length;
    newData = new Uint8Array(newLength);
    var sourceIndex = 0;

    for (i = 0; i < newLength; sourceIndex++, i++) {
      if (sourceIndex === emulationPreventionBytesPositions[0]) {
        // Skip this byte
        sourceIndex++;
        // Remove this position index
        emulationPreventionBytesPositions.shift();
      }
      newData[i] = data[sourceIndex];
    }

    return newData;
  };

  /**
   * Read a sequence parameter set and return some interesting video
   * properties. A sequence parameter set is the H264 metadata that
   * describes the properties of upcoming video frames.
   * @param data {Uint8Array} the bytes of a sequence parameter set
   * @return {object} an object with configuration parsed from the
   * sequence parameter set, including the dimensions of the
   * associated video frames.
   */
  readSequenceParameterSet = function(data) {
    var
      frameCropLeftOffset = 0,
      frameCropRightOffset = 0,
      frameCropTopOffset = 0,
      frameCropBottomOffset = 0,
      expGolombDecoder, profileIdc, levelIdc, profileCompatibility,
      chromaFormatIdc, picOrderCntType,
      numRefFramesInPicOrderCntCycle, picWidthInMbsMinus1,
      picHeightInMapUnitsMinus1,
      frameMbsOnlyFlag,
      scalingListCount,
      i;

    expGolombDecoder = new ExpGolomb(data);
    profileIdc = expGolombDecoder.readUnsignedByte(); // profile_idc
    profileCompatibility = expGolombDecoder.readUnsignedByte(); // constraint_set[0-5]_flag
    levelIdc = expGolombDecoder.readUnsignedByte(); // level_idc u(8)
    expGolombDecoder.skipUnsignedExpGolomb(); // seq_parameter_set_id

    // some profiles have more optional data we don't need
    if (profileIdc === 100 ||
        profileIdc === 110 ||
        profileIdc === 122 ||
        profileIdc === 244 ||
        profileIdc ===  44 ||
        profileIdc ===  83 ||
        profileIdc ===  86 ||
        profileIdc === 118 ||
        profileIdc === 128 ||
        profileIdc === 138 ||
        profileIdc === 139 ||
        profileIdc === 134) {
      chromaFormatIdc = expGolombDecoder.readUnsignedExpGolomb();
      if (chromaFormatIdc === 3) {
        expGolombDecoder.skipBits(1); // separate_colour_plane_flag
      }
      expGolombDecoder.skipUnsignedExpGolomb(); // bit_depth_luma_minus8
      expGolombDecoder.skipUnsignedExpGolomb(); // bit_depth_chroma_minus8
      expGolombDecoder.skipBits(1); // qpprime_y_zero_transform_bypass_flag
      if (expGolombDecoder.readBoolean()) { // seq_scaling_matrix_present_flag
        scalingListCount = (chromaFormatIdc !== 3) ? 8 : 12;
        for (i = 0; i < scalingListCount; i++) {
          if (expGolombDecoder.readBoolean()) { // seq_scaling_list_present_flag[ i ]
            if (i < 6) {
              skipScalingList(16, expGolombDecoder);
            } else {
              skipScalingList(64, expGolombDecoder);
            }
          }
        }
      }
    }

    expGolombDecoder.skipUnsignedExpGolomb(); // log2_max_frame_num_minus4
    picOrderCntType = expGolombDecoder.readUnsignedExpGolomb();

    if (picOrderCntType === 0) {
      expGolombDecoder.readUnsignedExpGolomb(); //log2_max_pic_order_cnt_lsb_minus4
    } else if (picOrderCntType === 1) {
      expGolombDecoder.skipBits(1); // delta_pic_order_always_zero_flag
      expGolombDecoder.skipExpGolomb(); // offset_for_non_ref_pic
      expGolombDecoder.skipExpGolomb(); // offset_for_top_to_bottom_field
      numRefFramesInPicOrderCntCycle = expGolombDecoder.readUnsignedExpGolomb();
      for(i = 0; i < numRefFramesInPicOrderCntCycle; i++) {
        expGolombDecoder.skipExpGolomb(); // offset_for_ref_frame[ i ]
      }
    }

    expGolombDecoder.skipUnsignedExpGolomb(); // max_num_ref_frames
    expGolombDecoder.skipBits(1); // gaps_in_frame_num_value_allowed_flag

    picWidthInMbsMinus1 = expGolombDecoder.readUnsignedExpGolomb();
    picHeightInMapUnitsMinus1 = expGolombDecoder.readUnsignedExpGolomb();

    frameMbsOnlyFlag = expGolombDecoder.readBits(1);
    if (frameMbsOnlyFlag === 0) {
      expGolombDecoder.skipBits(1); // mb_adaptive_frame_field_flag
    }

    expGolombDecoder.skipBits(1); // direct_8x8_inference_flag
    if (expGolombDecoder.readBoolean()) { // frame_cropping_flag
      frameCropLeftOffset = expGolombDecoder.readUnsignedExpGolomb();
      frameCropRightOffset = expGolombDecoder.readUnsignedExpGolomb();
      frameCropTopOffset = expGolombDecoder.readUnsignedExpGolomb();
      frameCropBottomOffset = expGolombDecoder.readUnsignedExpGolomb();
    }

    return {
      profileIdc: profileIdc,
      levelIdc: levelIdc,
      profileCompatibility: profileCompatibility,
      width: ((picWidthInMbsMinus1 + 1) * 16) - frameCropLeftOffset * 2 - frameCropRightOffset * 2,
      height: ((2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16) - (frameCropTopOffset * 2) - (frameCropBottomOffset * 2)
    };
  };

};
H264Stream.prototype = new Stream();

module.exports = {
  H264Stream: H264Stream,
  NalByteStream: NalByteStream,
};

},{"../utils/exp-golomb.js":19,"../utils/stream.js":20}],4:[function(require,module,exports){
module.exports = {
  adts: require('./adts'),
  h264: require('./h264'),
};

},{"./adts":2,"./h264":3}],5:[function(require,module,exports){
/**
 * An object that stores the bytes of an FLV tag and methods for
 * querying and manipulating that data.
 * @see http://download.macromedia.com/f4v/video_file_format_spec_v10_1.pdf
 */
'use strict';

var FlvTag;

// (type:uint, extraData:Boolean = false) extends ByteArray
FlvTag = function(type, extraData) {
  var
    // Counter if this is a metadata tag, nal start marker if this is a video
    // tag. unused if this is an audio tag
    adHoc = 0, // :uint

    // The default size is 16kb but this is not enough to hold iframe
    // data and the resizing algorithm costs a bit so we create a larger
    // starting buffer for video tags
    bufferStartSize = 16384,

    // checks whether the FLV tag has enough capacity to accept the proposed
    // write and re-allocates the internal buffers if necessary
    prepareWrite = function(flv, count) {
      var
        bytes,
        minLength = flv.position + count;
      if (minLength < flv.bytes.byteLength) {
        // there's enough capacity so do nothing
        return;
      }

      // allocate a new buffer and copy over the data that will not be modified
      bytes = new Uint8Array(minLength * 2);
      bytes.set(flv.bytes.subarray(0, flv.position), 0);
      flv.bytes = bytes;
      flv.view = new DataView(flv.bytes.buffer);
    },

    // commonly used metadata properties
    widthBytes = FlvTag.widthBytes || new Uint8Array('width'.length),
    heightBytes = FlvTag.heightBytes || new Uint8Array('height'.length),
    videocodecidBytes = FlvTag.videocodecidBytes || new Uint8Array('videocodecid'.length),
    i;

  if (!FlvTag.widthBytes) {
    // calculating the bytes of common metadata names ahead of time makes the
    // corresponding writes faster because we don't have to loop over the
    // characters
    // re-test with test/perf.html if you're planning on changing this
    for (i = 0; i < 'width'.length; i++) {
      widthBytes[i] = 'width'.charCodeAt(i);
    }
    for (i = 0; i < 'height'.length; i++) {
      heightBytes[i] = 'height'.charCodeAt(i);
    }
    for (i = 0; i < 'videocodecid'.length; i++) {
      videocodecidBytes[i] = 'videocodecid'.charCodeAt(i);
    }

    FlvTag.widthBytes = widthBytes;
    FlvTag.heightBytes = heightBytes;
    FlvTag.videocodecidBytes = videocodecidBytes;
  }

  this.keyFrame = false; // :Boolean

  switch(type) {
  case FlvTag.VIDEO_TAG:
    this.length = 16;
    // Start the buffer at 256k
    bufferStartSize *= 6;
    break;
  case FlvTag.AUDIO_TAG:
    this.length = 13;
    this.keyFrame = true;
    break;
  case FlvTag.METADATA_TAG:
    this.length = 29;
    this.keyFrame = true;
    break;
  default:
    throw("Error Unknown TagType");
  }

  this.bytes = new Uint8Array(bufferStartSize);
  this.view = new DataView(this.bytes.buffer);
  this.bytes[0] = type;
  this.position = this.length;
  this.keyFrame = extraData; // Defaults to false

  // presentation timestamp
  this.pts = 0;
  // decoder timestamp
  this.dts = 0;

  // ByteArray#writeBytes(bytes:ByteArray, offset:uint = 0, length:uint = 0)
  this.writeBytes = function(bytes, offset, length) {
    var
      start = offset || 0,
      end;
    length = length || bytes.byteLength;
    end = start + length;

    prepareWrite(this, length);
    this.bytes.set(bytes.subarray(start, end), this.position);

    this.position += length;
    this.length = Math.max(this.length, this.position);
  };

  // ByteArray#writeByte(value:int):void
  this.writeByte = function(byte) {
    prepareWrite(this, 1);
    this.bytes[this.position] = byte;
    this.position++;
    this.length = Math.max(this.length, this.position);
  };

  // ByteArray#writeShort(value:int):void
  this.writeShort = function(short) {
    prepareWrite(this, 2);
    this.view.setUint16(this.position, short);
    this.position += 2;
    this.length = Math.max(this.length, this.position);
  };

  // Negative index into array
  // (pos:uint):int
  this.negIndex = function(pos) {
    return this.bytes[this.length - pos];
  };

  // The functions below ONLY work when this[0] == VIDEO_TAG.
  // We are not going to check for that because we dont want the overhead
  // (nal:ByteArray = null):int
  this.nalUnitSize = function() {
    if (adHoc === 0) {
      return 0;
    }

    return this.length - (adHoc + 4);
  };

  this.startNalUnit = function() {
    // remember position and add 4 bytes
    if (adHoc > 0) {
      throw new Error("Attempted to create new NAL wihout closing the old one");
    }

    // reserve 4 bytes for nal unit size
    adHoc = this.length;
    this.length += 4;
    this.position = this.length;
  };

  // (nal:ByteArray = null):void
  this.endNalUnit = function(nalContainer) {
    var
      nalStart, // :uint
      nalLength; // :uint

    // Rewind to the marker and write the size
    if (this.length === adHoc + 4) {
      // we started a nal unit, but didnt write one, so roll back the 4 byte size value
      this.length -= 4;
    } else if (adHoc > 0) {
      nalStart = adHoc + 4;
      nalLength = this.length - nalStart;

      this.position = adHoc;
      this.view.setUint32(this.position, nalLength);
      this.position = this.length;

      if (nalContainer) {
        // Add the tag to the NAL unit
        nalContainer.push(this.bytes.subarray(nalStart, nalStart + nalLength));
      }
    }

    adHoc = 0;
  };

  /**
   * Write out a 64-bit floating point valued metadata property. This method is
   * called frequently during a typical parse and needs to be fast.
   */
  // (key:String, val:Number):void
  this.writeMetaDataDouble = function(key, val) {
    var i;
    prepareWrite(this, 2 + key.length + 9);

    // write size of property name
    this.view.setUint16(this.position, key.length);
    this.position += 2;

    // this next part looks terrible but it improves parser throughput by
    // 10kB/s in my testing

    // write property name
    if (key === 'width') {
      this.bytes.set(widthBytes, this.position);
      this.position += 5;
    } else if (key === 'height') {
      this.bytes.set(heightBytes, this.position);
      this.position += 6;
    } else if (key === 'videocodecid') {
      this.bytes.set(videocodecidBytes, this.position);
      this.position += 12;
    } else {
      for (i = 0; i < key.length; i++) {
        this.bytes[this.position] = key.charCodeAt(i);
        this.position++;
      }
    }

    // skip null byte
    this.position++;

    // write property value
    this.view.setFloat64(this.position, val);
    this.position += 8;

    // update flv tag length
    this.length = Math.max(this.length, this.position);
    ++adHoc;
  };

  // (key:String, val:Boolean):void
  this.writeMetaDataBoolean = function(key, val) {
    var i;
    prepareWrite(this, 2);
    this.view.setUint16(this.position, key.length);
    this.position += 2;
    for (i = 0; i < key.length; i++) {
      // if key.charCodeAt(i) >= 255, handle error
      prepareWrite(this, 1);
      this.bytes[this.position] = key.charCodeAt(i);
      this.position++;
    }
    prepareWrite(this, 2);
    this.view.setUint8(this.position, 0x01);
    this.position++;
    this.view.setUint8(this.position, val ? 0x01 : 0x00);
    this.position++;
    this.length = Math.max(this.length, this.position);
    ++adHoc;
  };

  // ():ByteArray
  this.finalize = function() {
    var
      dtsDelta, // :int
      len; // :int

    switch(this.bytes[0]) {
      // Video Data
    case FlvTag.VIDEO_TAG:
      this.bytes[11] = ((this.keyFrame || extraData) ? 0x10 : 0x20 ) | 0x07; // We only support AVC, 1 = key frame (for AVC, a seekable frame), 2 = inter frame (for AVC, a non-seekable frame)
      this.bytes[12] = extraData ?  0x00 : 0x01;

      dtsDelta = this.pts - this.dts;
      this.bytes[13] = (dtsDelta & 0x00FF0000) >>> 16;
      this.bytes[14] = (dtsDelta & 0x0000FF00) >>>  8;
      this.bytes[15] = (dtsDelta & 0x000000FF) >>>  0;
      break;

    case FlvTag.AUDIO_TAG:
      this.bytes[11] = 0xAF; // 44 kHz, 16-bit stereo
      this.bytes[12] = extraData ? 0x00 : 0x01;
      break;

    case FlvTag.METADATA_TAG:
      this.position = 11;
      this.view.setUint8(this.position, 0x02); // String type
      this.position++;
      this.view.setUint16(this.position, 0x0A); // 10 Bytes
      this.position += 2;
      // set "onMetaData"
      this.bytes.set([0x6f, 0x6e, 0x4d, 0x65,
                      0x74, 0x61, 0x44, 0x61,
                      0x74, 0x61], this.position);
      this.position += 10;
      this.bytes[this.position] = 0x08; // Array type
      this.position++;
      this.view.setUint32(this.position, adHoc);
      this.position = this.length;
      this.bytes.set([0, 0, 9], this.position);
      this.position += 3; // End Data Tag
      this.length = this.position;
      break;
    }

    len = this.length - 11;

    // write the DataSize field
    this.bytes[ 1] = (len & 0x00FF0000) >>> 16;
    this.bytes[ 2] = (len & 0x0000FF00) >>>  8;
    this.bytes[ 3] = (len & 0x000000FF) >>>  0;
    // write the Timestamp
    this.bytes[ 4] = (this.dts & 0x00FF0000) >>> 16;
    this.bytes[ 5] = (this.dts & 0x0000FF00) >>>  8;
    this.bytes[ 6] = (this.dts & 0x000000FF) >>>  0;
    this.bytes[ 7] = (this.dts & 0xFF000000) >>> 24;
    // write the StreamID
    this.bytes[ 8] = 0;
    this.bytes[ 9] = 0;
    this.bytes[10] = 0;

    // Sometimes we're at the end of the view and have one slot to write a
    // uint32, so, prepareWrite of count 4, since, view is uint8
    prepareWrite(this, 4);
    this.view.setUint32(this.length, this.length);
    this.length += 4;
    this.position += 4;

    // trim down the byte buffer to what is actually being used
    this.bytes = this.bytes.subarray(0, this.length);
    this.frameTime = FlvTag.frameTime(this.bytes);
    // if bytes.bytelength isn't equal to this.length, handle error
    return this;
  };
};

FlvTag.AUDIO_TAG = 0x08; // == 8, :uint
FlvTag.VIDEO_TAG = 0x09; // == 9, :uint
FlvTag.METADATA_TAG = 0x12; // == 18, :uint

// (tag:ByteArray):Boolean {
FlvTag.isAudioFrame = function(tag) {
  return FlvTag.AUDIO_TAG === tag[0];
};

// (tag:ByteArray):Boolean {
FlvTag.isVideoFrame = function(tag) {
  return FlvTag.VIDEO_TAG === tag[0];
};

// (tag:ByteArray):Boolean {
FlvTag.isMetaData = function(tag) {
  return FlvTag.METADATA_TAG === tag[0];
};

// (tag:ByteArray):Boolean {
FlvTag.isKeyFrame = function(tag) {
  if (FlvTag.isVideoFrame(tag)) {
    return tag[11] === 0x17;
  }

  if (FlvTag.isAudioFrame(tag)) {
    return true;
  }

  if (FlvTag.isMetaData(tag)) {
    return true;
  }

  return false;
};

// (tag:ByteArray):uint {
FlvTag.frameTime = function(tag) {
  var pts = tag[ 4] << 16; // :uint
  pts |= tag[ 5] <<  8;
  pts |= tag[ 6] <<  0;
  pts |= tag[ 7] << 24;
  return pts;
};

module.exports = FlvTag;

},{}],6:[function(require,module,exports){
module.exports = {
  tag: require('./flv-tag'),
  Transmuxer: require('./transmuxer'),
  tools: require('../tools/flv-inspector'),
};

},{"../tools/flv-inspector":17,"./flv-tag":5,"./transmuxer":7}],7:[function(require,module,exports){
'use strict';

var Stream = require('../utils/stream.js');
var FlvTag = require('./flv-tag.js');
var m2ts = require('../m2ts/m2ts.js');
var AdtsStream = require('../codecs/adts.js');
var H264Stream = require('../codecs/h264').H264Stream;

var
  MetadataStream,
  Transmuxer,
  VideoSegmentStream,
  AudioSegmentStream,
  CoalesceStream,
  collectTimelineInfo,
  metaDataTag,
  extraDataTag;

/**
 * Store information about the start and end of the tracka and the
 * duration for each frame/sample we process in order to calculate
 * the baseMediaDecodeTime
 */
collectTimelineInfo = function (track, data) {
  if (typeof data.pts === 'number') {
    if (track.timelineStartInfo.pts === undefined) {
      track.timelineStartInfo.pts = data.pts;
    } else {
      track.timelineStartInfo.pts =
        Math.min(track.timelineStartInfo.pts, data.pts);
    }
  }

  if (typeof data.dts === 'number') {
    if (track.timelineStartInfo.dts === undefined) {
      track.timelineStartInfo.dts = data.dts;
    } else {
      track.timelineStartInfo.dts =
        Math.min(track.timelineStartInfo.dts, data.dts);
    }
  }
};

metaDataTag = function(track, pts) {
  var
    tag = new FlvTag(FlvTag.METADATA_TAG); // :FlvTag

  tag.dts = pts;
  tag.pts = pts;

  tag.writeMetaDataDouble("videocodecid", 7);
  tag.writeMetaDataDouble("width", track.width);
  tag.writeMetaDataDouble("height", track.height);

  return tag;
};

extraDataTag = function(track, pts) {
  var
    i,
    tag = new FlvTag(FlvTag.VIDEO_TAG, true);

  tag.dts = pts;
  tag.pts = pts;

  tag.writeByte(0x01);// version
  tag.writeByte(track.profileIdc);// profile
  tag.writeByte(track.profileCompatibility);// compatibility
  tag.writeByte(track.levelIdc);// level
  tag.writeByte(0xFC | 0x03); // reserved (6 bits), NULA length size - 1 (2 bits)
  tag.writeByte(0xE0 | 0x01 ); // reserved (3 bits), num of SPS (5 bits)
  tag.writeShort( track.sps[0].length ); // data of SPS
  tag.writeBytes( track.sps[0] ); // SPS

  tag.writeByte(track.pps.length); // num of PPS (will there ever be more that 1 PPS?)
  for (i = 0 ; i < track.pps.length ; ++i) {
    tag.writeShort(track.pps[i].length); // 2 bytes for length of PPS
    tag.writeBytes(track.pps[i]); // data of PPS
  }

  return tag;
};

/**
 * Constructs a single-track, media segment from AAC data
 * events. The output of this stream can be fed to flash.
 */
AudioSegmentStream = function(track) {
  var
    adtsFrames = [],
    adtsFramesLength = 0,
    sequenceNumber = 0,
    earliestAllowedDts = 0,
    oldExtraData;

  AudioSegmentStream.prototype.init.call(this);

  this.push = function(data) {
    collectTimelineInfo(track, data);

    if (track && track.channelcount === undefined) {
      track.audioobjecttype = data.audioobjecttype;
      track.channelcount = data.channelcount;
      track.samplerate = data.samplerate;
      track.samplingfrequencyindex = data.samplingfrequencyindex;
      track.samplesize = data.samplesize;
      track.extraData = (track.audioobjecttype << 11) |
                        (track.samplingfrequencyindex << 7) |
                        (track.channelcount << 3);
    }

    data.pts = Math.round(data.pts / 90);
    data.dts = Math.round(data.dts / 90);

    // buffer audio data until end() is called
    adtsFrames.push(data);
  };

  this.flush = function() {
    var currentFrame, adtsFrame, deltaDts,lastMetaPts, tags = [];
    // return early if no audio data has been observed
    if (adtsFrames.length === 0) {
      this.trigger('done');
      return;
    }

    lastMetaPts = -Infinity;

    while (adtsFrames.length) {
      currentFrame = adtsFrames.shift();

      // write out metadata tags every 1 second so that the decoder
      // is re-initialized quickly after seeking into a different
      // audio configuration
      if (track.extraData !== oldExtraData || currentFrame.pts - lastMetaPts >= 1000) {
       adtsFrame = new FlvTag(FlvTag.METADATA_TAG);
        adtsFrame.pts = currentFrame.pts;
        adtsFrame.dts = currentFrame.dts;

        // AAC is always 10
        adtsFrame.writeMetaDataDouble("audiocodecid", 10);
        adtsFrame.writeMetaDataBoolean("stereo", 2 === track.channelcount);
        adtsFrame.writeMetaDataDouble ("audiosamplerate", track.samplerate);
        // Is AAC always 16 bit?
        adtsFrame.writeMetaDataDouble ("audiosamplesize", 16);

        tags.push(adtsFrame);

        oldExtraData = track.extraData;

        adtsFrame = new FlvTag(FlvTag.AUDIO_TAG, true);
        // For audio, DTS is always the same as PTS. We want to set the DTS
        // however so we can compare with video DTS to determine approximate
        // packet order
        adtsFrame.pts = currentFrame.pts;
        adtsFrame.dts = currentFrame.dts;

        adtsFrame.view.setUint16(adtsFrame.position, track.extraData);
        adtsFrame.position += 2;
        adtsFrame.length = Math.max(adtsFrame.length, adtsFrame.position);

        tags.push(adtsFrame);

        lastMetaPts = currentFrame.pts;
      }
      adtsFrame = new FlvTag(FlvTag.AUDIO_TAG);
      adtsFrame.pts = currentFrame.pts;
      adtsFrame.dts = currentFrame.dts;

      adtsFrame.writeBytes(currentFrame.data);

      tags.push(adtsFrame);
    }

    oldExtraData = null;
    this.trigger('data', {track: track, tags: tags});

    this.trigger('done');
  };
};
AudioSegmentStream.prototype = new Stream();

/**
 * Store FlvTags for the h264 stream
 * @param track {object} track metadata configuration
 */
VideoSegmentStream = function(track) {
  var
    sequenceNumber = 0,
    nalUnits = [],
    nalUnitsLength = 0,
    config,
    h264Frame;
  VideoSegmentStream.prototype.init.call(this);

  this.finishFrame = function(tags, frame) {
    if (!frame) {
      return;
    }
    // Check if keyframe and the length of tags.
    // This makes sure we write metadata on the first frame of a segment.
    if (config && track && track.newMetadata &&
        (frame.keyFrame || tags.length === 0)) {
      // Push extra data on every IDR frame in case we did a stream change + seek
      tags.push(metaDataTag(config, frame.pts));
      tags.push(extraDataTag(track, frame.pts));
      track.newMetadata = false;
    }

    frame.endNalUnit();
    tags.push(frame);
  };

  this.push = function(data) {
    collectTimelineInfo(track, data);

    data.pts = Math.round(data.pts / 90);
    data.dts = Math.round(data.dts / 90);

    // buffer video until flush() is called
    nalUnits.push(data);
  };

  this.flush = function() {
    var
      currentNal,
      tags = [];

    // Throw away nalUnits at the start of the byte stream until we find
    // the first AUD
    while (nalUnits.length) {
      if (nalUnits[0].nalUnitType === 'access_unit_delimiter_rbsp') {
        break;
      }
      nalUnits.shift();
    }

    // return early if no video data has been observed
    if (nalUnits.length === 0) {
      this.trigger('done');
      return;
    }

    while (nalUnits.length) {
      currentNal = nalUnits.shift();

      // record the track config
      if (currentNal.nalUnitType === 'seq_parameter_set_rbsp') {
        track.newMetadata = true;
        config = currentNal.config;
        track.width = config.width;
        track.height = config.height;
        track.sps = [currentNal.data];
        track.profileIdc = config.profileIdc;
        track.levelIdc = config.levelIdc;
        track.profileCompatibility = config.profileCompatibility;
        h264Frame.endNalUnit();
      } else if (currentNal.nalUnitType === 'pic_parameter_set_rbsp') {
        track.newMetadata = true;
        track.pps = [currentNal.data];
        h264Frame.endNalUnit();
      } else if (currentNal.nalUnitType === 'access_unit_delimiter_rbsp') {
        if (h264Frame) {
          this.finishFrame(tags, h264Frame);
        }
        h264Frame = new FlvTag(FlvTag.VIDEO_TAG);
        h264Frame.pts = currentNal.pts;
        h264Frame.dts = currentNal.dts;
      } else {
        if (currentNal.nalUnitType === 'slice_layer_without_partitioning_rbsp_idr') {
          // the current sample is a key frame
          h264Frame.keyFrame = true;
        }
        h264Frame.endNalUnit();
      }
      h264Frame.startNalUnit();
      h264Frame.writeBytes(currentNal.data);
    }
    if (h264Frame) {
      this.finishFrame(tags, h264Frame);
    }

    this.trigger('data', {track: track, tags: tags});

    // Continue with the flush process now
    this.trigger('done');
  };
};

VideoSegmentStream.prototype = new Stream();

/**
 * The final stage of the transmuxer that emits the flv tags
 * for audio, video, and metadata. Also tranlates in time and
 * outputs caption data and id3 cues.
 */
CoalesceStream = function(options) {
  // Number of Tracks per output segment
  // If greater than 1, we combine multiple
  // tracks into a single segment
  this.numberOfTracks = 0;
  this.metadataStream = options.metadataStream;

  this.videoTags = [];
  this.audioTags = [];
  this.videoTrack = null;
  this.audioTrack = null;
  this.pendingCaptions = [];
  this.pendingMetadata = [];
  this.pendingTracks = 0;

  CoalesceStream.prototype.init.call(this);

  // Take output from multiple
  this.push = function(output) {
    // buffer incoming captions until the associated video segment
    // finishes
    if (output.text) {
      return this.pendingCaptions.push(output);
    }
    // buffer incoming id3 tags until the final flush
    if (output.frames) {
      return this.pendingMetadata.push(output);
    }

    if (output.track.type === 'video') {
      this.videoTrack = output.track;
      this.videoTags = output.tags;
      this.pendingTracks++;
    }
    if (output.track.type === 'audio') {
      this.audioTrack = output.track;
      this.audioTags = output.tags;
      this.pendingTracks++;
    }
  };
};

CoalesceStream.prototype = new Stream();
CoalesceStream.prototype.flush = function() {
  var
    id3,
    caption,
    i,
    timelineStartPts,
    event = {
      tags: {},
      captions: [],
      metadata: []
    };

  if (this.pendingTracks < this.numberOfTracks) {
    return;
  }

  if (this.videoTrack) {
    timelineStartPts = this.videoTrack.timelineStartInfo.pts;
  } else if (this.audioTrack) {
    timelineStartPts = this.audioTrack.timelineStartInfo.pts;
  }

  event.tags.videoTags = this.videoTags;
  event.tags.audioTags = this.audioTags;

  // Translate caption PTS times into second offsets into the
  // video timeline for the segment
  for (i = 0; i < this.pendingCaptions.length; i++) {
    caption = this.pendingCaptions[i];
    caption.startTime = caption.startPts - timelineStartPts;
    caption.startTime /= 90e3;
    caption.endTime = caption.endPts - timelineStartPts;
    caption.endTime /= 90e3;
    event.captions.push(caption);
  }

  // Translate ID3 frame PTS times into second offsets into the
  // video timeline for the segment
  for (i = 0; i < this.pendingMetadata.length; i++) {
    id3 = this.pendingMetadata[i];
    id3.cueTime = id3.pts - timelineStartPts;
    id3.cueTime /= 90e3;
    event.metadata.push(id3);
  }
  // We add this to every single emitted segment even though we only need
  // it for the first
  event.metadata.dispatchType = this.metadataStream.dispatchType;

  // Reset stream state
  this.videoTrack = null;
  this.audioTrack = null;
  this.videoTags = [];
  this.audioTags = [];
  this.pendingCaptions.length = 0;
  this.pendingMetadata.length = 0;
  this.pendingTracks = 0;

  // Emit the final segment
  this.trigger('data', event);

  this.trigger('done');
};

/**
 * An object that incrementally transmuxes MPEG2 Trasport Stream
 * chunks into an FLV.
 */
Transmuxer = function(options) {
  var
    self = this,
    videoTrack,
    audioTrack,

    packetStream, parseStream, elementaryStream,
    adtsStream, h264Stream,
    videoSegmentStream, audioSegmentStream, captionStream,
    coalesceStream;

  Transmuxer.prototype.init.call(this);

  options = options || {};

  // expose the metadata stream
  this.metadataStream = new m2ts.MetadataStream();

  options.metadataStream = this.metadataStream;

  // set up the parsing pipeline
  packetStream = new m2ts.TransportPacketStream();
  parseStream = new m2ts.TransportParseStream();
  elementaryStream = new m2ts.ElementaryStream();
  adtsStream = new AdtsStream();
  h264Stream = new H264Stream();
  coalesceStream = new CoalesceStream(options);

  // disassemble MPEG2-TS packets into elementary streams
  packetStream
    .pipe(parseStream)
    .pipe(elementaryStream);

  // !!THIS ORDER IS IMPORTANT!!
  // demux the streams
  elementaryStream
    .pipe(h264Stream);
  elementaryStream
    .pipe(adtsStream);

  elementaryStream
    .pipe(this.metadataStream)
    .pipe(coalesceStream);
  // if CEA-708 parsing is available, hook up a caption stream
  captionStream = new m2ts.CaptionStream();
  h264Stream.pipe(captionStream)
    .pipe(coalesceStream);

  // hook up the segment streams once track metadata is delivered
  elementaryStream.on('data', function(data) {
    var i, videoTrack, audioTrack;

    if (data.type === 'metadata') {
      i = data.tracks.length;

      // scan the tracks listed in the metadata
      while (i--) {
        if (data.tracks[i].type === 'video') {
          videoTrack = data.tracks[i];
        } else if (data.tracks[i].type === 'audio') {
          audioTrack = data.tracks[i];
        }
      }

      // hook up the video segment stream to the first track with h264 data
      if (videoTrack && !videoSegmentStream) {
        coalesceStream.numberOfTracks++;
        videoSegmentStream = new VideoSegmentStream(videoTrack);

        // Set up the final part of the video pipeline
        h264Stream
          .pipe(videoSegmentStream)
          .pipe(coalesceStream);
      }

      if (audioTrack && !audioSegmentStream) {
        // hook up the audio segment stream to the first track with aac data
        coalesceStream.numberOfTracks++;
        audioSegmentStream = new AudioSegmentStream(audioTrack);

        // Set up the final part of the audio pipeline
        adtsStream
          .pipe(audioSegmentStream)
          .pipe(coalesceStream);
      }
    }
  });

  // feed incoming data to the front of the parsing pipeline
  this.push = function(data) {
    packetStream.push(data);
  };

  // flush any buffered data
  this.flush = function() {
    // Start at the top of the pipeline and flush all pending work
    packetStream.flush();
  };

  // Re-emit any data coming from the coalesce stream to the outside world
  coalesceStream.on('data', function (event) {
    self.trigger('data', event);
  });

  // Let the consumer know we have finished flushing the entire pipeline
  coalesceStream.on('done', function () {
    self.trigger('done');
  });

  // For information on the FLV format, see
  // http://download.macromedia.com/f4v/video_file_format_spec_v10_1.pdf.
  // Technically, this function returns the header and a metadata FLV tag
  // if duration is greater than zero
  // duration in seconds
  // @return {object} the bytes of the FLV header as a Uint8Array
  this.getFlvHeader = function(duration, audio, video) { // :ByteArray {
    var
      headBytes = new Uint8Array(3 + 1 + 1 + 4),
      head = new DataView(headBytes.buffer),
      metadata,
      result,
      metadataLength;

    // default arguments
    duration = duration || 0;
    audio = audio === undefined? true : audio;
    video = video === undefined? true : video;

    // signature
    head.setUint8(0, 0x46); // 'F'
    head.setUint8(1, 0x4c); // 'L'
    head.setUint8(2, 0x56); // 'V'

    // version
    head.setUint8(3, 0x01);

    // flags
    head.setUint8(4, (audio ? 0x04 : 0x00) | (video ? 0x01 : 0x00));

    // data offset, should be 9 for FLV v1
    head.setUint32(5, headBytes.byteLength);

    // init the first FLV tag
    if (duration <= 0) {
      // no duration available so just write the first field of the first
      // FLV tag
      result = new Uint8Array(headBytes.byteLength + 4);
      result.set(headBytes);
      result.set([0, 0, 0, 0], headBytes.byteLength);
      return result;
    }

    // write out the duration metadata tag
    metadata = new FlvTag(FlvTag.METADATA_TAG);
    metadata.pts = metadata.dts = 0;
    metadata.writeMetaDataDouble("duration", duration);
    metadataLength = metadata.finalize().length;
    result = new Uint8Array(headBytes.byteLength + metadataLength);
    result.set(headBytes);
    result.set(head.byteLength, metadataLength);

    return result;
  };
};
Transmuxer.prototype = new Stream();

// forward compatibility
module.exports = Transmuxer;

},{"../codecs/adts.js":2,"../codecs/h264":3,"../m2ts/m2ts.js":11,"../utils/stream.js":20,"./flv-tag.js":5}],8:[function(require,module,exports){
'use strict';

var muxjs = {
  codecs: require('./codecs'),
  mp4: require('./mp4'),
  flv: require('./flv'),
  mp2t: require('./m2ts'),
};
module.exports = muxjs;

},{"./codecs":4,"./flv":6,"./m2ts":10,"./mp4":14}],9:[function(require,module,exports){
/**
 * mux.js
 *
 * Copyright (c) 2015 Brightcove
 * All rights reserved.
 *
 * Reads in-band caption information from a video elementary
 * stream. Captions must follow the CEA-708 standard for injection
 * into an MPEG-2 transport streams.
 * @see https://en.wikipedia.org/wiki/CEA-708
 */

'use strict';

// -----------------
// Link To Transport
// -----------------

// Supplemental enhancement information (SEI) NAL units have a
// payload type field to indicate how they are to be
// interpreted. CEAS-708 caption content is always transmitted with
// payload type 0x04.
var USER_DATA_REGISTERED_ITU_T_T35 = 4,
    RBSP_TRAILING_BITS = 128,
    Stream = require('../utils/stream');

/**
  * Parse a supplemental enhancement information (SEI) NAL unit.
  * Stops parsing once a message of type ITU T T35 has been found.
  *
  * @param bytes {Uint8Array} the bytes of a SEI NAL unit
  * @return {object} the parsed SEI payload
  * @see Rec. ITU-T H.264, 7.3.2.3.1
  */
var parseSei = function(bytes) {
  var
    i = 0,
    result = {
      payloadType: -1,
      payloadSize: 0,
    },
    payloadType = 0,
    payloadSize = 0;

  // go through the sei_rbsp parsing each each individual sei_message
  while (i < bytes.byteLength) {
    // stop once we have hit the end of the sei_rbsp
    if (bytes[i] === RBSP_TRAILING_BITS) {
      break;
    }

    // Parse payload type
    while (bytes[i] === 0xFF) {
      payloadType += 255;
      i++;
    }
    payloadType += bytes[i++];

    // Parse payload size
    while (bytes[i] === 0xFF) {
      payloadSize += 255;
      i++;
    }
    payloadSize += bytes[i++];

    // this sei_message is a 608/708 caption so save it and break
    // there can only ever be one caption message in a frame's sei
    if (!result.payload && payloadType === USER_DATA_REGISTERED_ITU_T_T35) {
      result.payloadType = payloadType;
      result.payloadSize = payloadSize;
      result.payload = bytes.subarray(i, i + payloadSize);
      break;
    }

    // skip the payload and parse the next message
    i += payloadSize;
    payloadType = 0;
    payloadSize = 0;
  }

  return result;
};

// see ANSI/SCTE 128-1 (2013), section 8.1
var parseUserData = function(sei) {
  // itu_t_t35_contry_code must be 181 (United States) for
  // captions
  if (sei.payload[0] !== 181) {
    return null;
  }

  // itu_t_t35_provider_code should be 49 (ATSC) for captions
  if (((sei.payload[1] << 8) | sei.payload[2]) !== 49) {
    return null;
  }

  // the user_identifier should be "GA94" to indicate ATSC1 data
  if (String.fromCharCode(sei.payload[3],
                          sei.payload[4],
                          sei.payload[5],
                          sei.payload[6]) !== 'GA94') {
    return null;
  }

  // finally, user_data_type_code should be 0x03 for caption data
  if (sei.payload[7] !== 0x03) {
    return null;
  }

  // return the user_data_type_structure and strip the trailing
  // marker bits
  return sei.payload.subarray(8, sei.payload.length - 1);
};

// see CEA-708-D, section 4.4
var parseCaptionPackets = function(pts, userData) {
  var results = [], i, count, offset, data;

  // if this is just filler, return immediately
  if (!(userData[0] & 0x40)) {
    return results;
  }

  // parse out the cc_data_1 and cc_data_2 fields
  count = userData[0] & 0x1f;
  for (i = 0; i < count; i++) {
    offset = i * 3;
    data = {
      type: userData[offset + 2] & 0x03,
      pts: pts
    };

    // capture cc data when cc_valid is 1
    if (userData[offset + 2] & 0x04) {
      data.ccData = (userData[offset + 3] << 8) | userData[offset + 4];
      results.push(data);
    }
  }
  return results;
};

var CaptionStream = function() {
  var self = this;
  CaptionStream.prototype.init.call(this);

  this.captionPackets_ = [];

  this.field1_ = new Cea608Stream();

  // forward data and done events from field1_ to this CaptionStream
  this.field1_.on('data', this.trigger.bind(this, 'data'));
  this.field1_.on('done', this.trigger.bind(this, 'done'));
};
CaptionStream.prototype = new Stream();
CaptionStream.prototype.push = function(event) {
  var sei, userData, captionPackets;

  // only examine SEI NALs
  if (event.nalUnitType !== 'sei_rbsp') {
    return;
  }

  // parse the sei
  sei = parseSei(event.escapedRBSP);

  // ignore everything but user_data_registered_itu_t_t35
  if (sei.payloadType !== USER_DATA_REGISTERED_ITU_T_T35) {
    return;
  }

  // parse out the user data payload
  userData = parseUserData(sei);

  // ignore unrecognized userData
  if (!userData) {
    return;
  }

  // parse out CC data packets and save them for later
  this.captionPackets_ = this.captionPackets_.concat(parseCaptionPackets(event.pts, userData));
};

CaptionStream.prototype.flush = function () {
  // make sure we actually parsed captions before proceeding
  if (!this.captionPackets_.length) {
    this.field1_.flush();
    return;
  }

  // sort caption byte-pairs based on their PTS values
  this.captionPackets_.sort(function(a, b) {
    return a.pts - b.pts;
  });

  // Push each caption into Cea608Stream
  this.captionPackets_.forEach(this.field1_.push, this.field1_);

  this.captionPackets_.length = 0;
  this.field1_.flush();
  return;
};
// ----------------------
// Session to Application
// ----------------------

var BASIC_CHARACTER_TRANSLATION = {
  0x2a: 0xe1,
  0x5c: 0xe9,
  0x5e: 0xed,
  0x5f: 0xf3,
  0x60: 0xfa,
  0x7b: 0xe7,
  0x7c: 0xf7,
  0x7d: 0xd1,
  0x7e: 0xf1,
  0x7f: 0x2588
};

var getCharFromCode = function(code) {
  if(code === null) {
    return '';
  }
  code = BASIC_CHARACTER_TRANSLATION[code] || code;
  return String.fromCharCode(code);
};

// Constants for the byte codes recognized by Cea608Stream. This
// list is not exhaustive. For a more comprehensive listing and
// semantics see
// http://www.gpo.gov/fdsys/pkg/CFR-2010-title47-vol1/pdf/CFR-2010-title47-vol1-sec15-119.pdf
var PADDING                    = 0x0000,

    // Pop-on Mode
    RESUME_CAPTION_LOADING     = 0x1420,
    END_OF_CAPTION             = 0x142f,

    // Roll-up Mode
    ROLL_UP_2_ROWS             = 0x1425,
    ROLL_UP_3_ROWS             = 0x1426,
    ROLL_UP_4_ROWS             = 0x1427,
    RESUME_DIRECT_CAPTIONING   = 0x1429,
    CARRIAGE_RETURN            = 0x142d,
    // Erasure
    BACKSPACE                  = 0x1421,
    ERASE_DISPLAYED_MEMORY     = 0x142c,
    ERASE_NON_DISPLAYED_MEMORY = 0x142e;

// the index of the last row in a CEA-608 display buffer
var BOTTOM_ROW = 14;
// CEA-608 captions are rendered onto a 34x15 matrix of character
// cells. The "bottom" row is the last element in the outer array.
var createDisplayBuffer = function() {
  var result = [], i = BOTTOM_ROW + 1;
  while (i--) {
    result.push('');
  }
  return result;
};

var Cea608Stream = function() {
  Cea608Stream.prototype.init.call(this);

  this.mode_ = 'popOn';
  // When in roll-up mode, the index of the last row that will
  // actually display captions. If a caption is shifted to a row
  // with a lower index than this, it is cleared from the display
  // buffer
  this.topRow_ = 0;
  this.startPts_ = 0;
  this.displayed_ = createDisplayBuffer();
  this.nonDisplayed_ = createDisplayBuffer();
  this.lastControlCode_ = null;

  this.push = function(packet) {
    // Ignore other channels
    if (packet.type !== 0) {
      return;
    }
    var data, swap, char0, char1;
    // remove the parity bits
    data = packet.ccData & 0x7f7f;

    // ignore duplicate control codes
    if (data === this.lastControlCode_) {
      this.lastControlCode_ = null;
      return;
    }

    // Store control codes
    if ((data & 0xf000) === 0x1000) {
      this.lastControlCode_ = data;
    } else {
      this.lastControlCode_ = null;
    }

    switch (data) {
    case PADDING:
      break;
    case RESUME_CAPTION_LOADING:
      this.mode_ = 'popOn';
      break;
    case END_OF_CAPTION:
      // if a caption was being displayed, it's gone now
      this.flushDisplayed(packet.pts);

      // flip memory
      swap = this.displayed_;
      this.displayed_ = this.nonDisplayed_;
      this.nonDisplayed_ = swap;

      // start measuring the time to display the caption
      this.startPts_ = packet.pts;
      break;

    case ROLL_UP_2_ROWS:
      this.topRow_ = BOTTOM_ROW - 1;
      this.mode_ = 'rollUp';
      break;
    case ROLL_UP_3_ROWS:
      this.topRow_ = BOTTOM_ROW - 2;
      this.mode_ = 'rollUp';
      break;
    case ROLL_UP_4_ROWS:
      this.topRow_ = BOTTOM_ROW - 3;
      this.mode_ = 'rollUp';
      break;
    case CARRIAGE_RETURN:
      this.flushDisplayed(packet.pts);
      this.shiftRowsUp_();
      this.startPts_ = packet.pts;
      break;

    case BACKSPACE:
      if (this.mode_ === 'popOn') {
        this.nonDisplayed_[BOTTOM_ROW] = this.nonDisplayed_[BOTTOM_ROW].slice(0, -1);
      } else {
        this.displayed_[BOTTOM_ROW] = this.displayed_[BOTTOM_ROW].slice(0, -1);
      }
      break;
    case ERASE_DISPLAYED_MEMORY:
      this.flushDisplayed(packet.pts);
      this.displayed_ = createDisplayBuffer();
      break;
    case ERASE_NON_DISPLAYED_MEMORY:
      this.nonDisplayed_ = createDisplayBuffer();
      break;
    default:
      char0 = data >>> 8;
      char1 = data & 0xff;

      // Look for a Channel 1 Preamble Address Code
      if (char0 >= 0x10 && char0 <= 0x17 &&
          char1 >= 0x40 && char1 <= 0x7F &&
          (char0 !== 0x10 || char1 < 0x60)) {
        // Follow Safari's lead and replace the PAC with a space
        char0 = 0x20;
        // we only want one space so make the second character null
        // which will get become '' in getCharFromCode
        char1 = null;
      }

      // Look for special character sets
      if ((char0 === 0x11 || char0 === 0x19) &&
          (char1 >= 0x30 && char1 <= 0x3F)) {
        // Put in eigth note and space
        char0 = 0xE299AA;
        char1 = '';
      }

      // ignore unsupported control codes
      if ((char0 & 0xf0) === 0x10) {
        return;
      }

      // character handling is dependent on the current mode
      this[this.mode_](packet.pts, char0, char1);
      break;
    }
  };
};
Cea608Stream.prototype = new Stream();
// Trigger a cue point that captures the current state of the
// display buffer
Cea608Stream.prototype.flushDisplayed = function(pts) {
  var row, i;

  for (i = 0; i < this.displayed_.length; i++) {
    row = this.displayed_[i];
    if (row.length) {
      this.trigger('data', {
        startPts: this.startPts_,
        endPts: pts,
        // remove spaces from the start and end of the string
        text: row.trim()
      });
    }
  }
};

// Mode Implementations
Cea608Stream.prototype.popOn = function(pts, char0, char1) {
  var baseRow = this.nonDisplayed_[BOTTOM_ROW];

  // buffer characters
  baseRow += getCharFromCode(char0);
  baseRow += getCharFromCode(char1);
  this.nonDisplayed_[BOTTOM_ROW] = baseRow;
};

Cea608Stream.prototype.rollUp = function(pts, char0, char1) {
  var baseRow = this.displayed_[BOTTOM_ROW];
  if (baseRow === '') {
    // we're starting to buffer new display input, so flush out the
    // current display
    this.flushDisplayed(pts);

    this.startPts_ = pts;
  }

  baseRow += getCharFromCode(char0);
  baseRow += getCharFromCode(char1);

  this.displayed_[BOTTOM_ROW] = baseRow;
};
Cea608Stream.prototype.shiftRowsUp_ = function() {
  var i;
  // clear out inactive rows
  for (i = 0; i < this.topRow_; i++) {
    this.displayed_[i] = '';
  }
  // shift displayed rows up
  for (i = this.topRow_; i < BOTTOM_ROW; i++) {
    this.displayed_[i] = this.displayed_[i + 1];
  }
  // clear out the bottom row
  this.displayed_[BOTTOM_ROW] = '';
};

// exports
module.exports = {
  CaptionStream: CaptionStream,
  Cea608Stream: Cea608Stream,
};


},{"../utils/stream":20}],10:[function(require,module,exports){
module.exports = require('./m2ts');

},{"./m2ts":11}],11:[function(require,module,exports){
/**
 * mux.js
 *
 * Copyright (c) 2015 Brightcove
 * All rights reserved.
 *
 * A stream-based mp2t to mp4 converter. This utility can be used to
 * deliver mp4s to a SourceBuffer on platforms that support native
 * Media Source Extensions.
 */
'use strict';
var Stream = require('../utils/stream.js'),
  CaptionStream = require('./caption-stream'),
  StreamTypes = require('./stream-types');

var Stream = require('../utils/stream.js');
var m2tsStreamTypes = require('./stream-types.js');

// object types
var
  TransportPacketStream, TransportParseStream, ElementaryStream,
  AacStream, H264Stream, NalByteStream;

// constants
var
  MP2T_PACKET_LENGTH = 188, // bytes
  SYNC_BYTE = 0x47,

/**
 * Splits an incoming stream of binary data into MPEG-2 Transport
 * Stream packets.
 */
TransportPacketStream = function() {
  var
    buffer = new Uint8Array(MP2T_PACKET_LENGTH),
    bytesInBuffer = 0;

  TransportPacketStream.prototype.init.call(this);

   // Deliver new bytes to the stream.

  this.push = function(bytes) {
    var
      i = 0,
      startIndex = 0,
      endIndex = MP2T_PACKET_LENGTH,
      everything;

    // If there are bytes remaining from the last segment, prepend them to the
    // bytes that were pushed in
    if (bytesInBuffer) {
      everything = new Uint8Array(bytes.byteLength + bytesInBuffer);
      everything.set(buffer.subarray(0, bytesInBuffer));
      everything.set(bytes, bytesInBuffer);
      bytesInBuffer = 0;
    } else {
      everything = bytes;
    }

    // While we have enough data for a packet
    while (endIndex < everything.byteLength) {
      // Look for a pair of start and end sync bytes in the data..
      if (everything[startIndex] === SYNC_BYTE && everything[endIndex] === SYNC_BYTE) {
        // We found a packet so emit it and jump one whole packet forward in
        // the stream
        this.trigger('data', everything.subarray(startIndex, endIndex));
        startIndex += MP2T_PACKET_LENGTH;
        endIndex += MP2T_PACKET_LENGTH;
        continue;
      }
      // If we get here, we have somehow become de-synchronized and we need to step
      // forward one byte at a time until we find a pair of sync bytes that denote
      // a packet
      startIndex++;
      endIndex++;
    }

    // If there was some data left over at the end of the segment that couldn't
    // possibly be a whole packet, keep it because it might be the start of a packet
    // that continues in the next segment
    if (startIndex < everything.byteLength) {
      buffer.set(everything.subarray(startIndex), 0);
      bytesInBuffer = everything.byteLength - startIndex;
    }
  };

  this.flush = function () {
    // If the buffer contains a whole packet when we are being flushed, emit it
    // and empty the buffer. Otherwise hold onto the data because it may be
    // important for decoding the next segment
    if (bytesInBuffer === MP2T_PACKET_LENGTH && buffer[0] === SYNC_BYTE) {
      this.trigger('data', buffer);
      bytesInBuffer = 0;
    }
    this.trigger('done');
  };
};
TransportPacketStream.prototype = new Stream();

/**
 * Accepts an MP2T TransportPacketStream and emits data events with parsed
 * forms of the individual transport stream packets.
 */
TransportParseStream = function() {
  var parsePsi, parsePat, parsePmt, parsePes, self;
  TransportParseStream.prototype.init.call(this);
  self = this;

  this.packetsWaitingForPmt = [];
  this.programMapTable = undefined;

  parsePsi = function(payload, psi) {
    var offset = 0;

    // PSI packets may be split into multiple sections and those
    // sections may be split into multiple packets. If a PSI
    // section starts in this packet, the payload_unit_start_indicator
    // will be true and the first byte of the payload will indicate
    // the offset from the current position to the start of the
    // section.
    if (psi.payloadUnitStartIndicator) {
      offset += payload[offset] + 1;
    }

    if (psi.type === 'pat') {
      parsePat(payload.subarray(offset), psi);
    } else {
      parsePmt(payload.subarray(offset), psi);
    }
  };

  parsePat = function(payload, pat) {
    pat.section_number = payload[7];
    pat.last_section_number = payload[8];

    // skip the PSI header and parse the first PMT entry
    self.pmtPid = (payload[10] & 0x1F) << 8 | payload[11];
    pat.pmtPid = self.pmtPid;
  };

  /**
   * Parse out the relevant fields of a Program Map Table (PMT).
   * @param payload {Uint8Array} the PMT-specific portion of an MP2T
   * packet. The first byte in this array should be the table_id
   * field.
   * @param pmt {object} the object that should be decorated with
   * fields parsed from the PMT.
   */
  parsePmt = function(payload, pmt) {
    var sectionLength, tableEnd, programInfoLength, offset;

    // PMTs can be sent ahead of the time when they should actually
    // take effect. We don't believe this should ever be the case
    // for HLS but we'll ignore "forward" PMT declarations if we see
    // them. Future PMT declarations have the current_next_indicator
    // set to zero.
    if (!(payload[5] & 0x01)) {
      return;
    }

    // overwrite any existing program map table
    self.programMapTable = {};

    // the mapping table ends at the end of the current section
    sectionLength = (payload[1] & 0x0f) << 8 | payload[2];
    tableEnd = 3 + sectionLength - 4;

    // to determine where the table is, we have to figure out how
    // long the program info descriptors are
    programInfoLength = (payload[10] & 0x0f) << 8 | payload[11];

    // advance the offset to the first entry in the mapping table
    offset = 12 + programInfoLength;
    while (offset < tableEnd) {
      // add an entry that maps the elementary_pid to the stream_type
      self.programMapTable[(payload[offset + 1] & 0x1F) << 8 | payload[offset + 2]] = payload[offset];

      // move to the next table entry
      // skip past the elementary stream descriptors, if present
      offset += ((payload[offset + 3] & 0x0F) << 8 | payload[offset + 4]) + 5;
    }

    // record the map on the packet as well
    pmt.programMapTable = self.programMapTable;

    // if there are any packets waiting for a PMT to be found, process them now
    while (self.packetsWaitingForPmt.length) {
      self.processPes_.apply(self, self.packetsWaitingForPmt.shift());
    }
  };

  /**
   * Deliver a new MP2T packet to the stream.
   */
  this.push = function(packet) {
    var
      result = {},
      offset = 4;

    result.payloadUnitStartIndicator = !!(packet[1] & 0x40);

    // pid is a 13-bit field starting at the last bit of packet[1]
    result.pid = packet[1] & 0x1f;
    result.pid <<= 8;
    result.pid |= packet[2];

    // if an adaption field is present, its length is specified by the
    // fifth byte of the TS packet header. The adaptation field is
    // used to add stuffing to PES packets that don't fill a complete
    // TS packet, and to specify some forms of timing and control data
    // that we do not currently use.
    if (((packet[3] & 0x30) >>> 4) > 0x01) {
      offset += packet[offset] + 1;
    }

    // parse the rest of the packet based on the type
    if (result.pid === 0) {
      result.type = 'pat';
      parsePsi(packet.subarray(offset), result);
      this.trigger('data', result);
    } else if (result.pid === this.pmtPid) {
      result.type = 'pmt';
      parsePsi(packet.subarray(offset), result);
      this.trigger('data', result);
    } else if (this.programMapTable === undefined) {
      // When we have not seen a PMT yet, defer further processing of
      // PES packets until one has been parsed
      this.packetsWaitingForPmt.push([packet, offset, result]);
    } else {
      this.processPes_(packet, offset, result);
    }
  };

  this.processPes_ = function (packet, offset, result) {
    result.streamType = this.programMapTable[result.pid];
    result.type = 'pes';
    result.data = packet.subarray(offset);

    this.trigger('data', result);
  };

};
TransportParseStream.prototype = new Stream();
TransportParseStream.STREAM_TYPES  = {
  h264: 0x1b,
  adts: 0x0f
};

/**
 * Reconsistutes program elementary stream (PES) packets from parsed
 * transport stream packets. That is, if you pipe an
 * mp2t.TransportParseStream into a mp2t.ElementaryStream, the output
 * events will be events which capture the bytes for individual PES
 * packets plus relevant metadata that has been extracted from the
 * container.
 */
ElementaryStream = function() {
  var
    // PES packet fragments
    video = {
      data: [],
      size: 0
    },
    audio = {
      data: [],
      size: 0
    },
    timedMetadata = {
      data: [],
      size: 0
    },
    parsePes = function(payload, pes) {
      var ptsDtsFlags;

      // find out if this packets starts a new keyframe
      pes.dataAlignmentIndicator = (payload[6] & 0x04) !== 0;
      // PES packets may be annotated with a PTS value, or a PTS value
      // and a DTS value. Determine what combination of values is
      // available to work with.
      ptsDtsFlags = payload[7];

      // PTS and DTS are normally stored as a 33-bit number.  Javascript
      // performs all bitwise operations on 32-bit integers but javascript
      // supports a much greater range (52-bits) of integer using standard
      // mathematical operations.
      // We construct a 31-bit value using bitwise operators over the 31
      // most significant bits and then multiply by 4 (equal to a left-shift
      // of 2) before we add the final 2 least significant bits of the
      // timestamp (equal to an OR.)
      if (ptsDtsFlags & 0xC0) {
        // the PTS and DTS are not written out directly. For information
        // on how they are encoded, see
        // http://dvd.sourceforge.net/dvdinfo/pes-hdr.html
        pes.pts = (payload[9] & 0x0E) << 27
          | (payload[10] & 0xFF) << 20
          | (payload[11] & 0xFE) << 12
          | (payload[12] & 0xFF) <<  5
          | (payload[13] & 0xFE) >>>  3;
        pes.pts *= 4; // Left shift by 2
        pes.pts += (payload[13] & 0x06) >>> 1; // OR by the two LSBs
        pes.dts = pes.pts;
        if (ptsDtsFlags & 0x40) {
          pes.dts = (payload[14] & 0x0E ) << 27
            | (payload[15] & 0xFF ) << 20
            | (payload[16] & 0xFE ) << 12
            | (payload[17] & 0xFF ) << 5
            | (payload[18] & 0xFE ) >>> 3;
          pes.dts *= 4; // Left shift by 2
          pes.dts += (payload[18] & 0x06) >>> 1; // OR by the two LSBs
        }
      }

      // the data section starts immediately after the PES header.
      // pes_header_data_length specifies the number of header bytes
      // that follow the last byte of the field.
      pes.data = payload.subarray(9 + payload[8]);
    },
    flushStream = function(stream, type) {
      var
        packetData = new Uint8Array(stream.size),
        event = {
          type: type
        },
        i = 0,
        fragment;

      // do nothing if there is no buffered data
      if (!stream.data.length) {
        return;
      }
      event.trackId = stream.data[0].pid;

      // reassemble the packet
      while (stream.data.length) {
        fragment = stream.data.shift();

        packetData.set(fragment.data, i);
        i += fragment.data.byteLength;
      }

      // parse assembled packet's PES header
      parsePes(packetData, event);

      stream.size = 0;

      self.trigger('data', event);
    },
    self;

  ElementaryStream.prototype.init.call(this);
  self = this;

  this.push = function(data) {
    ({
      pat: function() {
        // we have to wait for the PMT to arrive as well before we
        // have any meaningful metadata
      },
      pes: function() {
        var stream, streamType;

        switch (data.streamType) {
        case StreamTypes.H264_STREAM_TYPE:
        case m2tsStreamTypes.H264_STREAM_TYPE:
          stream = video;
          streamType = 'video';
          break;
        case StreamTypes.ADTS_STREAM_TYPE:
          stream = audio;
          streamType = 'audio';
          break;
        case StreamTypes.METADATA_STREAM_TYPE:
          stream = timedMetadata;
          streamType = 'timed-metadata';
          break;
        default:
          // ignore unknown stream types
          return;
        }

        // if a new packet is starting, we can flush the completed
        // packet
        if (data.payloadUnitStartIndicator) {
          flushStream(stream, streamType);
        }

        // buffer this fragment until we are sure we've received the
        // complete payload
        stream.data.push(data);
        stream.size += data.data.byteLength;
      },
      pmt: function() {
        var
          event = {
            type: 'metadata',
            tracks: []
          },
          programMapTable = data.programMapTable,
          k,
          track;

        // translate streams to tracks
        for (k in programMapTable) {
          if (programMapTable.hasOwnProperty(k)) {
            track = {
              timelineStartInfo: {
                baseMediaDecodeTime: 0
              }
            };
            track.id = +k;
            if (programMapTable[k] === m2tsStreamTypes.H264_STREAM_TYPE) {
              track.codec = 'avc';
              track.type = 'video';
            } else if (programMapTable[k] === m2tsStreamTypes.ADTS_STREAM_TYPE) {
              track.codec = 'adts';
              track.type = 'audio';
            }
            event.tracks.push(track);
          }
        }
        self.trigger('data', event);
      }
    })[data.type]();
  };

  /**
   * Flush any remaining input. Video PES packets may be of variable
   * length. Normally, the start of a new video packet can trigger the
   * finalization of the previous packet. That is not possible if no
   * more video is forthcoming, however. In that case, some other
   * mechanism (like the end of the file) has to be employed. When it is
   * clear that no additional data is forthcoming, calling this method
   * will flush the buffered packets.
   */
  this.flush = function() {
    // !!THIS ORDER IS IMPORTANT!!
    // video first then audio
    flushStream(video, 'video');
    flushStream(audio, 'audio');
    flushStream(timedMetadata, 'timed-metadata');
    this.trigger('done');
  };
};
ElementaryStream.prototype = new Stream();

var m2ts = {
  PAT_PID: 0x0000,
  MP2T_PACKET_LENGTH: MP2T_PACKET_LENGTH,
  TransportPacketStream: TransportPacketStream,
  TransportParseStream: TransportParseStream,
  ElementaryStream: ElementaryStream,
  CaptionStream: CaptionStream.CaptionStream,
  Cea608Stream: CaptionStream.Cea608Stream,
  MetadataStream: require('./metadata-stream'),
};

for (var type in StreamTypes) {
  if (StreamTypes.hasOwnProperty(type)) {
    m2ts[type] = StreamTypes[type];
  }
}

module.exports = m2ts;

},{"../utils/stream.js":20,"./caption-stream":9,"./metadata-stream":12,"./stream-types":13,"./stream-types.js":13}],12:[function(require,module,exports){
/**
 * Accepts program elementary stream (PES) data events and parses out
 * ID3 metadata from them, if present.
 * @see http://id3.org/id3v2.3.0
 */
'use strict';
var
  Stream = require('../utils/stream'),
  StreamTypes = require('./stream-types'),
  // return a percent-encoded representation of the specified byte range
  // @see http://en.wikipedia.org/wiki/Percent-encoding
  percentEncode = function(bytes, start, end) {
    var i, result = '';
    for (i = start; i < end; i++) {
      result += '%' + ('00' + bytes[i].toString(16)).slice(-2);
    }
    return result;
  },
  // return the string representation of the specified byte range,
  // interpreted as UTf-8.
  parseUtf8 = function(bytes, start, end) {
    return decodeURIComponent(percentEncode(bytes, start, end));
  },
  // return the string representation of the specified byte range,
  // interpreted as ISO-8859-1.
  parseIso88591 = function(bytes, start, end) {
    return unescape(percentEncode(bytes, start, end)); // jshint ignore:line
  },
  parseSyncSafeInteger = function (data) {
    return (data[0] << 21) |
            (data[1] << 14) |
            (data[2] << 7) |
            (data[3]);
  },
  tagParsers = {
    'TXXX': function(tag) {
      var i;
      if (tag.data[0] !== 3) {
        // ignore frames with unrecognized character encodings
        return;
      }

      for (i = 1; i < tag.data.length; i++) {
        if (tag.data[i] === 0) {
          // parse the text fields
          tag.description = parseUtf8(tag.data, 1, i);
          // do not include the null terminator in the tag value
          tag.value = parseUtf8(tag.data, i + 1, tag.data.length - 1);
          break;
        }
      }
      tag.data = tag.value;
    },
    'WXXX': function(tag) {
      var i;
      if (tag.data[0] !== 3) {
        // ignore frames with unrecognized character encodings
        return;
      }

      for (i = 1; i < tag.data.length; i++) {
        if (tag.data[i] === 0) {
          // parse the description and URL fields
          tag.description = parseUtf8(tag.data, 1, i);
          tag.url = parseUtf8(tag.data, i + 1, tag.data.length);
          break;
        }
      }
    },
    'PRIV': function(tag) {
      var i;

      for (i = 0; i < tag.data.length; i++) {
        if (tag.data[i] === 0) {
          // parse the description and URL fields
          tag.owner = parseIso88591(tag.data, 0, i);
          break;
        }
      }
      tag.privateData = tag.data.subarray(i + 1);
      tag.data = tag.privateData;
    }
  },
  MetadataStream;

MetadataStream = function(options) {
  var
    settings = {
      debug: !!(options && options.debug),

      // the bytes of the program-level descriptor field in MP2T
      // see ISO/IEC 13818-1:2013 (E), section 2.6 "Program and
      // program element descriptors"
      descriptor: options && options.descriptor
    },
    // the total size in bytes of the ID3 tag being parsed
    tagSize = 0,
    // tag data that is not complete enough to be parsed
    buffer = [],
    // the total number of bytes currently in the buffer
    bufferSize = 0,
    i;

  MetadataStream.prototype.init.call(this);

  // calculate the text track in-band metadata track dispatch type
  // https://html.spec.whatwg.org/multipage/embedded-content.html#steps-to-expose-a-media-resource-specific-text-track
  this.dispatchType = StreamTypes.METADATA_STREAM_TYPE.toString(16);
  if (settings.descriptor) {
    for (i = 0; i < settings.descriptor.length; i++) {
      this.dispatchType += ('00' + settings.descriptor[i].toString(16)).slice(-2);
    }
  }

  this.push = function(chunk) {
    var tag, frameStart, frameSize, frame, i, frameHeader;
    if (chunk.type !== 'timed-metadata') {
      return;
    }

    // if data_alignment_indicator is set in the PES header,
    // we must have the start of a new ID3 tag. Assume anything
    // remaining in the buffer was malformed and throw it out
    if (chunk.dataAlignmentIndicator) {
      bufferSize = 0;
      buffer.length = 0;
    }

    // ignore events that don't look like ID3 data
    if (buffer.length === 0 &&
        (chunk.data.length < 10 ||
          chunk.data[0] !== 'I'.charCodeAt(0) ||
          chunk.data[1] !== 'D'.charCodeAt(0) ||
          chunk.data[2] !== '3'.charCodeAt(0))) {
      if (settings.debug) {
        console.log('Skipping unrecognized metadata packet');
      }
      return;
    }

    // add this chunk to the data we've collected so far

    buffer.push(chunk);
    bufferSize += chunk.data.byteLength;

    // grab the size of the entire frame from the ID3 header
    if (buffer.length === 1) {
      // the frame size is transmitted as a 28-bit integer in the
      // last four bytes of the ID3 header.
      // The most significant bit of each byte is dropped and the
      // results concatenated to recover the actual value.
      tagSize = parseSyncSafeInteger(chunk.data.subarray(6, 10));

      // ID3 reports the tag size excluding the header but it's more
      // convenient for our comparisons to include it
      tagSize += 10;
    }

    // if the entire frame has not arrived, wait for more data
    if (bufferSize < tagSize) {
      return;
    }

    // collect the entire frame so it can be parsed
    tag = {
      data: new Uint8Array(tagSize),
      frames: [],
      pts: buffer[0].pts,
      dts: buffer[0].dts
    };
    for (i = 0; i < tagSize;) {
      tag.data.set(buffer[0].data.subarray(0, tagSize - i), i);
      i += buffer[0].data.byteLength;
      bufferSize -= buffer[0].data.byteLength;
      buffer.shift();
    }

    // find the start of the first frame and the end of the tag
    frameStart = 10;
    if (tag.data[5] & 0x40) {
      // advance the frame start past the extended header
      frameStart += 4; // header size field
      frameStart += parseSyncSafeInteger(tag.data.subarray(10, 14));

      // clip any padding off the end
      tagSize -= parseSyncSafeInteger(tag.data.subarray(16, 20));
    }

    // parse one or more ID3 frames
    // http://id3.org/id3v2.3.0#ID3v2_frame_overview
    do {
      // determine the number of bytes in this frame
      frameSize = parseSyncSafeInteger(tag.data.subarray(frameStart + 4, frameStart + 8));
      if (frameSize < 1) {
        return console.log('Malformed ID3 frame encountered. Skipping metadata parsing.');
      }
      frameHeader = String.fromCharCode(tag.data[frameStart],
                                        tag.data[frameStart + 1],
                                        tag.data[frameStart + 2],
                                        tag.data[frameStart + 3]);


      frame = {
        id: frameHeader,
        data: tag.data.subarray(frameStart + 10, frameStart + frameSize + 10)
      };
      frame.key = frame.id;
      if (tagParsers[frame.id]) {
        tagParsers[frame.id](frame);
        if (frame.owner === 'com.apple.streaming.transportStreamTimestamp') {
          var
            d = frame.data,
            size = ((d[3] & 0x01)  << 30) |
                   (d[4]  << 22) |
                   (d[5] << 14) |
                   (d[6] << 6) |
                   (d[7] >>> 2);

          size *= 4;
          size += d[7] & 0x03;
          frame.timeStamp = size;
          this.trigger('timestamp', frame);
        }
      }
      tag.frames.push(frame);

      frameStart += 10; // advance past the frame header
      frameStart += frameSize; // advance past the frame body
    } while (frameStart < tagSize);
    this.trigger('data', tag);
  };
};
MetadataStream.prototype = new Stream();

module.exports = MetadataStream;

},{"../utils/stream":20,"./stream-types":13}],13:[function(require,module,exports){
'use strict';

module.exports = {
  H264_STREAM_TYPE: 0x1B,
  ADTS_STREAM_TYPE: 0x0F,
  METADATA_STREAM_TYPE: 0x15
};

},{}],14:[function(require,module,exports){
module.exports = {
  generator: require('./mp4-generator'),
  Transmuxer: require('./transmuxer').Transmuxer,
  AudioSegmentStream: require('./transmuxer').AudioSegmentStream,
  VideoSegmentStream: require('./transmuxer').VideoSegmentStream,
  tools: require('../tools/mp4-inspector'),
};

},{"../tools/mp4-inspector":18,"./mp4-generator":15,"./transmuxer":16}],15:[function(require,module,exports){
/**
 * mux.js
 *
 * Copyright (c) 2015 Brightcove
 * All rights reserved.
 *
 * Functions that generate fragmented MP4s suitable for use with Media
 * Source Extensions.
 */
'use strict';

var box, dinf, esds, ftyp, mdat, mfhd, minf, moof, moov, mvex, mvhd, trak,
    tkhd, mdia, mdhd, hdlr, sdtp, stbl, stsd, styp, traf, trex, trun,
    types, MAJOR_BRAND, MINOR_VERSION, AVC1_BRAND, VIDEO_HDLR,
    AUDIO_HDLR, HDLR_TYPES, VMHD, SMHD, DREF, STCO, STSC, STSZ, STTS;

// pre-calculate constants
(function() {
  var i;
  types = {
    avc1: [], // codingname
    avcC: [],
    btrt: [],
    dinf: [],
    dref: [],
    esds: [],
    ftyp: [],
    hdlr: [],
    mdat: [],
    mdhd: [],
    mdia: [],
    mfhd: [],
    minf: [],
    moof: [],
    moov: [],
    mp4a: [], // codingname
    mvex: [],
    mvhd: [],
    sdtp: [],
    smhd: [],
    stbl: [],
    stco: [],
    stsc: [],
    stsd: [],
    stsz: [],
    stts: [],
    styp: [],
    tfdt: [],
    tfhd: [],
    traf: [],
    trak: [],
    trun: [],
    trex: [],
    tkhd: [],
    vmhd: []
  };

  for (i in types) {
    if (types.hasOwnProperty(i)) {
      types[i] = [
        i.charCodeAt(0),
        i.charCodeAt(1),
        i.charCodeAt(2),
        i.charCodeAt(3)
      ];
    }
  }

  MAJOR_BRAND = new Uint8Array([
    'i'.charCodeAt(0),
    's'.charCodeAt(0),
    'o'.charCodeAt(0),
    'm'.charCodeAt(0)
  ]);
  AVC1_BRAND = new Uint8Array([
    'a'.charCodeAt(0),
    'v'.charCodeAt(0),
    'c'.charCodeAt(0),
    '1'.charCodeAt(0)
  ]);
  MINOR_VERSION = new Uint8Array([0, 0, 0, 1]);
  VIDEO_HDLR = new Uint8Array([
    0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, // pre_defined
    0x76, 0x69, 0x64, 0x65, // handler_type: 'vide'
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x56, 0x69, 0x64, 0x65,
    0x6f, 0x48, 0x61, 0x6e,
    0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'VideoHandler'
  ]);
  AUDIO_HDLR = new Uint8Array([
    0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, // pre_defined
    0x73, 0x6f, 0x75, 0x6e, // handler_type: 'soun'
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x53, 0x6f, 0x75, 0x6e,
    0x64, 0x48, 0x61, 0x6e,
    0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'SoundHandler'
  ]);
  HDLR_TYPES = {
    "video":VIDEO_HDLR,
    "audio": AUDIO_HDLR
  };
  DREF = new Uint8Array([
    0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x01, // entry_count
    0x00, 0x00, 0x00, 0x0c, // entry_size
    0x75, 0x72, 0x6c, 0x20, // 'url' type
    0x00, // version 0
    0x00, 0x00, 0x01 // entry_flags
  ]);
  SMHD = new Uint8Array([
    0x00,             // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00,       // balance, 0 means centered
    0x00, 0x00        // reserved
  ]);
  STCO = new Uint8Array([
    0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00 // entry_count
  ]);
  STSC = STCO;
  STSZ = new Uint8Array([
    0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, // sample_size
    0x00, 0x00, 0x00, 0x00, // sample_count
  ]);
  STTS = STCO;
  VMHD = new Uint8Array([
    0x00, // version
    0x00, 0x00, 0x01, // flags
    0x00, 0x00, // graphicsmode
    0x00, 0x00,
    0x00, 0x00,
    0x00, 0x00 // opcolor
  ]);
})();

box = function(type) {
  var
    payload = [],
    size = 0,
    i,
    result,
    view;

  for (i = 1; i < arguments.length; i++) {
    payload.push(arguments[i]);
  }

  i = payload.length;

  // calculate the total size we need to allocate
  while (i--) {
    size += payload[i].byteLength;
  }
  result = new Uint8Array(size + 8);
  view = new DataView(result.buffer, result.byteOffset, result.byteLength);
  view.setUint32(0, result.byteLength);
  result.set(type, 4);

  // copy the payload into the result
  for (i = 0, size = 8; i < payload.length; i++) {
    result.set(payload[i], size);
    size += payload[i].byteLength;
  }
  return result;
};

dinf = function() {
  return box(types.dinf, box(types.dref, DREF));
};

esds = function(track) {
  return box(types.esds, new Uint8Array([
    0x00, // version
    0x00, 0x00, 0x00, // flags

    // ES_Descriptor
    0x03, // tag, ES_DescrTag
    0x19, // length
    0x00, 0x00, // ES_ID
    0x00, // streamDependenceFlag, URL_flag, reserved, streamPriority

    // DecoderConfigDescriptor
    0x04, // tag, DecoderConfigDescrTag
    0x11, // length
    0x40, // object type
    0x15,  // streamType
    0x00, 0x06, 0x00, // bufferSizeDB
    0x00, 0x00, 0xda, 0xc0, // maxBitrate
    0x00, 0x00, 0xda, 0xc0, // avgBitrate

    // DecoderSpecificInfo
    0x05, // tag, DecoderSpecificInfoTag
    0x02, // length
    // ISO/IEC 14496-3, AudioSpecificConfig
    // for samplingFrequencyIndex see ISO/IEC 13818-7:2006, 8.1.3.2.2, Table 35
    (track.audioobjecttype << 3) | (track.samplingfrequencyindex >>> 1),
    (track.samplingfrequencyindex << 7) | (track.channelcount << 3),
    0x06, 0x01, 0x02 // GASpecificConfig
  ]));
};

ftyp = function() {
  return box(types.ftyp, MAJOR_BRAND, MINOR_VERSION, MAJOR_BRAND, AVC1_BRAND);
};

hdlr = function(type) {
  return box(types.hdlr, HDLR_TYPES[type]);
};
mdat = function(data) {
  return box(types.mdat, data);
};
mdhd = function(track) {
  var result = new Uint8Array([
    0x00,                   // version 0
    0x00, 0x00, 0x00,       // flags
    0x00, 0x00, 0x00, 0x02, // creation_time
    0x00, 0x00, 0x00, 0x03, // modification_time
    0x00, 0x01, 0x5f, 0x90, // timescale, 90,000 "ticks" per second

    (track.duration >>> 24) & 0xFF,
    (track.duration >>> 16) & 0xFF,
    (track.duration >>>  8) & 0xFF,
    track.duration & 0xFF,  // duration
    0x55, 0xc4,             // 'und' language (undetermined)
    0x00, 0x00
  ]);

  // Use the sample rate from the track metadata, when it is
  // defined. The sample rate can be parsed out of an ADTS header, for
  // instance.
  if (track.samplerate) {
    result[12] = (track.samplerate >>> 24) & 0xFF;
    result[13] = (track.samplerate >>> 16) & 0xFF;
    result[14] = (track.samplerate >>>  8) & 0xFF;
    result[15] = (track.samplerate)        & 0xFF;
  }

  return box(types.mdhd, result);
};
mdia = function(track) {
  return box(types.mdia, mdhd(track), hdlr(track.type), minf(track));
};
mfhd = function(sequenceNumber) {
  return box(types.mfhd, new Uint8Array([
    0x00,
    0x00, 0x00, 0x00, // flags
    (sequenceNumber & 0xFF000000) >> 24,
    (sequenceNumber & 0xFF0000) >> 16,
    (sequenceNumber & 0xFF00) >> 8,
    sequenceNumber & 0xFF, // sequence_number
  ]));
};
minf = function(track) {
  return box(types.minf,
             track.type === 'video' ? box(types.vmhd, VMHD) : box(types.smhd, SMHD),
             dinf(),
             stbl(track));
};
moof = function(sequenceNumber, tracks) {
  var
    trackFragments = [],
    i = tracks.length;
  // build traf boxes for each track fragment
  while (i--) {
    trackFragments[i] = traf(tracks[i]);
  }
  return box.apply(null, [
    types.moof,
    mfhd(sequenceNumber)
  ].concat(trackFragments));
};
/**
 * Returns a movie box.
 * @param tracks {array} the tracks associated with this movie
 * @see ISO/IEC 14496-12:2012(E), section 8.2.1
 */
moov = function(tracks) {
  var
    i = tracks.length,
    boxes = [];

  while (i--) {
    boxes[i] = trak(tracks[i]);
  }

  return box.apply(null, [types.moov, mvhd(0xffffffff)].concat(boxes).concat(mvex(tracks)));
};
mvex = function(tracks) {
  var
    i = tracks.length,
    boxes = [];

  while (i--) {
    boxes[i] = trex(tracks[i]);
  }
  return box.apply(null, [types.mvex].concat(boxes));
};
mvhd = function(duration) {
  var
    bytes = new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x01, // creation_time
      0x00, 0x00, 0x00, 0x02, // modification_time
      0x00, 0x01, 0x5f, 0x90, // timescale, 90,000 "ticks" per second
      (duration & 0xFF000000) >> 24,
      (duration & 0xFF0000) >> 16,
      (duration & 0xFF00) >> 8,
      duration & 0xFF, // duration
      0x00, 0x01, 0x00, 0x00, // 1.0 rate
      0x01, 0x00, // 1.0 volume
      0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x01, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // pre_defined
      0xff, 0xff, 0xff, 0xff // next_track_ID
    ]);
  return box(types.mvhd, bytes);
};

sdtp = function(track) {
  var
    samples = track.samples || [],
    bytes = new Uint8Array(4 + samples.length),
    flags,
    i;

  // leave the full box header (4 bytes) all zero

  // write the sample table
  for (i = 0; i < samples.length; i++) {
    flags = samples[i].flags;

    bytes[i + 4] = (flags.dependsOn << 4) |
      (flags.isDependedOn << 2) |
      (flags.hasRedundancy);
  }

  return box(types.sdtp,
             bytes);
};

stbl = function(track) {
  return box(types.stbl,
             stsd(track),
             box(types.stts, STTS),
             box(types.stsc, STSC),
             box(types.stsz, STSZ),
             box(types.stco, STCO));
};

(function() {
  var videoSample, audioSample;

  stsd = function(track) {

    return box(types.stsd, new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x01
    ]), track.type === 'video' ? videoSample(track) : audioSample(track));
  };

  videoSample = function(track) {
    var
      sps = track.sps || [],
      pps = track.pps || [],
      sequenceParameterSets = [],
      pictureParameterSets = [],
      i;

    // assemble the SPSs
    for (i = 0; i < sps.length; i++) {
      sequenceParameterSets.push((sps[i].byteLength & 0xFF00) >>> 8);
      sequenceParameterSets.push((sps[i].byteLength & 0xFF)); // sequenceParameterSetLength
      sequenceParameterSets = sequenceParameterSets.concat(Array.prototype.slice.call(sps[i])); // SPS
    }

    // assemble the PPSs
    for (i = 0; i < pps.length; i++) {
      pictureParameterSets.push((pps[i].byteLength & 0xFF00) >>> 8);
      pictureParameterSets.push((pps[i].byteLength & 0xFF));
      pictureParameterSets = pictureParameterSets.concat(Array.prototype.slice.call(pps[i]));
    }

    return box(types.avc1, new Uint8Array([
      0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // data_reference_index
      0x00, 0x00, // pre_defined
      0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00, // pre_defined
      (track.width & 0xff00) >> 8,
      track.width & 0xff, // width
      (track.height & 0xff00) >> 8,
      track.height & 0xff, // height
      0x00, 0x48, 0x00, 0x00, // horizresolution
      0x00, 0x48, 0x00, 0x00, // vertresolution
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // frame_count
      0x13,
      0x76, 0x69, 0x64, 0x65,
      0x6f, 0x6a, 0x73, 0x2d,
      0x63, 0x6f, 0x6e, 0x74,
      0x72, 0x69, 0x62, 0x2d,
      0x68, 0x6c, 0x73, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, // compressorname
      0x00, 0x18, // depth = 24
      0x11, 0x11 // pre_defined = -1
    ]), box(types.avcC, new Uint8Array([
      0x01, // configurationVersion
      track.profileIdc, // AVCProfileIndication
      track.profileCompatibility, // profile_compatibility
      track.levelIdc, // AVCLevelIndication
      0xff // lengthSizeMinusOne, hard-coded to 4 bytes
    ].concat([
      sps.length // numOfSequenceParameterSets
    ]).concat(sequenceParameterSets).concat([
      pps.length // numOfPictureParameterSets
    ]).concat(pictureParameterSets))), // "PPS"
            box(types.btrt, new Uint8Array([
              0x00, 0x1c, 0x9c, 0x80, // bufferSizeDB
              0x00, 0x2d, 0xc6, 0xc0, // maxBitrate
              0x00, 0x2d, 0xc6, 0xc0
            ])) // avgBitrate
              );
  };

  audioSample = function(track) {
    return box(types.mp4a, new Uint8Array([

      // SampleEntry, ISO/IEC 14496-12
      0x00, 0x00, 0x00,
      0x00, 0x00, 0x00, // reserved
      0x00, 0x01, // data_reference_index

      // AudioSampleEntry, ISO/IEC 14496-12
      0x00, 0x00, 0x00, 0x00, // reserved
      0x00, 0x00, 0x00, 0x00, // reserved
      (track.channelcount & 0xff00) >> 8,
      (track.channelcount & 0xff), // channelcount

      (track.samplesize & 0xff00) >> 8,
      (track.samplesize & 0xff), // samplesize
      0x00, 0x00, // pre_defined
      0x00, 0x00, // reserved

      (track.samplerate & 0xff00) >> 8,
      (track.samplerate & 0xff),
      0x00, 0x00 // samplerate, 16.16

      // MP4AudioSampleEntry, ISO/IEC 14496-14
    ]), esds(track));
  };
})();

styp = function() {
  return box(types.styp, MAJOR_BRAND, MINOR_VERSION, MAJOR_BRAND);
};

tkhd = function(track) {
  var result = new Uint8Array([
    0x00, // version 0
    0x00, 0x00, 0x07, // flags
    0x00, 0x00, 0x00, 0x00, // creation_time
    0x00, 0x00, 0x00, 0x00, // modification_time
    (track.id & 0xFF000000) >> 24,
    (track.id & 0xFF0000) >> 16,
    (track.id & 0xFF00) >> 8,
    track.id & 0xFF, // track_ID
    0x00, 0x00, 0x00, 0x00, // reserved
    (track.duration & 0xFF000000) >> 24,
    (track.duration & 0xFF0000) >> 16,
    (track.duration & 0xFF00) >> 8,
    track.duration & 0xFF, // duration
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, // layer
    0x00, 0x00, // alternate_group
    0x01, 0x00, // non-audio track volume
    0x00, 0x00, // reserved
    0x00, 0x01, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x01, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00,
    0x40, 0x00, 0x00, 0x00, // transformation: unity matrix
    (track.width & 0xFF00) >> 8,
    track.width & 0xFF,
    0x00, 0x00, // width
    (track.height & 0xFF00) >> 8,
    track.height & 0xFF,
    0x00, 0x00 // height
  ]);

  return box(types.tkhd, result);
};

/**
 * Generate a track fragment (traf) box. A traf box collects metadata
 * about tracks in a movie fragment (moof) box.
 */
traf = function(track) {
  var trackFragmentHeader, trackFragmentDecodeTime,
      trackFragmentRun, sampleDependencyTable, dataOffset;

  trackFragmentHeader = box(types.tfhd, new Uint8Array([
    0x00, // version 0
    0x00, 0x00, 0x3a, // flags
    (track.id & 0xFF000000) >> 24,
    (track.id & 0xFF0000) >> 16,
    (track.id & 0xFF00) >> 8,
    (track.id & 0xFF), // track_ID
    0x00, 0x00, 0x00, 0x01, // sample_description_index
    0x00, 0x00, 0x00, 0x00, // default_sample_duration
    0x00, 0x00, 0x00, 0x00, // default_sample_size
    0x00, 0x00, 0x00, 0x00  // default_sample_flags
  ]));

  trackFragmentDecodeTime = box(types.tfdt, new Uint8Array([
    0x00, // version 0
    0x00, 0x00, 0x00, // flags
    // baseMediaDecodeTime
    (track.baseMediaDecodeTime >>> 24) & 0xFF,
    (track.baseMediaDecodeTime >>> 16) & 0xFF,
    (track.baseMediaDecodeTime >>> 8) & 0xFF,
    track.baseMediaDecodeTime & 0xFF
  ]));

  // the data offset specifies the number of bytes from the start of
  // the containing moof to the first payload byte of the associated
  // mdat
  dataOffset = (32 + // tfhd
                16 + // tfdt
                8 +  // traf header
                16 + // mfhd
                8 +  // moof header
                8);  // mdat header

  // audio tracks require less metadata
  if (track.type === 'audio') {
    trackFragmentRun = trun(track, dataOffset);
    return box(types.traf,
               trackFragmentHeader,
               trackFragmentDecodeTime,
               trackFragmentRun);
  }

  // video tracks should contain an independent and disposable samples
  // box (sdtp)
  // generate one and adjust offsets to match
  sampleDependencyTable = sdtp(track);
  trackFragmentRun = trun(track,
                          sampleDependencyTable.length + dataOffset);
  return box(types.traf,
             trackFragmentHeader,
             trackFragmentDecodeTime,
             trackFragmentRun,
             sampleDependencyTable);
};

/**
 * Generate a track box.
 * @param track {object} a track definition
 * @return {Uint8Array} the track box
 */
trak = function(track) {
  track.duration = track.duration || 0xffffffff;
  return box(types.trak,
             tkhd(track),
             mdia(track));
};

trex = function(track) {
  var result = new Uint8Array([
    0x00, // version 0
    0x00, 0x00, 0x00, // flags
    (track.id & 0xFF000000) >> 24,
    (track.id & 0xFF0000) >> 16,
    (track.id & 0xFF00) >> 8,
    (track.id & 0xFF), // track_ID
    0x00, 0x00, 0x00, 0x01, // default_sample_description_index
    0x00, 0x00, 0x00, 0x00, // default_sample_duration
    0x00, 0x00, 0x00, 0x00, // default_sample_size
    0x00, 0x01, 0x00, 0x01 // default_sample_flags
  ]);
  // the last two bytes of default_sample_flags is the sample
  // degradation priority, a hint about the importance of this sample
  // relative to others. Lower the degradation priority for all sample
  // types other than video.
  if (track.type !== 'video') {
    result[result.length - 1] = 0x00;
  }

  return box(types.trex, result);
};

(function() {
  var audioTrun, videoTrun, trunHeader;

  // This method assumes all samples are uniform. That is, if a
  // duration is present for the first sample, it will be present for
  // all subsequent samples.
  // see ISO/IEC 14496-12:2012, Section 8.8.8.1
  trunHeader = function(samples, offset) {
    var durationPresent = 0, sizePresent = 0,
        flagsPresent = 0, compositionTimeOffset = 0;

    // trun flag constants
    if (samples.length) {
      if (samples[0].duration !== undefined) {
        durationPresent = 0x1;
      }
      if (samples[0].size !== undefined) {
        sizePresent = 0x2;
      }
      if (samples[0].flags !== undefined) {
        flagsPresent = 0x4;
      }
      if (samples[0].compositionTimeOffset !== undefined) {
        compositionTimeOffset = 0x8;
      }
    }

    return [
      0x00, // version 0
      0x00,
      durationPresent | sizePresent | flagsPresent | compositionTimeOffset,
      0x01, // flags
      (samples.length & 0xFF000000) >>> 24,
      (samples.length & 0xFF0000) >>> 16,
      (samples.length & 0xFF00) >>> 8,
      samples.length & 0xFF, // sample_count
      (offset & 0xFF000000) >>> 24,
      (offset & 0xFF0000) >>> 16,
      (offset & 0xFF00) >>> 8,
      offset & 0xFF // data_offset
    ];
  };

  videoTrun = function(track, offset) {
    var bytes, samples, sample, i;

    samples = track.samples || [];
    offset += 8 + 12 + (16 * samples.length);

    bytes = trunHeader(samples, offset);

    for (i = 0; i < samples.length; i++) {
      sample = samples[i];
      bytes = bytes.concat([
        (sample.duration & 0xFF000000) >>> 24,
        (sample.duration & 0xFF0000) >>> 16,
        (sample.duration & 0xFF00) >>> 8,
        sample.duration & 0xFF, // sample_duration
        (sample.size & 0xFF000000) >>> 24,
        (sample.size & 0xFF0000) >>> 16,
        (sample.size & 0xFF00) >>> 8,
        sample.size & 0xFF, // sample_size
        (sample.flags.isLeading << 2) | sample.flags.dependsOn,
        (sample.flags.isDependedOn << 6) |
          (sample.flags.hasRedundancy << 4) |
          (sample.flags.paddingValue << 1) |
          sample.flags.isNonSyncSample,
        sample.flags.degradationPriority & 0xF0 << 8,
        sample.flags.degradationPriority & 0x0F, // sample_flags
        (sample.compositionTimeOffset & 0xFF000000) >>> 24,
        (sample.compositionTimeOffset & 0xFF0000) >>> 16,
        (sample.compositionTimeOffset & 0xFF00) >>> 8,
        sample.compositionTimeOffset & 0xFF // sample_composition_time_offset
      ]);
    }
    return box(types.trun, new Uint8Array(bytes));
  };

  audioTrun = function(track, offset) {
    var bytes, samples, sample, i;

    samples = track.samples || [];
    offset += 8 + 12 + (8 * samples.length);

    bytes = trunHeader(samples, offset);

    for (i = 0; i < samples.length; i++) {
      sample = samples[i];
      bytes = bytes.concat([
        (sample.duration & 0xFF000000) >>> 24,
        (sample.duration & 0xFF0000) >>> 16,
        (sample.duration & 0xFF00) >>> 8,
        sample.duration & 0xFF, // sample_duration
        (sample.size & 0xFF000000) >>> 24,
        (sample.size & 0xFF0000) >>> 16,
        (sample.size & 0xFF00) >>> 8,
        sample.size & 0xFF]); // sample_size
    }

    return box(types.trun, new Uint8Array(bytes));
  };

  trun = function(track, offset) {
    if (track.type === 'audio') {
      return audioTrun(track, offset);
    } else {
      return videoTrun(track, offset);
    }
  };
})();

module.exports = {
  ftyp: ftyp,
  mdat: mdat,
  moof: moof,
  moov: moov,
  initSegment: function(tracks) {
    var
      fileType = ftyp(),
      movie = moov(tracks),
      result;

    result = new Uint8Array(fileType.byteLength + movie.byteLength);
    result.set(fileType);
    result.set(movie, fileType.byteLength);
    return result;
  }
};

},{}],16:[function(require,module,exports){
/**
 * mux.js
 *
 * Copyright (c) 2015 Brightcove
 * All rights reserved.
 *
 * A stream-based mp2t to mp4 converter. This utility can be used to
 * deliver mp4s to a SourceBuffer on platforms that support native
 * Media Source Extensions.
 */
'use strict';

var Stream = require('../utils/stream.js');
var mp4 = require('./mp4-generator.js');
var m2ts = require('../m2ts/m2ts.js');
var AdtsStream = require('../codecs/adts.js');
var H264Stream = require('../codecs/h264').H264Stream;
var AacStream = require('../aac');

// object types
var VideoSegmentStream, AudioSegmentStream, Transmuxer, CoalesceStream;

// Helper functions
var collectDtsInfo, clearDtsInfo, calculateTrackBaseMediaDecodeTime;

/**
 * Constructs a single-track, ISO BMFF media segment from AAC data
 * events. The output of this stream can be fed to a SourceBuffer
 * configured with a suitable initialization segment.
 */
AudioSegmentStream = function(track) {
  var
    adtsFrames = [],
    adtsFramesLength = 0,
    sequenceNumber = 0,
    earliestAllowedDts = 0;

  AudioSegmentStream.prototype.init.call(this);

  this.push = function(data) {
    collectDtsInfo(track, data);

    if (track) {
      track.audioobjecttype = data.audioobjecttype;
      track.channelcount = data.channelcount;
      track.samplerate = data.samplerate;
      track.samplingfrequencyindex = data.samplingfrequencyindex;
      track.samplesize = data.samplesize;
    }

    // buffer audio data until end() is called
    adtsFrames.push(data);
    adtsFramesLength += data.data.byteLength;
  };

  this.setEarliestDts = function (earliestDts) {
    earliestAllowedDts = earliestDts - track.timelineStartInfo.baseMediaDecodeTime;
  };

  this.flush = function() {
    var boxes, currentFrame, data, sample, i, mdat, moof;
    // return early if no audio data has been observed
    if (adtsFramesLength === 0) {
      this.trigger('done');
      return;
    }

    // If the audio segment extends before the earliest allowed dts
    // value, remove AAC frames until starts at or after the earliest
    // allowed dts.
    if (track.minSegmentDts < earliestAllowedDts) {
      // We will need to recalculate the earliest segment Dts
      track.minSegmentDts = Infinity;

      adtsFrames = adtsFrames.filter(function(currentFrame) {
        // If this is an allowed frame, keep it and record it's Dts
        if (currentFrame.dts >= earliestAllowedDts) {
          track.minSegmentDts = Math.min(track.minSegmentDts, currentFrame.dts);
          track.minSegmentPts = track.minSegmentDts;
          return true;
        }
        // Otherwise, discard it
        adtsFramesLength -= currentFrame.data.byteLength;
        return false;
      });
    }

    // concatenate the audio data to constuct the mdat
    data = new Uint8Array(adtsFramesLength);
    track.samples = [];
    i = 0;
    while (adtsFrames.length) {
      currentFrame = adtsFrames[0];
      sample = {
        size: currentFrame.data.byteLength,
        duration: 1024 // FIXME calculate for realz
      };
      track.samples.push(sample);

      data.set(currentFrame.data, i);
      i += currentFrame.data.byteLength;

      adtsFrames.shift();
    }
    adtsFramesLength = 0;
    mdat = mp4.mdat(data);

    calculateTrackBaseMediaDecodeTime(track);
    moof = mp4.moof(sequenceNumber, [track]);
    boxes = new Uint8Array(moof.byteLength + mdat.byteLength);

    // bump the sequence number for next time
    sequenceNumber++;

    boxes.set(moof);
    boxes.set(mdat, moof.byteLength);

    clearDtsInfo(track);

    this.trigger('data', {track: track, boxes: boxes});
    this.trigger('done');
  };
};
AudioSegmentStream.prototype = new Stream();

/**
 * Constructs a single-track, ISO BMFF media segment from H264 data
 * events. The output of this stream can be fed to a SourceBuffer
 * configured with a suitable initialization segment.
 * @param track {object} track metadata configuration
 */
VideoSegmentStream = function(track) {
  var
    sequenceNumber = 0,
    nalUnits = [],
    nalUnitsLength = 0,
    config,
    pps;

  VideoSegmentStream.prototype.init.call(this);

  delete track.minPTS;

  this.push = function(data) {
    collectDtsInfo(track, data);

    // record the track config
    if (data.nalUnitType === 'seq_parameter_set_rbsp' &&
        !config) {
      config = data.config;

      track.width = config.width;
      track.height = config.height;
      track.sps = [data.data];
      track.profileIdc = config.profileIdc;
      track.levelIdc = config.levelIdc;
      track.profileCompatibility = config.profileCompatibility;
    }

    if (data.nalUnitType === 'pic_parameter_set_rbsp' &&
        !pps) {
      pps = data.data;
      track.pps = [data.data];
    }

    // buffer video until end() is called
    nalUnits.push(data);
    nalUnitsLength += data.data.byteLength;
  };

  this.flush = function() {
    var startUnit, currentNal, moof, mdat, boxes, i, data, view, sample, duration;

    // Throw away nalUnits at the start of the byte stream until we find
    // the first AUD
    while (nalUnits.length) {
      if (nalUnits[0].nalUnitType === 'access_unit_delimiter_rbsp') {
        break;
      }
      nalUnits.shift();
    }

    // return early if no video data has been observed
    if (nalUnitsLength === 0) {
      this.trigger('done');
      return;
    }

    // concatenate the video data and construct the mdat
    // first, we have to build the index from byte locations to
    // samples (that is, frames) in the video data
    data = new Uint8Array(nalUnitsLength + (4 * nalUnits.length));
    view = new DataView(data.buffer);
    track.samples = [];

    // see ISO/IEC 14496-12:2012, section 8.6.4.3
    sample = {
      size: 0,
      flags: {
        isLeading: 0,
        dependsOn: 1,
        isDependedOn: 0,
        hasRedundancy: 0,
        degradationPriority: 0
      }
    };

    // build the samples from the NAL units
    i = 0;
    while (nalUnits.length) {
      currentNal = nalUnits[0];
      // flush the sample we've been building when a new sample is started
      if (currentNal.nalUnitType === 'access_unit_delimiter_rbsp') {
        if (startUnit) {
          sample.duration = currentNal.dts - startUnit.dts;
          track.samples.push(sample);
        }
        sample = {
          size: 0,
          flags: {
            isLeading: 0,
            dependsOn: 1,
            isDependedOn: 0,
            hasRedundancy: 0,
            degradationPriority: 0
          },
          dataOffset: i,
          compositionTimeOffset: currentNal.pts - currentNal.dts
        };
        startUnit = currentNal;
      }
      if (currentNal.nalUnitType === 'slice_layer_without_partitioning_rbsp_idr') {
        // the current sample is a key frame
        sample.flags.dependsOn = 2;
      }
      sample.size += 4; // space for the NAL length
      sample.size += currentNal.data.byteLength;

      view.setUint32(i, currentNal.data.byteLength);
      i += 4;
      data.set(currentNal.data, i);
      i += currentNal.data.byteLength;

      nalUnits.shift();
    }
    // record the last sample
    if (track.samples.length) {
      sample.duration = track.samples[track.samples.length - 1].duration;
    }
    track.samples.push(sample);

    // filter out pre-IDR data
    duration = 0;
    while (track.samples.length) {
      sample = track.samples[0];
      if (sample.flags.dependsOn === 2) {
        data = data.subarray(sample.dataOffset);
        sample.duration += duration;
        break;
      }
      duration += sample.duration;
      track.samples.shift();
    }

    nalUnitsLength = 0;
    mdat = mp4.mdat(data);

    calculateTrackBaseMediaDecodeTime(track);

    this.trigger('timelineStartInfo', track.timelineStartInfo);

    moof = mp4.moof(sequenceNumber, [track]);

    // it would be great to allocate this array up front instead of
    // throwing away hundreds of media segment fragments
    boxes = new Uint8Array(moof.byteLength + mdat.byteLength);

    // bump the sequence number for next time
    sequenceNumber++;

    boxes.set(moof);
    boxes.set(mdat, moof.byteLength);

    clearDtsInfo(track);
    this.trigger('data', {track: track, boxes: boxes});

    // reset config and pps because they may differ across segments
    // for instance, when we are rendition switching
    config = undefined;
    pps = undefined;

    // Continue with the flush process now
    this.trigger('done');
  };
};
VideoSegmentStream.prototype = new Stream();

/**
 * Store information about the start and end of the track and the
 * duration for each frame/sample we process in order to calculate
 * the baseMediaDecodeTime
 */
collectDtsInfo = function (track, data) {
  if (typeof data.pts === 'number') {
    if (track.timelineStartInfo.pts === undefined) {
      track.timelineStartInfo.pts = data.pts;
    }

    if (track.minSegmentPts === undefined) {
      track.minSegmentPts = data.pts;
    } else {
      track.minSegmentPts = Math.min(track.minSegmentPts, data.pts);
    }

    if (track.maxSegmentPts === undefined) {
      track.maxSegmentPts = data.pts;
    } else {
      track.maxSegmentPts = Math.max(track.maxSegmentPts, data.pts);
    }
  }

  if (typeof data.dts === 'number') {
    if (track.timelineStartInfo.dts === undefined) {
      track.timelineStartInfo.dts = data.dts;
    }

    if (track.minSegmentDts === undefined) {
      track.minSegmentDts = data.dts;
    } else {
      track.minSegmentDts = Math.min(track.minSegmentDts, data.dts);
    }

    if (track.maxSegmentDts === undefined) {
      track.maxSegmentDts = data.dts;
    } else {
      track.maxSegmentDts = Math.max(track.maxSegmentDts, data.dts);
    }
  }
};

/**
 * Clear values used to calculate the baseMediaDecodeTime between
 * tracks
 */
clearDtsInfo = function (track) {
  delete track.minSegmentDts;
  delete track.maxSegmentDts;
  delete track.minSegmentPts;
  delete track.maxSegmentPts;
};

/**
 * Calculate the track's baseMediaDecodeTime based on the earliest
 * DTS the transmuxer has ever seen and the minimum DTS for the
 * current track
 */
calculateTrackBaseMediaDecodeTime = function (track) {
  var
    oneSecondInPTS = 90000, // 90kHz clock
    scale,
    // Calculate the distance, in time, that this segment starts from the start
    // of the timeline (earliest time seen since the transmuxer initialized)
    timeSinceStartOfTimeline = track.minSegmentDts - track.timelineStartInfo.dts,
    // Calculate the first sample's effective compositionTimeOffset
    firstSampleCompositionOffset = track.minSegmentPts - track.minSegmentDts;

  // track.timelineStartInfo.baseMediaDecodeTime is the location, in time, where
  // we want the start of the first segment to be placed
  track.baseMediaDecodeTime = track.timelineStartInfo.baseMediaDecodeTime;

  // Add to that the distance this segment is from the very first
  track.baseMediaDecodeTime += timeSinceStartOfTimeline;

  // Subtract this segment's "compositionTimeOffset" so that the first frame of
  // this segment is displayed exactly at the `baseMediaDecodeTime` or at the
  // end of the previous segment
  track.baseMediaDecodeTime -= firstSampleCompositionOffset;

  // baseMediaDecodeTime must not become negative
  track.baseMediaDecodeTime = Math.max(0, track.baseMediaDecodeTime);

  if (track.type === 'audio') {
    // Audio has a different clock equal to the sampling_rate so we need to
    // scale the PTS values into the clock rate of the track
    scale = track.samplerate / oneSecondInPTS;
    track.baseMediaDecodeTime *= scale;
    track.baseMediaDecodeTime = Math.floor(track.baseMediaDecodeTime);
  }
};

/**
 * A Stream that can combine multiple streams (ie. audio & video)
 * into a single output segment for MSE. Also supports audio-only
 * and video-only streams.
 */
CoalesceStream = function(options) {
  // Number of Tracks per output segment
  // If greater than 1, we combine multiple
  // tracks into a single segment
  this.numberOfTracks = 0;
  this.metadataStream = options.metadataStream;

  if (typeof options.remux !== 'undefined') {
    this.remuxTracks = !!options.remux;
  } else {
    this.remuxTracks = true;
  }

  this.pendingTracks = [];
  this.videoTrack = null;
  this.pendingBoxes = [];
  this.pendingCaptions = [];
  this.pendingMetadata = [];
  this.pendingBytes = 0;
  this.emittedTracks = 0;

  CoalesceStream.prototype.init.call(this);

  // Take output from multiple
  this.push = function(output) {
    // buffer incoming captions until the associated video segment
    // finishes
    if (output.text) {
      return this.pendingCaptions.push(output);
    }
    // buffer incoming id3 tags until the final flush
    if (output.frames) {
      return this.pendingMetadata.push(output);
    }

    // Add this track to the list of pending tracks and store
    // important information required for the construction of
    // the final segment
    this.pendingTracks.push(output.track);
    this.pendingBoxes.push(output.boxes);
    this.pendingBytes += output.boxes.byteLength;

    if (output.track.type === 'video') {
      this.videoTrack = output.track;
    }
    if (output.track.type === 'audio') {
      this.audioTrack = output.track;
    }
  };
};

CoalesceStream.prototype = new Stream();
CoalesceStream.prototype.flush = function() {
  var
    offset = 0,
    event = {
      captions: [],
      metadata: []
    },
    caption,
    id3,
    initSegment,
    timelineStartPts = 0,
    i;

  // Return until we have enough tracks from the pipeline to remux
  if (this.pendingTracks.length === 0 ||
     (this.remuxTracks && this.pendingTracks.length < this.numberOfTracks)) {
    return;
  }

  if (this.videoTrack) {
    timelineStartPts = this.videoTrack.timelineStartInfo.pts;
  } else if (this.audioTrack) {
    timelineStartPts = this.audioTrack.timelineStartInfo.pts;
  }

  if (this.pendingTracks.length === 1) {
    event.type = this.pendingTracks[0].type;
  } else {
    event.type = 'combined';
  }
  this.emittedTracks += this.pendingTracks.length;

  initSegment = mp4.initSegment(this.pendingTracks);

  // Create a new typed array large enough to hold the init
  // segment and all tracks
  event.data = new Uint8Array(initSegment.byteLength +
                              this.pendingBytes);

  // Create an init segment containing a moov
  // and track definitions
  event.data.set(initSegment);
  offset += initSegment.byteLength;

  // Append each moof+mdat (one per track) after the init segment
  for (i = 0; i < this.pendingBoxes.length; i++) {
    event.data.set(this.pendingBoxes[i], offset);
    offset += this.pendingBoxes[i].byteLength;
  }

  // Translate caption PTS times into second offsets into the
  // video timeline for the segment
  for (i = 0; i < this.pendingCaptions.length; i++) {
    caption = this.pendingCaptions[i];
    caption.startTime = (caption.startPts - timelineStartPts);
    caption.startTime /= 90e3;
    caption.endTime = (caption.endPts - timelineStartPts);
    caption.endTime /= 90e3;
    event.captions.push(caption);
  }

  // Translate ID3 frame PTS times into second offsets into the
  // video timeline for the segment
  for (i = 0; i < this.pendingMetadata.length; i++) {
    id3 = this.pendingMetadata[i];
    id3.cueTime = (id3.pts - timelineStartPts);
    id3.cueTime /= 90e3;
    event.metadata.push(id3);
  }
  // We add this to every single emitted segment even though we only need
  // it for the first
  event.metadata.dispatchType = this.metadataStream.dispatchType;

  // Reset stream state
  this.pendingTracks.length = 0;
  this.videoTrack = null;
  this.pendingBoxes.length = 0;
  this.pendingCaptions.length = 0;
  this.pendingBytes = 0;
  this.pendingMetadata.length = 0;

  // Emit the built segment
  this.trigger('data', event);

  // Only emit `done` if all tracks have been flushed and emitted
  if (this.emittedTracks >= this.numberOfTracks) {
    this.trigger('done');
    this.emittedTracks = 0;
  }
};
/**
 * A Stream that expects MP2T binary data as input and produces
 * corresponding media segments, suitable for use with Media Source
 * Extension (MSE) implementations that support the ISO BMFF byte
 * stream format, like Chrome.
 */
Transmuxer = function(options) {
  var
    self = this,
    videoTrack,
    audioTrack,
    packetStream, parseStream, elementaryStream,
    adtsStream, h264Stream,aacStream,
    videoSegmentStream, audioSegmentStream, captionStream,
    coalesceStream,
    headOfPipeline;

  this.setupAacPipeline = function() {
    this.metadataStream = new m2ts.MetadataStream();
    options.metadataStream = this.metadataStream;

    // set up the parsing pipeline
    aacStream = new AacStream();
    adtsStream = new AdtsStream();
    coalesceStream = new CoalesceStream(options);
    headOfPipeline = aacStream;

    aacStream.pipe(adtsStream);
    aacStream.pipe(this.metadataStream);
    this.metadataStream.pipe(coalesceStream);

    this.metadataStream.on('timestamp', function(frame) {
      aacStream.setTimestamp(frame.timestamp);
    });
    this.addAacListener();
  };


  this.addAacListener = function() {
    aacStream.on('data', function(data) {
      var i;

      if (data.type === 'timed-metadata') {
        var track = {
            timelineStartInfo: {
            baseMediaDecodeTime: 0 },
            codec: 'adts',
            type: 'audio' };

        if (track && !audioSegmentStream) {
          // hook up the audio segment stream to the first track with aac data
          coalesceStream.numberOfTracks++;
          audioSegmentStream = new AudioSegmentStream(track);
          // Set up the final part of the audio pipeline
          adtsStream
            .pipe(audioSegmentStream)
            .pipe(coalesceStream);
        }
      }
    });
  };

  this.setupTsPipeline = function() {
    this.metadataStream = new m2ts.MetadataStream();

    options.metadataStream = this.metadataStream;

    // set up the parsing pipeline
    packetStream = new m2ts.TransportPacketStream();
    parseStream = new m2ts.TransportParseStream();
    elementaryStream = new m2ts.ElementaryStream();
    adtsStream = new AdtsStream();
    h264Stream = new H264Stream();
    captionStream = new m2ts.CaptionStream();
    coalesceStream = new CoalesceStream(options);
    headOfPipeline = packetStream;

    // disassemble MPEG2-TS packets into elementary streams
    packetStream
      .pipe(parseStream)
      .pipe(elementaryStream);

    // !!THIS ORDER IS IMPORTANT!!
    // demux the streams
    elementaryStream
      .pipe(h264Stream);
    elementaryStream
      .pipe(adtsStream);

    elementaryStream
      .pipe(this.metadataStream)
      .pipe(coalesceStream);

    // Hook up CEA-608/708 caption stream
    h264Stream.pipe(captionStream)
      .pipe(coalesceStream);
    this.addTsListener();
  };

  this.addTsListener = function() {

    elementaryStream.on('data', function(data) {
      var i;

      if (data.type === 'metadata') {
        i = data.tracks.length;

        // scan the tracks listed in the metadata
        while (i--) {
          if (!videoTrack && data.tracks[i].type === 'video') {
            videoTrack = data.tracks[i];
            videoTrack.timelineStartInfo.baseMediaDecodeTime = self.baseMediaDecodeTime;
          } else if (!audioTrack && data.tracks[i].type === 'audio') {
            audioTrack = data.tracks[i];
            audioTrack.timelineStartInfo.baseMediaDecodeTime = self.baseMediaDecodeTime;
          }
        }

        // hook up the video segment stream to the first track with h264 data
        if (videoTrack && !videoSegmentStream) {
          coalesceStream.numberOfTracks++;
          videoSegmentStream = new VideoSegmentStream(videoTrack);

          videoSegmentStream.on('timelineStartInfo', function(timelineStartInfo){
          // When video emits timelineStartInfo data after a flush, we forward that
          // info to the AudioSegmentStream, if it exists, because video timeline
          // data takes precedence.
            if (audioTrack) {
              audioTrack.timelineStartInfo = timelineStartInfo;
              // On the first segment we trim AAC frames that exist before the
              // very earliest DTS we have seen in video because Chrome will
              // interpret any video track with a baseMediaDecodeTime that is
              // non-zero as a gap.
              audioSegmentStream.setEarliestDts(timelineStartInfo.dts);
            }
          });

          // Set up the final part of the video pipeline
          h264Stream
            .pipe(videoSegmentStream)
            .pipe(coalesceStream);
        }

        if (audioTrack && !audioSegmentStream) {
          // hook up the audio segment stream to the first track with aac data
          coalesceStream.numberOfTracks++;
          audioSegmentStream = new AudioSegmentStream(audioTrack);

          // Set up the final part of the audio pipeline
          adtsStream
            .pipe(audioSegmentStream)
            .pipe(coalesceStream);
        }
      }
    });
  };
  Transmuxer.prototype.init.call(this);
  options = options || {};

  this.baseMediaDecodeTime = options.baseMediaDecodeTime || 0;

  // expose the metadata stream
  if (options.aacfile === undefined) {
    this.setupTsPipeline();
  } else {
    this.setupAacPipeline();
  }

  // hook up the segment streams once track metadata is delivered
  this.setBaseMediaDecodeTime = function (baseMediaDecodeTime) {
    this.baseMediaDecodeTime = baseMediaDecodeTime;
    if (audioTrack) {
      audioTrack.timelineStartInfo.dts = undefined;
      audioTrack.timelineStartInfo.pts = undefined;
      clearDtsInfo(audioTrack);
      audioTrack.timelineStartInfo.baseMediaDecodeTime = baseMediaDecodeTime;
    }
    if (videoTrack) {
      videoTrack.timelineStartInfo.dts = undefined;
      videoTrack.timelineStartInfo.pts = undefined;
      clearDtsInfo(videoTrack);
      videoTrack.timelineStartInfo.baseMediaDecodeTime = baseMediaDecodeTime;
    }
  };

  // feed incoming data to the front of the parsing pipeline
  this.push = function(data) {
    headOfPipeline.push(data);
  };

  // flush any buffered data
  this.flush = function() {
    // Start at the top of the pipeline and flush all pending work
    headOfPipeline.flush();
  };

  // Re-emit any data coming from the coalesce stream to the outside world
  coalesceStream.on('data', function (data) {
    self.trigger('data', data);
  });
  // Let the consumer know we have finished flushing the entire pipeline
  coalesceStream.on('done', function () {
    self.trigger('done');
  });
};
Transmuxer.prototype = new Stream();

module.exports = {
  Transmuxer: Transmuxer,
  VideoSegmentStream: VideoSegmentStream,
  AudioSegmentStream: AudioSegmentStream,
};

},{"../aac":1,"../codecs/adts.js":2,"../codecs/h264":3,"../m2ts/m2ts.js":11,"../utils/stream.js":20,"./mp4-generator.js":15}],17:[function(require,module,exports){
'use strict';

var
  tagTypes = {
    0x08: 'audio',
    0x09: 'video',
    0x12: 'metadata'
  },
  hex = function (val) {
    return '0x' + ('00' + val.toString(16)).slice(-2).toUpperCase();
  },
  hexStringList = function (data) {
    var arr = [], i;
    /* jshint -W086 */
    while(data.byteLength > 0) {
      i = 0;
      switch(data.byteLength) {
        default:
          arr.push(hex(data[i++]));
        case 7:
          arr.push(hex(data[i++]));
        case 6:
          arr.push(hex(data[i++]));
        case 5:
          arr.push(hex(data[i++]));
        case 4:
          arr.push(hex(data[i++]));
        case 3:
          arr.push(hex(data[i++]));
        case 2:
          arr.push(hex(data[i++]));
        case 1:
          arr.push(hex(data[i++]));
      }
      data = data.subarray(i);
    }
    /* jshint +W086 */
    return arr.join(' ');
  },
  parseAVCTag = function (tag, obj) {
    var
      avcPacketTypes = [
        'AVC Sequence Header',
        'AVC NALU',
        'AVC End-of-Sequence'
      ],
      nalUnitTypes = [
        'unspecified',
        'slice_layer_without_partitioning',
        'slice_data_partition_a_layer',
        'slice_data_partition_b_layer',
        'slice_data_partition_c_layer',
        'slice_layer_without_partitioning_idr',
        'sei',
        'seq_parameter_set',
        'pic_parameter_set',
        'access_unit_delimiter',
        'end_of_seq',
        'end_of_stream',
        'filler',
        'seq_parameter_set_ext',
        'prefix_nal_unit',
        'subset_seq_parameter_set',
        'reserved',
        'reserved',
        'reserved'
      ],
      compositionTime = (tag[1] & parseInt('01111111', 2) << 16) | (tag[2] << 8) | tag[3];

    obj = obj || {};

    obj.avcPacketType = avcPacketTypes[tag[0]];
    obj.CompositionTime = (tag[1] & parseInt('10000000', 2)) ? -compositionTime : compositionTime;

    if (tag[0] === 1) {
      obj.nalUnitTypeRaw = hexStringList(tag.subarray(4, 100));
    } else {
      obj.data = hexStringList(tag.subarray(4));
    }

    return obj;
  },
  parseVideoTag = function (tag, obj) {
    var
      frameTypes = [
        'Unknown',
        'Keyframe (for AVC, a seekable frame)',
        'Inter frame (for AVC, a nonseekable frame)',
        'Disposable inter frame (H.263 only)',
        'Generated keyframe (reserved for server use only)',
        'Video info/command frame'
      ],
      codecIDs = [
        'JPEG (currently unused)',
        'Sorenson H.263',
        'Screen video',
        'On2 VP6',
        'On2 VP6 with alpha channel',
        'Screen video version 2',
        'AVC'
      ],
      codecID = tag[0] & parseInt('00001111', 2);

    obj = obj || {};

    obj.frameType = frameTypes[(tag[0] & parseInt('11110000', 2)) >>> 4];
    obj.codecID = codecID;

    if (codecID === 7) {
      return parseAVCTag(tag.subarray(1), obj);
    }
    return obj;
  },
  parseAACTag = function (tag, obj) {
    var packetTypes = [
      'AAC Sequence Header',
      'AAC Raw'
    ];

    obj = obj || {};

    obj.aacPacketType = packetTypes[tag[0]];
    obj.data = hexStringList(tag.subarray(1));

    return obj;
  },
  parseAudioTag = function (tag, obj) {
    var
      formatTable = [
        'Linear PCM, platform endian',
        'ADPCM',
        'MP3',
        'Linear PCM, little endian',
        'Nellymoser 16-kHz mono',
        'Nellymoser 8-kHz mono',
        'Nellymoser',
        'G.711 A-law logarithmic PCM',
        'G.711 mu-law logarithmic PCM',
        'reserved',
        'AAC',
        'Speex',
        'MP3 8-Khz',
        'Device-specific sound'
      ],
      samplingRateTable = [
        '5.5-kHz',
        '11-kHz',
        '22-kHz',
        '44-kHz'
      ],
      soundFormat = (tag[0] & parseInt('11110000', 2)) >>> 4;

    obj = obj || {};

    obj.soundFormat = formatTable[soundFormat];
    obj.soundRate = samplingRateTable[(tag[0] & parseInt('00001100', 2)) >>> 2];
    obj.soundSize = ((tag[0] & parseInt('00000010', 2)) >>> 1) ? '16-bit' : '8-bit';
    obj.soundType = (tag[0] & parseInt('00000001', 2)) ? 'Stereo' : 'Mono';

    if (soundFormat === 10) {
      return parseAACTag(tag.subarray(1), obj);
    }
    return obj;
  },
  parseGenericTag = function (tag) {
    return {
      tagType: tagTypes[tag[0]],
      dataSize: (tag[1] << 16) | (tag[2] << 8) | tag[3],
      timestamp: (tag[7] << 24) | (tag[4] << 16) | (tag[5] << 8) | tag[6],
      streamID: (tag[8] << 16) | (tag[9] << 8) | tag[10]
    };
  },
  inspectFlvTag = function (tag) {
    var header = parseGenericTag(tag);
    switch (tag[0]) {
      case 0x08:
        parseAudioTag(tag.subarray(11), header);
        break;
      case 0x09:
        parseVideoTag(tag.subarray(11), header);
        break;
      case 0x12:
    }
    return header;
  },
  inspectFlv = function (bytes) {
    var i = 9, // header
        dataSize,
        parsedResults = [],
        tag;

    // traverse the tags
    i += 4; // skip previous tag size
    while (i < bytes.byteLength) {
      dataSize = bytes[i + 1] << 16;
      dataSize |= bytes[i + 2] << 8;
      dataSize |= bytes[i + 3];
      dataSize += 11;

      tag = bytes.subarray(i, i + dataSize);
      parsedResults.push(inspectFlvTag(tag));
      i += dataSize + 4;
    }
    return parsedResults;
  },
  textifyFlv = function (flvTagArray) {
    return JSON.stringify(flvTagArray, null, 2);
  };

module.exports = {
  inspectTag: inspectFlvTag,
  inspect: inspectFlv,
  textify: textifyFlv
};

},{}],18:[function(require,module,exports){
(function (global){
'use strict';

var
  inspectMp4,
  textifyMp4,
  /**
   * Returns the string representation of an ASCII encoded four byte buffer.
   * @param buffer {Uint8Array} a four-byte buffer to translate
   * @return {string} the corresponding string
   */
  parseType = function(buffer) {
    var result = '';
    result += String.fromCharCode(buffer[0]);
    result += String.fromCharCode(buffer[1]);
    result += String.fromCharCode(buffer[2]);
    result += String.fromCharCode(buffer[3]);
    return result;
  },
  parseMp4Date = function(seconds) {
    return new Date(seconds * 1000 - 2082844800000);
  },
  parseSampleFlags = function(flags) {
    return {
      isLeading: (flags[0] & 0x0c) >>> 2,
      dependsOn: flags[0] & 0x03,
      isDependedOn: (flags[1] & 0xc0) >>> 6,
      hasRedundancy: (flags[1] & 0x30) >>> 4,
      paddingValue: (flags[1] & 0x0e) >>> 1,
      isNonSyncSample: flags[1] & 0x01,
      degradationPriority: (flags[2] << 8) | flags[3]
    };
  },
  nalParse = function(avcStream) {
    var
      avcView = new DataView(avcStream.buffer, avcStream.byteOffset, avcStream.byteLength),
      result = [],
      i,
      length;
    for (i = 0; i + 4 < avcStream.length; i += length) {
      length = avcView.getUint32(i);
      i += 4;

      // bail if this doesn't appear to be an H264 stream
      if (length <= 0) {
        return;
      }

      switch(avcStream[i] & 0x1F) {
      case 0x01:
        result.push('slice_layer_without_partitioning_rbsp');
        break;
      case 0x05:
        result.push('slice_layer_without_partitioning_rbsp_idr');
        break;
      case 0x06:
        result.push('sei_rbsp');
        break;
      case 0x07:
        result.push('seq_parameter_set_rbsp');
        break;
      case 0x08:
        result.push('pic_parameter_set_rbsp');
        break;
      case 0x09:
        result.push('access_unit_delimiter_rbsp');
        break;
      default:
        result.push(avcStream[i] & 0x1F);
        break;
      }
    }
    return result;
  },

  // registry of handlers for individual mp4 box types
  parse = {
    // codingname, not a first-class box type. stsd entries share the
    // same format as real boxes so the parsing infrastructure can be
    // shared
    avc1: function(data) {
      var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
      return {
        dataReferenceIndex: view.getUint16(6),
        width:  view.getUint16(24),
        height: view.getUint16(26),
        horizresolution: view.getUint16(28) + (view.getUint16(30) / 16),
        vertresolution: view.getUint16(32) + (view.getUint16(34) / 16),
        frameCount: view.getUint16(40),
        depth: view.getUint16(74),
        config: inspectMp4(data.subarray(78, data.byteLength))
      };
    },
    avcC: function(data) {
      var
        view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        result = {
          configurationVersion: data[0],
          avcProfileIndication: data[1],
          profileCompatibility: data[2],
          avcLevelIndication: data[3],
          lengthSizeMinusOne: data[4] & 0x03,
          sps: [],
          pps: []
        },
        numOfSequenceParameterSets = data[5] & 0x1f,
        numOfPictureParameterSets,
        nalSize,
        offset,
        i;

      // iterate past any SPSs
      offset = 6;
      for (i = 0; i < numOfSequenceParameterSets; i++) {
        nalSize = view.getUint16(offset);
        offset += 2;
        result.sps.push(new Uint8Array(data.subarray(offset, offset + nalSize)));
        offset += nalSize;
      }
      // iterate past any PPSs
      numOfPictureParameterSets = data[offset];
      offset++;
      for (i = 0; i < numOfPictureParameterSets; i++) {
        nalSize = view.getUint16(offset);
        offset += 2;
        result.pps.push(new Uint8Array(data.subarray(offset, offset + nalSize)));
        offset += nalSize;
      }
      return result;
    },
    btrt: function(data) {
      var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
      return {
        bufferSizeDB: view.getUint32(0),
        maxBitrate: view.getUint32(4),
        avgBitrate: view.getUint32(8)
      };
    },
    esds: function(data) {
      return {
        version: data[0],
        flags: new Uint8Array(data.subarray(1, 4)),
        esId: (data[6] << 8) | data[7],
        streamPriority: data[8] & 0x1f,
        decoderConfig: {
          objectProfileIndication: data[11],
          streamType: (data[12] >>> 2) & 0x3f,
          bufferSize: (data[13] << 16) | (data[14] << 8) | data[15],
          maxBitrate: (data[16] << 24) |
            (data[17] << 16) |
            (data[18] <<  8) |
            data[19],
          avgBitrate: (data[20] << 24) |
            (data[21] << 16) |
            (data[22] <<  8) |
            data[23],
          decoderConfigDescriptor: {
            tag: data[24],
            length: data[25],
            audioObjectType: (data[26] >>> 3) & 0x1f,
            samplingFrequencyIndex: ((data[26] & 0x07) << 1) |
              ((data[27] >>> 7) & 0x01),
            channelConfiguration: (data[27] >>> 3) & 0x0f
          }
        }
      };
    },
    ftyp: function(data) {
      var
        view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        result = {
          majorBrand: parseType(data.subarray(0, 4)),
          minorVersion: view.getUint32(4),
          compatibleBrands: []
        },
        i = 8;
      while (i < data.byteLength) {
        result.compatibleBrands.push(parseType(data.subarray(i, i + 4)));
        i += 4;
      }
      return result;
    },
    dinf: function(data) {
      return {
        boxes: inspectMp4(data)
      };
    },
    dref: function(data) {
      return {
        version: data[0],
        flags: new Uint8Array(data.subarray(1, 4)),
        dataReferences: inspectMp4(data.subarray(8))
      };
    },
    hdlr: function(data) {
      var
        view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        language,
        result = {
          version: view.getUint8(0),
          flags: new Uint8Array(data.subarray(1, 4)),
          handlerType: parseType(data.subarray(8, 12)),
          name: ''
        },
        i = 8;

      // parse out the name field
      for (i = 24; i < data.byteLength; i++) {
        if (data[i] === 0x00) {
          // the name field is null-terminated
          i++;
          break;
        }
        result.name += String.fromCharCode(data[i]);
      }
      // decode UTF-8 to javascript's internal representation
      // see http://ecmanaut.blogspot.com/2006/07/encoding-decoding-utf8-in-javascript.html
      result.name = decodeURIComponent(global.escape(result.name));

      return result;
    },
    mdat: function(data) {
      return {
        byteLength: data.byteLength,
        nals: nalParse(data)
      };
    },
    mdhd: function(data) {
      var
        view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        i = 4,
        language,
        result = {
          version: view.getUint8(0),
          flags: new Uint8Array(data.subarray(1, 4)),
          language: ''
        };
      if (result.version === 1) {
        i += 4;
        result.creationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes
        i += 8;
        result.modificationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes
        i += 4;
        result.timescale = view.getUint32(i);
        i += 8;
        result.duration = view.getUint32(i); // truncating top 4 bytes
      } else {
        result.creationTime = parseMp4Date(view.getUint32(i));
        i += 4;
        result.modificationTime = parseMp4Date(view.getUint32(i));
        i += 4;
        result.timescale = view.getUint32(i);
        i += 4;
        result.duration = view.getUint32(i);
      }
      i += 4;
      // language is stored as an ISO-639-2/T code in an array of three 5-bit fields
      // each field is the packed difference between its ASCII value and 0x60
      language = view.getUint16(i);
      result.language += String.fromCharCode((language >> 10) + 0x60);
      result.language += String.fromCharCode(((language & 0x03c0) >> 5) + 0x60);
      result.language += String.fromCharCode((language & 0x1f) + 0x60);

      return result;
    },
    mdia: function(data) {
      return {
        boxes: inspectMp4(data)
      };
    },
    mfhd: function(data) {
      return {
        version: data[0],
        flags: new Uint8Array(data.subarray(1, 4)),
        sequenceNumber: (data[4] << 24) |
          (data[5] << 16) |
          (data[6] << 8) |
          (data[7])
      };
    },
    minf: function(data) {
      return {
        boxes: inspectMp4(data)
      };
    },
    // codingname, not a first-class box type. stsd entries share the
    // same format as real boxes so the parsing infrastructure can be
    // shared
    mp4a: function(data) {
      var
        view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        result = {
          // 6 bytes reserved
          dataReferenceIndex: view.getUint16(6),
          // 4 + 4 bytes reserved
          channelcount: view.getUint16(16),
          samplesize: view.getUint16(18),
          // 2 bytes pre_defined
          // 2 bytes reserved
          samplerate: view.getUint16(24) + (view.getUint16(26) / 65536)
        };

      // if there are more bytes to process, assume this is an ISO/IEC
      // 14496-14 MP4AudioSampleEntry and parse the ESDBox
      if (data.byteLength > 28) {
        result.streamDescriptor = inspectMp4(data.subarray(28))[0];
      }
      return result;
    },
    moof: function(data) {
      return {
        boxes: inspectMp4(data)
      };
    },
    moov: function(data) {
      return {
        boxes: inspectMp4(data)
      };
    },
    mvex: function(data) {
      return {
        boxes: inspectMp4(data)
      };
    },
    mvhd: function(data) {
      var
        view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        i = 4,
        result = {
          version: view.getUint8(0),
          flags: new Uint8Array(data.subarray(1, 4))
        };

      if (result.version === 1) {
        i += 4;
        result.creationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes
        i += 8;
        result.modificationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes
        i += 4;
        result.timescale = view.getUint32(i);
        i += 8;
        result.duration = view.getUint32(i); // truncating top 4 bytes
      } else {
        result.creationTime = parseMp4Date(view.getUint32(i));
        i += 4;
        result.modificationTime = parseMp4Date(view.getUint32(i));
        i += 4;
        result.timescale = view.getUint32(i);
        i += 4;
        result.duration = view.getUint32(i);
      }
      i += 4;

      // convert fixed-point, base 16 back to a number
      result.rate = view.getUint16(i) + (view.getUint16(i + 2) / 16);
      i += 4;
      result.volume = view.getUint8(i) + (view.getUint8(i + 1) / 8);
      i += 2;
      i += 2;
      i += 2 * 4;
      result.matrix = new Uint32Array(data.subarray(i, i + (9 * 4)));
      i += 9 * 4;
      i += 6 * 4;
      result.nextTrackId = view.getUint32(i);
      return result;
    },
    pdin: function(data) {
      var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
      return {
        version: view.getUint8(0),
        flags: new Uint8Array(data.subarray(1, 4)),
        rate: view.getUint32(4),
        initialDelay: view.getUint32(8)
      };
    },
    sdtp: function(data) {
      var
        result = {
          version: data[0],
          flags: new Uint8Array(data.subarray(1, 4)),
          samples: []
        }, i;

      for (i = 4; i < data.byteLength; i++) {
        result.samples.push({
          dependsOn: (data[i] & 0x30) >> 4,
          isDependedOn: (data[i] & 0x0c) >> 2,
          hasRedundancy: data[i] & 0x03
        });
      }
      return result;
    },
    sidx: function(data) {
      var view = new DataView(data.buffer, data.byteOffset, data.byteLength),
          result = {
            version: data[0],
            flags: new Uint8Array(data.subarray(1, 4)),
            references: [],
            referenceId: view.getUint32(4),
            timescale: view.getUint32(8),
            earliestPresentationTime: view.getUint32(12),
            firstOffset: view.getUint32(16)
          },
          referenceCount = view.getUint16(22),
          i;

      for (i = 24; referenceCount; i += 12, referenceCount-- ) {
        result.references.push({
          referenceType: (data[i] & 0x80) >>> 7,
          referencedSize: view.getUint32(i) & 0x7FFFFFFF,
          subsegmentDuration: view.getUint32(i + 4),
          startsWithSap: !!(data[i + 8] & 0x80),
          sapType: (data[i + 8] & 0x70) >>> 4,
          sapDeltaTime: view.getUint32(i + 8) & 0x0FFFFFFF
        });
      }

      return result;
    },
    smhd: function(data) {
      return {
        version: data[0],
        flags: new Uint8Array(data.subarray(1, 4)),
        balance: data[4] + (data[5] / 256)
      };
    },
    stbl: function(data) {
      return {
        boxes: inspectMp4(data)
      };
    },
    stco: function(data) {
      var
        view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        result = {
          version: data[0],
          flags: new Uint8Array(data.subarray(1, 4)),
          chunkOffsets: []
        },
        entryCount = view.getUint32(4),
        i;
      for (i = 8; entryCount; i += 4, entryCount--) {
        result.chunkOffsets.push(view.getUint32(i));
      }
      return result;
    },
    stsc: function(data) {
      var
        view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        entryCount = view.getUint32(4),
        result = {
          version: data[0],
          flags: new Uint8Array(data.subarray(1, 4)),
          sampleToChunks: []
        },
        i;
      for (i = 8; entryCount; i += 12, entryCount--) {
        result.sampleToChunks.push({
          firstChunk: view.getUint32(i),
          samplesPerChunk: view.getUint32(i + 4),
          sampleDescriptionIndex: view.getUint32(i + 8)
        });
      }
      return result;
    },
    stsd: function(data) {
      return {
        version: data[0],
        flags: new Uint8Array(data.subarray(1, 4)),
        sampleDescriptions: inspectMp4(data.subarray(8))
      };
    },
    stsz: function(data) {
      var
        view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        result = {
          version: data[0],
          flags: new Uint8Array(data.subarray(1, 4)),
          sampleSize: view.getUint32(4),
          entries: []
        },
        i;
      for (i = 12; i < data.byteLength; i += 4) {
        result.entries.push(view.getUint32(i));
      }
      return result;
    },
    stts: function(data) {
      var
        view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        result = {
          version: data[0],
          flags: new Uint8Array(data.subarray(1, 4)),
          timeToSamples: []
        },
        entryCount = view.getUint32(4),
        i;

      for (i = 8; entryCount; i += 8, entryCount--) {
        result.timeToSamples.push({
          sampleCount: view.getUint32(i),
          sampleDelta: view.getUint32(i + 4)
        });
      }
      return result;
    },
    styp: function(data) {
      return parse.ftyp(data);
    },
    tfdt: function(data) {
      return {
        version: data[0],
        flags: new Uint8Array(data.subarray(1, 4)),
        baseMediaDecodeTime: data[4] << 24 | data[5] << 16 | data[6] << 8 | data[7]
      };
    },
    tfhd: function(data) {
      var
        view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        result = {
          version: data[0],
          flags: new Uint8Array(data.subarray(1, 4)),
          trackId: view.getUint32(4)
        },
        baseDataOffsetPresent = result.flags[2] & 0x01,
        sampleDescriptionIndexPresent = result.flags[2] & 0x02,
        defaultSampleDurationPresent = result.flags[2] & 0x08,
        defaultSampleSizePresent = result.flags[2] & 0x10,
        defaultSampleFlagsPresent = result.flags[2] & 0x20,
        i;

      i = 8;
      if (baseDataOffsetPresent) {
        i += 4; // truncate top 4 bytes
        result.baseDataOffset = view.getUint32(12);
        i += 4;
      }
      if (sampleDescriptionIndexPresent) {
        result.sampleDescriptionIndex = view.getUint32(i);
        i += 4;
      }
      if (defaultSampleDurationPresent) {
        result.defaultSampleDuration = view.getUint32(i);
        i += 4;
      }
      if (defaultSampleSizePresent) {
        result.defaultSampleSize = view.getUint32(i);
        i += 4;
      }
      if (defaultSampleFlagsPresent) {
        result.defaultSampleFlags = view.getUint32(i);
      }
      return result;
    },
    tkhd: function(data) {
      var
        view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        i = 4,
        result = {
          version: view.getUint8(0),
          flags: new Uint8Array(data.subarray(1, 4)),
        };
      if (result.version === 1) {
        i += 4;
        result.creationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes
        i += 8;
        result.modificationTime = parseMp4Date(view.getUint32(i)); // truncating top 4 bytes
        i += 4;
        result.trackId = view.getUint32(i);
        i += 4;
        i += 8;
        result.duration = view.getUint32(i); // truncating top 4 bytes
      } else {
        result.creationTime = parseMp4Date(view.getUint32(i));
        i += 4;
        result.modificationTime = parseMp4Date(view.getUint32(i));
        i += 4;
        result.trackId = view.getUint32(i);
        i += 4;
        i += 4;
        result.duration = view.getUint32(i);
      }
      i += 4;
      i += 2 * 4;
      result.layer = view.getUint16(i);
      i += 2;
      result.alternateGroup = view.getUint16(i);
      i += 2;
      // convert fixed-point, base 16 back to a number
      result.volume = view.getUint8(i) + (view.getUint8(i + 1) / 8);
      i += 2;
      i += 2;
      result.matrix = new Uint32Array(data.subarray(i, i + (9 * 4)));
      i += 9 * 4;
      result.width = view.getUint16(i) + (view.getUint16(i + 2) / 16);
      i += 4;
      result.height = view.getUint16(i) + (view.getUint16(i + 2) / 16);
      return result;
    },
    traf: function(data) {
      return {
        boxes: inspectMp4(data)
      };
    },
    trak: function(data) {
      return {
        boxes: inspectMp4(data)
      };
    },
    trex: function(data) {
      var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
      return {
        version: data[0],
        flags: new Uint8Array(data.subarray(1, 4)),
        trackId: view.getUint32(4),
        defaultSampleDescriptionIndex: view.getUint32(8),
        defaultSampleDuration: view.getUint32(12),
        defaultSampleSize: view.getUint32(16),
        sampleDependsOn: data[20] & 0x03,
        sampleIsDependedOn: (data[21] & 0xc0) >> 6,
        sampleHasRedundancy: (data[21] & 0x30) >> 4,
        samplePaddingValue: (data[21] & 0x0e) >> 1,
        sampleIsDifferenceSample: !!(data[21] & 0x01),
        sampleDegradationPriority: view.getUint16(22)
      };
    },
    trun: function(data) {
      var
        result = {
          version: data[0],
          flags: new Uint8Array(data.subarray(1, 4)),
          samples: []
        },
        view = new DataView(data.buffer, data.byteOffset, data.byteLength),
        dataOffsetPresent = result.flags[2] & 0x01,
        firstSampleFlagsPresent = result.flags[2] & 0x04,
        sampleDurationPresent = result.flags[1] & 0x01,
        sampleSizePresent = result.flags[1] & 0x02,
        sampleFlagsPresent = result.flags[1] & 0x04,
        sampleCompositionTimeOffsetPresent = result.flags[1] & 0x08,
        sampleCount = view.getUint32(4),
        offset = 8,
        sample;

      if (dataOffsetPresent) {
        result.dataOffset = view.getUint32(offset);
        offset += 4;
      }

      if (firstSampleFlagsPresent && sampleCount) {
        sample = {
          flags: parseSampleFlags(data.subarray(offset, offset + 4))
        };
        offset += 4;
        if (sampleDurationPresent) {
          sample.duration = view.getUint32(offset);
          offset += 4;
        }
        if (sampleSizePresent) {
          sample.size = view.getUint32(offset);
          offset += 4;
        }
        if (sampleCompositionTimeOffsetPresent) {
          sample.compositionTimeOffset = view.getUint32(offset);
          offset += 4;
        }
        result.samples.push(sample);
        sampleCount--;
      }

      while (sampleCount--) {
        sample = {};
        if (sampleDurationPresent) {
          sample.duration = view.getUint32(offset);
          offset += 4;
        }
        if (sampleSizePresent) {
          sample.size = view.getUint32(offset);
          offset += 4;
        }
        if (sampleFlagsPresent) {
          sample.flags = parseSampleFlags(data.subarray(offset, offset + 4));
          offset += 4;
        }
        if (sampleCompositionTimeOffsetPresent) {
          sample.compositionTimeOffset = view.getUint32(offset);
          offset += 4;
        }
        result.samples.push(sample);
      }
      return result;
    },
    'url ': function(data) {
      return {
        version: data[0],
        flags: new Uint8Array(data.subarray(1, 4))
      };
    },
    vmhd: function(data) {
      var view = new DataView(data.buffer, data.byteOffset, data.byteLength);
      return {
        version: data[0],
        flags: new Uint8Array(data.subarray(1, 4)),
        graphicsmode: view.getUint16(4),
        opcolor: new Uint16Array([view.getUint16(6),
                                  view.getUint16(8),
                                  view.getUint16(10)])
      };
    }
  };


/**
 * Return a javascript array of box objects parsed from an ISO base
 * media file.
 * @param data {Uint8Array} the binary data of the media to be inspected
 * @return {array} a javascript array of potentially nested box objects
 */
inspectMp4 = function(data) {
  var
    i = 0,
    result = [],
    view,
    size,
    type,
    end,
    box;

  // Convert data from Uint8Array to ArrayBuffer, to follow Dataview API
  var ab = new ArrayBuffer(data.length);
  var v = new Uint8Array(ab);
  for (var z = 0; z < data.length; ++z) {
      v[z] = data[z];
  }
  view = new DataView(ab);


  while (i < data.byteLength) {
    // parse box data
    size = view.getUint32(i);
    type =  parseType(data.subarray(i + 4, i + 8));
    end = size > 1 ? i + size : data.byteLength;

    // parse type-specific data
    box = (parse[type] || function(data) {
      return {
        data: data
      };
    })(data.subarray(i + 8, end));
    box.size = size;
    box.type = type;

    // store this box and move to the next
    result.push(box);
    i = end;
  }
  return result;
};

/**
 * Returns a textual representation of the javascript represtentation
 * of an MP4 file. You can use it as an alternative to
 * JSON.stringify() to compare inspected MP4s.
 * @param inspectedMp4 {array} the parsed array of boxes in an MP4
 * file
 * @param depth {number} (optional) the number of ancestor boxes of
 * the elements of inspectedMp4. Assumed to be zero if unspecified.
 * @return {string} a text representation of the parsed MP4
 */
textifyMp4 = function(inspectedMp4, depth) {
  var indent;
  depth = depth || 0;
  indent = new Array(depth * 2 + 1).join(' ');

  // iterate over all the boxes
  return inspectedMp4.map(function(box, index) {

    // list the box type first at the current indentation level
    return indent + box.type + '\n' +

      // the type is already included and handle child boxes separately
      Object.keys(box).filter(function(key) {
        return key !== 'type' && key !== 'boxes';

      // output all the box properties
      }).map(function(key) {
        var prefix = indent + '  ' + key + ': ',
            value = box[key];

        // print out raw bytes as hexademical
        if (value instanceof Uint8Array || value instanceof Uint32Array) {
          var bytes = Array.prototype.slice.call(new Uint8Array(value.buffer, value.byteOffset, value.byteLength))
              .map(function(byte) {
                return ' ' + ('00' + byte.toString(16)).slice(-2);
              }).join('').match(/.{1,24}/g);
          if (!bytes) {
            return prefix + '<>';
          }
          if (bytes.length === 1) {
            return prefix + '<' + bytes.join('').slice(1) + '>';
          }
          return prefix + '<\n' + bytes.map(function(line) {
            return indent + '  ' + line;
          }).join('\n') + '\n' + indent + '  >';
        }

        // stringify generic objects
        return prefix +
            JSON.stringify(value, null, 2)
              .split('\n').map(function(line, index) {
                if (index === 0) {
                  return line;
                }
                return indent + '  ' + line;
              }).join('\n');
      }).join('\n') +

    // recursively textify the child boxes
    (box.boxes ? '\n' + textifyMp4(box.boxes, depth + 1) : '');
  }).join('\n');
};

module.exports = {
  inspect: inspectMp4,
  textify: textifyMp4
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],19:[function(require,module,exports){
'use strict';

var ExpGolomb;

/**
 * Parser for exponential Golomb codes, a variable-bitwidth number encoding
 * scheme used by h264.
 */
ExpGolomb = function(workingData) {
  var
    // the number of bytes left to examine in workingData
    workingBytesAvailable = workingData.byteLength,

    // the current word being examined
    workingWord = 0, // :uint

    // the number of bits left to examine in the current word
    workingBitsAvailable = 0; // :uint;

  // ():uint
  this.length = function() {
    return (8 * workingBytesAvailable);
  };

  // ():uint
  this.bitsAvailable = function() {
    return (8 * workingBytesAvailable) + workingBitsAvailable;
  };

  // ():void
  this.loadWord = function() {
    var
      position = workingData.byteLength - workingBytesAvailable,
      workingBytes = new Uint8Array(4),
      availableBytes = Math.min(4, workingBytesAvailable);

    if (availableBytes === 0) {
      throw new Error('no bytes available');
    }

    workingBytes.set(workingData.subarray(position,
                                          position + availableBytes));
    workingWord = new DataView(workingBytes.buffer).getUint32(0);

    // track the amount of workingData that has been processed
    workingBitsAvailable = availableBytes * 8;
    workingBytesAvailable -= availableBytes;
  };

  // (count:int):void
  this.skipBits = function(count) {
    var skipBytes; // :int
    if (workingBitsAvailable > count) {
      workingWord          <<= count;
      workingBitsAvailable -= count;
    } else {
      count -= workingBitsAvailable;
      skipBytes = Math.floor(count / 8);

      count -= (skipBytes * 8);
      workingBytesAvailable -= skipBytes;

      this.loadWord();

      workingWord <<= count;
      workingBitsAvailable -= count;
    }
  };

  // (size:int):uint
  this.readBits = function(size) {
    var
      bits = Math.min(workingBitsAvailable, size), // :uint
      valu = workingWord >>> (32 - bits); // :uint
    // if size > 31, handle error
    workingBitsAvailable -= bits;
    if (workingBitsAvailable > 0) {
      workingWord <<= bits;
    } else if (workingBytesAvailable > 0) {
      this.loadWord();
    }

    bits = size - bits;
    if (bits > 0) {
      return valu << bits | this.readBits(bits);
    } else {
      return valu;
    }
  };

  // ():uint
  this.skipLeadingZeros = function() {
    var leadingZeroCount; // :uint
    for (leadingZeroCount = 0 ; leadingZeroCount < workingBitsAvailable ; ++leadingZeroCount) {
      if (0 !== (workingWord & (0x80000000 >>> leadingZeroCount))) {
        // the first bit of working word is 1
        workingWord <<= leadingZeroCount;
        workingBitsAvailable -= leadingZeroCount;
        return leadingZeroCount;
      }
    }

    // we exhausted workingWord and still have not found a 1
    this.loadWord();
    return leadingZeroCount + this.skipLeadingZeros();
  };

  // ():void
  this.skipUnsignedExpGolomb = function() {
    this.skipBits(1 + this.skipLeadingZeros());
  };

  // ():void
  this.skipExpGolomb = function() {
    this.skipBits(1 + this.skipLeadingZeros());
  };

  // ():uint
  this.readUnsignedExpGolomb = function() {
    var clz = this.skipLeadingZeros(); // :uint
    return this.readBits(clz + 1) - 1;
  };

  // ():int
  this.readExpGolomb = function() {
    var valu = this.readUnsignedExpGolomb(); // :int
    if (0x01 & valu) {
      // the number is odd if the low order bit is set
      return (1 + valu) >>> 1; // add 1 to make it even, and divide by 2
    } else {
      return -1 * (valu >>> 1); // divide by two then make it negative
    }
  };

  // Some convenience functions
  // :Boolean
  this.readBoolean = function() {
    return 1 === this.readBits(1);
  };

  // ():int
  this.readUnsignedByte = function() {
    return this.readBits(8);
  };

  this.loadWord();
};

module.exports = ExpGolomb;

},{}],20:[function(require,module,exports){
/**
 * mux.js
 *
 * Copyright (c) 2014 Brightcove
 * All rights reserved.
 *
 * A lightweight readable stream implemention that handles event dispatching.
 * Objects that inherit from streams should call init in their constructors.
 */
'use strict';

var Stream = function() {
  this.init = function() {
    var listeners = {};
    /**
     * Add a listener for a specified event type.
     * @param type {string} the event name
     * @param listener {function} the callback to be invoked when an event of
     * the specified type occurs
     */
    this.on = function(type, listener) {
      if (!listeners[type]) {
        listeners[type] = [];
      }
      listeners[type].push(listener);
    };
    /**
     * Remove a listener for a specified event type.
     * @param type {string} the event name
     * @param listener {function} a function previously registered for this
     * type of event through `on`
     */
    this.off = function(type, listener) {
      var index;
      if (!listeners[type]) {
        return false;
      }
      index = listeners[type].indexOf(listener);
      listeners[type].splice(index, 1);
      return index > -1;
    };
    /**
     * Trigger an event of the specified type on this stream. Any additional
     * arguments to this function are passed as parameters to event listeners.
     * @param type {string} the event name
     */
    this.trigger = function(type) {
      var callbacks, i, length, args;
      callbacks = listeners[type];
      if (!callbacks) {
        return;
      }
      // Slicing the arguments on every invocation of this method
      // can add a significant amount of overhead. Avoid the
      // intermediate object creation for the common case of a
      // single callback argument
      if (arguments.length === 2) {
        length = callbacks.length;
        for (i = 0; i < length; ++i) {
          callbacks[i].call(this, arguments[1]);
        }
      } else {
        args = [];
        i = arguments.length;
        for (i = 1; i < arguments.length; ++i) {
          args.push(arguments[i]);
        }
        length = callbacks.length;
        for (i = 0; i < length; ++i) {
          callbacks[i].apply(this, args);
        }
      }
    };
    /**
     * Destroys the stream and cleans up.
     */
    this.dispose = function() {
      listeners = {};
    };
  };
};

/**
 * Forwards all `data` events on this stream to the destination stream. The
 * destination stream should provide a method `push` to receive the data
 * events as they arrive.
 * @param destination {stream} the stream that will receive all `data` events
 * @param autoFlush {boolean} if false, we will not call `flush` on the destination
 *                            when the current stream emits a 'done' event
 * @see http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
 */
Stream.prototype.pipe = function(destination) {
  this.on('data', function(data) {
    destination.push(data);
  });

  this.on('done', function() {
    destination.flush();
  });

  return destination;
};

// Default stream functions that are expected to be overridden to perform
// actual work. These are provided by the prototype as a sort of no-op
// implementation so that we don't have to check for their existence in the
// `pipe` function above.
Stream.prototype.push = function(data) {
  this.trigger('data', data);
};

Stream.prototype.flush = function() {
  this.trigger('done');
};

module.exports = Stream;

},{}]},{},[8])(8)
});
(function(window, muxjs, undefined){
  'use strict';
  var urlCount = 0,
      EventTarget = videojs.EventTarget,
      defaults,
      VirtualSourceBuffer,
      flvCodec = /video\/flv(;\s*codecs=["']vp6,aac["'])?$/,
      objectUrlPrefix = 'blob:vjs-media-source/',
      interceptBufferCreation,
      aggregateUpdateHandler,
      scheduleTick,
      Cue,
      deprecateOldCue,
      removeCuesFromTrack,
      createTextTracksIfNecessary,
      addTextTrackData;

deprecateOldCue = function(cue) {
  Object.defineProperties(cue.frame, {
    'id': {
      get: function() {
        videojs.log.warn('cue.frame.id is deprecated. Use cue.value.key instead.');
        return cue.value.key;
      }
    },
    'value': {
      get: function() {
        videojs.log.warn('cue.frame.value is deprecated. Use cue.value.data instead.');
        return cue.value.data;
      }
    },
    'privateData': {
      get: function() {
        videojs.log.warn('cue.frame.privateData is deprecated. Use cue.value.data instead.');
        return cue.value.data;
      }
    }
  });
};

removeCuesFromTrack = function(start, end, track) {
  var i, cue;

  if (!track) {
    return;
  }

  i = track.cues.length;

  while(i--) {
    cue = track.cues[i];

    // Remove any overlapping cue
    if (cue.startTime <= end && cue.endTime >= start) {
      track.removeCue(cue);
    }
  }
};

createTextTracksIfNecessary = function (sourceBuffer, mediaSource, segment) {
  // create an in-band caption track if one is present in the segment
  if (segment.captions &&
      segment.captions.length &&
      !sourceBuffer.inbandTextTrack_) {
    sourceBuffer.inbandTextTrack_ = mediaSource.player_.addTextTrack('captions', 'cc1');
  }

  if (segment.metadata &&
      segment.metadata.length &&
      !sourceBuffer.metadataTrack_) {
    sourceBuffer.metadataTrack_ = mediaSource.player_.addTextTrack('metadata', 'Timed Metadata');
    sourceBuffer.metadataTrack_.inBandMetadataTrackDispatchType = segment.metadata.dispatchType;
  }
};

addTextTrackData = function (sourceHandler, captionArray, metadataArray) {
  Cue = window.WebKitDataCue || window.VTTCue;
  if (captionArray) {
    captionArray.forEach(function (caption) {
      this.inbandTextTrack_.addCue(
        new Cue(
          caption.startTime + this.timestampOffset,
          caption.endTime + this.timestampOffset,
          caption.text
        ));
    }, sourceHandler);
  }

  if (metadataArray) {
    metadataArray.forEach(function(metadata) {
      var time = metadata.cueTime + this.timestampOffset;

      metadata.frames.forEach(function(frame) {
        var cue = new Cue(
            time,
            time,
            frame.value || frame.url || frame.data || '');

        cue.frame = frame;
        cue.value = frame;
        deprecateOldCue(cue);
        this.metadataTrack_.addCue(cue);
      }, this);
    }, sourceHandler);
  }
};

  // ------------
  // Media Source
  // ------------

  defaults = {
    // how to determine the MediaSource implementation to use. There
    // are three available modes:
    // - auto: use native MediaSources where available and Flash
    //   everywhere else
    // - html5: always use native MediaSources
    // - flash: always use the Flash MediaSource polyfill
    mode: 'auto'
  };

  videojs.MediaSource = function(options) {
    var settings = videojs.mergeOptions(defaults, options);

    // determine whether HTML MediaSources should be used
    if (settings.mode === 'html5' ||
        (settings.mode === 'auto' &&
         videojs.MediaSource.supportsNativeMediaSources())) {
      return new videojs.HtmlMediaSource();
    }

    // otherwise, emulate them through the SWF
    return new videojs.FlashMediaSource();
  };

  // Check to see if the native MediaSource object exists and supports
  // an MP4 container with both H.264 video and AAC-LC audio
  videojs.MediaSource.supportsNativeMediaSources = function() {
    return (!!window.MediaSource &&
      window.MediaSource.isTypeSupported('video/mp4;codecs="avc1.4d400d,mp4a.40.2"'));
  };

  // ----
  // HTML
  // ----

  videojs.HtmlMediaSource = videojs.extend(EventTarget, {
    constructor: function() {
      var self = this, property;

      this.mediaSource_ = new window.MediaSource();
      // delegate to the native MediaSource's methods by default
      for (property in this.mediaSource_) {
        if (!(property in videojs.HtmlMediaSource.prototype) &&
            typeof this.mediaSource_[property] === 'function') {
          this[property] = this.mediaSource_[property].bind(this.mediaSource_);
        }
      }

      // emulate `duration` and `seekable` until seeking can be
      // handled uniformly for live streams
      // see https://github.com/w3c/media-source/issues/5
      this.duration_ = NaN;
      Object.defineProperty(this, 'duration', {
        get: function() {
          if (self.duration_ === Infinity) {
            return self.duration_;
          } else {
            return self.mediaSource_.duration;
          }
        },
        set: function(duration) {
          var currentDuration;

          self.duration_ = duration;
          if (duration !== Infinity) {
            self.mediaSource_.duration = duration;
            return;
          }
        }
      });
      Object.defineProperty(this, 'seekable', {
        get: function() {
          if (this.duration_ === Infinity) {
            return videojs.createTimeRanges([[0, self.mediaSource_.duration]]);
          }
          return self.mediaSource_.seekable;
        }
      });

      Object.defineProperty(this, 'readyState', {
        get: function() {
          return self.mediaSource_.readyState;
        }
      });

      // the list of virtual and native SourceBuffers created by this
      // MediaSource
      this.sourceBuffers = [];

      // Re-emit MediaSource events on the polyfill
      [
        'sourceopen',
        'sourceclose',
        'sourceended'
      ].forEach(function(eventName) {
        this.mediaSource_.addEventListener(eventName, this.trigger.bind(this));
      }, this);

      // capture the associated player when the MediaSource is
      // successfully attached
      this.on('sourceopen', function(event) {
        var video = document.querySelector('[src="' + self.url_ + '"]');

        if (!video) {
          return;
        }

        self.player_ = videojs(video.parentNode);
      });

      // explicitly terminate any WebWorkers that were created
      // by SourceHandlers
      this.on('sourceclose', function(event) {
        this.sourceBuffers.forEach(function(sourceBuffer) {
          if (sourceBuffer.transmuxer_) {
            sourceBuffer.transmuxer_.terminate();
          }
        });

        this.sourceBuffers.length = 0;
      });
    },

    addSeekableRange_: function(start, end) {
      var error;

      if (this.duration !== Infinity) {
        error = new Error('MediaSource.addSeekableRange() can only be invoked ' +
                          'when the duration is Infinity');
        error.name = 'InvalidStateError';
        error.code = 11;
        throw error;
      }

      if (end > this.mediaSource_.duration ||
          isNaN(this.mediaSource_.duration)) {
        this.mediaSource_.duration = end;
      }
    },

    addSourceBuffer: function(type) {
      var
        buffer,
        codecs,
        avcCodec,
        mp4aCodec,
        avcRegEx = /avc1\.[\da-f]+/i,
        mp4aRegEx = /mp4a\.\d+.\d+/i;

      // create a virtual source buffer to transmux MPEG-2 transport
      // stream segments into fragmented MP4s
      if ((/^video\/mp2t/i).test(type)) {
        codecs = type.split(';').slice(1).join(';');
        codecs = translateLegacyCodecs(codecs);

        // Pull out each individual codec string if it exists
        avcCodec = (codecs.match(avcRegEx) || [])[0];
        mp4aCodec = (codecs.match(mp4aRegEx) || [])[0];

        // If a codec is unspecified, use the defaults
        if (!avcCodec || !avcCodec.length) {
          avcCodec = 'avc1.4d400d';
        }
        if (!mp4aCodec || !mp4aCodec.length) {
          mp4aCodec = 'mp4a.40.2';
        }

        buffer = new VirtualSourceBuffer(this, [avcCodec, mp4aCodec]);
        this.sourceBuffers.push(buffer);
        return buffer;
      }


      // delegate to the native implementation
      buffer = this.mediaSource_.addSourceBuffer(type);
      this.sourceBuffers.push(buffer);
      return buffer;
    }
  });

  // Replace the old apple-style `avc1.<dd>.<dd>` codec string with the standard
  // `avc1.<hhhhhh>`
  var translateLegacyCodecs = function(codecs) {
    return codecs.replace(/avc1\.(\d+)\.(\d+)/i, function(orig, profile, avcLevel) {
      var
      profileHex = ('00' + Number(profile).toString(16)).slice(-2),
      avcLevelHex = ('00' + Number(avcLevel).toString(16)).slice(-2);

      return 'avc1.' + profileHex + '00' + avcLevelHex;
    });
  };

  aggregateUpdateHandler = function(mediaSource, guardBufferName, type) {
    return function() {
      if (!mediaSource[guardBufferName] || !mediaSource[guardBufferName].updating) {
        return mediaSource.trigger(type);
      }
    };
  };

  VirtualSourceBuffer = videojs.extend(EventTarget, {
    constructor: function VirtualSourceBuffer(mediaSource, codecs) {
      var self = this;

      this.timestampOffset_ = 0;
      this.pendingBuffers_ = [];
      this.bufferUpdating_ = false;
      this.mediaSource_ = mediaSource;
      this.codecs_ = codecs;

      this.transmuxer_ = new Worker(URL.createObjectURL(new Blob(["var muxjs={},transmuxer,initOptions={};!function(a){if(\"object\"==typeof exports&&\"undefined\"!=typeof module)module.exports=a();else if(\"function\"==typeof define&&define.amd)define([],a);else{var b;b=\"undefined\"!=typeof window?window:\"undefined\"!=typeof global?global:\"undefined\"!=typeof self?self:this,b.muxjs=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i=\"function\"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error(\"Cannot find module '\"+g+\"'\");throw j.code=\"MODULE_NOT_FOUND\",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f=\"function\"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){\"use strict\";var d,e=a(\"../utils/stream.js\");d=function(){var a,b=0;d.prototype.init.call(this),this.setTimestamp=function(a){b=a},this.parseId3TagSize=function(a,b){var c=a[b+6]<<21|a[b+7]<<14|a[b+8]<<7|a[b+9],d=a[b+5],e=(16&d)>>4;return e?c+20:c+10},this.parseAdtsSize=function(a,b){var c=(224&a[b+5])>>5,d=a[b+4]<<3,e=6144&a[b+3];return e|d|c},this.push=function(c){var d,e,f,g=0,h=0;for(void 0!==a&&a.length?(f=a.length,a=new Uint8Array(c.byteLength+f),a.set(a.subarray(0,f)),a.set(c,f)):a=c;a.length-h>=10;)if(a[h]!==\"I\".charCodeAt(0)||a[h+1]!==\"D\".charCodeAt(0)||a[h+2]!==\"3\".charCodeAt(0))if(a[h]&!0&&240===(240&a[h+1])){if(g=this.parseAdtsSize(a,h),g>a.length)break;e={type:\"audio\",data:a.subarray(h,h+g),pts:b,dts:b},this.trigger(\"data\",e),h+=g}else h++;else{if(g=this.parseId3TagSize(a,h),g>a.length)break;d={type:\"timed-metadata\",data:a.subarray(h,h+g)},this.trigger(\"data\",d),h+=g}}},d.prototype=new e,b.exports=d},{\"../utils/stream.js\":20}],2:[function(a,b,c){\"use strict\";var d,e=a(\"../utils/stream.js\"),f=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350];d=function(){var a,b;d.prototype.init.call(this),a=this,this.push=function(a){var c,d,e,g,h,i,j=0,k=0;if(\"audio\"===a.type)for(b?(g=b,b=new Uint8Array(g.byteLength+a.data.byteLength),b.set(g),b.set(a.data,g.byteLength)):b=a.data;j+5<b.length;)if(255===b[j]&&240===(246&b[j+1])){if(d=2*(1&~b[j+1]),c=(3&b[j+3])<<11|b[j+4]<<3|(224&b[j+5])>>5,h=1024*((3&b[j+6])+1),i=9e4*h/f[(60&b[j+2])>>>2],e=j+c,b.byteLength<e)return;if(this.trigger(\"data\",{pts:a.pts+k*i,dts:a.dts+k*i,sampleCount:h,audioobjecttype:(b[j+2]>>>6&3)+1,channelcount:(1&b[j+2])<<3|(192&b[j+3])>>>6,samplerate:f[(60&b[j+2])>>>2],samplingfrequencyindex:(60&b[j+2])>>>2,samplesize:16,data:b.subarray(j+7+d,e)}),b.byteLength===e)return void(b=void 0);k++,b=b.subarray(e)}else j++},this.flush=function(){this.trigger(\"done\")}},d.prototype=new e,b.exports=d},{\"../utils/stream.js\":20}],3:[function(a,b,c){\"use strict\";var d,e,f=a(\"../utils/stream.js\"),g=a(\"../utils/exp-golomb.js\");e=function(){var a,b,c=0;e.prototype.init.call(this),this.push=function(d){var e;for(b?(e=new Uint8Array(b.byteLength+d.data.byteLength),e.set(b),e.set(d.data,b.byteLength),b=e):b=d.data;c<b.byteLength-3;c++)if(1===b[c+2]){a=c+5;break}for(;a<b.byteLength;)switch(b[a]){case 0:if(0!==b[a-1]){a+=2;break}if(0!==b[a-2]){a++;break}this.trigger(\"data\",b.subarray(c+3,a-2));do a++;while(1!==b[a]&&a<b.length);c=a-2,a+=3;break;case 1:if(0!==b[a-1]||0!==b[a-2]){a+=3;break}this.trigger(\"data\",b.subarray(c+3,a-2)),c=a-2,a+=3;break;default:a+=3}b=b.subarray(c),a-=c,c=0},this.flush=function(){b&&b.byteLength>3&&this.trigger(\"data\",b.subarray(c+3)),b=null,c=0,this.trigger(\"done\")}},e.prototype=new f,d=function(){var a,b,c,f,h,i,j,k=new e;d.prototype.init.call(this),a=this,this.push=function(a){\"video\"===a.type&&(b=a.trackId,c=a.pts,f=a.dts,k.push(a))},k.on(\"data\",function(d){var e={trackId:b,pts:c,dts:f,data:d};switch(31&d[0]){case 5:e.nalUnitType=\"slice_layer_without_partitioning_rbsp_idr\";break;case 6:e.nalUnitType=\"sei_rbsp\",e.escapedRBSP=h(d.subarray(1));break;case 7:e.nalUnitType=\"seq_parameter_set_rbsp\",e.escapedRBSP=h(d.subarray(1)),e.config=i(e.escapedRBSP);break;case 8:e.nalUnitType=\"pic_parameter_set_rbsp\";break;case 9:e.nalUnitType=\"access_unit_delimiter_rbsp\"}a.trigger(\"data\",e)}),k.on(\"done\",function(){a.trigger(\"done\")}),this.flush=function(){k.flush()},j=function(a,b){var c,d,e=8,f=8;for(c=0;a>c;c++)0!==f&&(d=b.readExpGolomb(),f=(e+d+256)%256),e=0===f?e:f},h=function(a){for(var b,c,d=a.byteLength,e=[],f=1;d-2>f;)0===a[f]&&0===a[f+1]&&3===a[f+2]?(e.push(f+2),f+=2):f++;if(0===e.length)return a;b=d-e.length,c=new Uint8Array(b);var g=0;for(f=0;b>f;g++,f++)g===e[0]&&(g++,e.shift()),c[f]=a[g];return c},i=function(a){var b,c,d,e,f,h,i,k,l,m,n,o,p=0,q=0,r=0,s=0;if(b=new g(a),c=b.readUnsignedByte(),e=b.readUnsignedByte(),d=b.readUnsignedByte(),b.skipUnsignedExpGolomb(),(100===c||110===c||122===c||244===c||44===c||83===c||86===c||118===c||128===c||138===c||139===c||134===c)&&(f=b.readUnsignedExpGolomb(),3===f&&b.skipBits(1),b.skipUnsignedExpGolomb(),b.skipUnsignedExpGolomb(),b.skipBits(1),b.readBoolean()))for(n=3!==f?8:12,o=0;n>o;o++)b.readBoolean()&&(6>o?j(16,b):j(64,b));if(b.skipUnsignedExpGolomb(),h=b.readUnsignedExpGolomb(),0===h)b.readUnsignedExpGolomb();else if(1===h)for(b.skipBits(1),b.skipExpGolomb(),b.skipExpGolomb(),i=b.readUnsignedExpGolomb(),o=0;i>o;o++)b.skipExpGolomb();return b.skipUnsignedExpGolomb(),b.skipBits(1),k=b.readUnsignedExpGolomb(),l=b.readUnsignedExpGolomb(),m=b.readBits(1),0===m&&b.skipBits(1),b.skipBits(1),b.readBoolean()&&(p=b.readUnsignedExpGolomb(),q=b.readUnsignedExpGolomb(),r=b.readUnsignedExpGolomb(),s=b.readUnsignedExpGolomb()),{profileIdc:c,levelIdc:d,profileCompatibility:e,width:16*(k+1)-2*p-2*q,height:(2-m)*(l+1)*16-2*r-2*s}}},d.prototype=new f,b.exports={H264Stream:d,NalByteStream:e}},{\"../utils/exp-golomb.js\":19,\"../utils/stream.js\":20}],4:[function(a,b,c){b.exports={adts:a(\"./adts\"),h264:a(\"./h264\")}},{\"./adts\":2,\"./h264\":3}],5:[function(a,b,c){\"use strict\";var d;d=function(a,b){var c,e=0,f=16384,g=function(a,b){var c,d=a.position+b;d<a.bytes.byteLength||(c=new Uint8Array(2*d),c.set(a.bytes.subarray(0,a.position),0),a.bytes=c,a.view=new DataView(a.bytes.buffer))},h=d.widthBytes||new Uint8Array(\"width\".length),i=d.heightBytes||new Uint8Array(\"height\".length),j=d.videocodecidBytes||new Uint8Array(\"videocodecid\".length);if(!d.widthBytes){for(c=0;c<\"width\".length;c++)h[c]=\"width\".charCodeAt(c);for(c=0;c<\"height\".length;c++)i[c]=\"height\".charCodeAt(c);for(c=0;c<\"videocodecid\".length;c++)j[c]=\"videocodecid\".charCodeAt(c);d.widthBytes=h,d.heightBytes=i,d.videocodecidBytes=j}switch(this.keyFrame=!1,a){case d.VIDEO_TAG:this.length=16,f*=6;break;case d.AUDIO_TAG:this.length=13,this.keyFrame=!0;break;case d.METADATA_TAG:this.length=29,this.keyFrame=!0;break;default:throw\"Error Unknown TagType\"}this.bytes=new Uint8Array(f),this.view=new DataView(this.bytes.buffer),this.bytes[0]=a,this.position=this.length,this.keyFrame=b,this.pts=0,this.dts=0,this.writeBytes=function(a,b,c){var d,e=b||0;c=c||a.byteLength,d=e+c,g(this,c),this.bytes.set(a.subarray(e,d),this.position),this.position+=c,this.length=Math.max(this.length,this.position)},this.writeByte=function(a){g(this,1),this.bytes[this.position]=a,this.position++,this.length=Math.max(this.length,this.position)},this.writeShort=function(a){g(this,2),this.view.setUint16(this.position,a),this.position+=2,this.length=Math.max(this.length,this.position)},this.negIndex=function(a){return this.bytes[this.length-a]},this.nalUnitSize=function(){return 0===e?0:this.length-(e+4)},this.startNalUnit=function(){if(e>0)throw new Error(\"Attempted to create new NAL wihout closing the old one\");e=this.length,this.length+=4,this.position=this.length},this.endNalUnit=function(a){var b,c;this.length===e+4?this.length-=4:e>0&&(b=e+4,c=this.length-b,this.position=e,this.view.setUint32(this.position,c),this.position=this.length,a&&a.push(this.bytes.subarray(b,b+c))),e=0},this.writeMetaDataDouble=function(a,b){var c;if(g(this,2+a.length+9),this.view.setUint16(this.position,a.length),this.position+=2,\"width\"===a)this.bytes.set(h,this.position),this.position+=5;else if(\"height\"===a)this.bytes.set(i,this.position),this.position+=6;else if(\"videocodecid\"===a)this.bytes.set(j,this.position),this.position+=12;else for(c=0;c<a.length;c++)this.bytes[this.position]=a.charCodeAt(c),this.position++;this.position++,this.view.setFloat64(this.position,b),this.position+=8,this.length=Math.max(this.length,this.position),++e},this.writeMetaDataBoolean=function(a,b){var c;for(g(this,2),this.view.setUint16(this.position,a.length),this.position+=2,c=0;c<a.length;c++)g(this,1),this.bytes[this.position]=a.charCodeAt(c),this.position++;g(this,2),this.view.setUint8(this.position,1),this.position++,this.view.setUint8(this.position,b?1:0),this.position++,this.length=Math.max(this.length,this.position),++e},this.finalize=function(){var a,c;switch(this.bytes[0]){case d.VIDEO_TAG:this.bytes[11]=7|(this.keyFrame||b?16:32),this.bytes[12]=b?0:1,a=this.pts-this.dts,this.bytes[13]=(16711680&a)>>>16,this.bytes[14]=(65280&a)>>>8,this.bytes[15]=(255&a)>>>0;break;case d.AUDIO_TAG:this.bytes[11]=175,this.bytes[12]=b?0:1;break;case d.METADATA_TAG:this.position=11,this.view.setUint8(this.position,2),this.position++,this.view.setUint16(this.position,10),this.position+=2,this.bytes.set([111,110,77,101,116,97,68,97,116,97],this.position),this.position+=10,this.bytes[this.position]=8,this.position++,this.view.setUint32(this.position,e),this.position=this.length,this.bytes.set([0,0,9],this.position),this.position+=3,this.length=this.position}return c=this.length-11,this.bytes[1]=(16711680&c)>>>16,this.bytes[2]=(65280&c)>>>8,this.bytes[3]=(255&c)>>>0,this.bytes[4]=(16711680&this.dts)>>>16,this.bytes[5]=(65280&this.dts)>>>8,this.bytes[6]=(255&this.dts)>>>0,this.bytes[7]=(4278190080&this.dts)>>>24,this.bytes[8]=0,this.bytes[9]=0,this.bytes[10]=0,g(this,4),this.view.setUint32(this.length,this.length),this.length+=4,this.position+=4,this.bytes=this.bytes.subarray(0,this.length),this.frameTime=d.frameTime(this.bytes),this}},d.AUDIO_TAG=8,d.VIDEO_TAG=9,d.METADATA_TAG=18,d.isAudioFrame=function(a){return d.AUDIO_TAG===a[0]},d.isVideoFrame=function(a){return d.VIDEO_TAG===a[0]},d.isMetaData=function(a){return d.METADATA_TAG===a[0]},d.isKeyFrame=function(a){return d.isVideoFrame(a)?23===a[11]:d.isAudioFrame(a)?!0:!!d.isMetaData(a)},d.frameTime=function(a){var b=a[4]<<16;return b|=a[5]<<8,b|=a[6]<<0,b|=a[7]<<24},b.exports=d},{}],6:[function(a,b,c){b.exports={tag:a(\"./flv-tag\"),Transmuxer:a(\"./transmuxer\"),tools:a(\"../tools/flv-inspector\")}},{\"../tools/flv-inspector\":17,\"./flv-tag\":5,\"./transmuxer\":7}],7:[function(a,b,c){\"use strict\";var d,e,f,g,h,i,j,k=a(\"../utils/stream.js\"),l=a(\"./flv-tag.js\"),m=a(\"../m2ts/m2ts.js\"),n=a(\"../codecs/adts.js\"),o=a(\"../codecs/h264\").H264Stream;h=function(a,b){\"number\"==typeof b.pts&&(void 0===a.timelineStartInfo.pts?a.timelineStartInfo.pts=b.pts:a.timelineStartInfo.pts=Math.min(a.timelineStartInfo.pts,b.pts)),\"number\"==typeof b.dts&&(void 0===a.timelineStartInfo.dts?a.timelineStartInfo.dts=b.dts:a.timelineStartInfo.dts=Math.min(a.timelineStartInfo.dts,b.dts))},i=function(a,b){var c=new l(l.METADATA_TAG);return c.dts=b,c.pts=b,c.writeMetaDataDouble(\"videocodecid\",7),c.writeMetaDataDouble(\"width\",a.width),c.writeMetaDataDouble(\"height\",a.height),c},j=function(a,b){var c,d=new l(l.VIDEO_TAG,!0);for(d.dts=b,d.pts=b,d.writeByte(1),d.writeByte(a.profileIdc),d.writeByte(a.profileCompatibility),d.writeByte(a.levelIdc),d.writeByte(255),d.writeByte(225),d.writeShort(a.sps[0].length),d.writeBytes(a.sps[0]),d.writeByte(a.pps.length),c=0;c<a.pps.length;++c)d.writeShort(a.pps[c].length),d.writeBytes(a.pps[c]);return d},f=function(a){var b,c=[];f.prototype.init.call(this),this.push=function(b){h(a,b),a&&void 0===a.channelcount&&(a.audioobjecttype=b.audioobjecttype,a.channelcount=b.channelcount,a.samplerate=b.samplerate,a.samplingfrequencyindex=b.samplingfrequencyindex,a.samplesize=b.samplesize,a.extraData=a.audioobjecttype<<11|a.samplingfrequencyindex<<7|a.channelcount<<3),b.pts=Math.round(b.pts/90),b.dts=Math.round(b.dts/90),c.push(b)},this.flush=function(){var d,e,f,g=[];if(0===c.length)return void this.trigger(\"done\");for(f=-(1/0);c.length;)d=c.shift(),(a.extraData!==b||d.pts-f>=1e3)&&(e=new l(l.METADATA_TAG),e.pts=d.pts,e.dts=d.dts,e.writeMetaDataDouble(\"audiocodecid\",10),e.writeMetaDataBoolean(\"stereo\",2===a.channelcount),e.writeMetaDataDouble(\"audiosamplerate\",a.samplerate),e.writeMetaDataDouble(\"audiosamplesize\",16),g.push(e),b=a.extraData,e=new l(l.AUDIO_TAG,!0),e.pts=d.pts,e.dts=d.dts,e.view.setUint16(e.position,a.extraData),e.position+=2,e.length=Math.max(e.length,e.position),g.push(e),f=d.pts),e=new l(l.AUDIO_TAG),e.pts=d.pts,e.dts=d.dts,e.writeBytes(d.data),g.push(e);b=null,this.trigger(\"data\",{track:a,tags:g}),this.trigger(\"done\")}},f.prototype=new k,e=function(a){var b,c,d=[];e.prototype.init.call(this),this.finishFrame=function(c,d){d&&(b&&a&&a.newMetadata&&(d.keyFrame||0===c.length)&&(c.push(i(b,d.pts)),c.push(j(a,d.pts)),a.newMetadata=!1),d.endNalUnit(),c.push(d))},this.push=function(b){h(a,b),b.pts=Math.round(b.pts/90),b.dts=Math.round(b.dts/90),d.push(b)},this.flush=function(){for(var e,f=[];d.length&&\"access_unit_delimiter_rbsp\"!==d[0].nalUnitType;)d.shift();if(0===d.length)return void this.trigger(\"done\");for(;d.length;)e=d.shift(),\"seq_parameter_set_rbsp\"===e.nalUnitType?(a.newMetadata=!0,b=e.config,a.width=b.width,a.height=b.height,a.sps=[e.data],a.profileIdc=b.profileIdc,a.levelIdc=b.levelIdc,a.profileCompatibility=b.profileCompatibility,c.endNalUnit()):\"pic_parameter_set_rbsp\"===e.nalUnitType?(a.newMetadata=!0,a.pps=[e.data],c.endNalUnit()):\"access_unit_delimiter_rbsp\"===e.nalUnitType?(c&&this.finishFrame(f,c),c=new l(l.VIDEO_TAG),c.pts=e.pts,c.dts=e.dts):(\"slice_layer_without_partitioning_rbsp_idr\"===e.nalUnitType&&(c.keyFrame=!0),c.endNalUnit()),c.startNalUnit(),c.writeBytes(e.data);c&&this.finishFrame(f,c),this.trigger(\"data\",{track:a,tags:f}),this.trigger(\"done\")}},e.prototype=new k,g=function(a){this.numberOfTracks=0,this.metadataStream=a.metadataStream,this.videoTags=[],this.audioTags=[],this.videoTrack=null,this.audioTrack=null,this.pendingCaptions=[],this.pendingMetadata=[],this.pendingTracks=0,g.prototype.init.call(this),this.push=function(a){return a.text?this.pendingCaptions.push(a):a.frames?this.pendingMetadata.push(a):(\"video\"===a.track.type&&(this.videoTrack=a.track,this.videoTags=a.tags,this.pendingTracks++),void(\"audio\"===a.track.type&&(this.audioTrack=a.track,this.audioTags=a.tags,this.pendingTracks++)))}},g.prototype=new k,g.prototype.flush=function(){var a,b,c,d,e={tags:{},captions:[],metadata:[]};if(!(this.pendingTracks<this.numberOfTracks)){for(this.videoTrack?d=this.videoTrack.timelineStartInfo.pts:this.audioTrack&&(d=this.audioTrack.timelineStartInfo.pts),e.tags.videoTags=this.videoTags,e.tags.audioTags=this.audioTags,c=0;c<this.pendingCaptions.length;c++)b=this.pendingCaptions[c],b.startTime=b.startPts-d,b.startTime/=9e4,b.endTime=b.endPts-d,b.endTime/=9e4,e.captions.push(b);for(c=0;c<this.pendingMetadata.length;c++)a=this.pendingMetadata[c],a.cueTime=a.pts-d,a.cueTime/=9e4,e.metadata.push(a);e.metadata.dispatchType=this.metadataStream.dispatchType,this.videoTrack=null,this.audioTrack=null,this.videoTags=[],this.audioTags=[],this.pendingCaptions.length=0,this.pendingMetadata.length=0,this.pendingTracks=0,this.trigger(\"data\",e),this.trigger(\"done\")}},d=function(a){var b,c,h,i,j,k,p,q,r,s=this;d.prototype.init.call(this),a=a||{},this.metadataStream=new m.MetadataStream,a.metadataStream=this.metadataStream,b=new m.TransportPacketStream,c=new m.TransportParseStream,h=new m.ElementaryStream,i=new n,j=new o,r=new g(a),b.pipe(c).pipe(h),h.pipe(j),h.pipe(i),h.pipe(this.metadataStream).pipe(r),q=new m.CaptionStream,j.pipe(q).pipe(r),h.on(\"data\",function(a){var b,c,d;if(\"metadata\"===a.type){for(b=a.tracks.length;b--;)\"video\"===a.tracks[b].type?c=a.tracks[b]:\"audio\"===a.tracks[b].type&&(d=a.tracks[b]);c&&!k&&(r.numberOfTracks++,k=new e(c),j.pipe(k).pipe(r)),d&&!p&&(r.numberOfTracks++,p=new f(d),i.pipe(p).pipe(r))}}),this.push=function(a){b.push(a)},this.flush=function(){b.flush()},r.on(\"data\",function(a){s.trigger(\"data\",a)}),r.on(\"done\",function(){s.trigger(\"done\")}),this.getFlvHeader=function(a,b,c){var d,e,f,g=new Uint8Array(9),h=new DataView(g.buffer);return a=a||0,b=void 0===b?!0:b,c=void 0===c?!0:c,h.setUint8(0,70),h.setUint8(1,76),h.setUint8(2,86),h.setUint8(3,1),h.setUint8(4,(b?4:0)|(c?1:0)),h.setUint32(5,g.byteLength),0>=a?(e=new Uint8Array(g.byteLength+4),e.set(g),e.set([0,0,0,0],g.byteLength),e):(d=new l(l.METADATA_TAG),d.pts=d.dts=0,d.writeMetaDataDouble(\"duration\",a),f=d.finalize().length,e=new Uint8Array(g.byteLength+f),e.set(g),e.set(h.byteLength,f),e)}},d.prototype=new k,b.exports=d},{\"../codecs/adts.js\":2,\"../codecs/h264\":3,\"../m2ts/m2ts.js\":11,\"../utils/stream.js\":20,\"./flv-tag.js\":5}],8:[function(a,b,c){\"use strict\";var d={codecs:a(\"./codecs\"),mp4:a(\"./mp4\"),flv:a(\"./flv\"),mp2t:a(\"./m2ts\")};b.exports=d},{\"./codecs\":4,\"./flv\":6,\"./m2ts\":10,\"./mp4\":14}],9:[function(a,b,c){\"use strict\";var d=4,e=128,f=a(\"../utils/stream\"),g=function(a){for(var b=0,c={payloadType:-1,payloadSize:0},f=0,g=0;b<a.byteLength&&a[b]!==e;){for(;255===a[b];)f+=255,b++;for(f+=a[b++];255===a[b];)g+=255,b++;if(g+=a[b++],!c.payload&&f===d){c.payloadType=f,c.payloadSize=g,c.payload=a.subarray(b,b+g);break}b+=g,f=0,g=0}return c},h=function(a){return 181!==a.payload[0]?null:49!==(a.payload[1]<<8|a.payload[2])?null:\"GA94\"!==String.fromCharCode(a.payload[3],a.payload[4],a.payload[5],a.payload[6])?null:3!==a.payload[7]?null:a.payload.subarray(8,a.payload.length-1)},i=function(a,b){var c,d,e,f,g=[];if(!(64&b[0]))return g;for(d=31&b[0],c=0;d>c;c++)e=3*c,f={type:3&b[e+2],pts:a},4&b[e+2]&&(f.ccData=b[e+3]<<8|b[e+4],g.push(f));return g},j=function(){j.prototype.init.call(this),this.captionPackets_=[],this.field1_=new y,this.field1_.on(\"data\",this.trigger.bind(this,\"data\")),this.field1_.on(\"done\",this.trigger.bind(this,\"done\"))};j.prototype=new f,j.prototype.push=function(a){var b,c;\"sei_rbsp\"===a.nalUnitType&&(b=g(a.escapedRBSP),b.payloadType===d&&(c=h(b),c&&(this.captionPackets_=this.captionPackets_.concat(i(a.pts,c)))))},j.prototype.flush=function(){return this.captionPackets_.length?(this.captionPackets_.sort(function(a,b){return a.pts-b.pts}),this.captionPackets_.forEach(this.field1_.push,this.field1_),this.captionPackets_.length=0,void this.field1_.flush()):void this.field1_.flush()};var k={42:225,92:233,94:237,95:243,96:250,123:231,124:247,125:209,126:241,127:9608},l=function(a){return null===a?\"\":(a=k[a]||a,String.fromCharCode(a))},m=0,n=5152,o=5167,p=5157,q=5158,r=5159,s=5165,t=5153,u=5164,v=5166,w=14,x=function(){for(var a=[],b=w+1;b--;)a.push(\"\");return a},y=function(){y.prototype.init.call(this),this.mode_=\"popOn\",this.topRow_=0,this.startPts_=0,this.displayed_=x(),this.nonDisplayed_=x(),this.lastControlCode_=null,this.push=function(a){if(0===a.type){var b,c,d,e;if(b=32639&a.ccData,b===this.lastControlCode_)return void(this.lastControlCode_=null);switch(4096===(61440&b)?this.lastControlCode_=b:this.lastControlCode_=null,b){case m:break;case n:this.mode_=\"popOn\";break;case o:this.flushDisplayed(a.pts),c=this.displayed_,this.displayed_=this.nonDisplayed_,this.nonDisplayed_=c,this.startPts_=a.pts;break;case p:this.topRow_=w-1,this.mode_=\"rollUp\";break;case q:this.topRow_=w-2,this.mode_=\"rollUp\";break;case r:this.topRow_=w-3,this.mode_=\"rollUp\";break;case s:this.flushDisplayed(a.pts),this.shiftRowsUp_(),this.startPts_=a.pts;break;case t:\"popOn\"===this.mode_?this.nonDisplayed_[w]=this.nonDisplayed_[w].slice(0,-1):this.displayed_[w]=this.displayed_[w].slice(0,-1);break;case u:this.flushDisplayed(a.pts),this.displayed_=x();break;case v:this.nonDisplayed_=x();break;default:if(d=b>>>8,e=255&b,d>=16&&23>=d&&e>=64&&127>=e&&(16!==d||96>e)&&(d=32,e=null),(17===d||25===d)&&e>=48&&63>=e&&(d=14850474,e=\"\"),16===(240&d))return;this[this.mode_](a.pts,d,e)}}}};y.prototype=new f,y.prototype.flushDisplayed=function(a){var b,c;for(c=0;c<this.displayed_.length;c++)b=this.displayed_[c],b.length&&this.trigger(\"data\",{startPts:this.startPts_,endPts:a,text:b.trim()})},y.prototype.popOn=function(a,b,c){var d=this.nonDisplayed_[w];d+=l(b),d+=l(c),this.nonDisplayed_[w]=d},y.prototype.rollUp=function(a,b,c){var d=this.displayed_[w];\"\"===d&&(this.flushDisplayed(a),this.startPts_=a),d+=l(b),d+=l(c),this.displayed_[w]=d},y.prototype.shiftRowsUp_=function(){var a;for(a=0;a<this.topRow_;a++)this.displayed_[a]=\"\";for(a=this.topRow_;w>a;a++)this.displayed_[a]=this.displayed_[a+1];this.displayed_[w]=\"\"},b.exports={CaptionStream:j,Cea608Stream:y}},{\"../utils/stream\":20}],10:[function(a,b,c){b.exports=a(\"./m2ts\")},{\"./m2ts\":11}],11:[function(a,b,c){\"use strict\";var d,e,f,g=a(\"../utils/stream.js\"),h=a(\"./caption-stream\"),i=a(\"./stream-types\"),g=a(\"../utils/stream.js\"),j=a(\"./stream-types.js\"),k=188,l=71,d=function(){var a=new Uint8Array(k),b=0;d.prototype.init.call(this),this.push=function(c){var d,e=0,f=k;for(b?(d=new Uint8Array(c.byteLength+b),d.set(a.subarray(0,b)),d.set(c,b),b=0):d=c;f<d.byteLength;)d[e]!==l||d[f]!==l?(e++,f++):(this.trigger(\"data\",d.subarray(e,f)),e+=k,f+=k);e<d.byteLength&&(a.set(d.subarray(e),0),b=d.byteLength-e)},this.flush=function(){b===k&&a[0]===l&&(this.trigger(\"data\",a),b=0),this.trigger(\"done\")}};d.prototype=new g,e=function(){var a,b,c,d;e.prototype.init.call(this),d=this,this.packetsWaitingForPmt=[],this.programMapTable=void 0,a=function(a,d){var e=0;d.payloadUnitStartIndicator&&(e+=a[e]+1),\"pat\"===d.type?b(a.subarray(e),d):c(a.subarray(e),d)},b=function(a,b){b.section_number=a[7],b.last_section_number=a[8],d.pmtPid=(31&a[10])<<8|a[11],b.pmtPid=d.pmtPid},c=function(a,b){var c,e,f,g;if(1&a[5]){for(d.programMapTable={},c=(15&a[1])<<8|a[2],e=3+c-4,f=(15&a[10])<<8|a[11],g=12+f;e>g;)d.programMapTable[(31&a[g+1])<<8|a[g+2]]=a[g],g+=((15&a[g+3])<<8|a[g+4])+5;for(b.programMapTable=d.programMapTable;d.packetsWaitingForPmt.length;)d.processPes_.apply(d,d.packetsWaitingForPmt.shift())}},this.push=function(b){var c={},d=4;c.payloadUnitStartIndicator=!!(64&b[1]),c.pid=31&b[1],c.pid<<=8,c.pid|=b[2],(48&b[3])>>>4>1&&(d+=b[d]+1),0===c.pid?(c.type=\"pat\",a(b.subarray(d),c),this.trigger(\"data\",c)):c.pid===this.pmtPid?(c.type=\"pmt\",a(b.subarray(d),c),this.trigger(\"data\",c)):void 0===this.programMapTable?this.packetsWaitingForPmt.push([b,d,c]):this.processPes_(b,d,c)},this.processPes_=function(a,b,c){c.streamType=this.programMapTable[c.pid],c.type=\"pes\",c.data=a.subarray(b),this.trigger(\"data\",c)}},e.prototype=new g,e.STREAM_TYPES={h264:27,adts:15},f=function(){var a,b={data:[],size:0},c={data:[],size:0},d={data:[],size:0},e=function(a,b){var c;b.dataAlignmentIndicator=0!==(4&a[6]),c=a[7],192&c&&(b.pts=(14&a[9])<<27|(255&a[10])<<20|(254&a[11])<<12|(255&a[12])<<5|(254&a[13])>>>3,b.pts*=4,b.pts+=(6&a[13])>>>1,b.dts=b.pts,64&c&&(b.dts=(14&a[14])<<27|(255&a[15])<<20|(254&a[16])<<12|(255&a[17])<<5|(254&a[18])>>>3,b.dts*=4,b.dts+=(6&a[18])>>>1)),b.data=a.subarray(9+a[8])},g=function(b,c){var d,f=new Uint8Array(b.size),g={type:c},h=0;if(b.data.length){for(g.trackId=b.data[0].pid;b.data.length;)d=b.data.shift(),f.set(d.data,h),h+=d.data.byteLength;e(f,g),b.size=0,a.trigger(\"data\",g)}};f.prototype.init.call(this),a=this,this.push=function(e){({pat:function(){},pes:function(){var a,f;switch(e.streamType){case i.H264_STREAM_TYPE:case j.H264_STREAM_TYPE:a=b,f=\"video\";break;case i.ADTS_STREAM_TYPE:a=c,f=\"audio\";break;case i.METADATA_STREAM_TYPE:a=d,f=\"timed-metadata\";break;default:return}e.payloadUnitStartIndicator&&g(a,f),a.data.push(e),a.size+=e.data.byteLength},pmt:function(){var b,c,d={type:\"metadata\",tracks:[]},f=e.programMapTable;for(b in f)f.hasOwnProperty(b)&&(c={timelineStartInfo:{baseMediaDecodeTime:0}},c.id=+b,f[b]===j.H264_STREAM_TYPE?(c.codec=\"avc\",c.type=\"video\"):f[b]===j.ADTS_STREAM_TYPE&&(c.codec=\"adts\",c.type=\"audio\"),d.tracks.push(c));a.trigger(\"data\",d)}})[e.type]()},this.flush=function(){g(b,\"video\"),g(c,\"audio\"),g(d,\"timed-metadata\"),this.trigger(\"done\")}},f.prototype=new g;var m={PAT_PID:0,MP2T_PACKET_LENGTH:k,TransportPacketStream:d,TransportParseStream:e,ElementaryStream:f,CaptionStream:h.CaptionStream,Cea608Stream:h.Cea608Stream,MetadataStream:a(\"./metadata-stream\")};for(var n in i)i.hasOwnProperty(n)&&(m[n]=i[n]);b.exports=m},{\"../utils/stream.js\":20,\"./caption-stream\":9,\"./metadata-stream\":12,\"./stream-types\":13,\"./stream-types.js\":13}],12:[function(a,b,c){\"use strict\";var d,e=a(\"../utils/stream\"),f=a(\"./stream-types\"),g=function(a,b,c){var d,e=\"\";for(d=b;c>d;d++)e+=\"%\"+(\"00\"+a[d].toString(16)).slice(-2);return e},h=function(a,b,c){return decodeURIComponent(g(a,b,c))},i=function(a,b,c){return unescape(g(a,b,c))},j=function(a){return a[0]<<21|a[1]<<14|a[2]<<7|a[3]},k={TXXX:function(a){var b;if(3===a.data[0]){for(b=1;b<a.data.length;b++)if(0===a.data[b]){a.description=h(a.data,1,b),a.value=h(a.data,b+1,a.data.length-1);break}a.data=a.value}},WXXX:function(a){var b;if(3===a.data[0])for(b=1;b<a.data.length;b++)if(0===a.data[b]){a.description=h(a.data,1,b),a.url=h(a.data,b+1,a.data.length);break}},PRIV:function(a){var b;for(b=0;b<a.data.length;b++)if(0===a.data[b]){a.owner=i(a.data,0,b);break}a.privateData=a.data.subarray(b+1),a.data=a.privateData}};d=function(a){var b,c={debug:!(!a||!a.debug),descriptor:a&&a.descriptor},e=0,g=[],h=0;if(d.prototype.init.call(this),this.dispatchType=f.METADATA_STREAM_TYPE.toString(16),c.descriptor)for(b=0;b<c.descriptor.length;b++)this.dispatchType+=(\"00\"+c.descriptor[b].toString(16)).slice(-2);this.push=function(a){var b,d,f,i,l,m;if(\"timed-metadata\"===a.type){if(a.dataAlignmentIndicator&&(h=0,g.length=0),0===g.length&&(a.data.length<10||a.data[0]!==\"I\".charCodeAt(0)||a.data[1]!==\"D\".charCodeAt(0)||a.data[2]!==\"3\".charCodeAt(0)))return void(c.debug&&console.log(\"Skipping unrecognized metadata packet\"));if(g.push(a),h+=a.data.byteLength,1===g.length&&(e=j(a.data.subarray(6,10)),e+=10),!(e>h)){for(b={data:new Uint8Array(e),frames:[],pts:g[0].pts,dts:g[0].dts},l=0;e>l;)b.data.set(g[0].data.subarray(0,e-l),l),l+=g[0].data.byteLength,h-=g[0].data.byteLength,g.shift();d=10,64&b.data[5]&&(d+=4,d+=j(b.data.subarray(10,14)),e-=j(b.data.subarray(16,20)));do{if(f=j(b.data.subarray(d+4,d+8)),1>f)return console.log(\"Malformed ID3 frame encountered. Skipping metadata parsing.\");if(m=String.fromCharCode(b.data[d],b.data[d+1],b.data[d+2],b.data[d+3]),i={id:m,data:b.data.subarray(d+10,d+f+10)},i.key=i.id,k[i.id]&&(k[i.id](i),\"com.apple.streaming.transportStreamTimestamp\"===i.owner)){var n=i.data,o=(1&n[3])<<30|n[4]<<22|n[5]<<14|n[6]<<6|n[7]>>>2;o*=4,o+=3&n[7],i.timeStamp=o,this.trigger(\"timestamp\",i)}b.frames.push(i),d+=10,d+=f}while(e>d);this.trigger(\"data\",b)}}}},d.prototype=new e,b.exports=d},{\"../utils/stream\":20,\"./stream-types\":13}],13:[function(a,b,c){\"use strict\";b.exports={H264_STREAM_TYPE:27,ADTS_STREAM_TYPE:15,METADATA_STREAM_TYPE:21}},{}],14:[function(a,b,c){b.exports={generator:a(\"./mp4-generator\"),Transmuxer:a(\"./transmuxer\").Transmuxer,AudioSegmentStream:a(\"./transmuxer\").AudioSegmentStream,VideoSegmentStream:a(\"./transmuxer\").VideoSegmentStream,tools:a(\"../tools/mp4-inspector\")}},{\"../tools/mp4-inspector\":18,\"./mp4-generator\":15,\"./transmuxer\":16}],15:[function(a,b,c){\"use strict\";var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N;!function(){var a;A={avc1:[],avcC:[],btrt:[],dinf:[],dref:[],esds:[],ftyp:[],hdlr:[],mdat:[],mdhd:[],mdia:[],mfhd:[],minf:[],moof:[],moov:[],mp4a:[],mvex:[],mvhd:[],sdtp:[],smhd:[],stbl:[],stco:[],stsc:[],stsd:[],stsz:[],stts:[],styp:[],tfdt:[],tfhd:[],traf:[],trak:[],trun:[],trex:[],tkhd:[],vmhd:[]};for(a in A)A.hasOwnProperty(a)&&(A[a]=[a.charCodeAt(0),a.charCodeAt(1),a.charCodeAt(2),a.charCodeAt(3)]);B=new Uint8Array([\"i\".charCodeAt(0),\"s\".charCodeAt(0),\"o\".charCodeAt(0),\"m\".charCodeAt(0)]),D=new Uint8Array([\"a\".charCodeAt(0),\"v\".charCodeAt(0),\"c\".charCodeAt(0),\"1\".charCodeAt(0)]),C=new Uint8Array([0,0,0,1]),E=new Uint8Array([0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0]),F=new Uint8Array([0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0]),G={video:E,audio:F},J=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1]),I=new Uint8Array([0,0,0,0,0,0,0,0]),K=new Uint8Array([0,0,0,0,0,0,0,0]),L=K,M=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]),N=K,H=new Uint8Array([0,0,0,1,0,0,0,0,0,0,0,0])}(),d=function(a){var b,c,d,e=[],f=0;for(b=1;b<arguments.length;b++)e.push(arguments[b]);for(b=e.length;b--;)f+=e[b].byteLength;for(c=new Uint8Array(f+8),d=new DataView(c.buffer,c.byteOffset,c.byteLength),d.setUint32(0,c.byteLength),c.set(a,4),b=0,f=8;b<e.length;b++)c.set(e[b],f),f+=e[b].byteLength;return c},e=function(){return d(A.dinf,d(A.dref,J))},f=function(a){return d(A.esds,new Uint8Array([0,0,0,0,3,25,0,0,0,4,17,64,21,0,6,0,0,0,218,192,0,0,218,192,5,2,a.audioobjecttype<<3|a.samplingfrequencyindex>>>1,a.samplingfrequencyindex<<7|a.channelcount<<3,6,1,2]))},g=function(){return d(A.ftyp,B,C,B,D)},s=function(a){return d(A.hdlr,G[a])},h=function(a){return d(A.mdat,a)},r=function(a){var b=new Uint8Array([0,0,0,0,0,0,0,2,0,0,0,3,0,1,95,144,a.duration>>>24&255,a.duration>>>16&255,a.duration>>>8&255,255&a.duration,85,196,0,0]);return a.samplerate&&(b[12]=a.samplerate>>>24&255,b[13]=a.samplerate>>>16&255,b[14]=a.samplerate>>>8&255,b[15]=255&a.samplerate),d(A.mdhd,b)},q=function(a){return d(A.mdia,r(a),s(a.type),j(a))},i=function(a){return d(A.mfhd,new Uint8Array([0,0,0,0,(4278190080&a)>>24,(16711680&a)>>16,(65280&a)>>8,255&a]))},j=function(a){return d(A.minf,\"video\"===a.type?d(A.vmhd,H):d(A.smhd,I),e(),u(a))},k=function(a,b){for(var c=[],e=b.length;e--;)c[e]=x(b[e]);return d.apply(null,[A.moof,i(a)].concat(c))},l=function(a){for(var b=a.length,c=[];b--;)c[b]=o(a[b]);return d.apply(null,[A.moov,n(4294967295)].concat(c).concat(m(a)))},m=function(a){for(var b=a.length,c=[];b--;)c[b]=y(a[b]);return d.apply(null,[A.mvex].concat(c))},n=function(a){var b=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,2,0,1,95,144,(4278190080&a)>>24,(16711680&a)>>16,(65280&a)>>8,255&a,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255]);return d(A.mvhd,b)},t=function(a){var b,c,e=a.samples||[],f=new Uint8Array(4+e.length);for(c=0;c<e.length;c++)b=e[c].flags,f[c+4]=b.dependsOn<<4|b.isDependedOn<<2|b.hasRedundancy;return d(A.sdtp,f)},u=function(a){return d(A.stbl,v(a),d(A.stts,N),d(A.stsc,L),d(A.stsz,M),d(A.stco,K))},function(){var a,b;v=function(c){return d(A.stsd,new Uint8Array([0,0,0,0,0,0,0,1]),\"video\"===c.type?a(c):b(c))},a=function(a){var b,c=a.sps||[],e=a.pps||[],f=[],g=[];for(b=0;b<c.length;b++)f.push((65280&c[b].byteLength)>>>8),f.push(255&c[b].byteLength),f=f.concat(Array.prototype.slice.call(c[b]));for(b=0;b<e.length;b++)g.push((65280&e[b].byteLength)>>>8),g.push(255&e[b].byteLength),g=g.concat(Array.prototype.slice.call(e[b]));return d(A.avc1,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,(65280&a.width)>>8,255&a.width,(65280&a.height)>>8,255&a.height,0,72,0,0,0,72,0,0,0,0,0,0,0,1,19,118,105,100,101,111,106,115,45,99,111,110,116,114,105,98,45,104,108,115,0,0,0,0,0,0,0,0,0,0,0,0,0,24,17,17]),d(A.avcC,new Uint8Array([1,a.profileIdc,a.profileCompatibility,a.levelIdc,255].concat([c.length]).concat(f).concat([e.length]).concat(g))),d(A.btrt,new Uint8Array([0,28,156,128,0,45,198,192,0,45,198,192])))},b=function(a){return d(A.mp4a,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,(65280&a.channelcount)>>8,255&a.channelcount,(65280&a.samplesize)>>8,255&a.samplesize,0,0,0,0,(65280&a.samplerate)>>8,255&a.samplerate,0,0]),f(a))}}(),w=function(){return d(A.styp,B,C,B)},p=function(a){var b=new Uint8Array([0,0,0,7,0,0,0,0,0,0,0,0,(4278190080&a.id)>>24,(16711680&a.id)>>16,(65280&a.id)>>8,255&a.id,0,0,0,0,(4278190080&a.duration)>>24,(16711680&a.duration)>>16,(65280&a.duration)>>8,255&a.duration,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,(65280&a.width)>>8,255&a.width,0,0,(65280&a.height)>>8,255&a.height,0,0]);\nreturn d(A.tkhd,b)},x=function(a){var b,c,e,f,g;return b=d(A.tfhd,new Uint8Array([0,0,0,58,(4278190080&a.id)>>24,(16711680&a.id)>>16,(65280&a.id)>>8,255&a.id,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0])),c=d(A.tfdt,new Uint8Array([0,0,0,0,a.baseMediaDecodeTime>>>24&255,a.baseMediaDecodeTime>>>16&255,a.baseMediaDecodeTime>>>8&255,255&a.baseMediaDecodeTime])),g=88,\"audio\"===a.type?(e=z(a,g),d(A.traf,b,c,e)):(f=t(a),e=z(a,f.length+g),d(A.traf,b,c,e,f))},o=function(a){return a.duration=a.duration||4294967295,d(A.trak,p(a),q(a))},y=function(a){var b=new Uint8Array([0,0,0,0,(4278190080&a.id)>>24,(16711680&a.id)>>16,(65280&a.id)>>8,255&a.id,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1]);return\"video\"!==a.type&&(b[b.length-1]=0),d(A.trex,b)},function(){var a,b,c;c=function(a,b){var c=0,d=0,e=0,f=0;return a.length&&(void 0!==a[0].duration&&(c=1),void 0!==a[0].size&&(d=2),void 0!==a[0].flags&&(e=4),void 0!==a[0].compositionTimeOffset&&(f=8)),[0,0,c|d|e|f,1,(4278190080&a.length)>>>24,(16711680&a.length)>>>16,(65280&a.length)>>>8,255&a.length,(4278190080&b)>>>24,(16711680&b)>>>16,(65280&b)>>>8,255&b]},b=function(a,b){var e,f,g,h;for(f=a.samples||[],b+=20+16*f.length,e=c(f,b),h=0;h<f.length;h++)g=f[h],e=e.concat([(4278190080&g.duration)>>>24,(16711680&g.duration)>>>16,(65280&g.duration)>>>8,255&g.duration,(4278190080&g.size)>>>24,(16711680&g.size)>>>16,(65280&g.size)>>>8,255&g.size,g.flags.isLeading<<2|g.flags.dependsOn,g.flags.isDependedOn<<6|g.flags.hasRedundancy<<4|g.flags.paddingValue<<1|g.flags.isNonSyncSample,61440&g.flags.degradationPriority,15&g.flags.degradationPriority,(4278190080&g.compositionTimeOffset)>>>24,(16711680&g.compositionTimeOffset)>>>16,(65280&g.compositionTimeOffset)>>>8,255&g.compositionTimeOffset]);return d(A.trun,new Uint8Array(e))},a=function(a,b){var e,f,g,h;for(f=a.samples||[],b+=20+8*f.length,e=c(f,b),h=0;h<f.length;h++)g=f[h],e=e.concat([(4278190080&g.duration)>>>24,(16711680&g.duration)>>>16,(65280&g.duration)>>>8,255&g.duration,(4278190080&g.size)>>>24,(16711680&g.size)>>>16,(65280&g.size)>>>8,255&g.size]);return d(A.trun,new Uint8Array(e))},z=function(c,d){return\"audio\"===c.type?a(c,d):b(c,d)}}(),b.exports={ftyp:g,mdat:h,moof:k,moov:l,initSegment:function(a){var b,c=g(),d=l(a);return b=new Uint8Array(c.byteLength+d.byteLength),b.set(c),b.set(d,c.byteLength),b}}},{}],16:[function(a,b,c){\"use strict\";var d,e,f,g,h,i,j,k=a(\"../utils/stream.js\"),l=a(\"./mp4-generator.js\"),m=a(\"../m2ts/m2ts.js\"),n=a(\"../codecs/adts.js\"),o=a(\"../codecs/h264\").H264Stream,p=a(\"../aac\");e=function(a){var b=[],c=0,d=0,f=0;e.prototype.init.call(this),this.push=function(d){h(a,d),a&&(a.audioobjecttype=d.audioobjecttype,a.channelcount=d.channelcount,a.samplerate=d.samplerate,a.samplingfrequencyindex=d.samplingfrequencyindex,a.samplesize=d.samplesize),b.push(d),c+=d.data.byteLength},this.setEarliestDts=function(b){f=b-a.timelineStartInfo.baseMediaDecodeTime},this.flush=function(){var e,g,h,k,m,n,o;if(0===c)return void this.trigger(\"done\");for(a.minSegmentDts<f&&(a.minSegmentDts=1/0,b=b.filter(function(b){return b.dts>=f?(a.minSegmentDts=Math.min(a.minSegmentDts,b.dts),a.minSegmentPts=a.minSegmentDts,!0):(c-=b.data.byteLength,!1)})),h=new Uint8Array(c),a.samples=[],m=0;b.length;)g=b[0],k={size:g.data.byteLength,duration:1024},a.samples.push(k),h.set(g.data,m),m+=g.data.byteLength,b.shift();c=0,n=l.mdat(h),j(a),o=l.moof(d,[a]),e=new Uint8Array(o.byteLength+n.byteLength),d++,e.set(o),e.set(n,o.byteLength),i(a),this.trigger(\"data\",{track:a,boxes:e}),this.trigger(\"done\")}},e.prototype=new k,d=function(a){var b,c,e=0,f=[],g=0;d.prototype.init.call(this),delete a.minPTS,this.push=function(d){h(a,d),\"seq_parameter_set_rbsp\"!==d.nalUnitType||b||(b=d.config,a.width=b.width,a.height=b.height,a.sps=[d.data],a.profileIdc=b.profileIdc,a.levelIdc=b.levelIdc,a.profileCompatibility=b.profileCompatibility),\"pic_parameter_set_rbsp\"!==d.nalUnitType||c||(c=d.data,a.pps=[d.data]),f.push(d),g+=d.data.byteLength},this.flush=function(){for(var d,h,k,m,n,o,p,q,r,s;f.length&&\"access_unit_delimiter_rbsp\"!==f[0].nalUnitType;)f.shift();if(0===g)return void this.trigger(\"done\");for(p=new Uint8Array(g+4*f.length),q=new DataView(p.buffer),a.samples=[],r={size:0,flags:{isLeading:0,dependsOn:1,isDependedOn:0,hasRedundancy:0,degradationPriority:0}},o=0;f.length;)h=f[0],\"access_unit_delimiter_rbsp\"===h.nalUnitType&&(d&&(r.duration=h.dts-d.dts,a.samples.push(r)),r={size:0,flags:{isLeading:0,dependsOn:1,isDependedOn:0,hasRedundancy:0,degradationPriority:0},dataOffset:o,compositionTimeOffset:h.pts-h.dts},d=h),\"slice_layer_without_partitioning_rbsp_idr\"===h.nalUnitType&&(r.flags.dependsOn=2),r.size+=4,r.size+=h.data.byteLength,q.setUint32(o,h.data.byteLength),o+=4,p.set(h.data,o),o+=h.data.byteLength,f.shift();for(a.samples.length&&(r.duration=a.samples[a.samples.length-1].duration),a.samples.push(r),s=0;a.samples.length;){if(r=a.samples[0],2===r.flags.dependsOn){p=p.subarray(r.dataOffset),r.duration+=s;break}s+=r.duration,a.samples.shift()}g=0,m=l.mdat(p),j(a),this.trigger(\"timelineStartInfo\",a.timelineStartInfo),k=l.moof(e,[a]),n=new Uint8Array(k.byteLength+m.byteLength),e++,n.set(k),n.set(m,k.byteLength),i(a),this.trigger(\"data\",{track:a,boxes:n}),b=void 0,c=void 0,this.trigger(\"done\")}},d.prototype=new k,h=function(a,b){\"number\"==typeof b.pts&&(void 0===a.timelineStartInfo.pts&&(a.timelineStartInfo.pts=b.pts),void 0===a.minSegmentPts?a.minSegmentPts=b.pts:a.minSegmentPts=Math.min(a.minSegmentPts,b.pts),void 0===a.maxSegmentPts?a.maxSegmentPts=b.pts:a.maxSegmentPts=Math.max(a.maxSegmentPts,b.pts)),\"number\"==typeof b.dts&&(void 0===a.timelineStartInfo.dts&&(a.timelineStartInfo.dts=b.dts),void 0===a.minSegmentDts?a.minSegmentDts=b.dts:a.minSegmentDts=Math.min(a.minSegmentDts,b.dts),void 0===a.maxSegmentDts?a.maxSegmentDts=b.dts:a.maxSegmentDts=Math.max(a.maxSegmentDts,b.dts))},i=function(a){delete a.minSegmentDts,delete a.maxSegmentDts,delete a.minSegmentPts,delete a.maxSegmentPts},j=function(a){var b,c=9e4,d=a.minSegmentDts-a.timelineStartInfo.dts,e=a.minSegmentPts-a.minSegmentDts;a.baseMediaDecodeTime=a.timelineStartInfo.baseMediaDecodeTime,a.baseMediaDecodeTime+=d,a.baseMediaDecodeTime-=e,a.baseMediaDecodeTime=Math.max(0,a.baseMediaDecodeTime),\"audio\"===a.type&&(b=a.samplerate/c,a.baseMediaDecodeTime*=b,a.baseMediaDecodeTime=Math.floor(a.baseMediaDecodeTime))},g=function(a){this.numberOfTracks=0,this.metadataStream=a.metadataStream,\"undefined\"!=typeof a.remux?this.remuxTracks=!!a.remux:this.remuxTracks=!0,this.pendingTracks=[],this.videoTrack=null,this.pendingBoxes=[],this.pendingCaptions=[],this.pendingMetadata=[],this.pendingBytes=0,this.emittedTracks=0,g.prototype.init.call(this),this.push=function(a){return a.text?this.pendingCaptions.push(a):a.frames?this.pendingMetadata.push(a):(this.pendingTracks.push(a.track),this.pendingBoxes.push(a.boxes),this.pendingBytes+=a.boxes.byteLength,\"video\"===a.track.type&&(this.videoTrack=a.track),void(\"audio\"===a.track.type&&(this.audioTrack=a.track)))}},g.prototype=new k,g.prototype.flush=function(){var a,b,c,d,e=0,f={captions:[],metadata:[]},g=0;if(!(0===this.pendingTracks.length||this.remuxTracks&&this.pendingTracks.length<this.numberOfTracks)){for(this.videoTrack?g=this.videoTrack.timelineStartInfo.pts:this.audioTrack&&(g=this.audioTrack.timelineStartInfo.pts),1===this.pendingTracks.length?f.type=this.pendingTracks[0].type:f.type=\"combined\",this.emittedTracks+=this.pendingTracks.length,c=l.initSegment(this.pendingTracks),f.data=new Uint8Array(c.byteLength+this.pendingBytes),f.data.set(c),e+=c.byteLength,d=0;d<this.pendingBoxes.length;d++)f.data.set(this.pendingBoxes[d],e),e+=this.pendingBoxes[d].byteLength;for(d=0;d<this.pendingCaptions.length;d++)a=this.pendingCaptions[d],a.startTime=a.startPts-g,a.startTime/=9e4,a.endTime=a.endPts-g,a.endTime/=9e4,f.captions.push(a);for(d=0;d<this.pendingMetadata.length;d++)b=this.pendingMetadata[d],b.cueTime=b.pts-g,b.cueTime/=9e4,f.metadata.push(b);f.metadata.dispatchType=this.metadataStream.dispatchType,this.pendingTracks.length=0,this.videoTrack=null,this.pendingBoxes.length=0,this.pendingCaptions.length=0,this.pendingBytes=0,this.pendingMetadata.length=0,this.trigger(\"data\",f),this.emittedTracks>=this.numberOfTracks&&(this.trigger(\"done\"),this.emittedTracks=0)}},f=function(a){var b,c,h,j,k,l,q,r,s,t,u,v,w,x=this;this.setupAacPipeline=function(){this.metadataStream=new m.MetadataStream,a.metadataStream=this.metadataStream,r=new p,l=new n,v=new g(a),w=r,r.pipe(l),r.pipe(this.metadataStream),this.metadataStream.pipe(v),this.metadataStream.on(\"timestamp\",function(a){r.setTimestamp(a.timestamp)}),this.addAacListener()},this.addAacListener=function(){r.on(\"data\",function(a){if(\"timed-metadata\"===a.type){var b={timelineStartInfo:{baseMediaDecodeTime:0},codec:\"adts\",type:\"audio\"};b&&!t&&(v.numberOfTracks++,t=new e(b),l.pipe(t).pipe(v))}})},this.setupTsPipeline=function(){this.metadataStream=new m.MetadataStream,a.metadataStream=this.metadataStream,h=new m.TransportPacketStream,j=new m.TransportParseStream,k=new m.ElementaryStream,l=new n,q=new o,u=new m.CaptionStream,v=new g(a),w=h,h.pipe(j).pipe(k),k.pipe(q),k.pipe(l),k.pipe(this.metadataStream).pipe(v),q.pipe(u).pipe(v),this.addTsListener()},this.addTsListener=function(){k.on(\"data\",function(a){var f;if(\"metadata\"===a.type){for(f=a.tracks.length;f--;)b||\"video\"!==a.tracks[f].type?c||\"audio\"!==a.tracks[f].type||(c=a.tracks[f],c.timelineStartInfo.baseMediaDecodeTime=x.baseMediaDecodeTime):(b=a.tracks[f],b.timelineStartInfo.baseMediaDecodeTime=x.baseMediaDecodeTime);b&&!s&&(v.numberOfTracks++,s=new d(b),s.on(\"timelineStartInfo\",function(a){c&&(c.timelineStartInfo=a,t.setEarliestDts(a.dts))}),q.pipe(s).pipe(v)),c&&!t&&(v.numberOfTracks++,t=new e(c),l.pipe(t).pipe(v))}})},f.prototype.init.call(this),a=a||{},this.baseMediaDecodeTime=a.baseMediaDecodeTime||0,void 0===a.aacfile?this.setupTsPipeline():this.setupAacPipeline(),this.setBaseMediaDecodeTime=function(a){this.baseMediaDecodeTime=a,c&&(c.timelineStartInfo.dts=void 0,c.timelineStartInfo.pts=void 0,i(c),c.timelineStartInfo.baseMediaDecodeTime=a),b&&(b.timelineStartInfo.dts=void 0,b.timelineStartInfo.pts=void 0,i(b),b.timelineStartInfo.baseMediaDecodeTime=a)},this.push=function(a){w.push(a)},this.flush=function(){w.flush()},v.on(\"data\",function(a){x.trigger(\"data\",a)}),v.on(\"done\",function(){x.trigger(\"done\")})},f.prototype=new k,b.exports={Transmuxer:f,VideoSegmentStream:d,AudioSegmentStream:e}},{\"../aac\":1,\"../codecs/adts.js\":2,\"../codecs/h264\":3,\"../m2ts/m2ts.js\":11,\"../utils/stream.js\":20,\"./mp4-generator.js\":15}],17:[function(a,b,c){\"use strict\";var d={8:\"audio\",9:\"video\",18:\"metadata\"},e=function(a){return\"0x\"+(\"00\"+a.toString(16)).slice(-2).toUpperCase()},f=function(a){for(var b,c=[];a.byteLength>0;){switch(b=0,a.byteLength){default:c.push(e(a[b++]));case 7:c.push(e(a[b++]));case 6:c.push(e(a[b++]));case 5:c.push(e(a[b++]));case 4:c.push(e(a[b++]));case 3:c.push(e(a[b++]));case 2:c.push(e(a[b++]));case 1:c.push(e(a[b++]))}a=a.subarray(b)}return c.join(\" \")},g=function(a,b){var c=[\"AVC Sequence Header\",\"AVC NALU\",\"AVC End-of-Sequence\"],d=a[1]&parseInt(\"01111111\",2)<<16|a[2]<<8|a[3];return b=b||{},b.avcPacketType=c[a[0]],b.CompositionTime=a[1]&parseInt(\"10000000\",2)?-d:d,1===a[0]?b.nalUnitTypeRaw=f(a.subarray(4,100)):b.data=f(a.subarray(4)),b},h=function(a,b){var c=[\"Unknown\",\"Keyframe (for AVC, a seekable frame)\",\"Inter frame (for AVC, a nonseekable frame)\",\"Disposable inter frame (H.263 only)\",\"Generated keyframe (reserved for server use only)\",\"Video info/command frame\"],d=a[0]&parseInt(\"00001111\",2);return b=b||{},b.frameType=c[(a[0]&parseInt(\"11110000\",2))>>>4],b.codecID=d,7===d?g(a.subarray(1),b):b},i=function(a,b){var c=[\"AAC Sequence Header\",\"AAC Raw\"];return b=b||{},b.aacPacketType=c[a[0]],b.data=f(a.subarray(1)),b},j=function(a,b){var c=[\"Linear PCM, platform endian\",\"ADPCM\",\"MP3\",\"Linear PCM, little endian\",\"Nellymoser 16-kHz mono\",\"Nellymoser 8-kHz mono\",\"Nellymoser\",\"G.711 A-law logarithmic PCM\",\"G.711 mu-law logarithmic PCM\",\"reserved\",\"AAC\",\"Speex\",\"MP3 8-Khz\",\"Device-specific sound\"],d=[\"5.5-kHz\",\"11-kHz\",\"22-kHz\",\"44-kHz\"],e=(a[0]&parseInt(\"11110000\",2))>>>4;return b=b||{},b.soundFormat=c[e],b.soundRate=d[(a[0]&parseInt(\"00001100\",2))>>>2],b.soundSize=(a[0]&parseInt(\"00000010\",2))>>>1?\"16-bit\":\"8-bit\",b.soundType=a[0]&parseInt(\"00000001\",2)?\"Stereo\":\"Mono\",10===e?i(a.subarray(1),b):b},k=function(a){return{tagType:d[a[0]],dataSize:a[1]<<16|a[2]<<8|a[3],timestamp:a[7]<<24|a[4]<<16|a[5]<<8|a[6],streamID:a[8]<<16|a[9]<<8|a[10]}},l=function(a){var b=k(a);switch(a[0]){case 8:j(a.subarray(11),b);break;case 9:h(a.subarray(11),b);break;case 18:}return b},m=function(a){var b,c,d=9,e=[];for(d+=4;d<a.byteLength;)b=a[d+1]<<16,b|=a[d+2]<<8,b|=a[d+3],b+=11,c=a.subarray(d,d+b),e.push(l(c)),d+=b+4;return e},n=function(a){return JSON.stringify(a,null,2)};b.exports={inspectTag:l,inspect:m,textify:n}},{}],18:[function(a,b,c){(function(a){\"use strict\";var c,d,e=function(a){var b=\"\";return b+=String.fromCharCode(a[0]),b+=String.fromCharCode(a[1]),b+=String.fromCharCode(a[2]),b+=String.fromCharCode(a[3])},f=function(a){return new Date(1e3*a-20828448e5)},g=function(a){return{isLeading:(12&a[0])>>>2,dependsOn:3&a[0],isDependedOn:(192&a[1])>>>6,hasRedundancy:(48&a[1])>>>4,paddingValue:(14&a[1])>>>1,isNonSyncSample:1&a[1],degradationPriority:a[2]<<8|a[3]}},h=function(a){var b,c,d=new DataView(a.buffer,a.byteOffset,a.byteLength),e=[];for(b=0;b+4<a.length;b+=c){if(c=d.getUint32(b),b+=4,0>=c)return;switch(31&a[b]){case 1:e.push(\"slice_layer_without_partitioning_rbsp\");break;case 5:e.push(\"slice_layer_without_partitioning_rbsp_idr\");break;case 6:e.push(\"sei_rbsp\");break;case 7:e.push(\"seq_parameter_set_rbsp\");break;case 8:e.push(\"pic_parameter_set_rbsp\");break;case 9:e.push(\"access_unit_delimiter_rbsp\");break;default:e.push(31&a[b])}}return e},i={avc1:function(a){var b=new DataView(a.buffer,a.byteOffset,a.byteLength);return{dataReferenceIndex:b.getUint16(6),width:b.getUint16(24),height:b.getUint16(26),horizresolution:b.getUint16(28)+b.getUint16(30)/16,vertresolution:b.getUint16(32)+b.getUint16(34)/16,frameCount:b.getUint16(40),depth:b.getUint16(74),config:c(a.subarray(78,a.byteLength))}},avcC:function(a){var b,c,d,e,f=new DataView(a.buffer,a.byteOffset,a.byteLength),g={configurationVersion:a[0],avcProfileIndication:a[1],profileCompatibility:a[2],avcLevelIndication:a[3],lengthSizeMinusOne:3&a[4],sps:[],pps:[]},h=31&a[5];for(d=6,e=0;h>e;e++)c=f.getUint16(d),d+=2,g.sps.push(new Uint8Array(a.subarray(d,d+c))),d+=c;for(b=a[d],d++,e=0;b>e;e++)c=f.getUint16(d),d+=2,g.pps.push(new Uint8Array(a.subarray(d,d+c))),d+=c;return g},btrt:function(a){var b=new DataView(a.buffer,a.byteOffset,a.byteLength);return{bufferSizeDB:b.getUint32(0),maxBitrate:b.getUint32(4),avgBitrate:b.getUint32(8)}},esds:function(a){return{version:a[0],flags:new Uint8Array(a.subarray(1,4)),esId:a[6]<<8|a[7],streamPriority:31&a[8],decoderConfig:{objectProfileIndication:a[11],streamType:a[12]>>>2&63,bufferSize:a[13]<<16|a[14]<<8|a[15],maxBitrate:a[16]<<24|a[17]<<16|a[18]<<8|a[19],avgBitrate:a[20]<<24|a[21]<<16|a[22]<<8|a[23],decoderConfigDescriptor:{tag:a[24],length:a[25],audioObjectType:a[26]>>>3&31,samplingFrequencyIndex:(7&a[26])<<1|a[27]>>>7&1,channelConfiguration:a[27]>>>3&15}}}},ftyp:function(a){for(var b=new DataView(a.buffer,a.byteOffset,a.byteLength),c={majorBrand:e(a.subarray(0,4)),minorVersion:b.getUint32(4),compatibleBrands:[]},d=8;d<a.byteLength;)c.compatibleBrands.push(e(a.subarray(d,d+4))),d+=4;return c},dinf:function(a){return{boxes:c(a)}},dref:function(a){return{version:a[0],flags:new Uint8Array(a.subarray(1,4)),dataReferences:c(a.subarray(8))}},hdlr:function(b){var c=new DataView(b.buffer,b.byteOffset,b.byteLength),d={version:c.getUint8(0),flags:new Uint8Array(b.subarray(1,4)),handlerType:e(b.subarray(8,12)),name:\"\"},f=8;for(f=24;f<b.byteLength;f++){if(0===b[f]){f++;break}d.name+=String.fromCharCode(b[f])}return d.name=decodeURIComponent(a.escape(d.name)),d},mdat:function(a){return{byteLength:a.byteLength,nals:h(a)}},mdhd:function(a){var b,c=new DataView(a.buffer,a.byteOffset,a.byteLength),d=4,e={version:c.getUint8(0),flags:new Uint8Array(a.subarray(1,4)),language:\"\"};return 1===e.version?(d+=4,e.creationTime=f(c.getUint32(d)),d+=8,e.modificationTime=f(c.getUint32(d)),d+=4,e.timescale=c.getUint32(d),d+=8,e.duration=c.getUint32(d)):(e.creationTime=f(c.getUint32(d)),d+=4,e.modificationTime=f(c.getUint32(d)),d+=4,e.timescale=c.getUint32(d),d+=4,e.duration=c.getUint32(d)),d+=4,b=c.getUint16(d),e.language+=String.fromCharCode((b>>10)+96),e.language+=String.fromCharCode(((960&b)>>5)+96),e.language+=String.fromCharCode((31&b)+96),e},mdia:function(a){return{boxes:c(a)}},mfhd:function(a){return{version:a[0],flags:new Uint8Array(a.subarray(1,4)),sequenceNumber:a[4]<<24|a[5]<<16|a[6]<<8|a[7]}},minf:function(a){return{boxes:c(a)}},mp4a:function(a){var b=new DataView(a.buffer,a.byteOffset,a.byteLength),d={dataReferenceIndex:b.getUint16(6),channelcount:b.getUint16(16),samplesize:b.getUint16(18),samplerate:b.getUint16(24)+b.getUint16(26)/65536};return a.byteLength>28&&(d.streamDescriptor=c(a.subarray(28))[0]),d},moof:function(a){return{boxes:c(a)}},moov:function(a){return{boxes:c(a)}},mvex:function(a){return{boxes:c(a)}},mvhd:function(a){var b=new DataView(a.buffer,a.byteOffset,a.byteLength),c=4,d={version:b.getUint8(0),flags:new Uint8Array(a.subarray(1,4))};return 1===d.version?(c+=4,d.creationTime=f(b.getUint32(c)),c+=8,d.modificationTime=f(b.getUint32(c)),c+=4,d.timescale=b.getUint32(c),c+=8,d.duration=b.getUint32(c)):(d.creationTime=f(b.getUint32(c)),c+=4,d.modificationTime=f(b.getUint32(c)),c+=4,d.timescale=b.getUint32(c),c+=4,d.duration=b.getUint32(c)),c+=4,d.rate=b.getUint16(c)+b.getUint16(c+2)/16,c+=4,d.volume=b.getUint8(c)+b.getUint8(c+1)/8,c+=2,c+=2,c+=8,d.matrix=new Uint32Array(a.subarray(c,c+36)),c+=36,c+=24,d.nextTrackId=b.getUint32(c),d},pdin:function(a){var b=new DataView(a.buffer,a.byteOffset,a.byteLength);return{version:b.getUint8(0),flags:new Uint8Array(a.subarray(1,4)),rate:b.getUint32(4),initialDelay:b.getUint32(8)}},sdtp:function(a){var b,c={version:a[0],flags:new Uint8Array(a.subarray(1,4)),samples:[]};for(b=4;b<a.byteLength;b++)c.samples.push({dependsOn:(48&a[b])>>4,isDependedOn:(12&a[b])>>2,hasRedundancy:3&a[b]});return c},sidx:function(a){var b,c=new DataView(a.buffer,a.byteOffset,a.byteLength),d={version:a[0],flags:new Uint8Array(a.subarray(1,4)),references:[],referenceId:c.getUint32(4),timescale:c.getUint32(8),earliestPresentationTime:c.getUint32(12),firstOffset:c.getUint32(16)},e=c.getUint16(22);for(b=24;e;b+=12,e--)d.references.push({referenceType:(128&a[b])>>>7,referencedSize:2147483647&c.getUint32(b),subsegmentDuration:c.getUint32(b+4),startsWithSap:!!(128&a[b+8]),sapType:(112&a[b+8])>>>4,sapDeltaTime:268435455&c.getUint32(b+8)});return d},smhd:function(a){return{version:a[0],flags:new Uint8Array(a.subarray(1,4)),balance:a[4]+a[5]/256}},stbl:function(a){return{boxes:c(a)}},stco:function(a){var b,c=new DataView(a.buffer,a.byteOffset,a.byteLength),d={version:a[0],flags:new Uint8Array(a.subarray(1,4)),chunkOffsets:[]},e=c.getUint32(4);for(b=8;e;b+=4,e--)d.chunkOffsets.push(c.getUint32(b));return d},stsc:function(a){var b,c=new DataView(a.buffer,a.byteOffset,a.byteLength),d=c.getUint32(4),e={version:a[0],flags:new Uint8Array(a.subarray(1,4)),sampleToChunks:[]};for(b=8;d;b+=12,d--)e.sampleToChunks.push({firstChunk:c.getUint32(b),samplesPerChunk:c.getUint32(b+4),sampleDescriptionIndex:c.getUint32(b+8)});return e},stsd:function(a){return{version:a[0],flags:new Uint8Array(a.subarray(1,4)),sampleDescriptions:c(a.subarray(8))}},stsz:function(a){var b,c=new DataView(a.buffer,a.byteOffset,a.byteLength),d={version:a[0],flags:new Uint8Array(a.subarray(1,4)),sampleSize:c.getUint32(4),entries:[]};for(b=12;b<a.byteLength;b+=4)d.entries.push(c.getUint32(b));return d},stts:function(a){var b,c=new DataView(a.buffer,a.byteOffset,a.byteLength),d={version:a[0],flags:new Uint8Array(a.subarray(1,4)),timeToSamples:[]},e=c.getUint32(4);for(b=8;e;b+=8,e--)d.timeToSamples.push({sampleCount:c.getUint32(b),sampleDelta:c.getUint32(b+4)});return d},styp:function(a){return i.ftyp(a)},tfdt:function(a){return{version:a[0],flags:new Uint8Array(a.subarray(1,4)),baseMediaDecodeTime:a[4]<<24|a[5]<<16|a[6]<<8|a[7]}},tfhd:function(a){var b,c=new DataView(a.buffer,a.byteOffset,a.byteLength),d={version:a[0],flags:new Uint8Array(a.subarray(1,4)),trackId:c.getUint32(4)},e=1&d.flags[2],f=2&d.flags[2],g=8&d.flags[2],h=16&d.flags[2],i=32&d.flags[2];return b=8,e&&(b+=4,d.baseDataOffset=c.getUint32(12),b+=4),f&&(d.sampleDescriptionIndex=c.getUint32(b),b+=4),g&&(d.defaultSampleDuration=c.getUint32(b),b+=4),h&&(d.defaultSampleSize=c.getUint32(b),b+=4),i&&(d.defaultSampleFlags=c.getUint32(b)),d},tkhd:function(a){var b=new DataView(a.buffer,a.byteOffset,a.byteLength),c=4,d={version:b.getUint8(0),flags:new Uint8Array(a.subarray(1,4))};return 1===d.version?(c+=4,d.creationTime=f(b.getUint32(c)),c+=8,d.modificationTime=f(b.getUint32(c)),c+=4,d.trackId=b.getUint32(c),c+=4,c+=8,d.duration=b.getUint32(c)):(d.creationTime=f(b.getUint32(c)),c+=4,d.modificationTime=f(b.getUint32(c)),c+=4,d.trackId=b.getUint32(c),c+=4,c+=4,d.duration=b.getUint32(c)),c+=4,c+=8,d.layer=b.getUint16(c),c+=2,d.alternateGroup=b.getUint16(c),c+=2,d.volume=b.getUint8(c)+b.getUint8(c+1)/8,c+=2,c+=2,d.matrix=new Uint32Array(a.subarray(c,c+36)),c+=36,d.width=b.getUint16(c)+b.getUint16(c+2)/16,c+=4,d.height=b.getUint16(c)+b.getUint16(c+2)/16,d},traf:function(a){return{boxes:c(a)}},trak:function(a){return{boxes:c(a)}},trex:function(a){var b=new DataView(a.buffer,a.byteOffset,a.byteLength);return{version:a[0],flags:new Uint8Array(a.subarray(1,4)),trackId:b.getUint32(4),defaultSampleDescriptionIndex:b.getUint32(8),defaultSampleDuration:b.getUint32(12),defaultSampleSize:b.getUint32(16),sampleDependsOn:3&a[20],sampleIsDependedOn:(192&a[21])>>6,sampleHasRedundancy:(48&a[21])>>4,samplePaddingValue:(14&a[21])>>1,sampleIsDifferenceSample:!!(1&a[21]),sampleDegradationPriority:b.getUint16(22)}},trun:function(a){var b,c={version:a[0],flags:new Uint8Array(a.subarray(1,4)),samples:[]},d=new DataView(a.buffer,a.byteOffset,a.byteLength),e=1&c.flags[2],f=4&c.flags[2],h=1&c.flags[1],i=2&c.flags[1],j=4&c.flags[1],k=8&c.flags[1],l=d.getUint32(4),m=8;for(e&&(c.dataOffset=d.getUint32(m),m+=4),f&&l&&(b={flags:g(a.subarray(m,m+4))},m+=4,h&&(b.duration=d.getUint32(m),m+=4),i&&(b.size=d.getUint32(m),m+=4),k&&(b.compositionTimeOffset=d.getUint32(m),m+=4),c.samples.push(b),l--);l--;)b={},h&&(b.duration=d.getUint32(m),m+=4),i&&(b.size=d.getUint32(m),m+=4),j&&(b.flags=g(a.subarray(m,m+4)),m+=4),k&&(b.compositionTimeOffset=d.getUint32(m),m+=4),c.samples.push(b);return c},\"url \":function(a){return{version:a[0],flags:new Uint8Array(a.subarray(1,4))}},vmhd:function(a){var b=new DataView(a.buffer,a.byteOffset,a.byteLength);return{version:a[0],flags:new Uint8Array(a.subarray(1,4)),graphicsmode:b.getUint16(4),opcolor:new Uint16Array([b.getUint16(6),b.getUint16(8),b.getUint16(10)])}}};c=function(a){for(var b,c,d,f,g,h=0,j=[],k=new ArrayBuffer(a.length),l=new Uint8Array(k),m=0;m<a.length;++m)l[m]=a[m];for(b=new DataView(k);h<a.byteLength;)c=b.getUint32(h),d=e(a.subarray(h+4,h+8)),f=c>1?h+c:a.byteLength,g=(i[d]||function(a){return{data:a}})(a.subarray(h+8,f)),g.size=c,g.type=d,j.push(g),h=f;return j},d=function(a,b){var c;return b=b||0,c=new Array(2*b+1).join(\" \"),a.map(function(a,e){return c+a.type+\"\\n\"+Object.keys(a).filter(function(a){return\"type\"!==a&&\"boxes\"!==a}).map(function(b){var d=c+\"  \"+b+\": \",e=a[b];if(e instanceof Uint8Array||e instanceof Uint32Array){var f=Array.prototype.slice.call(new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).map(function(a){return\" \"+(\"00\"+a.toString(16)).slice(-2)}).join(\"\").match(/.{1,24}/g);return f?1===f.length?d+\"<\"+f.join(\"\").slice(1)+\">\":d+\"<\\n\"+f.map(function(a){return c+\"  \"+a}).join(\"\\n\")+\"\\n\"+c+\"  >\":d+\"<>\"}return d+JSON.stringify(e,null,2).split(\"\\n\").map(function(a,b){return 0===b?a:c+\"  \"+a}).join(\"\\n\")}).join(\"\\n\")+(a.boxes?\"\\n\"+d(a.boxes,b+1):\"\")}).join(\"\\n\")},b.exports={inspect:c,textify:d}}).call(this,\"undefined\"!=typeof global?global:\"undefined\"!=typeof self?self:\"undefined\"!=typeof window?window:{})},{}],19:[function(a,b,c){\"use strict\";var d;d=function(a){var b=a.byteLength,c=0,d=0;this.length=function(){return 8*b},this.bitsAvailable=function(){return 8*b+d},this.loadWord=function(){var e=a.byteLength-b,f=new Uint8Array(4),g=Math.min(4,b);if(0===g)throw new Error(\"no bytes available\");f.set(a.subarray(e,e+g)),c=new DataView(f.buffer).getUint32(0),d=8*g,b-=g},this.skipBits=function(a){var e;d>a?(c<<=a,d-=a):(a-=d,e=Math.floor(a/8),a-=8*e,b-=e,this.loadWord(),c<<=a,d-=a)},this.readBits=function(a){var e=Math.min(d,a),f=c>>>32-e;return d-=e,d>0?c<<=e:b>0&&this.loadWord(),e=a-e,e>0?f<<e|this.readBits(e):f},this.skipLeadingZeros=function(){var a;for(a=0;d>a;++a)if(0!==(c&2147483648>>>a))return c<<=a,d-=a,a;return this.loadWord(),a+this.skipLeadingZeros()},this.skipUnsignedExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())},this.skipExpGolomb=function(){this.skipBits(1+this.skipLeadingZeros())},this.readUnsignedExpGolomb=function(){var a=this.skipLeadingZeros();return this.readBits(a+1)-1},this.readExpGolomb=function(){var a=this.readUnsignedExpGolomb();return 1&a?1+a>>>1:-1*(a>>>1)},this.readBoolean=function(){return 1===this.readBits(1)},this.readUnsignedByte=function(){return this.readBits(8)},this.loadWord()},b.exports=d},{}],20:[function(a,b,c){\"use strict\";var d=function(){this.init=function(){var a={};this.on=function(b,c){a[b]||(a[b]=[]),a[b].push(c)},this.off=function(b,c){var d;return a[b]?(d=a[b].indexOf(c),a[b].splice(d,1),d>-1):!1},this.trigger=function(b){var c,d,e,f;if(c=a[b])if(2===arguments.length)for(e=c.length,d=0;e>d;++d)c[d].call(this,arguments[1]);else{for(f=[],d=arguments.length,d=1;d<arguments.length;++d)f.push(arguments[d]);for(e=c.length,d=0;e>d;++d)c[d].apply(this,f)}},this.dispose=function(){a={}}}};d.prototype.pipe=function(a){return this.on(\"data\",function(b){a.push(b)}),this.on(\"done\",function(){a.flush()}),a},d.prototype.push=function(a){this.trigger(\"data\",a)},d.prototype.flush=function(){this.trigger(\"done\")},b.exports=d},{}]},{},[8])(8)});var wireTransmuxerEvents=function(a){a.on(\"data\",function(a){var b=a.data;a.data=b.buffer,postMessage({action:\"data\",segment:a,byteOffset:b.byteOffset,byteLength:b.byteLength},[a.data])}),a.captionStream&&a.captionStream.on(\"data\",function(a){postMessage({action:\"caption\",data:a})}),a.on(\"done\",function(a){postMessage({action:\"done\"})})},messageHandlers={init:function(a){initOptions=a&&a.options||{},this.defaultInit()},defaultInit:function(){transmuxer&&transmuxer.dispose(),transmuxer=new muxjs.mp4.Transmuxer(initOptions),wireTransmuxerEvents(transmuxer)},push:function(a){var b=new Uint8Array(a.data,a.byteOffset,a.byteLength);transmuxer.push(b)},reset:function(){this.defaultInit()},setTimestampOffset:function(a){var b=a.timestampOffset||0;transmuxer.setBaseMediaDecodeTime(Math.round(9e4*b))},flush:function(a){transmuxer.flush()}};onmessage=function(a){transmuxer||\"init\"===a.data.action||messageHandlers.defaultInit(),a.data&&a.data.action&&messageHandlers[a.data.action]&&messageHandlers[a.data.action](a.data)};"], {type: "application/javascript"})));
      this.transmuxer_.postMessage({action:'init', options: {remux: false}});

      this.transmuxer_.onmessage = function (event) {
        if (event.data.action === 'data') {
          return self.data_(event);
        }

        if (event.data.action === 'done') {
          return self.done_(event);
        }
      };

      // this timestampOffset is a property with the side-effect of resetting
      // baseMediaDecodeTime in the transmuxer on the setter
      Object.defineProperty(this, 'timestampOffset', {
        get: function() {
          return this.timestampOffset_;
        },
        set: function(val) {
          if (typeof val === 'number' && val >= 0) {
            this.timestampOffset_ = val;

            // We have to tell the transmuxer to set the baseMediaDecodeTime to
            // the desired timestampOffset for the next segment
            this.transmuxer_.postMessage({
              action: 'setTimestampOffset',
              timestampOffset: val
            });
          }
        }
      });
      // setting the append window affects both source buffers
      Object.defineProperty(this, 'appendWindowStart', {
        get: function() {
          return (this.videoBuffer_ || this.audioBuffer_).appendWindowStart;
        },
        set: function(start) {
          if (this.videoBuffer_) {
            this.videoBuffer_.appendWindowStart = start;
          }
          if (this.audioBuffer_) {
            this.audioBuffer_.appendWindowStart = start;
          }
        }
      });
      // this buffer is "updating" if either of its native buffers are
      Object.defineProperty(this, 'updating', {
        get: function() {
          return this.bufferUpdating_ ||
            (this.audioBuffer_ && this.audioBuffer_.updating) ||
            (this.videoBuffer_ && this.videoBuffer_.updating);
        }
      });
      // the buffered property is the intersection of the buffered
      // ranges of the native source buffers
      Object.defineProperty(this, 'buffered', {
        get: function() {
          var
            start = null,
            end = null,
            arity = 0,
            extents = [],
            ranges = [];

          // Handle the case where there is no buffer data
          if ((!this.videoBuffer_ || this.videoBuffer_.buffered.length === 0) &&
              (!this.audioBuffer_ || this.audioBuffer_.buffered.length === 0)) {
            return videojs.createTimeRange();
          }

          // Handle the case where we only have one buffer
          if (!this.videoBuffer_) {
            return this.audioBuffer_.buffered;
          } else if (!this.audioBuffer_) {
            return this.videoBuffer_.buffered;
          }

          // Handle the case where we have both buffers and create an
          // intersection of the two
          var videoIndex = 0, audioIndex = 0;
          var videoBuffered = this.videoBuffer_.buffered;
          var audioBuffered = this.audioBuffer_.buffered;
          var count = videoBuffered.length;

          // A) Gather up all start and end times
          while (count--) {
            extents.push({time: videoBuffered.start(count), type: 'start'});
            extents.push({time: videoBuffered.end(count), type: 'end'});
          }
          count = audioBuffered.length;
          while (count--) {
            extents.push({time: audioBuffered.start(count), type: 'start'});
            extents.push({time: audioBuffered.end(count), type: 'end'});
          }
          // B) Sort them by time
          extents.sort(function(a, b){return a.time - b.time;});

          // C) Go along one by one incrementing arity for start and decrementing
          //    arity for ends
          for(count = 0; count < extents.length; count++) {
            if (extents[count].type === 'start') {
              arity++;

              // D) If arity is ever incremented to 2 we are entering an
              //    overlapping range
              if (arity === 2) {
                start = extents[count].time;
              }
            } else if (extents[count].type === 'end') {
              arity--;

              // E) If arity is ever decremented to 1 we leaving an
              //    overlapping range
              if (arity === 1) {
                end = extents[count].time;
              }
            }

            // F) Record overlapping ranges
            if (start !== null && end !== null) {
              ranges.push([start, end]);
              start = null;
              end = null;
            }
          }

          return videojs.createTimeRanges(ranges);
        }
      });
    },

    // Transmuxer message handlers

    data_: function(event) {
      var
        segment = event.data.segment,
        nativeMediaSource = this.mediaSource_.mediaSource_;

      // Cast ArrayBuffer to TypedArray
      segment.data = new Uint8Array(segment.data, event.data.byteOffset, event.data.byteLength);

      // If any sourceBuffers have not been created, do so now
      if (segment.type === 'video') {
        if (!this.videoBuffer_) {
          this.videoBuffer_ = nativeMediaSource.addSourceBuffer('video/mp4;codecs="' + this.codecs_[0] + '"');
          // aggregate buffer events
          this.videoBuffer_.addEventListener('updatestart',
                                             aggregateUpdateHandler(this, 'audioBuffer_', 'updatestart'));
          this.videoBuffer_.addEventListener('update',
                                             aggregateUpdateHandler(this, 'audioBuffer_', 'update'));
          this.videoBuffer_.addEventListener('updateend',
                                             aggregateUpdateHandler(this, 'audioBuffer_', 'updateend'));
        }
      } else if (segment.type === 'audio') {
        if (!this.audioBuffer_) {
          this.audioBuffer_ = nativeMediaSource.addSourceBuffer('audio/mp4;codecs="' + this.codecs_[1] + '"');
          // aggregate buffer events
          this.audioBuffer_.addEventListener('updatestart',
                                             aggregateUpdateHandler(this, 'videoBuffer_', 'updatestart'));
          this.audioBuffer_.addEventListener('update',
                                             aggregateUpdateHandler(this, 'videoBuffer_', 'update'));
          this.audioBuffer_.addEventListener('updateend',
                                             aggregateUpdateHandler(this, 'videoBuffer_', 'updateend'));
        }
      } else if (segment.type === 'combined') {
        if (!this.videoBuffer_) {
          this.videoBuffer_ = nativeMediaSource.addSourceBuffer('video/mp4;codecs="' + this.codecs_.join(',') + '"');
          // aggregate buffer events
          this.videoBuffer_.addEventListener('updatestart',
                                             aggregateUpdateHandler(this, 'videoBuffer_', 'updatestart'));
          this.videoBuffer_.addEventListener('update',
                                             aggregateUpdateHandler(this, 'videoBuffer_', 'update'));
          this.videoBuffer_.addEventListener('updateend',
                                             aggregateUpdateHandler(this, 'videoBuffer_', 'updateend'));
        }
      }
      createTextTracksIfNecessary(this, this.mediaSource_, segment);

      // Add the segments to the pendingBuffers array
      this.pendingBuffers_.push(segment);
      return;
    },
    done_: function() {
      // All buffers should have been flushed from the muxer
      // start processing anything we have received
      this.processPendingSegments_();
      return;
    },

    // SourceBuffer Implementation

    appendBuffer: function(segment) {
      // Start the internal "updating" state
      this.bufferUpdating_ = true;

      this.transmuxer_.postMessage({
        action: 'push',
        // Send the typed-array of data as an ArrayBuffer so that
        // it can be sent as a "Transferable" and avoid the costly
        // memory copy
        data: segment.buffer,

        // To recreate the original typed-array, we need information
        // about what portion of the ArrayBuffer it was a view into
        byteOffset: segment.byteOffset,
        byteLength: segment.byteLength
      },
      [segment.buffer]);
      this.transmuxer_.postMessage({action: 'flush'});
    },
    remove: function(start, end) {
      if (this.videoBuffer_) {
        this.videoBuffer_.remove(start, end);
      }
      if (this.audioBuffer_) {
        this.audioBuffer_.remove(start, end);
      }

      // Remove Metadata Cues (id3)
      removeCuesFromTrack(start, end, this.metadataTrack_);

      // Remove Any Captions
      removeCuesFromTrack(start, end, this.inbandTextTrack_);
    },

    /**
     * Process any segments that the muxer has output
     * Concatenate segments together based on type and append them into
     * their respective sourceBuffers
     */
    processPendingSegments_: function() {
      var sortedSegments = {
          video: {
            segments: [],
            bytes: 0
          },
          audio: {
            segments: [],
            bytes: 0
          },
          captions: [],
          metadata: []
        };

      // Sort segments into separate video/audio arrays and
      // keep track of their total byte lengths
      sortedSegments = this.pendingBuffers_.reduce(function (segmentObj, segment) {
        var
          type = segment.type,
          data = segment.data;

        // A "combined" segment type (unified video/audio) uses the videoBuffer
        if (type === 'combined') {
          type = 'video';
        }

        segmentObj[type].segments.push(data);
        segmentObj[type].bytes += data.byteLength;

        // Gather any captions into a single array
        if (segment.captions) {
          segmentObj.captions = segmentObj.captions.concat(segment.captions);
        }

        // Gather any metadata into a single array
        if (segment.metadata) {
          segmentObj.metadata = segmentObj.metadata.concat(segment.metadata);
        }

        return segmentObj;
      }, sortedSegments);

      addTextTrackData(this, sortedSegments.captions, sortedSegments.metadata);

      // Merge multiple video and audio segments into one and append
      this.concatAndAppendSegments_(sortedSegments.video, this.videoBuffer_);
      this.concatAndAppendSegments_(sortedSegments.audio, this.audioBuffer_);

      this.pendingBuffers_.length = 0;

      // We are no longer in the internal "updating" state
      this.bufferUpdating_ = false;
    },
    /**
     * Combind all segments into a single Uint8Array and then append them
     * to the destination buffer
     */
    concatAndAppendSegments_: function(segmentObj, destinationBuffer) {
      var
        offset = 0,
        tempBuffer;

      if (segmentObj.bytes) {
        tempBuffer = new Uint8Array(segmentObj.bytes);

        // Combine the individual segments into one large typed-array
        segmentObj.segments.forEach(function (segment) {
          tempBuffer.set(segment, offset);
          offset += segment.byteLength;
        });

        destinationBuffer.appendBuffer(tempBuffer);
      }
    },
    // abort any sourceBuffer actions and throw out any un-appended data
    abort: function() {
      if (this.videoBuffer_) {
        this.videoBuffer_.abort();
      }
      if (this.audioBuffer_) {
        this.audioBuffer_.abort();
      }
      if (this.transmuxer_) {
        this.transmuxer_.postMessage({action: 'reset'});
      }
      this.pendingBuffers_.length = 0;
      this.bufferUpdating_ = false;
    }
  });

  // -----
  // Flash
  // -----

  videojs.FlashMediaSource = videojs.extend(EventTarget, {
    constructor: function(){
      var self = this;
      this.sourceBuffers = [];
      this.readyState = 'closed';

      this.on(['sourceopen', 'webkitsourceopen'], function(event){
        // find the swf where we will push media data
        this.swfObj = document.getElementById(event.swfId);
        this.player_ = videojs(this.swfObj.parentNode);
        this.tech_ = this.swfObj.tech;
        this.readyState = 'open';

        this.tech_.on('seeking', function() {
          var i = self.sourceBuffers.length;
          while (i--) {
            self.sourceBuffers[i].abort();
          }
        });

        // trigger load events
        if (this.swfObj) {
          this.swfObj.vjs_load();
        }
      });
    },
    addSeekableRange_: function() {
      // intentional no-op
    }
  });

  /**
   * The maximum size in bytes for append operations to the video.js
   * SWF. Calling through to Flash blocks and can be expensive so
   * tuning this parameter may improve playback on slower
   * systems. There are two factors to consider:
   * - Each interaction with the SWF must be quick or you risk dropping
   * video frames. To maintain 60fps for the rest of the page, each append
   * must not  take longer than 16ms. Given the likelihood that the page
   * will be executing more javascript than just playback, you probably
   * want to aim for less than 8ms. We aim for just 4ms.
   * - Bigger appends significantly increase throughput. The total number of
   * bytes over time delivered to the SWF must exceed the video bitrate or
   * playback will stall.
   *
   * We adaptively tune the size of appends to give the best throughput
   * possible given the performance of the system. To do that we try to append
   * as much as possible in TIME_PER_TICK and while tuning the size of appends
   * dynamically so that we only append about 4-times in that 4ms span.
   *
   * The reason we try to keep the number of appends around four is due to
   * externalities such as Flash load and garbage collection that are highly
   * variable and having 4 iterations allows us to exit the loop early if
   * an iteration takes longer than expected.
   */

  videojs.FlashMediaSource.TIME_BETWEEN_TICKS = Math.floor(1000 / 480);
  videojs.FlashMediaSource.TIME_PER_TICK = Math.floor(1000 / 240);
  videojs.FlashMediaSource.BYTES_PER_CHUNK = 1 * 1024; // 1kb
  videojs.FlashMediaSource.MIN_CHUNK = 1024;
  videojs.FlashMediaSource.MAX_CHUNK = 1024 * 1024;

  // create a new source buffer to receive a type of media data
  videojs.FlashMediaSource.prototype.addSourceBuffer = function(type){
    var sourceBuffer;

    // if this is an FLV type, we'll push data to flash
    if (type.indexOf('video/mp2t') === 0) {
      // Flash source buffers
      sourceBuffer = new videojs.FlashSourceBuffer(this);
    } else {
      throw new Error('NotSupportedError (Video.js)');
    }

    this.sourceBuffers.push(sourceBuffer);
    return sourceBuffer;
  };

  /**
   * Set or return the presentation duration.
   * @param value {double} the duration of the media in seconds
   * @param {double} the current presentation duration
   * @see http://www.w3.org/TR/media-source/#widl-MediaSource-duration
   */
  try {
    Object.defineProperty(videojs.FlashMediaSource.prototype, 'duration', {
      get: function(){
        if (!this.swfObj) {
          return NaN;
        }
        // get the current duration from the SWF
        return this.swfObj.vjs_getProperty('duration');
      },
      set: function(value){
        var
          i,
          oldDuration = this.swfObj.vjs_getProperty('duration');

        this.swfObj.vjs_setProperty('duration', value);

        if (value < oldDuration) {
          // In MSE, this triggers the range removal algorithm which causes
          // an update to occur
          for (i = 0; i < this.sourceBuffers.length; i++) {
            this.sourceBuffers[i].remove(value, oldDuration);
          }
        }

        return value;
      }
    });
  } catch (e) {
    // IE8 throws if defineProperty is called on a non-DOM node. We
    // don't support IE8 but we shouldn't throw an error if loaded
    // there.
    videojs.FlashMediaSource.prototype.duration = NaN;
  }

  /**
   * Signals the end of the stream.
   * @param error {string} (optional) Signals that a playback error
   * has occurred. If specified, it must be either "network" or
   * "decode".
   * @see https://w3c.github.io/media-source/#widl-MediaSource-endOfStream-void-EndOfStreamError-error
   */
  videojs.FlashMediaSource.prototype.endOfStream = function(error){
    if (error === 'network') {
      // MEDIA_ERR_NETWORK
      this.tech_.error(2);
    } else if (error === 'decode') {
      // MEDIA_ERR_DECODE
      this.tech_.error(3);
    }
    if (this.readyState !== 'ended') {
      this.readyState = 'ended';
      this.swfObj.vjs_endOfStream();
    }
  };

  // store references to the media sources so they can be connected
  // to a video element (a swf object)
  videojs.mediaSources = {};
  // provide a method for a swf object to notify JS that a media source is now open
  videojs.MediaSource.open = function(msObjectURL, swfId){
    var mediaSource = videojs.mediaSources[msObjectURL];

    if (mediaSource) {
      mediaSource.trigger({
        type: 'sourceopen',
        swfId: swfId
      });
    } else {
      throw new Error('Media Source not found (Video.js)');
    }
  };

  scheduleTick = function(func) {
    // Chrome doesn't invoke requestAnimationFrame callbacks
    // in background tabs, so use setTimeout.
    window.setTimeout(func, videojs.FlashMediaSource.TIME_BETWEEN_TICKS);
  };

  // Source Buffer
  videojs.FlashSourceBuffer = videojs.extend(EventTarget, {

    constructor: function(mediaSource){
      var
        encodedHeader,
        self = this;

      // Start off using the globally defined value but refine
      // as we append data into flash
      this.chunkSize_ = videojs.FlashMediaSource.BYTES_PER_CHUNK;

      // byte arrays queued to be appended
      this.buffer_ = [];

      // the total number of queued bytes
      this.bufferSize_ =  0;

      // to be able to determine the correct position to seek to, we
      // need to retain information about the mapping between the
      // media timeline and PTS values
      this.basePtsOffset_ = NaN;

      this.mediaSource = mediaSource;

      // indicates whether the asynchronous continuation of an operation
      // is still being processed
      // see https://w3c.github.io/media-source/#widl-SourceBuffer-updating
      this.updating = false;
      this.timestampOffset_ = 0;

      // TS to FLV transmuxer
      this.segmentParser_ = new muxjs.flv.Transmuxer();
      this.segmentParser_.on('data', this.receiveBuffer_.bind(this));
      encodedHeader = window.btoa(String.fromCharCode.apply(null, Array.prototype.slice.call(this.segmentParser_.getFlvHeader())));
      this.mediaSource.swfObj.vjs_appendBuffer(encodedHeader);

      Object.defineProperty(this, 'timestampOffset', {
        get: function() {
          return this.timestampOffset_;
        },
        set: function(val) {
          if (typeof val === 'number' && val >= 0) {
            this.timestampOffset_ = val;
            this.segmentParser_ = new muxjs.flv.Transmuxer();
            this.segmentParser_.on('data', this.receiveBuffer_.bind(this));
            // We have to tell flash to expect a discontinuity
            this.mediaSource.swfObj.vjs_discontinuity();
            // the media <-> PTS mapping must be re-established after
            // the discontinuity
            this.basePtsOffset_ = NaN;
          }
        }
      });

      Object.defineProperty(this, 'buffered', {
        get: function() {
          return videojs.createTimeRanges(this.mediaSource.swfObj.vjs_getProperty('buffered'));
        }
      });

      // On a seek we remove all text track data since flash has no concept
      // of a buffered-range and everything else is reset on seek
      this.mediaSource.player_.on('seeked', function() {
        removeCuesFromTrack(0, Infinity, self.metadataTrack_);
        removeCuesFromTrack(0, Infinity, self.inbandTextTrack_);
      });
    },

    // accept video data and pass to the video (swf) object
    appendBuffer: function(bytes){
      var error, self = this;

      if (this.updating) {
        error = new Error('SourceBuffer.append() cannot be called ' +
                          'while an update is in progress');
        error.name = 'InvalidStateError';
        error.code = 11;
        throw error;
      }

      this.updating = true;
      this.mediaSource.readyState = 'open';
      this.trigger({ type: 'update' });

      var chunk = 512 * 1024;
      var i = 0;
      (function chunkInData() {
        self.segmentParser_.push(bytes.subarray(i, i + chunk));
        i += chunk;
        if (i < bytes.byteLength) {
          scheduleTick(chunkInData);
        } else {
          scheduleTick(self.segmentParser_.flush.bind(self.segmentParser_));
        }
      })();
    },

    // reset the parser and remove any data queued to be sent to the swf
    abort: function() {
      this.buffer_ = [];
      this.bufferSize_ = 0;
      this.mediaSource.swfObj.vjs_abort();

      // report any outstanding updates have ended
      if (this.updating) {
        this.updating = false;
        this.trigger({ type: 'updateend' });
      }
    },

    // Flash cannot remove ranges already buffered in the NetStream
    // but seeking clears the buffer entirely. For most purposes,
    // having this operation act as a no-op is acceptable.
    remove: function(start, end) {
      removeCuesFromTrack(start, end, this.metadataTrack_);
      removeCuesFromTrack(start, end, this.inbandTextTrack_);
      this.trigger({ type: 'update' });
      this.trigger({ type: 'updateend' });
    },

    receiveBuffer_: function(segment) {
      var self = this;

      // create an in-band caption track if one is present in the segment
      createTextTracksIfNecessary(this, this.mediaSource, segment);
      addTextTrackData(this, segment.captions, segment.metadata);

      // Do this asynchronously since convertTagsToData_ can be time consuming
      scheduleTick(function() {
        if (self.buffer_.length === 0) {
          scheduleTick(self.processBuffer_.bind(self));
        }
        var flvBytes = self.convertTagsToData_(segment);
        if (flvBytes) {
          self.buffer_.push(flvBytes);
          self.bufferSize_ += flvBytes.byteLength;
        }
      });
    },

    // append a portion of the current buffer to the SWF
    processBuffer_: function() {
      var
        chunk,
        i,
        length,
        binary,
        b64str,
        startByte = 0,
        appendIterations = 0,
        startTime = +(new Date()),
        appendTime;

      if (!this.buffer_.length) {
        if (this.updating !== false) {
          this.updating = false;
          this.trigger({ type: 'updateend' });
        }
        // do nothing if the buffer is empty
        return;
      }

      do {
        appendIterations++;
        // concatenate appends up to the max append size
        chunk = this.buffer_[0].subarray(startByte, startByte + this.chunkSize_);

        // requeue any bytes that won't make it this round
        if (chunk.byteLength < this.chunkSize_ ||
            this.buffer_[0].byteLength === startByte + this.chunkSize_) {
          startByte = 0;
          this.buffer_.shift();
        } else {
          startByte += this.chunkSize_;
        }

        this.bufferSize_ -= chunk.byteLength;

        // base64 encode the bytes
        binary = '';
        length = chunk.byteLength;
        for (i = 0; i < length; i++) {
          binary += String.fromCharCode(chunk[i]);
        }
        b64str = window.btoa(binary);

        // bypass normal ExternalInterface calls and pass xml directly
        // IE can be slow by default
        this.mediaSource.swfObj.CallFunction('<invoke name="vjs_appendBuffer"' +
                                             'returntype="javascript"><arguments><string>' +
                                             b64str +
                                             '</string></arguments></invoke>');
        appendTime = (new Date()) - startTime;
      } while (this.buffer_.length &&
          appendTime < videojs.FlashMediaSource.TIME_PER_TICK);

      if (this.buffer_.length && startByte) {
        this.buffer_[0] = this.buffer_[0].subarray(startByte);
      }

      if (appendTime >= videojs.FlashMediaSource.TIME_PER_TICK) {
        // We want to target 4 iterations per time-slot so that gives us
        // room to adjust to changes in Flash load and other externalities
        // such as garbage collection while still maximizing throughput
        this.chunkSize_ = Math.floor(this.chunkSize_ * (appendIterations / 4));
      }

      // We also make sure that the chunk-size doesn't drop below 1KB or
      // go above 1MB as a sanity check
      this.chunkSize_ = Math.max(
        videojs.FlashMediaSource.MIN_CHUNK,
        Math.min(this.chunkSize_, videojs.FlashMediaSource.MAX_CHUNK));

      // schedule another append if necessary
      if (this.bufferSize_ !== 0) {
        scheduleTick(this.processBuffer_.bind(this));
      } else {
        this.updating = false;
        this.trigger({ type: 'updateend' });

      }
    },

    // Turns an array of flv tags into a Uint8Array representing the
    // flv data. Also removes any tags that are before the current
    // time so that playback begins at or slightly after the right
    // place on a seek
    convertTagsToData_: function (segmentData) {
      var
        segmentByteLength = 0,
        tech = this.mediaSource.tech_,
        targetPts = 0,
        i, j, segment,
        filteredTags = [],
        tags = this.getOrderedTags_(segmentData);

      // Establish the media timeline to PTS translation if we don't
      // have one already
      if (isNaN(this.basePtsOffset_) && tags.length) {
        this.basePtsOffset_ = tags[0].pts;
      }

      // Trim any tags that are before the end of the end of
      // the current buffer
      if (tech.buffered().length) {
        targetPts = tech.buffered().end(0) - this.timestampOffset;
      }
      // Trim to currentTime if it's ahead of buffered or buffered doesn't exist
      targetPts = Math.max(targetPts, tech.currentTime() - this.timestampOffset);

      targetPts *= 1e3; // PTS values are represented in milliseconds
      targetPts += this.basePtsOffset_;

      // skip tags with a presentation time less than the seek target
      for (i = 0; i < tags.length; i++) {
        if (tags[i].pts >= targetPts) {
          filteredTags.push(tags[i]);
        }
      }

      if (filteredTags.length === 0) {
        return;
      }

      // concatenate the bytes into a single segment
      for (i = 0; i < filteredTags.length; i++) {
        segmentByteLength += filteredTags[i].bytes.byteLength;
      }
      segment = new Uint8Array(segmentByteLength);
      for (i = 0, j = 0; i < filteredTags.length; i++) {
        segment.set(filteredTags[i].bytes, j);
        j += filteredTags[i].bytes.byteLength;
      }

      return segment;
    },

    // assemble the FLV tags in decoder order
    getOrderedTags_: function(segmentData) {
      var
        videoTags = segmentData.tags.videoTags,
        audioTags = segmentData.tags.audioTags,
        tag,
        tags = [];

      while (videoTags.length || audioTags.length) {
        if (!videoTags.length) {
          // only audio tags remain
          tag = audioTags.shift();
        } else if (!audioTags.length) {
          // only video tags remain
          tag = videoTags.shift();
        } else if (audioTags[0].dts < videoTags[0].dts) {
          // audio should be decoded next
          tag = audioTags.shift();
        } else {
          // video should be decoded next
          tag = videoTags.shift();
        }

        tags.push(tag.finalize());
      }

      return tags;
    }
  });

  // URL
  videojs.URL = {
    createObjectURL: function(object){
      var url;

      // use the native MediaSource to generate an object URL
      if (object instanceof videojs.HtmlMediaSource) {
        url = window.URL.createObjectURL(object.mediaSource_);
        object.url_ = url;
        return url;
      }

      // if the object isn't an emulated MediaSource, delegate to the
      // native implementation
      if (!(object instanceof videojs.FlashMediaSource)) {
        url = window.URL.createObjectURL(object);
        object.url_ = url;
        return url;
      }

      // build a URL that can be used to map back to the emulated
      // MediaSource
      url = objectUrlPrefix + urlCount;

      urlCount++;

      // setup the mapping back to object
      videojs.mediaSources[url] = object;

      return url;
    }
  };

})(this, this.muxjs);

(function(window, videojs, document, undefined) {
'use strict';

var
  // A fudge factor to apply to advertised playlist bitrates to account for
  // temporary flucations in client bandwidth
  bandwidthVariance = 1.2,
  blacklistDuration = 5 * 60 * 1000, // 5 minute blacklist
  TIME_FUDGE_FACTOR = 1 / 30, // Fudge factor to account for TimeRanges rounding
  Component = videojs.getComponent('Component'),

  // The amount of time to wait between checking the state of the buffer
  bufferCheckInterval = 500,

  safeGetComputedStyle,
  keyFailed,
  resolveUrl;

// returns true if a key has failed to download within a certain amount of retries
keyFailed = function(key) {
  return key.retries && key.retries >= 2;
};

videojs.Hls = {};
videojs.HlsHandler = videojs.extend(Component, {
  constructor: function(tech, options) {
    var self = this, _player;

    Component.call(this, tech);

    // tech.player() is deprecated but setup a reference to HLS for
    // backwards-compatibility
    if (tech.options_ && tech.options_.playerId) {
      _player = videojs(tech.options_.playerId);
      if (!_player.hls) {
        Object.defineProperty(_player, 'hls', {
          get: function() {
            videojs.log.warn('player.hls is deprecated. Use player.tech.hls instead.');
            return self;
          }
        });
      }
    }
    this.tech_ = tech;
    this.source_ = options.source;
    this.mode_ = options.mode;
    // the segment info object for a segment that is in the process of
    // being downloaded or processed
    this.pendingSegment_ = null;

    // start playlist selection at a reasonable bandwidth for
    // broadband internet
    this.bandwidth = options.bandwidth || 4194304; // 0.5 Mbps
    this.bytesReceived = 0;

    // loadingState_ tracks how far along the buffering process we
    // have been given permission to proceed. There are three possible
    // values:
    // - none: do not load playlists or segments
    // - meta: load playlists but not segments
    // - segments: load everything
    this.loadingState_ = 'none';
    if (this.tech_.preload() !== 'none') {
      this.loadingState_ = 'meta';
    }

    // periodically check if new data needs to be downloaded or
    // buffered data should be appended to the source buffer
    this.startCheckingBuffer_();

    this.on(this.tech_, 'seeking', function() {
      this.setCurrentTime(this.tech_.currentTime());
    });
    this.on(this.tech_, 'error', function() {
      this.stopCheckingBuffer_();
    });

    this.on(this.tech_, 'play', this.play);
  }
});

// HLS is a source handler, not a tech. Make sure attempts to use it
// as one do not cause exceptions.
videojs.Hls.canPlaySource = function() {
  return videojs.log.warn('HLS is no longer a tech. Please remove it from ' +
                          'your player\'s techOrder.');
};

/**
 * The Source Handler object, which informs video.js what additional
 * MIME types are supported and sets up playback. It is registered
 * automatically to the appropriate tech based on the capabilities of
 * the browser it is running in. It is not necessary to use or modify
 * this object in normal usage.
 */
videojs.HlsSourceHandler = function(mode) {
  return {
    canHandleSource: function(srcObj) {
      return videojs.HlsSourceHandler.canPlayType(srcObj.type);
    },
    handleSource: function(source, tech) {
      if (mode === 'flash') {
        // We need to trigger this asynchronously to give others the chance
        // to bind to the event when a source is set at player creation
        tech.setTimeout(function() {
          tech.trigger('loadstart');
        }, 1);
      }
      tech.hls = new videojs.HlsHandler(tech, {
        source: source,
        mode: mode
      });
      tech.hls.src(source.src);
      return tech.hls;
    },
    canPlayType: function(type) {
      return videojs.HlsSourceHandler.canPlayType(type);
    }
  };
};

videojs.HlsSourceHandler.canPlayType = function(type) {
  var mpegurlRE = /^application\/(?:x-|vnd\.apple\.)mpegurl/i;

  // favor native HLS support if it's available
  if (videojs.Hls.supportsNativeHls) {
    return false;
  }
  return mpegurlRE.test(type);
};

// register source handlers with the appropriate techs
if (videojs.MediaSource.supportsNativeMediaSources()) {
  videojs.getComponent('Html5').registerSourceHandler(videojs.HlsSourceHandler('html5'));
}
if (window.Uint8Array) {
  videojs.getComponent('Flash').registerSourceHandler(videojs.HlsSourceHandler('flash'));
}

// the desired length of video to maintain in the buffer, in seconds
videojs.Hls.GOAL_BUFFER_LENGTH = 30;

videojs.HlsHandler.prototype.src = function(src) {
  var oldMediaPlaylist;

  // do nothing if the src is falsey
  if (!src) {
    return;
  }

  this.mediaSource = new videojs.MediaSource({ mode: this.mode_ });

  // load the MediaSource into the player
  this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen.bind(this));

  this.options_ = {};
  if (this.source_.withCredentials !== undefined) {
    this.options_.withCredentials = this.source_.withCredentials;
  } else if (videojs.options.hls) {
    this.options_.withCredentials = videojs.options.hls.withCredentials;
  }
  this.playlists = new videojs.Hls.PlaylistLoader(this.source_.src, this.options_.withCredentials);

  this.tech_.one('canplay', this.setupFirstPlay.bind(this));

  this.playlists.on('loadedmetadata', function() {
    oldMediaPlaylist = this.playlists.media();

    // if this isn't a live video and preload permits, start
    // downloading segments
    if (oldMediaPlaylist.endList &&
        this.tech_.preload() !== 'metadata' &&
        this.tech_.preload() !== 'none') {
      this.loadingState_ = 'segments';
    }

    this.setupSourceBuffer_();
    this.setupFirstPlay();
    this.fillBuffer();
    this.tech_.trigger('loadedmetadata');
  }.bind(this));

  this.playlists.on('error', function() {
    this.blacklistCurrentPlaylist_(this.playlists.error);
  }.bind(this));

  this.playlists.on('loadedplaylist', function() {
    var updatedPlaylist = this.playlists.media(), seekable;

    if (!updatedPlaylist) {
      // select the initial variant
      this.playlists.media(this.selectPlaylist());
      return;
    }

    this.updateDuration(this.playlists.media());

    // update seekable
    seekable = this.seekable();
    if (this.duration() === Infinity &&
        seekable.length !== 0) {
      this.mediaSource.addSeekableRange_(seekable.start(0), seekable.end(0));
    }

    oldMediaPlaylist = updatedPlaylist;
  }.bind(this));

  this.playlists.on('mediachange', function() {
    this.tech_.trigger({
      type: 'mediachange',
      bubbles: true
    });
  }.bind(this));

  // do nothing if the tech has been disposed already
  // this can occur if someone sets the src in player.ready(), for instance
  if (!this.tech_.el()) {
    return;
  }

  this.tech_.src(videojs.URL.createObjectURL(this.mediaSource));
};

videojs.HlsHandler.prototype.handleSourceOpen = function() {
  // Only attempt to create the source buffer if none already exist.
  // handleSourceOpen is also called when we are "re-opening" a source buffer
  // after `endOfStream` has been called (in response to a seek for instance)
  if (!this.sourceBuffer) {
    this.setupSourceBuffer_();
  }

  // if autoplay is enabled, begin playback. This is duplicative of
  // code in video.js but is required because play() must be invoked
  // *after* the media source has opened.
  // NOTE: moving this invocation of play() after
  // sourceBuffer.appendBuffer() below caused live streams with
  // autoplay to stall
  if (this.tech_.autoplay()) {
    this.play();
  }
};

// Search for a likely end time for the segment that was just appened
// based on the state of the `buffered` property before and after the
// append.
// If we found only one such uncommon end-point return it.
videojs.Hls.findSoleUncommonTimeRangesEnd_ = function(original, update) {
  var
    i, start, end,
    result = [],
    edges = [],
    // In order to qualify as a possible candidate, the end point must:
    //  1) Not have already existed in the `original` ranges
    //  2) Not result from the shrinking of a range that already existed
    //     in the `original` ranges
    //  3) Not be contained inside of a range that existed in `original`
    overlapsCurrentEnd = function(span) {
      return (span[0] <= end && span[1] >= end);
    };

  if (original) {
    // Save all the edges in the `original` TimeRanges object
    for (i = 0; i < original.length; i++) {
      start = original.start(i);
      end = original.end(i);

      edges.push([start, end]);
    }
  }

  if (update) {
    // Save any end-points in `update` that are not in the `original`
    // TimeRanges object
    for (i = 0; i < update.length; i++) {
      start = update.start(i);
      end = update.end(i);

      if (edges.some(overlapsCurrentEnd)) {
        continue;
      }

      // at this point it must be a unique non-shrinking end edge
      result.push(end);
    }
  }

  // we err on the side of caution and return null if didn't find
  // exactly *one* differing end edge in the search above
  if (result.length !== 1) {
    return null;
  }

  return result[0];
};

/**
 * Updates segment with information about its end-point in time and, optionally,
 * the segment duration if we have enough information to determine a segment duration
 * accurately.
 * @param playlist {object} a media playlist object
 * @param segmentIndex {number} the index of segment we last appended
 * @param segmentEnd {number} the known of the segment referenced by segmentIndex
 */
videojs.HlsHandler.prototype.updateSegmentMetadata_ = function(playlist, segmentIndex, segmentEnd) {
  var
    segment,
    previousSegment;

  if (!playlist) {
    return;
  }

  segment = playlist.segments[segmentIndex];
  previousSegment = playlist.segments[segmentIndex - 1];

  if (segmentEnd && segment) {
    segment.end = segmentEnd;

    // fix up segment durations based on segment end data
    if (!previousSegment) {
      // first segment is always has a start time of 0 making its duration
      // equal to the segment end
      segment.duration = segment.end;
    } else if (previousSegment.end) {
      segment.duration = segment.end - previousSegment.end;
    }
  }
};

/**
 * Determines if we should call endOfStream on the media source based on the state
 * of the buffer or if appened segment was the final segment in the playlist.
 * @param playlist {object} a media playlist object
 * @param segmentIndex {number} the index of segment we last appended
 * @param currentBuffered {object} the buffered region that currentTime resides in
 * @return {boolean} whether the calling function should call endOfStream on the MediaSource
 */
videojs.HlsHandler.prototype.isEndOfStream_ = function(playlist, segmentIndex, currentBuffered) {
  var
    segments = playlist.segments,
    appendedLastSegment,
    bufferedToEnd;

  if (!playlist) {
    return false;
  }

  // determine a few boolean values to help make the branch below easier
  // to read
  appendedLastSegment = (segmentIndex === segments.length - 1);
  bufferedToEnd = (currentBuffered.length &&
    segments[segments.length - 1].end <= currentBuffered.end(0));

  // if we've buffered to the end of the video, we need to call endOfStream
  // so that MediaSources can trigger the `ended` event when it runs out of
  // buffered data instead of waiting for me
  return playlist.endList &&
    this.mediaSource.readyState === 'open' &&
    (appendedLastSegment || bufferedToEnd);
};

var parseCodecs = function(codecs) {
  var result = {
    codecCount: 0,
    videoCodec: null,
    audioProfile: null
  };

  result.codecCount = codecs.split(',').length;
  result.codecCount = result.codecCount || 2;

  // parse the video codec but ignore the version
  result.videoCodec = /(^|\s|,)+(avc1)[^ ,]*/i.exec(codecs);
  result.videoCodec = result.videoCodec && result.videoCodec[2];

  // parse the last field of the audio codec
  result.audioProfile = /(^|\s|,)+mp4a.\d+\.(\d+)/i.exec(codecs);
  result.audioProfile = result.audioProfile && result.audioProfile[2];

  return result;
};

/**
 * Blacklist playlists that are known to be codec or
 * stream-incompatible with the SourceBuffer configuration. For
 * instance, Media Source Extensions would cause the video element to
 * stall waiting for video data if you switched from a variant with
 * video and audio to an audio-only one.
 *
 * @param media {object} a media playlist compatible with the current
 * set of SourceBuffers. Variants in the current master playlist that
 * do not appear to have compatible codec or stream configurations
 * will be excluded from the default playlist selection algorithm
 * indefinitely.
 */
videojs.HlsHandler.prototype.excludeIncompatibleVariants_ = function(media) {
  var
    master = this.playlists.master,
    codecCount = 2,
    videoCodec = null,
    audioProfile = null,
    codecs;

  if (media.attributes && media.attributes.CODECS) {
    codecs = parseCodecs(media.attributes.CODECS);
    videoCodec = codecs.videoCodec;
    audioProfile = codecs.audioProfile;
    codecCount = codecs.codecCount;
  }
  master.playlists.forEach(function(variant) {
    var variantCodecs = {
      codecCount: 2,
      videoCodec: null,
      audioProfile: null
    };

    if (variant.attributes && variant.attributes.CODECS) {
      variantCodecs = parseCodecs(variant.attributes.CODECS);
    }

    // if the streams differ in the presence or absence of audio or
    // video, they are incompatible
    if (variantCodecs.codecCount !== codecCount) {
      variant.excludeUntil = Infinity;
    }

    // if h.264 is specified on the current playlist, some flavor of
    // it must be specified on all compatible variants
    if (variantCodecs.videoCodec !== videoCodec) {
      variant.excludeUntil = Infinity;
    }
    // HE-AAC ("mp4a.40.5") is incompatible with all other versions of
    // AAC audio in Chrome 46. Don't mix the two.
    if ((variantCodecs.audioProfile === '5' && audioProfile !== '5') ||
        (audioProfile === '5' && variantCodecs.audioProfile !== '5')) {
      variant.excludeUntil = Infinity;
    }
  });
};

videojs.HlsHandler.prototype.setupSourceBuffer_ = function() {
  var media = this.playlists.media(), mimeType;

  // wait until a media playlist is available and the Media Source is
  // attached
  if (!media || this.mediaSource.readyState !== 'open') {
    return;
  }

  // if the codecs were explicitly specified, pass them along to the
  // source buffer
  mimeType = 'video/mp2t';
  if (media.attributes && media.attributes.CODECS) {
    mimeType += '; codecs="' + media.attributes.CODECS + '"';
  }
  this.sourceBuffer = this.mediaSource.addSourceBuffer(mimeType);

  // exclude any incompatible variant streams from future playlist
  // selection
  this.excludeIncompatibleVariants_(media);

  // transition the sourcebuffer to the ended state if we've hit the end of
  // the playlist
  this.sourceBuffer.addEventListener('updateend', this.updateEndHandler_.bind(this));
};

/**
 * Seek to the latest media position if this is a live video and the
 * player and video are loaded and initialized.
 */
videojs.HlsHandler.prototype.setupFirstPlay = function() {
  var seekable, media;
  media = this.playlists.media();


  // check that everything is ready to begin buffering

  // 1) the video is a live stream of unknown duration
  if (this.duration() === Infinity &&

      // 2) the player has not played before and is not paused
      this.tech_.played().length === 0 &&
      !this.tech_.paused() &&

      // 3) the Media Source and Source Buffers are ready
      this.sourceBuffer &&

      // 4) the active media playlist is available
      media &&

      // 5) the video element or flash player is in a readyState of
      // at least HAVE_FUTURE_DATA
      this.tech_.readyState() >= 1) {

    // trigger the playlist loader to start "expired time"-tracking
    this.playlists.trigger('firstplay');

    // seek to the latest media position for live videos
    seekable = this.seekable();
    if (seekable.length) {
      this.tech_.setCurrentTime(seekable.end(0));
    }
  }
};

/**
 * Begin playing the video.
 */
videojs.HlsHandler.prototype.play = function() {
  this.loadingState_ = 'segments';

  if (this.tech_.ended()) {
    this.tech_.setCurrentTime(0);
  }

  if (this.tech_.played().length === 0) {
    return this.setupFirstPlay();
  }

  // if the viewer has paused and we fell out of the live window,
  // seek forward to the earliest available position
  if (this.duration() === Infinity) {
    if (this.tech_.currentTime() < this.seekable().start(0)) {
      this.tech_.setCurrentTime(this.seekable().start(0));
    }
  }
};

videojs.HlsHandler.prototype.setCurrentTime = function(currentTime) {
  var
    buffered = this.findBufferedRange_();

  if (!(this.playlists && this.playlists.media())) {
    // return immediately if the metadata is not ready yet
    return 0;
  }

  // it's clearly an edge-case but don't thrown an error if asked to
  // seek within an empty playlist
  if (!this.playlists.media().segments) {
    return 0;
  }

  // if the seek location is already buffered, continue buffering as
  // usual
  if (buffered && buffered.length) {
    return currentTime;
  }

  // if we are in the middle of appending a segment, let it finish up
  if (this.pendingSegment_ && this.pendingSegment_.buffered) {
    return currentTime;
  }

  this.lastSegmentLoaded_ = null;

  // cancel outstanding requests and buffer appends
  this.cancelSegmentXhr();

  // abort outstanding key requests, if necessary
  if (this.keyXhr_) {
    this.keyXhr_.aborted = true;
    this.cancelKeyXhr();
  }

  // begin filling the buffer at the new position
  this.fillBuffer(this.playlists.getMediaIndexForTime_(currentTime));
};

videojs.HlsHandler.prototype.duration = function() {
  var
    playlists = this.playlists;

  if (!playlists) {
    return 0;
  }

  if (this.mediaSource) {
    return this.mediaSource.duration;
  }

  return videojs.Hls.Playlist.duration(playlists.media());
};

videojs.HlsHandler.prototype.seekable = function() {
  var media, seekable;

  if (!this.playlists) {
    return videojs.createTimeRanges();
  }
  media = this.playlists.media();
  if (!media) {
    return videojs.createTimeRanges();
  }

  seekable = videojs.Hls.Playlist.seekable(media);
  if (seekable.length === 0) {
    return seekable;
  }

  // if the seekable start is zero, it may be because the player has
  // been paused for a long time and stopped buffering. in that case,
  // fall back to the playlist loader's running estimate of expired
  // time
  if (seekable.start(0) === 0) {
   return videojs.createTimeRanges([[
      this.playlists.expired_,
      this.playlists.expired_ + seekable.end(0)
    ]]);
  }

  // seekable has been calculated based on buffering video data so it
  // can be returned directly
  return seekable;
};

/**
 * Update the player duration
 */
videojs.HlsHandler.prototype.updateDuration = function(playlist) {
  var oldDuration = this.mediaSource.duration,
      newDuration = videojs.Hls.Playlist.duration(playlist),
      buffered = this.tech_.buffered(),
      setDuration = function() {
        this.mediaSource.duration = newDuration;
        this.tech_.trigger('durationchange');

        this.mediaSource.removeEventListener('sourceopen', setDuration);
      }.bind(this);

  if (buffered.length > 0) {
    newDuration = Math.max(newDuration, buffered.end(buffered.length - 1));
  }

  // if the duration has changed, invalidate the cached value
  if (oldDuration !== newDuration) {
    // update the duration
    if (this.mediaSource.readyState !== 'open') {
      this.mediaSource.addEventListener('sourceopen', setDuration);
    } else if (!this.sourceBuffer || !this.sourceBuffer.updating) {
      this.mediaSource.duration = newDuration;
      this.tech_.trigger('durationchange');
    }
  }
};

/**
 * Clear all buffers and reset any state relevant to the current
 * source. After this function is called, the tech should be in a
 * state suitable for switching to a different video.
 */
videojs.HlsHandler.prototype.resetSrc_ = function() {
  this.cancelSegmentXhr();
  this.cancelKeyXhr();

  if (this.sourceBuffer && this.mediaSource.readyState === 'open') {
    this.sourceBuffer.abort();
  }
};

videojs.HlsHandler.prototype.cancelKeyXhr = function() {
  if (this.keyXhr_) {
    this.keyXhr_.onreadystatechange = null;
    this.keyXhr_.abort();
    this.keyXhr_ = null;
  }
};

videojs.HlsHandler.prototype.cancelSegmentXhr = function() {
  if (this.segmentXhr_) {
    // Prevent error handler from running.
    this.segmentXhr_.onreadystatechange = null;
    this.segmentXhr_.abort();
    this.segmentXhr_ = null;
  }

  // clear out the segment being processed
  this.pendingSegment_ = null;
};

/**
 * Returns the CSS value for the specified property on an element
 * using `getComputedStyle`. Firefox has a long-standing issue where
 * getComputedStyle() may return null when running in an iframe with
 * `display: none`.
 * @see https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
safeGetComputedStyle = function(el, property) {
  var result;
  if (!el) {
    return '';
  }

  result = getComputedStyle(el);
  if (!result) {
    return '';
  }

  return result[property];
};

/**
 * Abort all outstanding work and cleanup.
 */
videojs.HlsHandler.prototype.dispose = function() {
  this.stopCheckingBuffer_();

  if (this.playlists) {
    this.playlists.dispose();
  }

  this.resetSrc_();
  Component.prototype.dispose.call(this);
};

/**
 * Chooses the appropriate media playlist based on the current
 * bandwidth estimate and the player size.
 * @return the highest bitrate playlist less than the currently detected
 * bandwidth, accounting for some amount of bandwidth variance
 */
videojs.HlsHandler.prototype.selectPlaylist = function () {
  var
    effectiveBitrate,
    sortedPlaylists = this.playlists.master.playlists.slice(),
    bandwidthPlaylists = [],
    now = +new Date(),
    i,
    variant,
    bandwidthBestVariant,
    resolutionPlusOne,
    resolutionBestVariant,
    width,
    height;

  sortedPlaylists.sort(videojs.Hls.comparePlaylistBandwidth);

  // filter out any playlists that have been excluded due to
  // incompatible configurations or playback errors
  sortedPlaylists = sortedPlaylists.filter(function(variant) {
    if (variant.excludeUntil !== undefined) {
      return now >= variant.excludeUntil;
    }
    return true;
  });

  // filter out any variant that has greater effective bitrate
  // than the current estimated bandwidth
  i = sortedPlaylists.length;
  while (i--) {
    variant = sortedPlaylists[i];

    // ignore playlists without bandwidth information
    if (!variant.attributes || !variant.attributes.BANDWIDTH) {
      continue;
    }

    effectiveBitrate = variant.attributes.BANDWIDTH * bandwidthVariance;

    if (effectiveBitrate < this.bandwidth) {
      bandwidthPlaylists.push(variant);

      // since the playlists are sorted in ascending order by
      // bandwidth, the first viable variant is the best
      if (!bandwidthBestVariant) {
        bandwidthBestVariant = variant;
      }
    }
  }

  i = bandwidthPlaylists.length;

  // sort variants by resolution
  bandwidthPlaylists.sort(videojs.Hls.comparePlaylistResolution);

  // forget our old variant from above, or we might choose that in high-bandwidth scenarios
  // (this could be the lowest bitrate rendition as  we go through all of them above)
  variant = null;

  width = parseInt(safeGetComputedStyle(this.tech_.el(), 'width'), 10);
  height = parseInt(safeGetComputedStyle(this.tech_.el(), 'height'), 10);

  // iterate through the bandwidth-filtered playlists and find
  // best rendition by player dimension
  while (i--) {
    variant = bandwidthPlaylists[i];

    // ignore playlists without resolution information
    if (!variant.attributes ||
        !variant.attributes.RESOLUTION ||
        !variant.attributes.RESOLUTION.width ||
        !variant.attributes.RESOLUTION.height) {
      continue;
    }

    // since the playlists are sorted, the first variant that has
    // dimensions less than or equal to the player size is the best

    if (variant.attributes.RESOLUTION.width === width &&
        variant.attributes.RESOLUTION.height === height) {
      // if we have the exact resolution as the player use it
      resolutionPlusOne = null;
      resolutionBestVariant = variant;
      break;
    } else if (variant.attributes.RESOLUTION.width < width &&
        variant.attributes.RESOLUTION.height < height) {
      // if both dimensions are less than the player use the
      // previous (next-largest) variant
      break;
    } else if (!resolutionPlusOne ||
               (variant.attributes.RESOLUTION.width < resolutionPlusOne.attributes.RESOLUTION.width &&
                variant.attributes.RESOLUTION.height < resolutionPlusOne.attributes.RESOLUTION.height)) {
      // If we still haven't found a good match keep a
      // reference to the previous variant for the next loop
      // iteration

      // By only saving variants if they are smaller than the
      // previously saved variant, we ensure that we also pick
      // the highest bandwidth variant that is just-larger-than
      // the video player
      resolutionPlusOne = variant;
    }
  }

  // fallback chain of variants
  return resolutionPlusOne || resolutionBestVariant || bandwidthBestVariant || sortedPlaylists[0];
};

/**
 * Periodically request new segments and append video data.
 */
videojs.HlsHandler.prototype.checkBuffer_ = function() {
  // calling this method directly resets any outstanding buffer checks
  if (this.checkBufferTimeout_) {
    window.clearTimeout(this.checkBufferTimeout_);
    this.checkBufferTimeout_ = null;
  }

  this.fillBuffer();
  this.drainBuffer();

  // wait awhile and try again
  this.checkBufferTimeout_ = window.setTimeout((this.checkBuffer_).bind(this),
                                               bufferCheckInterval);
};

/**
 * Setup a periodic task to request new segments if necessary and
 * append bytes into the SourceBuffer.
 */
videojs.HlsHandler.prototype.startCheckingBuffer_ = function() {
  this.checkBuffer_();
};

/**
 * Stop the periodic task requesting new segments and feeding the
 * SourceBuffer.
 */
videojs.HlsHandler.prototype.stopCheckingBuffer_ = function() {
  if (this.checkBufferTimeout_) {
    window.clearTimeout(this.checkBufferTimeout_);
    this.checkBufferTimeout_ = null;
  }
};

var filterBufferedRanges = function(predicate) {
  return function(time) {
    var
      i,
      ranges = [],
      tech = this.tech_,
      // !!The order of the next two assignments is important!!
      // `currentTime` must be equal-to or greater-than the start of the
      // buffered range. Flash executes out-of-process so, every value can
      // change behind the scenes from line-to-line. By reading `currentTime`
      // after `buffered`, we ensure that it is always a current or later
      // value during playback.
      buffered = tech.buffered();


    if (time === undefined) {
      time = tech.currentTime();
    }

    // IE 11 has a bug where it will report a the video as fully buffered
    // before any data has been loaded. This is a work around where we
    // report a fully empty buffer until SourceBuffers have been created
    // which is after a segment has been loaded and transmuxed.
    if (!this.mediaSource ||
        !this.mediaSource.mediaSource_ ||
        !this.mediaSource.mediaSource_.sourceBuffers.length) {
      return videojs.createTimeRanges([]);
    }

    if (buffered && buffered.length) {
      // Search for a range containing the play-head
      for (i = 0; i < buffered.length; i++) {
        if (predicate(buffered.start(i), buffered.end(i), time)) {
          ranges.push([buffered.start(i), buffered.end(i)]);
        }
      }
    }

    return videojs.createTimeRanges(ranges);
  };
};

/**
 * Attempts to find the buffered TimeRange that contains the specified
 * time, or where playback is currently happening if no specific time
 * is specified.
 * @param time (optional) {number} the time to filter on. Defaults to
 * currentTime.
 * @return a new TimeRanges object.
 */
videojs.HlsHandler.prototype.findBufferedRange_ = filterBufferedRanges(function(start, end, time) {
  return start - TIME_FUDGE_FACTOR <= time &&
    end + TIME_FUDGE_FACTOR >= time;
});

/**
 * Returns the TimeRanges that begin at or later than the specified
 * time.
 * @param time (optional) {number} the time to filter on. Defaults to
 * currentTime.
 * @return a new TimeRanges object.
 */
videojs.HlsHandler.prototype.findNextBufferedRange_ = filterBufferedRanges(function(start, end, time) {
  return start - TIME_FUDGE_FACTOR >= time;
});

/**
 * Determines whether there is enough video data currently in the buffer
 * and downloads a new segment if the buffered time is less than the goal.
 * @param seekToTime (optional) {number} the offset into the downloaded segment
 * to seek to, in seconds
 */
videojs.HlsHandler.prototype.fillBuffer = function(mediaIndex) {
  var
    tech = this.tech_,
    currentTime = tech.currentTime(),
    hasBufferedContent = (this.tech_.buffered().length !== 0),
    currentBuffered = this.findBufferedRange_(),
    outsideBufferedRanges = !(currentBuffered && currentBuffered.length),
    currentBufferedEnd = 0,
    bufferedTime = 0,
    segment,
    segmentInfo,
    segmentTimestampOffset;

  // if preload is set to "none", do not download segments until playback is requested
  if (this.loadingState_ !== 'segments') {
    return;
  }

  // if a video has not been specified, do nothing
  if (!tech.currentSrc() || !this.playlists) {
    return;
  }

  // if there is a request already in flight, do nothing
  if (this.segmentXhr_) {
    return;
  }

  // wait until the buffer is up to date
  if (this.pendingSegment_) {
    return;
  }

  // if no segments are available, do nothing
  if (this.playlists.state === "HAVE_NOTHING" ||
      !this.playlists.media() ||
      !this.playlists.media().segments) {
    return;
  }

  // if a playlist switch is in progress, wait for it to finish
  if (this.playlists.state === 'SWITCHING_MEDIA') {
    return;
  }

  if (mediaIndex === undefined) {
    if (currentBuffered && currentBuffered.length) {
      currentBufferedEnd = currentBuffered.end(0);
      mediaIndex = this.playlists.getMediaIndexForTime_(currentBufferedEnd);
      bufferedTime = Math.max(0, currentBufferedEnd - currentTime);

      // if there is plenty of content in the buffer and we're not
      // seeking, relax for awhile
      if (bufferedTime >= videojs.Hls.GOAL_BUFFER_LENGTH) {
        return;
      }
    } else {
      mediaIndex = this.playlists.getMediaIndexForTime_(this.tech_.currentTime());
    }
  }
  segment = this.playlists.media().segments[mediaIndex];

  // if the video has finished downloading
  if (!segment) {
    return;
  }

  // we have entered a state where we are fetching the same segment,
  // try to walk forward
  if (this.lastSegmentLoaded_ &&
      this.playlistUriToUrl(this.lastSegmentLoaded_.uri) === this.playlistUriToUrl(segment.uri) &&
      this.lastSegmentLoaded_.byterange === segment.byterange) {
    return this.fillBuffer(mediaIndex + 1);
  }

  // package up all the work to append the segment
  segmentInfo = {
    // resolve the segment URL relative to the playlist
    uri: this.playlistUriToUrl(segment.uri),
    // the segment's mediaIndex & mediaSequence at the time it was requested
    mediaIndex: mediaIndex,
    mediaSequence: this.playlists.media().mediaSequence,
    // the segment's playlist
    playlist: this.playlists.media(),
    // The state of the buffer when this segment was requested
    currentBufferedEnd: currentBufferedEnd,
    // unencrypted bytes of the segment
    bytes: null,
    // when a key is defined for this segment, the encrypted bytes
    encryptedBytes: null,
    // optionally, the decrypter that is unencrypting the segment
    decrypter: null,
    // the state of the buffer before a segment is appended will be
    // stored here so that the actual segment duration can be
    // determined after it has been appended
    buffered: null,
    // The target timestampOffset for this segment when we append it
    // to the source buffer
    timestampOffset: null
  };

  if (mediaIndex > 0) {
    segmentTimestampOffset = videojs.Hls.Playlist.duration(segmentInfo.playlist,
      segmentInfo.playlist.mediaSequence + mediaIndex) + this.playlists.expired_;
  }

  if (this.tech_.seeking() && outsideBufferedRanges) {
    // If there are discontinuities in the playlist, we can't be sure of anything
    // related to time so we reset the timestamp offset and start appending data
    // anew on every seek
    if (segmentInfo.playlist.discontinuityStarts.length) {
      segmentInfo.timestampOffset = segmentTimestampOffset;
    }
  } else if (segment.discontinuity && currentBuffered.length) {
    // If we aren't seeking and are crossing a discontinuity, we should set
    // timestampOffset for new segments to be appended the end of the current
    // buffered time-range
    segmentInfo.timestampOffset = currentBuffered.end(0);
  } else if (!hasBufferedContent && this.tech_.currentTime() > 0.05) {
    // If we are trying to play at a position that is not zero but we aren't
    // currently seeking according to the video element
    segmentInfo.timestampOffset = segmentTimestampOffset;
  }

  this.loadSegment(segmentInfo);
};

videojs.HlsHandler.prototype.playlistUriToUrl = function(segmentRelativeUrl) {
  var playListUrl;
    // resolve the segment URL relative to the playlist
  if (this.playlists.media().uri === this.source_.src) {
    playListUrl = resolveUrl(this.source_.src, segmentRelativeUrl);
  } else {
    playListUrl = resolveUrl(resolveUrl(this.source_.src, this.playlists.media().uri || ''), segmentRelativeUrl);
  }
  return playListUrl;
};

/*  Turns segment byterange into a string suitable for use in
 *  HTTP Range requests
 */
videojs.HlsHandler.prototype.byterangeStr_ = function(byterange) {
    var byterangeStart, byterangeEnd;

    // `byterangeEnd` is one less than `offset + length` because the HTTP range
    // header uses inclusive ranges
    byterangeEnd = byterange.offset + byterange.length - 1;
    byterangeStart = byterange.offset;
    return "bytes=" + byterangeStart + "-" + byterangeEnd;
};

/*  Defines headers for use in the xhr request for a particular segment.
 */
videojs.HlsHandler.prototype.segmentXhrHeaders_ = function(segment) {
  var headers = {};
  if ('byterange' in segment) {
      headers['Range'] = this.byterangeStr_(segment.byterange);
  }
  return headers;
};

/*
 * Sets `bandwidth`, `segmentXhrTime`, and appends to the `bytesReceived.
 * Expects an object with:
 *  * `roundTripTime` - the round trip time for the request we're setting the time for
 *  * `bandwidth` - the bandwidth we want to set
 *  * `bytesReceived` - amount of bytes downloaded
 * `bandwidth` is the only required property.
 */
videojs.HlsHandler.prototype.setBandwidth = function(xhr) {
  // calculate the download bandwidth
  this.segmentXhrTime = xhr.roundTripTime;
  this.bandwidth = xhr.bandwidth;
  this.bytesReceived += xhr.bytesReceived || 0;

  this.tech_.trigger('bandwidthupdate');
};

/*
 * Blacklists a playlist when an error occurs for a set amount of time
 * making it unavailable for selection by the rendition selection algorithm
 * and then forces a new playlist (rendition) selection.
 */
videojs.HlsHandler.prototype.blacklistCurrentPlaylist_ = function(error) {
  var currentPlaylist, nextPlaylist;

  // If the `error` was generated by the playlist loader, it will contain
  // the playlist we were trying to load (but failed) and that should be
  // blacklisted instead of the currently selected playlist which is likely
  // out-of-date in this scenario
  currentPlaylist = error.playlist || this.playlists.media();

  // If there is no current playlist, then an error occurred while we were
  // trying to load the master OR while we were disposing of the tech
  if (!currentPlaylist) {
    this.error = error;
    return this.mediaSource.endOfStream('network');
  }

  // Blacklist this playlist
  currentPlaylist.excludeUntil = Date.now() + blacklistDuration;

  // Select a new playlist
  nextPlaylist = this.selectPlaylist();

  if (nextPlaylist) {
    videojs.log.warn('Problem encountered with the current HLS playlist. Switching to another playlist.');

    return this.playlists.media(nextPlaylist);
  } else {
    videojs.log.warn('Problem encountered with the current HLS playlist. No suitable alternatives found.');
    // We have no more playlists we can select so we must fail
    this.error = error;
    return this.mediaSource.endOfStream('network');
  }
};

videojs.HlsHandler.prototype.loadSegment = function(segmentInfo) {
  var
    self = this,
    segment = segmentInfo.playlist.segments[segmentInfo.mediaIndex],
    removeToTime = 0,
    seekable = this.seekable(),
    currentTime = this.tech_.currentTime();

  // Chrome has a hard limit of 150mb of buffer and a very conservative "garbage collector"
  // We manually clear out the old buffer to ensure we don't trigger the QuotaExceeded error
  // on the source buffer during subsequent appends
  if (this.sourceBuffer && !this.sourceBuffer.updating) {
    // If we have a seekable range use that as the limit for what can be removed safely
    // otherwise remove anything older than 1 minute before the current play head
    if (seekable.length && seekable.start(0) > 0 && seekable.start(0) < currentTime) {
      removeToTime = seekable.start(0);
    } else {
      removeToTime = currentTime - 60;
    }

    if (removeToTime > 0) {
      this.sourceBuffer.remove(0, removeToTime);
    }
  }

  // if the segment is encrypted, request the key
  if (segment.key) {
    this.fetchKey_(segment);
  }

  // request the next segment
  this.segmentXhr_ = videojs.Hls.xhr({
    uri: segmentInfo.uri,
    responseType: 'arraybuffer',
    withCredentials: this.source_.withCredentials,
    // Set xhr timeout to 150% of the segment duration to allow us
    // some time to switch renditions in the event of a catastrophic
    // decrease in network performance or a server issue.
    timeout: (segment.duration * 1.5) * 1000,
    headers: this.segmentXhrHeaders_(segment)
  }, function(error, request) {
    // This is a timeout of a previously aborted segment request
    // so simply ignore it
    if (!self.segmentXhr_ || request !== self.segmentXhr_) {
      return;
    }

    // the segment request is no longer outstanding
    self.segmentXhr_ = null;

    // if a segment request times out, we may have better luck with another playlist
    if (request.timedout) {
      self.bandwidth = 1;
      return self.playlists.media(self.selectPlaylist());
    }

    // otherwise, trigger a network error
    if (!request.aborted && error) {
      return self.blacklistCurrentPlaylist_({
        status: request.status,
        message: 'HLS segment request error at URL: ' + segmentInfo.uri,
        code: (request.status >= 500) ? 4 : 2
      });
    }

    // stop processing if the request was aborted
    if (!request.response) {
      return;
    }

    self.lastSegmentLoaded_ = segment;
    self.setBandwidth(request);

    if (segment.key) {
      segmentInfo.encryptedBytes = new Uint8Array(request.response);
    } else {
      segmentInfo.bytes = new Uint8Array(request.response);
    }

    self.pendingSegment_ = segmentInfo;

    self.tech_.trigger('progress');
    self.drainBuffer();

    // figure out what stream the next segment should be downloaded from
    // with the updated bandwidth information
    self.playlists.media(self.selectPlaylist());
  });

};

videojs.HlsHandler.prototype.drainBuffer = function() {
  var
    segmentInfo,
    mediaIndex,
    playlist,
    offset,
    bytes,
    segment,
    decrypter,
    segIv;

  // if the buffer is empty or the source buffer hasn't been created
  // yet, do nothing
  if (!this.pendingSegment_ || !this.sourceBuffer) {
    return;
  }

  // the pending segment has already been appended and we're waiting
  // for updateend to fire
  if (this.pendingSegment_.buffered) {
    return;
  }

  // we can't append more data if the source buffer is busy processing
  // what we've already sent
  if (this.sourceBuffer.updating) {
    return;
  }

  segmentInfo = this.pendingSegment_;
  mediaIndex = segmentInfo.mediaIndex;
  playlist = segmentInfo.playlist;
  offset = segmentInfo.offset;
  bytes = segmentInfo.bytes;
  segment = playlist.segments[mediaIndex];

  if (segment.key && !bytes) {
    // this is an encrypted segment
    // if the key download failed, we want to skip this segment
    // but if the key hasn't downloaded yet, we want to try again later
    if (keyFailed(segment.key)) {
      return this.blacklistCurrentPlaylist_({
        message: 'HLS segment key request error.',
        code: 4
      });
    } else if (!segment.key.bytes) {

      // waiting for the key bytes, try again later
      return;
    } else if (segmentInfo.decrypter) {

      // decryption is in progress, try again later
      return;
    } else {

      // if the media sequence is greater than 2^32, the IV will be incorrect
      // assuming 10s segments, that would be about 1300 years
      segIv = segment.key.iv || new Uint32Array([0, 0, 0, mediaIndex + playlist.mediaSequence]);

      // create a decrypter to incrementally decrypt the segment
      decrypter = new videojs.Hls.Decrypter(segmentInfo.encryptedBytes,
                                            segment.key.bytes,
                                            segIv,
                                            function(err, bytes) {
                                              segmentInfo.bytes = bytes;
                                            });
      segmentInfo.decrypter = decrypter;
      return;
    }
  }

  this.pendingSegment_.buffered = this.tech_.buffered();

  if (segmentInfo.timestampOffset !== null) {
    this.sourceBuffer.timestampOffset = segmentInfo.timestampOffset;
  }

  // the segment is asynchronously added to the current buffered data
  this.sourceBuffer.appendBuffer(bytes);
};

videojs.HlsHandler.prototype.updateEndHandler_ = function () {
  var
    segmentInfo = this.pendingSegment_,
    segment,
    segments,
    playlist,
    currentMediaIndex,
    currentBuffered,
    seekable,
    timelineUpdate,
    isEndOfStream;

  // stop here if the update errored or was aborted
  if (!segmentInfo) {
    return;
  }

  // In Firefox, the updateend event is triggered for both removing from the buffer and
  // adding to the buffer. To prevent this code from executing on removals, we wait for
  // segmentInfo to have a filled in buffered value before we continue processing.
  if (!segmentInfo.buffered) {
    return;
  }

  this.pendingSegment_ = null;

  playlist = segmentInfo.playlist;
  segments = playlist.segments;
  currentMediaIndex = segmentInfo.mediaIndex + (segmentInfo.mediaSequence - playlist.mediaSequence);
  currentBuffered = this.findBufferedRange_();
  isEndOfStream = this.isEndOfStream_(playlist, currentMediaIndex, currentBuffered);

  // if we switched renditions don't try to add segment timeline
  // information to the playlist
  if (segmentInfo.playlist.uri !== this.playlists.media().uri) {
    if (isEndOfStream) {
      return this.mediaSource.endOfStream();
    }
    return this.fillBuffer();
  }

  // annotate the segment with any start and end time information
  // added by the media processing
  segment = playlist.segments[currentMediaIndex];

  // when seeking to the beginning of the seekable range, it's
  // possible that imprecise timing information may cause the seek to
  // end up earlier than the start of the range
  // in that case, seek again
  seekable = this.seekable();
  if (this.tech_.seeking() &&
      currentBuffered.length === 0) {
    if (seekable.length &&
        this.tech_.currentTime() < seekable.start(0)) {
      var next = this.findNextBufferedRange_();
      if (next.length) {
        videojs.log('tried seeking to', this.tech_.currentTime(), 'but that was too early, retrying at', next.start(0));
        this.tech_.setCurrentTime(next.start(0) + TIME_FUDGE_FACTOR);
      }
    }
  }

  timelineUpdate = videojs.Hls.findSoleUncommonTimeRangesEnd_(segmentInfo.buffered,
                                                              this.tech_.buffered());

  // Update segment meta-data (duration and end-point) based on timeline
  this.updateSegmentMetadata_(playlist, currentMediaIndex, timelineUpdate);

  // If we decide to signal the end of stream, then we can return instead
  // of trying to fetch more segments
  if (isEndOfStream) {
    return this.mediaSource.endOfStream();
  }

  if (timelineUpdate !== null ||
      segmentInfo.buffered.length !== this.tech_.buffered().length) {
    this.updateDuration(playlist);
    // check if it's time to download the next segment
    this.fillBuffer();
    return;
  }

  // the last segment append must have been entirely in the
  // already buffered time ranges. just buffer forward until we
  // find a segment that adds to the buffered time ranges and
  // improves subsequent media index calculations.
  this.fillBuffer(currentMediaIndex + 1);
  return;
};

/**
 * Attempt to retrieve the key for a particular media segment.
 */
videojs.HlsHandler.prototype.fetchKey_ = function(segment) {
  var key, self, settings, receiveKey;

  // if there is a pending XHR or no segments, don't do anything
  if (this.keyXhr_) {
    return;
  }

  self = this;
  settings = this.options_;

  /**
   * Handle a key XHR response.
   */
  receiveKey = function(key) {
    return function(error, request) {
      var view;
      self.keyXhr_ = null;

      if (error || !request.response || request.response.byteLength !== 16) {
        key.retries = key.retries || 0;
        key.retries++;
        if (!request.aborted) {
          // try fetching again
          self.fetchKey_(segment);
        }
        return;
      }

      view = new DataView(request.response);
      key.bytes = new Uint32Array([
        view.getUint32(0),
        view.getUint32(4),
        view.getUint32(8),
        view.getUint32(12)
      ]);

      // check to see if this allows us to make progress buffering now
      self.checkBuffer_();
    };
  };

  key = segment.key;

  // nothing to do if this segment is unencrypted
  if (!key) {
    return;
  }

  // request the key if the retry limit hasn't been reached
  if (!key.bytes && !keyFailed(key)) {
    this.keyXhr_ = videojs.Hls.xhr({
      uri: this.playlistUriToUrl(key.uri),
      responseType: 'arraybuffer',
      withCredentials: settings.withCredentials
    }, receiveKey(key));
    return;
  }
};

/**
 * Whether the browser has built-in HLS support.
 */
videojs.Hls.supportsNativeHls = (function() {
  var
    video = document.createElement('video'),
    xMpegUrl,
    vndMpeg;

  // native HLS is definitely not supported if HTML5 video isn't
  if (!videojs.getComponent('Html5').isSupported()) {
    return false;
  }

  xMpegUrl = video.canPlayType('application/x-mpegURL');
  vndMpeg = video.canPlayType('application/vnd.apple.mpegURL');
  return (/probably|maybe/).test(xMpegUrl) ||
    (/probably|maybe/).test(vndMpeg);
})();

// HLS is a source handler, not a tech. Make sure attempts to use it
// as one do not cause exceptions.
videojs.Hls.isSupported = function() {
  return videojs.log.warn('HLS is no longer a tech. Please remove it from ' +
                          'your player\'s techOrder.');
};

/**
 * A comparator function to sort two playlist object by bandwidth.
 * @param left {object} a media playlist object
 * @param right {object} a media playlist object
 * @return {number} Greater than zero if the bandwidth attribute of
 * left is greater than the corresponding attribute of right. Less
 * than zero if the bandwidth of right is greater than left and
 * exactly zero if the two are equal.
 */
videojs.Hls.comparePlaylistBandwidth = function(left, right) {
  var leftBandwidth, rightBandwidth;
  if (left.attributes && left.attributes.BANDWIDTH) {
    leftBandwidth = left.attributes.BANDWIDTH;
  }
  leftBandwidth = leftBandwidth || window.Number.MAX_VALUE;
  if (right.attributes && right.attributes.BANDWIDTH) {
    rightBandwidth = right.attributes.BANDWIDTH;
  }
  rightBandwidth = rightBandwidth || window.Number.MAX_VALUE;

  return leftBandwidth - rightBandwidth;
};

/**
 * A comparator function to sort two playlist object by resolution (width).
 * @param left {object} a media playlist object
 * @param right {object} a media playlist object
 * @return {number} Greater than zero if the resolution.width attribute of
 * left is greater than the corresponding attribute of right. Less
 * than zero if the resolution.width of right is greater than left and
 * exactly zero if the two are equal.
 */
videojs.Hls.comparePlaylistResolution = function(left, right) {
  var leftWidth, rightWidth;

  if (left.attributes && left.attributes.RESOLUTION && left.attributes.RESOLUTION.width) {
    leftWidth = left.attributes.RESOLUTION.width;
  }

  leftWidth = leftWidth || window.Number.MAX_VALUE;

  if (right.attributes && right.attributes.RESOLUTION && right.attributes.RESOLUTION.width) {
    rightWidth = right.attributes.RESOLUTION.width;
  }

  rightWidth = rightWidth || window.Number.MAX_VALUE;

  // NOTE - Fallback to bandwidth sort as appropriate in cases where multiple renditions
  // have the same media dimensions/ resolution
  if (leftWidth === rightWidth && left.attributes.BANDWIDTH && right.attributes.BANDWIDTH) {
    return left.attributes.BANDWIDTH - right.attributes.BANDWIDTH;
  } else {
    return leftWidth - rightWidth;
  }
};

/**
 * Constructs a new URI by interpreting a path relative to another
 * URI.
 * @param basePath {string} a relative or absolute URI
 * @param path {string} a path part to combine with the base
 * @return {string} a URI that is equivalent to composing `base`
 * with `path`
 * @see http://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue
 */
resolveUrl = videojs.Hls.resolveUrl = function(basePath, path) {
  // use the base element to get the browser to handle URI resolution
  var
    oldBase = document.querySelector('base'),
    docHead = document.querySelector('head'),
    a = document.createElement('a'),
    base = oldBase,
    oldHref,
    result;

  // prep the document
  if (oldBase) {
    oldHref = oldBase.href;
  } else {
    base = docHead.appendChild(document.createElement('base'));
  }

  base.href = basePath;
  a.href = path;
  result = a.href;

  // clean up
  if (oldBase) {
    oldBase.href = oldHref;
  } else {
    docHead.removeChild(base);
  }
  return result;
};

})(window, window.videojs, document);

(function(videojs) {
  'use strict';

  /**
   * A wrapper for videojs.xhr that tracks bandwidth.
   */
  videojs.Hls.xhr = function(options, callback) {
    // Add a default timeout for all hls requests
    options = videojs.mergeOptions({
       timeout: 45e3
     }, options);

    var request = videojs.xhr(options, function(error, response) {
      if (!error && request.response) {
        request.responseTime = (new Date()).getTime();
        request.roundTripTime = request.responseTime - request.requestTime;
        request.bytesReceived = request.response.byteLength || request.response.length;
        if (!request.bandwidth) {
          request.bandwidth = Math.floor((request.bytesReceived / request.roundTripTime) * 8 * 1000);
        }
      }

      // videojs.xhr now uses a specific code on the error object to signal that a request has
      // timed out errors of setting a boolean on the request object
      if (error || request.timedout) {
        request.timedout = request.timedout || (error.code === 'ETIMEDOUT');
      } else {
        request.timedout = false;
      }

      // videojs.xhr no longer considers status codes outside of 200 and 0
      // (for file uris) to be errors, but the old XHR did, so emulate that
      // behavior. Status 206 may be used in response to byterange requests.
      if (!error &&
           response.statusCode !== 200 &&
           response.statusCode !== 206 &&
           response.statusCode !== 0) {
        error = new Error('XHR Failed with a response of: ' +
          (request && (request.response || request.responseText)));
      }

      callback(error, request);
    });

    request.requestTime = (new Date()).getTime();
    return request;
  };
})(window.videojs);

(function(videojs, undefined) {
  var Stream = function() {
    this.init = function() {
      var listeners = {};
      /**
       * Add a listener for a specified event type.
       * @param type {string} the event name
       * @param listener {function} the callback to be invoked when an event of
       * the specified type occurs
       */
      this.on = function(type, listener) {
        if (!listeners[type]) {
          listeners[type] = [];
        }
        listeners[type].push(listener);
      };
      /**
       * Remove a listener for a specified event type.
       * @param type {string} the event name
       * @param listener {function} a function previously registered for this
       * type of event through `on`
       */
      this.off = function(type, listener) {
        var index;
        if (!listeners[type]) {
          return false;
        }
        index = listeners[type].indexOf(listener);
        listeners[type].splice(index, 1);
        return index > -1;
      };
      /**
       * Trigger an event of the specified type on this stream. Any additional
       * arguments to this function are passed as parameters to event listeners.
       * @param type {string} the event name
       */
      this.trigger = function(type) {
        var callbacks, i, length, args;
        callbacks = listeners[type];
        if (!callbacks) {
          return;
        }
        // Slicing the arguments on every invocation of this method
        // can add a significant amount of overhead. Avoid the
        // intermediate object creation for the common case of a
        // single callback argument
        if (arguments.length === 2) {
          length = callbacks.length;
          for (i = 0; i < length; ++i) {
            callbacks[i].call(this, arguments[1]);
          }
        } else {
          args = Array.prototype.slice.call(arguments, 1);
          length = callbacks.length;
          for (i = 0; i < length; ++i) {
            callbacks[i].apply(this, args);
          }
        }
      };
      /**
       * Destroys the stream and cleans up.
       */
      this.dispose = function() {
        listeners = {};
      };
    };
  };
  /**
   * Forwards all `data` events on this stream to the destination stream. The
   * destination stream should provide a method `push` to receive the data
   * events as they arrive.
   * @param destination {stream} the stream that will receive all `data` events
   * @see http://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
   */
  Stream.prototype.pipe = function(destination) {
    this.on('data', function(data) {
      destination.push(data);
    });
  };

  videojs.Hls.Stream = Stream;
})(window.videojs);

(function(videojs, parseInt, isFinite, mergeOptions, undefined) {
  var
    noop = function() {},

    // "forgiving" attribute list psuedo-grammar:
    // attributes -> keyvalue (',' keyvalue)*
    // keyvalue   -> key '=' value
    // key        -> [^=]*
    // value      -> '"' [^"]* '"' | [^,]*
    attributeSeparator = (function() {
      var
        key = '[^=]*',
        value = '"[^"]*"|[^,]*',
        keyvalue = '(?:' + key + ')=(?:' + value + ')';

      return new RegExp('(?:^|,)(' + keyvalue + ')');
    })(),
    parseAttributes = function(attributes) {
      var
        // split the string using attributes as the separator
        attrs = attributes.split(attributeSeparator),
        i = attrs.length,
        result = {},
        attr;

      while (i--) {
        // filter out unmatched portions of the string
        if (attrs[i] === '') {
          continue;
        }

        // split the key and value
        attr = /([^=]*)=(.*)/.exec(attrs[i]).slice(1);
        // trim whitespace and remove optional quotes around the value
        attr[0] = attr[0].replace(/^\s+|\s+$/g, '');
        attr[1] = attr[1].replace(/^\s+|\s+$/g, '');
        attr[1] = attr[1].replace(/^['"](.*)['"]$/g, '$1');
        result[attr[0]] = attr[1];
      }
      return result;
    },
    Stream = videojs.Hls.Stream,
    LineStream,
    ParseStream,
    Parser;

  /**
   * A stream that buffers string input and generates a `data` event for each
   * line.
   */
  LineStream = function() {
    var buffer = '';
    LineStream.prototype.init.call(this);

    /**
     * Add new data to be parsed.
     * @param data {string} the text to process
     */
    this.push = function(data) {
      var nextNewline;

      buffer += data;
      nextNewline = buffer.indexOf('\n');

      for (; nextNewline > -1; nextNewline = buffer.indexOf('\n')) {
        this.trigger('data', buffer.substring(0, nextNewline));
        buffer = buffer.substring(nextNewline + 1);
      }
    };
  };
  LineStream.prototype = new Stream();

  /**
   * A line-level M3U8 parser event stream. It expects to receive input one
   * line at a time and performs a context-free parse of its contents. A stream
   * interpretation of a manifest can be useful if the manifest is expected to
   * be too large to fit comfortably into memory or the entirety of the input
   * is not immediately available. Otherwise, it's probably much easier to work
   * with a regular `Parser` object.
   *
   * Produces `data` events with an object that captures the parser's
   * interpretation of the input. That object has a property `tag` that is one
   * of `uri`, `comment`, or `tag`. URIs only have a single additional
   * property, `line`, which captures the entirety of the input without
   * interpretation. Comments similarly have a single additional property
   * `text` which is the input without the leading `#`.
   *
   * Tags always have a property `tagType` which is the lower-cased version of
   * the M3U8 directive without the `#EXT` or `#EXT-X-` prefix. For instance,
   * `#EXT-X-MEDIA-SEQUENCE` becomes `media-sequence` when parsed. Unrecognized
   * tags are given the tag type `unknown` and a single additional property
   * `data` with the remainder of the input.
   */
  ParseStream = function() {
    ParseStream.prototype.init.call(this);
  };
  ParseStream.prototype = new Stream();
  /**
   * Parses an additional line of input.
   * @param line {string} a single line of an M3U8 file to parse
   */
  ParseStream.prototype.push = function(line) {
    var match, event;

    //strip whitespace
    line = line.replace(/^[\u0000\s]+|[\u0000\s]+$/g, '');
    if (line.length === 0) {
      // ignore empty lines
      return;
    }

    // URIs
    if (line[0] !== '#') {
      this.trigger('data', {
        type: 'uri',
        uri: line
      });
      return;
    }

    // Comments
    if (line.indexOf('#EXT') !== 0) {
      this.trigger('data', {
        type: 'comment',
        text: line.slice(1)
      });
      return;
    }

    //strip off any carriage returns here so the regex matching
    //doesn't have to account for them.
    line = line.replace('\r','');

    // Tags
    match = /^#EXTM3U/.exec(line);
    if (match) {
      this.trigger('data', {
        type: 'tag',
        tagType: 'm3u'
      });
      return;
    }
    match = (/^#EXTINF:?([0-9\.]*)?,?(.*)?$/).exec(line);
    if (match) {
      event = {
        type: 'tag',
        tagType: 'inf'
      };
      if (match[1]) {
        event.duration = parseFloat(match[1]);
      }
      if (match[2]) {
        event.title = match[2];
      }
      this.trigger('data', event);
      return;
    }
    match = (/^#EXT-X-TARGETDURATION:?([0-9.]*)?/).exec(line);
    if (match) {
      event = {
        type: 'tag',
        tagType: 'targetduration'
      };
      if (match[1]) {
        event.duration = parseInt(match[1], 10);
      }
      this.trigger('data', event);
      return;
    }
    match = (/^#ZEN-TOTAL-DURATION:?([0-9.]*)?/).exec(line);
    if (match) {
      event = {
        type: 'tag',
        tagType: 'totalduration'
      };
      if (match[1]) {
        event.duration = parseInt(match[1], 10);
      }
      this.trigger('data', event);
      return;
    }
    match = (/^#EXT-X-VERSION:?([0-9.]*)?/).exec(line);
    if (match) {
      event = {
        type: 'tag',
        tagType: 'version'
      };
      if (match[1]) {
        event.version = parseInt(match[1], 10);
      }
      this.trigger('data', event);
      return;
    }
    match = (/^#EXT-X-MEDIA-SEQUENCE:?(\-?[0-9.]*)?/).exec(line);
    if (match) {
      event = {
        type: 'tag',
        tagType: 'media-sequence'
      };
      if (match[1]) {
        event.number = parseInt(match[1], 10);
      }
      this.trigger('data', event);
      return;
    }
    match = (/^#EXT-X-DISCONTINUITY-SEQUENCE:?(\-?[0-9.]*)?/).exec(line);
    if (match) {
      event = {
        type: 'tag',
        tagType: 'discontinuity-sequence'
      };
      if (match[1]) {
        event.number = parseInt(match[1], 10);
      }
      this.trigger('data', event);
      return;
    }
    match = (/^#EXT-X-PLAYLIST-TYPE:?(.*)?$/).exec(line);
    if (match) {
      event = {
        type: 'tag',
        tagType: 'playlist-type'
      };
      if (match[1]) {
        event.playlistType = match[1];
      }
      this.trigger('data', event);
      return;
    }
    match = (/^#EXT-X-BYTERANGE:?([0-9.]*)?@?([0-9.]*)?/).exec(line);
    if (match) {
      event = {
        type: 'tag',
        tagType: 'byterange'
      };
      if (match[1]) {
        event.length = parseInt(match[1], 10);
      }
      if (match[2]) {
        event.offset = parseInt(match[2], 10);
      }
      this.trigger('data', event);
      return;
    }
    match = (/^#EXT-X-ALLOW-CACHE:?(YES|NO)?/).exec(line);
    if (match) {
      event = {
        type: 'tag',
        tagType: 'allow-cache'
      };
      if (match[1]) {
        event.allowed = !(/NO/).test(match[1]);
      }
      this.trigger('data', event);
      return;
    }
    match = (/^#EXT-X-STREAM-INF:?(.*)$/).exec(line);
    if (match) {
      event = {
        type: 'tag',
        tagType: 'stream-inf'
      };
      if (match[1]) {
        event.attributes = parseAttributes(match[1]);

        if (event.attributes.RESOLUTION) {
          (function() {
            var
              split = event.attributes.RESOLUTION.split('x'),
              resolution = {};
            if (split[0]) {
              resolution.width = parseInt(split[0], 10);
            }
            if (split[1]) {
              resolution.height = parseInt(split[1], 10);
            }
            event.attributes.RESOLUTION = resolution;
          })();
        }
        if (event.attributes.BANDWIDTH) {
          event.attributes.BANDWIDTH = parseInt(event.attributes.BANDWIDTH, 10);
        }
        if (event.attributes['PROGRAM-ID']) {
          event.attributes['PROGRAM-ID'] = parseInt(event.attributes['PROGRAM-ID'], 10);
        }
      }
      this.trigger('data', event);
      return;
    }
    match = (/^#EXT-X-ENDLIST/).exec(line);
    if (match) {
      this.trigger('data', {
        type: 'tag',
        tagType: 'endlist'
      });
      return;
    }
    match = (/^#EXT-X-DISCONTINUITY/).exec(line);
    if (match) {
      this.trigger('data', {
        type: 'tag',
        tagType: 'discontinuity'
      });
      return;
    }
    match = (/^#EXT-X-KEY:?(.*)$/).exec(line);
    if (match) {
      event = {
        type: 'tag',
        tagType: 'key'
      };
      if (match[1]) {
        event.attributes = parseAttributes(match[1]);
        // parse the IV string into a Uint32Array
        if (event.attributes.IV) {
          if (event.attributes.IV.substring(0,2) === '0x') {
            event.attributes.IV = event.attributes.IV.substring(2);
          }

          event.attributes.IV = event.attributes.IV.match(/.{8}/g);
          event.attributes.IV[0] = parseInt(event.attributes.IV[0], 16);
          event.attributes.IV[1] = parseInt(event.attributes.IV[1], 16);
          event.attributes.IV[2] = parseInt(event.attributes.IV[2], 16);
          event.attributes.IV[3] = parseInt(event.attributes.IV[3], 16);
          event.attributes.IV = new Uint32Array(event.attributes.IV);
        }
      }
      this.trigger('data', event);
      return;
    }

    // unknown tag type
    this.trigger('data', {
      type: 'tag',
      data: line.slice(4, line.length)
    });
  };

  /**
   * A parser for M3U8 files. The current interpretation of the input is
   * exposed as a property `manifest` on parser objects. It's just two lines to
   * create and parse a manifest once you have the contents available as a string:
   *
   * ```js
   * var parser = new videojs.m3u8.Parser();
   * parser.push(xhr.responseText);
   * ```
   *
   * New input can later be applied to update the manifest object by calling
   * `push` again.
   *
   * The parser attempts to create a usable manifest object even if the
   * underlying input is somewhat nonsensical. It emits `info` and `warning`
   * events during the parse if it encounters input that seems invalid or
   * requires some property of the manifest object to be defaulted.
   */
  Parser = function() {
    var
      self = this,
      uris = [],
      currentUri = {},
      key;
    Parser.prototype.init.call(this);

    this.lineStream = new LineStream();
    this.parseStream = new ParseStream();
    this.lineStream.pipe(this.parseStream);

    // the manifest is empty until the parse stream begins delivering data
    this.manifest = {
      allowCache: true,
      discontinuityStarts: []
    };

    // update the manifest with the m3u8 entry from the parse stream
    this.parseStream.on('data', function(entry) {
      ({
        tag: function() {
          // switch based on the tag type
          (({
            'allow-cache': function() {
              this.manifest.allowCache = entry.allowed;
              if (!('allowed' in entry)) {
                this.trigger('info', {
                  message: 'defaulting allowCache to YES'
                });
                this.manifest.allowCache = true;
              }
            },
            'byterange': function() {
              var byterange = {};
              if ('length' in entry) {
                currentUri.byterange = byterange;
                byterange.length = entry.length;

                if (!('offset' in entry)) {
                  this.trigger('info', {
                    message: 'defaulting offset to zero'
                  });
                  entry.offset = 0;
                }
              }
              if ('offset' in entry) {
                currentUri.byterange = byterange;
                byterange.offset = entry.offset;
              }
            },
            'endlist': function() {
              this.manifest.endList = true;
            },
            'inf': function() {
              if (!('mediaSequence' in this.manifest)) {
                this.manifest.mediaSequence = 0;
                this.trigger('info', {
                  message: 'defaulting media sequence to zero'
                });
              }
              if (!('discontinuitySequence' in this.manifest)) {
                this.manifest.discontinuitySequence = 0;
                this.trigger('info', {
                  message: 'defaulting discontinuity sequence to zero'
                });
              }
              if (entry.duration >= 0) {
                currentUri.duration = entry.duration;
              }

              this.manifest.segments = uris;

            },
            'key': function() {
              if (!entry.attributes) {
                this.trigger('warn', {
                  message: 'ignoring key declaration without attribute list'
                });
                return;
              }
              // clear the active encryption key
              if (entry.attributes.METHOD === 'NONE') {
                key = null;
                return;
              }
              if (!entry.attributes.URI) {
                this.trigger('warn', {
                  message: 'ignoring key declaration without URI'
                });
                return;
              }
              if (!entry.attributes.METHOD) {
                this.trigger('warn', {
                  message: 'defaulting key method to AES-128'
                });
              }

              // setup an encryption key for upcoming segments
              key = {
                method: entry.attributes.METHOD || 'AES-128',
                uri: entry.attributes.URI
              };

              if (entry.attributes.IV !== undefined) {
                key.iv = entry.attributes.IV;
              }
            },
            'media-sequence': function() {
              if (!isFinite(entry.number)) {
                this.trigger('warn', {
                  message: 'ignoring invalid media sequence: ' + entry.number
                });
                return;
              }
              this.manifest.mediaSequence = entry.number;
            },
            'discontinuity-sequence': function() {
              if (!isFinite(entry.number)) {
                this.trigger('warn', {
                  message: 'ignoring invalid discontinuity sequence: ' + entry.number
                });
                return;
              }
              this.manifest.discontinuitySequence = entry.number;
            },
            'playlist-type': function() {
              if (!(/VOD|EVENT/).test(entry.playlistType)) {
                this.trigger('warn', {
                  message: 'ignoring unknown playlist type: ' + entry.playlist
                });
                return;
              }
              this.manifest.playlistType = entry.playlistType;
            },
            'stream-inf': function() {
              this.manifest.playlists = uris;

              if (!entry.attributes) {
                this.trigger('warn', {
                  message: 'ignoring empty stream-inf attributes'
                });
                return;
              }

              if (!currentUri.attributes) {
                currentUri.attributes = {};
              }
              currentUri.attributes = mergeOptions(currentUri.attributes,
                                                   entry.attributes);
            },
            'discontinuity': function() {
              currentUri.discontinuity = true;
              this.manifest.discontinuityStarts.push(uris.length);
            },
            'targetduration': function() {
              if (!isFinite(entry.duration) || entry.duration < 0) {
                this.trigger('warn', {
                  message: 'ignoring invalid target duration: ' + entry.duration
                });
                return;
              }
              this.manifest.targetDuration = entry.duration;
            },
            'totalduration': function() {
              if (!isFinite(entry.duration) || entry.duration < 0) {
                this.trigger('warn', {
                  message: 'ignoring invalid total duration: ' + entry.duration
                });
                return;
              }
              this.manifest.totalDuration = entry.duration;
            }
          })[entry.tagType] || noop).call(self);
        },
        uri: function() {
          currentUri.uri = entry.uri;
          uris.push(currentUri);

          // if no explicit duration was declared, use the target duration
          if (this.manifest.targetDuration &&
              !('duration' in currentUri)) {
            this.trigger('warn', {
              message: 'defaulting segment duration to the target duration'
            });
            currentUri.duration = this.manifest.targetDuration;
          }
          // annotate with encryption information, if necessary
          if (key) {
            currentUri.key = key;
          }

          // prepare for the next URI
          currentUri = {};
        },
        comment: function() {
          // comments are not important for playback
        }
      })[entry.type].call(self);
    });
  };
  Parser.prototype = new Stream();
  /**
   * Parse the input string and update the manifest object.
   * @param chunk {string} a potentially incomplete portion of the manifest
   */
  Parser.prototype.push = function(chunk) {
    this.lineStream.push(chunk);
  };
  /**
   * Flush any remaining input. This can be handy if the last line of an M3U8
   * manifest did not contain a trailing newline but the file has been
   * completely received.
   */
  Parser.prototype.end = function() {
    // flush any buffered input
    this.lineStream.push('\n');
  };

  window.videojs.m3u8 = {
    LineStream: LineStream,
    ParseStream: ParseStream,
    Parser: Parser
  };
})(window.videojs, window.parseInt, window.isFinite, window.videojs.mergeOptions);

(function(window, videojs) {
  'use strict';

  var Playlist = {
    /**
     * The number of segments that are unsafe to start playback at in
     * a live stream. Changing this value can cause playback stalls.
     * See HTTP Live Streaming, "Playing the Media Playlist File"
     * https://tools.ietf.org/html/draft-pantos-http-live-streaming-18#section-6.3.3
     */
    UNSAFE_LIVE_SEGMENTS: 3
  };

  var duration, intervalDuration, backwardDuration, forwardDuration, seekable;

  backwardDuration = function(playlist, endSequence) {
    var result = 0, segment, i;

    i = endSequence - playlist.mediaSequence;
    // if a start time is available for segment immediately following
    // the interval, use it
    segment = playlist.segments[i];
    // Walk backward until we find the latest segment with timeline
    // information that is earlier than endSequence
    if (segment) {
      if (segment.start !== undefined) {
        return { result: segment.start, precise: true };
      }
      if (segment.end !== undefined) {
        return {
          result: segment.end - segment.duration,
          precise: true
        };
      }
    }
    while (i--) {
      segment = playlist.segments[i];
      if (segment.end !== undefined) {
        return { result: result + segment.end, precise: true };
      }

      result += segment.duration;

      if (segment.start !== undefined) {
        return { result: result + segment.start, precise: true };
      }
    }
    return { result: result, precise: false };
  };

  forwardDuration = function(playlist, endSequence) {
    var result = 0, segment, i;

    i = endSequence - playlist.mediaSequence;
    // Walk forward until we find the earliest segment with timeline
    // information
    for (; i < playlist.segments.length; i++) {
      segment = playlist.segments[i];
      if (segment.start !== undefined) {
        return {
          result: segment.start - result,
          precise: true
        };
      }

      result += segment.duration;

      if (segment.end !== undefined) {
        return {
          result: segment.end - result,
          precise: true
        };
      }

    }
    // indicate we didn't find a useful duration estimate
    return { result: -1, precise: false };
  };

  /**
   * Calculate the media duration from the segments associated with a
   * playlist. The duration of a subinterval of the available segments
   * may be calculated by specifying an end index.
   *
   * @param playlist {object} a media playlist object
   * @param endSequence {number} (optional) an exclusive upper boundary
   * for the playlist.  Defaults to playlist length.
   * @return {number} the duration between the first available segment
   * and end index.
   */
  intervalDuration = function(playlist, endSequence) {
    var backward, forward;

    if (endSequence === undefined) {
      endSequence = playlist.mediaSequence + playlist.segments.length;
    }

    if (endSequence < playlist.mediaSequence) {
      return 0;
    }

    // do a backward walk to estimate the duration
    backward = backwardDuration(playlist, endSequence);
    if (backward.precise) {
      // if we were able to base our duration estimate on timing
      // information provided directly from the Media Source, return
      // it
      return backward.result;
    }

    // walk forward to see if a precise duration estimate can be made
    // that way
    forward = forwardDuration(playlist, endSequence);
    if (forward.precise) {
      // we found a segment that has been buffered and so it's
      // position is known precisely
      return forward.result;
    }

    // return the less-precise, playlist-based duration estimate
    return backward.result;
  };

  /**
   * Calculates the duration of a playlist. If a start and end index
   * are specified, the duration will be for the subset of the media
   * timeline between those two indices. The total duration for live
   * playlists is always Infinity.
   * @param playlist {object} a media playlist object
   * @param endSequence {number} (optional) an exclusive upper
   * boundary for the playlist.  Defaults to the playlist media
   * sequence number plus its length.
   * @param includeTrailingTime {boolean} (optional) if false, the
   * interval between the final segment and the subsequent segment
   * will not be included in the result
   * @return {number} the duration between the start index and end
   * index.
   */
  duration = function(playlist, endSequence, includeTrailingTime) {
    if (!playlist) {
      return 0;
    }

    if (includeTrailingTime === undefined) {
      includeTrailingTime = true;
    }

    // if a slice of the total duration is not requested, use
    // playlist-level duration indicators when they're present
    if (endSequence === undefined) {
      // if present, use the duration specified in the playlist
      if (playlist.totalDuration) {
        return playlist.totalDuration;
      }

      // duration should be Infinity for live playlists
      if (!playlist.endList) {
        return window.Infinity;
      }
    }

    // calculate the total duration based on the segment durations
    return intervalDuration(playlist,
                            endSequence,
                            includeTrailingTime);
  };

  /**
   * Calculates the interval of time that is currently seekable in a
   * playlist. The returned time ranges are relative to the earliest
   * moment in the specified playlist that is still available. A full
   * seekable implementation for live streams would need to offset
   * these values by the duration of content that has expired from the
   * stream.
   * @param playlist {object} a media playlist object
   * @return {TimeRanges} the periods of time that are valid targets
   * for seeking
   */
  seekable = function(playlist) {
    var start, end;

    // without segments, there are no seekable ranges
    if (!playlist.segments) {
      return videojs.createTimeRange();
    }
    // when the playlist is complete, the entire duration is seekable
    if (playlist.endList) {
      return videojs.createTimeRange(0, duration(playlist));
    }

    // live playlists should not expose three segment durations worth
    // of content from the end of the playlist
    // https://tools.ietf.org/html/draft-pantos-http-live-streaming-16#section-6.3.3
    start = intervalDuration(playlist, playlist.mediaSequence);
    end = intervalDuration(playlist,
                           playlist.mediaSequence +
                           Math.max(0, playlist.segments.length - Playlist.UNSAFE_LIVE_SEGMENTS));
    return videojs.createTimeRange(start, end);
  };

  // exports
  Playlist.duration = duration;
  Playlist.seekable = seekable;
  videojs.Hls.Playlist = Playlist;

})(window, window.videojs);

(function(window, videojs) {
  'use strict';
  var
    resolveUrl = videojs.Hls.resolveUrl,
    xhr = videojs.Hls.xhr,
    mergeOptions = videojs.mergeOptions,

    /**
     * Returns a new master playlist that is the result of merging an
     * updated media playlist into the original version. If the
     * updated media playlist does not match any of the playlist
     * entries in the original master playlist, null is returned.
     * @param master {object} a parsed master M3U8 object
     * @param media {object} a parsed media M3U8 object
     * @return {object} a new object that represents the original
     * master playlist with the updated media playlist merged in, or
     * null if the merge produced no change.
     */
    updateMaster = function(master, media) {
      var
        changed = false,
        result = mergeOptions(master, {}),
        i,
        playlist;

      i = master.playlists.length;
      while (i--) {
        playlist = result.playlists[i];
        if (playlist.uri === media.uri) {
          // consider the playlist unchanged if the number of segments
          // are equal and the media sequence number is unchanged
          if (playlist.segments &&
              media.segments &&
              playlist.segments.length === media.segments.length &&
              playlist.mediaSequence === media.mediaSequence) {
            continue;
          }

          result.playlists[i] = mergeOptions(playlist, media);
          result.playlists[media.uri] = result.playlists[i];

          // if the update could overlap existing segment information,
          // merge the two lists
          if (playlist.segments) {
            result.playlists[i].segments = updateSegments(playlist.segments,
                                                          media.segments,
                                                          media.mediaSequence - playlist.mediaSequence);
          }
          changed = true;
        }
      }
      return changed ? result : null;
    },

    /**
     * Returns a new array of segments that is the result of merging
     * properties from an older list of segments onto an updated
     * list. No properties on the updated playlist will be overridden.
     * @param original {array} the outdated list of segments
     * @param update {array} the updated list of segments
     * @param offset {number} (optional) the index of the first update
     * segment in the original segment list. For non-live playlists,
     * this should always be zero and does not need to be
     * specified. For live playlists, it should be the difference
     * between the media sequence numbers in the original and updated
     * playlists.
     * @return a list of merged segment objects
     */
    updateSegments = function(original, update, offset) {
      var result = update.slice(), length, i;
      offset = offset || 0;
      length = Math.min(original.length, update.length + offset);

      for (i = offset; i < length; i++) {
        result[i - offset] = mergeOptions(original[i], result[i - offset]);
      }
      return result;
    },

    PlaylistLoader = function(srcUrl, withCredentials) {
      var
        loader = this,
        dispose,
        mediaUpdateTimeout,
        request,
        playlistRequestError,
        haveMetadata;

      PlaylistLoader.prototype.init.call(this);

      // a flag that disables "expired time"-tracking this setting has
      // no effect when not playing a live stream
      this.trackExpiredTime_ = false;

      if (!srcUrl) {
        throw new Error('A non-empty playlist URL is required');
      }

      playlistRequestError = function(xhr, url, startingState) {
        loader.setBandwidth(request || xhr);

        // any in-flight request is now finished
        request = null;
        
        if (startingState) {
          loader.state = startingState;
        }

        loader.error = {
          playlist: loader.master.playlists[url],
          status: xhr.status,
          message: 'HLS playlist request error at URL: ' + url,
          responseText: xhr.responseText,
          code: (xhr.status >= 500) ? 4 : 2
        };
        loader.trigger('error');
      };

      // update the playlist loader's state in response to a new or
      // updated playlist.

      haveMetadata = function(xhr, url) {
        var parser, refreshDelay, update;

        loader.setBandwidth(request || xhr);

        // any in-flight request is now finished
        request = null;
        loader.state = 'HAVE_METADATA';

        parser = new videojs.m3u8.Parser();
        parser.push(xhr.responseText);
        parser.end();
        parser.manifest.uri = url;

        // merge this playlist into the master
        update = updateMaster(loader.master, parser.manifest);
        refreshDelay = (parser.manifest.targetDuration || 10) * 1000;
        if (update) {
          loader.master = update;
          loader.updateMediaPlaylist_(parser.manifest);
        } else {
          // if the playlist is unchanged since the last reload,
          // try again after half the target duration
          refreshDelay /= 2;
        }

        // refresh live playlists after a target duration passes
        if (!loader.media().endList) {
          window.clearTimeout(mediaUpdateTimeout);
          mediaUpdateTimeout = window.setTimeout(function() {
            loader.trigger('mediaupdatetimeout');
          }, refreshDelay);
        }

        loader.trigger('loadedplaylist');
      };

      // initialize the loader state
      loader.state = 'HAVE_NOTHING';

      // track the time that has expired from the live window
      // this allows the seekable start range to be calculated even if
      // all segments with timing information have expired
      this.expired_ = 0;

      // capture the prototype dispose function
      dispose = this.dispose;

      /**
       * Abort any outstanding work and clean up.
       */
      loader.dispose = function() {
        if (request) {
          request.onreadystatechange = null;
          request.abort();
          request = null;
        }
        window.clearTimeout(mediaUpdateTimeout);
        dispose.call(this);
      };

      /**
       * When called without any arguments, returns the currently
       * active media playlist. When called with a single argument,
       * triggers the playlist loader to asynchronously switch to the
       * specified media playlist. Calling this method while the
       * loader is in the HAVE_NOTHING causes an error to be emitted
       * but otherwise has no effect.
       * @param playlist (optional) {object} the parsed media playlist
       * object to switch to
       */
      loader.media = function(playlist) {
        var startingState = loader.state, mediaChange;
        // getter
        if (!playlist) {
          return loader.media_;
        }

        // setter
        if (loader.state === 'HAVE_NOTHING') {
          throw new Error('Cannot switch media playlist from ' + loader.state);
        }

        // find the playlist object if the target playlist has been
        // specified by URI
        if (typeof playlist === 'string') {
          if (!loader.master.playlists[playlist]) {
            throw new Error('Unknown playlist URI: ' + playlist);
          }
          playlist = loader.master.playlists[playlist];
        }

        mediaChange = !loader.media_ || playlist.uri !== loader.media_.uri;

        // switch to fully loaded playlists immediately
        if (loader.master.playlists[playlist.uri].endList) {
          // abort outstanding playlist requests
          if (request) {
            request.onreadystatechange = null;
            request.abort();
            request = null;
          }
          loader.state = 'HAVE_METADATA';
          loader.media_ = playlist;

          // trigger media change if the active media has been updated
          if (mediaChange) {
            loader.trigger('mediachange');
          }
          return;
        }

        // switching to the active playlist is a no-op
        if (!mediaChange) {
          return;
        }

        loader.state = 'SWITCHING_MEDIA';

        // there is already an outstanding playlist request
        if (request) {
          if (resolveUrl(loader.master.uri, playlist.uri) === request.url) {
            // requesting to switch to the same playlist multiple times
            // has no effect after the first
            return;
          }
          request.onreadystatechange = null;
          request.abort();
          request = null;
        }

        // request the new playlist
        request = xhr({
          uri: resolveUrl(loader.master.uri, playlist.uri),
          withCredentials: withCredentials
        }, function(error, request) {
          if (error) {
            return playlistRequestError(request, playlist.uri, startingState);
          }

          haveMetadata(request, playlist.uri);

          // fire loadedmetadata the first time a media playlist is loaded
          if (startingState === 'HAVE_MASTER') {
            loader.trigger('loadedmetadata');
          } else {
            loader.trigger('mediachange');
          }
        });
      };

      loader.setBandwidth = function(xhr) {
        loader.bandwidth = xhr.bandwidth;
      };

      // In a live list, don't keep track of the expired time until
      // HLS tells us that "first play" has commenced
      loader.on('firstplay', function() {
        this.trackExpiredTime_ = true;
      });

      // live playlist staleness timeout
      loader.on('mediaupdatetimeout', function() {
        if (loader.state !== 'HAVE_METADATA') {
          // only refresh the media playlist if no other activity is going on
          return;
        }

        loader.state = 'HAVE_CURRENT_METADATA';
        request = xhr({
          uri: resolveUrl(loader.master.uri, loader.media().uri),
          withCredentials: withCredentials
        }, function(error, request) {
          if (error) {
            return playlistRequestError(request, loader.media().uri);
          }
          haveMetadata(request, loader.media().uri);
        });
      });

      // request the specified URL
      request = xhr({
        uri: srcUrl,
        withCredentials: withCredentials
      }, function(error, req) {
        var parser, i;

        // clear the loader's request reference
        request = null;

        if (error) {
          loader.error = {
            status: req.status,
            message: 'HLS playlist request error at URL: ' + srcUrl,
            responseText: req.responseText,
            code: 2 // MEDIA_ERR_NETWORK
          };
          return loader.trigger('error');
        }

        parser = new videojs.m3u8.Parser();
        parser.push(req.responseText);
        parser.end();

        loader.state = 'HAVE_MASTER';

        parser.manifest.uri = srcUrl;

        // loaded a master playlist
        if (parser.manifest.playlists) {
          loader.master = parser.manifest;

          // setup by-URI lookups
          i = loader.master.playlists.length;
          while (i--) {
            loader.master.playlists[loader.master.playlists[i].uri] = loader.master.playlists[i];
          }

          loader.trigger('loadedplaylist');
          if (!request) {
            // no media playlist was specifically selected so start
            // from the first listed one
            loader.media(parser.manifest.playlists[0]);
          }
          return;
        }

        // loaded a media playlist
        // infer a master playlist if none was previously requested
        loader.master = {
          uri: window.location.href,
          playlists: [{
            uri: srcUrl
          }]
        };
        loader.master.playlists[srcUrl] = loader.master.playlists[0];
        haveMetadata(req, srcUrl);
        return loader.trigger('loadedmetadata');
      });
    };
  PlaylistLoader.prototype = new videojs.Hls.Stream();

  /**
   * Update the PlaylistLoader state to reflect the changes in an
   * update to the current media playlist.
   * @param update {object} the updated media playlist object
   */
  PlaylistLoader.prototype.updateMediaPlaylist_ = function(update) {
    var outdated, i, segment;

    outdated = this.media_;
    this.media_ = this.master.playlists[update.uri];

    if (!outdated) {
      return;
    }

    // don't track expired time until this flag is truthy
    if (!this.trackExpiredTime_) {
      return;
    }

    // if the update was the result of a rendition switch do not
    // attempt to calculate expired_ since media-sequences need not
    // correlate between renditions/variants
    if (update.uri !== outdated.uri) {
      return;
    }

    // try using precise timing from first segment of the updated
    // playlist
    if (update.segments.length) {
      if (update.segments[0].start !== undefined) {
        this.expired_ = update.segments[0].start;
        return;
      } else if (update.segments[0].end !== undefined) {
        this.expired_ = update.segments[0].end - update.segments[0].duration;
        return;
      }
    }

    // calculate expired by walking the outdated playlist
    i = update.mediaSequence - outdated.mediaSequence - 1;

    for (; i >= 0; i--) {
      segment = outdated.segments[i];

      if (!segment) {
        // we missed information on this segment completely between
        // playlist updates so we'll have to take an educated guess
        // once we begin buffering again, any error we introduce can
        // be corrected
        this.expired_ += outdated.targetDuration || 10;
        continue;
      }

      if (segment.end !== undefined) {
        this.expired_ = segment.end;
        return;
      }
      if (segment.start !== undefined) {
        this.expired_ = segment.start + segment.duration;
        return;
      }
      this.expired_ += segment.duration;
    }
  };

  /**
   * Determine the index of the segment that contains a specified
   * playback position in the current media playlist. Early versions
   * of the HLS specification require segment durations to be rounded
   * to the nearest integer which means it may not be possible to
   * determine the correct segment for a playback position if that
   * position is within .5 seconds of the segment duration. This
   * function will always return the lower of the two possible indices
   * in those cases.
   *
   * @param time {number} The number of seconds since the earliest
   * possible position to determine the containing segment for
   * @returns {number} The number of the media segment that contains
   * that time position. If the specified playback position is outside
   * the time range of the current set of media segments, the return
   * value will be clamped to the index of the segment containing the
   * closest playback position that is currently available.
   */
  PlaylistLoader.prototype.getMediaIndexForTime_ = function(time) {
    var
      i,
      segment,
      originalTime = time,
      numSegments = this.media_.segments.length,
      lastSegment = numSegments - 1,
      startIndex,
      endIndex,
      knownStart,
      knownEnd;

    if (!this.media_) {
      return 0;
    }

    // when the requested position is earlier than the current set of
    // segments, return the earliest segment index
    if (time < 0) {
      return 0;
    }

    // find segments with known timing information that bound the
    // target time
    for (i = 0; i < numSegments; i++) {
      segment = this.media_.segments[i];
      if (segment.end) {
        if (segment.end > time) {
          knownEnd = segment.end;
          endIndex = i;
          break;
        } else {
          knownStart = segment.end;
          startIndex = i + 1;
        }
      }
    }

    // use the bounds we just found and playlist information to
    // estimate the segment that contains the time we are looking for
    if (startIndex !== undefined) {
      // We have a known-start point that is before our desired time so
      // walk from that point forwards
      time = time - knownStart;
      for (i = startIndex; i < (endIndex || numSegments); i++) {
        segment = this.media_.segments[i];
        time -= segment.duration;

        if (time < 0) {
          return i;
        }
      }

      if (i >= endIndex) {
        // We haven't found a segment but we did hit a known end point
        // so fallback to interpolating between the segment index
        // based on the known span of the timeline we are dealing with
        // and the number of segments inside that span
        return startIndex + Math.floor(
          ((originalTime - knownStart) / (knownEnd - knownStart)) *
          (endIndex - startIndex));
      }

      // We _still_ haven't found a segment so load the last one
      return lastSegment;
    } else if (endIndex !== undefined) {
      // We _only_ have a known-end point that is after our desired time so
      // walk from that point backwards
      time = knownEnd - time;
      for (i = endIndex; i >= 0; i--) {
        segment = this.media_.segments[i];
        time -= segment.duration;

        if (time < 0) {
          return i;
        }
      }

      // We haven't found a segment so load the first one if time is zero
      if (time === 0) {
        return 0;
      } else {
        return -1;
      }
    } else {
      // We known nothing so walk from the front of the playlist,
      // subtracting durations until we find a segment that contains
      // time and return it
      time = time - this.expired_;

      if (time < 0) {
        return -1;
      }

      for (i = 0; i < numSegments; i++) {
        segment = this.media_.segments[i];
        time -= segment.duration;
        if (time < 0) {
          return i;
        }
      }
      // We are out of possible candidates so load the last one...
      // The last one is the least likely to overlap a buffer and therefore
      // the one most likely to tell us something about the timeline
      return lastSegment;
    }
  };

  videojs.Hls.PlaylistLoader = PlaylistLoader;
})(window, window.videojs);

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
global.window.pkcs7 = {
  unpad: require('./unpad')
};

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./unpad":2}],2:[function(require,module,exports){
/*
 * pkcs7.unpad
 * https://github.com/brightcove/pkcs7
 *
 * Copyright (c) 2014 Brightcove
 * Licensed under the apache2 license.
 */

'use strict';

/**
 * Returns the subarray of a Uint8Array without PKCS#7 padding.
 * @param padded {Uint8Array} unencrypted bytes that have been padded
 * @return {Uint8Array} the unpadded bytes
 * @see http://tools.ietf.org/html/rfc5652
 */
module.exports = function unpad(padded) {
  return padded.subarray(0, padded.byteLength - padded[padded.byteLength - 1]);
};

},{}]},{},[1]);
(function(window, videojs, unpad) {
'use strict';

var AES, AsyncStream, Decrypter, decrypt, ntoh;

/**
 * Convert network-order (big-endian) bytes into their little-endian
 * representation.
 */
ntoh = function(word) {
  return (word << 24) |
    ((word & 0xff00) << 8) |
    ((word & 0xff0000) >> 8) |
    (word >>> 24);
};

/**
 * Schedule out an AES key for both encryption and decryption. This
 * is a low-level class. Use a cipher mode to do bulk encryption.
 *
 * @constructor
 * @param key {Array} The key as an array of 4, 6 or 8 words.
 */
AES = function (key) {
  this._precompute();

  var i, j, tmp,
    encKey, decKey,
    sbox = this._tables[0][4], decTable = this._tables[1],
    keyLen = key.length, rcon = 1;

  if (keyLen !== 4 && keyLen !== 6 && keyLen !== 8) {
    throw new Error("Invalid aes key size");
  }

  encKey = key.slice(0);
  decKey = [];
  this._key = [encKey, decKey];

  // schedule encryption keys
  for (i = keyLen; i < 4 * keyLen + 28; i++) {
    tmp = encKey[i-1];

    // apply sbox
    if (i%keyLen === 0 || (keyLen === 8 && i%keyLen === 4)) {
      tmp = sbox[tmp>>>24]<<24 ^ sbox[tmp>>16&255]<<16 ^ sbox[tmp>>8&255]<<8 ^ sbox[tmp&255];

      // shift rows and add rcon
      if (i%keyLen === 0) {
        tmp = tmp<<8 ^ tmp>>>24 ^ rcon<<24;
        rcon = rcon<<1 ^ (rcon>>7)*283;
      }
    }

    encKey[i] = encKey[i-keyLen] ^ tmp;
  }

  // schedule decryption keys
  for (j = 0; i; j++, i--) {
    tmp = encKey[j&3 ? i : i - 4];
    if (i<=4 || j<4) {
      decKey[j] = tmp;
    } else {
      decKey[j] = decTable[0][sbox[tmp>>>24      ]] ^
                  decTable[1][sbox[tmp>>16  & 255]] ^
                  decTable[2][sbox[tmp>>8   & 255]] ^
                  decTable[3][sbox[tmp      & 255]];
    }
  }
};

AES.prototype = {
  /**
   * The expanded S-box and inverse S-box tables. These will be computed
   * on the client so that we don't have to send them down the wire.
   *
   * There are two tables, _tables[0] is for encryption and
   * _tables[1] is for decryption.
   *
   * The first 4 sub-tables are the expanded S-box with MixColumns. The
   * last (_tables[01][4]) is the S-box itself.
   *
   * @private
   */
  _tables: [[[],[],[],[],[]],[[],[],[],[],[]]],

  /**
   * Expand the S-box tables.
   *
   * @private
   */
  _precompute: function () {
   var encTable = this._tables[0], decTable = this._tables[1],
       sbox = encTable[4], sboxInv = decTable[4],
       i, x, xInv, d=[], th=[], x2, x4, x8, s, tEnc, tDec;

    // Compute double and third tables
   for (i = 0; i < 256; i++) {
     th[( d[i] = i<<1 ^ (i>>7)*283 )^i]=i;
   }

   for (x = xInv = 0; !sbox[x]; x ^= x2 || 1, xInv = th[xInv] || 1) {
     // Compute sbox
     s = xInv ^ xInv<<1 ^ xInv<<2 ^ xInv<<3 ^ xInv<<4;
     s = s>>8 ^ s&255 ^ 99;
     sbox[x] = s;
     sboxInv[s] = x;

     // Compute MixColumns
     x8 = d[x4 = d[x2 = d[x]]];
     tDec = x8*0x1010101 ^ x4*0x10001 ^ x2*0x101 ^ x*0x1010100;
     tEnc = d[s]*0x101 ^ s*0x1010100;

     for (i = 0; i < 4; i++) {
       encTable[i][x] = tEnc = tEnc<<24 ^ tEnc>>>8;
       decTable[i][s] = tDec = tDec<<24 ^ tDec>>>8;
     }
   }

   // Compactify. Considerable speedup on Firefox.
   for (i = 0; i < 5; i++) {
     encTable[i] = encTable[i].slice(0);
     decTable[i] = decTable[i].slice(0);
   }
  },

  /**
   * Decrypt 16 bytes, specified as four 32-bit words.
   * @param encrypted0 {number} the first word to decrypt
   * @param encrypted1 {number} the second word to decrypt
   * @param encrypted2 {number} the third word to decrypt
   * @param encrypted3 {number} the fourth word to decrypt
   * @param out {Int32Array} the array to write the decrypted words
   * into
   * @param offset {number} the offset into the output array to start
   * writing results
   * @return {Array} The plaintext.
   */
  decrypt:function (encrypted0, encrypted1, encrypted2, encrypted3, out, offset) {
    var key = this._key[1],
        // state variables a,b,c,d are loaded with pre-whitened data
        a = encrypted0 ^ key[0],
        b = encrypted3 ^ key[1],
        c = encrypted2 ^ key[2],
        d = encrypted1 ^ key[3],
        a2, b2, c2,

        nInnerRounds = key.length / 4 - 2, // key.length === 2 ?
        i,
        kIndex = 4,
        table = this._tables[1],

        // load up the tables
        table0    = table[0],
        table1    = table[1],
        table2    = table[2],
        table3    = table[3],
        sbox  = table[4];

    // Inner rounds. Cribbed from OpenSSL.
    for (i = 0; i < nInnerRounds; i++) {
      a2 = table0[a>>>24] ^ table1[b>>16 & 255] ^ table2[c>>8 & 255] ^ table3[d & 255] ^ key[kIndex];
      b2 = table0[b>>>24] ^ table1[c>>16 & 255] ^ table2[d>>8 & 255] ^ table3[a & 255] ^ key[kIndex + 1];
      c2 = table0[c>>>24] ^ table1[d>>16 & 255] ^ table2[a>>8 & 255] ^ table3[b & 255] ^ key[kIndex + 2];
      d  = table0[d>>>24] ^ table1[a>>16 & 255] ^ table2[b>>8 & 255] ^ table3[c & 255] ^ key[kIndex + 3];
      kIndex += 4;
      a=a2; b=b2; c=c2;
    }

    // Last round.
    for (i = 0; i < 4; i++) {
      out[(3 & -i) + offset] =
        sbox[a>>>24      ]<<24 ^
        sbox[b>>16  & 255]<<16 ^
        sbox[c>>8   & 255]<<8  ^
        sbox[d      & 255]     ^
        key[kIndex++];
      a2=a; a=b; b=c; c=d; d=a2;
    }
  }
};

/**
 * Decrypt bytes using AES-128 with CBC and PKCS#7 padding.
 * @param encrypted {Uint8Array} the encrypted bytes
 * @param key {Uint32Array} the bytes of the decryption key
 * @param initVector {Uint32Array} the initialization vector (IV) to
 * use for the first round of CBC.
 * @return {Uint8Array} the decrypted bytes
 *
 * @see http://en.wikipedia.org/wiki/Advanced_Encryption_Standard
 * @see http://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Cipher_Block_Chaining_.28CBC.29
 * @see https://tools.ietf.org/html/rfc2315
 */
decrypt = function(encrypted, key, initVector) {
  var
    // word-level access to the encrypted bytes
    encrypted32 = new Int32Array(encrypted.buffer, encrypted.byteOffset, encrypted.byteLength >> 2),

    decipher = new AES(Array.prototype.slice.call(key)),

    // byte and word-level access for the decrypted output
    decrypted = new Uint8Array(encrypted.byteLength),
    decrypted32 = new Int32Array(decrypted.buffer),

    // temporary variables for working with the IV, encrypted, and
    // decrypted data
    init0, init1, init2, init3,
    encrypted0, encrypted1, encrypted2, encrypted3,

    // iteration variable
    wordIx;

  // pull out the words of the IV to ensure we don't modify the
  // passed-in reference and easier access
  init0 = initVector[0];
  init1 = initVector[1];
  init2 = initVector[2];
  init3 = initVector[3];

  // decrypt four word sequences, applying cipher-block chaining (CBC)
  // to each decrypted block
  for (wordIx = 0; wordIx < encrypted32.length; wordIx += 4) {
    // convert big-endian (network order) words into little-endian
    // (javascript order)
    encrypted0 = ntoh(encrypted32[wordIx]);
    encrypted1 = ntoh(encrypted32[wordIx + 1]);
    encrypted2 = ntoh(encrypted32[wordIx + 2]);
    encrypted3 = ntoh(encrypted32[wordIx + 3]);

    // decrypt the block
    decipher.decrypt(encrypted0,
                     encrypted1,
                     encrypted2,
                     encrypted3,
                     decrypted32,
                     wordIx);

    // XOR with the IV, and restore network byte-order to obtain the
    // plaintext
    decrypted32[wordIx]     = ntoh(decrypted32[wordIx] ^ init0);
    decrypted32[wordIx + 1] = ntoh(decrypted32[wordIx + 1] ^ init1);
    decrypted32[wordIx + 2] = ntoh(decrypted32[wordIx + 2] ^ init2);
    decrypted32[wordIx + 3] = ntoh(decrypted32[wordIx + 3] ^ init3);

    // setup the IV for the next round
    init0 = encrypted0;
    init1 = encrypted1;
    init2 = encrypted2;
    init3 = encrypted3;
  }

  return decrypted;
};

AsyncStream = function() {
  this.jobs = [];
  this.delay = 1;
  this.timeout_ = null;
};
AsyncStream.prototype = new videojs.Hls.Stream();
AsyncStream.prototype.processJob_ = function() {
  this.jobs.shift()();
  if (this.jobs.length) {
    this.timeout_ = setTimeout(this.processJob_.bind(this),
                               this.delay);
  } else {
    this.timeout_ = null;
  }
};
AsyncStream.prototype.push = function(job) {
  this.jobs.push(job);
  if (!this.timeout_) {
    this.timeout_ = setTimeout(this.processJob_.bind(this),
                               this.delay);
  }
};

Decrypter = function(encrypted, key, initVector, done) {
  var
    step = Decrypter.STEP,
    encrypted32 = new Int32Array(encrypted.buffer),
    decrypted = new Uint8Array(encrypted.byteLength),
    i = 0;
  this.asyncStream_ = new AsyncStream();

  // split up the encryption job and do the individual chunks asynchronously
  this.asyncStream_.push(this.decryptChunk_(encrypted32.subarray(i, i + step),
                                            key,
                                            initVector,
                                            decrypted));
  for (i = step; i < encrypted32.length; i += step) {
    initVector = new Uint32Array([
      ntoh(encrypted32[i - 4]),
      ntoh(encrypted32[i - 3]),
      ntoh(encrypted32[i - 2]),
      ntoh(encrypted32[i - 1])
    ]);
    this.asyncStream_.push(this.decryptChunk_(encrypted32.subarray(i, i + step),
                                              key,
                                              initVector,
                                              decrypted));
  }
  // invoke the done() callback when everything is finished
  this.asyncStream_.push(function() {
    // remove pkcs#7 padding from the decrypted bytes
    done(null, unpad(decrypted));
  });
};
Decrypter.prototype = new videojs.Hls.Stream();
Decrypter.prototype.decryptChunk_ = function(encrypted, key, initVector, decrypted) {
  return function() {
    var bytes = decrypt(encrypted,
                        key,
                        initVector);
    decrypted.set(bytes, encrypted.byteOffset);
  };
};
// the maximum number of bytes to process at one time
Decrypter.STEP = 4 * 8000;

// exports
videojs.Hls.decrypt = decrypt;
videojs.Hls.Decrypter = Decrypter;
videojs.Hls.AsyncStream = AsyncStream;

})(window, window.videojs, window.pkcs7.unpad);
