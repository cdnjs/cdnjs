(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jsmediatags = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
module.exports = XMLHttpRequest;

},{}],3:[function(require,module,exports){

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _FlowTypes = require('./FlowTypes');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChunkedFileData = require('./ChunkedFileData');
var MediaFileReader = require('./MediaFileReader');

var BlobFileReader = (function (_MediaFileReader) {
  _inherits(BlobFileReader, _MediaFileReader);

  function BlobFileReader(blob) {
    _classCallCheck(this, BlobFileReader);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BlobFileReader).call(this));

    _this._blob = blob;
    // $FlowIssue - Constructor cannot be called on exports
    _this._fileData = new ChunkedFileData();
    return _this;
  }
  // $FlowIssue - Flow gets confused with module.exports

  _createClass(BlobFileReader, [{
    key: '_init',
    value: function _init(callbacks) {
      this._size = this._blob.size;
      setTimeout(callbacks.onSuccess, 1);
    }
  }, {
    key: 'loadRange',
    value: function loadRange(range, callbacks) {
      var self = this;
      // $FlowIssue - flow isn't aware of mozSlice or webkitSlice
      var blobSlice = this._blob.slice || this._blob.mozSlice || this._blob.webkitSlice;
      var blob = blobSlice.call(this._blob, range[0], range[1] + 1);
      var browserFileReader = new FileReader();

      browserFileReader.onloadend = function (event) {
        var intArray = new Uint8Array(browserFileReader.result);
        self._fileData.addData(range[0], intArray);
        callbacks.onSuccess();
      };
      browserFileReader.onerror = browserFileReader.onabort = function (event) {
        if (callbacks.onError) {
          callbacks.onError({ "type": "blob", "info": browserFileReader.error });
        }
      };

      browserFileReader.readAsArrayBuffer(blob);
    }
  }, {
    key: 'getByteAt',
    value: function getByteAt(offset) {
      return this._fileData.getByteAt(offset);
    }
  }], [{
    key: 'canReadFile',
    value: function canReadFile(file) {
      return typeof Blob !== "undefined" && file instanceof Blob ||
      // File extends Blob but it seems that File instanceof Blob doesn't
      // quite work as expected in Cordova/PhoneGap.
      typeof File !== "undefined" && file instanceof File;
    }
  }]);

  return BlobFileReader;
})(MediaFileReader);

module.exports = BlobFileReader;

},{"./ChunkedFileData":4,"./FlowTypes":5,"./MediaFileReader":10}],4:[function(require,module,exports){
/**
 * This class represents a file that might not have all its data loaded yet.
 * It is used when loading the entire file is not an option because it's too
 * expensive. Instead, parts of the file are loaded and added only when needed.
 * From a reading point of view is as if the entire file is loaded. The
 * exception is when the data is not available yet, an error will be thrown.
 * This class does not load the data, it just manages it. It provides operations
 * to add and read data from the file.
 *
 * 
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _FlowTypes = require('./FlowTypes');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NOT_FOUND = -1;

var ChunkedFileData = (function () {
  _createClass(ChunkedFileData, null, [{
    key: 'NOT_FOUND',

    // $FlowIssue - get/set properties not yet supported
    get: function () {
      return NOT_FOUND;
    }
  }]);

  function ChunkedFileData() {
    _classCallCheck(this, ChunkedFileData);

    this._fileData = [];
  }

  /**
   * Adds data to the file storage at a specific offset.
   */

  _createClass(ChunkedFileData, [{
    key: 'addData',
    value: function addData(offset, data) {
      var offsetEnd = offset + data.length - 1;
      var chunkRange = this._getChunkRange(offset, offsetEnd);

      if (chunkRange.startIx === NOT_FOUND) {
        this._fileData.splice(chunkRange.insertIx || 0, 0, {
          offset: offset,
          data: data
        });
      } else {
        // If the data to add collides with existing chunks we prepend and
        // append data from the half colliding chunks to make the collision at
        // 100%. The new data can then replace all the colliding chunkes.
        var firstChunk = this._fileData[chunkRange.startIx];
        var lastChunk = this._fileData[chunkRange.endIx];
        var needsPrepend = offset > firstChunk.offset;
        var needsAppend = offsetEnd < lastChunk.offset + lastChunk.data.length - 1;

        var chunk = {
          offset: Math.min(offset, firstChunk.offset),
          data: data
        };

        if (needsPrepend) {
          var slicedData = firstChunk.data.slice(0, offset - firstChunk.offset);
          chunk.data = this._concatData(slicedData, data);
        }

        if (needsAppend) {
          // Use the lastChunk because the slice logic is easier to handle.
          var slicedData = chunk.data.slice(0, lastChunk.offset - chunk.offset);
          chunk.data = this._concatData(slicedData, lastChunk.data);
        }

        this._fileData.splice(chunkRange.startIx, chunkRange.endIx - chunkRange.startIx + 1, chunk);
      }
    }
  }, {
    key: '_concatData',
    value: function _concatData(dataA, dataB) {
      // TypedArrays don't support concat.
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView(dataA)) {
        var dataAandB = new dataA.constructor(dataA.length + dataB.length);
        dataAandB.set(dataA, 0);
        dataAandB.set(dataB, dataA.length);
        return dataAandB;
      } else {
        return dataA.concat(dataB);
      }
    }

    /**
     * Finds the chunk range that overlaps the [offsetStart-1,offsetEnd+1] range.
     * When a chunk is adjacent to the offset we still consider it part of the
     * range (this is the situation of offsetStart-1 or offsetEnd+1).
     * When no chunks are found `insertIx` denotes the index where the data
     * should be inserted in the data list (startIx == NOT_FOUND and endIX ==
     * NOT_FOUND).
     */

  }, {
    key: '_getChunkRange',
    value: function _getChunkRange(offsetStart, offsetEnd) {
      var startChunkIx = NOT_FOUND;
      var endChunkIx = NOT_FOUND;
      var insertIx = 0;

      // Could use binary search but not expecting that many blocks to exist.
      for (var i = 0; i < this._fileData.length; i++, insertIx = i) {
        var chunkOffsetStart = this._fileData[i].offset;
        var chunkOffsetEnd = chunkOffsetStart + this._fileData[i].data.length;

        if (offsetEnd < chunkOffsetStart - 1) {
          // This offset range doesn't overlap with any chunks.
          break;
        }
        // If it is adjacent we still consider it part of the range because
        // we're going end up with a single block with all contiguous data.
        if (offsetStart <= chunkOffsetEnd + 1 && offsetEnd >= chunkOffsetStart - 1) {
          startChunkIx = i;
          break;
        }
      }

      // No starting chunk was found, meaning that the offset is either before
      // or after the current stored chunks.
      if (startChunkIx === NOT_FOUND) {
        return {
          startIx: NOT_FOUND,
          endIx: NOT_FOUND,
          insertIx: insertIx
        };
      }

      // Find the ending chunk.
      for (var i = startChunkIx; i < this._fileData.length; i++) {
        var chunkOffsetStart = this._fileData[i].offset;
        var chunkOffsetEnd = chunkOffsetStart + this._fileData[i].data.length;

        if (offsetEnd >= chunkOffsetStart - 1) {
          // Candidate for the end chunk, it doesn't mean it is yet.
          endChunkIx = i;
        }
        if (offsetEnd <= chunkOffsetEnd + 1) {
          break;
        }
      }

      if (endChunkIx === NOT_FOUND) {
        endChunkIx = startChunkIx;
      }

      return {
        startIx: startChunkIx,
        endIx: endChunkIx
      };
    }
  }, {
    key: 'hasDataRange',
    value: function hasDataRange(offsetStart, offsetEnd) {
      for (var i = 0; i < this._fileData.length; i++) {
        var chunk = this._fileData[i];
        if (offsetEnd < chunk.offset) {
          return false;
        }

        if (offsetStart >= chunk.offset && offsetEnd < chunk.offset + chunk.data.length) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: 'getByteAt',
    value: function getByteAt(offset) {
      var dataChunk;

      for (var i = 0; i < this._fileData.length; i++) {
        var dataChunkStart = this._fileData[i].offset;
        var dataChunkEnd = dataChunkStart + this._fileData[i].data.length - 1;

        if (offset >= dataChunkStart && offset <= dataChunkEnd) {
          dataChunk = this._fileData[i];
          break;
        }
      }

      if (dataChunk) {
        return dataChunk.data[offset - dataChunk.offset];
      }

      throw new Error("Offset " + offset + " hasn't been loaded yet.");
    }
  }]);

  return ChunkedFileData;
})();

module.exports = ChunkedFileData;

},{"./FlowTypes":5}],5:[function(require,module,exports){
"use strict";

var MediaFileReader = require('./MediaFileReader');

},{"./MediaFileReader":10}],6:[function(require,module,exports){

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _FlowTypes = require('./FlowTypes');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MediaTagReader = require('./MediaTagReader');
var MediaFileReader = require('./MediaFileReader');

var ID3v1TagReader = (function (_MediaTagReader) {
  _inherits(ID3v1TagReader, _MediaTagReader);

  function ID3v1TagReader() {
    _classCallCheck(this, ID3v1TagReader);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ID3v1TagReader).apply(this, arguments));
  }

  _createClass(ID3v1TagReader, [{
    key: '_loadData',
    value: function _loadData(mediaFileReader, callbacks) {
      var fileSize = mediaFileReader.getSize();
      mediaFileReader.loadRange([fileSize - 128, fileSize - 1], callbacks);
    }
  }, {
    key: '_parseData',
    value: function _parseData(data, tags) {
      var offset = data.getSize() - 128;

      var title = data.getStringWithCharsetAt(offset + 3, 30).toString();
      var artist = data.getStringWithCharsetAt(offset + 33, 30).toString();
      var album = data.getStringWithCharsetAt(offset + 63, 30).toString();
      var year = data.getStringWithCharsetAt(offset + 93, 4).toString();

      var trackFlag = data.getByteAt(offset + 97 + 28);
      var track = data.getByteAt(offset + 97 + 29);
      if (trackFlag == 0 && track != 0) {
        var version = "1.1";
        var comment = data.getStringWithCharsetAt(offset + 97, 28).toString();
      } else {
        var version = "1.0";
        var comment = data.getStringWithCharsetAt(offset + 97, 30).toString();
        track = 0;
      }

      var genreIdx = data.getByteAt(offset + 97 + 30);
      if (genreIdx < 255) {
        var genre = GENRES[genreIdx];
      } else {
        var genre = "";
      }

      var tag = {
        "type": "ID3",
        "version": version,
        "tags": {
          "title": title,
          "artist": artist,
          "album": album,
          "year": year,
          "comment": comment,
          "genre": genre
        }
      };

      if (track) {
        // $FlowIssue - flow is not happy with adding properties
        tag.tags.track = track;
      }

      return tag;
    }
  }], [{
    key: 'getTagIdentifierByteRange',
    value: function getTagIdentifierByteRange() {
      // The identifier is TAG and is at offset: -128. However, to avoid a
      // fetch for the tag identifier and another for the data, we load the
      // entire data since it's so small.
      return {
        offset: -128,
        length: 128
      };
    }
  }, {
    key: 'canReadTagFormat',
    value: function canReadTagFormat(tagIdentifier) {
      var id = String.fromCharCode.apply(String, tagIdentifier.slice(0, 3));
      return id === "TAG";
    }
  }]);

  return ID3v1TagReader;
})(MediaTagReader);

