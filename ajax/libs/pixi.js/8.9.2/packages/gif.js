/*!
 * PixiJS - v8.9.2
 * Compiled Tue, 29 Apr 2025 11:37:56 UTC
 *
 * PixiJS is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
this.PIXI = this.PIXI || {};
var gif_js = (function (exports) {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getDefaultExportFromNamespaceIfPresent (n) {
		return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
	}

	function getDefaultExportFromNamespaceIfNotNamed (n) {
		return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
	}

	function getAugmentedNamespace(n) {
	  if (n.__esModule) return n;
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
	        return Reflect.construct(f, arguments, this.constructor);
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var lib$1 = {};

	var gif$1 = {};

	var lib = {};

	"use strict";

	Object.defineProperty(lib, "__esModule", {
	  value: true
	});
	var loop_1 = lib.loop = conditional_1 = lib.conditional = parse_1 = lib.parse = void 0;

	var parse = function parse(stream, schema) {
	  var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : result;

	  if (Array.isArray(schema)) {
	    schema.forEach(function (partSchema) {
	      return parse(stream, partSchema, result, parent);
	    });
	  } else if (typeof schema === 'function') {
	    schema(stream, result, parent, parse);
	  } else {
	    var key = Object.keys(schema)[0];

	    if (Array.isArray(schema[key])) {
	      parent[key] = {};
	      parse(stream, schema[key], result, parent[key]);
	    } else {
	      parent[key] = schema[key](stream, result, parent, parse);
	    }
	  }

	  return result;
	};

	var parse_1 = lib.parse = parse;

	var conditional = function conditional(schema, conditionFunc) {
	  return function (stream, result, parent, parse) {
	    if (conditionFunc(stream, result, parent)) {
	      parse(stream, schema, result, parent);
	    }
	  };
	};

	var conditional_1 = lib.conditional = conditional;

	var loop = function loop(schema, continueFunc) {
	  return function (stream, result, parent, parse) {
	    var arr = [];
	    var lastStreamPos = stream.pos;

	    while (continueFunc(stream, result, parent)) {
	      var newParent = {};
	      parse(stream, schema, result, newParent); // cases when whole file is parsed but no termination is there and stream position is not getting updated as well
	      // it falls into infinite recursion, null check to avoid the same

	      if (stream.pos === lastStreamPos) {
	        break;
	      }

	      lastStreamPos = stream.pos;
	      arr.push(newParent);
	    }

	    return arr;
	  };
	};

	loop_1 = lib.loop = loop;

	var uint8 = {};

	"use strict";

	Object.defineProperty(uint8, "__esModule", {
	  value: true
	});
	var readBits_1 = uint8.readBits = readArray_1 = uint8.readArray = readUnsigned_1 = uint8.readUnsigned = readString_1 = uint8.readString = peekBytes_1 = uint8.peekBytes = readBytes_1 = uint8.readBytes = peekByte_1 = uint8.peekByte = readByte_1 = uint8.readByte = buildStream_1 = uint8.buildStream = void 0;

	// Default stream and parsers for Uint8TypedArray data type
	var buildStream = function buildStream(uint8Data) {
	  return {
	    data: uint8Data,
	    pos: 0
	  };
	};

	var buildStream_1 = uint8.buildStream = buildStream;

	var readByte = function readByte() {
	  return function (stream) {
	    return stream.data[stream.pos++];
	  };
	};

	var readByte_1 = uint8.readByte = readByte;

	var peekByte = function peekByte() {
	  var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  return function (stream) {
	    return stream.data[stream.pos + offset];
	  };
	};

	var peekByte_1 = uint8.peekByte = peekByte;

	var readBytes = function readBytes(length) {
	  return function (stream) {
	    return stream.data.subarray(stream.pos, stream.pos += length);
	  };
	};

	var readBytes_1 = uint8.readBytes = readBytes;

	var peekBytes = function peekBytes(length) {
	  return function (stream) {
	    return stream.data.subarray(stream.pos, stream.pos + length);
	  };
	};

	var peekBytes_1 = uint8.peekBytes = peekBytes;

	var readString = function readString(length) {
	  return function (stream) {
	    return Array.from(readBytes(length)(stream)).map(function (value) {
	      return String.fromCharCode(value);
	    }).join('');
	  };
	};

	var readString_1 = uint8.readString = readString;

	var readUnsigned = function readUnsigned(littleEndian) {
	  return function (stream) {
	    var bytes = readBytes(2)(stream);
	    return littleEndian ? (bytes[1] << 8) + bytes[0] : (bytes[0] << 8) + bytes[1];
	  };
	};

	var readUnsigned_1 = uint8.readUnsigned = readUnsigned;

	var readArray = function readArray(byteSize, totalOrFunc) {
	  return function (stream, result, parent) {
	    var total = typeof totalOrFunc === 'function' ? totalOrFunc(stream, result, parent) : totalOrFunc;
	    var parser = readBytes(byteSize);
	    var arr = new Array(total);

	    for (var i = 0; i < total; i++) {
	      arr[i] = parser(stream);
	    }

	    return arr;
	  };
	};

	var readArray_1 = uint8.readArray = readArray;

	var subBitsTotal = function subBitsTotal(bits, startIndex, length) {
	  var result = 0;

	  for (var i = 0; i < length; i++) {
	    result += bits[startIndex + i] && Math.pow(2, length - i - 1);
	  }

	  return result;
	};

	var readBits = function readBits(schema) {
	  return function (stream) {
	    var _byte = readByte()(stream); // convert the byte to bit array


	    var bits = new Array(8);

	    for (var i = 0; i < 8; i++) {
	      bits[7 - i] = !!(_byte & 1 << i);
	    } // convert the bit array to values based on the schema


	    return Object.keys(schema).reduce(function (res, key) {
	      var def = schema[key];

	      if (def.length) {
	        res[key] = subBitsTotal(bits, def.index, def.length);
	      } else {
	        res[key] = bits[def.index];
	      }

	      return res;
	    }, {});
	  };
	};

	readBits_1 = uint8.readBits = readBits;

	(function (exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports["default"] = void 0;

		var _ = lib;

		var _uint = uint8;

		// a set of 0x00 terminated subblocks
		var subBlocksSchema = {
		  blocks: function blocks(stream) {
		    var terminator = 0x00;
		    var chunks = [];
		    var streamSize = stream.data.length;
		    var total = 0;

		    for (var size = (0, _uint.readByte)()(stream); size !== terminator; size = (0, _uint.readByte)()(stream)) {
		      // size becomes undefined for some case when file is corrupted and  terminator is not proper 
		      // null check to avoid recursion
		      if (!size) break; // catch corrupted files with no terminator

		      if (stream.pos + size >= streamSize) {
		        var availableSize = streamSize - stream.pos;
		        chunks.push((0, _uint.readBytes)(availableSize)(stream));
		        total += availableSize;
		        break;
		      }

		      chunks.push((0, _uint.readBytes)(size)(stream));
		      total += size;
		    }

		    var result = new Uint8Array(total);
		    var offset = 0;

		    for (var i = 0; i < chunks.length; i++) {
		      result.set(chunks[i], offset);
		      offset += chunks[i].length;
		    }

		    return result;
		  }
		}; // global control extension

		var gceSchema = (0, _.conditional)({
		  gce: [{
		    codes: (0, _uint.readBytes)(2)
		  }, {
		    byteSize: (0, _uint.readByte)()
		  }, {
		    extras: (0, _uint.readBits)({
		      future: {
		        index: 0,
		        length: 3
		      },
		      disposal: {
		        index: 3,
		        length: 3
		      },
		      userInput: {
		        index: 6
		      },
		      transparentColorGiven: {
		        index: 7
		      }
		    })
		  }, {
		    delay: (0, _uint.readUnsigned)(true)
		  }, {
		    transparentColorIndex: (0, _uint.readByte)()
		  }, {
		    terminator: (0, _uint.readByte)()
		  }]
		}, function (stream) {
		  var codes = (0, _uint.peekBytes)(2)(stream);
		  return codes[0] === 0x21 && codes[1] === 0xf9;
		}); // image pipeline block

		var imageSchema = (0, _.conditional)({
		  image: [{
		    code: (0, _uint.readByte)()
		  }, {
		    descriptor: [{
		      left: (0, _uint.readUnsigned)(true)
		    }, {
		      top: (0, _uint.readUnsigned)(true)
		    }, {
		      width: (0, _uint.readUnsigned)(true)
		    }, {
		      height: (0, _uint.readUnsigned)(true)
		    }, {
		      lct: (0, _uint.readBits)({
		        exists: {
		          index: 0
		        },
		        interlaced: {
		          index: 1
		        },
		        sort: {
		          index: 2
		        },
		        future: {
		          index: 3,
		          length: 2
		        },
		        size: {
		          index: 5,
		          length: 3
		        }
		      })
		    }]
		  }, (0, _.conditional)({
		    lct: (0, _uint.readArray)(3, function (stream, result, parent) {
		      return Math.pow(2, parent.descriptor.lct.size + 1);
		    })
		  }, function (stream, result, parent) {
		    return parent.descriptor.lct.exists;
		  }), {
		    data: [{
		      minCodeSize: (0, _uint.readByte)()
		    }, subBlocksSchema]
		  }]
		}, function (stream) {
		  return (0, _uint.peekByte)()(stream) === 0x2c;
		}); // plain text block

		var textSchema = (0, _.conditional)({
		  text: [{
		    codes: (0, _uint.readBytes)(2)
		  }, {
		    blockSize: (0, _uint.readByte)()
		  }, {
		    preData: function preData(stream, result, parent) {
		      return (0, _uint.readBytes)(parent.text.blockSize)(stream);
		    }
		  }, subBlocksSchema]
		}, function (stream) {
		  var codes = (0, _uint.peekBytes)(2)(stream);
		  return codes[0] === 0x21 && codes[1] === 0x01;
		}); // application block

		var applicationSchema = (0, _.conditional)({
		  application: [{
		    codes: (0, _uint.readBytes)(2)
		  }, {
		    blockSize: (0, _uint.readByte)()
		  }, {
		    id: function id(stream, result, parent) {
		      return (0, _uint.readString)(parent.blockSize)(stream);
		    }
		  }, subBlocksSchema]
		}, function (stream) {
		  var codes = (0, _uint.peekBytes)(2)(stream);
		  return codes[0] === 0x21 && codes[1] === 0xff;
		}); // comment block

		var commentSchema = (0, _.conditional)({
		  comment: [{
		    codes: (0, _uint.readBytes)(2)
		  }, subBlocksSchema]
		}, function (stream) {
		  var codes = (0, _uint.peekBytes)(2)(stream);
		  return codes[0] === 0x21 && codes[1] === 0xfe;
		});
		var schema = [{
		  header: [{
		    signature: (0, _uint.readString)(3)
		  }, {
		    version: (0, _uint.readString)(3)
		  }]
		}, {
		  lsd: [{
		    width: (0, _uint.readUnsigned)(true)
		  }, {
		    height: (0, _uint.readUnsigned)(true)
		  }, {
		    gct: (0, _uint.readBits)({
		      exists: {
		        index: 0
		      },
		      resolution: {
		        index: 1,
		        length: 3
		      },
		      sort: {
		        index: 4
		      },
		      size: {
		        index: 5,
		        length: 3
		      }
		    })
		  }, {
		    backgroundColorIndex: (0, _uint.readByte)()
		  }, {
		    pixelAspectRatio: (0, _uint.readByte)()
		  }]
		}, (0, _.conditional)({
		  gct: (0, _uint.readArray)(3, function (stream, result) {
		    return Math.pow(2, result.lsd.gct.size + 1);
		  })
		}, function (stream, result) {
		  return result.lsd.gct.exists;
		}), // content frames
		{
		  frames: (0, _.loop)([gceSchema, applicationSchema, commentSchema, imageSchema, textSchema], function (stream) {
		    var nextCode = (0, _uint.peekByte)()(stream); // rather than check for a terminator, we should check for the existence
		    // of an ext or image block to avoid infinite loops
		    //var terminator = 0x3B;
		    //return nextCode !== terminator;

		    return nextCode === 0x21 || nextCode === 0x2c;
		  })
		}];
		var _default = schema;
		exports["default"] = _default; 
	} (gif$1));

	var gif = /*@__PURE__*/getDefaultExportFromCjs(gif$1);

	var deinterlace$1 = {};

	"use strict";

	Object.defineProperty(deinterlace$1, "__esModule", {
	  value: true
	});
	var deinterlace_2 = deinterlace$1.deinterlace = void 0;

	/**
	 * Deinterlace function from https://github.com/shachaf/jsgif
	 */
	var deinterlace = function deinterlace(pixels, width) {
	  var newPixels = new Array(pixels.length);
	  var rows = pixels.length / width;

	  var cpRow = function cpRow(toRow, fromRow) {
	    var fromPixels = pixels.slice(fromRow * width, (fromRow + 1) * width);
	    newPixels.splice.apply(newPixels, [toRow * width, width].concat(fromPixels));
	  }; // See appendix E.


	  var offsets = [0, 4, 2, 1];
	  var steps = [8, 8, 4, 2];
	  var fromRow = 0;

	  for (var pass = 0; pass < 4; pass++) {
	    for (var toRow = offsets[pass]; toRow < rows; toRow += steps[pass]) {
	      cpRow(toRow, fromRow);
	      fromRow++;
	    }
	  }

	  return newPixels;
	};

	deinterlace_2 = deinterlace$1.deinterlace = deinterlace;

	var lzw$1 = {};

	"use strict";

	Object.defineProperty(lzw$1, "__esModule", {
	  value: true
	});
	var lzw_2 = lzw$1.lzw = void 0;

	/**
	 * javascript port of java LZW decompression
	 * Original java author url: https://gist.github.com/devunwired/4479231
	 */
	var lzw = function lzw(minCodeSize, data, pixelCount) {
	  var MAX_STACK_SIZE = 4096;
	  var nullCode = -1;
	  var npix = pixelCount;
	  var available, clear, code_mask, code_size, end_of_information, in_code, old_code, bits, code, i, datum, data_size, first, top, bi, pi;
	  var dstPixels = new Array(pixelCount);
	  var prefix = new Array(MAX_STACK_SIZE);
	  var suffix = new Array(MAX_STACK_SIZE);
	  var pixelStack = new Array(MAX_STACK_SIZE + 1); // Initialize GIF data stream decoder.

	  data_size = minCodeSize;
	  clear = 1 << data_size;
	  end_of_information = clear + 1;
	  available = clear + 2;
	  old_code = nullCode;
	  code_size = data_size + 1;
	  code_mask = (1 << code_size) - 1;

	  for (code = 0; code < clear; code++) {
	    prefix[code] = 0;
	    suffix[code] = code;
	  } // Decode GIF pixel stream.


	  var datum, bits, count, first, top, pi, bi;
	  datum = bits = count = first = top = pi = bi = 0;

	  for (i = 0; i < npix;) {
	    if (top === 0) {
	      if (bits < code_size) {
	        // get the next byte
	        datum += data[bi] << bits;
	        bits += 8;
	        bi++;
	        continue;
	      } // Get the next code.


	      code = datum & code_mask;
	      datum >>= code_size;
	      bits -= code_size; // Interpret the code

	      if (code > available || code == end_of_information) {
	        break;
	      }

	      if (code == clear) {
	        // Reset decoder.
	        code_size = data_size + 1;
	        code_mask = (1 << code_size) - 1;
	        available = clear + 2;
	        old_code = nullCode;
	        continue;
	      }

	      if (old_code == nullCode) {
	        pixelStack[top++] = suffix[code];
	        old_code = code;
	        first = code;
	        continue;
	      }

	      in_code = code;

	      if (code == available) {
	        pixelStack[top++] = first;
	        code = old_code;
	      }

	      while (code > clear) {
	        pixelStack[top++] = suffix[code];
	        code = prefix[code];
	      }

	      first = suffix[code] & 0xff;
	      pixelStack[top++] = first; // add a new string to the table, but only if space is available
	      // if not, just continue with current table until a clear code is found
	      // (deferred clear code implementation as per GIF spec)

	      if (available < MAX_STACK_SIZE) {
	        prefix[available] = old_code;
	        suffix[available] = first;
	        available++;

	        if ((available & code_mask) === 0 && available < MAX_STACK_SIZE) {
	          code_size++;
	          code_mask += available;
	        }
	      }

	      old_code = in_code;
	    } // Pop a pixel off the pixel stack.


	    top--;
	    dstPixels[pi++] = pixelStack[top];
	    i++;
	  }

	  for (i = pi; i < npix; i++) {
	    dstPixels[i] = 0; // clear missing pixels
	  }

	  return dstPixels;
	};

	lzw_2 = lzw$1.lzw = lzw;

	"use strict";

	Object.defineProperty(lib$1, "__esModule", {
	  value: true
	});
	var decompressFrames_1 = lib$1.decompressFrames = decompressFrame_1 = lib$1.decompressFrame = parseGIF_1 = lib$1.parseGIF = void 0;

	var _gif = _interopRequireDefault(gif$1);

	var _jsBinarySchemaParser = lib;

	var _uint = uint8;

	var _deinterlace = deinterlace$1;

	var _lzw = lzw$1;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var parseGIF = function parseGIF(arrayBuffer) {
	  var byteData = new Uint8Array(arrayBuffer);
	  return (0, _jsBinarySchemaParser.parse)((0, _uint.buildStream)(byteData), _gif["default"]);
	};

	var parseGIF_1 = lib$1.parseGIF = parseGIF;

	var generatePatch = function generatePatch(image) {
	  var totalPixels = image.pixels.length;
	  var patchData = new Uint8ClampedArray(totalPixels * 4);

	  for (var i = 0; i < totalPixels; i++) {
	    var pos = i * 4;
	    var colorIndex = image.pixels[i];
	    var color = image.colorTable[colorIndex] || [0, 0, 0];
	    patchData[pos] = color[0];
	    patchData[pos + 1] = color[1];
	    patchData[pos + 2] = color[2];
	    patchData[pos + 3] = colorIndex !== image.transparentIndex ? 255 : 0;
	  }

	  return patchData;
	};

	var decompressFrame = function decompressFrame(frame, gct, buildImagePatch) {
	  if (!frame.image) {
	    console.warn('gif frame does not have associated image.');
	    return;
	  }

	  var image = frame.image; // get the number of pixels

	  var totalPixels = image.descriptor.width * image.descriptor.height; // do lzw decompression

	  var pixels = (0, _lzw.lzw)(image.data.minCodeSize, image.data.blocks, totalPixels); // deal with interlacing if necessary

	  if (image.descriptor.lct.interlaced) {
	    pixels = (0, _deinterlace.deinterlace)(pixels, image.descriptor.width);
	  }

	  var resultImage = {
	    pixels: pixels,
	    dims: {
	      top: frame.image.descriptor.top,
	      left: frame.image.descriptor.left,
	      width: frame.image.descriptor.width,
	      height: frame.image.descriptor.height
	    }
	  }; // color table

	  if (image.descriptor.lct && image.descriptor.lct.exists) {
	    resultImage.colorTable = image.lct;
	  } else {
	    resultImage.colorTable = gct;
	  } // add per frame relevant gce information


	  if (frame.gce) {
	    resultImage.delay = (frame.gce.delay || 10) * 10; // convert to ms

	    resultImage.disposalType = frame.gce.extras.disposal; // transparency

	    if (frame.gce.extras.transparentColorGiven) {
	      resultImage.transparentIndex = frame.gce.transparentColorIndex;
	    }
	  } // create canvas usable imagedata if desired


	  if (buildImagePatch) {
	    resultImage.patch = generatePatch(resultImage);
	  }

	  return resultImage;
	};

	var decompressFrame_1 = lib$1.decompressFrame = decompressFrame;

	var decompressFrames = function decompressFrames(parsedGif, buildImagePatches) {
	  return parsedGif.frames.filter(function (f) {
	    return f.image;
	  }).map(function (f) {
	    return decompressFrame(f, parsedGif.gct, buildImagePatches);
	  });
	};

	decompressFrames_1 = lib$1.decompressFrames = decompressFrames;

	"use strict";



	class GifSource {
	  /**
	   * @param frames - Array of GifFrame instances.
	   */
	  constructor(frames) {
	    if (!frames || !frames.length)
	      throw new Error("Invalid frames");
	    const [{ texture: { width, height } }] = frames;
	    this.width = width;
	    this.height = height;
	    this.frames = frames;
	    this.textures = this.frames.map((frame) => frame.texture);
	    this.totalFrames = this.frames.length;
	    this.duration = this.frames[this.totalFrames - 1].end;
	  }
	  /** Destroy animation data and don't use after this */
	  destroy() {
	    for (const texture of this.textures) {
	      texture.destroy(true);
	    }
	    for (const frame of this.frames) {
	      frame.texture = null;
	    }
	    this.frames.length = 0;
	    this.textures.length = 0;
	    Object.assign(this, {
	      frames: null,
	      textures: null,
	      width: 0,
	      height: 0,
	      duration: 0,
	      totalFrames: 0
	    });
	  }
	  /**
	   * Create an animated GIF animation from a GIF image's ArrayBuffer. The easiest way to get
	   * the buffer is to use Assets.
	   * @example
	   * import { GifSource, GifSprite } from 'pixi.js/gif';
	   *
	   * const buffer = await fetch('./file.gif').then(res => res.arrayBuffer());
	   * const source = GifSource.from(buffer);
	   * const sprite = new GifSprite(source);
	   * @param buffer - GIF image arraybuffer from Assets.
	   * @param options - Optional options to use when building from buffer.
	   */
	  static from(buffer, options) {
	    var _a;
	    if (!buffer || buffer.byteLength === 0) {
	      throw new Error("Invalid buffer");
	    }
	    const validateAndFix = (gif2) => {
	      var _a2;
	      let currentGce = null;
	      for (const frame of gif2.frames) {
	        currentGce = (_a2 = frame.gce) != null ? _a2 : currentGce;
	        if ("image" in frame && !("gce" in frame)) {
	          frame.gce = currentGce;
	        }
	      }
	    };
	    const gif = parseGIF_1(buffer);
	    validateAndFix(gif);
	    const gifFrames = decompressFrames_1(gif, true);
	    const frames = [];
	    const animWidth = gif.lsd.width;
	    const animHeight = gif.lsd.height;
	    const canvas = PIXI.DOMAdapter.get().createCanvas(animWidth, animHeight);
	    const context = canvas.getContext("2d", { willReadFrequently: true });
	    const patchCanvas = PIXI.DOMAdapter.get().createCanvas();
	    const patchContext = patchCanvas.getContext("2d");
	    let time = 0;
	    let previousFrame = null;
	    const defaultDelay = 1e3 / ((_a = options == null ? void 0 : options.fps) != null ? _a : 30);
	    for (let i = 0; i < gifFrames.length; i++) {
	      const {
	        disposalType = 2,
	        delay = defaultDelay,
	        patch,
	        dims: { width, height, left, top }
	      } = gifFrames[i];
	      patchCanvas.width = width;
	      patchCanvas.height = height;
	      patchContext.clearRect(0, 0, width, height);
	      const patchData = patchContext.createImageData(width, height);
	      patchData.data.set(patch);
	      patchContext.putImageData(patchData, 0, 0);
	      if (disposalType === 3) {
	        previousFrame = context.getImageData(0, 0, animWidth, animHeight);
	      }
	      context.drawImage(patchCanvas, left, top);
	      const imageData = context.getImageData(0, 0, animWidth, animHeight);
	      if (disposalType === 2) {
	        context.clearRect(0, 0, animWidth, animHeight);
	      } else if (disposalType === 3) {
	        context.putImageData(previousFrame, 0, 0);
	      }
	      const resource = PIXI.DOMAdapter.get().createCanvas(
	        imageData.width,
	        imageData.height
	      );
	      const resourceContext = resource.getContext("2d");
	      resourceContext.putImageData(imageData, 0, 0);
	      frames.push({
	        start: time,
	        end: time + delay,
	        texture: new PIXI.Texture({
	          source: new PIXI.CanvasSource({
	            resource
	          })
	        })
	      });
	      time += delay;
	    }
	    canvas.width = canvas.height = 0;
	    patchCanvas.width = patchCanvas.height = 0;
	    return new GifSource(frames);
	  }
	}

	"use strict";
	const GifAsset = {
	  extension: PIXI.ExtensionType.Asset,
	  detection: {
	    test: async () => true,
	    add: async (formats) => [...formats, "gif"],
	    remove: async (formats) => formats.filter((format) => format !== "gif")
	  },
	  loader: {
	    name: "gifLoader",
	    test: (url) => PIXI.path.extname(url) === ".gif" || url.startsWith("data:image/gif"),
	    load: async (url, asset) => {
	      const response = await PIXI.DOMAdapter.get().fetch(url);
	      const buffer = await response.arrayBuffer();
	      return GifSource.from(buffer, asset == null ? void 0 : asset.data);
	    },
	    unload: async (asset) => {
	      asset.destroy();
	    }
	  }
	};

	"use strict";
	var __defProp = Object.defineProperty;
	var __getOwnPropSymbols = Object.getOwnPropertySymbols;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __propIsEnum = Object.prototype.propertyIsEnumerable;
	var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
	var __spreadValues = (a, b) => {
	  for (var prop in b || (b = {}))
	    if (__hasOwnProp.call(b, prop))
	      __defNormalProp(a, prop, b[prop]);
	  if (__getOwnPropSymbols)
	    for (var prop of __getOwnPropSymbols(b)) {
	      if (__propIsEnum.call(b, prop))
	        __defNormalProp(a, prop, b[prop]);
	    }
	  return a;
	};
	var __objRest = (source, exclude) => {
	  var target = {};
	  for (var prop in source)
	    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
	      target[prop] = source[prop];
	  if (source != null && __getOwnPropSymbols)
	    for (var prop of __getOwnPropSymbols(source)) {
	      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
	        target[prop] = source[prop];
	    }
	  return target;
	};
	const _GifSprite = class _GifSprite extends PIXI.Sprite {
	  /** @ignore */
	  constructor(...args) {
	    const options = args[0] instanceof GifSource ? { source: args[0] } : args[0];
	    const _a = Object.assign(
	      {},
	      _GifSprite.defaultOptions,
	      options
	    ), {
	      scaleMode,
	      source,
	      fps,
	      loop,
	      animationSpeed,
	      autoPlay,
	      autoUpdate,
	      onComplete,
	      onFrameChange,
	      onLoop
	    } = _a, rest = __objRest(_a, [
	      "scaleMode",
	      "source",
	      "fps",
	      "loop",
	      "animationSpeed",
	      "autoPlay",
	      "autoUpdate",
	      "onComplete",
	      "onFrameChange",
	      "onLoop"
	    ]);
	    super(__spreadValues({ texture: PIXI.Texture.EMPTY }, rest));
	    /**
	     * The speed that the animation will play at. Higher is faster, lower is slower.
	     * @default 1
	     */
	    this.animationSpeed = 1;
	    /**
	     * Whether or not the animate sprite repeats after playing.
	     * @default true
	     */
	    this.loop = true;
	    /** The total duration of animation in milliseconds. */
	    this.duration = 0;
	    /** Whether to play the animation after constructing. */
	    this.autoPlay = true;
	    /** Dirty means the image needs to be redrawn. Set to `true` to force redraw. */
	    this.dirty = false;
	    /** The current frame number (zero-based index). */
	    this._currentFrame = 0;
	    /** `true` uses PIXI.Ticker.shared to auto update animation time.*/
	    this._autoUpdate = false;
	    /** `true` if the instance is currently connected to PIXI.Ticker.shared to auto update animation time. */
	    this._isConnectedToTicker = false;
	    /** If animation is currently playing. */
	    this._playing = false;
	    /** Current playback position in milliseconds. */
	    this._currentTime = 0;
	    this.onRender = () => this._updateFrame();
	    this.texture = source.textures[0];
	    this.duration = source.frames[source.frames.length - 1].end;
	    this._source = source;
	    this._playing = false;
	    this._currentTime = 0;
	    this._isConnectedToTicker = false;
	    Object.assign(this, {
	      fps,
	      loop,
	      animationSpeed,
	      autoPlay,
	      autoUpdate,
	      onComplete,
	      onFrameChange,
	      onLoop
	    });
	    this.currentFrame = 0;
	    if (autoPlay) {
	      this.play();
	    }
	  }
	  /** Stops the animation. */
	  stop() {
	    if (!this._playing) {
	      return;
	    }
	    this._playing = false;
	    if (this._autoUpdate && this._isConnectedToTicker) {
	      PIXI.Ticker.shared.remove(this.update, this);
	      this._isConnectedToTicker = false;
	    }
	  }
	  /** Plays the animation. */
	  play() {
	    if (this._playing) {
	      return;
	    }
	    this._playing = true;
	    if (this._autoUpdate && !this._isConnectedToTicker) {
	      PIXI.Ticker.shared.add(this.update, this, PIXI.UPDATE_PRIORITY.HIGH);
	      this._isConnectedToTicker = true;
	    }
	    if (!this.loop && this.currentFrame === this._source.frames.length - 1) {
	      this._currentTime = 0;
	    }
	  }
	  /**
	   * Get the current progress of the animation from 0 to 1.
	   * @readonly
	   */
	  get progress() {
	    return this._currentTime / this.duration;
	  }
	  /** `true` if the current animation is playing */
	  get playing() {
	    return this._playing;
	  }
	  /**
	   * Updates the object transform for rendering. You only need to call this
	   * if the `autoUpdate` property is set to `false`.
	   * @param ticker - Ticker instance
	   */
	  update(ticker) {
	    var _a, _b;
	    if (!this._playing) {
	      return;
	    }
	    const elapsed = this.animationSpeed * ticker.deltaTime / PIXI.Ticker.targetFPMS;
	    const currentTime = this._currentTime + elapsed;
	    const localTime = currentTime % this.duration;
	    const localFrame = this._source.frames.findIndex((frame) => frame.start <= localTime && frame.end > localTime);
	    if (currentTime >= this.duration) {
	      if (this.loop) {
	        this._currentTime = localTime;
	        this._updateFrameIndex(localFrame);
	        (_a = this.onLoop) == null ? void 0 : _a.call(this);
	      } else {
	        this._currentTime = this.duration;
	        this._updateFrameIndex(this.totalFrames - 1);
	        (_b = this.onComplete) == null ? void 0 : _b.call(this);
	        this.stop();
	      }
	    } else {
	      this._currentTime = localTime;
	      this._updateFrameIndex(localFrame);
	    }
	  }
	  /** Redraw the current frame, is necessary for the animation to work when */
	  _updateFrame() {
	    if (!this.dirty) {
	      return;
	    }
	    this.texture = this._source.frames[this._currentFrame].texture;
	    this.dirty = false;
	  }
	  /**
	   * Whether to use PIXI.Ticker.shared to auto update animation time.
	   * @default true
	   */
	  get autoUpdate() {
	    return this._autoUpdate;
	  }
	  set autoUpdate(value) {
	    if (value !== this._autoUpdate) {
	      this._autoUpdate = value;
	      if (!this._autoUpdate && this._isConnectedToTicker) {
	        PIXI.Ticker.shared.remove(this.update, this);
	        this._isConnectedToTicker = false;
	      } else if (this._autoUpdate && !this._isConnectedToTicker && this._playing) {
	        PIXI.Ticker.shared.add(this.update, this);
	        this._isConnectedToTicker = true;
	      }
	    }
	  }
	  /** Set the current frame number */
	  get currentFrame() {
	    return this._currentFrame;
	  }
	  set currentFrame(value) {
	    this._updateFrameIndex(value);
	    this._currentTime = this._source.frames[value].start;
	  }
	  /** Instance of the data, contains frame textures */
	  get source() {
	    return this._source;
	  }
	  /**
	   * Internally handle updating the frame index
	   * @param value
	   */
	  _updateFrameIndex(value) {
	    var _a;
	    if (value < 0 || value >= this.totalFrames) {
	      throw new Error(`Frame index out of range, expecting 0 to ${this.totalFrames}, got ${value}`);
	    }
	    if (this._currentFrame !== value) {
	      this._currentFrame = value;
	      this.dirty = true;
	      (_a = this.onFrameChange) == null ? void 0 : _a.call(this, value);
	    }
	  }
	  /** Get the total number of frame in the GIF. */
	  get totalFrames() {
	    return this._source.totalFrames;
	  }
	  /**
	   * Destroy and don't use after this.
	   * @param destroyData - Destroy the data, cannot be used again.
	   */
	  destroy(destroyData = false) {
	    this.stop();
	    super.destroy();
	    if (destroyData) {
	      this._source.destroy();
	    }
	    const forceClear = null;
	    this._source = forceClear;
	    this.onComplete = forceClear;
	    this.onFrameChange = forceClear;
	    this.onLoop = forceClear;
	  }
	  /**
	   * Cloning the animation is a useful way to create a duplicate animation.
	   * This maintains all the properties of the original animation but allows
	   * you to control playback independent of the original animation.
	   * If you want to create a simple copy, and not control independently,
	   * then you can simply create a new Sprite, e.g. `const sprite = new Sprite(animation.texture)`.
	   *
	   * The clone will be flagged as `dirty` to immediatly trigger an update
	   */
	  clone() {
	    const clone = new _GifSprite({
	      source: this._source,
	      autoUpdate: this._autoUpdate,
	      loop: this.loop,
	      autoPlay: this.autoPlay,
	      scaleMode: this.texture.source.scaleMode,
	      animationSpeed: this.animationSpeed,
	      onComplete: this.onComplete,
	      onFrameChange: this.onFrameChange,
	      onLoop: this.onLoop
	    });
	    clone.dirty = true;
	    return clone;
	  }
	};
	/**
	 * Default options for all GifSprite objects.
	 * @property {PIXI.SCALE_MODE} [scaleMode='linear'] - Scale mode to use for the texture.
	 * @property {boolean} [loop=true] - To enable looping.
	 * @property {number} [animationSpeed=1] - Speed of the animation.
	 * @property {boolean} [autoUpdate=true] - Set to `false` to manage updates yourself.
	 * @property {boolean} [autoPlay=true] - To start playing right away.
	 * @property {Function} [onComplete=null] - The completed callback, optional.
	 * @property {Function} [onLoop=null] - The loop callback, optional.
	 * @property {Function} [onFrameChange=null] - The frame callback, optional.
	 * @property {number} [fps=30] - Fallback FPS if GIF contains no time information.
	 */
	_GifSprite.defaultOptions = {
	  scaleMode: "linear",
	  fps: 30,
	  loop: true,
	  animationSpeed: 1,
	  autoPlay: true,
	  autoUpdate: true,
	  onComplete: null,
	  onFrameChange: null,
	  onLoop: null
	};
	let GifSprite = _GifSprite;

	"use strict";

	"use strict";
	PIXI.extensions.add(GifAsset);

	"use strict";

	exports.GifAsset = GifAsset;
	exports.GifSource = GifSource;
	exports.GifSprite = GifSprite;

	return exports;

})({});
Object.assign(this.PIXI, gif_js);
//# sourceMappingURL=gif.js.map
