var oidc = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // (disabled):crypto
  var require_crypto = __commonJS({
    "(disabled):crypto"() {
    }
  });

  // node_modules/crypto-js/core.js
  var require_core = __commonJS({
    "node_modules/crypto-js/core.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory();
        } else if (typeof define === "function" && define.amd) {
          define([], factory);
        } else {
          root.CryptoJS = factory();
        }
      })(exports, function() {
        var CryptoJS = CryptoJS || function(Math2, undefined2) {
          var crypto;
          if (typeof window !== "undefined" && window.crypto) {
            crypto = window.crypto;
          }
          if (typeof self !== "undefined" && self.crypto) {
            crypto = self.crypto;
          }
          if (typeof globalThis !== "undefined" && globalThis.crypto) {
            crypto = globalThis.crypto;
          }
          if (!crypto && typeof window !== "undefined" && window.msCrypto) {
            crypto = window.msCrypto;
          }
          if (!crypto && typeof global !== "undefined" && global.crypto) {
            crypto = global.crypto;
          }
          if (!crypto && typeof __require === "function") {
            try {
              crypto = require_crypto();
            } catch (err) {
            }
          }
          var cryptoSecureRandomInt = function() {
            if (crypto) {
              if (typeof crypto.getRandomValues === "function") {
                try {
                  return crypto.getRandomValues(new Uint32Array(1))[0];
                } catch (err) {
                }
              }
              if (typeof crypto.randomBytes === "function") {
                try {
                  return crypto.randomBytes(4).readInt32LE();
                } catch (err) {
                }
              }
            }
            throw new Error("Native crypto module could not be used to get secure random number.");
          };
          var create = Object.create || function() {
            function F() {
            }
            return function(obj) {
              var subtype;
              F.prototype = obj;
              subtype = new F();
              F.prototype = null;
              return subtype;
            };
          }();
          var C = {};
          var C_lib = C.lib = {};
          var Base = C_lib.Base = function() {
            return {
              extend: function(overrides) {
                var subtype = create(this);
                if (overrides) {
                  subtype.mixIn(overrides);
                }
                if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                  subtype.init = function() {
                    subtype.$super.init.apply(this, arguments);
                  };
                }
                subtype.init.prototype = subtype;
                subtype.$super = this;
                return subtype;
              },
              create: function() {
                var instance = this.extend();
                instance.init.apply(instance, arguments);
                return instance;
              },
              init: function() {
              },
              mixIn: function(properties) {
                for (var propertyName in properties) {
                  if (properties.hasOwnProperty(propertyName)) {
                    this[propertyName] = properties[propertyName];
                  }
                }
                if (properties.hasOwnProperty("toString")) {
                  this.toString = properties.toString;
                }
              },
              clone: function() {
                return this.init.prototype.extend(this);
              }
            };
          }();
          var WordArray = C_lib.WordArray = Base.extend({
            init: function(words, sigBytes) {
              words = this.words = words || [];
              if (sigBytes != undefined2) {
                this.sigBytes = sigBytes;
              } else {
                this.sigBytes = words.length * 4;
              }
            },
            toString: function(encoder) {
              return (encoder || Hex).stringify(this);
            },
            concat: function(wordArray) {
              var thisWords = this.words;
              var thatWords = wordArray.words;
              var thisSigBytes = this.sigBytes;
              var thatSigBytes = wordArray.sigBytes;
              this.clamp();
              if (thisSigBytes % 4) {
                for (var i = 0; i < thatSigBytes; i++) {
                  var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                  thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
                }
              } else {
                for (var j = 0; j < thatSigBytes; j += 4) {
                  thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
                }
              }
              this.sigBytes += thatSigBytes;
              return this;
            },
            clamp: function() {
              var words = this.words;
              var sigBytes = this.sigBytes;
              words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
              words.length = Math2.ceil(sigBytes / 4);
            },
            clone: function() {
              var clone = Base.clone.call(this);
              clone.words = this.words.slice(0);
              return clone;
            },
            random: function(nBytes) {
              var words = [];
              for (var i = 0; i < nBytes; i += 4) {
                words.push(cryptoSecureRandomInt());
              }
              return new WordArray.init(words, nBytes);
            }
          });
          var C_enc = C.enc = {};
          var Hex = C_enc.Hex = {
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var hexChars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((bite & 15).toString(16));
              }
              return hexChars.join("");
            },
            parse: function(hexStr) {
              var hexStrLength = hexStr.length;
              var words = [];
              for (var i = 0; i < hexStrLength; i += 2) {
                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
              }
              return new WordArray.init(words, hexStrLength / 2);
            }
          };
          var Latin1 = C_enc.Latin1 = {
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var latin1Chars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                latin1Chars.push(String.fromCharCode(bite));
              }
              return latin1Chars.join("");
            },
            parse: function(latin1Str) {
              var latin1StrLength = latin1Str.length;
              var words = [];
              for (var i = 0; i < latin1StrLength; i++) {
                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
              }
              return new WordArray.init(words, latin1StrLength);
            }
          };
          var Utf8 = C_enc.Utf8 = {
            stringify: function(wordArray) {
              try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
              } catch (e2) {
                throw new Error("Malformed UTF-8 data");
              }
            },
            parse: function(utf8Str) {
              return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
          };
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            reset: function() {
              this._data = new WordArray.init();
              this._nDataBytes = 0;
            },
            _append: function(data) {
              if (typeof data == "string") {
                data = Utf8.parse(data);
              }
              this._data.concat(data);
              this._nDataBytes += data.sigBytes;
            },
            _process: function(doFlush) {
              var processedWords;
              var data = this._data;
              var dataWords = data.words;
              var dataSigBytes = data.sigBytes;
              var blockSize = this.blockSize;
              var blockSizeBytes = blockSize * 4;
              var nBlocksReady = dataSigBytes / blockSizeBytes;
              if (doFlush) {
                nBlocksReady = Math2.ceil(nBlocksReady);
              } else {
                nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
              }
              var nWordsReady = nBlocksReady * blockSize;
              var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
              if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                  this._doProcessBlock(dataWords, offset);
                }
                processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
              }
              return new WordArray.init(processedWords, nBytesReady);
            },
            clone: function() {
              var clone = Base.clone.call(this);
              clone._data = this._data.clone();
              return clone;
            },
            _minBufferSize: 0
          });
          var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
            cfg: Base.extend(),
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
              this.reset();
            },
            reset: function() {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            update: function(messageUpdate) {
              this._append(messageUpdate);
              this._process();
              return this;
            },
            finalize: function(messageUpdate) {
              if (messageUpdate) {
                this._append(messageUpdate);
              }
              var hash = this._doFinalize();
              return hash;
            },
            blockSize: 512 / 32,
            _createHelper: function(hasher) {
              return function(message, cfg) {
                return new hasher.init(cfg).finalize(message);
              };
            },
            _createHmacHelper: function(hasher) {
              return function(message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
              };
            }
          });
          var C_algo = C.algo = {};
          return C;
        }(Math);
        return CryptoJS;
      });
    }
  });

  // node_modules/crypto-js/sha256.js
  var require_sha256 = __commonJS({
    "node_modules/crypto-js/sha256.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS) {
        (function(Math2) {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var H = [];
          var K = [];
          (function() {
            function isPrime(n3) {
              var sqrtN = Math2.sqrt(n3);
              for (var factor = 2; factor <= sqrtN; factor++) {
                if (!(n3 % factor)) {
                  return false;
                }
              }
              return true;
            }
            function getFractionalBits(n3) {
              return (n3 - (n3 | 0)) * 4294967296 | 0;
            }
            var n2 = 2;
            var nPrime = 0;
            while (nPrime < 64) {
              if (isPrime(n2)) {
                if (nPrime < 8) {
                  H[nPrime] = getFractionalBits(Math2.pow(n2, 1 / 2));
                }
                K[nPrime] = getFractionalBits(Math2.pow(n2, 1 / 3));
                nPrime++;
              }
              n2++;
            }
          })();
          var W = [];
          var SHA256 = C_algo.SHA256 = Hasher.extend({
            _doReset: function() {
              this._hash = new WordArray.init(H.slice(0));
            },
            _doProcessBlock: function(M, offset) {
              var H2 = this._hash.words;
              var a = H2[0];
              var b = H2[1];
              var c = H2[2];
              var d = H2[3];
              var e2 = H2[4];
              var f = H2[5];
              var g = H2[6];
              var h = H2[7];
              for (var i = 0; i < 64; i++) {
                if (i < 16) {
                  W[i] = M[offset + i] | 0;
                } else {
                  var gamma0x = W[i - 15];
                  var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                  var gamma1x = W[i - 2];
                  var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                  W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
                }
                var ch = e2 & f ^ ~e2 & g;
                var maj = a & b ^ a & c ^ b & c;
                var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
                var sigma1 = (e2 << 26 | e2 >>> 6) ^ (e2 << 21 | e2 >>> 11) ^ (e2 << 7 | e2 >>> 25);
                var t1 = h + sigma1 + ch + K[i] + W[i];
                var t2 = sigma0 + maj;
                h = g;
                g = f;
                f = e2;
                e2 = d + t1 | 0;
                d = c;
                c = b;
                b = a;
                a = t1 + t2 | 0;
              }
              H2[0] = H2[0] + a | 0;
              H2[1] = H2[1] + b | 0;
              H2[2] = H2[2] + c | 0;
              H2[3] = H2[3] + d | 0;
              H2[4] = H2[4] + e2 | 0;
              H2[5] = H2[5] + f | 0;
              H2[6] = H2[6] + g | 0;
              H2[7] = H2[7] + h | 0;
            },
            _doFinalize: function() {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math2.floor(nBitsTotal / 4294967296);
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              return this._hash;
            },
            clone: function() {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          C.SHA256 = Hasher._createHelper(SHA256);
          C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
        })(Math);
        return CryptoJS.SHA256;
      });
    }
  });

  // node_modules/crypto-js/enc-base64.js
  var require_enc_base64 = __commonJS({
    "node_modules/crypto-js/enc-base64.js"(exports, module) {
      (function(root, factory) {
        if (typeof exports === "object") {
          module.exports = exports = factory(require_core());
        } else if (typeof define === "function" && define.amd) {
          define(["./core"], factory);
        } else {
          factory(root.CryptoJS);
        }
      })(exports, function(CryptoJS) {
        (function() {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          var Base642 = C_enc.Base64 = {
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var map = this._map;
              wordArray.clamp();
              var base64Chars = [];
              for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
                var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
                var triplet = byte1 << 16 | byte2 << 8 | byte3;
                for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                  base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                while (base64Chars.length % 4) {
                  base64Chars.push(paddingChar);
                }
              }
              return base64Chars.join("");
            },
            parse: function(base64Str) {
              var base64StrLength = base64Str.length;
              var map = this._map;
              var reverseMap = this._reverseMap;
              if (!reverseMap) {
                reverseMap = this._reverseMap = [];
                for (var j = 0; j < map.length; j++) {
                  reverseMap[map.charCodeAt(j)] = j;
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex !== -1) {
                  base64StrLength = paddingIndex;
                }
              }
              return parseLoop(base64Str, base64StrLength, reverseMap);
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
          };
          function parseLoop(base64Str, base64StrLength, reverseMap) {
            var words = [];
            var nBytes = 0;
            for (var i = 0; i < base64StrLength; i++) {
              if (i % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
                var bitsCombined = bits1 | bits2;
                words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
                nBytes++;
              }
            }
            return WordArray.create(words, nBytes);
          }
        })();
        return CryptoJS.enc.Base64;
      });
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    AccessTokenEvents: () => AccessTokenEvents,
    CheckSessionIFrame: () => CheckSessionIFrame,
    InMemoryWebStorage: () => InMemoryWebStorage,
    Log: () => Log,
    MetadataService: () => MetadataService,
    OidcClient: () => OidcClient,
    SessionMonitor: () => SessionMonitor,
    TokenRevocationClient: () => TokenRevocationClient,
    User: () => User,
    UserManager: () => UserManager,
    UserManagerEvents: () => UserManagerEvents,
    Version: () => Version,
    WebStorageStateStore: () => WebStorageStateStore
  });

  // src/utils/CryptoUtils.ts
  var import_sha256 = __toModule(require_sha256());
  var import_enc_base64 = __toModule(require_enc_base64());

  // src/utils/Log.ts
  var nopLogger = {
    debug: () => void 0,
    info: () => void 0,
    warn: () => void 0,
    error: () => void 0
  };
  var NONE = 0;
  var ERROR = 1;
  var WARN = 2;
  var INFO = 3;
  var DEBUG = 4;
  var Log = class {
    static get NONE() {
      return NONE;
    }
    static get ERROR() {
      return ERROR;
    }
    static get WARN() {
      return WARN;
    }
    static get INFO() {
      return INFO;
    }
    static get DEBUG() {
      return DEBUG;
    }
    static reset() {
      this._level = INFO;
      this._logger = nopLogger;
    }
    static get level() {
      return this._level;
    }
    static set level(value) {
      if (NONE > value || value > DEBUG) {
        throw new Error("Invalid log level");
      }
      this._level = value;
    }
    static get logger() {
      return this._logger;
    }
    static set logger(value) {
      this._logger = value;
    }
  };
  var Logger = class {
    constructor(name) {
      this._name = name;
    }
    debug(...args) {
      Logger.debug(this._name, ...args);
    }
    info(...args) {
      Logger.info(this._name, ...args);
    }
    warn(...args) {
      Logger.warn(this._name, ...args);
    }
    error(...args) {
      Logger.error(this._name, ...args);
    }
    static debug(name, ...args) {
      if (Log.level >= DEBUG) {
        Log.logger.debug(`[${name}]`, ...args);
      }
    }
    static info(name, ...args) {
      if (Log.level >= INFO) {
        Log.logger.info(`[${name}]`, ...args);
      }
    }
    static warn(name, ...args) {
      if (Log.level >= WARN) {
        Log.logger.warn(`[${name}]`, ...args);
      }
    }
    static error(name, ...args) {
      if (Log.level >= ERROR) {
        Log.logger.error(`[${name}]`, ...args);
      }
    }
  };
  Log.reset();

  // src/utils/CryptoUtils.ts
  var UUID_V4_TEMPLATE = "10000000-1000-4000-8000-100000000000";
  var CryptoUtils = class {
    static _cryptoUUIDv4() {
      return UUID_V4_TEMPLATE.replace(/[018]/g, (c) => (+c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16));
    }
    static _UUIDv4() {
      return UUID_V4_TEMPLATE.replace(/[018]/g, (c) => (+c ^ Math.random() * 16 >> +c / 4).toString(16));
    }
    static generateUUIDv4() {
      const hasRandomValues = window.crypto && Object.prototype.hasOwnProperty.call(window.crypto, "getRandomValues");
      const uuid = hasRandomValues ? CryptoUtils._cryptoUUIDv4() : CryptoUtils._UUIDv4();
      return uuid.replace(/-/g, "");
    }
    static generateCodeVerifier() {
      return CryptoUtils.generateUUIDv4() + CryptoUtils.generateUUIDv4() + CryptoUtils.generateUUIDv4();
    }
    static generateCodeChallenge(code_verifier) {
      try {
        const hashed = (0, import_sha256.default)(code_verifier);
        return import_enc_base64.default.stringify(hashed).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      } catch (err) {
        Logger.error("CryptoUtils", err instanceof Error ? err.message : err);
        throw err;
      }
    }
  };

  // src/utils/Event.ts
  var Event = class {
    constructor(_name) {
      this._name = _name;
      this._callbacks = [];
      this._logger = new Logger("Event");
    }
    addHandler(cb) {
      this._callbacks.push(cb);
    }
    removeHandler(cb) {
      const idx = this._callbacks.findIndex((item) => item === cb);
      if (idx >= 0) {
        this._callbacks.splice(idx, 1);
      }
    }
    raise(...ev) {
      this._logger.debug("Raising event: " + this._name);
      for (let i = 0; i < this._callbacks.length; i++) {
        void this._callbacks[i](...ev);
      }
    }
  };

  // node_modules/jwt-decode/build/jwt-decode.esm.js
  function e(e2) {
    this.message = e2;
  }
  e.prototype = new Error(), e.prototype.name = "InvalidCharacterError";
  var r = typeof window != "undefined" && window.atob && window.atob.bind(window) || function(r2) {
    var t2 = String(r2).replace(/=+$/, "");
    if (t2.length % 4 == 1)
      throw new e("'atob' failed: The string to be decoded is not correctly encoded.");
    for (var n2, o2, a = 0, i = 0, c = ""; o2 = t2.charAt(i++); ~o2 && (n2 = a % 4 ? 64 * n2 + o2 : o2, a++ % 4) ? c += String.fromCharCode(255 & n2 >> (-2 * a & 6)) : 0)
      o2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o2);
    return c;
  };
  function t(e2) {
    var t2 = e2.replace(/-/g, "+").replace(/_/g, "/");
    switch (t2.length % 4) {
      case 0:
        break;
      case 2:
        t2 += "==";
        break;
      case 3:
        t2 += "=";
        break;
      default:
        throw "Illegal base64url string!";
    }
    try {
      return function(e3) {
        return decodeURIComponent(r(e3).replace(/(.)/g, function(e4, r2) {
          var t3 = r2.charCodeAt(0).toString(16).toUpperCase();
          return t3.length < 2 && (t3 = "0" + t3), "%" + t3;
        }));
      }(t2);
    } catch (e3) {
      return r(t2);
    }
  }
  function n(e2) {
    this.message = e2;
  }
  function o(e2, r2) {
    if (typeof e2 != "string")
      throw new n("Invalid token specified");
    var o2 = (r2 = r2 || {}).header === true ? 0 : 1;
    try {
      return JSON.parse(t(e2.split(".")[o2]));
    } catch (e3) {
      throw new n("Invalid token specified: " + e3.message);
    }
  }
  n.prototype = new Error(), n.prototype.name = "InvalidTokenError";
  var jwt_decode_esm_default = o;

  // src/utils/JwtUtils.ts
  var JwtUtils = class {
    static decode(token) {
      try {
        const payload = jwt_decode_esm_default(token);
        return payload;
      } catch (err) {
        Logger.error("JwtUtils", err);
        throw err;
      }
    }
  };

  // src/utils/Timer.ts
  var DefaultTimerDurationInSeconds = 5;
  var g_timer = {
    setInterval: function(cb, duration) {
      return window.setInterval(cb, duration);
    },
    clearInterval: function(handle) {
      return window.clearInterval(handle);
    }
  };
  var Timer = class extends Event {
    constructor() {
      super(...arguments);
      this._timer = g_timer;
      this._timerHandle = null;
      this._expiration = 0;
      this._callback = () => {
        const diff = this._expiration - Timer.getEpochTime();
        this._logger.debug("_callback: " + this._name + " timer expires in:", diff);
        if (this._expiration <= Timer.getEpochTime()) {
          this.cancel();
          super.raise();
        }
      };
    }
    static getEpochTime() {
      return Math.floor(Date.now() / 1e3);
    }
    init(durationInSeconds) {
      if (durationInSeconds <= 0) {
        durationInSeconds = 1;
      }
      durationInSeconds = Math.floor(durationInSeconds);
      const expiration = Timer.getEpochTime() + durationInSeconds;
      if (this.expiration === expiration && this._timerHandle) {
        this._logger.debug("init timer " + this._name + " skipping initialization since already initialized for expiration:", this.expiration);
        return;
      }
      this.cancel();
      this._logger.debug("init timer " + this._name + " for duration:", durationInSeconds);
      this._expiration = expiration;
      let timerDurationInSeconds = DefaultTimerDurationInSeconds;
      if (durationInSeconds < timerDurationInSeconds) {
        timerDurationInSeconds = durationInSeconds;
      }
      this._timerHandle = this._timer.setInterval(this._callback, timerDurationInSeconds * 1e3);
    }
    get expiration() {
      return this._expiration;
    }
    cancel() {
      if (this._timerHandle) {
        this._logger.debug("cancel: ", this._name);
        this._timer.clearInterval(this._timerHandle);
        this._timerHandle = null;
      }
    }
  };

  // src/utils/UrlUtils.ts
  var UrlUtils = class {
    static addQueryParam(url, name, value) {
      if (url.indexOf("?") < 0) {
        url += "?";
      }
      if (url[url.length - 1] !== "?") {
        url += "&";
      }
      url += encodeURIComponent(name);
      url += "=";
      url += encodeURIComponent(value);
      return url;
    }
    static parseUrlFragment(value, delimiter = "#") {
      if (!value) {
        value = location.href;
      }
      let idx = value.lastIndexOf(delimiter);
      if (idx >= 0) {
        value = value.substr(idx + 1);
      }
      if (delimiter === "?") {
        idx = value.indexOf("#");
        if (idx >= 0) {
          value = value.substr(0, idx);
        }
      }
      const params = {};
      const regex = /([^&=]+)=([^&]*)/g;
      let m;
      let counter = 0;
      while ((m = regex.exec(value)) !== null) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2].replace(/\+/g, " "));
        if (counter++ > 50) {
          Logger.error("UrlUtils", "parseUrlFragment: response exceeded expected number of parameters", value);
          return {
            error: "Response exceeded expected number of parameters"
          };
        }
      }
      return params;
    }
  };

  // src/WebStorageStateStore.ts
  var WebStorageStateStore = class {
    constructor({ prefix = "oidc.", store = localStorage } = {}) {
      this._logger = new Logger("WebStorageStateStore");
      this._store = store;
      this._prefix = prefix;
    }
    set(key, value) {
      this._logger.debug("set", key);
      key = this._prefix + key;
      this._store.setItem(key, value);
      return Promise.resolve();
    }
    get(key) {
      this._logger.debug("get", key);
      key = this._prefix + key;
      const item = this._store.getItem(key);
      return Promise.resolve(item);
    }
    remove(key) {
      this._logger.debug("remove", key);
      key = this._prefix + key;
      const item = this._store.getItem(key);
      this._store.removeItem(key);
      return Promise.resolve(item);
    }
    getAllKeys() {
      this._logger.debug("getAllKeys");
      const keys = [];
      for (let index = 0; index < this._store.length; index++) {
        const key = this._store.key(index);
        if (key && key.indexOf(this._prefix) === 0) {
          keys.push(key.substr(this._prefix.length));
        }
      }
      return Promise.resolve(keys);
    }
  };

  // src/OidcClientSettings.ts
  var DefaultResponseType = "code";
  var DefaultScope = "openid";
  var DefaultClientAuthentication = "client_secret_post";
  var DefaultResponseMode = "query";
  var DefaultStaleStateAgeInSeconds = 60 * 15;
  var DefaultClockSkewInSeconds = 60 * 5;
  var OidcClientSettingsStore = class {
    constructor({
      authority,
      metadataUrl,
      metadata,
      signingKeys,
      metadataSeed,
      client_id,
      client_secret,
      response_type = DefaultResponseType,
      scope = DefaultScope,
      redirect_uri,
      post_logout_redirect_uri,
      client_authentication = DefaultClientAuthentication,
      prompt,
      display,
      max_age,
      ui_locales,
      acr_values,
      resource,
      response_mode = DefaultResponseMode,
      filterProtocolClaims = true,
      loadUserInfo = false,
      staleStateAgeInSeconds = DefaultStaleStateAgeInSeconds,
      clockSkewInSeconds = DefaultClockSkewInSeconds,
      userInfoJwtIssuer = "OP",
      mergeClaims = false,
      stateStore = new WebStorageStateStore(),
      extraQueryParams = {},
      extraTokenParams = {}
    }) {
      this.authority = authority;
      this.metadataUrl = metadataUrl;
      this.metadata = metadata;
      this.metadataSeed = metadataSeed;
      this.signingKeys = signingKeys;
      this.client_id = client_id;
      this.client_secret = client_secret;
      this.response_type = response_type;
      this.scope = scope;
      this.redirect_uri = redirect_uri;
      this.post_logout_redirect_uri = post_logout_redirect_uri;
      this.client_authentication = client_authentication;
      this.prompt = prompt;
      this.display = display;
      this.max_age = max_age;
      this.ui_locales = ui_locales;
      this.acr_values = acr_values;
      this.resource = resource;
      this.response_mode = response_mode;
      this.filterProtocolClaims = !!filterProtocolClaims;
      this.loadUserInfo = !!loadUserInfo;
      this.staleStateAgeInSeconds = staleStateAgeInSeconds;
      this.clockSkewInSeconds = clockSkewInSeconds;
      this.userInfoJwtIssuer = userInfoJwtIssuer;
      this.mergeClaims = !!mergeClaims;
      this.stateStore = stateStore;
      this.extraQueryParams = extraQueryParams;
      this.extraTokenParams = extraTokenParams;
    }
  };

  // src/JsonService.ts
  var JsonService = class {
    constructor(additionalContentTypes = [], jwtHandler = null) {
      this._logger = new Logger("JsonService");
      this._contentTypes = additionalContentTypes.slice();
      this._contentTypes.push("application/json");
      if (jwtHandler) {
        this._contentTypes.push("application/jwt");
      }
      this._jwtHandler = jwtHandler;
    }
    async getJson(url, token) {
      if (!url) {
        this._logger.error("getJson: No url passed");
        throw new Error("url");
      }
      const headers = {};
      if (token) {
        this._logger.debug("getJson: token passed, setting Authorization header");
        headers["Authorization"] = "Bearer " + token;
      }
      let response;
      try {
        this._logger.debug("getJson, url:", url);
        response = await fetch(url, { method: "GET", headers });
      } catch (err) {
        this._logger.error("getJson: network error");
        throw new Error("Network Error");
      }
      this._logger.debug("getJson: HTTP response received, status", response.status);
      if (response.status === 200) {
        const contentType = response.headers.get("Content-Type");
        if (contentType) {
          const found = this._contentTypes.find((item) => contentType.startsWith(item));
          if (found === "application/jwt" && this._jwtHandler) {
            const text = await response.text();
            return await this._jwtHandler(text);
          }
          if (found) {
            try {
              const json = await response.json();
              return json;
            } catch (err) {
              this._logger.error("getJson: Error parsing JSON response", err instanceof Error ? err.message : err);
              throw err;
            }
          }
        }
        throw new Error("Invalid response Content-Type: " + (contentType != null ? contentType : "undefined") + ", from URL: " + url);
      }
      throw new Error(response.statusText + " (" + response.status.toString() + ")");
    }
    async postForm(url, payload, basicAuth) {
      if (!url) {
        this._logger.error("postForm: No url passed");
        throw new Error("url");
      }
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      if (basicAuth !== void 0) {
        headers["Authorization"] = "Basic " + btoa(basicAuth);
      }
      const body = new URLSearchParams();
      for (const key in payload) {
        const value = payload[key];
        if (value) {
          body.set(key, value);
        }
      }
      let response;
      try {
        this._logger.debug("postForm, url:", url);
        response = await fetch(url, { method: "POST", headers, body });
      } catch (err) {
        this._logger.error("postForm: network error");
        throw new Error("Network Error");
      }
      const allowedContentTypes = this._contentTypes;
      this._logger.debug("postForm: HTTP response received, status", response.status);
      if (response.status === 200) {
        const contentType = response.headers.get("Content-Type");
        if (contentType) {
          const found = allowedContentTypes.find((item) => contentType.startsWith(item));
          if (found) {
            try {
              const json = await response.json();
              return json;
            } catch (err) {
              this._logger.error("postForm: Error parsing JSON response", err instanceof Error ? err.message : err);
              throw err;
            }
          }
        }
        throw new Error("Invalid response Content-Type: " + (contentType != null ? contentType : "undefined") + ", from URL: " + url);
      } else if (response.status === 400) {
        const contentType = response.headers.get("Content-Type");
        if (contentType) {
          const found = allowedContentTypes.find((item) => contentType.startsWith(item));
          if (found) {
            try {
              const json = await response.json();
              if (json && json.error) {
                this._logger.error("postForm: Error from server:", json.error);
                throw new Error(payload.error);
              }
              return json;
            } catch (err) {
              this._logger.error("postForm: Error parsing JSON response", err instanceof Error ? err.message : err);
              throw err;
            }
          }
        }
        throw new Error("Invalid response Content-Type: " + (contentType != null ? contentType : "undefined") + ", from URL: " + url);
      }
      throw new Error(response.statusText + " (" + response.status.toString() + ")");
    }
  };

  // src/UserInfoService.ts
  var UserInfoService = class {
    constructor(metadataService) {
      this._getClaimsFromJwt = async (responseText) => {
        try {
          const payload = JwtUtils.decode(responseText);
          this._logger.debug("_getClaimsFromJwt: JWT decoding successful");
          return payload;
        } catch (err) {
          this._logger.error("_getClaimsFromJwt: Error parsing JWT response", err instanceof Error ? err.message : err);
          throw err;
        }
      };
      this._logger = new Logger("UserInfoService");
      this._jsonService = new JsonService(void 0, this._getClaimsFromJwt);
      this._metadataService = metadataService;
    }
    async getClaims(token) {
      if (!token) {
        this._logger.error("getClaims: No token passed");
        throw new Error("A token is required");
      }
      const url = await this._metadataService.getUserInfoEndpoint();
      this._logger.debug("getClaims: received userinfo url", url);
      const claims = await this._jsonService.getJson(url, token);
      this._logger.debug("getClaims: claims received", claims);
      return claims;
    }
  };

  // src/TokenClient.ts
  var TokenClient = class {
    constructor(settings, metadataService) {
      this._settings = settings;
      this._logger = new Logger("TokenClient");
      this._jsonService = new JsonService();
      this._metadataService = metadataService;
    }
    async exchangeCode(args) {
      args = Object.assign({}, args);
      args.grant_type = args.grant_type || "authorization_code";
      args.client_id = args.client_id || this._settings.client_id;
      args.client_secret = args.client_secret || this._settings.client_secret;
      args.redirect_uri = args.redirect_uri || this._settings.redirect_uri;
      const client_authentication = this._settings.client_authentication;
      if (!args.client_id) {
        this._logger.error("exchangeCode: No client_id passed");
        throw new Error("A client_id is required");
      }
      if (!args.redirect_uri) {
        this._logger.error("exchangeCode: No redirect_uri passed");
        throw new Error("A redirect_uri is required");
      }
      if (!args.code) {
        this._logger.error("exchangeCode: No code passed");
        throw new Error("A code is required");
      }
      if (!args.code_verifier) {
        this._logger.error("exchangeCode: No code_verifier passed");
        throw new Error("A code_verifier is required");
      }
      let basicAuth = void 0;
      if (client_authentication == "client_secret_basic") {
        if (!args.client_secret) {
          this._logger.error("exchangeCode: No client_secret passed");
          throw new Error("A client_secret is required");
        }
        basicAuth = args.client_id + ":" + args.client_secret;
        delete args.client_id;
        delete args.client_secret;
      }
      const url = await this._metadataService.getTokenEndpoint(false);
      this._logger.debug("exchangeCode: Received token endpoint");
      const response = await this._jsonService.postForm(url, args, basicAuth);
      this._logger.debug("exchangeCode: response received");
      return response;
    }
    async exchangeRefreshToken(args) {
      args = Object.assign({}, args);
      args.grant_type = args.grant_type || "refresh_token";
      args.client_id = args.client_id || this._settings.client_id;
      args.client_secret = args.client_secret || this._settings.client_secret;
      const client_authentication = this._settings.client_authentication;
      if (!args.refresh_token) {
        this._logger.error("exchangeRefreshToken: No refresh_token passed");
        throw new Error("A refresh_token is required");
      }
      if (!args.client_id) {
        this._logger.error("exchangeRefreshToken: No client_id passed");
        throw new Error("A client_id is required");
      }
      let basicAuth = void 0;
      if (client_authentication == "client_secret_basic") {
        if (!args.client_secret) {
          this._logger.error("exchangeCode: No client_secret passed");
          throw new Error("A client_secret is required");
        }
        basicAuth = args.client_id + ":" + args.client_secret;
        delete args.client_id;
        delete args.client_secret;
      }
      const url = await this._metadataService.getTokenEndpoint(false);
      this._logger.debug("exchangeRefreshToken: Received token endpoint");
      const response = await this._jsonService.postForm(url, args, basicAuth);
      this._logger.debug("exchangeRefreshToken: response received");
      return response;
    }
  };

  // src/ErrorResponse.ts
  var ErrorResponse = class extends Error {
    constructor(args) {
      super(args.error_description || args.error);
      if (!args.error) {
        Logger.error("ErrorResponse", "No error passed");
        throw new Error("No error passed");
      }
      this.name = "ErrorResponse";
      this.error = args.error;
      this.error_description = args.error_description;
      this.error_uri = args.error_uri;
      this.state = args.state;
      this.session_state = args.session_state;
    }
  };

  // src/ResponseValidator.ts
  var ProtocolClaims = ["at_hash", "iat", "nbf", "exp", "aud", "iss", "c_hash"];
  var ResponseValidator = class {
    constructor(settings, metadataService) {
      this._settings = settings;
      this._logger = new Logger("ResponseValidator");
      this._metadataService = metadataService;
      this._userInfoService = new UserInfoService(metadataService);
      this._tokenClient = new TokenClient(this._settings, metadataService);
    }
    async validateSigninResponse(state, response) {
      this._logger.debug("validateSigninResponse");
      response = this._processSigninParams(state, response);
      this._logger.debug("validateSigninResponse: state processed");
      response = await this._validateTokens(state, response);
      this._logger.debug("validateSigninResponse: tokens validated");
      response = await this._processClaims(state, response);
      this._logger.debug("validateSigninResponse: claims processed");
      return response;
    }
    validateSignoutResponse(state, response) {
      if (state.id !== response.state_id) {
        this._logger.error("validateSignoutResponse: State does not match");
        throw new Error("State does not match");
      }
      this._logger.debug("validateSignoutResponse: state validated");
      response.state = state.data;
      if (response.error) {
        this._logger.warn("validateSignoutResponse: Response was error", response.error);
        throw new ErrorResponse(response);
      }
      return response;
    }
    _processSigninParams(state, response) {
      if (state.id !== response.state_id) {
        this._logger.error("_processSigninParams: State does not match");
        throw new Error("State does not match");
      }
      if (!state.client_id) {
        this._logger.error("_processSigninParams: No client_id on state");
        throw new Error("No client_id on state");
      }
      if (!state.authority) {
        this._logger.error("_processSigninParams: No authority on state");
        throw new Error("No authority on state");
      }
      if (this._settings.authority !== state.authority) {
        this._logger.error("_processSigninParams: authority mismatch on settings vs. signin state");
        throw new Error("authority mismatch on settings vs. signin state");
      }
      if (this._settings.client_id && this._settings.client_id !== state.client_id) {
        this._logger.error("_processSigninParams: client_id mismatch on settings vs. signin state");
        throw new Error("client_id mismatch on settings vs. signin state");
      }
      this._logger.debug("_processSigninParams: state validated");
      response.state = state.data;
      if (response.error) {
        this._logger.warn("_processSigninParams: Response was error", response.error);
        throw new ErrorResponse(response);
      }
      if (state.code_verifier && !response.code) {
        this._logger.error("_processSigninParams: Expecting code in response");
        throw new Error("No code in response");
      }
      if (!state.code_verifier && response.code) {
        this._logger.error("_processSigninParams: Not expecting code in response");
        throw new Error("Unexpected code in response");
      }
      if (!response.scope) {
        response.scope = state.scope;
      }
      return response;
    }
    async _processClaims(state, response) {
      if (response.isOpenIdConnect) {
        this._logger.debug("_processClaims: response is OIDC, processing claims");
        response.profile = this._filterProtocolClaims(response.profile);
        if (state.skipUserInfo !== true && this._settings.loadUserInfo && response.access_token) {
          this._logger.debug("_processClaims: loading user info");
          const claims = await this._userInfoService.getClaims(response.access_token);
          this._logger.debug("_processClaims: user info claims received from user info endpoint");
          if (claims.sub !== response.profile.sub) {
            this._logger.error("_processClaims: sub from user info endpoint does not match sub in id_token");
            throw new Error("sub from user info endpoint does not match sub in id_token");
          }
          response.profile = this._mergeClaims(response.profile, claims);
          this._logger.debug("_processClaims: user info claims received, updated profile:", response.profile);
          return response;
        } else {
          this._logger.debug("_processClaims: not loading user info");
        }
      } else {
        this._logger.debug("_processClaims: response is not OIDC, not processing claims");
      }
      return response;
    }
    _mergeClaims(claims1, claims2) {
      const result = Object.assign({}, claims1);
      for (const name in claims2) {
        let values = claims2[name];
        if (!Array.isArray(values)) {
          values = [values];
        }
        for (let i = 0; i < values.length; i++) {
          const value = values[i];
          if (!result[name]) {
            result[name] = value;
          } else if (Array.isArray(result[name])) {
            if (result[name].indexOf(value) < 0) {
              result[name].push(value);
            }
          } else if (result[name] !== value) {
            if (typeof value === "object" && this._settings.mergeClaims) {
              result[name] = this._mergeClaims(result[name], value);
            } else {
              result[name] = [result[name], value];
            }
          }
        }
      }
      return result;
    }
    _filterProtocolClaims(claims) {
      this._logger.debug("_filterProtocolClaims, incoming claims:", claims);
      const result = Object.assign({}, claims);
      if (this._settings.filterProtocolClaims) {
        ProtocolClaims.forEach((type) => {
          delete result[type];
        });
        this._logger.debug("_filterProtocolClaims: protocol claims filtered:", result);
      } else {
        this._logger.debug("_filterProtocolClaims: protocol claims not filtered");
      }
      return result;
    }
    async _validateTokens(state, response) {
      if (response.code) {
        this._logger.debug("_validateTokens: Validating code");
        return this._processCode(state, response);
      }
      this._logger.debug("_validateTokens: No code to process");
      return response;
    }
    async _processCode(state, response) {
      const request = {
        client_id: state.client_id,
        client_secret: state.client_secret,
        code: response.code,
        redirect_uri: state.redirect_uri,
        code_verifier: state.code_verifier || ""
      };
      if (state.extraTokenParams && typeof state.extraTokenParams === "object") {
        Object.assign(request, state.extraTokenParams);
      }
      const tokenResponse = await this._tokenClient.exchangeCode(request);
      response.error = tokenResponse.error || response.error;
      response.error_description = tokenResponse.error_description || response.error_description;
      response.error_uri = tokenResponse.error_uri || response.error_uri;
      response.id_token = tokenResponse.id_token || response.id_token;
      response.session_state = tokenResponse.session_state || response.session_state;
      response.access_token = tokenResponse.access_token || response.access_token;
      response.refresh_token = tokenResponse.refresh_token || response.refresh_token;
      response.token_type = tokenResponse.token_type || response.token_type;
      response.scope = tokenResponse.scope || response.scope;
      response.expires_in = parseInt(tokenResponse.expires_in) || response.expires_in;
      if (response.id_token) {
        this._logger.debug("_processCode: token response successful, processing id_token");
        return this._validateIdTokenAttributes(state, response, response.id_token);
      }
      this._logger.debug("_processCode: token response successful, returning response");
      return response;
    }
    async _validateIdTokenAttributes(state, response, id_token) {
      this._logger.debug("_validateIdTokenAttributes: Decoding JWT attributes");
      const payload = JwtUtils.decode(id_token);
      if (!payload.sub) {
        this._logger.error("_validateIdTokenAttributes: No sub present in id_token");
        throw new Error("No sub present in id_token");
      }
      response.profile = payload;
      return response;
    }
  };

  // src/MetadataService.ts
  var OidcMetadataUrlPath = ".well-known/openid-configuration";
  var MetadataService = class {
    constructor(settings) {
      this._settings = settings;
      this._logger = new Logger("MetadataService");
      this._jsonService = new JsonService(["application/jwk-set+json"]);
      this._metadataUrl = null;
      if (this._settings.metadataUrl) {
        this._metadataUrl = this._settings.metadataUrl;
      } else if (this._settings.authority) {
        this._metadataUrl = this._settings.authority;
        if (this._metadataUrl[this._metadataUrl.length - 1] !== "/") {
          this._metadataUrl += "/";
        }
        this._metadataUrl += OidcMetadataUrlPath;
      }
      this._signingKeys = null;
      if (this._settings.signingKeys) {
        this._logger.debug("ctor: Using signingKeys from settings");
        this._signingKeys = this._settings.signingKeys;
      }
      this._metadata = null;
      if (this._settings.metadata) {
        this._logger.debug("ctor: Using metadata from settings");
        this._metadata = this._settings.metadata;
      }
    }
    resetSigningKeys() {
      this._signingKeys = null;
    }
    async getMetadata() {
      if (this._metadata) {
        this._logger.debug("getMetadata: Returning metadata from cache");
        return this._metadata;
      }
      if (!this._metadataUrl) {
        this._logger.error("getMetadata: No authority or metadataUrl configured on settings");
        throw new Error("No authority or metadataUrl configured on settings");
      }
      this._logger.debug("getMetadata: getting metadata from", this._metadataUrl);
      const metadata = await this._jsonService.getJson(this._metadataUrl);
      this._logger.debug("getMetadata: json received");
      const seed = this._settings.metadataSeed || {};
      this._metadata = Object.assign({}, seed, metadata);
      return this._metadata;
    }
    getIssuer() {
      return this._getMetadataProperty("issuer");
    }
    getAuthorizationEndpoint() {
      return this._getMetadataProperty("authorization_endpoint");
    }
    getUserInfoEndpoint() {
      return this._getMetadataProperty("userinfo_endpoint");
    }
    getTokenEndpoint(optional = true) {
      return this._getMetadataProperty("token_endpoint", optional);
    }
    getCheckSessionIframe() {
      return this._getMetadataProperty("check_session_iframe", true);
    }
    getEndSessionEndpoint() {
      return this._getMetadataProperty("end_session_endpoint", true);
    }
    getRevocationEndpoint() {
      return this._getMetadataProperty("revocation_endpoint", true);
    }
    getKeysEndpoint(optional = true) {
      return this._getMetadataProperty("jwks_uri", optional);
    }
    async _getMetadataProperty(name, optional = false) {
      this._logger.debug("getMetadataProperty for: " + name);
      const metadata = await this.getMetadata();
      this._logger.debug("getMetadataProperty: metadata received");
      if (metadata[name] === void 0) {
        if (optional === true) {
          this._logger.warn("getMetadataProperty: Metadata does not contain optional property " + name);
          return void 0;
        }
        this._logger.error("getMetadataProperty: Metadata does not contain property " + name);
        throw new Error("Metadata does not contain property " + name);
      }
      return metadata[name];
    }
    async getSigningKeys() {
      if (this._signingKeys) {
        this._logger.debug("getSigningKeys: Returning signingKeys from cache");
        return this._signingKeys;
      }
      const jwks_uri = await this.getKeysEndpoint(false);
      this._logger.debug("getSigningKeys: jwks_uri received", jwks_uri);
      const keySet = await this._jsonService.getJson(jwks_uri);
      this._logger.debug("getSigningKeys: key set received", keySet);
      if (!keySet.keys) {
        this._logger.error("getSigningKeys: Missing keys on keyset");
        throw new Error("Missing keys on keyset");
      }
      this._signingKeys = keySet.keys;
      return this._signingKeys;
    }
  };

  // src/State.ts
  var State = class {
    constructor(args) {
      this.id = args.id || CryptoUtils.generateUUIDv4();
      this.data = args.data;
      if (args.created && args.created > 0) {
        this.created = args.created;
      } else {
        this.created = Timer.getEpochTime();
      }
      this.request_type = args.request_type;
    }
    toStorageString() {
      Logger.debug("State", "toStorageString");
      return JSON.stringify({
        id: this.id,
        data: this.data,
        created: this.created,
        request_type: this.request_type
      });
    }
    static fromStorageString(storageString) {
      Logger.debug("State", "fromStorageString");
      return new State(JSON.parse(storageString));
    }
    static async clearStaleState(storage, age) {
      const cutoff = Timer.getEpochTime() - age;
      const keys = await storage.getAllKeys();
      Logger.debug("State", "clearStaleState: got keys", keys);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const item = await storage.get(key);
        let remove = false;
        if (item) {
          try {
            const state = State.fromStorageString(item);
            Logger.debug("State", "clearStaleState: got item from key: ", key, state.created);
            if (state.created <= cutoff) {
              remove = true;
            }
          } catch (err) {
            Logger.error("State", "clearStaleState: Error parsing state for key", key, err instanceof Error ? err.message : err);
            remove = true;
          }
        } else {
          Logger.debug("State", "clearStaleState: no item in storage for key: ", key);
          remove = true;
        }
        if (remove) {
          Logger.debug("State", "clearStaleState: removed item for key: ", key);
          void storage.remove(key);
        }
      }
    }
  };

  // src/SigninState.ts
  var SigninState = class extends State {
    constructor(args) {
      super(args);
      if (args.code_verifier === true) {
        this.code_verifier = CryptoUtils.generateCodeVerifier();
      } else if (args.code_verifier) {
        this.code_verifier = args.code_verifier;
      }
      if (this.code_verifier) {
        this.code_challenge = CryptoUtils.generateCodeChallenge(this.code_verifier);
      }
      this.authority = args.authority;
      this.client_id = args.client_id;
      this.redirect_uri = args.redirect_uri;
      this.scope = args.scope;
      this.client_secret = args.client_secret;
      this.extraTokenParams = args.extraTokenParams;
      this.response_mode = args.response_mode;
      this.skipUserInfo = args.skipUserInfo;
    }
    toStorageString() {
      Logger.debug("SigninState", "toStorageString");
      return JSON.stringify({
        id: this.id,
        data: this.data,
        created: this.created,
        request_type: this.request_type,
        code_verifier: this.code_verifier,
        authority: this.authority,
        client_id: this.client_id,
        redirect_uri: this.redirect_uri,
        scope: this.scope,
        client_secret: this.client_secret,
        extraTokenParams: this.extraTokenParams,
        response_mode: this.response_mode,
        skipUserInfo: this.skipUserInfo
      });
    }
    static fromStorageString(storageString) {
      Logger.debug("SigninState", "fromStorageString");
      const data = JSON.parse(storageString);
      return new SigninState(data);
    }
  };

  // src/SigninRequest.ts
  var SigninRequest = class {
    constructor({
      url,
      authority,
      client_id,
      redirect_uri,
      response_type,
      scope,
      state_data,
      prompt,
      display,
      max_age,
      ui_locales,
      id_token_hint,
      login_hint,
      acr_values,
      resource,
      response_mode,
      request,
      request_uri,
      extraQueryParams,
      request_type,
      client_secret,
      extraTokenParams,
      skipUserInfo
    }) {
      this._logger = new Logger("SigninRequest");
      if (!url) {
        this._logger.error("ctor: No url passed");
        throw new Error("url");
      }
      if (!client_id) {
        this._logger.error("ctor: No client_id passed");
        throw new Error("client_id");
      }
      if (!redirect_uri) {
        this._logger.error("ctor: No redirect_uri passed");
        throw new Error("redirect_uri");
      }
      if (!response_type) {
        this._logger.error("ctor: No response_type passed");
        throw new Error("response_type");
      }
      if (!scope) {
        this._logger.error("ctor: No scope passed");
        throw new Error("scope");
      }
      if (!authority) {
        this._logger.error("ctor: No authority passed");
        throw new Error("authority");
      }
      if (!response_mode) {
        response_mode = "query";
      }
      this.state = new SigninState({
        data: state_data,
        request_type,
        code_verifier: true,
        client_id,
        authority,
        redirect_uri,
        response_mode,
        client_secret,
        scope,
        extraTokenParams,
        skipUserInfo
      });
      url = UrlUtils.addQueryParam(url, "client_id", client_id);
      url = UrlUtils.addQueryParam(url, "redirect_uri", redirect_uri);
      url = UrlUtils.addQueryParam(url, "response_type", response_type);
      url = UrlUtils.addQueryParam(url, "scope", scope);
      url = UrlUtils.addQueryParam(url, "state", this.state.id);
      if (this.state.code_challenge) {
        url = UrlUtils.addQueryParam(url, "code_challenge", this.state.code_challenge);
        url = UrlUtils.addQueryParam(url, "code_challenge_method", "S256");
      }
      const optional = { prompt, display, max_age, ui_locales, id_token_hint, login_hint, acr_values, resource, request, request_uri, response_mode };
      for (const key in optional) {
        if (optional[key]) {
          url = UrlUtils.addQueryParam(url, key, optional[key]);
        }
      }
      for (const key in extraQueryParams) {
        url = UrlUtils.addQueryParam(url, key, extraQueryParams[key]);
      }
      this.url = url;
    }
  };

  // src/SigninResponse.ts
  var OidcScope = "openid";
  var SigninResponse = class {
    constructor(url, delimiter = "#") {
      const values = UrlUtils.parseUrlFragment(url, delimiter);
      this.error = values.error;
      this.error_description = values.error_description;
      this.error_uri = values.error_uri;
      this.code = values.code;
      this.state_id = values.state;
      this.id_token = values.id_token;
      this.session_state = values.session_state;
      this.access_token = values.access_token;
      this.refresh_token = values.refresh_token;
      this.token_type = values.token_type;
      this.scope = values.scope;
      this.expires_in = parseInt(values.expires_in);
      this.state = void 0;
      this.profile = {};
    }
    get expires_in() {
      if (this.expires_at) {
        const now = Timer.getEpochTime();
        return this.expires_at - now;
      }
      return void 0;
    }
    set expires_in(value) {
      if (value && value > 0) {
        const expires_in = Math.floor(value);
        const now = Timer.getEpochTime();
        this.expires_at = now + expires_in;
      }
    }
    get expired() {
      const expires_in = this.expires_in;
      if (expires_in !== void 0) {
        return expires_in <= 0;
      }
      return void 0;
    }
    get scopes() {
      return (this.scope || "").split(" ");
    }
    get isOpenIdConnect() {
      return this.scopes.indexOf(OidcScope) >= 0 || !!this.id_token;
    }
  };

  // src/SignoutRequest.ts
  var SignoutRequest = class {
    constructor({
      url,
      state_data,
      id_token_hint,
      post_logout_redirect_uri,
      extraQueryParams,
      request_type
    }) {
      this._logger = new Logger("SignoutRequest");
      if (!url) {
        this._logger.error("ctor: No url passed");
        throw new Error("url");
      }
      if (id_token_hint) {
        url = UrlUtils.addQueryParam(url, "id_token_hint", id_token_hint);
      }
      if (post_logout_redirect_uri) {
        url = UrlUtils.addQueryParam(url, "post_logout_redirect_uri", post_logout_redirect_uri);
        if (state_data) {
          this.state = new State({ data: state_data, request_type });
          url = UrlUtils.addQueryParam(url, "state", this.state.id);
        }
      }
      for (const key in extraQueryParams) {
        url = UrlUtils.addQueryParam(url, key, extraQueryParams[key]);
      }
      this.url = url;
    }
  };

  // src/SignoutResponse.ts
  var SignoutResponse = class {
    constructor(url) {
      const values = UrlUtils.parseUrlFragment(url, "?");
      this.error = values.error;
      this.error_description = values.error_description;
      this.error_uri = values.error_uri;
      this.state_id = values.state;
      this.state = void 0;
    }
  };

  // src/OidcClient.ts
  var OidcClient = class {
    constructor(settings) {
      this.settings = new OidcClientSettingsStore(settings);
      this._logger = new Logger("OidcClient");
      this.metadataService = new MetadataService(this.settings);
      this._validator = new ResponseValidator(this.settings, this.metadataService);
    }
    async createSigninRequest({
      response_type,
      scope,
      redirect_uri,
      state,
      prompt,
      display,
      max_age,
      ui_locales,
      id_token_hint,
      login_hint,
      acr_values,
      resource,
      request,
      request_uri,
      response_mode,
      extraQueryParams,
      extraTokenParams,
      request_type,
      skipUserInfo
    }) {
      this._logger.debug("createSigninRequest");
      response_type = response_type || this.settings.response_type;
      scope = scope || this.settings.scope;
      redirect_uri = redirect_uri || this.settings.redirect_uri;
      prompt = prompt || this.settings.prompt;
      display = display || this.settings.display;
      max_age = max_age || this.settings.max_age;
      ui_locales = ui_locales || this.settings.ui_locales;
      acr_values = acr_values || this.settings.acr_values;
      resource = resource || this.settings.resource;
      response_mode = response_mode || this.settings.response_mode;
      extraQueryParams = extraQueryParams || this.settings.extraQueryParams;
      extraTokenParams = extraTokenParams || this.settings.extraTokenParams;
      if (response_type !== "code") {
        throw new Error("Only the Authorization Code flow (with PKCE) is supported");
      }
      const url = await this.metadataService.getAuthorizationEndpoint();
      this._logger.debug("createSigninRequest: Received authorization endpoint", url);
      const signinRequest = new SigninRequest({
        url,
        authority: this.settings.authority,
        client_id: this.settings.client_id,
        redirect_uri,
        response_type,
        scope,
        state_data: state,
        prompt,
        display,
        max_age,
        ui_locales,
        id_token_hint,
        login_hint,
        acr_values,
        resource,
        request,
        request_uri,
        extraQueryParams,
        extraTokenParams,
        request_type,
        response_mode,
        client_secret: this.settings.client_secret,
        skipUserInfo
      });
      const signinState = signinRequest.state;
      await this.settings.stateStore.set(signinState.id, signinState.toStorageString());
      return signinRequest;
    }
    async readSigninResponseState(url, removeState = false) {
      this._logger.debug("readSigninResponseState");
      const delimiter = this.settings.response_mode === "query" ? "?" : "#";
      const response = new SigninResponse(url, delimiter);
      const stateKey = response.state_id;
      if (!stateKey) {
        this._logger.error("readSigninResponseState: No state in response");
        throw new Error("No state in response");
      }
      const stateStore = this.settings.stateStore;
      const stateApi = removeState ? stateStore.remove.bind(stateStore) : stateStore.get.bind(stateStore);
      const storedStateString = await stateApi(stateKey);
      if (!storedStateString) {
        this._logger.error("readSigninResponseState: No matching state found in storage");
        throw new Error("No matching state found in storage");
      }
      const state = SigninState.fromStorageString(storedStateString);
      return { state, response };
    }
    async processSigninResponse(url) {
      this._logger.debug("processSigninResponse");
      const { state, response } = await this.readSigninResponseState(url, true);
      this._logger.debug("processSigninResponse: Received state from storage; validating response");
      return this._validator.validateSigninResponse(state, response);
    }
    async createSignoutRequest({
      state,
      id_token_hint,
      post_logout_redirect_uri,
      extraQueryParams,
      request_type
    } = {}) {
      this._logger.debug("createSignoutRequest");
      post_logout_redirect_uri = post_logout_redirect_uri || this.settings.post_logout_redirect_uri;
      extraQueryParams = extraQueryParams || this.settings.extraQueryParams;
      const url = await this.metadataService.getEndSessionEndpoint();
      if (!url) {
        this._logger.error("createSignoutRequest: No end session endpoint url returned");
        throw new Error("no end session endpoint");
      }
      this._logger.debug("createSignoutRequest: Received end session endpoint", url);
      const request = new SignoutRequest({
        url,
        id_token_hint,
        post_logout_redirect_uri,
        state_data: state,
        extraQueryParams,
        request_type
      });
      const signoutState = request.state;
      if (signoutState) {
        this._logger.debug("createSignoutRequest: Signout request has state to persist");
        await this.settings.stateStore.set(signoutState.id, signoutState.toStorageString());
      }
      return request;
    }
    async readSignoutResponseState(url, removeState = false) {
      this._logger.debug("readSignoutResponseState");
      const response = new SignoutResponse(url);
      const stateKey = response.state_id;
      if (!stateKey) {
        this._logger.debug("readSignoutResponseState: No state in response");
        if (response.error) {
          this._logger.warn("readSignoutResponseState: Response was error:", response.error);
          throw new ErrorResponse(response);
        }
        return { state: void 0, response };
      }
      const stateStore = this.settings.stateStore;
      const stateApi = removeState ? stateStore.remove.bind(stateStore) : stateStore.get.bind(stateStore);
      const storedStateString = await stateApi(stateKey);
      if (!storedStateString) {
        this._logger.error("readSignoutResponseState: No matching state found in storage");
        throw new Error("No matching state found in storage");
      }
      const state = State.fromStorageString(storedStateString);
      return { state, response };
    }
    async processSignoutResponse(url) {
      this._logger.debug("processSignoutResponse");
      const { state, response } = await this.readSignoutResponseState(url, true);
      if (state) {
        this._logger.debug("processSignoutResponse: Received state from storage; validating response");
        return this._validator.validateSignoutResponse(state, response);
      }
      this._logger.debug("processSignoutResponse: No state from storage; skipping validating response");
      return response;
    }
    clearStaleState() {
      this._logger.debug("clearStaleState");
      return State.clearStaleState(this.settings.stateStore, this.settings.staleStateAgeInSeconds);
    }
  };

  // src/InMemoryWebStorage.ts
  var InMemoryWebStorage = class {
    constructor() {
      this._logger = new Logger("InMemoryWebStorage");
      this._data = {};
    }
    clear() {
      this._logger.debug("clear");
      this._data = {};
    }
    getItem(key) {
      this._logger.debug("getItem", key);
      return this._data[key];
    }
    setItem(key, value) {
      this._logger.debug("setItem", key);
      this._data[key] = value;
    }
    removeItem(key) {
      this._logger.debug("removeItem", key);
      delete this._data[key];
    }
    get length() {
      return Object.getOwnPropertyNames(this._data).length;
    }
    key(index) {
      return Object.getOwnPropertyNames(this._data)[index];
    }
  };

  // src/navigators/IFrameWindow.ts
  var defaultTimeoutInSeconds = 10;
  var IFrameWindow = class {
    constructor({
      silentRequestTimeoutInSeconds = defaultTimeoutInSeconds
    }) {
      this._promise = new Promise((resolve, reject) => {
        this._resolve = resolve;
        this._reject = reject;
      });
      this._timer = null;
      this._timeout = () => {
        this._logger.debug("_timeout");
        this._error("Frame window timed out");
      };
      this._message = (e2) => {
        this._logger.debug("_message");
        const origin = location.protocol + "//" + location.host;
        if (this._timer && this._frame && e2.origin === origin && e2.source === this._frame.contentWindow && (typeof e2.data === "string" && (e2.data.startsWith("http://") || e2.data.startsWith("https://")))) {
          const url = e2.data;
          if (url) {
            this._success({ url });
          } else {
            this._error("Invalid response from frame");
          }
        }
      };
      this._logger = new Logger("IFrameWindow");
      this._timeoutInSeconds = silentRequestTimeoutInSeconds;
      window.addEventListener("message", this._message, false);
      this._frame = window.document.createElement("iframe");
      this._frame.style.visibility = "hidden";
      this._frame.style.position = "fixed";
      this._frame.style.left = "-1000px";
      this._frame.style.top = "0";
      this._frame.width = "0";
      this._frame.height = "0";
      window.document.body.appendChild(this._frame);
    }
    async navigate(params) {
      if (!params || !params.url) {
        this._error("No url provided");
      } else if (!this._frame) {
        this._error("No _frame, already closed");
      } else {
        this._logger.debug("navigate: Using timeout of:", this._timeoutInSeconds);
        this._timer = window.setTimeout(this._timeout, this._timeoutInSeconds * 1e3);
        this._frame.src = params.url;
      }
      return await this._promise;
    }
    _success(data) {
      this._cleanup();
      this._logger.debug("Successful response from frame window");
      this._resolve(data);
    }
    _error(message) {
      this._cleanup();
      this._logger.error(message);
      this._reject(new Error(message));
    }
    close() {
      this._cleanup();
    }
    _cleanup() {
      this._logger.debug("_cleanup");
      if (this._timer != null) {
        window.clearTimeout(this._timer);
      }
      if (this._frame) {
        window.removeEventListener("message", this._message, false);
        window.document.body.removeChild(this._frame);
      }
      this._timer = null;
      this._frame = null;
    }
    static notifyParent(url) {
      Logger.debug("IFrameWindow", "notifyParent");
      url = url || window.location.href;
      if (url) {
        Logger.debug("IFrameWindow", "notifyParent: posting url message to parent");
        window.parent.postMessage(url, location.protocol + "//" + location.host);
      }
    }
  };

  // src/navigators/IFrameNavigator.ts
  var IFrameNavigator = class {
    constructor(_settings) {
      this._settings = _settings;
      this._logger = new Logger("IFrameNavigator");
    }
    async prepare({
      silentRequestTimeoutInSeconds = this._settings.silentRequestTimeoutInSeconds
    }) {
      return new IFrameWindow({ silentRequestTimeoutInSeconds });
    }
    async callback(url) {
      this._logger.debug("callback");
      IFrameWindow.notifyParent(url);
    }
  };

  // src/navigators/PopupWindow.ts
  var checkForPopupClosedInterval = 500;
  var defaultPopupFeatures = "location=no,toolbar=no,width=500,height=500,left=100,top=100;";
  var defaultPopupTarget = "_blank";
  var PopupWindow = class {
    constructor({
      popupWindowTarget = defaultPopupTarget,
      popupWindowFeatures = defaultPopupFeatures
    }) {
      this._promise = new Promise((resolve, reject) => {
        this._resolve = resolve;
        this._reject = reject;
      });
      this._checkForPopupClosedTimer = null;
      this._messageReceived = (event) => {
        if (event.origin !== window.location.origin) {
          this._logger.warn("_messageReceived: Message not coming from same origin: " + event.origin);
          return;
        }
        const { data, url, keepOpen } = JSON.parse(event.data);
        if (data.state) {
          const callback = window["popupCallback_" + data.state];
          if (callback) {
            this._logger.debug("_messageReceived: passing url message to opener");
            callback(url, keepOpen);
          } else {
            this._logger.warn("_messageReceived: no matching callback found on opener");
          }
        } else {
          this._logger.warn("_messageReceived: no state found in response url");
        }
      };
      this._checkForPopupClosed = () => {
        if (!this._popup || this._popup.closed) {
          this._error("Popup window closed");
        }
      };
      this._callback = (url, keepOpen) => {
        this._cleanup(keepOpen);
        if (url) {
          this._logger.debug("callback success");
          this._success({ url });
        } else {
          this._logger.debug("callback: Invalid response from popup");
          this._error("Invalid response from popup");
        }
      };
      this._logger = new Logger("PopupWindow");
      this._popup = window.open("", popupWindowTarget, popupWindowFeatures);
      if (this._popup) {
        this._logger.debug("ctor: popup successfully created");
        this._checkForPopupClosedTimer = window.setInterval(this._checkForPopupClosed, checkForPopupClosedInterval);
      }
    }
    async navigate(params) {
      if (!this._popup) {
        this._error("PopupWindow.navigate: Error opening popup window");
      } else if (!params || !params.url) {
        this._error("PopupWindow.navigate: no url provided");
        this._error("No url provided");
      } else {
        this._logger.debug("navigate: Setting URL in popup");
        this._id = params.id;
        if (this._id) {
          window["popupCallback_" + this._id] = this._callback;
        }
        this._popup.focus();
        this._popup.window.location.replace(params.url);
        window.addEventListener("message", this._messageReceived, false);
      }
      return await this._promise;
    }
    _success(data) {
      this._logger.debug("callback: Successful response from popup window");
      this._cleanup();
      this._resolve(data);
    }
    _error(message) {
      this._logger.error("_error", message);
      this._cleanup();
      this._reject(new Error(message));
    }
    close() {
      this._cleanup(false);
    }
    _cleanup(keepOpen) {
      this._logger.debug("cleanup");
      if (this._checkForPopupClosedTimer) {
        window.clearInterval(this._checkForPopupClosedTimer);
        this._checkForPopupClosedTimer = null;
      }
      window.removeEventListener("message", this._messageReceived);
      if (this._id) {
        delete window["popupCallback_" + this._id];
      }
      this._id = void 0;
      if (this._popup && !keepOpen) {
        this._popup.close();
      }
      this._popup = null;
    }
    static notifyOpener(url, keepOpen, delimiter) {
      var _a;
      if (window.opener) {
        url = url || window.location.href;
        if (url) {
          const data = UrlUtils.parseUrlFragment(url, delimiter);
          (_a = window.opener) == null ? void 0 : _a.postMessage(JSON.stringify({
            data,
            url,
            keepOpen
          }), window.location.origin);
        }
      } else {
        Logger.warn("PopupWindow", "notifyOpener: no window.opener. Can't complete notification.");
      }
    }
  };

  // src/navigators/PopupNavigator.ts
  var PopupNavigator = class {
    constructor(_settings) {
      this._settings = _settings;
      this._logger = new Logger("PopupNavigator");
    }
    async prepare({
      popupWindowFeatures = this._settings.popupWindowFeatures,
      popupWindowTarget = this._settings.popupWindowTarget
    }) {
      return new PopupWindow({ popupWindowFeatures, popupWindowTarget });
    }
    async callback(url, keepOpen, delimiter) {
      this._logger.debug("callback");
      PopupWindow.notifyOpener(url, keepOpen, delimiter);
    }
  };

  // src/navigators/RedirectNavigator.ts
  var RedirectNavigator = class {
    constructor(_settings) {
      this._settings = _settings;
      this._logger = new Logger("RedirectNavigator");
    }
    async prepare({ redirectMethod }) {
      this._redirectMethod = redirectMethod != null ? redirectMethod : this._settings.redirectMethod;
      return this;
    }
    async navigate(params) {
      if (!params || !params.url) {
        this._logger.error("navigate: No url provided");
        throw new Error("No url provided");
      }
      window.location[this._redirectMethod || "assign"](params.url);
      return { url: window.location.href };
    }
    close() {
      this._logger.warn("cannot close the current window");
    }
  };

  // src/UserManagerSettings.ts
  var DefaultAccessTokenExpiringNotificationTimeInSeconds = 60;
  var DefaultCheckSessionIntervalInSeconds = 2;
  var UserManagerSettingsStore = class extends OidcClientSettingsStore {
    constructor(args) {
      const {
        popup_redirect_uri,
        popup_post_logout_redirect_uri,
        popupWindowFeatures,
        popupWindowTarget,
        redirectMethod = "assign",
        silent_redirect_uri,
        silentRequestTimeoutInSeconds,
        automaticSilentRenew = true,
        validateSubOnSilentRenew = true,
        includeIdTokenInSilentRenew = false,
        monitorSession = false,
        monitorAnonymousSession = false,
        checkSessionIntervalInSeconds = DefaultCheckSessionIntervalInSeconds,
        query_status_response_type,
        stopCheckSessionOnError = true,
        revokeAccessTokenOnSignout = false,
        accessTokenExpiringNotificationTimeInSeconds = DefaultAccessTokenExpiringNotificationTimeInSeconds,
        userStore = new WebStorageStateStore({ store: sessionStorage })
      } = args;
      super(args);
      this.popup_redirect_uri = popup_redirect_uri;
      this.popup_post_logout_redirect_uri = popup_post_logout_redirect_uri;
      this.popupWindowFeatures = popupWindowFeatures;
      this.popupWindowTarget = popupWindowTarget;
      this.redirectMethod = redirectMethod;
      this.silent_redirect_uri = silent_redirect_uri;
      this.silentRequestTimeoutInSeconds = silentRequestTimeoutInSeconds;
      this.automaticSilentRenew = automaticSilentRenew;
      this.validateSubOnSilentRenew = validateSubOnSilentRenew;
      this.includeIdTokenInSilentRenew = includeIdTokenInSilentRenew;
      this.monitorSession = monitorSession;
      this.monitorAnonymousSession = monitorAnonymousSession;
      this.checkSessionIntervalInSeconds = checkSessionIntervalInSeconds;
      this.stopCheckSessionOnError = stopCheckSessionOnError;
      if (query_status_response_type) {
        this.query_status_response_type = query_status_response_type;
      } else {
        this.query_status_response_type = "code";
      }
      this.revokeAccessTokenOnSignout = revokeAccessTokenOnSignout;
      this.accessTokenExpiringNotificationTimeInSeconds = accessTokenExpiringNotificationTimeInSeconds;
      this.userStore = userStore;
    }
  };

  // src/User.ts
  var User = class {
    constructor(args) {
      this.id_token = args.id_token;
      this.session_state = args.session_state;
      this.access_token = args.access_token;
      this.refresh_token = args.refresh_token;
      this.token_type = args.token_type;
      this.scope = args.scope;
      this.profile = args.profile;
      this.expires_at = args.expires_at;
      this.state = args.state;
    }
    get expires_in() {
      if (this.expires_at) {
        const now = Timer.getEpochTime();
        return this.expires_at - now;
      }
      return void 0;
    }
    set expires_in(value) {
      if (value && value > 0) {
        const expires_in = Math.floor(value);
        const now = Timer.getEpochTime();
        this.expires_at = now + expires_in;
      }
    }
    get expired() {
      const expires_in = this.expires_in;
      if (expires_in !== void 0) {
        return expires_in <= 0;
      }
      return void 0;
    }
    get scopes() {
      return (this.scope || "").split(" ");
    }
    toStorageString() {
      Logger.debug("User", "toStorageString");
      return JSON.stringify({
        id_token: this.id_token,
        session_state: this.session_state,
        access_token: this.access_token,
        refresh_token: this.refresh_token,
        token_type: this.token_type,
        scope: this.scope,
        profile: this.profile,
        expires_at: this.expires_at
      });
    }
    static fromStorageString(storageString) {
      Logger.debug("User", "fromStorageString");
      return new User(JSON.parse(storageString));
    }
  };

  // src/AccessTokenEvents.ts
  var AccessTokenEvents = class {
    constructor({ expiringNotificationTimeInSeconds }) {
      this._logger = new Logger("AccessTokenEvents");
      this._expiringNotificationTimeInSeconds = expiringNotificationTimeInSeconds;
      this._expiringTimer = new Timer("Access token expiring");
      this._expiredTimer = new Timer("Access token expired");
    }
    load(container) {
      if (container.access_token && container.expires_in !== void 0) {
        const duration = container.expires_in;
        this._logger.debug("load: access token present, remaining duration:", duration);
        if (duration > 0) {
          let expiring = duration - this._expiringNotificationTimeInSeconds;
          if (expiring <= 0) {
            expiring = 1;
          }
          this._logger.debug("load: registering expiring timer in:", expiring);
          this._expiringTimer.init(expiring);
        } else {
          this._logger.debug("load: canceling existing expiring timer because we're past expiration.");
          this._expiringTimer.cancel();
        }
        const expired = duration + 1;
        this._logger.debug("load: registering expired timer in:", expired);
        this._expiredTimer.init(expired);
      } else {
        this._expiringTimer.cancel();
        this._expiredTimer.cancel();
      }
    }
    unload() {
      this._logger.debug("unload: canceling existing access token timers");
      this._expiringTimer.cancel();
      this._expiredTimer.cancel();
    }
    addAccessTokenExpiring(cb) {
      this._expiringTimer.addHandler(cb);
    }
    removeAccessTokenExpiring(cb) {
      this._expiringTimer.removeHandler(cb);
    }
    addAccessTokenExpired(cb) {
      this._expiredTimer.addHandler(cb);
    }
    removeAccessTokenExpired(cb) {
      this._expiredTimer.removeHandler(cb);
    }
  };

  // src/UserManagerEvents.ts
  var UserManagerEvents = class extends AccessTokenEvents {
    constructor(settings) {
      super({ expiringNotificationTimeInSeconds: settings.accessTokenExpiringNotificationTimeInSeconds });
      this._logger = new Logger("UserManagerEvents");
      this._userLoaded = new Event("User loaded");
      this._userUnloaded = new Event("User unloaded");
      this._silentRenewError = new Event("Silent renew error");
      this._userSignedIn = new Event("User signed in");
      this._userSignedOut = new Event("User signed out");
      this._userSessionChanged = new Event("User session changed");
    }
    load(user, raiseEvent = true) {
      this._logger.debug("load");
      super.load(user);
      if (raiseEvent) {
        this._userLoaded.raise(user);
      }
    }
    unload() {
      this._logger.debug("unload");
      super.unload();
      this._userUnloaded.raise();
    }
    addUserLoaded(cb) {
      this._userLoaded.addHandler(cb);
    }
    removeUserLoaded(cb) {
      this._userLoaded.removeHandler(cb);
    }
    addUserUnloaded(cb) {
      this._userUnloaded.addHandler(cb);
    }
    removeUserUnloaded(cb) {
      this._userUnloaded.removeHandler(cb);
    }
    addSilentRenewError(cb) {
      this._silentRenewError.addHandler(cb);
    }
    removeSilentRenewError(cb) {
      this._silentRenewError.removeHandler(cb);
    }
    _raiseSilentRenewError(e2) {
      this._logger.debug("_raiseSilentRenewError", e2.message);
      this._silentRenewError.raise(e2);
    }
    addUserSignedIn(cb) {
      this._userSignedIn.addHandler(cb);
    }
    removeUserSignedIn(cb) {
      this._userSignedIn.removeHandler(cb);
    }
    _raiseUserSignedIn() {
      this._logger.debug("_raiseUserSignedIn");
      this._userSignedIn.raise();
    }
    addUserSignedOut(cb) {
      this._userSignedOut.addHandler(cb);
    }
    removeUserSignedOut(cb) {
      this._userSignedOut.removeHandler(cb);
    }
    _raiseUserSignedOut() {
      this._logger.debug("_raiseUserSignedOut");
      this._userSignedOut.raise();
    }
    addUserSessionChanged(cb) {
      this._userSessionChanged.addHandler(cb);
    }
    removeUserSessionChanged(cb) {
      this._userSessionChanged.removeHandler(cb);
    }
    _raiseUserSessionChanged() {
      this._logger.debug("_raiseUserSessionChanged");
      this._userSessionChanged.raise();
    }
  };

  // src/SilentRenewService.ts
  var SilentRenewService = class {
    constructor(_userManager) {
      this._userManager = _userManager;
      this._isStarted = false;
      this._tokenExpiring = () => {
        this._userManager.signinSilent().then(() => {
          this._logger.debug("_tokenExpiring: Silent token renewal successful");
        }).catch((err) => {
          const error = err instanceof Error ? err : new Error("Silent renew failed");
          this._logger.error("_tokenExpiring: Error from signinSilent:", error.message);
          this._userManager.events._raiseSilentRenewError(error);
        });
      };
      this._logger = new Logger("SilentRenewService");
    }
    async start() {
      if (!this._isStarted) {
        this._isStarted = true;
        this._userManager.events.addAccessTokenExpiring(this._tokenExpiring);
        try {
          await this._userManager.getUser();
        } catch (err) {
          this._logger.error("start: Error from getUser:", err instanceof Error ? err.message : err);
        }
      }
    }
    stop() {
      if (this._isStarted) {
        this._userManager.events.removeAccessTokenExpiring(this._tokenExpiring);
        this._isStarted = false;
      }
    }
  };

  // src/CheckSessionIFrame.ts
  var CheckSessionIFrame = class {
    constructor(_callback, _client_id, url, _intervalInSeconds, _stopOnError) {
      this._callback = _callback;
      this._client_id = _client_id;
      this._intervalInSeconds = _intervalInSeconds;
      this._stopOnError = _stopOnError;
      this._timer = null;
      this._session_state = null;
      this._message = (e2) => {
        if (e2.origin === this._frame_origin && e2.source === this._frame.contentWindow) {
          if (e2.data === "error") {
            this._logger.error("error message from check session op iframe");
            if (this._stopOnError) {
              this.stop();
            }
          } else if (e2.data === "changed") {
            this._logger.debug("changed message from check session op iframe");
            this.stop();
            void this._callback();
          } else {
            this._logger.debug(e2.data + " message from check session op iframe");
          }
        }
      };
      this._logger = new Logger("CheckSessionIFrame");
      const idx = url.indexOf("/", url.indexOf("//") + 2);
      this._frame_origin = url.substr(0, idx);
      this._frame = window.document.createElement("iframe");
      this._frame.style.visibility = "hidden";
      this._frame.style.position = "fixed";
      this._frame.style.left = "-1000px";
      this._frame.style.top = "0";
      this._frame.width = "0";
      this._frame.height = "0";
      this._frame.src = url;
    }
    load() {
      return new Promise((resolve) => {
        this._frame.onload = () => {
          resolve();
        };
        window.document.body.appendChild(this._frame);
        window.addEventListener("message", this._message, false);
      });
    }
    start(session_state) {
      if (this._session_state === session_state) {
        return;
      }
      this._logger.debug("start");
      this.stop();
      this._session_state = session_state;
      const send = () => {
        if (!this._frame.contentWindow || !this._session_state) {
          return;
        }
        this._frame.contentWindow.postMessage(this._client_id + " " + this._session_state, this._frame_origin);
      };
      send();
      this._timer = window.setInterval(send, this._intervalInSeconds * 1e3);
    }
    stop() {
      this._session_state = null;
      if (this._timer) {
        this._logger.debug("stop");
        window.clearInterval(this._timer);
        this._timer = null;
      }
    }
  };

  // src/SessionMonitor.ts
  var SessionMonitor = class {
    constructor(userManager) {
      this._start = async (user) => {
        const session_state = user.session_state;
        if (!session_state) {
          return;
        }
        if (user.profile) {
          this._sub = user.profile.sub;
          this._sid = user.profile.sid;
          this._logger.debug("_start: session_state:", session_state, ", sub:", this._sub);
        } else {
          this._sub = void 0;
          this._sid = void 0;
          this._logger.debug("_start: session_state:", session_state, ", anonymous user");
        }
        if (this._checkSessionIFrame) {
          this._checkSessionIFrame.start(session_state);
          return;
        }
        try {
          const url = await this._userManager.metadataService.getCheckSessionIframe();
          if (url) {
            this._logger.debug("_start: Initializing check session iframe");
            const client_id = this._userManager.settings.client_id;
            const intervalInSeconds = this._userManager.settings.checkSessionIntervalInSeconds;
            const stopOnError = this._userManager.settings.stopCheckSessionOnError;
            const checkSessionIFrame = new CheckSessionIFrame(this._callback, client_id, url, intervalInSeconds, stopOnError);
            await checkSessionIFrame.load();
            this._checkSessionIFrame = checkSessionIFrame;
            checkSessionIFrame.start(session_state);
          } else {
            this._logger.warn("_start: No check session iframe found in the metadata");
          }
        } catch (err) {
          this._logger.error("_start: Error from getCheckSessionIframe:", err instanceof Error ? err.message : err);
        }
      };
      this._stop = () => {
        this._sub = void 0;
        this._sid = void 0;
        if (this._checkSessionIFrame) {
          this._logger.debug("_stop");
          this._checkSessionIFrame.stop();
        }
        if (this._userManager.settings.monitorAnonymousSession) {
          const timerHandle = this._timer.setInterval(async () => {
            this._timer.clearInterval(timerHandle);
            try {
              const session = await this._userManager.querySessionStatus();
              if (session) {
                const tmpUser = {
                  session_state: session.session_state,
                  profile: session.sub && session.sid ? {
                    sub: session.sub,
                    sid: session.sid
                  } : null
                };
                void this._start(tmpUser);
              }
            } catch (err) {
              this._logger.error("_stop: error from querySessionStatus:", err instanceof Error ? err.message : err);
            }
          }, 1e3);
        }
      };
      this._callback = async () => {
        try {
          const session = await this._userManager.querySessionStatus();
          let raiseEvent = true;
          if (session && this._checkSessionIFrame) {
            if (session.sub === this._sub) {
              raiseEvent = false;
              this._checkSessionIFrame.start(session.session_state);
              if (session.sid === this._sid) {
                this._logger.debug("_callback: Same sub still logged in at OP, restarting check session iframe; session_state:", session.session_state);
              } else {
                this._logger.debug("_callback: Same sub still logged in at OP, session state has changed, restarting check session iframe; session_state:", session.session_state);
                this._userManager.events._raiseUserSessionChanged();
              }
            } else {
              this._logger.debug("_callback: Different subject signed into OP:", session.sub);
            }
          } else {
            this._logger.debug("_callback: Subject no longer signed into OP");
          }
          if (raiseEvent) {
            if (this._sub) {
              this._logger.debug("_callback: SessionMonitor._callback; raising signed out event");
              this._userManager.events._raiseUserSignedOut();
            } else {
              this._logger.debug("_callback: SessionMonitor._callback; raising signed in event");
              this._userManager.events._raiseUserSignedIn();
            }
          }
        } catch (err) {
          if (this._sub) {
            this._logger.debug("_callback: Error calling queryCurrentSigninSession; raising signed out event", err instanceof Error ? err.message : err);
            this._userManager.events._raiseUserSignedOut();
          }
        }
      };
      this._logger = new Logger("SessionMonitor");
      if (!userManager) {
        this._logger.error("ctor: No user manager passed to SessionMonitor");
        throw new Error("userManager");
      }
      this._userManager = userManager;
      this._timer = g_timer;
      this._userManager.events.addUserLoaded(this._start);
      this._userManager.events.addUserUnloaded(this._stop);
      Promise.resolve(this._init()).catch((err) => {
        this._logger.error("ctor: error:", err.message);
      });
    }
    async _init() {
      const user = await this._userManager.getUser();
      if (user) {
        void this._start(user);
      } else if (this._userManager.settings.monitorAnonymousSession) {
        const session = await this._userManager.querySessionStatus();
        if (session) {
          const tmpUser = {
            session_state: session.session_state,
            profile: session.sub && session.sid ? {
              sub: session.sub,
              sid: session.sid
            } : null
          };
          void this._start(tmpUser);
        }
      }
    }
  };

  // src/TokenRevocationClient.ts
  var AccessTokenTypeHint = "access_token";
  var RefreshTokenTypeHint = "refresh_token";
  var TokenRevocationClient = class {
    constructor(settings, metadataService) {
      this._settings = settings;
      this._logger = new Logger("TokenRevocationClient");
      this._metadataService = metadataService;
    }
    async revoke(token, required, type = "access_token") {
      if (!token) {
        this._logger.error("revoke: No token provided");
        throw new Error("No token provided.");
      }
      if (type !== AccessTokenTypeHint && type != RefreshTokenTypeHint) {
        this._logger.error("revoke: Invalid token type");
        throw new Error("Invalid token type.");
      }
      const url = await this._metadataService.getRevocationEndpoint();
      if (!url) {
        if (required) {
          this._logger.error("revoke: Revocation not supported");
          throw new Error("Revocation not supported");
        }
        return;
      }
      this._logger.debug("revoke: Revoking " + type);
      const client_id = this._settings.client_id;
      const client_secret = this._settings.client_secret;
      await this._revoke(url, client_id, client_secret, token, type);
    }
    async _revoke(url, client_id, client_secret, token, type) {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      const body = new URLSearchParams();
      body.set("client_id", client_id);
      if (client_secret) {
        body.set("client_secret", client_secret);
      }
      body.set("token_type_hint", type);
      body.set("token", token);
      let response;
      try {
        this._logger.debug("revoke, url: ", url);
        response = await fetch(url, { method: "POST", headers, body });
      } catch (err) {
        this._logger.error("revoke: network error");
        throw new Error("Network Error");
      }
      this._logger.debug("revoke: HTTP response received, status", response.status);
      if (response.status !== 200) {
        throw new Error(response.statusText + " (" + response.status.toString() + ")");
      }
    }
  };

  // src/UserManager.ts
  var UserManager = class {
    constructor(settings) {
      this.settings = new UserManagerSettingsStore(settings);
      this._logger = new Logger("UserManager");
      this._client = new OidcClient(settings);
      this._redirectNavigator = new RedirectNavigator(this.settings);
      this._popupNavigator = new PopupNavigator(this.settings);
      this._iframeNavigator = new IFrameNavigator(this.settings);
      this._events = new UserManagerEvents(this.settings);
      this._silentRenewService = new SilentRenewService(this);
      if (this.settings.automaticSilentRenew) {
        this._logger.debug("ctor: automaticSilentRenew is configured, setting up silent renew");
        this.startSilentRenew();
      }
      this._sessionMonitor = null;
      if (this.settings.monitorSession) {
        this._logger.debug("ctor: monitorSession is configured, setting up session monitor");
        this._sessionMonitor = new SessionMonitor(this);
      }
      this._tokenRevocationClient = new TokenRevocationClient(this.settings, this.metadataService);
      this._tokenClient = new TokenClient(this.settings, this.metadataService);
    }
    get events() {
      return this._events;
    }
    get metadataService() {
      return this._client.metadataService;
    }
    async getUser() {
      const user = await this._loadUser();
      if (user) {
        this._logger.info("getUser: user loaded");
        this._events.load(user, false);
        return user;
      }
      this._logger.info("getUser: user not found in storage");
      return null;
    }
    async removeUser() {
      await this.storeUser(null);
      this._logger.info("removeUser: user removed from storage");
      this._events.unload();
    }
    async signinRedirect(args = {}) {
      const {
        redirectMethod,
        ...requestArgs
      } = args;
      const handle = await this._redirectNavigator.prepare({ redirectMethod });
      await this._signinStart({
        request_type: "si:r",
        ...requestArgs
      }, handle);
      this._logger.info("signinRedirect: successful");
    }
    async signinRedirectCallback(url = window.location.href) {
      const user = await this._signinEnd(url);
      if (user.profile && user.profile.sub) {
        this._logger.info("signinRedirectCallback: successful, signed in sub: ", user.profile.sub);
      } else {
        this._logger.info("signinRedirectCallback: no sub");
      }
      return user;
    }
    async signinPopup(args = {}) {
      const {
        popupWindowFeatures,
        popupWindowTarget,
        ...requestArgs
      } = args;
      const url = this.settings.popup_redirect_uri || this.settings.redirect_uri;
      if (!url) {
        this._logger.error("signinPopup: No popup_redirect_uri or redirect_uri configured");
        throw new Error("No popup_redirect_uri or redirect_uri configured");
      }
      const handle = await this._popupNavigator.prepare({ popupWindowFeatures, popupWindowTarget });
      const user = await this._signin({
        request_type: "si:p",
        redirect_uri: url,
        display: "popup",
        ...requestArgs
      }, handle);
      if (user) {
        if (user.profile && user.profile.sub) {
          this._logger.info("signinPopup: signinPopup successful, signed in sub: ", user.profile.sub);
        } else {
          this._logger.info("signinPopup: no sub");
        }
      }
      return user;
    }
    async signinPopupCallback(url) {
      try {
        await this._signinCallback(url, this._popupNavigator);
        this._logger.info("signinPopupCallback: successful");
      } catch (err) {
        this._logger.error("signinPopupCallback error", err instanceof Error ? err.message : err);
      }
    }
    async signinSilent(args = {}) {
      const {
        silentRequestTimeoutInSeconds,
        ...requestArgs
      } = args;
      let user = await this._loadUser();
      if (user && user.refresh_token) {
        return this._useRefreshToken(user);
      }
      const url = this.settings.silent_redirect_uri || this.settings.redirect_uri;
      if (!url) {
        this._logger.error("signinSilent: No silent_redirect_uri configured");
        throw new Error("No silent_redirect_uri configured");
      }
      let verifySub;
      if (user && this.settings.validateSubOnSilentRenew) {
        this._logger.debug("signinSilent, subject prior to silent renew: ", user.profile.sub);
        verifySub = user.profile.sub;
      }
      const handle = await this._iframeNavigator.prepare({ silentRequestTimeoutInSeconds });
      user = await this._signin({
        request_type: "si:s",
        redirect_uri: url,
        prompt: "none",
        id_token_hint: this.settings.includeIdTokenInSilentRenew ? user == null ? void 0 : user.id_token : void 0,
        ...requestArgs
      }, handle, verifySub);
      if (user) {
        if (user.profile && user.profile.sub) {
          this._logger.info("signinSilent: successful, signed in sub: ", user.profile.sub);
        } else {
          this._logger.info("signinSilent: no sub");
        }
      }
      return user;
    }
    async _useRefreshToken(user) {
      const result = await this._tokenClient.exchangeRefreshToken({
        refresh_token: user.refresh_token || ""
      });
      if (!result) {
        this._logger.error("_useRefreshToken: No response returned from token endpoint");
        throw new Error("No response returned from token endpoint");
      }
      if (!result.access_token) {
        this._logger.error("_useRefreshToken: No access token returned from token endpoint");
        throw new Error("No access token returned from token endpoint");
      }
      if (result.id_token) {
        await this._validateIdTokenFromTokenRefreshToken(user.profile, result.id_token);
      }
      this._logger.debug("_useRefreshToken: refresh token response success");
      user.id_token = result.id_token || user.id_token;
      user.access_token = result.access_token || user.access_token;
      user.refresh_token = result.refresh_token || user.refresh_token;
      user.expires_in = result.expires_in;
      await this.storeUser(user);
      this._events.load(user);
      return user;
    }
    async _validateIdTokenFromTokenRefreshToken(profile, id_token) {
      const payload = JwtUtils.decode(id_token);
      if (!payload) {
        this._logger.error("_validateIdTokenFromTokenRefreshToken: Failed to decode id_token");
        throw new Error("Failed to decode id_token");
      }
      if (payload.sub !== profile.sub) {
        this._logger.error("_validateIdTokenFromTokenRefreshToken: sub in id_token does not match current sub");
        throw new Error("sub in id_token does not match current sub");
      }
      if (payload.auth_time && payload.auth_time !== profile.auth_time) {
        this._logger.error("_validateIdTokenFromTokenRefreshToken: auth_time in id_token does not match original auth_time");
        throw new Error("auth_time in id_token does not match original auth_time");
      }
      if (payload.azp && payload.azp !== profile.azp) {
        this._logger.error("_validateIdTokenFromTokenRefreshToken: azp in id_token does not match original azp");
        throw new Error("azp in id_token does not match original azp");
      }
      if (!payload.azp && profile.azp) {
        this._logger.error("_validateIdTokenFromTokenRefreshToken: azp not in id_token, but present in original id_token");
        throw new Error("azp not in id_token, but present in original id_token");
      }
    }
    async signinSilentCallback(url) {
      await this._signinCallback(url, this._iframeNavigator);
      this._logger.info("signinSilentCallback: successful");
    }
    async signinCallback(url) {
      const { state } = await this._client.readSigninResponseState(url);
      if (state.request_type === "si:r") {
        return this.signinRedirectCallback(url);
      }
      if (state.request_type === "si:p") {
        await this.signinPopupCallback(url);
        return null;
      }
      if (state.request_type === "si:s") {
        await this.signinSilentCallback(url);
        return null;
      }
      throw new Error("invalid response_type in state");
    }
    async signoutCallback(url, keepOpen = false) {
      const { state } = await this._client.readSignoutResponseState(url);
      if (state) {
        if (state.request_type === "so:r") {
          await this.signoutRedirectCallback(url);
        }
        if (state.request_type === "so:p") {
          await this.signoutPopupCallback(url, keepOpen);
        }
        throw new Error("invalid response_type in state");
      }
    }
    async querySessionStatus(args = {}) {
      const {
        silentRequestTimeoutInSeconds,
        ...requestArgs
      } = args;
      const url = this.settings.silent_redirect_uri || this.settings.redirect_uri;
      if (!url) {
        this._logger.error("querySessionStatus: No silent_redirect_uri configured");
        throw new Error("No silent_redirect_uri configured");
      }
      const handle = await this._iframeNavigator.prepare({ silentRequestTimeoutInSeconds });
      const navResponse = await this._signinStart({
        request_type: "si:s",
        redirect_uri: url,
        prompt: "none",
        response_type: this.settings.query_status_response_type,
        scope: "openid",
        skipUserInfo: true,
        ...requestArgs
      }, handle);
      try {
        const signinResponse = await this._client.processSigninResponse(navResponse.url);
        this._logger.debug("querySessionStatus: got signin response");
        if (signinResponse.session_state && signinResponse.profile.sub) {
          this._logger.info("querySessionStatus: querySessionStatus success for sub: ", signinResponse.profile.sub);
          return {
            session_state: signinResponse.session_state,
            sub: signinResponse.profile.sub,
            sid: signinResponse.profile.sid
          };
        }
        this._logger.info("querySessionStatus: successful, user not authenticated");
        return null;
      } catch (err) {
        if (this.settings.monitorAnonymousSession && err instanceof ErrorResponse && err.session_state) {
          if (err.message == "login_required" || err.message == "consent_required" || err.message == "interaction_required" || err.message == "account_selection_required") {
            this._logger.info("querySessionStatus: querySessionStatus success for anonymous user");
            return {
              session_state: err.session_state
            };
          }
        }
        throw err;
      }
    }
    async _signin(args, handle, verifySub) {
      const navResponse = await this._signinStart(args, handle);
      return this._signinEnd(navResponse.url, verifySub);
    }
    async _signinStart(args, handle) {
      this._logger.debug("_signinStart: got navigator window handle");
      try {
        const signinRequest = await this._client.createSigninRequest(args);
        this._logger.debug("_signinStart: got signin request");
        return handle.navigate({
          url: signinRequest.url,
          id: signinRequest.state.id
        });
      } catch (err) {
        this._logger.debug("_signinStart: Error after preparing navigator, closing navigator window");
        handle.close();
        throw err;
      }
    }
    async _signinEnd(url, verifySub) {
      const signinResponse = await this._client.processSigninResponse(url);
      this._logger.debug("_signinEnd: got signin response");
      const user = new User(signinResponse);
      if (verifySub) {
        if (verifySub !== user.profile.sub) {
          this._logger.debug("_signinEnd: current user does not match user returned from signin. sub from signin: ", user.profile.sub);
          throw new Error("login_required");
        } else {
          this._logger.debug("_signinEnd: current user matches user returned from signin");
        }
      }
      await this.storeUser(user);
      this._logger.debug("_signinEnd: user stored");
      this._events.load(user);
      return user;
    }
    async _signinCallback(url, navigator) {
      this._logger.debug("_signinCallback");
      const delimiter = this.settings.response_mode === "query" ? "?" : "#";
      await navigator.callback(url, false, delimiter);
    }
    async signoutRedirect(args = {}) {
      const {
        redirectMethod,
        ...requestArgs
      } = args;
      const handle = await this._redirectNavigator.prepare({ redirectMethod });
      await this._signoutStart({
        request_type: "so:r",
        post_logout_redirect_uri: this.settings.post_logout_redirect_uri,
        ...requestArgs
      }, handle);
      this._logger.info("signoutRedirect: successful");
    }
    async signoutRedirectCallback(url = window.location.href) {
      const response = await this._signoutEnd(url);
      this._logger.info("signoutRedirectCallback: successful");
      return response;
    }
    async signoutPopup(args = {}) {
      const {
        popupWindowFeatures,
        popupWindowTarget,
        ...requestArgs
      } = args;
      const url = this.settings.popup_post_logout_redirect_uri || this.settings.post_logout_redirect_uri;
      const handle = await this._popupNavigator.prepare({ popupWindowFeatures, popupWindowTarget });
      await this._signout({
        request_type: "so:p",
        post_logout_redirect_uri: url,
        state: url == null ? void 0 : {},
        ...requestArgs
      }, handle);
      this._logger.info("signoutPopup: successful");
    }
    async signoutPopupCallback(url, keepOpen = false) {
      const delimiter = "?";
      await this._popupNavigator.callback(url, keepOpen, delimiter);
      this._logger.info("signoutPopupCallback: successful");
    }
    async _signout(args, handle) {
      const navResponse = await this._signoutStart(args, handle);
      return this._signoutEnd(navResponse.url);
    }
    async _signoutStart(args = {}, handle) {
      var _a;
      this._logger.debug("_signoutStart: got navigator window handle");
      try {
        const user = await this._loadUser();
        this._logger.debug("_signoutStart: loaded current user from storage");
        if (this.settings.revokeAccessTokenOnSignout) {
          await this._revokeInternal(user);
        }
        const id_token = args.id_token_hint || user && user.id_token;
        if (id_token) {
          this._logger.debug("_signoutStart: Setting id_token into signout request");
          args.id_token_hint = id_token;
        }
        await this.removeUser();
        this._logger.debug("_signoutStart: user removed, creating signout request");
        const signoutRequest = await this._client.createSignoutRequest(args);
        this._logger.debug("_signoutStart: got signout request");
        return handle.navigate({
          url: signoutRequest.url,
          id: (_a = signoutRequest.state) == null ? void 0 : _a.id
        });
      } catch (err) {
        this._logger.debug("_signoutStart: Error after preparing navigator, closing navigator window");
        handle.close();
        throw err;
      }
    }
    async _signoutEnd(url) {
      const signoutResponse = await this._client.processSignoutResponse(url);
      this._logger.debug("_signoutEnd: got signout response");
      return signoutResponse;
    }
    async revokeAccessToken() {
      const user = await this._loadUser();
      const success = await this._revokeInternal(user, true);
      if (success && user) {
        this._logger.debug("revokeAccessToken: removing token properties from user and re-storing");
        user.access_token = "";
        user.refresh_token = "";
        user.expires_at = 0;
        user.token_type = "";
        await this.storeUser(user);
        this._logger.debug("revokeAccessToken: user stored");
        this._events.load(user);
      }
      this._logger.info("revokeAccessToken: access token revoked successfully");
    }
    async _revokeInternal(user, required = false) {
      if (user) {
        const access_token = user.access_token;
        const refresh_token = user.refresh_token;
        const atSuccess = await this._revokeAccessTokenInternal(access_token, required);
        const rtSuccess = await this._revokeRefreshTokenInternal(refresh_token, required);
        if (!atSuccess && !rtSuccess) {
          this._logger.debug("revokeAccessToken: no need to revoke due to no token(s), or JWT format");
        }
        return atSuccess || rtSuccess;
      }
      return false;
    }
    async _revokeAccessTokenInternal(access_token, required) {
      if (!access_token || access_token.includes(".")) {
        return false;
      }
      await this._tokenRevocationClient.revoke(access_token, required);
      return true;
    }
    async _revokeRefreshTokenInternal(refresh_token, required) {
      if (!refresh_token) {
        return false;
      }
      await this._tokenRevocationClient.revoke(refresh_token, required, "refresh_token");
      return true;
    }
    startSilentRenew() {
      void this._silentRenewService.start();
    }
    stopSilentRenew() {
      this._silentRenewService.stop();
    }
    get _userStoreKey() {
      return `user:${this.settings.authority}:${this.settings.client_id}`;
    }
    async _loadUser() {
      const storageString = await this.settings.userStore.get(this._userStoreKey);
      if (storageString) {
        this._logger.debug("_loadUser: user storageString loaded");
        return User.fromStorageString(storageString);
      }
      this._logger.debug("_loadUser: no user storageString");
      return null;
    }
    async storeUser(user) {
      if (user) {
        this._logger.debug("storeUser: storing user");
        const storageString = user.toStorageString();
        await this.settings.userStore.set(this._userStoreKey, storageString);
      } else {
        this._logger.debug("storeUser: removing user");
        await this.settings.userStore.remove(this._userStoreKey);
      }
    }
    async clearStaleState() {
      await this._client.clearStaleState();
    }
  };

  // package.json
  var version = "2.0.0-beta.3";

  // src/Version.ts
  var Version = version;
  return src_exports;
})();