var GENRES = ["Blues", "Classic Rock", "Country", "Dance", "Disco", "Funk", "Grunge", "Hip-Hop", "Jazz", "Metal", "New Age", "Oldies", "Other", "Pop", "R&B", "Rap", "Reggae", "Rock", "Techno", "Industrial", "Alternative", "Ska", "Death Metal", "Pranks", "Soundtrack", "Euro-Techno", "Ambient", "Trip-Hop", "Vocal", "Jazz+Funk", "Fusion", "Trance", "Classical", "Instrumental", "Acid", "House", "Game", "Sound Clip", "Gospel", "Noise", "AlternRock", "Bass", "Soul", "Punk", "Space", "Meditative", "Instrumental Pop", "Instrumental Rock", "Ethnic", "Gothic", "Darkwave", "Techno-Industrial", "Electronic", "Pop-Folk", "Eurodance", "Dream", "Southern Rock", "Comedy", "Cult", "Gangsta", "Top 40", "Christian Rap", "Pop/Funk", "Jungle", "Native American", "Cabaret", "New Wave", "Psychadelic", "Rave", "Showtunes", "Trailer", "Lo-Fi", "Tribal", "Acid Punk", "Acid Jazz", "Polka", "Retro", "Musical", "Rock & Roll", "Hard Rock", "Folk", "Folk-Rock", "National Folk", "Swing", "Fast Fusion", "Bebob", "Latin", "Revival", "Celtic", "Bluegrass", "Avantgarde", "Gothic Rock", "Progressive Rock", "Psychedelic Rock", "Symphonic Rock", "Slow Rock", "Big Band", "Chorus", "Easy Listening", "Acoustic", "Humour", "Speech", "Chanson", "Opera", "Chamber Music", "Sonata", "Symphony", "Booty Bass", "Primus", "Porn Groove", "Satire", "Slow Jam", "Club", "Tango", "Samba", "Folklore", "Ballad", "Power Ballad", "Rhythmic Soul", "Freestyle", "Duet", "Punk Rock", "Drum Solo", "Acapella", "Euro-House", "Dance Hall"];

