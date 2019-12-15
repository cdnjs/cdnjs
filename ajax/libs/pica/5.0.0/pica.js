/* pica 5.0.0 nodeca/pica */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.pica = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Collection of math functions
//
// 1. Combine components together
// 2. Has async init to load wasm modules
//
'use strict';

var inherits = require('inherits');

var Multimath = require('multimath');

var mm_unsharp_mask = require('multimath/lib/unsharp_mask');

var mm_resize = require('./mm_resize');

function MathLib(requested_features) {
  var __requested_features = requested_features || [];

  var features = {
    js: __requested_features.indexOf('js') >= 0,
    wasm: __requested_features.indexOf('wasm') >= 0
  };
  Multimath.call(this, features);
  this.features = {
    js: features.js,
    wasm: features.wasm && this.has_wasm
  };
  this.use(mm_unsharp_mask);
  this.use(mm_resize);
}

inherits(MathLib, Multimath);

MathLib.prototype.resizeAndUnsharp = function resizeAndUnsharp(options, cache) {
  var result = this.resize(options, cache);

  if (options.unsharpAmount) {
    this.unsharp_mask(result, options.toWidth, options.toHeight, options.unsharpAmount, options.unsharpRadius, options.unsharpThreshold);
  }

  return result;
};

module.exports = MathLib;

},{"./mm_resize":4,"inherits":15,"multimath":16,"multimath/lib/unsharp_mask":19}],2:[function(require,module,exports){
// Resize convolvers, pure JS implementation
//
'use strict'; // Precision of fixed FP values
//var FIXED_FRAC_BITS = 14;

function clampTo8(i) {
  return i < 0 ? 0 : i > 255 ? 255 : i;
} // Convolve image in horizontal directions and transpose output. In theory,
// transpose allow:
//
// - use the same convolver for both passes (this fails due different
//   types of input array and temporary buffer)
// - making vertical pass by horisonltal lines inprove CPU cache use.
//
// But in real life this doesn't work :)
//


function convolveHorizontally(src, dest, srcW, srcH, destW, filters) {
  var r, g, b, a;
  var filterPtr, filterShift, filterSize;
  var srcPtr, srcY, destX, filterVal;
  var srcOffset = 0,
      destOffset = 0; // For each row

  for (srcY = 0; srcY < srcH; srcY++) {
    filterPtr = 0; // Apply precomputed filters to each destination row point

    for (destX = 0; destX < destW; destX++) {
      // Get the filter that determines the current output pixel.
      filterShift = filters[filterPtr++];
      filterSize = filters[filterPtr++];
      srcPtr = srcOffset + filterShift * 4 | 0;
      r = g = b = a = 0; // Apply the filter to the row to get the destination pixel r, g, b, a

      for (; filterSize > 0; filterSize--) {
        filterVal = filters[filterPtr++]; // Use reverse order to workaround deopts in old v8 (node v.10)
        // Big thanks to @mraleph (Vyacheslav Egorov) for the tip.

        a = a + filterVal * src[srcPtr + 3] | 0;
        b = b + filterVal * src[srcPtr + 2] | 0;
        g = g + filterVal * src[srcPtr + 1] | 0;
        r = r + filterVal * src[srcPtr] | 0;
        srcPtr = srcPtr + 4 | 0;
      } // Bring this value back in range. All of the filter scaling factors
      // are in fixed point with FIXED_FRAC_BITS bits of fractional part.
      //
      // (!) Add 1/2 of value before clamping to get proper rounding. In other
      // case brightness loss will be noticeable if you resize image with white
      // border and place it on white background.
      //


      dest[destOffset + 3] = clampTo8(a + (1 << 13) >> 14
      /*FIXED_FRAC_BITS*/
      );
      dest[destOffset + 2] = clampTo8(b + (1 << 13) >> 14
      /*FIXED_FRAC_BITS*/
      );
      dest[destOffset + 1] = clampTo8(g + (1 << 13) >> 14
      /*FIXED_FRAC_BITS*/
      );
      dest[destOffset] = clampTo8(r + (1 << 13) >> 14
      /*FIXED_FRAC_BITS*/
      );
      destOffset = destOffset + srcH * 4 | 0;
    }

    destOffset = (srcY + 1) * 4 | 0;
    srcOffset = (srcY + 1) * srcW * 4 | 0;
  }
} // Technically, convolvers are the same. But input array and temporary
// buffer can be of different type (especially, in old browsers). So,
// keep code in separate functions to avoid deoptimizations & speed loss.


function convolveVertically(src, dest, srcW, srcH, destW, filters) {
  var r, g, b, a;
  var filterPtr, filterShift, filterSize;
  var srcPtr, srcY, destX, filterVal;
  var srcOffset = 0,
      destOffset = 0; // For each row

  for (srcY = 0; srcY < srcH; srcY++) {
    filterPtr = 0; // Apply precomputed filters to each destination row point

    for (destX = 0; destX < destW; destX++) {
      // Get the filter that determines the current output pixel.
      filterShift = filters[filterPtr++];
      filterSize = filters[filterPtr++];
      srcPtr = srcOffset + filterShift * 4 | 0;
      r = g = b = a = 0; // Apply the filter to the row to get the destination pixel r, g, b, a

      for (; filterSize > 0; filterSize--) {
        filterVal = filters[filterPtr++]; // Use reverse order to workaround deopts in old v8 (node v.10)
        // Big thanks to @mraleph (Vyacheslav Egorov) for the tip.

        a = a + filterVal * src[srcPtr + 3] | 0;
        b = b + filterVal * src[srcPtr + 2] | 0;
        g = g + filterVal * src[srcPtr + 1] | 0;
        r = r + filterVal * src[srcPtr] | 0;
        srcPtr = srcPtr + 4 | 0;
      } // Bring this value back in range. All of the filter scaling factors
      // are in fixed point with FIXED_FRAC_BITS bits of fractional part.
      //
      // (!) Add 1/2 of value before clamping to get proper rounding. In other
      // case brightness loss will be noticeable if you resize image with white
      // border and place it on white background.
      //


      dest[destOffset + 3] = clampTo8(a + (1 << 13) >> 14
      /*FIXED_FRAC_BITS*/
      );
      dest[destOffset + 2] = clampTo8(b + (1 << 13) >> 14
      /*FIXED_FRAC_BITS*/
      );
      dest[destOffset + 1] = clampTo8(g + (1 << 13) >> 14
      /*FIXED_FRAC_BITS*/
      );
      dest[destOffset] = clampTo8(r + (1 << 13) >> 14
      /*FIXED_FRAC_BITS*/
      );
      destOffset = destOffset + srcH * 4 | 0;
    }

    destOffset = (srcY + 1) * 4 | 0;
    srcOffset = (srcY + 1) * srcW * 4 | 0;
  }
}

module.exports = {
  convolveHorizontally: convolveHorizontally,
  convolveVertically: convolveVertically
};

},{}],3:[function(require,module,exports){
// This is autogenerated file from math.wasm, don't edit.
//
'use strict';
/* eslint-disable max-len */

module.exports = 'AGFzbQEAAAABFAJgBn9/f39/fwBgB39/f39/f38AAg8BA2VudgZtZW1vcnkCAAEDAwIAAQQEAXAAAAcZAghjb252b2x2ZQAACmNvbnZvbHZlSFYAAQkBAArmAwLBAwEQfwJAIANFDQAgBEUNACAFQQRqIRVBACEMQQAhDQNAIA0hDkEAIRFBACEHA0AgB0ECaiESAn8gBSAHQQF0IgdqIgZBAmouAQAiEwRAQQAhCEEAIBNrIRQgFSAHaiEPIAAgDCAGLgEAakECdGohEEEAIQlBACEKQQAhCwNAIBAoAgAiB0EYdiAPLgEAIgZsIAtqIQsgB0H/AXEgBmwgCGohCCAHQRB2Qf8BcSAGbCAKaiEKIAdBCHZB/wFxIAZsIAlqIQkgD0ECaiEPIBBBBGohECAUQQFqIhQNAAsgEiATagwBC0EAIQtBACEKQQAhCUEAIQggEgshByABIA5BAnRqIApBgMAAakEOdSIGQf8BIAZB/wFIG0EQdEGAgPwHcUEAIAZBAEobIAtBgMAAakEOdSIGQf8BIAZB/wFIG0EYdEEAIAZBAEobciAJQYDAAGpBDnUiBkH/ASAGQf8BSBtBCHRBgP4DcUEAIAZBAEobciAIQYDAAGpBDnUiBkH/ASAGQf8BSBtB/wFxQQAgBkEAShtyNgIAIA4gA2ohDiARQQFqIhEgBEcNAAsgDCACaiEMIA1BAWoiDSADRw0ACwsLIQACQEEAIAIgAyAEIAUgABAAIAJBACAEIAUgBiABEAALCw==';

},{}],4:[function(require,module,exports){
'use strict';

module.exports = {
  name: 'resize',
  fn: require('./resize'),
  wasm_fn: require('./resize_wasm'),
  wasm_src: require('./convolve_wasm_base64')
};

},{"./convolve_wasm_base64":3,"./resize":5,"./resize_wasm":8}],5:[function(require,module,exports){
'use strict';

var createFilters = require('./resize_filter_gen');

var convolveHorizontally = require('./convolve').convolveHorizontally;

var convolveVertically = require('./convolve').convolveVertically;

function resetAlpha(dst, width, height) {
  var ptr = 3,
      len = width * height * 4 | 0;

  while (ptr < len) {
    dst[ptr] = 0xFF;
    ptr = ptr + 4 | 0;
  }
}

module.exports = function resize(options) {
  var src = options.src;
  var srcW = options.width;
  var srcH = options.height;
  var destW = options.toWidth;
  var destH = options.toHeight;
  var scaleX = options.scaleX || options.toWidth / options.width;
  var scaleY = options.scaleY || options.toHeight / options.height;
  var offsetX = options.offsetX || 0;
  var offsetY = options.offsetY || 0;
  var dest = options.dest || new Uint8Array(destW * destH * 4);
  var quality = typeof options.quality === 'undefined' ? 3 : options.quality;
  var alpha = options.alpha || false;
  var filtersX = createFilters(quality, srcW, destW, scaleX, offsetX),
      filtersY = createFilters(quality, srcH, destH, scaleY, offsetY);
  var tmp = new Uint8Array(destW * srcH * 4); // To use single function we need src & tmp of the same type.
  // But src can be CanvasPixelArray, and tmp - Uint8Array. So, keep
  // vertical and horizontal passes separately to avoid deoptimization.

  convolveHorizontally(src, tmp, srcW, srcH, destW, filtersX);
  convolveVertically(tmp, dest, srcH, destW, destH, filtersY); // That's faster than doing checks in convolver.
  // !!! Note, canvas data is not premultipled. We don't need other
  // alpha corrections.

  if (!alpha) resetAlpha(dest, destW, destH);
  return dest;
};

},{"./convolve":2,"./resize_filter_gen":6}],6:[function(require,module,exports){
// Calculate convolution filters for each destination point,
// and pack data to Int16Array:
//
// [ shift, length, data..., shift2, length2, data..., ... ]
//
// - shift - offset in src image
// - length - filter length (in src points)
// - data - filter values sequence
//
'use strict';

var FILTER_INFO = require('./resize_filter_info'); // Precision of fixed FP values


var FIXED_FRAC_BITS = 14;

function toFixedPoint(num) {
  return Math.round(num * ((1 << FIXED_FRAC_BITS) - 1));
}

module.exports = function resizeFilterGen(quality, srcSize, destSize, scale, offset) {
  var filterFunction = FILTER_INFO[quality].filter;
  var scaleInverted = 1.0 / scale;
  var scaleClamped = Math.min(1.0, scale); // For upscale
  // Filter window (averaging interval), scaled to src image

  var srcWindow = FILTER_INFO[quality].win / scaleClamped;
  var destPixel, srcPixel, srcFirst, srcLast, filterElementSize, floatFilter, fxpFilter, total, pxl, idx, floatVal, filterTotal, filterVal;
  var leftNotEmpty, rightNotEmpty, filterShift, filterSize;
  var maxFilterElementSize = Math.floor((srcWindow + 1) * 2);
  var packedFilter = new Int16Array((maxFilterElementSize + 2) * destSize);
  var packedFilterPtr = 0;
  var slowCopy = !packedFilter.subarray || !packedFilter.set; // For each destination pixel calculate source range and built filter values

  for (destPixel = 0; destPixel < destSize; destPixel++) {
    // Scaling should be done relative to central pixel point
    srcPixel = (destPixel + 0.5) * scaleInverted + offset;
    srcFirst = Math.max(0, Math.floor(srcPixel - srcWindow));
    srcLast = Math.min(srcSize - 1, Math.ceil(srcPixel + srcWindow));
    filterElementSize = srcLast - srcFirst + 1;
    floatFilter = new Float32Array(filterElementSize);
    fxpFilter = new Int16Array(filterElementSize);
    total = 0.0; // Fill filter values for calculated range

    for (pxl = srcFirst, idx = 0; pxl <= srcLast; pxl++, idx++) {
      floatVal = filterFunction((pxl + 0.5 - srcPixel) * scaleClamped);
      total += floatVal;
      floatFilter[idx] = floatVal;
    } // Normalize filter, convert to fixed point and accumulate conversion error


    filterTotal = 0;

    for (idx = 0; idx < floatFilter.length; idx++) {
      filterVal = floatFilter[idx] / total;
      filterTotal += filterVal;
      fxpFilter[idx] = toFixedPoint(filterVal);
    } // Compensate normalization error, to minimize brightness drift


    fxpFilter[destSize >> 1] += toFixedPoint(1.0 - filterTotal); //
    // Now pack filter to useable form
    //
    // 1. Trim heading and tailing zero values, and compensate shitf/length
    // 2. Put all to single array in this format:
    //
    //    [ pos shift, data length, value1, value2, value3, ... ]
    //

    leftNotEmpty = 0;

    while (leftNotEmpty < fxpFilter.length && fxpFilter[leftNotEmpty] === 0) {
      leftNotEmpty++;
    }

    if (leftNotEmpty < fxpFilter.length) {
      rightNotEmpty = fxpFilter.length - 1;

      while (rightNotEmpty > 0 && fxpFilter[rightNotEmpty] === 0) {
        rightNotEmpty--;
      }

      filterShift = srcFirst + leftNotEmpty;
      filterSize = rightNotEmpty - leftNotEmpty + 1;
      packedFilter[packedFilterPtr++] = filterShift; // shift

      packedFilter[packedFilterPtr++] = filterSize; // size

      if (!slowCopy) {
        packedFilter.set(fxpFilter.subarray(leftNotEmpty, rightNotEmpty + 1), packedFilterPtr);
        packedFilterPtr += filterSize;
      } else {
        // fallback for old IE < 11, without subarray/set methods
        for (idx = leftNotEmpty; idx <= rightNotEmpty; idx++) {
          packedFilter[packedFilterPtr++] = fxpFilter[idx];
        }
      }
    } else {
      // zero data, write header only
      packedFilter[packedFilterPtr++] = 0; // shift

      packedFilter[packedFilterPtr++] = 0; // size
    }
  }

  return packedFilter;
};

},{"./resize_filter_info":7}],7:[function(require,module,exports){
// Filter definitions to build tables for
// resizing convolvers.
//
// Presets for quality 0..3. Filter functions + window size
//
'use strict';

module.exports = [{
  // Nearest neibor (Box)
  win: 0.5,
  filter: function filter(x) {
    return x >= -0.5 && x < 0.5 ? 1.0 : 0.0;
  }
}, {
  // Hamming
  win: 1.0,
  filter: function filter(x) {
    if (x <= -1.0 || x >= 1.0) {
      return 0.0;
    }

    if (x > -1.19209290E-07 && x < 1.19209290E-07) {
      return 1.0;
    }

    var xpi = x * Math.PI;
    return Math.sin(xpi) / xpi * (0.54 + 0.46 * Math.cos(xpi / 1.0));
  }
}, {
  // Lanczos, win = 2
  win: 2.0,
  filter: function filter(x) {
    if (x <= -2.0 || x >= 2.0) {
      return 0.0;
    }

    if (x > -1.19209290E-07 && x < 1.19209290E-07) {
      return 1.0;
    }

    var xpi = x * Math.PI;
    return Math.sin(xpi) / xpi * Math.sin(xpi / 2.0) / (xpi / 2.0);
  }
}, {
  // Lanczos, win = 3
  win: 3.0,
  filter: function filter(x) {
    if (x <= -3.0 || x >= 3.0) {
      return 0.0;
    }

    if (x > -1.19209290E-07 && x < 1.19209290E-07) {
      return 1.0;
    }

    var xpi = x * Math.PI;
    return Math.sin(xpi) / xpi * Math.sin(xpi / 3.0) / (xpi / 3.0);
  }
}];

},{}],8:[function(require,module,exports){
'use strict';

var createFilters = require('./resize_filter_gen');

function resetAlpha(dst, width, height) {
  var ptr = 3,
      len = width * height * 4 | 0;

  while (ptr < len) {
    dst[ptr] = 0xFF;
    ptr = ptr + 4 | 0;
  }
}

function asUint8Array(src) {
  return new Uint8Array(src.buffer, 0, src.byteLength);
}

var IS_LE = true; // should not crash everything on module load in old browsers

try {
  IS_LE = new Uint32Array(new Uint8Array([1, 0, 0, 0]).buffer)[0] === 1;
} catch (__) {}

function copyInt16asLE(src, target, target_offset) {
  if (IS_LE) {
    target.set(asUint8Array(src), target_offset);
    return;
  }

  for (var ptr = target_offset, i = 0; i < src.length; i++) {
    var data = src[i];
    target[ptr++] = data & 0xFF;
    target[ptr++] = data >> 8 & 0xFF;
  }
}

module.exports = function resize_wasm(options) {
  var src = options.src;
  var srcW = options.width;
  var srcH = options.height;
  var destW = options.toWidth;
  var destH = options.toHeight;
  var scaleX = options.scaleX || options.toWidth / options.width;
  var scaleY = options.scaleY || options.toHeight / options.height;
  var offsetX = options.offsetX || 0.0;
  var offsetY = options.offsetY || 0.0;
  var dest = options.dest || new Uint8Array(destW * destH * 4);
  var quality = typeof options.quality === 'undefined' ? 3 : options.quality;
  var alpha = options.alpha || false;
  var filtersX = createFilters(quality, srcW, destW, scaleX, offsetX),
      filtersY = createFilters(quality, srcH, destH, scaleY, offsetY); // destination is 0 too.

  var src_offset = 0; // buffer between convolve passes

  var tmp_offset = this.__align(src_offset + Math.max(src.byteLength, dest.byteLength));

  var filtersX_offset = this.__align(tmp_offset + srcH * destW * 4);

  var filtersY_offset = this.__align(filtersX_offset + filtersX.byteLength);

  var alloc_bytes = filtersY_offset + filtersY.byteLength;

  var instance = this.__instance('resize', alloc_bytes); //
  // Fill memory block with data to process
  //


  var mem = new Uint8Array(this.__memory.buffer);
  var mem32 = new Uint32Array(this.__memory.buffer); // 32-bit copy is much faster in chrome

  var src32 = new Uint32Array(src.buffer);
  mem32.set(src32); // We should guarantee LE bytes order. Filters are not big, so
  // speed difference is not significant vs direct .set()

  copyInt16asLE(filtersX, mem, filtersX_offset);
  copyInt16asLE(filtersY, mem, filtersY_offset); //
  // Now call webassembly method
  // emsdk does method names with '_'

  var fn = instance.exports.convolveHV || instance.exports._convolveHV;
  fn(filtersX_offset, filtersY_offset, tmp_offset, srcW, srcH, destW, destH); //
  // Copy data back to typed array
  //
  // 32-bit copy is much faster in chrome

  var dest32 = new Uint32Array(dest.buffer);
  dest32.set(new Uint32Array(this.__memory.buffer, 0, destH * destW)); // That's faster than doing checks in convolver.
  // !!! Note, canvas data is not premultipled. We don't need other
  // alpha corrections.

  if (!alpha) resetAlpha(dest, destW, destH);
  return dest;
};

},{"./resize_filter_gen":6}],9:[function(require,module,exports){
'use strict';

var GC_INTERVAL = 100;

function Pool(create, idle) {
  this.create = create;
  this.available = [];
  this.acquired = {};
  this.lastId = 1;
  this.timeoutId = 0;
  this.idle = idle || 2000;
}

Pool.prototype.acquire = function () {
  var _this = this;

  var resource;

  if (this.available.length !== 0) {
    resource = this.available.pop();
  } else {
    resource = this.create();
    resource.id = this.lastId++;

    resource.release = function () {
      return _this.release(resource);
    };
  }

  this.acquired[resource.id] = resource;
  return resource;
};

Pool.prototype.release = function (resource) {
  var _this2 = this;

  delete this.acquired[resource.id];
  resource.lastUsed = Date.now();
  this.available.push(resource);

  if (this.timeoutId === 0) {
    this.timeoutId = setTimeout(function () {
      return _this2.gc();
    }, GC_INTERVAL);
  }
};

Pool.prototype.gc = function () {
  var _this3 = this;

  var now = Date.now();
  this.available = this.available.filter(function (resource) {
    if (now - resource.lastUsed > _this3.idle) {
      resource.destroy();
      return false;
    }

    return true;
  });

  if (this.available.length !== 0) {
    this.timeoutId = setTimeout(function () {
      return _this3.gc();
    }, GC_INTERVAL);
  } else {
    this.timeoutId = 0;
  }
};

module.exports = Pool;

},{}],10:[function(require,module,exports){
// Add intermediate resizing steps when scaling down by a very large factor.
//
// For example, when resizing 10000x10000 down to 10x10, it'll resize it to
// 300x300 first.
//
// It's needed because tiler has issues when the entire tile is scaled down
// to a few pixels (1024px source tile with border size 3 should result in
// at least 3+3+2 = 8px target tile, so max scale factor is 128 here).
//
// Also, adding intermediate steps can speed up processing if we use lower
// quality algorithms for first stages.
//
'use strict'; // min size = 0 results in infinite loop,
// min size = 1 can consume large amount of memory

var MIN_INNER_TILE_SIZE = 2;

module.exports = function createStages(fromWidth, fromHeight, toWidth, toHeight, srcTileSize, destTileBorder) {
  var scaleX = toWidth / fromWidth;
  var scaleY = toHeight / fromHeight; // derived from createRegions equation:
  // innerTileWidth = pixelFloor(srcTileSize * scaleX) - 2 * destTileBorder;

  var minScale = (2 * destTileBorder + MIN_INNER_TILE_SIZE + 1) / srcTileSize; // refuse to scale image multiple times by less than twice each time,
  // it could only happen because of invalid options

  if (minScale > 0.5) return [[toWidth, toHeight]];
  var stageCount = Math.ceil(Math.log(Math.min(scaleX, scaleY)) / Math.log(minScale)); // no additional resizes are necessary,
  // stageCount can be zero or be negative when enlarging the image

  if (stageCount <= 1) return [[toWidth, toHeight]];
  var result = [];

  for (var i = 0; i < stageCount; i++) {
    var width = Math.round(Math.pow(Math.pow(fromWidth, stageCount - i - 1) * Math.pow(toWidth, i + 1), 1 / stageCount));
    var height = Math.round(Math.pow(Math.pow(fromHeight, stageCount - i - 1) * Math.pow(toHeight, i + 1), 1 / stageCount));
    result.push([width, height]);
  }

  return result;
};

},{}],11:[function(require,module,exports){
// Split original image into multiple 1024x1024 chunks to reduce memory usage
// (images have to be unpacked into typed arrays for resizing) and allow
// parallel processing of multiple tiles at a time.
//
'use strict';
/*
 * pixelFloor and pixelCeil are modified versions of Math.floor and Math.ceil
 * functions which take into account floating point arithmetic errors.
 * Those errors can cause undesired increments/decrements of sizes and offsets:
 * Math.ceil(36 / (36 / 500)) = 501
 * pixelCeil(36 / (36 / 500)) = 500
 */

var PIXEL_EPSILON = 1e-5;

function pixelFloor(x) {
  var nearest = Math.round(x);

  if (Math.abs(x - nearest) < PIXEL_EPSILON) {
    return nearest;
  }

  return Math.floor(x);
}

function pixelCeil(x) {
  var nearest = Math.round(x);

  if (Math.abs(x - nearest) < PIXEL_EPSILON) {
    return nearest;
  }

  return Math.ceil(x);
}

module.exports = function createRegions(options) {
  var scaleX = options.toWidth / options.width;
  var scaleY = options.toHeight / options.height;
  var innerTileWidth = pixelFloor(options.srcTileSize * scaleX) - 2 * options.destTileBorder;
  var innerTileHeight = pixelFloor(options.srcTileSize * scaleY) - 2 * options.destTileBorder; // prevent infinite loop, this should never happen

  if (innerTileWidth < 1 || innerTileHeight < 1) {
    throw new Error('Internal error in pica: target tile width/height is too small.');
  }

  var x, y;
  var innerX, innerY, toTileWidth, toTileHeight;
  var tiles = [];
  var tile; // we go top-to-down instead of left-to-right to make image displayed from top to
  // doesn in the browser

  for (innerY = 0; innerY < options.toHeight; innerY += innerTileHeight) {
    for (innerX = 0; innerX < options.toWidth; innerX += innerTileWidth) {
      x = innerX - options.destTileBorder;

      if (x < 0) {
        x = 0;
      }

      toTileWidth = innerX + innerTileWidth + options.destTileBorder - x;

      if (x + toTileWidth >= options.toWidth) {
        toTileWidth = options.toWidth - x;
      }

      y = innerY - options.destTileBorder;

      if (y < 0) {
        y = 0;
      }

      toTileHeight = innerY + innerTileHeight + options.destTileBorder - y;

      if (y + toTileHeight >= options.toHeight) {
        toTileHeight = options.toHeight - y;
      }

      tile = {
        toX: x,
        toY: y,
        toWidth: toTileWidth,
        toHeight: toTileHeight,
        toInnerX: innerX,
        toInnerY: innerY,
        toInnerWidth: innerTileWidth,
        toInnerHeight: innerTileHeight,
        offsetX: x / scaleX - pixelFloor(x / scaleX),
        offsetY: y / scaleY - pixelFloor(y / scaleY),
        scaleX: scaleX,
        scaleY: scaleY,
        x: pixelFloor(x / scaleX),
        y: pixelFloor(y / scaleY),
        width: pixelCeil(toTileWidth / scaleX),
        height: pixelCeil(toTileHeight / scaleY)
      };
      tiles.push(tile);
    }
  }

  return tiles;
};

},{}],12:[function(require,module,exports){
'use strict';

function objClass(obj) {
  return Object.prototype.toString.call(obj);
}

module.exports.isCanvas = function isCanvas(element) {
  //return (element.nodeName && element.nodeName.toLowerCase() === 'canvas') ||
  var cname = objClass(element);
  return cname === '[object HTMLCanvasElement]'
  /* browser */
  || cname === '[object Canvas]'
  /* node-canvas */
  ;
};

module.exports.isImage = function isImage(element) {
  //return element.nodeName && element.nodeName.toLowerCase() === 'img';
  return objClass(element) === '[object HTMLImageElement]';
};

module.exports.limiter = function limiter(concurrency) {
  var active = 0,
      queue = [];

  function roll() {
    if (active < concurrency && queue.length) {
      active++;
      queue.shift()();
    }
  }

  return function limit(fn) {
    return new Promise(function (resolve, reject) {
      queue.push(function () {
        fn().then(function (result) {
          resolve(result);
          active--;
          roll();
        }, function (err) {
          reject(err);
          active--;
          roll();
        });
      });
      roll();
    });
  };
};

module.exports.cib_quality_name = function cib_quality_name(num) {
  switch (num) {
    case 0:
      return 'pixelated';

    case 1:
      return 'low';

    case 2:
      return 'medium';
  }

  return 'high';
};

module.exports.cib_support = function cib_support() {
  return Promise.resolve().then(function () {
    if (typeof createImageBitmap === 'undefined' || typeof document === 'undefined') {
      return false;
    }

    var c = document.createElement('canvas');
    c.width = 100;
    c.height = 100;
    return createImageBitmap(c, 0, 0, 100, 100, {
      resizeWidth: 10,
      resizeHeight: 10,
      resizeQuality: 'high'
    }).then(function (bitmap) {
      var status = bitmap.width === 10; // Branch below is filtered on upper level. We do not call resize
      // detection for basic ImageBitmap.
      //
      // https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap
      // old Crome 51 has ImageBitmap without .close(). Then this code
      // will throw and return 'false' as expected.
      //

      bitmap.close();
      c = null;
      return status;
    });
  }).catch(function () {
    return false;
  });
};

},{}],13:[function(require,module,exports){
// Web Worker wrapper for image resize function
'use strict';

module.exports = function () {
  var MathLib = require('./mathlib');

  var mathLib;
  /* eslint-disable no-undef */

  onmessage = function onmessage(ev) {
    var opts = ev.data.opts;
    if (!mathLib) mathLib = new MathLib(ev.data.features); // Use multimath's sync auto-init. Avoid Promise use in old browsers,
    // because polyfills are not propagated to webworker.

    var result = mathLib.resizeAndUnsharp(opts);
    postMessage({
      result: result
    }, [result.buffer]);
  };
};

},{"./mathlib":1}],14:[function(require,module,exports){
// Calculate Gaussian blur of an image using IIR filter
// The method is taken from Intel's white paper and code example attached to it:
// https://software.intel.com/en-us/articles/iir-gaussian-blur-filter
// -implementation-using-intel-advanced-vector-extensions

var a0, a1, a2, a3, b1, b2, left_corner, right_corner;

function gaussCoef(sigma) {
  if (sigma < 0.5) {
    sigma = 0.5;
  }

  var a = Math.exp(0.726 * 0.726) / sigma,
      g1 = Math.exp(-a),
      g2 = Math.exp(-2 * a),
      k = (1 - g1) * (1 - g1) / (1 + 2 * a * g1 - g2);

  a0 = k;
  a1 = k * (a - 1) * g1;
  a2 = k * (a + 1) * g1;
  a3 = -k * g2;
  b1 = 2 * g1;
  b2 = -g2;
  left_corner = (a0 + a1) / (1 - b1 - b2);
  right_corner = (a2 + a3) / (1 - b1 - b2);

  // Attempt to force type to FP32.
  return new Float32Array([ a0, a1, a2, a3, b1, b2, left_corner, right_corner ]);
}

function convolveMono16(src, out, line, coeff, width, height) {
  // takes src image and writes the blurred and transposed result into out

  var prev_src, curr_src, curr_out, prev_out, prev_prev_out;
  var src_index, out_index, line_index;
  var i, j;
  var coeff_a0, coeff_a1, coeff_b1, coeff_b2;

  for (i = 0; i < height; i++) {
    src_index = i * width;
    out_index = i;
    line_index = 0;

    // left to right
    prev_src = src[src_index];
    prev_prev_out = prev_src * coeff[6];
    prev_out = prev_prev_out;

    coeff_a0 = coeff[0];
    coeff_a1 = coeff[1];
    coeff_b1 = coeff[4];
    coeff_b2 = coeff[5];

    for (j = 0; j < width; j++) {
      curr_src = src[src_index];

      curr_out = curr_src * coeff_a0 +
                 prev_src * coeff_a1 +
                 prev_out * coeff_b1 +
                 prev_prev_out * coeff_b2;

      prev_prev_out = prev_out;
      prev_out = curr_out;
      prev_src = curr_src;

      line[line_index] = prev_out;
      line_index++;
      src_index++;
    }

    src_index--;
    line_index--;
    out_index += height * (width - 1);

    // right to left
    prev_src = src[src_index];
    prev_prev_out = prev_src * coeff[7];
    prev_out = prev_prev_out;
    curr_src = prev_src;

    coeff_a0 = coeff[2];
    coeff_a1 = coeff[3];

    for (j = width - 1; j >= 0; j--) {
      curr_out = curr_src * coeff_a0 +
                 prev_src * coeff_a1 +
                 prev_out * coeff_b1 +
                 prev_prev_out * coeff_b2;

      prev_prev_out = prev_out;
      prev_out = curr_out;

      prev_src = curr_src;
      curr_src = src[src_index];

      out[out_index] = line[line_index] + prev_out;

      src_index--;
      line_index--;
      out_index -= height;
    }
  }
}


function blurMono16(src, width, height, radius) {
  // Quick exit on zero radius
  if (!radius) { return; }

  var out      = new Uint16Array(src.length),
      tmp_line = new Float32Array(Math.max(width, height));

  var coeff = gaussCoef(radius);

  convolveMono16(src, out, tmp_line, coeff, width, height, radius);
  convolveMono16(out, src, tmp_line, coeff, height, width, radius);
}

module.exports = blurMono16;

},{}],15:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],16:[function(require,module,exports){
'use strict';


var assign         = require('object-assign');
var base64decode   = require('./lib/base64decode');
var hasWebAssembly = require('./lib/wa_detect');


var DEFAULT_OPTIONS = {
  js: true,
  wasm: true
};


function MultiMath(options) {
  if (!(this instanceof MultiMath)) return new MultiMath(options);

  var opts = assign({}, DEFAULT_OPTIONS, options || {});

  this.options         = opts;

  this.__cache         = {};
  this.has_wasm        = hasWebAssembly();

  this.__init_promise  = null;
  this.__modules       = opts.modules || {};
  this.__memory        = null;
  this.__wasm          = {};

  this.__isLE = ((new Uint32Array((new Uint8Array([ 1, 0, 0, 0 ])).buffer))[0] === 1);

  if (!this.options.js && !this.options.wasm) {
    throw new Error('mathlib: at least "js" or "wasm" should be enabled');
  }
}


MultiMath.prototype.use = function (module) {
  this.__modules[module.name] = module;

  // Pin the best possible implementation
  if (!this.has_wasm || !this.options.wasm || !module.wasm_fn) {
    this[module.name] = module.fn;
  } else {
    this[module.name] = module.wasm_fn;
  }

  return this;
};


MultiMath.prototype.init = function () {
  if (this.__init_promise) return this.__init_promise;

  if (!this.options.js && this.options.wasm && !this.has_wasm) {
    return Promise.reject(new Error('mathlib: only "wasm" was enabled, but it\'s not supported'));
  }

  var self = this;

  this.__init_promise = Promise.all(Object.keys(self.__modules).map(function (name) {
    var module = self.__modules[name];

    if (!self.has_wasm || !self.options.wasm || !module.wasm_fn) return null;

    // If already compiled - exit
    if (self.__wasm[name]) return null;

    // Compile wasm source
    return WebAssembly.compile(self.__base64decode(module.wasm_src))
      .then(function (m) { self.__wasm[name] = m; });
  }))
    .then(function () { return self; });

  return this.__init_promise;
};


////////////////////////////////////////////////////////////////////////////////
// Methods below are for internal use from plugins


// Simple decode base64 to typed array. Useful to load embedded webassembly
// code. You probably don't need to call this method directly.
//
MultiMath.prototype.__base64decode = base64decode;


// Increase current memory to include specified number of bytes. Do nothing if
// size is already ok. You probably don't need to call this method directly,
// because it will be invoked from `.__instance()`.
//
MultiMath.prototype.__reallocate = function mem_grow_to(bytes) {
  if (!this.__memory) {
    this.__memory = new WebAssembly.Memory({
      initial: Math.ceil(bytes / (64 * 1024))
    });
    return this.__memory;
  }

  var mem_size = this.__memory.buffer.byteLength;

  if (mem_size < bytes) {
    this.__memory.grow(Math.ceil((bytes - mem_size) / (64 * 1024)));
  }

  return this.__memory;
};


// Returns instantinated webassembly item by name, with specified memory size
// and environment.
// - use cache if available
// - do sync module init, if async init was not called earlier
// - allocate memory if not enougth
// - can export functions to webassembly via "env_extra",
//   for example, { exp: Math.exp }
//
MultiMath.prototype.__instance = function instance(name, memsize, env_extra) {
  if (memsize) this.__reallocate(memsize);

  // If .init() was not called, do sync compile
  if (!this.__wasm[name]) {
    var module = this.__modules[name];
    this.__wasm[name] = new WebAssembly.Module(this.__base64decode(module.wasm_src));
  }

  if (!this.__cache[name]) {
    var env_base = {
      memoryBase: 0,
      memory: this.__memory,
      tableBase: 0,
      table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
    };

    this.__cache[name] = new WebAssembly.Instance(this.__wasm[name], {
      env: assign(env_base, env_extra || {})
    });
  }

  return this.__cache[name];
};


// Helper to calculate memory aligh for pointers. Webassembly does not require
// this, but you may wish to experiment. Default base = 8;
//
MultiMath.prototype.__align = function align(number, base) {
  base = base || 8;
  var reminder = number % base;
  return number + (reminder ? base - reminder : 0);
};


module.exports = MultiMath;

},{"./lib/base64decode":17,"./lib/wa_detect":23,"object-assign":24}],17:[function(require,module,exports){
// base64 decode str -> Uint8Array, to load WA modules
//
'use strict';


var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';


module.exports = function base64decode(str) {
  var input = str.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
      max   = input.length;

  var out = new Uint8Array((max * 3) >> 2);

  // Collect by 6*4 bits (3 bytes)

  var bits = 0;
  var ptr  = 0;

  for (var idx = 0; idx < max; idx++) {
    if ((idx % 4 === 0) && idx) {
      out[ptr++] = (bits >> 16) & 0xFF;
      out[ptr++] = (bits >> 8) & 0xFF;
      out[ptr++] = bits & 0xFF;
    }

    bits = (bits << 6) | BASE64_MAP.indexOf(input.charAt(idx));
  }

  // Dump tail

  var tailbits = (max % 4) * 6;

  if (tailbits === 0) {
    out[ptr++] = (bits >> 16) & 0xFF;
    out[ptr++] = (bits >> 8) & 0xFF;
    out[ptr++] = bits & 0xFF;
  } else if (tailbits === 18) {
    out[ptr++] = (bits >> 10) & 0xFF;
    out[ptr++] = (bits >> 2) & 0xFF;
  } else if (tailbits === 12) {
    out[ptr++] = (bits >> 4) & 0xFF;
  }

  return out;
};

},{}],18:[function(require,module,exports){
// Calculates 16-bit precision HSL lightness from 8-bit rgba buffer
//
'use strict';


module.exports = function hsl_l16_js(img, width, height) {
  var size = width * height;
  var out = new Uint16Array(size);
  var r, g, b, min, max;
  for (var i = 0; i < size; i++) {
    r = img[4 * i];
    g = img[4 * i + 1];
    b = img[4 * i + 2];
    max = (r >= g && r >= b) ? r : (g >= b && g >= r) ? g : b;
    min = (r <= g && r <= b) ? r : (g <= b && g <= r) ? g : b;
    out[i] = (max + min) * 257 >> 1;
  }
  return out;
};

},{}],19:[function(require,module,exports){
'use strict';

module.exports = {
  name:     'unsharp_mask',
  fn:       require('./unsharp_mask'),
  wasm_fn:  require('./unsharp_mask_wasm'),
  wasm_src: require('./unsharp_mask_wasm_base64')
};

},{"./unsharp_mask":20,"./unsharp_mask_wasm":21,"./unsharp_mask_wasm_base64":22}],20:[function(require,module,exports){
// Unsharp mask filter
//
// http://stackoverflow.com/a/23322820/1031804
// USM(O) = O + (2 * (Amount / 100) * (O - GB))
// GB - gaussian blur.
//
// Image is converted from RGB to HSL, unsharp mask is applied to the
// lightness channel and then image is converted back to RGB.
//
'use strict';


var glur_mono16 = require('glur/mono16');
var hsl_l16     = require('./hsl_l16');


module.exports = function unsharp(img, width, height, amount, radius, threshold) {
  var r, g, b;
  var h, s, l;
  var min, max;
  var m1, m2, hShifted;
  var diff, iTimes4;

  if (amount === 0 || radius < 0.5) {
    return;
  }
  if (radius > 2.0) {
    radius = 2.0;
  }

  var lightness = hsl_l16(img, width, height);

  var blured = new Uint16Array(lightness); // copy, because blur modify src

  glur_mono16(blured, width, height, radius);

  var amountFp = (amount / 100 * 0x1000 + 0.5)|0;
  var thresholdFp = (threshold * 257)|0;

  var size = width * height;

  /* eslint-disable indent */
  for (var i = 0; i < size; i++) {
    diff = 2 * (lightness[i] - blured[i]);

    if (Math.abs(diff) >= thresholdFp) {
      iTimes4 = i * 4;
      r = img[iTimes4];
      g = img[iTimes4 + 1];
      b = img[iTimes4 + 2];

      // convert RGB to HSL
      // take RGB, 8-bit unsigned integer per each channel
      // save HSL, H and L are 16-bit unsigned integers, S is 12-bit unsigned integer
      // math is taken from here: http://www.easyrgb.com/index.php?X=MATH&H=18
      // and adopted to be integer (fixed point in fact) for sake of performance
      max = (r >= g && r >= b) ? r : (g >= r && g >= b) ? g : b; // min and max are in [0..0xff]
      min = (r <= g && r <= b) ? r : (g <= r && g <= b) ? g : b;
      l = (max + min) * 257 >> 1; // l is in [0..0xffff] that is caused by multiplication by 257

      if (min === max) {
        h = s = 0;
      } else {
        s = (l <= 0x7fff) ?
          (((max - min) * 0xfff) / (max + min))|0 :
          (((max - min) * 0xfff) / (2 * 0xff - max - min))|0; // s is in [0..0xfff]
        // h could be less 0, it will be fixed in backward conversion to RGB, |h| <= 0xffff / 6
        h = (r === max) ? (((g - b) * 0xffff) / (6 * (max - min)))|0
          : (g === max) ? 0x5555 + ((((b - r) * 0xffff) / (6 * (max - min)))|0) // 0x5555 == 0xffff / 3
          : 0xaaaa + ((((r - g) * 0xffff) / (6 * (max - min)))|0); // 0xaaaa == 0xffff * 2 / 3
      }

      // add unsharp mask mask to the lightness channel
      l += (amountFp * diff + 0x800) >> 12;
      if (l > 0xffff) {
        l = 0xffff;
      } else if (l < 0) {
        l = 0;
      }

      // convert HSL back to RGB
      // for information about math look above
      if (s === 0) {
        r = g = b = l >> 8;
      } else {
        m2 = (l <= 0x7fff) ? (l * (0x1000 + s) + 0x800) >> 12 :
          l  + (((0xffff - l) * s + 0x800) >>  12);
        m1 = 2 * l - m2 >> 8;
        m2 >>= 8;
        // save result to RGB channels
        // R channel
        hShifted = (h + 0x5555) & 0xffff; // 0x5555 == 0xffff / 3
        r = (hShifted >= 0xaaaa) ? m1 // 0xaaaa == 0xffff * 2 / 3
          : (hShifted >= 0x7fff) ?  m1 + ((m2 - m1) * 6 * (0xaaaa - hShifted) + 0x8000 >> 16)
          : (hShifted >= 0x2aaa) ? m2 // 0x2aaa == 0xffff / 6
          : m1 + ((m2 - m1) * 6 * hShifted + 0x8000 >> 16);
        // G channel
        hShifted = h & 0xffff;
        g = (hShifted >= 0xaaaa) ? m1 // 0xaaaa == 0xffff * 2 / 3
          : (hShifted >= 0x7fff) ?  m1 + ((m2 - m1) * 6 * (0xaaaa - hShifted) + 0x8000 >> 16)
          : (hShifted >= 0x2aaa) ? m2 // 0x2aaa == 0xffff / 6
          : m1 + ((m2 - m1) * 6 * hShifted + 0x8000 >> 16);
        // B channel
        hShifted = (h - 0x5555) & 0xffff;
        b = (hShifted >= 0xaaaa) ? m1 // 0xaaaa == 0xffff * 2 / 3
          : (hShifted >= 0x7fff) ?  m1 + ((m2 - m1) * 6 * (0xaaaa - hShifted) + 0x8000 >> 16)
          : (hShifted >= 0x2aaa) ? m2 // 0x2aaa == 0xffff / 6
          : m1 + ((m2 - m1) * 6 * hShifted + 0x8000 >> 16);
      }

      img[iTimes4] = r;
      img[iTimes4 + 1] = g;
      img[iTimes4 + 2] = b;
    }
  }
};

},{"./hsl_l16":18,"glur/mono16":14}],21:[function(require,module,exports){
'use strict';


module.exports = function unsharp(img, width, height, amount, radius, threshold) {
  if (amount === 0 || radius < 0.5) {
    return;
  }

  if (radius > 2.0) {
    radius = 2.0;
  }

  var pixels = width * height;

  var img_bytes_cnt        = pixels * 4;
  var hsl_bytes_cnt        = pixels * 2;
  var blur_bytes_cnt       = pixels * 2;
  var blur_line_byte_cnt   = Math.max(width, height) * 4; // float32 array
  var blur_coeffs_byte_cnt = 8 * 4; // float32 array

  var img_offset         = 0;
  var hsl_offset         = img_bytes_cnt;
  var blur_offset        = hsl_offset + hsl_bytes_cnt;
  var blur_tmp_offset    = blur_offset + blur_bytes_cnt;
  var blur_line_offset   = blur_tmp_offset + blur_bytes_cnt;
  var blur_coeffs_offset = blur_line_offset + blur_line_byte_cnt;

  var instance = this.__instance(
    'unsharp_mask',
    img_bytes_cnt + hsl_bytes_cnt + blur_bytes_cnt * 2 + blur_line_byte_cnt + blur_coeffs_byte_cnt,
    { exp: Math.exp }
  );

  // 32-bit copy is much faster in chrome
  var img32 = new Uint32Array(img.buffer);
  var mem32 = new Uint32Array(this.__memory.buffer);
  mem32.set(img32);

  // HSL
  var fn = instance.exports.hsl_l16 || instance.exports._hsl_l16;
  fn(img_offset, hsl_offset, width, height);

  // BLUR
  fn = instance.exports.blurMono16 || instance.exports._blurMono16;
  fn(hsl_offset, blur_offset, blur_tmp_offset,
    blur_line_offset, blur_coeffs_offset, width, height, radius);

  // UNSHARP
  fn = instance.exports.unsharp || instance.exports._unsharp;
  fn(img_offset, img_offset, hsl_offset,
    blur_offset, width, height, amount, threshold);

  // 32-bit copy is much faster in chrome
  img32.set(new Uint32Array(this.__memory.buffer, 0, pixels));
};

},{}],22:[function(require,module,exports){
// This is autogenerated file from math.wasm, don't edit.
//
'use strict';

/* eslint-disable max-len */
module.exports = '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';

},{}],23:[function(require,module,exports){
// Detect WebAssembly support.
// - Check global WebAssembly object
// - Try to load simple module (can be disabled via CSP)
//
'use strict';


var wa;


module.exports = function hasWebAssembly() {
  // use cache if called before;
  if (typeof wa !== 'undefined') return wa;

  wa = false;

  if (typeof WebAssembly === 'undefined') return wa;

  // If WebAssenbly is disabled, code can throw on compile
  try {
    // https://github.com/brion/min-wasm-fail/blob/master/min-wasm-fail.in.js
    // Additional check that WA internals are correct

    /* eslint-disable comma-spacing, max-len */
    var bin      = new Uint8Array([ 0,97,115,109,1,0,0,0,1,6,1,96,1,127,1,127,3,2,1,0,5,3,1,0,1,7,8,1,4,116,101,115,116,0,0,10,16,1,14,0,32,0,65,1,54,2,0,32,0,40,2,0,11 ]);
    var module   = new WebAssembly.Module(bin);
    var instance = new WebAssembly.Instance(module, {});

    // test storing to and loading from a non-zero location via a parameter.
    // Safari on iOS 11.2.5 returns 0 unexpectedly at non-zero locations
    if (instance.exports.test(4) !== 0) wa = true;

    return wa;
  } catch (__) {}

  return wa;
};

},{}],24:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],25:[function(require,module,exports){
var bundleFn = arguments[3];
var sources = arguments[4];
var cache = arguments[5];

var stringify = JSON.stringify;

module.exports = function (fn, options) {
    var wkey;
    var cacheKeys = Object.keys(cache);

    for (var i = 0, l = cacheKeys.length; i < l; i++) {
        var key = cacheKeys[i];
        var exp = cache[key].exports;
        // Using babel as a transpiler to use esmodule, the export will always
        // be an object with the default export as a property of it. To ensure
        // the existing api and babel esmodule exports are both supported we
        // check for both
        if (exp === fn || exp && exp.default === fn) {
            wkey = key;
            break;
        }
    }

    if (!wkey) {
        wkey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
        var wcache = {};
        for (var i = 0, l = cacheKeys.length; i < l; i++) {
            var key = cacheKeys[i];
            wcache[key] = key;
        }
        sources[wkey] = [
            'function(require,module,exports){' + fn + '(self); }',
            wcache
        ];
    }
    var skey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);

    var scache = {}; scache[wkey] = wkey;
    sources[skey] = [
        'function(require,module,exports){' +
            // try to call default if defined to also support babel esmodule exports
            'var f = require(' + stringify(wkey) + ');' +
            '(f.default ? f.default : f)(self);' +
        '}',
        scache
    ];

    var workerSources = {};
    resolveSources(skey);

    function resolveSources(key) {
        workerSources[key] = true;

        for (var depPath in sources[key][1]) {
            var depKey = sources[key][1][depPath];
            if (!workerSources[depKey]) {
                resolveSources(depKey);
            }
        }
    }

    var src = '(' + bundleFn + ')({'
        + Object.keys(workerSources).map(function (key) {
            return stringify(key) + ':['
                + sources[key][0]
                + ',' + stringify(sources[key][1]) + ']'
            ;
        }).join(',')
        + '},{},[' + stringify(skey) + '])'
    ;

    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    var blob = new Blob([src], { type: 'text/javascript' });
    if (options && options.bare) { return blob; }
    var workerUrl = URL.createObjectURL(blob);
    var worker = new Worker(workerUrl);
    worker.objectURL = workerUrl;
    return worker;
};

},{}],"/":[function(require,module,exports){
'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var assign = require('object-assign');

var webworkify = require('webworkify');

var MathLib = require('./lib/mathlib');

var Pool = require('./lib/pool');

var utils = require('./lib/utils');

var worker = require('./lib/worker');

var createStages = require('./lib/stepper');

var createRegions = require('./lib/tiler'); // Deduplicate pools & limiters with the same configs
// when user creates multiple pica instances.


var singletones = {};
var NEED_SAFARI_FIX = false;

try {
  if (typeof navigator !== 'undefined' && navigator.userAgent) {
    NEED_SAFARI_FIX = navigator.userAgent.indexOf('Safari') >= 0;
  }
} catch (e) {}

var concurrency = 1;

if (typeof navigator !== 'undefined') {
  concurrency = Math.min(navigator.hardwareConcurrency || 1, 4);
}

var DEFAULT_PICA_OPTS = {
  tile: 1024,
  concurrency: concurrency,
  features: ['js', 'wasm', 'ww'],
  idle: 2000
};
var DEFAULT_RESIZE_OPTS = {
  quality: 3,
  alpha: false,
  unsharpAmount: 0,
  unsharpRadius: 0.0,
  unsharpThreshold: 0
};
var CAN_NEW_IMAGE_DATA;
var CAN_CREATE_IMAGE_BITMAP;

function workerFabric() {
  return {
    value: webworkify(worker),
    destroy: function destroy() {
      this.value.terminate();

      if (typeof window !== 'undefined') {
        var url = window.URL || window.webkitURL || window.mozURL || window.msURL;

        if (url && url.revokeObjectURL && this.value.objectURL) {
          url.revokeObjectURL(this.value.objectURL);
        }
      }
    }
  };
} ////////////////////////////////////////////////////////////////////////////////
// API methods


function Pica(options) {
  if (!(this instanceof Pica)) return new Pica(options);
  this.options = assign({}, DEFAULT_PICA_OPTS, options || {});
  var limiter_key = "lk_".concat(this.options.concurrency); // Share limiters to avoid multiple parallel workers when user creates
  // multiple pica instances.

  this.__limit = singletones[limiter_key] || utils.limiter(this.options.concurrency);
  if (!singletones[limiter_key]) singletones[limiter_key] = this.__limit; // List of supported features, according to options & browser/node.js

  this.features = {
    js: false,
    // pure JS implementation, can be disabled for testing
    wasm: false,
    // webassembly implementation for heavy functions
    cib: false,
    // resize via createImageBitmap (only FF at this moment)
    ww: false // webworkers

  };
  this.__workersPool = null; // Store requested features for webworkers

  this.__requested_features = [];
  this.__mathlib = null;
}

Pica.prototype.init = function () {
  var _this = this;

  if (this.__initPromise) return this.__initPromise; // Test if we can create ImageData without canvas and memory copy

  if (CAN_NEW_IMAGE_DATA !== false && CAN_NEW_IMAGE_DATA !== true) {
    CAN_NEW_IMAGE_DATA = false;

    if (typeof ImageData !== 'undefined' && typeof Uint8ClampedArray !== 'undefined') {
      try {
        /* eslint-disable no-new */
        new ImageData(new Uint8ClampedArray(400), 10, 10);
        CAN_NEW_IMAGE_DATA = true;
      } catch (__) {}
    }
  } // ImageBitmap can be effective in 2 places:
  //
  // 1. Threaded jpeg unpack (basic)
  // 2. Built-in resize (blocked due problem in chrome, see issue #89)
  //
  // For basic use we also need ImageBitmap wo support .close() method,
  // see https://developer.mozilla.org/ru/docs/Web/API/ImageBitmap


  if (CAN_CREATE_IMAGE_BITMAP !== false && CAN_CREATE_IMAGE_BITMAP !== true) {
    CAN_CREATE_IMAGE_BITMAP = false;

    if (typeof ImageBitmap !== 'undefined') {
      if (ImageBitmap.prototype && ImageBitmap.prototype.close) {
        CAN_CREATE_IMAGE_BITMAP = true;
      } else {
        this.debug('ImageBitmap does not support .close(), disabled');
      }
    }
  }

  var features = this.options.features.slice();

  if (features.indexOf('all') >= 0) {
    features = ['cib', 'wasm', 'js', 'ww'];
  }

  this.__requested_features = features;
  this.__mathlib = new MathLib(features); // Check WebWorker support if requested

  if (features.indexOf('ww') >= 0) {
    if (typeof window !== 'undefined' && 'Worker' in window) {
      // IE <= 11 don't allow to create webworkers from string. We should check it.
      // https://connect.microsoft.com/IE/feedback/details/801810/web-workers-from-blob-urls-in-ie-10-and-11
      try {
        var wkr = require('webworkify')(function () {});

        wkr.terminate();
        this.features.ww = true; // pool uniqueness depends on pool config + webworker config

        var wpool_key = "wp_".concat(JSON.stringify(this.options));

        if (singletones[wpool_key]) {
          this.__workersPool = singletones[wpool_key];
        } else {
          this.__workersPool = new Pool(workerFabric, this.options.idle);
          singletones[wpool_key] = this.__workersPool;
        }
      } catch (__) {}
    }
  }

  var initMath = this.__mathlib.init().then(function (mathlib) {
    // Copy detected features
    assign(_this.features, mathlib.features);
  });

  var checkCibResize;

  if (!CAN_CREATE_IMAGE_BITMAP) {
    checkCibResize = Promise.resolve(false);
  } else {
    checkCibResize = utils.cib_support().then(function (status) {
      if (_this.features.cib && features.indexOf('cib') < 0) {
        _this.debug('createImageBitmap() resize supported, but disabled by config');

        return;
      }

      if (features.indexOf('cib') >= 0) _this.features.cib = status;
    });
  } // Init math lib. That's async because can load some


  this.__initPromise = Promise.all([initMath, checkCibResize]).then(function () {
    return _this;
  });
  return this.__initPromise;
};

Pica.prototype.resize = function (from, to, options) {
  var _this2 = this;

  this.debug('Start resize...');
  var opts = assign({}, DEFAULT_RESIZE_OPTS);

  if (!isNaN(options)) {
    opts = assign(opts, {
      quality: options
    });
  } else if (options) {
    opts = assign(opts, options);
  }

  opts.toWidth = to.width;
  opts.toHeight = to.height;
  opts.width = from.naturalWidth || from.width;
  opts.height = from.naturalHeight || from.height; // Prevent stepper from infinite loop

  if (to.width === 0 || to.height === 0) {
    return Promise.reject(new Error("Invalid output size: ".concat(to.width, "x").concat(to.height)));
  }

  if (opts.unsharpRadius > 2) opts.unsharpRadius = 2;
  var canceled = false;
  var cancelToken = null;

  if (opts.cancelToken) {
    // Wrap cancelToken to avoid successive resolve & set flag
    cancelToken = opts.cancelToken.then(function (data) {
      canceled = true;
      throw data;
    }, function (err) {
      canceled = true;
      throw err;
    });
  }

  var DEST_TILE_BORDER = 3; // Max possible filter window size

  var destTileBorder = Math.ceil(Math.max(DEST_TILE_BORDER, 2.5 * opts.unsharpRadius | 0));
  return this.init().then(function () {
    if (canceled) return cancelToken; // if createImageBitmap supports resize, just do it and return

    if (_this2.features.cib) {
      var toCtx = to.getContext('2d', {
        alpha: Boolean(opts.alpha)
      });

      _this2.debug('Resize via createImageBitmap()');

      return createImageBitmap(from, {
        resizeWidth: opts.toWidth,
        resizeHeight: opts.toHeight,
        resizeQuality: utils.cib_quality_name(opts.quality)
      }).then(function (imageBitmap) {
        if (canceled) return cancelToken; // if no unsharp - draw directly to output canvas

        if (!opts.unsharpAmount) {
          toCtx.drawImage(imageBitmap, 0, 0);
          imageBitmap.close();
          toCtx = null;

          _this2.debug('Finished!');

          return to;
        }

        _this2.debug('Unsharp result');

        var tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = opts.toWidth;
        tmpCanvas.height = opts.toHeight;
        var tmpCtx = tmpCanvas.getContext('2d', {
          alpha: Boolean(opts.alpha)
        });
        tmpCtx.drawImage(imageBitmap, 0, 0);
        imageBitmap.close();
        var iData = tmpCtx.getImageData(0, 0, opts.toWidth, opts.toHeight);

        _this2.__mathlib.unsharp(iData.data, opts.toWidth, opts.toHeight, opts.unsharpAmount, opts.unsharpRadius, opts.unsharpThreshold);

        toCtx.putImageData(iData, 0, 0);
        iData = tmpCtx = tmpCanvas = toCtx = null;

        _this2.debug('Finished!');

        return to;
      });
    } //
    // No easy way, let's resize manually via arrays
    //
    // Share cache between calls:
    //
    // - wasm instance
    // - wasm memory object
    //


    var cache = {}; // Call resizer in webworker or locally, depending on config

    var invokeResize = function invokeResize(opts) {
      return Promise.resolve().then(function () {
        if (!_this2.features.ww) return _this2.__mathlib.resizeAndUnsharp(opts, cache);
        return new Promise(function (resolve, reject) {
          var w = _this2.__workersPool.acquire();

          if (cancelToken) cancelToken.catch(function (err) {
            return reject(err);
          });

          w.value.onmessage = function (ev) {
            w.release();
            if (ev.data.err) reject(ev.data.err);else resolve(ev.data.result);
          };

          w.value.postMessage({
            opts: opts,
            features: _this2.__requested_features,
            preload: {
              wasm_nodule: _this2.__mathlib.__
            }
          }, [opts.src.buffer]);
        });
      });
    };

    var tileAndResize = function tileAndResize(from, to, opts) {
      var srcCtx;
      var srcImageBitmap;
      var toCtx;

      var processTile = function processTile(tile) {
        return _this2.__limit(function () {
          if (canceled) return cancelToken;
          var srcImageData; // Extract tile RGBA buffer, depending on input type

          if (utils.isCanvas(from)) {
            _this2.debug('Get tile pixel data'); // If input is Canvas - extract region data directly


            srcImageData = srcCtx.getImageData(tile.x, tile.y, tile.width, tile.height);
          } else {
            // If input is Image or decoded to ImageBitmap,
            // draw region to temporary canvas and extract data from it
            //
            // Note! Attempt to reuse this canvas causes significant slowdown in chrome
            //
            _this2.debug('Draw tile imageBitmap/image to temporary canvas');

            var tmpCanvas = document.createElement('canvas');
            tmpCanvas.width = tile.width;
            tmpCanvas.height = tile.height;
            var tmpCtx = tmpCanvas.getContext('2d', {
              alpha: Boolean(opts.alpha)
            });
            tmpCtx.globalCompositeOperation = 'copy';
            tmpCtx.drawImage(srcImageBitmap || from, tile.x, tile.y, tile.width, tile.height, 0, 0, tile.width, tile.height);

            _this2.debug('Get tile pixel data');

            srcImageData = tmpCtx.getImageData(0, 0, tile.width, tile.height);
            tmpCtx = tmpCanvas = null;
          }

          var o = {
            src: srcImageData.data,
            width: tile.width,
            height: tile.height,
            toWidth: tile.toWidth,
            toHeight: tile.toHeight,
            scaleX: tile.scaleX,
            scaleY: tile.scaleY,
            offsetX: tile.offsetX,
            offsetY: tile.offsetY,
            quality: opts.quality,
            alpha: opts.alpha,
            unsharpAmount: opts.unsharpAmount,
            unsharpRadius: opts.unsharpRadius,
            unsharpThreshold: opts.unsharpThreshold
          };

          _this2.debug('Invoke resize math');

          return Promise.resolve().then(function () {
            return invokeResize(o);
          }).then(function (result) {
            if (canceled) return cancelToken;
            srcImageData = null;
            var toImageData;

            _this2.debug('Convert raw rgba tile result to ImageData');

            if (CAN_NEW_IMAGE_DATA) {
              // this branch is for modern browsers
              // If `new ImageData()` & Uint8ClampedArray suported
              toImageData = new ImageData(new Uint8ClampedArray(result), tile.toWidth, tile.toHeight);
            } else {
              // fallback for `node-canvas` and old browsers
              // (IE11 has ImageData but does not support `new ImageData()`)
              toImageData = toCtx.createImageData(tile.toWidth, tile.toHeight);

              if (toImageData.data.set) {
                toImageData.data.set(result);
              } else {
                // IE9 don't have `.set()`
                for (var i = toImageData.data.length - 1; i >= 0; i--) {
                  toImageData.data[i] = result[i];
                }
              }
            }

            _this2.debug('Draw tile');

            if (NEED_SAFARI_FIX) {
              // Safari draws thin white stripes between tiles without this fix
              toCtx.putImageData(toImageData, tile.toX, tile.toY, tile.toInnerX - tile.toX, tile.toInnerY - tile.toY, tile.toInnerWidth + 1e-5, tile.toInnerHeight + 1e-5);
            } else {
              toCtx.putImageData(toImageData, tile.toX, tile.toY, tile.toInnerX - tile.toX, tile.toInnerY - tile.toY, tile.toInnerWidth, tile.toInnerHeight);
            }

            return null;
          });
        });
      }; // Need to normalize data source first. It can be canvas or image.
      // If image - try to decode in background if possible


      return Promise.resolve().then(function () {
        toCtx = to.getContext('2d', {
          alpha: Boolean(opts.alpha)
        });

        if (utils.isCanvas(from)) {
          srcCtx = from.getContext('2d', {
            alpha: Boolean(opts.alpha)
          });
          return null;
        }

        if (utils.isImage(from)) {
          // try do decode image in background for faster next operations
          if (!CAN_CREATE_IMAGE_BITMAP) return null;

          _this2.debug('Decode image via createImageBitmap');

          return createImageBitmap(from).then(function (imageBitmap) {
            srcImageBitmap = imageBitmap;
          });
        }

        throw new Error('".from" should be image or canvas');
      }).then(function () {
        if (canceled) return cancelToken;

        _this2.debug('Calculate tiles'); //
        // Here we are with "normalized" source,
        // follow to tiling
        //


        var regions = createRegions({
          width: opts.width,
          height: opts.height,
          srcTileSize: _this2.options.tile,
          toWidth: opts.toWidth,
          toHeight: opts.toHeight,
          destTileBorder: destTileBorder
        });
        var jobs = regions.map(function (tile) {
          return processTile(tile);
        });

        function cleanup() {
          if (srcImageBitmap) {
            srcImageBitmap.close();
            srcImageBitmap = null;
          }
        }

        _this2.debug('Process tiles');

        return Promise.all(jobs).then(function () {
          _this2.debug('Finished!');

          cleanup();
          return to;
        }, function (err) {
          cleanup();
          throw err;
        });
      });
    };

    var processStages = function processStages(stages, from, to, opts) {
      if (canceled) return cancelToken;

      var _stages$shift = stages.shift(),
          _stages$shift2 = _slicedToArray(_stages$shift, 2),
          toWidth = _stages$shift2[0],
          toHeight = _stages$shift2[1];

      var isLastStage = stages.length === 0;
      opts = assign({}, opts, {
        toWidth: toWidth,
        toHeight: toHeight,
        // only use user-defined quality for the last stage,
        // use simpler (Hamming) filter for the first stages where
        // scale factor is large enough (more than 2-3)
        quality: isLastStage ? opts.quality : Math.min(1, opts.quality)
      });
      var tmpCanvas;

      if (!isLastStage) {
        // create temporary canvas
        tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = toWidth;
        tmpCanvas.height = toHeight;
      }

      return tileAndResize(from, isLastStage ? to : tmpCanvas, opts).then(function () {
        if (isLastStage) return to;
        opts.width = toWidth;
        opts.height = toHeight;
        return processStages(stages, tmpCanvas, to, opts);
      });
    };

    var stages = createStages(opts.width, opts.height, opts.toWidth, opts.toHeight, _this2.options.tile, destTileBorder);
    return processStages(stages, from, to, opts);
  });
}; // RGBA buffer resize
//


Pica.prototype.resizeBuffer = function (options) {
  var _this3 = this;

  var opts = assign({}, DEFAULT_RESIZE_OPTS, options);
  return this.init().then(function () {
    return _this3.__mathlib.resizeAndUnsharp(opts);
  });
};

Pica.prototype.toBlob = function (canvas, mimeType, quality) {
  mimeType = mimeType || 'image/png';
  return new Promise(function (resolve) {
    if (canvas.toBlob) {
      canvas.toBlob(function (blob) {
        return resolve(blob);
      }, mimeType, quality);
      return;
    } // Fallback for old browsers


    var asString = atob(canvas.toDataURL(mimeType, quality).split(',')[1]);
    var len = asString.length;
    var asBuffer = new Uint8Array(len);

    for (var i = 0; i < len; i++) {
      asBuffer[i] = asString.charCodeAt(i);
    }

    resolve(new Blob([asBuffer], {
      type: mimeType
    }));
  });
};

Pica.prototype.debug = function () {};

module.exports = Pica;

},{"./lib/mathlib":1,"./lib/pool":9,"./lib/stepper":10,"./lib/tiler":11,"./lib/utils":12,"./lib/worker":13,"object-assign":24,"webworkify":25}]},{},[])("/")
});
