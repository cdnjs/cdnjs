/*
 * JavaScript Load Image IPTC Parser
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * Copyright 2018, Dave Bevan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define, module, require, Buffer */

;(function(factory) {
  'use strict'
  if (typeof define === 'function' && define.amd) {
    // Register as an anonymous AMD module:
    define(['./load-image', './load-image-meta'], factory)
  } else if (typeof module === 'object' && module.exports) {
    factory(require('./load-image'), require('./load-image-meta'))
  } else {
    // Browser globals:
    factory(window.loadImage)
  }
})(function(loadImage) {
  'use strict'

  loadImage.IptcMap = function() {
    return this
  }

  loadImage.IptcMap.prototype.map = {
    ObjectName: 0x5
  }

  loadImage.IptcMap.prototype.get = function(id) {
    return this[id] || this[this.map[id]]
  }

  loadImage.parseIptcTags = function(
    dataView,
    startOffset,
    sectionLength,
    data
  ) {
    /**
     * Retrieves string for the given Buffer and range
     *
     * @param {Buffer} buffer IPTC buffer
     * @param {number} start Range start
     * @param {number} length Range length
     * @returns {string} String value
     */
    function getStringFromDB(buffer, start, length) {
      var outstr = ''
      for (var n = start; n < start + length; n++) {
        outstr += String.fromCharCode(buffer.getUint8(n))
      }
      return outstr
    }
    var fieldValue, dataSize, segmentType
    var segmentStartPos = startOffset
    while (segmentStartPos < startOffset + sectionLength) {
      // we currently handle the 2: class of iptc tag
      if (
        dataView.getUint8(segmentStartPos) === 0x1c &&
        dataView.getUint8(segmentStartPos + 1) === 0x02
      ) {
        segmentType = dataView.getUint8(segmentStartPos + 2)
        // only store data for known tags
        if (segmentType in data.iptc.tags) {
          dataSize = dataView.getInt16(segmentStartPos + 3)
          fieldValue = getStringFromDB(dataView, segmentStartPos + 5, dataSize)
          // Check if we already stored a value with this name
          if (Object.prototype.hasOwnProperty.call(data.iptc, segmentType)) {
            // Value already stored with this name, create multivalue field
            if (data.iptc[segmentType] instanceof Array) {
              data.iptc[segmentType].push(fieldValue)
            } else {
              data.iptc[segmentType] = [data.iptc[segmentType], fieldValue]
            }
          } else {
            data.iptc[segmentType] = fieldValue
          }
        }
      }
      segmentStartPos++
    }
  }

  loadImage.parseIptcData = function(dataView, offset, length, data, options) {
    if (options.disableIptc) {
      return
    }
    var markerLength = offset + length
    // Found '8BIM<EOT><EOT>' ?
    var isFieldSegmentStart = function(dataView, offset) {
      return (
        dataView.getUint32(offset) === 0x3842494d &&
        dataView.getUint16(offset + 4) === 0x0404
      )
    }
    // Hunt forward, looking for the correct IPTC block signature:
    // Reference: https://metacpan.org/pod/distribution/Image-MetaData-JPEG/lib/Image/MetaData/JPEG/Structures.pod#Structure-of-a-Photoshop-style-APP13-segment
    // From https://github.com/exif-js/exif-js/blob/master/exif.js ~ line 474 on
    while (offset + 8 < markerLength) {
      if (isFieldSegmentStart(dataView, offset)) {
        var nameHeaderLength = dataView.getUint8(offset + 7)
        if (nameHeaderLength % 2 !== 0) nameHeaderLength += 1
        // Check for pre photoshop 6 format
        if (nameHeaderLength === 0) {
          // Always 4
          nameHeaderLength = 4
        }
        var startOffset = offset + 8 + nameHeaderLength
        if (startOffset > markerLength) {
          // eslint-disable-next-line no-console
          console.log('Invalid IPTC data: Invalid segment offset.')
          break
        }
        var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength)
        if (offset + sectionLength > markerLength) {
          // eslint-disable-next-line no-console
          console.log('Invalid IPTC data: Invalid segment size.')
          break
        }
        // Create the iptc object to store the tags:
        data.iptc = new loadImage.IptcMap()
        // Parse the tags
        return loadImage.parseIptcTags(
          dataView,
          startOffset,
          sectionLength,
          data
        )
      }
      // eslint-disable-next-line no-param-reassign
      offset++
    }
    // eslint-disable-next-line no-console
    console.log('No IPTC data at this offset - could be XMP')
  }

  // Registers this IPTC parser for the APP13 JPEG meta data segment:
  loadImage.metaDataParsers.jpeg[0xffed].push(loadImage.parseIptcData)

  // Adds the following properties to the parseMetaData callback data:
  // * iptc: The iptc tags, parsed by the parseIptcData method

  // Adds the following options to the parseMetaData method:
  // * disableIptc: Disables IPTC parsing.
})