module.exports = ID3v1TagReader;

},{"./FlowTypes":5,"./MediaFileReader":10,"./MediaTagReader":11}],7:[function(require,module,exports){

'use strict';

var _FlowTypes = require('./FlowTypes');

var MediaFileReader = require('./MediaFileReader');

var ID3v2FrameReader = {
  getFrameReaderFunction: function (frameId) {
    if (frameId in frameReaderFunctions) {
      return frameReaderFunctions[frameId];
    } else if (frameId[0] === "T") {
      // All frame ids starting with T are text tags.
      return frameReaderFunctions["T*"];
    } else {
      return null;
    }
  }
};

var frameReaderFunctions = {};

frameReaderFunctions['APIC'] = function readPictureFrame(offset, length, data, flags, majorVersion) {
  majorVersion = majorVersion || '3';

  var start = offset;
  var charset = getTextEncoding(data.getByteAt(offset));
  switch (majorVersion) {
    case '2':
      var format = data.getStringAt(offset + 1, 3);
      offset += 4;
      break;

    case '3':
    case '4':
      var format = data.getStringWithCharsetAt(offset + 1, length - (offset - start));
      offset += 1 + format.bytesReadCount;
      break;
  }
  var bite = data.getByteAt(offset, 1);
  var type = PICTURE_TYPE[bite];
  var desc = data.getStringWithCharsetAt(offset + 1, length - (offset - start), charset);

  offset += 1 + desc.bytesReadCount;

  return {
    "format": format.toString(),
    "type": type,
    "description": desc.toString(),
    "data": data.getBytesAt(offset, start + length - offset)
  };
};

frameReaderFunctions['COMM'] = function readCommentsFrame(offset, length, data, flags, majorVersion) {
  var start = offset;
  var charset = getTextEncoding(data.getByteAt(offset));
  var language = data.getStringAt(offset + 1, 3);
  var shortdesc = data.getStringWithCharsetAt(offset + 4, length - 4, charset);

  offset += 4 + shortdesc.bytesReadCount;
  var text = data.getStringWithCharsetAt(offset, start + length - offset, charset);

  return {
    language: language,
    short_description: shortdesc.toString(),
    text: text.toString()
  };
};

frameReaderFunctions['COM'] = frameReaderFunctions['COMM'];

frameReaderFunctions['PIC'] = function (offset, length, data, flags, majorVersion) {
  return frameReaderFunctions['APIC'](offset, length, data, flags, '2');
};

frameReaderFunctions['PCNT'] = function readCounterFrame(offset, length, data, flags, majorVersion) {
  // FIXME: implement the rest of the spec
  return data.getLongAt(offset, false);
};

frameReaderFunctions['CNT'] = frameReaderFunctions['PCNT'];

frameReaderFunctions['T*'] = function readTextFrame(offset, length, data, flags, majorVersion) {
  var charset = getTextEncoding(data.getByteAt(offset));

  return data.getStringWithCharsetAt(offset + 1, length - 1, charset).toString();
};

frameReaderFunctions['TCON'] = function readGenreFrame(offset, length, data, flags) {
  var text = frameReaderFunctions['T*'].apply(this, arguments);
  return text.replace(/^\(\d+\)/, '');
};

frameReaderFunctions['TCO'] = frameReaderFunctions['TCON'];

frameReaderFunctions['USLT'] = function readLyricsFrame(offset, length, data, flags, majorVersion) {
  var start = offset;
  var charset = getTextEncoding(data.getByteAt(offset));
  var language = data.getStringAt(offset + 1, 3);
  var descriptor = data.getStringWithCharsetAt(offset + 4, length - 4, charset);

  offset += 4 + descriptor.bytesReadCount;
  var lyrics = data.getStringWithCharsetAt(offset, start + length - offset, charset);

  return {
    language: language,
    descriptor: descriptor.toString(),
    lyrics: lyrics.toString()
  };
};

frameReaderFunctions['ULT'] = frameReaderFunctions['USLT'];

function getTextEncoding(bite) {
  var charset;

  switch (bite) {
    case 0x00:
      charset = 'iso-8859-1';
      break;

    case 0x01:
      charset = 'utf-16';
      break;

    case 0x02:
      charset = 'utf-16be';
      break;

    case 0x03:
      charset = 'utf-8';
      break;
  }

  return charset;
}

var PICTURE_TYPE = ["Other", "32x32 pixels 'file icon' (PNG only)", "Other file icon", "Cover (front)", "Cover (back)", "Leaflet page", "Media (e.g. label side of CD)", "Lead artist/lead performer/soloist", "Artist/performer", "Conductor", "Band/Orchestra", "Composer", "Lyricist/text writer", "Recording Location", "During recording", "During performance", "Movie/video screen capture", "A bright coloured fish", "Illustration", "Band/artist logotype", "Publisher/Studio logotype"];

module.exports = ID3v2FrameReader;

},{"./FlowTypes":5,"./MediaFileReader":10}],8:[function(require,module,exports){

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _FlowTypes = require('./FlowTypes');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MediaTagReader = require('./MediaTagReader');
var MediaFileReader = require('./MediaFileReader');
var ID3v2FrameReader = require('./ID3v2FrameReader');

var ID3v2TagReader = (function (_MediaTagReader) {
  _inherits(ID3v2TagReader, _MediaTagReader);

  function ID3v2TagReader() {
    _classCallCheck(this, ID3v2TagReader);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ID3v2TagReader).apply(this, arguments));
  }

  _createClass(ID3v2TagReader, [{
    key: '_loadData',
    value: function _loadData(mediaFileReader, callbacks) {
      mediaFileReader.loadRange([6, 9], {
        onSuccess: function () {
          mediaFileReader.loadRange([0, mediaFileReader.getSynchsafeInteger32At(6)], callbacks);
        },
        onError: callbacks.onError
      });
    }
  }, {
    key: '_parseData',
    value: function _parseData(data, tags) {
      var offset = 0;
      var major = data.getByteAt(offset + 3);
      if (major > 4) {
        return { "type": "ID3", "version": ">2.4", "tags": {} };
      }
      var revision = data.getByteAt(offset + 4);
      var unsynch = data.isBitSetAt(offset + 5, 7);
      var xheader = data.isBitSetAt(offset + 5, 6);
      var xindicator = data.isBitSetAt(offset + 5, 5);
      var size = data.getSynchsafeInteger32At(offset + 6);
      offset += 10;

      if (xheader) {
        // TODO: support 2.4
        var xheadersize = data.getLongAt(offset, true);
        // The 'Extended header size', currently 6 or 10 bytes, excludes itself.
        offset += xheadersize + 4;
      }

      var id3 = {
        "type": "ID3",
        "version": '2.' + major + '.' + revision,
        "major": major,
        "revision": revision,
        "flags": {
          "unsynchronisation": unsynch,
          "extended_header": xheader,
          "experimental_indicator": xindicator,
          // TODO: footer_present
          "footer_present": false
        },
        "size": size,
        "tags": {}
      };

      if (unsynch) {
        var frames = {};
      } else {
        var frames = this._readFrames(offset, size - 10, data, id3, tags);
      }

      // create shortcuts for most common data.
      for (var name in SHORTCUTS) {
        if (SHORTCUTS.hasOwnProperty(name)) {
          var frameData = this._getFrameData(frames, SHORTCUTS[name]);
          if (frameData) {
            id3.tags[name] = frameData;
          }
        }
      }for (var frame in frames) {
        if (frames.hasOwnProperty(frame)) {
          id3.tags[frame] = frames[frame];
        }
      }return id3;
    }

    /**
     * All the frames consists of a frame header followed by one or more fields
     * containing the actual information.
     * The frame ID made out of the characters capital A-Z and 0-9. Identifiers
     * beginning with "X", "Y" and "Z" are for experimental use and free for
     * everyone to use, without the need to set the experimental bit in the tag
     * header. Have in mind that someone else might have used the same identifier
     * as you. All other identifiers are either used or reserved for future use.
     * The frame ID is followed by a size descriptor, making a total header size
     * of ten bytes in every frame. The size is calculated as frame size excluding
     * frame header (frame size - 10).
     */

  }, {
    key: '_readFrames',
    value: function _readFrames(offset, end, data, id3header, tags) {
      var frames = {};

      if (tags) {
        tags = this._expandShortcutTags(tags);
      }

      while (offset < end) {
        var header = this._readFrameHeader(data, offset, id3header);
        var frameId = header.id;

        // If the header size is 0 then we're probably hit the padding if it
        // exists.
        if (header.size === 0) {
          break;
        }
        // No frame ID sometimes means it's the last frame (GTFO).
        if (!frameId) {
          break;
        }

        var flags = header.flags;
        var frameSize = header.size;
        var frameDataOffset = offset + header.headerSize;

        // advance data offset to the next frame data
        offset += header.headerSize + header.size;

        // skip unwanted tags
        if (tags && tags.indexOf(frameId) === -1) {
          continue;
        }

        // TODO: support unsynchronisation
        if (flags && flags.format.unsynchronisation) {
          continue;
        }

        // the first 4 bytes are the real data size
        // (after unsynchronisation && encryption)
        if (flags && flags.format.data_length_indicator) {
          // var frameDataSize = readSynchsafeInteger32At(frameDataOffset, frameData);
          frameDataOffset += 4;
          frameSize -= 4;
        }

        var readFrameFunc = ID3v2FrameReader.getFrameReaderFunction(frameId);
        var parsedData = readFrameFunc ? readFrameFunc(frameDataOffset, frameSize, data, flags) : null;
        var desc = this._getFrameDescription(frameId);

        var frame = {
          id: frameId,
          size: frameSize,
          description: desc,
          data: parsedData
        };

        if (frameId in frames) {
          if (frames[frameId].id) {
            frames[frameId] = [frames[frameId]];
          }
          frames[frameId].push(frame);
        } else {
          frames[frameId] = frame;
        }
      }

      return frames;
    }
  }, {
    key: '_readFrameHeader',
    value: function _readFrameHeader(data, offset, id3header) {
      var major = id3header.major;
      var flags = null;

      switch (major) {
        case 2:
          var frameId = data.getStringAt(offset, 3);
          var frameSize = data.getInteger24At(offset + 3, true);
          var frameHeaderSize = 6;
          break;

        case 3:
          var frameId = data.getStringAt(offset, 4);
          var frameSize = data.getLongAt(offset + 4, true);
          var frameHeaderSize = 10;
          break;

        case 4:
          var frameId = data.getStringAt(offset, 4);
          var frameSize = data.getSynchsafeInteger32At(offset + 4);
          var frameHeaderSize = 10;
          break;
      }

      // if frameId is empty then it's the last frame
      if (frameId) {
        // read frame message and format flags
        if (major > 2) {
          flags = this._readFrameFlags(data, offset + 8);
        }
      }

      return {
        "id": frameId,
        "size": frameSize,
        "headerSize": frameHeaderSize,
        "flags": flags
      };
    }
  }, {
    key: '_readFrameFlags',
    value: function _readFrameFlags(data, offset) {
      return {
        message: {
          tag_alter_preservation: data.isBitSetAt(offset, 6),
          file_alter_preservation: data.isBitSetAt(offset, 5),
          read_only: data.isBitSetAt(offset, 4)
        },
        format: {
          grouping_identity: data.isBitSetAt(offset + 1, 7),
          compression: data.isBitSetAt(offset + 1, 3),
          encryption: data.isBitSetAt(offset + 1, 2),
          unsynchronisation: data.isBitSetAt(offset + 1, 1),
          data_length_indicator: data.isBitSetAt(offset + 1, 0)
        }
      };
    }
  }, {
    key: '_getFrameData',
    value: function _getFrameData(frames, ids) {
      for (var i = 0, id; id = ids[i]; i++) {
        if (id in frames) {
          return frames[id].data;
        }
      }
    }
  }, {
    key: '_getFrameDescription',
    value: function _getFrameDescription(frameId) {
      if (frameId in FRAME_DESCRIPTIONS) {
        return FRAME_DESCRIPTIONS[frameId];
      } else {
        return 'Unknown';
      }
    }
  }, {
    key: 'getShortcuts',
    value: function getShortcuts() {
      return SHORTCUTS;
    }
  }], [{
    key: 'getTagIdentifierByteRange',
    value: function getTagIdentifierByteRange() {
      // ID3 header
      return {
        offset: 0,
        length: 10
      };
    }
  }, {
    key: 'canReadTagFormat',
    value: function canReadTagFormat(tagIdentifier) {
      var id = String.fromCharCode.apply(String, tagIdentifier.slice(0, 3));
      return id === 'ID3';
    }
  }]);

  return ID3v2TagReader;
})(MediaTagReader);

