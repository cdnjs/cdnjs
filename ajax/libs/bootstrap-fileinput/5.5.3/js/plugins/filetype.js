/*!
 * Library to detect file mime type of a Uint8Array.
 *
 * Modified from https://github.com/sindresorhus/file-type to be used standalone on browser based apps.
 *
 * This library requires Node "buffer" module as a pre-requisite. The "buffer" module is made available in this repo
 * for standalone use via the `buffer.js` script which needs to be loaded before this file on the page.
 *
 * Author: Kartik Visweswaran, Krajee.com
 */
"use strict";

// ES5 POLYFILL HELPERS FOR ES6
function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally {
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally {
            if (_d) throw _e;
        }
    }
    return _arr;
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F, n: function n() {
                    if (i >= o.length) return {done: true};
                    return {done: false, value: o[i++]};
                }, e: function e(_e2) {
                    throw _e2;
                }, f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = it.call(o);
        }, n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        }, e: function e(_e3) {
            didErr = true;
            err = _e3;
        }, f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally {
                if (didErr) throw err;
            }
        }
    };
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
    }
    return arr2;
}

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {writable: false});
    return Constructor;
}

function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    Object.defineProperty(subClass, "prototype", {writable: false});
    if (superClass) _setPrototypeOf(subClass, superClass);
}

function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else {
            result = Super.apply(this, arguments);
        }
        return _possibleConstructorReturn(this, result);
    };
}

function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}

function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunction(Class)) return Class;
        if (typeof Class !== "function") {
            throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }

        function Wrapper() {
            return _construct(Class, arguments, _getPrototypeOf(this).constructor);
        }

        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return _setPrototypeOf(Wrapper, Class);
    };
    return _wrapNativeSuper(Class);
}

function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
        _construct = Reflect.construct.bind();
    } else {
        _construct = function _construct(Parent, args, Class) {
            var a = [null];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _setPrototypeOf(instance, Class.prototype);
            return instance;
        };
    }
    return _construct.apply(null, arguments);
}

function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
        }));
        return true;
    } catch (e) {
        return false;
    }
}

function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}

