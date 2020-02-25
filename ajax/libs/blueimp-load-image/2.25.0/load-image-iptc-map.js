/*
 * JavaScript Load Image IPTC Map
 * https://github.com/blueimp/JavaScript-Load-Image
 *
 * Copyright 2013, Sebastian Tschan
 * Copyright 2018, Dave Bevan
 *
 * IPTC tags mapping based on
 * https://github.com/jseidelin/exif-js
 * https://iptc.org/standards/photo-metadata
 * http://www.iptc.org/std/IIM/4.1/specification/IIMV4.1.pdf
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

/* global define, module, require */

;(function(factory) {
  'use strict'
  if (typeof define === 'function' && define.amd) {
    // Register as an anonymous AMD module:
    define(['./load-image', './load-image-iptc'], factory)
  } else if (typeof module === 'object' && module.exports) {
    factory(require('./load-image'), require('./load-image-iptc'))
  } else {
    // Browser globals:
    factory(window.loadImage)
  }
})(function(loadImage) {
  'use strict'

  loadImage.IptcMap.prototype.tags = {
    // ==========
    // IPTC tags:
    // ==========
    0x03: 'ObjectType',
    0x04: 'ObjectAttribute',
    0x05: 'ObjectName',
    0x07: 'EditStatus',
    0x08: 'EditorialUpdate',
    0x0a: 'Urgency',
    0x0c: 'SubjectRef',
    0x0f: 'Category',
    0x14: 'SupplCategory',
    0x16: 'FixtureID',
    0x19: 'Keywords',
    0x1a: 'ContentLocCode',
    0x1b: 'ContentLocName',
    0x1e: 'ReleaseDate',
    0x23: 'ReleaseTime',
    0x25: 'ExpirationDate',
    0x26: 'ExpirationTime',
    0x28: 'SpecialInstructions',
    0x2a: 'ActionAdvised',
    0x2d: 'RefService',
    0x2f: 'RefDate',
    0x32: 'RefNumber',
    0x37: 'DateCreated',
    0x3c: 'TimeCreated',
    0x3e: 'DigitalCreationDate',
    0x3f: 'DigitalCreationTime',
    0x41: 'OriginatingProgram',
    0x46: 'ProgramVersion',
    0x4b: 'ObjectCycle',
    0x50: 'Byline',
    0x55: 'BylineTitle',
    0x5a: 'City',
    0x5c: 'Sublocation',
    0x5f: 'State',
    0x64: 'CountryCode',
    0x65: 'CountryName',
    0x67: 'OrigTransRef',
    0x69: 'Headline',
    0x6e: 'Credit',
    0x73: 'Source',
    0x74: 'CopyrightNotice',
    0x76: 'Contact',
    0x78: 'Caption',
    0x7a: 'WriterEditor',
    0x82: 'ImageType',
    0x83: 'ImageOrientation',
    0x87: 'LanguageID'

    // We don't record these tags:
    //
    // 0x00: 'RecordVersion',
    // 0x7d: 'RasterizedCaption',
    // 0x96: 'AudioType',
    // 0x97: 'AudioSamplingRate',
    // 0x98: 'AudioSamplingRes',
    // 0x99: 'AudioDuration',
    // 0x9a: 'AudioOutcue',
    // 0xc8: 'PreviewFileFormat',
    // 0xc9: 'PreviewFileFormatVer',
    // 0xca: 'PreviewData'
  }

  loadImage.IptcMap.prototype.getText = function(id) {
    var value = this.get(id)
    return String(value)
  }
  ;(function(iptcMapPrototype) {
    var tags = iptcMapPrototype.tags
    var map = iptcMapPrototype.map || {}
    var prop
    // Map the tag names to tags:
    for (prop in tags) {
      if (Object.prototype.hasOwnProperty.call(tags, prop)) {
        map[tags[prop]] = prop
      }
    }
  })(loadImage.IptcMap.prototype)

  loadImage.IptcMap.prototype.getAll = function() {
    var map = {}
    var prop
    var id
    for (prop in this) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        id = this.tags[prop]
        if (id) {
          map[id] = this.getText(id)
        }
      }
    }
    return map
  }
})