var FRAME_DESCRIPTIONS = {
  // v2.2
  "BUF": "Recommended buffer size",
  "CNT": "Play counter",
  "COM": "Comments",
  "CRA": "Audio encryption",
  "CRM": "Encrypted meta frame",
  "ETC": "Event timing codes",
  "EQU": "Equalization",
  "GEO": "General encapsulated object",
  "IPL": "Involved people list",
  "LNK": "Linked information",
  "MCI": "Music CD Identifier",
  "MLL": "MPEG location lookup table",
  "PIC": "Attached picture",
  "POP": "Popularimeter",
  "REV": "Reverb",
  "RVA": "Relative volume adjustment",
  "SLT": "Synchronized lyric/text",
  "STC": "Synced tempo codes",
  "TAL": "Album/Movie/Show title",
  "TBP": "BPM (Beats Per Minute)",
  "TCM": "Composer",
  "TCO": "Content type",
  "TCR": "Copyright message",
  "TDA": "Date",
  "TDY": "Playlist delay",
  "TEN": "Encoded by",
  "TFT": "File type",
  "TIM": "Time",
  "TKE": "Initial key",
  "TLA": "Language(s)",
  "TLE": "Length",
  "TMT": "Media type",
  "TOA": "Original artist(s)/performer(s)",
  "TOF": "Original filename",
  "TOL": "Original Lyricist(s)/text writer(s)",
  "TOR": "Original release year",
  "TOT": "Original album/Movie/Show title",
  "TP1": "Lead artist(s)/Lead performer(s)/Soloist(s)/Performing group",
  "TP2": "Band/Orchestra/Accompaniment",
  "TP3": "Conductor/Performer refinement",
  "TP4": "Interpreted, remixed, or otherwise modified by",
  "TPA": "Part of a set",
  "TPB": "Publisher",
  "TRC": "ISRC (International Standard Recording Code)",
  "TRD": "Recording dates",
  "TRK": "Track number/Position in set",
  "TSI": "Size",
  "TSS": "Software/hardware and settings used for encoding",
  "TT1": "Content group description",
  "TT2": "Title/Songname/Content description",
  "TT3": "Subtitle/Description refinement",
  "TXT": "Lyricist/text writer",
  "TXX": "User defined text information frame",
  "TYE": "Year",
  "UFI": "Unique file identifier",
  "ULT": "Unsychronized lyric/text transcription",
  "WAF": "Official audio file webpage",
  "WAR": "Official artist/performer webpage",
  "WAS": "Official audio source webpage",
  "WCM": "Commercial information",
  "WCP": "Copyright/Legal information",
  "WPB": "Publishers official webpage",
  "WXX": "User defined URL link frame",
  // v2.3
  "AENC": "Audio encryption",
  "APIC": "Attached picture",
  "ASPI": "Audio seek point index",
  "COMM": "Comments",
  "COMR": "Commercial frame",
  "ENCR": "Encryption method registration",
  "EQU2": "Equalisation (2)",
  "EQUA": "Equalization",
  "ETCO": "Event timing codes",
  "GEOB": "General encapsulated object",
  "GRID": "Group identification registration",
  "IPLS": "Involved people list",
  "LINK": "Linked information",
  "MCDI": "Music CD identifier",
  "MLLT": "MPEG location lookup table",
  "OWNE": "Ownership frame",
  "PRIV": "Private frame",
  "PCNT": "Play counter",
  "POPM": "Popularimeter",
  "POSS": "Position synchronisation frame",
  "RBUF": "Recommended buffer size",
  "RVA2": "Relative volume adjustment (2)",
  "RVAD": "Relative volume adjustment",
  "RVRB": "Reverb",
  "SEEK": "Seek frame",
  "SYLT": "Synchronized lyric/text",
  "SYTC": "Synchronized tempo codes",
  "TALB": "Album/Movie/Show title",
  "TBPM": "BPM (beats per minute)",
  "TCOM": "Composer",
  "TCON": "Content type",
  "TCOP": "Copyright message",
  "TDAT": "Date",
  "TDLY": "Playlist delay",
  "TDRC": "Recording time",
  "TDRL": "Release time",
  "TDTG": "Tagging time",
  "TENC": "Encoded by",
  "TEXT": "Lyricist/Text writer",
  "TFLT": "File type",
  "TIME": "Time",
  "TIPL": "Involved people list",
  "TIT1": "Content group description",
  "TIT2": "Title/songname/content description",
  "TIT3": "Subtitle/Description refinement",
  "TKEY": "Initial key",
  "TLAN": "Language(s)",
  "TLEN": "Length",
  "TMCL": "Musician credits list",
  "TMED": "Media type",
  "TMOO": "Mood",
  "TOAL": "Original album/movie/show title",
  "TOFN": "Original filename",
  "TOLY": "Original lyricist(s)/text writer(s)",
  "TOPE": "Original artist(s)/performer(s)",
  "TORY": "Original release year",
  "TOWN": "File owner/licensee",
  "TPE1": "Lead performer(s)/Soloist(s)",
  "TPE2": "Band/orchestra/accompaniment",
  "TPE3": "Conductor/performer refinement",
  "TPE4": "Interpreted, remixed, or otherwise modified by",
  "TPOS": "Part of a set",
  "TPRO": "Produced notice",
  "TPUB": "Publisher",
  "TRCK": "Track number/Position in set",
  "TRDA": "Recording dates",
  "TRSN": "Internet radio station name",
  "TRSO": "Internet radio station owner",
  "TSOA": "Album sort order",
  "TSOP": "Performer sort order",
  "TSOT": "Title sort order",
  "TSIZ": "Size",
  "TSRC": "ISRC (international standard recording code)",
  "TSSE": "Software/Hardware and settings used for encoding",
  "TSST": "Set subtitle",
  "TYER": "Year",
  "TXXX": "User defined text information frame",
  "UFID": "Unique file identifier",
  "USER": "Terms of use",
  "USLT": "Unsychronized lyric/text transcription",
  "WCOM": "Commercial information",
  "WCOP": "Copyright/Legal information",
  "WOAF": "Official audio file webpage",
  "WOAR": "Official artist/performer webpage",
  "WOAS": "Official audio source webpage",
  "WORS": "Official internet radio station homepage",
  "WPAY": "Payment",
  "WPUB": "Publishers official webpage",
  "WXXX": "User defined URL link frame"
};

var SHORTCUTS = {
  "title": ["TIT2", "TT2"],
  "artist": ["TPE1", "TP1"],
  "album": ["TALB", "TAL"],
  "year": ["TYER", "TYE"],
  "comment": ["COMM", "COM"],
  "track": ["TRCK", "TRK"],
  "genre": ["TCON", "TCO"],
  "picture": ["APIC", "PIC"],
  "lyrics": ["USLT", "ULT"]
};