// MAIN LIBRARY CODE
var KrajeeFileTypeConfig = {
    minimumBytes: 4100,
    // A fair amount of file-types are detectable within this range,
    defaultMessages: 'End-Of-Stream',
    tarHeaderChecksumMatches: function tarHeaderChecksumMatches(buffer) {
        var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var readSum = Number.parseInt(buffer.toString('utf8', 148, 154).replace(/\0.*$/, '').trim(), 8); // Read sum in header
        if (Number.isNaN(readSum)) {
            return false;
        }
        var sum = 8 * 0x20; // Initialize signed bit sum

        for (var i = offset; i < offset + 148; i++) {
            sum += buffer[i];
        }
        for (var _i = offset + 156; _i < offset + 512; _i++) {
            sum += buffer[_i];
        }
        return readSum === sum;
    },
    uint32SyncSafeToken: {
        get: function get(buffer, offset) {
            return buffer[offset + 3] & 0x7F | buffer[offset + 2] << 7 | buffer[offset + 1] << 14 | buffer[offset] << 21;
        },
        len: 4
    },
    dv: function dv(array) {
        return new DataView(array.buffer, array.byteOffset);
    },
    Token: {
        /**
         * 8-bit unsigned integer
         */
        UINT8: {
            len: 1,
            get: function get(array, offset) {
                return KrajeeFileTypeConfig.dv(array).getUint8(offset);
            },
            put: function put(array, offset, value) {
                KrajeeFileTypeConfig.dv(array).setUint8(offset, value);
                return offset + 1;
            }
        },
        /**
         * 16-bit unsigned integer, Little Endian byte order
         */
        UINT16_LE: {
            len: 2,
            get: function get(array, offset) {
                return KrajeeFileTypeConfig.dv(array).getUint16(offset, true);
            },
            put: function put(array, offset, value) {
                KrajeeFileTypeConfig.dv(array).setUint16(offset, value, true);
                return offset + 2;
            }
        },
        /**
         * 16-bit unsigned integer, Big Endian byte order
         */
        UINT16_BE: {
            len: 2,
            get: function get(array, offset) {
                return KrajeeFileTypeConfig.dv(array).getUint16(offset);
            },
            put: function put(array, offset, value) {
                KrajeeFileTypeConfig.dv(array).setUint16(offset, value);
                return offset + 2;
            }
        },
        /**
         * 32-bit unsigned integer, Big Endian byte order
         */
        INT32_BE: {
            len: 4,
            get: function get(array, offset) {
                return KrajeeFileTypeConfig.dv(array).getInt32(offset);
            },
            put: function put(array, offset, value) {
                KrajeeFileTypeConfig.dv(array).setInt32(offset, value);
                return offset + 4;
            }
        },
        /**
         * 32-bit unsigned integer, Little Endian byte order
         */
        UINT32_LE: {
            len: 4,
            get: function get(array, offset) {
                return KrajeeFileTypeConfig.dv(array).getUint32(offset, true);
            },
            put: function put(array, offset, value) {
                KrajeeFileTypeConfig.dv(array).setUint32(offset, value, true);
                return offset + 4;
            }
        },
        /**
         * 32-bit unsigned integer, Big Endian byte order
         */
        UINT32_BE: {
            len: 4,
            get: function get(array, offset) {
                return KrajeeFileTypeConfig.dv(array).getUint32(offset);
            },
            put: function put(array, offset, value) {
                KrajeeFileTypeConfig.dv(array).setUint32(offset, value);
                return offset + 4;
            }
        },
        /**
         * 64-bit unsigned integer, Little Endian byte order
         */
        UINT64_LE: {
            len: 8,
            get: function get(array, offset) {
                return KrajeeFileTypeConfig.dv(array).getBigUint64(offset, true);
            },
            put: function put(array, offset, value) {
                KrajeeFileTypeConfig.dv(array).setBigUint64(offset, value, true);
                return offset + 8;
            }
        },
        /**
         * 64-bit unsigned integer, Big Endian byte order
         */
        UINT64_BE: {
            len: 8,
            get: function get(array, offset) {
                return KrajeeFileTypeConfig.dv(array).getBigUint64(offset);
            },
            put: function put(array, offset, value) {
                KrajeeFileTypeConfig.dv(array).setBigUint64(offset, value);
                return offset + 8;
            }
        }
    }
};
var EndOfStreamError = /*#__PURE__*/function (_Error) {
    _inherits(EndOfStreamError, _Error);
    var _super = _createSuper(EndOfStreamError);

    function EndOfStreamError() {
        _classCallCheck(this, EndOfStreamError);
        return _super.call(this, KrajeeFileTypeConfig.defaultMessages);
    }

    return _createClass(EndOfStreamError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
var StringType = /*#__PURE__*/function () {
    function StringType(len, encoding) {
        _classCallCheck(this, StringType);
        this.len = len;
        this.encoding = encoding;
    }

    _createClass(StringType, [{
        key: "get",
        value: function get(uint8Array, offset) {
            return Buffer.from(uint8Array).toString(this.encoding, offset, offset + this.len);
        }
    }]);
    return StringType;
}();

async function fileTypeFromTokenizer(tokenizer) {
    try {
        return new FileTypeParser().parse(tokenizer);
    } catch (error) {
        if (!_instanceof(error, EndOfStreamError)) {
            throw error;
        }
    }
}

var BufferTokenizer = /*#__PURE__*/function () {
    /**
     * Construct BufferTokenizer
     * @param uint8Array - Uint8Array to tokenize
     * @param fileInfo - Pass additional file information to the tokenizer
     */
    function BufferTokenizer(uint8Array, fileInfo) {
        _classCallCheck(this, BufferTokenizer);
        /**
         * Tokenizer-stream position
         */
        this.position = 0;
        this.numBuffer = new Uint8Array(8);
        this.fileInfo = fileInfo ? fileInfo : {};
        this.uint8Array = uint8Array;
        this.fileInfo.size = this.fileInfo.size ? this.fileInfo.size : uint8Array.length;
    }

    /**
     * Read a token from the tokenizer-stream
     * @param token - The token to read
     * @param position - If provided, the desired position in the tokenizer-stream
     * @returns Promise with token data
     */
    _createClass(BufferTokenizer, [{
        key: "readToken",
        value: async function readToken(token) {
            var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.position;
            var uint8Array = Buffer.alloc(token.len);
            var len = await this.readBuffer(uint8Array, {
                position: position
            });
            if (len < token.len) throw new EndOfStreamError();
            return token.get(uint8Array, 0);
        }

        /**
         * Peek a token from the tokenizer-stream.
         * @param token - Token to peek from the tokenizer-stream.
         * @param position - Offset where to begin reading within the file. If position is null, data will be read from the current file position.
         * @returns Promise with token data
         */
    }, {
        key: "peekToken",
        value: async function peekToken(token) {
            var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.position;
            var uint8Array = Buffer.alloc(token.len);
            var len = await this.peekBuffer(uint8Array, {
                position: position
            });
            if (len < token.len) throw new EndOfStreamError();
            return token.get(uint8Array, 0);
        }

        /**
         * Read buffer from tokenizer
         * @param uint8Array - Uint8Array to tokenize
         * @param options - Read behaviour options
         * @returns {Promise<number>}
         */
    }, {
        key: "readBuffer",
        value: async function readBuffer(uint8Array, options) {
            if (options && options.position) {
                if (options.position < this.position) {
                    throw new Error('`options.position` must be equal or greater than `tokenizer.position`');
                }
                this.position = options.position;
            }
            var bytesRead = await this.peekBuffer(uint8Array, options);
            this.position += bytesRead;
            return bytesRead;
        }

        /**
         * Peek (read ahead) buffer from tokenizer
         * @param uint8Array
         * @param options - Read behaviour options
         * @returns {Promise<number>}
         */
    }, {
        key: "peekBuffer",
        value: async function peekBuffer(uint8Array, options) {
            var normOptions = this.normalizeOptions(uint8Array, options);
            var bytes2read = Math.min(this.uint8Array.length - normOptions.position, normOptions.length);
            if (!normOptions.mayBeLess && bytes2read < normOptions.length) {
                throw new EndOfStreamError();
            } else {
                uint8Array.set(this.uint8Array.subarray(normOptions.position, normOptions.position + bytes2read), normOptions.offset);
                return bytes2read;
            }
        }

        /**
         * Read a numeric token from the stream
         * @param token - Numeric token
         * @returns Promise with number
         */
    }, {
        key: "readNumber",
        value: async function readNumber(token) {
            var len = await this.readBuffer(this.numBuffer, {
                length: token.len
            });
            if (len < token.len) throw new EndOfStreamError();
            return token.get(this.numBuffer, 0);
        }

        /**
         * Read a numeric token from the stream
         * @param token - Numeric token
         * @returns Promise with number
         */
    }, {
        key: "peekNumber",
        value: async function peekNumber(token) {
            var len = await this.peekBuffer(this.numBuffer, {
                length: token.len
            });
            if (len < token.len) throw new EndOfStreamError();
            return token.get(this.numBuffer, 0);
        }
    }, {
        key: "close",
        value: async function close() {
            // empty
        }

        /**
         *  Ignore number of bytes, advances the pointer in under tokenizer-stream.
         * @param length - Number of bytes to ignore
         * @return resolves the number of bytes ignored, equals length if this available, otherwise the number of bytes available
         */
    }, {
        key: "ignore",
        value: async function ignore(length) {
            if (this.fileInfo.size !== undefined) {
                var bytesLeft = this.fileInfo.size - this.position;
                if (length > bytesLeft) {
                    this.position += bytesLeft;
                    return bytesLeft;
                }
            }
            this.position += length;
            return length;
        }
    }, {
        key: "normalizeOptions",
        value: function normalizeOptions(uint8Array, options) {
            if (options && options.position !== undefined && options.position < this.position) {
                throw new Error('`options.position` must be equal or greater than `tokenizer.position`');
            }
            if (options) {
                return {
                    mayBeLess: options.mayBeLess === true,
                    offset: options.offset ? options.offset : 0,
                    length: options.length ? options.length : uint8Array.length - (options.offset ? options.offset : 0),
                    position: options.position ? options.position : this.position
                };
            }
            return {
                mayBeLess: false,
                offset: 0,
                length: uint8Array.length,
                position: this.position
            };
        }
    }]);
    return BufferTokenizer;
}();
var FileTypeParser = /*#__PURE__*/function () {
    function FileTypeParser() {
        _classCallCheck(this, FileTypeParser);
    }

    _createClass(FileTypeParser, [{
        key: "_check",
        value: function _check(buffer, headers, options) {
            options = {
                offset: 0,
                ...options
            };
            var _iterator = _createForOfIteratorHelper(headers.entries()),
                _step;
            try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var _step$value = _slicedToArray(_step.value, 2),
                        index = _step$value[0],
                        header = _step$value[1];
                    // If a bitmask is set
                    if (options.mask) {
                        // If header doesn't equal `buf` with bits masked off
                        if (header !== (options.mask[index] & buffer[index + options.offset])) {
                            return false;
                        }
                    } else if (header !== buffer[index + options.offset]) {
                        return false;
                    }
                }
            } catch (err) {
                _iterator.e(err);
            } finally {
                _iterator.f();
            }
            return true;
        }
    }, {
        key: "check",
        value: function check(header, options) {
            return this._check(this.buffer, header, options);
        }
    }, {
        key: "stringToBytes",
        value: function stringToBytes(string) {
            return _toConsumableArray(string).map(function (character) {
                return character.charCodeAt(0);
            });
        }
    }, {
        key: "checkString",
        value: function checkString(header, options) {
            return this.check(this.stringToBytes(header), options);
        }
    }, {
        key: "parse",
        value: async function parse(input) {
            if (!(_instanceof(input, Uint8Array) || _instanceof(input, ArrayBuffer) || _instanceof(input, BufferTokenizer))) {
                throw new TypeError("Expected the `input` argument to be of type `Uint8Array` or `Buffer` or `ArrayBuffer`, got `".concat(_typeof(input), "`"));
            }
            var tokenizer = input;
            if (!_instanceof(tokenizer, BufferTokenizer)) {
                var buffer = _instanceof(input, Uint8Array) ? input : new Uint8Array(input);
                if (!(buffer && buffer.length > 1)) {
                    return;
                }
                tokenizer = new BufferTokenizer(buffer);
            }
            try {
                return this.parseTokenizer(tokenizer);
            } catch (error) {
                if (!_instanceof(error, EndOfStreamError)) {
                    throw error;
                }
            }
        }
    }, {
        key: "parseTokenizer",
        value: async function parseTokenizer(tokenizer) {
            var Token = KrajeeFileTypeConfig.Token;
            this.buffer = Buffer.alloc(KrajeeFileTypeConfig.minimumBytes);
            // Keep reading until EOF if the file size is unknown.
            if (tokenizer.fileInfo.size === undefined) {
                tokenizer.fileInfo.size = Number.MAX_SAFE_INTEGER;
            }
            this.tokenizer = tokenizer;
            await tokenizer.peekBuffer(this.buffer, {
                length: 12,
                mayBeLess: true
            });

            // -- 2-byte signatures --

            if (this.check([0x42, 0x4D])) {
                return {
                    ext: 'bmp',
                    mime: 'image/bmp'
                };
            }
            if (this.check([0x0B, 0x77])) {
                return {
                    ext: 'ac3',
                    mime: 'audio/vnd.dolby.dd-raw'
                };
            }
            if (this.check([0x78, 0x01])) {
                return {
                    ext: 'dmg',
                    mime: 'application/x-apple-diskimage'
                };
            }
            if (this.check([0x4D, 0x5A])) {
                return {
                    ext: 'exe',
                    mime: 'application/x-msdownload'
                };
            }
            if (this.check([0x25, 0x21])) {
                await tokenizer.peekBuffer(this.buffer, {
                    length: 24,
                    mayBeLess: true
                });
                if (this.checkString('PS-Adobe-', {
                    offset: 2
                }) && this.checkString(' EPSF-', {
                    offset: 14
                })) {
                    return {
                        ext: 'eps',
                        mime: 'application/eps'
                    };
                }
                return {
                    ext: 'ps',
                    mime: 'application/postscript'
                };
            }
            if (this.check([0x1F, 0xA0]) || this.check([0x1F, 0x9D])) {
                return {
                    ext: 'Z',
                    mime: 'application/x-compress'
                };
            }

            // -- 3-byte signatures --
            if (this.check([0x47, 0x49, 0x46])) {
                return {
                    ext: 'gif',
                    mime: 'image/gif'
                };
            }
            if (this.check([0xFF, 0xD8, 0xFF])) {
                return {
                    ext: 'jpg',
                    mime: 'image/jpeg'
                };
            }
            if (this.check([0x49, 0x49, 0xBC])) {
                return {
                    ext: 'jxr',
                    mime: 'image/vnd.ms-photo'
                };
            }
            if (this.check([0x1F, 0x8B, 0x8])) {
                return {
                    ext: 'gz',
                    mime: 'application/gzip'
                };
            }
            if (this.check([0x42, 0x5A, 0x68])) {
                return {
                    ext: 'bz2',
                    mime: 'application/x-bzip2'
                };
            }
            if (this.checkString('ID3')) {
                await tokenizer.ignore(6); // Skip ID3 header until the header size
                var id3HeaderLength = await tokenizer.readToken(KrajeeFileTypeConfig.uint32SyncSafeToken);
                if (tokenizer.position + id3HeaderLength > tokenizer.fileInfo.size) {
                    // Guess file type based on ID3 header for backward compatibility
                    return {
                        ext: 'mp3',
                        mime: 'audio/mpeg'
                    };
                }
                await tokenizer.ignore(id3HeaderLength);
                return fileTypeFromTokenizer(tokenizer); // Skip ID3 header, recursion
            }

            // Musepack, SV7
            if (this.checkString('MP+')) {
                return {
                    ext: 'mpc',
                    mime: 'audio/x-musepack'
                };
            }
            if ((this.buffer[0] === 0x43 || this.buffer[0] === 0x46) && this.check([0x57, 0x53], {
                offset: 1
            })) {
                return {
                    ext: 'swf',
                    mime: 'application/x-shockwave-flash'
                };
            }

            // -- 4-byte signatures --

            if (this.checkString('FLIF')) {
                return {
                    ext: 'flif',
                    mime: 'image/flif'
                };
            }
            if (this.checkString('8BPS')) {
                return {
                    ext: 'psd',
                    mime: 'image/vnd.adobe.photoshop'
                };
            }
            if (this.checkString('WEBP', {
                offset: 8
            })) {
                return {
                    ext: 'webp',
                    mime: 'image/webp'
                };
            }

            // Musepack, SV8
            if (this.checkString('MPCK')) {
                return {
                    ext: 'mpc',
                    mime: 'audio/x-musepack'
                };
            }
            if (this.checkString('FORM')) {
                return {
                    ext: 'aif',
                    mime: 'audio/aiff'
                };
            }
            if (this.checkString('icns', {
                offset: 0
            })) {
                return {
                    ext: 'icns',
                    mime: 'image/icns'
                };
            }

            // Zip-based file formats
            // Need to be before the `zip` check
            if (this.check([0x50, 0x4B, 0x3, 0x4])) {
                // Local file header signature
                try {
                    while (tokenizer.position + 30 < tokenizer.fileInfo.size) {
                        await tokenizer.readBuffer(this.buffer, {
                            length: 30
                        });

                        // https://en.wikipedia.org/wiki/Zip_(file_format)#File_headers
                        var zipHeader = {
                            compressedSize: this.buffer.readUInt32LE(18),
                            uncompressedSize: this.buffer.readUInt32LE(22),
                            filenameLength: this.buffer.readUInt16LE(26),
                            extraFieldLength: this.buffer.readUInt16LE(28)
                        };
                        zipHeader.filename = await tokenizer.readToken(new StringType(zipHeader.filenameLength, 'utf-8'));
                        await tokenizer.ignore(zipHeader.extraFieldLength);

                        // Assumes signed `.xpi` from addons.mozilla.org
                        if (zipHeader.filename === 'META-INF/mozilla.rsa') {
                            return {
                                ext: 'xpi',
                                mime: 'application/x-xpinstall'
                            };
                        }
                        if (zipHeader.filename.endsWith('.rels') || zipHeader.filename.endsWith('.xml')) {
                            var type = zipHeader.filename.split('/')[0];
                            switch (type) {
                                case '_rels':
                                    break;
                                case 'word':
                                    return {
                                        ext: 'docx',
                                        mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                                    };
                                case 'ppt':
                                    return {
                                        ext: 'pptx',
                                        mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
                                    };
                                case 'xl':
                                    return {
                                        ext: 'xlsx',
                                        mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                                    };
                                default:
                                    break;
                            }
                        }
                        if (zipHeader.filename.startsWith('xl/')) {
                            return {
                                ext: 'xlsx',
                                mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                            };
                        }
                        if (zipHeader.filename.startsWith('3D/') && zipHeader.filename.endsWith('.model')) {
                            return {
                                ext: '3mf',
                                mime: 'model/3mf'
                            };
                        }

                        // The docx, xlsx and pptx file types extend the Office Open XML file format:
                        // https://en.wikipedia.org/wiki/Office_Open_XML_file_formats
                        // We look for:
                        // - one entry named '[Content_Types].xml' or '_rels/.rels',
                        // - one entry indicating specific type of file.
                        // MS Office, OpenOffice and LibreOffice may put the parts in different order, so the check should not rely on it.
                        if (zipHeader.filename === 'mimetype' && zipHeader.compressedSize === zipHeader.uncompressedSize) {
                            var mimeType = (await tokenizer.readToken(new StringType(zipHeader.compressedSize, 'utf-8'))).trim();
                            switch (mimeType) {
                                case 'application/epub+zip':
                                    return {
                                        ext: 'epub',
                                        mime: 'application/epub+zip'
                                    };
                                case 'application/vnd.oasis.opendocument.text':
                                    return {
                                        ext: 'odt',
                                        mime: 'application/vnd.oasis.opendocument.text'
                                    };
                                case 'application/vnd.oasis.opendocument.spreadsheet':
                                    return {
                                        ext: 'ods',
                                        mime: 'application/vnd.oasis.opendocument.spreadsheet'
                                    };
                                case 'application/vnd.oasis.opendocument.presentation':
                                    return {
                                        ext: 'odp',
                                        mime: 'application/vnd.oasis.opendocument.presentation'
                                    };
                                default:
                            }
                        }

                        // Try to find next header manually when current one is corrupted
                        if (zipHeader.compressedSize === 0) {
                            var nextHeaderIndex = -1;
                            while (nextHeaderIndex < 0 && tokenizer.position < tokenizer.fileInfo.size) {
                                await tokenizer.peekBuffer(this.buffer, {
                                    mayBeLess: true
                                });
                                nextHeaderIndex = this.buffer.indexOf('504B0304', 0, 'hex');
                                // Move position to the next header if found, skip the whole buffer otherwise
                                await tokenizer.ignore(nextHeaderIndex >= 0 ? nextHeaderIndex : this.buffer.length);
                            }
                        } else {
                            await tokenizer.ignore(zipHeader.compressedSize);
                        }
                    }
                } catch (error) {
                    if (!_instanceof(error, EndOfStreamError)) {
                        throw error;
                    }
                }
                return {
                    ext: 'zip',
                    mime: 'application/zip'
                };
            }
            if (this.checkString('OggS')) {
                // This is an OGG container
                await tokenizer.ignore(28);
                var _type = Buffer.alloc(8);
                await tokenizer.readBuffer(_type);

                // Needs to be before `ogg` check
                if (this._check(_type, [0x4F, 0x70, 0x75, 0x73, 0x48, 0x65, 0x61, 0x64])) {
                    return {
                        ext: 'opus',
                        mime: 'audio/opus'
                    };
                }

                // If ' theora' in header.
                if (this._check(_type, [0x80, 0x74, 0x68, 0x65, 0x6F, 0x72, 0x61])) {
                    return {
                        ext: 'ogv',
                        mime: 'video/ogg'
                    };
                }

                // If '\x01video' in header.
                if (this._check(_type, [0x01, 0x76, 0x69, 0x64, 0x65, 0x6F, 0x00])) {
                    return {
                        ext: 'ogm',
                        mime: 'video/ogg'
                    };
                }

                // If ' FLAC' in header  https://xiph.org/flac/faq.html
                if (this._check(_type, [0x7F, 0x46, 0x4C, 0x41, 0x43])) {
                    return {
                        ext: 'oga',
                        mime: 'audio/ogg'
                    };
                }

                // 'Speex  ' in header https://en.wikipedia.org/wiki/Speex
                if (this._check(_type, [0x53, 0x70, 0x65, 0x65, 0x78, 0x20, 0x20])) {
                    return {
                        ext: 'spx',
                        mime: 'audio/ogg'
                    };
                }

                // If '\x01vorbis' in header
                if (this._check(_type, [0x01, 0x76, 0x6F, 0x72, 0x62, 0x69, 0x73])) {
                    return {
                        ext: 'ogg',
                        mime: 'audio/ogg'
                    };
                }

                // Default OGG container https://www.iana.org/assignments/media-types/application/ogg
                return {
                    ext: 'ogx',
                    mime: 'application/ogg'
                };
            }
            if (this.check([0x50, 0x4B]) && (this.buffer[2] === 0x3 || this.buffer[2] === 0x5 || this.buffer[2] === 0x7) && (this.buffer[3] === 0x4 || this.buffer[3] === 0x6 || this.buffer[3] === 0x8)) {
                return {
                    ext: 'zip',
                    mime: 'application/zip'
                };
            }

            //

            // File Type Box (https://en.wikipedia.org/wiki/ISO_base_media_file_format)
            // It's not required to be first, but it's recommended to be. Almost all ISO base media files start with `ftyp` box.
            // `ftyp` box must contain a brand major identifier, which must consist of ISO 8859-1 printable characters.
            // Here we check for 8859-1 printable characters (for simplicity, it's a mask which also catches one non-printable character).
            if (this.checkString('ftyp', {
                offset: 4
            }) && (this.buffer[8] & 0x60) !== 0x00 // Brand major, first character ASCII?
            ) {
                // They all can have MIME `video/mp4` except `application/mp4` special-case which is hard to detect.
                // For some cases, we're specific, everything else falls to `video/mp4` with `mp4` extension.
                var brandMajor = this.buffer.toString('binary', 8, 12).replace('\0', ' ').trim();
                switch (brandMajor) {
                    case 'avif':
                    case 'avis':
                        return {
                            ext: 'avif',
                            mime: 'image/avif'
                        };
                    case 'mif1':
                        return {
                            ext: 'heic',
                            mime: 'image/heif'
                        };
                    case 'msf1':
                        return {
                            ext: 'heic',
                            mime: 'image/heif-sequence'
                        };
                    case 'heic':
                    case 'heix':
                        return {
                            ext: 'heic',
                            mime: 'image/heic'
                        };
                    case 'hevc':
                    case 'hevx':
                        return {
                            ext: 'heic',
                            mime: 'image/heic-sequence'
                        };
                    case 'qt':
                        return {
                            ext: 'mov',
                            mime: 'video/quicktime'
                        };
                    case 'M4V':
                    case 'M4VH':
                    case 'M4VP':
                        return {
                            ext: 'm4v',
                            mime: 'video/x-m4v'
                        };
                    case 'M4P':
                        return {
                            ext: 'm4p',
                            mime: 'video/mp4'
                        };
                    case 'M4B':
                        return {
                            ext: 'm4b',
                            mime: 'audio/mp4'
                        };
                    case 'M4A':
                        return {
                            ext: 'm4a',
                            mime: 'audio/x-m4a'
                        };
                    case 'F4V':
                        return {
                            ext: 'f4v',
                            mime: 'video/mp4'
                        };
                    case 'F4P':
                        return {
                            ext: 'f4p',
                            mime: 'video/mp4'
                        };
                    case 'F4A':
                        return {
                            ext: 'f4a',
                            mime: 'audio/mp4'
                        };
                    case 'F4B':
                        return {
                            ext: 'f4b',
                            mime: 'audio/mp4'
                        };
                    case 'crx':
                        return {
                            ext: 'cr3',
                            mime: 'image/x-canon-cr3'
                        };
                    default:
                        if (brandMajor.startsWith('3g')) {
                            if (brandMajor.startsWith('3g2')) {
                                return {
                                    ext: '3g2',
                                    mime: 'video/3gpp2'
                                };
                            }
                            return {
                                ext: '3gp',
                                mime: 'video/3gpp'
                            };
                        }
                        return {
                            ext: 'mp4',
                            mime: 'video/mp4'
                        };
                }
            }
            if (this.checkString('MThd')) {
                return {
                    ext: 'mid',
                    mime: 'audio/midi'
                };
            }
            if (this.checkString('wOFF') && (this.check([0x00, 0x01, 0x00, 0x00], {
                offset: 4
            }) || this.checkString('OTTO', {
                offset: 4
            }))) {
                return {
                    ext: 'woff',
                    mime: 'font/woff'
                };
            }
            if (this.checkString('wOF2') && (this.check([0x00, 0x01, 0x00, 0x00], {
                offset: 4
            }) || this.checkString('OTTO', {
                offset: 4
            }))) {
                return {
                    ext: 'woff2',
                    mime: 'font/woff2'
                };
            }
            if (this.check([0xD4, 0xC3, 0xB2, 0xA1]) || this.check([0xA1, 0xB2, 0xC3, 0xD4])) {
                return {
                    ext: 'pcap',
                    mime: 'application/vnd.tcpdump.pcap'
                };
            }

            // Sony DSD Stream File (DSF)
            if (this.checkString('DSD ')) {
                return {
                    ext: 'dsf',
                    mime: 'audio/x-dsf' // Non-standard
                };
            }

            if (this.checkString('LZIP')) {
                return {
                    ext: 'lz',
                    mime: 'application/x-lzip'
                };
            }
            if (this.checkString('fLaC')) {
                return {
                    ext: 'flac',
                    mime: 'audio/x-flac'
                };
            }
            if (this.check([0x42, 0x50, 0x47, 0xFB])) {
                return {
                    ext: 'bpg',
                    mime: 'image/bpg'
                };
            }
            if (this.checkString('wvpk')) {
                return {
                    ext: 'wv',
                    mime: 'audio/wavpack'
                };
            }
            if (this.checkString('%PDF')) {
                await tokenizer.ignore(1350);
                var maxBufferSize = 10 * 1024 * 1024;
                var buffer = Buffer.alloc(Math.min(maxBufferSize, tokenizer.fileInfo.size));
                await tokenizer.readBuffer(buffer, {
                    mayBeLess: true
                });

                // Check if this is an Adobe Illustrator file
                if (buffer.includes(Buffer.from('AIPrivateData'))) {
                    return {
                        ext: 'ai',
                        mime: 'application/postscript'
                    };
                }

                // Assume this is just a normal PDF
                return {
                    ext: 'pdf',
                    mime: 'application/pdf'
                };
            }
            if (this.check([0x00, 0x61, 0x73, 0x6D])) {
                return {
                    ext: 'wasm',
                    mime: 'application/wasm'
                };
            }

            // TIFF, little-endian type
            if (this.check([0x49, 0x49])) {
                var fileType = await this.readTiffHeader(false);
                if (fileType) {
                    return fileType;
                }
            }

            // TIFF, big-endian type
            if (this.check([0x4D, 0x4D])) {
                var _fileType = await this.readTiffHeader(true);
                if (_fileType) {
                    return _fileType;
                }
            }
            if (this.checkString('MAC ')) {
                return {
                    ext: 'ape',
                    mime: 'audio/ape'
                };
            }

            // https://github.com/threatstack/libmagic/blob/master/magic/Magdir/matroska
            if (this.check([0x1A, 0x45, 0xDF, 0xA3])) {
                // Root element: EBML
                var readField = async function readField() {
                    var msb = await tokenizer.peekNumber(Token.UINT8);
                    var mask = 0x80;
                    var ic = 0; // 0 = A, 1 = B, 2 = C, 3
                    // = D

                    while ((msb & mask) === 0) {
                        ++ic;
                        mask >>= 1;
                    }
                    var id = Buffer.alloc(ic + 1);
                    await tokenizer.readBuffer(id);
                    return id;
                };
                var readElement = async function readElement() {
                    var id = await readField();
                    var lengthField = await readField();
                    lengthField[0] ^= 0x80 >> lengthField.length - 1;
                    var nrLength = Math.min(6, lengthField.length); // JavaScript can max read 6 bytes integer
                    return {
                        id: id.readUIntBE(0, id.length),
                        len: lengthField.readUIntBE(lengthField.length - nrLength, nrLength)
                    };
                };
                var readChildren = async function readChildren(level, children) {
                    while (children > 0) {
                        var element = await readElement();
                        if (element.id === 0x42_82) {
                            var rawValue = await tokenizer.readToken(new StringType(element.len, 'utf-8'));
                            return rawValue.replace(/\00.*$/g, ''); // Return DocType
                        }

                        await tokenizer.ignore(element.len); // ignore payload
                        --children;
                    }
                };
                var re = await readElement();
                var docType = await readChildren(1, re.len);
                switch (docType) {
                    case 'webm':
                        return {
                            ext: 'webm',
                            mime: 'video/webm'
                        };
                    case 'matroska':
                        return {
                            ext: 'mkv',
                            mime: 'video/x-matroska'
                        };
                    default:
                        return;
                }
            }

            // RIFF file format which might be AVI, WAV, QCP, etc
            if (this.check([0x52, 0x49, 0x46, 0x46])) {
                if (this.check([0x41, 0x56, 0x49], {
                    offset: 8
                })) {
                    return {
                        ext: 'avi',
                        mime: 'video/vnd.avi'
                    };
                }
                if (this.check([0x57, 0x41, 0x56, 0x45], {
                    offset: 8
                })) {
                    return {
                        ext: 'wav',
                        mime: 'audio/vnd.wave'
                    };
                }

                // QLCM, QCP file
                if (this.check([0x51, 0x4C, 0x43, 0x4D], {
                    offset: 8
                })) {
                    return {
                        ext: 'qcp',
                        mime: 'audio/qcelp'
                    };
                }
            }
            if (this.checkString('SQLi')) {
                return {
                    ext: 'sqlite',
                    mime: 'application/x-sqlite3'
                };
            }
            if (this.check([0x4E, 0x45, 0x53, 0x1A])) {
                return {
                    ext: 'nes',
                    mime: 'application/x-nintendo-nes-rom'
                };
            }
            if (this.checkString('Cr24')) {
                return {
                    ext: 'crx',
                    mime: 'application/x-google-chrome-extension'
                };
            }
            if (this.checkString('MSCF') || this.checkString('ISc(')) {
                return {
                    ext: 'cab',
                    mime: 'application/vnd.ms-cab-compressed'
                };
            }
            if (this.check([0xED, 0xAB, 0xEE, 0xDB])) {
                return {
                    ext: 'rpm',
                    mime: 'application/x-rpm'
                };
            }
            if (this.check([0xC5, 0xD0, 0xD3, 0xC6])) {
                return {
                    ext: 'eps',
                    mime: 'application/eps'
                };
            }
            if (this.check([0x28, 0xB5, 0x2F, 0xFD])) {
                return {
                    ext: 'zst',
                    mime: 'application/zstd'
                };
            }
            if (this.check([0x7F, 0x45, 0x4C, 0x46])) {
                return {
                    ext: 'elf',
                    mime: 'application/x-elf'
                };
            }

            // -- 5-byte signatures --

            if (this.check([0x4F, 0x54, 0x54, 0x4F, 0x00])) {
                return {
                    ext: 'otf',
                    mime: 'font/otf'
                };
            }
            if (this.checkString('#!AMR')) {
                return {
                    ext: 'amr',
                    mime: 'audio/amr'
                };
            }
            if (this.checkString('{\\rtf')) {
                return {
                    ext: 'rtf',
                    mime: 'application/rtf'
                };
            }
            if (this.check([0x46, 0x4C, 0x56, 0x01])) {
                return {
                    ext: 'flv',
                    mime: 'video/x-flv'
                };
            }
            if (this.checkString('IMPM')) {
                return {
                    ext: 'it',
                    mime: 'audio/x-it'
                };
            }
            if (this.checkString('-lh0-', {
                offset: 2
            }) || this.checkString('-lh1-', {
                offset: 2
            }) || this.checkString('-lh2-', {
                offset: 2
            }) || this.checkString('-lh3-', {
                offset: 2
            }) || this.checkString('-lh4-', {
                offset: 2
            }) || this.checkString('-lh5-', {
                offset: 2
            }) || this.checkString('-lh6-', {
                offset: 2
            }) || this.checkString('-lh7-', {
                offset: 2
            }) || this.checkString('-lzs-', {
                offset: 2
            }) || this.checkString('-lz4-', {
                offset: 2
            }) || this.checkString('-lz5-', {
                offset: 2
            }) || this.checkString('-lhd-', {
                offset: 2
            })) {
                return {
                    ext: 'lzh',
                    mime: 'application/x-lzh-compressed'
                };
            }

            // MPEG program stream (PS or MPEG-PS)
            if (this.check([0x00, 0x00, 0x01, 0xBA])) {
                //  MPEG-PS, MPEG-1 Part 1
                if (this.check([0x21], {
                    offset: 4,
                    mask: [0xF1]
                })) {
                    return {
                        ext: 'mpg',
                        // May also be .ps, .mpeg
                        mime: 'video/MP1S'
                    };
                }

                // MPEG-PS, MPEG-2 Part 1
                if (this.check([0x44], {
                    offset: 4,
                    mask: [0xC4]
                })) {
                    return {
                        ext: 'mpg',
                        // May also be .mpg, .m2p, .vob or .sub
                        mime: 'video/MP2P'
                    };
                }
            }
            if (this.checkString('ITSF')) {
                return {
                    ext: 'chm',
                    mime: 'application/vnd.ms-htmlhelp'
                };
            }

            // -- 6-byte signatures --

            if (this.check([0xFD, 0x37, 0x7A, 0x58, 0x5A, 0x00])) {
                return {
                    ext: 'xz',
                    mime: 'application/x-xz'
                };
            }
            if (this.checkString('<?xml ')) {
                return {
                    ext: 'xml',
                    mime: 'application/xml'
                };
            }
            if (this.check([0x37, 0x7A, 0xBC, 0xAF, 0x27, 0x1C])) {
                return {
                    ext: '7z',
                    mime: 'application/x-7z-compressed'
                };
            }
            if (this.check([0x52, 0x61, 0x72, 0x21, 0x1A, 0x7]) && (this.buffer[6] === 0x0 || this.buffer[6] === 0x1)) {
                return {
                    ext: 'rar',
                    mime: 'application/x-rar-compressed'
                };
            }
            if (this.checkString('solid ')) {
                return {
                    ext: 'stl',
                    mime: 'model/stl'
                };
            }

            // -- 7-byte signatures --

            if (this.checkString('BLENDER')) {
                return {
                    ext: 'blend',
                    mime: 'application/x-blender'
                };
            }
            if (this.checkString('!<arch>')) {
                await tokenizer.ignore(8);
                var string = await tokenizer.readToken(new StringType(13, 'ascii'));
                if (string === 'debian-binary') {
                    return {
                        ext: 'deb',
                        mime: 'application/x-deb'
                    };
                }
                return {
                    ext: 'ar',
                    mime: 'application/x-unix-archive'
                };
            }

            // -- 8-byte signatures --

            if (this.check([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])) {
                // ignore PNG signature
                var readChunkHeader = async function readChunkHeader() {
                    return {
                        length: await tokenizer.readToken(Token.INT32_BE),
                        type: await tokenizer.readToken(new StringType(4, 'binary'))
                    };
                };
                // APNG format (https://wiki.mozilla.org/APNG_Specification)
                // 1. Find the first IDAT (image data) chunk (49 44 41 54)
                // 2. Check if there is an "acTL" chunk before the IDAT one (61 63 54 4C)

                // Offset calculated as follows:
                // - 8 bytes: PNG signature
                // - 4 (length) + 4 (chunk type) + 13 (chunk data) + 4 (CRC): IHDR chunk

                await tokenizer.ignore(8);
                do {
                    var chunk = await readChunkHeader();
                    if (chunk.length < 0) {
                        return; // Invalid chunk length
                    }

                    switch (chunk.type) {
                        case 'IDAT':
                            return {
                                ext: 'png',
                                mime: 'image/png'
                            };
                        case 'acTL':
                            return {
                                ext: 'apng',
                                mime: 'image/apng'
                            };
                        default:
                            await tokenizer.ignore(chunk.length + 4);
                        // Ignore chunk-data + CRC
                    }
                } while (tokenizer.position + 8 < tokenizer.fileInfo.size);
                return {
                    ext: 'png',
                    mime: 'image/png'
                };
            }
            if (this.check([0x41, 0x52, 0x52, 0x4F, 0x57, 0x31, 0x00, 0x00])) {
                return {
                    ext: 'arrow',
                    mime: 'application/x-apache-arrow'
                };
            }
            if (this.check([0x67, 0x6C, 0x54, 0x46, 0x02, 0x00, 0x00, 0x00])) {
                return {
                    ext: 'glb',
                    mime: 'model/gltf-binary'
                };
            }

            // `mov` format variants
            if (this.check([0x66, 0x72, 0x65, 0x65], {
                    offset: 4
                }) // `free`
                || this.check([0x6D, 0x64, 0x61, 0x74], {
                    offset: 4
                }) // `mdat` MJPEG
                || this.check([0x6D, 0x6F, 0x6F, 0x76], {
                    offset: 4
                }) // `moov`
                || this.check([0x77, 0x69, 0x64, 0x65], {
                    offset: 4
                }) // `wide`
            ) {
                return {
                    ext: 'mov',
                    mime: 'video/quicktime'
                };
            }
            if (this.check([0xEF, 0xBB, 0xBF]) && this.checkString('<?xml', {
                offset: 3
            })) {
                // UTF-8-BOM
                return {
                    ext: 'xml',
                    mime: 'application/xml'
                };
            }

            // -- 9-byte signatures --

            if (this.check([0x49, 0x49, 0x52, 0x4F, 0x08, 0x00, 0x00, 0x00, 0x18])) {
                return {
                    ext: 'orf',
                    mime: 'image/x-olympus-orf'
                };
            }
            if (this.checkString('gimp xcf ')) {
                return {
                    ext: 'xcf',
                    mime: 'image/x-xcf'
                };
            }

            // -- 12-byte signatures --

            if (this.check([0x49, 0x49, 0x55, 0x00, 0x18, 0x00, 0x00, 0x00, 0x88, 0xE7, 0x74, 0xD8])) {
                return {
                    ext: 'rw2',
                    mime: 'image/x-panasonic-rw2'
                };
            }

            // ASF_Header_Object first 80 bytes
            if (this.check([0x30, 0x26, 0xB2, 0x75, 0x8E, 0x66, 0xCF, 0x11, 0xA6, 0xD9])) {
                var readHeader = async function readHeader() {
                    var guid = Buffer.alloc(16);
                    await tokenizer.readBuffer(guid);
                    return {
                        id: guid,
                        size: Number(await tokenizer.readToken(Token.UINT64_LE))
                    };
                };
                await tokenizer.ignore(30);
                // Search for header should be in first 1KB of file.
                while (tokenizer.position + 24 < tokenizer.fileInfo.size) {
                    var header = await readHeader();
                    var payload = header.size - 24;
                    if (this._check(header.id, [0x91, 0x07, 0xDC, 0xB7, 0xB7, 0xA9, 0xCF, 0x11, 0x8E, 0xE6, 0x00, 0xC0, 0x0C, 0x20, 0x53, 0x65])) {
                        // Sync on Stream-Properties-Object (B7DC0791-A9B7-11CF-8EE6-00C00C205365)
                        var typeId = Buffer.alloc(16);
                        payload -= await tokenizer.readBuffer(typeId);
                        if (this._check(typeId, [0x40, 0x9E, 0x69, 0xF8, 0x4D, 0x5B, 0xCF, 0x11, 0xA8, 0xFD, 0x00, 0x80, 0x5F, 0x5C, 0x44, 0x2B])) {
                            // Found audio:
                            return {
                                ext: 'asf',
                                mime: 'audio/x-ms-asf'
                            };
                        }
                        if (this._check(typeId, [0xC0, 0xEF, 0x19, 0xBC, 0x4D, 0x5B, 0xCF, 0x11, 0xA8, 0xFD, 0x00, 0x80, 0x5F, 0x5C, 0x44, 0x2B])) {
                            // Found video:
                            return {
                                ext: 'asf',
                                mime: 'video/x-ms-asf'
                            };
                        }
                        break;
                    }
                    await tokenizer.ignore(payload);
                }

                // Default to ASF generic extension
                return {
                    ext: 'asf',
                    mime: 'application/vnd.ms-asf'
                };
            }
            if (this.check([0xAB, 0x4B, 0x54, 0x58, 0x20, 0x31, 0x31, 0xBB, 0x0D, 0x0A, 0x1A, 0x0A])) {
                return {
                    ext: 'ktx',
                    mime: 'image/ktx'
                };
            }
            if ((this.check([0x7E, 0x10, 0x04]) || this.check([0x7E, 0x18, 0x04])) && this.check([0x30, 0x4D, 0x49, 0x45], {
                offset: 4
            })) {
                return {
                    ext: 'mie',
                    mime: 'application/x-mie'
                };
            }
            if (this.check([0x27, 0x0A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], {
                offset: 2
            })) {
                return {
                    ext: 'shp',
                    mime: 'application/x-esri-shape'
                };
            }
            if (this.check([0x00, 0x00, 0x00, 0x0C, 0x6A, 0x50, 0x20, 0x20, 0x0D, 0x0A, 0x87, 0x0A])) {
                // JPEG-2000 family

                await tokenizer.ignore(20);
                var _type2 = await tokenizer.readToken(new StringType(4, 'ascii'));
                switch (_type2) {
                    case 'jp2 ':
                        return {
                            ext: 'jp2',
                            mime: 'image/jp2'
                        };
                    case 'jpx ':
                        return {
                            ext: 'jpx',
                            mime: 'image/jpx'
                        };
                    case 'jpm ':
                        return {
                            ext: 'jpm',
                            mime: 'image/jpm'
                        };
                    case 'mjp2':
                        return {
                            ext: 'mj2',
                            mime: 'image/mj2'
                        };
                    default:
                        return;
                }
            }
            if (this.check([0xFF, 0x0A]) || this.check([0x00, 0x00, 0x00, 0x0C, 0x4A, 0x58, 0x4C, 0x20, 0x0D, 0x0A, 0x87, 0x0A])) {
                return {
                    ext: 'jxl',
                    mime: 'image/jxl'
                };
            }
            if (this.check([0xFE, 0xFF, 0, 60, 0, 63, 0, 120, 0, 109, 0, 108]) // UTF-16-BOM-LE
                || this.check([0xFF, 0xFE, 60, 0, 63, 0, 120, 0, 109, 0, 108, 0]) // UTF-16-BOM-LE
            ) {
                return {
                    ext: 'xml',
                    mime: 'application/xml'
                };
            }

            // -- Unsafe signatures --

            if (this.check([0x0, 0x0, 0x1, 0xBA]) || this.check([0x0, 0x0, 0x1, 0xB3])) {
                return {
                    ext: 'mpg',
                    mime: 'video/mpeg'
                };
            }
            if (this.check([0x00, 0x01, 0x00, 0x00, 0x00])) {
                return {
                    ext: 'ttf',
                    mime: 'font/ttf'
                };
            }
            if (this.check([0x00, 0x00, 0x01, 0x00])) {
                return {
                    ext: 'ico',
                    mime: 'image/x-icon'
                };
            }
            if (this.check([0x00, 0x00, 0x02, 0x00])) {
                return {
                    ext: 'cur',
                    mime: 'image/x-icon'
                };
            }
            if (this.check([0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1])) {
                // Detected Microsoft Compound File Binary File (MS-CFB) Format.
                return {
                    ext: 'cfb',
                    mime: 'application/x-cfb'
                };
            }

            // Increase sample size from 12 to 256.
            await tokenizer.peekBuffer(this.buffer, {
                length: Math.min(256, tokenizer.fileInfo.size),
                mayBeLess: true
            });

            // -- 15-byte signatures --

            if (this.checkString('BEGIN:')) {
                if (this.checkString('VCARD', {
                    offset: 6
                })) {
                    return {
                        ext: 'vcf',
                        mime: 'text/vcard'
                    };
                }
                if (this.checkString('VCALENDAR', {
                    offset: 6
                })) {
                    return {
                        ext: 'ics',
                        mime: 'text/calendar'
                    };
                }
            }

            // `raf` is here just to keep all the raw image detectors together.
            if (this.checkString('FUJIFILMCCD-RAW')) {
                return {
                    ext: 'raf',
                    mime: 'image/x-fujifilm-raf'
                };
            }
            if (this.checkString('Extended Module:')) {
                return {
                    ext: 'xm',
                    mime: 'audio/x-xm'
                };
            }
            if (this.checkString('Creative Voice File')) {
                return {
                    ext: 'voc',
                    mime: 'audio/x-voc'
                };
            }
            if (this.check([0x04, 0x00, 0x00, 0x00]) && this.buffer.length >= 16) {
                // Rough & quick check Pickle/ASAR
                var jsonSize = this.buffer.readUInt32LE(12);
                if (jsonSize > 12 && this.buffer.length >= jsonSize + 16) {
                    try {
                        var _header = this.buffer.slice(16, jsonSize + 16).toString();
                        var json = JSON.parse(_header);
                        // Check if Pickle is ASAR
                        if (json.files) {
                            // Final check, assuring Pickle/ASAR format
                            return {
                                ext: 'asar',
                                mime: 'application/x-asar'
                            };
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
            if (this.check([0x06, 0x0E, 0x2B, 0x34, 0x02, 0x05, 0x01, 0x01, 0x0D, 0x01, 0x02, 0x01, 0x01, 0x02])) {
                return {
                    ext: 'mxf',
                    mime: 'application/mxf'
                };
            }
            if (this.checkString('SCRM', {
                offset: 44
            })) {
                return {
                    ext: 's3m',
                    mime: 'audio/x-s3m'
                };
            }

            // Raw MPEG-2 transport stream (188-byte packets)
            if (this.check([0x47]) && this.check([0x47], {
                offset: 188
            })) {
                return {
                    ext: 'mts',
                    mime: 'video/mp2t'
                };
            }

            // Blu-ray Disc Audio-Video (BDAV) MPEG-2 transport stream has 4-byte TP_extra_header before each 188-byte packet
            if (this.check([0x47], {
                offset: 4
            }) && this.check([0x47], {
                offset: 196
            })) {
                return {
                    ext: 'mts',
                    mime: 'video/mp2t'
                };
            }
            if (this.check([0x42, 0x4F, 0x4F, 0x4B, 0x4D, 0x4F, 0x42, 0x49], {
                offset: 60
            })) {
                return {
                    ext: 'mobi',
                    mime: 'application/x-mobipocket-ebook'
                };
            }
            if (this.check([0x44, 0x49, 0x43, 0x4D], {
                offset: 128
            })) {
                return {
                    ext: 'dcm',
                    mime: 'application/dicom'
                };
            }
            if (this.check([0x4C, 0x00, 0x00, 0x00, 0x01, 0x14, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0xC0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x46])) {
                return {
                    ext: 'lnk',
                    mime: 'application/x.ms.shortcut' // Invented by us
                };
            }

            if (this.check([0x62, 0x6F, 0x6F, 0x6B, 0x00, 0x00, 0x00, 0x00, 0x6D, 0x61, 0x72, 0x6B, 0x00, 0x00, 0x00, 0x00])) {
                return {
                    ext: 'alias',
                    mime: 'application/x.apple.alias' // Invented by us
                };
            }

            if (this.check([0x4C, 0x50], {
                offset: 34
            }) && (this.check([0x00, 0x00, 0x01], {
                offset: 8
            }) || this.check([0x01, 0x00, 0x02], {
                offset: 8
            }) || this.check([0x02, 0x00, 0x02], {
                offset: 8
            }))) {
                return {
                    ext: 'eot',
                    mime: 'application/vnd.ms-fontobject'
                };
            }
            if (this.check([0x06, 0x06, 0xED, 0xF5, 0xD8, 0x1D, 0x46, 0xE5, 0xBD, 0x31, 0xEF, 0xE7, 0xFE, 0x74, 0xB7, 0x1D])) {
                return {
                    ext: 'indd',
                    mime: 'application/x-indesign'
                };
            }

            // Increase sample size from 256 to 512
            await tokenizer.peekBuffer(this.buffer, {
                length: Math.min(512, tokenizer.fileInfo.size),
                mayBeLess: true
            });

            // Requires a buffer size of 512 bytes
            if (KrajeeFileTypeConfig.tarHeaderChecksumMatches(this.buffer)) {
                return {
                    ext: 'tar',
                    mime: 'application/x-tar'
                };
            }
            if (this.check([0xFF, 0xFE, 0xFF, 0x0E, 0x53, 0x00, 0x6B, 0x00, 0x65, 0x00, 0x74, 0x00, 0x63, 0x00, 0x68, 0x00, 0x55, 0x00, 0x70, 0x00, 0x20, 0x00, 0x4D, 0x00, 0x6F, 0x00, 0x64, 0x00, 0x65, 0x00, 0x6C, 0x00])) {
                return {
                    ext: 'skp',
                    mime: 'application/vnd.sketchup.skp'
                };
            }
            if (this.checkString('-----BEGIN PGP MESSAGE-----')) {
                return {
                    ext: 'pgp',
                    mime: 'application/pgp-encrypted'
                };
            }

            // Check MPEG 1 or 2 Layer 3 header, or 'layer 0' for ADTS (MPEG sync-word 0xFFE)
            if (this.buffer.length >= 2 && this.check([0xFF, 0xE0], {
                offset: 0,
                mask: [0xFF, 0xE0]
            })) {
                if (this.check([0x10], {
                    offset: 1,
                    mask: [0x16]
                })) {
                    // Check for (ADTS) MPEG-2
                    if (this.check([0x08], {
                        offset: 1,
                        mask: [0x08]
                    })) {
                        return {
                            ext: 'aac',
                            mime: 'audio/aac'
                        };
                    }

                    // Must be (ADTS) MPEG-4
                    return {
                        ext: 'aac',
                        mime: 'audio/aac'
                    };
                }

                // MPEG 1 or 2 Layer 3 header
                // Check for MPEG layer 3
                if (this.check([0x02], {
                    offset: 1,
                    mask: [0x06]
                })) {
                    return {
                        ext: 'mp3',
                        mime: 'audio/mpeg'
                    };
                }

                // Check for MPEG layer 2
                if (this.check([0x04], {
                    offset: 1,
                    mask: [0x06]
                })) {
                    return {
                        ext: 'mp2',
                        mime: 'audio/mpeg'
                    };
                }

                // Check for MPEG layer 1
                if (this.check([0x06], {
                    offset: 1,
                    mask: [0x06]
                })) {
                    return {
                        ext: 'mp1',
                        mime: 'audio/mpeg'
                    };
                }
            }
            return {};
        }
    }, {
        key: "readTiffTag",
        value: async function readTiffTag(bigEndian) {
            var Token = KrajeeFileTypeConfig.Token;
            var tagId = null;
            try {
                tagId = await this.tokenizer.readToken(bigEndian ? Token.UINT16_BE : Token.UINT16_LE);
            } catch (error) {
                if (_instanceof(error, EndOfStreamError)) {
                    return null;
                }
                throw error;
            }
            this.tokenizer.ignore(10);
            switch (tagId) {
                case 50_341:
                    return {
                        ext: 'arw',
                        mime: 'image/x-sony-arw'
                    };
                case 50_706:
                    return {
                        ext: 'dng',
                        mime: 'image/x-adobe-dng'
                    };
                default:
                    return null;
            }
        }
    }, {
        key: "readTiffIFD",
        value: async function readTiffIFD(bigEndian) {
            var Token = KrajeeFileTypeConfig.Token;
            var numberOfTags = await this.tokenizer.readToken(bigEndian ? Token.UINT16_BE : Token.UINT16_LE);
            for (var n = 0; n < numberOfTags; ++n) {
                var fileType = await this.readTiffTag(bigEndian);
                if (fileType) {
                    return fileType;
                }
            }
            return null;
        }
    }, {
        key: "readTiffHeader",
        value: async function readTiffHeader(bigEndian) {
            var Token = KrajeeFileTypeConfig.Token;
            var version = (bigEndian ? Token.UINT16_BE : Token.UINT16_LE).get(this.buffer, 2);
            var ifdOffset = (bigEndian ? Token.UINT32_BE : Token.UINT32_LE).get(this.buffer, 4);
            var tiff = {
                ext: 'tif',
                mime: 'image/tiff'
            };
            if (version === 42) {
                // TIFF file header
                if (ifdOffset >= 6) {
                    if (this.checkString('CR', {
                        offset: 8
                    })) {
                        return {
                            ext: 'cr2',
                            mime: 'image/x-canon-cr2'
                        };
                    }
                    if (ifdOffset >= 8 && (this.check([0x1C, 0x00, 0xFE, 0x00], {
                        offset: 8
                    }) || this.check([0x1F, 0x00, 0x0B, 0x00], {
                        offset: 8
                    }))) {
                        return {
                            ext: 'nef',
                            mime: 'image/x-nikon-nef'
                        };
                    }
                }
                await this.tokenizer.ignore(ifdOffset);
                var fileType = await this.readTiffIFD(false);
                return fileType ? fileType : tiff;
            }
            if (version === 43) {
                // Big TIFF file header
                return tiff;
            }
        }
    }]);
    return FileTypeParser;
}();