module.exports = ID3v2TagReader;

},{"./FlowTypes":5,"./ID3v2FrameReader":7,"./MediaFileReader":10,"./MediaTagReader":11}],9:[function(require,module,exports){
/**
 * Support for iTunes-style m4a tags
 * See:
 *   http://atomicparsley.sourceforge.net/mpeg-4files.html
 *   http://developer.apple.com/mac/library/documentation/QuickTime/QTFF/Metadata/Metadata.html
 * Authored by Joshua Kifer <joshua.kifer gmail.com>
 * 
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _FlowTypes = require('./FlowTypes');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MediaTagReader = require('./MediaTagReader');
var MediaFileReader = require('./MediaFileReader');

var MP4TagReader = (function (_MediaTagReader) {
  _inherits(MP4TagReader, _MediaTagReader);

  function MP4TagReader() {
    _classCallCheck(this, MP4TagReader);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MP4TagReader).apply(this, arguments));
  }

  _createClass(MP4TagReader, [{
    key: '_loadData',
    value: function _loadData(mediaFileReader, callbacks) {
      // MP4 metadata isn't located in a specific location of the file. Roughly
      // speaking, it's composed of blocks chained together like a linked list.
      // These blocks are called atoms (or boxes).
      // Each atom of the list can have its own child linked list. Atoms in this
      // situation do not possess any data and are called "container" as they only
      // contain other atoms.
      // Other atoms represent a particular set of data, like audio, video or
      // metadata. In order to find and load all the interesting atoms we need
      // to traverse the entire linked list of atoms and only load the ones
      // associated with metadata.
      // The metadata atoms can be find under the "moov.udta.meta.ilst" hierarchy.

      var self = this;
      // Load the header of the first atom
      mediaFileReader.loadRange([0, 16], {
        onSuccess: function () {
          self._loadAtom(mediaFileReader, 0, "", callbacks);
        },
        onError: callbacks.onError
      });
    }
  }, {
    key: '_loadAtom',
    value: function _loadAtom(mediaFileReader, offset, parentAtomFullName, callbacks) {
      if (offset >= mediaFileReader.getSize()) {
        callbacks.onSuccess();
        return;
      }

      var self = this;
      // 8 is the size of the atomSize and atomName fields.
      // When reading the current block we always read 8 more bytes in order
      // to also read the header of the next block.
      var atomSize = mediaFileReader.getLongAt(offset, true);
      if (atomSize == 0 || isNaN(atomSize)) {
        callbacks.onSuccess();
        return;
      }
      var atomName = mediaFileReader.getStringAt(offset + 4, 4);
      // console.log(parentAtomFullName, atomName, atomSize);
      // Container atoms (no actual data)
      if (this._isContainerAtom(atomName)) {
        if (atomName == "meta") {
          // The "meta" atom breaks convention and is a container with data.
          offset += 4; // next_item_id (uint32)
        }
        var atomFullName = (parentAtomFullName ? parentAtomFullName + "." : "") + atomName;
        if (atomFullName === "moov.udta.meta.ilst") {
          mediaFileReader.loadRange([offset, offset + atomSize], callbacks);
        } else {
          mediaFileReader.loadRange([offset + 8, offset + 8 + 8], {
            onSuccess: function () {
              self._loadAtom(mediaFileReader, offset + 8, atomFullName, callbacks);
            },
            onError: callbacks.onError
          });
        }
      } else {
        mediaFileReader.loadRange([offset + atomSize, offset + atomSize + 8], {
          onSuccess: function () {
            self._loadAtom(mediaFileReader, offset + atomSize, parentAtomFullName, callbacks);
          },
          onError: callbacks.onError
        });
      }
    }
  }, {
    key: '_isContainerAtom',
    value: function _isContainerAtom(atomName) {
      return ["moov", "udta", "meta", "ilst"].indexOf(atomName) >= 0;
    }
  }, {
    key: '_canReadAtom',
    value: function _canReadAtom(atomName) {
      return atomName !== "----";
    }
  }, {
    key: '_parseData',
    value: function _parseData(data, tagsToRead) {
      var tags = {};

      tagsToRead = this._expandShortcutTags(tagsToRead);
      this._readAtom(tags, data, 0, data.getSize(), tagsToRead);

      // create shortcuts for most common data.
      for (var name in SHORTCUTS) {
        if (SHORTCUTS.hasOwnProperty(name)) {
          var tag = tags[SHORTCUTS[name]];
          if (tag) {
            if (name === "track") {
              tags[name] = tag.data.track;
            } else {
              tags[name] = tag.data;
            }
          }
        }
      }return {
        "type": "MP4",
        "ftyp": data.getStringAt(8, 4),
        "version": data.getLongAt(12, true),
        "tags": tags
      };
    }
  }, {
    key: '_readAtom',
    value: function _readAtom(tags, data, offset, length, tagsToRead, parentAtomFullName, indent) {
      indent = indent === undefined ? "" : indent + "  ";

      var seek = offset;
      while (seek < offset + length) {
        var atomSize = data.getLongAt(seek, true);
        if (atomSize == 0) {
          return;
        }
        var atomName = data.getStringAt(seek + 4, 4);

        // console.log(seek, parentAtomFullName, atomName, atomSize);
        if (this._isContainerAtom(atomName)) {
          if (atomName == "meta") {
            seek += 4; // next_item_id (uint32)
          }
          var atomFullName = (parentAtomFullName ? parentAtomFullName + "." : "") + atomName;
          this._readAtom(tags, data, seek + 8, atomSize - 8, tagsToRead, atomFullName, indent);
          return;
        }

        // Value atoms
        if ((!tagsToRead || tagsToRead.indexOf(atomName) >= 0) && parentAtomFullName === "moov.udta.meta.ilst" && this._canReadAtom(atomName)) {
          tags[atomName] = this._readMetadataAtom(data, seek);
        }

        seek += atomSize;
      }
    }
  }, {
    key: '_readMetadataAtom',
    value: function _readMetadataAtom(data, offset) {
      // 16: name + size + "data" + size (4 bytes each)
      var METADATA_HEADER = 16;

      var atomSize = data.getLongAt(offset, true);
      var atomName = data.getStringAt(offset + 4, 4);

      var klass = data.getInteger24At(offset + METADATA_HEADER + 1, true);
      var type = TYPES[klass];
      var atomData;

      if (atomName == "trkn") {
        atomData = {
          "track": data.getByteAt(offset + METADATA_HEADER + 11),
          "total": data.getByteAt(offset + METADATA_HEADER + 13)
        };
      } else {
        // 4: atom version (1 byte) + atom flags (3 bytes)
        // 4: NULL (usually locale indicator)
        var atomHeader = METADATA_HEADER + 4 + 4;
        var dataStart = offset + atomHeader;
        var dataLength = atomSize - atomHeader;
        var atomData;

        switch (type) {
          case "text":
            atomData = data.getStringWithCharsetAt(dataStart, dataLength, "utf-8").toString();
            break;

          case "uint8":
            atomData = data.getShortAt(dataStart, false);
            break;

          case "jpeg":
          case "png":
            atomData = {
              "format": "image/" + type,
              "data": data.getBytesAt(dataStart, dataLength)
            };
            break;
        }
      }

      return {
        id: atomName,
        size: atomSize,
        description: ATOM_DESCRIPTIONS[atomName] || "Unknown",
        data: atomData
      };
    }
  }, {
    key: 'getShortcuts',
    value: function getShortcuts() {
      return SHORTCUTS;
    }
  }], [{
    key: 'getTagIdentifierByteRange',
    value: function getTagIdentifierByteRange() {
      // The tag identifier is located in [4, 8] but since we'll need to reader
      // the header of the first block anyway, we load it instead to avoid
      // making two requests.
      return {
        offset: 0,
        length: 16
      };
    }
  }, {
    key: 'canReadTagFormat',
    value: function canReadTagFormat(tagIdentifier) {
      var id = String.fromCharCode.apply(String, tagIdentifier.slice(4, 8));
      return id === "ftyp";
    }
  }]);

  return MP4TagReader;
})(MediaTagReader);

var TYPES = {
  "0": "uint8",
  "1": "text",
  "13": "jpeg",
  "14": "png",
  "21": "uint8"
};

var ATOM_DESCRIPTIONS = {
  "©alb": "Album",
  "©ART": "Artist",
  "aART": "Album Artist",
  "©day": "Release Date",
  "©nam": "Title",
  "©gen": "Genre",
  "gnre": "Genre",
  "trkn": "Track Number",
  "©wrt": "Composer",
  "©too": "Encoding Tool",
  "©enc": "Encoded By",
  "cprt": "Copyright",
  "covr": "Cover Art",
  "©grp": "Grouping",
  "keyw": "Keywords",
  "©lyr": "Lyrics",
  "©cmt": "Comment",
  "tmpo": "Tempo",
  "cpil": "Compilation",
  "disk": "Disc Number",
  "tvsh": "TV Show Name",
  "tven": "TV Episode ID",
  "tvsn": "TV Season",
  "tves": "TV Episode",
  "tvnn": "TV Network",
  "desc": "Description",
  "ldes": "Long Description",
  "sonm": "Sort Name",
  "soar": "Sort Artist",
  "soaa": "Sort Album",
  "soco": "Sort Composer",
  "sosn": "Sort Show",
  "purd": "Purchase Date",
  "pcst": "Podcast",
  "purl": "Podcast URL",
  "catg": "Category",
  "hdvd": "HD Video",
  "stik": "Media Type",
  "rtng": "Content Rating",
  "pgap": "Gapless Playback",
  "apID": "Purchase Account",
  "sfID": "Country Code"
};

var UNSUPPORTED_ATOMS = {
  "----": 1
};

var SHORTCUTS = {
  "title": "©nam",
  "artist": "©ART",
  "album": "©alb",
  "year": "©day",
  "comment": "©cmt",
  "track": "trkn",
  "genre": "©gen",
  "picture": "covr",
  "lyrics": "©lyr"
};

module.exports = MP4TagReader;

},{"./FlowTypes":5,"./MediaFileReader":10,"./MediaTagReader":11}],10:[function(require,module,exports){

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _StringUtils = require('./StringUtils');

var _FlowTypes = require('./FlowTypes');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StringUtils = require('./StringUtils');

var MediaFileReader = (function () {
  function MediaFileReader() {
    _classCallCheck(this, MediaFileReader);

    this._isInitialized = false;
    this._size = 0;
  }

  /**
   * Decides if this media file reader is able to read the given file.
   */

  _createClass(MediaFileReader, [{
    key: 'init',

    /**
     * This function needs to be called before any other function.
     * Loads the necessary initial information from the file.
     */
    value: function init(callbacks) {
      var self = this;

      if (this._isInitialized) {
        setTimeout(callbacks.onSuccess, 1);
      } else {
        return this._init({
          onSuccess: function () {
            self._isInitialized = true;
            callbacks.onSuccess();
          },
          onError: callbacks.onError
        });
      }
    }
  }, {
    key: '_init',
    value: function _init(callbacks) {
      throw new Error("Must implement init function");
    }

    /**
     * @param range The start and end indexes of the range to load.
     *        Ex: [0, 7] load bytes 0 to 7 inclusive.
     */

  }, {
    key: 'loadRange',
    value: function loadRange(range, callbacks) {
      throw new Error("Must implement loadRange function");
    }

    /**
     * @return The size of the file in bytes.
     */

  }, {
    key: 'getSize',
    value: function getSize() {
      if (!this._isInitialized) {
        throw new Error("init() must be called first.");
      }

      return this._size;
    }
  }, {
    key: 'getByteAt',
    value: function getByteAt(offset) {
      throw new Error("Must implement getByteAt function");
    }
  }, {
    key: 'getBytesAt',
    value: function getBytesAt(offset, length) {
      var bytes = new Array(length);
      for (var i = 0; i < length; i++) {
        bytes[i] = this.getByteAt(offset + i);
      }
      return bytes;
    }
  }, {
    key: 'isBitSetAt',
    value: function isBitSetAt(offset, bit) {
      var iByte = this.getByteAt(offset);
      return (iByte & 1 << bit) != 0;
    }
  }, {
    key: 'getSByteAt',
    value: function getSByteAt(offset) {
      var iByte = this.getByteAt(offset);
      if (iByte > 127) {
        return iByte - 256;
      } else {
        return iByte;
      }
    }
  }, {
    key: 'getShortAt',
    value: function getShortAt(offset, isBigEndian) {
      var iShort = isBigEndian ? (this.getByteAt(offset) << 8) + this.getByteAt(offset + 1) : (this.getByteAt(offset + 1) << 8) + this.getByteAt(offset);
      if (iShort < 0) {
        iShort += 65536;
      }
      return iShort;
    }
  }, {
    key: 'getSShortAt',
    value: function getSShortAt(offset, isBigEndian) {
      var iUShort = this.getShortAt(offset, isBigEndian);
      if (iUShort > 32767) {
        return iUShort - 65536;
      } else {
        return iUShort;
      }
    }
  }, {
    key: 'getLongAt',
    value: function getLongAt(offset, isBigEndian) {
      var iByte1 = this.getByteAt(offset),
          iByte2 = this.getByteAt(offset + 1),
          iByte3 = this.getByteAt(offset + 2),
          iByte4 = this.getByteAt(offset + 3);

      var iLong = isBigEndian ? (((iByte1 << 8) + iByte2 << 8) + iByte3 << 8) + iByte4 : (((iByte4 << 8) + iByte3 << 8) + iByte2 << 8) + iByte1;

      if (iLong < 0) {
        iLong += 4294967296;
      }

      return iLong;
    }
  }, {
    key: 'getSLongAt',
    value: function getSLongAt(offset, isBigEndian) {
      var iULong = this.getLongAt(offset, isBigEndian);

      if (iULong > 2147483647) {
        return iULong - 4294967296;
      } else {
        return iULong;
      }
    }
  }, {
    key: 'getInteger24At',
    value: function getInteger24At(offset, isBigEndian) {
      var iByte1 = this.getByteAt(offset),
          iByte2 = this.getByteAt(offset + 1),
          iByte3 = this.getByteAt(offset + 2);

      var iInteger = isBigEndian ? ((iByte1 << 8) + iByte2 << 8) + iByte3 : ((iByte3 << 8) + iByte2 << 8) + iByte1;

      if (iInteger < 0) {
        iInteger += 16777216;
      }

      return iInteger;
    }
  }, {
    key: 'getStringAt',
    value: function getStringAt(offset, length) {
      var string = [];
      for (var i = offset, j = 0; i < offset + length; i++, j++) {
        string[j] = String.fromCharCode(this.getByteAt(i));
      }
      return string.join("");
    }
  }, {
    key: 'getStringWithCharsetAt',
    value: function getStringWithCharsetAt(offset, length, charset) {
      var bytes = this.getBytesAt(offset, length);
      var string;

      switch ((charset || '').toLowerCase()) {
        case "utf-16":
        case "utf-16le":
        case "utf-16be":
          string = StringUtils.readUTF16String(bytes, charset === "utf-16be");
          break;

        case "utf-8":
          string = StringUtils.readUTF8String(bytes);
          break;

        default:
          string = StringUtils.readNullTerminatedString(bytes);
          break;
      }

      // $FlowIssue - flow doesn't understand swtich default.
      return string;
    }
  }, {
    key: 'getCharAt',
    value: function getCharAt(offset) {
      return String.fromCharCode(this.getByteAt(offset));
    }

    /**
     * The ID3v2 tag/frame size is encoded with four bytes where the most
     * significant bit (bit 7) is set to zero in every byte, making a total of 28
     * bits. The zeroed bits are ignored, so a 257 bytes long tag is represented
     * as $00 00 02 01.
     */

  }, {
    key: 'getSynchsafeInteger32At',
    value: function getSynchsafeInteger32At(offset) {
      var size1 = this.getByteAt(offset);
      var size2 = this.getByteAt(offset + 1);
      var size3 = this.getByteAt(offset + 2);
      var size4 = this.getByteAt(offset + 3);
      // 0x7f = 0b01111111
      var size = size4 & 0x7f | (size3 & 0x7f) << 7 | (size2 & 0x7f) << 14 | (size1 & 0x7f) << 21;

      return size;
    }
  }], [{
    key: 'canReadFile',
    value: function canReadFile(file) {
      throw new Error("Must implement canReadFile function");
    }
  }]);

  return MediaFileReader;
})();

module.exports = MediaFileReader;

},{"./FlowTypes":5,"./StringUtils":12}],11:[function(require,module,exports){

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _FlowTypes = require('./FlowTypes');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MediaFileReader = require('./MediaFileReader');

var MediaTagReader = (function () {
  function MediaTagReader(mediaFileReader) {
    _classCallCheck(this, MediaTagReader);

    this._mediaFileReader = mediaFileReader;
    this._tags = null;
  }

  /**
   * Returns the byte range that needs to be loaded and fed to
   * _canReadTagFormat in order to identify if the file contains tag
   * information that can be read.
   */

  _createClass(MediaTagReader, [{
    key: 'setTagsToRead',
    value: function setTagsToRead(tags) {
      this._tags = tags;
      return this;
    }
  }, {
    key: 'read',
    value: function read(callbacks) {
      var self = this;

      this._mediaFileReader.init({
        onSuccess: function () {
          self._loadData(self._mediaFileReader, {
            onSuccess: function () {
              var tags = self._parseData(self._mediaFileReader, self._tags);
              // TODO: destroy mediaFileReader
              callbacks.onSuccess(tags);
            },
            onError: callbacks.onError
          });
        },
        onError: callbacks.onError
      });
    }
  }, {
    key: 'getShortcuts',
    value: function getShortcuts() {
      return {};
    }

    /**
     * Load the necessary bytes from the media file.
     */

  }, {
    key: '_loadData',
    value: function _loadData(mediaFileReader, callbacks) {
      throw new Error("Must implement _loadData function");
    }

    /**
     * Parse the loaded data to read the media tags.
     */

  }, {
    key: '_parseData',
    value: function _parseData(mediaFileReader, tags) {
      throw new Error("Must implement _parseData function");
    }
  }, {
    key: '_expandShortcutTags',
    value: function _expandShortcutTags(tagsWithShortcuts) {
      if (!tagsWithShortcuts) {
        return null;
      }

      var tags = [];
      var shortcuts = this.getShortcuts();
      for (var i = 0, tagOrShortcut; tagOrShortcut = tagsWithShortcuts[i]; i++) {
        tags = tags.concat(shortcuts[tagOrShortcut] || [tagOrShortcut]);
      }

      return tags;
    }
  }], [{
    key: 'getTagIdentifierByteRange',
    value: function getTagIdentifierByteRange() {
      throw new Error("Must implement");
    }

    /**
     * Given a tag identifier (read from the file byte positions speficied by
     * getTagIdentifierByteRange) this function checks if it can read the tag
     * format or not.
     */

  }, {
    key: 'canReadTagFormat',
    value: function canReadTagFormat(tagIdentifier) {
      throw new Error("Must implement");
    }
  }]);

  return MediaTagReader;
})();

module.exports = MediaTagReader;

},{"./FlowTypes":5,"./MediaFileReader":10}],12:[function(require,module,exports){

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InternalDecodedString = (function () {
  function InternalDecodedString(value, bytesReadCount) {
    _classCallCheck(this, InternalDecodedString);

    this._value = value;
    this.bytesReadCount = bytesReadCount;
    this.length = value.length;
  }

  _createClass(InternalDecodedString, [{
    key: "toString",
    value: function toString() {
      return this._value;
    }
  }]);

  return InternalDecodedString;
})();

var StringUtils = {
  readUTF16String: function (bytes, bigEndian, maxBytes) {
    var ix = 0;
    var offset1 = 1,
        offset2 = 0;

    maxBytes = Math.min(maxBytes || bytes.length, bytes.length);

    if (bytes[0] == 0xFE && bytes[1] == 0xFF) {
      bigEndian = true;
      ix = 2;
    } else if (bytes[0] == 0xFF && bytes[1] == 0xFE) {
      bigEndian = false;
      ix = 2;
    }
    if (bigEndian) {
      offset1 = 0;
      offset2 = 1;
    }

    var arr = [];
    for (var j = 0; ix < maxBytes; j++) {
      var byte1 = bytes[ix + offset1];
      var byte2 = bytes[ix + offset2];
      var word1 = (byte1 << 8) + byte2;
      ix += 2;
      if (word1 == 0x0000) {
        break;
      } else if (byte1 < 0xD8 || byte1 >= 0xE0) {
        arr[j] = String.fromCharCode(word1);
      } else {
        var byte3 = bytes[ix + offset1];
        var byte4 = bytes[ix + offset2];
        var word2 = (byte3 << 8) + byte4;
        ix += 2;
        arr[j] = String.fromCharCode(word1, word2);
      }
    }
    return new InternalDecodedString(arr.join(""), ix);
  },

  readUTF8String: function (bytes, maxBytes) {
    var ix = 0;
    maxBytes = Math.min(maxBytes || bytes.length, bytes.length);

    if (bytes[0] == 0xEF && bytes[1] == 0xBB && bytes[2] == 0xBF) {
      ix = 3;
    }

    var arr = [];
    for (var j = 0; ix < maxBytes; j++) {
      var byte1 = bytes[ix++];
      if (byte1 == 0x00) {
        break;
      } else if (byte1 < 0x80) {
        arr[j] = String.fromCharCode(byte1);
      } else if (byte1 >= 0xC2 && byte1 < 0xE0) {
        var byte2 = bytes[ix++];
        arr[j] = String.fromCharCode(((byte1 & 0x1F) << 6) + (byte2 & 0x3F));
      } else if (byte1 >= 0xE0 && byte1 < 0xF0) {
        var byte2 = bytes[ix++];
        var byte3 = bytes[ix++];
        arr[j] = String.fromCharCode(((byte1 & 0xFF) << 12) + ((byte2 & 0x3F) << 6) + (byte3 & 0x3F));
      } else if (byte1 >= 0xF0 && byte1 < 0xF5) {
        var byte2 = bytes[ix++];
        var byte3 = bytes[ix++];
        var byte4 = bytes[ix++];
        var codepoint = ((byte1 & 0x07) << 18) + ((byte2 & 0x3F) << 12) + ((byte3 & 0x3F) << 6) + (byte4 & 0x3F) - 0x10000;
        arr[j] = String.fromCharCode((codepoint >> 10) + 0xD800, (codepoint & 0x3FF) + 0xDC00);
      }
    }
    return new InternalDecodedString(arr.join(""), ix);
  },

  readNullTerminatedString: function (bytes, maxBytes) {
    var arr = [];
    maxBytes = maxBytes || bytes.length;
    for (var i = 0; i < maxBytes;) {
      var byte1 = bytes[i++];
      if (byte1 == 0x00) {
        break;
      }
      arr[i - 1] = String.fromCharCode(byte1);
    }
    return new InternalDecodedString(arr.join(""), i);
  }
};

module.exports = StringUtils;

},{}],13:[function(require,module,exports){

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _FlowTypes = require('./FlowTypes');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChunkedFileData = require('./ChunkedFileData');
var MediaFileReader = require('./MediaFileReader');

var CHUNK_SIZE = 1024;

var XhrFileReader = (function (_MediaFileReader) {
  _inherits(XhrFileReader, _MediaFileReader);

  function XhrFileReader(url) {
    _classCallCheck(this, XhrFileReader);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(XhrFileReader).call(this));

    _this._url = url;
    // $FlowIssue - Constructor cannot be called on exports
    _this._fileData = new ChunkedFileData();
    return _this;
  }
  // $FlowIssue - Flow gets confused with module.exports

  _createClass(XhrFileReader, [{
    key: '_init',
    value: function _init(callbacks) {
      if (XhrFileReader._config.avoidHeadRequests) {
        this._fetchSizeWithGetRequest(callbacks);
      } else {
        this._fetchSizeWithHeadRequest(callbacks);
      }
    }
  }, {
    key: '_fetchSizeWithHeadRequest',
    value: function _fetchSizeWithHeadRequest(callbacks) {
      var self = this;

      this._makeXHRRequest("HEAD", null, {
        onSuccess: function (xhr) {
          var contentLength = self._parseContentLength(xhr);
          if (contentLength) {
            self._size = contentLength;
            callbacks.onSuccess();
          } else {
            // Content-Length not provided by the server, fallback to
            // GET requests.
            self._fetchSizeWithGetRequest(callbacks);
          }
        },
        onError: callbacks.onError
      });
    }
  }, {
    key: '_fetchSizeWithGetRequest',
    value: function _fetchSizeWithGetRequest(callbacks) {
      var self = this;
      var range = this._roundRangeToChunkMultiple([0, 0]);

      this._makeXHRRequest("GET", range, {
        onSuccess: function (xhr) {
          var contentRange = self._parseContentRange(xhr);
          var data = self._getXhrResponseContent(xhr);

          if (contentRange) {
            if (contentRange.instanceLength == null) {
              // Last resort, server is not able to tell us the content length,
              // need to fetch entire file then.
              self._fetchEntireFile(callbacks);
              return;
            }
            self._size = contentRange.instanceLength;
          } else {
            // Range request not supported, we got the entire file
            self._size = data.length;
          }

          self._fileData.addData(0, data);
          callbacks.onSuccess();
        },
        onError: callbacks.onError
      });
    }
  }, {
    key: '_fetchEntireFile',
    value: function _fetchEntireFile(callbacks) {
      var self = this;
      this._makeXHRRequest("GET", null, {
        onSuccess: function (xhr) {
          var data = self._getXhrResponseContent(xhr);
          self._size = data.length;
          self._fileData.addData(0, data);
          callbacks.onSuccess();
        },
        onError: callbacks.onError
      });
    }
  }, {
    key: '_getXhrResponseContent',
    value: function _getXhrResponseContent(xhr) {
      return xhr.responseBody || xhr.responseText || "";
    }
  }, {
    key: '_parseContentLength',
    value: function _parseContentLength(xhr) {
      var contentLength = this._getResponseHeader(xhr, "Content-Length");

      if (contentLength == null) {
        return contentLength;
      } else {
        return parseInt(contentLength, 10);
      }
    }
  }, {
    key: '_parseContentRange',
    value: function _parseContentRange(xhr) {
      var contentRange = this._getResponseHeader(xhr, "Content-Range");

      if (contentRange) {
        var parsedContentRange = contentRange.match(/bytes (\d+)-(\d+)\/(?:(\d+)|\*)/i);
        if (!parsedContentRange) {
          throw new Error("FIXME: Unknown Content-Range syntax: ", contentRange);
        }

        return {
          firstBytePosition: parseInt(parsedContentRange[1], 10),
          lastBytePosition: parseInt(parsedContentRange[2], 10),
          instanceLength: parsedContentRange[3] ? parseInt(parsedContentRange[3], 10) : null
        };
      } else {
        return null;
      }
    }
  }, {
    key: 'loadRange',
    value: function loadRange(range, callbacks) {
      var self = this;

      if (self._fileData.hasDataRange(range[0], range[1])) {
        setTimeout(callbacks.onSuccess, 1);
        return;
      }

      // Always download in multiples of CHUNK_SIZE. If we're going to make a
      // request might as well get a chunk that makes sense. The big cost is
      // establishing the connection so getting 10bytes or 1K doesn't really
      // make a difference.
      range = this._roundRangeToChunkMultiple(range);

      this._makeXHRRequest("GET", range, {
        onSuccess: function (xhr) {
          var data = self._getXhrResponseContent(xhr);
          self._fileData.addData(range[0], data);
          callbacks.onSuccess();
        },
        onError: callbacks.onError
      });
    }
  }, {
    key: '_roundRangeToChunkMultiple',
    value: function _roundRangeToChunkMultiple(range) {
      var length = range[1] - range[0] + 1;
      var newLength = Math.ceil(length / CHUNK_SIZE) * CHUNK_SIZE;
      return [range[0], range[0] + newLength - 1];
    }
  }, {
    key: '_makeXHRRequest',
    value: function _makeXHRRequest(method, range, callbacks) {
      var xhr = this._createXHRObject();

      var onXHRLoad = function () {
        // 200 - OK
        // 206 - Partial Content
        if (xhr.status === 200 || xhr.status === 206) {
          callbacks.onSuccess(xhr);
        } else if (callbacks.onError) {
          callbacks.onError({
            "type": "xhr",
            // $FlowIssue - xhr will not be null here
            "info": "Unexpected HTTP status " + xhr.status + ".",
            "xhr": xhr
          });
        }
        xhr = null;
      };

      if (typeof xhr.onload !== 'undefined') {
        xhr.onload = onXHRLoad;
        xhr.onerror = function () {
          if (callbacks.onError) {
            callbacks.onError({
              "type": "xhr",
              "info": "Generic XHR error, check xhr object.",
              "xhr": xhr
            });
          }
        };
      } else {
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            onXHRLoad();
          }
        };
      }

      xhr.open(method, this._url);
      xhr.overrideMimeType("text/plain; charset=x-user-defined");
      if (range) {
        this._setRequestHeader(xhr, "Range", "bytes=" + range[0] + "-" + range[1]);
      }
      this._setRequestHeader(xhr, "If-Modified-Since", "Sat, 01 Jan 1970 00:00:00 GMT");
      xhr.send(null);
    }
  }, {
    key: '_setRequestHeader',
    value: function _setRequestHeader(xhr, headerName, headerValue) {
      if (XhrFileReader._config.disallowedXhrHeaders.indexOf(headerName.toLowerCase()) < 0) {
        xhr.setRequestHeader(headerName, headerValue);
      }
    }
  }, {
    key: '_hasResponseHeader',
    value: function _hasResponseHeader(xhr, headerName) {
      var allResponseHeaders = xhr.getAllResponseHeaders();

      if (!allResponseHeaders) {
        return false;
      }

      var headers = allResponseHeaders.split("\r\n");
      var headerNames = [];
      for (var i = 0; i < headers.length; i++) {
        headerNames[i] = headers[i].split(":")[0].toLowerCase();
      }

      return headerNames.indexOf(headerName.toLowerCase()) >= 0;
    }
  }, {
    key: '_getResponseHeader',
    value: function _getResponseHeader(xhr, headerName) {
      if (!this._hasResponseHeader(xhr, headerName)) {
        return null;
      }

      return xhr.getResponseHeader(headerName);
    }
  }, {
    key: 'getByteAt',
    value: function getByteAt(offset) {
      var character = this._fileData.getByteAt(offset);
      return character.charCodeAt(0) & 0xff;
    }
  }, {
    key: '_createXHRObject',
    value: function _createXHRObject() {
      if (typeof window === "undefined") {
        // $FlowIssue - flow is not able to recognize this module.
        return new (require("xhr2").XMLHttpRequest)();
      }

      if (window.XMLHttpRequest) {
        return new window.XMLHttpRequest();
      }

      throw new Error("XMLHttpRequest is not supported");
    }
  }], [{
    key: 'canReadFile',
    value: function canReadFile(file) {
      return typeof file === 'string' && /^[a-z]+:\/\//i.test(file);
    }
  }, {
    key: 'setConfig',
    value: function setConfig(config) {
      for (var key in config) {
        if (config.hasOwnProperty(key)) {
          this._config[key] = config[key];
        }
      }var disallowedXhrHeaders = this._config.disallowedXhrHeaders;
      for (var i = 0; i < disallowedXhrHeaders.length; i++) {
        disallowedXhrHeaders[i] = disallowedXhrHeaders[i].toLowerCase();
      }
    }
  }]);

  return XhrFileReader;
})(MediaFileReader);

XhrFileReader._config = {
  avoidHeadRequests: false,
  disallowedXhrHeaders: []
};

module.exports = XhrFileReader;

},{"./ChunkedFileData":4,"./FlowTypes":5,"./MediaFileReader":10,"xhr2":2}],14:[function(require,module,exports){

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _FlowTypes = require("./FlowTypes");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MediaFileReader = require("./MediaFileReader");
var NodeFileReader = require("./NodeFileReader");
var XhrFileReader = require("./XhrFileReader");
var BlobFileReader = require("./BlobFileReader");
var MediaTagReader = require("./MediaTagReader");
var ID3v1TagReader = require("./ID3v1TagReader");
var ID3v2TagReader = require("./ID3v2TagReader");
var MP4TagReader = require("./MP4TagReader");

var mediaFileReaders = [];
var mediaTagReaders = [];

function read(location, callbacks) {
  new Reader(location).read(callbacks);
}

var Reader = (function () {
  function Reader(file) {
    _classCallCheck(this, Reader);

    this._file = file;
  }

  _createClass(Reader, [{
    key: "setTagsToRead",
    value: function setTagsToRead(tagsToRead) {
      this._tagsToRead = tagsToRead;
      return this;
    }
  }, {
    key: "setFileReader",
    value: function setFileReader(fileReader) {
      this._fileReader = fileReader;
      return this;
    }
  }, {
    key: "setTagReader",
    value: function setTagReader(tagReader) {
      this._tagReader = tagReader;
      return this;
    }
  }, {
    key: "read",
    value: function read(callbacks) {
      var FileReader = this._getFileReader();
      var fileReader = new FileReader(this._file);
      var self = this;

      fileReader.init({
        onSuccess: function () {
          self._getTagReader(fileReader, {
            onSuccess: function (TagReader) {
              new TagReader(fileReader).setTagsToRead(self._tagsToRead).read(callbacks);
            },
            onError: callbacks.onError
          });
        },
        onError: callbacks.onError
      });
    }
  }, {
    key: "_getFileReader",
    value: function _getFileReader() {
      if (this._fileReader) {
        return this._fileReader;
      } else {
        return this._findFileReader();
      }
    }
  }, {
    key: "_findFileReader",
    value: function _findFileReader() {
      for (var i = 0; i < mediaFileReaders.length; i++) {
        if (mediaFileReaders[i].canReadFile(this._file)) {
          return mediaFileReaders[i];
        }
      }

      throw new Error("No suitable file reader found for ", this._file);
    }
  }, {
    key: "_getTagReader",
    value: function _getTagReader(fileReader, callbacks) {
      if (this._tagReader) {
        var tagReader = this._tagReader;
        setTimeout(function () {
          callbacks.onSuccess(tagReader);
        }, 1);
      } else {
        this._findTagReader(fileReader, callbacks);
      }
    }
  }, {
    key: "_findTagReader",
    value: function _findTagReader(fileReader, callbacks) {
      // We don't want to make multiple fetches per tag reader to get the tag
      // identifier. The strategy here is to combine all the tag identifier
      // ranges into one and make a single fetch. This is particularly important
      // in file readers that have expensive loads like the XHR one.
      // However, with this strategy we run into the problem of loading the
      // entire file because tag identifiers might be at the start or end of
      // the file.
      // To get around this we divide the tag readers into two categories, the
      // ones that read their tag identifiers from the start of the file and the
      // ones that read from the end of the file.
      var tagReadersAtFileStart = [];
      var tagReadersAtFileEnd = [];
      var fileSize = fileReader.getSize();

      for (var i = 0; i < mediaTagReaders.length; i++) {
        var range = mediaTagReaders[i].getTagIdentifierByteRange();
        if (range.offset >= 0 && range.offset < fileSize / 2 || range.offset < 0 && range.offset < -fileSize / 2) {
          tagReadersAtFileStart.push(mediaTagReaders[i]);
        } else {
          tagReadersAtFileEnd.push(mediaTagReaders[i]);
        }
      }

      var tagsLoaded = false;
      var loadTagIdentifiersCallbacks = {
        onSuccess: function () {
          if (!tagsLoaded) {
            // We're expecting to load two sets of tag identifiers. This flag
            // indicates when the first one has been loaded.
            tagsLoaded = true;
            return;
          }

          for (var i = 0; i < mediaTagReaders.length; i++) {
            var range = mediaTagReaders[i].getTagIdentifierByteRange();
            var tagIndentifier = fileReader.getBytesAt(range.offset >= 0 ? range.offset : range.offset + fileSize, range.length);

            if (mediaTagReaders[i].canReadTagFormat(tagIndentifier)) {
              callbacks.onSuccess(mediaTagReaders[i]);
              return;
            }
          }

          if (callbacks.onError) {
            callbacks.onError({
              "type": "tagFormat",
              "info": "No suitable tag reader found"
            });
          }
        },
        onError: callbacks.onError
      };

      this._loadTagIdentifierRanges(fileReader, tagReadersAtFileStart, loadTagIdentifiersCallbacks);
      this._loadTagIdentifierRanges(fileReader, tagReadersAtFileEnd, loadTagIdentifiersCallbacks);
    }
  }, {
    key: "_loadTagIdentifierRanges",
    value: function _loadTagIdentifierRanges(fileReader, tagReaders, callbacks) {
      if (tagReaders.length === 0) {
        // Force async
        setTimeout(callbacks.onSuccess, 1);
        return;
      }

      var tagIdentifierRange = [Number.MAX_VALUE, 0];
      var fileSize = fileReader.getSize();

      // Create a super set of all ranges so we can load them all at once.
      // Might need to rethink this approach if there are tag ranges too far
      // a part from each other. We're good for now though.
      for (var i = 0; i < tagReaders.length; i++) {
        var range = tagReaders[i].getTagIdentifierByteRange();
        var start = range.offset >= 0 ? range.offset : range.offset + fileSize;
        var end = start + range.length - 1;

        tagIdentifierRange[0] = Math.min(start, tagIdentifierRange[0]);
        tagIdentifierRange[1] = Math.max(end, tagIdentifierRange[1]);
      }

      fileReader.loadRange(tagIdentifierRange, callbacks);
    }
  }]);

  return Reader;
})();

var Config = (function () {
  function Config() {
    _classCallCheck(this, Config);
  }

  _createClass(Config, null, [{
    key: "addFileReader",
    value: function addFileReader(fileReader) {
      mediaFileReaders.push(fileReader);
      return this;
    }
  }, {
    key: "addTagReader",
    value: function addTagReader(tagReader) {
      mediaTagReaders.push(tagReader);
      return this;
    }
  }, {
    key: "removeTagReader",
    value: function removeTagReader(tagReader) {
      var tagReaderIx = mediaTagReaders.indexOf(tagReader);

      if (tagReaderIx >= 0) {
        mediaTagReaders.splice(tagReaderIx, 1);
      }

      return this;
    }
  }, {
    key: "EXPERIMENTAL_avoidHeadRequests",
    value: function EXPERIMENTAL_avoidHeadRequests() {
      XhrFileReader.setConfig({
        avoidHeadRequests: true
      });
    }
  }, {
    key: "setDisallowedXhrHeaders",
    value: function setDisallowedXhrHeaders(disallowedXhrHeaders) {
      XhrFileReader.setConfig({
        disallowedXhrHeaders: disallowedXhrHeaders
      });
    }
  }]);

  return Config;
})();

Config
// $FlowIssue - flow doesn't allow type to pass as their supertype
.addFileReader(XhrFileReader)
// $FlowIssue - flow doesn't allow type to pass as their supertype
.addFileReader(BlobFileReader)
// $FlowIssue - flow doesn't allow type to pass as their supertype
.addTagReader(ID3v2TagReader)
// $FlowIssue - flow doesn't allow type to pass as their supertype
.addTagReader(ID3v1TagReader)
// $FlowIssue - flow doesn't allow type to pass as their supertype
.addTagReader(MP4TagReader);

if (typeof process !== "undefined") {
  Config
  // $FlowIssue - flow doesn't allow type to pass as their supertype
  .addFileReader(NodeFileReader);
}

module.exports = {
  "read": read,
  "Reader": Reader,
  "Config": Config
};

},{"./BlobFileReader":3,"./FlowTypes":5,"./ID3v1TagReader":6,"./ID3v2TagReader":8,"./MP4TagReader":9,"./MediaFileReader":10,"./MediaTagReader":11,"./NodeFileReader":1,"./XhrFileReader":13}]},{},[14])(14)
});